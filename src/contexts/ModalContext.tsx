import { createContext, useContext, useState } from "react";

type ModelInterface = {
  isOpen: boolean;
  closeModal: () => void;
  modelContent: React.ReactNode | null;
  showModel: (content: React.ReactNode) => void;
};
const initialProps: ModelInterface = {
  isOpen: false,
  closeModal: () => {},
  modelContent: null,
  showModel: (content: React.ReactNode) => {},
};

const ModalContext = createContext<ModelInterface>(initialProps);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modelContent, setModelContent] = useState<React.ReactNode | null>(
    null
  );

  const closeModal = () => {
    setModelContent(null);
    setIsOpen(false);
  };

  const showModel = (content: React.ReactNode) => {
    setModelContent(content);
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, closeModal, modelContent, showModel }}
    >
      {children}
    </ModalContext.Provider>
  );
};
