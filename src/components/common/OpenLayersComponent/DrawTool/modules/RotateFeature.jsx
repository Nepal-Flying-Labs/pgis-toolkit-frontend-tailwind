/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { getCenter, getHeight, getWidth } from 'ol/extent';
import { MultiPoint, Point } from 'ol/geom';
import { Modify } from 'ol/interaction';
import {
  never,
  platformModifierKeyOnly,
  primaryAction,
} from 'ol/events/condition';

const style = new Style({
  geometry: feature => {
    const modifyGeometry = feature.get('modifyGeometry');
    return modifyGeometry ? modifyGeometry.geometry : feature.getGeometry();
  },
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.2)',
  }),
  stroke: new Stroke({
    color: '#ffcc33',
    width: 2,
  }),
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: '#ffcc33',
    }),
  }),
});

function calculateCenter(geometry) {
  let center;
  let coordinates;
  let minRadius;
  const type = geometry.getType();
  if (type === 'Polygon') {
    let x = 0;
    let y = 0;
    let i = 0;
    coordinates = geometry.getCoordinates()[0].slice(1);
    coordinates.forEach(coordinate => {
      x += coordinate[0];
      y += coordinate[1];
      i += 1;
    });
    center = [x / i, y / i];
  } else if (type === 'LineString') {
    center = geometry.getCoordinateAt(0.5);
    coordinates = geometry.getCoordinates();
  } else {
    center = getCenter(geometry.getExtent());
  }
  let sqDistances;
  if (coordinates) {
    sqDistances = coordinates.map(coordinate => {
      const dx = coordinate[0] - center[0];
      const dy = coordinate[1] - center[1];
      return dx * dx + dy * dy;
    });
    minRadius = Math.sqrt(Math.max(...sqDistances)) / 3;
  } else {
    minRadius =
      Math.max(
        getWidth(geometry.getExtent()),
        getHeight(geometry.getExtent()),
      ) / 3;
  }
  return {
    center,
    coordinates,
    minRadius,
    sqDistances,
  };
}

