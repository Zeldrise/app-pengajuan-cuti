import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Link from 'next/link'
import AppURL from '../../api/AppURL'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const UserProfile = () => {
  const [imgSrc] = useState<string>('/images/avatars/1.png')
  const [userData, setUserData] = useState<any>(null)

  const fetchUserData = async () => {
    try {
      const response = await fetch(AppURL.Profile, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) {
        throw new Error('Gagal mengambil data user')
      }
      const userData = await response.json()
      setUserData(userData)
      console.log('user data :', userData)
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])


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
              <span style={{ display: 'inline-block', width: 120 }}>Nama</span>: {userData ? userData.name : '...'}
            </Typography>
            <Typography variant='body1'>
              <span style={{ display: 'inline-block', width: 120 }}>Email</span>: {userData ? userData.email : '...'}
            </Typography>
            <Typography variant='body1'>
              <span style={{ display: 'inline-block', width: 120 }}>No telephone</span>:{' '}
              {userData ? userData.telephone : '...'}
            </Typography>
            <Typography variant='body1'>
              <span style={{ display: 'inline-block', width: 120 }}>Posisi</span>:{' '}
              {userData ? userData.position : '...'}
            </Typography>
            <Typography variant='body1'>
              <span style={{ display: 'inline-block', width: 120 }}>Departemen</span>:{' '}
              {userData ? userData.department : '...'}
            </Typography>
            <Typography variant='body1'>
              <span style={{ display: 'inline-block', width: 120 }}>Jatah cuti</span>:{' '}
              {userData ? userData.total_days : '...'}
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
