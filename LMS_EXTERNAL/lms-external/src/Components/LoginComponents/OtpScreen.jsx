import React, { createRef, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { GlobalContext } from '../../Context/GlobalContext';
import { globalActions } from '../../Context/GlobalActions';
import { encryptToken } from '../../Utils/encryptDecrypt';
import { userActions } from '../../Views/User/Context/userAction';

const OtpScreen = ({ setCurrentForm }) => {
    const [inputRefs, setInputRefs] = useState([]);
    const [inputValue, setInputValue] = useState(['', '', '', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const { otpUser, dispatch } = useContext(GlobalContext)

    const handleOTP = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (inputValue.every((digit) => /^\d$/.test(digit))) {
            try {
                const data = await otpUser(localStorage.getItem("email"), inputValue.join(''));
                toast.dismiss();
                toast.success("OTP verfied")
                localStorage.setItem("role", data?.data?.info?.role);
                localStorage.setItem("name", data?.data?.info?.fullName);
                // localStorage.setItem("token", encryptToken(data?.data?.token));
                localStorage.setItem("token",data?.data?.token);
                localStorage.setItem("email", data?.data?.info?.emailId);
                dispatch({
                    type: globalActions.SET_USER_TYPE,
                    payload: data?.data?.info?.role,
                });
                dispatch({
                    type: userActions.GET_PROFILE_DATA,
                    payload:  data?.data?.info
                })
                setCurrentForm("newPassword");
                setInputValue(['', '', '', '', '', ''])
            } catch (error) {
                setInputValue(['', '', '', '', '', ''])
                toast.dismiss();
                toast.error(error?.message);
            }
        } else {
            setErrorMessage('Please enter a valid 6-digit OTP');
            setInputValue(['', '', '', '', '', ''])
        }
    };

    useEffect(() => {
        const arr = [];
        [1, 2, 3, 4, 5, 6]?.forEach(() => {
            arr.push(createRef());
        });
        setInputRefs(arr);
    }, []);

    const handleInputChange = (index, e) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            setInputValue((prev) => {
                const arr = [...prev];
                arr[index] = value;
                return arr;
            });
            if (index < inputRefs.length - 1 && value.length === 1) {
                inputRefs[index + 1].current.focus();
            }
        }
    };

    return (
        <div className="loginFormCollege">
            <div>
                <div>One time password</div>
                <div>for {localStorage.getItem("email")}</div>
            </div>
            <form className="loginCollegeStudent" onSubmit={handleOTP}>
                <div>
                    <div className="otpUserDiv">
                        {inputRefs?.map((ref, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={ref}
                                value={inputValue[index]}
                                onChange={(e) => handleInputChange(index, e)}
                            />
                        ))}
                    </div>
                    {errorMessage.length > 0 && <div className="errorOtp">{errorMessage}</div>}
                </div>
                <div className="loginCollegeStudentDiv" style={{ marginTop: '6px' }}>
                    <button className="signInLoginCollege" type="submit">
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};
export default OtpScreen;