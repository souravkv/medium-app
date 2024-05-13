import React from 'react'

function Appbar() {
    return (
        <div className=' w-screen flex justify-between border border-gray-300    '>

            <div className='ml-5 p-3 '>Logo</div>
            <div className=' flex justify-between'>
                <div className=' p-3'>Contact</div>
                <div className=' p-3'>Home</div>
                <div className=' p-3 mr-5'>User</div>

            </div>
        </div>
    )
}

export default Appbar