import { Routes } from "./routes/routes";
import { GlobalStyle } from "./styles";
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
    <GlobalStyle />
    <Routes />
    <Toaster />
    </>
  );
}

export default App;
