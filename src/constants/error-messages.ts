export const ERROR_MESSAGES = {
  AUTH: {
    UNAUTHORIZED: 'Invalid credentials provided',
    ROLES_FORBIDDEN: 'Require one of these roles: ',
    MISSING_ROLE: 'User context is missing role information',
  },
  USER: {
    NOT_FOUND: 'User not found',
    ALREADY_EXISTS: 'User with this email already exists',
  },
  COURSE: {
    LEVEL_NOT_VALID: 'Level must be in (Beginner, Intermediate, or Advanced)',
    NOT_FOUND: 'Course not found'
  },
  CATEGORY: {
    NOT_EXIST: 'Category not exist'
  },
  ENROLL: {
    ALREADY_EXIST: 'You already enroll this course'
  },
  ROLE: {
    NOT_FOUND: 'Role not found'
  },
  CURRICULUM: {
    NOT_FOUND: "Curriculum not found",
  },
  SUB_CURRICULUM: {
    NOT_FOUND: "Sub Curriculum not found",
    DELETE_FORBIDDEN: "Can only be deleted by creator",
    CREATE_FORBIDDEN: "Only course creator can create sub-curriculum",
  }
};
