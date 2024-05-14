// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import Phone from 'mdi-material-ui/Phone'
import Swal from 'sweetalert2'
import AppURL from 'src/api/AppURL'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const errors: any = {}
    if (!name) errors.name = 'Name harus diisi'
    if (!email.trim()) {
      errors.email = 'Email harus diisi'
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errors.email = 'Format email tidak valid'
    }
    if (!telephone) errors.telephone = 'Nomor telepon harus diisi'
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      Swal.fire({
        title: 'Apa Anda yakin?',
        text: 'Profile Akan Diedit',
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
          editProfile()
        }
      })
    }
  }
   const editProfile = async () => {
     try {
       const response = await fetch(`${AppURL.Users}/update1/${id}`, {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${localStorage.getItem('token')}`
         },
         body: JSON.stringify({
           name,
           email,
           telephone
         })
       })
       if (!response.ok) {
         throw new Error('Failed to edit profile')
       }
       const data = await response.json()
       Swal.fire({
         title: 'Profile berhasil diedit!',
         icon: 'success',
         confirmButtonColor: '#6AD01F',
         customClass: {
           container: 'full-screen-alert'
         }
       })
       console.log('Data yang akan disubmit:', data)
     } catch (error) {
       console.error('Error editing profile:', error)
       Swal.fire({
         title: 'Error!',
         text: 'Failed to edit profile',
         icon: 'error',
         confirmButtonColor: '#6AD01F',
         customClass: {
           container: 'full-screen-alert'
         }
       })
     }
   }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Full Name'
              error={!!errors.name}
              helperText={errors.name}
              value={name}
              onChange={handleChangeName}
              placeholder='Monkey D Luffy'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountOutline />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              error={!!errors.email}
              helperText={errors.email}
              value={email}
              onChange={handleChangeEmail}
              placeholder='bakasenchou@gmail.com'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <EmailOutline />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type='number'
              label='Phone No.'
              error={!!errors.telephone}
              helperText={errors.telephone}
              value={telephone}
              onChange={handleChangetelephone}
              placeholder='+62-123-456-8790'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Phone />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
