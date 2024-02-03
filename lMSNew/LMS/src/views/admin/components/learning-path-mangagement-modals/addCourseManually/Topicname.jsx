import React, { useEffect, useState } from 'react'

function Topicname({coursearray, setCoursearray, dataval}) {
  const [topicName, setTopicName] = useState("");
  useEffect(()=>{
    if(Object.keys(coursearray[Number(dataval)]).length > 0)
    {
      const dataobj = coursearray[Number(dataval)];
      setTopicName(dataobj.name);
    }
  },[dataval])
useEffect(()=>{
if(topicName !== "")
{
  const temp = coursearray.map((elem,index)=>{
    if(Number(dataval.split(".")[0]) === index)
    {
      return {...elem,name:topicName}
    }
    else{
      return elem
    }
  })
  setCoursearray(temp);
}
},[topicName])
  return (
    <div className="main-topic-detail inner-field">
            <div className="edit-department-input-div">
                <label style={{ fontWeight: "500" }}>
                  Title
                  <span className="spanimp">*</span>
                </label>
                <input
                  type="text"
                  className="dep-input"
                  placeholder="Enter Title here"
                  value={topicName}
                  onChange={(e)=>setTopicName(e.target.value)}
                />
            </div>
    </div>
  )
}

export default Topicname