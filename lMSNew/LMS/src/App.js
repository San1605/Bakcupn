import React, { useState, useEffect, useContext } from "react";
import Navbar from "./component/navbar/Navbar";
import Sidebar from "./component/sidebar/Sidebar";
import MenteeDashboard from "./views/mentor-mentee/pages/dashboard/Menteedashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./views/mentor-mentee/pages/courses/Courses";
import Tickets from "./views/mentor-mentee/pages/tickets/Tickets";
import MenteeList from "./views/mentor-mentee/pages/menteeList/MenteeList";
import Mycourses from "./views/mentor-mentee/pages/courses/mycourses/Mycourses";
import Mycurrentcourse from "./views/mentor-mentee/pages/courses/mycurrentcourse/Mycurrentcourse";
import UnenrolledCourses from "./views/mentor-mentee/pages/courses/allcourses/unenrolledcourse/UnenrolledCourses";
import Dashboard from "./views/admin/pages/dashboard/Dashboard";
import Login from "./Login";
import Reports from "./views/mentor-mentee/pages/reports/Reports";
import FeedbackCard from "./component/feedbackCard/FeedbackCard";
import FeedbackForm from "./component/feedbackCard/FeedbackForm";
import Coursemanagement from "./views/admin/pages/learning-path-management/course-management/Coursemanagement";
import Rolemanagement from "./views/admin/pages/role-management/Rolemanagement";
import AdminTickets from "./views/admin/pages/admin-tickets/AdminTickets";
import AdminNavbar from "./views/admin/components/navbar/AdminNavbar";
import Adminsidebar from "./views/admin/components/sidebar/Adminsidebar";
import Notification from "./views/mentor-mentee/pages/allnotification/Notification";
import Buddies from "./views/mentor-mentee/pages/buddies/Buddies";
import UnenrolledPath from "./views/mentor-mentee/pages/courses/allcourses/UnenrolledPath";
import Coursemanagerdash from "./views/mentor-mentee/pages/course-management/Coursemanagerdash";
import "./App.css";
import { GlobalContext, GlobalProvider } from "./context/GlobalState";
import { Toaster } from "react-hot-toast";
import "@fontsource/inter";
import { useIsAuthenticated } from "@azure/msal-react";
import AdminRole from "./views/admin/pages/role-management/admin/AdminRole";
import CourseManager from "./views/admin/pages/role-management/courseManager/CourseManager";
import HrBuddy from "./views/admin/pages/role-management/hrBuddy/HrBuddy";
import LoginforAdmin from "./LoginforAdmin";
import LpCourseList from "./views/admin/pages/learning-path-management/singe-lp-management/LpCourseList";
// import AddCollegeDetailsModal from "./component/addCollegeDetailsModal/AddCollegeDetailsModal";
import SingleHrDetails from "./views/admin/pages/role-management/hrBuddy/SingleHrDetails";
import ConversionDetails from "./views/mentor-mentee/pages/conversion/conversionDetails/ConversionDetails";
import RequestTabs from "./views/mentor-mentee/pages/requestscreens/RequestTabs";
import ComversionCommon from "./views/mentor-mentee/pages/commonConversion/ComversionCommon";
import LpManager from "./views/admin/pages/role-management/lpManager/LpManager";
import CourseEditor from "./views/admin/pages/role-management/courseEditor/CourseEditor";
import DepartmentManager from "./views/admin/pages/role-management/departmentManager/DepartmentManager";
import ConversionManager from "./views/admin/pages/role-management/conversionManager/ConversionManager";
import LpAdmin from "./views/admin/pages/role-management/lpAdmin/LpAdmin";
import LpTeam from "./views/admin/pages/role-management/lpAdmin/LpTeam";
import CourseReviewer from "./views/admin/pages/role-management/courseReviewer/CourseReviewer";
import CourseViewer from "./views/admin/pages/role-management/courseViewer/CourseViewer";
import CustomRole from "./views/admin/pages/role-management/CustomRole";
import Interview from "./views/mentor-mentee/pages/interview/Interview";
import DepResources from "./views/mentor-mentee/pages/departmentResources/DepResources";
import AddCourseForm from "./views/admin/components/learning-path-mangagement-modals/addCourseform/AddCourseForm";
import AddCourseManually from "./views/admin/components/learning-path-mangagement-modals/addCourseManually/AddCourseManually";
import PreviewCourse from "./views/admin/components/learning-path-mangagement-modals/addCourseManually/PreviewCourse";
import TeamLeadRole from "./views/admin/pages/role-management/teamlead/TeamLeadRole";
import InterviewSchedulerRole from "./views/admin/pages/role-management/interviewScheduler/InterviewSchedulerRole";
import CrossInterviewRole from "./views/admin/pages/role-management/crossHRteam/CrossInterviewRole";
import UserReport from "./views/mentor-mentee/pages/userReport/UserReport";
import EvaluationReport from "./views/mentor-mentee/pages/evaluationReport/EvaluationReport";
import UserEvaluationReport from "./views/mentor-mentee/pages/evaluationReport/UserEvaluationReport";
import NewFlow from "./views/mentor-mentee/pages/courses/newFlow/NewFlow";
import UserReportNew from "./views/mentor-mentee/pages/userReport/UserReportNew";

