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
import AppURL from '../../api/AppURL'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'


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
  { id: 'telephone', label: 'No Telepon', minWidth: 100 },
  { id: 'position', label: 'Posisi', minWidth: 100 },
  { id: 'department', label: 'Departemen', minWidth: 100 },
  { id: 'total_days', label: 'Sisa Cuti', minWidth: 100 }, 
  { id: 'actions', label: 'Actions', minWidth: 100 }
]

interface Data {
  id: number
  name: string
  email: string
  telephone: string
  position: string
  department: string
  total_days: number
  leave_allowance: number
  role: string
  gender: string
  join_date: string
  actions: any
}



const DataKaryawan = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [selectedRowData, setSelectedRowData] = useState<Data | null>(null)
  const [isEditDataKaryawanOpen, setIsEditDataKaryawanOpen] = useState<boolean>(false)
  const [isAddDataKaryawanOpen, setIsAddDataKaryawanOpen] = useState<boolean>(false)
  const [sisaCutiOrder, setSisaCutiOrder] = useState<'asc' | 'desc'>('desc')
  const [orderBySisaCuti, setOrderBySisaCuti] = useState<keyof Data>('total_days')
  const [userRole, setUserRole] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filterBy, setFilterBy] = useState<string>('name')

  const [employees, setEmployees] = useState<Data[]>([])

   useEffect(() => {
     fetchUserProfile()
     fetchData()
   }, [sisaCutiOrder, orderBySisaCuti, searchQuery, filterBy])

     const fetchUserProfile = async () => {
       try {
         const response = await fetch(AppURL.Profile, {
           method: 'GET',
           headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}`
           }
         })
         if (!response.ok) {
           throw new Error('Failed to fetch user profile')
         }

         const profileData = await response.json()
         setUserRole(profileData.role)
       } catch (error) {
         console.error(error)
         return null
       }
     }

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${AppURL.Users}?sort_by=${sisaCutiOrder}&sort_field=${orderBySisaCuti}&search=${searchQuery}&filter_by=${filterBy}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if (!response.ok) {
        throw new Error('Gagal mengambil data karyawan')
      }
      const data = await response.json()
      const filteredData = data.users.filter((user: any) => user.role !== 'owner')
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
   const handleAddEmployeeSuccess = () => {
     fetchData() // Update table data after adding a new employee
   }
   const handleEditEmployeeSuccess = () => {
     fetchData() // Update table data after adding a new employee
   }
  const handleCloseAddDataKaryawan = () => {
    setIsAddDataKaryawanOpen(false)
  }

   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
     setSearchQuery(event.target.value)
   }
     const handleFilterChange = (event: SelectChangeEvent<string>) => {
       setFilterBy(event.target.value as string)
     }

  const handleSortSisaCuti = () => {
    const isDesc = orderBySisaCuti === 'total_days' && sisaCutiOrder === 'desc'
    setSisaCutiOrder(isDesc ? 'asc' : 'desc')
    setOrderBySisaCuti('total_days')
  }
  const sortedEmployees =
    orderBySisaCuti === 'total_days'
      ? employees
          .slice()
          .sort((a, b) => (sisaCutiOrder === 'asc' ? a.total_days - b.total_days : b.total_days - a.total_days))
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
  }).then(async result => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${AppURL.Users}/delete/${rowData.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (!response.ok) {
          throw new Error('Gagal menghapus data karyawan')
        }

        const updatedEmployees = employees.filter(employee => employee.id !== rowData.id)
        setEmployees(updatedEmployees)

        Swal.fire({
          title: 'Data berhasil dihapus!',
          icon: 'success',
          confirmButtonColor: '#6AD01F',
          customClass: {
            container: 'full-screen-alert'
          }
        })
      } catch (error) {
        console.error('Terjadi kesalahan:', error)
        Swal.fire({
          title: 'Terjadi kesalahan!',
          text: 'Gagal menghapus data karyawan',
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


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CardHeader
        title='Data Karyawan'
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <FormControl variant='outlined' size='small'>
              <InputLabel id='filter-label'>Filter</InputLabel>
              <Select labelId='filter-label' value={filterBy} onChange={handleFilterChange} label='Filter'>
                <MenuItem value='name'>Nama</MenuItem>
                <MenuItem value='email'>Email</MenuItem>
                <MenuItem value='telephone'>No Telepon</MenuItem>
              </Select>
            </FormControl>
            <TextField label='Cari' variant='outlined' size='small' value={searchQuery} onChange={handleSearchChange} />
          </div>
        }
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns
                .filter(column => !(column.id === 'actions' && userRole === 'staff'))
                .map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ minWidth: column.minWidth }}
                    onClick={() => column.id === 'total_days' && handleSortSisaCuti()}
                  >
                    {column.id === 'actions' ? <div style={{ textAlign: 'center' }}>Actions</div> : column.label}
                    {orderBySisaCuti === column.id ? <span>{sisaCutiOrder === 'desc' ? '↓' : '↑'}</span> : null}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns
                    .filter(column => !(column.id === 'actions' && userRole === 'staff'))
                    .map(column => {
                      const value = row[column.id]
                      if (column.id === 'actions') {
                        return (
                          <TableCell key={column.id} align='center' colSpan={columns.length}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <Button onClick={() => handleActionClick(row)} style={{ left: '10px' }}>
                                <PencilBox />
                              </Button>
                              <Button onClick={() => handleDeleteRow(row)} style={{ right: '10px' }}>
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
      <EditDataKaryawan
        open={isEditDataKaryawanOpen}
        onClose={handleCloseEditDataKaryawan}
        rowData={selectedRowData}
        onEditEmployeeSuccess={handleEditEmployeeSuccess}
      />
      <AddDataKaryawan
        open={isAddDataKaryawanOpen}
        onClose={handleCloseAddDataKaryawan}
        onAddEmployeeSuccess={handleAddEmployeeSuccess}
      />
    </Paper>
  )
}

export default DataKaryawan
