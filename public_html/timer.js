var userTime = '';
var interval;
var quoteArray;
function timerStart() {

    var buttonName = document.getElementById('startButton');
    if (buttonName.value === 'Start') {
        //    userTimeStore();

        var timeInput = document.getElementById('time');
        var timerTime = formatTimeStringToSeconds(timeInput.value);
        if (timerTime === -1) {
           // alert('Wrong input');
            timeInput.style.borderColor='red';
            return; //numbers are not <60 or field is empty
        }
        buttonName.value = 'Stop';
        timeInput.readonly = true;
        var startTime = Date.now();
        var reminderTime = timerTime * 0.05; //remind at this time, 5% of the whole timeba
        interval = setInterval(function () {
            var currTime = Date.now() - startTime;
            var timeRemainingInSeconds = timerTime - Math.floor(currTime / 1000);
            if (timeRemainingInSeconds > 0) {
                timeInput.value = formatSecondstoISO(timerTime - Math.floor(currTime / 1000));
                if (reminderTime >= 10) { //send a single notification sound as a reminder at 5% that the timer ends shortly
                    if (timeRemainingInSeconds === reminderTime) {
                        var audio = new Audio('quite-impressed.ogg');
                        audio.play();
                    }
                }
            } else {
                //notify and wait for the user to stop the alarm
                clearInterval(interval);
                timeInput.value = formatSecondstoISO(timerTime - Math.floor(currTime / 1000));
                buttonName.value = 'Ok';
                var audio = new Audio('quite-impressed.ogg');
                notifyMe();
                interval = setInterval(function () {
                    if (buttonName.value === 'Ok') {
                        audio.play();
                    } else {
                        //   return;
                    }

                }, 1000);
            }
        }, 1000);
    } else { //button == Stop
        buttonName.value = 'Start';
        clearInterval(interval);
    }

}

function resetTimer() {
    document.getElementById('time').readonly = false;
    document.getElementById('time').value = userTime;
    clearInterval(interval);
    document.getElementById('startButton').value = 'Start';
}

function userTimeStore() {
    t = document.getElementById('time').value;
    if (t.length ===0){
        t='03';
    }
    userTime=t;
}

function changeTimeElement() {
    if (document.getElementById('startButton').value === 'Stop') { //if the timer is running
        timerStart();
    }
    document.getElementById('time').style.borderColor='';

}

function formatInput() {
    var timeInput = document.getElementById('time').value;
    if (!RegExp('[0-9]+|:').test(timeInput.charAt(timeInput.length - 1))) {
        document.getElementById('time').value = timeInput.substring(0, timeInput.length - 1);
        return;
    }
    var stringWithoutColons = timeInput.match(/\d+/g).join('');
    var tempString = '';
    for (var i = 0; i <= stringWithoutColons.length; i = i + 2) {
        if (i + 2 < stringWithoutColons.length) {
            if (stringWithoutColons.length % 2 === 0) {
                tempString += stringWithoutColons.substring(i, i + 2) + ':';
            } else {
                tempString += stringWithoutColons.substring(i, i + 1) + ":" + stringWithoutColons.substring(i + 1, i + 2);
            }
        } else {
            tempString += stringWithoutColons.substring(i, stringWithoutColons.length);
        }
    }
    document.getElementById('time').value = tempString;
}

function formatSecondstoISO(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor(seconds / 3600 * 60);
    var secs = seconds % 60;
    if (hours !== 0) {
        return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + secs).slice(-2);
    } else if (minutes !== 0) {
        return ("0" + minutes).slice(-2) + ":" + ("0" + secs).slice(-2);
    } else {
        return ("0" + secs).slice(-2);
    }
}

function formatTimeStringToSeconds(str) {

    var seconds = 0;
    var splitString;
    if (RegExp("^(?!00)([1-9]|[0-5][0-9]|60)$").test(str)) {
        seconds = parseInt(str, 10);
    } else if (RegExp("^([0-9]|[0-5][0-9]|60):(0[1-9]|[0-5][0-9])$").test(str)) {
        splitString = str.split(":");
        seconds = (parseInt(splitString[0], 10) * 60 + parseInt(splitString[1], 10));
    } else if (RegExp("^([0-9]|[0-1][0-9]|2[0-3]):(0[1-9]|[0-5][0-9]):(0[1-9]|[0-5][0-9])$").test(str)) {
        splitString = str.split(":");
        seconds = parseInt(splitString[0], 10) * 60 * 60 + parseInt(splitString[1], 10) * 60 + parseInt(splitString[2], 10);
    } else {
        return -1;
    }
    return seconds;
}

function notifyMe() {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification('Time is up!');
        } else {
            // request permission from user
            Notification.requestPermission().then(function (p) {
                if (p === 'granted') {
                    // show notification here
                    var notify = new Notification('Time is up!');
                } else {
                    console.log('User blocked notifications.');
                }
            }).catch(function (err) {
                console.error(err);
            });
        }
    }
}

window.onload = function () {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    userTimeStore(); //in case the time is set before the page loads, ex refresh

    fileInput.addEventListener('change', function (e) {
        var file = fileInput.files[0];
        if (file !== null) {
            var textType = /text.*/;

            if (file.type.match(textType)) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    quoteArray = reader.result.split('\n');
                    quotes();
                    document.getElementById('chooseFile').style.display = "none";
                    document.getElementById('quoteButtons').style.display = "block";
                    document.getElementById('resetFileQuote').value = "Reset File";
                };
                reader.readAsText(file);


            } else {
                fileDisplayArea.innerText = "File not supported!";
            }
        }
    });
};

function quotes() {
    //pick a random line from the local file and display it
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    fileDisplayArea.innerText = quoteArray[Math.floor(Math.random() * quoteArray.length)];
}

function resetQuote() {
    quotes();
}

function resetFileQuote() {
    resetFileButton = document.getElementById('resetFileQuote');
    if (resetFileButton.value === 'Cancel') {
        document.getElementById('chooseFile').style.display = "none";
        resetFileButton.value = 'Reset File';
        document.getElementById('chooseFile').style.display = "none";

    } else if (resetFileButton.value === 'Reset File') {
        document.getElementById('chooseFile').style.display = "block";
        resetFileButton.value = 'Cancel';
    }
}

function showWholeFile() {
    showWholeFileButton = document.getElementById('showFile');
    if (showWholeFileButton.value === 'Show Whole File') {
        document.getElementById('wholeFileArea').innerText = quoteArray.join('\n');
        showWholeFileButton.value = 'Hide Whole File';
    } else if (showWholeFileButton.value === 'Hide Whole File') {
        document.getElementById('wholeFileArea').innerText = '';
        showWholeFileButton.value = 'Show Whole File';
    }

}