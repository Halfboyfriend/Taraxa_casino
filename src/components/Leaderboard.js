import React from "react";
import "../assets/css/leader.css";

function Leaderboard() {
  return (
    <>
      <h3>Leaderboard</h3>

      <div className="leader__select">
        <span className="active">Latest bets</span>
        <span>My bets</span>
        <span>High Multipliers</span>
      </div>

      <div className="leader__table mt-5">
        <table>
          <tr>
            <td>Tx time</td>
            <td>Game</td>
            <td>Player</td>
            <td>Wager</td>
            <td>Multiplier</td>
            <td>Playout</td>
          </tr>
          <tr>
            <td>10:23:04</td>
            <td>Coinflip</td>
            <td>0x3ef...892fg</td>
            <td>4000</td>
            <td>2x</td>
            <td>1000</td>
          </tr>
          <tr>
          <td>10:23:12</td>
            <td>Dice</td>
            <td>0x90f...jh78g</td>
            <td>7000</td>
            <td>5x</td>
            <td>9000</td>
          </tr>
          <tr>
            <td>09:23:04</td>
            <td>Coinflip</td>
            <td>0x3ef...892fg</td>
            <td>4000</td>
            <td>2x</td>
            <td>1000</td>
          </tr>
          <tr>
          <td>08:23:12</td>
            <td>Dice</td>
            <td>0x90f...jh78g</td>
            <td>7000</td>
            <td>5x</td>
            <td>9000</td>
          </tr>



          <tr>
            <td>07:23:04</td>
            <td>Coinflip</td>
            <td>0x3ef...892fg</td>
            <td>4000</td>
            <td>2x</td>
            <td>1000</td>
          </tr>

          <tr>
          <td>06:23:12</td>
            <td>Dice</td>
            <td>0x90f...jh78g</td>
            <td>7000</td>
            <td>5x</td>
            <td>9000</td>
          </tr>

          <tr>
            <td>05:23:04</td>
            <td>Coinflip</td>
            <td>0x3ef...892fg</td>
            <td>4000</td>
            <td>2x</td>
            <td>1000</td>
          </tr>
          <tr>
          <td>04:23:12</td>
            <td>Dice</td>
            <td>0x90f...jh78g</td>
            <td>7000</td>
            <td>5x</td>
            <td>9000</td>
          </tr>
        </table>
      </div>


      <p className="text-center mt-3" style={{border: "1px solid #fff", width: "100px", margin: "auto", padding: "5px"}}>
      <a href="/" style={{color: "#fff", fontSize: "14px", fontWeight: "bolder"}}>More</a>
      </p>
    </>
  );
}

export default Leaderboard;
