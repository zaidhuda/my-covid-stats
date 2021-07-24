import React, { useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

import my from '../lib/malaysia';
import { CaseState } from '../lib/useEpidemicData';
import { Feature, Geometry } from 'geojson';

interface Props {
  loading: boolean;
  data: CaseState[];
}

const Choropleth = ({ loading, data: casesStates }: Props) => {
  const ref = useRef<SVGSVGElement | null>();

  const width = 1280;
  const height = 600;

  if (loading || !casesStates) return null;

  const dailyCases = casesStates.filter(({ date }) => date === '2021-07-23');
  const totalCases = dailyCases.reduce(
    (acc, { cases_new }) => acc + cases_new,
    0
  );

  const onClick = (_e: any, d: Feature<Geometry>) => {};

  if (ref.current) {
    const topoFeature = topojson.feature<{ name: string }>(
      my,
      my.objects.malaysia
    );

    var projection = d3
      .geoIdentity()
      .reflectY(true)
      .fitSize([width - 50, height - 50], topoFeature);

    const path = d3.geoPath().projection(projection);

    const color = d3.scaleQuantize(
      [1, 9],
      [
        ...[...d3.schemeGreens[3]].slice(1).reverse(),
        ...d3.schemeReds[9].slice(2),
      ]
    );

    const data = new Map(
      dailyCases.map(({ cases_new, state }) => [
        state,
        {
          value: cases_new,
          percentage: (cases_new / totalCases) * 100,
        },
      ])
    );

    const svg = d3.select(ref.current);

    svg
      .append('g')
      .selectAll('path')
      .data(topoFeature.features)
      .join('path')
      .attr('fill', (d) => color(data.get(d.properties.name)?.percentage || 0))
      .attr('cursor', 'pointer')
      .on('click', onClick)
      .attr('d', path)
      .append('title')
      .text(
        (d) => `${d.properties.name} ${data.get(d.properties.name)?.value}`
      );

    svg
      .append('path')
      .datum(topojson.mesh(my, my.objects.malaysia, (a, b) => a !== b))
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-linejoin', 'round')
      .attr('d', path);
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
        margin: 'auto'
      }}
    />
  );
};

export default Choropleth;
