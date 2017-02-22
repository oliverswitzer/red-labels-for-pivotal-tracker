var storyListener = function (dom) {
    var finishButtons = dom.querySelectorAll('.button.finish');

    finishButtons.forEach(function(button) {
        button.addEventListener('click', promptListener , false);

        function promptListener () {
            prompt("What did you learn while working on this story?");
            button.removeEventListener('click', promptListener, false);
        }
    });
};
