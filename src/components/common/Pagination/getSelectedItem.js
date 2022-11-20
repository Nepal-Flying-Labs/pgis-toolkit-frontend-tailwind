import { isEmpty } from '@src/utils/commonUtils';

function getSelectedItem(option) {
  const selected = option.filter(data => data.isSelected);
  return !isEmpty(selected) ? selected : option;
}

export default getSelectedItem;

export const getSelectedItemRange = (begin, end, data) =>
  data.length > end ? `${begin + 1}-${end}` : `${begin + 1}-${data.length}`;
