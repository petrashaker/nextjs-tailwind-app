import Image from "next/image";
// import ErrorIconRed from "../../public/icons/delete-cross-red.svg";
// import CheckIconGrey from "../../public/icons/check-grey.svg";
// import CheckIconOrange from "../../public/icons/check-orange.svg";
import { useState } from "react";
import { useEffect } from "react";
import { InputWithErrorProps } from "../../../../../../types/componentPropTypes";
import { isNotEmptyString } from "../../../../../../utils/stringUtils";


/**
 * Input component with associated error message element.
 * Accepts type, size, placeholder and value.
 * @param props         parameters conforming to Partial FormInputType
 */
const InputWithError = (props: Partial<InputWithErrorProps>) => {
  const showError = typeof props.error !== "undefined" && props.error.trim().length > 0;
  const [inputValidity, setInputState] = useState<string>("notInitialized");

  const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState("focus");
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    isNotEmptyString(event.currentTarget.value) ? setInputState("valid") : setInputState("error");
  };

  // const iconValidity = (inputValidity: string) => {
  //   switch (inputValidity) {
  //    case "valid": return CheckIconOrange;
  //    case "error": return ErrorIconRed;
  //    case "focus": return CheckIconGrey;
  //    default: return "notInitialized";
  //   }
  //  };

  const inputClasses = "block my-1.5 rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-2 appearance-none focus:border-teal-300 focus:outline-none focus:ring-0 peer"
  const errorInputClasses = `${inputClasses} border-red-500 `
  const standardInputClasses = `${inputClasses} border-cyan-700`

  useEffect(() => {
  props.onAresClassNameChange !== undefined && setInputState(props.onAresClassNameChange);
  // for case when user use their saved data in browser and fills it automatically
  typeof props.value === "string" && props.value.length > 0  && setInputState("valid");
  }, [props.onAresClassNameChange, props.value]);

   return (
    <>
      <input
        id={ props.id }
        type={ props.type }
        className={ props.error ? errorInputClasses : standardInputClasses }
        placeholder={ props.placeholder }
        value={ props.value }
        onChange={ props.onChange }
        onBlur={ handleBlur }
        autoFocus={ props.autoFocus }
        onKeyDown={ props.onKeyDown }
        onFocus = { handleFocus }
        // @ts-ignore
        data-st-key={ props["data-st-key"] }
      />
      { showError && <p className="text-red-500 text-sm">{ props.error }</p> }
    </>
  );
};

export default InputWithError;