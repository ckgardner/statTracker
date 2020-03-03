/*jshint esversion: 6 */
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const models = require('./models');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false })); //urlencoded is the type of data you want it parsed as.
app.use(cors());

// RETRIEVE PLAYERS
app.get('/players', function (req, res){
    models.Player.find({}).then(function(players){
        res.json(players);
    });
});

// RETRIEVE ONE PLAYER
app.get('/players/:playerId', function (req, res){
    let playerId = req.params.playerId;
    // query the mongoose model
    models.Player.findOne({ _id: playerId }).then(function(player){
        if (player){
            res.json(player);
        }else{
            res.sendStatus(404);
        }
    }, function (err){
        res.sendStatus(400);
    });
});

// CREATE ONE PLAYER
app.post('/players', function (req, res){
    console.log("the body", req.body);

    // create an instance of the mongoose model
    let player = new models.Player({
        player_name: req.body.player_name,
    });

    // insert into the mongoose model
    player.save().then(function(){

        res.sendStatus(201);
    }).catch(function (err){
        if (err.errors){
        var messages = {};
        for (let e in err.errors){
            messages[e] = err.errors[e].message;
        }
        res.status(422).json(messages);
        } else{
            res.sendStatus(500);
        }
    });
});

// DELETE ONE PLAYER
app.delete('/players/:playerId', function (req, res){
    let playerId = req.params.playerId;
    // query the mongoose model
    models.Player.findOneAndDelete({ _id: playerId }).then(function(player){
        if (player){
            res.json(player);
        }else{
            res.sendStatus(404);
        }
    }).catch(function (err){
        res.sendStatus(400);
        console.log("There was a problem deleting your player", err);
    });
});

// UPDATE ONE PLAYER
app.put('/players/:playerId', function (req, res){
    let playerId = req.params.playerId;
    // query the mongoose model
    models.Player.findById({ _id: playerId }).then(function(player){
        player.player_name = req.body.player_name;
        player.player_ppg += parseInt(req.body.player_ppg);
        player.player_rebounds += parseInt(req.body.player_rebounds);
        player.player_assists += parseInt(req.body.player_assists);
        player.player_steals += parseInt(req.body.player_steals);
        player.player_blocks += parseInt(req.body.player_blocks);
        player.player_turnovers += parseInt(req.body.player_turnovers);
        player.player_fouls += parseInt(req.body.player_fouls);
        //Divide each line by game history
        player.save().then(function(){
            res.sendStatus(202);
        }).catch(function (err){
            if (err.errors){
            var messages = {};
            for (let e in err.errors){
                messages[e] = err.errors[e].message;
            }
            res.status(422).json(messages);
            } else{
                res.sendStatus(500);
            }
        });
    });
});

// CREATE GAME
app.post('/games', function (req, res){
        console.log("the body", req.body);
        // create an instance of the mongoose model
        let game = new Game({
             game_date: req.body.game_date
        });
        // insert into the mongoose model
        game.save().then(function(){
            res.sendStatus(201);
        }).catch(function (err){
            if (err.errors){
                var messages = {};
                for (let e in err.errors){
                    messages[e] = err.errors[e].message;
                }
                res.status(422).json(messages);
            } else{
                res.sendStatus(500);
            }
        });
    });

// RETRIEVE GAMES
app.get('/games', function (req, res){
    // query the mongoose model
    models.Game.find({}).then(function(games){
        res.json(games);
    });
});

// RETRIEVE ONE GAME
app.get('/games/:gameId', function (req, res){
    let gameId = req.params.gameId;
    // query the mongoose model
    models.Game.findOne({ _id: gameId }).then(function(game){
        if (game){
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }, function (err){
        res.sendStatus(400, err);
    });
});

// CREATE NEW STAT
app.post('/stats', function (req, res){
    console.log("the body", req.body);

    // create an instance of the mongoose model
    let stat = new models.Stat({
         scoreStat: req.body.score,
         oneRebound: req.body.oneRebound,
         oneAssist: req.body.oneAssist,
         oneSteal: req.body.oneSteal,
         oneBlock: req.body.oneBlock,
         oneTurnover: req.body.oneTurnover,
         oneFoul: req.body.oneFoul,
         player: this.playerId
    });

    // insert into the mongoose model
    stat.save().then(function(){

        res.sendStatus(201);
    });
});

// RETRIEVE STATS
app.get('/stats', function (req, res){
    // query the mongoose model
    models.Stat.find({}).then(function(stats){
        res.json(stats);
    });
});

// RETRIEVE ONE STAT
app.get('/stats/:statId', function (req, res){
    let statId = req.params.statId;
    // query the mongoose model
    models.Stat.findOne({ _id: statId }).then(function(stat){
        if (stat){
            res.json(stat);
        }else{
            res.sendStatus(404);
        }
    }, function (err){
        res.sendStatus(400);
    });
});

app.use('*', function(req, res, next) {
    res.sendStatus(404).render('error.ejs');
});

app.listen(port, function(){
    console.log(`listening on port ${port}!`);
});

// Notes:
// github.com/djholt/file-upload-s3-demo for file upload example
// 