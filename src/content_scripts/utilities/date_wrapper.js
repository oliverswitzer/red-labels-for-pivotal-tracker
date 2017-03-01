class DateWrapper {
    nextFriday() {
        return moment().endOf('week').subtract(1, 'day');
    }

    nextFridayAtThree() {
        let nextFriday = this.nextFriday();
        nextFriday.hour(15);
        nextFriday.minutes(0);
        nextFriday.seconds(0);
        nextFriday.milliseconds(0);

        return nextFriday.toDate();
    }
}