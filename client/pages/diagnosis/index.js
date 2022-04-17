import React, { useState } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import {MdClear} from 'react-icons/md';
import {DatalistInput, useComboboxControls} from 'react-datalist-input';

const SymptomItem = ({title, handleRemove})=>{
    return (
        <div className="text-sm p-2 flex items-center justify-between bg-gray-200 w-[250px] rounded-md">
        <div>{title}</div>  
        <MdClear onClick={()=>handleRemove(title)}/>
        </div>
    )
}

const Diagnosis = () => {
    const [symptomList, setSymptomList] = useState(['Fever', 'Ache'])
    const { value, setValue } = useComboboxControls({ initialValue: '' });
    // console.log(symptom)
    const handleAdd = ()=>{
        setSymptomList((list)=>[...list,value]);
        setValue('');
    }
    const handleRemove = (title)=>{
        setSymptomList(list=>list.filter(item=>item!==title));
    }
  return (
    <div className="mt-16">
      <div className="text-2xl font-semibold flex space-x-2 items-center">
        <AiOutlineRobot size={30}/>
        <div>AI DIAGNOSIS</div>
      </div>
      <div className="w-[120px] mt-2 h-[2px] bg-primary"></div>
      <div className="mt-10">
          <div className="text-lg text-gray-700">Symptoms</div>
      </div>
      <div className="mt-3 text-base space-y-2">
          {symptomList.map((item,idx)=><SymptomItem key={idx} handleRemove={handleRemove} title={item}/>)}
      </div>
      <div className="mt-2">
      <DatalistInput
    placeholder="Add a symptom"
    className="bg-white w-[250px] rounded-md p-1 bg-transparent  border-b-2 border-black"
    inputProps={{className : 'w-[250px] bg-transparent text-sm outline-none '}}

    onSelect={(item) => console.log(item.value)}
    listboxProps={{className : 'bg-white p-2 rounded-md '}}
    listboxOptionProps={{className : 'border-b-2'}}
    value={value}
    setValue={setValue}
    items={[
      { id: 'Chocolate', value: 'Chocolate' },
      { id: 'Coconut', value: 'Coconut' },
      { id: 'Mint', value: 'Mint' },
      { id: 'Strawberry', value: 'Strawberry' },
      { id: 'Vanilla', value: 'Vanilla' },
    ]}
  />

  <div className="mt-5 text-sm flex space-x-3 items-center">
      <button disabled={value.length==0} className="bg-primary p-1 px-4 text-white  rounded-md text-sm" onClick={handleAdd}>Add</button>
      <button onClick={()=>console.log('RAN DIAGNOSIS')} disabled={symptomList.length==0} className="p-[3px] px-4 text-primary border-[1px] border-primary rounded-md">Run Diagnosis</button>
  </div>
      </div>
    </div>
  );
};

export default Diagnosis;
