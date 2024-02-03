import Layout from "../../Components/Layout/Layout";
import Notifications from "../../Components/Notifications/Notifications";
import CommunityChat from "../../Pages/CommunityChat/CommunityChat";
import Events from "../../Pages/Events/Events";
import HelpAndSupport from "../../Pages/HelpAndSupport/HelpAndSupport";
import FacultyMentorDashboard from "../../Views/FacultMentor/Pages/FacultyMentorDashboard/FacultyMentorDashboard";
import FacultyMentorFeedback from "../../Views/FacultMentor/Pages/FacultyMentorFeedback/FacultyMentorFeedback";
import { ProtectedRoutesCollege } from "../ProtectedRoutesCollege";

const generateProtectedRoute = (path, component) => (
    <ProtectedRoutesCollege key={path}>
        <Layout>{component}</Layout>
    </ProtectedRoutesCollege>
);

export const FacultyMentorRoutes = [
    {
        path: "/dashboard",
        element: generateProtectedRoute("/dashboard", <FacultyMentorDashboard />),
        accessType: "mentor",
    },
    {
        path: "/feedback",
        element: generateProtectedRoute("/feedback", <FacultyMentorFeedback />),
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