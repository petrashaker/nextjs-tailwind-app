'use client'

import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hook";
import InputWithError from "../../components/formElement/InputWithError/InputWithError";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import ButtonWithLoading from "../../components/formElement/ButtonWithLoading/ButtonWithLoading";
import { setValue } from "@/lib/features/registration/registrationFormSlice";
import { isEmptyString } from "../../../../../utils/stringUtils";

const Address = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const router = useRouter()
  // use registration form state from redux
  const registrationForm = useAppSelector(state => state.registrationForm)
  // initial errors for required values
  const initialErrors = {
    personalIdNumber: "",
    vatIdNumber: "",
    companyName: "",
    street: "",
    streetNumber: "",
    city: "",
    postalCode: ""
  };
  // internal state for error messages
  const [ errors, setErrors ] = useState(initialErrors);
  // state for loading
  const [ isLoading, setLoading ] = useState(false);

  // universal change listener for inputs
  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // create payload action
    const action = {
      propertyName: event.target.id,
      value: event.target.value
    };
    // reset error for changed value
    setErrors({
      ...errors,
      [action.propertyName]: ""
    });
    // dispatch action
    dispatch(setValue(action));
  };
  
  const isFilledCorrectly = () => {
    let isFilledCorrectly = true;
    const newErrorState = initialErrors;

    if(isEmptyString(registrationForm.personalIdNumber)) {
      isFilledCorrectly = false;
      newErrorState.personalIdNumber = "Je třeba vyplnit IČO.";
    }
    if(isEmptyString(registrationForm.vatIdNumber)) {
      isFilledCorrectly = false;
      newErrorState.vatIdNumber = "Je třeba vyplnit dič.";
    }
    if(isEmptyString(registrationForm.companyName)) {
      isFilledCorrectly = false;
      newErrorState.companyName = "Je třeba vyplnit název společnosti."
    }
    if(isEmptyString(registrationForm.street)) {
      isFilledCorrectly = false;
      newErrorState.street = "Je třeba vyplnit ulici"
    }
    if(isEmptyString(registrationForm.streetNumber)) {
      isFilledCorrectly = false;
      newErrorState.streetNumber = "Je třeba vyplnit číslo ulice"
    }
    if(isEmptyString(registrationForm.city)) {
      isFilledCorrectly = false;
      newErrorState.city = "Je třeba vyplnit město"
    }
    if(isEmptyString(registrationForm.postalCode)) {
      isFilledCorrectly = false;
      newErrorState.postalCode = "Je třeba vyplnit psč"
    }

    setErrors(newErrorState);
    return isFilledCorrectly;
  };
  
  const submitHandler = ( event: FormEvent ) => {
    event.preventDefault();
    console.log("submitHandler:", registrationForm);

    if (isLoading) {
      return;
    }
    const emailInput = document.getElementById("email") as HTMLInputElement;

    // getting IDs of used input elements 
    const formElement = event.target as HTMLFormElement;
    const formInputArray = [];
    for(let i = 0; i < formElement.length; i++) {
      if(formElement[i].tagName === "INPUT") {
        formInputArray.push(formElement[i].id);
      }
    }

    setLoading(true);

    const newErrorState = errors;
    // const isFilledCorrectly = registrationInputIsNotEmpty(formElement, newErrorState).isFilledCorrectly;
    setErrors({
      ...newErrorState
    });

    // if(errors.phoneNumber) {
    //   setCheckValidity(false);
    // }

    if (isFilledCorrectly()) {
        router.push("/summary")
    } else {
      console.error({
        function: "submitHandler",
        page: "register",
        errors: Object.keys(newErrorState)
      }, "Couldn't submit registration form, some values are missing or invalid");
      setLoading(false);
    }
  }
  
  return (
    <div className='w-96 p-4 mx-auto text-center'>
      <h1>Společnost</h1>
      <form 
        onSubmit={ submitHandler }
        className=''
      >
        {/* ares ičo */}
        <InputWithError 
          id='personalIdNumber'
          type='text'
          placeholder='IČO'
          value={ registrationForm.personalIdNumber }
          onChange={ valueChangeHandler }
          error={ errors.personalIdNumber }
        />
        {/* dič */}
        <InputWithError 
          id='vatIdNumber'
          type='text'
          placeholder='DIČ'
          value={ registrationForm.vatIdNumber }
          onChange={ valueChangeHandler }
          error={ errors.vatIdNumber }
        />
        {/* jméno společnosti */}
        <InputWithError 
          id='companyName'
          type='text'
          placeholder='Název společnosti'
          value={ registrationForm.companyName }
          onChange={ valueChangeHandler }
          error={ errors.companyName }
        />
        {/* ulice */}
        <InputWithError 
          id='street'
          type='text'
          placeholder='ulice'
          value={ registrationForm.street }
          onChange={ valueChangeHandler }
          error={ errors.street }
        />
        {/* číslo ulice */}
        <InputWithError 
          id='streetNumber'
          type='text'
          placeholder='číslo popisné'
          value={ registrationForm.streetNumber }
          onChange={ valueChangeHandler }
          error={ errors.streetNumber }
        />
        {/* město */}
        <InputWithError 
          id='city'
          type='text'
          placeholder='město'
          value={ registrationForm.city }
          onChange={ valueChangeHandler }
          error={ errors.city }
        />
        {/* psč */}
        <InputWithError 
          id='postalCode'
          type='text'
          placeholder='psč'
          value={ registrationForm.postalCode }
          onChange={ valueChangeHandler }
          error={ errors.postalCode }
        />
        <ButtonWithLoading
          isLoading={ isLoading }
          color='orange'
          onClick={ submitHandler }
        >
          Pokračovat
        </ButtonWithLoading>
      </form>
    </div>
  )
};

export default Address;