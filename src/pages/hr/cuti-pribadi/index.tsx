import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import HrLayout from '../../../layouts/HrLayout'

import CutiPribadi from 'src/views/table/cuti-pribadi'

const index = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Laporan Cuti Pribadi' titleTypographyProps={{ variant: 'h6' }} />
          <CutiPribadi />
        </Card>
      </Grid>
    </Grid>
  )
}
index.getLayout = (page: React.ReactNode) => <HrLayout>{page}</HrLayout>
export default index
