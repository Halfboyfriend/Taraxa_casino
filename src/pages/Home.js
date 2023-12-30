import React from "react";
import "../assets/css/styles.css";
import { Button, Container } from "semantic-ui-react";
import brand from "../assets/images/casino/logo/brandlogo.png";
import brand_btn from "../assets/images/casino/logo/buttonlogo.png";
import dice from "../assets/images/casino/game-options/dice.png";
import lotto from "../assets/images/casino/game-options/lotto.png";
import rocket from "../assets/images/casino/game-options/rocket.png";
import round from "../assets/images/casino/game-options/round.png";
import seven from "../assets/images/casino/game-options/seven.png";
import head from "../assets/images/coinflip.png";
import meta from "../assets/images/metamask.png"
import dic from "../assets/images/dic.png"
import pot from "../assets/images/pot.png"

function Home() {
  return (
    <React.Fragment>
      <Container>
        <div>
          <nav>
            <div className="brand">
              <img src={brand} alt="." />
            </div>

            <div className="connect__btn">
              <img src={brand_btn} alt="." />

              <Button className="button">connect</Button>
            </div>
          </nav>
        </div>

        <section className="py-5">
          <div className="landing__page">
            <div className="landing__content">
              <h1>TARAXA CASINO</h1>

              <p>
                Welcome to the #1 casino on Taraxa, Where you can play games
                like coin flip or roulette and win TARA and other amazing
                rewards.
              </p>
            </div>
          </div>
        </section>

        <section className="py-3">
          <div className="cassino__grid">
            <h2>TCASINO ORIGINALS</h2>

            <div className="grid__container">
              <div className="zone">
                {" "}
              
                  <img src={head} alt="." />
                <div className="mt-2 active">
                  {/* <Link> */}
                  <Button fluid className="active">
                    Play Now
                  </Button>
                  {/* </Link> */}
                </div>
              </div>

              <div className="zone">
                {" "}
                <img src={dice} alt="." />
                <div className="mt-2">
                  <Button fluid>Coming soon</Button>
                </div>
              </div>
              <div className="zone">
                {" "}
                <img src={rocket} alt="." />
                <div className="mt-2">
                  <Button fluid>Coming soon</Button>
                </div>
              </div>
              <div className="zone">
                {" "}
                <img src={round} alt="." />
                <div className="mt-2">
                  <Button fluid>Coming soon</Button>
                </div>
              </div>
              {/* <div className="zone"> <img src={lotto} alt="." /> </div> */}
              <div className="zone">
                {" "}
                <img src={seven} alt="." />
                <div className="mt-2">
                  <Button fluid>Coming soon</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="site__details">
            <div className="site__contents">
              <div>
                <h4>Total Wagered</h4>
                <h1>$200,000</h1>
              </div>
              <div>
                <h4>Total Bets</h4>
                <h1>40,000</h1>
              </div>
              <div>
                <h4>Total Users</h4>
                <h1>10,000</h1>
              </div>
            </div>
          </div>
        </section>

        <section className="py-3">
          <div>
            <h2>How to play</h2>

            <div className="guide">
              <div className="content">
                <h3>Connect Wallet</h3>
                <p>(make sure you select Taraxa network)</p>
                <img src={meta} alt="." className="img-fluid meta-image"/>
              </div>

              <div className="content">
                <h3>Select Game</h3>
                <img src={dic} alt="." />
              </div>

              <div className="content">
                <h3>Play & Win</h3>
                <img src={pot} alt="." />
              </div>
            </div>
          </div>
        </section>

        <section className="text-center pt-5 pb-2">
          <p>Copyright Taraxa Casino. All rights reserved</p>
        </section>
      </Container>
    </React.Fragment>
  );
}

export default Home;
