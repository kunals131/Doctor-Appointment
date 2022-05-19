import '../styles/globals.css'
import Layout from '../components/Layout'
import store from '../redux'
import { Provider } from 'react-redux'
import {useRouter} from 'next/router';
import NProgress from 'nprogress';
import '../public/nprogress.css'
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  const router = useRouter()

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


  return  <>
  <Provider store={store}>
  <Layout>
  <Component {...pageProps} />
  </Layout>
  </Provider>
  </>
}

export default MyApp
