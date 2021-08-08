const GnomeUtility = (() => { // eslint-disable-line no-unused-vars
    const version = '1.0.0';
    
    
     const checkInstall = () => {
        log('-=> Gnome Utility v'+version+'<=- ');
    };


    function updateText(id, message) {
        log(id);
        log(message);
            var target = getObj('text', id.toString()).set('text',message.toString());
        }
        
   function updateAura(id, isOn) {
        if(isOn)
        {
          getObj('graphic', id).set({'aura1_color':'#00FF00', 'aura1_radius': 1.5});
        }else {
            getObj('graphic', id).set({'aura1_radius': ""}); 
        }
    }
    

  function convertInningToBoard(inning) {
            switch (inning) {
                case 1:
                case 2:
                    return 1;
                case 3:
                case 4:
                    return 2;
                case 5:
                case 6:
                    return 3;
            }
        }
        
        function displayRollFormation(results) {
            
            let sendString = "<div style='color:#767676;font-size:.8rem'>";
            results.rolls.filter(result => result.type === "R").forEach(die => {
                 sendString += `d${die.sides}s: `;
                 let averageRoll = ((die.sides + 1)/2) * die.results.length;
                 let instanceValues = 0;
                 
                die.results.forEach( dieResult => {
                    
                    instanceValues += dieResult.v;
                    
                    if(dieResult.v === die.sides) {
                         sendString += "<span style='color:#00ff00'>";
                    } else if (dieResult.v === 1 ) {
                        sendString += "<span style='color:#ff0000'>";
                    } else {
                        sendString += "<span>";
                    }
                    sendString += dieResult.v + " ";
                    sendString += "</span>";
                });
                
                 sendString += " ("
                if(instanceValues > averageRoll) {
                    sendString += `<span style="color:#00ff00">${instanceValues}</span>`;
                } else if (instanceValues < averageRoll) {
                    sendString += `<span style="color:#ff0000">${instanceValues}</span>`;
                }
                
                sendString += `/${averageRoll})<br>`;
            });
            log(sendString);
            if(results.rolls.filter(result => result.type === "M" && result.expr !== "+").length > 0) {
                 sendString += `<span style="color:#888888">`;
                  results.rolls.filter(result => result.type === "M" && result.expr !== "+").forEach(constant => {
                        log(constant);
                     sendString += ` ${constant.expr} `;
                     
                 });
                         
                 sendString += `</span>`;
            }
            
        
             log(sendString);
            sendString += "</div>";
            sendChat('The Fates Revealed', sendString);
        }

        function sendRollFromBat(gnomeinfo, contact) {
            
            var roll = contact;

                 sendChat('The Fates', "Rolling [["+ roll +"]]", function(ops) {
                    var batNumber = ops[0].inlinerolls[0].results.total;
                    var rollstring = "";
                     displayRollFormation(ops[0].inlinerolls[0].results);
                    if(state.Gnomeball.currentGame.phase === "Bat" )
                    {
                        log("Bat phase");

                        state.Gnomeball.currentGame.atBat.contactroll = roll;
                        state.Gnomeball.currentGame.atBat.contactresult = batNumber;

                        if(batNumber > state.Gnomeball.currentGame.atBat.pitchresults) {
                            log("Hit phase");
                            GnomeAudio.hit();
                            sendChat('Announcer',`It's a hit! ${state.Gnomeball.currentGame.atBat.batter} gets a piece of it! (${batNumber})`);
                            state.Gnomeball.currentGame.phase = "Power";
                            state.Gnomeball.currentGame.atBat.hit = true;
                            state.Gnomeball.currentGame.lastPitch.hit = true;
                            updateText(state.Gnomeball.field['phase'],"We have contact!");

                        } else {
                            log("Out phase");
                            state.Gnomeball.currentGame.atBat.out = "Strikeout";
                            state.Gnomeball.currentGame.outs++;
                            
                            sendChat('Announcer',`Strikeout! ${state.Gnomeball.currentGame.atBat.batter} just couldn't get a read on it (${batNumber})`);

                            if(state.Gnomeball.currentGame.outs >= 3) {
                                log("End of inning phase");
                                 sendChat('Announcer',`And that's the inning!`);
                                 endInning();
                                 
                            } else {
                                updateText(state.Gnomeball.field["Outs"], state.Gnomeball.currentGame.outs);
                                sendChat('Announcer',`${state.Gnomeball.currentGame.outs} outs put away`);
                   
                                nextBatter();
                                state.Gnomeball.currentGame.phase = "Pitch";
                                 updateText(state.Gnomeball.field['phase'],"Waiting for the Pitcher");
                            }
                        }
                        
                    } else {
                        sendChat('The Fates',`Warmup swing comes in at ${batNumber} (${roll})`);
                    }
                     
            });
        
        }   

    on("ready",()=>{
        checkInstall();
    });

    return {
        updateText:updateText,
        updateAura:updateAura,
        convertInningToBoard:convertInningToBoard,
        displayRollFormation:displayRollFormation,
        sendRollFromBat:sendRollFromBat
    };

})();
