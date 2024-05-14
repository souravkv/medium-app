import { useState } from 'react'
import Appbar from '../components/Appbar'
import InfoCard from '../components/InfoCard'
import { useBlogs } from '../components/hooks'
import Post from './Post';

function Blog() {

    const { loading, blogs }: { blogs: { title: string; content: string; id: string }[]; loading: boolean } = useBlogs();
    const [post, setpost] = useState(false);




    if (loading) {

        return <div className=' w-screen h-screen flex flex-col justify-center items-center '>





            <div className="animate-spin inline-block size-20 border-[6px] border-current border-t-transparent text-black rounded-full dark:text-black" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>




        </div>
    }

    return (
        <div>
            <Appbar />


            <div className=' w-screen h-screen grid grid-cols-3'>
                <div className=' col-span-2  border-r border-gray-300  flex flex-col overflow-scroll  items-center '>

                    <div className='  '>

                        <InfoCard author='Ramachandran Nayar' title='Programming Principles They Dont Teach ' desc='Inroduction to important principles you should know ' />
                        {blogs.map(blog =>

                            // ts-ignore
                            <InfoCard key={blog.id} author='Mohammad Afsal' title={blog.title} desc={blog.content} />

                        )}




                    </div>
                </div>
                <div className=' p-6'>
                    <div onClick={() => { setpost(!post) }} className=' bg-black  inline-block font-thin uppercase text-white p-3 hover:bg-slate-700 hover:cursor-pointer  rounded-lg'>Post a Blog</div>
                    <div>
                        {post ? <Post onclick={() => { setpost(!post) }} /> : null}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Blog