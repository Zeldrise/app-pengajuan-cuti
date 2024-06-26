import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import AppURL from '../../api/AppURL'
import { useTranslation } from 'next-i18next'

const KaryawanCuti = () => {
    const { t } = useTranslation('common')
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${AppURL.Submissions}/karyawan-cuti`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          const data = await response.json()
          setTotalCount(data.count)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    }, []) 
    
  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: '#008bb3' }}>
      <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant='h5'
            sx={{
              display: 'flex',
              fontWeight: 'bold',
              marginBottom: 2.75,
              alignItems: 'center',
              color: 'common.white'
            }}
          >
            {t('employeeLeaveToday.title')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h2' sx={{ color: 'common.white' }}>
              {totalCount}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default KaryawanCuti
