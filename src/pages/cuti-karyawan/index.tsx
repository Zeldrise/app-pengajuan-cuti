import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CutiKaryawan from '../../views/table/cuti-karyawan'
import UserLayout from '../../layouts/UserLayout'

const index = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CutiKaryawan />
        </Card>
      </Grid>
    </Grid>
  )
}
index.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>
export default index
