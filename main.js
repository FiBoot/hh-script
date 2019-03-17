function createElement({ type, attributes, style }) {
  const element = document.createElement(type);

  Object.assign(element, attributes);
  Object.assign(element.style, style);
  return element;
}

function appendElement({ type, parent, attributes, style }) {
  (parent ? parent : document.getElementById(HH_BODY_ID)).appendChild(
    createElement({ type, parent, attributes, style })
  );
}

function createBaseInterface() {
  appendElement({
    type: 'button',
    style: Object.assign(STYLE.FLIP_BTN, STYLE.ABSOLUTE)
  });

  const boardWrap = createElement({
    type: 'div',
    style: Object.assign(STYLE.BOARD_WRAP, STYLE.ABSOLUTE)
  });
  const board = appendElement({
    type: 'div',
    parent: boardWrap,
    style: Object.assign(STYLE.BOARD),
    attributes: {
      innerHTML: 'inside test'
    }
  });

  document.getElementById(HH_BODY_ID).appendChild(boardWrap);
}

function main() {
  createBaseInterface();
}
