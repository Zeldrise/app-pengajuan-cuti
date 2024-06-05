// ** React Imports
import { useState,  useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import Phone from 'mdi-material-ui/Phone'
import Swal from 'sweetalert2'
import AppURL from '../../api/AppURL'

import { useRouter } from 'next/router'


const TabAccount = () => {
  // ** State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [errors, setErrors] = useState<any>({})
  const router = useRouter()



   useEffect(() => {
     fetchProfileData()
   }, [])

   const fetchProfileData = async () => {
     try {
       const response = await fetch(`${AppURL.Profile}`, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`
         }
       })
       if (!response.ok) {
         throw new Error('Failed to fetch profile data')
       }
       const data = await response.json()
       setName(data.name)
       setEmail(data.email)
       setTelephone(data.telephone)
     } catch (error) {
       console.error('Error fetching profile data:', error)
     }
   }

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
       const response = await fetch(`${AppURL.Users}/profil`, {
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
       router.reload()
     } catch (error) {
       console.error('Error editing profile:', error)
       Swal.fire({
         title: 'Error!',
         text: 'Gagal mengedit profil',
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
          {/* <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
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
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Nama Lengkap'
              error={!!errors.name}
              helperText={errors.name}
              value={name}
              onChange={handleChangeName}
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
              label='No. Telepon'
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
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
              Simpan
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
