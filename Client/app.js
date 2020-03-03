/*jshint esversion: 6 */

// PLAYER FUNCTIONS ON SERVER
var getPlayersFromServer = function(){
    return fetch("http://localhost:3000/players");
};

var deletePlayerFromServer = function(playerId){
    return fetch("http://localhost:3000/players/" + playerId,{
        method: "DELETE",
    });
};

var updatePlayerOnServer = function(playerId, newPlayerName){
    var data = `player_name=${encodeURIComponent(newPlayerName)}`;
    return fetch("http://localhost:3000/players/" + playerId,{
        body: data,
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    });
};

var updatePlayerScoreFromServer = function(playerId, newPlayerPpg){
    var data = `player_ppg=${encodeURIComponent(newPlayerPpg)}`;
    return fetch("http://localhost:3000/players/" + playerId,{
        body: data,
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    });
};


var createPlayersOnServer = function(newPlayerName, newPlayerPpg, newPlayerRebounds, newPlayerAssists, newPlayerSteals,
    newPlayerBlocks, newPlayerTurnovers, newPlayerFouls) {
    var data = `player_name=${encodeURIComponent(newPlayerName)}`;
    data    += `&player_ppg=${encodeURIComponent(newPlayerPpg)}`;
    data    += `&player_rebounds=${encodeURIComponent(newPlayerRebounds)}`;
    data    += `&player_assists=${encodeURIComponent(newPlayerAssists)}`;
    data    += `&player_steals=${encodeURIComponent(newPlayerSteals)}`;
    data    += `&player_blocks=${encodeURIComponent(newPlayerBlocks)}`;
    data    += `&player_turnovers=${encodeURIComponent(newPlayerTurnovers)}`;
    data    += `&player_fouls=${encodeURIComponent(newPlayerFouls)}`;
    return fetch("http://localhost:3000/players",{
        body: data,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    });
};

// GAME FUNCTIONS ON SERVER
var getGamesFromServer = function(){
    return fetch("http://localhost:3000/games");
};

var createGameOnServer = function(newGameDate) {
    var data = `game_date=${encodeURIComponent(newGameDate)}`;
    return fetch("http://localhost:3000/games",{
        body: data,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    });
};

// STAT FUNCTIONS ON SERVER
var getStatsFromServer = function(){
    return fetch("http://localhost:3000/stats");
};

var createStatOnServer = function(threePoint, twoPoint, onePoint, minusOnePoint, oneRebound, oneAssist, oneSteal, oneTurnover, oneFoul, chosenPlayer) {
    var data = `threePoint=${encodeURIComponent(threePoint)}`;
    data    += `&twoPoint=${encodeURIComponent(twoPoint)}`;
    data    += `&onePoint=${encodeURIComponent(onePoint)}`;
    data    += `&minuwOnePoint=${encodeURIComponent(minusOnePoint)}`;
    data    += `&oneRebound=${encodeURIComponent(oneRebound)}`;
    data    += `&oneAssist=${encodeURIComponent(oneAssist)}`;
    data    += `&oneSteal=${encodeURIComponent(oneSteal)}`;
    data    += `&oneTurnover=${encodeURIComponent(oneTurnover)}`;
    data    += `&oneFoul=${encodeURIComponent(oneFoul)}`;
    data    += `&player_id=${encodeURIComponent(chosenPlayer)}`;
    return fetch("http://localhost:3000/stat",{
        body: data,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    });
};

