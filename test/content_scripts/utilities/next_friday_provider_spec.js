import NextFridayProvider from "../../../src/content_scripts/utilities/next_friday_provider";

describe('NextFridayProvider', function () {

    const fridayAtFour = new Date(2017, 2, 3, 16, 0, 0);

    beforeEach(function() {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    describe('millisecondsDate', function () {
        it('returns the date for the Friday of the current week at 2:30pm', function () {
            const thursday = new Date(2017, 2, 2);
            jasmine.clock().mockDate(thursday);

            const fridayAtThree = new Date(2017, 2, 3, 14, 30, 0).valueOf();

            expect(NextFridayProvider.millisecondsDate()).toEqual(fridayAtThree);
        });

        describe('when it is after next Friday at 2:30pm', function () {
           it('returns the date for the following Friday at 2:30pm', function () {
                jasmine.clock().mockDate(fridayAtFour);

                const nextFridayAtThree = new Date(2017, 2, 10, 14, 30, 0).valueOf();
                expect(NextFridayProvider.millisecondsDate()).toEqual(nextFridayAtThree);
           });
        });
    });

    describe('formattedDate', function () {
        it('returns the month / day for next Friday', function () {
            jasmine.clock().mockDate(fridayAtFour);

            expect(NextFridayProvider.formattedDate()).toEqual('3/10');
        });
    });
});
