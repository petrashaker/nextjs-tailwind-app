import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address, Country, RegistrationFormType } from "../../../../types/reduxStateTypes";
// import { StateType } from "../../utils/constants";

const emptyCountry: Country = {
  countryCode: "CZ",
  countryName: "Česká republika"
};

type countryParams = {
  country: {
    countryCode: string,
    countryName: string
  }
};

const emptyAddress: Address = {
  name: "",
  street: "",
  streetNumber: "",
  city: "",
  postalCode: "",
  country: emptyCountry
};

// Slice defining state of registration form
const initialState: RegistrationFormType = {
  firstName: "",
  surname: "",
  email: "",
  phoneNumber: "",
  personalIdNumber: "",
  vatIdNumber: "",
  billingAddress: emptyAddress,
  differentDelivery: false,
  deliveryAddress: emptyAddress
};

type actionParams = {
  propertyName: string,
  value: string | boolean
}

type actionInvitationParams = {
  firstName: string,
  surname: string,
  email: string
}

const registrationFormSlice = createSlice({
  name: "registrationForm",
  initialState,
  reducers: {
    // set single value in state
    setValue: (state, action: PayloadAction<actionParams>) => {
      const propertyName = action.payload.propertyName;
      if (state.hasOwnProperty(propertyName)) {
        return {
          ...state,
          [propertyName]: action.payload.value
        };
      } else {
        console.warn({
          action: "registrationFormSlice.setValue",
          payload: action.payload
        }, `Action 'setValue' called with unknown property name '${propertyName}'.`);
      }
    },

    // set single value in delivery address
    setDeliveryValue: (state, action: PayloadAction<actionParams>) => {
      const propertyName = action.payload.propertyName;
      if (state.deliveryAddress.hasOwnProperty(propertyName)) {
        state.deliveryAddress = {
          ...state.deliveryAddress,
          [propertyName]: action.payload.value
        };
      } else {
        console.warn({
          action: "registrationFormSlice.setDeliveryValue",
          payload: action.payload
        }, `Action 'setDeliveryValue' called with unknown property name '${propertyName}'.`);
      }
    },

    setDeliveryCountryValue: (state, action: PayloadAction<countryParams>) => {
      const propertyName = action.payload;
      if (state.deliveryAddress.hasOwnProperty("country")) {
        state.deliveryAddress = {
          ...state.deliveryAddress,
          country: {
            countryCode:  action.payload.country.countryCode,
            countryName: action.payload.country.countryName
          }
        };
      } else {
        console.warn({
          action: "registrationFormSlice.setCountryValue",
          payload: action.payload
        }, `Action 'setCountryValue' called with unknown property name '${propertyName}'.`);
      }
    },

    // set single value in billing address
    setBillingValue: (state, action: PayloadAction<actionParams>) => {
      const propertyName = action.payload.propertyName;
      if (state.billingAddress.hasOwnProperty(propertyName)) {
        state.billingAddress = {
          ...state.billingAddress,
          [propertyName]: action.payload.value
        };
      } else {
        console.warn({
          action: "registrationFormSlice.setBillingValue",
          payload: action.payload
        }, `Action 'setBillingValue' called with unknown property name '${propertyName}'.`);
      }
    },

    setBillingCountryValue: (state, action: PayloadAction<countryParams>) => {
      const propertyName = action.payload;
      if (state.billingAddress.hasOwnProperty("country")) {
        state.billingAddress = {
          ...state.billingAddress,
          country: {
            countryCode:  action.payload.country.countryCode,
            countryName: action.payload.country.countryName
          }
        };
      } else {
        console.warn({
          action: "registrationFormSlice.setCountryValue",
          payload: action.payload
        }, `Action 'setCountryValue' called with unknown property name '${propertyName}'.`);
      }
    },


    // reset registration form state
    resetState: () => {
      return initialState;
    },

    // setAresData: (state, action: PayloadAction<AresDataState>) => {
    //   const incomingData = action.payload;
    //   if (incomingData.state === StateType.SUCCESS) {
    //     state.billingAddress = {
    //       ...state.billingAddress,
    //       name: incomingData.data.name,
    //       city: incomingData.data.city,
    //       postalCode: incomingData.data.postalCode,
    //       street: incomingData.data.street,
    //       streetNumber: incomingData.data.streetNumber
    //     },
    //     state.personalIdNumber = incomingData.data.personalIdNumber;
    //     state.vatIdNumber = incomingData.data.vatIdNumber;
    //   } else if (incomingData.state === StateType.ERROR) {
    //     state.billingAddress = {
    //       ...state.billingAddress,
    //       city: incomingData.data.city,
    //       postalCode: incomingData.data.postalCode,
    //       street: incomingData.data.street,
    //       streetNumber: incomingData.data.streetNumber
    //     };
    //     state.vatIdNumber = incomingData.data.vatIdNumber;
    //   } else if(incomingData.state === StateType.WARN) {
    //     state.billingAddress = {
    //       ...state.billingAddress,
    //       city: "",
    //       postalCode: "",
    //       street: "",
    //       streetNumber: ""
    //     };
    //     state.personalIdNumber = "";
    //     state.vatIdNumber = "";
    //   } else {
    //     console.warn({
    //       action: "registrationFormSlice.setAresData",
    //       payload: action.payload
    //     }, "Action 'setAresData' called with undefined data.");
    //   }
    // },

    // set values for firstName, surname and email once customer comes via email invitation link
    setInitialCustomerValue: (state, action: PayloadAction<actionInvitationParams>) => {
      const queryData = action.payload;
      if(queryData !== undefined) {
        state.firstName = queryData.firstName;
        state.surname = queryData.surname;
        state.email = queryData.email;
      } else {
        console.warn({
          action: "registrationFormSlice.setInitialCustomerValue",
          payload: action.payload
        }, `Action 'setInitialCustomerValue' called with undefined data.`);
      }
    }
  }
});

export const {
  setValue,
  setDeliveryValue,
  setBillingValue,
  // setAresData,
  setBillingCountryValue,
  setDeliveryCountryValue,
  setInitialCustomerValue,
  resetState
} = registrationFormSlice.actions;

export default registrationFormSlice.reducer;