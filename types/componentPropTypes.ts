import { OptionType } from "./componentStateTypes"

export type SelectType = {
  id: string, 
  options: { id: string, name: string }[], 
  defaultValue: string, 
  onItemChange: any, 
}