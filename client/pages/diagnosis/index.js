import React, { useState } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { DatalistInput, useComboboxControls } from "react-datalist-input";
import diseases from "../../allDiseases.json";
import {
  createPatientDiagnosis,
  getAllDiagnosisAPI,
  getDiagnosis,
} from "../../api/patient";
import { verifyAuthentication } from "../../utils/verifyAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "../../components/Input";
import { getAllUserDetailsAPI } from "../../api/common";
const SymptomItem = ({ title, handleRemove }) => {
  return (
    <div className="text-sm p-2 flex items-center justify-between bg-gray-200 dark:bg-darkElevation-300 w-[250px] rounded-md">
      <div>{title}</div>
      <MdClear onClick={() => handleRemove(title)} />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const auth = verifyAuthentication(ctx.req);
  let diagnoses = "";
  if (!auth.state) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const userData = await getAllUserDetailsAPI(auth.decodedData.uuid);
  auth.decodedData = userData.data;
  if (auth.decodedData.isNew) return {redirect : {destination : '/new'}}
  if (auth.decodedData.role !== "patient") {
    return {
      notFound: true,
    };
  }
  console.log(auth.decodedData.dataId);
  try {
    const allDiagnosis = await getAllDiagnosisAPI(auth.decodedData.dataId);
    diagnoses = allDiagnosis.data;
  } catch (err) {
    console.log(err.response.data.message);
    return {
      notFound: true,
    };
  }
  return { props: { user: auth.decodedData, diagnoses } };
};

const Diagnosis = ({ user, diagnoses }) => {
  console.log(user);
  console.log(diagnoses);
  const [symptomList, setSymptomList] = useState([]);
  const { value, setValue } = useComboboxControls({ initialValue: "" });
  const [title, setTitle] = useState('');


  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // console.log(symptom)
  const handleRunDiagnosis = async () => {
    // console.log(symptomList)
    const symptomString = symptomList.join(",");
    const res = await getDiagnosis(symptomString);
    console.log(res.data.final_prediction);
    const addedDiagosnis = await createPatientDiagnosis({
      patientId: user.dataId,
      symptoms: symptomString,
      disease: res.data.final_prediction,
      title
    });
    console.log(addedDiagosnis.data.id);
    console.log(addedDiagosnis.data);
    router.push(`/diagnosis/${addedDiagosnis.data.id}`);
  };

  const handleAdd = () => {
    setSymptomList((list) => [...list, value]);
    setValue("");
  };
  const handleRemove = (title) => {
    setSymptomList((list) => list.filter((item) => item !== title));
  };

  const DiagnosisBlock = ({diagnosis})=>{
    console.log(diagnosis)
    return (
      <Link href={`/diagnosis/${diagnosis.id}`}>
        <div  className="bg-white shadow-lg dark:bg-darkElevation-400 border-primary hover:bg-slate-100 transition-all cursor-pointer p-4 rounded-md">
        <div className="font-semibold dark:text-darkSecondary">{diagnosis.title}</div>
        <div className="text-xs mt-4 dark:text-gray-400">{diagnosis.disease} <span> ({diagnosis.accuracy}) </span></div>
        <div className="text-xs dark:text-gray-400">{diagnosis.symptoms}</div>
        <div className="text-xs dark:text-gray-400">{diagnosis.createdAt}</div>
        </div>
      </Link>
    )
  }



  return (
    <div className="mt-16">
      <div className="flex space-x-44">
        <div>
          <div className="text-2xl font-semibold flex space-x-2">
            <AiOutlineRobot size={30} />
            <div>AI DIAGNOSIS</div>
          </div>
          <div className="w-[120px] mt-2 h-[2px] bg-primary dark:bg-darkPrimary"></div>
          <div className="mt-10">
            <div className="mb-10">
            <Input name="title" label="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>

            <div className="text-lg text-gray-700 dark:text-white">Symptoms</div>
          </div>
          <div className="mt-3 text-base space-y-2">
            {symptomList.map((item, idx) => (
              <SymptomItem key={idx} handleRemove={handleRemove} title={item} />
            ))}
          </div>
          <div className="mt-2">
            <DatalistInput
              placeholder="Add a symptom"
              className="bg-white dark:bg-darkElevation-300 w-[250px] rounded-md p-1 bg-transparent  border-b-2  border-gray-500"
              inputProps={{
                className: "w-[250px] bg-transparent text-sm outline-none ",
              }}
              onSelect={(item) => console.log(item.value)}
              listboxProps={{
                className: "bg-white dark:bg-darkElevation-500 p-2 rounded-md h-[150px] overflow-y-auto ",
              }}
              listboxOptionProps={{ className: "border-b-2" }}
              value={value}
              setValue={setValue}
              items={diseases
                .filter((d) => !symptomList.includes(d))
                .map((d) => ({ id: d, value: d }))}
            />

            <div className="mt-5 text-sm flex space-x-3 items-center">
              <button
                disabled={value.length == 0}
                className="bg-primary p-1 disabled:bg-opacity-40 px-4 text-white  rounded-md text-sm"
                onClick={handleAdd}
              >
                Add
              </button>
              <button
                onClick={handleRunDiagnosis}
                disabled={symptomList.length == 0}
                className="p-[3px] disabled:bg-primary disabled:bg-opacity-40 disabled:text-white disabled:border-none px-4 text-primary border-[1px] border-primary rounded-md"
              >
                Run Diagnosis
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-semibold">Previous Diagnosis</h1>
          <div className="text-gray-600 text-xs">{diagnoses.length} Diagnoses Found</div>
          <div className="mt-5 space-y-2">
            {diagnoses.map((d,idx)=>(
              <DiagnosisBlock key={d.idx} diagnosis={d}/>
            ))
}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
