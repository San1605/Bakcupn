import React, { useContext, useEffect, useState } from 'react'
import "./StudentProfile.css"
import { cross, downloadIcon, uploadImg } from "../../../Admin/Assets/adminIcons"
import { profile } from '../../../../Assets/globalIcons';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../../../Context/GlobalContext';
import { userActions } from '../../Context/userAction';
import toast from 'react-hot-toast';
function StudentProfile({ show, setShow, }) {
    const { userProfile, dispatch, authenticateUser, submitCertificate } = useContext(GlobalContext)
    console.log(userProfile, "iuserrrrrrrrrrrr")
    const [intership, setInternship] = useState({});
    const [certificates, setCertificates] = useState({});
    const [profileImg, setProfileImg] = useState({});
    const navigate = useNavigate();
    const handleClose = () => {
        setShow(false);
    }


    const { getInputProps: getProfileInputProps, getRootProps: getProfileRootProps, acceptedFiles: acceptedProfileFiles, isDragActive: isprofileDragActive } = useDropzone({
        accept: {
            'image/jpeg': ['.jpeg', '.png']
        },
        minSize: 0,
        maxFiles: 1,
        maxSize: 5242880,
        // onDrop: (acceptedFiles) => {
        //     if (acceptedFiles.length > 0) {
        //         setCollegeMou(acceptedFiles);
        //     }
        // },
    })

    const { getInputProps: getLogoInputProps, getRootProps: getLogoRootProps, acceptedFiles: acceptedLogoFiles, isDragActive: isLogoDragActive } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
        },
        minSize: 0,
        maxFiles: 1,
        maxSize: 5242880,
        // onDrop: (acceptedFiles) => {
        //     if (acceptedFiles.length > 0) {
        //         setCollegeMou(acceptedFiles);
        //     }
        // },
    })

    const { getInputProps: getMouInputProps, getRootProps: getMouRootProps, acceptedFiles: acceptedMouFiles, isDragActive: isMouDragActive } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
        },
        minSize: 0,
        maxFiles: 1,
        maxSize: 5242880,
        // onDrop: (acceptedFiles) => {
        //     if (acceptedFiles.length > 0) {
        //         setCollegeMou(acceptedFiles);
        //     }
        // },
    })

    const handleDownload = (file, fileName) => {
        const a = document.createElement('a');
        a.href = file;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    const handleLogout = () => {
        if (localStorage.getItem("role") === "user") {
            localStorage.removeItem("role");
            localStorage.removeItem("name");
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            setShow(false)
            navigate("/");
        }
    };


    useEffect(() => {
        if (acceptedLogoFiles.length > 0) {
            setCertificates(acceptedLogoFiles[0]);
        }
    }, [acceptedLogoFiles]);

    useEffect(() => {
        if (acceptedMouFiles.length > 0) {
            setInternship(acceptedMouFiles[0])
        }
    }, [acceptedMouFiles]);

    useEffect(() => {
        if (acceptedProfileFiles.length > 0) {
            setProfileImg(acceptedProfileFiles[0])
        }
    }, [acceptedProfileFiles]);

    const handleLogin = async () => {
        try {
            const data = await authenticateUser("ishanagjain@gmail.com", "sandesh");
            dispatch({
                type: userActions.GET_PROFILE_DATA,
                payload: data?.data?.info
            })
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }
    };


    useEffect(() => {
        handleLogin()
    }, [])




    const uploadDoc = async () => {
        try {
            const data = await submitCertificate(profileImg, intership, certificates);
            toast.dismiss();
            toast.success("Data uploaded Successfully");
            handleLogin()
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }
    };








    return (

        <div id="addCollegeOverlay" className={`addCollegeModal ${show ? "show" : "hide"}`}>
            <div id="addCollege" className={`addColleges ${show ? "articleShow" : "articleHide"}`}>
                <div className="modal-header">
                    <div>Profile</div>
                    <img src={cross} alt="" onClick={handleClose} />
                </div>
                <div className="modal-body" style={{
                    display: "flex",
                    // justifyContent: 'space-around',
                    flexDirection: "column",
                    gap: '20px'
                }}>
                    <div className='profileImgStudent'>
                        <div><img alt='' src={userProfile?.profile !== 'NA' ? userProfile?.profile : Object.keys(profileImg)?.length > 0 ? URL.createObjectURL(profileImg) : profile} /></div>
                        <span>{userProfile?.fullName}</span>
                        <span>{userProfile?.collegeName}</span>
                        {userProfile.profile === "NA" &&
                            < div {...getProfileRootProps()}>
                                <input {...getProfileInputProps()} />
                                <div className="uploadImgProfile">
                                    <img src={uploadImg} alt="" style={{
                                        cursor: "pointer"
                                    }} />
                                </div>
                            </div>}

                    </div>
                    <div className='profileDetailsStudent'>
                        <div className='ProfileDetailsDiv'>
                            <span>Email ID</span>
                            <span>{userProfile?.emailId}</span>
                        </div>
                        <div className='ProfileDetailsDiv'>
                            <span>Contact Number</span>
                            <span>{userProfile?.contact}</span>
                        </div>
                        <div className='ProfileDetailsDiv'>
                            <span>Current Semester</span>
                            <span>{userProfile?.currentSem}</span>
                        </div>
                        <div className='ProfileDetailsDiv'>
                            <span>Domain</span>
                            <span>{userProfile?.domain}</span>
                        </div>
                        <div className='ProfileDetailsDiv'>
                            <span>Current Course</span>
                            <span>{userProfile?.domain}</span>
                        </div>
                        <div className='ProfileDetailsDiv'>
                            <span>Internship</span>
                            <div>
                                {

                                    userProfile?.workCertificate !== "NA" ?
                                        <div
                                            style={{
                                                display: 'flex',
                                                width: '100%',
                                                padding: '0px 3px',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                // gap: '5px',
                                                borderRadius: '2px',
                                                color: '#424242',
                                                fontSize: '12px',
                                                outline: 'none',
                                                // border: '1px solid black'
                                            }}
                                        >

                                            <div
                                                className=""
                                                style={{
                                                    borderRadius: '4px',
                                                    height: '20px',
                                                    width: '20px',
                                                    padding: '4px',
                                                    backgroundColor: '#654E8A',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignContent: 'center',
                                                    cursor: 'pointer',
                                                    // border:'1px solid black'
                                                }}
                                                onClick={() => handleDownload(userProfile?.workCertificate, `${userProfile?.fullName}_internship`)}
                                            >
                                                <img src={downloadIcon} alt="" />
                                            </div>
                                        </div>
                                        :
                                        Object.keys(intership)?.length === 0 ?
                                            <div  {...getMouRootProps()}>
                                                <input {...getMouInputProps()} />
                                                <button>Upload</button>
                                            </div>
                                            :
                                            <div className='uploadFileName'>
                                                <span className=''>{intership?.path}</span>
                                                <img onClick={() => setInternship({})} src={cross} alt='' />
                                            </div>
                                }
                            </div>
                        </div>

                        <div className='ProfileDetailsDiv'>
                            <span>Certifications</span>
                            {

                                userProfile?.courseCertificate !== "NA" ?
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                            padding: '0px 3px',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            // gap: '5px',
                                            borderRadius: '2px',
                                            color: '#424242',
                                            fontSize: '12px',
                                            outline: 'none',
                                            // border: '1px solid black'
                                        }}
                                    >

                                        <div
                                            className=""
                                            style={{
                                                borderRadius: '4px',
                                                height: '20px',
                                                width: '20px',
                                                padding: '4px',
                                                backgroundColor: '#654E8A',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                                cursor: 'pointer',
                                                // border:'1px solid black'
                                            }}
                                            onClick={() => handleDownload(userProfile?.courseCertificate, `${userProfile?.fullName}_certificate`)}
                                        >
                                            <img src={downloadIcon} alt="" />
                                        </div>
                                    </div>
                                    :
                                    Object.keys(certificates)?.length === 0 ?
                                        <div  {...getLogoRootProps()}>
                                            <input {...getLogoInputProps()} />
                                            <button>Upload</button>
                                        </div>
                                        :
                                        <div className='uploadFileName'>
                                            <span className=''>{certificates?.path}</span>
                                            <img onClick={() => setCertificates({})} src={cross} alt='' />
                                        </div>
                            }
                        </div>
                    </div>
                    <div className='ProfileLogoutButton'>
                        {
                            (Object.keys(profileImg)?.length > 0 || Object.keys(intership)?.length > 0 || Object.keys(certificates)?.length > 0) ? <button onClick={uploadDoc}>Upload</button>
                                :
                                <button onClick={handleLogout}>Logout</button>
                        }

                    </div>
                </div>
            </div>
        </div >
    );
}
export default StudentProfile;


