import React, { useState, useEffect } from 'react'
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
  attachment?: string
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
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null)

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

  const handleClose = () => {
    onClose()
  }
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const getStatusTextColor = (status: string) => {
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
          {attachmentUrl && (
            <div>
              <span style={{ display: 'inline-block', width: 180 }}>Surat Dokter</span>:
              <img
                src={attachmentUrl}
                alt='Attachment'
                style={{ display: 'inline-flex', maxWidth: '100%', maxHeight: '200px' }}
              />
            </div>
          )}
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
