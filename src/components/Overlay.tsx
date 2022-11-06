import { useModal } from "../contexts/ModalContext";

export const Overlay: React.FC<{}> = ({}) => {
  const { isOpen: show, modelContent } = useModal();

  if (!show) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black/50 z-10 flex justify-center items-center">
      {modelContent}
    </div>
  );
};
