// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import FormPengajuanCuti from 'src/views/form/FormPengajuanCuti'
import UserLayout from 'src/layouts/UserLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const index = () => {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/pages/login')
    }
  }, [router])
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
