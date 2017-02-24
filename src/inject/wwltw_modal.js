class WWLTWModal {
    constructor() {
        let modalContainer = `
                <div class="modal">
                    <div class="modal-inner">
                        <a data-modal-close>Close</a>
                        <div class="modal-content"></div>
                    </div>
                </div>`;

        let modalContent = `
            <div id='wwltw-modal'>
                <form id="wwltw-form" class="ui form">
                <label id="header">What did you learn while working on this story?</label>
                    <div class="field">
                        <label for="learning-body">Body (markdown supported)</label>
                        <textarea name="learning-body" id="learning-body" cols="30" rows="5"></textarea>
                    </div>
                    <div class="field">
                    <label for="tags">Tags</label>
                    <select name="tags" multiple="" id="learning-tags" class="ui fluid search dropdown">
                                  <option value="">e.g. java, rails, tdd</option>
                                  ${this.populateTags()}
                              </select>
                    </div>
                <input type="submit" value="Add to WWLTW story" class="ui submit button">
                </form>
            </div>`;

        this.addElementToBody(modalContainer);
        this.addElementToBody(modalContent);
    }

    populateTags() {
        return tagList.map((tag) => {
            return `<option value="${tag}">${tag}</option>`;
        }).join('');
    }

    initialize() {
        $('.ui.fluid.dropdown').dropdown();

        return new VanillaModal.default();
    }

    addElementToBody(innerHtml) {
        let modalContainer = document.createElement("div");
        modalContainer.innerHTML = innerHtml;
        document.querySelector('body').appendChild(modalContainer);
    }
}