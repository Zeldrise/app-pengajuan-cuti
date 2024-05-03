// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { AccountGroup, Balloon, FileDocumentEditOutline, TableAccount, TextAccount } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const position = 'hr'
var menu: VerticalNavItemsType = []
if (position == 'hr') {
  menu = [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/home'
    },
    {
      title: 'Ajukan Cuti',
      icon: Balloon,
      path: '/ajukan-cuti'
    },
    {
      sectionTitle: 'Manajemen Cuti'
    },
    {
      title: 'Approval Cuti',
      icon: FileDocumentEditOutline,
      path: '/approval-cuti'
    },
    {
      title: 'Data Karyawan',
      icon: AccountGroup,
      path: '/data-karyawan'
    },

    {
      sectionTitle: 'Laporan Cuti'
    },
    {
      title: 'Cuti Karyawan',
      icon: TableAccount,
      path: '/cuti-karyawan'
    },
    {
      title: 'Cuti Pribadi',
      path: '/cuti-pribadi',
      icon: TextAccount
    }
  ]
} else if (position == 'staff') {
  menu = [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/home'
    },
    {
      title: 'Ajukan Cuti',
      icon: Balloon,
      path: '/ajukan-cuti'
    },
    {
      sectionTitle: 'Manajemen Cuti'
    },
    {
      title: 'Data Karyawan',
      icon: AccountGroup,
      path: '/data-karyawan'
    },

    {
      sectionTitle: 'Laporan Cuti'
    },
    {
      title: 'Cuti Karyawan',
      icon: TableAccount,
      path: '/cuti-karyawan'
    },
    {
      title: 'Cuti Pribadi',
      path: '/cuti-pribadi',
      icon: TextAccount
    }
  ]
} else if (position == 'karyawan') {
  menu = [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/home'
    },
    {
      title: 'Ajukan Cuti',
      icon: Balloon,
      path: '/ajukan-cuti'
    },
    {
      title: 'Laporan Cuti',
      path: '/cuti-pribadi',
      icon: TextAccount
    }
  ]
} else if (position == 'owner') {
  menu = [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/home'
    },
    {
      sectionTitle: 'Manajemen Cuti'
    },
    {
      title: 'Approval Cuti',
      icon: FileDocumentEditOutline,
      path: '/approval-cuti'
    },
    {
      title: 'Data Karyawan',
      icon: AccountGroup,
      path: '/data-karyawan'
    },

    {
      sectionTitle: 'Laporan Cuti'
    },
    {
      title: 'Cuti Karyawan',
      icon: TableAccount,
      path: '/cuti-karyawan'
    }
  ]
}


const navigation = (): VerticalNavItemsType => {
   const router = useRouter()
   useEffect(() => {
     const token = localStorage.getItem('token')
     if (!token) {
       router.push('/login')
     }
   }, [router])
  return menu;
}

export default navigation
