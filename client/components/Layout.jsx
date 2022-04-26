import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import AdditionalDetails from "./AdditionalDetails";


const Layout = ({children}) => {
    const [isNew,setIsNew] = useState(true);
    const router = useRouter();
    const [path,setPath] = useState(router.pathname);
    useEffect(()=>{
        setPath(router.pathname)
        console.log(path)
    }, [router.pathname])
    const user = useSelector((state)=>state.user.data);
    useEffect(()=>{
        console.log(user)
    }, [user]);
    if (isNew) return <AdditionalDetails>Hio</AdditionalDetails>
    return <>
    {(path!=='/'&&router.pathname!=='/appointments/[id]')&&<Sidebar></Sidebar>}
    <div className={(path!=='/'&&router.pathname!=='/appointments/[id]')?'sm:pl-28 md:pl-36 lg:pl-44 lg:pr-28':''}>
        {(router.pathname!=='/'&&router.pathname!=='/appointments/[id]')&&<Header></Header>}
        {children}
    </div>
    </>;
}

export default Layout