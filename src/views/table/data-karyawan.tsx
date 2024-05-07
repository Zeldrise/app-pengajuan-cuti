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
import { PencilBox, PlusCircle, TrashCan } from 'mdi-material-ui'
import EditDataKaryawan from './data-edit'
import AddDataKaryawan from './add-karyawan'
import Swal from 'sweetalert2'
import AppURL from 'src/api/AppURL'

interface Column {
  id: keyof Data
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nama', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'telephone', label: 'No Telephone', minWidth: 100 },
  { id: 'position', label: 'Posisi', minWidth: 100 },
  { id: 'department', label: 'Departemen', minWidth: 100 },
  { id: 'sisa_cuti', label: 'Sisa Cuti', minWidth: 100 }, // Saya asumsikan ini sisa cuti
  { id: 'actions', label: 'Actions', minWidth: 100 }
]

interface Data {
  id: number
  name: string
  email: string
  telephone: string
  position: string
  department: string
  sisa_cuti: number
}

function createData(
  name: string,
  email: string,
  telephone: string,
  position: string,
  department: string,
  sisa_cuti: number
) {
  return { name, email, telephone, position, department, sisa_cuti }
}

const DataKaryawan = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [selectedRowData, setSelectedRowData] = useState<Data | null>(null)
  const [isEditDataKaryawanOpen, setIsEditDataKaryawanOpen] = useState<boolean>(false)
  const [isAddDataKaryawanOpen, setIsAddDataKaryawanOpen] = useState<boolean>(false)
  const [sisaCutiOrder, setSisaCutiOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBySisaCuti, setOrderBySisaCuti] = useState<keyof Data>('sisa_cuti')

  const [employees, setEmployees] = useState<Data[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(AppURL.Users, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (!response.ok) {
        throw new Error('Gagal mengambil data karyawan')
      }
      const data = await response.json()
      const filteredData = data.users.filter((user: any) => user.position !== 'owner')
      setEmployees(filteredData)
    } catch (error) {
      console.error('Terjadi kesalahan:', error)
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

  const handleSortSisaCuti = () => {
    const isAsc = orderBySisaCuti === 'sisa_cuti' && sisaCutiOrder === 'asc'
    setSisaCutiOrder(isAsc ? 'desc' : 'asc')
    setOrderBySisaCuti('sisa_cuti')
  }
  const sortedEmployees =
    orderBySisaCuti === 'sisa_cuti'
      ? employees
          .slice()
          .sort((a, b) => (sisaCutiOrder === 'asc' ? a.sisa_cuti - b.sisa_cuti : b.sisa_cuti - a.sisa_cuti))
      : employees.slice()

  const handleDeleteRow = (rowData: Data) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: `Anda akan menghapus ${rowData.name}`,
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
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth }}
                  onClick={() => column.id === 'sisa_cuti' && handleSortSisaCuti()}
                >
                  {column.id === 'actions' ? <div style={{ textAlign: 'center' }}>Actions</div> : column.label}
                  {orderBySisaCuti === column.id ? <span>{sisaCutiOrder === 'asc' ? '↓' : '↑'}</span> : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
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
