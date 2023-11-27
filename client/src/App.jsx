import "./app.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Home from "./pages/home/Home";

const App = () => {
  // const user = false;
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home type="Series" />} />
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </Router>
  );
};

export default App;
