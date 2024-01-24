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
 *   - color     - color scheme (defined in CSS (white / orange))
 *   - children  - children elements to be displayed inside the button
 * Optional params:
 *   - className - HTML class attribute
 *   - type      - "button" (default), "submit" or "reset"
 *   - onClick   - mouse click handler
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

  // const switchIcon = (content: string | undefined) => {
  //   if(content === "login") {
  //     return (
  //       <span className="plus-icon">
  //       <Image src={LoginIcon} alt="login-icon" />
  //     </span>
  //     );
  //   } else if(content === "upload") {
  //     return (
  //       <span className="plus-icon">
  //         <Image src={UploadIcon} alt="upload-icon" />
  //       </span>
  //     );
  //   } else {
  //     return (
  //       <span className="plus-icon">
  //         <Image src={NextIcon} alt="next-icon" />
  //       </span>
  //     );
  //   }
  // };

  return (
    <button
      type={ type }
      className={ `${props.color}-button ${props.className}` }
      onClick={ clickHandler }
      data-st-key={ props["data-st-key"] }
      disabled={ props.isDisabled }
    >
      {
        props.isLoading &&
          <div className={ "button-overlay" }>
            <LoadingLogo />
          </div>
      }
      {/* { switchIcon(props.content) } */}
      <span className="plus-title">{ props.children }</span>
    </button>
  );
};

export default ButtonWithLoading;