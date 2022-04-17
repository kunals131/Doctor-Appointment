import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getDoctorAppointmentsAPI, getDoctorStatsAPI } from '../api/doctor';
import DoctorDashboard from '../components/Dashboard/Doctor';
import PatientDashboard from '../components/Dashboard/Patient';
import { updateUser } from '../redux/actions/user';
import { verifyAuthentication } from '../utils/verifyAuth';

export const getServerSideProps = async(ctx) => {
    const auth = verifyAuthentication(ctx.req);
    if (!auth.state) {
      return {
        redirect : {
          destination : '/'
        }
      }
    }
    return {props : {}}
  
  };
  
const Dashboard = ({error}) => {
//   const dispatch=  useDispatch();
// //   useEffect(()=>{
// //     dispatch(updateUser(user));
// //   }, [])
 
  if (error) {
    return <div>Error Occured</div>
  }
  return (
    <>
    <PatientDashboard/>
    </>
  )
}

export default Dashboard