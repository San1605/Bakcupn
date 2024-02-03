import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/esm/Table';

const ShowScore = ({ setModel, model, scores }) => {

  const handleClose = () => setModel(false);

  return (
    <Modal centered size="lg" show={model} onHide={handleClose} className="showscore-modal">
      <Modal.Header closeButton>
      <h6 className='pt-1'>Overall Score : {scores ? scores.overall : "-"}</h6>
      </Modal.Header>
      <Modal.Body>
        {
          scores &&
        <Table striped bordered hover responsive className='mt-2'>
          <thead>
            <tr>
              <th style={{minWidth: "160px"}}>Signal</th>
              <th style={{minWidth: "250px"}}>Sentence</th>
              <th style={{minWidth: "75px"}}>Score</th>
            </tr>
          </thead>

          <tbody >
            {
              Object.keys(scores.distribution).map((keys, index) => (
                <tr key={index}>
                  <td>{keys}</td>
                  <td>{scores.distribution[keys][0]}</td>
                  <td className='text-center'>{scores.distribution[keys][1]}</td>
                </tr>
              ))}
          </tbody>

        </Table>
    }

      </Modal.Body>

    </Modal>
  )
}

export default ShowScore