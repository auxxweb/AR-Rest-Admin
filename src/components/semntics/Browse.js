import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";
import { getUserCredential, publicRoutes } from "../../common/utils";

function Browse() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const userData = getUserCredential();
  const getBasePath = (pathname) => {
    const pathParts = pathname.split("/").filter(Boolean);
    return `/${pathParts[0]}`;
  };
  const basePath = getBasePath(location.pathname);
  useEffect(() => {
    if (publicRoutes.includes(basePath)) {
      if (userData) {
        navigate("/");
      } else {
        navigate(location.pathname);
      }
    } else {
      if (!userData) {
        navigate("/login");
      }
    }
    //eslint-disable-next-line
  }, []);


  useEffect(() => {
    // Function to detect language and apply appropriate classes
    const applyLanguageClasses = () => {
      document.querySelectorAll("p, span, div").forEach((element) => {
        const text = element.textContent;

        // Arabic character range
        if (/[ء-ي]/.test(text)) {
          element.classList.add("arabic-text");
        } 
        // Malayalam character range
        else if (/[\u0D00-\u0D7F]/.test(text)) {
          element.classList.add("malayalam-text");
        } 
        // Default to English
        else {
          element.classList.add("english-text");
        }
      });
    };

    // Apply classes initially
    applyLanguageClasses();

    // Apply classes whenever content updates
    const observer = new MutationObserver(applyLanguageClasses);
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  if (publicRoutes.includes(basePath)) {
    return (
      <div className="flex-1 flex flex-col">
        <ContentArea /> 
      </div>
    );
  } else {
    return (
      <div className="flex flex-col h-screen">
        <Header
          className="w-full fixed top-0 left-0 z-10"
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

          <main
            className={`flex-1 overflow-y-auto  p-4 ${
              location.pathname === "/" ? "bg-white" : "bg-[#d3d3d3]"
            }`}
          >
            <ContentArea />
          </main>
        </div>
      </div>
    );
  }
}

export default Browse;
