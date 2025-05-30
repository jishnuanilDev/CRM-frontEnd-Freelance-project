import { Helmet } from 'react-helmet-async'
import ProtectedLayout from '../utils/protectedRoute'
import { CONFIG } from '../config-global'
import { FinishedGoodsView } from '../sections/finishedGoods/view/finishedGoods-view'
// ----------------------------------------------------------------------

export default function Page () {
  return (
    <>
      <Helmet>
        <title> {`Finished Goods - ${CONFIG.appName}`}</title>
      </Helmet>
      <ProtectedLayout>
        <FinishedGoodsView />
      </ProtectedLayout>
    </>
  )
}
