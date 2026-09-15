const round=(v,n=5)=>Number(v.toFixed(n));
export function calculate(slug,values){
 const v=Object.fromEntries(Object.entries(values).map(([k,x])=>[k,Number(x)]));
 if(slug==='z-offset'){
  const messages={gaps:'The nozzle may be too far from the surface. Check extrusion and plate preparation, then use the manufacturer’s method to investigate nozzle distance.',ridges:'The nozzle may be too close, or extrusion may be excessive. Do not continue a test that contacts the plate; consult the model-specific first-layer procedure.',even:'An even, connected surface is a promising first-layer result. Retest on the original model. If it lifts later, investigate adhesion and warping instead of further squishing.'};
  if(!messages[values.observation]) throw Error('Choose the observation that matches your first layer.');
  return {headline:'Your next check',text:messages[values.observation],type:'Observation-based',rows:[]};
 }
 for(const [k,x] of Object.entries(values)) if(!['method'].includes(k)&& (x===''||!Number.isFinite(v[k]))) throw Error('Enter a valid number in every required field.');
 if(slug==='temperature-tower'||slug==='retraction-test'){
  const temp=slug==='temperature-tower',distance=temp?v.start-v.end:v.end-v.start;
  if(v.start<0||v.end<0||v.step<=0||distance<0) throw Error(temp?'Highest must be at least lowest, and decrement must be positive.':'End must be at least start, and increment must be positive.');
  const steps=distance/v.step;
  if(steps>49) throw Error('Use a larger step: a plan can contain at most 50 sections.');
  if(Math.abs(steps-Math.round(steps))>0.00001) throw Error('Choose a step that divides the start-to-end range evenly.');
  const rows=Array.from({length:Math.round(steps)+1},(_,i)=>[`Section ${i+1}`,`${round(v.start+(temp?-1:1)*i*v.step)} ${temp?'°C':'mm'}`]);
  return {headline:`${rows.length} test sections`,text:'Use this range in your slicer’s native calibration dialog. Inspect the generated model and preview before printing; these are user-selected values, not manufacturer recommendations.',rows,type:'Calculated test plan'};
 }
 let rows=[],headline='';
 if(slug==='flow-rate'){if(v.old<=0)throw Error('Current flow ratio must be positive.'); const flow=values.method==='yolo'?v.old+v.modifier:v.old*(100+v.modifier)/100;if(flow<=0)throw Error('The candidate flow ratio must be positive.');headline=`${round(flow)} flow ratio`;rows=[['Method',values.method==='yolo'?'YOLO (additive)':'2-pass (percentage)'],['Candidate flow ratio',round(flow)]];}
 if(slug==='pressure-advance'){if(v.start<0||v.height<0||v.factor<=0)throw Error('START and height cannot be negative; FACTOR must be positive.');headline=`${round(v.start+v.height*v.factor)} pressure advance`;rows=[['Klipper candidate',round(v.start+v.height*v.factor)]];}
 if(slug==='volumetric-flow'){if(['width','height','speed','capacity'].some(k=>v[k]<=0))throw Error('All measurements must be positive.');const demand=v.width*v.height*v.speed;headline=`${round(demand,3)} mm³/s demand`;rows=[['Approximate flow demand',`${round(demand,3)} mm³/s`],['Estimated speed at measured ceiling',`${round(v.capacity/(v.width*v.height),2)} mm/s`],['Measured ceiling minus demand',`${round(v.capacity-demand,3)} mm³/s`]];}
 if(slug==='dimensional-accuracy'){if(v.target<=0||v.measured<=0||v.scale<=0)throw Error('Dimensions and current scale must be positive.');headline=`${round(v.measured-v.target,3)} mm error`;rows=[['Signed error',`${round(v.measured-v.target,3)} mm`],['Relative error',`${round((v.measured/v.target-1)*100,3)}%`],['Candidate model scale',`${round(v.scale*v.target/v.measured,4)}%`]];}
 if(slug==='filament-cost'){if(v.grams<=0||v.spool<=0||v.price<0)throw Error('Material weights must be positive; price cannot be negative.');headline=`${(v.grams/v.spool*v.price).toFixed(2)} material cost`;rows=[['Cost in your entered currency',(v.grams/v.spool*v.price).toFixed(2)],['Spool used',`${round(v.grams/v.spool*100,2)}%`]];}
 return {headline,rows,type:'Calculated',text:'Based only on your entered measurements. Review the limitations below and validate with a repeat test before adopting a setting.'};
}
export function downloadReport(filename,data){const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}