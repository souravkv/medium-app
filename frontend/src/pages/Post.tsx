import React, { useState } from 'react'
import InputBox from '../components/InputBox'
import { PiMosque } from 'react-icons/pi'
import axios from 'axios'
import { BACKENDURL } from '../config'


function Post({ onclick }) {

    type postinf = {
        title: string,
        content: string
    }

    const [postinfo, setpostinfo] = useState<postinf>({
        title: "",
        content: ""
    })




    async function request() {
        console.log("yess")


        await axios.post(`${BACKENDURL}/api/v1/book/blog`, postinfo, {
            headers: { Authorization: "Bearer " + localStorage.getItem('token') }
        }
        )
    }


    return (
        <div>
            <div onClick={onclick} className='w-screen h-screen bg-black fixed top-0 absolute bg-opacity-60 left-0 flex flex-col  justify-center items-center'>
                <div onClick={(e) => { e.stopPropagation() }} className=' rounded-lg  w-[50vw] h-[28vh] bg-slate-100  '>


                    <div className=' justify-center w-100 text-center font-extrabold text-3xl p-3'> Post</div>
                    <div className=' w-full flex justify-center'>

                        <InputBox onchange={(e) => {
                            setpostinfo({
                                ...postinfo,
                                title: e.target.value
                            })
                        }} placer='Title...' title='Title' />

                        <InputBox onchange={(e) => {
                            setpostinfo({
                                ...postinfo,
                                content: e.target.value
                            })
                        }} title='Content' placer='content....' />
                    </div>
                    <div className=' w-full flex justify-center'>
                        <div onClick={request} className=' bg-black w-20  p-2 text-sm hover:bg-gray-700 hover:cursor-pointer  rounded-2xl mt-5 flex justify-center  text-white'>Submit</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Post