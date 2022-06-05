import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import List from '../components/List'

const Home: NextPage = () => {

    return (
    <div className='mx-96'>
      <Head>
        <title>Booked</title>
        <meta name="description" content="write impression readed books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <List />
    </div>
  )
}

export default Home
