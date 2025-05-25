import { Provider } from "jotai";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <section className="flex h-dvh w-dvw">{children}</section>
    </Provider>
  );
}
