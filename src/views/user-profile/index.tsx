import { useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Link from 'next/link'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const UserProfile = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
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
            <Typography variant='body1'>
              <span style={{ display: 'inline-block', width: 120 }}>Nama</span>: .........
            </Typography>
            <Typography variant='body1'>
              <span style={{ display: 'inline-block', width: 120 }}>Email</span>: ----------
            </Typography>
            <Typography variant='body1'>
              <span style={{ display: 'inline-block', width: 120 }}>No telephone</span>: 123456789
            </Typography>
            <Typography variant='body1'>
              <span style={{ display: 'inline-block', width: 120 }}>Posisi</span>: ---------
            </Typography>
            <Typography variant='body1'>
              <span style={{ display: 'inline-block', width: 120 }}>Departemen</span>: ----------
            </Typography>
            <Typography variant='body1'>
              <span style={{ display: 'inline-block', width: 120 }}>Jatah cuti</span>: -------------
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
