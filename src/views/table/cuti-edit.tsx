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

  const handleClose = () => {
    onClose()
  }

  const handleCutiTypeChange = (event: SelectChangeEvent<string>) => {
    const selectedType = event.target.value as string
    setCutiType(selectedType)
    setShowUrgencyFields(selectedType === 'Cuti Urgensi')
    setShowDoctorNoteField(selectedType === 'Cuti Sakit')
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
  }

  const handleSubmit = () => {
    console.log('Data yang akan disubmit:', { cutiType, deskripsi, startDate, endDate}) // Menampilkan data yang akan disubmit pada console
    window.alert('Data karyawan berhasil diedit')
    onClose()
  }

  const handleChangeDeskripsi = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeskripsi(event.target.value)
  }

  const handleChangeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value)
  }

  const handleChangeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value)
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
              >
                <MenuItem value='Cuti Tahunan'>keluarga meninggal</MenuItem>
                <MenuItem value='Cuti Urgensi'>melahirkan</MenuItem>
                <MenuItem value='Cuti Sakit'>kehilangan</MenuItem>
              </Select>
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
          <TextField
            fullWidth
            multiline
            minRows={3}
            label='Deskripsi'
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
