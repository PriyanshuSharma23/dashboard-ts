import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";

import { UserContextProvider } from "./contexts/UserContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ModalContextProvider } from "./contexts/ModalContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
