import { useState, useEffect, useRef, useCallback } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleClickOutside = useCallback((event: MouseEvent): void => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    });

    return () => {
      document.removeEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          closeModal();
        }
      });
    };
  }, [handleClickOutside, isOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return { isOpen, modalRef, openModal, closeModal };
}

export default useModal;
