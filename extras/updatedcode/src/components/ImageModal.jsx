import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/pagination";
import cross from "../assets/images/cross.webp";
import { Navigation, Zoom } from "swiper/modules";
import zoomin from "../assets/images/zoomin.webp";
import zoomout from "../assets/images/zoomout.webp";
import { ThreeDots } from "react-loader-spinner";
const ImageModal = ({ message , images}) => {
  const [isRendered, setIsRendered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const swiperRef = useRef(null);
  const modalRef = useRef(null);
  const handleZoomIn = () => {
    const swiper = swiperRef.current.swiper;
    if (swiper) {
      swiper.zoom.in(1.5);
    }
  };
  useEffect(() => {
    modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);
  const handleZoomOut = () => {
    const swiper = swiperRef.current.swiper;
    if (swiper) {
      swiper.zoom.out(1.5);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRendered(true);
    }, 10);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      className={`d-flex flex-column gap-2 transition-opacity duration-300 bg-[#F9F9F9] shadow-lg rounded-md px-4 py-2 ${
        isRendered ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* <div className="bg-white p-4 shadow-md w-[90%] md:w-[75%] lg:w-[40%] min-h[40vh] max-h-[85vh] rounded-lg relative"> */}
      <div ref={modalRef} className="">
        <div className="flex justify-between ">
          <h3 className="text-black text-base font-semibold">
            Message
          </h3>
          {/* <button
            className=""
            onClick={() => {
              onClose()
              // setShowModal(false);
            }}
          >
            <img className="h-6" src={cross} alt="" />
          </button> */}
        </div>
        {images?.length > 0 &&  <div className=" bg-white border border-[#E6E6E6]">
        
          <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={1}
          zoom={true}
          // pagination={true}
          navigation={true}
          modules={[Zoom, Navigation]}
          className="mySwiper "
          style={{
            "--swiper-navigation-size": "20px",
            "--swiper-theme-color": "#00829b ",
          }}
        >
          {!loaded && (
            <SwiperSlide>
              <div className="flex justify-center items-center h-40">
                <ThreeDots
                  height="20"
                  width="60"
                  radius="9"
                  color="#00829B"
                  ariaLabel="three-dots-loading"
                  visible={true}
                />
              </div>
            </SwiperSlide>
          )}
          {images?.map((item, index) => {
            return (
              <SwiperSlide key={index} className="flex h-full items-center">
                <div className="swiper-zoom-container max-h-[35vh]">
                  <img
                    className="w-full min-w-[40vw] h-[35vh]"
                    onLoad={() => setLoaded(true)}
                    style={{
                      padding: "1rem 4rem",
                      marginTop: "1rem",
                      objectFit: "contain",
                    }}
                    src={item}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
          <div className="grid grid-cols-3 mr-2">
            <div></div>
            <div className="text-center text-gray-300">Double tap to zoom</div>
            <div className="flex justify-end items-end">
              <img
                className="mx-0.5 mb-2 h-8 cursor-pointer"
                onClick={handleZoomIn}
                src={zoomin}
                alt=""
              />
              <img
                className="mx-0.5 mb-2 h-8 cursor-pointer"
                onClick={handleZoomOut}
                src={zoomout}
                alt=""
              />
            </div>
          </div>
        </div>
        }
      </div>
      <h4 className='p-2 max-h-27vh min-h-auto flex items-start gap-4 rounded-md bg-white text-gray-600 font-open-sans font-medium text-sm overflow-y-auto'>{message}</h4>
    </div>
  );
};

export default ImageModal;
