import Sidebar from "@/components/chat/Sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex max-h-dvh w-full overflow-hidden">
      <Sidebar className=" " />

      <main className="relative w-full bg-[#111111]">{children}</main>
    </section>
  );
}
