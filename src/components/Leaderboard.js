import React from 'react'
import "../assets/css/leader.css";


function Leaderboard() {
  return (
    <>

        <h3>Leaderboard</h3>

        <div className='leader__select'>
            <span className='active'>Latest bets</span>
            <span>My bets</span>
            <span>High Multipliers</span>
        </div>

        <div className='leader__table mt-5'>
            <table>

            </table>
        </div>
      
    </>
  )
}

export default Leaderboard
