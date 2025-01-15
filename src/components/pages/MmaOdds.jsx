import React, { useEffect, useState } from 'react';
import '../styles/MmaOdds.css';
import { fetchUpcomingFights } from '../scripts/MmaOddsApi';
import { useBettingSlip } from '../scripts/BettingSlipContext';

const MmaOdds = () => {
  const [fights, setFights] = useState([]);
  const [usageInfo, setUsageInfo] = useState({});
  const { addBet } = useBettingSlip();


  useEffect(() => {
    
    async function getFights() {
      try {
        const { data, headers } = await fetchUpcomingFights();

        // Extract usage info
        setUsageInfo({
          remaining: headers.get('x-requests-remaining') || 'N/A',
          used: headers.get('x-requests-used') || 'N/A',
          lastCost: headers.get('x-requests-last') || 'N/A',
        });

        setFights(data.slice(0, 20)); // Limit to 20 fights
      } catch (error) {
        console.error(error);
      }
    }

    getFights();
  }, []);

  return (
    <div>
      <h1>Upcoming MMA Fights (Next 10 Days)</h1>

      <div id="fights-container">
        {fights.length > 0 ? (
          fights.map((fight, index) => (
            <div key={index} className="fight-card">
              <div className="fighter-row">
                <div className="fighter">
                  <strong>{fight.home_team}</strong>
                  <button
                    className="odds-button"
                    onClick={() =>
                      addBet({
                        betId: fight.id + fight.home_team,
                        fightId: fight.id,
                        team: fight.home_team,
                        odds: fight.bookmakers[0]?.markets[0]?.outcomes[0]?.price,
                      })
                    }
                  >
                    {fight.bookmakers[0]?.markets[0]?.outcomes[0]?.price}
                  </button>
                </div>
                <div className="vs">vs</div>
                <div className="fighter">
                  <strong>{fight.away_team}</strong>
                  <button
                    className="odds-button"
                    onClick={() =>
                      addBet({
                        betId: fight.id + fight.away_team,
                        fightId: fight.id,
                        team: fight.away_team,
                        odds: fight.bookmakers[0]?.markets[0]?.outcomes[1]?.price,
                      })
                    }
                  >
                    {fight.bookmakers[0]?.markets[0]?.outcomes[1]?.price}
                  </button>
                </div>
              </div>
              <div className="date">
                <strong>Date:</strong> {new Date(fight.commence_time).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p>No fights found.</p>
        )}
      </div>
      <div className="credits">
        <p>
          <strong>API Usage:</strong>
        </p>
        <p>Remaining Credits: {usageInfo.remaining}</p>
        <p>Used Credits: {usageInfo.used}</p>
        <p>Last Request Cost: {usageInfo.lastCost}</p>
      </div>
    </div>
  );
};

export default MmaOdds;
