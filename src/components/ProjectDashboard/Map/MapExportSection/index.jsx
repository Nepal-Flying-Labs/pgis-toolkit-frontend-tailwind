/* eslint-disable max-classes-per-file */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/projectMap';
import MaterialIcon from '@Components/common/MaterialIcon';
import Select from '@Components/common/Select';
import Toggle from '@Components/common/Toggle';
import Button from '@Components/common/Button/index';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import JsPDF from 'jspdf';
import Control from 'ol/control/Control';
import ScaleLine from 'ol/control/ScaleLine';
import Graticule from 'ol/layer/Graticule';
import { Stroke } from 'ol/style';
import {
  orientationOptions,
  paperSizeOptions,
  outputFormatOptions,
  resolutionOptions,
  marginSizeOptions,
  paperSize,
} from './constants';
import NorthArrow from './north-arrow.png';

class TextControl extends Control {
  constructor(optOptions) {
    const options = optOptions || {};
    const element = document.createElement('div');
    element.id = 'sidebar-export';
    element.className = 'naxatw-flex naxatw-flex-col';
    element.style.position = 'absolute';
    element.style.bottom = 0;
    element.style.right = 0;
    const titleElement = document.createElement('div');
    titleElement.id = 'title';
    titleElement.className =
      'naxatw-px-4 naxatw-py-3 naxatw-bg-grey-100 naxatw-font-bold naxatw-text-[18px] naxatw-leading-[22px] naxatw-text-grey-800';
    titleElement.innerHTML = options?.text || 'Title';
    element.appendChild(titleElement);
    const legendElement = document.createElement('div');
    legendElement.className = 'naxatw-px-4 naxatw-py-3';
    const legendPragraph = document.createElement('p');
    legendPragraph.className = 'naxatw-text-body-sm';
    legendPragraph.innerHTML = 'LEGEND';
    legendElement.appendChild(legendPragraph);
    element.appendChild(legendElement);
    const exportFrom = document.createElement('div');
    exportFrom.className = 'naxatw-mt-auto naxatw-bg-primary-50';
    exportFrom.innerHTML = 'Exported from USAFIRI';
    element.appendChild(exportFrom);
    super({
      element,
      target: options.target,
    });
  }
}

class NorthArrowImage extends Control {
  constructor(optOptions) {
    const options = optOptions || {};
    const element = document.createElement('img');
    element.src = NorthArrow;
    element.width = 40;
    element.height = 40;
    element.style.position = 'absolute';
    element.style.top = 0;
    element.style.right = 0;
    element.className = 'ol-unselectable';
    super({
      element,
      target: options.target,
    });
  }
}

const { setProjectMapState } = Creators;