export default function RotateFeature({
  onClick,
  enable,
  source,
  // select,
  modify,
  translate,
  addInteraction,
  removeInteraction,
  vectorLayer,
}) {
  useEffect(() => {
    if (!enable) return;
    vectorLayer.setStyle(feature => {
      const styles = [style];
      const modifyGeometry = feature.get('modifyGeometry');
      const geometry = modifyGeometry
        ? modifyGeometry.geometry
        : feature.getGeometry();
      const result = calculateCenter(geometry);
      const { center } = result;
      if (center) {
        styles.push(
          new Style({
            geometry: new Point(center),
            image: new CircleStyle({
              radius: 4,
              fill: new Fill({
                color: '#ff3333',
              }),
            }),
          }),
        );
        const { coordinates } = result;
        if (coordinates) {
          const { minRadius, sqDistances } = result;
          const rsq = minRadius * minRadius;
          const points = coordinates.filter(
            (coordinate, index) => sqDistances[index] > rsq,
          );
          styles.push(
            new Style({
              geometry: new MultiPoint(points),
              image: new CircleStyle({
                radius: 4,
                fill: new Fill({
                  color: '#33cc33',
                }),
              }),
            }),
          );
        }
      }
      return styles;
    });
  }, [enable, vectorLayer]);

  const defaultStyle = useMemo(
    () => new Modify({ source })?.getOverlay()?.getStyleFunction(),
    [source],
  );

  // const modify = useMemo(
  //   () =>
  //     new Modify({
  //       source,
  //       condition: (event) => primaryAction(event) && !platformModifierKeyOnly(event),
  //       deleteCondition: never,
  //       insertVertexCondition: never,
  //       style: (feature) => {
  //         feature.get('features').forEach((modifyFeature) => {
  //           const modifyGeometry = modifyFeature.get('modifyGeometry');
  //           if (modifyGeometry) {
  //             const point = feature.getGeometry().getCoordinates();
  //             let modifyPoint = modifyGeometry.point;
  //             if (!modifyPoint) {
  //               // save the initial geometry and vertex position
  //               modifyPoint = point;
  //               modifyGeometry.point = modifyPoint;
  //               modifyGeometry.geometry0 = modifyGeometry.geometry;
  //               // get anchor and minimum radius of vertices to be used
  //               const result = calculateCenter(modifyGeometry.geometry0);
  //               modifyGeometry.center = result.center;
  //               modifyGeometry.minRadius = result.minRadius;
  //             }
  //
  //             const { center, minRadius } = modifyGeometry;
  //             let dx;
  //             let dy;
  //             dx = modifyPoint[0] - center[0];
  //             dy = modifyPoint[1] - center[1];
  //             const initialRadius = Math.sqrt(dx * dx + dy * dy);
  //             if (initialRadius > minRadius) {
  //               const initialAngle = Math.atan2(dy, dx);
  //               dx = point[0] - center[0];
  //               dy = point[1] - center[1];
  //               const currentRadius = Math.sqrt(dx * dx + dy * dy);
  //               if (currentRadius > 0) {
  //                 const currentAngle = Math.atan2(dy, dx);
  //                 const geometry = modifyGeometry.geometry0.clone();
  //                 geometry.scale(currentRadius / initialRadius, undefined, center);
  //                 geometry.rotate(currentAngle - initialAngle, center);
  //                 modifyGeometry.geometry = geometry;
  //               }
  //             }
  //           }
  //         });
  //         return defaultStyle(feature);
  //       },
  //     }),
  //   [source, defaultStyle],
  // );

  // const translate = useMemo(
  //   () =>
  //     new Translate({
  //       condition: (event) => primaryAction(event) && platformModifierKeyOnly(event),
  //       layers: [vectorLayer],
  //     }),
  //   [vectorLayer],
  // );

  useEffect(() => {
    if (!enable) return;
    translate.set(
      'condition',
      event => primaryAction(event) && platformModifierKeyOnly(event),
    );
    translate.set('layers', [vectorLayer]);
    modify.set('source', source);
    modify.set(
      'condition',
      event => primaryAction(event) && !platformModifierKeyOnly(event),
    );
    modify.set('deleteCondition', never);
    modify.set('insertVertexCondition', never);
    modify.set('style', feature => {
      feature.get('features').forEach(modifyFeature => {
        const modifyGeometry = modifyFeature.get('modifyGeometry');
        if (modifyGeometry) {
          const point = feature.getGeometry().getCoordinates();
          let modifyPoint = modifyGeometry.point;
          if (!modifyPoint) {
            // save the initial geometry and vertex position
            modifyPoint = point;
            modifyGeometry.point = modifyPoint;
            modifyGeometry.geometry0 = modifyGeometry.geometry;
            // get anchor and minimum radius of vertices to be used
            const result = calculateCenter(modifyGeometry.geometry0);
            modifyGeometry.center = result.center;
            modifyGeometry.minRadius = result.minRadius;
          }

          const { center, minRadius } = modifyGeometry;
          let dx;
          let dy;
          dx = modifyPoint[0] - center[0];
          dy = modifyPoint[1] - center[1];
          const initialRadius = Math.sqrt(dx * dx + dy * dy);
          if (initialRadius > minRadius) {
            const initialAngle = Math.atan2(dy, dx);
            dx = point[0] - center[0];
            dy = point[1] - center[1];
            const currentRadius = Math.sqrt(dx * dx + dy * dy);
            if (currentRadius > 0) {
              const currentAngle = Math.atan2(dy, dx);
              const geometry = modifyGeometry.geometry0.clone();
              geometry.scale(currentRadius / initialRadius, undefined, center);
              geometry.rotate(currentAngle - initialAngle, center);
              modifyGeometry.geometry = geometry;
            }
          }
        }
      });
      return defaultStyle(feature);
    });
  }, [enable, translate, vectorLayer, modify, source, defaultStyle]);

  useEffect(() => {
    if (enable && vectorLayer) {
      addInteraction(modify);
      addInteraction(translate);
    } else {
      removeInteraction(modify);
      removeInteraction(translate);
    }
  }, [
    modify,
    translate,
    addInteraction,
    removeInteraction,
    enable,
    vectorLayer,
  ]);

  useEffect(() => {
    modify.on('modifystart', event => {
      event.features.forEach(feature => {
        feature.set(
          'modifyGeometry',
          { geometry: feature.getGeometry().clone() },
          true,
        );
      });
    });
  }, [modify]);

  useEffect(() => {
    modify.on('modifyend', event => {
      event.features.forEach(feature => {
        const modifyGeometry = feature.get('modifyGeometry');
        if (modifyGeometry) {
          feature.setGeometry(modifyGeometry.geometry);
          feature.unset('modifyGeometry', true);
        }
      });
    });
  }, [modify]);

  return (
    <button
      type="button"
      className={`naxatw-icon-btn naxatw-icon-btn-sm ${
        enable ? 'naxatw-text-secondary-400' : ''
      }`}
      onClick={onClick}
    >
      <i className="material-icons">rotate_90_degrees_ccw</i>
    </button>
  );
}
