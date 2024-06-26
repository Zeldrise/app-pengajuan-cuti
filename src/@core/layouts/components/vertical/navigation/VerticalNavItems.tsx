// ** Types Import
import { Settings } from '../../../../context/settingsContext'
import { NavLink, NavSectionTitle, VerticalNavItemsType } from '../../../types'

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

const VerticalNavItems = ({ verticalNavItems }: Props): JSX.Element => {
  const RenderMenuItems = verticalNavItems?.map((item: NavLink | NavSectionTitle, index: number) => {
    const TagName: any = resolveNavItemComponent(item)

    return <TagName key={index} item={item} />
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
