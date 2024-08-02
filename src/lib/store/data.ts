import {
  SiAdobephotoshop,
  SiArduino,
  SiCplusplus,
  SiEclipseide,
  SiFigma,
  SiGithub,
  SiIntellijidea,
  SiJavascript,
  SiJupyter,
  SiPycharm,
  SiPython,
  SiSketch,
  SiSlack,
  SiTableau,
  SiVisualstudiocode,
} from "@icons-pack/react-simple-icons";
import { LucideFileQuestion } from "lucide-react";
import { type Application, Category, type Profile } from "../store/types";

export const applications: Application[] = [
  {
    id: "1",
    title: "Visual Studio Code",
    category: Category.Code,
    icon: SiVisualstudiocode,
  },
  {
    id: "2",
    title: "Jupyter Notebook",
    category: Category.Data,
    icon: SiJupyter,
  },
  {
    id: "3",
    title: "Adobe Photoshop",
    category: Category.Design,
    icon: SiAdobephotoshop,
  },
  {
    id: "4",
    title: "Arduino IDE",
    category: Category.Code,
    icon: SiArduino,
  },
  {
    id: "5",
    title: "Slack",
    category: Category.Communication,
    icon: SiSlack,
  },
  {
    id: "6",
    title: "GitHub",
    category: Category.Code,
    icon: SiGithub,
  },
  {
    id: "7",
    title: "Tableau",
    category: Category.Data,
    icon: SiTableau,
  },
  {
    id: "8",
    title: "Sketch",
    category: Category.Design,
    icon: SiSketch,
  },
  {
    id: "9",
    title: "Python",
    category: Category.Code,
    icon: SiPython,
  },
  {
    id: "10",
    title: "Java (JDK)",
    category: Category.Code,
    icon: SiJavascript,
  },
  {
    id: "11",
    title: "C++",
    category: Category.Code,
    icon: SiCplusplus,
  },
  {
    id: "12",
    title: "PyCharm",
    category: Category.Code,
    icon: SiPycharm,
  },
  {
    id: "13",
    title: "IntelliJ IDEA",
    category: Category.Code,
    icon: SiIntellijidea,
  },
  {
    id: "14",
    title: "Eclipse",
    category: Category.Code,
    icon: SiEclipseide,
  },
  {
    id: "15",
    title: "MATLAB",
    category: Category.Data,
    icon: LucideFileQuestion,
  },
  {
    id: "16",
    title: "Figma",
    category: Category.Design,
    icon: SiFigma,
  },
];

export const profiles: Profile[] = [
  {
    id: "1",
    title: "Web Developer",
    relevantApplications: ["1", "6", "9", "10", "12", "13", "14"],
  },
  {
    id: "2",
    title: "Data Scientist",
    relevantApplications: ["2", "7", "9", "10", "15"],
  },
  {
    id: "3",
    title: "Designer",
    relevantApplications: ["3", "8", "16"],
  },
  {
    id: "4",
    title: "Embedded Developer",
    relevantApplications: ["4", "11"],
  },
  {
    id: "5",
    title: "Project Manager",
    relevantApplications: ["5"],
  },
  {
    id: "custom",
    title: "Custom",
    relevantApplications: [],
  },
];
