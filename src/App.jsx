import React, { useEffect } from "react";
import { publicRoutes } from "./routes";
import { Route, Routes } from "react-router-dom";
import MainLayoutAdmin from "./lib/layouts/layouts.admin";
import Admin from "./routes/admin";
import CreateGame from "./routes/admin/creategame";
import MainLayoutUser from "./lib/layouts/layouts.user";
import User from "./routes/user";
import Mygames from "./routes/admin/mygames/indext";
import Login from "./routes/hompage/Login";
import Signup from "./routes/hompage/Signup";
import DialogLogin from "./routes/hompage/DialogLogin";
import Homepage from "./routes/hompage";
import Test from "./routes/test/Test";
import Update from "./routes/admin/mygames/updatequestion/Update";
import QuestionResult from "./routes/user/QuestionResult";
import ClassExame from "./routes/user/ClassExame";
import QuizApp from "./routes/user/QuizApp ";
import Helloword from "./routes/user/helloword";

import TestExam from "./routes/user/exam/testExam.jsx";

import CreateSkill from "./routes/admin/skill/createSkill";
import CreateLevel from "./routes/admin/level/createLevel";
import CreatePart from "./routes/admin/part/createPart";
import CreateQuestionManage from "./routes/admin/question/createQuestion1";
import CreateStructure from "./routes/admin/structure/createStructure";
import CreateTopic from "./routes/admin/Topic/createTopic";
import Contact from "./routes/user/contact/contact.jsx";
import ExamPage from "./routes/user/exam/examPage.jsx";
import CreateOwnStructure from "./routes/user/exam/CreateStructure.jsx";
import Profile from "./routes/user/contact/profile.jsx";
import CreateUser from "./routes/admin/User/createUser.jsx";
import Dashboard from "./routes/admin/dashboard/dashboard.jsx";

import MainTest from "../src/routes/user/exam/mainTest.jsx";
import MainStart from "../src/routes/user/exam/mainStart.jsx";

import AddPart from "./routes/admin/part/addPart.jsx";
import AddTopic from "./routes/admin/Topic/addTopic.jsx";
import AddQuestion from "./routes/admin/question/addQuestion.jsx";

import FirstPage from "./routes/user/firstPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage></Homepage>}>
        <Route
          path="/login"
          element={
            <DialogLogin>
              <Login></Login>
            </DialogLogin>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <DialogLogin>
              <Signup></Signup>
            </DialogLogin>
          }
        ></Route>
      </Route>


      <Route
        path="/helloword"
        element={
          <Helloword></Helloword>
        }
      ></Route>


      <Route
        path="/Role_Student"
        element={
          <MainLayoutUser>
            <User></User>
          </MainLayoutUser>
        }
      ></Route>
      <Route
        path="/contact"
        element={
          <MainLayoutUser>
            <Contact></Contact>
          </MainLayoutUser>
        }
      ></Route>
      <Route
        path="/ExamPage"
        element={
          <MainLayoutUser>
            <ExamPage></ExamPage>
          </MainLayoutUser>
        }
      ></Route>
      <Route
        path="/ExamPage/createStructure"
        element={
          <MainLayoutUser>
            <CreateOwnStructure></CreateOwnStructure>
          </MainLayoutUser>
        }
      ></Route>

      <Route
        path="/admin"
        element={
          <MainLayoutAdmin>
            <Dashboard></Dashboard>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/user"
        element={
          <MainLayoutAdmin>
            <CreateUser></CreateUser>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/skill"
        element={
          <MainLayoutAdmin>
            <CreateSkill></CreateSkill>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/part"
        element={
          <MainLayoutAdmin>
            <CreatePart></CreatePart>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/part/addpart"
        element={
          <MainLayoutAdmin>
            <AddPart></AddPart>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/level"
        element={
          <MainLayoutAdmin>
            <CreateLevel></CreateLevel>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/structure"
        element={
          <MainLayoutAdmin>
            <CreateStructure></CreateStructure>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/topic"
        element={
          <MainLayoutAdmin>
            <CreateTopic></CreateTopic>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/topic/addtopic"
        element={
          <MainLayoutAdmin>
            <AddTopic></AddTopic>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/question"
        element={
          <MainLayoutAdmin>
            <CreateQuestionManage></CreateQuestionManage>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/question/addquestion"
        element={
          <MainLayoutAdmin>
            <AddQuestion></AddQuestion>
          </MainLayoutAdmin>
        }
      ></Route>

      <Route
        path="/Role_Lecturer-CreateGame"
        element={
          <MainLayoutAdmin>
            <CreateGame></CreateGame>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/MyGame"
        element={
          <MainLayoutAdmin>
            <Mygames></Mygames>
          </MainLayoutAdmin>
        }
      ></Route>
      <Route
        path="/create-question"
        element={
          <MainLayoutAdmin>
            <Update></Update>
          </MainLayoutAdmin>
        }
      ></Route>


      <Route
        path="/testExam/:id"
        element={<TestExam></TestExam>}
      ></Route>

      <Route
        path="/mainTest/:id"
        element={<MainTest></MainTest>}
      ></Route>

      <Route
        path="/mainStart/"
        element={<MainStart></MainStart>}
      ></Route>

      <Route
        path="/profile"
        element={<Profile></Profile>}
      ></Route>


      <Route
        path="/Role_Student_QuestionDetailResult"
        element={<QuestionResult>Lecture</QuestionResult>}
      ></Route>
      <Route
        path="Role_Student_Class"
        element={<ClassExame></ClassExame>}
      ></Route>
      <Route
        path="/Role_Student_QuestionDetailResult"
        element={<QuestionResult>Lecture</QuestionResult>}
      ></Route>
      <Route path="/test" element={<QuizApp></QuizApp>}></Route>
      <Route path="/lecture" element={<div>Lecture</div>}></Route>
    </Routes>
  );
};

export default App;
