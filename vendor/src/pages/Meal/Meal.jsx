import React, { useEffect, useState } from 'react'
import FoodCard from '../../Components/FoodCard/FoodCard'
import lunch from "../../assets/lunch.png"
import "../../Components/lunch.css"
import Feedback from '../../Components/Feedback/Feedback'
import "./meal.css"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import dinner from "../../assets/dinner.png"
import "../../Components/dinner.css"
import { addMenuApi, downloadApi, getCardDataApi, getTicketApi } from '../../api/vendor'
import Loader from '../../Components/Loader/Loader'

const Meal = () => {
    const [isResp, setIsResp] = useState(window.innerWidth <= 768);
    const [foodCardData, setFoodCardData] = useState([]);
    const [valueLunch, setValueLunch] = useState("");
    const [valueDinner, setValueDinner] = useState("");
    const [isSpecial, setIsSpecial] = useState(0);
    const [loadingFoodData, setLoadingFoodData] = useState(true);
    const [isloading, setisLoading] = useState(true);
    const [state, setState] = useState("lunch");
    const [tickets, setTickets] = useState([]);
    const [selectedRadio, setSelectedRadio] = useState("normal")


    useEffect(() => {
        const handleResize = () => {
            setIsResp(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const foodCard = [
        {
            location: "Total",
            lunchCount: 500,
            dinnerCount: 400,
            color: "bg-[#EFF1FF]"
        },
        {
            location: "Malviya Nagar",
            lunchCount: 500,
            dinnerCount: 400,
            color: "bg-[#FBEFFF]"
        },
        {
            location: "Mansarovar",
            lunchCount: 500,
            dinnerCount: 400,
            color: "bg-[#EFFCFF]"
        },
        {
            location: "Jhalana",
            lunchCount: 500,
            dinnerCount: 400,
            color: "bg-[#FFFEEF]"
        }
    ]

    const getFoodCardData = async () => {
        setLoadingFoodData(true)
        const res = await getCardDataApi();
        console.log(res?.data)
        setFoodCardData(res?.data)
        setLoadingFoodData(false)
    }

    useEffect(() => {
        getFoodCardData()
    }, [])

    const downLoadData = async () => {
        try {
            const res = await downloadApi();
            const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            console.log(blob, "blob")
            const url = window.URL.createObjectURL(blob);
            console.log(url, "url")
            const a = document.createElement('a');
            a.href = url;
            a.download = 'feedback.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
        catch (error) {
            console.log(error)
        }
    }


    const addMenuLunch = async () => {
        try {
            const res = await addMenuApi("lunch", valueLunch, isSpecial);
            console.log(res)
        }
        catch (error) {
            console.log(error)
        }
    }

    const addMenuDinner = async () => {
        try {
            const res = await addMenuApi("dinner", valueDinner);
            console.log(res)
        }
        catch (error) {
            console.log(error)
        }
    }


    const getTickets = async () => {
        setisLoading(true)
        const res = await getTicketApi(state);
        console.log(res?.data?.message)
        setTickets(res?.data?.message)
        setisLoading(false)
    }
    useEffect(() => {
        getTickets();
    }, [state])


    if (loadingFoodData || isloading) {
        return <Loader />
    }

    return (
        <div className='w-[100%]  lg:h-[42.7rem] flex flex-col'>
            <div className='flex flex-row justify-between h-[8.35rem] mt-[1rem] px-3 ml-[3.5rem] mr-[1rem] foodcardClass'>
                {
                    isResp ? (
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            className="swiper-container-custom"
                        >
                            {
                                foodCardData?.map((card, index) => (
                                    <SwiperSlide key={card}>
                                        <FoodCard  {...card} color={foodCard[index].color} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>)
                        :
                        (
                            foodCardData.map((card, index) => (
                                <FoodCard  {...card} color={foodCard[index].color} />
                            ))
                        )
                }

            </div>
            <div className=' flex flex-row meal ml-[4.25rem] mr-[2rem] mt-[1.5rem] justify-between'>
                <div className=' rounded-2xl shadow-xl  h-[33.75rem] w-[44%] p-[1.5rem] mealLeft flex flex-col justify-between'>
                    <h1 className='font-[600] text-[20px] '>Update Meal</h1>
                    {/* <Lunch /> */}
                    <div className='h-[11.063rem] w-[38vw] border border-[#BC7B40] rounded-lg bg-[rgb(254,248,240)] p-[1rem] flex flex-row items-center lunchDiv'>
                        <div className='w-[32%] lunchImgDiv'>
                            <img className='w-[10vw] h-[18vh] lunchImg' src={lunch} alt="" />
                        </div>
                        <div className='w-[68%]  flex flex-col h-[9.063rem] lunchRight'>
                            <h3 className='mt-[0.5rem]  text-black text-[16px] font-[600] font-sans'>Lunch </h3>

                            <div >
                                <label className='text-[14px] font-[400] text-[#484644] '>
                                    <input className='mr-[0.5rem] accent-[#8589EF]' type="radio" value="normal" checked={selectedRadio === "normal"} onChange={() => {
                                        setIsSpecial(0)
                                        setSelectedRadio("normal")
                                    }} />
                                    Normal
                                </label>

                                <label className='ml-[1rem] text-[14px] font-[400] text-[#484644]'>
                                    <input className='mr-[0.5rem] accent-[#8589EF]' type="radio" value="special" checked={selectedRadio === "special"}
                                        onChange={() => {
                                            setIsSpecial(1)
                                            setSelectedRadio("special")
                                        }} />
                                    Special
                                </label>
                            </div>

                            <p className='text-[#484644] font-[600] text-[15px] '>Description</p>
                            <textarea className='h-[3.438rem] w-[24vw] border border-[#BC7B40] rounded-[4px] lunchText' onChange={(e) => setValueLunch(e.target.value)} />
                        </div>

                    </div>
                    {/* <Dinner /> */}

                    <div className='h-[11.063rem] w-[38vw] border border-[#5B5FC7] rounded-lg bg-[#F3F6FF] p-[1rem] flex flex-row items-center dinnerDiv '>
                        <div className='w-[32%] dinnerImgDiv'>
                            <img className='w-[10vw] h-[18vh]  dinnerImg' src={dinner} alt="" />
                        </div>
                        <div className='w-[68%]  flex flex-col h-[9.063rem] dinnerRight'>
                            <h3 className='mt-[0.5rem]  text-black text-[16px] font-[600] font-sans '>Dinner</h3>
                            <p className='text-[#484644] font-[600] text-[14px] '>Description</p>
                            <textarea className='h-[5.5rem] w-[24vw] border border-[#8589EF] rounded-[4px] dinnerText' onChange={(e) => setValueDinner(e.target.value)} />
                        </div>
                    </div>

                    <div className='flex flex-row justify-end w-[33rem'>
                        <button className='h-[2.438rem] w-[11.5rem] border border-[#8589EF] rounded-[4px] bg-white text-[#242424] font-[600] text-[16px] cancel' >Cancel</button>
                        <button className='h-[2.438rem] w-[11.5rem] border border-[#5B5FC7] rounded-[4px] bg-[#5B5FC7] ml-[1rem] text-[#FFFFFF]  font-[600] text-[16px] submit' onClick={() => {
                            addMenuLunch()
                            addMenuDinner()
                        }} >Submit</button>
                    </div>
                </div>

                <div className='h-[33.75rem] rounded-2xl shadow-xl w-[54%] p-[1.5rem] flex flex-col mealRight '>
                    <div className='flex flex-row justify-between '>
                        <h1 className='font-[600] text-[20px] ' >Feedback</h1>
                        <button className='h-[2rem] w-[6.688rem]  border border-black bg-[#5B5FC7] rounded-[4px] text-white text-[16px] font-[600] download ' onClick={downLoadData}>Download</button>
                    </div>
                    <Feedback isResp={isResp} setState={setState} tickets={tickets} state={state} />
                    {
                        isResp && <div className=' text-right'>
                            <button className='h-[2.5rem] w-[5.5rem]  border border-black bg-[#5B5FC7] rounded-[4px] text-white text-[14px] font-[600] right-0 mr-0  ' onClick={downLoadData}>Download</button>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
export default Meal