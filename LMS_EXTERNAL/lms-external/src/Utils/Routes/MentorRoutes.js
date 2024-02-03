import Layout from "../../Components/Layout/Layout";
import Notifications from "../../Components/Notifications/Notifications";
import CommunityChat from "../../Pages/CommunityChat/CommunityChat";
import Events from "../../Pages/Events/Events";
import HelpAndSupport from "../../Pages/HelpAndSupport/HelpAndSupport";
import MentorDashBoard from "../../Views/CT-Mentor/Pages/MentorDashBoard/MentorDashBoard";
import MentorLPManagement from "../../Views/CT-Mentor/Pages/MentorLPManagement/MentorLPManagement";
import MentorLpWeeks from "../../Views/CT-Mentor/Pages/MentorLpWeeks/MentorLpWeeks";
import { ProtectedRoutesCelebal } from "../ProtectedRoutesCelebal";

const generateProtectedRoute = (path, component) => (
  <ProtectedRoutesCelebal key={path}>
    <Layout>{component}</Layout>
  </ProtectedRoutesCelebal>
);

export const MentorRoutes = [
  {
    path: "/dashboard",
    element: generateProtectedRoute("/dashboard", <MentorDashBoard />),
    accessType: "mentor",
  },
  {
    path: "/lpmanagement",
    element: generateProtectedRoute("/lpmanagement", <MentorLPManagement />),
    accessType: "mentor",
  },
  {
    path: "/courses/:id1",
    element: generateProtectedRoute("/courses/:id1", <MentorLpWeeks />),
    accessType: "mentor",
  },
  {
    path: "/communitychat",
    element: generateProtectedRoute("/communitychat", <CommunityChat />),
    accessType: "mentor",
  },
  {
    path: "/events",
    element: generateProtectedRoute("/events", <Events />),
    accessType: "mentor",
  },
  {
    path: "/help",
    element: generateProtectedRoute("/help", <HelpAndSupport />),
    accessType: "mentor",
  },
  {
    path: "/notifications",
    element: generateProtectedRoute("/notifications", <Notifications />),
    accessType: "user",
  },
];