/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: W·S
 * @Date: 2023-11-14 11:28:47
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-25 11:54:54
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

export default useHook;
