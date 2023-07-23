
export interface IColorGradientProps {

    hueNeg: number;
    hueNeo: number;
    huePoo: number;
    huePos: number;

    valNeg: number;
    valMed: number;
    valPos: number;

    instant: number;

    handleColorGradientPropsChanged: (props: IColorGradientProps) => void;

}