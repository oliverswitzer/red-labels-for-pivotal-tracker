chrome.extension.sendMessage({}, function() {
    setTimeout(function() {
        var modalContainer = document.createElement("div");
        modalContainer.innerHTML = `<div class="modal"><div class="modal-inner"><a data-modal-close>Close</a><div class="modal-content"></div></div></div>`;
        var body = document.querySelector('body');
        body.appendChild(modalContainer);

        var modalContent = document.createElement("div");
        modalContent.innerHTML = "<div id='wwltw-modal'>THIS IS MY CONTENT</div>";
        body.appendChild(modalContent);

        modal = new VanillaModal.default();
        modal.open("#wwltw-modal");
        debugger;
        storyListener(document);
    }, 2000);
});
