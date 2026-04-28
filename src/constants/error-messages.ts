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
  },
  CATEGORY: {
    NOT_EXIST: 'Category not exist'
  }
};
