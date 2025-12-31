(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();class ug{videoElement;stream=null;isReady=!1;constructor(){this.videoElement=document.createElement("video"),this.videoElement.setAttribute("playsinline","true"),this.videoElement.setAttribute("muted","true"),this.videoElement.autoplay=!0,this.videoElement.id="camera-feed",this.videoElement.style.position="absolute",this.videoElement.style.top="0",this.videoElement.style.left="0",this.videoElement.style.width="100%",this.videoElement.style.height="100%",this.videoElement.style.objectFit="cover",this.videoElement.style.zIndex="0"}async start(){if(!this.stream)try{const t={video:{facingMode:{ideal:"environment"},width:{ideal:3840},height:{ideal:2160}},audio:!1};this.stream=await navigator.mediaDevices.getUserMedia(t),this.videoElement.srcObject=this.stream;const i=this.stream.getVideoTracks()[0].getCapabilities();return i&&i.zoom&&(this.zoomMin=i.zoom.min,this.zoomMax=i.zoom.max,this.isZoomSupported=!0,console.log(`Zoom supported: ${this.zoomMin} - ${this.zoomMax}`)),new Promise(n=>{this.videoElement.onloadedmetadata=()=>{this.videoElement.play().then(()=>{this.isReady=!0,n()})}})}catch(t){throw console.error("Camera access denied or failed:",t),t}}isZoomSupported=!1;zoomMin=1;zoomMax=1;currentZoom=1;async setZoom(t){if(!this.stream||!this.isZoomSupported)return;const r=this.stream.getVideoTracks()[0],i=Math.max(this.zoomMin,Math.min(this.zoomMax,t));try{await r.applyConstraints({advanced:[{zoom:i}]}),this.currentZoom=i}catch(n){console.warn("Zoom failed:",n)}}Stop(){this.stream&&(this.stream.getTracks().forEach(t=>t.stop()),this.stream=null,this.isReady=!1)}mount(t){t.appendChild(this.videoElement)}}var ya=Object.defineProperty,dg=Object.getOwnPropertyDescriptor,cg=Object.getOwnPropertyNames,hg=Object.prototype.hasOwnProperty,pg=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),L=(e,t)=>()=>(e&&(t=e(e=0)),t),ii=(e,t)=>{for(var r in t)ya(e,r,{get:t[r],enumerable:!0})},fg=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of cg(t))!hg.call(e,n)&&n!==r&&ya(e,n,{get:()=>t[n],enumerable:!(i=dg(t,n))||i.enumerable});return e},Ai=e=>fg(ya({},"__esModule",{value:!0}),e),di,xt,Yt,ao,Yd,Xd=L(()=>{di=new Map,xt=[],Yt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=di.get(e);if(i===void 0)di.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=xt.indexOf(e);n!==-1&&xt.splice(n,1);for(let s=0;s<xt.length;s++)if(di.get(xt[s]).priority<=r){xt.splice(s,0,e);return}xt.push(e)}return}throw new TypeError("not a valid backend")},ao=async e=>{let t=di.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Yd=async e=>{let t=e.executionProviders||[],r=t.map(u=>typeof u=="string"?u:u.name),i=r.length===0?xt:r,n,s=[],a=new Set;for(let u of i){let d=await ao(u);typeof d=="string"?s.push({name:u,err:d}):(n||(n=d),n===d&&a.add(u))}if(!n)throw new Error(`no available backend found. ERR: ${s.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:d}of s)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${d}`);let l=t.filter(u=>a.has(typeof u=="string"?u:u.name));return[n,new Proxy(e,{get:(u,d)=>d==="executionProviders"?l:Reflect.get(u,d)})]}}),mg=L(()=>{Xd()}),Jd,gg=L(()=>{Jd="1.23.2"}),Vr,Me,Qd=L(()=>{gg(),Vr="warning",Me={wasm:{},webgl:{},webgpu:{},versions:{common:Jd},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Vr=e}},get logLevel(){return Vr}},Object.defineProperty(Me,"logLevel",{enumerable:!0})}),ge,yg=L(()=>{Qd(),ge=Me}),ec,tc,_g=L(()=>{ec=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],s=e.dims[3]):(n=e.dims[3],s=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",l=t?.norm,u,d;l===void 0||l.mean===void 0?u=[255,255,255,255]:typeof l.mean=="number"?u=[l.mean,l.mean,l.mean,l.mean]:(u=[l.mean[0],l.mean[1],l.mean[2],0],l.mean[3]!==void 0&&(u[3]=l.mean[3])),l===void 0||l.bias===void 0?d=[0,0,0,0]:typeof l.bias=="number"?d=[l.bias,l.bias,l.bias,l.bias]:(d=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(d[3]=l.bias[3]));let h=s*n,f=0,m=h,y=h*2,_=-1;a==="RGBA"?(f=0,m=h,y=h*2,_=h*3):a==="RGB"?(f=0,m=h,y=h*2):a==="RBG"&&(f=0,y=h,m=h*2);for(let w=0;w<s;w++)for(let x=0;x<n;x++){let $=(e.data[f++]-d[0])*u[0],v=(e.data[m++]-d[1])*u[1],T=(e.data[y++]-d[2])*u[2],C=_===-1?255:(e.data[_++]-d[3])*u[3];i.fillStyle="rgba("+$+","+v+","+T+","+C+")",i.fillRect(x,w,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},tc=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,s,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],s=e.dims[1],a=e.dims[3]):(n=e.dims[3],s=e.dims[2],a=e.dims[1]);let l=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,d,h;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?h=[0,0,0,0]:typeof u.bias=="number"?h=[u.bias,u.bias,u.bias,u.bias]:(h=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(h[3]=u.bias[3]));let f=s*n;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,y=0,_=1,w=2,x=3,$=0,v=f,T=f*2,C=-1;l==="RGBA"?($=0,v=f,T=f*2,C=f*3):l==="RGB"?($=0,v=f,T=f*2):l==="RBG"&&($=0,T=f,v=f*2),i=r.createImageData(n,s);for(let I=0;I<s*n;y+=m,_+=m,w+=m,x+=m,I++)i.data[y]=(e.data[$++]-h[0])*d[0],i.data[_]=(e.data[v++]-h[1])*d[1],i.data[w]=(e.data[T++]-h[2])*d[2],i.data[x]=C===-1?255:(e.data[C++]-h[3])*d[3]}else throw new Error("Can not access image data");return i}}),Gi,ic,rc,nc,ac,sc,bg=L(()=>{_a(),Gi=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},s,a;typeof n.mean=="number"?s=[n.mean,n.mean,n.mean,n.mean]:s=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?a=[n.bias,n.bias,n.bias,n.bias]:a=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let l=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*i,h=u==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),f=4,m=0,y=1,_=2,w=3,x=0,$=d,v=d*2,T=-1;l==="RGB"&&(f=3,m=0,y=1,_=2,w=-1),u==="RGBA"?T=d*3:u==="RBG"?(x=0,v=d,$=d*2):u==="BGR"&&(v=0,$=d,x=d*2);for(let C=0;C<d;C++,m+=f,_+=f,y+=f,w+=f)h[x++]=(e[m]+a[0])/s[0],h[$++]=(e[y]+a[1])/s[1],h[v++]=(e[_]+a[2])/s[2],T!==-1&&w!==-1&&(h[T++]=(e[w]+a[3])/s[3]);return u==="RGBA"?new We("float32",h,[1,4,r,i]):new We("float32",h,[1,3,r,i])},ic=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",a,l=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=h=>typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||h instanceof OffscreenCanvas?h.getContext("2d"):null;if(r){let h=u();h.width=e.width,h.height=e.height;let f=d(h);if(f!=null){let m=e.height,y=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,y=t.resizedWidth),t!==void 0){if(l=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");l.tensorFormat="RGBA",l.height=m,l.width=y}else l.tensorFormat="RGBA",l.height=m,l.width=y;f.drawImage(e,0,0),a=f.getImageData(0,0,y,m).data}else throw new Error("Can not access image data")}else if(i){let h,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(h=t.resizedHeight,f=t.resizedWidth):(h=e.height,f=e.width),t!==void 0&&(l=t),l.format="RGBA",l.height=h,l.width=f,t!==void 0){let m=u();m.width=f,m.height=h;let y=d(m);if(y!=null)y.putImageData(e,0,0),a=y.getImageData(0,0,f,h).data;else throw new Error("Can not access image data")}else a=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let h=u();h.width=e.width,h.height=e.height;let f=d(h);if(f!=null){let m=e.height,y=e.width;return f.drawImage(e,0,0,y,m),a=f.getImageData(0,0,y,m).data,l.height=m,l.width=y,Gi(a,l)}else throw new Error("Can not access image data")}else{if(s)return new Promise((h,f)=>{let m=u(),y=d(m);if(!e||!y)return f();let _=new Image;_.crossOrigin="Anonymous",_.src=e,_.onload=()=>{m.width=_.width,m.height=_.height,y.drawImage(_,0,0,m.width,m.height);let w=y.getImageData(0,0,m.width,m.height);l.height=m.height,l.width=m.width,h(Gi(w.data,l))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Gi(a,l);throw new Error("Input data provided is not supported - aborted tensor creation")},rc=(e,t)=>{let{width:r,height:i,download:n,dispose:s}=t,a=[1,i,r,4];return new We({location:"texture",type:"float32",texture:e,dims:a,download:n,dispose:s})},nc=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:s}=t;return new We({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:s})},ac=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:s}=t;return new We({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:s})},sc=(e,t,r)=>new We({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Pt,vi,Gr,oc,wg=L(()=>{Pt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),vi=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Gr=!1,oc=()=>{if(!Gr){Gr=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Pt.set("int64",BigInt64Array),vi.set(BigInt64Array,"int64")),t&&(Pt.set("uint64",BigUint64Array),vi.set(BigUint64Array,"uint64")),i?(Pt.set("float16",r),vi.set(r,"float16")):Pt.set("float16",Uint16Array)}}}),lc,uc,vg=L(()=>{_a(),lc=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},uc=(e,t)=>{switch(e.location){case"cpu":return new We(e.type,e.data,t);case"cpu-pinned":return new We({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new We({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new We({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new We({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),We,_a=L(()=>{_g(),bg(),wg(),vg(),We=class{constructor(e,t,r){oc();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let a=Pt.get(i);if(!a)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,l;if(typeof e=="string")if(i=e,l=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");a=t}else{let u=Pt.get(e);if(u===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&u===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${u.name} as data.`);e==="uint64"||e==="int64"?a=u.from(t,BigInt):a=u.from(t)}else if(t instanceof u)a=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")a=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&u!==Uint16Array)a=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${u}`)}else if(l=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let u=typeof e[0];if(u==="string")i="string",a=e;else if(u==="boolean")i="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${u}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",a=Uint8Array.from(e);else{let u=vi.get(e.constructor);if(u===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=u,a=e}if(l===void 0)l=[a.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");n=l,this.cpuData=a,this.dataLocation="cpu"}let s=lc(n);if(this.cpuData&&s!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=s}static async fromImage(e,t){return ic(e,t)}static fromTexture(e,t){return rc(e,t)}static fromGpuBuffer(e,t){return nc(e,t)}static fromMLTensor(e,t){return ac(e,t)}static fromPinnedBuffer(e,t,r){return sc(e,t,r)}toDataURL(e){return ec(this,e)}toImageData(e){return tc(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return uc(this,e)}}}),Ge,dc=L(()=>{_a(),Ge=We}),cr,jr,st,tt,Ht,Wt,cc=L(()=>{Qd(),cr=(e,t)=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||console.timeStamp(`${e}::ORT::${t}`)},jr=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let n=0;n<r.length;n++){if(i&&!r[n].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(s+=`::${t}`),cr("CPU",s);return}r[n].includes("TRACE_FUNC")&&(i=!0)}},st=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||jr("BEGIN",e)},tt=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||jr("END",e)},Ht=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||console.time(`ORT::${e}`)},Wt=e=>{(typeof Me.trace>"u"?!Me.wasm.trace:!Me.trace)||console.timeEnd(`ORT::${e}`)}}),hc,$g=L(()=>{Xd(),dc(),cc(),hc=class pc{constructor(t){this.handler=t}async run(t,r,i){st(),Ht("InferenceSession.run");let n={},s={};if(typeof t!="object"||t===null||t instanceof Ge||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Ge)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);n[d]=null}if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,h=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(h.indexOf(f)!==-1){let m=r[f];(m===null||m instanceof Ge)&&(d=!0,a=!1,n[f]=m)}if(d){if(typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(a)for(let d of this.outputNames)n[d]=null;let l=await this.handler.run(t,n,s),u={};for(let d in l)if(Object.hasOwnProperty.call(l,d)){let h=l[d];h instanceof Ge?u[d]=h:u[d]=new Ge(h.type,h.data,h.dims)}return Wt("InferenceSession.run"),tt(),u}async release(){return this.handler.dispose()}static async create(t,r,i,n){st(),Ht("InferenceSession.create");let s,a={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let h=t,f=0,m=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=h.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${h.byteLength}).`);if(m=t.byteLength-f,typeof i=="number"){if(m=i,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||f+m>h.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${h.byteLength-f}].`);if(typeof n=="object"&&n!==null)a=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(h,f,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[l,u]=await Yd(a),d=await l.createInferenceSessionHandler(s,u);return Wt("InferenceSession.create"),tt(),new pc(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Ii,xg=L(()=>{$g(),Ii=hc}),Cg=L(()=>{}),Sg=L(()=>{}),Tg=L(()=>{}),Ig=L(()=>{}),kg={};ii(kg,{InferenceSession:()=>Ii,TRACE:()=>cr,TRACE_EVENT_BEGIN:()=>Ht,TRACE_EVENT_END:()=>Wt,TRACE_FUNC_BEGIN:()=>st,TRACE_FUNC_END:()=>tt,Tensor:()=>Ge,env:()=>ge,registerBackend:()=>Yt});var je=L(()=>{mg(),yg(),xg(),dc(),Cg(),Sg(),cc(),Tg(),Ig()}),ba=L(()=>{}),fc={};ii(fc,{default:()=>mc});var Kr,Zr,mc,Eg=L(()=>{vf(),Gt(),wa(),Kr="ort-wasm-proxy-worker",Zr=globalThis.self?.name===Kr,Zr&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":va(r.wasm).then(()=>{Pa(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:n}=r;Ua(n,i).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:i}=r,n=_r(i);postMessage({type:t,out:n});break}case"create":{let{model:i,options:n}=r;La(i,n).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":Ha(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:n,inputs:s,outputIndices:a,options:l}=r;Wa(i,n,s,a,new Array(a.length).fill(null),l).then(u=>{u.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:u},qa([...s,...u]))},u=>{postMessage({type:t,err:u})});break}case"end-profiling":Fa(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),mc=Zr?null:e=>new Worker(e??Ue,{type:"module",name:Kr})}),gc={};ii(gc,{default:()=>yc});var Yr,yc,so,zg=L(()=>{Yr=async function(e={}){var t,r,i=e,n=new Promise((o,c)=>{t=o,r=c}),s=typeof window=="object",a=typeof WorkerGlobalScope<"u",l=a&&self.name?.startsWith("em-pthread");i.mountExternalData=(o,c)=>{o.startsWith("./")&&(o=o.substring(2)),(i.Fb||(i.Fb=new Map)).set(o,c)},i.unmountExternalData=()=>{delete i.Fb};var u=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let d=o=>async(...c)=>{try{if(i.Gb)throw Error("Session already started");let p=i.Gb={ec:c[0],errors:[]},g=await o(...c);if(i.Gb!==p)throw Error("Session mismatch");i.Kb?.flush();let b=p.errors;if(0<b.length){let S=await Promise.all(b);if(S=S.filter(k=>k),0<S.length)throw Error(S.join(`
`))}return g}finally{i.Gb=null}};i.jsepInit=(o,c)=>{if(o==="webgpu"){[i.Kb,i.Vb,i.Zb,i.Lb,i.Yb,i.Ab,i.$b,i.bc,i.Wb,i.Xb,i.ac]=c;let p=i.Kb;i.jsepRegisterBuffer=(g,b,S,k)=>p.registerBuffer(g,b,S,k),i.jsepGetBuffer=g=>p.getBuffer(g),i.jsepCreateDownloader=(g,b,S)=>p.createDownloader(g,b,S),i.jsepOnCreateSession=g=>{p.onCreateSession(g)},i.jsepOnReleaseSession=g=>{p.onReleaseSession(g)},i.jsepOnRunStart=g=>p.onRunStart(g),i.cc=(g,b)=>{p.upload(g,b)}}else if(o==="webnn"){let p=c[0];[i.oc,i.Ob,i.webnnEnsureTensor,i.Pb,i.webnnDownloadTensor,i.nc,i.webnnEnableTraceEvent]=c.slice(1),i.webnnReleaseTensorId=i.Ob,i.webnnUploadTensor=i.Pb,i.webnnRegisterMLContext=i.nc,i.webnnOnRunStart=g=>p.onRunStart(g),i.webnnOnRunEnd=p.onRunEnd.bind(p),i.webnnOnReleaseSession=g=>{p.onReleaseSession(g)},i.webnnCreateMLTensorDownloader=(g,b)=>p.createMLTensorDownloader(g,b),i.webnnRegisterMLTensor=(g,b,S,k)=>p.registerMLTensor(g,b,S,k),i.webnnCreateMLContext=g=>p.createMLContext(g),i.webnnRegisterMLConstant=(g,b,S,k,M,N)=>p.registerMLConstant(g,b,S,k,M,i.Fb,N),i.webnnRegisterGraphInput=p.registerGraphInput.bind(p),i.webnnIsGraphInput=p.isGraphInput.bind(p),i.webnnRegisterGraphOutput=p.registerGraphOutput.bind(p),i.webnnIsGraphOutput=p.isGraphOutput.bind(p),i.webnnCreateTemporaryTensor=p.createTemporaryTensor.bind(p),i.webnnIsGraphInputOutputTypeSupported=p.isGraphInputOutputTypeSupported.bind(p)}};let h=()=>{let o=(c,p,g)=>(...b)=>{let S=nt,k=p?.();b=c(...b);let M=p?.();return k!==M&&(c=M,g(k),p=g=null),nt!=S?new Promise((N,H)=>{Rr={resolve:N,reject:H}}):b};(()=>{for(let c of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])i[c]=o(i[c],()=>i[c],p=>i[c]=p)})(),d!==void 0&&(i._OrtRun=d(i._OrtRun),i._OrtRunWithBinding=d(i._OrtRunWithBinding)),h=void 0};i.asyncInit=()=>{h?.()};var f,m,y=(o,c)=>{throw c},_=import.meta.url,w="";if(s||a){try{w=new URL(".",_).href}catch{}a&&(m=o=>{var c=new XMLHttpRequest;return c.open("GET",o,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),f=async o=>{if(ye(o))return new Promise((p,g)=>{var b=new XMLHttpRequest;b.open("GET",o,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?p(b.response):g(b.status)},b.onerror=g,b.send(null)});var c=await fetch(o,{credentials:"same-origin"});if(c.ok)return c.arrayBuffer();throw Error(c.status+" : "+c.url)}}var x,$,v,T,C,I,z,E,O,P,F,V,G,ee,q,ne=console.log.bind(console),Q=console.error.bind(console),K=ne,ae=Q,j=!1,ye=o=>o.startsWith("file://");function U(){return $.buffer!=C.buffer&&Se(),C}function W(){return $.buffer!=C.buffer&&Se(),I}function re(){return $.buffer!=C.buffer&&Se(),z}function ce(){return $.buffer!=C.buffer&&Se(),E}function B(){return $.buffer!=C.buffer&&Se(),O}function ue(){return $.buffer!=C.buffer&&Se(),P}function it(){return $.buffer!=C.buffer&&Se(),F}function be(){return $.buffer!=C.buffer&&Se(),ee}if(l){let o=function(c){try{var p=c.data,g=p.Db;if(g==="load"){let b=[];self.onmessage=S=>b.push(S),self.startWorker=()=>{postMessage({Db:"loaded"});for(let S of b)o(S);self.onmessage=o};for(let S of p.Sb)i[S]&&!i[S].proxy||(i[S]=(...k)=>{postMessage({Db:"callHandler",Rb:S,args:k})},S=="print"&&(K=i[S]),S=="printErr"&&(ae=i[S]));$=p.kc,Se(),q(p.lc)}else if(g==="run"){Ff(p.Bb),Lr(p.Bb,0,0,1,0,0),ts(),Mr(p.Bb),we||(js(),we=!0);try{qf(p.hc,p.Jb)}catch(b){if(b!="unwind")throw b}}else p.target!=="setimmediate"&&(g==="checkMailbox"?we&&Bi():g&&(ae(`worker: received unknown command ${g}`),ae(p)))}catch(b){throw Ks(),b}};var we=!1;self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=o}function Se(){var o=$.buffer;i.HEAP8=C=new Int8Array(o),z=new Int16Array(o),i.HEAPU8=I=new Uint8Array(o),E=new Uint16Array(o),i.HEAP32=O=new Int32Array(o),i.HEAPU32=P=new Uint32Array(o),F=new Float32Array(o),ee=new Float64Array(o),V=new BigInt64Array(o),G=new BigUint64Array(o)}function Di(){l?startWorker(i):R.Da()}var ri,ni=0,ai=null;function Ka(){if(--ni==0&&ai){var o=ai;ai=null,o()}}function _t(o){throw ae(o="Aborted("+o+")"),j=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),r(o),o}function Za(){return{a:{L:og,Aa:sg,b:Gf,$:as,A:ls,pa:us,X:ds,Z:cs,qa:hs,na:ps,ga:fs,ma:ms,J:gs,Y:ys,V:_s,oa:bs,W:ws,va:jf,E:Kf,Q:Zf,O:Xf,D:Qf,v:em,s:tm,P:im,z:um,R:dm,ja:cm,T:hm,aa:pm,M:fm,F:mm,ia:Mr,sa:gm,r:ym,Ca:_m,w:vm,o:$m,m:Cm,c:kr,Ba:Sm,n:Tm,j:Em,u:zm,p:Am,f:Mm,t:Om,l:Rm,e:Dm,k:Bm,h:Nm,g:Pm,d:Um,da:Lm,ea:Hm,fa:Wm,ba:Os,ca:Rs,N:Ds,xa:qm,ua:Gm,i:jm,C:Km,G:Zm,ta:Vm,x:Ym,ra:Xm,U:Jm,q:Fm,y:Qm,K:eg,S:tg,za:ig,ya:rg,ka:Us,la:Ls,_:Cr,B:Hs,I:Ws,ha:Fs,H:qs,a:$,wa:xr}}}class vr{name="ExitStatus";constructor(c){this.message=`Program terminated with exit(${c})`,this.status=c}}var Ya=o=>{o.terminate(),o.onmessage=()=>{}},$r=[],Xa=o=>{wt.length==0&&(rs(),is(wt[0]));var c=wt.pop();if(!c)return 6;si.push(c),Et[o.Bb]=c,c.Bb=o.Bb;var p={Db:"run",hc:o.fc,Jb:o.Jb,Bb:o.Bb};return c.postMessage(p,o.Nb),0},bt=0,ve=(o,c,...p)=>{for(var g=2*p.length,b=Fr(),S=Wr(8*g),k=S>>>3,M=0;M<p.length;M++){var N=p[M];typeof N=="bigint"?(V[k+2*M]=1n,V[k+2*M+1]=N):(V[k+2*M]=0n,be()[k+2*M+1>>>0]=N)}return o=Zs(o,0,g,S,c),Vi(b),o};function xr(o){if(l)return ve(0,1,o);if(T=o,!(0<bt)){for(var c of si)Ya(c);for(c of wt)Ya(c);wt=[],si=[],Et={},j=!0}y(0,new vr(o))}function Ja(o){if(l)return ve(1,0,o);Cr(o)}var Cr=o=>{if(T=o,l)throw Ja(o),"unwind";xr(o)},wt=[],si=[],Qa=[],Et={},es=o=>{var c=o.Bb;delete Et[c],wt.push(o),si.splice(si.indexOf(o),1),o.Bb=0,Ys(c)};function ts(){Qa.forEach(o=>o())}var is=o=>new Promise(c=>{o.onmessage=b=>{var S=(b=b.data).Db;if(b.Hb&&b.Hb!=Ur()){var k=Et[b.Hb];k?k.postMessage(b,b.Nb):ae(`Internal error! Worker sent a message "${S}" to target pthread ${b.Hb}, but that thread no longer exists!`)}else S==="checkMailbox"?Bi():S==="spawnThread"?Xa(b):S==="cleanupThread"?es(Et[b.ic]):S==="loaded"?(o.loaded=!0,c(o)):b.target==="setimmediate"?o.postMessage(b):S==="callHandler"?i[b.Rb](...b.args):S&&ae(`worker sent an unknown command ${S}`)},o.onerror=b=>{throw ae(`worker sent an error! ${b.filename}:${b.lineno}: ${b.message}`),b};var p,g=[];for(p of[])i.propertyIsEnumerable(p)&&g.push(p);o.postMessage({Db:"load",Sb:g,kc:$,lc:v})});function rs(){var o=new Worker((()=>{let c=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new c("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});wt.push(o)}var Ff=o=>{Se();var c=ue()[o+52>>>2>>>0];o=ue()[o+56>>>2>>>0],Qs(c,c-o),Vi(c)},qf=(o,c)=>{bt=0,o=eo(o,c),0<bt?T=o:Hr(o)};class Vf{constructor(c){this.Ib=c-24}}function Gf(o,c,p){var g=new Vf(o>>>=0);throw c>>>=0,p>>>=0,ue()[g.Ib+16>>>2>>>0]=0,ue()[g.Ib+4>>>2>>>0]=c,ue()[g.Ib+8>>>2>>>0]=p,o}function ns(o,c,p,g){return l?ve(2,1,o,c,p,g):as(o,c,p,g)}function as(o,c,p,g){if(o>>>=0,p>>>=0,g>>>=0,u===void 0)return 6;var b=[];return l&&b.length===0?ns(o,c>>>=0,p,g):(o={fc:p,Bb:o,Jb:g,Nb:b},l?(o.Db="spawnThread",postMessage(o,b),0):Xa(o))}var ss=typeof TextDecoder<"u"?new TextDecoder:void 0,os=(o,c=0,p=NaN)=>{var g=(c>>>=0)+p;for(p=c;o[p]&&!(p>=g);)++p;if(16<p-c&&o.buffer&&ss)return ss.decode(o.buffer instanceof ArrayBuffer?o.subarray(c,p):o.slice(c,p));for(g="";c<p;){var b=o[c++];if(128&b){var S=63&o[c++];if((224&b)==192)g+=String.fromCharCode((31&b)<<6|S);else{var k=63&o[c++];65536>(b=(240&b)==224?(15&b)<<12|S<<6|k:(7&b)<<18|S<<12|k<<6|63&o[c++])?g+=String.fromCharCode(b):(b-=65536,g+=String.fromCharCode(55296|b>>10,56320|1023&b))}}else g+=String.fromCharCode(b)}return g},Te=(o,c)=>(o>>>=0)?os(W(),o,c):"";function ls(o,c,p){return l?ve(3,1,o,c,p):0}function us(o,c){if(l)return ve(4,1,o,c)}function ds(o,c){if(l)return ve(5,1,o,c)}function cs(o,c,p){if(l)return ve(6,1,o,c,p)}function hs(o,c,p){return l?ve(7,1,o,c,p):0}function ps(o,c){if(l)return ve(8,1,o,c)}function fs(o,c,p){if(l)return ve(9,1,o,c,p)}function ms(o,c,p,g){if(l)return ve(10,1,o,c,p,g)}function gs(o,c,p,g){if(l)return ve(11,1,o,c,p,g)}function ys(o,c,p,g){if(l)return ve(12,1,o,c,p,g)}function _s(o){if(l)return ve(13,1,o)}function bs(o,c){if(l)return ve(14,1,o,c)}function ws(o,c,p){if(l)return ve(15,1,o,c,p)}var vs,jf=()=>_t(""),rt=o=>{for(var c="";W()[o>>>0];)c+=vs[W()[o++>>>0]];return c},Sr={},Tr={},Kt=i.BindingError=class extends Error{constructor(o){super(o),this.name="BindingError"}};function ot(o,c,p={}){return(function(g,b,S={}){var k=b.name;if(!g)throw new Kt(`type "${k}" must have a positive integer typeid pointer`);if(Tr.hasOwnProperty(g)){if(S.Tb)return;throw new Kt(`Cannot register type '${k}' twice`)}Tr[g]=b,Sr.hasOwnProperty(g)&&(b=Sr[g],delete Sr[g],b.forEach(M=>M()))})(o,c,p)}var $s=(o,c,p)=>{switch(c){case 1:return p?g=>U()[g>>>0]:g=>W()[g>>>0];case 2:return p?g=>re()[g>>>1>>>0]:g=>ce()[g>>>1>>>0];case 4:return p?g=>B()[g>>>2>>>0]:g=>ue()[g>>>2>>>0];case 8:return p?g=>V[g>>>3]:g=>G[g>>>3];default:throw new TypeError(`invalid integer width (${c}): ${o}`)}};function Kf(o,c,p){p>>>=0,ot(o>>>=0,{name:c=rt(c>>>0),fromWireType:g=>g,toWireType:function(g,b){if(typeof b!="bigint"&&typeof b!="number")throw b=b===null?"null":(g=typeof b)=="object"||g==="array"||g==="function"?b.toString():""+b,new TypeError(`Cannot convert "${b}" to ${this.name}`);return typeof b=="number"&&(b=BigInt(b)),b},Cb:vt,readValueFromPointer:$s(c,p,c.indexOf("u")==-1),Eb:null})}var vt=8;function Zf(o,c,p,g){ot(o>>>=0,{name:c=rt(c>>>0),fromWireType:function(b){return!!b},toWireType:function(b,S){return S?p:g},Cb:vt,readValueFromPointer:function(b){return this.fromWireType(W()[b>>>0])},Eb:null})}var Ir=[],lt=[];function kr(o){9<(o>>>=0)&&--lt[o+1]==0&&(lt[o]=void 0,Ir.push(o))}var Be=o=>{if(!o)throw new Kt(`Cannot use deleted val. handle = ${o}`);return lt[o]},qe=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=Ir.pop()||lt.length;return lt[c]=o,lt[c+1]=1,c}};function Er(o){return this.fromWireType(ue()[o>>>2>>>0])}var Yf={name:"emscripten::val",fromWireType:o=>{var c=Be(o);return kr(o),c},toWireType:(o,c)=>qe(c),Cb:vt,readValueFromPointer:Er,Eb:null};function Xf(o){return ot(o>>>0,Yf)}var Jf=(o,c)=>{switch(c){case 4:return function(p){return this.fromWireType(it()[p>>>2>>>0])};case 8:return function(p){return this.fromWireType(be()[p>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${o}`)}};function Qf(o,c,p){p>>>=0,ot(o>>>=0,{name:c=rt(c>>>0),fromWireType:g=>g,toWireType:(g,b)=>b,Cb:vt,readValueFromPointer:Jf(c,p),Eb:null})}function em(o,c,p,g,b){if(o>>>=0,p>>>=0,c=rt(c>>>0),b===-1&&(b=4294967295),b=M=>M,g===0){var S=32-8*p;b=M=>M<<S>>>S}var k=c.includes("unsigned")?function(M,N){return N>>>0}:function(M,N){return N};ot(o,{name:c,fromWireType:b,toWireType:k,Cb:vt,readValueFromPointer:$s(c,p,g!==0),Eb:null})}function tm(o,c,p){function g(S){var k=ue()[S>>>2>>>0];return S=ue()[S+4>>>2>>>0],new b(U().buffer,S,k)}var b=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];ot(o>>>=0,{name:p=rt(p>>>0),fromWireType:g,Cb:vt,readValueFromPointer:g},{Tb:!0})}var zt=(o,c,p)=>{var g=W();if(c>>>=0,0<p){var b=c;p=c+p-1;for(var S=0;S<o.length;++S){var k=o.charCodeAt(S);if(55296<=k&&57343>=k&&(k=65536+((1023&k)<<10)|1023&o.charCodeAt(++S)),127>=k){if(c>=p)break;g[c++>>>0]=k}else{if(2047>=k){if(c+1>=p)break;g[c++>>>0]=192|k>>6}else{if(65535>=k){if(c+2>=p)break;g[c++>>>0]=224|k>>12}else{if(c+3>=p)break;g[c++>>>0]=240|k>>18,g[c++>>>0]=128|k>>12&63}g[c++>>>0]=128|k>>6&63}g[c++>>>0]=128|63&k}}g[c>>>0]=0,o=c-b}else o=0;return o},zr=o=>{for(var c=0,p=0;p<o.length;++p){var g=o.charCodeAt(p);127>=g?c++:2047>=g?c+=2:55296<=g&&57343>=g?(c+=4,++p):c+=3}return c};function im(o,c){ot(o>>>=0,{name:c=rt(c>>>0),fromWireType:function(p){for(var g,b=ue()[p>>>2>>>0],S=p+4,k=S,M=0;M<=b;++M){var N=S+M;M!=b&&W()[N>>>0]!=0||(k=Te(k,N-k),g===void 0?g=k:(g+="\0",g+=k),k=N+1)}return ut(p),g},toWireType:function(p,g){g instanceof ArrayBuffer&&(g=new Uint8Array(g));var b=typeof g=="string";if(!(b||ArrayBuffer.isView(g)&&g.BYTES_PER_ELEMENT==1))throw new Kt("Cannot pass non-string to std::string");var S=b?zr(g):g.length,k=qi(4+S+1),M=k+4;return ue()[k>>>2>>>0]=S,b?zt(g,M,S+1):W().set(g,M>>>0),p!==null&&p.push(ut,k),k},Cb:vt,readValueFromPointer:Er,Eb(p){ut(p)}})}var xs=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,rm=(o,c)=>{for(var p=o>>1,g=p+c/2;!(p>=g)&&ce()[p>>>0];)++p;if(32<(p<<=1)-o&&xs)return xs.decode(W().slice(o,p));for(p="",g=0;!(g>=c/2);++g){var b=re()[o+2*g>>>1>>>0];if(b==0)break;p+=String.fromCharCode(b)}return p},nm=(o,c,p)=>{if(p??=2147483647,2>p)return 0;var g=c;p=(p-=2)<2*o.length?p/2:o.length;for(var b=0;b<p;++b){var S=o.charCodeAt(b);re()[c>>>1>>>0]=S,c+=2}return re()[c>>>1>>>0]=0,c-g},am=o=>2*o.length,sm=(o,c)=>{for(var p=0,g="";!(p>=c/4);){var b=B()[o+4*p>>>2>>>0];if(b==0)break;++p,65536<=b?(b-=65536,g+=String.fromCharCode(55296|b>>10,56320|1023&b)):g+=String.fromCharCode(b)}return g},om=(o,c,p)=>{if(c>>>=0,p??=2147483647,4>p)return 0;var g=c;p=g+p-4;for(var b=0;b<o.length;++b){var S=o.charCodeAt(b);if(55296<=S&&57343>=S&&(S=65536+((1023&S)<<10)|1023&o.charCodeAt(++b)),B()[c>>>2>>>0]=S,(c+=4)+4>p)break}return B()[c>>>2>>>0]=0,c-g},lm=o=>{for(var c=0,p=0;p<o.length;++p){var g=o.charCodeAt(p);55296<=g&&57343>=g&&++p,c+=4}return c};function um(o,c,p){if(o>>>=0,c>>>=0,p=rt(p>>>=0),c===2)var g=rm,b=nm,S=am,k=M=>ce()[M>>>1>>>0];else c===4&&(g=sm,b=om,S=lm,k=M=>ue()[M>>>2>>>0]);ot(o,{name:p,fromWireType:M=>{for(var N,H=ue()[M>>>2>>>0],Z=M+4,te=0;te<=H;++te){var le=M+4+te*c;te!=H&&k(le)!=0||(Z=g(Z,le-Z),N===void 0?N=Z:(N+="\0",N+=Z),Z=le+c)}return ut(M),N},toWireType:(M,N)=>{if(typeof N!="string")throw new Kt(`Cannot pass non-string to C++ string type ${p}`);var H=S(N),Z=qi(4+H+c);return ue()[Z>>>2>>>0]=H/c,b(N,Z+4,H+c),M!==null&&M.push(ut,Z),Z},Cb:vt,readValueFromPointer:Er,Eb(M){ut(M)}})}function dm(o,c){ot(o>>>=0,{Ub:!0,name:c=rt(c>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function cm(o){Lr(o>>>0,!a,1,!s,131072,!1),ts()}var Ar=o=>{if(!j)try{if(o(),!(0<bt))try{l?Hr(T):Cr(T)}catch(c){c instanceof vr||c=="unwind"||y(0,c)}}catch(c){c instanceof vr||c=="unwind"||y(0,c)}};function Mr(o){o>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(B(),o>>>2,o).value.then(Bi),o+=128,Atomics.store(B(),o>>>2,1))}var Bi=()=>{var o=Ur();o&&(Mr(o),Ar(Js))};function hm(o,c){(o>>>=0)==c>>>0?setTimeout(Bi):l?postMessage({Hb:o,Db:"checkMailbox"}):(o=Et[o])&&o.postMessage({Db:"checkMailbox"})}var Or=[];function pm(o,c,p,g,b){for(c>>>=0,g/=2,Or.length=g,p=b>>>0>>>3,b=0;b<g;b++)Or[b]=V[p+2*b]?V[p+2*b+1]:be()[p+2*b+1>>>0];return(c?Pr[c]:ag[o])(...Or)}var fm=()=>{bt=0};function mm(o){o>>>=0,l?postMessage({Db:"cleanupThread",ic:o}):es(Et[o])}function gm(o){}var Ni=(o,c)=>{var p=Tr[o];if(p===void 0)throw o=Gs(o),p=rt(o),ut(o),new Kt(`${c} has unknown type ${p}`);return p},Cs=(o,c,p)=>{var g=[];return o=o.toWireType(g,p),g.length&&(ue()[c>>>2>>>0]=qe(g)),o};function ym(o,c,p){return c>>>=0,p>>>=0,o=Be(o>>>0),c=Ni(c,"emval::as"),Cs(c,p,o)}function _m(o,c){return c>>>=0,o=Be(o>>>0),(c=Ni(c,"emval::as")).toWireType(null,o)}var Pi=o=>{try{o()}catch(c){_t(c)}},$t=0,nt=null,Ss=0,Ui=[],Ts={},Is={},bm=0,Rr=null,wm=[];function ks(o){return(function(c){if(!j){if($t===0){var p=!1,g=!1;c((b=0)=>{if(!j&&(Ss=b,p=!0,g)){$t=2,Pi(()=>ro(nt)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),b=!1;try{var S=(function(){var N=B()[nt+8>>>2>>>0];return N=R[Is[N]],--bt,N()})()}catch(N){S=N,b=!0}var k=!1;if(!nt){var M=Rr;M&&(Rr=null,(b?M.reject:M.resolve)(S),k=!0)}if(b&&!k)throw S}}),g=!0,p||($t=1,nt=(function(){var b=qi(65548),S=b+12;ue()[b>>>2>>>0]=S,ue()[b+4>>>2>>>0]=S+65536,S=Ui[0];var k=Ts[S];return k===void 0&&(k=bm++,Ts[S]=k,Is[k]=S),S=k,B()[b+8>>>2>>>0]=S,b})(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),Pi(()=>to(nt)))}else $t===2?($t=0,Pi(no),ut(nt),nt=null,wm.forEach(Ar)):_t(`invalid state: ${$t}`);return Ss}})(c=>{o().then(c)})}function vm(o){return o>>>=0,ks(async()=>{var c=await Be(o);return qe(c)})}var Li=[];function $m(o,c,p,g){return p>>>=0,g>>>=0,(o=Li[o>>>0])(null,c=Be(c>>>0),p,g)}var xm={},Hi=o=>{var c=xm[o];return c===void 0?rt(o):c};function Cm(o,c,p,g,b){return p>>>=0,g>>>=0,b>>>=0,(o=Li[o>>>0])(c=Be(c>>>0),c[p=Hi(p)],g,b)}function Sm(o,c){return c>>>=0,(o=Be(o>>>0))==Be(c)}var Es=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Tm(o){return(o>>>=0)==0?qe(Es()):(o=Hi(o),qe(Es()[o]))}var Im=o=>{var c=Li.length;return Li.push(o),c},km=(o,c)=>{for(var p=Array(o),g=0;g<o;++g)p[g]=Ni(ue()[c+4*g>>>2>>>0],`parameter ${g}`);return p};function Em(o,c,p){var g=(c=km(o,c>>>0)).shift();o--;var b=`return function (obj, func, destructorsRef, args) {
`,S=0,k=[];p===0&&k.push("obj");for(var M=["retType"],N=[g],H=0;H<o;++H)k.push(`arg${H}`),M.push(`argType${H}`),N.push(c[H]),b+=`  var arg${H} = argType${H}.readValueFromPointer(args${S?"+"+S:""});
`,S+=c[H].Cb;return b+=`  var rv = ${p===1?"new func":"func.call"}(${k.join(", ")});
`,g.Ub||(M.push("emval_returnValue"),N.push(Cs),b+=`  return emval_returnValue(retType, destructorsRef, rv);
`),o=new Function(...M,b+`};
`)(...N),p=`methodCaller<(${c.map(Z=>Z.name).join(", ")}) => ${g.name}>`,Im(Object.defineProperty(o,"name",{value:p}))}function zm(o){return o=Hi(o>>>0),qe(i[o])}function Am(o,c){return c>>>=0,o=Be(o>>>0),c=Be(c),qe(o[c])}function Mm(o){9<(o>>>=0)&&(lt[o+1]+=1)}function Om(){return qe([])}function Rm(o){o=Be(o>>>0);for(var c=Array(o.length),p=0;p<o.length;p++)c[p]=o[p];return qe(c)}function Dm(o){return qe(Hi(o>>>0))}function Bm(){return qe({})}function Nm(o){for(var c=Be(o>>>=0);c.length;){var p=c.pop();c.pop()(p)}kr(o)}function Pm(o,c,p){c>>>=0,p>>>=0,o=Be(o>>>0),c=Be(c),p=Be(p),o[c]=p}function Um(o,c){return c>>>=0,o=(o=Ni(o>>>0,"_emval_take_value")).readValueFromPointer(c),qe(o)}function Lm(o,c){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),c>>>=0,o=new Date(1e3*o),B()[c>>>2>>>0]=o.getUTCSeconds(),B()[c+4>>>2>>>0]=o.getUTCMinutes(),B()[c+8>>>2>>>0]=o.getUTCHours(),B()[c+12>>>2>>>0]=o.getUTCDate(),B()[c+16>>>2>>>0]=o.getUTCMonth(),B()[c+20>>>2>>>0]=o.getUTCFullYear()-1900,B()[c+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,B()[c+28>>>2>>>0]=o}var zs=o=>o%4==0&&(o%100!=0||o%400==0),As=[0,31,60,91,121,152,182,213,244,274,305,335],Ms=[0,31,59,90,120,151,181,212,243,273,304,334];function Hm(o,c){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),c>>>=0,o=new Date(1e3*o),B()[c>>>2>>>0]=o.getSeconds(),B()[c+4>>>2>>>0]=o.getMinutes(),B()[c+8>>>2>>>0]=o.getHours(),B()[c+12>>>2>>>0]=o.getDate(),B()[c+16>>>2>>>0]=o.getMonth(),B()[c+20>>>2>>>0]=o.getFullYear()-1900,B()[c+24>>>2>>>0]=o.getDay();var p=(zs(o.getFullYear())?As:Ms)[o.getMonth()]+o.getDate()-1|0;B()[c+28>>>2>>>0]=p,B()[c+36>>>2>>>0]=-60*o.getTimezoneOffset(),p=new Date(o.getFullYear(),6,1).getTimezoneOffset();var g=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(p!=g&&o.getTimezoneOffset()==Math.min(g,p)),B()[c+32>>>2>>>0]=o}function Wm(o){o>>>=0;var c=new Date(B()[o+20>>>2>>>0]+1900,B()[o+16>>>2>>>0],B()[o+12>>>2>>>0],B()[o+8>>>2>>>0],B()[o+4>>>2>>>0],B()[o>>>2>>>0],0),p=B()[o+32>>>2>>>0],g=c.getTimezoneOffset(),b=new Date(c.getFullYear(),6,1).getTimezoneOffset(),S=new Date(c.getFullYear(),0,1).getTimezoneOffset(),k=Math.min(S,b);return 0>p?B()[o+32>>>2>>>0]=+(b!=S&&k==g):0<p!=(k==g)&&(b=Math.max(S,b),c.setTime(c.getTime()+6e4*((0<p?k:b)-g))),B()[o+24>>>2>>>0]=c.getDay(),p=(zs(c.getFullYear())?As:Ms)[c.getMonth()]+c.getDate()-1|0,B()[o+28>>>2>>>0]=p,B()[o>>>2>>>0]=c.getSeconds(),B()[o+4>>>2>>>0]=c.getMinutes(),B()[o+8>>>2>>>0]=c.getHours(),B()[o+12>>>2>>>0]=c.getDate(),B()[o+16>>>2>>>0]=c.getMonth(),B()[o+20>>>2>>>0]=c.getYear(),o=c.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function Os(o,c,p,g,b,S,k){return l?ve(16,1,o,c,p,g,b,S,k):-52}function Rs(o,c,p,g,b,S){if(l)return ve(17,1,o,c,p,g,b,S)}var oi={},Fm=()=>performance.timeOrigin+performance.now();function Ds(o,c){if(l)return ve(18,1,o,c);if(oi[o]&&(clearTimeout(oi[o].id),delete oi[o]),!c)return 0;var p=setTimeout(()=>{delete oi[o],Ar(()=>Xs(o,performance.timeOrigin+performance.now()))},c);return oi[o]={id:p,rc:c},0}function qm(o,c,p,g){o>>>=0,c>>>=0,p>>>=0,g>>>=0;var b=new Date().getFullYear(),S=new Date(b,0,1).getTimezoneOffset();b=new Date(b,6,1).getTimezoneOffset();var k=Math.max(S,b);ue()[o>>>2>>>0]=60*k,B()[c>>>2>>>0]=+(S!=b),o=(c=M=>{var N=Math.abs(M);return`UTC${0<=M?"-":"+"}${String(Math.floor(N/60)).padStart(2,"0")}${String(N%60).padStart(2,"0")}`})(S),c=c(b),b<S?(zt(o,p,17),zt(c,g,17)):(zt(o,g,17),zt(c,p,17))}var Vm=()=>Date.now();function Gm(o,c,p){return 0<=o&&3>=o?(o===0?o=Date.now():o=performance.timeOrigin+performance.now(),V[p>>>0>>>3]=BigInt(Math.round(1e6*o)),0):28}var Dr=[],Bs=(o,c)=>{Dr.length=0;for(var p;p=W()[o++>>>0];){var g=p!=105;c+=(g&=p!=112)&&c%8?4:0,Dr.push(p==112?ue()[c>>>2>>>0]:p==106?V[c>>>3]:p==105?B()[c>>>2>>>0]:be()[c>>>3>>>0]),c+=g?8:4}return Dr};function jm(o,c,p){return o>>>=0,c=Bs(c>>>0,p>>>0),Pr[o](...c)}function Km(o,c,p){return o>>>=0,c=Bs(c>>>0,p>>>0),Pr[o](...c)}var Zm=()=>{};function Ym(o,c){return ae(Te(o>>>0,c>>>0))}var Xm=()=>{throw bt+=1,"unwind"};function Jm(){return 4294901760}var Qm=()=>navigator.hardwareConcurrency;function eg(){return _t("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function tg(o){o>>>=0;var c=W().length;if(o<=c||4294901760<o)return!1;for(var p=1;4>=p;p*=2){var g=c*(1+.2/p);g=Math.min(g,o+100663296);e:{g=(Math.min(4294901760,65536*Math.ceil(Math.max(o,g)/65536))-$.buffer.byteLength+65535)/65536|0;try{$.grow(g),Se();var b=1;break e}catch{}b=void 0}if(b)return!0}return!1}var Wi=()=>(_t("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),li={},Ns=o=>{o.forEach(c=>{Wi()})};function ig(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),Ns(o),li.Mb=Wi(),li.dc=o,li.Mb}function rg(o,c,p){if(o>>>=0,c>>>=0,li.Mb==o)var g=li.dc;else(g=Error().stack.toString().split(`
`))[0]=="Error"&&g.shift(),Ns(g);for(var b=3;g[b]&&Wi()!=o;)++b;for(o=0;o<p&&g[o+b];++o)B()[c+4*o>>>2>>>0]=Wi();return o}var Br,Nr={},Ps=()=>{if(!Br){var o,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in Nr)Nr[o]===void 0?delete c[o]:c[o]=Nr[o];var p=[];for(o in c)p.push(`${o}=${c[o]}`);Br=p}return Br};function Us(o,c){if(l)return ve(19,1,o,c);o>>>=0,c>>>=0;var p,g=0,b=0;for(p of Ps()){var S=c+g;ue()[o+b>>>2>>>0]=S,g+=zt(p,S,1/0)+1,b+=4}return 0}function Ls(o,c){if(l)return ve(20,1,o,c);o>>>=0,c>>>=0;var p=Ps();for(var g of(ue()[o>>>2>>>0]=p.length,o=0,p))o+=zr(g)+1;return ue()[c>>>2>>>0]=o,0}function Hs(o){return l?ve(21,1,o):52}function Ws(o,c,p,g){return l?ve(22,1,o,c,p,g):52}function Fs(o,c,p,g){return l?ve(23,1,o,c,p,g):70}var ng=[null,[],[]];function qs(o,c,p,g){if(l)return ve(24,1,o,c,p,g);c>>>=0,p>>>=0,g>>>=0;for(var b=0,S=0;S<p;S++){var k=ue()[c>>>2>>>0],M=ue()[c+4>>>2>>>0];c+=8;for(var N=0;N<M;N++){var H=o,Z=W()[k+N>>>0],te=ng[H];Z===0||Z===10?((H===1?K:ae)(os(te)),te.length=0):te.push(Z)}b+=M}return ue()[g>>>2>>>0]=b,0}l||(function(){for(var o=i.numThreads-1;o--;)rs();$r.push(()=>{ni++,(function(c){l?c():Promise.all(wt.map(is)).then(c)})(()=>Ka())})})();for(var Vs=Array(256),Fi=0;256>Fi;++Fi)Vs[Fi]=String.fromCharCode(Fi);vs=Vs,lt.push(0,1,void 0,1,null,1,!0,1,!1,1),i.count_emval_handles=()=>lt.length/2-5-Ir.length,l||($=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Se()),i.wasmBinary&&(x=i.wasmBinary),i.stackSave=()=>Fr(),i.stackRestore=o=>Vi(o),i.stackAlloc=o=>Wr(o),i.setValue=function(o,c,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":U()[o>>>0]=c;break;case"i16":re()[o>>>1>>>0]=c;break;case"i32":B()[o>>>2>>>0]=c;break;case"i64":V[o>>>3]=BigInt(c);break;case"float":it()[o>>>2>>>0]=c;break;case"double":be()[o>>>3>>>0]=c;break;case"*":ue()[o>>>2>>>0]=c;break;default:_t(`invalid type for setValue: ${p}`)}},i.getValue=function(o,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return U()[o>>>0];case"i16":return re()[o>>>1>>>0];case"i32":return B()[o>>>2>>>0];case"i64":return V[o>>>3];case"float":return it()[o>>>2>>>0];case"double":return be()[o>>>3>>>0];case"*":return ue()[o>>>2>>>0];default:_t(`invalid type for getValue: ${c}`)}},i.UTF8ToString=Te,i.stringToUTF8=zt,i.lengthBytesUTF8=zr;var ag=[xr,Ja,ns,ls,us,ds,cs,hs,ps,fs,ms,gs,ys,_s,bs,ws,Os,Rs,Ds,Us,Ls,Hs,Ws,Fs,qs],Pr={893836:(o,c,p,g,b)=>{if(i===void 0||!i.Fb)return 1;if((o=Te(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=i.Fb.get(o)))return 2;if(c=Number(c>>>0),p=Number(p>>>0),g=Number(g>>>0),c+p>o.byteLength)return 3;try{let S=o.subarray(c,c+p);switch(b){case 0:W().set(S,g>>>0);break;case 1:i.mc?i.mc(g,S):i.cc(g,S);break;default:return 4}return 0}catch{return 4}},894660:(o,c,p)=>{i.Pb(o,W().subarray(c>>>0,c+p>>>0))},894724:()=>i.oc(),894766:o=>{i.Ob(o)},894803:()=>{i.Wb()},894834:()=>{i.Xb()},894863:()=>{i.ac()},894888:o=>i.Vb(o),894921:o=>i.Zb(o),894953:(o,c,p)=>{i.Lb(Number(o),Number(c),Number(p),!0)},895016:(o,c,p)=>{i.Lb(Number(o),Number(c),Number(p))},895073:()=>typeof wasmOffsetConverter<"u",895130:o=>{i.Ab("Abs",o,void 0)},895181:o=>{i.Ab("Neg",o,void 0)},895232:o=>{i.Ab("Floor",o,void 0)},895285:o=>{i.Ab("Ceil",o,void 0)},895337:o=>{i.Ab("Reciprocal",o,void 0)},895395:o=>{i.Ab("Sqrt",o,void 0)},895447:o=>{i.Ab("Exp",o,void 0)},895498:o=>{i.Ab("Erf",o,void 0)},895549:o=>{i.Ab("Sigmoid",o,void 0)},895604:(o,c,p)=>{i.Ab("HardSigmoid",o,{alpha:c,beta:p})},895683:o=>{i.Ab("Log",o,void 0)},895734:o=>{i.Ab("Sin",o,void 0)},895785:o=>{i.Ab("Cos",o,void 0)},895836:o=>{i.Ab("Tan",o,void 0)},895887:o=>{i.Ab("Asin",o,void 0)},895939:o=>{i.Ab("Acos",o,void 0)},895991:o=>{i.Ab("Atan",o,void 0)},896043:o=>{i.Ab("Sinh",o,void 0)},896095:o=>{i.Ab("Cosh",o,void 0)},896147:o=>{i.Ab("Asinh",o,void 0)},896200:o=>{i.Ab("Acosh",o,void 0)},896253:o=>{i.Ab("Atanh",o,void 0)},896306:o=>{i.Ab("Tanh",o,void 0)},896358:o=>{i.Ab("Not",o,void 0)},896409:(o,c,p)=>{i.Ab("Clip",o,{min:c,max:p})},896478:o=>{i.Ab("Clip",o,void 0)},896530:(o,c)=>{i.Ab("Elu",o,{alpha:c})},896588:o=>{i.Ab("Gelu",o,void 0)},896640:o=>{i.Ab("Relu",o,void 0)},896692:(o,c)=>{i.Ab("LeakyRelu",o,{alpha:c})},896756:(o,c)=>{i.Ab("ThresholdedRelu",o,{alpha:c})},896826:(o,c)=>{i.Ab("Cast",o,{to:c})},896884:o=>{i.Ab("Add",o,void 0)},896935:o=>{i.Ab("Sub",o,void 0)},896986:o=>{i.Ab("Mul",o,void 0)},897037:o=>{i.Ab("Div",o,void 0)},897088:o=>{i.Ab("Pow",o,void 0)},897139:o=>{i.Ab("Equal",o,void 0)},897192:o=>{i.Ab("Greater",o,void 0)},897247:o=>{i.Ab("GreaterOrEqual",o,void 0)},897309:o=>{i.Ab("Less",o,void 0)},897361:o=>{i.Ab("LessOrEqual",o,void 0)},897420:(o,c,p,g,b)=>{i.Ab("ReduceMean",o,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},897595:(o,c,p,g,b)=>{i.Ab("ReduceMax",o,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},897769:(o,c,p,g,b)=>{i.Ab("ReduceMin",o,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},897943:(o,c,p,g,b)=>{i.Ab("ReduceProd",o,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898118:(o,c,p,g,b)=>{i.Ab("ReduceSum",o,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898292:(o,c,p,g,b)=>{i.Ab("ReduceL1",o,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898465:(o,c,p,g,b)=>{i.Ab("ReduceL2",o,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898638:(o,c,p,g,b)=>{i.Ab("ReduceLogSum",o,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898815:(o,c,p,g,b)=>{i.Ab("ReduceSumSquare",o,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898995:(o,c,p,g,b)=>{i.Ab("ReduceLogSumExp",o,{keepDims:!!c,noopWithEmptyAxes:!!p,axes:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},899175:o=>{i.Ab("Where",o,void 0)},899228:(o,c,p)=>{i.Ab("Transpose",o,{perm:c?Array.from(B().subarray(Number(c)>>>0,Number(p)>>>0)):[]})},899352:(o,c,p,g)=>{i.Ab("DepthToSpace",o,{blocksize:c,mode:Te(p),format:g?"NHWC":"NCHW"})},899485:(o,c,p,g)=>{i.Ab("DepthToSpace",o,{blocksize:c,mode:Te(p),format:g?"NHWC":"NCHW"})},899618:(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie)=>{i.Ab("ConvTranspose",o,{format:N?"NHWC":"NCHW",autoPad:c,dilations:[p],group:g,kernelShape:[b],pads:[S,k],strides:[M],wIsConst:()=>!!U()[H>>>0],outputPadding:Z?Array.from(B().subarray(Number(Z)>>>0,Number(te)>>>0)):[],outputShape:le?Array.from(B().subarray(Number(le)>>>0,Number(pe)>>>0)):[],activation:Te(Ie)})},900051:(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe)=>{i.Ab("ConvTranspose",o,{format:M?"NHWC":"NCHW",autoPad:c,dilations:Array.from(B().subarray(Number(p)>>>0,2+(Number(p)>>>0)>>>0)),group:g,kernelShape:Array.from(B().subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),pads:Array.from(B().subarray(Number(S)>>>0,4+(Number(S)>>>0)>>>0)),strides:Array.from(B().subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),wIsConst:()=>!!U()[N>>>0],outputPadding:H?Array.from(B().subarray(Number(H)>>>0,Number(Z)>>>0)):[],outputShape:te?Array.from(B().subarray(Number(te)>>>0,Number(le)>>>0)):[],activation:Te(pe)})},900712:(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie)=>{i.Ab("ConvTranspose",o,{format:N?"NHWC":"NCHW",autoPad:c,dilations:[p],group:g,kernelShape:[b],pads:[S,k],strides:[M],wIsConst:()=>!!U()[H>>>0],outputPadding:Z?Array.from(B().subarray(Number(Z)>>>0,Number(te)>>>0)):[],outputShape:le?Array.from(B().subarray(Number(le)>>>0,Number(pe)>>>0)):[],activation:Te(Ie)})},901145:(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe)=>{i.Ab("ConvTranspose",o,{format:M?"NHWC":"NCHW",autoPad:c,dilations:Array.from(B().subarray(Number(p)>>>0,2+(Number(p)>>>0)>>>0)),group:g,kernelShape:Array.from(B().subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),pads:Array.from(B().subarray(Number(S)>>>0,4+(Number(S)>>>0)>>>0)),strides:Array.from(B().subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),wIsConst:()=>!!U()[N>>>0],outputPadding:H?Array.from(B().subarray(Number(H)>>>0,Number(Z)>>>0)):[],outputShape:te?Array.from(B().subarray(Number(te)>>>0,Number(le)>>>0)):[],activation:Te(pe)})},901806:(o,c)=>{i.Ab("GlobalAveragePool",o,{format:c?"NHWC":"NCHW"})},901897:(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe)=>{i.Ab("AveragePool",o,{format:pe?"NHWC":"NCHW",auto_pad:c,ceil_mode:p,count_include_pad:g,storage_order:b,dilations:S?Array.from(B().subarray(Number(S)>>>0,Number(k)>>>0)):[],kernel_shape:M?Array.from(B().subarray(Number(M)>>>0,Number(N)>>>0)):[],pads:H?Array.from(B().subarray(Number(H)>>>0,Number(Z)>>>0)):[],strides:te?Array.from(B().subarray(Number(te)>>>0,Number(le)>>>0)):[]})},902376:(o,c)=>{i.Ab("GlobalAveragePool",o,{format:c?"NHWC":"NCHW"})},902467:(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe)=>{i.Ab("AveragePool",o,{format:pe?"NHWC":"NCHW",auto_pad:c,ceil_mode:p,count_include_pad:g,storage_order:b,dilations:S?Array.from(B().subarray(Number(S)>>>0,Number(k)>>>0)):[],kernel_shape:M?Array.from(B().subarray(Number(M)>>>0,Number(N)>>>0)):[],pads:H?Array.from(B().subarray(Number(H)>>>0,Number(Z)>>>0)):[],strides:te?Array.from(B().subarray(Number(te)>>>0,Number(le)>>>0)):[]})},902946:(o,c)=>{i.Ab("GlobalMaxPool",o,{format:c?"NHWC":"NCHW"})},903033:(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe)=>{i.Ab("MaxPool",o,{format:pe?"NHWC":"NCHW",auto_pad:c,ceil_mode:p,count_include_pad:g,storage_order:b,dilations:S?Array.from(B().subarray(Number(S)>>>0,Number(k)>>>0)):[],kernel_shape:M?Array.from(B().subarray(Number(M)>>>0,Number(N)>>>0)):[],pads:H?Array.from(B().subarray(Number(H)>>>0,Number(Z)>>>0)):[],strides:te?Array.from(B().subarray(Number(te)>>>0,Number(le)>>>0)):[]})},903508:(o,c)=>{i.Ab("GlobalMaxPool",o,{format:c?"NHWC":"NCHW"})},903595:(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe)=>{i.Ab("MaxPool",o,{format:pe?"NHWC":"NCHW",auto_pad:c,ceil_mode:p,count_include_pad:g,storage_order:b,dilations:S?Array.from(B().subarray(Number(S)>>>0,Number(k)>>>0)):[],kernel_shape:M?Array.from(B().subarray(Number(M)>>>0,Number(N)>>>0)):[],pads:H?Array.from(B().subarray(Number(H)>>>0,Number(Z)>>>0)):[],strides:te?Array.from(B().subarray(Number(te)>>>0,Number(le)>>>0)):[]})},904070:(o,c,p,g,b)=>{i.Ab("Gemm",o,{alpha:c,beta:p,transA:g,transB:b})},904174:o=>{i.Ab("MatMul",o,void 0)},904228:(o,c,p,g)=>{i.Ab("ArgMax",o,{keepDims:!!c,selectLastIndex:!!p,axis:g})},904336:(o,c,p,g)=>{i.Ab("ArgMin",o,{keepDims:!!c,selectLastIndex:!!p,axis:g})},904444:(o,c)=>{i.Ab("Softmax",o,{axis:c})},904507:(o,c)=>{i.Ab("Concat",o,{axis:c})},904567:(o,c,p,g,b)=>{i.Ab("Split",o,{axis:c,numOutputs:p,splitSizes:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},904723:o=>{i.Ab("Expand",o,void 0)},904777:(o,c)=>{i.Ab("Gather",o,{axis:Number(c)})},904848:(o,c)=>{i.Ab("GatherElements",o,{axis:Number(c)})},904927:(o,c)=>{i.Ab("GatherND",o,{batch_dims:Number(c)})},905006:(o,c,p,g,b,S,k,M,N,H,Z)=>{i.Ab("Resize",o,{antialias:c,axes:p?Array.from(B().subarray(Number(p)>>>0,Number(g)>>>0)):[],coordinateTransformMode:Te(b),cubicCoeffA:S,excludeOutside:k,extrapolationValue:M,keepAspectRatioPolicy:Te(N),mode:Te(H),nearestMode:Te(Z)})},905368:(o,c,p,g,b,S,k)=>{i.Ab("Slice",o,{starts:c?Array.from(B().subarray(Number(c)>>>0,Number(p)>>>0)):[],ends:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[],axes:S?Array.from(B().subarray(Number(S)>>>0,Number(k)>>>0)):[]})},905632:o=>{i.Ab("Tile",o,void 0)},905684:(o,c,p)=>{i.Ab("InstanceNormalization",o,{epsilon:c,format:p?"NHWC":"NCHW"})},905798:(o,c,p)=>{i.Ab("InstanceNormalization",o,{epsilon:c,format:p?"NHWC":"NCHW"})},905912:o=>{i.Ab("Range",o,void 0)},905965:(o,c)=>{i.Ab("Einsum",o,{equation:Te(c)})},906046:(o,c,p,g,b)=>{i.Ab("Pad",o,{mode:c,value:p,pads:g?Array.from(B().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},906189:(o,c,p,g,b,S)=>{i.Ab("BatchNormalization",o,{epsilon:c,momentum:p,spatial:!!b,trainingMode:!!g,format:S?"NHWC":"NCHW"})},906358:(o,c,p,g,b,S)=>{i.Ab("BatchNormalization",o,{epsilon:c,momentum:p,spatial:!!b,trainingMode:!!g,format:S?"NHWC":"NCHW"})},906527:(o,c,p)=>{i.Ab("CumSum",o,{exclusive:Number(c),reverse:Number(p)})},906624:(o,c,p)=>{i.Ab("DequantizeLinear",o,{axis:c,blockSize:p})},906714:(o,c,p,g,b)=>{i.Ab("GridSample",o,{align_corners:c,mode:Te(p),padding_mode:Te(g),format:b?"NHWC":"NCHW"})},906884:(o,c,p,g,b)=>{i.Ab("GridSample",o,{align_corners:c,mode:Te(p),padding_mode:Te(g),format:b?"NHWC":"NCHW"})},907054:(o,c)=>{i.Ab("ScatterND",o,{reduction:Te(c)})},907139:(o,c,p,g,b,S,k,M,N)=>{i.Ab("Attention",o,{numHeads:c,isUnidirectional:p,maskFilterValue:g,scale:b,doRotary:S,qkvHiddenSizes:k?Array.from(B().subarray(Number(M)>>>0,Number(M)+k>>>0)):[],pastPresentShareBuffer:!!N})},907411:o=>{i.Ab("BiasAdd",o,void 0)},907466:o=>{i.Ab("BiasSplitGelu",o,void 0)},907527:o=>{i.Ab("FastGelu",o,void 0)},907583:(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe)=>{i.Ab("Conv",o,{format:te?"NHWC":"NCHW",auto_pad:c,dilations:p?Array.from(B().subarray(Number(p)>>>0,Number(g)>>>0)):[],group:b,kernel_shape:S?Array.from(B().subarray(Number(S)>>>0,Number(k)>>>0)):[],pads:M?Array.from(B().subarray(Number(M)>>>0,Number(N)>>>0)):[],strides:H?Array.from(B().subarray(Number(H)>>>0,Number(Z)>>>0)):[],w_is_const:()=>!!U()[Number(le)>>>0],activation:Te(pe),activation_params:Ie?Array.from(it().subarray(Number(Ie)>>>0,Number(Pe)>>>0)):[]})},908167:o=>{i.Ab("Gelu",o,void 0)},908219:(o,c,p,g,b,S,k,M,N)=>{i.Ab("GroupQueryAttention",o,{numHeads:c,kvNumHeads:p,scale:g,softcap:b,doRotary:S,rotaryInterleaved:k,smoothSoftmax:M,localWindowSize:N})},908436:(o,c,p,g)=>{i.Ab("LayerNormalization",o,{axis:c,epsilon:p,simplified:!!g})},908547:(o,c,p,g)=>{i.Ab("LayerNormalization",o,{axis:c,epsilon:p,simplified:!!g})},908658:(o,c,p,g,b,S)=>{i.Ab("MatMulNBits",o,{k:c,n:p,accuracyLevel:g,bits:b,blockSize:S})},908785:(o,c,p,g,b,S)=>{i.Ab("MultiHeadAttention",o,{numHeads:c,isUnidirectional:p,maskFilterValue:g,scale:b,doRotary:S})},908944:(o,c)=>{i.Ab("QuickGelu",o,{alpha:c})},909008:(o,c,p,g,b)=>{i.Ab("RotaryEmbedding",o,{interleaved:!!c,numHeads:p,rotaryEmbeddingDim:g,scale:b})},909147:(o,c,p)=>{i.Ab("SkipLayerNormalization",o,{epsilon:c,simplified:!!p})},909249:(o,c,p)=>{i.Ab("SkipLayerNormalization",o,{epsilon:c,simplified:!!p})},909351:(o,c,p,g)=>{i.Ab("GatherBlockQuantized",o,{gatherAxis:c,quantizeAxis:p,blockSize:g})},909472:o=>{i.$b(o)},909506:(o,c)=>i.bc(Number(o),Number(c),i.Gb.ec,i.Gb.errors)};function sg(o,c,p){return ks(async()=>{await i.Yb(Number(o),Number(c),Number(p))})}function og(){return typeof wasmOffsetConverter<"u"}var R=await(async function(){function o(g,b){return R=g.exports,R=(function(){var S=R,k={};for(let[M,N]of Object.entries(S))k[M]=typeof N=="function"?(...H)=>{Ui.push(M);try{return N(...H)}finally{j||(Ui.pop(),nt&&$t===1&&Ui.length===0&&($t=0,bt+=1,Pi(io),typeof Fibers<"u"&&Fibers.sc()))}}:N;return k})(),R=(function(){var S=R,k=N=>H=>N(H)>>>0,M=N=>()=>N()>>>0;return(S=Object.assign({},S)).Ea=k(S.Ea),S.gb=M(S.gb),S.ib=k(S.ib),S.tb=k(S.tb),S.ub=M(S.ub),S.__cxa_get_exception_ptr=k(S.__cxa_get_exception_ptr),S})(),Qa.push(R.jb),v=b,Ka(),R}ni++;var c=Za();if(i.instantiateWasm)return new Promise(g=>{i.instantiateWasm(c,(b,S)=>{g(o(b,S))})});if(l)return new Promise(g=>{q=b=>{var S=new WebAssembly.Instance(b,Za());g(o(S,b))}});ri??=i.locateFile?i.locateFile?i.locateFile("ort-wasm-simd-threaded.jsep.wasm",w):w+"ort-wasm-simd-threaded.jsep.wasm":new URL(""+new URL("ort-wasm-simd-threaded.jsep-BGTZ4Y7F.wasm",import.meta.url).href,import.meta.url).href;try{var p=await(async function(g){var b=ri;if(!x&&typeof WebAssembly.instantiateStreaming=="function"&&!ye(b))try{var S=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(S,g)}catch(k){ae(`wasm streaming compile failed: ${k}`),ae("falling back to ArrayBuffer instantiation")}return(async function(k,M){try{var N=await(async function(H){if(!x)try{var Z=await f(H);return new Uint8Array(Z)}catch{}if(H==ri&&x)H=new Uint8Array(x);else{if(!m)throw"both async and sync fetching of the wasm failed";H=m(H)}return H})(k);return await WebAssembly.instantiate(N,M)}catch(H){ae(`failed to asynchronously prepare wasm: ${H}`),_t(H)}})(b,g)})(c);return o(p.instance,p.module)}catch(g){return r(g),Promise.reject(g)}})(),Gs=o=>(Gs=R.Ea)(o),js=()=>(js=R.Fa)();i._OrtInit=(o,c)=>(i._OrtInit=R.Ga)(o,c),i._OrtGetLastError=(o,c)=>(i._OrtGetLastError=R.Ha)(o,c),i._OrtCreateSessionOptions=(o,c,p,g,b,S,k,M,N,H)=>(i._OrtCreateSessionOptions=R.Ia)(o,c,p,g,b,S,k,M,N,H),i._OrtAppendExecutionProvider=(o,c,p,g,b)=>(i._OrtAppendExecutionProvider=R.Ja)(o,c,p,g,b),i._OrtAddFreeDimensionOverride=(o,c,p)=>(i._OrtAddFreeDimensionOverride=R.Ka)(o,c,p),i._OrtAddSessionConfigEntry=(o,c,p)=>(i._OrtAddSessionConfigEntry=R.La)(o,c,p),i._OrtReleaseSessionOptions=o=>(i._OrtReleaseSessionOptions=R.Ma)(o),i._OrtCreateSession=(o,c,p)=>(i._OrtCreateSession=R.Na)(o,c,p),i._OrtReleaseSession=o=>(i._OrtReleaseSession=R.Oa)(o),i._OrtGetInputOutputCount=(o,c,p)=>(i._OrtGetInputOutputCount=R.Pa)(o,c,p),i._OrtGetInputOutputMetadata=(o,c,p,g)=>(i._OrtGetInputOutputMetadata=R.Qa)(o,c,p,g),i._OrtFree=o=>(i._OrtFree=R.Ra)(o),i._OrtCreateTensor=(o,c,p,g,b,S)=>(i._OrtCreateTensor=R.Sa)(o,c,p,g,b,S),i._OrtGetTensorData=(o,c,p,g,b)=>(i._OrtGetTensorData=R.Ta)(o,c,p,g,b),i._OrtReleaseTensor=o=>(i._OrtReleaseTensor=R.Ua)(o),i._OrtCreateRunOptions=(o,c,p,g)=>(i._OrtCreateRunOptions=R.Va)(o,c,p,g),i._OrtAddRunConfigEntry=(o,c,p)=>(i._OrtAddRunConfigEntry=R.Wa)(o,c,p),i._OrtReleaseRunOptions=o=>(i._OrtReleaseRunOptions=R.Xa)(o),i._OrtCreateBinding=o=>(i._OrtCreateBinding=R.Ya)(o),i._OrtBindInput=(o,c,p)=>(i._OrtBindInput=R.Za)(o,c,p),i._OrtBindOutput=(o,c,p,g)=>(i._OrtBindOutput=R._a)(o,c,p,g),i._OrtClearBoundOutputs=o=>(i._OrtClearBoundOutputs=R.$a)(o),i._OrtReleaseBinding=o=>(i._OrtReleaseBinding=R.ab)(o),i._OrtRunWithBinding=(o,c,p,g,b)=>(i._OrtRunWithBinding=R.bb)(o,c,p,g,b),i._OrtRun=(o,c,p,g,b,S,k,M)=>(i._OrtRun=R.cb)(o,c,p,g,b,S,k,M),i._OrtEndProfiling=o=>(i._OrtEndProfiling=R.db)(o),i._JsepOutput=(o,c,p)=>(i._JsepOutput=R.eb)(o,c,p),i._JsepGetNodeName=o=>(i._JsepGetNodeName=R.fb)(o);var Ur=()=>(Ur=R.gb)(),ut=i._free=o=>(ut=i._free=R.hb)(o),qi=i._malloc=o=>(qi=i._malloc=R.ib)(o),Lr=(o,c,p,g,b,S)=>(Lr=R.kb)(o,c,p,g,b,S),Ks=()=>(Ks=R.lb)(),Zs=(o,c,p,g,b)=>(Zs=R.mb)(o,c,p,g,b),Ys=o=>(Ys=R.nb)(o),Hr=o=>(Hr=R.ob)(o),Xs=(o,c)=>(Xs=R.pb)(o,c),Js=()=>(Js=R.qb)(),Qs=(o,c)=>(Qs=R.rb)(o,c),Vi=o=>(Vi=R.sb)(o),Wr=o=>(Wr=R.tb)(o),Fr=()=>(Fr=R.ub)(),eo=i.dynCall_ii=(o,c)=>(eo=i.dynCall_ii=R.vb)(o,c);i.dynCall_vii=(o,c,p)=>(i.dynCall_vii=R.dynCall_vii)(o,c,p),i.dynCall_iiiii=(o,c,p,g,b)=>(i.dynCall_iiiii=R.dynCall_iiiii)(o,c,p,g,b),i.dynCall_iii=(o,c,p)=>(i.dynCall_iii=R.dynCall_iii)(o,c,p),i.dynCall_iiiiii=(o,c,p,g,b,S)=>(i.dynCall_iiiiii=R.dynCall_iiiiii)(o,c,p,g,b,S),i.dynCall_iiiiiiii=(o,c,p,g,b,S,k,M)=>(i.dynCall_iiiiiiii=R.dynCall_iiiiiiii)(o,c,p,g,b,S,k,M),i.dynCall_iiiiiii=(o,c,p,g,b,S,k)=>(i.dynCall_iiiiiii=R.dynCall_iiiiiii)(o,c,p,g,b,S,k),i.dynCall_vi=(o,c)=>(i.dynCall_vi=R.dynCall_vi)(o,c),i.dynCall_iiii=(o,c,p,g)=>(i.dynCall_iiii=R.dynCall_iiii)(o,c,p,g),i.dynCall_i=o=>(i.dynCall_i=R.dynCall_i)(o),i.dynCall_viiiiiiii=(o,c,p,g,b,S,k,M,N)=>(i.dynCall_viiiiiiii=R.dynCall_viiiiiiii)(o,c,p,g,b,S,k,M,N),i.dynCall_viii=(o,c,p,g)=>(i.dynCall_viii=R.dynCall_viii)(o,c,p,g),i.dynCall_viijj=(o,c,p,g,b)=>(i.dynCall_viijj=R.dynCall_viijj)(o,c,p,g,b),i.dynCall_viiiiii=(o,c,p,g,b,S,k)=>(i.dynCall_viiiiii=R.dynCall_viiiiii)(o,c,p,g,b,S,k),i.dynCall_viiii=(o,c,p,g,b)=>(i.dynCall_viiii=R.dynCall_viiii)(o,c,p,g,b),i.dynCall_viiiii=(o,c,p,g,b,S)=>(i.dynCall_viiiii=R.dynCall_viiiii)(o,c,p,g,b,S),i.dynCall_vfiii=(o,c,p,g,b)=>(i.dynCall_vfiii=R.dynCall_vfiii)(o,c,p,g,b),i.dynCall_viiiiff=(o,c,p,g,b,S,k)=>(i.dynCall_viiiiff=R.dynCall_viiiiff)(o,c,p,g,b,S,k),i.dynCall_viiiiiff=(o,c,p,g,b,S,k,M)=>(i.dynCall_viiiiiff=R.dynCall_viiiiiff)(o,c,p,g,b,S,k,M),i.dynCall_ffff=(o,c,p,g)=>(i.dynCall_ffff=R.dynCall_ffff)(o,c,p,g),i.dynCall_viiff=(o,c,p,g,b)=>(i.dynCall_viiff=R.dynCall_viiff)(o,c,p,g,b),i.dynCall_fffffff=(o,c,p,g,b,S,k)=>(i.dynCall_fffffff=R.dynCall_fffffff)(o,c,p,g,b,S,k),i.dynCall_jjjjjjj=(o,c,p,g,b,S,k)=>(i.dynCall_jjjjjjj=R.dynCall_jjjjjjj)(o,c,p,g,b,S,k),i.dynCall_jjjjjj=(o,c,p,g,b,S)=>(i.dynCall_jjjjjj=R.dynCall_jjjjjj)(o,c,p,g,b,S),i.dynCall_iijjii=(o,c,p,g,b,S)=>(i.dynCall_iijjii=R.dynCall_iijjii)(o,c,p,g,b,S),i.dynCall_viiiiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe)=>(i.dynCall_viiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe),i.dynCall_viiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z)=>(i.dynCall_viiiiiiiiii=R.dynCall_viiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z),i.dynCall_viiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z,te)=>(i.dynCall_viiiiiiiiiii=R.dynCall_viiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z,te),i.dynCall_viiiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z,te,le)=>(i.dynCall_viiiiiiiiiiii=R.dynCall_viiiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z,te,le),i.dynCall_viiiiiiiiiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe,dt,At,ui)=>(i.dynCall_viiiiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe,dt,At,ui),i.dynCall_viiiiiiiii=(o,c,p,g,b,S,k,M,N,H)=>(i.dynCall_viiiiiiiii=R.dynCall_viiiiiiiii)(o,c,p,g,b,S,k,M,N,H),i.dynCall_viiiiiiiiiiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe,dt,At,ui,qr)=>(i.dynCall_viiiiiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe,dt,At,ui,qr),i.dynCall_viiiiiii=(o,c,p,g,b,S,k,M)=>(i.dynCall_viiiiiii=R.dynCall_viiiiiii)(o,c,p,g,b,S,k,M),i.dynCall_viiiiiiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe)=>(i.dynCall_viiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe),i.dynCall_jiji=(o,c,p,g)=>(i.dynCall_jiji=R.dynCall_jiji)(o,c,p,g),i.dynCall_v=o=>(i.dynCall_v=R.dynCall_v)(o),i.dynCall_iidiiii=(o,c,p,g,b,S,k)=>(i.dynCall_iidiiii=R.dynCall_iidiiii)(o,c,p,g,b,S,k),i.dynCall_iiiiiiiii=(o,c,p,g,b,S,k,M,N)=>(i.dynCall_iiiiiiiii=R.dynCall_iiiiiiiii)(o,c,p,g,b,S,k,M,N),i.dynCall_iiij=(o,c,p,g)=>(i.dynCall_iiij=R.dynCall_iiij)(o,c,p,g),i.dynCall_iiiiiiiiii=(o,c,p,g,b,S,k,M,N,H)=>(i.dynCall_iiiiiiiiii=R.dynCall_iiiiiiiiii)(o,c,p,g,b,S,k,M,N,H),i.dynCall_iiiiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z,te,le)=>(i.dynCall_iiiiiiiiiiiii=R.dynCall_iiiiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z,te,le),i.dynCall_iiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z)=>(i.dynCall_iiiiiiiiiii=R.dynCall_iiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z),i.dynCall_ji=(o,c)=>(i.dynCall_ji=R.dynCall_ji)(o,c),i.dynCall_iijii=(o,c,p,g,b)=>(i.dynCall_iijii=R.dynCall_iijii)(o,c,p,g,b),i.dynCall_vij=(o,c,p)=>(i.dynCall_vij=R.dynCall_vij)(o,c,p),i.dynCall_viiijii=(o,c,p,g,b,S,k)=>(i.dynCall_viiijii=R.dynCall_viiijii)(o,c,p,g,b,S,k),i.dynCall_viijiiiiiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe,dt,At)=>(i.dynCall_viijiiiiiiiiiiiiii=R.dynCall_viijiiiiiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe,dt,At),i.dynCall_viiiji=(o,c,p,g,b,S)=>(i.dynCall_viiiji=R.dynCall_viiiji)(o,c,p,g,b,S),i.dynCall_fiii=(o,c,p,g)=>(i.dynCall_fiii=R.dynCall_fiii)(o,c,p,g),i.dynCall_viijii=(o,c,p,g,b,S)=>(i.dynCall_viijii=R.dynCall_viijii)(o,c,p,g,b,S),i.dynCall_viij=(o,c,p,g)=>(i.dynCall_viij=R.dynCall_viij)(o,c,p,g),i.dynCall_jiij=(o,c,p,g)=>(i.dynCall_jiij=R.dynCall_jiij)(o,c,p,g),i.dynCall_fi=(o,c)=>(i.dynCall_fi=R.dynCall_fi)(o,c),i.dynCall_fii=(o,c,p)=>(i.dynCall_fii=R.dynCall_fii)(o,c,p),i.dynCall_jii=(o,c,p)=>(i.dynCall_jii=R.dynCall_jii)(o,c,p),i.dynCall_dii=(o,c,p)=>(i.dynCall_dii=R.dynCall_dii)(o,c,p),i.dynCall_fiiii=(o,c,p,g,b)=>(i.dynCall_fiiii=R.dynCall_fiiii)(o,c,p,g,b),i.dynCall_fif=(o,c,p)=>(i.dynCall_fif=R.dynCall_fif)(o,c,p),i.dynCall_jfi=(o,c,p)=>(i.dynCall_jfi=R.dynCall_jfi)(o,c,p),i.dynCall_viiiiiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie)=>(i.dynCall_viiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie),i.dynCall_viiiiiiiiiiiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe,dt,At,ui,qr,lg)=>(i.dynCall_viiiiiiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe,dt,At,ui,qr,lg),i.dynCall_viiiiiiiiiiiiiiii=(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe,dt)=>(i.dynCall_viiiiiiiiiiiiiiii=R.dynCall_viiiiiiiiiiiiiiii)(o,c,p,g,b,S,k,M,N,H,Z,te,le,pe,Ie,Pe,dt),i.dynCall_iif=(o,c,p)=>(i.dynCall_iif=R.dynCall_iif)(o,c,p),i.dynCall_jiiii=(o,c,p,g,b)=>(i.dynCall_jiiii=R.dynCall_jiiii)(o,c,p,g,b),i.dynCall_jiii=(o,c,p,g)=>(i.dynCall_jiii=R.dynCall_jiii)(o,c,p,g),i.dynCall_viif=(o,c,p,g)=>(i.dynCall_viif=R.dynCall_viif)(o,c,p,g),i.dynCall_viiij=(o,c,p,g,b)=>(i.dynCall_viiij=R.dynCall_viiij)(o,c,p,g,b),i.dynCall_viiiijii=(o,c,p,g,b,S,k,M)=>(i.dynCall_viiiijii=R.dynCall_viiiijii)(o,c,p,g,b,S,k,M),i.dynCall_iiiiij=(o,c,p,g,b,S)=>(i.dynCall_iiiiij=R.dynCall_iiiiij)(o,c,p,g,b,S),i.dynCall_iiiiid=(o,c,p,g,b,S)=>(i.dynCall_iiiiid=R.dynCall_iiiiid)(o,c,p,g,b,S),i.dynCall_iiiiijj=(o,c,p,g,b,S,k)=>(i.dynCall_iiiiijj=R.dynCall_iiiiijj)(o,c,p,g,b,S,k),i.dynCall_iiiiiijj=(o,c,p,g,b,S,k,M)=>(i.dynCall_iiiiiijj=R.dynCall_iiiiiijj)(o,c,p,g,b,S,k,M);var to=o=>(to=R.wb)(o),io=()=>(io=R.xb)(),ro=o=>(ro=R.yb)(o),no=()=>(no=R.zb)();return(function o(){if(0<ni)ai=o;else if(l)t(i),Di();else{for(;0<$r.length;)$r.shift()(i);0<ni?ai=o:(i.calledRun=!0,j||(Di(),t(i)))}})(),i.PTR_SIZE=4,n},yc=Yr,so=globalThis.self?.name?.startsWith("em-pthread"),so&&Yr()}),Xr,Yn,oo,Ue,_c,ji,lo,uo,Jr,co,Qr,bc,en,wc,wa=L(()=>{ba(),Xr=typeof location>"u"?void 0:location.origin,Yn=import.meta.url>"file:"&&import.meta.url<"file;",oo=()=>{{if(Yn){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Xr).href}return import.meta.url}},Ue=oo(),_c=()=>{if(Ue&&!Ue.startsWith("blob:"))return Ue.substring(0,Ue.lastIndexOf("/")+1)},ji=(e,t)=>{try{let r=t??Ue;return(r?new URL(e,r):new URL(e)).origin===Xr}catch{return!1}},lo=(e,t)=>{let r=t??Ue;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},uo=(e,t)=>`${t??"./"}${e}`,Jr=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},co=async e=>(await import(e)).default,Qr=(Eg(),Ai(fc)).default,bc=async()=>{if(!Ue)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(ji(Ue))return[void 0,Qr()];let e=await Jr(Ue);return[e,Qr(e)]},en=(zg(),Ai(gc)).default,wc=async(e,t,r,i)=>{let n=en&&!(e||t);if(n)if(Ue)n=ji(Ue);else if(i&&!r)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,en];{let s="ort-wasm-simd-threaded.jsep.mjs",a=e??lo(s,t),l=r&&a&&!ji(a,t),u=l?await Jr(a):a??uo(s,t);return[l?u:void 0,await co(u)]}}}),tn,Ki,ci,rn,ho,po,fo,va,_e,Gt=L(()=>{wa(),Ki=!1,ci=!1,rn=!1,ho=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},po=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},fo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},va=async e=>{if(Ki)return Promise.resolve();if(ci)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(rn)throw new Error("previous call to 'initializeWebAssembly()' failed.");ci=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!fo())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!po())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=ho();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,s=typeof n=="string"?n:void 0,a=n?.mjs,l=a?.href??a,u=n?.wasm,d=u?.href??u,h=e.wasmBinary,[f,m]=await wc(l,s,r>1,!!h||!!d),y=!1,_=[];if(t>0&&_.push(new Promise(w=>{setTimeout(()=>{y=!0,w()},t)})),_.push(new Promise((w,x)=>{let $={numThreads:r};if(h)$.wasmBinary=h;else if(d||s)$.locateFile=v=>d??s+v;else if(l&&l.indexOf("blob:")!==0)$.locateFile=v=>new URL(v,l).href;else if(f){let v=_c();v&&($.locateFile=T=>v+T)}m($).then(v=>{ci=!1,Ki=!0,tn=v,w(),f&&URL.revokeObjectURL(f)},v=>{ci=!1,rn=!0,x(v)})})),await Promise.race(_),y)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},_e=()=>{if(Ki&&tn)return tn;throw new Error("WebAssembly is not initialized yet.")}}),Qe,hr,me,$a=L(()=>{Gt(),Qe=(e,t)=>{let r=_e(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},hr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,s])=>{let a=t?t+n:n;if(typeof s=="object")hr(s,a+".",r,i);else if(typeof s=="string"||typeof s=="number")i(a,s.toString());else if(typeof s=="boolean")i(a,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},me=e=>{let t=_e(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let s=Number(t.getValue(n,i===4?"i32":"i64")),a=t.getValue(n+i,"*"),l=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${l}`)}finally{t.stackRestore(r)}}}),vc,Ag=L(()=>{Gt(),$a(),vc=e=>{let t=_e(),r=0,i=[],n=e||{};try{if(e?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(n.terminate=!1);let s=0;return e?.tag!==void 0&&(s=Qe(e.tag,i)),r=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,s),r===0&&me("Can't create run options."),e?.extra!==void 0&&hr(e.extra,"",new WeakSet,(a,l)=>{let u=Qe(a,i),d=Qe(l,i);t._OrtAddRunConfigEntry(r,u,d)!==0&&me(`Can't set a run config entry: ${a} - ${l}.`)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(a=>t._free(a)),s}}}),mo,go,yo,hi,_o,$c,Mg=L(()=>{Gt(),$a(),mo=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},go=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},yo=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},hi=(e,t,r,i)=>{let n=Qe(t,i),s=Qe(r,i);_e()._OrtAddSessionConfigEntry(e,n,s)!==0&&me(`Can't set a session config entry: ${t} - ${r}.`)},_o=async(e,t,r)=>{for(let i of t){let n=typeof i=="string"?i:i.name,s=[];switch(n){case"webnn":if(n="WEBNN",typeof i!="string"){let h=i?.deviceType;h&&hi(e,"deviceType",h,r)}break;case"webgpu":if(n="JS",typeof i!="string"){let h=i;if(h?.preferredLayout){if(h.preferredLayout!=="NCHW"&&h.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${h.preferredLayout}`);hi(e,"preferredLayout",h.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let a=Qe(n,r),l=s.length,u=0,d=0;if(l>0){u=_e()._malloc(l*_e().PTR_SIZE),r.push(u),d=_e()._malloc(l*_e().PTR_SIZE),r.push(d);for(let h=0;h<l;h++)_e().setValue(u+h*_e().PTR_SIZE,s[h][0],"*"),_e().setValue(d+h*_e().PTR_SIZE,s[h][1],"*")}await _e()._OrtAppendExecutionProvider(e,a,u,d,l)!==0&&me(`Can't append execution provider: ${n}.`)}},$c=async e=>{let t=_e(),r=0,i=[],n=e||{};yo(n);try{let s=mo(n.graphOptimizationLevel??"all"),a=go(n.executionMode??"sequential"),l=typeof n.logId=="string"?Qe(n.logId,i):0,u=n.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log severity level is not valid: ${u}`);let d=n.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let h=typeof n.optimizedModelFilePath=="string"?Qe(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(s,!!n.enableCpuMemArena,!!n.enableMemPattern,a,!!n.enableProfiling,0,l,u,d,h),r===0&&me("Can't create session options."),n.executionProviders&&await _o(r,n.executionProviders,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);hi(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[f,m]of Object.entries(n.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let y=Qe(f,i);t._OrtAddFreeDimensionOverride(r,y,m)!==0&&me(`Can't set a free dimension override: ${f} - ${m}.`)}return n.extra!==void 0&&hr(n.extra,"",new WeakSet,(f,m)=>{hi(r,f,m,i)}),[r,i]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&me("Can't release session options."),i.forEach(a=>t._free(a)),s}}}),Ut,mt,Lt,wr,pr,xa,Ca,Xn,ie=L(()=>{Ut=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},mt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Lt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,s)=>n*s,1);return r>0?Math.ceil(i*r):void 0},wr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},pr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},xa=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ca=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Xn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Sa,xc=L(()=>{ba(),Sa=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),s;try{s=new ArrayBuffer(i)}catch(l){if(l instanceof RangeError){let u=Math.ceil(i/65536);s=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw l}let a=0;for(;;){let{done:l,value:u}=await n.read();if(l)break;let d=u.byteLength;new Uint8Array(s,a,d).set(u),a+=d}return new Uint8Array(s,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),bo,wo,vo,$o,Ta,xo,de,yt=L(()=>{ie(),bo=["V","I","W","E","F"],wo=(e,t)=>{console.log(`[${bo[e]},${new Date().toISOString()}]${t}`)},Ta=(e,t)=>{vo=e,$o=t},xo=(e,t)=>{let r=pr(e),i=pr(vo);r>=i&&wo(r,typeof t=="function"?t():t)},de=(...e)=>{$o&&xo(...e)}}),Co,ei,A,fr,Cc,Sc,Tc,se=L(()=>{Co=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},ei=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let s=Math.max(e.length,t.length),a=new Array(s);if(r){if(i<2||n<2)return;let l=Co.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(l===void 0)return;[a[s-2],a[s-1]]=l}for(let l=r?3:1;l<=s;l++){let u=i-l<0?1:e[i-l],d=n-l<0?1:t[n-l];if(u!==d&&u>1&&d>1)return;let h=Math.max(u,d);if(u&&d)a[s-l]=Math.max(u,d);else{if(h>1)return;a[s-l]=0}}return a}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},A=class lr{static size(t){return lr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),s=i-1;for(;s>=0;){if(t[s]%r===0){n[s]=t[s]/r;break}if(r%t[s]!==0)throw new Error("cannot convert shape");n[s]=1,r/=t[s],s--}for(s--;s>=0;s--)n[s]=t[s];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return lr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return lr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let s=r;s<i;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[s])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,s)=>n+r[s]+r[s+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},fr=class $i{static adjustPoolAttributes(t,r,i,n,s,a){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let l=0;l<r.length-2;l++)l>=i.length?i.push(r[l+2]):i[l]=r[l+2];for(let l=0;l<i.length;l++)if(l<n.length){if(n[l]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let l=0;l<i.length;l++)if(l<s.length){if(s[l]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let l=0;l<i.length*2;l++)if(l<a.length){if(a[l]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let l=0;l<i.length;l++){if(i[l]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[l]>=i[l]||a[l+i.length]>=i[l])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,s,a,l){if(l){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)$i.adjustPadAndReturnShape(t[u+(a?1:2)],r[u],i[u],n[u],s,u,u+t.length-2,l)}}static computePoolOutputShape(t,r,i,n,s,a,l){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return $i.computeShapeHelper(t,r,u,i,n,s,a,l),u}static computeConvOutputShape(t,r,i,n,s,a,l){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return $i.computeShapeHelper(!1,t,u,i,n,s,a,l),u}static computeShapeHelper(t,r,i,n,s,a,l,u){if(t)for(let d=0;d<r.length-2;d++)i.push(1);else for(let d=0;d<r.length-2;d++)i.push($i.adjustPadAndReturnShape(r[d+2],n[d],s[d],a[d],l,d,d+r.length-2,u))}static adjustPadAndReturnShape(t,r,i,n,s,a,l,u){let d=i*(n-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return s[a]=0,s[l]=0,Math.floor((t-d)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=((t+r-1)/r-1)*r+n-t;return s[a]=Math.floor(u==="SAME_LOWER"?(h+1)/2:h/2),s[l]=h-s[a],Math.floor((t+h-n)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+s[a]+s[l]-d)/r+1)}},Cc=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,a,l;t?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let u=-1;if(i?(l=r[0],u=1):(l=r[1],u=0),r[u]!==a)throw new Error("dimension mismatch");if(s<=0||l<=0||a<=0)throw new Error("invalid shape specified");if(n&&!ei.isValidBroadcast(n,[s,l]))throw new Error("gemm: invalid bias shape for broadcast");return[s,l,a]}},Sc=-34028234663852886e22,Tc=34028234663852886e22}),Ia,Ic=L(()=>{ie(),Ia=(e,t)=>new(wr(t))(e)}),nn,Jn,an,So,sn,To,on,ln,un,Io,kc,Og=L(()=>{ie(),yt(),nn=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Jn=(e,t)=>{if(t==="int32")return e;let r=nn.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,s=new(wr(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let a=new Int32Array(n);for(let l=0;l<n;l++){let u=s[l];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");a[l]=Number(u)}return new Uint8Array(a.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&s.some(l=>l>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let a=Int32Array.from(s,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},an=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},So=1,sn=()=>So++,To=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),on=(e,t)=>{let r=nn.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},ln=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:s,fallbackDataType:a}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=s,this.fallbackDataType=a}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return on(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=an(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},un=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),s;if(!n.opSupportLimits().input.dataTypes.includes(t)){if(s=To.get(t),!s||!n.opSupportLimits().input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==on(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let a=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,a,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Jn(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?an(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Io=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=sn();return this.tensorTrackersById.set(e,new un(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),s=sn(),a=new ln({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(s,new un(this,a)),this.externalTensors.add(a),s}async getCachedTensor(e,t,r,i,n,s,a){let l=this.getMLContext(e);for(let[d,h]of this.freeTensors.entries())if(h.canReuseTensor(l,t,r)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}`);let f=this.freeTensors.splice(d,1)[0];return f.sessionId=e,f}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${a?`fallbackDataType: ${a},`:""} shape: ${r}}`);let u=await l.createTensor({dataType:a??t,shape:r,dimensions:r,usage:i,writable:n,readable:s});return new ln({sessionId:e,context:l,tensor:u,dataType:t,shape:r,fallbackDataType:a})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},kc=(...e)=>new Io(...e)}),pi,ko,Ec,Rg=L(()=>{ie(),Gt(),Ic(),Og(),yt(),pi=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),ko=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,s)=>n===i[s]&&e[n]===t[n])},Ec=class{constructor(e){this.tensorManager=kc(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,Ta(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>ko(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let s=pi.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,i,n)}async createTemporaryTensor(e,t,r){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=pi.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!_e().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Ia(r,t)}}registerMLTensor(e,t,r,i){let n=pi.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(e,t,n,i);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${s}}`),s}registerMLConstant(e,t,r,i,n,s,a=!1){if(!s)throw new Error("External mounted files are not available.");let l=e;e.startsWith("./")&&(l=e.substring(2));let u=s.get(l);if(!u)throw new Error(`File with name ${l} not found in preloaded files.`);if(t+r>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=u.slice(t,t+r).buffer,h;switch(n.dataType){case"float32":h=new Float32Array(d);break;case"float16":h=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":h=new Int32Array(d);break;case"uint32":h=new Uint32Array(d);break;case"int64":if(a){let f=Jn(new Uint8Array(d),"int64");h=new Int32Array(f.buffer),n.dataType="int32"}else h=new BigInt64Array(d);break;case"uint64":h=new BigUint64Array(d);break;case"int8":h=new Int8Array(d);break;case"int4":case"uint4":case"uint8":h=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return de("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${a?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(n,h)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=this.mlContextBySessionId.get(e),n=pi.get(Ut(t));return typeof n>"u"?!1:r?!!i?.opSupportLimits().input.dataTypes.includes(n):!!i?.opSupportLimits().output.dataTypes.includes(n)}flush(){}}}),ka=L(()=>{}),dn,Zi,Yi,Eo,zo,cn,Qn,Ao,zc,Dg=L(()=>{yt(),ka(),dn=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Zi=[],Yi=e=>Math.ceil(Number(e)/16)*16,Eo=e=>{for(let t=0;t<Zi.length;t++){let r=Zi[t];if(e<=r)return r}return Math.ceil(e/16)*16},zo=1,cn=()=>zo++,Qn=async(e,t,r,i)=>{let n=Yi(r),s=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,s,0,n),e.flush(),await s.mapAsync(GPUMapMode.READ);let l=s.getMappedRange();if(i){let u=i();return u.set(new Uint8Array(l,0,r)),u}else return new Uint8Array(l.slice(0,r))}finally{s.destroy()}},Ao=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of dn)Zi.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,s=Yi(n),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${n}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),u=l.getMappedRange();new Uint8Array(u).set(new Uint8Array(r,i,n)),l.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(l,0,a.gpuData.buffer,0,s),this.backend.device.queue.submit([d.finish()]),l.destroy(),de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=Yi(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=cn();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Eo(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||s){let l=(n?this.freeBuffers:this.freeUniformBuffers).get(r);l?l.length>0?i=l.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let a={id:cn(),type:0,buffer:i};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Qn(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=dn.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},zc=(...e)=>new Ao(...e)}),Mo,fe,Ce=L(()=>{Mo=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},fe=e=>new Mo(e)}),ti,Xi,Ae,De,J,$e,ea,Xt,It,X,fi,D,Y,Ac,Ea,Oo,Mc,oe=L(()=>{ie(),se(),ti=64,Xi=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ae=(e,t=1)=>{let r=Xi(e,t);return typeof r=="string"?r:r[0]},De=(e,t=1)=>{let r=Xi(e,t);return typeof r=="string"?r:r[1]},J=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:A.computeStrides(r)})}),t},$e=e=>e%4===0?4:e%2===0?2:1,ea=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Xt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,It=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,X=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,fi=(e,t,r,i,n)=>{let s=typeof r=="number",a=s?r:r.length,l=[...new Array(a).keys()],u=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,d=Xi(t,n),h=typeof d=="string"?d:d[1],f=typeof d=="string"?d:d[0],m={indices:u,value:h,storage:f,tensor:t},y=U=>typeof U=="string"?U:`${U}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},w=s?"uniforms.":"",x=`${w}${e}_shape`,$=`${w}${e}_strides`,v="";for(let U=0;U<a-1;U++)v+=`
    let dim${U} = current / ${X($,U,a)};
    let rest${U} = current % ${X($,U,a)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;v+=`indices[${a-1}] = current;`;let T=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${v}
    return indices;
  }`,C=U=>(_.offsetToIndices=!0,a<2?U:`o2i_${e}(${U})`),I=[];if(a>=2)for(let U=a-1;U>=0;U--)I.push(`${X($,U,a)} * (indices[${U}])`);let z=a<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${I.join("+")};
  }`,E=U=>(_.indicesToOffset=!0,a<2?U:`i2o_${e}(${U})`),O=(...U)=>a===0?"0u":`${m.indices}(${U.map(y).join(",")})`,P=(U,W)=>a<2?`${U}`:`${X(U,W,a)}`,F=(U,W,re)=>a<2?`${U}=${re};`:`${X(U,W,a)}=${re};`,V={},G=(U,W)=>{_.broadcastedIndicesToOffset=!0;let re=`${W.name}broadcastedIndicesTo${e}Offset`;if(re in V)return`${re}(${U})`;let ce=[];for(let B=a-1;B>=0;B--){let ue=W.indicesGet("outputIndices",B+W.rank-a);ce.push(`${P($,B)} * (${ue} % ${P(x,B)})`)}return V[re]=`fn ${re}(outputIndices: ${W.type.indices}) -> u32 {
             return ${ce.length>0?ce.join("+"):"0u"};
           }`,`${re}(${U})`},ee=(U,W)=>(()=>{if(m.storage===m.value)return`${e}[${U}]=${W};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${W}), select(0u, 0xFFFFFFFFu, ${W} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${W}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${W}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),q=U=>(()=>{if(m.storage===m.value)return`${e}[${U}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${U}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${U}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),ne=a<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${h} {
    return ${q(`i2o_${e}(indices)`)};
  }`,Q=a<2?"":(()=>{let U=l.map(re=>`d${re}: u32`).join(", "),W=l.map(re=>`d${re}`).join(", ");return`
  fn get_${e}(${U}) -> ${h} {
    return get_${e}ByIndices(${O(W)});
  }`})(),K=(...U)=>{if(U.length!==a)throw new Error(`indices length must be ${a}`);let W=U.map(y).join(",");return a===0?q("0u"):a===1?q(W[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${W})`)},ae=U=>a<2?q(U):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${U})`),j=a<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${h}) {
    ${ee(`i2o_${e}(indices)`,"value")}
  }`,ye=a<2?"":(()=>{let U=l.map(re=>`d${re}: u32`).join(", "),W=l.map(re=>`d${re}`).join(", ");return`
  fn set_${e}(${U}, value: ${h}) {
    set_${e}ByIndices(${O(W)}, value);
  }`})();return{impl:()=>{let U=[],W=!1;return _.offsetToIndices&&(U.push(T),W=!0),_.indicesToOffset&&(U.push(z),W=!0),_.broadcastedIndicesToOffset&&(Object.values(V).forEach(re=>U.push(re)),W=!0),_.set&&(U.push(ye),W=!0),_.setByIndices&&(U.push(j),W=!0),_.get&&(U.push(Q),W=!0),_.getByIndices&&(U.push(ne),W=!0),!s&&W&&U.unshift(`const ${x} = ${m.indices}(${r.join(",")});`,`const ${$} = ${m.indices}(${A.computeStrides(r).join(",")});`),U.join(`
`)},type:m,offsetToIndices:C,indicesToOffset:E,broadcastedIndicesToOffset:G,indices:O,indicesGet:P,indicesSet:F,set:(...U)=>{if(U.length!==a+1)throw new Error(`indices length must be ${a}`);let W=U[a];if(typeof W!="string")throw new Error("value must be string");let re=U.slice(0,a).map(y).join(",");return a===0?ee("0u",W):a===1?ee(re[0],W):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${re}, ${W})`)},setByOffset:ee,setByIndices:(U,W)=>a<2?ee(U,W):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${W});`),get:K,getByOffset:q,getByIndices:ae,usage:i,name:e,strides:$,shape:x,rank:a}},D=(e,t,r,i=1)=>fi(e,t,r,"input",i),Y=(e,t,r,i=1)=>fi(e,t,r,"output",i),Ac=(e,t,r)=>fi(e,t,r,"atomicOutput",1),Ea=(e,t,r,i=1)=>fi(e,t,r,"internal",i),Oo=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=ti){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Mc=(e,t)=>new Oo(e,t)}),Ro,hn,Do,Bo,No,Po,Fe,Oc,Rc,kt=L(()=>{ie(),se(),Ce(),oe(),Ro=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},hn=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Do=(e,t)=>A.sortBasedOnPerm(e,hn(e.length,t)),Bo=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let s=0;s<t;++s)n+=`a[${e[s]}]=i[${s}];`;return n+="return a;}"},No=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},Po=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Fe=(e,t)=>{let r=e.dataType,i=e.dims.length,n=hn(i,t),s=Do(e.dims,n),a=e.dims,l=s,u=i<2||Po(n,e.dims),d;if(u)return d=_=>{let w=D("input",r,a,4),x=Y("output",r,l,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(w,x)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:d};let{newShape:h,newPerm:f}=No(e.dims,n),m=A.areEqual(f,[2,3,1]),y=A.areEqual(f,[3,1,2]);if(h.length===2||m||y){a=m?[h[0],h[1]*h[2]]:y?[h[0]*h[1],h[2]]:h,l=[a[1],a[0]];let _=16;return d=w=>{let x=D("a",r,a.length),$=Y("output",r,l.length);return`
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
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(l[1]/_),y:Math.ceil(l[0]/_)},programUniforms:[{type:12,data:w},...J(a,l)]}},getShaderSource:d}}return d=_=>{let w=D("a",r,a.length),x=Y("output",r,l.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(w,x)}

  ${Bo(n,i,w,x)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=A.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...J(a,l)]}},getShaderSource:d}},Oc=(e,t)=>{Ro(e.inputs,t.perm),e.compute(Fe(e.inputs[0],t.perm))},Rc=e=>fe({perm:e.perm})}),Uo,Lo,Ho,Wo,Fo,qo,Vo,Go,jo,Ko,Ke,Dc,Bc,Nc,Pc,Uc,Lc,Hc,Wc,Fc,qc,Bg=L(()=>{ie(),se(),oe(),za(),kt(),Uo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Lo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Ho={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Wo={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Fo=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},qo=(e,t)=>{let r=[],i=e.length;for(let s=0;s<i;s++)t.indexOf(s)===-1&&r.push(e[s]);let n=t.map(s=>e[s]);return[r,n]},Vo=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let s=0;s<r;s++)t.indexOf(s)===-1?i.push(e[n++]):i.push(1);return i},Go=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},jo=(e,t)=>{let r=[];if(!Go(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},Ko=(e,t,r,i,n,s,a)=>{let l=r[0].dims,u=A.size(s),d=A.size(a),h=D("_A",r[0].dataType,l),f=Y("output",n,s),m=64;u===1&&(m=256);let y=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,_=w=>`
        ${w.registerUniform("reduceSize","u32").declareVariables(h,f)}
        ${y}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${w.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Ho[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${h.getByOffset("offset + k")});
           bestValue = ${Uo[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Lo[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${i==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${Wo[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:u},programUniforms:[{type:12,data:d}]})}},Ke=(e,t,r,i)=>{let n=e.inputs.length===1?r:ta(e.inputs,r),s=n.axes;s.length===0&&!n.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((y,_)=>_));let a=A.normalizeAxes(s,e.inputs[0].dims.length),l=a,u=e.inputs[0],d=jo(l,e.inputs[0].dims.length);d.length>0&&(u=e.compute(Fe(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],l=Fo(l.length,u.dims.length));let[h,f]=qo(u.dims,l),m=h;n.keepDims&&(m=Vo(h,a)),e.compute(Ko(t,n.cacheKey,[u],i,e.inputs[0].dataType,m,f),{inputs:[u]})},Dc=(e,t)=>{Ke(e,"ReduceMeanShared",t,"mean")},Bc=(e,t)=>{Ke(e,"ReduceL1Shared",t,"l1")},Nc=(e,t)=>{Ke(e,"ReduceL2Shared",t,"l2")},Pc=(e,t)=>{Ke(e,"ReduceLogSumExpShared",t,"logSumExp")},Uc=(e,t)=>{Ke(e,"ReduceMaxShared",t,"max")},Lc=(e,t)=>{Ke(e,"ReduceMinShared",t,"min")},Hc=(e,t)=>{Ke(e,"ReduceProdShared",t,"prod")},Wc=(e,t)=>{Ke(e,"ReduceSumShared",t,"sum")},Fc=(e,t)=>{Ke(e,"ReduceSumSquareShared",t,"sumSquare")},qc=(e,t)=>{Ke(e,"ReduceLogSumShared",t,"logSum")}}),Ze,Zo,mr,ta,Ye,Yo,Xo,Jo,Qo,el,tl,il,rl,nl,al,Xe,Vc,Gc,jc,Kc,Zc,Yc,Xc,Jc,Qc,eh,za=L(()=>{ie(),se(),Ce(),oe(),Bg(),Ze=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Zo=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],mr=(e,t,r,i,n,s,a=!1,l=!1)=>{let u=[],d=r[0].dims,h=d.length,f=A.normalizeAxes(n,h),m=!l&&f.length===0;d.forEach((w,x)=>{m||f.indexOf(x)>=0?a&&u.push(1):u.push(w)});let y=u.length,_=A.size(u);return{name:e,shaderCache:t,getShaderSource:w=>{let x=[],$=D("_A",r[0].dataType,h),v=Y("output",s,y),T=i($,v,f),C=T[2];for(let I=0,z=0;I<h;I++)m||f.indexOf(I)>=0?(a&&z++,C=`for(var j${I}: u32 = 0; j${I} < ${d[I]}; j${I}++) {
                  ${T[2].includes("last_index")?`let last_index = j${I};`:""}
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
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${C}
          ${T[3]}
          ${T.length===4?v.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...J(d,u)]})}},ta=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),fe({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ye=(e,t,r,i)=>{let n=e.inputs,s=n.length===1?r:ta(n,r);e.compute(mr(t,{hint:s.cacheKey,inputDependencies:["rank"]},[n[0]],s.noopWithEmptyAxes&&s.axes.length===0?Zo:i,s.axes,n[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},Yo=(e,t)=>{Ze(e.inputs),Ye(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},Xo=(e,t)=>{Ze(e.inputs),Ye(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},Jo=(e,t)=>{Ze(e.inputs),Ye(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Qo=(e,t)=>{Ze(e.inputs),Ye(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},el=(e,t)=>{Ze(e.inputs),Ye(e,"ReduceMax",t,(r,i,n)=>{let s=[];for(let a=0;a<r.rank;a++)(n.indexOf(a)>=0||n.length===0)&&s.push(r.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},tl=(e,t)=>{Ze(e.inputs),Ye(e,"ReduceMean",t,(r,i,n)=>{let s=1;for(let a=0;a<r.rank;a++)(n.indexOf(a)>=0||n.length===0)&&(s*=e.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${s});`]})},il=(e,t)=>{Ze(e.inputs),Ye(e,"ReduceMin",t,(r,i,n)=>{let s=[];for(let a=0;a<r.rank;a++)(n.indexOf(a)>=0||n.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},rl=(e,t)=>{Ze(e.inputs),Ye(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},nl=(e,t)=>{Ze(e.inputs),Ye(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},al=(e,t)=>{Ze(e.inputs),Ye(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Xe=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?i*=e[s]:n*=e[s];return n<32&&i>1024},Vc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?tl(e,t):Dc(e,t)},Gc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xo(e,t):Bc(e,t)},jc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Jo(e,t):Nc(e,t)},Kc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Qo(e,t):Pc(e,t)},Zc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?el(e,t):Uc(e,t)},Yc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?il(e,t):Lc(e,t)},Xc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?rl(e,t):Hc(e,t)},Jc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?nl(e,t):Wc(e,t)},Qc=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?al(e,t):Fc(e,t)},eh=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yo(e,t):qc(e,t)}}),pn,th,ih,ia,Ng=L(()=>{ie(),Ce(),za(),pn=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},th=(e,t)=>{pn(e.inputs);let r=(i,n,s)=>{let a=[];for(let l=0;l<i.rank;l++)(s.indexOf(l)>=0||s.length===0)&&a.push(`input_indices[${l}] = 0;`);return[`${a.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(mr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ih=(e,t)=>{pn(e.inputs);let r=(i,n,s)=>{let a=[];for(let l=0;l<i.rank;l++)(s.indexOf(l)>=0||s.length===0)&&a.push(`input_indices[${l}] = 0;`);return[`${a.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(mr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ia=e=>fe(e)}),sl,Ji,ol,ll,ul,Mi,dl,rh,Aa=L(()=>{ie(),se(),ka(),oe(),sl=(e,t)=>{let r=e[0],i=e[1],n=e[2],s=e[3],a=e[4],l=e[5];if(a&&l)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],d=r.dims[1],h=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==h)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=n.dims[0]/3,m=f,y=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],y=t.qkvHiddenSizes[2]}let _=d;if(f!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==f+m+y)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let w=0;if(a){if(m!==y)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(w=a.dims[3])}let x=_+w,$=-1,v=0;if(s)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(l){if(l.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(l.dims[0]!==u||l.dims[1]!==t.numHeads||l.dims[2]!==d||l.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:d,pastSequenceLength:w,kvSequenceLength:_,totalSequenceLength:x,maxSequenceLength:$,inputHiddenSize:h,hiddenSize:f,vHiddenSize:y,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Ji=(e,t,r)=>t&&e?`
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
    `,ol=(e,t,r,i,n,s,a,l)=>{let u=$e(a?1:s),d=64,h=s/u;h<d&&(d=32);let f=Math.ceil(s/u/d),m=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:h},{type:12,data:f}],y=Ae(e.dataType,u),_=De(1,u),w=["type"];a&&w.push("type"),l&&w.push("type");let x=$=>{let v=Y("x",e.dataType,e.dims,u),T=[v],C=a?D("seq_lens",a.dataType,a.dims):void 0;C&&T.push(C);let I=l?D("total_sequence_length_input",l.dataType,l.dims):void 0;I&&T.push(I);let z=De(e.dataType),E=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${$.registerUniforms(E).declareVariables(...T)}
  ${$.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Ji(C,I,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
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
        x[offset + i] = ${v.type.value}(${z}(1.0) / ${z}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${z}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${y};${u}`,inputDependencies:w},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:m})}},ll=(e,t,r,i,n,s,a,l,u)=>{let d=a+s.kvSequenceLength,h=[s.batchSize,s.numHeads,s.sequenceLength,d],f=e>1&&i,m=s.kvNumHeads?s.kvNumHeads:s.numHeads,y=f?[s.batchSize,m,d,s.headSize]:void 0,_=s.nReps?s.nReps:1,w=s.scale===0?1/Math.sqrt(s.headSize):s.scale,x=$e(s.headSize),$=s.headSize/x,v=12,T={x:Math.ceil(d/v),y:Math.ceil(s.sequenceLength/v),z:s.batchSize*s.numHeads},C=[{type:12,data:s.sequenceLength},{type:12,data:$},{type:12,data:d},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:w},{type:12,data:a},{type:12,data:s.kvSequenceLength},{type:12,data:_}],I=f&&i&&A.size(i.dims)>0,z=["type","type"];I&&z.push("type"),n&&z.push("type"),l&&z.push("type"),u&&z.push("type");let E=[{dims:h,dataType:t.dataType,gpuDataType:0}];f&&E.push({dims:y,dataType:t.dataType,gpuDataType:0});let O=P=>{let F=D("q",t.dataType,t.dims,x),V=D("key",r.dataType,r.dims,x),G=[F,V];if(I){let j=D("past_key",i.dataType,i.dims,x);G.push(j)}n&&G.push(D("attention_bias",n.dataType,n.dims));let ee=l?D("seq_lens",l.dataType,l.dims):void 0;ee&&G.push(ee);let q=u?D("total_sequence_length_input",u.dataType,u.dims):void 0;q&&G.push(q);let ne=Y("output",t.dataType,h),Q=[ne];f&&Q.push(Y("present_key",t.dataType,y,x));let K=De(1,x),ae=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${F.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${F.type.storage}, ${v*v}>;
  ${P.registerUniforms(ae).declareVariables(...G,...Q)}
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
    ${Ji(ee,q,!0)}
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
        output[outputIdx] = ${ne.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${n!==void 0};${i!==void 0};${e}`,inputDependencies:z},getRunData:()=>({outputs:E,dispatchGroup:T,programUniforms:C}),getShaderSource:O}},ul=(e,t,r,i,n,s,a=void 0,l=void 0)=>{let u=s+n.kvSequenceLength,d=n.nReps?n.nReps:1,h=n.vHiddenSize*d,f=e>1&&i,m=n.kvNumHeads?n.kvNumHeads:n.numHeads,y=f?[n.batchSize,m,u,n.headSize]:void 0,_=[n.batchSize,n.sequenceLength,h],w=12,x={x:Math.ceil(n.vHeadSize/w),y:Math.ceil(n.sequenceLength/w),z:n.batchSize*n.numHeads},$=[{type:12,data:n.sequenceLength},{type:12,data:u},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:h},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:d}],v=f&&i&&A.size(i.dims)>0,T=["type","type"];v&&T.push("type"),a&&T.push("type"),l&&T.push("type");let C=[{dims:_,dataType:t.dataType,gpuDataType:0}];f&&C.push({dims:y,dataType:t.dataType,gpuDataType:0});let I=z=>{let E=D("probs",t.dataType,t.dims),O=D("v",r.dataType,r.dims),P=[E,O];v&&P.push(D("past_value",i.dataType,i.dims));let F=a?D("seq_lens",a.dataType,a.dims):void 0;a&&P.push(F);let V=l?D("total_sequence_length_input",l.dataType,l.dims):void 0;l&&P.push(V);let G=[Y("output",t.dataType,_)];f&&G.push(Y("present_value",t.dataType,y));let ee=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${w}u;
  var<workgroup> tileQ: array<${E.type.value}, ${w*w}>;
  var<workgroup> tileV: array<${E.type.value}, ${w*w}>;
  ${z.registerUniforms(ee).declareVariables(...P,...G)}
  ${z.mainStart([w,w,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Ji(F,V,!0)}
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:C,dispatchGroup:x,programUniforms:$}),getShaderSource:I}},Mi=(e,t,r,i,n,s,a,l,u,d,h=void 0,f=void 0)=>{let m=Math.min(e.outputCount,1+(a?1:0)+(l?1:0)),y=m>1?d.pastSequenceLength:0,_=y+d.kvSequenceLength,w=u&&A.size(u.dims)>0?u:void 0,x=[t,r];m>1&&a&&A.size(a.dims)>0&&x.push(a),w&&x.push(w),h&&x.push(h),f&&x.push(f);let $=e.compute(ll(m,t,r,a,w,d,y,h,f),{inputs:x,outputs:m>1?[-1,1]:[-1]})[0];e.compute(ol($,d.batchSize,d.numHeads,y,d.sequenceLength,_,h,f),{inputs:h&&f?[$,h,f]:[$],outputs:[]});let v=[$,i];m>1&&l&&A.size(l.dims)>0&&v.push(l),h&&v.push(h),f&&v.push(f),e.compute(ul(m,$,i,l,d,y,h,f),{inputs:v,outputs:m>1?[0,2]:[0]})},dl=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,s=t.headSize,a=12,l={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:i},{type:12,data:n},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],h=f=>{let m=Y("output_q",u[0].dataType,r),y=Y("output_k",u[0].dataType,r),_=Y("output_v",u[0].dataType,r),w=D("input",u[0].dataType,u[0].dims),x=D("weight",u[1].dataType,u[1].dims),$=D("bias",u[2].dataType,u[2].dims),v=w.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${v}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${v}, ${a*a}>;
  var<workgroup> tileWeightK: array<${v}, ${a*a}>;
  var<workgroup> tileWeightV: array<${v}, ${a*a}>;
  ${f.registerUniforms(T).declareVariables(w,x,$,m,y,_)}
  ${f.mainStart([a,a,1])}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:d}),getShaderSource:h},{inputs:u,outputs:[-1,-1,-1]})},rh=(e,t)=>{let r=sl(e.inputs,t),[i,n,s]=dl(e,r);return Mi(e,i,n,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),cl,hl,pl,nh,Pg=L(()=>{je(),ie(),se(),Ce(),oe(),cl=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,s)=>{let a=n.length;if(a!==i.length)throw new Error(`${s}: num dimensions != ${a}`);n.forEach((l,u)=>{if(l!==i[u])throw new Error(`${s}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},hl=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,s=e[0].dims,a=i?$e(s[s.length-1]):1,l=n==="NHWC"&&s.length>1?a:1,u=A.size(s)/a,d=i,h=d?s.length:s,f=D("x",e[0].dataType,e[0].dims,a),m=D("scale",e[1].dataType,e[1].dims,l),y=D("bias",e[2].dataType,e[2].dims,l),_=D("inputMean",e[3].dataType,e[3].dims,l),w=D("inputVar",e[4].dataType,e[4].dims,l),x=Y("y",e[0].dataType,h,a),$=()=>{let T="";if(i)T=`let cOffset = ${s.length===1?"0u":n==="NHWC"?`outputIndices[${s.length-1}] / ${a}`:"outputIndices[1]"};`;else if(n==="NCHW")T=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let C=1;C<m.rank;C++)T+=`cIndices[${C}] = outputIndices[${C}];`;T+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return T},v=T=>`
  const epsilon = ${r};
  ${T.registerUniform("outputSize","u32").declareVariables(f,m,y,_,w,x)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${a}`)};
    ${$()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${y.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${w.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${a}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d?[{type:12,data:u},...J(s)]:[{type:12,data:u}]})}},pl=e=>fe(e),nh=(e,t)=>{let{inputs:r,outputCount:i}=e,n=pl({...t,outputCount:i});if(ge.webgpu.validateInputContent&&cl(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(hl(r,n))}}),fl,ml,ah,Ug=L(()=>{se(),oe(),fl=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},ml=e=>{let t=e[0].dims,r=e[0].dims[2],i=A.size(t)/4,n=e[0].dataType,s=D("input",n,t,4),a=D("bias",n,[r],4),l=D("residual",n,t,4),u=Y("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(s,a,l,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${s.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},ah=e=>{fl(e.inputs),e.compute(ml(e.inputs))}}),gl,he,sh,oh,lh,uh,dh,ch,hh,ph,fh,yl,mh,gh,yh,_h,xi,bh,ur,wh,vh,$h,xh,Ch,Sh,Th,Ih,kh,Eh,zh,Ah,Mh,Oh,Rh,Dh,fn,Bh,ra,na,Nh,Ph,Uh,_l,bl,Lh,Ma=L(()=>{ie(),se(),Ce(),oe(),gl=(e,t,r,i,n,s,a)=>{let l=Math.ceil(t/4),u="";typeof n=="string"?u=`${n}(a)`:u=n("a");let d=D("inputData",r,[l],4),h=Y("outputData",i,[l],4),f=[{name:"vec_size",type:"u32"}];return a&&f.push(...a),`
      ${e.registerUniforms(f).declareVariables(d,h)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${h.setByOffset("global_idx",u)}
  }`},he=(e,t,r,i,n,s=e.dataType,a,l)=>{let u=[{type:12,data:Math.ceil(A.size(e.dims)/4)}];return a&&u.push(...a),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:d=>gl(d,A.size(e.dims),e.dataType,s,r,i,l),getRunData:d=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(A.size(d[0].dims)/64/4)},programUniforms:u})}},sh=e=>{e.compute(he(e.inputs[0],"Abs","abs"))},oh=e=>{e.compute(he(e.inputs[0],"Acos","acos"))},lh=e=>{e.compute(he(e.inputs[0],"Acosh","acosh"))},uh=e=>{e.compute(he(e.inputs[0],"Asin","asin"))},dh=e=>{e.compute(he(e.inputs[0],"Asinh","asinh"))},ch=e=>{e.compute(he(e.inputs[0],"Atan","atan"))},hh=e=>{e.compute(he(e.inputs[0],"Atanh","atanh"))},ph=e=>fe(e),fh=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(he(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},yl=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return fe({min:t,max:r})},mh=(e,t)=>{let r=t||yl(e.inputs),i=De(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},gh=e=>{e.compute(he(e.inputs[0],"Ceil","ceil"))},yh=e=>{e.compute(he(e.inputs[0],"Cos","cos"))},_h=e=>{e.compute(he(e.inputs[0],"Cosh","cosh"))},xi=e=>fe(e),bh=(e,t)=>{let r=De(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},ur=(e="f32")=>`
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
}`,wh=e=>{let t=De(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,ur(t)))},vh=e=>{e.compute(he(e.inputs[0],"Exp","exp"))},$h=e=>{e.compute(he(e.inputs[0],"Floor","floor"))},xh=e=>{let t=De(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,ur(t)))},Ch=(e,t)=>{let r=De(e.inputs[0].dataType);e.compute(he(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Sh=e=>{e.compute(he(e.inputs[0],"Not",t=>`!${t}`))},Th=e=>{e.compute(he(e.inputs[0],"Neg",t=>`-${t}`))},Ih=e=>{e.compute(he(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},kh=e=>{let t=De(e.inputs[0].dataType);e.compute(he(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Eh=e=>{e.compute(he(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},zh=e=>fe(e),Ah=(e,t)=>{let r=De(e.inputs[0].dataType);e.compute(he(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Mh=e=>{e.compute(he(e.inputs[0],"Sin","sin"))},Oh=e=>{e.compute(he(e.inputs[0],"Sinh","sinh"))},Rh=e=>{e.compute(he(e.inputs[0],"Sqrt","sqrt"))},Dh=e=>{e.compute(he(e.inputs[0],"Tan","tan"))},fn=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Bh=e=>{e.compute(he(e.inputs[0],"Tanh",fn))},ra=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${fn("v")};
}
`,na=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Nh=e=>{let t=De(e.inputs[0].dataType);e.compute(he(e.inputs[0],"FastGelu",na,ra(t),void 0,e.inputs[0].dataType))},Ph=(e,t)=>{let r=De(e.inputs[0].dataType);return e.compute(he(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Uh=e=>{e.compute(he(e.inputs[0],"Log","log"))},_l=(e,t)=>`
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
`,bl=e=>`quick_gelu_impl(${e})`,Lh=(e,t)=>{let r=De(e.inputs[0].dataType);e.compute(he(e.inputs[0],"QuickGelu",bl,_l(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),wl,vl,Hh,Lg=L(()=>{se(),oe(),Ma(),wl=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},vl=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=D("input",e[0].dataType,e[0].dims,4),i=D("bias",e[0].dataType,[e[0].dims[2]],4),n=Y("output",e[0].dataType,t,4),s=A.size(t)/4,a=Ae(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(r,i,n)}

  ${ur(a)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Hh=e=>{wl(e.inputs),e.compute(vl(e.inputs))}}),$l,xl,Je,Wh,Fh,qh,Vh,Gh,jh,Kh,Zh,Yh,Xh,Hg=L(()=>{ie(),se(),oe(),$l=(e,t,r,i,n,s,a,l,u,d,h,f)=>{let m,y;typeof l=="string"?m=y=(v,T)=>`${l}((${v}),(${T}))`:typeof l=="function"?m=y=l:(m=l.scalar,y=l.vector);let _=Y("outputData",h,i.length,4),w=D("aData",u,t.length,4),x=D("bData",d,r.length,4),$;if(n)if(s){let v=A.size(t)===1,T=A.size(r)===1,C=t.length>0&&t[t.length-1]%4===0,I=r.length>0&&r[r.length-1]%4===0;v||T?$=_.setByOffset("global_idx",y(v?`${w.type.value}(${w.getByOffset("0")}.x)`:w.getByOffset("global_idx"),T?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):$=`
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${w.broadcastedIndicesToOffset("outputIndices",_)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",_)};
            ${_.setByOffset("global_idx",y(a||C?w.getByOffset("offsetA / 4u"):`${w.type.value}(${w.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||I?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=_.setByOffset("global_idx",y(w.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(T,C,I="")=>{let z=`aData[indexA${C}][componentA${C}]`,E=`bData[indexB${C}][componentB${C}]`;return`
            let outputIndices${C} = ${_.offsetToIndices(`global_idx * 4u + ${C}u`)};
            let offsetA${C} = ${w.broadcastedIndicesToOffset(`outputIndices${C}`,_)};
            let offsetB${C} = ${x.broadcastedIndicesToOffset(`outputIndices${C}`,_)};
            let indexA${C} = offsetA${C} / 4u;
            let indexB${C} = offsetB${C} / 4u;
            let componentA${C} = offsetA${C} % 4u;
            let componentB${C} = offsetB${C} % 4u;
            ${T}[${C}] = ${I}(${m(z,E)});
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
      }`},xl=(e,t,r,i,n,s,a=r.dataType)=>{let l=r.dims.map(w=>Number(w)??1),u=i.dims.map(w=>Number(w)??1),d=!A.areEqual(l,u),h=l,f=A.size(l),m=!1,y=!1,_=[d];if(d){let w=ei.calcShape(l,u,!1);if(!w)throw new Error("Can't perform binary op on the given tensors");h=w.slice(),f=A.size(h);let x=A.size(l)===1,$=A.size(u)===1,v=l.length>0&&l[l.length-1]%4===0,T=u.length>0&&u[u.length-1]%4===0;_.push(x),_.push($),_.push(v),_.push(T);let C=1;for(let I=1;I<h.length;I++){let z=l[l.length-I],E=u[u.length-I];if(z===E)C*=z;else break}C%4===0?(y=!0,m=!0):(x||$||v||T)&&(m=!0)}else m=!0;return _.push(m),{name:e,shaderCache:{hint:t+_.map(w=>w.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:w=>$l(w,l,u,h,m,d,y,n,r.dataType,i.dataType,a,s),getRunData:()=>({outputs:[{dims:h,dataType:a}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(A.size(h)/4)},...J(l,u,h)]})}},Je=(e,t,r,i,n,s)=>{e.compute(xl(t,n??"",e.inputs[0],e.inputs[1],r,i,s))},Wh=e=>{Je(e,"Add",(t,r)=>`${t}+${r}`)},Fh=e=>{Je(e,"Div",(t,r)=>`${t}/${r}`)},qh=e=>{Je(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Vh=e=>{Je(e,"Mul",(t,r)=>`${t}*${r}`)},Gh=e=>{let t=D("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Je(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
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
      `)},jh=e=>{Je(e,"Sub",(t,r)=>`${t}-${r}`)},Kh=e=>{Je(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Zh=e=>{Je(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Yh=e=>{Je(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Xh=e=>{Je(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Cl,Sl,Tl,Il,Jh,Qh,Wg=L(()=>{ie(),se(),Ce(),oe(),Cl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,s=i.dims.length;e.forEach((a,l)=>{if(l!==r){if(a.dataType!==n)throw new Error("input tensors should be one type");if(a.dims.length!==s)throw new Error("input tensors should have the same shape");a.dims.forEach((u,d)=>{if(d!==t&&u!==i.dims[d])throw new Error("non concat dimensions must match")})}})},Sl=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Tl=(e,t)=>{let r=e.length,i=[];for(let n=0;n<r;++n){let s=t.setByOffset("global_idx",e[n].getByIndices("indices"));r===1?i.push(s):n===0?i.push(`if (inputIndex == ${n}u) { ${s} }`):n===r-1?i.push(`else { ${s} }`):i.push(`else if (inputIndex == ${n}) { ${s} }`)}return i.join(`
`)},Il=(e,t,r,i)=>{let n=A.size(r),s=new Array(e.length),a=new Array(e.length),l=0,u=[],d=[],h=[{type:12,data:n}];for(let w=0;w<e.length;++w)l+=e[w].dims[t],s[w]=l,d.push(e[w].dims.length),a[w]=D(`input${w}`,i,d[w]),u.push("rank"),h.push({type:12,data:s[w]});for(let w=0;w<e.length;++w)h.push(...J(e[w].dims));h.push(...J(r));let f=Y("output",i,r.length),m=f.indicesGet("indices",t),y=Array.from(Array(s.length).keys()).map(w=>`uniforms.sizeInConcatAxis${w}`).join(","),_=w=>`

  ${(()=>{w.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)w.registerUniform(`sizeInConcatAxis${x}`,"u32");return w.declareVariables(...a,f)})()}

  ${Sl(s.length,y)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${y});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Tl(a,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h}),getShaderSource:_}},Jh=(e,t)=>{let r=e.inputs,i=r[0].dims,n=A.normalizeAxis(t.axis,i.length);Cl(r,n);let s=i.slice();s[n]=r.reduce((l,u)=>l+(u.dims.length>n?u.dims[n]:0),0);let a=r.filter(l=>A.size(l.dims)>0);e.compute(Il(a,n,s,r[0].dataType),{inputs:a})},Qh=e=>fe({axis:e.axis})}),Ft,qt,Vt,Oa,jt=L(()=>{ie(),se(),Ft=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},qt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Vt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Oa=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Sc,Tc];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Oe,ep,Ra=L(()=>{Oe=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},ep=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),tp,Fg=L(()=>{tp=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),ki,Da,Ba=L(()=>{ie(),se(),oe(),jt(),ki=(e,t,r,i,n)=>{let s=i-r;return`
      ${Array.from({length:r}).map((a,l)=>`
      if (${X(t.shape,l,t.rank)} != 1) {
        ${t.indicesSet(e,l,X(n,l+s,i))}
      } else {
        ${t.indicesSet(e,l,0)}
      }`).join("")}
`},Da=(e,t,r,i,n=!1,s)=>{let a=e[0].dims,l=e[1].dims,u=a[a.length-2],d=l[l.length-1],h=a[a.length-1],f=$e(d),m=$e(h),y=$e(u),_=A.size(r)/f/y,w=e.length>2,x=i?i.slice(0,-2):r.slice(0,-2),$=[A.size(x),u,d],v=[{type:12,data:_},{type:12,data:u},{type:12,data:d},{type:12,data:h}];qt(t,v),v.push(...J(x,a,l)),w&&v.push(...J(e[2].dims)),v.push(...J($));let T=C=>{let I=Ea("batch_dims",e[0].dataType,x.length),z=D("a",e[0].dataType,a.length,m),E=D("b",e[1].dataType,l.length,f),O=Y("output",e[0].dataType,$.length,f),P=Ae(O.type.tensor),F=Ft(t,O.type.value,P),V=[z,E],G="";if(w){let ne=n?f:1;V.push(D("bias",e[2].dataType,e[2].dims.length,ne)),G=`${n?`value += bias[col / ${ne}];`:`value += ${O.type.value}(bias[row + i]);`}`}let ee=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Vt(t,ee);let q=()=>{let ne=`var a_data: ${z.type.value};`;for(let Q=0;Q<m;Q++)ne+=`
              let b_data${Q} = b[(b_offset + (k + ${Q}) * uniforms.N + col) / ${f}];`;for(let Q=0;Q<y;Q++){ne+=`a_data = a[(a_offset + (row + ${Q}) * uniforms.K + k) / ${m}];`;for(let K=0;K<m;K++)ne+=`
            values[${Q}] = fma(${E.type.value}(a_data${m===1?"":`[${K}]`}), b_data${K}, values[${Q}]);
`}return ne};return`
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
    ${ki("a_indices",z,z.rank-2,I.rank,"batch_indices")}
    ${z.indicesSet("a_indices",z.rank-2,0)}
    ${z.indicesSet("a_indices",z.rank-1,0)}
    let a_offset = ${z.indicesToOffset("a_indices")};

    var b_indices: ${E.type.indices};
    ${ki("b_indices",E,E.rank-2,I.rank,"batch_indices")}
    ${E.indicesSet("b_indices",E.rank-2,0)}
    ${E.indicesSet("b_indices",E.rank-1,0)}
    let b_offset = ${E.indicesToOffset("b_indices")};
    var values: array<${O.type.value}, ${y}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
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
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${m};${y};${n}`,inputDependencies:w?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:v}),getShaderSource:T}}}),kl,El,aa,mn,zl,sa,Al,gr,Na=L(()=>{ie(),se(),oe(),jt(),Ba(),Ra(),kl=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,El=(e,t)=>e?`
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
        }`,aa=(e,t,r="f32",i,n=!1,s=32,a=!1,l=32)=>{let u=t[1]*e[1],d=t[0]*e[0],h=n?u:s,f=n?s:u,m=h/t[0],y=s/t[1];if(!((n&&m===4&&e[1]===4||!n&&(m===3||m===4))&&h%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${r}>, ${h/m}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
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
  let batch = ${a?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${a?`${Math.ceil(l/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${l}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${y};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${kl(n,i)}
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
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${El(n,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},mn=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,zl=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",sa=(e,t,r="f32",i,n=!1,s=32,a=!1,l=32,u=!1)=>{let d=e[1]*t[1],h=e[0]*t[0],f=n?d:s,m=n?s:d;if(!(m%t[1]===0&&f%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let y=m/t[1],_=f/t[0],w=s/t[1],x=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${h};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${mn(n,i)}
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
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
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
let tileRowB = i32(localId.y) * ${w};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${y}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${mn(n,i)}
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
      ${zl(n)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${h}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(l/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${l}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${x}
  }
`},Al=(e,t,r,i,n=!1)=>{let[s,a,l,u]=i,d=Ae(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Oe(e,d)} {
      var value = ${Oe(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${ki("aIndices",a,a.rank-2,s.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${Oe(e,d)} {
      var value = ${Oe(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${l.type.indices};
        ${ki("bIndices",l,l.rank-2,s.rank,"batchIndices")}
        ${l.indicesSet("bIndices",l.rank-2,"u32(row)")}
        ${l.indicesSet("bIndices",l.rank-1,"u32(colIn)")}
        value = ${l.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Oe(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${Oe(e,d)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},gr=(e,t,r,i,n=!1,s)=>{let a=e[0].dims,l=e[1].dims,u=a.slice(0,-2),d=l.slice(0,-2),h=i?i.slice(0,-2):r.slice(0,-2),f=A.size(h),m=a[a.length-2],y=a[a.length-1],_=l[l.length-1],w=y%4===0&&_%4===0,x=m<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(_/$[0]/x[0]),Math.ceil(m/$[1]/x[1]),Math.ceil(f/$[2]/x[2])],T=w?4:1,C=[...u,m,y/T],I=C.length,z=[...d,y,_/T],E=z.length,O=[f,m,_/T],P=[{type:6,data:m},{type:6,data:_},{type:6,data:y}];qt(t,P),P.push(...J(h,C,z));let F=["rank","rank"],V=e.length>2;V&&(P.push(...J(e[2].dims)),F.push("rank")),P.push(...J(O));let G=ee=>{let q=h.length,ne=Ea("batchDims",e[0].dataType,q,1),Q=Ae(e[0].dataType),K=D("a",e[0].dataType,I,T),ae=D("b",e[1].dataType,E,T),j=Y("result",e[0].dataType,O.length,T),ye=[K,ae];if(V){let B=n?T:1;ye.push(D("bias",e[2].dataType,e[2].dims.length,B))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Vt(t,U);let W=Ae(j.type.tensor),re=Ft(t,j.type.value,W),ce=Al(T,V,re,[ne,K,ae,j],n);return`
  ${ee.registerUniforms(U).registerInternalVariables(ne).declareVariables(...ye,j)}
  ${ce}
  ${w?aa(x,$,Q,ne):sa(x,$,Q,ne)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${w};${n}`,inputDependencies:F},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:P}),getShaderSource:G}}}),Ml,ip,qg=L(()=>{ie(),yt(),oe(),jt(),Ra(),Fg(),Na(),Ml=(e,t,r,i,n=!1,s,a=4,l=4,u=4,d="f32")=>{let h=P=>{switch(P){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},f=P=>{switch(P){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${P} is not supported.`)}},m=e?`
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
    var resData = ${Oe(a,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${w}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${h(a)}
    }
    return resData;`,T=e?t&&i?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Oe(a,d)}(0.0);`:i&&r?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Oe(a,d)}(0.0);`,C=e?i&&r?f(l):`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(l)}
    }
    return ${Oe(l,d)}(0.0);`:`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(l)}
    }
    return ${Oe(l,d)}(0.0);`,I=Oe(u,d),z=Oe(e?a:l,d),E=Oe(e?l:a,d),O=Ft(s,I,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?T:C}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${e?C:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${I}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${y}
      ${ep(n)}
      ${O}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},ip=(e,t,r,i,n,s,a,l,u)=>{let d=t.format==="NHWC",h=d?e[0].dims[3]:e[0].dims[1],f=r[0],m=d?r[2]:r[3],y=d?r[1]:r[2],_=d?r[3]:r[1],w=d&&(h%4===0||h%3===0)&&_%4===0,x=d?_:m*y,$=d?m*y:_,v=[8,8,1],T=i<=8?[4,1,1]:[4,4,1],C=[Math.ceil(x/v[0]/T[0]),Math.ceil($/v[1]/T[1]),Math.ceil(f/v[2]/T[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${C}`);let I=w?d&&h%4!==0?3:4:1,z=v[1]*T[1],E=v[0]*T[0],O=Math.max(v[0]*I,v[1]),P=i%z===0,F=n%E===0,V=s%O===0,G=w?[I,4,4]:[1,1,1],ee=[{type:6,data:i},{type:6,data:n},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];qt(t,ee),ee.push(...J(e[0].dims,e[1].dims));let q=["rank","rank"];a&&(ee.push(...J(e[2].dims)),q.push("rank")),ee.push(...J(r));let ne=Q=>{let K=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Vt(t,K);let ae=w?4:1,j=Ae(e[0].dataType),ye=`
      fn setOutputAtIndex(flatIndex : i32, value : ${w?`vec4<${j}>`:j}) {
        result[flatIndex] = ${w?`vec4<${j}>`:j}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${w?`vec4<${j}>`:j}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${w?"/ 4":""}, value);
      }`,U=D("x",e[0].dataType,e[0].dims.length,I===3?1:I),W=D("w",e[1].dataType,e[1].dims.length,ae),re=[U,W],ce=Y("result",e[0].dataType,r.length,ae);if(a){let B=D("bias",e[2].dataType,e[2].dims.length,ae);re.push(B),ye+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${w?`vec4<${j}>`:j} {
          return bias[coords.${d?"w":"y"}${w?"/ 4":""}];
        }`}return`
        ${tp("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Q.registerUniforms(K).declareVariables(...re,ce)}
        ${ye}
        ${Ml(d,P,F,V,a,t,G[0],G[1],G[2],j)}
        ${w?aa(T,v,j,void 0,!d,O):sa(T,v,j,void 0,!d,O,!1,void 0,l)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${I};${w};${P};${F};${V};${z};${E};${O}`,inputDependencies:q},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:C[0],y:C[1],z:C[2]},programUniforms:ee}),getShaderSource:ne}}}),Ol,gn,mi,Rl,yn,Dl,rp,np,Vg=L(()=>{ie(),yt(),se(),oe(),jt(),Ra(),Ol=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},gn=e=>typeof e=="number"?[e,e,e]:e,mi=(e,t)=>t<=1?e:e+(e-1)*(t-1),Rl=(e,t,r,i=1)=>{let n=mi(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},yn=(e,t,r,i,n)=>{n==null&&(n=Rl(e,t[0],i[0]));let s=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*n>=t[a]&&(s[a]=Math.trunc((e[a]-t[a]+2*n)/i[a]+1));return s},Dl=(e,t,r,i,n,s,a,l,u,d)=>{let h,f,m,y;if(e==="VALID"&&(e=0),typeof e=="number"){h={top:e,bottom:e,left:e,right:e,front:e,back:e};let _=yn([t,r,i,1],[l,u,d],1,[n,s,a],e);f=_[0],m=_[1],y=_[2]}else if(Array.isArray(e)){if(!e.every((w,x,$)=>w===$[0]))throw Error(`Unsupported padding parameter: ${e}`);h={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let _=yn([t,r,i,1],[l,u,d],1,[n,s,a],e[0]);f=_[0],m=_[1],y=_[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/n),m=Math.ceil(r/s),y=Math.ceil(i/a);let _=(f-1)*n+l-t,w=(m-1)*s+u-r,x=(y-1)*a+d-i,$=Math.floor(_/2),v=_-$,T=Math.floor(w/2),C=w-T,I=Math.floor(x/2),z=x-I;h={top:T,bottom:C,left:I,right:z,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:h,outDepth:f,outHeight:m,outWidth:y}},rp=(e,t,r,i,n,s=!1,a="channelsLast")=>{let l,u,d,h,f;if(a==="channelsLast")[l,u,d,h,f]=e;else if(a==="channelsFirst")[l,f,u,d,h]=e;else throw new Error(`Unknown dataFormat ${a}`);let[m,,y,_,w]=t,[x,$,v]=gn(r),[T,C,I]=gn(i),z=mi(y,T),E=mi(_,C),O=mi(w,I),{padInfo:P,outDepth:F,outHeight:V,outWidth:G}=Dl(n,u,d,h,x,$,v,z,E,O),ee=s?m*f:m,q=[0,0,0,0,0];return a==="channelsFirst"?q=[l,ee,F,V,G]:a==="channelsLast"&&(q=[l,F,V,G,ee]),{batchSize:l,dataFormat:a,inDepth:u,inHeight:d,inWidth:h,inChannels:f,outDepth:F,outHeight:V,outWidth:G,outChannels:ee,padInfo:P,strideDepth:x,strideHeight:$,strideWidth:v,filterDepth:y,filterHeight:_,filterWidth:w,effectiveFilterDepth:z,effectiveFilterHeight:E,effectiveFilterWidth:O,dilationDepth:T,dilationHeight:C,dilationWidth:I,inShape:e,outShape:q,filterShape:t}},np=(e,t,r,i,n,s)=>{let a=s==="channelsLast";a?e[0].dims[3]:e[0].dims[1];let l=[64,1,1],u={x:r.map((x,$)=>$)},d=[Math.ceil(Ol(u.x.map(x=>r[x]))/l[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let h=1,f=A.size(r),m=[{type:12,data:f},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];qt(t,m),m.push(...J(e[0].dims,e[1].dims));let y=["rank","rank"],_=e.length===3;_&&(m.push(...J(e[2].dims)),y.push("rank")),m.push(...J(r));let w=x=>{let $=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Vt(t,$);let v=1,T=Ae(e[0].dataType),C=D("x",e[0].dataType,e[0].dims.length,h),I=D("W",e[1].dataType,e[1].dims.length,v),z=[C,I],E=Y("result",e[0].dataType,r.length,v),O="";if(_){let V=D("bias",e[2].dataType,e[2].dims.length,v);z.push(V),O+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${T} {
          return bias[${a?X("coords",4,5):X("coords",1,5)}];
        }`}let P=Oe(h,T),F=Ft(t,P,T);return`
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
              let d2 = ${a?X("coords",C.rank-1,C.rank):X("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${a?X("coords",1,C.rank):X("coords",2,C.rank)},
              ${a?X("coords",2,C.rank):X("coords",3,C.rank)},
              ${a?X("coords",3,C.rank):X("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?X("uniforms.x_shape",1,C.rank):X("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${a?X("uniforms.x_shape",2,C.rank):X("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${a?X("uniforms.x_shape",3,C.rank):X("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${a?X("uniforms.x_shape",4,C.rank):X("uniforms.x_shape",1,C.rank)};
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
                      ${a?`let xValues = vec4<f32>(
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
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<f32>(
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
                      ${a?`let xValues = vec3<f32>(
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
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${h};${_}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:m}),getShaderSource:w}}}),ap,sp,Gg=L(()=>{ie(),se(),oe(),jt(),ap=(e,t,r,i)=>{let n=e.length>2,s=n?"value += b[output_channel];":"",a=e[0].dims,l=e[1].dims,u=t.format==="NHWC",d=u?r[3]:r[1],h=d/t.group,f=u&&h>=4?$e(d):1,m=A.size(r)/f,y=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:h}];qt(t,y),y.push(...J(a,[l[0],l[1],l[2],l[3]/f]));let _=n?["rank","rank","rank"]:["rank","rank"];y.push(...J([r[0],r[1],r[2],r[3]/f]));let w=x=>{let $=Y("output",e[0].dataType,r.length,f),v=Ae($.type.tensor),T=Ft(t,$.type.value,v),C=D("x",e[0].dataType,a.length),I=D("w",e[1].dataType,l.length,f),z=[C,I];n&&z.push(D("b",e[2].dataType,e[2].dims,f));let E=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Vt(t,E);let O=u?`
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
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${O}
    ${s}
    ${T}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:w}},sp=(e,t,r,i)=>{let n=e.length>2,s=$e(r[3]),a=$e(r[2]),l=A.size(r)/s/a,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],h=[r[0],r[1],r[2],r[3]/s],f=[{type:12,data:l},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];qt(t,f),f.push(...J(u,d,h));let m=(a-1)*t.strides[1]+d[1],y=_=>{let w=Y("output",e[0].dataType,h.length,s),x=Ae(w.type.tensor),$=Ft(t,w.type.value,x),v=D("x",e[0].dataType,u.length,s),T=D("w",e[1].dataType,d.length,s),C=[v,T];n&&C.push(D("b",e[2].dataType,e[2].dims,s));let I=n?"value += b[output_channel];":"",z=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Vt(t,z),`
  ${_.registerUniforms(z).declareVariables(...C,w)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${v.type.value}, ${m}>;
    var values: array<${w.type.value}, ${a}>;
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
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${I}
      ${$}
      ${w.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${a};${m};${d[0]};${d[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:y}}}),Bl,Qi,Nl,er,oa,_n,Pl,Ul,la,jg=L(()=>{se(),qg(),Vg(),Na(),Gg(),jt(),Ba(),kt(),Bl=(e,t,r,i,n,s)=>{let a=e[0],l=e.slice(s?1:2,s?3:4),u=l.length,d=t[0],h=t.slice(2).map((m,y)=>m+(m-1)*(r[y]-1)),f=l.map((m,y)=>m+i[y]+i[y+u]).map((m,y)=>Math.floor((m-h[y]+n[y])/n[y]));return f.splice(0,0,a),f.splice(s?3:1,0,d),f},Qi=[2,3,1,0],Nl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},er=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let s=2;s<t[1].dims.length;++s)r[s-2]===0&&(r[s-2]=t[1].dims[s]);let i=e.pads.slice();fr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},oa=e=>{let t=Oa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,s=e.group,a=e.kernel_shape,l=e.pads,u=e.strides,d=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:s,kernelShape:a,pads:l,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},_n=(e,t,r,i)=>{let n=r.format==="NHWC",s=Bl(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let z=[t[0]];if(n){let E=e.kernelCustomData.wT??e.compute(Fe(t[1],Qi),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=E),z.push(E)}else z.push(t[1]);t.length===3&&z.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(sp(z,r,s,i),{inputs:z}):e.compute(ap(z,r,s,i),{inputs:z});return}let a=t.length===3,l=t[0].dims[n?1:2],u=t[0].dims[n?2:3],d=t[0].dims[n?3:1],h=t[1].dims[2],f=t[1].dims[3],m=s[n?1:2],y=s[n?2:3],_=s[n?3:1],w=n&&h===l&&f===u&&r.pads[0]===0&&r.pads[1]===0;if(w||h===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let z=s[0],E,O,P,F=[];if(n){let ee=e.kernelCustomData.wT??e.compute(Fe(t[1],Qi),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=ee),w){let q=l*u*d;E=t[0].reshape([1,z,q]),O=ee.reshape([1,q,_]),P=[1,z,_]}else E=t[0].reshape([z,l*u,d]),O=ee.reshape([1,d,_]),P=[z,m*y,_];F.push(E),F.push(O)}else E=t[0].reshape([z,d,l*u]),O=t[1].reshape([1,_,d]),P=[z,_,m*y],F.push(O),F.push(E);a&&F.push(t[2]);let V=P[2],G=F[0].dims[F[0].dims.length-1];V<8&&G<8?e.compute(Da(F,r,s,P,n,i),{inputs:F}):e.compute(gr(F,r,s,P,n,i),{inputs:F});return}let x=!0,$=e.kernelCustomData.wT??e.compute(Fe(t[1],Qi),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];a&&v.push(t[2]);let T=n?m*y:_,C=n?_:m*y,I=h*f*d;e.compute(ip(v,r,s,T,C,I,a,x,i),{inputs:v})},Pl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),a=[1].concat(t.dilations),l=[1].concat(t.kernelShape),u=er({...t,pads:n,strides:s,dilations:a,kernelShape:l},i);_n(e,i,u,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Ul=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=er(r,t),s=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=rp(t[0].dims,t[1].dims,r.strides,r.dilations,s,!1,i);e.compute(np(t,n,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],i))},la=(e,t)=>{if(Nl(e.inputs,t),e.inputs[0].dims.length===3)Pl(e,t);else if(e.inputs[0].dims.length===5)Ul(e,e.inputs,t);else{let r=er(t,e.inputs);_n(e,e.inputs,r)}}}),op,Kg=L(()=>{ie(),yt(),se(),oe(),op=(e,t,r)=>{let i=e.length>2,n=t.outputShape,s=t.format==="NHWC",a=t.group,l=e[1].dims,u=l[2]/a,d=l[3],h=s?$e(u):1,f=s&&d===1&&u>=4,m=f?Math.floor(u/4)*4:Math.floor(u/h)*h,y=u-m,_=s?$e(d):1,w=s?d===1?h:_:1,x=A.size(n)/_,$=[Math.ceil(x/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${$}`);let v=["rank","rank"],T=[t.strides[0],t.strides[1]],C=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],I=[t.dilations[0],t.dilations[1]],z=[C[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),C[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],E=[z[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),z[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],O=[{type:12,data:x},{type:12,data:T},{type:12,data:C},{type:12,data:I},{type:12,data:z},{type:6,data:E},{type:12,data:m},{type:12,data:u},{type:12,data:d},...J(e[0].dims,e[1].dims)];i&&(O.push(...J(e[2].dims)),v.push("rank")),O.push(...J(n));let P=F=>{let V=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:T.length},{name:"filter_dims",type:"u32",length:C.length},{name:"dilations",type:"u32",length:C.length},{name:"effective_filter_dims",type:"u32",length:z.length},{name:"pads",type:"i32",length:E.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],G=Ae(e[0].dataType),ee=s?1:2,q=s?2:3,ne=s?3:1,Q=D("W",e[1].dataType,e[1].dims.length,w),K=D("Dy",e[0].dataType,e[0].dims.length,h),ae=[K,Q];i&&ae.push(D("bias",e[2].dataType,[n[ne]].length,_));let j=Y("result",e[0].dataType,n.length,_),ye=()=>{let re="";if(f)h===4?re+=`
        let xValue = ${K.getByOffset("x_offset")};
        let wValue = ${Q.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:h===2?re+=`
          dotProd = dotProd + dot(vec4<${G}>(${K.getByOffset("x_offset")}, ${K.getByOffset("x_offset + 1u")}), vec4<${G}>(${Q.getByOffset("w_offset")}, ${Q.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:h===1&&(re+=`
          dotProd = dotProd + dot(vec4<${G}>(${K.getByOffset("x_offset")}, ${K.getByOffset("x_offset + 1u")}, ${K.getByOffset("x_offset + 2u")}, ${K.getByOffset("x_offset + 3u")}), vec4<${G}>(${Q.getByOffset("w_offset")}, ${Q.getByOffset("w_offset + 1u")}, ${Q.getByOffset("w_offset + 2u")}, ${Q.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(re+=`
                  let xValue = ${s?K.getByOffset(`${K.indicesToOffset(`${K.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h}`):K.get("batch","inputChannel","idyR","idyC")};
        `,h===1)re+=`
          let w_offset = ${Q.indicesToOffset(`${Q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${Q.getByOffset(`w_offset / ${w}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let ce=0;ce<h;ce++)re+=`
            let wValue${ce} = ${Q.getByOffset(`${Q.indicesToOffset(`${Q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${ce}, wOutChannel)`)} / ${w}`)};
            dotProd = dotProd + xValue[${ce}] * wValue${ce};`;return re},U=()=>{if(y===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let re="";if(h===1){re+="dotProd = dotProd";for(let ce=0;ce<y;ce++)re+=`
            + ${K.getByOffset(`x_offset + ${ce}`)} * ${Q.getByOffset(`w_offset + ${ce}`)}`;re+=";"}else if(h===2){if(y!==2)throw new Error(`Invalid inputChannelsRemainder ${y}.`);re+=`
          let xValue = ${K.getByOffset("x_offset")};
          let wValue = ${Q.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return re},W=`
            let outputIndices = ${j.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${j.indicesGet("outputIndices",0)};
            let d1 = ${j.indicesGet("outputIndices",ne)};
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
                var w_offset = ${Q.indicesToOffset(`${Q.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${w};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:h}) {
                  ${ye()}
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
    ${F.registerUniforms(V).declareVariables(...ae,j)}
      ${F.mainStart()}
      ${F.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${W}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${h}${w}${_}${f}${y}`,inputDependencies:v},getRunData:()=>({dispatchGroup:{x:$[0],y:$[1],z:$[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:O}),getShaderSource:P}}}),Ll,Hl,Wl,bn,lp,Fl,wn,ql,up,Zg=L(()=>{Kg(),jt(),kt(),Ll=(e,t,r,i,n,s)=>(e-1)*t+r+(i-1)*n+1-s,Hl=(e,t,r,i,n)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=s,r[n]=e-s):t==="SAME_LOWER"&&(r[i]=e-s,r[n]=s)},Wl=(e,t,r,i,n,s,a,l,u,d)=>{let h=e.length-2,f=d.length===0;u.length<h&&u.push(...Array(h-u.length).fill(0));let m=e[0],y=t[l?3:1]*n;for(let _=0,w=e.length-h-(l?1:0);_<h;++_,++w){let x=e[w],$=f?x*a[_]:d[_],v=Ll(x,a[_],s[_],t[w],r[_],$);Hl(v,i,s,_,_+h),f&&d.push(a[_]*(x-1)+u[_]+(t[w]-1)*r[_]+1-s[_]-s[_+h])}d.splice(0,0,m),d.splice(l?3:1,0,y)},bn=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,m)=>f*m,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),s=e.outputShape.slice(),a=e.outputPadding.slice(),l=t[0].dims,u=e.dilations.slice();if(u.reduce((f,m)=>f+m,0)===0){let f=t[0].dims.length-2;u=new Array(f).fill(1)}let d=e.strides.slice();if(d.reduce((f,m)=>f+m,0)===0){let f=t[0].dims.length-2;d=new Array(f).fill(1)}Wl(l,r,u,e.autoPad,e.group,n,d,i,a,s);let h=Object.assign({},e);return Object.assign(h,{kernelShape:r,pads:n,outputPadding:a,outputShape:s,dilations:u,strides:d}),h},lp=e=>{let t=Oa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,s=e.group,a=e.kernelShape,l=e.pads,u=e.strides,d=e.wIsConst(),h=e.outputPadding,f=e.outputShape;return{autoPad:i,format:r,dilations:n,group:s,kernelShape:a,outputPadding:h,outputShape:f,pads:l,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Fl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((a,l)=>a+l,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((a,l)=>a+l,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((a,l)=>a+l,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((a,l)=>a+l,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},wn=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(Fe(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let s=[t[0],n];t.length===3&&s.push(t[2]),e.compute(op(s,r,i),{inputs:s})},ql=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let l=t.pads;l.length===0&&(l=[0,0]),l=[0,l[0],0,l[1]],a=[1].concat(a),s=[1].concat(s),n=[1].concat(n);let u=t.outputPadding;u=[0].concat(u);let d=bn({...t,pads:l,strides:a,dilations:s,kernelShape:n,outputPadding:u},i);wn(e,i,d,h=>r?[h[0],h[2],h[3]]:[h[0],h[1],h[3]])},up=(e,t)=>{if(Fl(e.inputs,t),e.inputs[0].dims.length===3)ql(e,t);else{let r=bn(t,e.inputs);wn(e,e.inputs,r)}}}),Vl,dp,cp,Yg=L(()=>{ie(),se(),Ce(),oe(),Vl=(e,t,r,i)=>{let n=A.size(t),s=t.length,a=D("input",e,s),l=Y("output",e,s),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=A.normalizeAxis(u,s),h=f=>{let m=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,y=X("uniforms.input_shape","uniforms.axis",s),_=i.reverse?m+(i.exclusive?" + 1":""):"0",w=i.reverse?y:m+(i.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,l)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${w};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:d},...J(t,t)]}),getShaderSource:h}},dp=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(Vl(i,r,n,t),{inputs:[0]})},cp=e=>{let t=e.exclusive===1,r=e.reverse===1;return fe({exclusive:t,reverse:r})}}),Gl,jl,Kl,hp,pp,Xg=L(()=>{ie(),se(),Ce(),oe(),Gl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},jl=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let s=0;s<t;++s)n.push(r.indicesSet("a",e[s],`i[${s}]`));return n.push("return a;}"),n.join(`
`)},Kl=(e,t)=>{let r,i,n,s,a,l,u=t.format==="NHWC",d=t.blocksize,h=t.mode==="DCR";u?([r,i,n,s]=e.dims,a=h?[r,i,n,d,d,s/d**2]:[r,i,n,s/d**2,d,d],l=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=h?[r,d,d,s/d**2,i,n]:[r,s/d**2,d,d,i,n],l=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(a),m=f.dims.length,y=e.dataType,_=D("a",y,m),w=Y("output",y,m),x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(_,w)}

  ${jl(l,m,_,w)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${w.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${w.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=u?[r,i*d,n*d,s/d**2]:[r,s/d**2,i*d,n*d],T=A.size(v),C=f.dims,I=A.sortBasedOnPerm(C,l);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...J(C,I)]}},getShaderSource:x}},hp=(e,t)=>{Gl(e.inputs),e.compute(Kl(e.inputs[0],t))},pp=e=>fe({blocksize:e.blocksize,mode:e.mode,format:e.format})}),tr,gi,vn,Zl,Yl,Xl,Jl,$n,Ql,fp,mp,Jg=L(()=>{ie(),se(),Ce(),oe(),tr="[a-zA-Z]|\\.\\.\\.",gi="("+tr+")+",vn="^"+gi+"$",Zl="("+gi+",)*"+gi,Yl="^"+Zl+"$",Xl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Jl=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Yl)))throw new Error("Invalid LHS term");if(r.split(",").forEach((n,s)=>{let a=e[s].dims.slice();if(!n.match(RegExp(vn)))throw new Error("Invalid LHS term");let l=this.processTerm(n,!0,a,s);this.lhs.push(l)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([n,s])=>s.count===1||n==="...").map(([n])=>n).join("");else if(!i.match(RegExp(gi)))throw new Error("Invalid RHS");i.match(RegExp(tr,"g"))?.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(n);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,s=!1,a=[],l=0;if(!e.match(RegExp(vn))&&!t&&e!=="")throw new Error("Invalid LHS term");let u=e.match(RegExp(tr,"g")),d=new Xl(i);return u?.forEach((h,f)=>{if(h==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let m=n-u.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(a=r.slice(l,l+m),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<a.length;y++){let _=String.fromCharCode(48+y);d.addSymbol(_,f+y),this.addSymbol(_,r[l++],i)}}else d.addSymbol(h,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[l++],i)}),d}},$n=e=>e+"_max",Ql=(e,t,r,i)=>{let n=e.map(d=>d.length).map((d,h)=>D(`input${h}`,t,d)),s=A.size(i),a=Y("output",t,i.length),l=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),u=d=>{let h=[],f="var prod = 1.0;",m="var sum = 0.0;",y="sum += prod;",_=[],w=[],x=[],$=[],v=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((C,I)=>{if(r.rhs.symbolToIndices.has(I)){let z=r.rhs.symbolToIndices.get(I)?.[0];z!==void 0&&r.lhs.forEach((E,O)=>{if(C.inputIndices.includes(O)){let P=E.symbolToIndices.get(I);if(P===void 0)throw new Error("Invalid symbol error");P.forEach(F=>{h.push(`${n[O].indicesSet(`input${O}Indices`,F,a.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,E)=>{if(C.inputIndices.includes(E)){let O=z.symbolToIndices.get(I);if(O===void 0)throw new Error("Invalid symbol error");O.forEach(P=>{_.push(`${n[E].indicesSet(`input${E}Indices`,P,`${I}`)}`)}),$.push(`prod *= ${n[E].getByIndices(`input${E}Indices`)};`)}}),w.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${$n(I)}; ${I}++) {`),x.push("}")});let T=v?[...h,`let sum = ${n.map((C,I)=>C.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...h,m,...w,..._,f,...$,y,...x];return`
            ${d.registerUniforms(l.map(C=>({name:`${$n(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,a)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${n.map((C,I)=>`var input${I}Indices: ${n[I].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=l.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));d.push({type:12,data:s});let h=e.map((f,m)=>[...J(f)]).reduce((f,m)=>f.concat(m),d);return h.push(...J(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:h}},getShaderSource:u}},fp=(e,t)=>{let r=new Jl(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((s,a)=>s.dims);e.compute(Ql(n,e.inputs[0].dataType,r,i))},mp=e=>{let t=e.equation.replace(/\s+/g,"");return fe({equation:t})}}),eu,xn,tu,iu,gp,Qg=L(()=>{ie(),se(),oe(),eu=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},xn=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},tu=(e,t)=>e.length>t.length?xn(e,t):xn(t,e),iu=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=tu(t,r),n=e[0].dataType,s=n===9||A.size(t)===1,a=n===9||t.length>0&&t[t.length-1]%4===0?4:1,l=s||i.length>0&&i[i.length-1]%4===0?4:1,u=Math.ceil(A.size(i)/l),d=f=>{let m=D("input",n,t.length,a),y=Y("output",n,i.length,l),_;if(n===9){let w=(x,$,v="")=>`
          let outputIndices${$} = ${y.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${m.broadcastedIndicesToOffset(`outputIndices${$}`,y)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${x}[${$}] = ${v}(${m.getByOffset(`index${$}`)}[component${$}]);
        `;_=`
        let outputOffset = global_idx * ${l};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${y.setByOffset("global_idx","data")}
      }`}else _=`
        let outputIndices = ${y.offsetToIndices(`global_idx * ${l}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",y)};
        let data = ${y.type.value}(${m.getByOffset(`inputOffset / ${a}`)});
        ${y.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(m,y)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`},h=[{type:12,data:u},...J(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${a}${l}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h})}},gp=e=>{eu(e.inputs),e.compute(iu(e.inputs),{inputs:[0]})}}),ru,yp,e0=L(()=>{ie(),se(),oe(),Ma(),ru=e=>{let t=e[0].dataType,r=A.size(e[0].dims),i=A.size(e[1].dims),n=i%4===0,s=a=>{let l=D("x",t,[1],4),u=D("bias",t,[1],4),d=Y("y",t,[1],4),h=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=y=>`
      let bias${y}_offset: u32 = (global_idx * 4 + ${y}) % uniforms.bias_size;
      let bias${y} = ${u.getByOffset(`bias${y}_offset / 4`)}[bias${y}_offset % 4];`,m=n?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${l.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(h).declareVariables(l,u,d)}

    ${ra(De(t))}

    ${a.mainStart(ti)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${l.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",na("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/ti/4)}})}},yp=e=>{e.inputs.length<2||A.size(e.inputs[1].dims)===0?Nh(e):e.compute(ru(e.inputs))}}),nu,au,_p,bp,t0=L(()=>{ie(),se(),Ce(),oe(),nu=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},au=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,s=A.normalizeAxis(t.axis,n),a=r.slice(0);a.splice(s,1,...i);let l=r[s],u=e[0].dataType===9?4:1,d=Math.ceil(A.size(a)/u),h=[{type:12,data:d},{type:6,data:l},{type:12,data:s},...J(e[0].dims,e[1].dims,a)],f=m=>{let y=D("data",e[0].dataType,e[0].dims.length,u),_=D("inputIndices",e[1].dataType,e[1].dims.length),w=Y("output",e[0].dataType,a.length,u),x=v=>{let T=i.length,C=`var indicesIndices${v}  = ${_.type.indices}(0);`;for(let I=0;I<T;I++)C+=`${T>1?`indicesIndices${v}[${I}]`:`indicesIndices${v}`} = ${a.length>1?`outputIndices${v}[uniforms.axis + ${I}]`:`outputIndices${v}`};`;C+=`
          var idx${v} = ${_.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${y.type.indices};
        `;for(let I=0,z=0;I<n;I++)I===s?(C+=`${n>1?`dataIndices${v}[${I}]`:`dataIndices${v}`} = u32(idx${v});`,z+=T):(C+=`${n>1?`dataIndices${v}[${I}]`:`dataIndices${v}`} = ${a.length>1?`outputIndices${v}[${z}]`:`outputIndices${v}`};`,z++);return C},$;if(e[0].dataType===9){let v=(T,C,I="")=>`
          let outputIndices${C} = ${w.offsetToIndices(`outputOffset + ${C}u`)};
          ${x(C)};
          let offset${C} = ${y.indicesToOffset(`dataIndices${C}`)};
          let index${C} = offset${C} / 4u;
          let component${C} = offset${C} % 4u;
          ${T}[${C}] = ${I}(${y.getByOffset(`index${C}`)}[component${C}]);
        `;$=`
        let outputOffset = global_idx * ${u};
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
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(y,_,w)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:f}},_p=e=>fe({axis:e.axis}),bp=(e,t)=>{let r=e.inputs;nu(r),e.compute(au(e.inputs,t))}}),su,wp,vp,i0=L(()=>{ie(),se(),oe(),su=(e,t,r,i,n,s,a,l,u)=>{let d=[{type:12,data:s},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:a},{type:12,data:l},{type:12,data:u}],h=[s];d.push(...J(t.dims,h));let f=m=>{let y=D("indices_data",t.dataType,t.dims.length),_=Y("input_slice_offsets_data",12,1,1),w=[y,_],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(x).declareVariables(...w)}
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
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:h,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},wp=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,s=r[1].dims,a=s[s.length-1],l=A.sizeToDimension(s,s.length-1),u=A.sizeFromDimension(i,t.batchDims+a),d=A.sizeToDimension(i,t.batchDims),h=A.sizeFromDimension(i,t.batchDims),f=l/d,m=new Array(a),y=u;for(let C=0;C<a;++C)m[a-1-C]=y,y*=i[t.batchDims+a-1-C];let _=su(e,r[1],m,t.batchDims,i,l,f,h,a),w=t.batchDims+a;if(w>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=s.slice(0,-1).concat(i.slice(w)),$=A.size(x),v=[{type:12,data:$},{type:12,data:u},...J(r[0].dims,_.dims,x)],T=C=>{let I=D("data",r[0].dataType,r[0].dims.length),z=D("slice_offsets",12,_.dims.length),E=Y("output",r[0].dataType,x.length);return`
          ${C.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(I,z,E)}
            ${C.mainStart()}
            ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:n}],dispatchGroup:{x:Math.ceil($/64)},programUniforms:v}),getShaderSource:T},{inputs:[r[0],_]})},vp=e=>({batchDims:e.batch_dims,cacheKey:""})}),ou,lu,$p,xp,r0=L(()=>{ie(),se(),Ce(),oe(),ou=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=A.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],s=e[2],a=e.length===4?e[3]:void 0;if(s.dims.length!==n.dims.length||!n.dims.map((l,u)=>u===r?Math.ceil(l/i)===s.dims[u]:l===s.dims[u]).reduce((l,u)=>l&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==s.dims.length||!a.dims.map((l,u)=>l===s.dims[u]).reduce((l,u)=>l&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},lu=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,s=A.normalizeAxis(t.gatherAxis,n),a=A.normalizeAxis(t.quantizeAxis,n),l=r.slice(0);l.splice(s,1,...i);let u=A.size(l),d=e[2].dataType,h=e[0].dataType===22,f=[{type:12,data:u},{type:12,data:a},{type:12,data:s},{type:12,data:t.blockSize},...J(...e.map((y,_)=>y.dims),l)],m=y=>{let _=D("data",e[0].dataType,e[0].dims.length),w=D("inputIndices",e[1].dataType,e[1].dims.length),x=D("scales",e[2].dataType,e[2].dims.length),$=e.length>3?D("zeroPoint",e[3].dataType,e[3].dims.length):void 0,v=Y("output",d,l.length),T=[_,w,x];$&&T.push($);let C=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(C).declareVariables(...T,v)}
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
        for (var i = uniforms.gather_axis + 1; i < ${l.length}; i++) {
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
        let dequantized_data = ${De(d)}(quantized_data - zero_point) * scale;
        ${v.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,_)=>_!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,_)=>"rank")},getRunData:()=>({outputs:[{dims:l,dataType:d}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:m}},$p=(e,t)=>{let r=e.inputs;ou(r,t),e.compute(lu(e.inputs,t))},xp=e=>fe({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),uu,du,Cp,Sp,n0=L(()=>{ie(),se(),Ce(),oe(),uu=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},du=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,s=e[1].dims,a=e[1].dataType,l=A.normalizeAxis(t.axis,n),u=r[l],d=s.slice(0),h=A.size(d),f=D("input",i,n),m=D("indicesInput",a,s.length),y=Y("output",i,d.length),_=[{type:12,data:h},{type:6,data:u},{type:12,data:l}];return _.push(...J(r,s,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:w=>`
      ${w.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,y)}
      ${w.mainStart()}
      ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${y.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${y.setByOffset("global_idx","value")};
  }`}},Cp=e=>fe({axis:e.axis}),Sp=(e,t)=>{let r=e.inputs;uu(r),e.compute(du(e.inputs,t))}}),cu,hu,Tp,Ip,a0=L(()=>{ie(),se(),oe(),cu=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},hu=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,s,a]=Cc.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),l=[n,s];if(!l)throw new Error("Can't use gemm on the given tensors");let u=16,d=Math.ceil(s/u),h=Math.ceil(n/u),f=!0,m=A.size(l),y=[{type:12,data:f?d:m},{type:12,data:n},{type:12,data:s},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],_=["type","type"];e.length===3&&(y.push(...J(e[2].dims)),_.push("rank")),y.push(...J(l));let w=$=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",C=D("a",e[0].dataType,e[0].dims),I=D("b",e[1].dataType,e[1].dims),z=C.type.value,E=null,O=[C,I];e.length===3&&(E=D("c",e[2].dataType,e[2].dims.length),O.push(E));let P=Y("output",e[0].dataType,l.length);O.push(P);let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(F).declareVariables(...O)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${z}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${T}
    ${E!=null?`let cOffset = ${E.broadcastedIndicesToOffset("vec2(m, n)",P)}; value += ${z}(uniforms.beta) * ${E.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=$=>{let v=D("a",e[0].dataType,e[0].dims),T=D("b",e[1].dataType,e[1].dims),C=null,I=[v,T];e.length===3&&(C=D("c",e[2].dataType,e[2].dims.length),I.push(C));let z=Y("output",e[0].dataType,l.length);I.push(z);let E=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],O="",P="";t.transA&&t.transB?(P=`
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
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
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let F=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(E).declareVariables(...I)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${u}>, ${u}>;
  ${$.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${z.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${P}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
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
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:d*h},programUniforms:y}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:w}},Tp=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Ip=(e,t)=>{cu(e.inputs),e.compute(hu(e.inputs,t))}}),at,ct,Mt,Ot,pu,fu,mu,gu,yu,_u,bu,wu,kp,Ep,s0=L(()=>{ie(),se(),Ce(),oe(),[at,ct,Mt,Ot]=[0,1,2,3],pu=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},fu=`
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
`,mu=e=>`
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
`,gu=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,yu=e=>`
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
`,_u=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${at}] = batch;
     indices[${ct}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Mt}] = u32(r);
            indices[${Ot}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Mt}] = u32(clamp(r, 0, H - 1));
          indices[${Ot}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Mt}] = gs_reflect(r, border[1], border[3]);
          indices[${Ot}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,bu=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${at}], indices[${ct}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${at}], indices[${ct}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${at}], indices[${ct}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${at}], indices[${ct}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${at}], indices[${ct}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${at}], indices[${ct}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,wu=(e,t)=>{let r=D("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=D("grid",e[1].dataType,i.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[at,ct,Mt,Ot]=[0,3,1,2]);let a=Y("output",e[0].dataType,s.length),l=r.type.value,u=A.size(s),d=[{type:12,data:u},...J(e[0].dims,i,s)],h=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,n,a)}
  ${fu}
  ${mu(l)}
  ${gu(t)}
  ${yu(t)}
  ${_u(r,l,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Mt}]);
      let W_in = i32(uniforms.x_shape[${Ot}]);

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

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${at}], indices[${Mt}], indices[${Ot}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${bu(a,l,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let m=A.size(s);return{outputs:[{dims:s,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:d}},getShaderSource:h}},kp=(e,t)=>{pu(e.inputs),e.compute(wu(e.inputs,t))},Ep=e=>fe({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ne,vu,zp,Cn,$u,Ci,Ap,Mp=L(()=>{ie(),se(),Ce(),ka(),Aa(),oe(),kt(),Ne=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,vu=(e,t)=>{let r=e[0],i=Ne(e,1),n=Ne(e,2),s=Ne(e,3),a=Ne(e,4),l=Ne(e,5),u=Ne(e,6),d=Ne(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let h=r.dims[0],f=r.dims[1],m=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],y=f,_=0,w=0,x=Math.floor(m/t.numHeads);if(u&&d&&A.size(u.dims)&&A.size(d.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==h||u.dims[1]!==t.numHeads||u.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==h||d.dims[1]!==t.numHeads||d.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=u.dims[2],w=u.dims[2]}else if(u&&A.size(u.dims)||d&&A.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(i&&A.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,y=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,y=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,y=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(s&&A.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=_+y,T=0;if(a&&A.size(a.dims)>0){T=8;let E=a.dims;throw E.length===1?E[0]===h?T=1:E[0]===3*h+2&&(T=3):E.length===2&&E[0]===h&&E[1]===v&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let C=!1,I=m;if(n&&A.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(y!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=n.dims[2]}else{if(y!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');I=n.dims[1]*n.dims[3],C=!0}}let z=!1;if(a&&A.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(l&&A.size(l.dims)>0){if(l.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==h||l.dims[1]!==t.numHeads||l.dims[2]!==f||l.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:h,sequenceLength:f,pastSequenceLength:_,kvSequenceLength:y,totalSequenceLength:v,maxSequenceLength:w,inputHiddenSize:0,hiddenSize:m,vHiddenSize:I,headSize:x,vHeadSize:Math.floor(I/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:z,passPastInKv:C,qkvFormat:$}},zp=e=>fe({...e}),Cn=fe({perm:[0,2,1,3]}),$u=(e,t,r,i,n,s,a)=>{let l=[i,n,s],u=A.size(l),d=[{type:12,data:u},{type:12,data:a},{type:12,data:s}],h=f=>{let m=Y("qkv_with_bias",t.dataType,l),y=D("qkv",t.dataType,l),_=D("bias",r.dataType,l),w=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(w).declareVariables(y,_,m)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:h},{inputs:[t,r],outputs:[-1]})[0]},Ci=(e,t,r,i,n,s,a,l)=>{let u=s;if(a&&A.size(a.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=$u(e,s,a,t,i,r*n,l),u=u.reshape([t,i,r,n]),r===1||i===1?u:e.compute(Fe(u,Cn.perm),{inputs:[u],outputs:[-1]})[0]}else return s.dims.length===3&&(u=s.reshape([t,i,r,n])),r===1||i===1?u:e.compute(Fe(u,Cn.perm),{inputs:[u],outputs:[-1]})[0]},Ap=(e,t)=>{let r=vu(e.inputs,t),i=e.inputs[0],n=Ne(e.inputs,1),s=Ne(e.inputs,2),a=Ne(e.inputs,3),l=Ne(e.inputs,4),u=Ne(e.inputs,5),d=Ne(e.inputs,6),h=Ne(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let f=n&&s&&n.dims.length===4&&s.dims.length===4,m=Ci(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,a,0);if(f)return Mi(e,m,n,s,l,void 0,d,h,u,r);if(!n||!s)throw new Error("key and value must be provided");let y=Ci(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,a,r.hiddenSize),_=Ci(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,s,a,2*r.hiddenSize);Mi(e,m,y,_,l,void 0,d,h,u,r)}}),xu,Cu,Su,Tu,ua,Op,Rp,Dp=L(()=>{ie(),se(),Ce(),oe(),xu=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Cu=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),fe({numOutputs:i,axis:t.axis,splitSizes:r})},Su=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${X("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Tu=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},ua=(e,t)=>{let r=e[0].dims,i=A.size(r),n=e[0].dataType,s=A.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),l=D("input",n,r.length),u=new Array(t.numOutputs),d=[],h=[],f=0,m=[{type:12,data:i}];for(let _=0;_<t.numOutputs;_++){f+=t.splitSizes[_],u[_]=f;let w=r.slice();w[s]=t.splitSizes[_],h.push(w),a[_]=Y(`output${_}`,n,w.length),d.push({dims:h[_],dataType:e[0].dataType})}m.push({type:12,data:u},...J(r,...h));let y=_=>`
  ${_.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(l,...a)}
  ${Su(u.length)}
  ${Tu(a)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${l.offsetToIndices("global_idx")};
    var index = ${l.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${X("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${l.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:m})}},Op=(e,t)=>{xu(e.inputs);let r=e.inputs.length===1?t:Cu(e.inputs,t);e.compute(ua(e.inputs,r),{inputs:[0]})},Rp=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return fe({axis:t,numOutputs:i,splitSizes:r})}}),Iu,yr,Bp,Np=L(()=>{ie(),se(),Ce(),oe(),Iu=(e,t)=>{let[r,i,n,s]=e,{numHeads:a,rotaryEmbeddingDim:l}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!A.areEqual(i.dims,[])&&!A.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!A.areEqual(n.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(l>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],d=r.dims[r.dims.length-2],h=n.dims[0],f=A.sizeFromDimension(r.dims,1)/d,m=l===0?n.dims[1]*2:f/a;if(l>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(u!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(d!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(m/2!==n.dims[1]&&l/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`);if(d>h)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},yr=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:s}=t,a=e[0].dims[0],l=A.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],d=l/u,h=e[2].dims[1],f=n===0?h*2:d/i,m=new Array(a,u,d/f,f-h),y=A.computeStrides(m),_=[{type:1,data:s},{type:12,data:m},{type:12,data:y},...e[0].dims.length===3?new Array({type:12,data:[l,d,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[l,f,u*f,1]}):[],...J(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],w=x=>{let $=D("input",e[0].dataType,e[0].dims.length),v=D("position_ids",e[1].dataType,e[1].dims.length),T=D("cos_cache",e[2].dataType,e[2].dims.length),C=D("sin_cache",e[3].dataType,e[3].dims.length),I=Y("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:y.length},{name:"input_output_strides",type:"u32",length:y.length}]),`
        ${x.declareVariables($,v,T,C,I)}

        ${x.mainStart(ti)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
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
            let re = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${C.get("position_id","bsnh[3]")};
            ${I.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${C.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${I.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${I.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:fe({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(m)/ti)},programUniforms:_})}},Bp=(e,t)=>{Iu(e.inputs,t),e.compute(yr(e.inputs,t))}}),ku,Eu,Sn,zu,Pp,o0=L(()=>{Ce(),ie(),Aa(),Mp(),Dp(),kt(),Np(),oe(),ku=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],s=e[3],a=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=!1,u=r.dims[0],d=r.dims[1],h=r.dims.length===3?l?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=d,m=0,y=!i||i.dims.length===0,_=Math.floor(y?h/(t.numHeads+2*t.kvNumHeads):h/t.numHeads);y&&(h=_*t.numHeads);let w=s&&s.dims.length!==0,x=a&&a.dims.length!==0;if(w&&s.dims.length===4&&s.dims[0]===u&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===_)throw new Error("BSNH pastKey/pastValue is not supported");if(w&&x){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=s.dims[2]}else if(w||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}let v=0,T=!1,C=t.kvNumHeads?_*t.kvNumHeads:h;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(f!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=n.dims[2]}else{if(f!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=n.dims[1]*n.dims[3],T=!0}}let I=e.length>4?e[5]:void 0;if(I&&I.dims.length!==1&&I.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:h,vHiddenSize:C,headSize:_,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:$}},Eu=fe({perm:[0,2,1,3]}),Sn=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(Fe(i,Eu.perm),{inputs:[i],outputs:[-1]})[0]),i},zu=(e,t,r,i)=>{let n=7,s=["type","type"],a=[e*t],l=e*t,u=[{type:12,data:l},{type:12,data:t},{type:12,data:e}],d=h=>{let f=D("seq_lens",r.dataType,r.dims),m=D("total_seq_lens",i.dataType,i.dims),y=Y("pos_ids",n,a),_=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
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
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:d}},Pp=(e,t)=>{let r=ku(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,l=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,h=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=fe({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,h*r.headSize,h*r.headSize]}),[m,y,_]=!n&&!s?e.compute(ua([i],f),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,s],w,x;if(t.doRotary){let C=e.compute(zu(r.batchSize,r.sequenceLength,u,d),{inputs:[u,d],outputs:[-1]})[0],I=e.inputs[7],z=e.inputs[8],E=fe({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),O=[m,C,I,z],P=[-1];w=e.compute(yr(O,E),{inputs:O,outputs:P})[0],O.splice(0,1,y);let F=fe({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});x=e.compute(yr(O,F),{inputs:O,outputs:P})[0]}let $=Ci(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?w:m,void 0,0),v=Sn(e,t.doRotary?x:y,r),T=Sn(e,_,r);Mi(e,$,v,T,void 0,void 0,a,l,void 0,r,u,d)}}),Tn,Au,Mu,Up,l0=L(()=>{ie(),se(),kt(),oe(),Tn=(e,t,r,i,n,s,a,l)=>{let u=$e(s),d=u===1?"f32":`vec${u}f`,h=u===1?"vec2f":`mat2x${u}f`,f=n*a,m=64;f===1&&(m=256);let y=[n,a,s/u],_=[n,a,2],w=["rank","type","type"],x=[];x.push(...J(y,_));let $=v=>{let T=D("x",t.dataType,3,u),C=D("scale",r.dataType,r.dims),I=D("bias",i.dataType,i.dims),z=Y("output",1,3,2),E=[T,C,I,z];return`
  var<workgroup> workgroup_shared : array<${h}, ${m}>;
  const workgroup_size = ${m}u;
  ${v.declareVariables(...E)}
  ${v.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${T.get("batch","channel","h")});
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
      let sum_final = ${It("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${It("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${l}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${l};${m}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:_,dataType:1}],dispatchGroup:{x:f},programUniforms:x}),getShaderSource:$},{inputs:[t,r,i],outputs:[-1]})[0]},Au=(e,t,r)=>{let i=t[0].dims,n=i,s=2,a=i[0],l=i[1],u=A.sizeFromDimension(i,s),d=$e(u),h=A.size(n)/d,f=Tn(e,t[0],t[1],t[2],a,u,l,r.epsilon),m=[a,l,u/d],y=[a,l],_=["type","none"],w=x=>{let $=D("x",t[0].dataType,m.length,d),v=D("scale_shift",1,y.length,2),T=Y("output",t[0].dataType,m.length,d),C=[$,v,T];return`
  ${x.registerUniform("output_size","u32").declareVariables(...C)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...J(m,y,m)]}),getShaderSource:w},{inputs:[t[0],f]})},Mu=(e,t,r)=>{let i=t[0].dims,n=i,s=i[0],a=i[i.length-1],l=A.sizeFromDimension(i,1)/a,u=$e(a),d=A.size(n)/u,h=[{type:12,data:l},{type:12,data:Math.floor(a/u)}],f=["type","type"],m=!1,y=[0,i.length-1];for(let $=0;$<i.length-2;$++)m=m||i[$+1]!==1,y.push($+1);m=m&&i[i.length-1]!==1;let _=m?e.compute(Fe(e.inputs[0],y),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},($,v)=>i[y[v]])),w=Tn(e,_,t[1],t[2],s,l,a,r.epsilon),x=$=>{let v=Ae(t[0].dataType),T=u===1?"vec2f":`mat${u}x2f`,C=E=>{let O=E===0?"x":"y",P=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${v}(${P}(scale.${O}))`;case 2:return`vec2<${v}>(${P}(scale[0].${O}, scale[1].${O}))`;case 4:return`vec4<${v}>(${P}(scale[0].${O}, scale[1].${O}, scale[2].${O}, scale[3].${O}))`;default:throw new Error(`Not supported compoents ${u}`)}},I=D("input",t[0].dataType,t[0].dims,u),z=Y("output",t[0].dataType,n,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${I.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${z.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${C(0)}, ${C(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:x},{inputs:[t[0],w]})},Up=(e,t)=>{t.format==="NHWC"?Mu(e,e.inputs,t):Au(e,e.inputs,t)}}),Ou,Ru,Lp,u0=L(()=>{ie(),se(),oe(),Ou=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Ru=(e,t,r)=>{let i=t.simplified,n=e[0].dims,s=e[1],a=!i&&e[2],l=n,u=A.normalizeAxis(t.axis,n.length),d=A.sizeToDimension(n,u),h=A.sizeFromDimension(n,u),f=A.size(s.dims),m=a?A.size(a.dims):0;if(f!==h||a&&m!==h)throw new Error(`Size of X.shape()[axis:] == ${h}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${m}`);let y=[];for(let I=0;I<n.length;++I)I<u?y.push(n[I]):y.push(1);let _=$e(h),w=["type","type"],x=[{type:12,data:d},{type:1,data:h},{type:12,data:Math.floor(h/_)},{type:1,data:t.epsilon}];a&&w.push("type");let $=r>1,v=r>2,T=I=>{let z=Ae(e[0].dataType),E=[D("x",e[0].dataType,e[0].dims,_),D("scale",s.dataType,s.dims,_)];a&&E.push(D("bias",a.dataType,a.dims,_)),E.push(Y("output",e[0].dataType,l,_)),$&&E.push(Y("mean_data_output",1,y)),v&&E.push(Y("inv_std_output",1,y));let O=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${I.registerUniforms(O).declareVariables(...E)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${ea("f32",_)};
    var mean_square_vector = ${ea("f32",_)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Xt(z,_,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${It("mean_vector",_)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${It("mean_square_vector",_)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Xt(z,_,"x[j + offset]")};
      let f32scale = ${Xt(z,_,"scale[j]")};
      output[j + offset] = ${E[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Xt(z,_,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},C=[{dims:l,dataType:e[0].dataType}];return $&&C.push({dims:y,dataType:1}),v&&C.push({dims:y,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${_};${r};${i}`,inputDependencies:w},getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:x}),getShaderSource:T}},Lp=(e,t)=>{Ou(e.inputs),e.compute(Ru(e.inputs,t,e.outputCount))}}),Du,Hp,d0=L(()=>{se(),Ba(),Na(),Du=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Hp=e=>{Du(e.inputs);let t=ei.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(Da(e.inputs,{activation:""},t));else{let n=t[t.length-2],s=A.size(e.inputs[0].dims.slice(0,-2)),a=A.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&n===1&&a===1){let l=e.inputs[0].reshape([1,s,i]),u=e.inputs[1].reshape([1,i,r]),d=[1,s,r],h=[l,u];e.compute(gr(h,{activation:""},t,d),{inputs:h})}else e.compute(gr(e.inputs,{activation:""},t))}}}),Bu,Nu,Pu,Wp,Fp,c0=L(()=>{ie(),se(),Ce(),oe(),Bu=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,a=e[1];if(!A.areEqual(a.dims,[t.n,n,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(A.size(l)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let u=e[3].dims,d=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(A.size(u)!==d)throw new Error("zeroPoints input size error.")}},Nu=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],s=t.k,a=t.n,l=r.slice(0,i-2),u=A.size(l),d=e[1].dims[2]/4,h=e[0].dataType,f=$e(t.k),m=$e(d),y=$e(a),_=l.concat([n,a]),w=n>1&&a/y%2===0?2:1,x=A.size(_)/y/w,$=64,v=[],T=[u,n,s/f],C=A.convertShape(e[1].dims).slice();C.splice(-1,1,d/m),v.push(...J(T)),v.push(...J(C)),v.push(...J(e[2].dims)),e.length===4&&v.push(...J(A.convertShape(e[3].dims)));let I=[u,n,a/y];v.push(...J(I));let z=E=>{let O=T.length,P=D("a",e[0].dataType,O,f),F=D("b",12,C.length,m),V=D("scales",e[2].dataType,e[2].dims.length),G=[P,F,V],ee=e.length===4?D("zero_points",12,e[3].dims.length):void 0;ee&&G.push(ee);let q=I.length,ne=Y("output",e[0].dataType,q,y),Q=Ae(e[0].dataType),K=(()=>{switch(f){case 1:return`array<${Q}, 8>`;case 2:return`mat4x2<${Q}>`;case 4:return`mat2x4<${Q}>`;default:throw new Error(`${f}-component is not supported.`)}})(),ae=()=>{let U=`
          // reuse a data
            var input_offset = ${P.indicesToOffset(`${P.type.indices}(batch, row, word_offset)`)};
            var a_data: ${K};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${P.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let W=0;W<y*w;W++)U+=`
            b_value = ${m===1?`b${W}_data`:`b${W}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${K}(${Array.from({length:4},(re,ce)=>`${Q}(b_value_lower[${ce}]), ${Q}(b_value_upper[${ce}])`).join(", ")});
            b_dequantized_values = ${f===1?`${K}(${Array.from({length:8},(re,ce)=>`(b_quantized_values[${ce}] - ${ee?`zero_point${W}`:"zero_point"}) * scale${W}`).join(", ")});`:`(b_quantized_values - ${K}(${Array(8).fill(`${ee?`zero_point${W}`:"zero_point"}`).join(",")})) * scale${W};`};
            workgroup_shared[local_id.x * ${w} + ${Math.floor(W/y)}]${y>1?`[${W%y}]`:""} += ${Array.from({length:8/f},(re,ce)=>`${f===1?`a_data[${ce}] * b_dequantized_values[${ce}]`:`dot(a_data[${ce}], b_dequantized_values[${ce}])`}`).join(" + ")};
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
            let zero_point = ${Q}(8);`}
            `;for(let W=0;W<y*w;W++)U+=`
            let scale${W} = ${V.getByOffset("col_index * nBlocksPerCol + block")};
            ${ee?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${ee.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${W} = ${Q}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return U},ye=()=>{let U=`col_index = col * ${y};`;for(let W=0;W<y*w;W++)U+=`
            let b${W}_data = ${F.getByIndices(`${F.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return U+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${K};
            var b_dequantized_values: ${K};`,U};return`
        var<workgroup> workgroup_shared: array<${ne.type.value}, ${w*$}>;
        ${E.declareVariables(...G,ne)}
        ${E.mainStart([$,1,1])}
          let output_indices = ${ne.offsetToIndices(`(global_idx / ${$}) * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${$}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${j()}
            for (var word: u32 = 0; word < ${d}; word += ${m}) {
              ${ye()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${ae()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${w}) {
            var output_value: ${ne.type.value} = ${ne.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${$}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${w};
            }
            ${ne.setByIndices(`${ne.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${m};${y};${w};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:h}],dispatchGroup:{x},programUniforms:v}),getShaderSource:z}},Pu=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],s=t.k,a=t.n,l=r.slice(0,i-2),u=A.size(l),d=e[1].dims[2]/4,h=e[0].dataType,f=$e(t.k),m=$e(d),y=l.concat([n,a]),_=128,w=a%8===0?8:a%4===0?4:1,x=_/w,$=x*m*8,v=$/f,T=$/t.blockSize,C=A.size(y)/w,I=[],z=[u,n,s/f],E=A.convertShape(e[1].dims).slice();E.splice(-1,1,d/m),I.push(...J(z)),I.push(...J(E)),I.push(...J(e[2].dims)),e.length===4&&I.push(...J(A.convertShape(e[3].dims)));let O=[u,n,a];I.push(...J(O));let P=F=>{let V=z.length,G=D("a",e[0].dataType,V,f),ee=D("b",12,E.length,m),q=D("scales",e[2].dataType,e[2].dims.length),ne=[G,ee,q],Q=e.length===4?D("zero_points",12,e[3].dims.length):void 0;Q&&ne.push(Q);let K=O.length,ae=Y("output",e[0].dataType,K),j=Ae(e[0].dataType),ye=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${j}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${j}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${j}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${j}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${G.type.value}, ${v}>;
        var<workgroup> inter_results: array<array<${ae.type.value}, ${x}>, ${w}>;
        ${F.declareVariables(...ne,ae)}
        ${F.mainStart([x,w,1])}
          let output_indices = ${ae.offsetToIndices(`workgroup_index * ${w}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

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
            let block = tile * ${T} + local_id.x;
            ${Q?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${Q.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${j}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${j}(8);`}
            let scale = ${q.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${ee.getByIndices(`${ee.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${m}; i++) {
              ${ye()}
              let b_value = ${m===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${j}>(${Array.from({length:4},(U,W)=>`${j}(b_value_lower[${W}]), ${j}(b_value_upper[${W}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${j}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(U,W)=>`${`dot(a_data${W}, b_dequantized_values[${W}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${w}) {
            var output_value: ${ae.type.value} = ${ae.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ae.setByIndices(`${ae.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${m};${x};${w}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:h}],dispatchGroup:{x:C},programUniforms:I}),getShaderSource:P}},Wp=(e,t)=>{Bu(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Pu(e.inputs,t)):e.compute(Nu(e.inputs,t))},Fp=e=>fe(e)}),Uu,Lu,Hu,Wu,Fu,qu,Vu,Gu,qp,h0=L(()=>{ie(),se(),oe(),Uu=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Lu=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
            k = i32(${e.indicesGet("indices",n)}) - ${X("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${X("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${X("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},Hu=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${X("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${X("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${X("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${X("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Wu=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${X("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${X("uniforms.x_shape",n,t)})) {
                  k = i32(${X("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${X("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Fu=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${X("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${X("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${X("uniforms.x_shape",n,t)})) {
                  k -= i32(${X("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${X("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},qu=(e,t,r)=>{switch(r.mode){case 0:return Lu(e,t,r.pads.length);case 1:return Hu(e,t,r.pads.length);case 2:return Wu(e,t,r.pads.length);case 3:return Fu(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Vu=(e,t)=>{let r=A.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=A.size(r),s=[{type:12,data:n},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&s.push({type:a?e[2].dataType:1,data:t.value}),s.push(...J(e[0].dims,r));let l=["rank"],u=d=>{let h=Y("output",e[0].dataType,r.length),f=D("x",e[0].dataType,i.length),m=f.type.value,y=qu(h,i.length,t),_=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&_.push({name:"constant_value",type:a?m:"f32"}),`
            ${d.registerUniforms(_).declareVariables(f,h)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${h.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${y}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(r)/64)},programUniforms:s}),getShaderSource:u}},Gu=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,s=new Int32Array(2*n).fill(0);if(e.length>=4){let l=e[3].getBigInt64Array();for(let u=0;u<l.length;u++)s[Number(l[u])]=Number(r[u]),s[Number(l[u])+n]=Number(r[u+l.length])}else r.forEach((l,u)=>s[Number(u)]=Number(l));let a=[];return s.forEach(l=>a.push(l)),{mode:t.mode,value:i,pads:a}}else return t},qp=(e,t)=>{Uu(e.inputs);let r=Gu(e.inputs,t);e.compute(Vu(e.inputs,r),{inputs:[0]})}}),yi,In,kn,En,zn,ju,Ku,An,Mn,Vp,Gp,On,jp,Kp,Rn,Zp,Yp,Xp,Jp,p0=L(()=>{je(),ie(),se(),oe(),yi=e=>{if(ge.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},In=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let s=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),l=t.strides.slice(),u=s?t.dilations.slice():[],d=t.pads.slice();fr.adjustPoolAttributes(r,n,a,l,u,d);let h=fr.computePoolOutputShape(r,n,l,u,a,d,t.autoPad),f=Object.assign({},t);s?Object.assign(f,{kernelShape:a,strides:l,pads:d,dilations:u,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:a,strides:l,pads:d,cacheKey:t.cacheKey});let m=h.slice();return m.push(m.splice(1,1)[0]),[f,i?m:h]},kn=(e,t)=>{let r=t.format==="NHWC",i=A.size(e),n=A.size(t.kernelShape),s=[{type:12,data:i},{type:12,data:n}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let l=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],h=t.pads[t.pads.length-1],f=!!(d+h);s.push({type:12,data:l},{type:12,data:u},{type:12,data:d},{type:12,data:h}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let y=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],w=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];m=!!(w+x),s.push({type:12,data:y},{type:12,data:_},{type:12,data:w},{type:12,data:x}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,a,!0,f,m]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let l=A.computeStrides(t.kernelShape);s.push({type:12,data:l},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:l.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((d,h)=>d+h);return[s,a,!!u,!1,!1]}},En=(e,t,r,i,n,s,a,l,u,d,h,f)=>{let m=n.format==="NHWC",y=t.type.value,_=Y("output",t.type.tensor,i);if(n.kernelShape.length<=2){let w="",x="",$="",v=r-(m?2:1);if(h?w=`
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
                }`,n.kernelShape.length===2){let T=r-(m?3:2);f?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${y}(${l});
              var pad = 0;
              ${x}
              ${w}
              ${$}
              ${a}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let w=n.kernelShape.length,x=n.pads.length,$="";return d?$=`
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
            ${e.registerUniforms(u).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${w}>;

              var value = ${y}(${l});
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
              ${a}

              output[global_idx] = value;
            }`}},zn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,ju=e=>`${zn(e)};${e.countIncludePad}`,Ku=e=>`${zn(e)};${e.storageOrder};${e.dilations}`,An=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Mn=(e,t,r,i)=>{let[n,s]=In(t,i,r),a=D("x",t.dataType,t.dims.length),l=a.type.value,u="value += x_val;",d="";n.countIncludePad?d+=`value /= ${l}(uniforms.kernelSize);`:d+=`value /= ${l}(i32(uniforms.kernelSize) - pad);`;let[h,f,m,y,_]=kn(s,n);h.push(...J(t.dims,s));let w=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${m};${y};${_}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(s)/64)},programUniforms:h}),getShaderSource:x=>En(x,a,t.dims.length,s.length,n,u,d,0,f,m,y,_)}},Vp=e=>{let t=e.count_include_pad!==0,r=An(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:ju(i)}},Gp=(e,t)=>{yi(e.inputs),e.compute(Mn("AveragePool",e.inputs[0],!1,t))},On={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},jp=e=>{let t=e.format;return{format:t,...On,cacheKey:t}},Kp=(e,t)=>{yi(e.inputs),e.compute(Mn("GlobalAveragePool",e.inputs[0],!0,t))},Rn=(e,t,r,i)=>{let[n,s]=In(t,i,r),a=`
      value = max(x_val, value);
    `,l="",u=D("x",t.dataType,t.dims.length),d=["rank"],[h,f,m,y,_]=kn(s,n);return h.push(...J(t.dims,s)),{name:e,shaderCache:{hint:`${i.cacheKey};${m};${y};${_}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(s)/64)},programUniforms:h}),getShaderSource:w=>En(w,u,t.dims.length,s.length,n,a,l,t.dataType===10?-65504:-1e5,f,m,y,_)}},Zp=(e,t)=>{yi(e.inputs),e.compute(Rn("MaxPool",e.inputs[0],!1,t))},Yp=e=>{let t=e.storage_order,r=e.dilations,i=An(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:Ku(n)}},Xp=e=>{let t=e.format;return{format:t,...On,cacheKey:t}},Jp=(e,t)=>{yi(e.inputs),e.compute(Rn("GlobalMaxPool",e.inputs[0],!0,t))}}),Zu,Yu,Qp,ef,f0=L(()=>{ie(),se(),Ce(),oe(),Zu=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,s)=>s===t.axis||n===e[0].dims[s]).reduce((n,s)=>n&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Yu=(e,t)=>{let r=A.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,s=e[0].dims,a=e[1].dataType,l=A.size(s),u=i===3||i===2,d=u?[Math.ceil(A.size(e[0].dims)/4)]:e[0].dims,h=e[1].dims,f=e.length>2?e[2]:void 0,m=f?u?[Math.ceil(A.size(f.dims)/4)]:f.dims:void 0,y=h.length===0||h.length===1&&h[0]===1,_=y===!1&&h.length===1,w=$e(l),x=y&&(!u||w===4),$=x?w:1,v=x&&!u?w:1,T=D("input",u?12:i,d.length,v),C=D("scale",a,h.length),I=f?D("zero_point",u?12:i,m.length):void 0,z=Y("output",a,s.length,$),E=[T,C];I&&E.push(I);let O=[d,h];f&&O.push(m);let P=[{type:12,data:l/$},{type:12,data:r},{type:12,data:t.blockSize},...J(...O,s)],F=V=>{let G=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${V.registerUniforms(G).declareVariables(...E,z)}
      ${V.mainStart()}
          ${V.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${z.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${y?`let scale_value= ${C.getByOffset("0")}`:_?`
            let scale_index = ${z.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${C.getByOffset("scale_index")};`:`
            var scale_indices: ${C.type.indices} = output_indices;
            let index = ${C.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${C.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${C.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${I?y?u?`
                let zero_point_input = ${I.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${I.getByOffset("0")}`:_?u?`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${I.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${z.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${I.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${C.indicesToOffset("scale_indices")};
                let zero_point_input = ${I.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${I.getByIndices("scale_indices")};`:`let zero_point_value = ${u?n?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${z.setByOffset("global_idx",`${z.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:I?["rank","rank","rank"]:["rank","rank"]},getShaderSource:F,getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(l/$/64),y:1,z:1},programUniforms:P})}},Qp=(e,t)=>{Zu(e.inputs,t),e.compute(Yu(e.inputs,t))},ef=e=>fe({axis:e.axis,blockSize:e.blockSize})}),Xu,Ju,tf,m0=L(()=>{je(),ie(),oe(),Xu=(e,t,r)=>{let i=e===t,n=e<t&&r<0,s=e>t&&r>0;if(i||n||s)throw new Error("Range these inputs' contents are invalid.")},Ju=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),s=[n],a=n,l=[{type:12,data:a},{type:i,data:e},{type:i,data:r},...J(s)],u=d=>{let h=Y("output",i,s.length),f=h.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${d.registerUniforms(m).declareVariables(h)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l})}},tf=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),ge.webgpu.validateInputContent&&Xu(t,r,i),e.compute(Ju(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),Qu,ed,rf,nf,g0=L(()=>{ie(),se(),Ce(),oe(),Qu=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
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
              ${n}bitcast<${i}>(oldValue) + (${r})${s}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${s}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${s}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${s}`;default:throw new Error(`Reduction ${e} is not supported.`)}},ed=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,s=1,a=Math.ceil(A.sizeToDimension(i,i.length-1)/s),l=i[i.length-1],u=A.sizeFromDimension(r,l),d=[{type:12,data:a},{type:12,data:l},{type:12,data:u},...J(e[1].dims,e[2].dims,n)],h=f=>{let m=D("indices",e[1].dataType,e[1].dims.length),y=D("updates",e[2].dataType,e[2].dims.length,s),_=t.reduction!=="none"&&t.reduction!==""?Ac("output",e[0].dataType,n.length):Y("output",e[0].dataType,n.length,s);return`
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
    ${Qu(t.reduction,"output[data_offset + i]","value",_.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:h}},rf=e=>fe({reduction:e.reduction}),nf=(e,t)=>{e.compute(ed(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),td,id,rd,Dn,nd,ad,sd,od,ld,ud,dd,cd,Bn,hd,pd,fd,md,gd,af,sf,y0=L(()=>{ie(),se(),Ce(),oe(),td=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},id=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,s)=>i[n]=e[s]),i},rd=(e,t,r,i,n,s)=>{let[a,l,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(h=>s.push(h));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0){if(e[l].getFloat32Array().forEach(h=>i.push(h)),i.length!==0&&i.length!==d&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");td(i,t),t.axes.length>0&&id(i,t.axes,d).forEach((h,f)=>i[f]=h)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(h=>n.push(Number(h))),n.length!==0&&n.length!==d&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},Dn=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,nd=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Dn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Dn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",ad=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",sd=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((s,a)=>{i[s]=n[a],i[a+r]=n[t.length+a]}),i):n},od=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(s=>n.push(s)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((s,a)=>n[s]=r[a])}else r.forEach(s=>n.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((s,a)=>Math.round(s*t[a]))}return n},ld=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(s=>t[s]=i),r.axes.forEach(s=>n[s]=Math.round(e[s]*t[s]))):(t.fill(i,0,t.length),n.forEach((s,a)=>n[a]=Math.round(s*t[a]))),n},ud=(e,t,r,i,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${X("uniforms.scales","i",i)};
        var roi_low = ${X("uniforms.roi","i",n)};
        var roi_hi = ${X("uniforms.roi",`i + ${t.length}`,n)};
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
    }`,dd=(e,t,r,i,n,s,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${X("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${X("uniforms.roi","i",s)};
          var roi_hi = ${X("uniforms.roi",`i + ${r.length}`,s)};
          var input_shape_i = ${X("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${X("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,cd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${X("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Bn=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",hd=(e,t,r,i,n)=>{let[s,a,l,u]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${r[l]} - 1))`)};
      ${Bn(e,u,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${a}];
      var col:${d} = originalIndices[${l}];
      ${i?`if (row < 0 || row > (${r[a]} - 1) || col < 0 || col > (${r[l]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[a]} - 1));
      col = max(0, min(col, ${r[l]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
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
    }`},pd=(e,t,r,i,n,s,a,l,u,d)=>{let h=r.length===2,[f,m]=h?[0,1]:[2,3],y=e.type.value,_=w=>{let x=w===f?"row":"col";return`
      fn ${x}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",w)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[w]},
        ${i[w]}, ${r[w]}, ${s[w]}, ${s[w]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${l} && (originalIdx < 0 || originalIdx > (${r[w]} - 1))) {
          return ${u};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${x}: ${y} = originalIdx + ${y}(i);
          if (${x} < 0 || ${x} >= ${r[w]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:l?`return ${u};`:`${x} = max(0, min(${x}, ${r[w]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",w,`u32(${x})`)};
          data[i + 1] = ${w===f?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
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
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
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
    `},fd=(e,t,r,i,n)=>{let[s,a,l,u,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${r[u]} - 1))`)};
      ${Bn(e,d,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${a}];
      var height:${h} = originalIndices[${l}];
      var width:${h} = originalIndices[${u}];
      ${i?`if (depth < 0 || depth > (${r[a]} - 1) || height < 0 || height > (${r[l]} - 1) || width < 0 || (width > ${r[u]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[a]} - 1));
      height = max(0, min(height, ${r[l]} - 1));
      width = max(0, min(width, ${r[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
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
    }`},md=(e,t,r,i,n,s)=>{let a=e.dims,l=sd(s,t.axes,a.length),u=od(a,i,n,t.axes),d=i.slice();i.length===0&&(d=a.map((v,T)=>v===0?1:u[T]/v),t.keepAspectRatioPolicy!=="stretch"&&(u=ld(a,d,t)));let h=Y("output",e.dataType,u.length),f=D("input",e.dataType,a.length),m=A.size(u),y=a.length===u.length&&a.every((v,T)=>v===u[T]),_=t.coordinateTransformMode==="tf_crop_and_resize",w=t.extrapolationValue,x=f.type.value,$=v=>`
      ${y?"":`
      ${nd(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${cd(f,a)};
              ${ad(t.nearestMode,r,x)};
              ${dd(f,h,a,u,d.length,l.length,_)};
              `;case"linear":return`
              ${ud(h,a,u,d.length,l.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${hd(f,h,a,_,w)}`;if(a.length===3||a.length===5)return`${fd(f,h,a,_,w)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${pd(f,h,a,u,d,l,t.cubicCoeffA,_,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",l.length).declareVariables(f,h)}
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
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${n.length>0?n:""}|${l.length>0?l:""}|${y}|${t.mode==="nearest"?a.length:a}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:d},{type:1,data:l},...J(a,u)]})}},gd=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},af=(e,t)=>{let r=[],i=[],n=[],s=gd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");rd(e.inputs,t,s,r,i,n),e.compute(md(e.inputs[0],t,s,r,i,n),{inputs:[0]})},sf=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,s=e.excludeOutside!==0,a=e.extrapolationValue,l=e.keepAspectRatioPolicy,u=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return fe({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:s,extrapolationValue:a,keepAspectRatioPolicy:l,mode:u,nearestMode:d})}}),yd,_d,of,_0=L(()=>{ie(),se(),oe(),yd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},_d=(e,t,r,i)=>{let n=t.simplified,s=e[0].dims,a=A.size(s),l=s,u=a,d=s.slice(-1)[0],h=i?s.slice(0,-1).concat(1):[],f=!n&&e.length>3,m=e.length>4,y=i&&r>1,_=i&&r>2,w=r>3,x=64,$=$e(d),v=[{type:12,data:u},{type:12,data:$},{type:12,data:d},{type:1,data:t.epsilon}],T=I=>{let z=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],E=[D("x",e[0].dataType,e[0].dims,$),D("skip",e[1].dataType,e[1].dims,$),D("gamma",e[2].dataType,e[2].dims,$)];f&&E.push(D("beta",e[3].dataType,e[3].dims,$)),m&&E.push(D("bias",e[4].dataType,e[4].dims,$)),E.push(Y("output",e[0].dataType,l,$)),y&&E.push(Y("mean_output",1,h)),_&&E.push(Y("inv_std_output",1,h)),w&&E.push(Y("input_skip_bias_sum",e[0].dataType,l,$));let O=Ae(e[0].dataType),P=Ae(1,$);return`

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
          let bias_value = ${m?"bias[offset1d + i]":O+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${w?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Xt(O,$,"value")};
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
        let mean = ${It("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${It("square_sum",$)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${y?"mean_output[global_idx] = mean;":""}
        ${_?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${O}(mean)`}) *
            ${O}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},C=[{dims:l,dataType:e[0].dataType}];return r>1&&C.push({dims:h,dataType:1}),r>2&&C.push({dims:h,dataType:1}),r>3&&C.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${y};${_};${w}`,inputDependencies:e.map((I,z)=>"type")},getShaderSource:T,getRunData:()=>({outputs:C,dispatchGroup:{x:Math.ceil(u/d)},programUniforms:v})}},of=(e,t)=>{yd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(_d(e.inputs,t,e.outputCount,!1),{outputs:r})}}),bd,_i,wd,Nn,vd,$d,lf,uf,b0=L(()=>{ie(),se(),Ce(),oe(),bd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},_i=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},wd=(e,t)=>{if(e.length>1){let r=_i(e,1),i=_i(e,2),n=_i(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),fe({starts:r,ends:i,axes:n})}else return t},Nn=(e,t,r,i,n)=>{let s=e;return e<0&&(s+=r[i[t]]),n[t]<0?Math.max(0,Math.min(s,r[i[t]]-1)):Math.max(0,Math.min(s,r[i[t]]))},vd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
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
      }`,$d=(e,t)=>{let r=e[0].dims,i=A.size(r),n=t.axes.length>0?A.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],s=_i(e,4);s.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(n.length).fill(1));let a=t.starts.map(($,v)=>Nn($,v,r,n,s)),l=t.ends.map(($,v)=>Nn($,v,r,n,s));if(n.length!==a.length||n.length!==l.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let $=0;$<r.length;++$)n.includes($)||(a.splice($,0,0),l.splice($,0,r[$]),s.splice($,0,1));let u=s.map($=>Math.sign($));s.forEach(($,v,T)=>{if($<0){let C=(l[v]-a[v])/$,I=a[v],z=I+C*s[v];a[v]=z,l[v]=I,T[v]=-$}});let d=r.slice(0);n.forEach(($,v)=>{d[$]=Math.ceil((l[$]-a[$])/s[$])});let h={dims:d,dataType:e[0].dataType},f=Y("output",e[0].dataType,d.length),m=D("input",e[0].dataType,e[0].dims.length),y=A.size(d),_=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:s.length}],w=[{type:12,data:y},{type:12,data:a},{type:6,data:u},{type:12,data:s},...J(e[0].dims,d)],x=$=>`
      ${$.registerUniforms(_).declareVariables(m,f)}
        ${vd(m,f,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${a.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[h],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:w})}},lf=(e,t)=>{bd(e.inputs,t);let r=wd(e.inputs,t);e.compute($d(e.inputs,r),{inputs:[0]})},uf=e=>{let t=e.starts,r=e.ends,i=e.axes;return fe({starts:t,ends:r,axes:i})}}),xd,Cd,df,cf,w0=L(()=>{ie(),se(),Ce(),kt(),oe(),xd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Cd=(e,t)=>{let r=e.inputs[0],i=r.dims,n=A.size(i),s=i.length,a=A.normalizeAxis(t.axis,s),l=a<i.length-1,u,d=[];l?(d=Array.from({length:s},(E,O)=>O),d[a]=s-1,d[s-1]=a,u=e.compute(Fe(r,d),{inputs:[r],outputs:[-1]})[0]):u=r;let h=u.dims,f=h[s-1],m=n/f,y=$e(f),_=f/y,w=64;m===1&&(w=256);let x=(E,O)=>O===4?`max(max(${E}.x, ${E}.y), max(${E}.z, ${E}.w))`:O===2?`max(${E}.x, ${E}.y)`:O===3?`max(max(${E}.x, ${E}.y), ${E}.z)`:E,$=D("x",u.dataType,u.dims,y),v=Y("result",u.dataType,u.dims,y),T=$.type.value,C=Ae(u.dataType)==="f32"?`var threadMax = ${T}(-3.402823e+38f);`:`var threadMax = ${T}(-65504.0h);`,I=E=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${w}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
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
          rowMaxShared = ${T}(${x("threadShared[0]",y)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
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
          rowSumShared = ${T}(${It("threadShared[0]",y)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${T}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,z=e.compute({name:"Softmax",shaderCache:{hint:`${y};${w}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:u.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:_}]}),getShaderSource:I},{inputs:[u],outputs:[l?-1:0]})[0];l&&e.compute(Fe(z,d),{inputs:[z]})},df=(e,t)=>{xd(e.inputs),Cd(e,t)},cf=e=>fe({axis:e.axis})}),Pn,Sd,Td,Id,hf,v0=L(()=>{ie(),se(),oe(),Pn=e=>Array.from(e.getBigInt64Array(),Number),Sd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Pn(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Td=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Id=(e,t)=>{let r=e[0].dims,i=t??Pn(e[1]),n=Td(r,i),s=A.size(n),a=e[0].dataType,l=D("input",a,r.length),u=Y("output",a,n.length),d=h=>`
      const inputShape = ${l.indices(...r)};
      ${h.registerUniform("output_size","u32").declareVariables(l,u)}
      ${h.mainStart()}
      ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${l.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${l.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${l.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",l.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...J(e[0].dims,n)]}),getShaderSource:d}},hf=e=>{Sd(e.inputs),e.compute(Id(e.inputs),{inputs:[0]})}}),kd,Ed,pf,$0=L(()=>{ie(),se(),oe(),kd=(e,t,r,i,n)=>{let s=Y("output_data",n,r.length,4),a=D("a_data",t[1].dataType,t[1].dims.length,4),l=D("b_data",t[2].dataType,t[2].dims.length,4),u=D("c_data",t[0].dataType,t[0].dims.length,4),d,h=(f,m,y)=>`select(${m}, ${f}, ${y})`;if(!i)d=s.setByOffset("global_idx",h(a.getByOffset("global_idx"),l.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let f=(m,y,_="")=>{let w=`a_data[index_a${y}][component_a${y}]`,x=`b_data[index_b${y}][component_b${y}]`,$=`bool(c_data[index_c${y}] & (0xffu << (component_c${y} * 8)))`;return`
            let output_indices${y} = ${s.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offset_a${y} = ${a.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_b${y} = ${l.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let offset_c${y} = ${u.broadcastedIndicesToOffset(`output_indices${y}`,s)};
            let index_a${y} = offset_a${y} / 4u;
            let index_b${y} = offset_b${y} / 4u;
            let index_c${y} = offset_c${y} / 4u;
            let component_a${y} = offset_a${y} % 4u;
            let component_b${y} = offset_b${y} % 4u;
            let component_c${y} = offset_c${y} % 4u;
            ${m}[${y}] = ${_}(${h(w,x,$)});
          `};n===9?d=`
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
        ${e.registerUniform("vec_size","u32").declareVariables(u,a,l,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Ed=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,s=!(A.areEqual(t,r)&&A.areEqual(r,i)),a=t,l=A.size(t);if(s){let d=ei.calcShape(ei.calcShape(t,r,!1),i,!1);if(!d)throw new Error("Can't perform where op on the given tensors");a=d,l=A.size(a)}let u=Math.ceil(l/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>kd(d,e,a,s,n),getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:u},...J(i,t,r,a)]})}},pf=e=>{e.compute(Ed(e.inputs))}}),ff,x0=L(()=>{Ng(),Aa(),Pg(),Ug(),Lg(),Hg(),Wg(),jg(),Zg(),Yg(),Xg(),Jg(),Qg(),e0(),t0(),i0(),r0(),n0(),a0(),s0(),o0(),l0(),u0(),d0(),c0(),Mp(),h0(),p0(),f0(),m0(),g0(),za(),y0(),Np(),_0(),b0(),w0(),Dp(),v0(),kt(),Ma(),$0(),ff=new Map([["Abs",[sh]],["Acos",[oh]],["Acosh",[lh]],["Add",[Wh]],["ArgMax",[ih,ia]],["ArgMin",[th,ia]],["Asin",[uh]],["Asinh",[dh]],["Atan",[ch]],["Atanh",[hh]],["Attention",[rh]],["AveragePool",[Gp,Vp]],["BatchNormalization",[nh]],["BiasAdd",[ah]],["BiasSplitGelu",[Hh]],["Cast",[fh,ph]],["Ceil",[gh]],["Clip",[mh]],["Concat",[Jh,Qh]],["Conv",[la,oa]],["ConvTranspose",[up,lp]],["Cos",[yh]],["Cosh",[_h]],["CumSum",[dp,cp]],["DepthToSpace",[hp,pp]],["DequantizeLinear",[Qp,ef]],["Div",[Fh]],["Einsum",[fp,mp]],["Elu",[bh,xi]],["Equal",[qh]],["Erf",[wh]],["Exp",[vh]],["Expand",[gp]],["FastGelu",[yp]],["Floor",[$h]],["FusedConv",[la,oa]],["Gather",[bp,_p]],["GatherElements",[Sp,Cp]],["GatherBlockQuantized",[$p,xp]],["GatherND",[wp,vp]],["Gelu",[xh]],["Gemm",[Ip,Tp]],["GlobalAveragePool",[Kp,jp]],["GlobalMaxPool",[Jp,Xp]],["Greater",[Kh]],["GreaterOrEqual",[Yh]],["GridSample",[kp,Ep]],["GroupQueryAttention",[Pp]],["HardSigmoid",[Ah,zh]],["InstanceNormalization",[Up]],["LayerNormalization",[Lp]],["LeakyRelu",[Ch,xi]],["Less",[Zh]],["LessOrEqual",[Xh]],["Log",[Uh]],["MatMul",[Hp]],["MatMulNBits",[Wp,Fp]],["MaxPool",[Zp,Yp]],["Mul",[Vh]],["MultiHeadAttention",[Ap,zp]],["Neg",[Th]],["Not",[Sh]],["Pad",[qp]],["Pow",[Gh]],["QuickGelu",[Lh,xi]],["Range",[tf]],["Reciprocal",[Ih]],["ReduceMin",[Yc]],["ReduceMean",[Vc]],["ReduceMax",[Zc]],["ReduceSum",[Jc]],["ReduceProd",[Xc]],["ReduceL1",[Gc]],["ReduceL2",[jc]],["ReduceLogSum",[eh]],["ReduceLogSumExp",[Kc]],["ReduceSumSquare",[Qc]],["Relu",[kh]],["Resize",[af,sf]],["RotaryEmbedding",[Bp]],["ScatterND",[nf,rf]],["Sigmoid",[Eh]],["Sin",[Mh]],["Sinh",[Oh]],["Slice",[lf,uf]],["SkipLayerNormalization",[of]],["Split",[Op,Rp]],["Sqrt",[Rh]],["Softmax",[df,cf]],["Sub",[jh]],["Tan",[Dh]],["Tanh",[Bh]],["ThresholdedRelu",[Ph,xi]],["Tile",[hf]],["Transpose",[Oc,Rc]],["Where",[pf]]])}),mf,C0=L(()=>{je(),yt(),oe(),mf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){st(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let d of t)l.push({binding:l.length,resource:{buffer:d.buffer}});for(let d of r)l.push({binding:l.length,resource:{buffer:d.buffer}});n&&l.push({binding:l.length,resource:n});let u=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:l,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}a.setPipeline(e.computePipeline),a.setBindGroup(0,u),a.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),tt(e.programInfo.name)}dispose(){}build(e,t){st(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{r.features.has(d.feature)&&i.push(`enable ${d.extension};`)});let n=Mc(t,this.backend.device.limits),s=e.getShaderSource(n),a=`${i.join(`
`)}
${n.additionalImplementations}
${s}`,l=r.createShaderModule({code:a,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let u=r.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return tt(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let s=t*r*i,a=Math.ceil(Math.sqrt(s));if(a>n){if(a=Math.ceil(Math.cbrt(s)),a>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}}),gf={};ii(gf,{WebGpuBackend:()=>yf});var zd,Ad,Md,yf,S0=L(()=>{je(),ie(),yt(),Ic(),Dg(),x0(),C0(),zd=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let s=e[i].dims.length;r.push(`${n};${s}`);break}case"dims":{let s=e[i].dims.join(",");r.push(`${n};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Ad=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${zd(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Md=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},yf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=s=>t.features.has(s)&&r.push(s)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new Md(t.info||await t.requestAdapterInfo()),this.gpuDataManager=zc(this),this.programManager=new mf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ta(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;st(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let n=r[i],s=n.kernelId,a=this.kernels.get(s),l=a.kernelType,u=a.kernelName,d=n.programName,h=n.inputTensorViews,f=n.outputTensorViews,m=t[i*2],y=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=m);let _=Number(m-this.queryTimeBase),w=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(w))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map(x=>({dims:x.dims,dataType:mt(x.dataType)})),outputsMetadata:f.map(x=>({dims:x.dims,dataType:mt(x.dataType)})),kernelId:s,kernelType:l,kernelName:u,programName:d,startTime:_,endTime:w});else{let x="";h.forEach((v,T)=>{x+=`input[${T}]: [${v.dims}] | ${mt(v.dataType)}, `});let $="";f.forEach((v,T)=>{$+=`output[${T}]: [${v.dims}] | ${mt(v.dataType)}, `}),console.log(`[profiling] kernel "${s}|${l}|${u}|${d}" ${x}${$}start time: ${_} ns, execution time: ${w-_} ns`)}cr("GPU",`${d}::${m}::${y}`)}e.unmap(),this.pendingQueries.delete(e)}),tt()}run(e,t,r,i,n,s){st(e.name);let a=[];for(let v=0;v<t.length;++v){let T=t[v].data;if(T===0)continue;let C=this.gpuDataManager.get(T);if(!C)throw new Error(`no GPU data for input: ${T}`);a.push(C)}let{outputs:l,dispatchGroup:u,programUniforms:d}=e.getRunData(t),h=r.length===0?l.map((v,T)=>T):r;if(h.length!==l.length)throw new Error(`Output size ${h.length} must be equal to ${l.length}.`);let f=[],m=[];for(let v=0;v<l.length;++v){if(!Number.isInteger(h[v])||h[v]<-3||h[v]>=s)throw new Error(`Invalid output index: ${h[v]}`);if(h[v]===-3)continue;let T=h[v]===-1,C=h[v]===-2,I=T||C?n(l[v].dataType,l[v].dims):i(h[v],l[v].dataType,l[v].dims);if(f.push(I),I.data===0)continue;let z=this.gpuDataManager.get(I.data);if(!z)throw new Error(`no GPU data for output: ${I.data}`);if(T&&this.temporaryData.push(z),C){let E=this.kernelPersistentData.get(this.currentKernelId);E||(E=[],this.kernelPersistentData.set(this.currentKernelId,E)),E.push(z)}m.push(z)}if(a.length!==t.length||m.length!==f.length){if(m.length===0)return tt(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(d){let v=0,T=[];d.forEach(E=>{let O=typeof E.data=="number"?[E.data]:E.data;if(O.length===0)return;let P=E.type===10?2:4,F,V;E.type===10?(V=O.length>4?16:O.length>2?8:O.length*P,F=O.length>4?16:P*O.length):(V=O.length<=2?O.length*P:16,F=16),v=Math.ceil(v/V)*V,T.push(v);let G=E.type===10?8:4;v+=O.length>4?Math.ceil(O.length/G)*F:O.length*P});let C=16;v=Math.ceil(v/C)*C;let I=new ArrayBuffer(v);d.forEach((E,O)=>{let P=T[O],F=typeof E.data=="number"?[E.data]:E.data;if(E.type===6)new Int32Array(I,P,F.length).set(F);else if(E.type===12)new Uint32Array(I,P,F.length).set(F);else if(E.type===10)new Uint16Array(I,P,F.length).set(F);else if(E.type===1)new Float32Array(I,P,F.length).set(F);else throw new Error(`Unsupported uniform type: ${mt(E.type)}`)});let z=this.gpuDataManager.create(v,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(z.buffer,0,I,0,v),this.gpuDataManager.release(z.id),y={offset:0,size:v,buffer:z.buffer}}let _=this.programManager.normalizeDispatchGroupSize(u),w=_[1]===1&&_[2]===1,x=Ad(e,t,w),$=this.programManager.getArtifact(x);if($||($=this.programManager.build(e,_),this.programManager.setArtifact(x,$),de("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),d&&$.uniformVariablesInfo){if(d.length!==$.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${d.length} in program "${$.programInfo.name}".`);for(let v=0;v<d.length;v++){let T=d[v],C=T.type,I=typeof T.data=="number"?1:T.data.length,[z,E]=$.uniformVariablesInfo[v];if(C!==z||I!==E)throw new Error(`Uniform variable ${v} mismatch: expect type ${z} with size ${E}, got type ${C} with size ${I} in program "${$.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let v={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(v),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(v)}return this.programManager.run($,a,m,_,y),tt(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=ff.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,s=i.kernelName,a=i.kernelEntry,l=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${n}] ${s}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),a(t,l[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${s}" failed. ${d}`)),1}finally{u&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${n}] ${s}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let s=n.get(t),a=this.gpuDataManager.registerExternalBuffer(r,i,s);return n.set(t,[a,r]),a}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await Qn(this,e,t);return Ia(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),s=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(s.computePipeline),n.setBindGroup(0,s.bindGroup),n.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),_f={};ii(_f,{init:()=>bf});var ir,Od,bf,T0=L(()=>{ie(),yt(),se(),Rg(),ir=class wf{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(A.size(t)!==A.size(this.dims))throw new Error("Invalid new shape");return new wf(this.module,this.dataType,this.data,t)}},Od=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,s=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,s));let a=Number(e.getValue(i*n++,s));this.outputCount=Number(e.getValue(i*n++,s)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,s));let l=[];for(let u=0;u<a;u++){let d=Number(e.getValue(i*n++,s)),h=Number(e.getValue(i*n++,"*")),f=Number(e.getValue(i*n++,s)),m=[];for(let y=0;y<f;y++)m.push(Number(e.getValue(i*n++,s)));l.push(new ir(e,d,h,m))}this.inputs=l}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,i=t?.outputs??[],n=(a,l,u)=>new ir(this.module,l,this.output(a,u),u),s=(a,l)=>{let u=Lt(a,l);if(!u)throw new Error(`Unsupported data type: ${a}`);let d=u>0?this.backend.gpuDataManager.create(u).id:0;return new ir(this.module,a,d,l)};return this.backend.run(e,r,i,n,s,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",s=this.module.stackAlloc((1+t.length)*i);this.module.setValue(s,t.length,n);for(let a=0;a<t.length;a++)this.module.setValue(s+i*(a+1),t[a],n);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},bf=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=(S0(),Ai(gf)).WebGpuBackend,a=new s;await a.initialize(r,i),n("webgpu",[a,l=>a.alloc(Number(l)),l=>a.free(l),(l,u,d,h=!1)=>{if(h)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(l)}, dst=${Number(u)}, size=${Number(d)}`),a.memcpy(Number(l),Number(u));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(l)}, gpuDataId=${Number(u)}, size=${Number(d)}`);let f=t.HEAPU8.subarray(Number(l>>>0),Number(l>>>0)+Number(d));a.upload(Number(u),f)}},async(l,u,d)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${l}, dataOffset=${u}, size=${d}`),await a.download(Number(l),()=>t.HEAPU8.subarray(Number(u)>>>0,Number(u+d)>>>0))},(l,u,d)=>a.createKernel(l,Number(u),d,t.UTF8ToString(t._JsepGetNodeName(Number(u)))),l=>a.releaseKernel(l),(l,u,d,h)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${l}, contextDataOffset=${u}`);let f=new Od(t,a,Number(u));return a.computeKernel(Number(l),f,h)},()=>a.captureBegin(),()=>a.captureEnd(),()=>a.replay()])}else{let s=new Ec(r);n("webnn",[s,()=>s.reserveTensorId(),a=>s.releaseTensorId(a),async(a,l,u,d,h)=>s.ensureTensor(a,l,u,d,h),(a,l)=>{s.uploadTensor(a,l)},async(a,l)=>s.downloadTensor(a,l),(a,l)=>s.registerMLContext(a,l),!!r.trace])}}}),Rd,Pa,Ua,Ct,Dd,Un,_r,La,Ha,Ln,Wa,Fa,qa,vf=L(()=>{je(),Ag(),Mg(),ie(),Gt(),$a(),xc(),Rd=(e,t)=>{_e()._OrtInit(e,t)!==0&&me("Can't initialize onnxruntime.")},Pa=async e=>{Rd(e.wasm.numThreads,pr(e.logLevel))},Ua=async(e,t)=>{_e().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:n}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(T0(),Ai(_f)).init;t==="webgpu"&&await i("webgpu",_e(),e,r),t==="webnn"&&await i("webnn",_e(),e)}},Ct=new Map,Dd=e=>{let t=_e(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&me("Can't get session input/output count.");let s=i===4?"i32":"i64";return[Number(t.getValue(n,s)),Number(t.getValue(n+i,s))]}finally{t.stackRestore(r)}},Un=(e,t)=>{let r=_e(),i=r.stackSave(),n=0;try{let s=r.PTR_SIZE,a=r.stackAlloc(2*s);r._OrtGetInputOutputMetadata(e,t,a,a+s)!==0&&me("Can't get session input/output metadata.");let l=Number(r.getValue(a,"*"));n=Number(r.getValue(a+s,"*"));let u=r.HEAP32[n/4];if(u===0)return[l,0];let d=r.HEAPU32[n/4+1],h=[];for(let f=0;f<d;f++){let m=Number(r.getValue(n+8+f*s,"*"));h.push(m!==0?r.UTF8ToString(m):Number(r.getValue(n+8+(f+d)*s,"*")))}return[l,u,h]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},_r=e=>{let t=_e(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},La=async(e,t)=>{let r,i,n=_e();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=_r(e);let s=0,a=0,l=0,u=[],d=[],h=[];try{if([a,u]=await $c(t),t?.externalData&&n.mountExternalData){let C=[];for(let I of t.externalData){let z=typeof I=="string"?I:I.path;C.push(Sa(typeof I=="string"?I:I.data).then(E=>{n.mountExternalData(z,E)}))}await Promise.all(C)}for(let C of t?.executionProviders??[])if((typeof C=="string"?C:C.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof C!="string"){let I=C,z=I?.context,E=I?.gpuDevice,O=I?.deviceType,P=I?.powerPreference;z?n.currentContext=z:E?n.currentContext=await n.webnnCreateMLContext(E):n.currentContext=await n.webnnCreateMLContext({deviceType:O,powerPreference:P})}else n.currentContext=await n.webnnCreateMLContext();break}s=await n._OrtCreateSession(r,i,a),n.webgpuOnCreateSession?.(s),s===0&&me("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(s,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[f,m]=Dd(s),y=!!t?.enableGraphCapture,_=[],w=[],x=[],$=[],v=[];for(let C=0;C<f;C++){let[I,z,E]=Un(s,C);I===0&&me("Can't get an input name."),d.push(I);let O=n.UTF8ToString(I);_.push(O),x.push(z===0?{name:O,isTensor:!1}:{name:O,isTensor:!0,type:mt(z),shape:E})}for(let C=0;C<m;C++){let[I,z,E]=Un(s,C+f);I===0&&me("Can't get an output name."),h.push(I);let O=n.UTF8ToString(I);w.push(O),$.push(z===0?{name:O,isTensor:!1}:{name:O,isTensor:!0,type:mt(z),shape:E});{if(y&&t?.preferredOutputLocation===void 0){v.push("gpu-buffer");continue}let P=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[O]??"cpu",F=n.webnnIsGraphOutput;if(P==="cpu"&&F&&F(s,O)){v.push("ml-tensor-cpu-output");continue}if(P!=="cpu"&&P!=="cpu-pinned"&&P!=="gpu-buffer"&&P!=="ml-tensor")throw new Error(`Not supported preferred output location: ${P}.`);if(y&&P!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${P}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);v.push(P)}}let T=null;return v.some(C=>C==="gpu-buffer"||C==="ml-tensor"||C==="ml-tensor-cpu-output")&&(l=n._OrtCreateBinding(s),l===0&&me("Can't create IO binding."),T={handle:l,outputPreferredLocations:v,outputPreferredLocationsEncoded:v.map(C=>C==="ml-tensor-cpu-output"?"ml-tensor":C).map(C=>Xn(C))}),Ct.set(s,[s,d,h,T,y,!1]),[s,_,w,x,$]}catch(f){throw d.forEach(m=>n._OrtFree(m)),h.forEach(m=>n._OrtFree(m)),l!==0&&n._OrtReleaseBinding(l)!==0&&me("Can't release IO binding."),s!==0&&n._OrtReleaseSession(s)!==0&&me("Can't release session."),f}finally{n._free(r),a!==0&&n._OrtReleaseSessionOptions(a)!==0&&me("Can't release session options."),u.forEach(f=>n._free(f)),n.unmountExternalData?.()}},Ha=e=>{let t=_e(),r=Ct.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,s,a,l]=r;a&&(l&&t._OrtClearBoundOutputs(a.handle)!==0&&me("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&me("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),n.forEach(u=>t._OrtFree(u)),s.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(i)!==0&&me("Can't release session."),Ct.delete(e)},Ln=async(e,t,r,i,n,s,a=!1)=>{if(!e){t.push(0);return}let l=_e(),u=l.PTR_SIZE,d=e[0],h=e[1],f=e[3],m=f,y,_;if(d==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(a&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let $=e[2].gpuBuffer;_=Lt(Ut(d),h);{let v=l.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=v(i,s,$,_)}}else if(f==="ml-tensor"){let $=e[2].mlTensor;_=Lt(Ut(d),h);let v=l.webnnRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=v(i,$,Ut(d),h)}else{let $=e[2];if(Array.isArray($)){_=u*$.length,y=l._malloc(_),r.push(y);for(let v=0;v<$.length;v++){if(typeof $[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);l.setValue(y+v*u,Qe($[v],r),"*")}}else{let v=l.webnnIsGraphInput,T=l.webnnIsGraphOutput;if(d!=="string"&&v&&T){let C=l.UTF8ToString(n);if(v(i,C)||T(i,C)){let I=Ut(d);_=Lt(I,h),m="ml-tensor";let z=l.webnnCreateTemporaryTensor,E=l.webnnUploadTensor;if(!z||!E)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let O=await z(i,I,h);E(O,new Uint8Array($.buffer,$.byteOffset,$.byteLength)),y=O}else _=$.byteLength,y=l._malloc(_),r.push(y),l.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),y)}else _=$.byteLength,y=l._malloc(_),r.push(y),l.HEAPU8.set(new Uint8Array($.buffer,$.byteOffset,_),y)}}let w=l.stackSave(),x=l.stackAlloc(4*h.length);try{h.forEach((v,T)=>l.setValue(x+T*u,v,u===4?"i32":"i64"));let $=l._OrtCreateTensor(Ut(d),y,_,x,h.length,Xn(m));$===0&&me(`Can't create tensor for input/output. session=${i}, index=${s}.`),t.push($)}finally{l.stackRestore(w)}},Wa=async(e,t,r,i,n,s)=>{let a=_e(),l=a.PTR_SIZE,u=Ct.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=u[0],h=u[1],f=u[2],m=u[3],y=u[4],_=u[5],w=t.length,x=i.length,$=0,v=[],T=[],C=[],I=[],z=a.stackSave(),E=a.stackAlloc(w*l),O=a.stackAlloc(w*l),P=a.stackAlloc(x*l),F=a.stackAlloc(x*l);try{[$,v]=vc(s),Ht("wasm prepareInputOutputTensor");for(let q=0;q<w;q++)await Ln(r[q],T,I,e,h[t[q]],t[q],y);for(let q=0;q<x;q++)await Ln(n[q],C,I,e,f[i[q]],w+i[q],y);Wt("wasm prepareInputOutputTensor");for(let q=0;q<w;q++)a.setValue(E+q*l,T[q],"*"),a.setValue(O+q*l,h[t[q]],"*");for(let q=0;q<x;q++)a.setValue(P+q*l,C[q],"*"),a.setValue(F+q*l,f[i[q]],"*");if(m&&!_){let{handle:q,outputPreferredLocations:ne,outputPreferredLocationsEncoded:Q}=m;if(h.length!==w)throw new Error(`input count from feeds (${w}) is expected to be always equal to model's input count (${h.length}).`);Ht("wasm bindInputsOutputs");for(let K=0;K<w;K++){let ae=t[K];await a._OrtBindInput(q,h[ae],T[K])!==0&&me(`Can't bind input[${K}] for session=${e}.`)}for(let K=0;K<x;K++){let ae=i[K];n[K]?.[3]?a._OrtBindOutput(q,f[ae],C[K],0)!==0&&me(`Can't bind pre-allocated output[${K}] for session=${e}.`):a._OrtBindOutput(q,f[ae],0,Q[ae])!==0&&me(`Can't bind output[${K}] to ${ne[K]} for session=${e}.`)}Wt("wasm bindInputsOutputs"),Ct.set(e,[d,h,f,m,y,!0])}a.jsepOnRunStart?.(d),a.webnnOnRunStart?.(d);let V;m?V=await a._OrtRunWithBinding(d,m.handle,x,P,$):V=await a._OrtRun(d,O,E,w,F,x,P,$),V!==0&&me("failed to call OrtRun().");let G=[],ee=[];Ht("wasm ProcessOutputTensor");for(let q=0;q<x;q++){let ne=Number(a.getValue(P+q*l,"*"));if(ne===C[q]){G.push(n[q]);continue}let Q=a.stackSave(),K=a.stackAlloc(4*l),ae=!1,j,ye=0;try{a._OrtGetTensorData(ne,K,K+l,K+2*l,K+3*l)!==0&&me(`Can't access output tensor data on index ${q}.`);let U=l===4?"i32":"i64",W=Number(a.getValue(K,U));ye=a.getValue(K+l,"*");let re=a.getValue(K+l*2,"*"),ce=Number(a.getValue(K+l*3,U)),B=[];for(let be=0;be<ce;be++)B.push(Number(a.getValue(re+be*l,U)));a._OrtFree(re)!==0&&me("Can't free memory for tensor dims.");let ue=B.reduce((be,we)=>be*we,1);j=mt(W);let it=m?.outputPreferredLocations[i[q]];if(j==="string"){if(it==="gpu-buffer"||it==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let be=[];for(let we=0;we<ue;we++){let Se=a.getValue(ye+we*l,"*"),Di=a.getValue(ye+(we+1)*l,"*"),ri=we===ue-1?void 0:Di-Se;be.push(a.UTF8ToString(Se,ri))}G.push([j,B,be,"cpu"])}else if(it==="gpu-buffer"&&ue>0){let be=a.jsepGetBuffer;if(!be)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let we=be(ye),Se=Lt(W,ue);if(Se===void 0||!xa(j))throw new Error(`Unsupported data type: ${j}`);ae=!0,G.push([j,B,{gpuBuffer:we,download:a.jsepCreateDownloader(we,Se,j),dispose:()=>{a._OrtReleaseTensor(ne)!==0&&me("Can't release tensor.")}},"gpu-buffer"])}else if(it==="ml-tensor"&&ue>0){let be=a.webnnEnsureTensor,we=a.webnnIsGraphInputOutputTypeSupported;if(!be||!we)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Lt(W,ue)===void 0||!Ca(j))throw new Error(`Unsupported data type: ${j}`);if(!we(e,j,!1))throw new Error(`preferredLocation "ml-tensor" for ${j} output is not supported by current WebNN Context.`);let Se=await be(e,ye,W,B,!1);ae=!0,G.push([j,B,{mlTensor:Se,download:a.webnnCreateMLTensorDownloader(ye,j),dispose:()=>{a.webnnReleaseTensorId(ye),a._OrtReleaseTensor(ne)}},"ml-tensor"])}else if(it==="ml-tensor-cpu-output"&&ue>0){let be=a.webnnCreateMLTensorDownloader(ye,j)(),we=G.length;ae=!0,ee.push((async()=>{let Se=[we,await be];return a.webnnReleaseTensorId(ye),a._OrtReleaseTensor(ne),Se})()),G.push([j,B,[],"cpu"])}else{let be=wr(j),we=new be(ue);new Uint8Array(we.buffer,we.byteOffset,we.byteLength).set(a.HEAPU8.subarray(ye,ye+we.byteLength)),G.push([j,B,we,"cpu"])}}finally{a.stackRestore(Q),j==="string"&&ye&&a._free(ye),ae||a._OrtReleaseTensor(ne)}}m&&!y&&(a._OrtClearBoundOutputs(m.handle)!==0&&me("Can't clear bound outputs."),Ct.set(e,[d,h,f,m,y,!1]));for(let[q,ne]of await Promise.all(ee))G[q][2]=ne;return Wt("wasm ProcessOutputTensor"),G}finally{a.webnnOnRunEnd?.(d),a.stackRestore(z),T.forEach(V=>a._OrtReleaseTensor(V)),C.forEach(V=>a._OrtReleaseTensor(V)),I.forEach(V=>a._free(V)),$!==0&&a._OrtReleaseRunOptions($),v.forEach(V=>a._free(V))}},Fa=e=>{let t=_e(),r=Ct.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&me("Can't get an profile file name."),t._OrtFree(n)},qa=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),St,Ve,Zt,bi,wi,rr,Hn,nr,Rt,Dt,Bd,$f,xf,Cf,Sf,Tf,If,kf,Ef=L(()=>{je(),vf(),Gt(),wa(),St=()=>!!ge.wasm.proxy&&typeof document<"u",Zt=!1,bi=!1,wi=!1,nr=new Map,Rt=(e,t)=>{let r=nr.get(e);r?r.push(t):nr.set(e,[t])},Dt=()=>{if(Zt||!bi||wi||!Ve)throw new Error("worker not ready")},Bd=e=>{switch(e.data.type){case"init-wasm":Zt=!1,e.data.err?(wi=!0,Hn[1](e.data.err)):(bi=!0,Hn[0]()),rr&&(URL.revokeObjectURL(rr),rr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=nr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},$f=async()=>{if(!bi){if(Zt)throw new Error("multiple calls to 'initWasm()' detected.");if(wi)throw new Error("previous call to 'initWasm()' failed.");if(Zt=!0,St())return new Promise((e,t)=>{Ve?.terminate(),bc().then(([r,i])=>{try{Ve=i,Ve.onerror=s=>t(s),Ve.onmessage=Bd,Hn=[e,t];let n={type:"init-wasm",in:ge};!n.in.wasm.wasmPaths&&(r||Yn)&&(n.in.wasm.wasmPaths={wasm:new URL(""+new URL("ort-wasm-simd-threaded.jsep-BGTZ4Y7F.wasm",import.meta.url).href,import.meta.url).href}),Ve.postMessage(n),rr=r}catch(n){t(n)}},t)});try{await va(ge.wasm),await Pa(ge),bi=!0}catch(e){throw wi=!0,e}finally{Zt=!1}}},xf=async e=>{if(St())return Dt(),new Promise((t,r)=>{Rt("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:ge}};Ve.postMessage(i)});await Ua(ge,e)},Cf=async e=>St()?(Dt(),new Promise((t,r)=>{Rt("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};Ve.postMessage(i,[e.buffer])})):_r(e),Sf=async(e,t)=>{if(St()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Dt(),new Promise((r,i)=>{Rt("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Ve.postMessage(n,s)})}else return La(e,t)},Tf=async e=>{if(St())return Dt(),new Promise((t,r)=>{Rt("release",[t,r]);let i={type:"release",in:e};Ve.postMessage(i)});Ha(e)},If=async(e,t,r,i,n,s)=>{if(St()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Dt(),new Promise((a,l)=>{Rt("run",[a,l]);let u=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:i,options:s}};Ve.postMessage(d,qa(u))})}else return Wa(e,t,r,i,n,s)},kf=async e=>{if(St())return Dt(),new Promise((t,r)=>{Rt("end-profiling",[t,r]);let i={type:"end-profiling",in:e};Ve.postMessage(i)});Fa(e)}}),Wn,Nd,zf,I0=L(()=>{je(),Ef(),ie(),ba(),xc(),Wn=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Nd=e=>{switch(e[3]){case"cpu":return new Ge(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!xa(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return Ge.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!Ca(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return Ge.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},zf=class{async fetchModelAndCopyToWasmMemory(e){return Cf(await Sa(e))}async loadModel(e,t){st();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Sf(r,t),tt()}async dispose(){return Tf(this.sessionId)}async run(e,t,r){st();let i=[],n=[];Object.entries(e).forEach(f=>{let m=f[0],y=f[1],_=this.inputNames.indexOf(m);if(_===-1)throw new Error(`invalid input '${m}'`);i.push(y),n.push(_)});let s=[],a=[];Object.entries(t).forEach(f=>{let m=f[0],y=f[1],_=this.outputNames.indexOf(m);if(_===-1)throw new Error(`invalid output '${m}'`);s.push(y),a.push(_)});let l=i.map((f,m)=>Wn(f,()=>`input "${this.inputNames[n[m]]}"`)),u=s.map((f,m)=>f?Wn(f,()=>`output "${this.outputNames[a[m]]}"`):null),d=await If(this.sessionId,n,l,a,u,r),h={};for(let f=0;f<d.length;f++)h[this.outputNames[a[f]]]=s[f]??Nd(d[f]);return tt(),h}startProfiling(){}endProfiling(){kf(this.sessionId)}}}),Af={};ii(Af,{OnnxruntimeWebAssemblyBackend:()=>ca,initializeFlags:()=>da,wasmBackend:()=>Mf});var da,ca,Mf,k0=L(()=>{je(),Ef(),I0(),da=()=>{(typeof ge.wasm.initTimeout!="number"||ge.wasm.initTimeout<0)&&(ge.wasm.initTimeout=0);let e=ge.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ge.wasm.simd=!1),typeof ge.wasm.proxy!="boolean"&&(ge.wasm.proxy=!1),typeof ge.wasm.trace!="boolean"&&(ge.wasm.trace=!1),typeof ge.wasm.numThreads!="number"||!Number.isInteger(ge.wasm.numThreads)||ge.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ge.wasm.numThreads=1;else{let t=typeof navigator>"u"?pg("node:os").cpus().length:navigator.hardwareConcurrency;ge.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},ca=class{async init(e){da(),await $f(),await xf(e)}async createInferenceSessionHandler(e,t){let r=new zf;return await r.loadModel(e,t),r}},Mf=new ca});je();je();je();var E0="1.23.2";{let e=(k0(),Ai(Af)).wasmBackend;Yt("webgpu",e,5),Yt("webnn",e,5),Yt("cpu",e,10),Yt("wasm",e,10)}Object.defineProperty(ge.versions,"web",{value:E0,enumerable:!0});class Jt{static instance;container;logContent;isVisible=!1;constructor(){this.container=document.createElement("div"),this.container.style.position="fixed",this.container.style.top="0",this.container.style.left="0",this.container.style.width="100vw",this.container.style.height="50vh",this.container.style.backgroundColor="rgba(0,0,0,0.8)",this.container.style.color="#0f0",this.container.style.fontFamily="monospace",this.container.style.fontSize="12px",this.container.style.overflowY="scroll",this.container.style.zIndex="9999",this.container.style.padding="10px",this.container.style.pointerEvents="none",this.container.style.display="none",this.logContent=document.createElement("pre"),this.logContent.style.margin="0",this.logContent.style.whiteSpace="pre-wrap",this.container.appendChild(this.logContent),document.body.appendChild(this.container);let t=0;document.addEventListener("touchstart",()=>{t++,setTimeout(()=>t=0,500),t===3&&this.toggle()})}static getInstance(){return Jt.instance||(Jt.instance=new Jt),Jt.instance}toggle(){this.isVisible=!this.isVisible,this.container.style.display=this.isVisible?"block":"none",this.container.style.pointerEvents=this.isVisible?"auto":"none"}log(t){console.log(t);const r=typeof t=="string"?t:JSON.stringify(t);this.logContent.textContent+=`> ${r}
`,this.container.scrollTop=this.container.scrollHeight}error(t){console.error(t);const r=typeof t=="string"?t:JSON.stringify(t);this.logContent.textContent+=`[ERR] ${r}
`,this.container.scrollTop=this.container.scrollHeight}}const Ee=Jt.getInstance();function Oi(e,t,r){if(typeof OffscreenCanvas<"u")try{const i=new OffscreenCanvas(e,t),n=i.getContext("2d",r);if(n)return{canvas:i,ctx:n};console.warn("[canvas2d] OffscreenCanvas 2D context returned null, falling back to HTMLCanvasElement")}catch(i){console.warn("[canvas2d] OffscreenCanvas failed:",i)}if(typeof document<"u"){const i=document.createElement("canvas");i.width=e,i.height=t;const n=i.getContext("2d",r);if(n)return{canvas:i,ctx:n}}throw new Error("[canvas2d] 2D canvas context not supported in this environment")}const Va="pending-verification";function Of(){return/iPhone|iPad|iPod/.test(navigator.userAgent)}async function z0(e){const t=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t)).map(i=>i.toString(16).padStart(2,"0")).join("")}function A0(e="/best.onnx"){return new URL(e,window.location.href).toString()}async function M0(e){const t={ok:!1,status:0,statusText:"",contentLength:null,actualBytes:0,buffer:null,error:null,headers:{}};try{const r=await fetch(e,{method:"GET",cache:"no-cache"});t.status=r.status,t.statusText=r.statusText,t.ok=r.ok,r.headers.forEach((s,a)=>{t.headers[a.toLowerCase()]=s});const i=r.headers.get("Content-Length");if(i&&(t.contentLength=parseInt(i,10)),!r.ok)return t.error=`HTTP ${r.status}: ${r.statusText}`,t;const n=await r.arrayBuffer();t.buffer=n,t.actualBytes=n.byteLength}catch(r){const i=r;t.error=`Fetch failed: ${i.message}`,i.message.includes("Failed to fetch")&&(t.error+=" (Possible CORS, network, or mixed-content issue)")}return t}function Pd(e){const t=[],r=[];for(const i of e.inputNames)t.push({name:i,dims:["unknown"]});for(const i of e.outputNames)r.push({name:i,dims:["unknown"]});return{inputs:t,outputs:r}}function O0(){return{userAgent:navigator.userAgent,isIOS:Of(),isSecureContext:window.isSecureContext,modelUrl:null,fetchResult:null,sha256:null,hashMatch:!1,expectedHash:Va,backend:null,backendFallbackReason:null,ortSettings:{numThreads:ge.wasm.numThreads??0,simd:!!(ge.wasm.simd??!0),wasmPaths:String(ge.wasm.wasmPaths||"")},sessionInfo:null,lastInferenceMs:null,lastInferenceTimestamp:null,lastError:null,lastErrorStack:null}}function R0(e){for(let t=0;t<Math.min(e.length,1e4);t++)if(!Number.isFinite(e[t]))return!1;return!0}function D0(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/(1024*1024)).toFixed(2)} MB`}const B0=["whale_blow"];class N0{session=null;inputName="images";outputName="output0";inputShape=[1,3,640,640];enabled=!1;useMock=!1;canvasContext=null;lastMockUpdate=0;mockDetections=[];_lastInferenceMs=0;_lastInferenceTimestamp=0;_backendUsed="unknown";_backendFallbackReason=null;_lastFetchResult=null;_modelSha256=null;constructor(){Of()&&(ge.wasm.numThreads=1,console.log("[InferenceEngine] iOS detected - using single-threaded WASM")),ge.wasm.wasmPaths="https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/"}get lastInferenceMs(){return this._lastInferenceMs}get lastInferenceTimestamp(){return this._lastInferenceTimestamp}get backendUsed(){return this._backendUsed}get backendFallbackReason(){return this._backendFallbackReason}get modelSha256(){return this._modelSha256}get lastFetchResult(){return this._lastFetchResult}getSessionInfo(){return this.session?Pd(this.session):null}async init(t="/best.onnx"){try{this.canvasContext||(this.canvasContext=Oi(640,640,{willReadFrequently:!0})),Ee.log(`[Leviathan] Loading YOLO ONNX model from ${t}...`);const r={executionProviders:["webgpu","wasm"],graphOptimizationLevel:"all",logSeverityLevel:0};this.session=await Ii.create(t,r),Ee.log("[Leviathan] Model Loaded Successfully"),Ee.log("--- Inputs ---"),this.inputName=this.session.inputNames[0],this.session.inputNames.forEach(i=>{Ee.log(`Name: "${i}"`)}),Ee.log("--- Outputs ---"),this.outputName=this.session.outputNames[0],this.session.outputNames.forEach(i=>{Ee.log(`Name: "${i}"`)}),console.groupEnd(),this.enabled=!0,this.useMock=!1}catch(r){Ee.error(`[Leviathan] CRITICAL: Failed to load ONNX model. ${r}`),console.warn("[Leviathan] Falling back to MOCK mode for development."),this.useMock=!0,this.enabled=!0}}async run(t,r=.25,i=.45){if(!this.enabled)return[];if(this.useMock)return this.runMock(r);if(!this.session)return[];try{const n=this.preprocess(t),s={};s[this.inputName]=n;const l=(await this.session.run(s))[this.outputName],u=this.postprocess(l.data,l.dims,r,i),d=u.length>0?u[0].confidence:0,h=n.data,f=[h[0],h[100],h[1e3]];return(Date.now()%60===0||u.length>0)&&Ee.log(`Conf: ${d.toFixed(2)} | Input[0]: ${f[0].toFixed(3)} | Dets: ${u.length}`),u}catch(n){return console.error("[Ultralytics] Inference error:",n),[]}}preprocess(t){const[r,i,n,s]=this.inputShape,a=t instanceof HTMLVideoElement?t.videoWidth:t.width,l=t instanceof HTMLVideoElement?t.videoHeight:t.height,u=Math.min(s/a,n/l),d=Math.round(a*u),h=Math.round(l*u),f=(s-d)/2,m=(n-h)/2;if(!this.canvasContext)throw new Error("[InferenceEngine] Canvas not initialized - call init() first");const y=this.canvasContext.ctx;y.fillStyle="#808080",y.fillRect(0,0,s,n),y.drawImage(t,f,m,d,h);const w=y.getImageData(0,0,s,n).data,x=new Float32Array(i*n*s);for(let $=0;$<n;$++)for(let v=0;v<s;v++){const T=($*s+v)*4,C=w[T]/255,I=w[T+1]/255,z=w[T+2]/255;x[0*n*s+$*s+v]=C,x[1*n*s+$*s+v]=I,x[2*n*s+$*s+v]=z}return new Ge("float32",x,this.inputShape)}postprocess(t,r,i,n){const s=[];let a,l,u;if(r.length===3)r[1]<r[2]?(l=r[1],a=r[2],u=!1):(a=r[1],l=r[2],u=!0);else return console.warn("[Ultralytics] Unexpected output dims:",r),[];const d=l-4;for(let h=0;h<a;h++){let f,m,y,_,w=[];if(u){const T=h*l;f=t[T],m=t[T+1],y=t[T+2],_=t[T+3];for(let C=0;C<d;C++)w.push(t[T+4+C])}else{f=t[0*a+h],m=t[1*a+h],y=t[2*a+h],_=t[3*a+h];for(let T=0;T<d;T++)w.push(t[(4+T)*a+h])}let x=0,$=0;for(let T=0;T<w.length;T++)w[T]>x&&(x=w[T],$=T);if(x<i)continue;const v={x:f/640,y:m/640,w:y/640,h:_/640,confidence:x,classId:$,label:B0[$]||`class_${$}`};s.push(v)}return this.nms(s,n)}nms(t,r){t.sort((s,a)=>a.confidence-s.confidence);const i=[],n=new Set;for(let s=0;s<t.length;s++)if(!n.has(s)){i.push(t[s]);for(let a=s+1;a<t.length;a++){if(n.has(a))continue;this.computeIoU(t[s],t[a])>r&&n.add(a)}}return i}computeIoU(t,r){const i=t.x-t.w/2,n=t.y-t.h/2,s=t.x+t.w/2,a=t.y+t.h/2,l=r.x-r.w/2,u=r.y-r.h/2,d=r.x+r.w/2,h=r.y+r.h/2,f=Math.max(i,l),m=Math.max(n,u),y=Math.min(s,d),_=Math.min(a,h),w=Math.max(0,y-f),x=Math.max(0,_-m),$=w*x,v=t.w*t.h,T=r.w*r.h,C=v+T-$;return C>0?$/C:0}runMock(t){const r=Date.now();if(r-this.lastMockUpdate>2e3)if(this.lastMockUpdate=r,Math.random()<.3){const i=.2+Math.random()*.6,n=.4+Math.random()*.2,s=.6+Math.random()*.39;this.mockDetections=[{x:i,y:n,w:.05,h:.1,confidence:s,classId:0,label:"whale_blow"}]}else this.mockDetections=[];return this.mockDetections.filter(i=>i.confidence>=t)}async initFromUrl(t="/best.onnx"){const r=performance.now(),i={success:!1,fetchResult:null,sha256:null,hashMatch:!1,backend:"unknown",backendFallbackReason:null,sessionInfo:null,error:null,durationMs:0};try{this.canvasContext||(this.canvasContext=Oi(640,640,{willReadFrequently:!0}));const n=A0(t);Ee.log(`[Diagnostics] Fetching model from: ${n}`);const s=await M0(n);if(i.fetchResult=s,this._lastFetchResult=s,!s.ok||!s.buffer)return i.error=s.error||"Fetch failed",i.durationMs=performance.now()-r,i;Ee.log(`[Diagnostics] Fetched ${s.actualBytes} bytes`);const a=await z0(s.buffer);i.sha256=a,this._modelSha256=a,i.hashMatch=a===Va,Ee.log(`[Diagnostics] SHA-256: ${a.substring(0,16)}...`),Ee.log(`[Diagnostics] Hash match: ${i.hashMatch}`);const l={executionProviders:["webgpu","wasm"],graphOptimizationLevel:"all",logSeverityLevel:0};try{this.session=await Ii.create(s.buffer,l),typeof navigator<"u"&&"gpu"in navigator?this._backendUsed="webgpu (attempted)":this._backendUsed="wasm"}catch(u){Ee.log("[Diagnostics] WebGPU failed, falling back to WASM"),this._backendFallbackReason=String(u),i.backendFallbackReason=this._backendFallbackReason;const d={executionProviders:["wasm"],graphOptimizationLevel:"all",logSeverityLevel:0};this.session=await Ii.create(s.buffer,d),this._backendUsed="wasm"}i.backend=this._backendUsed,this.inputName=this.session.inputNames[0],this.outputName=this.session.outputNames[0],i.sessionInfo=Pd(this.session),Ee.log(`[Diagnostics] Session created. Backend: ${this._backendUsed}`),Ee.log(`[Diagnostics] Inputs: ${this.session.inputNames.join(", ")}`),Ee.log(`[Diagnostics] Outputs: ${this.session.outputNames.join(", ")}`),this.enabled=!0,this.useMock=!1,i.success=!0}catch(n){const s=n;i.error=`${s.name}: ${s.message}`,Ee.error(`[Diagnostics] Init failed: ${i.error}`),this.useMock=!0,this.enabled=!0}return i.durationMs=performance.now()-r,i}async sanityRun(){const t=performance.now(),r={success:!1,inputShape:this.inputShape,outputShapes:[],outputsFinite:!1,durationMs:0,error:null};if(!this.session)return r.error="Session not initialized",r.durationMs=performance.now()-t,r;try{const i=new Float32Array(this.inputShape.reduce((u,d)=>u*d,1));i.fill(.5);const n=new Ge("float32",i,this.inputShape),s={};s[this.inputName]=n;const a=performance.now(),l=await this.session.run(s);this._lastInferenceMs=performance.now()-a,this._lastInferenceTimestamp=Date.now();for(const[u,d]of Object.entries(l)){r.outputShapes.push({name:u,dims:d.dims});const h=d.data;r.outputsFinite=R0(h)}r.success=!0,Ee.log(`[Diagnostics] Sanity run: ${this._lastInferenceMs.toFixed(1)}ms`)}catch(i){const n=i;r.error=`${n.name}: ${n.message}`,Ee.error(`[Diagnostics] Sanity run failed: ${r.error}`)}return r.durationMs=performance.now()-t,r}async runOnCanvas(t,r=.25,i=.45){const n=performance.now(),s=await this.run(t,r,i),a=performance.now()-n;return this._lastInferenceMs=a,this._lastInferenceTimestamp=Date.now(),{detections:s,inferenceMs:a}}}const pt={LOADING:"LOADING",READY:"READY",DETECTING:"DETECTING",EVENT:"EVENT",ERROR:"ERROR"};class P0{currentState=pt.LOADING;listeners=[];get state(){return this.currentState}set state(t){this.currentState!==t&&(console.log(`[StateSystem] Transition: ${this.currentState} -> ${t}`),this.currentState=t,this.notify())}addListener(t){this.listeners.push(t),t(this.currentState)}removeListener(t){this.listeners=this.listeners.filter(r=>r!==t)}notify(){this.listeners.forEach(t=>t(this.currentState))}}const ht=new P0;class U0{canvas;ctx;history=[];constructor(t){this.canvas=t;const r=t.getContext("2d");if(!r)throw new Error("Could not get canvas context");this.ctx=r}resize(t,r){this.canvas.width=t,this.canvas.height=r}draw(t){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.history.push({detections:[...t],timestamp:Date.now()});const r=Date.now();this.history=this.history.filter(i=>r-i.timestamp<1e3),this.history.forEach(i=>{const n=r-i.timestamp,s=1-n/1e3;s<=0||i.detections.forEach(a=>{n<50||this.drawBox(a,s*.3,!1)})}),t.forEach(i=>{this.drawBox(i,1,!0)})}drawBox(t,r,i){const{x:n,y:s,w:a,h:l,confidence:u}=t,d=this.canvas.width,h=this.canvas.height,f=(n-a/2)*d,m=(s-l/2)*h,y=a*d,_=l*h;let w="#ff5252";if(u>=.85?w="#4caf50":u>=.65&&(w="#ffc107"),this.ctx.strokeStyle=w,this.ctx.globalAlpha=r,this.ctx.lineWidth=2,this.ctx.strokeRect(f,m,y,_),i&&u>.85&&(this.ctx.shadowColor=w,this.ctx.shadowBlur=10,this.ctx.strokeRect(f,m,y,_),this.ctx.shadowBlur=0),i){this.ctx.fillStyle=w,this.ctx.font="12px Inter, monospace",this.ctx.textBaseline="bottom";const x=`Blow · ${u.toFixed(2)}`,$=this.ctx.measureText(x).width;this.ctx.fillRect(f,m-16,$+8,16),this.ctx.fillStyle="#000",this.ctx.fillText(x,f+4,m-2)}this.ctx.globalAlpha=1}}const Re=[];for(let e=0;e<256;++e)Re.push((e+256).toString(16).slice(1));function L0(e,t=0){return(Re[e[t+0]]+Re[e[t+1]]+Re[e[t+2]]+Re[e[t+3]]+"-"+Re[e[t+4]]+Re[e[t+5]]+"-"+Re[e[t+6]]+Re[e[t+7]]+"-"+Re[e[t+8]]+Re[e[t+9]]+"-"+Re[e[t+10]]+Re[e[t+11]]+Re[e[t+12]]+Re[e[t+13]]+Re[e[t+14]]+Re[e[t+15]]).toLowerCase()}let Fn;const H0=new Uint8Array(16);function W0(){if(!Fn){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");Fn=crypto.getRandomValues.bind(crypto)}return Fn(H0)}const F0=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Ud={randomUUID:F0};function q0(e,t,r){e=e||{};const i=e.random??e.rng?.()??W0();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,L0(i)}function Rf(e,t,r){return Ud.randomUUID&&!e?Ud.randomUUID():q0(e)}class V0{tracks=[];maxMisses=5;minHits=2;update(t){const r=[],i=new Set(this.tracks.map((a,l)=>l)),n=new Set(t.map((a,l)=>l));t.forEach((a,l)=>{let u=0,d=-1;this.tracks.forEach((h,f)=>{if(!i.has(f))return;const m=this.getIoU(a,h.lastDet);m>.3&&m>u&&(u=m,d=f)}),d!==-1&&(r.push({trackIdx:d,detIdx:l}),i.delete(d),n.delete(l))}),r.forEach(({trackIdx:a,detIdx:l})=>{const u=this.tracks[a];u.hits++,u.misses=0,u.lastDet=t[l],u.history.push(t[l]),u.history.length>10&&u.history.shift()}),n.forEach(a=>{this.tracks.push({id:Rf(),hits:1,misses:0,lastDet:t[a],history:[t[a]]})});for(let a=this.tracks.length-1;a>=0;a--)i.has(a)&&(this.tracks[a].misses++,this.tracks[a].misses>this.maxMisses&&this.tracks.splice(a,1));const s=[];return this.tracks.forEach(a=>{(a.hits>=this.minHits||a.lastDet.confidence>.8)&&s.push(a.lastDet)}),s}getIoU(t,r){const i=Math.max(t.x-t.w/2,r.x-r.w/2),n=Math.max(t.y-t.h/2,r.y-r.h/2),s=Math.min(t.x+t.w/2,r.x+r.w/2),a=Math.min(t.y+t.h/2,r.y+r.h/2);if(s<i||a<n)return 0;const l=(s-i)*(a-n),u=t.w*t.h,d=r.w*r.h;return l/(u+d-l)}}class G0{BLOW_HEIGHT_MIN=2;BLOW_HEIGHT_MAX=6;VFOV_RAD=45*(Math.PI/180);estimate(t){const r=t.h*this.VFOV_RAD;if(r<=0)return{min:0,max:0,desc:"Unknown"};const i=this.BLOW_HEIGHT_MIN/Math.tan(r),n=this.BLOW_HEIGHT_MAX/Math.tan(r),s=(i/1e3).toFixed(1),a=(n/1e3).toFixed(1);return{min:Math.floor(i),max:Math.floor(n),desc:`~${s}-${a} km`}}}const Df=6371e3,Ld=9.80665,j0=1.17,xe=Math.PI/180,ze=180/Math.PI;function Bf(){return{w:1,x:0,y:0,z:0}}function ha(e,t){return{w:e.w*t.w-e.x*t.x-e.y*t.y-e.z*t.z,x:e.w*t.x+e.x*t.w+e.y*t.z-e.z*t.y,y:e.w*t.y-e.x*t.z+e.y*t.w+e.z*t.x,z:e.w*t.z+e.x*t.y-e.y*t.x+e.z*t.w}}function Nf(e){const t=Math.sqrt(e.w*e.w+e.x*e.x+e.y*e.y+e.z*e.z);return t<1e-10?Bf():{w:e.w/t,x:e.x/t,y:e.y/t,z:e.z/t}}function Pf(e){return{w:e.w,x:-e.x,y:-e.y,z:-e.z}}function ar(e){const t=2*(e.w*e.x+e.y*e.z),r=1-2*(e.x*e.x+e.y*e.y),i=Math.atan2(t,r),n=2*(e.w*e.y-e.z*e.x),s=Math.abs(n)>=1?Math.sign(n)*Math.PI/2:Math.asin(n),a=2*(e.w*e.z+e.x*e.y),l=1-2*(e.y*e.y+e.z*e.z),u=Math.atan2(a,l);return{roll:i,pitch:s,yaw:u}}function Hd(e){const{roll:t,pitch:r,yaw:i}=e,n=Math.cos(t/2),s=Math.sin(t/2),a=Math.cos(r/2),l=Math.sin(r/2),u=Math.cos(i/2),d=Math.sin(i/2);return Nf({w:n*a*u+s*l*d,x:s*a*u-n*l*d,y:n*l*u+s*a*d,z:n*a*d-s*l*u})}function K0(e,t){const r={w:0,x:t.x,y:t.y,z:t.z},i=ha(ha(e,r),Pf(e));return{x:i.x,y:i.y,z:i.z}}function pa(e){return Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z)}function sr(e){const t=pa(e);return t<1e-10?{x:0,y:0,z:0}:{x:e.x/t,y:e.y/t,z:e.z/t}}function Z0(e,t){return{x:e.x-t.x,y:e.y-t.y,z:e.z-t.z}}class Y0{events=[];captureWithLocation(t,r,i,n,s=1){const a=document.createElement("canvas"),l=.5,u=n.width,d=n.height;let h=(t.x-t.w/2)*u,f=(t.y-t.h/2)*d,m=t.w*u,y=t.h*d;h-=m*l,f-=y*l,m+=m*(l*2),y+=y*(l*2),a.width=200,a.height=200*(y/m);const _=a.getContext("2d");_&&_.drawImage(n,h,f,m,y,0,0,a.width,a.height);const w={event_id:i?.eventId??Rf(),event_type:"whale_blow",timestamp:new Date().toISOString(),confidence:t.confidence,bbox:[t.x,t.y,t.w,t.h],resolution:[n.width,n.height],device:"leviathan_mobile_v1.0",optics:s>1?`digital_${s}x`:"native",zoom:s,distance_estimate_m:[r.min,r.max],distance_best_m:i?.distance??null,location:{observer:{lat:i?this.getStoredObserverLat():null,lon:i?this.getStoredObserverLon():null},blow:{lat:i?.position.latitude??null,lon:i?.position.longitude??null}},bearing_deg:i?.bearing??null,relative_bearing_deg:i?.relativeBearing??null,uncertainty:{distance_percent:i?.uncertainty.distancePercent??null,bearing_deg:i?.uncertainty.bearingDegrees??null,position_m:i?.uncertainty.positionMeters??null},notes:i?`Localized at ${i.bearing.toFixed(0)}° bearing, ${i.distance}m distance`:"Localization unavailable",thumbnail:a.toDataURL("image/jpeg",.7)};return this.events.push(w),this.persist(),console.log("[Leviathan] Blow Event Captured:",w),w}capture(t,r,i){return this.captureWithLocation(t,r,null,i,1)}static formatEventLocation(t){if(!t.location.blow.lat||!t.location.blow.lon)return"Location pending...";const r=t.location.blow.lat.toFixed(5),i=t.location.blow.lon.toFixed(5),n=t.distance_best_m?t.distance_best_m<1e3?`${t.distance_best_m}m`:`${(t.distance_best_m/1e3).toFixed(1)}km`:"?";return`${r}°, ${i}° @ ${n}`}getRecentEvents(){return this.events.slice(-10).reverse()}exportJSON(){return JSON.stringify(this.events,null,2)}exportCSV(){const t=["event_id","timestamp","confidence","observer_lat","observer_lon","blow_lat","blow_lon","bearing_deg","distance_m","zoom","uncertainty_m"].join(","),r=this.events.map(i=>[i.event_id,i.timestamp,i.confidence.toFixed(3),i.location.observer.lat?.toFixed(6)??"",i.location.observer.lon?.toFixed(6)??"",i.location.blow.lat?.toFixed(6)??"",i.location.blow.lon?.toFixed(6)??"",i.bearing_deg?.toFixed(1)??"",i.distance_best_m??"",i.zoom,i.uncertainty.position_m??""].join(","));return[t,...r].join(`
`)}observerLat=null;observerLon=null;setObserverPosition(t,r){this.observerLat=t,this.observerLon=r}getStoredObserverLat(){return this.observerLat}getStoredObserverLon(){return this.observerLon}persist(){try{localStorage.setItem("leviathan_events",JSON.stringify(this.events.slice(-100)))}catch{}}loadFromStorage(){try{const t=localStorage.getItem("leviathan_events");t&&(this.events=JSON.parse(t))}catch{}}}const Wd=100;class X0{orientation={alpha:0,beta:0,gamma:0,absolute:!1};motion={accelX:0,accelY:0,accelZ:0};available=!1;permissionGranted=!1;imuBuffer=[];imuBufferIndex=0;latestIMU=null;lastMotionTime=0;sampleInterval=0;constructor(){this.handleOrientation=this.handleOrientation.bind(this),this.handleMotion=this.handleMotion.bind(this)}async requestPermission(){let t=!0,r=!0;if(typeof DeviceOrientationEvent.requestPermission=="function")try{t=await DeviceOrientationEvent.requestPermission()==="granted",t||console.warn("[SensorManager] DeviceOrientation permission denied")}catch(i){console.error("[SensorManager] DeviceOrientation permission error:",i),t=!1}if(typeof DeviceMotionEvent.requestPermission=="function")try{r=await DeviceMotionEvent.requestPermission()==="granted",r||console.warn("[SensorManager] DeviceMotion permission denied")}catch(i){console.error("[SensorManager] DeviceMotion permission error:",i),r=!1}return t&&r?(this.permissionGranted=!0,this.start(),!0):(console.warn("[SensorManager] Sensor permissions incomplete - orientation:",t,"motion:",r),!1)}start(){this.permissionGranted&&(window.addEventListener("deviceorientation",this.handleOrientation),window.addEventListener("devicemotion",this.handleMotion),this.available=!0,console.log("[SensorManager] Started listening for IMU events"))}stop(){window.removeEventListener("deviceorientation",this.handleOrientation),window.removeEventListener("devicemotion",this.handleMotion),this.available=!1}handleOrientation(t){let r=t.alpha,i=t.absolute||!1;t.webkitCompassHeading!==void 0&&(r=t.webkitCompassHeading,i=!0),this.orientation={alpha:r,beta:t.beta,gamma:t.gamma,absolute:i}}handleMotion(t){const r=Date.now();if(this.lastMotionTime>0){const u=r-this.lastMotionTime;this.sampleInterval=this.sampleInterval*.9+u*.1}this.lastMotionTime=r;const i=t.rotationRate,n={x:i?.alpha?i.alpha*(Math.PI/180):0,y:i?.beta?i.beta*(Math.PI/180):0,z:i?.gamma?i.gamma*(Math.PI/180):0},s={x:t.acceleration?.x||0,y:t.acceleration?.y||0,z:t.acceleration?.z||0},a={x:t.accelerationIncludingGravity?.x||0,y:t.accelerationIncludingGravity?.y||0,z:t.accelerationIncludingGravity?.z||0},l={timestamp:r,gyro:n,accel:s,accelWithGravity:a};this.imuBuffer.length<Wd?this.imuBuffer.push(l):(this.imuBuffer[this.imuBufferIndex]=l,this.imuBufferIndex=(this.imuBufferIndex+1)%Wd),this.latestIMU=l,this.motion={accelX:a.x,accelY:a.y,accelZ:a.z}}getLatestIMU(){return this.latestIMU}getIMUSamplesSince(t){return this.imuBuffer.filter(r=>r.timestamp>t).sort((r,i)=>r.timestamp-i.timestamp)}getSampleRate(){return this.sampleInterval<=0?0:1e3/this.sampleInterval}getMagneticHeading(){return!this.orientation.absolute||this.orientation.alpha===null?null:this.orientation.alpha}getDevicePitch(){return this.orientation.beta}getDeviceRoll(){return this.orientation.gamma}getGravityVector(){return this.latestIMU?this.latestIMU.accelWithGravity:null}getHeadingString(){return this.orientation.alpha===null?"---°":`${Math.round(this.orientation.alpha)}°`}getPitchString(){return this.orientation.beta===null?"---°":`${Math.round(this.orientation.beta)}°`}getRollString(){return this.orientation.gamma===null?"---°":`${Math.round(this.orientation.gamma)}°`}}const Fd=4.25,J0=4.8,Q0=3.6,qd=1920,Vd=1080;class ey{baseIntrinsics;currentZoom=1;currentIntrinsics;constructor(t=qd,r=Vd){const i=Fd/J0*t,n=Fd/Q0*r,s=t/2,a=r/2;this.baseIntrinsics={fx:i,fy:n,cx:s,cy:a,width:t,height:r},this.currentIntrinsics={...this.baseIntrinsics}}updateForZoom(t){this.currentZoom=Math.max(1,t),this.currentIntrinsics={...this.baseIntrinsics,fx:this.baseIntrinsics.fx*this.currentZoom,fy:this.baseIntrinsics.fy*this.currentZoom}}updateForResolution(t,r){const i=t/qd,n=r/Vd;this.baseIntrinsics={fx:this.baseIntrinsics.fx*i,fy:this.baseIntrinsics.fy*n,cx:t/2,cy:r/2,width:t,height:r},this.updateForZoom(this.currentZoom)}getIntrinsics(){return{...this.currentIntrinsics}}getKMatrix(){const{fx:t,fy:r,cx:i,cy:n}=this.currentIntrinsics;return[[t,0,i],[0,r,n],[0,0,1]]}getZoom(){return this.currentZoom}getVFOV(){return 2*Math.atan(this.currentIntrinsics.height/(2*this.currentIntrinsics.fy))}getHFOV(){return 2*Math.atan(this.currentIntrinsics.width/(2*this.currentIntrinsics.fx))}pixelToNormalized(t,r){const{fx:i,fy:n,cx:s,cy:a}=this.currentIntrinsics;return{x:(t-s)/i,y:(r-a)/n}}normalizedToPixel(t,r){const{fx:i,fy:n,cx:s,cy:a}=this.currentIntrinsics;return{u:t*i+s,v:r*n+a}}getPixelAngularSize(){return{horizontal:this.getHFOV()/this.currentIntrinsics.width,vertical:this.getVFOV()/this.currentIntrinsics.height}}static calculateDipAngle(t,r=1.17){const n=6371e3*r;return Math.acos(n/(n+t))}static calculateHorizonDistance(t,r=1.17){return Math.sqrt(2*r*6371e3*t)}}const ty={blowHeightMin:2,blowHeightMax:9,defaultBlowHeight:4.5,observerHeight:3};class Uf{config;observerPosition=null;eventCounter=0;constructor(t={}){this.config={...ty,...t}}setObserverPosition(t){this.observerPosition=t}setObserverHeight(t){this.config.observerHeight=t}localize(t,r,i,n,s=1){const a=Date.now();if(!this.observerPosition)return console.warn("[BlowLocalizer] No observer position set"),null;if(!i)return console.warn("[BlowLocalizer] No heading available"),null;const l=t.x*r.width;t.y*r.height;const u=l-r.cx,h=Math.atan2(u,r.fx)*ze;let f=i.heading+h;f=(f%360+360)%360;const m=t.h*r.height,y=2*Math.atan(m/(2*r.fy));if(y<=.001)return console.warn("[BlowLocalizer] Detection too small for ranging"),null;const _=this.config.defaultBlowHeight/Math.tan(y),w=this.config.blowHeightMin/Math.tan(y),x=this.config.blowHeightMax/Math.tan(y);let $=_;if(n){const O=Math.cos(n.pitch);$=_*Math.max(.5,Math.min(2,1/O))}const v=this.projectPosition(this.observerPosition,f,$),T=(x-w)/$*100,C=3/r.fx*ze,I=Math.sqrt(i.uncertainty**2+C**2),z=Math.sqrt(($*Math.sin(I*xe))**2+((x-w)/2)**2),E=this.generateEventId(a);return{position:v,distance:Math.round($),distanceMin:Math.round(w),distanceMax:Math.round(x),bearing:Math.round(f*10)/10,relativeBearing:Math.round(h*10)/10,confidence:t.confidence,timestamp:a,eventId:E,zoomFactor:s,uncertainty:{distancePercent:Math.round(T),bearingDegrees:Math.round(I*10)/10,positionMeters:Math.round(z)}}}projectPosition(t,r,i){const n=t.latitude*xe,s=t.longitude*xe,a=r*xe,l=i/Df,u=Math.asin(Math.sin(n)*Math.cos(l)+Math.cos(n)*Math.sin(l)*Math.cos(a)),d=s+Math.atan2(Math.sin(a)*Math.sin(l)*Math.cos(n),Math.cos(l)-Math.sin(n)*Math.sin(u));return{latitude:u*ze,longitude:(d*ze+540)%360-180,altitude:0}}generateEventId(t){this.eventCounter++;const r=t.toString(16).slice(-8),i=this.eventCounter.toString(16).padStart(4,"0");return`BLOW-${r}-${i}`.toUpperCase()}static formatLocation(t){const r=t.position.latitude.toFixed(5),i=t.position.longitude.toFixed(5),n=t.distance<1e3?`${t.distance}m`:`${(t.distance/1e3).toFixed(1)}km`;return`${r}°, ${i}° @ ${n} bearing ${t.bearing}°`}static toJSON(t){return{event_id:t.eventId,timestamp:new Date(t.timestamp).toISOString(),position:{lat:t.position.latitude,lon:t.position.longitude},distance_m:t.distance,distance_range:{min:t.distanceMin,max:t.distanceMax},bearing_deg:t.bearing,relative_bearing_deg:t.relativeBearing,confidence:t.confidence,zoom:t.zoomFactor,uncertainty:t.uncertainty}}}new Uf;const iy={coarseSize:64,rollRange:30*xe,rollStep:2*xe,pitchRange:.4,pitchSteps:20,glareThreshold:245,glareSaturationMax:30,minConfidence:.3};class ry{config;coarseCanvasCtx;tempCanvasCtx;constructor(t={}){this.config={...iy,...t},this.coarseCanvasCtx=Oi(this.config.coarseSize,this.config.coarseSize,{willReadFrequently:!0}),this.tempCanvasCtx=Oi(640,480,{willReadFrequently:!0})}detect(t,r,i=3){const n=performance.now();try{const s=this.getImageData(t);if(!s)return{horizon:null,processingTime:performance.now()-n,glareMasked:!1,failureReason:"Failed to get image data"};const{data:a,glareMasked:l}=this.maskGlare(s),u=this.downsample(a),d=this.coarseSearch(u),h=this.fineRefine(a,d);return h.confidence<this.config.minConfidence?{horizon:null,processingTime:performance.now()-n,glareMasked:l,failureReason:`Low confidence: ${h.confidence.toFixed(2)}`}:{horizon:this.computeHorizonLine(h,a.width,a.height,r,i),processingTime:performance.now()-n,glareMasked:l}}catch(s){return{horizon:null,processingTime:performance.now()-n,glareMasked:!1,failureReason:`Error: ${s}`}}}getImageData(t){if(t instanceof ImageData)return t;const r=t instanceof HTMLVideoElement?t.videoWidth:t.width,i=t instanceof HTMLVideoElement?t.videoHeight:t.height;if(r===0||i===0)return null;const n=Math.min(640,r),s=Math.round(n*(i/r)),a=this.tempCanvasCtx.canvas,l=this.tempCanvasCtx.ctx;return(a.width!==n||a.height!==s)&&(a.width=n,a.height=s),l.drawImage(t,0,0,n,s),l.getImageData(0,0,n,s)}maskGlare(t){const{data:r,width:i,height:n}=t,s=new ImageData(new Uint8ClampedArray(r),i,n);let a=!1;for(let l=0;l<r.length;l+=4){const u=r[l],d=r[l+1],h=r[l+2],f=Math.max(u,d,h),m=Math.min(u,d,h),y=f===0?0:(f-m)/f*255;f>this.config.glareThreshold&&y<this.config.glareSaturationMax&&(s.data[l]=128,s.data[l+1]=128,s.data[l+2]=128,s.data[l+3]=0,a=!0)}return{data:s,glareMasked:a}}downsample(t){const r=this.config.coarseSize,i=this.coarseCanvasCtx.canvas;this.coarseCanvasCtx.ctx,(i.width!==r||i.height!==r)&&(i.width=r,i.height=r);const n=t.width/r,s=t.height/r,a=new ImageData(r,r);for(let l=0;l<r;l++)for(let u=0;u<r;u++){const d=Math.floor(u*n),f=(Math.floor(l*s)*t.width+d)*4,m=(l*r+u)*4;a.data[m]=t.data[f],a.data[m+1]=t.data[f+1],a.data[m+2]=t.data[f+2],a.data[m+3]=t.data[f+3]}return a}createImageBitmap(t){return t}coarseSearch(t){const{rollRange:r,rollStep:i,pitchRange:n,pitchSteps:s}=this.config,{width:a,height:l}=t;let u=0,d=l/2,h=1/0;for(let f=-r;f<=r;f+=i){const m=l*(.5-n),y=l*(.5+n),_=(y-m)/s;for(let w=m;w<=y;w+=_){const x=this.computeLineScore(t,f,w);x<h&&(h=x,u=f,d=w)}}return{roll:u,offset:d,score:h}}fineRefine(t,r){let{roll:i,offset:n}=r;const{height:s}=t,a=.5*xe,l=2,u=10;let d=this.computeLineScore(t,i,n);for(let f=0;f<u;f++){let m=!1;const y=[{r:i+a,o:n},{r:i-a,o:n},{r:i,o:n+l},{r:i,o:n-l},{r:i+a,o:n+l},{r:i-a,o:n-l}];for(const{r:_,o:w}of y){const x=this.computeLineScore(t,_,w);x<d&&(i=_,n=w,d=x,m=!0)}if(!m)break}const h=Math.max(0,Math.min(1,1-d/1e4));return n=Math.max(0,Math.min(s,n)),{roll:i,offset:n,confidence:h}}computeLineScore(t,r,i){const{data:n,width:s,height:a}=t;let l=0,u=0,d=0,h=0,f=0,m=0;const y=Math.cos(r),_=Math.sin(r),w=s/2,x=a/2;for(let P=0;P<a;P++)for(let F=0;F<s;F++){const V=(P*s+F)*4;if(n[V+3]===0)continue;const G=.299*n[V]+.587*n[V+1]+.114*n[V+2],ee=F-w,q=P-x;-ee*_+q*y+x<i?(l+=G,f+=G*G,u++):(d+=G,m+=G*G,h++)}if(u<10||h<10)return 1/0;const $=l/u,v=d/h,T=f/u-$*$,C=m/h-v*v,I=u+h,z=(u*T+h*C)/I,O=Math.abs($-v)<10?1e3:0;return z+O}computeHorizonLine(t,r,i,n,s){const a=-t.roll,l=t.offset-i/2,u=Math.atan(l/n.fy),d=Df*j0,h=Math.acos(d/(d+s)),f=u+h;return{angle:t.roll,offset:t.offset,confidence:t.confidence,roll:a,pitch:f}}static getRollDegrees(t){return t.roll*ze}static getPitchDegrees(t){return t.pitch*ze}}const ny={gyroNoise:.01,gyroBiasNoise:1e-4,accelNoise:.5,horizonRollNoise:2*xe,horizonPitchNoise:3*xe,chiSquaredGate:7.81,initialGyroBiasStd:.01};class ay{state;config;initialized=!1;lastInnovation={roll:0,pitch:0};rejectedUpdates=0;totalUpdates=0;constructor(t={}){this.config={...ny,...t},this.state=this.createInitialState()}createInitialState(){const t=this.config.initialGyroBiasStd,r=[[.1,0,0,0,0,0],[0,.1,0,0,0,0],[0,0,.5,0,0,0],[0,0,0,t*t,0,0],[0,0,0,0,t*t,0],[0,0,0,0,0,t*t]];return{quaternion:Bf(),gyroBias:{x:0,y:0,z:0},covariance:r,timestamp:0}}initialize(t,r){this.state.quaternion=Hd(t),this.state.timestamp=r,this.initialized=!0}initializeFromAccel(t,r){const i=sr(t),n=Math.atan2(i.x,i.z),s=Math.atan2(-i.y,Math.sqrt(i.x*i.x+i.z*i.z));this.initialize({roll:n,pitch:s,yaw:0},r)}predict(t,r){if(!this.initialized){this.state.timestamp=r;return}const i=(r-this.state.timestamp)/1e3;if(i<=0||i>1){this.state.timestamp=r;return}const n={x:t.x-this.state.gyroBias.x,y:t.y-this.state.gyroBias.y,z:t.z-this.state.gyroBias.z},s=pa(n)*i;if(s>1e-10){const u=sr(n),d=s/2,h=Math.sin(d),f={w:Math.cos(d),x:u.x*h,y:u.y*h,z:u.z*h};this.state.quaternion=Nf(ha(this.state.quaternion,f))}const a=this.computeStateTransition(n,i),l=this.computeProcessNoise(i);this.state.covariance=this.propagateCovariance(this.state.covariance,a,l),this.state.timestamp=r}updateWithGravity(t){if(!this.initialized)return!1;const r={x:0,y:0,z:Ld},i=K0(Pf(this.state.quaternion),r),n=Z0(sr(t),sr(i)),s=this.computeGravityJacobian(this.state.quaternion),a=[[this.config.accelNoise*this.config.accelNoise,0,0],[0,this.config.accelNoise*this.config.accelNoise,0],[0,0,this.config.accelNoise*this.config.accelNoise]],{S:l,K:u}=this.computeKalmanGain(this.state.covariance,s,a),d=[n.x,n.y,n.z],h=this.computeChiSquared(d,l);return this.totalUpdates++,h>this.config.chiSquaredGate?(this.rejectedUpdates++,!1):(this.applyCorrection(u,d,s,a),!0)}updateWithHorizon(t,r){if(!this.initialized)return!1;const i=ar(this.state.quaternion),n=this.wrapAngle(t-i.roll),s=this.wrapAngle(r-i.pitch);this.lastInnovation={roll:n,pitch:s};const a=[[1,0,0,0,0,0],[0,1,0,0,0,0]],l=[[this.config.horizonRollNoise*this.config.horizonRollNoise,0],[0,this.config.horizonPitchNoise*this.config.horizonPitchNoise]],{S:u,K:d}=this.computeKalmanGain(this.state.covariance,a,l),h=[n,s],f=this.computeChiSquared(h,u);return this.totalUpdates++,f>5.99?(this.rejectedUpdates++,!1):(this.applyCorrection(d,h,a,l),!0)}getOrientation(){return ar(this.state.quaternion)}getState(){return{orientation:ar(this.state.quaternion),rollStd:Math.sqrt(this.state.covariance[0][0]),pitchStd:Math.sqrt(this.state.covariance[1][1]),yawStd:Math.sqrt(this.state.covariance[2][2]),timestamp:this.state.timestamp}}getGyroBias(){return{...this.state.gyroBias}}getDiagnostics(){return{initialized:this.initialized,rejectionRate:this.totalUpdates>0?this.rejectedUpdates/this.totalUpdates:0,lastInnovation:this.lastInnovation,gyroBias:this.getGyroBias()}}processSamples(t){for(const r of t){this.predict(r.gyro,r.timestamp);const i=pa(r.accelWithGravity);Math.abs(i-Ld)<1&&this.updateWithGravity(r.accelWithGravity)}}wrapAngle(t){for(;t>Math.PI;)t-=2*Math.PI;for(;t<-Math.PI;)t+=2*Math.PI;return t}computeStateTransition(t,r){return[[1,0,0,-r,0,0],[0,1,0,0,-r,0],[0,0,1,0,0,-r],[0,0,0,1,0,0],[0,0,0,0,1,0],[0,0,0,0,0,1]]}computeProcessNoise(t){const r=this.config.gyroNoise*t,i=this.config.gyroBiasNoise*t;return[[r*r,0,0,0,0,0],[0,r*r,0,0,0,0],[0,0,r*r,0,0,0],[0,0,0,i*i,0,0],[0,0,0,0,i*i,0],[0,0,0,0,0,i*i]]}propagateCovariance(t,r,i){t.length;const n=this.matMul(r,t),s=this.transpose(r),a=this.matMul(n,s);return this.matAdd(a,i)}computeGravityJacobian(t){return[[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,0,0,0]]}computeKalmanGain(t,r,i){const n=this.matMul(r,t),s=this.transpose(r),a=this.matMul(n,s),l=this.matAdd(a,i),u=this.matMul(t,s),d=this.matInv(l),h=this.matMul(u,d);return{S:l,K:h}}computeChiSquared(t,r){const i=this.matInv(r),n=t.length;let s=0;for(let a=0;a<n;a++)for(let l=0;l<n;l++)s+=t[a]*i[a][l]*t[l];return s}applyCorrection(t,r,i,n){const s=[],a=r.length;for(let v=0;v<6;v++){let T=0;for(let C=0;C<a;C++)T+=t[v][C]*r[C];s.push(T)}const l=ar(this.state.quaternion);l.roll+=s[0],l.pitch+=s[1],l.yaw+=s[2],this.state.quaternion=Hd(l),this.state.gyroBias.x+=s[3],this.state.gyroBias.y+=s[4],this.state.gyroBias.z+=s[5];const u=this.matIdentity(6),d=this.matMul(t,i),h=this.matSub(u,d),f=this.transpose(h),m=this.matMul(h,this.state.covariance),y=this.matMul(m,f),_=this.transpose(t),w=this.matMul(t,n),x=this.matMul(w,_);let $=this.matAdd(y,x);$=this.forceSymmetry($),this.checkCovarianceSanity($),this.state.covariance=$}matIdentity(t){const r=[];for(let i=0;i<t;i++){const n=Array(t).fill(0);n[i]=1,r.push(n)}return r}matSub(t,r){const i=t.length,n=t[0].length,s=Array(i).fill(0).map(()=>Array(n).fill(0));for(let a=0;a<i;a++)for(let l=0;l<n;l++)s[a][l]=t[a][l]-r[a][l];return s}forceSymmetry(t){const r=t.length,i=Array(r).fill(0).map(()=>Array(r).fill(0));for(let n=0;n<r;n++)for(let s=0;s<r;s++)i[n][s]=.5*(t[n][s]+t[s][n]);return i}checkCovarianceSanity(t){const r=t.length;for(let i=0;i<r;i++){if(t[i][i]<0)throw new Error(`EKF Covariance Corruption: Negative diagonal at [${i},${i}] = ${t[i][i]}`);if(!Number.isFinite(t[i][i])||Number.isNaN(t[i][i]))throw new Error(`EKF Covariance Corruption: Non-finite value at [${i},${i}]`);for(let n=0;n<r;n++){if(!Number.isFinite(t[i][n])||Number.isNaN(t[i][n]))throw new Error(`EKF Covariance Corruption: Non-finite value at [${i},${n}]`);Math.abs(t[i][n]-t[n][i])>1e-10}}}matMul(t,r){const i=t.length,n=r[0].length,s=r.length,a=Array(i).fill(0).map(()=>Array(n).fill(0));for(let l=0;l<i;l++)for(let u=0;u<n;u++)for(let d=0;d<s;d++)a[l][u]+=t[l][d]*r[d][u];return a}transpose(t){const r=t.length,i=t[0].length,n=Array(i).fill(0).map(()=>Array(r).fill(0));for(let s=0;s<r;s++)for(let a=0;a<i;a++)n[a][s]=t[s][a];return n}matAdd(t,r){const i=t.length,n=t[0].length,s=Array(i).fill(0).map(()=>Array(n).fill(0));for(let a=0;a<i;a++)for(let l=0;l<n;l++)s[a][l]=t[a][l]+r[a][l];return s}matInv(t){if(t.length===2){const s=t[0][0]*t[1][1]-t[0][1]*t[1][0];if(Math.abs(s)<1e-10)return[[1,0],[0,1]];const a=1/s;return[[t[1][1]*a,-t[0][1]*a],[-t[1][0]*a,t[0][0]*a]]}const i=t[0][0]*(t[1][1]*t[2][2]-t[1][2]*t[2][1])-t[0][1]*(t[1][0]*t[2][2]-t[1][2]*t[2][0])+t[0][2]*(t[1][0]*t[2][1]-t[1][1]*t[2][0]);if(Math.abs(i)<1e-10)return[[1,0,0],[0,1,0],[0,0,1]];const n=1/i;return[[(t[1][1]*t[2][2]-t[1][2]*t[2][1])*n,(t[0][2]*t[2][1]-t[0][1]*t[2][2])*n,(t[0][1]*t[1][2]-t[0][2]*t[1][1])*n],[(t[1][2]*t[2][0]-t[1][0]*t[2][2])*n,(t[0][0]*t[2][2]-t[0][2]*t[2][0])*n,(t[0][2]*t[1][0]-t[0][0]*t[1][2])*n],[(t[1][0]*t[2][1]-t[1][1]*t[2][0])*n,(t[0][1]*t[2][0]-t[0][0]*t[2][1])*n,(t[0][0]*t[1][1]-t[0][1]*t[1][0])*n]]}}const sy={timeConstant:8,heaveCutoff:.2,expectedWavePeriod:7};class or{alpha;value=null;constructor(t,r){const i=1/r;this.alpha=1-Math.exp(-i/t)}update(t){return this.value===null?this.value=t:this.value=this.alpha*t+(1-this.alpha)*this.value,this.value}getValue(){return this.value??0}reset(){this.value=null}}class oy{config;heaveVelocity=0;heavePosition=0;lastTimestamp=0;accelFilter;heaveFilter;_baselineHeight=0;heightHistory=[];maxHistoryLength=100;constructor(t={},r=60){this.config={...sy,...t},this.accelFilter={x:new or(.1,r),y:new or(.1,r),z:new or(.1,r)},this.heaveFilter=new or(this.config.timeConstant,r)}update(t,r){if(this.lastTimestamp===0)return this.lastTimestamp=r,0;const i=(r-this.lastTimestamp)/1e3;if(this.lastTimestamp=r,i<=0||i>1)return this.heavePosition;const s={x:this.accelFilter.x.update(t.x),y:this.accelFilter.y.update(t.y),z:this.accelFilter.z.update(t.z)}.z;this.heaveVelocity+=s*i;const a=.98;this.heaveVelocity*=a,this.heavePosition+=this.heaveVelocity*i;const l=.995;this.heavePosition*=l;const u=this.heaveFilter.update(this.heavePosition);return this.updateBaseline(u),u}getHeave(){return this.heaveFilter.getValue()}getEffectiveHeight(t){return t+this.getHeave()}getSmoothedHeight(t){return t+this.heaveFilter.getValue()}getWaveStatistics(){if(this.heightHistory.length<10)return{significantWaveHeight:0,peakToPeak:0,periodEstimate:this.config.expectedWavePeriod};const t=Math.min(...this.heightHistory),i=Math.max(...this.heightHistory)-t;return{significantWaveHeight:i*.64,peakToPeak:i,periodEstimate:this.config.expectedWavePeriod}}updateBaseline(t){if(this.heightHistory.push(t),this.heightHistory.length>this.maxHistoryLength&&this.heightHistory.shift(),this.heightHistory.length>0){const r=this.heightHistory.reduce((i,n)=>i+n,0);this._baselineHeight=r/this.heightHistory.length}}reset(){this.heaveVelocity=0,this.heavePosition=0,this.lastTimestamp=0,this._baselineHeight=0,this.heightHistory=[],this.accelFilter.x.reset(),this.accelFilter.y.reset(),this.accelFilter.z.reset(),this.heaveFilter.reset()}setExpectedWavePeriod(t){this.config.expectedWavePeriod=t}}class ly{waveFilter;nominalHeight;constructor(t,r=60){this.nominalHeight=t,this.waveFilter=new oy({},r)}update(t,r){this.waveFilter.update(t,r)}getInstantaneousHeight(){return this.waveFilter.getEffectiveHeight(this.nominalHeight)}getStableHeight(){return this.waveFilter.getSmoothedHeight(this.nominalHeight)}getHeightUncertainty(){return this.waveFilter.getWaveStatistics().significantWaveHeight/4}setNominalHeight(t){this.nominalHeight=t}}const uy={brightnessThreshold:250,minBlobSize:20,maxBlobSize:5e3,saturationThreshold:50};class dy{config;tempCanvasCtx;constructor(t={}){this.config={...uy,...t},this.tempCanvasCtx=Oi(320,240,{willReadFrequently:!0})}detect(t,r){const i=this.getImageData(t);if(!i)return null;const n=this.findBrightPixels(i);if(n.length===0)return null;const s=this.computeCentroid(n);if(!s)return null;const a=(t instanceof ImageData?t.width:t instanceof HTMLVideoElement?t.videoWidth:t.width)/i.width,l=(t instanceof ImageData?t.height:t instanceof HTMLVideoElement?t.videoHeight:t.height)/i.height,u=s.x*a,d=s.y*l,{relativeBearing:h,relativeElevation:f}=this.getRelativeAngles(u,d,r),m=this.computeConfidence(n.length,i.width*i.height);return{u,v:d,area:n.length*a*l,confidence:m,relativeBearing:h,relativeElevation:f}}getRelativeBearing(t,r){const i=t.x-r.cx;return Math.atan2(i,r.fx)}getRelativeElevation(t,r){const i=r.cy-t.y;return Math.atan2(i,r.fy)}getImageData(t){if(t instanceof ImageData)return t;const r=t instanceof HTMLVideoElement?t.videoWidth:t.width,i=t instanceof HTMLVideoElement?t.videoHeight:t.height;if(r===0||i===0)return null;const n=Math.min(320,r),s=Math.round(n*(i/r)),a=this.tempCanvasCtx.canvas,l=this.tempCanvasCtx.ctx;return(a.width!==n||a.height!==s)&&(a.width=n,a.height=s),l.drawImage(t,0,0,n,s),l.getImageData(0,0,n,s)}findBrightPixels(t){const{data:r,width:i,height:n}=t,s=[];for(let a=0;a<n;a++)for(let l=0;l<i;l++){const u=(a*i+l)*4,d=r[u],h=r[u+1],f=r[u+2],m=Math.max(d,h,f);if(m<this.config.brightnessThreshold)continue;const y=Math.min(d,h,f);(m>0?(m-y)/m*255:0)>this.config.saturationThreshold||s.push({x:l,y:a})}return s.length<this.config.minBlobSize||s.length>this.config.maxBlobSize?[]:s}computeCentroid(t){if(t.length===0)return null;let r=0,i=0;for(const n of t)r+=n.x,i+=n.y;return{x:r/t.length,y:i/t.length}}getRelativeAngles(t,r,i){const n=t-i.cx,s=i.cy-r;return{relativeBearing:Math.atan2(n,i.fx),relativeElevation:Math.atan2(s,i.fy)}}computeConfidence(t,r){const i=t/r,n=.001;return i<n*.1?.3:i>n*10?.5:.8+.2*Math.exp(-Math.abs(Math.log(i/n)))}}const qn=2451545;class cy{getSunPosition(t,r,i=new Date){const n=t*xe,s=this.dateToJulianDate(i),a=(s-qn)/36525,l=this.normalizeAngle(280.46646+36000.76983*a+3032e-7*a*a),d=this.normalizeAngle(357.52911+35999.05029*a-1537e-7*a*a)*xe,h=(1.914602-.004817*a-14e-6*a*a)*Math.sin(d)+(.019993-101e-6*a)*Math.sin(2*d)+289e-6*Math.sin(3*d),f=l+h,m=125.04-1934.136*a,y=f-.00569-.00478*Math.sin(m*xe),x=(23.439291111-.0130042*a-16e-8*a*a+.00256*Math.cos(m*xe))*xe,$=y*xe,v=Math.atan2(Math.cos(x)*Math.sin($),Math.cos($)),T=Math.asin(Math.sin(x)*Math.sin($)),C=s-qn,I=C/36525;let z=280.46061837+360.98564736629*C+387933e-9*I*I-I*I*I/3871e4;z=this.normalizeAngle(z);const O=(z+r)*xe-v,P=Math.sin(n)*Math.sin(T)+Math.cos(n)*Math.cos(T)*Math.cos(O),F=Math.asin(P),V=(Math.sin(T)-Math.sin(F)*Math.sin(n))/(Math.cos(F)*Math.cos(n)),G=Math.max(-1,Math.min(1,V));let ee=Math.acos(G);Math.sin(O)>0&&(ee=2*Math.PI-ee);const q=F*ze;return{azimuth:ee*ze,elevation:q,visible:q>-.833}}getSunTimes(t,r,i=new Date){const n=i.getUTCFullYear(),s=i.getUTCMonth(),a=i.getUTCDate(),l=new Date(Date.UTC(n,s,a,0,0,0)),u=r/15,d=new Date(l.getTime()+(12-u)*36e5);this.getSunPosition(t,r,d);const h=t*xe,f=this.getSolarDeclination(this.dateToJulianDate(i)),m=(Math.sin(-.833*xe)-Math.sin(h)*Math.sin(f))/(Math.cos(h)*Math.cos(f));if(m>1)return{sunrise:null,sunset:null,solarNoon:d};if(m<-1)return{sunrise:null,sunset:null,solarNoon:d};const y=Math.acos(m)*ze/15,_=new Date(d.getTime()-y*36e5),w=new Date(d.getTime()+y*36e5);return{sunrise:_,sunset:w,solarNoon:d}}isDaytime(t,r,i=new Date){return this.getSunPosition(t,r,i).visible}dateToJulianDate(t){const r=t.getUTCFullYear(),i=t.getUTCMonth()+1,n=t.getUTCDate(),s=t.getUTCHours()+t.getUTCMinutes()/60+t.getUTCSeconds()/3600;let a=Math.floor((14-i)/12),l=r+4800-a,u=i+12*a-3;return n+Math.floor((153*u+2)/5)+365*l+Math.floor(l/4)-Math.floor(l/100)+Math.floor(l/400)-32045+(s-12)/24}getSolarDeclination(t){const r=(t-qn)/36525,i=this.normalizeAngle(280.46646+36000.76983*r),s=this.normalizeAngle(357.52911+35999.05029*r)*xe,a=(1.914602-.004817*r)*Math.sin(s)+.019993*Math.sin(2*s),l=(i+a)*xe,u=23.439291111*xe;return Math.asin(Math.sin(u)*Math.sin(l))}normalizeAngle(t){return t=t%360,t<0&&(t+=360),t}}const hy={minSunElevation:10,visualWeight:.7,magneticWeight:.3,smoothingFactor:.8,visualUncertainty:5,magneticUncertainty:15};class py{config;ephemeris;sunTracker;lastHeading=null;lastVisualHeading=null;lastUpdateTime=0;latitude=0;longitude=0;locationSet=!1;constructor(t={}){this.config={...hy,...t},this.ephemeris=new cy,this.sunTracker=new dy}setLocation(t,r){this.latitude=t,this.longitude=r,this.locationSet=!0}getSunPosition(){return this.locationSet?this.ephemeris.getSunPosition(this.latitude,this.longitude):null}updateFromCamera(t,r){if(!this.locationSet)return null;const i=this.ephemeris.getSunPosition(this.latitude,this.longitude);if(!i.visible||i.elevation<this.config.minSunElevation)return null;const n=this.sunTracker.detect(t,r);if(!n)return null;const s=this.computeHeadingFromSun(n,i,r);return this.lastVisualHeading=s,this.lastUpdateTime=Date.now(),s}computeHeadingFromSun(t,r,i){const n=r.azimuth,s=t.relativeBearing*ze;let a=n-s;return a=(a%360+360)%360,a}fuseWithMagnetic(t){const i=Date.now()-this.lastUpdateTime>5e3;if(this.lastVisualHeading===null&&t===null)return{heading:this.lastHeading??0,source:"magnetometer",confidence:0,uncertainty:180};if((t===null||!isFinite(t))&&this.lastVisualHeading!==null&&!i)return this.lastHeading=this.smoothHeading(this.lastVisualHeading),{heading:this.lastHeading,source:"visual_compass",confidence:.8,uncertainty:this.config.visualUncertainty};if(this.lastVisualHeading===null||i){const l=this.smoothHeading(t);return this.lastHeading=l,{heading:l,source:"magnetometer",confidence:.5,uncertainty:this.config.magneticUncertainty}}const n=this.fuseHeadings(this.lastVisualHeading,t,this.config.visualWeight,this.config.magneticWeight),s=this.smoothHeading(n);this.lastHeading=s;const a=Math.sqrt((this.config.visualWeight*this.config.visualUncertainty)**2+(this.config.magneticWeight*this.config.magneticUncertainty)**2)/(this.config.visualWeight+this.config.magneticWeight);return{heading:s,source:"fused",confidence:.9,uncertainty:a}}getHeading(t=null){return this.fuseWithMagnetic(t)}isAvailable(){if(!this.locationSet)return!1;const t=this.ephemeris.getSunPosition(this.latitude,this.longitude);return t.visible&&t.elevation>=this.config.minSunElevation}fuseHeadings(t,r,i,n){const s=t*xe,a=r*xe,l=i*Math.cos(s)+n*Math.cos(a),u=i*Math.sin(s)+n*Math.sin(a);let d=Math.atan2(u,l)*ze;return d=(d%360+360)%360,d}smoothHeading(t){if(this.lastHeading===null)return t;let r=t-this.lastHeading;return r>180&&(r-=360),r<-180&&(r+=360),((this.lastHeading+r*(1-this.config.smoothingFactor))%360+360)%360}}const fy={showHorizon:!0,showPitchLadder:!0,showCompass:!0,showDebug:!1,horizonColor:"#00ff88",pitchLadderColor:"rgba(0, 255, 136, 0.5)",textColor:"#ffffff",lineWidth:2,fontSize:14};class my{config;canvas;ctx;width=0;height=0;constructor(t,r={}){this.config={...fy,...r},this.canvas=t,this.ctx=t.getContext("2d")}resize(t,r){this.width=t,this.height=r,this.canvas.width=t,this.canvas.height=r}render(t,r,i,n){this.ctx.clearRect(0,0,this.width,this.height),this.config.showHorizon&&i&&this.drawHorizonLine(i),this.config.showPitchLadder&&t&&this.drawArtificialHorizon(t),this.config.showCompass&&r&&this.drawCompass(r),this.config.showDebug&&n&&this.drawDebugInfo(n,r)}drawHorizonLine(t){const{roll:r,pitch:i,confidence:n}=t,s=this.width/2,a=this.height/2,l=Math.max(this.width,this.height)*1.5,u=this.height/60,d=i*ze*u,h=Math.cos(-r),f=Math.sin(-r),m=s-l*h,y=a+d-l*f,_=s+l*h,w=a+d+l*f;this.ctx.strokeStyle=this.config.horizonColor,this.ctx.lineWidth=this.config.lineWidth,this.ctx.globalAlpha=.3+.7*n,this.ctx.beginPath(),this.ctx.moveTo(m,y),this.ctx.lineTo(_,w),this.ctx.stroke(),this.ctx.globalAlpha=1,this.ctx.fillStyle=this.config.textColor,this.ctx.font=`${this.config.fontSize}px monospace`,this.ctx.fillText(`HOR ${(n*100).toFixed(0)}%`,10,this.height-60)}drawArtificialHorizon(t){const{roll:r,pitch:i}=t,n=this.width/2,s=this.height/2;this.ctx.save(),this.ctx.translate(n,s),this.ctx.rotate(-r);const a=this.height/60,l=i*ze;this.ctx.strokeStyle=this.config.pitchLadderColor,this.ctx.fillStyle=this.config.textColor,this.ctx.font=`${this.config.fontSize-2}px monospace`,this.ctx.textAlign="right";for(let u=-30;u<=30;u+=10){if(u===0)continue;const d=(u-l)*a,h=Math.abs(u)>=20?50:80;this.ctx.beginPath(),this.ctx.moveTo(-h,d),this.ctx.lineTo(-20,d),this.ctx.moveTo(20,d),this.ctx.lineTo(h,d),this.ctx.stroke(),this.ctx.fillText(`${u}`,-h-5,d+4)}this.ctx.strokeStyle=this.config.horizonColor,this.ctx.lineWidth=this.config.lineWidth+1,this.ctx.beginPath(),this.ctx.moveTo(-this.width/3,-l*a),this.ctx.lineTo(this.width/3,-l*a),this.ctx.stroke(),this.ctx.strokeStyle=this.config.textColor,this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.moveTo(-30,0),this.ctx.lineTo(-10,0),this.ctx.lineTo(-10,10),this.ctx.moveTo(30,0),this.ctx.lineTo(10,0),this.ctx.lineTo(10,10),this.ctx.stroke(),this.ctx.restore(),this.drawRollIndicator(r),this.ctx.fillStyle=this.config.textColor,this.ctx.font=`${this.config.fontSize}px monospace`,this.ctx.textAlign="left",this.ctx.fillText(`ROLL ${(r*ze).toFixed(1)}°`,10,this.height-40),this.ctx.fillText(`PITCH ${(i*ze).toFixed(1)}°`,10,this.height-20)}drawRollIndicator(t){const r=this.width/2,i=80,n=50;this.ctx.save(),this.ctx.translate(r,n),this.ctx.strokeStyle="rgba(255, 255, 255, 0.3)",this.ctx.lineWidth=2,this.ctx.beginPath(),this.ctx.arc(0,0,i,Math.PI*.7,Math.PI*.3,!0),this.ctx.stroke(),this.ctx.strokeStyle=this.config.textColor;for(let a=-60;a<=60;a+=10){const l=(a+90)*Math.PI/180,u=a%30===0?i-15:i-10;this.ctx.beginPath(),this.ctx.moveTo(Math.cos(l)*u,-Math.sin(l)*u),this.ctx.lineTo(Math.cos(l)*i,-Math.sin(l)*i),this.ctx.stroke()}const s=(t*ze-90)*Math.PI/180;this.ctx.fillStyle=this.config.horizonColor,this.ctx.beginPath(),this.ctx.moveTo(Math.cos(s)*(i+5),-Math.sin(s)*(i+5)),this.ctx.lineTo(Math.cos(s-.1)*(i+15),-Math.sin(s-.1)*(i+15)),this.ctx.lineTo(Math.cos(s+.1)*(i+15),-Math.sin(s+.1)*(i+15)),this.ctx.closePath(),this.ctx.fill(),this.ctx.restore()}drawCompass(t){const r=this.width/2,i=30;this.ctx.fillStyle=this.config.textColor,this.ctx.font=`bold ${this.config.fontSize+4}px monospace`,this.ctx.textAlign="center",this.ctx.fillText(`${t.heading.toFixed(0)}°`,r,i);const n=this.width*.6,s=r-n/2,a=i+20;this.ctx.strokeStyle="rgba(255, 255, 255, 0.5)",this.ctx.beginPath(),this.ctx.moveTo(s,a),this.ctx.lineTo(s+n,a),this.ctx.stroke(),this.ctx.font=`${this.config.fontSize-2}px monospace`;const u=n/60;for(let d=-180;d<=180;d+=10){let h=t.heading+d;if(h=(h%360+360)%360,Math.abs(d)>30)continue;const f=r+d*u,m=d%30===0?10:5;if(this.ctx.beginPath(),this.ctx.moveTo(f,a),this.ctx.lineTo(f,a+m),this.ctx.stroke(),d%30===0){const y=this.getCardinalLabel(h);this.ctx.fillText(y,f,a+22)}}this.ctx.fillStyle=this.config.horizonColor,this.ctx.beginPath(),this.ctx.moveTo(r,a-5),this.ctx.lineTo(r-5,a-12),this.ctx.lineTo(r+5,a-12),this.ctx.closePath(),this.ctx.fill(),this.ctx.fillStyle="rgba(255, 255, 255, 0.6)",this.ctx.font=`${this.config.fontSize-4}px monospace`,this.ctx.fillText(`${t.source.toUpperCase()} ±${t.uncertainty.toFixed(0)}°`,r,a+38)}getCardinalLabel(t){return t=Math.round(t),t===0||t===360?"N":t===90?"E":t===180?"S":t===270?"W":`${t}`}drawDebugInfo(t,r){this.ctx.fillStyle="rgba(0, 0, 0, 0.5)",this.ctx.fillRect(this.width-180,10,170,100),this.ctx.fillStyle="#00ff00",this.ctx.font="12px monospace",this.ctx.textAlign="left",[`σ_roll: ${(t.rollStd*ze).toFixed(2)}°`,`σ_pitch: ${(t.pitchStd*ze).toFixed(2)}°`,`σ_yaw: ${(t.yawStd*ze).toFixed(2)}°`,r?`HDG src: ${r.source}`:"HDG: N/A",`t: ${t.timestamp}`].forEach((n,s)=>{this.ctx.fillText(n,this.width-170,28+s*16)})}setOption(t,r){this.config[t]=r}}class gy{container;contentDiv;statusDiv;testCanvas;testCtx;engine;state;isExpanded=!1;liveTestRunning=!1;liveTestAnimationId=null;videoElement=null;constructor(t){this.engine=t,this.state=O0(),this.container=document.createElement("div"),this.container.id="diagnostics-panel",this.container.className="diag-panel collapsed";const r=document.createElement("button");r.className="diag-toggle",r.innerHTML="📊",r.title="Toggle Diagnostics Panel",r.addEventListener("click",()=>this.toggle()),this.contentDiv=document.createElement("div"),this.contentDiv.className="diag-content",this.statusDiv=document.createElement("div"),this.statusDiv.className="diag-status",this.testCanvas=document.createElement("canvas"),this.testCanvas.className="diag-test-canvas",this.testCanvas.width=320,this.testCanvas.height=240,this.testCtx=this.testCanvas.getContext("2d");const i=document.createElement("div");i.className="diag-buttons";const n=document.createElement("button");n.textContent="Init Model",n.addEventListener("click",()=>this.initModel());const s=document.createElement("button");s.textContent="Run Self-Test",s.addEventListener("click",()=>this.runSelfTest());const a=document.createElement("button");a.id="diag-live-btn",a.textContent="Start Live Test",a.addEventListener("click",()=>this.toggleLiveTest());const l=document.createElement("button");l.textContent="Copy JSON",l.addEventListener("click",()=>this.copyDiagnosticsJSON()),i.appendChild(n),i.appendChild(s),i.appendChild(a),i.appendChild(l),this.contentDiv.appendChild(this.statusDiv),this.contentDiv.appendChild(i),this.contentDiv.appendChild(this.testCanvas),this.container.appendChild(r),this.container.appendChild(this.contentDiv),this.renderStatus()}mount(t=document.body){t.appendChild(this.container)}toggle(){this.isExpanded=!this.isExpanded,this.container.classList.toggle("collapsed",!this.isExpanded),this.container.classList.toggle("expanded",this.isExpanded)}setVideoElement(t){this.videoElement=t}async initModel(){this.updateStatus("Initializing model...");try{const t=await this.engine.initFromUrl("/best.onnx");this.state.modelUrl=t.fetchResult?.headers["content-location"]||"/best.onnx",this.state.fetchResult=t.fetchResult,this.state.sha256=t.sha256,this.state.hashMatch=t.hashMatch,this.state.backend=t.backend,this.state.backendFallbackReason=t.backendFallbackReason,this.state.sessionInfo=t.sessionInfo,t.success||(this.state.lastError=t.error),this.renderStatus()}catch(t){const r=t;this.state.lastError=r.message,this.state.lastErrorStack=r.stack||null,this.renderStatus()}}async runSelfTest(){this.updateStatus("Running self-test...");const t={passed:!1,preprocessDims:[1,3,640,640],outputShapes:[],boxCount:0,confidenceStats:null,durationMs:0,error:null},r=performance.now();try{const i=new Image;i.crossOrigin="anonymous",await new Promise((u,d)=>{i.onload=()=>u(),i.onerror=()=>d(new Error("Failed to load test image")),i.src="/model_test.png"}),this.testCanvas.width=i.width,this.testCanvas.height=i.height,this.testCtx.drawImage(i,0,0);const{detections:n,inferenceMs:s}=await this.engine.runOnCanvas(this.testCanvas,.1,.45);t.boxCount=n.length,this.state.lastInferenceMs=s,this.state.lastInferenceTimestamp=Date.now();const a=this.engine.getSessionInfo();if(a&&(t.outputShapes=a.outputs.map(u=>({name:u.name,dims:u.dims.map(d=>typeof d=="number"?d:0)}))),n.length>0){const u=n.map(d=>d.confidence);t.confidenceStats={min:Math.min(...u),max:Math.max(...u),mean:u.reduce((d,h)=>d+h,0)/u.length}}this.drawDetections(n);const l=await this.engine.sanityRun();t.passed=l.success&&l.outputsFinite,t.passed?this.updateStatus(`✅ PASS - ${t.boxCount} boxes, ${s.toFixed(1)}ms`):this.updateStatus(`❌ FAIL - ${l.error||"Invalid outputs"}`)}catch(i){const n=i;t.error=n.message,this.updateStatus(`❌ FAIL - ${n.message}`)}t.durationMs=performance.now()-r,this.renderStatus()}toggleLiveTest(){const t=document.getElementById("diag-live-btn");if(this.liveTestRunning)this.liveTestRunning=!1,this.liveTestAnimationId&&(cancelAnimationFrame(this.liveTestAnimationId),this.liveTestAnimationId=null),t&&(t.textContent="Start Live Test"),this.updateStatus("Live test stopped");else{if(!this.videoElement){this.updateStatus("No video element set");return}this.liveTestRunning=!0,t&&(t.textContent="Stop Live Test"),this.runLiveTestLoop()}}async runLiveTestLoop(){if(!this.liveTestRunning||!this.videoElement)return;const t=performance.now();try{this.testCanvas.width=320,this.testCanvas.height=240,this.testCtx.drawImage(this.videoElement,0,0,320,240);const{detections:n,inferenceMs:s}=await this.engine.runOnCanvas(this.testCanvas,.25,.45);this.drawDetections(n),this.state.lastInferenceMs=s,this.state.lastInferenceTimestamp=Date.now();const a=performance.now()-t,l=Math.round(1e3/Math.max(a,1));this.updateStatus(`Live: ${l} FPS | ${s.toFixed(0)}ms | ${n.length} det`)}catch(n){const s=n;this.state.lastError=s.message,this.updateStatus(`❌ ${s.message}`)}const r=performance.now()-t,i=Math.max(100-r,0);this.liveTestRunning&&(this.liveTestAnimationId=window.setTimeout(()=>{requestAnimationFrame(()=>this.runLiveTestLoop())},i))}async copyDiagnosticsJSON(){const t={timestamp:new Date().toISOString(),...this.state,engine:{lastInferenceMs:this.engine.lastInferenceMs,lastInferenceTimestamp:this.engine.lastInferenceTimestamp,backendUsed:this.engine.backendUsed,modelSha256:this.engine.modelSha256,sessionInfo:this.engine.getSessionInfo()}};try{await navigator.clipboard.writeText(JSON.stringify(t,null,2)),this.updateStatus("📋 Copied to clipboard")}catch{const i=JSON.stringify(t,null,2),n=document.createElement("textarea");n.value=i,document.body.appendChild(n),n.select(),document.execCommand("copy"),document.body.removeChild(n),this.updateStatus("📋 Copied (fallback)")}}updateStatus(t){const r=this.statusDiv.querySelector(".diag-status-line");r&&(r.textContent=t)}renderStatus(){const t=this.state,r=this.engine;this.statusDiv.innerHTML=`
            <div class="diag-status-line">${t.lastError?"⚠️ "+t.lastError:"Ready"}</div>
            <table class="diag-table">
                <tr><td>secureContext:</td><td>${t.isSecureContext?"✓":"✗"}</td></tr>
                <tr><td>iOS:</td><td>${t.isIOS?"✓":"✗"}</td></tr>
                <tr><td>modelUrl:</td><td class="diag-mono">${t.modelUrl||"-"}</td></tr>
                <tr><td>fetch status:</td><td>${t.fetchResult?.ok?"✓ ok":t.fetchResult?.error||"-"}</td></tr>
                <tr><td>bytes:</td><td>${t.fetchResult?D0(t.fetchResult.actualBytes):"-"}</td></tr>
                <tr><td>SHA-256:</td><td class="diag-mono">${t.sha256?t.sha256.substring(0,12)+"...":"-"}</td></tr>
                <tr><td>hash match:</td><td>${t.sha256?t.hashMatch?"✓":"✗ expected "+Va.substring(0,8):"-"}</td></tr>
                <tr><td>backend:</td><td>${t.backend||"-"}</td></tr>
                ${t.backendFallbackReason?`<tr><td>fallback:</td><td class="diag-warn">${t.backendFallbackReason.substring(0,30)}...</td></tr>`:""}
                <tr><td>ORT threads:</td><td>${t.ortSettings.numThreads}</td></tr>
                <tr><td>inputs:</td><td>${t.sessionInfo?.inputs.map(i=>i.name).join(", ")||"-"}</td></tr>
                <tr><td>outputs:</td><td>${t.sessionInfo?.outputs.map(i=>i.name).join(", ")||"-"}</td></tr>
                <tr><td>last infer:</td><td>${r.lastInferenceMs?r.lastInferenceMs.toFixed(1)+"ms":"-"}</td></tr>
                <tr><td>last time:</td><td>${r.lastInferenceTimestamp?new Date(r.lastInferenceTimestamp).toLocaleTimeString():"-"}</td></tr>
            </table>
            ${t.isSecureContext?"":'<div class="diag-warning">⚠️ Not HTTPS - camera/model may fail on iOS</div>'}
        `}drawDetections(t){const r=this.testCanvas.width,i=this.testCanvas.height;this.testCtx.strokeStyle="#00ff00",this.testCtx.lineWidth=2,this.testCtx.font="12px monospace",this.testCtx.fillStyle="#00ff00";for(const n of t){const s=(n.x-n.w/2)*r,a=(n.y-n.h/2)*i,l=n.w*r,u=n.h*i;this.testCtx.strokeRect(s,a,l,u),this.testCtx.fillText(`${n.label} ${(n.confidence*100).toFixed(0)}%`,s,a-4)}}}const ke={fatalError:null,secureContext:typeof window<"u"&&window.isSecureContext,camera:"uninitialized",sensors:"unknown",model:"loading",lastHeartbeat:Date.now()};window.addEventListener("error",e=>{const t=`${e.message} at ${e.filename}:${e.lineno}`;ke.fatalError=t.substring(0,200),console.error("[Health] Uncaught error:",t),ft()});window.addEventListener("unhandledrejection",e=>{const t=`Promise rejected: ${e.reason}`;ke.fatalError=t.substring(0,200),console.error("[Health] Unhandled rejection:",e.reason),ft()});function ft(){const e=document.getElementById("health-overlay");if(!e)return;const r=Date.now()-ke.lastHeartbeat;e.innerHTML=`
    <div style="font-size:10px;line-height:1.4;">
      ${ke.fatalError?`<div style="color:#ff5252;">⚠️ ${ke.fatalError}</div>`:""}
      <div>secure: ${ke.secureContext?"✓":"✗"}</div>
      <div>camera: ${ke.camera}</div>
      <div>sensors: ${ke.sensors}</div>
      <div>model: ${ke.model}</div>
      <div>heartbeat: ${r>1e3?"⚠️ "+r+"ms":"✓"}</div>
    </div>
  `}function yy(){return typeof DeviceOrientationEvent.requestPermission=="function"||typeof DeviceMotionEvent.requestPermission=="function"}const He={model:document.getElementById("status-model"),fps:document.getElementById("status-fps"),heading:document.getElementById("status-heading"),zoom:document.getElementById("status-zoom")},Ei={btnZoom1:document.getElementById("btn-zoom-1"),btnZoom4:document.getElementById("btn-zoom-4"),btnRecord:document.getElementById("btn-record")},_y=document.getElementById("debug-stats"),Si=document.getElementById("debug-overlay"),Ga=document.getElementById("detection-canvas"),by=document.getElementById("camera-container"),Vn=document.getElementById("ios-sensor-btn"),Le=new ug,Qt=new N0,Lf=new U0(Ga),wy=new V0,vy=new G0,zi=new Y0,gt=new X0,fa=new ey;let ma=null,et,dr,Ri,ja,br;try{ma=new ry,et=new ay,dr=new ly(3),Ri=new py,ja=new my(Ga),br=new Uf}catch(e){console.error("[Leviathan] Module init error:",e),ke.fatalError=`Module init: ${e}`.substring(0,200),ft()}const Hf=new gy(Qt);Hf.mount();let Ti=!1,$y=.5,Gn=0,Gd=Date.now(),jd=0,Kd=0,jn=0,Kn=null,Bt=null,Nt=null,Zn=null,Tt=null;const xy=100,Cy=10;async function Sy(){ht.state=pt.LOADING,ft(),ke.secureContext||console.warn("[Leviathan] Not a secure context - some features may be blocked"),ke.camera="requesting",ft();try{Le.mount(by),await Le.start(),ke.camera="granted";const t=Le.videoElement;t.videoWidth>0&&fa.updateForResolution(t.videoWidth,t.videoHeight),Hf.setVideoElement(t)}catch(t){console.error("Camera init failed:",t),ke.camera="error",He.model.textContent="● CAM ERROR",He.model.style.color="#ff5252",ft();return}if(await Qt.init("best.onnx"),Qt.useMock?(ke.model="mock",He.model.textContent="● MOCK",He.model.style.color="#ffc107"):(ke.model="loaded",He.model.textContent="● LOADED",He.model.style.color="#4caf50"),ft(),yy())ke.sensors="ios-needs-tap",Vn.style.display="block",Vn.addEventListener("click",async()=>{const t=await gt.requestPermission();if(ke.sensors=t?"granted":"denied",t){Vn.style.display="none";const r=gt.getLatestIMU();r&&et&&et.initializeFromAccel(r.accelWithGravity,Date.now())}ft()});else{const t=await gt.requestPermission();ke.sensors=t?"granted":"denied"}ft();const e=gt.getLatestIMU();e&&et&&et.initializeFromAccel(e.accelWithGravity,Date.now()),"geolocation"in navigator&&(navigator.geolocation.getCurrentPosition(t=>{const r=t.coords.latitude,i=t.coords.longitude;Ri.setLocation(r,i),br.setObserverPosition({latitude:r,longitude:i,accuracy:t.coords.accuracy}),zi.setObserverPosition(r,i),console.log(`[Leviathan] GPS: ${r.toFixed(5)}, ${i.toFixed(5)} ± ${t.coords.accuracy?.toFixed(0)}m`)},t=>console.warn("Geolocation unavailable:",t),{enableHighAccuracy:!0}),navigator.geolocation.watchPosition(t=>{const r=t.coords.latitude,i=t.coords.longitude;Ri.setLocation(r,i),br.setObserverPosition({latitude:r,longitude:i,accuracy:t.coords.accuracy}),zi.setObserverPosition(r,i)},t=>console.warn("GPS update failed:",t),{enableHighAccuracy:!0,maximumAge:1e3,timeout:5e3})),ht.state=pt.READY,Zd(),window.addEventListener("resize",Zd),requestAnimationFrame(Wf)}function Zd(){Lf.resize(window.innerWidth,window.innerHeight),ja.resize(window.innerWidth,window.innerHeight)}async function Wf(){if(ht.state===pt.ERROR)return;const e=Date.now();Gn++,ke.lastHeartbeat=e,e-Gd>=1e3&&(He.fps.textContent=`${Gn} FPS`,Gn=0,Gd=e),fa.updateForZoom(Le.currentZoom);const t=fa.getIntrinsics();if(e-jn>=Cy){const a=gt.getIMUSamplesSince(jn);et.processSamples(a);const l=gt.getLatestIMU();l&&dr.update(l.accel,e),jn=e}if(ma&&e-Kd>=xy){const a=ma.detect(Le.videoElement,t,dr?.getStableHeight()??3);a.horizon&&(Kn=a.horizon,et&&et.updateWithHorizon(a.horizon.roll,a.horizon.pitch)),Kd=e}et&&(Zn=et.getState(),Bt=Zn.orientation),Ri.updateFromCamera(Le.videoElement,t);const r=gt.getMagneticHeading();Nt=Ri.getHeading(r),He.heading.textContent=Nt?`${Nt.heading.toFixed(0)}°`:gt.getHeadingString(),He.zoom.textContent=`${Le.currentZoom}x`;const i=await Qt.run(Le.videoElement,.1),s=wy.update(i).filter(a=>a.confidence>=$y);if(s.length>0){ht.state!==pt.EVENT&&ht.state!==pt.DETECTING&&(ht.state=pt.DETECTING);const a=s.sort((l,u)=>u.confidence-l.confidence)[0];if(Tt=br.localize(a,t,Nt,Bt,Le.currentZoom),Ti&&e-jd>2e3){const l=vy.estimate(a);zi.captureWithLocation(a,l,Tt,Ga,Le.currentZoom),jd=e,Tt&&console.log(`[Leviathan] BLOW DETECTED @ ${Tt.position.latitude.toFixed(5)}, ${Tt.position.longitude.toFixed(5)} - ${Tt.distance}m @ ${Tt.bearing}°`),He.model.textContent="● REC",He.model.style.color="#ff5252",setTimeout(()=>{He.model.textContent=Qt.useMock?"● MOCK":"● LOADED",He.model.style.color=Qt.useMock?"#ffc107":"#4caf50"},500)}}else ht.state===pt.DETECTING&&(ht.state=pt.READY),Tt=null;if(Lf.draw(s),ja.render(Bt,Nt,Kn,Zn??void 0),Si.classList.contains("visible")){const a=zi.getRecentEvents(),l=et.getDiagnostics(),u={state:ht.state,heading:Nt?.heading.toFixed(1),headingSrc:Nt?.source,pitch:Bt?(Bt.pitch*180/Math.PI).toFixed(1):null,roll:Bt?(Bt.roll*180/Math.PI).toFixed(1):null,horizonConf:Kn?.confidence.toFixed(2),heave:dr.getInstantaneousHeight().toFixed(2),ekfReject:(l.rejectionRate*100).toFixed(1)+"%",imuRate:gt.getSampleRate().toFixed(0)+"Hz",zoom:Le.currentZoom,events:zi.events.length,last:a[0]?a[0].event_id.substring(0,4):"None"};_y.textContent=JSON.stringify(u,null,2)}requestAnimationFrame(Wf)}Ei.btnZoom1.addEventListener("click",()=>Le.setZoom(1));Ei.btnZoom4.addEventListener("click",()=>Le.setZoom(4));Ei.btnRecord.addEventListener("click",()=>{Ti=!Ti,Ei.btnRecord.classList.toggle("active",Ti),Ei.btnRecord.textContent=Ti?"ARMED":"REC"});let ga=0;document.addEventListener("touchstart",e=>ga=e.touches[0].clientY);document.addEventListener("touchend",e=>{const t=e.changedTouches[0].clientY;t-ga>100?Si.classList.contains("visible")||Si.classList.add("visible"):ga-t>100&&Si.classList.contains("visible")&&Si.classList.remove("visible")});Sy();
