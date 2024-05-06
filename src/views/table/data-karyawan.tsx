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
import { PencilBox, PlusCircle, TrashCan } from 'mdi-material-ui'
import EditDataKaryawan from './data-edit'
import AddDataKaryawan from './add-karyawan'
import Swal from 'sweetalert2'

interface Column {
  id: 'nama' | 'email' | 'no_telephone' | 'posisi' | 'departemen' | 'sisa_cuti' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'nama', label: 'Nama', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'no_telephone', label: 'No Telephone', minWidth: 100 },
  { id: 'posisi', label: 'Posisi', minWidth: 100 },
  { id: 'departemen', label: 'Departemen', minWidth: 100 },
  { id: 'sisa_cuti', label: 'Sisa Cuti', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 }
]

interface Data {
  id: number
  nama: string
  email: string
  no_telephone: string
  posisi: string
  departemen: string
  sisa_cuti: number
}

function createData(
  nama: string,
  email: string,
  no_telephone: string,
  posisi: string,
  departemen: string,
  sisa_cuti: number
) {
  return { nama, email, no_telephone, posisi, departemen, sisa_cuti }
}

// const rows = [
//   createData('Kyujin', 'kyujin@gmail.com', '123-456-789', 'Developer', 'IT', 8),
//   createData('Wonhee', 'wonhee@gmail.com', '123-456-789', 'Developer', 'IT', 11),
//   createData('Haerin', 'haerin@gmail.com', '123-456-789', 'Developer', 'IT', 11),
//   createData('Chaewon','chaewon@gmail.com', '123-456-789', 'Developer', 'IT', 11),
// ]

const DataKaryawan = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [selectedRowData, setSelectedRowData] = useState<Data | null>(null)
  const [isEditDataKaryawanOpen, setIsEditDataKaryawanOpen] = useState<boolean>(false)
  const [isAddDataKaryawanOpen, setIsAddDataKaryawanOpen] = useState<boolean>(false)
    const [employees, setEmployees] = useState<Data[]>([
      createData('Kyujin', 'kyujin@gmail.com', '123-456-789', 'Developer', 'IT', 8),
      createData('Wonhee', 'wonhee@gmail.com', '123-456-789', 'Developer', 'IT', 11),
      createData('Haerin', 'haerin@gmail.com', '123-456-789', 'Developer', 'IT', 11),
      createData('Chaewon', 'chaewon@gmail.com', '123-456-789', 'Developer', 'IT', 11)
    ])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
   const handleActionClick = (rowData: Data) => {
     setSelectedRowData(rowData)
     setIsEditDataKaryawanOpen(true)
   }
   
   const handleCloseEditDataKaryawan = () => {
     setIsEditDataKaryawanOpen(false)
   }
   const handleAddDataKaryawan = () => {
     setIsAddDataKaryawanOpen(true)
   }
   const handleCloseAddDataKaryawan = () => {
     setIsAddDataKaryawanOpen(false)
   }

   const handleDeleteRow = (rowData: Data) => {
     Swal.fire({
       title: 'Apakah Anda yakin?',
       text: `Anda akan menghapus ${rowData.nama}`,
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
         const updatedEmployees = employees.filter(employee => employee !== rowData)
         setEmployees(updatedEmployees)
         Swal.fire({
           title: 'Data berhasil dihapus!',
           icon: 'success',
           confirmButtonColor: '#6AD01F',
           customClass: {
             container: 'full-screen-alert'
           }
         })
       }
     })
   }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.id === 'actions' ? <div style={{ textAlign: 'center' }}>Actions</div> : column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.nama}>
                  {columns.map(column => {
                    const value = row[column.id]
                    if (column.id === 'actions') {
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
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Button
        size='large'
        type='submit'
        sx={{ ml: 5, mb: 5 }}
        variant='contained'
        onClick={handleAddDataKaryawan}
        startIcon={<PlusCircle />}
      >
        Tambah karyawan
      </Button>
      <EditDataKaryawan open={isEditDataKaryawanOpen} onClose={handleCloseEditDataKaryawan} rowData={selectedRowData} />
      <AddDataKaryawan open={isAddDataKaryawanOpen} onClose={handleCloseAddDataKaryawan} />
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

export default DataKaryawan
