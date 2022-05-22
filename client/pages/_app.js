import '../styles/globals.css'
import Layout from '../components/Layout'
import store from '../redux'
import { Provider } from 'react-redux'
import {useRouter} from 'next/router';
import NProgress from 'nprogress';
import '../public/nprogress.css'
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  useEffect(()=>{
    if (darkMode) {
      if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
      }
    }
    else {
      if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode])

  return  <>
  <Provider store={store}>
  <Layout setDarkMode={setDarkMode} darkMode={darkMode}>
  <Component {...pageProps} darkMode={darkMode} setDarkMode={setDarkMode} />
  </Layout>
  </Provider>
  </>
}

export default MyApp
