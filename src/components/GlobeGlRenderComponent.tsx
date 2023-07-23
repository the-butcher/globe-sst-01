import { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { ColorGradient } from '../util/ColorGradient';
import { IDimensions } from '../util/IDimensions';
import { IGeoCoordinate } from '../util/IGeoCoordinate';
import { TimeUtil } from '../util/TimeUtil';
import { IGlobeGlRenderProps } from './IGlobeGlRenderProps';


function GlobeGlRenderComponent(props: IGlobeGlRenderProps) {

    const { instant, handleGlobeMethods, colorGradientProps } = { ...props };

    const colorGradient: ColorGradient = new ColorGradient(colorGradientProps);

    const [windowDimensions, setWindowDimensions] = useState<IDimensions>({
        x: 0,
        y: 0
    });

    const [polygonData, setPolygonData] = useState<any[]>([]);
    const [ringsData, setRingsData] = useState<any[]>([]);
    const [globeImageUrl, setGlobeImageUrl] = useState<string>('');

    const imageTimeout = useRef<number>(-1);
    const resizeTimeout = useRef<number>(-1);
    const clickGeoCoordinate = useRef<IGeoCoordinate>();
    const globeMethodsRef = useRef<GlobeMethods>(undefined);
    const dataRef = useRef<Uint8ClampedArray>();


    useEffect(() => {

        console.debug('✨ building gl render component');

        // initial image
        loadImage(TimeUtil.formatImageSrc(instant));

        window.addEventListener('resize', () => {
            window.clearTimeout(resizeTimeout.current);
            resizeTimeout.current = window.setTimeout(() => {
                setWindowDimensions({
                    x: document.body.offsetWidth,
                    y: document.body.getBoundingClientRect().height
                });
            }, 100);
        });

        window.addEventListener('mousemove', () => {

            if (clickGeoCoordinate.current) {
                // console.log('mousemove', clickGeoCoordinate.current.lat, clickGeoCoordinate.current.lng, globeMethodsRef.current.getScreenCoords(clickGeoCoordinate.current.lat, clickGeoCoordinate.current.lng));
            }

        });

        setWindowDimensions({
            x: document.body.offsetWidth,
            y: document.body.getBoundingClientRect().height
        });

        fetch('countries.geojson').then(res => res.json()).then(countries => {
            setPolygonData(countries.features);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        console.debug('⚙ updating gl render component (globeMethodsRef)', globeMethodsRef);

        if (globeMethodsRef.current) {
            globeMethodsRef.current.pointOfView({ lat: 15, lng: -45, altitude: 1.7 });
            handleGlobeMethods(globeMethodsRef.current);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globeMethodsRef]);


    useEffect(() => {

        console.debug('⚙ updating gl render component (instant, colorGradientProps)', instant, colorGradientProps);

        window.clearTimeout(imageTimeout.current);
        imageTimeout.current = window.setTimeout(() => {
            loadImage(TimeUtil.formatImageSrc(instant));
        }, 100);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instant, colorGradientProps]);

    const loadImage = (imageSrc: string) => {



        // eslint-disable-next-line react-hooks/exhaustive-deps
        var image = new Image();
        image.crossOrigin = 'Anonymous';
        image.onload = () => {

            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.width = 1440;
            canvas.height = 720;
            context!.drawImage(image, 0, 0);

            var imageData = context!.getImageData(0, 0, 1440, 720);

            var imageDataCopy = new Uint8ClampedArray(imageData.data);
            imageDataCopy.set(imageData.data);

            dataRef.current = imageDataCopy; //.set(imageData.data);

            var val: number;
            for (var p = 0, len = imageData.data.length; p < len; p += 4) {

                val = imageData.data[p]
                imageData.data[p + 0] = colorGradient.lookupR[val];
                imageData.data[p + 1] = colorGradient.lookupG[val];
                imageData.data[p + 2] = colorGradient.lookupB[val];

            }

            context!.putImageData(imageData, 0, 0);

            var dataURL = canvas.toDataURL('image/png');
            setGlobeImageUrl(dataURL);

        };
        image.src = imageSrc;

    }

    const handleGlobeClick = (_clickGeoCoordinate: IGeoCoordinate, e: any) => {

        clickGeoCoordinate.current = _clickGeoCoordinate;

        const pixelX = Math.round((clickGeoCoordinate.current.lng + 180) * 4);
        const pixelY = Math.round((180 - (clickGeoCoordinate.current.lat + 90)) * 4);

        if (dataRef.current) {

            const val = (pixelY * 1440 + pixelX) * 4; // 4 channels
            const tmp = ColorGradient.getTemperature(dataRef.current[val]); // new InterpolatedValue(-10, 10, 5, 255, 1.0).getOut(dataRef.current[val]);
            console.log('coord', clickGeoCoordinate.current.lat, clickGeoCoordinate.current.lng, pixelX, pixelY, dataRef.current[val], tmp);
            // dataRef.current[p + 0] = lookupR[val];
            // dataRef.current[p + 1] = lookupG[val];
            // dataRef.current[p + 2] = lookupB[val];

        }

        setRingsData([{
            lat: clickGeoCoordinate.current.lat,
            lng: clickGeoCoordinate.current.lng,
            maxR: 2,
            propagationSpeed: 3,
            repeatPeriod: 10000
        }]);

    }

    const gray = Math.round(colorGradientProps.valMed * 255);

    return (
        <div style={{ position: 'absolute', height: '100%', width: '100%', overflow: 'hidden' }}>
            <Globe
                ref={globeMethodsRef}
                width={windowDimensions.x}
                height={windowDimensions.y}
                showAtmosphere={false}
                backgroundColor={`rgb(${gray}, ${gray}, ${gray})`}
                globeImageUrl={globeImageUrl}
                bumpImageUrl={'images/earth-topology.png'}

                onGlobeClick={(coord: IGeoCoordinate, e: any) => handleGlobeClick(coord, e)}

                polygonsData={polygonData}
                polygonCapColor={feat => `rgba(${gray}, ${gray}, ${gray}, 0.0)`}
                polygonSideColor={feat => `rgba(${gray}, ${gray}, ${gray}, 0.0)`}
                polygonStrokeColor={feat => 'rgba(40, 40, 40, 1.0)'}
                polygonAltitude={0.001}

                ringsData={ringsData}
                ringColor={() => t => `rgba(255,100,50,${1 - t})`}
                ringMaxRadius={'maxR'}
                ringPropagationSpeed={'propagationSpeed'}
                ringRepeatPeriod={'repeatPeriod'}

            // labelsData={labelsData}

            />
        </div>
    );

}

export default GlobeGlRenderComponent;