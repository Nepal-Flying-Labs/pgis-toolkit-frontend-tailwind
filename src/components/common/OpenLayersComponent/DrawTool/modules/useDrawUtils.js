/* eslint-disable react/prop-types */
import { useMemo, useEffect, useCallback } from 'react';
import { Modify, Select, Translate } from 'ol/interaction';
import { shiftKeyOnly, singleClick } from 'ol/events/condition';

export default function useDrawUtils({
  mapInstance,
  onModifyEnd = () => {},
  onDragEnd = () => {},
  layerUid,
}) {
  const select = useMemo(
    () =>
      new Select({
        wrapX: false,
        filter: (_, layer) => layerUid?.current === layer?.ol_uid,
      }),
    [layerUid],
  );

  const modify = useMemo(
    () =>
      new Modify({
        features: select.getFeatures(),
        deleteCondition: event => shiftKeyOnly(event) && singleClick(event),
      }),
    [select],
  );

  const translate = useMemo(
    () =>
      new Translate({
        features: select.getFeatures(),
      }),
    [select],
  );

  // const snap = useMemo(() => new Snap({ source }), [source]);

  useEffect(() => {
    modify.on('modifyend', e => {
      const modifiedFeatures = [];
      const features = e.features.getArray();
      for (let i = 0; i < features.length; i += 1) {
        const rev = features[i].getRevision();
        if (rev > 1) {
          modifiedFeatures.push(features[i]);
        }
      }
      onModifyEnd(modifiedFeatures);
    });
  }, [modify, onModifyEnd]);

  useEffect(() => {
    translate.on('translateend', e => {
      const features = e.features.getArray();
      onDragEnd(features);
    });
  }, [translate, onDragEnd]);

  const addInteraction = useCallback(
    interaction => {
      if (!mapInstance) return () => {};
      return mapInstance.addInteraction(interaction);
    },
    [mapInstance],
  );

  const removeInteraction = useCallback(
    interaction => {
      if (!mapInstance) return () => {};
      return mapInstance.removeInteraction(interaction);
    },
    [mapInstance],
  );

  return {
    select,
    modify,
    translate,
    // snap,
    addInteraction,
    removeInteraction,
  };
}
