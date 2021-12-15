import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ImageEditor from "./image-editor";
import RemoveBgML from "./remove-bg";
import PS from "./ps";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageEditor />} />
        <Route path="/ml" element={<RemoveBgML />} />
        <Route path="/ps" element={<PS />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
