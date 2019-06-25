import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
//import AddIcon from '@material-ui/icons/Add';

//import { makeStyles } from '@material-ui/core/styles';


/*const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const classes = useStyles();*/

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
//import Grid from '@material-ui/core/Grid';
//import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


export default function PaymentForm(props) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [writtenISBN, setISBN] = React.useState("9782070663859")
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ajouter un livre
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <TextField required id="isbn" label="ISBN" fullWidth onChange={(event) => setISBN(event.target.value)} value={writtenISBN}/>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="contained" size="medium" color="primary" disabled={props.fetching} onClick={() => { props.addBook(writtenISBN); setISBN("") } } >
            +
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <div className={classes.demo}>
            <List dense={dense}>
            { props.books.map(
                (book,i) => <ListItem >
                 
                <ListItemAvatar>
                  <Avatar src={book.imageUrl}>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={book.title}
                  secondary={secondary ? 'Secondary text' : null}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="Delete" disabled={props.fetching} onClick={() => props.removeBookAt(i)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction> 
                </ListItem>
              )
            }
                  
            </List>
          </div>
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}
