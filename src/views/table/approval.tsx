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
import ApprovalDetail from './approval-detail'

interface Column {
  id: 'nama' | 'tgl_penyerahan' | 'tgl_mulai' | 'tgl_akhir' | 'lama_cuti' | 'tipe_cuti' | 'sisa_cuti' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'nama', label: 'Nama', minWidth: 170 },
  { id: 'tgl_penyerahan', label: 'Tanggal Penyerahan', minWidth: 100 },
  { id: 'tgl_mulai', label: 'Tanggal Mulai', minWidth: 100 },
  { id: 'tgl_akhir', label: 'Tanggal Akhir', minWidth: 100 },
  { id: 'lama_cuti', label: 'Lama Cuti', minWidth: 100 },
  { id: 'tipe_cuti', label: 'Tipe Cuti', minWidth: 100 },
  { id: 'sisa_cuti', label: 'Sisa Cuti', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 }
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
  telephone_darurat: string,
  posisi: string,
  departemen: string,
  tgl_mulai: string,
  tgl_akhir: string,
  lama_cuti: number,
  tipe_cuti: string,
  sisa_cuti: number,
  deskripsi: string
) {
  return {
    nama,
    tgl_penyerahan,
    telephone_darurat,
    posisi,
    departemen,
    tgl_mulai,
    tgl_akhir,
    lama_cuti,
    tipe_cuti,
    sisa_cuti,
    deskripsi
  }
}

const rows = [
  createData(
    'Kyujin',
    '20 Januari 2024',
    '+62 123-456-789',
    'Developer',
    'IT',
    '25 Januari 2024',
    '30 Januari 2024',
    5,
    'liburan',
    10,
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged It was popularised in'
  ),
  createData(
    'Jennie',
    '20 Februari 2024',
    '+62 123-456-789',
    'Developer',
    'IT',
    '	25 Februari 2024',
    '30 Februari 2024',
    5,
    'liburan',
    8,
    'test'
  ),
  createData(
    'Wonhee',
    '20 Maret 2024',
    '+62 123-456-789',
    'Developer',
    'IT',
    '	25 maret 2024',
    '30 maret 2024',
    5,
    'liburan',
    8,
    'test'
  ),
  createData(
    'Haerin',
    '20 April 2024',
    '+62 123-456-789',
    'Developer',
    'IT',
    '	25 April 2024',
    '30 April 2024',
    5,
    'liburan',
    8,
    'test'
  ),
  createData(
    'Chaewon',
    '20 Mei 2024',
    '+62 123-456-789',
    'Developer',
    'IT',
    '	25 Mei 2024',
    '30 Mei 2024',
    5,
    'liburan',
    8,
    'test'
  ),
  createData(
    'Pharita ',
    '20 Juni 2024',
    '+62 123-456-789',
    'Developer',
    'IT',
    '	25 Juni 2024',
    '30 Juni 2024',
    5,
    'liburan',
    8,
    'test'
  )
]

const Approval = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [selectedRowData, setSelectedRowData] = useState<Data | null>(null)
  const [isApprovalDetailOpen, setIsApprovalDetailOpen] = useState<boolean>(false)
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<'tgl_penyerahan' | ''>('')

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

 const handleActionClick = (rowData: Data) => {
   setSelectedRowData(rowData)
   setIsApprovalDetailOpen(true)
 }

 const handleCloseApprovalDetail = () => {
   setIsApprovalDetailOpen(false)
 }
 const handleSort = (property: keyof Data) => {
   const isAsc = orderBy === property && order === 'asc'
   setOrder(isAsc ? 'desc' : 'asc')
   setOrderBy(property)
 }

 const sortedRows =
   order === 'asc'
     ? [...rows].sort((a, b) => new Date(a.tgl_penyerahan).getTime() - new Date(b.tgl_penyerahan).getTime())
     : [...rows].sort((a, b) => new Date(b.tgl_penyerahan).getTime() - new Date(a.tgl_penyerahan).getTime())

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
                  onClick={() => column.id === 'tgl_penyerahan' && handleSort(column.id)}
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
      <ApprovalDetail open={isApprovalDetailOpen} onClose={handleCloseApprovalDetail} rowData={selectedRowData} />
    </Paper>
  )
}

export default Approval
