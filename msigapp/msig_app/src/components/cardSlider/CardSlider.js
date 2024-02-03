import React, { useEffect, useState } from 'react';
import styles from './cardSlider.module.css'

import axios from 'axios';

import ChatTypeCard from '../chatTypeCard/ChatTypeCard';

import { baseUrl } from '../../config';
import { useSelector } from 'react-redux';

export default function CardSlider() {

    const userEmail = useSelector(state => state.selectedEmail)

    const [cardType, setCardType] = useState([]);

    const colorList = [
        "#C4D5FF",
        "#F1B7C1",
        "#C9E6FE",
        "#C2B8B8"
    ]

    const data = [
        {
            count: 130,
            title: "Informational"
        }, {
            count: 30,
            title: "Funny"
        }, {
            count: 90,
            title: "Industrial"
        }, {
            count: 110,
            title: "Other"
        },
    ]

    useEffect(() => {
        let data = new FormData();
        data.append('user_email', userEmail);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/chattype`,
            data: data
        };

        axios(config)
            .then((response) => {
                if(response.data.data) {
                    setCardType(response.data.data)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div className={styles.container}>
            {
                cardType?.map((item, index) =>
                    <ChatTypeCard
                        backColor={colorList[index % colorList.length]}
                        count={item.count}
                        title={item.title}
                        value={item.title}
                    />
                )
            }
        </div>
    );
}