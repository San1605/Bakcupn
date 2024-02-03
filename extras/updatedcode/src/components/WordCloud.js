// import React, { useEffect, useState } from 'react'
// import ReactWordcloud from 'react-wordcloud';

// const WordCloud = ({currentTime, audioTotalTime, wordcloud_positive, wordcloud_negative, isProgress}) => {
//     const [wordcloudType, setWordcloudType] = useState("positive");
//     const [wordCloudWords, setWordCloudWords] = useState([]);
//     const wordoptions = {
//         colors: ["#FEA049", "#F92828", "#2256BA", "#BB28F9"],
//         deterministic: true,
//         enableTooltip: false,
//         enableOptimizations: true,
//         transitionDuration: 0,
//         rotations: 1,
//         rotationAngles: [0, 0],
//         fontSizes: [10, 30],
//         padding: 2,
//         scale: "log"
//     };

//     useEffect(() => {
//         if(wordcloudType === "positive"){
//             let postiveWords = [];
//             wordcloud_positive && Object.keys(wordcloud_positive).map((pword) => {
//                 postiveWords.push({text: pword, value: wordcloud_positive[pword]})
//             })
//             setWordCloudWords(postiveWords);
//         } else {
//             let negativeWords = [];
//             wordcloud_negative && Object.keys(wordcloud_negative).map((pword) => {
//                 negativeWords.push({text: pword, value: wordcloud_negative[pword]})
//             })
//             setWordCloudWords(negativeWords);
//         }
//     }, [wordcloudType])

//     return (
//         <div className='summary-card word-cloud'>
//             <div className='header'>
//                 <div className='row align-items-center'>
//                     <div className='col-5'>
//                         <h6>Word Cloud</h6>
//                     </div>
//                     <div className='col-7 text-end'>
//                         <button className={wordcloudType === "positive" ? "wbtn-active" : "wbtn"} type="button" onClick={()=>setWordcloudType("positive")}>Positive</button>
//                         <button className={wordcloudType === "negative" ? "wbtn-active" : "wbtn"} style={{marginLeft: "5px"}} onClick={()=>setWordcloudType("negative")}>Negative</button>
//                     </div>
//                 </div>
//             </div>
//             <div className='c-body word-cloud-body'>
//                 {
//                     !isProgress && audioTotalTime <= currentTime && wordCloudWords.length > 0 ? <ReactWordcloud options={wordoptions} words={wordCloudWords.slice(0, 40)} /> : <small>Call in progress...</small>
//                 }
//             </div>
//         </div>
//     )
// }

// export default WordCloud