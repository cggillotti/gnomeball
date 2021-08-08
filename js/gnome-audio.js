// Github:   https://github.com/shdwjk/Roll20API/blob/master/Base64/Base64.js
// By:       The Aaron, Arcane Scriptomancer
// Contact:  https://app.roll20.net/users/104025/the-aaron
// modified from:  http://www.webtoolkit.info/

const GnomeAudio = (() => { // eslint-disable-line no-unused-vars
    const version = '0.3.2';
    


const sounds = {
    hit:"-MeIL2EjsV2DfZQylDUa",
    fun1:"-MfKJIB5z3c422O9yDXn",
    fun2:"-MfKJHVTsZ_IhHv006Dn",
    letsgo:"-MfKJHogDLWExLa3M2iW",
    rag:"-MfKJIYYjvlvaCXNRCGc",
    charge:"-MfKJIrcwCWXR6tcsZ80",
    caught:"-MfKJbShFofuK-oVug_2"
}


function play(id) {
       getObj('jukeboxtrack', id).set({
                playing: true,
                softstop: false
            });
}

function hit() {
   getObj('jukeboxtrack', sounds.hit).set({
                playing: true,
                softstop: false
            });
}

function caught() {
        play(sounds.caught);
}

function inning() {
    log("Inning:");
    var rando =  Math.floor(Math.random() * 5);
    log("->"+ rando);
    
    switch(rando) {
        
        case 0:
            play(sounds.fun2);
        break;
        
        case 1:
            play(sounds.fun1);
        break;
        
        case 2:
            play(sounds.letsgo);
        break;
        
        case 3:
            play(sounds.rag);
        break;
        
        case 4:
            play(sounds.charge);
        break;
        
    }
    
}



 const checkInstall = () => {
        log('-=> Gnome Audio v'+version+'<=- ');
    };

    on("ready",()=>{
        checkInstall();
    });

    return {
        hit: hit,
        inning: inning,
        caught: caught
    };

})();

