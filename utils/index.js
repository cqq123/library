import qs from 'qs';
import moment from 'moment';

export const fetchRequest = (url, param) => {
  const resultUrl = `${url}?${qs.stringify(param)}`;
  return fetch(
    resultUrl,
    {
      method: 'get',
      credentials: 'include',
    },
  ).then(res => res.json());
};

export const momentFormat = (a, b) =>
  moment(a).format(b);
