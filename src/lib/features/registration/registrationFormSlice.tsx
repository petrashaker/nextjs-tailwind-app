import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AresDataState, Country, RegistrationFormType } from "../../../../types/reduxStateTypes";
import { StateType } from "../../../../utils/constants";
// import { StateType } from "../../utils/constants";

const emptyCountry: Country = {
  countryCode: "CZ",
  countryName: "Česká republika"
};

// Slice defining state of registration form
const initialState: RegistrationFormType = {
  firstName: "",
  surname: "",
  email: "",
  phoneNumber: "",
  personalIdNumber: "",
  vatIdNumber: "",
  companyName: "",
  street: "",
  streetNumber: "",
  city: "",
  postalCode: "",
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

    // reset registration form state
    resetState: () => {
      return initialState;
    },

    setAresData: (state, action: PayloadAction<AresDataState>) => {
      const incomingData = action.payload;
      if (incomingData.state === StateType.SUCCESS) {
        state = {
          ...state,
          companyName: incomingData.data.companyName,
          city: incomingData.data.city,
          postalCode: incomingData.data.postalCode,
          street: incomingData.data.street,
          streetNumber: incomingData.data.streetNumber
        },
        state.personalIdNumber = incomingData.data.personalIdNumber;
        state.vatIdNumber = incomingData.data.vatIdNumber;
      } else if (incomingData.state === StateType.ERROR) {
        state = {
          ...state,
          city: incomingData.data.city,
          postalCode: incomingData.data.postalCode,
          street: incomingData.data.street,
          streetNumber: incomingData.data.streetNumber
        };
        state.vatIdNumber = incomingData.data.vatIdNumber;
      } else if(incomingData.state === StateType.WARN) {
        state = {
          ...state,
          city: "",
          postalCode: "",
          street: "",
          streetNumber: ""
        };
        state.personalIdNumber = "";
        state.vatIdNumber = "";
      } else {
        console.warn({
          action: "registrationFormSlice.setAresData",
          payload: action.payload
        }, "Action 'setAresData' called with undefined data.");
      }
    },
  }
});

export const {
  setValue,
  setAresData,
  resetState
} = registrationFormSlice.actions;

export default registrationFormSlice.reducer;