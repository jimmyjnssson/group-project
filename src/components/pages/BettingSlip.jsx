import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '../styles/BettingSlip.css';
import { useBettingSlip } from '../scripts/BettingSlipContext'; // Import from BettingSlipContext

export default function BettingSlip() {
  const { bets, removeBet, updateBetStake } = useBettingSlip(); // Use the imported hook
  const [isMinimized, setIsMinimized] = useState(false);
  const [betPlaced, setBetPlaced] = useState(false); // Track whether the bet is placed
  const [userCredits, setUserCredits] = useState(0); // Track the user's credits
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle the toggle of the betting slip
  const handleToggle = () => {
    setIsMinimized(prev => !prev);
  };

  // Handle changes in stake input
  const handleStakeChange = (event, betId) => {
    const newStake = parseFloat(event.target.value) || 0;
    updateBetStake(betId, newStake);
  };

  // Calculate total payout
  const calculateTotalPayout = () => {
    return bets
      .reduce((total, bet) => total + bet.stake * bet.odds, 0)
      .toFixed(2);
  };

  // Handle placing the bet
  const handlePlaceBet = () => {
    const user = JSON.parse(localStorage.getItem('fakeUser')); // Get the user object from localStorage

    if (!user) {
      navigate('/'); // Navigate to the home page if no user is found in localStorage
    } else {
      // Calculate the total stake
      const totalStake = bets.reduce((total, bet) => total + bet.stake, 0);

      // Check if the user has enough credits to place the bet
      if (user.credits >= totalStake) {
        // Subtract the total stake from the user's credits
        user.credits -= totalStake;
        localStorage.setItem('fakeUser', JSON.stringify(user)); // Update the user in localStorage

        // Clear all bets from the slip
        bets.forEach((bet) => removeBet(bet.betId));

        // Display the "Bet Placed" message
        setBetPlaced(true);

        // Update the state to reflect the user's updated credits
        setUserCredits(user.credits);
      } else {
        // Show an alert if the user doesn't have enough credits
        alert('Not enough credits to place the bet!');
      }
    }
  };

  // Handle resetting the betting slip after the bet is placed
  const handleResetBetSlip = () => {
    setBetPlaced(false);
    window.location.reload();
  };

  return (
    <div className={`betslip-container`}>
      <div className="flex items-center justify-between bg-rich-black text-mint-cream p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Betting Slip</h2>
        <button
          className="text-mint-cream bg-transparent hover:text-mindaro transition duration-200"
          onClick={handleToggle}
        >
          {isMinimized ? '▲' : '▼'}
        </button>
      </div>

      {!isMinimized && !betPlaced && (
        <div className="p-4 bg-white shadow-lg rounded-b-lg">
          {bets.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {bets.map((bet) => (
                <li key={bet.betId} className="flex items-center justify-between py-3">
                  <button
                    className="text-warning hover:text-warning transition duration-200"
                    onClick={() => removeBet(bet.betId)}
                  >
                    x
                  </button>
                  <div className="flex flex-col">
                    <span className="text-rich-black-2 font-medium">{bet.team}</span>
                    <p className="text-hookers-green text-sm">Odds: {bet.odds}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-gray-600 text-sm">Stake:</span>
                    <input
                      className="w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint"
                      type="number"
                      value={bet.stake || 0}
                      onChange={(event) => handleStakeChange(event, bet.betId)}
                      placeholder="Amount"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No bets added yet.</p>
          )}
        </div>
      )}
  
      {bets.length > 0 && !isMinimized && !betPlaced && (
        <div className="bg-honeydew p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-rich-black font-medium">Total Payout:</p>
            <p className="text-dartmouth-green font-semibold">{calculateTotalPayout()} kr</p>
          </div>
          <button
            className="w-full mt-4 bg-mint text-white py-2 rounded-lg hover:bg-ok transition duration-200"
            onClick={handlePlaceBet} // Attach the handler to the button
          >
            Place Bet
          </button>
        </div>
      )}

      {/* Display the Bet Placed message and the Ok button */}
      {betPlaced && (
        <div className="p-4 bg-white shadow-lg rounded-b-lg text-center">
          <p className="text-green-600 font-semibold text-xl">Bet Placed!</p>
          <p className="text-gray-500 mt-2">Your bet has been successfully placed.</p>
          <div className="mt-4">
            <button
              className="bg-ok text-white px-4 py-2 rounded-lg hover:bg-mint"
              onClick={handleResetBetSlip}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
