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
import { PencilBox, TrashCan } from 'mdi-material-ui'
import EditCutiPribadi from './cuti-edit'
import Chip from '@mui/material/Chip'
import Swal from 'sweetalert2'

interface Column {
  id: 'tgl_penyerahan' | 'tgl_mulai' | 'tgl_akhir' | 'lama_cuti' | 'tipe_cuti' | 'status' | 'approved_by' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'tgl_penyerahan', label: 'Tanggal Penyerahan', minWidth: 100 },
  { id: 'tgl_mulai', label: 'Tanggal Mulai', minWidth: 100 },
  { id: 'tgl_akhir', label: 'Tanggal Akhir', minWidth: 100 },
  { id: 'lama_cuti', label: 'Lama Cuti', minWidth: 100 },
  { id: 'tipe_cuti', label: 'Tipe Cuti', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'approved_by', label: 'Approved By', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 }
]

interface Data {
  id: number
  nama: string
  tgl_penyerahan: string
  no_telephone: string
  telephone_darurat: string
  posisi: string
  departemen: string
  tgl_mulai: string
  tgl_akhir: string
  lama_cuti: number
  tipe_cuti: string
  deskripsi: string
  status: string
  approved_by: string
}

function createData(
  nama: string,
  tgl_penyerahan: string,
  no_telephone: string,
  telephone_darurat: string,
  posisi: string,
  departemen: string,
  tgl_mulai: string,
  tgl_akhir: string,
  lama_cuti: number,
  tipe_cuti: string,
  deskripsi: string,
  status: string,
  approved_by: string
): Data {
  return {
    id: Math.random(),
    nama,
    tgl_penyerahan,
    no_telephone,
    telephone_darurat,
    posisi,
    departemen,
    tgl_mulai,
    tgl_akhir,
    lama_cuti,
    tipe_cuti,
    deskripsi,
    status,
    approved_by
  }
}

let rows: Data[] = [
  createData(
    'Kyujin',
    '20 April 2024',
    '+62 987-654-321',
    '+62 123-456-789',
    'Developer',
    'IT',
    '25 April 2024',
    '30 April 2024',
    5,
    'liburan',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged It was popularised in',
    'Pending',
    ''
  ),
  createData(
    'Kyujin',
    '20 Februari 2024',
    '+62 987-654-321',
    '+62 123-456-789',
    'Developer',
    'IT',
    '	25 Februari 2024',
    '30 Februari 2024',
    5,
    'liburan',
    'test',
    'Diterima',
    'HR'
  ),
  createData(
    'Kyujin',
    '20 Januari 2024',
    '+62 987-654-321',
    '+62 123-456-789',
    'Developer',
    'IT',
    '25 Januari 2024',
    '30 Januari 2024',
    5,
    'liburan',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged It was popularised in',
    'Diterima',
    'HR'
  )
]
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
    setIsEditCutiPribadiOpen(true)
  }
  const handleCloseEditCutiPribadi = () => {
    setIsEditCutiPribadiOpen(false)
  }
  const handleSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === 'desc'
    setOrder(isAsc ? 'asc' : 'desc')
    setOrderBy(property)
  }
  const handleDeleteRow = (rowData: Data) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Anda akan menghapus pengajuan cuti`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6AD01F',
      cancelButtonColor: '#FF6166',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
      customClass: {
        container: 'full-screen-alert'
      }
    }).then(result => {
      if (result.isConfirmed) {
        const updatedRows = rows.filter(row => row !== rowData)
        rows = updatedRows
        Swal.fire({
          title: 'Pengajuan berhasil dihapus!',
          icon: 'success',
          confirmButtonColor: '#6AD01F',
          customClass: {
            container: 'full-screen-alert'
          }
        })
      }
    })
  }
  const sortedRows =
    order === 'desc'
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
                  {column.id === 'actions' ? <div style={{ textAlign: 'center' }}>Actions</div> : column.label}
                  {orderBy === column.id ? <span>{order === 'asc' ? '↓' : '↑'}</span> : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1}>
                  {columns.map(column => {
                    const value = row[column.id]
                    if (column.id === 'actions' && row.status === 'Pending') {
                      return (
                        <TableCell key={column.id} align='center' colSpan={columns.length}>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={() => handleActionClick(row)}>
                              <PencilBox />
                            </Button>
                            <Button onClick={() => handleDeleteRow(row)}>
                              <TrashCan />
                            </Button>
                          </div>
                        </TableCell>
                      )
                    }
                    if (column.id === 'status') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Chip
                            label={value}
                            color={statusObj[value].color}
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
      <EditCutiPribadi open={isEditCutiPribadiOpen} onClose={handleCloseEditCutiPribadi} rowData={selectedRowData} />
    </Paper>
  )
  //  <Butto
  //       className={`fixed right-3 bottom-3 md:right-10 md:bottom-10 bg-yellow-400  px-4 py-2 text-white rounded-md `}
  //       // onClick={handleAddEmployeeClick}
  //       // disabled={editingItemId !== null}
  //     >
  //       Tambah Karyawan
  //     </Butto>
}

export default CutiPribadi
