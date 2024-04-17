// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { AccountGroup, Balloon, FileDocumentEditOutline, TableAccount, TextAccount } from 'mdi-material-ui'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/hr'
    },
    {
      title: 'Ajukan Cuti',
      icon: Balloon,
      path: '/hr/ajukan-cuti'
      // openInNewTab: true
    },
    {
      sectionTitle: 'Manajemen Cuti'
    },
    {
      title: 'Approval Cuti',
      icon: FileDocumentEditOutline,
      path: '/hr/approval-cuti'
      // openInNewTab: true
    },
    {
      title: 'Data Karyawan',
      icon: AccountGroup,
      path: '/hr/data-karyawan'
      // openInNewTab: true
    },

    {
      sectionTitle: 'Laporan Cuti'
    },
    {
      title: 'Cuti Karyawan',
      icon: TableAccount,
      path: '/hr/cuti-karyawan'
    },
    {
      title: 'Cuti Pribadi',
      path: '/hr/cuti-pribadi',
      icon: TextAccount
    },
  ]
}

export default navigation
