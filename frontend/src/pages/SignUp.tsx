import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Quotes from '../components/Quotes'
import InputBox from '../components/InputBox'
import { SignupType } from '@spexod/commonapp'
import axios from 'axios';
import { BACKENDURL } from '../config'
import { toast } from 'sonner'

function SignUp() {
    const navigate = useNavigate()



    const [postInputs, setpostInputs] = useState<SignupType>({
        email: "",
        password: "",
        name: " "


    })


    async function Request() {

        try {
            console.log(JSON.stringify(postInputs) + "kkkkk")
            const response = await axios.post(`${BACKENDURL}/api/v1/user/signup`, postInputs)
            const jwt = response.data.token
            localStorage.setItem('token', jwt)
            toast.success("SignUp Successful !! ")
            navigate('/blog')

        }
        catch (e: any) {

            if (e.response.status == 411)

                toast.warning('Validation error!')

            if (e.response.status == 500)

                toast.warning('User Already Exists !')
        }

    }
    return (

        <div className=' select-none grid grid-cols-1 md:grid-cols-2 '>

            <div className='w-full h-screen flex flex-col justify-center items-center '>
                <div className="cont">

                    <div className=' text-center font-black text-3xl'>Create An Account</div>
                    <div className=' flex   items-center mt-3 mb-5  justify-center'>
                        <div className=' font-thin  '>Already have an account?</div>
                        <Link to={'/signin'} className=' underline text-md px-2'> Login</Link>

                    </div>

                    {/* @ts-ignore */}
                    <InputBox title='Username' placer='Enter your username' onchange={(e) => {
                        setpostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />
                    {/* @ts-ignore */}
                    <InputBox title='Email' placer='Sui@mgil.com' onchange={(e) => {
                        setpostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                    {/* @ts-ignore */}
                    <InputBox title='Password' type='password' placer='' onchange={(e) => {
                        setpostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />

                    <div id='signupbtn' onClick={() => { Request() }} className=' bg-black w-full h-100px mt-5  text-center p-3 text-sm rounded-md text-white ' > Sign Up</div>

                </div>
            </div>
            <div className=' hidden md:block'>

                <Quotes />
            </div>
        </div>
    )
}

export default SignUp