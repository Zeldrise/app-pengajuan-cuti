import Grid from '@mui/material/Grid'
import HrLayout from '../../layouts/HrLayout'
import KaryawanCuti from 'src/views/card/KaryawanCuti'
import PermintaanCuti from 'src/views/card/PermintaanCuti'

const index = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <KaryawanCuti />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PermintaanCuti />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PermintaanCuti />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PermintaanCuti />
      </Grid>
    </Grid>
  )
}
index.getLayout = (page: React.ReactNode) => <HrLayout>{page}</HrLayout>

export default index
