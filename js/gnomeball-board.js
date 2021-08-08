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
           
    
            state.Gnomeball.field[scorePrefix+"Away"] = awayScore.get("_id");

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
           
       
            state.Gnomeball.field[scorePrefix+ "Home"]= homeScore.get("_id");
        }

        function createHomeAndAwayText() {
            var currentPageID = Campaign().get('playerpageid');
            const teams = GnomePitches.teams;
            const otherTeamCharacterId ='-MdDMCFiFj-DKnFaA96h';
            var otherTeam = getObj('character',otherTeamCharacterId);
            let team = teams[getAttrByName(otherTeamCharacterId, "team_name")];
            let boysHome = getAttrByName(otherTeamCharacterId, "team_is_home") == 0;
            let boysTeam = "Tritown Area"
            let otherCity = team.city;
            let otherTeamNameText = boysHome !== true ? boysTeam : otherCity;
            let homeTeamNameText = boysHome === true ? boysTeam : otherCity;
            
    
            var awayTeamName = createObj('text', {
                left: 80,
                top: 320,
                width: 100,
                height: 50,
                layer: 'objects',
                font_size: 26,
                text: otherTeamNameText,
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
                text: homeTeamNameText,
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
        
         
        function movePlayerToOrder(id,position,isHome) {
            
            let left = 150;
            let teamName = isHome ? "Home" : "Away";
            
            if(!isHome) {
                left = 880;
            }

            let charToken = findObjs({"_type":'graphic', 'represents':id})[0];
            if(!charToken){
                charToken = getObj('graphic', id);
            }
            
            charToken.set({
                "left": left,
                "top":420 + (position+2) * 110,
                "aura1_radius":""
            });
            
            state.Gnomeball.field[teamName+"LineUp"+position] = charToken.get('_id');
        }
     
        function createTeamLineUpBoxes() {
            const otherTeamCharacterId ='-MdDMCFiFj-DKnFaA96h';
            var otherTeam = getObj('character',otherTeamCharacterId);
            let boysHome = getAttrByName(otherTeamCharacterId, "team_is_home") == 0;
        
            movePlayerToOrder("-MdDH-xA3-d81x8Cg0zu",1,boysHome);
            movePlayerToOrder("-MdDG9MILxmRJFHNHNsJ",2,boysHome);
            movePlayerToOrder("-MdDG_MmRDLXhBxmo14y",3,boysHome);
            movePlayerToOrder("-MdDGR3I1ObOwvrGu7Nq",0,boysHome);
            
            movePlayerToOrder("-MerB70oO4gIId4vrT8c",1,!boysHome);
            movePlayerToOrder("-MerB8BQLUD3NGHbY6M9",2,!boysHome);
            movePlayerToOrder("-MerBAfpsBGE0UjFjWTB",3,!boysHome);
            movePlayerToOrder("-MerBCXKWUlVCQ8KI_lo",0,!boysHome);
            
            
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
                      updateOtherTeam();
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
        
      function updateOtherTeam() {
          const teams = GnomePitches.teams;
      
          let playerInc = 0;
          const otherTeamCharacterId ='-MdDMCFiFj-DKnFaA96h';
           var otherTeam = getObj('character',otherTeamCharacterId);
           let team = teams[getAttrByName(otherTeamCharacterId, "team_name")];
           let isHome = getAttrByName(otherTeamCharacterId, "team_is_home") === "1";

            let prefix = isHome ? "HomeLineUp" : "AwayLineUp";
     
           team.players.forEach((player) => {
               getObj('graphic', state.Gnomeball.field[prefix+playerInc]).set("name",player.name);
               
               findObjs({'type':'attribute', 'name':"team_player"+(playerInc+1)+"_name"}).forEach(i => {
                   i.setWithWorker({current: player.name});
                   });

                 findObjs({'type':'attribute', 'name':"team_player"+(playerInc+1)+"_type"}).forEach(i => {
                     log(i)
                   i.setWithWorker({current: player.type});
                   });
                   
                playerInc++;
           });
      }
        
      function getTeamsAndPlayers() {
         // var currentPageID = Campaign().get('playerpageid');
        
          var homeTeam = getObj('text', state.Gnomeball.field['HomeTeam']).get("text");
          var awayTeam = getObj('text', state.Gnomeball.field["AwayTeam"]).get("text");
          
          var home1 = getObj('graphic', state.Gnomeball.field["HomeLineUp0"]).get("name");
          var home2 = getObj('graphic', state.Gnomeball.field["HomeLineUp1"]).get("name");
          var home3 = getObj('graphic', state.Gnomeball.field["HomeLineUp2"]).get("name");
          var home4 = getObj('graphic', state.Gnomeball.field["HomeLineUp3"]).get("name");
          
          var away1 = getObj('graphic', state.Gnomeball.field["AwayLineUp0"]).get("name");
          var away2 = getObj('graphic', state.Gnomeball.field["AwayLineUp1"]).get("name");
          var away3 = getObj('graphic', state.Gnomeball.field["AwayLineUp2"]).get("name");
          var away4 = getObj('graphic', state.Gnomeball.field["AwayLineUp3"]).get("name");

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
 
      }

       on("change:attribute", function(obj, prev) {
            if(obj.get("name") == "team_name") {
                 updateOtherTeam();
            }
        });

    on("ready",()=>{
        checkInstall();
    });

    return {
        setUpGame: setUpGame,
        getTeamsAndPlayers: getTeamsAndPlayers,
       
    };

})();