function App() {
  const [toggle, setToggle] = useState(false);
  const [adminswitch, setAdminswitch] = useState("");
  const isAuthenticated = useIsAuthenticated();
  const [isLoginT, setIsLoginT] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const geturl = window.location.pathname.split("/");
    if (geturl[1] === "admin") {
      setAdminswitch(true);
    } else {
      setAdminswitch(false);
    }
  }, []);

  return (
    <GlobalProvider>
      {isLoginT && adminswitch !== "" ? (
        adminswitch ? (
          <>
            {/* <AddCollegeDetailsModal /> */}
            <AdminNavbar toggle={toggle} setToggle={setToggle} />
          </>
        ) : (
          <>
            {/* <AddCollegeDetailsModal /> */}
            <Navbar toggle={toggle} setToggle={setToggle} />
          </>
        )
      ) : (
        ""
      )}
      <div style={{ height: isLoginT ? "90vh" : "" }}>
        <div className={isLoginT ? "row w-100 content" : ""}>
          {isLoginT ? (
            adminswitch ? (
              <Adminsidebar toggle={toggle} setToggle={setToggle} />
            ) : (
              <Sidebar toggle={toggle} setToggle={setToggle} />
            )
          ) : (
            ""
          )}
          <Routes>
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <MenteeDashboard
                    setAdminswitch={setAdminswitch}
                    notFoundRoute={true}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <LoginPrivateRoute>
                  <Login setIsLoginT={setIsLoginT} />
                </LoginPrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <MenteeDashboard setAdminswitch={setAdminswitch} />
                </PrivateRoute>
              }
            />
            <Route path="/dev" element={<NewFlow />} />
            <Route
              path="/dev-report"
              element={
                <PrivateRoute>
                  <UserReportNew />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-report"
              element={
                <PrivateRoute>
                  <UserReport />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <PrivateRoute>
                  <Courses />
                </PrivateRoute>
              }
            />
            <Route
              path="/mycourses"
              element={
                <PrivateRoute>
                  <Mycourses />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports/:id"
              element={
                <PrivateRoute>
                  <Reports />
                </PrivateRoute>
              }
            />
            <Route
              path="/mycurrentcourse/:id"
              element={
                <PrivateRoute>
                  <Mycurrentcourse />
                </PrivateRoute>
              }
            />
            <Route
              path="/enrollpath/:id"
              element={
                <PrivateRoute>
                  <UnenrolledPath />
                </PrivateRoute>
              }
            />
            <Route
              path="/singlecourse/:id"
              element={
                <PrivateRoute>
                  <UnenrolledCourses />
                </PrivateRoute>
              }
            />
            <Route
              path="/tickets"
              element={
                <PrivateRoute>
                  <Tickets />
                </PrivateRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <PrivateRoute>
                  <RequestTabs />
                </PrivateRoute>
              }
            />

            {/* // request navigation through notification  */}
            <Route
              path="/requests/:id"
              element={
                <PrivateRoute>
                  <RequestTabs />
                </PrivateRoute>
              }
            />

            <Route
              path="/notification"
              element={
                <PrivateRoute>
                  <Notification />
                </PrivateRoute>
              }
            />
            <Route
              path="/buddies"
              element={
                <PrivateRoute>
                  <Buddies />
                </PrivateRoute>
              }
            />
            <Route
              path="/menteelist"
              element={
                <PrivateRoute>
                  <MenteeList />
                </PrivateRoute>
              }
            />
            <Route
              path="/conversion/:id"
              element={
                <PrivateRoute>
                  <ConversionDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/feedbackcard"
              element={
                <PrivateRoute>
                  <FeedbackCard />
                </PrivateRoute>
              }
            />
            <Route
              path="/feedbackform"
              element={
                <PrivateRoute>
                  <FeedbackForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/evaluationreports"
              element={
                <PrivateRoute>
                  <EvaluationReport />
                </PrivateRoute>
              }
            />
            <Route
              path="/evaluationreports/userevaluationreport/:id"
              element={
                <PrivateRoute>
                  <UserEvaluationReport />
                </PrivateRoute>
              }
            />
            <Route
              path="/pathmanagement"
              element={
                <PrivateRoute>
                  <Coursemanagement adminswitch={adminswitch} />
                  {/* <Coursemanagerdash /> */}
                </PrivateRoute>
              }
            />
            <Route
              path="/singlepathmanagement/:id"
              element={
                <PrivateRoute>
                  <LpCourseList adminswitch={adminswitch} />
                </PrivateRoute>
              }
            />
            <Route
              path="/addcourseform/:id"
              element={
                <PrivateRoute>
                  <AddCourseForm adminswitch={adminswitch} />
                </PrivateRoute>
              }
            />
            <Route
              path="/addcoursemanually/:lp/:course"
              element={
                <PrivateRoute>
                  <AddCourseManually adminswitch={adminswitch} />
                </PrivateRoute>
              }
            />
            <Route
              path="/coursemanagement/preview/:lp/:course"
              element={
                <PrivateRoute>
                  <PreviewCourse adminswitch={adminswitch} />
                </PrivateRoute>
              }
            />
            <Route
              path="/assignedconversion"
              element={
                <PrivateRoute>
                  <ComversionCommon />
                </PrivateRoute>
              }
            />
            <Route
              path="/interview"
              element={
                <PrivateRoute>
                  <Interview />
                </PrivateRoute>
              }
            />
            <Route
              path="/department-resources"
              element={
                <PrivateRoute>
                  <DepResources />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <LoginPrivateRouteOfAdmin>
                  <LoginforAdmin setIsLoginT={setIsLoginT} />
                </LoginPrivateRouteOfAdmin>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRouteofAdmin>
                  <Dashboard setAdminswitch={setAdminswitch} />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/coursemanagement"
              element={
                <PrivateRouteofAdmin>
                  <Coursemanagement adminswitch={adminswitch} />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement"
              element={
                <PrivateRouteofAdmin>
                  <Rolemanagement />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/tickets"
              element={
                <PrivateRouteofAdmin>
                  <AdminTickets />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/adminrole"
              element={
                <PrivateRouteofAdmin>
                  <AdminRole />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/coursemanager"
              element={
                <PrivateRouteofAdmin>
                  <CourseManager />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/hrbuddy"
              element={
                <PrivateRouteofAdmin>
                  <HrBuddy />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/singlehrbuddy"
              element={
                <PrivateRouteofAdmin>
                  <SingleHrDetails />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/coursesmanagement/:id"
              element={
                <PrivateRouteofAdmin>
                  <LpCourseList adminswitch={adminswitch} />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/addcourseform/:id"
              element={
                <PrivateRouteofAdmin>
                  <AddCourseForm adminswitch={adminswitch} />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/addcoursemanually/:lp/:course"
              element={
                <PrivateRouteofAdmin>
                  <AddCourseManually adminswitch={adminswitch} />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/depmanager"
              element={
                <PrivateRouteofAdmin>
                  <DepartmentManager />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/conversionmanager"
              element={
                <PrivateRouteofAdmin>
                  <ConversionManager />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/lpadmin"
              element={
                <PrivateRouteofAdmin>
                  <LpAdmin />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/coursereviewer"
              element={
                <PrivateRouteofAdmin>
                  <CourseReviewer />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/coursereviewer"
              element={
                <PrivateRouteofAdmin>
                  <CourseReviewer />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/lpmanager"
              element={
                <PrivateRouteofAdmin>
                  <LpManager />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/courseeditor"
              element={
                <PrivateRouteofAdmin>
                  <CourseEditor />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/team"
              element={
                <PrivateRouteofAdmin>
                  <LpTeam />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/courseviewer"
              element={
                <PrivateRouteofAdmin>
                  <CourseViewer />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/teamlead"
              element={
                <PrivateRouteofAdmin>
                  <TeamLeadRole />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/interview-scheduler"
              element={
                <PrivateRouteofAdmin>
                  <InterviewSchedulerRole />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/cross-interview"
              element={
                <PrivateRouteofAdmin>
                  <CrossInterviewRole />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/rolemanagement/:title/:id"
              element={
                <PrivateRouteofAdmin>
                  <CustomRole />
                </PrivateRouteofAdmin>
              }
            />
            <Route
              path="/admin/coursemanagement/preview/:lp/:course"
              element={
                <PrivateRouteofAdmin>
                  <PreviewCourse adminswitch={adminswitch} />
                </PrivateRouteofAdmin>
              }
            />
          </Routes>
        </div>
      </div>
      <Toaster />
    </GlobalProvider>
  );
}
export default App;

function PrivateRoute({ children }) {
  // const isAuthenticated = useIsAuthenticated();
  const getToken = localStorage.getItem("token");
  const rolec = localStorage.getItem("role");
  const mailh = localStorage.getItem("email");
  const hrmid = localStorage.getItem("hrm");
  // const geturl = window.location.pathname.split("/");
  let redirectURL = "/";
  // if (geturl[1] === "admin") {
  //   redirectURL = "/admin";
  // }
  return getToken && rolec && mailh && hrmid ? (
    children
  ) : (
    <Navigate to={redirectURL} />
  );
}

function PrivateRouteofAdmin({ children }) {
  // const isAuthenticated = useIsAuthenticated();
  const getToken = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isadmin");
  const rolec = localStorage.getItem("role");
  const mailh = localStorage.getItem("email");
  const hrmid = localStorage.getItem("hrm");
  // const geturl = window.location.pathname.split("/");
  let redirectURL = "/admin";
  // if (geturl[1] === "admin") {
  //   redirectURL = "/admin";
  // }
  return getToken && isAdmin && rolec && mailh && hrmid ? (
    children
  ) : (
    <Navigate to={redirectURL} />
  );
}

function LoginPrivateRouteOfAdmin({ children }) {
  // const isAuthenticated = useIsAuthenticated();
  const getToken = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isadmin");
  const rolec = localStorage.getItem("role");
  const mailh = localStorage.getItem("email");
  const hrmid = localStorage.getItem("hrm");
  let redirectURL = "/admin/dashboard";
  return getToken && isAdmin && rolec && mailh && hrmid ? (
    <Navigate to={redirectURL} />
  ) : (
    children
  );
}

function LoginPrivateRoute({ children }) {
  // const isAuthenticated = useIsAuthenticated();
  const getToken = localStorage.getItem("token");
  const rolec = localStorage.getItem("role");
  const mailh = localStorage.getItem("email");
  const hrmid = localStorage.getItem("hrm");
  // const geturl = window.location.pathname.split("/");
  let redirectURL = "/dashboard";
  // if (geturl[1] === "admin") {
  //   redirectURL = "/admin/dashboard";
  // }
  return getToken && rolec && mailh && hrmid ? (
    <Navigate to={redirectURL} />
  ) : (
    children
  );
}
