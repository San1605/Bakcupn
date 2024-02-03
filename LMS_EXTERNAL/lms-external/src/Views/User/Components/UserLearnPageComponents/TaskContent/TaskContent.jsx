import React, { useContext, useEffect, useState } from 'react'
import { taskSubmission } from '../../../Assets/userIcons'
import "./TaskContent.css"
import { useDropzone } from 'react-dropzone'
import { cross } from '../../../../Admin/Assets/adminIcons'
import { GlobalContext } from '../../../../../Context/GlobalContext'
import toast from 'react-hot-toast'
const TaskContent = ({ subtopic, tasksArray }) => {
    console.log(tasksArray, "ooooooooooooooooooo")
    const { submitAssignment } = useContext(GlobalContext)
    const [assignmentZip, setAssignmentZip] = useState({});
    const [assignmentUrl, setAssignmentUrl] = useState("");
    const { getInputProps, getRootProps, acceptedFiles, isDragActive } = useDropzone({
        accept: {
            'application/zip': ['.zip'],
        },
        minSize: 0,
        maxFiles: 1,
        maxSize: 5242880,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                setAssignmentZip(acceptedFiles[0]);
            }
        },
    })
    const handleGithubUrlChange = (e) => {
        setAssignmentUrl(e.target.value);
    };

    console.log(assignmentZip)
    useEffect(() => {
        if (acceptedFiles.length > 0) {
            setAssignmentZip(acceptedFiles[0]);
        }
    }, [acceptedFiles]);

    const handleSubmit = async () => {
        if (Object.keys(assignmentZip).length > 0 && (isGithubUrlValid(assignmentUrl) && assignmentUrl.trim() !== '')) {
            // Show validation error toast
            toast.dismiss()
            toast.error('Please either upload a file or provide a Github repo link.');
        }
        else if (Object.keys(assignmentZip).length > 0 || (isGithubUrlValid(assignmentUrl) && assignmentUrl.trim() !== '')) {
            const toastId = toast.loading("please wait !!")
            try {
                // Assuming submitAssignment takes assignmentZip and assignmentUrl as parameters
                const res = await submitAssignment(tasksArray[0]?.week, assignmentZip, assignmentUrl);
                // Handle success, show toast, etc.
                toast.dismiss(toastId)
                toast.success('Submission successful:');
                handleCancel()

            } catch (error) {
                // Handle error, show toast, etc.
                toast.dismiss(toastId)
                toast.error('Submission error:');
                handleCancel()

            }
        }

        else {
            toast.dismiss()
            toast.error('Please upload a file or provide a Github repo link.');
        }
    };
    const handleCancel = () => {
        setAssignmentZip({});
        setAssignmentUrl('');
    }

    const isGithubUrlValid = () => {
        // A simple check for a valid Github repo URL
        const githubRepoRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        return githubRepoRegex.test(assignmentUrl);
    };

    return (
        <div className='taskContent'>
            <div className='taskContentLeft'>
                {/* <div>{subtopic}</div> */}
                <ul>
                    {
                        tasksArray?.map((item, index) => (
                            <li>
                                <div>{item?.description}</div>
                                {(item?.link1 || item?.link2) &&
                                    <div className='ResourceDiv'>
                                        <div >Resources :</div>
                                        {item?.link1 && <a target='_blank' href={item?.link1}>{item?.link1}</a>}
                                        {item?.link2 && <a target='_blank' href={item?.link2}>{item?.link2}</a>}
                                    </div>}
                            </li>

                        ))
                    }
                </ul>
            </div>
            <div className="taskContentRight">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className='taskContentRightUpload'>
                        <img src={taskSubmission} alt='' />
                        {
                            Object.keys(assignmentZip)?.length === 0 ?
                                <div className='assignmentZipDiv'>
                                    <div>Drag & drop files(.zip) or <span>Browse</span></div>
                                    <div>Max File Size: 5MB</div>
                                </div>
                                :
                                <div className='assignmentFile'>
                                    <span>{assignmentZip?.name}</span>
                                    <img onClick={(e) => {
                                        e.stopPropagation()
                                        setAssignmentZip({})
                                    }} alt='' src={cross} />
                                </div>
                        }
                    </div>
                </div>


                <div className='taskContentRightOr'>OR</div>
                <div className='taskContentRightTextUpload'>
                    <div>Share Github Repo Link</div>
                    <input type="url" name="" id="" value={assignmentUrl} onChange={handleGithubUrlChange} />
                    {!isGithubUrlValid() && assignmentUrl.trim() !== '' && (
                        <div className="validationError">Invalid Github Repo Link</div>
                    )}
                </div>
                <div className='footer'>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskContent
