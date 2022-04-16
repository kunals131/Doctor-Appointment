import React from 'react'
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
      props: {},
    };
  };
  
const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard