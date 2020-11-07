import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3graph = (props) => {  
  const ref = useRef(null); 

  useEffect(() => { 
   d3.select('.d3graph > *').remove();  
   //d3.select('.svg-d3graph').exit().remove();
   const theGraph = draw(props);
 
 }, [props])
 
  return <svg className="d3graph" width={props.width} height={props.height} />
}

const draw = (props) => {
   console.log(props);
    var data = props.data;    
    var myColor = props.gcolor;
    // Create new data with the selection?
    var dataFilter = data.map(function(d){return {time: d.time, value:d[props.gvar]} }); 
    
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
          .transition()
          .duration(1000)
  
          // Initialize points
      svg.selectAll(".dot")
          .data(dataFilter)
          .enter().append("circle") // Uses the enter().append() method
          .attr("class", "dot") // Assign a class for styling
          .attr("cx", function(d) { return x(+d.time) })
          .attr("cy", function(d) { return y(+d.value) })
          .attr("r", 5)
          .transition()
          .duration(1000)


  }
export default D3graph