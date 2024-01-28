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
  onAresClassNameChange?: string;
};

// Props for button with loading
export type ButtonWithLoadingProps = {
  children: ReactNode;
  isLoading: boolean;
  color: "cyan-600" | "white";
  text: "white" | "black"
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler;
  isDisabled?: boolean;
};

export type AresUploadBtnProps = {
  query: string;
  id: string;
  isDisabled: boolean;
  errorMessage?: boolean;
};