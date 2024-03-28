import React, { useEffect, useState } from "react";
import "../assets/css/coinflip.css";
import "../assets/css/styles.css";
import { Button } from "semantic-ui-react";
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
import tail_pick from "../assets/images/casino/coinflip/tails/pick2.png";
import dicie from "../assets/images/casino/game-options/dice.png";
import rocket from "../assets/images/casino/game-options/rocket.png";
import round from "../assets/images/casino/game-options/round.png";
import seven from "../assets/images/casino/game-options/seven.png";
import bolly from "../assets/images/casino/game-options/lotto.png";
import Leaderboard from "../components/Leaderboard";
import { formatAddress } from "../utils/formatter";
import { connect } from "../utils/connectWallet";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

function Coinflip() {
  const [coinhead, setHead] = useState(false);
  const [cointail, setTail] = useState(false);
  const [value, setValue] = useState(0);
  const [choice, setChoice] = useState(null);
  const [user, setUser] = useState(null);
  const [winnings, setWinnings] = useState(0);
  const [loadBet, setLoadingBet] = useState(false);
  const [loadWithdrawal, setloadWithdrawal] = useState(false);

  useEffect(() => {
    if (!user) {
      handleWallet();
    }
  }, []);

  const erc20TokenAddress = "0x9bFF260c55e1E185e775f54FEAbeE884E9dAd9d8";

  const requestApproval = async (amount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const Spender = "0x3fEa0eD1FA9448D315053ee8CFcE32a09C708047";

    const erc20Token = new ethers.Contract(
      erc20TokenAddress,
      ["function approve(address spender, uint256 amount) returns (bool)"],
      signer
    );
    try {
      const amountInWei = ethers.utils.parseUnits(amount.toString(), "ether");
      const approvalTx = await erc20Token.approve(Spender, amountInWei, {
        gasPrice: ethers.utils.parseUnits("100", "gwei"),
      });
      await approvalTx.wait();
      console.log("Spending approval successful!");
      toast.success("Spending approval successful!");
      return true;
    } catch (error) {
      console.error("Error requesting spending approval:", error);
      toast.error("Error requesting spending approval");
    }
  };

  async function WinOrLose(wager, choice) {
    const { address, signer, provider, instance } = await connect();
    try {
      const response = await instance.connect(signer).playerWinnings(address);
      const etherAmount = ethers.utils.formatUnits(
        response.toString(),
        "ether"
      );
      if (etherAmount > winnings) {
        handleWallet();
        Swal.fire({
          icon: "success",
          title: `Congratulations... You won ${wager * 2}TCS`,
          showConfirmButton: false,
          timer: 15000,
        });
      } else {
        handleWallet();
        Swal.fire({
          icon: "error",
          title: `Ops, you chose the wrong side. Try again`,
          showConfirmButton: false,
          timer: 15000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleWallet() {
    // toast.warning("Please confirm action in your wallet");
    const { address, signer, provider, instance } = await connect();
    setUser(address);
    try {
      const response = await instance.connect(signer).playerWinnings(address);
      const etherAmount = ethers.utils.formatUnits(
        response.toString(),
        "ether"
      );
      setWinnings(etherAmount);
    } catch (err) {
      console.log(err);
      // toast.error("Error: User rejected");
    }
  }

  async function withdrawWinnings() {
    setloadWithdrawal(true);
    if (winnings > 0) {
      toast.warning("Please approve transaction in your wallet");

      try {
        const { signer, instance } = await connect();
        const response = await instance.connect(signer).withdrawUserWinnings();
        console.log(response);
        setloadWithdrawal(false);
        toast.success("Request to withdraw player winings was successfull");
        setTimeout(function () {
          handleWallet();
        }, 5000);
      } catch (err) {
        console.log(err);
        setloadWithdrawal(false);
        toast.error("Ops, an error occured...please try again");
      }
    } else {
      toast.error("Your winings balance is 0");
    }

    setloadWithdrawal(false);
  }

  async function handleSubmition(e) {
    setLoadingBet(true);
    e.preventDefault();
    let choiceWord = "";
    if (choice === 1) {
      choiceWord = "Head";
    } else if (choice === 0) {
      choiceWord = "Tail";
    } else {
      toast.warning("You must pick either Head or Tail");
    }
    if (value < 100) {
      toast.warning("Minimum value is 100TCS");
      setLoadingBet(false);
    } else if (choice != null) {
      try {
        const { signer, instance } = await connect();
        toast.info("Approve spending cap in your wallet");
        const ret = await requestApproval(value);

        if (ret) {
          Swal.fire({
            title: "<strong>Approve bet transaction in your wallet </strong>",
            html: `<p> 
          Total bet: <b>${value}TCS</b></p>
          <p>
          To Wining: ${value * 2}TCS
          </p>
          <p>Player Choice: ${choiceWord} </p>
        `,
            width: 400,
            padding: "1em",
            showConfirmButton: false,
            color: "#fff",
            imageUrl:
              "https://play-lh.googleusercontent.com/OPlZ1l5oIjJJ9J_i5t8DcvyKcyib54MngCErNh6snS0gvog5oiKI9mpMru_Q7fzhyVI",
            imageWidth: 200,
            imageHeight: 150,
            imageAlt: "CoinFlip",
            background: "linear-gradient(180deg, #000 60%, #00873F)",
            backdrop: `rgba(0,0,0,0.8)`,
          });
          const WeiValue = ethers.utils.parseUnits(value.toString(), "ether");
          console.log(WeiValue, choice);
          const gasLimit = 500000;
          const response = await instance
            .connect(signer)
            .flip(choice, WeiValue, { gasLimit });
          console.log(response);
          toast.success(
            "Congratulations, your bet was succefully placed... Happy earnings!"
          );
          setLoadingBet(false);
          setTimeout(async function () {
            await WinOrLose(value, choice);
          }, 5000);
        } else {
          console.log("Rejected spending cap");
          setLoadingBet(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Ops, an error occured... User rejected transaction");
        setLoadingBet(false);
      }
    } else {
      toast.warning("You must pick either Head or Tail");
      setLoadingBet(false);
    }
    setLoadingBet(false);
  }

  function setHeadFunction() {
    setHead(true);
    setTail(false);
    setChoice(1);
    const imgElement = document.querySelector('.head__opt');
    const imgElementT = document.querySelector('.tail__opt');
    if (imgElement) {
      imgElementT.classList.remove('img__liningT');
      imgElement.classList.add('img__lining');
    }
  }

  function setTailFunction() {
    setHead(false);
    setTail(true);
    setChoice(0);
    const imgElement = document.querySelector('.head__opt');
    const imgElementT = document.querySelector('.tail__opt');
    if (imgElementT) {
      imgElement.classList.remove('img__lining');
      imgElementT.classList.add('img__liningT');
    }
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
          <ToastContainer />
          <p>How to play ?</p>
          <div className="wallet__connect">
            <img src={brand_btn} alt="." />

            {user ? (
              <Button className="button"> {formatAddress(user)} </Button>
            ) : (
              <Button className="button" onClick={handleWallet}>
                connect
              </Button>
            )}
          </div>

          <section className="py-5">
            <div className="play__background">
              <div className="play__content">
                <div className="coin__image">
                  {cointail ? (
                    <img src={tail} className="tail" alt="." />
                  ) : (
                    <img className="head" src={head} alt="." />
                  )}

                  <h4>PICK A SIDE</h4>

                  <div className="coin__options">
                    <img
                      src={head_pick}
                      className="head__opt"
                      alt="."
                      onClick={setHeadFunction}
                    />
                    <img
                      src={tail_pick}
                      className="tail__opt"
                      alt="."
                      onClick={setTailFunction}
                    />
                  </div>
                </div>

                <div className="form__tab">
                  <form onSubmit={handleSubmition}>
                    <label>
                      Amount:{" "}
                      <input
                        type="number"
                        value={value}
                        placeholder="0"
                        onChange={(e) => setValue(e.target.value)}
                        required
                      />
                    </label>

                    <div className="select__section mt-2">
                      <div className="select__display">
                        <span onClick={setHundred}>100TCS</span>
                        <span onClick={setFiveHundred}>500TCS</span>
                        <span onClick={setThousand}>1500TCS</span>
                        <span onClick={setThreeThousand}>3000TCS</span>
                        <span onClick={setFiveThousand}>5000TCS</span>
                        <span onClick={setTenThousand}>10000TCS</span>
                      </div>
                      <div className="mt-3">
                        <Button
                          fluid
                          primary
                          className="form__btn"
                          loading={loadBet}
                        >
                          DOUBLE OR NOTHING
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="mt-5">
                <h4>Player Earnings: {winnings} </h4>
                <Button
                  primary
                  onClick={withdrawWinnings}
                  loading={loadWithdrawal}
                >
                  Withdraw
                </Button>
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
