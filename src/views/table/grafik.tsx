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
import AppURL from 'src/api/AppURL'
import Button from '@mui/material/Button'
import { MicrosoftExcel } from 'mdi-material-ui'
import { useTranslation } from 'next-i18next'



const generateYears = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = 2005; year <= currentYear; year++) {
    years.push(year)
  }
  return years
}


interface Column {
  id: keyof Data
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: any) => string
}


// const columns: readonly Column[] = [
//   { id: 'name', label: t('grafik.nama'), minWidth: 170 },
//   { id: 'totalCuti', label: 'Total Pengajuan', minWidth: 100 },
//   { id: 'cutiDiterima', label: 'Diterima', minWidth: 100 },
//   { id: 'cutiDitolak', label: 'Ditolak', minWidth: 100 },
//   { id: 'cutiPending', label: 'Pending', minWidth: 100 },
//   { id: 'sisaCuti', label: 'Sisa Cuti', minWidth: 100 }
// ]

interface Data {
  id: number
  name: string
  totalCuti: number
  cutiDiterima: number
  cutiDitolak: number
  cutiPending: number
  sisaCuti: number
}

const Grafik = () => {
  const { t } = useTranslation('common')
  // ** Hook

  const [tahun, setTahun] = useState(new Date().getFullYear().toString())
  const [bulan, setBulan] = useState(new Date().getMonth() + 1)
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [rows, setRows] = useState<Data[]>([])
   const [order, setOrder] = useState<'asc' | 'desc'>('desc')
   const [orderBy, setOrderBy] = useState<keyof Data>('totalCuti')

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

   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch(
           `${AppURL.Submissions}/history-user?month=${bulan}&year=${tahun}&sort_by=${order}`,
           {
             method: 'GET',
             headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
             }
           }
         )
         if (!response.ok) {
           throw new Error('Network response was not ok')
         }
         const data = await response.json()
         setRows(data.stats)
       } catch (error) {
         console.error('Error fetching data:', error)
       }
     }

     fetchData()
   }, [tahun, bulan, order])

     const handleSort = (property: keyof Data) => {
       const isAsc = orderBy === property && order === 'asc'
       setOrder(isAsc ? 'desc' : 'asc')
       setOrderBy(property)
     }

     const sortedRows = rows.sort((a, b) => {
       if (
         orderBy === 'totalCuti' ||
         orderBy === 'cutiDiterima' ||
         orderBy === 'cutiDitolak' ||
         orderBy === 'cutiPending'
       ) {
         return order === 'asc'
           ? new Date(a[orderBy]).getTime() - new Date(b[orderBy]).getTime()
           : new Date(b[orderBy]).getTime() - new Date(a[orderBy]).getTime()
       } else if (orderBy === 'sisaCuti') {
         return order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy]
       }

       return 0
     })
      const handleDownload = async () => {
        try {
          const response = await fetch(`${AppURL.Submissions}/download-history-user?month=${bulan}&year=${tahun}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          const blob = await response.blob()
          const url = window.URL.createObjectURL(new Blob([blob]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `histori-pengajuan-${bulan}-${tahun}.xlsx`)
          document.body.appendChild(link)
          link.click()
          link.parentNode?.removeChild(link)
        } catch (error) {
          console.error('Error downloading file:', error)
        }
      }

      const columns: readonly Column[] = [
        { id: 'name', label: t('grafik.nama'), minWidth: 170 },
        { id: 'totalCuti', label: t('grafik.pengajuan'), minWidth: 100 },
        { id: 'cutiDiterima', label: t('grafik.diterima'), minWidth: 100 },
        { id: 'cutiDitolak', label: t('grafik.ditolak'), minWidth: 100 },
        { id: 'cutiPending', label: t('grafik.pending'), minWidth: 100 },
        { id: 'sisaCuti', label: t('grafik.sisa'), minWidth: 100 }
      ]

  return (
    <Paper>
      <CardHeader
        item
        xs={12}
        sm={6}
        title={t("grafik.title")}
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
            <TextField select label={t('grafik.tahun')} variant='outlined' size='small' value={tahun} onChange={handleChangeTahun}>
              {generateYears().map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
            <TextField select label={t('grafik.bulan')} variant='outlined' size='small' value={bulan} onChange={handleChangeBulan}>
              <MenuItem value={0}>{t('grafik.all')}</MenuItem>
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
      <Button
        size='large'
        type='submit'
        sx={{ ml: 5, mb: 5 }}
        variant='contained'
        onClick={handleDownload}
        startIcon={<MicrosoftExcel />}
      >
        {t('grafik.unduh')}
      </Button>
    </Paper>
  )
}

export default Grafik
