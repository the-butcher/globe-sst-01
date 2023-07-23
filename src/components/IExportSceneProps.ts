import { GlobeMethods } from "react-globe.gl";
import { IColorGradientProps } from "./IColorGradientProps";

export interface IExportSceneProps {

    onScreenshotRequested: () => void;
    globeMethods?: GlobeMethods;
    stamp: string;
    colorGradientProps: IColorGradientProps;

}