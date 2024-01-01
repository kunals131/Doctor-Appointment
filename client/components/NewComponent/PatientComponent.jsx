import { useRouter } from "next/router";
import { useRef, useState } from "react";
import MedicalRecord from "../MedicalRecord";
import InputField from "../Input";
import InputAdvance from "../InputAdvance";
import AddMedicalRecord from "../EditPage/AddMedicalRecord";
import {
  addSymptomsAPI,
  removeSymptomAPI,
  updatePatientDetailsAPI,
} from "../../api/patient";
import diseases from "../../allDiseases.json";
import { BsPlusCircleDotted } from "react-icons/bs";

import bloodGroupValues from "../../utils/bloodGroup.json";

import { updateUserDetailsAPI, updateUserProfileAPI } from "../../api/common";

const PatientDetails = ({ user }) => {
  const [form, setForm] = useState({
    age: user.additionalData.age,
    bloodGroup: user.additionalData.bloodGroup,
    medicalHistory: user.additionalData.medicalHistory,
    medicalRecords: user.additionalData.medicalRecords,
  });

  const [errors, setErrors] = useState({
    medicalHistory: "",
    age: "",
    bloodGroup: "",
    medicalRecords: "",
  });

  const [symptoms, setSymptoms] = useState(user.additionalData.symptoms || []);
  const [medicalRecordsList, setMedicalRecordsList] = useState(
    user.additionalData.medicalRecords || []
  );
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const [availableSymptoms, setAvailableSymptoms] = useState(diseases);

  const handleAddSymptom = async (item) => {
    const { value: title } = item;

    const isSymptomAlreadyAdded = symptoms.some(
      (symptom) => symptom.title === title
    );

    if (isSymptomAlreadyAdded) {
      return;
    }

    try {
      const res = await addSymptomsAPI(user.additionalData.uuid, title);
      console.log(res);

      setSymptoms([...symptoms, res.data]);

      setAvailableSymptoms((prev) =>
        prev.filter((symptom) => symptom.title !== title)
      );
    } catch (err) {
      console.log(err);
      setError(err.response?.data.message || "Addition Symptom error");
    }
  };

  const handleRemoveSymptom = async (id) => {
    try {
      const res = await removeSymptomAPI(userId, id);
      console.log(res.data);
      setSymptoms(symptoms.filter((s) => s.id !== id));
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const handleRecordTitle = async (id, title) => {
    try {
      const res = await updateMedicalRecordAPI(id, { title });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async (e) => {
    if (hasErrors()) {
      alert("Please fix the validation errors");
      return;
    }

    if (!form.bloodGroup || !form.age || !form.medicalHistory) {
      setErrors((prev) => ({
        ...prev,
        bloodGroup: !form.bloodGroup ? "Required Field" : "",
        age: !form.age ? "Required Field" : "",
        medicalHistory: !form.medicalHistory ? "Required Field" : "",
      }));

      return;
    }

    try {
      const res = await updatePatientDetailsAPI(user.additionalData.uuid, form);
      const resz = await updateUserDetailsAPI(user.uuid, { isNew: false });
      console.log(res);
      router.push("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "medicalHistory":
        if (value.trim() === "") {
          errorMessage = "Medical Experience is required";
        } else if (!/^\d+$/.test(value)) {
          errorMessage = "Write experience in years";
        } else {
          errorMessage = "";
        }
        break;
      case "age":
        if (value.trim() === "") {
          errorMessage = "Age is required";
        } else if (!/^\d+$/.test(value)) {
          errorMessage = "Write age in numerals";
        } else errorMessage = "";
        break;

      case "bloodGroup":
        if (value.trim() === "") {
          errorMessage = "Blood Group is required";
        } else if (!bloodGroupValues.bloodGroups.includes(value)) {
          errorMessage = "Invalid Blood Group";
        } else {
          errorMessage = "";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
    console.log(errors);
  };

  const [loading, setLoading] = useState(false);
  const ref = useRef();

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
        const result2 = await updateUserProfileAPI(user.uuid, url);
        if (!result2) {
          errors.file;
        }
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
    <>
      <AddMedicalRecord
        show={show}
        onClose={() => setShow(false)}
        userId={user.uuid}
        setMedicalRecordsList={setMedicalRecordsList}
      />

      <div className="text-[#5A5482] font-bold text-xl">
        Complete your profile
      </div>
      <div
        className={`${error ? "text-red-600" : "text-gray-500"} text-xs mt-2"`}
      >
        {error
          ? error
          : "So, that your profile is easily accessible to other doctors."}
      </div>
      <div className="mt-10 flex space-x-5 items-center ">
        <div
          onClick={() => ref.current.click()}
          className="w-[100px] h-[100px] rounded-full flex items-center justify-center text-xs hover:scale-110 transition-all bg-primary dark:bg-darkElevation-900 dark:border-darkSecondary text-white border-primary border-2"
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
        <div className="text-black dark:text-white">
          <div>{user.fullName}</div>
          <div className="text-xs mt-1">{user.email}</div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex space-x-4 items-center">
          <InputField
            width="150px"
            label="AGE *"
            name="age"
            onChange={handleChangeForm}
            value={form.age}
            error={errors.age}
            placeholder="Enter Age"
          />
          <InputField
            width="300px"
            label="Medical History *"
            name="medicalHistory"
            onChange={handleChangeForm}
            error={errors.medicalHistory}
            value={form.medicalHistory}
          />
          <InputField
            width="250px"
            label="Blood Group *"
            name="bloodGroup"
            onChange={handleChangeForm}
            error={errors.bloodGroup}
            value={form.bloodGroup}
          />
        </div>
        <div className="mt-4 space-y-4">
          <InputAdvance
            options={availableSymptoms
              .filter((d) => !symptoms.includes(d))
              .map((d) => ({ id: d, value: d }))}
            list={symptoms}
            handleAdd={handleAddSymptom}
            handleRemove={handleRemoveSymptom}
            label="Symptoms"
          />
        </div>
        <div className="mt-10">
          <div className="mt-10">
            <div className="text-[#5A5482] font-bold text-xl flex justify-between w-full">
              <div>Medical Records</div>
            </div>
            <div className="text-gray-500 text-xs mt-2">
              These Medical Records will be shown to the doctor for better
              accessment.
            </div>
            <div className="mt-10 grid grid-cols-2 text-gray-800 gap-4 grid-flow-row">
              {medicalRecordsList.map((mr) => (
                <MedicalRecord
                  record={mr}
                  handleRecordTitle={handleRecordTitle}
                  setInformation={setForm}
                />
              ))}
              <div
                onClick={() => setShow(true)}
                className="w-full hover:border-[#6757E5] transition-all ease-in-out group border-gray-400 flex flex-col items-center justify-center h-full border-2 border-dashed rounded-md"
              >
                <div>
                  <BsPlusCircleDotted
                    size={40}
                    className="text-gray-300 group-hover:text-[#6757E5] transition-all ease-linear"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex space-x-3 justify-end">
        <button className="border-[#6757E5] bg-transparent disabled:bg-opacity-70 text-[#6757E5] border-2 hover:scale-105 transition-all ease-out text-sm px-2 py-2 rounded-md">
          Detect Location
        </button>
        <button
          disabled={error}
          onClick={handleSave}
          className="bg-[#6757E5] disabled:bg-opacity-70 text-white text-sm px-2 py-2 rounded-md"
        >
          Save and Continue
        </button>
      </div>
    </>
  );
};

export default PatientDetails;
