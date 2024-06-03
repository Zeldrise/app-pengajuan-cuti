// ** React Imports
import { ChangeEvent, ReactNode, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { ArrowLeft } from 'mdi-material-ui'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'

// ** Layout Import
import BlankLayout from '../../@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from '../../views/pages/auth/FooterIllustration'

// ** App URL Import
import AppURL from '../../api/AppURL'

// ** SweetAlert2 Import
import Swal from 'sweetalert2'

interface State {
  email: string
  emailError: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ForgotPage = () => {
  const [values, setValues] = useState<State>({
    email: '',
    emailError: ''
  })

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value, emailError: '' })
  }

  const validationForm = () => {
    let isValid = true
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!values.email.trim()) {
      setValues(prevState => ({ ...prevState, emailError: 'Email is required' }))
      isValid = false
    } else if (!emailPattern.test(values.email)) {
      setValues(prevState => ({ ...prevState, emailError: 'Invalid email format' }))
      isValid = false
    } else {
      setValues(prevState => ({ ...prevState, emailError: '' }))
    }
    
    return isValid
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validationForm()) {
      try {
        const response = await fetch(AppURL.Forgot, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ email: values.email })
        })
        if (response.ok) {
          Swal.fire({
            title: 'Success!',
            text: 'Password reset email sent!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        } else {
          const errorData = await response.json()
          Swal.fire({
            title: 'Error!',
            text: errorData.message || 'Failed to send reset email',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred. Please try again.',
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
          <Box>
            <Link href='/login' passHref>
              <IconButton aria-label='back to home'>
                <ArrowLeft />
              </IconButton>
            </Link>
          </Box>
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
              Forgot Password
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='body2'>Please enter your email</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <FormControl fullWidth error={!!values.emailError} sx={{ marginBottom: 4 }}>
              <TextField
                autoFocus
                fullWidth
                id='email'
                label='Email'
                value={values.email}
                onChange={handleChange('email')}
              />
              {values.emailError && <FormHelperText>{values.emailError}</FormHelperText>}
            </FormControl>
            <Button fullWidth size='large' variant='contained' type='submit' sx={{ marginBottom: 7 }}>
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

ForgotPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPage
