import { atom, useAtom } from "jotai";

// Sidebar visibility state atom
export const sidebarOpenAtom = atom(false);

export function useSidebarToggle() {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggleSidebar };
}
