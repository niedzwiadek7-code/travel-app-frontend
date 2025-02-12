import React, { ReactNode, useState } from 'react'
import {
  Collapse as MuiCollapse, Stack, Typography,
} from '@mui/material'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Option } from '.'

type Props = {
  title: string
  children: ReactNode
  iconsOptions?: Option[] | [],
  nodeOptions?: ReactNode[] | [],
  defaultOpen?: boolean
}

const Collapse: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(props.defaultOpen || false)
  return (
    <Stack
      gap={1}
    >
      <Typography
        variant="h5"
        component="h5"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
          >
            {props.title}
            {
              open
                ? (
                  <KeyboardArrowDown
                    onClick={() => setOpen(!open)}
                    sx={{ cursor: 'pointer' }}
                  />
                )
                : (
                  <KeyboardArrowDown
                    onClick={() => setOpen(!open)}
                    sx={{ cursor: 'pointer', transform: 'rotate(180deg)' }}
                  />
                )
            }
          </Stack>

          <Stack>
            {
              props.iconsOptions?.map((OptionElem) => (
                <OptionElem.Icon
                  key={OptionElem.Icon.name}
                  onClick={OptionElem.action}
                  sx={{ cursor: 'pointer' }}
                />
              ))
            }

            {
              props.nodeOptions?.map((NodeElem) => (
                NodeElem
              ))
            }
          </Stack>
        </Stack>
      </Typography>

      <MuiCollapse in={open}>
        {props.children}
      </MuiCollapse>
    </Stack>
  )
}

export default Collapse
