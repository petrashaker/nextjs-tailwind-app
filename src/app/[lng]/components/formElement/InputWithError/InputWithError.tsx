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

   useEffect(() => {
    props.onAresClassNameChange !== undefined && setInputState(props.onAresClassNameChange);
    // for case when user use their saved data in browser and fills it automatically
    typeof props.value === "string" && props.value.length > 0  && setInputState("valid");
   }, [props.onAresClassNameChange, props.value]);

   return (
    <div className={`login-layout__register-form--${props.gridItem}`}>
      <label htmlFor={ props.id } className="floating-label">
      <input
        id={ props.id }
        type={ props.type }
        className={ 
          `input ${props.className}` +
          // if input is filled incorrectly (error) its border color changes 
          (showError ? " input_error" : "") + 
          // class for inputs which are hidden for first render (e.g. can be uncovered on click etc.)
          (props.hidden ? " hidden" : "") + 
          // floating labes class
          " floating-label__input " + 
          // input border color changes according to its validation
          ` input_${inputValidity} ` + 
          // if Ares is used for search relevant inputs using this class
          props.onAresClassNameChange
        }
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
      {props.floatingLabel ? <span className="floating-label__span">{ props.placeholder }</span> : null}
      </label>
      <div className="position-relative">
        {props.feedback && <div className={"feedback login-layout__feedback"}>
              <span className={"feedback__icon"}>?</span>
              <div className={"feedback__box"}>
                {/* <Trans
                  i18nKey={String(props.feedbackMessageKey)}
                  components={[<br key={0} />]}
                  ns={props.feedbackMessageNamespace}
                /> */}
              </div>
        </div>}
        {/* {inputValidity !== "notInitialized" && <div className="input__validity-icon">
          <Image src={iconValidity(inputValidity)} alt={`icon-${inputValidity}`} />
        </div>} */}
      </div>
      <span id={`${props.id}-error`} className={ (props.errorMessageVisible ? "error" : "hidden")}>
        { props.error }
      </span>
    </div>
  );
};

export default InputWithError;