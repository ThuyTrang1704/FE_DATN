import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useReducer, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Khởi tạo trạng thái ban đầu
const initialAPI = {
  isAuthenticated: false,
  userRole: null,
  error: null,
};

// Hàm reducer
const reducerAPI = (state, action) => {
  switch (action.type) {
    case "authenticateUserSuccess":
      return {
        ...state,
        isAuthenticated: true,
        userRole: action.payload.role,
        error: null,
      };
    case "authenticateUserFailure":
      return {
        ...state,
        isAuthenticated: false,
        userRole: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

// Context API
const APIContext = createContext();
// Provider
const APIContextProvider = ({ children }) => {
  const [state, dispatchAPI] = useReducer(reducerAPI, initialAPI);
  const [exam, setListExam] = useState(null); // state của mygame dùng để đổ ra danh sách các lớp học
  const [questionByID, setQuestionByID] = useState(null); // state question ứng với một class
  const [flagUpdate, setFlagUpdate] = useState(false);
  const navigate = useNavigate();
  const authenticateUser = async ({ email, password }) => {
    console.log(email, password);
    try {
      const response = await axios.post("http://localhost:8085/api/login", {
        email,
        password,
      });

      const data = jwtDecode(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", data.roles[0].authority);
      dispatchAPI({
        type: "authenticateUserSuccess",
        payload: { role: data.roles[0].authority },
      });
      // navigate("/helloword");

      if (data.roles[0].authority === "Role_Admin") {
        navigate("/user"); 
      } else if (data.roles[0].authority === "Role_Student") {
        navigate("/helloword");
      } else {
        navigate("/helloword");
      }
    } catch (err) {
      dispatchAPI({
        type: "authenticateUserFailure",
        payload: { error: err.response.data.message },
      });
      alert(err.response.data.message);
    }
  };
  const getAllExameLecturer = async () => {
    await axios
      .get("http://localhost:8085/api/exam/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setListExam(res.data.contents);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const getQuestionByID = async () => {
    const classInfo = JSON.parse(localStorage.getItem("class"));
    await axios
      .get(`http://localhost:8085/api/exam/exam_id=${classInfo.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setQuestionByID(res.data.questionDTOS);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const upDateQuestionByID = async (data) => {
    await axios
      .put(`http://localhost:8085/api/question/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(data.id);
        alert(err.response.data.errors.message);
      });
  };
  const deleteQuestionByID = async (id) => {
    await axios
      .delete(`http://localhost:8085/api/question/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setFlagUpdate((flag) => !flag);
        alert("Thành công");
      })
      .catch((err) => {
        alert("Không thể xóa");
      });
  };
  const createQuestionByID = async (data) => {
    const classInfor = localStorage.getItem("class");
    const objectClass = JSON.parse(classInfor);
    console.log(objectClass.id);
    await axios
      .post(
        `http://localhost:8085/api/question/examId=${objectClass.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("thanh cong");
        setFlagUpdate((flag) => !flag);
      })
      .catch((err) => {
        alert(err.response.data.errors.message);
      });
  };
  const registerAPI = async (user) => {
    console.log("helllo");
    await axios
      .post("http://localhost:8085/api/register", user)
      .then(() => {
        alert("thanh cong");
      })
      .catch((err) => {
        console.log(err);
        alert("Thất bại");
      });
  };
  const getTestByKindStructureId = async (id) => {
    console.log("GetTestBy_KindStructure");
    await axios
      .get(`http://localhost:8085/api/ExamTest/${id}`)
      .then(() => {
        alert("thanh cong");
      })
      .catch((err) => {
        console.log(err);
        alert("Thất bại");
      });
  };

  return (
    <APIContext.Provider
      value={{
        registerAPI,
        flagUpdate,
        setFlagUpdate,
        createQuestionByID,
        deleteQuestionByID,
        upDateQuestionByID,
        getQuestionByID,
        questionByID,
        setQuestionByID,
        state,
        authenticateUser,
        getAllExameLecturer,
        exam,
        setListExam,
        getTestByKindStructureId,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

// Hook để sử dụng Context
export const useAPIConText = () => useContext(APIContext);

export default APIContextProvider;
