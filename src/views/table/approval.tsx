import { useState, ChangeEvent } from 'react'
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

interface Column {
  id: 'nama' | 'tgl_penyerahan' | 'tgl_mulai' | 'tgl_akhir' | 'lama_cuti' | 'tipe_cuti' | 'sisa_cuti' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'nama', label: 'Name', minWidth: 170 },
  { id: 'tgl_penyerahan', label: 'Tanggal Penyerahan', minWidth: 100 },
  { id: 'tgl_mulai', label: 'Tanggal Mulai', minWidth: 100 },
  { id: 'tgl_akhir', label: 'Tanggal Akhir', minWidth: 100 },
  { id: 'lama_cuti', label: 'Lama Cuti', minWidth: 100 },
  { id: 'tipe_cuti', label: 'Tipe Cuti', minWidth: 100 },
  { id: 'sisa_cuti', label: 'Sisa Cuti', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 }
  // {
  //   id: 'population',
  //   label: 'Population',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value: number) => value.toLocaleString('en-US')
  // },
  // {
  //   id: 'size',
  //   label: 'Size\u00a0(km\u00b2)',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value: number) => value.toLocaleString('en-US')
  // },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value: number) => value.toFixed(2)
  // }
]

interface Data {
  id: number
  nama: string
  tgl_penyerahan: string
  telephone_darurat: string
  posisi: string
  departemen: string
  tgl_mulai: string
  tgl_akhir: string
  lama_cuti: number
  tipe_cuti: string
  sisa_cuti: number
  deskripsi: string
}

function createData(
  nama: string,
  tgl_penyerahan: string,
  tgl_mulai: string,
  tgl_akhir: string,
  lama_cuti: number,
  tipe_cuti: string,
  sisa_cuti: number
) {
  return { nama, tgl_penyerahan, tgl_mulai, tgl_akhir, lama_cuti, tipe_cuti, sisa_cuti }
}

const rows = [
  createData('Kyujin', '20 Maret 2024', '	25 maret 2024', '30 maret 2024', 5, 'liburan', 8),
  createData('Jennie', '20 Januari 2024', '	25 Januari 2024', '30 Januari 2024', 2, 'liburan', 10),
  createData('Wonhee', '20 Maret 2024', '	25 maret 2024', '30 maret 2024', 3, 'liburan', 11),
  createData('Haerin', '20 Maret 2024', '	25 maret 2024', '30 maret 2024', 3, 'liburan', 11),
  createData('Chaewon', '20 Maret 2024', '	25 maret 2024', '30 maret 2024', 3, 'liburan', 11),
  createData('Pharita ', '20 Maret 2024', '	25 maret 2024', '30 maret 2024', 3, 'liburan', 11)
]

const Approval = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleActionClick = (rowData: Data) => {
    // Implement logic to open modal or perform any action
    console.log('Action clicked for:', rowData.nama)
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                <TableRow hover role='checkbox' tabIndex={-1} key={row.nama}>
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

export default Approval
