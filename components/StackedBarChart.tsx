import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import { CaseState } from '../lib/useEpidemicData';

interface Props {
  data: CaseState[];
  days?: number;
}

const StackedBarChart = ({ data: casesStates, days = 90 }: Props) => {
  const ref = useRef<SVGSVGElement | null>();

  const width = 1280;
  const height = 600;

  useEffect(() => {
    if (!ref.current) return () => void 0;

    const margin = { top: 10, right: 10, bottom: 40, left: 40 };

    const formatValue = (x: number) =>
      isNaN(x) ? 'N/A' : x.toLocaleString('en');

    const yAxis = (g: any) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, 's'))
        .call((g: any) => g.selectAll('.domain').remove());

    const xAxis = (g: any) =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .call((g: any) => g.selectAll('.domain').remove());

    const states = [...new Set<string>(casesStates.map(({ state }) => state))];

    const after = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
      .toJSON()
      .split('T')[0];

    const dates = casesStates
      .filter(({ date }) => date > after)
      .reduce(
        (
          acc: {
            [name: string]: {
              date: number;
              name: string;
              total: number;
            };
          },
          { state, date, casesNew }
        ) => {
          const key = date.split(`${new Date().getFullYear()}-`)[1];

          return {
            ...acc,
            [key]: {
              ...acc[key],
              name: key,
              total: (acc[key]?.total || 0) + casesNew,
              [state]: casesNew,
            },
          };
        },
        {}
      );

    const series = d3
      .stack<{
        date: number;
        name: string;
        total: number;
      }>()
      .keys(states)(Object.values(dates))
      .map((d) => (d.forEach((v: any) => (v.key = d.key)), d));

    const color = d3.scaleOrdinal([...d3.schemeSet1, ...d3.schemeSet2]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(series, (d) => d3.max(d, (d: any) => d[1] || 0))])
      .rangeRound([height - margin.bottom, margin.top]);

    const x = d3
      .scaleBand(Object.keys(dates), [margin.left, width - margin.right])
      .padding(0.1);

    const svg = d3.select(ref.current);

    svg.selectAll('*').remove();

    svg
      .append('g')
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d: any) => x(d.data.name) || 0)
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth())
      .append('title')
      .text(
        (d: any) => `${d.data.name} ${d.key} ${formatValue(d.data[d.key])}`
      );

    svg
      .append('g')
      .call(xAxis)
      .selectAll('text')
      .attr('dx', '-2.4em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    svg.append('g').call(yAxis);
  });

  return (
    <svg
      ref={(el) => (ref.current = el)}
      viewBox={`0, 0, ${width}, ${height}`}
      style={{
        width,
        height,
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 'auto',
      }}
    />
  );
};

export default StackedBarChart;
