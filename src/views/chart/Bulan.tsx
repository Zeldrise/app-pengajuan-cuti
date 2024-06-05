// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import React, { useEffect, useState } from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import AppURL from '../../api/AppURL'

interface EmployeeData {
  userId: number
  name: string
  totalLeaveDays: number
}

const Bulan = () => {
  // ** Hook
  const theme = useTheme()

   const [tahun, setTahun] = useState(new Date().getFullYear().toString())
   const [bulan, setBulan] = useState(new Date().getMonth() + 1)
   const [employees, setEmployees] = useState<EmployeeData[]>([])

     useEffect(() => {
       const fetchData = async () => {
         try {
           const token = localStorage.getItem('token') // or obtain it from a context/provider
           const response = await fetch(`${AppURL.Submissions}/history-user?month=${bulan}&year=${tahun}`,
             {
               headers: {
                 Authorization: `Bearer ${token}`,
                 'Content-Type': 'application/json'
               }
             }
           )

           if (!response.ok) {
             throw new Error('Network response was not ok')
           }

           const data: EmployeeData[] = await response.json()

           const filteredData = data.filter(employee => ![1, 2].includes(employee.userId))

           filteredData.sort((a, b) => b.totalLeaveDays - a.totalLeaveDays)

           setEmployees(filteredData)
         } catch (error) {
           console.error('Error fetching data:', error)
         }
       }

       fetchData()
     }, [bulan, tahun])


  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 9,
        distributed: true,
        barHeight: '80%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: 0,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: Array(employees.length).fill(theme.palette.primary.main),
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: employees.map(employee => employee.name),
      tickPlacement: 'on',
      labels: {
        show: true,
        style: {
          fontSize: '14px'
        }
      },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      labels: {
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`,
        style: {
          fontSize: '14px'
        }
      }
    }
  }

   const data = employees.map(employee => employee.totalLeaveDays)

    const handleChangeTahun = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTahun(e.target.value)
    }


    const handleChangeBulan = (e: React.ChangeEvent<HTMLInputElement>) => {
      setBulan(parseInt(e.target.value))
    }

  return (
    <Card>
      <CardHeader
        title='Grafik Pengajuan'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <TextField
              label="Tahun"
              variant="outlined"
              type="number"
              size="small"
              value={tahun}
              onChange={handleChangeTahun}
            />
            <TextField
              select
              label="Bulan"
              variant="outlined"
              size="small"
              value={bulan}
              onChange={handleChangeBulan}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('id-ID', { month: 'long' })}</MenuItem>
              ))}
            </TextField>
          </Box>
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={1200} options={options} series={[{ name: 'cuti', data }]} />
      </CardContent>
    </Card>
  )
}

export default Bulan
