function createElement({ type, attributes, style }) {
  const element = document.createElement(type);
  Object.assign(element, attributes);
  Object.assign(element.style, style);
  return element;
}

function appendElement({ type, parent, attributes, style }) {
  const element = createElement({ type, parent, attributes, style });
  (parent ? parent : document.getElementById(HH_BODY_ID)).appendChild(element);
  return element;
}

function createBaseInterface() {
  const boardWrap = appendElement({
    type: 'div',
    style: Object.assign(STYLE.BOARD_WRAP, STYLE.ABSOLUTE),
    attributes: {
      id: 'board'
    }
  });
  appendElement({
    type: 'img',
    parent: boardWrap,
    style: Object.assign(STYLE.CLOSE, STYLE.ABSOLUTE, STYLE.POINTER),
    attributes: {
      src: 'https://hh.hh-content.com/design_v2/close_cross_icon.png',
      onclick: () => {
        document.getElementById('flip_btn').style.display = 'block';
        document.getElementById('board').style.display = 'none';
      }
    }
  });
  const board = appendElement({
    type: 'div',
    parent: boardWrap,
    style: Object.assign(STYLE.BOARD),
    attributes: {
      innerHTML: 'inside test'
    }
  });

  appendElement({
    type: 'button',
    style: Object.assign(STYLE.FLIP_BTN, STYLE.ABSOLUTE, STYLE.POINTER),
    attributes: {
      id: 'flip_btn',
      onclick: () => {
        document.getElementById('flip_btn').style.display = 'none';
        document.getElementById('board').style.display = 'block';
      }
    }
  });
}

function main() {
  createBaseInterface();
}
