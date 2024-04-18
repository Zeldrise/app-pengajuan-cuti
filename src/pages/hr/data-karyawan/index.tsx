import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import HrLayout from '../../../layouts/HrLayout'
import DataKaryawan from 'src/views/table/data-karyawan'

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
index.getLayout = (page: React.ReactNode) => <HrLayout>{page}</HrLayout>
export default index
