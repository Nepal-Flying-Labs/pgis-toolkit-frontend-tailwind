/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Style, Circle, Fill } from 'ol/style';
import { featureCollection } from '@turf/helpers';
import { Collection } from 'ol';
import { LineString, Point } from 'ol/geom';
import { Draw, Snap } from 'ol/interaction';
import GeoJSON from 'ol/format/GeoJSON';
import { get } from 'ol/proj';
import { getUid } from 'ol/util';
import { Vector as VectorSource } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import Tooltip from '@Components/common/Tooltip';
import { defaultStyles, getStyles, pointTypes } from '../helpers/styleUtils';
import getFeatureGeojson from './helpers/getFeatureGeojson';
import {
  useDrawUtils,
  AddFeature,
  EditFeature,
  // ExtendFeature,
  DragFeature,
  SplitFeature,
  // RotateFeature,
} from './modules';
import getFeaturesGeojson from './helpers/getFeaturesGeojson';

const source = new VectorSource();

const drawToolOptions = [
  'add',
  'drag',
  'edit',
  'extend',
  'delete',
  'undo',
  'save',
  'cancel',
];

export default function DrawTool({
  map,
  geojson,
  style,
  zIndex,
  geometryType,
  onChange = () => {},
  onSave = () => {},
  onCancel,
  onError,
  enable,
  selectedDrawType,
  toolboxContents = [...drawToolOptions],
}) {
  const [vectorLayer, setVectorLayer] = useState(null);
  const [drawType, setDrawType] = useState(null);
  const [modifiedStates, setModifiedStates] = useState([]);
  const [modifiedFeature, setModifiedFeature] = useState(null);
  const selectedFeatureUId = useRef(null);
  const layerUid = useRef(null);

  const handleFeatureEdit = useCallback(
    modifiedFeatures => {
      const featureGeojson = getFeatureGeojson(modifiedFeatures[0]);
      setModifiedStates(prev => [...prev, featureGeojson]);
      setModifiedFeature(modifiedFeatures);
      onChange(featureGeojson);
    },
    [onChange],
  );

  const { select, modify, translate, snap, addInteraction, removeInteraction } =
    useDrawUtils({
      mapInstance: map,
      layerUid,
      source,
      onModifyEnd: handleFeatureEdit,
      onDragEnd: handleFeatureEdit,
    });

  // set selected draw type
  useEffect(() => {
    if (!enable) return;
    setDrawType(selectedDrawType);
  }, [enable, selectedDrawType]);

  useEffect(() => {
    if (enable) {
      addInteraction(select);
    } else {
      removeInteraction(select);
    }
  }, [select, enable, addInteraction, removeInteraction]);

  // useEffect(() => {
  //   if (!vectorLayer) return;
  //   select.on('select', ({ selected }) => {
  //     console.log(selected, 'selectedx');
  //   });
  // }, [select, vectorLayer]);

  // add geojson for edit feature
  useEffect(() => {
    if (!map || !enable || !geojson) return;
    const features = new GeoJSON().readFeatures(geojson, {
      featureProjection: get('EPSG:3857'),
    });
    features.forEach(feature => {
      feature.setId('drawFeatureId');
    });
    if (source.getFeatures().length) return;
    source.addFeatures(features);
    const vectorLyr = new VectorLayer({
      source,
      zIndex: zIndex + 1,
      style: (feature, resolution) => {
        const geometry = feature.getGeometry();
        const coordinates = geometry.getCoordinates();
        const styles = [getStyles({ style, feature, resolution })];
        geometry.forEachSegment((start, end) => {
          styles.push(
            new Style({
              geometry: new Point(end),
              image: new Circle({
                radius: +style.lineThickness + 1 || 4,
                fill: new Fill({
                  color: '#FFA500',
                }),
              }),
            }),
          );
        });
        return styles;
        // const start = coordinates;
        // const end = start[start.length - 1];
        // styles.push(
        //   new Style({
        //     geometry: new Point(end),
        //     image: new Circle({
        //       radius: +style.lineThickness + 1 || 4,
        //       fill: new Fill({
        //         color: '#FFA500',
        //       }),
        //     }),
        //   }),
        // );
        // return styles;
      },
    });
    layerUid.current = getUid(vectorLyr);
    map.addLayer(vectorLyr);
    setVectorLayer(vectorLyr);
    select.getFeatures().push(features[0]);
    setModifiedStates([geojson]);
    setModifiedFeature(features[0]);
  }, [map, enable, geojson, zIndex, select, style]);

  // reset state and remove layer
  const resetState = useCallback(() => {
    if (!map || enable || !vectorLayer) return;
    select.getFeatures().clear();
    source.clear();
    setDrawType(null);
    setVectorLayer(null);
    map.removeLayer(vectorLayer);
    const interactions = map.getInteractions();
    interactions.forEach(interaction => {
      if (interaction instanceof Draw) {
        map.removeInteraction(interaction);
      }
    });
  }, [map, vectorLayer, enable, select]);

  // clean up on geojson remove
  useEffect(() => {
    if (!map || enable || !vectorLayer) return;
    resetState();
  }, [map, vectorLayer, enable, resetState]);

  const snapCollection = useMemo(
    () =>
      new Collection([], {
        // unique: true,
      }),
    [],
  );

  // add snap interaction
  useEffect(() => {
    if (!map || !drawType) return;
    setTimeout(() => {
      const layers = map.getLayers();
      layers.forEach(layer => {
        const properties = layer.getProperties();
        if (properties.layerId === 'snaplayer') {
          const features = layer.getSource().getFeatures();
          snapCollection.push(features[0]);
        }
      });
      const snapInteraction = new Snap({
        features: snapCollection,
      });
      map.addInteraction(snapInteraction);
    }, 500);
  }, [map, snapCollection, drawType]);

  useEffect(() => {
    source.on('addfeature', evt => {
      snapCollection.push(evt.feature);
      evt.feature.setId('idx');
    });
    source.on('removefeature', evt => {
      snapCollection.remove(evt.feature);
    });
  }, [snapCollection]);

  // handle add feature
  const handleDrawEnd = useCallback(
    feature => {
      const featureGeojson = getFeatureGeojson(feature);
      setModifiedStates(prev => [...prev, featureGeojson]);
      setModifiedFeature(feature);
      setDrawType(null);
      onChange(featureGeojson);
    },
    [onChange],
  );

  // handle extend feature
  const handleExtendEnd = useCallback(
    features => {
      const coordinates1 = features[0].getGeometry().getCoordinates();
      const coordinates2 = features[1].getGeometry().getCoordinates();
      const union = new LineString(coordinates1.concat(coordinates2));
      console.log(union, 'unionx');
      // console.log(features, 'featuresx');
      // const featureGeojsons = features.map(feature =>
      //   getFeatureGeojson(feature),
      // );
      // console.log(featureGeojsons, 'featureGeojsonx');
      const singleFeature = featureCollection(union);
      console.log(singleFeature, 'singleFeaturex');
      // setModifiedStates(prev => [...prev, featureGeojson]);
      // setModifiedFeature(features);
      // setDrawType(null);
      // onChange(featureGeojson);
    },
    [onChange],
  );

  // handle feature split
  const handleFeatureSplit = useCallback(feature => {
    const featureGeojson = feature;
    // const featureGeojson = getFeatureGeojson(feature);
    setModifiedStates(prev => [...prev, featureGeojson]);
    setModifiedFeature(feature);
    setDrawType(null);
    onChange(featureGeojson);
  }, []);

  // handle add-feature click
  useEffect(() => {
    if (!enable || vectorLayer || drawType !== 'add-feature') return;
    const vectorLyr = new VectorLayer({
      source,
      zIndex: zIndex + 1,
      style: (feature, resolution) => getStyles({ style, feature, resolution }),
    });
    layerUid.current = getUid(vectorLyr);
    map.addLayer(vectorLyr);
    setVectorLayer(vectorLyr);
    setDrawType('add-feature');
  }, [enable, drawType, map, zIndex, style, vectorLayer]);

  const handleDelete = () => {
    // const featureCount = source.getFeatures().length;
    const selectedFeatures = select.getFeatures().getArray();
    const allFeatures = source.getFeatures();
    const selectedFeature = allFeatures.find(
      item => item === selectedFeatures[0],
    );
    if (!selectedFeature) return;
    source.removeFeature(selectedFeature);
    if (source.getFeatures().length) {
      const featureGeojson = getFeaturesGeojson(source.getFeatures());
      onChange(featureGeojson);
    }
    if (allFeatures.length === 1) {
      setModifiedFeature(null);
      setVectorLayer(null);
    }
    // source.clear();
    // setModifiedStates((prev) => [...prev, null]);
    // setDrawType('add-feature');
  };

  // on undo click
  const handleUndo = () => {
    if (modifiedStates.length === 1) return;
    source.clear();
    const previousModifiedFeature = modifiedStates[modifiedStates.length - 2];
    source.addFeature(
      new GeoJSON().readFeature(previousModifiedFeature, {
        featureProjection: get('EPSG:3857'),
      }),
    );
    setModifiedStates(prev =>
      prev.filter((_, index) => index < prev.length - 1),
    );
    setModifiedFeature(previousModifiedFeature);
    setDrawType(null);
    const newFeature = source.getFeatures()[0];
    select.getFeatures().push(newFeature);
  };

  // on save click
  const handleSave = () => {
    if (!modifiedFeature) {
      onError('Please draw feature to save');
      return;
    }
    const lastModifiedFeature = modifiedStates[modifiedStates.length - 1];
    if (!lastModifiedFeature) return;
    onSave(lastModifiedFeature);
  };

  const handleCancel = () => {
    onCancel();
    resetState();
  };

  const props = {
    select,
    modify,
    translate,
    snap,
    addInteraction,
    removeInteraction,
    vectorLayer,
    source,
    map,
  };

  return (
    <div
      className="naxatw-absolute naxatw-py-1 naxatw-px-[1px] naxatw-rounded-lg naxatw-top-24 naxatw-left-4
        naxatw-bg-white naxatw-z-10 naxatw-shadow-3xl naxatw-text-grey-800 naxatw-flex naxatw-flex-col
        naxatw-border naxatw-border-grey-300"
      style={{ display: !enable ? 'none' : '' }}
    >
      {toolboxContents.includes('add') && (
        <Tooltip content="Add Feature" direction="right">
          <AddFeature
            type={geometryType}
            enable={drawType === 'add-feature'}
            onClick={() => {
              if (vectorLayer) return;
              setDrawType('add-feature');
            }}
            onDrawEnd={handleDrawEnd}
            {...props}
          />
        </Tooltip>
      )}

      {toolboxContents.includes('drag') && (
        <Tooltip content="Drag" direction="right">
          <DragFeature
            enable={drawType === 'drag-feature'}
            onClick={() => setDrawType('drag-feature')}
            {...props}
          />
        </Tooltip>
      )}

      {toolboxContents.includes('edit') && !pointTypes.includes(geometryType) && (
        <Tooltip content="Edit" direction="right">
          <EditFeature
            enable={drawType === 'edit-feature'}
            onClick={() => setDrawType('edit-feature')}
            {...props}
          />
        </Tooltip>
      )}

      {/* {toolboxContents.includes('extend') && lineTypes.includes(geometryType) && (
        <Tooltip content="Extend" direction="right">
          <ExtendFeature
            type={geometryType}
            enable={drawType === 'extend-feature'}
            onClick={() => setDrawType('extend-feature')}
            onDrawEnd={handleExtendEnd}
            {...props}
          />
        </Tooltip>
    )} */}

      {toolboxContents.includes('edit') && !pointTypes.includes(geometryType) && (
        <Tooltip content="Split" direction="right">
          <SplitFeature
            type={geometryType}
            enable={drawType === 'split-feature'}
            onClick={() => setDrawType('split-feature')}
            geojson={geojson}
            onFeatureSplit={handleFeatureSplit}
            {...props}
          />
        </Tooltip>
      )}

      {/* {!pointTypes.includes(geometryType) && (
        <Tooltip content="Rotate" direction="right">
          <RotateFeature
            enable={drawType === 'rotate-feature'}
            onClick={() => setDrawType('rotate-feature')}
            {...props}
          />
        </Tooltip>
      )} */}

      {toolboxContents.includes('delete') && (
        <Tooltip content="Delete" direction="right">
          <button
            className="naxatw-icon-btn naxatw-icon-btn-sm"
            type="button"
            title="Delete"
            onClick={handleDelete}
          >
            <i className="material-icons">delete_outline</i>
          </button>
        </Tooltip>
      )}

      {toolboxContents.includes('undo') && (
        <Tooltip content="Undo" direction="right">
          <button
            className="naxatw-icon-btn naxatw-icon-btn-sm"
            type="button"
            onClick={handleUndo}
          >
            <i className="material-icons">undo</i>
          </button>
        </Tooltip>
      )}

      {toolboxContents.includes('save') && (
        <Tooltip content="Save" direction="right">
          <button
            className="naxatw-icon-btn naxatw-icon-btn-sm"
            type="button"
            onClick={handleSave}
          >
            <i className="material-symbols-outlined">save</i>
          </button>
        </Tooltip>
      )}

      {toolboxContents.includes('cancel') && (
        <Tooltip content="Cancel" direction="right">
          <button
            className="naxatw-icon-btn naxatw-icon-btn-sm"
            type="button"
            onClick={handleCancel}
          >
            <i className="material-symbols-outlined">close</i>
          </button>
        </Tooltip>
      )}
    </div>
  );
}

DrawTool.defaultProps = {
  geojson: null,
  zIndex: 0,
  style: { ...defaultStyles, fillOpacity: 30, fillColor: '#0000ff' },
};

DrawTool.propTypes = {
  geojson: PropTypes.object,
  style: PropTypes.object,
  zIndex: PropTypes.number,
};
