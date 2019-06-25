import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm(props) {
  return (
    <React.Fragment>
      {/*<Typography variant="h6" gutterBottom>
        Qui emprunte ?
  </Typography>*/}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="noms"
            name="noms"
            label="Nom(s)"
            fullWidth
            autoComplete="noms"
            value={props.name}
            onChange={(event) => props.setName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            value={props.email}
            onChange={(event) => props.setEmail(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          {/*<FormControlLabel
            control={<Checkbox color="secondary" name="Envoyer liste de livres par email" value="yes" />}
            label="Use this address for payment details"
          />*/}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
