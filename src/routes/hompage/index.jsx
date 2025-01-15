import React, { useEffect, useState } from "react";
import { navBar } from "../../lib/utils";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toeicImage from "../../assets/photoavt.png";


const Homepage = () => {
  const [state, setState] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage?.getItem("token")) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      const userRole = decodedToken.roles[0].authority;
      // navigate(`/${userRole}`);
      setState("");
    }
  }, [state]);

  return (
    <div style={{ backgroundColor: "#CFEBFC" }}>
      <div className="w-screen position-absolute mt-10" style={{
        position:"absolute"
      }}>
        
      <h1 className="text-6xl font-bold mb-4 text-center">
        WELCOME TO TOEIC PRACTICE PLATFORM  
      </h1>
      <p className="text-lg mb-3 text-center">
        PREPARE FOR YOUR TOEIC TEST WITH OUR COMPREHENSIVE RESOURCES, PRACTICE
        EXAMS, AND PROGRESS TRACKING.
      </p>
      </div>
      <div className="w-screen h-screen flex items-center">
          {/* Navigation Section */}
          <div className="w-[30%] h-[100%] shadow-2xl rounded-1 border-black bg-white text-center">
          <img src="../src/assets/shortLogo.png"  alt="" style={{margin: "auto", marginTop:"300px", width:"300px"
          }} />
            <ul className="flex flex-col mt-10 space-y-5 items-center h-full w-full ">
              <h1 className="fs-12" >WEB TOEIC</h1>
              {navBar.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="w-48 h-12 rounded-md bg-[#8e8e8e] hover:bg-slate-300"
                  >
                    <Link
                      className="w-48 h-12 rounded-md flex justify-center items-center"
                      to={item.link ? item.link : ""}
                    >
                      {item.nameItem}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-[70%] h-[100%] flex justify-center items-center" style={{backgroundImage: `url("src/assets/hinhtruong.jpg")`,
            backgroundRepeat: "no-repeat", backgroundSize:" cover"
          }}>
            {/* <img
              src="../src/assets/hinhtruong.jpg" 
              alt="TOEIC Practice"
              className="rounded-3xl shadow-lg object-contain w-[1000px] h-[1000px]" 
            /> */}
          </div>

        </div>
        <Outlet />
      </div>
   
  );
};

export default Homepage;
