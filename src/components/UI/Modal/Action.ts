export type Action = {
  name: string,
  onClick: () => Promise<void> | void,
  type?: 'submit' | 'button'
  hideAfterClick?: boolean
}
