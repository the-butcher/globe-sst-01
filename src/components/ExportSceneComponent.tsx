import { AddAPhoto, Delete, Download, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Badge, IconButton, MenuItem, Paper, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { ScreenshotUtil } from "../util/ScreenshotUtil";
import { IExportSceneProps } from "./IExportSceneProps";

/**
 * functional react component holding a matertial-ui slider
 *
 * @author h.fleischer
 * @since 13.01.2021
 */
function ExportSceneComponent(props: IExportSceneProps) {

  const { onScreenshotRequested, stamp, globeMethods, colorGradientProps } = { ...props };

  const [frameCount, setFrameCount] = useState<number>(0);
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [frameDelay, setFrameDelay] = useState<number>(200);

  useEffect(() => {

    console.debug('✨ building export scene component', props);

    window.addEventListener('keyup', e => {

      if (e.key === 'f') {
        onScreenshotRequested();
      } else if (e.key === 'g') {
        handleDownload();
      }

    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    console.debug('⚙ updating export scene component (stamp, globeMethods)', stamp, globeMethods);

    if (stamp !== '' && globeMethods) {
      ScreenshotUtil.getInstance().renderToFrame(globeMethods, colorGradientProps);
      const frameCount = ScreenshotUtil.getInstance().getFrameCount();
      setFrameCount(frameCount);
      setFrameIndex(frameCount - 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stamp, globeMethods]);

  const handleFrameDelete = () => {

    console.debug('⚙ handling frame delete');

    ScreenshotUtil.getInstance().removeFrame(frameIndex);
    const frameIndex1 = Math.min(ScreenshotUtil.getInstance().getFrameCount() - 1, frameIndex);
    setFrameIndex(frameIndex1);
    setFrameCount(ScreenshotUtil.getInstance().getFrameCount());
    if (frameIndex1 >= 0) {
      setFrameDelay(ScreenshotUtil.getInstance().getFrame(frameIndex1).delay);
    }

  }

  const handleFrameIndexDecr = () => {
    const frameIndex1 = frameIndex - 1;
    setFrameIndex(frameIndex1);
    setFrameDelay(ScreenshotUtil.getInstance().getFrame(frameIndex1).delay);
  }

  const handleFrameIndexIncr = () => {
    const frameIndex1 = frameIndex + 1;
    setFrameIndex(frameIndex1);
    setFrameDelay(ScreenshotUtil.getInstance().getFrame(frameIndex1).delay);
  }

  const handleDelayChange = (event: SelectChangeEvent<string> | Event) => {
    ScreenshotUtil.getInstance().setDelay(frameIndex, (event.target as any).value);
    setFrameDelay(ScreenshotUtil.getInstance().getFrame(frameIndex).delay);
  }

  const handleDownload = () => {
    if (frameCount === 1) {
      ScreenshotUtil.getInstance().exportToPng();
    } else {
      ScreenshotUtil.getInstance().exportToGif();
    }
  }

  const updateTumbnail = () => {
    if (frameCount > 0) {
      document.getElementById('exportSceneDiv').textContent = ''; // clear children
      const appendableCanvas: HTMLCanvasElement = ScreenshotUtil.getInstance().getFrame(frameIndex).canvas;
      document.getElementById('exportSceneDiv').appendChild(appendableCanvas); // add canvas specified by index
    }
  }

  useEffect(() => {

    console.debug('⚙ updating app component (frameIndex, frameCount, frameDelay)', frameIndex, frameCount, frameDelay);

    updateTumbnail();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameIndex, frameCount, frameDelay]);

  const items: JSX.Element[] = [];
  const delays: number[] = [
    100,
    200,
    500,
    1000,
    2000,
    5000
  ];
  for (let delayIndex = 0; delayIndex < delays.length; delayIndex++) {
    items.push(<MenuItem key={`key_${delayIndex}`} value={delays[delayIndex]} style={{ color: frameCount > 0 ? 'var(--color-text)' : '#303030' }}>{`${delays[delayIndex]}ms`}</MenuItem>);
  }

  return (
    <Badge badgeContent={frameCount} color="primary" variant='standard'>

      <Paper elevation={4} style={{ pointerEvents: 'visible', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', minWidth: 'unset', top: frameCount === 0 ? '0px' : '0px', height: frameCount === 0 ? '40px' : '120px', transition: 'all 250ms ease-in-out' }} >

        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'unset', minHeight: '40px' }}>

          {/* <div style={{ fontSize: '10px', whiteSpace: 'nowrap', paddingTop: '3px', paddingLeft: '6px', paddingRight: '3px' }}>{frameIndex + 1}/{frameCount}</div> */}

          <div id="exportSceneDiv" style={{ width: frameCount === 0 ? '0px' : '132px', margin: '6px 0px 6px 6px', backgroundColor: 'unset', overflow: 'hidden', transition: 'all 250ms ease-in-out' }}>

          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ minHeight: '5px' }}></div>
            <Tooltip title="capture frame [f]">
              <span>
                <IconButton onClick={() => onScreenshotRequested()} style={{ width: '30px', height: '28px', color: 'var(--color-text)' }}>
                  <AddAPhoto />
                </IconButton>
              </span>
            </Tooltip>
            <div style={{ minHeight: '2px' }}></div>
            <Tooltip title="delete frame">
              <span>
                <IconButton onClick={handleFrameDelete} style={{ width: '30px', height: '28px', color: 'var(--color-text)' }}>
                  <Delete />
                </IconButton>
              </span>
            </Tooltip>
            <div style={{ flexGrow: '10' }}></div>
          </div>
        </div>
        <div style={{ width: frameCount === 0 ? '44px' : 'unset', display: 'flex', flexDirection: 'row', backgroundColor: 'unset', height: '28px', overflow: 'hidden', transition: 'all 250ms ease-in-out' }}>

          {/* bottom line where paging and export is done */}

          <Tooltip title="previous frame">
            <span>
              <IconButton onClick={handleFrameIndexDecr} style={{ width: '30px', height: '28px' }} disabled={frameIndex === 0} >
                <KeyboardArrowLeft style={{ width: '21px', height: '21px', color: frameIndex > 0 ? 'var(--color-text)' : '#303030' }} />
              </IconButton>
            </span>
          </Tooltip>
          <Select key={'frameDelay'} onChange={handleDelayChange} disabled={frameCount <= 1} style={{ width: '76px', fontSize: '14px', paddingTop: '2px' }} variant='standard' value={frameDelay.toString()}>
            {items}
          </Select>
          <Tooltip title="next frame">
            <span>
              <IconButton onClick={handleFrameIndexIncr} style={{ width: '30px', height: '28px' }} disabled={frameIndex >= frameCount - 1}>
                <KeyboardArrowRight style={{ width: '21px', height: '21px', color: frameIndex < frameCount - 1 ? 'var(--color-text)' : '#303030' }} />
              </IconButton>
            </span>
          </Tooltip>
          <div style={{ flexGrow: '10' }}></div>

          <Tooltip title={frameCount === 1 ? "export as PNG" : "esport as HIG [g]"}>
            <span>
              <IconButton onClick={handleDownload} style={{ width: '30px', height: '28px', color: 'var(--color-text)' }}>
                <Download />
              </IconButton>
            </span>
          </Tooltip>

        </div>

      </Paper>
    </Badge >
  );

}

export default ExportSceneComponent;