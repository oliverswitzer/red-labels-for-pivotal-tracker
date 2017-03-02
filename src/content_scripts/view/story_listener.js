import $ from 'jquery'

export default (modal) => {
    $(document).on('click', '.finish.button', function () {
        chrome.runtime.sendMessage({ eventType: 'pop' });
        modal.modal('show');
    });
};
