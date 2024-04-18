// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { Account, AccountTie, BadgeAccount } from 'mdi-material-ui'
import Typography from '@mui/material/Typography'


const TglAwal = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Awal' autoComplete='off' />
})
const TglAkhir = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Akhir' autoComplete='off' />
})

const FormPengajuanCuti = () => {
  // ** States
  const [startDate, setStartDate] = useState<Date | null | undefined>(null)
  const [endDate, setEndDate] = useState<Date | null | undefined>(null)




 

  return (
    <Card>
      <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardHeader title='Form Pengajuan Cuti' titleTypographyProps={{ variant: 'h6' }} />
        <Typography
          variant='body1'
          sx={{
            display: 'flex',
            fontWeight: 'medium',
            marginRight: 5,
            alignItems: 'center',
          }}
        >
          Sisa cuti : 10
        </Typography>
      </Card>
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Nama'
                placeholder='Monkey D Luffy'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Account />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Telephone Darurat'
                placeholder='+62-123-456-8790'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Posisi'
                placeholder='Developer'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <BadgeAccount />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Departemen'
                placeholder='IT'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountTie />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Tipe Cuti</InputLabel>
                <Select
                  label='Tipe Cuti'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='Cuti Tahunan'>Cuti Tahunan</MenuItem>
                  <MenuItem value='Cuti Urgensi'>Cuti Urgensi</MenuItem>
                  <MenuItem value='Cuti Sakit'>Cuti Sakit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Deskripsi'
                placeholder='...'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MessageOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={startDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<TglAwal />}
                id='form-layouts-separator-date'
                onChange={(date: Date) => setStartDate(date)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={endDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<TglAkhir />}
                id='form-layouts-separator-date'
                onChange={(date: Date) => setEndDate(date)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormPengajuanCuti
