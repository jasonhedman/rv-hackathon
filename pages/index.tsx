import type { NextPage } from 'next'

import Trade from '../components/Trade'
import PageContainer from '../components/utilities/PageContainer'

const Home: NextPage = () => {

  const contractAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;

  if(!contractAddress) {
    return <div>No contract address</div>
  }

  return (
    <PageContainer>
      <Trade 
        contractAddress={contractAddress}
      />
    </PageContainer>
  )
}

export default Home
