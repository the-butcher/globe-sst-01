import { Collapse, IconButton, Paper, Slider, Stack, Switch, Typography } from "@mui/material";
import { ColorGradient } from "../util/ColorGradient";
import { IColorGradientProps } from "./IColorGradientProps";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useState } from "react";
import { TimeUtil } from "../util/TimeUtil";

function ColorGradientComponent(props: IColorGradientProps) {

    const { handleColorGradientPropsChanged } = { ...props };

    const colorGradient: ColorGradient = new ColorGradient(props);

    const [settingsIn, setSettingsIn] = useState<boolean>(false);

    const items: JSX.Element[] = [];
    for (let i = colorGradient.getValCutNeg(); i <= colorGradient.getValCutPos(); i++) {
        items.push(<div style={{ flexGrow: 1, margin: '0px', backgroundColor: colorGradient.getTemperatureRgbStyle(i) }}></div>)
    }

    const handleHueChange = (event: Event, newValue: number | number[], activeThumb: number) => {

        console.log('newValue', newValue);
        if (!Array.isArray(newValue)) {
            return;
        }

        const minDistance = 0.02;
        const maxDistance = 0.17;
        if (activeThumb === 0) {
            let hueNeg = 1 - newValue[0];
            if (hueNeg + props.hueNeo < props.huePos + props.huePoo) {
                hueNeg = props.huePos + props.huePoo - props.hueNeo;
            }
            handleColorGradientPropsChanged({
                ...props,
                hueNeg
            });
        } else if (activeThumb === 1) {
            handleColorGradientPropsChanged({
                ...props,
                hueNeo: Math.max(-maxDistance, Math.min(newValue[0] - newValue[1]))
            });
        } else if (activeThumb === 2) {
            handleColorGradientPropsChanged({
                ...props,
                huePoo: Math.min(maxDistance, Math.max(minDistance, newValue[3] - newValue[2]))
            });
        } else if (activeThumb === 3) {
            let huePos = 1 - newValue[3]
            if (props.hueNeg + props.hueNeo < huePos + props.huePoo) {
                huePos = props.hueNeg + props.hueNeo - props.huePoo;
            }
            handleColorGradientPropsChanged({
                ...props,
                huePos
            });
        }

    };

    const handleValNegChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        handleColorGradientPropsChanged({
            ...props,
            valNeg: newValue as number
        });
    };
    const handleValMedChange = (newValue: number) => {
        handleColorGradientPropsChanged({
            ...props,
            valMed: newValue
        });
    };
    const handleValPosChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        handleColorGradientPropsChanged({
            ...props,
            valPos: newValue as number
        });

    };

    return (
        <div style={{ overflow: 'unset', pointerEvents: 'visible', flexGrow: 100 }} >
            <div style={{ color: props.valMed > 0.5 ? 'black' : 'white', margin: '0px 95px 0px 65px', fontSize: '14px', fontFamily: 'Courier Prime Sans', display: 'flex', flexDirection: 'row', width: 'inherit' }}>
                <div style={{ flexGrow: 100 }}>{ColorGradient.NOAA__DATASET}</div>
                <div>{TimeUtil.formatCategoryDateFull(props.instant)}</div>
            </div>
            <Paper elevation={4} style={{ padding: '2px', overflow: 'unset', pointerEvents: 'visible' }} >
                <div style={{ padding: '2px', overflow: 'unset', pointerEvents: 'visible', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ padding: '7px 0px 0px 0px', minWidth: '60px', textAlign: 'center', fontSize: '12px' }}>{`${ColorGradient.getTemperature(colorGradient.getValCutNeg()).toFixed(1)}°`}</div>
                    {items}
                    <div style={{ padding: '7px 0px 0px 0px', minWidth: '60px', textAlign: 'center', fontSize: '12px' }}>+{`${ColorGradient.getTemperature(colorGradient.getValCutPos()).toFixed(1)}°`}</div>
                    <div>
                        <IconButton onClick={() => { setSettingsIn(!settingsIn) }} style={{ width: '30px', height: '28px' }}>
                            <FactCheckIcon style={{ width: '21px', height: '21px', color: 'var(--color-text)' }} />
                        </IconButton>
                    </div>
                </div>
                <Collapse in={settingsIn}>
                    <Stack spacing={0}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ padding: '12px 2px', overflow: 'unset', pointerEvents: 'visible', display: 'flex', flexDirection: 'row', minWidth: '60px', fontSize: '12px' }}>&nbsp;COLOR</div>
                            <Slider
                                sx={{
                                    '& .MuiSlider-rail': {
                                        background: "linear-gradient(to right, #f0f, #00f, #0ff, #0f0, #ff0, #f00)", // , #f00
                                        height: "12px",
                                        borderRadius: "6px",
                                        opacity: 1,
                                    },
                                    '& .MuiSlider-track': {
                                        border: 'none',
                                    },
                                    padding: '19px 0px'
                                }}
                                value={[props.hueNeg, props.hueNeg + props.hueNeo, props.huePos + props.huePoo, props.huePos].map(v => 1 - v)}
                                min={0.17}
                                max={1}
                                step={0.01}
                                onChange={handleHueChange}
                                disableSwap={true}
                            // valueLabelDisplay="on"
                            // valueLabelFormat={(value, index) => `${index}`}
                            />
                            <div style={{ padding: '2px', overflow: 'unset', pointerEvents: 'visible', display: 'flex', flexDirection: 'row', minWidth: '75px' }}></div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ padding: '12px 2px', overflow: 'unset', pointerEvents: 'visible', display: 'flex', flexDirection: 'row', minWidth: '60px', fontSize: '12px' }}>&nbsp;VALUE</div>
                            <Slider
                                sx={{
                                    '& .MuiSlider-rail': {
                                        background: "linear-gradient(to right, #000, #fff)", // , #f00
                                        height: "12px",
                                        borderRadius: "6px",
                                        opacity: 1,
                                    },
                                    '& .MuiSlider-track': {
                                        border: 'none',
                                    },
                                    padding: '19px 0px'
                                }}
                                value={props.valNeg}
                                min={0}
                                max={1}
                                step={0.01}
                                onChange={handleValNegChange}


                            />
                            <div style={{ minWidth: '20px' }} />
                            <Stack direction="row" spacing={1}>
                                <Typography sx={{ padding: '12px 2px', fontSize: '12px', fontFamily: 'Courier Prime Sans' }}>DARK</Typography>
                                <Switch color="default" checked={props.valMed > 0.5} onChange={(event) => handleValMedChange(event.target.checked ? 1 : 0)} />
                                <Typography sx={{ padding: '12px 2px', fontSize: '12px', fontFamily: 'Courier Prime Sans' }}>LIGHT</Typography>
                            </Stack>
                            <div style={{ minWidth: '20px' }} />
                            <Slider
                                sx={{
                                    '& .MuiSlider-rail': {
                                        background: "linear-gradient(to right, #000, #fff)", // , #f00
                                        height: "12px",
                                        borderRadius: "6px",
                                        opacity: 1,
                                    },
                                    '& .MuiSlider-track': {
                                        border: 'none',
                                        opacity: 0,
                                    },
                                    padding: '19px 0px'
                                }}
                                value={props.valPos}
                                min={0}
                                max={1}
                                step={0.01}
                                onChange={handleValPosChange}
                            />
                            <div style={{ padding: '2px', overflow: 'unset', pointerEvents: 'visible', display: 'flex', flexDirection: 'row', minWidth: '75px' }}></div>
                        </div>
                    </Stack>
                </Collapse>
            </Paper>
            <div style={{ color: props.valMed > 0.5 ? 'black' : 'white', margin: '5px 95px 0px 65px', fontSize: '14px', fontFamily: 'Courier Prime Sans', display: 'flex', flexDirection: 'row', width: 'inherit' }}>
                <div style={{ flexGrow: 100 }}>{ColorGradient.NOAA_CITATION}</div>
                <div><a href="https://twitter.com/FleischerHannes" target="_new" style={{ textDecoration: 'none', color: props.valMed > 0.5 ? 'black' : 'white' }}>@FleischerHannes</a></div>
            </div>
        </div >


    );

}

export default ColorGradientComponent;