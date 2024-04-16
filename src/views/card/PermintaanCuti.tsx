import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const PermintaanCuti = () => {
  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.black', backgroundColor: '#ffcc14' }}>
      <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant='h4'
            sx={{
              display: 'flex',
              fontWeight: 'bold',
              marginBottom: 2.75,
              alignItems: 'center',
              color: 'common.black'
            }}
          >
            Permintaan Cuti
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h2' sx={{ color: 'common.black' }}>
              5
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PermintaanCuti
