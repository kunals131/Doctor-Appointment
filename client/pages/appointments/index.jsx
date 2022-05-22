import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import {
  MdTune,
  MdArrowForwardIos,
  MdPending,
  MdOutlineCancel,
  MdOutlinePending,
} from "react-icons/md";
import Link from 'next/link'
import { verifyAuthentication } from "../../utils/verifyAuth";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/user";
import { getDoctorAppointmentsAPI } from "../../api/doctor";
import { FaUserAlt } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";
import { updateAppointmentAPI } from "../../api/doctor";
import { getAllAppointments } from "../../api/patient";
import { useRouter } from "next/router";
import { getAllUserDetailsAPI } from "../../api/common";

const returnGridStyle = (status) => {
  if (status === "pending") return "grid-cols-[1.2fr_1.2fr_1fr_1.7fr]";
  if (status === "active") return "grid-cols-[1.7fr_1.2fr_1.2fr_1fr_1fr]";
  if (status === "rejected") return "grid-cols-[1.7fr_1fr_1fr]";
  if (status === "closed") return "grid-cols-[1.2fr_1.2fr_1fr_1fr]";
};

export const getServerSideProps = async (ctx) => {
  const auth = verifyAuthentication(ctx.req);
  if (!auth.state) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const userData = await getAllUserDetailsAPI(auth.decodedData.uuid);
  auth.decodedData = userData.data;
  if (auth.decodedData.isNew) return {redirect : {destination : '/new'}}
  try {
    let appointments = null;
    if (auth.decodedData.role==='doctor') {
    appointments = await getDoctorAppointmentsAPI(
      auth.decodedData.dataId
    );
    }else {
      appointments = await getAllAppointments(auth.decodedData.dataId);
    }
    return {
      props: { user: auth.decodedData, fetchedAppointments: appointments.data },
    };
  } catch (err) {
    console.log(err.response.data);
    return { props: { user: auth.decodedData, error: err.response.data } };
  }
};

const AppointmentCard = ({ appointment, role }) => {
  const colors = {
    active: "bg-green-400",
    closed: "bg-gray-500 dark:bg-darkElevation-700",
    pending: "bg-gray-500",
    rejected: "bg-red-300",
  };
  const router = useRouter();
  const { patient, doctor, createdAt } = appointment;
  const { state: status } = appointment;

  const [title, setTitle] = useState(appointment.title);
  const handleOnChange = (e) => {
    if (title.length > 30) return;
    setTitle(e.target.value);
  };
  const handleBlur = async() => {
    if (title.length > 0) {
      console.log(title);
      const res=  await updateAppointmentAPI(appointment.id,{title})
    }
  };

  const handleStateUpdate = async (state) => {
    const res = await updateAppointmentAPI(appointment.id, { state });
    console.log(res.data);
    router.reload(window.location.pathname)
  };
  const linkDoctor=`doctors/${doctor.uuid}`;
  const linkPatient=`patient/${patient.uuid}`;


  return (
    <>
      <div
        className={` hover:bg-gray-50 dark:hover:bg-darkElevation-100 group cursor-pointer 00 bg-opacity-5 grid ${returnGridStyle(
          status
        )} gap-3 justify-center w-full items-center py-4 px-2 rounded-lg`}
      >
        <div
          className={`${
            status === "active" || status === "closed" ? "flex" : "hidden"
          } items-center space-x-3`}
        >
          <Link href={`/appointments/${appointment.id}`}>
          <div className="w-[40px] h-[40px] bg-darkSecondaryVariant rounded-full border-primary border-2"></div></Link>
          <div className="text-xs text-gray-600">
            <input
              type="text"
              onBlur={handleBlur}
              value={title}
              onChange={handleOnChange}
              className=" dark:hover:bg-darkElevation-400 dark:border-none dark:bg-darkElevation-200 focus:bg-white dark:text-gray-200 dark:focus:bg-darkElevation-500 appearance-none outline-none focus:border-2 focus:p-1"
            />
          </div>
        </div>
        <div className="flex space-x-2 text-xs items-center">
          <FaUserAlt />
          <div onClick={()=>router.push(`${role==='doctor'?linkPatient:linkDoctor}`)}>{role==='doctor'?patient.user.fullName:doctor.user.fullName}</div>
        </div>
        <div className="flex space-x-2 text-xs items-center">
          <BiTimeFive />
          <div>{createdAt}</div>
        </div>
        <div
          className={`flex space-x-2 ${colors[status]} w-fit p-2 rounded-md bg-opacity-10 text-xs items-center`}
        >
          {status === "active" && <FiCheckCircle onClick={()=>router.push(`/appointments/${appointment.id}`)} className="text-green-500" />}
          {status === "closed" && <IoMdDoneAll className="text-gray-700 dark:text-gray-300" />}
          {status === "pending" && (
            <MdOutlinePending className="text-gray-700 dark:text-gray-400" />
          )}
          {status === "rejected" && (
            <MdOutlineCancel className="text-red-700" />
          )}
          <div>{status}</div>
        </div>
        <div className="flex space-x-5 text-xs items-center">
          {status === "active" && (
            <div onClick={()=>handleStateUpdate('closed')} className="hover:bg-gray-200 dark:hover:bg-darkElevation-900 transition-all bg-gray-400 dark:bg-darkElevation-700 dark:border-none dark:text-gray-300 border-[1px] w-fit p-2 rounded-md bg-opacity-10">
              Close Case
            </div>
          )}
          {status === "pending"&&role!=='patient' && (
            <div
              onClick={() => handleStateUpdate("accepted")}
              className="p-2 bg-green-400 bg-opacity-20 rounded-md px-4 flex"
            >
              {" "}
              ✅ Accept
            </div>
          )}
          {status === "pending" && (
            <div
              onClick={() => handleStateUpdate("rejected")}
              className="p-2 bg-red-400 bg-opacity-20 rounded-md px-4"
            >
              ⛔Cancel
            </div>
          )}
        </div>
      </div>
      <hr  className="dark:border-darkElevation-900"/>
    </>
  );
};

