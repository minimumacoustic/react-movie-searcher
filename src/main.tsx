import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter basename="react-movie-searcher">
        <App />
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>,
);
