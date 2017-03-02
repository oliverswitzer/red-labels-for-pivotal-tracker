import DateWrapper from './utilities/date_wrapper'

export default function (chrome) {
    chrome.runtime.sendMessage({
        setAlarm: new DateWrapper().nextFridayAtThree().valueOf()
    });
}