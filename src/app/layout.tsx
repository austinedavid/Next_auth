import './globals.css'
import { Inter } from 'next/font/google'
import Authwrapper from '@/utils/Authwrapper'
import Nav from '@/componets/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Authwrapper>
          <main>
            <Nav/>
           {children}
        </main>
        </Authwrapper>
      </body>
    </html>
  )
}