var app = new Vue({
    el: '#app',
    data: {
        newPlayerName: "",
        newPlayerPpg: "",
        newPlayerRebounds: "",
        newPlayerAssists: "",
        newPlayerSteals: "",
        newPlayerBlocks: "",
        newPlayerTurnovers: "",
        newPlayerFouls: "",
        playerId: "",

        players: [],
        chosenPlayer: "",
        game_date: "",
        currentEditObject: "",
        currentEditId: "",
        stat: "",

        Score: "",
        Reb: "",
        Asst: "",
        Stl: "",
        Blk: "",
        TO: "",
        Foul: "",

        displayMain: true,
        showInGame: false,
        showMyTeam: false,
        showAddToPlayerPage: false,
        showAddPlayerPage: false,
        showEditPlayerPage: false,
        showGameHistory: false,
        errors: []
    },

    methods: {
        // HOME PAGE BUTTONS
        startGameButton: function(){
            this.displayMain = false;
            this.showInGame = true;
        },
        myTeamButton: function(){
            this.displayMain = false;
            this.showMyTeam = true;
        },
        gameHistoryButton: function(){
            this.showGameHistory = true;
            this.displayMain = false;
        },

        // BACK BUTTONS
        backToHomeButton: function(){
            this.displayMain = true;
            this.showMyTeam = false;
            this.showInGame = false;
            this.showAddToPlayerPage = false;
            this.showAddPlayerPage = false;
            this.showGameHistory = false;
        },
        backToInGameButton: function(){
            this.displayMain = false;
            this.showMyTeam = false;
            this.showInGame = true;
            this.showAddToPlayerPage = false;
            this.showAddPlayerPage = false;
        },
        backToMyTeamButton: function(){
            this.displayMain = false;
            this.showMyTeam = true;
            this.showInGame = false;
            this.showAddToPlayerPage = false;
            this.showAddPlayerPage = false;
            this.showEditPlayerPage = false;
            this.showGameHistory = false;
        },
        // PLAYER BUTTON FUNCTIONS
        SubmitPlayer: function(){
            updatePlayerFromServer(this.playerId).then((response)=>{
                if(response.status == 200){
                    this.showPlayers();
                }
            });
        },
        addPlayerButton: function(){
            this.showAddPlayerPage = true;
            this.showMyTeam = false;
        },

        // STAT BUTTON FUNCTIONS
        addScoreButton: function(scoreStat){
            this.showInGame = false;
            this.showAddToPlayerPage = true;
        },
        addRebButton: function(){
            this.showInGame = false;
            this.showAddToPlayerPage = true;
        },
        addAsstButton: function(){
            this.showInGame = false;
            this.showAddToPlayerPage = true;
        },
        addStlButton: function(){
            this.showInGame = false;
            this.showAddToPlayerPage = true;
        },
        addBlkButton: function(){
            this.showInGame = false;
            this.showAddToPlayerPage = true;
        },
        addTOButton: function(){
            this.showInGame = false;
            this.showAddToPlayerPage = true;
        },
        addFoulButton: function(){
            this.showInGame = false;
            this.showAddToPlayerPage = true;
        },
        // END STAT BUTTON FUNCTIONS

        addedScoreToPlayer: function(stat){
            console.log("stat", stat);
            this.showInGame = true;
            this.showAddToPlayerPage = false;
            updatePlayerScoreFromServer(this.playerId, stat).then((response)=>{
                if(response.status == 200){
                    this.showPlayers();
                }
            });
        },

        // DATABASE PLAYER BUTTON FUNCTIONS
        validateAddPlayer: function(){
            this.errors = [];
            if (this.newPlayerName == ""){
                this.errors.push("Please enter a player name.");
            }
            if (this.errors.length > 0){
                return false;
            } else{
                return true;
            }
        },
        submitAddPlayer: function(){
            if(this.validateAddPlayer()){
                createPlayersOnServer(this.newPlayerName, this.newPlayerPpg, this.newPlayerRebounds, this.newPlayerAssists, this.newPlayerSteals,
                    this.newPlayerBlocks, this.newPlayerTurnovers, this.newPlayerFouls ).then((response)=>{
                    if(response.status == 201){
                        this.showPlayers();
                        this.newPlayerName = "";
                        this.newPlayerPpg = "";
                        this.newPlayerRebounds = "";
                        this.newPlayerAssists = "";
                        this.newPlayerSteals = "";
                        this.newPlayerBlocks = "";
                        this.newPlayerTurnovers = "";
                        this.newPlayerFouls = "";
                    }else if (response.status == 422){
                        //server validation error
                    }
                });
                this.showAddPlayerPage = false;
                this.showMyTeam = true;
            }
        },
        showPlayers: function(){
            getPlayersFromServer().then((response)=>{
                response.json().then((players)=>{
                    console.log("PLAYERS:", players);
                    this.players = players;
                });
            });
        },
        deletePlayer: function(){
            deletePlayerFromServer(this.playerId).then((response)=>{
                if(response.status == 200){
                    this.newPlayerName = "";
                }
                this.showPlayers();
            });
        },
        editPlayer: function () {
            this.showMyTeam = false;
            this.showEditPlayerPage = true;
            // 2. fill edit form (set variables to values in player)
        },
        editSaveButtonClicked: function(playerId, currentEditObject){
            this.showMyTeam = true;
            this.showEditPlayerPage = false;
            updatePlayerOnServer(playerId, currentEditObject ).then((response)=>{
                if(response.status == 202){
                    this.currentEditObject = "";
                    this.showPlayers();
                }
            });
        },

        showStats: function(){
            getStatsFromServer().then((response)=>{
                response.json().then((stats)=>{
                    console.log("STATS:", stats);
                    this.stats = stats;
                });
            });
        }
    },
    // DATABASE STAT BUTTON FUNCTIONS
    addGame: function(){
        createGameOnServer(this.newGame).then((response)=>{
            if (response.status == 201){
                this.showGames();
                this.game_date = "";
            }
        });
    },
    showGames: function(){
        getGamesFromServer().then((response)=>{
            response.json().then((Games)=>{
                console.log("Games:", Games);
                this.Games = Games;
            });
        });
    },

    created: function(){
        console.log("vue loaded");
        this.showPlayers();
        this.showStats();
    }
});