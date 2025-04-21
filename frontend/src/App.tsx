import Battle from "./components/Battle";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SharedBattle from "./components/SharedBattle";
import ViewAllBattles from "./components/ViewAllBattles";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/battle/:battleId" element={<SharedBattle />} />
          <Route path="/all-battles" element={<ViewAllBattles />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
