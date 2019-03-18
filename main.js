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
  if (DEVMOD) {
    return setTimeout(() => cb(), TIMEOUT_SPAN);
  }
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
    type: TYPE.BTN,
    style: Object.assign(
      {},
      STYLE.FLIP_BTN,
      STYLE.ABSOLUTE,
      STYLE.TOP_RIGHT,
      STYLE.ICON_SIZE,
      STYLE.BORDER_RAIUDS,
      STYLE.POINTER
    ),
    attributes: {
      id: ID.FLIP_BTN,
      onclick: () => {
        document.getElementById(ID.FLIP_BTN).style.display = 'none';
        document.getElementById(ID.BOARD).style.display = 'block';
      }
    }
  });

  const boardWrap = appendElement({
    type: TYPE.DIV,
    style: Object.assign(
      {},
      STYLE.BOARD_WRAP,
      STYLE.ABSOLUTE,
      STYLE.TOP_RIGHT,
      STYLE.BORDER_RAIUDS
    ),
    attributes: {
      id: ID.BOARD
    }
  });
  appendElement({
    type: TYPE.IMG,
    parent: boardWrap,
    style: Object.assign(
      {},
      STYLE.TOP_RIGHT,
      STYLE.ICON_SIZE,
      STYLE.ABSOLUTE,
      STYLE.POINTER
    ),
    attributes: {
      src: IMG.CROSS,
      onclick: () => {
        document.getElementById(ID.BOARD).style.display = 'none';
        document.getElementById(ID.FLIP_BTN).style.display = 'block';
      }
    }
  });

  const board = appendElement({
    type: TYPE.DIV,
    parent: boardWrap,
    style: Object.assign({}, STYLE.BOARD),
    attributes: {}
  });

  appendElement({
    type: TYPE.DIV,
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
    type: TYPE.DIV,
    parent: board,
    style: Object.assign(
      {},
      STYLE.LOADING_BAR_WRAP,
      STYLE.MARGIN_TOP,
      STYLE.BORDER_RAIUDS,
      STYLE.POINTER
    ),
    attributes: {
      onclick: () => {
        mutex(loadingBar, () => getMoney(0, loadingBar));
      }
    }
  });
  const loadingBar = appendElement({
    type: TYPE.DIV,
    parent: loadWrap,
    style: Object.assign({}, STYLE.LOADING_BAR, STYLE.BORDER_RAIUDS),
    attributes: {
      id: ID.LOADING_BAR
    }
  });
  appendElement({
    type: TYPE.DIV,
    parent: loadWrap,
    style: Object.assign({}, STYLE.LOADING_TEXT, STYLE.ABSOLUTE),
    attributes: { id: ID.LOADING_TEXT }
  });
  appendElement({
    type: TYPE.DIV,
    parent: loadWrap,
    style: Object.assign({}, STYLE.MONEY_ICON, STYLE.ABSOLUTE, STYLE.ICON_SIZE)
  });
  mutex(loadingBar, () => getMoney(0, loadingBar));
}

function createFightBlocks(board) {
  const fightBoard = appendElement({
    type: TYPE.DIV,
    parent: board,
    style: STYLE.MARGIN_TOP
  });

  OPPONENTS.forEach((opponent, index) => {
    const id = `${ID_PREFIX}FIGHT_${index}`;
    const fightBlock = appendElement({
      type: TYPE.DIV,
      parent: fightBoard,
      style: Object.assign(
        {},
        STYLE.FIGHT_BLOCK,
        STYLE.POINTER,
        STYLE.BORDER_RAIUDS
      ),
      attributes: {
        id,
        onclick: () => {
          const element = document.getElementById(id);
          mutex(element, () => fightOpponent(index, element, 0, fightCount));
        }
      }
    });
    appendElement({
      type: TYPE.IMG,
      parent: fightBlock,
      style: Object.assign({}, STYLE.OPPONENT_IMG, STYLE.BORDER_RAIUDS),
      attributes: {
        title: opponent,
        src: `${SOURCE}/img/${index + 1}.png`
      }
    });
  });

  const fightOption = appendElement({
    type: TYPE.DIV,
    parent: fightBoard,
    style: { float: 'left', margin: '10px' }
  });
  FIGHT_OPTIONS.forEach((value, index) => {
    appendElement({
      type: TYPE.DIV,
      parent: fightOption,
      style: Object.assign(
        {},
        STYLE.FIGHT_OPTION,
        STYLE.DARK_BACKGROUND,
        STYLE.POINTER
      ),
      attributes: {
        id: `${ID.FIGHT_OPTION}${index}`,
        onclick: () => selectFightOption(index)
      }
    });
    appendElement({
      type: TYPE.LABEL,
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
      const percent = Math.round((index / girls.length) * 100);
      const textElement = document.getElementById(ID.LOADING_TEXT);
      element.style.width = `${percent}%`;
      textElement.innerText = `${percent}% (${index} / ${girls.length})`;
      const formData = new FormData();
      formData.append('class', 'Girl');
      formData.append('action', 'get_salary');
      formData.append('which', girls[index]);
      xhrPost(formData, () => getMoney(index + 1, element));
    } else {
      element.classList.remove(ID.LOADING);
    }
  } else {
    console.warn('No girls found !');
    element.innerText = 'No girls found !';
  }
}

function selectFightOption(index) {
  const defaultStyle = Object.assign({}, STYLE.FIGHT_OPTION, STYLE.POINTER);
  FIGHT_OPTIONS.forEach((_, i) => {
    Object.assign(
      document.getElementById(`${ID.FIGHT_OPTION}${i}`).style,
      index === i
        ? Object.assign({}, defaultStyle, STYLE.FIGHT_OPTION_ON)
        : defaultStyle
    );
  });
  fightCount = FIGHT_OPTIONS[index];
}

function fightOpponent(index, element, count, max) {
  if (count < max) {
    const fightLoading = appendElement({
      type: TYPE.DIV,
      parent: element,
      style: Object.assign(
        {},
        STYLE.FIGHT_LOADING,
        STYLE.ABSOLUTE,
        STYLE.BORDER_RAIUDS
      )
    });

    const formData = new FormData();
    formData.append('class', 'Battle');
    formData.append('action', 'fight');
    formData.append('who[id_troll]', index + 1);
    xhrPost(formData, result => {
      console.log(result);
      element.removeChild(fightLoading);
      element.classList.remove(ID.LOADING);
      fightOpponent(index, element, count + 1, max);
    });
  }
}

function main() {
  const board = createBaseInterface();
  createMoneyRetriever(board);
  createFightBlocks(board);
  // createStateModifier(board); // TODO

  selectFightOption(FIGHT_OPTIONS.length - 1);
}
