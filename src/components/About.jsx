import React from 'react'

const About = () => {
    return (
      <div name='about' className='w-full h-screen bg-[#0a192f] text-gray-300'>
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
            <div className='sm:text-right pb-8 pl-4'>
              <p className='text-4xl font-bold inline border-b-4 border-pink-600'>
                About
              </p>
            </div>
            <div></div>
            </div>
            <div className='max-w-[1200px] w-full grid sm:grid-cols-2 gap-8'>
              <div className='sm:text-right text-3xl font-bold'>
                <p>Hey {String.fromCodePoint('0x1f44b')} Welcome to my portfolio! <br></br>I'm thrilled that you're here. Please take a look around.</p>
              </div>
              <div className='text'>
                <p> 
                I'm a creative and versatile Developer with a passion for data analytics. 
                My goal is to use my skills and experience to bring unique and impactful ideas to life.
                I've had the privilege of working with a diverse range of clients and projects, 
                from school suffs to media business, and from data analysis to web/app development. 
                <br></br>
                When I'm free, you can find me exploring places, seeking inspiration in music, playing FIFA and 
                connecting with like-minded individuals.
                <br></br>
                {/* I am a Nepali who had the opportunity to come to the US as an international 
                student which has enriched my life in countless ways, providing me with a unique 
                perspective of life. This journey has taught me the value of resilience, determination, 
                and hardwork navigating through new cultures, overcome language barriers, and adapt to a new way of life.
                <br></br> */}
                </p>  
              </div>
            </div>
            <div className='sm:text-center font-bold'>
                <p>
                <br></br>Thank you for taking the time to get to know me a little better. 
                I hope you'll enjoy exploring my portfolio and seeing my work. <br></br>
                If you have any questions or would like to work together, feel free to reach out.</p>
            </div>
        </div>
      </div>
    );
  };

export default About
