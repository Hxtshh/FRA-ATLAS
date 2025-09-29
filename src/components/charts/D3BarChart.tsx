import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface D3BarChartProps {
  data: { label: string; value: number; color?: string }[];
  width?: number;
  height?: number;
  title?: string;
}

const D3BarChart: React.FC<D3BarChartProps> = ({
  data,
  width = 400,
  height = 300,
  title
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .range([innerHeight, 0]);

    // Color scale
    const colorScale = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, data.length - 1]);

    // Bars
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.label) || 0)
      .attr("y", innerHeight)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("fill", (d, i) => d.color || colorScale(i))
      .attr("rx", 4)
      .transition()
      .duration(1000)
      .attr("y", d => yScale(d.value))
      .attr("height", d => innerHeight - yScale(d.value));

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)")
      .style("font-size", "12px")
      .style("fill", "hsl(var(--foreground))");

    // Y Axis
    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "hsl(var(--foreground))");

    // Title
    if (title) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "hsl(var(--foreground))")
        .text(title);
    }

    // Add value labels on bars
    g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => (xScale(d.label) || 0) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.value) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "hsl(var(--foreground))")
      .style("opacity", 0)
      .text(d => d.value)
      .transition()
      .delay(1000)
      .duration(500)
      .style("opacity", 1);

  }, [data, width, height, title]);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-auto"
        style={{ minWidth: '300px' }}
      />
    </div>
  );
};

export default D3BarChart;