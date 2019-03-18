// CONFIG
const POST_URL = 'https://www.hentaiheroes.com/ajax.php';
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
    top: '.5em',
    right: '.5em'
  },
  POINTER: {
    cursor: 'pointer'
  },
  MARGIN_TOP: {
    marginTop: '1em'
  },
  MARGIN_LEFT: {
    marginLeft: '1em'
  },
  BORDER_RAIUDS: {
    borderRadius: '.5em'
  },

  FLIP_BTN: {
    display: 'none',
    width: '3em',
    height: '3em',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'linear-gradient(to top,#008ed5 0,#05719c 100%)',
    boxShadow: '0 .2em 0 rgba(13,22,25,.6), inset 0 .2em 0 #6df0ff',
    border: '.1em solid #000'
  },

  BOARD_WRAP: {
    position: 'relative',
    backgroundImage: 'linear-gradient(180deg,#ffa23e,#c41b53)',
    width: '15em',
    padding: '.2em',
    zIndex: 10
  },
  CLOSE: {
    width: '2em',
    height: '2em'
  },
  BOARD: {
    float: 'left',
    backgroundImage: 'linear-gradient(to top,#572332 0,#572332 1%,#2c1e1c 100%)',
    backgroundSize: '8em',
    borderRadius: '.35em',
    padding: '.5em',
    color: '#eee',
    fontFamily: 'sans-serif',
    fontWeight: 'bold'
  },
  BOARD_TITLE: {
    fontSize: '1.2em',
    paddingTop: '.2em'
  },

  LOADING_BAR: {
    height: '2em',
    lineHeight: '2em',
    backgroundImage: 'linear-gradient(.25turn, #32385f, #218fd6)',
    whiteSpace: 'nowrap',
    textAlign: 'center'
  },

  FIGHT_BLOCK: {
    float: 'left',
    position: 'relative',
    margin: '.75em',
    padding: '.25em',
    backgroundColor: '#f0f0f0'
  },
  OPPONENT_IMG: {
    width: '5em',
    height: '5em'
  },
  FIGHT_LOADING: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '5.5em',
    height: '5.5em',
    backgroundColor: 'rgba(0,0,0,.5)'
  },

  FIGHT_OPTION: {
    display: 'inline-block',
    width: '1em',
    height: '1em',
    margin: '0 .2em 0 .8em',
    backgroundColor: '#1e2754',
    border: '.1em solid #f0f0f0',
    borderRadius: '.2em',
    boxShadow: 'none'
  },
  FIGHT_OPTION_ON: {
    backgroundColor: '#f3e524',
    boxShadow: '0 0 .5em #f3e524'
  }
};

// backgroundImage: 'linear-gradient(.25turn, #710036, #d70f5d)',
