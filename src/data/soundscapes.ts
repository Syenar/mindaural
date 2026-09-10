import {SoundscapeDefinition} from '../core/types.js';
const mk=(id:string,title:string,description:string,layers:SoundscapeDefinition['layers']):SoundscapeDefinition=>({id,title,description,layers,license:'project-owned',provenance:'Procedurally synthesized by Mindaural; no third-party recording.'});
export const SOUNDSCAPES:SoundscapeDefinition[]=[
 mk('soft-rain','Soft rain','Diffuse rain-like pink/brown texture',[{kind:'pink',amplitude:.12,slopeDbOct:-3,lowpass:9000,stereoCorrelation:.35},{kind:'brown',amplitude:.05,slopeDbOct:-6,lowpass:3500,stereoCorrelation:.1}]),
 mk('heavy-rain','Heavy rain','Dense broadband rain texture',[{kind:'pink',amplitude:.18,slopeDbOct:-3,lowpass:12000,stereoCorrelation:.2},{kind:'white',amplitude:.04,slopeDbOct:0,highpass:4500,stereoCorrelation:.05}]),
 mk('distant-storm','Distant storm','Low rolling ambience with air',[{kind:'brown',amplitude:.16,slopeDbOct:-6,lowpass:1000,stereoCorrelation:.75},{kind:'pink',amplitude:.05,slopeDbOct:-3,lowpass:5000,stereoCorrelation:.4}]),
 mk('ocean-calm','Calm ocean','Slow, soft surf-like spectrum',[{kind:'brown',amplitude:.13,slopeDbOct:-6,lowpass:1800,stereoCorrelation:.55},{kind:'pink',amplitude:.05,slopeDbOct:-3,lowpass:7000,stereoCorrelation:.25}]),
 mk('ocean-wide','Wide ocean','Brighter wide surf texture',[{kind:'pink',amplitude:.15,slopeDbOct:-3,lowpass:10000,stereoCorrelation:.1},{kind:'brown',amplitude:.07,slopeDbOct:-6,lowpass:2200,stereoCorrelation:.5}]),
 mk('river','River','Continuous mid-band water-like noise',[{kind:'pink',amplitude:.13,slopeDbOct:-3,highpass:250,lowpass:7000,stereoCorrelation:.22}]),
 mk('forest','Forest air','Soft filtered air with spacious variation',[{kind:'pink',amplitude:.08,slopeDbOct:-3,lowpass:6000,stereoCorrelation:.3},{kind:'brown',amplitude:.05,slopeDbOct:-6,lowpass:1400,stereoCorrelation:.65}]),
 mk('wind-soft','Soft wind','Low-pass airy wind texture',[{kind:'pink',amplitude:.10,slopeDbOct:-3,lowpass:4200,stereoCorrelation:.42}]),
 mk('wind-deep','Deep wind','Low spectral wind bed',[{kind:'brown',amplitude:.14,slopeDbOct:-6,lowpass:1800,stereoCorrelation:.48}]),
 mk('fireplace','Fireplace','Warm low-mid crackle-like bed',[{kind:'brown',amplitude:.09,slopeDbOct:-6,lowpass:2500,stereoCorrelation:.55},{kind:'white',amplitude:.025,slopeDbOct:0,highpass:1800,lowpass:9000,stereoCorrelation:.05}]),
 mk('fan-low','Low fan','Stable deep fan masking texture',[{kind:'brown',amplitude:.13,slopeDbOct:-6,lowpass:2600,stereoCorrelation:.9}]),
 mk('fan-bright','Bright fan','Steady pink fan-like texture',[{kind:'pink',amplitude:.11,slopeDbOct:-3,lowpass:7000,stereoCorrelation:.88}]),
 mk('aircraft','Aircraft cabin','Low continuous cabin rumble',[{kind:'brown',amplitude:.15,slopeDbOct:-6,lowpass:1200,stereoCorrelation:.95},{kind:'pink',amplitude:.04,slopeDbOct:-3,lowpass:4500,stereoCorrelation:.8}]),
 mk('cafe','Café room','Diffuse room-like masking spectrum',[{kind:'pink',amplitude:.10,slopeDbOct:-3,highpass:180,lowpass:5500,stereoCorrelation:.38},{kind:'brown',amplitude:.04,slopeDbOct:-6,lowpass:1000,stereoCorrelation:.6}]),
 mk('room','Quiet room','Barely audible neutral room noise',[{kind:'pink',amplitude:.045,slopeDbOct:-3,lowpass:6000,stereoCorrelation:.75}]),
 mk('brown-deep','Deep brown','Very low-frequency masking',[{kind:'brown',amplitude:.13,slopeDbOct:-6,lowpass:2200,stereoCorrelation:.1}]),
 mk('pink-balanced','Balanced pink','Classic pink masking',[{kind:'pink',amplitude:.10,slopeDbOct:-3,stereoCorrelation:.08}]),
 mk('white-clean','Clean white','Flat broadband noise',[{kind:'white',amplitude:.075,slopeDbOct:0,stereoCorrelation:.05}]),
 mk('grey-soft','Soft grey','Perceptually softened broad noise',[{kind:'grey',amplitude:.08,slopeDbOct:-1,lowpass:12000,stereoCorrelation:.2}]),
 mk('blue-air','Blue air','High-frequency tilted airy noise',[{kind:'blue',amplitude:.055,slopeDbOct:3,highpass:800,stereoCorrelation:.12}]),
 mk('violet-air','Violet air','Very bright high-frequency texture',[{kind:'violet',amplitude:.035,slopeDbOct:6,highpass:1800,stereoCorrelation:.08}]),
 mk('night','Night room','Very dark low-level ambience',[{kind:'brown',amplitude:.06,slopeDbOct:-6,lowpass:1300,stereoCorrelation:.65}]),
 mk('focus-mask','Focus mask','Controlled pink masking bed',[{kind:'pink',amplitude:.07,slopeDbOct:-3,highpass:120,lowpass:8000,stereoCorrelation:.15}]),
 mk('sleep-mask','Sleep mask','Low, smooth brown-pink blend',[{kind:'brown',amplitude:.09,slopeDbOct:-6,lowpass:2400,stereoCorrelation:.4},{kind:'pink',amplitude:.035,slopeDbOct:-3,lowpass:5500,stereoCorrelation:.25}])
];
