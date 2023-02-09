export interface SerializedPageDataProps {
  data: string
}

export interface PageDataProps<T extends object = object> {
  data: T
}
