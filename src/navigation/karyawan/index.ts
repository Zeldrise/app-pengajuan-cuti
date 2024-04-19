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
      title: 'Home karyawan',
      icon: HomeOutline,
      path: '/karyawan'
    },
    {
      title: 'Ajukan Cuti',
      icon: Balloon,
      path: '/karyawan/ajukan-cuti'
      // openInNewTab: true
    },
    // {
    //   sectionTitle: 'Manajemen Cuti'
    // },
    // // {
    // //   title: 'Approval Cuti',
    // //   icon: FileDocumentEditOutline,
    // //   path: '/karyawan/approval-cuti'
    // //   // openInNewTab: true
    // // },
    // {
    //   title: 'Data Karyawan',
    //   icon: AccountGroup,
    //   path: '/karyawan/data-karyawan'
    //   // openInNewTab: true
    // },

    // {
    //   sectionTitle: 'Laporan Cuti'
    // },
    // {
    //   title: 'Cuti Karyawan',
    //   icon: TableAccount,
    //   path: '/karyawan/cuti-karyawan'
    // },
    {
      title: 'Laporan Cuti',
      path: '/karyawan/cuti-pribadi',
      icon: TextAccount
    }
  ]
}

export default navigation
