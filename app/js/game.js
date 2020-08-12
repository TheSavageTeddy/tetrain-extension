// Back to menu function
function mainmenu() {
    window.location.replace("../../popup.html");
}

// Put all code in config because async bad
chrome.storage.local.get(["design", "isPlaying", "grid", "clearedRows", "visualScore", "currentScore", "nextPiece", "timeSinceStart", "currentPiece", "hasLost", "ispieceinHold", "currentHold", "isabletoSwap", "hasBorder"], function(value) {
    //-------------------------------------------------------------------------
    // config stuff
    //---------------------------------------- ---------------------------------
    if (value.design == "clean") {
        var blockStyle = "smooth"
        console.log("Style of:" + blockStyle)
    } else if (value.design == "legends"){
        var blockStyle = "legends"
        console.log("Style of:" + blockStyle)
    } else{
        var blockStyle = "bold"
        console.log("Style of:" + blockStyle)
    }
    function saveSettings() {
        if (playing) {
            chrome.storage.local.set({
                isPlaying: true
            });
        } else { // Set if game running or not
            chrome.storage.local.set({
                isPlaying: false
            });
        }
        chrome.storage.local.set({ grid: blocks }); // Save Grid
        chrome.storage.local.set({ clearedRows: rows }); // Save cleared Rows
        chrome.storage.local.set({ visualScore: vscore }); // Save Visual Score
        chrome.storage.local.set({ currentScore: score }); // Save Current Score
        chrome.storage.local.set({ currentPiece: current}); // Save Current Piece
        chrome.storage.local.set({ nextPiece: next}); // Save Next Piece
        chrome.storage.local.set({ timeSinceStart: dt}); // Save Time since start
        if (pieceinHold){
            chrome.storage.local.set({ currentHold: hold_current}); // Save current hold piece
            chrome.storage.local.set({ ispieceinHold: true});
        } else {
            chrome.storage.local.set({ currentHold: hold_current}); // Save current hold piece
            chrome.storage.local.set({ ispieceinHold: true});
        }
        if (canSwap) {
            chrome.storage.local.set({ isabletoSwap: true});
        } else {
            chrome.storage.local.set({ isabletoSwap: false});
        }
        if (lost) {
            chrome.storage.local.set({ hasLost: true}); // Save lost var
        } else {
            chrome.storage.local.set({ hasLost: false});
        }
    }


    // the game engine is from https://github.com/jakesgordon/javascript-tetris
    // i modified it to fit with the extension and changed the style
    // and also some other changes


    //-------------------------------------------------------------------------
    // base helper methods
    //-------------------------------------------------------------------------

    function get(id) {
        return document.getElementById(id);
    }

    function hide(id) {
        get(id).style.visibility = 'hidden';
    }

    function show(id) {
        get(id).style.visibility = null;
    }

    function html(id, html) {
        get(id).innerHTML = html;
    }

    function timestamp() {
        return new Date().getTime();
    }

    function lose(s) {
      show('start');
      setVisualScore();
      playing = false;
      chrome.storage.local.set({
          isPlaying: false
      });
      if (s=="lost"){
        enterToPlay("lost")
      }else{
        enterToPlay("show");
      }
      
  }


    function random(min, max) {
        return (min + (Math.random() * (max - min)));
    }

    function randomChoice(choices) {
        return choices[Math.round(random(0, choices.length - 1))];
    }

    if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback, element) {
                window.setTimeout(callback, 1000 / 60);//60fps
            }
    }

    //-------------------------------------------------------------------------
    // game constants
    //-------------------------------------------------------------------------

    var KEY = {
            ESC: 27,
            SPACE: 32,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            ENTER: 13,
            Q: 81,
            C: 67
        },
        DIR = {
            UP: 0,
            RIGHT: 1,
            DOWN: 2,
            LEFT: 3,
            MIN: 0,
            MAX: 3
        },

        canvas = get('canvas'),
        ctx = canvas.getContext('2d'),
        ucanvas = get('upcoming'),
        uctx = ucanvas.getContext('2d'),
        hcanvas = get('hold-canvas'),
        hctx = hcanvas.getContext('2d'),
        speed = {
            start: 0.6,
            decrement: 0.05,
            min: 0.1
        }, // how long before piece drops by 1 row (seconds)
        nx = 10, // width of tetris court (in blocks)
        ny = 20, // height of tetris court (in blocks)
        nu = 5; // width/height of upcoming preview (in blocks)

    //-------------------------------------------------------------------------
    // game variables (initialized during reset)
    //-------------------------------------------------------------------------

    var dx, dy, // pixel size of a single tetris block
        blocks, // 2 dimensional array (nx*ny) representing tetris court - either empty block or occupied by a 'piece'
        actions, // queue of user actions (inputs)
        playing, // true|false - game is in progress
        dt, // time since starting this game
        current, // the current piece
        next, // the next piece
        score, // the current score
        vscore, // the currently displayed score (it catches up to score in small chunks - like a spinning slot machine)
        rows, // number of completed rows in the current game
        backtoback, // back to back variable
        step, // how long before current piece drops by 1 row
        isr, // reset variable
        hold_current, // Current Hold Piece
        pieceinHold = false,
        old_next,
        old_current_piece,
        canSwap = true,
        rota = false;

    //-------------------------------------------------------------------------
    // tetris pieces
    //
    // blocks: each element represents a rotation of the piece (0, 90, 180, 270)
    //         each element is a 16 bit integer where the 16 bits represent
    //         a 4x4 set of blocks, e.g. j.blocks[0] = 0x44C0
    //
    //             0100 = 0x4 << 3 = 0x4000
    //             0100 = 0x4 << 2 = 0x0400
    //             1100 = 0xC << 1 = 0x00C0
    //             0000 = 0x0 << 0 = 0x0000
    //                               ------
    //                               0x44C0
    //
    //-------------------------------------------------------------------------
    //
    // COSMETIC STUFF
    //
    //-------------------------------------------------------------------------

    if (value.hasBorder) {
        document.getElementById("canvas").style.outline = "white 3px solid";
        document.getElementById("upcoming").style.outline = "white 3px solid";
        document.getElementById("hold-canvas").style.outline = "white 3px solid";
    }

    //var blockStyle = "smooth"

    //
    //
    //
    var i = {
        size: 4,
        blocks: [0x0F00, 0x2222, 0x00F0, 0x4444],
        color: 'cyan'
    };
    var j = {
        size: 3,
        blocks: [0x8E00, 0x6440, 0x0E20, 0x44C0],
        color: 'blue'
    };
    var l = {
        size: 3,
        blocks: [0x2E00, 0x4460, 0x0E80, 0xC440],
        color: 'orange'
    };
    var o = {
        size: 2,
        blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00],
        color: 'yellow'
    };
    var s = {
        size: 3,
        blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620],
        color: 'lime'
    };
    var t = {
        size: 3,
        blocks: [0x4E00, 0x4640, 0x0E40, 0x4C40],
        color: 'magenta'
    };
    var z = {
        size: 3,
        blocks: [0x0C60, 0x4C80, 0xC600, 0x2640],
        color: 'red'
    };

    //------------------------------------------------
    // do the bit manipulation and iterate through each
    // occupied block (x,y) for a given piece
    //------------------------------------------------
    function eachblock(type, x, y, dir, fn) {
        var bit, result, row = 0,
            col = 0,
            blocks = type.blocks[dir];
        for (bit = 0x8000; bit > 0; bit = bit >> 1) {
            if (blocks & bit) {
                fn(x + col, y + row);
            }
            if (++col === 4) {
                col = 0;
                ++row;
            }
        }
    }

    //-----------------------------------------------------
    // check if a piece can fit into a position in the grid
    //-----------------------------------------------------
    function occupied(type, x, y, dir) {
        var result = false
        eachblock(type, x, y, dir, function(x, y) {
            if ((x < 0) || (x >= nx) || (y < 0) || (y >= ny) || getBlock(x, y))
                result = true;
        });
        return result;
    }

    function unoccupied(type, x, y, dir) {
        return !occupied(type, x, y, dir);
    }

    //-----------------------------------------
    // start with 4 instances of each piece and
    // pick randomly until the 'bag is empty'
    //-----------------------------------------
    var pieces = [];

    function randomPiece() {
        if (pieces.length == 0)
            pieces = [i, j, l, o, s, t, z];
        var type = pieces.splice(random(0, pieces.length - 1), 1)[0];
        if (type == j || type == l || type == t || type == o) {
            return {
                type: type,
                dir: DIR.UP,
                x: 4,
                y: 1,
                piece_type: 0
            };
        } else if (type == i){
            return {
                type: type,
                dir: DIR.UP,
                x: 3,
                y: 0,
                piece_type: 1
            };
        }else {
            return {
                type: type,
                dir: DIR.UP,
                x: 4,
                y: 0,
                piece_type: 2
            };
        }

    }


    //-------------------------------------------------------------------------
    // GAME LOOP
    //-------------------------------------------------------------------------

    function run() {
        addEvents(); // attach keydown and resize events
        var now = timestamp();
        var last = now = timestamp();
        var alr = true
//
//
// main loop of things
//
//
        function frame() {
            saveSettings()
            now = timestamp();
            if (rota){
                rota = false
                requestAnimationFrame(frame, canvas);
            }else{
                update(Math.min(1, (now - last) / 1000.0)); // using requestAnimationFrame have to be able to handle large delta's caused when it 'hibernates' in a background or non-visible tab
                draw();
                ctx.strokeStyle = "#FF0000";
                ctx.strokeRect(0, 20, canvas.width, 1);
                ctx.strokeStyle = "#000000";
                last = now;
                requestAnimationFrame(frame, canvas);
            if (!lost){

            
              if (alr){
                  if (playing){
                      enterToPlay("hide");
                      alr=false
                  }else{
                      enterToPlay("show");
                  }
              }
          } else{
            enterToPlay("lost")
          }
            ctx.strokeStyle = "#FF0000";
            ctx.strokeRect(0, 20, canvas.width, 1);
            ctx.strokeStyle = "#000000";
        }
        }

        resize(); // setup all our sizing information
        reset(); // reset the per-game variables
        frame(); // start the first frame

    }


    function addEvents() {
        document.addEventListener('keydown', keydown, false);
        window.addEventListener('resize', resize, false);
    }

    function resize(event) {
        canvas.width = canvas.clientWidth; // set canvas logical size equal to its physical size
        canvas.height = canvas.clientHeight; // (ditto)
        ucanvas.width = ucanvas.clientWidth;
        ucanvas.height = ucanvas.clientHeight;
        dx = canvas.width / nx; // pixel size of a single tetris block
        dy = canvas.height / ny; // (ditto)
        invalidate();
        invalidateNext();
    }


    function keydown(ev) {
        var handled = false;
        switch (ev.keyCode) {
            case KEY.LEFT:
                actions.push(DIR.LEFT);
                handled = true;
                break;
            case KEY.RIGHT:
                actions.push(DIR.RIGHT);
                handled = true;
                break;
            case KEY.UP:
                actions.push(DIR.UP);
                handled = true;
                break;
            case KEY.DOWN:
                actions.push(DIR.DOWN);
                handled = true;
                break;
            case KEY.ESC:
                window.close();
                handled = true;
                break;
            case KEY.SPACE:
                harddrop()
                handled = true;
                break;
        }
        if (ev.keyCode == KEY.ENTER) {
            enterToPlay("hide")
            lost = false
            play();
            handled = true;
            isr = false;
        }
        if (ev.keyCode == KEY.SPACE) {
            console.log(current)
            harddrop()
        }
        if (ev.keyCode == KEY.C) {
            hold()
        }
        if (ev.keyCode == KEY.Q) {
            lose("kys")
            mainmenu()
        }
        if (handled)
            ev.preventDefault(); // prevent arrow keys from scrolling the page (supported in IE9+ and all other browsers)

    }


    //-------------------------------------------------------------------------
    // GAME LOGIC
    //-------------------------------------------------------------------------

    function play() {
        hide('start');
        reset();
        playing = true;
        isr = false;
        chrome.storage.local.set({
            isPlaying: true
        });
    }



    function setVisualScore(n) {
        vscore = n || score;
        invalidateScore();
    }

    function setScore(n) {
        score = n;
        setVisualScore(n);
    }

    function addScore(n) {
        score = score + n;
    }

    function clearScore() {
        setScore(0);
    }

    function clearRows() {
        setRows(0);
    }

    function setRows(n) {
        rows = n;
        step = Math.max(speed.min, speed.start - (speed.decrement * rows));
        invalidateRows();
    }

    function addRows(n) {
        setRows(rows + n);
    }

    function getBlock(x, y) {
        return (blocks && blocks[x] ? blocks[x][y] : null);
    }

    function setBlock(x, y, type) {
        blocks[x] = blocks[x] || [];
        blocks[x][y] = type;
        invalidate();
    }

    function clearBlocks() {
        blocks = [];
        invalidate();
    }

    function clearActions() {
        actions = [];
    }

    function setCurrentPiece(piece) {
        current = piece || randomPiece();
        invalidate();
    }

    function setNextPiece(piece) {
        next = piece || randomPiece();
        invalidateNext();
    }

    function reset() {
        if (isr) {
            dt = 0;
            canSwap = true;
            clearActions();
            clearBlocks();
            clearRows();
            clearScore();
            setCurrentPiece(next);
            setNextPiece();
        } else if (value.isPlaying) {
            dt = 0;
            clearActions();
            clearBlocks();
            clearRows();
            clearScore();
            setCurrentPiece(next);
            setNextPiece();
            dt = value.timeSinceStart;
            blocks = value.grid;
            current = value.currentPiece;
            score = value.currentScore;
            vscore = value.visualScore;
            rows = value.clearedRows
            next = value.nextPiece;
            lost = value.hasLost;
            if (value.ispieceinHold){
                pieceinHold = true;
                hold_current = value.currentHold;
                drawHold();
            } else {
                pieceinHold = false;
            }
            if (value.isabletoSwap) {
                canSwap = true;
            } else {
                canSwap = false;
            }
            console.log("Next piece:")
            console.log(next)
            console.log("Current piece:")
            console.log(current)
            setCurrentPiece(current);
            setNextPiece(next);
        } else {
            dt = 0;
            canSwap = true;
            clearActions();
            clearBlocks();
            clearRows();
            clearScore();
            setCurrentPiece(next);
            setNextPiece();
        }
    }

    function update(idt) {
        if (playing) {
            if (vscore < score)
                setVisualScore(score);
            handle(actions.shift());
            dt = dt + idt;
            if (dt > step) {
                dt = dt - step;
                drop();
                
            }
        }
    }

    function handle(action) {
        switch (action) {
            case DIR.LEFT:
                move(DIR.LEFT);
                break;
            case DIR.RIGHT:
                move(DIR.RIGHT);
                break;
            case DIR.UP:
                rotate();
                break;
            case DIR.DOWN:
                drop();;
                score = score + 1;
                break;
        }
    }

    function move(dir) {
        var x = current.x,
            y = current.y;
        switch (dir) {
            case DIR.RIGHT:
                x = x + 1;
                break;
            case DIR.LEFT:
                x = x - 1;
                break;
            case DIR.DOWN:
                y = y + 1;;
                break;
        }
        if (unoccupied(current.type, x, y, current.dir)) {
            current.x = x;
            current.y = y;
            invalidate();
            return true;
        } else {
            return false;
        }
    }

    function rotate() {
        var newdir = (current.dir == DIR.MAX ? DIR.MIN : current.dir + 1);
        if (unoccupied(current.type, current.x, current.y, newdir)) {
            current.dir = newdir;
            rota=true
            invalidate();
            
        } else if (current.type == s){//cant rotate left side
            if (unoccupied(current.type, current.x + 1, current.y, newdir)) {
                move(DIR.RIGHT)
                current.dir = newdir;
                rota=true
                invalidate();
            
        }else if (current.type == z){//cant rotate right side
            if (unoccupied(current.type, current.x - 1, current.y, newdir)) {
                move(DIR.LEFT)
                current.dir = newdir;
                rota=true
                invalidate();
        }else{
            if (unoccupied(current.type, current.x + 1, current.y, newdir)) {
                move(DIR.RIGHT)
                current.dir = newdir;
                rota=true
                invalidate();
            } else if (unoccupied(current.type, current.x - 1, current.y, newdir)) {
                move(DIR.LEFT)
                current.dir = newdir;
                rota=true
                invalidate();
            } else if (unoccupied(current.type, current.x + 2, current.y, newdir)) {
                move(DIR.RIGHT)
                move(DIR.RIGHT)
                current.dir = newdir;
                rota=true
                invalidate();
            } else if (unoccupied(current.type, current.x - 2, current.y, newdir)) {
                move(DIR.LEFT)
                move(DIR.LEFT)
                current.dir = newdir;
                rota=true
                invalidate();
        }
    }
  }
}
}
    function drop() {
        if (!move(DIR.DOWN)) {
            dropPiece();
            removeLines();
            console.log("Next piece:")
            console.log(next)
            console.log("Current piece:")
            console.log(current)
            setCurrentPiece(next);
            setNextPiece(randomPiece());
            clearActions();
            canSwap = true;
            if (occupied(current.type, current.x, current.y, current.dir)) {
                lose("lost");
            }
        }
    }

    function dropPiece() { //not when dropping from top, its when it touches bottom/other pieces
        eachblock(current.type, current.x, current.y, current.dir, function(x, y) {

            setBlock(x, y, current.type);
        });
    }

    function removeLines() {
        var x, y, complete, n = 0;
        for (y = ny; y > 0; --y) {
            complete = true;
            for (x = 0; x < nx; ++x) {
                if (!getBlock(x, y))
                    complete = false;
            }
            if (complete) {
                removeLine(y);
                y = y + 1; // recheck same line
                n++;
            }
        }
        if (n > 0) {
            addRows(n);
            if (n < 4) {
                addScore(100 + ((n - 1) * 200)); // 1: 100, 2: 300, 3: 500, 4: 800
                backtoback=false
            } else {
                if (backtoback) {
                    addScore(1200);
                } else {
                    addScore(800);
                    backtoback=true
                }
            }
        }
    }

    function harddrop() {
        var x = current.x,
            y = current.y;
        var ii = 0
        while (unoccupied(current.type, x, y + ii, current.dir)) {
            ii = ii + 1
        }
        addScore((ii-1)*2)
        current.y = y + ii - 1
    }

    function hold() {
        if (canSwap) {
            if (pieceinHold) {
                if (hold_current.piece_type == 0){
                    hold_current = {
                        type: hold_current.type,
                        dir: DIR.UP,
                        x: 4,
                        y: 1,
                        piece_type: 0
                    }
                } else if (hold_current.piece_type == 1){
                    hold_current = {
                        type: hold_current.type,
                        dir: DIR.UP,
                        x: 3,
                        y: 0,
                        piece_type: 1
                    }
                } else {
                    hold_current = {
                        type: hold_current.type,
                        dir: DIR.UP,
                        x: 4,
                        y: 0,
                        piece_type: 2
                    }
                }
                console.log("Piece found")
                pieceinHold = true;
                canSwap = false;
                old_current_piece = current;
                setCurrentPiece(hold_current);
                hold_current = old_current_piece
                drawHold();
            } else {
                console.log("No piece")
                pieceinHold = true;
                canSwap = false;
                hold_current = current;
                if (hold_current.piece_type == 0){
                    hold_current = {
                        type: hold_current.type,
                        dir: DIR.UP,
                        x: 4,
                        y: 1,
                        piece_type: 0
                    }
                } else if (hold_current.piece_type == 1){
                    hold_current = {
                        type: hold_current.type,
                        dir: DIR.UP,
                        x: 3,
                        y: 0,
                        piece_type: 1
                    }
                } else {
                    hold_current = {
                        type: hold_current.type,
                        dir: DIR.UP,
                        x: 4,
                        y: 0,
                        piece_type: 2
                    }
                }
                old_next = next;
                setCurrentPiece(next);
                setNextPiece();
                drawHold();
            }
        }
    }


    function removeLine(n) {
        var x, y;
        for (y = n; y >= 0; --y) {
            for (x = 0; x < nx; ++x)
                setBlock(x, y, (y == 0) ? null : getBlock(x, y - 1));
        }
    }

    //-------------------------------------------------------------------------
    // RENDERING
    //-------------------------------------------------------------------------

    var invalid = {};

    function invalidate() {
        invalid.court = true;
    }

    function invalidateNext() {
        invalid.next = true;
    }

    function invalidateScore() {
        invalid.score = true;
    }

    function invalidateRows() {
        invalid.rows = true;
    }

    function draw() {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(0, 20, canvas.width, 1);
        ctx.strokeStyle = "#000000";

        if (blockStyle == "smooth") {

        } else if (blockStyle == "legends"){
            ctx.lineWidth = 1;
            ctx.translate(0.5, 0.5); // for crisp 1px black lines
        } else{
            ctx.lineWidth = 5;
            ctx.translate(0.5, 0.5);
            ctx.lineWidth = 1;
        }
        drawCourt();
        drawNext();
        drawScore();
        drawRows();
        ctx.restore();

    }

    function drawCourt() {
        if (invalid.court) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (playing)
                drawPiece(ctx, current.type, current.x, current.y, current.dir);
            var x, y, block;
            for (y = 0; y < ny; y++) {
                for (x = 0; x < nx; x++) {
                    if (block = getBlock(x, y))
                        drawBlock(ctx, x, y, block.color);
                }
            }
            ctx.strokeRect(0, 0, nx * dx - 1, ny * dy - 1); // court boundary
            invalid.court = false;
        }
    }

    function drawNext() {
        if (invalid.next) {
            var padding = (nu - next.type.size) / 2; // half-arsed attempt at centering next piece display
            uctx.save();
            if (blockStyle == "smooth") {

            } else if (blockStyle == "legends"){
                uctx.lineWidth = 1;
                uctx.translate(0.5, 0.5); // for crisp 1px black lines
            } else{
                uctx.lineWidth = 2;
                uctx.translate(0.5, 0.5);
                uctx.lineWidth = 1;
            }

            uctx.clearRect(0, 0, nu * dx, nu * dy);
            drawPiece(uctx, next.type, padding, padding, next.dir);
            uctx.strokeStyle = 'black';
            uctx.strokeRect(0, 0, nu * dx - 1, nu * dy - 1);
            uctx.restore();
            invalid.next = false;
        }
    }

    function drawHold() {
        if (pieceinHold) {
            console.log("Attempting to draw hold")
            var paddingh = (nu - hold_current.type.size) / 2; // half-arsed attempt at centering hold piece display
            hctx.save();
            if (blockStyle == "smooth") {

            } else if (blockStyle == "legends"){
                hctx.lineWidth = 1;
                hctx.translate(0.5, 0.5); // for crisp 1px black lines
            } else{
                hctx.lineWidth = 2;
                hctx.translate(0.5, 0.5);
                hctx.lineWidth = 1;
            }

            hctx.clearRect(0, 0, nu * dx, nu * dy);
            drawPiece(hctx, hold_current.type, paddingh, paddingh, hold_current.dir);
            hctx.strokeStyle = 'black';
            hctx.strokeRect(0, 0, nu * dx - 1, nu * dy - 1);
            hctx.restore();
        }
    }

    function drawScore() {
        if (invalid.score) {
            html('score', (vscore));
            invalid.score = false;
        }
    }

    function drawRows() {
        if (invalid.rows) {
            html('rows', rows);
            invalid.rows = false;
        }
    }

    function drawPiece(ctx, type, x, y, dir) {
        eachblock(type, x, y, dir, function(x, y) {
            drawBlock(ctx, x, y, type.color);
        });
    }

    function drawBlock(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * dx, y * dy, dx, dy);
        //ctx.strokeRect(x*dx, y*dy, dx, dy)
    }

    //draw the press enter to play
    var lost = false //
    function enterToPlay(t) {
        if (t=="show"){
            ctx.font = "40px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "center";
            ctx.fillText("Enter", canvas.width/2, 200);
            ctx.fillText("to play", canvas.width/2, 240);
        } else if (t == "lost"){
          lost = true//
          playing = false
          isr = true
          ctx.font = "40px Arial";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.fillText("You died!", canvas.width/2, 200);
          ctx.fillText("Enter to", canvas.width/2, 240);
          ctx.fillText("play again", canvas.width/2, 280);
        }else{
          //ctx.clearRect(0, 100, 300, 300);
          //im fricking dumb
          //we dont even need to clear it aaaaa
        }
    }




    //-------------------------------------------------------------------------
    // FINALLY, lets run the game
    //-------------------------------------------------------------------------

    run();
});