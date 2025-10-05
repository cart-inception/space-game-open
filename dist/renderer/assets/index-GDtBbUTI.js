(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();class xu{constructor(){this.onTimeChangeCallbacks=[],this.onScaleChangeCallbacks=[],this.settings={scale:"realtime",multiplier:1,currentTime:Date.now()/1e3},this.distanceScale={planetary:149597870700,lunar:1e3,orbital:1,render:1e-9}}update(t){if(this.settings.scale==="paused")return;const e=this.calculateTimeMultiplier();this.settings.currentTime+=t*e,this.onTimeChangeCallbacks.forEach(n=>n(this.settings.currentTime))}calculateTimeMultiplier(){switch(this.settings.scale){case"paused":return 0;case"realtime":return 1;case"minutes":return 60;case"hours":return 3600;case"days":return 86400;case"weeks":return 604800;case"months":return 2592e3;case"years":return 31536e3;default:return 1}}setTimeScale(t){this.settings.scale!==t&&(this.settings.scale=t,this.settings.multiplier=this.calculateTimeMultiplier(),this.onScaleChangeCallbacks.forEach(e=>e(t)))}getTimeScale(){return this.settings.scale}getTimeMultiplier(){return this.settings.multiplier}getCurrentTime(){return this.settings.currentTime}setCurrentTime(t){this.settings.currentTime=t,this.onTimeChangeCallbacks.forEach(e=>e(t))}getFormattedTime(){return new Date(this.settings.currentTime*1e3).toISOString()}getElapsedTimeSince(t){return this.settings.currentTime-t}onTimeChange(t){this.onTimeChangeCallbacks.push(t)}onScaleChange(t){this.onScaleChangeCallbacks.push(t)}removeTimeChangeCallback(t){const e=this.onTimeChangeCallbacks.indexOf(t);e>=0&&this.onTimeChangeCallbacks.splice(e,1)}removeScaleChangeCallback(t){const e=this.onScaleChangeCallbacks.indexOf(t);e>=0&&this.onScaleChangeCallbacks.splice(e,1)}scaleDistanceForRender(t){return t*this.distanceScale.render}scalePositionForRender(t){return t.clone().multiplyScalar(this.distanceScale.render)}unscaleDistanceFromRender(t){return t/this.distanceScale.render}unscalePositionFromRender(t){return t.clone().divideScalar(this.distanceScale.render)}getDistanceScale(){return{...this.distanceScale}}setRenderDistanceScale(t){this.distanceScale.render=t}getScaleForDistance(t){return t<1e6?this.distanceScale.lunar:t<1e12?this.distanceScale.planetary:this.distanceScale.orbital}convertDistance(t,e,n){const i={mm:.001,cm:.01,m:1,km:1e3,Mm:1e6,Gm:1e9,AU:149597870700,ly:9461e12,pc:3086e13};return t*(i[e]||1)/(i[n]||1)}formatDistance(t){return t<1e3?`${t.toFixed(2)} m`:t<1e6?`${(t/1e3).toFixed(2)} km`:t<149597870700?`${(t/1e6).toFixed(2)} Mm`:t<9461e12?`${(t/149597870700).toFixed(2)} AU`:`${(t/9461e12).toFixed(2)} ly`}formatDuration(t){return t<60?`${t.toFixed(2)} s`:t<3600?`${(t/60).toFixed(2)} min`:t<86400?`${(t/3600).toFixed(2)} h`:t<2592e3?`${(t/86400).toFixed(2)} days`:t<31536e3?`${(t/2592e3).toFixed(2)} months`:`${(t/31536e3).toFixed(2)} years`}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Oa="180",Mu=0,wc=1,wu=2,ih=1,Su=2,Xn=3,oi=0,Ye=1,un=2,si=0,Qi=1,Oo=2,Sc=3,Ec=4,Eu=5,xi=100,bu=101,Tu=102,Cu=103,Au=104,Ru=200,Pu=201,Lu=202,Iu=203,Bo=204,zo=205,Du=206,Nu=207,Fu=208,Uu=209,Ou=210,Bu=211,zu=212,ku=213,Vu=214,ko=0,Vo=1,Go=2,ns=3,Ho=4,Wo=5,Xo=6,qo=7,sh=0,Gu=1,Hu=2,ri=0,Wu=1,Xu=2,qu=3,Yu=4,ju=5,$u=6,Ku=7,rh=300,is=301,ss=302,Yo=303,jo=304,zr=306,Oe=1e3,Si=1001,$o=1002,xn=1003,Zu=1004,Xs=1005,Pn=1006,Yr=1007,Ei=1008,Dn=1009,oh=1010,ah=1011,As=1012,Ba=1013,bi=1014,qn=1015,ks=1016,za=1017,ka=1018,Rs=1020,ch=35902,lh=35899,hh=1021,uh=1022,_n=1023,Ps=1026,Ls=1027,dh=1028,Va=1029,fh=1030,Ga=1031,Ha=1033,Ar=33776,Rr=33777,Pr=33778,Lr=33779,Ko=35840,Zo=35841,Jo=35842,Qo=35843,ta=36196,ea=37492,na=37496,ia=37808,sa=37809,ra=37810,oa=37811,aa=37812,ca=37813,la=37814,ha=37815,ua=37816,da=37817,fa=37818,pa=37819,ma=37820,ga=37821,va=36492,_a=36494,ya=36495,xa=36283,Ma=36284,wa=36285,Sa=36286,Ju=3200,Qu=3201,ph=0,td=1,ii="",nn="srgb",rs="srgb-linear",Dr="linear",ue="srgb",Li=7680,bc=519,ed=512,nd=513,id=514,mh=515,sd=516,rd=517,od=518,ad=519,Tc=35044,Cc="300 es",Ln=2e3,Nr=2001;class cs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ac=1234567;const Ss=Math.PI/180,Is=180/Math.PI;function Ai(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ke[r&255]+ke[r>>8&255]+ke[r>>16&255]+ke[r>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]).toLowerCase()}function te(r,t,e){return Math.max(t,Math.min(e,r))}function Wa(r,t){return(r%t+t)%t}function cd(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function ld(r,t,e){return r!==t?(e-r)/(t-r):0}function Es(r,t,e){return(1-e)*r+e*t}function hd(r,t,e,n){return Es(r,t,1-Math.exp(-e*n))}function ud(r,t=1){return t-Math.abs(Wa(r,t*2)-t)}function dd(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function fd(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function pd(r,t){return r+Math.floor(Math.random()*(t-r+1))}function md(r,t){return r+Math.random()*(t-r)}function gd(r){return r*(.5-Math.random())}function vd(r){r!==void 0&&(Ac=r);let t=Ac+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function _d(r){return r*Ss}function yd(r){return r*Is}function xd(r){return(r&r-1)===0&&r!==0}function Md(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function wd(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Sd(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),c=o(e/2),l=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),d=o((t-n)/2),f=s((n-t)/2),p=o((n-t)/2);switch(i){case"XYX":r.set(a*h,c*u,c*d,a*l);break;case"YZY":r.set(c*d,a*h,c*u,a*l);break;case"ZXZ":r.set(c*u,c*d,a*h,a*l);break;case"XZX":r.set(a*h,c*p,c*f,a*l);break;case"YXY":r.set(c*f,a*h,c*p,a*l);break;case"ZYZ":r.set(c*p,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function $i(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function We(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Rc={DEG2RAD:Ss,RAD2DEG:Is,generateUUID:Ai,clamp:te,euclideanModulo:Wa,mapLinear:cd,inverseLerp:ld,lerp:Es,damp:hd,pingpong:ud,smoothstep:dd,smootherstep:fd,randInt:pd,randFloat:md,randFloatSpread:gd,seededRandom:vd,degToRad:_d,radToDeg:yd,isPowerOfTwo:xd,ceilPowerOfTwo:Md,floorPowerOfTwo:wd,setQuaternionFromProperEuler:Sd,normalize:We,denormalize:$i};class vt{constructor(t=0,e=0){vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}let Mn=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],f=s[o+1],p=s[o+2],v=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=p,t[e+3]=v;return}if(u!==v||c!==d||l!==f||h!==p){let g=1-a;const m=c*d+l*f+h*p+u*v,_=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const b=Math.sqrt(x),C=Math.atan2(b,m*_);g=Math.sin(g*C)/b,a=Math.sin(a*C)/b}const y=a*_;if(c=c*g+d*y,l=l*g+f*y,h=h*g+p*y,u=u*g+v*y,g===1-a){const b=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=b,l*=b,h*=b,u*=b}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],p=s[o+3];return t[e]=a*p+h*u+c*f-l*d,t[e+1]=c*p+h*d+l*u-a*f,t[e+2]=l*p+h*f+a*d-c*u,t[e+3]=h*p-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(s/2),d=c(n/2),f=c(i/2),p=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"YZX":this._x=d*h*u+l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u-d*f*p;break;case"XZY":this._x=d*h*u-l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-s*c,this._y=i*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Pc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Pc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=i+c*u+s*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return jr.copy(this).projectOnVector(t),this.sub(jr)}reflect(t){return this.sub(jr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const jr=new L,Pc=new Mn;class Kt{constructor(t,e,n,i,s,o,a,c,l){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l)}set(t,e,n,i,s,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],_=i[1],x=i[4],y=i[7],b=i[2],C=i[5],A=i[8];return s[0]=o*v+a*_+c*b,s[3]=o*g+a*x+c*C,s[6]=o*m+a*y+c*A,s[1]=l*v+h*_+u*b,s[4]=l*g+h*x+u*C,s[7]=l*m+h*y+u*A,s[2]=d*v+f*_+p*b,s[5]=d*g+f*x+p*C,s[8]=d*m+f*y+p*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*s*h+n*a*c+i*s*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*s,f=l*s-o*c,p=e*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=u*v,t[1]=(i*l-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=d*v,t[4]=(h*e-i*c)*v,t[5]=(i*s-a*e)*v,t[6]=f*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply($r.makeScale(t,e)),this}rotate(t){return this.premultiply($r.makeRotation(-t)),this}translate(t,e){return this.premultiply($r.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const $r=new Kt;function gh(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ds(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Ed(){const r=Ds("canvas");return r.style.display="block",r}const Lc={};function Ns(r){r in Lc||(Lc[r]=!0,console.warn(r))}function bd(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const Ic=new Kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dc=new Kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Td(){const r={enabled:!0,workingColorSpace:rs,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ue&&(i.r=Yn(i.r),i.g=Yn(i.g),i.b=Yn(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ue&&(i.r=ts(i.r),i.g=ts(i.g),i.b=ts(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ii?Dr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Ns("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Ns("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[rs]:{primaries:t,whitePoint:n,transfer:Dr,toXYZ:Ic,fromXYZ:Dc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:t,whitePoint:n,transfer:ue,toXYZ:Ic,fromXYZ:Dc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),r}const ae=Td();function Yn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ts(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ii;class Cd{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ii===void 0&&(Ii=Ds("canvas")),Ii.width=t.width,Ii.height=t.height;const i=Ii.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Ii}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ds("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Yn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Yn(e[n]/255)*255):e[n]=Yn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ad=0;class Xa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=Ai(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Kr(i[o].image)):s.push(Kr(i[o]))}else s=Kr(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Kr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Cd.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Rd=0;const Zr=new L;class je extends cs{constructor(t=je.DEFAULT_IMAGE,e=je.DEFAULT_MAPPING,n=Si,i=Si,s=Pn,o=Ei,a=_n,c=Dn,l=je.DEFAULT_ANISOTROPY,h=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rd++}),this.uuid=Ai(),this.name="",this.source=new Xa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Zr).x}get height(){return this.source.getSize(Zr).y}get depth(){return this.source.getSize(Zr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==rh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Oe:t.x=t.x-Math.floor(t.x);break;case Si:t.x=t.x<0?0:1;break;case $o:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Oe:t.y=t.y-Math.floor(t.y);break;case Si:t.y=t.y<0?0:1;break;case $o:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}je.DEFAULT_IMAGE=null;je.DEFAULT_MAPPING=rh;je.DEFAULT_ANISOTROPY=1;class Ee{constructor(t=0,e=0,n=0,i=1){Ee.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],p=c[9],v=c[2],g=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(l+1)/2,y=(f+1)/2,b=(m+1)/2,C=(h+d)/4,A=(u+v)/4,I=(p+g)/4;return x>y&&x>b?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=C/n,s=A/n):y>b?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=C/i,s=I/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=A/s,i=I/s),this.set(n,i,s,e),this}let _=Math.sqrt((g-p)*(g-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(u-v)/_,this.z=(d-h)/_,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this.w=te(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this.w=te(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pd extends cs{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ee(0,0,t,e),this.scissorTest=!1,this.viewport=new Ee(0,0,t,e);const i={width:t,height:e,depth:n.depth},s=new je(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Pn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new Xa(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends Pd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class vh extends je{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=xn,this.minFilter=xn,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ld extends je{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=xn,this.minFilter=xn,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vs{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,fn):fn.fromBufferAttribute(s,o),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),qs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qs.copy(n.boundingBox)),qs.applyMatrix4(t.matrixWorld),this.union(qs)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ds),Ys.subVectors(this.max,ds),Di.subVectors(t.a,ds),Ni.subVectors(t.b,ds),Fi.subVectors(t.c,ds),Kn.subVectors(Ni,Di),Zn.subVectors(Fi,Ni),hi.subVectors(Di,Fi);let e=[0,-Kn.z,Kn.y,0,-Zn.z,Zn.y,0,-hi.z,hi.y,Kn.z,0,-Kn.x,Zn.z,0,-Zn.x,hi.z,0,-hi.x,-Kn.y,Kn.x,0,-Zn.y,Zn.x,0,-hi.y,hi.x,0];return!Jr(e,Di,Ni,Fi,Ys)||(e=[1,0,0,0,1,0,0,0,1],!Jr(e,Di,Ni,Fi,Ys))?!1:(js.crossVectors(Kn,Zn),e=[js.x,js.y,js.z],Jr(e,Di,Ni,Fi,Ys))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Un=[new L,new L,new L,new L,new L,new L,new L,new L],fn=new L,qs=new Vs,Di=new L,Ni=new L,Fi=new L,Kn=new L,Zn=new L,hi=new L,ds=new L,Ys=new L,js=new L,ui=new L;function Jr(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){ui.fromArray(r,s);const a=i.x*Math.abs(ui.x)+i.y*Math.abs(ui.y)+i.z*Math.abs(ui.z),c=t.dot(ui),l=e.dot(ui),h=n.dot(ui);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Id=new Vs,fs=new L,Qr=new L;let ls=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Id.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fs.subVectors(t,this.center);const e=fs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(fs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fs.copy(t.center).add(Qr)),this.expandByPoint(fs.copy(t.center).sub(Qr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}};const On=new L,to=new L,$s=new L,Jn=new L,eo=new L,Ks=new L,no=new L;let kr=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,On)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=On.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(On.copy(this.origin).addScaledVector(this.direction,e),On.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){to.copy(t).add(e).multiplyScalar(.5),$s.copy(e).sub(t).normalize(),Jn.copy(this.origin).sub(to);const s=t.distanceTo(e)*.5,o=-this.direction.dot($s),a=Jn.dot(this.direction),c=-Jn.dot($s),l=Jn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,p;if(h>0)if(u=o*c-a,d=o*a-c,p=s*h,u>=0)if(d>=-p)if(d<=p){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(to).addScaledVector($s,d),f}intersectSphere(t,e){On.subVectors(t.center,this.origin);const n=On.dot(this.direction),i=On.dot(On)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,On)!==null}intersectTriangle(t,e,n,i,s){eo.subVectors(e,t),Ks.subVectors(n,t),no.crossVectors(eo,Ks);let o=this.direction.dot(no),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Jn.subVectors(this.origin,t);const c=a*this.direction.dot(Ks.crossVectors(Jn,Ks));if(c<0)return null;const l=a*this.direction.dot(eo.cross(Jn));if(l<0||c+l>o)return null;const h=-a*Jn.dot(no);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class _e{constructor(t,e,n,i,s,o,a,c,l,h,u,d,f,p,v,g){_e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l,h,u,d,f,p,v,g)}set(t,e,n,i,s,o,a,c,l,h,u,d,f,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _e().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ui.setFromMatrixColumn(t,0).length(),s=1/Ui.setFromMatrixColumn(t,1).length(),o=1/Ui.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=o*h,f=o*u,p=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+p*l,e[5]=d-v*l,e[9]=-a*c,e[2]=v-d*l,e[6]=p+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,p=l*h,v=l*u;e[0]=d+v*a,e[4]=p*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=v+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,p=l*h,v=l*u;e[0]=d-v*a,e[4]=-o*u,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,p=a*h,v=a*u;e[0]=c*h,e[4]=p*l-f,e[8]=d*l+v,e[1]=c*u,e[5]=v*l+d,e[9]=f*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,p=a*c,v=a*l;e[0]=c*h,e[4]=v-d*u,e[8]=p*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+p,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*c,f=o*l,p=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+v,e[5]=o*h,e[9]=f*u-p,e[2]=p*u-f,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Dd,t,Nd)}lookAt(t,e,n){const i=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),Qn.crossVectors(n,Qe),Qn.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),Qn.crossVectors(n,Qe)),Qn.normalize(),Zs.crossVectors(Qe,Qn),i[0]=Qn.x,i[4]=Zs.x,i[8]=Qe.x,i[1]=Qn.y,i[5]=Zs.y,i[9]=Qe.y,i[2]=Qn.z,i[6]=Zs.z,i[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],_=n[3],x=n[7],y=n[11],b=n[15],C=i[0],A=i[4],I=i[8],S=i[12],M=i[1],P=i[5],O=i[9],D=i[13],B=i[2],U=i[6],F=i[10],q=i[14],k=i[3],K=i[7],ot=i[11],ft=i[15];return s[0]=o*C+a*M+c*B+l*k,s[4]=o*A+a*P+c*U+l*K,s[8]=o*I+a*O+c*F+l*ot,s[12]=o*S+a*D+c*q+l*ft,s[1]=h*C+u*M+d*B+f*k,s[5]=h*A+u*P+d*U+f*K,s[9]=h*I+u*O+d*F+f*ot,s[13]=h*S+u*D+d*q+f*ft,s[2]=p*C+v*M+g*B+m*k,s[6]=p*A+v*P+g*U+m*K,s[10]=p*I+v*O+g*F+m*ot,s[14]=p*S+v*D+g*q+m*ft,s[3]=_*C+x*M+y*B+b*k,s[7]=_*A+x*P+y*U+b*K,s[11]=_*I+x*O+y*F+b*ot,s[15]=_*S+x*D+y*q+b*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],p=t[3],v=t[7],g=t[11],m=t[15];return p*(+s*c*u-i*l*u-s*a*d+n*l*d+i*a*f-n*c*f)+v*(+e*c*f-e*l*d+s*o*d-i*o*f+i*l*h-s*c*h)+g*(+e*l*u-e*a*f-s*o*u+n*o*f+s*a*h-n*l*h)+m*(-i*a*h-e*c*u+e*a*d+i*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],p=t[12],v=t[13],g=t[14],m=t[15],_=u*g*l-v*d*l+v*c*f-a*g*f-u*c*m+a*d*m,x=p*d*l-h*g*l-p*c*f+o*g*f+h*c*m-o*d*m,y=h*v*l-p*u*l+p*a*f-o*v*f-h*a*m+o*u*m,b=p*u*c-h*v*c-p*a*d+o*v*d+h*a*g-o*u*g,C=e*_+n*x+i*y+s*b;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return t[0]=_*A,t[1]=(v*d*s-u*g*s-v*i*f+n*g*f+u*i*m-n*d*m)*A,t[2]=(a*g*s-v*c*s+v*i*l-n*g*l-a*i*m+n*c*m)*A,t[3]=(u*c*s-a*d*s-u*i*l+n*d*l+a*i*f-n*c*f)*A,t[4]=x*A,t[5]=(h*g*s-p*d*s+p*i*f-e*g*f-h*i*m+e*d*m)*A,t[6]=(p*c*s-o*g*s-p*i*l+e*g*l+o*i*m-e*c*m)*A,t[7]=(o*d*s-h*c*s+h*i*l-e*d*l-o*i*f+e*c*f)*A,t[8]=y*A,t[9]=(p*u*s-h*v*s-p*n*f+e*v*f+h*n*m-e*u*m)*A,t[10]=(o*v*s-p*a*s+p*n*l-e*v*l-o*n*m+e*a*m)*A,t[11]=(h*a*s-o*u*s-h*n*l+e*u*l+o*n*f-e*a*f)*A,t[12]=b*A,t[13]=(h*v*i-p*u*i+p*n*d-e*v*d-h*n*g+e*u*g)*A,t[14]=(p*a*i-o*v*i-p*n*c+e*v*c+o*n*g-e*a*g)*A,t[15]=(o*u*i-h*a*i+h*n*c-e*u*c-o*n*d+e*a*d)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,h=o+o,u=a+a,d=s*l,f=s*h,p=s*u,v=o*h,g=o*u,m=a*u,_=c*l,x=c*h,y=c*u,b=n.x,C=n.y,A=n.z;return i[0]=(1-(v+m))*b,i[1]=(f+y)*b,i[2]=(p-x)*b,i[3]=0,i[4]=(f-y)*C,i[5]=(1-(d+m))*C,i[6]=(g+_)*C,i[7]=0,i[8]=(p+x)*A,i[9]=(g-_)*A,i[10]=(1-(d+v))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=Ui.set(i[0],i[1],i[2]).length();const o=Ui.set(i[4],i[5],i[6]).length(),a=Ui.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],pn.copy(this);const l=1/s,h=1/o,u=1/a;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=u,pn.elements[9]*=u,pn.elements[10]*=u,e.setFromRotationMatrix(pn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Ln,c=!1){const l=this.elements,h=2*s/(e-t),u=2*s/(n-i),d=(e+t)/(e-t),f=(n+i)/(n-i);let p,v;if(c)p=s/(o-s),v=o*s/(o-s);else if(a===Ln)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Nr)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Ln,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),f=-(n+i)/(n-i);let p,v;if(c)p=1/(o-s),v=o/(o-s);else if(a===Ln)p=-2/(o-s),v=-(o+s)/(o-s);else if(a===Nr)p=-1/(o-s),v=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ui=new L,pn=new _e,Dd=new L(0,0,0),Nd=new L(1,1,1),Qn=new L,Zs=new L,Qe=new L,Nc=new _e,Fc=new Mn;class dn{constructor(t=0,e=0,n=0,i=dn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(te(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-te(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(te(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Nc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Nc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fc.setFromEuler(this),this.setFromQuaternion(Fc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dn.DEFAULT_ORDER="XYZ";class qa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Fd=0;const Uc=new L,Oi=new Mn,Bn=new _e,Js=new L,ps=new L,Ud=new L,Od=new Mn,Oc=new L(1,0,0),Bc=new L(0,1,0),zc=new L(0,0,1),kc={type:"added"},Bd={type:"removed"},Bi={type:"childadded",child:null},io={type:"childremoved",child:null};class Fe extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Fe.DEFAULT_UP.clone();const t=new L,e=new dn,n=new Mn,i=new L(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new _e},normalMatrix:{value:new Kt}}),this.matrix=new _e,this.matrixWorld=new _e,this.matrixAutoUpdate=Fe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Oi.setFromAxisAngle(t,e),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(t,e){return Oi.setFromAxisAngle(t,e),this.quaternion.premultiply(Oi),this}rotateX(t){return this.rotateOnAxis(Oc,t)}rotateY(t){return this.rotateOnAxis(Bc,t)}rotateZ(t){return this.rotateOnAxis(zc,t)}translateOnAxis(t,e){return Uc.copy(t).applyQuaternion(this.quaternion),this.position.add(Uc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Oc,t)}translateY(t){return this.translateOnAxis(Bc,t)}translateZ(t){return this.translateOnAxis(zc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Js.copy(t):Js.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(ps,Js,this.up):Bn.lookAt(Js,ps,this.up),this.quaternion.setFromRotationMatrix(Bn),i&&(Bn.extractRotation(i.matrixWorld),Oi.setFromRotationMatrix(Bn),this.quaternion.premultiply(Oi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(kc),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Bd),io.child=t,this.dispatchEvent(io),io.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(kc),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,t,Ud),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,Od,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Fe.DEFAULT_UP=new L(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new L,zn=new L,so=new L,kn=new L,zi=new L,ki=new L,Vc=new L,ro=new L,oo=new L,ao=new L,co=new Ee,lo=new Ee,ho=new Ee;class vn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),mn.subVectors(t,e),i.cross(mn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){mn.subVectors(i,e),zn.subVectors(n,e),so.subVectors(t,e);const o=mn.dot(mn),a=mn.dot(zn),c=mn.dot(so),l=zn.dot(zn),h=zn.dot(so),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,p=(o*h-a*c)*d;return s.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(t,e,n,i,s,o,a,c){return this.getBarycoord(t,e,n,i,kn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,kn.x),c.addScaledVector(o,kn.y),c.addScaledVector(a,kn.z),c)}static getInterpolatedAttribute(t,e,n,i,s,o){return co.setScalar(0),lo.setScalar(0),ho.setScalar(0),co.fromBufferAttribute(t,e),lo.fromBufferAttribute(t,n),ho.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(co,s.x),o.addScaledVector(lo,s.y),o.addScaledVector(ho,s.z),o}static isFrontFacing(t,e,n,i){return mn.subVectors(n,e),zn.subVectors(t,e),mn.cross(zn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),mn.cross(zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return vn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return vn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return vn.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return vn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return vn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;zi.subVectors(i,n),ki.subVectors(s,n),ro.subVectors(t,n);const c=zi.dot(ro),l=ki.dot(ro);if(c<=0&&l<=0)return e.copy(n);oo.subVectors(t,i);const h=zi.dot(oo),u=ki.dot(oo);if(h>=0&&u<=h)return e.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(zi,o);ao.subVectors(t,s);const f=zi.dot(ao),p=ki.dot(ao);if(p>=0&&f<=p)return e.copy(s);const v=f*l-c*p;if(v<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(n).addScaledVector(ki,a);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return Vc.subVectors(s,i),a=(u-h)/(u-h+(f-p)),e.copy(i).addScaledVector(Vc,a);const m=1/(g+v+d);return o=v*m,a=d*m,e.copy(n).addScaledVector(zi,o).addScaledVector(ki,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const _h={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function uo(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class ee{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=nn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=ae.workingColorSpace){if(t=Wa(t,1),e=te(e,0,1),n=te(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=uo(o,s,t+1/3),this.g=uo(o,s,t),this.b=uo(o,s,t-1/3)}return ae.colorSpaceToWorking(this,i),this}setStyle(t,e=nn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=nn){const n=_h[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Yn(t.r),this.g=Yn(t.g),this.b=Yn(t.b),this}copyLinearToSRGB(t){return this.r=ts(t.r),this.g=ts(t.g),this.b=ts(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=nn){return ae.workingToColorSpace(Ve.copy(this),t),Math.round(te(Ve.r*255,0,255))*65536+Math.round(te(Ve.g*255,0,255))*256+Math.round(te(Ve.b*255,0,255))}getHexString(t=nn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.workingToColorSpace(Ve.copy(this),e);const n=Ve.r,i=Ve.g,s=Ve.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.workingToColorSpace(Ve.copy(this),e),t.r=Ve.r,t.g=Ve.g,t.b=Ve.b,t}getStyle(t=nn){ae.workingToColorSpace(Ve.copy(this),t);const e=Ve.r,n=Ve.g,i=Ve.b;return t!==nn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ti),this.setHSL(ti.h+t,ti.s+e,ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ti),t.getHSL(Qs);const n=Es(ti.h,Qs.h,e),i=Es(ti.s,Qs.s,e),s=Es(ti.l,Qs.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ve=new ee;ee.NAMES=_h;let zd=0,ai=class extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=Ai(),this.name="",this.type="Material",this.blending=Qi,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bo,this.blendDst=zo,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qi&&(n.blending=this.blending),this.side!==oi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Bo&&(n.blendSrc=this.blendSrc),this.blendDst!==zo&&(n.blendDst=this.blendDst),this.blendEquation!==xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};class jn extends ai{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=sh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const be=new L,tr=new vt;let kd=0;class In{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Tc,this.updateRanges=[],this.gpuType=qn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)tr.fromBufferAttribute(this,e),tr.applyMatrix3(t),this.setXY(e,tr.x,tr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=$i(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=We(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=$i(e,this.array)),e}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=$i(e,this.array)),e}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=$i(e,this.array)),e}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=$i(e,this.array)),e}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),i=We(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),i=We(i,this.array),s=We(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Tc&&(t.usage=this.usage),t}}class yh extends In{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xh extends In{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class de extends In{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Vd=0;const ln=new _e,fo=new Fe,Vi=new L,tn=new Vs,ms=new Vs,Ne=new L;class Be extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(gh(t)?xh:yh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Kt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ln.makeRotationFromQuaternion(t),this.applyMatrix4(ln),this}rotateX(t){return ln.makeRotationX(t),this.applyMatrix4(ln),this}rotateY(t){return ln.makeRotationY(t),this.applyMatrix4(ln),this}rotateZ(t){return ln.makeRotationZ(t),this.applyMatrix4(ln),this}translate(t,e,n){return ln.makeTranslation(t,e,n),this.applyMatrix4(ln),this}scale(t,e,n){return ln.makeScale(t,e,n),this.applyMatrix4(ln),this}lookAt(t){return fo.lookAt(t),fo.updateMatrix(),this.applyMatrix4(fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new de(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];tn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ne.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Ne),Ne.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Ne)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ls);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];ms.setFromBufferAttribute(a),this.morphTargetsRelative?(Ne.addVectors(tn.min,ms.min),tn.expandByPoint(Ne),Ne.addVectors(tn.max,ms.max),tn.expandByPoint(Ne)):(tn.expandByPoint(ms.min),tn.expandByPoint(ms.max))}tn.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Ne.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Ne));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ne.fromBufferAttribute(a,l),c&&(Vi.fromBufferAttribute(t,l),Ne.add(Vi)),i=Math.max(i,n.distanceToSquared(Ne))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new In(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new L,c[I]=new L;const l=new L,h=new L,u=new L,d=new vt,f=new vt,p=new vt,v=new L,g=new L;function m(I,S,M){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,I),f.fromBufferAttribute(s,S),p.fromBufferAttribute(s,M),h.sub(l),u.sub(l),f.sub(d),p.sub(d);const P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(P),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(P),a[I].add(v),a[S].add(v),a[M].add(v),c[I].add(g),c[S].add(g),c[M].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let I=0,S=_.length;I<S;++I){const M=_[I],P=M.start,O=M.count;for(let D=P,B=P+O;D<B;D+=3)m(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const x=new L,y=new L,b=new L,C=new L;function A(I){b.fromBufferAttribute(i,I),C.copy(b);const S=a[I];x.copy(S),x.sub(b.multiplyScalar(b.dot(S))).normalize(),y.crossVectors(C,S);const P=y.dot(c[I])<0?-1:1;o.setXYZW(I,x.x,x.y,x.z,P)}for(let I=0,S=_.length;I<S;++I){const M=_[I],P=M.start,O=M.count;for(let D=P,B=P+O;D<B;D+=3)A(t.getX(D+0)),A(t.getX(D+1)),A(t.getX(D+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new In(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new L,s=new L,o=new L,a=new L,c=new L,l=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){const p=t.getX(d+0),v=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,p),s.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ne.fromBufferAttribute(t,e),Ne.normalize(),t.setXYZ(e,Ne.x,Ne.y,Ne.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,p=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let m=0;m<h;m++)d[p++]=l[f++]}return new In(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Be,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Gc=new _e,di=new kr,er=new ls,Hc=new L,nr=new L,ir=new L,sr=new L,po=new L,rr=new L,Wc=new L,or=new L;class xt extends Fe{constructor(t=new Be,e=new jn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){rr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(po.fromBufferAttribute(u,t),o?rr.addScaledVector(po,h):rr.addScaledVector(po.sub(e),h))}e.add(rr)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere),er.applyMatrix4(s),di.copy(t.ray).recast(t.near),!(er.containsPoint(di.origin)===!1&&(di.intersectSphere(er,Hc)===null||di.origin.distanceToSquared(Hc)>(t.far-t.near)**2))&&(Gc.copy(s).invert(),di.copy(t.ray).applyMatrix4(Gc),!(n.boundingBox!==null&&di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,di)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=o[g.materialIndex],_=Math.max(g.start,f.start),x=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,b=x;y<b;y+=3){const C=a.getX(y),A=a.getX(y+1),I=a.getX(y+2);i=ar(this,m,t,n,l,h,u,C,A,I),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const _=a.getX(g),x=a.getX(g+1),y=a.getX(g+2);i=ar(this,o,t,n,l,h,u,_,x,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=o[g.materialIndex],_=Math.max(g.start,f.start),x=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let y=_,b=x;y<b;y+=3){const C=y,A=y+1,I=y+2;i=ar(this,m,t,n,l,h,u,C,A,I),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const _=g,x=g+1,y=g+2;i=ar(this,o,t,n,l,h,u,_,x,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function Gd(r,t,e,n,i,s,o,a){let c;if(t.side===Ye?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,t.side===oi,a),c===null)return null;or.copy(a),or.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(or);return l<e.near||l>e.far?null:{distance:l,point:or.clone(),object:r}}function ar(r,t,e,n,i,s,o,a,c,l){r.getVertexPosition(a,nr),r.getVertexPosition(c,ir),r.getVertexPosition(l,sr);const h=Gd(r,t,e,n,nr,ir,sr,Wc);if(h){const u=new L;vn.getBarycoord(Wc,nr,ir,sr,u),i&&(h.uv=vn.getInterpolatedAttribute(i,a,c,l,u,new vt)),s&&(h.uv1=vn.getInterpolatedAttribute(s,a,c,l,u,new vt)),o&&(h.normal=vn.getInterpolatedAttribute(o,a,c,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new L,materialIndex:0};vn.getNormal(nr,ir,sr,d.normal),h.face=d,h.barycoord=u}return h}class rn extends Be{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,e,t,o,s,0),p("z","y","x",1,-1,n,e,-t,o,s,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,s,4),p("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(h,3)),this.setAttribute("uv",new de(u,2));function p(v,g,m,_,x,y,b,C,A,I,S){const M=y/A,P=b/I,O=y/2,D=b/2,B=C/2,U=A+1,F=I+1;let q=0,k=0;const K=new L;for(let ot=0;ot<F;ot++){const ft=ot*P-D;for(let st=0;st<U;st++){const Xt=st*M-O;K[v]=Xt*_,K[g]=ft*x,K[m]=B,l.push(K.x,K.y,K.z),K[v]=0,K[g]=0,K[m]=C>0?1:-1,h.push(K.x,K.y,K.z),u.push(st/A),u.push(1-ot/I),q+=1}}for(let ot=0;ot<I;ot++)for(let ft=0;ft<A;ft++){const st=d+ft+U*ot,Xt=d+ft+U*(ot+1),Zt=d+(ft+1)+U*(ot+1),Jt=d+(ft+1)+U*ot;c.push(st,Xt,Jt),c.push(Xt,Zt,Jt),k+=6}a.addGroup(f,k,S),f+=k,d+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function os(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Xe(r){const t={};for(let e=0;e<r.length;e++){const n=os(r[e]);for(const i in n)t[i]=n[i]}return t}function Hd(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Mh(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}const Wd={clone:os,merge:Xe};var Xd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends ai{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xd,this.fragmentShader=qd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=Hd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class wh extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _e,this.projectionMatrix=new _e,this.projectionMatrixInverse=new _e,this.coordinateSystem=Ln,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ei=new L,Xc=new vt,qc=new vt;class hn extends wh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Is*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ss*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Is*2*Math.atan(Math.tan(Ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ei.x,ei.y).multiplyScalar(-t/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ei.x,ei.y).multiplyScalar(-t/ei.z)}getViewSize(t,e){return this.getViewBounds(t,Xc,qc),e.subVectors(qc,Xc)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ss*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Gi=-90,Hi=1;class Yd extends Fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new hn(Gi,Hi,t,e);i.layers=this.layers,this.add(i);const s=new hn(Gi,Hi,t,e);s.layers=this.layers,this.add(s);const o=new hn(Gi,Hi,t,e);o.layers=this.layers,this.add(o);const a=new hn(Gi,Hi,t,e);a.layers=this.layers,this.add(a);const c=new hn(Gi,Hi,t,e);c.layers=this.layers,this.add(c);const l=new hn(Gi,Hi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Ya extends je{constructor(t=[],e=is,n,i,s,o,a,c,l,h){super(t,e,n,i,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class jd extends Ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Ya(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new rn(5,5,5),s=new $n({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:si});s.uniforms.tEquirect.value=e;const o=new xt(i,s),a=e.minFilter;return e.minFilter===Ei&&(e.minFilter=Pn),new Yd(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}class re extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $d={type:"move"};class mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),m=this._getHandJoint(l,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;l.inputState.pinching&&d>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent($d)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Kd extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dn,this.environmentIntensity=1,this.environmentRotation=new dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const go=new L,Zd=new L,Jd=new Kt;class _i{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=go.subVectors(n,e).cross(Zd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(go),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Jd.getNormalMatrix(t),i=this.coplanarPoint(go).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fi=new ls,Qd=new vt(.5,.5),cr=new L;class ja{constructor(t=new _i,e=new _i,n=new _i,i=new _i,s=new _i,o=new _i){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ln,n=!1){const i=this.planes,s=t.elements,o=s[0],a=s[1],c=s[2],l=s[3],h=s[4],u=s[5],d=s[6],f=s[7],p=s[8],v=s[9],g=s[10],m=s[11],_=s[12],x=s[13],y=s[14],b=s[15];if(i[0].setComponents(l-o,f-h,m-p,b-_).normalize(),i[1].setComponents(l+o,f+h,m+p,b+_).normalize(),i[2].setComponents(l+a,f+u,m+v,b+x).normalize(),i[3].setComponents(l-a,f-u,m-v,b-x).normalize(),n)i[4].setComponents(c,d,g,y).normalize(),i[5].setComponents(l-c,f-d,m-g,b-y).normalize();else if(i[4].setComponents(l-c,f-d,m-g,b-y).normalize(),e===Ln)i[5].setComponents(l+c,f+d,m+g,b+y).normalize();else if(e===Nr)i[5].setComponents(c,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(t){fi.center.set(0,0,0);const e=Qd.distanceTo(t.center);return fi.radius=.7071067811865476+e,fi.applyMatrix4(t.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(cr.x=i.normal.x>0?t.max.x:t.min.x,cr.y=i.normal.y>0?t.max.y:t.min.y,cr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(cr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Sh extends ai{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Fr=new L,Ur=new L,Yc=new _e,gs=new kr,lr=new ls,vo=new L,jc=new L;class tf extends Fe{constructor(t=new Be,e=new Sh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)Fr.fromBufferAttribute(e,i-1),Ur.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Fr.distanceTo(Ur);t.setAttribute("lineDistance",new de(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere),lr.applyMatrix4(i),lr.radius+=s,t.ray.intersectsSphere(lr)===!1)return;Yc.copy(i).invert(),gs.copy(t.ray).applyMatrix4(Yc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let v=f,g=p-1;v<g;v+=l){const m=h.getX(v),_=h.getX(v+1),x=hr(this,t,gs,c,m,_,v);x&&e.push(x)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(f),m=hr(this,t,gs,c,v,g,p-1);m&&e.push(m)}}else{const f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let v=f,g=p-1;v<g;v+=l){const m=hr(this,t,gs,c,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){const v=hr(this,t,gs,c,p-1,f,p-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function hr(r,t,e,n,i,s,o){const a=r.geometry.attributes.position;if(Fr.fromBufferAttribute(a,i),Ur.fromBufferAttribute(a,s),e.distanceSqToSegment(Fr,Ur,vo,jc)>n)return;vo.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(vo);if(!(l<t.near||l>t.far))return{distance:l,point:jc.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}class Eh extends ai{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const $c=new _e,Ea=new kr,ur=new ls,dr=new L;class ef extends Fe{constructor(t=new Be,e=new Eh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ur.copy(n.boundingSphere),ur.applyMatrix4(i),ur.radius+=s,t.ray.intersectsSphere(ur)===!1)return;$c.copy(i).invert(),Ea.copy(t.ray).applyMatrix4($c);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let p=d,v=f;p<v;p++){const g=l.getX(p);dr.fromBufferAttribute(u,g),Kc(dr,g,c,i,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let p=d,v=f;p<v;p++)dr.fromBufferAttribute(u,p),Kc(dr,p,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Kc(r,t,e,n,i,s,o){const a=Ea.distanceSqToPoint(r);if(a<e){const c=new L;Ea.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class sn extends je{constructor(t,e,n,i,s,o,a,c,l){super(t,e,n,i,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bh extends je{constructor(t,e,n=bi,i,s,o,a=xn,c=xn,l,h=Ps,u=1){if(h!==Ps&&h!==Ls)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,i,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Xa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Th extends je{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class $a extends Be{constructor(t=1,e=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:s},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const o=[],a=[],c=[],l=[],h=e/2,u=Math.PI/2*t,d=e,f=2*u+d,p=n*2+s,v=i+1,g=new L,m=new L;for(let _=0;_<=p;_++){let x=0,y=0,b=0,C=0;if(_<=n){const S=_/n,M=S*Math.PI/2;y=-h-t*Math.cos(M),b=t*Math.sin(M),C=-t*Math.cos(M),x=S*u}else if(_<=n+s){const S=(_-n)/s;y=-h+S*e,b=t,C=0,x=u+S*d}else{const S=(_-n-s)/n,M=S*Math.PI/2;y=h+t*Math.sin(M),b=t*Math.cos(M),C=t*Math.sin(M),x=u+d+S*u}const A=Math.max(0,Math.min(1,x/f));let I=0;_===0?I=.5/i:_===p&&(I=-.5/i);for(let S=0;S<=i;S++){const M=S/i,P=M*Math.PI*2,O=Math.sin(P),D=Math.cos(P);m.x=-b*D,m.y=y,m.z=b*O,a.push(m.x,m.y,m.z),g.set(-b*D,C,b*O),g.normalize(),c.push(g.x,g.y,g.z),l.push(M+I,A)}if(_>0){const S=(_-1)*v;for(let M=0;M<i;M++){const P=S+M,O=S+M+1,D=_*v+M,B=_*v+M+1;o.push(P,O,D),o.push(O,B,D)}}}this.setIndex(o),this.setAttribute("position",new de(a,3)),this.setAttribute("normal",new de(c,3)),this.setAttribute("uv",new de(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $a(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Ka extends Be{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],o=[],a=[],c=[],l=new L,h=new vt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new de(o,3)),this.setAttribute("normal",new de(a,3)),this.setAttribute("uv",new de(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ka(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ye extends Be{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let p=0;const v=[],g=n/2;let m=0;_(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new de(u,3)),this.setAttribute("normal",new de(d,3)),this.setAttribute("uv",new de(f,2));function _(){const y=new L,b=new L;let C=0;const A=(e-t)/n;for(let I=0;I<=s;I++){const S=[],M=I/s,P=M*(e-t)+t;for(let O=0;O<=i;O++){const D=O/i,B=D*c+a,U=Math.sin(B),F=Math.cos(B);b.x=P*U,b.y=-M*n+g,b.z=P*F,u.push(b.x,b.y,b.z),y.set(U,A,F).normalize(),d.push(y.x,y.y,y.z),f.push(D,1-M),S.push(p++)}v.push(S)}for(let I=0;I<i;I++)for(let S=0;S<s;S++){const M=v[S][I],P=v[S+1][I],O=v[S+1][I+1],D=v[S][I+1];(t>0||S!==0)&&(h.push(M,P,D),C+=3),(e>0||S!==s-1)&&(h.push(P,O,D),C+=3)}l.addGroup(m,C,0),m+=C}function x(y){const b=p,C=new vt,A=new L;let I=0;const S=y===!0?t:e,M=y===!0?1:-1;for(let O=1;O<=i;O++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),p++;const P=p;for(let O=0;O<=i;O++){const B=O/i*c+a,U=Math.cos(B),F=Math.sin(B);A.x=S*F,A.y=g*M,A.z=S*U,u.push(A.x,A.y,A.z),d.push(0,M,0),C.x=U*.5+.5,C.y=F*.5*M+.5,f.push(C.x,C.y),p++}for(let O=0;O<i;O++){const D=b+O,B=P+O;y===!0?h.push(B,B+1,D):h.push(B+1,B,D),I+=3}l.addGroup(m,I,y===!0?1:2),m+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ye(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class es extends ye{constructor(t=1,e=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new es(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Nn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),c=e||(o.isVector2?new vt:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,i=[],s=[],o=[],a=new L,c=new _e;for(let f=0;f<=t;f++){const p=f/t;i[f]=this.getTangentAt(p,new L)}s[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(te(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,p))}o[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(te(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let p=1;p<=t;p++)s[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],s[p])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Za extends Nn{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new vt){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class nf extends Za{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ja(){let r=0,t=0,e=0,n=0;function i(s,o,a,c){r=s,t=a,e=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){i(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,u){let d=(o-s)/l-(a-s)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const fr=new L,_o=new Ja,yo=new Ja,xo=new Ja;class sf extends Nn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new L){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%s]:(fr.subVectors(i[0],i[1]).add(i[0]),l=fr);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(fr.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=fr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),_o.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,p,v,g),yo.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,p,v,g),xo.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&(_o.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),yo.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),xo.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(_o.calc(c),yo.calc(c),xo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new L().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Zc(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,c=r*a;return(2*e-2*n+s+o)*c+(-3*e+3*n-2*s-o)*a+s*r+e}function rf(r,t){const e=1-r;return e*e*t}function of(r,t){return 2*(1-r)*r*t}function af(r,t){return r*r*t}function bs(r,t,e,n){return rf(r,t)+of(r,e)+af(r,n)}function cf(r,t){const e=1-r;return e*e*e*t}function lf(r,t){const e=1-r;return 3*e*e*r*t}function hf(r,t){return 3*(1-r)*r*r*t}function uf(r,t){return r*r*r*t}function Ts(r,t,e,n,i){return cf(r,t)+lf(r,e)+hf(r,n)+uf(r,i)}class Ch extends Nn{constructor(t=new vt,e=new vt,n=new vt,i=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new vt){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Ts(t,i.x,s.x,o.x,a.x),Ts(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class df extends Nn{constructor(t=new L,e=new L,n=new L,i=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new L){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Ts(t,i.x,s.x,o.x,a.x),Ts(t,i.y,s.y,o.y,a.y),Ts(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ah extends Nn{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ff extends Nn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rh extends Nn{constructor(t=new vt,e=new vt,n=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new vt){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(bs(t,i.x,s.x,o.x),bs(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class pf extends Nn{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(bs(t,i.x,s.x,o.x),bs(t,i.y,s.y,o.y),bs(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ph extends Nn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Zc(a,c.x,l.x,h.x,u.x),Zc(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new vt().fromArray(i))}return this}}var ba=Object.freeze({__proto__:null,ArcCurve:nf,CatmullRomCurve3:sf,CubicBezierCurve:Ch,CubicBezierCurve3:df,EllipseCurve:Za,LineCurve:Ah,LineCurve3:ff,QuadraticBezierCurve:Rh,QuadraticBezierCurve3:pf,SplineCurve:Ph});class mf extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ba[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new ba[i.type]().fromJSON(i))}return this}}class Jc extends mf{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ah(this.currentPoint.clone(),new vt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new Rh(this.currentPoint.clone(),new vt(t,e),new vt(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new Ch(this.currentPoint.clone(),new vt(t,e),new vt(n,i),new vt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Ph(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,s,o,a,c),this}absellipse(t,e,n,i,s,o,a,c){const l=new Za(t,e,n,i,s,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}let Lh=class extends Jc{constructor(t){super(t),this.uuid=Ai(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Jc().fromJSON(i))}return this}};function gf(r,t,e=2){const n=t&&t.length,i=n?t[0]*e:r.length;let s=Ih(r,0,i,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l;if(n&&(s=Mf(r,t,s,e)),r.length>80*e){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=e;d<i;d+=e){const f=r[d],p=r[d+1];f<a&&(a=f),p<c&&(c=p),f>h&&(h=f),p>u&&(u=p)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return Fs(s,o,e,a,c,l,0),o}function Ih(r,t,e,n,i){let s;if(i===If(r,t,e,n)>0)for(let o=t;o<e;o+=n)s=Qc(o/n|0,r[o],r[o+1],s);else for(let o=e-n;o>=t;o-=n)s=Qc(o/n|0,r[o],r[o+1],s);return s&&as(s,s.next)&&(Os(s),s=s.next),s}function Ci(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(as(e,e.next)||we(e.prev,e,e.next)===0)){if(Os(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Fs(r,t,e,n,i,s,o){if(!r)return;!o&&s&&Tf(r,n,i,s);let a=r;for(;r.prev!==r.next;){const c=r.prev,l=r.next;if(s?_f(r,n,i,s):vf(r)){t.push(c.i,r.i,l.i),Os(r),r=l.next,a=l.next;continue}if(r=l,r===a){o?o===1?(r=yf(Ci(r),t),Fs(r,t,e,n,i,s,2)):o===2&&xf(r,t,e,n,i,s):Fs(Ci(r),t,e,n,i,s,1);break}}}function vf(r){const t=r.prev,e=r,n=r.next;if(we(t,e,n)>=0)return!1;const i=t.x,s=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(i,s,o),u=Math.min(a,c,l),d=Math.max(i,s,o),f=Math.max(a,c,l);let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Ms(i,a,s,c,o,l,p.x,p.y)&&we(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function _f(r,t,e,n){const i=r.prev,s=r,o=r.next;if(we(i,s,o)>=0)return!1;const a=i.x,c=s.x,l=o.x,h=i.y,u=s.y,d=o.y,f=Math.min(a,c,l),p=Math.min(h,u,d),v=Math.max(a,c,l),g=Math.max(h,u,d),m=Ta(f,p,t,e,n),_=Ta(v,g,t,e,n);let x=r.prevZ,y=r.nextZ;for(;x&&x.z>=m&&y&&y.z<=_;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&Ms(a,h,c,u,l,d,x.x,x.y)&&we(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Ms(a,h,c,u,l,d,y.x,y.y)&&we(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=m;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&Ms(a,h,c,u,l,d,x.x,x.y)&&we(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=_;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Ms(a,h,c,u,l,d,y.x,y.y)&&we(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function yf(r,t){let e=r;do{const n=e.prev,i=e.next.next;!as(n,i)&&Nh(n,e,e.next,i)&&Us(n,i)&&Us(i,n)&&(t.push(n.i,e.i,i.i),Os(e),Os(e.next),e=r=i),e=e.next}while(e!==r);return Ci(e)}function xf(r,t,e,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Rf(o,a)){let c=Fh(o,a);o=Ci(o,o.next),c=Ci(c,c.next),Fs(o,t,e,n,i,s,0),Fs(c,t,e,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function Mf(r,t,e,n){const i=[];for(let s=0,o=t.length;s<o;s++){const a=t[s]*n,c=s<o-1?t[s+1]*n:r.length,l=Ih(r,a,c,n,!1);l===l.next&&(l.steiner=!0),i.push(Af(l))}i.sort(wf);for(let s=0;s<i.length;s++)e=Sf(i[s],e);return e}function wf(r,t){let e=r.x-t.x;if(e===0&&(e=r.y-t.y,e===0)){const n=(r.next.y-r.y)/(r.next.x-r.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Sf(r,t){const e=Ef(r,t);if(!e)return t;const n=Fh(e,r);return Ci(n,n.next),Ci(e,e.next)}function Ef(r,t){let e=t;const n=r.x,i=r.y;let s=-1/0,o;if(as(r,e))return e;do{if(as(r,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const u=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>s&&(s=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Dh(i<l?n:s,i,c,l,i<l?s:n,i,e.x,e.y)){const u=Math.abs(i-e.y)/(n-e.x);Us(e,r)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&bf(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function bf(r,t){return we(r.prev,r,t.prev)<0&&we(t.next,r,r.next)<0}function Tf(r,t,e,n){let i=r;do i.z===0&&(i.z=Ta(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Cf(i)}function Cf(r){let t,e=1;do{let n=r,i;r=null;let s=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,c--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;n=o}s.nextZ=null,e*=2}while(t>1);return r}function Ta(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function Af(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Dh(r,t,e,n,i,s,o,a){return(i-o)*(t-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(i-o)*(n-a)}function Ms(r,t,e,n,i,s,o,a){return!(r===o&&t===a)&&Dh(r,t,e,n,i,s,o,a)}function Rf(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!Pf(r,t)&&(Us(r,t)&&Us(t,r)&&Lf(r,t)&&(we(r.prev,r,t.prev)||we(r,t.prev,t))||as(r,t)&&we(r.prev,r,r.next)>0&&we(t.prev,t,t.next)>0)}function we(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function as(r,t){return r.x===t.x&&r.y===t.y}function Nh(r,t,e,n){const i=mr(we(r,t,e)),s=mr(we(r,t,n)),o=mr(we(e,n,r)),a=mr(we(e,n,t));return!!(i!==s&&o!==a||i===0&&pr(r,e,t)||s===0&&pr(r,n,t)||o===0&&pr(e,r,n)||a===0&&pr(e,t,n))}function pr(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function mr(r){return r>0?1:r<0?-1:0}function Pf(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Nh(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function Us(r,t){return we(r.prev,r,r.next)<0?we(r,t,r.next)>=0&&we(r,r.prev,t)>=0:we(r,t,r.prev)<0||we(r,r.next,t)<0}function Lf(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Fh(r,t){const e=Ca(r.i,r.x,r.y),n=Ca(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Qc(r,t,e,n){const i=Ca(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Os(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Ca(r,t,e){return{i:r,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function If(r,t,e,n){let i=0;for(let s=t,o=e-n;s<e;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class Df{static triangulate(t,e,n=2){return gf(t,e,n)}}class Ki{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return Ki.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];tl(t),el(n,t);let o=t.length;e.forEach(tl);for(let c=0;c<e.length;c++)i.push(o),o+=e[c].length,el(n,e[c]);const a=Df.triangulate(n,i);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function tl(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function el(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class Qa extends Be{constructor(t=new Lh([new vt(.5,.5),new vt(-.5,.5),new vt(-.5,-.5),new vt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],s=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new de(i,3)),this.setAttribute("uv",new de(s,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:Nf;let x,y=!1,b,C,A,I;m&&(x=m.getSpacedPoints(h),y=!0,d=!1,b=m.computeFrenetFrames(h,!1),C=new L,A=new L,I=new L),d||(g=0,f=0,p=0,v=0);const S=a.extractPoints(l);let M=S.shape;const P=S.holes;if(!Ki.isClockWise(M)){M=M.reverse();for(let it=0,Q=P.length;it<Q;it++){const J=P[it];Ki.isClockWise(J)&&(P[it]=J.reverse())}}function D(it){const J=10000000000000001e-36;let Z=it[0];for(let pt=1;pt<=it.length;pt++){const rt=pt%it.length,mt=it[rt],qt=mt.x-Z.x,Ht=mt.y-Z.y,R=qt*qt+Ht*Ht,w=Math.max(Math.abs(mt.x),Math.abs(mt.y),Math.abs(Z.x),Math.abs(Z.y)),H=J*w*w;if(R<=H){it.splice(rt,1),pt--;continue}Z=mt}}D(M),P.forEach(D);const B=P.length,U=M;for(let it=0;it<B;it++){const Q=P[it];M=M.concat(Q)}function F(it,Q,J){return Q||console.error("THREE.ExtrudeGeometry: vec does not exist"),it.clone().addScaledVector(Q,J)}const q=M.length;function k(it,Q,J){let Z,pt,rt;const mt=it.x-Q.x,qt=it.y-Q.y,Ht=J.x-it.x,R=J.y-it.y,w=mt*mt+qt*qt,H=mt*R-qt*Ht;if(Math.abs(H)>Number.EPSILON){const Y=Math.sqrt(w),nt=Math.sqrt(Ht*Ht+R*R),j=Q.x-qt/Y,Nt=Q.y+mt/Y,dt=J.x-R/nt,Lt=J.y+Ht/nt,It=((dt-j)*R-(Lt-Nt)*Ht)/(mt*R-qt*Ht);Z=j+mt*It-it.x,pt=Nt+qt*It-it.y;const at=Z*Z+pt*pt;if(at<=2)return new vt(Z,pt);rt=Math.sqrt(at/2)}else{let Y=!1;mt>Number.EPSILON?Ht>Number.EPSILON&&(Y=!0):mt<-Number.EPSILON?Ht<-Number.EPSILON&&(Y=!0):Math.sign(qt)===Math.sign(R)&&(Y=!0),Y?(Z=-qt,pt=mt,rt=Math.sqrt(w)):(Z=mt,pt=qt,rt=Math.sqrt(w/2))}return new vt(Z/rt,pt/rt)}const K=[];for(let it=0,Q=U.length,J=Q-1,Z=it+1;it<Q;it++,J++,Z++)J===Q&&(J=0),Z===Q&&(Z=0),K[it]=k(U[it],U[J],U[Z]);const ot=[];let ft,st=K.concat();for(let it=0,Q=B;it<Q;it++){const J=P[it];ft=[];for(let Z=0,pt=J.length,rt=pt-1,mt=Z+1;Z<pt;Z++,rt++,mt++)rt===pt&&(rt=0),mt===pt&&(mt=0),ft[Z]=k(J[Z],J[rt],J[mt]);ot.push(ft),st=st.concat(ft)}let Xt;if(g===0)Xt=Ki.triangulateShape(U,P);else{const it=[],Q=[];for(let J=0;J<g;J++){const Z=J/g,pt=f*Math.cos(Z*Math.PI/2),rt=p*Math.sin(Z*Math.PI/2)+v;for(let mt=0,qt=U.length;mt<qt;mt++){const Ht=F(U[mt],K[mt],rt);Ut(Ht.x,Ht.y,-pt),Z===0&&it.push(Ht)}for(let mt=0,qt=B;mt<qt;mt++){const Ht=P[mt];ft=ot[mt];const R=[];for(let w=0,H=Ht.length;w<H;w++){const Y=F(Ht[w],ft[w],rt);Ut(Y.x,Y.y,-pt),Z===0&&R.push(Y)}Z===0&&Q.push(R)}}Xt=Ki.triangulateShape(it,Q)}const Zt=Xt.length,Jt=p+v;for(let it=0;it<q;it++){const Q=d?F(M[it],st[it],Jt):M[it];y?(A.copy(b.normals[0]).multiplyScalar(Q.x),C.copy(b.binormals[0]).multiplyScalar(Q.y),I.copy(x[0]).add(A).add(C),Ut(I.x,I.y,I.z)):Ut(Q.x,Q.y,0)}for(let it=1;it<=h;it++)for(let Q=0;Q<q;Q++){const J=d?F(M[Q],st[Q],Jt):M[Q];y?(A.copy(b.normals[it]).multiplyScalar(J.x),C.copy(b.binormals[it]).multiplyScalar(J.y),I.copy(x[it]).add(A).add(C),Ut(I.x,I.y,I.z)):Ut(J.x,J.y,u/h*it)}for(let it=g-1;it>=0;it--){const Q=it/g,J=f*Math.cos(Q*Math.PI/2),Z=p*Math.sin(Q*Math.PI/2)+v;for(let pt=0,rt=U.length;pt<rt;pt++){const mt=F(U[pt],K[pt],Z);Ut(mt.x,mt.y,u+J)}for(let pt=0,rt=P.length;pt<rt;pt++){const mt=P[pt];ft=ot[pt];for(let qt=0,Ht=mt.length;qt<Ht;qt++){const R=F(mt[qt],ft[qt],Z);y?Ut(R.x,R.y+x[h-1].y,x[h-1].x+J):Ut(R.x,R.y,u+J)}}}$(),et();function $(){const it=i.length/3;if(d){let Q=0,J=q*Q;for(let Z=0;Z<Zt;Z++){const pt=Xt[Z];Pt(pt[2]+J,pt[1]+J,pt[0]+J)}Q=h+g*2,J=q*Q;for(let Z=0;Z<Zt;Z++){const pt=Xt[Z];Pt(pt[0]+J,pt[1]+J,pt[2]+J)}}else{for(let Q=0;Q<Zt;Q++){const J=Xt[Q];Pt(J[2],J[1],J[0])}for(let Q=0;Q<Zt;Q++){const J=Xt[Q];Pt(J[0]+q*h,J[1]+q*h,J[2]+q*h)}}n.addGroup(it,i.length/3-it,0)}function et(){const it=i.length/3;let Q=0;bt(U,Q),Q+=U.length;for(let J=0,Z=P.length;J<Z;J++){const pt=P[J];bt(pt,Q),Q+=pt.length}n.addGroup(it,i.length/3-it,1)}function bt(it,Q){let J=it.length;for(;--J>=0;){const Z=J;let pt=J-1;pt<0&&(pt=it.length-1);for(let rt=0,mt=h+g*2;rt<mt;rt++){const qt=q*rt,Ht=q*(rt+1),R=Q+Z+qt,w=Q+pt+qt,H=Q+pt+Ht,Y=Q+Z+Ht;ie(R,w,H,Y)}}}function Ut(it,Q,J){c.push(it),c.push(Q),c.push(J)}function Pt(it,Q,J){pe(it),pe(Q),pe(J);const Z=i.length/3,pt=_.generateTopUV(n,i,Z-3,Z-2,Z-1);N(pt[0]),N(pt[1]),N(pt[2])}function ie(it,Q,J,Z){pe(it),pe(Q),pe(Z),pe(Q),pe(J),pe(Z);const pt=i.length/3,rt=_.generateSideWallUV(n,i,pt-6,pt-3,pt-2,pt-1);N(rt[0]),N(rt[1]),N(rt[3]),N(rt[1]),N(rt[2]),N(rt[3])}function pe(it){i.push(c[it*3+0]),i.push(c[it*3+1]),i.push(c[it*3+2])}function N(it){s.push(it.x),s.push(it.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Ff(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ba[i.type]().fromJSON(i)),new Qa(n,t.options)}}const Nf={generateTopUV:function(r,t,e,n,i){const s=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new vt(s,o),new vt(a,c),new vt(l,h)]},generateSideWallUV:function(r,t,e,n,i,s){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],p=t[i*3+2],v=t[s*3],g=t[s*3+1],m=t[s*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new vt(o,1-c),new vt(l,1-u),new vt(d,1-p),new vt(v,1-m)]:[new vt(a,1-c),new vt(h,1-u),new vt(f,1-p),new vt(g,1-m)]}};function Ff(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ri extends Be{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,d=e/c,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const _=m*d-o;for(let x=0;x<l;x++){const y=x*u-s;p.push(y,-_,0),v.push(0,0,1),g.push(x/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let _=0;_<a;_++){const x=_+l*m,y=_+l*(m+1),b=_+1+l*(m+1),C=_+1+l*m;f.push(x,y,C),f.push(y,b,C)}this.setIndex(f),this.setAttribute("position",new de(p,3)),this.setAttribute("normal",new de(v,3)),this.setAttribute("uv",new de(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ri(t.width,t.height,t.widthSegments,t.heightSegments)}}class tc extends Be{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/i,f=new L,p=new vt;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const m=s+g/n*o;f.x=u*Math.cos(m),f.y=u*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}u+=d}for(let v=0;v<i;v++){const g=v*(n+1);for(let m=0;m<n;m++){const _=m+g,x=_,y=_+n+1,b=_+n+2,C=_+1;a.push(x,y,C),a.push(y,b,C)}}this.setIndex(a),this.setAttribute("position",new de(c,3)),this.setAttribute("normal",new de(l,3)),this.setAttribute("uv",new de(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ge extends Be{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new L,d=new L,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const _=[],x=m/n;let y=0;m===0&&o===0?y=.5/e:m===n&&c===Math.PI&&(y=-.5/e);for(let b=0;b<=e;b++){const C=b/e;u.x=-t*Math.cos(i+C*s)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(i+C*s)*Math.sin(o+x*a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(C+y,1-x),_.push(l++)}h.push(_)}for(let m=0;m<n;m++)for(let _=0;_<e;_++){const x=h[m][_+1],y=h[m][_],b=h[m+1][_],C=h[m+1][_+1];(m!==0||o>0)&&f.push(x,y,C),(m!==n-1||c<Math.PI)&&f.push(y,b,C)}this.setIndex(f),this.setAttribute("position",new de(p,3)),this.setAttribute("normal",new de(v,3)),this.setAttribute("uv",new de(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ge(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Bs extends Be{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new L,u=new L,d=new L;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const v=p/i*s,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(v),u.y=(t+e*Math.cos(g))*Math.sin(v),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const v=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,_=(i+1)*f+p;o.push(v,g,_),o.push(g,m,_)}this.setIndex(o),this.setAttribute("position",new de(a,3)),this.setAttribute("normal",new de(c,3)),this.setAttribute("uv",new de(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bs(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ne extends ai{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ph,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Uf extends ai{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ju,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Of extends ai{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Mo={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Bf{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],p=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const zf=new Bf;class ec{constructor(t){this.manager=t!==void 0?t:zf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}ec.DEFAULT_MATERIAL_NAME="__DEFAULT";const Wi=new WeakMap;class kf extends ec{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Mo.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0);else{let u=Wi.get(o);u===void 0&&(u=[],Wi.set(o,u)),u.push({onLoad:e,onError:i})}return o}const a=Ds("img");function c(){h(),e&&e(this);const u=Wi.get(this)||[];for(let d=0;d<u.length;d++){const f=u[d];f.onLoad&&f.onLoad(this)}Wi.delete(this),s.manager.itemEnd(t)}function l(u){h(),i&&i(u),Mo.remove(`image:${t}`);const d=Wi.get(this)||[];for(let f=0;f<d.length;f++){const p=d[f];p.onError&&p.onError(u)}Wi.delete(this),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Mo.add(`image:${t}`,a),s.manager.itemStart(t),a.src=t,a}}class Vf extends ec{constructor(t){super(t)}load(t,e,n,i){const s=new Ya;s.colorSpace=nn;const o=new kf(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function c(l){o.load(t[l],function(h){s.images[l]=h,a++,a===6&&(s.needsUpdate=!0,e&&e(s))},void 0,i)}for(let l=0;l<t.length;++l)c(l);return s}}class Uh extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const wo=new _e,nl=new L,il=new L;class Gf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new _e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ja,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new Ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;nl.setFromMatrixPosition(t.matrixWorld),e.position.copy(nl),il.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(il),e.updateMatrixWorld(),wo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wo,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Oh extends wh{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Hf extends Gf{constructor(){super(new Oh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wf extends Uh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new Hf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Xf extends Uh{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class qf extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const sl=new _e;class Yf{constructor(t,e,n=0,i=1/0){this.ray=new kr(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new qa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return sl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(sl),this}intersectObject(t,e=!0,n=[]){return Aa(t,this,n,e),n.sort(rl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)Aa(t[i],this,n,e);return n.sort(rl),n}}function rl(r,t){return r.distance-t.distance}function Aa(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,a=s.length;o<a;o++)Aa(s[o],t,e,!0)}}function ol(r,t,e,n){const i=jf(n);switch(e){case hh:return r*t;case dh:return r*t/i.components*i.byteLength;case Va:return r*t/i.components*i.byteLength;case fh:return r*t*2/i.components*i.byteLength;case Ga:return r*t*2/i.components*i.byteLength;case uh:return r*t*3/i.components*i.byteLength;case _n:return r*t*4/i.components*i.byteLength;case Ha:return r*t*4/i.components*i.byteLength;case Ar:case Rr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Pr:case Lr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Zo:case Qo:return Math.max(r,16)*Math.max(t,8)/4;case Ko:case Jo:return Math.max(r,8)*Math.max(t,8)/2;case ta:case ea:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case na:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ia:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case sa:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case ra:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case oa:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case aa:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case ca:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case la:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case ha:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case ua:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case da:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case fa:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case pa:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case ma:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ga:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case va:case _a:case ya:return Math.ceil(r/4)*Math.ceil(t/4)*16;case xa:case Ma:return Math.ceil(r/4)*Math.ceil(t/4)*8;case wa:case Sa:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function jf(r){switch(r){case Dn:case oh:return{byteLength:1,components:1};case As:case ah:case ks:return{byteLength:2,components:1};case za:case ka:return{byteLength:2,components:4};case bi:case Ba:case qn:return{byteLength:4,components:1};case ch:case lh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Oa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Oa);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Bh(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function $f(r){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=r.createBuffer();r.bindBuffer(c,d),r.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=r.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=r.SHORT;else if(l instanceof Uint32Array)f=r.UNSIGNED_INT;else if(l instanceof Int32Array)f=r.INT;else if(l instanceof Int8Array)f=r.BYTE;else if(l instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(r.bindBuffer(l,a),u.length===0)r.bufferSubData(l,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){const p=u[d],v=u[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){const v=u[f];r.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(r.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}var Kf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ep=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,np=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ip=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,rp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,op=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ap=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,hp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_p=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,yp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Mp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ap=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Rp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Lp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ip=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Np=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Up=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Op=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Bp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Gp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Xp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$p=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Kp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,em=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,im=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,om=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,am=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,um=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_m=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ym=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Em=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,bm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Am=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Im=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Dm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Nm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Fm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Um=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Om=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Bm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,zm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,km=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $m=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Km=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ng=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ig=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,sg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,rg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,og=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ag=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,hg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ug=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,pg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,vg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_g=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Eg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Cg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ag=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qt={alphahash_fragment:Kf,alphahash_pars_fragment:Zf,alphamap_fragment:Jf,alphamap_pars_fragment:Qf,alphatest_fragment:tp,alphatest_pars_fragment:ep,aomap_fragment:np,aomap_pars_fragment:ip,batching_pars_vertex:sp,batching_vertex:rp,begin_vertex:op,beginnormal_vertex:ap,bsdfs:cp,iridescence_fragment:lp,bumpmap_pars_fragment:hp,clipping_planes_fragment:up,clipping_planes_pars_fragment:dp,clipping_planes_pars_vertex:fp,clipping_planes_vertex:pp,color_fragment:mp,color_pars_fragment:gp,color_pars_vertex:vp,color_vertex:_p,common:yp,cube_uv_reflection_fragment:xp,defaultnormal_vertex:Mp,displacementmap_pars_vertex:wp,displacementmap_vertex:Sp,emissivemap_fragment:Ep,emissivemap_pars_fragment:bp,colorspace_fragment:Tp,colorspace_pars_fragment:Cp,envmap_fragment:Ap,envmap_common_pars_fragment:Rp,envmap_pars_fragment:Pp,envmap_pars_vertex:Lp,envmap_physical_pars_fragment:Gp,envmap_vertex:Ip,fog_vertex:Dp,fog_pars_vertex:Np,fog_fragment:Fp,fog_pars_fragment:Up,gradientmap_pars_fragment:Op,lightmap_pars_fragment:Bp,lights_lambert_fragment:zp,lights_lambert_pars_fragment:kp,lights_pars_begin:Vp,lights_toon_fragment:Hp,lights_toon_pars_fragment:Wp,lights_phong_fragment:Xp,lights_phong_pars_fragment:qp,lights_physical_fragment:Yp,lights_physical_pars_fragment:jp,lights_fragment_begin:$p,lights_fragment_maps:Kp,lights_fragment_end:Zp,logdepthbuf_fragment:Jp,logdepthbuf_pars_fragment:Qp,logdepthbuf_pars_vertex:tm,logdepthbuf_vertex:em,map_fragment:nm,map_pars_fragment:im,map_particle_fragment:sm,map_particle_pars_fragment:rm,metalnessmap_fragment:om,metalnessmap_pars_fragment:am,morphinstance_vertex:cm,morphcolor_vertex:lm,morphnormal_vertex:hm,morphtarget_pars_vertex:um,morphtarget_vertex:dm,normal_fragment_begin:fm,normal_fragment_maps:pm,normal_pars_fragment:mm,normal_pars_vertex:gm,normal_vertex:vm,normalmap_pars_fragment:_m,clearcoat_normal_fragment_begin:ym,clearcoat_normal_fragment_maps:xm,clearcoat_pars_fragment:Mm,iridescence_pars_fragment:wm,opaque_fragment:Sm,packing:Em,premultiplied_alpha_fragment:bm,project_vertex:Tm,dithering_fragment:Cm,dithering_pars_fragment:Am,roughnessmap_fragment:Rm,roughnessmap_pars_fragment:Pm,shadowmap_pars_fragment:Lm,shadowmap_pars_vertex:Im,shadowmap_vertex:Dm,shadowmask_pars_fragment:Nm,skinbase_vertex:Fm,skinning_pars_vertex:Um,skinning_vertex:Om,skinnormal_vertex:Bm,specularmap_fragment:zm,specularmap_pars_fragment:km,tonemapping_fragment:Vm,tonemapping_pars_fragment:Gm,transmission_fragment:Hm,transmission_pars_fragment:Wm,uv_pars_fragment:Xm,uv_pars_vertex:qm,uv_vertex:Ym,worldpos_vertex:jm,background_vert:$m,background_frag:Km,backgroundCube_vert:Zm,backgroundCube_frag:Jm,cube_vert:Qm,cube_frag:tg,depth_vert:eg,depth_frag:ng,distanceRGBA_vert:ig,distanceRGBA_frag:sg,equirect_vert:rg,equirect_frag:og,linedashed_vert:ag,linedashed_frag:cg,meshbasic_vert:lg,meshbasic_frag:hg,meshlambert_vert:ug,meshlambert_frag:dg,meshmatcap_vert:fg,meshmatcap_frag:pg,meshnormal_vert:mg,meshnormal_frag:gg,meshphong_vert:vg,meshphong_frag:_g,meshphysical_vert:yg,meshphysical_frag:xg,meshtoon_vert:Mg,meshtoon_frag:wg,points_vert:Sg,points_frag:Eg,shadow_vert:bg,shadow_frag:Tg,sprite_vert:Cg,sprite_frag:Ag},_t={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},envMapRotation:{value:new Kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Rn={basic:{uniforms:Xe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:Xe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new ee(0)}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:Xe([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:Xe([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:Xe([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new ee(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:Xe([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:Xe([_t.points,_t.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:Xe([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:Xe([_t.common,_t.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:Xe([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:Xe([_t.sprite,_t.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Kt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distanceRGBA:{uniforms:Xe([_t.common,_t.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distanceRGBA_vert,fragmentShader:Qt.distanceRGBA_frag},shadow:{uniforms:Xe([_t.lights,_t.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};Rn.physical={uniforms:Xe([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};const gr={r:0,b:0,g:0},pi=new dn,Rg=new _e;function Pg(r,t,e,n,i,s,o){const a=new ee(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function p(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?e:t).get(y)),y}function v(x){let y=!1;const b=p(x);b===null?m(a,c):b&&b.isColor&&(m(b,1),y=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(x,y){const b=p(y);b&&(b.isCubeTexture||b.mapping===zr)?(h===void 0&&(h=new xt(new rn(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:os(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),pi.copy(y.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Rg.makeRotationFromEuler(pi)),h.material.toneMapped=ae.getTransfer(b.colorSpace)!==ue,(u!==b||d!==b.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=b,d=b.version,f=r.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new xt(new Ri(2,2),new $n({name:"BackgroundMaterial",uniforms:os(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=ae.getTransfer(b.colorSpace)!==ue,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=b,d=b.version,f=r.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,y){x.getRGB(gr,Mh(r)),n.buffers.color.setClear(gr.r,gr.g,gr.b,y,o)}function _(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),c=y,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,m(a,c)},render:v,addToRenderList:g,dispose:_}}function Lg(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,o=!1;function a(M,P,O,D,B){let U=!1;const F=u(D,O,P);s!==F&&(s=F,l(s.object)),U=f(M,D,O,B),U&&p(M,D,O,B),B!==null&&t.update(B,r.ELEMENT_ARRAY_BUFFER),(U||o)&&(o=!1,y(M,P,O,D),B!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return r.createVertexArray()}function l(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,P,O){const D=O.wireframe===!0;let B=n[M.id];B===void 0&&(B={},n[M.id]=B);let U=B[P.id];U===void 0&&(U={},B[P.id]=U);let F=U[D];return F===void 0&&(F=d(c()),U[D]=F),F}function d(M){const P=[],O=[],D=[];for(let B=0;B<e;B++)P[B]=0,O[B]=0,D[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:D,object:M,attributes:{},index:null}}function f(M,P,O,D){const B=s.attributes,U=P.attributes;let F=0;const q=O.getAttributes();for(const k in q)if(q[k].location>=0){const ot=B[k];let ft=U[k];if(ft===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(ft=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(ft=M.instanceColor)),ot===void 0||ot.attribute!==ft||ft&&ot.data!==ft.data)return!0;F++}return s.attributesNum!==F||s.index!==D}function p(M,P,O,D){const B={},U=P.attributes;let F=0;const q=O.getAttributes();for(const k in q)if(q[k].location>=0){let ot=U[k];ot===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(ot=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(ot=M.instanceColor));const ft={};ft.attribute=ot,ot&&ot.data&&(ft.data=ot.data),B[k]=ft,F++}s.attributes=B,s.attributesNum=F,s.index=D}function v(){const M=s.newAttributes;for(let P=0,O=M.length;P<O;P++)M[P]=0}function g(M){m(M,0)}function m(M,P){const O=s.newAttributes,D=s.enabledAttributes,B=s.attributeDivisors;O[M]=1,D[M]===0&&(r.enableVertexAttribArray(M),D[M]=1),B[M]!==P&&(r.vertexAttribDivisor(M,P),B[M]=P)}function _(){const M=s.newAttributes,P=s.enabledAttributes;for(let O=0,D=P.length;O<D;O++)P[O]!==M[O]&&(r.disableVertexAttribArray(O),P[O]=0)}function x(M,P,O,D,B,U,F){F===!0?r.vertexAttribIPointer(M,P,O,B,U):r.vertexAttribPointer(M,P,O,D,B,U)}function y(M,P,O,D){v();const B=D.attributes,U=O.getAttributes(),F=P.defaultAttributeValues;for(const q in U){const k=U[q];if(k.location>=0){let K=B[q];if(K===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(K=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(K=M.instanceColor)),K!==void 0){const ot=K.normalized,ft=K.itemSize,st=t.get(K);if(st===void 0)continue;const Xt=st.buffer,Zt=st.type,Jt=st.bytesPerElement,$=Zt===r.INT||Zt===r.UNSIGNED_INT||K.gpuType===Ba;if(K.isInterleavedBufferAttribute){const et=K.data,bt=et.stride,Ut=K.offset;if(et.isInstancedInterleavedBuffer){for(let Pt=0;Pt<k.locationSize;Pt++)m(k.location+Pt,et.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Pt=0;Pt<k.locationSize;Pt++)g(k.location+Pt);r.bindBuffer(r.ARRAY_BUFFER,Xt);for(let Pt=0;Pt<k.locationSize;Pt++)x(k.location+Pt,ft/k.locationSize,Zt,ot,bt*Jt,(Ut+ft/k.locationSize*Pt)*Jt,$)}else{if(K.isInstancedBufferAttribute){for(let et=0;et<k.locationSize;et++)m(k.location+et,K.meshPerAttribute);M.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let et=0;et<k.locationSize;et++)g(k.location+et);r.bindBuffer(r.ARRAY_BUFFER,Xt);for(let et=0;et<k.locationSize;et++)x(k.location+et,ft/k.locationSize,Zt,ot,ft*Jt,ft/k.locationSize*et*Jt,$)}}else if(F!==void 0){const ot=F[q];if(ot!==void 0)switch(ot.length){case 2:r.vertexAttrib2fv(k.location,ot);break;case 3:r.vertexAttrib3fv(k.location,ot);break;case 4:r.vertexAttrib4fv(k.location,ot);break;default:r.vertexAttrib1fv(k.location,ot)}}}}_()}function b(){I();for(const M in n){const P=n[M];for(const O in P){const D=P[O];for(const B in D)h(D[B].object),delete D[B];delete P[O]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;const P=n[M.id];for(const O in P){const D=P[O];for(const B in D)h(D[B].object),delete D[B];delete P[O]}delete n[M.id]}function A(M){for(const P in n){const O=n[P];if(O[M.id]===void 0)continue;const D=O[M.id];for(const B in D)h(D[B].object),delete D[B];delete O[M.id]}}function I(){S(),o=!0,s!==i&&(s=i,l(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:b,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:g,disableUnusedAttributes:_}}function Ig(r,t,e){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(r.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let p=0;p<u;p++)f+=h[p];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<l.length;p++)o(l[p],h[p],d[p]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let p=0;for(let v=0;v<u;v++)p+=h[v]*d[v];e.update(p,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Dg(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==_n&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const I=A===ks&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Dn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==qn&&!I)}function c(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),_=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),b=p>0,C=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:b,maxSamples:C}}function Ng(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new _i,a=new Kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,m=r.get(u);if(!i||p===null||p.length===0||s&&!g)s?h(null):l();else{const _=s?0:n,x=_*4;let y=m.clippingState||null;c.value=y,y=h(p,d,x,f);for(let b=0;b!==x;++b)y[b]=e[b];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,p){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=c.value,p!==!0||g===null){const m=f+v*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,y=f;x!==v;++x,y+=4)o.copy(u[x]).applyMatrix4(_,a),o.normal.toArray(g,y),g[y+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function Fg(r){let t=new WeakMap;function e(o,a){return a===Yo?o.mapping=is:a===jo&&(o.mapping=ss),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Yo||a===jo)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new jd(c.height);return l.fromEquirectangularTexture(r,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}const Zi=4,al=[.125,.215,.35,.446,.526,.582],Mi=20,So=new Oh,cl=new ee;let Eo=null,bo=0,To=0,Co=!1;const yi=(1+Math.sqrt(5))/2,Xi=1/yi,ll=[new L(-yi,Xi,0),new L(yi,Xi,0),new L(-Xi,0,yi),new L(Xi,0,yi),new L(0,yi,-Xi),new L(0,yi,Xi),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Ug=new L;class hl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,s={}){const{size:o=256,position:a=Ug}=s;Eo=this._renderer.getRenderTarget(),bo=this._renderer.getActiveCubeFace(),To=this._renderer.getActiveMipmapLevel(),Co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Eo,bo,To),this._renderer.xr.enabled=Co,t.scissorTest=!1,vr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===is||t.mapping===ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Eo=this._renderer.getRenderTarget(),bo=this._renderer.getActiveCubeFace(),To=this._renderer.getActiveMipmapLevel(),Co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:ks,format:_n,colorSpace:rs,depthBuffer:!1},i=ul(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ul(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Og(s)),this._blurMaterial=Bg(s,t,e)}return i}_compileMaterial(t){const e=new xt(this._lodPlanes[0],t);this._renderer.compile(e,So)}_sceneToCubeUV(t,e,n,i,s){const c=new hn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(cl),u.toneMapping=ri,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));const v=new jn({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),g=new xt(new rn,v);let m=!1;const _=t.background;_?_.isColor&&(v.color.copy(_),t.background=null,m=!0):(v.color.copy(cl),m=!0);for(let x=0;x<6;x++){const y=x%3;y===0?(c.up.set(0,l[x],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[x],s.y,s.z)):y===1?(c.up.set(0,0,l[x]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[x],s.z)):(c.up.set(0,l[x],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[x]));const b=this._cubeSize;vr(i,y*b,x>2?b:0,b,b),u.setRenderTarget(i),m&&u.render(g,c),u.render(t,c)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=_}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===is||t.mapping===ss;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dl());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new xt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;vr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,So)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=ll[(i-s-1)%ll.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new xt(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Mi-1),v=s/p,g=isFinite(s)?1+Math.floor(h*v):Mi;g>Mi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Mi}`);const m=[];let _=0;for(let A=0;A<Mi;++A){const I=A/v,S=Math.exp(-I*I/2);m.push(S),A===0?_+=S:A<g&&(_+=2*S)}for(let A=0;A<m.length;A++)m[A]=m[A]/_;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=p,d.mipInt.value=x-n;const y=this._sizeLods[i],b=3*y*(i>x-Zi?i-x+Zi:0),C=4*(this._cubeSize-y);vr(e,b,C,3*y,2*y),c.setRenderTarget(e),c.render(u,So)}}function Og(r){const t=[],e=[],n=[];let i=r;const s=r-Zi+1+al.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>r-Zi?c=al[o-r+Zi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,v=3,g=2,m=1,_=new Float32Array(v*p*f),x=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let C=0;C<f;C++){const A=C%3*2/3-1,I=C>2?0:-1,S=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];_.set(S,v*p*C),x.set(d,g*p*C);const M=[C,C,C,C,C,C];y.set(M,m*p*C)}const b=new Be;b.setAttribute("position",new In(_,v)),b.setAttribute("uv",new In(x,g)),b.setAttribute("faceIndex",new In(y,m)),t.push(b),i>Zi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ul(r,t,e){const n=new Ti(r,t,e);return n.texture.mapping=zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function vr(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Bg(r,t,e){const n=new Float32Array(Mi),i=new L(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:Mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function dl(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function fl(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function nc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function zg(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Yo||c===jo,h=c===is||c===ss;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new hl(r)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new hl(r)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function kg(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Ns("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Vg(r,t,e,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const p in d.attributes)t.remove(d.attributes[p]);d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)t.update(d[f],r.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,p=u.attributes.position;let v=0;if(f!==null){const _=f.array;v=f.version;for(let x=0,y=_.length;x<y;x+=3){const b=_[x+0],C=_[x+1],A=_[x+2];d.push(b,C,C,A,A,b)}}else if(p!==void 0){const _=p.array;v=p.version;for(let x=0,y=_.length/3-1;x<y;x+=3){const b=x+0,C=x+1,A=x+2;d.push(b,C,C,A,A,b)}}else return;const g=new(gh(d)?xh:yh)(d,1);g.version=v;const m=s.get(u);m&&t.remove(m),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Gg(r,t,e){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,f){r.drawElements(n,f,s,d*o),e.update(f,n,1)}function l(d,f,p){p!==0&&(r.drawElementsInstanced(n,f,s,d*o,p),e.update(f,n,p))}function h(d,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];e.update(g,n,1)}function u(d,f,p,v){if(p===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<d.length;m++)l(d[m]/o,f[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,v,0,p);let m=0;for(let _=0;_<p;_++)m+=f[_]*v[_];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Hg(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Wg(r,t,e){const n=new WeakMap,i=new Ee;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const p=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;p===!0&&(y=1),v===!0&&(y=2),g===!0&&(y=3);let b=a.attributes.position.count*y,C=1;b>t.maxTextureSize&&(C=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const A=new Float32Array(b*C*4*u),I=new vh(A,b,C,u);I.type=qn,I.needsUpdate=!0;const S=y*4;for(let P=0;P<u;P++){const O=m[P],D=_[P],B=x[P],U=b*C*4*P;for(let F=0;F<O.count;F++){const q=F*S;p===!0&&(i.fromBufferAttribute(O,F),A[U+q+0]=i.x,A[U+q+1]=i.y,A[U+q+2]=i.z,A[U+q+3]=0),v===!0&&(i.fromBufferAttribute(D,F),A[U+q+4]=i.x,A[U+q+5]=i.y,A[U+q+6]=i.z,A[U+q+7]=0),g===!0&&(i.fromBufferAttribute(B,F),A[U+q+8]=i.x,A[U+q+9]=i.y,A[U+q+10]=i.z,A[U+q+11]=B.itemSize===4?i.w:1)}}d={count:u,texture:I,size:new vt(b,C)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let p=0;for(let g=0;g<l.length;g++)p+=l[g];const v=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(r,"morphTargetBaseInfluence",v),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Xg(r,t,e,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}const zh=new je,pl=new bh(1,1),kh=new vh,Vh=new Ld,Gh=new Ya,ml=[],gl=[],vl=new Float32Array(16),_l=new Float32Array(9),yl=new Float32Array(4);function hs(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=ml[i];if(s===void 0&&(s=new Float32Array(i),ml[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function Le(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ie(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Vr(r,t){let e=gl[t];e===void 0&&(e=new Int32Array(t),gl[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function qg(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Yg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;r.uniform2fv(this.addr,t),Ie(e,t)}}function jg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;r.uniform3fv(this.addr,t),Ie(e,t)}}function $g(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;r.uniform4fv(this.addr,t),Ie(e,t)}}function Kg(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,n))return;yl.set(n),r.uniformMatrix2fv(this.addr,!1,yl),Ie(e,n)}}function Zg(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,n))return;_l.set(n),r.uniformMatrix3fv(this.addr,!1,_l),Ie(e,n)}}function Jg(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Le(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(Le(e,n))return;vl.set(n),r.uniformMatrix4fv(this.addr,!1,vl),Ie(e,n)}}function Qg(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function t0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;r.uniform2iv(this.addr,t),Ie(e,t)}}function e0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;r.uniform3iv(this.addr,t),Ie(e,t)}}function n0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;r.uniform4iv(this.addr,t),Ie(e,t)}}function i0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function s0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;r.uniform2uiv(this.addr,t),Ie(e,t)}}function r0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;r.uniform3uiv(this.addr,t),Ie(e,t)}}function o0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;r.uniform4uiv(this.addr,t),Ie(e,t)}}function a0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(pl.compareFunction=mh,s=pl):s=zh,e.setTexture2D(t||s,i)}function c0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Vh,i)}function l0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Gh,i)}function h0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||kh,i)}function u0(r){switch(r){case 5126:return qg;case 35664:return Yg;case 35665:return jg;case 35666:return $g;case 35674:return Kg;case 35675:return Zg;case 35676:return Jg;case 5124:case 35670:return Qg;case 35667:case 35671:return t0;case 35668:case 35672:return e0;case 35669:case 35673:return n0;case 5125:return i0;case 36294:return s0;case 36295:return r0;case 36296:return o0;case 35678:case 36198:case 36298:case 36306:case 35682:return a0;case 35679:case 36299:case 36307:return c0;case 35680:case 36300:case 36308:case 36293:return l0;case 36289:case 36303:case 36311:case 36292:return h0}}function d0(r,t){r.uniform1fv(this.addr,t)}function f0(r,t){const e=hs(t,this.size,2);r.uniform2fv(this.addr,e)}function p0(r,t){const e=hs(t,this.size,3);r.uniform3fv(this.addr,e)}function m0(r,t){const e=hs(t,this.size,4);r.uniform4fv(this.addr,e)}function g0(r,t){const e=hs(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function v0(r,t){const e=hs(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function _0(r,t){const e=hs(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function y0(r,t){r.uniform1iv(this.addr,t)}function x0(r,t){r.uniform2iv(this.addr,t)}function M0(r,t){r.uniform3iv(this.addr,t)}function w0(r,t){r.uniform4iv(this.addr,t)}function S0(r,t){r.uniform1uiv(this.addr,t)}function E0(r,t){r.uniform2uiv(this.addr,t)}function b0(r,t){r.uniform3uiv(this.addr,t)}function T0(r,t){r.uniform4uiv(this.addr,t)}function C0(r,t,e){const n=this.cache,i=t.length,s=Vr(e,i);Le(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||zh,s[o])}function A0(r,t,e){const n=this.cache,i=t.length,s=Vr(e,i);Le(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Vh,s[o])}function R0(r,t,e){const n=this.cache,i=t.length,s=Vr(e,i);Le(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Gh,s[o])}function P0(r,t,e){const n=this.cache,i=t.length,s=Vr(e,i);Le(n,s)||(r.uniform1iv(this.addr,s),Ie(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||kh,s[o])}function L0(r){switch(r){case 5126:return d0;case 35664:return f0;case 35665:return p0;case 35666:return m0;case 35674:return g0;case 35675:return v0;case 35676:return _0;case 5124:case 35670:return y0;case 35667:case 35671:return x0;case 35668:case 35672:return M0;case 35669:case 35673:return w0;case 5125:return S0;case 36294:return E0;case 36295:return b0;case 36296:return T0;case 35678:case 36198:case 36298:case 36306:case 35682:return C0;case 35679:case 36299:case 36307:return A0;case 35680:case 36300:case 36308:case 36293:return R0;case 36289:case 36303:case 36311:case 36292:return P0}}class I0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=u0(e.type)}}class D0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=L0(e.type)}}class N0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const Ao=/(\w+)(\])?(\[|\.)?/g;function xl(r,t){r.seq.push(t),r.map[t.id]=t}function F0(r,t,e){const n=r.name,i=n.length;for(Ao.lastIndex=0;;){const s=Ao.exec(n),o=Ao.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){xl(e,l===void 0?new I0(a,r,t):new D0(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new N0(a),xl(e,u)),e=u}}}class Ir{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);F0(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Ml(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const U0=37297;let O0=0;function B0(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const wl=new Kt;function z0(r){ae._getMatrix(wl,ae.workingColorSpace,r);const t=`mat3( ${wl.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(r)){case Dr:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Sl(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+B0(r.getShaderSource(t),a)}else return s}function k0(r,t){const e=z0(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function V0(r,t){let e;switch(t){case Wu:e="Linear";break;case Xu:e="Reinhard";break;case qu:e="Cineon";break;case Yu:e="ACESFilmic";break;case $u:e="AgX";break;case Ku:e="Neutral";break;case ju:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _r=new L;function G0(){ae.getLuminanceCoefficients(_r);const r=_r.x.toFixed(4),t=_r.y.toFixed(4),e=_r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function H0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ws).join(`
`)}function W0(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function X0(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function ws(r){return r!==""}function El(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bl(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const q0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ra(r){return r.replace(q0,j0)}const Y0=new Map;function j0(r,t){let e=Qt[t];if(e===void 0){const n=Y0.get(t);if(n!==void 0)e=Qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ra(e)}const $0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tl(r){return r.replace($0,K0)}function K0(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Cl(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Z0(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===ih?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Su?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Xn&&(t="SHADOWMAP_TYPE_VSM"),t}function J0(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case is:case ss:t="ENVMAP_TYPE_CUBE";break;case zr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Q0(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ss:t="ENVMAP_MODE_REFRACTION";break}return t}function tv(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case sh:t="ENVMAP_BLENDING_MULTIPLY";break;case Gu:t="ENVMAP_BLENDING_MIX";break;case Hu:t="ENVMAP_BLENDING_ADD";break}return t}function ev(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function nv(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Z0(e),l=J0(e),h=Q0(e),u=tv(e),d=ev(e),f=H0(e),p=W0(s),v=i.createProgram();let g,m,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ws).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ws).join(`
`),m.length>0&&(m+=`
`)):(g=[Cl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),m=[Cl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?Qt.tonemapping_pars_fragment:"",e.toneMapping!==ri?V0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,k0("linearToOutputTexel",e.outputColorSpace),G0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ws).join(`
`)),o=Ra(o),o=El(o,e),o=bl(o,e),a=Ra(a),a=El(a,e),a=bl(a,e),o=Tl(o),a=Tl(a),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Cc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Cc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=_+g+o,y=_+m+a,b=Ml(i,i.VERTEX_SHADER,x),C=Ml(i,i.FRAGMENT_SHADER,y);i.attachShader(v,b),i.attachShader(v,C),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function A(P){if(r.debug.checkShaderErrors){const O=i.getProgramInfoLog(v)||"",D=i.getShaderInfoLog(b)||"",B=i.getShaderInfoLog(C)||"",U=O.trim(),F=D.trim(),q=B.trim();let k=!0,K=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(k=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,b,C);else{const ot=Sl(i,b,"vertex"),ft=Sl(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+ot+`
`+ft)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(F===""||q==="")&&(K=!1);K&&(P.diagnostics={runnable:k,programLog:U,vertexShader:{log:F,prefix:g},fragmentShader:{log:q,prefix:m}})}i.deleteShader(b),i.deleteShader(C),I=new Ir(i,v),S=X0(i,v)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,U0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=O0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=C,this}let iv=0;class sv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new rv(t),e.set(t,n)),n}}class rv{constructor(t){this.id=iv++,this.code=t,this.usedTimes=0}}function ov(r,t,e,n,i,s,o){const a=new qa,c=new sv,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return l.add(S),S===0?"uv":`uv${S}`}function g(S,M,P,O,D){const B=O.fog,U=D.geometry,F=S.isMeshStandardMaterial?O.environment:null,q=(S.isMeshStandardMaterial?e:t).get(S.envMap||F),k=q&&q.mapping===zr?q.image.height:null,K=p[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const ot=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ft=ot!==void 0?ot.length:0;let st=0;U.morphAttributes.position!==void 0&&(st=1),U.morphAttributes.normal!==void 0&&(st=2),U.morphAttributes.color!==void 0&&(st=3);let Xt,Zt,Jt,$;if(K){const le=Rn[K];Xt=le.vertexShader,Zt=le.fragmentShader}else Xt=S.vertexShader,Zt=S.fragmentShader,c.update(S),Jt=c.getVertexShaderID(S),$=c.getFragmentShaderID(S);const et=r.getRenderTarget(),bt=r.state.buffers.depth.getReversed(),Ut=D.isInstancedMesh===!0,Pt=D.isBatchedMesh===!0,ie=!!S.map,pe=!!S.matcap,N=!!q,it=!!S.aoMap,Q=!!S.lightMap,J=!!S.bumpMap,Z=!!S.normalMap,pt=!!S.displacementMap,rt=!!S.emissiveMap,mt=!!S.metalnessMap,qt=!!S.roughnessMap,Ht=S.anisotropy>0,R=S.clearcoat>0,w=S.dispersion>0,H=S.iridescence>0,Y=S.sheen>0,nt=S.transmission>0,j=Ht&&!!S.anisotropyMap,Nt=R&&!!S.clearcoatMap,dt=R&&!!S.clearcoatNormalMap,Lt=R&&!!S.clearcoatRoughnessMap,It=H&&!!S.iridescenceMap,at=H&&!!S.iridescenceThicknessMap,wt=Y&&!!S.sheenColorMap,Vt=Y&&!!S.sheenRoughnessMap,Ft=!!S.specularMap,yt=!!S.specularColorMap,$t=!!S.specularIntensityMap,z=nt&&!!S.transmissionMap,ht=nt&&!!S.thicknessMap,gt=!!S.gradientMap,At=!!S.alphaMap,ct=S.alphaTest>0,tt=!!S.alphaHash,Dt=!!S.extensions;let Yt=ri;S.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(Yt=r.toneMapping);const me={shaderID:K,shaderType:S.type,shaderName:S.name,vertexShader:Xt,fragmentShader:Zt,defines:S.defines,customVertexShaderID:Jt,customFragmentShaderID:$,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Pt,batchingColor:Pt&&D._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&D.instanceColor!==null,instancingMorph:Ut&&D.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:et===null?r.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:rs,alphaToCoverage:!!S.alphaToCoverage,map:ie,matcap:pe,envMap:N,envMapMode:N&&q.mapping,envMapCubeUVHeight:k,aoMap:it,lightMap:Q,bumpMap:J,normalMap:Z,displacementMap:d&&pt,emissiveMap:rt,normalMapObjectSpace:Z&&S.normalMapType===td,normalMapTangentSpace:Z&&S.normalMapType===ph,metalnessMap:mt,roughnessMap:qt,anisotropy:Ht,anisotropyMap:j,clearcoat:R,clearcoatMap:Nt,clearcoatNormalMap:dt,clearcoatRoughnessMap:Lt,dispersion:w,iridescence:H,iridescenceMap:It,iridescenceThicknessMap:at,sheen:Y,sheenColorMap:wt,sheenRoughnessMap:Vt,specularMap:Ft,specularColorMap:yt,specularIntensityMap:$t,transmission:nt,transmissionMap:z,thicknessMap:ht,gradientMap:gt,opaque:S.transparent===!1&&S.blending===Qi&&S.alphaToCoverage===!1,alphaMap:At,alphaTest:ct,alphaHash:tt,combine:S.combine,mapUv:ie&&v(S.map.channel),aoMapUv:it&&v(S.aoMap.channel),lightMapUv:Q&&v(S.lightMap.channel),bumpMapUv:J&&v(S.bumpMap.channel),normalMapUv:Z&&v(S.normalMap.channel),displacementMapUv:pt&&v(S.displacementMap.channel),emissiveMapUv:rt&&v(S.emissiveMap.channel),metalnessMapUv:mt&&v(S.metalnessMap.channel),roughnessMapUv:qt&&v(S.roughnessMap.channel),anisotropyMapUv:j&&v(S.anisotropyMap.channel),clearcoatMapUv:Nt&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:dt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Lt&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:at&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&v(S.sheenRoughnessMap.channel),specularMapUv:Ft&&v(S.specularMap.channel),specularColorMapUv:yt&&v(S.specularColorMap.channel),specularIntensityMapUv:$t&&v(S.specularIntensityMap.channel),transmissionMapUv:z&&v(S.transmissionMap.channel),thicknessMapUv:ht&&v(S.thicknessMap.channel),alphaMapUv:At&&v(S.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Z||Ht),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!U.attributes.uv&&(ie||At),fog:!!B,useFog:S.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:bt,skinning:D.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:st,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:Yt,decodeVideoTexture:ie&&S.map.isVideoTexture===!0&&ae.getTransfer(S.map.colorSpace)===ue,decodeVideoTextureEmissive:rt&&S.emissiveMap.isVideoTexture===!0&&ae.getTransfer(S.emissiveMap.colorSpace)===ue,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===un,flipSided:S.side===Ye,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Dt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Dt&&S.extensions.multiDraw===!0||Pt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return me.vertexUv1s=l.has(1),me.vertexUv2s=l.has(2),me.vertexUv3s=l.has(3),l.clear(),me}function m(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)M.push(P),M.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(_(M,S),x(M,S),M.push(r.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function _(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function x(S,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),S.push(a.mask)}function y(S){const M=p[S.type];let P;if(M){const O=Rn[M];P=Wd.clone(O.uniforms)}else P=S.uniforms;return P}function b(S,M){let P;for(let O=0,D=h.length;O<D;O++){const B=h[O];if(B.cacheKey===M){P=B,++P.usedTimes;break}}return P===void 0&&(P=new nv(r,M,S,s),h.push(P)),P}function C(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function A(S){c.remove(S)}function I(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:b,releaseProgram:C,releaseShaderCache:A,programs:h,dispose:I}}function av(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,c){r.get(o)[a]=c}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function cv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Al(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Rl(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,p,v,g){let m=r[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:v,group:g},r[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=v,m.group=g),t++,m}function a(u,d,f,p,v,g){const m=o(u,d,f,p,v,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function c(u,d,f,p,v,g){const m=o(u,d,f,p,v,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function l(u,d){e.length>1&&e.sort(u||cv),n.length>1&&n.sort(d||Al),i.length>1&&i.sort(d||Al)}function h(){for(let u=t,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function lv(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new Rl,r.set(n,[o])):i>=s.length?(o=new Rl,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function hv(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new ee};break;case"SpotLight":e={position:new L,direction:new L,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new L,halfWidth:new L,halfHeight:new L};break}return r[t.id]=e,e}}}function uv(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let dv=0;function fv(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function pv(r){const t=new hv,e=uv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const i=new L,s=new _e,o=new _e;function a(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,_=0,x=0,y=0,b=0,C=0,A=0;l.sort(fv);for(let S=0,M=l.length;S<M;S++){const P=l[S],O=P.color,D=P.intensity,B=P.distance,U=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=O.r*D,u+=O.g*D,d+=O.b*D;else if(P.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(P.sh.coefficients[F],D);A++}else if(P.isDirectionalLight){const F=t.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const q=P.shadow,k=e.get(P);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,n.directionalShadow[f]=k,n.directionalShadowMap[f]=U,n.directionalShadowMatrix[f]=P.shadow.matrix,_++}n.directional[f]=F,f++}else if(P.isSpotLight){const F=t.get(P);F.position.setFromMatrixPosition(P.matrixWorld),F.color.copy(O).multiplyScalar(D),F.distance=B,F.coneCos=Math.cos(P.angle),F.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),F.decay=P.decay,n.spot[v]=F;const q=P.shadow;if(P.map&&(n.spotLightMap[b]=P.map,b++,q.updateMatrices(P),P.castShadow&&C++),n.spotLightMatrix[v]=q.matrix,P.castShadow){const k=e.get(P);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,n.spotShadow[v]=k,n.spotShadowMap[v]=U,y++}v++}else if(P.isRectAreaLight){const F=t.get(P);F.color.copy(O).multiplyScalar(D),F.halfWidth.set(P.width*.5,0,0),F.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=F,g++}else if(P.isPointLight){const F=t.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity),F.distance=P.distance,F.decay=P.decay,P.castShadow){const q=P.shadow,k=e.get(P);k.shadowIntensity=q.intensity,k.shadowBias=q.bias,k.shadowNormalBias=q.normalBias,k.shadowRadius=q.radius,k.shadowMapSize=q.mapSize,k.shadowCameraNear=q.camera.near,k.shadowCameraFar=q.camera.far,n.pointShadow[p]=k,n.pointShadowMap[p]=U,n.pointShadowMatrix[p]=P.shadow.matrix,x++}n.point[p]=F,p++}else if(P.isHemisphereLight){const F=t.get(P);F.skyColor.copy(P.color).multiplyScalar(D),F.groundColor.copy(P.groundColor).multiplyScalar(D),n.hemi[m]=F,m++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==p||I.spotLength!==v||I.rectAreaLength!==g||I.hemiLength!==m||I.numDirectionalShadows!==_||I.numPointShadows!==x||I.numSpotShadows!==y||I.numSpotMaps!==b||I.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+b-C,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,I.directionalLength=f,I.pointLength=p,I.spotLength=v,I.rectAreaLength=g,I.hemiLength=m,I.numDirectionalShadows=_,I.numPointShadows=x,I.numSpotShadows=y,I.numSpotMaps=b,I.numLightProbes=A,n.version=dv++)}function c(l,h){let u=0,d=0,f=0,p=0,v=0;const g=h.matrixWorldInverse;for(let m=0,_=l.length;m<_;m++){const x=l[m];if(x.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),u++}else if(x.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const y=n.rectArea[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),o.identity(),s.copy(x.matrixWorld),s.premultiply(g),o.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),p++}else if(x.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(g),v++}}}return{setup:a,setupView:c,state:n}}function Pl(r){const t=new pv(r),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function mv(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new Pl(r),t.set(i,[a])):s>=o.length?(a=new Pl(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const gv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function _v(r,t,e){let n=new ja;const i=new vt,s=new vt,o=new Ee,a=new Uf({depthPacking:Qu}),c=new Of,l={},h=e.maxTextureSize,u={[oi]:Ye,[Ye]:oi,[un]:un},d=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:gv,fragmentShader:vv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new Be;p.setAttribute("position",new In(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new xt(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ih;let m=this.type;this.render=function(C,A,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;const S=r.getRenderTarget(),M=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),O=r.state;O.setBlending(si),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const D=m!==Xn&&this.type===Xn,B=m===Xn&&this.type!==Xn;for(let U=0,F=C.length;U<F;U++){const q=C[U],k=q.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const K=k.getFrameExtents();if(i.multiply(K),s.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/K.x),i.x=s.x*K.x,k.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/K.y),i.y=s.y*K.y,k.mapSize.y=s.y)),k.map===null||D===!0||B===!0){const ft=this.type!==Xn?{minFilter:xn,magFilter:xn}:{};k.map!==null&&k.map.dispose(),k.map=new Ti(i.x,i.y,ft),k.map.texture.name=q.name+".shadowMap",k.camera.updateProjectionMatrix()}r.setRenderTarget(k.map),r.clear();const ot=k.getViewportCount();for(let ft=0;ft<ot;ft++){const st=k.getViewport(ft);o.set(s.x*st.x,s.y*st.y,s.x*st.z,s.y*st.w),O.viewport(o),k.updateMatrices(q,ft),n=k.getFrustum(),y(A,I,k.camera,q,this.type)}k.isPointLightShadow!==!0&&this.type===Xn&&_(k,I),k.needsUpdate=!1}m=this.type,g.needsUpdate=!1,r.setRenderTarget(S,M,P)};function _(C,A){const I=t.update(v);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Ti(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(A,null,I,d,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(A,null,I,f,v,null)}function x(C,A,I,S){let M=null;const P=I.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(P!==void 0)M=P;else if(M=I.isPointLight===!0?c:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const O=M.uuid,D=A.uuid;let B=l[O];B===void 0&&(B={},l[O]=B);let U=B[D];U===void 0&&(U=M.clone(),B[D]=U,A.addEventListener("dispose",b)),M=U}if(M.visible=A.visible,M.wireframe=A.wireframe,S===Xn?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const O=r.properties.get(M);O.light=I}return M}function y(C,A,I,S,M){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===Xn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,C.matrixWorld);const D=t.update(C),B=C.material;if(Array.isArray(B)){const U=D.groups;for(let F=0,q=U.length;F<q;F++){const k=U[F],K=B[k.materialIndex];if(K&&K.visible){const ot=x(C,K,S,M);C.onBeforeShadow(r,C,A,I,D,ot,k),r.renderBufferDirect(I,null,D,ot,C,k),C.onAfterShadow(r,C,A,I,D,ot,k)}}}else if(B.visible){const U=x(C,B,S,M);C.onBeforeShadow(r,C,A,I,D,U,null),r.renderBufferDirect(I,null,D,U,C,null),C.onAfterShadow(r,C,A,I,D,U,null)}}const O=C.children;for(let D=0,B=O.length;D<B;D++)y(O[D],A,I,S,M)}function b(C){C.target.removeEventListener("dispose",b);for(const I in l){const S=l[I],M=C.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const yv={[ko]:Vo,[Go]:Xo,[Ho]:qo,[ns]:Wo,[Vo]:ko,[Xo]:Go,[qo]:Ho,[Wo]:ns};function xv(r,t){function e(){let z=!1;const ht=new Ee;let gt=null;const At=new Ee(0,0,0,0);return{setMask:function(ct){gt!==ct&&!z&&(r.colorMask(ct,ct,ct,ct),gt=ct)},setLocked:function(ct){z=ct},setClear:function(ct,tt,Dt,Yt,me){me===!0&&(ct*=Yt,tt*=Yt,Dt*=Yt),ht.set(ct,tt,Dt,Yt),At.equals(ht)===!1&&(r.clearColor(ct,tt,Dt,Yt),At.copy(ht))},reset:function(){z=!1,gt=null,At.set(-1,0,0,0)}}}function n(){let z=!1,ht=!1,gt=null,At=null,ct=null;return{setReversed:function(tt){if(ht!==tt){const Dt=t.get("EXT_clip_control");tt?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT),ht=tt;const Yt=ct;ct=null,this.setClear(Yt)}},getReversed:function(){return ht},setTest:function(tt){tt?et(r.DEPTH_TEST):bt(r.DEPTH_TEST)},setMask:function(tt){gt!==tt&&!z&&(r.depthMask(tt),gt=tt)},setFunc:function(tt){if(ht&&(tt=yv[tt]),At!==tt){switch(tt){case ko:r.depthFunc(r.NEVER);break;case Vo:r.depthFunc(r.ALWAYS);break;case Go:r.depthFunc(r.LESS);break;case ns:r.depthFunc(r.LEQUAL);break;case Ho:r.depthFunc(r.EQUAL);break;case Wo:r.depthFunc(r.GEQUAL);break;case Xo:r.depthFunc(r.GREATER);break;case qo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}At=tt}},setLocked:function(tt){z=tt},setClear:function(tt){ct!==tt&&(ht&&(tt=1-tt),r.clearDepth(tt),ct=tt)},reset:function(){z=!1,gt=null,At=null,ct=null,ht=!1}}}function i(){let z=!1,ht=null,gt=null,At=null,ct=null,tt=null,Dt=null,Yt=null,me=null;return{setTest:function(le){z||(le?et(r.STENCIL_TEST):bt(r.STENCIL_TEST))},setMask:function(le){ht!==le&&!z&&(r.stencilMask(le),ht=le)},setFunc:function(le,Fn,wn){(gt!==le||At!==Fn||ct!==wn)&&(r.stencilFunc(le,Fn,wn),gt=le,At=Fn,ct=wn)},setOp:function(le,Fn,wn){(tt!==le||Dt!==Fn||Yt!==wn)&&(r.stencilOp(le,Fn,wn),tt=le,Dt=Fn,Yt=wn)},setLocked:function(le){z=le},setClear:function(le){me!==le&&(r.clearStencil(le),me=le)},reset:function(){z=!1,ht=null,gt=null,At=null,ct=null,tt=null,Dt=null,Yt=null,me=null}}}const s=new e,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],p=null,v=!1,g=null,m=null,_=null,x=null,y=null,b=null,C=null,A=new ee(0,0,0),I=0,S=!1,M=null,P=null,O=null,D=null,B=null;const U=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,q=0;const k=r.getParameter(r.VERSION);k.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(k)[1]),F=q>=1):k.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),F=q>=2);let K=null,ot={};const ft=r.getParameter(r.SCISSOR_BOX),st=r.getParameter(r.VIEWPORT),Xt=new Ee().fromArray(ft),Zt=new Ee().fromArray(st);function Jt(z,ht,gt,At){const ct=new Uint8Array(4),tt=r.createTexture();r.bindTexture(z,tt),r.texParameteri(z,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(z,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Dt=0;Dt<gt;Dt++)z===r.TEXTURE_3D||z===r.TEXTURE_2D_ARRAY?r.texImage3D(ht,0,r.RGBA,1,1,At,0,r.RGBA,r.UNSIGNED_BYTE,ct):r.texImage2D(ht+Dt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ct);return tt}const $={};$[r.TEXTURE_2D]=Jt(r.TEXTURE_2D,r.TEXTURE_2D,1),$[r.TEXTURE_CUBE_MAP]=Jt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[r.TEXTURE_2D_ARRAY]=Jt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),$[r.TEXTURE_3D]=Jt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),et(r.DEPTH_TEST),o.setFunc(ns),J(!1),Z(wc),et(r.CULL_FACE),it(si);function et(z){h[z]!==!0&&(r.enable(z),h[z]=!0)}function bt(z){h[z]!==!1&&(r.disable(z),h[z]=!1)}function Ut(z,ht){return u[z]!==ht?(r.bindFramebuffer(z,ht),u[z]=ht,z===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ht),z===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ht),!0):!1}function Pt(z,ht){let gt=f,At=!1;if(z){gt=d.get(ht),gt===void 0&&(gt=[],d.set(ht,gt));const ct=z.textures;if(gt.length!==ct.length||gt[0]!==r.COLOR_ATTACHMENT0){for(let tt=0,Dt=ct.length;tt<Dt;tt++)gt[tt]=r.COLOR_ATTACHMENT0+tt;gt.length=ct.length,At=!0}}else gt[0]!==r.BACK&&(gt[0]=r.BACK,At=!0);At&&r.drawBuffers(gt)}function ie(z){return p!==z?(r.useProgram(z),p=z,!0):!1}const pe={[xi]:r.FUNC_ADD,[bu]:r.FUNC_SUBTRACT,[Tu]:r.FUNC_REVERSE_SUBTRACT};pe[Cu]=r.MIN,pe[Au]=r.MAX;const N={[Ru]:r.ZERO,[Pu]:r.ONE,[Lu]:r.SRC_COLOR,[Bo]:r.SRC_ALPHA,[Ou]:r.SRC_ALPHA_SATURATE,[Fu]:r.DST_COLOR,[Du]:r.DST_ALPHA,[Iu]:r.ONE_MINUS_SRC_COLOR,[zo]:r.ONE_MINUS_SRC_ALPHA,[Uu]:r.ONE_MINUS_DST_COLOR,[Nu]:r.ONE_MINUS_DST_ALPHA,[Bu]:r.CONSTANT_COLOR,[zu]:r.ONE_MINUS_CONSTANT_COLOR,[ku]:r.CONSTANT_ALPHA,[Vu]:r.ONE_MINUS_CONSTANT_ALPHA};function it(z,ht,gt,At,ct,tt,Dt,Yt,me,le){if(z===si){v===!0&&(bt(r.BLEND),v=!1);return}if(v===!1&&(et(r.BLEND),v=!0),z!==Eu){if(z!==g||le!==S){if((m!==xi||y!==xi)&&(r.blendEquation(r.FUNC_ADD),m=xi,y=xi),le)switch(z){case Qi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Oo:r.blendFunc(r.ONE,r.ONE);break;case Sc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ec:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Qi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Oo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Sc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ec:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}_=null,x=null,b=null,C=null,A.set(0,0,0),I=0,g=z,S=le}return}ct=ct||ht,tt=tt||gt,Dt=Dt||At,(ht!==m||ct!==y)&&(r.blendEquationSeparate(pe[ht],pe[ct]),m=ht,y=ct),(gt!==_||At!==x||tt!==b||Dt!==C)&&(r.blendFuncSeparate(N[gt],N[At],N[tt],N[Dt]),_=gt,x=At,b=tt,C=Dt),(Yt.equals(A)===!1||me!==I)&&(r.blendColor(Yt.r,Yt.g,Yt.b,me),A.copy(Yt),I=me),g=z,S=!1}function Q(z,ht){z.side===un?bt(r.CULL_FACE):et(r.CULL_FACE);let gt=z.side===Ye;ht&&(gt=!gt),J(gt),z.blending===Qi&&z.transparent===!1?it(si):it(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),s.setMask(z.colorWrite);const At=z.stencilWrite;a.setTest(At),At&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),rt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?et(r.SAMPLE_ALPHA_TO_COVERAGE):bt(r.SAMPLE_ALPHA_TO_COVERAGE)}function J(z){M!==z&&(z?r.frontFace(r.CW):r.frontFace(r.CCW),M=z)}function Z(z){z!==Mu?(et(r.CULL_FACE),z!==P&&(z===wc?r.cullFace(r.BACK):z===wu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):bt(r.CULL_FACE),P=z}function pt(z){z!==O&&(F&&r.lineWidth(z),O=z)}function rt(z,ht,gt){z?(et(r.POLYGON_OFFSET_FILL),(D!==ht||B!==gt)&&(r.polygonOffset(ht,gt),D=ht,B=gt)):bt(r.POLYGON_OFFSET_FILL)}function mt(z){z?et(r.SCISSOR_TEST):bt(r.SCISSOR_TEST)}function qt(z){z===void 0&&(z=r.TEXTURE0+U-1),K!==z&&(r.activeTexture(z),K=z)}function Ht(z,ht,gt){gt===void 0&&(K===null?gt=r.TEXTURE0+U-1:gt=K);let At=ot[gt];At===void 0&&(At={type:void 0,texture:void 0},ot[gt]=At),(At.type!==z||At.texture!==ht)&&(K!==gt&&(r.activeTexture(gt),K=gt),r.bindTexture(z,ht||$[z]),At.type=z,At.texture=ht)}function R(){const z=ot[K];z!==void 0&&z.type!==void 0&&(r.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function w(){try{r.compressedTexImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function H(){try{r.compressedTexImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Y(){try{r.texSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function nt(){try{r.texSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function j(){try{r.compressedTexSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Nt(){try{r.compressedTexSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function dt(){try{r.texStorage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Lt(){try{r.texStorage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function It(){try{r.texImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function at(){try{r.texImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function wt(z){Xt.equals(z)===!1&&(r.scissor(z.x,z.y,z.z,z.w),Xt.copy(z))}function Vt(z){Zt.equals(z)===!1&&(r.viewport(z.x,z.y,z.z,z.w),Zt.copy(z))}function Ft(z,ht){let gt=l.get(ht);gt===void 0&&(gt=new WeakMap,l.set(ht,gt));let At=gt.get(z);At===void 0&&(At=r.getUniformBlockIndex(ht,z.name),gt.set(z,At))}function yt(z,ht){const At=l.get(ht).get(z);c.get(ht)!==At&&(r.uniformBlockBinding(ht,At,z.__bindingPointIndex),c.set(ht,At))}function $t(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},K=null,ot={},u={},d=new WeakMap,f=[],p=null,v=!1,g=null,m=null,_=null,x=null,y=null,b=null,C=null,A=new ee(0,0,0),I=0,S=!1,M=null,P=null,O=null,D=null,B=null,Xt.set(0,0,r.canvas.width,r.canvas.height),Zt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:et,disable:bt,bindFramebuffer:Ut,drawBuffers:Pt,useProgram:ie,setBlending:it,setMaterial:Q,setFlipSided:J,setCullFace:Z,setLineWidth:pt,setPolygonOffset:rt,setScissorTest:mt,activeTexture:qt,bindTexture:Ht,unbindTexture:R,compressedTexImage2D:w,compressedTexImage3D:H,texImage2D:It,texImage3D:at,updateUBOMapping:Ft,uniformBlockBinding:yt,texStorage2D:dt,texStorage3D:Lt,texSubImage2D:Y,texSubImage3D:nt,compressedTexSubImage2D:j,compressedTexSubImage3D:Nt,scissor:wt,viewport:Vt,reset:$t}}function Mv(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new vt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(R,w){return f?new OffscreenCanvas(R,w):Ds("canvas")}function v(R,w,H){let Y=1;const nt=Ht(R);if((nt.width>H||nt.height>H)&&(Y=H/Math.max(nt.width,nt.height)),Y<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const j=Math.floor(Y*nt.width),Nt=Math.floor(Y*nt.height);u===void 0&&(u=p(j,Nt));const dt=w?p(j,Nt):u;return dt.width=j,dt.height=Nt,dt.getContext("2d").drawImage(R,0,0,j,Nt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+j+"x"+Nt+")."),dt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),R;return R}function g(R){return R.generateMipmaps}function m(R){r.generateMipmap(R)}function _(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(R,w,H,Y,nt=!1){if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let j=w;if(w===r.RED&&(H===r.FLOAT&&(j=r.R32F),H===r.HALF_FLOAT&&(j=r.R16F),H===r.UNSIGNED_BYTE&&(j=r.R8)),w===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(j=r.R8UI),H===r.UNSIGNED_SHORT&&(j=r.R16UI),H===r.UNSIGNED_INT&&(j=r.R32UI),H===r.BYTE&&(j=r.R8I),H===r.SHORT&&(j=r.R16I),H===r.INT&&(j=r.R32I)),w===r.RG&&(H===r.FLOAT&&(j=r.RG32F),H===r.HALF_FLOAT&&(j=r.RG16F),H===r.UNSIGNED_BYTE&&(j=r.RG8)),w===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&(j=r.RG8UI),H===r.UNSIGNED_SHORT&&(j=r.RG16UI),H===r.UNSIGNED_INT&&(j=r.RG32UI),H===r.BYTE&&(j=r.RG8I),H===r.SHORT&&(j=r.RG16I),H===r.INT&&(j=r.RG32I)),w===r.RGB_INTEGER&&(H===r.UNSIGNED_BYTE&&(j=r.RGB8UI),H===r.UNSIGNED_SHORT&&(j=r.RGB16UI),H===r.UNSIGNED_INT&&(j=r.RGB32UI),H===r.BYTE&&(j=r.RGB8I),H===r.SHORT&&(j=r.RGB16I),H===r.INT&&(j=r.RGB32I)),w===r.RGBA_INTEGER&&(H===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),H===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),H===r.UNSIGNED_INT&&(j=r.RGBA32UI),H===r.BYTE&&(j=r.RGBA8I),H===r.SHORT&&(j=r.RGBA16I),H===r.INT&&(j=r.RGBA32I)),w===r.RGB&&(H===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),H===r.UNSIGNED_INT_10F_11F_11F_REV&&(j=r.R11F_G11F_B10F)),w===r.RGBA){const Nt=nt?Dr:ae.getTransfer(Y);H===r.FLOAT&&(j=r.RGBA32F),H===r.HALF_FLOAT&&(j=r.RGBA16F),H===r.UNSIGNED_BYTE&&(j=Nt===ue?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function y(R,w){let H;return R?w===null||w===bi||w===Rs?H=r.DEPTH24_STENCIL8:w===qn?H=r.DEPTH32F_STENCIL8:w===As&&(H=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===bi||w===Rs?H=r.DEPTH_COMPONENT24:w===qn?H=r.DEPTH_COMPONENT32F:w===As&&(H=r.DEPTH_COMPONENT16),H}function b(R,w){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==xn&&R.minFilter!==Pn?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function C(R){const w=R.target;w.removeEventListener("dispose",C),I(w),w.isVideoTexture&&h.delete(w)}function A(R){const w=R.target;w.removeEventListener("dispose",A),M(w)}function I(R){const w=n.get(R);if(w.__webglInit===void 0)return;const H=R.source,Y=d.get(H);if(Y){const nt=Y[w.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&S(R),Object.keys(Y).length===0&&d.delete(H)}n.remove(R)}function S(R){const w=n.get(R);r.deleteTexture(w.__webglTexture);const H=R.source,Y=d.get(H);delete Y[w.__cacheKey],o.memory.textures--}function M(R){const w=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(w.__webglFramebuffer[Y]))for(let nt=0;nt<w.__webglFramebuffer[Y].length;nt++)r.deleteFramebuffer(w.__webglFramebuffer[Y][nt]);else r.deleteFramebuffer(w.__webglFramebuffer[Y]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[Y])}else{if(Array.isArray(w.__webglFramebuffer))for(let Y=0;Y<w.__webglFramebuffer.length;Y++)r.deleteFramebuffer(w.__webglFramebuffer[Y]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Y=0;Y<w.__webglColorRenderbuffer.length;Y++)w.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[Y]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const H=R.textures;for(let Y=0,nt=H.length;Y<nt;Y++){const j=n.get(H[Y]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(H[Y])}n.remove(R)}let P=0;function O(){P=0}function D(){const R=P;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),P+=1,R}function B(R){const w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.colorSpace),w.join()}function U(R,w){const H=n.get(R);if(R.isVideoTexture&&mt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&H.__version!==R.version){const Y=R.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(H,R,w);return}}else R.isExternalTexture&&(H.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+w)}function F(R,w){const H=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){$(H,R,w);return}e.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+w)}function q(R,w){const H=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){$(H,R,w);return}e.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+w)}function k(R,w){const H=n.get(R);if(R.version>0&&H.__version!==R.version){et(H,R,w);return}e.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+w)}const K={[Oe]:r.REPEAT,[Si]:r.CLAMP_TO_EDGE,[$o]:r.MIRRORED_REPEAT},ot={[xn]:r.NEAREST,[Zu]:r.NEAREST_MIPMAP_NEAREST,[Xs]:r.NEAREST_MIPMAP_LINEAR,[Pn]:r.LINEAR,[Yr]:r.LINEAR_MIPMAP_NEAREST,[Ei]:r.LINEAR_MIPMAP_LINEAR},ft={[ed]:r.NEVER,[ad]:r.ALWAYS,[nd]:r.LESS,[mh]:r.LEQUAL,[id]:r.EQUAL,[od]:r.GEQUAL,[sd]:r.GREATER,[rd]:r.NOTEQUAL};function st(R,w){if(w.type===qn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Pn||w.magFilter===Yr||w.magFilter===Xs||w.magFilter===Ei||w.minFilter===Pn||w.minFilter===Yr||w.minFilter===Xs||w.minFilter===Ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,K[w.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,K[w.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,K[w.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,ot[w.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,ot[w.minFilter]),w.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,ft[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===xn||w.minFilter!==Xs&&w.minFilter!==Ei||w.type===qn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");r.texParameterf(R,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Xt(R,w){let H=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",C));const Y=w.source;let nt=d.get(Y);nt===void 0&&(nt={},d.set(Y,nt));const j=B(w);if(j!==R.__cacheKey){nt[j]===void 0&&(nt[j]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,H=!0),nt[j].usedTimes++;const Nt=nt[R.__cacheKey];Nt!==void 0&&(nt[R.__cacheKey].usedTimes--,Nt.usedTimes===0&&S(w)),R.__cacheKey=j,R.__webglTexture=nt[j].texture}return H}function Zt(R,w,H){return Math.floor(Math.floor(R/H)/w)}function Jt(R,w,H,Y){const j=R.updateRanges;if(j.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,w.width,w.height,H,Y,w.data);else{j.sort((at,wt)=>at.start-wt.start);let Nt=0;for(let at=1;at<j.length;at++){const wt=j[Nt],Vt=j[at],Ft=wt.start+wt.count,yt=Zt(Vt.start,w.width,4),$t=Zt(wt.start,w.width,4);Vt.start<=Ft+1&&yt===$t&&Zt(Vt.start+Vt.count-1,w.width,4)===yt?wt.count=Math.max(wt.count,Vt.start+Vt.count-wt.start):(++Nt,j[Nt]=Vt)}j.length=Nt+1;const dt=r.getParameter(r.UNPACK_ROW_LENGTH),Lt=r.getParameter(r.UNPACK_SKIP_PIXELS),It=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,w.width);for(let at=0,wt=j.length;at<wt;at++){const Vt=j[at],Ft=Math.floor(Vt.start/4),yt=Math.ceil(Vt.count/4),$t=Ft%w.width,z=Math.floor(Ft/w.width),ht=yt,gt=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,$t),r.pixelStorei(r.UNPACK_SKIP_ROWS,z),e.texSubImage2D(r.TEXTURE_2D,0,$t,z,ht,gt,H,Y,w.data)}R.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,dt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Lt),r.pixelStorei(r.UNPACK_SKIP_ROWS,It)}}function $(R,w,H){let Y=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Y=r.TEXTURE_3D);const nt=Xt(R,w),j=w.source;e.bindTexture(Y,R.__webglTexture,r.TEXTURE0+H);const Nt=n.get(j);if(j.version!==Nt.__version||nt===!0){e.activeTexture(r.TEXTURE0+H);const dt=ae.getPrimaries(ae.workingColorSpace),Lt=w.colorSpace===ii?null:ae.getPrimaries(w.colorSpace),It=w.colorSpace===ii||dt===Lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let at=v(w.image,!1,i.maxTextureSize);at=qt(w,at);const wt=s.convert(w.format,w.colorSpace),Vt=s.convert(w.type);let Ft=x(w.internalFormat,wt,Vt,w.colorSpace,w.isVideoTexture);st(Y,w);let yt;const $t=w.mipmaps,z=w.isVideoTexture!==!0,ht=Nt.__version===void 0||nt===!0,gt=j.dataReady,At=b(w,at);if(w.isDepthTexture)Ft=y(w.format===Ls,w.type),ht&&(z?e.texStorage2D(r.TEXTURE_2D,1,Ft,at.width,at.height):e.texImage2D(r.TEXTURE_2D,0,Ft,at.width,at.height,0,wt,Vt,null));else if(w.isDataTexture)if($t.length>0){z&&ht&&e.texStorage2D(r.TEXTURE_2D,At,Ft,$t[0].width,$t[0].height);for(let ct=0,tt=$t.length;ct<tt;ct++)yt=$t[ct],z?gt&&e.texSubImage2D(r.TEXTURE_2D,ct,0,0,yt.width,yt.height,wt,Vt,yt.data):e.texImage2D(r.TEXTURE_2D,ct,Ft,yt.width,yt.height,0,wt,Vt,yt.data);w.generateMipmaps=!1}else z?(ht&&e.texStorage2D(r.TEXTURE_2D,At,Ft,at.width,at.height),gt&&Jt(w,at,wt,Vt)):e.texImage2D(r.TEXTURE_2D,0,Ft,at.width,at.height,0,wt,Vt,at.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){z&&ht&&e.texStorage3D(r.TEXTURE_2D_ARRAY,At,Ft,$t[0].width,$t[0].height,at.depth);for(let ct=0,tt=$t.length;ct<tt;ct++)if(yt=$t[ct],w.format!==_n)if(wt!==null)if(z){if(gt)if(w.layerUpdates.size>0){const Dt=ol(yt.width,yt.height,w.format,w.type);for(const Yt of w.layerUpdates){const me=yt.data.subarray(Yt*Dt/yt.data.BYTES_PER_ELEMENT,(Yt+1)*Dt/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,Yt,yt.width,yt.height,1,wt,me)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,0,yt.width,yt.height,at.depth,wt,yt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ct,Ft,yt.width,yt.height,at.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?gt&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,0,yt.width,yt.height,at.depth,wt,Vt,yt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,ct,Ft,yt.width,yt.height,at.depth,0,wt,Vt,yt.data)}else{z&&ht&&e.texStorage2D(r.TEXTURE_2D,At,Ft,$t[0].width,$t[0].height);for(let ct=0,tt=$t.length;ct<tt;ct++)yt=$t[ct],w.format!==_n?wt!==null?z?gt&&e.compressedTexSubImage2D(r.TEXTURE_2D,ct,0,0,yt.width,yt.height,wt,yt.data):e.compressedTexImage2D(r.TEXTURE_2D,ct,Ft,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?gt&&e.texSubImage2D(r.TEXTURE_2D,ct,0,0,yt.width,yt.height,wt,Vt,yt.data):e.texImage2D(r.TEXTURE_2D,ct,Ft,yt.width,yt.height,0,wt,Vt,yt.data)}else if(w.isDataArrayTexture)if(z){if(ht&&e.texStorage3D(r.TEXTURE_2D_ARRAY,At,Ft,at.width,at.height,at.depth),gt)if(w.layerUpdates.size>0){const ct=ol(at.width,at.height,w.format,w.type);for(const tt of w.layerUpdates){const Dt=at.data.subarray(tt*ct/at.data.BYTES_PER_ELEMENT,(tt+1)*ct/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,tt,at.width,at.height,1,wt,Vt,Dt)}w.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,wt,Vt,at.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Ft,at.width,at.height,at.depth,0,wt,Vt,at.data);else if(w.isData3DTexture)z?(ht&&e.texStorage3D(r.TEXTURE_3D,At,Ft,at.width,at.height,at.depth),gt&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,wt,Vt,at.data)):e.texImage3D(r.TEXTURE_3D,0,Ft,at.width,at.height,at.depth,0,wt,Vt,at.data);else if(w.isFramebufferTexture){if(ht)if(z)e.texStorage2D(r.TEXTURE_2D,At,Ft,at.width,at.height);else{let ct=at.width,tt=at.height;for(let Dt=0;Dt<At;Dt++)e.texImage2D(r.TEXTURE_2D,Dt,Ft,ct,tt,0,wt,Vt,null),ct>>=1,tt>>=1}}else if($t.length>0){if(z&&ht){const ct=Ht($t[0]);e.texStorage2D(r.TEXTURE_2D,At,Ft,ct.width,ct.height)}for(let ct=0,tt=$t.length;ct<tt;ct++)yt=$t[ct],z?gt&&e.texSubImage2D(r.TEXTURE_2D,ct,0,0,wt,Vt,yt):e.texImage2D(r.TEXTURE_2D,ct,Ft,wt,Vt,yt);w.generateMipmaps=!1}else if(z){if(ht){const ct=Ht(at);e.texStorage2D(r.TEXTURE_2D,At,Ft,ct.width,ct.height)}gt&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,wt,Vt,at)}else e.texImage2D(r.TEXTURE_2D,0,Ft,wt,Vt,at);g(w)&&m(Y),Nt.__version=j.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function et(R,w,H){if(w.image.length!==6)return;const Y=Xt(R,w),nt=w.source;e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+H);const j=n.get(nt);if(nt.version!==j.__version||Y===!0){e.activeTexture(r.TEXTURE0+H);const Nt=ae.getPrimaries(ae.workingColorSpace),dt=w.colorSpace===ii?null:ae.getPrimaries(w.colorSpace),Lt=w.colorSpace===ii||Nt===dt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);const It=w.isCompressedTexture||w.image[0].isCompressedTexture,at=w.image[0]&&w.image[0].isDataTexture,wt=[];for(let tt=0;tt<6;tt++)!It&&!at?wt[tt]=v(w.image[tt],!0,i.maxCubemapSize):wt[tt]=at?w.image[tt].image:w.image[tt],wt[tt]=qt(w,wt[tt]);const Vt=wt[0],Ft=s.convert(w.format,w.colorSpace),yt=s.convert(w.type),$t=x(w.internalFormat,Ft,yt,w.colorSpace),z=w.isVideoTexture!==!0,ht=j.__version===void 0||Y===!0,gt=nt.dataReady;let At=b(w,Vt);st(r.TEXTURE_CUBE_MAP,w);let ct;if(It){z&&ht&&e.texStorage2D(r.TEXTURE_CUBE_MAP,At,$t,Vt.width,Vt.height);for(let tt=0;tt<6;tt++){ct=wt[tt].mipmaps;for(let Dt=0;Dt<ct.length;Dt++){const Yt=ct[Dt];w.format!==_n?Ft!==null?z?gt&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Dt,0,0,Yt.width,Yt.height,Ft,Yt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Dt,$t,Yt.width,Yt.height,0,Yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?gt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Dt,0,0,Yt.width,Yt.height,Ft,yt,Yt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Dt,$t,Yt.width,Yt.height,0,Ft,yt,Yt.data)}}}else{if(ct=w.mipmaps,z&&ht){ct.length>0&&At++;const tt=Ht(wt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,At,$t,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(at){z?gt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,wt[tt].width,wt[tt].height,Ft,yt,wt[tt].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,$t,wt[tt].width,wt[tt].height,0,Ft,yt,wt[tt].data);for(let Dt=0;Dt<ct.length;Dt++){const me=ct[Dt].image[tt].image;z?gt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Dt+1,0,0,me.width,me.height,Ft,yt,me.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Dt+1,$t,me.width,me.height,0,Ft,yt,me.data)}}else{z?gt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Ft,yt,wt[tt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,$t,Ft,yt,wt[tt]);for(let Dt=0;Dt<ct.length;Dt++){const Yt=ct[Dt];z?gt&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Dt+1,0,0,Ft,yt,Yt.image[tt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Dt+1,$t,Ft,yt,Yt.image[tt])}}}g(w)&&m(r.TEXTURE_CUBE_MAP),j.__version=nt.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function bt(R,w,H,Y,nt,j){const Nt=s.convert(H.format,H.colorSpace),dt=s.convert(H.type),Lt=x(H.internalFormat,Nt,dt,H.colorSpace),It=n.get(w),at=n.get(H);if(at.__renderTarget=w,!It.__hasExternalTextures){const wt=Math.max(1,w.width>>j),Vt=Math.max(1,w.height>>j);nt===r.TEXTURE_3D||nt===r.TEXTURE_2D_ARRAY?e.texImage3D(nt,j,Lt,wt,Vt,w.depth,0,Nt,dt,null):e.texImage2D(nt,j,Lt,wt,Vt,0,Nt,dt,null)}e.bindFramebuffer(r.FRAMEBUFFER,R),rt(w)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,nt,at.__webglTexture,0,pt(w)):(nt===r.TEXTURE_2D||nt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,nt,at.__webglTexture,j),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Ut(R,w,H){if(r.bindRenderbuffer(r.RENDERBUFFER,R),w.depthBuffer){const Y=w.depthTexture,nt=Y&&Y.isDepthTexture?Y.type:null,j=y(w.stencilBuffer,nt),Nt=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,dt=pt(w);rt(w)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,dt,j,w.width,w.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,dt,j,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,j,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Nt,r.RENDERBUFFER,R)}else{const Y=w.textures;for(let nt=0;nt<Y.length;nt++){const j=Y[nt],Nt=s.convert(j.format,j.colorSpace),dt=s.convert(j.type),Lt=x(j.internalFormat,Nt,dt,j.colorSpace),It=pt(w);H&&rt(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,It,Lt,w.width,w.height):rt(w)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,It,Lt,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,Lt,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Pt(R,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=n.get(w.depthTexture);Y.__renderTarget=w,(!Y.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),U(w.depthTexture,0);const nt=Y.__webglTexture,j=pt(w);if(w.depthTexture.format===Ps)rt(w)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,nt,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,nt,0);else if(w.depthTexture.format===Ls)rt(w)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,nt,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function ie(R){const w=n.get(R),H=R.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==R.depthTexture){const Y=R.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Y){const nt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Y.removeEventListener("dispose",nt)};Y.addEventListener("dispose",nt),w.__depthDisposeCallback=nt}w.__boundDepthTexture=Y}if(R.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const Y=R.texture.mipmaps;Y&&Y.length>0?Pt(w.__webglFramebuffer[0],R):Pt(w.__webglFramebuffer,R)}else if(H){w.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[Y]),w.__webglDepthbuffer[Y]===void 0)w.__webglDepthbuffer[Y]=r.createRenderbuffer(),Ut(w.__webglDepthbuffer[Y],R,!1);else{const nt=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=w.__webglDepthbuffer[Y];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,nt,r.RENDERBUFFER,j)}}else{const Y=R.texture.mipmaps;if(Y&&Y.length>0?e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),Ut(w.__webglDepthbuffer,R,!1);else{const nt=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,nt,r.RENDERBUFFER,j)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function pe(R,w,H){const Y=n.get(R);w!==void 0&&bt(Y.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&ie(R)}function N(R){const w=R.texture,H=n.get(R),Y=n.get(w);R.addEventListener("dispose",A);const nt=R.textures,j=R.isWebGLCubeRenderTarget===!0,Nt=nt.length>1;if(Nt||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=w.version,o.memory.textures++),j){H.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[dt]=[];for(let Lt=0;Lt<w.mipmaps.length;Lt++)H.__webglFramebuffer[dt][Lt]=r.createFramebuffer()}else H.__webglFramebuffer[dt]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let dt=0;dt<w.mipmaps.length;dt++)H.__webglFramebuffer[dt]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(Nt)for(let dt=0,Lt=nt.length;dt<Lt;dt++){const It=n.get(nt[dt]);It.__webglTexture===void 0&&(It.__webglTexture=r.createTexture(),o.memory.textures++)}if(R.samples>0&&rt(R)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let dt=0;dt<nt.length;dt++){const Lt=nt[dt];H.__webglColorRenderbuffer[dt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[dt]);const It=s.convert(Lt.format,Lt.colorSpace),at=s.convert(Lt.type),wt=x(Lt.internalFormat,It,at,Lt.colorSpace,R.isXRRenderTarget===!0),Vt=pt(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Vt,wt,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+dt,r.RENDERBUFFER,H.__webglColorRenderbuffer[dt])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),Ut(H.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){e.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),st(r.TEXTURE_CUBE_MAP,w);for(let dt=0;dt<6;dt++)if(w.mipmaps&&w.mipmaps.length>0)for(let Lt=0;Lt<w.mipmaps.length;Lt++)bt(H.__webglFramebuffer[dt][Lt],R,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Lt);else bt(H.__webglFramebuffer[dt],R,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);g(w)&&m(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Nt){for(let dt=0,Lt=nt.length;dt<Lt;dt++){const It=nt[dt],at=n.get(It);let wt=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(wt=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(wt,at.__webglTexture),st(wt,It),bt(H.__webglFramebuffer,R,It,r.COLOR_ATTACHMENT0+dt,wt,0),g(It)&&m(wt)}e.unbindTexture()}else{let dt=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(dt=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(dt,Y.__webglTexture),st(dt,w),w.mipmaps&&w.mipmaps.length>0)for(let Lt=0;Lt<w.mipmaps.length;Lt++)bt(H.__webglFramebuffer[Lt],R,w,r.COLOR_ATTACHMENT0,dt,Lt);else bt(H.__webglFramebuffer,R,w,r.COLOR_ATTACHMENT0,dt,0);g(w)&&m(dt),e.unbindTexture()}R.depthBuffer&&ie(R)}function it(R){const w=R.textures;for(let H=0,Y=w.length;H<Y;H++){const nt=w[H];if(g(nt)){const j=_(R),Nt=n.get(nt).__webglTexture;e.bindTexture(j,Nt),m(j),e.unbindTexture()}}}const Q=[],J=[];function Z(R){if(R.samples>0){if(rt(R)===!1){const w=R.textures,H=R.width,Y=R.height;let nt=r.COLOR_BUFFER_BIT;const j=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Nt=n.get(R),dt=w.length>1;if(dt)for(let It=0;It<w.length;It++)e.bindFramebuffer(r.FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,Nt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,Nt.__webglMultisampledFramebuffer);const Lt=R.texture.mipmaps;Lt&&Lt.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Nt.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Nt.__webglFramebuffer);for(let It=0;It<w.length;It++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(nt|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(nt|=r.STENCIL_BUFFER_BIT)),dt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Nt.__webglColorRenderbuffer[It]);const at=n.get(w[It]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,at,0)}r.blitFramebuffer(0,0,H,Y,0,0,H,Y,nt,r.NEAREST),c===!0&&(Q.length=0,J.length=0,Q.push(r.COLOR_ATTACHMENT0+It),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Q.push(j),J.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,J)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Q))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),dt)for(let It=0;It<w.length;It++){e.bindFramebuffer(r.FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.RENDERBUFFER,Nt.__webglColorRenderbuffer[It]);const at=n.get(w[It]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,Nt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+It,r.TEXTURE_2D,at,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Nt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const w=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function pt(R){return Math.min(i.maxSamples,R.samples)}function rt(R){const w=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function mt(R){const w=o.render.frame;h.get(R)!==w&&(h.set(R,w),R.update())}function qt(R,w){const H=R.colorSpace,Y=R.format,nt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||H!==rs&&H!==ii&&(ae.getTransfer(H)===ue?(Y!==_n||nt!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}function Ht(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=O,this.setTexture2D=U,this.setTexture2DArray=F,this.setTexture3D=q,this.setTextureCube=k,this.rebindTextures=pe,this.setupRenderTarget=N,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=rt}function wv(r,t){function e(n,i=ii){let s;const o=ae.getTransfer(i);if(n===Dn)return r.UNSIGNED_BYTE;if(n===za)return r.UNSIGNED_SHORT_4_4_4_4;if(n===ka)return r.UNSIGNED_SHORT_5_5_5_1;if(n===ch)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===lh)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===oh)return r.BYTE;if(n===ah)return r.SHORT;if(n===As)return r.UNSIGNED_SHORT;if(n===Ba)return r.INT;if(n===bi)return r.UNSIGNED_INT;if(n===qn)return r.FLOAT;if(n===ks)return r.HALF_FLOAT;if(n===hh)return r.ALPHA;if(n===uh)return r.RGB;if(n===_n)return r.RGBA;if(n===Ps)return r.DEPTH_COMPONENT;if(n===Ls)return r.DEPTH_STENCIL;if(n===dh)return r.RED;if(n===Va)return r.RED_INTEGER;if(n===fh)return r.RG;if(n===Ga)return r.RG_INTEGER;if(n===Ha)return r.RGBA_INTEGER;if(n===Ar||n===Rr||n===Pr||n===Lr)if(o===ue)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ar)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Pr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Lr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ar)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Pr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Lr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ko||n===Zo||n===Jo||n===Qo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ko)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Zo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Jo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ta||n===ea||n===na)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ta||n===ea)return o===ue?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===na)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ia||n===sa||n===ra||n===oa||n===aa||n===ca||n===la||n===ha||n===ua||n===da||n===fa||n===pa||n===ma||n===ga)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ia)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sa)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ra)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===oa)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===aa)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ca)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===la)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ha)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ua)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===da)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===fa)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===pa)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ma)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ga)return o===ue?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===va||n===_a||n===ya)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===va)return o===ue?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===_a)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ya)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xa||n===Ma||n===wa||n===Sa)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===xa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ma)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Rs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}const Sv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ev=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class bv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Th(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new $n({vertexShader:Sv,fragmentShader:Ev,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new xt(new Ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Tv extends cs{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,p=null;const v=typeof XRWebGLBinding<"u",g=new bv,m={},_=e.getContextAttributes();let x=null,y=null;const b=[],C=[],A=new vt;let I=null;const S=new hn;S.viewport=new Ee;const M=new hn;M.viewport=new Ee;const P=[S,M],O=new qf;let D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let et=b[$];return et===void 0&&(et=new mo,b[$]=et),et.getTargetRaySpace()},this.getControllerGrip=function($){let et=b[$];return et===void 0&&(et=new mo,b[$]=et),et.getGripSpace()},this.getHand=function($){let et=b[$];return et===void 0&&(et=new mo,b[$]=et),et.getHandSpace()};function U($){const et=C.indexOf($.inputSource);if(et===-1)return;const bt=b[et];bt!==void 0&&(bt.update($.inputSource,$.frame,l||o),bt.dispatchEvent({type:$.type,data:$.inputSource}))}function F(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",q);for(let $=0;$<b.length;$++){const et=C[$];et!==null&&(C[$]=null,b[$].disconnect(et))}D=null,B=null,g.reset();for(const $ in m)delete m[$];t.setRenderTarget(x),f=null,d=null,u=null,i=null,y=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,e)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(x=t.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",F),i.addEventListener("inputsourceschange",q),_.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(A),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let bt=null,Ut=null,Pt=null;_.depth&&(Pt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=_.stencil?Ls:Ps,Ut=_.stencil?Rs:bi);const ie={colorFormat:e.RGBA8,depthFormat:Pt,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(ie),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new Ti(d.textureWidth,d.textureHeight,{format:_n,type:Dn,depthTexture:new bh(d.textureWidth,d.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const bt={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,bt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ti(f.framebufferWidth,f.framebufferHeight,{format:_n,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),Jt.setContext(i),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q($){for(let et=0;et<$.removed.length;et++){const bt=$.removed[et],Ut=C.indexOf(bt);Ut>=0&&(C[Ut]=null,b[Ut].disconnect(bt))}for(let et=0;et<$.added.length;et++){const bt=$.added[et];let Ut=C.indexOf(bt);if(Ut===-1){for(let ie=0;ie<b.length;ie++)if(ie>=C.length){C.push(bt),Ut=ie;break}else if(C[ie]===null){C[ie]=bt,Ut=ie;break}if(Ut===-1)break}const Pt=b[Ut];Pt&&Pt.connect(bt)}}const k=new L,K=new L;function ot($,et,bt){k.setFromMatrixPosition(et.matrixWorld),K.setFromMatrixPosition(bt.matrixWorld);const Ut=k.distanceTo(K),Pt=et.projectionMatrix.elements,ie=bt.projectionMatrix.elements,pe=Pt[14]/(Pt[10]-1),N=Pt[14]/(Pt[10]+1),it=(Pt[9]+1)/Pt[5],Q=(Pt[9]-1)/Pt[5],J=(Pt[8]-1)/Pt[0],Z=(ie[8]+1)/ie[0],pt=pe*J,rt=pe*Z,mt=Ut/(-J+Z),qt=mt*-J;if(et.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(qt),$.translateZ(mt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Pt[10]===-1)$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const Ht=pe+mt,R=N+mt,w=pt-qt,H=rt+(Ut-qt),Y=it*N/R*Ht,nt=Q*N/R*Ht;$.projectionMatrix.makePerspective(w,H,Y,nt,Ht,R),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ft($,et){et===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(et.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let et=$.near,bt=$.far;g.texture!==null&&(g.depthNear>0&&(et=g.depthNear),g.depthFar>0&&(bt=g.depthFar)),O.near=M.near=S.near=et,O.far=M.far=S.far=bt,(D!==O.near||B!==O.far)&&(i.updateRenderState({depthNear:O.near,depthFar:O.far}),D=O.near,B=O.far),O.layers.mask=$.layers.mask|6,S.layers.mask=O.layers.mask&3,M.layers.mask=O.layers.mask&5;const Ut=$.parent,Pt=O.cameras;ft(O,Ut);for(let ie=0;ie<Pt.length;ie++)ft(Pt[ie],Ut);Pt.length===2?ot(O,S,M):O.projectionMatrix.copy(S.projectionMatrix),st($,O,Ut)};function st($,et,bt){bt===null?$.matrix.copy(et.matrixWorld):($.matrix.copy(bt.matrixWorld),$.matrix.invert(),$.matrix.multiply(et.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Is*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function($){c=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function($){return m[$]};let Xt=null;function Zt($,et){if(h=et.getViewerPose(l||o),p=et,h!==null){const bt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let Ut=!1;bt.length!==O.cameras.length&&(O.cameras.length=0,Ut=!0);for(let N=0;N<bt.length;N++){const it=bt[N];let Q=null;if(f!==null)Q=f.getViewport(it);else{const Z=u.getViewSubImage(d,it);Q=Z.viewport,N===0&&(t.setRenderTargetTextures(y,Z.colorTexture,Z.depthStencilTexture),t.setRenderTarget(y))}let J=P[N];J===void 0&&(J=new hn,J.layers.enable(N),J.viewport=new Ee,P[N]=J),J.matrix.fromArray(it.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(it.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Q.x,Q.y,Q.width,Q.height),N===0&&(O.matrix.copy(J.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ut===!0&&O.cameras.push(J)}const Pt=i.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const N=u.getDepthInformation(bt[0]);N&&N.isValid&&N.texture&&g.init(N,i.renderState)}if(Pt&&Pt.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let N=0;N<bt.length;N++){const it=bt[N].camera;if(it){let Q=m[it];Q||(Q=new Th,m[it]=Q);const J=u.getCameraImage(it);Q.sourceTexture=J}}}}for(let bt=0;bt<b.length;bt++){const Ut=C[bt],Pt=b[bt];Ut!==null&&Pt!==void 0&&Pt.update(Ut,et,l||o)}Xt&&Xt($,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),p=null}const Jt=new Bh;Jt.setAnimationLoop(Zt),this.setAnimationLoop=function($){Xt=$},this.dispose=function(){}}}const mi=new dn,Cv=new _e;function Av(r,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Mh(r)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,_,x,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(g,m):m.isMeshToonMaterial?(s(g,m),u(g,m)):m.isMeshPhongMaterial?(s(g,m),h(g,m)):m.isMeshStandardMaterial?(s(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(s(g,m),p(g,m)):m.isMeshDepthMaterial?s(g,m):m.isMeshDistanceMaterial?(s(g,m),v(g,m)):m.isMeshNormalMaterial?s(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,_,x):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ye&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ye&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const _=t.get(m),x=_.envMap,y=_.envMapRotation;x&&(g.envMap.value=x,mi.copy(y),mi.x*=-1,mi.y*=-1,mi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),g.envMapRotation.value.setFromMatrix4(Cv.makeRotationFromEuler(mi)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,_,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=x*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,_){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ye&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const _=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Rv(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,x){const y=x.program;n.uniformBlockBinding(_,y)}function l(_,x){let y=i[_.id];y===void 0&&(p(_),y=h(_),i[_.id]=y,_.addEventListener("dispose",g));const b=x.program;n.updateUBOMapping(_,b);const C=t.render.frame;s[_.id]!==C&&(d(_),s[_.id]=C)}function h(_){const x=u();_.__bindingPointIndex=x;const y=r.createBuffer(),b=_.__size,C=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,b,C),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,y),y}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){const x=i[_.id],y=_.uniforms,b=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let C=0,A=y.length;C<A;C++){const I=Array.isArray(y[C])?y[C]:[y[C]];for(let S=0,M=I.length;S<M;S++){const P=I[S];if(f(P,C,S,b)===!0){const O=P.__offset,D=Array.isArray(P.value)?P.value:[P.value];let B=0;for(let U=0;U<D.length;U++){const F=D[U],q=v(F);typeof F=="number"||typeof F=="boolean"?(P.__data[0]=F,r.bufferSubData(r.UNIFORM_BUFFER,O+B,P.__data)):F.isMatrix3?(P.__data[0]=F.elements[0],P.__data[1]=F.elements[1],P.__data[2]=F.elements[2],P.__data[3]=0,P.__data[4]=F.elements[3],P.__data[5]=F.elements[4],P.__data[6]=F.elements[5],P.__data[7]=0,P.__data[8]=F.elements[6],P.__data[9]=F.elements[7],P.__data[10]=F.elements[8],P.__data[11]=0):(F.toArray(P.__data,B),B+=q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,O,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(_,x,y,b){const C=_.value,A=x+"_"+y;if(b[A]===void 0)return typeof C=="number"||typeof C=="boolean"?b[A]=C:b[A]=C.clone(),!0;{const I=b[A];if(typeof C=="number"||typeof C=="boolean"){if(I!==C)return b[A]=C,!0}else if(I.equals(C)===!1)return I.copy(C),!0}return!1}function p(_){const x=_.uniforms;let y=0;const b=16;for(let A=0,I=x.length;A<I;A++){const S=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,P=S.length;M<P;M++){const O=S[M],D=Array.isArray(O.value)?O.value:[O.value];for(let B=0,U=D.length;B<U;B++){const F=D[B],q=v(F),k=y%b,K=k%q.boundary,ot=k+K;y+=K,ot!==0&&b-ot<q.storage&&(y+=b-ot),O.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=q.storage}}}const C=y%b;return C>0&&(y+=b-C),_.__size=y,_.__cache={},this}function v(_){const x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function g(_){const x=_.target;x.removeEventListener("dispose",g);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function m(){for(const _ in i)r.deleteBuffer(i[_]);o=[],i={},s={}}return{bind:c,update:l,dispose:m}}class Pv{constructor(t={}){const{canvas:e=Ed(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const p=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const _=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let b=!1;this._outputColorSpace=nn;let C=0,A=0,I=null,S=-1,M=null;const P=new Ee,O=new Ee;let D=null;const B=new ee(0);let U=0,F=e.width,q=e.height,k=1,K=null,ot=null;const ft=new Ee(0,0,F,q),st=new Ee(0,0,F,q);let Xt=!1;const Zt=new ja;let Jt=!1,$=!1;const et=new _e,bt=new L,Ut=new Ee,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ie=!1;function pe(){return I===null?k:1}let N=n;function it(T,V){return e.getContext(T,V)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Oa}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",ct,!1),N===null){const V="webgl2";if(N=it(V,T),N===null)throw it(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Q,J,Z,pt,rt,mt,qt,Ht,R,w,H,Y,nt,j,Nt,dt,Lt,It,at,wt,Vt,Ft,yt,$t;function z(){Q=new kg(N),Q.init(),Ft=new wv(N,Q),J=new Dg(N,Q,t,Ft),Z=new xv(N,Q),J.reversedDepthBuffer&&d&&Z.buffers.depth.setReversed(!0),pt=new Hg(N),rt=new av,mt=new Mv(N,Q,Z,rt,J,Ft,pt),qt=new Fg(y),Ht=new zg(y),R=new $f(N),yt=new Lg(N,R),w=new Vg(N,R,pt,yt),H=new Xg(N,w,R,pt),at=new Wg(N,J,mt),dt=new Ng(rt),Y=new ov(y,qt,Ht,Q,J,yt,dt),nt=new Av(y,rt),j=new lv,Nt=new mv(Q),It=new Pg(y,qt,Ht,Z,H,f,c),Lt=new _v(y,H,J),$t=new Rv(N,pt,J,Z),wt=new Ig(N,Q,pt),Vt=new Gg(N,Q,pt),pt.programs=Y.programs,y.capabilities=J,y.extensions=Q,y.properties=rt,y.renderLists=j,y.shadowMap=Lt,y.state=Z,y.info=pt}z();const ht=new Tv(y,N);this.xr=ht,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const T=Q.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Q.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(T){T!==void 0&&(k=T,this.setSize(F,q,!1))},this.getSize=function(T){return T.set(F,q)},this.setSize=function(T,V,W=!0){if(ht.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=T,q=V,e.width=Math.floor(T*k),e.height=Math.floor(V*k),W===!0&&(e.style.width=T+"px",e.style.height=V+"px"),this.setViewport(0,0,T,V)},this.getDrawingBufferSize=function(T){return T.set(F*k,q*k).floor()},this.setDrawingBufferSize=function(T,V,W){F=T,q=V,k=W,e.width=Math.floor(T*W),e.height=Math.floor(V*W),this.setViewport(0,0,T,V)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(ft)},this.setViewport=function(T,V,W,X){T.isVector4?ft.set(T.x,T.y,T.z,T.w):ft.set(T,V,W,X),Z.viewport(P.copy(ft).multiplyScalar(k).round())},this.getScissor=function(T){return T.copy(st)},this.setScissor=function(T,V,W,X){T.isVector4?st.set(T.x,T.y,T.z,T.w):st.set(T,V,W,X),Z.scissor(O.copy(st).multiplyScalar(k).round())},this.getScissorTest=function(){return Xt},this.setScissorTest=function(T){Z.setScissorTest(Xt=T)},this.setOpaqueSort=function(T){K=T},this.setTransparentSort=function(T){ot=T},this.getClearColor=function(T){return T.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor(...arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha(...arguments)},this.clear=function(T=!0,V=!0,W=!0){let X=0;if(T){let G=!1;if(I!==null){const lt=I.texture.format;G=lt===Ha||lt===Ga||lt===Va}if(G){const lt=I.texture.type,Mt=lt===Dn||lt===bi||lt===As||lt===Rs||lt===za||lt===ka,Rt=It.getClearColor(),Et=It.getClearAlpha(),kt=Rt.r,Gt=Rt.g,Ot=Rt.b;Mt?(p[0]=kt,p[1]=Gt,p[2]=Ot,p[3]=Et,N.clearBufferuiv(N.COLOR,0,p)):(v[0]=kt,v[1]=Gt,v[2]=Ot,v[3]=Et,N.clearBufferiv(N.COLOR,0,v))}else X|=N.COLOR_BUFFER_BIT}V&&(X|=N.DEPTH_BUFFER_BIT),W&&(X|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),It.dispose(),j.dispose(),Nt.dispose(),rt.dispose(),qt.dispose(),Ht.dispose(),H.dispose(),yt.dispose(),$t.dispose(),Y.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",wn),ht.removeEventListener("sessionend",gc),ci.stop()};function gt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const T=pt.autoReset,V=Lt.enabled,W=Lt.autoUpdate,X=Lt.needsUpdate,G=Lt.type;z(),pt.autoReset=T,Lt.enabled=V,Lt.autoUpdate=W,Lt.needsUpdate=X,Lt.type=G}function ct(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function tt(T){const V=T.target;V.removeEventListener("dispose",tt),Dt(V)}function Dt(T){Yt(T),rt.remove(T)}function Yt(T){const V=rt.get(T).programs;V!==void 0&&(V.forEach(function(W){Y.releaseProgram(W)}),T.isShaderMaterial&&Y.releaseShaderCache(T))}this.renderBufferDirect=function(T,V,W,X,G,lt){V===null&&(V=Pt);const Mt=G.isMesh&&G.matrixWorld.determinant()<0,Rt=pu(T,V,W,X,G);Z.setMaterial(X,Mt);let Et=W.index,kt=1;if(X.wireframe===!0){if(Et=w.getWireframeAttribute(W),Et===void 0)return;kt=2}const Gt=W.drawRange,Ot=W.attributes.position;let se=Gt.start*kt,he=(Gt.start+Gt.count)*kt;lt!==null&&(se=Math.max(se,lt.start*kt),he=Math.min(he,(lt.start+lt.count)*kt)),Et!==null?(se=Math.max(se,0),he=Math.min(he,Et.count)):Ot!=null&&(se=Math.max(se,0),he=Math.min(he,Ot.count));const Se=he-se;if(Se<0||Se===1/0)return;yt.setup(G,X,Rt,W,Et);let ge,fe=wt;if(Et!==null&&(ge=R.get(Et),fe=Vt,fe.setIndex(ge)),G.isMesh)X.wireframe===!0?(Z.setLineWidth(X.wireframeLinewidth*pe()),fe.setMode(N.LINES)):fe.setMode(N.TRIANGLES);else if(G.isLine){let Bt=X.linewidth;Bt===void 0&&(Bt=1),Z.setLineWidth(Bt*pe()),G.isLineSegments?fe.setMode(N.LINES):G.isLineLoop?fe.setMode(N.LINE_LOOP):fe.setMode(N.LINE_STRIP)}else G.isPoints?fe.setMode(N.POINTS):G.isSprite&&fe.setMode(N.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Ns("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),fe.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Q.get("WEBGL_multi_draw"))fe.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Bt=G._multiDrawStarts,xe=G._multiDrawCounts,oe=G._multiDrawCount,Ze=Et?R.get(Et).bytesPerElement:1,Pi=rt.get(X).currentProgram.getUniforms();for(let Je=0;Je<oe;Je++)Pi.setValue(N,"_gl_DrawID",Je),fe.render(Bt[Je]/Ze,xe[Je])}else if(G.isInstancedMesh)fe.renderInstances(se,Se,G.count);else if(W.isInstancedBufferGeometry){const Bt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,xe=Math.min(W.instanceCount,Bt);fe.renderInstances(se,Se,xe)}else fe.render(se,Se)};function me(T,V,W){T.transparent===!0&&T.side===un&&T.forceSinglePass===!1?(T.side=Ye,T.needsUpdate=!0,Ws(T,V,W),T.side=oi,T.needsUpdate=!0,Ws(T,V,W),T.side=un):Ws(T,V,W)}this.compile=function(T,V,W=null){W===null&&(W=T),m=Nt.get(W),m.init(V),x.push(m),W.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),T!==W&&T.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights();const X=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const lt=G.material;if(lt)if(Array.isArray(lt))for(let Mt=0;Mt<lt.length;Mt++){const Rt=lt[Mt];me(Rt,W,G),X.add(Rt)}else me(lt,W,G),X.add(lt)}),m=x.pop(),X},this.compileAsync=function(T,V,W=null){const X=this.compile(T,V,W);return new Promise(G=>{function lt(){if(X.forEach(function(Mt){rt.get(Mt).currentProgram.isReady()&&X.delete(Mt)}),X.size===0){G(T);return}setTimeout(lt,10)}Q.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let le=null;function Fn(T){le&&le(T)}function wn(){ci.stop()}function gc(){ci.start()}const ci=new Bh;ci.setAnimationLoop(Fn),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(T){le=T,ht.setAnimationLoop(T),T===null?ci.stop():ci.start()},ht.addEventListener("sessionstart",wn),ht.addEventListener("sessionend",gc),this.render=function(T,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(V),V=ht.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,V,I),m=Nt.get(T,x.length),m.init(V),x.push(m),et.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Zt.setFromProjectionMatrix(et,Ln,V.reversedDepth),$=this.localClippingEnabled,Jt=dt.init(this.clippingPlanes,$),g=j.get(T,_.length),g.init(),_.push(g),ht.enabled===!0&&ht.isPresenting===!0){const lt=y.xr.getDepthSensingMesh();lt!==null&&Xr(lt,V,-1/0,y.sortObjects)}Xr(T,V,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(K,ot),ie=ht.enabled===!1||ht.isPresenting===!1||ht.hasDepthSensing()===!1,ie&&It.addToRenderList(g,T),this.info.render.frame++,Jt===!0&&dt.beginShadows();const W=m.state.shadowsArray;Lt.render(W,T,V),Jt===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=g.opaque,G=g.transmissive;if(m.setupLights(),V.isArrayCamera){const lt=V.cameras;if(G.length>0)for(let Mt=0,Rt=lt.length;Mt<Rt;Mt++){const Et=lt[Mt];_c(X,G,T,Et)}ie&&It.render(T);for(let Mt=0,Rt=lt.length;Mt<Rt;Mt++){const Et=lt[Mt];vc(g,T,Et,Et.viewport)}}else G.length>0&&_c(X,G,T,V),ie&&It.render(T),vc(g,T,V);I!==null&&A===0&&(mt.updateMultisampleRenderTarget(I),mt.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(y,T,V),yt.resetDefaultState(),S=-1,M=null,x.pop(),x.length>0?(m=x[x.length-1],Jt===!0&&dt.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function Xr(T,V,W,X){if(T.visible===!1)return;if(T.layers.test(V.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(V);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Zt.intersectsSprite(T)){X&&Ut.setFromMatrixPosition(T.matrixWorld).applyMatrix4(et);const Mt=H.update(T),Rt=T.material;Rt.visible&&g.push(T,Mt,Rt,W,Ut.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Zt.intersectsObject(T))){const Mt=H.update(T),Rt=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ut.copy(T.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),Ut.copy(Mt.boundingSphere.center)),Ut.applyMatrix4(T.matrixWorld).applyMatrix4(et)),Array.isArray(Rt)){const Et=Mt.groups;for(let kt=0,Gt=Et.length;kt<Gt;kt++){const Ot=Et[kt],se=Rt[Ot.materialIndex];se&&se.visible&&g.push(T,Mt,se,W,Ut.z,Ot)}}else Rt.visible&&g.push(T,Mt,Rt,W,Ut.z,null)}}const lt=T.children;for(let Mt=0,Rt=lt.length;Mt<Rt;Mt++)Xr(lt[Mt],V,W,X)}function vc(T,V,W,X){const G=T.opaque,lt=T.transmissive,Mt=T.transparent;m.setupLightsView(W),Jt===!0&&dt.setGlobalState(y.clippingPlanes,W),X&&Z.viewport(P.copy(X)),G.length>0&&Hs(G,V,W),lt.length>0&&Hs(lt,V,W),Mt.length>0&&Hs(Mt,V,W),Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),Z.setPolygonOffset(!1)}function _c(T,V,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[X.id]===void 0&&(m.state.transmissionRenderTarget[X.id]=new Ti(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float")?ks:Dn,minFilter:Ei,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ae.workingColorSpace}));const lt=m.state.transmissionRenderTarget[X.id],Mt=X.viewport||P;lt.setSize(Mt.z*y.transmissionResolutionScale,Mt.w*y.transmissionResolutionScale);const Rt=y.getRenderTarget(),Et=y.getActiveCubeFace(),kt=y.getActiveMipmapLevel();y.setRenderTarget(lt),y.getClearColor(B),U=y.getClearAlpha(),U<1&&y.setClearColor(16777215,.5),y.clear(),ie&&It.render(W);const Gt=y.toneMapping;y.toneMapping=ri;const Ot=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),m.setupLightsView(X),Jt===!0&&dt.setGlobalState(y.clippingPlanes,X),Hs(T,W,X),mt.updateMultisampleRenderTarget(lt),mt.updateRenderTargetMipmap(lt),Q.has("WEBGL_multisampled_render_to_texture")===!1){let se=!1;for(let he=0,Se=V.length;he<Se;he++){const ge=V[he],fe=ge.object,Bt=ge.geometry,xe=ge.material,oe=ge.group;if(xe.side===un&&fe.layers.test(X.layers)){const Ze=xe.side;xe.side=Ye,xe.needsUpdate=!0,yc(fe,W,X,Bt,xe,oe),xe.side=Ze,xe.needsUpdate=!0,se=!0}}se===!0&&(mt.updateMultisampleRenderTarget(lt),mt.updateRenderTargetMipmap(lt))}y.setRenderTarget(Rt,Et,kt),y.setClearColor(B,U),Ot!==void 0&&(X.viewport=Ot),y.toneMapping=Gt}function Hs(T,V,W){const X=V.isScene===!0?V.overrideMaterial:null;for(let G=0,lt=T.length;G<lt;G++){const Mt=T[G],Rt=Mt.object,Et=Mt.geometry,kt=Mt.group;let Gt=Mt.material;Gt.allowOverride===!0&&X!==null&&(Gt=X),Rt.layers.test(W.layers)&&yc(Rt,V,W,Et,Gt,kt)}}function yc(T,V,W,X,G,lt){T.onBeforeRender(y,V,W,X,G,lt),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(y,V,W,X,T,lt),G.transparent===!0&&G.side===un&&G.forceSinglePass===!1?(G.side=Ye,G.needsUpdate=!0,y.renderBufferDirect(W,V,X,G,T,lt),G.side=oi,G.needsUpdate=!0,y.renderBufferDirect(W,V,X,G,T,lt),G.side=un):y.renderBufferDirect(W,V,X,G,T,lt),T.onAfterRender(y,V,W,X,G,lt)}function Ws(T,V,W){V.isScene!==!0&&(V=Pt);const X=rt.get(T),G=m.state.lights,lt=m.state.shadowsArray,Mt=G.state.version,Rt=Y.getParameters(T,G.state,lt,V,W),Et=Y.getProgramCacheKey(Rt);let kt=X.programs;X.environment=T.isMeshStandardMaterial?V.environment:null,X.fog=V.fog,X.envMap=(T.isMeshStandardMaterial?Ht:qt).get(T.envMap||X.environment),X.envMapRotation=X.environment!==null&&T.envMap===null?V.environmentRotation:T.envMapRotation,kt===void 0&&(T.addEventListener("dispose",tt),kt=new Map,X.programs=kt);let Gt=kt.get(Et);if(Gt!==void 0){if(X.currentProgram===Gt&&X.lightsStateVersion===Mt)return Mc(T,Rt),Gt}else Rt.uniforms=Y.getUniforms(T),T.onBeforeCompile(Rt,y),Gt=Y.acquireProgram(Rt,Et),kt.set(Et,Gt),X.uniforms=Rt.uniforms;const Ot=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ot.clippingPlanes=dt.uniform),Mc(T,Rt),X.needsLights=gu(T),X.lightsStateVersion=Mt,X.needsLights&&(Ot.ambientLightColor.value=G.state.ambient,Ot.lightProbe.value=G.state.probe,Ot.directionalLights.value=G.state.directional,Ot.directionalLightShadows.value=G.state.directionalShadow,Ot.spotLights.value=G.state.spot,Ot.spotLightShadows.value=G.state.spotShadow,Ot.rectAreaLights.value=G.state.rectArea,Ot.ltc_1.value=G.state.rectAreaLTC1,Ot.ltc_2.value=G.state.rectAreaLTC2,Ot.pointLights.value=G.state.point,Ot.pointLightShadows.value=G.state.pointShadow,Ot.hemisphereLights.value=G.state.hemi,Ot.directionalShadowMap.value=G.state.directionalShadowMap,Ot.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ot.spotShadowMap.value=G.state.spotShadowMap,Ot.spotLightMatrix.value=G.state.spotLightMatrix,Ot.spotLightMap.value=G.state.spotLightMap,Ot.pointShadowMap.value=G.state.pointShadowMap,Ot.pointShadowMatrix.value=G.state.pointShadowMatrix),X.currentProgram=Gt,X.uniformsList=null,Gt}function xc(T){if(T.uniformsList===null){const V=T.currentProgram.getUniforms();T.uniformsList=Ir.seqWithValue(V.seq,T.uniforms)}return T.uniformsList}function Mc(T,V){const W=rt.get(T);W.outputColorSpace=V.outputColorSpace,W.batching=V.batching,W.batchingColor=V.batchingColor,W.instancing=V.instancing,W.instancingColor=V.instancingColor,W.instancingMorph=V.instancingMorph,W.skinning=V.skinning,W.morphTargets=V.morphTargets,W.morphNormals=V.morphNormals,W.morphColors=V.morphColors,W.morphTargetsCount=V.morphTargetsCount,W.numClippingPlanes=V.numClippingPlanes,W.numIntersection=V.numClipIntersection,W.vertexAlphas=V.vertexAlphas,W.vertexTangents=V.vertexTangents,W.toneMapping=V.toneMapping}function pu(T,V,W,X,G){V.isScene!==!0&&(V=Pt),mt.resetTextureUnits();const lt=V.fog,Mt=X.isMeshStandardMaterial?V.environment:null,Rt=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:rs,Et=(X.isMeshStandardMaterial?Ht:qt).get(X.envMap||Mt),kt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Gt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ot=!!W.morphAttributes.position,se=!!W.morphAttributes.normal,he=!!W.morphAttributes.color;let Se=ri;X.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Se=y.toneMapping);const ge=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,fe=ge!==void 0?ge.length:0,Bt=rt.get(X),xe=m.state.lights;if(Jt===!0&&($===!0||T!==M)){const He=T===M&&X.id===S;dt.setState(X,T,He)}let oe=!1;X.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==xe.state.version||Bt.outputColorSpace!==Rt||G.isBatchedMesh&&Bt.batching===!1||!G.isBatchedMesh&&Bt.batching===!0||G.isBatchedMesh&&Bt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Bt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Bt.instancing===!1||!G.isInstancedMesh&&Bt.instancing===!0||G.isSkinnedMesh&&Bt.skinning===!1||!G.isSkinnedMesh&&Bt.skinning===!0||G.isInstancedMesh&&Bt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Bt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Bt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Bt.instancingMorph===!1&&G.morphTexture!==null||Bt.envMap!==Et||X.fog===!0&&Bt.fog!==lt||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==dt.numPlanes||Bt.numIntersection!==dt.numIntersection)||Bt.vertexAlphas!==kt||Bt.vertexTangents!==Gt||Bt.morphTargets!==Ot||Bt.morphNormals!==se||Bt.morphColors!==he||Bt.toneMapping!==Se||Bt.morphTargetsCount!==fe)&&(oe=!0):(oe=!0,Bt.__version=X.version);let Ze=Bt.currentProgram;oe===!0&&(Ze=Ws(X,V,G));let Pi=!1,Je=!1,us=!1;const Me=Ze.getUniforms(),an=Bt.uniforms;if(Z.useProgram(Ze.program)&&(Pi=!0,Je=!0,us=!0),X.id!==S&&(S=X.id,Je=!0),Pi||M!==T){Z.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Me.setValue(N,"projectionMatrix",T.projectionMatrix),Me.setValue(N,"viewMatrix",T.matrixWorldInverse);const $e=Me.map.cameraPosition;$e!==void 0&&$e.setValue(N,bt.setFromMatrixPosition(T.matrixWorld)),J.logarithmicDepthBuffer&&Me.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Me.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Je=!0,us=!0)}if(G.isSkinnedMesh){Me.setOptional(N,G,"bindMatrix"),Me.setOptional(N,G,"bindMatrixInverse");const He=G.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),Me.setValue(N,"boneTexture",He.boneTexture,mt))}G.isBatchedMesh&&(Me.setOptional(N,G,"batchingTexture"),Me.setValue(N,"batchingTexture",G._matricesTexture,mt),Me.setOptional(N,G,"batchingIdTexture"),Me.setValue(N,"batchingIdTexture",G._indirectTexture,mt),Me.setOptional(N,G,"batchingColorTexture"),G._colorsTexture!==null&&Me.setValue(N,"batchingColorTexture",G._colorsTexture,mt));const cn=W.morphAttributes;if((cn.position!==void 0||cn.normal!==void 0||cn.color!==void 0)&&at.update(G,W,Ze),(Je||Bt.receiveShadow!==G.receiveShadow)&&(Bt.receiveShadow=G.receiveShadow,Me.setValue(N,"receiveShadow",G.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(an.envMap.value=Et,an.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&V.environment!==null&&(an.envMapIntensity.value=V.environmentIntensity),Je&&(Me.setValue(N,"toneMappingExposure",y.toneMappingExposure),Bt.needsLights&&mu(an,us),lt&&X.fog===!0&&nt.refreshFogUniforms(an,lt),nt.refreshMaterialUniforms(an,X,k,q,m.state.transmissionRenderTarget[T.id]),Ir.upload(N,xc(Bt),an,mt)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ir.upload(N,xc(Bt),an,mt),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Me.setValue(N,"center",G.center),Me.setValue(N,"modelViewMatrix",G.modelViewMatrix),Me.setValue(N,"normalMatrix",G.normalMatrix),Me.setValue(N,"modelMatrix",G.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const He=X.uniformsGroups;for(let $e=0,qr=He.length;$e<qr;$e++){const li=He[$e];$t.update(li,Ze),$t.bind(li,Ze)}}return Ze}function mu(T,V){T.ambientLightColor.needsUpdate=V,T.lightProbe.needsUpdate=V,T.directionalLights.needsUpdate=V,T.directionalLightShadows.needsUpdate=V,T.pointLights.needsUpdate=V,T.pointLightShadows.needsUpdate=V,T.spotLights.needsUpdate=V,T.spotLightShadows.needsUpdate=V,T.rectAreaLights.needsUpdate=V,T.hemisphereLights.needsUpdate=V}function gu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,V,W){const X=rt.get(T);X.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),rt.get(T.texture).__webglTexture=V,rt.get(T.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:W,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,V){const W=rt.get(T);W.__webglFramebuffer=V,W.__useDefaultFramebuffer=V===void 0};const vu=N.createFramebuffer();this.setRenderTarget=function(T,V=0,W=0){I=T,C=V,A=W;let X=!0,G=null,lt=!1,Mt=!1;if(T){const Et=rt.get(T);if(Et.__useDefaultFramebuffer!==void 0)Z.bindFramebuffer(N.FRAMEBUFFER,null),X=!1;else if(Et.__webglFramebuffer===void 0)mt.setupRenderTarget(T);else if(Et.__hasExternalTextures)mt.rebindTextures(T,rt.get(T.texture).__webglTexture,rt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ot=T.depthTexture;if(Et.__boundDepthTexture!==Ot){if(Ot!==null&&rt.has(Ot)&&(T.width!==Ot.image.width||T.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");mt.setupDepthRenderbuffer(T)}}const kt=T.texture;(kt.isData3DTexture||kt.isDataArrayTexture||kt.isCompressedArrayTexture)&&(Mt=!0);const Gt=rt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Gt[V])?G=Gt[V][W]:G=Gt[V],lt=!0):T.samples>0&&mt.useMultisampledRTT(T)===!1?G=rt.get(T).__webglMultisampledFramebuffer:Array.isArray(Gt)?G=Gt[W]:G=Gt,P.copy(T.viewport),O.copy(T.scissor),D=T.scissorTest}else P.copy(ft).multiplyScalar(k).floor(),O.copy(st).multiplyScalar(k).floor(),D=Xt;if(W!==0&&(G=vu),Z.bindFramebuffer(N.FRAMEBUFFER,G)&&X&&Z.drawBuffers(T,G),Z.viewport(P),Z.scissor(O),Z.setScissorTest(D),lt){const Et=rt.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+V,Et.__webglTexture,W)}else if(Mt){const Et=V;for(let kt=0;kt<T.textures.length;kt++){const Gt=rt.get(T.textures[kt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+kt,Gt.__webglTexture,W,Et)}}else if(T!==null&&W!==0){const Et=rt.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Et.__webglTexture,W)}S=-1},this.readRenderTargetPixels=function(T,V,W,X,G,lt,Mt,Rt=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=rt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Mt!==void 0&&(Et=Et[Mt]),Et){Z.bindFramebuffer(N.FRAMEBUFFER,Et);try{const kt=T.textures[Rt],Gt=kt.format,Ot=kt.type;if(!J.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=T.width-X&&W>=0&&W<=T.height-G&&(T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Rt),N.readPixels(V,W,X,G,Ft.convert(Gt),Ft.convert(Ot),lt))}finally{const kt=I!==null?rt.get(I).__webglFramebuffer:null;Z.bindFramebuffer(N.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(T,V,W,X,G,lt,Mt,Rt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=rt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Mt!==void 0&&(Et=Et[Mt]),Et)if(V>=0&&V<=T.width-X&&W>=0&&W<=T.height-G){Z.bindFramebuffer(N.FRAMEBUFFER,Et);const kt=T.textures[Rt],Gt=kt.format,Ot=kt.type;if(!J.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const se=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,se),N.bufferData(N.PIXEL_PACK_BUFFER,lt.byteLength,N.STREAM_READ),T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Rt),N.readPixels(V,W,X,G,Ft.convert(Gt),Ft.convert(Ot),0);const he=I!==null?rt.get(I).__webglFramebuffer:null;Z.bindFramebuffer(N.FRAMEBUFFER,he);const Se=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await bd(N,Se,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,se),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,lt),N.deleteBuffer(se),N.deleteSync(Se),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,V=null,W=0){const X=Math.pow(2,-W),G=Math.floor(T.image.width*X),lt=Math.floor(T.image.height*X),Mt=V!==null?V.x:0,Rt=V!==null?V.y:0;mt.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,W,0,0,Mt,Rt,G,lt),Z.unbindTexture()};const _u=N.createFramebuffer(),yu=N.createFramebuffer();this.copyTextureToTexture=function(T,V,W=null,X=null,G=0,lt=null){lt===null&&(G!==0?(Ns("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),lt=G,G=0):lt=0);let Mt,Rt,Et,kt,Gt,Ot,se,he,Se;const ge=T.isCompressedTexture?T.mipmaps[lt]:T.image;if(W!==null)Mt=W.max.x-W.min.x,Rt=W.max.y-W.min.y,Et=W.isBox3?W.max.z-W.min.z:1,kt=W.min.x,Gt=W.min.y,Ot=W.isBox3?W.min.z:0;else{const cn=Math.pow(2,-G);Mt=Math.floor(ge.width*cn),Rt=Math.floor(ge.height*cn),T.isDataArrayTexture?Et=ge.depth:T.isData3DTexture?Et=Math.floor(ge.depth*cn):Et=1,kt=0,Gt=0,Ot=0}X!==null?(se=X.x,he=X.y,Se=X.z):(se=0,he=0,Se=0);const fe=Ft.convert(V.format),Bt=Ft.convert(V.type);let xe;V.isData3DTexture?(mt.setTexture3D(V,0),xe=N.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(mt.setTexture2DArray(V,0),xe=N.TEXTURE_2D_ARRAY):(mt.setTexture2D(V,0),xe=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,V.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,V.unpackAlignment);const oe=N.getParameter(N.UNPACK_ROW_LENGTH),Ze=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Pi=N.getParameter(N.UNPACK_SKIP_PIXELS),Je=N.getParameter(N.UNPACK_SKIP_ROWS),us=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ge.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ge.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,kt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Gt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ot);const Me=T.isDataArrayTexture||T.isData3DTexture,an=V.isDataArrayTexture||V.isData3DTexture;if(T.isDepthTexture){const cn=rt.get(T),He=rt.get(V),$e=rt.get(cn.__renderTarget),qr=rt.get(He.__renderTarget);Z.bindFramebuffer(N.READ_FRAMEBUFFER,$e.__webglFramebuffer),Z.bindFramebuffer(N.DRAW_FRAMEBUFFER,qr.__webglFramebuffer);for(let li=0;li<Et;li++)Me&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,rt.get(T).__webglTexture,G,Ot+li),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,rt.get(V).__webglTexture,lt,Se+li)),N.blitFramebuffer(kt,Gt,Mt,Rt,se,he,Mt,Rt,N.DEPTH_BUFFER_BIT,N.NEAREST);Z.bindFramebuffer(N.READ_FRAMEBUFFER,null),Z.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(G!==0||T.isRenderTargetTexture||rt.has(T)){const cn=rt.get(T),He=rt.get(V);Z.bindFramebuffer(N.READ_FRAMEBUFFER,_u),Z.bindFramebuffer(N.DRAW_FRAMEBUFFER,yu);for(let $e=0;$e<Et;$e++)Me?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,cn.__webglTexture,G,Ot+$e):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,cn.__webglTexture,G),an?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,He.__webglTexture,lt,Se+$e):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,He.__webglTexture,lt),G!==0?N.blitFramebuffer(kt,Gt,Mt,Rt,se,he,Mt,Rt,N.COLOR_BUFFER_BIT,N.NEAREST):an?N.copyTexSubImage3D(xe,lt,se,he,Se+$e,kt,Gt,Mt,Rt):N.copyTexSubImage2D(xe,lt,se,he,kt,Gt,Mt,Rt);Z.bindFramebuffer(N.READ_FRAMEBUFFER,null),Z.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else an?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(xe,lt,se,he,Se,Mt,Rt,Et,fe,Bt,ge.data):V.isCompressedArrayTexture?N.compressedTexSubImage3D(xe,lt,se,he,Se,Mt,Rt,Et,fe,ge.data):N.texSubImage3D(xe,lt,se,he,Se,Mt,Rt,Et,fe,Bt,ge):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,lt,se,he,Mt,Rt,fe,Bt,ge.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,lt,se,he,ge.width,ge.height,fe,ge.data):N.texSubImage2D(N.TEXTURE_2D,lt,se,he,Mt,Rt,fe,Bt,ge);N.pixelStorei(N.UNPACK_ROW_LENGTH,oe),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ze),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Pi),N.pixelStorei(N.UNPACK_SKIP_ROWS,Je),N.pixelStorei(N.UNPACK_SKIP_IMAGES,us),lt===0&&V.generateMipmaps&&N.generateMipmap(xe),Z.unbindTexture()},this.initRenderTarget=function(T){rt.get(T).__webglFramebuffer===void 0&&mt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?mt.setTextureCube(T,0):T.isData3DTexture?mt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?mt.setTexture2DArray(T,0):mt.setTexture2D(T,0),Z.unbindTexture()},this.resetState=function(){C=0,A=0,I=null,Z.reset(),yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}}class Lv{constructor(t,e,n){this.lodLevels=[],this.currentLOD=0,this.body=t,t.type==="star"?this.mesh=this.createStarMesh(e,n):this.mesh=new xt(e,n),this.mesh.position.copy(t.position),this.mesh.castShadow=!0,this.mesh.receiveShadow=!0,t.type!=="star"&&this.createLODLevels(),t.atmosphere&&this.createAtmosphere()}createStarMesh(t,e){const n=new Eh({color:e.color,size:this.body.radius/1e6,transparent:!0,opacity:1,blending:Oo,depthWrite:!1});return new ef(t,n)}createLODLevels(){const t=new Ge(this.body.radius,64,64),e=new ne({map:this.createProceduralTexture(),roughness:.8,metalness:.2}),n=new xt(t,e);n.visible=!1,this.lodLevels.push(n);const i=new Ge(this.body.radius,32,32),s=new ne({map:this.createProceduralTexture(),roughness:.8,metalness:.2}),o=new xt(i,s);o.visible=!1,this.lodLevels.push(o);const a=new Ge(this.body.radius,16,16),c=new ne({map:this.createProceduralTexture(),roughness:.8,metalness:.2}),l=new xt(a,c);l.visible=!1,this.lodLevels.push(l)}createProceduralTexture(){const t=document.createElement("canvas");t.width=512,t.height=256;const e=t.getContext("2d"),n=e.createLinearGradient(0,0,0,t.height);this.body.type==="planet"?this.body.id==="earth"?(n.addColorStop(0,"#4A90E2"),n.addColorStop(.3,"#7CB342"),n.addColorStop(.6,"#8BC34A"),n.addColorStop(1,"#4A90E2")):this.body.id==="mars"?(n.addColorStop(0,"#D32F2F"),n.addColorStop(.5,"#F57C00"),n.addColorStop(1,"#D32F2F")):this.body.id==="jupiter"?(n.addColorStop(0,"#FFD54F"),n.addColorStop(.3,"#8D6E63"),n.addColorStop(.6,"#A1887F"),n.addColorStop(1,"#FFD54F")):(n.addColorStop(0,"#9E9E9E"),n.addColorStop(.5,"#757575"),n.addColorStop(1,"#9E9E9E")):this.body.type==="moon"?(n.addColorStop(0,"#E0E0E0"),n.addColorStop(.5,"#BDBDBD"),n.addColorStop(1,"#E0E0E0")):this.body.type==="asteroid"?(n.addColorStop(0,"#6D4C41"),n.addColorStop(.5,"#5D4037"),n.addColorStop(1,"#6D4C41")):(n.addColorStop(0,"#FFFFFF"),n.addColorStop(1,"#CCCCCC")),e.fillStyle=n,e.fillRect(0,0,t.width,t.height);for(let s=0;s<1e3;s++){const o=Math.random()*t.width,a=Math.random()*t.height,c=Math.random()*2,l=Math.random()*.5;e.beginPath(),e.arc(o,a,c,0,Math.PI*2),e.fillStyle=`rgba(255, 255, 255, ${l})`,e.fill()}const i=new sn(t);return i.needsUpdate=!0,i}createAtmosphere(){if(!this.body.atmosphere)return;const t=new Ge(this.body.radius+this.body.atmosphere.height,32,32),e=new $n({transparent:!0,side:Ye,uniforms:{c:{value:.5},p:{value:4}},vertexShader:`
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float c;
        uniform float p;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(c - dot(vNormal, vec3(0, 0, 1.0)), p);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `});this.atmosphereMesh=new xt(t,e),this.atmosphereMesh.position.copy(this.body.position)}updateLOD(t){if(this.body.type==="star")return;const e=this.mesh.position.distanceTo(t);let n=0;e>this.body.radius*100?n=2:e>this.body.radius*50?n=1:n=0,n!==this.currentLOD&&(this.currentLOD<this.lodLevels.length&&(this.lodLevels[this.currentLOD].visible=!1,this.lodLevels[this.currentLOD].parent?.remove(this.lodLevels[this.currentLOD])),this.currentLOD=n,this.currentLOD<this.lodLevels.length&&(this.lodLevels[this.currentLOD].visible=!0,this.lodLevels[this.currentLOD].position.copy(this.mesh.position),this.lodLevels[this.currentLOD].rotation.copy(this.mesh.rotation)))}update(t){const e=1e-4*t;this.mesh.rotation.y+=e,this.lodLevels.forEach(n=>{n.rotation.copy(this.mesh.rotation)}),this.atmosphereMesh&&this.atmosphereMesh.position.copy(this.mesh.position)}addToScene(t){t.add(this.mesh),this.lodLevels.forEach(e=>{t.add(e)}),this.atmosphereMesh&&t.add(this.atmosphereMesh),this.orbitLine&&t.add(this.orbitLine)}removeFromScene(t){t.remove(this.mesh),this.lodLevels.forEach(e=>{t.remove(e)}),this.atmosphereMesh&&t.remove(this.atmosphereMesh),this.orbitLine&&t.remove(this.orbitLine)}}class Iv{constructor(){this.noiseGenerator=new Dv}generateCelestialBody(t){let e,n;return t.type==="star"?(e=this.generateStarGeometry(t.radius),n=this.generateStarMaterial()):(e=this.generatePlanetGeometry(t.radius,32,32),n=this.generatePlanetMaterial(t)),new Lv(t,e,n)}generateStarGeometry(t){const e=new Ge(t,16,16),n=e.attributes.position;for(let i=0;i<n.count;i++){const s=n.getX(i),o=n.getY(i),a=n.getZ(i),c=this.noiseGenerator.noise3D(s*.1,o*.1,a*.1)*t*.05,l=Math.sqrt(s*s+o*o+a*a),h=s/l,u=o/l,d=a/l;n.setXYZ(i,h*(t+c),u*(t+c),d*(t+c))}return n.needsUpdate=!0,e.computeVertexNormals(),e}generatePlanetGeometry(t,e,n){const i=new Ge(t,e,n),s=i.attributes.position;for(let o=0;o<s.count;o++){const a=s.getX(o),c=s.getY(o),l=s.getZ(o);let h=0,u=t*.05,d=.01;for(let m=0;m<4;m++)h+=this.noiseGenerator.noise3D(a*d,c*d,l*d)*u,u*=.5,d*=2;const f=Math.sqrt(a*a+c*c+l*l),p=a/f,v=c/f,g=l/f;s.setXYZ(o,p*(t+h),v*(t+h),g*(t+h))}return s.needsUpdate=!0,i.computeVertexNormals(),i}generateStarMaterial(){return new jn({color:16776960})}generatePlanetMaterial(t){const e=this.generateProceduralTexture(t),n=this.generateBumpTexture(t);return this.generateSpecularTexture(t),new ne({map:e,bumpMap:n,bumpScale:t.radius*.001,roughness:this.getRoughnessForBodyType(t.type),metalness:this.getMetalnessForBodyType(t.type)})}generateProceduralTexture(t){const e=document.createElement("canvas");e.width=1024,e.height=512;const n=e.getContext("2d");t.type==="planet"?t.id==="earth"?this.generateEarthTexture(n,e.width,e.height):t.id==="mars"?this.generateMarsTexture(n,e.width,e.height):t.id==="jupiter"?this.generateJupiterTexture(n,e.width,e.height):t.id==="saturn"?this.generateSaturnTexture(n,e.width,e.height):this.generateGenericPlanetTexture(n,e.width,e.height,t):t.type==="moon"?this.generateMoonTexture(n,e.width,e.height):t.type==="asteroid"&&this.generateAsteroidTexture(n,e.width,e.height);const i=new sn(e);return i.needsUpdate=!0,i.wrapS=Oe,i.wrapT=Oe,i}generateEarthTexture(t,e,n){const i=t.createImageData(e,n),s=i.data;for(let o=0;o<n;o++)for(let a=0;a<e;a++){const c=(o*e+a)*4,l=this.noiseGenerator.noise2D(a*.01,o*.01),h=this.noiseGenerator.noise2D(a*.005,o*.005);(l+h*2)/3>.1?(s[c]=34+Math.random()*30,s[c+1]=139+Math.random()*30,s[c+2]=34+Math.random()*30):(s[c]=25+Math.random()*20,s[c+1]=25+Math.random()*50,s[c+2]=112+Math.random()*50),s[c+3]=255}t.putImageData(i,0,0)}generateMarsTexture(t,e,n){const i=t.createImageData(e,n),s=i.data;for(let o=0;o<n;o++)for(let a=0;a<e;a++){const c=(o*e+a)*4,l=this.noiseGenerator.noise2D(a*.02,o*.02),h=this.noiseGenerator.noise2D(a*.01,o*.01),u=(l+h*2)/3,d=193+u*30,f=68+u*20,p=14+u*10;s[c]=Math.max(0,Math.min(255,d)),s[c+1]=Math.max(0,Math.min(255,f)),s[c+2]=Math.max(0,Math.min(255,p)),s[c+3]=255}t.putImageData(i,0,0)}generateJupiterTexture(t,e,n){const i=t.createImageData(e,n),s=i.data;for(let o=0;o<n;o++)for(let a=0;a<e;a++){const c=(o*e+a)*4,l=this.noiseGenerator.noise2D(a*.005,o*.02),h=this.noiseGenerator.noise2D(a*.02,o*.02),u=(l+h*.5)/1.5,d=o/n;let f,p,v;d<.2||d>.8?(f=220+u*20,p=200+u*20,v=180+u*20):d>.4&&d<.6?(f=200+u*30,p=120+u*20,v=80+u*20):(f=180+u*40,p=140+u*30,v=100+u*30),s[c]=Math.max(0,Math.min(255,f)),s[c+1]=Math.max(0,Math.min(255,p)),s[c+2]=Math.max(0,Math.min(255,v)),s[c+3]=255}t.putImageData(i,0,0)}generateSaturnTexture(t,e,n){const i=t.createImageData(e,n),s=i.data;for(let o=0;o<n;o++)for(let a=0;a<e;a++){const c=(o*e+a)*4,l=this.noiseGenerator.noise2D(a*.005,o*.02),h=this.noiseGenerator.noise2D(a*.02,o*.02),u=(l+h*.5)/1.5,d=220+u*30,f=200+u*30,p=160+u*30;s[c]=Math.max(0,Math.min(255,d)),s[c+1]=Math.max(0,Math.min(255,f)),s[c+2]=Math.max(0,Math.min(255,p)),s[c+3]=255}t.putImageData(i,0,0)}generateGenericPlanetTexture(t,e,n,i){const s=t.createImageData(e,n),o=s.data;for(let a=0;a<n;a++)for(let c=0;c<e;c++){const l=(a*e+c)*4,h=this.noiseGenerator.noise2D(c*.01,a*.01),u=this.noiseGenerator.noise2D(c*.005,a*.005),f=128+(h+u*2)/3*50;o[l]=Math.max(0,Math.min(255,f)),o[l+1]=Math.max(0,Math.min(255,f)),o[l+2]=Math.max(0,Math.min(255,f)),o[l+3]=255}t.putImageData(s,0,0)}generateMoonTexture(t,e,n){const i=t.createImageData(e,n),s=i.data;for(let o=0;o<n;o++)for(let a=0;a<e;a++){const c=(o*e+a)*4,l=this.noiseGenerator.noise2D(a*.02,o*.02),h=this.noiseGenerator.noise2D(a*.01,o*.01),d=180+(l+h*2)/3*40;s[c]=Math.max(0,Math.min(255,d)),s[c+1]=Math.max(0,Math.min(255,d)),s[c+2]=Math.max(0,Math.min(255,d)),s[c+3]=255}t.putImageData(i,0,0)}generateAsteroidTexture(t,e,n){const i=t.createImageData(e,n),s=i.data;for(let o=0;o<n;o++)for(let a=0;a<e;a++){const c=(o*e+a)*4,l=this.noiseGenerator.noise2D(a*.05,o*.05),h=this.noiseGenerator.noise2D(a*.02,o*.02),d=100+(l+h*2)/3*50;s[c]=Math.max(0,Math.min(255,d*.8)),s[c+1]=Math.max(0,Math.min(255,d*.6)),s[c+2]=Math.max(0,Math.min(255,d*.4)),s[c+3]=255}t.putImageData(i,0,0)}generateBumpTexture(t){const e=document.createElement("canvas");e.width=512,e.height=256;const n=e.getContext("2d"),i=n.createImageData(e.width,e.height),s=i.data;for(let a=0;a<e.height;a++)for(let c=0;c<e.width;c++){const l=(a*e.width+c)*4,h=this.noiseGenerator.noise2D(c*.05,a*.05),u=Math.floor((h+1)*127.5);s[l]=u,s[l+1]=u,s[l+2]=u,s[l+3]=255}n.putImageData(i,0,0);const o=new sn(e);return o.needsUpdate=!0,o}generateSpecularTexture(t){const e=document.createElement("canvas");e.width=512,e.height=256;const n=e.getContext("2d"),i=n.createImageData(e.width,e.height),s=i.data;for(let a=0;a<e.height;a++)for(let c=0;c<e.width;c++){const l=(a*e.width+c)*4;let h=0;t.id==="earth"?h=this.noiseGenerator.noise2D(c*.01,a*.01)>.1?200:50:t.type==="planet"?h=100:h=50,s[l]=h,s[l+1]=h,s[l+2]=h,s[l+3]=255}n.putImageData(i,0,0);const o=new sn(e);return o.needsUpdate=!0,o}getRoughnessForBodyType(t){switch(t){case"planet":return .8;case"moon":return .9;case"asteroid":return .95;default:return .8}}getMetalnessForBodyType(t){switch(t){case"planet":return .2;case"moon":return .1;case"asteroid":return .3;default:return .2}}generateSkybox(){const t=document.createElement("canvas");t.width=512,t.height=512;const e=t.getContext("2d"),n=[];for(let s=0;s<6;s++){const o=e.createImageData(t.width,t.height),a=o.data;for(let l=0;l<a.length;l+=4)a[l]=0,a[l+1]=0,a[l+2]=0,a[l+3]=255;const c=500;for(let l=0;l<c;l++){const h=Math.floor(Math.random()*t.width),d=(Math.floor(Math.random()*t.height)*t.width+h)*4,f=Math.random()*255;a[d]=f,a[d+1]=f,a[d+2]=f}e.putImageData(o,0,0),n.push(t.toDataURL())}return new Vf().load(n)}}let Dv=class{constructor(){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(Math.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise2D(t,e){const n=.5*(Math.sqrt(3)-1),i=(3-Math.sqrt(3))/6;let s=(t+e)*n;const o=Math.floor(t+s),a=Math.floor(e+s),c=(o+a)*i,l=o-c,h=a-c,u=t-l,d=e-h;let f,p;u>d?(f=1,p=0):(f=0,p=1);const v=u-f+i,g=d-p+i,m=u-1+2*i,_=d-1+2*i,x=o&255,y=a&255;let b=.5-u*u-d*d,C=0;b>=0&&(b*=b,C=b*b*this.dot(this.grad3[this.perm[x+this.perm[y]]%12],u,d));let A=.5-v*v-g*g,I=0;A>=0&&(A*=A,I=A*A*this.dot(this.grad3[this.perm[x+f+this.perm[y+p]]%12],v,g));let S=.5-m*m-_*_,M=0;return S>=0&&(S*=S,M=S*S*this.dot(this.grad3[this.perm[x+1+this.perm[y+1]]%12],m,_)),70*(C+I+M)}noise3D(t,e,n){const i=.3333333333333333,s=1/6;let o=(t+e+n)*i;const a=Math.floor(t+o),c=Math.floor(e+o),l=Math.floor(n+o),h=(a+c+l)*s,u=a-h,d=c-h,f=l-h,p=t-u,v=e-d,g=n-f;let m,_,x,y,b,C;p>=v?v>=g?(m=1,_=0,x=0,y=1,b=1,C=0):p>=g?(m=1,_=0,x=0,y=1,b=0,C=1):(m=0,_=0,x=1,y=1,b=0,C=1):v<g?(m=0,_=0,x=1,y=0,b=1,C=1):p<g?(m=0,_=1,x=0,y=0,b=1,C=1):(m=0,_=1,x=0,y=1,b=1,C=0);const A=p-m+s,I=v-_+s,S=g-x+s,M=p-y+2*s,P=v-b+2*s,O=g-C+2*s,D=p-1+3*s,B=v-1+3*s,U=g-1+3*s,F=a&255,q=c&255,k=l&255;let K=0,ot=.6-p*p-v*v-g*g;ot>=0&&(ot*=ot,K=ot*ot*this.dot(this.grad3[this.perm[F+this.perm[q+this.perm[k]]]%12],p,v,g));let ft=0,st=.6-A*A-I*I-S*S;st>=0&&(st*=st,ft=st*st*this.dot(this.grad3[this.perm[F+m+this.perm[q+_+this.perm[k+x]]]%12],A,I,S));let Xt=0,Zt=.6-M*M-P*P-O*O;Zt>=0&&(Zt*=Zt,Xt=Zt*Zt*this.dot(this.grad3[this.perm[F+y+this.perm[q+b+this.perm[k+C]]]%12],M,P,O));let Jt=0,$=.6-D*D-B*B-U*U;return $>=0&&($*=$,Jt=$*$*this.dot(this.grad3[this.perm[F+1+this.perm[q+1+this.perm[k+1]]]%12],D,B,U)),32*(K+ft+Xt+Jt)}dot(t,e,n,i){return i!==void 0?t[0]*e+t[1]*n+t[2]*i:t[0]*e+t[1]*n}};class Nv{constructor(){this.G=66743e-15,this.AU=149597870700}calculatePosition(t,e){if(t.orbitalElements.period===0)return t.position.clone();const n=t.orbitalElements,i=2*Math.PI/n.period,s=(n.meanAnomalyAtEpoch+i*e)%(2*Math.PI);let o=s;for(let d=0;d<10;d++)o=s+n.eccentricity*Math.sin(o);const a=2*Math.atan2(Math.sqrt(1+n.eccentricity)*Math.sin(o/2),Math.sqrt(1-n.eccentricity)*Math.cos(o/2)),c=n.semiMajorAxis*(1-n.eccentricity*Math.cos(o)),l=c*Math.cos(a),h=c*Math.sin(a),u=new L(l,h,0);return u.applyAxisAngle(new L(0,0,1),n.argumentOfPeriapsis),u.applyAxisAngle(new L(1,0,0),n.inclination),u.applyAxisAngle(new L(0,0,1),n.ascendingNode),t.parentBody,u}calculateVelocity(t,e){if(t.orbitalElements.period===0)return new L(0,0,0);const n=t.orbitalElements,i=2*Math.PI/n.period,s=(n.meanAnomalyAtEpoch+i*e)%(2*Math.PI);let o=s;for(let g=0;g<10;g++)o=s+n.eccentricity*Math.sin(o);const a=2*Math.atan2(Math.sqrt(1+n.eccentricity)*Math.sin(o/2),Math.sqrt(1-n.eccentricity)*Math.cos(o/2)),c=n.semiMajorAxis*(1-n.eccentricity*Math.cos(o)),l=this.getParentMass(t.parentBody),h=Math.sqrt(this.G*l*(2/c-1/n.semiMajorAxis)),u=a+Math.PI/2,d=h*Math.cos(u),f=h*Math.sin(u),p=0,v=new L(d,f,p);return v.applyAxisAngle(new L(0,0,1),n.argumentOfPeriapsis),v.applyAxisAngle(new L(1,0,0),n.inclination),v.applyAxisAngle(new L(0,0,1),n.ascendingNode),v}calculateOrbit(t){const e=[];if(t.orbitalElements.period===0)return{points:e,color:new ee(16777215)};const i=t.orbitalElements;for(let o=0;o<100;o++){const c=o/100*2*Math.PI,l=2*Math.atan2(Math.sqrt(1-i.eccentricity)*Math.sin(c/2),Math.sqrt(1+i.eccentricity)*Math.cos(c/2)),h=i.semiMajorAxis*(1-i.eccentricity*Math.cos(l)),u=h*Math.cos(c),d=h*Math.sin(c),f=new L(u,d,0);f.applyAxisAngle(new L(0,0,1),i.argumentOfPeriapsis),f.applyAxisAngle(new L(1,0,0),i.inclination),f.applyAxisAngle(new L(0,0,1),i.ascendingNode),e.push(f)}let s;switch(t.type){case"planet":s=new ee(43775);break;case"moon":s=new ee(16755200);break;case"asteroid":s=new ee(16711935);break;default:s=new ee(16777215)}return{points:e,color:s}}calculateSOI(t){if(!t.parentBody)return Number.MAX_VALUE;const e=this.getParentMass(t.parentBody);return t.orbitalElements.semiMajorAxis*Math.pow(t.mass/e,2/5)}calculateOrbitalElements(t,e,n){const i=t.length(),s=e.length(),o=s*s/2-this.G*n/i,a=-this.G*n/(2*o),c=new L().crossVectors(t,e),l=c.length(),h=new L().crossVectors(e,c).divideScalar(this.G*n).sub(t.clone().divideScalar(i)),u=h.length(),d=Math.acos(c.z/l),f=new L(0,0,1).cross(c),p=f.length();let v=0;p>0&&(v=Math.acos(f.x/p),f.y<0&&(v=2*Math.PI-v));let g=0;p>0&&u>0&&(g=Math.acos(f.dot(h)/(p*u)),h.z<0&&(g=2*Math.PI-g));let m=0;u>0&&(m=Math.acos(h.dot(t)/(u*i)),t.dot(e)<0&&(m=2*Math.PI-m));const _=2*Math.atan2(Math.sqrt(1-u)*Math.sin(m/2),Math.sqrt(1+u)*Math.cos(m/2)),x=_-u*Math.sin(_),y=2*Math.PI*Math.sqrt(Math.pow(a,3)/(this.G*n));return{semiMajorAxis:a,eccentricity:u,inclination:d,ascendingNode:v,argumentOfPeriapsis:g,meanAnomalyAtEpoch:x,period:y}}getParentMass(t){if(!t)return 1989e27;switch(t){case"sun":return 1989e27;case"earth":return 5972e21;case"mars":return 6417e20;case"jupiter":return 1898e24;case"saturn":return 5683e23;default:return 1989e27}}calculateHillSphere(t){if(!t.parentBody)return Number.MAX_VALUE;const e=this.getParentMass(t.parentBody);return t.orbitalElements.semiMajorAxis*Math.pow(t.mass/(3*e),1/3)}calculateHohmannTransferDeltaV(t,e,n){const i=(t+e)/2,s=Math.sqrt(this.G*n/t),o=Math.sqrt(this.G*n/e),a=Math.sqrt(this.G*n*(2/t-1/i)),c=Math.sqrt(this.G*n*(2/e-1/i)),l=Math.abs(a-s),h=Math.abs(o-c),u=l+h,d=Math.PI*Math.sqrt(Math.pow(i,3)/(this.G*n));return{deltaV1:l,deltaV2:h,totalDeltaV:u,transferTime:d}}}class Fv{constructor(t){this.bodies=new Map,this.bodyData=new Map,this.scene=null,this.camera=null,this.orbitLines=new Map,this.generator=new Iv,this.orbitalMechanics=new Nv,this.timeManager=t,this.timeManager.onTimeChange(e=>{this.updatePositions(e)})}init(t,e){this.scene=t,this.camera=e;const n=this.generator.generateSkybox();t.background=n}async loadFromData(t){for(const e of t.bodies){this.bodyData.set(e.id,e);const n=this.generator.generateCelestialBody(e);this.bodies.set(e.id,n),this.scene&&n.addToScene(this.scene),this.createOrbitLine(e)}}async loadFromFile(t){try{const n=await(await fetch(t)).json();await this.loadFromData(n)}catch(e){console.error(`Failed to load celestial bodies from ${t}:`,e)}}update(t){if(this.timeManager.update(t),this.camera){const e=new L;this.camera.getWorldPosition(e),this.bodies.forEach(n=>{n.updateLOD(e)})}this.bodies.forEach(e=>{e.update(t)})}updatePositions(t){this.bodies.forEach((e,n)=>{const i=this.bodyData.get(n);if(!i)return;const s=this.orbitalMechanics.calculatePosition(i,t),o=this.timeManager.scalePositionForRender(s);e.mesh.position.copy(o),e.lodLevels.forEach(a=>{a.position.copy(o)}),e.atmosphereMesh&&e.atmosphereMesh.position.copy(o)})}createOrbitLine(t){if(t.orbitalElements.period===0)return;const e=this.orbitalMechanics.calculateOrbit(t),n=e.points.map(a=>this.timeManager.scalePositionForRender(a)),i=new Be().setFromPoints(n),s=new Sh({color:e.color,opacity:.5,transparent:!0}),o=new tf(i,s);this.scene&&this.scene.add(o),this.orbitLines.set(t.id,o)}getBody(t){return this.bodies.get(t)}getAllBodies(){return Array.from(this.bodies.values())}getBodiesByType(t){return Array.from(this.bodies.values()).filter(e=>e.body.type===t)}getBodyData(t){return this.bodyData.get(t)}focusOnBody(t){const e=this.bodies.get(t);if(!e||!this.camera)return;const n=e.mesh.position.clone(),i=e.body.radius,s=Math.max(i*5,i*1e-4);this.camera.position.set(n.x+s,n.y+s*.5,n.z+s),this.camera.lookAt(n)}toggleOrbitLines(t){const e=t!==void 0?t:!this.areOrbitLinesVisible();this.orbitLines.forEach(n=>{n.visible=e})}areOrbitLinesVisible(){if(this.orbitLines.size===0)return!1;const t=this.orbitLines.values().next().value;return t?t.visible:!1}setBodyVisibility(t,e){const n=this.bodies.get(t);n&&(n.mesh.visible=e,n.lodLevels.forEach(i=>{i.visible=e&&i===n.lodLevels[n.currentLOD]}),n.atmosphereMesh&&(n.atmosphereMesh.visible=e))}getOrbitalMechanics(){return this.orbitalMechanics}getTimeManager(){return this.timeManager}dispose(){this.scene&&(this.bodies.forEach(t=>{t.removeFromScene(this.scene)}),this.orbitLines.forEach(t=>{this.scene.remove(t)})),this.bodies.clear(),this.bodyData.clear(),this.orbitLines.clear()}}class Hh{constructor(t,e,n=document.body){this.movementSpeed=10,this.rotationSpeed=.005,this.zoomSpeed=.1,this.yaw=0,this.pitch=0,this.isPointerLocked=!1,this.moveForward=!1,this.moveBackward=!1,this.moveLeft=!1,this.moveRight=!1,this.moveUp=!1,this.moveDown=!1,this.velocity=new L,this.direction=new L,this.camera=t,this.inputManager=e,this.domElement=n,this.updateRotationFromCamera(),this.setupEventListeners()}update(t){this.updateMovementState(),this.isPointerLocked&&this.updateRotation(),this.updatePosition(t),this.applyRotationToCamera()}enablePointerLock(){this.domElement.requestPointerLock()}disablePointerLock(){document.exitPointerLock()}setMovementSpeed(t){this.movementSpeed=t}setRotationSpeed(t){this.rotationSpeed=t}setZoomSpeed(t){this.zoomSpeed=t}getCamera(){return this.camera}setupEventListeners(){document.addEventListener("pointerlockchange",this.onPointerLockChange.bind(this)),document.addEventListener("pointerlockerror",()=>{console.error("PointerLock error")}),this.domElement.addEventListener("click",()=>{this.isPointerLocked||this.enablePointerLock()}),this.inputManager.addEventListener("keyDown",t=>{switch(t){case"KeyW":case"ArrowUp":this.moveForward=!0;break;case"KeyS":case"ArrowDown":this.moveBackward=!0;break;case"KeyA":case"ArrowLeft":this.moveLeft=!0;break;case"KeyD":case"ArrowRight":this.moveRight=!0;break;case"Space":this.moveUp=!0;break;case"ShiftLeft":case"ShiftRight":this.moveDown=!0;break;case"Escape":this.isPointerLocked&&this.disablePointerLock();break}}),this.inputManager.addEventListener("keyUp",t=>{switch(t){case"KeyW":case"ArrowUp":this.moveForward=!1;break;case"KeyS":case"ArrowDown":this.moveBackward=!1;break;case"KeyA":case"ArrowLeft":this.moveLeft=!1;break;case"KeyD":case"ArrowRight":this.moveRight=!1;break;case"Space":this.moveUp=!1;break;case"ShiftLeft":case"ShiftRight":this.moveDown=!1;break}}),this.inputManager.addEventListener("wheel",(t,e)=>{const n=e*this.zoomSpeed;this.camera.fov=Rc.clamp(this.camera.fov+n,10,120),this.camera.updateProjectionMatrix()})}onPointerLockChange(){this.isPointerLocked=document.pointerLockElement===this.domElement}updateMovementState(){this.velocity.x-=this.velocity.x*10*.016,this.velocity.z-=this.velocity.z*10*.016,this.velocity.y-=this.velocity.y*10*.016,this.direction.z=Number(this.moveForward)-Number(this.moveBackward),this.direction.x=Number(this.moveRight)-Number(this.moveLeft),this.direction.y=Number(this.moveUp)-Number(this.moveDown),this.direction.normalize(),(this.moveForward||this.moveBackward)&&(this.velocity.z-=this.direction.z*this.movementSpeed*.016),(this.moveLeft||this.moveRight)&&(this.velocity.x-=this.direction.x*this.movementSpeed*.016),(this.moveUp||this.moveDown)&&(this.velocity.y-=this.direction.y*this.movementSpeed*.016)}updateRotation(){const t=this.inputManager.getMouseDelta();this.yaw-=t.x*this.rotationSpeed,this.pitch-=t.y*this.rotationSpeed,this.pitch=Rc.clamp(this.pitch,-Math.PI/2,Math.PI/2)}updatePosition(t){const e=new L,n=new L,i=new L(0,1,0);this.camera.getWorldDirection(e),e.y=0,e.normalize(),n.crossVectors(e,i).normalize();const s=new L;s.addScaledVector(e,-this.velocity.z),s.addScaledVector(n,-this.velocity.x),s.y+=this.velocity.y,this.camera.position.addScaledVector(s,t)}applyRotationToCamera(){const t=new Mn;t.setFromEuler(new dn(this.pitch,this.yaw,0,"YXZ")),this.camera.quaternion.copy(t)}updateRotationFromCamera(){const t=new dn().setFromQuaternion(this.camera.quaternion,"YXZ");this.yaw=t.y,this.pitch=t.x}}class ic{constructor(){this.keyboardState={},this.mouseState={x:0,y:0,deltaX:0,deltaY:0,leftButton:!1,middleButton:!1,rightButton:!1},this.previousMouseState={...this.mouseState},this.eventListeners=new Map}init(){window.addEventListener("keydown",this.handleKeyDown.bind(this)),window.addEventListener("keyup",this.handleKeyUp.bind(this)),window.addEventListener("mousedown",this.handleMouseDown.bind(this)),window.addEventListener("mouseup",this.handleMouseUp.bind(this)),window.addEventListener("mousemove",this.handleMouseMove.bind(this)),window.addEventListener("wheel",this.handleWheel.bind(this)),window.addEventListener("contextmenu",t=>t.preventDefault()),console.log("Input manager initialized")}update(){this.previousMouseState={...this.mouseState},this.mouseState.deltaX=0,this.mouseState.deltaY=0}isKeyDown(t){return this.keyboardState[t]||!1}isKeyPressed(t){return this.keyboardState[t]||!1}isMouseButtonPressed(t){switch(t){case"left":return this.mouseState.leftButton&&!this.previousMouseState.leftButton;case"middle":return this.mouseState.middleButton&&!this.previousMouseState.middleButton;case"right":return this.mouseState.rightButton&&!this.previousMouseState.rightButton;default:return!1}}isMouseButtonDown(t){switch(t){case"left":return this.mouseState.leftButton;case"middle":return this.mouseState.middleButton;case"right":return this.mouseState.rightButton;default:return!1}}getMousePosition(){return{x:this.mouseState.x,y:this.mouseState.y}}getMouseDelta(){return{x:this.mouseState.deltaX,y:this.mouseState.deltaY}}addEventListener(t,e){this.eventListeners.has(t)||this.eventListeners.set(t,[]),this.eventListeners.get(t)?.push(e)}removeEventListener(t,e){const n=this.eventListeners.get(t);if(n){const i=n.indexOf(e);i!==-1&&n.splice(i,1)}}handleKeyDown(t){const e=t.code;this.keyboardState[e]=!0;const n=this.eventListeners.get("keyDown");n&&n.forEach(i=>i(e))}handleKeyUp(t){const e=t.code;this.keyboardState[e]=!1;const n=this.eventListeners.get("keyUp");n&&n.forEach(i=>i(e))}handleMouseDown(t){switch(t.button){case 0:this.mouseState.leftButton=!0;break;case 1:this.mouseState.middleButton=!0;break;case 2:this.mouseState.rightButton=!0;break}const e=this.eventListeners.get("mouseDown");e&&e.forEach(n=>n(t.button,t.clientX,t.clientY))}handleMouseUp(t){switch(t.button){case 0:this.mouseState.leftButton=!1;break;case 1:this.mouseState.middleButton=!1;break;case 2:this.mouseState.rightButton=!1;break}const e=this.eventListeners.get("mouseUp");e&&e.forEach(n=>n(t.button,t.clientX,t.clientY))}handleMouseMove(t){const e=t.clientX-this.mouseState.x,n=t.clientY-this.mouseState.y;this.mouseState.x=t.clientX,this.mouseState.y=t.clientY,this.mouseState.deltaX=e,this.mouseState.deltaY=n;const i=this.eventListeners.get("mouseMove");i&&i.forEach(s=>s(t.clientX,t.clientY,e,n))}handleWheel(t){t.preventDefault();const e=this.eventListeners.get("wheel");e&&e.forEach(n=>n(t.deltaX,t.deltaY))}}class Uv{constructor(t,e,n){this.isVisible=!0,this.timeManager=t,this.celestialBodiesManager=e,this.cameraController=n,this.container=document.createElement("div"),this.container.id="space-ui",this.container.style.position="absolute",this.container.style.top="0",this.container.style.left="0",this.container.style.width="100%",this.container.style.height="100%",this.container.style.pointerEvents="none",this.container.style.zIndex="1000",this.createUI(),this.setupEventListeners(),document.body.appendChild(this.container)}createUI(){this.createTimePanel(),this.createControlsPanel(),this.createInfoPanel()}createTimePanel(){this.timePanel=document.createElement("div"),this.timePanel.style.position="absolute",this.timePanel.style.top="10px",this.timePanel.style.left="10px",this.timePanel.style.backgroundColor="rgba(0, 0, 0, 0.7)",this.timePanel.style.color="white",this.timePanel.style.padding="10px",this.timePanel.style.borderRadius="5px",this.timePanel.style.pointerEvents="auto",this.timePanel.style.fontFamily="Arial, sans-serif",this.timePanel.style.fontSize="14px";const t=document.createElement("h3");t.textContent="Time Controls",t.style.margin="0 0 10px 0",this.timePanel.appendChild(t);const e=document.createElement("label");e.textContent="Time Scale: ",e.style.display="block",e.style.marginBottom="5px",this.timePanel.appendChild(e),this.timeScaleSelect=document.createElement("select"),this.timeScaleSelect.style.width="100%",this.timeScaleSelect.style.marginBottom="10px",this.timeScaleSelect.style.padding="5px",[{value:"paused",label:"Paused"},{value:"realtime",label:"Real-time"},{value:"minutes",label:"Minutes/second"},{value:"hours",label:"Hours/second"},{value:"days",label:"Days/second"},{value:"weeks",label:"Weeks/second"},{value:"months",label:"Months/second"},{value:"years",label:"Years/second"}].forEach(s=>{const o=document.createElement("option");o.value=s.value,o.textContent=s.label,this.timeScaleSelect.appendChild(o)}),this.timeScaleSelect.value=this.timeManager.getTimeScale(),this.timePanel.appendChild(this.timeScaleSelect);const i=document.createElement("label");i.textContent="Current Time: ",i.style.display="block",i.style.marginBottom="5px",this.timePanel.appendChild(i),this.currentTimeDisplay=document.createElement("div"),this.currentTimeDisplay.style.marginBottom="10px",this.currentTimeDisplay.style.fontFamily="monospace",this.updateTimeDisplay(),this.timePanel.appendChild(this.currentTimeDisplay),this.pauseButton=document.createElement("button"),this.pauseButton.textContent="Pause",this.pauseButton.style.width="100%",this.pauseButton.style.padding="5px",this.pauseButton.style.backgroundColor="#4CAF50",this.pauseButton.style.color="white",this.pauseButton.style.border="none",this.pauseButton.style.borderRadius="3px",this.pauseButton.style.cursor="pointer",this.updatePauseButton(),this.timePanel.appendChild(this.pauseButton),this.container.appendChild(this.timePanel)}createControlsPanel(){this.controlsPanel=document.createElement("div"),this.controlsPanel.style.position="absolute",this.controlsPanel.style.top="10px",this.controlsPanel.style.right="10px",this.controlsPanel.style.backgroundColor="rgba(0, 0, 0, 0.7)",this.controlsPanel.style.color="white",this.controlsPanel.style.padding="10px",this.controlsPanel.style.borderRadius="5px",this.controlsPanel.style.pointerEvents="auto",this.controlsPanel.style.fontFamily="Arial, sans-serif",this.controlsPanel.style.fontSize="14px";const t=document.createElement("h3");t.textContent="Camera Controls",t.style.margin="0 0 10px 0",this.controlsPanel.appendChild(t);const e=document.createElement("label");e.textContent="Focus on Body: ",e.style.display="block",e.style.marginBottom="5px",this.controlsPanel.appendChild(e),this.bodySelect=document.createElement("select"),this.bodySelect.style.width="100%",this.bodySelect.style.marginBottom="10px",this.bodySelect.style.padding="5px";const n=document.createElement("option");n.value="",n.textContent="None",this.bodySelect.appendChild(n),this.celestialBodiesManager.getAllBodies().forEach(s=>{const o=document.createElement("option");o.value=s.body.id,o.textContent=s.body.name,this.bodySelect.appendChild(o)}),this.controlsPanel.appendChild(this.bodySelect),this.focusButton=document.createElement("button"),this.focusButton.textContent="Focus Camera",this.focusButton.style.width="100%",this.focusButton.style.marginBottom="10px",this.focusButton.style.padding="5px",this.focusButton.style.backgroundColor="#2196F3",this.focusButton.style.color="white",this.focusButton.style.border="none",this.focusButton.style.borderRadius="3px",this.focusButton.style.cursor="pointer",this.controlsPanel.appendChild(this.focusButton),this.toggleOrbitsButton=document.createElement("button"),this.toggleOrbitsButton.textContent="Toggle Orbits",this.toggleOrbitsButton.style.width="100%",this.toggleOrbitsButton.style.padding="5px",this.toggleOrbitsButton.style.backgroundColor="#FF9800",this.toggleOrbitsButton.style.color="white",this.toggleOrbitsButton.style.border="none",this.toggleOrbitsButton.style.borderRadius="3px",this.toggleOrbitsButton.style.cursor="pointer",this.controlsPanel.appendChild(this.toggleOrbitsButton),this.container.appendChild(this.controlsPanel)}createInfoPanel(){this.infoPanel=document.createElement("div"),this.infoPanel.style.position="absolute",this.infoPanel.style.bottom="10px",this.infoPanel.style.left="10px",this.infoPanel.style.backgroundColor="rgba(0, 0, 0, 0.7)",this.infoPanel.style.color="white",this.infoPanel.style.padding="10px",this.infoPanel.style.borderRadius="5px",this.infoPanel.style.pointerEvents="auto",this.infoPanel.style.fontFamily="Arial, sans-serif",this.infoPanel.style.fontSize="14px",this.infoPanel.style.minWidth="250px";const t=document.createElement("h3");t.textContent="Information",t.style.margin="0 0 10px 0",this.infoPanel.appendChild(t),this.focusedBodyInfo=document.createElement("div"),this.focusedBodyInfo.style.marginBottom="10px",this.focusedBodyInfo.innerHTML="<p>No body focused</p>",this.infoPanel.appendChild(this.focusedBodyInfo),this.cameraInfo=document.createElement("div"),this.cameraInfo.innerHTML="<p>Camera: Free movement</p>",this.infoPanel.appendChild(this.cameraInfo),this.container.appendChild(this.infoPanel)}setupEventListeners(){this.timeScaleSelect.addEventListener("change",()=>{this.timeManager.setTimeScale(this.timeScaleSelect.value),this.updatePauseButton()}),this.pauseButton.addEventListener("click",()=>{this.timeManager.getTimeScale()==="paused"?this.timeManager.setTimeScale("realtime"):this.timeManager.setTimeScale("paused"),this.updatePauseButton(),this.timeScaleSelect.value=this.timeManager.getTimeScale()}),this.focusButton.addEventListener("click",()=>{const t=this.bodySelect.value;t&&(this.celestialBodiesManager.focusOnBody(t),this.updateFocusedBodyInfo(t))}),this.toggleOrbitsButton.addEventListener("click",()=>{this.celestialBodiesManager.toggleOrbitLines()}),this.timeManager.onTimeChange(()=>{this.updateTimeDisplay()}),document.addEventListener("keydown",t=>{if(this.isVisible)switch(t.key){case" ":t.preventDefault(),this.pauseButton.click();break;case"o":case"O":this.toggleOrbitsButton.click();break}})}updateTimeDisplay(){const t=this.timeManager.getCurrentTime(),e=new Date(t*1e3);this.currentTimeDisplay.textContent=e.toISOString()}updatePauseButton(){this.timeManager.getTimeScale()==="paused"?(this.pauseButton.textContent="Resume",this.pauseButton.style.backgroundColor="#4CAF50"):(this.pauseButton.textContent="Pause",this.pauseButton.style.backgroundColor="#f44336")}updateFocusedBodyInfo(t){const e=this.celestialBodiesManager.getBodyData(t);if(!e)return;let n=`<p><strong>${e.name}</strong></p>`;n+=`<p>Type: ${e.type}</p>`,n+=`<p>Radius: ${this.timeManager.formatDistance(e.radius)}</p>`,n+=`<p>Mass: ${e.mass.toExponential(2)} kg</p>`,e.orbitalElements.period>0&&(n+=`<p>Orbital Period: ${this.timeManager.formatDuration(e.orbitalElements.period)}</p>`,n+=`<p>Semi-major Axis: ${this.timeManager.formatDistance(e.orbitalElements.semiMajorAxis)}</p>`),e.atmosphere&&(n+=`<p>Atmosphere: Yes (${this.timeManager.formatDistance(e.atmosphere.height)} height)</p>`),this.focusedBodyInfo.innerHTML=n}update(){if(this.cameraController){const e=this.cameraController.getCamera().position,n=this.timeManager.formatDistance(e.length());this.cameraInfo.innerHTML=`<p>Camera Distance: ${n}</p>`}}setVisible(t){this.isVisible=t,this.container.style.display=t?"block":"none"}toggleVisible(){this.setVisible(!this.isVisible)}dispose(){this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}class yn{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new E);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new E);const n=this.elements,i=t.x,s=t.y,o=t.z;return e.x=n[0]*i+n[1]*s+n[2]*o,e.y=n[3]*i+n[4]*s+n[5]*o,e.z=n[6]*i+n[7]*s+n[8]*o,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new yn);const n=this.elements,i=t.elements,s=e.elements,o=n[0],a=n[1],c=n[2],l=n[3],h=n[4],u=n[5],d=n[6],f=n[7],p=n[8],v=i[0],g=i[1],m=i[2],_=i[3],x=i[4],y=i[5],b=i[6],C=i[7],A=i[8];return s[0]=o*v+a*_+c*b,s[1]=o*g+a*x+c*C,s[2]=o*m+a*y+c*A,s[3]=l*v+h*_+u*b,s[4]=l*g+h*x+u*C,s[5]=l*m+h*y+u*A,s[6]=d*v+f*_+p*b,s[7]=d*g+f*x+p*C,s[8]=d*m+f*y+p*A,e}scale(t,e){e===void 0&&(e=new yn);const n=this.elements,i=e.elements;for(let s=0;s!==3;s++)i[3*s+0]=t.x*n[3*s+0],i[3*s+1]=t.y*n[3*s+1],i[3*s+2]=t.z*n[3*s+2];return e}solve(t,e){e===void 0&&(e=new E);const n=3,i=4,s=[];let o,a;for(o=0;o<n*i;o++)s.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)s[o+i*a]=this.elements[o+3*a];s[3]=t.x,s[7]=t.y,s[11]=t.z;let c=3;const l=c;let h;const u=4;let d;do{if(o=l-c,s[o+i*o]===0){for(a=o+1;a<l;a++)if(s[o+i*a]!==0){h=u;do d=u-h,s[d+i*o]+=s[d+i*a];while(--h);break}}if(s[o+i*o]!==0)for(a=o+1;a<l;a++){const f=s[o+i*a]/s[o+i*o];h=u;do d=u-h,s[d+i*a]=d<=o?0:s[d+i*a]-s[d+i*o]*f;while(--h)}}while(--c);if(e.z=s[2*i+3]/s[2*i+2],e.y=(s[1*i+3]-s[1*i+2]*e.z)/s[1*i+1],e.x=(s[0*i+3]-s[0*i+2]*e.z-s[0*i+1]*e.y)/s[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";for(let n=0;n<9;n++)t+=this.elements[n]+",";return t}reverse(t){t===void 0&&(t=new yn);const e=3,n=6,i=Ov;let s,o;for(s=0;s<3;s++)for(o=0;o<3;o++)i[s+n*o]=this.elements[s+3*o];i[3]=1,i[9]=0,i[15]=0,i[4]=0,i[10]=1,i[16]=0,i[5]=0,i[11]=0,i[17]=1;let a=3;const c=a;let l;const h=n;let u;do{if(s=c-a,i[s+n*s]===0){for(o=s+1;o<c;o++)if(i[s+n*o]!==0){l=h;do u=h-l,i[u+n*s]+=i[u+n*o];while(--l);break}}if(i[s+n*s]!==0)for(o=s+1;o<c;o++){const d=i[s+n*o]/i[s+n*s];l=h;do u=h-l,i[u+n*o]=u<=s?0:i[u+n*o]-i[u+n*s]*d;while(--l)}}while(--a);s=2;do{o=s-1;do{const d=i[s+n*o]/i[s+n*s];l=n;do u=n-l,i[u+n*o]=i[u+n*o]-i[u+n*s]*d;while(--l)}while(o--)}while(--s);s=2;do{const d=1/i[s+n*s];l=n;do u=n-l,i[u+n*s]=i[u+n*s]*d;while(--l)}while(s--);s=2;do{o=2;do{if(u=i[e+o+n*s],isNaN(u)||u===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(s,o,u)}while(o--)}while(s--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,s=t.w,o=e+e,a=n+n,c=i+i,l=e*o,h=e*a,u=e*c,d=n*a,f=n*c,p=i*c,v=s*o,g=s*a,m=s*c,_=this.elements;return _[0]=1-(d+p),_[1]=h-m,_[2]=u+g,_[3]=h+m,_[4]=1-(l+p),_[5]=f-v,_[6]=u-g,_[7]=f+v,_[8]=1-(l+d),this}transpose(t){t===void 0&&(t=new yn);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const Ov=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class E{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new E);const n=t.x,i=t.y,s=t.z,o=this.x,a=this.y,c=this.z;return e.x=a*s-c*i,e.y=c*n-o*s,e.z=o*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new E(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new E(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new yn([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const s=1/i;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new E);const e=this.x,n=this.y,i=this.z;let s=Math.sqrt(e*e+n*n+i*i);return s>0?(s=1/s,t.x=e*s,t.y=n*s,t.z=i*s):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z;return Math.sqrt((s-e)*(s-e)+(o-n)*(o-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z;return(s-e)*(s-e)+(o-n)*(o-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new E);const n=this.x,i=this.y,s=this.z;return e.x=t*n,e.y=t*i,e.z=t*s,e}vmul(t,e){return e===void 0&&(e=new E),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new E),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new E),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=Bv,s=1/n;i.set(this.x*s,this.y*s,this.z*s);const o=zv;Math.abs(i.x)<.9?(o.set(1,0,0),i.cross(o,t)):(o.set(0,1,0),i.cross(o,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,s=this.y,o=this.z;n.x=i+(t.x-i)*e,n.y=s+(t.y-s)*e,n.z=o+(t.z-o)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(Ll),Ll.almostEquals(t,e)}clone(){return new E(this.x,this.y,this.z)}}E.ZERO=new E(0,0,0);E.UNIT_X=new E(1,0,0);E.UNIT_Y=new E(0,1,0);E.UNIT_Z=new E(0,0,1);const Bv=new E,zv=new E,Ll=new E;class on{constructor(t){t===void 0&&(t={}),this.lowerBound=new E,this.upperBound=new E,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const s=this.lowerBound,o=this.upperBound,a=n;s.copy(t[0]),a&&a.vmult(s,s),o.copy(s);for(let c=1;c<t.length;c++){let l=t[c];a&&(a.vmult(l,Il),l=Il),l.x>o.x&&(o.x=l.x),l.x<s.x&&(s.x=l.x),l.y>o.y&&(o.y=l.y),l.y<s.y&&(s.y=l.y),l.z>o.z&&(o.z=l.z),l.z<s.z&&(s.z=l.z)}return e&&(e.vadd(s,s),e.vadd(o,o)),i&&(s.x-=i,s.y-=i,s.z-=i,o.x+=i,o.y+=i,o.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new on().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound,o=i.x<=n.x&&n.x<=s.x||e.x<=s.x&&s.x<=n.x,a=i.y<=n.y&&n.y<=s.y||e.y<=s.y&&s.y<=n.y,c=i.z<=n.z&&n.z<=s.z||e.z<=s.z&&s.z<=n.z;return o&&a&&c}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound;return e.x<=i.x&&n.x>=s.x&&e.y<=i.y&&n.y>=s.y&&e.z<=i.z&&n.z>=s.z}getCorners(t,e,n,i,s,o,a,c){const l=this.lowerBound,h=this.upperBound;t.copy(l),e.set(h.x,l.y,l.z),n.set(h.x,h.y,l.z),i.set(l.x,h.y,h.z),s.set(h.x,l.y,h.z),o.set(l.x,h.y,l.z),a.set(l.x,l.y,h.z),c.copy(h)}toLocalFrame(t,e){const n=Dl,i=n[0],s=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],u=n[7];this.getCorners(i,s,o,a,c,l,h,u);for(let d=0;d!==8;d++){const f=n[d];t.pointToLocal(f,f)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=Dl,i=n[0],s=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],u=n[7];this.getCorners(i,s,o,a,c,l,h,u);for(let d=0;d!==8;d++){const f=n[d];t.pointToWorld(f,f)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,s=1/e.y,o=1/e.z,a=(this.lowerBound.x-n.x)*i,c=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*s,h=(this.upperBound.y-n.y)*s,u=(this.lowerBound.z-n.z)*o,d=(this.upperBound.z-n.z)*o,f=Math.max(Math.max(Math.min(a,c),Math.min(l,h)),Math.min(u,d)),p=Math.min(Math.min(Math.max(a,c),Math.max(l,h)),Math.max(u,d));return!(p<0||f>p)}}const Il=new E,Dl=[new E,new E,new E,new E,new E,new E,new E,new E];class Nl{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const s=i;i=n,n=s}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:s}=e;if(s>i){const o=s;s=i,i=o}this.matrix[(i*(i+1)>>1)+s-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class Wh{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,s=n.length;i<s;i++)n[i].call(this,t)}return this}}class Ae{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new E),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=kv,i=Vv;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new Ae);const n=this.x,i=this.y,s=this.z,o=this.w,a=t.x,c=t.y,l=t.z,h=t.w;return e.x=n*h+o*a+i*l-s*c,e.y=i*h+o*c+s*a-n*l,e.z=s*h+o*l+n*c-i*a,e.w=o*h-n*a-i*c-s*l,e}inverse(t){t===void 0&&(t=new Ae);const e=this.x,n=this.y,i=this.z,s=this.w;this.conjugate(t);const o=1/(e*e+n*n+i*i+s*s);return t.x*=o,t.y*=o,t.z*=o,t.w*=o,t}conjugate(t){return t===void 0&&(t=new Ae),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new E);const n=t.x,i=t.y,s=t.z,o=this.x,a=this.y,c=this.z,l=this.w,h=l*n+a*s-c*i,u=l*i+c*n-o*s,d=l*s+o*i-a*n,f=-o*n-a*i-c*s;return e.x=h*l+f*-o+u*-c-d*-a,e.y=u*l+f*-a+d*-o-h*-c,e.z=d*l+f*-c+h*-a-u*-o,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,s;const o=this.x,a=this.y,c=this.z,l=this.w;switch(e){case"YZX":const h=o*a+c*l;if(h>.499&&(n=2*Math.atan2(o,l),i=Math.PI/2,s=0),h<-.499&&(n=-2*Math.atan2(o,l),i=-Math.PI/2,s=0),n===void 0){const u=o*o,d=a*a,f=c*c;n=Math.atan2(2*a*l-2*o*c,1-2*d-2*f),i=Math.asin(2*h),s=Math.atan2(2*o*l-2*a*c,1-2*u-2*f)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=s}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const s=Math.cos(t/2),o=Math.cos(e/2),a=Math.cos(n/2),c=Math.sin(t/2),l=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=c*o*a+s*l*h,this.y=s*l*a-c*o*h,this.z=s*o*h+c*l*a,this.w=s*o*a-c*l*h):i==="YXZ"?(this.x=c*o*a+s*l*h,this.y=s*l*a-c*o*h,this.z=s*o*h-c*l*a,this.w=s*o*a+c*l*h):i==="ZXY"?(this.x=c*o*a-s*l*h,this.y=s*l*a+c*o*h,this.z=s*o*h+c*l*a,this.w=s*o*a-c*l*h):i==="ZYX"?(this.x=c*o*a-s*l*h,this.y=s*l*a+c*o*h,this.z=s*o*h-c*l*a,this.w=s*o*a+c*l*h):i==="YZX"?(this.x=c*o*a+s*l*h,this.y=s*l*a+c*o*h,this.z=s*o*h-c*l*a,this.w=s*o*a-c*l*h):i==="XZY"&&(this.x=c*o*a-s*l*h,this.y=s*l*a-c*o*h,this.z=s*o*h+c*l*a,this.w=s*o*a+c*l*h),this}clone(){return new Ae(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new Ae);const i=this.x,s=this.y,o=this.z,a=this.w;let c=t.x,l=t.y,h=t.z,u=t.w,d,f,p,v,g;return f=i*c+s*l+o*h+a*u,f<0&&(f=-f,c=-c,l=-l,h=-h,u=-u),1-f>1e-6?(d=Math.acos(f),p=Math.sin(d),v=Math.sin((1-e)*d)/p,g=Math.sin(e*d)/p):(v=1-e,g=e),n.x=v*i+g*c,n.y=v*s+g*l,n.z=v*o+g*h,n.w=v*a+g*u,n}integrate(t,e,n,i){i===void 0&&(i=new Ae);const s=t.x*n.x,o=t.y*n.y,a=t.z*n.z,c=this.x,l=this.y,h=this.z,u=this.w,d=e*.5;return i.x+=d*(s*u+o*h-a*l),i.y+=d*(o*u+a*c-s*h),i.z+=d*(a*u+s*l-o*c),i.w+=d*(-s*c-o*l-a*h),i}}const kv=new E,Vv=new E,Gv={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class Tt{constructor(t){t===void 0&&(t={}),this.id=Tt.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}Tt.idCounter=0;Tt.types=Gv;class ce{constructor(t){t===void 0&&(t={}),this.position=new E,this.quaternion=new Ae,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return ce.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return ce.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new E),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new E),n.vsub(t,i),e.conjugate(Fl),Fl.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new E),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new E),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new E),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const Fl=new Ae;class Cs extends Tt{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:s,boundingSphereRadius:o}=t;super({type:Tt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new E;for(let s=0;s!==t.length;s++){const o=t[s],a=o.length;for(let c=0;c!==a;c++){const l=(c+1)%a;e[o[c]].vsub(e[o[l]],i),i.normalize();let h=!1;for(let u=0;u!==n.length;u++)if(n[u].almostEquals(i)||n[u].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new E;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],s=this.vertices[n[1]],o=this.vertices[n[2]];Cs.computeNormal(i,s,o,e)}static computeNormal(t,e,n,i){const s=new E,o=new E;e.vsub(t,o),n.vsub(e,s),s.cross(o,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,s,o,a,c,l){const h=new E;let u=-1,d=-Number.MAX_VALUE;for(let p=0;p<n.faces.length;p++){h.copy(n.faceNormals[p]),s.vmult(h,h);const v=h.dot(o);v>d&&(d=v,u=p)}const f=[];for(let p=0;p<n.faces[u].length;p++){const v=n.vertices[n.faces[u][p]],g=new E;g.copy(v),s.vmult(g,g),i.vadd(g,g),f.push(g)}u>=0&&this.clipFaceAgainstHull(o,t,e,f,a,c,l)}findSeparatingAxis(t,e,n,i,s,o,a,c){const l=new E,h=new E,u=new E,d=new E,f=new E,p=new E;let v=Number.MAX_VALUE;const g=this;if(g.uniqueAxes)for(let m=0;m!==g.uniqueAxes.length;m++){n.vmult(g.uniqueAxes[m],l);const _=g.testSepAxis(l,t,e,n,i,s);if(_===!1)return!1;_<v&&(v=_,o.copy(l))}else{const m=a?a.length:g.faces.length;for(let _=0;_<m;_++){const x=a?a[_]:_;l.copy(g.faceNormals[x]),n.vmult(l,l);const y=g.testSepAxis(l,t,e,n,i,s);if(y===!1)return!1;y<v&&(v=y,o.copy(l))}}if(t.uniqueAxes)for(let m=0;m!==t.uniqueAxes.length;m++){s.vmult(t.uniqueAxes[m],h);const _=g.testSepAxis(h,t,e,n,i,s);if(_===!1)return!1;_<v&&(v=_,o.copy(h))}else{const m=c?c.length:t.faces.length;for(let _=0;_<m;_++){const x=c?c[_]:_;h.copy(t.faceNormals[x]),s.vmult(h,h);const y=g.testSepAxis(h,t,e,n,i,s);if(y===!1)return!1;y<v&&(v=y,o.copy(h))}}for(let m=0;m!==g.uniqueEdges.length;m++){n.vmult(g.uniqueEdges[m],d);for(let _=0;_!==t.uniqueEdges.length;_++)if(s.vmult(t.uniqueEdges[_],f),d.cross(f,p),!p.almostZero()){p.normalize();const x=g.testSepAxis(p,t,e,n,i,s);if(x===!1)return!1;x<v&&(v=x,o.copy(p))}}return i.vsub(e,u),u.dot(o)>0&&o.negate(o),!0}testSepAxis(t,e,n,i,s,o){const a=this;Cs.project(a,t,n,i,Ro),Cs.project(e,t,s,o,Po);const c=Ro[0],l=Ro[1],h=Po[0],u=Po[1];if(c<u||h<l)return!1;const d=c-u,f=h-l;return d<f?d:f}calculateLocalInertia(t,e){const n=new E,i=new E;this.computeLocalAABB(i,n);const s=n.x-i.x,o=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*o*2*o+2*a*2*a),e.y=1/12*t*(2*s*2*s+2*a*2*a),e.z=1/12*t*(2*o*2*o+2*s*2*s)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,s,o,a){const c=new E,l=new E,h=new E,u=new E,d=new E,f=new E,p=new E,v=new E,g=this,m=[],_=i,x=m;let y=-1,b=Number.MAX_VALUE;for(let M=0;M<g.faces.length;M++){c.copy(g.faceNormals[M]),n.vmult(c,c);const P=c.dot(t);P<b&&(b=P,y=M)}if(y<0)return;const C=g.faces[y];C.connectedFaces=[];for(let M=0;M<g.faces.length;M++)for(let P=0;P<g.faces[M].length;P++)C.indexOf(g.faces[M][P])!==-1&&M!==y&&C.connectedFaces.indexOf(M)===-1&&C.connectedFaces.push(M);const A=C.length;for(let M=0;M<A;M++){const P=g.vertices[C[M]],O=g.vertices[C[(M+1)%A]];P.vsub(O,l),h.copy(l),n.vmult(h,h),e.vadd(h,h),u.copy(this.faceNormals[y]),n.vmult(u,u),e.vadd(u,u),h.cross(u,d),d.negate(d),f.copy(P),n.vmult(f,f),e.vadd(f,f);const D=C.connectedFaces[M];p.copy(this.faceNormals[D]);const B=this.getPlaneConstantOfFace(D);v.copy(p),n.vmult(v,v);const U=B-v.dot(e);for(this.clipFaceAgainstPlane(_,x,v,U);_.length;)_.shift();for(;x.length;)_.push(x.shift())}p.copy(this.faceNormals[y]);const I=this.getPlaneConstantOfFace(y);v.copy(p),n.vmult(v,v);const S=I-v.dot(e);for(let M=0;M<_.length;M++){let P=v.dot(_[M])+S;if(P<=s&&(console.log(`clamped: depth=${P} to minDist=${s}`),P=s),P<=o){const O=_[M];if(P<=1e-6){const D={point:O,normal:v,depth:P};a.push(D)}}}}clipFaceAgainstPlane(t,e,n,i){let s,o;const a=t.length;if(a<2)return e;let c=t[t.length-1],l=t[0];s=n.dot(c)+i;for(let h=0;h<a;h++){if(l=t[h],o=n.dot(l)+i,s<0)if(o<0){const u=new E;u.copy(l),e.push(u)}else{const u=new E;c.lerp(l,s/(s-o),u),e.push(u)}else if(o<0){const u=new E;c.lerp(l,s/(s-o),u),e.push(u),e.push(l)}c=l,s=o}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new E);const n=this.vertices,i=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)e.vmult(n[s],i[s]),t.vadd(i[s],i[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const s=n[i];s.x<t.x?t.x=s.x:s.x>e.x&&(e.x=s.x),s.y<t.y?t.y=s.y:s.y>e.y&&(e.y=s.y),s.z<t.z?t.z=s.z:s.z>e.z&&(e.z=s.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new E);const n=this.faceNormals,i=this.worldFaceNormals;for(let s=0;s!==e;s++)t.vmult(n[s],i[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const s=this.vertices;let o,a,c,l,h,u,d=new E;for(let f=0;f<s.length;f++){d.copy(s[f]),e.vmult(d,d),t.vadd(d,d);const p=d;(o===void 0||p.x<o)&&(o=p.x),(l===void 0||p.x>l)&&(l=p.x),(a===void 0||p.y<a)&&(a=p.y),(h===void 0||p.y>h)&&(h=p.y),(c===void 0||p.z<c)&&(c=p.z),(u===void 0||p.z>u)&&(u=p.z)}n.set(o,a,c),i.set(l,h,u)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new E);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let s=0;s<n;s++){const o=i[s];e.vmult(o,o)}for(let s=0;s<this.faceNormals.length;s++){const o=this.faceNormals[s];e.vmult(o,o)}}if(t)for(let s=0;s<n;s++){const o=i[s];o.vadd(t,o)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,s=new E;this.getAveragePointLocal(s);for(let o=0;o<this.faces.length;o++){let a=i[o];const c=e[n[o][0]],l=new E;t.vsub(c,l);const h=a.dot(l),u=new E;s.vsub(c,u);const d=a.dot(u);if(h<0&&d>0||h>0&&d<0)return!1}return-1}static project(t,e,n,i,s){const o=t.vertices.length,a=Hv;let c=0,l=0;const h=Wv,u=t.vertices;h.setZero(),ce.vectorToLocalFrame(n,i,e,a),ce.pointToLocalFrame(n,i,h,h);const d=h.dot(a);l=c=u[0].dot(a);for(let f=1;f<o;f++){const p=u[f].dot(a);p>c&&(c=p),p<l&&(l=p)}if(l-=d,c-=d,l>c){const f=l;l=c,c=f}s[0]=c,s[1]=l}}const Ro=[],Po=[];new E;const Hv=new E,Wv=new E;class sc extends Tt{constructor(t){super({type:Tt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=E,s=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],c=new Cs({vertices:s,faces:o,axes:a});this.convexPolyhedronRepresentation=c,c.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new E),sc.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let s=0;s!==n.length;s++)e.vmult(n[s],n[s]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,s=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let o=0;o<s.length;o++)ni.set(s[o][0],s[o][1],s[o][2]),e.vmult(ni,ni),t.vadd(ni,ni),n(ni.x,ni.y,ni.z)}calculateWorldAABB(t,e,n,i){const s=this.halfExtents;Sn[0].set(s.x,s.y,s.z),Sn[1].set(-s.x,s.y,s.z),Sn[2].set(-s.x,-s.y,s.z),Sn[3].set(-s.x,-s.y,-s.z),Sn[4].set(s.x,-s.y,-s.z),Sn[5].set(s.x,s.y,-s.z),Sn[6].set(-s.x,s.y,-s.z),Sn[7].set(s.x,-s.y,s.z);const o=Sn[0];e.vmult(o,o),t.vadd(o,o),i.copy(o),n.copy(o);for(let a=1;a<8;a++){const c=Sn[a];e.vmult(c,c),t.vadd(c,c);const l=c.x,h=c.y,u=c.z;l>i.x&&(i.x=l),h>i.y&&(i.y=h),u>i.z&&(i.z=u),l<n.x&&(n.x=l),h<n.y&&(n.y=h),u<n.z&&(n.z=u)}}}const ni=new E,Sn=[new E,new E,new E,new E,new E,new E,new E,new E],rc={DYNAMIC:1,STATIC:2,KINEMATIC:4},oc={AWAKE:0,SLEEPY:1,SLEEPING:2};class Ct extends Wh{constructor(t){t===void 0&&(t={}),super(),this.id=Ct.idCounter++,this.index=-1,this.world=null,this.vlambda=new E,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new E,this.previousPosition=new E,this.interpolatedPosition=new E,this.initPosition=new E,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new E,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new E,this.force=new E;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?Ct.STATIC:Ct.DYNAMIC,typeof t.type==typeof Ct.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=Ct.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new E,this.quaternion=new Ae,this.initQuaternion=new Ae,this.previousQuaternion=new Ae,this.interpolatedQuaternion=new Ae,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new E,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new E,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new E,this.invInertia=new E,this.invInertiaWorld=new yn,this.invMassSolve=0,this.invInertiaSolve=new E,this.invInertiaWorldSolve=new yn,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new E(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new E(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new on,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new E,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=Ct.AWAKE,this.wakeUpAfterNarrowphase=!1,t===Ct.SLEEPING&&this.dispatchEvent(Ct.wakeupEvent)}sleep(){this.sleepState=Ct.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===Ct.AWAKE&&n<i?(this.sleepState=Ct.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(Ct.sleepyEvent)):e===Ct.SLEEPY&&n>i?this.wakeUp():e===Ct.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(Ct.sleepEvent))}}updateSolveMassProperties(){this.sleepState===Ct.SLEEPING||this.type===Ct.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new E),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new E),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new E),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new E),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new E,s=new Ae;return e&&i.copy(e),n&&s.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let s=0;s!==n;s++){const o=t[s];o.updateBoundingSphereRadius();const a=e[s].length(),c=o.boundingSphereRadius;a+c>i&&(i=a+c)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,s=Xv,o=qv,a=this.quaternion,c=this.aabb,l=Yv;for(let h=0;h!==i;h++){const u=t[h];a.vmult(e[h],s),s.vadd(this.position,s),a.mult(n[h],o),u.calculateWorldAABB(s,o,l.lowerBound,l.upperBound),h===0?c.copy(l):c.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=jv,i=$v;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new E),this.type!==Ct.DYNAMIC)return;this.sleepState===Ct.SLEEPING&&this.wakeUp();const n=Kv;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new E),this.type!==Ct.DYNAMIC)return;const n=Zv,i=Jv;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===Ct.DYNAMIC&&(this.sleepState===Ct.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new E),this.type!==Ct.DYNAMIC)return;this.sleepState===Ct.SLEEPING&&this.wakeUp();const n=e,i=Qv;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const s=t_;n.cross(t,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new E),this.type!==Ct.DYNAMIC)return;const n=e_,i=n_;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=i_;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),sc.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new E;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===Ct.DYNAMIC||this.type===Ct.KINEMATIC)||this.sleepState===Ct.SLEEPING)return;const i=this.velocity,s=this.angularVelocity,o=this.position,a=this.force,c=this.torque,l=this.quaternion,h=this.invMass,u=this.invInertiaWorld,d=this.linearFactor,f=h*t;i.x+=a.x*f*d.x,i.y+=a.y*f*d.y,i.z+=a.z*f*d.z;const p=u.elements,v=this.angularFactor,g=c.x*v.x,m=c.y*v.y,_=c.z*v.z;s.x+=t*(p[0]*g+p[1]*m+p[2]*_),s.y+=t*(p[3]*g+p[4]*m+p[5]*_),s.z+=t*(p[6]*g+p[7]*m+p[8]*_),o.x+=i.x*t,o.y+=i.y*t,o.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}Ct.idCounter=0;Ct.COLLIDE_EVENT_NAME="collide";Ct.DYNAMIC=rc.DYNAMIC;Ct.STATIC=rc.STATIC;Ct.KINEMATIC=rc.KINEMATIC;Ct.AWAKE=oc.AWAKE;Ct.SLEEPY=oc.SLEEPY;Ct.SLEEPING=oc.SLEEPING;Ct.wakeupEvent={type:"wakeup"};Ct.sleepyEvent={type:"sleepy"};Ct.sleepEvent={type:"sleep"};const Xv=new E,qv=new Ae,Yv=new on,jv=new yn,$v=new yn;new yn;const Kv=new E,Zv=new E,Jv=new E,Qv=new E,t_=new E,e_=new E,n_=new E,i_=new E;class s_{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!((t.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&t.collisionFilterMask)===0||((t.type&Ct.STATIC)!==0||t.sleepState===Ct.SLEEPING)&&((e.type&Ct.STATIC)!==0||e.sleepState===Ct.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const s=r_;e.position.vsub(t.position,s);const o=(t.boundingRadius+e.boundingRadius)**2;s.lengthSquared()<o&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=o_,i=a_,s=c_,o=t.length;for(let a=0;a!==o;a++)i[a]=t[a],s[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==o;a++){const c=i[a].id,l=s[a].id,h=c<l?`${c},${l}`:`${l},${c}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){const c=n.keys.pop(),l=n[c];t.push(i[l]),e.push(s[l]),delete n[c]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new E;t.position.vsub(e.position,n);const i=t.shapes[0],s=e.shapes[0];return Math.pow(i.boundingSphereRadius+s.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const r_=new E;new E;new Ae;new E;const o_={keys:[]},a_=[],c_=[];new E;new E;new E;class Xh extends s_{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,s=i.length;let o,a;for(let c=0;c!==s;c++)for(let l=0;l!==c;l++)o=i[c],a=i[l],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const s=t.bodies[i];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(e)&&n.push(s)}return n}}class zs{constructor(){this.rayFromWorld=new E,this.rayToWorld=new E,this.hitNormalWorld=new E,this.hitPointWorld=new E,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,s,o,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=s,this.body=o,this.distance=a}}let qh,Yh,jh,$h,Kh,Zh,Jh;const ac={CLOSEST:1,ANY:2,ALL:4};qh=Tt.types.SPHERE;Yh=Tt.types.PLANE;jh=Tt.types.BOX;$h=Tt.types.CYLINDER;Kh=Tt.types.CONVEXPOLYHEDRON;Zh=Tt.types.HEIGHTFIELD;Jh=Tt.types.TRIMESH;class Ce{get[qh](){return this._intersectSphere}get[Yh](){return this._intersectPlane}get[jh](){return this._intersectBox}get[$h](){return this._intersectConvex}get[Kh](){return this._intersectConvex}get[Zh](){return this._intersectHeightfield}get[Jh](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new E),e===void 0&&(e=new E),this.from=t.clone(),this.to=e.clone(),this.direction=new E,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=Ce.ANY,this.result=new zs,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||Ce.ANY,this.result=e.result||new zs,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Ul),Lo.length=0,t.broadphase.aabbQuery(t,Ul,Lo),this.intersectBodies(Lo),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||(this.collisionFilterGroup&t.collisionFilterMask)===0||(t.collisionFilterGroup&this.collisionFilterMask)===0)return;const i=l_,s=h_;for(let o=0,a=t.shapes.length;o<a;o++){const c=t.shapes[o];if(!(n&&!c.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[o],s),t.quaternion.vmult(t.shapeOffsets[o],i),i.vadd(t.position,i),this.intersectShape(c,s,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const s=this.from;if(E_(s,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,s){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,s)}_intersectPlane(t,e,n,i,s){const o=this.from,a=this.to,c=this.direction,l=new E(0,0,1);e.vmult(l,l);const h=new E;o.vsub(n,h);const u=h.dot(l);a.vsub(n,h);const d=h.dot(l);if(u*d>0||o.distanceTo(a)<u)return;const f=l.dot(c);if(Math.abs(f)<this.precision)return;const p=new E,v=new E,g=new E;o.vsub(n,p);const m=-l.dot(p)/f;c.scale(m,v),o.vadd(v,g),this.reportIntersection(l,g,s,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,s=this.from;e.x=Math.min(i.x,s.x),e.y=Math.min(i.y,s.y),e.z=Math.min(i.z,s.z),n.x=Math.max(i.x,s.x),n.y=Math.max(i.y,s.y),n.z=Math.max(i.z,s.z)}_intersectHeightfield(t,e,n,i,s){t.data,t.elementSize;const o=u_;o.from.copy(this.from),o.to.copy(this.to),ce.pointToLocalFrame(n,e,o.from,o.from),ce.pointToLocalFrame(n,e,o.to,o.to),o.updateDirection();const a=d_;let c,l,h,u;c=l=0,h=u=t.data.length-1;const d=new on;o.getAABB(d),t.getIndexOfPosition(d.lowerBound.x,d.lowerBound.y,a,!0),c=Math.max(c,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(d.upperBound.x,d.upperBound.y,a,!0),h=Math.min(h,a[0]+1),u=Math.min(u,a[1]+1);for(let f=c;f<h;f++)for(let p=l;p<u;p++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(f,p,d),!!d.overlapsRay(o)){if(t.getConvexTrianglePillar(f,p,!1),ce.pointToWorldFrame(n,e,t.pillarOffset,yr),this._intersectConvex(t.pillarConvex,e,yr,i,s,Ol),this.result.shouldStop)return;t.getConvexTrianglePillar(f,p,!0),ce.pointToWorldFrame(n,e,t.pillarOffset,yr),this._intersectConvex(t.pillarConvex,e,yr,i,s,Ol)}}}_intersectSphere(t,e,n,i,s){const o=this.from,a=this.to,c=t.radius,l=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,h=2*((a.x-o.x)*(o.x-n.x)+(a.y-o.y)*(o.y-n.y)+(a.z-o.z)*(o.z-n.z)),u=(o.x-n.x)**2+(o.y-n.y)**2+(o.z-n.z)**2-c**2,d=h**2-4*l*u,f=f_,p=p_;if(!(d<0))if(d===0)o.lerp(a,d,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,s,i,-1);else{const v=(-h-Math.sqrt(d))/(2*l),g=(-h+Math.sqrt(d))/(2*l);if(v>=0&&v<=1&&(o.lerp(a,v,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,s,i,-1)),this.result.shouldStop)return;g>=0&&g<=1&&(o.lerp(a,g,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,s,i,-1))}}_intersectConvex(t,e,n,i,s,o){const a=m_,c=Bl,l=o&&o.faceList||null,h=t.faces,u=t.vertices,d=t.faceNormals,f=this.direction,p=this.from,v=this.to,g=p.distanceTo(v),m=l?l.length:h.length,_=this.result;for(let x=0;!_.shouldStop&&x<m;x++){const y=l?l[x]:x,b=h[y],C=d[y],A=e,I=n;c.copy(u[b[0]]),A.vmult(c,c),c.vadd(I,c),c.vsub(p,c),A.vmult(C,a);const S=f.dot(a);if(Math.abs(S)<this.precision)continue;const M=a.dot(c)/S;if(!(M<0)){f.scale(M,Ke),Ke.vadd(p,Ke),gn.copy(u[b[0]]),A.vmult(gn,gn),I.vadd(gn,gn);for(let P=1;!_.shouldStop&&P<b.length-1;P++){En.copy(u[b[P]]),bn.copy(u[b[P+1]]),A.vmult(En,En),A.vmult(bn,bn),I.vadd(En,En),I.vadd(bn,bn);const O=Ke.distanceTo(p);!(Ce.pointInTriangle(Ke,gn,En,bn)||Ce.pointInTriangle(Ke,En,gn,bn))||O>g||this.reportIntersection(a,Ke,s,i,y)}}}}_intersectTrimesh(t,e,n,i,s,o){const a=g_,c=w_,l=S_,h=Bl,u=v_,d=__,f=y_,p=M_,v=x_,g=t.indices;t.vertices;const m=this.from,_=this.to,x=this.direction;l.position.copy(n),l.quaternion.copy(e),ce.vectorToLocalFrame(n,e,x,u),ce.pointToLocalFrame(n,e,m,d),ce.pointToLocalFrame(n,e,_,f),f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,d.x*=t.scale.x,d.y*=t.scale.y,d.z*=t.scale.z,f.vsub(d,u),u.normalize();const y=d.distanceSquared(f);t.tree.rayQuery(this,l,c);for(let b=0,C=c.length;!this.result.shouldStop&&b!==C;b++){const A=c[b];t.getNormal(A,a),t.getVertex(g[A*3],gn),gn.vsub(d,h);const I=u.dot(a),S=a.dot(h)/I;if(S<0)continue;u.scale(S,Ke),Ke.vadd(d,Ke),t.getVertex(g[A*3+1],En),t.getVertex(g[A*3+2],bn);const M=Ke.distanceSquared(d);!(Ce.pointInTriangle(Ke,En,gn,bn)||Ce.pointInTriangle(Ke,gn,En,bn))||M>y||(ce.vectorToWorldFrame(e,a,v),ce.pointToWorldFrame(n,e,Ke,p),this.reportIntersection(v,p,s,i,A))}c.length=0}reportIntersection(t,e,n,i,s){const o=this.from,a=this.to,c=o.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case Ce.ALL:this.hasHit=!0,l.set(o,a,t,e,n,i,c),l.hasHit=!0,this.callback(l);break;case Ce.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c));break;case Ce.ANY:this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,wi),n.vsub(e,vs),t.vsub(e,Io);const s=wi.dot(wi),o=wi.dot(vs),a=wi.dot(Io),c=vs.dot(vs),l=vs.dot(Io);let h,u;return(h=c*a-o*l)>=0&&(u=s*l-o*a)>=0&&h+u<s*c-o*o}}Ce.CLOSEST=ac.CLOSEST;Ce.ANY=ac.ANY;Ce.ALL=ac.ALL;const Ul=new on,Lo=[],vs=new E,Io=new E,l_=new E,h_=new Ae,Ke=new E,gn=new E,En=new E,bn=new E;new E;new zs;const Ol={faceList:[0]},yr=new E,u_=new Ce,d_=[],f_=new E,p_=new E,m_=new E;new E;new E;const Bl=new E,g_=new E,v_=new E,__=new E,y_=new E,x_=new E,M_=new E;new on;const w_=[],S_=new ce,wi=new E,xr=new E;function E_(r,t,e){e.vsub(r,wi);const n=wi.dot(t);return t.scale(n,xr),xr.vadd(r,xr),e.distanceTo(xr)}class b_{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class zl{constructor(){this.spatial=new E,this.rotational=new E}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class Gs{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=Gs.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new zl,this.jacobianElementB=new zl,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,s=t,o=n;this.a=4/(o*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(o*o*s*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),s=this.computeGq(),o=this.computeGiMf();return-s*t-i*e-o*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.position,o=i.position;return t.spatial.dot(s)+e.spatial.dot(o)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.velocity,o=i.velocity,a=n.angularVelocity,c=i.angularVelocity;return t.multiplyVectors(s,a)+e.multiplyVectors(o,c)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.vlambda,o=i.vlambda,a=n.wlambda,c=i.wlambda;return t.multiplyVectors(s,a)+e.multiplyVectors(o,c)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.force,o=n.torque,a=i.force,c=i.torque,l=n.invMassSolve,h=i.invMassSolve;return s.scale(l,kl),a.scale(h,Vl),n.invInertiaWorldSolve.vmult(o,Gl),i.invInertiaWorldSolve.vmult(c,Hl),t.multiplyVectors(kl,Gl)+e.multiplyVectors(Vl,Hl)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.invMassSolve,o=i.invMassSolve,a=n.invInertiaWorldSolve,c=i.invInertiaWorldSolve;let l=s+o;return a.vmult(t.rotational,Mr),l+=Mr.dot(t.rotational),c.vmult(e.rotational,Mr),l+=Mr.dot(e.rotational),l}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,s=this.bj,o=T_;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),s.vlambda.addScaledVector(s.invMassSolve*t,n.spatial,s.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,o),i.wlambda.addScaledVector(t,o,i.wlambda),s.invInertiaWorldSolve.vmult(n.rotational,o),s.wlambda.addScaledVector(t,o,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}Gs.idCounter=0;const kl=new E,Vl=new E,Gl=new E,Hl=new E,Mr=new E,T_=new E;class C_ extends Gs{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new E,this.rj=new E,this.ni=new E}computeB(t){const e=this.a,n=this.b,i=this.bi,s=this.bj,o=this.ri,a=this.rj,c=A_,l=R_,h=i.velocity,u=i.angularVelocity;i.force,i.torque;const d=s.velocity,f=s.angularVelocity;s.force,s.torque;const p=P_,v=this.jacobianElementA,g=this.jacobianElementB,m=this.ni;o.cross(m,c),a.cross(m,l),m.negate(v.spatial),c.negate(v.rotational),g.spatial.copy(m),g.rotational.copy(l),p.copy(s.position),p.vadd(a,p),p.vsub(i.position,p),p.vsub(o,p);const _=m.dot(p),x=this.restitution+1,y=x*d.dot(m)-x*h.dot(m)+f.dot(l)-u.dot(c),b=this.computeGiMf();return-_*e-y*n-t*b}getImpactVelocityAlongNormal(){const t=L_,e=I_,n=D_,i=N_,s=F_;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,s),this.ni.dot(s)}}const A_=new E,R_=new E,P_=new E,L_=new E,I_=new E,D_=new E,N_=new E,F_=new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;class Wl extends Gs{constructor(t,e,n){super(t,e,-n,n),this.ri=new E,this.rj=new E,this.t=new E}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,s=U_,o=O_,a=this.t;n.cross(a,s),i.cross(a,o);const c=this.jacobianElementA,l=this.jacobianElementB;a.negate(c.spatial),s.negate(c.rotational),l.spatial.copy(a),l.rotational.copy(o);const h=this.computeGW(),u=this.computeGiMf();return-h*e-t*u}}const U_=new E,O_=new E;class Gr{constructor(t,e,n){n=b_.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=Gr.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}Gr.idCounter=0;class Hr{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=Hr.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}Hr.idCounter=0;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new Ce;new E;new E;new E;new E(1,0,0),new E(0,1,0),new E(0,0,1);new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;class B_ extends Tt{constructor(t){if(super({type:Tt.types.SPHERE}),this.radius=t!==void 0?t:1,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}calculateLocalInertia(t,e){e===void 0&&(e=new E);const n=2*t*this.radius*this.radius/5;return e.x=n,e.y=n,e.z=n,e}volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(t,e,n,i){const s=this.radius,o=["x","y","z"];for(let a=0;a<o.length;a++){const c=o[a];n[c]=t[c]-s,i[c]=t[c]+s}}}new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new on;new E;new on;new E;new E;new E;new E;new E;new E;new E;new on;new E;new ce;new on;class z_{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class k_ extends z_{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,s=this.tolerance*this.tolerance,o=this.equations,a=o.length,c=e.bodies,l=c.length,h=t;let u,d,f,p,v,g;if(a!==0)for(let y=0;y!==l;y++)c[y].updateSolveMassProperties();const m=G_,_=H_,x=V_;m.length=a,_.length=a,x.length=a;for(let y=0;y!==a;y++){const b=o[y];x[y]=0,_[y]=b.computeB(h),m[y]=1/b.computeC()}if(a!==0){for(let C=0;C!==l;C++){const A=c[C],I=A.vlambda,S=A.wlambda;I.set(0,0,0),S.set(0,0,0)}for(n=0;n!==i;n++){p=0;for(let C=0;C!==a;C++){const A=o[C];u=_[C],d=m[C],g=x[C],v=A.computeGWlambda(),f=d*(u-v-A.eps*g),g+f<A.minForce?f=A.minForce-g:g+f>A.maxForce&&(f=A.maxForce-g),x[C]+=f,p+=f>0?f:-f,A.addToWlambda(f)}if(p*p<s)break}for(let C=0;C!==l;C++){const A=c[C],I=A.velocity,S=A.angularVelocity;A.vlambda.vmul(A.linearFactor,A.vlambda),I.vadd(A.vlambda,I),A.wlambda.vmul(A.angularFactor,A.wlambda),S.vadd(A.wlambda,S)}let y=o.length;const b=1/h;for(;y--;)o[y].multiplier=x[y]*b}return n}}const V_=[],G_=[],H_=[];class W_{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class X_ extends W_{constructor(){super(...arguments),this.type=E}constructObject(){return new E}}const ve={sphereSphere:Tt.types.SPHERE,spherePlane:Tt.types.SPHERE|Tt.types.PLANE,boxBox:Tt.types.BOX|Tt.types.BOX,sphereBox:Tt.types.SPHERE|Tt.types.BOX,planeBox:Tt.types.PLANE|Tt.types.BOX,convexConvex:Tt.types.CONVEXPOLYHEDRON,sphereConvex:Tt.types.SPHERE|Tt.types.CONVEXPOLYHEDRON,planeConvex:Tt.types.PLANE|Tt.types.CONVEXPOLYHEDRON,boxConvex:Tt.types.BOX|Tt.types.CONVEXPOLYHEDRON,sphereHeightfield:Tt.types.SPHERE|Tt.types.HEIGHTFIELD,boxHeightfield:Tt.types.BOX|Tt.types.HEIGHTFIELD,convexHeightfield:Tt.types.CONVEXPOLYHEDRON|Tt.types.HEIGHTFIELD,sphereParticle:Tt.types.PARTICLE|Tt.types.SPHERE,planeParticle:Tt.types.PLANE|Tt.types.PARTICLE,boxParticle:Tt.types.BOX|Tt.types.PARTICLE,convexParticle:Tt.types.PARTICLE|Tt.types.CONVEXPOLYHEDRON,cylinderCylinder:Tt.types.CYLINDER,sphereCylinder:Tt.types.SPHERE|Tt.types.CYLINDER,planeCylinder:Tt.types.PLANE|Tt.types.CYLINDER,boxCylinder:Tt.types.BOX|Tt.types.CYLINDER,convexCylinder:Tt.types.CONVEXPOLYHEDRON|Tt.types.CYLINDER,heightfieldCylinder:Tt.types.HEIGHTFIELD|Tt.types.CYLINDER,particleCylinder:Tt.types.PARTICLE|Tt.types.CYLINDER,sphereTrimesh:Tt.types.SPHERE|Tt.types.TRIMESH,planeTrimesh:Tt.types.PLANE|Tt.types.TRIMESH};class q_{get[ve.sphereSphere](){return this.sphereSphere}get[ve.spherePlane](){return this.spherePlane}get[ve.boxBox](){return this.boxBox}get[ve.sphereBox](){return this.sphereBox}get[ve.planeBox](){return this.planeBox}get[ve.convexConvex](){return this.convexConvex}get[ve.sphereConvex](){return this.sphereConvex}get[ve.planeConvex](){return this.planeConvex}get[ve.boxConvex](){return this.boxConvex}get[ve.sphereHeightfield](){return this.sphereHeightfield}get[ve.boxHeightfield](){return this.boxHeightfield}get[ve.convexHeightfield](){return this.convexHeightfield}get[ve.sphereParticle](){return this.sphereParticle}get[ve.planeParticle](){return this.planeParticle}get[ve.boxParticle](){return this.boxParticle}get[ve.convexParticle](){return this.convexParticle}get[ve.cylinderCylinder](){return this.convexConvex}get[ve.sphereCylinder](){return this.sphereConvex}get[ve.planeCylinder](){return this.planeConvex}get[ve.boxCylinder](){return this.boxConvex}get[ve.convexCylinder](){return this.convexConvex}get[ve.heightfieldCylinder](){return this.heightfieldCylinder}get[ve.particleCylinder](){return this.particleCylinder}get[ve.sphereTrimesh](){return this.sphereTrimesh}get[ve.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new X_,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,s,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new C_(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const c=this.currentContactMaterial;a.restitution=c.restitution,a.setSpookParams(c.contactEquationStiffness,c.contactEquationRelaxation,this.world.dt);const l=n.material||t.material,h=i.material||e.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(a.restitution=l.restitution*h.restitution),a.si=s||n,a.sj=o||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,s=t.si,o=t.sj,a=this.world,c=this.currentContactMaterial;let l=c.friction;const h=s.material||n.material,u=o.material||i.material;if(h&&u&&h.friction>=0&&u.friction>=0&&(l=h.friction*u.friction),l>0){const d=l*(a.frictionGravity||a.gravity).length();let f=n.invMass+i.invMass;f>0&&(f=1/f);const p=this.frictionEquationPool,v=p.length?p.pop():new Wl(n,i,d*f),g=p.length?p.pop():new Wl(n,i,d*f);return v.bi=g.bi=n,v.bj=g.bj=i,v.minForce=g.minForce=-d*f,v.maxForce=g.maxForce=d*f,v.ri.copy(t.ri),v.rj.copy(t.rj),g.ri.copy(t.ri),g.rj.copy(t.rj),t.ni.tangents(v.t,g.t),v.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),g.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),v.enabled=g.enabled=t.enabled,e.push(v,g),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];gi.setZero(),qi.setZero(),Yi.setZero();const s=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==s?(gi.vadd(e.ni,gi),qi.vadd(e.ri,qi),Yi.vadd(e.rj,Yi)):(gi.vsub(e.ni,gi),qi.vadd(e.rj,qi),Yi.vadd(e.ri,Yi));const o=1/t;qi.scale(o,n.ri),Yi.scale(o,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),gi.normalize(),gi.tangents(n.t,i.t)}getContacts(t,e,n,i,s,o,a){this.contactPointPool=s,this.frictionEquationPool=a,this.result=i,this.frictionResult=o;const c=$_,l=K_,h=Y_,u=j_;for(let d=0,f=t.length;d!==f;d++){const p=t[d],v=e[d];let g=null;p.material&&v.material&&(g=n.getContactMaterial(p.material,v.material)||null);const m=p.type&Ct.KINEMATIC&&v.type&Ct.STATIC||p.type&Ct.STATIC&&v.type&Ct.KINEMATIC||p.type&Ct.KINEMATIC&&v.type&Ct.KINEMATIC;for(let _=0;_<p.shapes.length;_++){p.quaternion.mult(p.shapeOrientations[_],c),p.quaternion.vmult(p.shapeOffsets[_],h),h.vadd(p.position,h);const x=p.shapes[_];for(let y=0;y<v.shapes.length;y++){v.quaternion.mult(v.shapeOrientations[y],l),v.quaternion.vmult(v.shapeOffsets[y],u),u.vadd(v.position,u);const b=v.shapes[y];if(!(x.collisionFilterMask&b.collisionFilterGroup&&b.collisionFilterMask&x.collisionFilterGroup)||h.distanceTo(u)>x.boundingSphereRadius+b.boundingSphereRadius)continue;let C=null;x.material&&b.material&&(C=n.getContactMaterial(x.material,b.material)||null),this.currentContactMaterial=C||g||n.defaultContactMaterial;const A=x.type|b.type,I=this[A];if(I){let S=!1;x.type<b.type?S=I.call(this,x,b,h,u,c,l,p,v,x,b,m):S=I.call(this,b,x,u,h,l,c,v,p,x,b,m),S&&m&&(n.shapeOverlapKeeper.set(x.id,b.id),n.bodyOverlapKeeper.set(p.id,v.id))}}}}}sphereSphere(t,e,n,i,s,o,a,c,l,h,u){if(u)return n.distanceSquared(i)<(t.radius+e.radius)**2;const d=this.createContactEquation(a,c,t,e,l,h);i.vsub(n,d.ni),d.ni.normalize(),d.ri.copy(d.ni),d.rj.copy(d.ni),d.ri.scale(t.radius,d.ri),d.rj.scale(-e.radius,d.rj),d.ri.vadd(n,d.ri),d.ri.vsub(a.position,d.ri),d.rj.vadd(i,d.rj),d.rj.vsub(c.position,d.rj),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}spherePlane(t,e,n,i,s,o,a,c,l,h,u){const d=this.createContactEquation(a,c,t,e,l,h);if(d.ni.set(0,0,1),o.vmult(d.ni,d.ni),d.ni.negate(d.ni),d.ni.normalize(),d.ni.scale(t.radius,d.ri),n.vsub(i,wr),d.ni.scale(d.ni.dot(wr),Xl),wr.vsub(Xl,d.rj),-wr.dot(d.ni)<=t.radius){if(u)return!0;const f=d.ri,p=d.rj;f.vadd(n,f),f.vsub(a.position,f),p.vadd(i,p),p.vsub(c.position,p),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}}boxBox(t,e,n,i,s,o,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,s,o,a,c,t,e,u)}sphereBox(t,e,n,i,s,o,a,c,l,h,u){const d=this.v3pool,f=wy;n.vsub(i,Sr),e.getSideNormals(f,o);const p=t.radius;let v=!1;const g=Ey,m=by,_=Ty;let x=null,y=0,b=0,C=0,A=null;for(let F=0,q=f.length;F!==q&&v===!1;F++){const k=yy;k.copy(f[F]);const K=k.length();k.normalize();const ot=Sr.dot(k);if(ot<K+p&&ot>0){const ft=xy,st=My;ft.copy(f[(F+1)%3]),st.copy(f[(F+2)%3]);const Xt=ft.length(),Zt=st.length();ft.normalize(),st.normalize();const Jt=Sr.dot(ft),$=Sr.dot(st);if(Jt<Xt&&Jt>-Xt&&$<Zt&&$>-Zt){const et=Math.abs(ot-K-p);if((A===null||et<A)&&(A=et,b=Jt,C=$,x=K,g.copy(k),m.copy(ft),_.copy(st),y++,u))return!0}}}if(y){v=!0;const F=this.createContactEquation(a,c,t,e,l,h);g.scale(-p,F.ri),F.ni.copy(g),F.ni.negate(F.ni),g.scale(x,g),m.scale(b,m),g.vadd(m,g),_.scale(C,_),g.vadd(_,F.rj),F.ri.vadd(n,F.ri),F.ri.vsub(a.position,F.ri),F.rj.vadd(i,F.rj),F.rj.vsub(c.position,F.rj),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult)}let I=d.get();const S=Sy;for(let F=0;F!==2&&!v;F++)for(let q=0;q!==2&&!v;q++)for(let k=0;k!==2&&!v;k++)if(I.set(0,0,0),F?I.vadd(f[0],I):I.vsub(f[0],I),q?I.vadd(f[1],I):I.vsub(f[1],I),k?I.vadd(f[2],I):I.vsub(f[2],I),i.vadd(I,S),S.vsub(n,S),S.lengthSquared()<p*p){if(u)return!0;v=!0;const K=this.createContactEquation(a,c,t,e,l,h);K.ri.copy(S),K.ri.normalize(),K.ni.copy(K.ri),K.ri.scale(p,K.ri),K.rj.copy(I),K.ri.vadd(n,K.ri),K.ri.vsub(a.position,K.ri),K.rj.vadd(i,K.rj),K.rj.vsub(c.position,K.rj),this.result.push(K),this.createFrictionEquationsFromContact(K,this.frictionResult)}d.release(I),I=null;const M=d.get(),P=d.get(),O=d.get(),D=d.get(),B=d.get(),U=f.length;for(let F=0;F!==U&&!v;F++)for(let q=0;q!==U&&!v;q++)if(F%3!==q%3){f[q].cross(f[F],M),M.normalize(),f[F].vadd(f[q],P),O.copy(n),O.vsub(P,O),O.vsub(i,O);const k=O.dot(M);M.scale(k,D);let K=0;for(;K===F%3||K===q%3;)K++;B.copy(n),B.vsub(D,B),B.vsub(P,B),B.vsub(i,B);const ot=Math.abs(k),ft=B.length();if(ot<f[K].length()&&ft<p){if(u)return!0;v=!0;const st=this.createContactEquation(a,c,t,e,l,h);P.vadd(D,st.rj),st.rj.copy(st.rj),B.negate(st.ni),st.ni.normalize(),st.ri.copy(st.rj),st.ri.vadd(i,st.ri),st.ri.vsub(n,st.ri),st.ri.normalize(),st.ri.scale(p,st.ri),st.ri.vadd(n,st.ri),st.ri.vsub(a.position,st.ri),st.rj.vadd(i,st.rj),st.rj.vsub(c.position,st.rj),this.result.push(st),this.createFrictionEquationsFromContact(st,this.frictionResult)}}d.release(M,P,O,D,B)}planeBox(t,e,n,i,s,o,a,c,l,h,u){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,s,o,a,c,t,e,u)}convexConvex(t,e,n,i,s,o,a,c,l,h,u,d,f){const p=Vy;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,s,i,o,p,d,f)){const v=[],g=Gy;t.clipAgainstHull(n,s,e,i,o,p,-100,100,v);let m=0;for(let _=0;_!==v.length;_++){if(u)return!0;const x=this.createContactEquation(a,c,t,e,l,h),y=x.ri,b=x.rj;p.negate(x.ni),v[_].normal.negate(g),g.scale(v[_].depth,g),v[_].point.vadd(g,y),b.copy(v[_].point),y.vsub(n,y),b.vsub(i,b),y.vadd(n,y),y.vsub(a.position,y),b.vadd(i,b),b.vsub(c.position,b),this.result.push(x),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}}sphereConvex(t,e,n,i,s,o,a,c,l,h,u){const d=this.v3pool;n.vsub(i,Cy);const f=e.faceNormals,p=e.faces,v=e.vertices,g=t.radius;let m=!1;for(let _=0;_!==v.length;_++){const x=v[_],y=Ly;o.vmult(x,y),i.vadd(y,y);const b=Py;if(y.vsub(n,b),b.lengthSquared()<g*g){if(u)return!0;m=!0;const C=this.createContactEquation(a,c,t,e,l,h);C.ri.copy(b),C.ri.normalize(),C.ni.copy(C.ri),C.ri.scale(g,C.ri),y.vsub(i,C.rj),C.ri.vadd(n,C.ri),C.ri.vsub(a.position,C.ri),C.rj.vadd(i,C.rj),C.rj.vsub(c.position,C.rj),this.result.push(C),this.createFrictionEquationsFromContact(C,this.frictionResult);return}}for(let _=0,x=p.length;_!==x&&m===!1;_++){const y=f[_],b=p[_],C=Iy;o.vmult(y,C);const A=Dy;o.vmult(v[b[0]],A),A.vadd(i,A);const I=Ny;C.scale(-g,I),n.vadd(I,I);const S=Fy;I.vsub(A,S);const M=S.dot(C),P=Uy;if(n.vsub(A,P),M<0&&P.dot(C)>0){const O=[];for(let D=0,B=b.length;D!==B;D++){const U=d.get();o.vmult(v[b[D]],U),i.vadd(U,U),O.push(U)}if(_y(O,C,n)){if(u)return!0;m=!0;const D=this.createContactEquation(a,c,t,e,l,h);C.scale(-g,D.ri),C.negate(D.ni);const B=d.get();C.scale(-M,B);const U=d.get();C.scale(-g,U),n.vsub(i,D.rj),D.rj.vadd(U,D.rj),D.rj.vadd(B,D.rj),D.rj.vadd(i,D.rj),D.rj.vsub(c.position,D.rj),D.ri.vadd(n,D.ri),D.ri.vsub(a.position,D.ri),d.release(B),d.release(U),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult);for(let F=0,q=O.length;F!==q;F++)d.release(O[F]);return}else for(let D=0;D!==b.length;D++){const B=d.get(),U=d.get();o.vmult(v[b[(D+1)%b.length]],B),o.vmult(v[b[(D+2)%b.length]],U),i.vadd(B,B),i.vadd(U,U);const F=Ay;U.vsub(B,F);const q=Ry;F.unit(q);const k=d.get(),K=d.get();n.vsub(B,K);const ot=K.dot(q);q.scale(ot,k),k.vadd(B,k);const ft=d.get();if(k.vsub(n,ft),ot>0&&ot*ot<F.lengthSquared()&&ft.lengthSquared()<g*g){if(u)return!0;const st=this.createContactEquation(a,c,t,e,l,h);k.vsub(i,st.rj),k.vsub(n,st.ni),st.ni.normalize(),st.ni.scale(g,st.ri),st.rj.vadd(i,st.rj),st.rj.vsub(c.position,st.rj),st.ri.vadd(n,st.ri),st.ri.vsub(a.position,st.ri),this.result.push(st),this.createFrictionEquationsFromContact(st,this.frictionResult);for(let Xt=0,Zt=O.length;Xt!==Zt;Xt++)d.release(O[Xt]);d.release(B),d.release(U),d.release(k),d.release(ft),d.release(K);return}d.release(B),d.release(U),d.release(k),d.release(ft),d.release(K)}for(let D=0,B=O.length;D!==B;D++)d.release(O[D])}}}planeConvex(t,e,n,i,s,o,a,c,l,h,u){const d=Oy,f=By;f.set(0,0,1),s.vmult(f,f);let p=0;const v=zy;for(let g=0;g!==e.vertices.length;g++)if(d.copy(e.vertices[g]),o.vmult(d,d),i.vadd(d,d),d.vsub(n,v),f.dot(v)<=0){if(u)return!0;const _=this.createContactEquation(a,c,t,e,l,h),x=ky;f.scale(f.dot(v),x),d.vsub(x,x),x.vsub(n,_.ri),_.ni.copy(f),d.vsub(i,_.rj),_.ri.vadd(n,_.ri),_.ri.vsub(a.position,_.ri),_.rj.vadd(i,_.rj),_.rj.vsub(c.position,_.rj),this.result.push(_),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(_,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}boxConvex(t,e,n,i,s,o,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,s,o,a,c,t,e,u)}sphereHeightfield(t,e,n,i,s,o,a,c,l,h,u){const d=e.data,f=t.radius,p=e.elementSize,v=tx,g=Qy;ce.pointToLocalFrame(i,o,n,g);let m=Math.floor((g.x-f)/p)-1,_=Math.ceil((g.x+f)/p)+1,x=Math.floor((g.y-f)/p)-1,y=Math.ceil((g.y+f)/p)+1;if(_<0||y<0||m>d.length||x>d[0].length)return;m<0&&(m=0),_<0&&(_=0),x<0&&(x=0),y<0&&(y=0),m>=d.length&&(m=d.length-1),_>=d.length&&(_=d.length-1),y>=d[0].length&&(y=d[0].length-1),x>=d[0].length&&(x=d[0].length-1);const b=[];e.getRectMinMax(m,x,_,y,b);const C=b[0],A=b[1];if(g.z-f>A||g.z+f<C)return;const I=this.result;for(let S=m;S<_;S++)for(let M=x;M<y;M++){const P=I.length;let O=!1;if(e.getConvexTrianglePillar(S,M,!1),ce.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(O=this.sphereConvex(t,e.pillarConvex,n,v,s,o,a,c,t,e,u)),u&&O||(e.getConvexTrianglePillar(S,M,!0),ce.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(O=this.sphereConvex(t,e.pillarConvex,n,v,s,o,a,c,t,e,u)),u&&O))return!0;if(I.length-P>2)return}}boxHeightfield(t,e,n,i,s,o,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,s,o,a,c,t,e,u)}convexHeightfield(t,e,n,i,s,o,a,c,l,h,u){const d=e.data,f=e.elementSize,p=t.boundingSphereRadius,v=Zy,g=Jy,m=Ky;ce.pointToLocalFrame(i,o,n,m);let _=Math.floor((m.x-p)/f)-1,x=Math.ceil((m.x+p)/f)+1,y=Math.floor((m.y-p)/f)-1,b=Math.ceil((m.y+p)/f)+1;if(x<0||b<0||_>d.length||y>d[0].length)return;_<0&&(_=0),x<0&&(x=0),y<0&&(y=0),b<0&&(b=0),_>=d.length&&(_=d.length-1),x>=d.length&&(x=d.length-1),b>=d[0].length&&(b=d[0].length-1),y>=d[0].length&&(y=d[0].length-1);const C=[];e.getRectMinMax(_,y,x,b,C);const A=C[0],I=C[1];if(!(m.z-p>I||m.z+p<A))for(let S=_;S<x;S++)for(let M=y;M<b;M++){let P=!1;if(e.getConvexTrianglePillar(S,M,!1),ce.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.convexConvex(t,e.pillarConvex,n,v,s,o,a,c,null,null,u,g,null)),u&&P||(e.getConvexTrianglePillar(S,M,!0),ce.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.convexConvex(t,e.pillarConvex,n,v,s,o,a,c,null,null,u,g,null)),u&&P))return!0}}sphereParticle(t,e,n,i,s,o,a,c,l,h,u){const d=qy;if(d.set(0,0,1),i.vsub(n,d),d.lengthSquared()<=t.radius*t.radius){if(u)return!0;const p=this.createContactEquation(c,a,e,t,l,h);d.normalize(),p.rj.copy(d),p.rj.scale(t.radius,p.rj),p.ni.copy(d),p.ni.negate(p.ni),p.ri.set(0,0,0),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}}planeParticle(t,e,n,i,s,o,a,c,l,h,u){const d=Hy;d.set(0,0,1),a.quaternion.vmult(d,d);const f=Wy;if(i.vsub(a.position,f),d.dot(f)<=0){if(u)return!0;const v=this.createContactEquation(c,a,e,t,l,h);v.ni.copy(d),v.ni.negate(v.ni),v.ri.set(0,0,0);const g=Xy;d.scale(d.dot(i),g),i.vsub(g,g),v.rj.copy(g),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}boxParticle(t,e,n,i,s,o,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,s,o,a,c,t,e,u)}convexParticle(t,e,n,i,s,o,a,c,l,h,u){let d=-1;const f=jy,p=$y;let v=null;const g=Yy;if(g.copy(i),g.vsub(n,g),s.conjugate(ql),ql.vmult(g,g),t.pointIsInside(g)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,s),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(s);for(let m=0,_=t.faces.length;m!==_;m++){const x=[t.worldVertices[t.faces[m][0]]],y=t.worldFaceNormals[m];i.vsub(x[0],Yl);const b=-y.dot(Yl);if(v===null||Math.abs(b)<Math.abs(v)){if(u)return!0;v=b,d=m,f.copy(y)}}if(d!==-1){const m=this.createContactEquation(c,a,e,t,l,h);f.scale(v,p),p.vadd(i,p),p.vsub(n,p),m.rj.copy(p),f.negate(m.ni),m.ri.set(0,0,0);const _=m.ri,x=m.rj;_.vadd(i,_),_.vsub(c.position,_),x.vadd(n,x),x.vsub(a.position,x),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,s,o,a,c,l,h,u){return this.convexHeightfield(e,t,i,n,o,s,c,a,l,h,u)}particleCylinder(t,e,n,i,s,o,a,c,l,h,u){return this.convexParticle(e,t,i,n,o,s,c,a,l,h,u)}sphereTrimesh(t,e,n,i,s,o,a,c,l,h,u){const d=sy,f=ry,p=oy,v=ay,g=cy,m=ly,_=fy,x=iy,y=ey,b=py;ce.pointToLocalFrame(i,o,n,g);const C=t.radius;_.lowerBound.set(g.x-C,g.y-C,g.z-C),_.upperBound.set(g.x+C,g.y+C,g.z+C),e.getTrianglesInAABB(_,b);const A=ny,I=t.radius*t.radius;for(let D=0;D<b.length;D++)for(let B=0;B<3;B++)if(e.getVertex(e.indices[b[D]*3+B],A),A.vsub(g,y),y.lengthSquared()<=I){if(x.copy(A),ce.pointToWorldFrame(i,o,x,A),A.vsub(n,y),u)return!0;let U=this.createContactEquation(a,c,t,e,l,h);U.ni.copy(y),U.ni.normalize(),U.ri.copy(U.ni),U.ri.scale(t.radius,U.ri),U.ri.vadd(n,U.ri),U.ri.vsub(a.position,U.ri),U.rj.copy(A),U.rj.vsub(c.position,U.rj),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult)}for(let D=0;D<b.length;D++)for(let B=0;B<3;B++){e.getVertex(e.indices[b[D]*3+B],d),e.getVertex(e.indices[b[D]*3+(B+1)%3],f),f.vsub(d,p),g.vsub(f,m);const U=m.dot(p);g.vsub(d,m);let F=m.dot(p);if(F>0&&U<0&&(g.vsub(d,m),v.copy(p),v.normalize(),F=m.dot(v),v.scale(F,m),m.vadd(d,m),m.distanceTo(g)<t.radius)){if(u)return!0;const k=this.createContactEquation(a,c,t,e,l,h);m.vsub(g,k.ni),k.ni.normalize(),k.ni.scale(t.radius,k.ri),k.ri.vadd(n,k.ri),k.ri.vsub(a.position,k.ri),ce.pointToWorldFrame(i,o,m,m),m.vsub(c.position,k.rj),ce.vectorToWorldFrame(o,k.ni,k.ni),ce.vectorToWorldFrame(o,k.ri,k.ri),this.result.push(k),this.createFrictionEquationsFromContact(k,this.frictionResult)}}const S=hy,M=uy,P=dy,O=ty;for(let D=0,B=b.length;D!==B;D++){e.getTriangleVertices(b[D],S,M,P),e.getNormal(b[D],O),g.vsub(S,m);let U=m.dot(O);if(O.scale(U,m),g.vsub(m,m),U=m.distanceTo(g),Ce.pointInTriangle(m,S,M,P)&&U<t.radius){if(u)return!0;let F=this.createContactEquation(a,c,t,e,l,h);m.vsub(g,F.ni),F.ni.normalize(),F.ni.scale(t.radius,F.ri),F.ri.vadd(n,F.ri),F.ri.vsub(a.position,F.ri),ce.pointToWorldFrame(i,o,m,m),m.vsub(c.position,F.rj),ce.vectorToWorldFrame(o,F.ni,F.ni),ce.vectorToWorldFrame(o,F.ri,F.ri),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult)}}b.length=0}planeTrimesh(t,e,n,i,s,o,a,c,l,h,u){const d=new E,f=Z_;f.set(0,0,1),s.vmult(f,f);for(let p=0;p<e.vertices.length/3;p++){e.getVertex(p,d);const v=new E;v.copy(d),ce.pointToWorldFrame(i,o,v,d);const g=J_;if(d.vsub(n,g),f.dot(g)<=0){if(u)return!0;const _=this.createContactEquation(a,c,t,e,l,h);_.ni.copy(f);const x=Q_;f.scale(g.dot(f),x),d.vsub(x,x),_.ri.copy(x),_.ri.vsub(a.position,_.ri),_.rj.copy(d),_.rj.vsub(c.position,_.rj),this.result.push(_),this.createFrictionEquationsFromContact(_,this.frictionResult)}}}}const gi=new E,qi=new E,Yi=new E,Y_=new E,j_=new E,$_=new Ae,K_=new Ae,Z_=new E,J_=new E,Q_=new E,ty=new E,ey=new E;new E;const ny=new E,iy=new E,sy=new E,ry=new E,oy=new E,ay=new E,cy=new E,ly=new E,hy=new E,uy=new E,dy=new E,fy=new on,py=[],wr=new E,Xl=new E,my=new E,gy=new E,vy=new E;function _y(r,t,e){let n=null;const i=r.length;for(let s=0;s!==i;s++){const o=r[s],a=my;r[(s+1)%i].vsub(o,a);const c=gy;a.cross(t,c);const l=vy;e.vsub(o,l);const h=c.dot(l);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}const Sr=new E,yy=new E,xy=new E,My=new E,wy=[new E,new E,new E,new E,new E,new E],Sy=new E,Ey=new E,by=new E,Ty=new E,Cy=new E,Ay=new E,Ry=new E,Py=new E,Ly=new E,Iy=new E,Dy=new E,Ny=new E,Fy=new E,Uy=new E;new E;new E;const Oy=new E,By=new E,zy=new E,ky=new E,Vy=new E,Gy=new E,Hy=new E,Wy=new E,Xy=new E,qy=new E,ql=new Ae,Yy=new E;new E;const jy=new E,Yl=new E,$y=new E,Ky=new E,Zy=new E,Jy=[0],Qy=new E,tx=new E;class jl{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let s=0;for(;n>i[s];)s++;if(n!==i[s]){for(let o=i.length-1;o>=s;o--)i[o+1]=i[o];i[s]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,s=n.length,o=i.length;let a=0;for(let c=0;c<s;c++){let l=!1;const h=n[c];for(;h>i[a];)a++;l=h===i[a],l||$l(t,h)}a=0;for(let c=0;c<o;c++){let l=!1;const h=i[c];for(;h>n[a];)a++;l=n[a]===h,l||$l(e,h)}}}function $l(r,t){r.push((t&4294901760)>>16,t&65535)}const Do=(r,t)=>r<t?`${r}-${t}`:`${t}-${r}`;class ex{constructor(){this.data={keys:[]}}get(t,e){const n=Do(t,e);return this.data[n]}set(t,e,n){const i=Do(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=Do(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class nx extends Wh{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new E,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new E,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new Xh,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new k_,this.constraints=[],this.narrowphase=new q_(this),this.collisionMatrix=new Nl,this.collisionMatrixPrevious=new Nl,this.bodyOverlapKeeper=new jl,this.shapeOverlapKeeper=new jl,this.contactmaterials=[],this.contactMaterialTable=new ex,this.defaultMaterial=new Hr("default"),this.defaultContactMaterial=new Gr(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof zs?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=Ce.ALL,n.from=t,n.to=e,n.callback=i,No.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=Ce.ANY,n.from=t,n.to=e,n.result=i,No.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=Ce.CLOSEST,n.from=t,n.to=e,n.result=i,No.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof Ct&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let s=0;s!==n.length;s++)n[s].index=s;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let s=0;s<i.length;s++){const o=i[s];if(o.id===t)return o}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=Re.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=Re.now();let s=0;for(;this.accumulator>=t&&s<n&&(this.internalStep(t),this.accumulator-=t,s++,!(Re.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const o=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const c=this.bodies[a];c.previousPosition.lerp(c.position,o,c.interpolatedPosition),c.previousQuaternion.slerp(c.quaternion,o,c.interpolatedQuaternion),c.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=ax,i=cx,s=this.bodies.length,o=this.bodies,a=this.solver,c=this.gravity,l=this.doProfiling,h=this.profile,u=Ct.DYNAMIC;let d=-1/0;const f=this.constraints,p=ox;c.length();const v=c.x,g=c.y,m=c.z;let _=0;for(l&&(d=Re.now()),_=0;_!==s;_++){const D=o[_];if(D.type===u){const B=D.force,U=D.mass;B.x+=U*v,B.y+=U*g,B.z+=U*m}}for(let D=0,B=this.subsystems.length;D!==B;D++)this.subsystems[D].update();l&&(d=Re.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(h.broadphase=Re.now()-d);let x=f.length;for(_=0;_!==x;_++){const D=f[_];if(!D.collideConnected)for(let B=n.length-1;B>=0;B-=1)(D.bodyA===n[B]&&D.bodyB===i[B]||D.bodyB===n[B]&&D.bodyA===i[B])&&(n.splice(B,1),i.splice(B,1))}this.collisionMatrixTick(),l&&(d=Re.now());const y=rx,b=e.length;for(_=0;_!==b;_++)y.push(e[_]);e.length=0;const C=this.frictionEquations.length;for(_=0;_!==C;_++)p.push(this.frictionEquations[_]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,y,this.frictionEquations,p),l&&(h.narrowphase=Re.now()-d),l&&(d=Re.now()),_=0;_<this.frictionEquations.length;_++)a.addEquation(this.frictionEquations[_]);const A=e.length;for(let D=0;D!==A;D++){const B=e[D],U=B.bi,F=B.bj,q=B.si,k=B.sj;let K;if(U.material&&F.material?K=this.getContactMaterial(U.material,F.material)||this.defaultContactMaterial:K=this.defaultContactMaterial,K.friction,U.material&&F.material&&(U.material.friction>=0&&F.material.friction>=0&&U.material.friction*F.material.friction,U.material.restitution>=0&&F.material.restitution>=0&&(B.restitution=U.material.restitution*F.material.restitution)),a.addEquation(B),U.allowSleep&&U.type===Ct.DYNAMIC&&U.sleepState===Ct.SLEEPING&&F.sleepState===Ct.AWAKE&&F.type!==Ct.STATIC){const ot=F.velocity.lengthSquared()+F.angularVelocity.lengthSquared(),ft=F.sleepSpeedLimit**2;ot>=ft*2&&(U.wakeUpAfterNarrowphase=!0)}if(F.allowSleep&&F.type===Ct.DYNAMIC&&F.sleepState===Ct.SLEEPING&&U.sleepState===Ct.AWAKE&&U.type!==Ct.STATIC){const ot=U.velocity.lengthSquared()+U.angularVelocity.lengthSquared(),ft=U.sleepSpeedLimit**2;ot>=ft*2&&(F.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(U,F,!0),this.collisionMatrixPrevious.get(U,F)||(_s.body=F,_s.contact=B,U.dispatchEvent(_s),_s.body=U,F.dispatchEvent(_s)),this.bodyOverlapKeeper.set(U.id,F.id),this.shapeOverlapKeeper.set(q.id,k.id)}for(this.emitContactEvents(),l&&(h.makeContactConstraints=Re.now()-d,d=Re.now()),_=0;_!==s;_++){const D=o[_];D.wakeUpAfterNarrowphase&&(D.wakeUp(),D.wakeUpAfterNarrowphase=!1)}for(x=f.length,_=0;_!==x;_++){const D=f[_];D.update();for(let B=0,U=D.equations.length;B!==U;B++){const F=D.equations[B];a.addEquation(F)}}a.solve(t,this),l&&(h.solve=Re.now()-d),a.removeAllEquations();const I=Math.pow;for(_=0;_!==s;_++){const D=o[_];if(D.type&u){const B=I(1-D.linearDamping,t),U=D.velocity;U.scale(B,U);const F=D.angularVelocity;if(F){const q=I(1-D.angularDamping,t);F.scale(q,F)}}}this.dispatchEvent(sx),l&&(d=Re.now());const M=this.stepnumber%(this.quatNormalizeSkip+1)===0,P=this.quatNormalizeFast;for(_=0;_!==s;_++)o[_].integrate(t,M,P);this.clearForces(),this.broadphase.dirty=!0,l&&(h.integrate=Re.now()-d),this.stepnumber+=1,this.dispatchEvent(ix);let O=!0;if(this.allowSleep)for(O=!1,_=0;_!==s;_++){const D=o[_];D.sleepTick(this.time),D.sleepState!==Ct.SLEEPING&&(O=!0)}this.hasActiveBodies=O}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(Vn,Gn),t){for(let s=0,o=Vn.length;s<o;s+=2)ys.bodyA=this.getBodyById(Vn[s]),ys.bodyB=this.getBodyById(Vn[s+1]),this.dispatchEvent(ys);ys.bodyA=ys.bodyB=null}if(e){for(let s=0,o=Gn.length;s<o;s+=2)xs.bodyA=this.getBodyById(Gn[s]),xs.bodyB=this.getBodyById(Gn[s+1]),this.dispatchEvent(xs);xs.bodyA=xs.bodyB=null}Vn.length=Gn.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(Vn,Gn),n){for(let s=0,o=Vn.length;s<o;s+=2){const a=this.getShapeById(Vn[s]),c=this.getShapeById(Vn[s+1]);Hn.shapeA=a,Hn.shapeB=c,a&&(Hn.bodyA=a.body),c&&(Hn.bodyB=c.body),this.dispatchEvent(Hn)}Hn.bodyA=Hn.bodyB=Hn.shapeA=Hn.shapeB=null}if(i){for(let s=0,o=Gn.length;s<o;s+=2){const a=this.getShapeById(Gn[s]),c=this.getShapeById(Gn[s+1]);Wn.shapeA=a,Wn.shapeB=c,a&&(Wn.bodyA=a.body),c&&(Wn.bodyB=c.body),this.dispatchEvent(Wn)}Wn.bodyA=Wn.bodyB=Wn.shapeA=Wn.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new on;const No=new Ce,Re=globalThis.performance||{};if(!Re.now){let r=Date.now();Re.timing&&Re.timing.navigationStart&&(r=Re.timing.navigationStart),Re.now=()=>Date.now()-r}new E;const ix={type:"postStep"},sx={type:"preStep"},_s={type:Ct.COLLIDE_EVENT_NAME,body:null,contact:null},rx=[],ox=[],ax=[],cx=[],Vn=[],Gn=[],ys={type:"beginContact",bodyA:null,bodyB:null},xs={type:"endContact",bodyA:null,bodyB:null},Hn={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Wn={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};class lx{constructor(){this.bodies=new Map,this.fixedTimeStep=1/60,this.maxSubSteps=3,this.world=new nx,this.world.gravity.set(0,0,0),this.world.broadphase=new Xh,this.world.solver.iterations=10,this.world.solver.tolerance=.01,this.world.allowSleep=!0,console.log("PhysicsWorld initialized")}update(t,e=1){const n=t*e;this.world.step(this.fixedTimeStep,n,this.maxSubSteps)}addBody(t,e){this.world.addBody(e),this.bodies.set(t,e)}removeBody(t){const e=this.bodies.get(t);e&&(this.world.removeBody(e),this.bodies.delete(t))}getBody(t){return this.bodies.get(t)}createCelestialBody(t,e,n,i){const s=new B_(e),o=new Ct({mass:0,shape:s,position:new E(i.x,i.y,i.z),collisionFilterGroup:1,collisionFilterMask:6});return this.addBody(t,o),o}createVehicleBody(t,e,n,i,s){const o=new Ct({mass:n,shape:e,position:new E(i.x,i.y,i.z),collisionFilterGroup:2,collisionFilterMask:11});return s&&o.quaternion.set(s.x,s.y,s.z,s.w),this.addBody(t,o),o}applyForce(t,e,n){const i=this.bodies.get(t);if(i){const s=new E(e.x,e.y,e.z);if(n){const o=new E(n.x,n.y,n.z);i.applyForce(s,o)}else i.applyForce(s)}}applyImpulse(t,e,n){const i=this.bodies.get(t);if(i){const s=new E(e.x,e.y,e.z);if(n){const o=new E(n.x,n.y,n.z);i.applyImpulse(s,o)}else i.applyImpulse(s)}}getPosition(t){const e=this.bodies.get(t);return e?new L(e.position.x,e.position.y,e.position.z):null}getVelocity(t){const e=this.bodies.get(t);return e?new L(e.velocity.x,e.velocity.y,e.velocity.z):null}setPosition(t,e){const n=this.bodies.get(t);n&&n.position.set(e.x,e.y,e.z)}setVelocity(t,e){const n=this.bodies.get(t);n&&n.velocity.set(e.x,e.y,e.z)}getRotation(t){const e=this.bodies.get(t);return e?new Mn(e.quaternion.x,e.quaternion.y,e.quaternion.z,e.quaternion.w):null}setRotation(t,e){const n=this.bodies.get(t);n&&n.quaternion.set(e.x,e.y,e.z,e.w)}raycast(t,e,n){const i=new E(t.x,t.y,t.z),s=new E(e.x,e.y,e.z),o=new zs;return this.world.raycastClosest(i,s,{skipBackfaces:n?.skipBackfaces??!1,collisionFilterMask:n?.collisionFilterMask??-1,collisionFilterGroup:n?.collisionFilterGroup??-1},o)?o:null}getWorld(){return this.world}dispose(){this.bodies.forEach(t=>{this.world.removeBody(t)}),this.bodies.clear(),console.log("PhysicsWorld disposed")}}class hx{constructor(){this.G=66743e-15,this.celestialBodies=new Map,this.bodyPositions=new Map,this.bodyVelocities=new Map,this.useNBodySimulation=!1,console.log("GravitySystem initialized")}registerBody(t){this.celestialBodies.set(t.id,t),this.bodyPositions.set(t.id,t.position.clone());const e=new L(0,0,0);this.bodyVelocities.set(t.id,e)}unregisterBody(t){this.celestialBodies.delete(t),this.bodyPositions.delete(t),this.bodyVelocities.delete(t)}updateBodyPosition(t,e){this.bodyPositions.set(t,e.clone())}calculateGravityOnPoint(t,e){const n=new L(0,0,0);return this.celestialBodies.forEach((i,s)=>{if(s===e)return;const o=this.bodyPositions.get(s);if(!o)return;const a=new L().subVectors(o,t),c=a.length();if(c<1)return;const l=this.G*i.mass/(c*c);a.normalize().multiplyScalar(l),n.add(a)}),n}updateOrbits(t){if(!this.useNBodySimulation)return;const e=new Map,n=new Map;this.celestialBodies.forEach((i,s)=>{if(i.orbitalElements.period===0){e.set(s,this.bodyPositions.get(s).clone()),n.set(s,new L(0,0,0));return}const o=this.bodyPositions.get(s),a=this.bodyVelocities.get(s),c=this.calculateGravityOnPoint(o,s),l=o.clone().add(a.clone().multiplyScalar(t)).add(c.clone().multiplyScalar(.5*t*t)),h=this.calculateGravityOnPoint(l,s),u=a.clone().add(c.clone().add(h).multiplyScalar(.5*t));e.set(s,l),n.set(s,u)}),e.forEach((i,s)=>{this.bodyPositions.set(s,i)}),n.forEach((i,s)=>{this.bodyVelocities.set(s,i)})}predictTrajectory(t,e,n,i=100){const s=[];let o=t.clone(),a=e.clone();s.push(o.clone());for(let c=0;c<n;c++){const l=this.calculateGravityOnPoint(o),h=a.clone(),u=a.clone().add(l.clone().multiplyScalar(i*.5)),d=this.calculateGravityOnPoint(o.clone().add(h.clone().multiplyScalar(i*.5))),f=a.clone().add(d.clone().multiplyScalar(i*.5)),p=this.calculateGravityOnPoint(o.clone().add(u.clone().multiplyScalar(i*.5))),v=a.clone().add(p.clone().multiplyScalar(i)),g=this.calculateGravityOnPoint(o.clone().add(f.clone().multiplyScalar(i)));o.add(h.clone().add(u.clone().multiplyScalar(2)).add(f.clone().multiplyScalar(2)).add(v).multiplyScalar(i/6)),a.add(l.clone().add(d.clone().multiplyScalar(2)).add(p.clone().multiplyScalar(2)).add(g).multiplyScalar(i/6)),s.push(o.clone())}return s}getDominantBody(t){let e=null,n=0;return this.celestialBodies.forEach((i,s)=>{const o=this.bodyPositions.get(s);if(!o)return;const c=new L().subVectors(o,t).length();if(c<1)return;const l=this.G*i.mass/(c*c);l>n&&(n=l,e=s)}),e}calculateEscapeVelocity(t){let e=0,n=0,i=0;return this.celestialBodies.forEach(s=>{const o=this.bodyPositions.get(s.id);if(!o)return;const a=t.distanceTo(o);a<1||(e+=s.mass,n+=a,i++)}),i===0?0:(n/=i,Math.sqrt(2*this.G*e/n))}setNBodySimulation(t){this.useNBodySimulation=t,console.log(`N-body simulation ${t?"enabled":"disabled"}`)}isNBodySimulationEnabled(){return this.useNBodySimulation}getBodies(){return this.celestialBodies}getBodyPosition(t){return this.bodyPositions.get(t)}getBodyVelocity(t){return this.bodyVelocities.get(t)}dispose(){this.celestialBodies.clear(),this.bodyPositions.clear(),this.bodyVelocities.clear(),console.log("GravitySystem disposed")}}class ux{constructor(){this.celestialBodies=new Map,this.bodyPositions=new Map,this.STEFAN_BOLTZMANN=567e-10,this.SPECIFIC_HEAT_AIR=1005,console.log("AtmosphericPhysics initialized")}registerBody(t,e){this.celestialBodies.set(t.id,t),this.bodyPositions.set(t.id,e.clone())}unregisterBody(t){this.celestialBodies.delete(t),this.bodyPositions.delete(t)}updateBodyPosition(t,e){this.bodyPositions.set(t,e.clone())}calculateAtmosphericData(t){let e=null,n=1/0;if(this.celestialBodies.forEach(h=>{if(!h.atmosphere)return;const u=this.bodyPositions.get(h.id);if(!u)return;const d=t.distanceTo(u);d<n&&(n=d,e=h)}),!e||!e.atmosphere)return null;const i=e.atmosphere,s=n-e.radius;if(s>i.height)return{density:0,pressure:0,temperature:0};const o=i.densityAtSeaLevel*Math.exp(-s/i.scaleHeight),a=o*287*273,l=Math.max(273-.0065*s,180);return{density:o,pressure:a,temperature:l}}calculateDrag(t,e,n,i){const s=this.calculateAtmosphericData(t);if(!s||s.density===0)return{force:new L(0,0,0),magnitude:0,coefficient:n};const o=e.length();if(o<.1)return{force:new L(0,0,0),magnitude:0,coefficient:n};const a=.5*s.density*o*o*n*i;return{force:e.clone().normalize().multiplyScalar(-1).multiplyScalar(a),magnitude:a,coefficient:n}}calculateHeating(t,e,n=1){const i=this.calculateAtmosphericData(t);if(!i||i.density===0)return{heatFlux:0,temperature:0,isReentryHeating:!1};const s=e.length(),a=183e-6*Math.sqrt(i.density/n)*Math.pow(s,3),l=Math.pow(a/(.8*this.STEFAN_BOLTZMANN),.25),h=s>2e3&&i.density>.001;return{heatFlux:a,temperature:l,isReentryHeating:h}}calculateAerodynamicForces(t,e,n,i){const s=this.calculateAtmosphericData(t),o=new L(0,0,0);if(!s||s.density===0||e.length()<.1)return{lift:o.clone(),drag:o.clone(),sideForce:o.clone(),totalForce:o.clone()};const a=e.length(),c=e.clone().normalize();let l=new L(0,0,0),h=new L(0,0,0),u=new L(0,0,0);i.forEach(f=>{const p=f.normal.clone().applyQuaternion(n),v=Math.acos(Math.max(-1,Math.min(1,-c.dot(p))));let g=f.liftCoefficient*Math.sin(2*v),m=f.dragCoefficient*(1+Math.pow(Math.sin(v),2));f.controlDeflection&&(g+=f.controlDeflection*.1);const _=.5*s.density*a*a,x=_*g*f.area,y=_*m*f.area,b=new L().crossVectors(c,p).cross(c).normalize(),C=c.clone().multiplyScalar(-1);l.add(b.multiplyScalar(x)),h.add(C.multiplyScalar(y))});const d=new L().add(l).add(h).add(u);return{lift:l,drag:h,sideForce:u,totalForce:d}}getAtmosphericBody(t){let e=null,n=1/0;return this.celestialBodies.forEach(i=>{if(!i.atmosphere)return;const s=this.bodyPositions.get(i.id);if(!s)return;const o=t.distanceTo(s);o-i.radius<=i.atmosphere.height&&o<n&&(n=o,e=i)}),e}calculateTerminalVelocity(t,e,n,i,s){const o=this.calculateAtmosphericData(t);return!o||o.density===0?1/0:Math.sqrt(2*e*s/(o.density*n*i))}dispose(){this.celestialBodies.clear(),this.bodyPositions.clear(),console.log("AtmosphericPhysics disposed")}}let ut;const Qh=new Array(128).fill(void 0);Qh.push(void 0,null,!0,!1);Qh.length;let Er=null;function Kl(){return Er!==null&&Er.byteLength!==0||(Er=new Int32Array(ut.memory.buffer)),Er}const dx=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&dx.decode();function Wt(r,t){if(!(r instanceof t))throw new Error(`expected instance of ${t.name}`);return r.ptr}let br=null;function fx(){return br!==null&&br.byteLength!==0||(br=new Float32Array(ut.memory.buffer)),br}let Tr=null;function px(){return Tr!==null&&Tr.byteLength!==0||(Tr=new Uint32Array(ut.memory.buffer)),Tr}let en=0;function vi(r,t){const e=t(4*r.length,4)>>>0;return fx().set(r,e/4),en=r.length,e}function Cr(r,t){const e=t(4*r.length,4)>>>0;return px().set(r,e/4),en=r.length,e}const Ue=Object.freeze({Ball:0,0:"Ball",Cuboid:1,1:"Cuboid",Capsule:2,2:"Capsule",Segment:3,3:"Segment",Polyline:4,4:"Polyline",Triangle:5,5:"Triangle",TriMesh:6,6:"TriMesh",HeightField:7,7:"HeightField",Compound:8,8:"Compound",ConvexPolyhedron:9,9:"ConvexPolyhedron",Cylinder:10,10:"Cylinder",Cone:11,11:"Cone",RoundCuboid:12,12:"RoundCuboid",RoundTriangle:13,13:"RoundTriangle",RoundCylinder:14,14:"RoundCylinder",RoundCone:15,15:"RoundCone",RoundConvexPolyhedron:16,16:"RoundConvexPolyhedron",HalfSpace:17,17:"HalfSpace"});class cc{static __wrap(t){t>>>=0;const e=Object.create(cc.prototype);return e.__wbg_ptr=t,e}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,t}free(){const t=this.__destroy_into_raw();ut.__wbg_rawpointprojection_free(t)}point(){const t=ut.rawpointprojection_point(this.__wbg_ptr);return zt.__wrap(t)}isInside(){return ut.rawpointprojection_isInside(this.__wbg_ptr)!==0}}class lc{static __wrap(t){t>>>=0;const e=Object.create(lc.prototype);return e.__wbg_ptr=t,e}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,t}free(){const t=this.__destroy_into_raw();ut.__wbg_rawrayintersection_free(t)}normal(){const t=ut.rawraycolliderintersection_normal(this.__wbg_ptr);return zt.__wrap(t)}toi(){return ut.rawraycolliderintersection_toi(this.__wbg_ptr)}featureType(){return ut.rawpointcolliderprojection_featureType(this.__wbg_ptr)}featureId(){try{const n=ut.__wbindgen_add_to_stack_pointer(-16);ut.rawpointcolliderprojection_featureId(n,this.__wbg_ptr);var t=Kl()[n/4+0],e=Kl()[n/4+1];return t===0?void 0:e>>>0}finally{ut.__wbindgen_add_to_stack_pointer(16)}}}class qe{static __wrap(t){t>>>=0;const e=Object.create(qe.prototype);return e.__wbg_ptr=t,e}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,t}free(){const t=this.__destroy_into_raw();ut.__wbg_rawrotation_free(t)}constructor(t,e,n,i){const s=ut.rawrotation_new(t,e,n,i);return this.__wbg_ptr=s>>>0,this}static identity(){const t=ut.rawrotation_identity();return qe.__wrap(t)}get x(){return ut.rawrotation_x(this.__wbg_ptr)}get y(){return ut.rawintegrationparameters_dt(this.__wbg_ptr)}get z(){return ut.rawraycolliderintersection_toi(this.__wbg_ptr)}get w(){return ut.rawintegrationparameters_erp(this.__wbg_ptr)}}class jt{static __wrap(t){t>>>=0;const e=Object.create(jt.prototype);return e.__wbg_ptr=t,e}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,t}free(){const t=this.__destroy_into_raw();ut.__wbg_rawshape_free(t)}static cuboid(t,e,n){const i=ut.rawshape_cuboid(t,e,n);return jt.__wrap(i)}static roundCuboid(t,e,n,i){const s=ut.rawshape_roundCuboid(t,e,n,i);return jt.__wrap(s)}static ball(t){const e=ut.rawshape_ball(t);return jt.__wrap(e)}static halfspace(t){Wt(t,zt);const e=ut.rawshape_halfspace(t.__wbg_ptr);return jt.__wrap(e)}static capsule(t,e){const n=ut.rawshape_capsule(t,e);return jt.__wrap(n)}static cylinder(t,e){const n=ut.rawshape_cylinder(t,e);return jt.__wrap(n)}static roundCylinder(t,e,n){const i=ut.rawshape_roundCylinder(t,e,n);return jt.__wrap(i)}static cone(t,e){const n=ut.rawshape_cone(t,e);return jt.__wrap(n)}static roundCone(t,e,n){const i=ut.rawshape_roundCone(t,e,n);return jt.__wrap(i)}static polyline(t,e){const n=vi(t,ut.__wbindgen_malloc),i=en,s=Cr(e,ut.__wbindgen_malloc),o=en,a=ut.rawshape_polyline(n,i,s,o);return jt.__wrap(a)}static trimesh(t,e){const n=vi(t,ut.__wbindgen_malloc),i=en,s=Cr(e,ut.__wbindgen_malloc),o=en,a=ut.rawshape_trimesh(n,i,s,o);return jt.__wrap(a)}static heightfield(t,e,n,i){const s=vi(n,ut.__wbindgen_malloc),o=en;Wt(i,zt);const a=ut.rawshape_heightfield(t,e,s,o,i.__wbg_ptr);return jt.__wrap(a)}static segment(t,e){Wt(t,zt),Wt(e,zt);const n=ut.rawshape_segment(t.__wbg_ptr,e.__wbg_ptr);return jt.__wrap(n)}static triangle(t,e,n){Wt(t,zt),Wt(e,zt),Wt(n,zt);const i=ut.rawshape_triangle(t.__wbg_ptr,e.__wbg_ptr,n.__wbg_ptr);return jt.__wrap(i)}static roundTriangle(t,e,n,i){Wt(t,zt),Wt(e,zt),Wt(n,zt);const s=ut.rawshape_roundTriangle(t.__wbg_ptr,e.__wbg_ptr,n.__wbg_ptr,i);return jt.__wrap(s)}static convexHull(t){const e=vi(t,ut.__wbindgen_malloc),n=en,i=ut.rawshape_convexHull(e,n);return i===0?void 0:jt.__wrap(i)}static roundConvexHull(t,e){const n=vi(t,ut.__wbindgen_malloc),i=en,s=ut.rawshape_roundConvexHull(n,i,e);return s===0?void 0:jt.__wrap(s)}static convexMesh(t,e){const n=vi(t,ut.__wbindgen_malloc),i=en,s=Cr(e,ut.__wbindgen_malloc),o=en,a=ut.rawshape_convexMesh(n,i,s,o);return a===0?void 0:jt.__wrap(a)}static roundConvexMesh(t,e,n){const i=vi(t,ut.__wbindgen_malloc),s=en,o=Cr(e,ut.__wbindgen_malloc),a=en,c=ut.rawshape_roundConvexMesh(i,s,o,a,n);return c===0?void 0:jt.__wrap(c)}castShape(t,e,n,i,s,o,a,c,l){Wt(t,zt),Wt(e,qe),Wt(n,zt),Wt(i,jt),Wt(s,zt),Wt(o,qe),Wt(a,zt);const h=ut.rawshape_castShape(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,n.__wbg_ptr,i.__wbg_ptr,s.__wbg_ptr,o.__wbg_ptr,a.__wbg_ptr,c,l);return h===0?void 0:uc.__wrap(h)}intersectsShape(t,e,n,i,s){return Wt(t,zt),Wt(e,qe),Wt(n,jt),Wt(i,zt),Wt(s,qe),ut.rawshape_intersectsShape(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,n.__wbg_ptr,i.__wbg_ptr,s.__wbg_ptr)!==0}contactShape(t,e,n,i,s,o){Wt(t,zt),Wt(e,qe),Wt(n,jt),Wt(i,zt),Wt(s,qe);const a=ut.rawshape_contactShape(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,n.__wbg_ptr,i.__wbg_ptr,s.__wbg_ptr,o);return a===0?void 0:hc.__wrap(a)}containsPoint(t,e,n){return Wt(t,zt),Wt(e,qe),Wt(n,zt),ut.rawshape_containsPoint(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,n.__wbg_ptr)!==0}projectPoint(t,e,n,i){Wt(t,zt),Wt(e,qe),Wt(n,zt);const s=ut.rawshape_projectPoint(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,n.__wbg_ptr,i);return cc.__wrap(s)}intersectsRay(t,e,n,i,s){return Wt(t,zt),Wt(e,qe),Wt(n,zt),Wt(i,zt),ut.rawshape_intersectsRay(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,n.__wbg_ptr,i.__wbg_ptr,s)!==0}castRay(t,e,n,i,s,o){return Wt(t,zt),Wt(e,qe),Wt(n,zt),Wt(i,zt),ut.rawshape_castRay(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,n.__wbg_ptr,i.__wbg_ptr,s,o)}castRayAndGetNormal(t,e,n,i,s,o){Wt(t,zt),Wt(e,qe),Wt(n,zt),Wt(i,zt);const a=ut.rawshape_castRayAndGetNormal(this.__wbg_ptr,t.__wbg_ptr,e.__wbg_ptr,n.__wbg_ptr,i.__wbg_ptr,s,o);return a===0?void 0:lc.__wrap(a)}}class hc{static __wrap(t){t>>>=0;const e=Object.create(hc.prototype);return e.__wbg_ptr=t,e}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,t}free(){const t=this.__destroy_into_raw();ut.__wbg_rawshapecontact_free(t)}distance(){return ut.rawkinematiccharactercontroller_maxSlopeClimbAngle(this.__wbg_ptr)}point1(){const t=ut.rawpointprojection_point(this.__wbg_ptr);return zt.__wrap(t)}point2(){const t=ut.rawraycolliderintersection_normal(this.__wbg_ptr);return zt.__wrap(t)}normal1(){const t=ut.rawshapecollidertoi_witness2(this.__wbg_ptr);return zt.__wrap(t)}normal2(){const t=ut.rawcharactercollision_translationDeltaApplied(this.__wbg_ptr);return zt.__wrap(t)}}class uc{static __wrap(t){t>>>=0;const e=Object.create(uc.prototype);return e.__wbg_ptr=t,e}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,t}free(){const t=this.__destroy_into_raw();ut.__wbg_rawshapetoi_free(t)}toi(){return ut.rawrotation_x(this.__wbg_ptr)}witness1(){const t=ut.rawshapetoi_witness1(this.__wbg_ptr);return zt.__wrap(t)}witness2(){const t=ut.rawcontactforceevent_total_force(this.__wbg_ptr);return zt.__wrap(t)}normal1(){const t=ut.rawshapetoi_normal1(this.__wbg_ptr);return zt.__wrap(t)}normal2(){const t=ut.rawshapetoi_normal2(this.__wbg_ptr);return zt.__wrap(t)}}class zt{static __wrap(t){t>>>=0;const e=Object.create(zt.prototype);return e.__wbg_ptr=t,e}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,t}free(){const t=this.__destroy_into_raw();ut.__wbg_rawvector_free(t)}static zero(){const t=ut.rawvector_zero();return zt.__wrap(t)}constructor(t,e,n){const i=ut.rawvector_new(t,e,n);return this.__wbg_ptr=i>>>0,this}get x(){return ut.rawrotation_x(this.__wbg_ptr)}set x(t){ut.rawvector_set_x(this.__wbg_ptr,t)}get y(){return ut.rawintegrationparameters_dt(this.__wbg_ptr)}set y(t){ut.rawintegrationparameters_set_dt(this.__wbg_ptr,t)}get z(){return ut.rawraycolliderintersection_toi(this.__wbg_ptr)}set z(t){ut.rawvector_set_z(this.__wbg_ptr,t)}xyz(){const t=ut.rawvector_xyz(this.__wbg_ptr);return zt.__wrap(t)}yxz(){const t=ut.rawvector_yxz(this.__wbg_ptr);return zt.__wrap(t)}zxy(){const t=ut.rawvector_zxy(this.__wbg_ptr);return zt.__wrap(t)}xzy(){const t=ut.rawvector_xzy(this.__wbg_ptr);return zt.__wrap(t)}yzx(){const t=ut.rawvector_yzx(this.__wbg_ptr);return zt.__wrap(t)}zyx(){const t=ut.rawvector_zyx(this.__wbg_ptr);return zt.__wrap(t)}}class mx{constructor(t,e,n){this.x=t,this.y=e,this.z=n}}class St{static new(t,e,n){return new mx(t,e,n)}static intoRaw(t){return new zt(t.x,t.y,t.z)}static zeros(){return St.new(0,0,0)}static fromRaw(t){if(!t)return null;let e=St.new(t.x,t.y,t.z);return t.free(),e}static copy(t,e){t.x=e.x,t.y=e.y,t.z=e.z}}class Zl{constructor(t,e,n,i){this.x=t,this.y=e,this.z=n,this.w=i}}class Pe{static identity(){return new Zl(0,0,0,1)}static fromRaw(t){if(!t)return null;let e=new Zl(t.x,t.y,t.z,t.w);return t.free(),e}static intoRaw(t){return new qe(t.x,t.y,t.z,t.w)}static copy(t,e){t.x=e.x,t.y=e.y,t.z=e.z,t.w=e.w}}var Tn,Jl,Ql,th,Or,Pa,De,eh,La,Ia,nh,Da,Ji;(function(r){r[r.Dynamic=0]="Dynamic",r[r.Fixed=1]="Fixed",r[r.KinematicPositionBased=2]="KinematicPositionBased",r[r.KinematicVelocityBased=3]="KinematicVelocityBased"})(Tn||(Tn={}));class Cn{constructor(t){this.enabled=!0,this.status=t,this.translation=St.zeros(),this.rotation=Pe.identity(),this.gravityScale=1,this.linvel=St.zeros(),this.mass=0,this.massOnly=!1,this.centerOfMass=St.zeros(),this.translationsEnabledX=!0,this.translationsEnabledY=!0,this.angvel=St.zeros(),this.principalAngularInertia=St.zeros(),this.angularInertiaLocalFrame=Pe.identity(),this.translationsEnabledZ=!0,this.rotationsEnabledX=!0,this.rotationsEnabledY=!0,this.rotationsEnabledZ=!0,this.linearDamping=0,this.angularDamping=0,this.canSleep=!0,this.sleeping=!1,this.ccdEnabled=!1,this.dominanceGroup=0,this.additionalSolverIterations=0}static dynamic(){return new Cn(Tn.Dynamic)}static kinematicPositionBased(){return new Cn(Tn.KinematicPositionBased)}static kinematicVelocityBased(){return new Cn(Tn.KinematicVelocityBased)}static fixed(){return new Cn(Tn.Fixed)}static newDynamic(){return new Cn(Tn.Dynamic)}static newKinematicPositionBased(){return new Cn(Tn.KinematicPositionBased)}static newKinematicVelocityBased(){return new Cn(Tn.KinematicVelocityBased)}static newStatic(){return new Cn(Tn.Fixed)}setDominanceGroup(t){return this.dominanceGroup=t,this}setAdditionalSolverIterations(t){return this.additionalSolverIterations=t,this}setEnabled(t){return this.enabled=t,this}setTranslation(t,e,n){if(typeof t!="number"||typeof e!="number"||typeof n!="number")throw TypeError("The translation components must be numbers.");return this.translation={x:t,y:e,z:n},this}setRotation(t){return Pe.copy(this.rotation,t),this}setGravityScale(t){return this.gravityScale=t,this}setAdditionalMass(t){return this.mass=t,this.massOnly=!0,this}setLinvel(t,e,n){if(typeof t!="number"||typeof e!="number"||typeof n!="number")throw TypeError("The linvel components must be numbers.");return this.linvel={x:t,y:e,z:n},this}setAngvel(t){return St.copy(this.angvel,t),this}setAdditionalMassProperties(t,e,n,i){return this.mass=t,St.copy(this.centerOfMass,e),St.copy(this.principalAngularInertia,n),Pe.copy(this.angularInertiaLocalFrame,i),this.massOnly=!1,this}enabledTranslations(t,e,n){return this.translationsEnabledX=t,this.translationsEnabledY=e,this.translationsEnabledZ=n,this}restrictTranslations(t,e,n){return this.enabledTranslations(t,e,n)}lockTranslations(){return this.enabledTranslations(!1,!1,!1)}enabledRotations(t,e,n){return this.rotationsEnabledX=t,this.rotationsEnabledY=e,this.rotationsEnabledZ=n,this}restrictRotations(t,e,n){return this.enabledRotations(t,e,n)}lockRotations(){return this.restrictRotations(!1,!1,!1)}setLinearDamping(t){return this.linearDamping=t,this}setAngularDamping(t){return this.angularDamping=t,this}setCanSleep(t){return this.canSleep=t,this}setSleeping(t){return this.sleeping=t,this}setCcdEnabled(t){return this.ccdEnabled=t,this}setUserData(t){return this.userData=t,this}}(function(r){r[r.Revolute=0]="Revolute",r[r.Fixed=1]="Fixed",r[r.Prismatic=2]="Prismatic",r[r.Rope=3]="Rope",r[r.Spring=4]="Spring",r[r.Spherical=5]="Spherical",r[r.Generic=6]="Generic"})(Jl||(Jl={})),(function(r){r[r.AccelerationBased=0]="AccelerationBased",r[r.ForceBased=1]="ForceBased"})(Ql||(Ql={})),(function(r){r[r.X=1]="X",r[r.Y=2]="Y",r[r.Z=4]="Z",r[r.AngX=8]="AngX",r[r.AngY=16]="AngY",r[r.AngZ=32]="AngZ"})(th||(th={}));(function(r){r[r.Average=0]="Average",r[r.Min=1]="Min",r[r.Multiply=2]="Multiply",r[r.Max=3]="Max"})(Or||(Or={}));class dc{constructor(t,e,n,i,s){this.distance=t,this.point1=e,this.point2=n,this.normal1=i,this.normal2=s}static fromRaw(t){if(!t)return null;const e=new dc(t.distance(),St.fromRaw(t.point1()),St.fromRaw(t.point2()),St.fromRaw(t.normal1()),St.fromRaw(t.normal2()));return t.free(),e}}(function(r){r[r.Vertex=0]="Vertex",r[r.Edge=1]="Edge",r[r.Face=2]="Face",r[r.Unknown=3]="Unknown"})(Pa||(Pa={}));class fc{constructor(t,e){this.point=t,this.isInside=e}static fromRaw(t){if(!t)return null;const e=new fc(St.fromRaw(t.point()),t.isInside());return t.free(),e}}class pc{constructor(t,e,n,i){this.featureType=Pa.Unknown,this.featureId=void 0,this.toi=t,this.normal=e,i!==void 0&&(this.featureId=i),n!==void 0&&(this.featureType=n)}static fromRaw(t){if(!t)return null;const e=new pc(t.toi(),St.fromRaw(t.normal()),t.featureType(),t.featureId());return t.free(),e}}class mc{constructor(t,e,n,i,s){this.toi=t,this.witness1=e,this.witness2=n,this.normal1=i,this.normal2=s}static fromRaw(t,e){if(!e)return null;const n=new mc(e.toi(),St.fromRaw(e.witness1()),St.fromRaw(e.witness2()),St.fromRaw(e.normal1()),St.fromRaw(e.normal2()));return e.free(),n}}class ze{static fromRaw(t,e){const n=t.coShapeType(e);let i,s,o,a,c,l,h;switch(n){case Ue.Ball:return new tu(t.coRadius(e));case Ue.Cuboid:return i=t.coHalfExtents(e),new eu(i.x,i.y,i.z);case Ue.RoundCuboid:return i=t.coHalfExtents(e),s=t.coRoundRadius(e),new nu(i.x,i.y,i.z,s);case Ue.Capsule:return c=t.coHalfHeight(e),l=t.coRadius(e),new iu(c,l);case Ue.Segment:return o=t.coVertices(e),new su(St.new(o[0],o[1],o[2]),St.new(o[3],o[4],o[5]));case Ue.Polyline:return o=t.coVertices(e),a=t.coIndices(e),new au(o,a);case Ue.Triangle:return o=t.coVertices(e),new ru(St.new(o[0],o[1],o[2]),St.new(o[3],o[4],o[5]),St.new(o[6],o[7],o[8]));case Ue.RoundTriangle:return o=t.coVertices(e),s=t.coRoundRadius(e),new ou(St.new(o[0],o[1],o[2]),St.new(o[3],o[4],o[5]),St.new(o[6],o[7],o[8]),s);case Ue.HalfSpace:return h=St.fromRaw(t.coHalfspaceNormal(e)),new gx(h);case Ue.TriMesh:return o=t.coVertices(e),a=t.coIndices(e),new cu(o,a);case Ue.HeightField:const u=t.coHeightfieldScale(e),d=t.coHeightfieldHeights(e),f=t.coHeightfieldNRows(e),p=t.coHeightfieldNCols(e);return new lu(f,p,d,u);case Ue.ConvexPolyhedron:return o=t.coVertices(e),a=t.coIndices(e),new Na(o,a);case Ue.RoundConvexPolyhedron:return o=t.coVertices(e),a=t.coIndices(e),s=t.coRoundRadius(e),new Fa(o,a,s);case Ue.Cylinder:return c=t.coHalfHeight(e),l=t.coRadius(e),new hu(c,l);case Ue.RoundCylinder:return c=t.coHalfHeight(e),l=t.coRadius(e),s=t.coRoundRadius(e),new uu(c,l,s);case Ue.Cone:return c=t.coHalfHeight(e),l=t.coRadius(e),new du(c,l);case Ue.RoundCone:return c=t.coHalfHeight(e),l=t.coRadius(e),s=t.coRoundRadius(e),new fu(c,l,s);default:throw new Error("unknown shape type: "+n)}}castShape(t,e,n,i,s,o,a,c,l){let h=St.intoRaw(t),u=Pe.intoRaw(e),d=St.intoRaw(n),f=St.intoRaw(s),p=Pe.intoRaw(o),v=St.intoRaw(a),g=this.intoRaw(),m=i.intoRaw(),_=mc.fromRaw(null,g.castShape(h,u,d,m,f,p,v,c,l));return h.free(),u.free(),d.free(),f.free(),p.free(),v.free(),g.free(),m.free(),_}intersectsShape(t,e,n,i,s){let o=St.intoRaw(t),a=Pe.intoRaw(e),c=St.intoRaw(i),l=Pe.intoRaw(s),h=this.intoRaw(),u=n.intoRaw(),d=h.intersectsShape(o,a,u,c,l);return o.free(),a.free(),c.free(),l.free(),h.free(),u.free(),d}contactShape(t,e,n,i,s,o){let a=St.intoRaw(t),c=Pe.intoRaw(e),l=St.intoRaw(i),h=Pe.intoRaw(s),u=this.intoRaw(),d=n.intoRaw(),f=dc.fromRaw(u.contactShape(a,c,d,l,h,o));return a.free(),c.free(),l.free(),h.free(),u.free(),d.free(),f}containsPoint(t,e,n){let i=St.intoRaw(t),s=Pe.intoRaw(e),o=St.intoRaw(n),a=this.intoRaw(),c=a.containsPoint(i,s,o);return i.free(),s.free(),o.free(),a.free(),c}projectPoint(t,e,n,i){let s=St.intoRaw(t),o=Pe.intoRaw(e),a=St.intoRaw(n),c=this.intoRaw(),l=fc.fromRaw(c.projectPoint(s,o,a,i));return s.free(),o.free(),a.free(),c.free(),l}intersectsRay(t,e,n,i){let s=St.intoRaw(e),o=Pe.intoRaw(n),a=St.intoRaw(t.origin),c=St.intoRaw(t.dir),l=this.intoRaw(),h=l.intersectsRay(s,o,a,c,i);return s.free(),o.free(),a.free(),c.free(),l.free(),h}castRay(t,e,n,i,s){let o=St.intoRaw(e),a=Pe.intoRaw(n),c=St.intoRaw(t.origin),l=St.intoRaw(t.dir),h=this.intoRaw(),u=h.castRay(o,a,c,l,i,s);return o.free(),a.free(),c.free(),l.free(),h.free(),u}castRayAndGetNormal(t,e,n,i,s){let o=St.intoRaw(e),a=Pe.intoRaw(n),c=St.intoRaw(t.origin),l=St.intoRaw(t.dir),h=this.intoRaw(),u=pc.fromRaw(h.castRayAndGetNormal(o,a,c,l,i,s));return o.free(),a.free(),c.free(),l.free(),h.free(),u}}(function(r){r[r.Ball=0]="Ball",r[r.Cuboid=1]="Cuboid",r[r.Capsule=2]="Capsule",r[r.Segment=3]="Segment",r[r.Polyline=4]="Polyline",r[r.Triangle=5]="Triangle",r[r.TriMesh=6]="TriMesh",r[r.HeightField=7]="HeightField",r[r.ConvexPolyhedron=9]="ConvexPolyhedron",r[r.Cylinder=10]="Cylinder",r[r.Cone=11]="Cone",r[r.RoundCuboid=12]="RoundCuboid",r[r.RoundTriangle=13]="RoundTriangle",r[r.RoundCylinder=14]="RoundCylinder",r[r.RoundCone=15]="RoundCone",r[r.RoundConvexPolyhedron=16]="RoundConvexPolyhedron",r[r.HalfSpace=17]="HalfSpace"})(De||(De={}));class tu extends ze{constructor(t){super(),this.type=De.Ball,this.radius=t}intoRaw(){return jt.ball(this.radius)}}class gx extends ze{constructor(t){super(),this.type=De.HalfSpace,this.normal=t}intoRaw(){let t=St.intoRaw(this.normal),e=jt.halfspace(t);return t.free(),e}}class eu extends ze{constructor(t,e,n){super(),this.type=De.Cuboid,this.halfExtents=St.new(t,e,n)}intoRaw(){return jt.cuboid(this.halfExtents.x,this.halfExtents.y,this.halfExtents.z)}}class nu extends ze{constructor(t,e,n,i){super(),this.type=De.RoundCuboid,this.halfExtents=St.new(t,e,n),this.borderRadius=i}intoRaw(){return jt.roundCuboid(this.halfExtents.x,this.halfExtents.y,this.halfExtents.z,this.borderRadius)}}class iu extends ze{constructor(t,e){super(),this.type=De.Capsule,this.halfHeight=t,this.radius=e}intoRaw(){return jt.capsule(this.halfHeight,this.radius)}}class su extends ze{constructor(t,e){super(),this.type=De.Segment,this.a=t,this.b=e}intoRaw(){let t=St.intoRaw(this.a),e=St.intoRaw(this.b),n=jt.segment(t,e);return t.free(),e.free(),n}}class ru extends ze{constructor(t,e,n){super(),this.type=De.Triangle,this.a=t,this.b=e,this.c=n}intoRaw(){let t=St.intoRaw(this.a),e=St.intoRaw(this.b),n=St.intoRaw(this.c),i=jt.triangle(t,e,n);return t.free(),e.free(),n.free(),i}}class ou extends ze{constructor(t,e,n,i){super(),this.type=De.RoundTriangle,this.a=t,this.b=e,this.c=n,this.borderRadius=i}intoRaw(){let t=St.intoRaw(this.a),e=St.intoRaw(this.b),n=St.intoRaw(this.c),i=jt.roundTriangle(t,e,n,this.borderRadius);return t.free(),e.free(),n.free(),i}}class au extends ze{constructor(t,e){super(),this.type=De.Polyline,this.vertices=t,this.indices=e??new Uint32Array(0)}intoRaw(){return jt.polyline(this.vertices,this.indices)}}class cu extends ze{constructor(t,e){super(),this.type=De.TriMesh,this.vertices=t,this.indices=e}intoRaw(){return jt.trimesh(this.vertices,this.indices)}}class Na extends ze{constructor(t,e){super(),this.type=De.ConvexPolyhedron,this.vertices=t,this.indices=e}intoRaw(){return this.indices?jt.convexMesh(this.vertices,this.indices):jt.convexHull(this.vertices)}}class Fa extends ze{constructor(t,e,n){super(),this.type=De.RoundConvexPolyhedron,this.vertices=t,this.indices=e,this.borderRadius=n}intoRaw(){return this.indices?jt.roundConvexMesh(this.vertices,this.indices,this.borderRadius):jt.roundConvexHull(this.vertices,this.borderRadius)}}class lu extends ze{constructor(t,e,n,i){super(),this.type=De.HeightField,this.nrows=t,this.ncols=e,this.heights=n,this.scale=i}intoRaw(){let t=St.intoRaw(this.scale),e=jt.heightfield(this.nrows,this.ncols,this.heights,t);return t.free(),e}}class hu extends ze{constructor(t,e){super(),this.type=De.Cylinder,this.halfHeight=t,this.radius=e}intoRaw(){return jt.cylinder(this.halfHeight,this.radius)}}class uu extends ze{constructor(t,e,n){super(),this.type=De.RoundCylinder,this.borderRadius=n,this.halfHeight=t,this.radius=e}intoRaw(){return jt.roundCylinder(this.halfHeight,this.radius,this.borderRadius)}}class du extends ze{constructor(t,e){super(),this.type=De.Cone,this.halfHeight=t,this.radius=e}intoRaw(){return jt.cone(this.halfHeight,this.radius)}}class fu extends ze{constructor(t,e,n){super(),this.type=De.RoundCone,this.halfHeight=t,this.radius=e,this.borderRadius=n}intoRaw(){return jt.roundCone(this.halfHeight,this.radius,this.borderRadius)}}(function(r){r[r.EXCLUDE_FIXED=1]="EXCLUDE_FIXED",r[r.EXCLUDE_KINEMATIC=2]="EXCLUDE_KINEMATIC",r[r.EXCLUDE_DYNAMIC=4]="EXCLUDE_DYNAMIC",r[r.EXCLUDE_SENSORS=8]="EXCLUDE_SENSORS",r[r.EXCLUDE_SOLIDS=16]="EXCLUDE_SOLIDS",r[r.ONLY_DYNAMIC=3]="ONLY_DYNAMIC",r[r.ONLY_KINEMATIC=5]="ONLY_KINEMATIC",r[r.ONLY_FIXED=6]="ONLY_FIXED"})(eh||(eh={}));(function(r){r[r.NONE=0]="NONE",r[r.COLLISION_EVENTS=1]="COLLISION_EVENTS",r[r.CONTACT_FORCE_EVENTS=2]="CONTACT_FORCE_EVENTS"})(La||(La={}));(function(r){r[r.NONE=0]="NONE",r[r.FILTER_CONTACT_PAIRS=1]="FILTER_CONTACT_PAIRS",r[r.FILTER_INTERSECTION_PAIRS=2]="FILTER_INTERSECTION_PAIRS"})(Ia||(Ia={})),(function(r){r[r.EMPTY=0]="EMPTY",r[r.COMPUTE_IMPULSE=1]="COMPUTE_IMPULSE"})(nh||(nh={})),(function(r){r[r.DYNAMIC_DYNAMIC=1]="DYNAMIC_DYNAMIC",r[r.DYNAMIC_KINEMATIC=12]="DYNAMIC_KINEMATIC",r[r.DYNAMIC_FIXED=2]="DYNAMIC_FIXED",r[r.KINEMATIC_KINEMATIC=52224]="KINEMATIC_KINEMATIC",r[r.KINEMATIC_FIXED=8704]="KINEMATIC_FIXED",r[r.FIXED_FIXED=32]="FIXED_FIXED",r[r.DEFAULT=15]="DEFAULT",r[r.ALL=60943]="ALL"})(Da||(Da={}));(function(r){r[r.Density=0]="Density",r[r.Mass=1]="Mass",r[r.MassProps=2]="MassProps"})(Ji||(Ji={}));class Te{constructor(t){this.enabled=!0,this.shape=t,this.massPropsMode=Ji.Density,this.density=1,this.friction=.5,this.restitution=0,this.rotation=Pe.identity(),this.translation=St.zeros(),this.isSensor=!1,this.collisionGroups=4294967295,this.solverGroups=4294967295,this.frictionCombineRule=Or.Average,this.restitutionCombineRule=Or.Average,this.activeCollisionTypes=Da.DEFAULT,this.activeEvents=La.NONE,this.activeHooks=Ia.NONE,this.mass=0,this.centerOfMass=St.zeros(),this.contactForceEventThreshold=0,this.principalAngularInertia=St.zeros(),this.angularInertiaLocalFrame=Pe.identity()}static ball(t){const e=new tu(t);return new Te(e)}static capsule(t,e){const n=new iu(t,e);return new Te(n)}static segment(t,e){const n=new su(t,e);return new Te(n)}static triangle(t,e,n){const i=new ru(t,e,n);return new Te(i)}static roundTriangle(t,e,n,i){const s=new ou(t,e,n,i);return new Te(s)}static polyline(t,e){const n=new au(t,e);return new Te(n)}static trimesh(t,e){const n=new cu(t,e);return new Te(n)}static cuboid(t,e,n){const i=new eu(t,e,n);return new Te(i)}static roundCuboid(t,e,n,i){const s=new nu(t,e,n,i);return new Te(s)}static heightfield(t,e,n,i){const s=new lu(t,e,n,i);return new Te(s)}static cylinder(t,e){const n=new hu(t,e);return new Te(n)}static roundCylinder(t,e,n){const i=new uu(t,e,n);return new Te(i)}static cone(t,e){const n=new du(t,e);return new Te(n)}static roundCone(t,e,n){const i=new fu(t,e,n);return new Te(i)}static convexHull(t){const e=new Na(t,null);return new Te(e)}static convexMesh(t,e){const n=new Na(t,e);return new Te(n)}static roundConvexHull(t,e){const n=new Fa(t,null,e);return new Te(n)}static roundConvexMesh(t,e,n){const i=new Fa(t,e,n);return new Te(i)}setTranslation(t,e,n){if(typeof t!="number"||typeof e!="number"||typeof n!="number")throw TypeError("The translation components must be numbers.");return this.translation={x:t,y:e,z:n},this}setRotation(t){return Pe.copy(this.rotation,t),this}setSensor(t){return this.isSensor=t,this}setEnabled(t){return this.enabled=t,this}setDensity(t){return this.massPropsMode=Ji.Density,this.density=t,this}setMass(t){return this.massPropsMode=Ji.Mass,this.mass=t,this}setMassProperties(t,e,n,i){return this.massPropsMode=Ji.MassProps,this.mass=t,St.copy(this.centerOfMass,e),St.copy(this.principalAngularInertia,n),Pe.copy(this.angularInertiaLocalFrame,i),this}setRestitution(t){return this.restitution=t,this}setFriction(t){return this.friction=t,this}setFrictionCombineRule(t){return this.frictionCombineRule=t,this}setRestitutionCombineRule(t){return this.restitutionCombineRule=t,this}setCollisionGroups(t){return this.collisionGroups=t,this}setSolverGroups(t){return this.solverGroups=t,this}setActiveHooks(t){return this.activeHooks=t,this}setActiveEvents(t){return this.activeEvents=t,this}setActiveCollisionTypes(t){return this.activeCollisionTypes=t,this}setContactForceEventThreshold(t){return this.contactForceEventThreshold=t,this}}for(var Xx={},vx=[],Ua=[],qx=typeof Uint8Array<"u"?Uint8Array:Array,Fo="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ji=0,_x=Fo.length;ji<_x;++ji)vx[ji]=Fo[ji],Ua[Fo.charCodeAt(ji)]=ji;Ua[45]=62,Ua[95]=63;class yx{constructor(){this.noiseGenerator=new xx}generateMetalTexture(t=512,e=512,n={}){const{baseColor:i="#C0C0C0",panelSize:s=64,scratchCount:o=100,rivetDensity:a=1}=n,c=document.createElement("canvas");c.width=t,c.height=e;const l=c.getContext("2d"),h=l.createImageData(t,e),u=h.data,d=this.hexToRgb(i);for(let p=0;p<e;p++)for(let v=0;v<t;v++){const g=(p*t+v)*4,_=1+this.noiseGenerator.noise2D(v*.05,p*.05)*.15;u[g]=Math.min(255,d.r*_),u[g+1]=Math.min(255,d.g*_),u[g+2]=Math.min(255,d.b*_),u[g+3]=255}l.putImageData(h,0,0),l.strokeStyle="#606060",l.lineWidth=2;for(let p=0;p<t;p+=s)l.beginPath(),l.moveTo(p,0),l.lineTo(p,e),l.stroke();for(let p=0;p<e;p+=s)l.beginPath(),l.moveTo(0,p),l.lineTo(t,p),l.stroke();l.strokeStyle="#808080",l.lineWidth=1;for(let p=0;p<o;p++){const v=Math.random()*t,g=Math.random()*e,m=Math.random()*50+10,_=Math.random()*Math.PI*2;l.beginPath(),l.moveTo(v,g),l.lineTo(v+Math.cos(_)*m,g+Math.sin(_)*m),l.stroke()}if(a>0){l.fillStyle="#A0A0A0";for(let p=s/2;p<t;p+=s)for(let v=s/2;v<e;v+=s)Math.random()<a&&(l.beginPath(),l.arc(p,v,3,0,Math.PI*2),l.fill())}const f=new sn(c);return f.wrapS=Oe,f.wrapT=Oe,f.needsUpdate=!0,f}generateCarbonFiberTexture(t=512,e=512,n={}){const{weaveSize:i=16,baseColor:s="#202020",weaveColor:o="#404040"}=n,a=document.createElement("canvas");a.width=t,a.height=e;const c=a.getContext("2d");c.fillStyle=s,c.fillRect(0,0,t,e),c.strokeStyle=o,c.lineWidth=2;for(let h=0;h<t;h+=i)for(let u=0;u<e;u+=i){const d=Math.floor(h/i+u/i)%2;c.beginPath(),d===0?(c.moveTo(h,u),c.lineTo(h+i,u+i)):(c.moveTo(h+i,u),c.lineTo(h,u+i)),c.stroke()}const l=new sn(a);return l.wrapS=Oe,l.wrapT=Oe,l.needsUpdate=!0,l}generateCircuitBoardTexture(t=512,e=512,n={}){const{baseColor:i="#104028",traceColor:s="#D0D0D0",traceCount:o=20,componentCount:a=50}=n,c=document.createElement("canvas");c.width=t,c.height=e;const l=c.getContext("2d");l.fillStyle=i,l.fillRect(0,0,t,e),l.strokeStyle=s,l.lineWidth=2;for(let d=0;d<o;d++){let f=Math.random()*t,p=Math.random()*e;l.beginPath(),l.moveTo(f,p);for(let v=0;v<5;v++){const g=Math.random()>.5,m=Math.random()*80+20;g?f+=(Math.random()>.5?1:-1)*m:p+=(Math.random()>.5?1:-1)*m,f=Math.max(0,Math.min(t,f)),p=Math.max(0,Math.min(e,p)),l.lineTo(f,p)}l.stroke()}const h=["#000000","#808080","#FF0000","#0000FF","#FFFF00"];for(let d=0;d<a;d++){const f=Math.random()*t,p=Math.random()*e,v=5+Math.random()*10,g=h[Math.floor(Math.random()*h.length)];l.fillStyle=g,Math.random()>.5?l.fillRect(f-v/2,p-v/2,v,v):(l.beginPath(),l.arc(f,p,v/2,0,Math.PI*2),l.fill())}const u=new sn(c);return u.wrapS=Oe,u.wrapT=Oe,u.needsUpdate=!0,u}generateCompositeTexture(t=512,e=512,n={}){const{baseColor:i="#4A4A4A",fiberDensity:s=.5}=n,o=document.createElement("canvas");o.width=t,o.height=e;const a=o.getContext("2d"),c=a.createImageData(t,e),l=c.data,h=this.hexToRgb(i);for(let d=0;d<e;d++)for(let f=0;f<t;f++){const p=(d*t+f)*4,v=this.noiseGenerator.noise2D(f*.02,d*.02),g=this.noiseGenerator.noise2D(f*.05,d*.05),_=1+(v+g)*s*.3;l[p]=Math.min(255,h.r*_),l[p+1]=Math.min(255,h.g*_),l[p+2]=Math.min(255,h.b*_),l[p+3]=255}a.putImageData(c,0,0);const u=new sn(o);return u.wrapS=Oe,u.wrapT=Oe,u.needsUpdate=!0,u}generateCeramicTexture(t=512,e=512,n={}){const{baseColor:i="#2A2A2A",tileSize:s=32}=n,o=document.createElement("canvas");o.width=t,o.height=e;const a=o.getContext("2d"),c=a.createImageData(t,e),l=c.data,h=this.hexToRgb(i);for(let d=0;d<e;d++)for(let f=0;f<t;f++){const p=(d*t+f)*4,g=1+this.noiseGenerator.noise2D(f*.1,d*.1)*.2;l[p]=Math.min(255,h.r*g),l[p+1]=Math.min(255,h.g*g),l[p+2]=Math.min(255,h.b*g),l[p+3]=255}a.putImageData(c,0,0),a.strokeStyle="#000000",a.lineWidth=2;for(let d=0;d<t;d+=s)a.beginPath(),a.moveTo(d,0),a.lineTo(d,e),a.stroke();for(let d=0;d<e;d+=s)a.beginPath(),a.moveTo(0,d),a.lineTo(t,d),a.stroke();const u=new sn(o);return u.wrapS=Oe,u.wrapT=Oe,u.needsUpdate=!0,u}generateNormalMap(t=512,e=512,n=1){const i=document.createElement("canvas");i.width=t,i.height=e;const s=i.getContext("2d"),o=s.createImageData(t,e),a=o.data;for(let l=0;l<e;l++)for(let h=0;h<t;h++){const u=(l*t+h)*4,d=this.noiseGenerator.noise2D((h-1)*.05,l*.05),f=this.noiseGenerator.noise2D((h+1)*.05,l*.05),p=this.noiseGenerator.noise2D(h*.05,(l-1)*.05),v=this.noiseGenerator.noise2D(h*.05,(l+1)*.05),g=(f-d)*n,m=(v-p)*n;a[u]=(g+1)*.5*255,a[u+1]=(m+1)*.5*255,a[u+2]=255,a[u+3]=255}s.putImageData(o,0,0);const c=new sn(i);return c.wrapS=Oe,c.wrapT=Oe,c.needsUpdate=!0,c}hexToRgb(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:192,g:192,b:192}}}class xx{constructor(){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(Math.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255]}noise2D(t,e){const n=.5*(Math.sqrt(3)-1),i=(3-Math.sqrt(3))/6,s=(t+e)*n,o=Math.floor(t+s),a=Math.floor(e+s),c=(o+a)*i,l=o-c,h=a-c,u=t-l,d=e-h;let f,p;u>d?(f=1,p=0):(f=0,p=1);const v=u-f+i,g=d-p+i,m=u-1+2*i,_=d-1+2*i,x=o&255,y=a&255;let b=.5-u*u-d*d,C=0;b>=0&&(b*=b,C=b*b*this.dot(this.grad3[this.perm[x+this.perm[y]]%12],u,d));let A=.5-v*v-g*g,I=0;A>=0&&(A*=A,I=A*A*this.dot(this.grad3[this.perm[x+f+this.perm[y+p]]%12],v,g));let S=.5-m*m-_*_,M=0;return S>=0&&(S*=S,M=S*S*this.dot(this.grad3[this.perm[x+1+this.perm[y+1]]%12],m,_)),70*(C+I+M)}dot(t,e,n){return t[0]*e+t[1]*n}}class Wr{constructor(){this.textureGenerator=new yx}getMaterialForPart(t){const e=t.proceduralConfig.material;let n,i,s,o;switch(e){case"metal":n=this.textureGenerator.generateMetalTexture(512,512,{baseColor:"#C0C0C0"}),i=this.textureGenerator.generateNormalMap(512,512,.5),s=.6,o=.8;break;case"carbon-fiber":n=this.textureGenerator.generateCarbonFiberTexture(512,512),i=this.textureGenerator.generateNormalMap(512,512,.3),s=.4,o=.2;break;case"composite":n=this.textureGenerator.generateCompositeTexture(512,512),i=this.textureGenerator.generateNormalMap(512,512,.4),s=.5,o=.3;break;case"ceramic":n=this.textureGenerator.generateCeramicTexture(512,512,{baseColor:"#2A2A2A"}),i=this.textureGenerator.generateNormalMap(512,512,.2),s=.8,o=.1;break;default:n=this.textureGenerator.generateMetalTexture(512,512),i=this.textureGenerator.generateNormalMap(512,512,.5),s=.6,o=.8}return new ne({map:n,normalMap:i,roughness:s,metalness:o})}createAttachPointVisuals(t){const e=new re;for(const n of t.attachPoints){const i=new Bs(n.size*.5,n.size*.02,8,16),s=new ne({color:6316128,roughness:.7,metalness:.8}),o=new xt(i,s);o.position.copy(n.position);const a=new L(0,1,0),c=new Mn;c.setFromUnitVectors(a,n.normal),o.quaternion.copy(c),e.add(o)}return e}addDetailElements(t,e={}){}getSizeScale(t){switch(t){case"small":return .625;case"medium":return 1.25;case"large":return 2.5;default:return 1.25}}createRoundedCylinder(t,e,n=16){return new ye(t,t,e,n,1)}createTaperedCylinder(t,e,n,i=16){return new ye(t,e,n,i,1)}createCapsuleGeometry(t,e,n=16,i=8){return new $a(t,e,n,i)}}class Mx extends Wr{generateCommandPod(t){return new re,t.proceduralConfig.type==="command-pod"?this.generateMannedPod(t):this.generateProbeCore(t)}generateMannedPod(t){const e=new re,n=t.proceduralConfig,i=this.getSizeScale(n.size),s=n.style||"capsule";let o;switch(s){case"capsule":o=this.createCapsuleGeometry(i*.5,i*.6,16,8);break;case"lander":o=this.createTaperedCylinder(i*.6,i*.4,i*1.2,8);break;case"aircraft":o=this.createAircraftCockpit(i);break;default:o=this.createCapsuleGeometry(i*.5,i*.6,16,8)}const a=this.getMaterialForPart(t),c=new xt(o,a);if(e.add(c),n.hasWindows){const u=this.createWindows(t,i);e.add(u)}const l=this.createHeatShield(i);l.position.y=-i*.8,e.add(l);const h=this.createAttachPointVisuals(t);return e.add(h),e}generateProbeCore(t){const e=new re,n=t.proceduralConfig,i=this.getSizeScale(n.size),s=new rn(i,i*.3,i),o=this.getMaterialForPart(t),a=new xt(s,o);e.add(a);const c=this.textureGenerator.generateCircuitBoardTexture(256,256),l=new ne({map:c,roughness:.7,metalness:.3}),h=new rn(i*1.05,i*.32,i*1.05),u=new xt(h,l);if(e.add(u),n.hasAntenna){const f=this.createAntenna(t,i);f.position.y=i*.2,e.add(f)}const d=this.createAttachPointVisuals(t);return e.add(d),e}createWindows(t,e){const n=new re,s=t.proceduralConfig.customParameters?.windowCount||3,o=new Ka(e*.15,16),a=new ne({color:2113696,transparent:!0,opacity:.7,roughness:.1,metalness:.9,emissive:1056832,emissiveIntensity:.2});for(let l=0;l<s;l++){const h=l/s*Math.PI*2,u=new xt(o,a);u.position.set(Math.cos(h)*e*.5,e*.1,Math.sin(h)*e*.5),u.lookAt(Math.cos(h)*e,e*.1,Math.sin(h)*e),n.add(u)}const c=new xt(o,a);return c.position.set(0,e*.6,0),c.rotation.x=-Math.PI/2,n.add(c),n}createHeatShield(t){const e=new Ge(t*.6,16,16,0,Math.PI*2,0,Math.PI/2),n=this.textureGenerator.generateCeramicTexture(512,512,{baseColor:"#2A2A2A",tileSize:32}),i=new ne({map:n,roughness:.9,metalness:.1,color:3815994}),s=new xt(e,i);return s.rotation.x=Math.PI,s}createAntenna(t,e){const n=new re,s=t.proceduralConfig.customParameters?.antennaType||"rod",o=new ne({color:8421504,roughness:.5,metalness:.9});if(s==="rod"){const a=new ye(e*.02,e*.02,e*.8,8),c=new xt(a,o);c.position.y=e*.4,n.add(c);const l=new Ge(e*.04,8,8),h=new xt(l,o);h.position.y=e*.8,n.add(h)}else if(s==="dish"){const a=new Ge(e*.3,16,16,0,Math.PI*2,0,Math.PI/2),c=new xt(a,o);c.rotation.x=Math.PI,c.position.y=e*.4,n.add(c);const l=new ye(e*.03,e*.03,e*.3,8),h=new xt(l,o);h.position.y=e*.25,n.add(h)}else if(s==="array")for(let a=0;a<4;a++){const c=a/4*Math.PI*2,l=new ye(e*.015,e*.015,e*.5,8),h=new xt(l,o);h.position.set(Math.cos(c)*e*.1,e*.25,Math.sin(c)*e*.1),n.add(h)}return n}createAircraftCockpit(t){const e=new Lh;e.moveTo(0,0),e.lineTo(t*.5,t*.2),e.lineTo(t*.5,t*.8),e.quadraticCurveTo(t*.5,t*1.2,0,t*1.2),e.lineTo(-t*.5,t*.8),e.lineTo(-t*.5,t*.2),e.lineTo(0,0);const n={depth:t,bevelEnabled:!0,bevelThickness:t*.05,bevelSize:t*.05,bevelSegments:3},i=new Qa(e,n);return i.translate(0,-t*.6,-t*.5),i}}class wx extends Wr{generateFuelTank(t){const e=new re,n=t.proceduralConfig,i=this.getSizeScale(n.size),s=n.aspectRatio||2,o=n.tankType,a=i*.5,c=a*2*s,l=this.createTankBody(a,c,o),h=this.getTankMaterial(t),u=new xt(l,h);e.add(u);const d=this.createEndCap(a,"top");d.position.y=c/2,e.add(d);const f=this.createEndCap(a,"bottom");if(f.position.y=-c/2,e.add(f),n.customParameters?.hasFuelLines){const v=this.createFuelLines(a,c);e.add(v)}if(n.customParameters?.markerStyle){const v=this.createTankMarkings(a,c,n.customParameters.markerStyle,o);e.add(v)}if(n.customParameters?.hasInsulation&&o==="liquid"){const v=this.createInsulation(a,c);e.add(v)}const p=this.createAttachPointVisuals(t);return e.add(p),e}createTankBody(t,e,n){return new ye(t,t,e,32,1,!0)}createEndCap(t,e){const n=new Ge(t,32,16,0,Math.PI*2,0,Math.PI/2),i=new ne({color:11579568,roughness:.7,metalness:.8}),s=new xt(n,i);return e==="bottom"&&(s.rotation.x=Math.PI),s}getTankMaterial(t){const e=this.getMaterialForPart(t);return t.proceduralConfig.tankType==="solid"?e.color.setHex(4210752):t.proceduralConfig.tankType==="xenon"&&e.color.setHex(6324384),e}createFuelLines(t,e){const n=new re,i=t*.03,s=new ye(i,i,e*.9,8),o=new ne({color:4219135,roughness:.5,metalness:.9}),a=4;for(let c=0;c<a;c++){const l=c/a*Math.PI*2,h=new xt(s,o);h.position.set(Math.cos(l)*(t+i),0,Math.sin(l)*(t+i)),n.add(h)}return n}createTankMarkings(t,e,n,i){const s=new re;if(n==="stripes"){const a=e*.05,c=new ye(t*1.01,t*1.01,a,32),l=new ne({color:i==="liquid"?16777215:16755200,roughness:.8,metalness:.2});for(let h=0;h<3;h++){const u=-e/2+e/4*(h+1),d=new xt(c,l);d.position.y=u,s.add(d)}}else if(n==="warning"){const o=document.createElement("canvas");o.width=512,o.height=256;const a=o.getContext("2d");a.fillStyle="#FFD700",a.fillRect(0,0,o.width,o.height),a.fillStyle="#000000",a.font="bold 40px Arial",a.textAlign="center",i==="liquid"?(a.fillText("FLAMMABLE",o.width/2,80),a.fillText("LIQUID FUEL",o.width/2,140)):i==="solid"&&(a.fillText("SOLID FUEL",o.width/2,80),a.fillText("EXPLOSIVE",o.width/2,140));const c=new sn(o),l=new ne({map:c,transparent:!0,roughness:.9,metalness:.1}),h=new Ri(t*1.5,t*.8),u=new xt(h,l);u.position.set(t*1.01,0,0),u.rotation.y=-Math.PI/2,s.add(u)}return s}createInsulation(t,e){const n=new ye(t*1.02,t*1.02,e,32,1,!0),i=document.createElement("canvas");i.width=512,i.height=512;const s=i.getContext("2d");s.fillStyle="#FFA500",s.fillRect(0,0,i.width,i.height);for(let c=0;c<1e3;c++)s.fillStyle=`rgba(255, ${165+Math.random()*40}, 0, ${.3+Math.random()*.3})`,s.beginPath(),s.arc(Math.random()*i.width,Math.random()*i.height,Math.random()*5+1,0,Math.PI*2),s.fill();const o=new sn(i),a=new ne({map:o,roughness:.9,metalness:0,transparent:!0,opacity:.8});return new xt(n,a)}}class Sx extends Wr{generateEngine(t){new re;const e=t.proceduralConfig,n=this.getSizeScale(e.size);switch(e.engineType){case"liquid":return this.generateLiquidEngine(t,n);case"solid":return this.generateSolidEngine(t,n);case"ion":return this.generateIonEngine(t,n);case"nuclear":return this.generateNuclearEngine(t,n);default:return this.generateLiquidEngine(t,n)}}generateLiquidEngine(t,e){const n=new re,i=t.proceduralConfig,s=i.customParameters?.bellLength||1.2,o=this.createEngineBell(e,s,i.nozzleStyle),a=new ne({color:3158064,roughness:.4,metalness:.9}),c=new xt(o,a);c.position.y=-e*s*.35,n.add(c);const l=new ye(e*.4,e*.4,e*.6,16),h=this.getMaterialForPart(t),u=new xt(l,h);if(u.position.y=e*.3,n.add(u),i.customParameters?.hasTurbopump){const v=this.createTurbopump(e);v.position.y=e*.6,n.add(v)}const d=this.createFuelLines(e);if(n.add(d),i.customParameters?.hasGimbal){const v=this.createGimbalActuators(e);n.add(v)}const f=this.createExhaustEffect(t,e);n.add(f);const p=this.createAttachPointVisuals(t);return n.add(p),n}generateSolidEngine(t,e){const n=new re,i=this.createTaperedCylinder(e*.3,e*.5,e*.8,16),s=new ne({color:2105376,roughness:.3,metalness:.9}),o=new xt(i,s);o.position.y=-e*.4,n.add(o);const a=new ye(e*.55,e*.5,e*.3,16),c=new xt(a,s);c.position.y=-e*.95,n.add(c);const l=this.createTVCActuators(e);n.add(l);const h=this.createExhaustEffect(t,e);n.add(h);const u=this.createAttachPointVisuals(t);return n.add(u),n}generateIonEngine(t,e){const n=new re,i=new Ge(e*.3,16,16),s=new ne({color:4219135,roughness:.3,metalness:.8,emissive:2105440,emissiveIntensity:.3}),o=new xt(i,s);o.position.y=e*.2,n.add(o);const a=3;for(let u=0;u<a;u++){const d=this.createAcceleratorGrid(e*.4);d.position.y=-e*.1*(u+1),n.add(d)}const c=4;for(let u=0;u<c;u++){const d=u/c*Math.PI*2,f=new ye(e*.02,e*.02,e*.6,8),p=new ne({color:6316128,roughness:.6,metalness:.8}),v=new xt(f,p);v.position.set(Math.cos(d)*e*.35,-e*.1,Math.sin(d)*e*.35),n.add(v)}const l=this.createIonBeam(e);n.add(l);const h=this.createAttachPointVisuals(t);return n.add(h),n}generateNuclearEngine(t,e){const n=new re,i=new ye(e*.5,e*.5,e*.8,8),s=new ne({color:6316128,roughness:.7,metalness:.8}),o=new xt(i,s);o.position.y=e*.4,n.add(o);const a=this.createRadiationWarning(),c=new ne({map:a,transparent:!0}),l=new Ri(e*.6,e*.6);for(let p=0;p<4;p++){const v=p/4*Math.PI*2,g=new xt(l,c);g.position.set(Math.cos(v)*e*.51,e*.4,Math.sin(v)*e*.51),g.rotation.y=-v+Math.PI/2,n.add(g)}const h=this.createEngineBell(e,1,"bell"),u=new ne({color:4210752,roughness:.5,metalness:.9}),d=new xt(h,u);d.position.y=-e*.3,n.add(d);const f=this.createAttachPointVisuals(t);return n.add(f),n}createEngineBell(t,e,n){return n==="aerospike"?new es(t*.6,t*e*.8,16,1,!0):new es(t*.5,t*e*.7,16,1,!0)}createTurbopump(t){const e=new ye(t*.25,t*.25,t*.3,12),n=new ne({color:5263440,roughness:.5,metalness:.9});return new xt(e,n)}createFuelLines(t){const e=new re,n=new ye(t*.05,t*.05,t*.8,8),i=new ne({color:4219072,roughness:.4,metalness:.9});for(let s=0;s<4;s++){const o=s/4*Math.PI*2,a=new xt(n,i);a.position.set(Math.cos(o)*t*.45,0,Math.sin(o)*t*.45),e.add(a)}return e}createGimbalActuators(t){const e=new re,n=new ye(t*.05,t*.05,t*.3,8),i=new ne({color:6316128,roughness:.6,metalness:.8});for(let s=0;s<2;s++){const o=s/2*Math.PI*2,a=new xt(n,i);a.position.set(Math.cos(o)*t*.5,-t*.2,Math.sin(o)*t*.5),a.rotation.z=Math.PI/2,e.add(a)}return e}createTVCActuators(t){const e=new re,n=new rn(t*.15,t*.4,t*.1),i=new ne({color:5263440,roughness:.6,metalness:.8});for(let s=0;s<4;s++){const o=s/4*Math.PI*2,a=new xt(n,i);a.position.set(Math.cos(o)*t*.6,-t*.5,Math.sin(o)*t*.6),a.lookAt(0,-t,0),e.add(a)}return e}createAcceleratorGrid(t){const e=new tc(t*.2,t*.5,32),n=new ne({color:8421631,roughness:.3,metalness:.9,emissive:4210816,emissiveIntensity:.2,side:un});return new xt(e,n)}createExhaustEffect(t,e){const n=new re,s=t.proceduralConfig.customParameters?.exhaustColor||"#FFB84D",o=new es(e*.4,e*.6,8,1,!0),a=new jn({color:s,transparent:!0,opacity:0,side:un}),c=new xt(o,a);return c.position.y=-e*.8,c.name="exhaust-flame",n.add(c),n}createIonBeam(t){const e=new re,n=new ye(t*.1,t*.3,t*1,8),i=new jn({color:8421631,transparent:!0,opacity:0,side:un}),s=new xt(n,i);s.position.y=-t*.8,s.name="ion-beam",e.add(s);const o=new Ge(t*.3,16,16),a=new jn({color:8421631,transparent:!0,opacity:0}),c=new xt(o,a);return c.position.y=-t*.5,c.name="ion-glow",e.add(c),e}createRadiationWarning(){const t=document.createElement("canvas");t.width=256,t.height=256;const e=t.getContext("2d");e.fillStyle="#FFFF00",e.fillRect(0,0,t.width,t.height),e.fillStyle="#000000",e.strokeStyle="#000000",e.lineWidth=8;const n=t.width/2,i=t.height/2;e.beginPath(),e.arc(n,i,20,0,Math.PI*2),e.fill();for(let o=0;o<3;o++){const a=o/3*Math.PI*2-Math.PI/2;e.beginPath(),e.arc(n,i,80,a-Math.PI/6,a+Math.PI/6),e.lineTo(n,i),e.fill()}const s=new sn(t);return s.needsUpdate=!0,s}}class Ex extends Wr{generateStructuralComponent(t){switch(new re,t.proceduralConfig.structuralType){case"decoupler":return this.generateDecoupler(t);case"adapter":return this.generateAdapter(t);case"nose-cone":return this.generateNoseCone(t);case"strut":return this.generateStrut(t);case"panel":return this.generatePanel(t);default:return this.generateDecoupler(t)}}generateDecoupler(t){const e=new re,n=t.proceduralConfig,i=this.getSizeScale(n.size),s=new ye(i*.5,i*.5,i*.15,32),o=this.getMaterialForPart(t),a=new xt(s,o);e.add(a);const c=this.createSeparationRing(i);e.add(c);const l=8,h=new ye(i*.02,i*.02,i*.1,6),u=new ne({color:8421504,roughness:.6,metalness:.8});for(let f=0;f<l;f++){const p=f/l*Math.PI*2,v=new xt(h,u);v.position.set(Math.cos(p)*i*.48,0,Math.sin(p)*i*.48),v.rotation.z=Math.PI/2,e.add(v)}const d=this.createAttachPointVisuals(t);return e.add(d),e}generateAdapter(t){const e=new re,n=t.proceduralConfig,i=this.getSizeScale(n.size),s=n.customParameters?.topDiameter||i*.8,o=n.customParameters?.bottomDiameter||i,a=n.customParameters?.height||i*.6,c=this.createTaperedCylinder(s*.5,o*.5,a,32),l=this.getMaterialForPart(t),h=new xt(c,l);e.add(h),this.addReinforcementRings(e,s,o,a);const u=this.createAttachPointVisuals(t);return e.add(u),e}generateNoseCone(t){const e=new re,n=t.proceduralConfig,i=this.getSizeScale(n.size),s=this.createNoseConeGeometry(i),o=this.getMaterialForPart(t),a=new xt(s,o);e.add(a),this.addAerodynamicDetails(e,i);const c=this.createAttachPointVisuals(t);return e.add(c),e}generateStrut(t){const e=new re,n=t.proceduralConfig,i=this.getSizeScale(n.size);if(n.customParameters?.hasLattice||!1){const a=this.createLatticeStructure(i);e.add(a)}else{const a=new rn(i*.1,i*2,i*.1),c=this.getMaterialForPart(t),l=new xt(a,c);e.add(l)}const o=this.createAttachPointVisuals(t);return e.add(o),e}generatePanel(t){const e=new re,n=t.proceduralConfig,i=this.getSizeScale(n.size),s=new rn(i*1.5,i*.05,i*1),o=this.getMaterialForPart(t),a=new xt(s,o);e.add(a),this.addReinforcements(e,i);const c=this.createAttachPointVisuals(t);return e.add(c),e}createSeparationRing(t){const e=new Bs(t*.5,t*.03,8,32),n=new ne({color:16737792,roughness:.7,metalness:.5,emissive:3346688,emissiveIntensity:.2});return new xt(e,n)}addReinforcementRings(t,e,n,i){const o=new ne({color:9474192,roughness:.6,metalness:.8});for(let a=0;a<3;a++){const c=(a+1)/4,l=-i/2+i*c,h=n+(e-n)*c,u=new Bs(h*.5,h*.02,8,32),d=new xt(u,o);d.position.y=l,d.rotation.x=Math.PI/2,t.add(d)}}createNoseConeGeometry(t){const e=new es(t*.5,t*1.5,32,1),n=e.attributes.position;for(let i=0;i<n.count;i++){const s=n.getY(i);if(s>0){const o=s/(t*1.5),a=Math.sqrt(1-o);n.setX(i,n.getX(i)*a),n.setZ(i,n.getZ(i)*a)}}return n.needsUpdate=!0,e.computeVertexNormals(),e}addAerodynamicDetails(t,e){const n=new Ge(e*.05,8,8),i=new ne({color:12632256,roughness:.3,metalness:.9}),s=new xt(n,i);s.position.y=e*.75,t.add(s)}createLatticeStructure(t){const e=new re,n=new ne({color:11579568,roughness:.7,metalness:.8}),i=t*.02,s=t*2,o=4,a=4;for(let c=0;c<a;c++){const l=c/a*Math.PI*2,h=new ye(i,i,s,6),u=new xt(h,n);u.position.set(Math.cos(l)*t*.15,0,Math.sin(l)*t*.15),e.add(u)}for(let c=0;c<o;c++){const l=-s/2+s/o*(c+.5);for(let h=0;h<a;h++){const u=h/a*Math.PI*2,d=(h+1)/a*Math.PI*2,f=Math.cos(u)*t*.15,p=Math.sin(u)*t*.15,v=Math.cos(d)*t*.15,g=Math.sin(d)*t*.15,m=Math.sqrt((v-f)**2+(g-p)**2),_=new ye(i*.8,i*.8,m,6),x=new xt(_,n);x.position.set((f+v)/2,l,(p+g)/2),x.rotation.x=Math.PI/2,x.rotation.y=Math.atan2(g-p,v-f),e.add(x)}}return e}addReinforcements(t,e){const n=new ne({color:8421504,roughness:.7,metalness:.8}),i=3;for(let s=0;s<i;s++){const o=-e*.6+e*1.2/(i-1)*s,a=new rn(e*.05,e*.08,e*1),c=new xt(a,n);c.position.set(o,0,0),t.add(c)}}}const An=class An{constructor(t){this.isActive=!1,this.part=t,this.mesh=this.generateMesh(),this.updateTransform()}generateMesh(){const t=this.part.category;switch(t){case"command":return An.commandPodGenerator.generateCommandPod(this.part);case"fuel":return An.fuelTankGenerator.generateFuelTank(this.part);case"propulsion":return An.engineGenerator.generateEngine(this.part);case"structural":case"utility":case"aerodynamic":return An.structuralGenerator.generateStructuralComponent(this.part);default:return console.warn(`Unknown part category: ${t}, using placeholder`),this.createPlaceholder()}}createPlaceholder(){const t=new re,e=new rn(1,1,1),n=new ne({color:16711935,roughness:.7,metalness:.3}),i=new xt(e,n);return t.add(i),t}updateTransform(){this.mesh.position.copy(this.part.position),this.mesh.quaternion.copy(this.part.rotation)}update(t){for(const e of this.part.modules)e.isActive&&this.updateModule(e,t);this.updateTransform()}updateModule(t,e){switch(t.type){case"engine":this.updateEngine(t,e);break;case"rcs":this.updateRCS(t,e);break;case"parachute":this.updateParachute(t,e);break}}updateEngine(t,e){if(!t.isActive||t.currentThrottle===0){this.setExhaustVisibility(!1);return}if(this.setExhaustVisibility(!0,t.currentThrottle),this.part.resources&&t.fuelConsumption)for(const n of t.fuelConsumption){const i=this.part.resources.find(s=>s.resourceType===n.resourceType);if(i){const s=n.rate*t.currentThrottle*e;i.amount=Math.max(0,i.amount-s),i.amount===0&&(t.isActive=!1,t.currentThrottle=0)}}}setExhaustVisibility(t,e=1){this.mesh.traverse(n=>{(n.name==="exhaust-flame"||n.name==="ion-beam")&&n instanceof xt&&n.material instanceof jn&&(n.material.opacity=t?.7*e:0),n.name==="ion-glow"&&n instanceof xt&&n.material instanceof jn&&(n.material.opacity=t?.3*e:0)})}updateRCS(t,e){}updateParachute(t,e){}activateModule(t){const e=this.part.modules.find(n=>n.type===t);return e&&e.canToggle?(e.isActive=!0,!0):!1}deactivateModule(t){const e=this.part.modules.find(n=>n.type===t);return e&&e.canToggle?(e.isActive=!1,t==="engine"&&"currentThrottle"in e&&(e.currentThrottle=0),!0):!1}setThrottle(t){const e=this.part.modules.find(n=>n.type==="engine");return e&&"throttleable"in e&&e.throttleable?(e.currentThrottle=Math.max(0,Math.min(1,t)),!0):!1}getTotalMass(){let t=this.part.mass;if(this.part.resources)for(const e of this.part.resources)t+=e.amount;return t}dispose(){this.mesh.traverse(t=>{t instanceof xt&&(t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material.forEach(e=>e.dispose()):t.material.dispose()))})}};An.commandPodGenerator=new Mx,An.fuelTankGenerator=new wx,An.engineGenerator=new Sx,An.structuralGenerator=new Ex;let Br=An;class Uo{constructor(t,e,n){this.rigidBody=null,this.physicsWorld=null,this._totalMass=0,this._centerOfMass=new L,this._centerOfThrust=new L,this._momentOfInertia=new L(1,1,1),this.connections=new Map,this.position=new L,this.rotation=new Mn,this.velocity=new L,this.angularVelocity=new L,this.id=t,this.name=e,this.rootPartId=n,this.parts=new Map,this.stages=[],this.group=new re,this.group.name=`vehicle-${t}`}addPart(t){const e=new Br(t);return this.parts.set(t.id,e),this.group.add(e.mesh),t.attachedTo&&this.addConnection(t.id,t.attachedTo.partId),this.recalculateProperties(),e}removePart(t){const e=this.parts.get(t);if(!e)return!1;if(this.group.remove(e.mesh),e.dispose(),this.parts.delete(t),this.removeConnection(t),t===this.rootPartId&&this.parts.size>0){const n=Array.from(this.parts.values()).find(i=>i.part.category==="command");n?this.rootPartId=n.part.id:this.rootPartId=this.parts.keys().next().value}return this.recalculateProperties(),!0}getPart(t){return this.parts.get(t)}getAllParts(){return Array.from(this.parts.values())}addConnection(t,e){this.connections.has(t)||this.connections.set(t,[]),this.connections.has(e)||this.connections.set(e,[]),this.connections.get(t).push(e),this.connections.get(e).push(t)}removeConnection(t){const e=this.connections.get(t)||[];for(const n of e){const i=this.connections.get(n);if(i){const s=i.indexOf(t);s>-1&&i.splice(s,1)}}this.connections.delete(t)}recalculateProperties(){this.calculateTotalMass(),this.calculateCenterOfMass(),this.calculateCenterOfThrust(),this.calculateMomentOfInertia()}calculateTotalMass(){this._totalMass=0;for(const t of this.parts.values())this._totalMass+=t.getTotalMass()}calculateCenterOfMass(){if(this.parts.size===0){this._centerOfMass.set(0,0,0);return}const t=new L(0,0,0);let e=0;for(const n of this.parts.values()){const i=n.getTotalMass(),s=n.part.position.clone();t.add(s.multiplyScalar(i)),e+=i}e>0?this._centerOfMass.copy(t.divideScalar(e)):this._centerOfMass.set(0,0,0)}calculateCenterOfThrust(){const t=new L(0,0,0);let e=0;for(const n of this.parts.values()){const i=n.part.modules.find(s=>s.type==="engine");if(i&&i.isActive&&i.thrust){const s=i.thrust,o=n.part.position.clone();t.add(o.multiplyScalar(s)),e+=s}}e>0?this._centerOfThrust.copy(t.divideScalar(e)):this._centerOfThrust.copy(this._centerOfMass)}calculateMomentOfInertia(){if(this.parts.size===0){this._momentOfInertia.set(1,1,1);return}let t=0,e=0,n=0;for(const i of this.parts.values()){const s=i.getTotalMass(),o=i.part.position.clone().sub(this._centerOfMass);t+=s*(o.y*o.y+o.z*o.z),e+=s*(o.x*o.x+o.z*o.z),n+=s*(o.x*o.x+o.y*o.y)}this._momentOfInertia.set(Math.max(t,.1),Math.max(e,.1),Math.max(n,.1))}getTotalMass(){return this._totalMass}getDryMass(){let t=0;for(const e of this.parts.values())t+=e.part.mass;return t}getCenterOfMass(){return this._centerOfMass.clone()}getCenterOfThrust(){return this._centerOfThrust.clone()}getMomentOfInertia(){return this._momentOfInertia.clone()}calculateDeltaV(t){const e=new Set;for(let l=t;l<this.stages.length;l++)this.stages[l].partIds.forEach(h=>e.add(h));let n=0,i=0,s=0,o=0;for(const[l,h]of this.parts.entries())if(e.has(l)){n+=h.getTotalMass(),i+=h.part.mass;const u=h.part.modules.find(d=>d.type==="engine");u&&u.specificImpulse&&(s+=u.specificImpulse,o++)}return o===0||n===0||i===0?0:s/o*9.80665*Math.log(n/i)}calculateTWR(t=9.80665){let e=0;for(const i of this.parts.values()){const s=i.part.modules.find(o=>o.type==="engine");s&&s.thrust&&(e+=s.thrust*(s.currentThrottle||0))}const n=this._totalMass*t;return n>0?e/n:0}activateStage(t){if(t<0||t>=this.stages.length)return;const e=this.stages[t];for(const n of e.partIds){const i=this.parts.get(n);if(i){if(e.action==="activate")for(const s of i.part.modules)s.canToggle&&(s.isActive=!0);else if(e.action==="decouple"){const s=i.part.modules.find(o=>o.type==="decoupler");s&&(s.isActive=!0,s.isDecoupled=!0,this.separatePart(n,s.ejectionForce||0))}}}this.recalculateProperties()}separatePart(t,e){const n=this.getDownstreamParts(t);for(const i of n)this.removePart(i)}getDownstreamParts(t){const e=[],n=new Set,i=[t];for(;i.length>0;){const s=i.shift();if(n.has(s))continue;n.add(s),e.push(s);const o=this.connections.get(s)||[];for(const a of o)if(!n.has(a)){const c=this.parts.get(a);c&&c.part.attachedTo?.partId===s&&i.push(a)}}return e}initPhysics(t,e){this.physicsWorld=t;const n=Cn.dynamic().setTranslation(e.x,e.y,e.z).setAdditionalMass(this._totalMass);this.rigidBody=this.physicsWorld.world.createRigidBody(n);for(const i of this.parts.values()){const s=new ls;i.mesh.traverse(c=>{c instanceof xt&&c.geometry&&(c.geometry.computeBoundingSphere(),c.geometry.boundingSphere&&s.union(c.geometry.boundingSphere))});const o=Math.max(s.radius,.1),a=Te.ball(o).setTranslation(i.part.position.x,i.part.position.y,i.part.position.z).setDensity(1);this.physicsWorld.world.createCollider(a,this.rigidBody)}}update(t){for(const e of this.parts.values())e.update(t);if(this.rigidBody){const e=this.rigidBody.translation();this.position.set(e.x,e.y,e.z),this.group.position.copy(this.position);const n=this.rigidBody.rotation();this.rotation.set(n.x,n.y,n.z,n.w),this.group.quaternion.copy(this.rotation);const i=this.rigidBody.linvel();this.velocity.set(i.x,i.y,i.z);const s=this.rigidBody.angvel();this.angularVelocity.set(s.x,s.y,s.z)}}applyThrust(t){if(!this.rigidBody)return;const e=new L,n=new L;for(const i of this.parts.values()){const s=i.part.modules.find(o=>o.type==="engine");if(s&&s.isActive&&s.thrust){const o=s.currentThrottle||0,a=s.thrust*o,c=new L(0,1,0);c.applyQuaternion(i.part.rotation),c.applyQuaternion(this.rotation);const l=c.multiplyScalar(a);e.add(l);const u=i.part.position.clone().sub(this._centerOfMass).clone().cross(l);n.add(u)}}e.lengthSq()>0&&this.rigidBody.addForce({x:e.x,y:e.y,z:e.z},!0),n.lengthSq()>0&&this.rigidBody.addTorque({x:n.x,y:n.y,z:n.z},!0)}setThrottle(t){const e=Math.max(0,Math.min(1,t));for(const n of this.parts.values()){const i=n.part.modules.find(s=>s.type==="engine");i&&i.throttleable&&(i.currentThrottle=e)}}toJSON(){const t=[];for(const e of this.parts.values())t.push(e.part);return{id:this.id,name:this.name,parts:t,rootPartId:this.rootPartId,totalMass:this._totalMass,centerOfMass:this._centerOfMass,centerOfThrust:this._centerOfThrust,stages:this.stages}}dispose(){for(const t of this.parts.values())t.dispose();this.rigidBody&&this.physicsWorld&&(this.physicsWorld.world.removeRigidBody(this.rigidBody),this.rigidBody=null),this.parts.clear(),this.connections.clear()}}class bx{constructor(){this.vehicles=new Map,this.partsLibrary=new Map,this.currentVehicle=null,this.nextVehicleId=1}async loadPartsLibrary(t){try{const e=await fetch(t);if(!e.ok)throw new Error(`Failed to load parts library: ${e.statusText}`);const n=await e.json();for(const i of n.parts)this.partsLibrary.set(i.id,i);console.log(`Loaded ${this.partsLibrary.size} parts from ${t}`)}catch(e){throw console.error("Error loading parts library:",e),e}}getPartTemplate(t){return this.partsLibrary.get(t)}getAllPartTemplates(){return Array.from(this.partsLibrary.values())}getPartsByCategory(t){return Array.from(this.partsLibrary.values()).filter(e=>e.category===t)}createPartFromTemplate(t){const e=this.partsLibrary.get(t);if(!e)return console.error(`Part template ${t} not found`),null;const n=JSON.parse(JSON.stringify(e));return n.id=`${e.id}-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,n.position=new L(0,0,0),n.rotation=new Mn(0,0,0,1),n.attachedTo=void 0,n}createVehicle(t){const e=`vehicle-${this.nextVehicleId++}`,n=t||`Untitled Vehicle ${this.nextVehicleId-1}`,i=new Uo(e,n,"");return this.vehicles.set(e,i),i}getVehicle(t){return this.vehicles.get(t)}getAllVehicles(){return Array.from(this.vehicles.values())}setCurrentVehicle(t){this.currentVehicle=t}getCurrentVehicle(){return this.currentVehicle}deleteVehicle(t){const e=this.vehicles.get(t);return e?(e.dispose(),this.vehicles.delete(t),this.currentVehicle?.id===t&&(this.currentVehicle=null),!0):!1}saveVehicle(t){try{const e=t.toJSON(),n=JSON.stringify(e);return localStorage.setItem(`vehicle-${t.id}`,n),console.log(`Vehicle ${t.name} saved successfully`),!0}catch(e){return console.error("Error saving vehicle:",e),!1}}loadVehicle(t){try{const e=localStorage.getItem(`vehicle-${t}`);if(!e)return console.error(`Vehicle ${t} not found in storage`),null;const n=JSON.parse(e),i=new Uo(n.id,n.name,n.rootPartId);for(const s of n.parts)i.addPart(s);return i.stages=n.stages||[],this.vehicles.set(i.id,i),console.log(`Vehicle ${i.name} loaded successfully`),i}catch(e){return console.error("Error loading vehicle:",e),null}}getSavedVehicleIds(){const t=[];for(let e=0;e<localStorage.length;e++){const n=localStorage.key(e);n&&n.startsWith("vehicle-")&&t.push(n.replace("vehicle-",""))}return t}exportVehicleToFile(t){const e=t.toJSON(),n=JSON.stringify(e,null,2),i=new Blob([n],{type:"application/json"}),s=URL.createObjectURL(i),o=document.createElement("a");o.href=s,o.download=`${t.name.replace(/\s+/g,"_")}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(s),console.log(`Vehicle ${t.name} exported to file`)}async importVehicleFromFile(t){try{const e=await t.text(),n=JSON.parse(e),i=new Uo(n.id,n.name,n.rootPartId);for(const s of n.parts)i.addPart(s);return i.stages=n.stages||[],this.vehicles.set(i.id,i),console.log(`Vehicle ${i.name} imported successfully`),i}catch(e){return console.error("Error importing vehicle:",e),null}}validateVehicle(t){const e=[];if(t.parts.size===0)return e.push("Vehicle has no parts"),{valid:!1,errors:e};const n=t.getPart(t.rootPartId);if(!n)return e.push("Root part not found"),{valid:!1,errors:e};n.part.category!=="command"&&e.push("Root part must be a command pod or probe core");const i=new Set,s=[t.rootPartId];for(;s.length>0;){const o=s.shift();if(!i.has(o)){i.add(o);for(const[a,c]of t.parts.entries())c.part.attachedTo?.partId===o&&!i.has(a)&&s.push(a)}}return i.size!==t.parts.size&&e.push(`${t.parts.size-i.size} part(s) not connected to root`),t.stages.length===0&&e.push("Vehicle has no stages defined"),{valid:e.length===0,errors:e}}createSampleVehicle(){const t=this.getPartTemplate("mk1-command-pod"),e=this.getPartTemplate("fl-t400-fuel-tank"),n=this.getPartTemplate("lv-t30-engine"),i=this.getPartTemplate("tt-38k-decoupler");if(!t||!e||!n||!i)return console.error("Required part templates not found for sample vehicle"),null;const s=this.createVehicle("Sample Rocket"),o=this.createPartFromTemplate("mk1-command-pod");o.position=new L(0,2,0),s.addPart(o);const a=this.createPartFromTemplate("fl-t400-fuel-tank");a.position=new L(0,0,0),a.attachedTo={partId:o.id,attachPointId:"bottom"},s.addPart(a);const c=this.createPartFromTemplate("tt-38k-decoupler");c.position=new L(0,-1,0),c.attachedTo={partId:a.id,attachPointId:"bottom"},s.addPart(c);const l=this.createPartFromTemplate("lv-t30-engine");return l.position=new L(0,-1.5,0),l.attachedTo={partId:c.id,attachPointId:"bottom"},s.addPart(l),s.rootPartId=o.id,s.stages=[{stageNumber:0,partIds:[l.id],action:"activate"}],this.setCurrentVehicle(s),s}dispose(){for(const t of this.vehicles.values())t.dispose();this.vehicles.clear(),this.partsLibrary.clear(),this.currentVehicle=null}}class Tx{constructor(t,e,n,i,s){this.selectedPartTemplate=null,this.ghostPart=null,this.ghostGroup=null,this.hoveredPart=null,this.hoveredAttachPoint=null,this.symmetryMode=1,this.symmetryAxis="y",this.highlightedMeshes=[],this.originalMaterials=new Map,this.attachPointMarkers=[],this.vehicleManager=t,this.vehicle=e,this.inputManager=n,this.camera=i,this.domElement=s,this.raycaster=new Yf,this.mouse=new vt,this.setupEventListeners()}setupEventListeners(){this.domElement.addEventListener("mousemove",this.onMouseMove.bind(this)),this.domElement.addEventListener("click",this.onClick.bind(this))}onMouseMove(t){const e=this.domElement.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1}onClick(t){this.ghostPart&&this.hoveredAttachPoint&&this.placePart()}selectPartTemplate(t){const e=this.vehicleManager.getPartTemplate(t);if(!e){console.error(`Part template ${t} not found`);return}this.selectedPartTemplate=e,this.createGhostPart()}createGhostPart(){if(this.removeGhostPart(),!this.selectedPartTemplate)return;const t=this.vehicleManager.createPartFromTemplate(this.selectedPartTemplate.id);t&&(this.ghostPart=new Br(t),this.ghostGroup=new re,this.ghostGroup.add(this.ghostPart.mesh),this.ghostPart.mesh.traverse(e=>{e instanceof xt&&e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(i=>{i instanceof ai&&(i.transparent=!0,i.opacity=.5,i.depthWrite=!1)})}),this.vehicle.group.parent&&this.vehicle.group.parent.add(this.ghostGroup))}removeGhostPart(){this.ghostGroup&&this.ghostGroup.parent&&this.ghostGroup.parent.remove(this.ghostGroup),this.ghostPart&&(this.ghostPart.dispose(),this.ghostPart=null),this.ghostGroup=null}cancelPlacement(){this.selectedPartTemplate=null,this.removeGhostPart(),this.clearHighlight(),this.clearAttachPointMarkers()}placePart(){if(!this.ghostPart||!this.hoveredAttachPoint||!this.hoveredPart)return;const t=this.createSymmetricParts();for(const e of t)this.vehicle.addPart(e);this.cancelPlacement(),console.log(`Placed ${t.length} part(s)`)}createSymmetricParts(){if(!this.ghostPart||!this.selectedPartTemplate)return[];const t=[],e=this.ghostPart.part,n=this.vehicleManager.createPartFromTemplate(this.selectedPartTemplate.id);if(n.position.copy(e.position),n.rotation.copy(e.rotation),n.attachedTo=e.attachedTo,t.push(n),this.symmetryMode>1)for(let i=1;i<this.symmetryMode;i++){const s=360/this.symmetryMode*i*(Math.PI/180),o=this.vehicleManager.createPartFromTemplate(this.selectedPartTemplate.id),a=this.rotateAroundAxis(e.position.clone(),this.symmetryAxis,s);o.position.copy(a),o.rotation.copy(e.rotation),o.attachedTo=e.attachedTo,t.push(o)}return t}rotateAroundAxis(t,e,n){const i=new Mn;switch(e){case"x":i.setFromAxisAngle(new L(1,0,0),n);break;case"y":i.setFromAxisAngle(new L(0,1,0),n);break;case"z":i.setFromAxisAngle(new L(0,0,1),n);break}return t.applyQuaternion(i),t}setSymmetryMode(t){[1,2,3,4,6,8].includes(t)&&(this.symmetryMode=t,console.log(`Symmetry mode set to ${t}x`))}getSymmetryMode(){return this.symmetryMode}update(){this.handleKeyboardInput(),this.updateRaycasting(),this.ghostPart&&this.ghostGroup&&this.updateGhostPosition()}handleKeyboardInput(){this.inputManager.isKeyPressed("Escape")&&this.cancelPlacement(),this.inputManager.isKeyPressed("Digit1")?this.setSymmetryMode(1):this.inputManager.isKeyPressed("Digit2")?this.setSymmetryMode(2):this.inputManager.isKeyPressed("Digit3")?this.setSymmetryMode(3):this.inputManager.isKeyPressed("Digit4")?this.setSymmetryMode(4):this.inputManager.isKeyPressed("Digit6")?this.setSymmetryMode(6):this.inputManager.isKeyPressed("Digit8")&&this.setSymmetryMode(8)}updateRaycasting(){if(this.clearHighlight(),this.clearAttachPointMarkers(),this.hoveredPart=null,this.hoveredAttachPoint=null,!this.selectedPartTemplate)return;this.raycaster.setFromCamera(this.mouse,this.camera);const t=[];this.vehicle.group.traverse(n=>{n instanceof xt&&t.push(n)});const e=this.raycaster.intersectObjects(t,!1);if(e.length>0){let i=e[0].object;for(;i&&i.parent!==this.vehicle.group;)i=i.parent;if(i){for(const s of this.vehicle.getAllParts())if(s.mesh===i){this.hoveredPart=s;break}if(this.hoveredPart){this.highlightPart(this.hoveredPart);const s=e[0].point;this.hoveredAttachPoint=this.findClosestAttachPoint(this.hoveredPart,s),this.hoveredAttachPoint&&this.showAttachPointMarker(this.hoveredPart,this.hoveredAttachPoint)}}}}findClosestAttachPoint(t,e){let n=null,i=1/0;for(const s of t.part.attachPoints){const o=s.position.clone();o.add(t.part.position);const a=o.distanceTo(e);a<i&&(i=a,n=s)}return i<2?n:null}updateGhostPosition(){if(!this.ghostPart||!this.ghostGroup||!this.hoveredAttachPoint||!this.hoveredPart){this.ghostGroup.visible=!1;return}this.ghostGroup.visible=!0;const t=this.hoveredAttachPoint,e=t.position.clone().add(this.hoveredPart.part.position),n=this.ghostPart.part.attachPoints[0];if(n){const i=n.position.clone().negate();e.add(i)}this.ghostGroup.position.copy(e),this.ghostPart.part.attachedTo={partId:this.hoveredPart.part.id,attachPointId:t.id}}highlightPart(t){t.mesh.traverse(e=>{if(e instanceof xt){this.originalMaterials.has(e)||this.originalMaterials.set(e,e.material);const n=new ne({color:65280,emissive:65280,emissiveIntensity:.3,transparent:!0,opacity:.7});e.material=n,this.highlightedMeshes.push(e)}})}clearHighlight(){for(const t of this.highlightedMeshes){const e=this.originalMaterials.get(t);e&&(t.material=e)}this.highlightedMeshes=[],this.originalMaterials.clear()}showAttachPointMarker(t,e){const n=new Ge(.1,16,16),i=new jn({color:16711680,transparent:!0,opacity:.8}),s=new xt(n,i),o=e.position.clone().add(t.part.position);if(s.position.copy(o),this.vehicle.group.parent){const a=new re;a.add(s),this.vehicle.group.parent.add(a),this.attachPointMarkers.push(a)}}clearAttachPointMarkers(){for(const t of this.attachPointMarkers)t.parent&&t.parent.remove(t),t.traverse(e=>{e instanceof xt&&(e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(n=>n.dispose()):e.material.dispose()))});this.attachPointMarkers=[]}dispose(){this.cancelPlacement(),this.domElement.removeEventListener("mousemove",this.onMouseMove.bind(this)),this.domElement.removeEventListener("click",this.onClick.bind(this))}}class Cx{constructor(t,e=null){this.isVisible=!0,this.categoryTabs=new Map,this.partsGrid=null,this.searchInput=null,this.selectedCategory="command",this.categories=[{id:"command",name:"Command",icon:"🎮"},{id:"propulsion",name:"Propulsion",icon:"🚀"},{id:"fuel",name:"Fuel Tanks",icon:"⛽"},{id:"structural",name:"Structural",icon:"🔧"},{id:"utility",name:"Utility",icon:"🛠️"},{id:"science",name:"Science",icon:"🔬"},{id:"aerodynamic",name:"Aerodynamic",icon:"✈️"}],this.vehicleManager=t,this.partPlacement=e,this.container=document.createElement("div"),this.container.id="parts-catalog-ui",this.createUI(),document.body.appendChild(this.container)}setPartPlacement(t){this.partPlacement=t}createUI(){this.container.style.position="absolute",this.container.style.right="10px",this.container.style.top="10px",this.container.style.width="300px",this.container.style.maxHeight="80vh",this.container.style.backgroundColor="rgba(0, 0, 0, 0.85)",this.container.style.color="white",this.container.style.borderRadius="8px",this.container.style.padding="10px",this.container.style.fontFamily="Arial, sans-serif",this.container.style.fontSize="14px",this.container.style.overflowY="auto",this.container.style.zIndex="1000";const t=document.createElement("h2");t.textContent="Parts Catalog",t.style.margin="0 0 10px 0",t.style.fontSize="18px",t.style.borderBottom="2px solid #444",t.style.paddingBottom="5px",this.container.appendChild(t),this.createSearchBar(),this.createCategoryTabs(),this.partsGrid=document.createElement("div"),this.partsGrid.style.display="grid",this.partsGrid.style.gridTemplateColumns="1fr",this.partsGrid.style.gap="8px",this.partsGrid.style.marginTop="10px",this.container.appendChild(this.partsGrid),this.loadCategory(this.selectedCategory)}createSearchBar(){const t=document.createElement("div");t.style.marginBottom="10px",this.searchInput=document.createElement("input"),this.searchInput.type="text",this.searchInput.placeholder="Search parts...",this.searchInput.style.width="100%",this.searchInput.style.padding="8px",this.searchInput.style.backgroundColor="#222",this.searchInput.style.color="white",this.searchInput.style.border="1px solid #444",this.searchInput.style.borderRadius="4px",this.searchInput.style.fontSize="14px",this.searchInput.addEventListener("input",()=>{this.filterParts()}),t.appendChild(this.searchInput),this.container.appendChild(t)}createCategoryTabs(){const t=document.createElement("div");t.style.display="flex",t.style.flexWrap="wrap",t.style.gap="5px",t.style.marginBottom="10px";for(const e of this.categories){const n=document.createElement("button");n.textContent=`${e.icon} ${e.name}`,n.style.padding="6px 10px",n.style.backgroundColor=e.id===this.selectedCategory?"#0066cc":"#333",n.style.color="white",n.style.border="none",n.style.borderRadius="4px",n.style.cursor="pointer",n.style.fontSize="12px",n.style.transition="background-color 0.2s",n.addEventListener("mouseenter",()=>{e.id!==this.selectedCategory&&(n.style.backgroundColor="#444")}),n.addEventListener("mouseleave",()=>{e.id!==this.selectedCategory&&(n.style.backgroundColor="#333")}),n.addEventListener("click",()=>{this.selectCategory(e.id)}),t.appendChild(n),this.categoryTabs.set(e.id,n)}this.container.appendChild(t)}selectCategory(t){this.selectedCategory=t;for(const[e,n]of this.categoryTabs.entries())n instanceof HTMLButtonElement&&(n.style.backgroundColor=e===t?"#0066cc":"#333");this.loadCategory(t)}loadCategory(t){if(!this.partsGrid)return;this.partsGrid.innerHTML="";const e=this.vehicleManager.getPartsByCategory(t);if(e.length===0){const n=document.createElement("div");n.textContent="No parts in this category",n.style.color="#888",n.style.textAlign="center",n.style.padding="20px",this.partsGrid.appendChild(n);return}for(const n of e)this.createPartCard(n)}filterParts(){if(!this.partsGrid||!this.searchInput)return;const t=this.searchInput.value.toLowerCase();if(t===""){this.loadCategory(this.selectedCategory);return}this.partsGrid.innerHTML="";const n=this.vehicleManager.getAllPartTemplates().filter(i=>i.name.toLowerCase().includes(t)||i.description.toLowerCase().includes(t)||i.manufacturer.toLowerCase().includes(t));if(n.length===0){const i=document.createElement("div");i.textContent="No parts found",i.style.color="#888",i.style.textAlign="center",i.style.padding="20px",this.partsGrid.appendChild(i);return}for(const i of n)this.createPartCard(i)}createPartCard(t){if(!this.partsGrid)return;const e=document.createElement("div");e.style.backgroundColor="#1a1a1a",e.style.border="1px solid #333",e.style.borderRadius="6px",e.style.padding="10px",e.style.cursor="pointer",e.style.transition="all 0.2s",e.addEventListener("mouseenter",()=>{e.style.backgroundColor="#2a2a2a",e.style.borderColor="#0066cc"}),e.addEventListener("mouseleave",()=>{e.style.backgroundColor="#1a1a1a",e.style.borderColor="#333"}),e.addEventListener("click",()=>{this.selectPart(t)});const n=document.createElement("div");n.textContent=t.name,n.style.fontWeight="bold",n.style.marginBottom="5px",n.style.fontSize="14px",e.appendChild(n);const i=document.createElement("div");i.textContent=t.manufacturer,i.style.fontSize="11px",i.style.color="#888",i.style.marginBottom="5px",e.appendChild(i);const s=document.createElement("div");s.textContent=t.description,s.style.fontSize="12px",s.style.color="#ccc",s.style.marginBottom="8px",e.appendChild(s);const o=document.createElement("div");o.style.fontSize="11px",o.style.color="#aaa",o.style.borderTop="1px solid #333",o.style.paddingTop="5px";const a=[];if(a.push(`Mass: ${t.mass} kg`),a.push(`Cost: $${t.cost}`),t.category==="propulsion"){const c=t.modules.find(l=>l.type==="engine");c&&c.thrust&&a.push(`Thrust: ${(c.thrust/1e3).toFixed(1)} kN`),c&&c.specificImpulse&&a.push(`Isp: ${c.specificImpulse}s`)}else if(t.category==="fuel"&&t.resources){const c=t.resources.reduce((l,h)=>l+h.maxAmount,0);a.push(`Capacity: ${c} units`)}o.textContent=a.join(" | "),e.appendChild(o),this.partsGrid.appendChild(e)}selectPart(t){console.log(`Selected part: ${t.name}`),this.partPlacement&&this.partPlacement.selectPartTemplate(t.id),this.highlightSelectedPart(t.id)}highlightSelectedPart(t){if(!this.partsGrid)return;const e=this.partsGrid.children;for(let i=0;i<e.length;i++){const s=e[i];s.style.boxShadow="none"}const n=e[0];n&&(n.style.boxShadow="0 0 10px rgba(0, 102, 204, 0.5)")}toggleVisibility(){this.isVisible=!this.isVisible,this.container.style.display=this.isVisible?"block":"none"}show(){this.isVisible=!0,this.container.style.display="block"}hide(){this.isVisible=!1,this.container.style.display="none"}update(){}dispose(){this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}class Ax{constructor(t,e,n){this.isVisible=!0,this.symmetryButtons=new Map,this.currentSymmetryDisplay=null,this.vehicle=t,this.partPlacement=e,this.inputManager=n,this.container=document.createElement("div"),this.container.id="assembly-controls-ui",this.createUI(),document.body.appendChild(this.container)}setVehicle(t){this.vehicle=t}setPartPlacement(t){this.partPlacement=t}createUI(){this.container.style.position="absolute",this.container.style.bottom="10px",this.container.style.left="10px",this.container.style.backgroundColor="rgba(0, 0, 0, 0.85)",this.container.style.color="white",this.container.style.borderRadius="8px",this.container.style.padding="15px",this.container.style.fontFamily="Arial, sans-serif",this.container.style.fontSize="14px",this.container.style.zIndex="1000";const t=document.createElement("h3");t.textContent="Assembly Controls",t.style.margin="0 0 15px 0",t.style.fontSize="16px",t.style.borderBottom="2px solid #444",t.style.paddingBottom="5px",this.container.appendChild(t),this.createSymmetrySection(),this.createManipulationSection(),this.createActionButtons(),this.createKeyboardHelp()}createSymmetrySection(){const t=document.createElement("div");t.style.marginBottom="15px";const e=document.createElement("div");e.textContent="Symmetry Mode",e.style.fontWeight="bold",e.style.marginBottom="8px",t.appendChild(e);const n=document.createElement("div");n.style.display="flex",n.style.gap="5px",n.style.flexWrap="wrap";const i=[1,2,3,4,6,8];for(const s of i){const o=document.createElement("button");o.textContent=`${s}x`,o.style.padding="8px 12px",o.style.backgroundColor=s===1?"#0066cc":"#333",o.style.color="white",o.style.border="none",o.style.borderRadius="4px",o.style.cursor="pointer",o.style.fontSize="14px",o.style.fontWeight="bold",o.style.transition="background-color 0.2s",o.addEventListener("mouseenter",()=>{this.partPlacement?.getSymmetryMode()!==s&&(o.style.backgroundColor="#444")}),o.addEventListener("mouseleave",()=>{this.partPlacement?.getSymmetryMode()!==s&&(o.style.backgroundColor="#333")}),o.addEventListener("click",()=>{this.setSymmetryMode(s)}),n.appendChild(o),this.symmetryButtons.set(s,o)}t.appendChild(n),this.currentSymmetryDisplay=document.createElement("div"),this.currentSymmetryDisplay.style.marginTop="8px",this.currentSymmetryDisplay.style.fontSize="12px",this.currentSymmetryDisplay.style.color="#aaa",this.currentSymmetryDisplay.textContent="Current: 1x (No Symmetry)",t.appendChild(this.currentSymmetryDisplay),this.container.appendChild(t)}createManipulationSection(){const t=document.createElement("div");t.style.marginBottom="15px";const e=document.createElement("div");e.textContent="Part Manipulation",e.style.fontWeight="bold",e.style.marginBottom="8px",t.appendChild(e);const n=document.createElement("div");n.style.display="grid",n.style.gridTemplateColumns="1fr 1fr",n.style.gap="5px";const i=[{label:"Rotate ↻",key:"Q"},{label:"Rotate ↺",key:"E"},{label:"Delete",key:"Del"},{label:"Reset",key:"R"}];for(const s of i){const o=this.createButton(s.label,s.key);o.addEventListener("click",()=>{this.handleManipulationAction(s.key)}),n.appendChild(o)}t.appendChild(n),this.container.appendChild(t)}createActionButtons(){const t=document.createElement("div");t.style.marginBottom="15px";const e=document.createElement("div");e.textContent="Actions",e.style.fontWeight="bold",e.style.marginBottom="8px",t.appendChild(e);const n=document.createElement("div");n.style.display="grid",n.style.gridTemplateColumns="1fr 1fr",n.style.gap="5px";const i=[{label:"New Vehicle",action:"new"},{label:"Save",action:"save"},{label:"Load",action:"load"},{label:"Launch",action:"launch"}];for(const s of i){const o=this.createButton(s.label);o.addEventListener("click",()=>{this.handleAction(s.action)}),n.appendChild(o)}t.appendChild(n),this.container.appendChild(t)}createKeyboardHelp(){const t=document.createElement("div");t.style.fontSize="11px",t.style.color="#888",t.style.borderTop="1px solid #333",t.style.paddingTop="10px";const e=document.createElement("div");e.textContent="Keyboard Shortcuts:",e.style.fontWeight="bold",e.style.marginBottom="5px",t.appendChild(e);const n=["1-8: Set symmetry mode","Q/E: Rotate part","Del: Delete selected part","R: Reset part rotation","Esc: Cancel placement","Ctrl+S: Save vehicle","L: Launch vehicle"],i=document.createElement("ul");i.style.margin="0",i.style.paddingLeft="20px";for(const s of n){const o=document.createElement("li");o.textContent=s,o.style.marginBottom="3px",i.appendChild(o)}t.appendChild(i),this.container.appendChild(t)}createButton(t,e){const n=document.createElement("button");return n.textContent=e?`${t} (${e})`:t,n.style.padding="8px 12px",n.style.backgroundColor="#333",n.style.color="white",n.style.border="none",n.style.borderRadius="4px",n.style.cursor="pointer",n.style.fontSize="13px",n.style.transition="background-color 0.2s",n.addEventListener("mouseenter",()=>{n.style.backgroundColor="#444"}),n.addEventListener("mouseleave",()=>{n.style.backgroundColor="#333"}),n}setSymmetryMode(t){this.partPlacement&&this.partPlacement.setSymmetryMode(t);for(const[e,n]of this.symmetryButtons.entries())n.style.backgroundColor=e===t?"#0066cc":"#333";if(this.currentSymmetryDisplay){const e=t===1?"No Symmetry":`${t}-way Radial`;this.currentSymmetryDisplay.textContent=`Current: ${t}x (${e})`}}handleManipulationAction(t){switch(console.log(`Manipulation action: ${t}`),t){case"Q":console.log("Rotate counterclockwise");break;case"E":console.log("Rotate clockwise");break;case"Del":console.log("Delete selected part");break;case"R":console.log("Reset rotation");break}}handleAction(t){switch(console.log(`Action: ${t}`),t){case"new":confirm("Create new vehicle? Unsaved changes will be lost.")&&console.log("Creating new vehicle...");break;case"save":if(this.vehicle){const e=prompt("Enter vehicle name:",this.vehicle.name);e&&(this.vehicle.name=e,console.log("Vehicle saved"))}break;case"load":console.log("Load vehicle dialog...");break;case"launch":this.vehicle&&confirm(`Launch "${this.vehicle.name}"?`)&&console.log("Launching vehicle...");break}}update(){if(this.partPlacement&&this.currentSymmetryDisplay){const t=this.partPlacement.getSymmetryMode();for(const[e,n]of this.symmetryButtons.entries())n.style.backgroundColor=e===t?"#0066cc":"#333"}}toggleVisibility(){this.isVisible=!this.isVisible,this.container.style.display=this.isVisible?"block":"none"}show(){this.isVisible=!0,this.container.style.display="block"}hide(){this.isVisible=!1,this.container.style.display="none"}dispose(){this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}class Rx{constructor(t){this.isVisible=!0,this.nameDisplay=null,this.partCountDisplay=null,this.totalMassDisplay=null,this.dryMassDisplay=null,this.totalCostDisplay=null,this.twrDisplay=null,this.deltaVDisplay=null,this.stagesDisplay=null,this.vehicle=t,this.container=document.createElement("div"),this.container.id="vehicle-stats-ui",this.createUI(),document.body.appendChild(this.container)}setVehicle(t){this.vehicle=t,this.updateDisplay()}createUI(){this.container.style.position="absolute",this.container.style.top="10px",this.container.style.left="10px",this.container.style.minWidth="250px",this.container.style.backgroundColor="rgba(0, 0, 0, 0.85)",this.container.style.color="white",this.container.style.borderRadius="8px",this.container.style.padding="15px",this.container.style.fontFamily="Arial, sans-serif",this.container.style.fontSize="14px",this.container.style.zIndex="1000",this.nameDisplay=document.createElement("h2"),this.nameDisplay.style.margin="0 0 15px 0",this.nameDisplay.style.fontSize="18px",this.nameDisplay.style.borderBottom="2px solid #444",this.nameDisplay.style.paddingBottom="5px",this.container.appendChild(this.nameDisplay);const t=document.createElement("div");t.style.marginBottom="15px",this.partCountDisplay=this.createStatRow("Parts:","--"),this.totalMassDisplay=this.createStatRow("Total Mass:","--"),this.dryMassDisplay=this.createStatRow("Dry Mass:","--"),this.totalCostDisplay=this.createStatRow("Total Cost:","--"),t.appendChild(this.partCountDisplay),t.appendChild(this.totalMassDisplay),t.appendChild(this.dryMassDisplay),t.appendChild(this.totalCostDisplay),this.container.appendChild(t);const e=document.createElement("div");e.style.marginBottom="15px",e.style.borderTop="1px solid #333",e.style.paddingTop="10px";const n=document.createElement("div");n.textContent="Performance",n.style.fontWeight="bold",n.style.marginBottom="8px",e.appendChild(n),this.twrDisplay=this.createStatRow("TWR (Sea Level):","--"),this.deltaVDisplay=this.createStatRow("Total Δv:","--"),e.appendChild(this.twrDisplay),e.appendChild(this.deltaVDisplay),this.container.appendChild(e);const i=document.createElement("div");i.style.borderTop="1px solid #333",i.style.paddingTop="10px";const s=document.createElement("div");s.textContent="Stages",s.style.fontWeight="bold",s.style.marginBottom="8px",i.appendChild(s),this.stagesDisplay=document.createElement("div"),this.stagesDisplay.style.fontSize="12px",this.stagesDisplay.style.color="#aaa",i.appendChild(this.stagesDisplay),this.container.appendChild(i),this.updateDisplay()}createStatRow(t,e){const n=document.createElement("div");n.style.display="flex",n.style.justifyContent="space-between",n.style.marginBottom="5px",n.style.fontSize="13px";const i=document.createElement("span");i.textContent=t,i.style.color="#aaa";const s=document.createElement("span");return s.textContent=e,s.style.fontWeight="bold",s.className="stat-value",n.appendChild(i),n.appendChild(s),n}updateStatValue(t,e){const n=t.querySelector(".stat-value");n&&(n.textContent=e)}updateDisplay(){if(!this.vehicle){this.nameDisplay&&(this.nameDisplay.textContent="No Vehicle"),this.updateStatValue(this.partCountDisplay,"0"),this.updateStatValue(this.totalMassDisplay,"0 kg"),this.updateStatValue(this.dryMassDisplay,"0 kg"),this.updateStatValue(this.totalCostDisplay,"$0"),this.updateStatValue(this.twrDisplay,"--"),this.updateStatValue(this.deltaVDisplay,"0 m/s"),this.stagesDisplay&&(this.stagesDisplay.textContent="No stages");return}this.nameDisplay&&(this.nameDisplay.textContent=this.vehicle.name),this.vehicle.recalculateProperties();const t=this.vehicle.parts.size;this.updateStatValue(this.partCountDisplay,t.toString());const e=this.vehicle.getTotalMass();this.updateStatValue(this.totalMassDisplay,`${e.toFixed(1)} kg`);const n=this.vehicle.getDryMass();this.updateStatValue(this.dryMassDisplay,`${n.toFixed(1)} kg`);let i=0;for(const a of this.vehicle.getAllParts())i+=a.part.cost;this.updateStatValue(this.totalCostDisplay,`$${i.toLocaleString()}`);const s=this.vehicle.calculateTWR();if(s>0){this.updateStatValue(this.twrDisplay,s.toFixed(2));const a=this.twrDisplay.querySelector(".stat-value");a&&(s<1?a.style.color="#ff4444":s<1.5?a.style.color="#ffaa44":a.style.color="#44ff44")}else this.updateStatValue(this.twrDisplay,"--");let o=0;for(let a=0;a<this.vehicle.stages.length;a++)o+=this.vehicle.calculateDeltaV(a);if(this.updateStatValue(this.deltaVDisplay,`${o.toFixed(0)} m/s`),this.stagesDisplay)if(this.vehicle.stages.length===0)this.stagesDisplay.innerHTML='<span style="color: #ff4444;">No stages configured</span>';else{this.stagesDisplay.innerHTML="";for(let a=0;a<this.vehicle.stages.length;a++){const c=this.vehicle.stages[a],l=this.vehicle.calculateDeltaV(a),h=document.createElement("div");h.style.marginBottom="5px",h.style.padding="5px",h.style.backgroundColor="rgba(255, 255, 255, 0.05)",h.style.borderRadius="3px";const u=document.createElement("div");u.textContent=`Stage ${c.stageNumber}: ${c.action}`,u.style.fontWeight="bold",u.style.fontSize="11px";const d=document.createElement("div");d.textContent=`Δv: ${l.toFixed(0)} m/s | Parts: ${c.partIds.length}`,d.style.fontSize="10px",d.style.color="#888",h.appendChild(u),h.appendChild(d),this.stagesDisplay.appendChild(h)}}}update(){this.vehicle&&this.updateDisplay()}toggleVisibility(){this.isVisible=!this.isVisible,this.container.style.display=this.isVisible?"block":"none"}show(){this.isVisible=!0,this.container.style.display="block"}hide(){this.isVisible=!1,this.container.style.display="none"}dispose(){this.container.parentNode&&this.container.parentNode.removeChild(this.container)}}class Px{constructor(){this.scenes=new Map,this.currentScene=null,this.graphicsEngine=null}init(t){this.graphicsEngine=t,this.registerScene(new Lx),this.registerScene(new Ix),this.registerScene(new Dx),this.registerScene(new Nx),this.registerScene(new Fx),this.loadScene("main-menu")}registerScene(t){this.scenes.set(t.name,t)}loadScene(t){if(this.currentScene&&this.graphicsEngine){const n=this.scenes.get(this.currentScene);n&&n.destroy()}const e=this.scenes.get(t);if(!e){console.error(`Scene ${t} not found`);return}this.graphicsEngine&&e.init(this.graphicsEngine),this.currentScene=t,console.log(`Loaded scene: ${t}`)}update(t){if(!this.currentScene)return;const e=this.scenes.get(this.currentScene);e&&e.update(t)}getCurrentScene(){return this.currentScene}}class Lx{constructor(){this.name="main-menu"}init(t){console.log("Main menu scene initialized")}update(t){}destroy(){console.log("Main menu scene destroyed")}}class Ix{constructor(){this.name="main-game",this.timeManager=null,this.celestialBodiesManager=null,this.cameraController=null,this.inputManager=null,this.spaceUI=null,this.physicsWorld=null,this.gravitySystem=null,this.atmosphericPhysics=null}init(t){console.log("Main game scene initialized"),this.inputManager=new ic,this.inputManager.init(),this.timeManager=new xu,this.cameraController=new Hh(t.getCamera(),this.inputManager,t.getRenderer().domElement),this.physicsWorld=new lx,this.gravitySystem=new hx,this.atmosphericPhysics=new ux,this.celestialBodiesManager=new Fv(this.timeManager),this.celestialBodiesManager.init(t.getScene(),t.getCamera()),this.celestialBodiesManager.loadFromFile("/src/data/solar-system.json").then(()=>{console.log("Solar system loaded successfully"),this.celestialBodiesManager.getAllBodies().forEach(n=>{const i=this.celestialBodiesManager.getBodyData(n.body.id);i&&(this.gravitySystem.registerBody(i),this.gravitySystem.updateBodyPosition(i.id,n.mesh.position),i.atmosphere&&this.atmosphericPhysics.registerBody(i,n.mesh.position))})}).catch(e=>{console.error("Failed to load solar system:",e)}),this.spaceUI=new Uv(this.timeManager,this.celestialBodiesManager,this.cameraController)}update(t){if(this.inputManager&&this.inputManager.update(),this.cameraController&&this.cameraController.update(t),this.celestialBodiesManager&&this.celestialBodiesManager.update(t),this.physicsWorld&&this.timeManager){const e=this.timeManager.getTimeMultiplier();this.physicsWorld.update(t,e)}this.gravitySystem&&this.celestialBodiesManager&&this.celestialBodiesManager.getAllBodies().forEach(n=>{this.gravitySystem.updateBodyPosition(n.body.id,n.mesh.position)}),this.atmosphericPhysics&&this.celestialBodiesManager&&this.celestialBodiesManager.getAllBodies().forEach(n=>{n.body.atmosphere&&this.atmosphericPhysics.updateBodyPosition(n.body.id,n.mesh.position)}),this.spaceUI&&this.spaceUI.update()}destroy(){console.log("Main game scene destroyed"),this.physicsWorld&&(this.physicsWorld.dispose(),this.physicsWorld=null),this.gravitySystem&&(this.gravitySystem.dispose(),this.gravitySystem=null),this.atmosphericPhysics&&(this.atmosphericPhysics.dispose(),this.atmosphericPhysics=null),this.celestialBodiesManager&&(this.celestialBodiesManager.dispose(),this.celestialBodiesManager=null),this.spaceUI&&(this.spaceUI.dispose(),this.spaceUI=null),this.cameraController=null,this.inputManager=null,this.timeManager=null}}class Dx{constructor(){this.name="settings"}init(t){console.log("Settings scene initialized")}update(t){}destroy(){console.log("Settings scene destroyed")}}class Nx{constructor(){this.name="loading"}init(t){console.log("Loading scene initialized")}update(t){}destroy(){console.log("Loading scene destroyed")}}class Fx{constructor(){this.name="assembly-editor",this.vehicleManager=null,this.currentVehicle=null,this.inputManager=null,this.cameraController=null,this.graphicsEngine=null,this.partsCatalogUI=null,this.assemblyControlsUI=null,this.vehicleStatsUI=null,this.partPlacement=null,this.gridHelper=null}init(t){console.log("Assembly editor scene initialized"),this.graphicsEngine=t,this.inputManager=new ic,this.inputManager.init(),this.vehicleManager=new bx,this.vehicleManager.loadPartsLibrary("/src/data/parts-config.json").then(()=>{console.log("Parts library loaded"),this.currentVehicle=this.vehicleManager.createVehicle("New Rocket"),this.vehicleManager.setCurrentVehicle(this.currentVehicle),this.currentVehicle&&t.getScene().add(this.currentVehicle.group)}).catch(s=>{console.error("Failed to load parts library:",s)});const e=t.getCamera();e.position.set(10,10,10),e.lookAt(0,0,0),this.cameraController=new Hh(e,this.inputManager,t.getRenderer().domElement),this.gridHelper=new THREE.GridHelper(50,50,4473924,2236962),t.getScene().add(this.gridHelper);const n=new THREE.AmbientLight(16777215,.6);t.getScene().add(n);const i=new THREE.DirectionalLight(16777215,.8);i.position.set(5,10,7),t.getScene().add(i),this.partPlacement=new Tx(this.vehicleManager,this.currentVehicle,this.inputManager,e,t.getRenderer().domElement),this.partsCatalogUI=new Cx(this.vehicleManager,this.partPlacement),this.assemblyControlsUI=new Ax(this.currentVehicle,this.partPlacement,this.inputManager),this.vehicleStatsUI=new Rx(this.currentVehicle)}update(t){this.inputManager&&this.inputManager.update(),this.cameraController&&this.cameraController.update(t),this.currentVehicle&&this.currentVehicle.update(t),this.partsCatalogUI&&this.partsCatalogUI.update(),this.assemblyControlsUI&&this.assemblyControlsUI.update(),this.vehicleStatsUI&&this.vehicleStatsUI.update(),this.partPlacement&&this.partPlacement.update(),this.inputManager?.isKeyPressed("KeyL")&&this.currentVehicle&&console.log("Launching vehicle..."),this.inputManager?.isKeyPressed("KeyS")&&(this.inputManager?.isKeyPressed("ControlLeft")||this.inputManager?.isKeyPressed("ControlRight"))&&this.currentVehicle&&this.vehicleManager&&this.vehicleManager.saveVehicle(this.currentVehicle)}destroy(){console.log("Assembly editor scene destroyed"),this.currentVehicle&&this.graphicsEngine&&this.graphicsEngine.getScene().remove(this.currentVehicle.group),this.gridHelper&&this.graphicsEngine&&(this.graphicsEngine.getScene().remove(this.gridHelper),this.gridHelper=null),this.vehicleManager&&(this.vehicleManager.dispose(),this.vehicleManager=null),this.partsCatalogUI&&(this.partsCatalogUI.dispose(),this.partsCatalogUI=null),this.assemblyControlsUI&&(this.assemblyControlsUI.dispose(),this.assemblyControlsUI=null),this.vehicleStatsUI&&(this.vehicleStatsUI.dispose(),this.vehicleStatsUI=null),this.partPlacement&&(this.partPlacement.dispose(),this.partPlacement=null),this.cameraController=null,this.inputManager=null,this.currentVehicle=null}}class Ux{constructor(){if(this.canvas=document.getElementById("canvas"),!this.canvas)throw new Error("Canvas element not found");this.stats={fps:0,frameTime:0,drawCalls:0,triangles:0}}init(){this.renderer=new Pv({canvas:this.canvas,antialias:!0,alpha:!1}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(0,1),this.scene=new Kd,this.camera=new hn(75,window.innerWidth/window.innerHeight,.1,1e4),this.camera.position.set(0,5,10),this.camera.lookAt(0,0,0),this.setupLighting(),this.addTestObject(),console.log("Graphics engine initialized")}render(){const t=performance.now();this.renderer.render(this.scene,this.camera);const e=performance.now();this.stats.frameTime=e-t,this.stats.fps=1e3/this.stats.frameTime,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.triangles=this.renderer.info.render.triangles,this.updateDebugUI()}handleResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}getScene(){return this.scene}getCamera(){return this.camera}getRenderer(){return this.renderer}setupLighting(){const t=new Xf(4210752,.5);this.scene.add(t);const e=new Wf(16777215,1);e.position.set(5,10,5),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048,this.scene.add(e)}addTestObject(){const t=new rn(2,2,2),e=new ne({color:65280}),n=new xt(t,e);n.position.set(0,1,0),n.castShadow=!0,n.receiveShadow=!0,this.scene.add(n);const i=new Ri(20,20),s=new ne({color:8947848}),o=new xt(i,s);o.rotation.x=-Math.PI/2,o.receiveShadow=!0,this.scene.add(o)}updateDebugUI(){const t=document.getElementById("fps"),e=document.getElementById("frame-time"),n=document.getElementById("draw-calls"),i=document.getElementById("triangles");t&&(t.textContent=this.stats.fps.toFixed(1)),e&&(e.textContent=this.stats.frameTime.toFixed(2)),n&&(n.textContent=this.stats.drawCalls.toString()),i&&(i.textContent=this.stats.triangles.toString())}}class Ox{constructor(){this.isRunning=!1,this.lastTime=0,this.sceneManager=new Px,this.inputManager=new ic,this.graphicsEngine=new Ux}init(){this.graphicsEngine.init(),this.sceneManager.init(this.graphicsEngine),this.inputManager.init(),this.setupEventListeners(),console.log("Game initialized")}startNewGame(){this.isRunning&&this.stop(),this.sceneManager.loadScene("main-game"),this.start(),console.log("New game started")}start(){this.isRunning=!0,this.lastTime=performance.now(),this.gameLoop()}stop(){this.isRunning=!1}gameLoop(){if(!this.isRunning)return;const t=performance.now(),e=(t-this.lastTime)/1e3;this.lastTime=t,this.update(e),this.render(),requestAnimationFrame(()=>this.gameLoop())}update(t){this.sceneManager.update(t),this.inputManager.update()}render(){this.graphicsEngine.render()}setupEventListeners(){window.addEventListener("resize",()=>{this.graphicsEngine.handleResize()}),document.addEventListener("visibilitychange",()=>{document.hidden?this.stop():this.sceneManager.getCurrentScene()==="main-game"&&this.start()})}}document.addEventListener("DOMContentLoaded",()=>{const r=new Ox;r.init(),Bx(r)});function Bx(r){const t=document.getElementById("new-game-btn"),e=document.getElementById("load-game-btn"),n=document.getElementById("settings-btn"),i=document.getElementById("quit-btn"),s=document.getElementById("debug-info");t?.addEventListener("click",()=>{r.startNewGame(),o(),a()}),e?.addEventListener("click",()=>{console.log("Load game clicked")}),n?.addEventListener("click",()=>{console.log("Settings clicked")}),i?.addEventListener("click",()=>{window.electronAPI&&(window.electronAPI.removeAllListeners("menu-new-game"),window.electronAPI.removeAllListeners("menu-open-game")),window.close()}),window.electronAPI&&(window.electronAPI.onNewGame(()=>{r.startNewGame(),o(),a()}),window.electronAPI.onOpenGame(()=>{console.log("Open game from menu")}));function o(){const c=document.getElementById("main-menu");c&&c.classList.add("hidden")}function a(){s&&s.classList.remove("hidden")}}
