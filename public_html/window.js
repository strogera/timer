
window.onload = function () {
	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');
	TimerUserTimeStore(); //in case the time is set before the page loads, ex refresh
	document.getElementById('TimerMode').click();
	// timerUserTime = document.getElementById('TimerTIme').value;
	//  pccontrollerUserTime = document.getElementById('PCControllerTime').value;
	//  IntUserTime = document.getElementById('IntTime').value;
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
