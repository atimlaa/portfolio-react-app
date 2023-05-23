import React from 'react'

const Contact = () => {
  return (
    <div name='contact' className='w-full h-screen bg-[#0a192f] flex justify-center items-center p-4'>
        <form method='POST' action="https://getform.io/f/8b5e41f0-2843-4cf6-b4d8-d10697e27cb3" className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-4'>
                <p className='text-4xl font-bold inline border-b-4 border-red-500 text-gray-300'>Contact</p>
                <p className='text-gray-300 py-4'>Submit the form below or shoot me an email at aryantimla@gmail.com</p>
            </div>
            <input className='bg-[#fafbfc] p-2' type="text" placeholder='Name' name='name' />
            <input className='my-4 p-2 bg-[#fafbfc]' type="email" placeholder='Email' name='email' />
            <textarea className='bg-[#fafbfc] p-2' name="message" rows="10" placeholder='Message'></textarea>
            <button className='text-white border-2 hover:bg-red-500 hover:border-red-500 px-4 py-3 my-8 mx-auto flex items-center'>Let's Connect</button>
        </form>
    </div>
  )
}

export default Contact