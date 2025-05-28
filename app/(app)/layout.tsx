import { Provider } from "jotai";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <section className="flex max-h-dvh  overflow-hidden h-dvh w-dvw max-w-dvw">
        {children}
      </section>
    </Provider>
  );
}
