import React, { ReactNode } from 'react'
import { Grid } from '@mui/material'
import Styles from './PublicLayout.module.scss'
import Theme from '../../../assets/theme/basic.jpg'
import * as Image from '../../UI/Image'

type Props = {
  children: ReactNode,
}

const PublicLayout: React.FC<Props> = (props) => (
  <Grid
    container
    spacing={0}
    className={Styles.container}
  >
    <Grid item xs={12} lg={6} className={Styles.content}>
      <Image.Component
        alt=""
        src={Theme}
        className={Styles.img}
      />
    </Grid>
    <Grid
      item
      xs={12}
      lg={6}
      sx={{ padding: '1rem' }}
      className={Styles.localContainer}
    >
      {props.children}
    </Grid>
  </Grid>
)

export default PublicLayout
