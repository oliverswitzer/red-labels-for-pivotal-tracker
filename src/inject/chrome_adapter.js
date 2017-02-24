chrome.extension.sendMessage({}, function () {

    setTimeout(function () {
        const modalInitializer = new WWLTWModal();
        const modal = modalInitializer.initialize();

        storyListener(document, modal);
    }, 2000);
});
