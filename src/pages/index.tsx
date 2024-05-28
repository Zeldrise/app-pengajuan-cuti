// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Link from 'next/link'

const Dashboard = () => {
  return (
    <Grid container spacing={3} className='content-center'>
      <Grid item xs={12}>
        <h1>Selamat datang!</h1>
        <p>Ajukan cuti dengan mudah dan praktis untuk perencanaan liburan atau keperluan pribadi Anda.</p>
        <Link href='/login' passHref>
          <Button variant='contained' color='primary'>
            Masuk
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Dashboard
