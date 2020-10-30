import React, { useEffect } from 'react';
import * as d3 from 'd3';

const D3graph = (props) => {
  console.log(props)
  useEffect(() => {
   d3.select('.d3graph > *').remove();
   draw(props)
 }, [props.shapes.length])
  return <div className="d3graph" />
}

const draw = (props) => {
    console.log(props.shapes.length);
    var data = props.shapes[0].data;
    console.log(data);
    var myColor = props.shapes[0].color;
    console.log(myColor);
    // Create new data with the selection?
    var dataFilter = data.map(function(d){return {time: d.time, value:d[props.shapes[0].variable]} }); 
    console.log(dataFilter);
    //const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    //const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 30},
    w = 460 - margin.left - margin.right,
    h = 300 - margin.top - margin.bottom;

    var svg = d3.select('.d3graph').append('svg')
      .attr('height', h + margin.top + margin.bottom)
      .attr('width', w + margin.left + margin.right)
      .attr('id', 'svg-d3graph')
      .append("g")
      .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


      // Add X axis --> it is a date format
 // Add X axis
 var x = d3.scaleLinear()
 .domain([0, 10])
 .range([ 0, w]);
  svg.append("g")
  .attr("transform", "translate(0," + h + ")")
  .call(d3.axisBottom(x));

    // Add Y axis
  var y = d3.scaleLinear()
      .domain( [0,20])
      .range([ h, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));


    // Initialize line
        svg.append('g')
        .append("path")
          .datum(dataFilter)
          .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.value) })
          )
          .attr("stroke", myColor)
          .style("stroke-width", 4)
          .style("fill", "none") 
  
  
  
          // Initialize points
      svg.selectAll(".dot")
          .data(dataFilter)
          .enter().append("circle") // Uses the enter().append() method
          .attr("class", "dot") // Assign a class for styling
          .attr("cx", function(d) { return x(+d.time) })
          .attr("cy", function(d) { return y(+d.value) })
          .attr("r", 5)


  }
export default D3graph