import Image from "next/image";
import { MdHome, MdPhone } from "react-icons/md";


const Tag = ({ title }) => {
    return (
      <span className="text-[0.6rem] px-2 py-1 bg-gray-300 rounded-lg">
        {title}
      </span>
    );
  };
  const DoctorProfile = () => {
    return (
      <div className="flex items-center rounded-md w-full p-2 px-2 bg-slate-50  border-[1px]  border-gray-400">
        <div className="flex space-x-5 items-center w-full">
          <div className="pt-1 rounded-md">
            <Image
              className="rounded-lg"
              src="https://res.cloudinary.com/insight-byte/image/upload/v1643459644/unnamed_tqkmtj.jpg"
              height={160}
              width={160}
            />
          </div>
          <div className="flex justify-between w-full">
            <div>
              <div className="text-sm font-semibold">Keith Sebastian</div>
              <div className="text-[0.7rem] text-gray-500 mt-1">
                I'm the best doctor in the holy fucking world
              </div>
              <hr className="border-gray-400 my-2" />
              <div className="flex space-x-3 ">
                <Tag title="dentistry" />
                <Tag title="Heart" />
                <Tag title="Dieasease" />
              </div>
              <div className="mt-4 flex space-x-3 items-center">
                <div className="text-[0.7rem] bg-primary bg-opacity-90 hover:bg-opacity-100 w-fit p-1 border-[1px] text-white rounded-md px-2">
                  Appointment Dr. Keith
                </div>
                <div className="text-[0.7rem] border-primary border-[1px] text-primary bg-opacity-90 hover:bg-opacity-100 w-fit p-1  rounded-md px-2">
                  View Profile
                </div>
              </div>
            </div>
            <div>
              <div className="w-[190px] space-y-2 px-3">
                <div className="flex space-x-2">
                  <MdHome className="text-primary" />
                  <div className="text-[0.7rem]">
                    32/5 Rajmahal colony, Indore
                  </div>
                </div>
                <div className="flex space-x-2">
                  <MdPhone className="text-primary" size={15} />
                  <div className="text-[0.7rem]">+91 7049930190</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default DoctorProfile;