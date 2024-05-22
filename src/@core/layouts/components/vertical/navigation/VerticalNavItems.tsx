// ** Types Import
import { Settings } from 'src/@core/context/settingsContext'
import { ReactNode } from 'react'
import { NavLink, NavSectionTitle, VerticalNavItemsType } from 'src/@core/layouts/types'

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

interface Props {
  settings: Settings
  navVisible?: boolean
  groupActive: string[]
  currentActiveGroup: string[]
  verticalNavItems?: VerticalNavItemsType
  saveSettings: (values: Settings) => void
  setGroupActive: (value: string[]) => void
  setCurrentActiveGroup: (item: string[]) => void
}

const resolveNavItemComponent = (item: NavLink | NavSectionTitle): any => {
  if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle
  return VerticalNavLink
}

const VerticalNavItems = ({ verticalNavItems }: Props): ReactNode => {
  const RenderMenuItems = verticalNavItems?.map((item: NavLink | NavSectionTitle, index: number) => {
    const TagName: any = resolveNavItemComponent(item)

    return <TagName key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
