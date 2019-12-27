function changeMode() {
    var mode = document.getElementById('Mode');
    if (mode.value === 'Timer Mode') {
        mode.value = 'PCController Mode';
        document.getElementById('Timer').style.display = 'none';
        document.getElementById('PCController').style.display = '';

    } else if (mode.value === 'PCController Mode') {
        mode.value = 'Int Mode';
        document.getElementById('PCController').style.display = 'none';
        document.getElementById('Int').style.display = '';

    } else if (mode.value === 'Int Mode') {
        mode.value = 'Timer Mode';
        document.getElementById('Int').style.display = 'none';
        document.getElementById('Timer').style.display = '';
    }
}