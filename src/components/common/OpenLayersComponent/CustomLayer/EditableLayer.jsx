/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Vector as VectorSource } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { get } from 'ol/proj';
import { getUid } from 'ol/util';
import { Modify, Select, Translate, Draw, Snap } from 'ol/interaction';
import { shiftKeyOnly, singleClick } from 'ol/events/condition';
import getFeatureGeojson from '../helpers/getFeatureGeojson';
import { getStyles } from '../helpers/styleUtils';

// import './styles.scss';

// const drawSource = new VectorSource();
// const drawLayer = new VectorLayer({
//   source: drawSource,
// });

const EditableLayer = ({
  map,
  geojson,
  style,
  zIndex = 2,
  onSave,
  onCancel,
  onError,
  onChange = () => {},
}) => {
  const [vectorLayer, setVectorLayer] = useState(null);
  const [modifiedStates, setModifiedStates] = useState([]);
  const [modifiedFeature, setModifiedFeature] = useState(null);
  const [drawType, setDrawType] = useState(null);
  const layerUid = useRef(null);

  // initialize select interaction
  const select = useMemo(
    () =>
      new Select({
        wrapX: false,
        filter: (_, layer) => layerUid?.current === layer?.ol_uid,
      }),
    [],
  );

  // initialize modify interaction
  const modify = useMemo(
    () =>
      new Modify({
        features: select.getFeatures(),
        deleteCondition: event => shiftKeyOnly(event) && singleClick(event),
      }),
    [select],
  );

  // initialize translate interaction
  const translate = useMemo(
    () =>
      new Translate({
        features: select.getFeatures(),
      }),
    [select],
  );

  // initialize draw instance
  const draw = useMemo(
    () =>
      new Draw({
        source: vectorLayer?.getSource(),
        type: 'Polygon',
      }),
    [vectorLayer],
  );

  const snap = useMemo(
    () => new Snap({ source: vectorLayer?.getSource() }),
    [vectorLayer],
  );

  // clean up on geojson remove
  useEffect(() => {
    if (!map || geojson || !vectorLayer) return;
    map.removeInteraction(select);
    map.removeInteraction(translate);
    map.removeInteraction(modify);
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    select.getFeatures().clear();
    setDrawType(null);
    map.removeLayer(vectorLayer);
  }, [map, vectorLayer, geojson, select, translate, modify, draw, snap]);

  // add geojson for edit feature
  useEffect(() => {
    if (!map || !geojson) return;
    const features = new GeoJSON().readFeatures(geojson, {
      featureProjection: get('EPSG:3857'),
    });
    const vectorLyr = new VectorLayer({
      source: new VectorSource({
        features,
      }),
      zIndex: zIndex + 1,
      declutter: true,
      style: (feature, resolution) => getStyles({ style, feature, resolution }),
    });
    layerUid.current = getUid(vectorLyr);
    map.addLayer(vectorLyr);
    setVectorLayer(vectorLyr);
    select.getFeatures().push(features[0]);
    setModifiedStates([geojson]);
  }, [map, geojson, zIndex, select, style]);

  // add select interaction
  useEffect(() => {
    if (!map || !geojson) return;
    map.addInteraction(select);
  }, [map, geojson, select, modify, translate]);

  // add select interaction
  useEffect(() => {
    if (!map || !geojson) return;
    if (drawType === 'edit') {
      map.removeInteraction(translate);
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      map.addInteraction(modify);
    }
    if (drawType === 'drag') {
      map.removeInteraction(modify);
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      map.addInteraction(translate);
    }
    if (drawType === 'add-polygon') {
      map.removeInteraction(modify);
      map.addInteraction(draw);
      map.addInteraction(snap);
    }
    if (!drawType) {
      map.removeInteraction(modify);
      map.removeInteraction(translate);
      map.removeInteraction(draw);
      map.removeInteraction(snap);
    }
  }, [map, geojson, modify, translate, drawType, draw, snap]);

  // on translate finish
  useEffect(() => {
    translate.on('translateend', e => {
      const features = e.features.getArray();
      const featureGeojson = getFeatureGeojson(features[0]);
      setModifiedStates(prev => [...prev, featureGeojson]);
      setModifiedFeature(features[0]);
      onChange(featureGeojson);
    });
  }, [translate]); // eslint-disable-line

  // on modify finish
  useEffect(() => {
    modify.on('modifyend', e => {
      const features = e.features.getArray();
      const featureGeojson = getFeatureGeojson(features[0]);
      setModifiedStates(prev => [...prev, featureGeojson]);
      setModifiedFeature(features[0]);
      onChange(featureGeojson);
    });
  }, [modify]); // eslint-disable-line

  // on draw end
  useEffect(() => {
    draw.on('drawend', e => {
      const { feature } = e;
      const featureGeojson = getFeatureGeojson(feature);
      setModifiedStates(prev => [...prev, featureGeojson]);
      setModifiedFeature(feature);
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      setDrawType(null);
      onChange(featureGeojson);
    });
  }, [draw, snap, map]); // eslint-disable-line

  // on undo click
  const handleUndo = () => {
    if (modifiedStates.length === 1) return;
    const source = vectorLayer.getSource();
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

  const handleDelete = () => {
    const source = vectorLayer.getSource();
    source.clear();
    // setModifiedStates((prev) => [...prev, null]);
    setModifiedFeature(null);
    setDrawType('add-polygon');
    onChange(null);
  };

  const handleDrag = () => {
    if (drawType === 'add-polygon') return;
    setDrawType('drag');
  };

  const handleEdit = () => {
    if (drawType === 'add-polygon') return;
    setDrawType('edit');
  };

  // on save click
  const handleSave = () => {
    if (!modifiedFeature) {
      onError('Please draw polygon to save');
      return;
    }
    const lastModifiedFeature = modifiedStates[modifiedStates.length - 1];
    if (!lastModifiedFeature) return;
    onSave(lastModifiedFeature);
  };

  return (
    <div
      className="naxatw-absolute naxatw-p-2 naxatw-rounded-lg naxatw-bottom-10 naxatw-right-4 naxatw-bg-white naxatw-z-10
                 naxatw-shadow-3xl"
      style={{ display: !geojson ? 'none' : '' }}
    >
      <div className="">
        <h5>Edit Toolbar</h5>
      </div>
      <div className="naxatw-text-grey-800 naxatw-mt-2">
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          title="Drag"
          onClick={handleDrag}
        >
          <i className="material-symbols-outlined">open_with</i>
        </button>
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          title="Edit"
          onClick={handleEdit}
        >
          <i className="material-icons">timeline</i>
        </button>
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          title="Delete"
          onClick={handleDelete}
        >
          <i className="material-icons">delete_outline</i>
        </button>
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          title="Undo"
          onClick={handleUndo}
        >
          <i className="material-icons">undo</i>
        </button>
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          title="Save"
          onClick={handleSave}
        >
          <i className="material-symbols-outlined">save</i>
        </button>
        <button
          className="naxatw-icon-btn naxatw-icon-btn-sm"
          type="button"
          title="Cancel"
          onClick={onCancel}
        >
          <i className="material-icons">close</i>
        </button>
      </div>
    </div>
  );
};

export default EditableLayer;
