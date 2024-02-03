import React from 'react'

const Comments = ({id, text, replies }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: "row",
        }}
            id={`${id}.`}
        >
            {/* <span style={{ marginRight: "10px" }}>{user} -&gt; </span> */}
            <span >{text}</span>
            <button>reply</button>
            <div>
                {
                replies?.map((item)=>(
                    <Comments id={item.id} replies={item.replies}  text={item.text}/>
                ))
                }
                </div>
        </div>
    )
}

export default Comments
