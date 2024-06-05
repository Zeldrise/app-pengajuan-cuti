// ** MUI Imports

import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import React, { useEffect, useState } from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import TextField from '@mui/material/TextField'
import AppURL from '../../api/AppURL'

interface MonthlyLeave {
  month: string
  totalLeaveDays: number
}


const Tahun = () => {
  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const [tahun, setTahun] = useState(new Date().getFullYear().toString())
  const [data, setData] = useState<number[]>([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token') // or obtain it from a context/provider
          const response = await fetch(`${AppURL.Submissions}/history-month?year=${tahun}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })

          if (!response.ok) {
            throw new Error('Network response was not ok')
          }

            const responseData = await response.json()
            const monthlyData = responseData.monthlyLeaveSummary.map((month: MonthlyLeave) => month.totalLeaveDays)
          setData(monthlyData)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    }, [tahun])

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      events: {
        click: function (event, chartContext, config) {
          router.push('/chart')
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
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
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      tickPlacement: 'on',
      labels: { show: true },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`
      }
    }
  }

  const handleChangeTahun = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTahun(e.target.value)
  }

  return (
    <Card>
      <CardHeader
        title='Grafik Pengajuan'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <TextField
            label='Tahun'
            variant='outlined'
            type='number'
            size='small'
            value={tahun}
            onChange={handleChangeTahun}
          />
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={205} options={options} series={[{ name: 'cuti', data: data }]} />
      </CardContent>
    </Card>
  )
}

export default Tahun
