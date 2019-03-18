let fightCount;

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
  xhr.open('POST', POST_URL);
  xhr.onload = cb;
  xhr.send(data);
}

function mutex(element, cb) {
  if (!element.classList.contains(ID.LOADING)) {
    element.className = ID.LOADING;
    cb();
  }
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
      src: IMG.CROSS,
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
    style: Object.assign(
      { backgroundColor: '#0f0f0f' },
      STYLE.LOADING_WRAP,
      STYLE.MARGIN_TOP,
      STYLE.BORDER_RAIUDS,
      STYLE.POINTER
    )
  });
  const load = appendElement({
    type: 'div',
    parent: loadWrap,
    style: Object.assign({}, STYLE.LOADING_BAR, STYLE.BORDER_RAIUDS),
    attributes: {
      id: ID.LOADING_BAR,
      onclick: event => mutex(event.target, () => getMoney(0, event.target))
    }
  });
  mutex(load, () => getMoney(0, load));
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
    const fightBlock = appendElement({
      type: 'div',
      parent: fightBoard,
      style: Object.assign({}, STYLE.FIGHT_BLOCK, STYLE.POINTER, STYLE.BORDER_RAIUDS),
      attributes: {
        id,
        onclick: () => {
          const element = document.getElementById(id);
          mutex(element, () => fightOpponent(index, element, 0, fightCount));
        }
      }
    });
    appendElement({
      type: 'img',
      parent: fightBlock,
      style: Object.assign({}, STYLE.OPPONENT_IMG, STYLE.BORDER_RAIUDS),
      attributes: {
        title: opponent,
        src:
          'https://e-cdns-images.dzcdn.net/images/cover/af2ba8681acef2016a1bb8b6f7f7a7d6/352x477-000000-80-0-0.jpg'
      }
    });
  });

  const fightOption = appendElement({
    type: 'div',
    parent: fightBoard,
    style: { float: 'left', margin: '.5em 0' }
  });
  appendElement({
    type: 'label',
    parent: fightOption,
    style: Object.assign({ marginLeft: '.5em' }),
    attributes: {
      innerText: 'Fight:'
    }
  });
  FIGHT_OPTIONS.forEach(({ id, value }, index) => {
    appendElement({
      type: 'div',
      parent: fightOption,
      style: Object.assign({}, STYLE.FIGHT_OPTION, STYLE.POINTER),
      attributes: {
        id,
        onclick: () => selectFightOption(index)
      }
    });
    appendElement({
      type: 'label',
      parent: fightOption,
      attributes: {
        innerText: `x${value}`
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
      // xhrPost(`class=Girl&which=${girls[index]}&action=get_salary`, result => {
      //   getMoney(index + 1, element);
      // });
    } else {
      element.classList.remove(ID.LOADING);
    }
  } else {
    console.warn('No girls found !');
    element.innerText = 'No girls found !';
  }
}

function selectFightOption(option) {
  const defaultStyle = Object.assign({}, STYLE.FIGHT_OPTION, STYLE.POINTER);
  FIGHT_OPTIONS.forEach(({ id }, index) => {
    Object.assign(
      document.getElementById(id).style,
      option === index ? Object.assign({}, defaultStyle, STYLE.FIGHT_OPTION_ON) : defaultStyle
    );
  });
  fightCount = FIGHT_OPTIONS[option].value;
}

function fightOpponent(index, element, count, max) {
  if (count < max) {
    const fightLoading = appendElement({
      type: 'img',
      parent: element,
      style: Object.assign({}, STYLE.FIGHT_LOADING, STYLE.BORDER_RAIUDS),
      attributes: {
        title: 'fighting..',
        src: IMG.LOADING
      }
    });

    // TEST
    setTimeout(() => {
      element.removeChild(fightLoading);
      element.classList.remove(ID.LOADING);
      fightOpponent(index, element, count + 1, max);
    }, TIMEOUT_SPAN);
    // xhrPost(`class=Battle&action=fight&who[id_troll]=${index}`, result => {
    //   element.removeChild(fightLoading);
    //   element.classList.remove(ID.LOADING);
    //   fightOpponent(index, element, count + 1, max);
    // });
  }
}

function main() {
  const board = createBaseInterface();
  createMoneyRetriever(board);
  createFightBlocks(board);
  // createStateModifier(board); // TODO

  selectFightOption(FIGHT_OPTIONS.length - 1);
}
