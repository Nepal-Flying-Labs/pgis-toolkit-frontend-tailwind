import { isEmpty } from '@src/utils/commonUtils';

function getSelectedItem(option) {
  const selected = option.filter(data => data.isSelected);
  return !isEmpty(selected) ? selected : option;
}

export default getSelectedItem;

export const getSelectedItemRange = (begin, end, data) =>
  data.length > end ? `${begin + 1}-${end}` : `${begin + 1}-${data.length}`;

export const getMaxPage = (totalCount, pageSize) => {
  const maxPage = Math.ceil(totalCount / pageSize);
  return `${maxPage}`;
};

export const getSelectedRange = (totalCount, pageSize, currentPage) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  return totalCount !== 0
    ? `${startIndex + 1}-${endIndex}`
    : `${startIndex}-${endIndex}`;
};
