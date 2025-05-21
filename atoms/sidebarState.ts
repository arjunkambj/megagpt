import { atom, useAtom } from "jotai";

// Sidebar visibility state atom
export const sidebarOpenAtom = atom(false);

export function useSidebarToggle() {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onOpenChange = (open: boolean) => setIsOpen(open);

  return { isOpen, onOpen, onClose, onOpenChange };
}
