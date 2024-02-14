'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hook";
import ButtonWithLoading from "../../components/formElement/ButtonWithLoading/ButtonWithLoading";
import { useState } from "react";
import { push, ref, set } from "firebase/database";
import { database } from "@/app/firebaseCongif";
import { resetState } from "@/lib/features/registration/registrationFormSlice";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18/client";

const Summary = ({ params: { lng } } : { params: { lng: string }}) => {
  const { t } = useTranslation(lng, 'auth')
  // state for loading
  const [ isLoading, setLoading ] = useState(false);
  const registrationForm = useAppSelector(state => state.registrationForm)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const submitHandler = () => {
    if (isLoading) {
      return;
    }
    setLoading(true);

    try {
      const registrationRef = ref(database, "registration")
      const newDataRef = push(registrationRef)

      set(newDataRef, {
        firstName: registrationForm.firstName,
        surname: registrationForm.surname,
        email: registrationForm.email,
        phoneNumber: registrationForm.phoneNumber,
        personalIdNumber: registrationForm.personalIdNumber,
        vatIdNumber: registrationForm.vatIdNumber,
        companyName: registrationForm.companyName,
        street: registrationForm.street,
        streetNumber: registrationForm.streetNumber,
        city: registrationForm.city,
        postalCode: registrationForm.postalCode, 
      })
      dispatch(resetState())
      console.log("Data successfully loaded to Firebase.")
      router.push("/confirmation")
    } catch(error) {
      console.error("Data not added", error)
      setLoading(false)
    }
  }

  return(
    <>
    <h1>          { t("title.summary") }
</h1>
      <table className='w-96 p-4 mx-auto text-center'>
        <tbody>
          <tr className="text-left">
            <td className="text-left">{ t("placeholders.firstName") }:</td>
            <td className="text-left">{ registrationForm.firstName }</td>
          </tr>
          <tr className="text-left">
            <td className="text-left">{ t("placeholders.surname") }:</td>
            <td className="text-left">{ registrationForm.surname }</td>
          </tr>
          <tr className="text-left">
            <td className="text-left">{ t("placeholders.email") }:</td>
            <td className="text-left">{ registrationForm.email }</td>
          </tr>
          <tr className="text-left">
            <td className="text-left">{ t("placeholders.phoneNumber") }:</td>
            <td className="text-left">{ registrationForm.phoneNumber }</td>
          </tr>
          <tr className="text-left">
            <td className="text-left">{ t("placeholders.companyName") }:</td>
            <td className="text-left">{ registrationForm.companyName }</td>
          </tr>
          <tr className="text-left">
            <td className="text-left">{ t("placeholders.personalIdNumber") }:</td>
            <td className="text-left">{ registrationForm.personalIdNumber }</td>
          </tr>
          {registrationForm.vatIdNumber && 
            <tr className="text-left">
              <td className="text-left">{ t("placeholders.vatIdNumber") }:</td>
              <td className="text-left">{ registrationForm.vatIdNumber }</td>
            </tr>
          }
          <tr className="text-left">
            <td className="text-left">{ t("placeholders.street") }:</td>
            <td className="text-left">{ registrationForm.street }</td>
          </tr>
          <tr className="text-left">
            <td className="text-left">{ t("placeholders.streetNumber") }:</td>
            <td className="text-left">{ registrationForm.streetNumber }</td>
          </tr>
          <tr className="text-left">
            <td className="text-left">{ t("placeholders.city") }:</td>
            <td className="text-left">{ registrationForm.city }</td>
          </tr>
          <tr className="text-left">
            <td className="text-left">{ t("placeholders.postalCode") }:</td>
            <td className="text-left">{ registrationForm.postalCode }</td>
          </tr>
          <ButtonWithLoading
            isLoading={ isLoading }
            color={ 'cyan-600' }
            text={ 'white' }
            onClick={ submitHandler }
          >
            { t("button.submit") }
          </ButtonWithLoading>
        </tbody>
      </table>
      </>
  )
}

export default Summary;