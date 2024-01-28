// import { AresData, NotificationInterface } from "./dataObjectTypes";
import { AresData } from "./dataObjectTypes";
import { GenericAddress } from "./types";

// Country type definition
export type Country = {
  countryCode: string,
  countryName: string
}

// Address type definition for registration form
export type Address = GenericAddress<Country>

// Registration form state definition
export type RegistrationFormType = {
  firstName: string,
  surname: string,
  email: string,
  phoneNumber: string,
  personalIdNumber: string,
  vatIdNumber: string,
  companyName: string,
  street: string,
  streetNumber: string,
  city: string,
  postalCode: string,
}

// Definition for Ares redux state
export type AresDataState = {
  data: AresData,
  state: string
};

