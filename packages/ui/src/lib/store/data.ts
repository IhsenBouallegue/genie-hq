import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAnaconda,
  SiApacheopenoffice,
  SiArc,
  SiArduino,
  SiBlender,
  SiBrave,
  SiCplusplus,
  SiDbeaver,
  SiDiscord,
  SiEclipseide,
  SiEvernote,
  SiFigma,
  SiFirefox,
  SiGit,
  SiGooglechrome,
  SiIntellijidea,
  SiJavascript,
  SiJupyter,
  SiKrita,
  SiLibreoffice,
  SiMicrosoftedge,
  SiMongodb,
  SiNotion,
  SiOpera,
  SiPostman,
  SiPowerbi,
  SiPycharm,
  SiPython,
  SiSafari,
  SiSketch,
  SiSkype,
  SiSlack,
  SiSpotify,
  SiTableau,
  SiThunderbird,
  SiTorbrowser,
  SiVisualstudiocode,
  SiVivaldi,
  SiVlcmediaplayer,
  SiZoom,
} from "@icons-pack/react-simple-icons";
import {
  type Application,
  Category,
  OperatingSystem,
  PackageManager,
  type Profile,
} from "../store/types";

export const applications: Application[] = [
  {
    id: "1",
    title: "Visual Studio Code",
    icon: SiVisualstudiocode,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=Microsoft.VisualStudioCode --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask visual-studio-code",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install code",
      },
    ],
  },
  {
    id: "2",
    title: "Jupyter Notebook",
    icon: SiJupyter,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Jupyter.Jupyter --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install jupyter",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install jupyter-notebook",
      },
    ],
  },
  {
    id: "3",
    title: "Adobe Photoshop",
    icon: SiAdobephotoshop,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Adobe.Photoshop --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask adobe-photoshop",
      },
    ],
  },
  {
    id: "4",
    title: "Arduino IDE",
    icon: SiArduino,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=Arduino.ArduinoIDE --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask arduino",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install arduino",
      },
    ],
  },
  {
    id: "5",
    title: "Slack",
    icon: SiSlack,
    category: Category.Communication,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=SlackTechnologies.Slack --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask slack",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo snap install slack --classic",
      },
    ],
  },
  {
    id: "6",
    title: "Git",
    icon: SiGit,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Git.Git --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install git",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install git",
      },
    ],
  },
  {
    id: "7",
    title: "Tableau",
    icon: SiTableau,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Tableau.Tableau --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask tableau",
      },
    ],
  },
  {
    id: "8",
    title: "Sketch",
    icon: SiSketch,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask sketch",
      },
    ],
  },
  {
    id: "9",
    title: "Python (latest)",
    icon: SiPython,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Python.Python.3 --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install python",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install python3",
      },
    ],
  },
  {
    id: "10",
    title: "Java (JDK) (latest)",
    icon: SiJavascript,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Oracle.JavaJDK --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install openjdk",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install default-jdk",
      },
    ],
  },
  {
    id: "11",
    title: "C++ (latest)",
    icon: SiCplusplus,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=Microsoft.VisualStudioCommunity --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install gcc",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install g++",
      },
    ],
  },
  {
    id: "12",
    title: "PyCharm",
    icon: SiPycharm,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=JetBrains.PyCharm.Community --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask pycharm-ce",
      },
    ],
  },
  {
    id: "13",
    title: "IntelliJ IDEA",
    icon: SiIntellijidea,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=JetBrains.IntelliJIDEA.Community --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask intellij-idea-ce",
      },
    ],
  },
  {
    id: "14",
    title: "Eclipse",
    icon: SiEclipseide,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=EclipseFoundation.EclipseIDE --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask eclipse-java",
      },
    ],
  },
  {
    id: "15",
    title: "Power BI",
    icon: SiPowerbi,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Microsoft.PowerBI --source winget",
      },
    ],
  },
  {
    id: "16",
    title: "Figma",
    icon: SiFigma,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask figma",
      },
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Figma.Figma --source winget",
      },
    ],
  },
  {
    id: "17",
    title: "Google Chrome",
    icon: SiGooglechrome,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Google.Chrome --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask google-chrome",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install google-chrome-stable",
      },
    ],
  },
  {
    id: "18",
    title: "Firefox",
    icon: SiFirefox,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Mozilla.Firefox --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask firefox",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install firefox",
      },
    ],
  },
  {
    id: "19",
    title: "Safari",
    icon: SiSafari,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask safari",
      },
    ],
  },
  {
    id: "20",
    title: "Opera",
    icon: SiOpera,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Opera.Opera --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask opera",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo snap install opera",
      },
    ],
  },
  {
    id: "21",
    title: "Microsoft Edge",
    icon: SiMicrosoftedge,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Microsoft.Edge --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask microsoft-edge",
      },
    ],
  },
  {
    id: "22",
    title: "Brave",
    icon: SiBrave,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=BraveSoftware.BraveBrowser --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask brave-browser",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install brave-browser",
      },
    ],
  },
  {
    id: "23",
    title: "Vivaldi",
    icon: SiVivaldi,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=VivaldiTechnologies.Vivaldi --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask vivaldi",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install vivaldi-stable",
      },
    ],
  },
  {
    id: "24",
    title: "Tor Browser",
    icon: SiTorbrowser,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=TheTorProject.TorBrowser --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask tor-browser",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install torbrowser-launcher",
      },
    ],
  },
  {
    id: "25",
    title: "Postman",
    icon: SiPostman,
    category: Category.Code,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Postman.Postman --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask postman",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo snap install postman",
      },
    ],
  },
  {
    id: "26",
    title: "MongoDB Compass",
    icon: SiMongodb,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=MongoDB.MongoDBCompass --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask mongodb-compass",
      },
    ],
  },
  {
    id: "27",
    title: "Anaconda",
    icon: SiAnaconda,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Anaconda.Anaconda --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask anaconda",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install anaconda", // Assuming there's a custom PPA, as Anaconda isn't directly in default APT repositories
      },
    ],
  },
  {
    id: "28",
    title: "Zoom",
    icon: SiZoom,
    category: Category.Communication,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Zoom.Zoom --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask zoom",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo snap install zoom-client",
      },
    ],
  },
  {
    id: "29",
    title: "Notion",
    icon: SiNotion,
    category: Category.Communication,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Notion.Notion --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask notion",
      },
    ],
  },
  {
    id: "30",
    title: "Adobe Illustrator",
    icon: SiAdobeillustrator,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Adobe.Illustrator --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask adobe-illustrator",
      },
    ],
  },
  {
    id: "31",
    title: "Adobe Premiere",
    icon: SiAdobepremierepro,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Adobe.PremierePro --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask adobe-premiere-pro",
      },
    ],
  },
  {
    id: "32",
    title: "Spotify",
    icon: SiSpotify,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Spotify.Spotify --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask spotify",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo snap install spotify",
      },
    ],
  },
  {
    id: "33",
    title: "VLC Media Player",
    icon: SiVlcmediaplayer,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=VideoLAN.VLC --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask vlc",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install vlc",
      },
    ],
  },
  {
    id: "34",
    title: "Discord",
    icon: SiDiscord,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Discord.Discord --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask discord",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo snap install discord",
      },
    ],
  },
  {
    id: "35",
    title: "Evernote",
    icon: SiEvernote,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Evernote.Evernote --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask evernote",
      },
    ],
  },
  {
    id: "36",
    title: "Thunderbird",
    icon: SiThunderbird,
    category: Category.Communication,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=Mozilla.Thunderbird --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask thunderbird",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install thunderbird",
      },
    ],
  },
  {
    id: "37",
    title: "Skype",
    icon: SiSkype,
    category: Category.Communication,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Skype.Skype --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask skype",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo snap install skype --classic",
      },
    ],
  },
  {
    id: "38",
    title: "Krita",
    icon: SiKrita,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Krita.Krita --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask krita",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install krita",
      },
    ],
  },
  {
    id: "39",
    title: "Blender",
    icon: SiBlender,
    category: Category.Design,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=BlenderFoundation.Blender --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask blender",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install blender",
      },
    ],
  },
  {
    id: "40",
    title: "OpenOffice",
    icon: SiApacheopenoffice,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=Apache.OpenOffice --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask apache-openoffice",
      },
    ],
  },
  {
    id: "41",
    title: "LibreOffice",
    icon: SiLibreoffice,
    category: Category.Miscellaneous,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand:
          "winget install --id=TheDocumentFoundation.LibreOffice --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask libreoffice",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo apt install libreoffice",
      },
    ],
  },
  {
    id: "42",
    title: "DBeaver",
    icon: SiDbeaver,
    category: Category.Data,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=DBeaver.DBeaver --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask dbeaver-community",
      },
      {
        os: OperatingSystem.Ubuntu,
        packageManager: PackageManager.APT,
        installCommand: "sudo snap install dbeaver-ce",
      },
    ],
  },
  {
    id: "43",
    title: "Arc",
    icon: SiArc,
    category: Category.Browser,
    installationMethods: [
      {
        os: OperatingSystem.Windows,
        packageManager: PackageManager.Winget,
        installCommand: "winget install --id=TheArcBrowser.Arc --source winget",
      },
      {
        os: OperatingSystem.MacOS,
        packageManager: PackageManager.Homebrew,
        installCommand: "brew install --cask arc-browser",
      },
    ],
  },
];

export const profiles: Profile[] = [
  {
    id: "1",
    title: "Web Developer",
    relevantApplications: [
      "1",
      "6",
      "9",
      "10",
      "12",
      "13",
      "14",
      "17",
      "18",
      "19",
      "25",
    ],
    image: "/avatars/avatar-1.jpg",
  },
  {
    id: "2",
    title: "Data Scientist",
    relevantApplications: [
      "2",
      "7",
      "9",
      "10",
      "15",
      "17",
      "18",
      "26",
      "27",
      "42",
    ],
    image: "/avatars/avatar-11.jpg",
  },
  {
    id: "3",
    title: "Designer",
    relevantApplications: [
      "3",
      "8",
      "16",
      "17",
      "18",
      "20",
      "30",
      "31",
      "38",
      "39",
    ],
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
