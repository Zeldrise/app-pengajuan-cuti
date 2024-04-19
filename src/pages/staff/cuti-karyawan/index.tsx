import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CutiKaryawan from 'src/views/table/cuti-karyawan'
import StaffLayout from 'src/layouts/StaffLayout'

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
index.getLayout = (page: React.ReactNode) => <StaffLayout>{page}</StaffLayout>
export default index
