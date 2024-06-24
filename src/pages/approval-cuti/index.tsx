import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Approval from '../../views/table/approval'
import UserLayout from '../../layouts/UserLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Index = () => {
   const { t } = useTranslation('common')

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={t('table.approve')} titleTypographyProps={{ variant: 'h6' }} />
          <Approval />
        </Card>
      </Grid>
    </Grid>
  )
}
Index.getLayout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
})
export default Index
