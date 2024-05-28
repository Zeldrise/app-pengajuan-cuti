import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'

import { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Account, AccountTie,  CalendarAccount, CloseCircle, Email,  Phone } from 'mdi-material-ui'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Swal from 'sweetalert2'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import AppURL from 'src/api/AppURL'

interface Data {
  id: number
  name: string
  email: string
  telephone: string
  position: string
  department: string
  role: string
  gender: string
  join_date: string
  total_days: number
}


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
  onEditEmployeeSuccess: () => void
}

const EditDataKaryawan: React.FC<PropsEditDataKaryawan> = ({ open, onClose, rowData, onEditEmployeeSuccess }) => {
  const [name, setName] = useState(rowData?.name || '')
  const [email, setEmail] = useState(rowData?.email || '')
  const [telephone, setTelephone] = useState(rowData?.telephone || '')
  const [role, setRole] = useState(rowData?.role || '')
  const [position, setPosition] = useState(rowData?.position || '')
  const [department, setDepartment] = useState(rowData?.department || '')
  const [gender, setGender] = useState(rowData?.gender || '')
  const [join_date, setJoin_date] = useState(rowData?.join_date || '')
  const [errors, setErrors] = useState<any>({})
  useEffect(() => {
    if (rowData) {
      setName(rowData.name || '')
      setEmail(rowData.email || '')
      setTelephone(rowData.telephone || '')
      setRole(rowData.role || '')
      setPosition(rowData.position || '')
      setDepartment(rowData.department || '')
      setGender(rowData.gender || '')
      setJoin_date(rowData.join_date || '')
    }
  }, [rowData])
  const handleClose = () => {
    onClose()
  }
  const validateForm = () => {
    const errors: any = {}
    if (!name) errors.name = 'Nama harus diisi'
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
  const handleEditEmployee = async () => {
    try {
      const response = await fetch(`${AppURL.Users}/${rowData?.id}`, {
        method: 'PUT',
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
        throw new Error('Failed to edit employee')
      }
      const data = await response.json()
      Swal.fire({
        title: 'Employee data edited successfully!',
        icon: 'success',
        confirmButtonColor: '#6AD01F',
        customClass: {
          container: 'full-screen-alert'
        }
      })
      console.log('Data edited:', data)
      setName('')
      setEmail('')
      setTelephone('')
      setRole('')
      setPosition('')
      setDepartment('')
      setGender('')
      setJoin_date('')
      onClose()
      onEditEmployeeSuccess()
    } catch (error) {
      console.error('Error editing employee:', error)
      Swal.fire({
        title: 'Error!',
        text: 'Failed to edit employee',
        icon: 'error',
        confirmButtonColor: '#6AD01F',
        customClass: {
          container: 'full-screen-alert'
        }
      })
    }
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
          handleEditEmployee()
        }
      })
    }
  }
  const handleChangeNama = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setJoin_date(event.target.value)
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
            error={!!errors.name}
            helperText={errors.name}
            value={name}
            onChange={handleChangeNama}
            placeholder={rowData?.name}
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
            sx={{ marginTop: 5 }}
            label='No Telephone'
            type='number'
            error={!!errors.telephone}
            helperText={errors.telephone}
            value={telephone}
            onChange={handleChangetelephone}
            placeholder={rowData?.telephone}
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
            placeholder={rowData?.position}
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
            placeholder={rowData?.department}
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

export default EditDataKaryawan
