import $ from 'jquery'

export default (modal) => {
    $(document).on('click', '.finish.button', function () {
        AnalyticsWrapper.sendEvent('pop');
        modal.modal('show');
    })
};
