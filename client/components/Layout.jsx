import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";


const Layout = ({children}) => {
    const router = useRouter();
    const [path,setPath] = useState(router.pathname);
    useEffect(()=>{
        setPath(router.pathname)
    }, [router.pathname])
    const user = useSelector((state)=>state.user.data);
    useEffect(()=>{
        console.log(user)
    }, [user]);
    return <>
    {path!=='/'&&<Sidebar></Sidebar>}
    <div className={path!=='/'?'sm:pl-28 md:pl-36 lg:pl-44 lg:pr-28':''}>
        {router.pathname!=='/'&&<Header></Header>}
        {children}
    </div>
    </>;
}

export default Layout