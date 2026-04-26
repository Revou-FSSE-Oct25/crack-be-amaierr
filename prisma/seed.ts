import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import { VARIABLE } from "src/constants/variable";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const menuItems = [
  { path: 'dashboard', label: 'Dashboard', icon: "Home", code: "DASHBOARD" },
  { path: 'my-courses', label: 'My Courses', icon: "BookOpen", code: "MY_COURSE" },
  { path: 'courses', label: 'Browse Course', icon: "GraduationCap", code:"COURSES" },
  { path: 'create-course', label: 'Create Course', icon: "CirclePlus", code:"CREATE_COURSE" },
]

const authMenus = [
  { index: 1, menuCode: "DASHBOARD", roleCode: VARIABLE.ROLES.STUDENT },
  { index: 2, menuCode: "MY_COURSE", roleCode: VARIABLE.ROLES.STUDENT },
  { index: 3, menuCode: "COURSES", roleCode: VARIABLE.ROLES.STUDENT },

  { index: 1, menuCode: "DASHBOARD", roleCode: VARIABLE.ROLES.INSTRUCTOR },
  { index: 2, menuCode: "MY_COURSE", roleCode: VARIABLE.ROLES.INSTRUCTOR },
  { index: 3, menuCode: "CREATE_COURSE", roleCode: VARIABLE.ROLES.INSTRUCTOR },
]


async function main() {
  const studentRole = await prisma.role.upsert({
    where:{code: VARIABLE.ROLES.STUDENT},
    update: {},
    create: {
      code: VARIABLE.ROLES.STUDENT,
      name: "Student",
        
    }
  })
  
  const adminRole = await prisma.role.upsert({
    where:{code: VARIABLE.ROLES.INSTRUCTOR},
    update: {},
    create: {
      code: VARIABLE.ROLES.INSTRUCTOR,
      name: "Instructor",
        
    }
  })
  
  const menus = menuItems.map((menu) => {
    return prisma.menu.upsert({
      where: {code: menu.code},
      update: {}, 
      create: {
        code: menu.code,
        path: menu.path,
        label: menu.label,
        icon: menu.icon
      }
    })
  })
  await prisma.$transaction(menus)

  const authorizations = authMenus.map(async (authMenu) => {
    await prisma.authorization.upsert({
      where: {
        menuId_roleId: {
          menuId: (
            await prisma.menu.findUniqueOrThrow({
              where: { code: authMenu.menuCode },
              select: { id: true }
            })
          ).id,
          roleId: (
            await prisma.role.findUniqueOrThrow({
              where: { code: authMenu.roleCode },
              select: { id: true }
            })
          ).id
        }
      },
      update: {},
      create: {
        menuIndex: authMenu.index,
        menu: {
          connect: { code: authMenu.menuCode }
        },
        role: {
          connect: { code: authMenu.roleCode }
        }
      }
    })
  })

  console.log({ studentRole, adminRole, menus, authorizations });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });