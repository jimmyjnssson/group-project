import React, { useEffect, useState } from 'react';
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
    <div className="bg-mint-cream py-8 sm:py-16">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      
      <h1 className="text-2xl font-bold text-rich-black mb-6">Upcoming MMA Fights (Next 10 Days)</h1>

      <div id="fights-container">
        {fights.length > 0 ? (
          fights.map((fight, index) => (
            <div
              key={index}
              className="fight-card border border-mint-cream bg-honeydew rounded-lg p-4 mb-4 shadow-md "
            >
               <div className="fighter-row flex justify-around items-center text-center">
                  <div className="fighter flex flex-col items-center justify-center w-40">
                    <strong className="text-dartmouth-green">{fight.home_team}</strong>
                    <button
                      className="odds-button mt-2 py-1 px-3 border border-mint rounded-md bg-white text-rich-black hover:bg-mindaro hover:text-rich-black-2 transition"
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
                  <div className="vs text-rich-black-2 font-bold mx-6 flex-shrink-0">vs</div>
                  <div className="fighter flex flex-col items-center justify-center w-40">
                    <strong className="text-dartmouth-green">{fight.away_team}</strong>
                    <button
                      className="odds-button mt-2 py-1 px-3 border border-mint rounded-md bg-white text-rich-black hover:bg-mindaro hover:text-rich-black-2 transition"
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
              <div className="date mt-4 text-sm text-hookers-green">
                <strong>Date:</strong> {new Date(fight.commence_time).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No fights found.</p>
        )}
      </div>
      <div className="credits p-4 border border-warning bg-warning-100 text-rich-black rounded-lg">
        <p className="font-bold">API Usage:</p>
        <p>Remaining Credits: {usageInfo.remaining}</p>
        <p>Used Credits: {usageInfo.used}</p>
        <p>Last Request Cost: {usageInfo.lastCost}</p>
      </div>
    </div>
    </div>
  );
  
};

export default MmaOdds;



