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
  icon: IconType;
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

export interface ParallaxIcon {
  id: string;
  depth: number;
  icon: IconType;
}
