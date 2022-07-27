import type { NextPage } from 'next'

import Trade from '../components/Trade'
import PageContainer from '../components/utilities/PageContainer'

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Trade />
    </PageContainer>
  )
}

export default Home
