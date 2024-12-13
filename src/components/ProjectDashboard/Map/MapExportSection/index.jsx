/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-classes-per-file */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import MaterialIcon from '@Components/common/MaterialIcon';
import Select from '@Components/common/Select';
import Toggle from '@Components/common/Toggle';
import Button from '@Components/common/Button/index';
import Spinner from '@src/components/common/Spinner';
// import Logo from '@src/assets/images/logo.png';
import Logo from '@Assets/images/home/footer/FooterLogo.svg';
import ScaleLine from 'ol/control/ScaleLine';
import Graticule from 'ol/layer/Graticule';
import { Stroke } from 'ol/style';
import { METERS_PER_UNIT } from 'ol/proj';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import JsPDF from 'jspdf';
import {
  orientationOptions,
  paperSizeOptions,
  outputFormatOptions,
  resolutionOptions,
  marginSizeOptions,
  paperSize,
} from './constants';
import NorthArrow from './north-arrow.png';
import Legend from './legend';
import { useReactToPrint } from './reactprint';

export default function MapExportSection({
  exportMap,
  legendData,
  title,
  topMargin,
  organizationLogo,
  closeFunction,
}) {
  const [mapInfo, setMapInfo] = useState({
    target: null,
    size: null,
    extent: null,
  });
  const [currentOrientation, setCurrentOrientation] = useState('landscape');
  const [currentPaper, setCurrentPaper] = useState('A4');
  const [currentPaperSize, setCurrentPaperSize] = useState([210, 297]);
  const [currentResolution, setCurrentResolution] = useState(96);
  const [currentMargin, setCurrentMargin] = useState(0);
  const [currentFormat, setCurrentFormat] = useState('png');
  const [northArrowChecked, setNorthArrowChecked] = useState(true);
  const [scaleChecked, setScaleChecked] = useState(true);
  const [graticuleChecked, setGraticuleChecked] = useState(false);
  const [legendChecked, setLegendChecked] = useState(true);
  const [coordinateChecked, setCoordinateChecked] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [scaleValue, setScaleValue] = useState(0);

  const paperRef = useRef(null);
  const exportMapRef = useRef(null);

  const coordinatesystem3857 = `
    <h6>Coordinate System: <strong>WGS 1984 Web Mercator Auxiliary Sphere</strong></h6>
    <h6>Projection: <strong>Mercator Auxiliary Sphere</strong></h6>
    <h6>Datum: <strong>WGS 1984</strong></h6>
    <h6>Units: <strong>Meter</strong></h6>
  `;

  const customControls = {
    scale: new ScaleLine({
      minWidth: 100,
      units: 'metric',
      target: exportMapRef.current,
    }),
    portraitGraticule: new Graticule({
      strokeStyle: new Stroke({
        color: 'rgba(255,120,0,0.4)',
        width: 0.5,
      }),
      showLabels: true,
      wrapX: false,
      lonLabelPosition: 0.4,
      latLabelPosition: 1,
    }),
    landscapeGraticule: new Graticule({
      strokeStyle: new Stroke({
        color: 'rgba(255,120,0,0.4)',
        width: 0.5,
      }),
      showLabels: true,
      wrapX: false,
      lonLabelPosition: 0,
      latLabelPosition: 0.7,
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
    exportMap.setSize([size[0], size[1]]);
    exportMap.updateSize();
    if (orientation === 'landscape') {
      exportMap.getViewport().style.width = '70%';
      exportMap.getViewport().style.height = '100%';
      document.getElementById('side-component').style.top = 0;
      document.getElementById('side-component').style.right = 0;
      document.getElementById('side-component').style.width = '30%';
      document.getElementById('side-component').style.height = '100%';
      document.getElementById('map-legend-data').style.maxHeight = '15rem';
      document.getElementById('map-coordinate').style.maxWidth = '100%';
      document.getElementById('map-description').style.marginTop = '10px';
      document.getElementById('map-description').style.marginLeft = 0;
      document.getElementById('map-description').style.maxWidth = '100%';
    } else {
      exportMap.getViewport().style.width = '100%';
      exportMap.getViewport().style.height = '60%';
      document.getElementById('side-component').style.top = '60%';
      document.getElementById('side-component').style.right = 0;
      document.getElementById('side-component').style.width = '100%';
      document.getElementById('side-component').style.height = '40%';
      document.getElementById('map-legend-data').style.maxHeight = '6rem';
      document.getElementById('map-coordinate').style.maxWidth = '49%';
      document.getElementById('map-description').style.marginTop = 0;
      document.getElementById('map-description').style.marginLeft = '10px';
      if (coordinateChecked)
        document.getElementById('map-description').style.maxWidth = '49%';
    }
    document
      .getElementById('export-legend')
      .appendChild(document.getElementById('map-legend'));
    document
      .getElementById('scale-line')
      .appendChild(document.querySelector('.ol-scale-line'));
    document.querySelector('.ol-scale-line').style.position = 'relative';
  };

  const calculateScale = () => {
    const view = exportMap.getView();
    const resolution = view.getResolution();
    const units = view.getProjection().getUnits();
    const dpi = 96 / 25.4;
    const mpu = METERS_PER_UNIT[units];
    const scale = resolution * mpu * 39.37 * dpi;
    setScaleValue(scale.toFixed(0));
    const scaleNumeric = document.getElementById('scale-numeric');
    if (scaleNumeric != null)
      scaleNumeric.innerHTML = `Map Scale &nbsp; <strong>1:${scale.toFixed(
        0,
      )}</strong>`;
  };

  window.onresize = () => {
    handleSize(currentPaperSize, currentOrientation, currentMargin);
  };

  exportMap.on('moveend', () => {
    calculateScale();
  });

  const handlePrint = useReactToPrint({
    content: () => exportMapRef.current,
  });

  const handleExport = () => {
    setIsExporting(true);
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule(
      'body > div:last-child img { display: inline-block; }',
    );

    const size = exportMap.getSize();
    const extent = exportMap.getView().calculateExtent(size);
    let pSize = [currentPaperSize[0], currentPaperSize[1]];
    if (currentOrientation === 'landscape') {
      pSize = [currentPaperSize[1], currentPaperSize[0]];
    }
    const dpi = currentResolution;
    const width = Math.round((pSize[0] * dpi) / 25.4);
    const height = Math.round((pSize[1] * dpi) / 25.4);
    // Set print size
    const printSize = [width, height];
    // const scaling = Math.min(width / size[0], height / size[1]);
    exportMapRef.current.style.position = 'absolute';
    exportMapRef.current.style.width = `${width}px`;
    exportMapRef.current.style.height = `${height}px`;
    // exportMapRef.current.style.transform = `scale(${scaling})`;
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
          const pdf = new JsPDF(currentOrientation, undefined, currentPaper);
          pdf.addImage(
            canvas.toDataURL('image/jpeg'),
            'JPEG',
            0,
            0,
            pSize[0],
            pSize[1],
          );
          pdf.save('map.pdf');
        } else if (currentFormat === 'print') {
          handlePrint();
        }
        // Reset original map size
        exportMapRef.current.style.width = `${size[0]}px`;
        exportMapRef.current.style.height = `${size[1]}px`;
        // exportMapRef.current.style.transform = `scale(${1 / scaling})`;
        exportMap.setSize(size);
        exportMap.updateSize();
        exportMap.getView().fit(extent, { size });
        setIsExporting(false);
      });
    });
    exportMap.renderSync();
  };

  const handleTitleChange = e => {
    document.getElementById('title').innerHTML = e.target.value;
  };
  const handleSubTitleChange = e => {
    document.getElementById('subtitle').innerHTML = e.target.value;
  };
  const handleDescriptionChange = e => {
    if (e.target.value === '') {
      document.getElementById('map-description').innerHTML = null;
    } else {
      document.getElementById(
        'map-description',
      ).innerHTML = `<h6 class='naxatw-text-primary-400 naxatw-font-bold'>DESCRIPTION</h6>${e.target.value}`;
    }
  };

  const handleScaleChange = e => {
    setScaleValue(e.target.value);
    const view = exportMap.getView();
    const units = view.getProjection().getUnits();
    const dpi = 96 / 25.4;
    const mpu = METERS_PER_UNIT[units];
    const resolution = e.target.value / (mpu * 39.37 * dpi);
    exportMap.getView().setResolution(resolution);
  };

  const handleNorthArrow = useCallback(e => {
    if (e.target.checked) {
      setNorthArrowChecked(true);
      document.getElementById('north-arrow').style.display = 'block';
    } else {
      setNorthArrowChecked(false);
      document.getElementById('north-arrow').style.display = 'none';
    }
  }, []);

  const handleScale = useCallback(e => {
    if (e.target.checked) {
      setScaleChecked(true);
      exportMap.addControl(customControls.scale);
      document
        .getElementById('scale-line')
        .appendChild(document.querySelector('.ol-scale-line'));
      document.querySelector('.ol-scale-line').style.position = 'relative';
      document.getElementById('scale-numeric').style.display = 'flex';
    } else {
      setScaleChecked(false);
      exportMap.removeControl(customControls.scale);
      document.getElementById('scale-numeric').style.display = 'none';
    }
  }, []);

  const removeGraticule = () => {
    customControls.portraitGraticule.setMap(null);
    customControls.landscapeGraticule.setMap(null);
  };

  const handleGraticule = e => {
    if (e.target.checked) {
      setGraticuleChecked(true);
    } else {
      removeGraticule();
      setGraticuleChecked(false);
    }
  };

  const handleLegend = useCallback(e => {
    if (e.target.checked) {
      setLegendChecked(true);
      document.getElementById('export-legend').style.display = 'block';
    } else {
      setLegendChecked(false);
      document.getElementById('export-legend').style.display = 'none';
    }
  }, []);

  const handleCoordinate = useCallback(e => {
    if (e.target.checked) {
      setCoordinateChecked(true);
      document.getElementById('map-coordinate').style.display = 'block';
    } else {
      setCoordinateChecked(false);
      document.getElementById('map-coordinate').style.display = 'none';
    }
  }, []);

  const addSideComponent = () => {
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.top = 0;
    element.style.right = 0;
    element.id = 'side-component';
    element.className = 'naxatw-bg-white naxatw-flex naxatw-flex-col resizable';
    element.innerHTML = `
      <div class='naxatw-overflow-hidden'>
        <div id='logo' class='naxatw-flex naxatw-justify-between naxatw-px-2 naxatw-py-2'>
          <div id='organization-logo'>
            <img src=${organizationLogo} class='naxatw-max-h-10 naxatw-max-w-12' />
          </div>
          <div id='north-arrow'>
            <img src=${NorthArrow} width=30 height=40 class='naxatw-max-h-10 naxatw-max-w-8'/>
          </div>
        </div>
        <div id='title' class="naxatw-px-2 naxatw-py-0 naxatw-font-bold naxatw-text-[18px] naxatw-leading-[22px] naxatw-text-grey-800">
                ${title}
        </div>
        <p id='subtitle' class="naxatw-px-2"></p>
        <div id="export-legend" class="naxatw-px-2 naxatw-py-2"></div>
        <div id='scale-numeric' class='naxatw-flex naxatw-justify-center'></div>
        <div id='scale-line' class='naxatw-px-2 naxatw-mt-2 naxatw-flex naxatw-justify-center'></div>
        <div class="naxatw-px-2 naxatw-py-2 naxatw-flex naxatw-flex-row naxatw-flex-wrap">
          <div id="map-coordinate">
            <div class='naxatw-text-primary-400 naxatw-font-bold'>COORDINATE SYSTEM</div>
              ${coordinatesystem3857}
          </div>
          <div id='map-description'></div>
        </div>
      </div>
      <div id="usafiri-logo" class="naxatw-flex naxatw-justify-end naxatw-py-2 naxatw-mt-auto naxatw-bg-primary-50 naxatw-bottom-0">
        Exported from <img src=${Logo} width=80 height=30 class='naxatw-px-2' />
      </div>`;
    exportMapRef.current.appendChild(element);
  };

  const closeExport = () => {
    closeFunction();
    removeGraticule();
    exportMap.setTarget(mapInfo.target);
    exportMap.getViewport().style.width = '100%';
    exportMap.getViewport().style.height = '100%';
    exportMap.getView().fit(mapInfo.extent, mapInfo.size);
    exportMap.updateSize();
  };

  useEffect(() => {
    setMapInfo({
      target: exportMap.getTarget(),
      size: exportMap.getSize(),
      extent: exportMap.getView().calculateExtent(),
    });
    if (exportMap) exportMap.setTarget(exportMapRef.current);
    exportMap.enableRoation = false;
    exportMap.getViewport().style.backgroundColor = 'white';
    exportMap.addControl(customControls.scale);
    addSideComponent();
    if (organizationLogo === null) {
      document.getElementById('organization-logo').style.display = 'none';
      document.getElementById('logo').style.justifyContent = 'flex-end';
    }
  }, []);

  useEffect(() => {
    handleSize(currentPaperSize, currentOrientation, currentMargin);
  }, [currentPaperSize, currentOrientation, currentMargin]);

  useEffect(() => {
    if (currentOrientation === 'landscape' && graticuleChecked) {
      customControls.landscapeGraticule.setMap(exportMap);
    }
    if (currentOrientation === 'portrait' && graticuleChecked) {
      customControls.portraitGraticule.setMap(exportMap);
    }
  }, [graticuleChecked]);

  useEffect(() => {
    if (coordinateChecked === false && currentOrientation === 'portrait') {
      document.getElementById('map-description').style.maxWidth = '100%';
    } else if (
      coordinateChecked === true &&
      currentOrientation === 'portrait'
    ) {
      document.getElementById('map-description').style.maxWidth = '49%';
    }
  }, [coordinateChecked]);

  return (
    <div
      className="naxatw-absolute naxatw-flex naxatw-w-full naxatw-z-[100]"
      style={{ height: `calc(100vh - ${topMargin}px)` }}
    >
      {isExporting && (
        <div className="naxatw-absolute naxatw-w-full naxatw-h-screen naxatw-bg-slate-400 naxatw-z-[150] naxatw-bg-opacity-75">
          <div className="naxatw-flex naxatw-h-full naxatw-justify-center naxatw-items-center">
            <Spinner className="naxatw-fill-primary-400 naxatw-w-24 naxatw-h-24" />
          </div>
        </div>
      )}
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
            onClick={closeExport}
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
              defaultValue={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Map Sub-Title</label>
            <input
              type="text"
              className="naxatw-input"
              name="mapTitle"
              placeholder="Enter Map Sub-Title"
              onChange={handleSubTitleChange}
            />
          </div>
          <div className="naxatw-space-y-2">
            <label className="naxatw-label">Map Description</label>
            <input
              type="text"
              className="naxatw-input"
              name="mapTitle"
              placeholder="Enter Map Description"
              onChange={handleDescriptionChange}
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
          <div className="naxatw-flex naxatw-gap-3">
            <div className="naxatw-space-y-2 naxatw-w-full">
              <label className="naxatw-label">Scale</label>
              <input
                type="number"
                min="0"
                onKeyDown={event => {
                  if (event.key === '.') {
                    event.preventDefault();
                  }
                }}
                className="naxatw-input"
                name="mapScale"
                placeholder="Enter Map Scale"
                value={scaleValue}
                onChange={handleScaleChange}
              />
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
        </div>

        <div className="naxatw-mt-[1.875rem] naxatw-space-y-5">
          <div className="naxatw-flex naxatw-justify-between">
            <p className="naxatw-text-body-lg">Legend</p>
            <Toggle checked={legendChecked} onChange={handleLegend} />
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
          <div className="naxatw-flex naxatw-justify-between">
            <p className="naxatw-text-body-lg">Coordinate System</p>
            <Toggle checked={coordinateChecked} onChange={handleCoordinate} />
          </div>
        </div>
        <div className="naxatw-mt-[3rem] naxatw-flex naxatw-justify-center">
          <Button
            className="naxatw-btn-primary"
            iconLeft="file_download"
            onClick={handleExport}
          >
            Export
          </Button>
        </div>
        <Legend legendData={legendData} />
      </div>
      <div
        ref={paperRef}
        className="naxatw-bg-grey-300 naxatw-w-4/5 naxatw-h-full naxatw-flex naxatw-items-center naxatw-justify-center naxatw-overflow-hidden"
      >
        <div
          ref={exportMapRef}
          className="naxatw-bg-white naxatw-w-full naxatw-h-full naxatw-mx-auto naxatw-absolute"
        />
      </div>
    </div>
  );
}
