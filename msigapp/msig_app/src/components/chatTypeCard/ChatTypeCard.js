import React from 'react';
import styles from './chatTypeCard.module.css'

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedCardData } from '../../redux/actions';
import { baseUrl } from '../../config';

function ChatTypeCard({ backColor, count, title, value }) {

    const dispatch = useDispatch()
    const userEmail = useSelector(state => state.selectedEmail)

    const handleCardClick = () => {
        let data = new FormData();
        data.append('user_email', userEmail);
        data.append('chattype', value);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/chatdata`,
            data: data
        };

        axios(config)
            .then((response) => {
                dispatch(setSelectedCardData(response.data.data))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div
            className={styles.container}
            style={{ backgroundColor: backColor }}
            onClick={handleCardClick}
        >
            <span className={styles.count}>
                {count}
            </span>
            <span className={styles.title}>
                {title}
            </span>
        </div>
    );
}

export default ChatTypeCard;