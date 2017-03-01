describe('DateWrapper', function () {

    let dateWrapper;

    beforeEach(function() {
        jasmine.clock().install();
        dateWrapper = new DateWrapper();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    describe('nextFriday', function () {
        it('returns the date for the Friday of the current week', function () {
            const thursday = new Date(2017, 2, 2);
            jasmine.clock().mockDate(thursday);

            const friday = new Date(2017, 2, 3);
            expect(dateWrapper.nextFriday().year()).toEqual(friday.getFullYear());
            expect(dateWrapper.nextFriday().month()).toEqual(friday.getMonth());
            expect(dateWrapper.nextFriday().day()).toEqual(friday.getDay());
        });
    });

    describe('nextFridayAtThree', function () {
        it('returns the date for the Friday of the current week at 3:00pm', function () {
            const thursday = new Date(2017, 2, 2);
            jasmine.clock().mockDate(thursday);

            const fridayAtThree = new Date(2017, 2, 3, 15, 0, 0);
            expect(dateWrapper.nextFridayAtThree()).toEqual(fridayAtThree);
        });
    });
});