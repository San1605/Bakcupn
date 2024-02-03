import React from 'react';
import styles from './inputField.module.css'

const InputField = ({ label, type, dataSetter }) => {

    return (
        <div className={styles.fieldContainer}>
            <span className={styles.label}>
                {label}
            </span>
            <input 
                className={styles.inputfield} 
                type={type} 
                onChange={e => dataSetter(e.target.value)}
            />
        </div>
    );
};

export default InputField;