/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import useTranslation from '@src/hooks/useTranslation';

const calTotalCount = (data, dataKey) => {
  const values = data.map(d => +d?.[dataKey]);
  console.log(values);
  return values.reduce((item, value) => item + value, 0);
};

// console.log(slicedData);
const calPercentage = (count, data, dataKey) => {
  const width = Math.ceil((count / calTotalCount(data, dataKey)) * 100);
  return width;
};

const colorCode = [
  '#28B270',
  '#FF4538',
  '#FAA526',
  '#1A83FB',
  '#A544B7',
  '#34C5E5',
  '#FFEBAD',
  '#F06292',
  '#497174',
  '#38E54D',
  '#3C2317',
];

// eslint-disable-next-line react/prop-types
function VerticalBlockChart({ data, dataKey }) {
  // const translationFunc = useTranslation();

  if (data.length > 0) {
    return (
      <div className="blockChart ">
        <div className="naxatw-h-[20px] naxatw-w-full naxatw-flex naxatw-mb-3">
          {data.map((d, index) => {
            const pWidth = parseInt(
              calPercentage(d?.[dataKey], data, dataKey),
              10,
            );
            return (
              <div
                style={{
                  width: `${pWidth}%`,
                  backgroundColor: `${colorCode[index]}`,
                }}
                className="naxatw-h-full first:naxatw-rounded-l-md last:naxatw-rounded-r-md"
              />
            );
          })}
        </div>

        <div className="blockChart-card">
          {data.map((d, index) => (
            <div className="naxatw-w-full naxatw-flex naxatw-mb-2 naxatw-items-center">
              <div
                style={{ backgroundColor: `${colorCode[index]}` }}
                className="material-icons naxatw-text-white naxatw-rounded-full naxatw-h-3 naxatw-w-3 naxatw-px-1 naxatw-text-base naxatw-mr-2"
              />
              {/* d.name */}
              <div className="naxatw-flex naxatw-justify-between naxatw-w-full naxatw-pl-3">
                <div className="title naxatw-text-body-md naxatw-overflow-hidden naxatw-flex-wrap">
                  {d.name}
                  {/* {translationFunc(`mappage_${d.name.toLowerCase().split(' ').join('_')}`)} */}
                </div>
                {/* mobile view fix count pushed outside the field */}
                <div className="count naxatw-text-button-1">{d?.[dataKey]}</div>
              </div>
            </div>
          ))}
          <div className="naxatw-w-full naxatw-flex naxatw-mb-2 naxatw-items-center">
            <div className="material-icons naxatw-text-white naxatw-rounded-full naxatw-h-3 naxatw-w-3 naxatw-px-1 naxatw-text-base naxatw-mr-2" />
            {/* d.name */}
            <div className="naxatw-flex naxatw-justify-between naxatw-w-full naxatw-pl-3">
              <div className="title naxatw-text-body-md naxatw-overflow-hidden naxatw-flex-wrap">
                Total
                {/* {translationFunc(`mappage_${d.name.toLowerCase().split(' ').join('_')}`)} */}
              </div>
              {/* mobile view fix count pushed outside the field */}
              <div className="count naxatw-text-button-1">
                {calTotalCount(data, dataKey)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

// eslint-disable-next-line react/prop-types
function HorizontalBlockChart({
  data,
  title,
  dataKey,
  barColor,
  chartRef,
  containerClassname,
  secondTitle,
  thirdTitle,
  hasShowMore,
}) {
  const [toggleShowMore, setToggleShowMore] = useState(false);
  if (data.length > 0) {
    return (
      <div className="naxatw-px-3">
        <div className="blockChart">
          {title && (
            <div className="naxatw-flex">
              <div className="card-title naxatw-flex naxatw-justify-between naxatw-py-[21px] naxatw-flex-[80%]">
                <p className="naxatw-text-overline naxatw-uppercase">{title}</p>
              </div>
              <div className="card-title naxatw-flex naxatw-justify-between naxatw-py-[21px] naxatw-flex-[15%]">
                <p className="naxatw-text-overline naxatw-uppercase">
                  {secondTitle}
                </p>
              </div>
              <div className="card-title naxatw-flex naxatw-justify-between naxatw-py-[21px] naxatw-flex-[15%]">
                <p className="naxatw-text-overline naxatw-uppercase">
                  {thirdTitle}
                </p>
              </div>
            </div>
          )}
          <div
            className={`${containerClassname} naxatw-mb-2 ${
              toggleShowMore
                ? 'naxatw-overflow-y-scroll scrollbar naxatw-h-fit'
                : ' naxatw-h-full naxatw-overflow-y-hidden'
            } `}
            ref={chartRef}
          >
            <div className=" naxatw-w-full naxatw-mb-3">
              {data.map(d => {
                const pWidth = parseInt(
                  calPercentage(d?.[dataKey], data, dataKey),
                  10,
                );
                // console.log(pWidth);
                // console.log(colorCode[0]);
                return (
                  <div className="naxatw-flex  naxatw-items-center naxatw-mb-4">
                    <div className="naxatw-text-body-md naxatw-w-[30%] naxatw-mr-5">
                      <p>{d.name}</p>
                    </div>
                    <div className="naxatw-w-[50%] naxatw-mr-5 naxatw-h-full naxatw-flex naxatw-items-center">
                      <div
                        style={{
                          width: `${pWidth}%`,
                          backgroundColor: barColor,
                        }}
                        className="naxatw-h-[24px] first:naxatw-rounded-l-md last:naxatw-rounded-r-md"
                      />
                    </div>
                    <div className="naxatw-text-button-1 naxatw-w-[15%]">
                      {d?.[dataKey]}
                    </div>
                    <div className="naxatw-text-button-1 naxatw-w-[15%]">
                      {parseFloat(d?.percentage).toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {hasShowMore && !toggleShowMore ? (
            <div>
              <div
                role="button"
                tabIndex="-1"
                onKeyDown={() => {}}
                onClick={() => setToggleShowMore(true)}
                className="naxatw-flex naxatw-justify-center naxatw-py-3 naxatw-text-[#1973E7] naxatw-rounded-bl-3xl naxatw-rounded-br-3xl naxatw-items-center"
              >
                <div className="naxatw-text-button-1">See More</div>
                <i className="material-icons naxatw-text-2xl naxatw-leading-6">
                  chevron_right
                </i>
              </div>
            </div>
          ) : null}
          {hasShowMore && toggleShowMore ? (
            <div>
              <div
                role="button"
                tabIndex="-1"
                onKeyDown={() => {}}
                onClick={() => setToggleShowMore(false)}
                className="naxatw-flex naxatw-justify-center naxatw-py-3 naxatw-text-[#1973E7] naxatw-rounded-bl-3xl naxatw-rounded-br-3xl naxatw-items-center"
              >
                <div className="naxatw-text-button-1">See Less</div>
                <i className="material-icons naxatw-text-2xl naxatw-leading-6">
                  chevron_right
                </i>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  return null;
}
VerticalBlockChart.propTypes = {
  data: PropTypes.object,
};
VerticalBlockChart.defaultProps = {
  data: {},
};

HorizontalBlockChart.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  barColor: PropTypes.string,
  containerClassname: PropTypes.string,
  secondTitle: PropTypes.string,
  thirdTitle: PropTypes.string,
};
HorizontalBlockChart.defaultProps = {
  data: {},
  title: '',
  barColor: '#FF4538',
  containerClassname: 'naxatw-h-[400px] ',
  secondTitle: '',
  thirdTitle: '',
};

export { VerticalBlockChart, HorizontalBlockChart };
