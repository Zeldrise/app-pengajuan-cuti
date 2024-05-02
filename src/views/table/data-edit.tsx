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
import { Account, AccountTie, BadgeAccount, CalendarAccount, CloseCircle, Email, Margin, Phone } from 'mdi-material-ui'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Swal from 'sweetalert2'

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
     const [nama, setNama] = useState('')
     const [email, setEmail] = useState('')
     const [noTelepon, setNoTelepon] = useState('')
     const [posisi, setPosisi] = useState('')
     const [departemen, setDepartemen] = useState('')
     const [tanggalBergabung, setTanggalBergabung] = useState('')
     const [errors, setErrors] = useState<any>({})
  const handleClose = () => {
    onClose()
  }
   const validateForm = () => {
     const errors: any = {}
         if (!nama) errors.nama = 'Nama harus diisi'
        if (!email.trim()) {
          errors.email = 'Email harus diisi'
        } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
          errors.email = 'Format email tidak valid'
        }
         if (!noTelepon) errors.noTelepon = 'Nomor telepon darurat harus diisi'
         if (!posisi) errors.posisi = 'Posisi harus diisi'
         if (!departemen) errors.departemen = 'Departemen harus diisi'
         if (!tanggalBergabung) errors.tanggalBergabung = 'Tanggal bergabung harus diisi'
     setErrors(errors)
     return Object.keys(errors).length === 0
   }
 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (validateForm()) { 
      Swal.fire({
        title: 'Apa Anda yakin?',
        text: 'Data Karyawan Akan Diedit',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#6AD01F',
        cancelButtonColor: '#FF6166',
        confirmButtonText: 'Edit',
        cancelButtonText: 'Batal',
        customClass: {
          container: 'full-screen-alert'
        }
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Data karyawan berhasil diedit!',
            icon: 'success',
            confirmButtonColor: '#6AD01F',
            customClass: {
              container: 'full-screen-alert'
            }
          })
          const editEmployeeData = {
            nama,
            email,
            noTelepon,
            posisi,
            departemen,
            tanggalBergabung
          }
          console.log('Data yang akan disubmit:', editEmployeeData)
          onClose()
        }
      })   
   
 }
 }

  const handleChangeNama = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNama(event.target.value)
    if (errors.nama) {
      setErrors({ ...errors, nama: '' })
    }
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    if (errors.email) {
      setErrors({ ...errors, email: '' })
    }
  }

  const handleChangeNoTelepon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoTelepon(event.target.value)
    if (errors.noTelepon) {
      setErrors({ ...errors, noTelepon: '' })
    }
  }

  const handleChangePosisi = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosisi(event.target.value)
    if (errors.posisi) {
      setErrors({ ...errors, posisi: '' })
    }
  }

  const handleChangeDepartemen = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartemen(event.target.value)
    if (errors.departemen) {
      setErrors({ ...errors, departemen: '' })
    }
  }
  const handleChangeTanggalBergabung = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTanggalBergabung(event.target.value)
    if (errors.tanggalBergabung) {
      setErrors({ ...errors, tanggalBergabung: '' })
    }
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
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label='Nama'
            error={!!errors.nama}
            helperText={errors.nama}
            value={nama}
            onChange={handleChangeNama}
            placeholder={rowData?.nama}
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
            error={!!errors.email}
            helperText={errors.email}
            value={email}
            onChange={handleChangeEmail}
            placeholder={rowData?.email}
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
            error={!!errors.noTelepon}
            helperText={errors.noTelepon}
            value={noTelepon}
            onChange={handleChangeNoTelepon}
            placeholder={rowData?.no_telephone}
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
          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            type='date'
            label='Tanggal Bergabung'
            error={!!errors.tanggalBergabung}
            helperText={errors.tanggalBergabung}
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

export default EditDataKaryawan
