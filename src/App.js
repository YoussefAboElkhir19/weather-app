import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import { clear } from "@testing-library/user-event/dist/clear";

const ApiKey = "a37696939029f42b2a9ce7bbf5695cea";
const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Bucharest");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [errormsg, setErrorMsg] = useState("");

  const handelInput = (e) => {
    setInputValue(e.target.value);
  };
  // console.log(inputValue);
  const handelSubmit = (e) => {
    console.log(inputValue);
    if (inputValue !== "") {
      setLocation(inputValue);
    }
    // clear
    const input = document.querySelector("input");
    input.value = "";
    // if search empty
    if (input.value === "") {
      setAnimate(true);
    }
    // after 500 ms animate false
    setTimeout(() => {
      setAnimate(false);
    }, 500);

    // prevent default
    e.preventDefault();
  };

  //************fetch Data
  useEffect(() => {
    // set Loading if true
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${ApiKey}`;

    // to get Data
    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          // if loading data setLoading false
          setLoading(false);
        }, 500);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMsg(error);
      });
  }, [location]);
  // console.log(data);
  // error massage
  useEffect(() => {
    const timer = setTimeout(() => {
      // clear Massage error after 2000
      setErrorMsg("");
      // clear timer
      return () => clearTimeout(timer);
    }, 2000);
  }, [errormsg]);

  //***if Page  is false  show loader
  if (!data) {
    return (
      <div>
        <div className="h-screen bg-gradientBg flex items-center justify-center">
          <ImSpinner8 className="text-5xl text-white animate-spin" />
        </div>
      </div>
    );
  }
  // set icon according waether
  let icon;
  // console.log("Weather", data);
  //**********Maake Swthic to casess */
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }
  // to Get Date  By JS
  const date = new Date();
  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px:0 lg:px:0">
      {/* error Massage  */}
      {errormsg && (
        <div className="w-full  max-w-[90-vw] lg:max-w-[450px] text-center mt-16 capitalize bg-[#ff208c] p-3 rounded-md text-white   ">{`${errormsg.response.data.message}`}</div>
      )}
      {/* form */}
      <form
        className={`h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] my-4 ${
          animate ? "animate-shake" : "animate-none"
        } `}
      >
        <div className="h-full relative flex items-center justify-between p-2 ">
          <input
            onChange={(e) => handelInput(e)}
            className="flex-1 bg-transparent placeholder:text-white text-white text-[15px] font-light pl-6 h-full outline-none"
            type="text"
            placeholder="Search By City Or Country  "
          />
          <button
            onClick={(e) => handelSubmit(e)}
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center translation "
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}
      {Loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <ImSpinner8 className="animate-spin text-5xl text-white" />
        </div>
      ) : (
        <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
          <div>
            {/* card Top  */}
            <div className=" flex items-center gap-x-5">
              {/* Icon  */}
              <div className="text-[87px] ">{icon}</div>
              <div>
                {/* country Name  */}
                <div className="text-2xl font-semibold">
                  {data.name} , {data.sys.country}
                </div>
                {/* Dateee */}
                <div>
                  {date.getUTCDate()} / {date.getUTCMonth() + 1} /{" "}
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* card body  */}
            <div className="my-20">
              <div className="flex justify-center items-center ">
                {/* Temp  */}
                <div className="text-[144px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                {/* celies Icon */}
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className="text-2xl capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
            {/* card bottom  */}
            <div className="flex justify-between  gap-3">
              {/* Left Col  */}
              <div className="flex flex-col gap-3">
                {/* Visiabilty  */}
                <div className="flex items-center  ">
                  {/* Icon  */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div className="ml-2">
                    Visiabilty <span>{data.visibility / 1000} km</span>
                  </div>
                </div>
                {/* Humidity */}
                <div className="flex items-center gap-x-2">
                  {/* Icon  */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div className="">
                    Humidity
                    <span className=" ml-2 ">{data.main.humidity}% </span>
                  </div>
                </div>
              </div>
              {/* rigth col  */}
              <div className="flex flex-col gap-3">
                {/* Fells like */}
                <div className="flex items-center gap-x-1 ">
                  {/* Icon  */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Fells like
                    <div className="flex ml-2 ">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
                {/* item 4  */}
                <div className="flex items-center gap-x-1">
                  {/* Icon  */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div className="ml-2">
                    Wind
                    <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
