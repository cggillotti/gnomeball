// Github:   https://github.com/shdwjk/Roll20API/blob/master/Base64/Base64.js
// By:       The Aaron, Arcane Scriptomancer
// Contact:  https://app.roll20.net/users/104025/the-aaron
// modified from:  http://www.webtoolkit.info/

const GnomePitches = (() => { // eslint-disable-line no-unused-vars
    const version = '0.3.2';

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
    }
    };

    const checkInstall = () => {
        log('-=> Gnome Pitch v'+version+'<=- ');
    };


    on("ready",()=>{
        checkInstall();
    });

    return {
        playbook: playbook
    };

})();

