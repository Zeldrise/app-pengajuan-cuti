import { useState, ChangeEvent, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'

const generateYears = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = 2005; year <= currentYear; year++) {
    years.push(year)
  }
  return years
}

interface MonthlyLeave {
  month: string
  totalLeaveDays: number
}

interface Column {
  id: keyof Data
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nama', minWidth: 170 },
  { id: 'submission', label: 'Total Pengajuan', minWidth: 100 },
  { id: 'accept', label: 'Diterima', minWidth: 100 },
  { id: 'reject', label: 'Ditolak', minWidth: 100 },
  { id: 'pending', label: 'Pending', minWidth: 100 },
  { id: 'total_days', label: 'Sisa Cuti', minWidth: 100 }
]

interface Data {
  id: number
  name: string
  submission: number
  accept: number
  reject: number
  pending: number
  total_days: number
}

const createData = (
  name: string,
  submission: number,
  accept: number,
  reject: number,
  pending: number,
  total_days: number
) => {
  return { name, submission, accept, reject, pending, total_days }
}

const rows = [
  createData('Karyawan A', 10, 8, 2, 0, 7),
  createData('Karyawan B', 10, 8, 2, 0, 9),
  createData('Karyawan C', 10, 8, 2, 0, 3),
  createData('Karyawan D', 10, 8, 2, 0, 4),
  createData('Karyawan E', 10, 8, 2, 0, 8)
]

const Grafik = () => {
  // ** Hook

  const [tahun, setTahun] = useState(new Date().getFullYear().toString())
  const [bulan, setBulan] = useState(new Date().getMonth() + 1)
  const [data, setData] = useState<{ name: string; data: number[] }[]>([])
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangeTahun = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTahun(e.target.value)
  }
  const handleChangeBulan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBulan(parseInt(e.target.value))
  }


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper >
      <CardHeader
        item
        xs={12}
        sm={6}
        title='Grafik Pengajuan'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              '@media (min-width:600px)': {
                flexDirection: 'row',
                alignItems: 'center'
              }
            }}
          >
            <TextField select label='Tahun' variant='outlined' size='small' value={tahun} onChange={handleChangeTahun}>
              {generateYears().map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
            <TextField select label='Bulan' variant='outlined' size='small' value={bulan} onChange={handleChangeBulan}>
              <MenuItem value={0}>Semua Bulan</MenuItem>
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        }
      />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]

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
    </Paper>
  )
}

export default Grafik
