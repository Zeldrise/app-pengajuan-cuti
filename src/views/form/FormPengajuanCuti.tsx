// ** React Imports
import React, { forwardRef, useState, useEffect } from 'react'
import { startOfToday, differenceInDays } from 'date-fns'

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
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { Account, AccountTie, BadgeAccount } from 'mdi-material-ui'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import Swal from 'sweetalert2'


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
  const [cutiType, setCutiType] = useState<string>('')
  const [nama, setNama] = useState<string>('')
  const [telepon, setTelepon] = useState<string>('')
  const [posisi, setPosisi] = useState('')
  const [departemen, setDepartemen] = useState('')
  const [deskripsi, setDeskripsi] = useState<string>('')
  const [showUrgencyFields, setShowUrgencyFields] = useState<boolean>(false)
  const [showDoctorNoteField, setShowDoctorNoteField] = useState<boolean>(false)
  const [doctorNoteImage, setDoctorNoteImage] = useState<string | null>(null)
  const [urgency, setUrgency] = useState<string>('')
  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const errors: any = {}
    if (!nama) errors.nama = 'Nama harus diisi'
    if (!telepon) errors.telepon = 'Nomor telepon darurat harus diisi'
    if (!posisi) errors.posisi = 'Posisi harus diisi'
    if (!departemen) errors.departemen = 'Departemen harus diisi'
    if (!cutiType) errors.cutiType = 'Tipe cuti harus dipilih'
    if (!deskripsi) errors.deskripsi = 'Deskripsi harus diisi'
    if (cutiType === 'Cuti Sakit' && !doctorNoteImage) errors.doctorNote = 'Surat dokter harus diunggah'
    if (cutiType === 'Cuti Urgensi' && !urgency) errors.urgency = 'Pilih jenis cuti urgensi'
    if (!startDate) errors.startDate = 'Tanggal awal harus diisi' 
    if (!endDate) errors.endDate = 'Tanggal akhir harus diisi'
    
    if (startDate && endDate && startDate > endDate)
      errors.date = 'Tanggal awal tidak boleh lebih besar dari tanggal akhir'
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
          Swal.fire({
            title: 'Apa Pengajuan Sudah Benar?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#6AD01F',
            cancelButtonColor: '#FF6166',
            confirmButtonText: 'Ajukan',
            cancelButtonText: 'Batal',
            customClass: {
              container: 'full-screen-alert'
            }
          }).then(result => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Pengajuan Berhasil Disubmit!',
                icon: 'success',
                confirmButtonColor: '#6AD01F',
                customClass: {
                  container: 'full-screen-alert'
                }
              })
              const dataPengajuan = {
                nama,
                telepon,
                posisi,
                departemen,
                cutiType,
                urgency,
                deskripsi,
                startDate,
                doctorNoteImage,
                endDate
              }
              console.log('Data yang akan disubmit:', dataPengajuan)
            }
          })

    }
  }
    const handleChangeStartDate = (date: Date | null) => {
      setStartDate(date)
      if (errors.startDate) {
        setErrors({ ...errors, startDate: '' }) 
      }
    }

    const handleChangeEndDate = (date: Date | null) => {
      setEndDate(date)
      if (errors.endDate) {
        setErrors({ ...errors, endDate: '' }) 
      }
    }

  const handleCutiTypeChange = (event: SelectChangeEvent<string>) => {
    const selectedType = event.target.value as string
    setCutiType(selectedType)

    setShowUrgencyFields(selectedType === 'Cuti Urgensi')
    setShowDoctorNoteField(selectedType === 'Cuti Sakit')
    if (errors.cutiType) {
      setErrors({ ...errors, cutiType: '' })
    }
  }
  useEffect(() => {
    // Set showDoctorNoteField to true if cutiType is 'Cuti Sakit' and duration is more than 1 day
    if (cutiType === 'Cuti Sakit' && startDate && endDate) {
      const duration = differenceInDays(endDate, startDate)
      setShowDoctorNoteField(duration > 0)
    } else {
      setShowDoctorNoteField(false)
    }
  }, [cutiType, startDate, endDate])
 const handleDoctorNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files && event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      setDoctorNoteImage(reader.result as string)
    }
    setDoctorNoteImage(event.target.value)
    reader.readAsDataURL(file)
  }
  if (errors.doctorNote) {
    setErrors({ ...errors, doctorNote: '' })
  }
 }
   const handleChangeNama = (event: React.ChangeEvent<HTMLInputElement>) => {
     setNama(event.target.value)
     if (errors.nama) {
       setErrors({ ...errors, nama: '' })
     }
   }
   const handleChangeTeleponDarurat = (event: React.ChangeEvent<HTMLInputElement>) => {
     setTelepon(event.target.value)
     if (errors.telepon) {
       setErrors({ ...errors, telepon: '' })
     }
   }
     const handleChangePosisi = (event: React.ChangeEvent<HTMLInputElement>) => {
       setPosisi(event.target.value)
       if (errors.posisi) {
         setErrors({ ...errors, posisi: '' })
       }
     }

     const handleChangeDepartemen = (event: React.ChangeEvent<HTMLInputElement>) => {
       setDepartemen(event.target.value)
       if (errors.departemen) {
         setErrors({ ...errors, departemen: '' })
       }
       
     }
     const handleChangeDeskripsi = (event: React.ChangeEvent<HTMLInputElement>) => {
       setDeskripsi(event.target.value)
       if (errors.deskripsi) {
         setErrors({ ...errors, deskripsi: '' })
       }
     }
     const handleChangeUrgency = (event: React.ChangeEvent<HTMLInputElement>) => {
       setUrgency(event.target.value)
       if (errors.urgency) {
         setErrors({ ...errors, urgency: '' })
       }
     }
 
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
            alignItems: 'center'
          }}
        >
          Sisa cuti : 10
        </Typography>
      </Card>
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Nama'
                placeholder='Monkey D Luffy'
                error={!!errors.nama}
                helperText={errors.nama}
                value={nama}
                onChange={handleChangeNama}
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
                error={!!errors.telepon}
                helperText={errors.telepon}
                value={telepon}
                onChange={handleChangeTeleponDarurat}
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
                error={!!errors.posisi}
                helperText={errors.posisi}
                value={posisi}
                onChange={handleChangePosisi}
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
                error={!!errors.departemen}
                helperText={errors.departemen}
                value={departemen}
                onChange={handleChangeDepartemen}
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
                  onChange={handleCutiTypeChange}
                  error={!!errors.cutiType}
                  value={cutiType}
                >
                  <MenuItem value='Cuti Tahunan'>Cuti Tahunan</MenuItem>
                  <MenuItem value='Cuti Urgensi'>Cuti Urgensi</MenuItem>
                  <MenuItem value='Cuti Sakit'>Cuti Sakit</MenuItem>
                </Select>
                {errors.cutiType && <FormHelperText error>{errors.cutiType}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Deskripsi'
                error={!!errors.deskripsi}
                helperText={errors.deskripsi}
                value={deskripsi}
                onChange={handleChangeDeskripsi}
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
            {showUrgencyFields && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Cuti Urgensi</InputLabel>
                  <Select
                    label='Tipe Urgensi'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    error={!!errors.urgency}
                    onChange={handleChangeUrgency}
                    value={urgency}
                  >
                    <MenuItem value='keluarga meninggal'>keluarga meninggal</MenuItem>
                    <MenuItem value='melahirkan'>melahirkan</MenuItem>
                    <MenuItem value='kehilangan'>kehilangan</MenuItem>
                  </Select>
                  {errors.urgency && <FormHelperText error>{errors.urgency}</FormHelperText>}
                </FormControl>
              </Grid>
            )}
            {showDoctorNoteField && (
              <Grid item xs={12}>
                {/* Additional field for Cuti Sakit */}
                <input
                  accept='image/*'
                  id='contained-button-file'
                  type='file'
                  style={{ display: 'none' }}
                  onChange={handleDoctorNoteChange}
                />
                <label htmlFor='contained-button-file'>
                  <Button variant='contained' component='span'>
                    Upload Surat Dokter
                  </Button>
                </label>
                {doctorNoteImage && (
                  <img
                    src={doctorNoteImage}
                    alt='Doctor Note Preview'
                    style={{ marginTop: '10px', maxWidth: '100%' }}
                  />
                )}
                {errors.doctorNote && <FormHelperText error>{errors.doctorNote}</FormHelperText>}
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={startDate}
                showYearDropdown
                showMonthDropdown
                error={!!errors.startDate}
                placeholderText='MM-DD-YYYY'
                customInput={<TglAwal />}
                id='form-layouts-separator-date'
                onChange={handleChangeStartDate}
                minDate={startOfToday()}
              />
              {errors.startDate && <FormHelperText error>{errors.startDate}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={endDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<TglAkhir />}
                id='form-layouts-separator-date'
                onChange={handleChangeEndDate}
                minDate={startOfToday()}
              />
              {errors.endDate && <FormHelperText error>{errors.endDate}</FormHelperText>}
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
