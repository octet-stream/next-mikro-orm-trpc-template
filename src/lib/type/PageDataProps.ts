export interface SerializedPageDataProps {
  data?: string
}

export interface PageDataProps<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  data?: T
}
