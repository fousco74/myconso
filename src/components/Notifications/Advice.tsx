import Image from 'next/image';
import AdviceContent from './AdviceContent';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import {  useContext } from "react";
import { UserAuth } from '../../../Hooks/UseAuth';





export default function Advice() {
  const userAuth = useContext(UserAuth);
  
  return (
    <div className="rounded-xl w-full md:w-52 h-52 md:h-60 border bg-notif1 flex flex-col items-center p-2 md:p-4 relative">
      <div className="flex p-2 md:p-4 gap-3 md:gap-6 text-sm md:text-base...">
      <div className="flex   justify-center gap-2 items-center ">

        <h2 className="text-base">Notifications   {userAuth?.email }
        </h2>
            <Image
              src="/icons/clock.svg"
              alt="clock"
              width={15}
              height={15}
              className='absolute top-9 right-4'
            />
          </div>
        </div>
          <Swiper spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full">
          <SwiperSlide><AdviceContent /> 1</SwiperSlide>
      <SwiperSlide><AdviceContent /> 2</SwiperSlide>
      <SwiperSlide><AdviceContent /> 3</SwiperSlide>
      <SwiperSlide><AdviceContent /> 4</SwiperSlide>
      <SwiperSlide><AdviceContent /> </SwiperSlide>

       <div className="flex border w-full justify-between">
        <span className='swiper-button-prev obsolute h-[5px] w-[5px] left-0'></span>
         <span className='swiper-button-next right-0 h-[5px] w-[5px] absolute'></span>
       </div>
        </Swiper>
      </div>
  )
}