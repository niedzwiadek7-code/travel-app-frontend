import React, { useEffect, useState } from 'react'
import {
  Stack, TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, TableFooter, Button,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import * as Input from '../../../components/UI/Input'
import { setName } from '../../../features/travelRecipe/travelRecipeSlice'
import { RootState } from '../../../app/store'
import { useDependencies } from '../../../context/dependencies'
import { useAuth } from '../../../context/auth'
import { ActivityType } from '../../../model'

const CreateTravel: React.FC = () => {
  const travelRecipe = useAppSelector((state: RootState) => state.travelRecipe)
  const dispatch = useAppDispatch()

  const { getApiService } = useDependencies()
  const { token } = useAuth()
  const apiService = getApiService()
  const [loading, setLoading] = useState<boolean>(true)
  const [activityService] = useState(apiService.getActivity(token))
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setActivityTypes(
        await activityService.getTypes(),
      )
      setLoading(false)
    }
    fetchData()
  }, [activityService])

  if (loading) {
    return (
      <div> Trwa pobieranie danych </div>
    )
  }

  return (
    <Stack
      gap={3}
    >
      <Stack
        direction="row"
        alignItems="center"
      >
        <Input.Component
          variant={Input.Variant.STANDARD}
          type={Input.Type.TEXT}
          label="Nazwij swoją wycieczkę"
          default={travelRecipe.name}
          onChange={(value: string) => {
            dispatch(setName(value))
          }}
        />
      </Stack>

      <Stack>
        <h2
          style={{ marginTop: 0 }}
        >
          Podsumowanie
        </h2>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Kategoria </TableCell>
                <TableCell> Spędzony czas </TableCell>
                <TableCell> Cena </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {activityTypes.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.name}</TableCell>
                  <TableCell> 2h 25min </TableCell>
                  <TableCell> 150zł </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell> Suma </TableCell>
                <TableCell> ok. 9h </TableCell>
                <TableCell> 600zł </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Stack>

      <Stack>
        <h2
          style={{ marginTop: 0 }}
        >
          Przeglądaj poszczególne dni swojej wycieczki
        </h2>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> Dzień wyjazdu </TableCell>
                <TableCell> Ilość aktywności </TableCell>
                <TableCell> Czas do zaplanowania </TableCell>
                <TableCell align="center"> Akcja </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell> Dzień 1. </TableCell>
                <TableCell> 4 </TableCell>
                <TableCell> 8h 30 min </TableCell>
                <TableCell align="center">
                  <Button
                    type="button"
                    variant="contained"
                  >
                    Przeglądaj
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="center">
                  <Button
                    type="button"
                    variant="contained"
                    color="success"
                  >
                    Zaplanuj
                    <br />
                    następny dzień
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Stack>
  )
}

export default CreateTravel
