import React from 'react'
import { opennew, readingImage } from '../../Assets/userIcons'

const ReadingContent = ({ readingContent }) => {
    return (
        <div className='readingContent'>
            <img className="readingContentImage" alt='' src={readingImage} />
            <span></span>
            <div
                className="openButton"
                onClick={() =>
                    window.open(readingContent, "_blank")
                }
            >
                <span>Open</span>
                <img src={opennew} alt="opennew" height={16} />
            </div>
        </div>
    )
}

export default ReadingContent
