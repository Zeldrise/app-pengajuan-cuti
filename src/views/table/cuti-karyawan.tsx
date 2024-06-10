import { forwardRef, useState, ChangeEvent, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button'
import { FileEye } from 'mdi-material-ui'
import Chip from '@mui/material/Chip'
import CutiKaryawanDetail from './cuti-k-detail'
import AppURL from '../../api/AppURL'
import CardHeader from '@mui/material/CardHeader'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'


const TglAwal = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Awal' autoComplete='off' />
})
const TglAkhir = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Tanggal Akhir' autoComplete='off' />
})


interface Column {
  id: keyof Data
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nama', minWidth: 170 },
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
  actions: any
}


const statusObj: { [key: string]: { color: string } } = {
  Diterima: { color: 'success' },
  Ditolak: { color: 'error' },
  Pending: { color: 'warning' }
}

const CutiKaryawan = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [selectedRowData, setSelectedRowData] = useState<Data | null>(null)
  const [isCutiKaryawanDetailOpen, setIsCutiKaryawanDetailOpen] = useState<boolean>(false)
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [orderBy, setOrderBy] = useState<keyof Data>('submissionDate')
  const [rows, setRows] = useState<Data[]>([])
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)


  useEffect(() => {
    fetchSubmissions()
  }, [order, startDate, endDate])

   const fetchSubmissions = async () => {
     try {
       let url = `${AppURL.Submissions}?status=diterima,ditolak&sort_by=${order}`
       if (startDate && endDate) {
         url += `&start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`
       }

       const response = await fetch(url, {
         method: 'GET',
         headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`
         }
       })
       if (!response.ok) {
         throw new Error('Failed to fetch data')
       }
       const data = await response.json()
       setRows(data.submissions)
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

  const handleActionClick = (rowData: Data) => {
    setSelectedRowData(rowData)
    setIsCutiKaryawanDetailOpen(true)
  }

  const handleCloseDetailCuti = () => {
    setIsCutiKaryawanDetailOpen(false)
  }

  const handleSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedRows = rows.sort((a, b) => {
    if (orderBy === 'submissionDate' || orderBy === 'startDate' || orderBy === 'endDate') {

      return order === 'asc'
        ? new Date(a[orderBy]).getTime() - new Date(b[orderBy]).getTime()
        : new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime()
    } else if (orderBy === 'leaveAllowance') {

      return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy]
    }

    return 0
  })

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CardHeader
        title='Laporan Cuti'
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Grid container spacing={2}>
            <Grid item sx={{ zIndex: 50 }}>
              <DatePicker
                selected={startDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<TglAwal />}
                id='form-layouts-separator-date'
                onChange={newValue => setStartDate(newValue)}
              />
            </Grid>
            <Grid item sx={{ zIndex: 50 }}>
              <DatePicker
                selected={endDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<TglAkhir />}
                id='form-layouts-separator-date'
                onChange={newValue => setEndDate(newValue)}
                minDate={startDate}
              />
            </Grid>
          </Grid>
        }
      />
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
                  {column.label}
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
                    const value = row[column.id]
                    if (column.id === 'actions') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button onClick={() => handleActionClick(row)}>
                            <FileEye />
                          </Button>
                        </TableCell>
                      )
                    }
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
      <CutiKaryawanDetail open={isCutiKaryawanDetailOpen} onClose={handleCloseDetailCuti} rowData={selectedRowData} />
    </Paper>
  )
}

export default CutiKaryawan
