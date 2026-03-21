'use client';

import React, { useState } from 'react';
import { services } from '@/lib/constants';
import { toast } from 'react-toastify';

interface ContactProps {
    title?: string;
}

const Contact: React.FC<ContactProps> = ({ title }) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("Mumbai");
    const [service, setService] = useState(services[0]);

    const handleSubmit = async () => {
        toast.dismiss();
        const toastId = toast.loading('Processing...', { type: 'info', theme: 'colored' });
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    subject: `Business Enquiry - (${title})`,
                    message: `
            <small> Source: Ention Website </small>
            <br />
            <p>Email: ${email}</p>
            <p>Phone No: ${phone}</p>
            <br />
            <p>City: ${city}</p>
            <br />
            <br />
            <p>Service: ${service}</p>
            <br />
            <p> I would like to dicuss regarding <b>${title}</b>
          `
                })
            });

            const data = await res.json();
            const status = res.status;

            toast.update(toastId, {
                render: status === 200
                    ? "We've received your request, will get back to you soon!"
                    : (data.error || "Failed to deliver your message. Please try again later."),
                type: status === 200 ? 'success' : 'error',
                isLoading: false,
                autoClose: 4000
            });
        } catch (error) {
            toast.update(toastId, {
                render: "Network error. Please try again later.",
                type: 'error',
                isLoading: false,
                autoClose: 4000
            });
        }
    };

    return (
        <div className='w-full max-w-[380px] max-h-fit p-4 lg:p-6 rounded-md bg-white text-black text-center shadow-lg'>
            <h2 className="text-xl lg:text-3xl font-bold">Get started!</h2>
            <input
                className='mt-6 w-full h-10 px-2 rounded-md bg-[#F0F1F3]'
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className='mt-4 w-full h-10 px-2 rounded-md bg-[#F0F1F3]'
                type="text"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <select
                id="city"
                name="city"
                className="mt-4 w-full h-10 px-2 rounded-md bg-[#F0F1F3] outline-none text-black"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            >
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Other">Other</option>
            </select>
            <select
                id="service"
                name="service"
                className="mt-4 w-full h-10 px-2 rounded-md bg-[#F0F1F3] outline-none text-black"
                value={service}
                onChange={(e) => setService(e.target.value)}
            >
                {services.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <button
                className='mt-8 w-full h-10 px-2 rounded-md bg-[#007E9E] text-white hover:bg-[#005F77] transition-colors'
                onClick={handleSubmit}
            >
                Connect With Us
            </button>
        </div>
    );
};

export default Contact;
