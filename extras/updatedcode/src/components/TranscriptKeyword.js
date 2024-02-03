import React from 'react'
import '../assets/css/summary-card.css';

const TranscriptKeyword = ({currentTime, audioTotalTime, keywords, isProgress}) => {
  return (
    <div className='summary-card'>
      <div className='header'>
        <h6>Keywords</h6>
      </div>
      <div className='c-body keywords'>
        <div>
          {
            !isProgress && audioTotalTime <= currentTime && keywords ? Object.keys(keywords).map((keyword, index) =><span key={index}>{keyword}</span>
            ) : "Call in progress ..."
          }
        </div>
      </div>
    </div>
  )
}

export default TranscriptKeyword