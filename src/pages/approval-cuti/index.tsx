import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Approval from 'src/views/table/approval'
import UserLayout from 'src/layouts/UserLayout'

const index = () => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Approval Cuti' titleTypographyProps={{ variant: 'h6' }} />
          <Approval />
        </Card>
      </Grid>
    </Grid>
  )
}
index.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>
export default index
