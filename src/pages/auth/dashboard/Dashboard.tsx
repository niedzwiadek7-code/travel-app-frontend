import React from 'react'
import { Grid } from '@mui/material'
import * as CardBackground from './Card'
import CreateTravelImage from '../../../assets/images/create-travel-image.png'
import YourTravelImage from '../../../assets/images/your-travles.-image.png'

const Dashboard: React.FC = () => (
  <Grid container spacing={3} padding={3}>
    <Grid item xs={6}>
      <CardBackground.Component
        image={CreateTravelImage}
        title="Kreator wycieczki"
        description="Użyj narzędzi oferowanych przez naszą witrynę aby stworzyć wycieczkę swoich marzeń"
      />
    </Grid>

    <Grid item xs={6}>
      <CardBackground.Component
        image={YourTravelImage}
        title="Twoje wycieczki"
        description="Przeglądaj swoje dotychczasowe wycieczki lub edytuj te, które zaplanowałeś"
      />
    </Grid>
  </Grid>
)

export default Dashboard
