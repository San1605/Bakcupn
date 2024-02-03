import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../assets/icons/backIcon.svg";
import LeftConvertorBox from "../component/LeftConvertorBox";
import RightConvertorBox from "../component/RIghtConvertorBox";
import { useContext, useEffect, useState } from "react";
import { globalContext } from "../context/globalContext";

const ConvertCode = () => {
  const navigate = useNavigate();
  const [fileNameConvert, setFileNameConvert] = useState('');
  const [leftLang, setLeftLang] = useState("abap");
  const { rightTextValue, valueForTesting, setRightTextValue, setLeftTextValue, setValueForTesting } = useContext(globalContext);
  useEffect(() => {
    setRightTextValue("")
    setValueForTesting("")
    // setLeftTextValue(fileNameConvert)
  }, [])
  // console.log()
  const { id } = useParams()
  return (
    <div className="flex flex-col gap-[10px] ">
      <div className="w-full flex items-center gap-4 justify-between">
        <div className="flex items-center justify-between gap-4">
          <img
            className=" h-4 w-4 cursor-pointer"
            src={backIcon}
            alt="back"
            onClick={() => navigate(-1)}
          />
          <div className=" text-xl text-[#424242] font-medium">Conversion</div>
        </div>
        <div
          className={`text-sm rounded  tracking-wide px-6 py-1.5 text-white cursor-pointer ${(rightTextValue === "" || rightTextValue === "Invalid input code") ? "bg-[#E3E3E3]" : "bg-[#2D9596]"
            }`}
          onClick={() => {
            if (rightTextValue.length > 0 && rightTextValue !== "Invalid input code") {

              console.log(rightTextValue, "rightTextValueeeeeeeeeeeeeeeeeeee");

              setValueForTesting(rightTextValue);
              if (rightTextValue?.length > 0) {
                navigate(`/testing/${id}`)
              }
            }
          }}
        >
          Test
        </div>
      </div>
      <div className="h-[calc(100%_-_35px)] w-full flex flex-row gap-3 ">
        <LeftConvertorBox
          setFileNameConvert={setFileNameConvert}
          setLeftLang={setLeftLang}
        />
        <RightConvertorBox
          fileNameConvert={fileNameConvert}
          leftLang={leftLang}
          projectName={id}
        />
      </div>
    </div>
  );
};

export default ConvertCode;
