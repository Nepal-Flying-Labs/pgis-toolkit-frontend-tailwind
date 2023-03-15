import { featureCollection } from '@turf/helpers';
import lineSplit from '@turf/line-split';
import pointToLineDistance from '@turf/point-to-line-distance';
import flatten from '@turf/flatten';
import truncate from '@turf/truncate';

export default function splitLineString(line, splitter) {
  const lineFeatures = line.features.map(feat => {
    let lineFeat = feat;
    if (feat.geometry.type === 'MultiLineString') {
      const flattenedLine = flatten(feat);
      [lineFeat] = flattenedLine.features;
    }
    return {
      ...lineFeat,
      distanceToPoint: pointToLineDistance(splitter, lineFeat),
    };
  });
  let closestLineIndex = 0;
  let closestLine = lineFeatures[0];
  lineFeatures.forEach((lineFeat, index) => {
    if (lineFeat.distanceToPoint >= closestLine.distanceToPoint) return;
    closestLine = lineFeat;
    closestLineIndex = index;
  });
  const split = lineSplit(closestLine, truncate(splitter));
  if (lineFeatures.length === 1) {
    return split;
  }
  const featuresx = lineFeatures.reduce((arr, item, idx) => {
    if (idx === closestLineIndex) {
      return [...arr, ...split.features];
    }
    return [...arr, item];
  }, []);
  const splitx = featureCollection(featuresx);
  return splitx;
}
