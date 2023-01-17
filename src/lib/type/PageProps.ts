export interface PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  data: T
}
