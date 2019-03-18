// CONFIG
const POST_URL = 'https://www.hentaiheroes.com/ajax.php';
const SOURCE = 'https://raw.githubusercontent.com/FiBoot/hh-script/master'
const TIMEOUT_SPAN = 50;
const ID_PREFIX = 'HHS_';

// FIGHT
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
  'Karole'
];
const FIGHT_OPTIONS = [1, 5, 20];

// IDS
const ID = {
  HH_BODY: 'hh_hentai',
  LOADING: `${ID_PREFIX}LOADING`,
  FLIP_BTN: `${ID_PREFIX}FLIP_BTN`,
  BOARD: `${ID_PREFIX}BOARD`,
  LOADING_BAR: `${ID_PREFIX}LOADING_BAR`,
  FIGHT_OPTION: `${ID_PREFIX}FIGHT_OPTION_`,
  FIGHT_OPTIONS: `${ID_PREFIX}FIGHT_OPTIONS`
};

// IMGS
const IMG = {
  CROSS: 'https://hh.hh-content.com/design_v2/close_cross_icon.png',
  LOADING: 'http://sandboxscpfr.wdfiles.com/local--files/aire-de-sol/filters-load.gif'
};

// STYLE
const STYLE = {
  ABSOLUTE: {
    position: 'absolute',
    top: '8px',
    right: '8px'
  },
  POINTER: {
    cursor: 'pointer'
  },
  MARGIN_TOP: {
    marginTop: '16px'
  },
  MARGIN_LEFT: {
    marginLeft: '16px'
  },
  BORDER_RAIUDS: {
    borderRadius: '8px'
  },

  FLIP_BTN: {
    display: 'none',
    width: '40px',
    height: '40px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
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
  CLOSE: {
    width: '32px',
    height: '32px'
  },
  BOARD: {
    float: 'left',
    backgroundColor: '#4b202c',
    // backgroundImage: 'linear-gradient(to top,#572332 0,#572332 1%,#2c1e1c 100%)',
    borderRadius: '8px',
    padding: '8px',
    color: '#efefef',
    fontFamily: 'sans-serif',
    fontWeight: 'bold'
  },
  BOARD_TITLE: {
    fontSize: '20px',
    paddingTop: '4px'
  },

  LOADING_BAR: {
    height: '32px',
    lineHeight: '32px',
    backgroundImage: 'linear-gradient(.25turn, #32385f, #218fd6)',
    whiteSpace: 'nowrap',
    textAlign: 'center'
  },

  FIGHT_BLOCK: {
    float: 'left',
    position: 'relative',
    margin: '8px 12px',
    padding: '4px',
    backgroundColor: '#f0f0f0'
  },
  OPPONENT_IMG: {
    width: '80px',
    height: '80px',
    backgroundColor: '#848597'
  },
  FIGHT_LOADING: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '88px',
    height: '88px',
    backgroundColor: 'rgba(0,0,0,.5)'
  },

  FIGHT_OPTION: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    margin: '0 8px 0 16px',
    backgroundColor: '#1e2754',
    border: '1.5px solid #f0f0f0',
    borderRadius: '4px',
    boxShadow: 'none'
  },
  FIGHT_OPTION_ON: {
    backgroundColor: '#f3e524',
    boxShadow: '0 0 3px #f3e524'
  }
};

// backgroundImage: 'linear-gradient(.25turn, #710036, #d70f5d)',
