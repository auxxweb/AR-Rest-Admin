import React from "react";
import { Route, Routes } from "react-router-dom";
// // import Leaves from "../pages/Leaves";
// import Attendence from "../pages/Attendence";
// // import ShiftAndSchedule from "../pages/ShiftAndSchedule";
// // import ClientDetails from "../pages/ClientDetails";
// import ProjectDetailedPage from "../pages/ProjectDetailedPage";
// import ProjetsPage from "../pages/ProjetsPage";
// import PaymentPage from "../pages/PaymentPage";
// import PaySlip from "../PaySlip";
// import Subscription from "../Subscription";
// // import Department from "../pages/Questions";
// import Designation from "../pages/Designation";
// import SettingAndConfi from "../pages/SettingAndConfi";
import JudgeDetails from "../pages/JudgeDetails";
import DashBoard from "../pages/DashBoard";
import Zones from "../pages/Zones";
import Login from "../pages/Login";
import Judges from "../pages/judges";
import Participants from "../pages/participants";
import Questions from "../pages/Questions";
import Bundles from "../pages/Bundles";
import ParticipantDetails from "../pages/ParticipantDetail";
import QuestionDetails from "../pages/questionDetails";
import BundleDetails from "../pages/BundleDetails";
import ResponseAndResult from "../pages/ResponseAndResult";
import ForgotPassword from "../pages/forgotPassword";
import ChangePassword from "../pages/changePassword";
import ResultDetails from "../pages/resultDetails";
import VendorCategory from "../pages/VendorCategory";
import MenuCategory from "../pages/MenuCategory";
import MenuSubCategory from "../pages/MenuSubCategory";
import Plans from "../pages/Plans";
import Dishes from "../pages/Dishes";
import Payments from "../pages/Payments";
import TermsAndConditions from "../pages/TermsAndConditions";

function ContentArea() {
  return (
    <Routes>
      {/* Use Routes to define all your app routes */}
      <Route path="/" element={<DashBoard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/changePassword/:forgotId" element={<ChangePassword />} />
      <Route path="/zones" element={<Zones />} />
      <Route path="/v-category" element={<VendorCategory />} />
      <Route path="/menu-category" element={<MenuCategory />} />
      <Route path="/menu-sub-category" element={<MenuSubCategory />} />
      <Route path="/dishes" element={<Dishes />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/judges/:id" element={<JudgeDetails />} />
      <Route path="/participants" element={<Participants />} />
      <Route path="/participants/:id" element={<ParticipantDetails />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/questions/:id" element={<QuestionDetails />} />
      <Route path="/bundles" element={<Bundles />} />
      <Route path="/bundles/:id" element={<BundleDetails />} />
      <Route path="/result" element={<ResponseAndResult />} />
      <Route path="/result/:id" element={<ResultDetails />} />
    </Routes>
  );
}

export default ContentArea;
