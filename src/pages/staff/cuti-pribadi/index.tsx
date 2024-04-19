import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import CutiPribadi from 'src/views/table/cuti-pribadi'
import StaffLayout from 'src/layouts/StaffLayout'

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
index.getLayout = (page: React.ReactNode) => <StaffLayout>{page}</StaffLayout>
export default index
