import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import HrLayout from '../../../layouts/HrLayout'
import CutiKaryawan from 'src/views/table/cuti-karyawan'

const index = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Laporan Cuti' titleTypographyProps={{ variant: 'h6' }} />
          <CutiKaryawan />
        </Card>
      </Grid>
    </Grid>
  )
}
index.getLayout = (page: React.ReactNode) => <HrLayout>{page}</HrLayout>
export default index
