import React from "react";
import PropTypes from "prop-types";
import Navbar from "../molecules/Navbar";
import Sidebar, { Footerbar } from "../molecules/Sidebar";
// import { useAppSelector } from "../../store/hooks";
// import { Navigate } from "react-router-dom";

interface HomeTemplateProps {
  children: React.ReactNode;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({ children }) => {
  // const user: any = useAppSelector((state) => state.auth.user);

  // if (user.creator_status !== "ACTIVE") {
  //   return <Navigate to="/profile-setup" replace />;
  // }

  return (
    <div className="bg-customLightGray min-h-screen">
      <Navbar />
      <section className="grid grid-flow-row grid-cols-11 gap-6 min-h-[85vh]">
        <div className="col-span-3 bg-[#fff] hidden lg:block">
          <Sidebar />
        </div>
        <div className="col-span-11 lg:col-span-8 mt-6 overflow-y-auto no-scrollbar max-h-[85vh] w-full p-4 lg:p-0 mb-20 lg:mb-auto lg:pr-20">
          {children}
        </div>
      </section>
      <Footerbar />
    </div>
  );
};

HomeTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomeTemplate;
