import React from "react";
import Onboarding from "./sidebar-pills/Onboarding.jsx";
import DoctorProfile from "./sidebar-pills/DoctorProfile.jsx";
import DoctorCalendarAvailability from "./sidebar-pills/DoctorCalendarAvailability.jsx";
import AppointmentManagement from "./sidebar-pills/AppointmentManagement.jsx";
import PatientCRM from "./sidebar-pills/PatientCRM.jsx";
import MyServices from "./sidebar-pills/MyServices.jsx";
import ChatAndVideo from "./sidebar-pills/ChatAndVideo.jsx";
import Notifications from "./sidebar-pills/Notifications.jsx";

const DoctorSidebar = ({
  activeSection,
  setActiveSection,
  userName,
  onNavigate,
  containerClassName = "flex flex-col gap-4 border-r border-border bg-muted px-4 py-6",
}) => {
  const handleClick = (sectionId, callback) => () => {
    setActiveSection(sectionId);
    onNavigate?.();
    callback?.();
  };

  const greetingHour = new Date().getHours();
  let greeting = "Hello";
  if (greetingHour < 12) greeting = "Good morning";
  else if (greetingHour < 17) greeting = "Good afternoon";
  else greeting = "Good evening";

  const sections = {
    onboarding: "2.1",
    doctorProfile: "2.2",
    calendar: "2.3",
    appointment: "2.4",
    patient: "2.5",
    services: "2.6",
    chat: "2.11",
    notifications: "2.12",
  };

  return (
    <div className={containerClassName}>
      <div className="space-y-3">
        <div className="rounded-3xl border border-border bg-card px-5 py-5 shadow-sm">
          <div
            className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white shadow-[0_0_12px_rgba(37,99,235,1),0_0_20px_rgba(16,185,129,1)]"
          >
            Doorspital
          </div>
          <p className="mt-2 text-lg text-slate-500">
            {greeting},{" "}
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {userName ?? "Doctor"}
            </span>
          </p>
        </div>
        <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-400" />
      </div>

      <nav className="flex-1 space-y-3 overflow-y-auto px-1 pt-3">
        <Onboarding
          isActive={activeSection === sections.onboarding}
          onClick={handleClick(sections.onboarding)}
        />
        <DoctorProfile
          isActive={activeSection === sections.doctorProfile}
          onClick={handleClick(sections.doctorProfile)}
        />
        <DoctorCalendarAvailability
          isActive={activeSection === sections.calendar}
          onClick={handleClick(sections.calendar)}
        />
        <AppointmentManagement
          isActive={activeSection === sections.appointment}
          onClick={handleClick(sections.appointment)}
        />
        <PatientCRM
          isActive={activeSection === sections.patient}
          onClick={handleClick(sections.patient)}
        />
        <MyServices
          isActive={activeSection === sections.services}
          onClick={handleClick(sections.services)}
        />
        <ChatAndVideo
          isActive={activeSection === sections.chat}
          onClick={handleClick(sections.chat)}
        />
        <Notifications
          isActive={activeSection === sections.notifications}
          onClick={handleClick(sections.notifications)}
        />
      </nav>
    </div>
  );
};

export default DoctorSidebar;


