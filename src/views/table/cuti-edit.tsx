import React, { forwardRef, useState, useEffect } from 'react'
import { startOfToday, differenceInDays, addDays } from 'date-fns'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Account, AccountTie, BadgeAccount,  CloseCircle,  MessageOutline, Phone } from 'mdi-material-ui'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Swal from 'sweetalert2'
import CardContent from '@mui/material/CardContent'
import AppURL from '../../api/AppURL'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Grid from '@mui/material/Grid'

const TglAwal = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Awal' autoComplete='off' />
})
const TglAkhir = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Akhir' autoComplete='off' />
})


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface Data {
  id: number
  name: string
  submissionDate: string
  telephone: string
  emergencyCall: string
  position: string
  department: string
  startDate: string
  endDate: string
  totalDays: number
  leaveType: string
  leaveAllowance: number
  description: string
  status: string
  leave_urgency?: string
  doctor_note?: any
  attachment?: string
}



interface PropsEditCutiPribadi {
  open: boolean
  onClose: () => void
  rowData: Data | null
  onEditSuccess: () => void
}

const EditCutiPribadi: React.FC<PropsEditCutiPribadi> = ({ open, onClose, rowData, onEditSuccess }) => {
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
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null)
  const [urgencyOptions, setUrgencyOptions] = useState<any[]>([])
  const [leaveOptions, setLeaveOptions] = useState<any[]>([])
  const [urgency, setUrgency] = useState<string>('')
  const [errors, setErrors] = useState<any>({})
  const [maxEndDate, setMaxEndDate] = useState<Date | null>(null)

  

  const handleClose = () => {
    onClose()
  }

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

  const handleCutiTypeChange = (event: SelectChangeEvent<string>) => {
    const selectedType = event.target.value as string
    setCutiType(selectedType)
    setShowUrgencyFields(selectedType === 'Cuti urgensi')
    const isSickLeave = Number(selectedType) === 2
    setShowDoctorNoteField(
      isSickLeave && startDate && endDate && differenceInDays(endDate, startDate) > 0 ? true : false
    )
    if (selectedType !== 'Cuti urgensi') {
      setMaxEndDate(null)
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

   useEffect(() => {
     if (rowData && rowData.attachment) {
       const fetchAttachmentUrl = async () => {
         try {
           const response = await fetch(`${AppURL.Submissions}/uploads/${rowData.attachment}`, {
             method: 'GET',
             headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
             }
           })
           if (!response.ok) {
             throw new Error('Failed to fetch attachment')
           }
           const data = await response.blob()
           setAttachmentUrl(URL.createObjectURL(data))
         } catch (error) {
           console.error('Error fetching attachment:', error)
         }
       }
       fetchAttachmentUrl()
     } else {
       setAttachmentUrl(null)
     }
   }, [rowData])

      const updateDoctorNote = async (file: File) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(`${AppURL.Submissions}/upload/${rowData?.id}`, {
          method: 'PUT',
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

 const handleDoctorNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const file = event.target.files && event.target.files[0]
   if (file) {
     setDoctorNoteImage(file)
   }
   if (errors.doctorNote) {
     setErrors({ ...errors, doctorNote: '' })
   }
 }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      Swal.fire({
        title: 'Apa Anda yakin?',
        text: 'Pengajuan Akan Diedit',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#6AD01F',
        cancelButtonColor: '#FF6166',
        confirmButtonText: 'Edit',
        cancelButtonText: 'Batal',
        customClass: {
          container: 'full-screen-alert'
        }
      }).then(async result => {
        if (result.isConfirmed) {
            let attachment = null

            if (Number(cutiType) === 2 && doctorNoteImage) {
              attachment = await updateDoctorNote(doctorNoteImage)
            }
          const finalCutiType = cutiType === 'Cuti urgensi' ? `${urgency}` : cutiType
          const dataPengajuan = {
            start_date: startDate,
            end_date: endDate,
            leave_type: finalCutiType,
            emergency_call: telepon,
            description: deskripsi,
            attachment: attachment
          }

          try {
            const response = await fetch(`${AppURL.Submissions}/${rowData?.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify(dataPengajuan)
            })
            if (!response.ok) {
              throw new Error('Failed to update leave request')
            }

            Swal.fire({
              title: 'Pengajuan Cuti berhasil diedit!',
              icon: 'success',
              confirmButtonColor: '#6AD01F',
              customClass: {
                container: 'full-screen-alert'
              }
            })
            onClose()
            onEditSuccess()
          } catch (error) {
            console.error('Error updating leave request:', error)
            Swal.fire({
              title: 'Error',
              text: 'Gagal memperbarui pengajuan cuti',
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
         setMaxEndDate(endDate)
       } else if (
         urgencyNumber === 4 ||
         urgencyNumber === 5 ||
         urgencyNumber === 7 ||
         urgencyNumber === 8 ||
         urgencyNumber === 9
       ) {
         endDate = getNextValidWorkday(date, 1)
         handleChangeEndDate(endDate)
         setMaxEndDate(endDate)
       } else if (urgencyNumber === 6) {
         endDate = getNextValidWorkday(date, 0)
         handleChangeEndDate(endDate)
         setMaxEndDate(endDate)
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
        if (maxEndDate && date && date > maxEndDate) {
          setEndDate(maxEndDate)
        } else {
          const validEndDate = date && isWeekend(date) ? getNextValidWorkday(date, 0) : date
          setEndDate(validEndDate)
          if (errors.endDate) {
            setErrors({ ...errors, endDate: '' })
          }
        }
      }
  const handleChangeUrgency = (event: SelectChangeEvent<string>) => {
    const selectedUrgency = event.target.value as string
    setUrgency(selectedUrgency)
    setMaxEndDate(null) 
    setStartDate(null)
    setEndDate(null)
    if (errors.urgency) {
      setErrors({ ...errors, urgency: '' })
    }
  }

useEffect(() => {
  // Pre-fill form fields with rowData values
  if (rowData) {
    setNama(rowData.name || '');
    setTelepon(rowData.emergencyCall || '')
    setPosisi(rowData.position || '');
    setDepartemen(rowData.department || '');
    setDeskripsi(rowData.description || '');
    setStartDate(rowData.startDate ? new Date(rowData.startDate) : null);
    setEndDate(rowData.endDate ? new Date(rowData.endDate) : null);

    // Mencari id tipe cuti berdasarkan string tipe cuti
    const selectedLeaveType = leaveOptions.find(option => option.type === rowData.leaveType);
    if (selectedLeaveType) {
      setCutiType(selectedLeaveType.id);
    }

    if (rowData.leaveType === 'Cuti urgensi') {
      setShowUrgencyFields(true);
      setUrgency(rowData.leave_urgency || '');
    }
    if (rowData.leaveType === '2' && rowData.doctor_note) {
      setDoctorNoteImage(rowData.doctor_note)
    }
  }
}, [rowData, leaveOptions]);



  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

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
    <Dialog
      fullScreen={fullScreen}
      open={open}
      fullWidth={true}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Edit Pengajuan Cuti
        <Button onClick={handleClose} color='inherit'>
          <CloseCircle />
        </Button>
      </DialogTitle>
      <DialogContent>
        <form>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Nama'
                  error={!!errors.nama}
                  helperText={errors.nama}
                  placeholder='Masukkan Nama'
                  value={nama}
                  onChange={handleChangeNama}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Account />
                      </InputAdornment>
                    ),
                    readOnly: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='number'
                  label='Telepon Darurat'
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Posisi'
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Departemen'
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
              <Grid item xs={12}>
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
                    <MenuItem value='Cuti urgensi'>Cuti Urgensi</MenuItem>
                  </Select>
                  {errors.cutiType && <FormHelperText error>{errors.cutiType}</FormHelperText>}
                </FormControl>
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
                   {doctorNoteImage ? (
                  <img src={URL.createObjectURL(doctorNoteImage)} alt='Doctor Note Preview' style={{ marginTop: '10px', maxWidth: '100%' }} />
                ) : attachmentUrl ? (
                  <img src={attachmentUrl} alt='Attachment Preview' style={{ marginTop: '10px', maxWidth: '100%' }} />
                ) : null}
                  {errors.doctorNote && <FormHelperText error>{errors.doctorNote}</FormHelperText>}
                </Grid>
              )}
              <Grid item xs={12}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                  maxDate={cutiType === 'Cuti urgensi' ? maxEndDate : null}
                />
                {errors.endDate && <FormHelperText error>{errors.endDate}</FormHelperText>}
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='success' onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditCutiPribadi
