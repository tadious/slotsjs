import express from 'express';
import SlotGame from './server/SlotGame';
import Game from './server/Game';

const app = express();

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
