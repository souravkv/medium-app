import React from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import { BsBookmarkDash } from "react-icons/bs";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
function InfoCard({ author, title, desc, cata }) {
    return (
        <div className='  w-[47vw] mt-8'>
            {/* Programming Principles They Dont Teach */}
            {/* Inroduction to important principles you should know */}

            <div>
                <div className=' flex justify-between mb-5'>

                    <div className=' w-3/4' >

                        <div className=' font-thin'>{author}</div>
                        <div>{title}</div>
                        <div className=' font-light'>{desc}</div>
                        <div>
                            <div id='timecontainer ' className=' text-center  flex mt-10  justify-between'>
                                <div className=' flex justify-between   '>

                                    <div className=' px-2 text-xs rounded-xl bg-gray-100 p-1 '>Programming</div>
                                    <div className=' px-2 font-light text-xs p-1 '>10min read</div>
                                </div>

                                <div className=' flex justify-between'>
                                    <div className=' px-2 text-xs p-1 '><BsBookmarkDash size={20} /></div>
                                    <div className=' px-2 text-xs p-1 '><HiArrowPathRoundedSquare size={20} /></div>
                                    <div className=' px-2 text-xs p-1'><HiDotsHorizontal size={20} /></div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <img src='https://miro.medium.com/v2/resize:fill:224:224/1*CSkWEvo1fC6bDLjopJ3-DQ.png' className='  w-24 h-30 object-contain object-top  '></img>

                </div>


            </div>



        </div >


    )
}

export default InfoCard