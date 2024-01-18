export type TrainingFormDataType = {
  type: string,
  focus: string,
  source: string,
  time: number
}

export type OptionType = {
  id: string,
  name: {
    cs: string,
    en: string
  }
}

export type SelectOptionsType = {
  trainingType: OptionType[]
  focus: OptionType[]
}