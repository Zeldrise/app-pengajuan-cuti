import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import AppURL from '../../api/AppURL'
import { useTranslation } from 'next-i18next'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from '../../@core/layouts/BlankLayout'

interface State {
  email: string
  password: string
  showPassword: boolean
  emailError: string
  passwordError: string
  serverError: string | null
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
    emailError: '',
    passwordError: '',
    serverError: null
  })

  // ** Hook
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const validateForm = () => {
    let isValid = true
    if (!values.email.trim()) {
      setValues(prevState => ({ ...prevState, emailError: t('loginPage.emailError') }))
      isValid = false
    } else {
      setValues(prevState => ({ ...prevState, emailError: '' }))
    }
    if (!values.password.trim()) {
      setValues(prevState => ({ ...prevState, passwordError: t('loginPage.passwordError') }))
      isValid = false
    } else {
      setValues(prevState => ({ ...prevState, passwordError: '' }))
    }

    return isValid
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateForm()) {
      try {
        const response = await axios.post(AppURL.UserLogin, {
          email: values.email,
          password: values.password
        })
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token)
          router.push('/home')
        } else {
          setValues(prevState => ({ ...prevState, serverError: t('loginPage.serverError') }))
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const errorMessage = error.response.data.error
            if (errorMessage === 'User not found') {
              setValues(prevState => ({ ...prevState, emailError: t('loginPage.userNotFound'), passwordError: '' }))
            } else if (errorMessage === 'Incorrect password') {
              setValues(prevState => ({
                ...prevState,
                emailError: '',
                passwordError: t('loginPage.incorrectPassword')
              }))
            } else {
              setValues(prevState => ({ ...prevState, serverError: t('loginPage.unexpectedError') }))
            }
          } else {
            setValues(prevState => ({ ...prevState, serverError: t('loginPage.unexpectedError') }))
          }
        }
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
              {t('loginPage.title')}
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <div>
              <TextField
                autoFocus
                fullWidth
                id='email'
                label={t('loginPage.emailLabel')}
                value={values.email}
                onChange={handleChange('email')}
                error={!!values.emailError}
                helperText={values.emailError}
                sx={{ marginBottom: 4 }}
              />
              <TextField
                fullWidth
                id='auth-login-password'
                label={t('loginPage.passwordLabel')}
                value={values.password}
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                error={!!values.passwordError}
                helperText={values.passwordError}
                sx={{ marginBottom: 4 }}
                InputProps={{
                  endAdornment: (
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
                  )
                }}
              />{' '}
            </div>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <Link passHref href='/forgot'>
                <LinkStyled>{t('loginPage.forgotPasswordLabel')}</LinkStyled>
              </Link>
            </Box>
            <Button fullWidth size='large' variant='contained' type='submit' sx={{ marginBottom: 7 }}>
              {t('loginPage.loginButton')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
