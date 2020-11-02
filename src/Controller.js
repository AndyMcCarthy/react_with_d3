import React, { Component } from 'react';
import D3graph from './D3graph';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import PieHooks from "./PieHooks";
import * as d3 from "d3";

//export default class Controller extends Component {
//export default function Controller() {
const Controller = props => {

  const generateData = (value, length = 5) =>
  d3.range(length).map((item, index) => ({
    date: index,
    value: value === null || value === undefined ? Math.random() * 100 : value
  }));

  const generateColor = (value) => ({
    value: value ===null  || value === undefined ? "red" : value
  });

  const [data, setData] = React.useState(generateData());
  const changeData = () => {
    setData(generateData());
  };

  const graphData= [
    {time:0, valueA:5, valueB:5, valueC:13},
    {time:1, valueA:4, valueB:5, valueC:13},
    {time:2, valueA:3, valueB:6, valueC:15},
    {time:3, valueA:1, valueB:7, valueC:16},
    {time:4, valueA:0, valueB:8, valueC:17},
    {time:5, valueA:1, valueB:9, valueC:18},
    {time:6, valueA:2, valueB:10, valueC:19},
    {time:7, valueA:3, valueB:11, valueC:18},
    {time:8, valueA:4, valueB:12, valueC:17},
    {time:9, valueA:5, valueB:13, valueC:14},
  ]

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
        <D3graph gcolor={color} gvar = {variable} data={graphData}/> 
        <div>
              Graph colour should be: {color} and varable should be {variable}
        </div>


        <div>
      <button onClick={changeData}>Transform</button>
      </div>
      <div>
        <span className="label">Hooks</span>
        <PieHooks
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
          gcolor = {color}
        />
      </div>

      </div>

    )
    
  //}
}
export default Controller;