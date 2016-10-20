import express from 'express';
import cors from 'cors';
import SlotGame from './server/SlotGame';
import Game from './server/Game';

const app = express();

// use it before all route definitions
app.use(cors({origin: 'https://slotsjs.herokuapp.com'}));

//Game interface 
app.use('/', express.static(__dirname + '/public'));

app.get('/game/:_id', function(req, res) {
	var _slotGame = new SlotGame();
	res.setHeader('Content-Type', 'application/json');	
  	res.send(JSON.stringify(_slotGame.getGame(req.params._id)));
});

app.get('/spin', function(req, res) {
  var _game = new Game();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(_game.spin()));
});

export default app;
