import Grid from '@mui/material/Grid'
import Ditolak from 'src/views/card/Ditolak'
import Diterima from 'src/views/card/Diterima'
import KaryawanLayout from 'src/layouts/KaryawanLayout'

const index = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Diterima />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Ditolak />
      </Grid>
    </Grid>
  )
}
index.getLayout = (page: React.ReactNode) => <KaryawanLayout>{page}</KaryawanLayout>

export default index
