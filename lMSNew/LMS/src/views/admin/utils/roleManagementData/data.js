const defaultRoles = [
  {
    role: "Admin",
    description:
      "The Admin is a Person who has access to the whole Learning Management Portal",
    access: [
      "Course Editor",
      "Create Reviewer",
      "LP Manager",
      "LP Admin",
      "Conversion Manager",
      "Department Manager",
      "Custom Roles",
      "Team Lead",
      "Interview Scheduler",
    ],
    route: "adminrole",
    count: 0,
  },
  {
    role: "Department Manager",
    description:
      "The Department Manager can oversee and manage the activities and report of all the resources of their assigned department or all department depending upon the access",
    access: [
      "Track assigned department’s Resources Report ",
      "Track own department’s resource’s Report ",
    ],
    route: "depmanager",
    count: 0,
  },
  {
    role: "Conversion Manager",
    description:
      "Conversion Manager tracks and manages the upcoming Trainee conversion and FTE conversion",
    access: ["Manage Trainee conversion", "Manage FTE conversion"],
    route: "conversionmanager",
    count: 0,
  },
  {
    role: "HR Buddy",
    description:
      "The HR buddy manages department activities, handles tickets raised by both trainees and interns of of their respective department, and ensures training and development needs are addressed.",
    access: ["Track Buddies Progress/Report and conversion "],
    route: "hrbuddy",
    count: 0,
  },
  {
    role: "LP Admin",
    description: "LP Admin manages all the learning paths of the organization",
    access: [
      "Create Learning Path",
      "Create Course",
      "Edit Course Content",
      "Review Course",
      "Add & Remover LP manager",
      "Delete LP",
      "Publish Course",
      "Delete Course",
    ],
    route: "lpadmin",
    count: 0,
  },
  {
    role: "Course Reviewer",
    description: "The Course reviewer can approve and Publish course",
    access: ["Publish course"],
    route: "coursereviewer",
    count: 0,
  },
  {
    role: "LP Manager",
    description: "LP Manager manages and track the the courses of assigned LP",
    access: [
      "Edit Course Content",
      "Publish Course",
      "Delete Course",
      "Assign Course Editor",
      "Assign course Reviewer",
    ],
    route: "lpmanager",
    count: 0,
  },
  {
    role: "Course Editor",
    description:
      "The Course Editor add and modifies the content of assigned course",
    // access: ["Edit course"],
    access: [],
    route: "courseeditor",
    count: 0,
  },
  {
    role: "Course Viewer",
    description: "The Course Viewer can only view the Course content.",
    access: ["View course"],
    route: "courseviewer",
    count: 0,
  },
  {
    role: "Team Lead",
    description:
      "Team Lead is the person who takes final verdict on conversion requests.",
    // access: ["Add/Delete resources", "custom role"],
    access: [],
    route: "teamlead",
    count: 0,
  },
  {
    role: "Interview Scheduler",
    description:
      "Interview Scheduler is the person who is responsible for scheduling the interviews (Mock/Trainee/FTE).",
    // access: [
    //   "Add/Delete resource",
    //   "interview scheduling rights",
    //   "custom roles",
    // ],
    access: ["interview scheduling rights"],
    route: "interview-scheduler",
    count: 0,
  },
  // {
  //   role: "Cross Interview HR Team",
  //   description:
  //     "Members who are responsible for conducting the Cross Interviews",
  //   access: ["Add/Delete resources", "custom roles"],
  //   route: "cross-interview",
  //   count: 0,
  // },
];
export default defaultRoles;
