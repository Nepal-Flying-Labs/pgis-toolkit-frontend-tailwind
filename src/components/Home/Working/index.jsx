import Flex from '@Components/common/Layout/Flex/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React, { useEffect, useState } from 'react';
import Select from '@Assets/images/select.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { howUsaFiriWorksdata } from './data/data';

const { toggleCurrentWork } = CommonCreators;

export default function Working() {
  const { currentWork } = useSelector(state => state.common);
  const [image, setImage] = useState(
    howUsaFiriWorksdata.filter(
      ele => ele.id.toString() === currentWork.toString(),
    ),
  );
  const dispatch = useDispatch();

  console.log(currentWork);
  useEffect(() => {
    if (currentWork) {
      setImage(
        howUsaFiriWorksdata.filter(
          ele => ele.id.toString() === currentWork.toString(),
        ),
      );
    }
  }, [dispatch, currentWork]);

  return (
    <Flex className="naxatw-gap-[83px]">
      <FlexColumn className="naxatw-gap-[84px]">
        <h1 className="naxatw-flex naxatw-text-[34px] naxatw-text-[#212121] naxatw-items-center">
          How{' '}
          <span className="naxatw-flex naxatw-text-[34px] naxatw-text-[#FF5A5F] naxatw-mx-2">
            uSAFIRI
          </span>
          Works?
        </h1>
        <FlexColumn className="naxatw-gap-6 naxatw-w-[360px]">
          {howUsaFiriWorksdata &&
            howUsaFiriWorksdata.map(ele => (
              <div
                className="naxatw-flex naxatw-gap-5 naxatw-cursor-pointer"
                key={ele.id}
                onClick={() => dispatch(toggleCurrentWork(ele.id))}
              >
                {ele.id.toString() === currentWork.toString() ? (
                  <img src={Select} alt="select" />
                ) : (
                  <div className="naxatw-rounded-full naxatw-border-[1px] naxatw-w-5 naxatw-h-5 naxatw-text-base" />
                )}
                <p
                  className={`${
                    currentWork.toString() === ele.id.toString()
                      ? 'naxatw-text-base naxatw-font-semibold naxatw-text-[#212121]'
                      : 'naxatw-text-base'
                  }`}
                >
                  {ele.heading}
                </p>
              </div>
            ))}
        </FlexColumn>
      </FlexColumn>
      <FlexColumn className="naxatw-gap-[43px]">
        <p className="naxatw-w-[393px] naxatw-text-base">
          {image[0]?.description}
        </p>
        <Flex className="naxatw-gap-[83px]">
          <img
            src={image[0]?.img}
            alt={image}
            className="naxatw-w-[785px] naxatw-h-[436px] naxatw-object-contain"
          />
        </Flex>
      </FlexColumn>
    </Flex>
  );
}
