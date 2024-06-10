import AirportDirectorDashboard from "../pages/dashboard_page/airport_director_dashboard/airport-director-dashboard";
import CreateAccount from "../pages/dashboard_page/hrd_dashboard/create-account";
import HrdDashboard from "../pages/dashboard_page/hrd_dashboard/hrd-dashboard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ChatIcon from "@mui/icons-material/Chat";
import GateAgentsDashboard from "../pages/dashboard_page/gate_agents_dashboard/gate-agents-dashboard";
import Broadcast from "../pages/dashboard_page/broadcast";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import FlightInformation from "../pages/dashboard_page/flight-information";
import FlightOperationManagerDashboard from "../pages/dashboard_page/flight_operation_manager_dashboard/flight-operation-manager-dashboard";
import ScheduledFlights from "../pages/dashboard_page/flight_operation_manager_dashboard/scheduled-flight";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AddAirplane from "../pages/dashboard_page/admin_dashboard/add-airplane";
import React from "react";
import AirportOperationManagerDashboard from "../pages/dashboard_page/airport_operation_manager_dashboard/airport-operation-manager-dashboard";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Weather from "../pages/dashboard_page/airport_operation_manager_dashboard/weather";
import CustomerServiceManagerDashboard from "../pages/dashboard_page/customer_service_manager_dashboard/customer-service-manager.dashboard";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AddFeedback from "../pages/dashboard_page/admin_dashboard/add-feedback";
import ViewFeedback from "../pages/dashboard_page/customer_service_manager_dashboard/view-feedback";
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import InformationDeskStaffDashboard from "../pages/dashboard_page/information_desk_staff_dashboard/information-desk-staff-dashboard";
import MapIcon from '@mui/icons-material/Map';
import TerminalMap from "../pages/dashboard_page/information_desk_staff_dashboard/terminal-map";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DepartmentChat from "../pages/dashboard_page/department-chat";
import LostAndFoundStaffDashboard from "../pages/dashboard_page/lost_and_found_staff_dashboard/lost-and-found-staff-dashboard";
import AllInboxIcon from '@mui/icons-material/AllInbox';
import LostAndFoundItem from "../pages/dashboard_page/lost_and_found_staff_dashboard/lost-and-found-item";
import CheckInStaffDashboard from "../pages/dashboard_page/check_in_staff_dashboard/check-in-staff-dashboard";
import GroundHandlingManagerDashboard from "../pages/dashboard_page/ground_handling_manager_dashboard/ground-handling-manager";
import LandsideOperationManagerDashboard from "../pages/dashboard_page/landside_operation_manager_dashboard/landside-operation-manager";
import MaintenanceManagerDashboard from "../pages/dashboard_page/maintenance_manager_dashboard/maintenance-manager-dashboard";
import CustomsAndBorderControlOfficerDashboard from "../pages/dashboard_page/customs_and_border_control_officer_dashboard/customs-and-border-control-officer-dashboard";
import BaggageSecuritySupervisorDashboard from "../pages/dashboard_page/baggage_security_supervisor/baggage-security-supervisor";
import CargoManagerDashboard from "../pages/dashboard_page/cargo_manager_dashboard/cargo-manager-dashboard";
import LogisticsManagerDashboard from "../pages/dashboard_page/logistics_manager_dashboard/logistics-manager";
import FuelManagerDashboard from "../pages/dashboard_page/fuel_manager_dashboard/fuel-manager-dashboard";
import CargoHandlerDashboard from "../pages/dashboard_page/cargo_handler/cargo-handler";
import CivilEngineeringManagerDashboard from "../pages/dashboard_page/civil_engineering_manager_dashboard/civil-engineering-manager-dashboard";
import ChiefFinancialOfficerDashboard from "../pages/dashboard_page/chief_financial_officer_dashboard/chief-financial-officer-dashbord";
import ChiefOperationOfficerDashboard from "../pages/dashboard_page/chief_operation_officer_dashboard/chief-operation-officer-dashboard";
import ChiefSecurityOfficerDashboard from "../pages/dashboard_page/chief_security_officer_dashboard/chief-security-officer-dashboard";
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import FuelSchedule from "../pages/dashboard_page/ground_handling_manager_dashboard/fuel-schedule";
import AddFacility from "../pages/dashboard_page/admin_dashboard/add-facility";
import FactoryIcon from '@mui/icons-material/Factory';
import ViewMaintenanceSchedule from "../pages/dashboard_page/maintenance_manager_dashboard/view-maintenance-schedule";
import MaintenanceSchedule from "../pages/dashboard_page/maintenance_manager_dashboard/maintenance-schedule";
import ConstructionIcon from '@mui/icons-material/Construction';
import SecurityIncident from "../pages/dashboard_page/chief_security_officer_dashboard/security-incident";
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import DownloadReport from "../pages/dashboard_page/airport_director_dashboard/download-report";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import TrackRevenue from "../pages/dashboard_page/airport_director_dashboard/track-revenue";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EmployeeTraining from "../pages/dashboard_page/hrd_dashboard/employee-training";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FlightCrew from "../pages/dashboard_page/flight_operation_manager_dashboard/flight-crew";
import AirportFacility from "../pages/dashboard_page/chief_operation_officer_dashboard/airport-facility";
import AssignFlightCrew from "../pages/dashboard_page/flight_operation_manager_dashboard/assign-flight-crew";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const generalConfig = {
  menu: [
    { text: "Broadcast", icon: <ChatIcon />, contentKey: "Broadcast" },
    {
      text: "Department Chat",
      icon: <QuestionAnswerIcon />,
      contentKey: "Department Chat",
    },
  ],
  components: {
    "Broadcast": Broadcast,
    "Department Chat": DepartmentChat
  },
};

