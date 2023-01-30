export interface SerializedPageDataProps {
  data: string
}

export interface PageDataProps<T extends {} = {}> {
  data: T
}
