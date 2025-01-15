import React, { createContext, useState, useContext } from 'react';

// Create a context for BettingSlip
const BettingSlipContext = createContext();

// Custom hook to use the BettingSlip context
export const useBettingSlip = () => {
  const context = useContext(BettingSlipContext);

  if (!context) {
    throw new Error("useBettingSlip must be used within a BettingSlipProvider");
  }

  return context;
};

// Provider component for BettingSlipContext
export const BettingSlipProvider = ({ children }) => {
  const [bets, setBets] = useState([]);

  // Add a new bet
  const addBet = (bet) => {
    setBets((prevBets) => [...prevBets, { ...bet, stake: 0 }]); // Initialize stake to 0
  };

  // Remove a bet by its ID
  const removeBet = (betId) => {
    setBets((prevBets) => prevBets.filter((bet) => bet.betId !== betId));
  };

  // Update the stake for a specific bet
  const updateBetStake = (betId, stake) => {
    setBets((prevBets) =>
      prevBets.map((bet) =>
        bet.betId === betId ? { ...bet, stake } : bet
      )
    );
  };

  return (
    <BettingSlipContext.Provider value={{ bets, addBet, removeBet, updateBetStake }}>
      {children}
    </BettingSlipContext.Provider>
  );
};
