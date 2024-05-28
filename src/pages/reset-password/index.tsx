// ** React Imports
import React, { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'


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
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

interface State {
  password: string
  showPassword: boolean
  passwordError: string
  confirmPassword: string
  showConfirmPassword: boolean
  confirmPasswordError: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))


const ResetPassPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
    passwordError: '',
    confirmPassword: '',
    showConfirmPassword: false,
    confirmPasswordError: ''
  })



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

    setValues(prevState => ({ ...prevState, passwordError: '', confirmPasswordError: ''}))

    if (!values.password.trim()) {
      setValues(prevState => ({ ...prevState, passwordError: 'Password is required'}))
      isValid = false
    }else if(values.password.length < 8){
      setValues(prevState => ({ ...prevState, passwordError: 'Password must be at least 8 character'}))
    isValid = false
    }
    if(!values.confirmPassword.trim()) {
      setValues(prevState => ({ ...prevState, confirmPasswordError: 'Confirm password is required'}))
      isValid = false
    }else if(values.confirmPassword !== values.password) {
      setValues(prevState => ({ ...prevState, confirmPasswordError: 'Password do not match'}))
    }

    return isValid
  }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (validationForm()) {
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
                label='Password'
                value={values.password}
                id='auth-reset-password'
                onChange={handleChange('password')}
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
