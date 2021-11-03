import { lazy } from "react";

const Forms = lazy(() => import("../pages/Forms"));
const Exam = lazy(() => import("../pages/Exam"));
const Organizations = lazy(() => import("../pages/Organizations"));
const QBank = lazy(() => import("../pages/QBank"));
const Report = lazy(() => import("../pages/Report"));
const CreateSchedule = lazy(() => import("../pages/CreateSchedules.js"));
const CreateOrganization = lazy(() => import("../pages/CreateOrganizations"));
const CreateParticipant = lazy(() => import("../pages/CreateParticipants.js"));
const CreateSection = lazy(() => import("../pages/CreateSections"));
const CreateQuestion = lazy(() => import("../pages/CreateQuestions"));
const Profiles = lazy(() => import("../pages/Profiles"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
const CreateProfiles = lazy(() => import("../pages/CreateProfiles"));
const EditQuestions = lazy(() => import("../pages/EditQuestions"));
const OrganizationList = lazy(() =>
  import("../pages/Organization/OrganizationList")
);

const routes = [
  {
    path: "/exam",
    component: Exam,
    roles: ["super_admin", "proctor"],
  },
  {
    path: "/exam/create-schedule",
    component: CreateSchedule,
    roles: ["super_admin"],
  },
  {
    path: "/exam/edit-schedule/:id",
    component: CreateSchedule,
    roles: ["super_admin"],
  },
  {
    path: "/organization",
    component: OrganizationList,
    roles: ["super_admin"],
  },
  {
    path: "/organization/new",
    component: CreateOrganization,
    roles: ["super_admin"],
  },
  {
    path: "/organizations/edit-organization/:id",
    component: CreateOrganization,
    roles: ["super_admin"],
  },
  {
    path: "/organizations/create-participant",
    component: CreateParticipant,
    roles: ["super_admin"],
  },
  {
    path: "/organizations/edit-participant/:id",
    component: CreateParticipant,
    roles: ["super_admin"],
  },
  {
    path: "/qbank",
    component: QBank,
    roles: ["super_admin"],
  },
  {
    path: "/qbank/create-section",
    component: CreateSection,
    roles: ["super_admin"],
  },
  {
    path: "/qbank/edit-section/:id",
    component: CreateSection,
    roles: ["super_admin"],
  },
  {
    path: "/qbank/create-question",
    component: CreateQuestion,
    roles: ["super_admin"],
  },
  {
    path: "/qbank/edit-question/:id",
    component: EditQuestions,
    roles: ["super_admin"],
  },
  {
    path: "/report",
    component: Report,
    roles: ["super_admin"],
  },
  {
    path: "/profiles",
    component: Profiles,
    roles: ["super_admin"],
  },
  {
    path: "/profiles/create-profile",
    component: CreateProfiles,
    roles: ["super_admin"],
  },
  {
    path: "/profiles/edit-profile/:id",
    component: EditProfile,
    roles: ["super_admin"],
  },
  {
    path: "/forms",
    component: Forms,
    roles: ["super_admin"],
  },
];

export default routes;
