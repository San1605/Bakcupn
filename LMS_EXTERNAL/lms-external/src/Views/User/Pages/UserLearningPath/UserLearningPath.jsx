import React, { useContext, useEffect } from 'react'
import "./UserLearningPath.css"
import { learningPathsImg } from "../../Assets/userIcons"
import CourseCard from '../../Components/CourseCard/CourseCard'
import toast from 'react-hot-toast'
import { GlobalContext } from '../../../../Context/GlobalContext'
import { userActions } from '../../Context/userAction'
const UserLearningPath = () => {
    const { setLoading, getCourseListUser, dispatch, enrolledCourseList } = useContext(GlobalContext);


    async function getCourseListApi() {
        setLoading(true);
        try {
            const response = await getCourseListUser();
            dispatch({
                type: userActions.ENROLLED_COURSE_LIST,
                payload: response?.data
            })
        }
        catch (error) {
            toast.dismiss();
            toast.error(error?.message);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCourseListApi()
    }, [])


    return (
        <div className='userLearningPath'>
            {enrolledCourseList?.map((item, index) =>
                <CourseCard
                    key={index}
                    {...item}
                />
            )
            }
            {enrolledCourseList?.length <= 4 && <img className='learningPathImg' src={learningPathsImg} alt='' />}
        </div>
    )
}

export default UserLearningPath