export default function MapExportSection({ exportMap }) {
  const dispatch = useDispatch();
  const paperRef = useRef(null);
  const exportMapRef = useRef(null);
  const [currentOrientation, setCurrentOrientation] = useState('landscape');
  const [currentPaper, setCurrentPaper] = useState('A4');
  const [currentPaperSize, setCurrentPaperSize] = useState([210, 297]);
  const [currentResolution, setCurrentResolution] = useState(150);
  const [currentMargin, setCurrentMargin] = useState(0);
  const [currentFormat, setCurrentFormat] = useState('png');
  const [northArrowChecked, setNorthArrowChecked] = useState(true);
  const [scaleChecked, setScaleChecked] = useState(true);
  const [graticuleChecked, setGraticuleChecked] = useState(false);

  const customControls = {
    title: new TextControl({
      id: 'map-title',
      text: 'Transportation mapping Kenya 2',
      target: exportMapRef.current,
    }),
    scale: new ScaleLine({
      bar: true,
      minWidth: 100,
      units: 'metric',
      target: exportMapRef.current,
    }),
    northArrow: new NorthArrowImage({
      target: exportMapRef.current,
    }),
    graticule: new Graticule({
      strokeStyle: new Stroke({
        color: 'rgba(255,120,0,0.6)',
        width: 1,
      }),
      showLabels: true,
      // latLabelPosition: 0,
      // lonLabelPosition: 1,
      wrapX: false,
    }),
  };

  const handleSize = (papersize, orientation, margin, resolution = 96) => {
    let size = [
      Math.trunc((papersize[0] * resolution) / 25.4),
      Math.trunc((papersize[1] * resolution) / 25.4),
    ];
    if (orientation === 'landscape') {
      size = [size[1], size[0]];
    }
    const s = paperRef.current.getBoundingClientRect();
    const scx = (s.width - 40) / size[0];
    const scy = (s.height - 40) / size[1];
    const sc = Math.min(scx, scy, 1);
    exportMapRef.current.style.position = 'absolute';
    exportMapRef.current.style.width = `${size[0]}px`;
    exportMapRef.current.style.height = `${size[1]}px`;
    exportMapRef.current.style.transform = `scale(${sc})`;
    const px = Math.round(5 / sc);
    exportMapRef.current.style[
      'box-shadow'
    ] = `${px}px ${px}px ${px}px rgba(0,0,0,.6)`;
    exportMapRef.current.style.padding = `${(margin * resolution) / 25.4}px`;
    exportMap.updateSize([size[0], size[1]]);
    exportMap.updateSize();
  };

  window.onresize = () => {
    handleSize(currentPaperSize, currentOrientation, currentMargin);
  };

  const handleExport = () => {
    document.body.style.cursor = 'progress';
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule(
      'body > div:last-child img { display: inline-block; }',
    );

    const size = exportMap.getSize();
    const extent = exportMap.getView().calculateExtent(size);
    const dimWidth = currentPaperSize[1];
    const dimHeight = currentPaperSize[0];
    const dpi = currentResolution;
    const width = Math.round((dimWidth * dpi) / 25.4);
    const height = Math.round((dimHeight * dpi) / 25.4);
    // Set print size
    const printSize = [width, height];
    const scaling = Math.min(width / size[0], height / size[1]);
    exportMapRef.current.style.position = 'absolute';
    exportMapRef.current.style.width = `${width}px`;
    exportMapRef.current.style.height = `${height}px`;
    exportMapRef.current.style.transform = `scale(${scaling})`;
    exportMap.setSize(printSize);
    exportMap.updateSize();
    exportMap.getView().fit(extent, { size: printSize });

    exportMap.once('rendercomplete', () => {
      html2canvas(exportMapRef.current, {
        scale: 1,
        allowTaint: true,
        useCORS: true,
        ignoreElements: el =>
          el.classList.contains('ol-control') ||
          el.classList.contains('controlMenu'),
      }).then(canvas => {
        if (currentFormat === 'clipboard') {
          canvas.toBlob(blob => {
            try {
              navigator.clipboard.write([
                new window.ClipboardItem(
                  Object.defineProperty({}, blob.type, {
                    value: blob,
                    enumerable: true,
                  }),
                ),
              ]);
            } catch (err) {
              console.log(err);
            }
          });
        } else if (currentFormat === 'png') {
          canvas.toBlob(blob => {
            if (blob) saveAs(blob, 'map.png');
          });
        } else if (currentFormat === 'jpeg') {
          canvas.toBlob(blob => {
            if (blob) {
              saveAs(blob, 'map.jpg');
            }
          });
        } else if (currentFormat === 'pdf') {
          const orientation = currentOrientation;
          const pageSize = exportMap.getSize();
          const pdf = new JsPDF(orientation, undefined, currentPaper);
          pdf.addImage(
            canvas.toDataURL('image/jpeg'),
            'JPEG',
            0,
            0,
            pageSize[0],
            pageSize[1],
          );
          pdf.save('map.pdf');
        } else if (currentFormat === 'print') {
          // eslint-disable-next-line no-restricted-globals
          print(exportMapRef.current);
        }
        // Reset original map size
        exportMapRef.current.style.width = size[1];
        exportMapRef.current.style.height = size[0];
        exportMapRef.current.style.transform = `scale(${1 / scaling})`;
        exportMap.setSize(size);
        exportMap.updateSize();
        exportMap.getView().fit(extent, { size });
        document.body.style.cursor = 'auto';
      });
    });
    exportMap.renderSync();
  };

  const addText = () => {
    exportMap.addControl(customControls.title);
  };

  const handleTitleChange = e => {
    document.getElementById('title').innerHTML = e.target.value;
  };

  const handleNorthArrow = e => {
    if (e.target.checked) {
      setNorthArrowChecked(true);
      exportMap.addControl(customControls.northArrow);
    } else {
      setNorthArrowChecked(false);
      exportMap.removeControl(customControls.northArrow);
    }
  };

  const handleScale = e => {
    if (e.target.checked) {
      setScaleChecked(true);
      exportMap.addControl(customControls.scale);
    } else {
      setScaleChecked(false);
      exportMap.removeControl(customControls.scale);
    }
  };

  const handleGraticule = e => {
    if (e.target.checked) {
      setGraticuleChecked(true);
      exportMap.addControl(customControls.graticule);
    } else {
      setGraticuleChecked(false);
      exportMap.removeControl(customControls.graticule);
    }
  };

  useEffect(() => {
    if (exportMap) exportMap.setTarget(exportMapRef.current);
    exportMap.getViewport().style.backgroundColor = 'white';
    // exportMap.getViewport().style.width = '75%';
  }, [exportMap]);

  useEffect(() => {
    exportMap.addControl(customControls.scale);
    exportMap.addControl(customControls.northArrow);
    exportMap.addControl(customControls.title);
  });

  useEffect(() => {
    handleSize(currentPaperSize, currentOrientation, currentMargin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPaperSize, currentOrientation, currentMargin]);

  return (
    <div className="naxatw-flex naxatw-w-full naxatw-h-full">
      <div
        className="naxatw-bg-grey-100 naxatw-w-1/5 naxatw-px-4 naxatw-py-3.5 naxatw-transition-all naxatw-duration-300 naxatw-overflow-auto scrollbar"
        style={{
          minWidth: '23rem',
        }}
      >
        <div className="naxatw-flex naxatw-justify-between">
          <h4>Map Export</h4>
          <a
            className="hover:naxatw-bg-grey-200 naxatw-h-10 naxatw-w-10 naxatw-flex naxatw-justify-center naxatw-items-center naxatw-rounded-lg"
            onClick={() =>
              dispatch(setProjectMapState({ toggleMapExport: false }))
            }
          >
            <MaterialIcon name="close" />
          </a>
        </div>

        <div className="naxatw-mt-3.5 naxatw-space-y-5">
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Map Title</label>
            <input
              type="text"
              className="naxatw-input"
              name="mapTitle"
              placeholder="Enter Map Title"
              onChange={handleTitleChange}
            />
          </div>

          <div className="naxatw-flex naxatw-gap-3">
            <div className="naxatw-space-y-2 naxatw-w-full">
              <label className="naxatw-label">Orientation</label>
              <Select
                placeholder="Choose"
                options={orientationOptions}
                labelKey="label"
                className="naxatw-bg-white naxatw-px-2 naxatw-py-[14px] naxatw-h-[48px]"
                valueKey="value"
                onChange={selectedItem =>
                  setCurrentOrientation(selectedItem.value)
                }
                selectedValue={currentOrientation}
              />
            </div>
            <div className="naxatw-space-y-2 naxatw-w-full">
              <label className="naxatw-label">Page Size</label>
              <Select
                placeholder="Choose"
                options={paperSizeOptions}
                labelKey="label"
                valueKey="value"
                className="naxatw-bg-white naxatw-px-2 naxatw-py-[14px] naxatw-h-[48px]"
                onChange={selectedItem => {
                  setCurrentPaperSize(paperSize[selectedItem.value]);
                  setCurrentPaper(selectedItem.value);
                }}
                selectedValue={currentPaper}
              />
            </div>
          </div>

          <div className="naxatw-flex naxatw-gap-3">
            <div className="naxatw-space-y-2 naxatw-w-full">
              <label className="naxatw-label">Resolution</label>
              <Select
                placeholder="Choose"
                options={resolutionOptions}
                labelKey="label"
                className="naxatw-bg-white naxatw-px-2 naxatw-py-[14px] naxatw-h-[48px]"
                valueKey="value"
                onChange={selectedItem =>
                  setCurrentResolution(selectedItem.value)
                }
                selectedValue={currentResolution}
              />
            </div>
            <div className="naxatw-space-y-2 naxatw-w-full">
              <label className="naxatw-label">Margin</label>
              <Select
                placeholder="Choose"
                options={marginSizeOptions}
                labelKey="label"
                valueKey="value"
                className="naxatw-bg-white naxatw-px-2 naxatw-py-[14px] naxatw-h-[48px]"
                onChange={selectedItem => setCurrentMargin(selectedItem.value)}
                selectedValue={currentMargin}
              />
            </div>
          </div>

          <div className="naxatw-space-y-2 naxatw-w-full">
            <label className="naxatw-label">Output Format</label>
            <Select
              placeholder="Choose"
              options={outputFormatOptions}
              labelKey="label"
              className="naxatw-bg-white naxatw-px-2 naxatw-py-[14px] naxatw-h-[48px]"
              valueKey="value"
              onChange={selectedItem => setCurrentFormat(selectedItem.value)}
              selectedValue={currentFormat}
            />
          </div>
        </div>

        <div className="naxatw-mt-[1.875rem] naxatw-space-y-5">
          <div className="naxatw-flex naxatw-justify-between">
            <p className="naxatw-text-body-lg">Legend</p>
            <Toggle checked />
          </div>
          <div className="naxatw-flex naxatw-justify-between">
            <p className="naxatw-text-body-lg">North arrow</p>
            <Toggle checked={northArrowChecked} onChange={handleNorthArrow} />
          </div>
          <div className="naxatw-flex naxatw-justify-between">
            <p className="naxatw-text-body-lg">Scale bar</p>
            <Toggle checked={scaleChecked} onChange={handleScale} />
          </div>
          <div className="naxatw-flex naxatw-justify-between">
            <p className="naxatw-text-body-lg">Grid</p>
            <Toggle checked={graticuleChecked} onChange={handleGraticule} />
          </div>
        </div>
        <div className="naxatw-mt-[5rem] naxatw-flex naxatw-justify-center">
          <Button
            className="naxatw-btn-primary"
            iconLeft="file_download"
            onClick={handleExport}
          >
            Export
          </Button>
        </div>
      </div>
      <div
        ref={paperRef}
        className="naxatw-bg-grey-300 naxatw-w-4/5 naxatw-h-full naxatw-flex naxatw-items-center naxatw-justify-center naxatw-overflow-hidden"
      >
        <div
          ref={exportMapRef}
          className="naxatw-bg-white naxatw-w-full naxatw-h-full naxatw-mx-auto naxatw-absolute"
        />
        {/* <div id="sidebar-export" className="naxatw-flex naxatw-flex-col">
          <div className="naxatw-px-4 naxatw-py-3 naxatw-bg-grey-100 naxatw-font-bold naxatw-text-[18px] naxatw-leading-[22px] naxatw-text-grey-800">
            Transportation mapping Kenya 2
          </div>
          <div className="naxatw-px-4 naxatw-py-3">
            <p className="naxatw-text-body-sm">LEGEND</p>
          </div>
          <div className="naxatw-mt-auto naxatw-bg-primary-50">
            Exported from USAFIRI
          </div>
        </div> */}
      </div>
    </div>
  );
}
