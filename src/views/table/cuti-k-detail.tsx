import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'

import { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { CloseCircle } from 'mdi-material-ui'
import AppURL from 'src/api/AppURL'

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
  approver: string
}

interface PropsCutiKaryawanDetail {
  open: boolean
  onClose: () => void
  rowData: Data | null
}

const CutiKaryawanDetail: React.FC<PropsCutiKaryawanDetail> = ({ open, onClose, rowData }) => {
  const handleClose = () => {
    onClose()
  }
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const getStatusTextColor = (status:string) => {
    if (status === 'Diterima') return 'green'
    if (status === 'Ditolak') return 'red'
    return 'inherit'
  }
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
        Informasi Detail
        <Button onClick={handleClose} color='inherit'>
          <CloseCircle />
        </Button>
      </DialogTitle>
      <DialogContent>
        <div>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Nama</span>: {rowData?.name}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Tanggal Penyerahan</span>: {rowData?.submissionDate}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>No Telephone</span>: {rowData?.telephone}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Telephone Darurat</span>: {rowData?.emergencyCall}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Posisi</span>: {rowData?.position}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Departemen</span>: {rowData?.department}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Tanggal Mulai</span>: {rowData?.startDate}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Tanggal Akhir</span>: {rowData?.endDate}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Lama Cuti</span>: {rowData?.totalDays}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Tipe Cuti</span>: {rowData?.leaveType}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Status</span>:{' '}
            <span style={{ color: getStatusTextColor(rowData?.status || '') }}>{rowData?.status}</span>
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Approved By</span>: {rowData?.approver}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Deskripsi</span>:{' '}
            <span style={{ display: 'inline-flex', width: 300 }}>{rowData?.description}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CutiKaryawanDetail
