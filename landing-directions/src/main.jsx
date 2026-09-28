import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./reference/image-slot.js";
import "./reference/site.css";

createRoot(document.getElementById("root")).render(<App />);
