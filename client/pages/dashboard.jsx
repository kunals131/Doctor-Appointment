import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/actions/user';
import { verifyAuthentication } from '../utils/verifyAuth';

export const getServerSideProps = (ctx) => {
    const auth = verifyAuthentication(ctx.req);
    if (!auth.state) {
      return {
        redirect : {
          destination : '/'
        }
      }
    }
    return {
      props: {user : auth.decodedData},
    };
  };
  
const Dashboard = ({user}) => {
  const dispatch=  useDispatch();
  useEffect(()=>{
    dispatch(updateUser(user));
  }, [])
  console.log(user)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard