// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from '../../@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FormPengajuanCuti from '../../views/form/FormPengajuanCuti'
import UserLayout from '../../layouts/UserLayout'


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
index.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>
export default index
