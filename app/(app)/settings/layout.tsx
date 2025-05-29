import SettingsButton from "@/components/settings/SettingsButton";
import UserStat from "@/components/settings/UserStat";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-col w-full h-full">
      <div className="relative flex hidden md:flex flex-col bg-default-50 justify-center items-center w-full h-screen">
        <SettingsButton />
        <div className="flex flex-col gap-4 max-w-7xl px-5 py-6 w-full h-full rounded-lg shadow-sm">
          <div className="flex w-full h-full flex-row gap-10">
            <UserStat />
            <div className="flex flex-col w-full h-full">{children}</div>
          </div>
        </div>
      </div>
      <div className="relative overflow-y-auto bg-default-50 flex flex-col w-full min-h-screen h-full md:hidden">
        <SettingsButton />
        <div className="flex flex-col justify-center items-center gap-4 px-4 py-4 w-full">
          <UserStat />
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex flex-col w-full h-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
