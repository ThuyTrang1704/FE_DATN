import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from 'lodash.debounce';
import { format, parseISO } from 'date-fns';



import HeaderUser from "../HeaderUser";
import FooterUser from "../FooterUser";
import test from "node:test";

const Profile = () => {
    const [incrementalId, setIncrementalId] = useState(1);

    const [check, setCheck] = useState(false);

    const [profile, setProfile] = useState([]);
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    let navigate = useNavigate();

    const [confirmChange, setConfirmChange] = useState(false);

    const token = localStorage.getItem('token');

    const [resultList, setResultList] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [keyword, setKeyword] = useState('');

    const [debouncedKeyword, setDebouncedKeyword] = useState('');
    const updateKeyword = debounce((value) => {
        setDebouncedKeyword(value);
    }, 2000);

    useEffect(() => {
        return () => {
            updateKeyword.cancel();
        };
    }, []);

    const handleSearch = (e) => {
        const { value } = e.target;
        setKeyword(value);
        updateKeyword(value);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8085/api/filterUserResult`, {
                params: {
                    pageNumber,
                    pageSize,
                    keyword
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            console.log(1);

            const data = response.data;
            setResultList(data.contents);
            setPageNumber(data.pageNumber);
            setTotalPage(data.totalPages);

        } catch (error) {
            console.error('Error fetching data:', error);
            setResultList([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token, pageNumber, pageSize, keyword]);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/api/user/profile/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(response.data);
                setProfile(response.data);
                setName(response.data.name);
                setAddress(response.data.address);
                setPhoneNumber(response.data.phoneNumber);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProfile();
    }, []);

    //api thay đổi thông tin cá nhân
    const handleSave = async () => {
        try {
            const response = await axios.put('http://localhost:8085/api/user/updateNguoiDung', {
                name,
                address,
                phoneNumber,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Profile updated successfully:', response.data);
            // setCheck(true);
            window.location.reload();
            // fetchProfile();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const formatDate = (dateStr) => {
        // chuyển ISO date thành date object
        const date = parseISO(dateStr);

        // sửa format date thành dd/MM/yyyy HH:mm:ss
        const formattedDate = format(date, 'dd/MM/yyyy HH:mm:ss');

        return formattedDate;
    }
    //xác nhận làm lại bài cũ
    const handleConfirmNavigation = (path) => () => {
        const isConfirmed = window.confirm('Bạn có muốn làm lại bài kiểm tra này không?');
        if (isConfirmed) {
            navigate(path);
        }
    };
    const handleReviewNavigation = (path) => () => {
        const isConfirmed = window.confirm('Bạn có muốn xem lại bài kiểm tra đã làm không?');
        if (isConfirmed) {
            navigate(path);
        }
    };
    return (
        <div>
            <HeaderUser />

            <h1 className="text-5xl font-bold text-center mx-auto mt-16 mb-10">MY PROFILE</h1>
            <div className="w-1/2 mx-auto profile-info text-center">
                <table className="table-auto w-full mt-4 border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Field</th>
                            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Information</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Email</td>
                            <td className="border border-gray-300 px-4 py-2">{profile.email}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Name</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <input
                                    type="text"
                                    placeholder={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded "
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Address</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <input
                                    type="text"
                                    placeholder={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Phone Number</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <input
                                    type="text"
                                    placeholder={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Password</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <a href="/#" className="text-blue-600 hover:text-blue-800 no-underline">change password</a>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="text-center py-4">
                                <button type="submit"
                                    onClick={handleSave}
                                    className="mx-auto px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
                                    Save
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <table className="table-auto w-4/5 mt-10 mx-auto">
                <thead>
                <tr>
                    <th className="border px-4 py-2" style={{ backgroundColor:'#CFEBFC' }}>STT</th>
                    <th className="border px-4 py-2"style={{ backgroundColor: '#CFEBFC' }}>TotalMark</th>
                    <th className="border px-4 py-2"style={{ backgroundColor: '#CFEBFC' }}>Status</th>
                    <th className="border px-4 py-2"style={{ backgroundColor: '#CFEBFC' }}>DateTime</th>
                    <th className="border px-4 py-2"style={{ backgroundColor: '#CFEBFC' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {resultList.map((result, index) => (
                    <tr key={result.id}>
                        <td className="border px-4 py-2 text-center">{pageNumber * pageSize + index + 1}</td>
                        <td className="border px-4 py-2 text-center">{result.totalMark}</td>
                        <td className="border px-4 py-2 text-center">{result.status}</td>
                        <td className="border px-4 py-2 text-center">{formatDate(result.createAt)}</td>
                        <td className="border px-4 py-2 flex justify-center">
                            <button
                                onClick={handleConfirmNavigation(`/testExam/${result.structureId}`)} 
                                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Rebuild
                            </button>
                            <button 
                                onClick={handleReviewNavigation(`/reviewExam/${result}`)} 
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
                                Review
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>

            <FooterUser />
        </div>
    );
}
export default Profile;   
