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

interface PropsApprovalDetail {
  open: boolean
  onClose: () => void
  rowData: Data | null
}


const ApprovalDetail: React.FC<PropsApprovalDetail> = ({ open, onClose, rowData }) => {
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
      fullWidth={true}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Detail Peangajuan Cuti
        <Button onClick={handleClose} color='inherit'>
          <CloseCircle />
        </Button>
      </DialogTitle>
      <DialogContent>
        <div>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Nama</span>: {rowData?.nama}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Tanggal Penyerahan</span>: {rowData?.tgl_penyerahan}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Telephone Darurat</span>: {rowData?.telephone_darurat}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Posisi</span>: {rowData?.posisi}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Departemen</span>: {rowData?.departemen}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Tanggal Mulai</span>: {rowData?.tgl_mulai}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Tanggal Akhir</span>: {rowData?.tgl_akhir}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Lama Cuti</span>: {rowData?.lama_cuti}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Tipe Cuti</span>: {rowData?.tipe_cuti}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Sisa Cuti</span>: {rowData?.sisa_cuti}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Deskripsi</span>:{' '}
            <span style={{ display: 'inline-flex', width: 300 }}>{rowData?.deskripsi}</span>
          </p>
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

export default ApprovalDetail
