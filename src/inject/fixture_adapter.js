(function () {
    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            storyListener(document);
        }
    };
})();
