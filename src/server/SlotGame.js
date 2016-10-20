class SlotGame {
  constructor () {
  	this._games = [
  		{id:1,name:"Fruit Loops",symbols:[{id: 'symbol_0'},{id: 'symbol_1'},{id: 'symbol_2'},{id: 'symbol_3'},{id: 'symbol_4'},{id: 'symbol_5'}]},
  		{id:2,name:"Fruit Loops (NEW)",symbols:[{id: 'symbol_0'},{id: 'symbol_1'},{id: 'symbol_2'},{id: 'symbol_3'},{id: 'symbol_4'},{id: 'symbol_5'}]},
  		{id:3,name:"Fruit Loops (EDIT)",symbols:[{id: 'symbol_0'},{id: 'symbol_1'},{id: 'symbol_2'},{id: 'symbol_3'},{id: 'symbol_4'},{id: 'symbol_5'}]},
  		{id:4,name:"Fruit Loops (LIVE)",symbols:[{id: 'symbol_0'},{id: 'symbol_1'},{id: 'symbol_2'},{id: 'symbol_3'},{id: 'symbol_4'},{id: 'symbol_5'}]}
  	];
  }

  getGame(id) {
    return {id:2,name:"Fruit Loops",symbols:[{id: 'symbol_0'},{id: 'symbol_1'},{id: 'symbol_2'},{id: 'symbol_3'},{id: 'symbol_4'},{id: 'symbol_5'}]};
  }
};

export default SlotGame;