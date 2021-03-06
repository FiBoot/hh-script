// CONFIG
const POST_URL = 'https://www.hentaiheroes.com/ajax.php';
const SOURCE = 'https://raw.githubusercontent.com/FiBoot/hh-script/master';
const TIMEOUT_SPAN = 100;
const ID_PREFIX = 'HHS_';

// PARAMS
const OPPONENTS = [
  'Dark Lord',
  'Espion Ninja',
  'Gruntt',
  'Edwarda',
  'Donatien',
  'Silvanus',
  'Bremen',
  'Finalmecia',
  'Roko',
  'Karole',
  'Equipage de Jackson',
  'Sorciere Pandora',
  'Nike'
];
const STATS = ['sado', 'charm', 'tech'];
const COUNT_OPTIONS = [1, 5, 20];

// IDS
const ID = {
  HH_BODY: 'hh_hentai',
  LOADING: `${ID_PREFIX}LOADING`,
  LOADING_TEXT: `${ID_PREFIX}LOADING_TEXT`,
  FLIP_BTN: `${ID_PREFIX}FLIP_BTN`,
  BOARD: `${ID_PREFIX}BOARD`,
  LOADING_BAR: `${ID_PREFIX}LOADING_BAR`,
  FIGHT_LOADING: `${ID_PREFIX}FIGHT_LOADING`,
  FIGHT_OPTION: `${ID_PREFIX}FIGHT_OPTION_`,
  FIGHT_OPTIONS: `${ID_PREFIX}FIGHT_OPTIONS`
};

// IMGS
const IMG = {
  BTN: 'https://hh.hh-content.com/design/ic_Menu.png',
  CROSS: 'https://hh.hh-content.com/design_v2/close_cross_icon.png',
  LOADING: 'https://hh.hh-content.com/ic_loading_carrot.svg',
  STATS: index => `https://hh.hh-content.com/ic_carac/carac${index}.png`
};

// STYLE
const STYLE = {
  ABSOLUTE: { position: 'absolute' },
  POINTER: { cursor: 'pointer' },
  FLOAT_LEFT: { float: 'left' },
  MARGIN_TOP: { marginTop: '16px' },
  MARGIN_LEFT: { marginLeft: '16px' },
  BORDER_RAIUDS: { borderRadius: '8px' },
  DARK_BACKGROUND: { backgroundColor: '#1e2754' },
  TOP_RIGHT: { top: '8px', right: '8px' },
  BOTTOM_LEFT: { bottom: '8px', left: '8px' },
  ICON_SIZE: { width: '32px', height: '32px' },
  TEXT_SHADOW: {
    textShadow: `
      -1px 0 0 rgba(0, 0, 0, 0.8), 
      1px 0 0 rgba(0, 0, 0, 0.8),
      0 -1px 0 rgba(0, 0, 0, 0.8),
      0 1px 0 rgba(0, 0, 0, 0.8)
    `
  },

  FLIP_BTN: {
    display: 'none',
    width: '40px',
    height: '40px',
    padding: '0',
    backgroundImage: 'linear-gradient(to top,#008ed5 0,#05719c 100%)',
    boxShadow: '0 4px 0 rgba(13,22,25,.6), inset 0 4px 0 #6df0ff',
    border: '1px solid #000'
  },

  BOARD_WRAP: {
    position: 'relative',
    backgroundImage: 'linear-gradient(180deg,#ffa23e,#c41b53)',
    width: '248px',
    padding: '4px',
    zIndex: 10
  },
  BOARD: {
    float: 'left',
    backgroundColor: '#4b202c',
    borderRadius: '8px',
    padding: '8px',
    color: 'white',
    fontFamily: "'Carter One','Alegreya Sans',sans-serif",
    fontWeight: 'bold'
  },
  BOARD_TITLE: {
    fontSize: '20px',
    paddingTop: '4px'
  },

  LOADING_BAR_WRAP: {
    position: 'relative',
    marginLeft: '16px',
    marginRight: '16px',
    backgroundColor: 'rgba(0,0,0,.8)'
  },
  LOADING_BAR: {
    height: '32px',
    lineHeight: '32px',
    backgroundImage: 'linear-gradient(to right,#505889 0,#1e9fdf 100%)',
    whiteSpace: 'nowrap',
    textAlign: 'center'
  },
  LOADING_TEXT: {
    width: '100%',
    top: '0',
    textAlign: 'center',
    lineHeight: '32px'
  },
  MONEY_ICON: {
    top: '0',
    left: '-16px',
    backgroundImage: 'url(https://hh.hh-content.com/design/ic_SC.png)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '32px'
  },

  FIGHT_BLOCK: {
    float: 'left',
    position: 'relative',
    margin: '8px 12px',
    padding: '4px',
    backgroundColor: 'white'
  },
  OPPONENT_TITLE: {
    top: '-8px',
    width: '88px',
    marginLeft: '-4px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    zIndex: 100
  },
  OPPONENT_IMG: {
    width: '80px',
    height: '80px',
    backgroundColor: '#848597'
  },
  FIGHT_LOADING: {
    top: 0,
    left: 0,
    width: '88px',
    height: '88px',
    backgroundColor: 'rgba(0,0,0,.5)',
    textAlign: 'center'
  },

  COUNT_OPTION: {
    display: 'inline-block',
    transform: 'rotate(45deg)',
    width: '16px',
    height: '16px',
    margin: '0 10px 0 20px',
    border: '2px solid #f0f0f0',
    backgroundColor: '#1f2958',
    backgroundImage: 'none',
    boxShadow: 'none'
  },
  COUNT_OPTION_ON: {
    backgroundImage: 'radial-gradient(circle 14px at center,#fff729 0,#ffa200 100%)',
    boxShadow: '0 0 9px rgba(255,150,0,.75)'
  },

  STAT_BLOCK: {
    float: 'left',
    position: 'relative',
    margin: '8px',
    padding: '4px',
    backgroundColor: 'white'
  },
  STAT_IMG: {
    width: '40px',
    height: '40px',
    padding: '4px',
    backgroundImage: 'linear-gradient(to top,#008ed5 0,#05719c 100%)'
  },
  STAT_LOADING: {
    top: 0,
    left: 0,
    width: '56px',
    height: '56px',
    backgroundColor: 'rgba(0,0,0,.5)',
    textAlign: 'center'
  }
};

const ANIMATION = {
  KEYS: [
    { transform: 'rotate(-10deg)' },
    { transform: 'rotate(10deg)' },
    { transform: 'rotate(5deg)' },
    { transform: 'rotate(10deg)' },
    { transform: 'rotate(-10deg)' },
    { transform: 'rotate(-5deg)' }
  ],
  OPTIONS: {
    duration: 500,
    iterations: Infinity
  }
};

const TYPE = {
  DIV: 'div',
  BTN: 'button',
  IMG: 'img',
  LABEL: 'label'
};
