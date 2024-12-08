import React, { useState, useEffect } from "react";
import { CheckCircleIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@chakra-ui/react";
import { useStateContext } from "../../../lib/context/StateContextProvider";
import axios from "axios";

import debounce from 'lodash.debounce';


const CreateStructure = () => {
  const [skillList, setSkillList] = useState([]);

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

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/filterSructure`, {
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
      setSkillList(data.contents);
      setPageNumber(data.pageNumber);
      setTotalPage(data.totalPages);

    } catch (error) {
      console.error('Error fetching data:', error);
      setSkillList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, pageNumber, pageSize, keyword]);

  const getPartById = (partId) => {
    switch (partId.toString()) {
      case '1': return "Part_5: Reading";
      case '2': return "Part_1: Listening";
      case '3': return "Part_2: Listening";
      case '4': return "Part_3: Listening";
      case '5': return "Part_4: Listening";
      case '6': return "Part_6: Reading";
      case '7': return "Part_7: Reading";
      default: return "New Part";
    };
  };
  return (
    <div className="w-full h-full p-12">
      <h1 className="font-semibold my-12 text-center text-3xl">Structure Manage</h1>
      {/* <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center float-left">
        <PlusIcon className="h-5 w-5 mr-2" />
        Add
      </button> */}
      <div className="mt-4 mb-2">
        <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="search"
          placeholder="Search..."
          value={keyword}
          onChange={handleSearch}
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">STT</th>
            <th className="border px-4 py-2">number_of_topic</th>
            <th className="border px-4 py-2">level_of_topic</th>
            <th className="border px-4 py-2">name</th>
            {/* <th className="border px-4 py-2">kind_of_structure_id</th> */}
            <th className="border px-4 py-2">Part</th>
            {/* <th className="border px-4 py-2">test</th> */}
            {/* <th className="border px-4 py-2">action</th> */}
          </tr>
        </thead>
        <tbody>
          {skillList.map((skill, index) => (
            <tr key={skill.id}>
              <td className="border px-4 py-2">{skill.id}</td>
              <td className="border px-4 py-2">{skill.number_of_topic}</td>
              <td className="border px-4 py-2">{skill.level_of_topic}</td>
              <td className="border px-4 py-2">{skill.name}</td>
              {/* <td className="border px-4 py-2">{skill.kind_of_structure_id}</td> */}
              <td className="border px-4 py-2">{getPartById(skill.part_id)}</td>
              {/* <td className="border px-4 py-2">{skill.test}</td> */}
              {/* <td className="border px-4 py-2 flex justify-center">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
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

export default CreateStructure;