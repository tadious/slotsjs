
var IMAGE_HEIGHT = 64;
var IMAGE_TOP_MARGIN = 5;
var IMAGE_BOTTOM_MARGIN = 5;
var SLOT_SEPARATOR_HEIGHT = 2
var SLOT_HEIGHT = IMAGE_HEIGHT + IMAGE_TOP_MARGIN + IMAGE_BOTTOM_MARGIN + SLOT_SEPARATOR_HEIGHT; // how many pixels one slot image takes
var RUNTIME = 1000; // how long all slots spin before starting countdown
var SPINTIME = 500; // how long each slot spins at minimum
var ITEM_COUNT = 6 // item count in slots
var SLOT_SPEED = 15; // how many pixels per second slots roll
var DRAW_OFFSET = 45 // how much draw offset in slot display from top

var BLURB_TBL = [
    'No win!',
    'Small win!',
    'Big win!',
    'BONUS!'
];

function shuffleArray( array ) {

    for (i = array.length - 1; i > 0; i--) {
	var j = parseInt(Math.random() * i)
	var tmp = array[i];
	array[i] = array[j]
	array[j] = tmp;
    }
}

// Images must be preloaded before they are used to draw into canvas
function _preloadImages( images, callback ) {

    function _preload( asset ) {
		asset.img = new Image();
		asset.img.src = 'img/' + asset.id+'.png';
	
		asset.img.addEventListener("load", function() {
	    	_check();
		}, false);

		asset.img.addEventListener("error", function(err) {
	    	_check(err, asset.id);
		}, false);
    }

    var loadc = 0;
    function _check( err, id ) {
		if ( err ) {
	    	alert('Failed to load ' + id );
		}
		loadc++;
		if ( images.length == loadc ) 
	    	return callback()
    }

    images.forEach(function(asset) {
		_preload( asset );
    });
}

function copyArray( array ) {
    var copy = [];
    for( var i = 0 ; i < array.length; i++) {
	copy.push( array[i] );
    }
    return copy;
}

function _fill_canvas( canvas, items ) {
	ctx = canvas.getContext('2d');
	ctx.fillStyle = '#ddd';

	for (var i = 0 ; i < ITEM_COUNT ; i++) {
		var asset = items[i];
		ctx.save();
		ctx.shadowColor = "rgba(0,0,0,0.5)";
		ctx.shadowOffsetX = 5;
		ctx.shadowOffsetY = 5;
		ctx.shadowBlur = 5;
		ctx.drawImage(asset.img, 3, i * SLOT_HEIGHT + IMAGE_TOP_MARGIN, 64, 64);
		ctx.drawImage(asset.img, 3, (i + ITEM_COUNT) * SLOT_HEIGHT + IMAGE_TOP_MARGIN, 64, 64);
		ctx.restore();
		ctx.fillRect(0, i * SLOT_HEIGHT, 70, SLOT_SEPARATOR_HEIGHT);
		ctx.fillRect(0, (i + ITEM_COUNT)  * SLOT_HEIGHT, 70, SLOT_SEPARATOR_HEIGHT);
    }
}

class SlotGame {
    constructor (_gameData) {
    	var game = new Game(_gameData.name);

	    $('canvas').attr('height', IMAGE_HEIGHT * ITEM_COUNT * 2);
	    $('canvas').css('height', IMAGE_HEIGHT * ITEM_COUNT * 2);

	    game.items = _gameData.symbols;

	    // load assets and predraw the reel canvases
	    _preloadImages(_gameData.symbols, function() {

			// Draw the canvases with shuffled arrays
			game.items1 = copyArray(_gameData.symbols);
			shuffleArray(game.items1);
			_fill_canvas( game.c1[0], game.items1 );
			game.items2 = copyArray(_gameData.symbols);
			shuffleArray(game.items2);
			_fill_canvas( game.c2[0], game.items2 );
			game.items3 = copyArray(_gameData.symbols);
			shuffleArray(game.items3);
			_fill_canvas( game.c3[0], game.items3 );
			game.resetOffset =  (ITEM_COUNT + 3) * SLOT_HEIGHT;
			game.loop();
	    });

	    $('h1').text(_gameData.name);

	    $('#play').click(function(e) {
			// start game on play button click
			$('h1').text('Rolling!');
			game.restart();
	    });

	    // Show reels for debugging
	    var toggleReels = 1;
	    $('#debug').click(function() {
			toggleReels = 1 - toggleReels;
			if ( toggleReels ) {
		    	$('#reels').css('overflow', 'hidden' );
			} else {
		    	$('#reels').css('overflow', 'visible' );
			}
	    });
    }

    destructor () {
        //Destroy everything
    }
}

class Game {
	constructor(_gameName) {
		this.name = _gameName;

		// reel canvases
	    this.c1 = $('#canvas1');
	    this.c2 = $('#canvas2');
	    this.c3 = $('#canvas3');

	    // set random canvas offsets
	    this.offset1 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
	    this.offset2 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
	    this.offset3 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
	    this.speed1 = this.speed2 = this.speed3 = 0;
	    this.lastUpdate = new Date();

	    // Needed for CSS translates
	    this.vendor = 
		(/webkit/i).test(navigator.appVersion) ? '-webkit' :
	    	(/firefox/i).test(navigator.userAgent) ? '-moz' :
		(/msie/i).test(navigator.userAgent) ? 'ms' :
	    	'opera' in window ? '-o' : '';
	    
	    this.cssTransform = this.vendor + '-transform';
	    this.has3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())  
	    this.trnOpen       = 'translate' + (this.has3d ? '3d(' : '(');
	    this.trnClose      = this.has3d ? ',0)' : ')';
	    this.scaleOpen     = 'scale' + (this.has3d ? '3d(' : '(');
	    this.scaleClose    = this.has3d ? ',0)' : ')';

	    // draw the slots to initial locations
	    this.draw( true );
	}

	restart() {
    	this.lastUpdate = new Date();
	    this.speed1 = this.speed2 = this.speed3 = SLOT_SPEED

	    // function locates id from items
	    function _find( items, id ) {
			for ( var i=0; i < items.length; i++ ) {
			    if ( items[i].id == id ) return i;
			}
	    }

	    //Get results from the server
	    var thisGame = this;
	    $.ajax({
	        url: 'http://127.0.0.1:4000/spin',
	        dataType: 'json',
	        success: function(data) { 

			    thisGame.result1 = data.reel1;
			    thisGame.result2 = data.reel2;
			    thisGame.result3 = data.reel3;
			    thisGame.bonus = data.bonus;

			    // Clear stop locations
			    thisGame.stopped1 = false;
			    thisGame.stopped2 = false;
			    thisGame.stopped3 = false;

			    // randomize reel locations
			    thisGame.offset1 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;
			    thisGame.offset2 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;
			    thisGame.offset3 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;

			    $('#results').hide();

			    thisGame.state = 1;
	        },
	        error: function() {
	            console.log("Error getting spin results");
	        }
	    });
    }

    loop() {
    	var that = this;
	    that.running = true;
	    (function gameLoop() {
		that.update();
		that.draw();
		if (that.running) {
		    requestAnimFrame( gameLoop );
		}
	    })();
    }

    update() {
    	var now = new Date();
	    var that = this;

	    // Check slot status and if spun long enough stop it on result
	    function _check_slot( offset, result ) {
		if ( now - that.lastUpdate > SPINTIME ) {
		    var c = parseInt(Math.abs( offset / SLOT_HEIGHT)) % ITEM_COUNT;
		    if ( c == result ) {
			if ( result == 0 ) {
			    if ( Math.abs(offset + (ITEM_COUNT * SLOT_HEIGHT)) < (SLOT_SPEED * 1.5)) {
				return true; // done
			    }
			} else if ( Math.abs(offset + (result * SLOT_HEIGHT)) < (SLOT_SPEED * 1.5)) {
			    return true; // done
			}
		    }
		}
		return false;
	    }

	    switch (this.state) {
	    case 1: // all slots spinning
		if (now - this.lastUpdate > RUNTIME) {
		    this.state = 2;
		    this.lastUpdate = now;
		}
		break;
	    case 2: // slot 1
		this.stopped1 = _check_slot( this.offset1, this.result1 );
		if ( this.stopped1 ) {
		    this.speed1 = 0;
		    this.state++;
		    this.lastUpdate = now;
		}
		break;
	    case 3: // slot 1 stopped, slot 2
		this.stopped2 = _check_slot( this.offset2, this.result2 );
		if ( this.stopped2 ) {
		    this.speed2 = 0;
		    this.state++;
		    this.lastUpdate = now;
		}
		break;
	    case 4: // slot 2 stopped, slot 3
		this.stopped3 = _check_slot( this.offset3, this.result3 );
		if ( this.stopped3 ) {
		    this.speed3 = 0;
		    this.state++;
		}
		break;
	    case 5: // slots stopped 

		if ( now - this.lastUpdate > 300 ) { 
	    	$('h1').text(that.name);
		    this.state = 6;
		}
		break;
	    case 6: // check results
		var ec = 0;

		//counts duplicates
		var counts = {};
		var results = [that.result1, that.result2, that.result3];
		results.forEach(function(x) { 
			counts[x] = (counts[x] || 0)+1; 
		});

		console.log(counts, that.bonus);

		var _outputText = "";
		if (Object.keys(counts).length === 3) {
		    if (that.bonus){
		    	_outputText = "BONUS!!!";
		    	$('#results').show();
		    }
		}
		if (Object.keys(counts).length === 2) {
		    _outputText = (that.bonus)? "Small win + BONUS!!!": "Small win";
		    $('#results').show();
		}
		if (Object.keys(counts).length === 1) {
		    _outputText = (that.bonus)? "Big win + BONUS!!!": "Big win!!!";
		    $('#results').show();
		}

		$('#status').text(_outputText);

		this.displayBonus(that.bonus);


		this.state = 7;
		break;
	    case 7: // game ends
		break;
	    default:
	    }
	    this.lastupdate = now;
    }

    getWinningSymbol() {

    }

    displayBonus(bonus) {
    	if (bonus) {
    		setTimeout(function(){ $("#play").click(); }, 450);
    	}
    }

    draw(force) {
    	if (this.state >= 6 ) return;

	    // draw the spinning slots based on current state
	    for (var i=1; i <= 3; i++ ) {
			var resultp = 'result'+i;
			var stopped = 'stopped'+i;
			var speedp = 'speed'+i;
			var offsetp = 'offset'+i;
			var cp = 'c'+i;
			if (this[stopped] || this[speedp] || force) {
		    	if (this[stopped]) {
					this[speedp] = 0;
					var c = this[resultp]; // get stop location
					this[offsetp] = -(c * SLOT_HEIGHT);

					if (this[offsetp] + DRAW_OFFSET > 0) {
			    		// reset back to beginning
			    		this[offsetp] = -this.resetOffset + SLOT_HEIGHT * 3;
					}

		    	} else {
					this[offsetp] += this[speedp];
					if (this[offsetp] + DRAW_OFFSET > 0) {
			    		// reset back to beginning
			    		this[offsetp] = -this.resetOffset + SLOT_HEIGHT * 3 - DRAW_OFFSET;
					}
		    	}
		    	// translate canvas location
		    	this[cp].css(this.cssTransform, this.trnOpen + '0px, '+(this[offsetp] + DRAW_OFFSET)+'px' + this.trnClose);
			}
	    }
    }

	destructor() {

	}
}

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 500 / 60);
        };
})();
