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
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import { Account, AccountTie, BadgeAccount } from 'mdi-material-ui'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import Swal from 'sweetalert2'
import AppURL from '../../api/AppURL'
import { useTranslation } from 'next-i18next'



interface User {
  id: number
  name: string
  email: string
  telephone: string
  position: string
  department: string
  total_days: number
  leave_allowance: number
  role: string
  gender: string
  join_date: string
}

interface FormData {
  user_id: number | null
  start_date: Date | null | undefined
  end_date: Date | null | undefined
  leave_type: string
  emergency_call: string
  description: string
  attachment: any
  force_submit?: boolean
}




const FormPengajuanKaryawan = () => {
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
  const [doctorNoteImage, setDoctorNoteImage] = useState<File | null>(null)
  const [urgencyOptions, setUrgencyOptions] = useState<any[]>([])
  const [leaveOptions, setLeaveOptions] = useState<any[]>([])
  const [urgency, setUrgency] = useState<string>('')
  const [userData, setUserData] = useState<any>(null)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [errors, setErrors] = useState<any>({})
  const [users, setUsers] = useState<User[]>([])
   const { t } = useTranslation('common')


     const TglAwal = forwardRef((props, ref) => {
       return <TextField fullWidth {...props} inputRef={ref} label={t('pengajuan.awal')} autoComplete='off' />
     })
     const TglAkhir = forwardRef((props, ref) => {
       return <TextField fullWidth {...props} inputRef={ref} label={t('pengajuan.akhir')} autoComplete='off' />
     })


  const validateForm = () => {
    const errors: any = {}
    if (!nama) errors.nama = 'Nama harus diisi'
    if (!telepon) errors.telepon = 'Nomor telepon darurat harus diisi'
    if (!posisi) errors.posisi = 'Posisi harus diisi'
    if (!departemen) errors.departemen = 'Departemen harus diisi'
    if (!cutiType) errors.cutiType = 'Jenis cuti harus dipilih'
    if (!deskripsi) errors.deskripsi = 'Deskripsi harus diisi'
    if (cutiType === 'Cuti urgensi' && !urgency) errors.urgency = 'Pilih jenis cuti penting'
    if (!startDate) errors.startDate = 'Tanggal awal harus diisi'
    if (!endDate) errors.endDate = 'Tanggal akhir harus diisi'

    if (startDate && endDate && startDate > endDate)
      errors.date = 'Tanggal awal tidak boleh lebih besar dari tanggal akhir'
    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  const uploadDoctorNote = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${AppURL.Submissions}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error('Failed to upload doctor note')
    }

    const result = await response.json()
    return result.filename
  }

 const submitFormData = async (data: FormData, id: number) => {
   try {
     const response = await fetch(`${AppURL.Submissions}/${id}`, {
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
    const duration = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0
  if (
    Number(cutiType) === 1 &&
    duration > (selectedUserId ? users.find(user => user.id === selectedUserId)?.total_days || 0 : 0)
  ) {
    Swal.fire({
      title: 'Maaf, Jatah Cuti Anda Melebihi Batas Maksimal!',
      text: 'Pengajuan cuti Anda telah melebihi batas maksimal cuti tahunan, kelebihan cuti Anda berikutnya akan memotong gaji Anda secara pro rata. Apakah Anda setuju?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6AD01F',
      cancelButtonColor: '#FF6166',
      confirmButtonText: 'Setuju',
      cancelButtonText: 'Tidak Setuju',
      customClass: {
        container: 'full-screen-alert'
      }
    }).then(result => {
      if (result.isConfirmed) {
        proceedWithFormSubmission()
      }
    })
  } else {
    if (validateForm() && selectedUserId !== null) {
      if (checkUrgencyLeaveDuration()) {
        proceedWithFormSubmission()
      }
    }
  }
}
const checkUrgencyLeaveDuration = () => {
  const duration = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0

  if (cutiType === 'Cuti urgensi') {
    const urgencyNumber = Number(urgency)
    let maxDays: number | undefined

    if (urgencyNumber === 3) {
      maxDays = 3
    } else if (
      urgencyNumber === 4 ||
      urgencyNumber === 5 ||
      urgencyNumber === 8 ||
      urgencyNumber === 9 ||
      urgencyNumber === 10 ||
      urgencyNumber === 6
    ) {
      maxDays = 2
    } else if (urgencyNumber === 7) {
      maxDays = 100
    } else if (urgencyNumber === 12) {
      maxDays = 12
    }

    if (maxDays !== undefined && duration > maxDays) {
      Swal.fire({
        title: 'Maaf, Pengajuan Cuti Anda Melebihi Batas Maksimal!',
        text: 'Pengajuan cuti Anda telah melebihi batas maksimal jumlah cuti yang diajukan, kelebihan cuti Anda berikutnya akan memotong sisa jumlah cuti tahunan. Apakah Anda setuju?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6AD01F',
        cancelButtonColor: '#FF6166',
        confirmButtonText: 'Setuju',
        cancelButtonText: 'Tidak Setuju',
        customClass: {
          container: 'full-screen-alert'
        }
      }).then(result => {
        if (result.isConfirmed) {
          proceedWithFormSubmission()
        }
      })
      return false
    }
  }

  return true
}

const proceedWithFormSubmission = async () => {
  Swal.fire({
    title: 'Apakah Anda Akan Tetap Melanjutkan Prosesnya?',
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
        let attachment = null

        if (Number(cutiType) !== 2 || doctorNoteImage) {
          attachment = doctorNoteImage ? await uploadDoctorNote(doctorNoteImage) : null
        }
        if (selectedUserId === null) {
          // Handle the case where selectedUserId is null
          console.error('selectedUserId cannot be null')
          return
        }
        const finalCutiType = cutiType === 'Cuti urgensi' ? `${urgency}` : cutiType
        const duration = startDate && endDate ? differenceInDays(endDate, startDate) + 1 : 0
        const dataPengajuan: FormData = {
          user_id: selectedUserId,
          start_date: startDate,
          end_date: endDate,
          leave_type: finalCutiType,
          emergency_call: telepon,
          description: deskripsi,
          attachment: attachment
        }
        if (duration > (selectedUserId ? users.find(user => user.id === selectedUserId)?.total_days || 0 : 0)) {
          dataPengajuan.force_submit = true
        }
        await submitFormData(dataPengajuan, selectedUserId)
        console.log('data yang disubmit :', dataPengajuan)
        Swal.fire({
          title: 'Pengajuan Cuti Anda Telah Berhasil Disubmit!',
          icon: 'success',
          confirmButtonColor: '#6AD01F',
          customClass: {
            container: 'full-screen-alert'
          }
        })
        setStartDate(null)
        setEndDate(null)
        setCutiType('')
        setTelepon('')
        setDeskripsi('')
        setShowUrgencyFields(false)
        setShowDoctorNoteField(false)
        setDoctorNoteImage(null)
        setUrgency('')
        setErrors({})
      } catch (error) {
        Swal.fire({
          title: 'Pengajuan Gagal',
          text: 'Gagal mengajukan cuti. Silakan cek sisa cuti karyawan yang anda pilih atau coba lagi nanti.',
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


  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 6 || day === 0
  }

  const getNextValidWorkday = (date: Date, duration: number) => {
    let resultDate = addDays(date, duration)
    while (isWeekend(resultDate)) {
      resultDate = addDays(resultDate, 2)
    }
    return resultDate
  }

  const handleChangeStartDate = (date: Date | null) => {
    setStartDate(date)

    if (cutiType === 'Cuti urgensi' && date) {
      const urgencyNumber = Number(urgency)
      let endDate
      if (urgencyNumber === 3) {
        endDate = getNextValidWorkday(date, 2)
        handleChangeEndDate(endDate)
      } else if (
        urgencyNumber === 4 ||
        urgencyNumber === 5 ||
        urgencyNumber === 8 ||
        urgencyNumber === 9 ||
        urgencyNumber === 10 ||
        urgencyNumber === 6
      ) {
        endDate = getNextValidWorkday(date, 1)
        handleChangeEndDate(endDate)
      } else if (urgencyNumber === 7) {
        endDate = getNextValidWorkday(date, 100)
        handleChangeEndDate(endDate)
      } else if (urgencyNumber === 12) {
        endDate = getNextValidWorkday(date, 11)
        handleChangeEndDate(endDate)
      }

      if (errors.startDate || errors.endDate) {
        setErrors({ ...errors, startDate: '', endDate: '' })
      }
    } else {
      if (errors.startDate) {
        setErrors({ ...errors, startDate: '' })
      }
    }
    if (endDate && date && date > endDate) {
      setEndDate(date)
    }
  }

  const handleChangeEndDate = (date: Date | null) => {
    const validEndDate = date && isWeekend(date) ? getNextValidWorkday(date, 0) : date
    setEndDate(validEndDate)
    if (errors.endDate) {
      setErrors({ ...errors, endDate: '' })
    }
  }

  const handleCutiTypeChange = (event: SelectChangeEvent<string>) => {
    const selectedType = event.target.value as string
    setCutiType(selectedType)
    setShowUrgencyFields(selectedType === 'Cuti urgensi')
    const isSickLeave = Number(selectedType) === 2
    setShowDoctorNoteField(
      isSickLeave && startDate && endDate && differenceInDays(endDate, startDate) > 0 ? true : false
    )
    if (selectedType !== 'Cuti urgensi') {
      setUrgency('')
    }
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
      setDoctorNoteImage(file)
    }
    if (errors.doctorNote) {
      setErrors({ ...errors, doctorNote: '' })
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
    const fetchUsers = async () => {
      try {
        const response = await fetch(AppURL.Users, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const userData = await response.json()
        const filteredData = userData.users.filter((user: any) => user.role !== 'owner')
        setUserData(filteredData)
      setUsers(
        filteredData.map((user: any) => ({
          id: user.id,
          name: user.name,
          position: user.position,
          department: user.department,
          total_days: user.total_days
        }))
      )

      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUsers()
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
        const response = await fetch(`${AppURL.LeaveType}?is_emergency=0`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch urgency options')
        }
        const leaveData = await response.json()
        const filteredLeaveOptions = leaveData.filter((option: any) => option.id !== 2)
        setLeaveOptions(filteredLeaveOptions)
      } catch (error) {
        console.error('Error fetching urgency options:', error)
      }
    }

    fetchLeaveOptions()
  }, [])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card>
      <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardHeader title={t('pengajuan.titleK')} titleTypographyProps={{ variant: 'h6' }} />
        <Typography
          variant='body1'
          sx={{
            display: 'flex',
            fontWeight: 'medium',
            marginRight: 5,
            alignItems: 'center'
          }}
        >
          {t('pengajuan.sisa')}:{' '}
          {selectedUserId ? users.find(user => user.id === selectedUserId)?.total_days || '0' : '0'}{' '}
          {t('pengajuan.hari')}
        </Typography>
      </Card>
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='nama'>{t('pengajuan.nama')}</InputLabel>
                <Select
                  value={selectedUserId ? selectedUserId.toString() : ''}
                  onChange={e => {
                    const id = parseInt(e.target.value)
                    setSelectedUserId(id)
                    const selectedUser = users.find(user => user.id === id)
                    if (selectedUser) {
                      setNama(selectedUser.id.toString())
                      setPosisi(selectedUser.position)
                      setDepartemen(selectedUser.department)
                    }
                  }}
                  label={t('pengajuan.nama')}
                  id='nama'
                  error={!!errors.nama}
                >
                  {users.map(user => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.nama && <FormHelperText error>{errors.nama}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('pengajuan.posisi')}
                error={!!errors.posisi}
                helperText={errors.posisi}
                placeholder='Masukkan Posisi'
                value={posisi}
                onChange={handleChangePosisi}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <BadgeAccount />
                    </InputAdornment>
                  ),
                  readOnly: true
                }}
              />
            </Grid>
            {isMobile ? (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('pengajuan.departemen')}
                    error={!!errors.departemen}
                    helperText={errors.departemen}
                    placeholder='Masukkan Departemen'
                    value={departemen}
                    onChange={handleChangeDepartemen}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountTie />
                        </InputAdornment>
                      ),
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='number'
                    label={t('pengajuan.telepon')}
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
              </>
            ) : (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='number'
                    label={t('pengajuan.telepon')}
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
                    label={t('pengajuan.departemen')}
                    error={!!errors.departemen}
                    helperText={errors.departemen}
                    placeholder='Masukkan Departemen'
                    value={departemen}
                    onChange={handleChangeDepartemen}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <AccountTie />
                        </InputAdornment>
                      ),
                      readOnly: true
                    }}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={6}>
              <FormControl component='fieldset' fullWidth sx={{ marginLeft: '5px' }}>
                <Typography variant='body1' gutterBottom>
                  {t('pengajuan.jenis')}
                </Typography>
                <RadioGroup
                  row
                  aria-labelledby='form-layouts-separator-radio-label'
                  name='tipe-cuti-group'
                  value={cutiType}
                  onChange={handleCutiTypeChange}
                >
                  {leaveOptions.map(option => (
                    <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.type} />
                  ))}
                  <FormControlLabel value='Cuti urgensi' control={<Radio />} label='Cuti Penting' />
                </RadioGroup>
                {errors.cutiType && <FormHelperText error>{errors.cutiType}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label={t('pengajuan.des')}
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
                  <InputLabel id='form-layouts-separator-select-label'>Jenis Cuti Penting</InputLabel>
                  <Select
                    label='Jenis Cuti Penting'
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
                    src={URL.createObjectURL(doctorNoteImage)}
                    alt='Doctor Note Preview'
                    style={{ marginTop: '10px', maxWidth: '50%' }}
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
                minDate={startDate}
                startDate={startDate}
              />
              {errors.endDate && <FormHelperText error>{errors.endDate}</FormHelperText>}
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            {t('pengajuan.submit')}
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormPengajuanKaryawan
