'use client'

import InputWithError from '../../components/formElement/InputWithError/InputWithError'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hook'
import { setValue } from '@/lib/features/registration/registrationFormSlice'
import ButtonWithLoading from '../../components/formElement/ButtonWithLoading/ButtonWithLoading'
import { useRouter } from 'next/navigation'
import { isEmptyString } from '../../../../../utils/stringUtils'
import { Validation } from '../../../../../utils/constants'

const RegisterPage = ({ params: { lng } } : { params: { lng: string }}) => {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const router = useRouter()
  // use registration form state from redux
  const registrationForm = useAppSelector(state => state.registrationForm)
  console.log("registrationForm:", registrationForm);
  // initial errors for required values
  const initialErrors = {
    firstName: "",
    surname: "",
    email: "",
    password: "",
    phoneNumber: ""
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

    if(isEmptyString(registrationForm.firstName)) {
      isFilledCorrectly = false;
      newErrorState.firstName = "Je třeba vyplnit křestní jméno.";
    }
    if(isEmptyString(registrationForm.surname)) {
      isFilledCorrectly = false;
      newErrorState.surname = "Je třeba vyplnit příjmení.";
    }
    if(isEmptyString(registrationForm.email)) {
      isFilledCorrectly = false;
      newErrorState.email = "Je třeba vyplnit email."
    }
    if(!Validation.email.test(registrationForm.email.trim())) {
      isFilledCorrectly = false;
      newErrorState.email = "Zadaný email nesplňuje požadavky pro email."
    }
    if(isEmptyString(registrationForm.phoneNumber)) {
      isFilledCorrectly = false;
      newErrorState.phoneNumber = "Je třeba vyplnit telefonní číslo."
    }
    if(!Validation.phone.test(registrationForm.phoneNumber.trim())) {
      isFilledCorrectly = false;
      newErrorState.phoneNumber = "Zadané telefonní číslo nesplňuje požadavky pro telefonní číslo."
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
        router.push("/address")
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
      <h1>Kontaktní osoba</h1>
      <form 
        onSubmit={ submitHandler }
        className=''
      >
        {/* jméno */}
        <InputWithError 
          id='firstName'
          type='text'
          placeholder='jméno'
          value={ registrationForm.firstName }
          onChange={ valueChangeHandler }
          error={ errors.firstName }
        />
        {/* příjmení */}
        <InputWithError 
          id='surname'
          type='text'
          placeholder='příjmení'
          value={ registrationForm.surname }
          onChange={ valueChangeHandler }
          error={ errors.surname }
        />
        {/* email */}
        <InputWithError 
          id='email'
          type='text'
          placeholder='email'
          value={ registrationForm.email }
          onChange={ valueChangeHandler }
          error={ errors.email }
        />
        {/* telefon */}
        <InputWithError 
          id='phoneNumber'
          type='text'
          placeholder='telefon'
          value={ registrationForm.phoneNumber }
          onChange={ valueChangeHandler }
          error={ errors.phoneNumber }
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
}

export default RegisterPage