import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Fab from '@material-ui/core/Fab';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import axios from 'axios'
import MyDrawer from './drawer';

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
  fab: {
    marginLeft:theme.spacing(2),
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      display:"none"
    },
  },
  snackbar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MyRadio = withStyles({
  root: {
    color: '#fff',
    '&$checked': {
      color: '#fff',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function SearchAppBar(props) {

  const classes = useStyles();

  const [searchValue, setSearchValue] = React.useState('');
  const [param, setParam] = React.useState('cp');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [resultLength, setResultLength] = React.useState(-1);
  const [result, setResult] = React.useState('');

  const handleSubmit = (event) => {
    axios.get(`https://sismo-api.vercel.app/api/v1/city/${param}/${searchValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("'"," ").toUpperCase().replace("SAINT","ST").replace("SAINTE","STE").split('-').join(' ')}`)
      .then(res => {
        props.data(res.data);
        console.log(res.data);
        props.indexSelected(-1);
        setOpenSnackbar(true)
        setResultLength(res.data.length)
        setResult(res.data)
      })

    // axios.get(`http://localhost:8000/api/v1/city/${param}/${searchValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("'"," ").toUpperCase().replace("SAINT","ST").replace("SAINTE","STE").split('-').join(' ')}`)
    //   .then(res => {
    //     props.data(res.data);
    //     console.log(res.data);
    //   })
  }

  const handleChange= (event) => {
      setSearchValue(event.currentTarget.value)
  }

  const handleChangeRadio = (event) => {
    const param = event.currentTarget.value
    setParam(param);
    console.log(param)
  };

  const handleKeypress = (event) => {
    //it triggers by pressing the enter key
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const snackbarTest = () => {
    if (resultLength>1 && param === 'cp') {
      return `${resultLength} résultats trouvés pour le code postal : ${searchValue}`
    }
    if (resultLength>1 && param === 'insee') {
      return `${resultLength} résultats trouvés pour le code INSEE : ${searchValue}`
    }
    if (resultLength>1 && param === 'name') {
      return `${resultLength} résultats trouvés pour la valeur : ${searchValue}`
    }
    if (resultLength===1 && param === 'cp') {
      return `${resultLength} résultat trouvé pour le code postal : ${searchValue}`
    }
    if (resultLength===1 && param === 'insee') {
      return `${resultLength} résultat trouvé pour le code INSEE : ${searchValue}`
    }
    if (resultLength===1 && param === 'name') {
      return `${resultLength} résultat trouvé pour la valeur : ${searchValue}`
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <MyDrawer/> 
          <Typography className={classes.title} variant="h6" noWrap>
            Sismo
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="parameters" name="params" value={param} onChange={handleChangeRadio}>
              <FormControlLabel value="cp" control={<MyRadio/>} label="Code Postal"/>
              <FormControlLabel value="insee" control={<MyRadio/>} label="Code INSEE" />
              <FormControlLabel value="name" control={<MyRadio />} label="Nom" />
            </RadioGroup>
          </FormControl>
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
          <Fab className={classes.fab} color="secondary" aria-label="add" size="small" onClick={handleSubmit}>
              <SearchIcon />
            </Fab>
          </Toolbar>
      </AppBar>
      <div className={classes.snackbar}>
        {result.[0] !== "Aucune valeur correspondante à votre recherche" ? 
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            {snackbarTest()}
          </Alert>
        </Snackbar> : 
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}  anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}>
          <Alert onClose={handleCloseSnackbar} severity="error">
            Aucune valeur correspondante à votre recherche
          </Alert>
        </Snackbar>}
      </div>
    </div>
  );
}
