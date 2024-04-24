import { AppBar, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import Customerlist from './components/Customerlist'
import { useState } from 'react';
import { TabPanel, a11yProps } from './components/TabPanel';
import Trainingslist from './components/Trainings';
import './App.css';
import TrainingsCalendar from './components/Calendar';
import TrainingChart from './components/TrainingChart';


function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    

<div className="App">

  <AppBar position='static'>
  <Typography variant='h3'>Personal trainer Customers</Typography>
  </AppBar>


<Toolbar>
  
  
<Tabs value={selectedTab} onChange={handleChange}>
  <Tab 
    label="Customers" 
    {...a11yProps(0)} 
    className={selectedTab === 0 ? 'tab-selected' : ''} 
  />
  <Tab 
    label="Trainings" 
    {...a11yProps(1)} 
    className={selectedTab === 1 ? 'tab-selected' : ''} 
  />
   <Tab 
    label="Calendar" 
    {...a11yProps(2)} 
    className={selectedTab === 2 ? 'tab-selected' : ''} 
  />
    <Tab 
    label="Chart" 
    {...a11yProps(3)} 
    className={selectedTab === 3 ? 'tab-selected' : ''} 
  />
</Tabs>



</Toolbar>

<TabPanel value={selectedTab} index={0}>

<Customerlist />

</TabPanel>

<TabPanel value={selectedTab} index={1}>

  <Trainingslist />

</TabPanel>

<TabPanel value={selectedTab} index={2}>

  <TrainingsCalendar />
  
</TabPanel>

<TabPanel value={selectedTab} index={3}>

  <TrainingChart />

</TabPanel>
</div>
    
  )
}

export default App
