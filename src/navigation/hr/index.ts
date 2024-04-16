// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/hr'
    },
    {
      title: 'Ajukan Cuti',
      icon: AccountPlusOutline,
      path: '/hr/ajukan-cuti'
      // openInNewTab: true
    },
    {
      sectionTitle: 'Manajemen Cuti'
    },
    {
      title: 'Approval Cuti',
      icon: Login,
      path: '/hr/approval-cuti'
      // openInNewTab: true
    },
    {
      title: 'Data Karyawan',
      icon: AccountPlusOutline,
      path: '/hr/data-karyawan'
      // openInNewTab: true
    },

    {
      sectionTitle: 'Laporan Cuti'
    },
    {
      title: 'Cuti Karyawan',
      icon: FormatLetterCase,
      path: '/hr/cuti-karyawan'
    },
    {
      title: 'Cuti Pribadi',
      path: '/hr/cuti-pribadi',
      icon: GoogleCirclesExtended
    },
  ]
}

export default navigation
