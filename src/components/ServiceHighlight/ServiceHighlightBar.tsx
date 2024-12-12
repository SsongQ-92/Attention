import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { TagRectData } from '../../config/types';
import useBoundStore from '../../store/useBoundStore';

interface Props {
  elementRects: TagRectData[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

function ServiceHighlightBar({ elementRects, activeIndex, setActiveIndex }: Props) {
  const [prevScrollY, setPrevScrollY] = useState<number>(window.scrollY);

  const isKeyboardMode = useBoundStore((state) => state.isKeyboardMode);
  const setHighlightLayerInfo = useBoundStore((state) => state.setHighlightLayerInfo);
  const toggleKeyboardMode = useBoundStore((state) => state.toggleKeyboardMode);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isKeyboardMode) {
        e.preventDefault();

        if (e.code === 'ArrowDown') {
          if (activeIndex === elementRects.length - 1) {
            setPrevScrollY(window.scrollY);

            window.scrollBy({
              top: window.innerHeight,
              behavior: 'smooth',
            });
          } else {
            setActiveIndex((prev) => prev + 1);
            setHighlightLayerInfo({
              top: elementRects[activeIndex + 1].tagStartRectY,
              left: elementRects[activeIndex + 1].tagStartRectX,
              width: elementRects[activeIndex + 1].tagWidth,
              height: elementRects[activeIndex + 1].tagHeight,
            });
          }
        } else if (e.code === 'ArrowUp') {
          if (activeIndex === 0) {
            setPrevScrollY(window.scrollY);

            window.scrollBy({
              top: -window.innerHeight,
              behavior: 'smooth',
            });
          } else {
            setActiveIndex((prev) => prev - 1);
            setHighlightLayerInfo({
              top: elementRects[activeIndex - 1].tagStartRectY,
              left: elementRects[activeIndex - 1].tagStartRectX,
              width: elementRects[activeIndex - 1].tagWidth,
              height: elementRects[activeIndex - 1].tagHeight,
            });
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isKeyboardMode) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isKeyboardMode, activeIndex, setActiveIndex, elementRects, setHighlightLayerInfo]);

  useEffect(() => {
    if (!isKeyboardMode) return;

    if (window.scrollY < prevScrollY) {
      setPrevScrollY(window.scrollY);
      setActiveIndex(elementRects.length - 1);

      setHighlightLayerInfo({
        top: elementRects[elementRects.length - 1].tagStartRectY,
        left: elementRects[elementRects.length - 1].tagStartRectX,
        width: elementRects[elementRects.length - 1].tagWidth,
        height: elementRects[elementRects.length - 1].tagHeight,
      });
    } else if (window.scrollY > prevScrollY) {
      setPrevScrollY(window.scrollY);
      setActiveIndex(0);

      setHighlightLayerInfo({
        top: elementRects[0].tagStartRectY,
        left: elementRects[0].tagStartRectX,
        width: elementRects[0].tagWidth,
        height: elementRects[0].tagHeight,
      });
    }
  }, [isKeyboardMode, elementRects, setActiveIndex, prevScrollY, setHighlightLayerInfo]);

  return (
    <div className='absolute top-0 -right-28 w-28 h-full px-1 bg-borderColor'>
      {elementRects.map((rect, index) => {
        const marginTop =
          index === 0
            ? Math.round(rect.tagStartRectY)
            : Math.round(rect.tagStartRectY - elementRects[index - 1].tagEndRectY);
        const height = Math.round(rect.tagHeight);

        return (
          <div
            key={rect.tagUniqueKey}
            style={{
              height: `${height}px`,
              marginTop: `${marginTop}px`,
            }}
            className={`w-full ${isKeyboardMode && activeIndex === index ? 'bg-yellow-300' : 'bg-yellow-100'} ${(!isKeyboardMode || (isKeyboardMode && activeIndex === index)) && 'cursor-pointer'} ${isKeyboardMode && activeIndex !== index && 'cursor-default'}`}
            onClick={() => {
              if (!isKeyboardMode) {
                setActiveIndex(index);
              } else {
                if (activeIndex === index) {
                  setActiveIndex(0);
                }
              }

              toggleKeyboardMode();
              setPrevScrollY(window.scrollY);
            }}
            onMouseEnter={() => {
              if (!isKeyboardMode) {
                setHighlightLayerInfo({
                  top: rect.tagStartRectY,
                  left: rect.tagStartRectX,
                  width: rect.tagWidth,
                  height: rect.tagHeight,
                });
              }
            }}
            onMouseLeave={() => {
              if (!isKeyboardMode) {
                setHighlightLayerInfo({
                  top: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                });
              }
            }}
          />
        );
      })}
    </div>
  );
}

export default ServiceHighlightBar;
