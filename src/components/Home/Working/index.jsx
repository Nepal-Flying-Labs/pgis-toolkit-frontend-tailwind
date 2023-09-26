import Flex from '@Components/common/Layout/Flex/index';
import FlexColumn from '@Components/common/Layout/FlexColumn/index';
import React, { useEffect, useState } from 'react';
import Select from '@Assets/images/select.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as CommonCreators } from '@Actions/common';
import { data } from './data/data';

const { toggleCurrentWork } = CommonCreators;

export default function Working() {
  const [image, setImage] = useState([]);
  const dispatch = useDispatch();
  const { currentWork } = useSelector(state => state.common);
  useEffect(() => {
    if (currentWork) {
      setImage(data.filter(ele => ele.id === currentWork));
    }
  }, [dispatch, currentWork]);

  return (
    <Flex className="naxatw-gap-[83px]">
      <FlexColumn className="naxatw-gap-[84px]">
        <h1 className="naxatw-flex naxatw-text-[34px] naxatw-text-[#212121] naxatw-items-center">
          How{' '}
          <span className="naxatw-flex naxatw-text-[34px] naxatw-text-[#FF5A5F] naxatw-mx-2">
            USAFIRI
          </span>
          Works?
        </h1>
        <FlexColumn className="naxatw-gap-6 naxatw-w-[360px]">
          {data &&
            data.map(ele => (
              <div
                className="naxatw-flex naxatw-gap-5 naxatw-cursor-pointer"
                key={ele.id}
                onClick={() => dispatch(toggleCurrentWork(ele.id))}
              >
                {ele.id === currentWork ? (
                  <img src={Select} alt="select" />
                ) : (
                  <div className="naxatw-rounded-full naxatw-border-[1px] naxatw-w-5 naxatw-h-5 naxatw-text-base" />
                )}
                <p
                  className={`${
                    Number(currentWork) === Number(ele.id)
                      ? 'naxatw-text-base naxatw-font-semibold naxatw-text-[#212121]'
                      : 'naxatw-text-base'
                  }`}
                >
                  {ele.name}
                </p>
              </div>
            ))}
        </FlexColumn>
      </FlexColumn>
      <FlexColumn className="naxatw-gap-[43px]">
        <p className="naxatw-w-[393px] naxatw-text-base">
          We offer a range of participatory mapping services to voluntary and
          community groups, business organisations and government bodies.
        </p>
        <Flex className="naxatw-gap-[83px]">
          <img
            src={image[0]?.image}
            alt={image}
            className="naxatw-w-[785px] naxatw-h-[436px]"
          />
        </Flex>
      </FlexColumn>
    </Flex>
  );
}
