// // ** MUI Imports

// import Card from '@mui/material/Card'
// import { useTheme } from '@mui/material/styles'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import { useRouter } from 'next/router'

// // ** Third Party Imports
// import { ApexOptions } from 'apexcharts'

// // ** Custom Components Imports
// import React, { useEffect, useState } from 'react'
// import ReactApexcharts from 'src/@core/components/react-apexcharts'
// import TextField from '@mui/material/TextField'
// import AppURL from '../../api/AppURL'
// import { Paper } from '@material-ui/core'
// import Table from '@mui/material/Table'
// import TableRow from '@mui/material/TableRow'
// import TableHead from '@mui/material/TableHead'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import ReactApexChart from 'react-apexcharts'

// interface MonthlyLeave {
//   month: string
//   totalLeaveDays: number
// }

// interface Column {
//   id: keyof Data
//   label: string
//   minWidth?: number
//   align?: 'right'
//   format?: (value: any) => string
// }

// const columns: readonly Column[] = [
//   { id: 'name', label: 'Nama', minWidth: 170 },
//   { id: 'submission', label: 'Total Pengajuan', minWidth: 100 },
//   { id: 'accept', label: 'Diterima', minWidth: 100 },
//   { id: 'reject', label: 'Ditolak', minWidth: 100 },
//   { id: 'pending', label: 'Pending', minWidth: 100 },
// ]

// interface Data {
//   id: number
//   name: string
//   submission: number
//   accept: number
//   reject: number
//   pending: number
// }

// const createData = (name: string, submission: number, accept: number,  reject: number, pending: number) => {
//   return { name, submission, accept, reject, pending }
// }

// const rows = [
//   createData('Karyawan A', 10, 8, 2,0),
//   createData('Karyawan B', 10, 8, 2,0),
//   createData('Karyawan C', 10, 8, 2,0),
//   createData('Karyawan D', 10, 8, 2,0),
//   createData('Karyawan E', 10, 8, 2,0),
// ]

// const Tahun = () => {
//   // ** Hook
//   const theme = useTheme()
//   const router = useRouter()
//   const [tahun, setTahun] = useState(new Date().getFullYear().toString())
//    const [data, setData] = useState<{ name: string; data: number[] }[]>([])
//     const [page, setPage] = useState<number>(0)
//     const [rowsPerPage, setRowsPerPage] = useState<number>(10)

//     // useEffect(() => {
//     //   const fetchData = async () => {
//     //     try {
//     //       const token = localStorage.getItem('token') // or obtain it from a context/provider
//     //       const response = await fetch(`${AppURL.Submissions}/history-month?year=${tahun}`, {
//     //         headers: {
//     //           Authorization: `Bearer ${token}`,
//     //           'Content-Type': 'application/json'
//     //         }
//     //       })

//     //       if (!response.ok) {
//     //         throw new Error('Network response was not ok')
//     //       }

//     //         const responseData = await response.json()
//     //         const monthlyData = responseData.monthlyLeaveSummary.map((month: MonthlyLeave) => month.totalLeaveDays)
//     //       setData(monthlyData)
//     //     } catch (error) {
//     //       console.error('Error fetching data:', error)
//     //     }
//     //   }

//     //   fetchData()
//     // }, [tahun])

//   //   useEffect(() => {
//   //     const exampleData = [
//   //       { name: 'Total Pengajuan', data: [20, 30, 25, 40, 35, 45, 35, 50, 55, 60, 40, 30] },
//   //       { name: 'Total Diterima', data: [15, 25, 20, 35, 30, 40, 30, 45, 50, 55, 35, 25] },
//   //       { name: 'Total Ditolak', data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5] }
//   //     ]
//   //     setData(exampleData)
//   //   }, [])

