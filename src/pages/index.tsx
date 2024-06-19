import Grid from '@mui/material/Grid'
import LoginPage from 'src/views/login'

const Dashboard = () => {
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
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img src='/images/deptech.png' alt='Deptech' style={{ maxWidth: '100%', height: 'auto' }} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <LoginPage />
      </Grid>
    </Grid>
  )
}

export default Dashboard
