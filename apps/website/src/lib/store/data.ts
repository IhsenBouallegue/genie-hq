import type { ParallaxImage, Profile } from "../store/types";

export const profiles: Profile[] = [
  {
    id: "1",
    title: "Web Developer",
    relevantApplications: ["1", "6", "9", "10", "12", "13", "14", "17", "18", "19", "25"],
    image: "/avatars/avatar-1.jpg",
  },
  {
    id: "2",
    title: "Data Scientist",
    relevantApplications: ["2", "7", "9", "10", "15", "17", "18", "26", "27", "42"],
    image: "/avatars/avatar-11.jpg",
  },
  {
    id: "3",
    title: "Designer",
    relevantApplications: ["3", "8", "16", "17", "18", "20", "30", "31", "38", "39"],
    image: "/avatars/avatar-9.jpg",
  },
  {
    id: "4",
    title: "Embedded Developer",
    relevantApplications: ["4", "11", "21", "22"],
    image: "/avatars/avatar-2.jpg",
  },
  {
    id: "5",
    title: "Project Manager",
    relevantApplications: ["5", "23", "24", "28", "29", "36", "37"],
    image: "/avatars/avatar-7.jpg",
  },
  {
    id: "custom",
    title: "Custom",
    relevantApplications: [],
    image: "/avatars/avatar-8.jpg",
  },
];

export const parallaxImages: ParallaxImage[] = [
  { id: "image1", iconSrc: "/l1.svg", depth: 1 },
  { id: "image2", iconSrc: "/l2.svg", depth: 2 },
  { id: "image3", iconSrc: "/l3.svg", depth: 3 },
  { id: "image4", iconSrc: "/l4.svg", depth: 4 },
  { id: "image5", iconSrc: "/l5.svg", depth: 5 },
];
