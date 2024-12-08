import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAPIConText } from "../../../lib/context/APIContextProvider";
import axios from "axios";

import HeaderUser from "../HeaderUser";
import FooterUser from "../FooterUser";



const CreateStructure = () => {
    let token = localStorage.getItem("token");
    let navigate = useNavigate();

    const getDataByData = (part_id) => {
        switch (part_id) {
            case '2': return "Part 1: Listening";
            case '3': return "Part 2: Listening";
            case '4': return "Part 3: Listening";
            case '5': return "Part 4: Listening";
            case '1': return "Part 5: Reading";
            case '6': return "Part 6: Reading";
            case '7': return "Part 7: Reading";
            default: return "Unknown Part";
        };
    };

    const getTotalQuestion = (numberTopic, partId) => {
        switch (partId) {
            case '2': return numberTopic * 1;
            case '3': return numberTopic * 1;
            case '4': return numberTopic * 3;
            case '5': return numberTopic * 3;
            case '1': return numberTopic * 1;
            case '6': return numberTopic * 4;
            case '7': return `${numberTopic * 2} - ${numberTopic * 5}`;
            default: return "Unknown Part";
        };
    };

    const [formData, setFormData] = useState({
        number_of_topic: '',
        level_of_topic: '',
        part_id: '',
    });

    const [formEntries, setFormEntries] = useState([]);
    const [editFormData, setEditFormData] = useState(null);
    const [number, setNumber] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmitForm = (e) => {
        e.preventDefault();

        const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');

        if (!allFieldsFilled) {
            alert('Vui lòng điền đủ thông tin cấu trúc!!!');
            return;
        }
        const isPartIdExist = formEntries.some(entry => entry.part_id === formData.part_id);

        if (isPartIdExist) {
            alert('Part đã tồn tại, vui lòng chọn Part khác.');
            return;
        }
        setFormEntries([...formEntries, formData]);
        setFormData({ number_of_topic: '', level_of_topic: '', part_id: '' });
    };


    //DELETE
    const handleDelete = (indexToDelete) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa topic này không?");
        if (isConfirmed) {
            const newFormEntries = formEntries.filter((_, index) => index !== indexToDelete);
            setFormEntries(newFormEntries);
        }
    };


    //EDIT
    const handleEditClick = (index) => {
        const formEntry = formEntries[index];
        setNumber(index);
        setEditFormData(formEntry);
    };

    const handleInputEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra xem có bất kỳ entry nào trong formEntries trùng với editFormData không
        const isDuplicate = formEntries.some((entry, idx) =>
            idx !== number && entry.part_id === editFormData.part_id
        );

        if (isDuplicate) {
            alert(`${getDataByData(editFormData.part_id)} đã tồn tại.`);
            return;
        }

        setFormEntries(currentEntries =>
            currentEntries.map((entry, idx) =>
                idx === number ? { ...entry, ...editFormData } : entry
            )
        );

        console.log(number);
        console.log(formEntries);
        console.log(editFormData);

        setEditFormData(null);
    };
    const handlEditclose = () => {
        setEditFormData(null);
    };



    const submitFormEntries = async () => {
        if (!formEntries || formEntries.length === 0) {
            alert("Bạn chưa thêm cấu trúc nào.");
            return;
        }


        const isConfirmed = window.confirm("Bạn chắc chắn muốn làm cấu trúc này chứ?");
        if (isConfirmed) {
            const url = 'http://localhost:8085/api/saveStructure';
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formEntries),
                });

                if (!response.ok) {
                    throw new Error('Có lỗi đã xảy ra');
                }

                const responseData = await response.json();
                console.log('Success:', responseData);
                setFormEntries([]);
                navigate(`/testExam/${responseData}`);
            } catch (error) {
                console.error('Error:', error);
            }
        }

    };

    useEffect(() => {
        const handleBeforeUnload = e => {
            if (formEntries.length > 0) {
                e.preventDefault();
                e.returnValue = "Bạn có chắc chắn muốn rời đi? Thông tin bạn đã nhập có thể không được lưu.";
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [formEntries]);
    return (

        <div>
            <HeaderUser />
            <nav className="min-h-[500px]">

                <div className="w-2/3 mx-auto ">
                    <h1 className="mt-5 mb-5 font-bold text-center text-3xl " >Structure Form</h1>
                    <div className="flex justify-center items-center ">
                        <form onSubmit={handleSubmitForm}
                            className="w-1/2 border border-black-500 rounded p-4 space-y-4">
                            <select
                                name="part_id"
                                value={formData.part_id}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded w-full"
                            >
                                <option value=""> Part</option>
                                <option value="2">Part 1: Listening</option>
                                <option value="3">Part 2: Listening</option>
                                <option value="4">Part 3: Listening</option>
                                <option value="5">Part 4: Listening</option>
                                <option value="1">Part 5: Reading</option>
                                <option value="6">Part 6: Reading</option>
                                <option value="7">Part 7: Reading</option>
                            </select>
                            <select
                                name="level_of_topic"
                                value={formData.level_of_topic}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded w-full"
                            >
                                <option value="">Level</option>
                                <option value="easy">EASY</option>
                                <option value="average">AVERAGE</option>
                                <option value="hard">HARD</option>
                            </select>
                            <input
                                name="number_of_topic"
                                type="number"
                                value={formData.number_of_topic}
                                required
                                onChange={handleInputChange}
                                placeholder="Amount of question"
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                            <div className="flex justify-center">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Add Structure
                                </button>
                            </div>
                        </form>
                    </div>
                    <table className="min-w-full leading-normal mt-10">
                        <thead>
                            <tr>

                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Number of Topic
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Level
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Part
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Total Question
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {formEntries.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200">

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {item.number_of_topic}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {item.level_of_topic}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {getDataByData(item.part_id)}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {getTotalQuestion(item.number_of_topic, item.part_id)} câu
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button onClick={() => handleDelete(index)}
                                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 "
                                        >
                                            Xóa
                                        </button>
                                        <button onClick={() => handleEditClick(index)}
                                            className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition ">

                                            Edit
                                        </button>

                                    </td>
                                    {editFormData && (
                                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                                            <div className="bg-white p-4 rounded">
                                                <h2>Edit Structure</h2>
                                                <form onSubmit={handleEditFormSubmit}>
                                                    <input
                                                        name="number_of_topic"
                                                        type="number"
                                                        value={editFormData.number_of_topic}
                                                        onChange={handleInputEditChange}
                                                        placeholder="Amount of question"
                                                    />
                                                    <select
                                                        name="level_of_topic"
                                                        value={editFormData.level_of_topic}
                                                        onChange={handleInputEditChange}
                                                    >
                                                        <option value="">Chọn độ khó</option>
                                                        <option value="easy">easy</option>
                                                        <option value="average">average</option>
                                                        <option value="hard">hard</option>
                                                    </select>

                                                    <select
                                                        name="part_id"
                                                        value={editFormData.part_id}
                                                        onChange={handleInputEditChange}
                                                    >
                                                        <option value="">Chọn Part</option>
                                                        <option value="2">Part 1: Listening</option>
                                                        <option value="3">Part 2: Listening</option>
                                                        <option value="4">Part 3: Listening</option>
                                                        <option value="5">Part 4: Listening</option>
                                                        <option value="1">Part 5: Reading</option>
                                                        <option value="6">Part 6: Reading</option>
                                                        <option value="7">Part 7: Reading</option>
                                                    </select>
                                                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                        Save Changes
                                                    </button>
                                                    <button type="button" onClick={handlEditclose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
                                                        Cancel
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-10 mb-5">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                             onClick={submitFormEntries}
                        >
                            Begin The Test
                        </button>
                    </div>
                </div>
            </nav>
            <FooterUser />
        </div>
    );
}
export default CreateStructure; 