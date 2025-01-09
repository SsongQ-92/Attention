import { Dispatch, SetStateAction, useEffect } from 'react';

import { TagRectData } from '../../config/types';
import useBoundStore from '../../store/useBoundStore';

interface Props {
  elementRects: TagRectData[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  prevScrollY: number;
  setPrevScrollY: Dispatch<SetStateAction<number>>;
}

function ServiceHighlightBar({
  elementRects,
  activeIndex,
  setActiveIndex,
  prevScrollY,
  setPrevScrollY,
}: Props) {
  const isKeyboardMode = useBoundStore((state) => state.isKeyboardMode);
  const setHighlightLayerInfo = useBoundStore((state) => state.setHighlightLayerInfo);
  const toggleKeyboardMode = useBoundStore((state) => state.toggleKeyboardMode);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isKeyboardMode) {
        e.preventDefault();

        if (e.code === 'ArrowDown' || e.code === 'Space') {
          if (activeIndex === elementRects.length - 1) {
            setPrevScrollY(window.scrollY);

            window.scrollBy({
              top: window.innerHeight - 100,
              behavior: 'smooth',
            });
          } else {
            setActiveIndex((prev) => prev + 1);
            setHighlightLayerInfo({
              top: elementRects[activeIndex + 1].tagStartRectY,
              left: elementRects[activeIndex + 1].tagStartRectX,
              width: elementRects[activeIndex + 1].tagWidth,
              height: elementRects[activeIndex + 1].tagHeight,
              content: elementRects[activeIndex + 1].tagTextContent,
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
              content: elementRects[activeIndex - 1].tagTextContent,
            });
          }
        } else if (e.code === 'Escape') {
          setHighlightLayerInfo({
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            content: '',
          });

          setActiveIndex(0);
          toggleKeyboardMode();
        } else if (
          e.code === 'PageDown' ||
          e.code === 'PageUp' ||
          e.code === 'Home' ||
          e.code === 'End'
        ) {
          e.preventDefault();
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const target = e.target;

      if (isKeyboardMode) {
        if (target instanceof HTMLElement) {
          if (
            target.tagName !== 'TEXTAREA' &&
            target.tagName !== 'INPUT' &&
            !target.isContentEditable
          ) {
            e.preventDefault();
          }
        }
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [
    isKeyboardMode,
    activeIndex,
    setActiveIndex,
    elementRects,
    setHighlightLayerInfo,
    setPrevScrollY,
    toggleKeyboardMode,
  ]);

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
        content: elementRects[elementRects.length - 1].tagTextContent,
      });
    } else if (window.scrollY > prevScrollY) {
      setPrevScrollY(window.scrollY);
      setActiveIndex(0);

      setHighlightLayerInfo({
        top: elementRects[0].tagStartRectY,
        left: elementRects[0].tagStartRectX,
        width: elementRects[0].tagWidth,
        height: elementRects[0].tagHeight,
        content: elementRects[0].tagTextContent,
      });
    }
  }, [
    isKeyboardMode,
    elementRects,
    setActiveIndex,
    prevScrollY,
    setHighlightLayerInfo,
    setPrevScrollY,
  ]);

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
            className={`w-full ${isKeyboardMode && activeIndex === index ? 'bg-yellow-500' : 'bg-yellow-100'} ${(!isKeyboardMode || (isKeyboardMode && activeIndex === index)) && 'cursor-pointer'} ${isKeyboardMode && activeIndex !== index && 'cursor-default'}`}
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
                  content: rect.tagTextContent,
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
                  content: '',
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
