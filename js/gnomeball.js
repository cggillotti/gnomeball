        
        
        
        let playbook = "";
   
      
        function startGame() {
           
              if(state.Gnomeball.inProgress === true) {
                  sendChat('The Fates',`Is there a game in progress already?`);
              }
              
              state.Gnomeball.currentGame = {
                  'homeTeam': { 
                      'name':'',
                      'players': [],
                      'atBat': 0,
                  },
                  'awayTeam': { 
                      'name': '',
                      'players': [],
                       'atBat': 0,
                   },
                  'currentInning':1,
                  'outs':0,
                  'score': {
                      'home':0,
                      'away':0
                  },
                  'lastPitch': {
                      'type': 'type',
                      'result': 0,
                      'hit': false
                      
                  },
                  'atBat': {
                          'pitchtype': 'type',
                          'pitchroll': 'roll',
                          'pitcher':'',
                          'batter':'',
                          'battertype':'',
                          'fielder':'',
                          'pitchresults': 0,
                          'contactroll': 'roll',
                          'contactresult': 0,
                          'out': 'type', //strikeout, field, double triple
                          'hit': false,
                          'powerroll': 'roll',
                          'powerresult': 0,
                          'fieldingroll': 'roll',
                          'fieldingresult': 0,
                          'runsScored': 0,
                          'fieldingplay': 'type'
                  },
                  'innings': {
                      1: {
                          atBats: [],
                          totalRuns:0
                      },
                       2: {
                          atBats: [],
                          totalRuns:0
                      },
                       3: {
                          atBats: [],
                          totalRuns:0
                      },
                      4: {
                          atBats: [],
                          totalRuns:0
                      },
                      5: {
                          atBats: [],
                          totalRuns:0
                      },
                      6:{
                          atBats: [],
                          totalRuns:0
                      }
                  }
              };
              
              GnomeBoard.getTeamsAndPlayers();
              state.Gnomeball.currentGame.atBat.batter =  state.Gnomeball.currentGame.awayTeam.players[0];
              sendChat('Announcer',`What a day for gnomeball! We're about to start with ${state.Gnomeball.currentGame.homeTeam.name} hosting ${state.Gnomeball.currentGame.awayTeam.name}.`);
              
              GnomeUtility.updateAura(state.Gnomeball.field['AwayLineUp0'], true);
              
              sendChat('Announcer',`First at bat ${state.Gnomeball.currentGame.awayTeam.players[0]}`);
              GnomeUtility.updateText(state.Gnomeball.field['atbat'] , 'Now Batting: '+ state.Gnomeball.currentGame.awayTeam.players[0]);           
              state.Gnomeball.currentGame.phase = 'Pitch';
              GnomeUtility.updateText(state.Gnomeball.field['phase'],"Batter's Up!");
              GnomeAudio.inning();
          }
          
          function getPitchBonus(pitchData) {
              log("PB");
              log(state.Gnomeball.currentGame.lastPitch);
              if(pitchData.name === "Change Up"
                  && (state.Gnomeball.currentGame.lastPitch.type === "Fastball" || state.Gnomeball.currentGame.lastPitch.type === "Sinker")) {
                  sendChat('Announcer',`This guy's got multiple tools, you gotta be careful.`);
                  return Math.floor(state.Gnomeball.currentGame.lastPitch.result/2);
              }
              
              return 0;
          }
          
          function getKnuckleballPenalty() {
           return 0;
          }
          
           function checkSpitBall() {
               //1d4 AC 4 check, fail on 1-3
            return 0;
              
          }
          
          function getEephusPenalty() {
       
              if(state.Gnomeball.currentGame.atBat.battertype === "Fattie")
              {
                  return "1d6";
              }else if (state.Gnomeball.currentGame.atBat.battertype === "Scrapper") {
                  return "1d4";
              }else if (state.Gnomeball.currentGame.atBat.battertype === "Hurler"){
                  return "1d2";
              }
          }
          
          function getMeatPitchPenalty() {
              if(state.Gnomeball.currentGame.atBat.battertype === "Fattie")
              {
                  return "1d6";
              }else if (state.Gnomeball.currentGame.atBat.battertype === "Scrapper") {
                  return "1d4";
              }else if (state.Gnomeball.currentGame.atBat.battertype === "Hurler"){
                  return "1d2";
              }
          }
  
          function sendRollFromPitch(gnomeinfo, pitchData, level) {
              
              var roll = '';
              var pitch = pitchData[level];
              let gameBonus = getPitchBonus(pitchData);
              
              if(pitch.dice1num + pitch.dice1type > 0) {
                  roll += pitch.dice1num+"d"+pitch.dice1type;
              }
              
              if(pitch.dice2num + pitch.dice2type > 0) {
                   roll += " + " + pitch.dice2num +"d"+ pitch.dice2type;
              }
              
              if(pitch.bonus !== 0)
              {
                  roll += " + " + pitch.bonus;
              }
              
              if(gameBonus !== 0)
              {
                  roll += " + " + gameBonus;
              }
                  
                  sendChat('The Fates', "Rolling [["+ roll +"]]", function(ops) {
                      var pitchNumber = ops[0].inlinerolls[0].results.total;
                      var rollstring = "";
                      GnomeUtility.displayRollFormation(ops[0].inlinerolls[0].results);
                      
                      if(state.Gnomeball.currentGame.phase === "Pitch" )
                      {
                          
                          state.Gnomeball.currentGame.atBat.pitchtype = pitch.name;
                          state.Gnomeball.currentGame.atBat.pitcher = "PitcherName";
                          state.Gnomeball.currentGame.atBat.pitchroll = roll;
                          state.Gnomeball.currentGame.atBat.pitchresults = pitchNumber;
                          state.Gnomeball.currentGame.atBat.pitchtype = pitch.name;
                          state.Gnomeball.currentGame.phase = "Bat";
                          state.Gnomeball.currentGame.lastPitch.type = pitchData.name;
                          state.Gnomeball.currentGame.lastPitch.result = pitchNumber;
  
                          GnomeUtility.updateText(state.Gnomeball.field['phase'],"Batter's Up!");
  
                          if(pitchNumber > 25) {
                              sendChat('The Fates',`Incredible toss, pitch at ${pitchNumber} (${roll})`);
                         }else if (pitchNumber > 20) {
                              sendChat('The Fates',`Wooeee what a pitch at ${pitchNumber} (${roll})`);
                         }else if (pitchNumber > 12) {
                              sendChat('The Fates',`Nice little pitch at ${pitchNumber} (${roll})`);
                         }else if (pitchNumber < 5) {
                              sendChat('The Fates',`Yuck, garbage throw at ${pitchNumber} (${roll})`);
                         }else {
                              sendChat('The Fates',`The pitch comes in at ${pitchNumber} (${roll})`);
                         }
                          
                      } else {
                          sendChat('The Fates',`Warmup pitch comes in at ${pitchNumber} (${roll})`);
                      }
                       
              });
          
          }   
  
          function sendRollFromPower(gnomeinfo, power ) {
              
              var roll = power;
  
                  log(roll);  
                  sendChat('The Fates', "Rolling [["+ roll +"]]", function(ops) {
                      var powerNumber = ops[0].inlinerolls[0].results.total;
                      var rollstring = "";
                      GnomeUtility.displayRollFormation(ops[0].inlinerolls[0].results);
                      
                      if(state.Gnomeball.currentGame.phase === "Power" )
                      {
                          log("Field phase");
  
                          state.Gnomeball.currentGame.atBat.powerroll = roll;
                          state.Gnomeball.currentGame.atBat.powerresult = powerNumber;
                          sendChat('The Fates',`Let's see how far it'll go! (${powerNumber})`);
                          state.Gnomeball.currentGame.phase = "Field"
                       
                           GnomeUtility.updateText(state.Gnomeball.field['phase'],"Play's in the field!");
  
                          
                      } else {
                          sendChat('The Fates',`Warmup swing comes in at ${powerNumber} (${roll})`);
                      }
       
                       
              });
          
          }   
          
        
          function sendRollFromField(gnomeinfo, fielding, play) {
              
              var roll = fielding;
  
                  sendChat('The Fates', "Rolling [["+ roll +"]]", function(ops) {
                      var fieldingNumber = ops[0].inlinerolls[0].results.total;
                      var rollstring = "";
                      var isHomeInning = (state.Gnomeball.currentGame.currentInning % 2 === 0);
                      var penatlyRuns = 0;
                      GnomeUtility.displayRollFormation(ops[0].inlinerolls[0].results);
                      if(state.Gnomeball.currentGame.phase === "Field" )
                      {
                          log("Field phase");
  
                          state.Gnomeball.currentGame.atBat.fieldingroll = roll;
                          state.Gnomeball.currentGame.atBat.fieldingresult = fieldingNumber;
                          switch(state.Gnomeball.currentGame.lastPitch.type) {
                                  
                                  case "Knuckleball":
                                       penatlyRuns = getKnuckleballPenalty();
                                  break;
                                  
                                  case "MeatPitch":
                                       penatlyRuns = getMeatPitchPenalty();
                                  break;
                                  
                                   case "Eephus":
                                       penatlyRuns = getEephusPenalty();
                                  break;
                                  
                                  default:
                                  
                          }
  
                          if(penatlyRuns > 0 || fieldingNumber < state.Gnomeball.currentGame.atBat.powerresult) {
                              log("Runs phase");
                              let runsScored = state.Gnomeball.currentGame.atBat.powerresult - fieldingNumber;
                              let boardInning = GnomeUtility.convertInningToBoard(state.Gnomeball.currentGame.currentInning);
                              state.Gnomeball.currentGame.innings[state.Gnomeball.currentGame.currentInning].totalRuns += runsScored;
                              state.Gnomeball.currentGame.atBat.runsScored += runsScored;
                              sendChat('Announcer',`That's good enough for some runs! They bring in ${runsScored} (${state.Gnomeball.currentGame.atBat.powerresult} power vs ${fieldingNumber} in the field )`);
                              
                              if(isHomeInning){
                                  //Home
                                  state.Gnomeball.currentGame.score.home += runsScored;
                                  
                              
                                  //halve 1 for inning structure
                                  log('inning'+state.Gnomeball.currentGame.currentInning +'Home');
                                  log("Field"+ state.Gnomeball.field['Inning'+boardInning +'Home']);
                                  
                                 
                                  GnomeUtility.updateText(state.Gnomeball.field['Inning' + boardInning +'Home'], state.Gnomeball.currentGame.innings[state.Gnomeball.currentGame.currentInning].totalRuns);
                                  GnomeUtility.updateText(state.Gnomeball.field['TotalHome'], state.Gnomeball.currentGame.score.home );
                                  
                              } else {
                                  //Away
                                  state.Gnomeball.currentGame.score.away += runsScored;
                                  
                                  log('inning'+state.Gnomeball.currentGame.currentInning +'Away');
                                  log("Field"+ state.Gnomeball.field['Inning'+boardInning +'Away']);
                                  
                                  
                                 GnomeUtility.updateText( state.Gnomeball.field['Inning'+boardInning +'Away'], state.Gnomeball.currentGame.innings[state.Gnomeball.currentGame.currentInning].totalRuns);
                                  log(state.Gnomeball.field['TotalAway']);
                                  GnomeUtility.updateText( state.Gnomeball.field['TotalAway'], state.Gnomeball.currentGame.score.away);
  
                              }
                              
                              log(state.Gnomeball.currentGame);
                              log("Pitch phase");
                              state.Gnomeball.currentGame.phase = "Pitch"
                              GnomeUtility.updateText(state.Gnomeball.field['phase'],"It's on the mound");
                              nextBatter();
  
                          } else {
                              log("Out phase");
                          
                              if(play === "Double") {
                                  sendChat('Announcer',`Turning two! (${fieldingNumber})`);
                                  state.Gnomeball.currentGame.atBat.out = "Fieldout";
                                  state.Gnomeball.currentGame.outs += 2;
  
                              } else  if(play === "Triple") {
                                  sendChat('Announcer',`Can you believe it!? Triple play! (${fieldingNumber})`);
                                  state.Gnomeball.currentGame.atBat.out = "Fieldout";
                                  state.Gnomeball.currentGame.outs += 3;
  
                              } else {
                                  state.Gnomeball.currentGame.atBat.out = "Fieldout";
                                  state.Gnomeball.currentGame.outs++;
                                  sendChat('Announcer',`Got'm! ${state.Gnomeball.currentGame.atBat.batter} didn't bring any home`);
      
                              }
  
                              if(state.Gnomeball.currentGame.outs >= 3) {
                                  log("End of inning phase");
                                  if(isHomeInning) {
                                     sendChat('Announcer',`And that's the inning!`); 
                                  } else {
                                      sendChat('Announcer',`And that's all 3. And we're clearing decks for our hometown boys to get to work.`);
                                  }
                                  
                                  endInning();
                              } else {
                                  
                                  GnomeUtility.updateText(state.Gnomeball.field["Outs"], state.Gnomeball.currentGame.outs);
                                  sendChat('Announcer',`${state.Gnomeball.currentGame.outs} outs put away`);
                                  nextBatter();
                                  state.Gnomeball.currentGame.phase = "Pitch"
                                  GnomeUtility.updateText(state.Gnomeball.field['phase'],"Ready for that pitch");
  
                              }
                          }
                          
                      } else {
                          sendChat('The Fates',`Throwing around thebases for ${fieldingNumber} (${roll})`);
                      }
  
              });
          
          }   
  
          function nextBatter() {
  
              state.Gnomeball.currentGame.innings[state.Gnomeball.currentGame.currentInning].atBats.push(state.Gnomeball.currentGame.atBat);
              let next ="next batter";
              log(state.Gnomeball.currentGame.currentInning);
  
              if(state.Gnomeball.currentGame.currentInning % 2 === 0) {
                  GnomeUtility.updateAura(state.Gnomeball.field["HomeLineUp"+state.Gnomeball.currentGame.homeTeam.atBat],false);
                  state.Gnomeball.currentGame.homeTeam.atBat = state.Gnomeball.currentGame.homeTeam.atBat < 3 ? ++state.Gnomeball.currentGame.homeTeam.atBat : 0;
                  next = state.Gnomeball.currentGame.homeTeam.players[state.Gnomeball.currentGame.homeTeam.atBat];
                  GnomeUtility.updateAura(state.Gnomeball.field["HomeLineUp"+state.Gnomeball.currentGame.homeTeam.atBat],true);
              } else {
                log(state.Gnomeball.currentGame.awayTeam.atBat+"!!!");
                GnomeUtility.updateAura(state.Gnomeball.field["AwayLineUp"+state.Gnomeball.currentGame.awayTeam.atBat],false);
                state.Gnomeball.currentGame.awayTeam.atBat = state.Gnomeball.currentGame.awayTeam.atBat < 3 ? ++state.Gnomeball.currentGame.awayTeam.atBat : 0;
                 next =  state.Gnomeball.currentGame.awayTeam.players[state.Gnomeball.currentGame.homeTeam.atBat];
                 GnomeUtility.updateAura(state.Gnomeball.field["AwayLineUp"+state.Gnomeball.currentGame.awayTeam.atBat],true);
  
                 
              }
              GnomeUtility.updateText(state.Gnomeball.field['atbat'], 'Now Batting: '+ next);
  
              state.Gnomeball.currentGame.atBat = {
                      'pitchtype': 'type',
                      'pitchroll': 'roll',
                      'pitcher':'',
                      'batter':next,
                      'fielder':'',
                      'pitchresults': 0,
                      'contactroll': 'roll',
                      'contactresult': 0,
                      'out': 'type', //strikeout, field, double triple
                      'hit': false,
                      'powerroll': 'roll',
                      'powerresult': 0,
                      'fieldingroll': 'roll',
                      'fieldingresult': 0,
                      'runsScored': 0,
                      'fieldingplay': 'type'
              }
          }
  
          function endInning() {
              log(state.Gnomeball.currentGame.currentInning);
              let leadoff = "";
              state.Gnomeball.currentGame.innings[state.Gnomeball.currentGame.currentInning].atBats.push(state.Gnomeball.currentGame.atBat);
              state.Gnomeball.currentGame.currentInning++;
              if(state.Gnomeball.currentGame.currentInning > 6 ) {
                  sendChat('Announcer', "And that's the Game!");
                  state.Gnomeball.currentGame.phase = "It's Over!";
              } else {
                  
                  if(state.Gnomeball.currentGame.currentInning % 2 === 0) {
                     GnomeUtility.updateAura(state.Gnomeball.field["AwayLineUp"+state.Gnomeball.currentGame.awayTeam.atBat],false);
                     state.Gnomeball.currentGame.awayTeam.atBat = state.Gnomeball.currentGame.awayTeam.atBat < 3 ? ++state.Gnomeball.currentGame.awayTeam.atBat : 0;
                      leadoff = state.Gnomeball.currentGame.homeTeam.players[state.Gnomeball.currentGame.homeTeam.atBat];
                      GnomeUtility.updateAura(state.Gnomeball.field["HomeLineUp"+state.Gnomeball.currentGame.homeTeam.atBat],true);
                      
                  } else {
                       GnomeUtility.updateAura(state.Gnomeball.field["HomeLineUp"+state.Gnomeball.currentGame.awayTeam.atBat],false);
                       state.Gnomeball.currentGame.homeTeam.atBat = state.Gnomeball.currentGame.homeTeam.atBat < 3 ? ++state.Gnomeball.currentGame.homeTeam.atBat : 0;
                       leadoff =  state.Gnomeball.currentGame.awayTeam.players[state.Gnomeball.currentGame.awayTeam.atBat];
                       GnomeUtility.updateAura(state.Gnomeball.field["AwayLineUp"+state.Gnomeball.currentGame.awayTeam.atBat],true);
                  }
                   
                  GnomeUtility.updateText(state.Gnomeball.field['atbat'], 'Now Batting: '+ leadoff);
                  state.Gnomeball.currentGame.phase = "Pitch"
                  GnomeUtility.updateText(state.Gnomeball.field['phase'],"Pitcher's move.");
                  GnomeUtility.updateText(state.Gnomeball.field["Outs"], "0");
                  state.Gnomeball.currentGame.outs = 0;
              
                  state.Gnomeball.currentGame.atBat = {
                          'pitchtype': 'type',
                          'pitchroll': 'roll',
                          'pitcher':'',
                          'batter':leadoff,
                          'battertype':'',
                          'fielder':'',
                          'pitchresults': 0,
                          'contactroll': 'roll',
                          'contactresult': 0,
                          'out': 'type', //strikeout, field, double triple
                          'hit': false,
                          'powerroll': 'roll',
                          'powerresult': 0,
                          'fieldingroll': 'roll',
                          'fieldingresult': 0,
                          'runsScored': 0,
                          'fieldingplay': 'type'
                  };
                  log(state.Gnomeball);
                  GnomeAudio.inning();
              }
  
          }
          
     
      on("ready", function() {
          playbook = GnomePitches.playbook;
          log(playbook);
          
          
      });
      
    
       on("chat:message", function(msg) {
           log(msg);
           
          if (msg.type != 'api' && !playerIsGM(msg.playerid)) return;
      
             if( ! state.Gnomeball ) {
                  state.Gnomeball = {
                      version: 1.0,
                      config: {
                          color1: '#ff0000',
                          color2: '#0000ff'
                      },
                      pastGames: [],
                      currentGame: null,
                  };
              }
        
               // Split the message into command and argument(s)
              let args = msg.content.split(' ');
              let command = args.shift();
  
              if(!command.indexOf("!g") < 0)
                  return;
           
              if(command == "!gstate")
              {
                  
                  log(state.Gnomeball);
                  log(state.Gnomeball.field);
                  
              
                  
              } else if(command == "!gstart")
              {
                  startGame();
              } else if(command == "!gsetup")
              {
                   let extracommand = args.shift();
                   if(extracommand) {
                        GnomeBoard.setUpGame(extracommand);
                   } else {
                       GnomeBoard.setUpGame();
                   }
                 
              }  else if(command == "!gsetteam")
              {
                  GnomeBord.setUpTeam();
                 
              }else {
                   let gnomeinfo = args.shift();
                   log(gnomeinfo);
                   //log(Base64.decode(gnomeinfo));
                   
      
                  if(command == "!gpitch")
                  {
                      let extracommand = args.shift();
                      let commandlevel = args.shift();
                      log("Pitch:"+playbook[extracommand.toLowerCase()]+" "+commandlevel )
                      if(extracommand && playbook[extracommand.toLowerCase()] != null) {
                          sendRollFromPitch(gnomeinfo, playbook[extracommand.toLowerCase()], commandlevel);
                      }
                      
                  } else if(command == "!gbat")
                  {
                      let rollstring = msg.content.replace(command + " "+ gnomeinfo+" ","");
                      GnomeUtility.sendRollFromBat(gnomeinfo, rollstring);
                  } else if(command == "!gfield")
                  {
                      let rollstring = msg.content.replace(command + " "+ gnomeinfo+" ","");
                      let split = rollstring.split(' ');
                      let play = "";
                      if(split.length > 1) {
                          play = split[1];
                      }
                      
                      log("Get play:" + split[0] + " "+ play);
                      
                      sendRollFromField(gnomeinfo,split[0],play);
                  } else if(command == "!gpower")
                  {
                      let rollstring = msg.content.replace(command + " "+ gnomeinfo+" ","");
                      sendRollFromPower(gnomeinfo,rollstring);   
                  } 
               }
                  
      });
      
      
      // match logic:
      
      // Inning starts, visitor bats 
      
      //Pitcher selects pitch
      //rolls value
      //Adds bonus if change up 
      //Batter rolls contact
      //if contact < pitch 
      // out increments
      // atbat index increases
      // else 
      // roll power
      // add any bonuse
      // roll fielding
      // add bonuses
      // if power > fielding 
      // score runs power - fielding
      // atbat index increases
      // store last pitch
      // else
      // record out
      // atbat index increases
      // if 3 outs inning is over
      // else increase currentInning
      //if inning == 6 and score.home > score.away
      // or inning  == 7
      //end game
      // else switch sites loop atbats. 
      
      
      
      // const match = {
      //     'homeTeam': { 
      //         'name':'',
      //        'players': [],
      //         'atBat': 0,
      //     },
      //     'awayTeam': { 
      //         'name': '',
      //         'players': [],
      //          'atBat': 0,
      //      },
      //     'currentInning':1,
      //     'outs':0,
      //     'score': {
      //         'home':0,
      //         'away':0
      //     }
      //     'lastpitch': {
      //         'inning':0,
      //         'type': 'type',
      //         'result': 0
      //     },
      //     'innings': [
      //         1: {
      //             'atbats': [
      //                 {
      //                     'pitchtype': 'type',
      //                     'pitchroll': 'roll',
      //                     'pitcher':'',
      //                     'batter':'',
      //                     'fielder':'',
      //                     'pitchresults': 0,
      //                     'contactroll': 'roll',
      //                     'contactresult': 0,
      //                     'out': 'type', //strikeout, field, double triple
      //                     'hit': 'true',
      //                     'powerroll': 'roll',
      //                     'powerresult': 0,
      //                     'fieldingroll': 'roll',
      //                     'fieldingresult': 0,
      //                     'runsscored': 0,
      //                     'fieldingplay': 'type'
                          
      //                 }
      //             ]
      //         },
      
      //     ]
      // }