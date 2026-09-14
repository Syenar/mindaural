export type LogoLightingOptions={speed?:number;saturation?:number;brightness?:number;};

/** Starts a low-cost RGB-style hue cycle on a logo element. Returns cleanup. */
export function startLogoLighting(element:HTMLElement,options:LogoLightingOptions={}):()=>void{
  const speed=options.speed??42,saturation=options.saturation??1.65,brightness=options.brightness??1.08;
  const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if(reduce){element.style.filter=`saturate(${saturation}) brightness(${brightness})`;return()=>{element.style.filter='';};}
  let frame=0,start=performance.now();
  const tick=(now:number)=>{const hue=((now-start)/1000*speed)%360;element.style.filter=`hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`;frame=requestAnimationFrame(tick);};
  frame=requestAnimationFrame(tick);
  return()=>{cancelAnimationFrame(frame);element.style.filter='';};
}
