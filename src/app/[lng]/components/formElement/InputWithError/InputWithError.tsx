import Image from "next/image";
import ErrorIconRed from "../../../../../../public/icons/error-cross-red.svg"
import CheckIconGrey from "../../../../../../public/icons/check-grey.svg";
import CheckIconOrange from "../../../../../../public/icons/check-correct.svg";
import { useEffect, useState } from "react";
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
  const [floatingLabel, setFloatingLabel] = useState(false)

  const handleFocus = () => {
    setInputState("focus");
    setFloatingLabel(true)
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    isNotEmptyString(event.currentTarget.value) ? setInputState("valid") : setInputState("error");
  };

  const iconValidity = (inputValidity: string) => {
    const iconTag = (icon: any) => {
      return (
        <span className="absolute right-11 bottom-7">
        <Image 
          src={icon} 
          alt={`icon-${inputValidity}`} 
          width={15} 
          height={15}
          
        /> 
        </span>
      )
    }

    switch (inputValidity) {
     case "valid": return iconTag(CheckIconOrange);
     case "error": return iconTag(ErrorIconRed);
     case "focus": return iconTag(CheckIconGrey);
     default: return <></>;
    }
   };

  const inputClasses = "block my-1.5 rounded px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-2 appearance-none focus:border-teal-300 focus:outline-none focus:ring-0 peer"
  const errorInputClasses = `${inputClasses} border-red-500 `
  const standardInputClasses = `${inputClasses} border-cyan-700`

  useEffect(() => {
  // props.onAresClassNameChange !== undefined && setInputState(props.onAresClassNameChange);
  // for case when user use their saved data in browser and fills it automatically
  if(typeof props.value === "string" && props.value.length > 0) {
    setInputState("valid");
    setFloatingLabel(true)
  }
  }, [props.onAresClassNameChange, props.value]);
  
   console.log("value:", typeof props.value, props.placeholder)
   return (
    <>
      <input
        id={ props.id }
        type={ props.type }
        className={ props.error ? errorInputClasses : standardInputClasses }
        placeholder={ !floatingLabel ? props.placeholder : "" }
        value={ props.value }
        onChange={ props.onChange }
        onBlur={ handleBlur }
        autoFocus={ props.autoFocus }
        onKeyDown={ props.onKeyDown }
        onFocus = { handleFocus }
      />
      <div className="relative">
        { iconValidity(inputValidity) }
        {/* TODO tooltip */}
        <span className="absolute bottom-6 right-3 cursor-pointer group">
          {/* <span className="opacity-0 translate-x-[-20px] group-hover:opacity-100 group-hover:translate-x-[20px] transition-all duration-300 absolute w-32">delší text na hover ještě delší a delší delší text na hover ještě delší a delší</span> */}
          <span 
            className="bg-gray-400 rounded-full py-0.5 px-2 text-sm text-gray-50"
          >?</span>
        </span>
      </div>
      <div className="relative">
        <span className={`${floatingLabel ? "p-2 transition-opacity duration-500 transform translate-y-[-190%] translate-x-[-83%]" : "opacity-0" } absolute pointer-events-none w-52 text-left text-xs`}> { props.placeholder } </span>
      </div>
      { showError && <p className="text-red-500 text-sm">{ props.error }</p> }
    </>
  );
};

export default InputWithError;