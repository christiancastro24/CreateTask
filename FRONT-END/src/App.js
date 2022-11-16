import { Routes } from "./routes/routes";
import { GlobalStyle } from "./styles";
import { Toaster } from "react-hot-toast"
import { ResetUser } from "./components/ResetUser";

function App() {
  return (
    <>
    <ResetUser />
    <GlobalStyle />
    <Routes />
    <Toaster />
    </>
  );
}

export default App;
