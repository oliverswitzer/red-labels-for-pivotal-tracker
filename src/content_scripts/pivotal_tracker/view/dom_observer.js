export default class DomObserver {
  onElementMutation(mutationHandler) {
    new MutationObserver(function (mutations) {
      mutations.forEach(handleMutationEvents)
    }).observe(document, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    })

    const handleMutationEvents = function handleMutationEvents(mutation) {
      Array.prototype.forEach.call(mutation.addedNodes, handleMutation)

      handleMutation(mutation.target)
    }

    const handleMutation = function styleLabelsInNode(node) {
      if (nodeIsElement(node)) {
        mutationHandler()
      }
    }

    const nodeIsElement = function nodeIsElement(node) {
      return (typeof node.querySelectorAll !== 'undefined')
    }
  }
}
