// ** React Imports
import React, { forwardRef, useState, useEffect } from 'react'
import { startOfToday, differenceInDays, addDays } from 'date-fns'

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
import AppURL from 'src/api/AppURL'


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
  const [urgencyOptions, setUrgencyOptions] = useState<any[]>([])
  const [leaveOptions, setLeaveOptions] = useState<any[]>([])
  const [urgency, setUrgency] = useState<string>('')
  const [userData, setUserData] = useState<any>(null)
  const [errors, setErrors] = useState<any>({})
  

  const validateForm = () => {
    const errors: any = {}
    if (!nama) errors.nama = 'Nama harus diisi'
    if (!telepon) errors.telepon = 'Nomor telepon darurat harus diisi'
    if (!posisi) errors.posisi = 'Posisi harus diisi'
    if (!departemen) errors.departemen = 'Departemen harus diisi'
    if (!cutiType) errors.cutiType = 'Tipe cuti harus dipilih'
    if (!deskripsi) errors.deskripsi = 'Deskripsi harus diisi'
    const isSickLeave = Number(cutiType) === 2
    const duration = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0
    if (isSickLeave && duration > 1 && !doctorNoteImage) {
      errors.doctorNote = 'Surat dokter harus diunggah'
    }
    if (cutiType === 'Cuti urgensi' && !urgency) errors.urgency = 'Pilih jenis cuti urgensi'
    if (!startDate) errors.startDate = 'Tanggal awal harus diisi' 
    if (!endDate) errors.endDate = 'Tanggal akhir harus diisi'
    
    if (startDate && endDate && startDate > endDate)
      errors.date = 'Tanggal awal tidak boleh lebih besar dari tanggal akhir'
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submitFormData = async (data: any) => {
    try {
      const response = await fetch(AppURL.Submissions, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error('Failed to submit form data')
      }
      return response.json()
    } catch (error) {
      console.error('Error submitting form data:', error)
      throw error
    }
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
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            const finalCutiType = cutiType === 'Cuti urgensi' ? `${urgency}` : cutiType
            const dataPengajuan = {
              start_date: startDate,
              end_date: endDate,
              leave_type: finalCutiType,
              emergency_call: telepon,
              description: deskripsi
            }
            await submitFormData(dataPengajuan)
            Swal.fire({
              title: 'Pengajuan Berhasil Disubmit!',
              icon: 'success',
              confirmButtonColor: '#6AD01F',
              customClass: {
                container: 'full-screen-alert'
              }
            })
          } catch (error) {
            Swal.fire({
              title: 'Terjadi Kesalahan!',
              text: 'Gagal mengirim data pengajuan cuti. Silakan coba lagi.',
              icon: 'error',
              confirmButtonColor: '#FF6166',
              customClass: {
                container: 'full-screen-alert'
              }
            })
          }
        }
      })
    }
  }

    const handleChangeStartDate = (date: Date | null) => {
      setStartDate(date)

      if (cutiType === 'Cuti urgensi' && date) {
        const urgencyNumber = Number(urgency)
        if (urgencyNumber === 3) {
          handleChangeEndDate(addDays(date, 2))
        } else if (
          urgencyNumber === 4 ||
          urgencyNumber === 5 ||
          urgencyNumber === 7 ||
          urgencyNumber === 8 ||
          urgencyNumber === 9
        ) {
          handleChangeEndDate(addDays(date, 1))
        } else if (urgencyNumber === 6) {
          handleChangeEndDate(addDays(date, 0))
        }

        if (errors.startDate || errors.endDate) {
          setErrors({ ...errors, startDate: '', endDate: '' })
        }
      } else {
        if (errors.startDate) {
          setErrors({ ...errors, startDate: '' })
        }
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
    setShowUrgencyFields(selectedType === 'Cuti urgensi')
     const isSickLeave = Number(selectedType) === 2
     setShowDoctorNoteField(isSickLeave && startDate && endDate && differenceInDays(endDate, startDate) > 0)
    if (errors.cutiType) {
      setErrors({ ...errors, cutiType: '' })
    }
  }
   useEffect(() => {
     if (Number(cutiType) === 2 && startDate && endDate) {
       const duration = differenceInDays(endDate, startDate) + 1
       setShowDoctorNoteField(duration > 1)
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
    
      const handleChangeUrgency = (event: SelectChangeEvent<string>) => {
        const selectedUrgency = event.target.value as string
        setUrgency(selectedUrgency)
        setStartDate(null)
        setEndDate(null)
        if (errors.urgency) {
          setErrors({ ...errors, urgency: '' })
        }
      }

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(AppURL.Profile, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            if (!response.ok) {
              throw new Error('Gagal mengambil data user')
            }
            const userData = await response.json()
            setUserData(userData)
            setNama(userData.name) // Set the initial state with the fetched user data
            setPosisi(userData.position) // Set the initial state with the fetched user data
            setDepartemen(userData.department)
            // console.log(userData)
          } catch (error) {
            console.error('Terjadi kesalahan:', error)
          }
        }
        fetchUserData()
      }, [])

      useEffect(() => {
        const fetchUrgencyOptions = async () => {
          try {
            const response = await fetch(`${AppURL.LeaveType}?is_emergency=1`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            if (!response.ok) {
              throw new Error('Failed to fetch urgency options')
            }
            const urgencyData = await response.json()
            setUrgencyOptions(urgencyData)
          } catch (error) {
            console.error('Error fetching urgency options:', error)
          }
        }

        fetchUrgencyOptions()
      }, [])

       useEffect(() => {
         const fetchLeaveOptions = async () => {
           try {
             const response = await fetch(`${AppURL.LeaveType}?is_emergency=false`, {
               method: 'GET',
               headers: {
                 Authorization: `Bearer ${localStorage.getItem('token')}`
               }
             })
             if (!response.ok) {
               throw new Error('Failed to fetch urgency options')
             }
             const leaveData = await response.json()
             setLeaveOptions(leaveData)
           } catch (error) {
             console.error('Error fetching urgency options:', error)
           }
         }

         fetchLeaveOptions()
       }, [])

 
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
          Sisa cuti : {userData ? userData.total_days : '...'}
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
                error={!!errors.nama}
                helperText={errors.nama}
                placeholder='Masukkan Nama'
                value={nama}
                onChange={handleChangeNama}
                disabled
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

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Posisi'
                error={!!errors.posisi}
                helperText={errors.posisi}
                placeholder='Masukkan Posisi'
                value={posisi}
                onChange={handleChangePosisi}
                disabled
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
                error={!!errors.departemen}
                helperText={errors.departemen}
                placeholder='Masukkan Departemen'
                value={departemen}
                onChange={handleChangeDepartemen}
                disabled
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
                  {leaveOptions.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.type}
                    </MenuItem>
                  ))}
                  <MenuItem value='Cuti urgensi'>Cuti urgensi</MenuItem>
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
                  <InputLabel id='form-layouts-separator-select-label'>Cuti urgensi</InputLabel>
                  <Select
                    label='Tipe urgensi'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    error={!!errors.urgency}
                    onChange={handleChangeUrgency}
                    value={urgency}
                  >
                    {urgencyOptions.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.type}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.urgency && <FormHelperText error>{errors.urgency}</FormHelperText>}
                </FormControl>
              </Grid>
            )}
            {showDoctorNoteField && (
              <Grid item xs={12}>
                {/* Additional field for Cuti sakit */}
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
                startDate={startDate}
                disabled={cutiType === 'Cuti urgensi'}
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
