chrome.extension.sendMessage({}, function() {

    function addElementToBody(innerHtml) {
        let modalContainer = document.createElement("div");
        modalContainer.innerHTML = innerHtml;
        document.querySelector('body').appendChild(modalContainer);
    }

    setTimeout(function() {
        addElementToBody('<div class="modal"><div class="modal-inner"><a data-modal-close>Close</a><div class="modal-content"></div></div></div>');
        addElementToBody(`
        <div id='wwltw-modal'>
            <h3>What did you learn while working on this story?</h3>
            <!--<label for="title">Title</label>-->
            <!--<input type="text" id="title">-->
            <form id="wwltw-form">
                <div class="form-group">
                    <label for="learning-body">Body</label>
                    <textarea name="learning-body" id="learning-body" cols="30" rows="5"></textarea>
                </div>
                <input type="submit" value="Add to WWLTW story" onclick="">
            </form>
        </div>`);

        let modal = new VanillaModal.default();
        storyListener(document, modal);
    }, 2000);
});
