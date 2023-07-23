import GIFEncoder from 'gif-encoder-2';
import { GlobeMethods } from 'react-globe.gl';
import { IColorGradientProps } from '../components/IColorGradientProps';
import { ColorGradient } from './ColorGradient';
import { IScreenshot } from "./IScreenshot";
import { TimeUtil } from './TimeUtil';


/**
 * utility type for taking snapshots of the current scene and exporting it to either PNG or GIF
 *
 * @author h.fleischer
 * @since 13.01.2021
 */
export class ScreenshotUtil {

    static readonly OUTPUT_DIM_X = 1200;
    static readonly OUTPUT_DIM_Y = 675;

    static getInstance(): ScreenshotUtil {
        if (!this.instance) {
            this.instance = new ScreenshotUtil();
        }
        return this.instance;
    }

    private static instance: ScreenshotUtil;

    // private screenshotOptions: IScreenshotOptions | undefined;
    private readonly frames: IScreenshot[];

    private constructor() {
        this.frames = [];
    }

    setDelay(frameIndex: number, delay: number): void {
        this.frames[frameIndex].delay = delay;
    }

    getFrameCount(): number {
        return this.frames.length;
    }

    getFrame(frameIndex: number): IScreenshot {
        return this.frames[frameIndex];
    }

    removeFrame(frameIndex: number): void {
        this.frames.splice(frameIndex, 1);
    }

    renderToFrame(globeMethods: GlobeMethods, colorGradientProps: IColorGradientProps) {

        console.warn('renderToFrame');
        this.frames.push({
            canvas: this.renderToCanvas(globeMethods, colorGradientProps),
            delay: 100
        });

        // console.log('frames', this.frames);

    }

    exportToGif() {

        const gifEncoder = new GIFEncoder(ScreenshotUtil.OUTPUT_DIM_X, ScreenshotUtil.OUTPUT_DIM_Y, 'neuquant', false);
        gifEncoder.setDelay(200);

        gifEncoder.start();
        this.frames.forEach(gifFrame => {
            gifEncoder.setDelay(gifFrame.delay);
            gifEncoder.addFrame(gifFrame.canvas.getContext('2d'));
        });
        gifEncoder.finish();

        console.log('gifEncoder', gifEncoder);
        const data = gifEncoder.out.data;
        console.log('data', data);
        const blob = new Blob([new Uint8Array(data)], {
            type: 'image/gif'
        });

        var anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = `canvas_3d_${Date.now()}.gif`;
        anchor.click();

    }

    exportToPng() {

        this.frames[0].canvas.toBlob(
            blob => {
                var a = document.createElement('a');
                var url = URL.createObjectURL(blob!);
                a.href = url;
                a.download = `canvas_3d_${Date.now()}`;
                a.click();
            },
            'image/png',
            1.0
        )

    }

    renderToCanvas(globeMethods: GlobeMethods, colorGradientProps: IColorGradientProps): HTMLCanvasElement {

        const domElement = globeMethods.renderer().domElement;
        domElement.getContext('2d', { preserveDrawingBuffer: true });

        globeMethods.renderer().render(globeMethods.scene(), globeMethods.camera());

        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = ScreenshotUtil.OUTPUT_DIM_X;
        outputCanvas.height = ScreenshotUtil.OUTPUT_DIM_Y;
        outputCanvas.style.width = 'inherit'; // for correct width inthe preview window
        const outputContext = outputCanvas.getContext('2d');

        const scaleY = outputCanvas.height / domElement.height;
        const dimX = domElement.width * scaleY;
        const dimY = domElement.height * scaleY;
        const offX = (ScreenshotUtil.OUTPUT_DIM_X - dimX) / 2;
        const offY = (ScreenshotUtil.OUTPUT_DIM_Y - dimY) / 2;

        outputContext.drawImage(domElement, offX, offY, dimX, dimY);

        const colorGradient = new ColorGradient(colorGradientProps);
        const valCutNeg = colorGradient.getValCutNeg();
        const valCutPos = colorGradient.getValCutPos();
        const legendClassCount = valCutPos - valCutNeg + 1;
        const legendMargin = 50;
        const legendClassWidth = (ScreenshotUtil.OUTPUT_DIM_X - legendMargin * 2) / legendClassCount;

        outputContext.fillStyle = colorGradientProps.valMed > 0 ? 'black' : 'white';
        outputContext.font = '12px Courier Prime Sans';
        outputContext.fillText(ColorGradient.NOAA__DATASET, legendMargin, ScreenshotUtil.OUTPUT_DIM_Y - 45);
        outputContext.fillText(TimeUtil.formatCategoryDateFull(colorGradientProps.instant), ScreenshotUtil.OUTPUT_DIM_X - 122, ScreenshotUtil.OUTPUT_DIM_Y - 45);
        outputContext.fillText(`${ColorGradient.getTemperature(colorGradient.getValCutNeg()).toFixed(1)}°`, 10, ScreenshotUtil.OUTPUT_DIM_Y - 27);
        outputContext.fillText(`+${ColorGradient.getTemperature(colorGradient.getValCutPos()).toFixed(1)}°`, ScreenshotUtil.OUTPUT_DIM_X - 45, ScreenshotUtil.OUTPUT_DIM_Y - 27);
        outputContext.fillText(ColorGradient.NOAA_CITATION, legendMargin, ScreenshotUtil.OUTPUT_DIM_Y - 10);
        outputContext.fillText('@FLeischerHannes', ScreenshotUtil.OUTPUT_DIM_X - 165, ScreenshotUtil.OUTPUT_DIM_Y - 10);
        for (let i = 0; i < legendClassCount; i++) {
            const val = valCutNeg + i;
            outputContext.fillStyle = colorGradient.getTemperatureRgbStyle(val);
            outputContext.fillRect(legendMargin + i * legendClassWidth, ScreenshotUtil.OUTPUT_DIM_Y - 41, legendClassWidth + 1, 20);
        }

        return outputCanvas;

    }

}