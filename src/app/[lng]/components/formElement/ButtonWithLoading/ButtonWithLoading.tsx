import { MouseEvent } from "react";
import LoadingLogo from "../../icons/LoadingLogo/LoadingLogo"
import Image from "next/image";
// import LoginIcon from "../../public/icons/login-arrow.svg";
// import NextIcon from "../../public/icons/arrow-right-solid.svg";
// import UploadIcon from "../../public/icons/upload.svg";
import { ButtonWithLoadingProps } from "../../../../../../types/componentPropTypes";

/**
 * Button component with loading state.
 * While loading state is active, button does not respond to click events.
 * Note: for type "submit" loading state does not prevent submit actions (eg. on enter),
 *   should be handled by parent if required.
 * Required params:
 *   - isLoading - loading state provided by parent
 *   - color     - background color scheme (defined in CSS (cyan-600 / white))
 *   - text      - text color scheme (defined in CSS (white / black)
 *   - children  - children elements to be displayed inside the button
 * Optional params:
 *   - type      - "button" (default), "submit" or "reset"
 *   - onClick   - mouse click handler
 *   - isDisabled - boolean
 * @param props             button parameters
 */
const ButtonWithLoading = (props: ButtonWithLoadingProps) => {
  // set default type to "button"
  const type = props.type || "button";

  // button is inactive while loading, otherwise performs onClick callback
  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (props.isLoading) {
      return;
    } else {
      if (props.onClick) {
        props.onClick(event);
      } else {
        console.debug({
          component: "buttonWithLoading",
          props,
          function: "clickHandler"
        }, "Component is missing 'onClick' callback.");
      }
    }
  };

  return (
    <button
      type={ type }
      className={ `bg-${props.color} border-${props.color} border-2 py-1.5 px-5 rounded-md hover:bg-cyan-300` }
      onClick={ clickHandler }
      disabled={ props.isDisabled }
    >
      {
        props.isLoading ?
            <LoadingLogo />
            :
            <span className={ `text-${props.text}` }>{ props.children }</span>
      }
      
    </button>
  );
};

export default ButtonWithLoading;