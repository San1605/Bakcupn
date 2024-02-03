import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../assets/icons/backIcon.svg";
import LeftTestingBox from "../component/LeftTestingBox";
import RightTestingBox from "../component/RightTestingBox";
import { globalContext } from "../context/globalContext";
import toast from "react-hot-toast";

const Testing = () => {

  const { valueForTesting, testingApiResults, setEditorRighttBoxValue } = useContext(globalContext);
  const [editorLeftBoxValue, setEditorLeftBoxValue] = useState("");
  const {id} =useParams();
  console.log(
    valueForTesting,
    editorLeftBoxValue,
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  );

  // useEffect(()=>{
  //  if(id===undefined){
  //   setEditorLeftBoxValue("")
  //  }
  // },[])
  useEffect(() => {

    if (id!==undefined && valueForTesting?.length > 0) {
      setEditorLeftBoxValue(valueForTesting);
    }
  }, [valueForTesting]);

  useEffect(() => {
    setEditorRighttBoxValue("")
    if (editorLeftBoxValue?.length > 0) {
      testingApiResults(editorLeftBoxValue);
    }
  }, [])
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-[10px] ">
      <div className="w-full flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <img
            className=" h-4 w-4 cursor-pointer"
            src={backIcon}
            alt="back"
            onClick={() => navigate(-1)}
          />
          <div className=" text-xl text-[#424242] font-semibold">Testing</div>
        </div>
        <button className={`border border-[#EAEAEA] rounded-md px-6 py-[6px] text-sm ${editorLeftBoxValue?.length > 0 ? "bg-[#2D9596]" : "bg-[#E3E3E3]"}  text-white font-medium`}
          onClick={() => {
            if (editorLeftBoxValue?.length > 0) {
              testingApiResults(editorLeftBoxValue,id)
            }
            else {
              // toast.error("please enter value first")
            }
          }}
        >Test</button>
      </div>

      <div className="h-[calc(100%_-_35px)] w-full flex flex-row gap-3 ">
        <LeftTestingBox editorLeftBoxValue={editorLeftBoxValue} setEditorLeftBoxValue={setEditorLeftBoxValue} />
        <RightTestingBox />
      </div>
    </div>
  );
};

export default Testing;
