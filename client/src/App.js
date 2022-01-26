import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { ArtPage } from "./pages/ArtPage";
import { MainPage } from "./pages/MainPage";
import { Typography } from "@mui/material";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/arts/:id" element={<ArtPage />} />
          <Route
            path="/*"
            element={<Typography variant="h1">Not Found</Typography>}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
