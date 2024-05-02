// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import UserProfile from 'src/views/user-profile'
import UserLayout from 'src/layouts/UserLayout'
const AccountSettings = () => {
  // ** State
  const [value] = useState<string>('account')

  return (
    <Card>
      <TabContext value={value}>
        <TabPanel sx={{ p: 0 }} value='account'>
          <UserProfile />
        </TabPanel>
      </TabContext>
    </Card>
  )
}
AccountSettings.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>
export default AccountSettings
