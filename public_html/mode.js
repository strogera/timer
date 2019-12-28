function changeMode(tabName) {
	if (tabName === 'Timer Mode') {
		document.getElementById('TimerMode').disabled= 'disabled';
		document.getElementById('PCControllerMode').disabled= '';
		document.getElementById('IntMode').disabled= '';
		document.getElementById('Timer').style.display = '';
		document.getElementById('PCController').style.display = 'none';
		document.getElementById('Int').style.display = 'none';

	} else if (tabName === 'PCController Mode') {
		document.getElementById('TimerMode').disabled= '';
		document.getElementById('PCControllerMode').disabled= 'disabled';
		document.getElementById('IntMode').disabled= '';
		document.getElementById('Timer').style.display = 'none';
		document.getElementById('PCController').style.display = '';
		document.getElementById('Int').style.display = 'none';

	} else if (tabName === 'Interval Mode') {
		document.getElementById('TimerMode').disabled= '';
		document.getElementById('PCControllerMode').disabled= '';
		document.getElementById('IntMode').disabled= 'disabled';
		document.getElementById('Int').style.display = '';
		document.getElementById('Timer').style.display = 'none';
		document.getElementById('PCController').style.display = 'none';
	}
}