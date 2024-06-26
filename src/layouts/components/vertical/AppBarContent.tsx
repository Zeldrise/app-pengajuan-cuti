// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'

// ** Type Import
import { Settings } from '../../../@core/context/settingsContext'

// ** Components
import ModeToggler from '../../../@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from '../../../@core/layouts/components/shared-components/UserDropdown'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  const router = useRouter()

   const changeLanguage = (locale: string) => {
     router.push(router.pathname, router.asPath, { locale })
   }
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        {/* <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        /> */}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* {hiddenSm ? null : (
          // <Box
          //   component='a'
          //   target='_blank'
          //   rel='noreferrer'
          //   sx={{ mr: 4, display: 'flex' }}
          //   href='https://github.com/themeselection/materio-mui-react-nextjs-admin-template-free'
          // >
          //   <img
          //     height={24}
          //     alt='github stars'
          //     src='https://img.shields.io/github/stars/themeselection/materio-mui-react-nextjs-admin-template-free?style=social'
          //   />
          // </Box>
        )} */}
        {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
        {/* <NotificationDropdown /> */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            variant={router.locale === 'id' ? 'contained' : 'outlined'}
            onClick={() => changeLanguage('id')}
            sx={{ marginRight: '0.5rem' }}
          >
            ID
          </Button>
          <Button variant={router.locale === 'en' ? 'contained' : 'outlined'} onClick={() => changeLanguage('en')}>
            EN
          </Button>
        </Box>
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
