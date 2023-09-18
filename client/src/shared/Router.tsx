import { BrowserRouter, Route, Routes } from "react-router-dom";
import Workspace from "../pages/Workspace";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Main from "../pages/Main";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/main" element={<Main />} />
        <Route
          path="/workspaces/:workspaceId/boards/:boardId"
          element={<Workspace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
