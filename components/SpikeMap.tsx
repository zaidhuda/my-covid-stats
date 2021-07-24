import React, { useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

import my from '../lib/malaysia';
import { CaseState } from '../lib/useEpidemicData';

interface Props {
  loading: boolean;
  data: CaseState[];
}

const SpikeMap = ({ loading, data: casesStates }: Props) => {
  const ref = useRef<SVGSVGElement | null>();

  const width = 1280;
  const height = 600;

  if (loading || !casesStates) return null;

  const spike = (length: number, width = 7) =>
    `M${-width / 2},0L0,${-length}L${width / 2},0`;

  if (ref.current) {
    const topoFeature = topojson.feature(my, my.objects.malaysia);

    var projection = d3
      .geoIdentity()
      .reflectY(true)
      .fitSize([width - 50, height - 50], topoFeature);

    const path = d3.geoPath().projection(projection);

    const data = casesStates
      .filter(({ date }) => date === '2021-07-23')
      .map(({ cases_new, state }) => {
        const feature = topoFeature.features.find(
          ({ properties: { name } }) => name === state
        );
        return {
          id: state,
          position: feature && path.centroid(feature),
          title: state,
          value: +cases_new,
        };
      });

    const length = d3.scaleLinear(
      [0, d3.max(data, (d: any) => d.value)],
      [0, 200]
    );

    const svg = d3.select(ref.current);

    svg
      .append('path')
      .datum(topojson.feature(my, my.objects.malaysia))
      .attr('fill', '#e0e0e0')
      .attr('d', path);

    svg
      .append('path')
      .datum(topojson.mesh(my, my.objects.malaysia, (a, b) => a !== b))
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-linejoin', 'round')
      .attr('d', path);

    const legend = svg
      .append('g')
      .attr('fill', '#777')
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .selectAll('g')
      .data(length.ticks(4).slice(1).reverse())
      .join('g')
      .attr(
        'transform',
        (d, i) => `translate(${width - (i + 1) * 18},${height - 16})`
      );

    legend
      .append('path')
      .attr('fill', 'red')
      .attr('fill-opacity', 0.3)
      .attr('stroke', 'red')
      .attr('d', (d) => spike(length(d)));

    legend.append('text').attr('dy', '1.3em').text(length.tickFormat(4, 's'));

    svg
      .append('g')
      .attr('fill', 'red')
      .attr('fill-opacity', 0.3)
      .attr('stroke', 'red')
      .selectAll('path')
      .data(
        data
          .filter((d) => d.position)
          .sort(
            (a, b) =>
              d3.ascending(a.position[1], b.position[1]) ||
              d3.ascending(a.position[0], b.position[0])
          )
      )
      .join('path')
      .attr('transform', (d) => `translate(${d.position})`)
      .attr('d', (d) => spike(length(d.value)))
      .append('title')
      .text((d) => `${d.title} ${d.value}`);
  }

  return (
    <svg
      ref={(el) => (ref.current = el)}
      viewBox={`0, 0, ${width}, ${height}`}
      style={{
        width,
        height,
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    />
  );
};

export default SpikeMap;
