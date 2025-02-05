import React, { ReactNode } from 'react'
import { Grid } from '@mui/material'

type Props = {
  children: ReactNode
}

const AuthLayout: React.FC<Props> = (props) => (
  <Grid
    container
    spacing={0}
  >
    {props.children}
  </Grid>
)

export default AuthLayout
