/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: L·W
 * @Date: 2024-04-09 14:47:00
 * @LastEditors: L·W
 * @LastEditTime: 2024-04-11 10:44:34
 * @Description: Description
 */
import { useRef } from 'react';
import './actionDiv.css';
interface PropsType {
  children: React.ReactNode;
  boundary: boolean;
  className: string;
}
// 单位处理
const withUnit = (val: number | string = 0) => {
  return parseInt(val + '') + 'px';
};
export const ActionDiv = (props: PropsType) => {
  const { children, className } = props;
  const divRef = useRef<any>(null);
  const startDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(divRef.current!.offsetLeft, 'down');
    event.preventDefault();
    const isResizeHandle = (event.target as HTMLDivElement).className.includes(
      'resize-handle'
    );
    const parentEl = divRef.current.parentElement || document.body;
    const initData = {
      startX: event.clientX,
      startY: event.clientY,
      startLeft: divRef.current!.offsetLeft,
      startTop: divRef.current!.offsetTop,
      startWidth: divRef.current!.offsetWidth,
      startHeight: divRef.current!.offsetHeight,
      maxX:
        parentEl.offsetLeft +
        parentEl.offsetWidth -
        divRef.current!.offsetWidth,
      maxY:
        parentEl.offsetTop +
        parentEl.offsetHeight -
        divRef.current!.offsetHeight,
      minX: parentEl.offsetLeft,
      minY: parentEl.offsetTop,
      maxWidth: parentEl.offsetWidth,
      maxHeight: parentEl.offsetHeight
    };
    if (isResizeHandle) {
      const direction = (event.target as HTMLDivElement).className.split(
        ' '
      )[1];
      const resize = (event: any) => {
        const dx = event.clientX - initData.startX;
        const dy = event.clientY - initData.startY;
        let width = initData.startWidth,
          height = initData.startHeight,
          left = initData.startLeft,
          top = initData.startTop;
        if (direction.includes('left')) {
          width = initData.startWidth - dx;
          left = initData.startLeft + dx / 2;
        }
        if (direction.includes('right')) {
          width = initData.startWidth + dx;
          left = initData.startLeft + dx / 2;
        }
        if (direction.includes('top')) {
          height = initData.startHeight - dy;
          top = initData.startTop + dy / 2;
        }
        if (direction.includes('bottom')) {
          height = initData.startHeight + dy;
          top = initData.startTop + dy / 2;
        }
        if (parseInt(width) <= 0 || parseInt(height) <= 0) return;
        if (props.boundary) {
          divRef.current!.style.width = withUnit(
            width > initData.maxWidth ? initData.maxWidth : width
          );
          divRef.current!.style.height = withUnit(
            height > initData.maxHeight ? initData.maxHeight : height
          );
          divRef.current!.style.left = withUnit(left);
          divRef.current!.style.top = withUnit(top);
        } else {
          divRef.current!.style.width = withUnit(width);
          divRef.current!.style.height = withUnit(height);
          divRef.current!.style.left = withUnit(left);
          divRef.current!.style.top = withUnit(top);
        }
      };
      const stopResize = () => {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
      };
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    } else {
      // console.log(divRef.current.parentElement.offsetWidth, 'parent');
      console.log(initData.maxX, 'max');
      const stopDrag = () => {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
      };
      const drag = (event: any) => {
        console.log(event, 'move');
        const newLeft = initData.startLeft + event.clientX - initData.startX;
        const newTop = initData.startTop + event.clientY - initData.startY;
        if (props.boundary) {
          divRef.current!.style.left = withUnit(
            newLeft < initData.minX
              ? initData.minX
              : newLeft > initData.maxX
                ? initData.maxX
                : newLeft
          );
          divRef.current!.style.top = withUnit(
            newTop < initData.minY
              ? initData.minY
              : newTop > initData.maxY
                ? initData.maxY
                : newTop
          );
        } else {
          divRef.current!.style.left = withUnit(newLeft);
          divRef.current!.style.top = withUnit(newTop);
        }
      };
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
    }
  };
  return (
    <div className={`box ${className}`} ref={divRef} onMouseDown={startDrag}>
      <div className="resize-handle top-left"></div>
      <div className="resize-handle top"></div>
      <div className="resize-handle top-right"></div>
      <div className="resize-handle right"></div>
      <div className="resize-handle bottom-right"></div>
      <div className="resize-handle bottom"></div>
      <div className="resize-handle bottom-left"></div>
      <div className="resize-handle left"></div>
      {children}
    </div>
  );
};
