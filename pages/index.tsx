import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Trade from '../components/Trade'
import PageContainer from '../components/utilities/PageContainer'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Trade />
    </PageContainer>
  )
}

export default Home
