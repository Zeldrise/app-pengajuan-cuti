import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Bulan from '../../views/chart/Bulan'
import UserLayout from '../../layouts/UserLayout'

const index = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Bulan />
        </Card>
      </Grid>
    </Grid>
  )
}
index.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>
export default index
