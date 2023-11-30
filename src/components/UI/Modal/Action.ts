export type Action = {
  name: string,
  onClick: () => void,
  type?: 'submit' | 'button'
}
