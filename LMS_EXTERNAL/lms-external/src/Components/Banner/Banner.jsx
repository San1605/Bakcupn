import React, { useState, useEffect } from 'react';
import { sampleImg } from '../../Assets/globalIcons';
import './Banner.css';
import {
    COE_1,
    COE_2,
    COE_3,
    COE_4,
    COE_5,
    COE_6,
    COE_7,
    COE_8,
    COE_9,
    COE_10,
    COE_11,
    COE_12,
    COE_13,
    COE_14,
    COE_15
} from "../../Assets/COEImg.js"
const Banner = ({ type }) => {
    const arr = [COE_1,
        COE_2,
        COE_3,
        COE_4,
        COE_5,
        COE_6,
        COE_7,
        COE_8,
        COE_9,
        COE_10,
        COE_11,
        COE_12,
        COE_13,
        COE_14,
        COE_15
    ]
    return (
        <div className={`collegeLoginrightDiv ${type === 'reverse' && 'reverseDivBanner'}`}>
            <div className="gallery-overlay gallery-overlay-top"></div>
            {[...arr, ...arr]?.map((item, index) => (
                <div key={index} className={`collegeLoginRightBox ${type === 'reverse' ? 'reverseOrderScroll' : "normalOrderScroll"}`}>
                    <img src={item} alt='' />
                </div>
            ))}
            <div className="gallery-overlay gallery-overlay-bottom"></div>

        </div>
    );
};

export default Banner;
