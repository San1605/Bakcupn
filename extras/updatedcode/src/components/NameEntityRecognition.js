import React from 'react'
import '../assets/css/summary-card.css';

const NameEntityRecognition = ({ ner, currentTime, audioTotalTime, isProgress }) => {
  return (
    <div className='summary-card'>
      <div className='header'>
        <h6>Name Entity Recognition</h6>
      </div>
      <div className='c-body name-entity-body'>
        {
          !isProgress && audioTotalTime <= currentTime ?
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ner ? ner.map((nameE, index) => {
                      const nameEntity = Object.keys(nameE);
                      return (
                        <tr key={index}>
                          <td>{nameEntity}</td>
                          <td>{nameE[nameEntity]}</td>
                        </tr>
                      )
                    }) : <tr><td>No Data</td></tr>
                  }
                </tbody>
              </table>
            </div> : "Call in progress..."
        }
      </div>
    </div>
  )
}

export default NameEntityRecognition