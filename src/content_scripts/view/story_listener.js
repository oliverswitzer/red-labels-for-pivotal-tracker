var storyListener = function (modal) {
    $(document).on('click', '.finish.button', function () {
        AnalyticsWrapper.sendEvent('pop');
        modal.modal('show');
    })
};
