export type GenericAddress<T> =  {
  name: string,
  street: string,
  streetNumber: string,
  city: string,
  postalCode: string,
  country: T,
}