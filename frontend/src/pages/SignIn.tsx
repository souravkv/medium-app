import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Quotes from '../components/Quotes'
import InputBox from '../components/InputBox'
import { SigninType } from '@spexod/commonapp'
import axios from 'axios';
import { BACKENDURL } from '../config'
import { toast } from 'sonner'

function SignIn() {


    const navigate = useNavigate()
    const [postInputs, setpostInputs] = useState<SigninType>({
        email: "",
        password: ""


    })


    async function Request() {

        try {

            console.log(JSON.stringify(postInputs) + "kkkkk")
            const response = await axios.post(`${BACKENDURL}/api/v1/user/signin`, postInputs)
            if (response.data.token) {



                toast.success("Login Successful !! ")
                const jwt = response.data.token;
                console.log("ithan " + jwt)
                localStorage.setItem('token', jwt)

                return navigate('/blog')
            }
            console.log("cant login")

        }
        catch (e: any) {

            if (e.response.status == 411)

                toast.warning('Validation error!')

            if (e.response.status == 500)

                toast.warning('User Already Exists hmm !')
        }

    }
    return (

        <div className=' select-none grid grid-cols-1 md:grid-cols-2 '>

            <div className='w-full h-screen flex flex-col justify-center items-center '>
                <div className="cont">

                    <div className=' text-center font-black text-3xl'>Login</div>
                    <div className=' flex   items-center mt-3  justify-center mb-10 '>
                        <div className=' font-thin  '>Don't have an account?</div>
                        <Link to={'/signup'} className=' underline text-md px-2'> Sign Up</Link>

                    </div>


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

                    <div id='signInbtn' onClick={() => { Request() }} className=' shadow-xl   hover:bg-gray-700  bg-black w-full h-100px mt-5  text-center p-3 text-sm rounded-md text-white ' > Login</div>

                </div>
            </div>
            <div className=' hidden md:block'>

                <Quotes />
            </div>
        </div>
    )
}

export default SignIn