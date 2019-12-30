var quoteArray;
var quotesInterval;

function quotes() {
	//pick a random line from the local file and display it
	var fileDisplayArea = document.getElementById('fileDisplayArea');
	fileDisplayArea.innerText = quoteArray[Math.floor(Math.random() * quoteArray.length)];
	var startTime = Date.now();
	var currTime;
	quotesInterval = setInterval(function () {
		currTime = Math.floor((startTime - Date.now())/1000);
		if(currTime%900===0){
			document.getElementById('resetQuote').click();
		}
		
	}, 1000);
}

function resetQuote() {
	clearInterval(quotesInterval);
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