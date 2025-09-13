import Image from 'next/image'
import React from 'react'
import logo from '../../public/just-logo.png'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image src={logo} alt="logo" width={200} height={200} />
        <p className="text-2xl font-bold text-center">Jashore University of Science and Technology</p>
        <p className="text-lg font-bold text-center">JUST Family Contact Number & Details</p>
          <Link href="/departments" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Click Here to See Contact List
          </Link>
      </div>
    </div>
  )
}

export default Home