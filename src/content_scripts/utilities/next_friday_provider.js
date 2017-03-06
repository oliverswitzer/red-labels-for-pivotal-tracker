import moment from 'moment'

export default class NextFridayProvider {
    static formattedDate() {
        return momentNextFriday().format('M/D');
    }

    static millisecondsDate() {
        return momentNextFriday().toDate().valueOf();
    }
}

const momentNextFriday = () => {
    let nextFriday = moment()
        .endOf('week')
        .subtract(1, 'day')
        .hour(14)
        .minutes(30)
        .seconds(0)
        .milliseconds(0);

    if (moment().isAfter(nextFriday)) {
        nextFriday.add(1, 'week');
    }

    return nextFriday;
};