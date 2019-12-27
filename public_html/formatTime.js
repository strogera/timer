

function formatInput(ElementName) {
    var timeInput = document.getElementById(ElementName).value;
    if (!RegExp('[0-9]+|:').test(timeInput.charAt(timeInput.length - 1))) {
        document.getElementById(ElementName).value = timeInput.substring(0, timeInput.length - 1);
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
    document.getElementById(ElementName).value = tempString;
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
