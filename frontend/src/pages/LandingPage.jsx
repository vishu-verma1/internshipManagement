import React, { useEffect } from 'react';
import { Star } from 'lucide-react';
import Footer from '@/components/Footer';
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';


const LandingPage = () => {
     const companies = [
    { name: 'Google', logo: '/images/google.png' },
    { name: 'Microsoft', logo: '/images/microsoft.png' },
    { name: 'Amazon', logo: '/images/amazone.png' },
    { name: 'Facebook', logo: '/images/intel.png' },
    { name: 'Apple', logo: '/images/accenture.png' },
    { name: 'Netflix', logo: '/images/netflix.png' },
  ];

    const navigate = useNavigate()

    const location = useLocation();

    useEffect(() => {
        if (location.state?.scrollTo === 'about-us') {
            const aboutUsSection = document.getElementById('about-us');
            if (aboutUsSection) {
                aboutUsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <>


            <div>
                {/* Introduction Section */}
                <section className="bg-gray-200 py-20 text-center">
                    <h1 className="text-6xl font-bold mb-4 text-[#292966]">Welcome to BridgeCareer</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-5">
                        Your one-stop platform for connecting talented individuals with top companies offering internships.
                    </p>

                    <Button
                        className="cursor-pointer hover:bg-[#292966] mb-3"
                        onClick={() => navigate('/register/user')} // Navigate to user registration page
                    >
                        Get Started
                    </Button>

                    <div className='flex w-full gap-10 px-5 py-2  items-center'>
                        <div className='w-1/2 text-center'>
                            <h3 className='font-bold text-2xl mb-5 flex flex-col'>Empowering Futures <span className='text-xl font-semibold text-[#574964]'>Bridging Students and Companies Through Internships.</span></h3>
                            <p className=''>In today's competitive job market, gaining practical experience through internships is crucial for students to enhance their skills and employability. Simultaneously, companies seek fresh talent to bring innovative ideas and perspectives to their teams. InternConnect bridges this gap by providing a user-friendly platform that connects students with companies offering diverse internship opportunities.</p>

                        </div>
                        <div className=' w-1/2 p-5'>
                            <img src="/images/intro.jpg" alt="Introduction" className="rounded shadow-lg object-cover object-center " />
                        </div>
                    </div>
                </section>



                {/* Why Choose Us Section */}
                <section className="bg-[#CCCCFF] py-8 text-center" id="why-choose-us">
                    <h2 className="text-3xl font-bold mb-9">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto   ">
                        <div className="p-6 border rounded-lg shadow-md bg-[#FFDAB3]">
                            <h3 className="text-xl font-semibold mb-2">User-Centric Design</h3>
                            <p className="text-gray-600"> Our platform is designed with both students and companies in mind, ensuring a seamless and intuitive experience for all users</p>
                        </div>
                        <div className=" bg-[#FFDAB3] p-6 border rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Skill Development</h3>
                            <p className="text-gray-600">Internships are more than just a line on your resume; they're a chance to acquire hands-on experience and develop essential skills. From technical proficiencies to soft skills like communication and teamwork. </p>
                        </div>
                        <div className=" bg-[#FFDAB3] p-6 border rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Skill-Based Matching</h3>
                            <p className="text-gray-600">Get matched with internships that align with your skills and interests and we strive to promote equal opportunities by connecting students from diverse backgrounds with inclusive employers</p>
                        </div>


                    </div>

                    <div className='flex w-full gap-10 px-5 py-2 justify-center mt-10 items-center'>

                        <div className="w-2/5 p-2">
                            <img
                                src="/images/whychoose1.jpg"
                                alt="Why Choose Us"
                                className="rounded shadow-lg object-cover object-center cursor-pointer"
                                onClick={() => navigate('/success-stories')}
                            />
                        </div>

                        <div className='w-1/2 '>
                            <h3 className='font-bold mb-2 text-xl'>Success Stories</h3>
                            <p>Many students have kickstarted their careers through internships found on our platform, gaining invaluable experience and securing full-time positions. Companies have also benefited by integrating fresh talent into their teams, leading to innovative ideas and long-term hires. These success stories underscore the platform's role in shaping the future workforce.</p>

                        </div>


                    </div>
                </section>

                {/* About Us Section */}
                <section className="bg-gray-100 py-10 text-center" id="about-us">
                    <h2 className="text-3xl font-bold mb-6">About us</h2>
                    <div className=" flex items-center mt-5 justify-center">
                        <div className='w-1/2' >
                            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                                We’re not just a platform—we’re a bridge. A bridge between ambition and opportunity, between learning and doing, between students ready to launch their careers and companies ready to shape the future.
                            </p>

                        </div>


                        <div className="w-2/5 p-5">
                            <img
                                src="/images/aboutUs1.jpg"
                                alt="About Us"
                                className="rounded shadow-lg object-cover object-center cursor-pointer"
                                onClick={() => navigate('/about-us')}
                            />
                        </div>


                    </div>

                    <div className=' h-96 flex justify-center mt-10 mb-10 '>
                        <div className='w-1/2 p-2 bg-[#292966] text-white rounded-md shadow-lg px-5 flex flex-col justify-center '>
                            <h5 className='text-3xl font-semibold'>Reach Out To Our Headquarters</h5>

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

                    {/* <div className=' w-full '>
                        <img src="/images/topcompanies.png" alt="Introduction" className="rounded shadow-lg object-cover object-center w-full  " />
                    </div> */}

                    <div className="mt-16  ">
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

                </section>

                {/* Reviews Section */}
                <section className="bg-white py-10 text-center" id="contact-us">
                    <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-6 border rounded-lg shadow-md">
                            <div className='flex gap-3 items-center mb-5'>
                                <span className='h-9 w-9 rounded-full overflow-hidden flex items-center justify-center'>
                                    <img className='h-full w-full object-cover' src="/images/rating1.png" alt="picture" />
                                </span>
                                <h5 className='font-semibold'>YOGESH SINGH</h5>
                            </div>
                            <p className="text-gray-600 italic">"BridgeCareer helped me land my dream internship!"</p>
                            <div className="flex justify-center mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="text-yellow-500" />
                                ))}
                            </div>
                        </div>
                        <div className="p-6 border rounded-lg shadow-md">

                            <div className='flex gap-3 items-center mb-5'>
                                <span className='h-9 w-9 rounded-full overflow-hidden flex items-center justify-center'>
                                    <img className='h-full w-full object-cover' src="/images/rating2.png" alt="picture" />
                                </span>
                                <h5 className='font-semibold'>AVANTIKA</h5>
                            </div>



                            <p className="text-gray-600 italic">"The platform is easy to use and has great opportunities."</p>
                            <div className="flex justify-center mt-4">
                                {[...Array(4)].map((_, i) => (
                                    <Star key={i} className="text-yellow-500" />
                                ))}
                            </div>
                        </div>
                        <div className="p-6 border rounded-lg shadow-md">

                            <div className='flex gap-3 items-center mb-5'>
                                <span className='h-9 w-9 rounded-full overflow-hidden flex items-center justify-center'>
                                    <img className='h-full w-full object-cover object-center' src="/images/rating1.png" alt="picture" />
                                </span>
                                <h5 className='font-semibold'>EAREN YEAGER</h5>
                            </div>


                            <p className="text-gray-600 italic">"Highly recommend BridgeCareer for students!"</p>
                            <div className="flex justify-center mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="text-yellow-500" />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};

export default LandingPage;