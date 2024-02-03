import React from 'react'
import "./LearningFiles.css"
import {pdf} from "../../../Views/Admin/Assets/adminIcons"
const LearningFiles = () => {
    const LearningFiles = [
        { name: 'DocumentLearningFile.pdf', readTime: '2 min read' },
        { name: 'Image.jpg', readTime: '5 min read' },
        { name: 'Presentation.pptx', readTime: '3 min read' },
        { name: 'Spreadsheet.xlsx', readTime: '4 min read' },
        { name: 'Article.docx', readTime: '6 min read' },
        { name: 'Video.mp4', readTime: '8 min read' },
        { name: 'CodeSnippet.js', readTime: '1 min read' },
        { name: 'Audio.mp3', readTime: '7 min read' },
        { name: 'Diagram.png', readTime: '3 min read' },
        { name: 'Presentation2.pptx', readTime: '4 min read' },
    ];
    return (
        <div className='LearningFiles'>
            <div className='LearningFilesHeading'>
                Learning Files
            </div>
            <div className="LearningFilesDiv">
                {
                    LearningFiles?.map((item, index) => (
                        <div className='LearningFileCard' key={index}>
                            <div className='LearningFileImgDiv'>
                                <img src={pdf} alt='' />
                            </div>
                            <div className='LearningFileRight'>
                                <div className='LearningFileRightName'>{item?.name}</div>
                                <div className='LearningFileRightStatus'>{item?.readTime}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LearningFiles
