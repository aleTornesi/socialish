import Head from 'next/head'
import Header from '../components/header'
import HomePageMainContent from '../components/homePageMainContent'
import Sidebar from '../components/sidebar'
import styles from '../styles/Home.module.css'
import {useAuthState} from 'react-firebase-hooks/auth' 
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {auth} from '../firebaseConfig'
import { Auth, getAuth, onAuthStateChanged, User } from 'firebase/auth'

export default () => {
  //const [user] = useAuthState(firebase.auth() as any)
  const router = useRouter()
  let user: User | null = null;

  useEffect(() => {
    onAuthStateChanged(auth, (authenticatedUser: User | null) => {
      console.log(user)
			if (authenticatedUser) {
        user = authenticatedUser;
			} else {
          router.push('/login')
          return;
			}
		});
    //firebase.firestore().collection('Users').where('uid', '==', user?.uid)
  }, [])
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="">
        {/*<Sidebar />*/}
        <HomePageMainContent/>
      </main>
    </div>
  )
}
