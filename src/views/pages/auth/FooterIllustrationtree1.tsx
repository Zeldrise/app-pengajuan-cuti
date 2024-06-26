// ** React Imports
import { Fragment, ReactNode } from 'react'

// ** MUI Components
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

interface FooterIllustrationsProp {
  image1?: ReactNode
  image2?: ReactNode
}

// Styled Components
const MaskImg = styled('img')(() => ({
  bottom: 0,
  zIndex: -1,
  width: '100%',
  position: 'absolute'
}))

const Tree2Img = styled('img')(() => ({
  right: 0,
  bottom: 0,
  position: 'absolute'
}))

const FooterIllustrationsV1 = (props: FooterIllustrationsProp) => {
  // ** Props
  const { image2 } = props

  // ** Hook
  const theme = useTheme()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  if (!hidden) {
    return (
      <Fragment>
        <MaskImg alt='mask' src={`/images/pages/auth-v1-mask-${theme.palette.mode}.png`} />
        {image2 || <Tree2Img alt='tree-2' src='/images/pages/auth-v1-tree-2.png' />}
      </Fragment>
    )
  } else {
    return null
  }
}

export default FooterIllustrationsV1
