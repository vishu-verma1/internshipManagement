import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const AboutUs = () => {
    const companies = [
        { name: 'Google', logo: '/images/google.png' },
        { name: 'Microsoft', logo: '/images/microsoft.png' },
        { name: 'Amazon', logo: '/images/amazone.png' },
        { name: 'Facebook', logo: '/images/intel.png' },
        { name: 'Apple', logo: '/images/accenture.png' },
        { name: 'Netflix', logo: '/images/netflix.png' },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Who We Are</h1>
            <div className="flex flex-col items-center">
                {/* Image */}
                <div className="w-full max-w-lg mb-6">
                    <img
                        src="/images/aboutUs.png"
                        alt="About Us"
                        className="rounded-lg shadow-lg object-cover object-center w-full"
                    />
                </div>

                {/* Content */}
                <div className="text-gray-700 text-lg space-y-6">
                    {/* <h2 className="text-2xl font-semibold mb-4"></h2> */}
                    <p>
                        We’re not just a platform—we’re a bridge. A bridge between ambition and opportunity, between learning and doing, between students ready to launch their careers and companies ready to shape the future.
                    </p>
                    <p>
                        We offer an easy-to-use online platform that connects companies with students looking for internships. Our goal is simple: to help companies find the right interns, and to help students find the best opportunities to learn and grow. Whether you’re a business searching for young talent or a student hoping to kickstart your career, our platform is built to make the process smooth, fast, and effective.
                    </p>
                    <p>
                        For companies, we provide a smart and organized space to post internship openings. Whether it’s a short-term online role or a full-time in-office internship, companies can share all the important details—like job tasks, required skills, duration, stipend, and deadlines. It doesn’t matter if you’re a startup or a large organization; with our platform, you can easily reach thousands of eager students. You can also manage all your postings in one place, review applications, talk to candidates, and even schedule interviews—saving time and effort.
                    </p>
                    <p>
                        For students, our platform is a one-stop destination to explore a wide variety of internships. You can find internships that match your interests, studies, and future goals. Whether you're looking for opportunities in tech, marketing, design, or any other field, we’ve got options from companies of all sizes. You can search by location, industry, stipend, work mode (online or offline), and more. Each internship listing gives you a clear picture of what the role is about and what the company expects—so you can apply with confidence.
                    </p>
                    <p>
                        Students can also create their own profiles on the platform. You can upload your resume, add your skills and achievements, and keep track of all your applications. This makes it easier for companies to find you too. Everything is designed to help you stay organized and focused on your career journey.
                    </p>
                    <p>
                        What makes our platform special is that it works well for both sides. Companies get the tools they need to find the right people. Students get a simple way to find and apply for internships that fit them best. We believe that internships are a key part of career development, and we’re here to make sure they’re easy to access for everyone.
                    </p>
                    <p>
                        Our platform is more than just a job board—it’s a growing community where students can gain real-world experience, and companies can discover fresh talent. By bringing both groups together, we help create meaningful connections that can lead to future jobs, learning opportunities, and career growth.
                    </p>
                    <p>
                        In short, we are building a better way for students and companies to find each other, connect, and succeed together.
                    </p>

                    
                </div>

                
            </div>

            <div className='  w-full bg-red-200 flex justify-center mt-10 mb-10 '>
                        <div className='w-full py-5  bg-[#5C5C99] text-white rounded-md shadow-lg px-5 flex flex-col justify-center '>
                            <h5 className='text-3xl text-center font-semibold'>Reach Out To Our Headquarters</h5>

                            <div className='flex mt-8 text-2xl gap-3 '>
                                <ul className='text-left font-semibold'>areerBridge HQ

                                    <li> 91 FutureWorks Tower,</li>
                                    <li> Innovation Park Road,Bengaluru, </li>
                                    <li>India – 560100</li>
                                    <li>📞 +91-123-456-7890✉️ info@careerbridge.com</li>

                                </ul>

                                <ul className='text-left font-semibold'>North Branch Office: CareerBridge North Office
                                    <li> 2nd Floor, Learning Hub Plaza,</li>
                                    <li> Connaught Place, New Delhi – 110001 </li>
                                    <li>📞 +91-987-654-3210</li>

                                </ul>
                            </div>
                        </div>
                    </div>

            {/* Top Companies Slider */}
            <div className="mt-16">
                <h2 className="text-3xl font-bold text-center mb-8">Top companies who trust us</h2>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={4}
                    speed={3000}
                    autoplay={{ delay: 1000 }}
                    loop={true}
                    modules={[Autoplay]}
                    className="w-full"
                >
                    {companies.map((company, index) => (
                        <SwiperSlide key={index} className="flex justify-center">
                            <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded-full shadow-lg">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="w-24 h-24 object-contain"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default AboutUs;
