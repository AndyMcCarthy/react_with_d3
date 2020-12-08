import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HorizontalGraph = (props) => {  
  const ref = useRef(null); 

  useEffect(() => { 
   d3.select('.d3dotplot > *').remove();  
   //d3.select('.svg-d3graph').exit().remove();
   const theGraph = draw(props);
 
 }, [props])
 
  return <svg className="d3dotplot" width={props.width} height={props.height} />
}


const draw = (props) => {
    console.log(props);
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 40, left: 100},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(".d3dotplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

      // List of subgroups = header of the csv files = soil condition here
      let AElist = props.data.map(x => x.AE);
      let groups = AElist.filter((v, i, a) => a.indexOf(v) === i);
      console.log(groups)
      // List of groups = species here = value of the first column called group -> I show them on the X axis
      var rxgroups =  props.data.map(x => x.treatment);
      let subgroups = rxgroups.filter((v, i, a) => a.indexOf(v) === i);
      console.log(subgroups)

      //pivot the data
      //for (i in groups){
      //    console.log(i);
      //}
    const madness = groups.map(x => props.data.filter(y => x == y.AE )
    .reduce((ac, p) => ({...ac, AE:x, [p.treatment]: p.relative_risk }), {} ))
   

      let mydata = Object.assign(madness)

      console.log(mydata)
      

        // Add X axis
        var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0));

        // Another scale for subgroup position?
        var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, 100])
        .range([ height, 0 ]);
        svg.append("g")
        .call(d3.axisLeft(y));

        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#e41a1c','#377eb8','#4daf4a', '#69b3a2', '#A020F0']);
 
                svg.selectAll("myline")
                // Enter in data = loop group per group
                .data(mydata)
                .enter()
                .append("g")
                .attr("transform", function(d) { return "translate(" + x(d.AE) + ",0)"; })
                .selectAll("line")
                .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
                .enter().append("line")
                .attr("x1", function(d) { return xSubgroup(d.key); })
                .attr("x2", function(d) { return xSubgroup(d.key); })
                .attr("y1", function(d) { return y(d.value); })
                .attr("y2", function(d) { return y(0); })
                .attr("stroke", function(d) { return color(d.key); });

                svg.selectAll("mycircle")
                // Enter in data = loop group per group
                .data(mydata)
                .enter()
                .append("g")
                .attr("transform", function(d) { return "translate(" + x(d.AE) + ",0)"; })
                .selectAll("circle")
                .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
                .enter().append("circle")
                .attr("cx", function(d) { return xSubgroup(d.key); })
                .attr("cy", function(d) { return y(d.value); })
                .attr("r", "4")
                .attr("fill", function(d) { return color(d.key); })
                .attr("stroke", function(d) { return color(d.key); });

                //Legend
                var legend = svg.selectAll(".legend")
                .data(mydata.map(function(d) { return d.key; }).reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
                .style("opacity","0");

                legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", function(d) { return color(d); });

                legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) {return d; });
 
 
 
   }
 export default HorizontalGraph