export const DashboardConfig = {
  "Admin": {
    menu: [
      {
        text: "Create Account",
        icon: <PersonAddAlt1Icon />,
        contentKey: "Create Account",
      },
      {
        text: "Add Airplane",
        icon: <AirplanemodeActiveIcon />,
        contentKey: "Add Airplane",
      },
      {
        text: "Add Feedback",
        icon: <EditNoteIcon />,
        contentKey: "Add Feedback",
      },
      {
        text: "Add Facility",
        icon: <FactoryIcon />,
        contentKey: "Add Facility",
      },
    ],
    components: {
      "Create Account": CreateAccount,
      "Add Airplane": AddAirplane,
      "Add Feedback": AddFeedback,
      "Add Facility": AddFacility,
    },
    defaultContentKey: "Create Account",
  },
  "Customer Service Manager": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Customer Service Manager Dashboard",
      },
      {
        text: "View Feedback",
        icon: <ViewTimelineIcon />,
        contentKey: "View Feedback",
      },
      ...generalConfig.menu
    ],
    components: {
      "Customer Service Manager Dashboard": CustomerServiceManagerDashboard,
      "View Feedback": ViewFeedback,
      ...generalConfig.components
    },
    defaultContentKey: "Customer Service Manager Dashboard",
  },
  "Information Desk Staff":{
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Information Desk Staff Dashboard",
      },

      {
        text: "Terminal Map",
        icon: <MapIcon />,
        contentKey: "Terminal Map",
      },
      {
        text: "Flight Information",
        icon: <AirplanemodeActiveIcon />,
        contentKey: "Flight Information",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Information Desk Staff Dashboard": InformationDeskStaffDashboard,
      "Flight Information": FlightInformation,
      "Terminal Map": TerminalMap,
      ...generalConfig.components,
    },
    defaultContentKey: "Information Desk Staff Dashboard",
  },
  "Lost and Found Staff":{
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Lost and Found Staff Dashboard",
      },
      {
        text: "Lost and Found Item",
        icon: <AllInboxIcon />,
        contentKey: "Lost and Found Item",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Lost and Found Staff Dashboard": LostAndFoundStaffDashboard,
      "Lost and Found Item": LostAndFoundItem,
      ...generalConfig.components,
    },
    defaultContentKey: "Lost and Found Staff Dashboard",
  },
  "Check-in Staff": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Check-in Staff Dashboard",
      },
      {
        text: "Scheduled Flights",
        icon: <EventNoteIcon />,
        contentKey: "Scheduled Flights",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Check-in Staff Dashboard": CheckInStaffDashboard,
      "Scheduled Flights": ScheduledFlights,
      ...generalConfig.components,
    },
    defaultContentKey: "Check-in Staff Dashboard",
  },
  "Gate Agents": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Gate Agents Dashboard",
      },
      {
        text: "Flight Information",
        icon: <AirplanemodeActiveIcon />,
        contentKey: "Flight Information",
      },
      {
        text: "Scheduled Flights",
        icon: <EventNoteIcon />,
        contentKey: "Scheduled Flights",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Gate Agents Dashboard": GateAgentsDashboard,
      "Flight Information": FlightInformation,
      "Scheduled Flights": ScheduledFlights,
      ...generalConfig.components,
    },
    defaultContentKey: "Gate Agents Dashboard",
  },
  "Airport Operation Manager": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Airport Operation Manager Dashboard",
      },
      {
        text: "Weather",
        icon: <WbSunnyIcon />,
        contentKey: "Weather",
      },
      {
        text: "Scheduled Flights",
        icon: <EventNoteIcon />,
        contentKey: "Scheduled Flights",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Airport Operation Manager Dashboard": AirportOperationManagerDashboard,
      "Weather": Weather,
      "Scheduled Flights": ScheduledFlights,
      ...generalConfig.components,
    },
    defaultContentKey: "Airport Operation Manager Dashboard",
  },
  "Flight Operation Manager": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Flight Operation Manager Dashboard",
      },
      {
        text: "Flight Information",
        icon: <AirplanemodeActiveIcon />,
        contentKey: "Flight Information",
      },
      {
        text: "Scheduled Flights",
        icon: <EventNoteIcon />,
        contentKey: "Scheduled Flights",
      },
      {
        text: "Flight Crew",
        icon: <BusinessCenterIcon />,
        contentKey: "Flight Crew",
      },
      {
        text: "Assign Crew",
        icon: <PersonAddIcon />,
        contentKey: "Assign Crew",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Flight Operation Manager Dashboard": FlightOperationManagerDashboard,
      "Flight Information": FlightInformation,
      "Scheduled Flights": ScheduledFlights,
      "Flight Crew": FlightCrew,
      "Assign Crew": AssignFlightCrew,
      ...generalConfig.components,
    },
    defaultContentKey: "Flight Operation Manager Dashboard",
  },
  "Ground Handling Manager": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Ground Handling Manager Dashboard",
      },
      {
        text: "Fuel Schedule",
        icon: <LocalGasStationIcon />,
        contentKey: "Fuel Schedule",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Ground Handling Manager Dashboard": GroundHandlingManagerDashboard,
      "Fuel Schedule": FuelSchedule,
      ...generalConfig.components,
    },
    defaultContentKey: "Ground Handling Manager Dashboard",
  },
  "Landside Operation Manager": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Landside Operation Manager Dashboard",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Landside Operation Manager Dashboard": LandsideOperationManagerDashboard,
      ...generalConfig.components,
    },
    defaultContentKey: "Landside Operation Manager Dashboard",
  },
  "Maintenance Manager": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Maintenance Manager Dashboard",
      },
      {
        text: "Facility Maintenance",
        icon: <ConstructionIcon />,
        contentKey: "Maintenance Schedule",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Maintenance Manager Dashboard": MaintenanceManagerDashboard,
      "Maintenance Schedule": MaintenanceSchedule,
      ...generalConfig.components,
    },
    defaultContentKey: "Maintenance Manager Dashboard",
  },
  "Customs and Border Control Officer": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Customs and Border Control Officer Dashboard",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Customs and Border Control Officer Dashboard": CustomsAndBorderControlOfficerDashboard,
      ...generalConfig.components,
    },
    defaultContentKey: "Customs and Border Control Officer Dashboard",
  },
  "Baggage Security Supervisor": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Baggage Security Supervisor Dashboard",
      },
      {
        text: "Security Incident",
        icon: <PrivacyTipIcon />,
        contentKey: "Security Incident",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Baggage Security Supervisor Dashboard": BaggageSecuritySupervisorDashboard,
      "Security Incident": SecurityIncident,
      ...generalConfig.components,
    },
    defaultContentKey: "Baggage Security Supervisor Dashboard",
  },
  "Cargo Manager": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Cargo Manager Dashboard",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Cargo Manager Dashboard": CargoManagerDashboard,
      ...generalConfig.components,
    },
    defaultContentKey: "Cargo Manager Dashboard",
  },
  "Logistics Manager": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Logistics Manager Dashboard",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Logistics Manager Dashboard": LogisticsManagerDashboard,
      ...generalConfig.components,
    },
    defaultContentKey: "Logistics Manager Dashboard",
  },
  "Fuel Manager": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Fuel Manager Dashboard",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Fuel Manager Dashboard": FuelManagerDashboard,
      ...generalConfig.components,
    },
    defaultContentKey: "Fuel Manager Dashboard",
  },
  "Cargo Handler": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Cargo Handler Dashboard",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Cargo Handler Dashboard": CargoHandlerDashboard,
      ...generalConfig.components,
    },
    defaultContentKey: "Cargo Handler Dashboard",
  },
  "Civil Engineering Manager": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Civil Engineering Manager Dashboard",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Civil Engineering Manager Dashboard": CivilEngineeringManagerDashboard,
      ...generalConfig.components,
    },
    defaultContentKey: "Civil Engineering Manager Dashboard",
  },
  "Airport Director": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Airport Director Dashboard",
      },
      {
        text: "Download Report",
        icon: <SimCardDownloadIcon />,
        contentKey: "Download Report",
      },
      {
        text: "Track Revenue",
        icon: <StackedLineChartIcon />,
        contentKey: "Track Revenue",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Airport Director Dashboard": AirportDirectorDashboard,
      "Download Report": DownloadReport,
      "Track Revenue": TrackRevenue,
      ...generalConfig.components,
    },
    defaultContentKey: "Airport Director Dashboard",
  },
  "Chief Financial Officer": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Chief Financial Officer Dashboard",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Chief Financial Officer Dashboard": ChiefFinancialOfficerDashboard,
      ...generalConfig.components,
    },
    defaultContentKey: "Chief Financial Officer Dashboard",
  },
  "Chief Operation Officer": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Chief Operation Officer Dashboard",
      },
      {
        text: "Airport Facility",
        icon: <FactoryIcon />,
        contentKey: "Airport Facility",
      },
      {
        text: "Facility Maintenance",
        icon: <ConstructionIcon />,
        contentKey: "Maintenance Schedule",
      },
      {
        text: "Scheduled Flights",
        icon: <EventNoteIcon />,
        contentKey: "Scheduled Flights",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Chief Operation Officer Dashboard": ChiefOperationOfficerDashboard,
      "Airport Facility": AirportFacility,
      "Maintenance Schedule": MaintenanceSchedule,
      "Scheduled Flights": ScheduledFlights,
      ...generalConfig.components,
    },
    defaultContentKey: "Chief Operation Officer Dashboard",
  },
  "Chief Security Officer": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Chief Security Officer Dashboard",
      },
      {
        text: "Security Incident",
        icon: <PrivacyTipIcon />,
        contentKey: "Security Incident",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Chief Security Officer Dashboard": ChiefSecurityOfficerDashboard,
      "Security Incident": SecurityIncident,
      ...generalConfig.components,
    },
    defaultContentKey: "Chief Security Officer Dashboard",
  },
  "Human Resource Director": {
    ...generalConfig,
    menu: [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        contentKey: "Hrd Dashboard",
      },
      {
        text: "Create Account",
        icon: <PersonAddAlt1Icon />,
        contentKey: "Create Account",
      },
      {
        text: "Employee Training",
        icon: <LibraryBooksIcon />,
        contentKey: "Employee Training",
      },
      ...generalConfig.menu,
    ],
    components: {
      "Hrd Dashboard": HrdDashboard,
      "Create Account": CreateAccount,
      "Employee Training": EmployeeTraining,
      ...generalConfig.components,
    },
    defaultContentKey: "Hrd Dashboard",
  },
};

export default DashboardConfig;
