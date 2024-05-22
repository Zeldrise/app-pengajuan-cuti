import { ReactNode, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import VerticalLayout from 'src/@core/layouts/VerticalLayout'
import VerticalNavItems from 'src/navigation/vertical'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useRouter } from 'next/router'
import { VerticalNavItemsType } from 'src/@core/layouts/types'

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  const { settings, saveSettings } = useSettings()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [verticalNavItems, setVerticalNavItems] = useState<VerticalNavItemsType | null>(null)

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
      } else {
        setIsAuthenticated(true)
        // Fetch vertical navigation items
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
