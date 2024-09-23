import Group from "@/components/group";
import InstallationApplication from "@/components/installation-sidebar/installation-application";
import { useGenieStore } from "@/providers/genie-store-provider";
import { motion } from "framer-motion";
import { MagicMotion } from "react-magic-motion";
export default function InstallationSidebar() {
  const installationQueue = useGenieStore((state) => state.installationQueue);
  const applications = useGenieStore((state) => state.applications);
  if (Object.keys(installationQueue).length === 0) return null;
  return (
    <motion.div
      initial={{ x: 200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.2 }}
      className="sticky top-4"
    >
      <MagicMotion transition={{ type: "spring", stiffness: 100 }}>
        <Group label="Queued Apps" className="p-0 md:p-3 ml-4 w-72 ">
          {Object.keys(installationQueue).length > 0 &&
            Object.values(applications)
              .filter((app) => installationQueue[app.id])
              .map((app) => (
                <InstallationApplication
                  key={app.id}
                  title={app.title}
                  icon={app.icon}
                  status={installationQueue[app.id]?.status || "queued"}
                />
              ))}
        </Group>
      </MagicMotion>
    </motion.div>
  );
}
