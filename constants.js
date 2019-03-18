const POST_URL = 'https://www.hentaiheroes.com/ajax.php';
const TIMEOUT_SPAN = 30;
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

const ID_PREFIX = 'HHS_';
const ID = {
  HH_BODY: 'hh_hentai',
  FLIP_BTN: `${ID_PREFIX}FLIP_BTN`,
  BOARD: `${ID_PREFIX}BOARD`,
  LOADING_BAR: `${ID_PREFIX}LOADING_BAR`
};

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
  BORDER_RAIUDS: {
    borderRadius: '0.5em'
  },

  FLIP_BTN: {
    width: '3em',
    height: '3em',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'linear-gradient(to top,#008ed5 0,#05719c 100%)',
    boxShadow: '0 3px 0 rgba(13,22,25,.6), inset 0 3px 0 #6df0ff',
    border: '1px solid #000'
  },

  BOARD_WRAP: {
    position: 'relative',
    display: 'none',
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
    borderRadius: '0.35em',
    padding: '.5em',
    color: '#eee',
    fontFamily: 'sans-serif'
  },
  BOARD_TITLE: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    paddingTop: '0.2em'
  },

  LOADING_BAR: {
    height: '2em',
    lineHeight: '2em',
    backgroundColor: 'green',
    whiteSpace: 'nowrap',
    textAlign: 'center'
  },

  FIGHT_BLOCK: {
    float: 'left',
    width: '6em',
    height: '6em',
    margin: '.5em',
    backgroundColor: '#555'
  }
};
