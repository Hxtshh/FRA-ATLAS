import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface D3PieChartProps {
  data: { label: string; value: number; color?: string }[];
  width?: number;
  height?: number;
  title?: string;
}

const D3PieChart: React.FC<D3PieChartProps> = ({
  data,
  width = 300,
  height = 300,
  title
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const radius = Math.min(width, height) / 2 - 40;
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(data.map((d, i) => 
        d.color || d3.schemeCategory10[i % 10]
      ));

    // Pie generator
    const pie = d3
      .pie<{ label: string; value: number }>()
      .value(d => d.value)
      .sort(null);

    // Arc generator
    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(radius);

    const labelArc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(radius * 1.1)
      .outerRadius(radius * 1.1);

    // Pie slices
    const slices = g
      .selectAll(".slice")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "slice");

    slices
      .append("path")
      .attr("d", arc)
      .attr("fill", d => colorScale(d.data.label) as string)
      .attr("stroke", "hsl(var(--background))")
      .attr("stroke-width", 2)
      .style("opacity", 0.8)
      .on("mouseover", function() {
        d3.select(this).style("opacity", 1);
      })
      .on("mouseout", function() {
        d3.select(this).style("opacity", 0.8);
      })
      .transition()
      .duration(1000)
      .attrTween("d", function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(interpolate(t)) || "";
        };
      });

    // Labels
    slices
      .append("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("fill", "hsl(var(--foreground))")
      .style("opacity", 0)
      .text(d => d.data.value > 0 ? `${d.data.label}` : "")
      .transition()
      .delay(1000)
      .duration(500)
      .style("opacity", 1);

    // Value labels
    slices
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("fill", "white")
      .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.7)")
      .style("opacity", 0)
      .text(d => d.data.value)
      .transition()
      .delay(1200)
      .duration(500)
      .style("opacity", 1);

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

    // Legend
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(20, ${height - 100})`);

    const legendItems = legend
      .selectAll(".legend-item")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);

    legendItems
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", d => colorScale(d.label) as string);

    legendItems
      .append("text")
      .attr("x", 20)
      .attr("y", 12)
      .style("font-size", "12px")
      .style("fill", "hsl(var(--foreground))")
      .text(d => `${d.label} (${d.value})`);

  }, [data, width, height, title]);

  return (
    <div className="w-full flex justify-center">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-auto max-w-md"
      />
    </div>
  );
};

export default D3PieChart;