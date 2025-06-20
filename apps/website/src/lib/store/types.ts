import type { IconType } from "@icons-pack/react-simple-icons";

export type ApplicationId = string;
export type ProfileId = string;

export interface Profile {
  id: ProfileId;
  title: string;
  image: string;
  relevantApplications: ApplicationId[];
}

export interface Application {
  id: ApplicationId;
  title: string;
  icon: string;
  category: Category;
}

export enum Category {
  Browser = "Browser",
  Code = "Code",
  Data = "Data",
  Design = "Design",
  Communication = "Communication",
  Miscellaneous = "Miscellaneous",
}

export interface ParallaxImage {
  id: string;
  iconSrc: string;
  depth: number;
}
