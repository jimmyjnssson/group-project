# BettingSlip Component

The `BettingSlip` component is a React component that allows users to manage their betting slips. It provides functionality to add, remove, and update bets, as well as place bets if the user has sufficient credits.

## Features

- **Toggle Betting Slip**: Minimize or expand the betting slip.
- **Add/Remove Bets**: Add bets to the slip and remove them as needed.
- **Update Stake**: Adjust the stake amount for each bet.
- **Calculate Total Payout**: Automatically calculate the total payout based on the bets and their odds.
- **Place Bet**: Place the bet if the user has enough credits, and update the user's credits accordingly.
- **Reset Betting Slip**: Reset the betting slip after placing a bet.

## Usage

### Importing the Component

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BettingSlip.css';
import { useBettingSlip } from '../scripts/BettingSlipContext';
