import React, { Component } from "react";
import './App.css';
import PictureCard from "./components/PictureCard";
import Wrapper from "./components/Wrapper";
import cards from "./cards.json";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: "",
    shakeit: "false"
  };
  clickPicture = id => {
    // Arrange the pictures in a random manner
    const shuffledArray = this.shuffleArray(cards);
    this.setState({ cards: shuffledArray });
    // if clicked an image already clicked set this.state.score = 0; empty clickeadArray, end of if block
    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Incorrect! Game Over ☹️ Click an image to start again!", shakeit: "true" });
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "Correct!",
        shakeit: "false"
      });
    }
    // set topscore = score if score>topscore.
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
    // shake the wrapper if shakeit is set to true
  }
  shuffleArray = (picturesArray) => {
    for (let i = picturesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [picturesArray[i], picturesArray[j]] = [picturesArray[j], picturesArray[i]];
    }
    return picturesArray;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="score"><strong>Score: {this.state.score} | Top Score: {this.state.topScore}</strong></h1>
        </header>
        <h1 className= "App-title">
        <strong>Corgi Clicky Game!</strong>
        </h1>
        <h3 className="App-intro">
          <strong>Click on an image to earn points, but don't click on any more than once!</strong>
        </h3>
        <p className="message"><strong>{this.state.message}</strong></p>
        <Wrapper
          shakeWrapper={this.state.shakeit}
          pictures=
          {this.state.cards.map(picture => (
            <PictureCard
              clickPicture={this.clickPicture}
              id={picture.id}
              key={picture.id}
              name={picture.name}
              image={picture.image}
            />
          ))}
        />
        <footer className="footer">
            <span className="text-muted">React App - Corgi Clicky Game.</span>
        </footer>
      </div>
    );
  }
}
export default App;