// ** React Imports
import { useState, ElementType, ChangeEvent} from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'
import Link from 'next/link'


const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))



const UserProfile = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }
const router = useRouter()



  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='body1' sx={{ color: 'common.black' }}>
              Nama : .........
            </Typography>
            <Typography variant='body1' sx={{ color: 'common.black' }}>
              Email : ----------
            </Typography>
            <Typography variant='body1' sx={{ color: 'common.black' }}>
              No telephone : 123456789
            </Typography>
            <Typography variant='body1' sx={{ color: 'common.black' }}>
              Posisi : ---------
            </Typography>
            <Typography variant='body1' sx={{ color: 'common.black' }}>
              Departemen : ----------
            </Typography>
            <Typography variant='body1' sx={{ color: 'common.black' }}>
              Jatah cuti: -------------
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Link href='/account-settings'>
              <Button variant='contained' sx={{ marginRight: 3.5 }}>
                Edit Profile
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default UserProfile
