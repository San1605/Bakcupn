import React from 'react';
import styles from './calendar.module.css'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Calender from '../../assets/calendar.svg'

const Calendar = ({ label, setSelectedDate, selectedDate }) => {

    return (
        <div className={styles.container}>
            <DatePicker
                className={styles.dateBox}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText={label}
                dateFormat="dd-MM-yyyy"
            />
            <img src={Calender} alt="Calendar" />
        </div>
    );
};

export default Calendar;