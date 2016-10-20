class Game {
  constructor () {
  
  }

  spin() {
    return { 
      reel1:parseInt(Math.random() * 6), 
      reel2:parseInt(Math.random() * 6), 
      reel3:parseInt(Math.random() * 6), 
      bonus:parseInt(Math.random() * 2)
    };
  }
};

export default Game;