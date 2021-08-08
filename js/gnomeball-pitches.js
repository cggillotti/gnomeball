// Github:   https://github.com/shdwjk/Roll20API/blob/master/Base64/Base64.js
// By:       The Aaron, Arcane Scriptomancer
// Contact:  https://app.roll20.net/users/104025/the-aaron
// modified from:  http://www.webtoolkit.info/

const GnomePitches = (() => { // eslint-disable-line no-unused-vars
    const version = '0.3.2';
    
    
   
    const teams = {    
"Eladrins" : {
    "city":"MeddleMetal",
    "team":"Eladrins",
    "mascot":"Shanky the Hot Rivet",
    "players": [
        {"name":"Pretzels Getzien","type":"scrapper"},
        {"name":"Pud Galvin","type":"hurler"},
        {"name":"Pop Schriver","type":"scrapper"},
        {"name":"Dude Esterbrook","type":"fattie"}
    ]
},
"Sandsnappers":{
    "city":"Trifond's Folly",
    "team":"Sandsnappers",
    "mascot":"Balru the Desert Dragon",
    "players": [

            {"name":"Malachi Kittridge","type":"hurler"},
            {"name":"Dick Buckley","type":"fattie"},
            {"name":"Chippy McGarr","type":"scrapper"},
            {"name":"Rasty Wright","type":"scrapper"}
    ]
},
"Thunderstrikes":{
    "city":"Ironweld",
    "team":"Thunderstrikes",
    "mascot":"Peeny the Hammer",
    "players": [

        {"name":"Foghorn Bradley","type":"fattie"},
        {"name":"Tricky Nichols","type":"hurler"},
        {"name":"Flip Lafferty","type":"fattie"},
        {"name":"Redleg Snyder","type":"fattie"}
    ]
},
"Sabatons":{
    "city":"AHTOP",
    "team":"Sabatons",
    "mascot":"Heelo the Gold Shoe",
    "players": [

        {"name":"Lady Baldwin","type":"fattie"},
        {"name":"Adonis Terry","type":"fattie"},
        {"name":"Jake Virtue","type":"hurler"},
        {"name":"Peek-A-Boo Veach","type":"scrapper"}
    ]
},
"Noodlers":{
    "city":"Tritown Area",
    "team":"Noodlers",
    "mascot":"Muckmouth",
    "players": [

        {"name":"Darby O’Brien","type":"fattie"},
        {"name":"Jack Glasscock","type":"fattie"},
        {"name":"Bug Holliday","type":"scrapper"},
        {"name":"Oyster Burns","type":"hurler"}
    ]
},
"Stevedores":{
    "city":"Blacksilt",
    "team":"Stevedores",
    "mascot":"Karn the Sailer",
    "players": [
        {"name":"Pop Corkhill","type":"fattie"},
        {"name":"Shorty Howe","type":"scrapper"},
        {"name":"Ducky Hemp","type":"scrapper"},
        {"name":"Dad Lytle","type":"hurler"}
    ]
},
"Twins":{
    "city":"Allafonessa",
    "team":"Twins",
    "mascot":"Pwoul and Twoul",
    "players": [
        {"name":"Old Hoss Radbourn","type":"hurler"},
        {"name":"Crazy Schmidt","type":"scrapper"},
        {"name":"Toad Ramsey","type":"fattie"},
        {"name":"Phenomenal Smith","type":"fattie"}
    ]
},
"Crabs":{
    "city":"Bask's Isle",
    "team":"Crabs",
    "mascot":"One Big Crab",
    "players": [
        {"name":"Doggie Miller","type":"hurler"},
        {"name":"Tun Berger","type":"scrapper"},
        {"name":"Lip Pike","type":"scrapper"},
        {"name":"Joe Blong","type":"scrapper"}
    ]
}
};


    const playbook = {
    "fastball": {
        "name":"Fastball",
        
        1: {
            "dice1num" : 4,
            "dice1type" : 6,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           2: {
            "dice1num" : 5,
            "dice1type" : 6,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           3: {
            "dice1num" : 6,
            "dice1type" : 6,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           4: {
            "dice1num" : 7,
            "dice1type" : 6,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           5: {
            "dice1num" : 8,
            "dice1type" : 6,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           6: {
            "dice1num" : 9,
            "dice1type" : 6,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        }
    },
    
    "sinker" : {
        "name":"Sinker",
        1: {
            "dice1num" : 6,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           2: {
            "dice1num" : 7,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           3: {
            "dice1num" : 8,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           4: {
            "dice1num" : 9,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           5: {
            "dice1num" : 10,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           6: {
            "dice1num" : 11,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        }
    },
    
    "knuckleball" : {
        "name":"Knuckler",
        1: {
            "dice1num" : 1,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : -15,
        },
           2: {
            "dice1num" : 1,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : -11,
        },
           3: {
            "dice1num" : 1,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : -7,
        },
           4: {
            "dice1num" : 0,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : -3,
        },
           5: {
            "dice1num" : 1,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 1,
        },
           6: {
            "dice1num" : 1,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 5,
       }
    },
    
    "changeup" : {
        "name":"Change Up",
        1: {
            "dice1num" : 3,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           2: {
            "dice1num" : 4,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           3: {
            "dice1num" : 5,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           4: {
            "dice1num" : 6,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           5: {
            "dice1num" : 7,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           6: {
            "dice1num" : 8,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        }
    },
    
    "splitter" : {
        "name":"Splitter",
        1: {
            "dice1num" : 2,
            "dice1type" : 20,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           2: {
            "dice1num" : 2,
            "dice1type" : 20,
            "dice2num" : 1,
            "dice2type" : 2,
            "bonus" : 0,
        },
           3: {
            "dice1num" : 2,
            "dice1type" : 20,
            "dice2num" : 2,
            "dice2type" : 2,
            "bonus" : 0,
        },
           4: {
            "dice1num" : 2,
            "dice1type" : 20,
            "dice2num" : 3,
            "dice2type" : 2,
            "bonus" : 0,
        },
           5: {
            "dice1num" : 2,
            "dice1type" : 20,
            "dice2num" : 4,
            "dice2type" : 2,
            "bonus" : 0,
        },
           6: {
            "dice1num" : 2,
            "dice1type" : 20,
            "dice2num" : 5,
            "dice2type" : 2,
            "bonus" : 0,
        }
    },
    
    "curveball": {
        "name":"Curveball",
        1: {
            "dice1num" : 3,
            "dice1type" : 10,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           2: {
            "dice1num" : 3,
            "dice1type" : 10,
            "dice2num" : 1,
            "dice2type" : 5,
            "bonus" : 0,
        },
           3: {
            "dice1num" : 3,
            "dice1type" : 10,
            "dice2num" : 2,
            "dice2type" : 6,
            "bonus" : 0,
        },
           4: {
            "dice1num" : 3,
            "dice1type" : 10,
            "dice2num" : 3,
            "dice2type" : 6,
            "bonus" : 0,
        },
           5: {
            "dice1num" : 3,
            "dice1type" : 10,
            "dice2num" : 4,
            "dice2type" : 6,
            "bonus" : 0,
        },
           6: {
            "dice1num" : 3,
            "dice1type" : 10,
            "dice2num" : 5,
            "dice2type" : 6,
            "bonus" : 0,
        }
    },
    
    "screwball" : {
        "name":"Screwball",
        1: {
            "dice1num" : 1,
            "dice1type" : 20,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           2: {
            "dice1num" : 1,
            "dice1type" : 20,
            "dice2num" : 1,
            "dice2type" : 10,
            "bonus" : 0,
        },
           3: {
            "dice1num" : 1,
            "dice1type" : 20,
            "dice2num" : 2,
            "dice2type" : 10,
            "bonus" : 0,
        },
           4: {
            "dice1num" : 1,
            "dice1type" : 20,
            "dice2num" : 3,
            "dice2type" : 10,
            "bonus" : 0,
        },
           5: {
            "dice1num" : 1,
            "dice1type" : 20,
            "dice2num" : 4,
            "dice2type" : 10,
            "bonus" : 0,
        },
           6: {
            "dice1num" : 1,
            "dice1type" : 20,
            "dice2num" : 5,
            "dice2type" : 10,
            "bonus" : 0,
        }
    },
    
    "spitball" : {
        "name":"Fastball",
        1: {
            "dice1num" : 3,
            "dice1type" : 10,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           2: {
            "dice1num" : 4,
            "dice1type" : 10,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           3: {
            "dice1num" : 5,
            "dice1type" : 10,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           4: {
            "dice1num" : 6,
            "dice1type" : 10,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           5: {
            "dice1num" : 7,
            "dice1type" : 10,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           6: {
            "dice1num" : 8,
            "dice1type" : 10,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        }
    },
    
    "eephus" : {
        "name":"Eephus",
        1: {
            "dice1num" : 1,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : -50,
        },
           2: {
           "dice1num" : 1,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : -49,
        },
           3: {
             "dice1num" : 1,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : -48,
        },
           4: {
            "dice1num" : 1,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : -47,
        },
           5: {
            "dice1num" : 1,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : -46,
        },
           6: {
            "dice1num" : 1,
            "dice1type" : 100,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : -45,
        }
    },
    
    "meatpitch" : {
        "name":"Meat Pitch",
        1: {
            "dice1num" : 3,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           2: {
            "dice1num" : 4,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           3: {
            "dice1num" : 5,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           4: {
            "dice1num" : 6,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           5: {
            "dice1num" : 7,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        },
           6: {
            "dice1num" : 8,
            "dice1type" : 4,
            "dice2num" : 0,
            "dice2type" : 0,
            "bonus" : 0,
        }
    }
    };

    const checkInstall = () => {
        log('-=> Gnome Pitch v'+version+'<=- ');
    };


    on("ready",()=>{
        checkInstall();
    });

    return {
        playbook: playbook,
        teams: teams
    };

})();

