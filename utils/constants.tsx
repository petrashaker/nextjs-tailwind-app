export const StateType = {
  SUCCESS: "success",
  LOADING: "loading",
  ERROR: "error",
  WARN: "warning",
  NOT_INITIALIZED: "notInitialized",
  READY: "ready"
};

// Constants for registration form and user profile forms used in validation
export const FIRST_NAME_LENGTH = 50;
export const SURNAME_LENGTH = 50;
export const EMAIL_LENGTH = 320;
export const PERSONAL_ID_NB_LENGTH = 8;
export const VAT_ID_NB_LENGTH = 15;
export const COMPANY_LENGTH = 100;
export const STREET_LENGTH = 100;
export const STREET_NB_LENGTH = 20;
export const CITY_LENGTH = 50;
export const POSTAL_CODE_LENGTH = 20;

export const Validation = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /^(?:\+420|00420)?[1-9]\d{8}$/, // czech format of number (prefix +420, 00420 or none is allowed)
  postalCode: /^[A-Za-z0-9-\s]*$/, // matches numbers, letters, dashes and spaces
  personalIdNumber: /^[0-9]*$/, //matches numbers only
  vatIdNumber: /^[A-Za-z0-9-]*$/ //matches numbers, letters and dashes
};