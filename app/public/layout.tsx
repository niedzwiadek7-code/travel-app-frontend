'use client'

import React, { ReactNode } from 'react'
import { Grid } from '@mui/material'
import Styles from './layout.module.scss'
import Theme from '../_assets/theme/basic.jpg'

type Props = {
  children: ReactNode,
}

export default function PublicLayout(props: Props) {
  return (
    <Grid
      container
      spacing={0}
      className={Styles.container}
    >
      <Grid item xs={12} lg={6} className={Styles.content}>
        <img
          src={Theme.src}
          alt=""
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
}
