import React, { useState } from 'react';
import { toast } from 'sonner';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                setResponseMsg(data.message);
                setFormData({ name: '', email: '', message: '' });
                toast("Submitted");
            } else {
                setResponseMsg(data.error || 'Something went wrong');
                toast("Something went wrong");
            }
        } catch (error) {
            toast("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-6 text-black text-center">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
                Have questions or need assistance? Fill out the form below or reach us through our contact details.
            </p>

            <div className="w-full flex flex-col lg:flex-row items-center justify-center ">
                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md p-6 w-full gap-3 flex max-w-3xl rounded-md "
                >

                    <div className='w-full'>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-[#574964] focus:border-[#574964]"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-[#574964] focus:border-[#574964]"
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-1 resize-none block w-full p-2 border border-gray-300 rounded-md focus:ring-[#574964] focus:border-[#574964]"
                                placeholder="Your Message"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#574964] cursor-pointer text-white py-2 px-4 rounded-md hover:bg-[#6a5b7a] transition"
                        >
                            Send Message
                        </button>
                        {responseMsg && <p className="mt-4 text-center text-sm text-green-600">{responseMsg}</p>}
                    </div>

                    <div className="w-full max-w-xl ">
                        <img
                            className="w-full h-full object-cover object-center"
                            src="/images/contact.png"
                            alt="Contact Us"
                        />
                    </div>
                </form>

                {/* Image Section */}

            </div>
        </div>
    );
};

export default ContactUs;
