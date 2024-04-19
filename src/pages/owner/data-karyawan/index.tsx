import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import DataKaryawan from 'src/views/table/data-karyawan'
import OwnerLayout from 'src/layouts/OwnerLayout'

const index = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Data Karyawan' titleTypographyProps={{ variant: 'h6' }} />
          <DataKaryawan />
        </Card>
      </Grid>
    </Grid>
  )
}
index.getLayout = (page: React.ReactNode) => <OwnerLayout>{page}</OwnerLayout>
export default index
