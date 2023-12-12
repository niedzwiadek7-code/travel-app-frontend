import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button, Stack, Grid, useTheme,
} from '@mui/material'
import { AccommodationElementInstance } from '../../../../model'
import * as Modal from '../../../../components/UI/Modal'
import { useDependencies } from '../../../../context/dependencies'
import { useAuth } from '../../../../context/auth'
import { useAppDispatch } from '../../../../app/hooks'
import {
  passAccommodationElementInstance,
} from '../../../../features/travelInstance/travelInstanceSlice'

type Props = {
  accommodationElement: AccommodationElementInstance
}

type Inputs = {
  images: File[]
}

const PassAccommodationTravelModal: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const { getApiService, getToastUtils } = useDependencies()
  const toastUtils = getToastUtils()
  const apiService = getApiService()
  const { token } = useAuth()
  const travelService = apiService.getTravel(token)

  const theme = useTheme()
  const {
    register, handleSubmit, setValue,
  } = useForm<Inputs>()
  const [urls, setUrls] = useState<string[]>([])

  const onSubmit = async (data: Inputs) => {
    try {
      await travelService.passAccommodationElement(props.accommodationElement.id, data)
      dispatch(passAccommodationElementInstance(props.accommodationElement.id))
    } catch (err) {
      toastUtils.Toast.showToast(
        toastUtils.types.ERROR,
        'Wystpił nieoczekiwany błąd',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal.Component
        buttonComponent={(
          <Button
            type="button"
            variant="contained"
            color="success"
          >
            Zapisz odbycie
          </Button>
        )}
        title="Zapisz odbycie"
        content={(
          <Stack
            gap={2}
          >
            <Grid
              container
              spacing={2}
              style={{
                padding: '1em',
                backgroundColor: theme.palette.grey[200],
              }}
            >
              {
                urls.map((url) => (
                  <Grid
                    item
                    key={url}
                    xs={4}
                  >
                    <img
                      src={url}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '5px',
                      }}
                      alt=""
                    />
                  </Grid>
                ))
              }
            </Grid>
            <Button
              variant="contained"
              component="label"
            >
              Dodaj zdjęcia z aktywności
              <input
                type="file"
                multiple
                hidden
                {...register('images')}
                onChange={(e) => {
                  if (e.target.files) {
                    const arrayFiles = Array.from(e.target.files)
                    setValue('images', arrayFiles)
                    const urlsTemp = arrayFiles.map(
                      (file) => URL.createObjectURL(file),
                    )
                    setUrls(urlsTemp)
                  }
                }}
              />
            </Button>
          </Stack>
        )}
        actions={[
          {
            name: 'Zapisz odbycie',
            type: 'submit',
            onClick: handleSubmit(onSubmit),
          },
        ]}
      />
    </form>
  )
}

export default PassAccommodationTravelModal
