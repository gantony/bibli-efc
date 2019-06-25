import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Nom(s)', 'Ajouter livres', 'Livres empruntés'];

// let myState = { name: "Yo!"}





export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [name, setName] = React.useState("Yo!");
  const [email, setEmail] = React.useState("");
  const [books, setBooks] = React.useState([
    {ISBN: "ISBN1", title: "Book title 1", imageUrl: "https://pictures.abebooks.com/isbn/9780321543257-us-300.jpg"}, 
    {ISBN: "ISBN2", title: "Book title 2", imageUrl: "https://pictures.abebooks.com/isbn/9780857809704-us-300.jpg"}
  ]);
  const [fetching, setFetching] = React.useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const searchBook = (isbn) => {
    const indexToUpdate = books.length;
    setFetching(true);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("Response: ", xhr.responseText);
            updateBook(JSON.parse(xhr.responseText), indexToUpdate)
            setFetching(false);
        }
        // TODO: Handle failure or bad result???
    }
    xhr.open('GET', 'http://localhost:56608/search/' + isbn, true);
    xhr.send(null);

    addBook({fetching: true, title: "Book with ISBN " + isbn, imageUrl: "https://loading.io/spinners/rolling/index.curve-bars-loading-indicator.gif"})
    //setTimeout(() => { addBook({isbn: isbn, title: "newBook...."}) }, 3000)
  }
  const addBook = (bookJson) => {
    setBooks(books.concat(bookJson));
  }

  const updateBook = (bookJson, index) => {
    let updateContent = bookJson;
    if (!bookJson.hasOwnProperty('title') && bookJson.hasOwnProperty('isbn')) {
      updateContent = {title: "Cannot find book with ISBN " + bookJson.isbn, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/Crystal_button_cancel.svg"}
    }
    books[index] = updateContent;
    setBooks(books);
  }
  const removeBookAt = (index) => {
    if (index >= 0) {
      setBooks(books.slice(0, index).concat(books.slice(index+1)))
    } else {
      setBooks(books)   // No op
    }
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm name={name} setName={setName} email={email} setEmail={setEmail} />;
      case 1:
        return <PaymentForm name={"TEST"} books={books} removeBookAt={removeBookAt} addBook={searchBook} fetching={fetching} />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Bibli EFC
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Emprunt
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <MadeWithLove />
      </main>
    </React.Fragment>
  );
}
