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
import {
  Account,
  AccountTie,
  CalendarAccount,
  CloseCircle,
  Email,
  Phone
} from 'mdi-material-ui'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Swal from 'sweetalert2'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import AppURL from '../../api/AppURL'

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
  onAddEmployeeSuccess: () => void
}

const AddDataKaryawan: React.FC<PropsAddDataKaryawan> = ({ open, onClose, onAddEmployeeSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [role, setRole] = useState('')
  const [position, setPosition] = useState('')
  const [department, setDepartment] = useState('')
  const [gender, setGender] = useState('')
  const [join_date, setjoin_date] = useState('')
  const [errors, setErrors] = useState<any>({})

  const handleClose = () => {
    onClose()
  }
  const validateForm = () => {
    const errors: any = {}
    if (!name) errors.name = 'name harus diisi'
    if (!email.trim()) {
      errors.email = 'Email harus diisi'
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errors.email = 'Format email tidak valid'
    }
    if (!telephone) errors.telephone = 'Nomor telepon harus diisi'
    if (!role) errors.role = 'Role harus diisi'
    if (!position) errors.position = 'Position harus diisi'
    if (!department) errors.department = 'Department harus diisi'
    if (!gender) errors.gender = 'Gender harus dipilih'
    if (!join_date) errors.join_date = 'Tanggal bergabung harus diisi'
    setErrors(errors)

    return Object.keys(errors).length === 0
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      Swal.fire({
        title: 'Is Employee Data Correct?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#6AD01F',
        cancelButtonColor: '#FF6166',
        confirmButtonText: 'Tambah',
        cancelButtonText: 'Batal',
        customClass: {
          container: 'full-screen-alert'
        }
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(AppURL.Users, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                name,
                email,
                telephone,
                role,
                position,
                department,
                gender,
                join_date
              })
            })
            if (!response.ok) {
              throw new Error('Failed to add employee')
            }
            const data = await response.json()
            Swal.fire({
              title: 'Employee data added successfully!!',
              icon: 'success',
              confirmButtonColor: '#6AD01F',
              customClass: {
                container: 'full-screen-alert'
              }
            })
            console.log('Data submitted:', data)
            setName('')
            setEmail('')
            setTelephone('')
            setRole('')
            setPosition('')
            setDepartment('')
            setGender('')
            setjoin_date('')
            onClose()
            onAddEmployeeSuccess()
          } catch (error) {
            console.error('Error editing employee:', error)
            Swal.fire({
              title: 'Error!',
              text: 'Failed to add employee',
              icon: 'error',
              confirmButtonColor: '#6AD01F',
              customClass: {
                container: 'full-screen-alert'
              }
            })
          }
        }
      })
    }
  }

  const handleChangename = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
    if (errors.name) {
      setErrors({ ...errors, name: '' })
    }
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    if (errors.email) {
      setErrors({ ...errors, email: '' })
    }
  }

  const handleChangetelephone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelephone(event.target.value)
    if (errors.telephone) {
      setErrors({ ...errors, telephone: '' })
    }
  }

const handleChangeRole = (event: SelectChangeEvent<string>) => {
  setRole(event.target.value)
  if (errors.role) {
    setErrors({ ...errors, role: '' })
  }
}


  const handleChangeposition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(event.target.value)
    if (errors.position) {
      setErrors({ ...errors, position: '' })
    }
  }

  const handleChangedepartment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(event.target.value)
    if (errors.department) {
      setErrors({ ...errors, department: '' })
    }
  }
  const handleChangeGender = (event: SelectChangeEvent<string>) => {
    setGender(event.target.value)
    if (errors.gender) {
      setErrors({ ...errors, gender: '' })
    }
  }
  const handleChangejoin_date = (event: React.ChangeEvent<HTMLInputElement>) => {
    setjoin_date(event.target.value)
    if (errors.join_date) {
      setErrors({ ...errors, join_date: '' })
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
            error={!!errors.name}
            helperText={errors.name}
            value={name}
            onChange={handleChangename}
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
            sx={{ marginTop: 5 }}
            label='Email'
            error={!!errors.email}
            helperText={errors.email}
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
            sx={{ marginTop: 5 }}
            label='No Telephone'
            type='number'
            error={!!errors.telephone}
            helperText={errors.telephone}
            value={telephone}
            onChange={handleChangetelephone}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Phone />
                </InputAdornment>
              )
            }}
          />

         
          <FormControl fullWidth sx={{ marginTop: 5 }}>
            <InputLabel id='form-layouts-separator-select-label'>Role</InputLabel>
            <Select
              label='Role'
              defaultValue=''
              id='form-layouts-separator-select'
              labelId='form-layouts-separator-select-label'
              error={!!errors.role}
              value={role}
              onChange={handleChangeRole}
            >
              <MenuItem value='hr'>hr</MenuItem>
              <MenuItem value='staff'>staff</MenuItem>
              <MenuItem value='karyawan'>karyawan</MenuItem>
            </Select>
            {errors.role && <FormHelperText error>{errors.role}</FormHelperText>}
          </FormControl>

          <TextField
            fullWidth
            sx={{ marginTop: 5 }}
            label='Position'
            value={position}
            onChange={handleChangeposition}
            error={!!errors.position}
            helperText={errors.position}
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
            sx={{ marginTop: 5 }}
            label='Department'
            value={department}
            onChange={handleChangedepartment}
            error={!!errors.department}
            helperText={errors.department}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountTie />
                </InputAdornment>
              )
            }}
          />
          <FormControl fullWidth sx={{ marginTop: 5 }}>
            <InputLabel id='form-layouts-separator-select-label'>Gender</InputLabel>
            <Select
              label='Gender'
              defaultValue=''
              id='form-layouts-separator-select'
              labelId='form-layouts-separator-select-label'
              value={gender}
              onChange={handleChangeGender}
              error={!!errors.gender}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
            {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
          </FormControl>

          <TextField
            fullWidth
            sx={{ marginTop: 5 }}
            type='date'
            label='Tanggal Bergabung'
            error={!!errors.join_date}
            helperText={errors.join_date}
            value={join_date}
            onChange={handleChangejoin_date}
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
