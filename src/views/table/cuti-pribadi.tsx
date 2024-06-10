import { useState, ChangeEvent, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button'
import { FileEye, PencilBox, TrashCan } from 'mdi-material-ui'
import EditCutiPribadi from './cuti-edit'
import CutiPribadiDetail from './cuti-p-detail'
import Chip from '@mui/material/Chip'
import Swal from 'sweetalert2'
import AppURL from '../../api/AppURL'
import axios from 'axios'

interface Column {
  id: 'submissionDate' | 'startDate' | 'endDate' | 'totalDays' | 'leaveType' | 'status' | 'approver' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'submissionDate', label: 'Tanggal Pengajuan', minWidth: 100 },
  { id: 'startDate', label: 'Tanggal Mulai', minWidth: 100 },
  { id: 'endDate', label: 'Tanggal Akhir', minWidth: 100 },
  { id: 'totalDays', label: 'Lama Cuti', minWidth: 100 },
  { id: 'leaveType', label: 'Tipe Cuti', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'approver', label: 'Approved By', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 }
]

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


const statusObj: { [key: string]: { color: string } } = {
  Diterima: { color: 'success' },
  Ditolak: { color: 'error' },
  Pending: { color: 'warning' }
}

const CutiPribadi = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [selectedRowData, setSelectedRowData] = useState<Data | null>(null)
  const [isEditCutiPribadiOpen, setIsEditCutiPribadiOpen] = useState<boolean>(false)
  const [isCutiDetailOpen, setIsCutiDetailOpen] = useState<boolean>(false)
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [orderBy, setOrderBy] = useState<keyof Data>('submissionDate')
  const [rows, setRows] = useState<Data[]>([])

     useEffect(() => {
       fetchSubmissions()
     }, [order])

     const fetchSubmissions = async () => {
       try {
         const token = localStorage.getItem('token')
         const response = await axios.get(AppURL.SubLogin, {
           headers: {
             Authorization: `Bearer ${token}`
           }
         })

         if (response.status !== 200) {
           throw new Error('Failed to fetch data')
         }

         const data = response.data
         if (Array.isArray(data.submissions)) {
           setRows(data.submissions)
         } else {
           console.error('Invalid data format: expected an array')
         }
       } catch (error) {
         console.error('Error fetching data:', error)
       }
     }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleEditClick = (rowData: Data) => {
    setSelectedRowData(rowData)
    setIsEditCutiPribadiOpen(true)
  }
  const handleCloseEditCutiPribadi = () => {
    setIsEditCutiPribadiOpen(false)
  }
  const handleEditSuccess = () => {
    fetchSubmissions() 
  }
  const handleDetailClick = (rowData: Data) => {
    setSelectedRowData(rowData)
    setIsCutiDetailOpen(true)
  }
  const handleCloseDetailCuti = () => {
    setIsCutiDetailOpen(false)
  }
  const handleSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedRows =
    order === 'asc'
      ? [...rows].sort((a, b) => {
          if (
            orderBy === 'submissionDate' ||
            orderBy === 'startDate' ||
            orderBy === 'endDate' ||
            orderBy === 'totalDays'
          ) {
            return new Date(a[orderBy]).getTime() - new Date(b[orderBy]).getTime()
          } else {
            return 0
          }
        })
      : [...rows].sort((a, b) => {
          if (
            orderBy === 'submissionDate' ||
            orderBy === 'startDate' ||
            orderBy === 'endDate' ||
            orderBy === 'totalDays'
          ) {
            return new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime()
          } else {
            return 0
          }
        })
        
  // const handleDeleteRow = async (rowData: Data) => {
  //   Swal.fire({
  //     title: 'Apakah Anda yakin?',
  //     text: `Anda akan menghapus pengajuan cuti`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#6AD01F',
  //     cancelButtonColor: '#FF6166',
  //     confirmButtonText: 'Ya, hapus!',
  //     cancelButtonText: 'Batal',
  //     customClass: {
  //       container: 'full-screen-alert'
  //     }
  //   }).then(async result => {
  //     if (result.isConfirmed) {
  //       try {
  //         const response = await axios.put(`${AppURL.Submissions}/delete/${rowData.id}`, null, {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem('token')}`
  //           }
  //         })

  //         if (response.status !== 200) {
  //           throw new Error('Gagal menghapus pengajuan')
  //         }
  //         const updatedRows = rows.filter(row => row.id !== rowData.id)
  //         setRows(updatedRows)
  //         Swal.fire({
  //           title: 'Pengajuan berhasil dihapus!',
  //           icon: 'success',
  //           confirmButtonColor: '#6AD01F',
  //           customClass: {
  //             container: 'full-screen-alert'
  //           }
  //         })
  //       } catch (error) {
  //         console.error('Terjadi kesalahan:', error)
  //         Swal.fire({
  //           title: 'Terjadi kesalahan!',
  //           text: 'Gagal menghapus data karyawan',
  //           icon: 'error',
  //           confirmButtonColor: '#FF6166',
  //           customClass: {
  //             container: 'full-screen-alert'
  //           }
  //         })
  //       }
  //     }
  //   })
  // }









  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                  onClick={() => handleSort(column.id as keyof Data)}
                >
                  {column.id === 'actions' ? <div style={{ textAlign: 'center' }}>Actions</div> : column.label}
                  {orderBy === column.id ? <span>{order === 'asc' ? '↓' : '↑'}</span> : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    if (column.id === 'actions') {
                      if (row.status === 'Pending') {
                        return (
                          <TableCell key={column.id} align='center' colSpan={columns.length}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <Button onClick={() => handleEditClick(row)}>
                                <PencilBox />
                              </Button>
                              {/* <Button onClick={() => handleDeleteRow(row)} style={{ right: '10px' }}>
                                <TrashCan />
                              </Button> */}
                            </div>
                          </TableCell>
                        )
                      } else if (row.status === 'Diterima' || row.status === 'Ditolak') {
                        return (
                          <TableCell key={column.id} align='center' colSpan={columns.length}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <Button onClick={() => handleDetailClick(row)}>
                                <FileEye />
                              </Button>
                            </div>
                          </TableCell>
                        )
                      }
                    } else {
                      const value = row[column.id as keyof Data]
                      if (column.id === 'status') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Chip
                              label={value}
                              color={
                                (statusObj[value]?.color as
                                  | 'success'
                                  | 'error'
                                  | 'warning'
                                  | 'default'
                                  | 'primary'
                                  | 'secondary'
                                  | 'info'
                                  | undefined) || 'default'
                              }
                              sx={{
                                height: 24,
                                fontSize: '0.75rem',
                                textTransform: 'capitalize',
                                '& .MuiChip-label': { fontWeight: 500 }
                              }}
                            />
                          </TableCell>
                        )
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      )
                    }
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <EditCutiPribadi
        open={isEditCutiPribadiOpen}
        onClose={handleCloseEditCutiPribadi}
        rowData={selectedRowData}
        onEditSuccess={handleEditSuccess}
      />
      <CutiPribadiDetail open={isCutiDetailOpen} onClose={handleCloseDetailCuti} rowData={selectedRowData} />
    </Paper>
  )
}

export default CutiPribadi
