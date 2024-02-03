import Layout from "../../Components/Layout/Layout";
import CommunityChat from "../../Pages/CommunityChat/CommunityChat";
import Events from "../../Pages/Events/Events";
import HelpAndSupport from "../../Pages/HelpAndSupport/HelpAndSupport";
import UserDashBoard from "../../Views/User/Pages/UserDashBoard/UserDashBoard";
import UserLearnPage from "../../Views/User/Pages/UserLearnPage/UserLearnPage";
import UserLearningPath from "../../Views/User/Pages/UserLearningPath/UserLearningPath";
import { ProtectedRoutesCollege } from "../ProtectedRoutesCollege";
import Notifications from "../../Components/Notifications/Notifications";

const generateProtectedRoute = (path, component) => (
  <ProtectedRoutesCollege key={path}>
    <Layout>{component}</Layout>
  </ProtectedRoutesCollege>
);

export const userRoutes = [
  {
    path: "/dashboard",
    element: generateProtectedRoute("/dashboard", <UserDashBoard />),
    accessType: "user",
  },
  {
    path: "/courses",
    element: generateProtectedRoute("/courses", <UserLearningPath />),
    accessType: "user",
  },
  {
    path: "/learn/:id1",
    element:
      <ProtectedRoutesCollege>
        <UserLearnPage />
      </ProtectedRoutesCollege>
  },
  {
    path: "/communitychat",
    element: generateProtectedRoute("/communitychat", <CommunityChat />),
    accessType: "user",
  },
  {
    path: "/events",
    element: generateProtectedRoute("/events", <Events />),
    accessType: "user",
  },
  {
    path: "/help",
    element: generateProtectedRoute("/help", <HelpAndSupport />),
    accessType: "user",
  },
  {
    path: "/notifications",
    element: generateProtectedRoute("/notifications", <Notifications />),
    accessType: "user",
  },
];