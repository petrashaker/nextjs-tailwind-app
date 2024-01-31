import { isEmptyString } from "../../../../utils/stringUtils";
import { CITY_LENGTH, COMPANY_LENGTH, EMAIL_LENGTH, FIRST_NAME_LENGTH, PERSONAL_ID_NB_LENGTH, POSTAL_CODE_LENGTH, STREET_LENGTH, STREET_NB_LENGTH, SURNAME_LENGTH, VAT_ID_NB_LENGTH, Validation } from "../../../../utils/constants";
import { KeyHtmlElemenObjectType, KeyStringObjectType } from "../../../../types/componentUtilsTypes";
import { useTranslation } from "@/app/i18/client";

const useValidation = (lng: string) => {
  const { t } = useTranslation(lng, 'validation');

  const getFullErrorKey = (key: string) => {
    return t(`validation:validation.${key}`);
  };
  const getFullLengthErrorKey = (key: string) => {
    return t(`validation:validation.lengthCheck.${key}`);
  };
  const getFullFormatErrorKey = (key: string) => {
    return t(`validation:validation.formatCheck.${key}`);
  }; 

  const formatAndLengthValidationCheck = (inputValue: string, inputId: string, isFilledCorrectly: boolean, newErrorState: any) => {
    switch(inputId) {
      case "firstName": 
      if(inputValue.trim().length > FIRST_NAME_LENGTH) {
        isFilledCorrectly = false;
        //@ts-ignore
        newErrorState[inputId] = getFullLengthErrorKey(`${inputId}`);
      }
      break;
      
      case "surname":
        if(inputValue.trim().length > SURNAME_LENGTH) {
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullLengthErrorKey(`${inputId}`);
        }
      break;

      case "email":
      if (!Validation.email.test(inputValue.trim())) {
          // invalid email
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullErrorKey("invalidEmail");
        } else if(inputValue.trim().length > EMAIL_LENGTH) {
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullLengthErrorKey(`${inputId}`);
        }
      break;
  
      case "phoneNumber":
        if(isEmptyString(inputValue)) {
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullErrorKey(`${inputId}`);
        }
        if (!Validation.phone.test(inputValue.trim())) {
          // invalid phone number
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullErrorKey("invalidPhone");
        } 
      break;

      case "personalIdNumber": 
      if(inputValue?.trim().length > PERSONAL_ID_NB_LENGTH) {
        isFilledCorrectly = false;
        //@ts-ignore
        newErrorState[inputId] = getFullLengthErrorKey(`${inputId}`);
      }
      if(!(Validation.personalIdNumber).test(inputValue?.trim())) {
        // invalid company registration number
        isFilledCorrectly = false;
        //@ts-ignore
        newErrorState[inputId] = getFullFormatErrorKey(`${inputId}`);
      }  
      break;
  
      case "vatIdNumber": 
        if(inputValue?.trim().length > VAT_ID_NB_LENGTH) {
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullLengthErrorKey(`${inputId}`);
        }
        if(!(Validation.vatIdNumber).test(inputValue?.trim())) {
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullFormatErrorKey(`${inputId}`);
        }
      break;
  
      case "companyName": // validation of company name
        if(inputValue?.trim().length > COMPANY_LENGTH) {
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullLengthErrorKey(`${inputId}`);
        }
      break;
        
      case "street":
        if(inputValue?.trim().length > STREET_LENGTH) {
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullLengthErrorKey(`${inputId}`);
        }
      break;
  
      case "streetNumber":
        if(inputValue?.trim().length > STREET_NB_LENGTH) {
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullLengthErrorKey(`${inputId}`);
        }
      break;
  
      case "city":
        if(inputValue?.trim().length > CITY_LENGTH) {
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullLengthErrorKey(`${inputId}`);
        }
      break;
  
      case "postalCode":
        if(inputValue?.trim().length > POSTAL_CODE_LENGTH) {
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullLengthErrorKey(`${inputId}`);
        }
        if(!(Validation.postalCode).test(inputValue?.trim())) {
          isFilledCorrectly = false;
          //@ts-ignore
          newErrorState[inputId] = getFullFormatErrorKey(`${inputId}`);
        }
       break;
  
    } 
    return isFilledCorrectly;
  }; 
  
  /**
   * Validation of registration form if input is or isn't empty
   * @param object 
   * @param errors 
   * @param deliveryErrors 
   * @param diffentDelivery 
   * @returns 
   */
  const registrationInputIsNotEmpty = (object: NodeListOf<HTMLInputElement> | undefined, errors: KeyStringObjectType) => {
    const data: KeyHtmlElemenObjectType = object !== undefined ? Array.from(object).reduce((acc, input) => {
      acc[input.id] = input;
      return acc;
    }, {} as KeyHtmlElemenObjectType) : {};    let isFilledCorrectly = true;
    const newErrorState = errors;

    Object.keys(data).forEach((key) => {
      const inputValue = data[key].value;
      const inputId = data[key].id;

      // vatIdNumber is not mandatory
      if(inputId !== "vatIdNumber") {
        if(isEmptyString(inputValue)) {
          isFilledCorrectly = false;
          newErrorState[inputId] = getFullErrorKey(`${inputId}`);
        }
      }
      isFilledCorrectly = formatAndLengthValidationCheck(inputValue, inputId, isFilledCorrectly, newErrorState);

    });
  
    return { isFilledCorrectly, newErrorState };
  };
  
  return { registrationInputIsNotEmpty };
};

export default useValidation;