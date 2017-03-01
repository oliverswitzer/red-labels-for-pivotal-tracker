chrome.runtime.sendMessage({
   setAlarm: new DateWrapper().nextFridayAtThree().valueOf()
});
