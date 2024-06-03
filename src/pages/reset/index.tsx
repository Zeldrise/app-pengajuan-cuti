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
import { useRouter } from 'next/router'
import AppURL from '../../api/AppURL'
import Swal from 'sweetalert2'


interface State {
  token: string
  newPassword: string
  confirmPassword: string
  showPassword: boolean
  showConfirmPassword: boolean
  passwordError: string
  confirmPasswordError: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))


const ResetPassPage = () => {
  // ** State
    const router = useRouter()
    const { token } = router.query
    const [values, setValues] = useState<State>({
      token: token as string,
      newPassword: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      passwordError: '',
      confirmPasswordError: ''
    })

     useEffect(() => {
       if (!token) {
         router.push('/login') 
       }
     }, [token, router])



  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
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
    setValues(prevState => ({ ...prevState, passwordError: '', confirmPasswordError: '' }))

    if (!values.newPassword.trim()) {
      setValues(prevState => ({ ...prevState, passwordError: 'Password is required' }))
      isValid = false
    } else if (values.newPassword.length < 8) {
      setValues(prevState => ({ ...prevState, passwordError: 'Password must be at least 8 characters' }))
      isValid = false
    }

    if (!values.confirmPassword.trim()) {
      setValues(prevState => ({ ...prevState, confirmPasswordError: 'Confirm password is required' }))
      isValid = false
    } else if (values.confirmPassword !== values.newPassword) {
      setValues(prevState => ({ ...prevState, confirmPasswordError: 'Passwords do not match' }))
      isValid = false
    }

    return isValid
  }

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault()
       if (validationForm()) {
         try {
           const response = await resetPassword(values.token, values.newPassword, values.confirmPassword)
         
           console.log(response)
         } catch (error) {
         
           console.error(error)
         }
       }
     }

     const resetPassword = async (token: string, newPassword: string, confirmPassword: string) => {
       try {
         const response = await fetch(`${AppURL.BaseURL}/auth/reset-password`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${localStorage.getItem('token')}`
           },
           body: JSON.stringify({
             token: token,
             newPassword: newPassword,
             confirmPassword: confirmPassword
           })
         })
         const data = await response.json()
         if (response.ok) {
          Swal.fire({
            title: 'Success!',
            text: 'password changed successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          
           return data
         } else {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to changed password',
              icon: 'error',
              confirmButtonText: 'OK'
            })
           throw new Error(data.message)
         }
       } catch (error) {
         throw error
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
              Change Password
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='body2'>create a strong password 💪</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
              <InputLabel htmlFor='auth-reset-password'>Password</InputLabel>
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
              {values.passwordError && (
                <Typography variant='body2' color='error'>
                  {values.passwordError}
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
              Change Password
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
