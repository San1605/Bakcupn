import Overview from "../assets/icons/overview.svg";
import Patient from "../assets/icons/patient.svg";
import Team from "../assets/icons/team.svg";
import Appoint from "../assets/icons/appoint.svg";
import Payment from "../assets/icons/payment.svg";
import Surgery from "../assets/icons/surgery.svg";
import Department from "../assets/icons/department.svg";
import Lab from "../assets/icons/lab.svg";
import Report from "../assets/icons/report.svg";
import Prescription from "../assets/icons/prescription.svg";
import Doctor from "../assets/icons/doctor.svg";
import appointmentstabIcon from "../assets/icons/appointmentstabIcon.svg";

const SIDE_NAV_ITEMS = {
  patient: [
    {
      icon: Overview,
      label: "Overview",
      route: "/home",
    },
    {
      icon: Appoint,
      label: "Appointments",
      route: "/appointments",
    },
    {
      icon: Department,
      label: "Departments",
      route: "/departments",
    },
    {
      icon: Prescription,
      label: "Prescriptions",
      route: "/prescriptions",
    },
    {
      icon: Payment,
      label: "Payments",
      route: "/payments",
    },
    {
      icon: Lab,
      label: "Lab Tests",
      route: "/labs",
    },
    {
      icon: Report,
      label: "My Reports",
      route: "/reports",
    },
  ],
  doctor: [
    {
      icon: Overview,
      label: "Overview",
      route: "/doctor/home",
    },
    {
      icon: Appoint,
      label: "My Calendar",
      route: "/doctor/mycalender",
    },
    {
      icon: appointmentstabIcon,
      label: "My Appointments",
      route: "/doctor/appointments",
    },
    {
      icon: Team,
      label: "My Team",
      route: "/doctor/team",
    },
    {
      icon: Patient,
      label: "My Patients",
      route: "/doctor/patients",
    },
    // {
    //   icon: Payment,
    //   label: "Payments",
    //   route: "/doctor/payments",
    // },
    // {
    //   icon: Surgery,
    //   label: "Surgeries",
    //   route: "/doctor/surgeries",
    // },
  ],
  admin: [
    {
      icon: Overview,
      label: "Overview",
      route: "/admin/home",
    },
    {
      icon: Doctor,
      label: "Doctors",
      route: "/admin/doctors",
    },
    {
      icon: Patient,
      label: "Patients",
      route: "/admin/patients",
    },
    {
      icon: Team,
      label: "Staff",
      route: "/admin/staff",
    },
    {
      icon: Payment,
      label: "Transactions",
      route: "/admin/transactions",
    },
    {
      icon: Department,
      label: "Department",
      route: "/admin/departments",
    },
    {
      icon: Lab,
      label: "Labs & Surgeries",
      route: "/admin/labs",
    },
  ],
};

export default SIDE_NAV_ITEMS;
