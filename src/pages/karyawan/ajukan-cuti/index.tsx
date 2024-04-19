// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FormPengajuanCuti from 'src/views/form/FormPengajuanCuti'
import KaryawanLayout from 'src/layouts/KaryawanLayout'

const index = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <FormPengajuanCuti />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}
index.getLayout = (page: React.ReactNode) => <KaryawanLayout>{page}</KaryawanLayout>
export default index
