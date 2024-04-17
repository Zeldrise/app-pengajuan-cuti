import Grid from '@mui/material/Grid'
import HrLayout from '../../layouts/HrLayout'
import KaryawanCuti from 'src/views/card/KaryawanCuti'
import PermintaanCuti from 'src/views/card/PermintaanCuti'
import Ditolak from 'src/views/card/Ditolak'
import Diterima from 'src/views/card/Diterima'

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
        <Diterima />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Ditolak />
      </Grid>
    </Grid>
  )
}
index.getLayout = (page: React.ReactNode) => <HrLayout>{page}</HrLayout>

export default index
