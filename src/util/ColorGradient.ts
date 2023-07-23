import { IColorGradientProps } from "../components/IColorGradientProps";
import { Color } from "./Color";
import { IColor } from "./IColor";
import { InterpolatedValue } from "./InterpolatedValue";

export class ColorGradient {

    // maps pixel values to temperature (must be the same as in the java code generating the images)
    private static readonly RASTER_TO_TEMPERATURE = new InterpolatedValue(-10, 10, 5, 255, 1.0);
    public static readonly NOAA__DATASET = 'Sea surface temperature anomaly (°Celsius)';
    public static readonly NOAA_CITATION = 'Data/image provided by the NOAA Physical Sciences Laboratory, Boulder, Colorado, USA, from their website at https://psl.noaa.gov/';

    // the initial zero entries are for gray value "0" --> land
    readonly lookupR: number[] = [10];
    readonly lookupG: number[] = [10];
    readonly lookupB: number[] = [10];

    private readonly valCutOff: number = 63;
    private readonly valCutNeg = 125 - this.valCutOff;
    private readonly valCutPos = 125 + this.valCutOff;

    constructor(props: IColorGradientProps) {

        const gammaNeg = 0.9;
        const gammaPos = 1 / gammaNeg;

        // TODO :: make the Hues adjustable (on the outermost blocks)
        const interpolatedHueNeg = new InterpolatedValue(props.hueNeg, props.hueNeg + props.hueNeo, this.valCutNeg, 125, gammaNeg);
        const interpolatedHuePos = new InterpolatedValue(props.huePos + props.huePoo, props.huePos, 125, this.valCutPos, gammaPos);

        const satMed = 0.00; // color jump if not zero
        const interpolatedSatNeg = new InterpolatedValue(1.00, satMed, this.valCutNeg, 125, gammaNeg);
        const interpolatedSatPos = new InterpolatedValue(satMed, 1.00, 125, this.valCutPos, gammaPos);

        const interpolatedValNeg = new InterpolatedValue(props.valNeg, props.valMed, this.valCutNeg, 125, gammaNeg);
        const interpolatedValPos = new InterpolatedValue(props.valMed, props.valPos, 125, this.valCutPos, gammaPos);

        this.lookupR[0] = props.valMed * 255;
        this.lookupG[0] = props.valMed * 255;
        this.lookupB[0] = props.valMed * 255;

        let lookupColor: IColor;
        let lookupRgb: number[];
        let lookupHue: number;
        let lookupSat: number;
        let lookupVal: number;
        for (let i = 0; i <= 250; i++) {
            lookupHue = i < 125 ? interpolatedHueNeg.getOut(i) : interpolatedHuePos.getOut(i);
            lookupSat = i < 125 ? interpolatedSatNeg.getOut(i) : interpolatedSatPos.getOut(i);
            lookupVal = i < 125 ? interpolatedValNeg.getOut(i) : interpolatedValPos.getOut(i);
            lookupColor = new Color(lookupHue, lookupSat, lookupVal);
            lookupRgb = lookupColor.getRgb().map(v => v * 255);
            this.lookupR[i + 5] = lookupRgb[0];
            this.lookupG[i + 5] = lookupRgb[1];
            this.lookupB[i + 5] = lookupRgb[2];
        }

    }

    getTemperatureRgbStyle(value: number): string {
        return `rgb(${this.lookupR[value]} ${this.lookupG[value]} ${this.lookupB[value]})`;
    }

    static getTemperature(value: number): number {
        return ColorGradient.RASTER_TO_TEMPERATURE.getOut(value);
    }

    getValCutNeg() {
        return this.valCutNeg + 5;
    }
    getValCutPos() {
        return this.valCutPos + 5;
    }


}