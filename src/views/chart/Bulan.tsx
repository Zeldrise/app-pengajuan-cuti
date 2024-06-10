// // ** MUI Imports
// import Card from '@mui/material/Card'
// import { useTheme } from '@mui/material/styles'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import TextField from '@mui/material/TextField'
// import MenuItem from '@mui/material/MenuItem'
// import Box from '@mui/material/Box'

// // ** Third Party Imports
// import { ApexOptions } from 'apexcharts'

// // ** Custom Components Imports
// import React, { useEffect, useState } from 'react'
// import ReactApexcharts from 'src/@core/components/react-apexcharts'
// import AppURL from '../../api/AppURL'
// import router from 'next/router'

// interface EmployeeData {
//   userId: number
//   name: string
//   totalLeaveDays: number
// }

// const Bulan = () => {
//   // ** Hook
//   const theme = useTheme()

//   const [tahun, setTahun] = useState(new Date().getFullYear().toString())
//   const [dataPointIndex] = useState(localStorage.getItem('dataPointIndex') ?? '')
//   const [bulan, setBulan] = useState(dataPointIndex ? parseInt(dataPointIndex) + 1 : new Date().getMonth() + 1)
//   // const [employees, setEmployees] = useState<EmployeeData[]>([])
//   const [data, setData] = useState<{ name: string; data: number[] }[]>([])

//   const removeDataPointIndexFromLocalStorage = () => {
//     localStorage.removeItem('dataPointIndex')
//   }

//   useEffect(() => {
//     const handleRouteChange = () => {
//       removeDataPointIndexFromLocalStorage()
//     }

//     router.events.on('routeChangeStart', handleRouteChange)

//     return () => {
//       router.events.off('routeChangeStart', handleRouteChange)
//     }
//   }, [])

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const token = localStorage.getItem('token')
//   //       const response = await fetch(`${AppURL.Submissions}/history-user?month=${bulan}&year=${tahun}`, {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           'Content-Type': 'application/json'
//   //         }
//   //       })

//   //       if (!response.ok) {
//   //         throw new Error('Network response was not ok')
//   //       }

//   //       const data: EmployeeData[] = await response.json()

//   //       const filteredData = data.filter(employee => ![1, 2].includes(employee.userId))

//   //       filteredData.sort((a, b) => b.totalLeaveDays - a.totalLeaveDays)

//   //       setEmployees(filteredData)
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error)
//   //     }
//   //   }

//   //   fetchData()
//   // }, [bulan, tahun])
//    useEffect(() => {
//      // Example data for demonstration
//      const exampleData = [
//        { name: 'Total Pengajuan', data: [20, 30, 25, 40, 35, 45, 35, 50, 55, 60, 40, 30] },
//        { name: 'Total Diterima', data: [15, 25, 20, 35, 30, 40, 30, 45, 50, 55, 35, 25] },
//        { name: 'Total Ditolak', data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5] }
//      ]
//      const sortedData = exampleData.map(series => ({
//        ...series,
//        data: series.data.sort((a, b) => b - a)
//      }))

//      setData(sortedData)
//    }, [])
//   //  const employees = Array.from({ length: 40 }, (_, i) => ({
//   //    name: `Karyawan ${String.fromCharCode(65 + i)}`,
//   //  }))

  

//   const options: ApexOptions = {
//     chart: {
//       parentHeightOffset: 0,
//       stacked: true,
//       toolbar: { show: false }
//     },
//     plotOptions: {
//       bar: {
//         horizontal: true,
//         borderRadius: 9,
//         distributed: true,
//         barHeight: '80%',
//         endingShape: 'rounded',
//         startingShape: 'rounded'
//       }
//     },
//     stroke: {
//       width: 2,
//       colors: [theme.palette.background.paper]
//     },
//     legend: { show: false },
//     grid: {
//       strokeDashArray: 7,
//       padding: {
//         top: -1,
//         right: 0,
//         left: 0,
//         bottom: 5
//       }
//     },
//     dataLabels: { enabled: false },
//     colors: [
//       theme.palette.primary.main,
//       theme.palette.primary.main,
//       theme.palette.primary.main,
//       theme.palette.primary.main,
//       theme.palette.primary.main,
//       theme.palette.primary.main,
//       theme.palette.primary.main,
//       theme.palette.primary.main,
//       theme.palette.primary.main,
//       theme.palette.primary.main,
//       theme.palette.primary.main,
//       theme.palette.primary.main
//     ],
//     states: {
//       hover: {
//         filter: { type: 'none' }
//       },
//       active: {
//         filter: { type: 'none' }
//       }
//     },
//     xaxis: {
//       categories: ['Karyawan A', 'Karyawan B', 'Karyawan C', 'Karyawan D', 'Karyawan E', 'Karyawan F', 'Karyawan G', 'Karyawan H', 'Karyawan I', 'Karyawan J', 'Karyawan K', 'Karyawan L'],
//       tickPlacement: 'on',
//       labels: {
//         show: true,
//         style: {
//           fontSize: '14px'
//         }
//       },
//       axisTicks: { show: false },
//       axisBorder: { show: false }
//     },
//     yaxis: {
//       show: true,
//       labels: {
//         formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`,
//         style: {
//           fontSize: '14px'
//         }
//       }
//     }
//   }

//   // const data = employees.map(employee => employee.totalLeaveDays)

//   const handleChangeTahun = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTahun(e.target.value)
//   }

//   const handleChangeBulan = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBulan(parseInt(e.target.value))
//     localStorage.setItem('dataPointIndex', '')
//   }

//   return (
//     <Card>
//       <CardHeader
//         title='Grafik Pengajuan'
//         titleTypographyProps={{
//           sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
//         }}
//         action={
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '10px',
//               '@media (min-width:600px)': {
//                 flexDirection: 'row',
//                 alignItems: 'center'
//               }
//             }}
//           >
//             <TextField
//               label='Tahun'
//               variant='outlined'
//               type='number'
//               size='small'
//               value={tahun}
//               onChange={handleChangeTahun}
//             />
//             <TextField select label='Bulan' variant='outlined' size='small' value={bulan} onChange={handleChangeBulan}>
//               {Array.from({ length: 12 }, (_, i) => (
//                 <MenuItem key={i + 1} value={i + 1}>
//                   {new Date(0, i).toLocaleString('id-ID', { month: 'long' })}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Box>
//         }
//       />
//       <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
//         <ReactApexcharts
//           type='bar'
//           height={500}
//           options={options}
//           series={data}
//         />
//       </CardContent>
//     </Card>
//   )
// }

// export default Bulan
