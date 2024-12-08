import { Slider } from "@chakra-ui/react";
import React from "react";
import Header from "../../../routes/admin/Header";
import Sidebar from "../../../routes/admin/Sidebar";

const MainLayoutAdmin = ({ children }) => {
  return (
    <div className="w-screen min-h-[500px] ">
      <header>
        <Header></Header>
      </header>
      <main className="w-full flex min-h-[550px]">
        <Sidebar></Sidebar>
        <section className="w-full min-h-[500px]">{children}</section>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© LUẬN VĂN TỐT NGHIỆP THÙY TRANG ©.</p>
      </footer>
    </div>
  );
};

export default MainLayoutAdmin;