//   // const options: ApexOptions = {
//   //   chart: {
//   //     parentHeightOffset: 0,
//   //     stacked: true,
//   //     toolbar: { show: false },
//   //     events: {
//   //       click: function (event, chartContext, config) {
//   //         const dataPointIndex = config.dataPointIndex
//   //         if (dataPointIndex >= 0) {
//   //           localStorage.setItem('dataPointIndex', dataPointIndex)
//   //           router.push(`/chart`)
//   //         }
//   //       }
//   //     }
//   //   },
//   //   plotOptions: {
//   //     bar: {
//   //       borderRadius: 9,
//   //       distributed: true,
//   //       columnWidth: '40%'
//   //     }
//   //   },
//   //   stroke: {
//   //     width: 2,
//   //     colors: [theme.palette.background.paper]
//   //   },
//   //   legend: { show: true },
//   //   grid: {
//   //     strokeDashArray: 7,
//   //     padding: {
//   //       top: -1,
//   //       right: 0,
//   //       left: -12,
//   //       bottom: 5
//   //     }
//   //   },
//   //   dataLabels: { enabled: false },
//   //   colors: ['#008FFB', '#00E396', '#FEB019'],
//   //   states: {
//   //     hover: {
//   //       filter: { type: 'none' }
//   //     },
//   //     active: {
//   //       filter: { type: 'none' }
//   //     }
//   //   },
//   //   xaxis: {
//   //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
//   //     tickPlacement: 'on',
//   //     labels: { show: true },
//   //     axisTicks: { show: false },
//   //     axisBorder: { show: false }
//   //   },
//   //   yaxis: {
//   //     show: true,
//   //     tickAmount: 4,
//   //     labels: {
//   //       offsetX: -17,
//   //       formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`
//   //     }
//   //   }
//   // }

// const series = [
//   {
//     name: 'Total Pengajuan',
//     data: [20, 30, 25, 40, 35, 45, 35, 50, 55, 60, 40, 30]
//   },
//   {
//     name: 'Total Diterima',
//     data: [15, 25, 20, 35, 30, 40, 30, 45, 50, 55, 35, 25]
//   },
//   {
//     name: 'Total Ditolak',
//     data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
//   }
// ]

// const options = {
//   chart: {
//     type: 'bar',
//     height: 350,
//     stacked: true,
//     toolbar: {
//       show: false
//     },
//     zoom: {
//       enabled: true
//     }
//   },
//   responsive: [
//     {
//       breakpoint: 480,
//       options: {
//         legend: {
//           position: 'bottom',
//           offsetX: -10,
//           offsetY: 0
//         }
//       }
//     }
//   ],
//   plotOptions: {
//     bar: {
//       horizontal: false,
//       borderRadius: 10,
//       borderRadiusApplication: 'end', // 'around', 'end'
//       borderRadiusWhenStacked: 'last', // 'all', 'last'
//       dataLabels: {
//         total: {
//           enabled: true,
//           style: {
//             fontSize: '13px',
//             fontWeight: 900
//           }
//         }
//       }
//     }
//   },
//   xaxis: {
//     type: 'datetime',
//     categories: [
//       '01/01/2011 GMT',
//       '02/02/2011 GMT',
//       '03/03/2011 GMT',
//       '04/04/2011 GMT',
//       '05/05/2011 GMT',
//       '06/06/2011 GMT'
//     ]
//   },
//   legend: {
//     position: 'right',
//     offsetY: 40
//   },
//   fill: {
//     opacity: 1
//   }
// }

//   const handleChangeTahun = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTahun(e.target.value)
//   }

//   return (
//     <Card>
//       <CardHeader
//         item
//         xs={12}
//         sm={6}
//         title='Grafik Pengajuan'
//         titleTypographyProps={{
//           sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
//         }}
//         action={
//           <TextField
//             label='Tahun'
//             variant='outlined'
//             type='number'
//             size='small'
//             value={tahun}
//             onChange={handleChangeTahun}
//           />
//         }
//       />
//       <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
//         <div id='chart'>
//           <ReactApexChart options={options} series={series} type='bar' height={350} />
//         </div>
//         <div id='html-dist'></div>
//       </CardContent>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label='sticky table'>
//           <TableHead>
//             <TableRow>
//               {columns.map(column => (
//                 <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
//               return (
//                 <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
//                   {columns.map(column => {
//                     const value = row[column.id]

//                     return (
//                       <TableCell key={column.id} align={column.align}>
//                         {column.format && typeof value === 'number' ? column.format(value) : value}
//                       </TableCell>
//                     )
//                   })}
//                 </TableRow>
//               )
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Card>
//   )
// }

// export default Tahun
