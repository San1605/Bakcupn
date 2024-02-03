//Patient Imports
import Appointments from "../views/patient/pages/Appointments/Appointments";
import AsPerOrgan from "../views/patient/pages/AsPerOrgans/AsPerOrgan";
import AsPerSpeciality from "../views/patient/pages/AsPerSpeciality/AsPerSpeciality";
import Departments from "../views/patient/pages/Departments/Departments";
import Home from "../views/patient/pages/Home/Home";
import LabAndTests from "../views/patient/pages/LabAndTests/LabAndTests";
import MyReports from "../views/patient/pages/MyReports/MyReports";
import Tickets from "../views/patient/pages/Tickets/Tickets";
import ParticularPrescription from "../views/patient/pages/ParticularPrescription/ParticularPrescription";
import Payments from "../views/patient/pages/Payments/Payments";
import Prescriptions from "../views/patient/pages/Prescriptions/Prescriptions";
import SignUp from "../views/patient/pages/SignUp/SignUp";

//Doctor Imports
import DoctorHome from "../views/doctor/pages/DoctorHome/DoctorHome";
import DoctorAppointments from "../views/doctor/pages/DoctorAppointments/DoctorAppointments";
import DoctorTeam from "../views/doctor/pages/DoctorTeam/DoctorTeam";
import DoctorPatients from "../views/doctor/pages/DoctorPatients/DoctorPatients";
import DoctorCalender from "../views/doctor/pages/DoctorCalender/DoctorCalender";
import DoctorPatientInfo from "../views/doctor/pages/DoctorPatientInfo/DoctorPatientInfo";

//Admin Imports
import AdminHome from "../views/admin/pages/AdminHome/AdminHome";
import AdminDoctors from "../views/admin/pages/AdminDoctors/AdminDoctors";
import AdminPatients from "../views/admin/pages/AdminPatients/AdminPatients";
import AdminStaff from "../views/admin/pages/AdminStaff/AdminStaff";
import DoctorInfo from "../views/admin/pages/DoctorInfo/DoctorInfo";
import AdminTransactions from "../views/admin/pages/AdminTransactions/AdminTransactions";
import AdminDepartments from "../views/admin/pages/AdminDepartments/AdminDepartments";
import AdminLabs from "../views/admin/pages/AdminLabs/AdminLabs";

//Common Imports
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Login from "../pages/Login/Login";
import Meeting from "../pages/Meeting/Meeting";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import VerifyOtp from "../pages/VerifyOtp/VerifyOtp";
import PatientInfo from "../views/admin/pages/PatientInfo/PatientInfo";

const patientRoutes = [
  {
    path: "/signup",
    element: <SignUp />,
    accessType: null,
    isLayoutDisplay: false,
    regexPattern: "^$",
  },
  {
    path: "/",
    element: <Login userType="patient" />,
    accessType: null,
    isLayoutDisplay: false,
    regexPattern: "^$",
  },
  {
    path: "/home",
    element: <Home />,
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/appointments",
    element: <Appointments />,
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/departments",
    element: <Departments />,
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/prescriptions",
    element: <Prescriptions />,
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/payments",
    element: <Payments />,
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/labs",
    element: <LabAndTests />,
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/reports",
    element: <MyReports />,
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/tickets",
    element: <Tickets />,
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/meet/:id",
    element: null, // By setting null it will reflect as <Meeting call={call} setCall={setCall} />
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "/meet/.*",
  },
  {
    path: "/departments/organs/:id",
    element: <AsPerOrgan />,
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "/departments/organs/.*",
  },
  {
    path: "/departments/speciality/:id",
    element: <AsPerSpeciality />,
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "/departments/speciality/.*",
  },
  {
    path: "/prescriptions/:id",
    element: <ParticularPrescription />,
    accessType: "patient",
    isLayoutDisplay: true,
    regexPattern: "/prescriptions/.*",
  },
];

const doctorRoutes = [
  {
    path: "/doctor",
    element: <Login userType="doctor" />,
    accessType: null,
    isLayoutDisplay: false,
    regexPattern: "^$",
  },
  {
    path: "/doctor/home",
    element: <DoctorHome />,
    accessType: "doctor",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/doctor/appointments",
    element: <DoctorAppointments />,
    accessType: "doctor",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/doctor/team",
    element: <DoctorTeam />,
    accessType: "doctor",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/doctor/patients",
    element: <DoctorPatients />,
    accessType: "doctor",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/doctor/mycalender",
    element: <DoctorCalender />,
    accessType: "doctor",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/doctor/tickets",
    element: <Tickets />,
    accessType: "doctor",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/doctor/meet/:id",
    element: null, // By setting null it will reflect as <Meeting call={call} setCall={setCall} />
    accessType: "doctor",
    isLayoutDisplay: true,
    regexPattern: "/doctor/meet/.*",
  },
  {
    path: "/doctor/patient/:id",
    element: <DoctorPatientInfo />,
    accessType: "doctor",
    isLayoutDisplay: true,
    regexPattern: "/doctor/patient/.*",
  },
];

const adminRoutes = [
  {
    path: "/admin",
    element: <Login userType="admin" />,
    accessType: null,
    isLayoutDisplay: false,
    regexPattern: "^$",
  },
  {
    path: "/admin/home",
    element: <AdminHome />,
    accessType: "admin",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/admin/doctors",
    element: <AdminDoctors />,
    accessType: "admin",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/admin/patients",
    element: <AdminPatients />,
    accessType: "admin",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/admin/staff",
    element: <AdminStaff />,
    accessType: "admin",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/admin/doctor/:id",
    element: <DoctorInfo />,
    accessType: "admin",
    isLayoutDisplay: true,
    regexPattern: "/admin/doctor/.*",
  },
  {
    path: "/admin/patient/:id",
    element: <PatientInfo />,
    accessType: "admin",
    isLayoutDisplay: true,
    regexPattern: "/admin/patient/.*",
  },
  {
    path: "/admin/transactions",
    element: <AdminTransactions />,
    accessType: "admin",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/admin/departments",
    element: <AdminDepartments />,
    accessType: "admin",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
  {
    path: "/admin/labs",
    element: <AdminLabs />,
    accessType: "admin",
    isLayoutDisplay: true,
    regexPattern: "^$",
  },
];

const commonRoutes = [
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
    accessType: null,
    isLayoutDisplay: false,
    regexPattern: "^$",
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
    accessType: null,
    isLayoutDisplay: false,
    regexPattern: "^$",
  },
  {
    path: "/verifyOtp",
    element: <VerifyOtp />,
    accessType: null,
    isLayoutDisplay: false,
    regexPattern: "^$",
  },
];

const ROUTES = [
  ...patientRoutes,
  ...doctorRoutes,
  ...adminRoutes,
  ...commonRoutes,
];

export default ROUTES;
