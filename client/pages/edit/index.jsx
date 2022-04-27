import React, { useEffect, useRef, useState } from "react";
import { updateUserDetailsAPI } from "../../api/common";
import BasicInformation from "../../components/EditPage/BasicInformation";
import DoctorDetails from "../../components/EditPage/DoctorInformation";
import PatientDetails from "../../components/EditPage/PatientInformation";
import SecurityDetails from "../../components/EditPage/SecurityInformation";
import Input from "../../components/Input";
import { verifyAuthentication } from "../../utils/verifyAuth";

export const getServerSideProps = async (ctx) => {
  const auth =  verifyAuthentication(ctx.req);
  if (!auth.state) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return { props: { user: auth.decodedData } };
};

const Edit = ({ user }) => {
  console.log(user);
  const [basicInformation, setBasicInformation] = useState({
    details: {
      fullName: user.fullName,
      email: user.email,
      contact: user.contact,
    },
    error: "",
  });
  const ref = useRef();
  const [patientInformation, setPatientInformation] = useState({
    details: {
      age: user.additionalData.age,
      bloodGroup: user.additionalData.bloodGroup,
      medicalHistory: user.additionalData.medicalHistory,
      medicalRecords: user.additionalData.medicalRecords,
    },
    error: "",
  });
  const [doctorInformation, setDoctorInformation] = useState({
    details: {
      medicalExperience: user.additionalData.medicalExperience,
      lisenceId: user.additionalData.lisenceId,
      university: user.additionalData.university,
      degree: user.additionalData.degree,
      address: user.additionalData.address,
    },
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "yylewyo1");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/insight-byte/raw/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await res.json();
        const { url } = result;
        console.log(url);
        setProfileImg(url);
        const result2 = await updateUserDetailsAPI(user.uuid, {
          img: profileImg,
        });
        console.log(result2);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };
  const [profileImg, setProfileImg] = useState(user.img);
  return (
    <div className="py-10 w-[70vw] pr-10">
      <div className="text-[#5A5482] font-bold text-xl">Edit Your Profile</div>
      <div className="text-gray-500 text-xs mt-2">
        Tip : Keep your profile complete for better search and accessiblity.
      </div>
      <div className="mt-10 flex space-x-5 items-center ">
        <div
          onClick={() => ref.current.click()}
          className="w-[100px] h-[100px] rounded-full flex items-center justify-center text-xs hover:scale-110 transition-all bg-primary text-white border-primary border-2"
          style={{
            background: loading ? "" : `url(${profileImg}) center center/cover`,
          }}
        >
          {loading && "Uploading....."}
        </div>
        <input
          accept="image/*"
          ref={ref}
          disabled={loading}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="text-black">
          <div>{basicInformation.details.fullName}</div>
          <div className="text-xs mt-1">{basicInformation.details.email}</div>
        </div>
      </div>
      <div className="mt-10 w-fit">
        <BasicInformation
          userId={user.uuid}
          information={basicInformation}
          setInformation={setBasicInformation}
        />
      </div>
      <div className="mt-10 w-[500px]">
        {user.role === "doctor" ? (
          <DoctorDetails
            information={doctorInformation}
            setInformation={setDoctorInformation}
            userId={user.additionalData.uuid}
            specialitiesList={user.additionalData.specialities}
            tagsList={user.additionalData.tags}
          />
        ) : (
          <PatientDetails
            userId={user.additionalData.uuid}
            information={patientInformation}
            setInformation={setPatientInformation}
            symptomsList={user.additionalData.symptoms}
          />
        )}
      </div>
      <div className="mt-10 w-[500px]">
        <SecurityDetails />
      </div>
    </div>
  );
};

export default Edit;
