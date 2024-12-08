import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { CheckCircleIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@chakra-ui/react";
import { useStateContext } from "../../../lib/context/StateContextProvider";
import axios from "axios";

import debounce from 'lodash.debounce';
import "../question/question.css";

const CreateTopic = () => {
  let navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  const [topicList, setTopicList] = useState([]);
  const [questionData, setQuestionData] = useState({});

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [keyword, setKeyword] = useState('');
  const token = localStorage.getItem("token");

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
  const handleDeleteQuestion = async (id) => {
    try {
      const isConfirmed = window.confirm("Bạn có chắc muốn xóa câu hỏi này không?");
      if (!isConfirmed) {
        return;
      }

      const response = await axios.delete(`http://localhost:8085/api/questions/deleteQuestion`, {
        params: {
          questionId: id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Topic deleted successfully:', response.data);
      fetchData();
    } catch (error) {
      if (error.response.status === 409) {
        // Server responded with a status other than 2xx
        alert('câu hỏi đã được tạo bài kiểm tra không thể xóa');
      }
      else if (error.response.status === 403) {
        alert('Bạn không có quyền xóa câu hỏi này');
      }
      else if (error.response.status === 404) {
        alert('câu hỏi không tồn tại');
      }
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/questions/filterQuestion`, {
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
      setTopicList(data.contents);
      setPageNumber(data.pageNumber);
      setTotalPage(data.totalPages);

    } catch (error) {
      console.error('Error fetching data:', error);
      setTopicList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, pageNumber, pageSize, keyword]);

  const getPartById = (partId) => {
    switch (partId.toString()) {
      case '1': return "Part 5: Reading";
      case '2': return "Part 1: Listening";
      case '3': return "Part 2: Listening";
      case '4': return "Part 3: Listening";
      case '5': return "Part 4: Listening";
      case '6': return "Part 6: Reading";
      case '7': return "Part 7: Reading";
      default: return "Unknown Part";
    };
  };

  const getLevelById = (skillId) => {
    switch (skillId.toString()) {
      case '1': return "easy";
      case '2': return "average";
      case '3': return "hard";
      default: return "Unknown Level";
    };
  };
  const fetchQuestionById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8085/api/questions/oneQuestion/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setQuestionData(response.data); // Lưu trữ dữ liệu vào state
      setShowPopup(true); // Hiển thị popup
      console.log('lấy dữ liệu 1 câu hỏi thành công:', response.data);
    } catch (error) {
      console.error('lỗi dữ liệu 1 câu hỏi: ', error);
    }
  };
  return (
    <div className="w-full h-full p-12">
      <h1 className="font-semibold my-12 text-center text-3xl">Question Manage</h1>
      <button
        onClick={() => navigate('/question/addQuestion')}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center float-left">
        <PlusIcon className="h-5 w-5 mr-2" />
        Add
      </button>
      <div className="mt-4 mb-2">
        <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="search"
          placeholder="Search..."
          value={keyword}
          onChange={handleSearch}
        />
      </div>
      <table className="table-auto w-full min-h-[300px]">
        <thead>
          <tr>
            <th className="border px-4 py-2">STT</th>
            <th className="border px-4 py-2">Content</th>
            <th className="border px-4 py-2">Action</th>

          </tr>
        </thead>
        <tbody>
          {topicList.map((topic) => (
            <tr key={topic.id}>
              <td className="border px-4 py-2">{topic.id}</td>
              <td className="border px-4 py-2">{topic.name}</td>
              <td className="border px-4 py-2 flex justify-center">
                <button
                  onClick={() => fetchQuestionById(topic.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Details
                </button>
                <button
                  onClick={() => handleDeleteQuestion(topic.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && questionData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="fadein-animation bg-white shadow-md rounded p-6 relative w-3/4 max-w-2xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Question Detail</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                  Content
                </label>
                <input
                  id="question"
                  type="text"
                  value={questionData.name}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {questionData.answers.map((answer, index) => (
                <div className="mb-4" key={answer.id}>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`answer-${answer.id}`}>
                    Answer {index + 1}
                  </label>
                  <input
                    id={`answer-${answer.id}`}
                    type="text"
                    value={answer.content}
                    readOnly
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${answer.correctAnswer ? 'bg-green-100' : ''}`}
                  />
                </div>
              ))}
            </form>
          </div>
        </div>
      )}
      <div>
        <div>
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 0))}
            disabled={pageNumber === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>
          <span className="mx-4 text-lg font-bold">
            {pageNumber + 1} / {totalPage}
          </span>
          <button
            onClick={() => setPageNumber(prev => Math.min(prev + 1, totalPage - 1))}
            disabled={pageNumber === totalPage - 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTopic;