import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'

const inter = Inter({
  weight: ['100','200','300','400',"500","600",'700',"800","900"],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gamsole',
  description: 'Play and enjoy thrilling games',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className={inter.className}>
          {children}
        </div>
        
      </body>
    </html>
  )
}
