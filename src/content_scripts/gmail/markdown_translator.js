import marked from 'marked';
import hljs from 'highlight.js';
import css from './markdown_css.js';

export default class MarkdownTranslator{
    static translate(markdownInput) {
        const html = marked(markdownInput, this.markedOptions());
        return this.personalStylist(html, css());
    }

    static markedOptions() {
        return {
            renderer: this.renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            smartLists: true,
            breaks: true,
            smartypants: true,
            langPrefix: 'hljs language-',
            highlight: this.highlight
        }
    }

    static highlight(codeText, codeLanguage) {
        if (codeLanguage &&
            hljs.getLanguage(codeLanguage.toLowerCase())) {
            return hljs.highlight(codeLanguage.toLowerCase(), codeText).value;
        }

        return codeText;
    }

    static renderer() {
        let markedRenderer = new marked.Renderer();

        let sanitizeLinkForAnchor = function (text) {
            return text.toLowerCase().replace(/[^\w]+/g, '-');
        };

        markedRenderer.heading = function (text, level) {
            let sanitizedText = sanitizeLinkForAnchor(text);
            let anchorLink = '<a href="#" name="' + sanitizedText + '"></a>';
            return '<h' + level + '>' +
                anchorLink +
                text +
                '</h' + level + '>\n';
        };

        let defaultLinkRenderer = markedRenderer.link;
        markedRenderer.link = function (href, title, text) {
            href = href.replace(/^(?!#)([^:]+)$/, 'http://$1');

            if (href.indexOf('#') === 0) {
                href = '#' + sanitizeLinkForAnchor(href.slice(1).toLowerCase());
            }
            return defaultLinkRenderer.call(this, href, title, text);
        };
        return markedRenderer;
    }

    static personalStylist(mdHtml, mdCss) {
        let wrapper;

        wrapper = document.createElement('div');
        wrapper.innerHTML = mdHtml;
        document.querySelector('body').appendChild(wrapper);

        this.makeStylesExplicit(wrapper, mdCss);

        document.querySelector('body').removeChild(wrapper);

        return wrapper.innerHTML;
    }

    static makeStylesExplicit(wrapperElem, css) {
        let stylesheet, rule, selectorMatches, i, j, styleAttr, elem;

        stylesheet = this.getMarkdownStylesheet(wrapperElem, css);

        for (i = 0; i < stylesheet.cssRules.length; i++) {
            rule = stylesheet.cssRules[i];
            selectorMatches = wrapperElem.parentNode.querySelectorAll(rule.selectorText);

            for (j = 0; j < selectorMatches.length; j++) {
                elem = selectorMatches[j];

                if (elem !== wrapperElem &&
                    !this.isElementDescendant(wrapperElem, elem)) {
                    continue;
                }

                while (elem && (typeof(elem.classList) !== 'undefined')) {
                    if (elem.classList.contains('markdown-here-exclude')) {
                        elem = 'excluded';
                        break;
                    }
                    elem = elem.parentNode;
                }
                if (elem === 'excluded') {
                    continue;
                }

                styleAttr = selectorMatches[j].getAttribute('style') || '';

                if (styleAttr && styleAttr.search(/;[\s]*$/) < 0) {
                    styleAttr += '; ';
                }

                styleAttr += rule.style.cssText;

                selectorMatches[j].setAttribute('style', styleAttr);
            }
        }
    }

    static getMarkdownStylesheet(elem, css) {
        let styleElem, stylesheet, i;

        styleElem = elem.ownerDocument.createElement('style');
        styleElem.setAttribute('title', 'markdown-here-styles');

        styleElem.appendChild(elem.ownerDocument.createTextNode(css));

        elem.appendChild(styleElem);

        for (i = 0; i < elem.ownerDocument.styleSheets.length; i++) {
            if (elem.ownerDocument.styleSheets[i].title === 'markdown-here-styles') {
                stylesheet = elem.ownerDocument.styleSheets[i];
                break;
            }
        }

        if (!stylesheet) {
            throw 'Markdown Here stylesheet not found!';
        }

        elem.removeChild(styleElem);

        return stylesheet;
    }

    static isElementDescendant(parent, descendant) {
        let ancestor = descendant;
        while (!!(ancestor = ancestor.parentNode)) {
            if (ancestor === parent) {
                return true;
            }
        }

        return false;
    }
}