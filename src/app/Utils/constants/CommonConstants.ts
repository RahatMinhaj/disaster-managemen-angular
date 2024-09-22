// URL endpoints
export const API_URL = 'https://api.example.com';
export const LOGIN_ENDPOINT = `${API_URL}/login`;
export const USER_ENDPOINT = `${API_URL}/users`;

// Common strings
export const APP_NAME = 'My Angular App';
export const APP_VERSION = '1.0.0';

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters long.`
};

// Configurations
export const ITEMS_PER_PAGE = 10;
export const MAX_FILE_SIZE_MB = 5;
