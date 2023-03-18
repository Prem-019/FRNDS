import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Slider,
  FormGroup,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const marks = [
  {
    value: 1,
    label: "Never",
  },
  {
    value: 2,
    label: "Rarely",
  },
  {
    value: 3,
    label: "Neutral",
  },
  {
    value: 4,
    label: "Sometimes",
  },
  {
    value: 5,
    label: "Often",
  },
];

const interests = [
  {
    label: "Art",
    value: "art",
  },
  {
    label: "Science",
    value: "science",
  },
  {
    label: "Music",
    value: "music",
  },
  {
    label: "Sports",
    value: "sports",
  },
  {
    label: "Travel",
    value: "travel",
  },
  {
    label: "Technology",
    value: "technology",
  },
  {
    label: "Gaming",
    value: "gaming",
  },
];

export const AccountPreferences = (props) => {
  const [values, setValues] = useState({
    personality1: 0,
    personality2: 0,
    personality3: 0,
    personality4: 0,
    personality5: 0,
    anxiety1: 0,
    anxiety2: 0,
    anxiety3: 0,
    anxiety4: 0,
    anxiety5: 0,
    emotional1: 0,
    emotional2: 0,
    emotional3: 0,
    emotional4: 0,
    emotional5: 0,
    interests : []
  });

  const token = localStorage.getItem('token')

  const [activeStep, setActiveStep] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'))

  const handleNext = () => {
    if (activeStep === 3) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const preferences = JSON.parse(localStorage.getItem('preferences'))
    if(preferences){
      setValues(preferences)
    }
  }, [])
  

  const calcAverage = (item1,item2,item3,item4,item5, personality = false) => {
    let avg= (item1+item2+item3+item4+item5)/5
    if(personality) {
      if(avg>0 && avg<=2){
        return "Introvert"
      }
      else if(avg>2 && avg<=4){
        return "Ambivert"
      }
      else{
        return "Extrovert"
      }
    }
    else{
      return Math.floor(avg)
    }
  }

  
  const updateUser = () => {
    const userData = {
      ...user,
      personality:calcAverage(values.personality1,values.personality2, values.personality3, values.personality4, values.personality5, true),
      anxiety:calcAverage(values.anxiety1,values.anxiety2, values.anxiety3, values.anxiety4, values.anxiety5),
      emotion:calcAverage(values.emotional1,values.emotional2, values.emotional3, values.emotional4, values.emotional5),
      interests:values.interests
    }
    console.log(userData);
    const config = {
      method: "put",
      url: `http://localhost:3100/api/users/profile`,
      headers: { 
        'Authorization': 'Bearer '+ token, 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(userData)
    };

    axios(config)
      .then(function (response) {
        if (response.status === 201) {
          toast.success("Details Updated")
          console.log(response.data, "rez")
          localStorage.setItem("user", JSON.stringify(response.data))
          localStorage.setItem("preferences", JSON.stringify(values))
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.message)
      });
  }

  const components = [
    Personality,
    AnxietyAssessment,
    EmotionalQuotient,
    Interests,
  ];

  return (
    <form autoComplete="off" noValidate {...props}>
      <ToastContainer/>
      <Card>
        <CardHeader
          subheader="The information will be used to match friends and events"
          title="Preferences"
        />
        <Divider />
        <CardContent sx={{ width: "100%" }}>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} nonLinear alternativeLabel>
              <Step key="Personality">
                <StepLabel>Personality</StepLabel>
              </Step>
              <Step key="anxiety">
                <StepLabel>Anxiety Assessment</StepLabel>
              </Step>
              <Step key="emotionalquotient">
                <StepLabel>Emotional Quotient</StepLabel>
              </Step>
              <Step key="interests">
                <StepLabel>Interests</StepLabel>
              </Step>
            </Stepper>
            <>
              {components.map((C, i) =>
                activeStep === i ? <C values={values} stateChanger={setValues} /> : <></>
              )}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext} disabled={activeStep === 3} variant="outlined">
                  Next
                </Button>
              </Box>
            </>
          </Box>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={updateUser}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

