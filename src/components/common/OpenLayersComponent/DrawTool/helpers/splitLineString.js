import { featureCollection } from '@turf/helpers';
import lineSplit from '@turf/line-split';
import pointToLineDistance from '@turf/point-to-line-distance';

export default function splitLineString(line, splitter) {
  console.log(line, 'linex');
  console.log(splitter, 'splitterx');
  const lineFeatures = line.features.map(feat => ({
    ...feat,
    distanceToPoint: pointToLineDistance(splitter, feat),
  }));
  let closestLineIndex = 0;
  let closestLine = lineFeatures[0];
  lineFeatures.forEach((lineFeat, index) => {
    if (lineFeat.distanceToPoint >= closestLine.distanceToPoint) return;
    closestLine = line;
    closestLineIndex = index;
  });
  const splitterFeature = splitter;
  const split = lineSplit(closestLine, splitterFeature);
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
