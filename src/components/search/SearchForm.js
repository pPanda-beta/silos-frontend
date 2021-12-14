import {QuadStateView} from '../QuadStateView';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Snackbar,
  TextField
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {useBoundStateObject} from '../../data/common';
import {profileService} from '../../services/profile';

const FormSubmit = ({onclick, req}) => (
    <QuadStateView
        sideEffectFn={onclick}
        initComponentFn={
          (_, trigger) =>
              <Button variant="contained" color="primary"
                      onClick={() => trigger(req)}>
                Search & Save
              </Button>
        }
        inProgressComponentFn={
          () =>
              <Button variant="contained" color="primary" disabled>
                <pre>Downloading to browser</pre>
                <CircularProgress/>
              </Button>
        }
        successComponentFn={
          ({data}, __, reset) =>
              <>
                <Button variant="contained" color="primary" disabled>
                  Done
                </Button>
                <Snackbar open autoHideDuration={2000} onClose={reset}>
                  <Alert onClose={reset} severity="success">
                    Found some results
                  </Alert>
                </Snackbar>
              </>
        }
        errorComponentFn={
          ({error}, _, reset) =>
              <>
                <Button variant="contained" color="primary" disabled>
                  Error
                </Button>
                <Snackbar open autoHideDuration={5000} onClose={reset}>
                  <Alert onClose={reset} severity="error">
                    Failed to search!
                    Error : {error?.toString()}
                  </Alert>
                </Snackbar>
              </>
        }

    />);

const SearchForm = () => {
  const {state: req, keyBinder, keyBasedStateSetter} = useBoundStateObject({
    "gender": "Female",
    "start": 1,
    "rows": 10,
    "ageFrom": "25",
    "ageTo": "30",
  });

  const onChangeBinder = keyBinder({
    listenerType: "onChange",
    injectProp: "value",
  });

  const setStart = keyBasedStateSetter("start");

  const searchAndSave = async (...args) => {
    const result = await profileService.searchAndGather(...args);
    setStart(req.start + req.rows);
    return result;
  };
  return (
      <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
      >

        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
              aria-label="gender"
              name="radio-buttons-group"

              {...onChangeBinder("gender")}
          >
            <FormControlLabel value="Female" control={<Radio/>} label="Female"/>
            <FormControlLabel value="Male" control={<Radio/>} label="Male"/>
          </RadioGroup>
        </FormControl>

        <TextField
            variant="outlined"
            label="Age From"
            type="number"
            InputLabelProps={{shrink: true,}}
            {...onChangeBinder("ageFrom")}
        />
        <TextField
            variant="outlined"
            label="Age To"
            type="number"
            InputLabelProps={{shrink: true,}}
            {...onChangeBinder("ageTo")}
        />


        <TextField
            variant="outlined"
            label="Start position"
            type="number"
            InputLabelProps={{shrink: true,}}
            {...onChangeBinder("start", parseInt)}
        />
        <TextField
            variant="outlined"
            label="No of rows"
            type="number"
            InputLabelProps={{shrink: true,}}
            {...onChangeBinder("rows", parseInt)}
        />


        <FormSubmit onclick={searchAndSave} req={req}/>
      </Grid>
  );
};

export default SearchForm;