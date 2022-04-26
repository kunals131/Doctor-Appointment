import React, { useEffect, useState } from "react";
import FilterOptions from "../../components/FilterOptions";
import Image from "next/image";
import { MdHome, MdPhone } from "react-icons/md";
import DoctorProfile from "../../components/DoctorCard";
import { getDoctorAppointmentsAPI, getDoctorsAPI } from "../../api/doctor";
import { verifyAuthentication } from "../../utils/verifyAuth";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/user";
import { Triangle as Loader } from "react-loader-spinner";
import { HiArrowSmRight } from "react-icons/hi";

export const getServerSideProps = async (ctx) => {
  const auth = verifyAuthentication(ctx.req);
  if (!auth.state) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  try {
    const allDoctors = await getDoctorsAPI(JSON.stringify(auth.decodedData));
    return {
      props: {
        allDoctors: allDoctors.data.doctorsFiltered,
        user: auth.decodedData,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

const Doctors = ({ allDoctors, user }) => {
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [search,setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  console.log(allDoctors);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUser(user));
  }, []);
  const [doctors, setDoctors] = useState([...allDoctors]);
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);
  const [inital, setInital] = useState(true);
  console.log(inital)
  useEffect(() => {
    if (!inital) {
      let stringKeywords = keywords.join(" ");
      stringKeywords+=searchInput;
      console.log(stringKeywords)
      let accuracy = 6;
      if (keywords.length === 0 && searchInput.length===0) {
        accuracy = 0;
        stringKeywords = JSON.stringify(user);
      }
      try {
        const fetchData = async () => {
          setLoading(true);
          const fetchedDocs = await getDoctorsAPI(stringKeywords);
          console.log(fetchedDocs)
          setDoctors([...fetchedDocs.data.doctorsFiltered]);
          setLoading(false);
        };
        fetchData();
      } catch (err) {
        console.log(err);
        setLoading(false);

      }
    }
    if (inital) return setInital(false);
  }, [keywords,search]);

  return (
    <>
      {loading && (
        <div className="absolute h-screen flex-col w-screen flex items-center justify-center bg-white bg-opacity-70 z-[200] top-0 left-0">
          <Loader color="purple" />
          <div className="mt-2 animate-bounce">Loading...</div>
        </div>
      )}
      <div className="flex space-x-10 mt-10">
        <div className="w-fit">
          <FilterOptions keywords={keywords} setKeywords={setKeywords} />
        </div>
        <div className=" w-[55vw] rounded-md">
          <div className="bg-white w-full p-5 rounded-md py-5 -space-x-7 flex items-center">
            <input
              type="text"
              value={searchInput}
              onChange={(e)=>setSearchInput(e.target.value)}
              placeholder="Search for any keyword"
              className="border w-full py-3 p-2 text-sm"
            />
            <HiArrowSmRight onClick={()=>setSearch(prev=>!prev)} size={25} className={`${searchInput.length>0?'scale-100':'scale-0'} transition-all ease-linear text-primary`}/>
          </div>
          <div className="mt-3 bg-white rounded-md p-4">
            <div className="font-medium text-xl">Doctors Found</div>
            <div className="text-xs mt-1 text-gray-500 font-medium">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div>{doctors.length} Results Found</div>
              )}
            </div>
            <hr className="my-3" />
            <div className="grid mt-6 grid-cols-1 gap-5 p-2">
              {!loading && doctors.map((doc,idx) => <DoctorProfile key={idx} doctor={doc} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
