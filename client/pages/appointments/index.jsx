import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import {
  MdTune,
  MdArrowForwardIos,
  MdPending,
  MdOutlineCancel,
  MdOutlinePending,
} from "react-icons/md";
import { verifyAuthentication } from "../../utils/verifyAuth";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/user";
import { getDoctorAppointmentsAPI } from "../../api/doctor";
import { FaUserAlt } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { FiCheckCircle } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";
import { updateAppointmentAPI } from "../../api/doctor";

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
  try {
    const appointments = await getDoctorAppointmentsAPI(
      auth.decodedData.dataId
    );
    return {
      props: { user: auth.decodedData, fetchedAppointments: appointments.data },
    };
  } catch (err) {
    console.log(err);
    return { props: { user: auth.decodedData, error: err } };
  }
};

const AppointmentCard = ({ appointment }) => {
  const colors = {
    active: "bg-green-400",
    closed: "bg-gray-500",
    pending: "bg-gray-500",
    rejected: "bg-red-300",
  };
  const { patient, createdAt } = appointment;
  const { state: status } = appointment;

  const [title, setTitle] = useState(appointment.title);
  const handleOnChange = (e) => {
    if (title.length > 30) return;
    setTitle(e.target.value);
  };
  const handleBlur = () => {
    if (title.length > 0) {
      console.log(title);
    }
  };

  const handleStateUpdate = async (state) => {
    const res = await updateAppointmentAPI(appointment.id, { state });
    console.log(res.data);
  };

  return (
    <>
      <div
        className={` hover:bg-gray-50 group cursor-pointer 00 bg-opacity-5 grid ${returnGridStyle(
          status
        )} gap-3 justify-center w-full items-center py-4 px-2 rounded-lg`}
      >
        <div
          className={`${
            status === "active" || status === "closed" ? "flex" : "hidden"
          } items-center space-x-3`}
        >
          <div className="w-[40px] h-[40px] bg-black rounded-full border-primary border-2"></div>
          <div className="text-xs text-gray-600">
            <input
              type="text"
              onBlur={handleBlur}
              value={title}
              onChange={handleOnChange}
              className="group-hover:bg-gray-50 focus:bg-white appearance-none outline-none focus:border-2 focus:p-1"
            />
          </div>
        </div>
        <div className="flex space-x-2 text-xs items-center">
          <FaUserAlt />
          <div>{patient.user.fullName}</div>
        </div>
        <div className="flex space-x-2 text-xs items-center">
          <BiTimeFive />
          <div>{createdAt}</div>
        </div>
        <div
          className={`flex space-x-2 ${colors[status]} w-fit p-2 rounded-md bg-opacity-10 text-xs items-center`}
        >
          {status === "active" && <FiCheckCircle className="text-green-500" />}
          {status === "closed" && <IoMdDoneAll className="text-gray-700" />}
          {status === "pending" && (
            <MdOutlinePending className="text-gray-700" />
          )}
          {status === "rejected" && (
            <MdOutlineCancel className="text-red-700" />
          )}
          <div>{status}</div>
        </div>
        <div className="flex space-x-5 text-xs items-center">
          {status === "active" && (
            <div className="hover:bg-gray-200 transition-all bg-gray-400 border-[1px] w-fit p-2 rounded-md bg-opacity-10">
              Close Case
            </div>
          )}
          {status === "pending" && (
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
      <hr />
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
            ? "border-primary font-semibold text-primary"
            : "border-gray-500 text-black"
        } hover:text-primary hover:border-primary rounded-md cursor-pointer hover:font-semibold transition-all border-opacity-40 py-2 w-[100px]`}
      >
        {title}
      </div>
    </div>
  );
};

const Appointments = ({ user, error, fetchedAppointments }) => {
  const [view, setView] = useState("active");
  // console.log(fetchedAppointments);
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
            <div className="text-gray-600 text-sm mt-1">
              28 {view.toUpperCase()}
            </div>
          </div>
          <div className="bg-primary py-1 px-3 rounded-lg cursor-pointer text-white">
            {" "}
            + create
          </div>
        </div>

        <div className="flex mt-16 space-x-20">
          <div className=" flex-1">
            <div className="flex w-full items-center">
              <MdSearch
                size={26}
                className="relative left-[40px] text-gray-300"
              />
              <input
                type="text"
                className="w-full h-[42px] border-gray-400 p-2 pl-12 outline-none"
                placeholder="Search Appointments"
              />
              <MdTune
                size={26}
                className="relative -left-[40px] text-gray-300"
              />
            </div>
            <div className="px-6 mt-7">
              <div className="w-full  bg-white  h-[450px] rounded-lg p-3">
                <div className="w-full h-full flex flex-col space-y-2 p-3 ">
                  <div
                    className={`bg-opacity-5 text-xs grid ${returnGridStyle(
                      view
                    )} gap-3 justify-center w-full items-center py-4 px-2 rounded-lg`}
                  >
                    {(view === "active" || view === "closed") && (
                      <div>Appointment Title</div>
                    )}
                    <div>Patient</div>
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
                        <AppointmentCard key={app.id} appointment={app} />
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
              title="Recieved"
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
