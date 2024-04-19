import Grid from '@mui/material/Grid'
import KaryawanCuti from 'src/views/card/KaryawanCuti'
import Ditolak from 'src/views/card/Ditolak'
import Diterima from 'src/views/card/Diterima'
import StaffLayout from 'src/layouts/StaffLayout'

const index = () => {
  return (
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
  )
}
index.getLayout = (page: React.ReactNode) => <StaffLayout>{page}</StaffLayout>

export default index
