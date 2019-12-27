var IntUserTime = '';
var IntInterval;

function IntStart() {

    var buttonName = document.getElementById('IntStartButton');
    if (buttonName.value === 'Start') {
        //    userTimeStore();

        var timeInput = document.getElementById('IntTime');
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
        IntInterval = setInterval(function () {
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
                clearInterval(IntInterval);
                timeInput.value = formatSecondstoISO(timerTime - Math.floor(currTime / 1000));
                buttonName.value = 'Ok';
                var audio = new Audio('quite-impressed.ogg');
                notifyMe();
                IntInterval = setInterval(function () {
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
        clearInterval(IntInterval);
    }

}

function IntReset() {
    document.getElementById('IntTime').readonly = false;
    document.getElementById('IntTime').value = IntUserTime;
    clearInterval(Int);
    document.getElementById('IntStartButton').value = 'Start';
    document.getElementById('IntTime').style.borderColor = '';

}

function IntUserTimeStore() {
    var t = document.getElementById('IntTime').value;
    if (t.length === 0) {
        t = '03';
    }
    IntUserTime = t;
}

function IntChangeTimeElement() {
    if (document.getElementById('IntStartButton').value === 'Stop') { //if the timer is running
        IntStart();
    }
    document.getElementById('IntTime').style.borderColor = '';

}
