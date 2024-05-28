// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { FormHelperText } from '@mui/material'
import AppURL from 'src/api/AppURL'
import axios from 'axios'
import Swal from 'sweetalert2'

interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmPassword: string
  showCurrentPassword: boolean
  showConfirmPassword: boolean
  passwordError: string
  newPasswordError: string
  confirmPasswordError: string
}

const TabSecurity = () => {
  const [values, setValues] = useState<State>({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmPassword: '',
    showCurrentPassword: false,
    showConfirmPassword: false,
    passwordError: '',
    newPasswordError: '',
    confirmPasswordError: ''
  })
  const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value, passwordError: '' })
  }
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }
  const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value, newPasswordError: '' })
  }
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }


  const handleConfirmPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value, confirmPasswordError: '' })
  }
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  }
  const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const validationForm = () => {
    let isValid = true

    setValues(prevState => ({
      ...prevState,
      newPasswordError: '',
      confirmPasswordError: '',
      passwordError: ''
    }))

    if (!values.currentPassword.trim()) {
      setValues(prevState => ({ ...prevState, passwordError: 'Current password is required' }))
      isValid = false
    } else {
      setValues(prevState => ({ ...prevState, passwordError: '' })) // Menyembunyikan pesan kesalahan jika bidang diisi
    }

    if (!values.newPassword.trim()) {
      setValues(prevState => ({ ...prevState, newPasswordError: 'New password is required' }))
      isValid = false
    } else if (values.newPassword.length < 8) {
      setValues(prevState => ({ ...prevState, newPasswordError: 'Password must be at least 8 characters' }))
      isValid = false
    } else {
      setValues(prevState => ({ ...prevState, newPasswordError: '' })) // Menyembunyikan pesan kesalahan jika bidang diisi
    }

    if (!values.confirmPassword.trim()) {
      setValues(prevState => ({ ...prevState, confirmPasswordError: 'Confirm password is required' }))
      isValid = false
    } else if (values.confirmPassword !== values.newPassword) {
      setValues(prevState => ({ ...prevState, confirmPasswordError: 'Password do not match' }))
      isValid = false
    } else {
      setValues(prevState => ({ ...prevState, confirmPasswordError: '' })) // Menyembunyikan pesan kesalahan jika bidang diisi
    }

    return isValid
  }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (validationForm()) {
        Swal.fire({
          title: 'Apa anda yakin?',
          text: 'Password kamu akan dirubah',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#6AD01F',
          cancelButtonColor: '#FF6166',
          confirmButtonText: 'Change',
          cancelButtonText: 'Cancel',
          customClass: {
            container: 'full-screen-alert'
          }
        }).then(async result => {
          if (result.isConfirmed) {
            try {
               const token = localStorage.getItem('token') 
               const response = await axios.put(
                 AppURL.UserChangePass,
                 {
                   currentPassword: values.currentPassword,
                   newPassword: values.newPassword,
                   confirmPassword: values.confirmPassword
                 },
                 {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                 }
               )

              if (response.status !== 200) {
                throw new Error('Failed to edit profile')
              } 
                Swal.fire({
                  title: 'Success',
                  text: 'Password changed successfully',
                  icon: 'success',
                  customClass: {
                    container: 'full-screen-alert'
                  }
                })
              } catch (error: any) {
              if (
                error.response &&
                error.response.data &&
                error.response.data.error === 'Current password is incorrect'
              ) {
                setValues(prevState => ({ ...prevState, passwordError: 'Current password is incorrect' }))
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'An error occurred while changing the password',
                  icon: 'error',
                  customClass: {
                    container: 'full-screen-alert'
                  }
                })
              }
            }
          }
        })
      }
    }
    
  return (
    <form onSubmit={handleSubmit}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    error={!!values.passwordError}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {values.passwordError && <FormHelperText error>{values.passwordError}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    error={!!values.newPasswordError}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {values.newPasswordError && <FormHelperText error>{values.newPasswordError}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmPassword}
                    error={!!values.confirmPasswordError}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmPassword ? 'text' : 'password'}
                    onChange={handleConfirmPasswordChange('confirmPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {values.showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {values.confirmPasswordError && <FormHelperText error>{values.confirmPasswordError}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ margin: 0 }} />

      <CardContent>
        <Box>
          <Button variant='contained' sx={{ marginRight: 3.5 }} type='submit'>
            Save Changes
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmPassword: '' })}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}
export default TabSecurity
