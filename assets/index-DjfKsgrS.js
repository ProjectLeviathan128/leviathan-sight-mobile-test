(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();class wm{videoElement;stream=null;isReady=!1;constructor(){this.videoElement=document.createElement("video"),this.videoElement.setAttribute("playsinline","true"),this.videoElement.setAttribute("muted","true"),this.videoElement.autoplay=!0,this.videoElement.id="camera-feed",this.videoElement.style.position="absolute",this.videoElement.style.top="0",this.videoElement.style.left="0",this.videoElement.style.width="100%",this.videoElement.style.height="100%",this.videoElement.style.objectFit="cover",this.videoElement.style.zIndex="0"}async start(){if(!this.stream)try{const t={video:{facingMode:{ideal:"environment"},width:{ideal:3840},height:{ideal:2160}},audio:!1};this.stream=await navigator.mediaDevices.getUserMedia(t),this.videoElement.srcObject=this.stream;const i=this.stream.getVideoTracks()[0].getCapabilities();return i&&i.zoom&&(this.zoomMin=i.zoom.min,this.zoomMax=i.zoom.max,this.isZoomSupported=!0,console.log(`Zoom supported: ${this.zoomMin} - ${this.zoomMax}`)),new Promise(a=>{this.videoElement.onloadedmetadata=()=>{this.videoElement.play().then(()=>{this.isReady=!0,a()})}})}catch(t){throw console.error("Camera access denied or failed:",t),t}}isZoomSupported=!1;zoomMin=1;zoomMax=1;currentZoom=1;async setZoom(t){if(!this.stream||!this.isZoomSupported)return;const r=this.stream.getVideoTracks()[0],i=Math.max(this.zoomMin,Math.min(this.zoomMax,t));try{await r.applyConstraints({advanced:[{zoom:i}]}),this.currentZoom=i}catch(a){console.warn("Zoom failed:",a)}}Stop(){this.stream&&(this.stream.getTracks().forEach(t=>t.stop()),this.stream=null,this.isReady=!1)}mount(t){t.appendChild(this.videoElement)}}var Va=Object.defineProperty,$m=Object.getOwnPropertyDescriptor,vm=Object.getOwnPropertyNames,xm=Object.prototype.hasOwnProperty,Cm=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),q=(e,t)=>()=>(e&&(t=e(e=0)),t),Gt=(e,t)=>{for(var r in t)Va(e,r,{get:t[r],enumerable:!0})},Tm=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of vm(t))!xm.call(e,a)&&a!==r&&Va(e,a,{get:()=>t[a],enumerable:!(i=$m(t,a))||i.enumerable});return e},bi=e=>Tm(Va({},"__esModule",{value:!0}),e),Qt,mt,qt,zs,fd,hd=q(()=>{Qt=new Map,mt=[],qt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=Qt.get(e);if(i===void 0)Qt.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=mt.indexOf(e);a!==-1&&mt.splice(a,1);for(let s=0;s<mt.length;s++)if(Qt.get(mt[s]).priority<=r){mt.splice(s,0,e);return}mt.push(e)}return}throw new TypeError("not a valid backend")},zs=async e=>{let t=Qt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},fd=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),i=r.length===0?mt:r,a,s=[],o=new Set;for(let d of i){let p=await zs(d);typeof p=="string"?s.push({name:d,err:p}):(a||(a=p),a===p&&o.add(d))}if(!a)throw new Error(`no available backend found. ERR: ${s.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:p}of s)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${p}`);let u=t.filter(d=>o.has(typeof d=="string"?d:d.name));return[a,new Proxy(e,{get:(d,p)=>p==="executionProviders"?u:Reflect.get(d,p)})]}}),km=q(()=>{hd()}),md,Sm=q(()=>{md="1.23.2"}),kr,Ie,gd=q(()=>{Sm(),kr="warning",Ie={wasm:{},webgl:{},webgpu:{},versions:{common:md},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);kr=e}},get logLevel(){return kr}},Object.defineProperty(Ie,"logLevel",{enumerable:!0})}),_e,Im=q(()=>{gd(),_e=Ie}),yd,_d,Em=q(()=>{yd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[3]):(a=e.dims[3],s=e.dims[2]);let o=t?.format!==void 0?t.format:"RGB",u=t?.norm,d,p;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?p=[0,0,0,0]:typeof u.bias=="number"?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(p[3]=u.bias[3]));let f=s*a,h=0,g=f,y=f*2,b=-1;o==="RGBA"?(h=0,g=f,y=f*2,b=f*3):o==="RGB"?(h=0,g=f,y=f*2):o==="RBG"&&(h=0,y=f,g=f*2);for(let $=0;$<s;$++)for(let T=0;T<a;T++){let v=(e.data[h++]-p[0])*d[0],w=(e.data[g++]-p[1])*d[1],k=(e.data[y++]-p[2])*d[2],C=b===-1?255:(e.data[b++]-p[3])*d[3];i.fillStyle="rgba("+v+","+w+","+k+","+C+")",i.fillRect(T,$,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},_d=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,s,o;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],s=e.dims[1],o=e.dims[3]):(a=e.dims[3],s=e.dims[2],o=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t?.norm,p,f;d===void 0||d.mean===void 0?p=[255,255,255,255]:typeof d.mean=="number"?p=[d.mean,d.mean,d.mean,d.mean]:(p=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(p[3]=d.mean[3])),d===void 0||d.bias===void 0?f=[0,0,0,0]:typeof d.bias=="number"?f=[d.bias,d.bias,d.bias,d.bias]:(f=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(f[3]=d.bias[3]));let h=s*a;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!=="RGBA"||o===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,y=0,b=1,$=2,T=3,v=0,w=h,k=h*2,C=-1;u==="RGBA"?(v=0,w=h,k=h*2,C=h*3):u==="RGB"?(v=0,w=h,k=h*2):u==="RBG"&&(v=0,k=h,w=h*2),i=r.createImageData(a,s);for(let S=0;S<s*a;y+=g,b+=g,$+=g,T+=g,S++)i.data[y]=(e.data[v++]-f[0])*p[0],i.data[b]=(e.data[w++]-f[1])*p[1],i.data[$]=(e.data[k++]-f[2])*p[2],i.data[T]=C===-1?255:(e.data[C++]-f[3])*p[3]}else throw new Error("Can not access image data");return i}}),Oi,bd,wd,$d,vd,xd,zm=q(()=>{Ga(),Oi=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},s,o;typeof a.mean=="number"?s=[a.mean,a.mean,a.mean,a.mean]:s=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?o=[a.bias,a.bias,a.bias,a.bias]:o=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*i,f=d==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),h=4,g=0,y=1,b=2,$=3,T=0,v=p,w=p*2,k=-1;u==="RGB"&&(h=3,g=0,y=1,b=2,$=-1),d==="RGBA"?k=p*3:d==="RBG"?(T=0,w=p,v=p*2):d==="BGR"&&(w=0,v=p,T=p*2);for(let C=0;C<p;C++,g+=h,b+=h,y+=h,$+=h)f[T++]=(e[g]+o[0])/s[0],f[v++]=(e[y]+o[1])/s[1],f[w++]=(e[b]+o[2])/s[2],k!==-1&&$!==-1&&(f[k++]=(e[$]+o[3])/s[3]);return d==="RGBA"?new Ne("float32",f,[1,4,r,i]):new Ne("float32",f,[1,3,r,i])},bd=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",o,u=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=f=>typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||f instanceof OffscreenCanvas?f.getContext("2d"):null;if(r){let f=d();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let g=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=y}else u.tensorFormat="RGBA",u.height=g,u.width=y;h.drawImage(e,0,0),o=h.getImageData(0,0,y,g).data}else throw new Error("Can not access image data")}else if(i){let f,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(f=t.resizedHeight,h=t.resizedWidth):(f=e.height,h=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=f,u.width=h,t!==void 0){let g=d();g.width=h,g.height=f;let y=p(g);if(y!=null)y.putImageData(e,0,0),o=y.getImageData(0,0,h,f).data;else throw new Error("Can not access image data")}else o=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let f=d();f.width=e.width,f.height=e.height;let h=p(f);if(h!=null){let g=e.height,y=e.width;return h.drawImage(e,0,0,y,g),o=h.getImageData(0,0,y,g).data,u.height=g,u.width=y,Oi(o,u)}else throw new Error("Can not access image data")}else{if(s)return new Promise((f,h)=>{let g=d(),y=p(g);if(!e||!y)return h();let b=new Image;b.crossOrigin="Anonymous",b.src=e,b.onload=()=>{g.width=b.width,g.height=b.height,y.drawImage(b,0,0,g.width,g.height);let $=y.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,f(Oi($.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(o!==void 0)return Oi(o,u);throw new Error("Input data provided is not supported - aborted tensor creation")},wd=(e,t)=>{let{width:r,height:i,download:a,dispose:s}=t,o=[1,i,r,4];return new Ne({location:"texture",type:"float32",texture:e,dims:o,download:a,dispose:s})},$d=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:s}=t;return new Ne({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:s})},vd=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:s}=t;return new Ne({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:s})},xd=(e,t,r)=>new Ne({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),St,li,Sr,Cd,Am=q(()=>{St=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),li=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Sr=!1,Cd=()=>{if(!Sr){Sr=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(St.set("int64",BigInt64Array),li.set(BigInt64Array,"int64")),t&&(St.set("uint64",BigUint64Array),li.set(BigUint64Array,"uint64")),i?(St.set("float16",r),li.set(r,"float16")):St.set("float16",Uint16Array)}}}),Td,kd,Om=q(()=>{Ga(),Td=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},kd=(e,t)=>{switch(e.location){case"cpu":return new Ne(e.type,e.data,t);case"cpu-pinned":return new Ne({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ne({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ne({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ne({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ne,Ga=q(()=>{Em(),zm(),Am(),Om(),Ne=class{constructor(e,t,r){Cd();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let o=St.get(i);if(!o)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof o))throw new TypeError(`buffer should be of type ${o.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");o=t}else{let d=St.get(e);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&d===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${d.name} as data.`);e==="uint64"||e==="int64"?o=d.from(t,BigInt):o=d.from(t)}else if(t instanceof d)o=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")o=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&d!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${d}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof e[0];if(d==="string")i="string",o=e;else if(d==="boolean")i="bool",o=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",o=Uint8Array.from(e);else{let d=li.get(e.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=d,o=e}if(u===void 0)u=[o.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");a=u,this.cpuData=o,this.dataLocation="cpu"}let s=Td(a);if(this.cpuData&&s!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=s}static async fromImage(e,t){return bd(e,t)}static fromTexture(e,t){return wd(e,t)}static fromGpuBuffer(e,t){return $d(e,t)}static fromMLTensor(e,t){return vd(e,t)}static fromPinnedBuffer(e,t,r){return xd(e,t,r)}toDataURL(e){return yd(this,e)}toImageData(e){return _d(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return kd(this,e)}}}),Je,Sd=q(()=>{Ga(),Je=Ne}),Fi,Ir,et,Ke,zt,At,Id=q(()=>{gd(),Fi=(e,t)=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ir=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(s+=`::${t}`),Fi("CPU",s);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},et=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||Ir("BEGIN",e)},Ke=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||Ir("END",e)},zt=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||console.time(`ORT::${e}`)},At=e=>{(typeof Ie.trace>"u"?!Ie.wasm.trace:!Ie.trace)||console.timeEnd(`ORT::${e}`)}}),Ed,Rm=q(()=>{hd(),Sd(),Id(),Ed=class zd{constructor(t){this.handler=t}async run(t,r,i){et(),zt("InferenceSession.run");let a={},s={};if(typeof t!="object"||t===null||t instanceof Je||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let o=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Je)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");o=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);a[p]=null}if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,f=Object.getOwnPropertyNames(r);for(let h of this.outputNames)if(f.indexOf(h)!==-1){let g=r[h];(g===null||g instanceof Je)&&(p=!0,o=!1,a[h]=g)}if(p){if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(o)for(let p of this.outputNames)a[p]=null;let u=await this.handler.run(t,a,s),d={};for(let p in u)if(Object.hasOwnProperty.call(u,p)){let f=u[p];f instanceof Je?d[p]=f:d[p]=new Je(f.type,f.data,f.dims)}return At("InferenceSession.run"),Ke(),d}async release(){return this.handler.dispose()}static async create(t,r,i,a){et(),zt("InferenceSession.create");let s,o={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let f=t,h=0,g=t.byteLength;if(typeof r=="object"&&r!==null)o=r;else if(typeof r=="number"){if(h=r,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=f.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${f.byteLength}).`);if(g=t.byteLength-h,typeof i=="number"){if(g=i,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||h+g>f.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${f.byteLength-h}].`);if(typeof a=="object"&&a!==null)o=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(f,h,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,d]=await fd(o),p=await u.createInferenceSessionHandler(s,d);return At("InferenceSession.create"),Ke(),new zd(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ja,Bm=q(()=>{Rm(),ja=Ed}),Mm=q(()=>{}),Dm=q(()=>{}),Nm=q(()=>{}),Pm=q(()=>{}),Um={};Gt(Um,{InferenceSession:()=>ja,TRACE:()=>Fi,TRACE_EVENT_BEGIN:()=>zt,TRACE_EVENT_END:()=>At,TRACE_FUNC_BEGIN:()=>et,TRACE_FUNC_END:()=>Ke,Tensor:()=>Je,env:()=>_e,registerBackend:()=>qt});var Le=q(()=>{km(),Im(),Bm(),Sd(),Mm(),Dm(),Id(),Nm(),Pm()}),Ha=q(()=>{}),Ad={};Gt(Ad,{default:()=>Od});var Er,zr,Od,qm=q(()=>{Pf(),Dt(),Fa(),Er="ort-wasm-proxy-worker",zr=globalThis.self?.name===Er,zr&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Ka(r.wasm).then(()=>{cn(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;fn(a,i).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:i}=r,a=er(i);postMessage({type:t,out:a});break}case"create":{let{model:i,options:a}=r;hn(i,a).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":mn(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:a,inputs:s,outputIndices:o,options:u}=r;gn(i,a,s,o,new Array(o.length).fill(null),u).then(d=>{d.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:d},_n([...s,...d]))},d=>{postMessage({type:t,err:d})});break}case"end-profiling":yn(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),Od=zr?null:e=>new Worker(e??Me,{type:"module",name:Er})}),Rd={};Gt(Rd,{default:()=>Bd});var Ar,Bd,As,Lm=q(()=>{Ar=async function(e={}){var t,r,i=e,a=new Promise((n,l)=>{t=n,r=l}),s=typeof window=="object",o=typeof WorkerGlobalScope<"u",u=o&&self.name?.startsWith("em-pthread");i.mountExternalData=(n,l)=>{n.startsWith("./")&&(n=n.substring(2)),(i.Fb||(i.Fb=new Map)).set(n,l)},i.unmountExternalData=()=>{delete i.Fb};var d=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let p=n=>async(...l)=>{try{if(i.Gb)throw Error("Session already started");let c=i.Gb={ec:l[0],errors:[]},m=await n(...l);if(i.Gb!==c)throw Error("Session mismatch");i.Kb?.flush();let _=c.errors;if(0<_.length){let x=await Promise.all(_);if(x=x.filter(I=>I),0<x.length)throw Error(x.join(`
`))}return m}finally{i.Gb=null}};i.jsepInit=(n,l)=>{if(n==="webgpu"){[i.Kb,i.Vb,i.Zb,i.Lb,i.Yb,i.Ab,i.$b,i.bc,i.Wb,i.Xb,i.ac]=l;let c=i.Kb;i.jsepRegisterBuffer=(m,_,x,I)=>c.registerBuffer(m,_,x,I),i.jsepGetBuffer=m=>c.getBuffer(m),i.jsepCreateDownloader=(m,_,x)=>c.createDownloader(m,_,x),i.jsepOnCreateSession=m=>{c.onCreateSession(m)},i.jsepOnReleaseSession=m=>{c.onReleaseSession(m)},i.jsepOnRunStart=m=>c.onRunStart(m),i.cc=(m,_)=>{c.upload(m,_)}}else if(n==="webnn"){let c=l[0];[i.oc,i.Ob,i.webnnEnsureTensor,i.Pb,i.webnnDownloadTensor,i.nc,i.webnnEnableTraceEvent]=l.slice(1),i.webnnReleaseTensorId=i.Ob,i.webnnUploadTensor=i.Pb,i.webnnRegisterMLContext=i.nc,i.webnnOnRunStart=m=>c.onRunStart(m),i.webnnOnRunEnd=c.onRunEnd.bind(c),i.webnnOnReleaseSession=m=>{c.onReleaseSession(m)},i.webnnCreateMLTensorDownloader=(m,_)=>c.createMLTensorDownloader(m,_),i.webnnRegisterMLTensor=(m,_,x,I)=>c.registerMLTensor(m,_,x,I),i.webnnCreateMLContext=m=>c.createMLContext(m),i.webnnRegisterMLConstant=(m,_,x,I,O,N)=>c.registerMLConstant(m,_,x,I,O,i.Fb,N),i.webnnRegisterGraphInput=c.registerGraphInput.bind(c),i.webnnIsGraphInput=c.isGraphInput.bind(c),i.webnnRegisterGraphOutput=c.registerGraphOutput.bind(c),i.webnnIsGraphOutput=c.isGraphOutput.bind(c),i.webnnCreateTemporaryTensor=c.createTemporaryTensor.bind(c),i.webnnIsGraphInputOutputTypeSupported=c.isGraphInputOutputTypeSupported.bind(c)}};let f=()=>{let n=(l,c,m)=>(..._)=>{let x=Xe,I=c?.();_=l(..._);let O=c?.();return I!==O&&(l=O,m(I),c=m=null),Xe!=x?new Promise((N,L)=>{mr={resolve:N,reject:L}}):_};(()=>{for(let l of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])i[l]=n(i[l],()=>i[l],c=>i[l]=c)})(),p!==void 0&&(i._OrtRun=p(i._OrtRun),i._OrtRunWithBinding=p(i._OrtRunWithBinding)),f=void 0};i.asyncInit=()=>{f?.()};var h,g,y=(n,l)=>{throw l},b=import.meta.url,$="";if(s||o){try{$=new URL(".",b).href}catch{}o&&(g=n=>{var l=new XMLHttpRequest;return l.open("GET",n,!1),l.responseType="arraybuffer",l.send(null),new Uint8Array(l.response)}),h=async n=>{if(ge(n))return new Promise((c,m)=>{var _=new XMLHttpRequest;_.open("GET",n,!0),_.responseType="arraybuffer",_.onload=()=>{_.status==200||_.status==0&&_.response?c(_.response):m(_.status)},_.onerror=m,_.send(null)});var l=await fetch(n,{credentials:"same-origin"});if(l.ok)return l.arrayBuffer();throw Error(l.status+" : "+l.url)}}var T,v,w,k,C,S,z,E,R,U,V,Z,X,re,G,se=console.log.bind(console),J=console.error.bind(console),H=se,ae=J,j=!1,ge=n=>n.startsWith("file://");function P(){return v.buffer!=C.buffer&&Ce(),C}function W(){return v.buffer!=C.buffer&&Ce(),S}function ie(){return v.buffer!=C.buffer&&Ce(),z}function pe(){return v.buffer!=C.buffer&&Ce(),E}function D(){return v.buffer!=C.buffer&&Ce(),R}function le(){return v.buffer!=C.buffer&&Ce(),U}function Ze(){return v.buffer!=C.buffer&&Ce(),V}function be(){return v.buffer!=C.buffer&&Ce(),re}if(u){let n=function(l){try{var c=l.data,m=c.Db;if(m==="load"){let _=[];self.onmessage=x=>_.push(x),self.startWorker=()=>{postMessage({Db:"loaded"});for(let x of _)n(x);self.onmessage=n};for(let x of c.Sb)i[x]&&!i[x].proxy||(i[x]=(...I)=>{postMessage({Db:"callHandler",Rb:x,args:I})},x=="print"&&(H=i[x]),x=="printErr"&&(ae=i[x]));v=c.kc,Ce(),G(c.lc)}else if(m==="run"){eh(c.Bb),$r(c.Bb,0,0,1,0,0),kn(),fr(c.Bb),we||(_s(),we=!0);try{th(c.hc,c.Jb)}catch(_){if(_!="unwind")throw _}}else c.target!=="setimmediate"&&(m==="checkMailbox"?we&&vi():m&&(ae(`worker: received unknown command ${m}`),ae(c)))}catch(_){throw bs(),_}};var we=!1;self.onunhandledrejection=l=>{throw l.reason||l},self.onmessage=n}function Ce(){var n=v.buffer;i.HEAP8=C=new Int8Array(n),z=new Int16Array(n),i.HEAPU8=S=new Uint8Array(n),E=new Uint16Array(n),i.HEAP32=R=new Int32Array(n),i.HEAPU32=U=new Uint32Array(n),V=new Float32Array(n),re=new Float64Array(n),Z=new BigInt64Array(n),X=new BigUint64Array(n)}function $i(){u?startWorker(i):B.Da()}var jt,Ht=0,Ft=null;function bn(){if(--Ht==0&&Ft){var n=Ft;Ft=null,n()}}function dt(n){throw ae(n="Aborted("+n+")"),j=!0,n=new WebAssembly.RuntimeError(n+". Build with -sASSERTIONS for more info."),r(n),n}function wn(){return{a:{L:_m,Aa:ym,b:rh,$:zn,A:Rn,pa:Bn,X:Mn,Z:Dn,qa:Nn,na:Pn,ga:Un,ma:qn,J:Ln,Y:Wn,V:Vn,oa:Gn,W:jn,va:ah,E:nh,Q:sh,O:uh,D:dh,v:ph,s:ch,P:fh,z:wh,R:$h,ja:vh,T:xh,aa:Ch,M:Th,F:kh,ia:fr,sa:Sh,r:Ih,Ca:Eh,w:Oh,o:Rh,m:Mh,c:lr,Ba:Dh,n:Nh,j:qh,u:Lh,p:Wh,f:Vh,t:Gh,l:jh,e:Hh,k:Fh,h:Kh,g:Zh,d:Yh,da:Xh,ea:Qh,fa:Jh,ba:as,ca:ns,N:ss,xa:tm,ua:rm,i:am,C:nm,G:sm,ta:im,x:om,ra:um,U:lm,q:em,y:dm,K:pm,S:cm,za:fm,ya:hm,ka:ds,la:ps,_:nr,B:cs,I:fs,ha:hs,H:ms,a:v,wa:ar}}}class ir{name="ExitStatus";constructor(l){this.message=`Program terminated with exit(${l})`,this.status=l}}var $n=n=>{n.terminate(),n.onmessage=()=>{}},rr=[],vn=n=>{ct.length==0&&(In(),Sn(ct[0]));var l=ct.pop();if(!l)return 6;Kt.push(l),wt[n.Bb]=l,l.Bb=n.Bb;var c={Db:"run",hc:n.fc,Jb:n.Jb,Bb:n.Bb};return l.postMessage(c,n.Nb),0},pt=0,$e=(n,l,...c)=>{for(var m=2*c.length,_=Cr(),x=xr(8*m),I=x>>>3,O=0;O<c.length;O++){var N=c[O];typeof N=="bigint"?(Z[I+2*O]=1n,Z[I+2*O+1]=N):(Z[I+2*O]=0n,be()[I+2*O+1>>>0]=N)}return n=ws(n,0,m,x,l),Ai(_),n};function ar(n){if(u)return $e(0,1,n);if(k=n,!(0<pt)){for(var l of Kt)$n(l);for(l of ct)$n(l);ct=[],Kt=[],wt={},j=!0}y(0,new ir(n))}function xn(n){if(u)return $e(1,0,n);nr(n)}var nr=n=>{if(k=n,u)throw xn(n),"unwind";ar(n)},ct=[],Kt=[],Cn=[],wt={},Tn=n=>{var l=n.Bb;delete wt[l],ct.push(n),Kt.splice(Kt.indexOf(n),1),n.Bb=0,$s(l)};function kn(){Cn.forEach(n=>n())}var Sn=n=>new Promise(l=>{n.onmessage=_=>{var x=(_=_.data).Db;if(_.Hb&&_.Hb!=wr()){var I=wt[_.Hb];I?I.postMessage(_,_.Nb):ae(`Internal error! Worker sent a message "${x}" to target pthread ${_.Hb}, but that thread no longer exists!`)}else x==="checkMailbox"?vi():x==="spawnThread"?vn(_):x==="cleanupThread"?Tn(wt[_.ic]):x==="loaded"?(n.loaded=!0,l(n)):_.target==="setimmediate"?n.postMessage(_):x==="callHandler"?i[_.Rb](..._.args):x&&ae(`worker sent an unknown command ${x}`)},n.onerror=_=>{throw ae(`worker sent an error! ${_.filename}:${_.lineno}: ${_.message}`),_};var c,m=[];for(c of[])i.propertyIsEnumerable(c)&&m.push(c);n.postMessage({Db:"load",Sb:m,kc:v,lc:w})});function In(){var n=new Worker((()=>{let l=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new l("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});ct.push(n)}var eh=n=>{Ce();var l=le()[n+52>>>2>>>0];n=le()[n+56>>>2>>>0],Cs(l,l-n),Ai(l)},th=(n,l)=>{pt=0,n=Ts(n,l),0<pt?k=n:vr(n)};class ih{constructor(l){this.Ib=l-24}}function rh(n,l,c){var m=new ih(n>>>=0);throw l>>>=0,c>>>=0,le()[m.Ib+16>>>2>>>0]=0,le()[m.Ib+4>>>2>>>0]=l,le()[m.Ib+8>>>2>>>0]=c,n}function En(n,l,c,m){return u?$e(2,1,n,l,c,m):zn(n,l,c,m)}function zn(n,l,c,m){if(n>>>=0,c>>>=0,m>>>=0,d===void 0)return 6;var _=[];return u&&_.length===0?En(n,l>>>=0,c,m):(n={fc:c,Bb:n,Jb:m,Nb:_},u?(n.Db="spawnThread",postMessage(n,_),0):vn(n))}var An=typeof TextDecoder<"u"?new TextDecoder:void 0,On=(n,l=0,c=NaN)=>{var m=(l>>>=0)+c;for(c=l;n[c]&&!(c>=m);)++c;if(16<c-l&&n.buffer&&An)return An.decode(n.buffer instanceof ArrayBuffer?n.subarray(l,c):n.slice(l,c));for(m="";l<c;){var _=n[l++];if(128&_){var x=63&n[l++];if((224&_)==192)m+=String.fromCharCode((31&_)<<6|x);else{var I=63&n[l++];65536>(_=(240&_)==224?(15&_)<<12|x<<6|I:(7&_)<<18|x<<12|I<<6|63&n[l++])?m+=String.fromCharCode(_):(_-=65536,m+=String.fromCharCode(55296|_>>10,56320|1023&_))}}else m+=String.fromCharCode(_)}return m},Te=(n,l)=>(n>>>=0)?On(W(),n,l):"";function Rn(n,l,c){return u?$e(3,1,n,l,c):0}function Bn(n,l){if(u)return $e(4,1,n,l)}function Mn(n,l){if(u)return $e(5,1,n,l)}function Dn(n,l,c){if(u)return $e(6,1,n,l,c)}function Nn(n,l,c){return u?$e(7,1,n,l,c):0}function Pn(n,l){if(u)return $e(8,1,n,l)}function Un(n,l,c){if(u)return $e(9,1,n,l,c)}function qn(n,l,c,m){if(u)return $e(10,1,n,l,c,m)}function Ln(n,l,c,m){if(u)return $e(11,1,n,l,c,m)}function Wn(n,l,c,m){if(u)return $e(12,1,n,l,c,m)}function Vn(n){if(u)return $e(13,1,n)}function Gn(n,l){if(u)return $e(14,1,n,l)}function jn(n,l,c){if(u)return $e(15,1,n,l,c)}var Hn,ah=()=>dt(""),Ye=n=>{for(var l="";W()[n>>>0];)l+=Hn[W()[n++>>>0]];return l},sr={},or={},Pt=i.BindingError=class extends Error{constructor(n){super(n),this.name="BindingError"}};function tt(n,l,c={}){return(function(m,_,x={}){var I=_.name;if(!m)throw new Pt(`type "${I}" must have a positive integer typeid pointer`);if(or.hasOwnProperty(m)){if(x.Tb)return;throw new Pt(`Cannot register type '${I}' twice`)}or[m]=_,sr.hasOwnProperty(m)&&(_=sr[m],delete sr[m],_.forEach(O=>O()))})(n,l,c)}var Fn=(n,l,c)=>{switch(l){case 1:return c?m=>P()[m>>>0]:m=>W()[m>>>0];case 2:return c?m=>ie()[m>>>1>>>0]:m=>pe()[m>>>1>>>0];case 4:return c?m=>D()[m>>>2>>>0]:m=>le()[m>>>2>>>0];case 8:return c?m=>Z[m>>>3]:m=>X[m>>>3];default:throw new TypeError(`invalid integer width (${l}): ${n}`)}};function nh(n,l,c){c>>>=0,tt(n>>>=0,{name:l=Ye(l>>>0),fromWireType:m=>m,toWireType:function(m,_){if(typeof _!="bigint"&&typeof _!="number")throw _=_===null?"null":(m=typeof _)=="object"||m==="array"||m==="function"?_.toString():""+_,new TypeError(`Cannot convert "${_}" to ${this.name}`);return typeof _=="number"&&(_=BigInt(_)),_},Cb:ft,readValueFromPointer:Fn(l,c,l.indexOf("u")==-1),Eb:null})}var ft=8;function sh(n,l,c,m){tt(n>>>=0,{name:l=Ye(l>>>0),fromWireType:function(_){return!!_},toWireType:function(_,x){return x?c:m},Cb:ft,readValueFromPointer:function(_){return this.fromWireType(W()[_>>>0])},Eb:null})}var ur=[],it=[];function lr(n){9<(n>>>=0)&&--it[n+1]==0&&(it[n]=void 0,ur.push(n))}var Oe=n=>{if(!n)throw new Pt(`Cannot use deleted val. handle = ${n}`);return it[n]},Ue=n=>{switch(n){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let l=ur.pop()||it.length;return it[l]=n,it[l+1]=1,l}};function dr(n){return this.fromWireType(le()[n>>>2>>>0])}var oh={name:"emscripten::val",fromWireType:n=>{var l=Oe(n);return lr(n),l},toWireType:(n,l)=>Ue(l),Cb:ft,readValueFromPointer:dr,Eb:null};function uh(n){return tt(n>>>0,oh)}var lh=(n,l)=>{switch(l){case 4:return function(c){return this.fromWireType(Ze()[c>>>2>>>0])};case 8:return function(c){return this.fromWireType(be()[c>>>3>>>0])};default:throw new TypeError(`invalid float width (${l}): ${n}`)}};function dh(n,l,c){c>>>=0,tt(n>>>=0,{name:l=Ye(l>>>0),fromWireType:m=>m,toWireType:(m,_)=>_,Cb:ft,readValueFromPointer:lh(l,c),Eb:null})}function ph(n,l,c,m,_){if(n>>>=0,c>>>=0,l=Ye(l>>>0),_===-1&&(_=4294967295),_=O=>O,m===0){var x=32-8*c;_=O=>O<<x>>>x}var I=l.includes("unsigned")?function(O,N){return N>>>0}:function(O,N){return N};tt(n,{name:l,fromWireType:_,toWireType:I,Cb:ft,readValueFromPointer:Fn(l,c,m!==0),Eb:null})}function ch(n,l,c){function m(x){var I=le()[x>>>2>>>0];return x=le()[x+4>>>2>>>0],new _(P().buffer,x,I)}var _=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][l];tt(n>>>=0,{name:c=Ye(c>>>0),fromWireType:m,Cb:ft,readValueFromPointer:m},{Tb:!0})}var $t=(n,l,c)=>{var m=W();if(l>>>=0,0<c){var _=l;c=l+c-1;for(var x=0;x<n.length;++x){var I=n.charCodeAt(x);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&n.charCodeAt(++x)),127>=I){if(l>=c)break;m[l++>>>0]=I}else{if(2047>=I){if(l+1>=c)break;m[l++>>>0]=192|I>>6}else{if(65535>=I){if(l+2>=c)break;m[l++>>>0]=224|I>>12}else{if(l+3>=c)break;m[l++>>>0]=240|I>>18,m[l++>>>0]=128|I>>12&63}m[l++>>>0]=128|I>>6&63}m[l++>>>0]=128|63&I}}m[l>>>0]=0,n=l-_}else n=0;return n},pr=n=>{for(var l=0,c=0;c<n.length;++c){var m=n.charCodeAt(c);127>=m?l++:2047>=m?l+=2:55296<=m&&57343>=m?(l+=4,++c):l+=3}return l};function fh(n,l){tt(n>>>=0,{name:l=Ye(l>>>0),fromWireType:function(c){for(var m,_=le()[c>>>2>>>0],x=c+4,I=x,O=0;O<=_;++O){var N=x+O;O!=_&&W()[N>>>0]!=0||(I=Te(I,N-I),m===void 0?m=I:(m+="\0",m+=I),I=N+1)}return rt(c),m},toWireType:function(c,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var _=typeof m=="string";if(!(_||ArrayBuffer.isView(m)&&m.BYTES_PER_ELEMENT==1))throw new Pt("Cannot pass non-string to std::string");var x=_?pr(m):m.length,I=zi(4+x+1),O=I+4;return le()[I>>>2>>>0]=x,_?$t(m,O,x+1):W().set(m,O>>>0),c!==null&&c.push(rt,I),I},Cb:ft,readValueFromPointer:dr,Eb(c){rt(c)}})}var Kn=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,hh=(n,l)=>{for(var c=n>>1,m=c+l/2;!(c>=m)&&pe()[c>>>0];)++c;if(32<(c<<=1)-n&&Kn)return Kn.decode(W().slice(n,c));for(c="",m=0;!(m>=l/2);++m){var _=ie()[n+2*m>>>1>>>0];if(_==0)break;c+=String.fromCharCode(_)}return c},mh=(n,l,c)=>{if(c??=2147483647,2>c)return 0;var m=l;c=(c-=2)<2*n.length?c/2:n.length;for(var _=0;_<c;++_){var x=n.charCodeAt(_);ie()[l>>>1>>>0]=x,l+=2}return ie()[l>>>1>>>0]=0,l-m},gh=n=>2*n.length,yh=(n,l)=>{for(var c=0,m="";!(c>=l/4);){var _=D()[n+4*c>>>2>>>0];if(_==0)break;++c,65536<=_?(_-=65536,m+=String.fromCharCode(55296|_>>10,56320|1023&_)):m+=String.fromCharCode(_)}return m},_h=(n,l,c)=>{if(l>>>=0,c??=2147483647,4>c)return 0;var m=l;c=m+c-4;for(var _=0;_<n.length;++_){var x=n.charCodeAt(_);if(55296<=x&&57343>=x&&(x=65536+((1023&x)<<10)|1023&n.charCodeAt(++_)),D()[l>>>2>>>0]=x,(l+=4)+4>c)break}return D()[l>>>2>>>0]=0,l-m},bh=n=>{for(var l=0,c=0;c<n.length;++c){var m=n.charCodeAt(c);55296<=m&&57343>=m&&++c,l+=4}return l};function wh(n,l,c){if(n>>>=0,l>>>=0,c=Ye(c>>>=0),l===2)var m=hh,_=mh,x=gh,I=O=>pe()[O>>>1>>>0];else l===4&&(m=yh,_=_h,x=bh,I=O=>le()[O>>>2>>>0]);tt(n,{name:c,fromWireType:O=>{for(var N,L=le()[O>>>2>>>0],F=O+4,ee=0;ee<=L;++ee){var ue=O+4+ee*l;ee!=L&&I(ue)!=0||(F=m(F,ue-F),N===void 0?N=F:(N+="\0",N+=F),F=ue+l)}return rt(O),N},toWireType:(O,N)=>{if(typeof N!="string")throw new Pt(`Cannot pass non-string to C++ string type ${c}`);var L=x(N),F=zi(4+L+l);return le()[F>>>2>>>0]=L/l,_(N,F+4,L+l),O!==null&&O.push(rt,F),F},Cb:ft,readValueFromPointer:dr,Eb(O){rt(O)}})}function $h(n,l){tt(n>>>=0,{Ub:!0,name:l=Ye(l>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function vh(n){$r(n>>>0,!o,1,!s,131072,!1),kn()}var cr=n=>{if(!j)try{if(n(),!(0<pt))try{u?vr(k):nr(k)}catch(l){l instanceof ir||l=="unwind"||y(0,l)}}catch(l){l instanceof ir||l=="unwind"||y(0,l)}};function fr(n){n>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(D(),n>>>2,n).value.then(vi),n+=128,Atomics.store(D(),n>>>2,1))}var vi=()=>{var n=wr();n&&(fr(n),cr(xs))};function xh(n,l){(n>>>=0)==l>>>0?setTimeout(vi):u?postMessage({Hb:n,Db:"checkMailbox"}):(n=wt[n])&&n.postMessage({Db:"checkMailbox"})}var hr=[];function Ch(n,l,c,m,_){for(l>>>=0,m/=2,hr.length=m,c=_>>>0>>>3,_=0;_<m;_++)hr[_]=Z[c+2*_]?Z[c+2*_+1]:be()[c+2*_+1>>>0];return(l?br[l]:gm[n])(...hr)}var Th=()=>{pt=0};function kh(n){n>>>=0,u?postMessage({Db:"cleanupThread",ic:n}):Tn(wt[n])}function Sh(n){}var xi=(n,l)=>{var c=or[n];if(c===void 0)throw n=ys(n),c=Ye(n),rt(n),new Pt(`${l} has unknown type ${c}`);return c},Zn=(n,l,c)=>{var m=[];return n=n.toWireType(m,c),m.length&&(le()[l>>>2>>>0]=Ue(m)),n};function Ih(n,l,c){return l>>>=0,c>>>=0,n=Oe(n>>>0),l=xi(l,"emval::as"),Zn(l,c,n)}function Eh(n,l){return l>>>=0,n=Oe(n>>>0),(l=xi(l,"emval::as")).toWireType(null,n)}var Ci=n=>{try{n()}catch(l){dt(l)}},ht=0,Xe=null,Yn=0,Ti=[],Xn={},Qn={},zh=0,mr=null,Ah=[];function Jn(n){return(function(l){if(!j){if(ht===0){var c=!1,m=!1;l((_=0)=>{if(!j&&(Yn=_,c=!0,m)){ht=2,Ci(()=>Is(Xe)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),_=!1;try{var x=(function(){var N=D()[Xe+8>>>2>>>0];return N=B[Qn[N]],--pt,N()})()}catch(N){x=N,_=!0}var I=!1;if(!Xe){var O=mr;O&&(mr=null,(_?O.reject:O.resolve)(x),I=!0)}if(_&&!I)throw x}}),m=!0,c||(ht=1,Xe=(function(){var _=zi(65548),x=_+12;le()[_>>>2>>>0]=x,le()[_+4>>>2>>>0]=x+65536,x=Ti[0];var I=Xn[x];return I===void 0&&(I=zh++,Xn[x]=I,Qn[I]=x),x=I,D()[_+8>>>2>>>0]=x,_})(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),Ci(()=>ks(Xe)))}else ht===2?(ht=0,Ci(Es),rt(Xe),Xe=null,Ah.forEach(cr)):dt(`invalid state: ${ht}`);return Yn}})(l=>{n().then(l)})}function Oh(n){return n>>>=0,Jn(async()=>{var l=await Oe(n);return Ue(l)})}var ki=[];function Rh(n,l,c,m){return c>>>=0,m>>>=0,(n=ki[n>>>0])(null,l=Oe(l>>>0),c,m)}var Bh={},Si=n=>{var l=Bh[n];return l===void 0?Ye(n):l};function Mh(n,l,c,m,_){return c>>>=0,m>>>=0,_>>>=0,(n=ki[n>>>0])(l=Oe(l>>>0),l[c=Si(c)],m,_)}function Dh(n,l){return l>>>=0,(n=Oe(n>>>0))==Oe(l)}var es=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Nh(n){return(n>>>=0)==0?Ue(es()):(n=Si(n),Ue(es()[n]))}var Ph=n=>{var l=ki.length;return ki.push(n),l},Uh=(n,l)=>{for(var c=Array(n),m=0;m<n;++m)c[m]=xi(le()[l+4*m>>>2>>>0],`parameter ${m}`);return c};function qh(n,l,c){var m=(l=Uh(n,l>>>0)).shift();n--;var _=`return function (obj, func, destructorsRef, args) {
`,x=0,I=[];c===0&&I.push("obj");for(var O=["retType"],N=[m],L=0;L<n;++L)I.push(`arg${L}`),O.push(`argType${L}`),N.push(l[L]),_+=`  var arg${L} = argType${L}.readValueFromPointer(args${x?"+"+x:""});
`,x+=l[L].Cb;return _+=`  var rv = ${c===1?"new func":"func.call"}(${I.join(", ")});
`,m.Ub||(O.push("emval_returnValue"),N.push(Zn),_+=`  return emval_returnValue(retType, destructorsRef, rv);
`),n=new Function(...O,_+`};
`)(...N),c=`methodCaller<(${l.map(F=>F.name).join(", ")}) => ${m.name}>`,Ph(Object.defineProperty(n,"name",{value:c}))}function Lh(n){return n=Si(n>>>0),Ue(i[n])}function Wh(n,l){return l>>>=0,n=Oe(n>>>0),l=Oe(l),Ue(n[l])}function Vh(n){9<(n>>>=0)&&(it[n+1]+=1)}function Gh(){return Ue([])}function jh(n){n=Oe(n>>>0);for(var l=Array(n.length),c=0;c<n.length;c++)l[c]=n[c];return Ue(l)}function Hh(n){return Ue(Si(n>>>0))}function Fh(){return Ue({})}function Kh(n){for(var l=Oe(n>>>=0);l.length;){var c=l.pop();l.pop()(c)}lr(n)}function Zh(n,l,c){l>>>=0,c>>>=0,n=Oe(n>>>0),l=Oe(l),c=Oe(c),n[l]=c}function Yh(n,l){return l>>>=0,n=(n=xi(n>>>0,"_emval_take_value")).readValueFromPointer(l),Ue(n)}function Xh(n,l){n=-9007199254740992>n||9007199254740992<n?NaN:Number(n),l>>>=0,n=new Date(1e3*n),D()[l>>>2>>>0]=n.getUTCSeconds(),D()[l+4>>>2>>>0]=n.getUTCMinutes(),D()[l+8>>>2>>>0]=n.getUTCHours(),D()[l+12>>>2>>>0]=n.getUTCDate(),D()[l+16>>>2>>>0]=n.getUTCMonth(),D()[l+20>>>2>>>0]=n.getUTCFullYear()-1900,D()[l+24>>>2>>>0]=n.getUTCDay(),n=(n.getTime()-Date.UTC(n.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,D()[l+28>>>2>>>0]=n}var ts=n=>n%4==0&&(n%100!=0||n%400==0),is=[0,31,60,91,121,152,182,213,244,274,305,335],rs=[0,31,59,90,120,151,181,212,243,273,304,334];function Qh(n,l){n=-9007199254740992>n||9007199254740992<n?NaN:Number(n),l>>>=0,n=new Date(1e3*n),D()[l>>>2>>>0]=n.getSeconds(),D()[l+4>>>2>>>0]=n.getMinutes(),D()[l+8>>>2>>>0]=n.getHours(),D()[l+12>>>2>>>0]=n.getDate(),D()[l+16>>>2>>>0]=n.getMonth(),D()[l+20>>>2>>>0]=n.getFullYear()-1900,D()[l+24>>>2>>>0]=n.getDay();var c=(ts(n.getFullYear())?is:rs)[n.getMonth()]+n.getDate()-1|0;D()[l+28>>>2>>>0]=c,D()[l+36>>>2>>>0]=-60*n.getTimezoneOffset(),c=new Date(n.getFullYear(),6,1).getTimezoneOffset();var m=new Date(n.getFullYear(),0,1).getTimezoneOffset();n=0|(c!=m&&n.getTimezoneOffset()==Math.min(m,c)),D()[l+32>>>2>>>0]=n}function Jh(n){n>>>=0;var l=new Date(D()[n+20>>>2>>>0]+1900,D()[n+16>>>2>>>0],D()[n+12>>>2>>>0],D()[n+8>>>2>>>0],D()[n+4>>>2>>>0],D()[n>>>2>>>0],0),c=D()[n+32>>>2>>>0],m=l.getTimezoneOffset(),_=new Date(l.getFullYear(),6,1).getTimezoneOffset(),x=new Date(l.getFullYear(),0,1).getTimezoneOffset(),I=Math.min(x,_);return 0>c?D()[n+32>>>2>>>0]=+(_!=x&&I==m):0<c!=(I==m)&&(_=Math.max(x,_),l.setTime(l.getTime()+6e4*((0<c?I:_)-m))),D()[n+24>>>2>>>0]=l.getDay(),c=(ts(l.getFullYear())?is:rs)[l.getMonth()]+l.getDate()-1|0,D()[n+28>>>2>>>0]=c,D()[n>>>2>>>0]=l.getSeconds(),D()[n+4>>>2>>>0]=l.getMinutes(),D()[n+8>>>2>>>0]=l.getHours(),D()[n+12>>>2>>>0]=l.getDate(),D()[n+16>>>2>>>0]=l.getMonth(),D()[n+20>>>2>>>0]=l.getYear(),n=l.getTime(),BigInt(isNaN(n)?-1:n/1e3)}function as(n,l,c,m,_,x,I){return u?$e(16,1,n,l,c,m,_,x,I):-52}function ns(n,l,c,m,_,x){if(u)return $e(17,1,n,l,c,m,_,x)}var Zt={},em=()=>performance.timeOrigin+performance.now();function ss(n,l){if(u)return $e(18,1,n,l);if(Zt[n]&&(clearTimeout(Zt[n].id),delete Zt[n]),!l)return 0;var c=setTimeout(()=>{delete Zt[n],cr(()=>vs(n,performance.timeOrigin+performance.now()))},l);return Zt[n]={id:c,rc:l},0}function tm(n,l,c,m){n>>>=0,l>>>=0,c>>>=0,m>>>=0;var _=new Date().getFullYear(),x=new Date(_,0,1).getTimezoneOffset();_=new Date(_,6,1).getTimezoneOffset();var I=Math.max(x,_);le()[n>>>2>>>0]=60*I,D()[l>>>2>>>0]=+(x!=_),n=(l=O=>{var N=Math.abs(O);return`UTC${0<=O?"-":"+"}${String(Math.floor(N/60)).padStart(2,"0")}${String(N%60).padStart(2,"0")}`})(x),l=l(_),_<x?($t(n,c,17),$t(l,m,17)):($t(n,m,17),$t(l,c,17))}var im=()=>Date.now();function rm(n,l,c){return 0<=n&&3>=n?(n===0?n=Date.now():n=performance.timeOrigin+performance.now(),Z[c>>>0>>>3]=BigInt(Math.round(1e6*n)),0):28}var gr=[],os=(n,l)=>{gr.length=0;for(var c;c=W()[n++>>>0];){var m=c!=105;l+=(m&=c!=112)&&l%8?4:0,gr.push(c==112?le()[l>>>2>>>0]:c==106?Z[l>>>3]:c==105?D()[l>>>2>>>0]:be()[l>>>3>>>0]),l+=m?8:4}return gr};function am(n,l,c){return n>>>=0,l=os(l>>>0,c>>>0),br[n](...l)}function nm(n,l,c){return n>>>=0,l=os(l>>>0,c>>>0),br[n](...l)}var sm=()=>{};function om(n,l){return ae(Te(n>>>0,l>>>0))}var um=()=>{throw pt+=1,"unwind"};function lm(){return 4294901760}var dm=()=>navigator.hardwareConcurrency;function pm(){return dt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function cm(n){n>>>=0;var l=W().length;if(n<=l||4294901760<n)return!1;for(var c=1;4>=c;c*=2){var m=l*(1+.2/c);m=Math.min(m,n+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(n,m)/65536))-v.buffer.byteLength+65535)/65536|0;try{v.grow(m),Ce();var _=1;break e}catch{}_=void 0}if(_)return!0}return!1}var Ii=()=>(dt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Yt={},us=n=>{n.forEach(l=>{Ii()})};function fm(){var n=Error().stack.toString().split(`
`);return n[0]=="Error"&&n.shift(),us(n),Yt.Mb=Ii(),Yt.dc=n,Yt.Mb}function hm(n,l,c){if(n>>>=0,l>>>=0,Yt.Mb==n)var m=Yt.dc;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),us(m);for(var _=3;m[_]&&Ii()!=n;)++_;for(n=0;n<c&&m[n+_];++n)D()[l+4*n>>>2>>>0]=Ii();return n}var yr,_r={},ls=()=>{if(!yr){var n,l={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(n in _r)_r[n]===void 0?delete l[n]:l[n]=_r[n];var c=[];for(n in l)c.push(`${n}=${l[n]}`);yr=c}return yr};function ds(n,l){if(u)return $e(19,1,n,l);n>>>=0,l>>>=0;var c,m=0,_=0;for(c of ls()){var x=l+m;le()[n+_>>>2>>>0]=x,m+=$t(c,x,1/0)+1,_+=4}return 0}function ps(n,l){if(u)return $e(20,1,n,l);n>>>=0,l>>>=0;var c=ls();for(var m of(le()[n>>>2>>>0]=c.length,n=0,c))n+=pr(m)+1;return le()[l>>>2>>>0]=n,0}function cs(n){return u?$e(21,1,n):52}function fs(n,l,c,m){return u?$e(22,1,n,l,c,m):52}function hs(n,l,c,m){return u?$e(23,1,n,l,c,m):70}var mm=[null,[],[]];function ms(n,l,c,m){if(u)return $e(24,1,n,l,c,m);l>>>=0,c>>>=0,m>>>=0;for(var _=0,x=0;x<c;x++){var I=le()[l>>>2>>>0],O=le()[l+4>>>2>>>0];l+=8;for(var N=0;N<O;N++){var L=n,F=W()[I+N>>>0],ee=mm[L];F===0||F===10?((L===1?H:ae)(On(ee)),ee.length=0):ee.push(F)}_+=O}return le()[m>>>2>>>0]=_,0}u||(function(){for(var n=i.numThreads-1;n--;)In();rr.push(()=>{Ht++,(function(l){u?l():Promise.all(ct.map(Sn)).then(l)})(()=>bn())})})();for(var gs=Array(256),Ei=0;256>Ei;++Ei)gs[Ei]=String.fromCharCode(Ei);Hn=gs,it.push(0,1,void 0,1,null,1,!0,1,!1,1),i.count_emval_handles=()=>it.length/2-5-ur.length,u||(v=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Ce()),i.wasmBinary&&(T=i.wasmBinary),i.stackSave=()=>Cr(),i.stackRestore=n=>Ai(n),i.stackAlloc=n=>xr(n),i.setValue=function(n,l,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":P()[n>>>0]=l;break;case"i16":ie()[n>>>1>>>0]=l;break;case"i32":D()[n>>>2>>>0]=l;break;case"i64":Z[n>>>3]=BigInt(l);break;case"float":Ze()[n>>>2>>>0]=l;break;case"double":be()[n>>>3>>>0]=l;break;case"*":le()[n>>>2>>>0]=l;break;default:dt(`invalid type for setValue: ${c}`)}},i.getValue=function(n,l="i8"){switch(l.endsWith("*")&&(l="*"),l){case"i1":case"i8":return P()[n>>>0];case"i16":return ie()[n>>>1>>>0];case"i32":return D()[n>>>2>>>0];case"i64":return Z[n>>>3];case"float":return Ze()[n>>>2>>>0];case"double":return be()[n>>>3>>>0];case"*":return le()[n>>>2>>>0];default:dt(`invalid type for getValue: ${l}`)}},i.UTF8ToString=Te,i.stringToUTF8=$t,i.lengthBytesUTF8=pr;var gm=[ar,xn,En,Rn,Bn,Mn,Dn,Nn,Pn,Un,qn,Ln,Wn,Vn,Gn,jn,as,ns,ss,ds,ps,cs,fs,hs,ms],br={893836:(n,l,c,m,_)=>{if(i===void 0||!i.Fb)return 1;if((n=Te(Number(n>>>0))).startsWith("./")&&(n=n.substring(2)),!(n=i.Fb.get(n)))return 2;if(l=Number(l>>>0),c=Number(c>>>0),m=Number(m>>>0),l+c>n.byteLength)return 3;try{let x=n.subarray(l,l+c);switch(_){case 0:W().set(x,m>>>0);break;case 1:i.mc?i.mc(m,x):i.cc(m,x);break;default:return 4}return 0}catch{return 4}},894660:(n,l,c)=>{i.Pb(n,W().subarray(l>>>0,l+c>>>0))},894724:()=>i.oc(),894766:n=>{i.Ob(n)},894803:()=>{i.Wb()},894834:()=>{i.Xb()},894863:()=>{i.ac()},894888:n=>i.Vb(n),894921:n=>i.Zb(n),894953:(n,l,c)=>{i.Lb(Number(n),Number(l),Number(c),!0)},895016:(n,l,c)=>{i.Lb(Number(n),Number(l),Number(c))},895073:()=>typeof wasmOffsetConverter<"u",895130:n=>{i.Ab("Abs",n,void 0)},895181:n=>{i.Ab("Neg",n,void 0)},895232:n=>{i.Ab("Floor",n,void 0)},895285:n=>{i.Ab("Ceil",n,void 0)},895337:n=>{i.Ab("Reciprocal",n,void 0)},895395:n=>{i.Ab("Sqrt",n,void 0)},895447:n=>{i.Ab("Exp",n,void 0)},895498:n=>{i.Ab("Erf",n,void 0)},895549:n=>{i.Ab("Sigmoid",n,void 0)},895604:(n,l,c)=>{i.Ab("HardSigmoid",n,{alpha:l,beta:c})},895683:n=>{i.Ab("Log",n,void 0)},895734:n=>{i.Ab("Sin",n,void 0)},895785:n=>{i.Ab("Cos",n,void 0)},895836:n=>{i.Ab("Tan",n,void 0)},895887:n=>{i.Ab("Asin",n,void 0)},895939:n=>{i.Ab("Acos",n,void 0)},895991:n=>{i.Ab("Atan",n,void 0)},896043:n=>{i.Ab("Sinh",n,void 0)},896095:n=>{i.Ab("Cosh",n,void 0)},896147:n=>{i.Ab("Asinh",n,void 0)},896200:n=>{i.Ab("Acosh",n,void 0)},896253:n=>{i.Ab("Atanh",n,void 0)},896306:n=>{i.Ab("Tanh",n,void 0)},896358:n=>{i.Ab("Not",n,void 0)},896409:(n,l,c)=>{i.Ab("Clip",n,{min:l,max:c})},896478:n=>{i.Ab("Clip",n,void 0)},896530:(n,l)=>{i.Ab("Elu",n,{alpha:l})},896588:n=>{i.Ab("Gelu",n,void 0)},896640:n=>{i.Ab("Relu",n,void 0)},896692:(n,l)=>{i.Ab("LeakyRelu",n,{alpha:l})},896756:(n,l)=>{i.Ab("ThresholdedRelu",n,{alpha:l})},896826:(n,l)=>{i.Ab("Cast",n,{to:l})},896884:n=>{i.Ab("Add",n,void 0)},896935:n=>{i.Ab("Sub",n,void 0)},896986:n=>{i.Ab("Mul",n,void 0)},897037:n=>{i.Ab("Div",n,void 0)},897088:n=>{i.Ab("Pow",n,void 0)},897139:n=>{i.Ab("Equal",n,void 0)},897192:n=>{i.Ab("Greater",n,void 0)},897247:n=>{i.Ab("GreaterOrEqual",n,void 0)},897309:n=>{i.Ab("Less",n,void 0)},897361:n=>{i.Ab("LessOrEqual",n,void 0)},897420:(n,l,c,m,_)=>{i.Ab("ReduceMean",n,{keepDims:!!l,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},897595:(n,l,c,m,_)=>{i.Ab("ReduceMax",n,{keepDims:!!l,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},897769:(n,l,c,m,_)=>{i.Ab("ReduceMin",n,{keepDims:!!l,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},897943:(n,l,c,m,_)=>{i.Ab("ReduceProd",n,{keepDims:!!l,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},898118:(n,l,c,m,_)=>{i.Ab("ReduceSum",n,{keepDims:!!l,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},898292:(n,l,c,m,_)=>{i.Ab("ReduceL1",n,{keepDims:!!l,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},898465:(n,l,c,m,_)=>{i.Ab("ReduceL2",n,{keepDims:!!l,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},898638:(n,l,c,m,_)=>{i.Ab("ReduceLogSum",n,{keepDims:!!l,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},898815:(n,l,c,m,_)=>{i.Ab("ReduceSumSquare",n,{keepDims:!!l,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},898995:(n,l,c,m,_)=>{i.Ab("ReduceLogSumExp",n,{keepDims:!!l,noopWithEmptyAxes:!!c,axes:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},899175:n=>{i.Ab("Where",n,void 0)},899228:(n,l,c)=>{i.Ab("Transpose",n,{perm:l?Array.from(D().subarray(Number(l)>>>0,Number(c)>>>0)):[]})},899352:(n,l,c,m)=>{i.Ab("DepthToSpace",n,{blocksize:l,mode:Te(c),format:m?"NHWC":"NCHW"})},899485:(n,l,c,m)=>{i.Ab("DepthToSpace",n,{blocksize:l,mode:Te(c),format:m?"NHWC":"NCHW"})},899618:(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke)=>{i.Ab("ConvTranspose",n,{format:N?"NHWC":"NCHW",autoPad:l,dilations:[c],group:m,kernelShape:[_],pads:[x,I],strides:[O],wIsConst:()=>!!P()[L>>>0],outputPadding:F?Array.from(D().subarray(Number(F)>>>0,Number(ee)>>>0)):[],outputShape:ue?Array.from(D().subarray(Number(ue)>>>0,Number(fe)>>>0)):[],activation:Te(ke)})},900051:(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe)=>{i.Ab("ConvTranspose",n,{format:O?"NHWC":"NCHW",autoPad:l,dilations:Array.from(D().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:m,kernelShape:Array.from(D().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(I)>>>0,2+(Number(I)>>>0)>>>0)),wIsConst:()=>!!P()[N>>>0],outputPadding:L?Array.from(D().subarray(Number(L)>>>0,Number(F)>>>0)):[],outputShape:ee?Array.from(D().subarray(Number(ee)>>>0,Number(ue)>>>0)):[],activation:Te(fe)})},900712:(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke)=>{i.Ab("ConvTranspose",n,{format:N?"NHWC":"NCHW",autoPad:l,dilations:[c],group:m,kernelShape:[_],pads:[x,I],strides:[O],wIsConst:()=>!!P()[L>>>0],outputPadding:F?Array.from(D().subarray(Number(F)>>>0,Number(ee)>>>0)):[],outputShape:ue?Array.from(D().subarray(Number(ue)>>>0,Number(fe)>>>0)):[],activation:Te(ke)})},901145:(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe)=>{i.Ab("ConvTranspose",n,{format:O?"NHWC":"NCHW",autoPad:l,dilations:Array.from(D().subarray(Number(c)>>>0,2+(Number(c)>>>0)>>>0)),group:m,kernelShape:Array.from(D().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(I)>>>0,2+(Number(I)>>>0)>>>0)),wIsConst:()=>!!P()[N>>>0],outputPadding:L?Array.from(D().subarray(Number(L)>>>0,Number(F)>>>0)):[],outputShape:ee?Array.from(D().subarray(Number(ee)>>>0,Number(ue)>>>0)):[],activation:Te(fe)})},901806:(n,l)=>{i.Ab("GlobalAveragePool",n,{format:l?"NHWC":"NCHW"})},901897:(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe)=>{i.Ab("AveragePool",n,{format:fe?"NHWC":"NCHW",auto_pad:l,ceil_mode:c,count_include_pad:m,storage_order:_,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:O?Array.from(D().subarray(Number(O)>>>0,Number(N)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(F)>>>0)):[],strides:ee?Array.from(D().subarray(Number(ee)>>>0,Number(ue)>>>0)):[]})},902376:(n,l)=>{i.Ab("GlobalAveragePool",n,{format:l?"NHWC":"NCHW"})},902467:(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe)=>{i.Ab("AveragePool",n,{format:fe?"NHWC":"NCHW",auto_pad:l,ceil_mode:c,count_include_pad:m,storage_order:_,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:O?Array.from(D().subarray(Number(O)>>>0,Number(N)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(F)>>>0)):[],strides:ee?Array.from(D().subarray(Number(ee)>>>0,Number(ue)>>>0)):[]})},902946:(n,l)=>{i.Ab("GlobalMaxPool",n,{format:l?"NHWC":"NCHW"})},903033:(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe)=>{i.Ab("MaxPool",n,{format:fe?"NHWC":"NCHW",auto_pad:l,ceil_mode:c,count_include_pad:m,storage_order:_,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:O?Array.from(D().subarray(Number(O)>>>0,Number(N)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(F)>>>0)):[],strides:ee?Array.from(D().subarray(Number(ee)>>>0,Number(ue)>>>0)):[]})},903508:(n,l)=>{i.Ab("GlobalMaxPool",n,{format:l?"NHWC":"NCHW"})},903595:(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe)=>{i.Ab("MaxPool",n,{format:fe?"NHWC":"NCHW",auto_pad:l,ceil_mode:c,count_include_pad:m,storage_order:_,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:O?Array.from(D().subarray(Number(O)>>>0,Number(N)>>>0)):[],pads:L?Array.from(D().subarray(Number(L)>>>0,Number(F)>>>0)):[],strides:ee?Array.from(D().subarray(Number(ee)>>>0,Number(ue)>>>0)):[]})},904070:(n,l,c,m,_)=>{i.Ab("Gemm",n,{alpha:l,beta:c,transA:m,transB:_})},904174:n=>{i.Ab("MatMul",n,void 0)},904228:(n,l,c,m)=>{i.Ab("ArgMax",n,{keepDims:!!l,selectLastIndex:!!c,axis:m})},904336:(n,l,c,m)=>{i.Ab("ArgMin",n,{keepDims:!!l,selectLastIndex:!!c,axis:m})},904444:(n,l)=>{i.Ab("Softmax",n,{axis:l})},904507:(n,l)=>{i.Ab("Concat",n,{axis:l})},904567:(n,l,c,m,_)=>{i.Ab("Split",n,{axis:l,numOutputs:c,splitSizes:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},904723:n=>{i.Ab("Expand",n,void 0)},904777:(n,l)=>{i.Ab("Gather",n,{axis:Number(l)})},904848:(n,l)=>{i.Ab("GatherElements",n,{axis:Number(l)})},904927:(n,l)=>{i.Ab("GatherND",n,{batch_dims:Number(l)})},905006:(n,l,c,m,_,x,I,O,N,L,F)=>{i.Ab("Resize",n,{antialias:l,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(m)>>>0)):[],coordinateTransformMode:Te(_),cubicCoeffA:x,excludeOutside:I,extrapolationValue:O,keepAspectRatioPolicy:Te(N),mode:Te(L),nearestMode:Te(F)})},905368:(n,l,c,m,_,x,I)=>{i.Ab("Slice",n,{starts:l?Array.from(D().subarray(Number(l)>>>0,Number(c)>>>0)):[],ends:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[],axes:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[]})},905632:n=>{i.Ab("Tile",n,void 0)},905684:(n,l,c)=>{i.Ab("InstanceNormalization",n,{epsilon:l,format:c?"NHWC":"NCHW"})},905798:(n,l,c)=>{i.Ab("InstanceNormalization",n,{epsilon:l,format:c?"NHWC":"NCHW"})},905912:n=>{i.Ab("Range",n,void 0)},905965:(n,l)=>{i.Ab("Einsum",n,{equation:Te(l)})},906046:(n,l,c,m,_)=>{i.Ab("Pad",n,{mode:l,value:c,pads:m?Array.from(D().subarray(Number(m)>>>0,Number(_)>>>0)):[]})},906189:(n,l,c,m,_,x)=>{i.Ab("BatchNormalization",n,{epsilon:l,momentum:c,spatial:!!_,trainingMode:!!m,format:x?"NHWC":"NCHW"})},906358:(n,l,c,m,_,x)=>{i.Ab("BatchNormalization",n,{epsilon:l,momentum:c,spatial:!!_,trainingMode:!!m,format:x?"NHWC":"NCHW"})},906527:(n,l,c)=>{i.Ab("CumSum",n,{exclusive:Number(l),reverse:Number(c)})},906624:(n,l,c)=>{i.Ab("DequantizeLinear",n,{axis:l,blockSize:c})},906714:(n,l,c,m,_)=>{i.Ab("GridSample",n,{align_corners:l,mode:Te(c),padding_mode:Te(m),format:_?"NHWC":"NCHW"})},906884:(n,l,c,m,_)=>{i.Ab("GridSample",n,{align_corners:l,mode:Te(c),padding_mode:Te(m),format:_?"NHWC":"NCHW"})},907054:(n,l)=>{i.Ab("ScatterND",n,{reduction:Te(l)})},907139:(n,l,c,m,_,x,I,O,N)=>{i.Ab("Attention",n,{numHeads:l,isUnidirectional:c,maskFilterValue:m,scale:_,doRotary:x,qkvHiddenSizes:I?Array.from(D().subarray(Number(O)>>>0,Number(O)+I>>>0)):[],pastPresentShareBuffer:!!N})},907411:n=>{i.Ab("BiasAdd",n,void 0)},907466:n=>{i.Ab("BiasSplitGelu",n,void 0)},907527:n=>{i.Ab("FastGelu",n,void 0)},907583:(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be)=>{i.Ab("Conv",n,{format:ee?"NHWC":"NCHW",auto_pad:l,dilations:c?Array.from(D().subarray(Number(c)>>>0,Number(m)>>>0)):[],group:_,kernel_shape:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],pads:O?Array.from(D().subarray(Number(O)>>>0,Number(N)>>>0)):[],strides:L?Array.from(D().subarray(Number(L)>>>0,Number(F)>>>0)):[],w_is_const:()=>!!P()[Number(ue)>>>0],activation:Te(fe),activation_params:ke?Array.from(Ze().subarray(Number(ke)>>>0,Number(Be)>>>0)):[]})},908167:n=>{i.Ab("Gelu",n,void 0)},908219:(n,l,c,m,_,x,I,O,N)=>{i.Ab("GroupQueryAttention",n,{numHeads:l,kvNumHeads:c,scale:m,softcap:_,doRotary:x,rotaryInterleaved:I,smoothSoftmax:O,localWindowSize:N})},908436:(n,l,c,m)=>{i.Ab("LayerNormalization",n,{axis:l,epsilon:c,simplified:!!m})},908547:(n,l,c,m)=>{i.Ab("LayerNormalization",n,{axis:l,epsilon:c,simplified:!!m})},908658:(n,l,c,m,_,x)=>{i.Ab("MatMulNBits",n,{k:l,n:c,accuracyLevel:m,bits:_,blockSize:x})},908785:(n,l,c,m,_,x)=>{i.Ab("MultiHeadAttention",n,{numHeads:l,isUnidirectional:c,maskFilterValue:m,scale:_,doRotary:x})},908944:(n,l)=>{i.Ab("QuickGelu",n,{alpha:l})},909008:(n,l,c,m,_)=>{i.Ab("RotaryEmbedding",n,{interleaved:!!l,numHeads:c,rotaryEmbeddingDim:m,scale:_})},909147:(n,l,c)=>{i.Ab("SkipLayerNormalization",n,{epsilon:l,simplified:!!c})},909249:(n,l,c)=>{i.Ab("SkipLayerNormalization",n,{epsilon:l,simplified:!!c})},909351:(n,l,c,m)=>{i.Ab("GatherBlockQuantized",n,{gatherAxis:l,quantizeAxis:c,blockSize:m})},909472:n=>{i.$b(n)},909506:(n,l)=>i.bc(Number(n),Number(l),i.Gb.ec,i.Gb.errors)};function ym(n,l,c){return Jn(async()=>{await i.Yb(Number(n),Number(l),Number(c))})}function _m(){return typeof wasmOffsetConverter<"u"}var B=await(async function(){function n(m,_){return B=m.exports,B=(function(){var x=B,I={};for(let[O,N]of Object.entries(x))I[O]=typeof N=="function"?(...L)=>{Ti.push(O);try{return N(...L)}finally{j||(Ti.pop(),Xe&&ht===1&&Ti.length===0&&(ht=0,pt+=1,Ci(Ss),typeof Fibers<"u"&&Fibers.sc()))}}:N;return I})(),B=(function(){var x=B,I=N=>L=>N(L)>>>0,O=N=>()=>N()>>>0;return(x=Object.assign({},x)).Ea=I(x.Ea),x.gb=O(x.gb),x.ib=I(x.ib),x.tb=I(x.tb),x.ub=O(x.ub),x.__cxa_get_exception_ptr=I(x.__cxa_get_exception_ptr),x})(),Cn.push(B.jb),w=_,bn(),B}Ht++;var l=wn();if(i.instantiateWasm)return new Promise(m=>{i.instantiateWasm(l,(_,x)=>{m(n(_,x))})});if(u)return new Promise(m=>{G=_=>{var x=new WebAssembly.Instance(_,wn());m(n(x,_))}});jt??=i.locateFile?i.locateFile?i.locateFile("ort-wasm-simd-threaded.jsep.wasm",$):$+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep-BGTZ4Y7F.wasm",import.meta.url).href,import.meta.url).href;try{var c=await(async function(m){var _=jt;if(!T&&typeof WebAssembly.instantiateStreaming=="function"&&!ge(_))try{var x=fetch(_,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(x,m)}catch(I){ae(`wasm streaming compile failed: ${I}`),ae("falling back to ArrayBuffer instantiation")}return(async function(I,O){try{var N=await(async function(L){if(!T)try{var F=await h(L);return new Uint8Array(F)}catch{}if(L==jt&&T)L=new Uint8Array(T);else{if(!g)throw"both async and sync fetching of the wasm failed";L=g(L)}return L})(I);return await WebAssembly.instantiate(N,O)}catch(L){ae(`failed to asynchronously prepare wasm: ${L}`),dt(L)}})(_,m)})(l);return n(c.instance,c.module)}catch(m){return r(m),Promise.reject(m)}})(),ys=n=>(ys=B.Ea)(n),_s=()=>(_s=B.Fa)();i._OrtInit=(n,l)=>(i._OrtInit=B.Ga)(n,l),i._OrtGetLastError=(n,l)=>(i._OrtGetLastError=B.Ha)(n,l),i._OrtCreateSessionOptions=(n,l,c,m,_,x,I,O,N,L)=>(i._OrtCreateSessionOptions=B.Ia)(n,l,c,m,_,x,I,O,N,L),i._OrtAppendExecutionProvider=(n,l,c,m,_)=>(i._OrtAppendExecutionProvider=B.Ja)(n,l,c,m,_),i._OrtAddFreeDimensionOverride=(n,l,c)=>(i._OrtAddFreeDimensionOverride=B.Ka)(n,l,c),i._OrtAddSessionConfigEntry=(n,l,c)=>(i._OrtAddSessionConfigEntry=B.La)(n,l,c),i._OrtReleaseSessionOptions=n=>(i._OrtReleaseSessionOptions=B.Ma)(n),i._OrtCreateSession=(n,l,c)=>(i._OrtCreateSession=B.Na)(n,l,c),i._OrtReleaseSession=n=>(i._OrtReleaseSession=B.Oa)(n),i._OrtGetInputOutputCount=(n,l,c)=>(i._OrtGetInputOutputCount=B.Pa)(n,l,c),i._OrtGetInputOutputMetadata=(n,l,c,m)=>(i._OrtGetInputOutputMetadata=B.Qa)(n,l,c,m),i._OrtFree=n=>(i._OrtFree=B.Ra)(n),i._OrtCreateTensor=(n,l,c,m,_,x)=>(i._OrtCreateTensor=B.Sa)(n,l,c,m,_,x),i._OrtGetTensorData=(n,l,c,m,_)=>(i._OrtGetTensorData=B.Ta)(n,l,c,m,_),i._OrtReleaseTensor=n=>(i._OrtReleaseTensor=B.Ua)(n),i._OrtCreateRunOptions=(n,l,c,m)=>(i._OrtCreateRunOptions=B.Va)(n,l,c,m),i._OrtAddRunConfigEntry=(n,l,c)=>(i._OrtAddRunConfigEntry=B.Wa)(n,l,c),i._OrtReleaseRunOptions=n=>(i._OrtReleaseRunOptions=B.Xa)(n),i._OrtCreateBinding=n=>(i._OrtCreateBinding=B.Ya)(n),i._OrtBindInput=(n,l,c)=>(i._OrtBindInput=B.Za)(n,l,c),i._OrtBindOutput=(n,l,c,m)=>(i._OrtBindOutput=B._a)(n,l,c,m),i._OrtClearBoundOutputs=n=>(i._OrtClearBoundOutputs=B.$a)(n),i._OrtReleaseBinding=n=>(i._OrtReleaseBinding=B.ab)(n),i._OrtRunWithBinding=(n,l,c,m,_)=>(i._OrtRunWithBinding=B.bb)(n,l,c,m,_),i._OrtRun=(n,l,c,m,_,x,I,O)=>(i._OrtRun=B.cb)(n,l,c,m,_,x,I,O),i._OrtEndProfiling=n=>(i._OrtEndProfiling=B.db)(n),i._JsepOutput=(n,l,c)=>(i._JsepOutput=B.eb)(n,l,c),i._JsepGetNodeName=n=>(i._JsepGetNodeName=B.fb)(n);var wr=()=>(wr=B.gb)(),rt=i._free=n=>(rt=i._free=B.hb)(n),zi=i._malloc=n=>(zi=i._malloc=B.ib)(n),$r=(n,l,c,m,_,x)=>($r=B.kb)(n,l,c,m,_,x),bs=()=>(bs=B.lb)(),ws=(n,l,c,m,_)=>(ws=B.mb)(n,l,c,m,_),$s=n=>($s=B.nb)(n),vr=n=>(vr=B.ob)(n),vs=(n,l)=>(vs=B.pb)(n,l),xs=()=>(xs=B.qb)(),Cs=(n,l)=>(Cs=B.rb)(n,l),Ai=n=>(Ai=B.sb)(n),xr=n=>(xr=B.tb)(n),Cr=()=>(Cr=B.ub)(),Ts=i.dynCall_ii=(n,l)=>(Ts=i.dynCall_ii=B.vb)(n,l);i.dynCall_vii=(n,l,c)=>(i.dynCall_vii=B.dynCall_vii)(n,l,c),i.dynCall_iiiii=(n,l,c,m,_)=>(i.dynCall_iiiii=B.dynCall_iiiii)(n,l,c,m,_),i.dynCall_iii=(n,l,c)=>(i.dynCall_iii=B.dynCall_iii)(n,l,c),i.dynCall_iiiiii=(n,l,c,m,_,x)=>(i.dynCall_iiiiii=B.dynCall_iiiiii)(n,l,c,m,_,x),i.dynCall_iiiiiiii=(n,l,c,m,_,x,I,O)=>(i.dynCall_iiiiiiii=B.dynCall_iiiiiiii)(n,l,c,m,_,x,I,O),i.dynCall_iiiiiii=(n,l,c,m,_,x,I)=>(i.dynCall_iiiiiii=B.dynCall_iiiiiii)(n,l,c,m,_,x,I),i.dynCall_vi=(n,l)=>(i.dynCall_vi=B.dynCall_vi)(n,l),i.dynCall_iiii=(n,l,c,m)=>(i.dynCall_iiii=B.dynCall_iiii)(n,l,c,m),i.dynCall_i=n=>(i.dynCall_i=B.dynCall_i)(n),i.dynCall_viiiiiiii=(n,l,c,m,_,x,I,O,N)=>(i.dynCall_viiiiiiii=B.dynCall_viiiiiiii)(n,l,c,m,_,x,I,O,N),i.dynCall_viii=(n,l,c,m)=>(i.dynCall_viii=B.dynCall_viii)(n,l,c,m),i.dynCall_viijj=(n,l,c,m,_)=>(i.dynCall_viijj=B.dynCall_viijj)(n,l,c,m,_),i.dynCall_viiiiii=(n,l,c,m,_,x,I)=>(i.dynCall_viiiiii=B.dynCall_viiiiii)(n,l,c,m,_,x,I),i.dynCall_viiii=(n,l,c,m,_)=>(i.dynCall_viiii=B.dynCall_viiii)(n,l,c,m,_),i.dynCall_viiiii=(n,l,c,m,_,x)=>(i.dynCall_viiiii=B.dynCall_viiiii)(n,l,c,m,_,x),i.dynCall_vfiii=(n,l,c,m,_)=>(i.dynCall_vfiii=B.dynCall_vfiii)(n,l,c,m,_),i.dynCall_viiiiff=(n,l,c,m,_,x,I)=>(i.dynCall_viiiiff=B.dynCall_viiiiff)(n,l,c,m,_,x,I),i.dynCall_viiiiiff=(n,l,c,m,_,x,I,O)=>(i.dynCall_viiiiiff=B.dynCall_viiiiiff)(n,l,c,m,_,x,I,O),i.dynCall_ffff=(n,l,c,m)=>(i.dynCall_ffff=B.dynCall_ffff)(n,l,c,m),i.dynCall_viiff=(n,l,c,m,_)=>(i.dynCall_viiff=B.dynCall_viiff)(n,l,c,m,_),i.dynCall_fffffff=(n,l,c,m,_,x,I)=>(i.dynCall_fffffff=B.dynCall_fffffff)(n,l,c,m,_,x,I),i.dynCall_jjjjjjj=(n,l,c,m,_,x,I)=>(i.dynCall_jjjjjjj=B.dynCall_jjjjjjj)(n,l,c,m,_,x,I),i.dynCall_jjjjjj=(n,l,c,m,_,x)=>(i.dynCall_jjjjjj=B.dynCall_jjjjjj)(n,l,c,m,_,x),i.dynCall_iijjii=(n,l,c,m,_,x)=>(i.dynCall_iijjii=B.dynCall_iijjii)(n,l,c,m,_,x),i.dynCall_viiiiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe)=>(i.dynCall_viiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe),i.dynCall_viiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F)=>(i.dynCall_viiiiiiiiii=B.dynCall_viiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F),i.dynCall_viiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F,ee)=>(i.dynCall_viiiiiiiiiii=B.dynCall_viiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F,ee),i.dynCall_viiiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F,ee,ue)=>(i.dynCall_viiiiiiiiiiii=B.dynCall_viiiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F,ee,ue),i.dynCall_viiiiiiiiiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be,at,vt,Xt)=>(i.dynCall_viiiiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be,at,vt,Xt),i.dynCall_viiiiiiiii=(n,l,c,m,_,x,I,O,N,L)=>(i.dynCall_viiiiiiiii=B.dynCall_viiiiiiiii)(n,l,c,m,_,x,I,O,N,L),i.dynCall_viiiiiiiiiiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be,at,vt,Xt,Tr)=>(i.dynCall_viiiiiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be,at,vt,Xt,Tr),i.dynCall_viiiiiii=(n,l,c,m,_,x,I,O)=>(i.dynCall_viiiiiii=B.dynCall_viiiiiii)(n,l,c,m,_,x,I,O),i.dynCall_viiiiiiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be)=>(i.dynCall_viiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be),i.dynCall_jiji=(n,l,c,m)=>(i.dynCall_jiji=B.dynCall_jiji)(n,l,c,m),i.dynCall_v=n=>(i.dynCall_v=B.dynCall_v)(n),i.dynCall_iidiiii=(n,l,c,m,_,x,I)=>(i.dynCall_iidiiii=B.dynCall_iidiiii)(n,l,c,m,_,x,I),i.dynCall_iiiiiiiii=(n,l,c,m,_,x,I,O,N)=>(i.dynCall_iiiiiiiii=B.dynCall_iiiiiiiii)(n,l,c,m,_,x,I,O,N),i.dynCall_iiij=(n,l,c,m)=>(i.dynCall_iiij=B.dynCall_iiij)(n,l,c,m),i.dynCall_iiiiiiiiii=(n,l,c,m,_,x,I,O,N,L)=>(i.dynCall_iiiiiiiiii=B.dynCall_iiiiiiiiii)(n,l,c,m,_,x,I,O,N,L),i.dynCall_iiiiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F,ee,ue)=>(i.dynCall_iiiiiiiiiiiii=B.dynCall_iiiiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F,ee,ue),i.dynCall_iiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F)=>(i.dynCall_iiiiiiiiiii=B.dynCall_iiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F),i.dynCall_ji=(n,l)=>(i.dynCall_ji=B.dynCall_ji)(n,l),i.dynCall_iijii=(n,l,c,m,_)=>(i.dynCall_iijii=B.dynCall_iijii)(n,l,c,m,_),i.dynCall_vij=(n,l,c)=>(i.dynCall_vij=B.dynCall_vij)(n,l,c),i.dynCall_viiijii=(n,l,c,m,_,x,I)=>(i.dynCall_viiijii=B.dynCall_viiijii)(n,l,c,m,_,x,I),i.dynCall_viijiiiiiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be,at,vt)=>(i.dynCall_viijiiiiiiiiiiiiii=B.dynCall_viijiiiiiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be,at,vt),i.dynCall_viiiji=(n,l,c,m,_,x)=>(i.dynCall_viiiji=B.dynCall_viiiji)(n,l,c,m,_,x),i.dynCall_fiii=(n,l,c,m)=>(i.dynCall_fiii=B.dynCall_fiii)(n,l,c,m),i.dynCall_viijii=(n,l,c,m,_,x)=>(i.dynCall_viijii=B.dynCall_viijii)(n,l,c,m,_,x),i.dynCall_viij=(n,l,c,m)=>(i.dynCall_viij=B.dynCall_viij)(n,l,c,m),i.dynCall_jiij=(n,l,c,m)=>(i.dynCall_jiij=B.dynCall_jiij)(n,l,c,m),i.dynCall_fi=(n,l)=>(i.dynCall_fi=B.dynCall_fi)(n,l),i.dynCall_fii=(n,l,c)=>(i.dynCall_fii=B.dynCall_fii)(n,l,c),i.dynCall_jii=(n,l,c)=>(i.dynCall_jii=B.dynCall_jii)(n,l,c),i.dynCall_dii=(n,l,c)=>(i.dynCall_dii=B.dynCall_dii)(n,l,c),i.dynCall_fiiii=(n,l,c,m,_)=>(i.dynCall_fiiii=B.dynCall_fiiii)(n,l,c,m,_),i.dynCall_fif=(n,l,c)=>(i.dynCall_fif=B.dynCall_fif)(n,l,c),i.dynCall_jfi=(n,l,c)=>(i.dynCall_jfi=B.dynCall_jfi)(n,l,c),i.dynCall_viiiiiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke)=>(i.dynCall_viiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke),i.dynCall_viiiiiiiiiiiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be,at,vt,Xt,Tr,bm)=>(i.dynCall_viiiiiiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be,at,vt,Xt,Tr,bm),i.dynCall_viiiiiiiiiiiiiiii=(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be,at)=>(i.dynCall_viiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiii)(n,l,c,m,_,x,I,O,N,L,F,ee,ue,fe,ke,Be,at),i.dynCall_iif=(n,l,c)=>(i.dynCall_iif=B.dynCall_iif)(n,l,c),i.dynCall_jiiii=(n,l,c,m,_)=>(i.dynCall_jiiii=B.dynCall_jiiii)(n,l,c,m,_),i.dynCall_jiii=(n,l,c,m)=>(i.dynCall_jiii=B.dynCall_jiii)(n,l,c,m),i.dynCall_viif=(n,l,c,m)=>(i.dynCall_viif=B.dynCall_viif)(n,l,c,m),i.dynCall_viiij=(n,l,c,m,_)=>(i.dynCall_viiij=B.dynCall_viiij)(n,l,c,m,_),i.dynCall_viiiijii=(n,l,c,m,_,x,I,O)=>(i.dynCall_viiiijii=B.dynCall_viiiijii)(n,l,c,m,_,x,I,O),i.dynCall_iiiiij=(n,l,c,m,_,x)=>(i.dynCall_iiiiij=B.dynCall_iiiiij)(n,l,c,m,_,x),i.dynCall_iiiiid=(n,l,c,m,_,x)=>(i.dynCall_iiiiid=B.dynCall_iiiiid)(n,l,c,m,_,x),i.dynCall_iiiiijj=(n,l,c,m,_,x,I)=>(i.dynCall_iiiiijj=B.dynCall_iiiiijj)(n,l,c,m,_,x,I),i.dynCall_iiiiiijj=(n,l,c,m,_,x,I,O)=>(i.dynCall_iiiiiijj=B.dynCall_iiiiiijj)(n,l,c,m,_,x,I,O);var ks=n=>(ks=B.wb)(n),Ss=()=>(Ss=B.xb)(),Is=n=>(Is=B.yb)(n),Es=()=>(Es=B.zb)();return(function n(){if(0<Ht)Ft=n;else if(u)t(i),$i();else{for(;0<rr.length;)rr.shift()(i);0<Ht?Ft=n:(i.calledRun=!0,j||($i(),t(i)))}})(),i.PTR_SIZE=4,a},Bd=Ar,As=globalThis.self?.name?.startsWith("em-pthread"),As&&Ar()}),Or,ka,Os,Me,Md,Ri,Rs,Bs,Rr,Ms,Br,Dd,Mr,Nd,Fa=q(()=>{Ha(),Or=typeof location>"u"?void 0:location.origin,ka=import.meta.url>"file:"&&import.meta.url<"file;",Os=()=>{{if(ka){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Or).href}return import.meta.url}},Me=Os(),Md=()=>{if(Me&&!Me.startsWith("blob:"))return Me.substring(0,Me.lastIndexOf("/")+1)},Ri=(e,t)=>{try{let r=t??Me;return(r?new URL(e,r):new URL(e)).origin===Or}catch{return!1}},Rs=(e,t)=>{let r=t??Me;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},Bs=(e,t)=>`${t??"./"}${e}`,Rr=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Ms=async e=>(await import(e)).default,Br=(qm(),bi(Ad)).default,Dd=async()=>{if(!Me)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Ri(Me))return[void 0,Br()];let e=await Rr(Me);return[e,Br(e)]},Mr=(Lm(),bi(Rd)).default,Nd=async(e,t,r,i)=>{let a=Mr&&!(e||t);if(a)if(Me)a=Ri(Me);else if(i&&!r)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,Mr];{let s="ort-wasm-simd-threaded.jsep.mjs",o=e??Rs(s,t),u=r&&o&&!Ri(o,t),d=u?await Rr(o):o??Bs(s,t);return[u?d:void 0,await Ms(d)]}}}),Dr,Bi,Jt,Nr,Ds,Ns,Ps,Ka,ye,Dt=q(()=>{Fa(),Bi=!1,Jt=!1,Nr=!1,Ds=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Ns=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Ps=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ka=async e=>{if(Bi)return Promise.resolve();if(Jt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Nr)throw new Error("previous call to 'initializeWebAssembly()' failed.");Jt=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Ps())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Ns())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=Ds();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,s=typeof a=="string"?a:void 0,o=a?.mjs,u=o?.href??o,d=a?.wasm,p=d?.href??d,f=e.wasmBinary,[h,g]=await Nd(u,s,r>1,!!f||!!p),y=!1,b=[];if(t>0&&b.push(new Promise($=>{setTimeout(()=>{y=!0,$()},t)})),b.push(new Promise(($,T)=>{let v={numThreads:r};if(f)v.wasmBinary=f;else if(p||s)v.locateFile=w=>p??s+w;else if(u&&u.indexOf("blob:")!==0)v.locateFile=w=>new URL(w,u).href;else if(h){let w=Md();w&&(v.locateFile=k=>w+k)}g(v).then(w=>{Jt=!1,Bi=!0,Dr=w,$(),h&&URL.revokeObjectURL(h)},w=>{Jt=!1,Nr=!0,T(w)})})),await Promise.race(b),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ye=()=>{if(Bi&&Dr)return Dr;throw new Error("WebAssembly is not initialized yet.")}}),Fe,Ki,me,Za=q(()=>{Dt(),Fe=(e,t)=>{let r=ye(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},Ki=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,s])=>{let o=t?t+a:a;if(typeof s=="object")Ki(s,o+".",r,i);else if(typeof s=="string"||typeof s=="number")i(o,s.toString());else if(typeof s=="boolean")i(o,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},me=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let s=Number(t.getValue(a,i===4?"i32":"i64")),o=t.getValue(a+i,"*"),u=o?t.UTF8ToString(o):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),Pd,Wm=q(()=>{Dt(),Za(),Pd=e=>{let t=ye(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let s=0;return e?.tag!==void 0&&(s=Fe(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,s),r===0&&me("Can't create run options."),e?.extra!==void 0&&Ki(e.extra,"",new WeakSet,(o,u)=>{let d=Fe(o,i),p=Fe(u,i);t._OrtAddRunConfigEntry(r,d,p)!==0&&me(`Can't set a run config entry: ${o} - ${u}.`)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(o=>t._free(o)),s}}}),Us,qs,Ls,ei,Ws,Ud,Vm=q(()=>{Dt(),Za(),Us=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},qs=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Ls=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},ei=(e,t,r,i)=>{let a=Fe(t,i),s=Fe(r,i);ye()._OrtAddSessionConfigEntry(e,a,s)!==0&&me(`Can't set a session config entry: ${t} - ${r}.`)},Ws=async(e,t,r)=>{for(let i of t){let a=typeof i=="string"?i:i.name,s=[];switch(a){case"webnn":if(a="WEBNN",typeof i!="string"){let f=i?.deviceType;f&&ei(e,"deviceType",f,r)}break;case"webgpu":if(a="JS",typeof i!="string"){let f=i;if(f?.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);ei(e,"preferredLayout",f.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let o=Fe(a,r),u=s.length,d=0,p=0;if(u>0){d=ye()._malloc(u*ye().PTR_SIZE),r.push(d),p=ye()._malloc(u*ye().PTR_SIZE),r.push(p);for(let f=0;f<u;f++)ye().setValue(d+f*ye().PTR_SIZE,s[f][0],"*"),ye().setValue(p+f*ye().PTR_SIZE,s[f][1],"*")}await ye()._OrtAppendExecutionProvider(e,o,d,p,u)!==0&&me(`Can't append execution provider: ${a}.`)}},Ud=async e=>{let t=ye(),r=0,i=[],a=e||{};Ls(a);try{let s=Us(a.graphOptimizationLevel??"all"),o=qs(a.executionMode??"sequential"),u=typeof a.logId=="string"?Fe(a.logId,i):0,d=a.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log severity level is not valid: ${d}`);let p=a.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let f=typeof a.optimizedModelFilePath=="string"?Fe(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(s,!!a.enableCpuMemArena,!!a.enableMemPattern,o,!!a.enableProfiling,0,u,d,p,f),r===0&&me("Can't create session options."),a.executionProviders&&await Ws(r,a.executionProviders,i),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);ei(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[h,g]of Object.entries(a.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let y=Fe(h,i);t._OrtAddFreeDimensionOverride(r,y,g)!==0&&me(`Can't set a free dimension override: ${h} - ${g}.`)}return a.extra!==void 0&&Ki(a.extra,"",new WeakSet,(h,g)=>{ei(r,h,g,i)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&me("Can't release session options."),i.forEach(o=>t._free(o)),s}}}),It,ut,Et,tr,Zi,Ya,Xa,Sa,te=q(()=>{It=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ut=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Et=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,s)=>a*s,1);return r>0?Math.ceil(i*r):void 0},tr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Zi=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ya=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Xa=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Sa=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Qa,qd=q(()=>{Ha(),Qa=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),s;try{s=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let d=Math.ceil(i/65536);s=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw u}let o=0;for(;;){let{done:u,value:d}=await a.read();if(u)break;let p=d.byteLength;new Uint8Array(s,o,p).set(d),o+=p}return new Uint8Array(s,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Vs,Gs,js,Hs,Ja,Fs,de,lt=q(()=>{te(),Vs=["V","I","W","E","F"],Gs=(e,t)=>{console.log(`[${Vs[e]},${new Date().toISOString()}]${t}`)},Ja=(e,t)=>{js=e,Hs=t},Fs=(e,t)=>{let r=Zi(e),i=Zi(js);r>=i&&Gs(r,typeof t=="function"?t():t)},de=(...e)=>{Hs&&Fs(...e)}}),Ks,Wt,A,Yi,Ld,Wd,Vd,ne=q(()=>{Ks=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Wt=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(i===0)return t;if(a===0)return e;let s=Math.max(e.length,t.length),o=new Array(s);if(r){if(i<2||a<2)return;let u=Ks.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(u===void 0)return;[o[s-2],o[s-1]]=u}for(let u=r?3:1;u<=s;u++){let d=i-u<0?1:e[i-u],p=a-u<0?1:t[a-u];if(d!==p&&d>1&&p>1)return;let f=Math.max(d,p);if(d&&p)o[s-u]=Math.max(d,p);else{if(f>1)return;o[s-u]=0}}return o}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[i-a])return!1;return!0}},A=class ji{static size(t){return ji.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let a=new Array(i),s=i-1;for(;s>=0;){if(t[s]%r===0){a[s]=t[s]/r;break}if(r%t[s]!==0)throw new Error("cannot convert shape");a[s]=1,r/=t[s],s--}for(s--;s>=0;s--)a[s]=t[s];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return ji.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return ji.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let s=r;s<i;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[s])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((a,s)=>a+r[s]+r[s+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,a)=>i===r[a])}},Yi=class di{static adjustPoolAttributes(t,r,i,a,s,o){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length;u++)if(u<s.length){if(s[u]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let u=0;u<i.length*2;u++)if(u<o.length){if(o[u]<0)throw new Error("pad should be greater than or equal to 1")}else o.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(o[u]>=i[u]||o[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,s,o,u){if(u){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)di.adjustPadAndReturnShape(t[d+(o?1:2)],r[d],i[d],a[d],s,d,d+t.length-2,u)}}static computePoolOutputShape(t,r,i,a,s,o,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return di.computeShapeHelper(t,r,d,i,a,s,o,u),d}static computeConvOutputShape(t,r,i,a,s,o,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return di.computeShapeHelper(!1,t,d,i,a,s,o,u),d}static computeShapeHelper(t,r,i,a,s,o,u,d){if(t)for(let p=0;p<r.length-2;p++)i.push(1);else for(let p=0;p<r.length-2;p++)i.push(di.adjustPadAndReturnShape(r[p+2],a[p],s[p],o[p],u,p,p+r.length-2,d))}static adjustPadAndReturnShape(t,r,i,a,s,o,u,d){let p=i*(a-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return s[o]=0,s[u]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=((t+r-1)/r-1)*r+a-t;return s[o]=Math.floor(d==="SAME_LOWER"?(f+1)/2:f/2),s[u]=f-s[o],Math.floor((t+f-a)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+s[o]+s[u]-p)/r+1)}},Ld=class{static getShapeOfGemmResult(e,t,r,i,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,o,u;t?(s=e[1],o=e[0]):(s=e[0],o=e[1]);let d=-1;if(i?(u=r[0],d=1):(u=r[1],d=0),r[d]!==o)throw new Error("dimension mismatch");if(s<=0||u<=0||o<=0)throw new Error("invalid shape specified");if(a&&!Wt.isValidBroadcast(a,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,o]}},Wd=-34028234663852886e22,Vd=34028234663852886e22}),en,Gd=q(()=>{te(),en=(e,t)=>new(tr(t))(e)}),Pr,Ia,Ur,Zs,qr,Ys,Lr,Wr,Vr,Xs,jd,Gm=q(()=>{te(),lt(),Pr=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Ia=(e,t)=>{if(t==="int32")return e;let r=Pr.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let a=e.byteLength/i,s=new(tr(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let o=new Int32Array(a);for(let u=0;u<a;u++){let d=s[u];if(d>2147483647n||d<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");o[u]=Number(d)}return new Uint8Array(o.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&s.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let o=Int32Array.from(s,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Ur=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let a=BigInt64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(i,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(i.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(i,Number);return new Uint8Array(a.buffer)}case"uint8":{if(i.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(i,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Zs=1,qr=()=>Zs++,Ys=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Lr=(e,t)=>{let r=Pr.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,a)=>i*a)*r/8):0},Wr=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:a,shape:s,fallbackDataType:o}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=a,this.tensorShape=s,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Lr(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Ur(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,a)=>i===r[a])}setIsDataConverted(e){this.isDataConverted=e}},Vr=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let a=this.tensorManager.getMLContext(e),s;if(!a.opSupportLimits().input.dataTypes.includes(t)){if(s=Ys.get(t),!s||!a.opSupportLimits().input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Lr(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,o,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Ia(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Ur(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Xs=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=qr();return this.tensorTrackersById.set(e,new Vr(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,a){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,r,i,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),s=qr(),o=new Wr({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(s,new Vr(this,o)),this.externalTensors.add(o),s}async getCachedTensor(e,t,r,i,a,s,o){let u=this.getMLContext(e);for(let[p,f]of this.freeTensors.entries())if(f.canReuseTensor(u,t,r)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${r}`);let h=this.freeTensors.splice(p,1)[0];return h.sessionId=e,h}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${r}}`);let d=await u.createTensor({dataType:o??t,shape:r,dimensions:r,usage:i,writable:a,readable:s});return new Wr({sessionId:e,context:u,tensor:d,dataType:t,shape:r,fallbackDataType:o})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},jd=(...e)=>new Xs(...e)}),ti,Qs,Hd,jm=q(()=>{te(),Dt(),Gd(),Gm(),lt(),ti=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Qs=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((a,s)=>a===i[s]&&e[a]===t[a])},Hd=class{constructor(e){this.tensorManager=jd(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,Ja(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Qs(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(a=>a.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,a){let s=ti.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,i,a)}async createTemporaryTensor(e,t,r){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=ti.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,i,r,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!ye().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return en(r,t)}}registerMLTensor(e,t,r,i){let a=ti.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(e,t,a,i);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${s}}`),s}registerMLConstant(e,t,r,i,a,s,o=!1){if(!s)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let d=s.get(u);if(!d)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+r>d.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=d.slice(t,t+r).buffer,f;switch(a.dataType){case"float32":f=new Float32Array(p);break;case"float16":f=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(p):new Uint16Array(p);break;case"int32":f=new Int32Array(p);break;case"uint32":f=new Uint32Array(p);break;case"int64":if(o){let h=Ia(new Uint8Array(p),"int64");f=new Int32Array(h.buffer),a.dataType="int32"}else f=new BigInt64Array(p);break;case"uint64":f=new BigUint64Array(p);break;case"int8":f=new Int8Array(p);break;case"int4":case"uint4":case"uint8":f=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return de("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${o?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(a,f)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=this.mlContextBySessionId.get(e),a=ti.get(It(t));return typeof a>"u"?!1:r?!!i?.opSupportLimits().input.dataTypes.includes(a):!!i?.opSupportLimits().output.dataTypes.includes(a)}flush(){}}}),tn=q(()=>{}),Gr,Mi,Di,Js,eo,jr,Ea,to,Fd,Hm=q(()=>{lt(),tn(),Gr=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Mi=[],Di=e=>Math.ceil(Number(e)/16)*16,Js=e=>{for(let t=0;t<Mi.length;t++){let r=Mi[t];if(e<=r)return r}return Math.ceil(e/16)*16},eo=1,jr=()=>eo++,Ea=async(e,t,r,i)=>{let a=Di(r),s=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,s,0,a),e.flush(),await s.mapAsync(GPUMapMode.READ);let u=s.getMappedRange();if(i){let d=i();return d.set(new Uint8Array(u,0,r)),d}else return new Uint8Array(u.slice(0,r))}finally{s.destroy()}},to=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Gr)Mi.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,s=Di(a),o=this.storageCache.get(e);if(!o)throw new Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${a}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),d=u.getMappedRange();new Uint8Array(d).set(new Uint8Array(r,i,a)),u.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(u,0,o.gpuData.buffer,0,s),this.backend.device.queue.submit([p.finish()]),u.destroy(),de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=Di(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=jr();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Js(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||s){let u=(a?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let o={id:jr(),type:0,buffer:i};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Ea(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Gr.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Fd=(...e)=>new to(...e)}),io,he,xe=q(()=>{io=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},he=e=>new io(e)}),Vt,Ni,Se,Ae,Q,ve,za,Lt,_t,Y,ii,M,K,Kd,rn,ro,Zd,oe=q(()=>{te(),ne(),Vt=64,Ni=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Se=(e,t=1)=>{let r=Ni(e,t);return typeof r=="string"?r:r[0]},Ae=(e,t=1)=>{let r=Ni(e,t);return typeof r=="string"?r:r[1]},Q=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:A.computeStrides(r)})}),t},ve=e=>e%4===0?4:e%2===0?2:1,za=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Lt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,_t=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,Y=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,ii=(e,t,r,i,a)=>{let s=typeof r=="number",o=s?r:r.length,u=[...new Array(o).keys()],d=o<2?"u32":o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,p=Ni(t,a),f=typeof p=="string"?p:p[1],h=typeof p=="string"?p:p[0],g={indices:d,value:f,storage:h,tensor:t},y=P=>typeof P=="string"?P:`${P}u`,b={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},$=s?"uniforms.":"",T=`${$}${e}_shape`,v=`${$}${e}_strides`,w="";for(let P=0;P<o-1;P++)w+=`
    let dim${P} = current / ${Y(v,P,o)};
    let rest${P} = current % ${Y(v,P,o)};
    indices[${P}] = dim${P};
    current = rest${P};
    `;w+=`indices[${o-1}] = current;`;let k=o<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${w}
    return indices;
  }`,C=P=>(b.offsetToIndices=!0,o<2?P:`o2i_${e}(${P})`),S=[];if(o>=2)for(let P=o-1;P>=0;P--)S.push(`${Y(v,P,o)} * (indices[${P}])`);let z=o<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${S.join("+")};
  }`,E=P=>(b.indicesToOffset=!0,o<2?P:`i2o_${e}(${P})`),R=(...P)=>o===0?"0u":`${g.indices}(${P.map(y).join(",")})`,U=(P,W)=>o<2?`${P}`:`${Y(P,W,o)}`,V=(P,W,ie)=>o<2?`${P}=${ie};`:`${Y(P,W,o)}=${ie};`,Z={},X=(P,W)=>{b.broadcastedIndicesToOffset=!0;let ie=`${W.name}broadcastedIndicesTo${e}Offset`;if(ie in Z)return`${ie}(${P})`;let pe=[];for(let D=o-1;D>=0;D--){let le=W.indicesGet("outputIndices",D+W.rank-o);pe.push(`${U(v,D)} * (${le} % ${U(T,D)})`)}return Z[ie]=`fn ${ie}(outputIndices: ${W.type.indices}) -> u32 {
             return ${pe.length>0?pe.join("+"):"0u"};
           }`,`${ie}(${P})`},re=(P,W)=>(()=>{if(g.storage===g.value)return`${e}[${P}]=${W};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${P}]=vec2<u32>(u32(${W}), select(0u, 0xFFFFFFFFu, ${W} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${P}]=vec2<u32>(u32(${W}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${P}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${W}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),G=P=>(()=>{if(g.storage===g.value)return`${e}[${P}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${P}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${P}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${P}] & 0xFFu), bool(${e}[${P}] & 0xFF00u), bool(${e}[${P}] & 0xFF0000u), bool(${e}[${P}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),se=o<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${f} {
    return ${G(`i2o_${e}(indices)`)};
  }`,J=o<2?"":(()=>{let P=u.map(ie=>`d${ie}: u32`).join(", "),W=u.map(ie=>`d${ie}`).join(", ");return`
  fn get_${e}(${P}) -> ${f} {
    return get_${e}ByIndices(${R(W)});
  }`})(),H=(...P)=>{if(P.length!==o)throw new Error(`indices length must be ${o}`);let W=P.map(y).join(",");return o===0?G("0u"):o===1?G(W[0]):(b.get=!0,b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}(${W})`)},ae=P=>o<2?G(P):(b.getByIndices=!0,b.indicesToOffset=!0,`get_${e}ByIndices(${P})`),j=o<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${f}) {
    ${re(`i2o_${e}(indices)`,"value")}
  }`,ge=o<2?"":(()=>{let P=u.map(ie=>`d${ie}: u32`).join(", "),W=u.map(ie=>`d${ie}`).join(", ");return`
  fn set_${e}(${P}, value: ${f}) {
    set_${e}ByIndices(${R(W)}, value);
  }`})();return{impl:()=>{let P=[],W=!1;return b.offsetToIndices&&(P.push(k),W=!0),b.indicesToOffset&&(P.push(z),W=!0),b.broadcastedIndicesToOffset&&(Object.values(Z).forEach(ie=>P.push(ie)),W=!0),b.set&&(P.push(ge),W=!0),b.setByIndices&&(P.push(j),W=!0),b.get&&(P.push(J),W=!0),b.getByIndices&&(P.push(se),W=!0),!s&&W&&P.unshift(`const ${T} = ${g.indices}(${r.join(",")});`,`const ${v} = ${g.indices}(${A.computeStrides(r).join(",")});`),P.join(`
`)},type:g,offsetToIndices:C,indicesToOffset:E,broadcastedIndicesToOffset:X,indices:R,indicesGet:U,indicesSet:V,set:(...P)=>{if(P.length!==o+1)throw new Error(`indices length must be ${o}`);let W=P[o];if(typeof W!="string")throw new Error("value must be string");let ie=P.slice(0,o).map(y).join(",");return o===0?re("0u",W):o===1?re(ie[0],W):(b.set=!0,b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}(${ie}, ${W})`)},setByOffset:re,setByIndices:(P,W)=>o<2?re(P,W):(b.setByIndices=!0,b.indicesToOffset=!0,`set_${e}ByIndices(${P}, ${W});`),get:H,getByOffset:G,getByIndices:ae,usage:i,name:e,strides:v,shape:T,rank:o}},M=(e,t,r,i=1)=>ii(e,t,r,"input",i),K=(e,t,r,i=1)=>ii(e,t,r,"output",i),Kd=(e,t,r)=>ii(e,t,r,"atomicOutput",1),rn=(e,t,r,i=1)=>ii(e,t,r,"internal",i),ro=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Vt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${s}) {
    ${o}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Zd=(e,t)=>new ro(e,t)}),ao,Hr,no,so,oo,uo,Pe,Yd,Xd,bt=q(()=>{te(),ne(),xe(),oe(),ao=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Hr=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),no=(e,t)=>A.sortBasedOnPerm(e,Hr(e.length,t)),so=(e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let s=0;s<t;++s)a+=`a[${e[s]}]=i[${s}];`;return a+="return a;}"},oo=(e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&i.push(t[a]);return{newShape:r,newPerm:i}},uo=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Pe=(e,t)=>{let r=e.dataType,i=e.dims.length,a=Hr(i,t),s=no(e.dims,a),o=e.dims,u=s,d=i<2||uo(a,e.dims),p;if(d)return p=b=>{let $=M("input",r,o,4),T=K("output",r,u,4);return`
  ${b.registerUniform("output_size","u32").declareVariables($,T)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(b/64/4)},programUniforms:[{type:12,data:Math.ceil(b/4)}]}},getShaderSource:p};let{newShape:f,newPerm:h}=oo(e.dims,a),g=A.areEqual(h,[2,3,1]),y=A.areEqual(h,[3,1,2]);if(f.length===2||g||y){o=g?[f[0],f[1]*f[2]]:y?[f[0]*f[1],f[2]]:f,u=[o[1],o[0]];let b=16;return p=$=>{let T=M("a",r,o.length),v=K("output",r,u.length);return`
  ${$.registerUniform("output_size","u32").declareVariables(T,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${b+1}>, ${b}>;
  ${$.mainStart([b,b,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${b} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${b}u + local_id.x;
    let input_row = workgroup_id_x * ${b}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${T.getByIndices(`${T.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${b}u + local_id.x;
    let output_row = workgroup_id_y * ${b}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let $=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/b),y:Math.ceil(u[0]/b)},programUniforms:[{type:12,data:$},...Q(o,u)]}},getShaderSource:p}}return p=b=>{let $=M("a",r,o.length),T=K("output",r,u.length);return`
  ${b.registerUniform("output_size","u32").declareVariables($,T)}

  ${so(a,i,$,T)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",$.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let b=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...Q(o,u)]}},getShaderSource:p}},Yd=(e,t)=>{ao(e.inputs,t.perm),e.compute(Pe(e.inputs[0],t.perm))},Xd=e=>he({perm:e.perm})}),lo,po,co,fo,ho,mo,go,yo,_o,bo,We,Qd,Jd,ep,tp,ip,rp,ap,np,sp,op,Fm=q(()=>{te(),ne(),oe(),an(),bt(),lo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},po={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},co={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},fo={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},ho=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},mo=(e,t)=>{let r=[],i=e.length;for(let s=0;s<i;s++)t.indexOf(s)===-1&&r.push(e[s]);let a=t.map(s=>e[s]);return[r,a]},go=(e,t)=>{let r=e.length+t.length,i=[],a=0;for(let s=0;s<r;s++)t.indexOf(s)===-1?i.push(e[a++]):i.push(1);return i},yo=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},_o=(e,t)=>{let r=[];if(!yo(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},bo=(e,t,r,i,a,s,o)=>{let u=r[0].dims,d=A.size(s),p=A.size(o),f=M("_A",r[0].dataType,u),h=K("output",a,s),g=64;d===1&&(g=256);let y=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,b=$=>`
        ${$.registerUniform("reduceSize","u32").declareVariables(f,h)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${$.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${co[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${f.getByOffset("offset + k")});
           bestValue = ${lo[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${po[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${i==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${fo[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:d},programUniforms:[{type:12,data:p}]})}},We=(e,t,r,i)=>{let a=e.inputs.length===1?r:Aa(e.inputs,r),s=a.axes;s.length===0&&!a.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((y,b)=>b));let o=A.normalizeAxes(s,e.inputs[0].dims.length),u=o,d=e.inputs[0],p=_o(u,e.inputs[0].dims.length);p.length>0&&(d=e.compute(Pe(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],u=ho(u.length,d.dims.length));let[f,h]=mo(d.dims,u),g=f;a.keepDims&&(g=go(f,o)),e.compute(bo(t,a.cacheKey,[d],i,e.inputs[0].dataType,g,h),{inputs:[d]})},Qd=(e,t)=>{We(e,"ReduceMeanShared",t,"mean")},Jd=(e,t)=>{We(e,"ReduceL1Shared",t,"l1")},ep=(e,t)=>{We(e,"ReduceL2Shared",t,"l2")},tp=(e,t)=>{We(e,"ReduceLogSumExpShared",t,"logSumExp")},ip=(e,t)=>{We(e,"ReduceMaxShared",t,"max")},rp=(e,t)=>{We(e,"ReduceMinShared",t,"min")},ap=(e,t)=>{We(e,"ReduceProdShared",t,"prod")},np=(e,t)=>{We(e,"ReduceSumShared",t,"sum")},sp=(e,t)=>{We(e,"ReduceSumSquareShared",t,"sumSquare")},op=(e,t)=>{We(e,"ReduceLogSumShared",t,"logSum")}}),Ve,wo,Xi,Aa,Ge,$o,vo,xo,Co,To,ko,So,Io,Eo,zo,je,up,lp,dp,pp,cp,fp,hp,mp,gp,yp,an=q(()=>{te(),ne(),xe(),oe(),Fm(),Ve=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},wo=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Xi=(e,t,r,i,a,s,o=!1,u=!1)=>{let d=[],p=r[0].dims,f=p.length,h=A.normalizeAxes(a,f),g=!u&&h.length===0;p.forEach(($,T)=>{g||h.indexOf(T)>=0?o&&d.push(1):d.push($)});let y=d.length,b=A.size(d);return{name:e,shaderCache:t,getShaderSource:$=>{let T=[],v=M("_A",r[0].dataType,f),w=K("output",s,y),k=i(v,w,h),C=k[2];for(let S=0,z=0;S<f;S++)g||h.indexOf(S)>=0?(o&&z++,C=`for(var j${S}: u32 = 0; j${S} < ${p[S]}; j${S}++) {
                  ${k[2].includes("last_index")?`let last_index = j${S};`:""}
                  ${v.indicesSet("input_indices",S,`j${S}`)}
                  ${C}
                }`):(T.push(`${v.indicesSet("input_indices",S,w.indicesGet("output_indices",z))};`),z++);return`

        ${$.registerUniform("output_size","u32").declareVariables(v,w)}

        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${w.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${k[0]}       // init ops for reduce max/min
          ${k[1]}
          ${C}
          ${k[3]}
          ${k.length===4?w.setByOffset("global_idx","value"):k.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:s}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...Q(p,d)]})}},Aa=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),he({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ge=(e,t,r,i)=>{let a=e.inputs,s=a.length===1?r:Aa(a,r);e.compute(Xi(t,{hint:s.cacheKey,inputDependencies:["rank"]},[a[0]],s.noopWithEmptyAxes&&s.axes.length===0?wo:i,s.axes,a[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},$o=(e,t)=>{Ve(e.inputs),Ge(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},vo=(e,t)=>{Ve(e.inputs),Ge(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},xo=(e,t)=>{Ve(e.inputs),Ge(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Co=(e,t)=>{Ve(e.inputs),Ge(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},To=(e,t)=>{Ve(e.inputs),Ge(e,"ReduceMax",t,(r,i,a)=>{let s=[];for(let o=0;o<r.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(r.indicesSet("input_indices",o,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},ko=(e,t)=>{Ve(e.inputs),Ge(e,"ReduceMean",t,(r,i,a)=>{let s=1;for(let o=0;o<r.rank;o++)(a.indexOf(o)>=0||a.length===0)&&(s*=e.inputs[0].dims[o]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${s});`]})},So=(e,t)=>{Ve(e.inputs),Ge(e,"ReduceMin",t,(r,i,a)=>{let s=[];for(let o=0;o<r.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Io=(e,t)=>{Ve(e.inputs),Ge(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Eo=(e,t)=>{Ve(e.inputs),Ge(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},zo=(e,t)=>{Ve(e.inputs),Ge(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},je=(e,t,r)=>{if(t.length===0)return r;let i=1,a=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?i*=e[s]:a*=e[s];return a<32&&i>1024},up=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ko(e,t):Qd(e,t)},lp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vo(e,t):Jd(e,t)},dp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xo(e,t):ep(e,t)},pp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Co(e,t):tp(e,t)},cp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?To(e,t):ip(e,t)},fp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?So(e,t):rp(e,t)},hp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Io(e,t):ap(e,t)},mp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Eo(e,t):np(e,t)},gp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?zo(e,t):sp(e,t)},yp=(e,t)=>{je(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$o(e,t):op(e,t)}}),Fr,_p,bp,Oa,Km=q(()=>{te(),xe(),an(),Fr=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},_p=(e,t)=>{Fr(e.inputs);let r=(i,a,s)=>{let o=[];for(let u=0;u<i.rank;u++)(s.indexOf(u)>=0||s.length===0)&&o.push(`input_indices[${u}] = 0;`);return[`${o.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Xi("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},bp=(e,t)=>{Fr(e.inputs);let r=(i,a,s)=>{let o=[];for(let u=0;u<i.rank;u++)(s.indexOf(u)>=0||s.length===0)&&o.push(`input_indices[${u}] = 0;`);return[`${o.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Xi("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Oa=e=>he(e)}),Ao,Pi,Oo,Ro,Bo,wi,Mo,wp,nn=q(()=>{te(),ne(),tn(),oe(),Ao=(e,t)=>{let r=e[0],i=e[1],a=e[2],s=e[3],o=e[4],u=e[5];if(o&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],p=r.dims[1],f=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==f)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=a.dims[0]/3,g=h,y=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let k of t.qkvHiddenSizes)if(k%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let b=p;if(h!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==h+g+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let $=0;if(o){if(g!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(o.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(o.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(o.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||($=o.dims[3])}let T=b+$,v=-1,w=0;if(s)throw new Error("Mask not supported");if(o)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:p,pastSequenceLength:$,kvSequenceLength:b,totalSequenceLength:T,maxSequenceLength:v,inputHiddenSize:f,hiddenSize:h,vHiddenSize:y,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Pi=(e,t,r)=>t&&e?`
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
    `,Oo=(e,t,r,i,a,s,o,u)=>{let d=ve(o?1:s),p=64,f=s/d;f<p&&(p=32);let h=Math.ceil(s/d/p),g=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:f},{type:12,data:h}],y=Se(e.dataType,d),b=Ae(1,d),$=["type"];o&&$.push("type"),u&&$.push("type");let T=v=>{let w=K("x",e.dataType,e.dims,d),k=[w],C=o?M("seq_lens",o.dataType,o.dims):void 0;C&&k.push(C);let S=u?M("total_sequence_length_input",u.dataType,u.dims):void 0;S&&k.push(S);let z=Ae(e.dataType),E=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${v.registerUniforms(E).declareVariables(...k)}
  ${v.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Pi(C,S,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${b}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${b}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${b}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${b}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${w.type.value}(${z}(1.0) / ${z}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${b}(x[offset + i]);
        x[offset + i] = ${w.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${o?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${w.type.value}(${z}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${y};${d}`,inputDependencies:$},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:g})}},Ro=(e,t,r,i,a,s,o,u,d)=>{let p=o+s.kvSequenceLength,f=[s.batchSize,s.numHeads,s.sequenceLength,p],h=e>1&&i,g=s.kvNumHeads?s.kvNumHeads:s.numHeads,y=h?[s.batchSize,g,p,s.headSize]:void 0,b=s.nReps?s.nReps:1,$=s.scale===0?1/Math.sqrt(s.headSize):s.scale,T=ve(s.headSize),v=s.headSize/T,w=12,k={x:Math.ceil(p/w),y:Math.ceil(s.sequenceLength/w),z:s.batchSize*s.numHeads},C=[{type:12,data:s.sequenceLength},{type:12,data:v},{type:12,data:p},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:$},{type:12,data:o},{type:12,data:s.kvSequenceLength},{type:12,data:b}],S=h&&i&&A.size(i.dims)>0,z=["type","type"];S&&z.push("type"),a&&z.push("type"),u&&z.push("type"),d&&z.push("type");let E=[{dims:f,dataType:t.dataType,gpuDataType:0}];h&&E.push({dims:y,dataType:t.dataType,gpuDataType:0});let R=U=>{let V=M("q",t.dataType,t.dims,T),Z=M("key",r.dataType,r.dims,T),X=[V,Z];if(S){let j=M("past_key",i.dataType,i.dims,T);X.push(j)}a&&X.push(M("attention_bias",a.dataType,a.dims));let re=u?M("seq_lens",u.dataType,u.dims):void 0;re&&X.push(re);let G=d?M("total_sequence_length_input",d.dataType,d.dims):void 0;G&&X.push(G);let se=K("output",t.dataType,f),J=[se];h&&J.push(K("present_key",t.dataType,y,T));let H=Ae(1,T),ae=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;

  var<workgroup> tileQ: array<${V.type.storage}, ${w*w}>;
  var<workgroup> tileK: array<${V.type.storage}, ${w*w}>;
  ${U.registerUniforms(ae).declareVariables(...X,...J)}
  ${U.mainStart([w,w,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${b===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${b===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Pi(re,G,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${S&&h?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${H}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${S&&h?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${H}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${se.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${a!==void 0};${i!==void 0};${e}`,inputDependencies:z},getRunData:()=>({outputs:E,dispatchGroup:k,programUniforms:C}),getShaderSource:R}},Bo=(e,t,r,i,a,s,o=void 0,u=void 0)=>{let d=s+a.kvSequenceLength,p=a.nReps?a.nReps:1,f=a.vHiddenSize*p,h=e>1&&i,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,y=h?[a.batchSize,g,d,a.headSize]:void 0,b=[a.batchSize,a.sequenceLength,f],$=12,T={x:Math.ceil(a.vHeadSize/$),y:Math.ceil(a.sequenceLength/$),z:a.batchSize*a.numHeads},v=[{type:12,data:a.sequenceLength},{type:12,data:d},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:f},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:p}],w=h&&i&&A.size(i.dims)>0,k=["type","type"];w&&k.push("type"),o&&k.push("type"),u&&k.push("type");let C=[{dims:b,dataType:t.dataType,gpuDataType:0}];h&&C.push({dims:y,dataType:t.dataType,gpuDataType:0});let S=z=>{let E=M("probs",t.dataType,t.dims),R=M("v",r.dataType,r.dims),U=[E,R];w&&U.push(M("past_value",i.dataType,i.dims));let V=o?M("seq_lens",o.dataType,o.dims):void 0;o&&U.push(V);let Z=u?M("total_sequence_length_input",u.dataType,u.dims):void 0;u&&U.push(Z);let X=[K("output",t.dataType,b)];h&&X.push(K("present_value",t.dataType,y));let re=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;
  var<workgroup> tileQ: array<${E.type.value}, ${$*$}>;
  var<workgroup> tileV: array<${E.type.value}, ${$*$}>;
  ${z.registerUniforms(re).declareVariables(...U,...X)}
  ${z.mainStart([$,$,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Pi(V,Z,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${w&&h?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${E.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${w&&h?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:k},getRunData:()=>({outputs:C,dispatchGroup:T,programUniforms:v}),getShaderSource:S}},wi=(e,t,r,i,a,s,o,u,d,p,f=void 0,h=void 0)=>{let g=Math.min(e.outputCount,1+(o?1:0)+(u?1:0)),y=g>1?p.pastSequenceLength:0,b=y+p.kvSequenceLength,$=d&&A.size(d.dims)>0?d:void 0,T=[t,r];g>1&&o&&A.size(o.dims)>0&&T.push(o),$&&T.push($),f&&T.push(f),h&&T.push(h);let v=e.compute(Ro(g,t,r,o,$,p,y,f,h),{inputs:T,outputs:g>1?[-1,1]:[-1]})[0];e.compute(Oo(v,p.batchSize,p.numHeads,y,p.sequenceLength,b,f,h),{inputs:f&&h?[v,f,h]:[v],outputs:[]});let w=[v,i];g>1&&u&&A.size(u.dims)>0&&w.push(u),f&&w.push(f),h&&w.push(h),e.compute(Bo(g,v,i,u,p,y,f,h),{inputs:w,outputs:g>1?[0,2]:[0]})},Mo=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,a=t.inputHiddenSize,s=t.headSize,o=12,u={x:Math.ceil(t.headSize/o),y:Math.ceil(t.sequenceLength/o),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:i},{type:12,data:a},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],f=h=>{let g=K("output_q",d[0].dataType,r),y=K("output_k",d[0].dataType,r),b=K("output_v",d[0].dataType,r),$=M("input",d[0].dataType,d[0].dims),T=M("weight",d[1].dataType,d[1].dims),v=M("bias",d[2].dataType,d[2].dims),w=$.type.storage,k=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${o}u;
  var<workgroup> tileInput: array<${w}, ${o*o}>;
  var<workgroup> tileWeightQ: array<${w}, ${o*o}>;
  var<workgroup> tileWeightK: array<${w}, ${o*o}>;
  var<workgroup> tileWeightV: array<${w}, ${o*o}>;
  ${h.registerUniforms(k).declareVariables($,T,v,g,y,b)}
  ${h.mainStart([o,o,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${w}(0);
    var valueK = ${w}(0);
    var valueV = ${w}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:p}),getShaderSource:f},{inputs:d,outputs:[-1,-1,-1]})},wp=(e,t)=>{let r=Ao(e.inputs,t),[i,a,s]=Mo(e,r);return wi(e,i,a,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Do,No,Po,$p,Zm=q(()=>{Le(),te(),ne(),xe(),oe(),Do=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,a,s)=>{let o=a.length;if(o!==i.length)throw new Error(`${s}: num dimensions != ${o}`);a.forEach((u,d)=>{if(u!==i[d])throw new Error(`${s}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},No=(e,t)=>{let{epsilon:r,spatial:i,format:a}=t,s=e[0].dims,o=i?ve(s[s.length-1]):1,u=a==="NHWC"&&s.length>1?o:1,d=A.size(s)/o,p=i,f=p?s.length:s,h=M("x",e[0].dataType,e[0].dims,o),g=M("scale",e[1].dataType,e[1].dims,u),y=M("bias",e[2].dataType,e[2].dims,u),b=M("inputMean",e[3].dataType,e[3].dims,u),$=M("inputVar",e[4].dataType,e[4].dims,u),T=K("y",e[0].dataType,f,o),v=()=>{let k="";if(i)k=`let cOffset = ${s.length===1?"0u":a==="NHWC"?`outputIndices[${s.length-1}] / ${o}`:"outputIndices[1]"};`;else if(a==="NCHW")k=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{k=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let C=1;C<g.rank;C++)k+=`cIndices[${C}] = outputIndices[${C}];`;k+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return k},w=k=>`
  const epsilon = ${r};
  ${k.registerUniform("outputSize","u32").declareVariables(h,g,y,b,$,T)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${o}`)};
    ${v()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${b.getByOffset("cOffset")};
    let inputVar = ${$.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${o}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p?[{type:12,data:d},...Q(s)]:[{type:12,data:d}]})}},Po=e=>he(e),$p=(e,t)=>{let{inputs:r,outputCount:i}=e,a=Po({...t,outputCount:i});if(_e.webgpu.validateInputContent&&Do(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(No(r,a))}}),Uo,qo,vp,Ym=q(()=>{ne(),oe(),Uo=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},qo=e=>{let t=e[0].dims,r=e[0].dims[2],i=A.size(t)/4,a=e[0].dataType,s=M("input",a,t,4),o=M("bias",a,[r],4),u=M("residual",a,t,4),d=K("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(s,o,u,d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${s.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},vp=e=>{Uo(e.inputs),e.compute(qo(e.inputs))}}),Lo,ce,xp,Cp,Tp,kp,Sp,Ip,Ep,zp,Ap,Wo,Op,Rp,Bp,Mp,pi,Dp,Hi,Np,Pp,Up,qp,Lp,Wp,Vp,Gp,jp,Hp,Fp,Kp,Zp,Yp,Xp,Qp,Kr,Jp,Ra,Ba,ec,tc,ic,Vo,Go,rc,sn=q(()=>{te(),ne(),xe(),oe(),Lo=(e,t,r,i,a,s,o)=>{let u=Math.ceil(t/4),d="";typeof a=="string"?d=`${a}(a)`:d=a("a");let p=M("inputData",r,[u],4),f=K("outputData",i,[u],4),h=[{name:"vec_size",type:"u32"}];return o&&h.push(...o),`
      ${e.registerUniforms(h).declareVariables(p,f)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${f.setByOffset("global_idx",d)}
  }`},ce=(e,t,r,i,a,s=e.dataType,o,u)=>{let d=[{type:12,data:Math.ceil(A.size(e.dims)/4)}];return o&&d.push(...o),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:p=>Lo(p,A.size(e.dims),e.dataType,s,r,i,u),getRunData:p=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(A.size(p[0].dims)/64/4)},programUniforms:d})}},xp=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},Cp=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},Tp=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},kp=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},Sp=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},Ip=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},Ep=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},zp=e=>he(e),Ap=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Wo=e=>{let t,r,i=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return he({min:t,max:r})},Op=(e,t)=>{let r=t||Wo(e.inputs),i=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},Rp=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},Bp=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},Mp=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},pi=e=>he(e),Dp=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Hi=(e="f32")=>`
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
}`,Np=e=>{let t=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Hi(t)))},Pp=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},Up=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},qp=e=>{let t=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Hi(t)))},Lp=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Wp=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},Vp=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},Gp=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},jp=e=>{let t=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Hp=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Fp=e=>he(e),Kp=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Zp=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},Yp=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},Xp=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},Qp=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},Kr=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Jp=e=>{e.compute(ce(e.inputs[0],"Tanh",Kr))},Ra=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Kr("v")};
}
`,Ba=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,ec=e=>{let t=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",Ba,Ra(t),void 0,e.inputs[0].dataType))},tc=(e,t)=>{let r=Ae(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},ic=e=>{e.compute(ce(e.inputs[0],"Log","log"))},Vo=(e,t)=>`
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
`,Go=e=>`quick_gelu_impl(${e})`,rc=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",Go,Vo(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),jo,Ho,ac,Xm=q(()=>{ne(),oe(),sn(),jo=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Ho=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=M("input",e[0].dataType,e[0].dims,4),i=M("bias",e[0].dataType,[e[0].dims[2]],4),a=K("output",e[0].dataType,t,4),s=A.size(t)/4,o=Se(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,a)}

  ${Hi(o)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},ac=e=>{jo(e.inputs),e.compute(Ho(e.inputs))}}),Fo,Ko,He,nc,sc,oc,uc,lc,dc,pc,cc,fc,hc,Qm=q(()=>{te(),ne(),oe(),Fo=(e,t,r,i,a,s,o,u,d,p,f,h)=>{let g,y;typeof u=="string"?g=y=(w,k)=>`${u}((${w}),(${k}))`:typeof u=="function"?g=y=u:(g=u.scalar,y=u.vector);let b=K("outputData",f,i.length,4),$=M("aData",d,t.length,4),T=M("bData",p,r.length,4),v;if(a)if(s){let w=A.size(t)===1,k=A.size(r)===1,C=t.length>0&&t[t.length-1]%4===0,S=r.length>0&&r[r.length-1]%4===0;w||k?v=b.setByOffset("global_idx",y(w?`${$.type.value}(${$.getByOffset("0")}.x)`:$.getByOffset("global_idx"),k?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):v=`
            let outputIndices = ${b.offsetToIndices("global_idx * 4u")};
            let offsetA = ${$.broadcastedIndicesToOffset("outputIndices",b)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",b)};
            ${b.setByOffset("global_idx",y(o||C?$.getByOffset("offsetA / 4u"):`${$.type.value}(${$.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||S?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=b.setByOffset("global_idx",y($.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let w=(k,C,S="")=>{let z=`aData[indexA${C}][componentA${C}]`,E=`bData[indexB${C}][componentB${C}]`;return`
            let outputIndices${C} = ${b.offsetToIndices(`global_idx * 4u + ${C}u`)};
            let offsetA${C} = ${$.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let offsetB${C} = ${T.broadcastedIndicesToOffset(`outputIndices${C}`,b)};
            let indexA${C} = offsetA${C} / 4u;
            let indexB${C} = offsetB${C} / 4u;
            let componentA${C} = offsetA${C} % 4u;
            let componentB${C} = offsetB${C} % 4u;
            ${k}[${C}] = ${S}(${g(z,E)});
          `};f===9?v=`
            var data = vec4<u32>(0);
            ${w("data",0,"u32")}
            ${w("data",1,"u32")}
            ${w("data",2,"u32")}
            ${w("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${w("outputData[global_idx]",0)}
            ${w("outputData[global_idx]",1)}
            ${w("outputData[global_idx]",2)}
            ${w("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables($,T,b)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},Ko=(e,t,r,i,a,s,o=r.dataType)=>{let u=r.dims.map($=>Number($)??1),d=i.dims.map($=>Number($)??1),p=!A.areEqual(u,d),f=u,h=A.size(u),g=!1,y=!1,b=[p];if(p){let $=Wt.calcShape(u,d,!1);if(!$)throw new Error("Can't perform binary op on the given tensors");f=$.slice(),h=A.size(f);let T=A.size(u)===1,v=A.size(d)===1,w=u.length>0&&u[u.length-1]%4===0,k=d.length>0&&d[d.length-1]%4===0;b.push(T),b.push(v),b.push(w),b.push(k);let C=1;for(let S=1;S<f.length;S++){let z=u[u.length-S],E=d[d.length-S];if(z===E)C*=z;else break}C%4===0?(y=!0,g=!0):(T||v||w||k)&&(g=!0)}else g=!0;return b.push(g),{name:e,shaderCache:{hint:t+b.map($=>$.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:$=>Fo($,u,d,f,g,p,y,a,r.dataType,i.dataType,o,s),getRunData:()=>({outputs:[{dims:f,dataType:o}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(A.size(f)/4)},...Q(u,d,f)]})}},He=(e,t,r,i,a,s)=>{e.compute(Ko(t,a??"",e.inputs[0],e.inputs[1],r,i,s))},nc=e=>{He(e,"Add",(t,r)=>`${t}+${r}`)},sc=e=>{He(e,"Div",(t,r)=>`${t}/${r}`)},oc=e=>{He(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},uc=e=>{He(e,"Mul",(t,r)=>`${t}*${r}`)},lc=e=>{let t=M("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;He(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
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
      `)},dc=e=>{He(e,"Sub",(t,r)=>`${t}-${r}`)},pc=e=>{He(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},cc=e=>{He(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},fc=e=>{He(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},hc=e=>{He(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Zo,Yo,Xo,Qo,mc,gc,Jm=q(()=>{te(),ne(),xe(),oe(),Zo=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],a=i.dataType,s=i.dims.length;e.forEach((o,u)=>{if(u!==r){if(o.dataType!==a)throw new Error("input tensors should be one type");if(o.dims.length!==s)throw new Error("input tensors should have the same shape");o.dims.forEach((d,p)=>{if(p!==t&&d!==i.dims[p])throw new Error("non concat dimensions must match")})}})},Yo=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Xo=(e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let s=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?i.push(s):a===0?i.push(`if (inputIndex == ${a}u) { ${s} }`):a===r-1?i.push(`else { ${s} }`):i.push(`else if (inputIndex == ${a}) { ${s} }`)}return i.join(`
`)},Qo=(e,t,r,i)=>{let a=A.size(r),s=new Array(e.length),o=new Array(e.length),u=0,d=[],p=[],f=[{type:12,data:a}];for(let $=0;$<e.length;++$)u+=e[$].dims[t],s[$]=u,p.push(e[$].dims.length),o[$]=M(`input${$}`,i,p[$]),d.push("rank"),f.push({type:12,data:s[$]});for(let $=0;$<e.length;++$)f.push(...Q(e[$].dims));f.push(...Q(r));let h=K("output",i,r.length),g=h.indicesGet("indices",t),y=Array.from(Array(s.length).keys()).map($=>`uniforms.sizeInConcatAxis${$}`).join(","),b=$=>`

  ${(()=>{$.registerUniform("outputSize","u32");for(let T=0;T<e.length;T++)$.registerUniform(`sizeInConcatAxis${T}`,"u32");return $.declareVariables(...o,h)})()}

  ${Yo(s.length,y)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${y});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Xo(o,h)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:f}),getShaderSource:b}},mc=(e,t)=>{let r=e.inputs,i=r[0].dims,a=A.normalizeAxis(t.axis,i.length);Zo(r,a);let s=i.slice();s[a]=r.reduce((u,d)=>u+(d.dims.length>a?d.dims[a]:0),0);let o=r.filter(u=>A.size(u.dims)>0);e.compute(Qo(o,a,s,r[0].dataType),{inputs:o})},gc=e=>he({axis:e.axis})}),Rt,Bt,Mt,on,Nt=q(()=>{te(),ne(),Rt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Bt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Mt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},on=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Wd,Vd];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Ee,yc,un=q(()=>{Ee=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},yc=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),_c,eg=q(()=>{_c=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),mi,ln,dn=q(()=>{te(),ne(),oe(),Nt(),mi=(e,t,r,i,a)=>{let s=i-r;return`
      ${Array.from({length:r}).map((o,u)=>`
      if (${Y(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,Y(a,u+s,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},ln=(e,t,r,i,a=!1,s)=>{let o=e[0].dims,u=e[1].dims,d=o[o.length-2],p=u[u.length-1],f=o[o.length-1],h=ve(p),g=ve(f),y=ve(d),b=A.size(r)/h/y,$=e.length>2,T=i?i.slice(0,-2):r.slice(0,-2),v=[A.size(T),d,p],w=[{type:12,data:b},{type:12,data:d},{type:12,data:p},{type:12,data:f}];Bt(t,w),w.push(...Q(T,o,u)),$&&w.push(...Q(e[2].dims)),w.push(...Q(v));let k=C=>{let S=rn("batch_dims",e[0].dataType,T.length),z=M("a",e[0].dataType,o.length,g),E=M("b",e[1].dataType,u.length,h),R=K("output",e[0].dataType,v.length,h),U=Se(R.type.tensor),V=Rt(t,R.type.value,U),Z=[z,E],X="";if($){let se=a?h:1;Z.push(M("bias",e[2].dataType,e[2].dims.length,se)),X=`${a?`value += bias[col / ${se}];`:`value += ${R.type.value}(bias[row + i]);`}`}let re=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Mt(t,re);let G=()=>{let se=`var a_data: ${z.type.value};`;for(let J=0;J<g;J++)se+=`
              let b_data${J} = b[(b_offset + (k + ${J}) * uniforms.N + col) / ${h}];`;for(let J=0;J<y;J++){se+=`a_data = a[(a_offset + (row + ${J}) * uniforms.K + k) / ${g}];`;for(let H=0;H<g;H++)se+=`
            values[${J}] = fma(${E.type.value}(a_data${g===1?"":`[${H}]`}), b_data${H}, values[${J}]);
`}return se};return`
  ${C.registerUniforms(re).registerInternalVariables(S).declareVariables(...Z,R)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${y};
    let row = (index1 % stride1) * ${y};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${S.offsetToIndices("batch")};`}

    var a_indices: ${z.type.indices};
    ${mi("a_indices",z,z.rank-2,S.rank,"batch_indices")}
    ${z.indicesSet("a_indices",z.rank-2,0)}
    ${z.indicesSet("a_indices",z.rank-1,0)}
    let a_offset = ${z.indicesToOffset("a_indices")};

    var b_indices: ${E.type.indices};
    ${mi("b_indices",E,E.rank-2,S.rank,"batch_indices")}
    ${E.indicesSet("b_indices",E.rank-2,0)}
    ${E.indicesSet("b_indices",E.rank-1,0)}
    let b_offset = ${E.indicesToOffset("b_indices")};
    var values: array<${R.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${G()}
    }
    for (var i = 0u; i < ${y}u; i++) {
      var value = values[i];
      ${X}
      ${V}
      let cur_indices = ${R.type.indices}(batch, row + i, col);
      let offset = ${R.indicesToOffset("cur_indices")};
      ${R.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${g};${y};${a}`,inputDependencies:$?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:w}),getShaderSource:k}}}),Jo,eu,Ma,Zr,tu,Da,iu,Qi,pn=q(()=>{te(),ne(),oe(),Nt(),dn(),un(),Jo=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,eu=(e,t)=>e?`
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
        }`,Ma=(e,t,r="f32",i,a=!1,s=32,o=!1,u=32)=>{let d=t[1]*e[1],p=t[0]*e[0],f=a?d:s,h=a?s:d,g=f/t[0],y=s/t[1];if(!((a&&g===4&&e[1]===4||!a&&(g===3||g===4))&&f%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${f/g}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${s}>;

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
  let batch = ${o?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${o?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Jo(a,i)}
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

          ${eu(a,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Zr=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,tu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Da=(e,t,r="f32",i,a=!1,s=32,o=!1,u=32,d=!1)=>{let p=e[1]*t[1],f=e[0]*t[0],h=a?p:s,g=a?s:p;if(!(g%t[1]===0&&h%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let y=g/t[1],b=h/t[0],$=s/t[1],T=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${f};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Zr(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
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
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${y};
let tileColA = i32(localId.x) * ${b};
let tileRowB = i32(localId.y) * ${$};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${b}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Zr(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${$}; innerRow = innerRow + 1) {
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
      ${tu(a)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${h}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${f}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${T}
  }
`},iu=(e,t,r,i,a=!1)=>{let[s,o,u,d]=i,p=Se(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${mi("aIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${mi("bIndices",u,u.rank-2,s.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ee(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${Ee(e,p)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Qi=(e,t,r,i,a=!1,s)=>{let o=e[0].dims,u=e[1].dims,d=o.slice(0,-2),p=u.slice(0,-2),f=i?i.slice(0,-2):r.slice(0,-2),h=A.size(f),g=o[o.length-2],y=o[o.length-1],b=u[u.length-1],$=y%4===0&&b%4===0,T=g<=8?[4,1,1]:[4,4,1],v=[8,8,1],w=[Math.ceil(b/v[0]/T[0]),Math.ceil(g/v[1]/T[1]),Math.ceil(h/v[2]/T[2])],k=$?4:1,C=[...d,g,y/k],S=C.length,z=[...p,y,b/k],E=z.length,R=[h,g,b/k],U=[{type:6,data:g},{type:6,data:b},{type:6,data:y}];Bt(t,U),U.push(...Q(f,C,z));let V=["rank","rank"],Z=e.length>2;Z&&(U.push(...Q(e[2].dims)),V.push("rank")),U.push(...Q(R));let X=re=>{let G=f.length,se=rn("batchDims",e[0].dataType,G,1),J=Se(e[0].dataType),H=M("a",e[0].dataType,S,k),ae=M("b",e[1].dataType,E,k),j=K("result",e[0].dataType,R.length,k),ge=[H,ae];if(Z){let D=a?k:1;ge.push(M("bias",e[2].dataType,e[2].dims.length,D))}let P=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Mt(t,P);let W=Se(j.type.tensor),ie=Rt(t,j.type.value,W),pe=iu(k,Z,ie,[se,H,ae,j],a);return`
  ${re.registerUniforms(P).registerInternalVariables(se).declareVariables(...ge,j)}
  ${pe}
  ${$?Ma(T,v,J,se):Da(T,v,J,se)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${$};${a}`,inputDependencies:V},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:U}),getShaderSource:X}}}),ru,bc,tg=q(()=>{te(),lt(),oe(),Nt(),un(),eg(),pn(),ru=(e,t,r,i,a=!1,s,o=4,u=4,d=4,p="f32")=>{let f=U=>{switch(U){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${U} is not supported.`)}},h=U=>{switch(U){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${U} is not supported.`)}},g=e?`
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
    `,b=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",$=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",v=e?"col":"row",w=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Ee(o,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${b} && xCol >= 0 && xCol < ${$}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${f(o)}
    }
    return resData;`,k=e?t&&i?`
    let col = colIn * ${o};
    ${w}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${w}
    }
    return ${Ee(o,p)}(0.0);`:i&&r?`
    let col = colIn * ${o};
    ${w}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${w}
    }
    return ${Ee(o,p)}(0.0);`,C=e?i&&r?h(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(u)}
    }
    return ${Ee(u,p)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(u)}
    }
    return ${Ee(u,p)}(0.0);`,S=Ee(d,p),z=Ee(e?o:u,p),E=Ee(e?u:o,p),R=Rt(s,S,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?k:C}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${e?C:k}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${S}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${yc(a)}
      ${R}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},bc=(e,t,r,i,a,s,o,u,d)=>{let p=t.format==="NHWC",f=p?e[0].dims[3]:e[0].dims[1],h=r[0],g=p?r[2]:r[3],y=p?r[1]:r[2],b=p?r[3]:r[1],$=p&&(f%4===0||f%3===0)&&b%4===0,T=p?b:g*y,v=p?g*y:b,w=[8,8,1],k=i<=8?[4,1,1]:[4,4,1],C=[Math.ceil(T/w[0]/k[0]),Math.ceil(v/w[1]/k[1]),Math.ceil(h/w[2]/k[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${C}`);let S=$?p&&f%4!==0?3:4:1,z=w[1]*k[1],E=w[0]*k[0],R=Math.max(w[0]*S,w[1]),U=i%z===0,V=a%E===0,Z=s%R===0,X=$?[S,4,4]:[1,1,1],re=[{type:6,data:i},{type:6,data:a},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Bt(t,re),re.push(...Q(e[0].dims,e[1].dims));let G=["rank","rank"];o&&(re.push(...Q(e[2].dims)),G.push("rank")),re.push(...Q(r));let se=J=>{let H=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Mt(t,H);let ae=$?4:1,j=Se(e[0].dataType),ge=`
      fn setOutputAtIndex(flatIndex : i32, value : ${$?`vec4<${j}>`:j}) {
        result[flatIndex] = ${$?`vec4<${j}>`:j}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${$?`vec4<${j}>`:j}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${$?"/ 4":""}, value);
      }`,P=M("x",e[0].dataType,e[0].dims.length,S===3?1:S),W=M("w",e[1].dataType,e[1].dims.length,ae),ie=[P,W],pe=K("result",e[0].dataType,r.length,ae);if(o){let D=M("bias",e[2].dataType,e[2].dims.length,ae);ie.push(D),ge+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${$?`vec4<${j}>`:j} {
          return bias[coords.${p?"w":"y"}${$?"/ 4":""}];
        }`}return`
        ${_c("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${J.registerUniforms(H).declareVariables(...ie,pe)}
        ${ge}
        ${ru(p,U,V,Z,o,t,X[0],X[1],X[2],j)}
        ${$?Ma(k,w,j,void 0,!p,R):Da(k,w,j,void 0,!p,R,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${S};${$};${U};${V};${Z};${z};${E};${R}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:C[0],y:C[1],z:C[2]},programUniforms:re}),getShaderSource:se}}}),au,Yr,ri,nu,Xr,su,wc,$c,ig=q(()=>{te(),lt(),ne(),oe(),Nt(),un(),au=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Yr=e=>typeof e=="number"?[e,e,e]:e,ri=(e,t)=>t<=1?e:e+(e-1)*(t-1),nu=(e,t,r,i=1)=>{let a=ri(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)},Xr=(e,t,r,i,a)=>{a==null&&(a=nu(e,t[0],i[0]));let s=[0,0,0,r];for(let o=0;o<3;o++)e[o]+2*a>=t[o]&&(s[o]=Math.trunc((e[o]-t[o]+2*a)/i[o]+1));return s},su=(e,t,r,i,a,s,o,u,d,p)=>{let f,h,g,y;if(e==="VALID"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e};let b=Xr([t,r,i,1],[u,d,p],1,[a,s,o],e);h=b[0],g=b[1],y=b[2]}else if(Array.isArray(e)){if(!e.every(($,T,v)=>$===v[0]))throw Error(`Unsupported padding parameter: ${e}`);f={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let b=Xr([t,r,i,1],[u,d,p],1,[a,s,o],e[0]);h=b[0],g=b[1],y=b[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/a),g=Math.ceil(r/s),y=Math.ceil(i/o);let b=(h-1)*a+u-t,$=(g-1)*s+d-r,T=(y-1)*o+p-i,v=Math.floor(b/2),w=b-v,k=Math.floor($/2),C=$-k,S=Math.floor(T/2),z=T-S;f={top:k,bottom:C,left:S,right:z,front:v,back:w}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:h,outHeight:g,outWidth:y}},wc=(e,t,r,i,a,s=!1,o="channelsLast")=>{let u,d,p,f,h;if(o==="channelsLast")[u,d,p,f,h]=e;else if(o==="channelsFirst")[u,h,d,p,f]=e;else throw new Error(`Unknown dataFormat ${o}`);let[g,,y,b,$]=t,[T,v,w]=Yr(r),[k,C,S]=Yr(i),z=ri(y,k),E=ri(b,C),R=ri($,S),{padInfo:U,outDepth:V,outHeight:Z,outWidth:X}=su(a,d,p,f,T,v,w,z,E,R),re=s?g*h:g,G=[0,0,0,0,0];return o==="channelsFirst"?G=[u,re,V,Z,X]:o==="channelsLast"&&(G=[u,V,Z,X,re]),{batchSize:u,dataFormat:o,inDepth:d,inHeight:p,inWidth:f,inChannels:h,outDepth:V,outHeight:Z,outWidth:X,outChannels:re,padInfo:U,strideDepth:T,strideHeight:v,strideWidth:w,filterDepth:y,filterHeight:b,filterWidth:$,effectiveFilterDepth:z,effectiveFilterHeight:E,effectiveFilterWidth:R,dilationDepth:k,dilationHeight:C,dilationWidth:S,inShape:e,outShape:G,filterShape:t}},$c=(e,t,r,i,a,s)=>{let o=s==="channelsLast";o?e[0].dims[3]:e[0].dims[1];let u=[64,1,1],d={x:r.map((T,v)=>v)},p=[Math.ceil(au(d.x.map(T=>r[T]))/u[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let f=1,h=A.size(r),g=[{type:12,data:h},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Bt(t,g),g.push(...Q(e[0].dims,e[1].dims));let y=["rank","rank"],b=e.length===3;b&&(g.push(...Q(e[2].dims)),y.push("rank")),g.push(...Q(r));let $=T=>{let v=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Mt(t,v);let w=1,k=Se(e[0].dataType),C=M("x",e[0].dataType,e[0].dims.length,f),S=M("W",e[1].dataType,e[1].dims.length,w),z=[C,S],E=K("result",e[0].dataType,r.length,w),R="";if(b){let Z=M("bias",e[2].dataType,e[2].dims.length,w);z.push(Z),R+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${k} {
          return bias[${o?Y("coords",4,5):Y("coords",1,5)}];
        }`}let U=Ee(f,k),V=Rt(t,U,k);return`
            ${R}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${S.getByIndices("aIndices")};
            }
          ${T.registerUniforms(v).declareVariables(...z,E)}
          ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${E.offsetToIndices("global_idx")};
              let batch = ${Y("coords",0,C.rank)};
              let d2 = ${o?Y("coords",C.rank-1,C.rank):Y("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${o?Y("coords",1,C.rank):Y("coords",2,C.rank)},
              ${o?Y("coords",2,C.rank):Y("coords",3,C.rank)},
              ${o?Y("coords",3,C.rank):Y("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?Y("uniforms.x_shape",1,C.rank):Y("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${o?Y("uniforms.x_shape",2,C.rank):Y("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${o?Y("uniforms.x_shape",3,C.rank):Y("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${o?Y("uniforms.x_shape",4,C.rank):Y("uniforms.x_shape",1,C.rank)};
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
                      ${o?`let xValues = vec4<f32>(
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
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
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
                      ${o?`let xValues = vec3<f32>(
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
              ${b?"value = value + getBiasByOutputCoords(coords)":""};
              ${V}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${o};${f};${b}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:g}),getShaderSource:$}}}),vc,xc,rg=q(()=>{te(),ne(),oe(),Nt(),vc=(e,t,r,i)=>{let a=e.length>2,s=a?"value += b[output_channel];":"",o=e[0].dims,u=e[1].dims,d=t.format==="NHWC",p=d?r[3]:r[1],f=p/t.group,h=d&&f>=4?ve(p):1,g=A.size(r)/h,y=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:f}];Bt(t,y),y.push(...Q(o,[u[0],u[1],u[2],u[3]/h]));let b=a?["rank","rank","rank"]:["rank","rank"];y.push(...Q([r[0],r[1],r[2],r[3]/h]));let $=T=>{let v=K("output",e[0].dataType,r.length,h),w=Se(v.type.tensor),k=Rt(t,v.type.value,w),C=M("x",e[0].dataType,o.length),S=M("w",e[1].dataType,u.length,h),z=[C,S];a&&z.push(M("b",e[2].dataType,e[2].dims,h));let E=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Mt(t,E);let R=d?`
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
            let wVal = ${S.get("wHeight","wWidth","wInChannel","output_channel")};
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
            let wVal = ${S.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(E).declareVariables(...z,v)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${R}
    ${s}
    ${k}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:y}),getShaderSource:$}},xc=(e,t,r,i)=>{let a=e.length>2,s=ve(r[3]),o=ve(r[2]),u=A.size(r)/s/o,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],f=[r[0],r[1],r[2],r[3]/s],h=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Bt(t,h),h.push(...Q(d,p,f));let g=(o-1)*t.strides[1]+p[1],y=b=>{let $=K("output",e[0].dataType,f.length,s),T=Se($.type.tensor),v=Rt(t,$.type.value,T),w=M("x",e[0].dataType,d.length,s),k=M("w",e[1].dataType,p.length,s),C=[w,k];a&&C.push(M("b",e[2].dataType,e[2].dims,s));let S=a?"value += b[output_channel];":"",z=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Mt(t,z),`
  ${b.registerUniforms(z).declareVariables(...C,$)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${g}>;
    var values: array<${$.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${k.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${S}
      ${v}
      ${$.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${o};${g};${p[0]};${p[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:y}}}),ou,Ui,uu,qi,Na,Qr,lu,du,Pa,ag=q(()=>{ne(),tg(),ig(),pn(),rg(),Nt(),dn(),bt(),ou=(e,t,r,i,a,s)=>{let o=e[0],u=e.slice(s?1:2,s?3:4),d=u.length,p=t[0],f=t.slice(2).map((g,y)=>g+(g-1)*(r[y]-1)),h=u.map((g,y)=>g+i[y]+i[y+d]).map((g,y)=>Math.floor((g-f[y]+a[y])/a[y]));return h.splice(0,0,o),h.splice(s?3:1,0,p),h},Ui=[2,3,1,0],uu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},qi=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let s=2;s<t[1].dims.length;++s)r[s-2]===0&&(r[s-2]=t[1].dims[s]);let i=e.pads.slice();Yi.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},Na=e=>{let t=on(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,s=e.group,o=e.kernel_shape,u=e.pads,d=e.strides,p=e.w_is_const();return{autoPad:i,format:r,dilations:a,group:s,kernelShape:o,pads:u,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Qr=(e,t,r,i)=>{let a=r.format==="NHWC",s=ou(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let z=[t[0]];if(a){let E=e.kernelCustomData.wT??e.compute(Pe(t[1],Ui),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=E),z.push(E)}else z.push(t[1]);t.length===3&&z.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(xc(z,r,s,i),{inputs:z}):e.compute(vc(z,r,s,i),{inputs:z});return}let o=t.length===3,u=t[0].dims[a?1:2],d=t[0].dims[a?2:3],p=t[0].dims[a?3:1],f=t[1].dims[2],h=t[1].dims[3],g=s[a?1:2],y=s[a?2:3],b=s[a?3:1],$=a&&f===u&&h===d&&r.pads[0]===0&&r.pads[1]===0;if($||f===1&&h===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let z=s[0],E,R,U,V=[];if(a){let re=e.kernelCustomData.wT??e.compute(Pe(t[1],Ui),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=re),$){let G=u*d*p;E=t[0].reshape([1,z,G]),R=re.reshape([1,G,b]),U=[1,z,b]}else E=t[0].reshape([z,u*d,p]),R=re.reshape([1,p,b]),U=[z,g*y,b];V.push(E),V.push(R)}else E=t[0].reshape([z,p,u*d]),R=t[1].reshape([1,b,p]),U=[z,b,g*y],V.push(R),V.push(E);o&&V.push(t[2]);let Z=U[2],X=V[0].dims[V[0].dims.length-1];Z<8&&X<8?e.compute(ln(V,r,s,U,a,i),{inputs:V}):e.compute(Qi(V,r,s,U,a,i),{inputs:V});return}let T=!0,v=e.kernelCustomData.wT??e.compute(Pe(t[1],Ui),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let w=[t[0],v];o&&w.push(t[2]);let k=a?g*y:b,C=a?b:g*y,S=f*h*p;e.compute(bc(w,r,s,k,C,S,o,T,i),{inputs:w})},lu=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),o=[1].concat(t.dilations),u=[1].concat(t.kernelShape),d=qi({...t,pads:a,strides:s,dilations:o,kernelShape:u},i);Qr(e,i,d,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},du=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",a=qi(r,t),s=r.autoPad==="NOTSET"?r.pads:r.autoPad,o=wc(t[0].dims,t[1].dims,r.strides,r.dilations,s,!1,i);e.compute($c(t,a,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],i))},Pa=(e,t)=>{if(uu(e.inputs,t),e.inputs[0].dims.length===3)lu(e,t);else if(e.inputs[0].dims.length===5)du(e,e.inputs,t);else{let r=qi(t,e.inputs);Qr(e,e.inputs,r)}}}),Cc,ng=q(()=>{te(),lt(),ne(),oe(),Cc=(e,t,r)=>{let i=e.length>2,a=t.outputShape,s=t.format==="NHWC",o=t.group,u=e[1].dims,d=u[2]/o,p=u[3],f=s?ve(d):1,h=s&&p===1&&d>=4,g=h?Math.floor(d/4)*4:Math.floor(d/f)*f,y=d-g,b=s?ve(p):1,$=s?p===1?f:b:1,T=A.size(a)/b,v=[Math.ceil(T/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let w=["rank","rank"],k=[t.strides[0],t.strides[1]],C=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],S=[t.dilations[0],t.dilations[1]],z=[C[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),C[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],E=[z[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),z[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],R=[{type:12,data:T},{type:12,data:k},{type:12,data:C},{type:12,data:S},{type:12,data:z},{type:6,data:E},{type:12,data:g},{type:12,data:d},{type:12,data:p},...Q(e[0].dims,e[1].dims)];i&&(R.push(...Q(e[2].dims)),w.push("rank")),R.push(...Q(a));let U=V=>{let Z=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:k.length},{name:"filter_dims",type:"u32",length:C.length},{name:"dilations",type:"u32",length:C.length},{name:"effective_filter_dims",type:"u32",length:z.length},{name:"pads",type:"i32",length:E.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],X=Se(e[0].dataType),re=s?1:2,G=s?2:3,se=s?3:1,J=M("W",e[1].dataType,e[1].dims.length,$),H=M("Dy",e[0].dataType,e[0].dims.length,f),ae=[H,J];i&&ae.push(M("bias",e[2].dataType,[a[se]].length,b));let j=K("result",e[0].dataType,a.length,b),ge=()=>{let ie="";if(h)f===4?ie+=`
        let xValue = ${H.getByOffset("x_offset")};
        let wValue = ${J.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:f===2?ie+=`
          dotProd = dotProd + dot(vec4<${X}>(${H.getByOffset("x_offset")}, ${H.getByOffset("x_offset + 1u")}), vec4<${X}>(${J.getByOffset("w_offset")}, ${J.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:f===1&&(ie+=`
          dotProd = dotProd + dot(vec4<${X}>(${H.getByOffset("x_offset")}, ${H.getByOffset("x_offset + 1u")}, ${H.getByOffset("x_offset + 2u")}, ${H.getByOffset("x_offset + 3u")}), vec4<${X}>(${J.getByOffset("w_offset")}, ${J.getByOffset("w_offset + 1u")}, ${J.getByOffset("w_offset + 2u")}, ${J.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ie+=`
                  let xValue = ${s?H.getByOffset(`${H.indicesToOffset(`${H.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f}`):H.get("batch","inputChannel","idyR","idyC")};
        `,f===1)ie+=`
          let w_offset = ${J.indicesToOffset(`${J.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${J.getByOffset(`w_offset / ${$}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let pe=0;pe<f;pe++)ie+=`
            let wValue${pe} = ${J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${pe}, wOutChannel)`)} / ${$}`)};
            dotProd = dotProd + xValue[${pe}] * wValue${pe};`;return ie},P=()=>{if(y===0)return"";if(!h)throw new Error(`packInputAs4 ${h} is not true.`);let ie="";if(f===1){ie+="dotProd = dotProd";for(let pe=0;pe<y;pe++)ie+=`
            + ${H.getByOffset(`x_offset + ${pe}`)} * ${J.getByOffset(`w_offset + ${pe}`)}`;ie+=";"}else if(f===2){if(y!==2)throw new Error(`Invalid inputChannelsRemainder ${y}.`);ie+=`
          let xValue = ${H.getByOffset("x_offset")};
          let wValue = ${J.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ie},W=`
            let outputIndices = ${j.offsetToIndices(`global_idx * ${b}`)};
            let batch = ${j.indicesGet("outputIndices",0)};
            let d1 = ${j.indicesGet("outputIndices",se)};
            let r = ${j.indicesGet("outputIndices",re)};
            let c = ${j.indicesGet("outputIndices",G)};
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
              let dyR = (${X}(dyRCorner) + ${X}(wR)) / ${X}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${X}(uniforms.Dy_shape[${re}]) || fract(dyR) > 0.0 ||
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
                let dyC = (${X}(dyCCorner) + ${X}(wC)) / ${X}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${X}(uniforms.Dy_shape[${G}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${h?`
                var x_offset = ${H.indicesToOffset(`${H.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${f};
                var w_offset = ${J.indicesToOffset(`${J.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${$};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${h?4:f}) {
                  ${ge()}
                  inputChannel = inputChannel + ${h?4:f};
                }
                ${P()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${b}]`:""};
            ${j.setByOffset("global_idx","value")};
          `;return`
    ${V.registerUniforms(Z).declareVariables(...ae,j)}
      ${V.mainStart()}
      ${V.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${W}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${f}${$}${b}${h}${y}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:R}),getShaderSource:U}}}),pu,cu,fu,Jr,Tc,hu,ea,mu,kc,sg=q(()=>{ng(),Nt(),bt(),pu=(e,t,r,i,a,s)=>(e-1)*t+r+(i-1)*a+1-s,cu=(e,t,r,i,a)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=s,r[a]=e-s):t==="SAME_LOWER"&&(r[i]=e-s,r[a]=s)},fu=(e,t,r,i,a,s,o,u,d,p)=>{let f=e.length-2,h=p.length===0;d.length<f&&d.push(...Array(f-d.length).fill(0));let g=e[0],y=t[u?3:1]*a;for(let b=0,$=e.length-f-(u?1:0);b<f;++b,++$){let T=e[$],v=h?T*o[b]:p[b],w=pu(T,o[b],s[b],t[$],r[b],v);cu(w,i,s,b,b+f),h&&p.push(o[b]*(T-1)+d[b]+(t[$]-1)*r[b]+1-s[b]-s[b+f])}p.splice(0,0,g),p.splice(u?3:1,0,y)},Jr=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,g)=>h*g,1)===0){r.length=0;for(let h=2;h<t[1].dims.length;++h)r.push(t[1].dims[h])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),s=e.outputShape.slice(),o=e.outputPadding.slice(),u=t[0].dims,d=e.dilations.slice();if(d.reduce((h,g)=>h+g,0)===0){let h=t[0].dims.length-2;d=new Array(h).fill(1)}let p=e.strides.slice();if(p.reduce((h,g)=>h+g,0)===0){let h=t[0].dims.length-2;p=new Array(h).fill(1)}fu(u,r,d,e.autoPad,e.group,a,p,i,o,s);let f=Object.assign({},e);return Object.assign(f,{kernelShape:r,pads:a,outputPadding:o,outputShape:s,dilations:d,strides:p}),f},Tc=e=>{let t=on(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,s=e.group,o=e.kernelShape,u=e.pads,d=e.strides,p=e.wIsConst(),f=e.outputPadding,h=e.outputShape;return{autoPad:i,format:r,dilations:a,group:s,kernelShape:o,outputPadding:f,outputShape:h,pads:u,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},hu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((o,u)=>o+u,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((o,u)=>o+u,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((o,u)=>o+u,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((o,u)=>o+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},ea=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute(Pe(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let s=[t[0],a];t.length===3&&s.push(t[2]),e.compute(Cc(s,r,i),{inputs:s})},mu=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],o=[1].concat(o),s=[1].concat(s),a=[1].concat(a);let d=t.outputPadding;d=[0].concat(d);let p=Jr({...t,pads:u,strides:o,dilations:s,kernelShape:a,outputPadding:d},i);ea(e,i,p,f=>r?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},kc=(e,t)=>{if(hu(e.inputs,t),e.inputs[0].dims.length===3)mu(e,t);else{let r=Jr(t,e.inputs);ea(e,e.inputs,r)}}}),gu,Sc,Ic,og=q(()=>{te(),ne(),xe(),oe(),gu=(e,t,r,i)=>{let a=A.size(t),s=t.length,o=M("input",e,s),u=K("output",e,s),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=A.normalizeAxis(d,s),f=h=>{let g=` i32(${o.indicesGet("inputIndices","uniforms.axis")}) `,y=Y("uniforms.input_shape","uniforms.axis",s),b=i.reverse?g+(i.exclusive?" + 1":""):"0",$=i.reverse?y:g+(i.exclusive?"":" + 1");return`
                ${h.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(o,u)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${b};
                  let last : i32 = ${$};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${o.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:p},...Q(t,t)]}),getShaderSource:f}},Sc=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,a=e.inputs[1];e.compute(gu(i,r,a,t),{inputs:[0]})},Ic=e=>{let t=e.exclusive===1,r=e.reverse===1;return he({exclusive:t,reverse:r})}}),yu,_u,bu,Ec,zc,ug=q(()=>{te(),ne(),xe(),oe(),yu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},_u=(e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let s=0;s<t;++s)a.push(r.indicesSet("a",e[s],`i[${s}]`));return a.push("return a;}"),a.join(`
`)},bu=(e,t)=>{let r,i,a,s,o,u,d=t.format==="NHWC",p=t.blocksize,f=t.mode==="DCR";d?([r,i,a,s]=e.dims,o=f?[r,i,a,p,p,s/p**2]:[r,i,a,s/p**2,p,p],u=f?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,a,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=f?[r,p,p,s/p**2,i,a]:[r,s/p**2,p,p,i,a],u=f?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(o),g=h.dims.length,y=e.dataType,b=M("a",y,g),$=K("output",y,g),T=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(b,$)}

  ${_u(u,g,b,$)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let w=d?[r,i*p,a*p,s/p**2]:[r,s/p**2,i*p,a*p],k=A.size(w),C=h.dims,S=A.sortBasedOnPerm(C,u);return{outputs:[{dims:w,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:[{type:12,data:k},...Q(C,S)]}},getShaderSource:T}},Ec=(e,t)=>{yu(e.inputs),e.compute(bu(e.inputs[0],t))},zc=e=>he({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Li,ai,ta,wu,$u,vu,xu,ia,Cu,Ac,Oc,lg=q(()=>{te(),ne(),xe(),oe(),Li="[a-zA-Z]|\\.\\.\\.",ai="("+Li+")+",ta="^"+ai+"$",wu="("+ai+",)*"+ai,$u="^"+wu+"$",vu=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},xu=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp($u)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,s)=>{let o=e[s].dims.slice();if(!a.match(RegExp(ta)))throw new Error("Invalid LHS term");let u=this.processTerm(a,!0,o,s);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([a,s])=>s.count===1||a==="...").map(([a])=>a).join("");else if(!i.match(RegExp(ai)))throw new Error("Invalid RHS");i.match(RegExp(Li,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(a);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,s=!1,o=[],u=0;if(!e.match(RegExp(ta))&&!t&&e!=="")throw new Error("Invalid LHS term");let d=e.match(RegExp(Li,"g")),p=new vu(i);return d?.forEach((f,h)=>{if(f==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let g=a-d.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(o=r.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<o.length;y++){let b=String.fromCharCode(48+y);p.addSymbol(b,h+y),this.addSymbol(b,r[u++],i)}}else p.addSymbol(f,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(f,r[u++],i)}),p}},ia=e=>e+"_max",Cu=(e,t,r,i)=>{let a=e.map(p=>p.length).map((p,f)=>M(`input${f}`,t,p)),s=A.size(i),o=K("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),d=p=>{let f=[],h="var prod = 1.0;",g="var sum = 0.0;",y="sum += prod;",b=[],$=[],T=[],v=[],w=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((C,S)=>{if(r.rhs.symbolToIndices.has(S)){let z=r.rhs.symbolToIndices.get(S)?.[0];z!==void 0&&r.lhs.forEach((E,R)=>{if(C.inputIndices.includes(R)){let U=E.symbolToIndices.get(S);if(U===void 0)throw new Error("Invalid symbol error");U.forEach(V=>{f.push(`${a[R].indicesSet(`input${R}Indices`,V,o.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,E)=>{if(C.inputIndices.includes(E)){let R=z.symbolToIndices.get(S);if(R===void 0)throw new Error("Invalid symbol error");R.forEach(U=>{b.push(`${a[E].indicesSet(`input${E}Indices`,U,`${S}`)}`)}),v.push(`prod *= ${a[E].getByIndices(`input${E}Indices`)};`)}}),$.push(`for(var ${S}: u32 = 0; ${S} < uniforms.${ia(S)}; ${S}++) {`),T.push("}")});let k=w?[...f,`let sum = ${a.map((C,S)=>C.getByIndices(`input${S}Indices`)).join(" * ")};`]:[...f,g,...$,...b,h,...v,y,...T];return`
            ${p.registerUniforms(u.map(C=>({name:`${ia(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,o)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${o.offsetToIndices("global_idx")};
            ${a.map((C,S)=>`var input${S}Indices: ${a[S].type.indices};`).join(`
`)}
            ${k.join(`
`)};
            ${o.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=u.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));p.push({type:12,data:s});let f=e.map((h,g)=>[...Q(h)]).reduce((h,g)=>h.concat(g),p);return f.push(...Q(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}},getShaderSource:d}},Ac=(e,t)=>{let r=new xu(e.inputs,t.equation),i=r.outputDims,a=e.inputs.map((s,o)=>s.dims);e.compute(Cu(a,e.inputs[0].dataType,r,i))},Oc=e=>{let t=e.equation.replace(/\s+/g,"");return he({equation:t})}}),Tu,ra,ku,Su,Rc,dg=q(()=>{te(),ne(),oe(),Tu=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&r[i]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ra=(e,t)=>{let r=e.length-t.length,i=[];for(let a=0;a<r;++a)i.push(e[a]);for(let a=0;a<t.length;++a)i.push(t[a]===1?e[a+r]:t[a]);return i},ku=(e,t)=>e.length>t.length?ra(e,t):ra(t,e),Su=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=ku(t,r),a=e[0].dataType,s=a===9||A.size(t)===1,o=a===9||t.length>0&&t[t.length-1]%4===0?4:1,u=s||i.length>0&&i[i.length-1]%4===0?4:1,d=Math.ceil(A.size(i)/u),p=h=>{let g=M("input",a,t.length,o),y=K("output",a,i.length,u),b;if(a===9){let $=(T,v,w="")=>`
          let outputIndices${v} = ${y.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${g.broadcastedIndicesToOffset(`outputIndices${v}`,y)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${T}[${v}] = ${w}(${g.getByOffset(`index${v}`)}[component${v}]);
        `;b=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${$("data",0,"u32")}
        ${$("data",1,"u32")}
        ${$("data",2,"u32")}
        ${$("data",3,"u32")}
        ${y.setByOffset("global_idx","data")}
      }`}else b=`
        let outputIndices = ${y.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",y)};
        let data = ${y.type.value}(${g.getByOffset(`inputOffset / ${o}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${h.registerUniform("vec_size","u32").declareVariables(g,y)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${b}`},f=[{type:12,data:d},...Q(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${o}${u}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f})}},Rc=e=>{Tu(e.inputs),e.compute(Su(e.inputs),{inputs:[0]})}}),Iu,Bc,pg=q(()=>{te(),ne(),oe(),sn(),Iu=e=>{let t=e[0].dataType,r=A.size(e[0].dims),i=A.size(e[1].dims),a=i%4===0,s=o=>{let u=M("x",t,[1],4),d=M("bias",t,[1],4),p=K("y",t,[1],4),f=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${d.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,g=a?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${o.registerUniforms(f).declareVariables(u,d,p)}

    ${Ra(Ae(t))}

    ${o.mainStart(Vt)}
      ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",Ba("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:o=>({outputs:[{dims:o[0].dims,dataType:o[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/Vt/4)}})}},Bc=e=>{e.inputs.length<2||A.size(e.inputs[1].dims)===0?ec(e):e.compute(Iu(e.inputs))}}),Eu,zu,Mc,Dc,cg=q(()=>{te(),ne(),xe(),oe(),Eu=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},zu=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,s=A.normalizeAxis(t.axis,a),o=r.slice(0);o.splice(s,1,...i);let u=r[s],d=e[0].dataType===9?4:1,p=Math.ceil(A.size(o)/d),f=[{type:12,data:p},{type:6,data:u},{type:12,data:s},...Q(e[0].dims,e[1].dims,o)],h=g=>{let y=M("data",e[0].dataType,e[0].dims.length,d),b=M("inputIndices",e[1].dataType,e[1].dims.length),$=K("output",e[0].dataType,o.length,d),T=w=>{let k=i.length,C=`var indicesIndices${w}  = ${b.type.indices}(0);`;for(let S=0;S<k;S++)C+=`${k>1?`indicesIndices${w}[${S}]`:`indicesIndices${w}`} = ${o.length>1?`outputIndices${w}[uniforms.axis + ${S}]`:`outputIndices${w}`};`;C+=`
          var idx${w} = ${b.getByIndices(`indicesIndices${w}`)};
          if (idx${w} < 0) {
            idx${w} = idx${w} + uniforms.axisDimLimit;
          }
          var dataIndices${w} : ${y.type.indices};
        `;for(let S=0,z=0;S<a;S++)S===s?(C+=`${a>1?`dataIndices${w}[${S}]`:`dataIndices${w}`} = u32(idx${w});`,z+=k):(C+=`${a>1?`dataIndices${w}[${S}]`:`dataIndices${w}`} = ${o.length>1?`outputIndices${w}[${z}]`:`outputIndices${w}`};`,z++);return C},v;if(e[0].dataType===9){let w=(k,C,S="")=>`
          let outputIndices${C} = ${$.offsetToIndices(`outputOffset + ${C}u`)};
          ${T(C)};
          let offset${C} = ${y.indicesToOffset(`dataIndices${C}`)};
          let index${C} = offset${C} / 4u;
          let component${C} = offset${C} % 4u;
          ${k}[${C}] = ${S}(${y.getByOffset(`index${C}`)}[component${C}]);
        `;v=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${w("value",0,"u32")}
        ${w("value",1,"u32")}
        ${w("value",2,"u32")}
        ${w("value",3,"u32")}
        ${$.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${$.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${y.getByIndices("dataIndices")};
      ${$.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,b,$)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:h}},Mc=e=>he({axis:e.axis}),Dc=(e,t)=>{let r=e.inputs;Eu(r),e.compute(zu(e.inputs,t))}}),Au,Nc,Pc,fg=q(()=>{te(),ne(),oe(),Au=(e,t,r,i,a,s,o,u,d)=>{let p=[{type:12,data:s},{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:o},{type:12,data:u},{type:12,data:d}],f=[s];p.push(...Q(t.dims,f));let h=g=>{let y=M("indices_data",t.dataType,t.dims.length),b=K("input_slice_offsets_data",12,1,1),$=[y,b],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(T).declareVariables(...$)}
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
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},Nc=(e,t)=>{let r=e.inputs,i=r[0].dims,a=r[0].dataType,s=r[1].dims,o=s[s.length-1],u=A.sizeToDimension(s,s.length-1),d=A.sizeFromDimension(i,t.batchDims+o),p=A.sizeToDimension(i,t.batchDims),f=A.sizeFromDimension(i,t.batchDims),h=u/p,g=new Array(o),y=d;for(let C=0;C<o;++C)g[o-1-C]=y,y*=i[t.batchDims+o-1-C];let b=Au(e,r[1],g,t.batchDims,i,u,h,f,o),$=t.batchDims+o;if($>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=s.slice(0,-1).concat(i.slice($)),v=A.size(T),w=[{type:12,data:v},{type:12,data:d},...Q(r[0].dims,b.dims,T)],k=C=>{let S=M("data",r[0].dataType,r[0].dims.length),z=M("slice_offsets",12,b.dims.length),E=K("output",r[0].dataType,T.length);return`
          ${C.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(S,z,E)}
            ${C.mainStart()}
            ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:a}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:w}),getShaderSource:k},{inputs:[r[0],b]})},Pc=e=>({batchDims:e.batch_dims,cacheKey:""})}),Ou,Ru,Uc,qc,hg=q(()=>{te(),ne(),xe(),oe(),Ou=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=A.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],s=e[2],o=e.length===4?e[3]:void 0;if(s.dims.length!==a.dims.length||!a.dims.map((u,d)=>d===r?Math.ceil(u/i)===s.dims[d]:u===s.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==s.dims.length||!o.dims.map((u,d)=>u===s.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Ru=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,s=A.normalizeAxis(t.gatherAxis,a),o=A.normalizeAxis(t.quantizeAxis,a),u=r.slice(0);u.splice(s,1,...i);let d=A.size(u),p=e[2].dataType,f=e[0].dataType===22,h=[{type:12,data:d},{type:12,data:o},{type:12,data:s},{type:12,data:t.blockSize},...Q(...e.map((y,b)=>y.dims),u)],g=y=>{let b=M("data",e[0].dataType,e[0].dims.length),$=M("inputIndices",e[1].dataType,e[1].dims.length),T=M("scales",e[2].dataType,e[2].dims.length),v=e.length>3?M("zeroPoint",e[3].dataType,e[3].dims.length):void 0,w=K("output",p,u.length),k=[b,$,T];v&&k.push(v);let C=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(C).declareVariables(...k,w)}
        ${y.mainStart()}
        let output_indices = ${w.offsetToIndices("global_idx")};
        var indices_indices = ${$.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${w.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${$.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${w.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${b.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${w.indicesGet("output_indices","i")};
          ${b.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${$.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[s]};
        }
        ${b.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${w.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${b.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${b.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${b.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${f?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ae(p)}(quantized_data - zero_point) * scale;
        ${w.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,b)=>b!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,b)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:p}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:g}},Uc=(e,t)=>{let r=e.inputs;Ou(r,t),e.compute(Ru(e.inputs,t))},qc=e=>he({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Bu,Mu,Lc,Wc,mg=q(()=>{te(),ne(),xe(),oe(),Bu=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Mu=(e,t)=>{let r=e[0].dims,i=e[0].dataType,a=r.length,s=e[1].dims,o=e[1].dataType,u=A.normalizeAxis(t.axis,a),d=r[u],p=s.slice(0),f=A.size(p),h=M("input",i,a),g=M("indicesInput",o,s.length),y=K("output",i,p.length),b=[{type:12,data:f},{type:6,data:d},{type:12,data:u}];return b.push(...Q(r,s,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:b}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,g,y)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},Lc=e=>he({axis:e.axis}),Wc=(e,t)=>{let r=e.inputs;Bu(r),e.compute(Mu(e.inputs,t))}}),Du,Nu,Vc,Gc,gg=q(()=>{te(),ne(),oe(),Du=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Nu=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,s,o]=Ld.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[a,s];if(!u)throw new Error("Can't use gemm on the given tensors");let d=16,p=Math.ceil(s/d),f=Math.ceil(a/d),h=!0,g=A.size(u),y=[{type:12,data:h?p:g},{type:12,data:a},{type:12,data:s},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],b=["type","type"];e.length===3&&(y.push(...Q(e[2].dims)),b.push("rank")),y.push(...Q(u));let $=v=>{let w="";t.transA&&t.transB?w="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?w="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?w="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(w="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let k=t.alpha===1?"":"value *= uniforms.alpha;",C=M("a",e[0].dataType,e[0].dims),S=M("b",e[1].dataType,e[1].dims),z=C.type.value,E=null,R=[C,S];e.length===3&&(E=M("c",e[2].dataType,e[2].dims.length),R.push(E));let U=K("output",e[0].dataType,u.length);R.push(U);let V=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(V).declareVariables(...R)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${z}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${w}
    }

    ${k}
    ${E!=null?`let cOffset = ${E.broadcastedIndicesToOffset("vec2(m, n)",U)}; value += ${z}(uniforms.beta) * ${E.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=v=>{let w=M("a",e[0].dataType,e[0].dims),k=M("b",e[1].dataType,e[1].dims),C=null,S=[w,k];e.length===3&&(C=M("c",e[2].dataType,e[2].dims.length),S.push(C));let z=K("output",e[0].dataType,u.length);S.push(z);let E=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],R="",U="";t.transA&&t.transB?(U=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,R="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(U=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,R="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(U=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,R="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(U=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${w.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,R="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let V=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(E).declareVariables(...S)}
  var<workgroup> tile_a: array<array<${w.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${k.type.storage}, ${d}>, ${d}>;
  ${v.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${z.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${U}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${R}
      }
      workgroupBarrier();
    }

    ${V}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${C!=null?`let cOffset = ${C.broadcastedIndicesToOffset("vec2(m, n)",z)}; value += ${z.type.value}(uniforms.beta) * ${C.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:p*f},programUniforms:y}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:y}),getShaderSource:$}},Vc=e=>{let t=e.transA,r=e.transB,i=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:i,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Gc=(e,t)=>{Du(e.inputs),e.compute(Nu(e.inputs,t))}}),Qe,nt,xt,Ct,Pu,Uu,qu,Lu,Wu,Vu,Gu,ju,jc,Hc,yg=q(()=>{te(),ne(),xe(),oe(),[Qe,nt,xt,Ct]=[0,1,2,3],Pu=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Uu=`
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
`,qu=e=>`
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
`,Lu=e=>`
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
`,Vu=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Qe}] = batch;
     indices[${nt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${xt}] = u32(r);
            indices[${Ct}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${xt}] = u32(clamp(r, 0, H - 1));
          indices[${Ct}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${xt}] = gs_reflect(r, border[1], border[3]);
          indices[${Ct}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Gu=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Qe}], indices[${nt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Qe}], indices[${nt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Qe}], indices[${nt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Qe}], indices[${nt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Qe}], indices[${nt}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Qe}], indices[${nt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,ju=(e,t)=>{let r=M("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=M("grid",e[1].dataType,i.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Qe,nt,xt,Ct]=[0,3,1,2]);let o=K("output",e[0].dataType,s.length),u=r.type.value,d=A.size(s),p=[{type:12,data:d},...Q(e[0].dims,i,s)],f=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(r,a,o)}
  ${Uu}
  ${qu(u)}
  ${Lu(t)}
  ${Wu(t)}
  ${Vu(r,u,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${xt}]);
      let W_in = i32(uniforms.x_shape[${Ct}]);

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

      let indices = ${o.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Qe}], indices[${xt}], indices[${Ct}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Gu(o,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let g=A.size(s);return{outputs:[{dims:s,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:p}},getShaderSource:f}},jc=(e,t)=>{Pu(e.inputs),e.compute(ju(e.inputs,t))},Hc=e=>he({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Re,Hu,Fc,aa,Fu,ci,Kc,Zc=q(()=>{te(),ne(),xe(),tn(),nn(),oe(),bt(),Re=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Hu=(e,t)=>{let r=e[0],i=Re(e,1),a=Re(e,2),s=Re(e,3),o=Re(e,4),u=Re(e,5),d=Re(e,6),p=Re(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let f=r.dims[0],h=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],y=h,b=0,$=0,T=Math.floor(g/t.numHeads);if(d&&p&&A.size(d.dims)&&A.size(p.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==f||d.dims[1]!==t.numHeads||d.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==f||p.dims[1]!==t.numHeads||p.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');b=d.dims[2],$=d.dims[2]}else if(d&&A.size(d.dims)||p&&A.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(i&&A.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,y=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,y=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,y=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(s&&A.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let w=b+y,k=0;if(o&&A.size(o.dims)>0){k=8;let E=o.dims;throw E.length===1?E[0]===f?k=1:E[0]===3*f+2&&(k=3):E.length===2&&E[0]===f&&E[1]===w&&(k=5),k===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let C=!1,S=g;if(a&&A.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(y!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=a.dims[2]}else{if(y!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');S=a.dims[1]*a.dims[3],C=!0}}let z=!1;if(o&&A.size(o.dims)>0)throw new Error("Key padding mask is not supported");if(u&&A.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==f||u.dims[1]!==t.numHeads||u.dims[2]!==h||u.dims[3]!==w)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:f,sequenceLength:h,pastSequenceLength:b,kvSequenceLength:y,totalSequenceLength:w,maxSequenceLength:$,inputHiddenSize:0,hiddenSize:g,vHiddenSize:S,headSize:T,vHeadSize:Math.floor(S/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:k,scale:t.scale,broadcastResPosBias:z,passPastInKv:C,qkvFormat:v}},Fc=e=>he({...e}),aa=he({perm:[0,2,1,3]}),Fu=(e,t,r,i,a,s,o)=>{let u=[i,a,s],d=A.size(u),p=[{type:12,data:d},{type:12,data:o},{type:12,data:s}],f=h=>{let g=K("qkv_with_bias",t.dataType,u),y=M("qkv",t.dataType,u),b=M("bias",r.dataType,u),$=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms($).declareVariables(y,b,g)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:f},{inputs:[t,r],outputs:[-1]})[0]},ci=(e,t,r,i,a,s,o,u)=>{let d=s;if(o&&A.size(o.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=Fu(e,s,o,t,i,r*a,u),d=d.reshape([t,i,r,a]),r===1||i===1?d:e.compute(Pe(d,aa.perm),{inputs:[d],outputs:[-1]})[0]}else return s.dims.length===3&&(d=s.reshape([t,i,r,a])),r===1||i===1?d:e.compute(Pe(d,aa.perm),{inputs:[d],outputs:[-1]})[0]},Kc=(e,t)=>{let r=Hu(e.inputs,t),i=e.inputs[0],a=Re(e.inputs,1),s=Re(e.inputs,2),o=Re(e.inputs,3),u=Re(e.inputs,4),d=Re(e.inputs,5),p=Re(e.inputs,6),f=Re(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(a?.dims.length===5)throw new Error("Packed KV is not implemented");let h=a&&s&&a.dims.length===4&&s.dims.length===4,g=ci(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,o,0);if(h)return wi(e,g,a,s,u,void 0,p,f,d,r);if(!a||!s)throw new Error("key and value must be provided");let y=ci(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,o,r.hiddenSize),b=ci(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,s,o,2*r.hiddenSize);wi(e,g,y,b,u,void 0,p,f,d,r)}}),Ku,Zu,Yu,Xu,Ua,Yc,Xc,Qc=q(()=>{te(),ne(),xe(),oe(),Ku=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Zu=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),i=r.length),he({numOutputs:i,axis:t.axis,splitSizes:r})},Yu=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Y("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Xu=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(a):i===0?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Ua=(e,t)=>{let r=e[0].dims,i=A.size(r),a=e[0].dataType,s=A.normalizeAxis(t.axis,r.length),o=new Array(t.numOutputs),u=M("input",a,r.length),d=new Array(t.numOutputs),p=[],f=[],h=0,g=[{type:12,data:i}];for(let b=0;b<t.numOutputs;b++){h+=t.splitSizes[b],d[b]=h;let $=r.slice();$[s]=t.splitSizes[b],f.push($),o[b]=K(`output${b}`,a,$.length),p.push({dims:f[b],dataType:e[0].dataType})}g.push({type:12,data:d},...Q(r,...f));let y=b=>`
  ${b.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(u,...o)}
  ${Yu(d.length)}
  ${Xu(o)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Y("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${u.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},Yc=(e,t)=>{Ku(e.inputs);let r=e.inputs.length===1?t:Zu(e.inputs,t);e.compute(Ua(e.inputs,r),{inputs:[0]})},Xc=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return he({axis:t,numOutputs:i,splitSizes:r})}}),Qu,Ji,Jc,ef=q(()=>{te(),ne(),xe(),oe(),Qu=(e,t)=>{let[r,i,a,s]=e,{numHeads:o,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!A.areEqual(i.dims,[])&&!A.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!A.areEqual(a.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&o===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],p=r.dims[r.dims.length-2],f=a.dims[0],h=A.sizeFromDimension(r.dims,1)/p,g=u===0?a.dims[1]*2:h/o;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(d!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(p!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(g/2!==a.dims[1]&&u/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(p>f)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Ji=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:s}=t,o=e[0].dims[0],u=A.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],p=u/d,f=e[2].dims[1],h=a===0?f*2:p/i,g=new Array(o,d,p/h,h-f),y=A.computeStrides(g),b=[{type:1,data:s},{type:12,data:g},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[u,p,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,h,d*h,1]}):[],...Q(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],$=T=>{let v=M("input",e[0].dataType,e[0].dims.length),w=M("position_ids",e[1].dataType,e[1].dims.length),k=M("cos_cache",e[2].dataType,e[2].dims.length),C=M("sin_cache",e[3].dataType,e[3].dims.length),S=K("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${T.declareVariables(v,w,k,C,S)}

        ${T.mainStart(Vt)}
          let half_rotary_emb_dim = uniforms.${k.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${w.broadcastedIndicesToOffset("bsnh.xy",K("",w.type.tensor,2))};
            let position_id =
                u32(${w.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${S.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${S.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${S.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:he({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(g)/Vt)},programUniforms:b})}},Jc=(e,t)=>{Qu(e.inputs,t),e.compute(Ji(e.inputs,t))}}),Ju,el,na,tl,tf,_g=q(()=>{xe(),te(),nn(),Zc(),Qc(),bt(),ef(),oe(),Ju=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],s=e[3],o=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,d=r.dims[0],p=r.dims[1],f=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],h=p,g=0,y=!i||i.dims.length===0,b=Math.floor(y?f/(t.numHeads+2*t.kvNumHeads):f/t.numHeads);y&&(f=b*t.numHeads);let $=s&&s.dims.length!==0,T=o&&o.dims.length!==0;if($&&s.dims.length===4&&s.dims[0]===d&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===b)throw new Error("BSNH pastKey/pastValue is not supported");if($&&T){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(o.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=s.dims[2]}else if($||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');h=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let w=0,k=!1,C=t.kvNumHeads?b*t.kvNumHeads:f;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(h!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=a.dims[2]}else{if(h!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=a.dims[1]*a.dims[3],k=!0}}let S=e.length>4?e[5]:void 0;if(S&&S.dims.length!==1&&S.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:d,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:f,vHiddenSize:C,headSize:b,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:w,scale:t.scale,broadcastResPosBias:!1,passPastInKv:k,qkvFormat:v}},el=he({perm:[0,2,1,3]}),na=(e,t,r)=>{let i=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute(Pe(i,el.perm),{inputs:[i],outputs:[-1]})[0]),i},tl=(e,t,r,i)=>{let a=7,s=["type","type"],o=[e*t],u=e*t,d=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],p=f=>{let h=M("seq_lens",r.dataType,r.dims),g=M("total_seq_lens",i.dataType,i.dims),y=K("pos_ids",a,o),b=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${f.registerUniforms(b).declareVariables(h,g,y)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${h.getByOffset("batch_idx")};
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:o,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:p}},tf=(e,t)=>{let r=Ju(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,f=r.kvNumHeads?r.kvNumHeads:r.numHeads,h=he({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,f*r.headSize,f*r.headSize]}),[g,y,b]=!a&&!s?e.compute(Ua([i],h),{inputs:[i],outputs:[-1,-1,-1]}):[i,a,s],$,T;if(t.doRotary){let C=e.compute(tl(r.batchSize,r.sequenceLength,d,p),{inputs:[d,p],outputs:[-1]})[0],S=e.inputs[7],z=e.inputs[8],E=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),R=[g,C,S,z],U=[-1];$=e.compute(Ji(R,E),{inputs:R,outputs:U})[0],R.splice(0,1,y);let V=he({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(Ji(R,V),{inputs:R,outputs:U})[0]}let v=ci(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?$:g,void 0,0),w=na(e,t.doRotary?T:y,r),k=na(e,b,r);wi(e,v,w,k,void 0,void 0,o,u,void 0,r,d,p)}}),sa,il,rl,rf,bg=q(()=>{te(),ne(),bt(),oe(),sa=(e,t,r,i,a,s,o,u)=>{let d=ve(s),p=d===1?"f32":`vec${d}f`,f=d===1?"vec2f":`mat2x${d}f`,h=a*o,g=64;h===1&&(g=256);let y=[a,o,s/d],b=[a,o,2],$=["rank","type","type"],T=[];T.push(...Q(y,b));let v=w=>{let k=M("x",t.dataType,3,d),C=M("scale",r.dataType,r.dims),S=M("bias",i.dataType,i.dims),z=K("output",1,3,2),E=[k,C,S,z];return`
  var<workgroup> workgroup_shared : array<${f}, ${g}>;
  const workgroup_size = ${g}u;
  ${w.declareVariables(...E)}
  ${w.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${k.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${f}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${_t("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${_t("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${u};${g}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:b,dataType:1}],dispatchGroup:{x:h},programUniforms:T}),getShaderSource:v},{inputs:[t,r,i],outputs:[-1]})[0]},il=(e,t,r)=>{let i=t[0].dims,a=i,s=2,o=i[0],u=i[1],d=A.sizeFromDimension(i,s),p=ve(d),f=A.size(a)/p,h=sa(e,t[0],t[1],t[2],o,d,u,r.epsilon),g=[o,u,d/p],y=[o,u],b=["type","none"],$=T=>{let v=M("x",t[0].dataType,g.length,p),w=M("scale_shift",1,y.length,2),k=K("output",t[0].dataType,g.length,p),C=[v,w,k];return`
  ${T.registerUniform("output_size","u32").declareVariables(...C)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${k.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${w.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${k.type.value}(scale_shift.x) + ${k.type.value}(scale_shift.y);
      ${k.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...Q(g,y,g)]}),getShaderSource:$},{inputs:[t[0],h]})},rl=(e,t,r)=>{let i=t[0].dims,a=i,s=i[0],o=i[i.length-1],u=A.sizeFromDimension(i,1)/o,d=ve(o),p=A.size(a)/d,f=[{type:12,data:u},{type:12,data:Math.floor(o/d)}],h=["type","type"],g=!1,y=[0,i.length-1];for(let v=0;v<i.length-2;v++)g=g||i[v+1]!==1,y.push(v+1);g=g&&i[i.length-1]!==1;let b=g?e.compute(Pe(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(v,w)=>i[y[w]])),$=sa(e,b,t[1],t[2],s,u,o,r.epsilon),T=v=>{let w=Se(t[0].dataType),k=d===1?"vec2f":`mat${d}x2f`,C=E=>{let R=E===0?"x":"y",U=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${w}(${U}(scale.${R}))`;case 2:return`vec2<${w}>(${U}(scale[0].${R}, scale[1].${R}))`;case 4:return`vec4<${w}>(${U}(scale[0].${R}, scale[1].${R}, scale[2].${R}, scale[3].${R}))`;default:throw new Error(`Not supported compoents ${d}`)}},S=M("input",t[0].dataType,t[0].dims,d),z=K("output",t[0].dataType,a,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${S.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${k}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${z.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${C(0)}, ${C(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:T},{inputs:[t[0],$]})},rf=(e,t)=>{t.format==="NHWC"?rl(e,e.inputs,t):il(e,e.inputs,t)}}),al,nl,af,wg=q(()=>{te(),ne(),oe(),al=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},nl=(e,t,r)=>{let i=t.simplified,a=e[0].dims,s=e[1],o=!i&&e[2],u=a,d=A.normalizeAxis(t.axis,a.length),p=A.sizeToDimension(a,d),f=A.sizeFromDimension(a,d),h=A.size(s.dims),g=o?A.size(o.dims):0;if(h!==f||o&&g!==f)throw new Error(`Size of X.shape()[axis:] == ${f}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${g}`);let y=[];for(let S=0;S<a.length;++S)S<d?y.push(a[S]):y.push(1);let b=ve(f),$=["type","type"],T=[{type:12,data:p},{type:1,data:f},{type:12,data:Math.floor(f/b)},{type:1,data:t.epsilon}];o&&$.push("type");let v=r>1,w=r>2,k=S=>{let z=Se(e[0].dataType),E=[M("x",e[0].dataType,e[0].dims,b),M("scale",s.dataType,s.dims,b)];o&&E.push(M("bias",o.dataType,o.dims,b)),E.push(K("output",e[0].dataType,u,b)),v&&E.push(K("mean_data_output",1,y)),w&&E.push(K("inv_std_output",1,y));let R=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${S.registerUniforms(R).declareVariables(...E)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${za("f32",b)};
    var mean_square_vector = ${za("f32",b)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Lt(z,b,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${_t("mean_vector",b)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${_t("mean_square_vector",b)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Lt(z,b,"x[j + offset]")};
      let f32scale = ${Lt(z,b,"scale[j]")};
      output[j + offset] = ${E[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${Lt(z,b,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${w?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},C=[{dims:u,dataType:e[0].dataType}];return v&&C.push({dims:y,dataType:1}),w&&C.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${b};${r};${i}`,inputDependencies:$},getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:T}),getShaderSource:k}},af=(e,t)=>{al(e.inputs),e.compute(nl(e.inputs,t,e.outputCount))}}),sl,nf,$g=q(()=>{ne(),dn(),pn(),sl=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},nf=e=>{sl(e.inputs);let t=Wt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(ln(e.inputs,{activation:""},t));else{let a=t[t.length-2],s=A.size(e.inputs[0].dims.slice(0,-2)),o=A.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&a===1&&o===1){let u=e.inputs[0].reshape([1,s,i]),d=e.inputs[1].reshape([1,i,r]),p=[1,s,r],f=[u,d];e.compute(Qi(f,{activation:""},t,p),{inputs:f})}else e.compute(Qi(e.inputs,{activation:""},t))}}}),ol,ul,ll,sf,of,vg=q(()=>{te(),ne(),xe(),oe(),ol=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,o=e[1];if(!A.areEqual(o.dims,[t.n,a,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(A.size(u)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let d=e[3].dims,p=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(A.size(d)!==p)throw new Error("zeroPoints input size error.")}},ul=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],s=t.k,o=t.n,u=r.slice(0,i-2),d=A.size(u),p=e[1].dims[2]/4,f=e[0].dataType,h=ve(t.k),g=ve(p),y=ve(o),b=u.concat([a,o]),$=a>1&&o/y%2===0?2:1,T=A.size(b)/y/$,v=64,w=[],k=[d,a,s/h],C=A.convertShape(e[1].dims).slice();C.splice(-1,1,p/g),w.push(...Q(k)),w.push(...Q(C)),w.push(...Q(e[2].dims)),e.length===4&&w.push(...Q(A.convertShape(e[3].dims)));let S=[d,a,o/y];w.push(...Q(S));let z=E=>{let R=k.length,U=M("a",e[0].dataType,R,h),V=M("b",12,C.length,g),Z=M("scales",e[2].dataType,e[2].dims.length),X=[U,V,Z],re=e.length===4?M("zero_points",12,e[3].dims.length):void 0;re&&X.push(re);let G=S.length,se=K("output",e[0].dataType,G,y),J=Se(e[0].dataType),H=(()=>{switch(h){case 1:return`array<${J}, 8>`;case 2:return`mat4x2<${J}>`;case 4:return`mat2x4<${J}>`;default:throw new Error(`${h}-component is not supported.`)}})(),ae=()=>{let P=`
          // reuse a data
            var input_offset = ${U.indicesToOffset(`${U.type.indices}(batch, row, word_offset)`)};
            var a_data: ${H};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${U.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let W=0;W<y*$;W++)P+=`
            b_value = ${g===1?`b${W}_data`:`b${W}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${H}(${Array.from({length:4},(ie,pe)=>`${J}(b_value_lower[${pe}]), ${J}(b_value_upper[${pe}])`).join(", ")});
            b_dequantized_values = ${h===1?`${H}(${Array.from({length:8},(ie,pe)=>`(b_quantized_values[${pe}] - ${re?`zero_point${W}`:"zero_point"}) * scale${W}`).join(", ")});`:`(b_quantized_values - ${H}(${Array(8).fill(`${re?`zero_point${W}`:"zero_point"}`).join(",")})) * scale${W};`};
            workgroup_shared[local_id.x * ${$} + ${Math.floor(W/y)}]${y>1?`[${W%y}]`:""} += ${Array.from({length:8/h},(ie,pe)=>`${h===1?`a_data[${pe}] * b_dequantized_values[${pe}]`:`dot(a_data[${pe}], b_dequantized_values[${pe}])`}`).join(" + ")};
          `;return P},j=()=>{let P=`
            var col_index = col * ${y};
            ${re?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${J}(8);`}
            `;for(let W=0;W<y*$;W++)P+=`
            let scale${W} = ${Z.getByOffset("col_index * nBlocksPerCol + block")};
            ${re?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${re.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${W} = ${J}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return P},ge=()=>{let P=`col_index = col * ${y};`;for(let W=0;W<y*$;W++)P+=`
            let b${W}_data = ${V.getByIndices(`${V.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return P+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${H};
            var b_dequantized_values: ${H};`,P};return`
        var<workgroup> workgroup_shared: array<${se.type.value}, ${$*v}>;
        ${E.declareVariables(...X,se)}
        ${E.mainStart([v,1,1])}
          let output_indices = ${se.offsetToIndices(`(global_idx / ${v}) * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${j()}
            for (var word: u32 = 0; word < ${p}; word += ${g}) {
              ${ge()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${ae()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${$}) {
            var output_value: ${se.type.value} = ${se.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${$};
            }
            ${se.setByIndices(`${se.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${g};${y};${$};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:f}],dispatchGroup:{x:T},programUniforms:w}),getShaderSource:z}},ll=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],s=t.k,o=t.n,u=r.slice(0,i-2),d=A.size(u),p=e[1].dims[2]/4,f=e[0].dataType,h=ve(t.k),g=ve(p),y=u.concat([a,o]),b=128,$=o%8===0?8:o%4===0?4:1,T=b/$,v=T*g*8,w=v/h,k=v/t.blockSize,C=A.size(y)/$,S=[],z=[d,a,s/h],E=A.convertShape(e[1].dims).slice();E.splice(-1,1,p/g),S.push(...Q(z)),S.push(...Q(E)),S.push(...Q(e[2].dims)),e.length===4&&S.push(...Q(A.convertShape(e[3].dims)));let R=[d,a,o];S.push(...Q(R));let U=V=>{let Z=z.length,X=M("a",e[0].dataType,Z,h),re=M("b",12,E.length,g),G=M("scales",e[2].dataType,e[2].dims.length),se=[X,re,G],J=e.length===4?M("zero_points",12,e[3].dims.length):void 0;J&&se.push(J);let H=R.length,ae=K("output",e[0].dataType,H),j=Se(e[0].dataType),ge=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${j}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${j}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${j}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${j}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${X.type.value}, ${w}>;
        var<workgroup> inter_results: array<array<${ae.type.value}, ${T}>, ${$}>;
        ${V.declareVariables(...se,ae)}
        ${V.mainStart([T,$,1])}
          let output_indices = ${ae.offsetToIndices(`workgroup_index * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${k} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${w};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${w}; a_offset += ${b})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${X.getByIndices(`${X.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${X.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${k} + local_id.x;
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
            let scale = ${G.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${re.getByIndices(`${re.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${ge()}
              let b_value = ${g===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${j}>(${Array.from({length:4},(P,W)=>`${j}(b_value_lower[${W}]), ${j}(b_value_upper[${W}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${j}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(P,W)=>`${`dot(a_data${W}, b_dequantized_values[${W}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${$}) {
            var output_value: ${ae.type.value} = ${ae.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ae.setByIndices(`${ae.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${g};${T};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:f}],dispatchGroup:{x:C},programUniforms:S}),getShaderSource:U}},sf=(e,t)=>{ol(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(ll(e.inputs,t)):e.compute(ul(e.inputs,t))},of=e=>he(e)}),dl,pl,cl,fl,hl,ml,gl,yl,uf,xg=q(()=>{te(),ne(),oe(),dl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},pl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
            k = i32(${e.indicesGet("indices",a)}) - ${Y("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Y("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${Y("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},cl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Y("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Y("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Y("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Y("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},fl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Y("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Y("uniforms.x_shape",a,t)})) {
                  k = i32(${Y("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${Y("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},hl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Y("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${Y("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${Y("uniforms.x_shape",a,t)})) {
                  k -= i32(${Y("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${Y("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},ml=(e,t,r)=>{switch(r.mode){case 0:return pl(e,t,r.pads.length);case 1:return cl(e,t,r.pads.length);case 2:return fl(e,t,r.pads.length);case 3:return hl(e,t,r.pads.length);default:throw new Error("Invalid mode")}},gl=(e,t)=>{let r=A.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,a=A.size(r),s=[{type:12,data:a},{type:6,data:t.pads}],o=e.length>=3&&e[2].data;t.mode===0&&s.push({type:o?e[2].dataType:1,data:t.value}),s.push(...Q(e[0].dims,r));let u=["rank"],d=p=>{let f=K("output",e[0].dataType,r.length),h=M("x",e[0].dataType,i.length),g=h.type.value,y=ml(f,i.length,t),b=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&b.push({name:"constant_value",type:o?g:"f32"}),`
            ${p.registerUniforms(b).declareVariables(h,f)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${f.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${o}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(r)/64)},programUniforms:s}),getShaderSource:d}},yl=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,s=new Int32Array(2*a).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let d=0;d<u.length;d++)s[Number(u[d])]=Number(r[d]),s[Number(u[d])+a]=Number(r[d+u.length])}else r.forEach((u,d)=>s[Number(d)]=Number(u));let o=[];return s.forEach(u=>o.push(u)),{mode:t.mode,value:i,pads:o}}else return t},uf=(e,t)=>{dl(e.inputs);let r=yl(e.inputs,t);e.compute(gl(e.inputs,r),{inputs:[0]})}}),ni,oa,ua,la,da,_l,bl,pa,ca,lf,df,fa,pf,cf,ha,ff,hf,mf,gf,Cg=q(()=>{Le(),te(),ne(),oe(),ni=e=>{if(_e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},oa=(e,t,r)=>{let i=t.format==="NHWC",a=e.dims.slice();i&&a.splice(1,0,a.pop());let s=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),u=t.strides.slice(),d=s?t.dilations.slice():[],p=t.pads.slice();Yi.adjustPoolAttributes(r,a,o,u,d,p);let f=Yi.computePoolOutputShape(r,a,u,d,o,p,t.autoPad),h=Object.assign({},t);s?Object.assign(h,{kernelShape:o,strides:u,pads:p,dilations:d,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:o,strides:u,pads:p,cacheKey:t.cacheKey});let g=f.slice();return g.push(g.splice(1,1)[0]),[h,i?g:f]},ua=(e,t)=>{let r=t.format==="NHWC",i=A.size(e),a=A.size(t.kernelShape),s=[{type:12,data:i},{type:12,data:a}],o=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],f=t.pads[t.pads.length-1],h=!!(p+f);s.push({type:12,data:u},{type:12,data:d},{type:12,data:p},{type:12,data:f}),o.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],b=t.strides[t.strides.length-2],$=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];g=!!($+T),s.push({type:12,data:y},{type:12,data:b},{type:12,data:$},{type:12,data:T}),o.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,o,!0,h,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=A.computeStrides(t.kernelShape);s.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((p,f)=>p+f);return[s,o,!!d,!1,!1]}},la=(e,t,r,i,a,s,o,u,d,p,f,h)=>{let g=a.format==="NHWC",y=t.type.value,b=K("output",t.type.tensor,i);if(a.kernelShape.length<=2){let $="",T="",v="",w=r-(g?2:1);if(f?$=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${w}] < 0 || xIndices[${w}]
                      >= uniforms.x_shape[${w}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:$=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,a.kernelShape.length===2){let k=r-(g?3:2);h?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${k}] < 0 || xIndices[${k}] >= uniforms.x_shape[${k}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var value = ${y}(${u});
              var pad = 0;
              ${T}
              ${$}
              ${v}
              ${o}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let $=a.kernelShape.length,T=a.pads.length,v="";return p?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(d).declareVariables(t,b)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${b.offsetToIndices("global_idx")};
              var xIndices = ${b.offsetToIndices("global_idx")};

              var offsets: array<u32, ${$}>;

              var value = ${y}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${$-1}u; j++) {
                  offsets[j] = offset / ${Y("uniforms.kernelStrides","j",$)};
                  offset -= offsets[j] * ${Y("uniforms.kernelStrides","j",$)};
                }
                offsets[${$-1}] = offset;

                isPad = false;
                for (var j = ${r-$}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Y("uniforms.strides",`j - ${r-$}u`,$)}
                    + offsets[j - ${r-$}u] - ${Y("uniforms.pads","j - 2u",T)};
                  ${v}
              }
              ${o}

              output[global_idx] = value;
            }`}},da=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,_l=e=>`${da(e)};${e.countIncludePad}`,bl=e=>`${da(e)};${e.storageOrder};${e.dilations}`,pa=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ca=(e,t,r,i)=>{let[a,s]=oa(t,i,r),o=M("x",t.dataType,t.dims.length),u=o.type.value,d="value += x_val;",p="";a.countIncludePad?p+=`value /= ${u}(uniforms.kernelSize);`:p+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[f,h,g,y,b]=ua(s,a);f.push(...Q(t.dims,s));let $=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${g};${y};${b}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(s)/64)},programUniforms:f}),getShaderSource:T=>la(T,o,t.dims.length,s.length,a,d,p,0,h,g,y,b)}},lf=e=>{let t=e.count_include_pad!==0,r=pa(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:_l(i)}},df=(e,t)=>{ni(e.inputs),e.compute(ca("AveragePool",e.inputs[0],!1,t))},fa={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},pf=e=>{let t=e.format;return{format:t,...fa,cacheKey:t}},cf=(e,t)=>{ni(e.inputs),e.compute(ca("GlobalAveragePool",e.inputs[0],!0,t))},ha=(e,t,r,i)=>{let[a,s]=oa(t,i,r),o=`
      value = max(x_val, value);
    `,u="",d=M("x",t.dataType,t.dims.length),p=["rank"],[f,h,g,y,b]=ua(s,a);return f.push(...Q(t.dims,s)),{name:e,shaderCache:{hint:`${i.cacheKey};${g};${y};${b}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(s)/64)},programUniforms:f}),getShaderSource:$=>la($,d,t.dims.length,s.length,a,o,u,t.dataType===10?-65504:-1e5,h,g,y,b)}},ff=(e,t)=>{ni(e.inputs),e.compute(ha("MaxPool",e.inputs[0],!1,t))},hf=e=>{let t=e.storage_order,r=e.dilations,i=pa(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:r,...i,cacheKey:""};return{...a,cacheKey:bl(a)}},mf=e=>{let t=e.format;return{format:t,...fa,cacheKey:t}},gf=(e,t)=>{ni(e.inputs),e.compute(ha("GlobalMaxPool",e.inputs[0],!0,t))}}),wl,$l,yf,_f,Tg=q(()=>{te(),ne(),xe(),oe(),wl=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,s)=>s===t.axis||a===e[0].dims[s]).reduce((a,s)=>a&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},$l=(e,t)=>{let r=A.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,a=i===3,s=e[0].dims,o=e[1].dataType,u=A.size(s),d=i===3||i===2,p=d?[Math.ceil(A.size(e[0].dims)/4)]:e[0].dims,f=e[1].dims,h=e.length>2?e[2]:void 0,g=h?d?[Math.ceil(A.size(h.dims)/4)]:h.dims:void 0,y=f.length===0||f.length===1&&f[0]===1,b=y===!1&&f.length===1,$=ve(u),T=y&&(!d||$===4),v=T?$:1,w=T&&!d?$:1,k=M("input",d?12:i,p.length,w),C=M("scale",o,f.length),S=h?M("zero_point",d?12:i,g.length):void 0,z=K("output",o,s.length,v),E=[k,C];S&&E.push(S);let R=[p,f];h&&R.push(g);let U=[{type:12,data:u/v},{type:12,data:r},{type:12,data:t.blockSize},...Q(...R,s)],V=Z=>{let X=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Z.registerUniforms(X).declareVariables(...E,z)}
      ${Z.mainStart()}
          ${Z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${z.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${k.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${k.getByOffset("global_idx")};`};

          // Set scale input
          ${y?`let scale_value= ${C.getByOffset("0")}`:b?`
            let scale_index = ${z.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${C.getByOffset("scale_index")};`:`
            var scale_indices: ${C.type.indices} = output_indices;
            let index = ${C.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${C.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${C.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${S?y?d?`
                let zero_point_input = ${S.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${S.getByOffset("0")}`:b?d?`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${S.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${S.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${C.indicesToOffset("scale_indices")};
                let zero_point_input = ${S.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${S.getByIndices("scale_indices")};`:`let zero_point_value = ${d?a?"i32":"u32":k.type.value}(0);`};
      // Compute and write output
      ${z.setByOffset("global_idx",`${z.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:S?["rank","rank","rank"]:["rank","rank"]},getShaderSource:V,getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(u/v/64),y:1,z:1},programUniforms:U})}},yf=(e,t)=>{wl(e.inputs,t),e.compute($l(e.inputs,t))},_f=e=>he({axis:e.axis,blockSize:e.blockSize})}),vl,xl,bf,kg=q(()=>{Le(),te(),oe(),vl=(e,t,r)=>{let i=e===t,a=e<t&&r<0,s=e>t&&r>0;if(i||a||s)throw new Error("Range these inputs' contents are invalid.")},xl=(e,t,r,i)=>{let a=Math.abs(Math.ceil((t-e)/r)),s=[a],o=a,u=[{type:12,data:o},{type:i,data:e},{type:i,data:r},...Q(s)],d=p=>{let f=K("output",i,s.length),h=f.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${p.registerUniforms(g).declareVariables(f)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u})}},bf=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),_e.webgpu.validateInputContent&&vl(t,r,i),e.compute(xl(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),Cl,Tl,wf,$f,Sg=q(()=>{te(),ne(),xe(),oe(),Cl=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
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
                ${a}max(bitcast<f32>(oldValue), (${r}))${s}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${s}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${s}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Tl=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r,s=1,o=Math.ceil(A.sizeToDimension(i,i.length-1)/s),u=i[i.length-1],d=A.sizeFromDimension(r,u),p=[{type:12,data:o},{type:12,data:u},{type:12,data:d},...Q(e[1].dims,e[2].dims,a)],f=h=>{let g=M("indices",e[1].dataType,e[1].dims.length),y=M("updates",e[2].dataType,e[2].dims.length,s),b=t.reduction!=="none"&&t.reduction!==""?Kd("output",e[0].dataType,a.length):K("output",e[0].dataType,a.length,s);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,y,b)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
    ${Cl(t.reduction,"output[data_offset + i]","value",b.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:f}},wf=e=>he({reduction:e.reduction}),$f=(e,t)=>{e.compute(Tl(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),kl,Sl,Il,ma,El,zl,Al,Ol,Rl,Bl,Ml,Dl,ga,Nl,Pl,Ul,ql,Ll,vf,xf,Ig=q(()=>{te(),ne(),xe(),oe(),kl=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Sl=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((a,s)=>i[a]=e[s]),i},Il=(e,t,r,i,a,s)=>{let[o,u,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(f=>s.push(f));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(f=>i.push(f)),i.length!==0&&i.length!==p&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");kl(i,t),t.axes.length>0&&Sl(i,t.axes,p).forEach((f,h)=>i[h]=f)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(f=>a.push(Number(f))),a.length!==0&&a.length!==p&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof a<"u"&&i.length>0&&a.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},ma=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,El=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${ma("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${ma("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",zl=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Al=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?i:e.slice();return t.length>0?(t.forEach((s,o)=>{i[s]=a[o],i[o+r]=a[t.length+o]}),i):a},Ol=(e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(s=>a.push(s)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((s,o)=>a[s]=r[o])}else r.forEach(s=>a.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((s,o)=>Math.round(s*t[o]))}return a},Rl=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(s=>t[s]=i),r.axes.forEach(s=>a[s]=Math.round(e[s]*t[s]))):(t.fill(i,0,t.length),a.forEach((s,o)=>a[o]=Math.round(s*t[o]))),a},Bl=(e,t,r,i,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${Y("uniforms.scales","i",i)};
        var roi_low = ${Y("uniforms.roi","i",a)};
        var roi_hi = ${Y("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Y("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Ml=(e,t,r,i,a,s,o)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Y("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Y("uniforms.roi","i",s)};
          var roi_hi = ${Y("uniforms.roi",`i + ${r.length}`,s)};
          var input_shape_i = ${Y("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${o} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,Dl=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Y("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ga=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Nl=(e,t,r,i,a)=>{let[s,o,u,d]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(row, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${ga(e,d,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${o}];
      var col:${p} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[o]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[o]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Pl=(e,t,r,i,a,s,o,u,d,p)=>{let f=r.length===2,[h,g]=f?[0,1]:[2,3],y=e.type.value,b=$=>{let T=$===h?"row":"col";return`
      fn ${T}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",$)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[$]},
        ${i[$]}, ${r[$]}, ${s[$]}, ${s[$]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[$]} - 1))) {
          return ${d};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${T}: ${y} = originalIdx + ${y}(i);
          if (${T} < 0 || ${T} >= ${r[$]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${d};`:`${T} = max(0, min(${T}, ${r[$]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",$,`u32(${T})`)};
          data[i + 1] = ${$===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${b(h)};
    ${b(g)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
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
    `},Ul=(e,t,r,i,a)=>{let[s,o,u,d,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(depth, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${r[d]} - 1))`)};
      ${ga(e,p,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${f} = originalIndices[${o}];
      var height:${f} = originalIndices[${u}];
      var width:${f} = originalIndices[${d}];
      ${i?`if (depth < 0 || depth > (${r[o]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[d]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[o]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${f} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${f} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${f} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${f} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${f} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${f} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${f} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${f} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${f} = abs(depth - ${f}(depth1));
      var dx2: ${f} = abs(${f}(depth2) - depth);
      var dy1: ${f} = abs(height - ${f}(height1));
      var dy2: ${f} = abs(${f}(height2) - height);
      var dz1: ${f} = abs(width - ${f}(width1));
      var dz2: ${f} = abs(${f}(width2) - width);
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
    }`},ql=(e,t,r,i,a,s)=>{let o=e.dims,u=Al(s,t.axes,o.length),d=Ol(o,i,a,t.axes),p=i.slice();i.length===0&&(p=o.map((w,k)=>w===0?1:d[k]/w),t.keepAspectRatioPolicy!=="stretch"&&(d=Rl(o,p,t)));let f=K("output",e.dataType,d.length),h=M("input",e.dataType,o.length),g=A.size(d),y=o.length===d.length&&o.every((w,k)=>w===d[k]),b=t.coordinateTransformMode==="tf_crop_and_resize",$=t.extrapolationValue,T=h.type.value,v=w=>`
      ${y?"":`
      ${El(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Dl(h,o)};
              ${zl(t.nearestMode,r,T)};
              ${Ml(h,f,o,d,p.length,u.length,b)};
              `;case"linear":return`
              ${Bl(f,o,d,p.length,u.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${Nl(h,f,o,b,$)}`;if(o.length===3||o.length===5)return`${Ul(h,f,o,b,$)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(o.length===2||o.length===4)return`${Pl(h,f,o,d,p,u,t.cubicCoeffA,b,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${w.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",u.length).declareVariables(h,f)}
      ${w.mainStart()}
        ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${y?"output[global_idx] = input[global_idx];":`
        let output_indices = ${f.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${o.length===2||o.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${a.length>0?a:""}|${u.length>0?u:""}|${y}|${t.mode==="nearest"?o.length:o}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:p},{type:1,data:u},...Q(o,d)]})}},Ll=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},vf=(e,t)=>{let r=[],i=[],a=[],s=Ll(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Il(e.inputs,t,s,r,i,a),e.compute(ql(e.inputs[0],t,s,r,i,a),{inputs:[0]})},xf=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,s=e.excludeOutside!==0,o=e.extrapolationValue,u=e.keepAspectRatioPolicy,d=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return he({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:s,extrapolationValue:o,keepAspectRatioPolicy:u,mode:d,nearestMode:p})}}),Wl,Vl,Cf,Eg=q(()=>{te(),ne(),oe(),Wl=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let o=e[3];if(o.dims.length!==1)throw new Error("Beta must be 1D");if(o.dims[o.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let o=e[4];if(o.dims.length!==1)throw new Error("Bias must be 1D");if(o.dims[o.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},Vl=(e,t,r,i)=>{let a=t.simplified,s=e[0].dims,o=A.size(s),u=s,d=o,p=s.slice(-1)[0],f=i?s.slice(0,-1).concat(1):[],h=!a&&e.length>3,g=e.length>4,y=i&&r>1,b=i&&r>2,$=r>3,T=64,v=ve(p),w=[{type:12,data:d},{type:12,data:v},{type:12,data:p},{type:1,data:t.epsilon}],k=S=>{let z=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],E=[M("x",e[0].dataType,e[0].dims,v),M("skip",e[1].dataType,e[1].dims,v),M("gamma",e[2].dataType,e[2].dims,v)];h&&E.push(M("beta",e[3].dataType,e[3].dims,v)),g&&E.push(M("bias",e[4].dataType,e[4].dims,v)),E.push(K("output",e[0].dataType,u,v)),y&&E.push(K("mean_output",1,f)),b&&E.push(K("inv_std_output",1,f)),$&&E.push(K("input_skip_bias_sum",e[0].dataType,u,v));let R=Se(e[0].dataType),U=Se(1,v);return`

      ${S.registerUniforms(z).declareVariables(...E)}
      var<workgroup> sum_shared : array<${U}, ${T}>;
      var<workgroup> sum_squared_shared : array<${U}, ${T}>;

      ${S.mainStart([T,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${T};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${T};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${T-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":R+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${$?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Lt(R,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${T};
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
        let mean = ${_t("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${_t("square_sum",v)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${b?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${R}(mean)`}) *
            ${R}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},C=[{dims:u,dataType:e[0].dataType}];return r>1&&C.push({dims:f,dataType:1}),r>2&&C.push({dims:f,dataType:1}),r>3&&C.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${y};${b};${$}`,inputDependencies:e.map((S,z)=>"type")},getShaderSource:k,getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(d/p)},programUniforms:w})}},Cf=(e,t)=>{Wl(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Vl(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Gl,si,jl,ya,Hl,Fl,Tf,kf,zg=q(()=>{te(),ne(),xe(),oe(),Gl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},si=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},jl=(e,t)=>{if(e.length>1){let r=si(e,1),i=si(e,2),a=si(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),he({starts:r,ends:i,axes:a})}else return t},ya=(e,t,r,i,a)=>{let s=e;return e<0&&(s+=r[i[t]]),a[t]<0?Math.max(0,Math.min(s,r[i[t]]-1)):Math.max(0,Math.min(s,r[i[t]]))},Hl=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${Y("uniforms.input_shape","i",r.length)};
            let steps_i = ${Y("uniforms.steps","i",r.length)};
            let signs_i = ${Y("uniforms.signs","i",r.length)};
            let starts_i = ${Y("uniforms.starts","i",r.length)};
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
      }`,Fl=(e,t)=>{let r=e[0].dims,i=A.size(r),a=t.axes.length>0?A.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],s=si(e,4);s.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(a.length).fill(1));let o=t.starts.map((v,w)=>ya(v,w,r,a,s)),u=t.ends.map((v,w)=>ya(v,w,r,a,s));if(a.length!==o.length||a.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let v=0;v<r.length;++v)a.includes(v)||(o.splice(v,0,0),u.splice(v,0,r[v]),s.splice(v,0,1));let d=s.map(v=>Math.sign(v));s.forEach((v,w,k)=>{if(v<0){let C=(u[w]-o[w])/v,S=o[w],z=S+C*s[w];o[w]=z,u[w]=S,k[w]=-v}});let p=r.slice(0);a.forEach((v,w)=>{p[v]=Math.ceil((u[v]-o[v])/s[v])});let f={dims:p,dataType:e[0].dataType},h=K("output",e[0].dataType,p.length),g=M("input",e[0].dataType,e[0].dims.length),y=A.size(p),b=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:s.length}],$=[{type:12,data:y},{type:12,data:o},{type:6,data:d},{type:12,data:s},...Q(e[0].dims,p)],T=v=>`
      ${v.registerUniforms(b).declareVariables(g,h)}
        ${Hl(g,h,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${o.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[f],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:$})}},Tf=(e,t)=>{Gl(e.inputs,t);let r=jl(e.inputs,t);e.compute(Fl(e.inputs,r),{inputs:[0]})},kf=e=>{let t=e.starts,r=e.ends,i=e.axes;return he({starts:t,ends:r,axes:i})}}),Kl,Zl,Sf,If,Ag=q(()=>{te(),ne(),xe(),bt(),oe(),Kl=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Zl=(e,t)=>{let r=e.inputs[0],i=r.dims,a=A.size(i),s=i.length,o=A.normalizeAxis(t.axis,s),u=o<i.length-1,d,p=[];u?(p=Array.from({length:s},(E,R)=>R),p[o]=s-1,p[s-1]=o,d=e.compute(Pe(r,p),{inputs:[r],outputs:[-1]})[0]):d=r;let f=d.dims,h=f[s-1],g=a/h,y=ve(h),b=h/y,$=64;g===1&&($=256);let T=(E,R)=>R===4?`max(max(${E}.x, ${E}.y), max(${E}.z, ${E}.w))`:R===2?`max(${E}.x, ${E}.y)`:R===3?`max(max(${E}.x, ${E}.y), ${E}.z)`:E,v=M("x",d.dataType,d.dims,y),w=K("result",d.dataType,d.dims,y),k=v.type.value,C=Se(d.dataType)==="f32"?`var threadMax = ${k}(-3.402823e+38f);`:`var threadMax = ${k}(-65504.0h);`,S=E=>`
      var<workgroup> rowMaxShared : ${k};
      var<workgroup> rowSumShared : ${k};
      var<workgroup> threadShared : array<${k}, ${$}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${k} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${k}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${E.registerUniform("packedCols","i32").declareVariables(v,w)}
      ${E.mainStart($)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${$};
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
          rowMaxShared = ${k}(${T("threadShared[0]",y)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${k}(0.0);
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
          rowSumShared = ${k}(${_t("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${k}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,z=e.compute({name:"Softmax",shaderCache:{hint:`${y};${$}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:f,dataType:d.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:b}]}),getShaderSource:S},{inputs:[d],outputs:[u?-1:0]})[0];u&&e.compute(Pe(z,p),{inputs:[z]})},Sf=(e,t)=>{Kl(e.inputs),Zl(e,t)},If=e=>he({axis:e.axis})}),_a,Yl,Xl,Ql,Ef,Og=q(()=>{te(),ne(),oe(),_a=e=>Array.from(e.getBigInt64Array(),Number),Yl=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(_a(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Xl=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Ql=(e,t)=>{let r=e[0].dims,i=t??_a(e[1]),a=Xl(r,i),s=A.size(a),o=e[0].dataType,u=M("input",o,r.length),d=K("output",o,a.length),p=f=>`
      const inputShape = ${u.indices(...r)};
      ${f.registerUniform("output_size","u32").declareVariables(u,d)}
      ${f.mainStart()}
      ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...Q(e[0].dims,a)]}),getShaderSource:p}},Ef=e=>{Yl(e.inputs),e.compute(Ql(e.inputs),{inputs:[0]})}}),Jl,ed,zf,Rg=q(()=>{te(),ne(),oe(),Jl=(e,t,r,i,a)=>{let s=K("output_data",a,r.length,4),o=M("a_data",t[1].dataType,t[1].dims.length,4),u=M("b_data",t[2].dataType,t[2].dims.length,4),d=M("c_data",t[0].dataType,t[0].dims.length,4),p,f=(h,g,y)=>`select(${g}, ${h}, ${y})`;if(!i)p=s.setByOffset("global_idx",f(o.getByOffset("global_idx"),u.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let h=(g,y,b="")=>{let $=`a_data[index_a${y}][component_a${y}]`,T=`b_data[index_b${y}][component_b${y}]`,v=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${s.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${o.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_b${y} = ${u.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_c${y} = ${d.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${g}[${y}] = ${b}(${f($,T,v)});
          `};a===9?p=`
            var data = vec4<u32>(0);
            ${h("data",0,"u32")}
            ${h("data",1,"u32")}
            ${h("data",2,"u32")}
            ${h("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${h("output_data[global_idx]",0)}
            ${h("output_data[global_idx]",1)}
            ${h("output_data[global_idx]",2)}
            ${h("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(d,o,u,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},ed=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,s=!(A.areEqual(t,r)&&A.areEqual(r,i)),o=t,u=A.size(t);if(s){let p=Wt.calcShape(Wt.calcShape(t,r,!1),i,!1);if(!p)throw new Error("Can't perform where op on the given tensors");o=p,u=A.size(o)}let d=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Jl(p,e,o,s,a),getRunData:()=>({outputs:[{dims:o,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:d},...Q(i,t,r,o)]})}},zf=e=>{e.compute(ed(e.inputs))}}),Af,Bg=q(()=>{Km(),nn(),Zm(),Ym(),Xm(),Qm(),Jm(),ag(),sg(),og(),ug(),lg(),dg(),pg(),cg(),fg(),hg(),mg(),gg(),yg(),_g(),bg(),wg(),$g(),vg(),Zc(),xg(),Cg(),Tg(),kg(),Sg(),an(),Ig(),ef(),Eg(),zg(),Ag(),Qc(),Og(),bt(),sn(),Rg(),Af=new Map([["Abs",[xp]],["Acos",[Cp]],["Acosh",[Tp]],["Add",[nc]],["ArgMax",[bp,Oa]],["ArgMin",[_p,Oa]],["Asin",[kp]],["Asinh",[Sp]],["Atan",[Ip]],["Atanh",[Ep]],["Attention",[wp]],["AveragePool",[df,lf]],["BatchNormalization",[$p]],["BiasAdd",[vp]],["BiasSplitGelu",[ac]],["Cast",[Ap,zp]],["Ceil",[Rp]],["Clip",[Op]],["Concat",[mc,gc]],["Conv",[Pa,Na]],["ConvTranspose",[kc,Tc]],["Cos",[Bp]],["Cosh",[Mp]],["CumSum",[Sc,Ic]],["DepthToSpace",[Ec,zc]],["DequantizeLinear",[yf,_f]],["Div",[sc]],["Einsum",[Ac,Oc]],["Elu",[Dp,pi]],["Equal",[oc]],["Erf",[Np]],["Exp",[Pp]],["Expand",[Rc]],["FastGelu",[Bc]],["Floor",[Up]],["FusedConv",[Pa,Na]],["Gather",[Dc,Mc]],["GatherElements",[Wc,Lc]],["GatherBlockQuantized",[Uc,qc]],["GatherND",[Nc,Pc]],["Gelu",[qp]],["Gemm",[Gc,Vc]],["GlobalAveragePool",[cf,pf]],["GlobalMaxPool",[gf,mf]],["Greater",[pc]],["GreaterOrEqual",[fc]],["GridSample",[jc,Hc]],["GroupQueryAttention",[tf]],["HardSigmoid",[Kp,Fp]],["InstanceNormalization",[rf]],["LayerNormalization",[af]],["LeakyRelu",[Lp,pi]],["Less",[cc]],["LessOrEqual",[hc]],["Log",[ic]],["MatMul",[nf]],["MatMulNBits",[sf,of]],["MaxPool",[ff,hf]],["Mul",[uc]],["MultiHeadAttention",[Kc,Fc]],["Neg",[Vp]],["Not",[Wp]],["Pad",[uf]],["Pow",[lc]],["QuickGelu",[rc,pi]],["Range",[bf]],["Reciprocal",[Gp]],["ReduceMin",[fp]],["ReduceMean",[up]],["ReduceMax",[cp]],["ReduceSum",[mp]],["ReduceProd",[hp]],["ReduceL1",[lp]],["ReduceL2",[dp]],["ReduceLogSum",[yp]],["ReduceLogSumExp",[pp]],["ReduceSumSquare",[gp]],["Relu",[jp]],["Resize",[vf,xf]],["RotaryEmbedding",[Jc]],["ScatterND",[$f,wf]],["Sigmoid",[Hp]],["Sin",[Zp]],["Sinh",[Yp]],["Slice",[Tf,kf]],["SkipLayerNormalization",[Cf]],["Split",[Yc,Xc]],["Sqrt",[Xp]],["Softmax",[Sf,If]],["Sub",[dc]],["Tan",[Qp]],["Tanh",[Jp]],["ThresholdedRelu",[tc,pi]],["Tile",[Ef]],["Transpose",[Yd,Xd]],["Where",[zf]]])}),Of,Mg=q(()=>{Le(),lt(),oe(),Of=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){et(e.programInfo.name);let s=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let p of t)u.push({binding:u.length,resource:{buffer:p.buffer}});for(let p of r)u.push({binding:u.length,resource:{buffer:p.buffer}});a&&u.push({binding:u.length,resource:a});let d=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:d,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}o.setPipeline(e.computePipeline),o.setBindGroup(0,d),o.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ke(e.programInfo.name)}dispose(){}build(e,t){et(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{r.features.has(p.feature)&&i.push(`enable ${p.extension};`)});let a=Zd(t,this.backend.device.limits),s=e.getShaderSource(a),o=`${i.join(`
`)}
${a.additionalImplementations}
${s}`,u=r.createShaderModule({code:o,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${o}`);let d=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Ke(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let s=t*r*i,o=Math.ceil(Math.sqrt(s));if(o>a){if(o=Math.ceil(Math.cbrt(s)),o>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}else return[o,o,1]}}}),Rf={};Gt(Rf,{WebGpuBackend:()=>Bf});var td,id,rd,Bf,Dg=q(()=>{Le(),te(),lt(),Gd(),Hm(),Bg(),Mg(),td=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let s=e[i].dims.length;r.push(`${a};${s}`);break}case"dims":{let s=e[i].dims.join(",");r.push(`${a};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},id=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${td(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},rd=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Bf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=s=>t.features.has(s)&&r.push(s)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new rd(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Fd(this),this.programManager=new Of(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ja(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;et(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=r[i],s=a.kernelId,o=this.kernels.get(s),u=o.kernelType,d=o.kernelName,p=a.programName,f=a.inputTensorViews,h=a.outputTensorViews,g=t[i*2],y=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let b=Number(g-this.queryTimeBase),$=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(b)||!Number.isSafeInteger($))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:f.map(T=>({dims:T.dims,dataType:ut(T.dataType)})),outputsMetadata:h.map(T=>({dims:T.dims,dataType:ut(T.dataType)})),kernelId:s,kernelType:u,kernelName:d,programName:p,startTime:b,endTime:$});else{let T="";f.forEach((w,k)=>{T+=`input[${k}]: [${w.dims}] | ${ut(w.dataType)}, `});let v="";h.forEach((w,k)=>{v+=`output[${k}]: [${w.dims}] | ${ut(w.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${d}|${p}" ${T}${v}start time: ${b} ns, execution time: ${$-b} ns`)}Fi("GPU",`${p}::${g}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),Ke()}run(e,t,r,i,a,s){et(e.name);let o=[];for(let w=0;w<t.length;++w){let k=t[w].data;if(k===0)continue;let C=this.gpuDataManager.get(k);if(!C)throw new Error(`no GPU data for input: ${k}`);o.push(C)}let{outputs:u,dispatchGroup:d,programUniforms:p}=e.getRunData(t),f=r.length===0?u.map((w,k)=>k):r;if(f.length!==u.length)throw new Error(`Output size ${f.length} must be equal to ${u.length}.`);let h=[],g=[];for(let w=0;w<u.length;++w){if(!Number.isInteger(f[w])||f[w]<-3||f[w]>=s)throw new Error(`Invalid output index: ${f[w]}`);if(f[w]===-3)continue;let k=f[w]===-1,C=f[w]===-2,S=k||C?a(u[w].dataType,u[w].dims):i(f[w],u[w].dataType,u[w].dims);if(h.push(S),S.data===0)continue;let z=this.gpuDataManager.get(S.data);if(!z)throw new Error(`no GPU data for output: ${S.data}`);if(k&&this.temporaryData.push(z),C){let E=this.kernelPersistentData.get(this.currentKernelId);E||(E=[],this.kernelPersistentData.set(this.currentKernelId,E)),E.push(z)}g.push(z)}if(o.length!==t.length||g.length!==h.length){if(g.length===0)return Ke(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(p){let w=0,k=[];p.forEach(E=>{let R=typeof E.data=="number"?[E.data]:E.data;if(R.length===0)return;let U=E.type===10?2:4,V,Z;E.type===10?(Z=R.length>4?16:R.length>2?8:R.length*U,V=R.length>4?16:U*R.length):(Z=R.length<=2?R.length*U:16,V=16),w=Math.ceil(w/Z)*Z,k.push(w);let X=E.type===10?8:4;w+=R.length>4?Math.ceil(R.length/X)*V:R.length*U});let C=16;w=Math.ceil(w/C)*C;let S=new ArrayBuffer(w);p.forEach((E,R)=>{let U=k[R],V=typeof E.data=="number"?[E.data]:E.data;if(E.type===6)new Int32Array(S,U,V.length).set(V);else if(E.type===12)new Uint32Array(S,U,V.length).set(V);else if(E.type===10)new Uint16Array(S,U,V.length).set(V);else if(E.type===1)new Float32Array(S,U,V.length).set(V);else throw new Error(`Unsupported uniform type: ${ut(E.type)}`)});let z=this.gpuDataManager.create(w,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(z.buffer,0,S,0,w),this.gpuDataManager.release(z.id),y={offset:0,size:w,buffer:z.buffer}}let b=this.programManager.normalizeDispatchGroupSize(d),$=b[1]===1&&b[2]===1,T=id(e,t,$),v=this.programManager.getArtifact(T);if(v||(v=this.programManager.build(e,b),this.programManager.setArtifact(T,v),de("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),p&&v.uniformVariablesInfo){if(p.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${p.length} in program "${v.programInfo.name}".`);for(let w=0;w<p.length;w++){let k=p[w],C=k.type,S=typeof k.data=="number"?1:k.data.length,[z,E]=v.uniformVariablesInfo[w];if(C!==z||S!==E)throw new Error(`Uniform variable ${w} mismatch: expect type ${z} with size ${E}, got type ${C} with size ${S} in program "${v.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${b[0]}x${b[1]}x${b[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let w={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:h};this.pendingKernels.push(w),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(w)}return this.programManager.run(v,o,g,b,y),Ke(e.name),h}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=Af.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let a=i.kernelType,s=i.kernelName,o=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${a}] ${s}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),o(t,u[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${s}" failed. ${p}`)),1}finally{d&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${a}] ${s}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let s=a.get(t),o=this.gpuDataManager.registerExternalBuffer(r,i,s);return a.set(t,[o,r]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Ea(this,e,t);return en(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let a=this.getComputePassEncoder(),s=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(s.computePipeline),a.setBindGroup(0,s.bindGroup),a.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Mf={};Gt(Mf,{init:()=>Df});var Wi,ad,Df,Ng=q(()=>{te(),lt(),ne(),jm(),Wi=class Nf{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(A.size(t)!==A.size(this.dims))throw new Error("Invalid new shape");return new Nf(this.module,this.dataType,this.data,t)}},ad=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,s=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,s));let o=Number(e.getValue(i*a++,s));this.outputCount=Number(e.getValue(i*a++,s)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,s));let u=[];for(let d=0;d<o;d++){let p=Number(e.getValue(i*a++,s)),f=Number(e.getValue(i*a++,"*")),h=Number(e.getValue(i*a++,s)),g=[];for(let y=0;y<h;y++)g.push(Number(e.getValue(i*a++,s)));u.push(new Wi(e,p,f,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(o=>typeof o=="number"?this.inputs[o]:o)??this.inputs,i=t?.outputs??[],a=(o,u,d)=>new Wi(this.module,u,this.output(o,d),d),s=(o,u)=>{let d=Et(o,u);if(!d)throw new Error(`Unsupported data type: ${o}`);let p=d>0?this.backend.gpuDataManager.create(d).id:0;return new Wi(this.module,o,p,u)};return this.backend.run(e,r,i,a,s,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=i===4?"i32":"i64",s=this.module.stackAlloc((1+t.length)*i);this.module.setValue(s,t.length,a);for(let o=0;o<t.length;o++)this.module.setValue(s+i*(o+1),t[o],a);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Df=async(e,t,r,i)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=(Dg(),bi(Rf)).WebGpuBackend,o=new s;await o.initialize(r,i),a("webgpu",[o,u=>o.alloc(Number(u)),u=>o.free(u),(u,d,p,f=!1)=>{if(f)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(d)}, size=${Number(p)}`),o.memcpy(Number(u),Number(d));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(d)}, size=${Number(p)}`);let h=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(p));o.upload(Number(d),h)}},async(u,d,p)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${d}, size=${p}`),await o.download(Number(u),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+p)>>>0))},(u,d,p)=>o.createKernel(u,Number(d),p,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),u=>o.releaseKernel(u),(u,d,p,f)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${d}`);let h=new ad(t,o,Number(d));return o.computeKernel(Number(u),h,f)},()=>o.captureBegin(),()=>o.captureEnd(),()=>o.replay()])}else{let s=new Hd(r);a("webnn",[s,()=>s.reserveTensorId(),o=>s.releaseTensorId(o),async(o,u,d,p,f)=>s.ensureTensor(o,u,d,p,f),(o,u)=>{s.uploadTensor(o,u)},async(o,u)=>s.downloadTensor(o,u),(o,u)=>s.registerMLContext(o,u),!!r.trace])}}}),nd,cn,fn,gt,sd,ba,er,hn,mn,wa,gn,yn,_n,Pf=q(()=>{Le(),Wm(),Vm(),te(),Dt(),Za(),qd(),nd=(e,t)=>{ye()._OrtInit(e,t)!==0&&me("Can't initialize onnxruntime.")},cn=async e=>{nd(e.wasm.numThreads,Zi(e.logLevel))},fn=async(e,t)=>{ye().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:a}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(Ng(),bi(Mf)).init;t==="webgpu"&&await i("webgpu",ye(),e,r),t==="webnn"&&await i("webnn",ye(),e)}},gt=new Map,sd=e=>{let t=ye(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&me("Can't get session input/output count.");let s=i===4?"i32":"i64";return[Number(t.getValue(a,s)),Number(t.getValue(a+i,s))]}finally{t.stackRestore(r)}},ba=(e,t)=>{let r=ye(),i=r.stackSave(),a=0;try{let s=r.PTR_SIZE,o=r.stackAlloc(2*s);r._OrtGetInputOutputMetadata(e,t,o,o+s)!==0&&me("Can't get session input/output metadata.");let u=Number(r.getValue(o,"*"));a=Number(r.getValue(o+s,"*"));let d=r.HEAP32[a/4];if(d===0)return[u,0];let p=r.HEAPU32[a/4+1],f=[];for(let h=0;h<p;h++){let g=Number(r.getValue(a+8+h*s,"*"));f.push(g!==0?r.UTF8ToString(g):Number(r.getValue(a+8+(h+p)*s,"*")))}return[u,d,f]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},er=e=>{let t=ye(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},hn=async(e,t)=>{let r,i,a=ye();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=er(e);let s=0,o=0,u=0,d=[],p=[],f=[];try{if([o,d]=await Ud(t),t?.externalData&&a.mountExternalData){let C=[];for(let S of t.externalData){let z=typeof S=="string"?S:S.path;C.push(Qa(typeof S=="string"?S:S.data).then(E=>{a.mountExternalData(z,E)}))}await Promise.all(C)}for(let C of t?.executionProviders??[])if((typeof C=="string"?C:C.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof C!="string"){let S=C,z=S?.context,E=S?.gpuDevice,R=S?.deviceType,U=S?.powerPreference;z?a.currentContext=z:E?a.currentContext=await a.webnnCreateMLContext(E):a.currentContext=await a.webnnCreateMLContext({deviceType:R,powerPreference:U})}else a.currentContext=await a.webnnCreateMLContext();break}s=await a._OrtCreateSession(r,i,o),a.webgpuOnCreateSession?.(s),s===0&&me("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(s,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[h,g]=sd(s),y=!!t?.enableGraphCapture,b=[],$=[],T=[],v=[],w=[];for(let C=0;C<h;C++){let[S,z,E]=ba(s,C);S===0&&me("Can't get an input name."),p.push(S);let R=a.UTF8ToString(S);b.push(R),T.push(z===0?{name:R,isTensor:!1}:{name:R,isTensor:!0,type:ut(z),shape:E})}for(let C=0;C<g;C++){let[S,z,E]=ba(s,C+h);S===0&&me("Can't get an output name."),f.push(S);let R=a.UTF8ToString(S);$.push(R),v.push(z===0?{name:R,isTensor:!1}:{name:R,isTensor:!0,type:ut(z),shape:E});{if(y&&t?.preferredOutputLocation===void 0){w.push("gpu-buffer");continue}let U=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[R]??"cpu",V=a.webnnIsGraphOutput;if(U==="cpu"&&V&&V(s,R)){w.push("ml-tensor-cpu-output");continue}if(U!=="cpu"&&U!=="cpu-pinned"&&U!=="gpu-buffer"&&U!=="ml-tensor")throw new Error(`Not supported preferred output location: ${U}.`);if(y&&U!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${U}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);w.push(U)}}let k=null;return w.some(C=>C==="gpu-buffer"||C==="ml-tensor"||C==="ml-tensor-cpu-output")&&(u=a._OrtCreateBinding(s),u===0&&me("Can't create IO binding."),k={handle:u,outputPreferredLocations:w,outputPreferredLocationsEncoded:w.map(C=>C==="ml-tensor-cpu-output"?"ml-tensor":C).map(C=>Sa(C))}),gt.set(s,[s,p,f,k,y,!1]),[s,b,$,T,v]}catch(h){throw p.forEach(g=>a._OrtFree(g)),f.forEach(g=>a._OrtFree(g)),u!==0&&a._OrtReleaseBinding(u)!==0&&me("Can't release IO binding."),s!==0&&a._OrtReleaseSession(s)!==0&&me("Can't release session."),h}finally{a._free(r),o!==0&&a._OrtReleaseSessionOptions(o)!==0&&me("Can't release session options."),d.forEach(h=>a._free(h)),a.unmountExternalData?.()}},mn=e=>{let t=ye(),r=gt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,s,o,u]=r;o&&(u&&t._OrtClearBoundOutputs(o.handle)!==0&&me("Can't clear bound outputs."),t._OrtReleaseBinding(o.handle)!==0&&me("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(d=>t._OrtFree(d)),s.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(i)!==0&&me("Can't release session."),gt.delete(e)},wa=async(e,t,r,i,a,s,o=!1)=>{if(!e){t.push(0);return}let u=ye(),d=u.PTR_SIZE,p=e[0],f=e[1],h=e[3],g=h,y,b;if(p==="string"&&(h==="gpu-buffer"||h==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(o&&h!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(h==="gpu-buffer"){let v=e[2].gpuBuffer;b=Et(It(p),f);{let w=u.jsepRegisterBuffer;if(!w)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=w(i,s,v,b)}}else if(h==="ml-tensor"){let v=e[2].mlTensor;b=Et(It(p),f);let w=u.webnnRegisterMLTensor;if(!w)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=w(i,v,It(p),f)}else{let v=e[2];if(Array.isArray(v)){b=d*v.length,y=u._malloc(b),r.push(y);for(let w=0;w<v.length;w++){if(typeof v[w]!="string")throw new TypeError(`tensor data at index ${w} is not a string`);u.setValue(y+w*d,Fe(v[w],r),"*")}}else{let w=u.webnnIsGraphInput,k=u.webnnIsGraphOutput;if(p!=="string"&&w&&k){let C=u.UTF8ToString(a);if(w(i,C)||k(i,C)){let S=It(p);b=Et(S,f),g="ml-tensor";let z=u.webnnCreateTemporaryTensor,E=u.webnnUploadTensor;if(!z||!E)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let R=await z(i,S,f);E(R,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),y=R}else b=v.byteLength,y=u._malloc(b),r.push(y),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,b),y)}else b=v.byteLength,y=u._malloc(b),r.push(y),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,b),y)}}let $=u.stackSave(),T=u.stackAlloc(4*f.length);try{f.forEach((w,k)=>u.setValue(T+k*d,w,d===4?"i32":"i64"));let v=u._OrtCreateTensor(It(p),y,b,T,f.length,Sa(g));v===0&&me(`Can't create tensor for input/output. session=${i}, index=${s}.`),t.push(v)}finally{u.stackRestore($)}},gn=async(e,t,r,i,a,s)=>{let o=ye(),u=o.PTR_SIZE,d=gt.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=d[0],f=d[1],h=d[2],g=d[3],y=d[4],b=d[5],$=t.length,T=i.length,v=0,w=[],k=[],C=[],S=[],z=o.stackSave(),E=o.stackAlloc($*u),R=o.stackAlloc($*u),U=o.stackAlloc(T*u),V=o.stackAlloc(T*u);try{[v,w]=Pd(s),zt("wasm prepareInputOutputTensor");for(let G=0;G<$;G++)await wa(r[G],k,S,e,f[t[G]],t[G],y);for(let G=0;G<T;G++)await wa(a[G],C,S,e,h[i[G]],$+i[G],y);At("wasm prepareInputOutputTensor");for(let G=0;G<$;G++)o.setValue(E+G*u,k[G],"*"),o.setValue(R+G*u,f[t[G]],"*");for(let G=0;G<T;G++)o.setValue(U+G*u,C[G],"*"),o.setValue(V+G*u,h[i[G]],"*");if(g&&!b){let{handle:G,outputPreferredLocations:se,outputPreferredLocationsEncoded:J}=g;if(f.length!==$)throw new Error(`input count from feeds (${$}) is expected to be always equal to model's input count (${f.length}).`);zt("wasm bindInputsOutputs");for(let H=0;H<$;H++){let ae=t[H];await o._OrtBindInput(G,f[ae],k[H])!==0&&me(`Can't bind input[${H}] for session=${e}.`)}for(let H=0;H<T;H++){let ae=i[H];a[H]?.[3]?o._OrtBindOutput(G,h[ae],C[H],0)!==0&&me(`Can't bind pre-allocated output[${H}] for session=${e}.`):o._OrtBindOutput(G,h[ae],0,J[ae])!==0&&me(`Can't bind output[${H}] to ${se[H]} for session=${e}.`)}At("wasm bindInputsOutputs"),gt.set(e,[p,f,h,g,y,!0])}o.jsepOnRunStart?.(p),o.webnnOnRunStart?.(p);let Z;g?Z=await o._OrtRunWithBinding(p,g.handle,T,U,v):Z=await o._OrtRun(p,R,E,$,V,T,U,v),Z!==0&&me("failed to call OrtRun().");let X=[],re=[];zt("wasm ProcessOutputTensor");for(let G=0;G<T;G++){let se=Number(o.getValue(U+G*u,"*"));if(se===C[G]){X.push(a[G]);continue}let J=o.stackSave(),H=o.stackAlloc(4*u),ae=!1,j,ge=0;try{o._OrtGetTensorData(se,H,H+u,H+2*u,H+3*u)!==0&&me(`Can't access output tensor data on index ${G}.`);let P=u===4?"i32":"i64",W=Number(o.getValue(H,P));ge=o.getValue(H+u,"*");let ie=o.getValue(H+u*2,"*"),pe=Number(o.getValue(H+u*3,P)),D=[];for(let be=0;be<pe;be++)D.push(Number(o.getValue(ie+be*u,P)));o._OrtFree(ie)!==0&&me("Can't free memory for tensor dims.");let le=D.reduce((be,we)=>be*we,1);j=ut(W);let Ze=g?.outputPreferredLocations[i[G]];if(j==="string"){if(Ze==="gpu-buffer"||Ze==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let be=[];for(let we=0;we<le;we++){let Ce=o.getValue(ge+we*u,"*"),$i=o.getValue(ge+(we+1)*u,"*"),jt=we===le-1?void 0:$i-Ce;be.push(o.UTF8ToString(Ce,jt))}X.push([j,D,be,"cpu"])}else if(Ze==="gpu-buffer"&&le>0){let be=o.jsepGetBuffer;if(!be)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let we=be(ge),Ce=Et(W,le);if(Ce===void 0||!Ya(j))throw new Error(`Unsupported data type: ${j}`);ae=!0,X.push([j,D,{gpuBuffer:we,download:o.jsepCreateDownloader(we,Ce,j),dispose:()=>{o._OrtReleaseTensor(se)!==0&&me("Can't release tensor.")}},"gpu-buffer"])}else if(Ze==="ml-tensor"&&le>0){let be=o.webnnEnsureTensor,we=o.webnnIsGraphInputOutputTypeSupported;if(!be||!we)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Et(W,le)===void 0||!Xa(j))throw new Error(`Unsupported data type: ${j}`);if(!we(e,j,!1))throw new Error(`preferredLocation "ml-tensor" for ${j} output is not supported by current WebNN Context.`);let Ce=await be(e,ge,W,D,!1);ae=!0,X.push([j,D,{mlTensor:Ce,download:o.webnnCreateMLTensorDownloader(ge,j),dispose:()=>{o.webnnReleaseTensorId(ge),o._OrtReleaseTensor(se)}},"ml-tensor"])}else if(Ze==="ml-tensor-cpu-output"&&le>0){let be=o.webnnCreateMLTensorDownloader(ge,j)(),we=X.length;ae=!0,re.push((async()=>{let Ce=[we,await be];return o.webnnReleaseTensorId(ge),o._OrtReleaseTensor(se),Ce})()),X.push([j,D,[],"cpu"])}else{let be=tr(j),we=new be(le);new Uint8Array(we.buffer,we.byteOffset,we.byteLength).set(o.HEAPU8.subarray(ge,ge+we.byteLength)),X.push([j,D,we,"cpu"])}}finally{o.stackRestore(J),j==="string"&&ge&&o._free(ge),ae||o._OrtReleaseTensor(se)}}g&&!y&&(o._OrtClearBoundOutputs(g.handle)!==0&&me("Can't clear bound outputs."),gt.set(e,[p,f,h,g,y,!1]));for(let[G,se]of await Promise.all(re))X[G][2]=se;return At("wasm ProcessOutputTensor"),X}finally{o.webnnOnRunEnd?.(p),o.stackRestore(z),k.forEach(Z=>o._OrtReleaseTensor(Z)),C.forEach(Z=>o._OrtReleaseTensor(Z)),S.forEach(Z=>o._free(Z)),v!==0&&o._OrtReleaseRunOptions(v),w.forEach(Z=>o._free(Z))}},yn=e=>{let t=ye(),r=gt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&me("Can't get an profile file name."),t._OrtFree(a)},_n=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),yt,qe,Ut,oi,ui,Vi,$a,Gi,Tt,kt,od,Uf,qf,Lf,Wf,Vf,Gf,jf,Hf=q(()=>{Le(),Pf(),Dt(),Fa(),yt=()=>!!_e.wasm.proxy&&typeof document<"u",Ut=!1,oi=!1,ui=!1,Gi=new Map,Tt=(e,t)=>{let r=Gi.get(e);r?r.push(t):Gi.set(e,[t])},kt=()=>{if(Ut||!oi||ui||!qe)throw new Error("worker not ready")},od=e=>{switch(e.data.type){case"init-wasm":Ut=!1,e.data.err?(ui=!0,$a[1](e.data.err)):(oi=!0,$a[0]()),Vi&&(URL.revokeObjectURL(Vi),Vi=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Gi.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},Uf=async()=>{if(!oi){if(Ut)throw new Error("multiple calls to 'initWasm()' detected.");if(ui)throw new Error("previous call to 'initWasm()' failed.");if(Ut=!0,yt())return new Promise((e,t)=>{qe?.terminate(),Dd().then(([r,i])=>{try{qe=i,qe.onerror=s=>t(s),qe.onmessage=od,$a=[e,t];let a={type:"init-wasm",in:_e};!a.in.wasm.wasmPaths&&(r||ka)&&(a.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep-BGTZ4Y7F.wasm",import.meta.url).href,import.meta.url).href}),qe.postMessage(a),Vi=r}catch(a){t(a)}},t)});try{await Ka(_e.wasm),await cn(_e),oi=!0}catch(e){throw ui=!0,e}finally{Ut=!1}}},qf=async e=>{if(yt())return kt(),new Promise((t,r)=>{Tt("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:_e}};qe.postMessage(i)});await fn(_e,e)},Lf=async e=>yt()?(kt(),new Promise((t,r)=>{Tt("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};qe.postMessage(i,[e.buffer])})):er(e),Wf=async(e,t)=>{if(yt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return kt(),new Promise((r,i)=>{Tt("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),qe.postMessage(a,s)})}else return hn(e,t)},Vf=async e=>{if(yt())return kt(),new Promise((t,r)=>{Tt("release",[t,r]);let i={type:"release",in:e};qe.postMessage(i)});mn(e)},Gf=async(e,t,r,i,a,s)=>{if(yt()){if(r.some(o=>o[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(o=>o))throw new Error("pre-allocated output tensor is not supported for proxy.");return kt(),new Promise((o,u)=>{Tt("run",[o,u]);let d=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:i,options:s}};qe.postMessage(p,_n(d))})}else return gn(e,t,r,i,a,s)},jf=async e=>{if(yt())return kt(),new Promise((t,r)=>{Tt("end-profiling",[t,r]);let i={type:"end-profiling",in:e};qe.postMessage(i)});yn(e)}}),va,ud,Ff,Pg=q(()=>{Le(),Hf(),te(),Ha(),qd(),va=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},ud=e=>{switch(e[3]){case"cpu":return new Je(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ya(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return Je.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!Xa(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return Je.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},Ff=class{async fetchModelAndCopyToWasmMemory(e){return Lf(await Qa(e))}async loadModel(e,t){et();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Wf(r,t),Ke()}async dispose(){return Vf(this.sessionId)}async run(e,t,r){et();let i=[],a=[];Object.entries(e).forEach(h=>{let g=h[0],y=h[1],b=this.inputNames.indexOf(g);if(b===-1)throw new Error(`invalid input '${g}'`);i.push(y),a.push(b)});let s=[],o=[];Object.entries(t).forEach(h=>{let g=h[0],y=h[1],b=this.outputNames.indexOf(g);if(b===-1)throw new Error(`invalid output '${g}'`);s.push(y),o.push(b)});let u=i.map((h,g)=>va(h,()=>`input "${this.inputNames[a[g]]}"`)),d=s.map((h,g)=>h?va(h,()=>`output "${this.outputNames[o[g]]}"`):null),p=await Gf(this.sessionId,a,u,o,d,r),f={};for(let h=0;h<p.length;h++)f[this.outputNames[o[h]]]=s[h]??ud(p[h]);return Ke(),f}startProfiling(){}endProfiling(){jf(this.sessionId)}}}),Kf={};Gt(Kf,{OnnxruntimeWebAssemblyBackend:()=>La,initializeFlags:()=>qa,wasmBackend:()=>Zf});var qa,La,Zf,Ug=q(()=>{Le(),Hf(),Pg(),qa=()=>{(typeof _e.wasm.initTimeout!="number"||_e.wasm.initTimeout<0)&&(_e.wasm.initTimeout=0);let e=_e.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),_e.wasm.simd=!1),typeof _e.wasm.proxy!="boolean"&&(_e.wasm.proxy=!1),typeof _e.wasm.trace!="boolean"&&(_e.wasm.trace=!1),typeof _e.wasm.numThreads!="number"||!Number.isInteger(_e.wasm.numThreads)||_e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)_e.wasm.numThreads=1;else{let t=typeof navigator>"u"?Cm("node:os").cpus().length:navigator.hardwareConcurrency;_e.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},La=class{async init(e){qa(),await Uf(),await qf(e)}async createInferenceSessionHandler(e,t){let r=new Ff;return await r.loadModel(e,t),r}},Zf=new La});Le();Le();Le();var qg="1.23.2";{let e=(Ug(),bi(Kf)).wasmBackend;qt("webgpu",e,5),qt("webnn",e,5),qt("cpu",e,10),qt("wasm",e,10)}Object.defineProperty(_e.versions,"web",{value:qg,enumerable:!0});class Lg{session=null;inputShape=[1,3,640,640];enabled=!1;useMock=!1;lastMockUpdate=0;mockDetections=[];constructor(){_e.wasm.wasmPaths="https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/"}async init(t="./yolo11n-blow.onnx"){try{console.log(`Loading model from ${t}...`),this.session=await ja.create(t,{executionProviders:["webgpu","wasm"]}),console.log("Model loaded successfully (WebGPU/WASM)"),this.enabled=!0}catch(r){console.warn("Failed to load ONNX model. Switching to MOCK mode.",r),this.useMock=!0,this.enabled=!0}}async run(t,r=.5){if(!this.enabled)return[];if(this.useMock)return this.runMock(r);if(!this.session)return[];try{return[]}catch(i){return console.error("Inference error:",i),[]}}runMock(t){const r=Date.now();if(r-this.lastMockUpdate>2e3)if(this.lastMockUpdate=r,Math.random()<.3){const i=.2+Math.random()*.6,a=.4+Math.random()*.2,s=.6+Math.random()*.39;this.mockDetections=[{x:i,y:a,w:.05,h:.1,confidence:s,classId:0,label:"whale_blow"}]}else this.mockDetections=[];return this.mockDetections.filter(i=>i.confidence>=t)}}const ot={LOADING:"LOADING",READY:"READY",DETECTING:"DETECTING",EVENT:"EVENT",ERROR:"ERROR"};class Wg{currentState=ot.LOADING;listeners=[];get state(){return this.currentState}set state(t){this.currentState!==t&&(console.log(`[StateSystem] Transition: ${this.currentState} -> ${t}`),this.currentState=t,this.notify())}addListener(t){this.listeners.push(t),t(this.currentState)}removeListener(t){this.listeners=this.listeners.filter(r=>r!==t)}notify(){this.listeners.forEach(t=>t(this.currentState))}}const st=new Wg;class Vg{canvas;ctx;history=[];constructor(t){this.canvas=t;const r=t.getContext("2d");if(!r)throw new Error("Could not get canvas context");this.ctx=r}resize(t,r){this.canvas.width=t,this.canvas.height=r}draw(t){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.history.push({detections:[...t],timestamp:Date.now()});const r=Date.now();this.history=this.history.filter(i=>r-i.timestamp<1e3),this.history.forEach(i=>{const a=r-i.timestamp,s=1-a/1e3;s<=0||i.detections.forEach(o=>{a<50||this.drawBox(o,s*.3,!1)})}),t.forEach(i=>{this.drawBox(i,1,!0)})}drawBox(t,r,i){const{x:a,y:s,w:o,h:u,confidence:d}=t,p=this.canvas.width,f=this.canvas.height,h=(a-o/2)*p,g=(s-u/2)*f,y=o*p,b=u*f;let $="#ff5252";if(d>=.85?$="#4caf50":d>=.65&&($="#ffc107"),this.ctx.strokeStyle=$,this.ctx.globalAlpha=r,this.ctx.lineWidth=2,this.ctx.strokeRect(h,g,y,b),i&&d>.85&&(this.ctx.shadowColor=$,this.ctx.shadowBlur=10,this.ctx.strokeRect(h,g,y,b),this.ctx.shadowBlur=0),i){this.ctx.fillStyle=$,this.ctx.font="12px Inter, monospace",this.ctx.textBaseline="bottom";const T=`Blow · ${d.toFixed(2)}`,v=this.ctx.measureText(T).width;this.ctx.fillRect(h,g-16,v+8,16),this.ctx.fillStyle="#000",this.ctx.fillText(T,h+4,g-2)}this.ctx.globalAlpha=1}}const ze=[];for(let e=0;e<256;++e)ze.push((e+256).toString(16).slice(1));function Gg(e,t=0){return(ze[e[t+0]]+ze[e[t+1]]+ze[e[t+2]]+ze[e[t+3]]+"-"+ze[e[t+4]]+ze[e[t+5]]+"-"+ze[e[t+6]]+ze[e[t+7]]+"-"+ze[e[t+8]]+ze[e[t+9]]+"-"+ze[e[t+10]]+ze[e[t+11]]+ze[e[t+12]]+ze[e[t+13]]+ze[e[t+14]]+ze[e[t+15]]).toLowerCase()}let xa;const jg=new Uint8Array(16);function Hg(){if(!xa){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");xa=crypto.getRandomValues.bind(crypto)}return xa(jg)}const Fg=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),ld={randomUUID:Fg};function Kg(e,t,r){e=e||{};const i=e.random??e.rng?.()??Hg();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,Gg(i)}function Yf(e,t,r){return ld.randomUUID&&!e?ld.randomUUID():Kg(e)}class Zg{tracks=[];maxMisses=5;minHits=2;update(t){const r=[],i=new Set(this.tracks.map((o,u)=>u)),a=new Set(t.map((o,u)=>u));t.forEach((o,u)=>{let d=0,p=-1;this.tracks.forEach((f,h)=>{if(!i.has(h))return;const g=this.getIoU(o,f.lastDet);g>.3&&g>d&&(d=g,p=h)}),p!==-1&&(r.push({trackIdx:p,detIdx:u}),i.delete(p),a.delete(u))}),r.forEach(({trackIdx:o,detIdx:u})=>{const d=this.tracks[o];d.hits++,d.misses=0,d.lastDet=t[u],d.history.push(t[u]),d.history.length>10&&d.history.shift()}),a.forEach(o=>{this.tracks.push({id:Yf(),hits:1,misses:0,lastDet:t[o],history:[t[o]]})});for(let o=this.tracks.length-1;o>=0;o--)i.has(o)&&(this.tracks[o].misses++,this.tracks[o].misses>this.maxMisses&&this.tracks.splice(o,1));const s=[];return this.tracks.forEach(o=>{(o.hits>=this.minHits||o.lastDet.confidence>.8)&&s.push(o.lastDet)}),s}getIoU(t,r){const i=Math.max(t.x-t.w/2,r.x-r.w/2),a=Math.max(t.y-t.h/2,r.y-r.h/2),s=Math.min(t.x+t.w/2,r.x+r.w/2),o=Math.min(t.y+t.h/2,r.y+r.h/2);if(s<i||o<a)return 0;const u=(s-i)*(o-a),d=t.w*t.h,p=r.w*r.h;return u/(d+p-u)}}class Yg{BLOW_HEIGHT_MIN=2;BLOW_HEIGHT_MAX=6;VFOV_RAD=45*(Math.PI/180);estimate(t){const r=t.h*this.VFOV_RAD;if(r<=0)return{min:0,max:0,desc:"Unknown"};const i=this.BLOW_HEIGHT_MIN/Math.tan(r),a=this.BLOW_HEIGHT_MAX/Math.tan(r),s=(i/1e3).toFixed(1),o=(a/1e3).toFixed(1);return{min:Math.floor(i),max:Math.floor(a),desc:`~${s}-${o} km`}}}class Xg{events=[];capture(t,r,i){const a=document.createElement("canvas"),s=.5,o=i.width,u=i.height;let d=(t.x-t.w/2)*o,p=(t.y-t.h/2)*u,f=t.w*o,h=t.h*u;d-=f*s,p-=h*s,f+=f*(s*2),h+=h*(s*2),a.width=200,a.height=200*(h/f);const g=a.getContext("2d");g&&g.drawImage(i,d,p,f,h,0,0,a.width,a.height);const y={event_id:Yf(),event_type:"whale_blow",timestamp:new Date().toISOString(),confidence:t.confidence,bbox:[t.x,t.y,t.w,t.h],resolution:[i.width,i.height],device:"mobile_web_v0.1",optics:"monocular_unknown",distance_estimate_m:[r.min,r.max],location:{lat:null,lon:null},notes:"",thumbnail:a.toDataURL("image/jpeg",.7)};this.events.push(y);try{localStorage.setItem("leviathan_events",JSON.stringify(this.events.slice(-50)))}catch{}return console.log("Event Captured:",y),y}getRecentEvents(){return this.events.slice(-10).reverse()}}class Qg{orientation={alpha:0,beta:0,gamma:0,absolute:!1};motion={accelX:0,accelY:0,accelZ:0};available=!1;permissionGranted=!1;constructor(){this.handleOrientation=this.handleOrientation.bind(this),this.handleMotion=this.handleMotion.bind(this)}async requestPermission(){if(typeof DeviceOrientationEvent.requestPermission=="function")try{return await DeviceOrientationEvent.requestPermission()==="granted"?(this.permissionGranted=!0,this.start(),!0):(console.warn("Permission denied"),!1)}catch(t){return console.error(t),!1}else return this.permissionGranted=!0,this.start(),!0}start(){this.permissionGranted&&(window.addEventListener("deviceorientation",this.handleOrientation),window.addEventListener("devicemotion",this.handleMotion),this.available=!0)}stop(){window.removeEventListener("deviceorientation",this.handleOrientation),window.removeEventListener("devicemotion",this.handleMotion)}handleOrientation(t){let r=t.alpha;t.webkitCompassHeading&&(r=t.webkitCompassHeading,this.orientation.absolute=!0),this.orientation.alpha=r,this.orientation.beta=t.beta,this.orientation.gamma=t.gamma}handleMotion(t){this.motion.accelX=t.accelerationIncludingGravity?.x||0,this.motion.accelY=t.accelerationIncludingGravity?.y||0,this.motion.accelZ=t.accelerationIncludingGravity?.z||0}getHeadingString(){return this.orientation.alpha===null?"---°":`${Math.round(this.orientation.alpha)}°`}}const De={model:document.getElementById("status-model"),fps:document.getElementById("status-fps"),heading:document.getElementById("status-heading"),zoom:document.getElementById("status-zoom")},gi={btnZoom1:document.getElementById("btn-zoom-1"),btnZoom4:document.getElementById("btn-zoom-4"),btnRecord:document.getElementById("btn-record")},Jg=document.getElementById("debug-stats"),fi=document.getElementById("debug-overlay"),Xf=document.getElementById("detection-canvas"),ey=document.getElementById("camera-container"),Ot=new wm,yi=new Lg,Qf=new Vg(Xf),ty=new Zg,iy=new Yg,Ca=new Xg,_i=new Qg;let hi=!1,ry=.5,Ta=0,dd=Date.now(),pd=0;async function ay(){st.state=ot.LOADING;try{Ot.mount(ey),await Ot.start()}catch(e){console.error(e),De.model.textContent="● CAM ERROR",De.model.style.color="#ff5252";return}await yi.init("yolo11n-blow.onnx"),yi.useMock?(De.model.textContent="● MOCK",De.model.style.color="#ffc107"):(De.model.textContent="● LOADED",De.model.style.color="#4caf50"),await _i.requestPermission(),document.body.addEventListener("click",()=>{_i.permissionGranted||_i.requestPermission()},{once:!0}),st.state=ot.READY,cd(),window.addEventListener("resize",cd),requestAnimationFrame(Jf)}function cd(){Qf.resize(window.innerWidth,window.innerHeight)}async function Jf(){if(st.state===ot.ERROR)return;const e=Date.now();Ta++,e-dd>=1e3&&(De.fps.textContent=`${Ta} FPS`,Ta=0,dd=e),De.heading.textContent=_i.getHeadingString(),De.zoom.textContent=`${Ot.currentZoom}x`;const t=await yi.run(Ot.videoElement,.1),i=ty.update(t).filter(a=>a.confidence>=ry);if(i.length>0){if(st.state!==ot.EVENT&&st.state!==ot.DETECTING&&(st.state=ot.DETECTING),hi&&e-pd>2e3){const a=i.sort((o,u)=>u.confidence-o.confidence)[0],s=iy.estimate(a);Ca.capture(a,s,Xf),pd=e,De.model.textContent="● REC",De.model.style.color="#ff5252",setTimeout(()=>{De.model.textContent=yi.useMock?"● MOCK":"● LOADED",De.model.style.color=yi.useMock?"#ffc107":"#4caf50"},500)}}else st.state===ot.DETECTING&&(st.state=ot.READY);if(Qf.draw(i),fi.classList.contains("visible")){const a=Ca.getRecentEvents(),s={state:st.state,heading:_i.orientation.alpha?.toFixed(1),zoom:Ot.currentZoom,events:Ca.events.length,last:a[0]?a[0].event_id.substring(0,4):"None"};Jg.textContent=JSON.stringify(s,null,2)}requestAnimationFrame(Jf)}gi.btnZoom1.addEventListener("click",()=>Ot.setZoom(1));gi.btnZoom4.addEventListener("click",()=>Ot.setZoom(4));gi.btnRecord.addEventListener("click",()=>{hi=!hi,gi.btnRecord.classList.toggle("active",hi),gi.btnRecord.textContent=hi?"ARMED":"REC"});let Wa=0;document.addEventListener("touchstart",e=>Wa=e.touches[0].clientY);document.addEventListener("touchend",e=>{const t=e.changedTouches[0].clientY;t-Wa>100?fi.classList.contains("visible")||fi.classList.add("visible"):Wa-t>100&&fi.classList.contains("visible")&&fi.classList.remove("visible")});ay();
