import React from 'react'
import {TailSpin} from "react-loader-spinner"
import Lottie from "react-lottie"
import "./Loader.css"
import animationData from "../loader.json"

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
}
const Loader = () => {
    return (
        <div className='loaderClass'>
            <Lottie options={defaultOptions} width={200} height={200} />


            {/* <TailSpin
                height="60"
                width="60"
                color="#100620E0"
                ariaLabel="tail-spin-loading"
                radius="2"
                wrapperStyle={{}}
                wrapperClass="loaderClass"
                visible={true}
            /> */}
        </div>
    )
}

export default Loader
