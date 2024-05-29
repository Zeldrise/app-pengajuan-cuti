import FileDocumentEditOutline from 'mdi-material-ui/FileDocumentEditOutline'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import TableAccount from 'mdi-material-ui/TableAccount'
import TextAccount from 'mdi-material-ui/TextAccount'
import Balloon from 'mdi-material-ui/Balloon'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import AppURL from 'src/api/AppURL'

const fetchUserProfile = async () => {
  try {
    const response = await fetch(AppURL.Profile, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch user profile')
    }

    return await response.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

const buildNavigationMenu = async (): Promise<VerticalNavItemsType> => {
  const userProfile = await fetchUserProfile()
  if (!userProfile || !userProfile.role) {
    return []
  }

  const { role } = userProfile
  let menu: VerticalNavItemsType = []
  let menuAccess: string[] = []
  console.log('role', role)
  if (role == 'hr') {
    menuAccess = [
      '/home',
      '/ajukan-cuti',
      '/approval-cuti',
      '/data-karyawan',
      '/cuti-karyawan',
      '/cuti-pribadi',
      '/user-profile',
      '/account-settings'
    ]
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
  } else if (role == 'staff') {
    menuAccess = [
      '/home',
      '/ajukan-cuti',
      '/data-karyawan',
      '/cuti-karyawan',
      '/cuti-pribadi',
      '/user-profile',
      '/account-settings'
    ]
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
  } else if (role == 'karyawan') {
    menuAccess = ['/home', '/ajukan-cuti', '/cuti-pribadi', '/user-profile', '/account-settings']
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
  } else if (role == 'owner') {
    menuAccess = ['/home', '/approval-cuti', '/data-karyawan', '/cuti-karyawan', '/user-profile', '/account-settings']
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

  localStorage.setItem('menuAccess', JSON.stringify(menuAccess))

  return menu
}

const navigation = async (): Promise<VerticalNavItemsType> => {
  return await buildNavigationMenu()
}

export default navigation
