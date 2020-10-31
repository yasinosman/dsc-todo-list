/**
 * Creates a DOM element based on input parameters
 * @param {string} nodeType Type of the HTML element (p, div, a etc.)
 * @param {string} nodeInnerHTML Inner HTML of the element
 * @param {object} attributes Attributes object, attributes should be "object keys"
 * and values should be "object values"
 */
function createHtmlElement(nodeType, nodeInnerHTML, attributes) {
  const node = document.createElement(nodeType);
  node.innerHTML = nodeInnerHTML;
  Object.keys(attributes).forEach((key) => {
    node.setAttribute(key, attributes[key]);
  });

  return node;
}

export {createHtmlElement}