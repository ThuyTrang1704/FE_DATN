import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import HeaderUser from "../HeaderUser";
import FooterUser from "../FooterUser";

const Contact = () => {
    const [profile, setProfile] = useState([]);
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('test send mail FE');
    const [text, setText] = useState('');
    const token = localStorage.getItem("token");


    const fetchData = async () => {
        const isConfirmed = window.confirm("Xác nhận gửi mail.");

        if (!isConfirmed) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append("to", to);
            formData.append("subject", subject);
            formData.append("text", text);
            

            const response = await axios.post(`http://localhost:8085/mail/send`, {
                params: {
                    to: to,
                    subject: subject,
                    text: text
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                    'Content-Type': 'application/json',
                    // 'Origin': 'http://localhost:5173'
                }   
            });
            console.log(response.data);
            console.log("gửi mail thành công");

        } catch (error) {
            console.error('Lỗi ở đây:', error);
        }
    };
    const handleSendMail = () => {
        fetchData();
    };

    const handleEmailChange = (event) => {
        setTo(event.target.value);
    };
    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    useEffect(()=> {
        console.log("to", to);
    },[to])
    return (
        <div>
            <HeaderUser />

            <h1 className="text-5xl font-bold text-center mx-auto mt-16 mb-10">Need Help? Just fullfil in this form</h1>
            <h2 className="text-3xl text-center mx-auto">Our team will contact you soon</h2>
            <div className="container w-3/4 max-w-xs mx-auto mt-20">
                <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full mx-auto">
                    <div className="flex flex-row space-x-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                        </div>
                        <div>
                            <label
                                type="email"
                                id="to"
                                name="to"
                                value={to}
                                className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input 
                                onChange={handleEmailChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            name="text"
                            value={text}
                            onChange={handleTextChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" type="text" placeholder="Message"></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => fetchData()}
                            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Đăng ký
                        </button>
                    </div>
                </form>
            </div>
            <FooterUser />
        </div>
    );
}
export default Contact;   
