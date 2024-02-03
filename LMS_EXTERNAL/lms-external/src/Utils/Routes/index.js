import { adminRoutes } from "./AdminRoutes"
import { FacultyMentorRoutes } from "./FacultyMentor"
import { hrBuddyRoutes } from "./HrBuddyRoutes"
import { MentorRoutes } from "./MentorRoutes"
import { userRoutes } from "./userRoutes"

export const ROUTES = {
    Admin: adminRoutes,
    hrbuddy: hrBuddyRoutes,
    user: userRoutes,
    Mentor: MentorRoutes,
    mentor: FacultyMentorRoutes
}