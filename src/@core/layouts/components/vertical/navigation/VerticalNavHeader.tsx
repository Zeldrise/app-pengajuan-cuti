// ** React Import
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Type Import
import { Settings } from '../../../../context/settingsContext'

// ** Configs
import themeConfig from '../../../../../configs/themeConfig'


interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
  verticalNavMenuBranding?: (props?: any) => ReactNode
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight,
}))


const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props



  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/home' passHref>
          <StyledLink>
            <img
              src='/images/deptech_blue.png'
              alt='Deptech'
              style={{ maxWidth: '100%', height: 'auto'}} // Adjusted image size and margin
            />
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
