import { Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/pages/Footer';
import Header from './components/pages/Header';
import Home from './components/pages/Home';
import MmaOdds from './components/pages/MmaOdds';
import BettingSlip from './components/pages/BettingSlip';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { BettingSlipProvider } from './components/scripts/BettingSlipContext'; // Import the provider


function App() {
  
  return (
    <div className="App">
      <Header />
      <BettingSlipProvider> {/* Wrap the whole app inside the provider */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mma" element={<MmaOdds />} />
        </Routes>
        <BettingSlip /> {/* BettingSlip is also inside the provider */}
      </BettingSlipProvider>
      <Footer />
    </div>
  );
}

export default App;
