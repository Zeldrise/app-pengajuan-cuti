import Grid from '@mui/material/Grid'
import KaryawanCuti from '../../views/card/KaryawanCuti'
import PermintaanCuti from '../../views/card/PermintaanCuti'
import Ditolak from '../../views/card/Ditolak'
import Diterima from '../../views/card/Diterima'
import UserLayout from '../../layouts/UserLayout'
import Tahun from '../../views/chart/Tahun'
import React, { useEffect, useState } from 'react'
import AppURL from '../../api/AppURL'


const Index = () => {
   const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(AppURL.Profile, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (!response.ok) {
          throw new Error('Gagal mengambil data user')
        }
        const userData = await response.json()
        setUserData(userData)
      } catch (error) {
        console.error('Terjadi kesalahan:', error)
      }
    }
    fetchUserData()
  }, [])

  const position = userData ? userData.role : '...'
  let dashboard: JSX.Element[] = []
  if (position == 'hr') {
    dashboard = [
      <Grid container spacing={3} key='dashboard'>
        <Grid item xs={12} sm={6}>
          <KaryawanCuti />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PermintaanCuti />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Diterima />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Ditolak />
        </Grid>
        <Grid item xs={12}>
          <Tahun />
        </Grid>
      </Grid>
    ]
  } else if (position == 'staff') {
    dashboard = [
      <Grid container spacing={3} key='dashboard'>
        <Grid item xs={12} sm={6}>
          <Diterima />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Ditolak />
        </Grid>
        <Grid item xs={12}>
          <KaryawanCuti />
        </Grid>
      </Grid>
    ]
  } else if (position == 'karyawan') {
    dashboard = [
      <Grid container spacing={3} key='dashboard'>
        <Grid item xs={12} sm={6}>
          <Diterima />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Ditolak />
        </Grid>
      </Grid>
    ]
  } else if (position == 'owner') {
    dashboard = [
      <Grid container spacing={3} key='dashboard'>
        <Grid item xs={12} sm={6}>
          <KaryawanCuti />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PermintaanCuti />
        </Grid>
        <Grid item xs={12}>
          <Tahun />
        </Grid>
      </Grid>
    ]
  }

  return dashboard
}
Index.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>

export default Index
