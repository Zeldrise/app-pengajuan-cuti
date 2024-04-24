// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Link from 'next/link'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <h1>Selamat Datang di Sistem Pengajuan Cuti</h1>
        <p>Silakan masuk untuk mengakses fitur pengajuan cuti.</p>
        <Link href='/pages/login' passHref>
          <Button variant='contained' color='primary'>
            Masuk
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12} sm={6}>

      </Grid>
    </Grid>
  )
}

export default Dashboard
