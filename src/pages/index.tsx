// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <Grid container spacing={3} className='content-center'>
      <Grid item xs={12}>
        <h1>Selamat Datang di Sistem Pengajuan Cuti</h1>
        <p>Silakan masuk untuk mengakses fitur pengajuan cuti.</p>
        <Link href='/pages/login' passHref>
          <Button variant='contained' color='primary'>
            Masuk
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Dashboard
