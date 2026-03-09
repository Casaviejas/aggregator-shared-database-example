import { Toaster } from "react-hot-toast";
import { Router } from "./routes/router";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router />
    </>
  );
}

export default App;
