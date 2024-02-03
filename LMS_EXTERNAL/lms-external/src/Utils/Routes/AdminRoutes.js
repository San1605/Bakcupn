import Layout from "../../Components/Layout/Layout";
import Notifications from "../../Components/Notifications/Notifications";
import Events from "../../Pages/Events/Events";
import HelpAndSupport from "../../Pages/HelpAndSupport/HelpAndSupport";
import AdminCollegeStudents from "../../Views/Admin/Pages/AdminCollegeStudents/AdminCollegeStudents";
import AdminColleges from "../../Views/Admin/Pages/AdminColleges/AdminColleges";
import AdminCourses from "../../Views/Admin/Pages/AdminCourses/AdminCourses";
import AdminDashBoard from "../../Views/Admin/Pages/AdminDashBoard/AdminDashBoard";
import AdminLPManagement from "../../Views/Admin/Pages/AdminLPManagement/AdminLPManagement";
import AdminRoleManagement from "../../Views/Admin/Pages/AdminRoleManagement/AdminRoleManagement";
import MentorLpWeeks from "../../Views/CT-Mentor/Pages/MentorLpWeeks/MentorLpWeeks";
import { ProtectedRoutesCelebal } from "../ProtectedRoutesCelebal";

const generateProtectedRoute = (path, component) => (
  <ProtectedRoutesCelebal key={path}>
    <Layout>{component}</Layout>
  </ProtectedRoutesCelebal>
);

export const adminRoutes = [
  {
    path: "/dashboard",
    element: generateProtectedRoute("/dashboard", <AdminDashBoard />),
    accessType: "admin",
  },
  {
    path: "/rolemanagement",
    element: generateProtectedRoute("/rolemanagement", <AdminRoleManagement />),
    accessType: "admin",
  },
  {
    path: "/colleges",
    element: generateProtectedRoute("/colleges", <AdminColleges />),
    accessType: "admin",
  },
  {
    path: "/colleges/students/:id1/:id2?",
    element: generateProtectedRoute("/colleges/students/:id1/:id2?", <AdminCollegeStudents />),
    accessType: "admin",
  },
  {
    path: "/lpmanagement",
    element: generateProtectedRoute("/lpmanagement", <AdminLPManagement />),
    accessType: "admin",
  },
  {
    path: "/lpmanagement/:id1",
    element: generateProtectedRoute("/lpmanagement/:id1", <AdminCourses />),
    accessType: "admin",
  },
  {
    path: "/courses/:id1",
    element: generateProtectedRoute("/courses/:id1", <MentorLpWeeks />),
    accessType: "admin",
  },
  {
    path: "/events",
    element: generateProtectedRoute("/events", <Events />),
    accessType: "admin",
  },
  {
    path: "/help",
    element: generateProtectedRoute("/help", <HelpAndSupport />),
    accessType: "admin",
  },
  {
    path: "/notifications",
    element: generateProtectedRoute("/notifications", <Notifications />),
    accessType: "user",
  },
];