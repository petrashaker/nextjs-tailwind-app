import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AresDataState } from "../../../../types/reduxStateTypes";
import { StateType } from "../../../../utils/constants";
import { AresData } from "../../../../types/dataObjectTypes";

// Slice defining state of registration form
const initialState: AresDataState = {
    data: {
        companyName: "",
        street: "",
        streetNumber: "",
        city: "",
        postalCode: "",
        personalIdNumber: "",
        vatIdNumber: ""
    },
    state: StateType.NOT_INITIALIZED
};

const aresSlice = createSlice({
  name: "aresData",
  initialState,
  reducers: {
    // set values
    setAresData: (state, action: PayloadAction<AresData>) => {
        state.data = action.payload;
        state.state = StateType.SUCCESS;
    },
    // set state
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
      if(action.payload === StateType.LOADING) {
          state.state = StateType.LOADING;
      } else if(action.payload === StateType.ERROR) {
          state.data = {
              ...state.data,
              street: "",
              streetNumber: "",
              city: "",
              postalCode: "",
              vatIdNumber: ""
          };
          state.state = StateType.ERROR;
      } else if(action.payload === StateType.WARN) {
          state.state = StateType.WARN;
      }
    }
  }
});

export const {
  setAresData,
  setState
} = aresSlice.actions;

export default aresSlice.reducer;