// import { AresData, NotificationInterface } from "./dataObjectTypes";
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
  billingAddress: Address,
  differentDelivery: boolean,
  deliveryAddress: Address,
}

// Definition for Ares redux state
// export type AresDataState = {
//   data: AresData,
//   state: string
// };

