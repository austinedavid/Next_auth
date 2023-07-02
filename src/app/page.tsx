import HomeS from '@/componets/Home'
import Image from 'next/image'
import getSessions from '@/componets/Sessions'
import Logout from '@/componets/Logout'


export default async function Home() {
  const session = await getSessions();
  return (
    <main>
      <p>hello my people</p>
      {
        session? <Logout/>: <HomeS/>
      }
    </main>
  )
}
