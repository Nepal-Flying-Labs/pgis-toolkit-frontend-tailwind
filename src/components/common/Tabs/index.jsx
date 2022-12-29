/* eslint-disable no-unused-vars */
import React, { Children, useState } from 'react';
import PropTypes from 'prop-types';

function Tab({ tab, children }) {
  return <div>{children}</div>;
}

const Tabs = ({ children, className, tabClassName }) => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = item => {
    setActiveTab(item);
  };
  return (
    <div>
      <div className={` naxatw-block naxatw-border-b ${className}`}>
        <ul className="naxatw-flex naxatw-gap-x-2 ">
          {Children.map(children, child => {
            const { tab } = child.props;
            return (
              <li className="">
                {' '}
                <a
                  className={`naxatw-inline-block naxatw-px-3 naxatw-py-3.5 naxatw-text-[13px] naxatw-leading-[18px] naxatw-font-bold ${tabClassName} ${
                    activeTab === tab
                      ? 'naxatw-border-b-[2px] naxatw-border-[#484848] naxatw-text-[#484848]'
                      : 'naxatw-text-[#989898] hover:naxatw-text-[#00A699]'
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        {Children.map(children, child => {
          if (child.props.tab !== activeTab) return null;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

Tab.propTypes = {
  tab: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

Tabs.defaultProps = {
  className: '',
  tabClassName: '',
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tabClassName: PropTypes.string,
};

export { Tab };
export default Tabs;
