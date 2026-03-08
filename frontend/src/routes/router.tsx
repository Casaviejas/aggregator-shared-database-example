import { BrowserRouter, Routes, Route } from "react-router";

import { ProfilePage } from "../pages/ProfilePage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile-page" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};
