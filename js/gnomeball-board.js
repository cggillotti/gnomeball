// Github:   https://github.com/shdwjk/Roll20API/blob/master/Base64/Base64.js
// By:       The Aaron, Arcane Scriptomancer
// Contact:  https://app.roll20.net/users/104025/the-aaron
// modified from:  http://www.webtoolkit.info/

const GnomeBoard = (() => { // eslint-disable-line no-unused-vars
    const version = '0';
    
    const checkInstall = () => {
      log('-=> Gnome Board v'+version+'<=- ');
    };


    function createScoreboardBox(inning) {
            var currentPageID = Campaign().get('playerpageid');
            var scoreTitle = inning.toString();
            var scorePrefix  = "Inning"+inning;
            
            
            if(inning > 3) {
                scoreTitle = "Totals";
                scorePrefix = "Total";
                
                // var boxid = createObj('text', {
                // left: 400 + inning*60,
                // top: 400,
                // width: 50,
                // height: 50,
                // layer: 'objects',
                // font_size: 100,
                // text: scoreTitle,
                // pageid: currentPageID,
                // font_family: 'Arial'
                
                // });
               
                // log("new inning: " + boxid.get("_id"));
                
                // state.Gnomeball.field[scoreTitle + inning + "Home"]= boxid.get("_id");
                    
            }

          
            
            var awayScore = createObj('text', {
                left: 100 + inning*180,
                top: 320,
                width: 50,
                height: 50,
                layer: 'objects',
                font_size: 100,
                text: '0',
                pageid: currentPageID,
                font_family: 'Arial'
                
            });
           
            log(" away: " + awayScore.get("_id"));
            
            state.Gnomeball.field[scorePrefix+"Away"] = awayScore.get("_id");
            log("Away: "+ scorePrefix+"Away");
            
            
            var homeScore = createObj('text', {
                left: 100 + inning*180,
                top: 440,
                width: 50,
                height: 50,
                layer: 'objects',
                font_size: 100,
                text: '0',
                pageid: currentPageID,
                font_family: 'Arial'
                
            });
           
            log("inning home: " + homeScore.get("_id"));
            state.Gnomeball.field[scorePrefix+ "Home"]= homeScore.get("_id");
            log("State"+state.Gnomeball.field[scorePrefix+ "Home"]);
        }

        function createHomeAndAwayText() {
            
            var currentPageID = Campaign().get('playerpageid');
    
            var awayTeamName = createObj('text', {
                left: 80,
                top: 320,
                width: 100,
                height: 50,
                layer: 'objects',
                font_size: 26,
                text: "Away",
                pageid: currentPageID,
                font_family: 'Arial'
                
            });
            state.Gnomeball.field["AwayTeam"] = awayTeamName.get("_id");
            
            var homeTeamName = createObj('text', {
                left: 80,
                top: 440,
                width: 100,
                height: 50,
                layer: 'objects',
                font_size: 26,
                text: "Home",
                pageid: currentPageID,
                font_family: 'Arial'
                
            });
            state.Gnomeball.field["HomeTeam"] = homeTeamName.get("_id");
           
          var phase = createObj('text', {
                left: 500,
                top: 660,
                width: 200,
                height: 50,
                layer: 'map',
                font_size: 40,
                text: "Ready to Play?",
                pageid: currentPageID,
                font_family: 'Arial'
                
            });
            
            state.Gnomeball.field["phase"]= phase.get("_id");
           
            var bat = createObj('text', {
                left: 500,
                top: 720,
                width: 300,
                height: 50,
                layer: 'map',
                font_size: 26,
                text: "Waiting for batter",
                pageid: currentPageID,
                font_family: 'Arial'
                
            });
            state.Gnomeball.field["atbat"] = bat.get("_id");
       
        }


        function makePlayerBox( team, number) {
            var currentPageID = Campaign().get('playerpageid');
            
            var away = 0;
            
            if(team === "Away") {
                away = 700;
            }
            
            var playerName = createObj('text', {
                left: 150 + away,
                top: 570 + (number+1) * 60 ,
                width: 100,
                height: 50,
                layer: 'objects',
                font_size: 26,
                text: team + "Player "+ (number+1),
                pageid: currentPageID,
                font_family: 'Arial'
                
            });
            
            state.Gnomeball.field[team+"LineUp"+number]= playerName.get("_id");
            
        }
     
        function createTeamLineUpBoxes() {
        
            for (let i =0; i < 4; i++) {
                makePlayerBox( "Home", i);
            }
            
            for (let i =0; i < 4; i++) {
                makePlayerBox( "Away", i);
            }
            
        }

        function setUpGame(removeState = true) {
             removeOld();

            state.Gnomeball.field = {};
    
       
            createScoreboardBox(1);
            createScoreboardBox(2);
            createScoreboardBox(3);
            createScoreboardBox(4);
            createHomeAndAwayText();
            createOuts();
            createTeamLineUpBoxes();
            
            log( state.Gnomeball.field);
    
        }
        
        function createOuts() {
            
            var currentPageID = Campaign().get('playerpageid');
    
            var outsBox = createObj('text', {
                left: 540,
                top: 560,
                width: 50,
                height: 50,
                layer: 'objects',
                font_size: 100,
                text: '0',
                pageid: currentPageID,
                font_family: 'Arial'
                
            });
            state.Gnomeball.field["Outs"] = outsBox.get("_id");
        }
    
        function removeOld () {
            var textboxes = filterObjs(function(obj) {
                                if (obj.get('type') !== 'text' ) return false;
                                return true;
                            });
                            
            textboxes.forEach((item) =>{item.remove();});
            state.Gnomeball.currentGame = {};
        }
    
        function updateScorecard(inning, team, runs) {
            var id = state.Gnomeball.field["Inning"+inning+team];
            var scorecard = getObj('text', id);
            var score = scorecard.get('text');
            scorecard.set('text',score+runs);
            
            var totalid = state.Gnomeball.field['Total'+team];
            var totalcard = getObj('text', id);
            var totalscore = totalcard.get('text');
            totalcard.set('text',score+runs);
            
            
        }
        
      function getTeamsAndPlayers() {
          var currentPageID = Campaign().get('playerpageid');
          var homeTeam = getObj('text', state.Gnomeball.field['HomeTeam']).get("text");
          var awayTeam = getObj('text', state.Gnomeball.field["AwayTeam"]).get("text");
          var home1 = getObj('text', state.Gnomeball.field["HomeLineUp0"]).get("text");
          var home2 = getObj('text', state.Gnomeball.field["HomeLineUp1"]).get("text");
          var home3 = getObj('text', state.Gnomeball.field["HomeLineUp2"]).get("text");
          var away4 = getObj('text', state.Gnomeball.field["AwayLineUp3"]).get("text");
          var home4 = getObj('text', state.Gnomeball.field["HomeLineUp3"]).get("text");
          var away1 = getObj('text', state.Gnomeball.field["AwayLineUp0"]).get("text");
          var away2 = getObj('text', state.Gnomeball.field["AwayLineUp1"]).get("text");
          var away3 = getObj('text', state.Gnomeball.field["AwayLineUp2"]).get("text");

          state.Gnomeball.currentGame.homeTeam.name = homeTeam;
          state.Gnomeball.currentGame.homeTeam.players = [
              home1,
              home2,
              home3,
              home4
              ];
              state.Gnomeball.currentGame.awayTeam.name = awayTeam;
              state.Gnomeball.currentGame.awayTeam.players = [
                  away1,
                  away2,
                  away3,
                  away4
                  ];
          log("Hometeam"+homeTeam);
          log("Away"+awayTeam);
      }


    on("ready",()=>{
        checkInstall();
    });

    return {
        setUpGame: setUpGame,
        getTeamsAndPlayers: getTeamsAndPlayers
    };

})();