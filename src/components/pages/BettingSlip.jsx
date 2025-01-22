import React, { useState } from 'react';
import '../styles/BettingSlip.css';
import { useBettingSlip } from '../scripts/BettingSlipContext'; // Import from BettingSlipContext

export default function BettingSlip() {
  const { bets, removeBet, updateBetStake } = useBettingSlip(); // Use the imported hook

  const [isMinimized, setIsMinimized] = useState(false);

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

      {!isMinimized && (
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
  
      {bets.length > 0 && !isMinimized && (
        <div className="bg-honeydew p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-rich-black font-medium">Total Payout:</p>
            <p className="text-dartmouth-green font-semibold">{calculateTotalPayout()} kr</p>
          </div>
          <button className="w-full mt-4 bg-mint text-white py-2 rounded-lg hover:bg-ok transition duration-200">
            Place Bet
          </button>
        </div>
      )}
    </div>
  );
}