const Personality = ({ values, stateChanger }) => {
  
  return (
    <Grid container spacing={3}>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel
            id="personality1"
            required
            fullWidth
            sx={{ alignSelf: "flex-start" }}
          >
            I am uncomfortable being alone.
          </FormLabel>
          <Slider
            label="personality1"
            name="personality1"
            aria-label="personality1"
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.personality1}
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I can be found telling a story to people I just met at a friend's
            house party.
          </FormLabel>
          <Slider
            label="personality2"
            name="personality2"
            aria-label="personality2"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.personality2}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I feel sad when someone cancels a plan.
          </FormLabel>
          <Slider
            label="personality3"
            name="personality3"
            aria-label="personality3"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.personality3}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I like being the centre of attention.
          </FormLabel>
          <Slider
            label="personality4"
            name="personality4"
            aria-label="personality4"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.personality4}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I can not remain still or quiet for a long time.
          </FormLabel>
          <Slider
            label="personality5"
            name="personality5"
            aria-label="personality5"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.personality5}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

const AnxietyAssessment = ({ values, stateChanger }) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel
            id="anxiety"
            required
            fullWidth
            sx={{ alignSelf: "flex-start" }}
          >
            I feel nervous or restless
          </FormLabel>
          <Slider
            label="anxiety1"
            name="anxiety1"
            aria-label="anxiety1"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.anxiety1}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I always brace myself for the worst
          </FormLabel>
          <Slider
            label="anxiety2"
            name="anxiety2"
            aria-label="anxiety2"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.anxiety2}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I experience an increase in heart rate and sweaty palms
          </FormLabel>
          <Slider
            label="anxiety3"
            name="anxiety3"
            aria-label="anxiety3"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.anxiety3}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I have trouble sleeping places
          </FormLabel>
          <Slider
            label="anxiety4"
            name="anxiety4"
            aria-label="anxiety4"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.anxiety4}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I feel trapped in unfamiliar public
          </FormLabel>
          <Slider
            label="anxiety5"
            name="anxiety5"
            aria-label="anxiety5"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.anxiety5}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

const EmotionalQuotient = ({ values, stateChanger }) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel
            id="emotional"
            required
            fullWidth
            sx={{ alignSelf: "flex-start" }}
          >
            I listen carefully when others talk
          </FormLabel>
          <Slider
            label="emotional1"
            name="emotional1"
            aria-label="emotional1"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.emotional1}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I am able to see another person's point of view
          </FormLabel>
          <Slider
            label="emotional2"
            name="emotional2"
            aria-label="emotional2"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.emotional2}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I don't mind being friends with people with health conditions
          </FormLabel>
          <Slider
            label="emotional3"
            name="emotional3"
            aria-label="emotional3"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.comfortability}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I'm good at adapting and mixing with different personalities
          </FormLabel>
          <Slider
            label="emotional4"
            name="emotional4"
            aria-label="emotional4"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.emotional4}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl fullWidth>
          <FormLabel required fullWidth sx={{ alignSelf: "flex-start" }}>
            I always try to understand how another person feels and thinks
          </FormLabel>
          <Slider
            label="emotional5"
            name="emotional5"
            aria-label="emotional5"
            // defaultValue={5}
            step={1}
            min={1}
            max={5} 
            onChange={(e) => stateChanger({...values, [e.target.name]: e.target.value})}
            value={values.emotional5}
            //   valueLabelDisplay="auto"
            marks={marks}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

const Interests = ({values, stateChanger}) => {

  const handleInterests = (e) => {
    let interestsArr = values.interests
    if(interestsArr.includes(e.target.value)){
      interestsArr.pop(e.target.value)
      stateChanger({...values, interests: interestsArr})
    }
    else{
      interestsArr.push(e.target.value)
      stateChanger({...values, interests: interestsArr})
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item md={12} xs={12} mx={1} mr={6}>
        <FormControl required variant="standard" fullWidth>
          <FormGroup>
            {interests.map((interest) => {
              return (
                <FormControlLabel
                  sx={{ alignSelf: "flex-start", mx: 1 }}
                  control={
                    <Checkbox name={interest.value} value={interest.value} onChange={handleInterests} checked={values["interests"].includes(interest.value)} />
                  }
                  label={interest.label}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};
