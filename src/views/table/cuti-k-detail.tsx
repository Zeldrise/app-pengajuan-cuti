import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Chip from '@mui/material/Chip'
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

interface PropsCutiKaryawanDetail {
  open: boolean
  onClose: () => void
  rowData: Data | null
}
const statusObj: { [key: string]: { color: string } } = {
  Diterima: { color: 'success' },
  Ditolak: { color: 'error' },
  Pending: { color: 'warning' }
}

const CutiKaryawanDetail: React.FC<PropsCutiKaryawanDetail> = ({ open, onClose, rowData }) => {
  const handleClose = () => {
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
        Informasi Detail
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
            <span style={{ display: 'inline-block', width: 180 }}>Status</span>:{' '}
            <Chip
              label={rowData?.status}
              color={rowData && statusObj[rowData?.status] ? statusObj[rowData?.status].color : 'default'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 }
              }}
            />
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Approved By</span>: {rowData?.approved_by}
          </p>
          <p>
            <span style={{ display: 'inline-block', width: 180 }}>Deskripsi</span>:{' '}
            <span style={{ display: 'inline-flex', width: 300 }}>{rowData?.deskripsi}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CutiKaryawanDetail
