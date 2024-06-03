import { ReactNode, useEffect, useState } from 'react'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import VerticalLayout from '../@core/layouts/VerticalLayout'
import VerticalNavItems from '../navigation/vertical'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import { useSettings } from '../@core/hooks/useSettings'
import { useRouter } from 'next/router'
import { VerticalNavItemsType } from '../@core/layouts/types'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  const { settings, saveSettings } = useSettings()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [verticalNavItems, setVerticalNavItems] = useState<VerticalNavItemsType>([])

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const token = localStorage.getItem('token')
      const menuAccessJson = localStorage.getItem('menuAccess')
      let menuAccess: string[] = []
      
      if (menuAccessJson != null) {
        menuAccess = JSON.parse(menuAccessJson)
      }

      const { route } = router
      if (!token) {
        router.push('/login')
      } else if (menuAccess.indexOf(route) < 0) {
        router.push('/403')
      } else {
        setIsAuthenticated(true)
        try {
          const items = await VerticalNavItems()
          setVerticalNavItems(items)
        } catch (error) {
          console.error('Failed to fetch vertical navigation items:', error)
        }
      }
    }
    fetchAuthStatus()
  }, [router])

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  return (
    <>
      {isAuthenticated && (
        <VerticalLayout
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          verticalNavItems={verticalNavItems}
          verticalAppBarContent={props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )}
        >
          {children}
        </VerticalLayout>
      )}
    </>
  )
}

export default UserLayout
