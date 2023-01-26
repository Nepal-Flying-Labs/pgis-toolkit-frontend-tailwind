import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Creators } from '@Actions/projectMap';
import MaterialIcon from '@Components/common/MaterialIcon';
import Select from '@Components/common/Select';
import Toggle from '@Components/common/Toggle';
import Button from '@Components/common/Button/index';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { formats } from './constants';

const { setProjectMapState } = Creators;

export default function MapSidebar({exportMap, exportMapRef, exportPaperRef}) {
  const dispatch = useDispatch();
  const [currentFormat, setCurrentFormat] = useState(formats.PNG)

  const handlePrint = () => {
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');
    exportMap.once('rendercomplete', function () {
        html2canvas(exportPaperRef, {
            allowTaint: true,
            useCORS: true,
            ignoreElements: (el) => {
                return (
                    el.classList.contains('ol-control') ||
                    el.classList.contains('controlMenu')
                );
            },
        }).then((canvas) => {
            if (currentFormat === formats.Clipboard) {
                canvas.toBlob((blob) => {
                    try {
                        navigator.clipboard.write([
                            new window.ClipboardItem(
                                Object.defineProperty({}, blob.type, {
                                    value: blob,
                                    enumerable: true
                                })
                            )
                        ]);
                    } catch (err) {
                        console.log(err);
                    }
                });
            } else if (currentFormat === formats.PNG) {
                canvas.toBlob((blob) => { if (blob) saveAs(blob, 'map.png') });
            } else if (currentFormat === formats.JPEG) {
                canvas.toBlob((blob) => { if (blob) { saveAs(blob, 'map.jpg') } });
            } 
            // else if (currentFormat === formats.PDF) {
            //     const orientation = currentPaperOrientation === paperOrientation.Landscape ? 'landscape' : 'portrait';
            //     const pageSize = 'A4';
            //     const pdf = new JsPDF(orientation, undefined, pageSize);
            //     const dim = currentPaperSize;
            //     const size = exportMap.getSize();
            //     const scale = Math.max(
            //         size[1] / ((orientation === 'landscape' ? dim[1] : dim[0]) - 20),
            //         size[0] / ((orientation === 'landscape' ? dim[0] : dim[1]) - 20)
            //     );
            //     const finalSize = [size[0] / scale, size[1] / scale];

            //     const [x, y] = [
            //         Math.abs(
            //             ((orientation === 'landscape' ? dim[0] : dim[1]) - finalSize[0]) / 2
            //         ),
            //         Math.abs(
            //             ((orientation === 'landscape' ? dim[1] : dim[0]) - finalSize[1]) / 2
            //         ),
            //     ];
            //     pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', x, y, finalSize[0], finalSize[1]);
            //     pdf.save('map.pdf');
            // }
        });
    });
    exportMap.renderSync();
}

  return (
    <div
      className="naxatw-bg-grey-100 naxatw-px-4 naxatw-py-3.5 naxatw-transition-all naxatw-duration-300 naxatw-overflow-auto scrollbar"
      style={{
        minWidth: '23rem',
        maxWidth: '23rem',
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
            // value={values.username}
            // onChange={handleChange}
            // {...inputProps}
          />
        </div>

        <div className="naxatw-flex naxatw-gap-3">
          <div className="naxatw-space-y-2 naxatw-w-full">
            <label className="naxatw-label">Orientation</label>
            <Select
              placeholder="Choose"
              // options={downloadOptions}
              label="label"
              className="naxatw-bg-white naxatw-px-2 naxatw-py-[14px] naxatw-h-[48px]"
              value="value"
              // onChange={selectedItem => setSelectedOption(selectedItem)}
              // selectedValue={selectedOption?.id}
            />
          </div>
          <div className="naxatw-space-y-2 naxatw-w-full">
            <label className="naxatw-label">Page Size</label>
            <Select
              placeholder="Choose"
              // options={downloadOptions}
              label="label"
              value="value"
              className="naxatw-bg-white naxatw-px-2 naxatw-py-[14px] naxatw-h-[48px]"
              // onChange={selectedItem => setSelectedOption(selectedItem)}
              // selectedValue={selectedOption?.id}
            />
          </div>
        </div>

        <div className="naxatw-space-y-2 naxatw-w-full">
          <label className="naxatw-label">Output Format</label>
          <Select
            placeholder="Choose"
            // options={downloadOptions}
            label="label"
            className="naxatw-bg-white naxatw-px-2 naxatw-py-[14px] naxatw-h-[48px]"
            value="value"
            // onChange={selectedItem => setSelectedOption(selectedItem)}
            // selectedValue={selectedOption?.id}
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
          <Toggle checked />
        </div>
        <div className="naxatw-flex naxatw-justify-between">
          <p className="naxatw-text-body-lg">Scale bar</p>
          <Toggle checked />
        </div>
        <div className="naxatw-flex naxatw-justify-between">
          <p className="naxatw-text-body-lg">Grid</p>
          <Toggle checked />
        </div>
      </div>
      <div className="naxatw-mt-[5rem] naxatw-flex naxatw-justify-center">
        <Button
          className="naxatw-btn-primary"
          iconLeft="file_download"
          onClick={handlePrint}
        >
          Export
        </Button>
      </div>
    </div>
  );
}
