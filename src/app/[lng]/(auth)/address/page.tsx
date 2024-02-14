'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hook";
import InputWithError from "../../components/formElement/InputWithError/InputWithError";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ButtonWithLoading from "../../components/formElement/ButtonWithLoading/ButtonWithLoading";
import { setAresData, setValue } from "@/lib/features/registration/registrationFormSlice";
import { useTranslation } from "@/app/i18/client";
import AresButton from "../../components/AresButton/AresButton";
import { StateType } from "../../../../../utils/constants";
import useValidation from "../../customHooks/useValidation";

const Address = ({ params: { lng } } : { params: { lng: string }}) => {
  const { t } = useTranslation(lng, 'auth')
  const dispatch = useAppDispatch();
  const router = useRouter()
  // validation of submited data from custom hook
  const { registrationInputIsNotEmpty } = useValidation(lng);
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
    
  const submitHandler = ( event: FormEvent ) => {
    event.preventDefault();
    
    if (isLoading) {
      return;
    }

    // getting IDs of used input elements 
    const formElement = document.querySelector('form')
    const inputElements = formElement?.querySelectorAll('input');
    inputElements !== undefined && inputElements.forEach(input => {
      const inputId = input.id;
      const inputValue = input.value;
    });

    setLoading(true);

    const newErrorState = errors;
    const isFilledCorrectly = registrationInputIsNotEmpty(inputElements, newErrorState).isFilledCorrectly;

    setErrors({
      ...newErrorState
    });

    if (isFilledCorrectly) {
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

  // accept Ares data from InputWithError component id "personalIdNumber" or id "billing-name"
  const aresData = useAppSelector((state) => state.aresData);
  useEffect(() => {
    if(aresData.state === StateType.SUCCESS) {
      dispatch(setAresData(aresData));
    }
  }, [aresData, dispatch]);

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
        <AresButton
          query={ registrationForm.personalIdNumber } 
          id={ 'personalIdNumber' } 
          isDisabled={ registrationForm.personalIdNumber.length > 6 }
          lng={ lng }
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
        <AresButton 
          query={ registrationForm.companyName } 
          id={ 'companyName' } 
          isDisabled={ registrationForm.companyName.length > 3 }
          lng={ lng }
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
          onClick={ submitHandler }
        >
          { t("button.continue") }
        </ButtonWithLoading>
      </form>
    </div>
  )
};

export default Address;