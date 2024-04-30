import Grid from '@mui/material/Grid'
import KaryawanCuti from 'src/views/card/KaryawanCuti'
import PermintaanCuti from 'src/views/card/PermintaanCuti'
import Ditolak from 'src/views/card/Ditolak'
import Diterima from 'src/views/card/Diterima'
import UserLayout from 'src/layouts/UserLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const position = 'hr';
var dashboard: JSX.Element[]=[]
if (position == 'hr') {
  dashboard = [
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <KaryawanCuti />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PermintaanCuti />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Diterima />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Ditolak />
      </Grid>
    </Grid>
  ]
} else if (position == 'staff') {
  dashboard = [
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Diterima />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Ditolak />
      </Grid>
      <Grid item xs={12}>
        <KaryawanCuti />
      </Grid>
    </Grid>
  ]
} else if (position == 'karyawan') {
  dashboard = [
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Diterima />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Ditolak />
      </Grid>
    </Grid>
  ]
} else if (position == 'owner') {
  dashboard = [
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <KaryawanCuti />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PermintaanCuti />
      </Grid>
    </Grid>
  ]
}
const index = () => {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/pages/login')
    }
  }, [router])
  return dashboard;
}
index.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>

export default index
