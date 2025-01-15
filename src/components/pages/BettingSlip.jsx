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
    <div className={`betslip-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="betslip-header">
        <h2 className="betslip-title">Betting Slip</h2>
        <button className="toggle-betslip-btn" onClick={handleToggle}>X</button>
      </div>

  {/* BetSlip Section */}
      {!isMinimized && (
        <div className="betslip-content">
          {bets.length > 0 ? (
            <ul className="betslip-outcome-list">
              {bets.map(bet => (
                <li key={bet.betId} className="betslip-outcome">
                  <button className="close-btn" onClick={() => removeBet(bet.betId)}>
                    x
                  </button>
                  <div className="outcome-info">
                    <span className="outcome-label">{bet.team}</span>
                    <p className="odds-display">Odds: {bet.odds}</p>
                  </div>

                  {/* Stake Section */}
                  <div className="stake-container">
                    <span>Stake:</span>
                    <input
                      className="stake-input"
                      type="number"
                      value={bet.stake || 0}
                      onChange={event => handleStakeChange(event, bet.betId)}
                      placeholder="Amount"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bets added yet.</p>
          )}
        </div>
      )}

      {/* Summary Section */}
      {bets.length > 0 && !isMinimized && (
        <div className="betslip-summary">
          <p className="payout-label">Total Payout:</p>
          <p className="payout-value">{calculateTotalPayout()} kr</p>
          <button className="place-bet-btn">Place Bet</button>
        </div>
      )}
    </div>
  );
}
