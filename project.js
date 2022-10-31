//Init Flashphoner API on page load
function init_api() {
    Flashphoner.init({});
    //Connect to WCS server over websockets
    session = Flashphoner.createSession({
        urlServer: "wss://demo.flashphoner.com:8443" //specify the address of your WCS
    }).on(SESSION_STATUS.ESTABLISHED, function(session) {
        console.log("ESTABLISHED");
    });
 
    publishBtn.onclick = publishClick;
    playBtn.onclick = playClick;
    stopBtn.onclick = stopPublish;
}
 
//Detect browser
var Browser = {
    isSafari: function() {
        ;
    },
}

function publishClick() {
    if (Browser.isSafari()) {
        Flashphoner.playFirstVideo(document.getElementById("publish"), true, PRELOADER_URL).then(function() {
            publishStream();
        });
    } else {
        publishStream();
    }
}
 
function playClick() {
    if (Browser.isSafari()) {
        Flashphoner.playFirstVideo(document.getElementById("play"), true, PRELOADER_URL).then(function() {
            playStream();
        });
    } else {
        playStream();
    }
}
 
//Publish stream
function publishStream() {
    stream = session.createStream({
        name: "stream",
        display: document.getElementById("publish"),
    });
    stream.publish();
}
 
//Playing stream
function playStream() {
    session.createStream({
        name: "stream",
        display: document.getElementById("play"),
    }).play();
}
 
//Stopping stream
function stopPublish() {
    stream.stop();
}