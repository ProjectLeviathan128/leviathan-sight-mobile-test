var Pg=Object.defineProperty;var Lg=(e,t,i)=>t in e?Pg(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var P=(e,t,i)=>Lg(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=i(a);fetch(a.href,n)}})();class Ug{constructor(){P(this,"videoElement");P(this,"stream",null);P(this,"isReady",!1);P(this,"isZoomSupported",!1);P(this,"zoomMin",1);P(this,"zoomMax",1);P(this,"currentZoom",1);this.videoElement=document.createElement("video"),this.videoElement.setAttribute("playsinline","true"),this.videoElement.setAttribute("muted","true"),this.videoElement.autoplay=!0,this.videoElement.id="camera-feed",this.videoElement.style.position="absolute",this.videoElement.style.top="0",this.videoElement.style.left="0",this.videoElement.style.width="100%",this.videoElement.style.height="100%",this.videoElement.style.objectFit="cover",this.videoElement.style.zIndex="0"}async start(){if(!this.stream)try{const t={video:{facingMode:{ideal:"environment"},width:{ideal:3840},height:{ideal:2160}},audio:!1};this.stream=await navigator.mediaDevices.getUserMedia(t),this.videoElement.srcObject=this.stream;const r=this.stream.getVideoTracks()[0].getCapabilities();return r&&r.zoom&&(this.zoomMin=r.zoom.min,this.zoomMax=r.zoom.max,this.isZoomSupported=!0,console.log(`Zoom supported: ${this.zoomMin} - ${this.zoomMax}`)),new Promise(a=>{this.videoElement.onloadedmetadata=()=>{this.videoElement.play().then(()=>{this.isReady=!0,a()})}})}catch(t){throw console.error("Camera access denied or failed:",t),t}}async setZoom(t){if(!this.stream||!this.isZoomSupported)return;const i=this.stream.getVideoTracks()[0],r=Math.max(this.zoomMin,Math.min(this.zoomMax,t));try{await i.applyConstraints({advanced:[{zoom:r}]}),this.currentZoom=r}catch(a){console.warn("Zoom failed:",a)}}Stop(){this.stream&&(this.stream.getTracks().forEach(t=>t.stop()),this.stream=null,this.isReady=!1)}mount(t){t.appendChild(this.videoElement)}}/*!
 * ONNX Runtime Web v1.23.2
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Fa=Object.defineProperty,Fg=Object.getOwnPropertyDescriptor,Hg=Object.getOwnPropertyNames,Wg=Object.prototype.hasOwnProperty,Vg=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,i)=>(typeof require<"u"?require:t)[i]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),H=(e,t)=>()=>(e&&(t=e(e=0)),t),$i=(e,t)=>{for(var i in t)Fa(e,i,{get:t[i],enumerable:!0})},Gg=(e,t,i,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Hg(t))!Wg.call(e,a)&&a!==i&&Fa(e,a,{get:()=>t[a],enumerable:!(r=Fg(t,a))||r.enumerable});return e},Zi=e=>Gg(Fa({},"__esModule",{value:!0}),e),Ii,Nt,fi,Ao,vc,$c=H(()=>{Ii=new Map,Nt=[],fi=(e,t,i)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=Ii.get(e);if(r===void 0)Ii.set(e,{backend:t,priority:i});else{if(r.priority>i)return;if(r.priority===i&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${i}`)}if(i>=0){let a=Nt.indexOf(e);a!==-1&&Nt.splice(a,1);for(let n=0;n<Nt.length;n++)if(Ii.get(Nt[n]).priority<=i){Nt.splice(n,0,e);return}Nt.push(e)}return}throw new TypeError("not a valid backend")},Ao=async e=>{let t=Ii.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let i=!!t.initPromise;try{return i||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return i||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},vc=async e=>{let t=e.executionProviders||[],i=t.map(u=>typeof u=="string"?u:u.name),r=i.length===0?Nt:i,a,n=[],s=new Set;for(let u of r){let d=await Ao(u);typeof d=="string"?n.push({name:u,err:d}):(a||(a=d),a===d&&s.add(u))}if(!a)throw new Error(`no available backend found. ERR: ${n.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:d}of n)i.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${d}`);let o=t.filter(u=>s.has(typeof u=="string"?u:u.name));return[a,new Proxy(e,{get:(u,d)=>d==="executionProviders"?o:Reflect.get(u,d)})]}}),qg=H(()=>{$c()}),xc,jg=H(()=>{xc="1.23.2"}),hr,Oe,Sc=H(()=>{jg(),hr="warning",Oe={wasm:{},webgl:{},webgpu:{},versions:{common:xc},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);hr=e}},get logLevel(){return hr}},Object.defineProperty(Oe,"logLevel",{enumerable:!0})}),ge,Kg=H(()=>{Sc(),ge=Oe}),Cc,Tc,Zg=H(()=>{Cc=(e,t)=>{let i=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);i.width=e.dims[3],i.height=e.dims[2];let r=i.getContext("2d");if(r!=null){let a,n;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[3]):(a=e.dims[3],n=e.dims[2]);let s=(t==null?void 0:t.format)!==void 0?t.format:"RGB",o=t==null?void 0:t.norm,u,d;o===void 0||o.mean===void 0?u=[255,255,255,255]:typeof o.mean=="number"?u=[o.mean,o.mean,o.mean,o.mean]:(u=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(u[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let h=n*a,f=0,m=h,y=h*2,_=-1;s==="RGBA"?(f=0,m=h,y=h*2,_=h*3):s==="RGB"?(f=0,m=h,y=h*2):s==="RBG"&&(f=0,y=h,m=h*2);for(let b=0;b<n;b++)for(let x=0;x<a;x++){let $=(e.data[f++]-d[0])*u[0],v=(e.data[m++]-d[1])*u[1],S=(e.data[y++]-d[2])*u[2],T=_===-1?255:(e.data[_++]-d[3])*u[3];r.fillStyle="rgba("+$+","+v+","+S+","+T+")",r.fillRect(x,b,1,1)}if("toDataURL"in i)return i.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Tc=(e,t)=>{let i=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(i!=null){let a,n,s;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[1],s=e.dims[3]):(a=e.dims[3],n=e.dims[2],s=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t==null?void 0:t.norm,d,h;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?h=[0,0,0,0]:typeof u.bias=="number"?h=[u.bias,u.bias,u.bias,u.bias]:(h=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(h[3]=u.bias[3]));let f=n*a;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,y=0,_=1,b=2,x=3,$=0,v=f,S=f*2,T=-1;o==="RGBA"?($=0,v=f,S=f*2,T=f*3):o==="RGB"?($=0,v=f,S=f*2):o==="RBG"&&($=0,S=f,v=f*2),r=i.createImageData(a,n);for(let I=0;I<n*a;y+=m,_+=m,b+=m,x+=m,I++)r.data[y]=(e.data[$++]-h[0])*d[0],r.data[_]=(e.data[v++]-h[1])*d[1],r.data[b]=(e.data[S++]-h[2])*d[2],r.data[x]=T===-1?255:(e.data[T++]-h[3])*d[3]}else throw new Error("Can not access image data");return r}}),dn,Ic,Ec,kc,zc,Mc,Yg=H(()=>{Ha(),dn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:i,width:r}=t,a=t.norm??{mean:255,bias:0},n,s;typeof a.mean=="number"?n=[a.mean,a.mean,a.mean,a.mean]:n=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?s=[a.bias,a.bias,a.bias,a.bias]:s=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=i*r,h=u==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),f=4,m=0,y=1,_=2,b=3,x=0,$=d,v=d*2,S=-1;o==="RGB"&&(f=3,m=0,y=1,_=2,b=-1),u==="RGBA"?S=d*3:u==="RBG"?(x=0,v=d,$=d*2):u==="BGR"&&(v=0,$=d,x=d*2);for(let T=0;T<d;T++,m+=f,_+=f,y+=f,b+=f)h[x++]=(e[m]+s[0])/n[0],h[$++]=(e[y]+s[1])/n[1],h[v++]=(e[_]+s[2])/n[2],S!==-1&&b!==-1&&(h[S++]=(e[b]+s[3])/n[3]);return u==="RGBA"?new Ye("float32",h,[1,4,i,r]):new Ye("float32",h,[1,3,i,r])},Ic=async(e,t)=>{let i=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,n=typeof e=="string",s,o=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=h=>typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||h instanceof OffscreenCanvas?h.getContext("2d"):null;if(i){let h=u();h.width=e.width,h.height=e.height;let f=d(h);if(f!=null){let m=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=m,o.width=y}else o.tensorFormat="RGBA",o.height=m,o.width=y;f.drawImage(e,0,0),s=f.getImageData(0,0,y,m).data}else throw new Error("Can not access image data")}else if(r){let h,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(h=t.resizedHeight,f=t.resizedWidth):(h=e.height,f=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=h,o.width=f,t!==void 0){let m=u();m.width=f,m.height=h;let y=d(m);if(y!=null)y.putImageData(e,0,0),s=y.getImageData(0,0,f,h).data;else throw new Error("Can not access image data")}else s=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let h=u();h.width=e.width,h.height=e.height;let f=d(h);if(f!=null){let m=e.height,y=e.width;return f.drawImage(e,0,0,y,m),s=f.getImageData(0,0,y,m).data,o.height=m,o.width=y,dn(s,o)}else throw new Error("Can not access image data")}else{if(n)return new Promise((h,f)=>{let m=u(),y=d(m);if(!e||!y)return f();let _=new Image;_.crossOrigin="Anonymous",_.src=e,_.onload=()=>{m.width=_.width,m.height=_.height,y.drawImage(_,0,0,m.width,m.height);let b=y.getImageData(0,0,m.width,m.height);o.height=m.height,o.width=m.width,h(dn(b.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return dn(s,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Ec=(e,t)=>{let{width:i,height:r,download:a,dispose:n}=t,s=[1,r,i,4];return new Ye({location:"texture",type:"float32",texture:e,dims:s,download:a,dispose:n})},kc=(e,t)=>{let{dataType:i,dims:r,download:a,dispose:n}=t;return new Ye({location:"gpu-buffer",type:i??"float32",gpuBuffer:e,dims:r,download:a,dispose:n})},zc=(e,t)=>{let{dataType:i,dims:r,download:a,dispose:n}=t;return new Ye({location:"ml-tensor",type:i??"float32",mlTensor:e,dims:r,download:a,dispose:n})},Mc=(e,t,i)=>new Ye({location:"cpu-pinned",type:e,data:t,dims:i??[t.length]})}),ti,Li,pr,Ac,Xg=H(()=>{ti=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Li=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),pr=!1,Ac=()=>{if(!pr){pr=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,i=globalThis.Float16Array,r=typeof i<"u"&&i.from;e&&(ti.set("int64",BigInt64Array),Li.set(BigInt64Array,"int64")),t&&(ti.set("uint64",BigUint64Array),Li.set(BigUint64Array,"uint64")),r?(ti.set("float16",i),Li.set(i,"float16")):ti.set("float16",Uint16Array)}}}),Rc,Oc,Jg=H(()=>{Ha(),Rc=e=>{let t=1;for(let i=0;i<e.length;i++){let r=e[i];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${i}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${i}] must be a non-negative integer, got: ${r}`);t*=r}return t},Oc=(e,t)=>{switch(e.location){case"cpu":return new Ye(e.type,e.data,t);case"cpu-pinned":return new Ye({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ye({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ye({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ye({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ye,Ha=H(()=>{Zg(),Yg(),Xg(),Jg(),Ye=class{constructor(e,t,i){Ac();let r,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,r=e.type,a=e.dims,e.location){case"cpu-pinned":{let s=ti.get(r);if(!s)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint64"&&r!=="int8"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if(typeof e=="string")if(r=e,o=i,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let u=ti.get(e);if(u===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&u===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${u.name} as data.`);e==="uint64"||e==="int64"?s=u.from(t,BigInt):s=u.from(t)}else if(t instanceof u)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&u!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${u}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let u=typeof e[0];if(u==="string")r="string",s=e;else if(u==="boolean")r="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${u}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",s=Uint8Array.from(e);else{let u=Li.get(e.constructor);if(u===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=u,s=e}if(o===void 0)o=[s.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");a=o,this.cpuData=s,this.dataLocation="cpu"}let n=Rc(a);if(this.cpuData&&n!==this.cpuData.length&&!((r==="uint4"||r==="int4")&&Math.ceil(n/2)===this.cpuData.length))throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=a,this.size=n}static async fromImage(e,t){return Ic(e,t)}static fromTexture(e,t){return Ec(e,t)}static fromGpuBuffer(e,t){return kc(e,t)}static fromMLTensor(e,t){return zc(e,t)}static fromPinnedBuffer(e,t,i){return Mc(e,t,i)}toDataURL(e){return Cc(this,e)}toImageData(e){return Tc(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Oc(this,e)}}}),tt,Dc=H(()=>{Ha(),tt=Ye}),An,fr,wt,dt,ai,si,Bc=H(()=>{Sc(),An=(e,t)=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||console.timeStamp(`${e}::ORT::${t}`)},fr=(e,t)=>{var a;let i=((a=new Error().stack)==null?void 0:a.split(/\r\n|\r|\n/g))||[],r=!1;for(let n=0;n<i.length;n++){if(r&&!i[n].includes("TRACE_FUNC")){let s=`FUNC_${e}::${i[n].trim().split(" ")[1]}`;t&&(s+=`::${t}`),An("CPU",s);return}i[n].includes("TRACE_FUNC")&&(r=!0)}},wt=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||fr("BEGIN",e)},dt=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||fr("END",e)},ai=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||console.time(`ORT::${e}`)},si=e=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||console.timeEnd(`ORT::${e}`)}}),Nc,Qg=H(()=>{$c(),Dc(),Bc(),Nc=class Pc{constructor(t){this.handler=t}async run(t,i,r){wt(),ai("InferenceSession.run");let a={},n={};if(typeof t!="object"||t===null||t instanceof tt||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof i=="object"){if(i===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(i instanceof tt)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(i)){if(i.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of i){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);a[d]=null}if(typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,h=Object.getOwnPropertyNames(i);for(let f of this.outputNames)if(h.indexOf(f)!==-1){let m=i[f];(m===null||m instanceof tt)&&(d=!0,s=!1,a[f]=m)}if(d){if(typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else n=i}}else if(typeof i<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)a[d]=null;let o=await this.handler.run(t,a,n),u={};for(let d in o)if(Object.hasOwnProperty.call(o,d)){let h=o[d];h instanceof tt?u[d]=h:u[d]=new tt(h.type,h.data,h.dims)}return si("InferenceSession.run"),dt(),u}async release(){return this.handler.dispose()}static async create(t,i,r,a){wt(),ai("InferenceSession.create");let n,s={};if(typeof t=="string"){if(n=t,typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let h=t,f=0,m=t.byteLength;if(typeof i=="object"&&i!==null)s=i;else if(typeof i=="number"){if(f=i,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=h.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${h.byteLength}).`);if(m=t.byteLength-f,typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||f+m>h.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${h.byteLength-f}].`);if(typeof a=="object"&&a!==null)s=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof i<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(h,f,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,u]=await vc(s),d=await o.createInferenceSessionHandler(n,u);return si("InferenceSession.create"),dt(),new Pc(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Gi,e0=H(()=>{Qg(),Gi=Nc}),t0=H(()=>{}),i0=H(()=>{}),n0=H(()=>{}),r0=H(()=>{}),a0={};$i(a0,{InferenceSession:()=>Gi,TRACE:()=>An,TRACE_EVENT_BEGIN:()=>ai,TRACE_EVENT_END:()=>si,TRACE_FUNC_BEGIN:()=>wt,TRACE_FUNC_END:()=>dt,Tensor:()=>tt,env:()=>ge,registerBackend:()=>fi});var it=H(()=>{qg(),Kg(),e0(),Dc(),t0(),i0(),Bc(),n0(),r0()}),Wa=H(()=>{}),Lc={};$i(Lc,{default:()=>Uc});var mr,gr,Uc,s0=H(()=>{var e;qf(),di(),Va(),mr="ort-wasm-proxy-worker",gr=((e=globalThis.self)==null?void 0:e.name)===mr,gr&&(self.onmessage=t=>{let{type:i,in:r}=t.data;try{switch(i){case"init-wasm":Ga(r.wasm).then(()=>{ls(r).then(()=>{postMessage({type:i})},a=>{postMessage({type:i,err:a})})},a=>{postMessage({type:i,err:a})});break;case"init-ep":{let{epName:a,env:n}=r;us(n,a).then(()=>{postMessage({type:i})},s=>{postMessage({type:i,err:s})});break}case"copy-from":{let{buffer:a}=r,n=Ln(a);postMessage({type:i,out:n});break}case"create":{let{model:a,options:n}=r;ds(a,n).then(s=>{postMessage({type:i,out:s})},s=>{postMessage({type:i,err:s})});break}case"release":cs(r),postMessage({type:i});break;case"run":{let{sessionId:a,inputIndices:n,inputs:s,outputIndices:o,options:u}=r;hs(a,n,s,o,new Array(o.length).fill(null),u).then(d=>{d.some(h=>h[3]!=="cpu")?postMessage({type:i,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:i,out:d},fs([...s,...d]))},d=>{postMessage({type:i,err:d})});break}case"end-profiling":ps(r),postMessage({type:i});break;default:}}catch(a){postMessage({type:i,err:a})}}),Uc=gr?null:t=>new Worker(t??Ke,{type:"module",name:mr})}),Fc={};$i(Fc,{default:()=>Hc});var yr,Hc,Ro,o0=H(()=>{var e,t;yr=async function(i={}){var Mo;var r,a,n=i,s=new Promise((l,c)=>{r=l,a=c}),o=typeof window=="object",u=typeof WorkerGlobalScope<"u",d=u&&((Mo=self.name)==null?void 0:Mo.startsWith("em-pthread"));n.mountExternalData=(l,c)=>{l.startsWith("./")&&(l=l.substring(2)),(n.Fb||(n.Fb=new Map)).set(l,c)},n.unmountExternalData=()=>{delete n.Fb};var h=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let f=l=>async(...c)=>{var p;try{if(n.Gb)throw Error("Session already started");let g=n.Gb={ec:c[0],errors:[]},w=await l(...c);if(n.Gb!==g)throw Error("Session mismatch");(p=n.Kb)==null||p.flush();let C=g.errors;if(0<C.length){let E=await Promise.all(C);if(E=E.filter(A=>A),0<E.length)throw Error(E.join(`
`))}return w}finally{n.Gb=null}};n.jsepInit=(l,c)=>{if(l==="webgpu"){[n.Kb,n.Vb,n.Zb,n.Lb,n.Yb,n.Ab,n.$b,n.bc,n.Wb,n.Xb,n.ac]=c;let p=n.Kb;n.jsepRegisterBuffer=(g,w,C,E)=>p.registerBuffer(g,w,C,E),n.jsepGetBuffer=g=>p.getBuffer(g),n.jsepCreateDownloader=(g,w,C)=>p.createDownloader(g,w,C),n.jsepOnCreateSession=g=>{p.onCreateSession(g)},n.jsepOnReleaseSession=g=>{p.onReleaseSession(g)},n.jsepOnRunStart=g=>p.onRunStart(g),n.cc=(g,w)=>{p.upload(g,w)}}else if(l==="webnn"){let p=c[0];[n.oc,n.Ob,n.webnnEnsureTensor,n.Pb,n.webnnDownloadTensor,n.nc,n.webnnEnableTraceEvent]=c.slice(1),n.webnnReleaseTensorId=n.Ob,n.webnnUploadTensor=n.Pb,n.webnnRegisterMLContext=n.nc,n.webnnOnRunStart=g=>p.onRunStart(g),n.webnnOnRunEnd=p.onRunEnd.bind(p),n.webnnOnReleaseSession=g=>{p.onReleaseSession(g)},n.webnnCreateMLTensorDownloader=(g,w)=>p.createMLTensorDownloader(g,w),n.webnnRegisterMLTensor=(g,w,C,E)=>p.registerMLTensor(g,w,C,E),n.webnnCreateMLContext=g=>p.createMLContext(g),n.webnnRegisterMLConstant=(g,w,C,E,A,L)=>p.registerMLConstant(g,w,C,E,A,n.Fb,L),n.webnnRegisterGraphInput=p.registerGraphInput.bind(p),n.webnnIsGraphInput=p.isGraphInput.bind(p),n.webnnRegisterGraphOutput=p.registerGraphOutput.bind(p),n.webnnIsGraphOutput=p.isGraphOutput.bind(p),n.webnnCreateTemporaryTensor=p.createTemporaryTensor.bind(p),n.webnnIsGraphInputOutputTypeSupported=p.isGraphInputOutputTypeSupported.bind(p)}};let m=()=>{let l=(c,p,g)=>(...w)=>{let C=pt,E=p==null?void 0:p();w=c(...w);let A=p==null?void 0:p();return E!==A&&(c=A,g(E),p=g=null),pt!=C?new Promise((L,W)=>{tr={resolve:L,reject:W}}):w};(()=>{for(let c of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])n[c]=l(n[c],()=>n[c],p=>n[c]=p)})(),f!==void 0&&(n._OrtRun=f(n._OrtRun),n._OrtRunWithBinding=f(n._OrtRunWithBinding)),m=void 0};n.asyncInit=()=>{m==null||m()};var y,_,b=(l,c)=>{throw c},x=import.meta.url,$="";if(o||u){try{$=new URL(".",x).href}catch{}u&&(_=l=>{var c=new XMLHttpRequest;return c.open("GET",l,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),y=async l=>{if(V(l))return new Promise((p,g)=>{var w=new XMLHttpRequest;w.open("GET",l,!0),w.responseType="arraybuffer",w.onload=()=>{w.status==200||w.status==0&&w.response?p(w.response):g(w.status)},w.onerror=g,w.send(null)});var c=await fetch(l,{credentials:"same-origin"});if(c.ok)return c.arrayBuffer();throw Error(c.status+" : "+c.url)}}var v,S,T,I,k,z,M,O,F,K,G,q,ue,ae,X,oe=console.log.bind(console),J=console.error.bind(console),ie=oe,we=J,N=!1,V=l=>l.startsWith("file://");function j(){return S.buffer!=k.buffer&&_e(),k}function te(){return S.buffer!=k.buffer&&_e(),z}function ke(){return S.buffer!=k.buffer&&_e(),M}function ct(){return S.buffer!=k.buffer&&_e(),O}function U(){return S.buffer!=k.buffer&&_e(),F}function ve(){return S.buffer!=k.buffer&&_e(),K}function Ge(){return S.buffer!=k.buffer&&_e(),G}function Ue(){return S.buffer!=k.buffer&&_e(),ae}if(d){let l=function(c){try{var p=c.data,g=p.Db;if(g==="load"){let w=[];self.onmessage=C=>w.push(C),self.startWorker=()=>{postMessage({Db:"loaded"});for(let C of w)l(C);self.onmessage=l};for(let C of p.Sb)n[C]&&!n[C].proxy||(n[C]=(...E)=>{postMessage({Db:"callHandler",Rb:C,args:E})},C=="print"&&(ie=n[C]),C=="printErr"&&(we=n[C]));S=p.kc,_e(),X(p.lc)}else if(g==="run"){_m(p.Bb),or(p.Bb,0,0,1,0,0),Ts(),Qn(p.Bb),vt||(bo(),vt=!0);try{bm(p.hc,p.Jb)}catch(w){if(w!="unwind")throw w}}else p.target!=="setimmediate"&&(g==="checkMailbox"?vt&&Qi():g&&(we(`worker: received unknown command ${g}`),we(p)))}catch(w){throw wo(),w}};var vt=!1;self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=l}function _e(){var l=S.buffer;n.HEAP8=k=new Int8Array(l),M=new Int16Array(l),n.HEAPU8=z=new Uint8Array(l),O=new Uint16Array(l),n.HEAP32=F=new Int32Array(l),n.HEAPU32=K=new Uint32Array(l),G=new Float32Array(l),ae=new Float64Array(l),q=new BigInt64Array(l),ue=new BigUint64Array(l)}function Se(){d?startWorker(n):D.Da()}var qe,Vt=0,Gt=null;function bs(){if(--Vt==0&&Gt){var l=Gt;Gt=null,l()}}function At(l){throw we(l="Aborted("+l+")"),N=!0,l=new WebAssembly.RuntimeError(l+". Build with -sASSERTIONS for more info."),a(l),l}function ws(){return{a:{L:Bg,Aa:Dg,b:vm,$:zs,A:Rs,pa:Os,X:Ds,Z:Bs,qa:Ns,na:Ps,ga:Ls,ma:Us,J:Fs,Y:Hs,V:Ws,oa:Vs,W:Gs,va:$m,E:xm,Q:Sm,O:Tm,D:Em,v:km,s:zm,P:Mm,z:Pm,R:Lm,ja:Um,T:Fm,aa:Hm,M:Wm,F:Vm,ia:Qn,sa:Gm,r:qm,Ca:jm,w:Ym,o:Xm,m:Qm,c:Zn,Ba:eg,n:tg,j:rg,u:ag,p:sg,f:og,t:lg,l:ug,e:dg,k:cg,h:hg,g:pg,d:fg,da:mg,ea:gg,fa:yg,ba:ro,ca:ao,N:so,xa:bg,ua:vg,i:$g,C:xg,G:Sg,ta:wg,x:Cg,ra:Tg,U:Ig,q:_g,y:Eg,K:kg,S:zg,za:Mg,ya:Ag,ka:co,la:ho,_:Gn,B:po,I:fo,ha:mo,H:go,a:S,wa:Vn}}}class Hn{constructor(c){P(this,"name","ExitStatus");this.message=`Program terminated with exit(${c})`,this.status=c}}var vs=l=>{l.terminate(),l.onmessage=()=>{}},Wn=[],$s=l=>{Ot.length==0&&(Es(),Is(Ot[0]));var c=Ot.pop();if(!c)return 6;xi.push(c),qt[l.Bb]=c,c.Bb=l.Bb;var p={Db:"run",hc:l.fc,Jb:l.Jb,Bb:l.Bb};return c.postMessage(p,l.Nb),0},Rt=0,xe=(l,c,...p)=>{for(var g=2*p.length,w=dr(),C=ur(8*g),E=C>>>3,A=0;A<p.length;A++){var L=p[A];typeof L=="bigint"?(q[E+2*A]=1n,q[E+2*A+1]=L):(q[E+2*A]=0n,Ue()[E+2*A+1>>>0]=L)}return l=vo(l,0,g,C,c),un(w),l};function Vn(l){if(d)return xe(0,1,l);if(I=l,!(0<Rt)){for(var c of xi)vs(c);for(c of Ot)vs(c);Ot=[],xi=[],qt={},N=!0}b(0,new Hn(l))}function xs(l){if(d)return xe(1,0,l);Gn(l)}var Gn=l=>{if(I=l,d)throw xs(l),"unwind";Vn(l)},Ot=[],xi=[],Ss=[],qt={},Cs=l=>{var c=l.Bb;delete qt[c],Ot.push(l),xi.splice(xi.indexOf(l),1),l.Bb=0,$o(c)};function Ts(){Ss.forEach(l=>l())}var Is=l=>new Promise(c=>{l.onmessage=w=>{var C=(w=w.data).Db;if(w.Hb&&w.Hb!=sr()){var E=qt[w.Hb];E?E.postMessage(w,w.Nb):we(`Internal error! Worker sent a message "${C}" to target pthread ${w.Hb}, but that thread no longer exists!`)}else C==="checkMailbox"?Qi():C==="spawnThread"?$s(w):C==="cleanupThread"?Cs(qt[w.ic]):C==="loaded"?(l.loaded=!0,c(l)):w.target==="setimmediate"?l.postMessage(w):C==="callHandler"?n[w.Rb](...w.args):C&&we(`worker sent an unknown command ${C}`)},l.onerror=w=>{throw we(`worker sent an error! ${w.filename}:${w.lineno}: ${w.message}`),w};var p,g=[];for(p of[])n.propertyIsEnumerable(p)&&g.push(p);l.postMessage({Db:"load",Sb:g,kc:S,lc:T})});function Es(){var l=new Worker((()=>{let c=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new c("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Ot.push(l)}var _m=l=>{_e();var c=ve()[l+52>>>2>>>0];l=ve()[l+56>>>2>>>0],Co(c,c-l),un(c)},bm=(l,c)=>{Rt=0,l=To(l,c),0<Rt?I=l:lr(l)};class wm{constructor(c){this.Ib=c-24}}function vm(l,c,p){var g=new wm(l>>>=0);throw c>>>=0,p>>>=0,ve()[g.Ib+16>>>2>>>0]=0,ve()[g.Ib+4>>>2>>>0]=c,ve()[g.Ib+8>>>2>>>0]=p,l}function ks(l,c,p,g){return d?xe(2,1,l,c,p,g):zs(l,c,p,g)}function zs(l,c,p,g){if(l>>>=0,p>>>=0,g>>>=0,h===void 0)return 6;var w=[];return d&&w.length===0?ks(l,c>>>=0,p,g):(l={fc:p,Bb:l,Jb:g,Nb:w},d?(l.Db="spawnThread",postMessage(l,w),0):$s(l))}var Ms=typeof TextDecoder<"u"?new TextDecoder:void 0,As=(l,c=0,p=NaN)=>{var g=(c>>>=0)+p;for(p=c;l[p]&&!(p>=g);)++p;if(16<p-c&&l.buffer&&Ms)return Ms.decode(l.buffer instanceof ArrayBuffer?l.subarray(c,p):l.slice(c,p));for(g="";c<p;){var w=l[c++];if(128&w){var C=63&l[c++];if((224&w)==192)g+=String.fromCharCode((31&w)<<6|C);else{var E=63&l[c++];65536>(w=(240&w)==224?(15&w)<<12|C<<6|E:(7&w)<<18|C<<12|E<<6|63&l[c++])?g+=String.fromCharCode(w):(w-=65536,g+=String.fromCharCode(55296|w>>10,56320|1023&w))}}else g+=String.fromCharCode(w)}return g},Ee=(l,c)=>(l>>>=0)?As(te(),l,c):"";function Rs(l,c,p){return d?xe(3,1,l,c,p):0}function Os(l,c){if(d)return xe(4,1,l,c)}function Ds(l,c){if(d)return xe(5,1,l,c)}function Bs(l,c,p){if(d)return xe(6,1,l,c,p)}function Ns(l,c,p){return d?xe(7,1,l,c,p):0}function Ps(l,c){if(d)return xe(8,1,l,c)}function Ls(l,c,p){if(d)return xe(9,1,l,c,p)}function Us(l,c,p,g){if(d)return xe(10,1,l,c,p,g)}function Fs(l,c,p,g){if(d)return xe(11,1,l,c,p,g)}function Hs(l,c,p,g){if(d)return xe(12,1,l,c,p,g)}function Ws(l){if(d)return xe(13,1,l)}function Vs(l,c){if(d)return xe(14,1,l,c)}function Gs(l,c,p){if(d)return xe(15,1,l,c,p)}var qs,$m=()=>At(""),ht=l=>{for(var c="";te()[l>>>0];)c+=qs[te()[l++>>>0]];return c},qn={},jn={},hi=n.BindingError=class extends Error{constructor(l){super(l),this.name="BindingError"}};function $t(l,c,p={}){return function(g,w,C={}){var E=w.name;if(!g)throw new hi(`type "${E}" must have a positive integer typeid pointer`);if(jn.hasOwnProperty(g)){if(C.Tb)return;throw new hi(`Cannot register type '${E}' twice`)}jn[g]=w,qn.hasOwnProperty(g)&&(w=qn[g],delete qn[g],w.forEach(A=>A()))}(l,c,p)}var js=(l,c,p)=>{switch(c){case 1:return p?g=>j()[g>>>0]:g=>te()[g>>>0];case 2:return p?g=>ke()[g>>>1>>>0]:g=>ct()[g>>>1>>>0];case 4:return p?g=>U()[g>>>2>>>0]:g=>ve()[g>>>2>>>0];case 8:return p?g=>q[g>>>3]:g=>ue[g>>>3];default:throw new TypeError(`invalid integer width (${c}): ${l}`)}};function xm(l,c,p){p>>>=0,$t(l>>>=0,{name:c=ht(c>>>0),fromWireType:g=>g,toWireType:function(g,w){if(typeof w!="bigint"&&typeof w!="number")throw w=w===null?"null":(g=typeof w)=="object"||g==="array"||g==="function"?w.toString():""+w,new TypeError(`Cannot convert "${w}" to ${this.name}`);return typeof w=="number"&&(w=BigInt(w)),w},Cb:Dt,readValueFromPointer:js(c,p,c.indexOf("u")==-1),Eb:null})}var Dt=8;function Sm(l,c,p,g){$t(l>>>=0,{name:c=ht(c>>>0),fromWireType:function(w){return!!w},toWireType:function(w,C){return C?p:g},Cb:Dt,readValueFromPointer:function(w){return this.fromWireType(te()[w>>>0])},Eb:null})}var Kn=[],xt=[];function Zn(l){9<(l>>>=0)&&--xt[l+1]==0&&(xt[l]=void 0,Kn.push(l))}var Fe=l=>{if(!l)throw new hi(`Cannot use deleted val. handle = ${l}`);return xt[l]},Je=l=>{switch(l){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=Kn.pop()||xt.length;return xt[c]=l,xt[c+1]=1,c}};function Yn(l){return this.fromWireType(ve()[l>>>2>>>0])}var Cm={name:"emscripten::val",fromWireType:l=>{var c=Fe(l);return Zn(l),c},toWireType:(l,c)=>Je(c),Cb:Dt,readValueFromPointer:Yn,Eb:null};function Tm(l){return $t(l>>>0,Cm)}var Im=(l,c)=>{switch(c){case 4:return function(p){return this.fromWireType(Ge()[p>>>2>>>0])};case 8:return function(p){return this.fromWireType(Ue()[p>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${l}`)}};function Em(l,c,p){p>>>=0,$t(l>>>=0,{name:c=ht(c>>>0),fromWireType:g=>g,toWireType:(g,w)=>w,Cb:Dt,readValueFromPointer:Im(c,p),Eb:null})}function km(l,c,p,g,w){if(l>>>=0,p>>>=0,c=ht(c>>>0),w===-1&&(w=4294967295),w=A=>A,g===0){var C=32-8*p;w=A=>A<<C>>>C}var E=c.includes("unsigned")?function(A,L){return L>>>0}:function(A,L){return L};$t(l,{name:c,fromWireType:w,toWireType:E,Cb:Dt,readValueFromPointer:js(c,p,g!==0),Eb:null})}function zm(l,c,p){function g(C){var E=ve()[C>>>2>>>0];return C=ve()[C+4>>>2>>>0],new w(j().buffer,C,E)}var w=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];$t(l>>>=0,{name:p=ht(p>>>0),fromWireType:g,Cb:Dt,readValueFromPointer:g},{Tb:!0})}var jt=(l,c,p)=>{var g=te();if(c>>>=0,0<p){var w=c;p=c+p-1;for(var C=0;C<l.length;++C){var E=l.charCodeAt(C);if(55296<=E&&57343>=E&&(E=65536+((1023&E)<<10)|1023&l.charCodeAt(++C)),127>=E){if(c>=p)break;g[c++>>>0]=E}else{if(2047>=E){if(c+1>=p)break;g[c++>>>0]=192|E>>6}else{if(65535>=E){if(c+2>=p)break;g[c++>>>0]=224|E>>12}else{if(c+3>=p)break;g[c++>>>0]=240|E>>18,g[c++>>>0]=128|E>>12&63}g[c++>>>0]=128|E>>6&63}g[c++>>>0]=128|63&E}}g[c>>>0]=0,l=c-w}else l=0;return l},Xn=l=>{for(var c=0,p=0;p<l.length;++p){var g=l.charCodeAt(p);127>=g?c++:2047>=g?c+=2:55296<=g&&57343>=g?(c+=4,++p):c+=3}return c};function Mm(l,c){$t(l>>>=0,{name:c=ht(c>>>0),fromWireType:function(p){for(var g,w=ve()[p>>>2>>>0],C=p+4,E=C,A=0;A<=w;++A){var L=C+A;A!=w&&te()[L>>>0]!=0||(E=Ee(E,L-E),g===void 0?g=E:(g+="\0",g+=E),E=L+1)}return St(p),g},toWireType:function(p,g){g instanceof ArrayBuffer&&(g=new Uint8Array(g));var w=typeof g=="string";if(!(w||ArrayBuffer.isView(g)&&g.BYTES_PER_ELEMENT==1))throw new hi("Cannot pass non-string to std::string");var C=w?Xn(g):g.length,E=ln(4+C+1),A=E+4;return ve()[E>>>2>>>0]=C,w?jt(g,A,C+1):te().set(g,A>>>0),p!==null&&p.push(St,E),E},Cb:Dt,readValueFromPointer:Yn,Eb(p){St(p)}})}var Ks=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Am=(l,c)=>{for(var p=l>>1,g=p+c/2;!(p>=g)&&ct()[p>>>0];)++p;if(32<(p<<=1)-l&&Ks)return Ks.decode(te().slice(l,p));for(p="",g=0;!(g>=c/2);++g){var w=ke()[l+2*g>>>1>>>0];if(w==0)break;p+=String.fromCharCode(w)}return p},Rm=(l,c,p)=>{if(p??(p=2147483647),2>p)return 0;var g=c;p=(p-=2)<2*l.length?p/2:l.length;for(var w=0;w<p;++w){var C=l.charCodeAt(w);ke()[c>>>1>>>0]=C,c+=2}return ke()[c>>>1>>>0]=0,c-g},Om=l=>2*l.length,Dm=(l,c)=>{for(var p=0,g="";!(p>=c/4);){var w=U()[l+4*p>>>2>>>0];if(w==0)break;++p,65536<=w?(w-=65536,g+=String.fromCharCode(55296|w>>10,56320|1023&w)):g+=String.fromCharCode(w)}return g},Bm=(l,c,p)=>{if(c>>>=0,p??(p=2147483647),4>p)return 0;var g=c;p=g+p-4;for(var w=0;w<l.length;++w){var C=l.charCodeAt(w);if(55296<=C&&57343>=C&&(C=65536+((1023&C)<<10)|1023&l.charCodeAt(++w)),U()[c>>>2>>>0]=C,(c+=4)+4>p)break}return U()[c>>>2>>>0]=0,c-g},Nm=l=>{for(var c=0,p=0;p<l.length;++p){var g=l.charCodeAt(p);55296<=g&&57343>=g&&++p,c+=4}return c};function Pm(l,c,p){if(l>>>=0,c>>>=0,p=ht(p>>>=0),c===2)var g=Am,w=Rm,C=Om,E=A=>ct()[A>>>1>>>0];else c===4&&(g=Dm,w=Bm,C=Nm,E=A=>ve()[A>>>2>>>0]);$t(l,{name:p,fromWireType:A=>{for(var L,W=ve()[A>>>2>>>0],Z=A+4,ne=0;ne<=W;++ne){var de=A+4+ne*c;ne!=W&&E(de)!=0||(Z=g(Z,de-Z),L===void 0?L=Z:(L+="\0",L+=Z),Z=de+c)}return St(A),L},toWireType:(A,L)=>{if(typeof L!="string")throw new hi(`Cannot pass non-string to C++ string type ${p}`);var W=C(L),Z=ln(4+W+c);return ve()[Z>>>2>>>0]=W/c,w(L,Z+4,W+c),A!==null&&A.push(St,Z),Z},Cb:Dt,readValueFromPointer:Yn,Eb(A){St(A)}})}function Lm(l,c){$t(l>>>=0,{Ub:!0,name:c=ht(c>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function Um(l){or(l>>>0,!u,1,!o,131072,!1),Ts()}var Jn=l=>{if(!N)try{if(l(),!(0<Rt))try{d?lr(I):Gn(I)}catch(c){c instanceof Hn||c=="unwind"||b(0,c)}}catch(c){c instanceof Hn||c=="unwind"||b(0,c)}};function Qn(l){l>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(U(),l>>>2,l).value.then(Qi),l+=128,Atomics.store(U(),l>>>2,1))}var Qi=()=>{var l=sr();l&&(Qn(l),Jn(So))};function Fm(l,c){(l>>>=0)==c>>>0?setTimeout(Qi):d?postMessage({Hb:l,Db:"checkMailbox"}):(l=qt[l])&&l.postMessage({Db:"checkMailbox"})}var er=[];function Hm(l,c,p,g,w){for(c>>>=0,g/=2,er.length=g,p=w>>>0>>>3,w=0;w<g;w++)er[w]=q[p+2*w]?q[p+2*w+1]:Ue()[p+2*w+1>>>0];return(c?ar[c]:Og[l])(...er)}var Wm=()=>{Rt=0};function Vm(l){l>>>=0,d?postMessage({Db:"cleanupThread",ic:l}):Cs(qt[l])}function Gm(l){}var en=(l,c)=>{var p=jn[l];if(p===void 0)throw l=_o(l),p=ht(l),St(l),new hi(`${c} has unknown type ${p}`);return p},Zs=(l,c,p)=>{var g=[];return l=l.toWireType(g,p),g.length&&(ve()[c>>>2>>>0]=Je(g)),l};function qm(l,c,p){return c>>>=0,p>>>=0,l=Fe(l>>>0),c=en(c,"emval::as"),Zs(c,p,l)}function jm(l,c){return c>>>=0,l=Fe(l>>>0),(c=en(c,"emval::as")).toWireType(null,l)}var tn=l=>{try{l()}catch(c){At(c)}},Bt=0,pt=null,Ys=0,nn=[],Xs={},Js={},Km=0,tr=null,Zm=[];function Qs(l){return function(c){if(!N){if(Bt===0){var p=!1,g=!1;c((w=0)=>{if(!N&&(Ys=w,p=!0,g)){Bt=2,tn(()=>ko(pt)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),w=!1;try{var C=function(){var L=U()[pt+8>>>2>>>0];return L=D[Js[L]],--Rt,L()}()}catch(L){C=L,w=!0}var E=!1;if(!pt){var A=tr;A&&(tr=null,(w?A.reject:A.resolve)(C),E=!0)}if(w&&!E)throw C}}),g=!0,p||(Bt=1,pt=function(){var w=ln(65548),C=w+12;ve()[w>>>2>>>0]=C,ve()[w+4>>>2>>>0]=C+65536,C=nn[0];var E=Xs[C];return E===void 0&&(E=Km++,Xs[C]=E,Js[E]=C),C=E,U()[w+8>>>2>>>0]=C,w}(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),tn(()=>Io(pt)))}else Bt===2?(Bt=0,tn(zo),St(pt),pt=null,Zm.forEach(Jn)):At(`invalid state: ${Bt}`);return Ys}}(c=>{l().then(c)})}function Ym(l){return l>>>=0,Qs(async()=>{var c=await Fe(l);return Je(c)})}var rn=[];function Xm(l,c,p,g){return p>>>=0,g>>>=0,(l=rn[l>>>0])(null,c=Fe(c>>>0),p,g)}var Jm={},an=l=>{var c=Jm[l];return c===void 0?ht(l):c};function Qm(l,c,p,g,w){return p>>>=0,g>>>=0,w>>>=0,(l=rn[l>>>0])(c=Fe(c>>>0),c[p=an(p)],g,w)}function eg(l,c){return c>>>=0,(l=Fe(l>>>0))==Fe(c)}var eo=()=>typeof globalThis=="object"?globalThis:Function("return this")();function tg(l){return(l>>>=0)==0?Je(eo()):(l=an(l),Je(eo()[l]))}var ig=l=>{var c=rn.length;return rn.push(l),c},ng=(l,c)=>{for(var p=Array(l),g=0;g<l;++g)p[g]=en(ve()[c+4*g>>>2>>>0],`parameter ${g}`);return p};function rg(l,c,p){var g=(c=ng(l,c>>>0)).shift();l--;var w=`return function (obj, func, destructorsRef, args) {
`,C=0,E=[];p===0&&E.push("obj");for(var A=["retType"],L=[g],W=0;W<l;++W)E.push(`arg${W}`),A.push(`argType${W}`),L.push(c[W]),w+=`  var arg${W} = argType${W}.readValueFromPointer(args${C?"+"+C:""});
`,C+=c[W].Cb;return w+=`  var rv = ${p===1?"new func":"func.call"}(${E.join(", ")});
`,g.Ub||(A.push("emval_returnValue"),L.push(Zs),w+=`  return emval_returnValue(retType, destructorsRef, rv);
`),l=new Function(...A,w+`};
`)(...L),p=`methodCaller<(${c.map(Z=>Z.name).join(", ")}) => ${g.name}>`,ig(Object.defineProperty(l,"name",{value:p}))}function ag(l){return l=an(l>>>0),Je(n[l])}function sg(l,c){return c>>>=0,l=Fe(l>>>0),c=Fe(c),Je(l[c])}function og(l){9<(l>>>=0)&&(xt[l+1]+=1)}function lg(){return Je([])}function ug(l){l=Fe(l>>>0);for(var c=Array(l.length),p=0;p<l.length;p++)c[p]=l[p];return Je(c)}function dg(l){return Je(an(l>>>0))}function cg(){return Je({})}function hg(l){for(var c=Fe(l>>>=0);c.length;){var p=c.pop();c.pop()(p)}Zn(l)}function pg(l,c,p){c>>>=0,p>>>=0,l=Fe(l>>>0),c=Fe(c),p=Fe(p),l[c]=p}function fg(l,c){return c>>>=0,l=(l=en(l>>>0,"_emval_take_value")).readValueFromPointer(c),Je(l)}function mg(l,c){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),c>>>=0,l=new Date(1e3*l),U()[c>>>2>>>0]=l.getUTCSeconds(),U()[c+4>>>2>>>0]=l.getUTCMinutes(),U()[c+8>>>2>>>0]=l.getUTCHours(),U()[c+12>>>2>>>0]=l.getUTCDate(),U()[c+16>>>2>>>0]=l.getUTCMonth(),U()[c+20>>>2>>>0]=l.getUTCFullYear()-1900,U()[c+24>>>2>>>0]=l.getUTCDay(),l=(l.getTime()-Date.UTC(l.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,U()[c+28>>>2>>>0]=l}var to=l=>l%4==0&&(l%100!=0||l%400==0),io=[0,31,60,91,121,152,182,213,244,274,305,335],no=[0,31,59,90,120,151,181,212,243,273,304,334];function gg(l,c){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),c>>>=0,l=new Date(1e3*l),U()[c>>>2>>>0]=l.getSeconds(),U()[c+4>>>2>>>0]=l.getMinutes(),U()[c+8>>>2>>>0]=l.getHours(),U()[c+12>>>2>>>0]=l.getDate(),U()[c+16>>>2>>>0]=l.getMonth(),U()[c+20>>>2>>>0]=l.getFullYear()-1900,U()[c+24>>>2>>>0]=l.getDay();var p=(to(l.getFullYear())?io:no)[l.getMonth()]+l.getDate()-1|0;U()[c+28>>>2>>>0]=p,U()[c+36>>>2>>>0]=-60*l.getTimezoneOffset(),p=new Date(l.getFullYear(),6,1).getTimezoneOffset();var g=new Date(l.getFullYear(),0,1).getTimezoneOffset();l=0|(p!=g&&l.getTimezoneOffset()==Math.min(g,p)),U()[c+32>>>2>>>0]=l}function yg(l){l>>>=0;var c=new Date(U()[l+20>>>2>>>0]+1900,U()[l+16>>>2>>>0],U()[l+12>>>2>>>0],U()[l+8>>>2>>>0],U()[l+4>>>2>>>0],U()[l>>>2>>>0],0),p=U()[l+32>>>2>>>0],g=c.getTimezoneOffset(),w=new Date(c.getFullYear(),6,1).getTimezoneOffset(),C=new Date(c.getFullYear(),0,1).getTimezoneOffset(),E=Math.min(C,w);return 0>p?U()[l+32>>>2>>>0]=+(w!=C&&E==g):0<p!=(E==g)&&(w=Math.max(C,w),c.setTime(c.getTime()+6e4*((0<p?E:w)-g))),U()[l+24>>>2>>>0]=c.getDay(),p=(to(c.getFullYear())?io:no)[c.getMonth()]+c.getDate()-1|0,U()[l+28>>>2>>>0]=p,U()[l>>>2>>>0]=c.getSeconds(),U()[l+4>>>2>>>0]=c.getMinutes(),U()[l+8>>>2>>>0]=c.getHours(),U()[l+12>>>2>>>0]=c.getDate(),U()[l+16>>>2>>>0]=c.getMonth(),U()[l+20>>>2>>>0]=c.getYear(),l=c.getTime(),BigInt(isNaN(l)?-1:l/1e3)}function ro(l,c,p,g,w,C,E){return d?xe(16,1,l,c,p,g,w,C,E):-52}function ao(l,c,p,g,w,C){if(d)return xe(17,1,l,c,p,g,w,C)}var Si={},_g=()=>performance.timeOrigin+performance.now();function so(l,c){if(d)return xe(18,1,l,c);if(Si[l]&&(clearTimeout(Si[l].id),delete Si[l]),!c)return 0;var p=setTimeout(()=>{delete Si[l],Jn(()=>xo(l,performance.timeOrigin+performance.now()))},c);return Si[l]={id:p,rc:c},0}function bg(l,c,p,g){l>>>=0,c>>>=0,p>>>=0,g>>>=0;var w=new Date().getFullYear(),C=new Date(w,0,1).getTimezoneOffset();w=new Date(w,6,1).getTimezoneOffset();var E=Math.max(C,w);ve()[l>>>2>>>0]=60*E,U()[c>>>2>>>0]=+(C!=w),l=(c=A=>{var L=Math.abs(A);return`UTC${0<=A?"-":"+"}${String(Math.floor(L/60)).padStart(2,"0")}${String(L%60).padStart(2,"0")}`})(C),c=c(w),w<C?(jt(l,p,17),jt(c,g,17)):(jt(l,g,17),jt(c,p,17))}var wg=()=>Date.now();function vg(l,c,p){return 0<=l&&3>=l?(l===0?l=Date.now():l=performance.timeOrigin+performance.now(),q[p>>>0>>>3]=BigInt(Math.round(1e6*l)),0):28}var ir=[],oo=(l,c)=>{ir.length=0;for(var p;p=te()[l++>>>0];){var g=p!=105;c+=(g&=p!=112)&&c%8?4:0,ir.push(p==112?ve()[c>>>2>>>0]:p==106?q[c>>>3]:p==105?U()[c>>>2>>>0]:Ue()[c>>>3>>>0]),c+=g?8:4}return ir};function $g(l,c,p){return l>>>=0,c=oo(c>>>0,p>>>0),ar[l](...c)}function xg(l,c,p){return l>>>=0,c=oo(c>>>0,p>>>0),ar[l](...c)}var Sg=()=>{};function Cg(l,c){return we(Ee(l>>>0,c>>>0))}var Tg=()=>{throw Rt+=1,"unwind"};function Ig(){return 4294901760}var Eg=()=>navigator.hardwareConcurrency;function kg(){return At("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function zg(l){l>>>=0;var c=te().length;if(l<=c||4294901760<l)return!1;for(var p=1;4>=p;p*=2){var g=c*(1+.2/p);g=Math.min(g,l+100663296);e:{g=(Math.min(4294901760,65536*Math.ceil(Math.max(l,g)/65536))-S.buffer.byteLength+65535)/65536|0;try{S.grow(g),_e();var w=1;break e}catch{}w=void 0}if(w)return!0}return!1}var sn=()=>(At("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ci={},lo=l=>{l.forEach(c=>{sn()})};function Mg(){var l=Error().stack.toString().split(`
`);return l[0]=="Error"&&l.shift(),lo(l),Ci.Mb=sn(),Ci.dc=l,Ci.Mb}function Ag(l,c,p){if(l>>>=0,c>>>=0,Ci.Mb==l)var g=Ci.dc;else(g=Error().stack.toString().split(`
`))[0]=="Error"&&g.shift(),lo(g);for(var w=3;g[w]&&sn()!=l;)++w;for(l=0;l<p&&g[l+w];++l)U()[c+4*l>>>2>>>0]=sn();return l}var nr,rr={},uo=()=>{if(!nr){var l,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(l in rr)rr[l]===void 0?delete c[l]:c[l]=rr[l];var p=[];for(l in c)p.push(`${l}=${c[l]}`);nr=p}return nr};function co(l,c){if(d)return xe(19,1,l,c);l>>>=0,c>>>=0;var p,g=0,w=0;for(p of uo()){var C=c+g;ve()[l+w>>>2>>>0]=C,g+=jt(p,C,1/0)+1,w+=4}return 0}function ho(l,c){if(d)return xe(20,1,l,c);l>>>=0,c>>>=0;var p=uo();for(var g of(ve()[l>>>2>>>0]=p.length,l=0,p))l+=Xn(g)+1;return ve()[c>>>2>>>0]=l,0}function po(l){return d?xe(21,1,l):52}function fo(l,c,p,g){return d?xe(22,1,l,c,p,g):52}function mo(l,c,p,g){return d?xe(23,1,l,c,p,g):70}var Rg=[null,[],[]];function go(l,c,p,g){if(d)return xe(24,1,l,c,p,g);c>>>=0,p>>>=0,g>>>=0;for(var w=0,C=0;C<p;C++){var E=ve()[c>>>2>>>0],A=ve()[c+4>>>2>>>0];c+=8;for(var L=0;L<A;L++){var W=l,Z=te()[E+L>>>0],ne=Rg[W];Z===0||Z===10?((W===1?ie:we)(As(ne)),ne.length=0):ne.push(Z)}w+=A}return ve()[g>>>2>>>0]=w,0}d||function(){for(var l=n.numThreads-1;l--;)Es();Wn.push(()=>{Vt++,function(c){d?c():Promise.all(Ot.map(Is)).then(c)}(()=>bs())})}();for(var yo=Array(256),on=0;256>on;++on)yo[on]=String.fromCharCode(on);qs=yo,xt.push(0,1,void 0,1,null,1,!0,1,!1,1),n.count_emval_handles=()=>xt.length/2-5-Kn.length,d||(S=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),_e()),n.wasmBinary&&(v=n.wasmBinary),n.stackSave=()=>dr(),n.stackRestore=l=>un(l),n.stackAlloc=l=>ur(l),n.setValue=function(l,c,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":j()[l>>>0]=c;break;case"i16":ke()[l>>>1>>>0]=c;break;case"i32":U()[l>>>2>>>0]=c;break;case"i64":q[l>>>3]=BigInt(c);break;case"float":Ge()[l>>>2>>>0]=c;break;case"double":Ue()[l>>>3>>>0]=c;break;case"*":ve()[l>>>2>>>0]=c;break;default:At(`invalid type for setValue: ${p}`)}},n.getValue=function(l,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return j()[l>>>0];case"i16":return ke()[l>>>1>>>0];case"i32":return U()[l>>>2>>>0];case"i64":return q[l>>>3];case"float":return Ge()[l>>>2>>>0];case"double":return Ue()[l>>>3>>>0];case"*":return ve()[l>>>2>>>0];default:At(`invalid type for getValue: ${c}`)}},n.UTF8ToString=Ee,n.stringToUTF8=jt,n.lengthBytesUTF8=Xn;var Og=[Vn,xs,ks,Rs,Os,Ds,Bs,Ns,Ps,Ls,Us,Fs,Hs,Ws,Vs,Gs,ro,ao,so,co,ho,po,fo,mo,go],ar={893836:(l,c,p,g,w)=>{if(n===void 0||!n.Fb)return 1;if((l=Ee(Number(l>>>0))).startsWith("./")&&(l=l.substring(2)),!(l=n.Fb.get(l)))return 2;if(c=Number(c>>>0),p=Number(p>>>0),g=Number(g>>>0),c+p>l.byteLength)return 3;try{let C=l.subarray(c,c+p);switch(w){case 0:te().set(C,g>>>0);break;case 1:n.mc?n.mc(g,C):n.cc(g,C);break;default:return 4}return 0}catch{return 4}},894660:(l,c,p)=>{n.Pb(l,te().subarray(c>>>0,c+p>>>0))},894724:()=>n.oc(),894766:l=>{n.Ob(l)},894803:()=>{n.Wb()},894834:()=>{n.Xb()},894863:()=>{n.ac()},894888:l=>n.Vb(l),894921:l=>n.Zb(l),894953:(l,c,p)=>{n.Lb(Number(l),Number(c),Number(p),!0)},895016:(l,c,p)=>{n.Lb(Number(l),Number(c),Number(p))},895073:()=>typeof wasmOffsetConverter<"u",895130:l=>{n.Ab("Abs",l,void 0)},895181:l=>{n.Ab("Neg",l,void 0)},895232:l=>{n.Ab("Floor",l,void 0)},895285:l=>{n.Ab("Ceil",l,void 0)},895337:l=>{n.Ab("Reciprocal",l,void 0)},895395:l=>{n.Ab("Sqrt",l,void 0)},895447:l=>{n.Ab("Exp",l,void 0)},895498:l=>{n.Ab("Erf",l,void 0)},895549:l=>{n.Ab("Sigmoid",l,void 0)},895604:(l,c,p)=>{n.Ab("HardSigmoid",l,{alpha:c,beta:p})},895683:l=>{n.Ab("Log",l,void 0)},895734:l=>{n.Ab("Sin",l,void 0)},895785:l=>{n.Ab("Cos",l,void 0)},895836:l=>{n.Ab("Tan",l,void 0)},895887:l=>{n.Ab("Asin",l,void 0)},895939:l=>{n.Ab("Acos",l,void 0)},895991:l=>{n.Ab("Atan",l,void 0)},896043:l=>{n.Ab("Sinh",l,void 0)},896095:l=>{n.Ab("Cosh",l,void 0)},896147:l=>{n.Ab("Asinh",l,void 0)},896200:l=>{n.Ab("Acosh",l,void 0)},896253:l=>{n.Ab("Atanh",l,void 0)},896306:l=>{n.Ab("Tanh",l,void 0)},896358:l=>{n.Ab("Not",l,void 0)},896409:(l,c,p)=>{n.Ab("Clip",l,{min:c,max:p})},896478:l=>{n.Ab("Clip",l,void 0)},896530:(l,c)=>{n.Ab("Elu",l,{alpha:c})},896588:l=>{n.Ab("Gelu",l,void 0)},896640:l=>{n.Ab("Relu",l,void 0)},896692:(l,c)=>{n.Ab("LeakyRelu",l,{alpha:c})},896756:(l,c)=>{n.Ab("ThresholdedRelu",l,{alpha:c})},896826:(l,c)=>{n.Ab("Cast",l,{to:c})},896884:l=>{n.Ab("Add",l,void 0)},896935:l=>{n.Ab("Sub",l,void 0)},896986:l=>{n.Ab("Mul",l,void 0)},897037:l=>{n.Ab("Div",l,void 0)},897088:l=>{n.Ab("Pow",l,void 0)},897139:l=>{n.Ab("Equal",l,void 0)},897192:l=>{n.Ab("Greater",l,void 0)},897247:l=>{n.Ab("GreaterOrEqual",l,void 0)},897309:l=>{n.Ab("Less",l,void 0)},897361:l=>{n.Ab("LessOrEqual",l,void 0)},897420:(l,c,p,g,w)=>{n.Ab("ReduceMean",l,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},897595:(l,c,p,g,w)=>{n.Ab("ReduceMax",l,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},897769:(l,c,p,g,w)=>{n.Ab("ReduceMin",l,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},897943:(l,c,p,g,w)=>{n.Ab("ReduceProd",l,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},898118:(l,c,p,g,w)=>{n.Ab("ReduceSum",l,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},898292:(l,c,p,g,w)=>{n.Ab("ReduceL1",l,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},898465:(l,c,p,g,w)=>{n.Ab("ReduceL2",l,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},898638:(l,c,p,g,w)=>{n.Ab("ReduceLogSum",l,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},898815:(l,c,p,g,w)=>{n.Ab("ReduceSumSquare",l,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},898995:(l,c,p,g,w)=>{n.Ab("ReduceLogSumExp",l,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},899175:l=>{n.Ab("Where",l,void 0)},899228:(l,c,p)=>{n.Ab("Transpose",l,{perm:c?Array.from(U().subarray(Number(c)>>>0,Number(p)>>>0)):[]})},899352:(l,c,p,g)=>{n.Ab("DepthToSpace",l,{blocksize:c,mode:Ee(p),format:g?"NHWC":"NCHW"})},899485:(l,c,p,g)=>{n.Ab("DepthToSpace",l,{blocksize:c,mode:Ee(p),format:g?"NHWC":"NCHW"})},899618:(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze)=>{n.Ab("ConvTranspose",l,{format:L?"NHWC":"NCHW",autoPad:c,dilations:[p],group:g,kernelShape:[w],pads:[C,E],strides:[A],wIsConst:()=>!!j()[W>>>0],outputPadding:Z?Array.from(U().subarray(Number(Z)>>>0,Number(ne)>>>0)):[],outputShape:de?Array.from(U().subarray(Number(de)>>>0,Number(fe)>>>0)):[],activation:Ee(ze)})},900051:(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe)=>{n.Ab("ConvTranspose",l,{format:A?"NHWC":"NCHW",autoPad:c,dilations:Array.from(U().subarray(Number(p)>>>0,2+(Number(p)>>>0)>>>0)),group:g,kernelShape:Array.from(U().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(U().subarray(Number(C)>>>0,4+(Number(C)>>>0)>>>0)),strides:Array.from(U().subarray(Number(E)>>>0,2+(Number(E)>>>0)>>>0)),wIsConst:()=>!!j()[L>>>0],outputPadding:W?Array.from(U().subarray(Number(W)>>>0,Number(Z)>>>0)):[],outputShape:ne?Array.from(U().subarray(Number(ne)>>>0,Number(de)>>>0)):[],activation:Ee(fe)})},900712:(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze)=>{n.Ab("ConvTranspose",l,{format:L?"NHWC":"NCHW",autoPad:c,dilations:[p],group:g,kernelShape:[w],pads:[C,E],strides:[A],wIsConst:()=>!!j()[W>>>0],outputPadding:Z?Array.from(U().subarray(Number(Z)>>>0,Number(ne)>>>0)):[],outputShape:de?Array.from(U().subarray(Number(de)>>>0,Number(fe)>>>0)):[],activation:Ee(ze)})},901145:(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe)=>{n.Ab("ConvTranspose",l,{format:A?"NHWC":"NCHW",autoPad:c,dilations:Array.from(U().subarray(Number(p)>>>0,2+(Number(p)>>>0)>>>0)),group:g,kernelShape:Array.from(U().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(U().subarray(Number(C)>>>0,4+(Number(C)>>>0)>>>0)),strides:Array.from(U().subarray(Number(E)>>>0,2+(Number(E)>>>0)>>>0)),wIsConst:()=>!!j()[L>>>0],outputPadding:W?Array.from(U().subarray(Number(W)>>>0,Number(Z)>>>0)):[],outputShape:ne?Array.from(U().subarray(Number(ne)>>>0,Number(de)>>>0)):[],activation:Ee(fe)})},901806:(l,c)=>{n.Ab("GlobalAveragePool",l,{format:c?"NHWC":"NCHW"})},901897:(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe)=>{n.Ab("AveragePool",l,{format:fe?"NHWC":"NCHW",auto_pad:c,ceil_mode:p,count_include_pad:g,storage_order:w,dilations:C?Array.from(U().subarray(Number(C)>>>0,Number(E)>>>0)):[],kernel_shape:A?Array.from(U().subarray(Number(A)>>>0,Number(L)>>>0)):[],pads:W?Array.from(U().subarray(Number(W)>>>0,Number(Z)>>>0)):[],strides:ne?Array.from(U().subarray(Number(ne)>>>0,Number(de)>>>0)):[]})},902376:(l,c)=>{n.Ab("GlobalAveragePool",l,{format:c?"NHWC":"NCHW"})},902467:(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe)=>{n.Ab("AveragePool",l,{format:fe?"NHWC":"NCHW",auto_pad:c,ceil_mode:p,count_include_pad:g,storage_order:w,dilations:C?Array.from(U().subarray(Number(C)>>>0,Number(E)>>>0)):[],kernel_shape:A?Array.from(U().subarray(Number(A)>>>0,Number(L)>>>0)):[],pads:W?Array.from(U().subarray(Number(W)>>>0,Number(Z)>>>0)):[],strides:ne?Array.from(U().subarray(Number(ne)>>>0,Number(de)>>>0)):[]})},902946:(l,c)=>{n.Ab("GlobalMaxPool",l,{format:c?"NHWC":"NCHW"})},903033:(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe)=>{n.Ab("MaxPool",l,{format:fe?"NHWC":"NCHW",auto_pad:c,ceil_mode:p,count_include_pad:g,storage_order:w,dilations:C?Array.from(U().subarray(Number(C)>>>0,Number(E)>>>0)):[],kernel_shape:A?Array.from(U().subarray(Number(A)>>>0,Number(L)>>>0)):[],pads:W?Array.from(U().subarray(Number(W)>>>0,Number(Z)>>>0)):[],strides:ne?Array.from(U().subarray(Number(ne)>>>0,Number(de)>>>0)):[]})},903508:(l,c)=>{n.Ab("GlobalMaxPool",l,{format:c?"NHWC":"NCHW"})},903595:(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe)=>{n.Ab("MaxPool",l,{format:fe?"NHWC":"NCHW",auto_pad:c,ceil_mode:p,count_include_pad:g,storage_order:w,dilations:C?Array.from(U().subarray(Number(C)>>>0,Number(E)>>>0)):[],kernel_shape:A?Array.from(U().subarray(Number(A)>>>0,Number(L)>>>0)):[],pads:W?Array.from(U().subarray(Number(W)>>>0,Number(Z)>>>0)):[],strides:ne?Array.from(U().subarray(Number(ne)>>>0,Number(de)>>>0)):[]})},904070:(l,c,p,g,w)=>{n.Ab("Gemm",l,{alpha:c,beta:p,transA:g,transB:w})},904174:l=>{n.Ab("MatMul",l,void 0)},904228:(l,c,p,g)=>{n.Ab("ArgMax",l,{keepDims:!!c,selectLastIndex:!!p,axis:g})},904336:(l,c,p,g)=>{n.Ab("ArgMin",l,{keepDims:!!c,selectLastIndex:!!p,axis:g})},904444:(l,c)=>{n.Ab("Softmax",l,{axis:c})},904507:(l,c)=>{n.Ab("Concat",l,{axis:c})},904567:(l,c,p,g,w)=>{n.Ab("Split",l,{axis:c,numOutputs:p,splitSizes:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},904723:l=>{n.Ab("Expand",l,void 0)},904777:(l,c)=>{n.Ab("Gather",l,{axis:Number(c)})},904848:(l,c)=>{n.Ab("GatherElements",l,{axis:Number(c)})},904927:(l,c)=>{n.Ab("GatherND",l,{batch_dims:Number(c)})},905006:(l,c,p,g,w,C,E,A,L,W,Z)=>{n.Ab("Resize",l,{antialias:c,axes:p?Array.from(U().subarray(Number(p)>>>0,Number(g)>>>0)):[],coordinateTransformMode:Ee(w),cubicCoeffA:C,excludeOutside:E,extrapolationValue:A,keepAspectRatioPolicy:Ee(L),mode:Ee(W),nearestMode:Ee(Z)})},905368:(l,c,p,g,w,C,E)=>{n.Ab("Slice",l,{starts:c?Array.from(U().subarray(Number(c)>>>0,Number(p)>>>0)):[],ends:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[],axes:C?Array.from(U().subarray(Number(C)>>>0,Number(E)>>>0)):[]})},905632:l=>{n.Ab("Tile",l,void 0)},905684:(l,c,p)=>{n.Ab("InstanceNormalization",l,{epsilon:c,format:p?"NHWC":"NCHW"})},905798:(l,c,p)=>{n.Ab("InstanceNormalization",l,{epsilon:c,format:p?"NHWC":"NCHW"})},905912:l=>{n.Ab("Range",l,void 0)},905965:(l,c)=>{n.Ab("Einsum",l,{equation:Ee(c)})},906046:(l,c,p,g,w)=>{n.Ab("Pad",l,{mode:c,value:p,pads:g?Array.from(U().subarray(Number(g)>>>0,Number(w)>>>0)):[]})},906189:(l,c,p,g,w,C)=>{n.Ab("BatchNormalization",l,{epsilon:c,momentum:p,spatial:!!w,trainingMode:!!g,format:C?"NHWC":"NCHW"})},906358:(l,c,p,g,w,C)=>{n.Ab("BatchNormalization",l,{epsilon:c,momentum:p,spatial:!!w,trainingMode:!!g,format:C?"NHWC":"NCHW"})},906527:(l,c,p)=>{n.Ab("CumSum",l,{exclusive:Number(c),reverse:Number(p)})},906624:(l,c,p)=>{n.Ab("DequantizeLinear",l,{axis:c,blockSize:p})},906714:(l,c,p,g,w)=>{n.Ab("GridSample",l,{align_corners:c,mode:Ee(p),padding_mode:Ee(g),format:w?"NHWC":"NCHW"})},906884:(l,c,p,g,w)=>{n.Ab("GridSample",l,{align_corners:c,mode:Ee(p),padding_mode:Ee(g),format:w?"NHWC":"NCHW"})},907054:(l,c)=>{n.Ab("ScatterND",l,{reduction:Ee(c)})},907139:(l,c,p,g,w,C,E,A,L)=>{n.Ab("Attention",l,{numHeads:c,isUnidirectional:p,maskFilterValue:g,scale:w,doRotary:C,qkvHiddenSizes:E?Array.from(U().subarray(Number(A)>>>0,Number(A)+E>>>0)):[],pastPresentShareBuffer:!!L})},907411:l=>{n.Ab("BiasAdd",l,void 0)},907466:l=>{n.Ab("BiasSplitGelu",l,void 0)},907527:l=>{n.Ab("FastGelu",l,void 0)},907583:(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je)=>{n.Ab("Conv",l,{format:ne?"NHWC":"NCHW",auto_pad:c,dilations:p?Array.from(U().subarray(Number(p)>>>0,Number(g)>>>0)):[],group:w,kernel_shape:C?Array.from(U().subarray(Number(C)>>>0,Number(E)>>>0)):[],pads:A?Array.from(U().subarray(Number(A)>>>0,Number(L)>>>0)):[],strides:W?Array.from(U().subarray(Number(W)>>>0,Number(Z)>>>0)):[],w_is_const:()=>!!j()[Number(de)>>>0],activation:Ee(fe),activation_params:ze?Array.from(Ge().subarray(Number(ze)>>>0,Number(je)>>>0)):[]})},908167:l=>{n.Ab("Gelu",l,void 0)},908219:(l,c,p,g,w,C,E,A,L)=>{n.Ab("GroupQueryAttention",l,{numHeads:c,kvNumHeads:p,scale:g,softcap:w,doRotary:C,rotaryInterleaved:E,smoothSoftmax:A,localWindowSize:L})},908436:(l,c,p,g)=>{n.Ab("LayerNormalization",l,{axis:c,epsilon:p,simplified:!!g})},908547:(l,c,p,g)=>{n.Ab("LayerNormalization",l,{axis:c,epsilon:p,simplified:!!g})},908658:(l,c,p,g,w,C)=>{n.Ab("MatMulNBits",l,{k:c,n:p,accuracyLevel:g,bits:w,blockSize:C})},908785:(l,c,p,g,w,C)=>{n.Ab("MultiHeadAttention",l,{numHeads:c,isUnidirectional:p,maskFilterValue:g,scale:w,doRotary:C})},908944:(l,c)=>{n.Ab("QuickGelu",l,{alpha:c})},909008:(l,c,p,g,w)=>{n.Ab("RotaryEmbedding",l,{interleaved:!!c,numHeads:p,rotaryEmbeddingDim:g,scale:w})},909147:(l,c,p)=>{n.Ab("SkipLayerNormalization",l,{epsilon:c,simplified:!!p})},909249:(l,c,p)=>{n.Ab("SkipLayerNormalization",l,{epsilon:c,simplified:!!p})},909351:(l,c,p,g)=>{n.Ab("GatherBlockQuantized",l,{gatherAxis:c,quantizeAxis:p,blockSize:g})},909472:l=>{n.$b(l)},909506:(l,c)=>n.bc(Number(l),Number(c),n.Gb.ec,n.Gb.errors)};function Dg(l,c,p){return Qs(async()=>{await n.Yb(Number(l),Number(c),Number(p))})}function Bg(){return typeof wasmOffsetConverter<"u"}var D=await async function(){function l(g,w){return D=g.exports,D=function(){var C=D,E={};for(let[A,L]of Object.entries(C))E[A]=typeof L=="function"?(...W)=>{nn.push(A);try{return L(...W)}finally{N||(nn.pop(),pt&&Bt===1&&nn.length===0&&(Bt=0,Rt+=1,tn(Eo),typeof Fibers<"u"&&Fibers.sc()))}}:L;return E}(),D=function(){var C=D,E=L=>W=>L(W)>>>0,A=L=>()=>L()>>>0;return(C=Object.assign({},C)).Ea=E(C.Ea),C.gb=A(C.gb),C.ib=E(C.ib),C.tb=E(C.tb),C.ub=A(C.ub),C.__cxa_get_exception_ptr=E(C.__cxa_get_exception_ptr),C}(),Ss.push(D.jb),T=w,bs(),D}Vt++;var c=ws();if(n.instantiateWasm)return new Promise(g=>{n.instantiateWasm(c,(w,C)=>{g(l(w,C))})});if(d)return new Promise(g=>{X=w=>{var C=new WebAssembly.Instance(w,ws());g(l(C,w))}});qe??(qe=n.locateFile?n.locateFile?n.locateFile("ort-wasm-simd-threaded.jsep.wasm",$):$+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep-BGTZ4Y7F.wasm",import.meta.url).href,import.meta.url).href);try{var p=await async function(g){var w=qe;if(!v&&typeof WebAssembly.instantiateStreaming=="function"&&!V(w))try{var C=fetch(w,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(C,g)}catch(E){we(`wasm streaming compile failed: ${E}`),we("falling back to ArrayBuffer instantiation")}return async function(E,A){try{var L=await async function(W){if(!v)try{var Z=await y(W);return new Uint8Array(Z)}catch{}if(W==qe&&v)W=new Uint8Array(v);else{if(!_)throw"both async and sync fetching of the wasm failed";W=_(W)}return W}(E);return await WebAssembly.instantiate(L,A)}catch(W){we(`failed to asynchronously prepare wasm: ${W}`),At(W)}}(w,g)}(c);return l(p.instance,p.module)}catch(g){return a(g),Promise.reject(g)}}(),_o=l=>(_o=D.Ea)(l),bo=()=>(bo=D.Fa)();n._OrtInit=(l,c)=>(n._OrtInit=D.Ga)(l,c),n._OrtGetLastError=(l,c)=>(n._OrtGetLastError=D.Ha)(l,c),n._OrtCreateSessionOptions=(l,c,p,g,w,C,E,A,L,W)=>(n._OrtCreateSessionOptions=D.Ia)(l,c,p,g,w,C,E,A,L,W),n._OrtAppendExecutionProvider=(l,c,p,g,w)=>(n._OrtAppendExecutionProvider=D.Ja)(l,c,p,g,w),n._OrtAddFreeDimensionOverride=(l,c,p)=>(n._OrtAddFreeDimensionOverride=D.Ka)(l,c,p),n._OrtAddSessionConfigEntry=(l,c,p)=>(n._OrtAddSessionConfigEntry=D.La)(l,c,p),n._OrtReleaseSessionOptions=l=>(n._OrtReleaseSessionOptions=D.Ma)(l),n._OrtCreateSession=(l,c,p)=>(n._OrtCreateSession=D.Na)(l,c,p),n._OrtReleaseSession=l=>(n._OrtReleaseSession=D.Oa)(l),n._OrtGetInputOutputCount=(l,c,p)=>(n._OrtGetInputOutputCount=D.Pa)(l,c,p),n._OrtGetInputOutputMetadata=(l,c,p,g)=>(n._OrtGetInputOutputMetadata=D.Qa)(l,c,p,g),n._OrtFree=l=>(n._OrtFree=D.Ra)(l),n._OrtCreateTensor=(l,c,p,g,w,C)=>(n._OrtCreateTensor=D.Sa)(l,c,p,g,w,C),n._OrtGetTensorData=(l,c,p,g,w)=>(n._OrtGetTensorData=D.Ta)(l,c,p,g,w),n._OrtReleaseTensor=l=>(n._OrtReleaseTensor=D.Ua)(l),n._OrtCreateRunOptions=(l,c,p,g)=>(n._OrtCreateRunOptions=D.Va)(l,c,p,g),n._OrtAddRunConfigEntry=(l,c,p)=>(n._OrtAddRunConfigEntry=D.Wa)(l,c,p),n._OrtReleaseRunOptions=l=>(n._OrtReleaseRunOptions=D.Xa)(l),n._OrtCreateBinding=l=>(n._OrtCreateBinding=D.Ya)(l),n._OrtBindInput=(l,c,p)=>(n._OrtBindInput=D.Za)(l,c,p),n._OrtBindOutput=(l,c,p,g)=>(n._OrtBindOutput=D._a)(l,c,p,g),n._OrtClearBoundOutputs=l=>(n._OrtClearBoundOutputs=D.$a)(l),n._OrtReleaseBinding=l=>(n._OrtReleaseBinding=D.ab)(l),n._OrtRunWithBinding=(l,c,p,g,w)=>(n._OrtRunWithBinding=D.bb)(l,c,p,g,w),n._OrtRun=(l,c,p,g,w,C,E,A)=>(n._OrtRun=D.cb)(l,c,p,g,w,C,E,A),n._OrtEndProfiling=l=>(n._OrtEndProfiling=D.db)(l),n._JsepOutput=(l,c,p)=>(n._JsepOutput=D.eb)(l,c,p),n._JsepGetNodeName=l=>(n._JsepGetNodeName=D.fb)(l);var sr=()=>(sr=D.gb)(),St=n._free=l=>(St=n._free=D.hb)(l),ln=n._malloc=l=>(ln=n._malloc=D.ib)(l),or=(l,c,p,g,w,C)=>(or=D.kb)(l,c,p,g,w,C),wo=()=>(wo=D.lb)(),vo=(l,c,p,g,w)=>(vo=D.mb)(l,c,p,g,w),$o=l=>($o=D.nb)(l),lr=l=>(lr=D.ob)(l),xo=(l,c)=>(xo=D.pb)(l,c),So=()=>(So=D.qb)(),Co=(l,c)=>(Co=D.rb)(l,c),un=l=>(un=D.sb)(l),ur=l=>(ur=D.tb)(l),dr=()=>(dr=D.ub)(),To=n.dynCall_ii=(l,c)=>(To=n.dynCall_ii=D.vb)(l,c);n.dynCall_vii=(l,c,p)=>(n.dynCall_vii=D.dynCall_vii)(l,c,p),n.dynCall_iiiii=(l,c,p,g,w)=>(n.dynCall_iiiii=D.dynCall_iiiii)(l,c,p,g,w),n.dynCall_iii=(l,c,p)=>(n.dynCall_iii=D.dynCall_iii)(l,c,p),n.dynCall_iiiiii=(l,c,p,g,w,C)=>(n.dynCall_iiiiii=D.dynCall_iiiiii)(l,c,p,g,w,C),n.dynCall_iiiiiiii=(l,c,p,g,w,C,E,A)=>(n.dynCall_iiiiiiii=D.dynCall_iiiiiiii)(l,c,p,g,w,C,E,A),n.dynCall_iiiiiii=(l,c,p,g,w,C,E)=>(n.dynCall_iiiiiii=D.dynCall_iiiiiii)(l,c,p,g,w,C,E),n.dynCall_vi=(l,c)=>(n.dynCall_vi=D.dynCall_vi)(l,c),n.dynCall_iiii=(l,c,p,g)=>(n.dynCall_iiii=D.dynCall_iiii)(l,c,p,g),n.dynCall_i=l=>(n.dynCall_i=D.dynCall_i)(l),n.dynCall_viiiiiiii=(l,c,p,g,w,C,E,A,L)=>(n.dynCall_viiiiiiii=D.dynCall_viiiiiiii)(l,c,p,g,w,C,E,A,L),n.dynCall_viii=(l,c,p,g)=>(n.dynCall_viii=D.dynCall_viii)(l,c,p,g),n.dynCall_viijj=(l,c,p,g,w)=>(n.dynCall_viijj=D.dynCall_viijj)(l,c,p,g,w),n.dynCall_viiiiii=(l,c,p,g,w,C,E)=>(n.dynCall_viiiiii=D.dynCall_viiiiii)(l,c,p,g,w,C,E),n.dynCall_viiii=(l,c,p,g,w)=>(n.dynCall_viiii=D.dynCall_viiii)(l,c,p,g,w),n.dynCall_viiiii=(l,c,p,g,w,C)=>(n.dynCall_viiiii=D.dynCall_viiiii)(l,c,p,g,w,C),n.dynCall_vfiii=(l,c,p,g,w)=>(n.dynCall_vfiii=D.dynCall_vfiii)(l,c,p,g,w),n.dynCall_viiiiff=(l,c,p,g,w,C,E)=>(n.dynCall_viiiiff=D.dynCall_viiiiff)(l,c,p,g,w,C,E),n.dynCall_viiiiiff=(l,c,p,g,w,C,E,A)=>(n.dynCall_viiiiiff=D.dynCall_viiiiiff)(l,c,p,g,w,C,E,A),n.dynCall_ffff=(l,c,p,g)=>(n.dynCall_ffff=D.dynCall_ffff)(l,c,p,g),n.dynCall_viiff=(l,c,p,g,w)=>(n.dynCall_viiff=D.dynCall_viiff)(l,c,p,g,w),n.dynCall_fffffff=(l,c,p,g,w,C,E)=>(n.dynCall_fffffff=D.dynCall_fffffff)(l,c,p,g,w,C,E),n.dynCall_jjjjjjj=(l,c,p,g,w,C,E)=>(n.dynCall_jjjjjjj=D.dynCall_jjjjjjj)(l,c,p,g,w,C,E),n.dynCall_jjjjjj=(l,c,p,g,w,C)=>(n.dynCall_jjjjjj=D.dynCall_jjjjjj)(l,c,p,g,w,C),n.dynCall_iijjii=(l,c,p,g,w,C)=>(n.dynCall_iijjii=D.dynCall_iijjii)(l,c,p,g,w,C),n.dynCall_viiiiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe)=>(n.dynCall_viiiiiiiiiiiii=D.dynCall_viiiiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe),n.dynCall_viiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z)=>(n.dynCall_viiiiiiiiii=D.dynCall_viiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z),n.dynCall_viiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z,ne)=>(n.dynCall_viiiiiiiiiii=D.dynCall_viiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z,ne),n.dynCall_viiiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z,ne,de)=>(n.dynCall_viiiiiiiiiiii=D.dynCall_viiiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z,ne,de),n.dynCall_viiiiiiiiiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je,Ct,Kt,Ti)=>(n.dynCall_viiiiiiiiiiiiiiiiii=D.dynCall_viiiiiiiiiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je,Ct,Kt,Ti),n.dynCall_viiiiiiiii=(l,c,p,g,w,C,E,A,L,W)=>(n.dynCall_viiiiiiiii=D.dynCall_viiiiiiiii)(l,c,p,g,w,C,E,A,L,W),n.dynCall_viiiiiiiiiiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je,Ct,Kt,Ti,cr)=>(n.dynCall_viiiiiiiiiiiiiiiiiii=D.dynCall_viiiiiiiiiiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je,Ct,Kt,Ti,cr),n.dynCall_viiiiiii=(l,c,p,g,w,C,E,A)=>(n.dynCall_viiiiiii=D.dynCall_viiiiiii)(l,c,p,g,w,C,E,A),n.dynCall_viiiiiiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je)=>(n.dynCall_viiiiiiiiiiiiiii=D.dynCall_viiiiiiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je),n.dynCall_jiji=(l,c,p,g)=>(n.dynCall_jiji=D.dynCall_jiji)(l,c,p,g),n.dynCall_v=l=>(n.dynCall_v=D.dynCall_v)(l),n.dynCall_iidiiii=(l,c,p,g,w,C,E)=>(n.dynCall_iidiiii=D.dynCall_iidiiii)(l,c,p,g,w,C,E),n.dynCall_iiiiiiiii=(l,c,p,g,w,C,E,A,L)=>(n.dynCall_iiiiiiiii=D.dynCall_iiiiiiiii)(l,c,p,g,w,C,E,A,L),n.dynCall_iiij=(l,c,p,g)=>(n.dynCall_iiij=D.dynCall_iiij)(l,c,p,g),n.dynCall_iiiiiiiiii=(l,c,p,g,w,C,E,A,L,W)=>(n.dynCall_iiiiiiiiii=D.dynCall_iiiiiiiiii)(l,c,p,g,w,C,E,A,L,W),n.dynCall_iiiiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z,ne,de)=>(n.dynCall_iiiiiiiiiiiii=D.dynCall_iiiiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z,ne,de),n.dynCall_iiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z)=>(n.dynCall_iiiiiiiiiii=D.dynCall_iiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z),n.dynCall_ji=(l,c)=>(n.dynCall_ji=D.dynCall_ji)(l,c),n.dynCall_iijii=(l,c,p,g,w)=>(n.dynCall_iijii=D.dynCall_iijii)(l,c,p,g,w),n.dynCall_vij=(l,c,p)=>(n.dynCall_vij=D.dynCall_vij)(l,c,p),n.dynCall_viiijii=(l,c,p,g,w,C,E)=>(n.dynCall_viiijii=D.dynCall_viiijii)(l,c,p,g,w,C,E),n.dynCall_viijiiiiiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je,Ct,Kt)=>(n.dynCall_viijiiiiiiiiiiiiii=D.dynCall_viijiiiiiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je,Ct,Kt),n.dynCall_viiiji=(l,c,p,g,w,C)=>(n.dynCall_viiiji=D.dynCall_viiiji)(l,c,p,g,w,C),n.dynCall_fiii=(l,c,p,g)=>(n.dynCall_fiii=D.dynCall_fiii)(l,c,p,g),n.dynCall_viijii=(l,c,p,g,w,C)=>(n.dynCall_viijii=D.dynCall_viijii)(l,c,p,g,w,C),n.dynCall_viij=(l,c,p,g)=>(n.dynCall_viij=D.dynCall_viij)(l,c,p,g),n.dynCall_jiij=(l,c,p,g)=>(n.dynCall_jiij=D.dynCall_jiij)(l,c,p,g),n.dynCall_fi=(l,c)=>(n.dynCall_fi=D.dynCall_fi)(l,c),n.dynCall_fii=(l,c,p)=>(n.dynCall_fii=D.dynCall_fii)(l,c,p),n.dynCall_jii=(l,c,p)=>(n.dynCall_jii=D.dynCall_jii)(l,c,p),n.dynCall_dii=(l,c,p)=>(n.dynCall_dii=D.dynCall_dii)(l,c,p),n.dynCall_fiiii=(l,c,p,g,w)=>(n.dynCall_fiiii=D.dynCall_fiiii)(l,c,p,g,w),n.dynCall_fif=(l,c,p)=>(n.dynCall_fif=D.dynCall_fif)(l,c,p),n.dynCall_jfi=(l,c,p)=>(n.dynCall_jfi=D.dynCall_jfi)(l,c,p),n.dynCall_viiiiiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze)=>(n.dynCall_viiiiiiiiiiiiii=D.dynCall_viiiiiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze),n.dynCall_viiiiiiiiiiiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je,Ct,Kt,Ti,cr,Ng)=>(n.dynCall_viiiiiiiiiiiiiiiiiiii=D.dynCall_viiiiiiiiiiiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je,Ct,Kt,Ti,cr,Ng),n.dynCall_viiiiiiiiiiiiiiii=(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je,Ct)=>(n.dynCall_viiiiiiiiiiiiiiii=D.dynCall_viiiiiiiiiiiiiiii)(l,c,p,g,w,C,E,A,L,W,Z,ne,de,fe,ze,je,Ct),n.dynCall_iif=(l,c,p)=>(n.dynCall_iif=D.dynCall_iif)(l,c,p),n.dynCall_jiiii=(l,c,p,g,w)=>(n.dynCall_jiiii=D.dynCall_jiiii)(l,c,p,g,w),n.dynCall_jiii=(l,c,p,g)=>(n.dynCall_jiii=D.dynCall_jiii)(l,c,p,g),n.dynCall_viif=(l,c,p,g)=>(n.dynCall_viif=D.dynCall_viif)(l,c,p,g),n.dynCall_viiij=(l,c,p,g,w)=>(n.dynCall_viiij=D.dynCall_viiij)(l,c,p,g,w),n.dynCall_viiiijii=(l,c,p,g,w,C,E,A)=>(n.dynCall_viiiijii=D.dynCall_viiiijii)(l,c,p,g,w,C,E,A),n.dynCall_iiiiij=(l,c,p,g,w,C)=>(n.dynCall_iiiiij=D.dynCall_iiiiij)(l,c,p,g,w,C),n.dynCall_iiiiid=(l,c,p,g,w,C)=>(n.dynCall_iiiiid=D.dynCall_iiiiid)(l,c,p,g,w,C),n.dynCall_iiiiijj=(l,c,p,g,w,C,E)=>(n.dynCall_iiiiijj=D.dynCall_iiiiijj)(l,c,p,g,w,C,E),n.dynCall_iiiiiijj=(l,c,p,g,w,C,E,A)=>(n.dynCall_iiiiiijj=D.dynCall_iiiiiijj)(l,c,p,g,w,C,E,A);var Io=l=>(Io=D.wb)(l),Eo=()=>(Eo=D.xb)(),ko=l=>(ko=D.yb)(l),zo=()=>(zo=D.zb)();return function l(){if(0<Vt)Gt=l;else if(d)r(n),Se();else{for(;0<Wn.length;)Wn.shift()(n);0<Vt?Gt=l:(n.calledRun=!0,N||(Se(),r(n)))}}(),n.PTR_SIZE=4,s},Hc=yr,Ro=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),Ro&&yr()}),_r,ba,Oo,Ke,Wc,cn,Do,Bo,br,No,wr,Vc,vr,Gc,Va=H(()=>{Wa(),_r=typeof location>"u"?void 0:location.origin,ba=import.meta.url>"file:"&&import.meta.url<"file;",Oo=()=>{{if(ba){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,_r).href}return import.meta.url}},Ke=Oo(),Wc=()=>{if(Ke&&!Ke.startsWith("blob:"))return Ke.substring(0,Ke.lastIndexOf("/")+1)},cn=(e,t)=>{try{let i=t??Ke;return(i?new URL(e,i):new URL(e)).origin===_r}catch{return!1}},Do=(e,t)=>{let i=t??Ke;try{return(i?new URL(e,i):new URL(e)).href}catch{return}},Bo=(e,t)=>`${t??"./"}${e}`,br=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},No=async e=>(await import(e)).default,wr=(s0(),Zi(Lc)).default,Vc=async()=>{if(!Ke)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(cn(Ke))return[void 0,wr()];let e=await br(Ke);return[e,wr(e)]},vr=(o0(),Zi(Fc)).default,Gc=async(e,t,i,r)=>{let a=vr&&!(e||t);if(a)if(Ke)a=cn(Ke);else if(r&&!i)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,vr];{let n="ort-wasm-simd-threaded.jsep.mjs",s=e??Do(n,t),o=i&&s&&!cn(s,t),u=o?await br(s):s??Bo(n,t);return[o?u:void 0,await No(u)]}}}),$r,hn,Ei,xr,Po,Lo,Uo,Ga,$e,di=H(()=>{Va(),hn=!1,Ei=!1,xr=!1,Po=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Lo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Uo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ga=async e=>{if(hn)return Promise.resolve();if(Ei)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(xr)throw new Error("previous call to 'initializeWebAssembly()' failed.");Ei=!0;let t=e.initTimeout,i=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Uo())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Lo())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=Po();i>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=i=1);let a=e.wasmPaths,n=typeof a=="string"?a:void 0,s=a==null?void 0:a.mjs,o=(s==null?void 0:s.href)??s,u=a==null?void 0:a.wasm,d=(u==null?void 0:u.href)??u,h=e.wasmBinary,[f,m]=await Gc(o,n,i>1,!!h||!!d),y=!1,_=[];if(t>0&&_.push(new Promise(b=>{setTimeout(()=>{y=!0,b()},t)})),_.push(new Promise((b,x)=>{let $={numThreads:i};if(h)$.wasmBinary=h;else if(d||n)$.locateFile=v=>d??n+v;else if(o&&o.indexOf("blob:")!==0)$.locateFile=v=>new URL(v,o).href;else if(f){let v=Wc();v&&($.locateFile=S=>v+S)}m($).then(v=>{Ei=!1,hn=!0,$r=v,b(),f&&URL.revokeObjectURL(f)},v=>{Ei=!1,xr=!0,x(v)})})),await Promise.race(_),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},$e=()=>{if(hn&&$r)return $r;throw new Error("WebAssembly is not initialized yet.")}}),lt,Rn,be,qa=H(()=>{di(),lt=(e,t)=>{let i=$e(),r=i.lengthBytesUTF8(e)+1,a=i._malloc(r);return i.stringToUTF8(e,a,r),t.push(a),a},Rn=(e,t,i,r)=>{if(typeof e=="object"&&e!==null){if(i.has(e))throw new Error("Circular reference in options");i.add(e)}Object.entries(e).forEach(([a,n])=>{let s=t?t+a:a;if(typeof n=="object")Rn(n,s+".",i,r);else if(typeof n=="string"||typeof n=="number")r(s,n.toString());else if(typeof n=="boolean")r(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},be=e=>{let t=$e(),i=t.stackSave();try{let r=t.PTR_SIZE,a=t.stackAlloc(2*r);t._OrtGetLastError(a,a+r);let n=Number(t.getValue(a,r===4?"i32":"i64")),s=t.getValue(a+r,"*"),o=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(i)}}}),qc,l0=H(()=>{di(),qa(),qc=e=>{let t=$e(),i=0,r=[],a=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(a.terminate=!1);let n=0;return(e==null?void 0:e.tag)!==void 0&&(n=lt(e.tag,r)),i=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,n),i===0&&be("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Rn(e.extra,"",new WeakSet,(s,o)=>{let u=lt(s,r),d=lt(o,r);t._OrtAddRunConfigEntry(i,u,d)!==0&&be(`Can't set a run config entry: ${s} - ${o}.`)}),[i,r]}catch(n){throw i!==0&&t._OrtReleaseRunOptions(i),r.forEach(s=>t._free(s)),n}}}),Fo,Ho,Wo,ki,Vo,jc,u0=H(()=>{di(),qa(),Fo=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Ho=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Wo=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(i=>(typeof i=="string"?i:i.name)==="webgpu")&&(e.enableMemPattern=!1)},ki=(e,t,i,r)=>{let a=lt(t,r),n=lt(i,r);$e()._OrtAddSessionConfigEntry(e,a,n)!==0&&be(`Can't set a session config entry: ${t} - ${i}.`)},Vo=async(e,t,i)=>{for(let r of t){let a=typeof r=="string"?r:r.name,n=[];switch(a){case"webnn":if(a="WEBNN",typeof r!="string"){let h=r==null?void 0:r.deviceType;h&&ki(e,"deviceType",h,i)}break;case"webgpu":if(a="JS",typeof r!="string"){let h=r;if(h!=null&&h.preferredLayout){if(h.preferredLayout!=="NCHW"&&h.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${h.preferredLayout}`);ki(e,"preferredLayout",h.preferredLayout,i)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let s=lt(a,i),o=n.length,u=0,d=0;if(o>0){u=$e()._malloc(o*$e().PTR_SIZE),i.push(u),d=$e()._malloc(o*$e().PTR_SIZE),i.push(d);for(let h=0;h<o;h++)$e().setValue(u+h*$e().PTR_SIZE,n[h][0],"*"),$e().setValue(d+h*$e().PTR_SIZE,n[h][1],"*")}await $e()._OrtAppendExecutionProvider(e,s,u,d,o)!==0&&be(`Can't append execution provider: ${a}.`)}},jc=async e=>{let t=$e(),i=0,r=[],a=e||{};Wo(a);try{let n=Fo(a.graphOptimizationLevel??"all"),s=Ho(a.executionMode??"sequential"),o=typeof a.logId=="string"?lt(a.logId,r):0,u=a.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log severity level is not valid: ${u}`);let d=a.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let h=typeof a.optimizedModelFilePath=="string"?lt(a.optimizedModelFilePath,r):0;if(i=t._OrtCreateSessionOptions(n,!!a.enableCpuMemArena,!!a.enableMemPattern,s,!!a.enableProfiling,0,o,u,d,h),i===0&&be("Can't create session options."),a.executionProviders&&await Vo(i,a.executionProviders,r),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);ki(i,"enableGraphCapture",a.enableGraphCapture.toString(),r)}if(a.freeDimensionOverrides)for(let[f,m]of Object.entries(a.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let y=lt(f,r);t._OrtAddFreeDimensionOverride(i,y,m)!==0&&be(`Can't set a free dimension override: ${f} - ${m}.`)}return a.extra!==void 0&&Rn(a.extra,"",new WeakSet,(f,m)=>{ki(i,f,m,r)}),[i,r]}catch(n){throw i!==0&&t._OrtReleaseSessionOptions(i)!==0&&be("Can't release session options."),r.forEach(s=>t._free(s)),n}}}),ii,zt,ni,Fn,On,ja,Ka,wa,re=H(()=>{ii=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},zt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},ni=(e,t)=>{let i=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((a,n)=>a*n,1);return i>0?Math.ceil(r*i):void 0},Fn=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},On=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},ja=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ka=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",wa=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Za,Kc=H(()=>{Wa(),Za=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let i=t.headers.get("Content-Length"),r=i?parseInt(i,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),n;try{n=new ArrayBuffer(r)}catch(o){if(o instanceof RangeError){let u=Math.ceil(r/65536);n=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw o}let s=0;for(;;){let{done:o,value:u}=await a.read();if(o)break;let d=u.byteLength;new Uint8Array(n,s,d).set(u),s+=d}return new Uint8Array(n,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Go,qo,jo,Ko,Ya,Zo,he,Mt=H(()=>{re(),Go=["V","I","W","E","F"],qo=(e,t)=>{console.log(`[${Go[e]},${new Date().toISOString()}]${t}`)},Ya=(e,t)=>{jo=e,Ko=t},Zo=(e,t)=>{let i=On(e),r=On(jo);i>=r&&qo(i,typeof t=="function"?t():t)},he=(...e)=>{Ko&&Zo(...e)}}),Yo,bi,R,Dn,Zc,Yc,Xc,se=H(()=>{Yo=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},bi=class{static calcShape(e,t,i=!1){let r=e.length,a=t.length;if(r===0)return t;if(a===0)return e;let n=Math.max(e.length,t.length),s=new Array(n);if(i){if(r<2||a<2)return;let o=Yo.calcMatMulShape([e[r-2],e[r-1]],[t[a-2],t[a-1]]);if(o===void 0)return;[s[n-2],s[n-1]]=o}for(let o=i?3:1;o<=n;o++){let u=r-o<0?1:e[r-o],d=a-o<0?1:t[a-o];if(u!==d&&u>1&&d>1)return;let h=Math.max(u,d);if(u&&d)s[n-o]=Math.max(u,d);else{if(h>1)return;s[n-o]=0}}return s}static isValidBroadcast(e,t){let i=e.length,r=t.length;if(i>r)return!1;for(let a=1;a<=i;a++)if(e[i-a]!==1&&e[i-a]!==t[r-a])return!1;return!0}},R=class En{static size(t){return En.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,i=4){let r=t.length;if(r===0)return[];let a=new Array(r),n=r-1;for(;n>=0;){if(t[n]%i===0){a[n]=t[n]/i;break}if(i%t[n]!==0)throw new Error("cannot convert shape");a[n]=1,i/=t[n],n--}for(n--;n>=0;n--)a[n]=t[n];return a}static sizeFromDimension(t,i){if(i<0||i>t.length)throw new Error(`invalid dimension of ${i} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return En.getSizeFromDimensionRange(t,i,t.length)}static sizeToDimension(t,i){if(i<0||i>t.length)throw new Error(`invalid dimension of ${i} for sizeToDimension as Tensor has ${t.length} dimensions.`);return En.getSizeFromDimensionRange(t,0,i)}static getSizeFromDimensionRange(t,i,r){let a=1;for(let n=i;n<r;n++){if(t[n]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[n])}return a}static computeStrides(t){let i=t.length;if(i===0)return[];if(i===1)return[1];let r=new Array(i);r[i-1]=1,r[i-2]=t[i-1];for(let a=i-3;a>=0;--a)r[a]=r[a+1]*t[a+1];return r}static normalizeAxis(t,i){if(t<-i&&t>=i)throw new Error("unsupported axis for this operation.");return t<0?t+i:t}static normalizeAxes(t,i){return t.map(r=>this.normalizeAxis(r,i??t.length))}static sortBasedOnPerm(t,i){return i?i.map(r=>t[r]):t.slice().reverse()}static padShape(t,i){let r=t.length;return t.map((a,n)=>a+i[n]+i[n+r])}static areEqual(t,i){return t.length!==i.length?!1:t.every((r,a)=>r===i[a])}},Dn=class Ui{static adjustPoolAttributes(t,i,r,a,n,s){if(!t&&r.length!==i.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<i.length-2;o++)o>=r.length?r.push(i[o+2]):r[o]=i[o+2];for(let o=0;o<r.length;o++)if(o<a.length){if(a[o]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let o=0;o<r.length;o++)if(o<n.length){if(n[o]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let o=0;o<r.length*2;o++)if(o<s.length){if(s[o]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let o=0;o<r.length;o++){if(r[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[o]>=r[o]||s[o+r.length]>=r[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,i,r,a,n,s,o){if(o){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)Ui.adjustPadAndReturnShape(t[u+(s?1:2)],i[u],r[u],a[u],n,u,u+t.length-2,o)}}static computePoolOutputShape(t,i,r,a,n,s,o){if(i.length<=0)throw new Error("input shape must be of size greater than 0");let u=[i[0],i[1]];return Ui.computeShapeHelper(t,i,u,r,a,n,s,o),u}static computeConvOutputShape(t,i,r,a,n,s,o){if(t.length<=0||i.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],i[0]];return Ui.computeShapeHelper(!1,t,u,r,a,n,s,o),u}static computeShapeHelper(t,i,r,a,n,s,o,u){if(t)for(let d=0;d<i.length-2;d++)r.push(1);else for(let d=0;d<i.length-2;d++)r.push(Ui.adjustPadAndReturnShape(i[d+2],a[d],n[d],s[d],o,d,d+i.length-2,u))}static adjustPadAndReturnShape(t,i,r,a,n,s,o,u){let d=r*(a-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return n[s]=0,n[o]=0,Math.floor((t-d)/i+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=((t+i-1)/i-1)*i+a-t;return n[s]=Math.floor(u==="SAME_LOWER"?(h+1)/2:h/2),n[o]=h-n[s],Math.floor((t+h-a)/i+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+n[s]+n[o]-d)/i+1)}},Zc=class{static getShapeOfGemmResult(e,t,i,r,a){if(e.length!==2||i.length!==2)throw new Error("shape need to be of size 2");let n,s,o;t?(n=e[1],s=e[0]):(n=e[0],s=e[1]);let u=-1;if(r?(o=i[0],u=1):(o=i[1],u=0),i[u]!==s)throw new Error("dimension mismatch");if(n<=0||o<=0||s<=0)throw new Error("invalid shape specified");if(a&&!bi.isValidBroadcast(a,[n,o]))throw new Error("gemm: invalid bias shape for broadcast");return[n,o,s]}},Yc=-34028234663852886e22,Xc=34028234663852886e22}),Xa,Jc=H(()=>{re(),Xa=(e,t)=>new(Fn(t))(e)}),Sr,va,Cr,Xo,Tr,Jo,Ir,Er,kr,Qo,Qc,d0=H(()=>{re(),Mt(),Sr=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),va=(e,t)=>{if(t==="int32")return e;let i=Sr.get(t);if(!i)throw new Error(`WebNN backend does not support data type: ${t}`);let r=i/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let a=e.byteLength/r,n=new(Fn(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let s=new Int32Array(a);for(let o=0;o<a;o++){let u=n[o];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[o]=Number(u)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&n.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(n,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Cr=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let i=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,i);switch(t){case"int64":{let a=BigInt64Array.from(r,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(r.some(n=>n<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(r,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(r.some(n=>n<-128||n>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(r,Number);return new Uint8Array(a.buffer)}case"uint8":{if(r.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(n=>n<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(r,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Xo=1,Tr=()=>Xo++,Jo=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Ir=(e,t)=>{let i=Sr.get(e);if(!i)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,a)=>r*a)*i/8):0},Er=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:i,tensor:r,dataType:a,shape:n,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=i,this.mlTensor=r,this.dataType=a,this.tensorShape=n,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Ir(this.dataType,this.tensorShape)}destroy(){he("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),i=Cr(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(i);return}else return i.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,i){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===i.length&&this.tensorShape.every((r,a)=>r===i[a])}setIsDataConverted(e){this.isDataConverted=e}},kr=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,i,r){let a=this.tensorManager.getMLContext(e),n;if(!a.opSupportLimits().input.dataTypes.includes(t)){if(n=Jo.get(t),!n||!a.opSupportLimits().input.dataTypes.includes(n))throw new Error(`WebNN backend does not support data type: ${t}`);he("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${n}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,i))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==Ir(t,i))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,i,s,!0,!0,n),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=va(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else he("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){var t,i;if(this.activeUpload){let r=(t=this.wrapper)!=null&&t.isDataConverted?Cr(this.activeUpload,(i=this.wrapper)==null?void 0:i.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(r):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(r);return}else return r.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Qo=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=Tr();return this.tensorTrackersById.set(e,new kr(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,i,r,a){he("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${i}, shape: ${r}, copyOld: ${a}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.ensureTensor(e,i,r,a)}upload(e,t){let i=this.tensorTrackersById.get(e);if(!i)throw new Error("Tensor not found.");i.upload(t)}async download(e,t){he("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let i=this.tensorTrackersById.get(e);if(!i)throw new Error("Tensor not found.");return i.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,i,r){let a=this.getMLContext(e),n=Tr(),s=new Er({sessionId:e,context:a,tensor:t,dataType:i,shape:r});return this.tensorTrackersById.set(n,new kr(this,s)),this.externalTensors.add(s),n}async getCachedTensor(e,t,i,r,a,n,s){let o=this.getMLContext(e);for(let[d,h]of this.freeTensors.entries())if(h.canReuseTensor(o,t,i)){he("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${i}`);let f=this.freeTensors.splice(d,1)[0];return f.sessionId=e,f}he("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${i}}`);let u=await o.createTensor({dataType:s??t,shape:i,dimensions:i,usage:r,writable:a,readable:n});return new Er({sessionId:e,context:o,tensor:u,dataType:t,shape:i,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Qc=(...e)=>new Qo(...e)}),zi,el,eh,c0=H(()=>{re(),di(),Jc(),d0(),Mt(),zi=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),el=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let i=Object.keys(e).sort(),r=Object.keys(t).sort();return i.length===r.length&&i.every((a,n)=>a===r[n]&&e[a]===t[a])},eh=class{constructor(e){this.tensorManager=Qc(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,Ya(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){he("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){he("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let i of t)he("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${i}}`),this.tensorManager.releaseTensorId(i);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let i=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(i!==-1)return this.mlContextCache[i].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}else if(e===void 0){let i=this.mlContextCache.findIndex(r=>r.options===void 0&&r.gpuDevice===void 0);if(i!==-1)return this.mlContextCache[i].mlContext;{let r=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:r}),r}}let t=this.mlContextCache.findIndex(i=>el(i.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:i}),i}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let i=this.sessionIdsByMLContext.get(t);i||(i=new Set,this.sessionIdsByMLContext.set(t,i)),i.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let i=this.sessionIdsByMLContext.get(t);if(i.delete(e),i.size===0){this.sessionIdsByMLContext.delete(t);let r=this.mlContextCache.findIndex(a=>a.mlContext===t);r!==-1&&this.mlContextCache.splice(r,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){he("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,i,r,a){let n=zi.get(i);if(!n)throw new Error(`Unsupported ONNX data type: ${i}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,n,r,a)}async createTemporaryTensor(e,t,i){he("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${i}}`);let r=zi.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,r,i,!1);let n=this.temporarySessionTensorIds.get(e);return n?n.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!$e().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");he("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let i=await this.tensorManager.download(e);return Xa(i,t)}}registerMLTensor(e,t,i,r){let a=zi.get(i);if(!a)throw new Error(`Unsupported ONNX data type: ${i}`);let n=this.tensorManager.registerTensor(e,t,a,r);return he("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${r}} -> {tensorId: ${n}}`),n}registerMLConstant(e,t,i,r,a,n,s=!1){if(!n)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let u=n.get(o);if(!u)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+i>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=u.slice(t,t+i).buffer,h;switch(a.dataType){case"float32":h=new Float32Array(d);break;case"float16":h=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":h=new Int32Array(d);break;case"uint32":h=new Uint32Array(d);break;case"int64":if(s){let f=va(new Uint8Array(d),"int64");h=new Int32Array(f.buffer),a.dataType="int32"}else h=new BigInt64Array(d);break;case"uint64":h=new BigUint64Array(d);break;case"int8":h=new Int8Array(d);break;case"int4":case"uint4":case"uint8":h=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return he("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(a,h)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let i=this.sessionGraphInputs.get(e);return i?i.includes(t):!1}isGraphOutput(e,t){let i=this.sessionGraphOutputs.get(e);return i?i.includes(t):!1}isGraphInputOutputTypeSupported(e,t,i=!0){let r=this.mlContextBySessionId.get(e),a=zi.get(ii(t));return typeof a>"u"?!1:i?!!(r!=null&&r.opSupportLimits().input.dataTypes.includes(a)):!!(r!=null&&r.opSupportLimits().output.dataTypes.includes(a))}flush(){}}}),Ja=H(()=>{}),zr,pn,fn,tl,il,Mr,$a,nl,th,h0=H(()=>{Mt(),Ja(),zr=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),pn=[],fn=e=>Math.ceil(Number(e)/16)*16,tl=e=>{for(let t=0;t<pn.length;t++){let i=pn[t];if(e<=i)return i}return Math.ceil(e/16)*16},il=1,Mr=()=>il++,$a=async(e,t,i,r)=>{let a=fn(i),n=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,n,0,a),e.flush(),await n.mapAsync(GPUMapMode.READ);let o=n.getMappedRange();if(r){let u=r();return u.set(new Uint8Array(o,0,i)),u}else return new Uint8Array(o.slice(0,i))}finally{n.destroy()}},nl=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of zr)pn.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let i=t.buffer,r=t.byteOffset,a=t.byteLength,n=fn(a),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:n,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),u=o.getMappedRange();new Uint8Array(u).set(new Uint8Array(i,r,a)),o.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(o,0,s.gpuData.buffer,0,n),this.backend.device.queue.submit([d.finish()]),o.destroy(),he("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let i=this.storageCache.get(e);if(!i)throw new Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw new Error("destination gpu data for memcpy does not exist");if(i.originalSize!==r.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=fn(i.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(i.gpuData.buffer,0,r.gpuData.buffer,0,a)}registerExternalBuffer(e,t,i){let r;if(i){if(r=i[0],e===i[1])return he("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=Mr();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),he("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),he("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let i=tl(e),r,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||n){let o=(a?this.freeBuffers:this.freeUniformBuffers).get(i);o?o.length>0?r=o.pop():r=this.backend.device.createBuffer({size:i,usage:t}):r=this.backend.device.createBuffer({size:i,usage:t})}else r=this.backend.device.createBuffer({size:i,usage:t});let s={id:Mr(),type:0,buffer:r};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),he("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,i=this.storageCache.get(t);if(!i){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return he("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${i.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(i.gpuData.buffer),i.originalSize}async download(e,t){let i=this.storageCache.get(Number(e));if(!i)throw new Error("data does not exist");await $a(this.backend,i.gpuData.buffer,i.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=zr.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let i=this.freeBuffers.get(e.size)||[];t===void 0||i.length>=t?e.destroy():i.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let i=this.freeUniformBuffers.get(e.size)||[];t===void 0||i.length>=t?e.destroy():i.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(i=>{i.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(he("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(i=>{i.gpuData.buffer.destroy()}),this.storageCache=new Map)}},th=(...e)=>new nl(...e)}),rl,me,Te=H(()=>{rl=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},me=e=>new rl(e)}),wi,mn,Re,Le,ee,Ce,xa,mi,Ft,Q,Mi,B,Y,ih,Qa,al,nh,le=H(()=>{re(),se(),wi=64,mn=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Re=(e,t=1)=>{let i=mn(e,t);return typeof i=="string"?i:i[0]},Le=(e,t=1)=>{let i=mn(e,t);return typeof i=="string"?i:i[1]},ee=(...e)=>{let t=[];return e.forEach(i=>{i.length!==0&&t.push({type:12,data:i},{type:12,data:R.computeStrides(i)})}),t},Ce=e=>e%4===0?4:e%2===0?2:1,xa=(e="f32",t,i="0")=>!t||t===1?`${e}(${i})`:`vec${t}<${e}>(${i})`,mi=(e,t,i)=>e==="f32"?i:t===1?`f32(${i})`:`vec${t}<f32>(${i})`,Ft=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,Q=(e,t,i,r)=>e.startsWith("uniforms.")&&i>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:i>1?`${e}[${t}]`:e,Mi=(e,t,i,r,a)=>{let n=typeof i=="number",s=n?i:i.length,o=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=mn(t,a),h=typeof d=="string"?d:d[1],f=typeof d=="string"?d:d[0],m={indices:u,value:h,storage:f,tensor:t},y=N=>typeof N=="string"?N:`${N}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=n?"uniforms.":"",x=`${b}${e}_shape`,$=`${b}${e}_strides`,v="";for(let N=0;N<s-1;N++)v+=`
    let dim${N} = current / ${Q($,N,s)};
    let rest${N} = current % ${Q($,N,s)};
    indices[${N}] = dim${N};
    current = rest${N};
    `;v+=`indices[${s-1}] = current;`;let S=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${v}
    return indices;
  }`,T=N=>(_.offsetToIndices=!0,s<2?N:`o2i_${e}(${N})`),I=[];if(s>=2)for(let N=s-1;N>=0;N--)I.push(`${Q($,N,s)} * (indices[${N}])`);let k=s<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${I.join("+")};
  }`,z=N=>(_.indicesToOffset=!0,s<2?N:`i2o_${e}(${N})`),M=(...N)=>s===0?"0u":`${m.indices}(${N.map(y).join(",")})`,O=(N,V)=>s<2?`${N}`:`${Q(N,V,s)}`,F=(N,V,j)=>s<2?`${N}=${j};`:`${Q(N,V,s)}=${j};`,K={},G=(N,V)=>{_.broadcastedIndicesToOffset=!0;let j=`${V.name}broadcastedIndicesTo${e}Offset`;if(j in K)return`${j}(${N})`;let te=[];for(let ke=s-1;ke>=0;ke--){let ct=V.indicesGet("outputIndices",ke+V.rank-s);te.push(`${O($,ke)} * (${ct} % ${O(x,ke)})`)}return K[j]=`fn ${j}(outputIndices: ${V.type.indices}) -> u32 {
             return ${te.length>0?te.join("+"):"0u"};
           }`,`${j}(${N})`},q=(N,V)=>(()=>{if(m.storage===m.value)return`${e}[${N}]=${V};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${N}]=vec2<u32>(u32(${V}), select(0u, 0xFFFFFFFFu, ${V} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${N}]=vec2<u32>(u32(${V}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${N}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${V}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),ue=N=>(()=>{if(m.storage===m.value)return`${e}[${N}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${N}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${N}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${N}] & 0xFFu), bool(${e}[${N}] & 0xFF00u), bool(${e}[${N}] & 0xFF0000u), bool(${e}[${N}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),ae=s<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${h} {
    return ${ue(`i2o_${e}(indices)`)};
  }`,X=s<2?"":(()=>{let N=o.map(j=>`d${j}: u32`).join(", "),V=o.map(j=>`d${j}`).join(", ");return`
  fn get_${e}(${N}) -> ${h} {
    return get_${e}ByIndices(${M(V)});
  }`})(),oe=(...N)=>{if(N.length!==s)throw new Error(`indices length must be ${s}`);let V=N.map(y).join(",");return s===0?ue("0u"):s===1?ue(V[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${V})`)},J=N=>s<2?ue(N):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${N})`),ie=s<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${h}) {
    ${q(`i2o_${e}(indices)`,"value")}
  }`,we=s<2?"":(()=>{let N=o.map(j=>`d${j}: u32`).join(", "),V=o.map(j=>`d${j}`).join(", ");return`
  fn set_${e}(${N}, value: ${h}) {
    set_${e}ByIndices(${M(V)}, value);
  }`})();return{impl:()=>{let N=[],V=!1;return _.offsetToIndices&&(N.push(S),V=!0),_.indicesToOffset&&(N.push(k),V=!0),_.broadcastedIndicesToOffset&&(Object.values(K).forEach(j=>N.push(j)),V=!0),_.set&&(N.push(we),V=!0),_.setByIndices&&(N.push(ie),V=!0),_.get&&(N.push(X),V=!0),_.getByIndices&&(N.push(ae),V=!0),!n&&V&&N.unshift(`const ${x} = ${m.indices}(${i.join(",")});`,`const ${$} = ${m.indices}(${R.computeStrides(i).join(",")});`),N.join(`
`)},type:m,offsetToIndices:T,indicesToOffset:z,broadcastedIndicesToOffset:G,indices:M,indicesGet:O,indicesSet:F,set:(...N)=>{if(N.length!==s+1)throw new Error(`indices length must be ${s}`);let V=N[s];if(typeof V!="string")throw new Error("value must be string");let j=N.slice(0,s).map(y).join(",");return s===0?q("0u",V):s===1?q(j[0],V):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${j}, ${V})`)},setByOffset:q,setByIndices:(N,V)=>s<2?q(N,V):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${N}, ${V});`),get:oe,getByOffset:ue,getByIndices:J,usage:r,name:e,strides:$,shape:x,rank:s}},B=(e,t,i,r=1)=>Mi(e,t,i,"input",r),Y=(e,t,i,r=1)=>Mi(e,t,i,"output",r),ih=(e,t,i)=>Mi(e,t,i,"atomicOutput",1),Qa=(e,t,i,r=1)=>Mi(e,t,i,"internal",r),al=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=wi){let t=typeof e=="number"?e:e[0],i=typeof e=="number"?1:e[1],r=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||i>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*i*r>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,n=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*i*r}u + local_idx;`;return`@compute @workgroup_size(${t}, ${i}, ${r})
  fn main(${n}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let i=e.usage==="input"?"read":"read_write",r=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${i}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,i=1){return this.uniforms.push({name:e,type:t,length:i}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:i,length:r}of this.uniforms)if(r&&r>4)i==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${i}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${i}>, ${Math.ceil(r/4)}>`);else{let a=r==null||r===1?i:`vec${r}<${i}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},nh=(e,t)=>new al(e,t)}),sl,Ar,ol,ll,ul,dl,Xe,rh,ah,Wt=H(()=>{re(),se(),Te(),le(),sl=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Ar=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),ol=(e,t)=>R.sortBasedOnPerm(e,Ar(e.length,t)),ll=(e,t,i,r)=>{let a=`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`;for(let n=0;n<t;++n)a+=`a[${e[n]}]=i[${n}];`;return a+="return a;}"},ul=(e,t)=>{let i=[],r=[];for(let a=0;a<e.length;++a)e[a]!==1&&i.push(e[a]),e[t[a]]!==1&&r.push(t[a]);return{newShape:i,newPerm:r}},dl=(e,t)=>{let i=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<i)return!1;i=e[r]}return!0},Xe=(e,t)=>{let i=e.dataType,r=e.dims.length,a=Ar(r,t),n=ol(e.dims,a),s=e.dims,o=n,u=r<2||dl(a,e.dims),d;if(u)return d=_=>{let b=B("input",i,s,4),x=Y("output",i,o,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(b,x)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=R.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:d};let{newShape:h,newPerm:f}=ul(e.dims,a),m=R.areEqual(f,[2,3,1]),y=R.areEqual(f,[3,1,2]);if(h.length===2||m||y){s=m?[h[0],h[1]*h[2]]:y?[h[0]*h[1],h[2]]:h,o=[s[1],s[0]];let _=16;return d=b=>{let x=B("a",i,s.length),$=Y("output",i,o.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(x,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${_+1}>, ${_}>;
  ${b.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${x.getByIndices(`${x.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${$.setByIndices(`${$.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=R.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/_),y:Math.ceil(o[0]/_)},programUniforms:[{type:12,data:b},...ee(s,o)]}},getShaderSource:d}}return d=_=>{let b=B("a",i,s.length),x=Y("output",i,o.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(b,x)}

  ${ll(a,r,b,x)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=R.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...ee(s,o)]}},getShaderSource:d}},rh=(e,t)=>{sl(e.inputs,t.perm),e.compute(Xe(e.inputs[0],t.perm))},ah=e=>me({perm:e.perm})}),cl,hl,pl,fl,ml,gl,yl,_l,bl,wl,nt,sh,oh,lh,uh,dh,ch,hh,ph,fh,mh,p0=H(()=>{re(),se(),le(),es(),Wt(),cl={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},hl={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},pl={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},fl={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},ml=(e,t)=>{let i=[];for(let r=t-e;r<t;++r)i.push(r);return i},gl=(e,t)=>{let i=[],r=e.length;for(let n=0;n<r;n++)t.indexOf(n)===-1&&i.push(e[n]);let a=t.map(n=>e[n]);return[i,a]},yl=(e,t)=>{let i=e.length+t.length,r=[],a=0;for(let n=0;n<i;n++)t.indexOf(n)===-1?r.push(e[a++]):r.push(1);return r},_l=(e,t)=>{for(let i=0;i<e.length;++i)if(e[e.length-i-1]!==t-1-i)return!1;return!0},bl=(e,t)=>{let i=[];if(!_l(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&i.push(r);e.forEach(r=>i.push(r))}return i},wl=(e,t,i,r,a,n,s)=>{let o=i[0].dims,u=R.size(n),d=R.size(s),h=B("_A",i[0].dataType,o),f=Y("output",a,n),m=64;u===1&&(m=256);let y=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,_=b=>`
        ${b.registerUniform("reduceSize","u32").declareVariables(h,f)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${pl[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${h.getByOffset("offset + k")});
           bestValue = ${cl[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${hl[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${r==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${fl[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:u},programUniforms:[{type:12,data:d}]})}},nt=(e,t,i,r)=>{let a=e.inputs.length===1?i:Sa(e.inputs,i),n=a.axes;n.length===0&&!a.noopWithEmptyAxes&&(n=e.inputs[0].dims.map((y,_)=>_));let s=R.normalizeAxes(n,e.inputs[0].dims.length),o=s,u=e.inputs[0],d=bl(o,e.inputs[0].dims.length);d.length>0&&(u=e.compute(Xe(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],o=ml(o.length,u.dims.length));let[h,f]=gl(u.dims,o),m=h;a.keepDims&&(m=yl(h,s)),e.compute(wl(t,a.cacheKey,[u],r,e.inputs[0].dataType,m,f),{inputs:[u]})},sh=(e,t)=>{nt(e,"ReduceMeanShared",t,"mean")},oh=(e,t)=>{nt(e,"ReduceL1Shared",t,"l1")},lh=(e,t)=>{nt(e,"ReduceL2Shared",t,"l2")},uh=(e,t)=>{nt(e,"ReduceLogSumExpShared",t,"logSumExp")},dh=(e,t)=>{nt(e,"ReduceMaxShared",t,"max")},ch=(e,t)=>{nt(e,"ReduceMinShared",t,"min")},hh=(e,t)=>{nt(e,"ReduceProdShared",t,"prod")},ph=(e,t)=>{nt(e,"ReduceSumShared",t,"sum")},fh=(e,t)=>{nt(e,"ReduceSumSquareShared",t,"sumSquare")},mh=(e,t)=>{nt(e,"ReduceLogSumShared",t,"logSum")}}),rt,vl,Bn,Sa,at,$l,xl,Sl,Cl,Tl,Il,El,kl,zl,Ml,st,gh,yh,_h,bh,wh,vh,$h,xh,Sh,Ch,es=H(()=>{re(),se(),Te(),le(),p0(),rt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},vl=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Bn=(e,t,i,r,a,n,s=!1,o=!1)=>{let u=[],d=i[0].dims,h=d.length,f=R.normalizeAxes(a,h),m=!o&&f.length===0;d.forEach((b,x)=>{m||f.indexOf(x)>=0?s&&u.push(1):u.push(b)});let y=u.length,_=R.size(u);return{name:e,shaderCache:t,getShaderSource:b=>{let x=[],$=B("_A",i[0].dataType,h),v=Y("output",n,y),S=r($,v,f),T=S[2];for(let I=0,k=0;I<h;I++)m||f.indexOf(I)>=0?(s&&k++,T=`for(var j${I}: u32 = 0; j${I} < ${d[I]}; j${I}++) {
                  ${S[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${$.indicesSet("input_indices",I,`j${I}`)}
                  ${T}
                }`):(x.push(`${$.indicesSet("input_indices",I,v.indicesGet("output_indices",k))};`),k++);return`

        ${b.registerUniform("output_size","u32").declareVariables($,v)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${v.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${S[0]}       // init ops for reduce max/min
          ${S[1]}
          ${T}
          ${S[3]}
          ${S.length===4?v.setByOffset("global_idx","value"):S.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:n}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...ee(d,u)]})}},Sa=(e,t)=>{let i=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>i.push(Number(r))),me({axes:i,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},at=(e,t,i,r)=>{let a=e.inputs,n=a.length===1?i:Sa(a,i);e.compute(Bn(t,{hint:n.cacheKey,inputDependencies:["rank"]},[a[0]],n.noopWithEmptyAxes&&n.axes.length===0?vl:r,n.axes,a[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},$l=(e,t)=>{rt(e.inputs),at(e,"ReduceLogSum",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${i.getByIndices("input_indices")};`,"value = log(value);"])},xl=(e,t)=>{rt(e.inputs),at(e,"ReduceL1",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${i.getByIndices("input_indices")});`,""])},Sl=(e,t)=>{rt(e.inputs),at(e,"ReduceL2",t,(i,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${i.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Cl=(e,t)=>{rt(e.inputs),at(e,"ReduceLogSumExp",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${i.getByIndices("input_indices")});`,"value = log(value);"])},Tl=(e,t)=>{rt(e.inputs),at(e,"ReduceMax",t,(i,r,a)=>{let n=[];for(let s=0;s<i.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(i.indicesSet("input_indices",s,0));return[`${n.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};`,`value = max(value, ${i.getByIndices("input_indices")});`,""]})},Il=(e,t)=>{rt(e.inputs),at(e,"ReduceMean",t,(i,r,a)=>{let n=1;for(let s=0;s<i.rank;s++)(a.indexOf(s)>=0||a.length===0)&&(n*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${i.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${n});`]})},El=(e,t)=>{rt(e.inputs),at(e,"ReduceMin",t,(i,r,a)=>{let n=[];for(let s=0;s<i.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(`input_indices[${s}] = 0;`);return[`${n.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};`,`value = min(value, ${i.getByIndices("input_indices")});`,""]})},kl=(e,t)=>{rt(e.inputs),at(e,"ReduceProd",t,(i,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${i.getByIndices("input_indices")};`,""])},zl=(e,t)=>{rt(e.inputs),at(e,"ReduceSum",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${i.getByIndices("input_indices")};`,""])},Ml=(e,t)=>{rt(e.inputs),at(e,"ReduceSumSquare",t,(i,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${i.getByIndices("input_indices")}; value += t * t;`,""])},st=(e,t,i)=>{if(t.length===0)return i;let r=1,a=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?r*=e[n]:a*=e[n];return a<32&&r>1024},gh=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Il(e,t):sh(e,t)},yh=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xl(e,t):oh(e,t)},_h=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sl(e,t):lh(e,t)},bh=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Cl(e,t):uh(e,t)},wh=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Tl(e,t):dh(e,t)},vh=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?El(e,t):ch(e,t)},$h=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?kl(e,t):hh(e,t)},xh=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zl(e,t):ph(e,t)},Sh=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ml(e,t):fh(e,t)},Ch=(e,t)=>{st(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$l(e,t):mh(e,t)}}),Rr,Th,Ih,Ca,f0=H(()=>{re(),Te(),es(),Rr=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Th=(e,t)=>{Rr(e.inputs);let i=(r,a,n)=>{let s=[];for(let o=0;o<r.rank;o++)(n.indexOf(o)>=0||n.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Bn("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],i,[t.axis],7,t.keepDims),{inputs:[0]})},Ih=(e,t)=>{Rr(e.inputs);let i=(r,a,n)=>{let s=[];for(let o=0;o<r.rank;o++)(n.indexOf(o)>=0||n.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Bn("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],i,[t.axis],7,t.keepDims),{inputs:[0]})},Ca=e=>me(e)}),Al,gn,Rl,Ol,Dl,Yi,Bl,Eh,ts=H(()=>{re(),se(),Ja(),le(),Al=(e,t)=>{let i=e[0],r=e[1],a=e[2],n=e[3],s=e[4],o=e[5];if(s&&o)throw new Error("Attention cannot have both past and attention_bias");if(i.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=i.dims[0],d=i.dims[1],h=i.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==h)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=a.dims[0]/3,m=f,y=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let _=d;if(f!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==f+m+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let b=0;if(s){if(m!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(b=s.dims[3])}let x=_+b,$=-1,v=0;if(n)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==u||o.dims[1]!==t.numHeads||o.dims[2]!==d||o.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:d,pastSequenceLength:b,kvSequenceLength:_,totalSequenceLength:x,maxSequenceLength:$,inputHiddenSize:h,hiddenSize:f,vHiddenSize:y,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},gn=(e,t,i)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${i?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Rl=(e,t,i,r,a,n,s,o)=>{let u=Ce(s?1:n),d=64,h=n/u;h<d&&(d=32);let f=Math.ceil(n/u/d),m=[{type:12,data:t},{type:12,data:i},{type:12,data:r},{type:12,data:a},{type:12,data:h},{type:12,data:f}],y=Re(e.dataType,u),_=Le(1,u),b=["type"];s&&b.push("type"),o&&b.push("type");let x=$=>{let v=Y("x",e.dataType,e.dims,u),S=[v],T=s?B("seq_lens",s.dataType,s.dims):void 0;T&&S.push(T);let I=o?B("total_sequence_length_input",o.dataType,o.dims):void 0;I&&S.push(I);let k=Le(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${$.registerUniforms(z).declareVariables(...S)}
  ${$.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${gn(T,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${_}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${v.type.value}(${k}(1.0) / ${k}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${k}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${y};${u}`,inputDependencies:b},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*i},programUniforms:m})}},Ol=(e,t,i,r,a,n,s,o,u)=>{let d=s+n.kvSequenceLength,h=[n.batchSize,n.numHeads,n.sequenceLength,d],f=e>1&&r,m=n.kvNumHeads?n.kvNumHeads:n.numHeads,y=f?[n.batchSize,m,d,n.headSize]:void 0,_=n.nReps?n.nReps:1,b=n.scale===0?1/Math.sqrt(n.headSize):n.scale,x=Ce(n.headSize),$=n.headSize/x,v=12,S={x:Math.ceil(d/v),y:Math.ceil(n.sequenceLength/v),z:n.batchSize*n.numHeads},T=[{type:12,data:n.sequenceLength},{type:12,data:$},{type:12,data:d},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:1,data:b},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:_}],I=f&&r&&R.size(r.dims)>0,k=["type","type"];I&&k.push("type"),a&&k.push("type"),o&&k.push("type"),u&&k.push("type");let z=[{dims:h,dataType:t.dataType,gpuDataType:0}];f&&z.push({dims:y,dataType:t.dataType,gpuDataType:0});let M=O=>{let F=B("q",t.dataType,t.dims,x),K=B("key",i.dataType,i.dims,x),G=[F,K];if(I){let ie=B("past_key",r.dataType,r.dims,x);G.push(ie)}a&&G.push(B("attention_bias",a.dataType,a.dims));let q=o?B("seq_lens",o.dataType,o.dims):void 0;q&&G.push(q);let ue=u?B("total_sequence_length_input",u.dataType,u.dims):void 0;ue&&G.push(ue);let ae=Y("output",t.dataType,h),X=[ae];f&&X.push(Y("present_key",t.dataType,y,x));let oe=Le(1,x),J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${F.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${F.type.storage}, ${v*v}>;
  ${O.registerUniforms(J).declareVariables(...G,...X)}
  ${O.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${gn(q,ue,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${oe}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${I&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${oe}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${ae.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${a!==void 0};${r!==void 0};${e}`,inputDependencies:k},getRunData:()=>({outputs:z,dispatchGroup:S,programUniforms:T}),getShaderSource:M}},Dl=(e,t,i,r,a,n,s=void 0,o=void 0)=>{let u=n+a.kvSequenceLength,d=a.nReps?a.nReps:1,h=a.vHiddenSize*d,f=e>1&&r,m=a.kvNumHeads?a.kvNumHeads:a.numHeads,y=f?[a.batchSize,m,u,a.headSize]:void 0,_=[a.batchSize,a.sequenceLength,h],b=12,x={x:Math.ceil(a.vHeadSize/b),y:Math.ceil(a.sequenceLength/b),z:a.batchSize*a.numHeads},$=[{type:12,data:a.sequenceLength},{type:12,data:u},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:h},{type:12,data:n},{type:12,data:a.kvSequenceLength},{type:12,data:d}],v=f&&r&&R.size(r.dims)>0,S=["type","type"];v&&S.push("type"),s&&S.push("type"),o&&S.push("type");let T=[{dims:_,dataType:t.dataType,gpuDataType:0}];f&&T.push({dims:y,dataType:t.dataType,gpuDataType:0});let I=k=>{let z=B("probs",t.dataType,t.dims),M=B("v",i.dataType,i.dims),O=[z,M];v&&O.push(B("past_value",r.dataType,r.dims));let F=s?B("seq_lens",s.dataType,s.dims):void 0;s&&O.push(F);let K=o?B("total_sequence_length_input",o.dataType,o.dims):void 0;o&&O.push(K);let G=[Y("output",t.dataType,_)];f&&G.push(Y("present_value",t.dataType,y));let q=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${z.type.value}, ${b*b}>;
  var<workgroup> tileV: array<${z.type.value}, ${b*b}>;
  ${k.registerUniforms(q).declareVariables(...O,...G)}
  ${k.mainStart([b,b,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${gn(F,K,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${v&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:T,dispatchGroup:x,programUniforms:$}),getShaderSource:I}},Yi=(e,t,i,r,a,n,s,o,u,d,h=void 0,f=void 0)=>{let m=Math.min(e.outputCount,1+(s?1:0)+(o?1:0)),y=m>1?d.pastSequenceLength:0,_=y+d.kvSequenceLength,b=u&&R.size(u.dims)>0?u:void 0,x=[t,i];m>1&&s&&R.size(s.dims)>0&&x.push(s),b&&x.push(b),h&&x.push(h),f&&x.push(f);let $=e.compute(Ol(m,t,i,s,b,d,y,h,f),{inputs:x,outputs:m>1?[-1,1]:[-1]})[0];e.compute(Rl($,d.batchSize,d.numHeads,y,d.sequenceLength,_,h,f),{inputs:h&&f?[$,h,f]:[$],outputs:[]});let v=[$,r];m>1&&o&&R.size(o.dims)>0&&v.push(o),h&&v.push(h),f&&v.push(f),e.compute(Dl(m,$,r,o,d,y,h,f),{inputs:v,outputs:m>1?[0,2]:[0]})},Bl=(e,t)=>{let i=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,a=t.inputHiddenSize,n=t.headSize,s=12,o={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:r},{type:12,data:a},{type:12,data:n},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],h=f=>{let m=Y("output_q",u[0].dataType,i),y=Y("output_k",u[0].dataType,i),_=Y("output_v",u[0].dataType,i),b=B("input",u[0].dataType,u[0].dims),x=B("weight",u[1].dataType,u[1].dims),$=B("bias",u[2].dataType,u[2].dims),v=b.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${v}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${v}, ${s*s}>;
  var<workgroup> tileWeightK: array<${v}, ${s*s}>;
  var<workgroup> tileWeightV: array<${v}, ${s*s}>;
  ${f.registerUniforms(S).declareVariables(b,x,$,m,y,_)}
  ${f.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${v}(0);
    var valueK = ${v}(0);
    var valueV = ${v}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:d}),getShaderSource:h},{inputs:u,outputs:[-1,-1,-1]})},Eh=(e,t)=>{let i=Al(e.inputs,t),[r,a,n]=Bl(e,i);return Yi(e,r,a,n,e.inputs[4],void 0,void 0,void 0,e.inputs[5],i)}}),Nl,Pl,Ll,kh,m0=H(()=>{it(),re(),se(),Te(),le(),Nl=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let i=(r,a,n)=>{let s=a.length;if(s!==r.length)throw new Error(`${n}: num dimensions != ${s}`);a.forEach((o,u)=>{if(o!==r[u])throw new Error(`${n}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);i(e[1].dims,r,"Invalid input scale"),i(e[2].dims,r,"Invalid input B"),i(e[3].dims,r,"Invalid input mean"),i(e[4].dims,r,"Invalid input var")}else i(e[1].dims,[1],"Invalid input scale"),i(e[2].dims,[1],"Invalid input B"),i(e[3].dims,[1],"Invalid input mean"),i(e[4].dims,[1],"Invalid input var")},Pl=(e,t)=>{let{epsilon:i,spatial:r,format:a}=t,n=e[0].dims,s=r?Ce(n[n.length-1]):1,o=a==="NHWC"&&n.length>1?s:1,u=R.size(n)/s,d=r,h=d?n.length:n,f=B("x",e[0].dataType,e[0].dims,s),m=B("scale",e[1].dataType,e[1].dims,o),y=B("bias",e[2].dataType,e[2].dims,o),_=B("inputMean",e[3].dataType,e[3].dims,o),b=B("inputVar",e[4].dataType,e[4].dims,o),x=Y("y",e[0].dataType,h,s),$=()=>{let S="";if(r)S=`let cOffset = ${n.length===1?"0u":a==="NHWC"?`outputIndices[${n.length-1}] / ${s}`:"outputIndices[1]"};`;else if(a==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let T=1;T<m.rank;T++)S+=`cIndices[${T}] = outputIndices[${T}];`;S+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return S},v=S=>`
  const epsilon = ${i};
  ${S.registerUniform("outputSize","u32").declareVariables(f,m,y,_,b,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${s}`)};
    ${$()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d?[{type:12,data:u},...ee(n)]:[{type:12,data:u}]})}},Ll=e=>me(e),kh=(e,t)=>{let{inputs:i,outputCount:r}=e,a=Ll({...t,outputCount:r});if(ge.webgpu.validateInputContent&&Nl(i,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Pl(i,a))}}),Ul,Fl,zh,g0=H(()=>{se(),le(),Ul=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Fl=e=>{let t=e[0].dims,i=e[0].dims[2],r=R.size(t)/4,a=e[0].dataType,n=B("input",a,t,4),s=B("bias",a,[i],4),o=B("residual",a,t,4),u=Y("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:d=>`
  const channels = ${i}u / 4;
  ${d.declareVariables(n,s,o,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},zh=e=>{Ul(e.inputs),e.compute(Fl(e.inputs))}}),Hl,pe,Mh,Ah,Rh,Oh,Dh,Bh,Nh,Ph,Lh,Wl,Uh,Fh,Hh,Wh,Fi,Vh,kn,Gh,qh,jh,Kh,Zh,Yh,Xh,Jh,Qh,ep,tp,ip,np,rp,ap,sp,Or,op,Ta,Ia,lp,up,dp,Vl,Gl,cp,is=H(()=>{re(),se(),Te(),le(),Hl=(e,t,i,r,a,n,s)=>{let o=Math.ceil(t/4),u="";typeof a=="string"?u=`${a}(a)`:u=a("a");let d=B("inputData",i,[o],4),h=Y("outputData",r,[o],4),f=[{name:"vec_size",type:"u32"}];return s&&f.push(...s),`
      ${e.registerUniforms(f).declareVariables(d,h)}

  ${n??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${h.setByOffset("global_idx",u)}
  }`},pe=(e,t,i,r,a,n=e.dataType,s,o)=>{let u=[{type:12,data:Math.ceil(R.size(e.dims)/4)}];return s&&u.push(...s),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:d=>Hl(d,R.size(e.dims),e.dataType,n,i,r,o),getRunData:d=>({outputs:[{dims:e.dims,dataType:n}],dispatchGroup:{x:Math.ceil(R.size(d[0].dims)/64/4)},programUniforms:u})}},Mh=e=>{e.compute(pe(e.inputs[0],"Abs","abs"))},Ah=e=>{e.compute(pe(e.inputs[0],"Acos","acos"))},Rh=e=>{e.compute(pe(e.inputs[0],"Acosh","acosh"))},Oh=e=>{e.compute(pe(e.inputs[0],"Asin","asin"))},Dh=e=>{e.compute(pe(e.inputs[0],"Asinh","asinh"))},Bh=e=>{e.compute(pe(e.inputs[0],"Atan","atan"))},Nh=e=>{e.compute(pe(e.inputs[0],"Atanh","atanh"))},Ph=e=>me(e),Lh=(e,t)=>{let i;switch(t.to){case 10:i="vec4<f16>";break;case 1:i="vec4<f32>";break;case 12:i="vec4<u32>";break;case 6:i="vec4<i32>";break;case 9:i="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(pe(e.inputs[0],"Cast",i,void 0,t.cacheKey,t.to))},Wl=e=>{let t,i,r=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,i=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,i=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return me({min:t,max:i})},Uh=(e,t)=>{let i=t||Wl(e.inputs),r=Le(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,i.cacheKey,void 0,[{type:e.inputs[0].dataType,data:i.min},{type:e.inputs[0].dataType,data:i.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Fh=e=>{e.compute(pe(e.inputs[0],"Ceil","ceil"))},Hh=e=>{e.compute(pe(e.inputs[0],"Cos","cos"))},Wh=e=>{e.compute(pe(e.inputs[0],"Cosh","cosh"))},Fi=e=>me(e),Vh=(e,t)=>{let i=Le(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${i}(${t.alpha});

  fn elu_f32(a: ${i}) -> ${i} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${i}>) -> vec4<${i}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},kn=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Gh=e=>{let t=Le(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"Erf",i=>`erf_vf32(${i})`,kn(t)))},qh=e=>{e.compute(pe(e.inputs[0],"Exp","exp"))},jh=e=>{e.compute(pe(e.inputs[0],"Floor","floor"))},Kh=e=>{let t=Le(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"Gelu",i=>`0.5 * ${i} * (1.0 + erf_vf32(${i} * 0.7071067811865475))`,kn(t)))},Zh=(e,t)=>{let i=Le(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${i}>(0.0))`,`const leaky_relu_alpha_ = ${i}(${t.alpha});`,t.cacheKey))},Yh=e=>{e.compute(pe(e.inputs[0],"Not",t=>`!${t}`))},Xh=e=>{e.compute(pe(e.inputs[0],"Neg",t=>`-${t}`))},Jh=e=>{e.compute(pe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Qh=e=>{let t=Le(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"Relu",i=>`select(vec4<${t}>(0.0), ${i}, ${i} > vec4<${t}>(0.0))`))},ep=e=>{e.compute(pe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},tp=e=>me(e),ip=(e,t)=>{let i=Le(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"HardSigmoid",r=>`max(vec4<${i}>(0.0), min(vec4<${i}>(1.0), ${t.alpha} * ${r} + vec4<${i}>(${t.beta})))`,void 0,t.cacheKey))},np=e=>{e.compute(pe(e.inputs[0],"Sin","sin"))},rp=e=>{e.compute(pe(e.inputs[0],"Sinh","sinh"))},ap=e=>{e.compute(pe(e.inputs[0],"Sqrt","sqrt"))},sp=e=>{e.compute(pe(e.inputs[0],"Tan","tan"))},Or=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,op=e=>{e.compute(pe(e.inputs[0],"Tanh",Or))},Ta=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Or("v")};
}
`,Ia=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,lp=e=>{let t=Le(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"FastGelu",Ia,Ta(t),void 0,e.inputs[0].dataType))},up=(e,t)=>{let i=Le(e.inputs[0].dataType);return e.compute(pe(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${i}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${i}>(${t.alpha});`,t.cacheKey)),0},dp=e=>{e.compute(pe(e.inputs[0],"Log","log"))},Vl=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Gl=e=>`quick_gelu_impl(${e})`,cp=(e,t)=>{let i=Le(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"QuickGelu",Gl,Vl(i,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),ql,jl,hp,y0=H(()=>{se(),le(),is(),ql=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},jl=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let i=B("input",e[0].dataType,e[0].dims,4),r=B("bias",e[0].dataType,[e[0].dims[2]],4),a=Y("output",e[0].dataType,t,4),n=R.size(t)/4,s=Re(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(i,r,a)}

  ${kn(s)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},hp=e=>{ql(e.inputs),e.compute(jl(e.inputs))}}),Kl,Zl,ot,pp,fp,mp,gp,yp,_p,bp,wp,vp,$p,_0=H(()=>{re(),se(),le(),Kl=(e,t,i,r,a,n,s,o,u,d,h,f)=>{let m,y;typeof o=="string"?m=y=(v,S)=>`${o}((${v}),(${S}))`:typeof o=="function"?m=y=o:(m=o.scalar,y=o.vector);let _=Y("outputData",h,r.length,4),b=B("aData",u,t.length,4),x=B("bData",d,i.length,4),$;if(a)if(n){let v=R.size(t)===1,S=R.size(i)===1,T=t.length>0&&t[t.length-1]%4===0,I=i.length>0&&i[i.length-1]%4===0;v||S?$=_.setByOffset("global_idx",y(v?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):$=`
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices",_)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",_)};
            ${_.setByOffset("global_idx",y(s||T?b.getByOffset("offsetA / 4u"):`${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||I?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=_.setByOffset("global_idx",y(b.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!n)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(S,T,I="")=>{let k=`aData[indexA${T}][componentA${T}]`,z=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${_.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${b.broadcastedIndicesToOffset(`outputIndices${T}`,_)};
            let offsetB${T} = ${x.broadcastedIndicesToOffset(`outputIndices${T}`,_)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${S}[${T}] = ${I}(${m(k,z)});
          `};h===9?$=`
            var data = vec4<u32>(0);
            ${v("data",0,"u32")}
            ${v("data",1,"u32")}
            ${v("data",2,"u32")}
            ${v("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${v("outputData[global_idx]",0)}
            ${v("outputData[global_idx]",1)}
            ${v("outputData[global_idx]",2)}
            ${v("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(b,x,_)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Zl=(e,t,i,r,a,n,s=i.dataType)=>{let o=i.dims.map(b=>Number(b)??1),u=r.dims.map(b=>Number(b)??1),d=!R.areEqual(o,u),h=o,f=R.size(o),m=!1,y=!1,_=[d];if(d){let b=bi.calcShape(o,u,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");h=b.slice(),f=R.size(h);let x=R.size(o)===1,$=R.size(u)===1,v=o.length>0&&o[o.length-1]%4===0,S=u.length>0&&u[u.length-1]%4===0;_.push(x),_.push($),_.push(v),_.push(S);let T=1;for(let I=1;I<h.length;I++){let k=o[o.length-I],z=u[u.length-I];if(k===z)T*=k;else break}T%4===0?(y=!0,m=!0):(x||$||v||S)&&(m=!0)}else m=!0;return _.push(m),{name:e,shaderCache:{hint:t+_.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>Kl(b,o,u,h,m,d,y,a,i.dataType,r.dataType,s,n),getRunData:()=>({outputs:[{dims:h,dataType:s}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(R.size(h)/4)},...ee(o,u,h)]})}},ot=(e,t,i,r,a,n)=>{e.compute(Zl(t,a??"",e.inputs[0],e.inputs[1],i,r,n))},pp=e=>{ot(e,"Add",(t,i)=>`${t}+${i}`)},fp=e=>{ot(e,"Div",(t,i)=>`${t}/${i}`)},mp=e=>{ot(e,"Equal",{scalar:(t,i)=>`u32(${t}==${i})`,vector:(t,i)=>`vec4<u32>(${t}==${i})`},void 0,void 0,9)},gp=e=>{ot(e,"Mul",(t,i)=>`${t}*${i}`)},yp=e=>{let t=B("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;ot(e,"Pow",{scalar:(i,r)=>`pow_custom(${i},${r})`,vector:(i,r)=>`pow_vector_custom(${i},${r})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},_p=e=>{ot(e,"Sub",(t,i)=>`${t}-${i}`)},bp=e=>{ot(e,"Greater",{scalar:(t,i)=>`u32(${t}>${i})`,vector:(t,i)=>`vec4<u32>(${t}>${i})`},void 0,void 0,9)},wp=e=>{ot(e,"Less",{scalar:(t,i)=>`u32(${t}<${i})`,vector:(t,i)=>`vec4<u32>(${t}<${i})`},void 0,void 0,9)},vp=e=>{ot(e,"GreaterOrEqual",{scalar:(t,i)=>`u32(${t}>=${i})`,vector:(t,i)=>`vec4<u32>(${t}>=${i})`},void 0,void 0,9)},$p=e=>{ot(e,"LessOrEqual",{scalar:(t,i)=>`u32(${t}<=${i})`,vector:(t,i)=>`vec4<u32>(${t}<=${i})`},void 0,void 0,9)}}),Yl,Xl,Jl,Ql,xp,Sp,b0=H(()=>{re(),se(),Te(),le(),Yl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let i=0,r=e[i],a=r.dataType,n=r.dims.length;e.forEach((s,o)=>{if(o!==i){if(s.dataType!==a)throw new Error("input tensors should be one type");if(s.dims.length!==n)throw new Error("input tensors should have the same shape");s.dims.forEach((u,d)=>{if(d!==t&&u!==r.dims[d])throw new Error("non concat dimensions must match")})}})},Xl=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Jl=(e,t)=>{let i=e.length,r=[];for(let a=0;a<i;++a){let n=t.setByOffset("global_idx",e[a].getByIndices("indices"));i===1?r.push(n):a===0?r.push(`if (inputIndex == ${a}u) { ${n} }`):a===i-1?r.push(`else { ${n} }`):r.push(`else if (inputIndex == ${a}) { ${n} }`)}return r.join(`
`)},Ql=(e,t,i,r)=>{let a=R.size(i),n=new Array(e.length),s=new Array(e.length),o=0,u=[],d=[],h=[{type:12,data:a}];for(let b=0;b<e.length;++b)o+=e[b].dims[t],n[b]=o,d.push(e[b].dims.length),s[b]=B(`input${b}`,r,d[b]),u.push("rank"),h.push({type:12,data:n[b]});for(let b=0;b<e.length;++b)h.push(...ee(e[b].dims));h.push(...ee(i));let f=Y("output",r,i.length),m=f.indicesGet("indices",t),y=Array.from(Array(n.length).keys()).map(b=>`uniforms.sizeInConcatAxis${b}`).join(","),_=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)b.registerUniform(`sizeInConcatAxis${x}`,"u32");return b.declareVariables(...s,f)})()}

  ${Xl(n.length,y)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${y});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Jl(s,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:h}),getShaderSource:_}},xp=(e,t)=>{let i=e.inputs,r=i[0].dims,a=R.normalizeAxis(t.axis,r.length);Yl(i,a);let n=r.slice();n[a]=i.reduce((o,u)=>o+(u.dims.length>a?u.dims[a]:0),0);let s=i.filter(o=>R.size(o.dims)>0);e.compute(Ql(s,a,n,i[0].dataType),{inputs:s})},Sp=e=>me({axis:e.axis})}),oi,li,ui,ns,ci=H(()=>{re(),se(),oi=(e,t,i="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${i}(uniforms.clip_min)), ${t}(${i}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${i}(uniforms.alpha) * value + ${i}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${i}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},li=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},ui=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},ns=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[i,r]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:i,beta:r}}else if(t==="Clip"){let[i,r]=(e==null?void 0:e.activation_params)||[Yc,Xc];return{activation:t,clipMax:r,clipMin:i}}else if(t==="LeakyRelu"){let[i]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:i}}return{activation:t}}}),De,Cp,rs=H(()=>{De=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Cp=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Tp,w0=H(()=>{Tp=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),qi,as,ss=H(()=>{re(),se(),le(),ci(),qi=(e,t,i,r,a)=>{let n=r-i;return`
      ${Array.from({length:i}).map((s,o)=>`
      if (${Q(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,Q(a,o+n,r))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},as=(e,t,i,r,a=!1,n)=>{let s=e[0].dims,o=e[1].dims,u=s[s.length-2],d=o[o.length-1],h=s[s.length-1],f=Ce(d),m=Ce(h),y=Ce(u),_=R.size(i)/f/y,b=e.length>2,x=r?r.slice(0,-2):i.slice(0,-2),$=[R.size(x),u,d],v=[{type:12,data:_},{type:12,data:u},{type:12,data:d},{type:12,data:h}];li(t,v),v.push(...ee(x,s,o)),b&&v.push(...ee(e[2].dims)),v.push(...ee($));let S=T=>{let I=Qa("batch_dims",e[0].dataType,x.length),k=B("a",e[0].dataType,s.length,m),z=B("b",e[1].dataType,o.length,f),M=Y("output",e[0].dataType,$.length,f),O=Re(M.type.tensor),F=oi(t,M.type.value,O),K=[k,z],G="";if(b){let ae=a?f:1;K.push(B("bias",e[2].dataType,e[2].dims.length,ae)),G=`${a?`value += bias[col / ${ae}];`:`value += ${M.type.value}(bias[row + i]);`}`}let q=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];ui(t,q);let ue=()=>{let ae=`var a_data: ${k.type.value};`;for(let X=0;X<m;X++)ae+=`
              let b_data${X} = b[(b_offset + (k + ${X}) * uniforms.N + col) / ${f}];`;for(let X=0;X<y;X++){ae+=`a_data = a[(a_offset + (row + ${X}) * uniforms.K + k) / ${m}];`;for(let oe=0;oe<m;oe++)ae+=`
            values[${X}] = fma(${z.type.value}(a_data${m===1?"":`[${oe}]`}), b_data${oe}, values[${X}]);
`}return ae};return`
  ${T.registerUniforms(q).registerInternalVariables(I).declareVariables(...K,M)}
  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${i.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${k.type.indices};
    ${qi("a_indices",k,k.rank-2,I.rank,"batch_indices")}
    ${k.indicesSet("a_indices",k.rank-2,0)}
    ${k.indicesSet("a_indices",k.rank-1,0)}
    let a_offset = ${k.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${qi("b_indices",z,z.rank-2,I.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${M.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${ue()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${G}
      ${F}
      let cur_indices = ${M.type.indices}(batch, row + i, col);
      let offset = ${M.indicesToOffset("cur_indices")};
      ${M.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${m};${y};${a}`,inputDependencies:b?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:v}),getShaderSource:S}}}),eu,tu,Ea,Dr,iu,ka,nu,Nn,os=H(()=>{re(),se(),le(),ci(),ss(),rs(),eu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,tu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Ea=(e,t,i="f32",r,a=!1,n=32,s=!1,o=32)=>{let u=t[1]*e[1],d=t[0]*e[0],h=a?u:n,f=a?n:u,m=h/t[0],y=n/t[1];if(!((a&&m===4&&e[1]===4||!a&&(m===3||m===4))&&h%t[0]===0&&n%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${i}>, ${h/m}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${i}>, ${d/e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(o/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${i}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${eu(a,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${tu(a,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Dr=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,iu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",ka=(e,t,i="f32",r,a=!1,n=32,s=!1,o=32,u=!1)=>{let d=e[1]*t[1],h=e[0]*t[0],f=a?d:n,m=a?n:d;if(!(m%t[1]===0&&f%t[0]===0&&n%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);let y=m/t[1],_=f/t[0],b=n/t[1],x=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${h};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${Dr(a,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${i}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Dr(a,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${i}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${iu(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${i}, ${f}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${i}, ${h}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(o/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${i}, colPerThread>, rowPerThread>;
    ${x}
  }
`},nu=(e,t,i,r,a=!1)=>{let[n,s,o,u]=r,d=Re(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${De(e,d)} {
      var value = ${De(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${qi("aIndices",s,s.rank-2,n.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${De(e,d)} {
      var value = ${De(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${qi("bIndices",o,o.rank-2,n.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${De(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${De(e,d)}(bias[row])`};`:""}
        ${i}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Nn=(e,t,i,r,a=!1,n)=>{let s=e[0].dims,o=e[1].dims,u=s.slice(0,-2),d=o.slice(0,-2),h=r?r.slice(0,-2):i.slice(0,-2),f=R.size(h),m=s[s.length-2],y=s[s.length-1],_=o[o.length-1],b=y%4===0&&_%4===0,x=m<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(_/$[0]/x[0]),Math.ceil(m/$[1]/x[1]),Math.ceil(f/$[2]/x[2])],S=b?4:1,T=[...u,m,y/S],I=T.length,k=[...d,y,_/S],z=k.length,M=[f,m,_/S],O=[{type:6,data:m},{type:6,data:_},{type:6,data:y}];li(t,O),O.push(...ee(h,T,k));let F=["rank","rank"],K=e.length>2;K&&(O.push(...ee(e[2].dims)),F.push("rank")),O.push(...ee(M));let G=q=>{let ue=h.length,ae=Qa("batchDims",e[0].dataType,ue,1),X=Re(e[0].dataType),oe=B("a",e[0].dataType,I,S),J=B("b",e[1].dataType,z,S),ie=Y("result",e[0].dataType,M.length,S),we=[oe,J];if(K){let ke=a?S:1;we.push(B("bias",e[2].dataType,e[2].dims.length,ke))}let N=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];ui(t,N);let V=Re(ie.type.tensor),j=oi(t,ie.type.value,V),te=nu(S,K,j,[ae,oe,J,ie],a);return`
  ${q.registerUniforms(N).registerInternalVariables(ae).declareVariables(...we,ie)}
  ${te}
  ${b?Ea(x,$,X,ae):ka(x,$,X,ae)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${b};${a}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:O}),getShaderSource:G}}}),ru,Ip,v0=H(()=>{re(),Mt(),le(),ci(),rs(),w0(),os(),ru=(e,t,i,r,a=!1,n,s=4,o=4,u=4,d="f32")=>{let h=O=>{switch(O){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${O} is not supported.`)}},f=O=>{switch(O){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${O} is not supported.`)}},m=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,y=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,_=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",b=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",$=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${De(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${b}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${h(s)}
    }
    return resData;`,S=e?t&&r?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${De(s,d)}(0.0);`:r&&i?`
    let col = colIn * ${s};
    ${v}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${De(s,d)}(0.0);`,T=e?r&&i?f(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(o)}
    }
    return ${De(o,d)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(o)}
    }
    return ${De(o,d)}(0.0);`,I=De(u,d),k=De(e?s:o,d),z=De(e?o:s,d),M=oi(n,I,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${k} {
      ${e?S:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?T:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${Cp(a)}
      ${M}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Ip=(e,t,i,r,a,n,s,o,u)=>{let d=t.format==="NHWC",h=d?e[0].dims[3]:e[0].dims[1],f=i[0],m=d?i[2]:i[3],y=d?i[1]:i[2],_=d?i[3]:i[1],b=d&&(h%4===0||h%3===0)&&_%4===0,x=d?_:m*y,$=d?m*y:_,v=[8,8,1],S=r<=8?[4,1,1]:[4,4,1],T=[Math.ceil(x/v[0]/S[0]),Math.ceil($/v[1]/S[1]),Math.ceil(f/v[2]/S[2])];he("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let I=b?d&&h%4!==0?3:4:1,k=v[1]*S[1],z=v[0]*S[0],M=Math.max(v[0]*I,v[1]),O=r%k===0,F=a%z===0,K=n%M===0,G=b?[I,4,4]:[1,1,1],q=[{type:6,data:r},{type:6,data:a},{type:6,data:n},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];li(t,q),q.push(...ee(e[0].dims,e[1].dims));let ue=["rank","rank"];s&&(q.push(...ee(e[2].dims)),ue.push("rank")),q.push(...ee(i));let ae=X=>{let oe=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];ui(t,oe);let J=b?4:1,ie=Re(e[0].dataType),we=`
      fn setOutputAtIndex(flatIndex : i32, value : ${b?`vec4<${ie}>`:ie}) {
        result[flatIndex] = ${b?`vec4<${ie}>`:ie}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b?`vec4<${ie}>`:ie}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b?"/ 4":""}, value);
      }`,N=B("x",e[0].dataType,e[0].dims.length,I===3?1:I),V=B("w",e[1].dataType,e[1].dims.length,J),j=[N,V],te=Y("result",e[0].dataType,i.length,J);if(s){let ke=B("bias",e[2].dataType,e[2].dims.length,J);j.push(ke),we+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b?`vec4<${ie}>`:ie} {
          return bias[coords.${d?"w":"y"}${b?"/ 4":""}];
        }`}return`
        ${Tp("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${X.registerUniforms(oe).declareVariables(...j,te)}
        ${we}
        ${ru(d,O,F,K,s,t,G[0],G[1],G[2],ie)}
        ${b?Ea(S,v,ie,void 0,!d,M):ka(S,v,ie,void 0,!d,M,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${b};${O};${F};${K};${k};${z};${M}`,inputDependencies:ue},getRunData:()=>({outputs:[{dims:u?u(i):i,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:q}),getShaderSource:ae}}}),au,Br,Ai,su,Nr,ou,Ep,kp,$0=H(()=>{re(),Mt(),se(),le(),ci(),rs(),au=e=>{let t=1;for(let i=0;i<e.length;i++)t*=e[i];return t},Br=e=>typeof e=="number"?[e,e,e]:e,Ai=(e,t)=>t<=1?e:e+(e-1)*(t-1),su=(e,t,i,r=1)=>{let a=Ai(t,r);return Math.floor((e[0]*(i-1)-i+a)/2)},Nr=(e,t,i,r,a)=>{a==null&&(a=su(e,t[0],r[0]));let n=[0,0,0,i];for(let s=0;s<3;s++)e[s]+2*a>=t[s]&&(n[s]=Math.trunc((e[s]-t[s]+2*a)/r[s]+1));return n},ou=(e,t,i,r,a,n,s,o,u,d)=>{let h,f,m,y;if(e==="VALID"&&(e=0),typeof e=="number"){h={top:e,bottom:e,left:e,right:e,front:e,back:e};let _=Nr([t,i,r,1],[o,u,d],1,[a,n,s],e);f=_[0],m=_[1],y=_[2]}else if(Array.isArray(e)){if(!e.every((b,x,$)=>b===$[0]))throw Error(`Unsupported padding parameter: ${e}`);h={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let _=Nr([t,i,r,1],[o,u,d],1,[a,n,s],e[0]);f=_[0],m=_[1],y=_[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/a),m=Math.ceil(i/n),y=Math.ceil(r/s);let _=(f-1)*a+o-t,b=(m-1)*n+u-i,x=(y-1)*s+d-r,$=Math.floor(_/2),v=_-$,S=Math.floor(b/2),T=b-S,I=Math.floor(x/2),k=x-I;h={top:S,bottom:T,left:I,right:k,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:h,outDepth:f,outHeight:m,outWidth:y}},Ep=(e,t,i,r,a,n=!1,s="channelsLast")=>{let o,u,d,h,f;if(s==="channelsLast")[o,u,d,h,f]=e;else if(s==="channelsFirst")[o,f,u,d,h]=e;else throw new Error(`Unknown dataFormat ${s}`);let[m,,y,_,b]=t,[x,$,v]=Br(i),[S,T,I]=Br(r),k=Ai(y,S),z=Ai(_,T),M=Ai(b,I),{padInfo:O,outDepth:F,outHeight:K,outWidth:G}=ou(a,u,d,h,x,$,v,k,z,M),q=n?m*f:m,ue=[0,0,0,0,0];return s==="channelsFirst"?ue=[o,q,F,K,G]:s==="channelsLast"&&(ue=[o,F,K,G,q]),{batchSize:o,dataFormat:s,inDepth:u,inHeight:d,inWidth:h,inChannels:f,outDepth:F,outHeight:K,outWidth:G,outChannels:q,padInfo:O,strideDepth:x,strideHeight:$,strideWidth:v,filterDepth:y,filterHeight:_,filterWidth:b,effectiveFilterDepth:k,effectiveFilterHeight:z,effectiveFilterWidth:M,dilationDepth:S,dilationHeight:T,dilationWidth:I,inShape:e,outShape:ue,filterShape:t}},kp=(e,t,i,r,a,n)=>{let s=n==="channelsLast";s?e[0].dims[3]:e[0].dims[1];let o=[64,1,1],u={x:i.map((x,$)=>$)},d=[Math.ceil(au(u.x.map(x=>i[x]))/o[0]),1,1];he("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let h=1,f=R.size(i),m=[{type:12,data:f},{type:12,data:r},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];li(t,m),m.push(...ee(e[0].dims,e[1].dims));let y=["rank","rank"],_=e.length===3;_&&(m.push(...ee(e[2].dims)),y.push("rank")),m.push(...ee(i));let b=x=>{let $=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];ui(t,$);let v=1,S=Re(e[0].dataType),T=B("x",e[0].dataType,e[0].dims.length,h),I=B("W",e[1].dataType,e[1].dims.length,v),k=[T,I],z=Y("result",e[0].dataType,i.length,v),M="";if(_){let K=B("bias",e[2].dataType,e[2].dims.length,v);k.push(K),M+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${S} {
          return bias[${s?Q("coords",4,5):Q("coords",1,5)}];
        }`}let O=De(h,S),F=oi(t,O,S);return`
            ${M}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${T.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${x.registerUniforms($).declareVariables(...k,z)}
          ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${z.offsetToIndices("global_idx")};
              let batch = ${Q("coords",0,T.rank)};
              let d2 = ${s?Q("coords",T.rank-1,T.rank):Q("coords",1,T.rank)};
              let xFRCCorner = vec3<u32>(${s?Q("coords",1,T.rank):Q("coords",2,T.rank)},
              ${s?Q("coords",2,T.rank):Q("coords",3,T.rank)},
              ${s?Q("coords",3,T.rank):Q("coords",4,T.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?Q("uniforms.x_shape",1,T.rank):Q("uniforms.x_shape",2,T.rank)};
              let xShapeZ = ${s?Q("uniforms.x_shape",2,T.rank):Q("uniforms.x_shape",3,T.rank)};
              let xShapeW = ${s?Q("uniforms.x_shape",3,T.rank):Q("uniforms.x_shape",4,T.rank)};
              let xShapeU = ${s?Q("uniforms.x_shape",4,T.rank):Q("uniforms.x_shape",1,T.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${_?"value = value + getBiasByOutputCoords(coords)":""};
              ${F}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${h};${_}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:m}),getShaderSource:b}}}),zp,Mp,x0=H(()=>{re(),se(),le(),ci(),zp=(e,t,i,r)=>{let a=e.length>2,n=a?"value += b[output_channel];":"",s=e[0].dims,o=e[1].dims,u=t.format==="NHWC",d=u?i[3]:i[1],h=d/t.group,f=u&&h>=4?Ce(d):1,m=R.size(i)/f,y=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:h}];li(t,y),y.push(...ee(s,[o[0],o[1],o[2],o[3]/f]));let _=a?["rank","rank","rank"]:["rank","rank"];y.push(...ee([i[0],i[1],i[2],i[3]/f]));let b=x=>{let $=Y("output",e[0].dataType,i.length,f),v=Re($.type.tensor),S=oi(t,$.type.value,v),T=B("x",e[0].dataType,s.length),I=B("w",e[1].dataType,o.length,f),k=[T,I];a&&k.push(B("b",e[2].dataType,e[2].dims,f));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];ui(t,z);let M=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${T.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${I.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${T.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(z).declareVariables(...k,$)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${M}
    ${n}
    ${S}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:b}},Mp=(e,t,i,r)=>{let a=e.length>2,n=Ce(i[3]),s=Ce(i[2]),o=R.size(i)/n/s,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/n],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/n],h=[i[0],i[1],i[2],i[3]/n],f=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];li(t,f),f.push(...ee(u,d,h));let m=(s-1)*t.strides[1]+d[1],y=_=>{let b=Y("output",e[0].dataType,h.length,n),x=Re(b.type.tensor),$=oi(t,b.type.value,x),v=B("x",e[0].dataType,u.length,n),S=B("w",e[1].dataType,d.length,n),T=[v,S];a&&T.push(B("b",e[2].dataType,e[2].dims,n));let I=a?"value += b[output_channel];":"",k=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return ui(t,k),`
  ${_.registerUniforms(k).declareVariables(...T,b)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${v.type.value}, ${m}>;
    var values: array<${b.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${I}
      ${$}
      ${b.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${n};${s};${m};${d[0]};${d[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:y}}}),lu,yn,uu,_n,za,Pr,du,cu,Ma,S0=H(()=>{se(),v0(),$0(),os(),x0(),ci(),ss(),Wt(),lu=(e,t,i,r,a,n)=>{let s=e[0],o=e.slice(n?1:2,n?3:4),u=o.length,d=t[0],h=t.slice(2).map((m,y)=>m+(m-1)*(i[y]-1)),f=o.map((m,y)=>m+r[y]+r[y+u]).map((m,y)=>Math.floor((m-h[y]+a[y])/a[y]));return f.splice(0,0,s),f.splice(n?3:1,0,d),f},yn=[2,3,1,0],uu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let i=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(i!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},_n=(e,t)=>{let i=e.kernelShape.slice();i.length<t[1].dims.length-2&&i.push(...Array(t[1].dims.length-2-i.length).fill(0));for(let n=2;n<t[1].dims.length;++n)i[n-2]===0&&(i[n-2]=t[1].dims[n]);let r=e.pads.slice();Dn.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,i,r,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:i,pads:r}),a},za=e=>{let t=ns(e),i=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,n=e.group,s=e.kernel_shape,o=e.pads,u=e.strides,d=e.w_is_const();return{autoPad:r,format:i,dilations:a,group:n,kernelShape:s,pads:o,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Pr=(e,t,i,r)=>{let a=i.format==="NHWC",n=lu(t[0].dims,t[1].dims,i.dilations,i.pads,i.strides,a);if(i.group!==1){let k=[t[0]];if(a){let z=e.kernelCustomData.wT??e.compute(Xe(t[1],yn),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),k.push(z)}else k.push(t[1]);t.length===3&&k.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===i.group&&t[1].dims[1]===1&&i.dilations[0]===1&&i.dilations[1]===1?e.compute(Mp(k,i,n,r),{inputs:k}):e.compute(zp(k,i,n,r),{inputs:k});return}let s=t.length===3,o=t[0].dims[a?1:2],u=t[0].dims[a?2:3],d=t[0].dims[a?3:1],h=t[1].dims[2],f=t[1].dims[3],m=n[a?1:2],y=n[a?2:3],_=n[a?3:1],b=a&&h===o&&f===u&&i.pads[0]===0&&i.pads[1]===0;if(b||h===1&&f===1&&i.dilations[0]===1&&i.dilations[1]===1&&i.strides[0]===1&&i.strides[1]===1&&i.pads[0]===0&&i.pads[1]===0){let k=n[0],z,M,O,F=[];if(a){let q=e.kernelCustomData.wT??e.compute(Xe(t[1],yn),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];if(i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=q),b){let ue=o*u*d;z=t[0].reshape([1,k,ue]),M=q.reshape([1,ue,_]),O=[1,k,_]}else z=t[0].reshape([k,o*u,d]),M=q.reshape([1,d,_]),O=[k,m*y,_];F.push(z),F.push(M)}else z=t[0].reshape([k,d,o*u]),M=t[1].reshape([1,_,d]),O=[k,_,m*y],F.push(M),F.push(z);s&&F.push(t[2]);let K=O[2],G=F[0].dims[F[0].dims.length-1];K<8&&G<8?e.compute(as(F,i,n,O,a,r),{inputs:F}):e.compute(Nn(F,i,n,O,a,r),{inputs:F});return}let x=!0,$=e.kernelCustomData.wT??e.compute(Xe(t[1],yn),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];s&&v.push(t[2]);let S=a?m*y:_,T=a?_:m*y,I=h*f*d;e.compute(Ip(v,i,n,S,T,I,s,x,r),{inputs:v})},du=(e,t)=>{let i=t.format==="NHWC",r=[e.inputs[0].reshape(i?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],n=[1].concat(t.strides),s=[1].concat(t.dilations),o=[1].concat(t.kernelShape),u=_n({...t,pads:a,strides:n,dilations:s,kernelShape:o},r);Pr(e,r,u,d=>i?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},cu=(e,t,i)=>{let r=i.format==="NHWC"?"channelsLast":"channelsFirst",a=_n(i,t),n=i.autoPad==="NOTSET"?i.pads:i.autoPad,s=Ep(t[0].dims,t[1].dims,i.strides,i.dilations,n,!1,r);e.compute(kp(t,a,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},Ma=(e,t)=>{if(uu(e.inputs,t),e.inputs[0].dims.length===3)du(e,t);else if(e.inputs[0].dims.length===5)cu(e,e.inputs,t);else{let i=_n(t,e.inputs);Pr(e,e.inputs,i)}}}),Ap,C0=H(()=>{re(),Mt(),se(),le(),Ap=(e,t,i)=>{let r=e.length>2,a=t.outputShape,n=t.format==="NHWC",s=t.group,o=e[1].dims,u=o[2]/s,d=o[3],h=n?Ce(u):1,f=n&&d===1&&u>=4,m=f?Math.floor(u/4)*4:Math.floor(u/h)*h,y=u-m,_=n?Ce(d):1,b=n?d===1?h:_:1,x=R.size(a)/_,$=[Math.ceil(x/64),1,1];he("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let v=["rank","rank"],S=[t.strides[0],t.strides[1]],T=[t.kernelShape[n?1:2],t.kernelShape[n?2:3]],I=[t.dilations[0],t.dilations[1]],k=[T[0]+(t.dilations[0]<=1?0:(t.kernelShape[n?1:2]-1)*(t.dilations[0]-1)),T[1]+(t.dilations[1]<=1?0:(t.kernelShape[n?2:3]-1)*(t.dilations[1]-1))],z=[k[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),k[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],M=[{type:12,data:x},{type:12,data:S},{type:12,data:T},{type:12,data:I},{type:12,data:k},{type:6,data:z},{type:12,data:m},{type:12,data:u},{type:12,data:d},...ee(e[0].dims,e[1].dims)];r&&(M.push(...ee(e[2].dims)),v.push("rank")),M.push(...ee(a));let O=F=>{let K=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:T.length},{name:"dilations",type:"u32",length:T.length},{name:"effective_filter_dims",type:"u32",length:k.length},{name:"pads",type:"i32",length:z.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],G=Re(e[0].dataType),q=n?1:2,ue=n?2:3,ae=n?3:1,X=B("W",e[1].dataType,e[1].dims.length,b),oe=B("Dy",e[0].dataType,e[0].dims.length,h),J=[oe,X];r&&J.push(B("bias",e[2].dataType,[a[ae]].length,_));let ie=Y("result",e[0].dataType,a.length,_),we=()=>{let j="";if(f)h===4?j+=`
        let xValue = ${oe.getByOffset("x_offset")};
        let wValue = ${X.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:h===2?j+=`
          dotProd = dotProd + dot(vec4<${G}>(${oe.getByOffset("x_offset")}, ${oe.getByOffset("x_offset + 1u")}), vec4<${G}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:h===1&&(j+=`
          dotProd = dotProd + dot(vec4<${G}>(${oe.getByOffset("x_offset")}, ${oe.getByOffset("x_offset + 1u")}, ${oe.getByOffset("x_offset + 2u")}, ${oe.getByOffset("x_offset + 3u")}), vec4<${G}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}, ${X.getByOffset("w_offset + 2u")}, ${X.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(j+=`
                  let xValue = ${n?oe.getByOffset(`${oe.indicesToOffset(`${oe.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h}`):oe.get("batch","inputChannel","idyR","idyC")};
        `,h===1)j+=`
          let w_offset = ${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${X.getByOffset(`w_offset / ${b}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let te=0;te<h;te++)j+=`
            let wValue${te} = ${X.getByOffset(`${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${te}, wOutChannel)`)} / ${b}`)};
            dotProd = dotProd + xValue[${te}] * wValue${te};`;return j},N=()=>{if(y===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let j="";if(h===1){j+="dotProd = dotProd";for(let te=0;te<y;te++)j+=`
            + ${oe.getByOffset(`x_offset + ${te}`)} * ${X.getByOffset(`w_offset + ${te}`)}`;j+=";"}else if(h===2){if(y!==2)throw new Error(`Invalid inputChannelsRemainder ${y}.`);j+=`
          let xValue = ${oe.getByOffset("x_offset")};
          let wValue = ${X.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return j},V=`
            let outputIndices = ${ie.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${ie.indicesGet("outputIndices",0)};
            let d1 = ${ie.indicesGet("outputIndices",ae)};
            let r = ${ie.indicesGet("outputIndices",q)};
            let c = ${ie.indicesGet("outputIndices",ue)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${ie.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${G}(dyRCorner) + ${G}(wR)) / ${G}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${G}(uniforms.Dy_shape[${q}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${G}(dyCCorner) + ${G}(wC)) / ${G}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${G}(uniforms.Dy_shape[${ue}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${oe.indicesToOffset(`${oe.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h};
                var w_offset = ${X.indicesToOffset(`${X.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${b};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:h}) {
                  ${we()}
                  inputChannel = inputChannel + ${f?4:h};
                }
                ${N()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${_}]`:""};
            ${ie.setByOffset("global_idx","value")};
          `;return`
    ${F.registerUniforms(K).declareVariables(...J,ie)}
      ${F.mainStart()}
      ${F.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${V}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${h}${b}${_}${f}${y}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:i?i(a):a,dataType:e[0].dataType}],programUniforms:M}),getShaderSource:O}}}),hu,pu,fu,Lr,Rp,mu,Ur,gu,Op,T0=H(()=>{C0(),ci(),Wt(),hu=(e,t,i,r,a,n)=>(e-1)*t+i+(r-1)*a+1-n,pu=(e,t,i,r,a)=>{let n=Math.floor(e/2);t==="SAME_UPPER"?(i[r]=n,i[a]=e-n):t==="SAME_LOWER"&&(i[r]=e-n,i[a]=n)},fu=(e,t,i,r,a,n,s,o,u,d)=>{let h=e.length-2,f=d.length===0;u.length<h&&u.push(...Array(h-u.length).fill(0));let m=e[0],y=t[o?3:1]*a;for(let _=0,b=e.length-h-(o?1:0);_<h;++_,++b){let x=e[b],$=f?x*s[_]:d[_],v=hu(x,s[_],n[_],t[b],i[_],$);pu(v,r,n,_,_+h),f&&d.push(s[_]*(x-1)+u[_]+(t[b]-1)*i[_]+1-n[_]-n[_+h])}d.splice(0,0,m),d.splice(o?3:1,0,y)},Lr=(e,t)=>{let i=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,m)=>f*m,1)===0){i.length=0;for(let f=2;f<t[1].dims.length;++f)i.push(t[1].dims[f])}let r=e.format==="NHWC";i.splice(0,0,t[1].dims[0]),i.splice(r?3:1,0,t[1].dims[1]);let a=e.pads.slice(),n=e.outputShape.slice(),s=e.outputPadding.slice(),o=t[0].dims,u=e.dilations.slice();if(u.reduce((f,m)=>f+m,0)===0){let f=t[0].dims.length-2;u=new Array(f).fill(1)}let d=e.strides.slice();if(d.reduce((f,m)=>f+m,0)===0){let f=t[0].dims.length-2;d=new Array(f).fill(1)}fu(o,i,u,e.autoPad,e.group,a,d,r,s,n);let h=Object.assign({},e);return Object.assign(h,{kernelShape:i,pads:a,outputPadding:s,outputShape:n,dilations:u,strides:d}),h},Rp=e=>{let t=ns(e),i=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,n=e.group,s=e.kernelShape,o=e.pads,u=e.strides,d=e.wIsConst(),h=e.outputPadding,f=e.outputShape;return{autoPad:r,format:i,dilations:a,group:n,kernelShape:s,outputPadding:h,outputShape:f,pads:o,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},mu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let i=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(i!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((s,o)=>s+o,0)>0&&t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.reduce((s,o)=>s+o,0)>0&&t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.reduce((s,o)=>s+o,0)>0&&t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((s,o)=>s+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Ur=(e,t,i,r)=>{let a=e.kernelCustomData.wT??e.compute(Xe(t[1],[2,3,0,1]),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let n=[t[0],a];t.length===3&&n.push(t[2]),e.compute(Ap(n,i,r),{inputs:n})},gu=(e,t)=>{let i=t.format==="NHWC",r=[e.inputs[0].reshape(i?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let n=t.dilations;(n.length===0||n[0]===0)&&(n=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],s=[1].concat(s),n=[1].concat(n),a=[1].concat(a);let u=t.outputPadding;u=[0].concat(u);let d=Lr({...t,pads:o,strides:s,dilations:n,kernelShape:a,outputPadding:u},r);Ur(e,r,d,h=>i?[h[0],h[2],h[3]]:[h[0],h[1],h[3]])},Op=(e,t)=>{if(mu(e.inputs,t),e.inputs[0].dims.length===3)gu(e,t);else{let i=Lr(t,e.inputs);Ur(e,e.inputs,i)}}}),yu,Dp,Bp,I0=H(()=>{re(),se(),Te(),le(),yu=(e,t,i,r)=>{let a=R.size(t),n=t.length,s=B("input",e,n),o=Y("output",e,n),u=i.dataType===6?i.getInt32Array()[0]:Number(i.getBigInt64Array()[0]),d=R.normalizeAxis(u,n),h=f=>{let m=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,y=Q("uniforms.input_shape","uniforms.axis",n),_=r.reverse?m+(r.exclusive?" + 1":""):"0",b=r.reverse?y:m+(r.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,o)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:d},...ee(t,t)]}),getShaderSource:h}},Dp=(e,t)=>{let i=e.inputs[0].dims,r=e.inputs[0].dataType,a=e.inputs[1];e.compute(yu(r,i,a,t),{inputs:[0]})},Bp=e=>{let t=e.exclusive===1,i=e.reverse===1;return me({exclusive:t,reverse:i})}}),_u,bu,wu,Np,Pp,E0=H(()=>{re(),se(),Te(),le(),_u=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},bu=(e,t,i,r)=>{let a=[];a.push(`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`);for(let n=0;n<t;++n)a.push(i.indicesSet("a",e[n],`i[${n}]`));return a.push("return a;}"),a.join(`
`)},wu=(e,t)=>{let i,r,a,n,s,o,u=t.format==="NHWC",d=t.blocksize,h=t.mode==="DCR";u?([i,r,a,n]=e.dims,s=h?[i,r,a,d,d,n/d**2]:[i,r,a,n/d**2,d,d],o=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([i,r,a,n]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=h?[i,d,d,n/d**2,r,a]:[i,n/d**2,d,d,r,a],o=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(s),m=f.dims.length,y=e.dataType,_=B("a",y,m),b=Y("output",y,m),x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(_,b)}

  ${bu(o,m,_,b)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=u?[i,r*d,a*d,n/d**2]:[i,n/d**2,r*d,a*d],S=R.size(v),T=f.dims,I=R.sortBasedOnPerm(T,o);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...ee(T,I)]}},getShaderSource:x}},Np=(e,t)=>{_u(e.inputs),e.compute(wu(e.inputs[0],t))},Pp=e=>me({blocksize:e.blocksize,mode:e.mode,format:e.format})}),bn,Ri,Fr,vu,$u,xu,Su,Hr,Cu,Lp,Up,k0=H(()=>{re(),se(),Te(),le(),bn="[a-zA-Z]|\\.\\.\\.",Ri="("+bn+")+",Fr="^"+Ri+"$",vu="("+Ri+",)*"+Ri,$u="^"+vu+"$",xu=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let i=this.symbolToIndices.get(e);i===void 0?i=[t]:i.push(t),this.symbolToIndices.set(e,i)}},Su=class{constructor(e,t){var a;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[i,r]=t.includes("->")?t.split("->",2):[t,""];if(!i.match(RegExp($u)))throw new Error("Invalid LHS term");if(i.split(",").forEach((n,s)=>{let o=e[s].dims.slice();if(!n.match(RegExp(Fr)))throw new Error("Invalid LHS term");let u=this.processTerm(n,!0,o,s);this.lhs.push(u)}),r==="")r+=[...this.symbolToInfo.entries()].filter(([n,s])=>s.count===1||n==="...").map(([n])=>n).join("");else if(!r.match(RegExp(Ri)))throw new Error("Invalid RHS");(a=r.match(RegExp(bn,"g")))==null||a.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(n);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,i){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw new Error("Dimension mismatch");r.count++,r.inputIndices.push(i)}else r={count:1,dimValue:t,inputIndices:[i]};this.symbolToInfo.set(e,r)}processTerm(e,t,i,r=-1){let a=i.length,n=!1,s=[],o=0;if(!e.match(RegExp(Fr))&&!t&&e!=="")throw new Error("Invalid LHS term");let u=e.match(RegExp(bn,"g")),d=new xu(r);return u==null||u.forEach((h,f)=>{if(h==="..."){if(n)throw new Error("Only one ellipsis is allowed per input term");n=!0;let m=a-u.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(s=i.slice(o,o+m),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<s.length;y++){let _=String.fromCharCode(48+y);d.addSymbol(_,f+y),this.addSymbol(_,i[o++],r)}}else d.addSymbol(h,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,i[o++],r)}),d}},Hr=e=>e+"_max",Cu=(e,t,i,r)=>{let a=e.map(d=>d.length).map((d,h)=>B(`input${h}`,t,d)),n=R.size(r),s=Y("output",t,r.length),o=[...i.symbolToInfo.keys()].filter(d=>!i.rhs.symbolToIndices.has(d)),u=d=>{let h=[],f="var prod = 1.0;",m="var sum = 0.0;",y="sum += prod;",_=[],b=[],x=[],$=[],v=i.symbolToInfo.size===i.rhs.symbolToIndices.size;i.symbolToInfo.forEach((T,I)=>{var k;if(i.rhs.symbolToIndices.has(I)){let z=(k=i.rhs.symbolToIndices.get(I))==null?void 0:k[0];z!==void 0&&i.lhs.forEach((M,O)=>{if(T.inputIndices.includes(O)){let F=M.symbolToIndices.get(I);if(F===void 0)throw new Error("Invalid symbol error");F.forEach(K=>{h.push(`${a[O].indicesSet(`input${O}Indices`,K,s.indicesGet("outputIndices",z))}`)})}})}else i.lhs.forEach((z,M)=>{if(T.inputIndices.includes(M)){let O=z.symbolToIndices.get(I);if(O===void 0)throw new Error("Invalid symbol error");O.forEach(F=>{_.push(`${a[M].indicesSet(`input${M}Indices`,F,`${I}`)}`)}),$.push(`prod *= ${a[M].getByIndices(`input${M}Indices`)};`)}}),b.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${Hr(I)}; ${I}++) {`),x.push("}")});let S=v?[...h,`let sum = ${a.map((T,I)=>T.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...h,m,...b,..._,f,...$,y,...x];return`
            ${d.registerUniforms(o.map(T=>({name:`${Hr(T)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((T,I)=>`var input${I}Indices: ${a[I].type.indices};`).join(`
`)}
            ${S.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:i.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=o.filter(f=>i.symbolToInfo.has(f)).map(f=>{var m;return{type:12,data:((m=i.symbolToInfo.get(f))==null?void 0:m.dimValue)||0}});d.push({type:12,data:n});let h=e.map((f,m)=>[...ee(f)]).reduce((f,m)=>f.concat(m),d);return h.push(...ee(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h}},getShaderSource:u}},Lp=(e,t)=>{let i=new Su(e.inputs,t.equation),r=i.outputDims,a=e.inputs.map((n,s)=>n.dims);e.compute(Cu(a,e.inputs[0].dataType,i,r))},Up=e=>{let t=e.equation.replace(/\s+/g,"");return me({equation:t})}}),Tu,Wr,Iu,Eu,Fp,z0=H(()=>{re(),se(),le(),Tu=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,i=Array.from(e[1].getBigInt64Array(),Number),r=i.length<t.length?0:i.length-t.length,a=t.length<i.length?0:t.length-i.length;for(;r<i.length&&a<t.length;++r,++a)if(i[r]!==t[a]&&i[r]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Wr=(e,t)=>{let i=e.length-t.length,r=[];for(let a=0;a<i;++a)r.push(e[a]);for(let a=0;a<t.length;++a)r.push(t[a]===1?e[a+i]:t[a]);return r},Iu=(e,t)=>e.length>t.length?Wr(e,t):Wr(t,e),Eu=e=>{let t=e[0].dims,i=Array.from(e[1].getBigInt64Array(),Number),r=Iu(t,i),a=e[0].dataType,n=a===9||R.size(t)===1,s=a===9||t.length>0&&t[t.length-1]%4===0?4:1,o=n||r.length>0&&r[r.length-1]%4===0?4:1,u=Math.ceil(R.size(r)/o),d=f=>{let m=B("input",a,t.length,s),y=Y("output",a,r.length,o),_;if(a===9){let b=(x,$,v="")=>`
          let outputIndices${$} = ${y.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${m.broadcastedIndicesToOffset(`outputIndices${$}`,y)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${x}[${$}] = ${v}(${m.getByOffset(`index${$}`)}[component${$}]);
        `;_=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${y.setByOffset("global_idx","data")}
      }`}else _=`
        let outputIndices = ${y.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",y)};
        let data = ${y.type.value}(${m.getByOffset(`inputOffset / ${s}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(m,y)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`},h=[{type:12,data:u},...ee(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${s}${o}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h})}},Fp=e=>{Tu(e.inputs),e.compute(Eu(e.inputs),{inputs:[0]})}}),ku,Hp,M0=H(()=>{re(),se(),le(),is(),ku=e=>{let t=e[0].dataType,i=R.size(e[0].dims),r=R.size(e[1].dims),a=r%4===0,n=s=>{let o=B("x",t,[1],4),u=B("bias",t,[1],4),d=Y("y",t,[1],4),h=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${u.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,m=a?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(h).declareVariables(o,u,d)}

    ${Ta(Le(t))}

    ${s.mainStart(wi)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",Ia("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:n,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(i/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(i/wi/4)}})}},Hp=e=>{e.inputs.length<2||R.size(e.inputs[1].dims)===0?lp(e):e.compute(ku(e.inputs))}}),zu,Mu,Wp,Vp,A0=H(()=>{re(),se(),Te(),le(),zu=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Mu=(e,t)=>{let i=e[0].dims,r=e[1].dims,a=i.length,n=R.normalizeAxis(t.axis,a),s=i.slice(0);s.splice(n,1,...r);let o=i[n],u=e[0].dataType===9?4:1,d=Math.ceil(R.size(s)/u),h=[{type:12,data:d},{type:6,data:o},{type:12,data:n},...ee(e[0].dims,e[1].dims,s)],f=m=>{let y=B("data",e[0].dataType,e[0].dims.length,u),_=B("inputIndices",e[1].dataType,e[1].dims.length),b=Y("output",e[0].dataType,s.length,u),x=v=>{let S=r.length,T=`var indicesIndices${v}  = ${_.type.indices}(0);`;for(let I=0;I<S;I++)T+=`${S>1?`indicesIndices${v}[${I}]`:`indicesIndices${v}`} = ${s.length>1?`outputIndices${v}[uniforms.axis + ${I}]`:`outputIndices${v}`};`;T+=`
          var idx${v} = ${_.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${y.type.indices};
        `;for(let I=0,k=0;I<a;I++)I===n?(T+=`${a>1?`dataIndices${v}[${I}]`:`dataIndices${v}`} = u32(idx${v});`,k+=S):(T+=`${a>1?`dataIndices${v}[${I}]`:`dataIndices${v}`} = ${s.length>1?`outputIndices${v}[${k}]`:`outputIndices${v}`};`,k++);return T},$;if(e[0].dataType===9){let v=(S,T,I="")=>`
          let outputIndices${T} = ${b.offsetToIndices(`outputOffset + ${T}u`)};
          ${x(T)};
          let offset${T} = ${y.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${S}[${T}] = ${I}(${y.getByOffset(`index${T}`)}[component${T}]);
        `;$=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${b.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${y.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,_,b)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:f}},Wp=e=>me({axis:e.axis}),Vp=(e,t)=>{let i=e.inputs;zu(i),e.compute(Mu(e.inputs,t))}}),Au,Gp,qp,R0=H(()=>{re(),se(),le(),Au=(e,t,i,r,a,n,s,o,u)=>{let d=[{type:12,data:n},{type:12,data:r},{type:12,data:a},{type:12,data:i},{type:12,data:s},{type:12,data:o},{type:12,data:u}],h=[n];d.push(...ee(t.dims,h));let f=m=>{let y=B("indices_data",t.dataType,t.dims.length),_=Y("input_slice_offsets_data",12,1,1),b=[y,_],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:i.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(x).declareVariables(...b)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${i.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${i.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:h,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:d}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},Gp=(e,t)=>{let i=e.inputs,r=i[0].dims,a=i[0].dataType,n=i[1].dims,s=n[n.length-1],o=R.sizeToDimension(n,n.length-1),u=R.sizeFromDimension(r,t.batchDims+s),d=R.sizeToDimension(r,t.batchDims),h=R.sizeFromDimension(r,t.batchDims),f=o/d,m=new Array(s),y=u;for(let T=0;T<s;++T)m[s-1-T]=y,y*=r[t.batchDims+s-1-T];let _=Au(e,i[1],m,t.batchDims,r,o,f,h,s),b=t.batchDims+s;if(b>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=n.slice(0,-1).concat(r.slice(b)),$=R.size(x),v=[{type:12,data:$},{type:12,data:u},...ee(i[0].dims,_.dims,x)],S=T=>{let I=B("data",i[0].dataType,i[0].dims.length),k=B("slice_offsets",12,_.dims.length),z=Y("output",i[0].dataType,x.length);return`
          ${T.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,k,z)}
            ${T.mainStart()}
            ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:a}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:v}),getShaderSource:S},{inputs:[i[0],_]})},qp=e=>({batchDims:e.batch_dims,cacheKey:""})}),Ru,Ou,jp,Kp,O0=H(()=>{re(),se(),Te(),le(),Ru=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let i=R.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,a=e[0],n=e[2],s=e.length===4?e[3]:void 0;if(n.dims.length!==a.dims.length||!a.dims.map((o,u)=>u===i?Math.ceil(o/r)===n.dims[u]:o===n.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==n.dims.length||!s.dims.map((o,u)=>o===n.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Ou=(e,t)=>{let i=e[0].dims,r=e[1].dims,a=i.length,n=R.normalizeAxis(t.gatherAxis,a),s=R.normalizeAxis(t.quantizeAxis,a),o=i.slice(0);o.splice(n,1,...r);let u=R.size(o),d=e[2].dataType,h=e[0].dataType===22,f=[{type:12,data:u},{type:12,data:s},{type:12,data:n},{type:12,data:t.blockSize},...ee(...e.map((y,_)=>y.dims),o)],m=y=>{let _=B("data",e[0].dataType,e[0].dims.length),b=B("inputIndices",e[1].dataType,e[1].dims.length),x=B("scales",e[2].dataType,e[2].dims.length),$=e.length>3?B("zeroPoint",e[3].dataType,e[3].dims.length):void 0,v=Y("output",d,o.length),S=[_,b,x];$&&S.push($);let T=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(T).declareVariables(...S,v)}
        ${y.mainStart()}
        let output_indices = ${v.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${v.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${v.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${v.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${i[n]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${v.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${x.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${x.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${x.getByIndices("scale_indices")};
        ${$?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${$.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${$.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Le(d)}(quantized_data - zero_point) * scale;
        ${v.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,_)=>_!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,_)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:d}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:m}},jp=(e,t)=>{let i=e.inputs;Ru(i,t),e.compute(Ou(e.inputs,t))},Kp=e=>me({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Du,Bu,Zp,Yp,D0=H(()=>{re(),se(),Te(),le(),Du=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Bu=(e,t)=>{let i=e[0].dims,r=e[0].dataType,a=i.length,n=e[1].dims,s=e[1].dataType,o=R.normalizeAxis(t.axis,a),u=i[o],d=n.slice(0),h=R.size(d),f=B("input",r,a),m=B("indicesInput",s,n.length),y=Y("output",r,d.length),_=[{type:12,data:h},{type:6,data:u},{type:12,data:o}];return _.push(...ee(i,n,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:b=>`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,y)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},Zp=e=>me({axis:e.axis}),Yp=(e,t)=>{let i=e.inputs;Du(i),e.compute(Bu(e.inputs,t))}}),Nu,Pu,Xp,Jp,B0=H(()=>{re(),se(),le(),Nu=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Pu=(e,t)=>{let i=e[0].dims.slice(),r=e[1].dims.slice(),[a,n,s]=Zc.getShapeOfGemmResult(i,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),o=[a,n];if(!o)throw new Error("Can't use gemm on the given tensors");let u=16,d=Math.ceil(n/u),h=Math.ceil(a/u),f=!0,m=R.size(o),y=[{type:12,data:f?d:m},{type:12,data:a},{type:12,data:n},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],_=["type","type"];e.length===3&&(y.push(...ee(e[2].dims)),_.push("rank")),y.push(...ee(o));let b=$=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",T=B("a",e[0].dataType,e[0].dims),I=B("b",e[1].dataType,e[1].dims),k=T.type.value,z=null,M=[T,I];e.length===3&&(z=B("c",e[2].dataType,e[2].dims.length),M.push(z));let O=Y("output",e[0].dataType,o.length);M.push(O);let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(F).declareVariables(...M)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${k}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${S}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",O)}; value += ${k}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=$=>{let v=B("a",e[0].dataType,e[0].dims),S=B("b",e[1].dataType,e[1].dims),T=null,I=[v,S];e.length===3&&(T=B("c",e[2].dataType,e[2].dims.length),I.push(T));let k=Y("output",e[0].dataType,o.length);I.push(k);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],M="",O="";t.transA&&t.transB?(O=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(O=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,M="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(O=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(O=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,M="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let F=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(z).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${u}>, ${u}>;
  ${$.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${k.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${O}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${M}
      }
      workgroupBarrier();
    }

    ${F}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",k)}; value += ${k.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:d*h},programUniforms:y}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:b}},Xp=e=>{let t=e.transA,i=e.transB,r=e.alpha,a=e.beta;return{transA:t,transB:i,alpha:r,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Jp=(e,t)=>{Nu(e.inputs),e.compute(Pu(e.inputs,t))}}),ft,Tt,Zt,Yt,Lu,Uu,Fu,Hu,Wu,Vu,Gu,qu,Qp,ef,N0=H(()=>{re(),se(),Te(),le(),[ft,Tt,Zt,Yt]=[0,1,2,3],Lu=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Uu=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Fu=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Hu=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Wu=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Vu=(e,t,i)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${ft}] = batch;
     indices[${Tt}] = channel;`+(()=>{switch(i.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Zt}] = u32(r);
            indices[${Yt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Zt}] = u32(clamp(r, 0, H - 1));
          indices[${Yt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Zt}] = gs_reflect(r, border[1], border[3]);
          indices[${Yt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${i.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Gu=(e,t,i)=>(()=>{switch(i.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${ft}], indices[${Tt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${ft}], indices[${Tt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${ft}], indices[${Tt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${ft}], indices[${Tt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${ft}], indices[${Tt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${ft}], indices[${Tt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${i.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,qu=(e,t)=>{let i=B("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=B("grid",e[1].dataType,r.length,2),n=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(n=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[ft,Tt,Zt,Yt]=[0,3,1,2]);let s=Y("output",e[0].dataType,n.length),o=i.type.value,u=R.size(n),d=[{type:12,data:u},...ee(e[0].dims,r,n)],h=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(i,a,s)}
  ${Uu}
  ${Fu(o)}
  ${Hu(t)}
  ${Wu(t)}
  ${Vu(i,o,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Zt}]);
      let W_in = i32(uniforms.x_shape[${Yt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${ft}], indices[${Zt}], indices[${Yt}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Gu(s,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let m=R.size(n);return{outputs:[{dims:n,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:d}},getShaderSource:h}},Qp=(e,t)=>{Lu(e.inputs),e.compute(qu(e.inputs,t))},ef=e=>me({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),He,ju,tf,Vr,Ku,Hi,nf,rf=H(()=>{re(),se(),Te(),Ja(),ts(),le(),Wt(),He=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,ju=(e,t)=>{let i=e[0],r=He(e,1),a=He(e,2),n=He(e,3),s=He(e,4),o=He(e,5),u=He(e,6),d=He(e,7);if(i.dims.length!==3&&i.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let h=i.dims[0],f=i.dims[1],m=i.dims.length===3?i.dims[2]:t.numHeads*i.dims[4],y=f,_=0,b=0,x=Math.floor(m/t.numHeads);if(u&&d&&R.size(u.dims)&&R.size(d.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==h||u.dims[1]!==t.numHeads||u.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==h||d.dims[1]!==t.numHeads||d.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=u.dims[2],b=u.dims[2]}else if(u&&R.size(u.dims)||d&&R.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(r&&R.size(r.dims)>0){if(i.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==i.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,y=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,y=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,y=r.dims[2]}}else{if(i.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(i.dims[2]!==t.numHeads||i.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(n&&R.size(n.dims)>0){if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=_+y,S=0;if(s&&R.size(s.dims)>0){S=8;let z=s.dims;throw z.length===1?z[0]===h?S=1:z[0]===3*h+2&&(S=3):z.length===2&&z[0]===h&&z[1]===v&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,I=m;if(a&&R.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(y!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=a.dims[2]}else{if(y!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=a.dims[1]*a.dims[3],T=!0}}let k=!1;if(s&&R.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(o&&R.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==h||o.dims[1]!==t.numHeads||o.dims[2]!==f||o.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:h,sequenceLength:f,pastSequenceLength:_,kvSequenceLength:y,totalSequenceLength:v,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:m,vHiddenSize:I,headSize:x,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:k,passPastInKv:T,qkvFormat:$}},tf=e=>me({...e}),Vr=me({perm:[0,2,1,3]}),Ku=(e,t,i,r,a,n,s)=>{let o=[r,a,n],u=R.size(o),d=[{type:12,data:u},{type:12,data:s},{type:12,data:n}],h=f=>{let m=Y("qkv_with_bias",t.dataType,o),y=B("qkv",t.dataType,o),_=B("bias",i.dataType,o),b=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(b).declareVariables(y,_,m)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:h},{inputs:[t,i],outputs:[-1]})[0]},Hi=(e,t,i,r,a,n,s,o)=>{let u=n;if(s&&R.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=Ku(e,n,s,t,r,i*a,o),u=u.reshape([t,r,i,a]),i===1||r===1?u:e.compute(Xe(u,Vr.perm),{inputs:[u],outputs:[-1]})[0]}else return n.dims.length===3&&(u=n.reshape([t,r,i,a])),i===1||r===1?u:e.compute(Xe(u,Vr.perm),{inputs:[u],outputs:[-1]})[0]},nf=(e,t)=>{let i=ju(e.inputs,t),r=e.inputs[0],a=He(e.inputs,1),n=He(e.inputs,2),s=He(e.inputs,3),o=He(e.inputs,4),u=He(e.inputs,5),d=He(e.inputs,6),h=He(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if((a==null?void 0:a.dims.length)===5)throw new Error("Packed KV is not implemented");let f=a&&n&&a.dims.length===4&&n.dims.length===4,m=Hi(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,r,s,0);if(f)return Yi(e,m,a,n,o,void 0,d,h,u,i);if(!a||!n)throw new Error("key and value must be provided");let y=Hi(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.headSize,a,s,i.hiddenSize),_=Hi(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.vHeadSize,n,s,2*i.hiddenSize);Yi(e,m,y,_,o,void 0,d,h,u,i)}}),Zu,Yu,Xu,Ju,Aa,af,sf,of=H(()=>{re(),se(),Te(),le(),Zu=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Yu=(e,t)=>{let i=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>i.push(Number(a))),r=i.length),me({numOutputs:r,axis:t.axis,splitSizes:i})},Xu=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Q("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Ju=e=>{let t=e.length,i=[];for(let r=0;r<t;++r){let a=e[r].setByIndices("indices","input[global_idx]");t===1?i.push(a):r===0?i.push(`if (output_number == ${r}u) { ${a} }`):r===t-1?i.push(`else { ${a} }`):i.push(`else if (output_number == ${r}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${i.join(`
`)}
      }`},Aa=(e,t)=>{let i=e[0].dims,r=R.size(i),a=e[0].dataType,n=R.normalizeAxis(t.axis,i.length),s=new Array(t.numOutputs),o=B("input",a,i.length),u=new Array(t.numOutputs),d=[],h=[],f=0,m=[{type:12,data:r}];for(let _=0;_<t.numOutputs;_++){f+=t.splitSizes[_],u[_]=f;let b=i.slice();b[n]=t.splitSizes[_],h.push(b),s[_]=Y(`output${_}`,a,b.length),d.push({dims:h[_],dataType:e[0].dataType})}m.push({type:12,data:u},...ee(i,...h));let y=_=>`
  ${_.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(o,...s)}
  ${Xu(u.length)}
  ${Ju(s)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Q("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${o.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:m})}},af=(e,t)=>{Zu(e.inputs);let i=e.inputs.length===1?t:Yu(e.inputs,t);e.compute(Aa(e.inputs,i),{inputs:[0]})},sf=e=>{let t=e.axis,i=e.splitSizes,r=e.numOutputs<0?i.length:e.numOutputs;if(r!==i.length)throw new Error("numOutputs and splitSizes length must be equal");return me({axis:t,numOutputs:r,splitSizes:i})}}),Qu,Pn,lf,uf=H(()=>{re(),se(),Te(),le(),Qu=(e,t)=>{let[i,r,a,n]=e,{numHeads:s,rotaryEmbeddingDim:o}=t;if(i.dims.length!==3&&i.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${i.dims.length}`);if(!R.areEqual(r.dims,[])&&!R.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!R.areEqual(a.dims,n.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=i.dims[0],d=i.dims[i.dims.length-2],h=a.dims[0],f=R.sizeFromDimension(i.dims,1)/d,m=o===0?a.dims[1]*2:f/s;if(o>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(u!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(d!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(m/2!==a.dims[1]&&o/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(d>h)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Pn=(e,t)=>{let{interleaved:i,numHeads:r,rotaryEmbeddingDim:a,scale:n}=t,s=e[0].dims[0],o=R.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],d=o/u,h=e[2].dims[1],f=a===0?h*2:d/r,m=new Array(s,u,d/f,f-h),y=R.computeStrides(m),_=[{type:1,data:n},{type:12,data:m},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[o,d,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,f,u*f,1]}):[],...ee(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],b=x=>{let $=B("input",e[0].dataType,e[0].dims.length),v=B("position_ids",e[1].dataType,e[1].dims.length),S=B("cos_cache",e[2].dataType,e[2].dims.length),T=B("sin_cache",e[3].dataType,e[3].dims.length),I=Y("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${x.declareVariables($,v,S,T,I)}

        ${x.mainStart(wi)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",Y("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${i});
            let j = i + select(half_rotary_emb_dim, 1, ${i});
            let re = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:me({interleaved:i}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(m)/wi)},programUniforms:_})}},lf=(e,t)=>{Qu(e.inputs,t),e.compute(Pn(e.inputs,t))}}),ed,td,Gr,id,df,P0=H(()=>{Te(),re(),ts(),rf(),of(),Wt(),uf(),le(),ed=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let i=e[0],r=e[1],a=e[2],n=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(i.dims.length!==3&&i.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,u=i.dims[0],d=i.dims[1],h=i.dims.length===3?o?i.dims[2]/3:i.dims[2]:t.numHeads*i.dims[4],f=d,m=0,y=!r||r.dims.length===0,_=Math.floor(y?h/(t.numHeads+2*t.kvNumHeads):h/t.numHeads);y&&(h=_*t.numHeads);let b=n&&n.dims.length!==0,x=s&&s.dims.length!==0;if(b&&n.dims.length===4&&n.dims[0]===u&&n.dims[1]!==t.kvNumHeads&&n.dims[2]===t.kvNumHeads&&n.dims[3]===_)throw new Error("BSNH pastKey/pastValue is not supported");if(b&&x){if(n.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=n.dims[2]}else if(b||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(r&&r.dims.length>0){if(i.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(i.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');f=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=r.dims[2]}}else{if(i.dims.length!==3&&i.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(i.dims.length===5&&(i.dims[2]!==t.numHeads||i.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let v=0,S=!1,T=t.kvNumHeads?_*t.kvNumHeads:h;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(f!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');T=a.dims[2]}else{if(f!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');T=a.dims[1]*a.dims[3],S=!0}}let I=e.length>4?e[5]:void 0;if(I&&I.dims.length!==1&&I.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:h,vHiddenSize:T,headSize:_,vHeadSize:Math.floor(T/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:S,qkvFormat:$}},td=me({perm:[0,2,1,3]}),Gr=(e,t,i)=>{let r=t,a=i.kvNumHeads;return t.dims.length===3&&i.kvSequenceLength!==0&&(r=t.reshape([i.batchSize,i.kvSequenceLength,a,i.headSize]),r=e.compute(Xe(r,td.perm),{inputs:[r],outputs:[-1]})[0]),r},id=(e,t,i,r)=>{let a=7,n=["type","type"],s=[e*t],o=e*t,u=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],d=h=>{let f=B("seq_lens",i.dataType,i.dims),m=B("total_seq_lens",r.dataType,r.dims),y=Y("pos_ids",a,s),_=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${h.registerUniforms(_).declareVariables(f,m,y)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${y.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${y.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:n},getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:d}},df=(e,t)=>{var T;let i=ed(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((T=e.inputs[1])==null?void 0:T.dims.length)===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,n=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,f=me({axis:2,numOutputs:3,splitSizes:[i.numHeads*i.headSize,h*i.headSize,h*i.headSize]}),[m,y,_]=!a&&!n?e.compute(Aa([r],f),{inputs:[r],outputs:[-1,-1,-1]}):[r,a,n],b,x;if(t.doRotary){let I=e.compute(id(i.batchSize,i.sequenceLength,u,d),{inputs:[u,d],outputs:[-1]})[0],k=e.inputs[7],z=e.inputs[8],M=me({interleaved:t.rotaryInterleaved!==0,numHeads:i.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),O=[m,I,k,z],F=[-1];b=e.compute(Pn(O,M),{inputs:O,outputs:F})[0],O.splice(0,1,y);let K=me({interleaved:t.rotaryInterleaved!==0,numHeads:i.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});x=e.compute(Pn(O,K),{inputs:O,outputs:F})[0]}let $=Hi(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,t.doRotary?b:m,void 0,0),v=Gr(e,t.doRotary?x:y,i),S=Gr(e,_,i);Yi(e,$,v,S,void 0,void 0,s,o,void 0,i,u,d)}}),qr,nd,rd,cf,L0=H(()=>{re(),se(),Wt(),le(),qr=(e,t,i,r,a,n,s,o)=>{let u=Ce(n),d=u===1?"f32":`vec${u}f`,h=u===1?"vec2f":`mat2x${u}f`,f=a*s,m=64;f===1&&(m=256);let y=[a,s,n/u],_=[a,s,2],b=["rank","type","type"],x=[];x.push(...ee(y,_));let $=v=>{let S=B("x",t.dataType,3,u),T=B("scale",i.dataType,i.dims),I=B("bias",r.dataType,r.dims),k=Y("output",1,3,2),z=[S,T,I,k];return`
  var<workgroup> workgroup_shared : array<${h}, ${m}>;
  const workgroup_size = ${m}u;
  ${v.declareVariables(...z)}
  ${v.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${S.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${h}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Ft("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${Ft("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${o};${m}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:_,dataType:1}],dispatchGroup:{x:f},programUniforms:x}),getShaderSource:$},{inputs:[t,i,r],outputs:[-1]})[0]},nd=(e,t,i)=>{let r=t[0].dims,a=r,n=2,s=r[0],o=r[1],u=R.sizeFromDimension(r,n),d=Ce(u),h=R.size(a)/d,f=qr(e,t[0],t[1],t[2],s,u,o,i.epsilon),m=[s,o,u/d],y=[s,o],_=["type","none"],b=x=>{let $=B("x",t[0].dataType,m.length,d),v=B("scale_shift",1,y.length,2),S=Y("output",t[0].dataType,m.length,d),T=[$,v,S];return`
  ${x.registerUniform("output_size","u32").declareVariables(...T)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...ee(m,y,m)]}),getShaderSource:b},{inputs:[t[0],f]})},rd=(e,t,i)=>{let r=t[0].dims,a=r,n=r[0],s=r[r.length-1],o=R.sizeFromDimension(r,1)/s,u=Ce(s),d=R.size(a)/u,h=[{type:12,data:o},{type:12,data:Math.floor(s/u)}],f=["type","type"],m=!1,y=[0,r.length-1];for(let $=0;$<r.length-2;$++)m=m||r[$+1]!==1,y.push($+1);m=m&&r[r.length-1]!==1;let _=m?e.compute(Xe(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},($,v)=>r[y[v]])),b=qr(e,_,t[1],t[2],n,o,s,i.epsilon),x=$=>{let v=Re(t[0].dataType),S=u===1?"vec2f":`mat${u}x2f`,T=z=>{let M=z===0?"x":"y",O=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${v}(${O}(scale.${M}))`;case 2:return`vec2<${v}>(${O}(scale[0].${M}, scale[1].${M}))`;case 4:return`vec4<${v}>(${O}(scale[0].${M}, scale[1].${M}, scale[2].${M}, scale[3].${M}))`;default:throw new Error(`Not supported compoents ${u}`)}},I=B("input",t[0].dataType,t[0].dims,u),k=Y("output",t[0].dataType,a,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${k.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:x},{inputs:[t[0],b]})},cf=(e,t)=>{t.format==="NHWC"?rd(e,e.inputs,t):nd(e,e.inputs,t)}}),ad,sd,hf,U0=H(()=>{re(),se(),le(),ad=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},sd=(e,t,i)=>{let r=t.simplified,a=e[0].dims,n=e[1],s=!r&&e[2],o=a,u=R.normalizeAxis(t.axis,a.length),d=R.sizeToDimension(a,u),h=R.sizeFromDimension(a,u),f=R.size(n.dims),m=s?R.size(s.dims):0;if(f!==h||s&&m!==h)throw new Error(`Size of X.shape()[axis:] == ${h}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${m}`);let y=[];for(let I=0;I<a.length;++I)I<u?y.push(a[I]):y.push(1);let _=Ce(h),b=["type","type"],x=[{type:12,data:d},{type:1,data:h},{type:12,data:Math.floor(h/_)},{type:1,data:t.epsilon}];s&&b.push("type");let $=i>1,v=i>2,S=I=>{let k=Re(e[0].dataType),z=[B("x",e[0].dataType,e[0].dims,_),B("scale",n.dataType,n.dims,_)];s&&z.push(B("bias",s.dataType,s.dims,_)),z.push(Y("output",e[0].dataType,o,_)),$&&z.push(Y("mean_data_output",1,y)),v&&z.push(Y("inv_std_output",1,y));let M=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(M).declareVariables(...z)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${xa("f32",_)};
    var mean_square_vector = ${xa("f32",_)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${mi(k,_,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Ft("mean_vector",_)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Ft("mean_square_vector",_)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${mi(k,_,"x[j + offset]")};
      let f32scale = ${mi(k,_,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${mi(k,_,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:o,dataType:e[0].dataType}];return $&&T.push({dims:y,dataType:1}),v&&T.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${_};${i};${r}`,inputDependencies:b},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:x}),getShaderSource:S}},hf=(e,t)=>{ad(e.inputs),e.compute(sd(e.inputs,t,e.outputCount))}}),od,pf,F0=H(()=>{se(),ss(),os(),od=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},pf=e=>{od(e.inputs);let t=bi.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let i=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(i<8&&r<8)e.compute(as(e.inputs,{activation:""},t));else{let a=t[t.length-2],n=R.size(e.inputs[0].dims.slice(0,-2)),s=R.size(e.inputs[1].dims.slice(0,-2));if(n!==1&&a===1&&s===1){let o=e.inputs[0].reshape([1,n,r]),u=e.inputs[1].reshape([1,r,i]),d=[1,n,i],h=[o,u];e.compute(Nn(h,{activation:""},t,d),{inputs:h})}else e.compute(Nn(e.inputs,{activation:""},t))}}}),ld,ud,dd,ff,mf,H0=H(()=>{re(),se(),Te(),le(),ld=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let i=e[0],r=i.dims.length;if(i.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),n=t.blockSize/8*t.bits,s=e[1];if(!R.areEqual(s.dims,[t.n,a,n]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(R.size(o)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let u=e[3].dims,d=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(R.size(u)!==d)throw new Error("zeroPoints input size error.")}},ud=(e,t)=>{let i=e[0].dims,r=i.length,a=i[r-2],n=t.k,s=t.n,o=i.slice(0,r-2),u=R.size(o),d=e[1].dims[2]/4,h=e[0].dataType,f=Ce(t.k),m=Ce(d),y=Ce(s),_=o.concat([a,s]),b=a>1&&s/y%2===0?2:1,x=R.size(_)/y/b,$=64,v=[],S=[u,a,n/f],T=R.convertShape(e[1].dims).slice();T.splice(-1,1,d/m),v.push(...ee(S)),v.push(...ee(T)),v.push(...ee(e[2].dims)),e.length===4&&v.push(...ee(R.convertShape(e[3].dims)));let I=[u,a,s/y];v.push(...ee(I));let k=z=>{let M=S.length,O=B("a",e[0].dataType,M,f),F=B("b",12,T.length,m),K=B("scales",e[2].dataType,e[2].dims.length),G=[O,F,K],q=e.length===4?B("zero_points",12,e[3].dims.length):void 0;q&&G.push(q);let ue=I.length,ae=Y("output",e[0].dataType,ue,y),X=Re(e[0].dataType),oe=(()=>{switch(f){case 1:return`array<${X}, 8>`;case 2:return`mat4x2<${X}>`;case 4:return`mat2x4<${X}>`;default:throw new Error(`${f}-component is not supported.`)}})(),J=()=>{let N=`
          // reuse a data
            var input_offset = ${O.indicesToOffset(`${O.type.indices}(batch, row, word_offset)`)};
            var a_data: ${oe};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${O.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let V=0;V<y*b;V++)N+=`
            b_value = ${m===1?`b${V}_data`:`b${V}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${oe}(${Array.from({length:4},(j,te)=>`${X}(b_value_lower[${te}]), ${X}(b_value_upper[${te}])`).join(", ")});
            b_dequantized_values = ${f===1?`${oe}(${Array.from({length:8},(j,te)=>`(b_quantized_values[${te}] - ${q?`zero_point${V}`:"zero_point"}) * scale${V}`).join(", ")});`:`(b_quantized_values - ${oe}(${Array(8).fill(`${q?`zero_point${V}`:"zero_point"}`).join(",")})) * scale${V};`};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(V/y)}]${y>1?`[${V%y}]`:""} += ${Array.from({length:8/f},(j,te)=>`${f===1?`a_data[${te}] * b_dequantized_values[${te}]`:`dot(a_data[${te}], b_dequantized_values[${te}])`}`).join(" + ")};
          `;return N},ie=()=>{let N=`
            var col_index = col * ${y};
            ${q?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${X}(8);`}
            `;for(let V=0;V<y*b;V++)N+=`
            let scale${V} = ${K.getByOffset("col_index * nBlocksPerCol + block")};
            ${q?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${q.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${X}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return N},we=()=>{let N=`col_index = col * ${y};`;for(let V=0;V<y*b;V++)N+=`
            let b${V}_data = ${F.getByIndices(`${F.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return N+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${oe};
            var b_dequantized_values: ${oe};`,N};return`
        var<workgroup> workgroup_shared: array<${ae.type.value}, ${b*$}>;
        ${z.declareVariables(...G,ae)}
        ${z.mainStart([$,1,1])}
          let output_indices = ${ae.offsetToIndices(`(global_idx / ${$}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${ie()}
            for (var word: u32 = 0; word < ${d}; word += ${m}) {
              ${we()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${J()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${ae.type.value} = ${ae.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${ae.setByIndices(`${ae.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${m};${y};${b};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:h}],dispatchGroup:{x},programUniforms:v}),getShaderSource:k}},dd=(e,t)=>{let i=e[0].dims,r=i.length,a=i[r-2],n=t.k,s=t.n,o=i.slice(0,r-2),u=R.size(o),d=e[1].dims[2]/4,h=e[0].dataType,f=Ce(t.k),m=Ce(d),y=o.concat([a,s]),_=128,b=s%8===0?8:s%4===0?4:1,x=_/b,$=x*m*8,v=$/f,S=$/t.blockSize,T=R.size(y)/b,I=[],k=[u,a,n/f],z=R.convertShape(e[1].dims).slice();z.splice(-1,1,d/m),I.push(...ee(k)),I.push(...ee(z)),I.push(...ee(e[2].dims)),e.length===4&&I.push(...ee(R.convertShape(e[3].dims)));let M=[u,a,s];I.push(...ee(M));let O=F=>{let K=k.length,G=B("a",e[0].dataType,K,f),q=B("b",12,z.length,m),ue=B("scales",e[2].dataType,e[2].dims.length),ae=[G,q,ue],X=e.length===4?B("zero_points",12,e[3].dims.length):void 0;X&&ae.push(X);let oe=M.length,J=Y("output",e[0].dataType,oe),ie=Re(e[0].dataType),we=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ie}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ie}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${G.type.value}, ${v}>;
        var<workgroup> inter_results: array<array<${J.type.value}, ${x}>, ${b}>;
        ${F.declareVariables(...ae,J)}
        ${F.mainStart([x,b,1])}
          let output_indices = ${J.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${S} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${v};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${v}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${G.getByIndices(`${G.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${G.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${S} + local_id.x;
            ${X?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ie}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ie}(8);`}
            let scale = ${ue.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${q.getByIndices(`${q.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${m}; i++) {
              ${we()}
              let b_value = ${m===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ie}>(${Array.from({length:4},(N,V)=>`${ie}(b_value_lower[${V}]), ${ie}(b_value_upper[${V}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ie}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(N,V)=>`${`dot(a_data${V}, b_dequantized_values[${V}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${J.type.value} = ${J.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${J.setByIndices(`${J.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${m};${x};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:h}],dispatchGroup:{x:T},programUniforms:I}),getShaderSource:O}},ff=(e,t)=>{ld(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(dd(e.inputs,t)):e.compute(ud(e.inputs,t))},mf=e=>me(e)}),cd,hd,pd,fd,md,gd,yd,_d,gf,W0=H(()=>{re(),se(),le(),cd=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},hd=(e,t,i)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
            k = i32(${e.indicesGet("indices",a)}) - ${Q("uniforms.pads",a,i)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Q("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${Q("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},pd=(e,t,i)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Q("uniforms.pads",a,i)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Q("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Q("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Q("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},fd=(e,t,i)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Q("uniforms.pads",a,i)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Q("uniforms.x_shape",a,t)})) {
                  k = i32(${Q("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${Q("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},md=(e,t,i)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Q("uniforms.pads",a,i)};
                if (k < 0)  {
                  k += i32(${Q("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${Q("uniforms.x_shape",a,t)})) {
                  k -= i32(${Q("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${Q("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},gd=(e,t,i)=>{switch(i.mode){case 0:return hd(e,t,i.pads.length);case 1:return pd(e,t,i.pads.length);case 2:return fd(e,t,i.pads.length);case 3:return md(e,t,i.pads.length);default:throw new Error("Invalid mode")}},yd=(e,t)=>{let i=R.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,a=R.size(i),n=[{type:12,data:a},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&n.push({type:s?e[2].dataType:1,data:t.value}),n.push(...ee(e[0].dims,i));let o=["rank"],u=d=>{let h=Y("output",e[0].dataType,i.length),f=B("x",e[0].dataType,r.length),m=f.type.value,y=gd(h,r.length,t),_=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&_.push({name:"constant_value",type:s?m:"f32"}),`
            ${d.registerUniforms(_).declareVariables(f,h)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${h.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(R.size(i)/64)},programUniforms:n}),getShaderSource:u}},_d=(e,t)=>{if(e.length>1){let i=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,n=new Int32Array(2*a).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let u=0;u<o.length;u++)n[Number(o[u])]=Number(i[u]),n[Number(o[u])+a]=Number(i[u+o.length])}else i.forEach((o,u)=>n[Number(u)]=Number(o));let s=[];return n.forEach(o=>s.push(o)),{mode:t.mode,value:r,pads:s}}else return t},gf=(e,t)=>{cd(e.inputs);let i=_d(e.inputs,t);e.compute(yd(e.inputs,i),{inputs:[0]})}}),Oi,jr,Kr,Zr,Yr,bd,wd,Xr,Jr,yf,_f,Qr,bf,wf,ea,vf,$f,xf,Sf,V0=H(()=>{it(),re(),se(),le(),Oi=e=>{if(ge.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},jr=(e,t,i)=>{let r=t.format==="NHWC",a=e.dims.slice();r&&a.splice(1,0,a.pop());let n=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),o=t.strides.slice(),u=n?t.dilations.slice():[],d=t.pads.slice();Dn.adjustPoolAttributes(i,a,s,o,u,d);let h=Dn.computePoolOutputShape(i,a,o,u,s,d,t.autoPad),f=Object.assign({},t);n?Object.assign(f,{kernelShape:s,strides:o,pads:d,dilations:u,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:s,strides:o,pads:d,cacheKey:t.cacheKey});let m=h.slice();return m.push(m.splice(1,1)[0]),[f,r?m:h]},Kr=(e,t)=>{let i=t.format==="NHWC",r=R.size(e),a=R.size(t.kernelShape),n=[{type:12,data:r},{type:12,data:a}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],h=t.pads[t.pads.length-1],f=!!(d+h);n.push({type:12,data:o},{type:12,data:u},{type:12,data:d},{type:12,data:h}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],b=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];m=!!(b+x),n.push({type:12,data:y},{type:12,data:_},{type:12,data:b},{type:12,data:x}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,s,!0,f,m]}else{if(i)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=R.computeStrides(t.kernelShape);n.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((d,h)=>d+h);return[n,s,!!u,!1,!1]}},Zr=(e,t,i,r,a,n,s,o,u,d,h,f)=>{let m=a.format==="NHWC",y=t.type.value,_=Y("output",t.type.tensor,r);if(a.kernelShape.length<=2){let b="",x="",$="",v=i-(m?2:1);if(h?b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`:b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`,a.kernelShape.length===2){let S=i-(m?3:2);f?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${S}] < 0 || xIndices[${S}] >= uniforms.x_shape[${S}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${y}(${o});
              var pad = 0;
              ${x}
              ${b}
              ${$}
              ${s}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let b=a.kernelShape.length,x=a.pads.length,$="";return d?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${e.registerUniforms(u).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${y}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b-1}u; j++) {
                  offsets[j] = offset / ${Q("uniforms.kernelStrides","j",b)};
                  offset -= offsets[j] * ${Q("uniforms.kernelStrides","j",b)};
                }
                offsets[${b-1}] = offset;

                isPad = false;
                for (var j = ${i-b}u; j < ${i}u; j++) {
                  xIndices[j] = indices[j] * ${Q("uniforms.strides",`j - ${i-b}u`,b)}
                    + offsets[j - ${i-b}u] - ${Q("uniforms.pads","j - 2u",x)};
                  ${$}
              }
              ${s}

              output[global_idx] = value;
            }`}},Yr=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,bd=e=>`${Yr(e)};${e.countIncludePad}`,wd=e=>`${Yr(e)};${e.storageOrder};${e.dilations}`,Xr=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Jr=(e,t,i,r)=>{let[a,n]=jr(t,r,i),s=B("x",t.dataType,t.dims.length),o=s.type.value,u="value += x_val;",d="";a.countIncludePad?d+=`value /= ${o}(uniforms.kernelSize);`:d+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[h,f,m,y,_]=Kr(n,a);h.push(...ee(t.dims,n));let b=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${m};${y};${_}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(n)/64)},programUniforms:h}),getShaderSource:x=>Zr(x,s,t.dims.length,n.length,a,u,d,0,f,m,y,_)}},yf=e=>{let t=e.count_include_pad!==0,i=Xr(e);if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...i,cacheKey:""};return{...r,cacheKey:bd(r)}},_f=(e,t)=>{Oi(e.inputs),e.compute(Jr("AveragePool",e.inputs[0],!1,t))},Qr={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},bf=e=>{let t=e.format;return{format:t,...Qr,cacheKey:t}},wf=(e,t)=>{Oi(e.inputs),e.compute(Jr("GlobalAveragePool",e.inputs[0],!0,t))},ea=(e,t,i,r)=>{let[a,n]=jr(t,r,i),s=`
      value = max(x_val, value);
    `,o="",u=B("x",t.dataType,t.dims.length),d=["rank"],[h,f,m,y,_]=Kr(n,a);return h.push(...ee(t.dims,n)),{name:e,shaderCache:{hint:`${r.cacheKey};${m};${y};${_}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(R.size(n)/64)},programUniforms:h}),getShaderSource:b=>Zr(b,u,t.dims.length,n.length,a,s,o,t.dataType===10?-65504:-1e5,f,m,y,_)}},vf=(e,t)=>{Oi(e.inputs),e.compute(ea("MaxPool",e.inputs[0],!1,t))},$f=e=>{let t=e.storage_order,i=e.dilations,r=Xr(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:i,...r,cacheKey:""};return{...a,cacheKey:wd(a)}},xf=e=>{let t=e.format;return{format:t,...Qr,cacheKey:t}},Sf=(e,t)=>{Oi(e.inputs),e.compute(ea("GlobalMaxPool",e.inputs[0],!0,t))}}),vd,$d,Cf,Tf,G0=H(()=>{re(),se(),Te(),le(),vd=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((i,r)=>i===e[2].dims[r]).reduce((i,r)=>i&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,n)=>n===t.axis||a===e[0].dims[n]).reduce((a,n)=>a&&n,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let i=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(i/r)||t.blockSize>Math.ceil(i/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},$d=(e,t)=>{let i=R.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,a=r===3,n=e[0].dims,s=e[1].dataType,o=R.size(n),u=r===3||r===2,d=u?[Math.ceil(R.size(e[0].dims)/4)]:e[0].dims,h=e[1].dims,f=e.length>2?e[2]:void 0,m=f?u?[Math.ceil(R.size(f.dims)/4)]:f.dims:void 0,y=h.length===0||h.length===1&&h[0]===1,_=y===!1&&h.length===1,b=Ce(o),x=y&&(!u||b===4),$=x?b:1,v=x&&!u?b:1,S=B("input",u?12:r,d.length,v),T=B("scale",s,h.length),I=f?B("zero_point",u?12:r,m.length):void 0,k=Y("output",s,n.length,$),z=[S,T];I&&z.push(I);let M=[d,h];f&&M.push(m);let O=[{type:12,data:o/$},{type:12,data:i},{type:12,data:t.blockSize},...ee(...M,n)],F=K=>{let G=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${K.registerUniforms(G).declareVariables(...z,k)}
      ${K.mainStart()}
          ${K.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${k.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`};

          // Set scale input
          ${y?`let scale_value= ${T.getByOffset("0")}`:_?`
            let scale_index = ${k.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?y?u?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:_?u?`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${k.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${u?a?"i32":"u32":S.type.value}(0);`};
      // Compute and write output
      ${k.setByOffset("global_idx",`${k.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:F,getRunData:()=>({outputs:[{dims:n,dataType:s}],dispatchGroup:{x:Math.ceil(o/$/64),y:1,z:1},programUniforms:O})}},Cf=(e,t)=>{vd(e.inputs,t),e.compute($d(e.inputs,t))},Tf=e=>me({axis:e.axis,blockSize:e.blockSize})}),xd,Sd,If,q0=H(()=>{it(),re(),le(),xd=(e,t,i)=>{let r=e===t,a=e<t&&i<0,n=e>t&&i>0;if(r||a||n)throw new Error("Range these inputs' contents are invalid.")},Sd=(e,t,i,r)=>{let a=Math.abs(Math.ceil((t-e)/i)),n=[a],s=a,o=[{type:12,data:s},{type:r,data:e},{type:r,data:i},...ee(n)],u=d=>{let h=Y("output",r,n.length),f=h.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${d.registerUniforms(m).declareVariables(h)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}},If=e=>{let t=0,i=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],i=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],i=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),ge.webgpu.validateInputContent&&xd(t,i,r),e.compute(Sd(t,i,r,e.inputs[0].dataType),{inputs:[]})}}),Cd,Td,Ef,kf,j0=H(()=>{re(),se(),Te(),le(),Cd=(e,t,i,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${i};`;case"add":return r==="i32"||r==="u32"?`atomicAdd(&${t}, bitcast<${r}>(${i}));`:`
              ${a}bitcast<${r}>(oldValue) + (${i})${n}`;case"max":return r==="i32"||r==="u32"?`atomicMax(&${t}, bitcast<${r}>(${i}));`:`
                ${a}max(bitcast<f32>(oldValue), (${i}))${n}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${i}));`:`${a}min(bitcast<${r}>(oldValue), (${i}))${n}`;case"mul":return`${a}(bitcast<${r}>(oldValue) * (${i}))${n}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Td=(e,t)=>{let i=e[0].dims,r=e[1].dims,a=i,n=1,s=Math.ceil(R.sizeToDimension(r,r.length-1)/n),o=r[r.length-1],u=R.sizeFromDimension(i,o),d=[{type:12,data:s},{type:12,data:o},{type:12,data:u},...ee(e[1].dims,e[2].dims,a)],h=f=>{let m=B("indices",e[1].dataType,e[1].dims.length),y=B("updates",e[2].dataType,e[2].dims.length,n),_=t.reduction!=="none"&&t.reduction!==""?ih("output",e[0].dataType,a.length):Y("output",e[0].dataType,a.length,n);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,y,_)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Cd(t.reduction,"output[data_offset + i]","value",_.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:h}},Ef=e=>me({reduction:e.reduction}),kf=(e,t)=>{e.compute(Td(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Id,Ed,kd,ta,zd,Md,Ad,Rd,Od,Dd,Bd,Nd,ia,Pd,Ld,Ud,Fd,Hd,zf,Mf,K0=H(()=>{re(),se(),Te(),le(),Id=(e,t)=>{if(e.every(i=>i>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Ed=(e,t,i)=>{t.every(a=>a>=0&&a<i||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(i).fill(1);return t.forEach((a,n)=>r[a]=e[n]),r},kd=(e,t,i,r,a,n)=>{let[s,o,u]=i>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(h=>n.push(h));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(h=>r.push(h)),r.length!==0&&r.length!==d&&i>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Id(r,t),t.axes.length>0&&Ed(r,t.axes,d).forEach((h,f)=>r[f]=h)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(h=>a.push(Number(h))),a.length!==0&&a.length!==d&&i>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof a<"u"&&r.length>0&&a.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},ta=(e,t,i,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${i}));
  let fract = ${r}(big % (${i})) / ${r}(${i});
  return whole + fract;
`,zd=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${ta("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${ta("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Md=(e,t,i)=>`fn getNearestPixelFromOriginal(xOriginal: ${i}, isDownSample: bool) -> ${i} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Ad=(e,t,i)=>{let r=new Array(i).fill(0).concat(new Array(i).fill(1)),a=e.length===0?r:e.slice();return t.length>0?(t.forEach((n,s)=>{r[n]=a[s],r[s+i]=a[t.length+s]}),r):a},Rd=(e,t,i,r)=>{let a=[];if(i.length>0)if(r.length>0){if(e.forEach(n=>a.push(n)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((n,s)=>a[n]=i[s])}else i.forEach(n=>a.push(n));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((n,s)=>Math.round(n*t[s]))}return a},Od=(e,t,i)=>{let r=(()=>{switch(i.keepAspectRatioPolicy){case"not_larger":return i.axes.length>0?Math.min(...i.axes.map(n=>t[n]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return i.axes.length>0?Math.max(...i.axes.map(n=>t[n]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${i.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return i.axes.length>0?(i.axes.forEach(n=>t[n]=r),i.axes.forEach(n=>a[n]=Math.round(e[n]*t[n]))):(t.fill(r,0,t.length),a.forEach((n,s)=>a[s]=Math.round(n*t[s]))),a},Dd=(e,t,i,r,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${i.length}> {
      var original_indices: array<${e.type.value}, ${i.length}>;
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${Q("uniforms.scales","i",r)};
        var roi_low = ${Q("uniforms.roi","i",a)};
        var roi_hi = ${Q("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Q("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${Q("uniforms.output_shape","i",i.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Bd=(e,t,i,r,a,n,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Q("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Q("uniforms.roi","i",n)};
          var roi_hi = ${Q("uniforms.roi",`i + ${i.length}`,n)};
          var input_shape_i = ${Q("uniforms.input_shape","i",i.length)};
          var output_shape_i = ${Q("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Nd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Q("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ia=(e,t,i,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",i,"batch")};
`:"",Pd=(e,t,i,r,a)=>{let[n,s,o,u]=i.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${i[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${i[o]} - 1))`)};
      ${ia(e,u,n,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${o}];
      ${r?`if (row < 0 || row > (${i[s]} - 1) || col < 0 || col > (${i[o]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${i[s]} - 1));
      col = max(0, min(col, ${i[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${i.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${i.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Ld=(e,t,i,r,a,n,s,o,u,d)=>{let h=i.length===2,[f,m]=h?[0,1]:[2,3],y=e.type.value,_=b=>{let x=b===f?"row":"col";return`
      fn ${x}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",b)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[b]},
        ${r[b]}, ${i[b]}, ${n[b]}, ${n[b]} + ${i.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${i[b]} - 1))) {
          return ${u};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${x}: ${y} = originalIdx + ${y}(i);
          if (${x} < 0 || ${x} >= ${i[b]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${u};`:`${x} = max(0, min(${x}, ${i[b]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",b,`u32(${x})`)};
          data[i + 1] = ${b===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(f)};
    ${_(m)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Ud=(e,t,i,r,a)=>{let[n,s,o,u,d]=i.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${i[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${i[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${i[u]} - 1))`)};
      ${ia(e,d,n,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${s}];
      var height:${h} = originalIndices[${o}];
      var width:${h} = originalIndices[${u}];
      ${r?`if (depth < 0 || depth > (${i[s]} - 1) || height < 0 || height > (${i[o]} - 1) || width < 0 || (width > ${i[u]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${i[s]} - 1));
      height = max(0, min(height, ${i[o]} - 1));
      width = max(0, min(width, ${i[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${i.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${i.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${h} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${h} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${h} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${h} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${h} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${h} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${h} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${h} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${h} = abs(depth - ${h}(depth1));
      var dx2: ${h} = abs(${h}(depth2) - depth);
      var dy1: ${h} = abs(height - ${h}(height1));
      var dy2: ${h} = abs(${h}(height2) - height);
      var dz1: ${h} = abs(width - ${h}(width1));
      var dz2: ${h} = abs(${h}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Fd=(e,t,i,r,a,n)=>{let s=e.dims,o=Ad(n,t.axes,s.length),u=Rd(s,r,a,t.axes),d=r.slice();r.length===0&&(d=s.map((v,S)=>v===0?1:u[S]/v),t.keepAspectRatioPolicy!=="stretch"&&(u=Od(s,d,t)));let h=Y("output",e.dataType,u.length),f=B("input",e.dataType,s.length),m=R.size(u),y=s.length===u.length&&s.every((v,S)=>v===u[S]),_=t.coordinateTransformMode==="tf_crop_and_resize",b=t.extrapolationValue,x=f.type.value,$=v=>`
      ${y?"":`
      ${zd(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Nd(f,s)};
              ${Md(t.nearestMode,i,x)};
              ${Bd(f,h,s,u,d.length,o.length,_)};
              `;case"linear":return`
              ${Dd(h,s,u,d.length,o.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Pd(f,h,s,_,b)}`;if(s.length===3||s.length===5)return`${Ud(f,h,s,_,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Ld(f,h,s,u,d,o,t.cubicCoeffA,_,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",o.length).declareVariables(f,h)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y?"output[global_idx] = input[global_idx];":`
        let output_indices = ${h.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${i}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${a.length>0?a:""}|${o.length>0?o:""}|${y}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:d},{type:1,data:o},...ee(s,u)]})}},Hd=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},zf=(e,t)=>{let i=[],r=[],a=[],n=Hd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");kd(e.inputs,t,n,i,r,a),e.compute(Fd(e.inputs[0],t,n,i,r,a),{inputs:[0]})},Mf=e=>{let t=e.antialias,i=e.axes,r=e.coordinateTransformMode,a=e.cubicCoeffA,n=e.excludeOutside!==0,s=e.extrapolationValue,o=e.keepAspectRatioPolicy,u=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return me({antialias:t,axes:i,coordinateTransformMode:r,cubicCoeffA:a,excludeOutside:n,extrapolationValue:s,keepAspectRatioPolicy:o,mode:u,nearestMode:d})}}),Wd,Vd,Af,Z0=H(()=>{re(),se(),le(),Wd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],i=e[1],r=e[2];if(t.dataType!==i.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(i.dims.length!==3&&i.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],n=t.dims[t.dims.length-2];if(i.dims[i.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(i.dims[i.dims.length-2]!==n)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},Vd=(e,t,i,r)=>{let a=t.simplified,n=e[0].dims,s=R.size(n),o=n,u=s,d=n.slice(-1)[0],h=r?n.slice(0,-1).concat(1):[],f=!a&&e.length>3,m=e.length>4,y=r&&i>1,_=r&&i>2,b=i>3,x=64,$=Ce(d),v=[{type:12,data:u},{type:12,data:$},{type:12,data:d},{type:1,data:t.epsilon}],S=I=>{let k=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[B("x",e[0].dataType,e[0].dims,$),B("skip",e[1].dataType,e[1].dims,$),B("gamma",e[2].dataType,e[2].dims,$)];f&&z.push(B("beta",e[3].dataType,e[3].dims,$)),m&&z.push(B("bias",e[4].dataType,e[4].dims,$)),z.push(Y("output",e[0].dataType,o,$)),y&&z.push(Y("mean_output",1,h)),_&&z.push(Y("inv_std_output",1,h)),b&&z.push(Y("input_skip_bias_sum",e[0].dataType,o,$));let M=Re(e[0].dataType),O=Re(1,$);return`

      ${I.registerUniforms(k).declareVariables(...z)}
      var<workgroup> sum_shared : array<${O}, ${x}>;
      var<workgroup> sum_squared_shared : array<${O}, ${x}>;

      ${I.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":M+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${mi(M,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Ft("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Ft("square_sum",$)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${_?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${M}(mean)`}) *
            ${M}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:o,dataType:e[0].dataType}];return i>1&&T.push({dims:h,dataType:1}),i>2&&T.push({dims:h,dataType:1}),i>3&&T.push({dims:n,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${y};${_};${b}`,inputDependencies:e.map((I,k)=>"type")},getShaderSource:S,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(u/d)},programUniforms:v})}},Af=(e,t)=>{Wd(e.inputs);let i=[0];e.outputCount>1&&i.push(-3),e.outputCount>2&&i.push(-3),e.outputCount>3&&i.push(3),e.compute(Vd(e.inputs,t,e.outputCount,!1),{outputs:i})}}),Gd,Di,qd,na,jd,Kd,Rf,Of,Y0=H(()=>{re(),se(),Te(),le(),Gd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((i,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},Di=(e,t)=>{let i=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>i.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>i.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return i},qd=(e,t)=>{if(e.length>1){let i=Di(e,1),r=Di(e,2),a=Di(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),me({starts:i,ends:r,axes:a})}else return t},na=(e,t,i,r,a)=>{let n=e;return e<0&&(n+=i[r[t]]),a[t]<0?Math.max(0,Math.min(n,i[r[t]]-1)):Math.max(0,Math.min(n,i[r[t]]))},jd=(e,t,i)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${i.length-1}; i >= 0; i--) {
            let input_shape_i = ${Q("uniforms.input_shape","i",i.length)};
            let steps_i = ${Q("uniforms.steps","i",i.length)};
            let signs_i = ${Q("uniforms.signs","i",i.length)};
            let starts_i = ${Q("uniforms.starts","i",i.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Kd=(e,t)=>{let i=e[0].dims,r=R.size(i),a=t.axes.length>0?R.normalizeAxes(t.axes,i.length):[...Array(i.length).keys()],n=Di(e,4);n.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),n.length===0&&(n=Array(a.length).fill(1));let s=t.starts.map(($,v)=>na($,v,i,a,n)),o=t.ends.map(($,v)=>na($,v,i,a,n));if(a.length!==s.length||a.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==i.length)for(let $=0;$<i.length;++$)a.includes($)||(s.splice($,0,0),o.splice($,0,i[$]),n.splice($,0,1));let u=n.map($=>Math.sign($));n.forEach(($,v,S)=>{if($<0){let T=(o[v]-s[v])/$,I=s[v],k=I+T*n[v];s[v]=k,o[v]=I,S[v]=-$}});let d=i.slice(0);a.forEach(($,v)=>{d[$]=Math.ceil((o[$]-s[$])/n[$])});let h={dims:d,dataType:e[0].dataType},f=Y("output",e[0].dataType,d.length),m=B("input",e[0].dataType,e[0].dims.length),y=R.size(d),_=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:n.length}],b=[{type:12,data:y},{type:12,data:s},{type:6,data:u},{type:12,data:n},...ee(e[0].dims,d)],x=$=>`
      ${$.registerUniforms(_).declareVariables(m,f)}
        ${jd(m,f,i)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[h],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:b})}},Rf=(e,t)=>{Gd(e.inputs,t);let i=qd(e.inputs,t);e.compute(Kd(e.inputs,i),{inputs:[0]})},Of=e=>{let t=e.starts,i=e.ends,r=e.axes;return me({starts:t,ends:i,axes:r})}}),Zd,Yd,Df,Bf,X0=H(()=>{re(),se(),Te(),Wt(),le(),Zd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Yd=(e,t)=>{let i=e.inputs[0],r=i.dims,a=R.size(r),n=r.length,s=R.normalizeAxis(t.axis,n),o=s<r.length-1,u,d=[];o?(d=Array.from({length:n},(z,M)=>M),d[s]=n-1,d[n-1]=s,u=e.compute(Xe(i,d),{inputs:[i],outputs:[-1]})[0]):u=i;let h=u.dims,f=h[n-1],m=a/f,y=Ce(f),_=f/y,b=64;m===1&&(b=256);let x=(z,M)=>M===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:M===2?`max(${z}.x, ${z}.y)`:M===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,$=B("x",u.dataType,u.dims,y),v=Y("result",u.dataType,u.dims,y),S=$.type.value,T=Re(u.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,I=z=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables($,v)}
      ${z.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${T}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${S}(${x("threadShared[0]",y)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${S}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${S}(${Ft("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${S}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,k=e.compute({name:"Softmax",shaderCache:{hint:`${y};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:u.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:_}]}),getShaderSource:I},{inputs:[u],outputs:[o?-1:0]})[0];o&&e.compute(Xe(k,d),{inputs:[k]})},Df=(e,t)=>{Zd(e.inputs),Yd(e,t)},Bf=e=>me({axis:e.axis})}),ra,Xd,Jd,Qd,Nf,J0=H(()=>{re(),se(),le(),ra=e=>Array.from(e.getBigInt64Array(),Number),Xd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(ra(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Jd=(e,t)=>{let i=[];for(let r=0;r<e.length;++r)i.push(e[r]*t[r]);return i},Qd=(e,t)=>{let i=e[0].dims,r=t??ra(e[1]),a=Jd(i,r),n=R.size(a),s=e[0].dataType,o=B("input",s,i.length),u=Y("output",s,a.length),d=h=>`
      const inputShape = ${o.indices(...i)};
      ${h.registerUniform("output_size","u32").declareVariables(o,u)}
      ${h.mainStart()}
      ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${i.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...ee(e[0].dims,a)]}),getShaderSource:d}},Nf=e=>{Xd(e.inputs),e.compute(Qd(e.inputs),{inputs:[0]})}}),ec,tc,Pf,Q0=H(()=>{re(),se(),le(),ec=(e,t,i,r,a)=>{let n=Y("output_data",a,i.length,4),s=B("a_data",t[1].dataType,t[1].dims.length,4),o=B("b_data",t[2].dataType,t[2].dims.length,4),u=B("c_data",t[0].dataType,t[0].dims.length,4),d,h=(f,m,y)=>`select(${m}, ${f}, ${y})`;if(!r)d=n.setByOffset("global_idx",h(s.getByOffset("global_idx"),o.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let f=(m,y,_="")=>{let b=`a_data[index_a${y}][component_a${y}]`,x=`b_data[index_b${y}][component_b${y}]`,$=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${n.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${s.broadcastedIndicesToOffset(`output_indices${y}`,n)};
            let offset_b${y} = ${o.broadcastedIndicesToOffset(`output_indices${y}`,n)};
            let offset_c${y} = ${u.broadcastedIndicesToOffset(`output_indices${y}`,n)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${m}[${y}] = ${_}(${h(b,x,$)});
          `};a===9?d=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,s,o,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},tc=e=>{let t=e[1].dims,i=e[2].dims,r=e[0].dims,a=e[1].dataType,n=!(R.areEqual(t,i)&&R.areEqual(i,r)),s=t,o=R.size(t);if(n){let d=bi.calcShape(bi.calcShape(t,i,!1),r,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,o=R.size(s)}let u=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>ec(d,e,s,n,a),getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:u},...ee(r,t,i,s)]})}},Pf=e=>{e.compute(tc(e.inputs))}}),Lf,ey=H(()=>{f0(),ts(),m0(),g0(),y0(),_0(),b0(),S0(),T0(),I0(),E0(),k0(),z0(),M0(),A0(),R0(),O0(),D0(),B0(),N0(),P0(),L0(),U0(),F0(),H0(),rf(),W0(),V0(),G0(),q0(),j0(),es(),K0(),uf(),Z0(),Y0(),X0(),of(),J0(),Wt(),is(),Q0(),Lf=new Map([["Abs",[Mh]],["Acos",[Ah]],["Acosh",[Rh]],["Add",[pp]],["ArgMax",[Ih,Ca]],["ArgMin",[Th,Ca]],["Asin",[Oh]],["Asinh",[Dh]],["Atan",[Bh]],["Atanh",[Nh]],["Attention",[Eh]],["AveragePool",[_f,yf]],["BatchNormalization",[kh]],["BiasAdd",[zh]],["BiasSplitGelu",[hp]],["Cast",[Lh,Ph]],["Ceil",[Fh]],["Clip",[Uh]],["Concat",[xp,Sp]],["Conv",[Ma,za]],["ConvTranspose",[Op,Rp]],["Cos",[Hh]],["Cosh",[Wh]],["CumSum",[Dp,Bp]],["DepthToSpace",[Np,Pp]],["DequantizeLinear",[Cf,Tf]],["Div",[fp]],["Einsum",[Lp,Up]],["Elu",[Vh,Fi]],["Equal",[mp]],["Erf",[Gh]],["Exp",[qh]],["Expand",[Fp]],["FastGelu",[Hp]],["Floor",[jh]],["FusedConv",[Ma,za]],["Gather",[Vp,Wp]],["GatherElements",[Yp,Zp]],["GatherBlockQuantized",[jp,Kp]],["GatherND",[Gp,qp]],["Gelu",[Kh]],["Gemm",[Jp,Xp]],["GlobalAveragePool",[wf,bf]],["GlobalMaxPool",[Sf,xf]],["Greater",[bp]],["GreaterOrEqual",[vp]],["GridSample",[Qp,ef]],["GroupQueryAttention",[df]],["HardSigmoid",[ip,tp]],["InstanceNormalization",[cf]],["LayerNormalization",[hf]],["LeakyRelu",[Zh,Fi]],["Less",[wp]],["LessOrEqual",[$p]],["Log",[dp]],["MatMul",[pf]],["MatMulNBits",[ff,mf]],["MaxPool",[vf,$f]],["Mul",[gp]],["MultiHeadAttention",[nf,tf]],["Neg",[Xh]],["Not",[Yh]],["Pad",[gf]],["Pow",[yp]],["QuickGelu",[cp,Fi]],["Range",[If]],["Reciprocal",[Jh]],["ReduceMin",[vh]],["ReduceMean",[gh]],["ReduceMax",[wh]],["ReduceSum",[xh]],["ReduceProd",[$h]],["ReduceL1",[yh]],["ReduceL2",[_h]],["ReduceLogSum",[Ch]],["ReduceLogSumExp",[bh]],["ReduceSumSquare",[Sh]],["Relu",[Qh]],["Resize",[zf,Mf]],["RotaryEmbedding",[lf]],["ScatterND",[kf,Ef]],["Sigmoid",[ep]],["Sin",[np]],["Sinh",[rp]],["Slice",[Rf,Of]],["SkipLayerNormalization",[Af]],["Split",[af,sf]],["Sqrt",[ap]],["Softmax",[Df,Bf]],["Sub",[_p]],["Tan",[sp]],["Tanh",[op]],["ThresholdedRelu",[up,Fi]],["Tile",[Nf]],["Transpose",[rh,ah]],["Where",[Pf]]])}),Uf,ty=H(()=>{it(),Mt(),le(),Uf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,i,r,a){wt(e.programInfo.name);let n=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let d of t)o.push({binding:o.length,resource:{buffer:d.buffer}});for(let d of i)o.push({binding:o.length,resource:{buffer:d.buffer}});a&&o.push({binding:o.length,resource:a});let u=n.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,u),s.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),dt(e.programInfo.name)}dispose(){}build(e,t){wt(e.name);let i=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{i.features.has(d.feature)&&r.push(`enable ${d.extension};`)});let a=nh(t,this.backend.device.limits),n=e.getShaderSource(a),s=`${r.join(`
`)}
${a.additionalImplementations}
${n}`,o=i.createShaderModule({code:s,label:e.name});he("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let u=i.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return dt(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,i=typeof e=="number"?1:e.y||1,r=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&i<=a&&r<=a)return[t,i,r];let n=t*i*r,s=Math.ceil(Math.sqrt(n));if(s>a){if(s=Math.ceil(Math.cbrt(n)),s>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),Ff={};$i(Ff,{WebGpuBackend:()=>Hf});var ic,nc,rc,Hf,iy=H(()=>{it(),re(),Mt(),Jc(),h0(),ey(),ty(),ic=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let i=[];for(let r=0;r<e.length;++r){let a=e[r].dataType;switch(t[r]){case"none":{i.push("");break}case"type":{i.push(`${a}`);break}case"rank":{let n=e[r].dims.length;i.push(`${a};${n}`);break}case"dims":{let n=e[r].dims.join(",");i.push(`${a};${n}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return i.join("|")},nc=(e,t,i)=>{var a,n;let r=e.name;return(a=e.shaderCache)!=null&&a.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+i+`:${ic(t,((n=e.shaderCache)==null?void 0:n.inputDependencies)??new Array(t.length).fill("dims"))}`,r},rc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Hf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let i=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:i},a=n=>t.features.has(n)&&i.push(n)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(r),this.adapterInfo=new rc(t.info||await t.requestAdapterInfo()),this.gpuDataManager=th(this),this.programManager=new Uf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ya(e.logLevel,!!e.debug),this.device.onuncapturederror=n=>{n.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${n.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;wt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var r;let t=new BigUint64Array(e.getMappedRange()),i=this.pendingQueries.get(e);for(let a=0;a<t.length/2;a++){let n=i[a],s=n.kernelId,o=this.kernels.get(s),u=o.kernelType,d=o.kernelName,h=n.programName,f=n.inputTensorViews,m=n.outputTensorViews,y=t[a*2],_=t[a*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=y);let b=Number(y-this.queryTimeBase),x=Number(_-this.queryTimeBase);if(!Number.isSafeInteger(b)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if((r=this.env.webgpu.profiling)!=null&&r.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map($=>({dims:$.dims,dataType:zt($.dataType)})),outputsMetadata:m.map($=>({dims:$.dims,dataType:zt($.dataType)})),kernelId:s,kernelType:u,kernelName:d,programName:h,startTime:b,endTime:x});else{let $="";f.forEach((S,T)=>{$+=`input[${T}]: [${S.dims}] | ${zt(S.dataType)}, `});let v="";m.forEach((S,T)=>{v+=`output[${T}]: [${S.dims}] | ${zt(S.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${d}|${h}" ${$}${v}start time: ${b} ns, execution time: ${x-b} ns`)}An("GPU",`${h}::${y}::${_}`)}e.unmap(),this.pendingQueries.delete(e)}),dt()}run(e,t,i,r,a,n){wt(e.name);let s=[];for(let v=0;v<t.length;++v){let S=t[v].data;if(S===0)continue;let T=this.gpuDataManager.get(S);if(!T)throw new Error(`no GPU data for input: ${S}`);s.push(T)}let{outputs:o,dispatchGroup:u,programUniforms:d}=e.getRunData(t),h=i.length===0?o.map((v,S)=>S):i;if(h.length!==o.length)throw new Error(`Output size ${h.length} must be equal to ${o.length}.`);let f=[],m=[];for(let v=0;v<o.length;++v){if(!Number.isInteger(h[v])||h[v]<-3||h[v]>=n)throw new Error(`Invalid output index: ${h[v]}`);if(h[v]===-3)continue;let S=h[v]===-1,T=h[v]===-2,I=S||T?a(o[v].dataType,o[v].dims):r(h[v],o[v].dataType,o[v].dims);if(f.push(I),I.data===0)continue;let k=this.gpuDataManager.get(I.data);if(!k)throw new Error(`no GPU data for output: ${I.data}`);if(S&&this.temporaryData.push(k),T){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(k)}m.push(k)}if(s.length!==t.length||m.length!==f.length){if(m.length===0)return dt(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(d){let v=0,S=[];d.forEach(z=>{let M=typeof z.data=="number"?[z.data]:z.data;if(M.length===0)return;let O=z.type===10?2:4,F,K;z.type===10?(K=M.length>4?16:M.length>2?8:M.length*O,F=M.length>4?16:O*M.length):(K=M.length<=2?M.length*O:16,F=16),v=Math.ceil(v/K)*K,S.push(v);let G=z.type===10?8:4;v+=M.length>4?Math.ceil(M.length/G)*F:M.length*O});let T=16;v=Math.ceil(v/T)*T;let I=new ArrayBuffer(v);d.forEach((z,M)=>{let O=S[M],F=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(I,O,F.length).set(F);else if(z.type===12)new Uint32Array(I,O,F.length).set(F);else if(z.type===10)new Uint16Array(I,O,F.length).set(F);else if(z.type===1)new Float32Array(I,O,F.length).set(F);else throw new Error(`Unsupported uniform type: ${zt(z.type)}`)});let k=this.gpuDataManager.create(v,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(k.buffer,0,I,0,v),this.gpuDataManager.release(k.id),y={offset:0,size:v,buffer:k.buffer}}let _=this.programManager.normalizeDispatchGroupSize(u),b=_[1]===1&&_[2]===1,x=nc(e,t,b),$=this.programManager.getArtifact(x);if($||($=this.programManager.build(e,_),this.programManager.setArtifact(x,$),he("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),d&&$.uniformVariablesInfo){if(d.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${d.length} in program "${$.programInfo.name}".`);for(let v=0;v<d.length;v++){let S=d[v],T=S.type,I=typeof S.data=="number"?1:S.data.length,[k,z]=$.uniformVariablesInfo[v];if(T!==k||I!==z)throw new Error(`Uniform variable ${v} mismatch: expect type ${k} with size ${z}, got type ${T} with size ${I} in program "${$.programInfo.name}".`)}}if(he("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let v={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(v),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(v)}return this.programManager.run($,s,m,_,y),dt(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,i,r){let a=Lf.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let n={kernelType:e,kernelName:r,kernelEntry:a[0],attributes:[a[1],i]};this.kernels.set(t,n)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let i of t)this.gpuDataManager.release(i.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,i){let r=this.kernels.get(e);if(!r)throw new Error(`kernel not created: ${e}`);let a=r.kernelType,n=r.kernelName,s=r.kernelEntry,o=r.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),he("info",()=>`[WebGPU] Start to run kernel "[${a}] ${n}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),s(t,o[1]),0}catch(d){return i.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${d}`)),1}finally{u&&i.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${a}] ${n}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,i,r){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let n=a.get(t),s=this.gpuDataManager.registerExternalBuffer(i,r,n);return a.set(t,[s,i]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(i=>this.gpuDataManager.unregisterExternalBuffer(i[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,i){return async()=>{let r=await $a(this,e,t);return Xa(r.buffer,i)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){he("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){he("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){he("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),i=e.length;this.pendingKernels=[];for(let r=0;r<i;r++){let a=this.getComputePassEncoder(),n=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(n.computePipeline),a.setBindGroup(0,n.bindGroup),a.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Wf={};$i(Wf,{init:()=>Vf});var wn,ac,Vf,ny=H(()=>{re(),Mt(),se(),c0(),wn=class Gf{constructor(t,i,r,a){this.module=t,this.dataType=i,this.data=r,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=R.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(R.size(t)!==R.size(this.dims))throw new Error("Invalid new shape");return new Gf(this.module,this.dataType,this.data,t)}},ac=class{constructor(e,t,i){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,a=i/e.PTR_SIZE,n=r===4?"i32":"i64";this.opKernelContext=Number(e.getValue(r*a++,n));let s=Number(e.getValue(r*a++,n));this.outputCount=Number(e.getValue(r*a++,n)),this.customDataOffset=Number(e.getValue(r*a++,"*")),this.customDataSize=Number(e.getValue(r*a++,n));let o=[];for(let u=0;u<s;u++){let d=Number(e.getValue(r*a++,n)),h=Number(e.getValue(r*a++,"*")),f=Number(e.getValue(r*a++,n)),m=[];for(let y=0;y<f;y++)m.push(Number(e.getValue(r*a++,n)));o.push(new wn(e,d,h,m))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var s;let i=((s=t==null?void 0:t.inputs)==null?void 0:s.map(o=>typeof o=="number"?this.inputs[o]:o))??this.inputs,r=(t==null?void 0:t.outputs)??[],a=(o,u,d)=>new wn(this.module,u,this.output(o,d),d),n=(o,u)=>{let d=ni(o,u);if(!d)throw new Error(`Unsupported data type: ${o}`);let h=d>0?this.backend.gpuDataManager.create(d).id:0;return new wn(this.module,o,h,u)};return this.backend.run(e,i,r,a,n,this.outputCount)}output(e,t){let i=this.module.stackSave();try{let r=this.module.PTR_SIZE,a=r===4?"i32":"i64",n=this.module.stackAlloc((1+t.length)*r);this.module.setValue(n,t.length,a);for(let s=0;s<t.length;s++)this.module.setValue(n+r*(s+1),t[s],a);return this.module._JsepOutput(this.opKernelContext,e,n)}catch(r){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(i)}}},Vf=async(e,t,i,r)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let n=(iy(),Zi(Ff)).WebGpuBackend,s=new n;await s.initialize(i,r),a("webgpu",[s,o=>s.alloc(Number(o)),o=>s.free(o),(o,u,d,h=!1)=>{if(h)he("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(u)}, size=${Number(d)}`),s.memcpy(Number(o),Number(u));else{he("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(u)}, size=${Number(d)}`);let f=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));s.upload(Number(u),f)}},async(o,u,d)=>{he("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${u}, size=${d}`),await s.download(Number(o),()=>t.HEAPU8.subarray(Number(u)>>>0,Number(u+d)>>>0))},(o,u,d)=>s.createKernel(o,Number(u),d,t.UTF8ToString(t._JsepGetNodeName(Number(u)))),o=>s.releaseKernel(o),(o,u,d,h)=>{he("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${u}`);let f=new ac(t,s,Number(u));return s.computeKernel(Number(o),f,h)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let n=new eh(i);a("webnn",[n,()=>n.reserveTensorId(),s=>n.releaseTensorId(s),async(s,o,u,d,h)=>n.ensureTensor(s,o,u,d,h),(s,o)=>{n.uploadTensor(s,o)},async(s,o)=>n.downloadTensor(s,o),(s,o)=>n.registerMLContext(s,o),!!i.trace])}}}),sc,ls,us,Pt,oc,aa,Ln,ds,cs,sa,hs,ps,fs,qf=H(()=>{it(),l0(),u0(),re(),di(),qa(),Kc(),sc=(e,t)=>{$e()._OrtInit(e,t)!==0&&be("Can't initialize onnxruntime.")},ls=async e=>{sc(e.wasm.numThreads,On(e.logLevel))},us=async(e,t)=>{var r,a;(a=(r=$e()).asyncInit)==null||a.call(r);let i=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(i){if(typeof i.limits!="object"||typeof i.features!="object"||typeof i.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let n=e.webgpu.powerPreference;if(n!==void 0&&n!=="low-power"&&n!=="high-performance")throw new Error(`Invalid powerPreference setting: "${n}"`);let s=e.webgpu.forceFallbackAdapter;if(s!==void 0&&typeof s!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`);if(i=await navigator.gpu.requestAdapter({powerPreference:n,forceFallbackAdapter:s}),!i)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let n=(ny(),Zi(Wf)).init;t==="webgpu"&&await n("webgpu",$e(),e,i),t==="webnn"&&await n("webnn",$e(),e)}},Pt=new Map,oc=e=>{let t=$e(),i=t.stackSave();try{let r=t.PTR_SIZE,a=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,a,a+r)!==0&&be("Can't get session input/output count.");let n=r===4?"i32":"i64";return[Number(t.getValue(a,n)),Number(t.getValue(a+r,n))]}finally{t.stackRestore(i)}},aa=(e,t)=>{let i=$e(),r=i.stackSave(),a=0;try{let n=i.PTR_SIZE,s=i.stackAlloc(2*n);i._OrtGetInputOutputMetadata(e,t,s,s+n)!==0&&be("Can't get session input/output metadata.");let o=Number(i.getValue(s,"*"));a=Number(i.getValue(s+n,"*"));let u=i.HEAP32[a/4];if(u===0)return[o,0];let d=i.HEAPU32[a/4+1],h=[];for(let f=0;f<d;f++){let m=Number(i.getValue(a+8+f*n,"*"));h.push(m!==0?i.UTF8ToString(m):Number(i.getValue(a+8+(f+d)*n,"*")))}return[o,u,h]}finally{i.stackRestore(r),a!==0&&i._OrtFree(a)}},Ln=e=>{let t=$e(),i=t._malloc(e.byteLength);if(i===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,i),[i,e.byteLength]},ds=async(e,t)=>{var f,m,y,_;let i,r,a=$e();Array.isArray(e)?[i,r]=e:e.buffer===a.HEAPU8.buffer?[i,r]=[e.byteOffset,e.byteLength]:[i,r]=Ln(e);let n=0,s=0,o=0,u=[],d=[],h=[];try{if([s,u]=await jc(t),(t==null?void 0:t.externalData)&&a.mountExternalData){let M=[];for(let O of t.externalData){let F=typeof O=="string"?O:O.path;M.push(Za(typeof O=="string"?O:O.data).then(K=>{a.mountExternalData(F,K)}))}await Promise.all(M)}for(let M of(t==null?void 0:t.executionProviders)??[])if((typeof M=="string"?M:M.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof M!="string"){let O=M,F=O==null?void 0:O.context,K=O==null?void 0:O.gpuDevice,G=O==null?void 0:O.deviceType,q=O==null?void 0:O.powerPreference;F?a.currentContext=F:K?a.currentContext=await a.webnnCreateMLContext(K):a.currentContext=await a.webnnCreateMLContext({deviceType:G,powerPreference:q})}else a.currentContext=await a.webnnCreateMLContext();break}n=await a._OrtCreateSession(i,r,s),(f=a.webgpuOnCreateSession)==null||f.call(a,n),n===0&&be("Can't create a session."),(m=a.jsepOnCreateSession)==null||m.call(a),a.currentContext&&(a.webnnRegisterMLContext(n,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[b,x]=oc(n),$=!!(t!=null&&t.enableGraphCapture),v=[],S=[],T=[],I=[],k=[];for(let M=0;M<b;M++){let[O,F,K]=aa(n,M);O===0&&be("Can't get an input name."),d.push(O);let G=a.UTF8ToString(O);v.push(G),T.push(F===0?{name:G,isTensor:!1}:{name:G,isTensor:!0,type:zt(F),shape:K})}for(let M=0;M<x;M++){let[O,F,K]=aa(n,M+b);O===0&&be("Can't get an output name."),h.push(O);let G=a.UTF8ToString(O);S.push(G),I.push(F===0?{name:G,isTensor:!1}:{name:G,isTensor:!0,type:zt(F),shape:K});{if($&&(t==null?void 0:t.preferredOutputLocation)===void 0){k.push("gpu-buffer");continue}let q=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((y=t==null?void 0:t.preferredOutputLocation)==null?void 0:y[G])??"cpu",ue=a.webnnIsGraphOutput;if(q==="cpu"&&ue&&ue(n,G)){k.push("ml-tensor-cpu-output");continue}if(q!=="cpu"&&q!=="cpu-pinned"&&q!=="gpu-buffer"&&q!=="ml-tensor")throw new Error(`Not supported preferred output location: ${q}.`);if($&&q!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${q}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);k.push(q)}}let z=null;return k.some(M=>M==="gpu-buffer"||M==="ml-tensor"||M==="ml-tensor-cpu-output")&&(o=a._OrtCreateBinding(n),o===0&&be("Can't create IO binding."),z={handle:o,outputPreferredLocations:k,outputPreferredLocationsEncoded:k.map(M=>M==="ml-tensor-cpu-output"?"ml-tensor":M).map(M=>wa(M))}),Pt.set(n,[n,d,h,z,$,!1]),[n,v,S,T,I]}catch(b){throw d.forEach(x=>a._OrtFree(x)),h.forEach(x=>a._OrtFree(x)),o!==0&&a._OrtReleaseBinding(o)!==0&&be("Can't release IO binding."),n!==0&&a._OrtReleaseSession(n)!==0&&be("Can't release session."),b}finally{a._free(i),s!==0&&a._OrtReleaseSessionOptions(s)!==0&&be("Can't release session options."),u.forEach(b=>a._free(b)),(_=a.unmountExternalData)==null||_.call(a)}},cs=e=>{var u,d,h;let t=$e(),i=Pt.get(e);if(!i)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,a,n,s,o]=i;s&&(o&&t._OrtClearBoundOutputs(s.handle)!==0&&be("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&be("Can't release IO binding.")),(u=t.jsepOnReleaseSession)==null||u.call(t,e),(d=t.webnnOnReleaseSession)==null||d.call(t,e),(h=t.webgpuOnReleaseSession)==null||h.call(t,e),a.forEach(f=>t._OrtFree(f)),n.forEach(f=>t._OrtFree(f)),t._OrtReleaseSession(r)!==0&&be("Can't release session."),Pt.delete(e)},sa=async(e,t,i,r,a,n,s=!1)=>{if(!e){t.push(0);return}let o=$e(),u=o.PTR_SIZE,d=e[0],h=e[1],f=e[3],m=f,y,_;if(d==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let $=e[2].gpuBuffer;_=ni(ii(d),h);{let v=o.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=v(r,n,$,_)}}else if(f==="ml-tensor"){let $=e[2].mlTensor;_=ni(ii(d),h);let v=o.webnnRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=v(r,$,ii(d),h)}else{let $=e[2];if(Array.isArray($)){_=u*$.length,y=o._malloc(_),i.push(y);for(let v=0;v<$.length;v++){if(typeof $[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);o.setValue(y+v*u,lt($[v],i),"*")}}else{let v=o.webnnIsGraphInput,S=o.webnnIsGraphOutput;if(d!=="string"&&v&&S){let T=o.UTF8ToString(a);if(v(r,T)||S(r,T)){let I=ii(d);_=ni(I,h),m="ml-tensor";let k=o.webnnCreateTemporaryTensor,z=o.webnnUploadTensor;if(!k||!z)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let M=await k(r,I,h);z(M,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),y=M}else _=$.byteLength,y=o._malloc(_),i.push(y),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),y)}else _=$.byteLength,y=o._malloc(_),i.push(y),o.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),y)}}let b=o.stackSave(),x=o.stackAlloc(4*h.length);try{h.forEach((v,S)=>o.setValue(x+S*u,v,u===4?"i32":"i64"));let $=o._OrtCreateTensor(ii(d),y,_,x,h.length,wa(m));$===0&&be(`Can't create tensor for input/output. session=${r}, index=${n}.`),t.push($)}finally{o.stackRestore(b)}},hs=async(e,t,i,r,a,n)=>{var K,G,q,ue;let s=$e(),o=s.PTR_SIZE,u=Pt.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=u[0],h=u[1],f=u[2],m=u[3],y=u[4],_=u[5],b=t.length,x=r.length,$=0,v=[],S=[],T=[],I=[],k=s.stackSave(),z=s.stackAlloc(b*o),M=s.stackAlloc(b*o),O=s.stackAlloc(x*o),F=s.stackAlloc(x*o);try{[$,v]=qc(n),ai("wasm prepareInputOutputTensor");for(let J=0;J<b;J++)await sa(i[J],S,I,e,h[t[J]],t[J],y);for(let J=0;J<x;J++)await sa(a[J],T,I,e,f[r[J]],b+r[J],y);si("wasm prepareInputOutputTensor");for(let J=0;J<b;J++)s.setValue(z+J*o,S[J],"*"),s.setValue(M+J*o,h[t[J]],"*");for(let J=0;J<x;J++)s.setValue(O+J*o,T[J],"*"),s.setValue(F+J*o,f[r[J]],"*");if(m&&!_){let{handle:J,outputPreferredLocations:ie,outputPreferredLocationsEncoded:we}=m;if(h.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${h.length}).`);ai("wasm bindInputsOutputs");for(let N=0;N<b;N++){let V=t[N];await s._OrtBindInput(J,h[V],S[N])!==0&&be(`Can't bind input[${N}] for session=${e}.`)}for(let N=0;N<x;N++){let V=r[N];(K=a[N])!=null&&K[3]?s._OrtBindOutput(J,f[V],T[N],0)!==0&&be(`Can't bind pre-allocated output[${N}] for session=${e}.`):s._OrtBindOutput(J,f[V],0,we[V])!==0&&be(`Can't bind output[${N}] to ${ie[N]} for session=${e}.`)}si("wasm bindInputsOutputs"),Pt.set(e,[d,h,f,m,y,!0])}(G=s.jsepOnRunStart)==null||G.call(s,d),(q=s.webnnOnRunStart)==null||q.call(s,d);let ae;m?ae=await s._OrtRunWithBinding(d,m.handle,x,O,$):ae=await s._OrtRun(d,M,z,b,F,x,O,$),ae!==0&&be("failed to call OrtRun().");let X=[],oe=[];ai("wasm ProcessOutputTensor");for(let J=0;J<x;J++){let ie=Number(s.getValue(O+J*o,"*"));if(ie===T[J]){X.push(a[J]);continue}let we=s.stackSave(),N=s.stackAlloc(4*o),V=!1,j,te=0;try{s._OrtGetTensorData(ie,N,N+o,N+2*o,N+3*o)!==0&&be(`Can't access output tensor data on index ${J}.`);let ke=o===4?"i32":"i64",ct=Number(s.getValue(N,ke));te=s.getValue(N+o,"*");let U=s.getValue(N+o*2,"*"),ve=Number(s.getValue(N+o*3,ke)),Ge=[];for(let _e=0;_e<ve;_e++)Ge.push(Number(s.getValue(U+_e*o,ke)));s._OrtFree(U)!==0&&be("Can't free memory for tensor dims.");let Ue=Ge.reduce((_e,Se)=>_e*Se,1);j=zt(ct);let vt=m==null?void 0:m.outputPreferredLocations[r[J]];if(j==="string"){if(vt==="gpu-buffer"||vt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let _e=[];for(let Se=0;Se<Ue;Se++){let qe=s.getValue(te+Se*o,"*"),Vt=s.getValue(te+(Se+1)*o,"*"),Gt=Se===Ue-1?void 0:Vt-qe;_e.push(s.UTF8ToString(qe,Gt))}X.push([j,Ge,_e,"cpu"])}else if(vt==="gpu-buffer"&&Ue>0){let _e=s.jsepGetBuffer;if(!_e)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Se=_e(te),qe=ni(ct,Ue);if(qe===void 0||!ja(j))throw new Error(`Unsupported data type: ${j}`);V=!0,X.push([j,Ge,{gpuBuffer:Se,download:s.jsepCreateDownloader(Se,qe,j),dispose:()=>{s._OrtReleaseTensor(ie)!==0&&be("Can't release tensor.")}},"gpu-buffer"])}else if(vt==="ml-tensor"&&Ue>0){let _e=s.webnnEnsureTensor,Se=s.webnnIsGraphInputOutputTypeSupported;if(!_e||!Se)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(ni(ct,Ue)===void 0||!Ka(j))throw new Error(`Unsupported data type: ${j}`);if(!Se(e,j,!1))throw new Error(`preferredLocation "ml-tensor" for ${j} output is not supported by current WebNN Context.`);let qe=await _e(e,te,ct,Ge,!1);V=!0,X.push([j,Ge,{mlTensor:qe,download:s.webnnCreateMLTensorDownloader(te,j),dispose:()=>{s.webnnReleaseTensorId(te),s._OrtReleaseTensor(ie)}},"ml-tensor"])}else if(vt==="ml-tensor-cpu-output"&&Ue>0){let _e=s.webnnCreateMLTensorDownloader(te,j)(),Se=X.length;V=!0,oe.push((async()=>{let qe=[Se,await _e];return s.webnnReleaseTensorId(te),s._OrtReleaseTensor(ie),qe})()),X.push([j,Ge,[],"cpu"])}else{let _e=Fn(j),Se=new _e(Ue);new Uint8Array(Se.buffer,Se.byteOffset,Se.byteLength).set(s.HEAPU8.subarray(te,te+Se.byteLength)),X.push([j,Ge,Se,"cpu"])}}finally{s.stackRestore(we),j==="string"&&te&&s._free(te),V||s._OrtReleaseTensor(ie)}}m&&!y&&(s._OrtClearBoundOutputs(m.handle)!==0&&be("Can't clear bound outputs."),Pt.set(e,[d,h,f,m,y,!1]));for(let[J,ie]of await Promise.all(oe))X[J][2]=ie;return si("wasm ProcessOutputTensor"),X}finally{(ue=s.webnnOnRunEnd)==null||ue.call(s,d),s.stackRestore(k),S.forEach(ae=>s._OrtReleaseTensor(ae)),T.forEach(ae=>s._OrtReleaseTensor(ae)),I.forEach(ae=>s._free(ae)),$!==0&&s._OrtReleaseRunOptions($),v.forEach(ae=>s._free(ae))}},ps=e=>{let t=$e(),i=Pt.get(e);if(!i)throw new Error("invalid session id");let r=i[0],a=t._OrtEndProfiling(r);a===0&&be("Can't get an profile file name."),t._OrtFree(a)},fs=e=>{let t=[];for(let i of e){let r=i[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}}),Lt,Ve,pi,Bi,Ni,vn,oa,$n,Xt,Jt,lc,jf,Kf,Zf,Yf,Xf,Jf,Qf,em=H(()=>{it(),qf(),di(),Va(),Lt=()=>!!ge.wasm.proxy&&typeof document<"u",pi=!1,Bi=!1,Ni=!1,$n=new Map,Xt=(e,t)=>{let i=$n.get(e);i?i.push(t):$n.set(e,[t])},Jt=()=>{if(pi||!Bi||Ni||!Ve)throw new Error("worker not ready")},lc=e=>{switch(e.data.type){case"init-wasm":pi=!1,e.data.err?(Ni=!0,oa[1](e.data.err)):(Bi=!0,oa[0]()),vn&&(URL.revokeObjectURL(vn),vn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=$n.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},jf=async()=>{if(!Bi){if(pi)throw new Error("multiple calls to 'initWasm()' detected.");if(Ni)throw new Error("previous call to 'initWasm()' failed.");if(pi=!0,Lt())return new Promise((e,t)=>{Ve==null||Ve.terminate(),Vc().then(([i,r])=>{try{Ve=r,Ve.onerror=n=>t(n),Ve.onmessage=lc,oa=[e,t];let a={type:"init-wasm",in:ge};!a.in.wasm.wasmPaths&&(i||ba)&&(a.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep-BGTZ4Y7F.wasm",import.meta.url).href,import.meta.url).href}),Ve.postMessage(a),vn=i}catch(a){t(a)}},t)});try{await Ga(ge.wasm),await ls(ge),Bi=!0}catch(e){throw Ni=!0,e}finally{pi=!1}}},Kf=async e=>{if(Lt())return Jt(),new Promise((t,i)=>{Xt("init-ep",[t,i]);let r={type:"init-ep",in:{epName:e,env:ge}};Ve.postMessage(r)});await us(ge,e)},Zf=async e=>Lt()?(Jt(),new Promise((t,i)=>{Xt("copy-from",[t,i]);let r={type:"copy-from",in:{buffer:e}};Ve.postMessage(r,[e.buffer])})):Ln(e),Yf=async(e,t)=>{if(Lt()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Jt(),new Promise((i,r)=>{Xt("create",[i,r]);let a={type:"create",in:{model:e,options:{...t}}},n=[];e instanceof Uint8Array&&n.push(e.buffer),Ve.postMessage(a,n)})}else return ds(e,t)},Xf=async e=>{if(Lt())return Jt(),new Promise((t,i)=>{Xt("release",[t,i]);let r={type:"release",in:e};Ve.postMessage(r)});cs(e)},Jf=async(e,t,i,r,a,n)=>{if(Lt()){if(i.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Jt(),new Promise((s,o)=>{Xt("run",[s,o]);let u=i,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:r,options:n}};Ve.postMessage(d,fs(u))})}else return hs(e,t,i,r,a,n)},Qf=async e=>{if(Lt())return Jt(),new Promise((t,i)=>{Xt("end-profiling",[t,i]);let r={type:"end-profiling",in:e};Ve.postMessage(r)});ps(e)}}),la,uc,tm,ry=H(()=>{it(),em(),re(),Wa(),Kc(),la=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},uc=e=>{switch(e[3]){case"cpu":return new tt(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!ja(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:i,download:r,dispose:a}=e[2];return tt.fromGpuBuffer(i,{dataType:t,dims:e[1],download:r,dispose:a})}case"ml-tensor":{let t=e[0];if(!Ka(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:i,download:r,dispose:a}=e[2];return tt.fromMLTensor(i,{dataType:t,dims:e[1],download:r,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},tm=class{async fetchModelAndCopyToWasmMemory(e){return Zf(await Za(e))}async loadModel(e,t){wt();let i;typeof e=="string"?i=await this.fetchModelAndCopyToWasmMemory(e):i=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Yf(i,t),dt()}async dispose(){return Xf(this.sessionId)}async run(e,t,i){wt();let r=[],a=[];Object.entries(e).forEach(f=>{let m=f[0],y=f[1],_=this.inputNames.indexOf(m);if(_===-1)throw new Error(`invalid input '${m}'`);r.push(y),a.push(_)});let n=[],s=[];Object.entries(t).forEach(f=>{let m=f[0],y=f[1],_=this.outputNames.indexOf(m);if(_===-1)throw new Error(`invalid output '${m}'`);n.push(y),s.push(_)});let o=r.map((f,m)=>la(f,()=>`input "${this.inputNames[a[m]]}"`)),u=n.map((f,m)=>f?la(f,()=>`output "${this.outputNames[s[m]]}"`):null),d=await Jf(this.sessionId,a,o,s,u,i),h={};for(let f=0;f<d.length;f++)h[this.outputNames[s[f]]]=n[f]??uc(d[f]);return dt(),h}startProfiling(){}endProfiling(){Qf(this.sessionId)}}}),im={};$i(im,{OnnxruntimeWebAssemblyBackend:()=>Oa,initializeFlags:()=>Ra,wasmBackend:()=>nm});var Ra,Oa,nm,ay=H(()=>{it(),em(),ry(),Ra=()=>{(typeof ge.wasm.initTimeout!="number"||ge.wasm.initTimeout<0)&&(ge.wasm.initTimeout=0);let e=ge.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ge.wasm.simd=!1),typeof ge.wasm.proxy!="boolean"&&(ge.wasm.proxy=!1),typeof ge.wasm.trace!="boolean"&&(ge.wasm.trace=!1),typeof ge.wasm.numThreads!="number"||!Number.isInteger(ge.wasm.numThreads)||ge.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ge.wasm.numThreads=1;else{let t=typeof navigator>"u"?Vg("node:os").cpus().length:navigator.hardwareConcurrency;ge.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Oa=class{async init(e){Ra(),await jf(),await Kf(e)}async createInferenceSessionHandler(e,t){let i=new tm;return await i.loadModel(e,t),i}},nm=new Oa});it();it();it();var sy="1.23.2";{let e=(ay(),Zi(im)).wasmBackend;fi("webgpu",e,5),fi("webnn",e,5),fi("cpu",e,10),fi("wasm",e,10)}Object.defineProperty(ge.versions,"web",{value:sy,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ri=class ri{constructor(){P(this,"container");P(this,"logContent");P(this,"isVisible",!1);this.container=document.createElement("div"),this.container.style.position="fixed",this.container.style.top="0",this.container.style.left="0",this.container.style.width="100vw",this.container.style.height="50vh",this.container.style.backgroundColor="rgba(0,0,0,0.8)",this.container.style.color="#0f0",this.container.style.fontFamily="monospace",this.container.style.fontSize="12px",this.container.style.overflowY="scroll",this.container.style.zIndex="9999",this.container.style.padding="10px",this.container.style.pointerEvents="none",this.container.style.display="none",this.logContent=document.createElement("pre"),this.logContent.style.margin="0",this.logContent.style.whiteSpace="pre-wrap",this.container.appendChild(this.logContent),document.body.appendChild(this.container);let t=0;document.addEventListener("touchstart",()=>{t++,setTimeout(()=>t=0,500),t===3&&this.toggle()})}static getInstance(){return ri.instance||(ri.instance=new ri),ri.instance}toggle(){this.isVisible=!this.isVisible,this.container.style.display=this.isVisible?"block":"none",this.container.style.pointerEvents=this.isVisible?"auto":"none"}log(t){console.log(t);const i=typeof t=="string"?t:JSON.stringify(t);this.logContent.textContent+=`> ${i}
`,this.container.scrollTop=this.container.scrollHeight}error(t){console.error(t);const i=typeof t=="string"?t:JSON.stringify(t);this.logContent.textContent+=`[ERR] ${i}
`,this.container.scrollTop=this.container.scrollHeight}};P(ri,"instance");let Da=ri;const Ae=Da.getInstance();function Xi(e,t,i){if(typeof OffscreenCanvas<"u")try{const r=new OffscreenCanvas(e,t),a=r.getContext("2d",i);if(a)return{canvas:r,ctx:a};console.warn("[canvas2d] OffscreenCanvas 2D context returned null, falling back to HTMLCanvasElement")}catch(r){console.warn("[canvas2d] OffscreenCanvas failed:",r)}if(typeof document<"u"){const r=document.createElement("canvas");r.width=e,r.height=t;const a=r.getContext("2d",i);if(a)return{canvas:r,ctx:a}}throw new Error("[canvas2d] 2D canvas context not supported in this environment")}const ms="pending-verification";function rm(){return/iPhone|iPad|iPod/.test(navigator.userAgent)}async function oy(e){const t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(r=>r.toString(16).padStart(2,"0")).join("")}function ly(e="/best.onnx"){return new URL(e,window.location.href).toString()}async function uy(e){const t={ok:!1,status:0,statusText:"",contentLength:null,actualBytes:0,buffer:null,error:null,headers:{}};try{const i=await fetch(e,{method:"GET",cache:"no-cache"});t.status=i.status,t.statusText=i.statusText,t.ok=i.ok,i.headers.forEach((n,s)=>{t.headers[s.toLowerCase()]=n});const r=i.headers.get("Content-Length");if(r&&(t.contentLength=parseInt(r,10)),!i.ok)return t.error=`HTTP ${i.status}: ${i.statusText}`,t;const a=await i.arrayBuffer();t.buffer=a,t.actualBytes=a.byteLength}catch(i){const r=i;t.error=`Fetch failed: ${r.message}`,r.message.includes("Failed to fetch")&&(t.error+=" (Possible CORS, network, or mixed-content issue)")}return t}function dc(e){const t=[],i=[];for(const r of e.inputNames)t.push({name:r,dims:["unknown"]});for(const r of e.outputNames)i.push({name:r,dims:["unknown"]});return{inputs:t,outputs:i}}function dy(){return{userAgent:navigator.userAgent,isIOS:rm(),isSecureContext:window.isSecureContext,modelUrl:null,fetchResult:null,sha256:null,hashMatch:!1,expectedHash:ms,backend:null,backendFallbackReason:null,ortSettings:{numThreads:ge.wasm.numThreads??0,simd:!!(ge.wasm.simd??!0),wasmPaths:String(ge.wasm.wasmPaths||"")},sessionInfo:null,lastInferenceMs:null,lastInferenceTimestamp:null,lastError:null,lastErrorStack:null}}function cy(e){for(let t=0;t<Math.min(e.length,1e4);t++)if(!Number.isFinite(e[t]))return!1;return!0}function hy(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/(1024*1024)).toFixed(2)} MB`}const py=["whale_blow"];class fy{constructor(){P(this,"session",null);P(this,"inputName","images");P(this,"outputName","output0");P(this,"inputShape",[1,3,640,640]);P(this,"enabled",!1);P(this,"useMock",!1);P(this,"canvasContext",null);P(this,"lastMockUpdate",0);P(this,"mockDetections",[]);P(this,"_lastInferenceMs",0);P(this,"_lastInferenceTimestamp",0);P(this,"_backendUsed","unknown");P(this,"_backendFallbackReason",null);P(this,"_lastFetchResult",null);P(this,"_modelSha256",null);rm()&&(ge.wasm.numThreads=1,ge.wasm.simd=!1,console.log("[InferenceEngine] iOS detected - using single-threaded WASM, SIMD disabled")),ge.wasm.wasmPaths="https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/",console.log("[InferenceEngine] WASM paths set to CDN")}get lastInferenceMs(){return this._lastInferenceMs}get lastInferenceTimestamp(){return this._lastInferenceTimestamp}get backendUsed(){return this._backendUsed}get backendFallbackReason(){return this._backendFallbackReason}get modelSha256(){return this._modelSha256}get lastFetchResult(){return this._lastFetchResult}getSessionInfo(){return this.session?dc(this.session):null}async init(t="/best.onnx"){try{this.canvasContext||(this.canvasContext=Xi(640,640,{willReadFrequently:!0})),Ae.log(`[Leviathan] Loading YOLO ONNX model from ${t}...`);const i={executionProviders:["webgpu","wasm"],graphOptimizationLevel:"all",logSeverityLevel:0};this.session=await Gi.create(t,i),Ae.log("[Leviathan] Model Loaded Successfully"),Ae.log("--- Inputs ---"),this.inputName=this.session.inputNames[0],this.session.inputNames.forEach(r=>{Ae.log(`Name: "${r}"`)}),Ae.log("--- Outputs ---"),this.outputName=this.session.outputNames[0],this.session.outputNames.forEach(r=>{Ae.log(`Name: "${r}"`)}),console.groupEnd(),this.enabled=!0,this.useMock=!1}catch(i){Ae.error(`[Leviathan] CRITICAL: Failed to load ONNX model. ${i}`),console.warn("[Leviathan] Falling back to MOCK mode for development."),this.useMock=!0,this.enabled=!0}}async run(t,i=.25,r=.45){if(!this.enabled)return[];if(this.useMock)return this.runMock(i);if(!this.session)return[];if(t instanceof HTMLVideoElement&&(t.readyState<2||t.videoWidth===0||t.videoHeight===0))return[];try{const a=this.preprocess(t),n={};n[this.inputName]=a;const o=(await this.session.run(n))[this.outputName],u=this.postprocess(o.data,o.dims,i,r),d=u.length>0?u[0].confidence:0,h=a.data,f=[h[0],h[100],h[1e3]];return(Date.now()%60===0||u.length>0)&&Ae.log(`Conf: ${d.toFixed(2)} | Input[0]: ${f[0].toFixed(3)} | Dets: ${u.length}`),u}catch(a){return console.error("[Ultralytics] Inference error:",a),[]}}preprocess(t){const[i,r,a,n]=this.inputShape,s=t instanceof HTMLVideoElement?t.videoWidth:t.width,o=t instanceof HTMLVideoElement?t.videoHeight:t.height,u=Math.min(n/s,a/o),d=Math.round(s*u),h=Math.round(o*u),f=(n-d)/2,m=(a-h)/2;if(!this.canvasContext)throw new Error("[InferenceEngine] Canvas not initialized - call init() first");const y=this.canvasContext.ctx;y.fillStyle="#808080",y.fillRect(0,0,n,a),y.drawImage(t,f,m,d,h);const b=y.getImageData(0,0,n,a).data,x=new Float32Array(r*a*n);for(let $=0;$<a;$++)for(let v=0;v<n;v++){const S=($*n+v)*4,T=b[S]/255,I=b[S+1]/255,k=b[S+2]/255;x[0*a*n+$*n+v]=T,x[1*a*n+$*n+v]=I,x[2*a*n+$*n+v]=k}return new tt("float32",x,this.inputShape)}postprocess(t,i,r,a){const n=[];let s,o,u;if(i.length===3)i[1]<i[2]?(o=i[1],s=i[2],u=!1):(s=i[1],o=i[2],u=!0);else return console.warn("[Ultralytics] Unexpected output dims:",i),[];const d=o-4;for(let h=0;h<s;h++){let f,m,y,_,b=[];if(u){const S=h*o;f=t[S],m=t[S+1],y=t[S+2],_=t[S+3];for(let T=0;T<d;T++)b.push(t[S+4+T])}else{f=t[0*s+h],m=t[1*s+h],y=t[2*s+h],_=t[3*s+h];for(let S=0;S<d;S++)b.push(t[(4+S)*s+h])}let x=0,$=0;for(let S=0;S<b.length;S++)b[S]>x&&(x=b[S],$=S);if(x<r)continue;const v={x:f/640,y:m/640,w:y/640,h:_/640,confidence:x,classId:$,label:py[$]||`class_${$}`};n.push(v)}return this.nms(n,a)}nms(t,i){t.sort((n,s)=>s.confidence-n.confidence);const r=[],a=new Set;for(let n=0;n<t.length;n++)if(!a.has(n)){r.push(t[n]);for(let s=n+1;s<t.length;s++){if(a.has(s))continue;this.computeIoU(t[n],t[s])>i&&a.add(s)}}return r}computeIoU(t,i){const r=t.x-t.w/2,a=t.y-t.h/2,n=t.x+t.w/2,s=t.y+t.h/2,o=i.x-i.w/2,u=i.y-i.h/2,d=i.x+i.w/2,h=i.y+i.h/2,f=Math.max(r,o),m=Math.max(a,u),y=Math.min(n,d),_=Math.min(s,h),b=Math.max(0,y-f),x=Math.max(0,_-m),$=b*x,v=t.w*t.h,S=i.w*i.h,T=v+S-$;return T>0?$/T:0}runMock(t){const i=Date.now();if(i-this.lastMockUpdate>2e3)if(this.lastMockUpdate=i,Math.random()<.3){const r=.2+Math.random()*.6,a=.4+Math.random()*.2,n=.6+Math.random()*.39;this.mockDetections=[{x:r,y:a,w:.05,h:.1,confidence:n,classId:0,label:"whale_blow"}]}else this.mockDetections=[];return this.mockDetections.filter(r=>r.confidence>=t)}async initFromUrl(t="/best.onnx"){const i=performance.now(),r={success:!1,fetchResult:null,sha256:null,hashMatch:!1,backend:"unknown",backendFallbackReason:null,sessionInfo:null,error:null,durationMs:0};try{this.canvasContext||(this.canvasContext=Xi(640,640,{willReadFrequently:!0}));const a=ly(t);Ae.log(`[Diagnostics] Fetching model from: ${a}`);const n=await uy(a);if(r.fetchResult=n,this._lastFetchResult=n,!n.ok||!n.buffer)return r.error=n.error||"Fetch failed",r.durationMs=performance.now()-i,r;Ae.log(`[Diagnostics] Fetched ${n.actualBytes} bytes`);const s=await oy(n.buffer);r.sha256=s,this._modelSha256=s,r.hashMatch=s===ms,Ae.log(`[Diagnostics] SHA-256: ${s.substring(0,16)}...`),Ae.log(`[Diagnostics] Hash match: ${r.hashMatch}`);const o={executionProviders:["webgpu","wasm"],graphOptimizationLevel:"all",logSeverityLevel:0};try{this.session=await Gi.create(n.buffer,o),typeof navigator<"u"&&"gpu"in navigator?this._backendUsed="webgpu (attempted)":this._backendUsed="wasm"}catch(u){Ae.log("[Diagnostics] WebGPU failed, falling back to WASM"),this._backendFallbackReason=String(u),r.backendFallbackReason=this._backendFallbackReason;const d={executionProviders:["wasm"],graphOptimizationLevel:"all",logSeverityLevel:0};this.session=await Gi.create(n.buffer,d),this._backendUsed="wasm"}r.backend=this._backendUsed,this.inputName=this.session.inputNames[0],this.outputName=this.session.outputNames[0],r.sessionInfo=dc(this.session),Ae.log(`[Diagnostics] Session created. Backend: ${this._backendUsed}`),Ae.log(`[Diagnostics] Inputs: ${this.session.inputNames.join(", ")}`),Ae.log(`[Diagnostics] Outputs: ${this.session.outputNames.join(", ")}`),this.enabled=!0,this.useMock=!1,r.success=!0}catch(a){const n=a;r.error=`${n.name}: ${n.message}`,Ae.error(`[Diagnostics] Init failed: ${r.error}`),this.useMock=!0,this.enabled=!0}return r.durationMs=performance.now()-i,r}async sanityRun(){const t=performance.now(),i={success:!1,inputShape:this.inputShape,outputShapes:[],outputsFinite:!1,durationMs:0,error:null};if(!this.session)return i.error="Session not initialized",i.durationMs=performance.now()-t,i;try{const r=new Float32Array(this.inputShape.reduce((u,d)=>u*d,1));r.fill(.5);const a=new tt("float32",r,this.inputShape),n={};n[this.inputName]=a;const s=performance.now(),o=await this.session.run(n);this._lastInferenceMs=performance.now()-s,this._lastInferenceTimestamp=Date.now();for(const[u,d]of Object.entries(o)){i.outputShapes.push({name:u,dims:d.dims});const h=d.data;i.outputsFinite=cy(h)}i.success=!0,Ae.log(`[Diagnostics] Sanity run: ${this._lastInferenceMs.toFixed(1)}ms`)}catch(r){const a=r;i.error=`${a.name}: ${a.message}`,Ae.error(`[Diagnostics] Sanity run failed: ${i.error}`)}return i.durationMs=performance.now()-t,i}async runOnCanvas(t,i=.25,r=.45){const a=performance.now(),n=await this.run(t,i,r),s=performance.now()-a;return this._lastInferenceMs=s,this._lastInferenceTimestamp=Date.now(),{detections:n,inferenceMs:s}}}const gt={LOADING:"LOADING",READY:"READY",DETECTING:"DETECTING",EVENT:"EVENT",ERROR:"ERROR"};class my{constructor(){P(this,"currentState",gt.LOADING);P(this,"listeners",[])}get state(){return this.currentState}set state(t){this.currentState!==t&&(console.log(`[StateSystem] Transition: ${this.currentState} -> ${t}`),this.currentState=t,this.notify())}addListener(t){this.listeners.push(t),t(this.currentState)}removeListener(t){this.listeners=this.listeners.filter(i=>i!==t)}notify(){this.listeners.forEach(t=>t(this.currentState))}}const mt=new my;class gy{constructor(t){P(this,"canvas");P(this,"ctx");P(this,"history",[]);this.canvas=t;const i=t.getContext("2d");if(!i)throw new Error("Could not get canvas context");this.ctx=i}resize(t,i){this.canvas.width=t,this.canvas.height=i}draw(t){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.history.push({detections:[...t],timestamp:Date.now()});const i=Date.now();this.history=this.history.filter(r=>i-r.timestamp<1e3),this.history.forEach(r=>{const a=i-r.timestamp,n=1-a/1e3;n<=0||r.detections.forEach(s=>{a<50||this.drawBox(s,n*.3,!1)})}),t.forEach(r=>{this.drawBox(r,1,!0)})}drawBox(t,i,r){const{x:a,y:n,w:s,h:o,confidence:u}=t,d=this.canvas.width,h=this.canvas.height,f=(a-s/2)*d,m=(n-o/2)*h,y=s*d,_=o*h;let b="#ff5252";if(u>=.85?b="#4caf50":u>=.65&&(b="#ffc107"),this.ctx.strokeStyle=b,this.ctx.globalAlpha=i,this.ctx.lineWidth=2,this.ctx.strokeRect(f,m,y,_),r&&u>.85&&(this.ctx.shadowColor=b,this.ctx.shadowBlur=10,this.ctx.strokeRect(f,m,y,_),this.ctx.shadowBlur=0),r){this.ctx.fillStyle=b,this.ctx.font="12px Inter, monospace",this.ctx.textBaseline="bottom";const x=`Blow · ${u.toFixed(2)}`,$=this.ctx.measureText(x).width;this.ctx.fillRect(f,m-16,$+8,16),this.ctx.fillStyle="#000",this.ctx.fillText(x,f+4,m-2)}this.ctx.globalAlpha=1}}const Ne=[];for(let e=0;e<256;++e)Ne.push((e+256).toString(16).slice(1));function yy(e,t=0){return(Ne[e[t+0]]+Ne[e[t+1]]+Ne[e[t+2]]+Ne[e[t+3]]+"-"+Ne[e[t+4]]+Ne[e[t+5]]+"-"+Ne[e[t+6]]+Ne[e[t+7]]+"-"+Ne[e[t+8]]+Ne[e[t+9]]+"-"+Ne[e[t+10]]+Ne[e[t+11]]+Ne[e[t+12]]+Ne[e[t+13]]+Ne[e[t+14]]+Ne[e[t+15]]).toLowerCase()}let ua;const _y=new Uint8Array(16);function by(){if(!ua){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");ua=crypto.getRandomValues.bind(crypto)}return ua(_y)}const wy=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),cc={randomUUID:wy};function vy(e,t,i){var a;e=e||{};const r=e.random??((a=e.rng)==null?void 0:a.call(e))??by();if(r.length<16)throw new Error("Random bytes length must be >= 16");return r[6]=r[6]&15|64,r[8]=r[8]&63|128,yy(r)}function am(e,t,i){return cc.randomUUID&&!e?cc.randomUUID():vy(e)}class $y{constructor(){P(this,"tracks",[]);P(this,"maxMisses",5);P(this,"minHits",2)}update(t){const i=[],r=new Set(this.tracks.map((s,o)=>o)),a=new Set(t.map((s,o)=>o));t.forEach((s,o)=>{let u=0,d=-1;this.tracks.forEach((h,f)=>{if(!r.has(f))return;const m=this.getIoU(s,h.lastDet);m>.3&&m>u&&(u=m,d=f)}),d!==-1&&(i.push({trackIdx:d,detIdx:o}),r.delete(d),a.delete(o))}),i.forEach(({trackIdx:s,detIdx:o})=>{const u=this.tracks[s];u.hits++,u.misses=0,u.lastDet=t[o],u.history.push(t[o]),u.history.length>10&&u.history.shift()}),a.forEach(s=>{this.tracks.push({id:am(),hits:1,misses:0,lastDet:t[s],history:[t[s]]})});for(let s=this.tracks.length-1;s>=0;s--)r.has(s)&&(this.tracks[s].misses++,this.tracks[s].misses>this.maxMisses&&this.tracks.splice(s,1));const n=[];return this.tracks.forEach(s=>{(s.hits>=this.minHits||s.lastDet.confidence>.8)&&n.push(s.lastDet)}),n}getIoU(t,i){const r=Math.max(t.x-t.w/2,i.x-i.w/2),a=Math.max(t.y-t.h/2,i.y-i.h/2),n=Math.min(t.x+t.w/2,i.x+i.w/2),s=Math.min(t.y+t.h/2,i.y+i.h/2);if(n<r||s<a)return 0;const o=(n-r)*(s-a),u=t.w*t.h,d=i.w*i.h;return o/(u+d-o)}}class xy{constructor(){P(this,"BLOW_HEIGHT_MIN",2);P(this,"BLOW_HEIGHT_MAX",6);P(this,"VFOV_RAD",45*(Math.PI/180))}estimate(t){const i=t.h*this.VFOV_RAD;if(i<=0)return{min:0,max:0,desc:"Unknown"};const r=this.BLOW_HEIGHT_MIN/Math.tan(i),a=this.BLOW_HEIGHT_MAX/Math.tan(i),n=(r/1e3).toFixed(1),s=(a/1e3).toFixed(1);return{min:Math.floor(r),max:Math.floor(a),desc:`~${n}-${s} km`}}}const sm=6371e3,ut=9.80665,Sy=1.17,ye=Math.PI/180,ce=180/Math.PI;function om(){return{w:1,x:0,y:0,z:0}}function Ba(e,t){return{w:e.w*t.w-e.x*t.x-e.y*t.y-e.z*t.z,x:e.w*t.x+e.x*t.w+e.y*t.z-e.z*t.y,y:e.w*t.y-e.x*t.z+e.y*t.w+e.z*t.x,z:e.w*t.z+e.x*t.y-e.y*t.x+e.z*t.w}}function lm(e){const t=Math.sqrt(e.w*e.w+e.x*e.x+e.y*e.y+e.z*e.z);return t<1e-10?om():{w:e.w/t,x:e.x/t,y:e.y/t,z:e.z/t}}function um(e){return{w:e.w,x:-e.x,y:-e.y,z:-e.z}}function xn(e){const t=2*(e.w*e.x+e.y*e.z),i=1-2*(e.x*e.x+e.y*e.y),r=Math.atan2(t,i),a=2*(e.w*e.y-e.z*e.x),n=Math.abs(a)>=1?Math.sign(a)*Math.PI/2:Math.asin(a),s=2*(e.w*e.z+e.x*e.y),o=1-2*(e.y*e.y+e.z*e.z),u=Math.atan2(s,o);return{roll:r,pitch:n,yaw:u}}function hc(e){const{roll:t,pitch:i,yaw:r}=e,a=Math.cos(t/2),n=Math.sin(t/2),s=Math.cos(i/2),o=Math.sin(i/2),u=Math.cos(r/2),d=Math.sin(r/2);return lm({w:a*s*u+n*o*d,x:n*s*u-a*o*d,y:a*o*u+n*s*d,z:a*s*d-n*o*u})}function Cy(e,t){const i={w:0,x:t.x,y:t.y,z:t.z},r=Ba(Ba(e,i),um(e));return{x:r.x,y:r.y,z:r.z}}function Na(e){return Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z)}function Sn(e){const t=Na(e);return t<1e-10?{x:0,y:0,z:0}:{x:e.x/t,y:e.y/t,z:e.z/t}}function Ty(e,t){return{x:e.x-t.x,y:e.y-t.y,z:e.z-t.z}}class dm{constructor(){P(this,"events",[]);P(this,"observerLat",null);P(this,"observerLon",null)}captureWithLocation(t,i,r,a,n=1){const s=document.createElement("canvas"),o=.5,u=a.width,d=a.height;let h=(t.x-t.w/2)*u,f=(t.y-t.h/2)*d,m=t.w*u,y=t.h*d;h-=m*o,f-=y*o,m+=m*(o*2),y+=y*(o*2),s.width=200,s.height=200*(y/m);const _=s.getContext("2d");_&&_.drawImage(a,h,f,m,y,0,0,s.width,s.height);const b={event_id:(r==null?void 0:r.eventId)??am(),event_type:"whale_blow",timestamp:new Date().toISOString(),confidence:t.confidence,bbox:[t.x,t.y,t.w,t.h],resolution:[a.width,a.height],device:"leviathan_mobile_v1.0",optics:n>1?`digital_${n}x`:"native",zoom:n,distance_estimate_m:[i.min,i.max],distance_best_m:(r==null?void 0:r.distance)??null,location:{observer:{lat:r?this.getStoredObserverLat():null,lon:r?this.getStoredObserverLon():null},blow:{lat:(r==null?void 0:r.position.latitude)??null,lon:(r==null?void 0:r.position.longitude)??null}},bearing_deg:(r==null?void 0:r.bearing)??null,relative_bearing_deg:(r==null?void 0:r.relativeBearing)??null,uncertainty:{distance_percent:(r==null?void 0:r.uncertainty.distancePercent)??null,bearing_deg:(r==null?void 0:r.uncertainty.bearingDegrees)??null,position_m:(r==null?void 0:r.uncertainty.positionMeters)??null},notes:r?`Localized at ${r.bearing.toFixed(0)}° bearing, ${r.distance}m distance`:"Localization unavailable",thumbnail:s.toDataURL("image/jpeg",.7)};return this.events.push(b),this.persist(),console.log("[Leviathan] Blow Event Captured:",b),b}capture(t,i,r){return this.captureWithLocation(t,i,null,r,1)}static formatEventLocation(t){if(!t.location.blow.lat||!t.location.blow.lon)return"Location pending...";const i=t.location.blow.lat.toFixed(5),r=t.location.blow.lon.toFixed(5),a=t.distance_best_m?t.distance_best_m<1e3?`${t.distance_best_m}m`:`${(t.distance_best_m/1e3).toFixed(1)}km`:"?";return`${i}°, ${r}° @ ${a}`}getRecentEvents(){return this.events.slice(-10).reverse()}exportJSON(){return JSON.stringify(this.events,null,2)}exportCSV(){const t=["event_id","timestamp","confidence","observer_lat","observer_lon","blow_lat","blow_lon","bearing_deg","distance_m","zoom","uncertainty_m"].join(","),i=this.events.map(r=>{var a,n,s,o,u;return[r.event_id,r.timestamp,r.confidence.toFixed(3),((a=r.location.observer.lat)==null?void 0:a.toFixed(6))??"",((n=r.location.observer.lon)==null?void 0:n.toFixed(6))??"",((s=r.location.blow.lat)==null?void 0:s.toFixed(6))??"",((o=r.location.blow.lon)==null?void 0:o.toFixed(6))??"",((u=r.bearing_deg)==null?void 0:u.toFixed(1))??"",r.distance_best_m??"",r.zoom,r.uncertainty.position_m??""].join(",")});return[t,...i].join(`
`)}setObserverPosition(t,i){this.observerLat=t,this.observerLon=i}getStoredObserverLat(){return this.observerLat}getStoredObserverLon(){return this.observerLon}persist(){try{localStorage.setItem("leviathan_events",JSON.stringify(this.events.slice(-100)))}catch{}}loadFromStorage(){try{const t=localStorage.getItem("leviathan_events");t&&(this.events=JSON.parse(t))}catch{}}}const Cn=100;class gs{constructor(){P(this,"orientation",{alpha:0,beta:0,gamma:0,absolute:!1});P(this,"motion",{accelX:0,accelY:0,accelZ:0});P(this,"available",!1);P(this,"permissionGranted",!1);P(this,"useMock",!1);P(this,"mockInterval",null);P(this,"imuBuffer",[]);P(this,"imuBufferIndex",0);P(this,"latestIMU",null);P(this,"lastMotionTime",0);P(this,"sampleInterval",0);this.handleOrientation=this.handleOrientation.bind(this),this.handleMotion=this.handleMotion.bind(this)}startMockMode(){this.useMock=!0,this.available=!0,this.permissionGranted=!0;let t=0;const i=16;this.mockInterval=window.setInterval(()=>{const r=Date.now();t+=.02;const a=.05*Math.sin(t*.5),n=.03*Math.cos(t*.7),s=.01*Math.sin(t*.3),o=5*Math.sin(t*.5)*(Math.PI/180),u=3*Math.cos(t*.7)*(Math.PI/180),d=9.81,h=d*Math.sin(o),f=-d*Math.sin(u)*Math.cos(o),m=d*Math.cos(u)*Math.cos(o),y={timestamp:r,gyro:{x:a,y:n,z:s},accel:{x:0,y:0,z:0},accelWithGravity:{x:h,y:f,z:m}};this.imuBuffer.length<Cn?this.imuBuffer.push(y):(this.imuBuffer[this.imuBufferIndex]=y,this.imuBufferIndex=(this.imuBufferIndex+1)%Cn),this.latestIMU=y,this.orientation={alpha:(180+30*Math.sin(t*.1))%360,beta:u*180/Math.PI,gamma:o*180/Math.PI,absolute:!0},this.sampleInterval=i},i),console.log("[SensorManager] Mock mode started - simulating boat motion")}stopMockMode(){this.mockInterval!==null&&(window.clearInterval(this.mockInterval),this.mockInterval=null),this.useMock=!1,console.log("[SensorManager] Mock mode stopped")}async requestPermission(){let t=!0,i=!0;if(typeof DeviceOrientationEvent.requestPermission=="function")try{t=await DeviceOrientationEvent.requestPermission()==="granted",t||console.warn("[SensorManager] DeviceOrientation permission denied")}catch(r){console.error("[SensorManager] DeviceOrientation permission error:",r),t=!1}if(typeof DeviceMotionEvent.requestPermission=="function")try{i=await DeviceMotionEvent.requestPermission()==="granted",i||console.warn("[SensorManager] DeviceMotion permission denied")}catch(r){console.error("[SensorManager] DeviceMotion permission error:",r),i=!1}return t&&i?(this.permissionGranted=!0,this.start(),!0):(console.warn("[SensorManager] Sensor permissions incomplete - orientation:",t,"motion:",i),!1)}start(){this.permissionGranted&&(window.addEventListener("deviceorientation",this.handleOrientation),window.addEventListener("devicemotion",this.handleMotion),this.available=!0,console.log("[SensorManager] Started listening for IMU events"))}stop(){window.removeEventListener("deviceorientation",this.handleOrientation),window.removeEventListener("devicemotion",this.handleMotion),this.available=!1}handleOrientation(t){let i=t.alpha,r=t.absolute||!1;t.webkitCompassHeading!==void 0&&(i=t.webkitCompassHeading,r=!0),this.orientation={alpha:i,beta:t.beta,gamma:t.gamma,absolute:r}}handleMotion(t){var u,d,h,f,m,y;const i=Date.now();if(this.lastMotionTime>0){const _=i-this.lastMotionTime;this.sampleInterval=this.sampleInterval*.9+_*.1}this.lastMotionTime=i;const r=t.rotationRate,a={x:r!=null&&r.alpha?r.alpha*(Math.PI/180):0,y:r!=null&&r.beta?r.beta*(Math.PI/180):0,z:r!=null&&r.gamma?r.gamma*(Math.PI/180):0},n={x:((u=t.acceleration)==null?void 0:u.x)||0,y:((d=t.acceleration)==null?void 0:d.y)||0,z:((h=t.acceleration)==null?void 0:h.z)||0},s={x:((f=t.accelerationIncludingGravity)==null?void 0:f.x)||0,y:((m=t.accelerationIncludingGravity)==null?void 0:m.y)||0,z:((y=t.accelerationIncludingGravity)==null?void 0:y.z)||0},o={timestamp:i,gyro:a,accel:n,accelWithGravity:s};this.imuBuffer.length<Cn?this.imuBuffer.push(o):(this.imuBuffer[this.imuBufferIndex]=o,this.imuBufferIndex=(this.imuBufferIndex+1)%Cn),this.latestIMU=o,this.motion={accelX:s.x,accelY:s.y,accelZ:s.z}}getLatestIMU(){return this.latestIMU}getIMUSamplesSince(t){return this.imuBuffer.filter(i=>i.timestamp>t).sort((i,r)=>i.timestamp-r.timestamp)}getSampleRate(){return this.sampleInterval<=0?0:1e3/this.sampleInterval}getMagneticHeading(){return!this.orientation.absolute||this.orientation.alpha===null?null:this.orientation.alpha}getDevicePitch(){return this.orientation.beta}getDeviceRoll(){return this.orientation.gamma}getGravityVector(){return this.latestIMU?this.latestIMU.accelWithGravity:null}getHeadingString(){return this.orientation.alpha===null?"---°":`${Math.round(this.orientation.alpha)}°`}getPitchString(){return this.orientation.beta===null?"---°":`${Math.round(this.orientation.beta)}°`}getRollString(){return this.orientation.gamma===null?"---°":`${Math.round(this.orientation.gamma)}°`}}const pc=4.25,Iy=4.8,Ey=3.6,fc=1920,mc=1080;class ky{constructor(t=fc,i=mc){P(this,"baseIntrinsics");P(this,"currentZoom",1);P(this,"currentIntrinsics");const r=pc/Iy*t,a=pc/Ey*i,n=t/2,s=i/2;this.baseIntrinsics={fx:r,fy:a,cx:n,cy:s,width:t,height:i},this.currentIntrinsics={...this.baseIntrinsics}}updateForZoom(t){this.currentZoom=Math.max(1,t),this.currentIntrinsics={...this.baseIntrinsics,fx:this.baseIntrinsics.fx*this.currentZoom,fy:this.baseIntrinsics.fy*this.currentZoom}}updateForResolution(t,i){const r=t/fc,a=i/mc;this.baseIntrinsics={fx:this.baseIntrinsics.fx*r,fy:this.baseIntrinsics.fy*a,cx:t/2,cy:i/2,width:t,height:i},this.updateForZoom(this.currentZoom)}getIntrinsics(){return{...this.currentIntrinsics}}getKMatrix(){const{fx:t,fy:i,cx:r,cy:a}=this.currentIntrinsics;return[[t,0,r],[0,i,a],[0,0,1]]}getZoom(){return this.currentZoom}getVFOV(){return 2*Math.atan(this.currentIntrinsics.height/(2*this.currentIntrinsics.fy))}getHFOV(){return 2*Math.atan(this.currentIntrinsics.width/(2*this.currentIntrinsics.fx))}pixelToNormalized(t,i){const{fx:r,fy:a,cx:n,cy:s}=this.currentIntrinsics;return{x:(t-n)/r,y:(i-s)/a}}normalizedToPixel(t,i){const{fx:r,fy:a,cx:n,cy:s}=this.currentIntrinsics;return{u:t*r+n,v:i*a+s}}getPixelAngularSize(){return{horizontal:this.getHFOV()/this.currentIntrinsics.width,vertical:this.getVFOV()/this.currentIntrinsics.height}}static calculateDipAngle(t,i=1.17){const a=6371e3*i;return Math.acos(a/(a+t))}static calculateHorizonDistance(t,i=1.17){return Math.sqrt(2*i*6371e3*t)}}const zy={blowHeightMin:2,blowHeightMax:9,defaultBlowHeight:4.5,observerHeight:3};class Ji{constructor(t={}){P(this,"config");P(this,"observerPosition",null);P(this,"eventCounter",0);this.config={...zy,...t}}setObserverPosition(t){this.observerPosition=t}setObserverHeight(t){this.config.observerHeight=t}localize(t,i,r,a,n=1){const s=Date.now();if(!this.observerPosition)return console.warn("[BlowLocalizer] No observer position set"),null;if(!r)return console.warn("[BlowLocalizer] No heading available"),null;const o=t.x*i.width;t.y*i.height;const u=o-i.cx,h=Math.atan2(u,i.fx)*ce;let f=r.heading+h;f=(f%360+360)%360;const m=t.h*i.height,y=2*Math.atan(m/(2*i.fy));if(y<=.001)return console.warn("[BlowLocalizer] Detection too small for ranging"),null;const _=this.config.defaultBlowHeight/Math.tan(y),b=this.config.blowHeightMin/Math.tan(y),x=this.config.blowHeightMax/Math.tan(y);let $=_;if(a){const M=Math.cos(a.pitch);$=_*Math.max(.5,Math.min(2,1/M))}const v=this.projectPosition(this.observerPosition,f,$),S=(x-b)/$*100,T=3/i.fx*ce,I=Math.sqrt(r.uncertainty**2+T**2),k=Math.sqrt(($*Math.sin(I*ye))**2+((x-b)/2)**2),z=this.generateEventId(s);return{position:v,distance:Math.round($),distanceMin:Math.round(b),distanceMax:Math.round(x),bearing:Math.round(f*10)/10,relativeBearing:Math.round(h*10)/10,confidence:t.confidence,timestamp:s,eventId:z,zoomFactor:n,uncertainty:{distancePercent:Math.round(S),bearingDegrees:Math.round(I*10)/10,positionMeters:Math.round(k)}}}projectPosition(t,i,r){const a=t.latitude*ye,n=t.longitude*ye,s=i*ye,o=r/sm,u=Math.asin(Math.sin(a)*Math.cos(o)+Math.cos(a)*Math.sin(o)*Math.cos(s)),d=n+Math.atan2(Math.sin(s)*Math.sin(o)*Math.cos(a),Math.cos(o)-Math.sin(a)*Math.sin(u));return{latitude:u*ce,longitude:(d*ce+540)%360-180,altitude:0}}generateEventId(t){this.eventCounter++;const i=t.toString(16).slice(-8),r=this.eventCounter.toString(16).padStart(4,"0");return`BLOW-${i}-${r}`.toUpperCase()}static formatLocation(t){const i=t.position.latitude.toFixed(5),r=t.position.longitude.toFixed(5),a=t.distance<1e3?`${t.distance}m`:`${(t.distance/1e3).toFixed(1)}km`;return`${i}°, ${r}° @ ${a} bearing ${t.bearing}°`}static toJSON(t){return{event_id:t.eventId,timestamp:new Date(t.timestamp).toISOString(),position:{lat:t.position.latitude,lon:t.position.longitude},distance_m:t.distance,distance_range:{min:t.distanceMin,max:t.distanceMax},bearing_deg:t.bearing,relative_bearing_deg:t.relativeBearing,confidence:t.confidence,zoom:t.zoomFactor,uncertainty:t.uncertainty}}}new Ji;class My{constructor(){P(this,"mediaRecorder",null);P(this,"recordedChunks",[]);P(this,"isRecording",!1);P(this,"currentClipId",null);P(this,"clips",[]);P(this,"preRollBuffer",[]);P(this,"preRollDurationSec",3);P(this,"preRollRecorder",null);P(this,"stream",null)}init(t){if(this.stream=t,!window.MediaRecorder)return console.warn("[ClipRecorder] MediaRecorder not supported"),!1;const i=this.getSupportedMimeType();return i?(console.log(`[ClipRecorder] Initialized with codec: ${i}`),this.startPreRoll(i),!0):(console.warn("[ClipRecorder] No supported video codec found"),!1)}getSupportedMimeType(){const t=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm","video/mp4"];for(const i of t)if(MediaRecorder.isTypeSupported(i))return i;return null}startPreRoll(t){if(this.stream)try{this.preRollRecorder=new MediaRecorder(this.stream,{mimeType:t,videoBitsPerSecond:25e5}),this.preRollRecorder.ondataavailable=i=>{if(i.data.size>0){this.preRollBuffer.push(i.data);const r=this.preRollDurationSec;this.preRollBuffer.length>r&&this.preRollBuffer.shift()}},this.preRollRecorder.start(1e3),console.log("[ClipRecorder] Pre-roll buffer started")}catch(i){console.error("[ClipRecorder] Failed to start pre-roll:",i)}}startClip(t,i){if(!this.stream||this.isRecording)return null;const r=this.getSupportedMimeType();if(!r)return null;try{return this.currentClipId=`clip_${Date.now()}_${t.substring(0,8)}`,this.isRecording=!0,this.recordedChunks=[...this.preRollBuffer],this.mediaRecorder=new MediaRecorder(this.stream,{mimeType:r,videoBitsPerSecond:5e6}),this.mediaRecorder.ondataavailable=a=>{a.data.size>0&&this.recordedChunks.push(a.data)},this.mediaRecorder.onstop=()=>{this.finalizeClip(t,i)},this.mediaRecorder.start(500),console.log(`[ClipRecorder] Started clip: ${this.currentClipId}`),this.currentClipId}catch(a){return console.error("[ClipRecorder] Failed to start clip:",a),this.isRecording=!1,null}}stopClip(){this.mediaRecorder&&this.isRecording&&(this.mediaRecorder.stop(),this.isRecording=!1)}finalizeClip(t,i){if(this.recordedChunks.length===0){console.warn("[ClipRecorder] No chunks recorded");return}const r=this.getSupportedMimeType()||"video/webm",a=new Blob(this.recordedChunks,{type:r}),n=URL.createObjectURL(a),s={id:this.currentClipId,startTime:Date.now()-this.recordedChunks.length*500,endTime:Date.now(),duration:this.recordedChunks.length*500,blobs:this.recordedChunks,url:n,eventId:t,confidence:i};this.clips.push(s),console.log(`[ClipRecorder] Clip finalized: ${s.id}, ${(a.size/1024/1024).toFixed(2)}MB`),this.downloadClip(s),this.currentClipId=null,this.recordedChunks=[]}downloadClip(t){if(!t.url)return;const i=document.createElement("a");i.href=t.url,i.download=`${t.id}.webm`,document.body.appendChild(i),i.click(),document.body.removeChild(i),console.log(`[ClipRecorder] Downloaded: ${t.id}`)}getClips(){return this.clips}getLatestClip(){return this.clips.length>0?this.clips[this.clips.length-1]:null}dispose(){this.preRollRecorder&&this.preRollRecorder.state!=="inactive"&&this.preRollRecorder.stop(),this.mediaRecorder&&this.mediaRecorder.state!=="inactive"&&this.mediaRecorder.stop();for(const t of this.clips)t.url&&URL.revokeObjectURL(t.url);this.clips=[],this.preRollBuffer=[]}}const zn=new My,Ay={coarseSize:64,rollRange:30*ye,rollStep:2*ye,pitchRange:.4,pitchSteps:20,glareThreshold:245,glareSaturationMax:30,minConfidence:.3};class gi{constructor(t={}){P(this,"config");P(this,"coarseCanvasCtx");P(this,"tempCanvasCtx");this.config={...Ay,...t},this.coarseCanvasCtx=Xi(this.config.coarseSize,this.config.coarseSize,{willReadFrequently:!0}),this.tempCanvasCtx=Xi(640,480,{willReadFrequently:!0})}detect(t,i,r=3){const a=performance.now();try{const n=this.getImageData(t);if(!n)return{horizon:null,processingTime:performance.now()-a,glareMasked:!1,failureReason:"Failed to get image data"};const{data:s,glareMasked:o}=this.maskGlare(n),u=this.downsample(s),d=this.coarseSearch(u),h=this.fineRefine(s,d);return h.confidence<this.config.minConfidence?{horizon:null,processingTime:performance.now()-a,glareMasked:o,failureReason:`Low confidence: ${h.confidence.toFixed(2)}`}:{horizon:this.computeHorizonLine(h,s.width,s.height,i,r),processingTime:performance.now()-a,glareMasked:o}}catch(n){return{horizon:null,processingTime:performance.now()-a,glareMasked:!1,failureReason:`Error: ${n}`}}}getImageData(t){if(t instanceof ImageData)return t;const i=t instanceof HTMLVideoElement?t.videoWidth:t.width,r=t instanceof HTMLVideoElement?t.videoHeight:t.height;if(i===0||r===0)return null;const a=Math.min(640,i),n=Math.round(a*(r/i)),s=this.tempCanvasCtx.canvas,o=this.tempCanvasCtx.ctx;return(s.width!==a||s.height!==n)&&(s.width=a,s.height=n),o.drawImage(t,0,0,a,n),o.getImageData(0,0,a,n)}maskGlare(t){const{data:i,width:r,height:a}=t,n=new ImageData(new Uint8ClampedArray(i),r,a);let s=!1;for(let o=0;o<i.length;o+=4){const u=i[o],d=i[o+1],h=i[o+2],f=Math.max(u,d,h),m=Math.min(u,d,h),y=f===0?0:(f-m)/f*255;f>this.config.glareThreshold&&y<this.config.glareSaturationMax&&(n.data[o]=128,n.data[o+1]=128,n.data[o+2]=128,n.data[o+3]=0,s=!0)}return{data:n,glareMasked:s}}downsample(t){const i=this.config.coarseSize,r=this.coarseCanvasCtx.canvas;this.coarseCanvasCtx.ctx,(r.width!==i||r.height!==i)&&(r.width=i,r.height=i);const a=t.width/i,n=t.height/i,s=new ImageData(i,i);for(let o=0;o<i;o++)for(let u=0;u<i;u++){const d=Math.floor(u*a),f=(Math.floor(o*n)*t.width+d)*4,m=(o*i+u)*4;s.data[m]=t.data[f],s.data[m+1]=t.data[f+1],s.data[m+2]=t.data[f+2],s.data[m+3]=t.data[f+3]}return s}createImageBitmap(t){return t}coarseSearch(t){const{rollRange:i,rollStep:r,pitchRange:a,pitchSteps:n}=this.config,{width:s,height:o}=t;let u=0,d=o/2,h=1/0;for(let f=-i;f<=i;f+=r){const m=o*(.5-a),y=o*(.5+a),_=(y-m)/n;for(let b=m;b<=y;b+=_){const x=this.computeLineScore(t,f,b);x<h&&(h=x,u=f,d=b)}}return{roll:u,offset:d,score:h}}fineRefine(t,i){let{roll:r,offset:a}=i;const{height:n}=t,s=.5*ye,o=2,u=10;let d=this.computeLineScore(t,r,a);for(let f=0;f<u;f++){let m=!1;const y=[{r:r+s,o:a},{r:r-s,o:a},{r,o:a+o},{r,o:a-o},{r:r+s,o:a+o},{r:r-s,o:a-o}];for(const{r:_,o:b}of y){const x=this.computeLineScore(t,_,b);x<d&&(r=_,a=b,d=x,m=!0)}if(!m)break}const h=Math.max(0,Math.min(1,1-d/1e4));return a=Math.max(0,Math.min(n,a)),{roll:r,offset:a,confidence:h}}computeLineScore(t,i,r){const{data:a,width:n,height:s}=t;let o=0,u=0,d=0,h=0,f=0,m=0;const y=Math.cos(i),_=Math.sin(i),b=n/2,x=s/2;for(let O=0;O<s;O++)for(let F=0;F<n;F++){const K=(O*n+F)*4;if(a[K+3]===0)continue;const G=.299*a[K]+.587*a[K+1]+.114*a[K+2],q=F-b,ue=O-x;-q*_+ue*y+x<r?(o+=G,f+=G*G,u++):(d+=G,m+=G*G,h++)}if(u<10||h<10)return 1/0;const $=o/u,v=d/h,S=f/u-$*$,T=m/h-v*v,I=u+h,k=(u*S+h*T)/I,M=Math.abs($-v)<10?1e3:0;return k+M}computeHorizonLine(t,i,r,a,n){const s=-t.roll,o=t.offset-r/2,u=Math.atan(o/a.fy),d=sm*Sy,h=Math.acos(d/(d+n)),f=u+h;return{angle:t.roll,offset:t.offset,confidence:t.confidence,roll:s,pitch:f}}static getRollDegrees(t){return t.roll*ce}static getPitchDegrees(t){return t.pitch*ce}}const Ry={gyroNoise:.01,gyroBiasNoise:1e-4,accelNoise:.5,horizonRollNoise:2*ye,horizonPitchNoise:3*ye,chiSquaredGate:7.81,initialGyroBiasStd:.01};class Ut{constructor(t={}){P(this,"state");P(this,"config");P(this,"initialized",!1);P(this,"lastInnovation",{roll:0,pitch:0});P(this,"rejectedUpdates",0);P(this,"totalUpdates",0);this.config={...Ry,...t},this.state=this.createInitialState()}createInitialState(){const t=this.config.initialGyroBiasStd,i=[[.1,0,0,0,0,0],[0,.1,0,0,0,0],[0,0,.5,0,0,0],[0,0,0,t*t,0,0],[0,0,0,0,t*t,0],[0,0,0,0,0,t*t]];return{quaternion:om(),gyroBias:{x:0,y:0,z:0},covariance:i,timestamp:0}}initialize(t,i){this.state.quaternion=hc(t),this.state.timestamp=i,this.initialized=!0}initializeFromAccel(t,i){const r=Sn(t),a=Math.atan2(r.x,r.z),n=Math.atan2(-r.y,Math.sqrt(r.x*r.x+r.z*r.z));this.initialize({roll:a,pitch:n,yaw:0},i)}predict(t,i){if(!this.initialized){this.state.timestamp=i;return}const r=(i-this.state.timestamp)/1e3;if(r<=0||r>1){this.state.timestamp=i;return}const a={x:t.x-this.state.gyroBias.x,y:t.y-this.state.gyroBias.y,z:t.z-this.state.gyroBias.z},n=Na(a)*r;if(n>1e-10){const u=Sn(a),d=n/2,h=Math.sin(d),f={w:Math.cos(d),x:u.x*h,y:u.y*h,z:u.z*h};this.state.quaternion=lm(Ba(this.state.quaternion,f))}const s=this.computeStateTransition(a,r),o=this.computeProcessNoise(r);this.state.covariance=this.propagateCovariance(this.state.covariance,s,o),this.state.timestamp=i}updateWithGravity(t){if(!this.initialized)return!1;const i={x:0,y:0,z:ut},r=Cy(um(this.state.quaternion),i),a=Ty(Sn(t),Sn(r)),n=this.computeGravityJacobian(this.state.quaternion),s=[[this.config.accelNoise*this.config.accelNoise,0,0],[0,this.config.accelNoise*this.config.accelNoise,0],[0,0,this.config.accelNoise*this.config.accelNoise]],{S:o,K:u}=this.computeKalmanGain(this.state.covariance,n,s),d=[a.x,a.y,a.z],h=this.computeChiSquared(d,o);return this.totalUpdates++,h>this.config.chiSquaredGate?(this.rejectedUpdates++,!1):(this.applyCorrection(u,d,n,s),!0)}updateWithHorizon(t,i){if(!this.initialized)return!1;const r=xn(this.state.quaternion),a=this.wrapAngle(t-r.roll),n=this.wrapAngle(i-r.pitch);this.lastInnovation={roll:a,pitch:n};const s=[[1,0,0,0,0,0],[0,1,0,0,0,0]],o=[[this.config.horizonRollNoise*this.config.horizonRollNoise,0],[0,this.config.horizonPitchNoise*this.config.horizonPitchNoise]],{S:u,K:d}=this.computeKalmanGain(this.state.covariance,s,o),h=[a,n],f=this.computeChiSquared(h,u);return this.totalUpdates++,f>5.99?(this.rejectedUpdates++,!1):(this.applyCorrection(d,h,s,o),!0)}getOrientation(){return xn(this.state.quaternion)}getState(){return{orientation:xn(this.state.quaternion),rollStd:Math.sqrt(this.state.covariance[0][0]),pitchStd:Math.sqrt(this.state.covariance[1][1]),yawStd:Math.sqrt(this.state.covariance[2][2]),timestamp:this.state.timestamp}}getGyroBias(){return{...this.state.gyroBias}}getDiagnostics(){return{initialized:this.initialized,rejectionRate:this.totalUpdates>0?this.rejectedUpdates/this.totalUpdates:0,lastInnovation:this.lastInnovation,gyroBias:this.getGyroBias()}}processSamples(t){for(const i of t){this.predict(i.gyro,i.timestamp);const r=Na(i.accelWithGravity);Math.abs(r-ut)<1&&this.updateWithGravity(i.accelWithGravity)}}wrapAngle(t){for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;return t}computeStateTransition(t,i){return[[1,0,0,-i,0,0],[0,1,0,0,-i,0],[0,0,1,0,0,-i],[0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1]]}computeProcessNoise(t){const i=this.config.gyroNoise*t,r=this.config.gyroBiasNoise*t;return[[i*i,0,0,0,0,0],[0,i*i,0,0,0,0],[0,0,i*i,0,0,0],[0,0,0,r*r,0,0],[0,0,0,0,r*r,0],[0,0,0,0,0,r*r]]}propagateCovariance(t,i,r){t.length;const a=this.matMul(i,t),n=this.transpose(i),s=this.matMul(a,n);return this.matAdd(s,r)}computeGravityJacobian(t){return[[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,0,0,0]]}computeKalmanGain(t,i,r){const a=this.matMul(i,t),n=this.transpose(i),s=this.matMul(a,n),o=this.matAdd(s,r),u=this.matMul(t,n),d=this.matInv(o),h=this.matMul(u,d);return{S:o,K:h}}computeChiSquared(t,i){const r=this.matInv(i),a=t.length;let n=0;for(let s=0;s<a;s++)for(let o=0;o<a;o++)n+=t[s]*r[s][o]*t[o];return n}applyCorrection(t,i,r,a){const n=[],s=i.length;for(let v=0;v<6;v++){let S=0;for(let T=0;T<s;T++)S+=t[v][T]*i[T];n.push(S)}const o=xn(this.state.quaternion);o.roll+=n[0],o.pitch+=n[1],o.yaw+=n[2],this.state.quaternion=hc(o),this.state.gyroBias.x+=n[3],this.state.gyroBias.y+=n[4],this.state.gyroBias.z+=n[5];const u=this.matIdentity(6),d=this.matMul(t,r),h=this.matSub(u,d),f=this.transpose(h),m=this.matMul(h,this.state.covariance),y=this.matMul(m,f),_=this.transpose(t),b=this.matMul(t,a),x=this.matMul(b,_);let $=this.matAdd(y,x);$=this.forceSymmetry($),this.checkCovarianceSanity($),this.state.covariance=$}matIdentity(t){const i=[];for(let r=0;r<t;r++){const a=Array(t).fill(0);a[r]=1,i.push(a)}return i}matSub(t,i){const r=t.length,a=t[0].length,n=Array(r).fill(0).map(()=>Array(a).fill(0));for(let s=0;s<r;s++)for(let o=0;o<a;o++)n[s][o]=t[s][o]-i[s][o];return n}forceSymmetry(t){const i=t.length,r=Array(i).fill(0).map(()=>Array(i).fill(0));for(let a=0;a<i;a++)for(let n=0;n<i;n++)r[a][n]=.5*(t[a][n]+t[n][a]);return r}checkCovarianceSanity(t){const i=t.length;for(let r=0;r<i;r++){if(t[r][r]<0)throw new Error(`EKF Covariance Corruption: Negative diagonal at [${r},${r}] = ${t[r][r]}`);if(!Number.isFinite(t[r][r])||Number.isNaN(t[r][r]))throw new Error(`EKF Covariance Corruption: Non-finite value at [${r},${r}]`);for(let a=0;a<i;a++){if(!Number.isFinite(t[r][a])||Number.isNaN(t[r][a]))throw new Error(`EKF Covariance Corruption: Non-finite value at [${r},${a}]`);Math.abs(t[r][a]-t[a][r])>1e-10}}}matMul(t,i){const r=t.length,a=i[0].length,n=i.length,s=Array(r).fill(0).map(()=>Array(a).fill(0));for(let o=0;o<r;o++)for(let u=0;u<a;u++)for(let d=0;d<n;d++)s[o][u]+=t[o][d]*i[d][u];return s}transpose(t){const i=t.length,r=t[0].length,a=Array(r).fill(0).map(()=>Array(i).fill(0));for(let n=0;n<i;n++)for(let s=0;s<r;s++)a[s][n]=t[n][s];return a}matAdd(t,i){const r=t.length,a=t[0].length,n=Array(r).fill(0).map(()=>Array(a).fill(0));for(let s=0;s<r;s++)for(let o=0;o<a;o++)n[s][o]=t[s][o]+i[s][o];return n}matInv(t){if(t.length===2){const n=t[0][0]*t[1][1]-t[0][1]*t[1][0];if(Math.abs(n)<1e-10)return[[1,0],[0,1]];const s=1/n;return[[t[1][1]*s,-t[0][1]*s],[-t[1][0]*s,t[0][0]*s]]}const r=t[0][0]*(t[1][1]*t[2][2]-t[1][2]*t[2][1])-t[0][1]*(t[1][0]*t[2][2]-t[1][2]*t[2][0])+t[0][2]*(t[1][0]*t[2][1]-t[1][1]*t[2][0]);if(Math.abs(r)<1e-10)return[[1,0,0],[0,1,0],[0,0,1]];const a=1/r;return[[(t[1][1]*t[2][2]-t[1][2]*t[2][1])*a,(t[0][2]*t[2][1]-t[0][1]*t[2][2])*a,(t[0][1]*t[1][2]-t[0][2]*t[1][1])*a],[(t[1][2]*t[2][0]-t[1][0]*t[2][2])*a,(t[0][0]*t[2][2]-t[0][2]*t[2][0])*a,(t[0][2]*t[1][0]-t[0][0]*t[1][2])*a],[(t[1][0]*t[2][1]-t[1][1]*t[2][0])*a,(t[0][1]*t[2][0]-t[0][0]*t[2][1])*a,(t[0][0]*t[1][1]-t[0][1]*t[1][0])*a]]}}const Oy={timeConstant:8,heaveCutoff:.2,expectedWavePeriod:7};class Tn{constructor(t,i){P(this,"alpha");P(this,"value",null);const r=1/i;this.alpha=1-Math.exp(-r/t)}update(t){return this.value===null?this.value=t:this.value=this.alpha*t+(1-this.alpha)*this.value,this.value}getValue(){return this.value??0}reset(){this.value=null}}class Dy{constructor(t={},i=60){P(this,"config");P(this,"heaveVelocity",0);P(this,"heavePosition",0);P(this,"lastTimestamp",0);P(this,"accelFilter");P(this,"heaveFilter");P(this,"_baselineHeight",0);P(this,"heightHistory",[]);P(this,"maxHistoryLength",100);this.config={...Oy,...t},this.accelFilter={x:new Tn(.1,i),y:new Tn(.1,i),z:new Tn(.1,i)},this.heaveFilter=new Tn(this.config.timeConstant,i)}update(t,i){if(this.lastTimestamp===0)return this.lastTimestamp=i,0;const r=(i-this.lastTimestamp)/1e3;if(this.lastTimestamp=i,r<=0||r>1)return this.heavePosition;const n={x:this.accelFilter.x.update(t.x),y:this.accelFilter.y.update(t.y),z:this.accelFilter.z.update(t.z)}.z;this.heaveVelocity+=n*r;const s=.98;this.heaveVelocity*=s,this.heavePosition+=this.heaveVelocity*r;const o=.995;this.heavePosition*=o;const u=this.heaveFilter.update(this.heavePosition);return this.updateBaseline(u),u}getHeave(){return this.heaveFilter.getValue()}getEffectiveHeight(t){return t+this.getHeave()}getSmoothedHeight(t){return t+this.heaveFilter.getValue()}getWaveStatistics(){if(this.heightHistory.length<10)return{significantWaveHeight:0,peakToPeak:0,periodEstimate:this.config.expectedWavePeriod};const t=Math.min(...this.heightHistory),r=Math.max(...this.heightHistory)-t;return{significantWaveHeight:r*.64,peakToPeak:r,periodEstimate:this.config.expectedWavePeriod}}updateBaseline(t){if(this.heightHistory.push(t),this.heightHistory.length>this.maxHistoryLength&&this.heightHistory.shift(),this.heightHistory.length>0){const i=this.heightHistory.reduce((r,a)=>r+a,0);this._baselineHeight=i/this.heightHistory.length}}reset(){this.heaveVelocity=0,this.heavePosition=0,this.lastTimestamp=0,this._baselineHeight=0,this.heightHistory=[],this.accelFilter.x.reset(),this.accelFilter.y.reset(),this.accelFilter.z.reset(),this.heaveFilter.reset()}setExpectedWavePeriod(t){this.config.expectedWavePeriod=t}}class By{constructor(t,i=60){P(this,"waveFilter");P(this,"nominalHeight");this.nominalHeight=t,this.waveFilter=new Dy({},i)}update(t,i){this.waveFilter.update(t,i)}getInstantaneousHeight(){return this.waveFilter.getEffectiveHeight(this.nominalHeight)}getStableHeight(){return this.waveFilter.getSmoothedHeight(this.nominalHeight)}getHeightUncertainty(){return this.waveFilter.getWaveStatistics().significantWaveHeight/4}setNominalHeight(t){this.nominalHeight=t}}const Ny={brightnessThreshold:250,minBlobSize:20,maxBlobSize:5e3,saturationThreshold:50};class Py{constructor(t={}){P(this,"config");P(this,"tempCanvasCtx");this.config={...Ny,...t},this.tempCanvasCtx=Xi(320,240,{willReadFrequently:!0})}detect(t,i){const r=this.getImageData(t);if(!r)return null;const a=this.findBrightPixels(r);if(a.length===0)return null;const n=this.computeCentroid(a);if(!n)return null;const s=(t instanceof ImageData?t.width:t instanceof HTMLVideoElement?t.videoWidth:t.width)/r.width,o=(t instanceof ImageData?t.height:t instanceof HTMLVideoElement?t.videoHeight:t.height)/r.height,u=n.x*s,d=n.y*o,{relativeBearing:h,relativeElevation:f}=this.getRelativeAngles(u,d,i),m=this.computeConfidence(a.length,r.width*r.height);return{u,v:d,area:a.length*s*o,confidence:m,relativeBearing:h,relativeElevation:f}}getRelativeBearing(t,i){const r=t.x-i.cx;return Math.atan2(r,i.fx)}getRelativeElevation(t,i){const r=i.cy-t.y;return Math.atan2(r,i.fy)}getImageData(t){if(t instanceof ImageData)return t;const i=t instanceof HTMLVideoElement?t.videoWidth:t.width,r=t instanceof HTMLVideoElement?t.videoHeight:t.height;if(i===0||r===0)return null;const a=Math.min(320,i),n=Math.round(a*(r/i)),s=this.tempCanvasCtx.canvas,o=this.tempCanvasCtx.ctx;return(s.width!==a||s.height!==n)&&(s.width=a,s.height=n),o.drawImage(t,0,0,a,n),o.getImageData(0,0,a,n)}findBrightPixels(t){const{data:i,width:r,height:a}=t,n=[];for(let s=0;s<a;s++)for(let o=0;o<r;o++){const u=(s*r+o)*4,d=i[u],h=i[u+1],f=i[u+2],m=Math.max(d,h,f);if(m<this.config.brightnessThreshold)continue;const y=Math.min(d,h,f);(m>0?(m-y)/m*255:0)>this.config.saturationThreshold||n.push({x:o,y:s})}return n.length<this.config.minBlobSize||n.length>this.config.maxBlobSize?[]:n}computeCentroid(t){if(t.length===0)return null;let i=0,r=0;for(const a of t)i+=a.x,r+=a.y;return{x:i/t.length,y:r/t.length}}getRelativeAngles(t,i,r){const a=t-r.cx,n=r.cy-i;return{relativeBearing:Math.atan2(a,r.fx),relativeElevation:Math.atan2(n,r.fy)}}computeConfidence(t,i){const r=t/i,a=.001;return r<a*.1?.3:r>a*10?.5:.8+.2*Math.exp(-Math.abs(Math.log(r/a)))}}const da=2451545;class cm{getSunPosition(t,i,r=new Date){const a=t*ye,n=this.dateToJulianDate(r),s=(n-da)/36525,o=this.normalizeAngle(280.46646+36000.76983*s+3032e-7*s*s),d=this.normalizeAngle(357.52911+35999.05029*s-1537e-7*s*s)*ye,h=(1.914602-.004817*s-14e-6*s*s)*Math.sin(d)+(.019993-101e-6*s)*Math.sin(2*d)+289e-6*Math.sin(3*d),f=o+h,m=125.04-1934.136*s,y=f-.00569-.00478*Math.sin(m*ye),x=(23.439291111-.0130042*s-16e-8*s*s+.00256*Math.cos(m*ye))*ye,$=y*ye,v=Math.atan2(Math.cos(x)*Math.sin($),Math.cos($)),S=Math.asin(Math.sin(x)*Math.sin($)),T=n-da,I=T/36525;let k=280.46061837+360.98564736629*T+387933e-9*I*I-I*I*I/3871e4;k=this.normalizeAngle(k);const M=(k+i)*ye-v,O=Math.sin(a)*Math.sin(S)+Math.cos(a)*Math.cos(S)*Math.cos(M),F=Math.asin(O),K=(Math.sin(S)-Math.sin(F)*Math.sin(a))/(Math.cos(F)*Math.cos(a)),G=Math.max(-1,Math.min(1,K));let q=Math.acos(G);Math.sin(M)>0&&(q=2*Math.PI-q);const ue=F*ce;return{azimuth:q*ce,elevation:ue,visible:ue>-.833}}getSunTimes(t,i,r=new Date){const a=r.getUTCFullYear(),n=r.getUTCMonth(),s=r.getUTCDate(),o=new Date(Date.UTC(a,n,s,0,0,0)),u=i/15,d=new Date(o.getTime()+(12-u)*36e5);this.getSunPosition(t,i,d);const h=t*ye,f=this.getSolarDeclination(this.dateToJulianDate(r)),m=(Math.sin(-.833*ye)-Math.sin(h)*Math.sin(f))/(Math.cos(h)*Math.cos(f));if(m>1)return{sunrise:null,sunset:null,solarNoon:d};if(m<-1)return{sunrise:null,sunset:null,solarNoon:d};const y=Math.acos(m)*ce/15,_=new Date(d.getTime()-y*36e5),b=new Date(d.getTime()+y*36e5);return{sunrise:_,sunset:b,solarNoon:d}}isDaytime(t,i,r=new Date){return this.getSunPosition(t,i,r).visible}dateToJulianDate(t){const i=t.getUTCFullYear(),r=t.getUTCMonth()+1,a=t.getUTCDate(),n=t.getUTCHours()+t.getUTCMinutes()/60+t.getUTCSeconds()/3600;let s=Math.floor((14-r)/12),o=i+4800-s,u=r+12*s-3;return a+Math.floor((153*u+2)/5)+365*o+Math.floor(o/4)-Math.floor(o/100)+Math.floor(o/400)-32045+(n-12)/24}getSolarDeclination(t){const i=(t-da)/36525,r=this.normalizeAngle(280.46646+36000.76983*i),n=this.normalizeAngle(357.52911+35999.05029*i)*ye,s=(1.914602-.004817*i)*Math.sin(n)+.019993*Math.sin(2*n),o=(r+s)*ye,u=23.439291111*ye;return Math.asin(Math.sin(u)*Math.sin(o))}normalizeAngle(t){return t=t%360,t<0&&(t+=360),t}}const Ly={minSunElevation:10,visualWeight:.7,magneticWeight:.3,smoothingFactor:.8,visualUncertainty:5,magneticUncertainty:15};class Pa{constructor(t={}){P(this,"config");P(this,"ephemeris");P(this,"sunTracker");P(this,"lastHeading",null);P(this,"lastVisualHeading",null);P(this,"lastUpdateTime",0);P(this,"latitude",0);P(this,"longitude",0);P(this,"locationSet",!1);this.config={...Ly,...t},this.ephemeris=new cm,this.sunTracker=new Py}setLocation(t,i){this.latitude=t,this.longitude=i,this.locationSet=!0}getSunPosition(){return this.locationSet?this.ephemeris.getSunPosition(this.latitude,this.longitude):null}updateFromCamera(t,i){if(!this.locationSet)return null;const r=this.ephemeris.getSunPosition(this.latitude,this.longitude);if(!r.visible||r.elevation<this.config.minSunElevation)return null;const a=this.sunTracker.detect(t,i);if(!a)return null;const n=this.computeHeadingFromSun(a,r,i);return this.lastVisualHeading=n,this.lastUpdateTime=Date.now(),n}computeHeadingFromSun(t,i,r){const a=i.azimuth,n=t.relativeBearing*ce;let s=a-n;return s=(s%360+360)%360,s}fuseWithMagnetic(t){const r=Date.now()-this.lastUpdateTime>5e3;if(this.lastVisualHeading===null&&t===null)return{heading:this.lastHeading??0,source:"magnetometer",confidence:0,uncertainty:180};if((t===null||!isFinite(t))&&this.lastVisualHeading!==null&&!r)return this.lastHeading=this.smoothHeading(this.lastVisualHeading),{heading:this.lastHeading,source:"visual_compass",confidence:.8,uncertainty:this.config.visualUncertainty};if(this.lastVisualHeading===null||r){const o=this.smoothHeading(t);return this.lastHeading=o,{heading:o,source:"magnetometer",confidence:.5,uncertainty:this.config.magneticUncertainty}}const a=this.fuseHeadings(this.lastVisualHeading,t,this.config.visualWeight,this.config.magneticWeight),n=this.smoothHeading(a);this.lastHeading=n;const s=Math.sqrt((this.config.visualWeight*this.config.visualUncertainty)**2+(this.config.magneticWeight*this.config.magneticUncertainty)**2)/(this.config.visualWeight+this.config.magneticWeight);return{heading:n,source:"fused",confidence:.9,uncertainty:s}}getHeading(t=null){return this.fuseWithMagnetic(t)}isAvailable(){if(!this.locationSet)return!1;const t=this.ephemeris.getSunPosition(this.latitude,this.longitude);return t.visible&&t.elevation>=this.config.minSunElevation}fuseHeadings(t,i,r,a){const n=t*ye,s=i*ye,o=r*Math.cos(n)+a*Math.cos(s),u=r*Math.sin(n)+a*Math.sin(s);let d=Math.atan2(u,o)*ce;return d=(d%360+360)%360,d}smoothHeading(t){if(this.lastHeading===null)return t;let i=t-this.lastHeading;return i>180&&(i-=360),i<-180&&(i+=360),((this.lastHeading+i*(1-this.config.smoothingFactor))%360+360)%360}}const Uy={showHorizon:!0,showPitchLadder:!0,showCompass:!0,showDebug:!1,horizonColor:"#00ff88",pitchLadderColor:"rgba(0, 255, 136, 0.5)",textColor:"#ffffff",lineWidth:2,fontSize:14};class Fy{constructor(t,i={}){P(this,"config");P(this,"canvas");P(this,"ctx");P(this,"width",0);P(this,"height",0);this.config={...Uy,...i},this.canvas=t,this.ctx=t.getContext("2d")}resize(t,i){this.width=t,this.height=i,this.canvas.width=t,this.canvas.height=i}render(t,i,r,a){this.ctx.clearRect(0,0,this.width,this.height),this.config.showHorizon&&r&&this.drawHorizonLine(r),this.config.showPitchLadder&&t&&this.drawArtificialHorizon(t),this.config.showCompass&&i&&this.drawCompass(i),this.config.showDebug&&a&&this.drawDebugInfo(a,i)}drawHorizonLine(t){const{roll:i,pitch:r,confidence:a}=t,n=this.width/2,s=this.height/2,o=Math.max(this.width,this.height)*1.5,u=this.height/60,d=r*ce*u,h=Math.cos(-i),f=Math.sin(-i),m=n-o*h,y=s+d-o*f,_=n+o*h,b=s+d+o*f;this.ctx.strokeStyle=this.config.horizonColor,this.ctx.lineWidth=this.config.lineWidth,this.ctx.globalAlpha=.3+.7*a,this.ctx.beginPath(),this.ctx.moveTo(m,y),this.ctx.lineTo(_,b),this.ctx.stroke(),this.ctx.globalAlpha=1,this.ctx.fillStyle=this.config.textColor,this.ctx.font=`${this.config.fontSize}px monospace`,this.ctx.fillText(`HOR ${(a*100).toFixed(0)}%`,10,this.height-60)}drawArtificialHorizon(t){const{roll:i,pitch:r}=t,a=this.width/2,n=this.height/2;this.ctx.save(),this.ctx.translate(a,n),this.ctx.rotate(-i);const s=this.height/60,o=r*ce;this.ctx.strokeStyle=this.config.pitchLadderColor,this.ctx.fillStyle=this.config.textColor,this.ctx.font=`${this.config.fontSize-2}px monospace`,this.ctx.textAlign="right";for(let u=-30;u<=30;u+=10){if(u===0)continue;const d=(u-o)*s,h=Math.abs(u)>=20?50:80;this.ctx.beginPath(),this.ctx.moveTo(-h,d),this.ctx.lineTo(-20,d),this.ctx.moveTo(20,d),this.ctx.lineTo(h,d),this.ctx.stroke(),this.ctx.fillText(`${u}`,-h-5,d+4)}this.ctx.strokeStyle=this.config.horizonColor,this.ctx.lineWidth=this.config.lineWidth+1,this.ctx.beginPath(),this.ctx.moveTo(-this.width/3,-o*s),this.ctx.lineTo(this.width/3,-o*s),this.ctx.stroke(),this.ctx.strokeStyle=this.config.textColor,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(-30,0),this.ctx.lineTo(-10,0),this.ctx.lineTo(-10,10),this.ctx.moveTo(30,0),this.ctx.lineTo(10,0),this.ctx.lineTo(10,10),this.ctx.stroke(),this.ctx.restore(),this.drawRollIndicator(i),this.ctx.fillStyle=this.config.textColor,this.ctx.font=`${this.config.fontSize}px monospace`,this.ctx.textAlign="left",this.ctx.fillText(`ROLL ${(i*ce).toFixed(1)}°`,10,this.height-40),this.ctx.fillText(`PITCH ${(r*ce).toFixed(1)}°`,10,this.height-20)}drawRollIndicator(t){const i=this.width/2,r=80,a=50;this.ctx.save(),this.ctx.translate(i,a),this.ctx.strokeStyle="rgba(255, 255, 255, 0.3)",this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(0,0,r,Math.PI*.7,Math.PI*.3,!0),this.ctx.stroke(),this.ctx.strokeStyle=this.config.textColor;for(let s=-60;s<=60;s+=10){const o=(s+90)*Math.PI/180,u=s%30===0?r-15:r-10;this.ctx.beginPath(),this.ctx.moveTo(Math.cos(o)*u,-Math.sin(o)*u),this.ctx.lineTo(Math.cos(o)*r,-Math.sin(o)*r),this.ctx.stroke()}const n=(t*ce-90)*Math.PI/180;this.ctx.fillStyle=this.config.horizonColor,this.ctx.beginPath(),this.ctx.moveTo(Math.cos(n)*(r+5),-Math.sin(n)*(r+5)),this.ctx.lineTo(Math.cos(n-.1)*(r+15),-Math.sin(n-.1)*(r+15)),this.ctx.lineTo(Math.cos(n+.1)*(r+15),-Math.sin(n+.1)*(r+15)),this.ctx.closePath(),this.ctx.fill(),this.ctx.restore()}drawCompass(t){const i=this.width/2,r=30;this.ctx.fillStyle=this.config.textColor,this.ctx.font=`bold ${this.config.fontSize+4}px monospace`,this.ctx.textAlign="center",this.ctx.fillText(`${t.heading.toFixed(0)}°`,i,r);const a=this.width*.6,n=i-a/2,s=r+20;this.ctx.strokeStyle="rgba(255, 255, 255, 0.5)",this.ctx.beginPath(),this.ctx.moveTo(n,s),this.ctx.lineTo(n+a,s),this.ctx.stroke(),this.ctx.font=`${this.config.fontSize-2}px monospace`;const u=a/60;for(let d=-180;d<=180;d+=10){let h=t.heading+d;if(h=(h%360+360)%360,Math.abs(d)>30)continue;const f=i+d*u,m=d%30===0?10:5;if(this.ctx.beginPath(),this.ctx.moveTo(f,s),this.ctx.lineTo(f,s+m),this.ctx.stroke(),d%30===0){const y=this.getCardinalLabel(h);this.ctx.fillText(y,f,s+22)}}this.ctx.fillStyle=this.config.horizonColor,this.ctx.beginPath(),this.ctx.moveTo(i,s-5),this.ctx.lineTo(i-5,s-12),this.ctx.lineTo(i+5,s-12),this.ctx.closePath(),this.ctx.fill(),this.ctx.fillStyle="rgba(255, 255, 255, 0.6)",this.ctx.font=`${this.config.fontSize-4}px monospace`,this.ctx.fillText(`${t.source.toUpperCase()} ±${t.uncertainty.toFixed(0)}°`,i,s+38)}getCardinalLabel(t){return t=Math.round(t),t===0||t===360?"N":t===90?"E":t===180?"S":t===270?"W":`${t}`}drawDebugInfo(t,i){this.ctx.fillStyle="rgba(0, 0, 0, 0.5)",this.ctx.fillRect(this.width-180,10,170,100),this.ctx.fillStyle="#00ff00",this.ctx.font="12px monospace",this.ctx.textAlign="left",[`σ_roll: ${(t.rollStd*ce).toFixed(2)}°`,`σ_pitch: ${(t.pitchStd*ce).toFixed(2)}°`,`σ_yaw: ${(t.yawStd*ce).toFixed(2)}°`,i?`HDG src: ${i.source}`:"HDG: N/A",`t: ${t.timestamp}`].forEach((a,n)=>{this.ctx.fillText(a,this.width-170,28+n*16)})}setOption(t,i){this.config[t]=i}}class Hy{constructor(t){P(this,"container");P(this,"contentDiv");P(this,"statusDiv");P(this,"testCanvas");P(this,"testCtx");P(this,"engine");P(this,"state");P(this,"isExpanded",!1);P(this,"liveTestRunning",!1);P(this,"liveTestAnimationId",null);P(this,"videoElement",null);this.engine=t,this.state=dy(),this.container=document.createElement("div"),this.container.id="diagnostics-panel",this.container.className="diag-panel collapsed";const i=document.createElement("button");i.className="diag-toggle",i.innerHTML="📊",i.title="Toggle Diagnostics Panel",i.addEventListener("click",()=>this.toggle()),this.contentDiv=document.createElement("div"),this.contentDiv.className="diag-content",this.statusDiv=document.createElement("div"),this.statusDiv.className="diag-status",this.testCanvas=document.createElement("canvas"),this.testCanvas.className="diag-test-canvas",this.testCanvas.width=320,this.testCanvas.height=240,this.testCtx=this.testCanvas.getContext("2d");const r=document.createElement("div");r.className="diag-buttons";const a=document.createElement("button");a.textContent="Init Model",a.addEventListener("click",()=>this.initModel());const n=document.createElement("button");n.textContent="Run Self-Test",n.addEventListener("click",()=>this.runSelfTest());const s=document.createElement("button");s.id="diag-live-btn",s.textContent="Start Live Test",s.addEventListener("click",()=>this.toggleLiveTest());const o=document.createElement("button");o.textContent="Copy JSON",o.addEventListener("click",()=>this.copyDiagnosticsJSON()),r.appendChild(a),r.appendChild(n),r.appendChild(s),r.appendChild(o),this.contentDiv.appendChild(this.statusDiv),this.contentDiv.appendChild(r),this.contentDiv.appendChild(this.testCanvas),this.container.appendChild(i),this.container.appendChild(this.contentDiv),this.renderStatus()}mount(t=document.body){t.appendChild(this.container)}toggle(){this.isExpanded=!this.isExpanded,this.container.classList.toggle("collapsed",!this.isExpanded),this.container.classList.toggle("expanded",this.isExpanded)}setVideoElement(t){this.videoElement=t}async initModel(){var t;this.updateStatus("Initializing model...");try{const i=await this.engine.initFromUrl("/best.onnx");this.state.modelUrl=((t=i.fetchResult)==null?void 0:t.headers["content-location"])||"/best.onnx",this.state.fetchResult=i.fetchResult,this.state.sha256=i.sha256,this.state.hashMatch=i.hashMatch,this.state.backend=i.backend,this.state.backendFallbackReason=i.backendFallbackReason,this.state.sessionInfo=i.sessionInfo,i.success||(this.state.lastError=i.error),this.renderStatus()}catch(i){const r=i;this.state.lastError=r.message,this.state.lastErrorStack=r.stack||null,this.renderStatus()}}async runSelfTest(){this.updateStatus("Running self-test...");const t={passed:!1,preprocessDims:[1,3,640,640],outputShapes:[],boxCount:0,confidenceStats:null,durationMs:0,error:null},i=performance.now();try{const r=new Image;r.crossOrigin="anonymous",await new Promise((u,d)=>{r.onload=()=>u(),r.onerror=()=>d(new Error("Failed to load test image")),r.src="/model_test.png"}),this.testCanvas.width=r.width,this.testCanvas.height=r.height,this.testCtx.drawImage(r,0,0);const{detections:a,inferenceMs:n}=await this.engine.runOnCanvas(this.testCanvas,.1,.45);t.boxCount=a.length,this.state.lastInferenceMs=n,this.state.lastInferenceTimestamp=Date.now();const s=this.engine.getSessionInfo();if(s&&(t.outputShapes=s.outputs.map(u=>({name:u.name,dims:u.dims.map(d=>typeof d=="number"?d:0)}))),a.length>0){const u=a.map(d=>d.confidence);t.confidenceStats={min:Math.min(...u),max:Math.max(...u),mean:u.reduce((d,h)=>d+h,0)/u.length}}this.drawDetections(a);const o=await this.engine.sanityRun();t.passed=o.success&&o.outputsFinite,t.passed?this.updateStatus(`✅ PASS - ${t.boxCount} boxes, ${n.toFixed(1)}ms`):this.updateStatus(`❌ FAIL - ${o.error||"Invalid outputs"}`)}catch(r){const a=r;t.error=a.message,this.updateStatus(`❌ FAIL - ${a.message}`)}t.durationMs=performance.now()-i,this.renderStatus()}toggleLiveTest(){const t=document.getElementById("diag-live-btn");if(this.liveTestRunning)this.liveTestRunning=!1,this.liveTestAnimationId&&(cancelAnimationFrame(this.liveTestAnimationId),this.liveTestAnimationId=null),t&&(t.textContent="Start Live Test"),this.updateStatus("Live test stopped");else{if(!this.videoElement){this.updateStatus("No video element set");return}this.liveTestRunning=!0,t&&(t.textContent="Stop Live Test"),this.runLiveTestLoop()}}async runLiveTestLoop(){if(!this.liveTestRunning||!this.videoElement)return;const t=performance.now();try{this.testCanvas.width=320,this.testCanvas.height=240,this.testCtx.drawImage(this.videoElement,0,0,320,240);const{detections:a,inferenceMs:n}=await this.engine.runOnCanvas(this.testCanvas,.25,.45);this.drawDetections(a),this.state.lastInferenceMs=n,this.state.lastInferenceTimestamp=Date.now();const s=performance.now()-t,o=Math.round(1e3/Math.max(s,1));this.updateStatus(`Live: ${o} FPS | ${n.toFixed(0)}ms | ${a.length} det`)}catch(a){const n=a;this.state.lastError=n.message,this.updateStatus(`❌ ${n.message}`)}const i=performance.now()-t,r=Math.max(100-i,0);this.liveTestRunning&&(this.liveTestAnimationId=window.setTimeout(()=>{requestAnimationFrame(()=>this.runLiveTestLoop())},r))}async copyDiagnosticsJSON(){const t={timestamp:new Date().toISOString(),...this.state,engine:{lastInferenceMs:this.engine.lastInferenceMs,lastInferenceTimestamp:this.engine.lastInferenceTimestamp,backendUsed:this.engine.backendUsed,modelSha256:this.engine.modelSha256,sessionInfo:this.engine.getSessionInfo()}};try{await navigator.clipboard.writeText(JSON.stringify(t,null,2)),this.updateStatus("📋 Copied to clipboard")}catch{const r=JSON.stringify(t,null,2),a=document.createElement("textarea");a.value=r,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),this.updateStatus("📋 Copied (fallback)")}}updateStatus(t){const i=this.statusDiv.querySelector(".diag-status-line");i&&(i.textContent=t)}renderStatus(){var r,a,n,s;const t=this.state,i=this.engine;this.statusDiv.innerHTML=`
            <div class="diag-status-line">${t.lastError?"⚠️ "+t.lastError:"Ready"}</div>
            <table class="diag-table">
                <tr><td>secureContext:</td><td>${t.isSecureContext?"✓":"✗"}</td></tr>
                <tr><td>iOS:</td><td>${t.isIOS?"✓":"✗"}</td></tr>
                <tr><td>modelUrl:</td><td class="diag-mono">${t.modelUrl||"-"}</td></tr>
                <tr><td>fetch status:</td><td>${(r=t.fetchResult)!=null&&r.ok?"✓ ok":((a=t.fetchResult)==null?void 0:a.error)||"-"}</td></tr>
                <tr><td>bytes:</td><td>${t.fetchResult?hy(t.fetchResult.actualBytes):"-"}</td></tr>
                <tr><td>SHA-256:</td><td class="diag-mono">${t.sha256?t.sha256.substring(0,12)+"...":"-"}</td></tr>
                <tr><td>hash match:</td><td>${t.sha256?t.hashMatch?"✓":"✗ expected "+ms.substring(0,8):"-"}</td></tr>
                <tr><td>backend:</td><td>${t.backend||"-"}</td></tr>
                ${t.backendFallbackReason?`<tr><td>fallback:</td><td class="diag-warn">${t.backendFallbackReason.substring(0,30)}...</td></tr>`:""}
                <tr><td>ORT threads:</td><td>${t.ortSettings.numThreads}</td></tr>
                <tr><td>inputs:</td><td>${((n=t.sessionInfo)==null?void 0:n.inputs.map(o=>o.name).join(", "))||"-"}</td></tr>
                <tr><td>outputs:</td><td>${((s=t.sessionInfo)==null?void 0:s.outputs.map(o=>o.name).join(", "))||"-"}</td></tr>
                <tr><td>last infer:</td><td>${i.lastInferenceMs?i.lastInferenceMs.toFixed(1)+"ms":"-"}</td></tr>
                <tr><td>last time:</td><td>${i.lastInferenceTimestamp?new Date(i.lastInferenceTimestamp).toLocaleTimeString():"-"}</td></tr>
            </table>
            ${t.isSecureContext?"":'<div class="diag-warning">⚠️ Not HTTPS - camera/model may fail on iOS</div>'}
        `}drawDetections(t){const i=this.testCanvas.width,r=this.testCanvas.height;this.testCtx.strokeStyle="#00ff00",this.testCtx.lineWidth=2,this.testCtx.font="12px monospace",this.testCtx.fillStyle="#00ff00";for(const a of t){const n=(a.x-a.w/2)*i,s=(a.y-a.h/2)*r,o=a.w*i,u=a.h*r;this.testCtx.strokeRect(n,s,o,u),this.testCtx.fillText(`${a.label} ${(a.confidence*100).toFixed(0)}%`,n,s-4)}}}const ys={initializing:"⏳",active:"●",degraded:"⚠",failed:"✖",unavailable:"○"},Wy={initializing:"#64b5f6",active:"#4caf50",degraded:"#ffc107",failed:"#f44336",unavailable:"#9e9e9e"};function Qt(e){return{state:"initializing",reason:e,lastUpdate:Date.now()}}const Ht={camera:Qt("Waiting for camera access"),sensors:Qt("Waiting for sensor permission"),inference:Qt("Loading model"),horizon:Qt("Waiting for video"),ekf:Qt("Waiting for IMU data"),heading:Qt("Waiting for location"),localization:Qt("Waiting for heading")};function bt(e,t,i,r,a){const n=Ht[e];if(Ht[e]={state:t,reason:i,lastUpdate:Date.now(),confidence:r,extra:a},n.state!==t||n.reason!==i){const s=ys[t];console.log(`[Pipeline] ${e}: ${s} ${t.toUpperCase()} - ${i}`)}Gy(e)}function _t(e,t,i){bt(e,"active",t,i)}function Qe(e,t,i){bt(e,"degraded",t,i)}function vi(e,t){bt(e,"failed",t)}const Mn=[];function Vy(e){return Mn.push(e),()=>{const t=Mn.indexOf(e);t>=0&&Mn.splice(t,1)}}function Gy(e){const t=Ht[e];for(const i of Mn)try{i(e,t)}catch(r){console.error("[Pipeline] Listener error:",r)}}function gc(){const e=Object.values(Ht),t=e.filter(r=>r.state==="failed").length,i=e.filter(r=>r.state==="degraded").length;return t>=2?"critical":t>=1||i>=3?"degraded":"healthy"}function qy(){const e=[],t=Object.keys(Ht);for(const i of t){const r=Ht[i],a=ys[r.state],n=r.confidence!==void 0?` (${(r.confidence*100).toFixed(0)}%)`:"";e.push(`${a} ${i}: ${r.reason}${n}`)}return e.join(`
`)}typeof window<"u"&&(window.pipelineStatus=Ht,window.getStatusSummary=qy);const jy={detailed:!0,autoCollapseDelay:10,position:"top-left"},Ky={camera:{label:"Camera",icon:"📷"},sensors:{label:"Sensors",icon:"📡"},inference:{label:"Inference",icon:"🧠"},horizon:{label:"Horizon",icon:"📐"},ekf:{label:"EKF",icon:"🧭"},heading:{label:"Heading",icon:"🔄"},localization:{label:"Localize",icon:"📍"}};class Zy{constructor(t="pipeline-status-panel",i={}){P(this,"container");P(this,"config");P(this,"isCollapsed",!1);P(this,"lastHealthyTime",0);P(this,"unsubscribe",null);this.config={...jy,...i};let r=document.getElementById(t);r||(r=document.createElement("div"),r.id=t,document.body.appendChild(r)),this.container=r,this.applyStyles(),this.render(),this.unsubscribe=Vy(()=>this.render()),setInterval(()=>this.checkAutoCollapse(),1e3)}applyStyles(){const t=this.config.position,i=t.includes("top"),r=t.includes("left");this.container.style.cssText=`
      position: fixed;
      ${i?"top: 60px":"bottom: 80px"};
      ${r?"left: 10px":"right: 10px"};
      z-index: 9999;
      background: rgba(0, 0, 0, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 8px 12px;
      font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
      font-size: 11px;
      color: #fff;
      min-width: 200px;
      max-width: 280px;
      user-select: none;
      -webkit-user-select: none;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: opacity 0.3s, transform 0.3s;
    `}render(){const t=gc();let r=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
        <span style="font-weight: bold; color: ${t==="healthy"?"#4caf50":t==="degraded"?"#ffc107":"#f44336"};">PIPELINE ${t.toUpperCase()}</span>
        <span style="cursor: pointer; opacity: 0.7;" onclick="this.parentElement.parentElement.style.display='none'">✕</span>
      </div>
    `;for(const[a,n]of Object.entries(Ky)){const s=Ht[a];r+=this.renderSubsystem(a,n,s)}window.__LEVIATHAN_SIM_MODE__&&(r+=`
        <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); color: #64b5f6;">
          🎮 SIMULATION MODE ACTIVE
        </div>
      `),this.container.innerHTML=r,t==="healthy"?this.lastHealthyTime===0&&(this.lastHealthyTime=Date.now()):(this.lastHealthyTime=0,this.isCollapsed=!1)}renderSubsystem(t,i,r){const a=ys[r.state],n=Wy[r.state],s=r.confidence!==void 0?` <span style="opacity: 0.7">${(r.confidence*100).toFixed(0)}%</span>`:"";return this.config.detailed?`
        <div style="display: flex; align-items: flex-start; margin: 4px 0; gap: 6px;">
          <span style="width: 18px; text-align: center;">${i.icon}</span>
          <span style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            <span style="color: ${n};">${a}</span>
            ${i.label}${s}
          </span>
        </div>
        <div style="margin-left: 24px; color: rgba(255,255,255,0.6); font-size: 10px; margin-bottom: 4px;">
          ${r.reason}
        </div>
      `:`
      <div style="display: flex; align-items: center; margin: 3px 0; gap: 6px;">
        <span style="width: 16px; text-align: center;">${i.icon}</span>
        <span style="color: ${n}; width: 12px;">${a}</span>
        <span style="flex: 1; opacity: 0.9;">${i.label}${s}</span>
      </div>
    `}checkAutoCollapse(){if(this.config.autoCollapseDelay<=0)return;gc()==="healthy"&&this.lastHealthyTime>0&&(Date.now()-this.lastHealthyTime)/1e3>this.config.autoCollapseDelay&&!this.isCollapsed&&this.collapse()}collapse(){this.isCollapsed=!0,this.container.style.opacity="0.3",this.container.style.transform="scale(0.9)",this.container.onmouseenter=()=>{this.container.style.opacity="1",this.container.style.transform="scale(1)"},this.container.onmouseleave=()=>{this.isCollapsed&&(this.container.style.opacity="0.3",this.container.style.transform="scale(0.9)")}}expand(){this.isCollapsed=!1,this.container.style.opacity="1",this.container.style.transform="scale(1)"}setPosition(t){this.config.position=t,this.applyStyles()}setDetailed(t){this.config.detailed=t,this.render()}dispose(){this.unsubscribe&&this.unsubscribe(),this.container.innerHTML=""}}let ca=null;function Yy(e){return ca||(ca=new Zy("pipeline-status-panel",e)),ca}function In(){return{fx:1500,fy:1500,cx:960,cy:540,width:1920,height:1080}}function ha(e,t,i,r=0,a=!1){const n=new Uint8ClampedArray(e*t*4),s=r*ye,o=e/2,u=t/2;for(let d=0;d<t;d++)for(let h=0;h<e;h++){const f=h-o,m=d-u,y=-f*Math.sin(s)+m*Math.cos(s)+u,_=(d*e+h)*4,b=a?Math.random()*20-10:0;if(y<i){const x=Math.max(0,Math.min(1,(i-y)/i));n[_]=Math.min(255,100+x*50+b),n[_+1]=Math.min(255,160+x*50+b),n[_+2]=Math.min(255,220+x*20+b),n[_+3]=255}else{const x=Math.max(0,Math.min(1,(y-i)/(t-i)));n[_]=Math.min(255,10+x*20+b),n[_+1]=Math.min(255,50+x*50+b),n[_+2]=Math.min(255,80+x*40+b),n[_+3]=255}}return new ImageData(n,e,t)}function hm(){console.log("%c═══════════════════════════════════════════════════════════","color: #00BCD4"),console.log("%c  🌊 Leviathan Pipeline Integration Tests","color: #00BCD4; font-weight: bold; font-size: 18px"),console.log("%c  Simulating iPhone at Sea","color: #00BCD4"),console.log("%c═══════════════════════════════════════════════════════════","color: #00BCD4");const e=[];let t=0,i=0;function r(a){e.push(a),a.passed?(console.log(`✅ ${a.name}: ${a.message}`),t++):(console.log(`❌ ${a.name}: ${a.message}`),a.details&&console.log("   Details:",a.details),i++)}console.log(`
%c📐 Test Group 1: Horizon Detection`,"color: #2196F3; font-weight: bold");try{const a=new gi,n=In(),s=ha(640,480,240,0,!0),o=a.detect(s,n,3);if(o.horizon){const u=o.horizon.roll*ce,d=o.horizon.pitch*ce;r({name:"Level Horizon Detection",passed:Math.abs(u)<5&&Math.abs(d)<15,message:`Roll: ${u.toFixed(1)}°, Pitch: ${d.toFixed(1)}°, Conf: ${o.horizon.confidence.toFixed(2)}`,details:{roll:u,pitch:d,confidence:o.horizon.confidence}})}else r({name:"Level Horizon Detection",passed:!1,message:`Failed: ${o.failureReason}`})}catch(a){r({name:"Level Horizon Detection",passed:!1,message:`Exception: ${a}`})}try{const a=new gi,n=In(),s=ha(640,480,240,15,!0),o=a.detect(s,n,3);if(o.horizon){const u=o.horizon.roll*ce,d=-15;r({name:"Tilted Horizon (15°)",passed:Math.abs(u-d)<8,message:`Detected: ${u.toFixed(1)}°, Expected: ~${d}°`,details:{detected:u,expected:d}})}else r({name:"Tilted Horizon (15°)",passed:!1,message:`Failed: ${o.failureReason}`})}catch(a){r({name:"Tilted Horizon (15°)",passed:!1,message:`Exception: ${a}`})}console.log(`
%c🧭 Test Group 2: EKF Sensor Fusion`,"color: #FF9800; font-weight: bold");try{const a=new Ut,n=10*ye,s=5*ye,o=ut,u={x:o*Math.sin(n),y:-o*Math.sin(s),z:o*Math.cos(n)*Math.cos(s)};a.initializeFromAccel(u,Date.now());const d=a.getState(),h=d.orientation.roll*ce,f=d.orientation.pitch*ce;r({name:"EKF Init from Gravity",passed:Math.abs(h-10)<5&&Math.abs(f-5)<5,message:`Roll: ${h.toFixed(1)}° (exp 10°), Pitch: ${f.toFixed(1)}° (exp 5°)`,details:{roll:h,pitch:f}})}catch(a){r({name:"EKF Init from Gravity",passed:!1,message:`Exception: ${a}`})}try{const a=new Ut,n=Date.now();a.initializeFromAccel({x:0,y:0,z:ut},n);const s=10*ye;for(let d=0;d<1e3;d+=10)a.predict({x:0,y:0,z:s},n+d);const u=a.getState().orientation.yaw*ce;r({name:"EKF Gyro Integration",passed:Math.abs(u-10)<3,message:`Yaw after 1s @ 10°/s: ${u.toFixed(1)}° (exp ~10°)`,details:{yaw:u,expected:10}})}catch(a){r({name:"EKF Gyro Integration",passed:!1,message:`Exception: ${a}`})}try{const a=new Ut,n=Date.now();a.initializeFromAccel({x:0,y:0,z:ut},n);const s=5*ye,o=2*ye;for(let f=0;f<50;f++)a.predict({x:0,y:0,z:0},n+f*100),a.updateWithHorizon(s,o);const u=a.getState(),d=u.orientation.roll*ce,h=u.orientation.pitch*ce;r({name:"EKF + Horizon Fusion",passed:Math.abs(d-5)<2&&Math.abs(h-2)<2,message:`Converged to Roll: ${d.toFixed(1)}° (exp 5°), Pitch: ${h.toFixed(1)}° (exp 2°)`,details:{roll:d,pitch:h,rollStd:u.rollStd*ce,pitchStd:u.pitchStd*ce}})}catch(a){r({name:"EKF + Horizon Fusion",passed:!1,message:`Exception: ${a}`})}console.log(`
%c🔗 Test Group 3: Full Pipeline Integration`,"color: #9C27B0; font-weight: bold");try{const a=new gi,n=new Ut,s=In(),o=Date.now();n.initializeFromAccel({x:0,y:0,z:ut},o);const u=8,d=ha(640,480,240,u,!0),h=a.detect(d,s,3);if(h.horizon){for(let _=0;_<20;_++)n.predict({x:0,y:0,z:0},o+_*100),n.updateWithHorizon(h.horizon.roll,h.horizon.pitch);const m=n.getState().orientation.roll*ce,y=-u;r({name:"Full Pipeline (Image → EKF)",passed:Math.abs(m-y)<5,message:`Image: ${u}° roll → Horizon: ${(h.horizon.roll*ce).toFixed(1)}° → EKF: ${m.toFixed(1)}°`,details:{imageRoll:u,horizonRoll:h.horizon.roll*ce,ekfRoll:m,expected:y}})}else r({name:"Full Pipeline (Image → EKF)",passed:!1,message:`Horizon detection failed: ${h.failureReason}`})}catch(a){r({name:"Full Pipeline (Image → EKF)",passed:!1,message:`Exception: ${a}`})}console.log(`
%c📍 Test Group 4: Localization`,"color: #4CAF50; font-weight: bold");try{const a=new Ji,n=In();a.setObserverPosition({latitude:37.8,longitude:-122.4});const s={x:.5,y:.5,w:.05,h:.1,confidence:.9,classId:0,label:"whale_blow"},o={heading:0,source:"magnetometer",confidence:.8,uncertainty:5},u={roll:0,pitch:0,yaw:0},d=a.localize(s,n,o,u,1);if(d){const h=d.position.latitude-37.8;r({name:"Blow Localization",passed:h>0&&d.bearing>=355||d.bearing<=5,message:`Distance: ${d.distance}m, Bearing: ${d.bearing}°, Lat diff: ${(h*111e3).toFixed(0)}m`,details:{distance:d.distance,bearing:d.bearing,position:d.position}})}else r({name:"Blow Localization",passed:!1,message:"Localization returned null"})}catch(a){r({name:"Blow Localization",passed:!1,message:`Exception: ${a}`})}console.log(`
%c📱 Test Group 5: Mock Sensors (Desktop Simulation)`,"color: #E91E63; font-weight: bold");try{const a=new gs;a.startMockMode();const n=Date.now();for(;Date.now()-n<100;);const s=a.getLatestIMU();if(a.stopMockMode(),s){const o=Math.sqrt(s.accelWithGravity.x**2+s.accelWithGravity.y**2+s.accelWithGravity.z**2);r({name:"Mock Sensor Generation",passed:Math.abs(o-ut)<.5,message:`Generated IMU data, |g| = ${o.toFixed(2)} m/s² (expected ~9.81)`,details:{gravity:o,sample:s}})}else r({name:"Mock Sensor Generation",passed:!1,message:"No IMU data generated"})}catch(a){r({name:"Mock Sensor Generation",passed:!1,message:`Exception: ${a}`})}console.log(`
%c⚡ Test Group 6: Stress Tests`,"color: #FF5722; font-weight: bold");try{const a=new Ut,n=Date.now();a.initializeFromAccel({x:0,y:0,z:ut},n);for(let u=0;u<1e4;u++){const d={x:(Math.random()-.5)*.2,y:(Math.random()-.5)*.2,z:(Math.random()-.5)*.2};a.predict(d,n+u*10),u%10===0&&a.updateWithHorizon((Math.random()-.5)*.3,(Math.random()-.5)*.2)}const s=a.getState(),o=isFinite(s.orientation.roll)&&isFinite(s.orientation.pitch)&&isFinite(s.orientation.yaw)&&s.rollStd>0&&isFinite(s.rollStd)&&s.pitchStd>0&&isFinite(s.pitchStd);r({name:"EKF 10K Iteration Stress",passed:o,message:o?"Stable after 10,000 iterations":"UNSTABLE - NaN or Inf detected",details:{roll:s.orientation.roll*ce,pitch:s.orientation.pitch*ce,rollStd:s.rollStd*ce,pitchStd:s.pitchStd*ce}})}catch(a){r({name:"EKF 10K Iteration Stress",passed:!1,message:`Exception (likely covariance issue): ${a}`})}return console.log(`
%c═══════════════════════════════════════════════════════════`,"color: #00BCD4"),i===0?console.log(`%c✅ ALL ${t} TESTS PASSED!`,"color: #4CAF50; font-weight: bold; font-size: 16px"):(console.log(`%c❌ ${i}/${t+i} TESTS FAILED`,"color: #f44336; font-weight: bold; font-size: 16px"),console.log("%cFailing tests indicate pipeline issues that need fixing.","color: #f44336")),console.log("%c═══════════════════════════════════════════════════════════","color: #00BCD4"),{passed:t,failed:i,results:e}}typeof window<"u"&&(window.runPipelineTests=hm,console.log("🧪 Pipeline tests loaded. Run `runPipelineTests()` in console."));function pa(){return{fx:1500,fy:1500,cx:960,cy:540,width:1920,height:1080}}function fa(e,t,i,r=0){const a=new Uint8ClampedArray(e*t*4),n=r*ye,s=e/2,o=t/2;for(let u=0;u<t;u++)for(let d=0;d<e;d++){const h=d-s,f=u-o,m=-h*Math.sin(n)+f*Math.cos(n)+o,y=(u*e+d)*4;m<i?(a[y]=135,a[y+1]=206,a[y+2]=235,a[y+3]=255):(a[y]=0,a[y+1]=51,a[y+2]=102,a[y+3]=255)}return new ImageData(a,e,t)}function pm(){var r;const e=[];let t=!0;function i(a,n){const s=a?"✅":"❌";e.push(`${s} ${n}`),a||(t=!1),console.log(`${s} ${n}`)}console.log("%c╔══════════════════════════════════════════════════════════════╗","color: #00BCD4"),console.log("%c║  🐋 LEVIATHAN END-TO-END SYSTEM TEST                         ║","color: #00BCD4; font-weight: bold"),console.log("%c║  Testing: Camera → Horizon → EKF → Model → Localization     ║","color: #00BCD4"),console.log("%c╚══════════════════════════════════════════════════════════════╝","color: #00BCD4"),console.log(`
%c═══ 1. HORIZON DETECTOR ═══`,"color: #2196F3; font-weight: bold");try{const a=new gi,n=pa(),s=fa(640,480,240,0),o=a.detect(s,n,3);if(o.horizon){const h=o.horizon.roll*ce;i(Math.abs(h)<5,`Horizon Level: detected roll = ${h.toFixed(1)}° (should be ~0°)`)}else i(!1,`Horizon Level: FAILED - ${o.failureReason}`);const u=fa(640,480,240,20),d=a.detect(u,n,3);if(d.horizon){const h=d.horizon.roll*ce;i(Math.abs(h- -20)<10,`Horizon 20° Tilt: detected roll = ${h.toFixed(1)}° (should be ~-20°)`)}else i(!1,`Horizon 20° Tilt: FAILED - ${d.failureReason}`)}catch(a){i(!1,`Horizon Detector: EXCEPTION - ${a}`)}console.log(`
%c═══ 2. EKF SENSOR FUSION ═══`,"color: #FF9800; font-weight: bold");try{const a=new Ut,n=Date.now();a.initializeFromAccel({x:0,y:0,z:ut},n);let s=a.getState();i(!0,`EKF Initialized: roll=${(s.orientation.roll*ce).toFixed(1)}°, pitch=${(s.orientation.pitch*ce).toFixed(1)}°`);for(let o=0;o<100;o++)a.predict({x:.05,y:.03,z:.01},n+o*10);s=a.getState(),i(isFinite(s.orientation.roll),"EKF Gyro Integration: stable after 100 iterations"),a.updateWithHorizon(5*ye,2*ye),s=a.getState(),i(!0,`EKF Horizon Update: roll=${(s.orientation.roll*ce).toFixed(1)}°, pitch=${(s.orientation.pitch*ce).toFixed(1)}°`);for(let o=0;o<5e3;o++)a.predict({x:Math.random()*.1,y:Math.random()*.1,z:Math.random()*.1},n+1e3+o*10);s=a.getState(),i(isFinite(s.rollStd)&&s.rollStd>0,"EKF 5000 Iterations: numerically stable")}catch(a){i(!1,`EKF: EXCEPTION - ${a}`)}console.log(`
%c═══ 3. SOLAR EPHEMERIS ═══`,"color: #FFEB3B; font-weight: bold");try{const n=new cm().getSunPosition(37.8,-122.4);i(n.azimuth>=0&&n.azimuth<=360,`Sun Azimuth: ${n.azimuth.toFixed(1)}° (0-360)`),i(n.elevation>=-90&&n.elevation<=90,`Sun Elevation: ${n.elevation.toFixed(1)}° (-90 to 90)`),i(typeof n.visible=="boolean",`Sun Visible: ${n.visible}`)}catch(a){i(!1,`Solar Ephemeris: EXCEPTION - ${a}`)}console.log(`
%c═══ 4. VISUAL COMPASS ═══`,"color: #4CAF50; font-weight: bold");try{const a=new Pa;a.setLocation(37.8,-122.4);const n=a.getSunPosition();i(n!==null,`Compass Location Set: ${n?"Sun at "+n.azimuth.toFixed(1)+"°":"Failed"}`);const s=a.getHeading(180);s?i(!0,`Compass Heading: ${s.heading.toFixed(1)}°, source: ${s.source}`):i(!0,"Compass Heading: null (sun not visible or below horizon - expected at night)")}catch(a){i(!1,`Visual Compass: EXCEPTION - ${a}`)}console.log(`
%c═══ 5. MOCK SENSORS ═══`,"color: #E91E63; font-weight: bold");try{const a=new gs;a.startMockMode();let n=null;for(let s=0;s<10&&(n=a.getLatestIMU(),!n);s++);if(a.stopMockMode(),n){const s=Math.sqrt(n.accelWithGravity.x**2+n.accelWithGravity.y**2+n.accelWithGravity.z**2);i(Math.abs(s-ut)<1,`Mock IMU: |g| = ${s.toFixed(2)} m/s² (expected ~9.81)`)}else i(!1,"Mock IMU: No data generated")}catch(a){i(!1,`Mock Sensors: EXCEPTION - ${a}`)}console.log(`
%c═══ 6. BLOW LOCALIZATION ═══`,"color: #9C27B0; font-weight: bold");try{const a=new Ji;a.setObserverPosition({latitude:37.8,longitude:-122.4});const n={x:.5,y:.4,w:.05,h:.15,confidence:.92,classId:0,label:"whale_blow"},s={heading:270,source:"magnetometer",confidence:.7,uncertainty:10},o={roll:0,pitch:.05,yaw:0},u=pa(),d=a.localize(n,u,s,o,2);d?(i(d.distance>0&&d.distance<5e4,`Localization Distance: ${d.distance}m`),i(d.bearing>=0&&d.bearing<=360,`Localization Bearing: ${d.bearing}°`),i(d.position.latitude!==0,`Blow Position: ${d.position.latitude.toFixed(5)}°, ${d.position.longitude.toFixed(5)}°`)):i(!1,"Localization: returned null")}catch(a){i(!1,`Blow Localization: EXCEPTION - ${a}`)}console.log(`
%c═══ 7. EVENT RECORDER ═══`,"color: #795548; font-weight: bold");try{const a=new dm;a.setObserverPosition(37.8,-122.4);const n=document.createElement("canvas");n.width=640,n.height=480;const s=n.getContext("2d");s&&(s.fillStyle="#0066aa",s.fillRect(0,0,640,480));const o={x:.5,y:.4,w:.05,h:.1,confidence:.88,classId:0,label:"whale_blow"},u=a.capture(o,{min:500,max:2e3,desc:"~0.5-2.0 km"},n);i(u.event_id.length>0,`Event Recorded: ${u.event_id}`),i(u.confidence===.88,`Event Confidence: ${u.confidence}`),i(!!((r=u.thumbnail)!=null&&r.startsWith("data:image")),`Thumbnail Generated: ${u.thumbnail?"Yes":"No"}`);const d=a.exportJSON();i(d.length>100,`Export JSON: ${d.length} bytes`)}catch(a){i(!1,`Event Recorder: EXCEPTION - ${a}`)}console.log(`
%c═══ 8. VIDEO CLIP RECORDER ═══`,"color: #607D8B; font-weight: bold");try{const a=typeof MediaRecorder<"u";if(i(a,`MediaRecorder API: ${a?"Available":"Not Available"}`),a){const n=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm","video/mp4"].filter(s=>MediaRecorder.isTypeSupported(s));i(n.length>0,`Supported Codecs: ${n.join(", ")||"None"}`)}}catch(a){i(!1,`Clip Recorder: EXCEPTION - ${a}`)}console.log(`
%c═══ 9. FULL PIPELINE INTEGRATION ═══`,"color: #FF5722; font-weight: bold");try{const a=new gi,n=new Ut,s=new Pa,o=new Ji,u=pa(),d=Date.now();s.setLocation(37.8,-122.4),o.setObserverPosition({latitude:37.8,longitude:-122.4}),n.initializeFromAccel({x:0,y:0,z:ut},d);const h=fa(640,480,250,8),f=a.detect(h,u,3);if(f.horizon)for(let $=0;$<20;$++)n.predict({x:0,y:0,z:0},d+$*100),n.updateWithHorizon(f.horizon.roll,f.horizon.pitch);const m=n.getState(),y=m.orientation.roll*ce,_=s.getHeading(270)||{heading:270,source:"magnetometer",confidence:.5,uncertainty:15},b={x:.6,y:.35,w:.04,h:.12,confidence:.91,classId:0,label:"whale_blow"},x=o.localize(b,u,_,m.orientation,1);i(f.horizon!==null,`Pipeline Step 1 - Horizon: ${f.horizon?"Detected":"Failed"}`),i(Math.abs(y)<30,`Pipeline Step 2 - EKF: roll=${y.toFixed(1)}°`),i(_!==null,`Pipeline Step 3 - Heading: ${_.heading.toFixed(0)}° (${_.source})`),i(x!==null,`Pipeline Step 4 - Localization: ${x?x.distance+"m @ "+x.bearing+"°":"Failed"}`),i(!0,"🎯 Full pipeline executed successfully!")}catch(a){i(!1,`Full Pipeline: EXCEPTION - ${a}`)}return console.log(`
%c╔══════════════════════════════════════════════════════════════╗`,"color: #00BCD4"),t?console.log("%c║  ✅ ALL SYSTEMS OPERATIONAL                                  ║","color: #4CAF50; font-weight: bold"):console.log("%c║  ⚠️  SOME SYSTEMS NEED ATTENTION                            ║","color: #FF9800; font-weight: bold"),console.log("%c╚══════════════════════════════════════════════════════════════╝","color: #00BCD4"),{allPassed:t,results:e}}typeof window<"u"&&(window.runE2ETest=pm,console.log("🐋 E2E test loaded. Run `runE2ETest()` in console."));typeof window<"u"&&(window.runPipelineTests=hm,window.runE2ETest=pm);const Me={fatalError:null,secureContext:typeof window<"u"&&window.isSecureContext,camera:"uninitialized",sensors:"unknown",model:"loading",lastHeartbeat:Date.now()};window.addEventListener("error",e=>{const t=`${e.message} at ${e.filename}:${e.lineno}`;Me.fatalError=t.substring(0,200),console.error("[Health] Uncaught error:",t),Et()});window.addEventListener("unhandledrejection",e=>{const t=`Promise rejected: ${e.reason}`;Me.fatalError=t.substring(0,200),console.error("[Health] Unhandled rejection:",e.reason),Et()});function Et(){const e=document.getElementById("health-overlay");if(!e)return;const i=Date.now()-Me.lastHeartbeat;e.innerHTML=`
    <div style="font-size:10px;line-height:1.4;">
      ${Me.fatalError?`<div style="color:#ff5252;">⚠️ ${Me.fatalError}</div>`:""}
      <div>secure: ${Me.secureContext?"✓":"✗"}</div>
      <div>camera: ${Me.camera}</div>
      <div>sensors: ${Me.sensors}</div>
      <div>model: ${Me.model}</div>
      <div>heartbeat: ${i>1e3?"⚠️ "+i+"ms":"✓"}</div>
    </div>
  `}function Xy(){return typeof DeviceOrientationEvent.requestPermission=="function"||typeof DeviceMotionEvent.requestPermission=="function"}const We={model:document.getElementById("status-model"),fps:document.getElementById("status-fps"),heading:document.getElementById("status-heading"),zoom:document.getElementById("status-zoom")},ji={btnZoom1:document.getElementById("btn-zoom-1"),btnZoom4:document.getElementById("btn-zoom-4"),btnRecord:document.getElementById("btn-record")},Jy=document.getElementById("debug-stats"),Wi=document.getElementById("debug-overlay"),_s=document.getElementById("detection-canvas"),Qy=document.getElementById("camera-container"),ma=document.getElementById("ios-sensor-btn"),Ze=new Ug,yi=new fy,fm=new gy(_s),e_=new $y,t_=new xy,Ki=new dm,et=new gs,Un=new ky,mm=document.getElementById("hud-canvas");mm||console.warn("[Main] HUD canvas not found, will use detection canvas");let La=null,Pe=null,It=null,yt=null,_i=null,kt=null;try{La=new gi,bt("horizon","initializing","Waiting for video ready"),console.log("[Leviathan] HorizonDetector initialized")}catch(e){vi("horizon",`Init failed: ${e}`),console.error("[Leviathan] HorizonDetector init failed:",e)}try{Pe=new Ut,bt("ekf","initializing","Waiting for IMU data"),console.log("[Leviathan] AttitudeEKF initialized")}catch(e){vi("ekf",`Init failed: ${e}`),console.error("[Leviathan] AttitudeEKF init failed:",e)}try{It=new By(3),console.log("[Leviathan] HeaveCompensator initialized")}catch(e){console.error("[Leviathan] HeaveCompensator init failed:",e)}try{yt=new Pa,bt("heading","initializing","Waiting for GPS location"),console.log("[Leviathan] VisualCompass initialized")}catch(e){vi("heading",`Init failed: ${e}`),console.error("[Leviathan] VisualCompass init failed:",e)}try{_i=new Fy(mm||_s),console.log("[Leviathan] HUDRenderer initialized")}catch(e){console.error("[Leviathan] HUDRenderer init failed:",e)}try{kt=new Ji,bt("localization","initializing","Waiting for heading data"),console.log("[Leviathan] BlowLocalizer initialized")}catch(e){vi("localization",`Init failed: ${e}`),console.error("[Leviathan] BlowLocalizer init failed:",e)}Et();const gm=new Hy(yi);gm.mount();let Vi=!1,i_=.15,ga=0,yc=Date.now(),_c=0,bc=0,ya=0,Pi=null,ei=null,Ie=null,_a=null,Be=null;const n_=100,r_=10;async function a_(){mt.state=gt.LOADING,Et(),Yy({detailed:!0,position:"top-left"}),Me.secureContext||console.warn("[Leviathan] Not a secure context - some features may be blocked"),Me.camera="requesting",bt("camera","initializing","Requesting access"),Et();try{Ze.mount(Qy),await Ze.start(),Me.camera="granted",_t("camera","Camera active");const t=Ze.videoElement;t.videoWidth>0?Un.updateForResolution(t.videoWidth,t.videoHeight):await new Promise(r=>{t.addEventListener("loadedmetadata",()=>{Un.updateForResolution(t.videoWidth,t.videoHeight),r()},{once:!0}),setTimeout(r,2e3)}),gm.setVideoElement(t);const i=t.srcObject;i&&zn.init(i)}catch(t){console.error("Camera init failed:",t),Me.camera="error",vi("camera",`Access denied or error: ${t}`),We.model.textContent="● CAM ERROR",We.model.style.color="#ff5252",Et();return}if(bt("inference","initializing","Loading model..."),await yi.init("best.onnx"),yi.useMock?(Me.model="mock",Qe("inference","Using mock mode (no real model)"),We.model.textContent="● MOCK",We.model.style.color="#ffc107"):(Me.model="loaded",_t("inference","Model loaded"),We.model.textContent="● LOADED",We.model.style.color="#4caf50"),Et(),Xy())Me.sensors="ios-needs-tap",bt("sensors","initializing","iOS requires tap - tap button to enable"),ma.style.display="block",ma.addEventListener("click",async()=>{const t=await et.requestPermission();if(Me.sensors=t?"granted":"denied",t){_t("sensors","Sensors granted"),ma.style.display="none";const i=et.getLatestIMU();i&&Pe&&(Pe.initializeFromAccel(i.accelWithGravity,Date.now()),_t("ekf","Initialized from accelerometer"))}else vi("sensors","User denied sensor permission");Et()});else{const t=await et.requestPermission();Me.sensors=t?"granted":"denied",t?_t("sensors","Real sensors active"):(console.log("[Leviathan] Real sensors not available - starting mock mode for desktop testing"),et.startMockMode(),Me.sensors="granted",Qe("sensors","Using mock sensors (desktop mode)"),window.__LEVIATHAN_SIM_MODE__=!0,setTimeout(()=>{const i=et.getLatestIMU();i&&Pe&&(Pe.initializeFromAccel(i.accelWithGravity,Date.now()),Qe("ekf","Initialized from mock sensors"),console.log("[Leviathan] EKF initialized from mock sensors"))},100))}Et();const e=et.getLatestIMU();e&&Pe&&Pe.initializeFromAccel(e.accelWithGravity,Date.now()),"geolocation"in navigator&&(navigator.geolocation.getCurrentPosition(t=>{var a;const i=t.coords.latitude,r=t.coords.longitude;yt==null||yt.setLocation(i,r),kt==null||kt.setObserverPosition({latitude:i,longitude:r,accuracy:t.coords.accuracy}),Ki.setObserverPosition(i,r),console.log(`[Leviathan] GPS: ${i.toFixed(5)}, ${r.toFixed(5)} ± ${(a=t.coords.accuracy)==null?void 0:a.toFixed(0)}m`)},t=>console.warn("Geolocation unavailable:",t),{enableHighAccuracy:!0}),navigator.geolocation.watchPosition(t=>{const i=t.coords.latitude,r=t.coords.longitude;yt==null||yt.setLocation(i,r),kt==null||kt.setObserverPosition({latitude:i,longitude:r,accuracy:t.coords.accuracy}),Ki.setObserverPosition(i,r)},t=>console.warn("GPS update failed:",t),{enableHighAccuracy:!0,maximumAge:1e3,timeout:5e3})),mt.state=gt.READY,wc(),window.addEventListener("resize",wc),requestAnimationFrame(ym)}function wc(){fm.resize(window.innerWidth,window.innerHeight),_i==null||_i.resize(window.innerWidth,window.innerHeight)}async function ym(){var n,s;if(mt.state===gt.ERROR)return;const e=Date.now();ga++,Me.lastHeartbeat=e,e-yc>=1e3&&(We.fps.textContent=`${ga} FPS`,ga=0,yc=e),Un.updateForZoom(Ze.currentZoom);const t=Un.getIntrinsics();if(e-ya>=r_){const o=et.getIMUSamplesSince(ya);Pe&&Pe.processSamples(o);const u=et.getLatestIMU();u&&It&&It.update(u.accel,e),ya=e}if(La&&e-bc>=n_){const o=La.detect(Ze.videoElement,t,(It==null?void 0:It.getStableHeight())??3);if(o.horizon){if(Pi=o.horizon,_t("horizon",`Detected (conf: ${(o.horizon.confidence*100).toFixed(0)}%)`,o.horizon.confidence),Pe){Pe.updateWithHorizon(o.horizon.roll,o.horizon.pitch);const u=Pe.getDiagnostics();if(u.initialized){const d=(u.rejectionRate*100).toFixed(0);_t("ekf",`Fusing (${d}% rejected)`)}}}else{const u=o.failureReason||"unknown";console.warn("[Horizon] Detection failed:",u),u.includes("confidence")?Qe("horizon",`Low confidence: ${u}`):u.includes("image data")?Qe("horizon","Video not ready"):Qe("horizon",u)}bc=e}if(Pe&&(_a=Pe.getState(),ei=_a.orientation),yt){yt.updateFromCamera(Ze.videoElement,t);const o=et.getMagneticHeading();Ie=yt.getHeading(o),Ie&&(Ie.source==="visual_compass"?_t("heading",`Sun tracking: ${Ie.heading.toFixed(0)}°`,Ie.confidence):Ie.source==="fused"?_t("heading",`Fused: ${Ie.heading.toFixed(0)}°`,Ie.confidence):Qe("heading",`Mag only: ${Ie.heading.toFixed(0)}°`,Ie.confidence))}else{const o=et.getMagneticHeading();o!==null?(Ie={heading:o,source:"magnetometer",confidence:.5,uncertainty:15},Qe("heading",`Mag fallback: ${o.toFixed(0)}°`,.5)):Qe("heading","No heading source available")}We.heading.textContent=Ie?`${Ie.heading.toFixed(0)}°`:et.getHeadingString(),We.zoom.textContent=`${Ze.currentZoom}x`;const i=await yi.run(Ze.videoElement,.1),r=e_.update(i),a=r.filter(o=>o.confidence>=i_);if(i.length>0&&(console.log(`[Detection] Raw: ${i.length}, Tracked: ${r.length}, Visible: ${a.length}`),a.length>0)){const o=a[0];console.log(`[Detection] Best: ${(o.confidence*100).toFixed(1)}% at (${o.x.toFixed(2)}, ${o.y.toFixed(2)})`)}if(a.length>0){mt.state!==gt.EVENT&&mt.state!==gt.DETECTING&&(mt.state=gt.DETECTING),We.model.textContent=`● ${a.length} BLOW${a.length>1?"S":""}`,We.model.style.color="#4caf50";const o=a.sort((u,d)=>d.confidence-u.confidence)[0];if(kt)if(Be=kt.localize(o,t,Ie,ei,Ze.currentZoom),Be){const u=Be.uncertainty.positionMeters;u<200?_t("localization",`${Be.distance}m @ ${Be.bearing}° (±${u}m)`):Qe("localization",`~${Be.distance}m @ ${Be.bearing}° (±${u}m)`)}else Ie?Qe("localization","Detection but localize failed"):Qe("localization","Blocked: no heading data");if(mt.state===gt.DETECTING&&!((s=(n=zn.getLatestClip())==null?void 0:n.id)!=null&&s.includes(String(e).slice(0,-4)))){const u=(Be==null?void 0:Be.eventId)||`BLOW-${Date.now().toString(16).toUpperCase()}`;zn.startClip(u,o.confidence)}if(Vi&&e-_c>2e3){const u=t_.estimate(o);Ki.captureWithLocation(o,u,Be,_s,Ze.currentZoom),_c=e,Be&&console.log(`[Leviathan] BLOW DETECTED @ ${Be.position.latitude.toFixed(5)}, ${Be.position.longitude.toFixed(5)} - ${Be.distance}m @ ${Be.bearing}°`),We.model.textContent="● REC",We.model.style.color="#ff5252",setTimeout(()=>{We.model.textContent=yi.useMock?"● MOCK":"● LOADED",We.model.style.color=yi.useMock?"#ffc107":"#4caf50"},500)}}else mt.state===gt.DETECTING&&(mt.state=gt.READY,zn.stopClip()),Be=null;if(_i&&_i.render(ei,Ie,Pi,_a??void 0),fm.draw(a),Wi.classList.contains("visible")){const o=Ki.getRecentEvents(),u=Pe==null?void 0:Pe.getDiagnostics(),d={state:mt.state,heading:Ie==null?void 0:Ie.heading.toFixed(1),headingSrc:Ie==null?void 0:Ie.source,pitch:ei?(ei.pitch*180/Math.PI).toFixed(1):null,roll:ei?(ei.roll*180/Math.PI).toFixed(1):null,horizonConf:Pi==null?void 0:Pi.confidence.toFixed(2),heave:(It==null?void 0:It.getInstantaneousHeight().toFixed(2))??"N/A",ekfReject:u?(u.rejectionRate*100).toFixed(1)+"%":"N/A",imuRate:et.getSampleRate().toFixed(0)+"Hz",zoom:Ze.currentZoom,events:Ki.events.length,last:o[0]?o[0].event_id.substring(0,4):"None"};Jy.textContent=JSON.stringify(d,null,2)}requestAnimationFrame(ym)}ji.btnZoom1.addEventListener("click",()=>Ze.setZoom(1));ji.btnZoom4.addEventListener("click",()=>Ze.setZoom(4));ji.btnRecord.addEventListener("click",()=>{Vi=!Vi,ji.btnRecord.classList.toggle("active",Vi),ji.btnRecord.textContent=Vi?"ARMED":"REC"});let Ua=0;document.addEventListener("touchstart",e=>Ua=e.touches[0].clientY);document.addEventListener("touchend",e=>{const t=e.changedTouches[0].clientY;t-Ua>100?Wi.classList.contains("visible")||Wi.classList.add("visible"):Ua-t>100&&Wi.classList.contains("visible")&&Wi.classList.remove("visible")});a_();
