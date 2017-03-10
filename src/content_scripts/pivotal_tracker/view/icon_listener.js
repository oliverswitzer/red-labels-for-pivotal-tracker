
export default () => {
    chrome.extension.sendMessage({}, function(response) {
        let readyStateCheckInterval = setInterval(function() {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);

                let observer = new MutationObserver(function (mutations) {
                    mutations.forEach(handleMutationEvents);
                });

                // configuration of the observer:
                let config = {
                    attributes: true,
                    characterData: true,
                    childList: true,
                    subtree: true
                };

                observer.observe(document, config);

                let handleMutationEvents = function handleMutationEvents(mutation) {
                    Array.prototype.forEach.call(mutation.addedNodes, styleLabelsInNode);
                    styleLabelsInNode(mutation.target);
                };

                let styleLabelsInNode = function styleLabelsInNode(node) {
                    if (nodeIsElement(node)) {
                        styleLabels(findLabelsInNode(node));
                    }
                };

                let nodeIsElement = function nodeIsElement(node) {
                    return (typeof node.querySelectorAll !== 'undefined');
                };

                let findLabelsInNode = function findLabelsInNode(node) {
                    return node.querySelectorAll('a.label');
                };

                let styleLabels = function styleLabels(labels) {
                    Array.prototype.forEach.call(labels, function(label) {
                        if (isLabelEligible(label.textContent)) {
                            let story = findStory(label);
                            if(!story) { return; }
                            styleStoryIcon(story);
                        }
                    });
                };

                let isLabelEligible = function isLabelEligible(labelText) {
                    return labelText.indexOf('wwltw-story') !== -1;
                };

                function findStory(label) {
                    let currentNode = label;

                    while(Array.prototype.indexOf.call(currentNode.classList, 'story') === -1) {
                        currentNode = currentNode.parentElement;
                        if(!currentNode) { return null; }
                    }
                    return currentNode;
                }

                function styleStoryIcon(story) {
                    if(story.querySelector('header.preview span.meta')) {
                        let meta = story.querySelector('header.preview span.meta');
                        meta.classList.add("wwltw-story");
                    }
                }
            }
        }, 10);
    });
}
