'use client'
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import Head from 'next/head'
import Image from 'next/image';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>Alinbox Social Inbox</title>
        <meta name="description" content="Manage all your social media messages in one place." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Footer />
    </div>
  )
}

export default Home;
