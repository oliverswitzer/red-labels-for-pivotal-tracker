export default (innerHtml) => {
  let elementContainer = document.createElement('div');
  elementContainer.innerHTML = innerHtml;
  document.querySelector('body').appendChild(elementContainer);
  return elementContainer;
}