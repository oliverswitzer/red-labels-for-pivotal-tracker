var storyListener = function (modal) {

    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(handleMutationEvents);
            });

            // configuration of the observer:
            var config = {
                attributes: true,
                characterData: true,
                childList: true,
                subtree: true
            };

            observer.observe(document, config);

            var handleMutationEvents = function handleMutationEvents(mutation) {
                Array.prototype.forEach.call(mutation.addedNodes, addListenersInNode);
                addListenersInNode(mutation.target);
            }

            var addListenersInNode = function styleLabelsInNode(node) {
                if (nodeIsElement(node)) {
                    addListenerToButtons(findFinishButtons(node));
                }
            }

            var nodeIsElement = function nodeIsElement(node) {
                return (typeof node.querySelectorAll !== 'undefined');
            }

            var findFinishButtons = function findLabelsInNode(node) {
                return node.querySelectorAll('.button.finish');
            }

            var addListenerToButtons = function addListenerToButtons(buttons) {
                Array.prototype.forEach.call(buttons, function(button) {
                    button.addEventListener('click', promptListener, false);
                    function promptListener() {
                        modal.modal('show');
                        button.removeEventListener('click', promptListener, false);
                    }
                });
            }
        }
    }, 10);
};
