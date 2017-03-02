import $ from 'jquery'
import AnalyticsWrapper from "../utilities/analytics_wrapper";

export default (modal) => {
    $(document).on('click', '.finish.button', function () {
        chrome.runtime.sendMessage({ eventType: 'pop' });
        modal.modal('show');
    });
};
