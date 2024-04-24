import React, { forwardRef, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'

import { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Account, AccountTie, BadgeAccount, CalendarAccount, CloseCircle, Email, Phone } from 'mdi-material-ui'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import DatePicker from 'react-datepicker'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface PropsAddDataKaryawan {
  open: boolean
  onClose: () => void
}

const TglJoin = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Bergabung' autoComplete='off' />
})

const AddDataKaryawan: React.FC<PropsAddDataKaryawan> = ({ open, onClose }) => {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [noTelepon, setNoTelepon] = useState('')
  const [posisi, setPosisi] = useState('')
  const [departemen, setDepartemen] = useState('')
  const [tanggalBergabung, setTanggalBergabung] = useState('')

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = () => {
    const newEmployeeData = {
      nama,
      email,
      noTelepon,
      posisi,
      departemen,
      tanggalBergabung
    }
    console.log('Data yang akan disubmit:', newEmployeeData) // Menampilkan data yang akan disubmit pada console
    window.alert('Data karyawan berhasil ditambahkan')
    // Lakukan sesuatu dengan data karyawan, seperti mengirimnya ke server
    onClose()
  }

  const handleChangeNama = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNama(event.target.value)
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleChangeNoTelepon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoTelepon(event.target.value)
  }

  const handleChangePosisi = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosisi(event.target.value)
  }

  const handleChangeDepartemen = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartemen(event.target.value)
  }
   const handleChangeTanggalBergabung = (event: React.ChangeEvent<HTMLInputElement>) => {
     setTanggalBergabung(event.target.value)
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
        Tambah Karyawan
        <Button onClick={handleClose} color='inherit'>
          <CloseCircle />
        </Button>
      </DialogTitle>
      <DialogContent>
        <div>
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label='Nama'
            value={nama}
            onChange={handleChangeNama}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Account />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            label='Email'
            value={email}
            onChange={handleChangeEmail}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Email />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            label='No Telephone'
            type='number'
            value={noTelepon}
            onChange={handleChangeNoTelepon}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Phone />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            label='Posisi'
            value={posisi}
            onChange={handleChangePosisi}
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
            value={departemen}
            onChange={handleChangeDepartemen}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountTie />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            type='date'
            label='Tanggal Bergabung'
            value={tanggalBergabung}
            onChange={handleChangeTanggalBergabung}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <CalendarAccount />
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

export default AddDataKaryawan
