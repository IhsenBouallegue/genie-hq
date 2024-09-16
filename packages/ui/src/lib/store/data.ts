// data.ts

import {
  type Application,
  Category,
  OperatingSystem,
  PackageManager,
  type Profile,
} from "../store/types";
import { IconId } from "./icons"; // Import IconId

// Step 1: Define the application data
export const applications: Application[] = [
  {
    id: "1",
    title: "Visual Studio Code",
    icon: IconId.VisualStudioCode,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Microsoft.VisualStudioCode",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "visual-studio-code",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "code",
      },
    ],
  },
  {
    id: "2",
    title: "Jupyter Notebook",
    icon: IconId.JupyterNotebook,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Jupyter.Jupyter",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "jupyter",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "jupyter-notebook",
      },
    ],
  },
  {
    id: "3",
    title: "Adobe Photoshop",
    icon: IconId.AdobePhotoshop,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Adobe.Photoshop",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "adobe-photoshop",
      },
    ],
  },
  {
    id: "4",
    title: "Arduino IDE",
    icon: IconId.ArduinoIDE,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "ArduinoSA.IDE.stable",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "arduino",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "arduino",
      },
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Scoop,
        packageId: "extras/arduino",
      },
    ],
  },
  {
    id: "5",
    title: "Slack",
    icon: IconId.Slack,
    category: Category.Communication,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "SlackTechnologies.Slack",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "slack",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "slack-desktop",
      },
    ],
  },
  {
    id: "6",
    title: "Git",
    icon: IconId.Git,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Git.Git",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "git",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "git",
      },
    ],
  },
  {
    id: "7",
    title: "Tableau",
    icon: IconId.Tableau,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Tableau.Tableau",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "tableau",
      },
    ],
  },
  {
    id: "8",
    title: "Sketch",
    icon: IconId.Sketch,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "sketch",
      },
    ],
  },
  {
    id: "9",
    title: "Python (latest)",
    icon: IconId.Python,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Python.Python.3",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "python",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "python3",
      },
    ],
  },
  {
    id: "10",
    title: "Java (JDK) (latest)",
    icon: IconId.Java,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Oracle.JavaJDK",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "openjdk",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "default-jdk",
      },
    ],
  },
  {
    id: "11",
    title: "C++ (latest)",
    icon: IconId.CPlusPlus,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Microsoft.VisualStudioCommunity",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "gcc",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "g++",
      },
    ],
  },
  {
    id: "12",
    title: "PyCharm",
    icon: IconId.PyCharm,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "JetBrains.PyCharm.Community",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "pycharm-ce",
      },
    ],
  },
  {
    id: "13",
    title: "IntelliJ IDEA",
    icon: IconId.IntelliJIDEA,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "JetBrains.IntelliJIDEA.Community",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "intellij-idea-ce",
      },
    ],
  },
  {
    id: "14",
    title: "Eclipse",
    icon: IconId.Eclipse,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "EclipseFoundation.EclipseIDE",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "eclipse-java",
      },
    ],
  },
  {
    id: "15",
    title: "Power BI",
    icon: IconId.PowerBI,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Microsoft.PowerBI",
      },
    ],
  },
  {
    id: "16",
    title: "Figma",
    icon: IconId.Figma,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "figma",
      },
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Figma.Figma",
      },
    ],
  },
  {
    id: "17",
    title: "Google Chrome",
    icon: IconId.GoogleChrome,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Google.Chrome",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "google-chrome",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "google-chrome-stable",
      },
    ],
  },
  {
    id: "18",
    title: "Firefox",
    icon: IconId.Firefox,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Mozilla.Firefox",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "firefox",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "firefox",
      },
    ],
  },
  {
    id: "19",
    title: "Safari",
    icon: IconId.Safari,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "safari",
      },
    ],
  },
  {
    id: "20",
    title: "Opera",
    icon: IconId.Opera,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Opera.Opera",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "opera",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "opera-stable",
      },
    ],
  },
  {
    id: "21",
    title: "Microsoft Edge",
    icon: IconId.MicrosoftEdge,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Microsoft.Edge",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "microsoft-edge",
      },
    ],
  },
  {
    id: "22",
    title: "Brave",
    icon: IconId.Brave,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "BraveSoftware.BraveBrowser",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "brave-browser",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "brave-browser",
      },
    ],
  },
  {
    id: "23",
    title: "Vivaldi",
    icon: IconId.Vivaldi,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "VivaldiTechnologies.Vivaldi",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "vivaldi",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "vivaldi-stable",
      },
    ],
  },
  {
    id: "24",
    title: "Tor Browser",
    icon: IconId.TorBrowser,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "TheTorProject.TorBrowser",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "tor-browser",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "torbrowser-launcher",
      },
    ],
  },
  {
    id: "25",
    title: "Postman",
    icon: IconId.Postman,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Postman.Postman",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "postman",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "postman",
      },
    ],
  },
  {
    id: "26",
    title: "MongoDB Compass",
    icon: IconId.MongoDBCompass,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "MongoDB.MongoDBCompass",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "mongodb-compass",
      },
    ],
  },
  {
    id: "27",
    title: "Anaconda",
    icon: IconId.Anaconda,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Anaconda.Anaconda",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "anaconda",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "anaconda", // Note: Anaconda is typically installed via an installer script, not APT
      },
    ],
  },
  {
    id: "28",
    title: "Zoom",
    icon: IconId.Zoom,
    category: Category.Communication,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Zoom.Zoom",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "zoom",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "zoom-client",
      },
    ],
  },
  {
    id: "29",
    title: "Notion",
    icon: IconId.Notion,
    category: Category.Communication,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Notion.Notion",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "notion",
      },
    ],
  },
  {
    id: "30",
    title: "Adobe Illustrator",
    icon: IconId.AdobeIllustrator,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Adobe.Illustrator",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "adobe-illustrator",
      },
    ],
  },
  {
    id: "31",
    title: "Adobe Premiere Pro",
    icon: IconId.AdobePremierePro,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Adobe.PremierePro",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "adobe-premiere-pro",
      },
    ],
  },
  {
    id: "32",
    title: "Spotify",
    icon: IconId.Spotify,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Spotify.Spotify",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "spotify",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "spotify-client",
      },
    ],
  },
  {
    id: "33",
    title: "VLC Media Player",
    icon: IconId.VLCMediaPlayer,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "VideoLAN.VLC",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "vlc",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "vlc",
      },
    ],
  },
  {
    id: "34",
    title: "Discord",
    icon: IconId.Discord,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Discord.Discord",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "discord",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "discord",
      },
    ],
  },
  {
    id: "35",
    title: "Evernote",
    icon: IconId.Evernote,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Evernote.Evernote",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "evernote",
      },
    ],
  },
  {
    id: "36",
    title: "Thunderbird",
    icon: IconId.Thunderbird,
    category: Category.Communication,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Mozilla.Thunderbird",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "thunderbird",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "thunderbird",
      },
    ],
  },
  {
    id: "37",
    title: "Skype",
    icon: IconId.Skype,
    category: Category.Communication,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Skype.Skype",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "skype",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "skypeforlinux",
      },
    ],
  },
  {
    id: "38",
    title: "Krita",
    icon: IconId.Krita,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Krita.Krita",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "krita",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "krita",
      },
    ],
  },
  {
    id: "39",
    title: "Blender",
    icon: IconId.Blender,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "BlenderFoundation.Blender",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "blender",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "blender",
      },
    ],
  },
  {
    id: "40",
    title: "OpenOffice",
    icon: IconId.OpenOffice,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "Apache.OpenOffice",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "openoffice",
      },
    ],
  },
  {
    id: "41",
    title: "LibreOffice",
    icon: IconId.LibreOffice,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "TheDocumentFoundation.LibreOffice",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "libreoffice",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "libreoffice",
      },
    ],
  },
  {
    id: "42",
    title: "DBeaver",
    icon: IconId.DBeaver,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "DBeaver.DBeaver",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "dbeaver-community",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        packageId: "dbeaver-ce",
      },
    ],
  },
  {
    id: "43",
    title: "Arc",
    icon: IconId.Arc,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        packageId: "TheArcBrowser.Arc",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        packageId: "arc-browser",
      },
    ],
  },
];

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
