import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Fab from '@material-ui/core/Fab';


import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '26ch',
      },
    },
  },
  Fab: {
    marginLeft:8,
    marginTop:8,
    marginBottom:8,
    [theme.breakpoints.down('xs')]: {
      display:"none"
    },
  }
}));

export default function SearchAppBar(props) {
  const classes = useStyles();

  const [searchValue, setSearchValue] = React.useState('');

  const handleSubmit = (event) => {
    // event.preventDefault()
    axios.get(`https://sismo-api.vercel.app/api/v1/city/cp/${searchValue}`)
      .then(res => {
        props.data(res.data);
        console.log(res.data);
      })
  }

  const handleChange= (event) => {
    setSearchValue(event.currentTarget.value)
  }

  const handleKeypress = (event) => {
    //it triggers by pressing the enter key
  if (event.keyCode === 13) {
    handleSubmit();
  }
};

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Sismo
          </Typography>
          <div className={classes.search} onSubmit={handleSubmit}>
            <div className={classes.searchIcon}>
              <LocationOnIcon />
            </div>
            <InputBase
              placeholder="Rechercher…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              value={searchValue}
              onKeyUp={handleKeypress}
            />
          </div>
          <Fab className={classes.Fab} color="secondary" aria-label="add" size="small" onClick={handleSubmit}>
              <SearchIcon />
            </Fab>
          </Toolbar>
      </AppBar>
    </div>
  );
}