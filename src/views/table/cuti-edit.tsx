import React, { forwardRef, useState, useEffect } from 'react'
import { startOfToday, differenceInDays } from 'date-fns'

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
import { AccountTie, BadgeAccount, CalendarAccount, CloseCircle, Grid, Margin, MessageOutline } from 'mdi-material-ui'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import Swal from 'sweetalert2'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface Data {
  nama: string
  posisi: string
  departemen: string
}

interface PropsEditCutiPribadi {
  open: boolean
  onClose: () => void
  rowData: Data | null
}

const EditCutiPribadi: React.FC<PropsEditCutiPribadi> = ({ open, onClose, rowData }) => {
  const [cutiType, setCutiType] = useState<string>('')
  const [deskripsi, setDeskripsi] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [showUrgencyFields, setShowUrgencyFields] = useState<boolean>(false)
  const [showDoctorNoteField, setShowDoctorNoteField] = useState<boolean>(false)
  const [doctorNoteImage, setDoctorNoteImage] = useState<string | null>(null)
  const [urgency, setUrgency] = useState<string>('')
  const [errors, setErrors] = useState<any>({})

  const handleClose = () => {
    onClose()
  }

    const validateForm = () => {
      const errors: any = {}
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
      const duration = differenceInDays(new Date(endDate), new Date(startDate))
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
      reader.readAsDataURL(file)
    }
    if (errors.doctorNote) {
      setErrors({ ...errors, doctorNote: '' })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
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
        }).then(result => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Pengajuan Cuti berhasil diedit!',
              icon: 'success',
              confirmButtonColor: '#6AD01F',
              customClass: {
                container: 'full-screen-alert'
              }
            })
           console.log('Data yang akan disubmit:', {
             cutiType,
             deskripsi,
             startDate,
             endDate,
             doctorNoteImage,
             urgency
           }) 
           onClose()
          }
        })   
    
    }
  }

  const handleChangeDeskripsi = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeskripsi(event.target.value)
     if (errors.deskripsi) {
       setErrors({ ...errors, deskripsi: '' })
     }
  }

  const handleChangeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value)
     if (errors.startDate) {
       setErrors({ ...errors, startDate: '' })
     }
  }

  const handleChangeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value)
    if (errors.endDate) {
      setErrors({ ...errors, endDate: '' })
    }
  }
  const handleChangeUrgency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrgency(event.target.value)
      if (errors.urgency) {
         setErrors({ ...errors, urgency: '' })
       }
  }


  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

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
        Edit Data Karyawan
        <Button onClick={handleClose} color='inherit'>
          <CloseCircle />
        </Button>
      </DialogTitle>
      <DialogContent>
        <div>
          <p>Nama: {rowData?.nama}</p>
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
          </FormControl>
          {showUrgencyFields && (
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label' sx={{ marginTop: 2 }}>
                Cuti Urgensi
              </InputLabel>
              <Select
                label='Tipe Urgensi'
                sx={{ marginTop: 2 }}
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
          )}
          {showDoctorNoteField && (
            <div>
              <input
                accept='image/*'
                id='contained-button-file'
                type='file'
                style={{ display: 'none' }}
                onChange={handleDoctorNoteChange}
              />
              <label htmlFor='contained-button-file'>
                <Button variant='contained' component='span' sx={{ marginTop: 2 }}>
                  Upload Surat Dokter
                </Button>
              </label>
              {doctorNoteImage && (
                <img src={doctorNoteImage} alt='Doctor Note Preview' style={{ marginTop: '10px', maxWidth: '100%' }} />
              )}
            </div>
          )}
          {errors.doctorNote && <FormHelperText error>{errors.doctorNote}</FormHelperText>}
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
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' }, marginTop: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <MessageOutline />
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            type='date'
            label='Start Date'
            value={startDate}
            onChange={handleChangeStartDate}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <CalendarAccount />
                </InputAdornment>
              )
            }}
          />
          {errors.startDate && <FormHelperText error>{errors.startDate}</FormHelperText>}
          {errors.date && <FormHelperText error>{errors.date}</FormHelperText>}
          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            type='date'
            label='End Date'
            value={endDate}
            onChange={handleChangeEndDate}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <CalendarAccount />
                </InputAdornment>
              )
            }}
          />
          {errors.endDate && <FormHelperText error>{errors.endDate}</FormHelperText>}
        </div>
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
