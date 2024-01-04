import {MDXProvider} from '@mdx-js/react'
import {serialize} from "./serialize";
import {MDXRemote} from "./mdx-remote";
import ThemeDefault from "./themes/default";
import {
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemText,
  ThemeProvider
} from "@mui/material";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import GrainIcon from '@mui/icons-material/Grain';
import SupportIcon from '@mui/icons-material/Support';
import {Editor} from "@monaco-editor/react";

// import {serialize} from "next-mdx-remote/serialize";
const EmailVariable = ({children, color = '#175da8'}) => (
    <span style={{color}}>
    {children}
  </span>
);

export const OrderedListItem = ({id, title, description,color}) => (
    <Box sx={{margin: '0 0 1em 0.5em'}}>
      <Grid sx={{
        border: '1px solid #eaeaea',
        padding: '0.125em 0.5em 0.5em 0.5em',
        borderRadius: '4px'
      }} item container
            spacing={1}
            alignItems={'center'}
            flexWrap={'nowrap'}>
        <Grid item>
          <Avatar sx={{width: 20, height: 20, backgroundColor: color, fontSize: '0.8rem', fontWeight: 700}}>
            {id}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography>{title && <span style={{fontWeight: 700}}>{title}: </span>}{description}</Typography>
        </Grid>
      </Grid></Box>
);

export const UnorderedListItem = ({id, title, description,color}) => (
    <Box sx={{margin: '0 0 1em 0.5em'}}>
      <Grid sx={{
        border: '1px solid #eaeaea',
        padding: '0.125em 0.5em 0.5em 0.5em',
        borderRadius: '4px'
      }} item container
            spacing={1}
            alignItems={'center'}
            flexWrap={'nowrap'}>
        <Grid item>
          <Box sx={{ backgroundColor: color, width: '8px', height: '8px', borderRadius: '100%' }}></Box>
        </Grid>
        <Grid item>
          <Typography>{title && <span style={{fontWeight: 700}}>{title}: </span>}{description}</Typography>
        </Grid>
      </Grid>
    </Box>
);
export const ConversationListItem = ({color = '#000000', author, conversation}) => (
    <Grid sx={{padding: '0.5em 0.125em'}} item container>
      <Grid item>
        <Typography><span style={{fontWeight: 700, color}}>{author}: </span>"{conversation}"</Typography>
      </Grid>
    </Grid>
);


const NumberedList = ({backgroundColor, items = []}) => {

  return (
      <Grid container>
        {items.map((item) => (
            <OrderedListItem id={item.id}/>
        ))}
      </Grid>
  );
};

const EmailTemplate = ({children, subject}) => {

  return (
      <Box sx={{width: '100%', margin: '1em 0', padding: '1em', border: '#eaeaea solid 0.5px', borderRadius: '8px'}}>
        <Typography variant={'body1'} gutterBottom paddingBottom={'0.5em'}>
          Subject: {subject}
        </Typography>
        {children}
      </Box>
  );
};

const StepBody = ({children, height}) => {

  return (
      <Box sx={{width: '100%', padding: '1em 0', height: height, overflowY: 'auto'}}>
        {children}
      </Box>
  );
};

const Header1 = ({children}) => {

  return (
      <Typography variant={'h1'} gutterBottom fontSize={'1.2rem !important'} paddingBottom={'0.5em'} fontWeight={700}>
        {children}
      </Typography>
  );
};

const Header2 = ({children}) => {

  return (
      <Typography variant={'h2'} gutterBottom fontSize={'1rem !important'} padding={'1em 0'} fontWeight={700}>
        {children}
      </Typography>
  );
};

const Paragraph = ({children}) => {

  return (
      <Typography variant={'body1'} fontSize={'1rem'}>
        {children}
      </Typography>
  );
};

const StepHeader = ({icon, title, summary, color}) => {
  return <Grid item xs={12} container spacing={2}>
    <Grid item sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <Box sx={{color, ".MuiSvgIcon-root": {fontSize: '4rem'}}}>
        {icon}
      </Box>
    </Grid>
    <Grid item xs={10} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <Typography sx={{fontWeight: '700'}}>{title}</Typography>
      <Typography color={'#9e9e9e'}>{summary}</Typography>
    </Grid>
    <Grid item xs={12} sx={{paddingTop: '4px !important'}}>
      <Divider sx={{borderBottom: '2px solid black;', width: '100%'}}/>
    </Grid>
  </Grid>;
};

const ProgressTracker = ({total, current, completed = 0, color}) => {

  return <Grid container spacing={1} sx={{paddingTop: '1em'}}>
    <Grid item xs={12}>
      <Typography>Task {current}/{total}</Typography>
    </Grid>
    <Grid item sx={{display: 'flex', alignItems: 'center', maxWidth: '120px', width: '100%'}}>
      <CheckCircleOutlineIcon sx={{color, zIndex: 9999}}/>
      <Box sx={{
        backgroundColor: completed >= 1 ? color : '#e7e7e7',
        height: '12px',
        width: '100%',
        marginLeft: '-4px'
      }}></Box>
    </Grid>
    {Array.from({length: total - 1}).map((it, index) =>
        <Grid item sx={{display: 'flex', alignItems: 'center', maxWidth: '120px', width: '100%'}}>
          <Box sx={{
            backgroundColor: current >= index + 2 ? color : '#e7e7e7',
            height: '12px',
            width: '100%'
          }}></Box>
        </Grid>
    )
    }
    <Grid item xs={12} sx={{paddingTop: '1em !important'}}>
      <Divider sx={{borderBottom: '1px solid #eaeaea;', width: '100%'}}/>
    </Grid>
  </Grid>
}

function App() {
  const [mdx, setMdx] = React.useState(null);

  const handleChange = (value) =>{
    serialize(value).then(r => {
          setMdx(r)
        }
    )
  }

  const components = {
    h1: props => <h1   {...props} />,
    EmailVariable: props => <EmailVariable {...props}/>,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    ExpandMoreIcon,
    OrderedListItem,
    NumberedList,
    ConversationListItem,
    UnorderedListItem,
    StepHeader,
    EmailIcon,
    MeetingRoomIcon,
    GrainIcon,
    SupportIcon,
    EmailTemplate: props => <EmailTemplate {...props}/>,
    Paragraph,
    Header1,
    Header2,
    ProgressTracker,
    StepBody: props => <StepBody {...props} height={'75vh'}/>
  }
  return (
      <ThemeProvider theme={ThemeDefault}>
        <CssBaseline/>
        <div className="App">
          <Grid container p={2} spacing={2} sx={{height:'90vh'}}>
            <Grid item xs={6}>
            <Editor defaultLanguage="mdx" height={'100%'} defaultValue="// some comment" onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <Box sx={{width: '100%', padding: '1em', height: '100vh' -32, overflowY: 'auto',backgroundColor:'#fff'}}>
              <MDXProvider>
                {mdx && <MDXRemote {...mdx} components={components}/>}
              </MDXProvider>
              </Box>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
  );
}

export default App;
