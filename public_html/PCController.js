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

		buttonName.value = 'Break';
		timeInput.readonly = true;
		var startTime = Date.now();
		PCControllerInterval = setInterval(function () {
			var currTime = Date.now() - startTime;
			var timeRemainingInSeconds = timerTime - Math.floor(currTime / 1000);
			if (timeRemainingInSeconds > 0) {
				if ((timerTime - Math.floor(currTime / 1000)) >= 0) {
					timeInput.value = formatSecondstoISO(timerTime - Math.floor(currTime / 1000));
				} else {
					timeInput.value = formatSecondstoISO(0);
				}
			} else {
				//notify and wait for the user to stop the alarm
				clearInterval(PCControllerInterval);
				if ((timerTime - Math.floor(currTime / 1000)) >= 0) {
					timeInput.value = formatSecondstoISO(timerTime - Math.floor(currTime / 1000));
				} else {
					timeInput.value = formatSecondstoISO(0);
				}
				buttonName.value = 'Break';
				var audio = new Audio('quite-impressed.ogg');
				notifyMe();
				PCControllerInterval = setInterval(function () {
					if (buttonName.value === 'Break') {
						audio.play();
					} else {
						//   return;
					}

				}, 1000);
			}
		}, 1000);
	} else if (buttonName.value === 'Break') {
		buttonName.value = 'Stop Break';
		document.getElementById('PCControllerTime').disabled='disabled';
		clearInterval(PCControllerInterval);
		var startTime = Date.now();
		PCControllerInterval = setInterval(function () {
			var currTime = Date.now() - startTime;
			var timeCount = Math.floor(currTime / 1000);
			if (timeCount > 0) {
				document.getElementById('PCControllerTime').value = formatSecondstoISO(timeCount);
			}
		}, 1000);
	} else if (buttonName.value === 'Stop Break') {
		buttonName.value = 'Start';
		clearInterval(PCControllerInterval);
		document.getElementById('PCControllerTime').disabled='';
		PCControllerReset();
		PCControllerStart();

	} else if (buttonName.value === 'Stop') {
		buttonName.value='Start';
		clearInterval(PCControllerInterval)
	}

}

function PCControllerReset() {
	document.getElementById('PCControllerTime').readonly = false;
	document.getElementById('PCControllerTime').value = pccontrollerUserTime;
	clearInterval(PCControllerInterval);
	document.getElementById('PCControllerStartButton').value = 'Start';
	document.getElementById('PCControllerTime').style.borderColor = '';
	document.getElementById('PCControllerTime').disabled='';

}

function PCControllerUserTimeStore() {
	var t = document.getElementById('PCControllerTime').value;
	if (t.length === 0) {
		t = '03';
	}
	pccontrollerUserTime = t;
}

function PCControllerChangeTimeElement() {
	document.getElementById('PCControllerStartButton').value = 'Stop';
	PCControllerStart();
	document.getElementById('PCControllerTime').style.borderColor = '';

}
