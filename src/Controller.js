import React, { Component } from 'react';
import D3graph from './D3graph.js';

export default class Controller extends Component {
  state = {
	  color: "", 
    width: "",
    variable: "",
    data: [], 
	  toDraw: [], 
  }
  
  onSubmit = (evt) => {
    evt.preventDefault(); 
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
  	const newShape = {
  	   color: this.state.color, 
       width: this.state.width,
       variable: this.state.variable,
       data: graphData
  	}
    this.setState({ toDraw: [...this.state.toDraw, newShape]})
  } 

  onChange = (evt) => {
  	this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return(
      <div className="controller">
        <form onSubmit={this.onSubmit}>
        <label htmlFor="colorSelect">pick a color:</label>
        <select id="colorSelect" name="color" onChange={this.onChange} value={this.state.color||"default"}>
          <option disabled value="default">choose</option>
          <option value="red">red</option>
          <option value="orange">orange</option>
          <option value="yellow">yellow</option>
        </select>
        <label htmlFor="variableSelect">pick a variable:</label>
        <select id="variableSelect" name="variable" onChange={this.onChange} value={this.state.variable||"default"}>
          <option disabled value="default">choose</option>
          <option value="valueA">valueA</option>
          <option value="valueB">valueB</option>
          <option value="valueC">valueC</option>
        </select>

        <label htmlFor="pixelInput">how big:</label>
        <input id="pixelInput" name="width" onChange={this.onChange} />
        <button type="submit">draw!</button>
        </form>
        { this.state.toDraw.length ? <D3graph shapes={this.state.toDraw}/> : null}
      </div>

    )
  }
}