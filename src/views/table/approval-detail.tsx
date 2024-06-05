import React, { useState, useEffect } from 'react'
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
import Swal from 'sweetalert2'
import AppURL from '../../api/AppURL'

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
}

interface PropsApprovalDetail {
  open: boolean
  onClose: () => void
  rowData: Data | null
  onStatusChange: () => void
}

const ApprovalDetail: React.FC<PropsApprovalDetail> = ({ open, onClose, rowData, onStatusChange }) => {
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null)
   const [previewOpen, setPreviewOpen] = useState(false)
   const [previewImage, setPreviewImage] = useState<string | null>(null)

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

  const updateSubmissionStatus = async (id: number, status: 'accept' | 'reject') => {
    try {
      const response = await fetch(`${AppURL.Submissions}/${id}/${status}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) {
        throw new Error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleAccept = () => {
    Swal.fire({
      title: 'Terima pengajuan cuti?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6AD01F',
      cancelButtonColor: '#FF6166',
      confirmButtonText: 'Terima',
      cancelButtonText: 'Batal',
      customClass: {
        container: 'full-screen-alert'
      }
    }).then(async result => {
      if (result.isConfirmed && rowData) {
        try {
          await updateSubmissionStatus(rowData.id, 'accept')
          Swal.fire({
            title: 'Pengajuan Diterima!',
            icon: 'success',
            confirmButtonColor: '#6AD01F',
            customClass: {
              container: 'full-screen-alert'
            }
          })
          onStatusChange()
          onClose()
        } catch (error) {
          Swal.fire({
            title: 'Pengajuan Gagal!',
            text: 'Terjadi kesalahan saat menerima pengajuan.',
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

  const handleReject = () => {
    Swal.fire({
      title: 'Tolak pengajuan cuti?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6AD01F',
      cancelButtonColor: '#FF6166',
      confirmButtonText: 'Tolak',
      cancelButtonText: 'Batal',
      customClass: {
        container: 'full-screen-alert'
      }
    }).then(async result => {
      if (result.isConfirmed && rowData) {
        try {
          await updateSubmissionStatus(rowData.id, 'reject')
          Swal.fire({
            title: 'Pengajuan Ditolak',
            icon: 'success',
            confirmButtonColor: '#6AD01F',
            customClass: {
              container: 'full-screen-alert'
            }
          })
          onStatusChange()
          onClose()
        } catch (error) {
          Swal.fire({
            title: 'Penolakan Gagal!',
            text: 'Terjadi kesalahan saat menolak pengajuan.',
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

  
  const handleImageClick = (url: string) => {
    setPreviewImage(url)
    setPreviewOpen(true)
  }

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        fullWidth={true}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Detail Pengajuan Cuti
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
              <span style={{ display: 'inline-block', width: 180 }}>Tanggal Pengajuan</span>: {rowData?.submissionDate}
            </p>
            <p>
              <span style={{ display: 'inline-block', width: 180 }}>Telepon Darurat</span>: {rowData?.emergencyCall}
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
              <span style={{ display: 'inline-block', width: 180 }}>Lama Cuti</span>: {rowData?.totalDays} Hari
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
                  style={{ display: 'inline-flex', maxWidth: '100%', maxHeight: '200px', cursor: 'pointer' }}
                  onClick={() => handleImageClick(attachmentUrl)}
                />
              </div>
            )}
            <p>
              <span style={{ display: 'inline-block', width: 180 }}>Sisa Cuti</span>: {rowData?.leaveAllowance} Hari
            </p>
            <p>
              <span style={{ display: 'inline-block', width: 180 }}>Deskripsi</span>:{' '}
              <span style={{ display: 'inline-flex', width: 300 }}>{rowData?.description}</span>
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

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Surat Dokter
          <Button onClick={() => setPreviewOpen(false)} color='inherit'>
            <CloseCircle />
          </Button>
        </DialogTitle>
        <DialogContent>
          {previewImage && <img src={previewImage} alt='Preview' style={{ width: '100%', height: 'auto' }} />}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ApprovalDetail
