import { SvgIconComponent } from '@mui/icons-material'

export type Option = {
  name: string,
  action: () => void,
  Icon?: SvgIconComponent
}
