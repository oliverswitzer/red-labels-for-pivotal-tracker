import tagList from './tagList';
import $ from 'jquery';
$.fn.modal= require('semantic-ui-modal');
$.fn.dropdown = require('semantic-ui-dropdown');
$.fn.transition = require('semantic-ui-transition');
$.fn.dimmer = require('semantic-ui-dimmer');

export default class WWLTWModal {
    constructor() {
        let modalContent = `
        <div class="ui modal">
            <div class="header ui grid">
                <div class="row">
                    <div class="twelve wide column"><h3>What did you learn while working on this story?</h3></div>
                    <div class="four wide column actions"><input type="button" value="Skip"
                                                                 class="ui deny button negative basic right floated"></div>
                </div>
            </div>
            <div class="content">
                <form id="wwltw-form" class="ui form">
                    <div class="ui grid">
                        <div class="one wide column"></div>
                        <div class="fourteen wide column">
                            <div class="field">
                                <label for="learning-body">Content (markdown supported)</label>
                                <textarea name="learning-body" id="learning-body"></textarea>
                            </div>
                            <div class="field">
                                <label for="learning-tags">Tags (optional)</label>
                                <select name="tags" multiple="" id="learning-tags" class="ui fluid search dropdown">
                                    <option value="">e.g. java, rails, tdd</option>
                                    ${this.populateTags()}
                                </select>
                            </div>
                            <div class="actions">
                                <input type="submit" value="Add to WWLTW story" class="ui submit button right floated">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>`;

        let modalContainer = this.addElementToBody(modalContent);
        let learningBody = modalContainer.querySelector("#learning-body");
        learningBody.placeholder = "### A Header for your Learning (recommended)\n\n";
        learningBody.placeholder += "Body of learning. You can use all the markdown you want\n\n";
        learningBody.placeholder += "```\n    codeBlocks.areSupported();\n```";
    }

    populateTags() {
        return tagList.map((tag) => {
            return `<option value="${tag}">${tag}</option>`;
        }).join('');
    }

    initialize() {
        $('.ui.fluid.dropdown').dropdown({
            allowAdditions: true
        });

        this.wwltwForm = document.querySelector("#wwltw-form");
        this.learningBody = document.querySelector("#learning-body");
        this.$modal = $('.ui.modal').modal({
            onHide: () => {
                this.clearForm()
            }
        });

        this._preventEnteringCustomTagsFromSubmitting();

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
        let elementContainer = document.createElement("div");
        elementContainer.innerHTML = innerHtml;
        document.querySelector('body').appendChild(elementContainer);
        return elementContainer;
    }

    _preventEnteringCustomTagsFromSubmitting() {
        $(this.wwltwForm).on('keydown', function (e) {
            const ENTER = 13;
            if (e.target.classList.contains('search') && e.which === ENTER) {
                e.preventDefault();
            }
        });
    }
}