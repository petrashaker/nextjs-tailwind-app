'use client'

import { useAppSelector } from "@/lib/hook";
import ButtonWithLoading from "../../components/formElement/ButtonWithLoading/ButtonWithLoading";
import { useState } from "react";

const Summary = () => {
  // state for loading
  const [ isLoading, setLoading ] = useState(false);
  const registrationForm = useAppSelector(state => state.registrationForm)

  const submitHandler = () => {

  }
  
  return(
    <div className='w-96 p-4 mx-auto text-center'>
      <h3>Shrnutí</h3>
      <div>
        <span>Jméno:</span>
        <span>{ registrationForm.firstName }</span>
      </div>
      <div>
        <span>Příjmení:</span>
        <span>{ registrationForm.surname }</span>
      </div>
      <div>
        <span>Email:</span>
        <span>{ registrationForm.email }</span>
      </div>
      <div>
        <span>Telefon:</span>
        <span>{ registrationForm.phoneNumber }</span>
      </div>
      <div>
        <span>Název společnosti:</span>
        <span>{ registrationForm.companyName }</span>
      </div>
      <div>
        <span>IČO:</span>
        <span>{ registrationForm.personalIdNumber }</span>
      </div>
      <div>
        <span>DIČ:</span>
        <span>{ registrationForm.vatIdNumber }</span>
      </div>
      <div>
        <span>Ulice:</span>
        <span>{ registrationForm.street }</span>
      </div>
      <div>
        <span>Číslo popisné:</span>
        <span>{ registrationForm.streetNumber }</span>
      </div>
      <div>
        <span>Město:</span>
        <span>{ registrationForm.city }</span>
      </div>
      <div>
        <span>PSČ:</span>
        <span>{ registrationForm.postalCode }</span>
      </div>
      <ButtonWithLoading
          isLoading={ isLoading }
          color='orange'
          onClick={ submitHandler }
        >
        Dokončit
      </ButtonWithLoading>
    </div>
  )
}

export default Summary;