import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';import CopyrightIcon from '@material-ui/icons/Copyright';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginBottom: theme.spacing(3)
  },
  title: {
    color: theme.palette.text.primary,
  },
  dialogContentText: {
    marginBottom: theme.spacing(1)
  },
  gridContainer: {
    width: '100%',
    background: 'rgba(0,0,0,0)'
  },
  fab: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  button: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  }
}));

const LicenceMIT = () => {

  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false)

  const urlMIT = 'https://github.com/baptistelechat/Sismo/blob/main/LICENSE.txt'

  const openLink = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  
  const handleOpenDialog = () => {
    setOpenDialog(true)
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>

    <ListItem button onClick={handleOpenDialog} className={classes.listItem}>
      <ListItemIcon><CopyrightIcon/></ListItemIcon>
      <ListItemText primary={"Licence MIT"} secondary={"Ce projet est sous licence MIT"}/>
    </ListItem>
    <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={classes.title}>Licence MIT</DialogTitle>
        <DialogContent style={{paddingBottom: '16px'}}>
          <DialogContentText className={classes.dialogContentText}>
            Ce projet est sous licence MIT
          </DialogContentText>
          <Grid container spacing={0} className={classes.gridContainer}>
            <Grid item xs={12}>
              <h4>Copyright (c) 2021 Baptiste LECHAT and Matthieu LECHAT</h4>
              <p>
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
              </p>
              <p>
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.

                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
              </p>
            </Grid>
          </Grid>
          <Fab
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="add"
            className={classes.fab}
            onClick={() => openLink(urlMIT)}
            >
            <CopyrightIcon style={{marginRight: '8px'}}/>
              Consulter la licence en ligne
          </Fab>
          <Button color="secondary" className={classes.button} onClick={() => openLink(urlMIT)}>Consulter la licence en ligne</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}

export default LicenceMIT;
