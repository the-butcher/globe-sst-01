import { GlobeMethods } from "react-globe.gl";
import { IInstantProps } from "./IInstantProps";
import { IColorGradientProps } from "./IColorGradientProps";

export interface IGlobeGlRenderProps extends IInstantProps {
    globeMethods?: GlobeMethods;
    handleGlobeMethods: ((globeMethods: GlobeMethods) => void);
    colorGradientProps: IColorGradientProps;
}
