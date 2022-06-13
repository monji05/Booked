import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import List from '../components/List'

const Home: NextPage = () => {

  return (
    <div className='bg-slate-300 pb-20'>
      <Head>
        <title>Booked</title>
        <meta name="description" content="show you searched books ." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <List/>
    </div>
  )
}

export default Home
