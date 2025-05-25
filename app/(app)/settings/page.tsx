import SettingsContent from "@/components/settings/SettingContent";
import { api } from "@/convex/_generated/api";

export default async function Settings() {
  return (
    <div className="flex flex-col w-full  gap-4">
      <SettingsContent />
    </div>
  );
}
