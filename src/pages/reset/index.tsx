// ** React Imports
import React, { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from '../../@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from '../../views/pages/auth/FooterIllustration'
import AppURL from '../../api/AppURL'
import Swal from 'sweetalert2'
import router from 'next/router'

interface State {
  token: string
  newPassword: string
  confirmPassword: string
  showPassword: boolean
  showConfirmPassword: boolean
  newPasswordError: string
  confirmPasswordError: string
  tokenError: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ResetPassPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    token: '',
    newPassword: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    newPasswordError: '',
    confirmPasswordError: '',
    tokenError: ''
  })

  useEffect(() => {
    const resetFormValues = () => {
      setValues({
        token: '',
        newPassword: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        newPasswordError: '',
        confirmPasswordError: '',
        tokenError: ''
      })
    }

    resetFormValues()

    return () => {
      resetFormValues()
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = () => {
      setValues({
        token: '',
        newPassword: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        newPasswordError: '',
        confirmPasswordError: '',
        tokenError: ''
      })
    }

    // Listen to route changes
    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value, newPasswordError: '', confirmPasswordError: '', tokenError: '' })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const validationForm = () => {
    let isValid = true
    setValues(prevState => ({ ...prevState, newPasswordError: '', confirmPasswordError: '', tokenError: '' }))

    if (!values.token.trim()) {
      setValues(prevState => ({ ...prevState, tokenError: 'Token diperlukan' }))
      isValid = false
    }

    if (!values.newPassword.trim()) {
      setValues(prevState => ({ ...prevState, newPasswordError: 'Password diperlukan' }))
      isValid = false
    } else if (values.newPassword.length < 8) {
      setValues(prevState => ({ ...prevState, newPasswordError: 'Password minimal harus 8 karakter' }))
      isValid = false
    }

    if (!values.confirmPassword.trim()) {
      setValues(prevState => ({ ...prevState, confirmPasswordError: 'Confirm password diperlukan' }))
      isValid = false
    } else if (values.confirmPassword !== values.newPassword) {
      setValues(prevState => ({ ...prevState, confirmPasswordError: 'Passwords tidak cocok' }))
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validationForm()) {
      try {
        const response = await fetch(AppURL.ResetPassword, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            token: values.token,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword
          })
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        console.log(data)
        Swal.fire({
          title: 'Success!',
          text: 'Password berhasil diubah!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          setValues({
            token: '',
            newPassword: '',
            confirmPassword: '',
            showPassword: false,
            showConfirmPassword: false,
            newPasswordError: '',
            confirmPasswordError: '',
            tokenError: ''
          })
        })
        router.push('/')
      } catch (error) {
        console.error('Error:', error)
        Swal.fire({
          title: 'Error!',
          text: 'Password gagal diubah',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              Reset Password
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='body2'>buat password yang kuat 💪</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='auth-reset-token'>Token</InputLabel>
              <OutlinedInput
                label='Token'
                type='number'
                value={values.token}
                id='auth-reset-token'
                onChange={handleChange('token')}
              />
              {values.tokenError && (
                <Typography variant='body2' color='error'>
                  {values.tokenError}
                </Typography>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='auth-reset-password'>New Password</InputLabel>
              <OutlinedInput
                label='New Password'
                value={values.newPassword}
                id='reset-new-password'
                onChange={handleChange('newPassword')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {values.newPasswordError && (
                <Typography variant='body2' color='error'>
                  {values.newPasswordError}
                </Typography>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='auth-reset-confirm'>Confirm Password</InputLabel>
              <OutlinedInput
                label='ConfirmPassword'
                value={values.confirmPassword}
                id='auth-reset-confirm'
                onChange={handleChange('confirmPassword')}
                type={values.showConfirmPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      aria-label='toggle confirmPassword visibility'
                    >
                      {values.showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {values.confirmPasswordError && (
                <Typography variant='body2' color='error'>
                  {values.confirmPasswordError}
                </Typography>
              )}
            </FormControl>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} type='submit'>
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

ResetPassPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ResetPassPage
