var IntUserTime = '';
var IntInterval;

function IntStart() {

    var buttonName = document.getElementById('IntStartButton');
    if (buttonName.value === 'Start' || buttonName.value === 'Resume') {
        var timeInput;

        if (buttonName.value === 'Start') {
            timeInput = document.getElementById('IntTime');
            IntUserTime = document.getElementById('IntTime').value;
        } else {
            timeInput = document.getElementById('IntCountdown');
        }

        var timerTime = formatTimeStringToSeconds(timeInput.value);

        if (timerTime === -1) {
            // alert('Wrong input');
            timeInput.style.borderColor = 'red';
            return; //numbers are not <60 or field is empty
        }
        buttonName.value = 'Pause';
        timeInput.readonly = true;

        var startTime = Date.now();
        IntInterval = setInterval(function () {
            var currTime = Date.now() - startTime;
            var timeRemainingInSeconds = timerTime - Math.floor(currTime / 1000);
            if (timeRemainingInSeconds > 0) {
                document.getElementById('IntCountdown').value = formatSecondstoISO(timerTime - Math.floor(currTime / 1000));
            } else {
                clearInterval(IntInterval);
                if ((timerTime - Math.floor(currTime / 1000)) >= 0) {
                    document.getElementById('IntCountdown').value = formatSecondstoISO(timerTime - Math.floor(currTime / 1000));
                } else {
                    document.getElementById('IntCountdown').value = formatSecondstoISO(0);
                }
                buttonName.value = 'Ok';
                var audio = new Audio('metronome-sound.wav');
                audio.volume=0.8;
                audio.play();
                IntReset();
                IntStart();
            }
        }, 1000);
    } else {
        if (buttonName.value === 'Pause') {
            buttonName.value = 'Resume';
        }else{
            buttonName.value='Start';
        }
        clearInterval(IntInterval);
    }

}

function IntReset() {
    document.getElementById('IntTime').readonly = false;
    document.getElementById('IntTime').value = IntUserTime;
    clearInterval(IntInterval);
    document.getElementById('IntStartButton').value = 'Start';
    document.getElementById('IntTime').style.borderColor = '';
    document.getElementById('IntCountdown').value = '';


}

function IntUserTimeStore() {
    var t = document.getElementById('IntTime').value;
    if (t.length === 0) {
        t = '03';
    }
    IntUserTime = t;
}

function IntChangeTimeElement() {
        IntReset();
        document.getElementById('IntStartButton').value = 'Stop';
        IntStart();
    
    document.getElementById('IntTime').style.borderColor = '';

}
