import React, { useState } from "react";
import "../assets/css/coinflip.css";
import "../assets/css/styles.css";
import { Container, Button, Form, Input, Label } from "semantic-ui-react";
import brand from "../assets/images/casino/logo/brandlogo.png";
import brand_btn from "../assets/images/casino/logo/buttonlogo.png";
import coin from "../assets/images/casino/games-nav-icon/coinflip.png";
import crash from "../assets/images/casino/games-nav-icon/crash.png";
import dice from "../assets/images/casino/games-nav-icon/dice.png";
import lotto from "../assets/images/casino/games-nav-icon/lotto.png";
import raffle from "../assets/images/casino/games-nav-icon/raffle.png";
import rout from "../assets/images/casino/games-nav-icon/rout.png";
import slot from "../assets/images/casino/games-nav-icon/slot.png";
import doc from "../assets/images/casino/protocol/doc.png";
import git from "../assets/images/casino/protocol/git.png";
import tg from "../assets/images/casino/protocol/tg.png";
import token from "../assets/images/casino/protocol/token.png";
import x from "../assets/images/casino/protocol/x.png";
import head from "../assets/images/casino/coinflip/heads/head.png";
import head_pick from "../assets/images/casino/coinflip/heads/pick.png";
import tail from "../assets/images/casino/coinflip/tails/tail.png";
import tail_pick from "../assets/images/casino/coinflip/tails/pick.png";
import dicie from "../assets/images/casino/game-options/dice.png";
import rocket from "../assets/images/casino/game-options/rocket.png";
import round from "../assets/images/casino/game-options/round.png";
import seven from "../assets/images/casino/game-options/seven.png";
import bolly from "../assets/images/casino/game-options/lotto.png";
import Leaderboard from "../components/Leaderboard";
import { formatAddress } from "../utils/formatter";
import { connect } from "../utils/connectWallet";

function Coinflip() {
  const [coinhead, setHead] = useState(false);
  const [cointail, setTail] = useState(false);
  const [value, setValue] = useState(0);
  const [choice, setChoice] = useState(null);
  const [user, setUser] = useState(null);

  async function handleWallet() {
    const {address, signer, provider} = await connect();
    setUser(address);
  }

  async function handleSubmition(e) {
    e.preventDefault();
    let choiceWord = "";
    if (choice === 1) {
      choiceWord = "Head";
    } else {
      choiceWord = "Tail";
    }
    if (value < 100) {
      alert("Minimum value is 100TARA");
    } else {
      if(user){
        alert(`Your value is ${value} and you picked ${choiceWord}`);

      }else{
      alert("Please connect your wallet");

      }

    }
  }

  function setHeadFunction() {
    setTail(false);
    setHead(true);
    setChoice(1);
  }

  function setTailFunction() {
    setHead(false);
    setTail(true);
    setChoice(0);
  }

  function setHundred() {
    setValue(100);
  }
  function setFiveHundred() {
    setValue(500);
  }
  function setThousand() {
    setValue(1500);
  }
  function setThreeThousand() {
    setValue(3000);
  }
  function setFiveThousand() {
    setValue(5000);
  }
  function setTenThousand() {
    setValue(10000);
  }

  return (
    <>
      <div className="container">
        <div>
          <header>
            <nav className="navbar">
              <div>
                <div className="brand__img">
                  <img src={brand} alt="." />
                </div>

                <ul className="niv">
                  <div className="list__design">
                    <h3>GAMES</h3>
                    <li>
                      {" "}
                      <a href="/dashboard" className="active">
                        {" "}
                        <img src={coin} alt="." /> Coinflip
                      </a>{" "}
                    </li>
                    <li>
                      <a href="/dashboard">
                        <img src={dice} alt="." />
                        Dice
                      </a>
                    </li>
                    <li>
                      <a href="/dashboard">
                        <img src={crash} alt="." />
                        Crash
                      </a>
                    </li>
                    <li>
                      <a href="/dashboard">
                        <img src={rout} alt="." />
                        Roullette
                      </a>
                    </li>
                    <li>
                      <a href="/dashboard">
                        <img src={slot} alt="." />
                        Slot
                      </a>
                    </li>
                    <li>
                      <a href="/dashboard">
                        <img src={lotto} alt="." />
                        Lotto
                      </a>
                    </li>
                    <li>
                      <a href="/dashboard">
                        <img src={raffle} alt="." />
                        Raffle Draw
                      </a>
                    </li>
                  </div>

                  <div className="list__design">
                    <h3>PROTOCOL</h3>
                    <li>
                      <a href="/dashboard">
                        <img src={doc} alt="." />
                        Docs
                      </a>
                    </li>

                    <li>
                      <a href="/dashboard">
                        <img src={token} alt="." />
                        $TCASINO token
                      </a>
                    </li>
                    <li>
                      <a href="/dashboard">
                        <img src={x} alt="." />
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href="/dashboard">
                        <img src={git} alt="." />
                        Gitbook
                      </a>
                    </li>
                    <li>
                      <a href="/dashboard">
                        <img src={tg} alt="." />
                        Telegram
                      </a>
                    </li>
                  </div>
                </ul>
              </div>
            </nav>
          </header>
        </div>

        <main className="">
          <p>How to play?</p>
          <div className="wallet__connect">
            <img src={brand_btn} alt="." />

            {user ?
            <Button className="button"> {formatAddress(user)} </Button>
            :
            <Button className="button" onClick={handleWallet}>connect</Button>
          }
          </div>

          <section className="py-5">
            <div className="play__background">
              <div className="play__content">
                <div className="coin__image">
                  {coinhead ? (
                    <img src={head} alt="." />
                  ) : (
                    <img src={tail} alt="." />
                  )}

                  <h4>PICK A SIDE</h4>

                  <div className="coin__options">
                    <img src={head_pick} alt="." onClick={setHeadFunction} />
                    <img src={tail_pick} alt="." onClick={setTailFunction} />
                  </div>
                </div>

                <div className="form__tab">
                  <form onSubmit={handleSubmition}>
                    <label>
                      Amount:{" "}
                      <input
                        type="number"
                        value={value}
                        placeholder="Input value"
                        onChange={(e) => setValue(e.target.value)}
                        required
                      />
                    </label>

                    <div className="select__section">
                      <div className="select__display">
                        <span onClick={setHundred}>100TARA</span>
                        <span onClick={setFiveHundred}>500TARA</span>
                        <span onClick={setThousand}>1500TARA</span>
                        <span onClick={setThreeThousand}>3000TARA</span>
                        <span onClick={setFiveThousand}>5000TARA</span>
                        <span onClick={setTenThousand}>10000TARA</span>
                      </div>
                      <div className="mt-3">
                        <Button fluid primary className="form__btn">
                          DOUBLE OR NOTHING
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <p className="text-center mt-5">3% fees apply for every flip.</p>
            </div>
          </section>

          <section className="py-5">
            <Leaderboard />
          </section>

          <section className="py-3">
            <div className="casino__games">
              <h3>More Original games</h3>

              <div className="more__display">
                <div className="pg">
                  {" "}
                  <img src={bolly} alt="." />
                  <div className="mt-2 active"></div>
                </div>

                <div className="pg">
                  {" "}
                  <img src={dicie} alt="." />
                </div>
                <div className="pg">
                  {" "}
                  <img src={rocket} alt="." />
                </div>
                <div className="pg">
                  {" "}
                  <img src={round} alt="." />
                </div>
                {/* <div className="zone"> <img src={lotto} alt="." /> </div> */}
                <div className="pg">
                  {" "}
                  <img src={seven} alt="." />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Coinflip;
