class WWLTWModal {
    constructor() {
        let modalContainer = `
                <div class="ui fullscreen modal">
                    <i class="close icon"></i>
                    <div class="header">What did you learn while working on this story?</div>
                    <div class="content">
                        <form id="wwltw-form" class="ui form">
                            <div class="field">
                                <label for="learning-body">Body (markdown supported)</label>
                                <textarea name="learning-body" id="learning-body"></textarea>
                            </div>
                            <div class="field">
                                <label for="tags">Tags</label>
                                <select name="tags" multiple="" id="learning-tags" class="ui fluid search dropdown">
                                    <option value="">e.g. java, rails, tdd</option>
                                    ${this.populateTags()}
                                </select>
                            </div>
                            <div class="actions">
                                <input type="submit" value="Add to WWLTW story" class="ui submit button">
                            </div>
                        </form>
                    </div>
                </div>`;

        this.addElementToBody(modalContainer);
    }

    populateTags() {
        return tagList.map((tag) => {
            return `<option value="${tag}">${tag}</option>`;
        }).join('');
    }

    initialize() {
        $('.ui.fluid.dropdown').dropdown();

        this.wwltwForm = document.querySelector("#wwltw-form");
        this.learningBody = document.querySelector("#learning-body");
        this.$modal = $('.ui.modal').modal({
            onHide: () => {
                this.clearForm()
            }
        });
        return this;
    }

    clearForm() {
        this.learningBody.value = "";
        $('.ui.fluid.dropdown').dropdown('restore defaults');
    };

    bindFormSubmission(thingToDoOnSubmit) {
        this.wwltwForm.addEventListener('submit', (e) => {
            e.preventDefault();

            thingToDoOnSubmit(this.extractSubmittedTags(), this.learningBody.value);

            this.clearForm();
            this.$modal.modal('hide');
        });
    }

    extractSubmittedTags() {
        const learningTags = this.wwltwForm.querySelector("#learning-tags");
        const tags = $(learningTags).find('option:selected')
            .map(function (i, option) {
                return option.value;
            });

        return Array.prototype.join.call(tags, ', ');
    };

    addElementToBody(innerHtml) {
        let modalContainer = document.createElement("div");
        modalContainer.innerHTML = innerHtml;
        document.querySelector('body').appendChild(modalContainer);
    }
}