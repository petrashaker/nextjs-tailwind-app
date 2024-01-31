export type KeyStringObjectType = {
  [key: string]: string;
};

export type KeyHtmlElemenObjectType = {
  [key: string]: HTMLInputElement;
};

export type RegistrationInputValidationType = {
  isFilledCorrectly: boolean;
  newErrorState: KeyStringObjectType;
};