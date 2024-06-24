import Grid from '@mui/material/Grid'
import LoginPage from 'src/views/login'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'

const Dashboard = () => {
  const router = useRouter()

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale })
  }

  return (
    <Grid container spacing={6}>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          backgroundColor: '#292964',
          display: {
            xs: 'none',
            sm: 'flex'
          },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img src='/images/deptech.png' alt='Deptech' style={{ maxWidth: '100%', height: 'auto', margin: '10px' }} />
        <img src='/images/Login.png' alt='Login' style={{ maxWidth: '80%', height: 'auto' }} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
          <Button
            variant={router.locale === 'id' ? 'contained' : 'outlined'}
            onClick={() => changeLanguage('id')}
            sx={{ marginRight: '0.5rem' }}
          >
            ID
          </Button>
          <Button variant={router.locale === 'en' ? 'contained' : 'outlined'} onClick={() => changeLanguage('en')}>
            EN
          </Button>
        </Box>
        <LoginPage />
      </Grid>
    </Grid>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
})

export default Dashboard
