// ** MUI Imports
import Grid from '@mui/material/Grid'

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
    <main className='flex min-h-screen flex-col items-center pt-20'>
      <div className='fixed w-full top-0 border-b-4 border-white'>
        <div className='bg-dep p-4'>
          <div className='items-center'></div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row-reverse justify-around  mx-auto w-full md:w-11/12'>
        <div className='my-0 md:my-5 justify-center items-center md:w-[500px] w-full'>
          <div></div>
          <Link href='/pages/login'>LOGIN</Link>

          <div className='flex flex-row gap-5 font-bold text-sm'>
            <Link href='/karyawan'>Karyawan</Link>
            <Link href='/staff'>Staff</Link>
            <Link href='/hr'>HR</Link>
            <Link href='/owner'>Owner</Link>
          </div>
        </div>
        {/* <div className='flex items-center justify-end '>
          <Image src='/first.svg' width={500} height={500} className='hidden md:block' alt='first dekstop photo' />
          <Image
            src='/first-m.svg'
            width={400}
            height={400}
            className='block md:hidden mx-auto my-5'
            alt='first dekstop photo'
          />
        </div> */}
      </div>
    </main>
  )
}

export default Dashboard
