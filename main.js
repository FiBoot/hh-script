let requestCount;

// UTILS

function isDev() {
  return typeof DEVMOD !== 'undefined' && DEVMOD;
}

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
  if (isDev()) {
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

// DOM CREATION

function createBaseInterface() {
  const flipBtn = appendElement({
    type: TYPE.BTN,
    style: Object.assign(
      {},
      STYLE.FLIP_BTN,
      STYLE.ABSOLUTE,
      STYLE.BOTTOM_LEFT,
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

  appendElement({
    type: TYPE.IMG,
    parent: flipBtn,
    style: { width: '28px' },
    attributes: {
      alt: '',
      title: 'Open script panel',
      src: IMG.BTN
    }
  });

  const boardWrap = appendElement({
    type: TYPE.DIV,
    style: Object.assign(
      {},
      STYLE.BOARD_WRAP,
      STYLE.ABSOLUTE,
      STYLE.BOTTOM_LEFT,
      STYLE.BORDER_RAIUDS
    ),
    attributes: {
      id: ID.BOARD
    }
  });
  appendElement({
    type: TYPE.IMG,
    parent: boardWrap,
    style: Object.assign({}, STYLE.TOP_RIGHT, STYLE.ICON_SIZE, STYLE.ABSOLUTE, STYLE.POINTER),
    attributes: {
      alt: 'cross',
      title: 'Close panel',
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
    style: Object.assign({}, STYLE.BOARD)
  });

  appendElement({
    type: TYPE.DIV,
    parent: board,
    style: Object.assign({}, STYLE.BOARD_TITLE, STYLE.TEXT_SHADOW),
    attributes: {
      innerText: isDev() ? 'DEVMOD' : 'Script panel'
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
    style: Object.assign({}, STYLE.LOADING_TEXT, STYLE.ABSOLUTE, STYLE.TEXT_SHADOW),
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
    style: Object.assign({}, STYLE.MARGIN_TOP, STYLE.FLOAT_LEFT)
  });

  OPPONENTS.forEach((opponent, index) => {
    const id = `${ID_PREFIX}FIGHT_${index}`;
    const fightBlock = appendElement({
      type: TYPE.DIV,
      parent: fightBoard,
      style: Object.assign({}, STYLE.FIGHT_BLOCK, STYLE.POINTER, STYLE.BORDER_RAIUDS),
      attributes: {
        id,
        onclick: () => {
          const element = document.getElementById(id);
          mutex(element, () => fight(index, element));
        }
      }
    });
    appendElement({
      type: TYPE.DIV,
      parent: fightBlock,
      style: Object.assign({}, STYLE.OPPONENT_TITLE, STYLE.ABSOLUTE, STYLE.TEXT_SHADOW),
      attributes: { innerText: opponent }
    });
    appendElement({
      type: TYPE.IMG,
      parent: fightBlock,
      style: Object.assign({}, STYLE.OPPONENT_IMG, STYLE.BORDER_RAIUDS),
      attributes: {
        alt: '',
        title: opponent,
        src: isDev() ? '' : `${SOURCE}/img/${index + 1}.png`
      }
    });
  });
}

function createCountBlocks(board) {
  const countOptions = appendElement({
    type: TYPE.DIV,
    parent: board,
    style: Object.assign({ margin: '8px 0' }, STYLE.FLOAT_LEFT)
  });
  COUNT_OPTIONS.forEach((value, index) => {
    appendElement({
      type: TYPE.DIV,
      parent: countOptions,
      style: Object.assign({}, STYLE.COUNT_OPTION, STYLE.DARK_BACKGROUND, STYLE.POINTER),
      attributes: {
        id: `${ID.FIGHT_OPTION}${index}`,
        onclick: () => selectCountOption(index)
      }
    });
    appendElement({
      type: TYPE.LABEL,
      parent: countOptions,
      style: STYLE.TEXT_SHADOW,
      attributes: {
        innerText: `x${value}`
      }
    });
  });
}

function createStatsBlocks(board) {
  const statsBlock = appendElement({
    type: TYPE.DIV,
    parent: board,
    style: Object.assign({ marginLeft: '4px' }, STYLE.FLOAT_LEFT)
  });
  STATS.forEach((stat, index) => {
    const statBlock = appendElement({
      type: TYPE.DIV,
      parent: statsBlock,
      style: Object.assign({}, STYLE.STAT_BLOCK, STYLE.BORDER_RAIUDS, STYLE.POINTER),
      attributes: {
        onclick: () => {
          mutex(statBlock, () => stats(index, statBlock));
        }
      }
    });
    appendElement({
      type: TYPE.IMG,
      parent: statBlock,
      style: Object.assign({}, STYLE.STAT_IMG, STYLE.BORDER_RAIUDS),
      attributes: {
        alt: stat,
        title: stat,
        src: IMG.STATS(index + 1)
      }
    });
  });
}

// FUNCTIONS

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

function selectCountOption(index) {
  const defaultStyle = Object.assign({}, STYLE.COUNT_OPTION, STYLE.POINTER);
  COUNT_OPTIONS.forEach((_, i) => {
    Object.assign(
      document.getElementById(`${ID.FIGHT_OPTION}${i}`).style,
      index === i ? Object.assign({}, defaultStyle, STYLE.COUNT_OPTION_ON) : defaultStyle
    );
  });
  requestCount = COUNT_OPTIONS[index];
}

function fight(index, element) {
  const fightLoading = appendElement({
    type: TYPE.DIV,
    parent: element,
    style: Object.assign({}, STYLE.FIGHT_LOADING, STYLE.ABSOLUTE, STYLE.BORDER_RAIUDS),
    attributes: { id: ID.FIGHT_LOADING }
  });
  appendElement({
    type: TYPE.IMG,
    parent: fightLoading,
    style: { width: '64px', marginTop: '4px' },
    attributes: {
      alt: 'loading',
      src: IMG.LOADING
    }
  }).animate(ANIMATION.KEYS, ANIMATION.OPTIONS);

  fightOpponents(index, element, 1, requestCount);
}

function fightOpponents(index, element, count, max) {
  const formData = new FormData();
  formData.append('class', 'Battle');
  formData.append('action', 'fight');
  formData.append('who[id_troll]', index + 1);
  xhrPost(formData, result => {
    if (count < max) {
      fightOpponents(index, element, count + 1, max);
    } else {
      element.removeChild(document.getElementById(ID.FIGHT_LOADING));
      element.classList.remove(ID.LOADING);
    }
  });
}

function stats(index, element) {
  const statLoading = appendElement({
    type: TYPE.DIV,
    parent: element,
    style: Object.assign({}, STYLE.STAT_LOADING, STYLE.ABSOLUTE, STYLE.BORDER_RAIUDS),
    attributes: { id: ID.FIGHT_LOADING }
  });
  appendElement({
    type: TYPE.IMG,
    parent: statLoading,
    style: { width: '40px', marginTop: '4px' },
    attributes: {
      alt: 'loading',
      src: IMG.LOADING
    }
  }).animate(ANIMATION.KEYS, ANIMATION.OPTIONS);

  statsUp(index, element, 1, requestCount);
}

function statsUp(index, element, count, max) {
  const formData = new FormData();
  formData.append('class', 'Hero');
  formData.append('action', 'update_stats');
  formData.append('carac', index + 1);
  xhrPost(formData, result => {
    if (count < max) {
      statsUp(index, element, count + 1, max);
    } else {
      element.removeChild(document.getElementById(ID.FIGHT_LOADING));
      element.classList.remove(ID.LOADING);
    }
  });
}

// MAIN

function main() {
  const board = createBaseInterface();
  createMoneyRetriever(board);
  createFightBlocks(board);
  createCountBlocks(board);
  createStatsBlocks(board);

  selectCountOption(COUNT_OPTIONS.length - 1);
}
