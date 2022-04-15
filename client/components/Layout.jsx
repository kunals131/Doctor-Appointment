import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';


const Layout = ({children}) => {
    const router = useRouter();
    const [path,setPath] = useState(router.pathname);
    useEffect(()=>{
        setPath(router.pathname)
    }, [router.pathname])
    return <>
    {path!=='/'&&<Sidebar></Sidebar>}
    <div className={path!=='/'?'sm:pl-28 md:pl-36 lg:pl-44 lg:pr-28':''}>
        {router.pathname!=='/'&&<Header></Header>}
        {children}
    </div>
    </>;
}

export default Layout