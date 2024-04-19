// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FormPengajuanCuti from 'src/views/form/FormPengajuanCuti'
import StaffLayout from 'src/layouts/StaffLayout'

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
index.getLayout = (page: React.ReactNode) => <StaffLayout>{page}</StaffLayout>
export default index
