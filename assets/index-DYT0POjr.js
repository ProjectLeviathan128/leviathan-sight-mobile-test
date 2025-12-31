(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();class Qm{videoElement;stream=null;isReady=!1;constructor(){this.videoElement=document.createElement("video"),this.videoElement.setAttribute("playsinline","true"),this.videoElement.setAttribute("muted","true"),this.videoElement.autoplay=!0,this.videoElement.id="camera-feed",this.videoElement.style.position="absolute",this.videoElement.style.top="0",this.videoElement.style.left="0",this.videoElement.style.width="100%",this.videoElement.style.height="100%",this.videoElement.style.objectFit="cover",this.videoElement.style.zIndex="0"}async start(){if(!this.stream)try{const t={video:{facingMode:{ideal:"environment"},width:{ideal:3840},height:{ideal:2160}},audio:!1};this.stream=await navigator.mediaDevices.getUserMedia(t),this.videoElement.srcObject=this.stream;const i=this.stream.getVideoTracks()[0].getCapabilities();return i&&i.zoom&&(this.zoomMin=i.zoom.min,this.zoomMax=i.zoom.max,this.isZoomSupported=!0,console.log(`Zoom supported: ${this.zoomMin} - ${this.zoomMax}`)),new Promise(a=>{this.videoElement.onloadedmetadata=()=>{this.videoElement.play().then(()=>{this.isReady=!0,a()})}})}catch(t){throw console.error("Camera access denied or failed:",t),t}}isZoomSupported=!1;zoomMin=1;zoomMax=1;currentZoom=1;async setZoom(t){if(!this.stream||!this.isZoomSupported)return;const r=this.stream.getVideoTracks()[0],i=Math.max(this.zoomMin,Math.min(this.zoomMax,t));try{await r.applyConstraints({advanced:[{zoom:i}]}),this.currentZoom=i}catch(a){console.warn("Zoom failed:",a)}}Stop(){this.stream&&(this.stream.getTracks().forEach(t=>t.stop()),this.stream=null,this.isReady=!1)}mount(t){t.appendChild(this.videoElement)}}var dn=Object.defineProperty,Jm=Object.getOwnPropertyDescriptor,eg=Object.getOwnPropertyNames,tg=Object.prototype.hasOwnProperty,ig=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),L=(e,t)=>()=>(e&&(t=e(e=0)),t),Yt=(e,t)=>{for(var r in t)dn(e,r,{get:t[r],enumerable:!0})},rg=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of eg(t))!tg.call(e,a)&&a!==r&&dn(e,a,{get:()=>t[a],enumerable:!(i=Jm(t,a))||i.enumerable});return e},Si=e=>rg(dn({},"__esModule",{value:!0}),e),ai,bt,Gt,Xs,Ld,Wd=L(()=>{ai=new Map,bt=[],Gt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=ai.get(e);if(i===void 0)ai.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=bt.indexOf(e);a!==-1&&bt.splice(a,1);for(let s=0;s<bt.length;s++)if(ai.get(bt[s]).priority<=r){bt.splice(s,0,e);return}bt.push(e)}return}throw new TypeError("not a valid backend")},Xs=async e=>{let t=ai.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Ld=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?bt:r,a,s=[],n=new Set;for(let l of i){let c=await Xs(l);typeof c=="string"?s.push({name:l,err:c}):(a||(a=c),a===c&&n.add(l))}if(!a)throw new Error(`no available backend found. ERR: ${s.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:c}of s)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${c}`);let u=t.filter(l=>n.has(typeof l=="string"?l:l.name));return[a,new Proxy(e,{get:(l,c)=>c==="executionProviders"?u:Reflect.get(l,c)})]}}),ag=L(()=>{Wd()}),Hd,ng=L(()=>{Hd="1.23.2"}),Nr,ze,Fd=L(()=>{ng(),Nr="warning",ze={wasm:{},webgl:{},webgpu:{},versions:{common:Hd},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Nr=e}},get logLevel(){return Nr}},Object.defineProperty(ze,"logLevel",{enumerable:!0})}),_e,sg=L(()=>{Fd(),_e=ze}),qd,Vd,og=L(()=>{qd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[3]):(a=e.dims[3],s=e.dims[2]);let n=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,c;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let h=s*a,f=0,g=h,y=h*2,_=-1;n==="RGBA"?(f=0,g=h,y=h*2,_=h*3):n==="RGB"?(f=0,g=h,y=h*2):n==="RBG"&&(f=0,y=h,g=h*2);for(let w=0;w<s;w++)for(let x=0;x<a;x++){let $=(e.data[f++]-c[0])*l[0],v=(e.data[g++]-c[1])*l[1],S=(e.data[y++]-c[2])*l[2],C=_===-1?255:(e.data[_++]-c[3])*l[3];i.fillStyle="rgba("+$+","+v+","+S+","+C+")",i.fillRect(x,w,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Vd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,s,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[1],n=e.dims[3]):(a=e.dims[3],s=e.dims[2],n=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,c,h;l===void 0||l.mean===void 0?c=[255,255,255,255]:typeof l.mean=="number"?c=[l.mean,l.mean,l.mean,l.mean]:(c=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(c[3]=l.mean[3])),l===void 0||l.bias===void 0?h=[0,0,0,0]:typeof l.bias=="number"?h=[l.bias,l.bias,l.bias,l.bias]:(h=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(h[3]=l.bias[3]));let f=s*a;if(t!==void 0&&(t.format!==void 0&&n===4&&t.format!=="RGBA"||n===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,y=0,_=1,w=2,x=3,$=0,v=f,S=f*2,C=-1;u==="RGBA"?($=0,v=f,S=f*2,C=f*3):u==="RGB"?($=0,v=f,S=f*2):u==="RBG"&&($=0,S=f,v=f*2),i=r.createImageData(a,s);for(let I=0;I<s*a;y+=g,_+=g,w+=g,x+=g,I++)i.data[y]=(e.data[$++]-h[0])*c[0],i.data[_]=(e.data[v++]-h[1])*c[1],i.data[w]=(e.data[S++]-h[2])*c[2],i.data[x]=C===-1?255:(e.data[C++]-h[3])*c[3]}else throw new Error("Can not access image data");return i}}),Ui,Gd,jd,Kd,Zd,Yd,ug=L(()=>{cn(),Ui=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},s,n;typeof a.mean=="number"?s=[a.mean,a.mean,a.mean,a.mean]:s=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?n=[a.bias,a.bias,a.bias,a.bias]:n=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",c=r*i,h=l==="RGBA"?new Float32Array(c*4):new Float32Array(c*3),f=4,g=0,y=1,_=2,w=3,x=0,$=c,v=c*2,S=-1;u==="RGB"&&(f=3,g=0,y=1,_=2,w=-1),l==="RGBA"?S=c*3:l==="RBG"?(x=0,v=c,$=c*2):l==="BGR"&&(v=0,$=c,x=c*2);for(let C=0;C<c;C++,g+=f,_+=f,y+=f,w+=f)h[x++]=(e[g]+n[0])/s[0],h[$++]=(e[y]+n[1])/s[1],h[v++]=(e[_]+n[2])/s[2],S!==-1&&w!==-1&&(h[S++]=(e[w]+n[3])/s[3]);return l==="RGBA"?new Le("float32",h,[1,4,r,i]):new Le("float32",h,[1,3,r,i])},Gd=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",n,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},c=h=>typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||h instanceof OffscreenCanvas?h.getContext("2d"):null;if(r){let h=l();h.width=e.width,h.height=e.height;let f=c(h);if(f!=null){let g=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=y}else u.tensorFormat="RGBA",u.height=g,u.width=y;f.drawImage(e,0,0),n=f.getImageData(0,0,y,g).data}else throw new Error("Can not access image data")}else if(i){let h,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(h=t.resizedHeight,f=t.resizedWidth):(h=e.height,f=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=h,u.width=f,t!==void 0){let g=l();g.width=f,g.height=h;let y=c(g);if(y!=null)y.putImageData(e,0,0),n=y.getImageData(0,0,f,h).data;else throw new Error("Can not access image data")}else n=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let h=l();h.width=e.width,h.height=e.height;let f=c(h);if(f!=null){let g=e.height,y=e.width;return f.drawImage(e,0,0,y,g),n=f.getImageData(0,0,y,g).data,u.height=g,u.width=y,Ui(n,u)}else throw new Error("Can not access image data")}else{if(s)return new Promise((h,f)=>{let g=l(),y=c(g);if(!e||!y)return f();let _=new Image;_.crossOrigin="Anonymous",_.src=e,_.onload=()=>{g.width=_.width,g.height=_.height,y.drawImage(_,0,0,g.width,g.height);let w=y.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,h(Ui(w.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(n!==void 0)return Ui(n,u);throw new Error("Input data provided is not supported - aborted tensor creation")},jd=(e,t)=>{let{width:r,height:i,download:a,dispose:s}=t,n=[1,i,r,4];return new Le({location:"texture",type:"float32",texture:e,dims:n,download:a,dispose:s})},Kd=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:s}=t;return new Le({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:s})},Zd=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:s}=t;return new Le({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:s})},Yd=(e,t,r)=>new Le({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Rt,mi,Pr,Xd,lg=L(()=>{Rt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),mi=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Pr=!1,Xd=()=>{if(!Pr){Pr=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Rt.set("int64",BigInt64Array),mi.set(BigInt64Array,"int64")),t&&(Rt.set("uint64",BigUint64Array),mi.set(BigUint64Array,"uint64")),i?(Rt.set("float16",r),mi.set(r,"float16")):Rt.set("float16",Uint16Array)}}}),Qd,Jd,dg=L(()=>{cn(),Qd=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},Jd=(e,t)=>{switch(e.location){case"cpu":return new Le(e.type,e.data,t);case"cpu-pinned":return new Le({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Le({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Le({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Le({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Le,cn=L(()=>{og(),ug(),lg(),dg(),Le=class{constructor(e,t,r){Xd();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let n=Rt.get(i);if(!n)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof n))throw new TypeError(`buffer should be of type ${n.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let n,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");n=t}else{let l=Rt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?n=l.from(t,BigInt):n=l.from(t)}else if(t instanceof l)n=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")n=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)n=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",n=e;else if(l==="boolean")i="bool",n=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",n=Uint8Array.from(e);else{let l=mi.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,n=e}if(u===void 0)u=[n.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");a=u,this.cpuData=n,this.dataLocation="cpu"}let s=Qd(a);if(this.cpuData&&s!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=s}static async fromImage(e,t){return Gd(e,t)}static fromTexture(e,t){return jd(e,t)}static fromGpuBuffer(e,t){return Kd(e,t)}static fromMLTensor(e,t){return Zd(e,t)}static fromPinnedBuffer(e,t,r){return Yd(e,t,r)}toDataURL(e){return qd(this,e)}toImageData(e){return Vd(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Jd(this,e)}}}),it,ec=L(()=>{cn(),it=Le}),rr,Ur,rt,Xe,Nt,Pt,tc=L(()=>{Fd(),rr=(e,t)=>{(typeof ze.trace>"u"?!ze.wasm.trace:!ze.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ur=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(s+=`::${t}`),rr("CPU",s);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},rt=e=>{(typeof ze.trace>"u"?!ze.wasm.trace:!ze.trace)||Ur("BEGIN",e)},Xe=e=>{(typeof ze.trace>"u"?!ze.wasm.trace:!ze.trace)||Ur("END",e)},Nt=e=>{(typeof ze.trace>"u"?!ze.wasm.trace:!ze.trace)||console.time(`ORT::${e}`)},Pt=e=>{(typeof ze.trace>"u"?!ze.wasm.trace:!ze.trace)||console.timeEnd(`ORT::${e}`)}}),ic,cg=L(()=>{Wd(),ec(),tc(),ic=class rc{constructor(t){this.handler=t}async run(t,r,i){rt(),Nt("InferenceSession.run");let a={},s={};if(typeof t!="object"||t===null||t instanceof it||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let n=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof it)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");n=!1;for(let c of r){if(typeof c!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(c)===-1)throw new RangeError(`'fetches' contains invalid output name: ${c}.`);a[c]=null}if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let c=!1,h=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(h.indexOf(f)!==-1){let g=r[f];(g===null||g instanceof it)&&(c=!0,n=!1,a[f]=g)}if(c){if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let c of this.inputNames)if(typeof t[c]>"u")throw new Error(`input '${c}' is missing in 'feeds'.`);if(n)for(let c of this.outputNames)a[c]=null;let u=await this.handler.run(t,a,s),l={};for(let c in u)if(Object.hasOwnProperty.call(u,c)){let h=u[c];h instanceof it?l[c]=h:l[c]=new it(h.type,h.data,h.dims)}return Pt("InferenceSession.run"),Xe(),l}async release(){return this.handler.dispose()}static async create(t,r,i,a){rt(),Nt("InferenceSession.create");let s,n={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let h=t,f=0,g=t.byteLength;if(typeof r=="object"&&r!==null)n=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=h.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${h.byteLength}).`);if(g=t.byteLength-f,typeof i=="number"){if(g=i,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||f+g>h.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${h.byteLength-f}].`);if(typeof a=="object"&&a!==null)n=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(h,f,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await Ld(n),c=await u.createInferenceSessionHandler(s,l);return Pt("InferenceSession.create"),Xe(),new rc(c)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),pn,pg=L(()=>{cg(),pn=ic}),hg=L(()=>{}),fg=L(()=>{}),mg=L(()=>{}),gg=L(()=>{}),yg={};Yt(yg,{InferenceSession:()=>pn,TRACE:()=>rr,TRACE_EVENT_BEGIN:()=>Nt,TRACE_EVENT_END:()=>Pt,TRACE_FUNC_BEGIN:()=>rt,TRACE_FUNC_END:()=>Xe,Tensor:()=>it,env:()=>_e,registerBackend:()=>Gt});var qe=L(()=>{ag(),sg(),pg(),ec(),hg(),fg(),tc(),mg(),gg()}),hn=L(()=>{}),ac={};Yt(ac,{default:()=>nc});var Lr,Wr,nc,_g=L(()=>{cf(),Ht(),fn(),Lr="ort-wasm-proxy-worker",Wr=globalThis.self?.name===Lr,Wr&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":mn(r.wasm).then(()=>{Mn(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;On(a,i).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:i}=r,a=dr(i);postMessage({type:t,out:a});break}case"create":{let{model:i,options:a}=r;Rn(i,a).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":Bn(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:a,inputs:s,outputIndices:n,options:u}=r;Dn(i,a,s,n,new Array(n.length).fill(null),u).then(l=>{l.some(c=>c[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},Pn([...s,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":Nn(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),nc=Wr?null:e=>new Worker(e??Ne,{type:"module",name:Lr})}),sc={};Yt(sc,{default:()=>oc});var Hr,oc,Qs,bg=L(()=>{Hr=async function(e={}){var t,r,i=e,a=new Promise((o,d)=>{t=o,r=d}),s=typeof window=="object",n=typeof WorkerGlobalScope<"u",u=n&&self.name?.startsWith("em-pthread");i.mountExternalData=(o,d)=>{o.startsWith("./")&&(o=o.substring(2)),(i.Fb||(i.Fb=new Map)).set(o,d)},i.unmountExternalData=()=>{delete i.Fb};var l=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let c=o=>async(...d)=>{try{if(i.Gb)throw Error("Session already started");let p=i.Gb={ec:d[0],errors:[]},m=await o(...d);if(i.Gb!==p)throw Error("Session mismatch");i.Kb?.flush();let b=p.errors;if(0<b.length){let T=await Promise.all(b);if(T=T.filter(k=>k),0<T.length)throw Error(T.join(`
`))}return m}finally{i.Gb=null}};i.jsepInit=(o,d)=>{if(o==="webgpu"){[i.Kb,i.Vb,i.Zb,i.Lb,i.Yb,i.Ab,i.$b,i.bc,i.Wb,i.Xb,i.ac]=d;let p=i.Kb;i.jsepRegisterBuffer=(m,b,T,k)=>p.registerBuffer(m,b,T,k),i.jsepGetBuffer=m=>p.getBuffer(m),i.jsepCreateDownloader=(m,b,T)=>p.createDownloader(m,b,T),i.jsepOnCreateSession=m=>{p.onCreateSession(m)},i.jsepOnReleaseSession=m=>{p.onReleaseSession(m)},i.jsepOnRunStart=m=>p.onRunStart(m),i.cc=(m,b)=>{p.upload(m,b)}}else if(o==="webnn"){let p=d[0];[i.oc,i.Ob,i.webnnEnsureTensor,i.Pb,i.webnnDownloadTensor,i.nc,i.webnnEnableTraceEvent]=d.slice(1),i.webnnReleaseTensorId=i.Ob,i.webnnUploadTensor=i.Pb,i.webnnRegisterMLContext=i.nc,i.webnnOnRunStart=m=>p.onRunStart(m),i.webnnOnRunEnd=p.onRunEnd.bind(p),i.webnnOnReleaseSession=m=>{p.onReleaseSession(m)},i.webnnCreateMLTensorDownloader=(m,b)=>p.createMLTensorDownloader(m,b),i.webnnRegisterMLTensor=(m,b,T,k)=>p.registerMLTensor(m,b,T,k),i.webnnCreateMLContext=m=>p.createMLContext(m),i.webnnRegisterMLConstant=(m,b,T,k,M,N)=>p.registerMLConstant(m,b,T,k,M,i.Fb,N),i.webnnRegisterGraphInput=p.registerGraphInput.bind(p),i.webnnIsGraphInput=p.isGraphInput.bind(p),i.webnnRegisterGraphOutput=p.registerGraphOutput.bind(p),i.webnnIsGraphOutput=p.isGraphOutput.bind(p),i.webnnCreateTemporaryTensor=p.createTemporaryTensor.bind(p),i.webnnIsGraphInputOutputTypeSupported=p.isGraphInputOutputTypeSupported.bind(p)}};let h=()=>{let o=(d,p,m)=>(...b)=>{let T=et,k=p?.();b=d(...b);let M=p?.();return k!==M&&(d=M,m(k),p=m=null),et!=T?new Promise((N,W)=>{Sr={resolve:N,reject:W}}):b};(()=>{for(let d of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])i[d]=o(i[d],()=>i[d],p=>i[d]=p)})(),c!==void 0&&(i._OrtRun=c(i._OrtRun),i._OrtRunWithBinding=c(i._OrtRunWithBinding)),h=void 0};i.asyncInit=()=>{h?.()};var f,g,y=(o,d)=>{throw d},_=import.meta.url,w="";if(s||n){try{w=new URL(".",_).href}catch{}n&&(g=o=>{var d=new XMLHttpRequest;return d.open("GET",o,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),f=async o=>{if(ge(o))return new Promise((p,m)=>{var b=new XMLHttpRequest;b.open("GET",o,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?p(b.response):m(b.status)},b.onerror=m,b.send(null)});var d=await fetch(o,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)}}var x,$,v,S,C,I,z,E,O,P,F,V,G,ee,q,ae=console.log.bind(console),J=console.error.bind(console),K=ae,ne=J,j=!1,ge=o=>o.startsWith("file://");function U(){return $.buffer!=C.buffer&&Te(),C}function H(){return $.buffer!=C.buffer&&Te(),I}function re(){return $.buffer!=C.buffer&&Te(),z}function ce(){return $.buffer!=C.buffer&&Te(),E}function D(){return $.buffer!=C.buffer&&Te(),O}function le(){return $.buffer!=C.buffer&&Te(),P}function Qe(){return $.buffer!=C.buffer&&Te(),F}function be(){return $.buffer!=C.buffer&&Te(),ee}if(u){let o=function(d){try{var p=d.data,m=p.Db;if(m==="load"){let b=[];self.onmessage=T=>b.push(T),self.startWorker=()=>{postMessage({Db:"loaded"});for(let T of b)o(T);self.onmessage=o};for(let T of p.Sb)i[T]&&!i[T].proxy||(i[T]=(...k)=>{postMessage({Db:"callHandler",Rb:T,args:k})},T=="print"&&(K=i[T]),T=="printErr"&&(ne=i[T]));$=p.kc,Te(),q(p.lc)}else if(m==="run"){Mf(p.Bb),Mr(p.Bb,0,0,1,0,0),jn(),Cr(p.Bb),we||(Us(),we=!0);try{Of(p.hc,p.Jb)}catch(b){if(b!="unwind")throw b}}else p.target!=="setimmediate"&&(m==="checkMailbox"?we&&Ei():m&&(ne(`worker: received unknown command ${m}`),ne(p)))}catch(b){throw Ls(),b}};var we=!1;self.onunhandledrejection=d=>{throw d.reason||d},self.onmessage=o}function Te(){var o=$.buffer;i.HEAP8=C=new Int8Array(o),z=new Int16Array(o),i.HEAPU8=I=new Uint8Array(o),E=new Uint16Array(o),i.HEAP32=O=new Int32Array(o),i.HEAPU32=P=new Uint32Array(o),F=new Float32Array(o),ee=new Float64Array(o),V=new BigInt64Array(o),G=new BigUint64Array(o)}function ki(){u?startWorker(i):R.Da()}var Xt,Qt=0,Jt=null;function Ln(){if(--Qt==0&&Jt){var o=Jt;Jt=null,o()}}function ft(o){throw ne(o="Aborted("+o+")"),j=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),r(o),o}function Wn(){return{a:{L:Ym,Aa:Zm,b:Bf,$:Xn,A:es,pa:ts,X:is,Z:rs,qa:as,na:ns,ga:ss,ma:os,J:us,Y:ls,V:ds,oa:cs,W:ps,va:Df,E:Nf,Q:Pf,O:Lf,D:Hf,v:Ff,s:qf,P:Vf,z:Qf,R:Jf,ja:em,T:tm,aa:im,M:rm,F:am,ia:Cr,sa:nm,r:sm,Ca:om,w:dm,o:cm,m:hm,c:wr,Ba:fm,n:mm,j:_m,u:bm,p:wm,f:vm,t:$m,l:xm,e:Cm,k:Tm,h:Sm,g:Im,d:km,da:Em,ea:zm,fa:Am,ba:Ts,ca:Ss,N:Is,xa:Om,ua:Bm,i:Dm,C:Nm,G:Pm,ta:Rm,x:Um,ra:Lm,U:Wm,q:Mm,y:Hm,K:Fm,S:qm,za:Vm,ya:Gm,ka:As,la:Ms,_:gr,B:Os,I:Rs,ha:Bs,H:Ds,a:$,wa:mr}}}class hr{name="ExitStatus";constructor(d){this.message=`Program terminated with exit(${d})`,this.status=d}}var Hn=o=>{o.terminate(),o.onmessage=()=>{}},fr=[],Fn=o=>{gt.length==0&&(Zn(),Kn(gt[0]));var d=gt.pop();if(!d)return 6;ei.push(d),Tt[o.Bb]=d,d.Bb=o.Bb;var p={Db:"run",hc:o.fc,Jb:o.Jb,Bb:o.Bb};return d.postMessage(p,o.Nb),0},mt=0,ve=(o,d,...p)=>{for(var m=2*p.length,b=Br(),T=Rr(8*m),k=T>>>3,M=0;M<p.length;M++){var N=p[M];typeof N=="bigint"?(V[k+2*M]=1n,V[k+2*M+1]=N):(V[k+2*M]=0n,be()[k+2*M+1>>>0]=N)}return o=Ws(o,0,m,T,d),Pi(b),o};function mr(o){if(u)return ve(0,1,o);if(S=o,!(0<mt)){for(var d of ei)Hn(d);for(d of gt)Hn(d);gt=[],ei=[],Tt={},j=!0}y(0,new hr(o))}function qn(o){if(u)return ve(1,0,o);gr(o)}var gr=o=>{if(S=o,u)throw qn(o),"unwind";mr(o)},gt=[],ei=[],Vn=[],Tt={},Gn=o=>{var d=o.Bb;delete Tt[d],gt.push(o),ei.splice(ei.indexOf(o),1),o.Bb=0,Hs(d)};function jn(){Vn.forEach(o=>o())}var Kn=o=>new Promise(d=>{o.onmessage=b=>{var T=(b=b.data).Db;if(b.Hb&&b.Hb!=Ar()){var k=Tt[b.Hb];k?k.postMessage(b,b.Nb):ne(`Internal error! Worker sent a message "${T}" to target pthread ${b.Hb}, but that thread no longer exists!`)}else T==="checkMailbox"?Ei():T==="spawnThread"?Fn(b):T==="cleanupThread"?Gn(Tt[b.ic]):T==="loaded"?(o.loaded=!0,d(o)):b.target==="setimmediate"?o.postMessage(b):T==="callHandler"?i[b.Rb](...b.args):T&&ne(`worker sent an unknown command ${T}`)},o.onerror=b=>{throw ne(`worker sent an error! ${b.filename}:${b.lineno}: ${b.message}`),b};var p,m=[];for(p of[])i.propertyIsEnumerable(p)&&m.push(p);o.postMessage({Db:"load",Sb:m,kc:$,lc:v})});function Zn(){var o=new Worker((()=>{let d=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new d("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});gt.push(o)}var Mf=o=>{Te();var d=le()[o+52>>>2>>>0];o=le()[o+56>>>2>>>0],Vs(d,d-o),Pi(d)},Of=(o,d)=>{mt=0,o=Gs(o,d),0<mt?S=o:Or(o)};class Rf{constructor(d){this.Ib=d-24}}function Bf(o,d,p){var m=new Rf(o>>>=0);throw d>>>=0,p>>>=0,le()[m.Ib+16>>>2>>>0]=0,le()[m.Ib+4>>>2>>>0]=d,le()[m.Ib+8>>>2>>>0]=p,o}function Yn(o,d,p,m){return u?ve(2,1,o,d,p,m):Xn(o,d,p,m)}function Xn(o,d,p,m){if(o>>>=0,p>>>=0,m>>>=0,l===void 0)return 6;var b=[];return u&&b.length===0?Yn(o,d>>>=0,p,m):(o={fc:p,Bb:o,Jb:m,Nb:b},u?(o.Db="spawnThread",postMessage(o,b),0):Fn(o))}var Qn=typeof TextDecoder<"u"?new TextDecoder:void 0,Jn=(o,d=0,p=NaN)=>{var m=(d>>>=0)+p;for(p=d;o[p]&&!(p>=m);)++p;if(16<p-d&&o.buffer&&Qn)return Qn.decode(o.buffer instanceof ArrayBuffer?o.subarray(d,p):o.slice(d,p));for(m="";d<p;){var b=o[d++];if(128&b){var T=63&o[d++];if((224&b)==192)m+=String.fromCharCode((31&b)<<6|T);else{var k=63&o[d++];65536>(b=(240&b)==224?(15&b)<<12|T<<6|k:(7&b)<<18|T<<12|k<<6|63&o[d++])?m+=String.fromCharCode(b):(b-=65536,m+=String.fromCharCode(55296|b>>10,56320|1023&b))}}else m+=String.fromCharCode(b)}return m},Se=(o,d)=>(o>>>=0)?Jn(H(),o,d):"";function es(o,d,p){return u?ve(3,1,o,d,p):0}function ts(o,d){if(u)return ve(4,1,o,d)}function is(o,d){if(u)return ve(5,1,o,d)}function rs(o,d,p){if(u)return ve(6,1,o,d,p)}function as(o,d,p){return u?ve(7,1,o,d,p):0}function ns(o,d){if(u)return ve(8,1,o,d)}function ss(o,d,p){if(u)return ve(9,1,o,d,p)}function os(o,d,p,m){if(u)return ve(10,1,o,d,p,m)}function us(o,d,p,m){if(u)return ve(11,1,o,d,p,m)}function ls(o,d,p,m){if(u)return ve(12,1,o,d,p,m)}function ds(o){if(u)return ve(13,1,o)}function cs(o,d){if(u)return ve(14,1,o,d)}function ps(o,d,p){if(u)return ve(15,1,o,d,p)}var hs,Df=()=>ft(""),Je=o=>{for(var d="";H()[o>>>0];)d+=hs[H()[o++>>>0]];return d},yr={},_r={},qt=i.BindingError=class extends Error{constructor(o){super(o),this.name="BindingError"}};function at(o,d,p={}){return(function(m,b,T={}){var k=b.name;if(!m)throw new qt(`type "${k}" must have a positive integer typeid pointer`);if(_r.hasOwnProperty(m)){if(T.Tb)return;throw new qt(`Cannot register type '${k}' twice`)}_r[m]=b,yr.hasOwnProperty(m)&&(b=yr[m],delete yr[m],b.forEach(M=>M()))})(o,d,p)}var fs=(o,d,p)=>{switch(d){case 1:return p?m=>U()[m>>>0]:m=>H()[m>>>0];case 2:return p?m=>re()[m>>>1>>>0]:m=>ce()[m>>>1>>>0];case 4:return p?m=>D()[m>>>2>>>0]:m=>le()[m>>>2>>>0];case 8:return p?m=>V[m>>>3]:m=>G[m>>>3];default:throw new TypeError(`invalid integer width (${d}): ${o}`)}};function Nf(o,d,p){p>>>=0,at(o>>>=0,{name:d=Je(d>>>0),fromWireType:m=>m,toWireType:function(m,b){if(typeof b!="bigint"&&typeof b!="number")throw b=b===null?"null":(m=typeof b)=="object"||m==="array"||m==="function"?b.toString():""+b,new TypeError(`Cannot convert "${b}" to ${this.name}`);return typeof b=="number"&&(b=BigInt(b)),b},Cb:yt,readValueFromPointer:fs(d,p,d.indexOf("u")==-1),Eb:null})}var yt=8;function Pf(o,d,p,m){at(o>>>=0,{name:d=Je(d>>>0),fromWireType:function(b){return!!b},toWireType:function(b,T){return T?p:m},Cb:yt,readValueFromPointer:function(b){return this.fromWireType(H()[b>>>0])},Eb:null})}var br=[],nt=[];function wr(o){9<(o>>>=0)&&--nt[o+1]==0&&(nt[o]=void 0,br.push(o))}var Re=o=>{if(!o)throw new qt(`Cannot use deleted val. handle = ${o}`);return nt[o]},He=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let d=br.pop()||nt.length;return nt[d]=o,nt[d+1]=1,d}};function vr(o){return this.fromWireType(le()[o>>>2>>>0])}var Uf={name:"emscripten::val",fromWireType:o=>{var d=Re(o);return wr(o),d},toWireType:(o,d)=>He(d),Cb:yt,readValueFromPointer:vr,Eb:null};function Lf(o){return at(o>>>0,Uf)}var Wf=(o,d)=>{switch(d){case 4:return function(p){return this.fromWireType(Qe()[p>>>2>>>0])};case 8:return function(p){return this.fromWireType(be()[p>>>3>>>0])};default:throw new TypeError(`invalid float width (${d}): ${o}`)}};function Hf(o,d,p){p>>>=0,at(o>>>=0,{name:d=Je(d>>>0),fromWireType:m=>m,toWireType:(m,b)=>b,Cb:yt,readValueFromPointer:Wf(d,p),Eb:null})}function Ff(o,d,p,m,b){if(o>>>=0,p>>>=0,d=Je(d>>>0),b===-1&&(b=4294967295),b=M=>M,m===0){var T=32-8*p;b=M=>M<<T>>>T}var k=d.includes("unsigned")?function(M,N){return N>>>0}:function(M,N){return N};at(o,{name:d,fromWireType:b,toWireType:k,Cb:yt,readValueFromPointer:fs(d,p,m!==0),Eb:null})}function qf(o,d,p){function m(T){var k=le()[T>>>2>>>0];return T=le()[T+4>>>2>>>0],new b(U().buffer,T,k)}var b=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][d];at(o>>>=0,{name:p=Je(p>>>0),fromWireType:m,Cb:yt,readValueFromPointer:m},{Tb:!0})}var St=(o,d,p)=>{var m=H();if(d>>>=0,0<p){var b=d;p=d+p-1;for(var T=0;T<o.length;++T){var k=o.charCodeAt(T);if(55296<=k&&57343>=k&&(k=65536+((1023&k)<<10)|1023&o.charCodeAt(++T)),127>=k){if(d>=p)break;m[d++>>>0]=k}else{if(2047>=k){if(d+1>=p)break;m[d++>>>0]=192|k>>6}else{if(65535>=k){if(d+2>=p)break;m[d++>>>0]=224|k>>12}else{if(d+3>=p)break;m[d++>>>0]=240|k>>18,m[d++>>>0]=128|k>>12&63}m[d++>>>0]=128|k>>6&63}m[d++>>>0]=128|63&k}}m[d>>>0]=0,o=d-b}else o=0;return o},$r=o=>{for(var d=0,p=0;p<o.length;++p){var m=o.charCodeAt(p);127>=m?d++:2047>=m?d+=2:55296<=m&&57343>=m?(d+=4,++p):d+=3}return d};function Vf(o,d){at(o>>>=0,{name:d=Je(d>>>0),fromWireType:function(p){for(var m,b=le()[p>>>2>>>0],T=p+4,k=T,M=0;M<=b;++M){var N=T+M;M!=b&&H()[N>>>0]!=0||(k=Se(k,N-k),m===void 0?m=k:(m+="\0",m+=k),k=N+1)}return st(p),m},toWireType:function(p,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var b=typeof m=="string";if(!(b||ArrayBuffer.isView(m)&&m.BYTES_PER_ELEMENT==1))throw new qt("Cannot pass non-string to std::string");var T=b?$r(m):m.length,k=Ni(4+T+1),M=k+4;return le()[k>>>2>>>0]=T,b?St(m,M,T+1):H().set(m,M>>>0),p!==null&&p.push(st,k),k},Cb:yt,readValueFromPointer:vr,Eb(p){st(p)}})}var ms=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Gf=(o,d)=>{for(var p=o>>1,m=p+d/2;!(p>=m)&&ce()[p>>>0];)++p;if(32<(p<<=1)-o&&ms)return ms.decode(H().slice(o,p));for(p="",m=0;!(m>=d/2);++m){var b=re()[o+2*m>>>1>>>0];if(b==0)break;p+=String.fromCharCode(b)}return p},jf=(o,d,p)=>{if(p??=2147483647,2>p)return 0;var m=d;p=(p-=2)<2*o.length?p/2:o.length;for(var b=0;b<p;++b){var T=o.charCodeAt(b);re()[d>>>1>>>0]=T,d+=2}return re()[d>>>1>>>0]=0,d-m},Kf=o=>2*o.length,Zf=(o,d)=>{for(var p=0,m="";!(p>=d/4);){var b=D()[o+4*p>>>2>>>0];if(b==0)break;++p,65536<=b?(b-=65536,m+=String.fromCharCode(55296|b>>10,56320|1023&b)):m+=String.fromCharCode(b)}return m},Yf=(o,d,p)=>{if(d>>>=0,p??=2147483647,4>p)return 0;var m=d;p=m+p-4;for(var b=0;b<o.length;++b){var T=o.charCodeAt(b);if(55296<=T&&57343>=T&&(T=65536+((1023&T)<<10)|1023&o.charCodeAt(++b)),D()[d>>>2>>>0]=T,(d+=4)+4>p)break}return D()[d>>>2>>>0]=0,d-m},Xf=o=>{for(var d=0,p=0;p<o.length;++p){var m=o.charCodeAt(p);55296<=m&&57343>=m&&++p,d+=4}return d};function Qf(o,d,p){if(o>>>=0,d>>>=0,p=Je(p>>>=0),d===2)var m=Gf,b=jf,T=Kf,k=M=>ce()[M>>>1>>>0];else d===4&&(m=Zf,b=Yf,T=Xf,k=M=>le()[M>>>2>>>0]);at(o,{name:p,fromWireType:M=>{for(var N,W=le()[M>>>2>>>0],Z=M+4,te=0;te<=W;++te){var ue=M+4+te*d;te!=W&&k(ue)!=0||(Z=m(Z,ue-Z),N===void 0?N=Z:(N+="\0",N+=Z),Z=ue+d)}return st(M),N},toWireType:(M,N)=>{if(typeof N!="string")throw new qt(`Cannot pass non-string to C++ string type ${p}`);var W=T(N),Z=Ni(4+W+d);return le()[Z>>>2>>>0]=W/d,b(N,Z+4,W+d),M!==null&&M.push(st,Z),Z},Cb:yt,readValueFromPointer:vr,Eb(M){st(M)}})}function Jf(o,d){at(o>>>=0,{Ub:!0,name:d=Je(d>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function em(o){Mr(o>>>0,!n,1,!s,131072,!1),jn()}var xr=o=>{if(!j)try{if(o(),!(0<mt))try{u?Or(S):gr(S)}catch(d){d instanceof hr||d=="unwind"||y(0,d)}}catch(d){d instanceof hr||d=="unwind"||y(0,d)}};function Cr(o){o>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(D(),o>>>2,o).value.then(Ei),o+=128,Atomics.store(D(),o>>>2,1))}var Ei=()=>{var o=Ar();o&&(Cr(o),xr(qs))};function tm(o,d){(o>>>=0)==d>>>0?setTimeout(Ei):u?postMessage({Hb:o,Db:"checkMailbox"}):(o=Tt[o])&&o.postMessage({Db:"checkMailbox"})}var Tr=[];function im(o,d,p,m,b){for(d>>>=0,m/=2,Tr.length=m,p=b>>>0>>>3,b=0;b<m;b++)Tr[b]=V[p+2*b]?V[p+2*b+1]:be()[p+2*b+1>>>0];return(d?zr[d]:Km[o])(...Tr)}var rm=()=>{mt=0};function am(o){o>>>=0,u?postMessage({Db:"cleanupThread",ic:o}):Gn(Tt[o])}function nm(o){}var zi=(o,d)=>{var p=_r[o];if(p===void 0)throw o=Ps(o),p=Je(o),st(o),new qt(`${d} has unknown type ${p}`);return p},gs=(o,d,p)=>{var m=[];return o=o.toWireType(m,p),m.length&&(le()[d>>>2>>>0]=He(m)),o};function sm(o,d,p){return d>>>=0,p>>>=0,o=Re(o>>>0),d=zi(d,"emval::as"),gs(d,p,o)}function om(o,d){return d>>>=0,o=Re(o>>>0),(d=zi(d,"emval::as")).toWireType(null,o)}var Ai=o=>{try{o()}catch(d){ft(d)}},_t=0,et=null,ys=0,Mi=[],_s={},bs={},um=0,Sr=null,lm=[];function ws(o){return(function(d){if(!j){if(_t===0){var p=!1,m=!1;d((b=0)=>{if(!j&&(ys=b,p=!0,m)){_t=2,Ai(()=>Zs(et)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),b=!1;try{var T=(function(){var N=D()[et+8>>>2>>>0];return N=R[bs[N]],--mt,N()})()}catch(N){T=N,b=!0}var k=!1;if(!et){var M=Sr;M&&(Sr=null,(b?M.reject:M.resolve)(T),k=!0)}if(b&&!k)throw T}}),m=!0,p||(_t=1,et=(function(){var b=Ni(65548),T=b+12;le()[b>>>2>>>0]=T,le()[b+4>>>2>>>0]=T+65536,T=Mi[0];var k=_s[T];return k===void 0&&(k=um++,_s[T]=k,bs[k]=T),T=k,D()[b+8>>>2>>>0]=T,b})(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),Ai(()=>js(et)))}else _t===2?(_t=0,Ai(Ys),st(et),et=null,lm.forEach(xr)):ft(`invalid state: ${_t}`);return ys}})(d=>{o().then(d)})}function dm(o){return o>>>=0,ws(async()=>{var d=await Re(o);return He(d)})}var Oi=[];function cm(o,d,p,m){return p>>>=0,m>>>=0,(o=Oi[o>>>0])(null,d=Re(d>>>0),p,m)}var pm={},Ri=o=>{var d=pm[o];return d===void 0?Je(o):d};function hm(o,d,p,m,b){return p>>>=0,m>>>=0,b>>>=0,(o=Oi[o>>>0])(d=Re(d>>>0),d[p=Ri(p)],m,b)}function fm(o,d){return d>>>=0,(o=Re(o>>>0))==Re(d)}var vs=()=>typeof globalThis=="object"?globalThis:Function("return this")();function mm(o){return(o>>>=0)==0?He(vs()):(o=Ri(o),He(vs()[o]))}var gm=o=>{var d=Oi.length;return Oi.push(o),d},ym=(o,d)=>{for(var p=Array(o),m=0;m<o;++m)p[m]=zi(le()[d+4*m>>>2>>>0],`parameter ${m}`);return p};function _m(o,d,p){var m=(d=ym(o,d>>>0)).shift();o--;var b=`return function (obj, func, destructorsRef, args) {
`,T=0,k=[];p===0&&k.push("obj");for(var M=["retType"],N=[m],W=0;W<o;++W)k.push(`arg${W}`),M.push(`argType${W}`),N.push(d[W]),b+=`  var arg${W} = argType${W}.readValueFromPointer(args${T?"+"+T:""});
`,T+=d[W].Cb;return b+=`  var rv = ${p===1?"new func":"func.call"}(${k.join(", ")});
`,m.Ub||(M.push("emval_returnValue"),N.push(gs),b+=`  return emval_returnValue(retType, destructorsRef, rv);
`),o=new Function(...M,b+`};
`)(...N),p=`methodCaller<(${d.map(Z=>Z.name).join(", ")}) => ${m.name}>`,gm(Object.defineProperty(o,"name",{value:p}))}function bm(o){return o=Ri(o>>>0),He(i[o])}function wm(o,d){return d>>>=0,o=Re(o>>>0),d=Re(d),He(o[d])}function vm(o){9<(o>>>=0)&&(nt[o+1]+=1)}function $m(){return He([])}function xm(o){o=Re(o>>>0);for(var d=Array(o.length),p=0;p<o.length;p++)d[p]=o[p];return He(d)}function Cm(o){return He(Ri(o>>>0))}function Tm(){return He({})}function Sm(o){for(var d=Re(o>>>=0);d.length;){var p=d.pop();d.pop()(p)}wr(o)}function Im(o,d,p){d>>>=0,p>>>=0,o=Re(o>>>0),d=Re(d),p=Re(p),o[d]=p}function km(o,d){return d>>>=0,o=(o=zi(o>>>0,"_emval_take_value")).readValueFromPointer(d),He(o)}function Em(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),D()[d>>>2>>>0]=o.getUTCSeconds(),D()[d+4>>>2>>>0]=o.getUTCMinutes(),D()[d+8>>>2>>>0]=o.getUTCHours(),D()[d+12>>>2>>>0]=o.getUTCDate(),D()[d+16>>>2>>>0]=o.getUTCMonth(),D()[d+20>>>2>>>0]=o.getUTCFullYear()-1900,D()[d+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,D()[d+28>>>2>>>0]=o}var $s=o=>o%4==0&&(o%100!=0||o%400==0),xs=[0,31,60,91,121,152,182,213,244,274,305,335],Cs=[0,31,59,90,120,151,181,212,243,273,304,334];function zm(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),D()[d>>>2>>>0]=o.getSeconds(),D()[d+4>>>2>>>0]=o.getMinutes(),D()[d+8>>>2>>>0]=o.getHours(),D()[d+12>>>2>>>0]=o.getDate(),D()[d+16>>>2>>>0]=o.getMonth(),D()[d+20>>>2>>>0]=o.getFullYear()-1900,D()[d+24>>>2>>>0]=o.getDay();var p=($s(o.getFullYear())?xs:Cs)[o.getMonth()]+o.getDate()-1|0;D()[d+28>>>2>>>0]=p,D()[d+36>>>2>>>0]=-60*o.getTimezoneOffset(),p=new Date(o.getFullYear(),6,1).getTimezoneOffset();var m=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(p!=m&&o.getTimezoneOffset()==Math.min(m,p)),D()[d+32>>>2>>>0]=o}function Am(o){o>>>=0;var d=new Date(D()[o+20>>>2>>>0]+1900,D()[o+16>>>2>>>0],D()[o+12>>>2>>>0],D()[o+8>>>2>>>0],D()[o+4>>>2>>>0],D()[o>>>2>>>0],0),p=D()[o+32>>>2>>>0],m=d.getTimezoneOffset(),b=new Date(d.getFullYear(),6,1).getTimezoneOffset(),T=new Date(d.getFullYear(),0,1).getTimezoneOffset(),k=Math.min(T,b);return 0>p?D()[o+32>>>2>>>0]=+(b!=T&&k==m):0<p!=(k==m)&&(b=Math.max(T,b),d.setTime(d.getTime()+6e4*((0<p?k:b)-m))),D()[o+24>>>2>>>0]=d.getDay(),p=($s(d.getFullYear())?xs:Cs)[d.getMonth()]+d.getDate()-1|0,D()[o+28>>>2>>>0]=p,D()[o>>>2>>>0]=d.getSeconds(),D()[o+4>>>2>>>0]=d.getMinutes(),D()[o+8>>>2>>>0]=d.getHours(),D()[o+12>>>2>>>0]=d.getDate(),D()[o+16>>>2>>>0]=d.getMonth(),D()[o+20>>>2>>>0]=d.getYear(),o=d.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function Ts(o,d,p,m,b,T,k){return u?ve(16,1,o,d,p,m,b,T,k):-52}function Ss(o,d,p,m,b,T){if(u)return ve(17,1,o,d,p,m,b,T)}var ti={},Mm=()=>performance.timeOrigin+performance.now();function Is(o,d){if(u)return ve(18,1,o,d);if(ti[o]&&(clearTimeout(ti[o].id),delete ti[o]),!d)return 0;var p=setTimeout(()=>{delete ti[o],xr(()=>Fs(o,performance.timeOrigin+performance.now()))},d);return ti[o]={id:p,rc:d},0}function Om(o,d,p,m){o>>>=0,d>>>=0,p>>>=0,m>>>=0;var b=new Date().getFullYear(),T=new Date(b,0,1).getTimezoneOffset();b=new Date(b,6,1).getTimezoneOffset();var k=Math.max(T,b);le()[o>>>2>>>0]=60*k,D()[d>>>2>>>0]=+(T!=b),o=(d=M=>{var N=Math.abs(M);return`UTC${0<=M?"-":"+"}${String(Math.floor(N/60)).padStart(2,"0")}${String(N%60).padStart(2,"0")}`})(T),d=d(b),b<T?(St(o,p,17),St(d,m,17)):(St(o,m,17),St(d,p,17))}var Rm=()=>Date.now();function Bm(o,d,p){return 0<=o&&3>=o?(o===0?o=Date.now():o=performance.timeOrigin+performance.now(),V[p>>>0>>>3]=BigInt(Math.round(1e6*o)),0):28}var Ir=[],ks=(o,d)=>{Ir.length=0;for(var p;p=H()[o++>>>0];){var m=p!=105;d+=(m&=p!=112)&&d%8?4:0,Ir.push(p==112?le()[d>>>2>>>0]:p==106?V[d>>>3]:p==105?D()[d>>>2>>>0]:be()[d>>>3>>>0]),d+=m?8:4}return Ir};function Dm(o,d,p){return o>>>=0,d=ks(d>>>0,p>>>0),zr[o](...d)}function Nm(o,d,p){return o>>>=0,d=ks(d>>>0,p>>>0),zr[o](...d)}var Pm=()=>{};function Um(o,d){return ne(Se(o>>>0,d>>>0))}var Lm=()=>{throw mt+=1,"unwind"};function Wm(){return 4294901760}var Hm=()=>navigator.hardwareConcurrency;function Fm(){return ft("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function qm(o){o>>>=0;var d=H().length;if(o<=d||4294901760<o)return!1;for(var p=1;4>=p;p*=2){var m=d*(1+.2/p);m=Math.min(m,o+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(o,m)/65536))-$.buffer.byteLength+65535)/65536|0;try{$.grow(m),Te();var b=1;break e}catch{}b=void 0}if(b)return!0}return!1}var Bi=()=>(ft("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),ii={},Es=o=>{o.forEach(d=>{Bi()})};function Vm(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),Es(o),ii.Mb=Bi(),ii.dc=o,ii.Mb}function Gm(o,d,p){if(o>>>=0,d>>>=0,ii.Mb==o)var m=ii.dc;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),Es(m);for(var b=3;m[b]&&Bi()!=o;)++b;for(o=0;o<p&&m[o+b];++o)D()[d+4*o>>>2>>>0]=Bi();return o}var kr,Er={},zs=()=>{if(!kr){var o,d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in Er)Er[o]===void 0?delete d[o]:d[o]=Er[o];var p=[];for(o in d)p.push(`${o}=${d[o]}`);kr=p}return kr};function As(o,d){if(u)return ve(19,1,o,d);o>>>=0,d>>>=0;var p,m=0,b=0;for(p of zs()){var T=d+m;le()[o+b>>>2>>>0]=T,m+=St(p,T,1/0)+1,b+=4}return 0}function Ms(o,d){if(u)return ve(20,1,o,d);o>>>=0,d>>>=0;var p=zs();for(var m of(le()[o>>>2>>>0]=p.length,o=0,p))o+=$r(m)+1;return le()[d>>>2>>>0]=o,0}function Os(o){return u?ve(21,1,o):52}function Rs(o,d,p,m){return u?ve(22,1,o,d,p,m):52}function Bs(o,d,p,m){return u?ve(23,1,o,d,p,m):70}var jm=[null,[],[]];function Ds(o,d,p,m){if(u)return ve(24,1,o,d,p,m);d>>>=0,p>>>=0,m>>>=0;for(var b=0,T=0;T<p;T++){var k=le()[d>>>2>>>0],M=le()[d+4>>>2>>>0];d+=8;for(var N=0;N<M;N++){var W=o,Z=H()[k+N>>>0],te=jm[W];Z===0||Z===10?((W===1?K:ne)(Jn(te)),te.length=0):te.push(Z)}b+=M}return le()[m>>>2>>>0]=b,0}u||(function(){for(var o=i.numThreads-1;o--;)Zn();fr.push(()=>{Qt++,(function(d){u?d():Promise.all(gt.map(Kn)).then(d)})(()=>Ln())})})();for(var Ns=Array(256),Di=0;256>Di;++Di)Ns[Di]=String.fromCharCode(Di);hs=Ns,nt.push(0,1,void 0,1,null,1,!0,1,!1,1),i.count_emval_handles=()=>nt.length/2-5-br.length,u||($=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Te()),i.wasmBinary&&(x=i.wasmBinary),i.stackSave=()=>Br(),i.stackRestore=o=>Pi(o),i.stackAlloc=o=>Rr(o),i.setValue=function(o,d,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":U()[o>>>0]=d;break;case"i16":re()[o>>>1>>>0]=d;break;case"i32":D()[o>>>2>>>0]=d;break;case"i64":V[o>>>3]=BigInt(d);break;case"float":Qe()[o>>>2>>>0]=d;break;case"double":be()[o>>>3>>>0]=d;break;case"*":le()[o>>>2>>>0]=d;break;default:ft(`invalid type for setValue: ${p}`)}},i.getValue=function(o,d="i8"){switch(d.endsWith("*")&&(d="*"),d){case"i1":case"i8":return U()[o>>>0];case"i16":return re()[o>>>1>>>0];case"i32":return D()[o>>>2>>>0];case"i64":return V[o>>>3];case"float":return Qe()[o>>>2>>>0];case"double":return be()[o>>>3>>>0];case"*":return le()[o>>>2>>>0];default:ft(`invalid type for getValue: ${d}`)}},i.UTF8ToString=Se,i.stringToUTF8=St,i.lengthBytesUTF8=$r;var Km=[mr,qn,Yn,es,ts,is,rs,as,ns,ss,os,us,ls,ds,cs,ps,Ts,Ss,Is,As,Ms,Os,Rs,Bs,Ds],zr={893836:(o,d,p,m,b)=>{if(i===void 0||!i.Fb)return 1;if((o=Se(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=i.Fb.get(o)))return 2;if(d=Number(d>>>0),p=Number(p>>>0),m=Number(m>>>0),d+p>o.byteLength)return 3;try{let T=o.subarray(d,d+p);switch(b){case 0:H().set(T,m>>>0);break;case 1:i.mc?i.mc(m,T):i.cc(m,T);break;default:return 4}return 0}catch{return 4}},894660:(o,d,p)=>{i.Pb(o,H().subarray(d>>>0,d+p>>>0))},894724:()=>i.oc(),894766:o=>{i.Ob(o)},894803:()=>{i.Wb()},894834:()=>{i.Xb()},894863:()=>{i.ac()},894888:o=>i.Vb(o),894921:o=>i.Zb(o),894953:(o,d,p)=>{i.Lb(Number(o),Number(d),Number(p),!0)},895016:(o,d,p)=>{i.Lb(Number(o),Number(d),Number(p))},895073:()=>typeof wasmOffsetConverter<"u",895130:o=>{i.Ab("Abs",o,void 0)},895181:o=>{i.Ab("Neg",o,void 0)},895232:o=>{i.Ab("Floor",o,void 0)},895285:o=>{i.Ab("Ceil",o,void 0)},895337:o=>{i.Ab("Reciprocal",o,void 0)},895395:o=>{i.Ab("Sqrt",o,void 0)},895447:o=>{i.Ab("Exp",o,void 0)},895498:o=>{i.Ab("Erf",o,void 0)},895549:o=>{i.Ab("Sigmoid",o,void 0)},895604:(o,d,p)=>{i.Ab("HardSigmoid",o,{alpha:d,beta:p})},895683:o=>{i.Ab("Log",o,void 0)},895734:o=>{i.Ab("Sin",o,void 0)},895785:o=>{i.Ab("Cos",o,void 0)},895836:o=>{i.Ab("Tan",o,void 0)},895887:o=>{i.Ab("Asin",o,void 0)},895939:o=>{i.Ab("Acos",o,void 0)},895991:o=>{i.Ab("Atan",o,void 0)},896043:o=>{i.Ab("Sinh",o,void 0)},896095:o=>{i.Ab("Cosh",o,void 0)},896147:o=>{i.Ab("Asinh",o,void 0)},896200:o=>{i.Ab("Acosh",o,void 0)},896253:o=>{i.Ab("Atanh",o,void 0)},896306:o=>{i.Ab("Tanh",o,void 0)},896358:o=>{i.Ab("Not",o,void 0)},896409:(o,d,p)=>{i.Ab("Clip",o,{min:d,max:p})},896478:o=>{i.Ab("Clip",o,void 0)},896530:(o,d)=>{i.Ab("Elu",o,{alpha:d})},896588:o=>{i.Ab("Gelu",o,void 0)},896640:o=>{i.Ab("Relu",o,void 0)},896692:(o,d)=>{i.Ab("LeakyRelu",o,{alpha:d})},896756:(o,d)=>{i.Ab("ThresholdedRelu",o,{alpha:d})},896826:(o,d)=>{i.Ab("Cast",o,{to:d})},896884:o=>{i.Ab("Add",o,void 0)},896935:o=>{i.Ab("Sub",o,void 0)},896986:o=>{i.Ab("Mul",o,void 0)},897037:o=>{i.Ab("Div",o,void 0)},897088:o=>{i.Ab("Pow",o,void 0)},897139:o=>{i.Ab("Equal",o,void 0)},897192:o=>{i.Ab("Greater",o,void 0)},897247:o=>{i.Ab("GreaterOrEqual",o,void 0)},897309:o=>{i.Ab("Less",o,void 0)},897361:o=>{i.Ab("LessOrEqual",o,void 0)},897420:(o,d,p,m,b)=>{i.Ab("ReduceMean",o,{keepDims:!!d,noopWithEmptyAxes:!!p,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},897595:(o,d,p,m,b)=>{i.Ab("ReduceMax",o,{keepDims:!!d,noopWithEmptyAxes:!!p,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},897769:(o,d,p,m,b)=>{i.Ab("ReduceMin",o,{keepDims:!!d,noopWithEmptyAxes:!!p,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},897943:(o,d,p,m,b)=>{i.Ab("ReduceProd",o,{keepDims:!!d,noopWithEmptyAxes:!!p,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},898118:(o,d,p,m,b)=>{i.Ab("ReduceSum",o,{keepDims:!!d,noopWithEmptyAxes:!!p,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},898292:(o,d,p,m,b)=>{i.Ab("ReduceL1",o,{keepDims:!!d,noopWithEmptyAxes:!!p,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},898465:(o,d,p,m,b)=>{i.Ab("ReduceL2",o,{keepDims:!!d,noopWithEmptyAxes:!!p,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},898638:(o,d,p,m,b)=>{i.Ab("ReduceLogSum",o,{keepDims:!!d,noopWithEmptyAxes:!!p,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},898815:(o,d,p,m,b)=>{i.Ab("ReduceSumSquare",o,{keepDims:!!d,noopWithEmptyAxes:!!p,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},898995:(o,d,p,m,b)=>{i.Ab("ReduceLogSumExp",o,{keepDims:!!d,noopWithEmptyAxes:!!p,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},899175:o=>{i.Ab("Where",o,void 0)},899228:(o,d,p)=>{i.Ab("Transpose",o,{perm:d?Array.from(D().subarray(Number(d)>>>0,Number(p)>>>0)):[]})},899352:(o,d,p,m)=>{i.Ab("DepthToSpace",o,{blocksize:d,mode:Se(p),format:m?"NHWC":"NCHW"})},899485:(o,d,p,m)=>{i.Ab("DepthToSpace",o,{blocksize:d,mode:Se(p),format:m?"NHWC":"NCHW"})},899618:(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie)=>{i.Ab("ConvTranspose",o,{format:N?"NHWC":"NCHW",autoPad:d,dilations:[p],group:m,kernelShape:[b],pads:[T,k],strides:[M],wIsConst:()=>!!U()[W>>>0],outputPadding:Z?Array.from(D().subarray(Number(Z)>>>0,Number(te)>>>0)):[],outputShape:ue?Array.from(D().subarray(Number(ue)>>>0,Number(he)>>>0)):[],activation:Se(Ie)})},900051:(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he)=>{i.Ab("ConvTranspose",o,{format:M?"NHWC":"NCHW",autoPad:d,dilations:Array.from(D().subarray(Number(p)>>>0,2+(Number(p)>>>0)>>>0)),group:m,kernelShape:Array.from(D().subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),pads:Array.from(D().subarray(Number(T)>>>0,4+(Number(T)>>>0)>>>0)),strides:Array.from(D().subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),wIsConst:()=>!!U()[N>>>0],outputPadding:W?Array.from(D().subarray(Number(W)>>>0,Number(Z)>>>0)):[],outputShape:te?Array.from(D().subarray(Number(te)>>>0,Number(ue)>>>0)):[],activation:Se(he)})},900712:(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie)=>{i.Ab("ConvTranspose",o,{format:N?"NHWC":"NCHW",autoPad:d,dilations:[p],group:m,kernelShape:[b],pads:[T,k],strides:[M],wIsConst:()=>!!U()[W>>>0],outputPadding:Z?Array.from(D().subarray(Number(Z)>>>0,Number(te)>>>0)):[],outputShape:ue?Array.from(D().subarray(Number(ue)>>>0,Number(he)>>>0)):[],activation:Se(Ie)})},901145:(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he)=>{i.Ab("ConvTranspose",o,{format:M?"NHWC":"NCHW",autoPad:d,dilations:Array.from(D().subarray(Number(p)>>>0,2+(Number(p)>>>0)>>>0)),group:m,kernelShape:Array.from(D().subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),pads:Array.from(D().subarray(Number(T)>>>0,4+(Number(T)>>>0)>>>0)),strides:Array.from(D().subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),wIsConst:()=>!!U()[N>>>0],outputPadding:W?Array.from(D().subarray(Number(W)>>>0,Number(Z)>>>0)):[],outputShape:te?Array.from(D().subarray(Number(te)>>>0,Number(ue)>>>0)):[],activation:Se(he)})},901806:(o,d)=>{i.Ab("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},901897:(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he)=>{i.Ab("AveragePool",o,{format:he?"NHWC":"NCHW",auto_pad:d,ceil_mode:p,count_include_pad:m,storage_order:b,dilations:T?Array.from(D().subarray(Number(T)>>>0,Number(k)>>>0)):[],kernel_shape:M?Array.from(D().subarray(Number(M)>>>0,Number(N)>>>0)):[],pads:W?Array.from(D().subarray(Number(W)>>>0,Number(Z)>>>0)):[],strides:te?Array.from(D().subarray(Number(te)>>>0,Number(ue)>>>0)):[]})},902376:(o,d)=>{i.Ab("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},902467:(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he)=>{i.Ab("AveragePool",o,{format:he?"NHWC":"NCHW",auto_pad:d,ceil_mode:p,count_include_pad:m,storage_order:b,dilations:T?Array.from(D().subarray(Number(T)>>>0,Number(k)>>>0)):[],kernel_shape:M?Array.from(D().subarray(Number(M)>>>0,Number(N)>>>0)):[],pads:W?Array.from(D().subarray(Number(W)>>>0,Number(Z)>>>0)):[],strides:te?Array.from(D().subarray(Number(te)>>>0,Number(ue)>>>0)):[]})},902946:(o,d)=>{i.Ab("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},903033:(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he)=>{i.Ab("MaxPool",o,{format:he?"NHWC":"NCHW",auto_pad:d,ceil_mode:p,count_include_pad:m,storage_order:b,dilations:T?Array.from(D().subarray(Number(T)>>>0,Number(k)>>>0)):[],kernel_shape:M?Array.from(D().subarray(Number(M)>>>0,Number(N)>>>0)):[],pads:W?Array.from(D().subarray(Number(W)>>>0,Number(Z)>>>0)):[],strides:te?Array.from(D().subarray(Number(te)>>>0,Number(ue)>>>0)):[]})},903508:(o,d)=>{i.Ab("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},903595:(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he)=>{i.Ab("MaxPool",o,{format:he?"NHWC":"NCHW",auto_pad:d,ceil_mode:p,count_include_pad:m,storage_order:b,dilations:T?Array.from(D().subarray(Number(T)>>>0,Number(k)>>>0)):[],kernel_shape:M?Array.from(D().subarray(Number(M)>>>0,Number(N)>>>0)):[],pads:W?Array.from(D().subarray(Number(W)>>>0,Number(Z)>>>0)):[],strides:te?Array.from(D().subarray(Number(te)>>>0,Number(ue)>>>0)):[]})},904070:(o,d,p,m,b)=>{i.Ab("Gemm",o,{alpha:d,beta:p,transA:m,transB:b})},904174:o=>{i.Ab("MatMul",o,void 0)},904228:(o,d,p,m)=>{i.Ab("ArgMax",o,{keepDims:!!d,selectLastIndex:!!p,axis:m})},904336:(o,d,p,m)=>{i.Ab("ArgMin",o,{keepDims:!!d,selectLastIndex:!!p,axis:m})},904444:(o,d)=>{i.Ab("Softmax",o,{axis:d})},904507:(o,d)=>{i.Ab("Concat",o,{axis:d})},904567:(o,d,p,m,b)=>{i.Ab("Split",o,{axis:d,numOutputs:p,splitSizes:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},904723:o=>{i.Ab("Expand",o,void 0)},904777:(o,d)=>{i.Ab("Gather",o,{axis:Number(d)})},904848:(o,d)=>{i.Ab("GatherElements",o,{axis:Number(d)})},904927:(o,d)=>{i.Ab("GatherND",o,{batch_dims:Number(d)})},905006:(o,d,p,m,b,T,k,M,N,W,Z)=>{i.Ab("Resize",o,{antialias:d,axes:p?Array.from(D().subarray(Number(p)>>>0,Number(m)>>>0)):[],coordinateTransformMode:Se(b),cubicCoeffA:T,excludeOutside:k,extrapolationValue:M,keepAspectRatioPolicy:Se(N),mode:Se(W),nearestMode:Se(Z)})},905368:(o,d,p,m,b,T,k)=>{i.Ab("Slice",o,{starts:d?Array.from(D().subarray(Number(d)>>>0,Number(p)>>>0)):[],ends:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[],axes:T?Array.from(D().subarray(Number(T)>>>0,Number(k)>>>0)):[]})},905632:o=>{i.Ab("Tile",o,void 0)},905684:(o,d,p)=>{i.Ab("InstanceNormalization",o,{epsilon:d,format:p?"NHWC":"NCHW"})},905798:(o,d,p)=>{i.Ab("InstanceNormalization",o,{epsilon:d,format:p?"NHWC":"NCHW"})},905912:o=>{i.Ab("Range",o,void 0)},905965:(o,d)=>{i.Ab("Einsum",o,{equation:Se(d)})},906046:(o,d,p,m,b)=>{i.Ab("Pad",o,{mode:d,value:p,pads:m?Array.from(D().subarray(Number(m)>>>0,Number(b)>>>0)):[]})},906189:(o,d,p,m,b,T)=>{i.Ab("BatchNormalization",o,{epsilon:d,momentum:p,spatial:!!b,trainingMode:!!m,format:T?"NHWC":"NCHW"})},906358:(o,d,p,m,b,T)=>{i.Ab("BatchNormalization",o,{epsilon:d,momentum:p,spatial:!!b,trainingMode:!!m,format:T?"NHWC":"NCHW"})},906527:(o,d,p)=>{i.Ab("CumSum",o,{exclusive:Number(d),reverse:Number(p)})},906624:(o,d,p)=>{i.Ab("DequantizeLinear",o,{axis:d,blockSize:p})},906714:(o,d,p,m,b)=>{i.Ab("GridSample",o,{align_corners:d,mode:Se(p),padding_mode:Se(m),format:b?"NHWC":"NCHW"})},906884:(o,d,p,m,b)=>{i.Ab("GridSample",o,{align_corners:d,mode:Se(p),padding_mode:Se(m),format:b?"NHWC":"NCHW"})},907054:(o,d)=>{i.Ab("ScatterND",o,{reduction:Se(d)})},907139:(o,d,p,m,b,T,k,M,N)=>{i.Ab("Attention",o,{numHeads:d,isUnidirectional:p,maskFilterValue:m,scale:b,doRotary:T,qkvHiddenSizes:k?Array.from(D().subarray(Number(M)>>>0,Number(M)+k>>>0)):[],pastPresentShareBuffer:!!N})},907411:o=>{i.Ab("BiasAdd",o,void 0)},907466:o=>{i.Ab("BiasSplitGelu",o,void 0)},907527:o=>{i.Ab("FastGelu",o,void 0)},907583:(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De)=>{i.Ab("Conv",o,{format:te?"NHWC":"NCHW",auto_pad:d,dilations:p?Array.from(D().subarray(Number(p)>>>0,Number(m)>>>0)):[],group:b,kernel_shape:T?Array.from(D().subarray(Number(T)>>>0,Number(k)>>>0)):[],pads:M?Array.from(D().subarray(Number(M)>>>0,Number(N)>>>0)):[],strides:W?Array.from(D().subarray(Number(W)>>>0,Number(Z)>>>0)):[],w_is_const:()=>!!U()[Number(ue)>>>0],activation:Se(he),activation_params:Ie?Array.from(Qe().subarray(Number(Ie)>>>0,Number(De)>>>0)):[]})},908167:o=>{i.Ab("Gelu",o,void 0)},908219:(o,d,p,m,b,T,k,M,N)=>{i.Ab("GroupQueryAttention",o,{numHeads:d,kvNumHeads:p,scale:m,softcap:b,doRotary:T,rotaryInterleaved:k,smoothSoftmax:M,localWindowSize:N})},908436:(o,d,p,m)=>{i.Ab("LayerNormalization",o,{axis:d,epsilon:p,simplified:!!m})},908547:(o,d,p,m)=>{i.Ab("LayerNormalization",o,{axis:d,epsilon:p,simplified:!!m})},908658:(o,d,p,m,b,T)=>{i.Ab("MatMulNBits",o,{k:d,n:p,accuracyLevel:m,bits:b,blockSize:T})},908785:(o,d,p,m,b,T)=>{i.Ab("MultiHeadAttention",o,{numHeads:d,isUnidirectional:p,maskFilterValue:m,scale:b,doRotary:T})},908944:(o,d)=>{i.Ab("QuickGelu",o,{alpha:d})},909008:(o,d,p,m,b)=>{i.Ab("RotaryEmbedding",o,{interleaved:!!d,numHeads:p,rotaryEmbeddingDim:m,scale:b})},909147:(o,d,p)=>{i.Ab("SkipLayerNormalization",o,{epsilon:d,simplified:!!p})},909249:(o,d,p)=>{i.Ab("SkipLayerNormalization",o,{epsilon:d,simplified:!!p})},909351:(o,d,p,m)=>{i.Ab("GatherBlockQuantized",o,{gatherAxis:d,quantizeAxis:p,blockSize:m})},909472:o=>{i.$b(o)},909506:(o,d)=>i.bc(Number(o),Number(d),i.Gb.ec,i.Gb.errors)};function Zm(o,d,p){return ws(async()=>{await i.Yb(Number(o),Number(d),Number(p))})}function Ym(){return typeof wasmOffsetConverter<"u"}var R=await(async function(){function o(m,b){return R=m.exports,R=(function(){var T=R,k={};for(let[M,N]of Object.entries(T))k[M]=typeof N=="function"?(...W)=>{Mi.push(M);try{return N(...W)}finally{j||(Mi.pop(),et&&_t===1&&Mi.length===0&&(_t=0,mt+=1,Ai(Ks),typeof Fibers<"u"&&Fibers.sc()))}}:N;return k})(),R=(function(){var T=R,k=N=>W=>N(W)>>>0,M=N=>()=>N()>>>0;return(T=Object.assign({},T)).Ea=k(T.Ea),T.gb=M(T.gb),T.ib=k(T.ib),T.tb=k(T.tb),T.ub=M(T.ub),T.__cxa_get_exception_ptr=k(T.__cxa_get_exception_ptr),T})(),Vn.push(R.jb),v=b,Ln(),R}Qt++;var d=Wn();if(i.instantiateWasm)return new Promise(m=>{i.instantiateWasm(d,(b,T)=>{m(o(b,T))})});if(u)return new Promise(m=>{q=b=>{var T=new WebAssembly.Instance(b,Wn());m(o(T,b))}});Xt??=i.locateFile?i.locateFile?i.locateFile("ort-wasm-simd-threaded.jsep.wasm",w):w+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep-BGTZ4Y7F.wasm",import.meta.url).href,import.meta.url).href;try{var p=await(async function(m){var b=Xt;if(!x&&typeof WebAssembly.instantiateStreaming=="function"&&!ge(b))try{var T=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(T,m)}catch(k){ne(`wasm streaming compile failed: ${k}`),ne("falling back to ArrayBuffer instantiation")}return(async function(k,M){try{var N=await(async function(W){if(!x)try{var Z=await f(W);return new Uint8Array(Z)}catch{}if(W==Xt&&x)W=new Uint8Array(x);else{if(!g)throw"both async and sync fetching of the wasm failed";W=g(W)}return W})(k);return await WebAssembly.instantiate(N,M)}catch(W){ne(`failed to asynchronously prepare wasm: ${W}`),ft(W)}})(b,m)})(d);return o(p.instance,p.module)}catch(m){return r(m),Promise.reject(m)}})(),Ps=o=>(Ps=R.Ea)(o),Us=()=>(Us=R.Fa)();i._OrtInit=(o,d)=>(i._OrtInit=R.Ga)(o,d),i._OrtGetLastError=(o,d)=>(i._OrtGetLastError=R.Ha)(o,d),i._OrtCreateSessionOptions=(o,d,p,m,b,T,k,M,N,W)=>(i._OrtCreateSessionOptions=R.Ia)(o,d,p,m,b,T,k,M,N,W),i._OrtAppendExecutionProvider=(o,d,p,m,b)=>(i._OrtAppendExecutionProvider=R.Ja)(o,d,p,m,b),i._OrtAddFreeDimensionOverride=(o,d,p)=>(i._OrtAddFreeDimensionOverride=R.Ka)(o,d,p),i._OrtAddSessionConfigEntry=(o,d,p)=>(i._OrtAddSessionConfigEntry=R.La)(o,d,p),i._OrtReleaseSessionOptions=o=>(i._OrtReleaseSessionOptions=R.Ma)(o),i._OrtCreateSession=(o,d,p)=>(i._OrtCreateSession=R.Na)(o,d,p),i._OrtReleaseSession=o=>(i._OrtReleaseSession=R.Oa)(o),i._OrtGetInputOutputCount=(o,d,p)=>(i._OrtGetInputOutputCount=R.Pa)(o,d,p),i._OrtGetInputOutputMetadata=(o,d,p,m)=>(i._OrtGetInputOutputMetadata=R.Qa)(o,d,p,m),i._OrtFree=o=>(i._OrtFree=R.Ra)(o),i._OrtCreateTensor=(o,d,p,m,b,T)=>(i._OrtCreateTensor=R.Sa)(o,d,p,m,b,T),i._OrtGetTensorData=(o,d,p,m,b)=>(i._OrtGetTensorData=R.Ta)(o,d,p,m,b),i._OrtReleaseTensor=o=>(i._OrtReleaseTensor=R.Ua)(o),i._OrtCreateRunOptions=(o,d,p,m)=>(i._OrtCreateRunOptions=R.Va)(o,d,p,m),i._OrtAddRunConfigEntry=(o,d,p)=>(i._OrtAddRunConfigEntry=R.Wa)(o,d,p),i._OrtReleaseRunOptions=o=>(i._OrtReleaseRunOptions=R.Xa)(o),i._OrtCreateBinding=o=>(i._OrtCreateBinding=R.Ya)(o),i._OrtBindInput=(o,d,p)=>(i._OrtBindInput=R.Za)(o,d,p),i._OrtBindOutput=(o,d,p,m)=>(i._OrtBindOutput=R._a)(o,d,p,m),i._OrtClearBoundOutputs=o=>(i._OrtClearBoundOutputs=R.$a)(o),i._OrtReleaseBinding=o=>(i._OrtReleaseBinding=R.ab)(o),i._OrtRunWithBinding=(o,d,p,m,b)=>(i._OrtRunWithBinding=R.bb)(o,d,p,m,b),i._OrtRun=(o,d,p,m,b,T,k,M)=>(i._OrtRun=R.cb)(o,d,p,m,b,T,k,M),i._OrtEndProfiling=o=>(i._OrtEndProfiling=R.db)(o),i._JsepOutput=(o,d,p)=>(i._JsepOutput=R.eb)(o,d,p),i._JsepGetNodeName=o=>(i._JsepGetNodeName=R.fb)(o);var Ar=()=>(Ar=R.gb)(),st=i._free=o=>(st=i._free=R.hb)(o),Ni=i._malloc=o=>(Ni=i._malloc=R.ib)(o),Mr=(o,d,p,m,b,T)=>(Mr=R.kb)(o,d,p,m,b,T),Ls=()=>(Ls=R.lb)(),Ws=(o,d,p,m,b)=>(Ws=R.mb)(o,d,p,m,b),Hs=o=>(Hs=R.nb)(o),Or=o=>(Or=R.ob)(o),Fs=(o,d)=>(Fs=R.pb)(o,d),qs=()=>(qs=R.qb)(),Vs=(o,d)=>(Vs=R.rb)(o,d),Pi=o=>(Pi=R.sb)(o),Rr=o=>(Rr=R.tb)(o),Br=()=>(Br=R.ub)(),Gs=i.dynCall_ii=(o,d)=>(Gs=i.dynCall_ii=R.vb)(o,d);i.dynCall_vii=(o,d,p)=>(i.dynCall_vii=R.dynCall_vii)(o,d,p),i.dynCall_iiiii=(o,d,p,m,b)=>(i.dynCall_iiiii=R.dynCall_iiiii)(o,d,p,m,b),i.dynCall_iii=(o,d,p)=>(i.dynCall_iii=R.dynCall_iii)(o,d,p),i.dynCall_iiiiii=(o,d,p,m,b,T)=>(i.dynCall_iiiiii=R.dynCall_iiiiii)(o,d,p,m,b,T),i.dynCall_iiiiiiii=(o,d,p,m,b,T,k,M)=>(i.dynCall_iiiiiiii=R.dynCall_iiiiiiii)(o,d,p,m,b,T,k,M),i.dynCall_iiiiiii=(o,d,p,m,b,T,k)=>(i.dynCall_iiiiiii=R.dynCall_iiiiiii)(o,d,p,m,b,T,k),i.dynCall_vi=(o,d)=>(i.dynCall_vi=R.dynCall_vi)(o,d),i.dynCall_iiii=(o,d,p,m)=>(i.dynCall_iiii=R.dynCall_iiii)(o,d,p,m),i.dynCall_i=o=>(i.dynCall_i=R.dynCall_i)(o),i.dynCall_viiiiiiii=(o,d,p,m,b,T,k,M,N)=>(i.dynCall_viiiiiiii=R.dynCall_viiiiiiii)(o,d,p,m,b,T,k,M,N),i.dynCall_viii=(o,d,p,m)=>(i.dynCall_viii=R.dynCall_viii)(o,d,p,m),i.dynCall_viijj=(o,d,p,m,b)=>(i.dynCall_viijj=R.dynCall_viijj)(o,d,p,m,b),i.dynCall_viiiiii=(o,d,p,m,b,T,k)=>(i.dynCall_viiiiii=R.dynCall_viiiiii)(o,d,p,m,b,T,k),i.dynCall_viiii=(o,d,p,m,b)=>(i.dynCall_viiii=R.dynCall_viiii)(o,d,p,m,b),i.dynCall_viiiii=(o,d,p,m,b,T)=>(i.dynCall_viiiii=R.dynCall_viiiii)(o,d,p,m,b,T),i.dynCall_vfiii=(o,d,p,m,b)=>(i.dynCall_vfiii=R.dynCall_vfiii)(o,d,p,m,b),i.dynCall_viiiiff=(o,d,p,m,b,T,k)=>(i.dynCall_viiiiff=R.dynCall_viiiiff)(o,d,p,m,b,T,k),i.dynCall_viiiiiff=(o,d,p,m,b,T,k,M)=>(i.dynCall_viiiiiff=R.dynCall_viiiiiff)(o,d,p,m,b,T,k,M),i.dynCall_ffff=(o,d,p,m)=>(i.dynCall_ffff=R.dynCall_ffff)(o,d,p,m),i.dynCall_viiff=(o,d,p,m,b)=>(i.dynCall_viiff=R.dynCall_viiff)(o,d,p,m,b),i.dynCall_fffffff=(o,d,p,m,b,T,k)=>(i.dynCall_fffffff=R.dynCall_fffffff)(o,d,p,m,b,T,k),i.dynCall_jjjjjjj=(o,d,p,m,b,T,k)=>(i.dynCall_jjjjjjj=R.dynCall_jjjjjjj)(o,d,p,m,b,T,k),i.dynCall_jjjjjj=(o,d,p,m,b,T)=>(i.dynCall_jjjjjj=R.dynCall_jjjjjj)(o,d,p,m,b,T),i.dynCall_iijjii=(o,d,p,m,b,T)=>(i.dynCall_iijjii=R.dynCall_iijjii)(o,d,p,m,b,T),i.dynCall_viiiiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he)=>(i.dynCall_viiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he),i.dynCall_viiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z)=>(i.dynCall_viiiiiiiiii=R.dynCall_viiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z),i.dynCall_viiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z,te)=>(i.dynCall_viiiiiiiiiii=R.dynCall_viiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z,te),i.dynCall_viiiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z,te,ue)=>(i.dynCall_viiiiiiiiiiii=R.dynCall_viiiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z,te,ue),i.dynCall_viiiiiiiiiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De,ot,It,ri)=>(i.dynCall_viiiiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De,ot,It,ri),i.dynCall_viiiiiiiii=(o,d,p,m,b,T,k,M,N,W)=>(i.dynCall_viiiiiiiii=R.dynCall_viiiiiiiii)(o,d,p,m,b,T,k,M,N,W),i.dynCall_viiiiiiiiiiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De,ot,It,ri,Dr)=>(i.dynCall_viiiiiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De,ot,It,ri,Dr),i.dynCall_viiiiiii=(o,d,p,m,b,T,k,M)=>(i.dynCall_viiiiiii=R.dynCall_viiiiiii)(o,d,p,m,b,T,k,M),i.dynCall_viiiiiiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De)=>(i.dynCall_viiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De),i.dynCall_jiji=(o,d,p,m)=>(i.dynCall_jiji=R.dynCall_jiji)(o,d,p,m),i.dynCall_v=o=>(i.dynCall_v=R.dynCall_v)(o),i.dynCall_iidiiii=(o,d,p,m,b,T,k)=>(i.dynCall_iidiiii=R.dynCall_iidiiii)(o,d,p,m,b,T,k),i.dynCall_iiiiiiiii=(o,d,p,m,b,T,k,M,N)=>(i.dynCall_iiiiiiiii=R.dynCall_iiiiiiiii)(o,d,p,m,b,T,k,M,N),i.dynCall_iiij=(o,d,p,m)=>(i.dynCall_iiij=R.dynCall_iiij)(o,d,p,m),i.dynCall_iiiiiiiiii=(o,d,p,m,b,T,k,M,N,W)=>(i.dynCall_iiiiiiiiii=R.dynCall_iiiiiiiiii)(o,d,p,m,b,T,k,M,N,W),i.dynCall_iiiiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z,te,ue)=>(i.dynCall_iiiiiiiiiiiii=R.dynCall_iiiiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z,te,ue),i.dynCall_iiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z)=>(i.dynCall_iiiiiiiiiii=R.dynCall_iiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z),i.dynCall_ji=(o,d)=>(i.dynCall_ji=R.dynCall_ji)(o,d),i.dynCall_iijii=(o,d,p,m,b)=>(i.dynCall_iijii=R.dynCall_iijii)(o,d,p,m,b),i.dynCall_vij=(o,d,p)=>(i.dynCall_vij=R.dynCall_vij)(o,d,p),i.dynCall_viiijii=(o,d,p,m,b,T,k)=>(i.dynCall_viiijii=R.dynCall_viiijii)(o,d,p,m,b,T,k),i.dynCall_viijiiiiiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De,ot,It)=>(i.dynCall_viijiiiiiiiiiiiiii=R.dynCall_viijiiiiiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De,ot,It),i.dynCall_viiiji=(o,d,p,m,b,T)=>(i.dynCall_viiiji=R.dynCall_viiiji)(o,d,p,m,b,T),i.dynCall_fiii=(o,d,p,m)=>(i.dynCall_fiii=R.dynCall_fiii)(o,d,p,m),i.dynCall_viijii=(o,d,p,m,b,T)=>(i.dynCall_viijii=R.dynCall_viijii)(o,d,p,m,b,T),i.dynCall_viij=(o,d,p,m)=>(i.dynCall_viij=R.dynCall_viij)(o,d,p,m),i.dynCall_jiij=(o,d,p,m)=>(i.dynCall_jiij=R.dynCall_jiij)(o,d,p,m),i.dynCall_fi=(o,d)=>(i.dynCall_fi=R.dynCall_fi)(o,d),i.dynCall_fii=(o,d,p)=>(i.dynCall_fii=R.dynCall_fii)(o,d,p),i.dynCall_jii=(o,d,p)=>(i.dynCall_jii=R.dynCall_jii)(o,d,p),i.dynCall_dii=(o,d,p)=>(i.dynCall_dii=R.dynCall_dii)(o,d,p),i.dynCall_fiiii=(o,d,p,m,b)=>(i.dynCall_fiiii=R.dynCall_fiiii)(o,d,p,m,b),i.dynCall_fif=(o,d,p)=>(i.dynCall_fif=R.dynCall_fif)(o,d,p),i.dynCall_jfi=(o,d,p)=>(i.dynCall_jfi=R.dynCall_jfi)(o,d,p),i.dynCall_viiiiiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie)=>(i.dynCall_viiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie),i.dynCall_viiiiiiiiiiiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De,ot,It,ri,Dr,Xm)=>(i.dynCall_viiiiiiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De,ot,It,ri,Dr,Xm),i.dynCall_viiiiiiiiiiiiiiii=(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De,ot)=>(i.dynCall_viiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiii)(o,d,p,m,b,T,k,M,N,W,Z,te,ue,he,Ie,De,ot),i.dynCall_iif=(o,d,p)=>(i.dynCall_iif=R.dynCall_iif)(o,d,p),i.dynCall_jiiii=(o,d,p,m,b)=>(i.dynCall_jiiii=R.dynCall_jiiii)(o,d,p,m,b),i.dynCall_jiii=(o,d,p,m)=>(i.dynCall_jiii=R.dynCall_jiii)(o,d,p,m),i.dynCall_viif=(o,d,p,m)=>(i.dynCall_viif=R.dynCall_viif)(o,d,p,m),i.dynCall_viiij=(o,d,p,m,b)=>(i.dynCall_viiij=R.dynCall_viiij)(o,d,p,m,b),i.dynCall_viiiijii=(o,d,p,m,b,T,k,M)=>(i.dynCall_viiiijii=R.dynCall_viiiijii)(o,d,p,m,b,T,k,M),i.dynCall_iiiiij=(o,d,p,m,b,T)=>(i.dynCall_iiiiij=R.dynCall_iiiiij)(o,d,p,m,b,T),i.dynCall_iiiiid=(o,d,p,m,b,T)=>(i.dynCall_iiiiid=R.dynCall_iiiiid)(o,d,p,m,b,T),i.dynCall_iiiiijj=(o,d,p,m,b,T,k)=>(i.dynCall_iiiiijj=R.dynCall_iiiiijj)(o,d,p,m,b,T,k),i.dynCall_iiiiiijj=(o,d,p,m,b,T,k,M)=>(i.dynCall_iiiiiijj=R.dynCall_iiiiiijj)(o,d,p,m,b,T,k,M);var js=o=>(js=R.wb)(o),Ks=()=>(Ks=R.xb)(),Zs=o=>(Zs=R.yb)(o),Ys=()=>(Ys=R.zb)();return(function o(){if(0<Qt)Jt=o;else if(u)t(i),ki();else{for(;0<fr.length;)fr.shift()(i);0<Qt?Jt=o:(i.calledRun=!0,j||(ki(),t(i)))}})(),i.PTR_SIZE=4,a},oc=Hr,Qs=globalThis.self?.name?.startsWith("em-pthread"),Qs&&Hr()}),Fr,Ha,Js,Ne,uc,Li,eo,to,qr,io,Vr,lc,Gr,dc,fn=L(()=>{hn(),Fr=typeof location>"u"?void 0:location.origin,Ha=import.meta.url>"file:"&&import.meta.url<"file;",Js=()=>{{if(Ha){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Fr).href}return import.meta.url}},Ne=Js(),uc=()=>{if(Ne&&!Ne.startsWith("blob:"))return Ne.substring(0,Ne.lastIndexOf("/")+1)},Li=(e,t)=>{try{let r=t??Ne;return(r?new URL(e,r):new URL(e)).origin===Fr}catch{return!1}},eo=(e,t)=>{let r=t??Ne;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},to=(e,t)=>`${t??"./"}${e}`,qr=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},io=async e=>(await import(e)).default,Vr=(_g(),Si(ac)).default,lc=async()=>{if(!Ne)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Li(Ne))return[void 0,Vr()];let e=await qr(Ne);return[e,Vr(e)]},Gr=(bg(),Si(sc)).default,dc=async(e,t,r,i)=>{let a=Gr&&!(e||t);if(a)if(Ne)a=Li(Ne);else if(i&&!r)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,Gr];{let s="ort-wasm-simd-threaded.jsep.mjs",n=e??eo(s,t),u=r&&n&&!Li(n,t),l=u?await qr(n):n??to(s,t);return[u?l:void 0,await io(l)]}}}),jr,Wi,ni,Kr,ro,ao,no,mn,ye,Ht=L(()=>{fn(),Wi=!1,ni=!1,Kr=!1,ro=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},ao=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},no=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},mn=async e=>{if(Wi)return Promise.resolve();if(ni)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Kr)throw new Error("previous call to 'initializeWebAssembly()' failed.");ni=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!no())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!ao())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=ro();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,s=typeof a=="string"?a:void 0,n=a?.mjs,u=n?.href??n,l=a?.wasm,c=l?.href??l,h=e.wasmBinary,[f,g]=await dc(u,s,r>1,!!h||!!c),y=!1,_=[];if(t>0&&_.push(new Promise(w=>{setTimeout(()=>{y=!0,w()},t)})),_.push(new Promise((w,x)=>{let $={numThreads:r};if(h)$.wasmBinary=h;else if(c||s)$.locateFile=v=>c??s+v;else if(u&&u.indexOf("blob:")!==0)$.locateFile=v=>new URL(v,u).href;else if(f){let v=uc();v&&($.locateFile=S=>v+S)}g($).then(v=>{ni=!1,Wi=!0,jr=v,w(),f&&URL.revokeObjectURL(f)},v=>{ni=!1,Kr=!0,x(v)})})),await Promise.race(_),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ye=()=>{if(Wi&&jr)return jr;throw new Error("WebAssembly is not initialized yet.")}}),Ye,ar,me,gn=L(()=>{Ht(),Ye=(e,t)=>{let r=ye(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},ar=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,s])=>{let n=t?t+a:a;if(typeof s=="object")ar(s,n+".",r,i);else if(typeof s=="string"||typeof s=="number")i(n,s.toString());else if(typeof s=="boolean")i(n,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},me=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let s=Number(t.getValue(a,i===4?"i32":"i64")),n=t.getValue(a+i,"*"),u=n?t.UTF8ToString(n):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),cc,wg=L(()=>{Ht(),gn(),cc=e=>{let t=ye(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let s=0;return e?.tag!==void 0&&(s=Ye(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,s),r===0&&me("Can't create run options."),e?.extra!==void 0&&ar(e.extra,"",new WeakSet,(n,u)=>{let l=Ye(n,i),c=Ye(u,i);t._OrtAddRunConfigEntry(r,l,c)!==0&&me(`Can't set a run config entry: ${n} - ${u}.`)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(n=>t._free(n)),s}}}),so,oo,uo,si,lo,pc,vg=L(()=>{Ht(),gn(),so=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},oo=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},uo=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},si=(e,t,r,i)=>{let a=Ye(t,i),s=Ye(r,i);ye()._OrtAddSessionConfigEntry(e,a,s)!==0&&me(`Can't set a session config entry: ${t} - ${r}.`)},lo=async(e,t,r)=>{for(let i of t){let a=typeof i=="string"?i:i.name,s=[];switch(a){case"webnn":if(a="WEBNN",typeof i!="string"){let h=i?.deviceType;h&&si(e,"deviceType",h,r)}break;case"webgpu":if(a="JS",typeof i!="string"){let h=i;if(h?.preferredLayout){if(h.preferredLayout!=="NCHW"&&h.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${h.preferredLayout}`);si(e,"preferredLayout",h.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let n=Ye(a,r),u=s.length,l=0,c=0;if(u>0){l=ye()._malloc(u*ye().PTR_SIZE),r.push(l),c=ye()._malloc(u*ye().PTR_SIZE),r.push(c);for(let h=0;h<u;h++)ye().setValue(l+h*ye().PTR_SIZE,s[h][0],"*"),ye().setValue(c+h*ye().PTR_SIZE,s[h][1],"*")}await ye()._OrtAppendExecutionProvider(e,n,l,c,u)!==0&&me(`Can't append execution provider: ${a}.`)}},pc=async e=>{let t=ye(),r=0,i=[],a=e||{};uo(a);try{let s=so(a.graphOptimizationLevel??"all"),n=oo(a.executionMode??"sequential"),u=typeof a.logId=="string"?Ye(a.logId,i):0,l=a.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let c=a.logVerbosityLevel??0;if(!Number.isInteger(c)||c<0||c>4)throw new Error(`log verbosity level is not valid: ${c}`);let h=typeof a.optimizedModelFilePath=="string"?Ye(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(s,!!a.enableCpuMemArena,!!a.enableMemPattern,n,!!a.enableProfiling,0,u,l,c,h),r===0&&me("Can't create session options."),a.executionProviders&&await lo(r,a.executionProviders,i),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);si(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[f,g]of Object.entries(a.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let y=Ye(f,i);t._OrtAddFreeDimensionOverride(r,y,g)!==0&&me(`Can't set a free dimension override: ${f} - ${g}.`)}return a.extra!==void 0&&ar(a.extra,"",new WeakSet,(f,g)=>{si(r,f,g,i)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&me("Can't release session options."),i.forEach(n=>t._free(n)),s}}}),Bt,ct,Dt,pr,nr,yn,_n,Fa,ie=L(()=>{Bt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ct=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Dt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,s)=>a*s,1);return r>0?Math.ceil(i*r):void 0},pr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},nr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},yn=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",_n=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Fa=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),bn,hc=L(()=>{hn(),bn=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),s;try{s=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let l=Math.ceil(i/65536);s=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let n=0;for(;;){let{done:u,value:l}=await a.read();if(u)break;let c=l.byteLength;new Uint8Array(s,n,c).set(l),n+=c}return new Uint8Array(s,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),co,po,ho,fo,wn,mo,de,ht=L(()=>{ie(),co=["V","I","W","E","F"],po=(e,t)=>{console.log(`[${co[e]},${new Date().toISOString()}]${t}`)},wn=(e,t)=>{ho=e,fo=t},mo=(e,t)=>{let r=nr(e),i=nr(ho);r>=i&&po(r,typeof t=="function"?t():t)},de=(...e)=>{fo&&mo(...e)}}),go,Kt,A,sr,fc,mc,gc,se=L(()=>{go=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Kt=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(i===0)return t;if(a===0)return e;let s=Math.max(e.length,t.length),n=new Array(s);if(r){if(i<2||a<2)return;let u=go.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(u===void 0)return;[n[s-2],n[s-1]]=u}for(let u=r?3:1;u<=s;u++){let l=i-u<0?1:e[i-u],c=a-u<0?1:t[a-u];if(l!==c&&l>1&&c>1)return;let h=Math.max(l,c);if(l&&c)n[s-u]=Math.max(l,c);else{if(h>1)return;n[s-u]=0}}return n}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[i-a])return!1;return!0}},A=class tr{static size(t){return tr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let a=new Array(i),s=i-1;for(;s>=0;){if(t[s]%r===0){a[s]=t[s]/r;break}if(r%t[s]!==0)throw new Error("cannot convert shape");a[s]=1,r/=t[s],s--}for(s--;s>=0;s--)a[s]=t[s];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return tr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return tr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let s=r;s<i;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[s])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((a,s)=>a+r[s]+r[s+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,a)=>i===r[a])}},sr=class gi{static adjustPoolAttributes(t,r,i,a,s,n){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length;u++)if(u<s.length){if(s[u]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let u=0;u<i.length*2;u++)if(u<n.length){if(n[u]<0)throw new Error("pad should be greater than or equal to 1")}else n.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(n[u]>=i[u]||n[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,s,n,u){if(u){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)gi.adjustPadAndReturnShape(t[l+(n?1:2)],r[l],i[l],a[l],s,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,a,s,n,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return gi.computeShapeHelper(t,r,l,i,a,s,n,u),l}static computeConvOutputShape(t,r,i,a,s,n,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return gi.computeShapeHelper(!1,t,l,i,a,s,n,u),l}static computeShapeHelper(t,r,i,a,s,n,u,l){if(t)for(let c=0;c<r.length-2;c++)i.push(1);else for(let c=0;c<r.length-2;c++)i.push(gi.adjustPadAndReturnShape(r[c+2],a[c],s[c],n[c],u,c,c+r.length-2,l))}static adjustPadAndReturnShape(t,r,i,a,s,n,u,l){let c=i*(a-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return s[n]=0,s[u]=0,Math.floor((t-c)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=((t+r-1)/r-1)*r+a-t;return s[n]=Math.floor(l==="SAME_LOWER"?(h+1)/2:h/2),s[u]=h-s[n],Math.floor((t+h-a)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+s[n]+s[u]-c)/r+1)}},fc=class{static getShapeOfGemmResult(e,t,r,i,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,n,u;t?(s=e[1],n=e[0]):(s=e[0],n=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==n)throw new Error("dimension mismatch");if(s<=0||u<=0||n<=0)throw new Error("invalid shape specified");if(a&&!Kt.isValidBroadcast(a,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,n]}},mc=-34028234663852886e22,gc=34028234663852886e22}),vn,yc=L(()=>{ie(),vn=(e,t)=>new(pr(t))(e)}),Zr,qa,Yr,yo,Xr,_o,Qr,Jr,ea,bo,_c,$g=L(()=>{ie(),ht(),Zr=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),qa=(e,t)=>{if(t==="int32")return e;let r=Zr.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let a=e.byteLength/i,s=new(pr(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let n=new Int32Array(a);for(let u=0;u<a;u++){let l=s[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");n[u]=Number(l)}return new Uint8Array(n.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&s.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let n=Int32Array.from(s,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Yr=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let a=BigInt64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(i.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(i,Number);return new Uint8Array(a.buffer)}case"uint8":{if(i.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},yo=1,Xr=()=>yo++,_o=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Qr=(e,t)=>{let r=Zr.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,a)=>i*a)*r/8):0},Jr=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:a,shape:s,fallbackDataType:n}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=a,this.tensorShape=s,this.fallbackDataType=n}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Qr(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Yr(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,a)=>i===r[a])}setIsDataConverted(e){this.isDataConverted=e}},ea=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let a=this.tensorManager.getMLContext(e),s;if(!a.opSupportLimits().input.dataTypes.includes(t)){if(s=_o.get(t),!s||!a.opSupportLimits().input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Qr(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let n=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,n,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=qa(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Yr(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},bo=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=Xr();return this.tensorTrackersById.set(e,new ea(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,a){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,r,i,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),s=Xr(),n=new Jr({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(s,new ea(this,n)),this.externalTensors.add(n),s}async getCachedTensor(e,t,r,i,a,s,n){let u=this.getMLContext(e);for(let[c,h]of this.freeTensors.entries())if(h.canReuseTensor(u,t,r)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${n?`fallbackDataType: ${n},`:""} shape: ${r}`);let f=this.freeTensors.splice(c,1)[0];return f.sessionId=e,f}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${n?`fallbackDataType: ${n},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:n??t,shape:r,dimensions:r,usage:i,writable:a,readable:s});return new Jr({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:n})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},_c=(...e)=>new bo(...e)}),oi,wo,bc,xg=L(()=>{ie(),Ht(),yc(),$g(),ht(),oi=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),wo=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((a,s)=>a===i[s]&&e[a]===t[a])},bc=class{constructor(e){this.tensorManager=_c(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,wn(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>wo(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(a=>a.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,a){let s=oi.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,i,a)}async createTemporaryTensor(e,t,r){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=oi.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,i,r,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!ye().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return vn(r,t)}}registerMLTensor(e,t,r,i){let a=oi.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(e,t,a,i);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${s}}`),s}registerMLConstant(e,t,r,i,a,s,n=!1){if(!s)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=s.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let c=l.slice(t,t+r).buffer,h;switch(a.dataType){case"float32":h=new Float32Array(c);break;case"float16":h=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(c):new Uint16Array(c);break;case"int32":h=new Int32Array(c);break;case"uint32":h=new Uint32Array(c);break;case"int64":if(n){let f=qa(new Uint8Array(c),"int64");h=new Int32Array(f.buffer),a.dataType="int32"}else h=new BigInt64Array(c);break;case"uint64":h=new BigUint64Array(c);break;case"int8":h=new Int8Array(c);break;case"int4":case"uint4":case"uint8":h=new Uint8Array(c);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return de("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${n?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(a,h)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=this.mlContextBySessionId.get(e),a=oi.get(Bt(t));return typeof a>"u"?!1:r?!!i?.opSupportLimits().input.dataTypes.includes(a):!!i?.opSupportLimits().output.dataTypes.includes(a)}flush(){}}}),$n=L(()=>{}),ta,Hi,Fi,vo,$o,ia,Va,xo,wc,Cg=L(()=>{ht(),$n(),ta=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Hi=[],Fi=e=>Math.ceil(Number(e)/16)*16,vo=e=>{for(let t=0;t<Hi.length;t++){let r=Hi[t];if(e<=r)return r}return Math.ceil(e/16)*16},$o=1,ia=()=>$o++,Va=async(e,t,r,i)=>{let a=Fi(r),s=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let n=e.getCommandEncoder();e.endComputePass(),n.copyBufferToBuffer(t,0,s,0,a),e.flush(),await s.mapAsync(GPUMapMode.READ);let u=s.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{s.destroy()}},xo=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of ta)Hi.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,s=Fi(a),n=this.storageCache.get(e);if(!n)throw new Error("gpu data for uploading does not exist");if(Number(n.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${n.originalSize}, data size=${a}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(r,i,a)),u.unmap();let c=this.backend.device.createCommandEncoder();c.copyBufferToBuffer(u,0,n.gpuData.buffer,0,s),this.backend.device.queue.submit([c.finish()]),u.destroy(),de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=Fi(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=ia();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=vo(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let u=(a?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let n={id:ia(),type:0,buffer:i};return this.storageCache.set(n.id,{gpuData:n,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${n.id}`),n}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Va(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=ta.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},wc=(...e)=>new xo(...e)}),Co,fe,Ce=L(()=>{Co=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},fe=e=>new Co(e)}),Zt,qi,Ee,Oe,Q,$e,Ga,jt,xt,X,ui,B,Y,vc,xn,To,$c,oe=L(()=>{ie(),se(),Zt=64,qi=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ee=(e,t=1)=>{let r=qi(e,t);return typeof r=="string"?r:r[0]},Oe=(e,t=1)=>{let r=qi(e,t);return typeof r=="string"?r:r[1]},Q=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:A.computeStrides(r)})}),t},$e=e=>e%4===0?4:e%2===0?2:1,Ga=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,jt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,xt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,X=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,ui=(e,t,r,i,a)=>{let s=typeof r=="number",n=s?r:r.length,u=[...new Array(n).keys()],l=n<2?"u32":n<=4?`vec${n}<u32>`:`array<u32, ${n}>`,c=qi(t,a),h=typeof c=="string"?c:c[1],f=typeof c=="string"?c:c[0],g={indices:l,value:h,storage:f,tensor:t},y=U=>typeof U=="string"?U:`${U}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=s?"uniforms.":"",x=`${w}${e}_shape`,$=`${w}${e}_strides`,v="";for(let U=0;U<n-1;U++)v+=`
    let dim${U} = current / ${X($,U,n)};
    let rest${U} = current % ${X($,U,n)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;v+=`indices[${n-1}] = current;`;let S=n<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${v}
    return indices;
  }`,C=U=>(_.offsetToIndices=!0,n<2?U:`o2i_${e}(${U})`),I=[];if(n>=2)for(let U=n-1;U>=0;U--)I.push(`${X($,U,n)} * (indices[${U}])`);let z=n<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${I.join("+")};
  }`,E=U=>(_.indicesToOffset=!0,n<2?U:`i2o_${e}(${U})`),O=(...U)=>n===0?"0u":`${g.indices}(${U.map(y).join(",")})`,P=(U,H)=>n<2?`${U}`:`${X(U,H,n)}`,F=(U,H,re)=>n<2?`${U}=${re};`:`${X(U,H,n)}=${re};`,V={},G=(U,H)=>{_.broadcastedIndicesToOffset=!0;let re=`${H.name}broadcastedIndicesTo${e}Offset`;if(re in V)return`${re}(${U})`;let ce=[];for(let D=n-1;D>=0;D--){let le=H.indicesGet("outputIndices",D+H.rank-n);ce.push(`${P($,D)} * (${le} % ${P(x,D)})`)}return V[re]=`fn ${re}(outputIndices: ${H.type.indices}) -> u32 {
             return ${ce.length>0?ce.join("+"):"0u"};
           }`,`${re}(${U})`},ee=(U,H)=>(()=>{if(g.storage===g.value)return`${e}[${U}]=${H};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${H}), select(0u, 0xFFFFFFFFu, ${H} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${H}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${H}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),q=U=>(()=>{if(g.storage===g.value)return`${e}[${U}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${U}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${U}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),ae=n<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${h} {
    return ${q(`i2o_${e}(indices)`)};
  }`,J=n<2?"":(()=>{let U=u.map(re=>`d${re}: u32`).join(", "),H=u.map(re=>`d${re}`).join(", ");return`
  fn get_${e}(${U}) -> ${h} {
    return get_${e}ByIndices(${O(H)});
  }`})(),K=(...U)=>{if(U.length!==n)throw new Error(`indices length must be ${n}`);let H=U.map(y).join(",");return n===0?q("0u"):n===1?q(H[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${H})`)},ne=U=>n<2?q(U):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${U})`),j=n<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${h}) {
    ${ee(`i2o_${e}(indices)`,"value")}
  }`,ge=n<2?"":(()=>{let U=u.map(re=>`d${re}: u32`).join(", "),H=u.map(re=>`d${re}`).join(", ");return`
  fn set_${e}(${U}, value: ${h}) {
    set_${e}ByIndices(${O(H)}, value);
  }`})();return{impl:()=>{let U=[],H=!1;return _.offsetToIndices&&(U.push(S),H=!0),_.indicesToOffset&&(U.push(z),H=!0),_.broadcastedIndicesToOffset&&(Object.values(V).forEach(re=>U.push(re)),H=!0),_.set&&(U.push(ge),H=!0),_.setByIndices&&(U.push(j),H=!0),_.get&&(U.push(J),H=!0),_.getByIndices&&(U.push(ae),H=!0),!s&&H&&U.unshift(`const ${x} = ${g.indices}(${r.join(",")});`,`const ${$} = ${g.indices}(${A.computeStrides(r).join(",")});`),U.join(`
`)},type:g,offsetToIndices:C,indicesToOffset:E,broadcastedIndicesToOffset:G,indices:O,indicesGet:P,indicesSet:F,set:(...U)=>{if(U.length!==n+1)throw new Error(`indices length must be ${n}`);let H=U[n];if(typeof H!="string")throw new Error("value must be string");let re=U.slice(0,n).map(y).join(",");return n===0?ee("0u",H):n===1?ee(re[0],H):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${re}, ${H})`)},setByOffset:ee,setByIndices:(U,H)=>n<2?ee(U,H):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${H});`),get:K,getByOffset:q,getByIndices:ne,usage:i,name:e,strides:$,shape:x,rank:n}},B=(e,t,r,i=1)=>ui(e,t,r,"input",i),Y=(e,t,r,i=1)=>ui(e,t,r,"output",i),vc=(e,t,r)=>ui(e,t,r,"atomicOutput",1),xn=(e,t,r,i=1)=>ui(e,t,r,"internal",i),To=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Zt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,n=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${s}) {
    ${n}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},$c=(e,t)=>new To(e,t)}),So,ra,Io,ko,Eo,zo,We,xc,Cc,Ct=L(()=>{ie(),se(),Ce(),oe(),So=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},ra=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Io=(e,t)=>A.sortBasedOnPerm(e,ra(e.length,t)),ko=(e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let s=0;s<t;++s)a+=`a[${e[s]}]=i[${s}];`;return a+="return a;}"},Eo=(e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&i.push(t[a]);return{newShape:r,newPerm:i}},zo=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},We=(e,t)=>{let r=e.dataType,i=e.dims.length,a=ra(i,t),s=Io(e.dims,a),n=e.dims,u=s,l=i<2||zo(a,e.dims),c;if(l)return c=_=>{let w=B("input",r,n,4),x=Y("output",r,u,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(w,x)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:c};let{newShape:h,newPerm:f}=Eo(e.dims,a),g=A.areEqual(f,[2,3,1]),y=A.areEqual(f,[3,1,2]);if(h.length===2||g||y){n=g?[h[0],h[1]*h[2]]:y?[h[0]*h[1],h[2]]:h,u=[n[1],n[0]];let _=16;return c=w=>{let x=B("a",r,n.length),$=Y("output",r,u.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(x,$)}
  var<workgroup> tile : array<array<${$.type.value}, ${_+1}>, ${_}>;
  ${w.mainStart([_,_,1])}
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
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/_),y:Math.ceil(u[0]/_)},programUniforms:[{type:12,data:w},...Q(n,u)]}},getShaderSource:c}}return c=_=>{let w=B("a",r,n.length),x=Y("output",r,u.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(w,x)}

  ${ko(a,i,w,x)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...Q(n,u)]}},getShaderSource:c}},xc=(e,t)=>{So(e.inputs,t.perm),e.compute(We(e.inputs[0],t.perm))},Cc=e=>fe({perm:e.perm})}),Ao,Mo,Oo,Ro,Bo,Do,No,Po,Uo,Lo,Ve,Tc,Sc,Ic,kc,Ec,zc,Ac,Mc,Oc,Rc,Tg=L(()=>{ie(),se(),oe(),Cn(),Ct(),Ao={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Mo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Oo={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Ro={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Bo=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},Do=(e,t)=>{let r=[],i=e.length;for(let s=0;s<i;s++)t.indexOf(s)===-1&&r.push(e[s]);let a=t.map(s=>e[s]);return[r,a]},No=(e,t)=>{let r=e.length+t.length,i=[],a=0;for(let s=0;s<r;s++)t.indexOf(s)===-1?i.push(e[a++]):i.push(1);return i},Po=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Uo=(e,t)=>{let r=[];if(!Po(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},Lo=(e,t,r,i,a,s,n)=>{let u=r[0].dims,l=A.size(s),c=A.size(n),h=B("_A",r[0].dataType,u),f=Y("output",a,s),g=64;l===1&&(g=256);let y=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,_=w=>`
        ${w.registerUniform("reduceSize","u32").declareVariables(h,f)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Oo[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${h.getByOffset("offset + k")});
           bestValue = ${Ao[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Mo[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${i==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${Ro[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:l},programUniforms:[{type:12,data:c}]})}},Ve=(e,t,r,i)=>{let a=e.inputs.length===1?r:ja(e.inputs,r),s=a.axes;s.length===0&&!a.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((y,_)=>_));let n=A.normalizeAxes(s,e.inputs[0].dims.length),u=n,l=e.inputs[0],c=Uo(u,e.inputs[0].dims.length);c.length>0&&(l=e.compute(We(e.inputs[0],c),{inputs:[0],outputs:[-1]})[0],u=Bo(u.length,l.dims.length));let[h,f]=Do(l.dims,u),g=h;a.keepDims&&(g=No(h,n)),e.compute(Lo(t,a.cacheKey,[l],i,e.inputs[0].dataType,g,f),{inputs:[l]})},Tc=(e,t)=>{Ve(e,"ReduceMeanShared",t,"mean")},Sc=(e,t)=>{Ve(e,"ReduceL1Shared",t,"l1")},Ic=(e,t)=>{Ve(e,"ReduceL2Shared",t,"l2")},kc=(e,t)=>{Ve(e,"ReduceLogSumExpShared",t,"logSumExp")},Ec=(e,t)=>{Ve(e,"ReduceMaxShared",t,"max")},zc=(e,t)=>{Ve(e,"ReduceMinShared",t,"min")},Ac=(e,t)=>{Ve(e,"ReduceProdShared",t,"prod")},Mc=(e,t)=>{Ve(e,"ReduceSumShared",t,"sum")},Oc=(e,t)=>{Ve(e,"ReduceSumSquareShared",t,"sumSquare")},Rc=(e,t)=>{Ve(e,"ReduceLogSumShared",t,"logSum")}}),Ge,Wo,or,ja,je,Ho,Fo,qo,Vo,Go,jo,Ko,Zo,Yo,Xo,Ke,Bc,Dc,Nc,Pc,Uc,Lc,Wc,Hc,Fc,qc,Cn=L(()=>{ie(),se(),Ce(),oe(),Tg(),Ge=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Wo=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],or=(e,t,r,i,a,s,n=!1,u=!1)=>{let l=[],c=r[0].dims,h=c.length,f=A.normalizeAxes(a,h),g=!u&&f.length===0;c.forEach((w,x)=>{g||f.indexOf(x)>=0?n&&l.push(1):l.push(w)});let y=l.length,_=A.size(l);return{name:e,shaderCache:t,getShaderSource:w=>{let x=[],$=B("_A",r[0].dataType,h),v=Y("output",s,y),S=i($,v,f),C=S[2];for(let I=0,z=0;I<h;I++)g||f.indexOf(I)>=0?(n&&z++,C=`for(var j${I}: u32 = 0; j${I} < ${c[I]}; j${I}++) {
                  ${S[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${$.indicesSet("input_indices",I,`j${I}`)}
                  ${C}
                }`):(x.push(`${$.indicesSet("input_indices",I,v.indicesGet("output_indices",z))};`),z++);return`

        ${w.registerUniform("output_size","u32").declareVariables($,v)}

        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${$.type.indices};
          let output_indices = ${v.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${S[0]}       // init ops for reduce max/min
          ${S[1]}
          ${C}
          ${S[3]}
          ${S.length===4?v.setByOffset("global_idx","value"):S.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:s}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...Q(c,l)]})}},ja=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),fe({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},je=(e,t,r,i)=>{let a=e.inputs,s=a.length===1?r:ja(a,r);e.compute(or(t,{hint:s.cacheKey,inputDependencies:["rank"]},[a[0]],s.noopWithEmptyAxes&&s.axes.length===0?Wo:i,s.axes,a[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},Ho=(e,t)=>{Ge(e.inputs),je(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},Fo=(e,t)=>{Ge(e.inputs),je(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},qo=(e,t)=>{Ge(e.inputs),je(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Vo=(e,t)=>{Ge(e.inputs),je(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},Go=(e,t)=>{Ge(e.inputs),je(e,"ReduceMax",t,(r,i,a)=>{let s=[];for(let n=0;n<r.rank;n++)(a.indexOf(n)>=0||a.length===0)&&s.push(r.indicesSet("input_indices",n,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},jo=(e,t)=>{Ge(e.inputs),je(e,"ReduceMean",t,(r,i,a)=>{let s=1;for(let n=0;n<r.rank;n++)(a.indexOf(n)>=0||a.length===0)&&(s*=e.inputs[0].dims[n]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${s});`]})},Ko=(e,t)=>{Ge(e.inputs),je(e,"ReduceMin",t,(r,i,a)=>{let s=[];for(let n=0;n<r.rank;n++)(a.indexOf(n)>=0||a.length===0)&&s.push(`input_indices[${n}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Zo=(e,t)=>{Ge(e.inputs),je(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Yo=(e,t)=>{Ge(e.inputs),je(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},Xo=(e,t)=>{Ge(e.inputs),je(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Ke=(e,t,r)=>{if(t.length===0)return r;let i=1,a=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?i*=e[s]:a*=e[s];return a<32&&i>1024},Bc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?jo(e,t):Tc(e,t)},Dc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Fo(e,t):Sc(e,t)},Nc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?qo(e,t):Ic(e,t)},Pc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Vo(e,t):kc(e,t)},Uc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Go(e,t):Ec(e,t)},Lc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ko(e,t):zc(e,t)},Wc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zo(e,t):Ac(e,t)},Hc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yo(e,t):Mc(e,t)},Fc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xo(e,t):Oc(e,t)},qc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ho(e,t):Rc(e,t)}}),aa,Vc,Gc,Ka,Sg=L(()=>{ie(),Ce(),Cn(),aa=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Vc=(e,t)=>{aa(e.inputs);let r=(i,a,s)=>{let n=[];for(let u=0;u<i.rank;u++)(s.indexOf(u)>=0||s.length===0)&&n.push(`input_indices[${u}] = 0;`);return[`${n.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(or("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Gc=(e,t)=>{aa(e.inputs);let r=(i,a,s)=>{let n=[];for(let u=0;u<i.rank;u++)(s.indexOf(u)>=0||s.length===0)&&n.push(`input_indices[${u}] = 0;`);return[`${n.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(or("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ka=e=>fe(e)}),Qo,Vi,Jo,eu,tu,Ii,iu,jc,Tn=L(()=>{ie(),se(),$n(),oe(),Qo=(e,t)=>{let r=e[0],i=e[1],a=e[2],s=e[3],n=e[4],u=e[5];if(n&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],c=r.dims[1],h=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==h)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=a.dims[0]/3,g=f,y=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let _=c;if(f!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==f+g+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(n){if(g!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(n.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(n.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(n.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(n.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(n.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=n.dims[3])}let x=_+w,$=-1,v=0;if(s)throw new Error("Mask not supported");if(n)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==c||u.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:c,pastSequenceLength:w,kvSequenceLength:_,totalSequenceLength:x,maxSequenceLength:$,inputHiddenSize:h,hiddenSize:f,vHiddenSize:y,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Vi=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Jo=(e,t,r,i,a,s,n,u)=>{let l=$e(n?1:s),c=64,h=s/l;h<c&&(c=32);let f=Math.ceil(s/l/c),g=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:h},{type:12,data:f}],y=Ee(e.dataType,l),_=Oe(1,l),w=["type"];n&&w.push("type"),u&&w.push("type");let x=$=>{let v=Y("x",e.dataType,e.dims,l),S=[v],C=n?B("seq_lens",n.dataType,n.dims):void 0;C&&S.push(C);let I=u?B("total_sequence_length_input",u.dataType,u.dims):void 0;I&&S.push(I);let z=Oe(e.dataType),E=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${c}>;
  var<workgroup> thread_sum: array<f32, ${c}>;
  ${$.registerUniforms(E).declareVariables(...S)}
  ${$.mainStart([c,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Vi(C,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${c}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${n?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${_}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${c}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${c}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${v.type.value}(${z}(1.0) / ${z}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${n?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${z}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${c};${y};${l}`,inputDependencies:w},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:g})}},eu=(e,t,r,i,a,s,n,u,l)=>{let c=n+s.kvSequenceLength,h=[s.batchSize,s.numHeads,s.sequenceLength,c],f=e>1&&i,g=s.kvNumHeads?s.kvNumHeads:s.numHeads,y=f?[s.batchSize,g,c,s.headSize]:void 0,_=s.nReps?s.nReps:1,w=s.scale===0?1/Math.sqrt(s.headSize):s.scale,x=$e(s.headSize),$=s.headSize/x,v=12,S={x:Math.ceil(c/v),y:Math.ceil(s.sequenceLength/v),z:s.batchSize*s.numHeads},C=[{type:12,data:s.sequenceLength},{type:12,data:$},{type:12,data:c},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:w},{type:12,data:n},{type:12,data:s.kvSequenceLength},{type:12,data:_}],I=f&&i&&A.size(i.dims)>0,z=["type","type"];I&&z.push("type"),a&&z.push("type"),u&&z.push("type"),l&&z.push("type");let E=[{dims:h,dataType:t.dataType,gpuDataType:0}];f&&E.push({dims:y,dataType:t.dataType,gpuDataType:0});let O=P=>{let F=B("q",t.dataType,t.dims,x),V=B("key",r.dataType,r.dims,x),G=[F,V];if(I){let j=B("past_key",i.dataType,i.dims,x);G.push(j)}a&&G.push(B("attention_bias",a.dataType,a.dims));let ee=u?B("seq_lens",u.dataType,u.dims):void 0;ee&&G.push(ee);let q=l?B("total_sequence_length_input",l.dataType,l.dims):void 0;q&&G.push(q);let ae=Y("output",t.dataType,h),J=[ae];f&&J.push(Y("present_key",t.dataType,y,x));let K=Oe(1,x),ne=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${F.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${F.type.storage}, ${v*v}>;
  ${P.registerUniforms(ne).declareVariables(...G,...J)}
  ${P.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Vi(ee,q,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${I&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${K}(0);
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
          value += ${K}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${ae.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${a!==void 0};${i!==void 0};${e}`,inputDependencies:z},getRunData:()=>({outputs:E,dispatchGroup:S,programUniforms:C}),getShaderSource:O}},tu=(e,t,r,i,a,s,n=void 0,u=void 0)=>{let l=s+a.kvSequenceLength,c=a.nReps?a.nReps:1,h=a.vHiddenSize*c,f=e>1&&i,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,y=f?[a.batchSize,g,l,a.headSize]:void 0,_=[a.batchSize,a.sequenceLength,h],w=12,x={x:Math.ceil(a.vHeadSize/w),y:Math.ceil(a.sequenceLength/w),z:a.batchSize*a.numHeads},$=[{type:12,data:a.sequenceLength},{type:12,data:l},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:h},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:c}],v=f&&i&&A.size(i.dims)>0,S=["type","type"];v&&S.push("type"),n&&S.push("type"),u&&S.push("type");let C=[{dims:_,dataType:t.dataType,gpuDataType:0}];f&&C.push({dims:y,dataType:t.dataType,gpuDataType:0});let I=z=>{let E=B("probs",t.dataType,t.dims),O=B("v",r.dataType,r.dims),P=[E,O];v&&P.push(B("past_value",i.dataType,i.dims));let F=n?B("seq_lens",n.dataType,n.dims):void 0;n&&P.push(F);let V=u?B("total_sequence_length_input",u.dataType,u.dims):void 0;u&&P.push(V);let G=[Y("output",t.dataType,_)];f&&G.push(Y("present_value",t.dataType,y));let ee=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${E.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${E.type.value}, ${w*w}>;
  ${z.registerUniforms(ee).declareVariables(...P,...G)}
  ${z.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${c===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${c===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Vi(F,V,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${E.type.storage}(0);
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:C,dispatchGroup:x,programUniforms:$}),getShaderSource:I}},Ii=(e,t,r,i,a,s,n,u,l,c,h=void 0,f=void 0)=>{let g=Math.min(e.outputCount,1+(n?1:0)+(u?1:0)),y=g>1?c.pastSequenceLength:0,_=y+c.kvSequenceLength,w=l&&A.size(l.dims)>0?l:void 0,x=[t,r];g>1&&n&&A.size(n.dims)>0&&x.push(n),w&&x.push(w),h&&x.push(h),f&&x.push(f);let $=e.compute(eu(g,t,r,n,w,c,y,h,f),{inputs:x,outputs:g>1?[-1,1]:[-1]})[0];e.compute(Jo($,c.batchSize,c.numHeads,y,c.sequenceLength,_,h,f),{inputs:h&&f?[$,h,f]:[$],outputs:[]});let v=[$,i];g>1&&u&&A.size(u.dims)>0&&v.push(u),h&&v.push(h),f&&v.push(f),e.compute(tu(g,$,i,u,c,y,h,f),{inputs:v,outputs:g>1?[0,2]:[0]})},iu=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,a=t.inputHiddenSize,s=t.headSize,n=12,u={x:Math.ceil(t.headSize/n),y:Math.ceil(t.sequenceLength/n),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],c=[{type:12,data:i},{type:12,data:a},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],h=f=>{let g=Y("output_q",l[0].dataType,r),y=Y("output_k",l[0].dataType,r),_=Y("output_v",l[0].dataType,r),w=B("input",l[0].dataType,l[0].dims),x=B("weight",l[1].dataType,l[1].dims),$=B("bias",l[2].dataType,l[2].dims),v=w.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${n}u;
  var<workgroup> tileInput: array<${v}, ${n*n}>;
  var<workgroup> tileWeightQ: array<${v}, ${n*n}>;
  var<workgroup> tileWeightK: array<${v}, ${n*n}>;
  var<workgroup> tileWeightV: array<${v}, ${n*n}>;
  ${f.registerUniforms(S).declareVariables(w,x,$,g,y,_)}
  ${f.mainStart([n,n,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:c}),getShaderSource:h},{inputs:l,outputs:[-1,-1,-1]})},jc=(e,t)=>{let r=Qo(e.inputs,t),[i,a,s]=iu(e,r);return Ii(e,i,a,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),ru,au,nu,Kc,Ig=L(()=>{qe(),ie(),se(),Ce(),oe(),ru=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,a,s)=>{let n=a.length;if(n!==i.length)throw new Error(`${s}: num dimensions != ${n}`);a.forEach((u,l)=>{if(u!==i[l])throw new Error(`${s}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},au=(e,t)=>{let{epsilon:r,spatial:i,format:a}=t,s=e[0].dims,n=i?$e(s[s.length-1]):1,u=a==="NHWC"&&s.length>1?n:1,l=A.size(s)/n,c=i,h=c?s.length:s,f=B("x",e[0].dataType,e[0].dims,n),g=B("scale",e[1].dataType,e[1].dims,u),y=B("bias",e[2].dataType,e[2].dims,u),_=B("inputMean",e[3].dataType,e[3].dims,u),w=B("inputVar",e[4].dataType,e[4].dims,u),x=Y("y",e[0].dataType,h,n),$=()=>{let S="";if(i)S=`let cOffset = ${s.length===1?"0u":a==="NHWC"?`outputIndices[${s.length-1}] / ${n}`:"outputIndices[1]"};`;else if(a==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let C=1;C<g.rank;C++)S+=`cIndices[${C}] = outputIndices[${C}];`;S+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return S},v=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(f,g,y,_,w,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${n}`)};
    ${$()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${n}`,inputDependencies:c?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c?[{type:12,data:l},...Q(s)]:[{type:12,data:l}]})}},nu=e=>fe(e),Kc=(e,t)=>{let{inputs:r,outputCount:i}=e,a=nu({...t,outputCount:i});if(_e.webgpu.validateInputContent&&ru(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(au(r,a))}}),su,ou,Zc,kg=L(()=>{se(),oe(),su=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},ou=e=>{let t=e[0].dims,r=e[0].dims[2],i=A.size(t)/4,a=e[0].dataType,s=B("input",a,t,4),n=B("bias",a,[r],4),u=B("residual",a,t,4),l=Y("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:c=>`
  const channels = ${r}u / 4;
  ${c.declareVariables(s,n,u,l)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${s.getByOffset("global_idx")}
      + ${n.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Zc=e=>{su(e.inputs),e.compute(ou(e.inputs))}}),uu,pe,Yc,Xc,Qc,Jc,ep,tp,ip,rp,ap,lu,np,sp,op,up,yi,lp,ir,dp,cp,pp,hp,fp,mp,gp,yp,_p,bp,wp,vp,$p,xp,Cp,Tp,na,Sp,Za,Ya,Ip,kp,Ep,du,cu,zp,Sn=L(()=>{ie(),se(),Ce(),oe(),uu=(e,t,r,i,a,s,n)=>{let u=Math.ceil(t/4),l="";typeof a=="string"?l=`${a}(a)`:l=a("a");let c=B("inputData",r,[u],4),h=Y("outputData",i,[u],4),f=[{name:"vec_size",type:"u32"}];return n&&f.push(...n),`
      ${e.registerUniforms(f).declareVariables(c,h)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${c.getByOffset("global_idx")};
    ${h.setByOffset("global_idx",l)}
  }`},pe=(e,t,r,i,a,s=e.dataType,n,u)=>{let l=[{type:12,data:Math.ceil(A.size(e.dims)/4)}];return n&&l.push(...n),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:c=>uu(c,A.size(e.dims),e.dataType,s,r,i,u),getRunData:c=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(A.size(c[0].dims)/64/4)},programUniforms:l})}},Yc=e=>{e.compute(pe(e.inputs[0],"Abs","abs"))},Xc=e=>{e.compute(pe(e.inputs[0],"Acos","acos"))},Qc=e=>{e.compute(pe(e.inputs[0],"Acosh","acosh"))},Jc=e=>{e.compute(pe(e.inputs[0],"Asin","asin"))},ep=e=>{e.compute(pe(e.inputs[0],"Asinh","asinh"))},tp=e=>{e.compute(pe(e.inputs[0],"Atan","atan"))},ip=e=>{e.compute(pe(e.inputs[0],"Atanh","atanh"))},rp=e=>fe(e),ap=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(pe(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},lu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return fe({min:t,max:r})},np=(e,t)=>{let r=t||lu(e.inputs),i=Oe(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},sp=e=>{e.compute(pe(e.inputs[0],"Ceil","ceil"))},op=e=>{e.compute(pe(e.inputs[0],"Cos","cos"))},up=e=>{e.compute(pe(e.inputs[0],"Cosh","cosh"))},yi=e=>fe(e),lp=(e,t)=>{let r=Oe(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},ir=(e="f32")=>`
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
}`,dp=e=>{let t=Oe(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,ir(t)))},cp=e=>{e.compute(pe(e.inputs[0],"Exp","exp"))},pp=e=>{e.compute(pe(e.inputs[0],"Floor","floor"))},hp=e=>{let t=Oe(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,ir(t)))},fp=(e,t)=>{let r=Oe(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},mp=e=>{e.compute(pe(e.inputs[0],"Not",t=>`!${t}`))},gp=e=>{e.compute(pe(e.inputs[0],"Neg",t=>`-${t}`))},yp=e=>{e.compute(pe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},_p=e=>{let t=Oe(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},bp=e=>{e.compute(pe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},wp=e=>fe(e),vp=(e,t)=>{let r=Oe(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},$p=e=>{e.compute(pe(e.inputs[0],"Sin","sin"))},xp=e=>{e.compute(pe(e.inputs[0],"Sinh","sinh"))},Cp=e=>{e.compute(pe(e.inputs[0],"Sqrt","sqrt"))},Tp=e=>{e.compute(pe(e.inputs[0],"Tan","tan"))},na=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Sp=e=>{e.compute(pe(e.inputs[0],"Tanh",na))},Za=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${na("v")};
}
`,Ya=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Ip=e=>{let t=Oe(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"FastGelu",Ya,Za(t),void 0,e.inputs[0].dataType))},kp=(e,t)=>{let r=Oe(e.inputs[0].dataType);return e.compute(pe(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Ep=e=>{e.compute(pe(e.inputs[0],"Log","log"))},du=(e,t)=>`
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
`,cu=e=>`quick_gelu_impl(${e})`,zp=(e,t)=>{let r=Oe(e.inputs[0].dataType);e.compute(pe(e.inputs[0],"QuickGelu",cu,du(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),pu,hu,Ap,Eg=L(()=>{se(),oe(),Sn(),pu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},hu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=B("input",e[0].dataType,e[0].dims,4),i=B("bias",e[0].dataType,[e[0].dims[2]],4),a=Y("output",e[0].dataType,t,4),s=A.size(t)/4,n=Ee(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,a)}

  ${ir(n)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ap=e=>{pu(e.inputs),e.compute(hu(e.inputs))}}),fu,mu,Ze,Mp,Op,Rp,Bp,Dp,Np,Pp,Up,Lp,Wp,zg=L(()=>{ie(),se(),oe(),fu=(e,t,r,i,a,s,n,u,l,c,h,f)=>{let g,y;typeof u=="string"?g=y=(v,S)=>`${u}((${v}),(${S}))`:typeof u=="function"?g=y=u:(g=u.scalar,y=u.vector);let _=Y("outputData",h,i.length,4),w=B("aData",l,t.length,4),x=B("bData",c,r.length,4),$;if(a)if(s){let v=A.size(t)===1,S=A.size(r)===1,C=t.length>0&&t[t.length-1]%4===0,I=r.length>0&&r[r.length-1]%4===0;v||S?$=_.setByOffset("global_idx",y(v?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):$=`
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",_)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",_)};
            ${_.setByOffset("global_idx",y(n||C?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,n||I?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=_.setByOffset("global_idx",y(w.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(S,C,I="")=>{let z=`aData[indexA${C}][componentA${C}]`,E=`bData[indexB${C}][componentB${C}]`;return`
            let outputIndices${C} = ${_.offsetToIndices(`global_idx * 4u + ${C}u`)};
            let offsetA${C} = ${w.broadcastedIndicesToOffset(`outputIndices${C}`,_)};
            let offsetB${C} = ${x.broadcastedIndicesToOffset(`outputIndices${C}`,_)};
            let indexA${C} = offsetA${C} / 4u;
            let indexB${C} = offsetB${C} / 4u;
            let componentA${C} = offsetA${C} % 4u;
            let componentB${C} = offsetB${C} % 4u;
            ${S}[${C}] = ${I}(${g(z,E)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(w,x,_)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},mu=(e,t,r,i,a,s,n=r.dataType)=>{let u=r.dims.map(w=>Number(w)??1),l=i.dims.map(w=>Number(w)??1),c=!A.areEqual(u,l),h=u,f=A.size(u),g=!1,y=!1,_=[c];if(c){let w=Kt.calcShape(u,l,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");h=w.slice(),f=A.size(h);let x=A.size(u)===1,$=A.size(l)===1,v=u.length>0&&u[u.length-1]%4===0,S=l.length>0&&l[l.length-1]%4===0;_.push(x),_.push($),_.push(v),_.push(S);let C=1;for(let I=1;I<h.length;I++){let z=u[u.length-I],E=l[l.length-I];if(z===E)C*=z;else break}C%4===0?(y=!0,g=!0):(x||$||v||S)&&(g=!0)}else g=!0;return _.push(g),{name:e,shaderCache:{hint:t+_.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>fu(w,u,l,h,g,c,y,a,r.dataType,i.dataType,n,s),getRunData:()=>({outputs:[{dims:h,dataType:n}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(A.size(h)/4)},...Q(u,l,h)]})}},Ze=(e,t,r,i,a,s)=>{e.compute(mu(t,a??"",e.inputs[0],e.inputs[1],r,i,s))},Mp=e=>{Ze(e,"Add",(t,r)=>`${t}+${r}`)},Op=e=>{Ze(e,"Div",(t,r)=>`${t}/${r}`)},Rp=e=>{Ze(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Bp=e=>{Ze(e,"Mul",(t,r)=>`${t}*${r}`)},Dp=e=>{let t=B("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ze(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
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
      `)},Np=e=>{Ze(e,"Sub",(t,r)=>`${t}-${r}`)},Pp=e=>{Ze(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Up=e=>{Ze(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Lp=e=>{Ze(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Wp=e=>{Ze(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),gu,yu,_u,bu,Hp,Fp,Ag=L(()=>{ie(),se(),Ce(),oe(),gu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],a=i.dataType,s=i.dims.length;e.forEach((n,u)=>{if(u!==r){if(n.dataType!==a)throw new Error("input tensors should be one type");if(n.dims.length!==s)throw new Error("input tensors should have the same shape");n.dims.forEach((l,c)=>{if(c!==t&&l!==i.dims[c])throw new Error("non concat dimensions must match")})}})},yu=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,_u=(e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let s=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?i.push(s):a===0?i.push(`if (inputIndex == ${a}u) { ${s} }`):a===r-1?i.push(`else { ${s} }`):i.push(`else if (inputIndex == ${a}) { ${s} }`)}return i.join(`
`)},bu=(e,t,r,i)=>{let a=A.size(r),s=new Array(e.length),n=new Array(e.length),u=0,l=[],c=[],h=[{type:12,data:a}];for(let w=0;w<e.length;++w)u+=e[w].dims[t],s[w]=u,c.push(e[w].dims.length),n[w]=B(`input${w}`,i,c[w]),l.push("rank"),h.push({type:12,data:s[w]});for(let w=0;w<e.length;++w)h.push(...Q(e[w].dims));h.push(...Q(r));let f=Y("output",i,r.length),g=f.indicesGet("indices",t),y=Array.from(Array(s.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),_=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)w.registerUniform(`sizeInConcatAxis${x}`,"u32");return w.declareVariables(...n,f)})()}

  ${yu(s.length,y)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${y});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${_u(n,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:h}),getShaderSource:_}},Hp=(e,t)=>{let r=e.inputs,i=r[0].dims,a=A.normalizeAxis(t.axis,i.length);gu(r,a);let s=i.slice();s[a]=r.reduce((u,l)=>u+(l.dims.length>a?l.dims[a]:0),0);let n=r.filter(u=>A.size(u.dims)>0);e.compute(bu(n,a,s,r[0].dataType),{inputs:n})},Fp=e=>fe({axis:e.axis})}),Ut,Lt,Wt,In,Ft=L(()=>{ie(),se(),Ut=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Lt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Wt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},In=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[mc,gc];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Ae,qp,kn=L(()=>{Ae=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},qp=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Vp,Mg=L(()=>{Vp=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),$i,En,zn=L(()=>{ie(),se(),oe(),Ft(),$i=(e,t,r,i,a)=>{let s=i-r;return`
      ${Array.from({length:r}).map((n,u)=>`
      if (${X(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,X(a,u+s,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},En=(e,t,r,i,a=!1,s)=>{let n=e[0].dims,u=e[1].dims,l=n[n.length-2],c=u[u.length-1],h=n[n.length-1],f=$e(c),g=$e(h),y=$e(l),_=A.size(r)/f/y,w=e.length>2,x=i?i.slice(0,-2):r.slice(0,-2),$=[A.size(x),l,c],v=[{type:12,data:_},{type:12,data:l},{type:12,data:c},{type:12,data:h}];Lt(t,v),v.push(...Q(x,n,u)),w&&v.push(...Q(e[2].dims)),v.push(...Q($));let S=C=>{let I=xn("batch_dims",e[0].dataType,x.length),z=B("a",e[0].dataType,n.length,g),E=B("b",e[1].dataType,u.length,f),O=Y("output",e[0].dataType,$.length,f),P=Ee(O.type.tensor),F=Ut(t,O.type.value,P),V=[z,E],G="";if(w){let ae=a?f:1;V.push(B("bias",e[2].dataType,e[2].dims.length,ae)),G=`${a?`value += bias[col / ${ae}];`:`value += ${O.type.value}(bias[row + i]);`}`}let ee=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Wt(t,ee);let q=()=>{let ae=`var a_data: ${z.type.value};`;for(let J=0;J<g;J++)ae+=`
              let b_data${J} = b[(b_offset + (k + ${J}) * uniforms.N + col) / ${f}];`;for(let J=0;J<y;J++){ae+=`a_data = a[(a_offset + (row + ${J}) * uniforms.K + k) / ${g}];`;for(let K=0;K<g;K++)ae+=`
            values[${J}] = fma(${E.type.value}(a_data${g===1?"":`[${K}]`}), b_data${K}, values[${J}]);
`}return ae};return`
  ${C.registerUniforms(ee).registerInternalVariables(I).declareVariables(...V,O)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${z.type.indices};
    ${$i("a_indices",z,z.rank-2,I.rank,"batch_indices")}
    ${z.indicesSet("a_indices",z.rank-2,0)}
    ${z.indicesSet("a_indices",z.rank-1,0)}
    let a_offset = ${z.indicesToOffset("a_indices")};

    var b_indices: ${E.type.indices};
    ${$i("b_indices",E,E.rank-2,I.rank,"batch_indices")}
    ${E.indicesSet("b_indices",E.rank-2,0)}
    ${E.indicesSet("b_indices",E.rank-1,0)}
    let b_offset = ${E.indicesToOffset("b_indices")};
    var values: array<${O.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${q()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${G}
      ${F}
      let cur_indices = ${O.type.indices}(batch, row + i, col);
      let offset = ${O.indicesToOffset("cur_indices")};
      ${O.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${g};${y};${a}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:v}),getShaderSource:S}}}),wu,vu,Xa,sa,$u,Qa,xu,ur,An=L(()=>{ie(),se(),oe(),Ft(),zn(),kn(),wu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,vu=(e,t)=>e?`
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
        }`,Xa=(e,t,r="f32",i,a=!1,s=32,n=!1,u=32)=>{let l=t[1]*e[1],c=t[0]*e[0],h=a?l:s,f=a?s:l,g=h/t[0],y=s/t[1];if(!((a&&g===4&&e[1]===4||!a&&(g===3||g===4))&&h%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${h/g}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${c/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${n?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${n?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${n?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${wu(a,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${vu(a,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},sa=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,$u=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Qa=(e,t,r="f32",i,a=!1,s=32,n=!1,u=32,l=!1)=>{let c=e[1]*t[1],h=e[0]*t[0],f=a?c:s,g=a?s:c;if(!(g%t[1]===0&&f%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let y=g/t[1],_=f/t[0],w=s/t[1],x=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${c};
    let globalColStart = i32(workgroupId.x) * ${h};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${sa(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
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
let globalRowStart = i32(workgroupId.y) * ${c};

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${w};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${sa(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${$u(a)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${h}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${n?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${n?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${n?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${x}
  }
`},xu=(e,t,r,i,a=!1)=>{let[s,n,u,l]=i,c=Ee(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Ae(e,c)} {
      var value = ${Ae(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${n.type.indices};
        ${$i("aIndices",n,n.rank-2,s.rank,"batchIndices")}
        ${n.indicesSet("aIndices",n.rank-2,"u32(row)")}
        ${n.indicesSet("aIndices",n.rank-1,"u32(colIn)")}
        value = ${n.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Ae(e,c)} {
      var value = ${Ae(e,c)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${$i("bIndices",u,u.rank-2,s.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ae(e,c)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${Ae(e,c)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},ur=(e,t,r,i,a=!1,s)=>{let n=e[0].dims,u=e[1].dims,l=n.slice(0,-2),c=u.slice(0,-2),h=i?i.slice(0,-2):r.slice(0,-2),f=A.size(h),g=n[n.length-2],y=n[n.length-1],_=u[u.length-1],w=y%4===0&&_%4===0,x=g<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(_/$[0]/x[0]),Math.ceil(g/$[1]/x[1]),Math.ceil(f/$[2]/x[2])],S=w?4:1,C=[...l,g,y/S],I=C.length,z=[...c,y,_/S],E=z.length,O=[f,g,_/S],P=[{type:6,data:g},{type:6,data:_},{type:6,data:y}];Lt(t,P),P.push(...Q(h,C,z));let F=["rank","rank"],V=e.length>2;V&&(P.push(...Q(e[2].dims)),F.push("rank")),P.push(...Q(O));let G=ee=>{let q=h.length,ae=xn("batchDims",e[0].dataType,q,1),J=Ee(e[0].dataType),K=B("a",e[0].dataType,I,S),ne=B("b",e[1].dataType,E,S),j=Y("result",e[0].dataType,O.length,S),ge=[K,ne];if(V){let D=a?S:1;ge.push(B("bias",e[2].dataType,e[2].dims.length,D))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Wt(t,U);let H=Ee(j.type.tensor),re=Ut(t,j.type.value,H),ce=xu(S,V,re,[ae,K,ne,j],a);return`
  ${ee.registerUniforms(U).registerInternalVariables(ae).declareVariables(...ge,j)}
  ${ce}
  ${w?Xa(x,$,J,ae):Qa(x,$,J,ae)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${w};${a}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:P}),getShaderSource:G}}}),Cu,Gp,Og=L(()=>{ie(),ht(),oe(),Ft(),kn(),Mg(),An(),Cu=(e,t,r,i,a=!1,s,n=4,u=4,l=4,c="f32")=>{let h=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${c}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},f=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},g=e?`
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
    `,_=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",w=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",$=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Ae(n,c)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${w}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${h(n)}
    }
    return resData;`,S=e?t&&i?`
    let col = colIn * ${n};
    ${v}`:`
    let col = colIn * ${n};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Ae(n,c)}(0.0);`:i&&r?`
    let col = colIn * ${n};
    ${v}`:`
    let col = colIn * ${n};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Ae(n,c)}(0.0);`,C=e?i&&r?f(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(u)}
    }
    return ${Ae(u,c)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(u)}
    }
    return ${Ae(u,c)}(0.0);`,I=Ae(l,c),z=Ae(e?n:u,c),E=Ae(e?u:n,c),O=Ut(s,I,c);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?S:C}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${e?C:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${qp(a)}
      ${O}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Gp=(e,t,r,i,a,s,n,u,l)=>{let c=t.format==="NHWC",h=c?e[0].dims[3]:e[0].dims[1],f=r[0],g=c?r[2]:r[3],y=c?r[1]:r[2],_=c?r[3]:r[1],w=c&&(h%4===0||h%3===0)&&_%4===0,x=c?_:g*y,$=c?g*y:_,v=[8,8,1],S=i<=8?[4,1,1]:[4,4,1],C=[Math.ceil(x/v[0]/S[0]),Math.ceil($/v[1]/S[1]),Math.ceil(f/v[2]/S[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${C}`);let I=w?c&&h%4!==0?3:4:1,z=v[1]*S[1],E=v[0]*S[0],O=Math.max(v[0]*I,v[1]),P=i%z===0,F=a%E===0,V=s%O===0,G=w?[I,4,4]:[1,1,1],ee=[{type:6,data:i},{type:6,data:a},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Lt(t,ee),ee.push(...Q(e[0].dims,e[1].dims));let q=["rank","rank"];n&&(ee.push(...Q(e[2].dims)),q.push("rank")),ee.push(...Q(r));let ae=J=>{let K=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Wt(t,K);let ne=w?4:1,j=Ee(e[0].dataType),ge=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${j}>`:j}) {
        result[flatIndex] = ${w?`vec4<${j}>`:j}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${j}>`:j}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,U=B("x",e[0].dataType,e[0].dims.length,I===3?1:I),H=B("w",e[1].dataType,e[1].dims.length,ne),re=[U,H],ce=Y("result",e[0].dataType,r.length,ne);if(n){let D=B("bias",e[2].dataType,e[2].dims.length,ne);re.push(D),ge+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${j}>`:j} {
          return bias[coords.${c?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${Vp("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${J.registerUniforms(K).declareVariables(...re,ce)}
        ${ge}
        ${Cu(c,P,F,V,n,t,G[0],G[1],G[2],j)}
        ${w?Xa(S,v,j,void 0,!c,O):Qa(S,v,j,void 0,!c,O,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${w};${P};${F};${V};${z};${E};${O}`,inputDependencies:q},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:C[0],y:C[1],z:C[2]},programUniforms:ee}),getShaderSource:ae}}}),Tu,oa,li,Su,ua,Iu,jp,Kp,Rg=L(()=>{ie(),ht(),se(),oe(),Ft(),kn(),Tu=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},oa=e=>typeof e=="number"?[e,e,e]:e,li=(e,t)=>t<=1?e:e+(e-1)*(t-1),Su=(e,t,r,i=1)=>{let a=li(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)},ua=(e,t,r,i,a)=>{a==null&&(a=Su(e,t[0],i[0]));let s=[0,0,0,r];for(let n=0;n<3;n++)e[n]+2*a>=t[n]&&(s[n]=Math.trunc((e[n]-t[n]+2*a)/i[n]+1));return s},Iu=(e,t,r,i,a,s,n,u,l,c)=>{let h,f,g,y;if(e==="VALID"&&(e=0),typeof e=="number"){h={top:e,bottom:e,left:e,right:e,front:e,back:e};let _=ua([t,r,i,1],[u,l,c],1,[a,s,n],e);f=_[0],g=_[1],y=_[2]}else if(Array.isArray(e)){if(!e.every((w,x,$)=>w===$[0]))throw Error(`Unsupported padding parameter: ${e}`);h={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let _=ua([t,r,i,1],[u,l,c],1,[a,s,n],e[0]);f=_[0],g=_[1],y=_[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/a),g=Math.ceil(r/s),y=Math.ceil(i/n);let _=(f-1)*a+u-t,w=(g-1)*s+l-r,x=(y-1)*n+c-i,$=Math.floor(_/2),v=_-$,S=Math.floor(w/2),C=w-S,I=Math.floor(x/2),z=x-I;h={top:S,bottom:C,left:I,right:z,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:h,outDepth:f,outHeight:g,outWidth:y}},jp=(e,t,r,i,a,s=!1,n="channelsLast")=>{let u,l,c,h,f;if(n==="channelsLast")[u,l,c,h,f]=e;else if(n==="channelsFirst")[u,f,l,c,h]=e;else throw new Error(`Unknown dataFormat ${n}`);let[g,,y,_,w]=t,[x,$,v]=oa(r),[S,C,I]=oa(i),z=li(y,S),E=li(_,C),O=li(w,I),{padInfo:P,outDepth:F,outHeight:V,outWidth:G}=Iu(a,l,c,h,x,$,v,z,E,O),ee=s?g*f:g,q=[0,0,0,0,0];return n==="channelsFirst"?q=[u,ee,F,V,G]:n==="channelsLast"&&(q=[u,F,V,G,ee]),{batchSize:u,dataFormat:n,inDepth:l,inHeight:c,inWidth:h,inChannels:f,outDepth:F,outHeight:V,outWidth:G,outChannels:ee,padInfo:P,strideDepth:x,strideHeight:$,strideWidth:v,filterDepth:y,filterHeight:_,filterWidth:w,effectiveFilterDepth:z,effectiveFilterHeight:E,effectiveFilterWidth:O,dilationDepth:S,dilationHeight:C,dilationWidth:I,inShape:e,outShape:q,filterShape:t}},Kp=(e,t,r,i,a,s)=>{let n=s==="channelsLast";n?e[0].dims[3]:e[0].dims[1];let u=[64,1,1],l={x:r.map((x,$)=>$)},c=[Math.ceil(Tu(l.x.map(x=>r[x]))/u[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let h=1,f=A.size(r),g=[{type:12,data:f},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Lt(t,g),g.push(...Q(e[0].dims,e[1].dims));let y=["rank","rank"],_=e.length===3;_&&(g.push(...Q(e[2].dims)),y.push("rank")),g.push(...Q(r));let w=x=>{let $=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Wt(t,$);let v=1,S=Ee(e[0].dataType),C=B("x",e[0].dataType,e[0].dims.length,h),I=B("W",e[1].dataType,e[1].dims.length,v),z=[C,I],E=Y("result",e[0].dataType,r.length,v),O="";if(_){let V=B("bias",e[2].dataType,e[2].dims.length,v);z.push(V),O+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${S} {
          return bias[${n?X("coords",4,5):X("coords",1,5)}];
        }`}let P=Ae(h,S),F=Ut(t,P,S);return`
            ${O}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
          ${x.registerUniforms($).declareVariables(...z,E)}
          ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${E.offsetToIndices("global_idx")};
              let batch = ${X("coords",0,C.rank)};
              let d2 = ${n?X("coords",C.rank-1,C.rank):X("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${n?X("coords",1,C.rank):X("coords",2,C.rank)},
              ${n?X("coords",2,C.rank):X("coords",3,C.rank)},
              ${n?X("coords",3,C.rank):X("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${n?X("uniforms.x_shape",1,C.rank):X("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${n?X("uniforms.x_shape",2,C.rank):X("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${n?X("uniforms.x_shape",3,C.rank):X("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${n?X("uniforms.x_shape",4,C.rank):X("uniforms.x_shape",1,C.rank)};
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
                      ${n?`let xValues = vec4<f32>(
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
                        ${n?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${n?`let xValues = vec2<f32>(
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
                      ${n?`let xValues = vec3<f32>(
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
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${n};${h};${_}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:g}),getShaderSource:w}}}),Zp,Yp,Bg=L(()=>{ie(),se(),oe(),Ft(),Zp=(e,t,r,i)=>{let a=e.length>2,s=a?"value += b[output_channel];":"",n=e[0].dims,u=e[1].dims,l=t.format==="NHWC",c=l?r[3]:r[1],h=c/t.group,f=l&&h>=4?$e(c):1,g=A.size(r)/f,y=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:h}];Lt(t,y),y.push(...Q(n,[u[0],u[1],u[2],u[3]/f]));let _=a?["rank","rank","rank"]:["rank","rank"];y.push(...Q([r[0],r[1],r[2],r[3]/f]));let w=x=>{let $=Y("output",e[0].dataType,r.length,f),v=Ee($.type.tensor),S=Ut(t,$.type.value,v),C=B("x",e[0].dataType,n.length),I=B("w",e[1].dataType,u.length,f),z=[C,I];a&&z.push(B("b",e[2].dataType,e[2].dims,f));let E=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Wt(t,E);let O=l?`
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
            let xVal = ${C.get("batch","xHeight","xWidth","input_channel")};
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

            let xVal = ${C.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${I.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(E).declareVariables(...z,$)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${O}
    ${s}
    ${S}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:y}),getShaderSource:w}},Yp=(e,t,r,i)=>{let a=e.length>2,s=$e(r[3]),n=$e(r[2]),u=A.size(r)/s/n,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],c=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],h=[r[0],r[1],r[2],r[3]/s],f=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Lt(t,f),f.push(...Q(l,c,h));let g=(n-1)*t.strides[1]+c[1],y=_=>{let w=Y("output",e[0].dataType,h.length,s),x=Ee(w.type.tensor),$=Ut(t,w.type.value,x),v=B("x",e[0].dataType,l.length,s),S=B("w",e[1].dataType,c.length,s),C=[v,S];a&&C.push(B("b",e[2].dataType,e[2].dims,s));let I=a?"value += b[output_channel];":"",z=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Wt(t,z),`
  ${_.registerUniforms(z).declareVariables(...C,w)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${n}u;
    let col = (index1 % width1) * ${n}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${v.type.value}, ${g}>;
    var values: array<${w.type.value}, ${n}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${c[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${c[1]}; w_width++) {
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${n}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${n}u; i++) {
      var value = values[i];
      ${I}
      ${$}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${n};${g};${c[0]};${c[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:y}}}),ku,Gi,Eu,ji,Ja,la,zu,Au,en,Dg=L(()=>{se(),Og(),Rg(),An(),Bg(),Ft(),zn(),Ct(),ku=(e,t,r,i,a,s)=>{let n=e[0],u=e.slice(s?1:2,s?3:4),l=u.length,c=t[0],h=t.slice(2).map((g,y)=>g+(g-1)*(r[y]-1)),f=u.map((g,y)=>g+i[y]+i[y+l]).map((g,y)=>Math.floor((g-h[y]+a[y])/a[y]));return f.splice(0,0,n),f.splice(s?3:1,0,c),f},Gi=[2,3,1,0],Eu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},ji=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let s=2;s<t[1].dims.length;++s)r[s-2]===0&&(r[s-2]=t[1].dims[s]);let i=e.pads.slice();sr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},Ja=e=>{let t=In(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,s=e.group,n=e.kernel_shape,u=e.pads,l=e.strides,c=e.w_is_const();return{autoPad:i,format:r,dilations:a,group:s,kernelShape:n,pads:u,strides:l,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},la=(e,t,r,i)=>{let a=r.format==="NHWC",s=ku(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let z=[t[0]];if(a){let E=e.kernelCustomData.wT??e.compute(We(t[1],Gi),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=E),z.push(E)}else z.push(t[1]);t.length===3&&z.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Yp(z,r,s,i),{inputs:z}):e.compute(Zp(z,r,s,i),{inputs:z});return}let n=t.length===3,u=t[0].dims[a?1:2],l=t[0].dims[a?2:3],c=t[0].dims[a?3:1],h=t[1].dims[2],f=t[1].dims[3],g=s[a?1:2],y=s[a?2:3],_=s[a?3:1],w=a&&h===u&&f===l&&r.pads[0]===0&&r.pads[1]===0;if(w||h===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let z=s[0],E,O,P,F=[];if(a){let ee=e.kernelCustomData.wT??e.compute(We(t[1],Gi),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=ee),w){let q=u*l*c;E=t[0].reshape([1,z,q]),O=ee.reshape([1,q,_]),P=[1,z,_]}else E=t[0].reshape([z,u*l,c]),O=ee.reshape([1,c,_]),P=[z,g*y,_];F.push(E),F.push(O)}else E=t[0].reshape([z,c,u*l]),O=t[1].reshape([1,_,c]),P=[z,_,g*y],F.push(O),F.push(E);n&&F.push(t[2]);let V=P[2],G=F[0].dims[F[0].dims.length-1];V<8&&G<8?e.compute(En(F,r,s,P,a,i),{inputs:F}):e.compute(ur(F,r,s,P,a,i),{inputs:F});return}let x=!0,$=e.kernelCustomData.wT??e.compute(We(t[1],Gi),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];n&&v.push(t[2]);let S=a?g*y:_,C=a?_:g*y,I=h*f*c;e.compute(Gp(v,r,s,S,C,I,n,x,i),{inputs:v})},zu=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),n=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=ji({...t,pads:a,strides:s,dilations:n,kernelShape:u},i);la(e,i,l,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},Au=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",a=ji(r,t),s=r.autoPad==="NOTSET"?r.pads:r.autoPad,n=jp(t[0].dims,t[1].dims,r.strides,r.dilations,s,!1,i);e.compute(Kp(t,a,n.outShape,[n.filterDepth,n.filterHeight,n.filterWidth],[n.padInfo.front,n.padInfo.top,n.padInfo.left],i))},en=(e,t)=>{if(Eu(e.inputs,t),e.inputs[0].dims.length===3)zu(e,t);else if(e.inputs[0].dims.length===5)Au(e,e.inputs,t);else{let r=ji(t,e.inputs);la(e,e.inputs,r)}}}),Xp,Ng=L(()=>{ie(),ht(),se(),oe(),Xp=(e,t,r)=>{let i=e.length>2,a=t.outputShape,s=t.format==="NHWC",n=t.group,u=e[1].dims,l=u[2]/n,c=u[3],h=s?$e(l):1,f=s&&c===1&&l>=4,g=f?Math.floor(l/4)*4:Math.floor(l/h)*h,y=l-g,_=s?$e(c):1,w=s?c===1?h:_:1,x=A.size(a)/_,$=[Math.ceil(x/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let v=["rank","rank"],S=[t.strides[0],t.strides[1]],C=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],I=[t.dilations[0],t.dilations[1]],z=[C[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),C[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],E=[z[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),z[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],O=[{type:12,data:x},{type:12,data:S},{type:12,data:C},{type:12,data:I},{type:12,data:z},{type:6,data:E},{type:12,data:g},{type:12,data:l},{type:12,data:c},...Q(e[0].dims,e[1].dims)];i&&(O.push(...Q(e[2].dims)),v.push("rank")),O.push(...Q(a));let P=F=>{let V=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:C.length},{name:"dilations",type:"u32",length:C.length},{name:"effective_filter_dims",type:"u32",length:z.length},{name:"pads",type:"i32",length:E.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],G=Ee(e[0].dataType),ee=s?1:2,q=s?2:3,ae=s?3:1,J=B("W",e[1].dataType,e[1].dims.length,w),K=B("Dy",e[0].dataType,e[0].dims.length,h),ne=[K,J];i&&ne.push(B("bias",e[2].dataType,[a[ae]].length,_));let j=Y("result",e[0].dataType,a.length,_),ge=()=>{let re="";if(f)h===4?re+=`
        let xValue = ${K.getByOffset("x_offset")};
        let wValue = ${J.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:h===2?re+=`
          dotProd = dotProd + dot(vec4<${G}>(${K.getByOffset("x_offset")}, ${K.getByOffset("x_offset + 1u")}), vec4<${G}>(${J.getByOffset("w_offset")}, ${J.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:h===1&&(re+=`
          dotProd = dotProd + dot(vec4<${G}>(${K.getByOffset("x_offset")}, ${K.getByOffset("x_offset + 1u")}, ${K.getByOffset("x_offset + 2u")}, ${K.getByOffset("x_offset + 3u")}), vec4<${G}>(${J.getByOffset("w_offset")}, ${J.getByOffset("w_offset + 1u")}, ${J.getByOffset("w_offset + 2u")}, ${J.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(re+=`
                  let xValue = ${s?K.getByOffset(`${K.indicesToOffset(`${K.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h}`):K.get("batch","inputChannel","idyR","idyC")};
        `,h===1)re+=`
          let w_offset = ${J.indicesToOffset(`${J.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${J.getByOffset(`w_offset / ${w}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let ce=0;ce<h;ce++)re+=`
            let wValue${ce} = ${J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${ce}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${ce}] * wValue${ce};`;return re},U=()=>{if(y===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let re="";if(h===1){re+="dotProd = dotProd";for(let ce=0;ce<y;ce++)re+=`
            + ${K.getByOffset(`x_offset + ${ce}`)} * ${J.getByOffset(`w_offset + ${ce}`)}`;re+=";"}else if(h===2){if(y!==2)throw new Error(`Invalid inputChannelsRemainder ${y}.`);re+=`
          let xValue = ${K.getByOffset("x_offset")};
          let wValue = ${J.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return re},H=`
            let outputIndices = ${j.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${j.indicesGet("outputIndices",0)};
            let d1 = ${j.indicesGet("outputIndices",ae)};
            let r = ${j.indicesGet("outputIndices",ee)};
            let c = ${j.indicesGet("outputIndices",q)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${j.type.value}(0.0);
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
              if (dyR < 0.0 || dyR >= ${G}(uniforms.Dy_shape[${ee}]) || fract(dyR) > 0.0 ||
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
                if (dyC < 0.0 || dyC >= ${G}(uniforms.Dy_shape[${q}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${K.indicesToOffset(`${K.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h};
                var w_offset = ${J.indicesToOffset(`${J.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${w};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:h}) {
                  ${ge()}
                  inputChannel = inputChannel + ${f?4:h};
                }
                ${U()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${_}]`:""};
            ${j.setByOffset("global_idx","value")};
          `;return`
    ${F.registerUniforms(V).declareVariables(...ne,j)}
      ${F.mainStart()}
      ${F.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${H}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${h}${w}${_}${f}${y}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:O}),getShaderSource:P}}}),Mu,Ou,Ru,da,Qp,Bu,ca,Du,Jp,Pg=L(()=>{Ng(),Ft(),Ct(),Mu=(e,t,r,i,a,s)=>(e-1)*t+r+(i-1)*a+1-s,Ou=(e,t,r,i,a)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=s,r[a]=e-s):t==="SAME_LOWER"&&(r[i]=e-s,r[a]=s)},Ru=(e,t,r,i,a,s,n,u,l,c)=>{let h=e.length-2,f=c.length===0;l.length<h&&l.push(...Array(h-l.length).fill(0));let g=e[0],y=t[u?3:1]*a;for(let _=0,w=e.length-h-(u?1:0);_<h;++_,++w){let x=e[w],$=f?x*n[_]:c[_],v=Mu(x,n[_],s[_],t[w],r[_],$);Ou(v,i,s,_,_+h),f&&c.push(n[_]*(x-1)+l[_]+(t[w]-1)*r[_]+1-s[_]-s[_+h])}c.splice(0,0,g),c.splice(u?3:1,0,y)},da=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,g)=>f*g,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),s=e.outputShape.slice(),n=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;l=new Array(f).fill(1)}let c=e.strides.slice();if(c.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;c=new Array(f).fill(1)}Ru(u,r,l,e.autoPad,e.group,a,c,i,n,s);let h=Object.assign({},e);return Object.assign(h,{kernelShape:r,pads:a,outputPadding:n,outputShape:s,dilations:l,strides:c}),h},Qp=e=>{let t=In(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,s=e.group,n=e.kernelShape,u=e.pads,l=e.strides,c=e.wIsConst(),h=e.outputPadding,f=e.outputShape;return{autoPad:i,format:r,dilations:a,group:s,kernelShape:n,outputPadding:h,outputShape:f,pads:u,strides:l,wIsConst:c,...t,cacheKey:`${e.format};${t.activation};`}},Bu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((n,u)=>n+u,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((n,u)=>n+u,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((n,u)=>n+u,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((n,u)=>n+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},ca=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute(We(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let s=[t[0],a];t.length===3&&s.push(t[2]),e.compute(Xp(s,r,i),{inputs:s})},Du=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let n=t.strides;(n.length===0||n[0]===0)&&(n=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],n=[1].concat(n),s=[1].concat(s),a=[1].concat(a);let l=t.outputPadding;l=[0].concat(l);let c=da({...t,pads:u,strides:n,dilations:s,kernelShape:a,outputPadding:l},i);ca(e,i,c,h=>r?[h[0],h[2],h[3]]:[h[0],h[1],h[3]])},Jp=(e,t)=>{if(Bu(e.inputs,t),e.inputs[0].dims.length===3)Du(e,t);else{let r=da(t,e.inputs);ca(e,e.inputs,r)}}}),Nu,eh,th,Ug=L(()=>{ie(),se(),Ce(),oe(),Nu=(e,t,r,i)=>{let a=A.size(t),s=t.length,n=B("input",e,s),u=Y("output",e,s),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),c=A.normalizeAxis(l,s),h=f=>{let g=` i32(${n.indicesGet("inputIndices","uniforms.axis")}) `,y=X("uniforms.input_shape","uniforms.axis",s),_=i.reverse?g+(i.exclusive?" + 1":""):"0",w=i.reverse?y:g+(i.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(n,u)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${n.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${n.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:c},...Q(t,t)]}),getShaderSource:h}},eh=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,a=e.inputs[1];e.compute(Nu(i,r,a,t),{inputs:[0]})},th=e=>{let t=e.exclusive===1,r=e.reverse===1;return fe({exclusive:t,reverse:r})}}),Pu,Uu,Lu,ih,rh,Lg=L(()=>{ie(),se(),Ce(),oe(),Pu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Uu=(e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let s=0;s<t;++s)a.push(r.indicesSet("a",e[s],`i[${s}]`));return a.push("return a;}"),a.join(`
`)},Lu=(e,t)=>{let r,i,a,s,n,u,l=t.format==="NHWC",c=t.blocksize,h=t.mode==="DCR";l?([r,i,a,s]=e.dims,n=h?[r,i,a,c,c,s/c**2]:[r,i,a,s/c**2,c,c],u=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,a,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],n=h?[r,c,c,s/c**2,i,a]:[r,s/c**2,c,c,i,a],u=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(n),g=f.dims.length,y=e.dataType,_=B("a",y,g),w=Y("output",y,g),x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(_,w)}

  ${Uu(u,g,_,w)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=l?[r,i*c,a*c,s/c**2]:[r,s/c**2,i*c,a*c],S=A.size(v),C=f.dims,I=A.sortBasedOnPerm(C,u);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...Q(C,I)]}},getShaderSource:x}},ih=(e,t)=>{Pu(e.inputs),e.compute(Lu(e.inputs[0],t))},rh=e=>fe({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Ki,di,pa,Wu,Hu,Fu,qu,ha,Vu,ah,nh,Wg=L(()=>{ie(),se(),Ce(),oe(),Ki="[a-zA-Z]|\\.\\.\\.",di="("+Ki+")+",pa="^"+di+"$",Wu="("+di+",)*"+di,Hu="^"+Wu+"$",Fu=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},qu=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Hu)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,s)=>{let n=e[s].dims.slice();if(!a.match(RegExp(pa)))throw new Error("Invalid LHS term");let u=this.processTerm(a,!0,n,s);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([a,s])=>s.count===1||a==="...").map(([a])=>a).join("");else if(!i.match(RegExp(di)))throw new Error("Invalid RHS");i.match(RegExp(Ki,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(a);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,s=!1,n=[],u=0;if(!e.match(RegExp(pa))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Ki,"g")),c=new Fu(i);return l?.forEach((h,f)=>{if(h==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let g=a-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(n=r.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==n.length||this.ellipsisDims.toString()!==n.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=n;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<n.length;y++){let _=String.fromCharCode(48+y);c.addSymbol(_,f+y),this.addSymbol(_,r[u++],i)}}else c.addSymbol(h,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[u++],i)}),c}},ha=e=>e+"_max",Vu=(e,t,r,i)=>{let a=e.map(c=>c.length).map((c,h)=>B(`input${h}`,t,c)),s=A.size(i),n=Y("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(c=>!r.rhs.symbolToIndices.has(c)),l=c=>{let h=[],f="var prod = 1.0;",g="var sum = 0.0;",y="sum += prod;",_=[],w=[],x=[],$=[],v=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((C,I)=>{if(r.rhs.symbolToIndices.has(I)){let z=r.rhs.symbolToIndices.get(I)?.[0];z!==void 0&&r.lhs.forEach((E,O)=>{if(C.inputIndices.includes(O)){let P=E.symbolToIndices.get(I);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(F=>{h.push(`${a[O].indicesSet(`input${O}Indices`,F,n.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,E)=>{if(C.inputIndices.includes(E)){let O=z.symbolToIndices.get(I);if(O===void 0)throw new Error("Invalid symbol error");O.forEach(P=>{_.push(`${a[E].indicesSet(`input${E}Indices`,P,`${I}`)}`)}),$.push(`prod *= ${a[E].getByIndices(`input${E}Indices`)};`)}}),w.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${ha(I)}; ${I}++) {`),x.push("}")});let S=v?[...h,`let sum = ${a.map((C,I)=>C.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...h,g,...w,..._,f,...$,y,...x];return`
            ${c.registerUniforms(u.map(C=>({name:`${ha(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,n)}

            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${n.offsetToIndices("global_idx")};
            ${a.map((C,I)=>`var input${I}Indices: ${a[I].type.indices};`).join(`
`)}
            ${S.join(`
`)};
            ${n.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let c=u.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));c.push({type:12,data:s});let h=e.map((f,g)=>[...Q(f)]).reduce((f,g)=>f.concat(g),c);return h.push(...Q(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:h}},getShaderSource:l}},ah=(e,t)=>{let r=new qu(e.inputs,t.equation),i=r.outputDims,a=e.inputs.map((s,n)=>s.dims);e.compute(Vu(a,e.inputs[0].dataType,r,i))},nh=e=>{let t=e.equation.replace(/\s+/g,"");return fe({equation:t})}}),Gu,fa,ju,Ku,sh,Hg=L(()=>{ie(),se(),oe(),Gu=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&r[i]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},fa=(e,t)=>{let r=e.length-t.length,i=[];for(let a=0;a<r;++a)i.push(e[a]);for(let a=0;a<t.length;++a)i.push(t[a]===1?e[a+r]:t[a]);return i},ju=(e,t)=>e.length>t.length?fa(e,t):fa(t,e),Ku=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=ju(t,r),a=e[0].dataType,s=a===9||A.size(t)===1,n=a===9||t.length>0&&t[t.length-1]%4===0?4:1,u=s||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(A.size(i)/u),c=f=>{let g=B("input",a,t.length,n),y=Y("output",a,i.length,u),_;if(a===9){let w=(x,$,v="")=>`
          let outputIndices${$} = ${y.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${g.broadcastedIndicesToOffset(`outputIndices${$}`,y)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${x}[${$}] = ${v}(${g.getByOffset(`index${$}`)}[component${$}]);
        `;_=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${y.setByOffset("global_idx","data")}
      }`}else _=`
        let outputIndices = ${y.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",y)};
        let data = ${y.type.value}(${g.getByOffset(`inputOffset / ${n}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(g,y)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`},h=[{type:12,data:l},...Q(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${n}${u}`,inputDependencies:["rank"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h})}},sh=e=>{Gu(e.inputs),e.compute(Ku(e.inputs),{inputs:[0]})}}),Zu,oh,Fg=L(()=>{ie(),se(),oe(),Sn(),Zu=e=>{let t=e[0].dataType,r=A.size(e[0].dims),i=A.size(e[1].dims),a=i%4===0,s=n=>{let u=B("x",t,[1],4),l=B("bias",t,[1],4),c=Y("y",t,[1],4),h=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${l.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,g=a?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${n.registerUniforms(h).declareVariables(u,l,c)}

    ${Za(Oe(t))}

    ${n.mainStart(Zt)}
      ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${c.setByOffset("global_idx",Ya("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:n=>({outputs:[{dims:n[0].dims,dataType:n[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/Zt/4)}})}},oh=e=>{e.inputs.length<2||A.size(e.inputs[1].dims)===0?Ip(e):e.compute(Zu(e.inputs))}}),Yu,Xu,uh,lh,qg=L(()=>{ie(),se(),Ce(),oe(),Yu=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Xu=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,s=A.normalizeAxis(t.axis,a),n=r.slice(0);n.splice(s,1,...i);let u=r[s],l=e[0].dataType===9?4:1,c=Math.ceil(A.size(n)/l),h=[{type:12,data:c},{type:6,data:u},{type:12,data:s},...Q(e[0].dims,e[1].dims,n)],f=g=>{let y=B("data",e[0].dataType,e[0].dims.length,l),_=B("inputIndices",e[1].dataType,e[1].dims.length),w=Y("output",e[0].dataType,n.length,l),x=v=>{let S=i.length,C=`var indicesIndices${v}  = ${_.type.indices}(0);`;for(let I=0;I<S;I++)C+=`${S>1?`indicesIndices${v}[${I}]`:`indicesIndices${v}`} = ${n.length>1?`outputIndices${v}[uniforms.axis + ${I}]`:`outputIndices${v}`};`;C+=`
          var idx${v} = ${_.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${y.type.indices};
        `;for(let I=0,z=0;I<a;I++)I===s?(C+=`${a>1?`dataIndices${v}[${I}]`:`dataIndices${v}`} = u32(idx${v});`,z+=S):(C+=`${a>1?`dataIndices${v}[${I}]`:`dataIndices${v}`} = ${n.length>1?`outputIndices${v}[${z}]`:`outputIndices${v}`};`,z++);return C},$;if(e[0].dataType===9){let v=(S,C,I="")=>`
          let outputIndices${C} = ${w.offsetToIndices(`outputOffset + ${C}u`)};
          ${x(C)};
          let offset${C} = ${y.indicesToOffset(`dataIndices${C}`)};
          let index${C} = offset${C} / 4u;
          let component${C} = offset${C} % 4u;
          ${S}[${C}] = ${I}(${y.getByOffset(`index${C}`)}[component${C}]);
        `;$=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${w.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${w.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${y.getByIndices("dataIndices")};
      ${w.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,_,w)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:f}},uh=e=>fe({axis:e.axis}),lh=(e,t)=>{let r=e.inputs;Yu(r),e.compute(Xu(e.inputs,t))}}),Qu,dh,ch,Vg=L(()=>{ie(),se(),oe(),Qu=(e,t,r,i,a,s,n,u,l)=>{let c=[{type:12,data:s},{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:n},{type:12,data:u},{type:12,data:l}],h=[s];c.push(...Q(t.dims,h));let f=g=>{let y=B("indices_data",t.dataType,t.dims.length),_=Y("input_slice_offsets_data",12,1,1),w=[y,_],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(x).declareVariables(...w)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:h,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},dh=(e,t)=>{let r=e.inputs,i=r[0].dims,a=r[0].dataType,s=r[1].dims,n=s[s.length-1],u=A.sizeToDimension(s,s.length-1),l=A.sizeFromDimension(i,t.batchDims+n),c=A.sizeToDimension(i,t.batchDims),h=A.sizeFromDimension(i,t.batchDims),f=u/c,g=new Array(n),y=l;for(let C=0;C<n;++C)g[n-1-C]=y,y*=i[t.batchDims+n-1-C];let _=Qu(e,r[1],g,t.batchDims,i,u,f,h,n),w=t.batchDims+n;if(w>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=s.slice(0,-1).concat(i.slice(w)),$=A.size(x),v=[{type:12,data:$},{type:12,data:l},...Q(r[0].dims,_.dims,x)],S=C=>{let I=B("data",r[0].dataType,r[0].dims.length),z=B("slice_offsets",12,_.dims.length),E=Y("output",r[0].dataType,x.length);return`
          ${C.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,z,E)}
            ${C.mainStart()}
            ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:a}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:v}),getShaderSource:S},{inputs:[r[0],_]})},ch=e=>({batchDims:e.batch_dims,cacheKey:""})}),Ju,el,ph,hh,Gg=L(()=>{ie(),se(),Ce(),oe(),Ju=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=A.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],s=e[2],n=e.length===4?e[3]:void 0;if(s.dims.length!==a.dims.length||!a.dims.map((u,l)=>l===r?Math.ceil(u/i)===s.dims[l]:u===s.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(n){if(n.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(n.dims.length!==s.dims.length||!n.dims.map((u,l)=>u===s.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},el=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,s=A.normalizeAxis(t.gatherAxis,a),n=A.normalizeAxis(t.quantizeAxis,a),u=r.slice(0);u.splice(s,1,...i);let l=A.size(u),c=e[2].dataType,h=e[0].dataType===22,f=[{type:12,data:l},{type:12,data:n},{type:12,data:s},{type:12,data:t.blockSize},...Q(...e.map((y,_)=>y.dims),u)],g=y=>{let _=B("data",e[0].dataType,e[0].dims.length),w=B("inputIndices",e[1].dataType,e[1].dims.length),x=B("scales",e[2].dataType,e[2].dims.length),$=e.length>3?B("zeroPoint",e[3].dataType,e[3].dims.length):void 0,v=Y("output",c,u.length),S=[_,w,x];$&&S.push($);let C=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(C).declareVariables(...S,v)}
        ${y.mainStart()}
        let output_indices = ${v.offsetToIndices("global_idx")};
        var indices_indices = ${w.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${v.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${w.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${v.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${v.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${w.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[s]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${v.indicesGet("output_indices",`i + ${i.length} - 1`)};
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
        let dequantized_data = ${Oe(c)}(quantized_data - zero_point) * scale;
        ${v.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,_)=>_!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,_)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:c}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:g}},ph=(e,t)=>{let r=e.inputs;Ju(r,t),e.compute(el(e.inputs,t))},hh=e=>fe({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),tl,il,fh,mh,jg=L(()=>{ie(),se(),Ce(),oe(),tl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},il=(e,t)=>{let r=e[0].dims,i=e[0].dataType,a=r.length,s=e[1].dims,n=e[1].dataType,u=A.normalizeAxis(t.axis,a),l=r[u],c=s.slice(0),h=A.size(c),f=B("input",i,a),g=B("indicesInput",n,s.length),y=Y("output",i,c.length),_=[{type:12,data:h},{type:6,data:l},{type:12,data:u}];return _.push(...Q(r,s,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:w=>`
      ${w.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,g,y)}
      ${w.mainStart()}
      ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},fh=e=>fe({axis:e.axis}),mh=(e,t)=>{let r=e.inputs;tl(r),e.compute(il(e.inputs,t))}}),rl,al,gh,yh,Kg=L(()=>{ie(),se(),oe(),rl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},al=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,s,n]=fc.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[a,s];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,c=Math.ceil(s/l),h=Math.ceil(a/l),f=!0,g=A.size(u),y=[{type:12,data:f?c:g},{type:12,data:a},{type:12,data:s},{type:12,data:n},{type:1,data:t.alpha},{type:1,data:t.beta}],_=["type","type"];e.length===3&&(y.push(...Q(e[2].dims)),_.push("rank")),y.push(...Q(u));let w=$=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",C=B("a",e[0].dataType,e[0].dims),I=B("b",e[1].dataType,e[1].dims),z=C.type.value,E=null,O=[C,I];e.length===3&&(E=B("c",e[2].dataType,e[2].dims.length),O.push(E));let P=Y("output",e[0].dataType,u.length);O.push(P);let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(F).declareVariables(...O)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${z}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${S}
    ${E!=null?`let cOffset = ${E.broadcastedIndicesToOffset("vec2(m, n)",P)}; value += ${z}(uniforms.beta) * ${E.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=$=>{let v=B("a",e[0].dataType,e[0].dims),S=B("b",e[1].dataType,e[1].dims),C=null,I=[v,S];e.length===3&&(C=B("c",e[2].dataType,e[2].dims.length),I.push(C));let z=Y("output",e[0].dataType,u.length);I.push(z);let E=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],O="",P="";t.transA&&t.transB?(P=`
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
      `,O="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(P=`
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
      `,O="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(P=`
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
      `,O="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(P=`
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
      `,O="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let F=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(E).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${l}>, ${l}>;
  ${$.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${z.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${P}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${O}
      }
      workgroupBarrier();
    }

    ${F}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${C!=null?`let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)",z)}; value += ${z.type.value}(uniforms.beta) * ${C.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:c*h},programUniforms:y}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:y}),getShaderSource:w}},gh=e=>{let t=e.transA,r=e.transB,i=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:i,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},yh=(e,t)=>{rl(e.inputs),e.compute(al(e.inputs,t))}}),tt,ut,kt,Et,nl,sl,ol,ul,ll,dl,cl,pl,_h,bh,Zg=L(()=>{ie(),se(),Ce(),oe(),[tt,ut,kt,Et]=[0,1,2,3],nl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},sl=`
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
`,ol=e=>`
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
`,ul=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,ll=e=>`
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
`,dl=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${tt}] = batch;
     indices[${ut}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${kt}] = u32(r);
            indices[${Et}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${kt}] = u32(clamp(r, 0, H - 1));
          indices[${Et}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${kt}] = gs_reflect(r, border[1], border[3]);
          indices[${Et}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,cl=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${tt}], indices[${ut}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${tt}], indices[${ut}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${tt}], indices[${ut}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${tt}], indices[${ut}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${tt}], indices[${ut}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${tt}], indices[${ut}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,pl=(e,t)=>{let r=B("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=B("grid",e[1].dataType,i.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[tt,ut,kt,Et]=[0,3,1,2]);let n=Y("output",e[0].dataType,s.length),u=r.type.value,l=A.size(s),c=[{type:12,data:l},...Q(e[0].dims,i,s)],h=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,a,n)}
  ${sl}
  ${ol(u)}
  ${ul(t)}
  ${ll(t)}
  ${dl(r,u,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${kt}]);
      let W_in = i32(uniforms.x_shape[${Et}]);

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

      let indices = ${n.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${tt}], indices[${kt}], indices[${Et}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${cl(n,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let g=A.size(s);return{outputs:[{dims:s,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:c}},getShaderSource:h}},_h=(e,t)=>{nl(e.inputs),e.compute(pl(e.inputs,t))},bh=e=>fe({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Be,hl,wh,ma,fl,_i,vh,$h=L(()=>{ie(),se(),Ce(),$n(),Tn(),oe(),Ct(),Be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,hl=(e,t)=>{let r=e[0],i=Be(e,1),a=Be(e,2),s=Be(e,3),n=Be(e,4),u=Be(e,5),l=Be(e,6),c=Be(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let h=r.dims[0],f=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],y=f,_=0,w=0,x=Math.floor(g/t.numHeads);if(l&&c&&A.size(l.dims)&&A.size(c.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==h||l.dims[1]!==t.numHeads||l.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(c.dims[0]!==h||c.dims[1]!==t.numHeads||c.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==c.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(c.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=l.dims[2],w=l.dims[2]}else if(l&&A.size(l.dims)||c&&A.size(c.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(i&&A.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,y=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,y=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,y=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(s&&A.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=_+y,S=0;if(n&&A.size(n.dims)>0){S=8;let E=n.dims;throw E.length===1?E[0]===h?S=1:E[0]===3*h+2&&(S=3):E.length===2&&E[0]===h&&E[1]===v&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let C=!1,I=g;if(a&&A.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(y!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=a.dims[2]}else{if(y!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=a.dims[1]*a.dims[3],C=!0}}let z=!1;if(n&&A.size(n.dims)>0)throw new Error("Key padding mask is not supported");if(u&&A.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==h||u.dims[1]!==t.numHeads||u.dims[2]!==f||u.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:h,sequenceLength:f,pastSequenceLength:_,kvSequenceLength:y,totalSequenceLength:v,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:g,vHiddenSize:I,headSize:x,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:z,passPastInKv:C,qkvFormat:$}},wh=e=>fe({...e}),ma=fe({perm:[0,2,1,3]}),fl=(e,t,r,i,a,s,n)=>{let u=[i,a,s],l=A.size(u),c=[{type:12,data:l},{type:12,data:n},{type:12,data:s}],h=f=>{let g=Y("qkv_with_bias",t.dataType,u),y=B("qkv",t.dataType,u),_=B("bias",r.dataType,u),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(w).declareVariables(y,_,g)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:h},{inputs:[t,r],outputs:[-1]})[0]},_i=(e,t,r,i,a,s,n,u)=>{let l=s;if(n&&A.size(n.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=fl(e,s,n,t,i,r*a,u),l=l.reshape([t,i,r,a]),r===1||i===1?l:e.compute(We(l,ma.perm),{inputs:[l],outputs:[-1]})[0]}else return s.dims.length===3&&(l=s.reshape([t,i,r,a])),r===1||i===1?l:e.compute(We(l,ma.perm),{inputs:[l],outputs:[-1]})[0]},vh=(e,t)=>{let r=hl(e.inputs,t),i=e.inputs[0],a=Be(e.inputs,1),s=Be(e.inputs,2),n=Be(e.inputs,3),u=Be(e.inputs,4),l=Be(e.inputs,5),c=Be(e.inputs,6),h=Be(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(a?.dims.length===5)throw new Error("Packed KV is not implemented");let f=a&&s&&a.dims.length===4&&s.dims.length===4,g=_i(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,n,0);if(f)return Ii(e,g,a,s,u,void 0,c,h,l,r);if(!a||!s)throw new Error("key and value must be provided");let y=_i(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,n,r.hiddenSize),_=_i(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,s,n,2*r.hiddenSize);Ii(e,g,y,_,u,void 0,c,h,l,r)}}),ml,gl,yl,_l,tn,xh,Ch,Th=L(()=>{ie(),se(),Ce(),oe(),ml=e=>{if(!e||e.length<1)throw new Error("too few inputs")},gl=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),i=r.length),fe({numOutputs:i,axis:t.axis,splitSizes:r})},yl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${X("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,_l=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(a):i===0?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},tn=(e,t)=>{let r=e[0].dims,i=A.size(r),a=e[0].dataType,s=A.normalizeAxis(t.axis,r.length),n=new Array(t.numOutputs),u=B("input",a,r.length),l=new Array(t.numOutputs),c=[],h=[],f=0,g=[{type:12,data:i}];for(let _=0;_<t.numOutputs;_++){f+=t.splitSizes[_],l[_]=f;let w=r.slice();w[s]=t.splitSizes[_],h.push(w),n[_]=Y(`output${_}`,a,w.length),c.push({dims:h[_],dataType:e[0].dataType})}g.push({type:12,data:l},...Q(r,...h));let y=_=>`
  ${_.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...n)}
  ${yl(l.length)}
  ${_l(n)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${X("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:c,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},xh=(e,t)=>{ml(e.inputs);let r=e.inputs.length===1?t:gl(e.inputs,t);e.compute(tn(e.inputs,r),{inputs:[0]})},Ch=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return fe({axis:t,numOutputs:i,splitSizes:r})}}),bl,lr,Sh,Ih=L(()=>{ie(),se(),Ce(),oe(),bl=(e,t)=>{let[r,i,a,s]=e,{numHeads:n,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!A.areEqual(i.dims,[])&&!A.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!A.areEqual(a.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&n===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],c=r.dims[r.dims.length-2],h=a.dims[0],f=A.sizeFromDimension(r.dims,1)/c,g=u===0?a.dims[1]*2:f/n;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(c!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(g/2!==a.dims[1]&&u/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(c>h)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},lr=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:s}=t,n=e[0].dims[0],u=A.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],c=u/l,h=e[2].dims[1],f=a===0?h*2:c/i,g=new Array(n,l,c/f,f-h),y=A.computeStrides(g),_=[{type:1,data:s},{type:12,data:g},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[u,c,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,f,l*f,1]}):[],...Q(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=x=>{let $=B("input",e[0].dataType,e[0].dims.length),v=B("position_ids",e[1].dataType,e[1].dims.length),S=B("cos_cache",e[2].dataType,e[2].dims.length),C=B("sin_cache",e[3].dataType,e[3].dims.length),I=Y("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${x.declareVariables($,v,S,C,I)}

        ${x.mainStart(Zt)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",Y("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:fe({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(g)/Zt)},programUniforms:_})}},Sh=(e,t)=>{bl(e.inputs,t),e.compute(lr(e.inputs,t))}}),wl,vl,ga,$l,kh,Yg=L(()=>{Ce(),ie(),Tn(),$h(),Th(),Ct(),Ih(),oe(),wl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],s=e[3],n=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],c=r.dims[1],h=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=c,g=0,y=!i||i.dims.length===0,_=Math.floor(y?h/(t.numHeads+2*t.kvNumHeads):h/t.numHeads);y&&(h=_*t.numHeads);let w=s&&s.dims.length!==0,x=n&&n.dims.length!==0;if(w&&s.dims.length===4&&s.dims[0]===l&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===_)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&x){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(n.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=s.dims[2]}else if(w||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let v=0,S=!1,C=t.kvNumHeads?_*t.kvNumHeads:h;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(f!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=a.dims[2]}else{if(f!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=a.dims[1]*a.dims[3],S=!0}}let I=e.length>4?e[5]:void 0;if(I&&I.dims.length!==1&&I.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:c,pastSequenceLength:g,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:h,vHiddenSize:C,headSize:_,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:S,qkvFormat:$}},vl=fe({perm:[0,2,1,3]}),ga=(e,t,r)=>{let i=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute(We(i,vl.perm),{inputs:[i],outputs:[-1]})[0]),i},$l=(e,t,r,i)=>{let a=7,s=["type","type"],n=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],c=h=>{let f=B("seq_lens",r.dataType,r.dims),g=B("total_seq_lens",i.dataType,i.dims),y=Y("pos_ids",a,n),_=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${h.registerUniforms(_).declareVariables(f,g,y)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:c}},kh=(e,t)=>{let r=wl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,n=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,c=e.inputs.length>5?e.inputs[6]:void 0,h=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=fe({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,h*r.headSize,h*r.headSize]}),[g,y,_]=!a&&!s?e.compute(tn([i],f),{inputs:[i],outputs:[-1,-1,-1]}):[i,a,s],w,x;if(t.doRotary){let C=e.compute($l(r.batchSize,r.sequenceLength,l,c),{inputs:[l,c],outputs:[-1]})[0],I=e.inputs[7],z=e.inputs[8],E=fe({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),O=[g,C,I,z],P=[-1];w=e.compute(lr(O,E),{inputs:O,outputs:P})[0],O.splice(0,1,y);let F=fe({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});x=e.compute(lr(O,F),{inputs:O,outputs:P})[0]}let $=_i(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?w:g,void 0,0),v=ga(e,t.doRotary?x:y,r),S=ga(e,_,r);Ii(e,$,v,S,void 0,void 0,n,u,void 0,r,l,c)}}),ya,xl,Cl,Eh,Xg=L(()=>{ie(),se(),Ct(),oe(),ya=(e,t,r,i,a,s,n,u)=>{let l=$e(s),c=l===1?"f32":`vec${l}f`,h=l===1?"vec2f":`mat2x${l}f`,f=a*n,g=64;f===1&&(g=256);let y=[a,n,s/l],_=[a,n,2],w=["rank","type","type"],x=[];x.push(...Q(y,_));let $=v=>{let S=B("x",t.dataType,3,l),C=B("scale",r.dataType,r.dims),I=B("bias",i.dataType,i.dims),z=Y("output",1,3,2),E=[S,C,I,z];return`
  var<workgroup> workgroup_shared : array<${h}, ${g}>;
  const workgroup_size = ${g}u;
  ${v.declareVariables(...E)}
  ${v.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${c}(0);
    var squared_sum = ${c}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${c}(${S.get("batch","channel","h")});
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
      let sum_final = ${xt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${xt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${g}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:_,dataType:1}],dispatchGroup:{x:f},programUniforms:x}),getShaderSource:$},{inputs:[t,r,i],outputs:[-1]})[0]},xl=(e,t,r)=>{let i=t[0].dims,a=i,s=2,n=i[0],u=i[1],l=A.sizeFromDimension(i,s),c=$e(l),h=A.size(a)/c,f=ya(e,t[0],t[1],t[2],n,l,u,r.epsilon),g=[n,u,l/c],y=[n,u],_=["type","none"],w=x=>{let $=B("x",t[0].dataType,g.length,c),v=B("scale_shift",1,y.length,2),S=Y("output",t[0].dataType,g.length,c),C=[$,v,S];return`
  ${x.registerUniform("output_size","u32").declareVariables(...C)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${c}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...Q(g,y,g)]}),getShaderSource:w},{inputs:[t[0],f]})},Cl=(e,t,r)=>{let i=t[0].dims,a=i,s=i[0],n=i[i.length-1],u=A.sizeFromDimension(i,1)/n,l=$e(n),c=A.size(a)/l,h=[{type:12,data:u},{type:12,data:Math.floor(n/l)}],f=["type","type"],g=!1,y=[0,i.length-1];for(let $=0;$<i.length-2;$++)g=g||i[$+1]!==1,y.push($+1);g=g&&i[i.length-1]!==1;let _=g?e.compute(We(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},($,v)=>i[y[v]])),w=ya(e,_,t[1],t[2],s,u,n,r.epsilon),x=$=>{let v=Ee(t[0].dataType),S=l===1?"vec2f":`mat${l}x2f`,C=E=>{let O=E===0?"x":"y",P=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${v}(${P}(scale.${O}))`;case 2:return`vec2<${v}>(${P}(scale[0].${O}, scale[1].${O}))`;case 4:return`vec4<${v}>(${P}(scale[0].${O}, scale[1].${O}, scale[2].${O}, scale[3].${O}))`;default:throw new Error(`Not supported compoents ${l}`)}},I=B("input",t[0].dataType,t[0].dims,l),z=Y("output",t[0].dataType,a,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${z.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${C(0)}, ${C(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:x},{inputs:[t[0],w]})},Eh=(e,t)=>{t.format==="NHWC"?Cl(e,e.inputs,t):xl(e,e.inputs,t)}}),Tl,Sl,zh,Qg=L(()=>{ie(),se(),oe(),Tl=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Sl=(e,t,r)=>{let i=t.simplified,a=e[0].dims,s=e[1],n=!i&&e[2],u=a,l=A.normalizeAxis(t.axis,a.length),c=A.sizeToDimension(a,l),h=A.sizeFromDimension(a,l),f=A.size(s.dims),g=n?A.size(n.dims):0;if(f!==h||n&&g!==h)throw new Error(`Size of X.shape()[axis:] == ${h}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${g}`);let y=[];for(let I=0;I<a.length;++I)I<l?y.push(a[I]):y.push(1);let _=$e(h),w=["type","type"],x=[{type:12,data:c},{type:1,data:h},{type:12,data:Math.floor(h/_)},{type:1,data:t.epsilon}];n&&w.push("type");let $=r>1,v=r>2,S=I=>{let z=Ee(e[0].dataType),E=[B("x",e[0].dataType,e[0].dims,_),B("scale",s.dataType,s.dims,_)];n&&E.push(B("bias",n.dataType,n.dims,_)),E.push(Y("output",e[0].dataType,u,_)),$&&E.push(Y("mean_data_output",1,y)),v&&E.push(Y("inv_std_output",1,y));let O=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(O).declareVariables(...E)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Ga("f32",_)};
    var mean_square_vector = ${Ga("f32",_)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${jt(z,_,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${xt("mean_vector",_)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${xt("mean_square_vector",_)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${jt(z,_,"x[j + offset]")};
      let f32scale = ${jt(z,_,"scale[j]")};
      output[j + offset] = ${E[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${n?`+ ${jt(z,_,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},C=[{dims:u,dataType:e[0].dataType}];return $&&C.push({dims:y,dataType:1}),v&&C.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${_};${r};${i}`,inputDependencies:w},getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(c/64)},programUniforms:x}),getShaderSource:S}},zh=(e,t)=>{Tl(e.inputs),e.compute(Sl(e.inputs,t,e.outputCount))}}),Il,Ah,Jg=L(()=>{se(),zn(),An(),Il=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Ah=e=>{Il(e.inputs);let t=Kt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(En(e.inputs,{activation:""},t));else{let a=t[t.length-2],s=A.size(e.inputs[0].dims.slice(0,-2)),n=A.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&a===1&&n===1){let u=e.inputs[0].reshape([1,s,i]),l=e.inputs[1].reshape([1,i,r]),c=[1,s,r],h=[u,l];e.compute(ur(h,{activation:""},t,c),{inputs:h})}else e.compute(ur(e.inputs,{activation:""},t))}}}),kl,El,zl,Mh,Oh,e0=L(()=>{ie(),se(),Ce(),oe(),kl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,n=e[1];if(!A.areEqual(n.dims,[t.n,a,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(A.size(u)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,c=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(A.size(l)!==c)throw new Error("zeroPoints input size error.")}},El=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],s=t.k,n=t.n,u=r.slice(0,i-2),l=A.size(u),c=e[1].dims[2]/4,h=e[0].dataType,f=$e(t.k),g=$e(c),y=$e(n),_=u.concat([a,n]),w=a>1&&n/y%2===0?2:1,x=A.size(_)/y/w,$=64,v=[],S=[l,a,s/f],C=A.convertShape(e[1].dims).slice();C.splice(-1,1,c/g),v.push(...Q(S)),v.push(...Q(C)),v.push(...Q(e[2].dims)),e.length===4&&v.push(...Q(A.convertShape(e[3].dims)));let I=[l,a,n/y];v.push(...Q(I));let z=E=>{let O=S.length,P=B("a",e[0].dataType,O,f),F=B("b",12,C.length,g),V=B("scales",e[2].dataType,e[2].dims.length),G=[P,F,V],ee=e.length===4?B("zero_points",12,e[3].dims.length):void 0;ee&&G.push(ee);let q=I.length,ae=Y("output",e[0].dataType,q,y),J=Ee(e[0].dataType),K=(()=>{switch(f){case 1:return`array<${J}, 8>`;case 2:return`mat4x2<${J}>`;case 4:return`mat2x4<${J}>`;default:throw new Error(`${f}-component is not supported.`)}})(),ne=()=>{let U=`
          // reuse a data
            var input_offset = ${P.indicesToOffset(`${P.type.indices}(batch, row, word_offset)`)};
            var a_data: ${K};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${P.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let H=0;H<y*w;H++)U+=`
            b_value = ${g===1?`b${H}_data`:`b${H}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${K}(${Array.from({length:4},(re,ce)=>`${J}(b_value_lower[${ce}]), ${J}(b_value_upper[${ce}])`).join(", ")});
            b_dequantized_values = ${f===1?`${K}(${Array.from({length:8},(re,ce)=>`(b_quantized_values[${ce}] - ${ee?`zero_point${H}`:"zero_point"}) * scale${H}`).join(", ")});`:`(b_quantized_values - ${K}(${Array(8).fill(`${ee?`zero_point${H}`:"zero_point"}`).join(",")})) * scale${H};`};
            workgroup_shared[local_id.x * ${w} + ${Math.floor(H/y)}]${y>1?`[${H%y}]`:""} += ${Array.from({length:8/f},(re,ce)=>`${f===1?`a_data[${ce}] * b_dequantized_values[${ce}]`:`dot(a_data[${ce}], b_dequantized_values[${ce}])`}`).join(" + ")};
          `;return U},j=()=>{let U=`
            var col_index = col * ${y};
            ${ee?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${J}(8);`}
            `;for(let H=0;H<y*w;H++)U+=`
            let scale${H} = ${V.getByOffset("col_index * nBlocksPerCol + block")};
            ${ee?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${ee.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${H} = ${J}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return U},ge=()=>{let U=`col_index = col * ${y};`;for(let H=0;H<y*w;H++)U+=`
            let b${H}_data = ${F.getByIndices(`${F.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return U+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${K};
            var b_dequantized_values: ${K};`,U};return`
        var<workgroup> workgroup_shared: array<${ae.type.value}, ${w*$}>;
        ${E.declareVariables(...G,ae)}
        ${E.mainStart([$,1,1])}
          let output_indices = ${ae.offsetToIndices(`(global_idx / ${$}) * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${j()}
            for (var word: u32 = 0; word < ${c}; word += ${g}) {
              ${ge()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${ne()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${w}) {
            var output_value: ${ae.type.value} = ${ae.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${w};
            }
            ${ae.setByIndices(`${ae.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${g};${y};${w};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:h}],dispatchGroup:{x},programUniforms:v}),getShaderSource:z}},zl=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],s=t.k,n=t.n,u=r.slice(0,i-2),l=A.size(u),c=e[1].dims[2]/4,h=e[0].dataType,f=$e(t.k),g=$e(c),y=u.concat([a,n]),_=128,w=n%8===0?8:n%4===0?4:1,x=_/w,$=x*g*8,v=$/f,S=$/t.blockSize,C=A.size(y)/w,I=[],z=[l,a,s/f],E=A.convertShape(e[1].dims).slice();E.splice(-1,1,c/g),I.push(...Q(z)),I.push(...Q(E)),I.push(...Q(e[2].dims)),e.length===4&&I.push(...Q(A.convertShape(e[3].dims)));let O=[l,a,n];I.push(...Q(O));let P=F=>{let V=z.length,G=B("a",e[0].dataType,V,f),ee=B("b",12,E.length,g),q=B("scales",e[2].dataType,e[2].dims.length),ae=[G,ee,q],J=e.length===4?B("zero_points",12,e[3].dims.length):void 0;J&&ae.push(J);let K=O.length,ne=Y("output",e[0].dataType,K),j=Ee(e[0].dataType),ge=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${j}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${j}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${j}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${j}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${G.type.value}, ${v}>;
        var<workgroup> inter_results: array<array<${ne.type.value}, ${x}>, ${w}>;
        ${F.declareVariables(...ae,ne)}
        ${F.mainStart([x,w,1])}
          let output_indices = ${ne.offsetToIndices(`workgroup_index * ${w}`)};
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
            ${J?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${j}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${j}(8);`}
            let scale = ${q.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${ee.getByIndices(`${ee.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${ge()}
              let b_value = ${g===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${j}>(${Array.from({length:4},(U,H)=>`${j}(b_value_lower[${H}]), ${j}(b_value_upper[${H}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${j}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(U,H)=>`${`dot(a_data${H}, b_dequantized_values[${H}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${w}) {
            var output_value: ${ne.type.value} = ${ne.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ne.setByIndices(`${ne.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${g};${x};${w}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:h}],dispatchGroup:{x:C},programUniforms:I}),getShaderSource:P}},Mh=(e,t)=>{kl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(zl(e.inputs,t)):e.compute(El(e.inputs,t))},Oh=e=>fe(e)}),Al,Ml,Ol,Rl,Bl,Dl,Nl,Pl,Rh,t0=L(()=>{ie(),se(),oe(),Al=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Ml=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
            k = i32(${e.indicesGet("indices",a)}) - ${X("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${X("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${X("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},Ol=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${X("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${X("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${X("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${X("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Rl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${X("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${X("uniforms.x_shape",a,t)})) {
                  k = i32(${X("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${X("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Bl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${X("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${X("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${X("uniforms.x_shape",a,t)})) {
                  k -= i32(${X("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${X("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Dl=(e,t,r)=>{switch(r.mode){case 0:return Ml(e,t,r.pads.length);case 1:return Ol(e,t,r.pads.length);case 2:return Rl(e,t,r.pads.length);case 3:return Bl(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Nl=(e,t)=>{let r=A.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,a=A.size(r),s=[{type:12,data:a},{type:6,data:t.pads}],n=e.length>=3&&e[2].data;t.mode===0&&s.push({type:n?e[2].dataType:1,data:t.value}),s.push(...Q(e[0].dims,r));let u=["rank"],l=c=>{let h=Y("output",e[0].dataType,r.length),f=B("x",e[0].dataType,i.length),g=f.type.value,y=Dl(h,i.length,t),_=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&_.push({name:"constant_value",type:n?g:"f32"}),`
            ${c.registerUniforms(_).declareVariables(f,h)}
            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${h.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${n}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(r)/64)},programUniforms:s}),getShaderSource:l}},Pl=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,s=new Int32Array(2*a).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)s[Number(u[l])]=Number(r[l]),s[Number(u[l])+a]=Number(r[l+u.length])}else r.forEach((u,l)=>s[Number(l)]=Number(u));let n=[];return s.forEach(u=>n.push(u)),{mode:t.mode,value:i,pads:n}}else return t},Rh=(e,t)=>{Al(e.inputs);let r=Pl(e.inputs,t);e.compute(Nl(e.inputs,r),{inputs:[0]})}}),ci,_a,ba,wa,va,Ul,Ll,$a,xa,Bh,Dh,Ca,Nh,Ph,Ta,Uh,Lh,Wh,Hh,i0=L(()=>{qe(),ie(),se(),oe(),ci=e=>{if(_e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},_a=(e,t,r)=>{let i=t.format==="NHWC",a=e.dims.slice();i&&a.splice(1,0,a.pop());let s=Object.hasOwnProperty.call(t,"dilations"),n=t.kernelShape.slice(),u=t.strides.slice(),l=s?t.dilations.slice():[],c=t.pads.slice();sr.adjustPoolAttributes(r,a,n,u,l,c);let h=sr.computePoolOutputShape(r,a,u,l,n,c,t.autoPad),f=Object.assign({},t);s?Object.assign(f,{kernelShape:n,strides:u,pads:c,dilations:l,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:n,strides:u,pads:c,cacheKey:t.cacheKey});let g=h.slice();return g.push(g.splice(1,1)[0]),[f,i?g:h]},ba=(e,t)=>{let r=t.format==="NHWC",i=A.size(e),a=A.size(t.kernelShape),s=[{type:12,data:i},{type:12,data:a}],n=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],c=t.pads[t.pads.length/2-1],h=t.pads[t.pads.length-1],f=!!(c+h);s.push({type:12,data:u},{type:12,data:l},{type:12,data:c},{type:12,data:h}),n.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];g=!!(w+x),s.push({type:12,data:y},{type:12,data:_},{type:12,data:w},{type:12,data:x}),n.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,n,!0,f,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=A.computeStrides(t.kernelShape);s.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),n.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((c,h)=>c+h);return[s,n,!!l,!1,!1]}},wa=(e,t,r,i,a,s,n,u,l,c,h,f)=>{let g=a.format==="NHWC",y=t.type.value,_=Y("output",t.type.tensor,i);if(a.kernelShape.length<=2){let w="",x="",$="",v=r-(g?2:1);if(h?w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:w=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,a.kernelShape.length===2){let S=r-(g?3:2);f?x=`
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
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${y}(${u});
              var pad = 0;
              ${x}
              ${w}
              ${$}
              ${n}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=a.kernelShape.length,x=a.pads.length,$="";return c?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${y}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${w-1}u; j++) {
                  offsets[j] = offset / ${X("uniforms.kernelStrides","j",w)};
                  offset -= offsets[j] * ${X("uniforms.kernelStrides","j",w)};
                }
                offsets[${w-1}] = offset;

                isPad = false;
                for (var j = ${r-w}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${X("uniforms.strides",`j - ${r-w}u`,w)}
                    + offsets[j - ${r-w}u] - ${X("uniforms.pads","j - 2u",x)};
                  ${$}
              }
              ${n}

              output[global_idx] = value;
            }`}},va=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Ul=e=>`${va(e)};${e.countIncludePad}`,Ll=e=>`${va(e)};${e.storageOrder};${e.dilations}`,$a=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),xa=(e,t,r,i)=>{let[a,s]=_a(t,i,r),n=B("x",t.dataType,t.dims.length),u=n.type.value,l="value += x_val;",c="";a.countIncludePad?c+=`value /= ${u}(uniforms.kernelSize);`:c+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[h,f,g,y,_]=ba(s,a);h.push(...Q(t.dims,s));let w=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${g};${y};${_}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(s)/64)},programUniforms:h}),getShaderSource:x=>wa(x,n,t.dims.length,s.length,a,l,c,0,f,g,y,_)}},Bh=e=>{let t=e.count_include_pad!==0,r=$a(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:Ul(i)}},Dh=(e,t)=>{ci(e.inputs),e.compute(xa("AveragePool",e.inputs[0],!1,t))},Ca={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Nh=e=>{let t=e.format;return{format:t,...Ca,cacheKey:t}},Ph=(e,t)=>{ci(e.inputs),e.compute(xa("GlobalAveragePool",e.inputs[0],!0,t))},Ta=(e,t,r,i)=>{let[a,s]=_a(t,i,r),n=`
      value = max(x_val, value);
    `,u="",l=B("x",t.dataType,t.dims.length),c=["rank"],[h,f,g,y,_]=ba(s,a);return h.push(...Q(t.dims,s)),{name:e,shaderCache:{hint:`${i.cacheKey};${g};${y};${_}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(s)/64)},programUniforms:h}),getShaderSource:w=>wa(w,l,t.dims.length,s.length,a,n,u,t.dataType===10?-65504:-1e5,f,g,y,_)}},Uh=(e,t)=>{ci(e.inputs),e.compute(Ta("MaxPool",e.inputs[0],!1,t))},Lh=e=>{let t=e.storage_order,r=e.dilations,i=$a(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:r,...i,cacheKey:""};return{...a,cacheKey:Ll(a)}},Wh=e=>{let t=e.format;return{format:t,...Ca,cacheKey:t}},Hh=(e,t)=>{ci(e.inputs),e.compute(Ta("GlobalMaxPool",e.inputs[0],!0,t))}}),Wl,Hl,Fh,qh,r0=L(()=>{ie(),se(),Ce(),oe(),Wl=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,s)=>s===t.axis||a===e[0].dims[s]).reduce((a,s)=>a&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Hl=(e,t)=>{let r=A.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,a=i===3,s=e[0].dims,n=e[1].dataType,u=A.size(s),l=i===3||i===2,c=l?[Math.ceil(A.size(e[0].dims)/4)]:e[0].dims,h=e[1].dims,f=e.length>2?e[2]:void 0,g=f?l?[Math.ceil(A.size(f.dims)/4)]:f.dims:void 0,y=h.length===0||h.length===1&&h[0]===1,_=y===!1&&h.length===1,w=$e(u),x=y&&(!l||w===4),$=x?w:1,v=x&&!l?w:1,S=B("input",l?12:i,c.length,v),C=B("scale",n,h.length),I=f?B("zero_point",l?12:i,g.length):void 0,z=Y("output",n,s.length,$),E=[S,C];I&&E.push(I);let O=[c,h];f&&O.push(g);let P=[{type:12,data:u/$},{type:12,data:r},{type:12,data:t.blockSize},...Q(...O,s)],F=V=>{let G=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${V.registerUniforms(G).declareVariables(...E,z)}
      ${V.mainStart()}
          ${V.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${z.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`};

          // Set scale input
          ${y?`let scale_value= ${C.getByOffset("0")}`:_?`
            let scale_index = ${z.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${C.getByOffset("scale_index")};`:`
            var scale_indices: ${C.type.indices} = output_indices;
            let index = ${C.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${C.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${C.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?y?l?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:_?l?`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${C.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${l?a?"i32":"u32":S.type.value}(0);`};
      // Compute and write output
      ${z.setByOffset("global_idx",`${z.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:F,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/$/64),y:1,z:1},programUniforms:P})}},Fh=(e,t)=>{Wl(e.inputs,t),e.compute(Hl(e.inputs,t))},qh=e=>fe({axis:e.axis,blockSize:e.blockSize})}),Fl,ql,Vh,a0=L(()=>{qe(),ie(),oe(),Fl=(e,t,r)=>{let i=e===t,a=e<t&&r<0,s=e>t&&r>0;if(i||a||s)throw new Error("Range these inputs' contents are invalid.")},ql=(e,t,r,i)=>{let a=Math.abs(Math.ceil((t-e)/r)),s=[a],n=a,u=[{type:12,data:n},{type:i,data:e},{type:i,data:r},...Q(s)],l=c=>{let h=Y("output",i,s.length),f=h.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${c.registerUniforms(g).declareVariables(h)}
        ${c.mainStart()}
        ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:u})}},Vh=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),_e.webgpu.validateInputContent&&Fl(t,r,i),e.compute(ql(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),Vl,Gl,Gh,jh,n0=L(()=>{ie(),se(),Ce(),oe(),Vl=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${a}bitcast<${i}>(oldValue) + (${r})${s}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${s}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${s}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${s}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Gl=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r,s=1,n=Math.ceil(A.sizeToDimension(i,i.length-1)/s),u=i[i.length-1],l=A.sizeFromDimension(r,u),c=[{type:12,data:n},{type:12,data:u},{type:12,data:l},...Q(e[1].dims,e[2].dims,a)],h=f=>{let g=B("indices",e[1].dataType,e[1].dims.length),y=B("updates",e[2].dataType,e[2].dims.length,s),_=t.reduction!=="none"&&t.reduction!==""?vc("output",e[0].dataType,a.length):Y("output",e[0].dataType,a.length,s);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,y,_)}
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
    ${Vl(t.reduction,"output[data_offset + i]","value",_.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c}),getShaderSource:h}},Gh=e=>fe({reduction:e.reduction}),jh=(e,t)=>{e.compute(Gl(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),jl,Kl,Zl,Sa,Yl,Xl,Ql,Jl,ed,td,id,rd,Ia,ad,nd,sd,od,ud,Kh,Zh,s0=L(()=>{ie(),se(),Ce(),oe(),jl=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Kl=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((a,s)=>i[a]=e[s]),i},Zl=(e,t,r,i,a,s)=>{let[n,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],c=e[0].dims.length;if(n>0&&e.length>n&&e[n].dims.length>0)e[n].getFloat32Array().forEach(h=>s.push(h));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(h=>i.push(h)),i.length!==0&&i.length!==c&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");jl(i,t),t.axes.length>0&&Kl(i,t.axes,c).forEach((h,f)=>i[f]=h)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(h=>a.push(Number(h))),a.length!==0&&a.length!==c&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof a<"u"&&i.length>0&&a.length>c)throw new Error("Resize requires only of scales or sizes to be specified")},Sa=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Yl=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Sa("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Sa("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Xl=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Ql=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?i:e.slice();return t.length>0?(t.forEach((s,n)=>{i[s]=a[n],i[n+r]=a[t.length+n]}),i):a},Jl=(e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(s=>a.push(s)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((s,n)=>a[s]=r[n])}else r.forEach(s=>a.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((s,n)=>Math.round(s*t[n]))}return a},ed=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(s=>t[s]=i),r.axes.forEach(s=>a[s]=Math.round(e[s]*t[s]))):(t.fill(i,0,t.length),a.forEach((s,n)=>a[n]=Math.round(s*t[n]))),a},td=(e,t,r,i,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${X("uniforms.scales","i",i)};
        var roi_low = ${X("uniforms.roi","i",a)};
        var roi_hi = ${X("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${X("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${X("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,id=(e,t,r,i,a,s,n)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${X("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${X("uniforms.roi","i",s)};
          var roi_hi = ${X("uniforms.roi",`i + ${r.length}`,s)};
          var input_shape_i = ${X("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${X("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${n} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,rd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${X("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Ia=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",ad=(e,t,r,i,a)=>{let[s,n,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",n,`max(0, min(row, ${r[n]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${Ia(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${c} = originalIndices[${n}];
      var col:${c} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[n]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[n]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${c} = getInputValue(batch, channel, row1, col1);
      var x12: ${c} = getInputValue(batch, channel, row1, col2);
      var x21: ${c} = getInputValue(batch, channel, row2, col1);
      var x22: ${c} = getInputValue(batch, channel, row2, col2);
      var dx1: ${c} = abs(row - ${c}(row1));
      var dx2: ${c} = abs(${c}(row2) - row);
      var dy1: ${c} = abs(col - ${c}(col1));
      var dy2: ${c} = abs(${c}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},nd=(e,t,r,i,a,s,n,u,l,c)=>{let h=r.length===2,[f,g]=h?[0,1]:[2,3],y=e.type.value,_=w=>{let x=w===f?"row":"col";return`
      fn ${x}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",w)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[w]},
        ${i[w]}, ${r[w]}, ${s[w]}, ${s[w]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[w]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${x}: ${y} = originalIdx + ${y}(i);
          if (${x} < 0 || ${x} >= ${r[w]}) {
            ${c?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${x} = max(0, min(${x}, ${r[w]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",w,`u32(${x})`)};
          data[i + 1] = ${w===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(f)};
    ${_(g)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${n} * onePlusAbsS - 5 * ${n}) * onePlusAbsS + 8 * ${n}) * onePlusAbsS - 4 * ${n};
    coeffs[1] = ((${n} + 2) * absS - (${n} + 3)) * absS * absS + 1;
    coeffs[2] = ((${n} + 2) * oneMinusAbsS - (${n} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${n} * twoMinusAbsS - 5 * ${n}) * twoMinusAbsS + 8 * ${n}) * twoMinusAbsS - 4 * ${n};
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
    `},sd=(e,t,r,i,a)=>{let[s,n,u,l,c]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",n,`max(0, min(depth, ${r[n]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${Ia(e,c,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${n}];
      var height:${h} = originalIndices[${u}];
      var width:${h} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[n]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[n]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

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
    }`},od=(e,t,r,i,a,s)=>{let n=e.dims,u=Ql(s,t.axes,n.length),l=Jl(n,i,a,t.axes),c=i.slice();i.length===0&&(c=n.map((v,S)=>v===0?1:l[S]/v),t.keepAspectRatioPolicy!=="stretch"&&(l=ed(n,c,t)));let h=Y("output",e.dataType,l.length),f=B("input",e.dataType,n.length),g=A.size(l),y=n.length===l.length&&n.every((v,S)=>v===l[S]),_=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,x=f.type.value,$=v=>`
      ${y?"":`
      ${Yl(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${rd(f,n)};
              ${Xl(t.nearestMode,r,x)};
              ${id(f,h,n,l,c.length,u.length,_)};
              `;case"linear":return`
              ${td(h,n,l,c.length,u.length)};
              ${(()=>{if(n.length===2||n.length===4)return`${ad(f,h,n,_,w)}`;if(n.length===3||n.length===5)return`${sd(f,h,n,_,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(n.length===2||n.length===4)return`${nd(f,h,n,l,c,u,t.cubicCoeffA,_,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",c.length).registerUniform("roi","f32",u.length).declareVariables(f,h)}
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
                }`;case"linear":return`output[global_idx] = ${n.length===2||n.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${c.length>0?t.mode==="cubic"?c:c.length:""}|${a.length>0?a:""}|${u.length>0?u:""}|${y}|${t.mode==="nearest"?n.length:n}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:c},{type:1,data:u},...Q(n,l)]})}},ud=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Kh=(e,t)=>{let r=[],i=[],a=[],s=ud(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Zl(e.inputs,t,s,r,i,a),e.compute(od(e.inputs[0],t,s,r,i,a),{inputs:[0]})},Zh=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,s=e.excludeOutside!==0,n=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,c=e.nearestMode===""?"simple":e.nearestMode;return fe({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:s,extrapolationValue:n,keepAspectRatioPolicy:u,mode:l,nearestMode:c})}}),ld,dd,Yh,o0=L(()=>{ie(),se(),oe(),ld=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let n=e[3];if(n.dims.length!==1)throw new Error("Beta must be 1D");if(n.dims[n.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let n=e[4];if(n.dims.length!==1)throw new Error("Bias must be 1D");if(n.dims[n.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},dd=(e,t,r,i)=>{let a=t.simplified,s=e[0].dims,n=A.size(s),u=s,l=n,c=s.slice(-1)[0],h=i?s.slice(0,-1).concat(1):[],f=!a&&e.length>3,g=e.length>4,y=i&&r>1,_=i&&r>2,w=r>3,x=64,$=$e(c),v=[{type:12,data:l},{type:12,data:$},{type:12,data:c},{type:1,data:t.epsilon}],S=I=>{let z=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],E=[B("x",e[0].dataType,e[0].dims,$),B("skip",e[1].dataType,e[1].dims,$),B("gamma",e[2].dataType,e[2].dims,$)];f&&E.push(B("beta",e[3].dataType,e[3].dims,$)),g&&E.push(B("bias",e[4].dataType,e[4].dims,$)),E.push(Y("output",e[0].dataType,u,$)),y&&E.push(Y("mean_output",1,h)),_&&E.push(Y("inv_std_output",1,h)),w&&E.push(Y("input_skip_bias_sum",e[0].dataType,u,$));let O=Ee(e[0].dataType),P=Ee(1,$);return`

      ${I.registerUniforms(z).declareVariables(...E)}
      var<workgroup> sum_shared : array<${P}, ${x}>;
      var<workgroup> sum_squared_shared : array<${P}, ${x}>;

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
          let bias_value = ${g?"bias[offset1d + i]":O+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${jt(O,$,"value")};
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
        let mean = ${xt("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${xt("square_sum",$)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${_?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${O}(mean)`}) *
            ${O}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},C=[{dims:u,dataType:e[0].dataType}];return r>1&&C.push({dims:h,dataType:1}),r>2&&C.push({dims:h,dataType:1}),r>3&&C.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${y};${_};${w}`,inputDependencies:e.map((I,z)=>"type")},getShaderSource:S,getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(l/c)},programUniforms:v})}},Yh=(e,t)=>{ld(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(dd(e.inputs,t,e.outputCount,!1),{outputs:r})}}),cd,pi,pd,ka,hd,fd,Xh,Qh,u0=L(()=>{ie(),se(),Ce(),oe(),cd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},pi=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},pd=(e,t)=>{if(e.length>1){let r=pi(e,1),i=pi(e,2),a=pi(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),fe({starts:r,ends:i,axes:a})}else return t},ka=(e,t,r,i,a)=>{let s=e;return e<0&&(s+=r[i[t]]),a[t]<0?Math.max(0,Math.min(s,r[i[t]]-1)):Math.max(0,Math.min(s,r[i[t]]))},hd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${X("uniforms.input_shape","i",r.length)};
            let steps_i = ${X("uniforms.steps","i",r.length)};
            let signs_i = ${X("uniforms.signs","i",r.length)};
            let starts_i = ${X("uniforms.starts","i",r.length)};
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
      }`,fd=(e,t)=>{let r=e[0].dims,i=A.size(r),a=t.axes.length>0?A.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],s=pi(e,4);s.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(a.length).fill(1));let n=t.starts.map(($,v)=>ka($,v,r,a,s)),u=t.ends.map(($,v)=>ka($,v,r,a,s));if(a.length!==n.length||a.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let $=0;$<r.length;++$)a.includes($)||(n.splice($,0,0),u.splice($,0,r[$]),s.splice($,0,1));let l=s.map($=>Math.sign($));s.forEach(($,v,S)=>{if($<0){let C=(u[v]-n[v])/$,I=n[v],z=I+C*s[v];n[v]=z,u[v]=I,S[v]=-$}});let c=r.slice(0);a.forEach(($,v)=>{c[$]=Math.ceil((u[$]-n[$])/s[$])});let h={dims:c,dataType:e[0].dataType},f=Y("output",e[0].dataType,c.length),g=B("input",e[0].dataType,e[0].dims.length),y=A.size(c),_=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:n.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:s.length}],w=[{type:12,data:y},{type:12,data:n},{type:6,data:l},{type:12,data:s},...Q(e[0].dims,c)],x=$=>`
      ${$.registerUniforms(_).declareVariables(g,f)}
        ${hd(g,f,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${n.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[h],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:w})}},Xh=(e,t)=>{cd(e.inputs,t);let r=pd(e.inputs,t);e.compute(fd(e.inputs,r),{inputs:[0]})},Qh=e=>{let t=e.starts,r=e.ends,i=e.axes;return fe({starts:t,ends:r,axes:i})}}),md,gd,Jh,ef,l0=L(()=>{ie(),se(),Ce(),Ct(),oe(),md=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},gd=(e,t)=>{let r=e.inputs[0],i=r.dims,a=A.size(i),s=i.length,n=A.normalizeAxis(t.axis,s),u=n<i.length-1,l,c=[];u?(c=Array.from({length:s},(E,O)=>O),c[n]=s-1,c[s-1]=n,l=e.compute(We(r,c),{inputs:[r],outputs:[-1]})[0]):l=r;let h=l.dims,f=h[s-1],g=a/f,y=$e(f),_=f/y,w=64;g===1&&(w=256);let x=(E,O)=>O===4?`max(max(${E}.x, ${E}.y), max(${E}.z, ${E}.w))`:O===2?`max(${E}.x, ${E}.y)`:O===3?`max(max(${E}.x, ${E}.y), ${E}.z)`:E,$=B("x",l.dataType,l.dims,y),v=Y("result",l.dataType,l.dims,y),S=$.type.value,C=Ee(l.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,I=E=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${w}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${E.registerUniform("packedCols","i32").declareVariables($,v)}
      ${E.mainStart(w)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${w};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${C}
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
          rowSumShared = ${S}(${xt("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${S}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,z=e.compute({name:"Softmax",shaderCache:{hint:`${y};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:l.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:_}]}),getShaderSource:I},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(We(z,c),{inputs:[z]})},Jh=(e,t)=>{md(e.inputs),gd(e,t)},ef=e=>fe({axis:e.axis})}),Ea,yd,_d,bd,tf,d0=L(()=>{ie(),se(),oe(),Ea=e=>Array.from(e.getBigInt64Array(),Number),yd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ea(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},_d=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},bd=(e,t)=>{let r=e[0].dims,i=t??Ea(e[1]),a=_d(r,i),s=A.size(a),n=e[0].dataType,u=B("input",n,r.length),l=Y("output",n,a.length),c=h=>`
      const inputShape = ${u.indices(...r)};
      ${h.registerUniform("output_size","u32").declareVariables(u,l)}
      ${h.mainStart()}
      ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...Q(e[0].dims,a)]}),getShaderSource:c}},tf=e=>{yd(e.inputs),e.compute(bd(e.inputs),{inputs:[0]})}}),wd,vd,rf,c0=L(()=>{ie(),se(),oe(),wd=(e,t,r,i,a)=>{let s=Y("output_data",a,r.length,4),n=B("a_data",t[1].dataType,t[1].dims.length,4),u=B("b_data",t[2].dataType,t[2].dims.length,4),l=B("c_data",t[0].dataType,t[0].dims.length,4),c,h=(f,g,y)=>`select(${g}, ${f}, ${y})`;if(!i)c=s.setByOffset("global_idx",h(n.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let f=(g,y,_="")=>{let w=`a_data[index_a${y}][component_a${y}]`,x=`b_data[index_b${y}][component_b${y}]`,$=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${s.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${n.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_b${y} = ${u.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_c${y} = ${l.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${g}[${y}] = ${_}(${h(w,x,$)});
          `};a===9?c=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:c=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,n,u,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${c}
      }`},vd=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,s=!(A.areEqual(t,r)&&A.areEqual(r,i)),n=t,u=A.size(t);if(s){let c=Kt.calcShape(Kt.calcShape(t,r,!1),i,!1);if(!c)throw new Error("Can't perform where op on the given tensors");n=c,u=A.size(n)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:c=>wd(c,e,n,s,a),getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...Q(i,t,r,n)]})}},rf=e=>{e.compute(vd(e.inputs))}}),af,p0=L(()=>{Sg(),Tn(),Ig(),kg(),Eg(),zg(),Ag(),Dg(),Pg(),Ug(),Lg(),Wg(),Hg(),Fg(),qg(),Vg(),Gg(),jg(),Kg(),Zg(),Yg(),Xg(),Qg(),Jg(),e0(),$h(),t0(),i0(),r0(),a0(),n0(),Cn(),s0(),Ih(),o0(),u0(),l0(),Th(),d0(),Ct(),Sn(),c0(),af=new Map([["Abs",[Yc]],["Acos",[Xc]],["Acosh",[Qc]],["Add",[Mp]],["ArgMax",[Gc,Ka]],["ArgMin",[Vc,Ka]],["Asin",[Jc]],["Asinh",[ep]],["Atan",[tp]],["Atanh",[ip]],["Attention",[jc]],["AveragePool",[Dh,Bh]],["BatchNormalization",[Kc]],["BiasAdd",[Zc]],["BiasSplitGelu",[Ap]],["Cast",[ap,rp]],["Ceil",[sp]],["Clip",[np]],["Concat",[Hp,Fp]],["Conv",[en,Ja]],["ConvTranspose",[Jp,Qp]],["Cos",[op]],["Cosh",[up]],["CumSum",[eh,th]],["DepthToSpace",[ih,rh]],["DequantizeLinear",[Fh,qh]],["Div",[Op]],["Einsum",[ah,nh]],["Elu",[lp,yi]],["Equal",[Rp]],["Erf",[dp]],["Exp",[cp]],["Expand",[sh]],["FastGelu",[oh]],["Floor",[pp]],["FusedConv",[en,Ja]],["Gather",[lh,uh]],["GatherElements",[mh,fh]],["GatherBlockQuantized",[ph,hh]],["GatherND",[dh,ch]],["Gelu",[hp]],["Gemm",[yh,gh]],["GlobalAveragePool",[Ph,Nh]],["GlobalMaxPool",[Hh,Wh]],["Greater",[Pp]],["GreaterOrEqual",[Lp]],["GridSample",[_h,bh]],["GroupQueryAttention",[kh]],["HardSigmoid",[vp,wp]],["InstanceNormalization",[Eh]],["LayerNormalization",[zh]],["LeakyRelu",[fp,yi]],["Less",[Up]],["LessOrEqual",[Wp]],["Log",[Ep]],["MatMul",[Ah]],["MatMulNBits",[Mh,Oh]],["MaxPool",[Uh,Lh]],["Mul",[Bp]],["MultiHeadAttention",[vh,wh]],["Neg",[gp]],["Not",[mp]],["Pad",[Rh]],["Pow",[Dp]],["QuickGelu",[zp,yi]],["Range",[Vh]],["Reciprocal",[yp]],["ReduceMin",[Lc]],["ReduceMean",[Bc]],["ReduceMax",[Uc]],["ReduceSum",[Hc]],["ReduceProd",[Wc]],["ReduceL1",[Dc]],["ReduceL2",[Nc]],["ReduceLogSum",[qc]],["ReduceLogSumExp",[Pc]],["ReduceSumSquare",[Fc]],["Relu",[_p]],["Resize",[Kh,Zh]],["RotaryEmbedding",[Sh]],["ScatterND",[jh,Gh]],["Sigmoid",[bp]],["Sin",[$p]],["Sinh",[xp]],["Slice",[Xh,Qh]],["SkipLayerNormalization",[Yh]],["Split",[xh,Ch]],["Sqrt",[Cp]],["Softmax",[Jh,ef]],["Sub",[Np]],["Tan",[Tp]],["Tanh",[Sp]],["ThresholdedRelu",[kp,yi]],["Tile",[tf]],["Transpose",[xc,Cc]],["Where",[rf]]])}),nf,h0=L(()=>{qe(),ht(),oe(),nf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){rt(e.programInfo.name);let s=this.backend.device,n=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let c of t)u.push({binding:u.length,resource:{buffer:c.buffer}});for(let c of r)u.push({binding:u.length,resource:{buffer:c.buffer}});a&&u.push({binding:u.length,resource:a});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let c={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(c)}n.setPipeline(e.computePipeline),n.setBindGroup(0,l),n.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Xe(e.programInfo.name)}dispose(){}build(e,t){rt(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(c=>{r.features.has(c.feature)&&i.push(`enable ${c.extension};`)});let a=$c(t,this.backend.device.limits),s=e.getShaderSource(a),n=`${i.join(`
`)}
${a.additionalImplementations}
${s}`,u=r.createShaderModule({code:n,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${n}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Xe(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let s=t*r*i,n=Math.ceil(Math.sqrt(s));if(n>a){if(n=Math.ceil(Math.cbrt(s)),n>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[n,n,n]}else return[n,n,1]}}}),sf={};Yt(sf,{WebGpuBackend:()=>of});var $d,xd,Cd,of,f0=L(()=>{qe(),ie(),ht(),yc(),Cg(),p0(),h0(),$d=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let s=e[i].dims.length;r.push(`${a};${s}`);break}case"dims":{let s=e[i].dims.join(",");r.push(`${a};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},xd=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${$d(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Cd=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},of=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=s=>t.features.has(s)&&r.push(s)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new Cd(t.info||await t.requestAdapterInfo()),this.gpuDataManager=wc(this),this.programManager=new nf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,wn(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;rt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=r[i],s=a.kernelId,n=this.kernels.get(s),u=n.kernelType,l=n.kernelName,c=a.programName,h=a.inputTensorViews,f=a.outputTensorViews,g=t[i*2],y=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),w=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(w))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map(x=>({dims:x.dims,dataType:ct(x.dataType)})),outputsMetadata:f.map(x=>({dims:x.dims,dataType:ct(x.dataType)})),kernelId:s,kernelType:u,kernelName:l,programName:c,startTime:_,endTime:w});else{let x="";h.forEach((v,S)=>{x+=`input[${S}]: [${v.dims}] | ${ct(v.dataType)}, `});let $="";f.forEach((v,S)=>{$+=`output[${S}]: [${v.dims}] | ${ct(v.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${l}|${c}" ${x}${$}start time: ${_} ns, execution time: ${w-_} ns`)}rr("GPU",`${c}::${g}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),Xe()}run(e,t,r,i,a,s){rt(e.name);let n=[];for(let v=0;v<t.length;++v){let S=t[v].data;if(S===0)continue;let C=this.gpuDataManager.get(S);if(!C)throw new Error(`no GPU data for input: ${S}`);n.push(C)}let{outputs:u,dispatchGroup:l,programUniforms:c}=e.getRunData(t),h=r.length===0?u.map((v,S)=>S):r;if(h.length!==u.length)throw new Error(`Output size ${h.length} must be equal to ${u.length}.`);let f=[],g=[];for(let v=0;v<u.length;++v){if(!Number.isInteger(h[v])||h[v]<-3||h[v]>=s)throw new Error(`Invalid output index: ${h[v]}`);if(h[v]===-3)continue;let S=h[v]===-1,C=h[v]===-2,I=S||C?a(u[v].dataType,u[v].dims):i(h[v],u[v].dataType,u[v].dims);if(f.push(I),I.data===0)continue;let z=this.gpuDataManager.get(I.data);if(!z)throw new Error(`no GPU data for output: ${I.data}`);if(S&&this.temporaryData.push(z),C){let E=this.kernelPersistentData.get(this.currentKernelId);E||(E=[],this.kernelPersistentData.set(this.currentKernelId,E)),E.push(z)}g.push(z)}if(n.length!==t.length||g.length!==f.length){if(g.length===0)return Xe(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(c){let v=0,S=[];c.forEach(E=>{let O=typeof E.data=="number"?[E.data]:E.data;if(O.length===0)return;let P=E.type===10?2:4,F,V;E.type===10?(V=O.length>4?16:O.length>2?8:O.length*P,F=O.length>4?16:P*O.length):(V=O.length<=2?O.length*P:16,F=16),v=Math.ceil(v/V)*V,S.push(v);let G=E.type===10?8:4;v+=O.length>4?Math.ceil(O.length/G)*F:O.length*P});let C=16;v=Math.ceil(v/C)*C;let I=new ArrayBuffer(v);c.forEach((E,O)=>{let P=S[O],F=typeof E.data=="number"?[E.data]:E.data;if(E.type===6)new Int32Array(I,P,F.length).set(F);else if(E.type===12)new Uint32Array(I,P,F.length).set(F);else if(E.type===10)new Uint16Array(I,P,F.length).set(F);else if(E.type===1)new Float32Array(I,P,F.length).set(F);else throw new Error(`Unsupported uniform type: ${ct(E.type)}`)});let z=this.gpuDataManager.create(v,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(z.buffer,0,I,0,v),this.gpuDataManager.release(z.id),y={offset:0,size:v,buffer:z.buffer}}let _=this.programManager.normalizeDispatchGroupSize(l),w=_[1]===1&&_[2]===1,x=xd(e,t,w),$=this.programManager.getArtifact(x);if($||($=this.programManager.build(e,_),this.programManager.setArtifact(x,$),de("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),c&&$.uniformVariablesInfo){if(c.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${c.length} in program "${$.programInfo.name}".`);for(let v=0;v<c.length;v++){let S=c[v],C=S.type,I=typeof S.data=="number"?1:S.data.length,[z,E]=$.uniformVariablesInfo[v];if(C!==z||I!==E)throw new Error(`Uniform variable ${v} mismatch: expect type ${z} with size ${E}, got type ${C} with size ${I} in program "${$.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let v={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(v),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(v)}return this.programManager.run($,n,g,_,y),Xe(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=af.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let a=i.kernelType,s=i.kernelName,n=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),n(t,u[1]),0}catch(c){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${c}`)),1}finally{l&&r.push(this.device.popErrorScope().then(c=>c?`GPU validation error for kernel "[${a}] ${s}": ${c.message}`:null));for(let c of this.temporaryData)this.gpuDataManager.release(c.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let s=a.get(t),n=this.gpuDataManager.registerExternalBuffer(r,i,s);return a.set(t,[n,r]),n}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Va(this,e,t);return vn(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let a=this.getComputePassEncoder(),s=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),uf={};Yt(uf,{init:()=>lf});var Zi,Td,lf,m0=L(()=>{ie(),ht(),se(),xg(),Zi=class df{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(A.size(t)!==A.size(this.dims))throw new Error("Invalid new shape");return new df(this.module,this.dataType,this.data,t)}},Td=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,s=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,s));let n=Number(e.getValue(i*a++,s));this.outputCount=Number(e.getValue(i*a++,s)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,s));let u=[];for(let l=0;l<n;l++){let c=Number(e.getValue(i*a++,s)),h=Number(e.getValue(i*a++,"*")),f=Number(e.getValue(i*a++,s)),g=[];for(let y=0;y<f;y++)g.push(Number(e.getValue(i*a++,s)));u.push(new Zi(e,c,h,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(n=>typeof n=="number"?this.inputs[n]:n)??this.inputs,i=t?.outputs??[],a=(n,u,l)=>new Zi(this.module,u,this.output(n,l),l),s=(n,u)=>{let l=Dt(n,u);if(!l)throw new Error(`Unsupported data type: ${n}`);let c=l>0?this.backend.gpuDataManager.create(l).id:0;return new Zi(this.module,n,c,u)};return this.backend.run(e,r,i,a,s,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=i===4?"i32":"i64",s=this.module.stackAlloc((1+t.length)*i);this.module.setValue(s,t.length,a);for(let n=0;n<t.length;n++)this.module.setValue(s+i*(n+1),t[n],a);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},lf=async(e,t,r,i)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=(f0(),Si(sf)).WebGpuBackend,n=new s;await n.initialize(r,i),a("webgpu",[n,u=>n.alloc(Number(u)),u=>n.free(u),(u,l,c,h=!1)=>{if(h)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(c)}`),n.memcpy(Number(u),Number(l));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(c)}`);let f=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(c));n.upload(Number(l),f)}},async(u,l,c)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${c}`),await n.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+c)>>>0))},(u,l,c)=>n.createKernel(u,Number(l),c,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>n.releaseKernel(u),(u,l,c,h)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${c}, kernel=${u}, contextDataOffset=${l}`);let f=new Td(t,n,Number(l));return n.computeKernel(Number(u),f,h)},()=>n.captureBegin(),()=>n.captureEnd(),()=>n.replay()])}else{let s=new bc(r);a("webnn",[s,()=>s.reserveTensorId(),n=>s.releaseTensorId(n),async(n,u,l,c,h)=>s.ensureTensor(n,u,l,c,h),(n,u)=>{s.uploadTensor(n,u)},async(n,u)=>s.downloadTensor(n,u),(n,u)=>s.registerMLContext(n,u),!!r.trace])}}}),Sd,Mn,On,wt,Id,za,dr,Rn,Bn,Aa,Dn,Nn,Pn,cf=L(()=>{qe(),wg(),vg(),ie(),Ht(),gn(),hc(),Sd=(e,t)=>{ye()._OrtInit(e,t)!==0&&me("Can't initialize onnxruntime.")},Mn=async e=>{Sd(e.wasm.numThreads,nr(e.logLevel))},On=async(e,t)=>{ye().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(m0(),Si(uf)).init;t==="webgpu"&&await i("webgpu",ye(),e,r),t==="webnn"&&await i("webnn",ye(),e)}},wt=new Map,Id=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&me("Can't get session input/output count.");let s=i===4?"i32":"i64";return[Number(t.getValue(a,s)),Number(t.getValue(a+i,s))]}finally{t.stackRestore(r)}},za=(e,t)=>{let r=ye(),i=r.stackSave(),a=0;try{let s=r.PTR_SIZE,n=r.stackAlloc(2*s);r._OrtGetInputOutputMetadata(e,t,n,n+s)!==0&&me("Can't get session input/output metadata.");let u=Number(r.getValue(n,"*"));a=Number(r.getValue(n+s,"*"));let l=r.HEAP32[a/4];if(l===0)return[u,0];let c=r.HEAPU32[a/4+1],h=[];for(let f=0;f<c;f++){let g=Number(r.getValue(a+8+f*s,"*"));h.push(g!==0?r.UTF8ToString(g):Number(r.getValue(a+8+(f+c)*s,"*")))}return[u,l,h]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},dr=e=>{let t=ye(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Rn=async(e,t)=>{let r,i,a=ye();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=dr(e);let s=0,n=0,u=0,l=[],c=[],h=[];try{if([n,l]=await pc(t),t?.externalData&&a.mountExternalData){let C=[];for(let I of t.externalData){let z=typeof I=="string"?I:I.path;C.push(bn(typeof I=="string"?I:I.data).then(E=>{a.mountExternalData(z,E)}))}await Promise.all(C)}for(let C of t?.executionProviders??[])if((typeof C=="string"?C:C.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof C!="string"){let I=C,z=I?.context,E=I?.gpuDevice,O=I?.deviceType,P=I?.powerPreference;z?a.currentContext=z:E?a.currentContext=await a.webnnCreateMLContext(E):a.currentContext=await a.webnnCreateMLContext({deviceType:O,powerPreference:P})}else a.currentContext=await a.webnnCreateMLContext();break}s=await a._OrtCreateSession(r,i,n),a.webgpuOnCreateSession?.(s),s===0&&me("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(s,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[f,g]=Id(s),y=!!t?.enableGraphCapture,_=[],w=[],x=[],$=[],v=[];for(let C=0;C<f;C++){let[I,z,E]=za(s,C);I===0&&me("Can't get an input name."),c.push(I);let O=a.UTF8ToString(I);_.push(O),x.push(z===0?{name:O,isTensor:!1}:{name:O,isTensor:!0,type:ct(z),shape:E})}for(let C=0;C<g;C++){let[I,z,E]=za(s,C+f);I===0&&me("Can't get an output name."),h.push(I);let O=a.UTF8ToString(I);w.push(O),$.push(z===0?{name:O,isTensor:!1}:{name:O,isTensor:!0,type:ct(z),shape:E});{if(y&&t?.preferredOutputLocation===void 0){v.push("gpu-buffer");continue}let P=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[O]??"cpu",F=a.webnnIsGraphOutput;if(P==="cpu"&&F&&F(s,O)){v.push("ml-tensor-cpu-output");continue}if(P!=="cpu"&&P!=="cpu-pinned"&&P!=="gpu-buffer"&&P!=="ml-tensor")throw new Error(`Not supported preferred output location: ${P}.`);if(y&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);v.push(P)}}let S=null;return v.some(C=>C==="gpu-buffer"||C==="ml-tensor"||C==="ml-tensor-cpu-output")&&(u=a._OrtCreateBinding(s),u===0&&me("Can't create IO binding."),S={handle:u,outputPreferredLocations:v,outputPreferredLocationsEncoded:v.map(C=>C==="ml-tensor-cpu-output"?"ml-tensor":C).map(C=>Fa(C))}),wt.set(s,[s,c,h,S,y,!1]),[s,_,w,x,$]}catch(f){throw c.forEach(g=>a._OrtFree(g)),h.forEach(g=>a._OrtFree(g)),u!==0&&a._OrtReleaseBinding(u)!==0&&me("Can't release IO binding."),s!==0&&a._OrtReleaseSession(s)!==0&&me("Can't release session."),f}finally{a._free(r),n!==0&&a._OrtReleaseSessionOptions(n)!==0&&me("Can't release session options."),l.forEach(f=>a._free(f)),a.unmountExternalData?.()}},Bn=e=>{let t=ye(),r=wt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,s,n,u]=r;n&&(u&&t._OrtClearBoundOutputs(n.handle)!==0&&me("Can't clear bound outputs."),t._OrtReleaseBinding(n.handle)!==0&&me("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(l=>t._OrtFree(l)),s.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&me("Can't release session."),wt.delete(e)},Aa=async(e,t,r,i,a,s,n=!1)=>{if(!e){t.push(0);return}let u=ye(),l=u.PTR_SIZE,c=e[0],h=e[1],f=e[3],g=f,y,_;if(c==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(n&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let $=e[2].gpuBuffer;_=Dt(Bt(c),h);{let v=u.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=v(i,s,$,_)}}else if(f==="ml-tensor"){let $=e[2].mlTensor;_=Dt(Bt(c),h);let v=u.webnnRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=v(i,$,Bt(c),h)}else{let $=e[2];if(Array.isArray($)){_=l*$.length,y=u._malloc(_),r.push(y);for(let v=0;v<$.length;v++){if(typeof $[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);u.setValue(y+v*l,Ye($[v],r),"*")}}else{let v=u.webnnIsGraphInput,S=u.webnnIsGraphOutput;if(c!=="string"&&v&&S){let C=u.UTF8ToString(a);if(v(i,C)||S(i,C)){let I=Bt(c);_=Dt(I,h),g="ml-tensor";let z=u.webnnCreateTemporaryTensor,E=u.webnnUploadTensor;if(!z||!E)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let O=await z(i,I,h);E(O,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),y=O}else _=$.byteLength,y=u._malloc(_),r.push(y),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),y)}else _=$.byteLength,y=u._malloc(_),r.push(y),u.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),y)}}let w=u.stackSave(),x=u.stackAlloc(4*h.length);try{h.forEach((v,S)=>u.setValue(x+S*l,v,l===4?"i32":"i64"));let $=u._OrtCreateTensor(Bt(c),y,_,x,h.length,Fa(g));$===0&&me(`Can't create tensor for input/output. session=${i}, index=${s}.`),t.push($)}finally{u.stackRestore(w)}},Dn=async(e,t,r,i,a,s)=>{let n=ye(),u=n.PTR_SIZE,l=wt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let c=l[0],h=l[1],f=l[2],g=l[3],y=l[4],_=l[5],w=t.length,x=i.length,$=0,v=[],S=[],C=[],I=[],z=n.stackSave(),E=n.stackAlloc(w*u),O=n.stackAlloc(w*u),P=n.stackAlloc(x*u),F=n.stackAlloc(x*u);try{[$,v]=cc(s),Nt("wasm prepareInputOutputTensor");for(let q=0;q<w;q++)await Aa(r[q],S,I,e,h[t[q]],t[q],y);for(let q=0;q<x;q++)await Aa(a[q],C,I,e,f[i[q]],w+i[q],y);Pt("wasm prepareInputOutputTensor");for(let q=0;q<w;q++)n.setValue(E+q*u,S[q],"*"),n.setValue(O+q*u,h[t[q]],"*");for(let q=0;q<x;q++)n.setValue(P+q*u,C[q],"*"),n.setValue(F+q*u,f[i[q]],"*");if(g&&!_){let{handle:q,outputPreferredLocations:ae,outputPreferredLocationsEncoded:J}=g;if(h.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${h.length}).`);Nt("wasm bindInputsOutputs");for(let K=0;K<w;K++){let ne=t[K];await n._OrtBindInput(q,h[ne],S[K])!==0&&me(`Can't bind input[${K}] for session=${e}.`)}for(let K=0;K<x;K++){let ne=i[K];a[K]?.[3]?n._OrtBindOutput(q,f[ne],C[K],0)!==0&&me(`Can't bind pre-allocated output[${K}] for session=${e}.`):n._OrtBindOutput(q,f[ne],0,J[ne])!==0&&me(`Can't bind output[${K}] to ${ae[K]} for session=${e}.`)}Pt("wasm bindInputsOutputs"),wt.set(e,[c,h,f,g,y,!0])}n.jsepOnRunStart?.(c),n.webnnOnRunStart?.(c);let V;g?V=await n._OrtRunWithBinding(c,g.handle,x,P,$):V=await n._OrtRun(c,O,E,w,F,x,P,$),V!==0&&me("failed to call OrtRun().");let G=[],ee=[];Nt("wasm ProcessOutputTensor");for(let q=0;q<x;q++){let ae=Number(n.getValue(P+q*u,"*"));if(ae===C[q]){G.push(a[q]);continue}let J=n.stackSave(),K=n.stackAlloc(4*u),ne=!1,j,ge=0;try{n._OrtGetTensorData(ae,K,K+u,K+2*u,K+3*u)!==0&&me(`Can't access output tensor data on index ${q}.`);let U=u===4?"i32":"i64",H=Number(n.getValue(K,U));ge=n.getValue(K+u,"*");let re=n.getValue(K+u*2,"*"),ce=Number(n.getValue(K+u*3,U)),D=[];for(let be=0;be<ce;be++)D.push(Number(n.getValue(re+be*u,U)));n._OrtFree(re)!==0&&me("Can't free memory for tensor dims.");let le=D.reduce((be,we)=>be*we,1);j=ct(H);let Qe=g?.outputPreferredLocations[i[q]];if(j==="string"){if(Qe==="gpu-buffer"||Qe==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let be=[];for(let we=0;we<le;we++){let Te=n.getValue(ge+we*u,"*"),ki=n.getValue(ge+(we+1)*u,"*"),Xt=we===le-1?void 0:ki-Te;be.push(n.UTF8ToString(Te,Xt))}G.push([j,D,be,"cpu"])}else if(Qe==="gpu-buffer"&&le>0){let be=n.jsepGetBuffer;if(!be)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let we=be(ge),Te=Dt(H,le);if(Te===void 0||!yn(j))throw new Error(`Unsupported data type: ${j}`);ne=!0,G.push([j,D,{gpuBuffer:we,download:n.jsepCreateDownloader(we,Te,j),dispose:()=>{n._OrtReleaseTensor(ae)!==0&&me("Can't release tensor.")}},"gpu-buffer"])}else if(Qe==="ml-tensor"&&le>0){let be=n.webnnEnsureTensor,we=n.webnnIsGraphInputOutputTypeSupported;if(!be||!we)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Dt(H,le)===void 0||!_n(j))throw new Error(`Unsupported data type: ${j}`);if(!we(e,j,!1))throw new Error(`preferredLocation "ml-tensor" for ${j} output is not supported by current WebNN Context.`);let Te=await be(e,ge,H,D,!1);ne=!0,G.push([j,D,{mlTensor:Te,download:n.webnnCreateMLTensorDownloader(ge,j),dispose:()=>{n.webnnReleaseTensorId(ge),n._OrtReleaseTensor(ae)}},"ml-tensor"])}else if(Qe==="ml-tensor-cpu-output"&&le>0){let be=n.webnnCreateMLTensorDownloader(ge,j)(),we=G.length;ne=!0,ee.push((async()=>{let Te=[we,await be];return n.webnnReleaseTensorId(ge),n._OrtReleaseTensor(ae),Te})()),G.push([j,D,[],"cpu"])}else{let be=pr(j),we=new be(le);new Uint8Array(we.buffer,we.byteOffset,we.byteLength).set(n.HEAPU8.subarray(ge,ge+we.byteLength)),G.push([j,D,we,"cpu"])}}finally{n.stackRestore(J),j==="string"&&ge&&n._free(ge),ne||n._OrtReleaseTensor(ae)}}g&&!y&&(n._OrtClearBoundOutputs(g.handle)!==0&&me("Can't clear bound outputs."),wt.set(e,[c,h,f,g,y,!1]));for(let[q,ae]of await Promise.all(ee))G[q][2]=ae;return Pt("wasm ProcessOutputTensor"),G}finally{n.webnnOnRunEnd?.(c),n.stackRestore(z),S.forEach(V=>n._OrtReleaseTensor(V)),C.forEach(V=>n._OrtReleaseTensor(V)),I.forEach(V=>n._free(V)),$!==0&&n._OrtReleaseRunOptions($),v.forEach(V=>n._free(V))}},Nn=e=>{let t=ye(),r=wt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&me("Can't get an profile file name."),t._OrtFree(a)},Pn=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),vt,Fe,Vt,hi,fi,Yi,Ma,Xi,zt,At,kd,pf,hf,ff,mf,gf,yf,_f,bf=L(()=>{qe(),cf(),Ht(),fn(),vt=()=>!!_e.wasm.proxy&&typeof document<"u",Vt=!1,hi=!1,fi=!1,Xi=new Map,zt=(e,t)=>{let r=Xi.get(e);r?r.push(t):Xi.set(e,[t])},At=()=>{if(Vt||!hi||fi||!Fe)throw new Error("worker not ready")},kd=e=>{switch(e.data.type){case"init-wasm":Vt=!1,e.data.err?(fi=!0,Ma[1](e.data.err)):(hi=!0,Ma[0]()),Yi&&(URL.revokeObjectURL(Yi),Yi=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Xi.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},pf=async()=>{if(!hi){if(Vt)throw new Error("multiple calls to 'initWasm()' detected.");if(fi)throw new Error("previous call to 'initWasm()' failed.");if(Vt=!0,vt())return new Promise((e,t)=>{Fe?.terminate(),lc().then(([r,i])=>{try{Fe=i,Fe.onerror=s=>t(s),Fe.onmessage=kd,Ma=[e,t];let a={type:"init-wasm",in:_e};!a.in.wasm.wasmPaths&&(r||Ha)&&(a.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep-BGTZ4Y7F.wasm",import.meta.url).href,import.meta.url).href}),Fe.postMessage(a),Yi=r}catch(a){t(a)}},t)});try{await mn(_e.wasm),await Mn(_e),hi=!0}catch(e){throw fi=!0,e}finally{Vt=!1}}},hf=async e=>{if(vt())return At(),new Promise((t,r)=>{zt("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:_e}};Fe.postMessage(i)});await On(_e,e)},ff=async e=>vt()?(At(),new Promise((t,r)=>{zt("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};Fe.postMessage(i,[e.buffer])})):dr(e),mf=async(e,t)=>{if(vt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return At(),new Promise((r,i)=>{zt("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Fe.postMessage(a,s)})}else return Rn(e,t)},gf=async e=>{if(vt())return At(),new Promise((t,r)=>{zt("release",[t,r]);let i={type:"release",in:e};Fe.postMessage(i)});Bn(e)},yf=async(e,t,r,i,a,s)=>{if(vt()){if(r.some(n=>n[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(n=>n))throw new Error("pre-allocated output tensor is not supported for proxy.");return At(),new Promise((n,u)=>{zt("run",[n,u]);let l=r,c={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:i,options:s}};Fe.postMessage(c,Pn(l))})}else return Dn(e,t,r,i,a,s)},_f=async e=>{if(vt())return At(),new Promise((t,r)=>{zt("end-profiling",[t,r]);let i={type:"end-profiling",in:e};Fe.postMessage(i)});Nn(e)}}),Oa,Ed,wf,g0=L(()=>{qe(),bf(),ie(),hn(),hc(),Oa=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Ed=e=>{switch(e[3]){case"cpu":return new it(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!yn(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return it.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!_n(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return it.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},wf=class{async fetchModelAndCopyToWasmMemory(e){return ff(await bn(e))}async loadModel(e,t){rt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await mf(r,t),Xe()}async dispose(){return gf(this.sessionId)}async run(e,t,r){rt();let i=[],a=[];Object.entries(e).forEach(f=>{let g=f[0],y=f[1],_=this.inputNames.indexOf(g);if(_===-1)throw new Error(`invalid input '${g}'`);i.push(y),a.push(_)});let s=[],n=[];Object.entries(t).forEach(f=>{let g=f[0],y=f[1],_=this.outputNames.indexOf(g);if(_===-1)throw new Error(`invalid output '${g}'`);s.push(y),n.push(_)});let u=i.map((f,g)=>Oa(f,()=>`input "${this.inputNames[a[g]]}"`)),l=s.map((f,g)=>f?Oa(f,()=>`output "${this.outputNames[n[g]]}"`):null),c=await yf(this.sessionId,a,u,n,l,r),h={};for(let f=0;f<c.length;f++)h[this.outputNames[n[f]]]=s[f]??Ed(c[f]);return Xe(),h}startProfiling(){}endProfiling(){_f(this.sessionId)}}}),vf={};Yt(vf,{OnnxruntimeWebAssemblyBackend:()=>an,initializeFlags:()=>rn,wasmBackend:()=>$f});var rn,an,$f,y0=L(()=>{qe(),bf(),g0(),rn=()=>{(typeof _e.wasm.initTimeout!="number"||_e.wasm.initTimeout<0)&&(_e.wasm.initTimeout=0);let e=_e.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),_e.wasm.simd=!1),typeof _e.wasm.proxy!="boolean"&&(_e.wasm.proxy=!1),typeof _e.wasm.trace!="boolean"&&(_e.wasm.trace=!1),typeof _e.wasm.numThreads!="number"||!Number.isInteger(_e.wasm.numThreads)||_e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)_e.wasm.numThreads=1;else{let t=typeof navigator>"u"?ig("node:os").cpus().length:navigator.hardwareConcurrency;_e.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},an=class{async init(e){rn(),await pf(),await hf(e)}async createInferenceSessionHandler(e,t){let r=new wf;return await r.loadModel(e,t),r}},$f=new an});qe();qe();qe();var _0="1.23.2";{let e=(y0(),Si(vf)).wasmBackend;Gt("webgpu",e,5),Gt("webnn",e,5),Gt("cpu",e,10),Gt("wasm",e,10)}Object.defineProperty(_e.versions,"web",{value:_0,enumerable:!0});class b0{session=null;inputShape=[1,3,640,640];enabled=!1;useMock=!1;lastMockUpdate=0;mockDetections=[];constructor(){_e.wasm.wasmPaths="https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/"}async init(t="./yolo11n-blow.onnx"){try{console.log(`Loading model from ${t}...`),this.session=await pn.create(t,{executionProviders:["webgpu","wasm"]}),console.log("Model loaded successfully (WebGPU/WASM)"),this.enabled=!0}catch(r){console.warn("Failed to load ONNX model. Switching to MOCK mode.",r),this.useMock=!0,this.enabled=!0}}async run(t,r=.5){if(!this.enabled)return[];if(this.useMock)return this.runMock(r);if(!this.session)return[];try{return[]}catch(i){return console.error("Inference error:",i),[]}}runMock(t){const r=Date.now();if(r-this.lastMockUpdate>2e3)if(this.lastMockUpdate=r,Math.random()<.3){const i=.2+Math.random()*.6,a=.4+Math.random()*.2,s=.6+Math.random()*.39;this.mockDetections=[{x:i,y:a,w:.05,h:.1,confidence:s,classId:0,label:"whale_blow"}]}else this.mockDetections=[];return this.mockDetections.filter(i=>i.confidence>=t)}}const dt={LOADING:"LOADING",READY:"READY",DETECTING:"DETECTING",EVENT:"EVENT",ERROR:"ERROR"};class w0{currentState=dt.LOADING;listeners=[];get state(){return this.currentState}set state(t){this.currentState!==t&&(console.log(`[StateSystem] Transition: ${this.currentState} -> ${t}`),this.currentState=t,this.notify())}addListener(t){this.listeners.push(t),t(this.currentState)}removeListener(t){this.listeners=this.listeners.filter(r=>r!==t)}notify(){this.listeners.forEach(t=>t(this.currentState))}}const lt=new w0;class v0{canvas;ctx;history=[];constructor(t){this.canvas=t;const r=t.getContext("2d");if(!r)throw new Error("Could not get canvas context");this.ctx=r}resize(t,r){this.canvas.width=t,this.canvas.height=r}draw(t){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.history.push({detections:[...t],timestamp:Date.now()});const r=Date.now();this.history=this.history.filter(i=>r-i.timestamp<1e3),this.history.forEach(i=>{const a=r-i.timestamp,s=1-a/1e3;s<=0||i.detections.forEach(n=>{a<50||this.drawBox(n,s*.3,!1)})}),t.forEach(i=>{this.drawBox(i,1,!0)})}drawBox(t,r,i){const{x:a,y:s,w:n,h:u,confidence:l}=t,c=this.canvas.width,h=this.canvas.height,f=(a-n/2)*c,g=(s-u/2)*h,y=n*c,_=u*h;let w="#ff5252";if(l>=.85?w="#4caf50":l>=.65&&(w="#ffc107"),this.ctx.strokeStyle=w,this.ctx.globalAlpha=r,this.ctx.lineWidth=2,this.ctx.strokeRect(f,g,y,_),i&&l>.85&&(this.ctx.shadowColor=w,this.ctx.shadowBlur=10,this.ctx.strokeRect(f,g,y,_),this.ctx.shadowBlur=0),i){this.ctx.fillStyle=w,this.ctx.font="12px Inter, monospace",this.ctx.textBaseline="bottom";const x=`Blow · ${l.toFixed(2)}`,$=this.ctx.measureText(x).width;this.ctx.fillRect(f,g-16,$+8,16),this.ctx.fillStyle="#000",this.ctx.fillText(x,f+4,g-2)}this.ctx.globalAlpha=1}}const Me=[];for(let e=0;e<256;++e)Me.push((e+256).toString(16).slice(1));function $0(e,t=0){return(Me[e[t+0]]+Me[e[t+1]]+Me[e[t+2]]+Me[e[t+3]]+"-"+Me[e[t+4]]+Me[e[t+5]]+"-"+Me[e[t+6]]+Me[e[t+7]]+"-"+Me[e[t+8]]+Me[e[t+9]]+"-"+Me[e[t+10]]+Me[e[t+11]]+Me[e[t+12]]+Me[e[t+13]]+Me[e[t+14]]+Me[e[t+15]]).toLowerCase()}let Ra;const x0=new Uint8Array(16);function C0(){if(!Ra){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");Ra=crypto.getRandomValues.bind(crypto)}return Ra(x0)}const T0=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),zd={randomUUID:T0};function S0(e,t,r){e=e||{};const i=e.random??e.rng?.()??C0();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,$0(i)}function xf(e,t,r){return zd.randomUUID&&!e?zd.randomUUID():S0(e)}class I0{tracks=[];maxMisses=5;minHits=2;update(t){const r=[],i=new Set(this.tracks.map((n,u)=>u)),a=new Set(t.map((n,u)=>u));t.forEach((n,u)=>{let l=0,c=-1;this.tracks.forEach((h,f)=>{if(!i.has(f))return;const g=this.getIoU(n,h.lastDet);g>.3&&g>l&&(l=g,c=f)}),c!==-1&&(r.push({trackIdx:c,detIdx:u}),i.delete(c),a.delete(u))}),r.forEach(({trackIdx:n,detIdx:u})=>{const l=this.tracks[n];l.hits++,l.misses=0,l.lastDet=t[u],l.history.push(t[u]),l.history.length>10&&l.history.shift()}),a.forEach(n=>{this.tracks.push({id:xf(),hits:1,misses:0,lastDet:t[n],history:[t[n]]})});for(let n=this.tracks.length-1;n>=0;n--)i.has(n)&&(this.tracks[n].misses++,this.tracks[n].misses>this.maxMisses&&this.tracks.splice(n,1));const s=[];return this.tracks.forEach(n=>{(n.hits>=this.minHits||n.lastDet.confidence>.8)&&s.push(n.lastDet)}),s}getIoU(t,r){const i=Math.max(t.x-t.w/2,r.x-r.w/2),a=Math.max(t.y-t.h/2,r.y-r.h/2),s=Math.min(t.x+t.w/2,r.x+r.w/2),n=Math.min(t.y+t.h/2,r.y+r.h/2);if(s<i||n<a)return 0;const u=(s-i)*(n-a),l=t.w*t.h,c=r.w*r.h;return u/(l+c-u)}}class k0{BLOW_HEIGHT_MIN=2;BLOW_HEIGHT_MAX=6;VFOV_RAD=45*(Math.PI/180);estimate(t){const r=t.h*this.VFOV_RAD;if(r<=0)return{min:0,max:0,desc:"Unknown"};const i=this.BLOW_HEIGHT_MIN/Math.tan(r),a=this.BLOW_HEIGHT_MAX/Math.tan(r),s=(i/1e3).toFixed(1),n=(a/1e3).toFixed(1);return{min:Math.floor(i),max:Math.floor(a),desc:`~${s}-${n} km`}}}class E0{events=[];captureWithLocation(t,r,i,a,s=1){const n=document.createElement("canvas"),u=.5,l=a.width,c=a.height;let h=(t.x-t.w/2)*l,f=(t.y-t.h/2)*c,g=t.w*l,y=t.h*c;h-=g*u,f-=y*u,g+=g*(u*2),y+=y*(u*2),n.width=200,n.height=200*(y/g);const _=n.getContext("2d");_&&_.drawImage(a,h,f,g,y,0,0,n.width,n.height);const w={event_id:i?.eventId??xf(),event_type:"whale_blow",timestamp:new Date().toISOString(),confidence:t.confidence,bbox:[t.x,t.y,t.w,t.h],resolution:[a.width,a.height],device:"leviathan_mobile_v1.0",optics:s>1?`digital_${s}x`:"native",zoom:s,distance_estimate_m:[r.min,r.max],distance_best_m:i?.distance??null,location:{observer:{lat:i?this.getStoredObserverLat():null,lon:i?this.getStoredObserverLon():null},blow:{lat:i?.position.latitude??null,lon:i?.position.longitude??null}},bearing_deg:i?.bearing??null,relative_bearing_deg:i?.relativeBearing??null,uncertainty:{distance_percent:i?.uncertainty.distancePercent??null,bearing_deg:i?.uncertainty.bearingDegrees??null,position_m:i?.uncertainty.positionMeters??null},notes:i?`Localized at ${i.bearing.toFixed(0)}° bearing, ${i.distance}m distance`:"Localization unavailable",thumbnail:n.toDataURL("image/jpeg",.7)};return this.events.push(w),this.persist(),console.log("[Leviathan] Blow Event Captured:",w),w}capture(t,r,i){return this.captureWithLocation(t,r,null,i,1)}static formatEventLocation(t){if(!t.location.blow.lat||!t.location.blow.lon)return"Location pending...";const r=t.location.blow.lat.toFixed(5),i=t.location.blow.lon.toFixed(5),a=t.distance_best_m?t.distance_best_m<1e3?`${t.distance_best_m}m`:`${(t.distance_best_m/1e3).toFixed(1)}km`:"?";return`${r}°, ${i}° @ ${a}`}getRecentEvents(){return this.events.slice(-10).reverse()}exportJSON(){return JSON.stringify(this.events,null,2)}exportCSV(){const t=["event_id","timestamp","confidence","observer_lat","observer_lon","blow_lat","blow_lon","bearing_deg","distance_m","zoom","uncertainty_m"].join(","),r=this.events.map(i=>[i.event_id,i.timestamp,i.confidence.toFixed(3),i.location.observer.lat?.toFixed(6)??"",i.location.observer.lon?.toFixed(6)??"",i.location.blow.lat?.toFixed(6)??"",i.location.blow.lon?.toFixed(6)??"",i.bearing_deg?.toFixed(1)??"",i.distance_best_m??"",i.zoom,i.uncertainty.position_m??""].join(","));return[t,...r].join(`
`)}observerLat=null;observerLon=null;setObserverPosition(t,r){this.observerLat=t,this.observerLon=r}getStoredObserverLat(){return this.observerLat}getStoredObserverLon(){return this.observerLon}persist(){try{localStorage.setItem("leviathan_events",JSON.stringify(this.events.slice(-100)))}catch{}}loadFromStorage(){try{const t=localStorage.getItem("leviathan_events");t&&(this.events=JSON.parse(t))}catch{}}}const Ad=100;class z0{orientation={alpha:0,beta:0,gamma:0,absolute:!1};motion={accelX:0,accelY:0,accelZ:0};available=!1;permissionGranted=!1;imuBuffer=[];imuBufferIndex=0;latestIMU=null;lastMotionTime=0;sampleInterval=0;constructor(){this.handleOrientation=this.handleOrientation.bind(this),this.handleMotion=this.handleMotion.bind(this)}async requestPermission(){if(typeof DeviceOrientationEvent.requestPermission=="function")try{return await DeviceOrientationEvent.requestPermission()==="granted"?(this.permissionGranted=!0,this.start(),!0):(console.warn("Orientation permission denied"),!1)}catch(t){return console.error("Orientation permission error:",t),!1}else return this.permissionGranted=!0,this.start(),!0}start(){this.permissionGranted&&(window.addEventListener("deviceorientation",this.handleOrientation),window.addEventListener("devicemotion",this.handleMotion),this.available=!0,console.log("[SensorManager] Started listening for IMU events"))}stop(){window.removeEventListener("deviceorientation",this.handleOrientation),window.removeEventListener("devicemotion",this.handleMotion),this.available=!1}handleOrientation(t){let r=t.alpha,i=t.absolute||!1;t.webkitCompassHeading!==void 0&&(r=t.webkitCompassHeading,i=!0),this.orientation={alpha:r,beta:t.beta,gamma:t.gamma,absolute:i}}handleMotion(t){const r=Date.now();if(this.lastMotionTime>0){const l=r-this.lastMotionTime;this.sampleInterval=this.sampleInterval*.9+l*.1}this.lastMotionTime=r;const i=t.rotationRate,a={x:i?.alpha?i.alpha*(Math.PI/180):0,y:i?.beta?i.beta*(Math.PI/180):0,z:i?.gamma?i.gamma*(Math.PI/180):0},s={x:t.acceleration?.x||0,y:t.acceleration?.y||0,z:t.acceleration?.z||0},n={x:t.accelerationIncludingGravity?.x||0,y:t.accelerationIncludingGravity?.y||0,z:t.accelerationIncludingGravity?.z||0},u={timestamp:r,gyro:a,accel:s,accelWithGravity:n};this.imuBuffer.length<Ad?this.imuBuffer.push(u):(this.imuBuffer[this.imuBufferIndex]=u,this.imuBufferIndex=(this.imuBufferIndex+1)%Ad),this.latestIMU=u,this.motion={accelX:n.x,accelY:n.y,accelZ:n.z}}getLatestIMU(){return this.latestIMU}getIMUSamplesSince(t){return this.imuBuffer.filter(r=>r.timestamp>t).sort((r,i)=>r.timestamp-i.timestamp)}getSampleRate(){return this.sampleInterval<=0?0:1e3/this.sampleInterval}getMagneticHeading(){return!this.orientation.absolute||this.orientation.alpha===null?null:this.orientation.alpha}getDevicePitch(){return this.orientation.beta}getDeviceRoll(){return this.orientation.gamma}getGravityVector(){return this.latestIMU?this.latestIMU.accelWithGravity:null}getHeadingString(){return this.orientation.alpha===null?"---°":`${Math.round(this.orientation.alpha)}°`}getPitchString(){return this.orientation.beta===null?"---°":`${Math.round(this.orientation.beta)}°`}getRollString(){return this.orientation.gamma===null?"---°":`${Math.round(this.orientation.gamma)}°`}}const Md=4.25,A0=4.8,M0=3.6,Od=1920,Rd=1080;class O0{baseIntrinsics;currentZoom=1;currentIntrinsics;constructor(t=Od,r=Rd){const i=Md/A0*t,a=Md/M0*r,s=t/2,n=r/2;this.baseIntrinsics={fx:i,fy:a,cx:s,cy:n,width:t,height:r},this.currentIntrinsics={...this.baseIntrinsics}}updateForZoom(t){this.currentZoom=Math.max(1,t),this.currentIntrinsics={...this.baseIntrinsics,fx:this.baseIntrinsics.fx*this.currentZoom,fy:this.baseIntrinsics.fy*this.currentZoom}}updateForResolution(t,r){const i=t/Od,a=r/Rd;this.baseIntrinsics={fx:this.baseIntrinsics.fx*i,fy:this.baseIntrinsics.fy*a,cx:t/2,cy:r/2,width:t,height:r},this.updateForZoom(this.currentZoom)}getIntrinsics(){return{...this.currentIntrinsics}}getKMatrix(){const{fx:t,fy:r,cx:i,cy:a}=this.currentIntrinsics;return[[t,0,i],[0,r,a],[0,0,1]]}getZoom(){return this.currentZoom}getVFOV(){return 2*Math.atan(this.currentIntrinsics.height/(2*this.currentIntrinsics.fy))}getHFOV(){return 2*Math.atan(this.currentIntrinsics.width/(2*this.currentIntrinsics.fx))}pixelToNormalized(t,r){const{fx:i,fy:a,cx:s,cy:n}=this.currentIntrinsics;return{x:(t-s)/i,y:(r-n)/a}}normalizedToPixel(t,r){const{fx:i,fy:a,cx:s,cy:n}=this.currentIntrinsics;return{u:t*i+s,v:r*a+n}}getPixelAngularSize(){return{horizontal:this.getHFOV()/this.currentIntrinsics.width,vertical:this.getVFOV()/this.currentIntrinsics.height}}static calculateDipAngle(t,r=1.17){const a=6371e3*r;return Math.acos(a/(a+t))}static calculateHorizonDistance(t,r=1.17){return Math.sqrt(2*r*6371e3*t)}}const Cf=6371e3,Bd=9.80665,R0=1.17,xe=Math.PI/180,ke=180/Math.PI;function Tf(){return{w:1,x:0,y:0,z:0}}function nn(e,t){return{w:e.w*t.w-e.x*t.x-e.y*t.y-e.z*t.z,x:e.w*t.x+e.x*t.w+e.y*t.z-e.z*t.y,y:e.w*t.y-e.x*t.z+e.y*t.w+e.z*t.x,z:e.w*t.z+e.x*t.y-e.y*t.x+e.z*t.w}}function Sf(e){const t=Math.sqrt(e.w*e.w+e.x*e.x+e.y*e.y+e.z*e.z);return t<1e-10?Tf():{w:e.w/t,x:e.x/t,y:e.y/t,z:e.z/t}}function If(e){return{w:e.w,x:-e.x,y:-e.y,z:-e.z}}function Qi(e){const t=2*(e.w*e.x+e.y*e.z),r=1-2*(e.x*e.x+e.y*e.y),i=Math.atan2(t,r),a=2*(e.w*e.y-e.z*e.x),s=Math.abs(a)>=1?Math.sign(a)*Math.PI/2:Math.asin(a),n=2*(e.w*e.z+e.x*e.y),u=1-2*(e.y*e.y+e.z*e.z),l=Math.atan2(n,u);return{roll:i,pitch:s,yaw:l}}function Ba(e){const{roll:t,pitch:r,yaw:i}=e,a=Math.cos(t/2),s=Math.sin(t/2),n=Math.cos(r/2),u=Math.sin(r/2),l=Math.cos(i/2),c=Math.sin(i/2);return Sf({w:a*n*l+s*u*c,x:s*n*l-a*u*c,y:a*u*l+s*n*c,z:a*n*c-s*u*l})}function B0(e,t){const r={w:0,x:t.x,y:t.y,z:t.z},i=nn(nn(e,r),If(e));return{x:i.x,y:i.y,z:i.z}}function sn(e){return Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z)}function Ji(e){const t=sn(e);return t<1e-10?{x:0,y:0,z:0}:{x:e.x/t,y:e.y/t,z:e.z/t}}function D0(e,t){return{x:e.x-t.x,y:e.y-t.y,z:e.z-t.z}}const N0={blowHeightMin:2,blowHeightMax:9,defaultBlowHeight:4.5,observerHeight:3};class kf{config;observerPosition=null;eventCounter=0;constructor(t={}){this.config={...N0,...t}}setObserverPosition(t){this.observerPosition=t}setObserverHeight(t){this.config.observerHeight=t}localize(t,r,i,a,s=1){const n=Date.now();if(!this.observerPosition)return console.warn("[BlowLocalizer] No observer position set"),null;if(!i)return console.warn("[BlowLocalizer] No heading available"),null;const u=t.x*r.width;t.y*r.height;const l=u-r.cx,h=Math.atan2(l,r.fx)*ke;let f=i.heading+h;f=(f%360+360)%360;const g=t.h*r.height,y=2*Math.atan(g/(2*r.fy));if(y<=.001)return console.warn("[BlowLocalizer] Detection too small for ranging"),null;const _=this.config.defaultBlowHeight/Math.tan(y),w=this.config.blowHeightMin/Math.tan(y),x=this.config.blowHeightMax/Math.tan(y);let $=_;if(a){const O=Math.cos(a.pitch);$=_*Math.max(.5,Math.min(2,1/O))}const v=this.projectPosition(this.observerPosition,f,$),S=(x-w)/$*100,C=3/r.fx*ke,I=Math.sqrt(i.uncertainty**2+C**2),z=Math.sqrt(($*Math.sin(I*xe))**2+((x-w)/2)**2),E=this.generateEventId(n);return{position:v,distance:Math.round($),distanceMin:Math.round(w),distanceMax:Math.round(x),bearing:Math.round(f*10)/10,relativeBearing:Math.round(h*10)/10,confidence:t.confidence,timestamp:n,eventId:E,zoomFactor:s,uncertainty:{distancePercent:Math.round(S),bearingDegrees:Math.round(I*10)/10,positionMeters:Math.round(z)}}}projectPosition(t,r,i){const a=t.latitude*xe,s=t.longitude*xe,n=r*xe,u=i/Cf,l=Math.asin(Math.sin(a)*Math.cos(u)+Math.cos(a)*Math.sin(u)*Math.cos(n)),c=s+Math.atan2(Math.sin(n)*Math.sin(u)*Math.cos(a),Math.cos(u)-Math.sin(a)*Math.sin(l));return{latitude:l*ke,longitude:(c*ke+540)%360-180,altitude:0}}generateEventId(t){this.eventCounter++;const r=t.toString(16).slice(-8),i=this.eventCounter.toString(16).padStart(4,"0");return`BLOW-${r}-${i}`.toUpperCase()}static formatLocation(t){const r=t.position.latitude.toFixed(5),i=t.position.longitude.toFixed(5),a=t.distance<1e3?`${t.distance}m`:`${(t.distance/1e3).toFixed(1)}km`;return`${r}°, ${i}° @ ${a} bearing ${t.bearing}°`}static toJSON(t){return{event_id:t.eventId,timestamp:new Date(t.timestamp).toISOString(),position:{lat:t.position.latitude,lon:t.position.longitude},distance_m:t.distance,distance_range:{min:t.distanceMin,max:t.distanceMax},bearing_deg:t.bearing,relative_bearing_deg:t.relativeBearing,confidence:t.confidence,zoom:t.zoomFactor,uncertainty:t.uncertainty}}}new kf;const P0={coarseSize:64,rollRange:30*xe,rollStep:2*xe,pitchRange:.4,pitchSteps:20,glareThreshold:245,glareSaturationMax:30,minConfidence:.3};class U0{config;coarseCanvas;coarseCtx;tempCanvas;tempCtx;constructor(t={}){this.config={...P0,...t},this.coarseCanvas=new OffscreenCanvas(this.config.coarseSize,this.config.coarseSize),this.coarseCtx=this.coarseCanvas.getContext("2d",{willReadFrequently:!0}),this.tempCanvas=new OffscreenCanvas(640,480),this.tempCtx=this.tempCanvas.getContext("2d",{willReadFrequently:!0})}detect(t,r,i=3){const a=performance.now();try{const s=this.getImageData(t);if(!s)return{horizon:null,processingTime:performance.now()-a,glareMasked:!1,failureReason:"Failed to get image data"};const{data:n,glareMasked:u}=this.maskGlare(s),l=this.downsample(n),c=this.coarseSearch(l),h=this.fineRefine(n,c);return h.confidence<this.config.minConfidence?{horizon:null,processingTime:performance.now()-a,glareMasked:u,failureReason:`Low confidence: ${h.confidence.toFixed(2)}`}:{horizon:this.computeHorizonLine(h,n.width,n.height,r,i),processingTime:performance.now()-a,glareMasked:u}}catch(s){return{horizon:null,processingTime:performance.now()-a,glareMasked:!1,failureReason:`Error: ${s}`}}}getImageData(t){if(t instanceof ImageData)return t;const r=t instanceof HTMLVideoElement?t.videoWidth:t.width,i=t instanceof HTMLVideoElement?t.videoHeight:t.height;if(r===0||i===0)return null;const a=Math.min(640,r),s=Math.round(a*(i/r));return this.tempCanvas.width=a,this.tempCanvas.height=s,this.tempCtx.drawImage(t,0,0,a,s),this.tempCtx.getImageData(0,0,a,s)}maskGlare(t){const{data:r,width:i,height:a}=t,s=new ImageData(new Uint8ClampedArray(r),i,a);let n=!1;for(let u=0;u<r.length;u+=4){const l=r[u],c=r[u+1],h=r[u+2],f=Math.max(l,c,h),g=Math.min(l,c,h),y=f===0?0:(f-g)/f*255;f>this.config.glareThreshold&&y<this.config.glareSaturationMax&&(s.data[u]=128,s.data[u+1]=128,s.data[u+2]=128,s.data[u+3]=0,n=!0)}return{data:s,glareMasked:n}}downsample(t){const r=this.config.coarseSize;this.coarseCanvas.width=r,this.coarseCanvas.height=r,this.coarseCtx.drawImage(this.createImageBitmap(t),0,0,r,r);const i=t.width/r,a=t.height/r,s=new ImageData(r,r);for(let n=0;n<r;n++)for(let u=0;u<r;u++){const l=Math.floor(u*i),h=(Math.floor(n*a)*t.width+l)*4,f=(n*r+u)*4;s.data[f]=t.data[h],s.data[f+1]=t.data[h+1],s.data[f+2]=t.data[h+2],s.data[f+3]=t.data[h+3]}return s}createImageBitmap(t){return t}coarseSearch(t){const{rollRange:r,rollStep:i,pitchRange:a,pitchSteps:s}=this.config,{width:n,height:u}=t;let l=0,c=u/2,h=1/0;for(let f=-r;f<=r;f+=i){const g=u*(.5-a),y=u*(.5+a),_=(y-g)/s;for(let w=g;w<=y;w+=_){const x=this.computeLineScore(t,f,w);x<h&&(h=x,l=f,c=w)}}return{roll:l,offset:c,score:h}}fineRefine(t,r){let{roll:i,offset:a}=r;const{height:s}=t,n=.5*xe,u=2,l=10;let c=this.computeLineScore(t,i,a);for(let f=0;f<l;f++){let g=!1;const y=[{r:i+n,o:a},{r:i-n,o:a},{r:i,o:a+u},{r:i,o:a-u},{r:i+n,o:a+u},{r:i-n,o:a-u}];for(const{r:_,o:w}of y){const x=this.computeLineScore(t,_,w);x<c&&(i=_,a=w,c=x,g=!0)}if(!g)break}const h=Math.max(0,Math.min(1,1-c/1e4));return a=Math.max(0,Math.min(s,a)),{roll:i,offset:a,confidence:h}}computeLineScore(t,r,i){const{data:a,width:s,height:n}=t;let u=0,l=0,c=0,h=0,f=0,g=0;const y=Math.cos(r),_=Math.sin(r),w=s/2,x=n/2;for(let P=0;P<n;P++)for(let F=0;F<s;F++){const V=(P*s+F)*4;if(a[V+3]===0)continue;const G=.299*a[V]+.587*a[V+1]+.114*a[V+2],ee=F-w,q=P-x;-ee*_+q*y+x<i?(u+=G,f+=G*G,l++):(c+=G,g+=G*G,h++)}if(l<10||h<10)return 1/0;const $=u/l,v=c/h,S=f/l-$*$,C=g/h-v*v,I=l+h,z=(l*S+h*C)/I,O=Math.abs($-v)<10?1e3:0;return z+O}computeHorizonLine(t,r,i,a,s){const n=-t.roll,u=t.offset-i/2,l=Math.atan(u/a.fy),c=Cf*R0,h=Math.acos(c/(c+s)),f=l+h;return{angle:t.roll,offset:t.offset,confidence:t.confidence,roll:n,pitch:f}}static getRollDegrees(t){return t.roll*ke}static getPitchDegrees(t){return t.pitch*ke}}const L0={gyroNoise:.01,gyroBiasNoise:1e-4,accelNoise:.5,horizonRollNoise:2*xe,horizonPitchNoise:3*xe,chiSquaredGate:7.81,initialGyroBiasStd:.01};class W0{state;config;initialized=!1;lastInnovation={roll:0,pitch:0};rejectedUpdates=0;totalUpdates=0;constructor(t={}){this.config={...L0,...t},this.state=this.createInitialState()}createInitialState(){const t=this.config.initialGyroBiasStd,r=[[.1,0,0,0,0,0],[0,.1,0,0,0,0],[0,0,.5,0,0,0],[0,0,0,t*t,0,0],[0,0,0,0,t*t,0],[0,0,0,0,0,t*t]];return{quaternion:Tf(),gyroBias:{x:0,y:0,z:0},covariance:r,timestamp:0}}initialize(t,r){this.state.quaternion=Ba(t),this.state.timestamp=r,this.initialized=!0}initializeFromAccel(t,r){const i=Ji(t),a=Math.atan2(i.x,i.z),s=Math.atan2(-i.y,Math.sqrt(i.x*i.x+i.z*i.z));this.initialize({roll:a,pitch:s,yaw:0},r)}predict(t,r){if(!this.initialized){this.state.timestamp=r;return}const i=(r-this.state.timestamp)/1e3;if(i<=0||i>1){this.state.timestamp=r;return}const a={x:t.x-this.state.gyroBias.x,y:t.y-this.state.gyroBias.y,z:t.z-this.state.gyroBias.z},s=sn(a)*i;if(s>1e-10){const l=Ji(a),c=s/2,h=Math.sin(c),f={w:Math.cos(c),x:l.x*h,y:l.y*h,z:l.z*h};this.state.quaternion=Sf(nn(this.state.quaternion,f))}const n=this.computeStateTransition(a,i),u=this.computeProcessNoise(i);this.state.covariance=this.propagateCovariance(this.state.covariance,n,u),this.state.timestamp=r}updateWithGravity(t){if(!this.initialized)return!1;const r={x:0,y:0,z:Bd},i=B0(If(this.state.quaternion),r),a=D0(Ji(t),Ji(i)),s=this.computeGravityJacobian(this.state.quaternion),n=[[this.config.accelNoise*this.config.accelNoise,0,0],[0,this.config.accelNoise*this.config.accelNoise,0],[0,0,this.config.accelNoise*this.config.accelNoise]],{S:u,K:l}=this.computeKalmanGain(this.state.covariance,s,n),c=[a.x,a.y,a.z],h=this.computeChiSquared(c,u);return this.totalUpdates++,h>this.config.chiSquaredGate?(this.rejectedUpdates++,!1):(this.applyCorrection(l,c),!0)}updateWithHorizon(t,r){if(!this.initialized)return!1;const i=Qi(this.state.quaternion),a=this.wrapAngle(t-i.roll),s=this.wrapAngle(r-i.pitch);this.lastInnovation={roll:a,pitch:s};const n=this.config.horizonRollNoise*this.config.horizonRollNoise,u=this.config.horizonPitchNoise*this.config.horizonPitchNoise,l=this.state.covariance[0][0],c=this.state.covariance[1][1],h=l/(l+n),f=c/(c+u),g=a*a/(l+n)+s*s/(c+u);if(this.totalUpdates++,g>5.99)return this.rejectedUpdates++,!1;const y={roll:i.roll+h*a,pitch:i.pitch+f*s,yaw:i.yaw};return this.state.quaternion=Ba(y),this.state.covariance[0][0]=(1-h)*l,this.state.covariance[1][1]=(1-f)*c,!0}getOrientation(){return Qi(this.state.quaternion)}getState(){return{orientation:Qi(this.state.quaternion),rollStd:Math.sqrt(this.state.covariance[0][0]),pitchStd:Math.sqrt(this.state.covariance[1][1]),yawStd:Math.sqrt(this.state.covariance[2][2]),timestamp:this.state.timestamp}}getGyroBias(){return{...this.state.gyroBias}}getDiagnostics(){return{initialized:this.initialized,rejectionRate:this.totalUpdates>0?this.rejectedUpdates/this.totalUpdates:0,lastInnovation:this.lastInnovation,gyroBias:this.getGyroBias()}}processSamples(t){for(const r of t){this.predict(r.gyro,r.timestamp);const i=sn(r.accelWithGravity);Math.abs(i-Bd)<1&&this.updateWithGravity(r.accelWithGravity)}}wrapAngle(t){for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;return t}computeStateTransition(t,r){return[[1,0,0,-r,0,0],[0,1,0,0,-r,0],[0,0,1,0,0,-r],[0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1]]}computeProcessNoise(t){const r=this.config.gyroNoise*t,i=this.config.gyroBiasNoise*t;return[[r*r,0,0,0,0,0],[0,r*r,0,0,0,0],[0,0,r*r,0,0,0],[0,0,0,i*i,0,0],[0,0,0,0,i*i,0],[0,0,0,0,0,i*i]]}propagateCovariance(t,r,i){t.length;const a=this.matMul(r,t),s=this.transpose(r),n=this.matMul(a,s);return this.matAdd(n,i)}computeGravityJacobian(t){return[[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,0,0,0]]}computeKalmanGain(t,r,i){const a=this.matMul(r,t),s=this.transpose(r),n=this.matMul(a,s),u=this.matAdd(n,i),l=this.matMul(t,s),c=this.matInv3x3(u),h=this.matMul(l,c);return{S:u,K:h}}computeChiSquared(t,r){const i=this.matInv3x3(r);let a=0;for(let s=0;s<3;s++)for(let n=0;n<3;n++)a+=t[s]*i[s][n]*t[n];return a}applyCorrection(t,r){const i=[];for(let s=0;s<6;s++){let n=0;for(let u=0;u<3;u++)n+=t[s][u]*r[u];i.push(n)}const a=Qi(this.state.quaternion);a.roll+=i[0],a.pitch+=i[1],a.yaw+=i[2],this.state.quaternion=Ba(a),this.state.gyroBias.x+=i[3],this.state.gyroBias.y+=i[4],this.state.gyroBias.z+=i[5];for(let s=0;s<6;s++)for(let n=0;n<3;n++)this.state.covariance[s][s]*=1-.1*Math.abs(t[s][n])}matMul(t,r){const i=t.length,a=r[0].length,s=r.length,n=Array(i).fill(0).map(()=>Array(a).fill(0));for(let u=0;u<i;u++)for(let l=0;l<a;l++)for(let c=0;c<s;c++)n[u][l]+=t[u][c]*r[c][l];return n}transpose(t){const r=t.length,i=t[0].length,a=Array(i).fill(0).map(()=>Array(r).fill(0));for(let s=0;s<r;s++)for(let n=0;n<i;n++)a[n][s]=t[s][n];return a}matAdd(t,r){const i=t.length,a=t[0].length,s=Array(i).fill(0).map(()=>Array(a).fill(0));for(let n=0;n<i;n++)for(let u=0;u<a;u++)s[n][u]=t[n][u]+r[n][u];return s}matInv3x3(t){const r=t[0][0]*(t[1][1]*t[2][2]-t[1][2]*t[2][1])-t[0][1]*(t[1][0]*t[2][2]-t[1][2]*t[2][0])+t[0][2]*(t[1][0]*t[2][1]-t[1][1]*t[2][0]);if(Math.abs(r)<1e-10)return[[1,0,0],[0,1,0],[0,0,1]];const i=1/r;return[[(t[1][1]*t[2][2]-t[1][2]*t[2][1])*i,(t[0][2]*t[2][1]-t[0][1]*t[2][2])*i,(t[0][1]*t[1][2]-t[0][2]*t[1][1])*i],[(t[1][2]*t[2][0]-t[1][0]*t[2][2])*i,(t[0][0]*t[2][2]-t[0][2]*t[2][0])*i,(t[0][2]*t[1][0]-t[0][0]*t[1][2])*i],[(t[1][0]*t[2][1]-t[1][1]*t[2][0])*i,(t[0][1]*t[2][0]-t[0][0]*t[2][1])*i,(t[0][0]*t[1][1]-t[0][1]*t[1][0])*i]]}}const H0={timeConstant:8,heaveCutoff:.2,expectedWavePeriod:7};class er{alpha;value=null;constructor(t,r){const i=1/r;this.alpha=1-Math.exp(-i/t)}update(t){return this.value===null?this.value=t:this.value=this.alpha*t+(1-this.alpha)*this.value,this.value}getValue(){return this.value??0}reset(){this.value=null}}class F0{config;heaveVelocity=0;heavePosition=0;lastTimestamp=0;accelFilter;heaveFilter;_baselineHeight=0;heightHistory=[];maxHistoryLength=100;constructor(t={},r=60){this.config={...H0,...t},this.accelFilter={x:new er(.1,r),y:new er(.1,r),z:new er(.1,r)},this.heaveFilter=new er(this.config.timeConstant,r)}update(t,r){if(this.lastTimestamp===0)return this.lastTimestamp=r,0;const i=(r-this.lastTimestamp)/1e3;if(this.lastTimestamp=r,i<=0||i>1)return this.heavePosition;const s={x:this.accelFilter.x.update(t.x),y:this.accelFilter.y.update(t.y),z:this.accelFilter.z.update(t.z)}.z;this.heaveVelocity+=s*i;const n=.98;this.heaveVelocity*=n,this.heavePosition+=this.heaveVelocity*i;const u=.995;this.heavePosition*=u;const l=this.heaveFilter.update(this.heavePosition);return this.updateBaseline(l),l}getHeave(){return this.heaveFilter.getValue()}getEffectiveHeight(t){return t+this.getHeave()}getSmoothedHeight(t){return t+this.heaveFilter.getValue()}getWaveStatistics(){if(this.heightHistory.length<10)return{significantWaveHeight:0,peakToPeak:0,periodEstimate:this.config.expectedWavePeriod};const t=Math.min(...this.heightHistory),i=Math.max(...this.heightHistory)-t;return{significantWaveHeight:i*.64,peakToPeak:i,periodEstimate:this.config.expectedWavePeriod}}updateBaseline(t){if(this.heightHistory.push(t),this.heightHistory.length>this.maxHistoryLength&&this.heightHistory.shift(),this.heightHistory.length>0){const r=this.heightHistory.reduce((i,a)=>i+a,0);this._baselineHeight=r/this.heightHistory.length}}reset(){this.heaveVelocity=0,this.heavePosition=0,this.lastTimestamp=0,this._baselineHeight=0,this.heightHistory=[],this.accelFilter.x.reset(),this.accelFilter.y.reset(),this.accelFilter.z.reset(),this.heaveFilter.reset()}setExpectedWavePeriod(t){this.config.expectedWavePeriod=t}}class q0{waveFilter;nominalHeight;constructor(t,r=60){this.nominalHeight=t,this.waveFilter=new F0({},r)}update(t,r){this.waveFilter.update(t,r)}getInstantaneousHeight(){return this.waveFilter.getEffectiveHeight(this.nominalHeight)}getStableHeight(){return this.waveFilter.getSmoothedHeight(this.nominalHeight)}getHeightUncertainty(){return this.waveFilter.getWaveStatistics().significantWaveHeight/4}setNominalHeight(t){this.nominalHeight=t}}const V0={brightnessThreshold:250,minBlobSize:20,maxBlobSize:5e3,saturationThreshold:50};class G0{config;tempCanvas;tempCtx;constructor(t={}){this.config={...V0,...t},this.tempCanvas=new OffscreenCanvas(320,240),this.tempCtx=this.tempCanvas.getContext("2d",{willReadFrequently:!0})}detect(t,r){const i=this.getImageData(t);if(!i)return null;const a=this.findBrightPixels(i);if(a.length===0)return null;const s=this.computeCentroid(a);if(!s)return null;const n=(t instanceof ImageData?t.width:t instanceof HTMLVideoElement?t.videoWidth:t.width)/i.width,u=(t instanceof ImageData?t.height:t instanceof HTMLVideoElement?t.videoHeight:t.height)/i.height,l=s.x*n,c=s.y*u,{relativeBearing:h,relativeElevation:f}=this.getRelativeAngles(l,c,r),g=this.computeConfidence(a.length,i.width*i.height);return{u:l,v:c,area:a.length*n*u,confidence:g,relativeBearing:h,relativeElevation:f}}getRelativeBearing(t,r){const i=t.x-r.cx;return Math.atan2(i,r.fx)}getRelativeElevation(t,r){const i=r.cy-t.y;return Math.atan2(i,r.fy)}getImageData(t){if(t instanceof ImageData)return t;const r=t instanceof HTMLVideoElement?t.videoWidth:t.width,i=t instanceof HTMLVideoElement?t.videoHeight:t.height;if(r===0||i===0)return null;const a=Math.min(320,r),s=Math.round(a*(i/r));return this.tempCanvas.width=a,this.tempCanvas.height=s,this.tempCtx.drawImage(t,0,0,a,s),this.tempCtx.getImageData(0,0,a,s)}findBrightPixels(t){const{data:r,width:i,height:a}=t,s=[];for(let n=0;n<a;n++)for(let u=0;u<i;u++){const l=(n*i+u)*4,c=r[l],h=r[l+1],f=r[l+2],g=Math.max(c,h,f);if(g<this.config.brightnessThreshold)continue;const y=Math.min(c,h,f);(g>0?(g-y)/g*255:0)>this.config.saturationThreshold||s.push({x:u,y:n})}return s.length<this.config.minBlobSize||s.length>this.config.maxBlobSize?[]:s}computeCentroid(t){if(t.length===0)return null;let r=0,i=0;for(const a of t)r+=a.x,i+=a.y;return{x:r/t.length,y:i/t.length}}getRelativeAngles(t,r,i){const a=t-i.cx,s=i.cy-r;return{relativeBearing:Math.atan2(a,i.fx),relativeElevation:Math.atan2(s,i.fy)}}computeConfidence(t,r){const i=t/r,a=.001;return i<a*.1?.3:i>a*10?.5:.8+.2*Math.exp(-Math.abs(Math.log(i/a)))}}const Da=2451545;class j0{getSunPosition(t,r,i=new Date){const a=t*xe,s=this.dateToJulianDate(i),n=(s-Da)/36525,u=this.normalizeAngle(280.46646+36000.76983*n+3032e-7*n*n),c=this.normalizeAngle(357.52911+35999.05029*n-1537e-7*n*n)*xe,h=(1.914602-.004817*n-14e-6*n*n)*Math.sin(c)+(.019993-101e-6*n)*Math.sin(2*c)+289e-6*Math.sin(3*c),f=u+h,g=125.04-1934.136*n,y=f-.00569-.00478*Math.sin(g*xe),x=(23.439291111-.0130042*n-16e-8*n*n+.00256*Math.cos(g*xe))*xe,$=y*xe,v=Math.atan2(Math.cos(x)*Math.sin($),Math.cos($)),S=Math.asin(Math.sin(x)*Math.sin($)),C=s-Da,I=C/36525;let z=280.46061837+360.98564736629*C+387933e-9*I*I-I*I*I/3871e4;z=this.normalizeAngle(z);const O=(z+r)*xe-v,P=Math.sin(a)*Math.sin(S)+Math.cos(a)*Math.cos(S)*Math.cos(O),F=Math.asin(P),V=(Math.sin(S)-Math.sin(F)*Math.sin(a))/(Math.cos(F)*Math.cos(a)),G=Math.max(-1,Math.min(1,V));let ee=Math.acos(G);Math.sin(O)>0&&(ee=2*Math.PI-ee);const q=F*ke;return{azimuth:ee*ke,elevation:q,visible:q>-.833}}getSunTimes(t,r,i=new Date){const a=i.getUTCFullYear(),s=i.getUTCMonth(),n=i.getUTCDate(),u=new Date(Date.UTC(a,s,n,0,0,0)),l=r/15,c=new Date(u.getTime()+(12-l)*36e5);this.getSunPosition(t,r,c);const h=t*xe,f=this.getSolarDeclination(this.dateToJulianDate(i)),g=(Math.sin(-.833*xe)-Math.sin(h)*Math.sin(f))/(Math.cos(h)*Math.cos(f));if(g>1)return{sunrise:null,sunset:null,solarNoon:c};if(g<-1)return{sunrise:null,sunset:null,solarNoon:c};const y=Math.acos(g)*ke/15,_=new Date(c.getTime()-y*36e5),w=new Date(c.getTime()+y*36e5);return{sunrise:_,sunset:w,solarNoon:c}}isDaytime(t,r,i=new Date){return this.getSunPosition(t,r,i).visible}dateToJulianDate(t){const r=t.getUTCFullYear(),i=t.getUTCMonth()+1,a=t.getUTCDate(),s=t.getUTCHours()+t.getUTCMinutes()/60+t.getUTCSeconds()/3600;let n=Math.floor((14-i)/12),u=r+4800-n,l=i+12*n-3;return a+Math.floor((153*l+2)/5)+365*u+Math.floor(u/4)-Math.floor(u/100)+Math.floor(u/400)-32045+(s-12)/24}getSolarDeclination(t){const r=(t-Da)/36525,i=this.normalizeAngle(280.46646+36000.76983*r),s=this.normalizeAngle(357.52911+35999.05029*r)*xe,n=(1.914602-.004817*r)*Math.sin(s)+.019993*Math.sin(2*s),u=(i+n)*xe,l=23.439291111*xe;return Math.asin(Math.sin(l)*Math.sin(u))}normalizeAngle(t){return t=t%360,t<0&&(t+=360),t}}const K0={minSunElevation:10,visualWeight:.7,magneticWeight:.3,smoothingFactor:.8,visualUncertainty:5,magneticUncertainty:15};class Z0{config;ephemeris;sunTracker;lastHeading=null;lastVisualHeading=null;lastUpdateTime=0;latitude=0;longitude=0;locationSet=!1;constructor(t={}){this.config={...K0,...t},this.ephemeris=new j0,this.sunTracker=new G0}setLocation(t,r){this.latitude=t,this.longitude=r,this.locationSet=!0}getSunPosition(){return this.locationSet?this.ephemeris.getSunPosition(this.latitude,this.longitude):null}updateFromCamera(t,r){if(!this.locationSet)return null;const i=this.ephemeris.getSunPosition(this.latitude,this.longitude);if(!i.visible||i.elevation<this.config.minSunElevation)return null;const a=this.sunTracker.detect(t,r);if(!a)return null;const s=this.computeHeadingFromSun(a,i,r);return this.lastVisualHeading=s,this.lastUpdateTime=Date.now(),s}computeHeadingFromSun(t,r,i){const a=r.azimuth,s=t.relativeBearing*ke;let n=a-s;return n=(n%360+360)%360,n}fuseWithMagnetic(t){const i=Date.now()-this.lastUpdateTime>5e3;if(this.lastVisualHeading===null&&t===null)return{heading:this.lastHeading??0,source:"magnetometer",confidence:0,uncertainty:180};if((t===null||!isFinite(t))&&this.lastVisualHeading!==null&&!i)return this.lastHeading=this.smoothHeading(this.lastVisualHeading),{heading:this.lastHeading,source:"visual_compass",confidence:.8,uncertainty:this.config.visualUncertainty};if(this.lastVisualHeading===null||i){const u=this.smoothHeading(t);return this.lastHeading=u,{heading:u,source:"magnetometer",confidence:.5,uncertainty:this.config.magneticUncertainty}}const a=this.fuseHeadings(this.lastVisualHeading,t,this.config.visualWeight,this.config.magneticWeight),s=this.smoothHeading(a);this.lastHeading=s;const n=Math.sqrt((this.config.visualWeight*this.config.visualUncertainty)**2+(this.config.magneticWeight*this.config.magneticUncertainty)**2)/(this.config.visualWeight+this.config.magneticWeight);return{heading:s,source:"fused",confidence:.9,uncertainty:n}}getHeading(t=null){return this.fuseWithMagnetic(t)}isAvailable(){if(!this.locationSet)return!1;const t=this.ephemeris.getSunPosition(this.latitude,this.longitude);return t.visible&&t.elevation>=this.config.minSunElevation}fuseHeadings(t,r,i,a){const s=t*xe,n=r*xe,u=i*Math.cos(s)+a*Math.cos(n),l=i*Math.sin(s)+a*Math.sin(n);let c=Math.atan2(l,u)*ke;return c=(c%360+360)%360,c}smoothHeading(t){if(this.lastHeading===null)return t;let r=t-this.lastHeading;return r>180&&(r-=360),r<-180&&(r+=360),((this.lastHeading+r*(1-this.config.smoothingFactor))%360+360)%360}}const Y0={showHorizon:!0,showPitchLadder:!0,showCompass:!0,showDebug:!1,horizonColor:"#00ff88",pitchLadderColor:"rgba(0, 255, 136, 0.5)",textColor:"#ffffff",lineWidth:2,fontSize:14};class X0{config;canvas;ctx;width=0;height=0;constructor(t,r={}){this.config={...Y0,...r},this.canvas=t,this.ctx=t.getContext("2d")}resize(t,r){this.width=t,this.height=r,this.canvas.width=t,this.canvas.height=r}render(t,r,i,a){this.ctx.clearRect(0,0,this.width,this.height),this.config.showHorizon&&i&&this.drawHorizonLine(i),this.config.showPitchLadder&&t&&this.drawArtificialHorizon(t),this.config.showCompass&&r&&this.drawCompass(r),this.config.showDebug&&a&&this.drawDebugInfo(a,r)}drawHorizonLine(t){const{roll:r,pitch:i,confidence:a}=t,s=this.width/2,n=this.height/2,u=Math.max(this.width,this.height)*1.5,l=this.height/60,c=i*ke*l,h=Math.cos(-r),f=Math.sin(-r),g=s-u*h,y=n+c-u*f,_=s+u*h,w=n+c+u*f;this.ctx.strokeStyle=this.config.horizonColor,this.ctx.lineWidth=this.config.lineWidth,this.ctx.globalAlpha=.3+.7*a,this.ctx.beginPath(),this.ctx.moveTo(g,y),this.ctx.lineTo(_,w),this.ctx.stroke(),this.ctx.globalAlpha=1,this.ctx.fillStyle=this.config.textColor,this.ctx.font=`${this.config.fontSize}px monospace`,this.ctx.fillText(`HOR ${(a*100).toFixed(0)}%`,10,this.height-60)}drawArtificialHorizon(t){const{roll:r,pitch:i}=t,a=this.width/2,s=this.height/2;this.ctx.save(),this.ctx.translate(a,s),this.ctx.rotate(-r);const n=this.height/60,u=i*ke;this.ctx.strokeStyle=this.config.pitchLadderColor,this.ctx.fillStyle=this.config.textColor,this.ctx.font=`${this.config.fontSize-2}px monospace`,this.ctx.textAlign="right";for(let l=-30;l<=30;l+=10){if(l===0)continue;const c=(l-u)*n,h=Math.abs(l)>=20?50:80;this.ctx.beginPath(),this.ctx.moveTo(-h,c),this.ctx.lineTo(-20,c),this.ctx.moveTo(20,c),this.ctx.lineTo(h,c),this.ctx.stroke(),this.ctx.fillText(`${l}`,-h-5,c+4)}this.ctx.strokeStyle=this.config.horizonColor,this.ctx.lineWidth=this.config.lineWidth+1,this.ctx.beginPath(),this.ctx.moveTo(-this.width/3,-u*n),this.ctx.lineTo(this.width/3,-u*n),this.ctx.stroke(),this.ctx.strokeStyle=this.config.textColor,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(-30,0),this.ctx.lineTo(-10,0),this.ctx.lineTo(-10,10),this.ctx.moveTo(30,0),this.ctx.lineTo(10,0),this.ctx.lineTo(10,10),this.ctx.stroke(),this.ctx.restore(),this.drawRollIndicator(r),this.ctx.fillStyle=this.config.textColor,this.ctx.font=`${this.config.fontSize}px monospace`,this.ctx.textAlign="left",this.ctx.fillText(`ROLL ${(r*ke).toFixed(1)}°`,10,this.height-40),this.ctx.fillText(`PITCH ${(i*ke).toFixed(1)}°`,10,this.height-20)}drawRollIndicator(t){const r=this.width/2,i=80,a=50;this.ctx.save(),this.ctx.translate(r,a),this.ctx.strokeStyle="rgba(255, 255, 255, 0.3)",this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(0,0,i,Math.PI*.7,Math.PI*.3,!0),this.ctx.stroke(),this.ctx.strokeStyle=this.config.textColor;for(let n=-60;n<=60;n+=10){const u=(n+90)*Math.PI/180,l=n%30===0?i-15:i-10;this.ctx.beginPath(),this.ctx.moveTo(Math.cos(u)*l,-Math.sin(u)*l),this.ctx.lineTo(Math.cos(u)*i,-Math.sin(u)*i),this.ctx.stroke()}const s=(t*ke-90)*Math.PI/180;this.ctx.fillStyle=this.config.horizonColor,this.ctx.beginPath(),this.ctx.moveTo(Math.cos(s)*(i+5),-Math.sin(s)*(i+5)),this.ctx.lineTo(Math.cos(s-.1)*(i+15),-Math.sin(s-.1)*(i+15)),this.ctx.lineTo(Math.cos(s+.1)*(i+15),-Math.sin(s+.1)*(i+15)),this.ctx.closePath(),this.ctx.fill(),this.ctx.restore()}drawCompass(t){const r=this.width/2,i=30;this.ctx.fillStyle=this.config.textColor,this.ctx.font=`bold ${this.config.fontSize+4}px monospace`,this.ctx.textAlign="center",this.ctx.fillText(`${t.heading.toFixed(0)}°`,r,i);const a=this.width*.6,s=r-a/2,n=i+20;this.ctx.strokeStyle="rgba(255, 255, 255, 0.5)",this.ctx.beginPath(),this.ctx.moveTo(s,n),this.ctx.lineTo(s+a,n),this.ctx.stroke(),this.ctx.font=`${this.config.fontSize-2}px monospace`;const l=a/60;for(let c=-180;c<=180;c+=10){let h=t.heading+c;if(h=(h%360+360)%360,Math.abs(c)>30)continue;const f=r+c*l,g=c%30===0?10:5;if(this.ctx.beginPath(),this.ctx.moveTo(f,n),this.ctx.lineTo(f,n+g),this.ctx.stroke(),c%30===0){const y=this.getCardinalLabel(h);this.ctx.fillText(y,f,n+22)}}this.ctx.fillStyle=this.config.horizonColor,this.ctx.beginPath(),this.ctx.moveTo(r,n-5),this.ctx.lineTo(r-5,n-12),this.ctx.lineTo(r+5,n-12),this.ctx.closePath(),this.ctx.fill(),this.ctx.fillStyle="rgba(255, 255, 255, 0.6)",this.ctx.font=`${this.config.fontSize-4}px monospace`,this.ctx.fillText(`${t.source.toUpperCase()} ±${t.uncertainty.toFixed(0)}°`,r,n+38)}getCardinalLabel(t){return t=Math.round(t),t===0||t===360?"N":t===90?"E":t===180?"S":t===270?"W":`${t}`}drawDebugInfo(t,r){this.ctx.fillStyle="rgba(0, 0, 0, 0.5)",this.ctx.fillRect(this.width-180,10,170,100),this.ctx.fillStyle="#00ff00",this.ctx.font="12px monospace",this.ctx.textAlign="left",[`σ_roll: ${(t.rollStd*ke).toFixed(2)}°`,`σ_pitch: ${(t.pitchStd*ke).toFixed(2)}°`,`σ_yaw: ${(t.yawStd*ke).toFixed(2)}°`,r?`HDG src: ${r.source}`:"HDG: N/A",`t: ${t.timestamp}`].forEach((a,s)=>{this.ctx.fillText(a,this.width-170,28+s*16)})}setOption(t,r){this.config[t]=r}}const Ue={model:document.getElementById("status-model"),fps:document.getElementById("status-fps"),heading:document.getElementById("status-heading"),zoom:document.getElementById("status-zoom")},xi={btnZoom1:document.getElementById("btn-zoom-1"),btnZoom4:document.getElementById("btn-zoom-4"),btnRecord:document.getElementById("btn-record")},Q0=document.getElementById("debug-stats"),bi=document.getElementById("debug-overlay"),Un=document.getElementById("detection-canvas"),J0=document.getElementById("camera-container"),Pe=new Qm,Ci=new b0,Ef=new v0(Un),ey=new I0,ty=new k0,Ti=new E0,pt=new z0,on=new O0,iy=new U0,wi=new W0,Na=new q0(3),cr=new Z0,zf=new X0(Un),un=new kf;let vi=!1,ry=.5,Pa=0,Dd=Date.now(),Nd=0,Pd=0,Ua=0,La=null,Mt=null,Ot=null,Wa=null,$t=null;const ay=100,ny=10;async function sy(){lt.state=dt.LOADING;try{Pe.mount(J0),await Pe.start();const t=Pe.videoElement;t.videoWidth>0&&on.updateForResolution(t.videoWidth,t.videoHeight)}catch(t){console.error("Camera init failed:",t),Ue.model.textContent="● CAM ERROR",Ue.model.style.color="#ff5252";return}await Ci.init("yolo11n-blow.onnx"),Ci.useMock?(Ue.model.textContent="● MOCK",Ue.model.style.color="#ffc107"):(Ue.model.textContent="● LOADED",Ue.model.style.color="#4caf50"),await pt.requestPermission(),document.body.addEventListener("click",()=>{pt.permissionGranted||pt.requestPermission()},{once:!0});const e=pt.getLatestIMU();e&&wi.initializeFromAccel(e.accelWithGravity,Date.now()),"geolocation"in navigator&&(navigator.geolocation.getCurrentPosition(t=>{const r=t.coords.latitude,i=t.coords.longitude;cr.setLocation(r,i),un.setObserverPosition({latitude:r,longitude:i,accuracy:t.coords.accuracy}),Ti.setObserverPosition(r,i),console.log(`[Leviathan] GPS: ${r.toFixed(5)}, ${i.toFixed(5)} ± ${t.coords.accuracy?.toFixed(0)}m`)},t=>console.warn("Geolocation unavailable:",t),{enableHighAccuracy:!0}),navigator.geolocation.watchPosition(t=>{const r=t.coords.latitude,i=t.coords.longitude;cr.setLocation(r,i),un.setObserverPosition({latitude:r,longitude:i,accuracy:t.coords.accuracy}),Ti.setObserverPosition(r,i)},t=>console.warn("GPS update failed:",t),{enableHighAccuracy:!0,maximumAge:1e3,timeout:5e3})),lt.state=dt.READY,Ud(),window.addEventListener("resize",Ud),requestAnimationFrame(Af)}function Ud(){Ef.resize(window.innerWidth,window.innerHeight),zf.resize(window.innerWidth,window.innerHeight)}async function Af(){if(lt.state===dt.ERROR)return;const e=Date.now();Pa++,e-Dd>=1e3&&(Ue.fps.textContent=`${Pa} FPS`,Pa=0,Dd=e),on.updateForZoom(Pe.currentZoom);const t=on.getIntrinsics();if(e-Ua>=ny){const n=pt.getIMUSamplesSince(Ua);wi.processSamples(n);const u=pt.getLatestIMU();u&&Na.update(u.accel,e),Ua=e}if(e-Pd>=ay){const n=iy.detect(Pe.videoElement,t,Na.getStableHeight());n.horizon&&(La=n.horizon,wi.updateWithHorizon(n.horizon.roll,n.horizon.pitch)),Pd=e}Wa=wi.getState(),Mt=Wa.orientation,cr.updateFromCamera(Pe.videoElement,t);const r=pt.getMagneticHeading();Ot=cr.getHeading(r),Ue.heading.textContent=Ot?`${Ot.heading.toFixed(0)}°`:pt.getHeadingString(),Ue.zoom.textContent=`${Pe.currentZoom}x`;const i=await Ci.run(Pe.videoElement,.1),s=ey.update(i).filter(n=>n.confidence>=ry);if(s.length>0){lt.state!==dt.EVENT&&lt.state!==dt.DETECTING&&(lt.state=dt.DETECTING);const n=s.sort((u,l)=>l.confidence-u.confidence)[0];if($t=un.localize(n,t,Ot,Mt,Pe.currentZoom),vi&&e-Nd>2e3){const u=ty.estimate(n);Ti.captureWithLocation(n,u,$t,Un,Pe.currentZoom),Nd=e,$t&&console.log(`[Leviathan] BLOW DETECTED @ ${$t.position.latitude.toFixed(5)}, ${$t.position.longitude.toFixed(5)} - ${$t.distance}m @ ${$t.bearing}°`),Ue.model.textContent="● REC",Ue.model.style.color="#ff5252",setTimeout(()=>{Ue.model.textContent=Ci.useMock?"● MOCK":"● LOADED",Ue.model.style.color=Ci.useMock?"#ffc107":"#4caf50"},500)}}else lt.state===dt.DETECTING&&(lt.state=dt.READY),$t=null;if(Ef.draw(s),zf.render(Mt,Ot,La,Wa??void 0),bi.classList.contains("visible")){const n=Ti.getRecentEvents(),u=wi.getDiagnostics(),l={state:lt.state,heading:Ot?.heading.toFixed(1),headingSrc:Ot?.source,pitch:Mt?(Mt.pitch*180/Math.PI).toFixed(1):null,roll:Mt?(Mt.roll*180/Math.PI).toFixed(1):null,horizonConf:La?.confidence.toFixed(2),heave:Na.getInstantaneousHeight().toFixed(2),ekfReject:(u.rejectionRate*100).toFixed(1)+"%",imuRate:pt.getSampleRate().toFixed(0)+"Hz",zoom:Pe.currentZoom,events:Ti.events.length,last:n[0]?n[0].event_id.substring(0,4):"None"};Q0.textContent=JSON.stringify(l,null,2)}requestAnimationFrame(Af)}xi.btnZoom1.addEventListener("click",()=>Pe.setZoom(1));xi.btnZoom4.addEventListener("click",()=>Pe.setZoom(4));xi.btnRecord.addEventListener("click",()=>{vi=!vi,xi.btnRecord.classList.toggle("active",vi),xi.btnRecord.textContent=vi?"ARMED":"REC"});let ln=0;document.addEventListener("touchstart",e=>ln=e.touches[0].clientY);document.addEventListener("touchend",e=>{const t=e.changedTouches[0].clientY;t-ln>100?bi.classList.contains("visible")||bi.classList.add("visible"):ln-t>100&&bi.classList.contains("visible")&&bi.classList.remove("visible")});sy();
