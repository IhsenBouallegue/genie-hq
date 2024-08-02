import type { IconType } from "@icons-pack/react-simple-icons";
import type { ReactElement } from "react";

export type ApplicationId = string;
export type ProfileId = string;

export interface Profile {
  id: ProfileId;
  title: string;
  relevantApplications: ApplicationId[];
}

export interface Application {
  id: ApplicationId;
  title: string;
  icon: IconType;
  category: Category;
}

export enum Category {
  Code = "Code",
  Data = "Data",
  Design = "Design",
  Communication = "Communication",
  Miscellaneous = "Miscellaneous",
}
