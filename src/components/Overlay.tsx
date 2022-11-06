import { useEffect } from "react";
import { useModal } from "../contexts/ModalContext";

export const Overlay: React.FC<{}> = ({}) => {
  const { isOpen: show, modelContent, closeModal } = useModal();

  useEffect(() => {
    function escFunction(event: KeyboardEvent) {
      if (event.code === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, []);

  if (!show) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black/50 z-10 flex justify-center items-center">
      {modelContent}
    </div>
  );
};
