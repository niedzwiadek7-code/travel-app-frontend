import { SvgIconProps } from '@mui/material'

export type Option = {
  // eslint-disable-next-line no-unused-vars
  Icon: (props: SvgIconProps) => JSX.Element,
  action: () => void,
}
