// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { AccountGroup, Balloon, FileDocumentEditOutline, TableAccount, TextAccount } from 'mdi-material-ui'
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
    // Handle error accordingly
    return null
  }
}


const buildNavigationMenu = async (): Promise<VerticalNavItemsType> => {
  const userProfile = await fetchUserProfile()
  if (!userProfile || !userProfile.role) {
    // Handle missing user profile or role
    return []
  }

  const { role } = userProfile
  let menu: VerticalNavItemsType = []
  if (role == 'hr') {
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

  return menu
}

const navigation = async (): Promise<VerticalNavItemsType> => {
  return await buildNavigationMenu()
}

export default navigation
