/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: W·S
 * @Date: 2023-11-14 11:28:47
 * @LastEditors: L·W
 * @LastEditTime: 2024-05-20 16:05:37
 * @Description: Description
 */
import { useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
import { To, useNavigate, useParams } from 'react-router-dom';

export const useHook = () => {
  // const { t } = useTranslation(['common', translationStr ?? '']);
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  const params = useParams() as Readonly<Record<string, string>>;
  const routerPush = useCallback(
    (
      pathStr: To | number,
      _param?: any | string | number,
      ...args: (string | number | undefined)[]
    ) => {
      if (pathStr === 'number') {
        navigate(pathStr);
      } else {
        if (_param && typeof pathStr !== 'number') {
          if (typeof _param === 'object') {
            // for (const key in param) {
            //   param[key] = getEncryptionData(param[key]);
            // }
            navigate(
              pathStr +
                '?' +
                Object.keys(_param)
                  .map((key) => key + '=' + _param[key])
                  .join('&')
            );
            return navigate(pathStr);
          } else {
            const _params = [_param, ...(args ?? [])].map((_item) => _item);
            return navigate(`${_params.join('/')}/${pathStr}`);
          }
        }
        return navigate(pathStr as string);
      }
    },
    [navigate]
  );

  // const t1 = useCallback(
  //   (str: string) => {
  //     if (Object.keys({ ...commonCn }).includes(str)) return t(str);
  //     return t(str, { ns: translationStr });
  //   },
  //   [t, translationStr]
  // );

  // const query = useMemo(
  //   () => ({
  //     memo: searchParams.toString(),
  //     get: (str: string) => searchParams.get(str) ?? '' // getDecryptionData(searchParams.get(str) ?? '')
  //   }),
  //   [searchParams]
  // );

  return { routerPush, params };
};

export const timeFormatting = (time: string, value?: number) => {
  const currentDateTime = new Date();
  const timestampDateTime = new Date(time);
  const currentYear = currentDateTime.getFullYear();
  const currentMonth = currentDateTime.getMonth() + 1;
  const currentDay = currentDateTime.getDate();
  const timestampYear = timestampDateTime.getFullYear();
  const timestampMonth = timestampDateTime.getMonth() + 1;
  const timestampDay = timestampDateTime.getDate();
  const timestampHour = timestampDateTime.getHours();
  const timestampMinute = timestampDateTime.getMinutes();
  // console.log(
  //   `${timestampYear}-${timestampMonth}-${timestampDay} ${timestampHour}:${timestampMinute}`,
  //   `${currentYear}-${currentMonth}-${currentDay}`
  // );
  let localTime = '';
  // 判断日期
  if (
    currentYear === timestampYear &&
    currentMonth === timestampMonth &&
    currentDay === timestampDay
  ) {
    // 当天，返回时分
    const hours = timestampDateTime.getHours();
    const minutes = timestampDateTime.getMinutes();
    const time = `${hours}:${minutes}`;
    // console.log("今天 " + time);
    localTime = time;
  } else if (
    currentYear === timestampYear &&
    currentMonth === timestampMonth &&
    currentDay - timestampDay === 1
  ) {
    // 昨天
    // console.log("昨天");
    localTime = '昨天';
  } else if (
    currentYear === timestampYear &&
    currentMonth === timestampMonth &&
    currentDay - timestampDay === 2
  ) {
    // 前天
    // console.log("前天");
    localTime = '前天';
  } else {
    // 更早，返回年月日
    const formattedDate = timestampDateTime.toLocaleDateString('zh-CN');
    // console.log(formattedDate);
    localTime = formattedDate;
  }
  if (value !== undefined) {
    // value 存在时的处理逻辑
    if (value === 0) {
      if (localTime.includes(':')) {
        return localTime;
      } else {
        return `${localTime} ${timestampHour}:${timestampMinute}`;
      }
    } else if (value === 1) {
      return localTime;
    } else {
      return `${timestampYear}-${timestampMonth}-${timestampDay} ${timestampHour}:${timestampMinute}`;
    }
  } else {
    // value 不存在时的处理逻辑
    return `${timestampYear}-${timestampMonth}-${timestampDay} ${timestampHour}:${timestampMinute}`;
  }
};

export default useHook;
