chrome.extension.sendMessage({}, function () {
    function addElementToBody(innerHtml) {
        let modalContainer = document.createElement("div");
        modalContainer.innerHTML = innerHtml;
        document.querySelector('body').appendChild(modalContainer);
    }

    setTimeout(function () {
        const modalInitializer = new WWLTWModal();
        const modal = modalInitializer.initialize();

        storyListener(document, modal);
    }, 2000);
});