const ViewItem = ({ view, setView, title, value }) => {
  return (
    <div className="flex items-center space-x-2" onClick={() => setView(value)}>
      {view === value && <MdArrowForwardIos className="text-primary" />}
      <div
        className={`border-b-[1px] ${
          value === view
            ? "border-primary dark:border-darkPrimary font-semibold text-primary dark:text-darkPrimary"
            : "border-gray-500  text-black dark:text-gray-500"
        } hover:text-primary hover:border-primary rounded-md cursor-pointer hover:font-semibold transition-all border-opacity-40 py-2 w-[100px]`}
      >
        {title}
      </div>
    </div>
  );
};

const Appointments = ({ user, error, fetchedAppointments }) => {
  const [view, setView] = useState("active");
  console.log(fetchedAppointments);
  const [appointments, setAppointments] = useState(fetchedAppointments);
  useEffect(() => {
    if (fetchedAppointments?.length) {
      setAppointments(fetchedAppointments.filter((app) => app.state === view));
    }
  }, [view]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUser(user));
  }, []);
  if (error) return <div>Something went wrong</div>;
  return (
    <>
      <div className="mt-9 px-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-semibold">Appointments</div>
            <div className="text-gray-600 text-sm mt-1 dark:text-darkSecondary">
              28 {view.toUpperCase()}
            </div>
          </div>
          <div className="bg-primary dark:bg-darkPrimary dark:bg-opacity-40 py-1 px-3 rounded-lg cursor-pointer text-white">
            {" "}
            + create
          </div>
        </div>

        <div className="flex mt-16 space-x-20">
          <div className=" flex-1">
            <div className="flex w-full items-center">
              <MdSearch
                size={26}
                className="relative left-[40px] dark:text-gray-500 text-gray-300"
              />
              <input
                type="text"
                className="w-full h-[42px] border-gray-400 dark:border-none dark:bg-darkElevation-300 dark:placeholder:text-gray-600 dark:rounded-md p-2 pl-12 outline-none"
                placeholder="Search Appointments"
              />
              <MdTune
                size={26}
                className="relative -left-[40px] dark:text-gray-500 text-gray-300"
              />
            </div>
            <div className="px-6 mt-7">
              <div className="w-full  bg-white dark:bg-darkElevation-200  h-[450px] rounded-lg p-3">
                <div className="w-full h-full flex flex-col space-y-2 p-3 ">
                  <div
                    className={`bg-opacity-5 text-xs grid ${returnGridStyle(
                      view
                    )} gap-3 justify-center w-full items-center py-4 px-2 rounded-lg`}
                  >
                    {(view === "active" || view === "closed") && (
                      <div>Appointment Title</div>
                    )}
                    <div>{user.role==='patient'?'Doctor':'Patient'}</div>
                    <div>Created On</div>
                    <div>Status</div>
                    {view !== "rejected" && view !== "closed" && (
                      <div>Actions</div>
                    )}
                  </div>
                  <hr />
                  <div className="flex flex-col overflow-y-auto ">
                    {appointments.length <= 0 && (
                      <div className="flex h-[300px] text-gray-600 w-full items-center justify-center">
                        No Appointments Found
                      </div>
                    )}
                    {appointments.length > 0 &&
                      appointments.map((app) => (
                        <AppointmentCard key={app.id} appointment={app} role={user.role} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100px] space-y-3">
            <ViewItem
              title="Active"
              value="active"
              view={view}
              setView={setView}
            />
            <ViewItem
              title={user.role==='doctor'?"Recieved":"Sent"}
              value="pending"
              view={view}
              setView={setView}
            />
            <ViewItem
              title="Cancelled"
              value="rejected"
              view={view}
              setView={setView}
            />
            <ViewItem
              title="Closed"
              value="closed"
              view={view}
              setView={setView}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
