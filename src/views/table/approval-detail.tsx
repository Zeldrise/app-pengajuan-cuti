import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'


import { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { CloseCircle } from 'mdi-material-ui'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface PropsDetailDialog {
  open: boolean
  onClose: () => void
  rowData: Data | null
}


const DetailDialog: React.FC<PropsDetailDialog> = ({ open, onClose, rowData }) => {
  const handleClose = () => {
    onClose()
  }
  const handleAccept = () => {
    window.alert('pengajuan Cuti Telah Diterima')
    onClose()
  }
  const handleReject = () => {
    window.alert('pengajuan Cuti Ditolak')
    onClose()
  }
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      fullWidth='md'
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Informasi Detail
        <Button onClick={handleClose} color='inherit'>
          <CloseCircle />
        </Button>
      </DialogTitle>
      <DialogContent>
        <div>
          <p>Nama: {rowData?.nama}</p>
          <p>Tanggal Penyerahan: {rowData?.tgl_penyerahan}</p>
          <p>Telephone Darurat: {rowData?.telephone_darurat}</p>
          <p>Posisi: {rowData?.posisi}</p>
          <p>Departemen: {rowData?.departemen}</p>
          <p>Tanggal Mulai: {rowData?.tgl_mulai}</p>
          <p>Tanggal Akhir: {rowData?.tgl_akhir}</p>
          <p>Lama Cuti: {rowData?.lama_cuti}</p>
          <p>Tipe Cuti: {rowData?.tipe_cuti}</p>
          <p>Sisa Cuti: {rowData?.sisa_cuti}</p>
          <p>Deskripsi: {rowData?.deskripsi}</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='success' onClick={handleAccept}>
          Terima
        </Button>
        <Button variant='contained' color='error' onClick={handleReject}>
          Tolak
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DetailDialog
