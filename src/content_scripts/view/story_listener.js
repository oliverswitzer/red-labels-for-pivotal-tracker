import $ from 'jquery'

export default (modal) => {
    $(document).on('click', '.finish.button', function () {
        setTimeout(function() {
            chrome.runtime.sendMessage({ eventType: 'pop' });

            modal.modal('show', function () {
                modal.find('#learning-body').focus();
            });
        }, 0)
    });
};
