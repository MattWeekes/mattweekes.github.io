var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
var startBtn = 0;
var int;
var timer;
var currentCount = 1;
var arrTS = []; // Time Signature sequence array
var arrBPM = []; // BPM sequence array
var arrBPMdisplay = []; //BPM arr for screen display
var arrNote = []; //save note selection for display
var x = 0; //parse the array index
var n = document.getElementById("bpm").value;
var setBPM = 60000/n;

function beep(duration, frequency, volume, type, callback) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    var duration = document.getElementById("setdur").value;
    var frequency = document.getElementById("setfreq").value;
    var volume = document.getElementById("setvol").value/100;
    var endCount = arrTS[x];

    //  DROP VOLUME FOR OFF BEATS
    if (currentCount > 1) {
        volume = volume/3;
    } else {
        volume = document.getElementById("setvol").value/100;
    }

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    
    if (frequency){oscillator.frequency.value = frequency;}
    if (type){oscillator.type = type;}
    if (callback){oscillator.onended = callback;}
    
    
    if (currentCount > endCount) {
        currentCount = 1;
        volume = document.getElementById("setvol").value/100;
        if (x == arrTS.length-1) {
            x = 0;
        } else {
            x++;
        }
        clearInterval(int);
        startBtn = 0;
        startMet();
    }
    if (volume){gainNode.gain.value = volume;};
    oscillator.start();
    setTimeout(function(){oscillator.stop()}, duration);
    liveSeq();
    currentCount++;
    document.getElementById("countdown").innerHTML = '';
};

function startMet() {
    var setBPM = 60000/arrBPM[x];
    if (startBtn === 0 && arrTS.length>0) {
        startBtn = 1;
        int = setInterval(beep, setBPM);
    };
};

function stop() {
    if (startBtn === 1) {
        clearInterval(int);
        clearInterval(timer);
        startBtn = 0;
        currentCount = 1;
        x = 0; //parse the array index
        document.getElementById("countdown").innerHTML = '';
        document.getElementById("currentBPMDisplay").innerHTML = '';
        document.getElementById("currentNoteDisplay").innerHTML = '';
        document.getElementById("currentAccDisplay").innerHTML = '';
        document.getElementById("nextBPMDisplay").innerHTML = '';
        document.getElementById("nextNoteDisplay").innerHTML = '';
        document.getElementById("nextAccDisplay").innerHTML = '';
    }
};
// clear settings
function cleared() {
    stop();
    arrTS = [];
    arrBPM = [];
    arrBPMdisplay = [];
    arrNote = [];
    displaySeq();
    document.getElementById("countdown").innerHTML = '';
    document.getElementById("currentBPMDisplay").innerHTML = '';
    document.getElementById("currentNoteDisplay").innerHTML = '';
    document.getElementById("currentAccDisplay").innerHTML = '';
    document.getElementById("nextBPMDisplay").innerHTML = '';
    document.getElementById("nextNoteDisplay").innerHTML = '';
    document.getElementById("nextAccDisplay").innerHTML = '';
};

function addSequence() {
    var beats = document.getElementById("beats").value;
    var bars = document.getElementById("bars").value;
    var n = document.getElementById("bpm").value;
    var note4 = document.querySelector('input[name="count"]:checked').value;
    while (bars>0) {
        if (note4 == '1/4') {
            arrBPM.push(n);
            arrBPMdisplay.push(n);
            arrNote.push('1/4');
        } else {
            arrBPM.push(n*2);
            arrBPMdisplay.push(n);
            arrNote.push('1/8');
        }
        arrTS.push(beats);
        bars--;
    }
    displaySeq();
};

function displaySeq() {
    document.getElementById('displayBPM').innerHTML = arrBPMdisplay.join(" | ");
    document.getElementById('displayNote').innerHTML = arrNote.join(" | ");
    document.getElementById('displayBeats').innerHTML = arrTS.join(" | ");
};

function countdown() {
    if (startBtn === 0 && arrTS.length>0) {
        startBtn = 1;
        var number = 5;
        timer = setInterval(function() {
        if (number > 1) {
            document.getElementById("countdown").innerHTML = number;
            number --;
        } else {
            document.getElementById("countdown").innerHTML = number;
            startBtn = 0;
            startMet();
            clearInterval(timer);
            number = 5;
        }
    }, 1000);
}}

function liveSeq() {
    document.getElementById("currentBPMDisplay").innerHTML = arrBPMdisplay[x];
    document.getElementById("currentNoteDisplay").innerHTML = arrNote[x];
    document.getElementById("currentAccDisplay").innerHTML = arrTS[x];
    document.getElementById("nextBPMDisplay").innerHTML = arrBPMdisplay[x+1];
    document.getElementById("nextNoteDisplay").innerHTML = arrNote[x+1];
    document.getElementById("nextAccDisplay").innerHTML = arrTS[x+1];

    if (arrBPM[x+1] == undefined) {
        document.getElementById("nextBPMDisplay").innerHTML = arrBPMdisplay[0];
        document.getElementById("nextNoteDisplay").innerHTML = arrNote[0];
        document.getElementById("nextAccDisplay").innerHTML = arrTS[0];
    };
}

document.getElementById('instructions').addEventListener('click', function(){
    var show = document.getElementById("hidden");

    if (show.style.display === "block") {
        show.style.display = "none";
    } else {
        show.style.display = "block";
    };
})