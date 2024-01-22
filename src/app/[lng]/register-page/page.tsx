'use client'

import InputWithError from '../components/formElement/InputWithError/InputWithError'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hook'
import { setValue } from '@/lib/features/registration/registrationFormSlice'

const RegisterPage = ({ params: { lng } } : { params: { lng: string }}) => {
  const dispatch = useAppDispatch();
  const store = useAppStore();
  // use registration form state from redux
  const registrationForm = useAppSelector(state => state.registrationForm)

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
  
  const submitHandler = ( event: FormEvent) => {
    event.preventDefault();
    console.log("event:", event);
  }

  return (
    <form onSubmit={ submitHandler }>
    {/* jméno */}
    <InputWithError 
      id='registerFirstName'
      type='text'
      placeholder='jméno'
      value={ registrationForm.firstName }
      onChange={valueChangeHandler}
    />
    {/* příjmení */}
    <InputWithError 
      id='registerSurname'
      type='text'
      placeholder='příjmení'
      value={ registrationForm.surname }
      onChange={valueChangeHandler}
    />
    {/* email */}
    <InputWithError 
      id='registerEmail'
      type='text'
      placeholder='email'
      value={ registrationForm.email }
      onChange={valueChangeHandler}
    />
    {/* telefon */}
    <InputWithError 
      id='registerPhone'
      type='text'
      placeholder='telefon'
      value={ registrationForm.phoneNumber }
    />

    </form>
  )
}

export default RegisterPage