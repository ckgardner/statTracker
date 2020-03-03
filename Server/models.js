/*jshint esversion: 6 */

var mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://cgardner:Cadorian27!@cluster0-jnaty.mongodb.net/playerdatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

var Player = mongoose.model('Player', {
    player_name: {
        type: String,
        require: [true, "You must have a player name"]
    },
    player_ppg: {
        type: Number,
        default: 0
    },
    player_rebounds: {
        type: Number,
        default: 0
    },
    player_assists: {
        type: Number,
        default: 0
    },
    player_steals: {
        type: Number,
        default: 0
    },
    player_blocks: {
        type: Number,
        default: 0
    },
    player_turnovers: {
        type: Number,
        default: 0
    },
    player_fouls: {
        type: Number,
        default: 0
    },
});

var Game = mongoose.model('Game', {
    game_date: {
        type: Date,
        default: Date.now
    }
});

var Stat = mongoose.model('Stat',{
    score:{
        type: Number,
    },
    oneRebound: {
        type: Number,
    },
    oneAssist: {
        type: Number,
    },
    oneSteal: {
        type: Number,
    },
    oneTurnover: {
        type: Number,
    },
    oneFoul: {
        type: Number,
    },
    player_id: [{ type: Schema.Types.ObjectId, ref: 'Player' }]
});

module.exports = {
    Player: Player,
    Game: Game,
    Stat: Stat
};