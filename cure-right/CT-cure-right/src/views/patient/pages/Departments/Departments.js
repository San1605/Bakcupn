import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";

import OrganCard from "../../components/OrganCard/OrganCard";
import SpecializationCard from "../../components/SpecializationCard/SpecializationCard";
import nextBtn from "../../../../assets/icons/button2.svg";
import prevBtn from "../../../../assets/icons/button3.svg";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Departments.css";
import {
  getSpecialistDataPatient,
  getOrgansList,
} from "../../../../services/patientApi";
import Loader from "../../../../components/Loader/Loader";

const Departments = () => {
  const [organList, setOrganList] = useState([]);
  const [specialityList, setSpecialityList] = useState([]);
  const [specialityNameList, setSpecialityNameList] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(0);

  const [organListLoading, setOrgenListLoading] = useState();
  const [specialityListLoading, setSpecialityListLoading] = useState();

  const responsive = {
    0: { items: 1 },
    100: { items: 1 },
    200: { items: 1 },
    300: { items: 1.8 },
    400: { items: 2.5 },
    500: { items: 3 },
    600: { items: 3.5 },
    700: { items: 4 },
    800: { items: 4.5 },
    900: { items: 5.5 },
    // 1000: { items: 7 },
    // 1100: { items: 8 },
    1200: { items: 7 },
    // 1300: { items: 10 },
    // 1400: { items: 11 },
    // 1500: { items: 12 },
    // 1600: { items: 14 },
  };

  const responsive2 = {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 3.8 },
  };

  const handleClickSpecialistActive = (specialityItemName) => {
    setSelectedSpeciality(specialityItemName);
    if (specialityItemName === "All") {
      setSpecialityList(
        specialityList?.sort(function (a, b) {
          return a?.specialityTitle.toLowerCase() >
            b?.specialityTitle.toLowerCase()
            ? 1
            : -1;
        })
      );
    } else {
      const selectedSpecialityCard = specialityList?.find(
        (data) => data?.specialityTitle === specialityItemName
      );
      const notSelectedSpecialityArr = specialityList.filter(
        (data) => data?.specialityTitle !== specialityItemName
      );
      setSpecialityList([selectedSpecialityCard, ...notSelectedSpecialityArr]);
    }
  };

  const getOrganList = async () => {
    setOrgenListLoading(true);
    try {
      let res = await getOrgansList();
      setOrganList(res?.data?.data);
    } catch (err) {
      console.log("getOrganList", err);
    }
    setOrgenListLoading(false);
  };

  const getSpecialistData = async () => {
    setSpecialityListLoading(true);
    try {
      const res = await getSpecialistDataPatient();
      let specialityTitleList = res?.data?.data.map((speciaLity, index) => {
        return speciaLity.specialityTitle;
      });
      console.log(specialityTitleList);
      setSpecialityNameList(specialityTitleList);
      setSpecialityList(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
    setSpecialityListLoading(false);
  };

  useEffect(() => {
    getOrganList();
    getSpecialistData();
  }, []);

  return (
    <>
      {!organListLoading || !specialityListLoading ? (
        <div className="departments-page pb-3">
          <div className=" home-top row m-0 p-0 w-100">
            <div className="mb-2 p-0">
              <h3 className="heading-overview mb-1">Departments</h3>
              <h2 className="heading-homepage">Departments</h2>
            </div>
          </div>
          <div>
            <div className="organs-carousel-cont">
              <p className="pre-text mb-3">As Per Organs</p>
              <div className="organs-cards-cont">
                <AliceCarousel
                  renderPrevButton={({ isDisabled }) => (
                    <button className="prevBtn">
                      <img src={prevBtn} alt="" />
                    </button>
                  )}
                  renderNextButton={({ isDisabled }) => (
                    <button className="nextBtn">
                      <img src={nextBtn} alt="" />
                    </button>
                  )}
                  responsive={responsive}
                  items={[
                    ...organList?.map((item) => (
                      <OrganCard
                        key={item.Id}
                        data={{ image: item.image, organName: item.name }}
                      />
                    )),
                  ]}
                />
              </div>
            </div>
            <div className="pt-12px">
              <div className="speacialist-cont pb-0">
                <p className="pre-text mb-2">Specialist</p>

                <div className="specialist_div d-flex mb-3 ms-1 me-3 w-100% flex-wrap">
                  {["All", ...specialityNameList].map(
                    (specialityName, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleClickSpecialistActive(specialityName)
                        }
                        className={
                          selectedSpeciality === specialityName
                            ? "activeButton"
                            : "specialist2"
                        }
                      >
                        {specialityName}
                      </button>
                    )
                  )}
                </div>

                <div className="speacialist-cards-cont">
                  <AliceCarousel
                    renderPrevButton={({ isDisabled }) => (
                      <button className="prevBtn">
                        <img src={prevBtn} alt="" />
                      </button>
                    )}
                    renderNextButton={({ isDisabled }) => (
                      <button className="nextBtn">
                        <img src={nextBtn} alt="" />
                      </button>
                    )}
                    responsive={responsive2}
                    items={[
                      ...specialityList.map((speciaLity, index) => {
                        return (
                          <SpecializationCard
                            data={{
                              image: speciaLity.image,
                              departmentName: speciaLity.specialityTitle,
                              departmentAbout: speciaLity.description,
                              numberOfDoctors: speciaLity.numberOfDoctors,
                              surgeriesPerformed: speciaLity.surgeriesPerformed,
                            }}
                            key={index}
                          />
                        );
                      }),
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Departments;
