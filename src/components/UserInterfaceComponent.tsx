import { Paper, ThemeProvider } from "@mui/material";
import { useRef, useState } from 'react';
import { GlobeMethods } from "react-globe.gl";
import { ObjectUtil } from "../util/ObjectUtil";
import { ThemeUtil } from "../util/ThemeUtil";
import { TimeUtil } from "../util/TimeUtil";
import ColorGradientComponent from "./ColorGradientComponent";
import DateSliderComponent from "./DateSliderComponent";
import ExportSceneComponent from "./ExportSceneComponent";
import GlobeGlRenderComponent from "./GlobeGlRenderComponent";
import { IColorGradientProps } from "./IColorGradientProps";
import { IExportSceneProps } from "./IExportSceneProps";
import { IGlobeGlRenderProps } from "./IGlobeGlRenderProps";
import { IInstantProps } from "./IInstantProps";
import DatePickerComponent from "./DatePickerComponent";


function UserInterfaceComponent() {

  const handleGlobeMethods = (globeMethods: GlobeMethods) => {

    console.debug('📞 handling globe methods (globeMethods)', globeMethods);

    globeMethodsRef.current = globeMethods;

    setGlRenderProps({
      ...instantProps,
      instant: instantRef.current,
      globeMethods: globeMethodsRef.current,
      handleGlobeMethods,
      colorGradientProps: colorGradientPropsRef.current
    });
    setExportSceneProps({
      ...exportSceneProps,
      globeMethods: globeMethodsRef.current,
      onScreenshotRequested: handleScreenshotRequested
    });

  }

  const handleInstantChange = (instant: number) => {

    console.debug('📞 handling instant change', TimeUtil.formatCategoryDateFull(instant));

    instantRef.current = instant;

    setInstantProps({
      ...instantProps,
      instant: instantRef.current
    });
    setGlRenderProps({
      ...glRenderProps,
      handleGlobeMethods,
      instant: instantRef.current,
      colorGradientProps: colorGradientPropsRef.current
    });
    colorGradientPropsRef.current = {
      ...colorGradientPropsRef.current,
      instant: instantRef.current
    }


  }

  const handleScreenshotRequested = () => {

    console.debug('📞 handling screenshot requested', exportSceneProps);

    setExportSceneProps({
      globeMethods: globeMethodsRef.current,
      stamp: ObjectUtil.createId(),
      onScreenshotRequested: handleScreenshotRequested,
      colorGradientProps: colorGradientPropsRef.current
    });

  }

  const handleColorGradientPropsChanged = (_colorGradientPropsR: IColorGradientProps) => {

    console.debug('📞 handling color gradient props change', _colorGradientPropsR);

    colorGradientPropsRef.current = _colorGradientPropsR;

    setGlRenderProps({
      ...glRenderProps,
      handleGlobeMethods,
      colorGradientProps: colorGradientPropsRef.current
    });

  }

  const instantRef = useRef<number>(new Date("2023-07-20").getTime());
  const globeMethodsRef = useRef<GlobeMethods>();
  const colorGradientPropsRef = useRef<IColorGradientProps>({
    hueNeg: 0.67,
    hueNeo: -0.17,
    huePoo: 0.17,
    huePos: 0.00,
    valNeg: 1.00,
    valMed: 0.00,
    valPos: 1.00,
    handleColorGradientPropsChanged,
    instant: instantRef.current
  });

  const [instantProps, setInstantProps] = useState<IInstantProps>({
    instant: instantRef.current,
    instantMin: new Date("2023-01-02").getTime(),
    instantMax: new Date("2023-07-20").getTime(),
    instantDif: TimeUtil.MILLISECONDS_PER____DAY,
    handleInstantChange
  });
  // const [colorGradientProps, setColorGradientProps] = useState<IColorGradientProps>(colorGradientPropsRef.);
  const [glRenderProps, setGlRenderProps] = useState<IGlobeGlRenderProps>({
    ...instantProps,
    handleGlobeMethods,
    colorGradientProps: colorGradientPropsRef.current
  });
  const [exportSceneProps, setExportSceneProps] = useState<IExportSceneProps>({
    stamp: '',
    globeMethods: globeMethodsRef.current,
    onScreenshotRequested: handleScreenshotRequested,
    colorGradientProps: colorGradientPropsRef.current
  });

  return (
    <ThemeProvider theme={ThemeUtil.getTheme()}>
      <GlobeGlRenderComponent {...glRenderProps} />
      <div style={{ width: 'calc(100%-24px)', display: 'flex', pointerEvents: 'none', flexDirection: 'row', position: 'absolute', bottom: 'auto', top: '12px', left: '12px', right: '12px', height: '120px', padding: '0px', margin: '0px' }}>

        <ExportSceneComponent {...exportSceneProps} />
        <div style={{ minWidth: '6px ' }}></div>

        <Paper elevation={4} style={{ overflow: 'unset', pointerEvents: 'visible', flexGrow: 100, display: 'flex', flexDirection: 'row', position: 'relative', height: '40px', top: '0px' }} >
          <DateSliderComponent {...instantProps} />
          <DatePickerComponent {...instantProps} />
        </Paper>

      </div>
      <div style={{ width: 'calc(100%-24px)', display: 'flex', pointerEvents: 'none', flexDirection: 'row', position: 'absolute', bottom: '5px', top: 'auto', left: '12px', right: '12px', padding: '0px', margin: '0px' }}>
        <ColorGradientComponent {...colorGradientPropsRef.current} />
      </div>

    </ThemeProvider>
  );

}

export default UserInterfaceComponent;