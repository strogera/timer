var timerUserTime = '';
var TimerInterval;

function TimerStart() {

    var buttonName = document.getElementById('TimerStartButton');
    if (buttonName.value === 'Start') {
        //    userTimeStore();

        var timeInput = document.getElementById('TimerTime');
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
        TimerInterval = setInterval(function () {
            var currTime = Date.now() - startTime;
            var timeRemainingInSeconds = timerTime - Math.floor(currTime / 1000);
            if (timeRemainingInSeconds > 0) {
                if ((timerTime - Math.floor(currTime / 1000)) >= 0) {
                    timeInput.value = formatSecondstoISO(timerTime - Math.floor(currTime / 1000));
                } else {
                    timeInput.value = formatSecondstoISO(0);
                }
                if (reminderTime >= 10) { //send a single notification sound as a reminder at 5% that the timer ends shortly
                    if (timeRemainingInSeconds === reminderTime) {
                        var audio = new Audio('quite-impressed.ogg');
                        audio.play();
                    }
                }
            } else {
                //notify and wait for the user to stop the alarm
                clearInterval(TimerInterval);
                if ((timerTime - Math.floor(currTime / 1000)) >= 0) {
                    timeInput.value = formatSecondstoISO(timerTime - Math.floor(currTime / 1000));
                } else {
                    timeInput.value = formatSecondstoISO(0);
                }
                buttonName.value = 'Ok';
                var audio = new Audio('quite-impressed.ogg');
                audio.volume=1;
                notifyMe();
                TimerInterval = setInterval(function () {
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
        clearInterval(TimerInterval);
    }

}

function TimerReset() {
    document.getElementById('TimerTime').readonly = false;
    document.getElementById('TimerTime').value = timerUserTime;
    clearInterval(TimerInterval);
    document.getElementById('TimerStartButton').value = 'Start';
    document.getElementById('TimerTime').style.borderColor = '';

}

function TimerUserTimeStore() {
    var t = document.getElementById('TimerTime').value;
    if (t.length === 0) {
        t = '03';
    }
    timerUserTime = t;
}

function TimerChangeTimeElement() {
    if (document.getElementById('TimerStartButton').value === 'Stop') { //if the timer is running
        TimerStart();
    }
    document.getElementById('TimerTime').style.borderColor = '';

}
