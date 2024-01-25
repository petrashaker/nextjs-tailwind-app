'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hook";
import InputWithError from "../../components/formElement/InputWithError/InputWithError";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import ButtonWithLoading from "../../components/formElement/ButtonWithLoading/ButtonWithLoading";
import { setValue } from "@/lib/features/registration/registrationFormSlice";
import { isEmptyString } from "../../../../../utils/stringUtils";
import { useTranslation } from "@/app/i18/client";

const Address = ({ params: { lng } } : { params: { lng: string }}) => {
  const { t } = useTranslation(lng, 'auth')
  const dispatch = useAppDispatch();
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
  
  /**
   * Helper function to check validation of inputs.
   * Vat ID is not mandatory.
   * @returns 
   */
  const isFilledCorrectly = () => {
    let isFilledCorrectly = true;
    const newErrorState = initialErrors;

    if(isEmptyString(registrationForm.personalIdNumber)) {
      isFilledCorrectly = false;
      newErrorState.personalIdNumber = t("errorMessage.missing.personalIdNumber");
    }
    if(isEmptyString(registrationForm.companyName)) {
      isFilledCorrectly = false;
      newErrorState.companyName = t("errorMessage.missing.companyName");
    }
    if(isEmptyString(registrationForm.street)) {
      isFilledCorrectly = false;
      newErrorState.street = t("errorMessage.missing.street");
    }
    if(isEmptyString(registrationForm.streetNumber)) {
      isFilledCorrectly = false;
      newErrorState.streetNumber = t("errorMessage.missing.streetNumber");
    }
    if(isEmptyString(registrationForm.city)) {
      isFilledCorrectly = false;
      newErrorState.city = t("errorMessage.missing.city");
    }
    if(isEmptyString(registrationForm.postalCode)) {
      isFilledCorrectly = false;
      newErrorState.postalCode = t("errorMessage.missing.postalCode");
    }

    setErrors(newErrorState);
    return isFilledCorrectly;
  };
  
  const submitHandler = ( event: FormEvent ) => {
    event.preventDefault();
    
    if (isLoading) {
      return;
    }
    setLoading(true);

    const newErrorState = errors;
    setErrors({
      ...newErrorState
    });

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
      <h1>{ t("title.address") }</h1>
      <form onSubmit={ submitHandler }>
        <InputWithError 
          id={ 'personalIdNumber' }
          type={ 'text' }
          placeholder={ t("placeholders.personalIdNumber") }
          value={ registrationForm.personalIdNumber }
          onChange={ valueChangeHandler }
          error={ errors.personalIdNumber }
        />
        <InputWithError 
          id={ 'vatIdNumber' }
          type={ 'text' }
          placeholder={ t("placeholders.vatIdNumber") }
          value={ registrationForm.vatIdNumber }
          onChange={ valueChangeHandler }
          error={ errors.vatIdNumber }
        />
        <InputWithError 
          id={ 'companyName' }
          type={ 'text' }
          placeholder={ t("placeholders.companyName") }
          value={ registrationForm.companyName }
          onChange={ valueChangeHandler }
          error={ errors.companyName }
        />
        <InputWithError 
          id={ 'street' }
          type={ 'text' }
          placeholder={ t("placeholders.street") }
          value={ registrationForm.street }
          onChange={ valueChangeHandler }
          error={ errors.street }
        />
        <InputWithError 
          id={ 'streetNumber' }
          type={ 'text' }
          placeholder={ t("placeholders.streetNumber") }
          value={ registrationForm.streetNumber }
          onChange={ valueChangeHandler }
          error={ errors.streetNumber }
        />
        <InputWithError 
          id={ 'city' }
          type={ 'text' }
          placeholder={ t("placeholders.city") }
          value={ registrationForm.city }
          onChange={ valueChangeHandler }
          error={ errors.city }
        />
        <InputWithError 
          id={ 'postalCode' }
          type={ 'text' }
          placeholder={ t("placeholders.postalCode") }
          value={ registrationForm.postalCode }
          onChange={ valueChangeHandler }
          error={ errors.postalCode }
        />
        <ButtonWithLoading
          isLoading={ isLoading }
          color={ 'cyan-600' }
          text={ 'white' }
          type={ 'submit' }
        >
          { t("button.continue") }
        </ButtonWithLoading>
      </form>
    </div>
  )
};

export default Address;