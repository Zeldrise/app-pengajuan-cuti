import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import DataKaryawan from 'src/views/table/data-karyawan'
import StaffLayout from 'src/layouts/StaffLayout'

const index = () => {
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
index.getLayout = (page: React.ReactNode) => <StaffLayout>{page}</StaffLayout>
export default index
