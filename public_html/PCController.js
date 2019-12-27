var pccontrollerUserTime = '';
var PCControllerInterval;

function PCControllerStart() {

    var buttonName = document.getElementById('PCControllerStartButton');
    if (buttonName.value === 'Start') {
        //    userTimeStore();

        var timeInput = document.getElementById('PCControllerTime');
        var timerTime = formatTimeStringToSeconds(timeInput.value);
        if (timerTime === -1) {
            // alert('Wrong input');
            timeInput.style.borderColor = 'red';
            return; //numbers are not <60 or field is empty
        }

        buttonName.value = 'Stop';
        timeInput.readonly = true;

        var startTime = Date.now();
        var reminderTime = timerTime * 0.05; //remind at this time, 5% of the whole timeba
        PCControllerInterval = setInterval(function () {
            var currTime = Date.now() - startTime;
            var timeRemainingInSeconds = timerTime - Math.floor(currTime / 1000);
            if (timeRemainingInSeconds > 0) {
                if ((timerTime - Math.floor(currTime / 1000)) >= 0) {
                    document.getElementById('IntCountdown').value = formatSecondstoISO(timerTime - Math.floor(currTime / 1000));
                } else {
                    document.getElementById('IntCountdown').value = formatSecondstoISO(0);
                }
                if (reminderTime >= 10) { //send a single notification sound as a reminder at 5% that the timer ends shortly
                    if (timeRemainingInSeconds === reminderTime) {
                        var audio = new Audio('quite-impressed.ogg');
                        audio.play();
                    }
                }
            } else {
                //notify and wait for the user to stop the alarm
                clearInterval(PCControllerInterval);
                if ((timerTime - Math.floor(currTime / 1000)) >= 0) {
                    document.getElementById('IntCountdown').value = formatSecondstoISO(timerTime - Math.floor(currTime / 1000));
                } else {
                    document.getElementById('IntCountdown').value = formatSecondstoISO(0);
                }
                buttonName.value = 'Ok';
                var audio = new Audio('quite-impressed.ogg');
                notifyMe();
                PCControllerInterval = setInterval(function () {
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
        clearInterval(PCControllerInterval);
    }

}

function PCControllerReset() {
    document.getElementById('PCControllerTime').readonly = false;
    document.getElementById('PCControllerTime').value = pccontrollerUserTime;
    clearInterval(PCController);
    document.getElementById('PCControllerStartButton').value = 'Start';
    document.getElementById('PCControllerTime').style.borderColor = '';

}

function PCControllerUserTimeStore() {
    var t = document.getElementById('PCControllerTime').value;
    if (t.length === 0) {
        t = '03';
    }
    pccontrollerUserTime = t;
}

function PCControllerChangeTimeElement() {
    if (document.getElementById('PCControllerStartButton').value === 'Stop') { //if the timer is running
        pccontrollerStart();
    }
    document.getElementById('PCControllerTime').style.borderColor = '';

}
