import React, { Component } from 'react';
import D3graph from './D3graph';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PieHooks from "./PieHooks";
import * as d3 from "d3";
import { graphData } from "./Data/basicdata";


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other} >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Controller = props => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const generateData = (value, length = 5) =>
  d3.range(length).map((item, index) => ({
    date: index,
    value: value === null || value === undefined ? Math.random() * 100 : value
  }));

  const [data, setData] = React.useState(generateData());
  const changeData = () => {
    setData(generateData());
  };

  //const [graph, setGraph] = React.useState({myGraph: { color: "red", variable: "valueA", data: graphData}});
  const [color, setColor] = React.useState("red");
  const [variable, setVariable] = React.useState("valueA");

  const colorChange = (evt) => {
    setColor(evt.target.value);
  }

  const variableChange = (evt) => {    
    setVariable(evt.target.value);    
  }

//TODO swap select for material UI one
  //render() {
    return(
      <div className="controller">
        <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Line Chart" {...a11yProps(0)} />
          <Tab label="Pie Chart" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div>
          <Select id="select-variable" name="variable" value={variable} onChange={variableChange}>
              <MenuItem value={"valueA"}>valueA</MenuItem>
              <MenuItem value={"valueB"}>valueB</MenuItem>
              <MenuItem value={"valueC"}>valueC</MenuItem>
            </Select>
            <Select id="select-color" name = "color" value={color} onChange={colorChange}>
              <MenuItem value={"red"}>red</MenuItem>
              <MenuItem value={"orange"}>orange</MenuItem>
              <MenuItem value={"yellow"}>yellow</MenuItem>
            </Select>   
          </div>    
            <D3graph gcolor={color} gvar = {variable} data={graphData}  width={500}
          height={500}/> 
            <div>
                  Graph colour should be: {color} and varable should be {variable}
            </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div>
      <button onClick={changeData}>Transform</button>
      </div>
        <PieHooks
          data={data}
          width={500}
          height={500}
          innerRadius={60}
          outerRadius={100}
        />     
      </TabPanel>
      </div>



        
      

    )
    
  //}
}
export default Controller;