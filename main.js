function createElement({ type, attributes, style }) {
  const element = document.createElement(type);
  Object.assign(element, attributes);
  Object.assign(element.style, style);
  return element;
}

function appendElement({ type, parent, attributes, style }) {
  const element = createElement({ type, parent, attributes, style });
  (parent ? parent : document.body).appendChild(element);
  return element;
}

function xhrPost(data, cb) {
  const xhr = new XMLHttpRequest();
  // xhr.open('POST', POST_URL);
  // TEST
  xhr.open('POST', 'http://letakol.free.fr/fiboot/api/ajax.php');
  
  xhr.onload = cb;
  xhr.send(data);
}

function createBaseInterface() {
  appendElement({
    type: 'button',
    style: Object.assign({}, STYLE.FLIP_BTN, STYLE.ABSOLUTE, STYLE.POINTER, STYLE.BORDER_RAIUDS),
    attributes: {
      id: ID.FLIP_BTN,
      onclick: () => {
        document.getElementById(ID.FLIP_BTN).style.display = 'none';
        document.getElementById(ID.BOARD).style.display = 'block';
      }
    }
  });

  const boardWrap = appendElement({
    type: 'div',
    style: Object.assign({}, STYLE.BOARD_WRAP, STYLE.ABSOLUTE, STYLE.BORDER_RAIUDS),
    attributes: {
      id: ID.BOARD
    }
  });
  appendElement({
    type: 'img',
    parent: boardWrap,
    style: Object.assign({}, STYLE.CLOSE, STYLE.ABSOLUTE, STYLE.POINTER),
    attributes: {
      src: 'https://hh.hh-content.com/design_v2/close_cross_icon.png',
      onclick: () => {
        document.getElementById(ID.BOARD).style.display = 'none';
        document.getElementById(ID.FLIP_BTN).style.display = 'block';
      }
    }
  });

  const board = appendElement({
    type: 'div',
    parent: boardWrap,
    style: Object.assign({}, STYLE.BOARD),
    attributes: {}
  });

  appendElement({
    type: 'div',
    parent: board,
    style: STYLE.BOARD_TITLE,
    attributes: {
      innerText: 'Script panel'
    }
  });

  return board;
}

function createMoneyRetriever(board) {
  const loadWrap = appendElement({
    type: 'div',
    parent: board,
    style: Object.assign({}, STYLE.MARGIN_TOP, STYLE.POINTER)
  });
  appendElement({
    type: 'div',
    parent: loadWrap,
    style: STYLE.LOADING_BAR,
    attributes: {
      id: ID.LOADING_BAR,
      onclick: () => {
        getMoney(0, document.getElementById(ID.LOADING_BAR));
      }
    }
  });
}

function createFightBlocks(board) {
  const fightBoard = appendElement({
    type: 'div',
    parent: board,
    style: STYLE.MARGIN_TOP
  });
  OPPONENTS.forEach((opponent, index) => {
    // TODO: images
    const id = `${ID_PREFIX}FIGHT_${index}`;
    appendElement({
      type: 'div',
      parent: fightBoard,
      style: Object.assign({}, STYLE.FIGHT_BLOCK, STYLE.POINTER, STYLE.BORDER_RAIUDS),
      attributes: {
        id,
        innerText: opponent,
        title: opponent,
        onclick: () => {
          fightOpponent(index, document.getElementById(id));
        }
      }
    });
  });
}

function getMoney(index, element) {
  if (girls) {
    if (index <= girls.length) {
      const percent = Math.round((index / girls.length) * 10000) / 100;
      element.style.width = `${percent}%`;
      element.innerText = `${percent}% (${index}/${girls.length})`;
      setTimeout(() => getMoney(index + 1, element), TIMEOUT_SPAN);
    }
  } else {
    element.innerText = 'No girls found !';
  }
}

function fightOpponent(index, element) {
  element.innerText = 'fighting';
  xhrPost(`class=Battle&action=fight&who[id_troll]=${index}`, result => {
    element.innerText = OPPONENTS[index];
    console.log(result);
  });
}

function main() {
  const board = createBaseInterface();
  createMoneyRetriever(board);
  createFightBlocks(board);
}
