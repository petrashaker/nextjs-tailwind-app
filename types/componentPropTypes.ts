import { InputHTMLAttributes, MouseEventHandler, ReactNode } from "react";

export type SelectType = {
  id: string, 
  options: { id: string, name: string }[], 
  defaultValue: string, 
  onItemChange: any, 
}

// Definition for inputWithError
export type InputWithErrorProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  hidden?: boolean;
  gridItem?: string;
  feedback?: boolean;
  feedbackMessageKey?: string;
  feedbackMessageNamespace?: string;
  floatingLabel?: boolean;
  errorMessageVisible?: boolean;
  onData?: (arg: any) => void;
  onAresClassNameChange?: string;
};

// Props for button with loading
export type ButtonWithLoadingProps = {
  children: ReactNode;
  isLoading: boolean;
  color: "white" | "orange";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler;
  "data-st-key"?: string;
  content?: string;
  isDisabled?: boolean;
};