import "./EventScheduleModal.css"
import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import { meetingValidationSchema } from "../../Utils/Schema";
import DatePicker from "react-datepicker"
import { GlobalContext } from "../../Context/GlobalContext";

function EventScheduleModal({ show, setShow, api }) {
  const { addEvents } = useContext(GlobalContext)
  const initialValues = {
    title: '',
    participants: '',
    startTime: '',
    endTime: '',
    recurringSession: "",
    location: '',
    description: '',
    meetingLink: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values, "values")
    try {
      const toastId = toast.loading("Please Wait we are adding Learning Path...");
      await addEvents(values);
      toast.dismiss(toastId);
      toast.success("Successfully added");
      api()
      setShow(false);
      resetForm();
    } catch (error) {
      toast.dismiss();
      toast.error(error?.message);
    }
  };

  const handleClose = () => {
    setShow(false);
  };


  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='eventScheduleEvent'
    >
      <Modal.Header>
        <div>New Meeting</div>
        <CloseButton
          variant='white'
          style={{ fontSize: "14px", fontWeight: "500" }}
          onClick={handleClose}
        />
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={meetingValidationSchema}
          onSubmit={handleSubmit}
        >
          <InnerForm handleClose={handleClose} />
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default EventScheduleModal;


const InnerForm = ({ handleClose }) => {
  const formik = useFormikContext();


  return (
    <Form className='AddEventForm'>
      <div className='AddEventFormDiv'>
        <label htmlFor="title">Title<span>*</span></label>
        <div className='fieldDivWithError' >
          <Field
            type='text'
            name='title'
            required
            placeholder="Add title"
          />
          <ErrorMessage name="title" component="div" className="errorMessage" />
        </div>
      </div>
      <div className='AddEventFormDiv'>
        <label htmlFor="participants">Add Participants<span>*</span></label>
        <div className='fieldDivWithError' >
          <Field
            type='textarea'
            name='participants'
            required
            placeholder="Add Participants"
            className="addeventModalField"
            
          />
          <ErrorMessage name="participants" component="div" className="errorMessage" />
        </div>
      </div>
      <div className='AddEventFormDiv'>
        <label htmlFor="startTime">Start Time<span>*</span></label>
        <div className='fieldDivWithError' >
          <DatePicker
            selected={formik.values.startTime}
            onChange={(date) => formik.setFieldValue("startTime", date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select Start Time"
            className="form-control"
          />
          <ErrorMessage name="startTime" component="div" className="errorMessage" />
        </div>
      </div>
      <div className='AddEventFormDiv'>
        <label htmlFor="endTime">End Time<span>*</span></label>
        <div className='fieldDivWithError' >
          <DatePicker
            selected={formik.values.endTime}
            onChange={(date) => formik.setFieldValue("endTime", date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            placeholderText="Select End Time"
            className="form-control"
          />
          <ErrorMessage name="endTime" component="div" className="errorMessage" />
        </div>
      </div>
      <div className='AddEventFormDiv' style={{
        justifyContent: "center"
      }}>
        <label>Reoccuring Session<span>*</span></label>
        <div className="fieldDivWithError">
          <Field as="select" id="recurringSession" name="recurringSession">
            <option value="" hidden>Select option</option>
            {
              ["Does Not Repeat", "Repeat"].map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))
            }
          </Field>
          <ErrorMessage name='recurringSession' component='div' className='errorMessage' />
        </div>
      </div>

      <div className='AddEventFormDiv'>
        <label htmlFor="location">Location<span>*</span></label>
        <div className='fieldDivWithError' >
          <Field
            type='text'
            name='location'
            required
            placeholder="Add Location"
          />
          <ErrorMessage name="location" component="div" className="errorMessage" />
        </div>
      </div>
      <div className='AddEventFormDiv'>
        <label htmlFor="description">Description<span>*</span></label>
        <div className='fieldDivWithError' >
          <Field
            as='textarea'
            name='description'
            required
            placeholder="Add description"
            rows="3"
          />
          <ErrorMessage name="description" component="div" className="errorMessage" />
        </div>
      </div>
      <div className='AddEventFormDiv'>
        <label htmlFor="meetingLink">Add Meeting Link<span>*</span></label>
        <div className='fieldDivWithError' >
          <Field
            type='text'
            name='meetingLink'
            required
            placeholder="Add meeting link"
          />
          <ErrorMessage name="meetingLink" component="div" className="errorMessage" />
        </div>
      </div>

      <div className='footer'>
        <button type="button" onClick={handleClose}>
          Cancel
        </button>
        <button type="submit">
          Submit
        </button>
      </div>
    </Form>
  )
}