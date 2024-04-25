import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'

import { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { AccountTie, BadgeAccount, CloseCircle, Margin } from 'mdi-material-ui'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface PropsEditDataKaryawan {
  open: boolean
  onClose: () => void
  rowData: Data | null
}

const EditDataKaryawan: React.FC<PropsEditDataKaryawan> = ({ open, onClose, rowData }) => {
    const [posisi, setPosisi] = useState(rowData?.posisi || '')
    const [departemen, setDepartemen] = useState(rowData?.departemen || '')
    const [errors, setErrors] = useState<any>({})
  const handleClose = () => {
    onClose()
  }
   const validateForm = () => {
     const errors: any = {}
     if (!posisi) errors.posisi = 'Posisi harus diisi'
     if (!departemen) errors.departemen = 'Departemen harus diisi'
     setErrors(errors)
     return Object.keys(errors).length === 0
   }
 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (validateForm()) { console.log('Data yang akan disubmit:', { posisi, departemen }) // Menampilkan data yang akan disubmit pada console
   window.alert('Data karyawan berhasil diedit')
   onClose()
 }
 }

  const handleChangePosisi = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosisi(event.target.value)
  }

  const handleChangeDepartemen = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartemen(event.target.value)
  }
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      fullWidth={true}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Edit Data Karyawan
        <Button onClick={handleClose} color='inherit'>
          <CloseCircle />
        </Button>
      </DialogTitle>
      <DialogContent>
        <div>
          <p>Nama: {rowData?.nama}</p>
          <p>Email: {rowData?.email}</p>
          <TextField
            fullWidth
            label='Posisi'
            value={posisi} // Ubah placeholder menjadi value agar nilai yang diinput terpantau
            onChange={handleChangePosisi}
            error={!!errors.posisi}
            helperText={errors.posisi}
            placeholder={rowData?.posisi}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <BadgeAccount />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            label='Departemen'
            value={departemen} // Menambahkan value dan onChange untuk input departemen
            onChange={handleChangeDepartemen}
            error={!!errors.departemen}
            helperText={errors.departemen}
            placeholder={rowData?.departemen}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountTie />
                </InputAdornment>
              )
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='success' onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditDataKaryawan
