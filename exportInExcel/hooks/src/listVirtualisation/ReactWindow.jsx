import React from 'react'
import { FixedSizeList } from 'react-window'

const ReactWindow = () => {
    const data = Array.from({ length: 100000 }, (_, index) => `Item ${index}`)
    const getItemSize=()=>{
        // return the size of list dynamically
        
    }
    return (
        <div style={{ height: "400px", width: "300px", border: "1px solid lightgrey" }}>
            <FixedSizeList
                height={400}
                width={300}
                itemCount={data.length}
                itemSize={40}
             //   itemSize={getItemSize} // for virtual size 
            >
                {({ index, style }) => (
                    <div style={{ ...style, display: "flex", alignItems: "center", borderBottom: "1px solid lightgrey" }}>
                        <span>{data[index]}</span>
                    </div>
                )}
            </FixedSizeList>
        </div>
    )
}

export default ReactWindow
