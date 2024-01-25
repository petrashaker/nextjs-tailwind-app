'use client'

import InputWithError from '../../components/formElement/InputWithError/InputWithError'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { setValue } from '@/lib/features/registration/registrationFormSlice'
import ButtonWithLoading from '../../components/formElement/ButtonWithLoading/ButtonWithLoading'
import { useRouter } from 'next/navigation'
import { isEmptyString } from '../../../../../utils/stringUtils'
import { Validation } from '../../../../../utils/constants'
import { useTranslation } from '@/app/i18/client'

const RegisterPage = ({ params: { lng } } : { params: { lng: string }}) => {
  const { t } = useTranslation(lng, 'auth')
  const dispatch = useAppDispatch();
  const router = useRouter()
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
      newErrorState.firstName = t("errorMessage.missing.personalIdNumber");
    }
    if(isEmptyString(registrationForm.surname)) {
      isFilledCorrectly = false;
      newErrorState.surname = t("errorMessage.missing.personalIdNumber");
    }
    if(isEmptyString(registrationForm.email)) {
      isFilledCorrectly = false;
      newErrorState.email = t("errorMessage.missing.personalIdNumber");
    }
    if(!Validation.email.test(registrationForm.email.trim())) {
      isFilledCorrectly = false;
      newErrorState.email = t("errorMessage.wrongType.email");
    }
    if(isEmptyString(registrationForm.phoneNumber)) {
      isFilledCorrectly = false;
      newErrorState.phoneNumber = t("errorMessage.missing.personalIdNumber");
    }
    if(!Validation.phone.test(registrationForm.phoneNumber.trim())) {
      isFilledCorrectly = false;
      newErrorState.phoneNumber = t("errorMessage.wrongType.email");
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
      <h1>{ t("title.register") }</h1>
      <form onSubmit={ submitHandler }>
        <InputWithError 
          id={ 'firstName' }
          type={ 'text' }
          placeholder={ t("placeholders.firstName") }
          value={ registrationForm.firstName }
          onChange={ valueChangeHandler }
          error={ errors.firstName }
        />
        <InputWithError 
          id={ 'surname' }
          type={ 'text' }
          placeholder={ t("placeholders.surname") }
          value={ registrationForm.surname }
          onChange={ valueChangeHandler }
          error={ errors.surname }
        />
        <InputWithError 
          id={ 'email' }
          type={ 'text' }
          placeholder={ t("placeholders.email") }
          value={ registrationForm.email }
          onChange={ valueChangeHandler }
          error={ errors.email }
        />
        <InputWithError 
          id={ 'phoneNumber' }
          type={ 'text' }
          placeholder={ t("placeholders.phoneNumber") }
          value={ registrationForm.phoneNumber }
          onChange={ valueChangeHandler }
          error={ errors.phoneNumber }
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
}

export default RegisterPage