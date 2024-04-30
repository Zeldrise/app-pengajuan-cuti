import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import DataKaryawan from 'src/views/table/data-karyawan'
import UserLayout from 'src/layouts/UserLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const index = () => {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/pages/login')
    }
  }, [router])
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Data Karyawan' titleTypographyProps={{ variant: 'h6' }} />
          <DataKaryawan />
        </Card>
      </Grid>
    </Grid>
  )
}
index.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>
export default index
