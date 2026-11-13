var oc="185";var lc=0,Da=1,cc=2;var tn=1,hc=2,Bn=3,zn=0,Pt=1,Ft=2,ui=0,hr=1,Na=2,Ua=3,Fa=4,uc=5;var Vn=100,dc=101,pc=102,mc=103,fc=104,gc=200,_c=201,vc=202,xc=203,yc=204,Mc=205,Sc=206,bc=207,Tc=208,Ec=209,Ac=210,wc=211,Cc=212,Rc=213,Ic=214,Pc=0,Lc=1,Dc=2,Oa=3,Nc=4,Uc=5,Fc=6,Oc=7,Bc=0,zc=1,Vc=2,ii=0,Ba=1,za=2,Va=3,ur=4,Ga=5,Ha=6,ka=7;var Gn=301,nn=302,os=303,ls=304,dr=306,cs=1000,hs=1001,Gc=1002,Oi=1003,Hc=1004;var pr=1005;var Ot=1006,us=1007;var rn=1008;var ni=1009,kc=1010,Wc=1011,mr=1012,Wa=1013,Bi=1014,wi=1015,ri=1016,Xa=1017,ja=1018,Hn=1020,Xc=35902,jc=35899,qc=1021,Yc=1022,di=1023,sn=1026,an=1027,Zc=1028,qa=1029,on=1030,Ya=1031;var Za=1033,ds=33776,ps=33777,ms=33778,fs=33779,Ja=35840,Ka=35841,$a=35842,Qa=35843,eo=36196,to=37492,io=37496,no=37488,ro=37489,gs=37490,so=37491,ao=37808,oo=37809,lo=37810,co=37811,ho=37812,uo=37813,po=37814,mo=37815,fo=37816,go=37817,_o=37818,vo=37819,xo=37820,yo=37821,Mo=36492,So=36494,bo=36495,To=36283,Eo=36284,_s=36285,Ao=36286;var wo=0,Jc=1,ln="",vs="srgb",Co="srgb-linear",Ro="linear",tt="srgb";var Kc=512,$c=513,Qc=514,xs=515,eh=516,th=517,ys=518,ih=519;var Io="300 es",Po=2000;function nu(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function sr(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function nh(){let e=sr("canvas");return e.style.display="block",e}var Ll={},Un=null;function Lo(...e){let t="THREE."+e.shift();Un?Un("log",t,...e):console.log(t,...e)}function rh(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let i=e[1];i&&i.isStackTrace?e[0]+=" "+i.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Le(...e){let t="THREE."+(e=rh(e)).shift();if(Un)Un("warn",t,...e);else{let i=e[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...e)}}function De(...e){let t="THREE."+(e=rh(e)).shift();if(Un)Un("error",t,...e);else{let i=e[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...e)}}function Qi(...e){let t=e.join(" ");t in Ll||(Ll[t]=!0,Le(...e))}function sh(e,t,i){return new Promise(function(n,r){setTimeout(function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:r();break;case e.TIMEOUT_EXPIRED:setTimeout(s,i);break;default:n()}},i)})}var ah={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class Ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i!==void 0&&(i[e]!==void 0&&i[e].indexOf(t)!==-1)}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let n=i[e];if(n!==void 0){let r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let n=i.slice(0);for(let r=0,s=n.length;r<s;r++)n[r].call(this,e);e.target=null}}}var Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var rs=Math.PI/180,ar=180/Math.PI;function kn(){let e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,i=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Ct[255&e]+Ct[e>>8&255]+Ct[e>>16&255]+Ct[e>>24&255]+"-"+Ct[255&t]+Ct[t>>8&255]+"-"+Ct[t>>16&15|64]+Ct[t>>24&255]+"-"+Ct[63&i|128]+Ct[i>>8&255]+"-"+Ct[i>>16&255]+Ct[i>>24&255]+Ct[255&n]+Ct[n>>8&255]+Ct[n>>16&255]+Ct[n>>24&255]).toLowerCase()}function Xe(e,t,i){return Math.max(t,Math.min(i,e))}function ru(e,t){return(e%t+t)%t}function na(e,t,i){return(1-i)*e+i*t}function Kn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function Ut(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(4294967295*e);case Uint16Array:return Math.round(65535*e);case Uint8Array:return Math.round(255*e);case Int32Array:return Math.round(2147483647*e);case Int16Array:return Math.round(32767*e);case Int8Array:return Math.round(127*e);default:throw Error("THREE.MathUtils: Invalid component type.")}}class ne{static{ne.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*i-s*n+e.x,this.y=r*n+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kt{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,s,a){let o=i[n+0],l=i[n+1],c=i[n+2],h=i[n+3],d=r[s+0],u=r[s+1],p=r[s+2],g=r[s+3];if(h!==g||o!==d||l!==u||c!==p){let m=o*d+l*u+c*p+h*g;m<0&&(d=-d,u=-u,p=-p,g=-g,m=-m);let v=1-a;if(m<0.9995){let f=Math.acos(m),_=Math.sin(f);v=Math.sin(v*f)/_,o=o*v+d*(a=Math.sin(a*f)/_),l=l*v+u*a,c=c*v+p*a,h=h*v+g*a}else{o=o*v+d*a,l=l*v+u*a,c=c*v+p*a,h=h*v+g*a;let f=1/Math.sqrt(o*o+l*l+c*c+h*h);o*=f,l*=f,c*=f,h*=f}}e[t]=o,e[t+1]=l,e[t+2]=c,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,n,r,s){let a=i[n],o=i[n+1],l=i[n+2],c=i[n+3],h=r[s],d=r[s+1],u=r[s+2],p=r[s+3];return e[t]=a*p+c*h+o*u-l*d,e[t+1]=o*p+c*d+l*h-a*u,e[t+2]=l*p+c*u+a*d-o*h,e[t+3]=c*p-a*h-o*d-l*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let{_x:i,_y:n,_z:r,_order:s}=e,a=Math.cos,o=Math.sin,l=a(i/2),c=a(n/2),h=a(r/2),d=o(i/2),u=o(n/2),p=o(r/2);switch(s){case"XYZ":this._x=d*c*h+l*u*p,this._y=l*u*h-d*c*p,this._z=l*c*p+d*u*h,this._w=l*c*h-d*u*p;break;case"YXZ":this._x=d*c*h+l*u*p,this._y=l*u*h-d*c*p,this._z=l*c*p-d*u*h,this._w=l*c*h+d*u*p;break;case"ZXY":this._x=d*c*h-l*u*p,this._y=l*u*h+d*c*p,this._z=l*c*p+d*u*h,this._w=l*c*h-d*u*p;break;case"ZYX":this._x=d*c*h-l*u*p,this._y=l*u*h+d*c*p,this._z=l*c*p-d*u*h,this._w=l*c*h+d*u*p;break;case"YZX":this._x=d*c*h+l*u*p,this._y=l*u*h+d*c*p,this._z=l*c*p-d*u*h,this._w=l*c*h-d*u*p;break;case"XZY":this._x=d*c*h-l*u*p,this._y=l*u*h-d*c*p,this._z=l*c*p+d*u*h,this._w=l*c*h+d*u*p;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],n=t[4],r=t[8],s=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10],d=i+a+h;if(d>0){let u=0.5/Math.sqrt(d+1);this._w=0.25/u,this._x=(c-o)*u,this._y=(r-l)*u,this._z=(s-n)*u}else if(i>a&&i>h){let u=2*Math.sqrt(1+i-a-h);this._w=(c-o)/u,this._x=0.25*u,this._y=(n+s)/u,this._z=(r+l)/u}else if(a>h){let u=2*Math.sqrt(1+a-i-h);this._w=(r-l)/u,this._x=(n+s)/u,this._y=0.25*u,this._z=(o+c)/u}else{let u=2*Math.sqrt(1+h-i-a);this._w=(s-n)/u,this._x=(r+l)/u,this._y=(o+c)/u,this._z=0.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<0.00000001?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let{_x:i,_y:n,_z:r,_w:s}=e,a=t._x,o=t._y,l=t._z,c=t._w;return this._x=i*c+s*a+n*l-r*o,this._y=n*c+s*o+r*a-i*l,this._z=r*c+s*l+i*o-n*a,this._w=s*c-i*a-n*o-r*l,this._onChangeCallback(),this}slerp(e,t){let{_x:i,_y:n,_z:r,_w:s}=e,a=this.dot(e);a<0&&(i=-i,n=-n,r=-r,s=-s,a=-a);let o=1-t;if(a<0.9995){let l=Math.acos(a),c=Math.sin(l);o=Math.sin(o*l)/c,t=Math.sin(t*l)/c,this._x=this._x*o+i*t,this._y=this._y*o+n*t,this._z=this._z*o+r*t,this._w=this._w*o+s*t,this._onChangeCallback()}else this._x=this._x*o+i*t,this._y=this._y*o+n*t,this._z=this._z*o+r*t,this._w=this._w*o+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{static{w.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Dl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Dl.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,r=e.elements,s=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*s,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*s,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*s,this}applyQuaternion(e){let t=this.x,i=this.y,n=this.z,r=e.x,s=e.y,a=e.z,o=e.w,l=2*(s*n-a*i),c=2*(a*t-r*n),h=2*(r*i-s*t);return this.x=t+o*l+s*h-a*c,this.y=i+o*c+a*l-r*h,this.z=n+o*h+r*c-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let{x:i,y:n,z:r}=e,s=t.x,a=t.y,o=t.z;return this.x=n*o-r*a,this.y=r*s-i*o,this.z=i*a-n*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ra.copy(this).projectOnVector(e),this.sub(ra)}reflect(e){return this.sub(ra.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var ra=new w,Dl=new kt;class Ge{static{Ge.prototype.isMatrix3=!0}constructor(e,t,i,n,r,s,a,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,s,a,o,l)}set(e,t,i,n,r,s,a,o,l){let c=this.elements;return c[0]=e,c[1]=n,c[2]=a,c[3]=t,c[4]=r,c[5]=o,c[6]=i,c[7]=s,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,r=this.elements,s=i[0],a=i[3],o=i[6],l=i[1],c=i[4],h=i[7],d=i[2],u=i[5],p=i[8],g=n[0],m=n[3],v=n[6],f=n[1],_=n[4],M=n[7],S=n[2],T=n[5],A=n[8];return r[0]=s*g+a*f+o*S,r[3]=s*m+a*_+o*T,r[6]=s*v+a*M+o*A,r[1]=l*g+c*f+h*S,r[4]=l*m+c*_+h*T,r[7]=l*v+c*M+h*A,r[2]=d*g+u*f+p*S,r[5]=d*m+u*_+p*T,r[8]=d*v+u*M+p*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8];return t*s*c-t*a*l-i*r*c+i*a*o+n*r*l-n*s*o}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],h=c*s-a*l,d=a*o-c*r,u=l*r-s*o,p=t*h+i*d+n*u;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/p;return e[0]=h*g,e[1]=(n*l-c*i)*g,e[2]=(a*i-n*s)*g,e[3]=d*g,e[4]=(c*t-n*o)*g,e[5]=(n*r-a*t)*g,e[6]=u*g,e[7]=(i*o-l*t)*g,e[8]=(s*t-i*r)*g,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,s,a){let o=Math.cos(r),l=Math.sin(r);return this.set(i*o,i*l,-i*(o*s+l*a)+s+e,-n*l,n*o,-n*(-l*s+o*a)+a+t,0,0,1),this}scale(e,t){return Qi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(sa.makeScale(e,t)),this}rotate(e){return Qi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(sa.makeRotation(-e)),this}translate(e,t){return Qi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(sa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}var sa=new Ge,Nl=new Ge().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),Ul=new Ge().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function su(){let e={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(r,s,a){return this.enabled!==!1&&s!==a&&s&&a?(this.spaces[s].transfer==="srgb"&&(r.r=Ei(r.r),r.g=Ei(r.g),r.b=Ei(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer==="srgb"&&(r.r=Nn(r.r),r.g=Nn(r.g),r.b=Nn(r.b)),r):r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===""?"linear":this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Qi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Qi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(r,s)}},t=[0.64,0.33,0.3,0.6,0.15,0.06],i=[0.2126,0.7152,0.0722],n=[0.3127,0.329];return e.define({["srgb-linear"]:{primaries:t,whitePoint:n,transfer:"linear",toXYZ:Nl,fromXYZ:Ul,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:t,whitePoint:n,transfer:"srgb",toXYZ:Nl,fromXYZ:Ul,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),e}var qe=su();function Ei(e){return e<0.04045?0.0773993808*e:Math.pow(0.9478672986*e+0.0521327014,2.4)}function Nn(e){return e<0.0031308?12.92*e:1.055*Math.pow(e,0.41666)-0.055}var bn;class Do{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src))return e.src;if(typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{bn===void 0&&(bn=sr("canvas")),bn.width=e.width,bn.height=e.height;let n=bn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=bn}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=sr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let s=0;s<r.length;s++)r[s]=255*Ei(r[s]/255);return i.putImageData(n,0,0),t}if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(255*Ei(t[i]/255)):t[i]=Ei(t[i]);return{data:t,width:e.width,height:e.height}}return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}var au=0;class fr{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=kn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let s=0,a=n.length;s<a;s++)n[s].isDataTexture?r.push(aa(n[s].image)):r.push(aa(n[s]))}else r=aa(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function aa(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Do.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}var ou=0,oa=new w;class Tt extends Ci{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,i=1001,n=1001,r=1006,s=1008,a=1023,o=1009,l=Tt.DEFAULT_ANISOTROPY,c=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ou++}),this.uuid=kn(),this.name="",this.source=new fr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=o,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(oa).x}get height(){return this.source.getSize(oa).y}get depth(){return this.source.getSize(oa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Le(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let n=this[t];n!==void 0?n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i:Le(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1000:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case 1000:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tt.DEFAULT_IMAGE=null,Tt.DEFAULT_MAPPING=300,Tt.DEFAULT_ANISOTROPY=1;class et{static{et.prototype.isVector4=!0}constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*n+s[12]*r,this.y=s[1]*t+s[5]*i+s[9]*n+s[13]*r,this.z=s[2]*t+s[6]*i+s[10]*n+s[14]*r,this.w=s[3]*t+s[7]*i+s[11]*n+s[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<0.0001?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r,s=0.01,a=0.1,o=e.elements,l=o[0],c=o[4],h=o[8],d=o[1],u=o[5],p=o[9],g=o[2],m=o[6],v=o[10];if(Math.abs(c-d)<0.01&&Math.abs(h-g)<0.01&&Math.abs(p-m)<0.01){if(Math.abs(c+d)<0.1&&Math.abs(h+g)<0.1&&Math.abs(p+m)<0.1&&Math.abs(l+u+v-3)<0.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,M=(u+1)/2,S=(v+1)/2,T=(c+d)/4,A=(h+g)/4,P=(p+m)/4;return _>M&&_>S?_<0.01?(i=0,n=0.707106781,r=0.707106781):(i=Math.sqrt(_),n=T/i,r=A/i):M>S?M<0.01?(i=0.707106781,n=0,r=0.707106781):(n=Math.sqrt(M),i=T/n,r=P/n):S<0.01?(i=0.707106781,n=0.707106781,r=0):(r=Math.sqrt(S),i=A/r,n=P/r),this.set(i,n,r,t),this}let f=Math.sqrt((m-p)*(m-p)+(h-g)*(h-g)+(d-c)*(d-c));return Math.abs(f)<0.001&&(f=1),this.x=(m-p)/f,this.y=(h-g)/f,this.z=(d-c)/f,this.w=Math.acos((l+u+v-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class No extends Ci{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t),this.textures=[];let n={width:e,height:t,depth:i.depth},r=new Tt(n),s=i.count;for(let a=0;a<s;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new fr(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yt extends No{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ms extends Tt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Uo extends Tt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ze{static{ze.prototype.isMatrix4=!0}constructor(e,t,i,n,r,s,a,o,l,c,h,d,u,p,g,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,s,a,o,l,c,h,d,u,p,g,m)}set(e,t,i,n,r,s,a,o,l,c,h,d,u,p,g,m){let v=this.elements;return v[0]=e,v[4]=t,v[8]=i,v[12]=n,v[1]=r,v[5]=s,v[9]=a,v[13]=o,v[2]=l,v[6]=c,v[10]=h,v[14]=d,v[3]=u,v[7]=p,v[11]=g,v[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ze().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,n=1/Tn.setFromMatrixColumn(e,0).length(),r=1/Tn.setFromMatrixColumn(e,1).length(),s=1/Tn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,n=e.y,r=e.z,s=Math.cos(i),a=Math.sin(i),o=Math.cos(n),l=Math.sin(n),c=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let d=s*c,u=s*h,p=a*c,g=a*h;t[0]=o*c,t[4]=-o*h,t[8]=l,t[1]=u+p*l,t[5]=d-g*l,t[9]=-a*o,t[2]=g-d*l,t[6]=p+u*l,t[10]=s*o}else if(e.order==="YXZ"){let d=o*c,u=o*h,p=l*c,g=l*h;t[0]=d+g*a,t[4]=p*a-u,t[8]=s*l,t[1]=s*h,t[5]=s*c,t[9]=-a,t[2]=u*a-p,t[6]=g+d*a,t[10]=s*o}else if(e.order==="ZXY"){let d=o*c,u=o*h,p=l*c,g=l*h;t[0]=d-g*a,t[4]=-s*h,t[8]=p+u*a,t[1]=u+p*a,t[5]=s*c,t[9]=g-d*a,t[2]=-s*l,t[6]=a,t[10]=s*o}else if(e.order==="ZYX"){let d=s*c,u=s*h,p=a*c,g=a*h;t[0]=o*c,t[4]=p*l-u,t[8]=d*l+g,t[1]=o*h,t[5]=g*l+d,t[9]=u*l-p,t[2]=-l,t[6]=a*o,t[10]=s*o}else if(e.order==="YZX"){let d=s*o,u=s*l,p=a*o,g=a*l;t[0]=o*c,t[4]=g-d*h,t[8]=p*h+u,t[1]=h,t[5]=s*c,t[9]=-a*c,t[2]=-l*c,t[6]=u*h+p,t[10]=d-g*h}else if(e.order==="XZY"){let d=s*o,u=s*l,p=a*o,g=a*l;t[0]=o*c,t[4]=-h,t[8]=l*c,t[1]=d*h+g,t[5]=s*c,t[9]=u*h-p,t[2]=p*h-u,t[6]=a*c,t[10]=g*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lu,e,cu)}lookAt(e,t,i){let n=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),Ii.crossVectors(i,Vt),Ii.lengthSq()===0&&(Math.abs(i.z)===1?Vt.x+=0.0001:Vt.z+=0.0001,Vt.normalize(),Ii.crossVectors(i,Vt)),Ii.normalize(),Dr.crossVectors(Vt,Ii),n[0]=Ii.x,n[4]=Dr.x,n[8]=Vt.x,n[1]=Ii.y,n[5]=Dr.y,n[9]=Vt.y,n[2]=Ii.z,n[6]=Dr.z,n[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,r=this.elements,s=i[0],a=i[4],o=i[8],l=i[12],c=i[1],h=i[5],d=i[9],u=i[13],p=i[2],g=i[6],m=i[10],v=i[14],f=i[3],_=i[7],M=i[11],S=i[15],T=n[0],A=n[4],P=n[8],O=n[12],R=n[1],V=n[5],U=n[9],Z=n[13],$=n[2],D=n[6],W=n[10],j=n[14],z=n[3],ae=n[7],le=n[11],Ee=n[15];return r[0]=s*T+a*R+o*$+l*z,r[4]=s*A+a*V+o*D+l*ae,r[8]=s*P+a*U+o*W+l*le,r[12]=s*O+a*Z+o*j+l*Ee,r[1]=c*T+h*R+d*$+u*z,r[5]=c*A+h*V+d*D+u*ae,r[9]=c*P+h*U+d*W+u*le,r[13]=c*O+h*Z+d*j+u*Ee,r[2]=p*T+g*R+m*$+v*z,r[6]=p*A+g*V+m*D+v*ae,r[10]=p*P+g*U+m*W+v*le,r[14]=p*O+g*Z+m*j+v*Ee,r[3]=f*T+_*R+M*$+S*z,r[7]=f*A+_*V+M*D+S*ae,r[11]=f*P+_*U+M*W+S*le,r[15]=f*O+_*Z+M*j+S*Ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],s=e[1],a=e[5],o=e[9],l=e[13],c=e[2],h=e[6],d=e[10],u=e[14],p=e[3],g=e[7],m=e[11],v=e[15],f=o*u-l*d,_=a*u-l*h,M=a*d-o*h,S=s*u-l*c,T=s*d-o*c,A=s*h-a*c;return t*(g*f-m*_+v*M)-i*(p*f-m*S+v*T)+n*(p*_-g*S+v*A)-r*(p*M-g*T+m*A)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],n=e[8],r=e[1],s=e[5],a=e[9],o=e[2],l=e[6],c=e[10];return t*(s*c-a*l)-i*(r*c-a*o)+n*(r*l-s*o)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],h=e[9],d=e[10],u=e[11],p=e[12],g=e[13],m=e[14],v=e[15],f=t*a-i*s,_=t*o-n*s,M=t*l-r*s,S=i*o-n*a,T=i*l-r*a,A=n*l-r*o,P=c*g-h*p,O=c*m-d*p,R=c*v-u*p,V=h*m-d*g,U=h*v-u*g,Z=d*v-u*m,$=f*Z-_*U+M*V+S*R-T*O+A*P;if($===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/$;return e[0]=(a*Z-o*U+l*V)*D,e[1]=(n*U-i*Z-r*V)*D,e[2]=(g*A-m*T+v*S)*D,e[3]=(d*T-h*A-u*S)*D,e[4]=(o*R-s*Z-l*O)*D,e[5]=(t*Z-n*R+r*O)*D,e[6]=(m*M-p*A-v*_)*D,e[7]=(c*A-d*M+u*_)*D,e[8]=(s*U-a*R+l*P)*D,e[9]=(i*R-t*U-r*P)*D,e[10]=(p*T-g*M+v*f)*D,e[11]=(h*M-c*T-u*f)*D,e[12]=(a*O-s*V-o*P)*D,e[13]=(t*V-i*O+n*P)*D,e[14]=(g*_-p*S-m*f)*D,e[15]=(c*S-h*_+d*f)*D,this}scale(e){let t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),n=Math.sin(t),r=1-i,s=e.x,a=e.y,o=e.z,l=r*s,c=r*a;return this.set(l*s+i,l*a-n*o,l*o+n*a,0,l*a+n*o,c*a+i,c*o-n*s,0,l*o-n*a,c*o+n*s,r*o*o+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,s){return this.set(1,i,r,0,e,1,s,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){let n=this.elements,r=t._x,s=t._y,a=t._z,o=t._w,l=r+r,c=s+s,h=a+a,d=r*l,u=r*c,p=r*h,g=s*c,m=s*h,v=a*h,f=o*l,_=o*c,M=o*h,S=i.x,T=i.y,A=i.z;return n[0]=(1-(g+v))*S,n[1]=(u+M)*S,n[2]=(p-_)*S,n[3]=0,n[4]=(u-M)*T,n[5]=(1-(d+v))*T,n[6]=(m+f)*T,n[7]=0,n[8]=(p+_)*A,n[9]=(m-f)*A,n[10]=(1-(d+g))*A,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){let n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let s=Tn.set(n[0],n[1],n[2]).length(),a=Tn.set(n[4],n[5],n[6]).length(),o=Tn.set(n[8],n[9],n[10]).length();r<0&&(s=-s),Qt.copy(this);let l=1/s,c=1/a,h=1/o;return Qt.elements[0]*=l,Qt.elements[1]*=l,Qt.elements[2]*=l,Qt.elements[4]*=c,Qt.elements[5]*=c,Qt.elements[6]*=c,Qt.elements[8]*=h,Qt.elements[9]*=h,Qt.elements[10]*=h,t.setFromRotationMatrix(Qt),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,n,r,s,a=2000,o=!1){let l=this.elements,c=2*r/(t-e),h=2*r/(i-n),d=(t+e)/(t-e),u=(i+n)/(i-n),p,g;if(o)p=r/(s-r),g=s*r/(s-r);else if(a===2000)p=-(s+r)/(s-r),g=-2*s*r/(s-r);else{if(a!==2001)throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);p=-s/(s-r),g=-s*r/(s-r)}return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,n,r,s,a=2000,o=!1){let l=this.elements,c=2/(t-e),h=2/(i-n),d=-(t+e)/(t-e),u=-(i+n)/(i-n),p,g;if(o)p=1/(s-r),g=s/(s-r);else if(a===2000)p=-2/(s-r),g=-(s+r)/(s-r);else{if(a!==2001)throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);p=-1/(s-r),g=-r/(s-r)}return l[0]=c,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=h,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}var Tn=new w,Qt=new ze,lu=new w(0,0,0),cu=new w(1,1,1),Ii=new w,Dr=new w,Vt=new w,Fl=new ze,Ol=new kt;class Ai{constructor(e=0,t=0,i=0,n=Ai.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let n=e.elements,r=n[0],s=n[4],a=n[8],o=n[1],l=n[5],c=n[9],h=n[2],d=n[6],u=n[10];switch(t){case"XYZ":this._y=Math.asin(Xe(a,-1,1)),Math.abs(a)<0.9999999?(this._x=Math.atan2(-c,u),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(c,-1,1)),Math.abs(c)<0.9999999?(this._y=Math.atan2(a,u),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(d,-1,1)),Math.abs(d)<0.9999999?(this._y=Math.atan2(-h,u),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-Xe(h,-1,1)),Math.abs(h)<0.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(Xe(o,-1,1)),Math.abs(o)<0.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,u));break;case"XZY":this._z=Math.asin(-Xe(s,-1,1)),Math.abs(s)<0.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-c,u),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Fl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ol.setFromEuler(this),this.setFromQuaternion(Ol,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ai.DEFAULT_ORDER="XYZ";class Ss{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}}var hu=0,Bl=new w,En=new kt,xi=new ze,Nr=new w,$n=new w,uu=new w,du=new kt,zl=new w(1,0,0),Vl=new w(0,1,0),Gl=new w(0,0,1),Hl={type:"added"},pu={type:"removed"},An={type:"childadded",child:null},la={type:"childremoved",child:null};class ut extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ut.DEFAULT_UP.clone();let e=new w,t=new Ai,i=new kt,n=new w(1,1,1);t._onChange(function(){i.setFromEuler(t,!1)}),i._onChange(function(){t.setFromQuaternion(i,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new ze},normalMatrix:{value:new Ge}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ss,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return En.setFromAxisAngle(e,t),this.quaternion.multiply(En),this}rotateOnWorldAxis(e,t){return En.setFromAxisAngle(e,t),this.quaternion.premultiply(En),this}rotateX(e){return this.rotateOnAxis(zl,e)}rotateY(e){return this.rotateOnAxis(Vl,e)}rotateZ(e){return this.rotateOnAxis(Gl,e)}translateOnAxis(e,t){return Bl.copy(e).applyQuaternion(this.quaternion),this.position.add(Bl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zl,e)}translateY(e){return this.translateOnAxis(Vl,e)}translateZ(e){return this.translateOnAxis(Gl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Nr.copy(e):Nr.set(e,t,i);let n=this.parent;this.updateWorldMatrix(!0,!1),$n.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt($n,Nr,this.up):xi.lookAt(Nr,$n,this.up),this.quaternion.setFromRotationMatrix(xi),n&&(xi.extractRotation(n.matrixWorld),En.setFromRotationMatrix(xi),this.quaternion.premultiply(En.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(De("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Hl),An.child=e,this.dispatchEvent(An),An.child=null):De("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pu),la.child=e,this.dispatchEvent(la),la.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Hl),An.child=e,this.dispatchEvent(An),An.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){let r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let n=this.children;for(let r=0,s=n.length;r<s;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($n,e,uu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($n,du,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let{x:t,y:i,z:n}=e,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*n,r[13]+=i-r[1]*t-r[5]*i-r[9]*n,r[14]+=n-r[2]*t-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};function r(a,o){return a[o.uuid]===void 0&&(a[o.uuid]=o.toJSON(e)),o.uuid}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),this.static!==!1&&(n.static=this.static),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map((a)=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map((a)=>({...a})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let o=a.shapes;if(Array.isArray(o))for(let l=0,c=o.length;l<c;l++){let h=o[l];r(e.shapes,h)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let o=0,l=this.material.length;o<l;o++)a.push(r(e.materials,this.material[o]));n.material=a}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){let o=this.animations[a];n.animations.push(r(e.animations,o))}}if(t){let a=s(e.geometries),o=s(e.materials),l=s(e.textures),c=s(e.images),h=s(e.shapes),d=s(e.skeletons),u=s(e.animations),p=s(e.nodes);a.length>0&&(i.geometries=a),o.length>0&&(i.materials=o),l.length>0&&(i.textures=l),c.length>0&&(i.images=c),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),u.length>0&&(i.animations=u),p.length>0&&(i.nodes=p)}return i.object=n,i;function s(a){let o=[];for(let l in a){let c=a[l];delete c.metadata,o.push(c)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let n=e.children[i];this.add(n.clone())}return this}}ut.DEFAULT_UP=new w(0,1,0),ut.DEFAULT_MATRIX_AUTO_UPDATE=!0,ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ht extends ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}var mu={type:"move"};class gr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ht,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ht,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ht,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,s=null,a=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(let g of e.hand.values()){let m=t.getJointPose(g,i),v=this._getHandJoint(l,g);m!==null&&(v.matrix.fromArray(m.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=m.radius),v.visible=m!==null}let c=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=c.position.distanceTo(h.position),u=0.02,p=0.005;l.inputState.pinching&&d>u+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=u-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(mu)))}return a!==null&&(a.visible=n!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new ht;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}var oh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Ur={h:0,s:0,l:0};function ca(e,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<0.16666666666666666?e+6*(t-e)*i:i<0.5?t:i<0.6666666666666666?e+6*(t-e)*(0.6666666666666666-i):e}class Fe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,qe.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=qe.workingColorSpace){if(e=ru(e,1),t=Xe(t,0,1),i=Xe(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=0.5?i*(1+t):i+t-i*t,s=2*i-r;this.r=ca(s,r,e+0.3333333333333333),this.g=ca(s,r,e),this.b=ca(s,r,e-0.3333333333333333)}return qe.colorSpaceToWorking(this,n),this}setStyle(e,t="srgb"){function i(r){r!==void 0&&parseFloat(r)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,s=n[1],a=n[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Le("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=n[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(r,16),t);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let i=oh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=Nn(e.r),this.g=Nn(e.g),this.b=Nn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return qe.workingToColorSpace(Rt.copy(this),e),65536*Math.round(Xe(255*Rt.r,0,255))+256*Math.round(Xe(255*Rt.g,0,255))+Math.round(Xe(255*Rt.b,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Rt.copy(this),t);let{r:i,g:n,b:r}=Rt,s=Math.max(i,n,r),a=Math.min(i,n,r),o,l,c=(a+s)/2;if(a===s)o=0,l=0;else{let h=s-a;switch(l=c<=0.5?h/(s+a):h/(2-s-a),s){case i:o=(n-r)/h+(n<r?6:0);break;case n:o=(r-i)/h+2;break;case r:o=(i-n)/h+4}o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e="srgb"){qe.workingToColorSpace(Rt.copy(this),e);let{r:t,g:i,b:n}=Rt;return e!=="srgb"?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*i)},${Math.round(255*n)})`}offsetHSL(e,t,i){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(Ur);let i=na(Pi.h,Ur.h,t),n=na(Pi.s,Ur.s,t),r=na(Pi.l,Ur.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var Rt=new Fe;Fe.NAMES=oh;class _r extends ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ai,this.environmentIntensity=1,this.environmentRotation=new Ai,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}var ei=new w,yi=new w,ha=new w,Mi=new w,wn=new w,Cn=new w,kl=new w,ua=new w,da=new w,pa=new w,ma=new et,fa=new et,ga=new et;class Ht{constructor(e=new w,t=new w,i=new w){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),ei.subVectors(e,t),n.cross(ei);let r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){ei.subVectors(n,t),yi.subVectors(i,t),ha.subVectors(e,t);let s=ei.dot(ei),a=ei.dot(yi),o=ei.dot(ha),l=yi.dot(yi),c=yi.dot(ha),h=s*l-a*a;if(h===0)return r.set(0,0,0),null;let d=1/h,u=(l*o-a*c)*d,p=(s*c-a*o)*d;return r.set(1-u-p,p,u)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Mi)!==null&&(Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1)}static getInterpolation(e,t,i,n,r,s,a,o){return this.getBarycoord(e,t,i,n,Mi)===null?(o.x=0,o.y=0,("z"in o)&&(o.z=0),("w"in o)&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,Mi.x),o.addScaledVector(s,Mi.y),o.addScaledVector(a,Mi.z),o)}static getInterpolatedAttribute(e,t,i,n,r,s){return ma.setScalar(0),fa.setScalar(0),ga.setScalar(0),ma.fromBufferAttribute(e,t),fa.fromBufferAttribute(e,i),ga.fromBufferAttribute(e,n),s.setScalar(0),s.addScaledVector(ma,r.x),s.addScaledVector(fa,r.y),s.addScaledVector(ga,r.z),s}static isFrontFacing(e,t,i,n){return ei.subVectors(i,t),yi.subVectors(e,t),ei.cross(yi).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ei.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),0.5*ei.cross(yi).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(e){return Ht.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ht.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,r){return Ht.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return Ht.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ht.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,n=this.b,r=this.c,s,a;wn.subVectors(n,i),Cn.subVectors(r,i),ua.subVectors(e,i);let o=wn.dot(ua),l=Cn.dot(ua);if(o<=0&&l<=0)return t.copy(i);da.subVectors(e,n);let c=wn.dot(da),h=Cn.dot(da);if(c>=0&&h<=c)return t.copy(n);let d=o*h-c*l;if(d<=0&&o>=0&&c<=0)return s=o/(o-c),t.copy(i).addScaledVector(wn,s);pa.subVectors(e,r);let u=wn.dot(pa),p=Cn.dot(pa);if(p>=0&&u<=p)return t.copy(r);let g=u*l-o*p;if(g<=0&&l>=0&&p<=0)return a=l/(l-p),t.copy(i).addScaledVector(Cn,a);let m=c*p-u*h;if(m<=0&&h-c>=0&&u-p>=0)return kl.subVectors(r,n),a=(h-c)/(h-c+(u-p)),t.copy(n).addScaledVector(kl,a);let v=1/(m+g+d);return s=g*v,a=d*v,t.copy(i).addScaledVector(wn,s).addScaledVector(Cn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class pi{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ti.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ti.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=ti.copy(t).multiplyScalar(0.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=r.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,ti):ti.fromBufferAttribute(r,s),ti.applyMatrix4(e.matrixWorld),this.expandByPoint(ti);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fr.copy(i.boundingBox)),Fr.applyMatrix4(e.matrixWorld),this.union(Fr)}let n=e.children;for(let r=0,s=n.length;r<s;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ti),ti.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qn),Or.subVectors(this.max,Qn),Rn.subVectors(e.a,Qn),In.subVectors(e.b,Qn),Pn.subVectors(e.c,Qn),Li.subVectors(In,Rn),Di.subVectors(Pn,In),qi.subVectors(Rn,Pn);let t=[0,-Li.z,Li.y,0,-Di.z,Di.y,0,-qi.z,qi.y,Li.z,0,-Li.x,Di.z,0,-Di.x,qi.z,0,-qi.x,-Li.y,Li.x,0,-Di.y,Di.x,0,-qi.y,qi.x,0];return!!_a(t,Rn,In,Pn,Or)&&(t=[1,0,0,0,1,0,0,0,1],!!_a(t,Rn,In,Pn,Or)&&(Br.crossVectors(Li,Di),t=[Br.x,Br.y,Br.z],_a(t,Rn,In,Pn,Or)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ti).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=0.5*this.getSize(ti).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}var Si=[new w,new w,new w,new w,new w,new w,new w,new w],ti=new w,Fr=new pi,Rn=new w,In=new w,Pn=new w,Li=new w,Di=new w,qi=new w,Qn=new w,Or=new w,Br=new w,Yi=new w;function _a(e,t,i,n,r){for(let s=0,a=e.length-3;s<=a;s+=3){Yi.fromArray(e,s);let o=r.x*Math.abs(Yi.x)+r.y*Math.abs(Yi.y)+r.z*Math.abs(Yi.z),l=t.dot(Yi),c=i.dot(Yi),h=n.dot(Yi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Tp=fu();function fu(){let e=new ArrayBuffer(4),t=new Float32Array(e),i=new Uint32Array(e),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,r[l]=24,r[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,r[l]=-c-1,r[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,r[l]=13,r[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,r[l]=24,r[256|l]=24):(n[l]=31744,n[256|l]=64512,r[l]=13,r[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:t,uint32View:i,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}var gt=new w,zr=new ne,gu=0;class Et extends Ci{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)zr.fromBufferAttribute(this,t),zr.applyMatrix3(e),this.setXY(t,zr.x,zr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Kn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ut(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array),n=Ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),i=Ut(i,this.array),n=Ut(n,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class bs extends Et{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ts extends Et{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ue extends Et{constructor(e,t,i){super(new Float32Array(e),t,i)}}var _u=new pi,er=new w,va=new w;class mi{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):_u.setFromPoints(e).getCenter(i);let n=0;for(let r=0,s=e.length;r<s;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;er.subVectors(e,this.center);let t=er.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),n=0.5*(i-this.radius);this.center.addScaledVector(er,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(va.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(er.copy(e.center).add(va)),this.expandByPoint(er.copy(e.center).sub(va))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}var vu=0,jt=new ze,xa=new ut,Ln=new w,Gt=new pi,tr=new pi,Mt=new w;class nt extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vu++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new((function(t){for(let i=t.length-1;i>=0;--i)if(t[i]>=65535)return!0;return!1}(e))?Ts:bs)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ge().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,i){return jt.makeTranslation(e,t,i),this.applyMatrix4(jt),this}scale(e,t,i){return jt.makeScale(e,t,i),this.applyMatrix4(jt),this}lookAt(e){return xa.lookAt(e),xa.updateMatrix(),this.applyMatrix4(xa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ln).negate(),this.translate(Ln.x,Ln.y,Ln.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let n=0,r=e.length;n<r;n++){let s=e[n];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Ue(i,3))}else{let i=Math.min(e.length,t.count);for(let n=0;n<i;n++){let r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return De("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){let r=t[i];Gt.setFromBufferAttribute(r),this.morphTargetsRelative?(Mt.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(Mt),Mt.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(Mt)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&De('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return De("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new w,1/0);if(e){let i=this.boundingSphere.center;if(Gt.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){let a=t[r];tr.setFromBufferAttribute(a),this.morphTargetsRelative?(Mt.addVectors(Gt.min,tr.min),Gt.expandByPoint(Mt),Mt.addVectors(Gt.max,tr.max),Gt.expandByPoint(Mt)):(Gt.expandByPoint(tr.min),Gt.expandByPoint(tr.max))}Gt.getCenter(i);let n=0;for(let r=0,s=e.count;r<s;r++)Mt.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(Mt));if(t)for(let r=0,s=t.length;r<s;r++){let a=t[r],o=this.morphTargetsRelative;for(let l=0,c=a.count;l<c;l++)Mt.fromBufferAttribute(a,l),o&&(Ln.fromBufferAttribute(e,l),Mt.add(Ln)),n=Math.max(n,i.distanceToSquared(Mt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&De('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void De("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let{position:i,normal:n,uv:r}=t,s=this.getAttribute("tangent");s!==void 0&&s.count===i.count||(s=new Et(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));let a=[],o=[];for(let P=0;P<i.count;P++)a[P]=new w,o[P]=new w;let l=new w,c=new w,h=new w,d=new ne,u=new ne,p=new ne,g=new w,m=new w;function v(P,O,R){l.fromBufferAttribute(i,P),c.fromBufferAttribute(i,O),h.fromBufferAttribute(i,R),d.fromBufferAttribute(r,P),u.fromBufferAttribute(r,O),p.fromBufferAttribute(r,R),c.sub(l),h.sub(l),u.sub(d),p.sub(d);let V=1/(u.x*p.y-p.x*u.y);isFinite(V)&&(g.copy(c).multiplyScalar(p.y).addScaledVector(h,-u.y).multiplyScalar(V),m.copy(h).multiplyScalar(u.x).addScaledVector(c,-p.x).multiplyScalar(V),a[P].add(g),a[O].add(g),a[R].add(g),o[P].add(m),o[O].add(m),o[R].add(m))}let f=this.groups;f.length===0&&(f=[{start:0,count:e.count}]);for(let P=0,O=f.length;P<O;++P){let R=f[P],V=R.start;for(let U=V,Z=V+R.count;U<Z;U+=3)v(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let _=new w,M=new w,S=new w,T=new w;function A(P){S.fromBufferAttribute(n,P),T.copy(S);let O=a[P];_.copy(O),_.sub(S.multiplyScalar(S.dot(O))).normalize(),M.crossVectors(T,O);let R=M.dot(o[P])<0?-1:1;s.setXYZW(P,_.x,_.y,_.z,R)}for(let P=0,O=f.length;P<O;++P){let R=f[P],V=R.start;for(let U=V,Z=V+R.count;U<Z;U+=3)A(e.getX(U+0)),A(e.getX(U+1)),A(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Et(new Float32Array(3*t.count),3),this.setAttribute("normal",i);else for(let d=0,u=i.count;d<u;d++)i.setXYZ(d,0,0,0);let n=new w,r=new w,s=new w,a=new w,o=new w,l=new w,c=new w,h=new w;if(e)for(let d=0,u=e.count;d<u;d+=3){let p=e.getX(d+0),g=e.getX(d+1),m=e.getX(d+2);n.fromBufferAttribute(t,p),r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,m),c.subVectors(s,r),h.subVectors(n,r),c.cross(h),a.fromBufferAttribute(i,p),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,m),a.add(c),o.add(c),l.add(c),i.setXYZ(p,a.x,a.y,a.z),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,u=t.count;d<u;d+=3)n.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),s.fromBufferAttribute(t,d+2),c.subVectors(s,r),h.subVectors(n,r),c.cross(h),i.setXYZ(d+0,c.x,c.y,c.z),i.setXYZ(d+1,c.x,c.y,c.z),i.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Mt.fromBufferAttribute(e,t),Mt.normalize(),e.setXYZ(t,Mt.x,Mt.y,Mt.z)}toNonIndexed(){function e(a,o){let{array:l,itemSize:c,normalized:h}=a,d=new l.constructor(o.length*c),u=0,p=0;for(let g=0,m=o.length;g<m;g++){u=a.isInterleavedBufferAttribute?o[g]*a.data.stride+a.offset:o[g]*c;for(let v=0;v<c;v++)d[p++]=l[u++]}return new Et(d,c,h)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new nt,i=this.index.array,n=this.attributes;for(let a in n){let o=e(n[a],i);t.setAttribute(a,o)}let r=this.morphAttributes;for(let a in r){let o=[],l=r[a];for(let c=0,h=l.length;c<h;c++){let d=e(l[c],i);o.push(d)}t.morphAttributes[a]=o}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,o=s.length;a<o;a++){let l=s[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let o=this.parameters;for(let l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let o in i){let l=i[o];e.data.attributes[o]=l.toJSON(e.data)}let n={},r=!1;for(let o in this.morphAttributes){let l=this.morphAttributes[o],c=[];for(let h=0,d=l.length;h<d;h++){let u=l[h];c.push(u.toJSON(e.data))}c.length>0&&(n[o]=c,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let n=e.attributes;for(let l in n){let c=n[l];this.setAttribute(l,c.clone(t))}let r=e.morphAttributes;for(let l in r){let c=[],h=r[l];for(let d=0,u=h.length;d<u;d++)c.push(h[d].clone(t));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let l=0,c=s.length;l<c;l++){let h=s[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}var Ep=new w;var xu=0;class cn extends Ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Le(`Material: parameter '${t}' has value of undefined.`);continue}let n=this[t];n!==void 0?n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i:Le(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function n(r){let s=[];for(let a in r){let o=r[a];delete o.metadata,s.push(o)}return s}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(i.blending=this.blending),this.side!==0&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==204&&(i.blendSrc=this.blendSrc),this.blendDst!==205&&(i.blendDst=this.blendDst),this.blendEquation!==100&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(i.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData),t){let r=n(e.textures),s=n(e.images);r.length>0&&(i.textures=r),s.length>0&&(i.images=s)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Fe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ne().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ne().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let n=t.length;i=Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}var Ap=new w,wp=new w,Cp=new w,Rp=new ne,Ip=new ne,Pp=new ze,Lp=new w,Dp=new w,Np=new w,Up=new ne,Fp=new ne,Op=new ne;var Bp=new w,zp=new w;var bi=new w,ya=new w,Vr=new w,Ni=new w,Ma=new w,Gr=new w,Sa=new w;class Wn{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bi.copy(this.origin).addScaledVector(this.direction,t),bi.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){ya.copy(e).add(t).multiplyScalar(0.5),Vr.copy(t).sub(e).normalize(),Ni.copy(this.origin).sub(ya);let r=0.5*e.distanceTo(t),s=-this.direction.dot(Vr),a=Ni.dot(this.direction),o=-Ni.dot(Vr),l=Ni.lengthSq(),c=Math.abs(1-s*s),h,d,u,p;if(c>0)if(h=s*o-a,d=s*a-o,p=r*c,h>=0)if(d>=-p)if(d<=p){let g=1/c;h*=g,d*=g,u=h*(h+s*d+2*a)+d*(s*h+d+2*o)+l}else d=r,h=Math.max(0,-(s*d+a)),u=-h*h+d*(d+2*o)+l;else d=-r,h=Math.max(0,-(s*d+a)),u=-h*h+d*(d+2*o)+l;else d<=-p?(h=Math.max(0,-(-s*r+a)),d=h>0?-r:Math.min(Math.max(-r,-o),r),u=-h*h+d*(d+2*o)+l):d<=p?(h=0,d=Math.min(Math.max(-r,-o),r),u=d*(d+2*o)+l):(h=Math.max(0,-(s*r+a)),d=h>0?r:Math.min(Math.max(-r,-o),r),u=-h*h+d*(d+2*o)+l);else d=s>0?-r:r,h=Math.max(0,-(s*d+a)),u=-h*h+d*(d+2*o)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),n&&n.copy(ya).addScaledVector(Vr,d),u}intersectSphere(e,t){bi.subVectors(e.center,this.origin);let i=bi.dot(this.direction),n=bi.dot(bi)-i*i,r=e.radius*e.radius;if(n>r)return null;let s=Math.sqrt(r-n),a=i-s,o=i+s;return o<0?null:a<0?this.at(o,t):this.at(a,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);if(t===0)return!0;return e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,s,a,o,l=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,n=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,n=(e.min.x-d.x)*l),c>=0?(r=(e.min.y-d.y)*c,s=(e.max.y-d.y)*c):(r=(e.max.y-d.y)*c,s=(e.min.y-d.y)*c),i>s||r>n?null:((r>i||isNaN(i))&&(i=r),(s<n||isNaN(n))&&(n=s),h>=0?(a=(e.min.z-d.z)*h,o=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,o=(e.min.z-d.z)*h),i>o||a>n?null:((a>i||i!=i)&&(i=a),(o<n||n!=n)&&(n=o),n<0?null:this.at(i>=0?i:n,t)))}intersectsBox(e){return this.intersectBox(e,bi)!==null}intersectTriangle(e,t,i,n,r){Ma.subVectors(t,e),Gr.subVectors(i,e),Sa.crossVectors(Ma,Gr);let s,a=this.direction.dot(Sa);if(a>0){if(n)return null;s=1}else{if(!(a<0))return null;s=-1,a=-a}Ni.subVectors(this.origin,e);let o=s*this.direction.dot(Gr.crossVectors(Ni,Gr));if(o<0)return null;let l=s*this.direction.dot(Ma.cross(Ni));if(l<0)return null;if(o+l>a)return null;let c=-s*Ni.dot(Sa);return c<0?null:this.at(c/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class zi extends cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}var Wl=new ze,Zi=new Wn,Hr=new mi,Xl=new w,kr=new w,Wr=new w,Xr=new w,ba=new w,jr=new w,jl=new w,qr=new w;class St extends ut{constructor(e=new nt,t=new zi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,r=i.length;n<r;n++){let s=i[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=n}}}}getVertexPosition(e,t){let i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(n,e);let a=this.morphTargetInfluences;if(r&&a){jr.set(0,0,0);for(let o=0,l=r.length;o<l;o++){let c=a[o],h=r[o];c!==0&&(ba.fromBufferAttribute(h,e),s?jr.addScaledVector(ba,c):jr.addScaledVector(ba.sub(t),c))}t.add(jr)}return t}raycast(e,t){let i=this.geometry,n=this.material,r=this.matrixWorld;if(n!==void 0){if(i.boundingSphere===null&&i.computeBoundingSphere(),Hr.copy(i.boundingSphere),Hr.applyMatrix4(r),Zi.copy(e.ray).recast(e.near),Hr.containsPoint(Zi.origin)===!1){if(Zi.intersectSphere(Hr,Xl)===null)return;if(Zi.origin.distanceToSquared(Xl)>(e.far-e.near)**2)return}Wl.copy(r).invert(),Zi.copy(e.ray).applyMatrix4(Wl),i.boundingBox!==null&&Zi.intersectsBox(i.boundingBox)===!1||this._computeIntersections(e,t,Zi)}}_computeIntersections(e,t,i){let n,r=this.geometry,s=this.material,a=r.index,o=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,h=r.attributes.normal,d=r.groups,u=r.drawRange;if(a!==null)if(Array.isArray(s))for(let p=0,g=d.length;p<g;p++){let m=d[p],v=s[m.materialIndex];for(let f=Math.max(m.start,u.start),_=Math.min(a.count,Math.min(m.start+m.count,u.start+u.count));f<_;f+=3)n=Yr(this,v,e,i,l,c,h,a.getX(f),a.getX(f+1),a.getX(f+2)),n&&(n.faceIndex=Math.floor(f/3),n.face.materialIndex=m.materialIndex,t.push(n))}else for(let p=Math.max(0,u.start),g=Math.min(a.count,u.start+u.count);p<g;p+=3)n=Yr(this,s,e,i,l,c,h,a.getX(p),a.getX(p+1),a.getX(p+2)),n&&(n.faceIndex=Math.floor(p/3),t.push(n));else if(o!==void 0)if(Array.isArray(s))for(let p=0,g=d.length;p<g;p++){let m=d[p],v=s[m.materialIndex];for(let f=Math.max(m.start,u.start),_=Math.min(o.count,Math.min(m.start+m.count,u.start+u.count));f<_;f+=3)n=Yr(this,v,e,i,l,c,h,f,f+1,f+2),n&&(n.faceIndex=Math.floor(f/3),n.face.materialIndex=m.materialIndex,t.push(n))}else for(let p=Math.max(0,u.start),g=Math.min(o.count,u.start+u.count);p<g;p+=3)n=Yr(this,s,e,i,l,c,h,p,p+1,p+2),n&&(n.faceIndex=Math.floor(p/3),t.push(n))}}function Yr(e,t,i,n,r,s,a,o,l,c){e.getVertexPosition(o,kr),e.getVertexPosition(l,Wr),e.getVertexPosition(c,Xr);let h=function(d,u,p,g,m,v,f,_){let M;if(M=u.side===1?g.intersectTriangle(f,v,m,!0,_):g.intersectTriangle(m,v,f,u.side===0,_),M===null)return null;qr.copy(_),qr.applyMatrix4(d.matrixWorld);let S=p.ray.origin.distanceTo(qr);return S<p.near||S>p.far?null:{distance:S,point:qr.clone(),object:d}}(e,t,i,n,kr,Wr,Xr,jl);if(h){let d=new w;Ht.getBarycoord(jl,kr,Wr,Xr,d),r&&(h.uv=Ht.getInterpolatedAttribute(r,o,l,c,d,new ne)),s&&(h.uv1=Ht.getInterpolatedAttribute(s,o,l,c,d,new ne)),a&&(h.normal=Ht.getInterpolatedAttribute(a,o,l,c,d,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new w,materialIndex:0};Ht.getNormal(kr,Wr,Xr,u.normal),h.face=u,h.barycoord=d}return h}var Vp=new et,Gp=new et,Hp=new et,kp=new et,Wp=new ze,Xp=new w,jp=new mi,qp=new ze,Yp=new Wn;class Fo extends Tt{constructor(e=null,t=1,i=1,n,r,s,a,o,l=1003,c=1003,h,d){super(null,s,a,o,l,c,n,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var Zp=new ze,Jp=new ze;var Kp=new ze,$p=new ze;var Qp=new pi,em=new ze,tm=new St,im=new mi;var Ta=new w,yu=new w,Mu=new Ge;class Ti{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let n=Ta.subVectors(i,t).cross(yu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let n=e.delta(Ta),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Mu.getNormalMatrix(e),n=this.coplanarPoint(Ta).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}var Ji=new mi,Su=new ne(0.5,0.5),Zr=new w;class Fi{constructor(e=new Ti,t=new Ti,i=new Ti,n=new Ti,r=new Ti,s=new Ti){this.planes=[e,t,i,n,r,s]}set(e,t,i,n,r,s){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(n),a[4].copy(r),a[5].copy(s),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=2000,i=!1){let n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],h=r[5],d=r[6],u=r[7],p=r[8],g=r[9],m=r[10],v=r[11],f=r[12],_=r[13],M=r[14],S=r[15];if(n[0].setComponents(l-s,u-c,v-p,S-f).normalize(),n[1].setComponents(l+s,u+c,v+p,S+f).normalize(),n[2].setComponents(l+a,u+h,v+g,S+_).normalize(),n[3].setComponents(l-a,u-h,v-g,S-_).normalize(),i)n[4].setComponents(o,d,m,M).normalize(),n[5].setComponents(l-o,u-d,v-m,S-M).normalize();else if(n[4].setComponents(l-o,u-d,v-m,S-M).normalize(),t===2000)n[5].setComponents(l+o,u+d,v+m,S+M).normalize();else{if(t!==2001)throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);n[5].setComponents(o,d,m,M).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ji)}intersectsSprite(e){Ji.center.set(0,0,0);let t=Su.distanceTo(e.center);return Ji.radius=0.7071067811865476+t,Ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ji)}intersectsSphere(e){let t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let n=t[i];if(Zr.x=n.normal.x>0?e.max.x:e.min.x,Zr.y=n.normal.y>0?e.max.y:e.min.y,Zr.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(Zr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}var ql=new ze;class Es{constructor(){this.coordinateSystem=2000,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,i=this._frustums;for(let n=0;n<t.length;n++){let r=t[n];ql.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[n]===void 0&&(i[n]=new Fi),i[n].setFromProjectionMatrix(ql,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,i=e._frustums;for(let n=0;n<e._count;n++)t[n]===void 0&&(t[n]=new Fi),t[n].copy(i[n]);return this._count=e._count,this}clone(){return new Es().copy(this)}}class lh{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,i,n){let r=this.pool,s=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let a=r[this.index];s.push(a),this.index++,a.start=e,a.count=t,a.z=i,a.index=n}reset(){this.list.length=0,this.index=0}}var nm=new ze,rm=new Fe(1,1,1),sm=new Fi,am=new Es,om=new pi,lm=new mi,cm=new w,hm=new w,um=new w,dm=new lh,pm=new St;var mm=new w,fm=new w,gm=new ze,_m=new Wn,vm=new mi,xm=new w,ym=new w;var Mm=new w,Sm=new w;var bm=new ze,Tm=new Wn,Em=new mi,Am=new w;class As extends Tt{constructor(e=[],t=301,i,n,r,s,a,o,l,c){super(e,t,i,n,r,s,a,o,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ws extends Tt{constructor(e,t,i,n,r,s,a,o,l){super(e,t,i,n,r,s,a,o,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vi extends Tt{constructor(e,t,i=1014,n,r,s,a=1003,o=1003,l,c=1026,h=1){if(c!==1026&&c!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:h},n,r,s,a,o,c,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new fr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Oo extends Vi{constructor(e,t=1014,i=301,n,r,s=1003,a=1003,o,l=1026){let c={width:e,height:e,depth:1},h=[c,c,c,c,c,c];super(e,e,t,i,n,r,s,a,o,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Cs extends Tt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Wt extends nt{constructor(e=1,t=1,i=1,n=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:s};let a=this;n=Math.floor(n),r=Math.floor(r),s=Math.floor(s);let o=[],l=[],c=[],h=[],d=0,u=0;function p(g,m,v,f,_,M,S,T,A,P,O){let R=M/A,V=S/P,U=M/2,Z=S/2,$=T/2,D=A+1,W=P+1,j=0,z=0,ae=new w;for(let le=0;le<W;le++){let Ee=le*V-Z;for(let ve=0;ve<D;ve++){let q=ve*R-U;ae[g]=q*f,ae[m]=Ee*_,ae[v]=$,l.push(ae.x,ae.y,ae.z),ae[g]=0,ae[m]=0,ae[v]=T>0?1:-1,c.push(ae.x,ae.y,ae.z),h.push(ve/A),h.push(1-le/P),j+=1}}for(let le=0;le<P;le++)for(let Ee=0;Ee<A;Ee++){let ve=d+Ee+D*le,q=d+Ee+D*(le+1),pe=d+(Ee+1)+D*(le+1),Me=d+(Ee+1)+D*le;o.push(ve,q,Me),o.push(q,pe,Me),z+=6}a.addGroup(u,z,O),u+=z,d+=j}p("z","y","x",-1,-1,i,t,e,s,r,0),p("z","y","x",1,-1,i,t,-e,s,r,1),p("x","z","y",1,1,e,i,t,n,s,2),p("x","z","y",1,-1,e,i,-t,n,s,3),p("x","y","z",1,-1,e,t,i,n,r,4),p("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(o),this.setAttribute("position",new Ue(l,3)),this.setAttribute("normal",new Ue(c,3)),this.setAttribute("uv",new Ue(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class hn extends nt{constructor(e=1,t=1,i=4,n=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:n,heightSegments:r},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),n=Math.max(3,Math.floor(n)),r=Math.max(1,Math.floor(r));let s=[],a=[],o=[],l=[],c=t/2,h=Math.PI/2*e,d=t,u=2*h+d,p=2*i+r,g=n+1,m=new w,v=new w;for(let f=0;f<=p;f++){let _=0,M=0,S=0,T=0;if(f<=i){let O=f/i,R=O*Math.PI/2;M=-c-e*Math.cos(R),S=e*Math.sin(R),T=-e*Math.cos(R),_=O*h}else if(f<=i+r){let O=(f-i)/r;M=O*t-c,S=e,T=0,_=h+O*d}else{let O=(f-i-r)/i,R=O*Math.PI/2;M=c+e*Math.sin(R),S=e*Math.cos(R),T=e*Math.sin(R),_=h+d+O*h}let A=Math.max(0,Math.min(1,_/u)),P=0;f===0?P=0.5/n:f===p&&(P=-0.5/n);for(let O=0;O<=n;O++){let R=O/n,V=R*Math.PI*2,U=Math.sin(V),Z=Math.cos(V);v.x=-S*Z,v.y=M,v.z=S*U,a.push(v.x,v.y,v.z),m.set(-S*Z,T,S*U),m.normalize(),o.push(m.x,m.y,m.z),l.push(R+P,A)}if(f>0){let O=(f-1)*g;for(let R=0;R<n;R++){let V=O+R,U=O+R+1,Z=f*g+R,$=f*g+R+1;s.push(V,U,Z),s.push(U,$,Z)}}}this.setIndex(s),this.setAttribute("position",new Ue(a,3)),this.setAttribute("normal",new Ue(o,3)),this.setAttribute("uv",new Ue(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hn(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Rs extends nt{constructor(e=1,t=32,i=0,n=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:n},t=Math.max(3,t);let r=[],s=[],a=[],o=[],l=new w,c=new ne;s.push(0,0,0),a.push(0,0,1),o.push(0.5,0.5);for(let h=0,d=3;h<=t;h++,d+=3){let u=i+h/t*n;l.x=e*Math.cos(u),l.y=e*Math.sin(u),s.push(l.x,l.y,l.z),a.push(0,0,1),c.x=(s[d]/e+1)/2,c.y=(s[d+1]/e+1)/2,o.push(c.x,c.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Ue(s,3)),this.setAttribute("normal",new Ue(a,3)),this.setAttribute("uv",new Ue(o,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class rt extends nt{constructor(e=1,t=1,i=1,n=32,r=1,s=!1,a=0,o=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o};let l=this;n=Math.floor(n),r=Math.floor(r);let c=[],h=[],d=[],u=[],p=0,g=[],m=i/2,v=0;function f(_){let M=p,S=new ne,T=new w,A=0,P=_===!0?e:t,O=_===!0?1:-1;for(let V=1;V<=n;V++)h.push(0,m*O,0),d.push(0,O,0),u.push(0.5,0.5),p++;let R=p;for(let V=0;V<=n;V++){let U=V/n*o+a,Z=Math.cos(U),$=Math.sin(U);T.x=P*$,T.y=m*O,T.z=P*Z,h.push(T.x,T.y,T.z),d.push(0,O,0),S.x=0.5*Z+0.5,S.y=0.5*$*O+0.5,u.push(S.x,S.y),p++}for(let V=0;V<n;V++){let U=M+V,Z=R+V;_===!0?c.push(Z,Z+1,U):c.push(Z+1,Z,U),A+=3}l.addGroup(v,A,_===!0?1:2),v+=A}(function(){let _=new w,M=new w,S=0,T=(t-e)/i;for(let A=0;A<=r;A++){let P=[],O=A/r,R=O*(t-e)+e;for(let V=0;V<=n;V++){let U=V/n,Z=U*o+a,$=Math.sin(Z),D=Math.cos(Z);M.x=R*$,M.y=-O*i+m,M.z=R*D,h.push(M.x,M.y,M.z),_.set($,T,D).normalize(),d.push(_.x,_.y,_.z),u.push(U,1-O),P.push(p++)}g.push(P)}for(let A=0;A<n;A++)for(let P=0;P<r;P++){let O=g[P][A],R=g[P+1][A],V=g[P+1][A+1],U=g[P][A+1];(e>0||P!==0)&&(c.push(O,R,U),S+=3),(t>0||P!==r-1)&&(c.push(R,V,U),S+=3)}l.addGroup(v,S,0),v+=S})(),s===!1&&(e>0&&f(!0),t>0&&f(!1)),this.setIndex(c),this.setAttribute("position",new Ue(h,3)),this.setAttribute("normal",new Ue(d,3)),this.setAttribute("uv",new Ue(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Is extends rt{constructor(e=1,t=1,i=32,n=1,r=!1,s=0,a=2*Math.PI){super(0,e,t,i,n,r,s,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:s,thetaLength:a}}static fromJSON(e){return new Is(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Gi extends nt{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};let r=[],s=[];function a(u,p,g,m){let v=m+1,f=[];for(let _=0;_<=v;_++){f[_]=[];let M=u.clone().lerp(g,_/v),S=p.clone().lerp(g,_/v),T=v-_;for(let A=0;A<=T;A++)f[_][A]=A===0&&_===v?M:M.clone().lerp(S,A/T)}for(let _=0;_<v;_++)for(let M=0;M<2*(v-_)-1;M++){let S=Math.floor(M/2);M%2==0?(o(f[_][S+1]),o(f[_+1][S]),o(f[_][S])):(o(f[_][S+1]),o(f[_+1][S+1]),o(f[_+1][S]))}}function o(u){r.push(u.x,u.y,u.z)}function l(u,p){let g=3*u;p.x=e[g+0],p.y=e[g+1],p.z=e[g+2]}function c(u,p,g,m){m<0&&u.x===1&&(s[p]=u.x-1),g.x===0&&g.z===0&&(s[p]=m/2/Math.PI+0.5)}function h(u){return Math.atan2(u.z,-u.x)}function d(u){return Math.atan2(-u.y,Math.sqrt(u.x*u.x+u.z*u.z))}(function(u){let p=new w,g=new w,m=new w;for(let v=0;v<t.length;v+=3)l(t[v+0],p),l(t[v+1],g),l(t[v+2],m),a(p,g,m,u)})(n),function(u){let p=new w;for(let g=0;g<r.length;g+=3)p.x=r[g+0],p.y=r[g+1],p.z=r[g+2],p.normalize().multiplyScalar(u),r[g+0]=p.x,r[g+1]=p.y,r[g+2]=p.z}(i),function(){let u=new w;for(let p=0;p<r.length;p+=3){u.x=r[p+0],u.y=r[p+1],u.z=r[p+2];let g=h(u)/2/Math.PI+0.5,m=d(u)/Math.PI+0.5;s.push(g,1-m)}(function(){let p=new w,g=new w,m=new w,v=new w,f=new ne,_=new ne,M=new ne;for(let S=0,T=0;S<r.length;S+=9,T+=6){p.set(r[S+0],r[S+1],r[S+2]),g.set(r[S+3],r[S+4],r[S+5]),m.set(r[S+6],r[S+7],r[S+8]),f.set(s[T+0],s[T+1]),_.set(s[T+2],s[T+3]),M.set(s[T+4],s[T+5]),v.copy(p).add(g).add(m).divideScalar(3);let A=h(v);c(f,T+0,p,A),c(_,T+2,g,A),c(M,T+4,m,A)}})(),function(){for(let p=0;p<s.length;p+=6){let g=s[p+0],m=s[p+2],v=s[p+4],f=Math.max(g,m,v),_=Math.min(g,m,v);f>0.9&&_<0.1&&(g<0.2&&(s[p+0]+=1),m<0.2&&(s[p+2]+=1),v<0.2&&(s[p+4]+=1))}}()}(),this.setAttribute("position",new Ue(r,3)),this.setAttribute("normal",new Ue(r.slice(),3)),this.setAttribute("uv",new Ue(s,2)),n===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.vertices,e.indices,e.radius,e.detail)}}class Ps extends Gi{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,n=1/i;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-i,0,-n,i,0,n,-i,0,n,i,-n,-i,0,-n,i,0,n,-i,0,n,i,0,-i,0,-n,i,0,-n,-i,0,n,i,0,n],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ps(e.radius,e.detail)}}var Jr=new w,Kr=new w,Ea=new w,$r=new Ht;class Bo extends nt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let n=Math.pow(10,4),r=Math.cos(rs*t),s=e.getIndex(),a=e.getAttribute("position"),o=s?s.count:a.count,l=[0,0,0],c=["a","b","c"],h=[,,,],d={},u=[];for(let p=0;p<o;p+=3){s?(l[0]=s.getX(p),l[1]=s.getX(p+1),l[2]=s.getX(p+2)):(l[0]=p,l[1]=p+1,l[2]=p+2);let{a:g,b:m,c:v}=$r;if(g.fromBufferAttribute(a,l[0]),m.fromBufferAttribute(a,l[1]),v.fromBufferAttribute(a,l[2]),$r.getNormal(Ea),h[0]=`${Math.round(g.x*n)},${Math.round(g.y*n)},${Math.round(g.z*n)}`,h[1]=`${Math.round(m.x*n)},${Math.round(m.y*n)},${Math.round(m.z*n)}`,h[2]=`${Math.round(v.x*n)},${Math.round(v.y*n)},${Math.round(v.z*n)}`,h[0]!==h[1]&&h[1]!==h[2]&&h[2]!==h[0])for(let f=0;f<3;f++){let _=(f+1)%3,M=h[f],S=h[_],T=$r[c[f]],A=$r[c[_]],P=`${M}_${S}`,O=`${S}_${M}`;O in d&&d[O]?(Ea.dot(d[O].normal)<=r&&(u.push(T.x,T.y,T.z),u.push(A.x,A.y,A.z)),d[O]=null):(P in d)||(d[P]={index0:l[f],index1:l[_],normal:Ea.clone()})}}for(let p in d)if(d[p]){let{index0:g,index1:m}=d[p];Jr.fromBufferAttribute(a,g),Kr.fromBufferAttribute(a,m),u.push(Jr.x,Jr.y,Jr.z),u.push(Kr.x,Kr.y,Kr.z)}this.setAttribute("position",new Ue(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Bt{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Le("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,n=this.getPoint(0),r=0;t.push(0);for(let s=1;s<=e;s++)i=this.getPoint(s/e),r+=i.distanceTo(n),t.push(r),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),n=0,r=i.length,s;s=t||e*i[r-1];let a,o=0,l=r-1;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),a=i[n]-s,a<0)o=n+1;else{if(!(a>0)){l=n;break}l=n-1}if(n=l,i[n]===s)return n/(r-1);let c=i[n];return(n+(s-c)/(i[n+1]-c))/(r-1)}getTangent(e,t){let n=e-0.0001,r=e+0.0001;n<0&&(n=0),r>1&&(r=1);let s=this.getPoint(n),a=this.getPoint(r),o=t||(s.isVector2?new ne:new w);return o.copy(a).sub(s).normalize(),o}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new w,n=[],r=[],s=[],a=new w,o=new ze;for(let u=0;u<=e;u++){let p=u/e;n[u]=this.getTangentAt(p,new w)}r[0]=new w,s[0]=new w;let l=Number.MAX_VALUE,c=Math.abs(n[0].x),h=Math.abs(n[0].y),d=Math.abs(n[0].z);c<=l&&(l=c,i.set(1,0,0)),h<=l&&(l=h,i.set(0,1,0)),d<=l&&i.set(0,0,1),a.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],a),s[0].crossVectors(n[0],r[0]);for(let u=1;u<=e;u++){if(r[u]=r[u-1].clone(),s[u]=s[u-1].clone(),a.crossVectors(n[u-1],n[u]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(Xe(n[u-1].dot(n[u]),-1,1));r[u].applyMatrix4(o.makeRotationAxis(a,p))}s[u].crossVectors(n[u],r[u])}if(t===!0){let u=Math.acos(Xe(r[0].dot(r[e]),-1,1));u/=e,n[0].dot(a.crossVectors(r[0],r[e]))>0&&(u=-u);for(let p=1;p<=e;p++)r[p].applyMatrix4(o.makeRotationAxis(n[p],u*p)),s[p].crossVectors(n[p],r[p])}return{tangents:n,normals:r,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class vr extends Bt{constructor(e=0,t=0,i=1,n=1,r=0,s=2*Math.PI,a=!1,o=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=s,this.aClockwise=a,this.aRotation=o}getPoint(e,t=new ne){let i=t,n=2*Math.PI,r=this.aEndAngle-this.aStartAngle,s=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(r=s?0:n),this.aClockwise!==!0||s||(r===n?r=-n:r-=n);let a=this.aStartAngle+e*r,o=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let c=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=o-this.aX,u=l-this.aY;o=d*c-u*h+this.aX,l=d*h+u*c+this.aY}return i.set(o,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class zo extends vr{constructor(e,t,i,n,r,s){super(e,t,i,i,n,r,s),this.isArcCurve=!0,this.type="ArcCurve"}}function Vo(){let e=0,t=0,i=0,n=0;function r(s,a,o,l){e=s,t=o,i=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,d){let u=(a-s)/c-(o-s)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,p*=h,r(a,o,u,p)},calc:function(s){let a=s*s;return e+t*s+i*a+n*(a*s)}}}var Yl=new w,Zl=new w,Aa=new Vo,wa=new Vo,Ca=new Vo;class Xn extends Bt{constructor(e=[],t=!1,i="centripetal",n=0.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new w){let i=t,n=this.points,r=n.length,s=(r-(this.closed?0:1))*e,a,o,l=Math.floor(s),c=s-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/r)+1)*r:c===0&&l===r-1&&(l=r-2,c=1),this.closed||l>0?a=n[(l-1)%r]:(Zl.subVectors(n[0],n[1]).add(n[0]),a=Zl);let h=n[l%r],d=n[(l+1)%r];if(this.closed||l+2<r?o=n[(l+2)%r]:(Yl.subVectors(n[r-1],n[r-2]).add(n[r-1]),o=Yl),this.curveType==="centripetal"||this.curveType==="chordal"){let u=this.curveType==="chordal"?0.5:0.25,p=Math.pow(a.distanceToSquared(h),u),g=Math.pow(h.distanceToSquared(d),u),m=Math.pow(d.distanceToSquared(o),u);g<0.0001&&(g=1),p<0.0001&&(p=g),m<0.0001&&(m=g),Aa.initNonuniformCatmullRom(a.x,h.x,d.x,o.x,p,g,m),wa.initNonuniformCatmullRom(a.y,h.y,d.y,o.y,p,g,m),Ca.initNonuniformCatmullRom(a.z,h.z,d.z,o.z,p,g,m)}else this.curveType==="catmullrom"&&(Aa.initCatmullRom(a.x,h.x,d.x,o.x,this.tension),wa.initCatmullRom(a.y,h.y,d.y,o.y,this.tension),Ca.initCatmullRom(a.z,h.z,d.z,o.z,this.tension));return i.set(Aa.calc(c),wa.calc(c),Ca.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new w().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Jl(e,t,i,n,r){let s=0.5*(n-t),a=0.5*(r-i),o=e*e;return(2*i-2*n+s+a)*(e*o)+(-3*i+3*n-2*s-a)*o+s*e+i}function nr(e,t,i,n){return function(r,s){let a=1-r;return a*a*s}(e,t)+function(r,s){return 2*(1-r)*r*s}(e,i)+function(r,s){return r*r*s}(e,n)}function rr(e,t,i,n,r){return function(s,a){let o=1-s;return o*o*o*a}(e,t)+function(s,a){let o=1-s;return 3*o*o*s*a}(e,i)+function(s,a){return 3*(1-s)*s*s*a}(e,n)+function(s,a){return s*s*s*a}(e,r)}class Ls extends Bt{constructor(e=new ne,t=new ne,i=new ne,n=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new ne){let i=t,n=this.v0,r=this.v1,s=this.v2,a=this.v3;return i.set(rr(e,n.x,r.x,s.x,a.x),rr(e,n.y,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Go extends Bt{constructor(e=new w,t=new w,i=new w,n=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new w){let i=t,n=this.v0,r=this.v1,s=this.v2,a=this.v3;return i.set(rr(e,n.x,r.x,s.x,a.x),rr(e,n.y,r.y,s.y,a.y),rr(e,n.z,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ds extends Bt{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ho extends Bt{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ns extends Bt{constructor(e=new ne,t=new ne,i=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ne){let i=t,n=this.v0,r=this.v1,s=this.v2;return i.set(nr(e,n.x,r.x,s.x),nr(e,n.y,r.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Us extends Bt{constructor(e=new w,t=new w,i=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new w){let i=t,n=this.v0,r=this.v1,s=this.v2;return i.set(nr(e,n.x,r.x,s.x),nr(e,n.y,r.y,s.y),nr(e,n.z,r.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fs extends Bt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){let i=t,n=this.points,r=(n.length-1)*e,s=Math.floor(r),a=r-s,o=n[s===0?s:s-1],l=n[s],c=n[s>n.length-2?n.length-1:s+1],h=n[s>n.length-3?n.length-1:s+2];return i.set(Jl(a,o.x,l.x,c.x,h.x),Jl(a,o.y,l.y,c.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new ne().fromArray(n))}return this}}var ss=Object.freeze({__proto__:null,ArcCurve:zo,CatmullRomCurve3:Xn,CubicBezierCurve:Ls,CubicBezierCurve3:Go,EllipseCurve:vr,LineCurve:Ds,LineCurve3:Ho,QuadraticBezierCurve:Ns,QuadraticBezierCurve3:Us,SplineCurve:Fs});class ko extends Bt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ss[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),n=this.getCurveLengths(),r=0;for(;r<n.length;){if(n[r]>=i){let s=n[r]-i,a=this.curves[r],o=a.getLength(),l=o===0?0:1-s/o;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,n=this.curves.length;i<n;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let n=0,r=this.curves;n<r.length;n++){let s=r[n],a=s.isEllipseCurve?2*e:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,o=s.getPoints(a);for(let l=0;l<o.length;l++){let c=o[l];i&&i.equals(c)||(t.push(c),i=c)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let n=e.curves[t];this.curves.push(new ss[n.type]().fromJSON(n))}return this}}class Fn extends ko{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Ds(this.currentPoint.clone(),new ne(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,n){let r=new Ns(this.currentPoint.clone(),new ne(e,t),new ne(i,n));return this.curves.push(r),this.currentPoint.set(i,n),this}bezierCurveTo(e,t,i,n,r,s){let a=new Ls(this.currentPoint.clone(),new ne(e,t),new ne(i,n),new ne(r,s));return this.curves.push(a),this.currentPoint.set(r,s),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Fs(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,n,r,s){let a=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(e+a,t+o,i,n,r,s),this}absarc(e,t,i,n,r,s){return this.absellipse(e,t,i,i,n,r,s),this}ellipse(e,t,i,n,r,s,a,o){let l=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+l,t+c,i,n,r,s,a,o),this}absellipse(e,t,i,n,r,s,a,o){let l=new vr(e,t,i,n,r,s,a,o);if(this.curves.length>0){let h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);let c=l.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class un extends Fn{constructor(e){super(e),this.uuid=kn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,n=this.holes.length;i<n;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let n=e.holes[t];this.holes.push(new Fn().fromJSON(n))}return this}}function bu(e,t,i=2){let n=t&&t.length,r=n?t[0]*i:e.length,s=Kl(e,0,r,i,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c;if(n&&(s=function(h,d,u,p){let g=[];for(let m=0,v=d.length;m<v;m++){let f=Kl(h,d[m]*p,m<v-1?d[m+1]*p:h.length,p,!1);f===f.next&&(f.steiner=!0),g.push(Pu(f))}g.sort(Cu);for(let m=0;m<g.length;m++)u=Ru(g[m],u);return u}(e,t,s,i)),e.length>80*i){o=e[0],l=e[1];let h=o,d=l;for(let u=i;u<r;u+=i){let p=e[u],g=e[u+1];p<o&&(o=p),g<l&&(l=g),p>h&&(h=p),g>d&&(d=g)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return or(s,a,i,o,l,c,0),a}function Kl(e,t,i,n,r){let s;if(r===function(a,o,l,c){let h=0;for(let d=o,u=l-c;d<l;d+=c)h+=(a[u]-a[d])*(a[d+1]+a[u+1]),u=d;return h}(e,t,i,n)>0)for(let a=t;a<i;a+=n)s=$l(a/n|0,e[a],e[a+1],s);else for(let a=i-n;a>=t;a-=n)s=$l(a/n|0,e[a],e[a+1],s);return s&&On(s,s.next)&&(cr(s),s=s.next),s}function en(e,t){if(!e)return e;t||(t=e);let i,n=e;do if(i=!1,n.steiner||!On(n,n.next)&&ct(n.prev,n,n.next)!==0)n=n.next;else{if(cr(n),n=t=n.prev,n===n.next)break;i=!0}while(i||n!==t);return t}function or(e,t,i,n,r,s,a){if(!e)return;!a&&s&&function(l,c,h,d){let u=l;do u.z===0&&(u.z=Pa(u.x,u.y,c,h,d)),u.prevZ=u.prev,u.nextZ=u.next,u=u.next;while(u!==l);u.prevZ.nextZ=null,u.prevZ=null,function(p){let g,m=1;do{let v,f=p;p=null;let _=null;for(g=0;f;){g++;let M=f,S=0;for(let A=0;A<m&&(S++,M=M.nextZ,M);A++);let T=m;for(;S>0||T>0&&M;)S!==0&&(T===0||!M||f.z<=M.z)?(v=f,f=f.nextZ,S--):(v=M,M=M.nextZ,T--),_?_.nextZ=v:p=v,v.prevZ=_,_=v;f=M}_.nextZ=null,m*=2}while(g>1)}(u)}(e,n,r,s);let o=e;for(;e.prev!==e.next;){let{prev:l,next:c}=e;if(s?Eu(e,n,r,s):Tu(e))t.push(l.i,e.i,c.i),cr(e),e=c.next,o=c.next;else if((e=c)===o){a?a===1?or(e=Au(en(e),t),t,i,n,r,s,2):a===2&&wu(e,t,i,n,r,s):or(en(e),t,i,n,r,s,1);break}}}function Tu(e){let t=e.prev,i=e,n=e.next;if(ct(t,i,n)>=0)return!1;let r=t.x,s=i.x,a=n.x,o=t.y,l=i.y,c=n.y,h=Math.min(r,s,a),d=Math.min(o,l,c),u=Math.max(r,s,a),p=Math.max(o,l,c),g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=p&&ir(r,o,s,l,a,c,g.x,g.y)&&ct(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Eu(e,t,i,n){let r=e.prev,s=e,a=e.next;if(ct(r,s,a)>=0)return!1;let o=r.x,l=s.x,c=a.x,h=r.y,d=s.y,u=a.y,p=Math.min(o,l,c),g=Math.min(h,d,u),m=Math.max(o,l,c),v=Math.max(h,d,u),f=Pa(p,g,t,i,n),_=Pa(m,v,t,i,n),M=e.prevZ,S=e.nextZ;for(;M&&M.z>=f&&S&&S.z<=_;){if(M.x>=p&&M.x<=m&&M.y>=g&&M.y<=v&&M!==r&&M!==a&&ir(o,h,l,d,c,u,M.x,M.y)&&ct(M.prev,M,M.next)>=0)return!1;if(M=M.prevZ,S.x>=p&&S.x<=m&&S.y>=g&&S.y<=v&&S!==r&&S!==a&&ir(o,h,l,d,c,u,S.x,S.y)&&ct(S.prev,S,S.next)>=0)return!1;S=S.nextZ}for(;M&&M.z>=f;){if(M.x>=p&&M.x<=m&&M.y>=g&&M.y<=v&&M!==r&&M!==a&&ir(o,h,l,d,c,u,M.x,M.y)&&ct(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;S&&S.z<=_;){if(S.x>=p&&S.x<=m&&S.y>=g&&S.y<=v&&S!==r&&S!==a&&ir(o,h,l,d,c,u,S.x,S.y)&&ct(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Au(e,t){let i=e;do{let n=i.prev,r=i.next.next;!On(n,r)&&hh(n,i,i.next,r)&&lr(n,r)&&lr(r,n)&&(t.push(n.i,i.i,r.i),cr(i),cr(i.next),i=e=r),i=i.next}while(i!==e);return en(i)}function wu(e,t,i,n,r,s){let a=e;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Lu(a,o)){let l=uh(a,o);return a=en(a,a.next),l=en(l,l.next),or(a,t,i,n,r,s,0),void or(l,t,i,n,r,s,0)}o=o.next}a=a.next}while(a!==e)}function Cu(e,t){let i=e.x-t.x;if(i===0&&(i=e.y-t.y,i===0))i=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x);return i}function Ru(e,t){let i=function(r,s){let a=s,o=r.x,l=r.y,c,h=-1/0;if(On(r,a))return a;do{if(On(r,a.next))return a.next;if(l<=a.y&&l>=a.next.y&&a.next.y!==a.y){let m=a.x+(l-a.y)*(a.next.x-a.x)/(a.next.y-a.y);if(m<=o&&m>h&&(h=m,c=a.x<a.next.x?a:a.next,m===o))return c}a=a.next}while(a!==s);if(!c)return null;let d=c,u=c.x,p=c.y,g=1/0;a=c;do{if(o>=a.x&&a.x>=u&&o!==a.x&&ch(l<p?o:h,l,u,p,l<p?h:o,l,a.x,a.y)){let m=Math.abs(l-a.y)/(o-a.x);lr(a,r)&&(m<g||m===g&&(a.x>c.x||a.x===c.x&&Iu(c,a)))&&(c=a,g=m)}a=a.next}while(a!==d);return c}(e,t);if(!i)return t;let n=uh(i,e);return en(n,n.next),en(i,i.next)}function Iu(e,t){return ct(e.prev,e,t.prev)<0&&ct(t.next,e,e.next)<0}function Pa(e,t,i,n,r){return(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-i)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))|(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-n)*r|0)|t<<8))|t<<4))|t<<2))|t<<1))<<1}function Pu(e){let t=e,i=e;do(t.x<i.x||t.x===i.x&&t.y<i.y)&&(i=t),t=t.next;while(t!==e);return i}function ch(e,t,i,n,r,s,a,o){return(r-a)*(t-o)>=(e-a)*(s-o)&&(e-a)*(n-o)>=(i-a)*(t-o)&&(i-a)*(s-o)>=(r-a)*(n-o)}function ir(e,t,i,n,r,s,a,o){return!(e===a&&t===o)&&ch(e,t,i,n,r,s,a,o)}function Lu(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!function(i,n){let r=i;do{if(r.i!==i.i&&r.next.i!==i.i&&r.i!==n.i&&r.next.i!==n.i&&hh(r,r.next,i,n))return!0;r=r.next}while(r!==i);return!1}(e,t)&&(lr(e,t)&&lr(t,e)&&function(i,n){let r=i,s=!1,a=(i.x+n.x)/2,o=(i.y+n.y)/2;do r.y>o!=r.next.y>o&&r.next.y!==r.y&&a<(r.next.x-r.x)*(o-r.y)/(r.next.y-r.y)+r.x&&(s=!s),r=r.next;while(r!==i);return s}(e,t)&&(ct(e.prev,e,t.prev)||ct(e,t.prev,t))||On(e,t)&&ct(e.prev,e,e.next)>0&&ct(t.prev,t,t.next)>0)}function ct(e,t,i){return(t.y-e.y)*(i.x-t.x)-(t.x-e.x)*(i.y-t.y)}function On(e,t){return e.x===t.x&&e.y===t.y}function hh(e,t,i,n){let r=es(ct(e,t,i)),s=es(ct(e,t,n)),a=es(ct(i,n,e)),o=es(ct(i,n,t));return r!==s&&a!==o||(!(r!==0||!Qr(e,i,t))||(!(s!==0||!Qr(e,n,t))||(!(a!==0||!Qr(i,e,n))||!(o!==0||!Qr(i,t,n)))))}function Qr(e,t,i){return t.x<=Math.max(e.x,i.x)&&t.x>=Math.min(e.x,i.x)&&t.y<=Math.max(e.y,i.y)&&t.y>=Math.min(e.y,i.y)}function es(e){return e>0?1:e<0?-1:0}function lr(e,t){return ct(e.prev,e,e.next)<0?ct(e,t,e.next)>=0&&ct(e,e.prev,t)>=0:ct(e,t,e.prev)<0||ct(e,e.next,t)<0}function uh(e,t){let i=La(e.i,e.x,e.y),n=La(t.i,t.x,t.y),r=e.next,s=t.prev;return e.next=t,t.prev=e,i.next=r,r.prev=i,n.next=i,i.prev=n,s.next=n,n.prev=s,n}function $l(e,t,i,n){let r=La(e,t,i);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function cr(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function La(e,t,i){return{i:e,x:t,y:i,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}class dh{static triangulate(e,t,i=2){return bu(e,t,i)}}class hi{static area(e){let t=e.length,i=0;for(let n=t-1,r=0;r<t;n=r++)i+=e[n].x*e[r].y-e[r].x*e[n].y;return 0.5*i}static isClockWise(e){return hi.area(e)<0}static triangulateShape(e,t){let i=[],n=[],r=[];Ql(e),ec(i,e);let s=e.length;t.forEach(Ql);for(let o=0;o<t.length;o++)n.push(s),s+=t[o].length,ec(i,t[o]);let a=dh.triangulate(i,n);for(let o=0;o<a.length;o+=3)r.push(a.slice(o,o+3));return r}}function Ql(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function ec(e,t){for(let i=0;i<t.length;i++)e.push(t[i].x),e.push(t[i].y)}class Hi extends nt{constructor(e=new un([new ne(0.5,0.5),new ne(-0.5,0.5),new ne(-0.5,-0.5),new ne(0.5,-0.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,n=[],r=[];for(let a=0,o=e.length;a<o;a++)s(e[a]);function s(a){let o=[],l=t.curveSegments!==void 0?t.curveSegments:12,c=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness!==void 0?t.bevelThickness:0.2,p=t.bevelSize!==void 0?t.bevelSize:u-0.1,g=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,v=t.extrudePath,f=t.UVGenerator!==void 0?t.UVGenerator:Du,_,M,S,T,A,P=!1;if(v){_=v.getSpacedPoints(c),P=!0,d=!1;let x=!!v.isCatmullRomCurve3&&v.closed;M=v.computeFrenetFrames(c,x),S=new w,T=new w,A=new w}d||(m=0,u=0,p=0,g=0);let O=a.extractPoints(l),R=O.shape,V=O.holes;if(!hi.isClockWise(R)){R=R.reverse();for(let x=0,I=V.length;x<I;x++){let F=V[x];hi.isClockWise(F)&&(V[x]=F.reverse())}}function U(x){let F=x[0];for(let y=1;y<=x.length;y++){let L=y%x.length,N=x[L],E=N.x-F.x,H=N.y-F.y,k=E*E+H*H,J=Math.max(Math.abs(N.x),Math.abs(N.y),Math.abs(F.x),Math.abs(F.y));k<=0.000000000000000000010000000000000001*J*J?(x.splice(L,1),y--):F=N}}U(R),V.forEach(U);let Z=V.length,$=R;for(let x=0;x<Z;x++){let I=V[x];R=R.concat(I)}function D(x,I,F){return I||De("ExtrudeGeometry: vec does not exist"),x.clone().addScaledVector(I,F)}let W=R.length;function j(x,I,F){let y,L,N,E=x.x-I.x,H=x.y-I.y,k=F.x-x.x,J=F.y-x.y,ue=E*E+H*H,Ie=E*J-H*k;if(Math.abs(Ie)>Number.EPSILON){let oe=Math.sqrt(ue),we=Math.sqrt(k*k+J*J),se=I.x-H/oe,Pe=I.y+E/oe,ee=((F.x-J/we-se)*J-(F.y+k/we-Pe)*k)/(E*J-H*k);y=se+E*ee-x.x,L=Pe+H*ee-x.y;let de=y*y+L*L;if(de<=2)return new ne(y,L);N=Math.sqrt(de/2)}else{let oe=!1;E>Number.EPSILON?k>Number.EPSILON&&(oe=!0):E<-Number.EPSILON?k<-Number.EPSILON&&(oe=!0):Math.sign(H)===Math.sign(J)&&(oe=!0),oe?(y=-H,L=E,N=Math.sqrt(ue)):(y=E,L=H,N=Math.sqrt(ue/2))}return new ne(y/N,L/N)}let z=[];for(let x=0,I=$.length,F=I-1,y=x+1;x<I;x++,F++,y++)F===I&&(F=0),y===I&&(y=0),z[x]=j($[x],$[F],$[y]);let ae=[],le,Ee,ve=z.concat();for(let x=0,I=Z;x<I;x++){let F=V[x];le=[];for(let y=0,L=F.length,N=L-1,E=y+1;y<L;y++,N++,E++)N===L&&(N=0),E===L&&(E=0),le[y]=j(F[y],F[N],F[E]);ae.push(le),ve=ve.concat(le)}if(m===0)Ee=hi.triangulateShape($,V);else{let x=[],I=[];for(let F=0;F<m;F++){let y=F/m,L=u*Math.cos(y*Math.PI/2),N=p*Math.sin(y*Math.PI/2)+g;for(let E=0,H=$.length;E<H;E++){let k=D($[E],z[E],N);ce(k.x,k.y,-L),y===0&&x.push(k)}for(let E=0,H=Z;E<H;E++){let k=V[E];le=ae[E];let J=[];for(let ue=0,Ie=k.length;ue<Ie;ue++){let oe=D(k[ue],le[ue],N);ce(oe.x,oe.y,-L),y===0&&J.push(oe)}y===0&&I.push(J)}}Ee=hi.triangulateShape(x,I)}let q=Ee.length,pe=p+g;for(let x=0;x<W;x++){let I=d?D(R[x],ve[x],pe):R[x];P?(T.copy(M.normals[0]).multiplyScalar(I.x),S.copy(M.binormals[0]).multiplyScalar(I.y),A.copy(_[0]).add(T).add(S),ce(A.x,A.y,A.z)):ce(I.x,I.y,0)}for(let x=1;x<=c;x++)for(let I=0;I<W;I++){let F=d?D(R[I],ve[I],pe):R[I];P?(T.copy(M.normals[x]).multiplyScalar(F.x),S.copy(M.binormals[x]).multiplyScalar(F.y),A.copy(_[x]).add(T).add(S),ce(A.x,A.y,A.z)):ce(F.x,F.y,h/c*x)}for(let x=m-1;x>=0;x--){let I=x/m,F=u*Math.cos(I*Math.PI/2),y=p*Math.sin(I*Math.PI/2)+g;for(let L=0,N=$.length;L<N;L++){let E=D($[L],z[L],y);ce(E.x,E.y,h+F)}for(let L=0,N=V.length;L<N;L++){let E=V[L];le=ae[L];for(let H=0,k=E.length;H<k;H++){let J=D(E[H],le[H],y);P?ce(J.x,J.y+_[c-1].y,_[c-1].x+F):ce(J.x,J.y,h+F)}}}function Me(x,I){let F=x.length;for(;--F>=0;){let y=F,L=F-1;L<0&&(L=x.length-1);for(let N=0,E=c+2*m;N<E;N++){let H=W*N,k=W*(N+1);ie(I+y+H,I+L+H,I+L+k,I+y+k)}}}function ce(x,I,F){o.push(x),o.push(I),o.push(F)}function Te(x,I,F){be(x),be(I),be(F);let y=n.length/3,L=f.generateTopUV(i,n,y-3,y-2,y-1);C(L[0]),C(L[1]),C(L[2])}function ie(x,I,F,y){be(x),be(I),be(y),be(I),be(F),be(y);let L=n.length/3,N=f.generateSideWallUV(i,n,L-6,L-3,L-2,L-1);C(N[0]),C(N[1]),C(N[3]),C(N[1]),C(N[2]),C(N[3])}function be(x){n.push(o[3*x+0]),n.push(o[3*x+1]),n.push(o[3*x+2])}function C(x){r.push(x.x),r.push(x.y)}(function(){let x=n.length/3;if(d){let I=0,F=W*I;for(let y=0;y<q;y++){let L=Ee[y];Te(L[2]+F,L[1]+F,L[0]+F)}I=c+2*m,F=W*I;for(let y=0;y<q;y++){let L=Ee[y];Te(L[0]+F,L[1]+F,L[2]+F)}}else{for(let I=0;I<q;I++){let F=Ee[I];Te(F[2],F[1],F[0])}for(let I=0;I<q;I++){let F=Ee[I];Te(F[0]+W*c,F[1]+W*c,F[2]+W*c)}}i.addGroup(x,n.length/3-x,0)})(),function(){let x=n.length/3,I=0;Me($,I),I+=$.length;for(let F=0,y=V.length;F<y;F++){let L=V[F];Me(L,I),I+=L.length}i.addGroup(x,n.length/3-x,1)}()}this.setAttribute("position",new Ue(n,3)),this.setAttribute("uv",new Ue(r,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return function(t,i,n){if(n.shapes=[],Array.isArray(t))for(let r=0,s=t.length;r<s;r++){let a=t[r];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n.options=Object.assign({},i),i.extrudePath!==void 0&&(n.options.extrudePath=i.extrudePath.toJSON()),n}(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let i=[];for(let r=0,s=e.shapes.length;r<s;r++){let a=t[e.shapes[r]];i.push(a)}let n=e.options.extrudePath;return n!==void 0&&(e.options.extrudePath=new ss[n.type]().fromJSON(n)),new Hi(i,e.options)}}var Du={generateTopUV:function(e,t,i,n,r){let s=t[3*i],a=t[3*i+1],o=t[3*n],l=t[3*n+1],c=t[3*r],h=t[3*r+1];return[new ne(s,a),new ne(o,l),new ne(c,h)]},generateSideWallUV:function(e,t,i,n,r,s){let a=t[3*i],o=t[3*i+1],l=t[3*i+2],c=t[3*n],h=t[3*n+1],d=t[3*n+2],u=t[3*r],p=t[3*r+1],g=t[3*r+2],m=t[3*s],v=t[3*s+1],f=t[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new ne(a,1-l),new ne(c,1-d),new ne(u,1-g),new ne(m,1-f)]:[new ne(o,1-l),new ne(h,1-d),new ne(p,1-g),new ne(v,1-f)]}};class Os extends Gi{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2;super([-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Os(e.radius,e.detail)}}class dn extends nt{constructor(e=[new ne(0,-0.5),new ne(0.5,0),new ne(0,0.5)],t=12,i=0,n=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:n},t=Math.floor(t),n=Xe(n,0,2*Math.PI);let r=[],s=[],a=[],o=[],l=[],c=1/t,h=new w,d=new ne,u=new w,p=new w,g=new w,m=0,v=0;for(let f=0;f<=e.length-1;f++)switch(f){case 0:m=e[f+1].x-e[f].x,v=e[f+1].y-e[f].y,u.x=1*v,u.y=-m,u.z=0*v,g.copy(u),u.normalize(),o.push(u.x,u.y,u.z);break;case e.length-1:o.push(g.x,g.y,g.z);break;default:m=e[f+1].x-e[f].x,v=e[f+1].y-e[f].y,u.x=1*v,u.y=-m,u.z=0*v,p.copy(u),u.x+=g.x,u.y+=g.y,u.z+=g.z,u.normalize(),o.push(u.x,u.y,u.z),g.copy(p)}for(let f=0;f<=t;f++){let _=i+f*c*n,M=Math.sin(_),S=Math.cos(_);for(let T=0;T<=e.length-1;T++){h.x=e[T].x*M,h.y=e[T].y,h.z=e[T].x*S,s.push(h.x,h.y,h.z),d.x=f/t,d.y=T/(e.length-1),a.push(d.x,d.y);let A=o[3*T+0]*M,P=o[3*T+1],O=o[3*T+0]*S;l.push(A,P,O)}}for(let f=0;f<t;f++)for(let _=0;_<e.length-1;_++){let M=_+f*e.length,S=M,T=M+e.length,A=M+e.length+1,P=M+1;r.push(S,T,P),r.push(A,P,T)}this.setIndex(r),this.setAttribute("position",new Ue(s,3)),this.setAttribute("uv",new Ue(a,2)),this.setAttribute("normal",new Ue(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dn(e.points,e.segments,e.phiStart,e.phiLength)}}class Bs extends Gi{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Bs(e.radius,e.detail)}}class jn extends nt{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};let r=e/2,s=t/2,a=Math.floor(i),o=Math.floor(n),l=a+1,c=o+1,h=e/a,d=t/o,u=[],p=[],g=[],m=[];for(let v=0;v<c;v++){let f=v*d-s;for(let _=0;_<l;_++){let M=_*h-r;p.push(M,-f,0),g.push(0,0,1),m.push(_/a),m.push(1-v/o)}}for(let v=0;v<o;v++)for(let f=0;f<a;f++){let _=f+l*v,M=f+l*(v+1),S=f+1+l*(v+1),T=f+1+l*v;u.push(_,M,T),u.push(M,S,T)}this.setIndex(u),this.setAttribute("position",new Ue(p,3)),this.setAttribute("normal",new Ue(g,3)),this.setAttribute("uv",new Ue(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.width,e.height,e.widthSegments,e.heightSegments)}}class qn extends nt{constructor(e=0.5,t=1,i=32,n=1,r=0,s=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:s},i=Math.max(3,i);let a=[],o=[],l=[],c=[],h=e,d=(t-e)/(n=Math.max(1,n)),u=new w,p=new ne;for(let g=0;g<=n;g++){for(let m=0;m<=i;m++){let v=r+m/i*s;u.x=h*Math.cos(v),u.y=h*Math.sin(v),o.push(u.x,u.y,u.z),l.push(0,0,1),p.x=(u.x/t+1)/2,p.y=(u.y/t+1)/2,c.push(p.x,p.y)}h+=d}for(let g=0;g<n;g++){let m=g*(i+1);for(let v=0;v<i;v++){let f=v+m,_=f,M=f+i+1,S=f+i+2,T=f+1;a.push(_,M,T),a.push(M,S,T)}}this.setIndex(a),this.setAttribute("position",new Ue(o,3)),this.setAttribute("normal",new Ue(l,3)),this.setAttribute("uv",new Ue(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class zs extends nt{constructor(e=new un([new ne(0,0.5),new ne(-0.5,-0.5),new ne(0.5,-0.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],n=[],r=[],s=[],a=0,o=0;if(Array.isArray(e)===!1)l(e);else for(let c=0;c<e.length;c++)l(e[c]),this.addGroup(a,o,c),a+=o,o=0;function l(c){let h=n.length/3,d=c.extractPoints(t),u=d.shape,p=d.holes;hi.isClockWise(u)===!1&&(u=u.reverse());for(let m=0,v=p.length;m<v;m++){let f=p[m];hi.isClockWise(f)===!0&&(p[m]=f.reverse())}let g=hi.triangulateShape(u,p);for(let m=0,v=p.length;m<v;m++){let f=p[m];u=u.concat(f)}for(let m=0,v=u.length;m<v;m++){let f=u[m];n.push(f.x,f.y,0),r.push(0,0,1),s.push(f.x,f.y)}for(let m=0,v=g.length;m<v;m++){let f=g[m],_=f[0]+h,M=f[1]+h,S=f[2]+h;i.push(_,M,S),o+=3}}this.setIndex(i),this.setAttribute("position",new Ue(n,3)),this.setAttribute("normal",new Ue(r,3)),this.setAttribute("uv",new Ue(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return function(t,i){if(i.shapes=[],Array.isArray(t))for(let n=0,r=t.length;n<r;n++){let s=t[n];i.shapes.push(s.uuid)}else i.shapes.push(t.uuid);return i}(this.parameters.shapes,e)}static fromJSON(e,t){let i=[];for(let n=0,r=e.shapes.length;n<r;n++){let s=t[e.shapes[n]];i.push(s)}return new zs(i,e.curveSegments)}}class si extends nt{constructor(e=1,t=32,i=16,n=0,r=2*Math.PI,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:s,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let o=Math.min(s+a,Math.PI),l=0,c=[],h=new w,d=new w,u=[],p=[],g=[],m=[];for(let v=0;v<=i;v++){let f=[],_=v/i,M=s+_*a,S=e*Math.cos(M),T=Math.sqrt(e*e-S*S),A=0;v===0&&s===0?A=0.5/t:v===i&&o===Math.PI&&(A=-0.5/t);for(let P=0;P<=t;P++){let O=P/t,R=n+O*r;h.x=-T*Math.cos(R),h.y=S,h.z=T*Math.sin(R),p.push(h.x,h.y,h.z),d.copy(h).normalize(),g.push(d.x,d.y,d.z),m.push(O+A,1-_),f.push(l++)}c.push(f)}for(let v=0;v<i;v++)for(let f=0;f<t;f++){let _=c[v][f+1],M=c[v][f],S=c[v+1][f],T=c[v+1][f+1];(v!==0||s>0)&&u.push(_,M,T),(v!==i-1||o<Math.PI)&&u.push(M,S,T)}this.setIndex(u),this.setAttribute("position",new Ue(p,3)),this.setAttribute("normal",new Ue(g,3)),this.setAttribute("uv",new Ue(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new si(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Vs extends Gi{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Vs(e.radius,e.detail)}}class pn extends nt{constructor(e=1,t=0.4,i=12,n=48,r=2*Math.PI,s=0,a=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r,thetaStart:s,thetaLength:a},i=Math.floor(i),n=Math.floor(n);let o=[],l=[],c=[],h=[],d=new w,u=new w,p=new w;for(let g=0;g<=i;g++){let m=s+g/i*a;for(let v=0;v<=n;v++){let f=v/n*r;u.x=(e+t*Math.cos(m))*Math.cos(f),u.y=(e+t*Math.cos(m))*Math.sin(f),u.z=t*Math.sin(m),l.push(u.x,u.y,u.z),d.x=e*Math.cos(f),d.y=e*Math.sin(f),p.subVectors(u,d).normalize(),c.push(p.x,p.y,p.z),h.push(v/n),h.push(g/i)}}for(let g=1;g<=i;g++)for(let m=1;m<=n;m++){let v=(n+1)*g+m-1,f=(n+1)*(g-1)+m-1,_=(n+1)*(g-1)+m,M=(n+1)*g+m;o.push(v,f,M),o.push(f,_,M)}this.setIndex(o),this.setAttribute("position",new Ue(l,3)),this.setAttribute("normal",new Ue(c,3)),this.setAttribute("uv",new Ue(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Gs extends nt{constructor(e=1,t=0.4,i=64,n=8,r=2,s=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:i,radialSegments:n,p:r,q:s},i=Math.floor(i),n=Math.floor(n);let a=[],o=[],l=[],c=[],h=new w,d=new w,u=new w,p=new w,g=new w,m=new w,v=new w;for(let _=0;_<=i;++_){let M=_/i*r*Math.PI*2;f(M,r,s,e,u),f(M+0.01,r,s,e,p),m.subVectors(p,u),v.addVectors(p,u),g.crossVectors(m,v),v.crossVectors(g,m),g.normalize(),v.normalize();for(let S=0;S<=n;++S){let T=S/n*Math.PI*2,A=-t*Math.cos(T),P=t*Math.sin(T);h.x=u.x+(A*v.x+P*g.x),h.y=u.y+(A*v.y+P*g.y),h.z=u.z+(A*v.z+P*g.z),o.push(h.x,h.y,h.z),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(_/i),c.push(S/n)}}for(let _=1;_<=i;_++)for(let M=1;M<=n;M++){let S=(n+1)*(_-1)+(M-1),T=(n+1)*_+(M-1),A=(n+1)*_+M,P=(n+1)*(_-1)+M;a.push(S,T,P),a.push(T,A,P)}function f(_,M,S,T,A){let P=Math.cos(_),O=Math.sin(_),R=S/M*_,V=Math.cos(R);A.x=T*(2+V)*0.5*P,A.y=T*(2+V)*O*0.5,A.z=T*Math.sin(R)*0.5}this.setIndex(a),this.setAttribute("position",new Ue(o,3)),this.setAttribute("normal",new Ue(l,3)),this.setAttribute("uv",new Ue(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}}class ki extends nt{constructor(e=new Us(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,i=1,n=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:n,closed:r};let s=e.computeFrenetFrames(t,r);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;let a=new w,o=new w,l=new ne,c=new w,h=[],d=[],u=[],p=[];function g(m){c=e.getPointAt(m/t,c);let v=s.normals[m],f=s.binormals[m];for(let _=0;_<=n;_++){let M=_/n*Math.PI*2,S=Math.sin(M),T=-Math.cos(M);o.x=T*v.x+S*f.x,o.y=T*v.y+S*f.y,o.z=T*v.z+S*f.z,o.normalize(),d.push(o.x,o.y,o.z),a.x=c.x+i*o.x,a.y=c.y+i*o.y,a.z=c.z+i*o.z,h.push(a.x,a.y,a.z)}}(function(){for(let m=0;m<t;m++)g(m);g(r===!1?t:0),function(){for(let m=0;m<=t;m++)for(let v=0;v<=n;v++)l.x=m/t,l.y=v/n,u.push(l.x,l.y)}(),function(){for(let m=1;m<=t;m++)for(let v=1;v<=n;v++){let f=(n+1)*(m-1)+(v-1),_=(n+1)*m+(v-1),M=(n+1)*m+v,S=(n+1)*(m-1)+v;p.push(f,_,S),p.push(_,M,S)}}()})(),this.setIndex(p),this.setAttribute("position",new Ue(h,3)),this.setAttribute("normal",new Ue(d,3)),this.setAttribute("uv",new Ue(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ki(new ss[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Wo extends nt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],i=new Set,n=new w,r=new w;if(e.index!==null){let s=e.attributes.position,a=e.index,o=e.groups;o.length===0&&(o=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,c=o.length;l<c;++l){let h=o[l],d=h.start;for(let u=d,p=d+h.count;u<p;u+=3)for(let g=0;g<3;g++){let m=a.getX(u+g),v=a.getX(u+(g+1)%3);n.fromBufferAttribute(s,m),r.fromBufferAttribute(s,v),tc(n,r,i)===!0&&(t.push(n.x,n.y,n.z),t.push(r.x,r.y,r.z))}}}else{let s=e.attributes.position;for(let a=0,o=s.count/3;a<o;a++)for(let l=0;l<3;l++){let c=3*a+l,h=3*a+(l+1)%3;n.fromBufferAttribute(s,c),r.fromBufferAttribute(s,h),tc(n,r,i)===!0&&(t.push(n.x,n.y,n.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Ue(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function tc(e,t,i){let n=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,r=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;return i.has(n)!==!0&&i.has(r)!==!0&&(i.add(n),i.add(r),!0)}var wm=Object.freeze({__proto__:null,BoxGeometry:Wt,CapsuleGeometry:hn,CircleGeometry:Rs,ConeGeometry:Is,CylinderGeometry:rt,DodecahedronGeometry:Ps,EdgesGeometry:Bo,ExtrudeGeometry:Hi,IcosahedronGeometry:Os,LatheGeometry:dn,OctahedronGeometry:Bs,PlaneGeometry:jn,PolyhedronGeometry:Gi,RingGeometry:qn,ShapeGeometry:zs,SphereGeometry:si,TetrahedronGeometry:Vs,TorusGeometry:pn,TorusKnotGeometry:Gs,TubeGeometry:ki,WireframeGeometry:Wo});function mn(e){let t={};for(let i in e){t[i]={};for(let n in e[i]){let r=e[i][n];if(ic(r))r.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][n]=null):t[i][n]=r.clone();else if(Array.isArray(r))if(ic(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();t[i][n]=s}else t[i][n]=r.slice();else t[i][n]=r}}return t}function Lt(e){let t={};for(let i=0;i<e.length;i++){let n=mn(e[i]);for(let r in n)t[r]=n[r]}return t}function ic(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Xo(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qe.workingColorSpace}var ph={clone:mn,merge:Lt};class Zt extends cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mn(e.uniforms),this.uniformsGroups=function(t){let i=[];for(let n=0;n<t.length;n++)i.push(t[n].clone());return i}(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:"m4",value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let n=e.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=t[n.value]||null;break;case"c":this.uniforms[i].value=new Fe().setHex(n.value);break;case"v2":this.uniforms[i].value=new ne().fromArray(n.value);break;case"v3":this.uniforms[i].value=new w().fromArray(n.value);break;case"v4":this.uniforms[i].value=new et().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Ge().fromArray(n.value);break;case"m4":this.uniforms[i].value=new ze().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class jo extends Zt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class zt extends cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ai,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fn extends zt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+0.4*t)/(1-0.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class qo extends cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Yo extends cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function ts(e,t){return e&&e.constructor!==t?typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e):e}class gn{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,n=t[i],r=t[i-1];i:{e:{let s;t:{n:if(!(e<n)){for(let a=i+2;;){if(n===void 0){if(e<r)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=n,n=t[++i],e<n)break e}s=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(i=2,r=a);for(let o=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===o)break;if(n=r,r=t[--i-1],e>=r)break e}s=i,i=0;break t}break i}for(;i<s;){let a=i+s>>>1;e<t[a]?s=a:i=a+1}if(n=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n;for(let s=0;s!==n;++s)t[s]=i[r+s];return t}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class Zo extends gn{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,i){let n=this.parameterPositions,r=e-2,s=e+1,a=n[r],o=n[s];if(a===void 0)switch(this.getSettings_().endingStart){case 2401:r=e,a=2*t-i;break;case 2402:r=n.length-2,a=t+n[r]-n[r+1];break;default:r=e,a=i}if(o===void 0)switch(this.getSettings_().endingEnd){case 2401:s=e,o=2*i-t;break;case 2402:s=1,o=i+n[1]-n[0];break;default:s=e-1,o=t}let l=0.5*(i-t),c=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(o-i),this._offsetPrev=r*c,this._offsetNext=s*c}interpolate_(e,t,i,n){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=e*a,l=o-a,c=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,u=this._weightNext,p=(i-t)/(n-t),g=p*p,m=g*p,v=-d*m+2*d*g-d*p,f=(1+d)*m+(-1.5-2*d)*g+(-0.5+d)*p+1,_=(-1-u)*m+(1.5+u)*g+0.5*p,M=u*m-u*g;for(let S=0;S!==a;++S)r[S]=v*s[c+S]+f*s[l+S]+_*s[o+S]+M*s[h+S];return r}}class Jo extends gn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=e*a,l=o-a,c=(i-t)/(n-t),h=1-c;for(let d=0;d!==a;++d)r[d]=s[l+d]*h+s[o+d]*c;return r}}class Ko extends gn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}}class $o extends gn{interpolate_(e,t,i,n){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=e*a,l=o-a,c=this.inTangents,h=this.outTangents;if(!c||!h){let p=(i-t)/(n-t),g=1-p;for(let m=0;m!==a;++m)r[m]=s[l+m]*g+s[o+m]*p;return r}let d=2*a,u=e-1;for(let p=0;p!==a;++p){let g=s[l+p],m=s[o+p],v=u*d+2*p,f=h[v],_=h[v+1],M=e*d+2*p,S=c[M],T=c[M+1],A,P,O,R,V,U=(i-t)/(n-t);for(let Z=0;Z<8;Z++){A=U*U,P=A*U,O=1-U,R=O*O,V=R*O;let $=V*t+3*R*U*f+3*O*A*S+P*n-i;if(Math.abs($)<0.0000000001)break;let D=3*R*(f-t)+6*O*U*(S-f)+3*A*(n-S);if(Math.abs(D)<0.0000000001)break;U-=$/D,U=Math.max(0,Math.min(1,U))}r[p]=V*g+3*R*U*_+3*O*A*T+P*m}return r}}class qt{constructor(e,t,i,n){if(e===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ts(t,this.TimeBufferType),this.values=ts(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:ts(e.times,Array),values:ts(e.values,Array)};let n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Ko(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Jo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Zo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new $o(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break;case 2303:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw Error(i);this.setInterpolation(this.DefaultInterpolation)}return Le("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e}return this}trim(e,t){let i=this.times,n=i.length,r=0,s=n-1;for(;r!==n&&i[r]<e;)++r;for(;s!==-1&&i[s]>t;)--s;if(++s,r!==0||s!==n){r>=s&&(s=Math.max(s,1),r=s-1);let a=this.getValueSize();this.times=i.slice(r,s),this.values=this.values.slice(r*a,s*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(De("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,n=this.values,r=i.length;r===0&&(De("KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let a=0;a!==r;a++){let o=i[a];if(typeof o=="number"&&isNaN(o)){De("KeyframeTrack: Time is not a valid number.",this,a,o),e=!1;break}if(s!==null&&s>o){De("KeyframeTrack: Out of order keys.",this,a,o,s),e=!1;break}s=o}if(n!==void 0&&nu(n))for(let a=0,o=n.length;a!==o;++a){let l=n[a];if(isNaN(l)){De("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===2302,r=e.length-1,s=1;for(let a=1;a<r;++a){let o=!1,l=e[a];if(l!==e[a+1]&&(a!==1||l!==e[0]))if(n)o=!0;else{let c=a*i,h=c-i,d=c+i;for(let u=0;u!==i;++u){let p=t[c+u];if(p!==t[h+u]||p!==t[d+u]){o=!0;break}}}if(o){if(a!==s){e[s]=e[a];let c=a*i,h=s*i;for(let d=0;d!==i;++d)t[h+d]=t[c+d]}++s}}if(r>0){e[s]=e[r];for(let a=r*i,o=s*i,l=0;l!==i;++l)t[o+l]=t[a+l];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=new this.constructor(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}qt.prototype.ValueTypeName="",qt.prototype.TimeBufferType=Float32Array,qt.prototype.ValueBufferType=Float32Array,qt.prototype.DefaultInterpolation=2301;class Ki extends qt{constructor(e,t,i){super(e,t,i)}}Ki.prototype.ValueTypeName="bool",Ki.prototype.ValueBufferType=Array,Ki.prototype.DefaultInterpolation=2300,Ki.prototype.InterpolantFactoryMethodLinear=void 0,Ki.prototype.InterpolantFactoryMethodSmooth=void 0;class Qo extends qt{constructor(e,t,i,n){super(e,t,i,n)}}Qo.prototype.ValueTypeName="color";class el extends qt{constructor(e,t,i,n){super(e,t,i,n)}}el.prototype.ValueTypeName="number";class tl extends gn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,o=(i-t)/(n-t),l=e*a;for(let c=l+a;l!==c;l+=4)kt.slerpFlat(r,0,s,l-a,s,l,o);return r}}class as extends qt{constructor(e,t,i,n){super(e,t,i,n)}InterpolantFactoryMethodLinear(e){return new tl(this.times,this.values,this.getValueSize(),e)}}as.prototype.ValueTypeName="quaternion",as.prototype.InterpolantFactoryMethodSmooth=void 0;class $i extends qt{constructor(e,t,i){super(e,t,i)}}$i.prototype.ValueTypeName="string",$i.prototype.ValueBufferType=Array,$i.prototype.DefaultInterpolation=2300,$i.prototype.InterpolantFactoryMethodLinear=void 0,$i.prototype.InterpolantFactoryMethodSmooth=void 0;class il extends qt{constructor(e,t,i,n){super(e,t,i,n)}}il.prototype.ValueTypeName="vector";class nl{constructor(e,t,i){let n=this,r,s=!1,a=0,o=0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(c){o++,s===!1&&n.onStart!==void 0&&n.onStart(c,a,o),s=!0},this.itemEnd=function(c){a++,n.onProgress!==void 0&&n.onProgress(c,a,o),a===o&&(s=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(c){n.onError!==void 0&&n.onError(c)},this.resolveURL=function(c){return c=c.normalize("NFC"),r?r(c):c},this.setURLModifier=function(c){return r=c,this},this.addHandler=function(c,h){return l.push(c,h),this},this.removeHandler=function(c){let h=l.indexOf(c);return h!==-1&&l.splice(h,2),this},this.getHandler=function(c){for(let h=0,d=l.length;h<d;h+=2){let u=l[h],p=l[h+1];if(u.global&&(u.lastIndex=0),u.test(c))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}var mh=new nl;class rl{constructor(e){this.manager=e!==void 0?e:mh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}rl.DEFAULT_MATERIAL_NAME="__DEFAULT";class xr extends ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Hs extends xr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}var Ra=new ze,nc=new w,rc=new w;class sl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fi,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;nc.setFromMatrixPosition(e.matrixWorld),t.position.copy(nc),rc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rc),t.updateMatrixWorld(),Ra.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ra,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?i.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,1,0,0,0,0,1):i.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1),i.multiply(Ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}var is=new w,ns=new kt,ci=new w;class yr extends ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(is,ns,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(is,ns,ci.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(is,ns,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(is,ns,ci.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var Ui=new w,sc=new ne,ac=new ne;class It extends yr{constructor(e=50,t=1,i=0.1,n=2000){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=0.5*this.getFilmHeight()/e;this.fov=2*ar*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(0.5*rs*this.fov);return 0.5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*ar*Math.atan(Math.tan(0.5*rs*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ui.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,t){return this.getViewBounds(e,sc,ac),t.subVectors(ac,sc)}setViewOffset(e,t,i,n,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(0.5*rs*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-0.5*n,s=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:o,fullHeight:l}=s;r+=s.offsetX*n/o,t-=s.offsetY*i/l,n*=s.width/o,i*=s.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class fh extends sl{constructor(){super(new It(50,1,0.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=2*ar*e.angle*this.focus,n=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;i===t.fov&&n===t.aspect&&r===t.far||(t.fov=i,t.aspect=n,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ks extends xr{constructor(e,t,i=0,n=Math.PI/3,r=0,s=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.distance=i,this.angle=n,this.penumbra=r,this.decay=s,this.map=null,this.shadow=new fh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Mr extends yr{constructor(e=-1,t=1,i=1,n=-1,r=0.1,s=2000){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,r=i-e,s=i+e,a=n+t,o=n-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,s=r+l*this.view.width,a-=c*this.view.offsetY,o=a-c*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class gh extends sl{constructor(){super(new Mr(-5,5,5,-5,0.5,500)),this.isDirectionalLightShadow=!0}}class Ws extends xr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.shadow=new gh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}var Cm=new ze,Rm=new ze,Im=new ze;var Dn=-90;class Sr extends ut{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new It(Dn,1,e,t);n.layers=this.layers,this.add(n);let r=new It(Dn,1,e,t);r.layers=this.layers,this.add(r);let s=new It(Dn,1,e,t);s.layers=this.layers,this.add(s);let a=new It(Dn,1,e,t);a.layers=this.layers,this.add(a);let o=new It(Dn,1,e,t);o.layers=this.layers,this.add(o);let l=new It(Dn,1,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,n,r,s,a,o]=t;for(let l of t)this.remove(l);if(e===2000)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else{if(e!==2001)throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1)}for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,s,a,o,l,c]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;m=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(i,0,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,4,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(h,d,u),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class al extends It{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}var Pm=new w,Lm=new kt,Dm=new w,Nm=new w,Um=new w;var Fm=new w,Om=new kt,Bm=new w,zm=new w;var ol="\\[\\]\\.:\\/",Nu=new RegExp("["+ol+"]","g"),Ia="[^"+ol+"]",Uu="[^"+ol.replace("\\.","")+"]",Fu=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Ia)+/(WCOD+)?/.source.replace("WCOD",Uu)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ia)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ia)+"$"),Ou=["material","materials","bones","map"];class Qe{constructor(e,t,i){this.path=t,this.parsedPath=i||Qe.parseTrackName(t),this.node=Qe.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new Qe.Composite(e,t,i):new Qe(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Nu,"")}static parseTrackName(e){let t=Fu.exec(e);if(t===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let r=i.nodeName.substring(n+1);Ou.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let s=0;s<r.length;s++){let a=r[s];if(a.name===t||a.uuid===t)return a;let o=i(a.children);if(o)return o}return null},n=i(e.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,n=t.propertyName,r=t.propertyIndex;if(e||(e=Qe.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void Le("PropertyBinding: No target node found for track: "+this.path+".");if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material)return void De("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void De("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void De("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let c=0;c<e.length;c++)if(e[c].name===l){l=c;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void De("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void De("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[i]===void 0)return void De("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[i]}if(l!==void 0){if(e[l]===void 0)return void De("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[l]}}let s=e[n];if(s===void 0)return void De("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+n+" but it wasn't found.",e);let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!e.geometry)return void De("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void De("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}o=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=r}else s.fromArray!==void 0&&s.toArray!==void 0?(o=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(o=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=n;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Qe.Composite=class{constructor(e,t,i){let n=i||Qe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Qe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Qe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Qe.prototype.GetterByBindingType=[Qe.prototype._getValue_direct,Qe.prototype._getValue_array,Qe.prototype._getValue_arrayElement,Qe.prototype._getValue_toArray],Qe.prototype.SetterByBindingTypeAndVersioning=[[Qe.prototype._setValue_direct,Qe.prototype._setValue_direct_setNeedsUpdate,Qe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_array,Qe.prototype._setValue_array_setNeedsUpdate,Qe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_arrayElement,Qe.prototype._setValue_arrayElement_setNeedsUpdate,Qe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_fromArray,Qe.prototype._setValue_fromArray_setNeedsUpdate,Qe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Vm=new Float32Array(1);var Gm=new ze;class ll{static{ll.prototype.isMatrix2=!0}constructor(e,t,i,n){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,n){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=n,this}}var Hm=new ne;var km=new w,Wm=new w,Xm=new w,jm=new w,qm=new w,Ym=new w,Zm=new w;var Jm=new w;var Km=new w,$m=new ze,Qm=new ze;var ef=new w,tf=new Fe,nf=new Fe;var rf=new w,sf=new w,af=new w;var of=new w,lf=new yr;var cf=new pi;var hf=new w;function cl(e,t,i,n){let r=function(s){switch(s){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}(n);switch(i){case 1021:return e*t;case 1028:case 1029:return e*t/r.components*r.byteLength;case 1030:case 1031:return e*t*2/r.components*r.byteLength;case 1022:return e*t*3/r.components*r.byteLength;case 1023:case 1033:return e*t*4/r.components*r.byteLength;case 33776:case 33777:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 33778:case 33779:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 35841:case 35843:return Math.max(e,16)*Math.max(t,8)/4;case 35840:case 35842:return Math.max(e,8)*Math.max(t,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 37496:case 37490:case 37491:case 37808:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 37809:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case 37810:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case 37811:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case 37812:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case 37813:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case 37814:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case 37815:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case 37816:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case 37817:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case 37818:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case 37819:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case 37820:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case 37821:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(e/4)*Math.ceil(t/4)*16;case 36283:case 36284:return Math.ceil(e/4)*Math.ceil(t/4)*8;case 36285:case 36286:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${i} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}})),typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function zh(){let e=null,t=!1,i=null,n=null;function r(s,a){i(s,a),n=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&i!==null&&e!==null&&(n=e.requestAnimationFrame(r),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){i=s},setContext:function(s){e=s}}}function Bu(e){let t=new WeakMap;return{get:function(i){return i.isInterleavedBufferAttribute&&(i=i.data),t.get(i)},remove:function(i){i.isInterleavedBufferAttribute&&(i=i.data);let n=t.get(i);n&&(e.deleteBuffer(n.buffer),t.delete(i))},update:function(i,n){if(i.isInterleavedBufferAttribute&&(i=i.data),i.isGLBufferAttribute){let s=t.get(i);return void((!s||s.version<i.version)&&t.set(i,{buffer:i.buffer,type:i.type,bytesPerElement:i.elementSize,version:i.version}))}let r=t.get(i);if(r===void 0)t.set(i,function(s,a){let{array:o,usage:l}=s,c=o.byteLength,h=e.createBuffer(),d;if(e.bindBuffer(a,h),e.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)d=e.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)d=e.HALF_FLOAT;else if(o instanceof Uint16Array)d=s.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(o instanceof Int16Array)d=e.SHORT;else if(o instanceof Uint32Array)d=e.UNSIGNED_INT;else if(o instanceof Int32Array)d=e.INT;else if(o instanceof Int8Array)d=e.BYTE;else if(o instanceof Uint8Array)d=e.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);d=e.UNSIGNED_BYTE}return{buffer:h,type:d,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}}(i,n));else if(r.version<i.version){if(r.size!==i.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let{array:l,updateRanges:c}=a;if(e.bindBuffer(o,s),c.length===0)e.bufferSubData(o,0,l);else{c.sort((d,u)=>d.start-u.start);let h=0;for(let d=1;d<c.length;d++){let u=c[h],p=c[d];p.start<=u.start+u.count+1?u.count=Math.max(u.count,p.start+p.count-u.start):(++h,c[h]=p)}c.length=h+1;for(let d=0,u=c.length;d<u;d++){let p=c[d];e.bufferSubData(o,p.start*l.BYTES_PER_ELEMENT,l,p.start,p.count)}a.clearUpdateRanges()}a.onUploadCallback()})(r.buffer,i,n),r.version=i.version}}}}var We={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
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
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
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
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
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
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
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
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
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
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
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
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
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
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
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
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
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
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
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
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
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
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
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
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
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
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
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
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
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
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
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
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
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
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
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
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
}`,distance_vert:`#define DISTANCE
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
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
}`,linedashed_frag:`uniform vec3 diffuse;
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
}`,meshbasic_vert:`#include <common>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
}`,meshlambert_vert:`#define LAMBERT
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
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshmatcap_vert:`#define MATCAP
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
}`,meshmatcap_frag:`#define MATCAP
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
}`,meshnormal_vert:`#define NORMAL
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
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
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
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,meshphysical_vert:`#define STANDARD
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
}`,meshphysical_frag:`#define STANDARD
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,meshtoon_vert:`#define TOON
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
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,points_vert:`uniform float size;
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
}`,points_frag:`uniform vec3 diffuse;
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
}`,shadow_vert:`#include <common>
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
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
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
}`,sprite_frag:`uniform vec3 diffuse;
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
}`},_e={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new w},probesMax:{value:new w},probesResolution:{value:new w}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new ne(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},gi={basic:{uniforms:Lt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Lt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Fe(0)},envMapIntensity:{value:1}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Lt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Lt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Lt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Fe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Lt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Lt([_e.points,_e.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Lt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Lt([_e.common,_e.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Lt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Lt([_e.sprite,_e.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distance:{uniforms:Lt([_e.common,_e.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:We.distance_vert,fragmentShader:We.distance_frag},shadow:{uniforms:Lt([_e.lights,_e.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};gi.physical={uniforms:Lt([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};var Xs={r:0,b:0,g:0},zu=new ze,Vh=new Ge;function Vu(e,t,i,n,r,s){let a=new Fe(0),o,l,c=r===!0?0:1,h=null,d=0,u=null;function p(m){let v=m.isScene===!0?m.background:null;if(v&&v.isTexture){let f=m.backgroundBlurriness>0;v=t.get(v,f)}return v}function g(m,v){m.getRGB(Xs,Xo(e)),i.buffers.color.setClear(Xs.r,Xs.g,Xs.b,v,s)}return{getClearColor:function(){return a},setClearColor:function(m,v=1){a.set(m),c=v,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,g(a,c)},render:function(m){let v=!1,f=p(m);f===null?g(a,c):f&&f.isColor&&(g(f,1),v=!0);let _=e.xr.getEnvironmentBlendMode();_==="additive"?i.buffers.color.setClear(0,0,0,1,s):_==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(e.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))},addToRenderList:function(m,v){let f=p(v);f&&(f.isCubeTexture||f.mapping===dr)?(l===void 0&&(l=new St(new Wt(1,1,1),new Zt({name:"BackgroundCubeMaterial",uniforms:mn(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(_,M,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=f,l.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(zu.makeRotationFromEuler(v.backgroundRotation)).transpose(),f.isCubeTexture&&f.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Vh),l.material.toneMapped=qe.getTransfer(f.colorSpace)!==tt,h===f&&d===f.version&&u===e.toneMapping||(l.material.needsUpdate=!0,h=f,d=f.version,u=e.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null)):f&&f.isTexture&&(o===void 0&&(o=new St(new jn(2,2),new Zt({name:"BackgroundMaterial",uniforms:mn(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=f,o.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,o.material.toneMapped=qe.getTransfer(f.colorSpace)!==tt,f.matrixAutoUpdate===!0&&f.updateMatrix(),o.material.uniforms.uvTransform.value.copy(f.matrix),h===f&&d===f.version&&u===e.toneMapping||(o.material.needsUpdate=!0,h=f,d=f.version,u=e.toneMapping),o.layers.enableAll(),m.unshift(o,o.geometry,o.material,0,0,null))},dispose:function(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}}}function Gu(e,t){let i=e.getParameter(e.MAX_VERTEX_ATTRIBS),n={},r=c(null),s=r,a=!1;function o(f){return e.bindVertexArray(f)}function l(f){return e.deleteVertexArray(f)}function c(f){let _=[],M=[],S=[];for(let T=0;T<i;T++)_[T]=0,M[T]=0,S[T]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:M,attributeDivisors:S,object:f,attributes:{},index:null}}function h(){let f=s.newAttributes;for(let _=0,M=f.length;_<M;_++)f[_]=0}function d(f){u(f,0)}function u(f,_){let{newAttributes:M,enabledAttributes:S,attributeDivisors:T}=s;M[f]=1,S[f]===0&&(e.enableVertexAttribArray(f),S[f]=1),T[f]!==_&&(e.vertexAttribDivisor(f,_),T[f]=_)}function p(){let{newAttributes:f,enabledAttributes:_}=s;for(let M=0,S=_.length;M<S;M++)_[M]!==f[M]&&(e.disableVertexAttribArray(M),_[M]=0)}function g(f,_,M,S,T,A,P){P===!0?e.vertexAttribIPointer(f,_,M,T,A):e.vertexAttribPointer(f,_,M,S,T,A)}function m(){v(),a=!0,s!==r&&(s=r,o(s.object))}function v(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(f,_,M,S,T){let A=!1,P=function(O,R,V,U){let Z=U.wireframe===!0,$=n[R.id];$===void 0&&($={},n[R.id]=$);let D=O.isInstancedMesh===!0?O.id:0,W=$[D];W===void 0&&(W={},$[D]=W);let j=W[V.id];j===void 0&&(j={},W[V.id]=j);let z=j[Z];return z===void 0&&(z=c(e.createVertexArray()),j[Z]=z),z}(f,S,M,_);s!==P&&(s=P,o(s.object)),A=function(O,R,V,U){let Z=s.attributes,$=R.attributes,D=0,W=V.getAttributes();for(let j in W)if(W[j].location>=0){let z=Z[j],ae=$[j];if(ae===void 0&&(j==="instanceMatrix"&&O.instanceMatrix&&(ae=O.instanceMatrix),j==="instanceColor"&&O.instanceColor&&(ae=O.instanceColor)),z===void 0)return!0;if(z.attribute!==ae)return!0;if(ae&&z.data!==ae.data)return!0;D++}return s.attributesNum!==D||s.index!==U}(f,S,M,T),A&&function(O,R,V,U){let Z={},$=R.attributes,D=0,W=V.getAttributes();for(let j in W)if(W[j].location>=0){let z=$[j];z===void 0&&(j==="instanceMatrix"&&O.instanceMatrix&&(z=O.instanceMatrix),j==="instanceColor"&&O.instanceColor&&(z=O.instanceColor));let ae={};ae.attribute=z,z&&z.data&&(ae.data=z.data),Z[j]=ae,D++}s.attributes=Z,s.attributesNum=D,s.index=U}(f,S,M,T),T!==null&&t.update(T,e.ELEMENT_ARRAY_BUFFER),(A||a)&&(a=!1,function(O,R,V,U){h();let Z=U.attributes,$=V.getAttributes(),D=R.defaultAttributeValues;for(let W in $){let j=$[W];if(j.location>=0){let z=Z[W];if(z===void 0&&(W==="instanceMatrix"&&O.instanceMatrix&&(z=O.instanceMatrix),W==="instanceColor"&&O.instanceColor&&(z=O.instanceColor)),z!==void 0){let{normalized:ae,itemSize:le}=z,Ee=t.get(z);if(Ee===void 0)continue;let{buffer:ve,type:q,bytesPerElement:pe}=Ee,Me=q===e.INT||q===e.UNSIGNED_INT||z.gpuType===Wa;if(z.isInterleavedBufferAttribute){let ce=z.data,Te=ce.stride,ie=z.offset;if(ce.isInstancedInterleavedBuffer){for(let be=0;be<j.locationSize;be++)u(j.location+be,ce.meshPerAttribute);O.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let be=0;be<j.locationSize;be++)d(j.location+be);e.bindBuffer(e.ARRAY_BUFFER,ve);for(let be=0;be<j.locationSize;be++)g(j.location+be,le/j.locationSize,q,ae,Te*pe,(ie+le/j.locationSize*be)*pe,Me)}else{if(z.isInstancedBufferAttribute){for(let ce=0;ce<j.locationSize;ce++)u(j.location+ce,z.meshPerAttribute);O.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let ce=0;ce<j.locationSize;ce++)d(j.location+ce);e.bindBuffer(e.ARRAY_BUFFER,ve);for(let ce=0;ce<j.locationSize;ce++)g(j.location+ce,le/j.locationSize,q,ae,le*pe,le/j.locationSize*ce*pe,Me)}}else if(D!==void 0){let ae=D[W];if(ae!==void 0)switch(ae.length){case 2:e.vertexAttrib2fv(j.location,ae);break;case 3:e.vertexAttrib3fv(j.location,ae);break;case 4:e.vertexAttrib4fv(j.location,ae);break;default:e.vertexAttrib1fv(j.location,ae)}}}}p()}(f,_,M,S),T!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(T).buffer))},reset:m,resetDefaultState:v,dispose:function(){m();for(let f in n){let _=n[f];for(let M in _){let S=_[M];for(let T in S){let A=S[T];for(let P in A)l(A[P].object),delete A[P];delete S[T]}}delete n[f]}},releaseStatesOfGeometry:function(f){if(n[f.id]===void 0)return;let _=n[f.id];for(let M in _){let S=_[M];for(let T in S){let A=S[T];for(let P in A)l(A[P].object),delete A[P];delete S[T]}}delete n[f.id]},releaseStatesOfObject:function(f){for(let _ in n){let M=n[_],S=f.isInstancedMesh===!0?f.id:0,T=M[S];if(T!==void 0){for(let A in T){let P=T[A];for(let O in P)l(P[O].object),delete P[O];delete T[A]}delete M[S],Object.keys(M).length===0&&delete n[_]}}},releaseStatesOfProgram:function(f){for(let _ in n){let M=n[_];for(let S in M){let T=M[S];if(T[f.id]===void 0)continue;let A=T[f.id];for(let P in A)l(A[P].object),delete A[P];delete T[f.id]}}},initAttributes:h,enableAttribute:d,disableUnusedAttributes:p}}function Hu(e,t,i){let n;this.setMode=function(r){n=r},this.render=function(r,s){e.drawArrays(n,r,s),i.update(s,n,1)},this.renderInstances=function(r,s,a){a!==0&&(e.drawArraysInstanced(n,r,s,a),i.update(s,n,a))},this.renderMultiDraw=function(r,s,a){if(a===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,r,0,s,0,a);let o=0;for(let l=0;l<a;l++)o+=s[l];i.update(o,n,1)}}function ku(e,t,i,n){let r;function s(h){if(h==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=i.precision!==void 0?i.precision:"highp",o=s(a);o!==a&&(Le("WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=i.logarithmicDepthBuffer===!0,c=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control");return i.reversedDepthBuffer===!0&&c===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){let h=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:s,textureFormatReadable:function(h){return h===di||n.convert(h)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){let d=h===ri&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(h!==ni&&n.convert(h)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&h!==wi&&!d)},precision:a,logarithmicDepthBuffer:l,reversedDepthBuffer:c,maxTextures:e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:e.getParameter(e.MAX_TEXTURE_SIZE),maxCubemapSize:e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:e.getParameter(e.MAX_VERTEX_ATTRIBS),maxVertexUniforms:e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:e.getParameter(e.MAX_VARYING_VECTORS),maxFragmentUniforms:e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:e.getParameter(e.MAX_SAMPLES),samples:e.getParameter(e.SAMPLES)}}function Wu(e){let t=this,i=null,n=0,r=!1,s=!1,a=new Ti,o=new Ge,l={value:null,needsUpdate:!1};function c(h,d,u,p){let g=h!==null?h.length:0,m=null;if(g!==0){if(m=l.value,p!==!0||m===null){let v=u+4*g,f=d.matrixWorldInverse;o.getNormalMatrix(f),(m===null||m.length<v)&&(m=new Float32Array(v));for(let _=0,M=u;_!==g;++_,M+=4)a.copy(h[_]).applyMatrix4(f,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let u=h.length!==0||d||n!==0||r;return r=d,n=h.length,u},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){i=c(h,d,0)},this.setState=function(h,d,u){let{clippingPlanes:p,clipIntersection:g,clipShadows:m}=h,v=e.get(h);if(!r||p===null||p.length===0||s&&!m)s?c(null):function(){l.value!==i&&(l.value=i,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}();else{let f=s?0:n,_=4*f,M=v.clippingState||null;l.value=M,M=c(p,d,_,u);for(let S=0;S!==_;++S)M[S]=i[S];v.clippingState=M,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=f}}}Vh.set(-1,0,0,0,1,0,0,0,1);var _h=[0.125,0.215,0.35,0.446,0.526,0.582],br=20,Tr=new Mr,vh=new Fe,hl=null,ul=0,dl=0,pl=!1,Xu=new w;class Cr{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=0.1,n=100,r={}){let{size:s=256,position:a=Xu}=r;hl=this._renderer.getRenderTarget(),ul=this._renderer.getActiveCubeFace(),dl=this._renderer.getActiveMipmapLevel(),pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);let o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,i,n,o,a),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(hl,ul,dl),this._renderer.xr.enabled=pl,e.scissorTest=!1,Yn(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gn||e.mapping===nn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hl=this._renderer.getRenderTarget(),ul=this._renderer.getActiveCubeFace(),dl=this._renderer.getActiveMipmapLevel(),pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:ri,format:di,colorSpace:Co,depthBuffer:!1},n=xh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xh(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=function(s){let a=[],o=[],l=[],c=s,h=s-4+1+_h.length;for(let d=0;d<h;d++){let u=Math.pow(2,c);a.push(u);let p=1/u;d>s-4?p=_h[d-s+4-1]:d===0&&(p=0),o.push(p);let g=1/(u-2),m=-g,v=1+g,f=[m,m,v,m,v,v,m,m,v,v,m,v],_=6,M=6,S=3,T=2,A=1,P=new Float32Array(S*M*_),O=new Float32Array(T*M*_),R=new Float32Array(A*M*_);for(let U=0;U<_;U++){let Z=U%3*2/3-1,$=U>2?0:-1,D=[Z,$,0,Z+0.6666666666666666,$,0,Z+0.6666666666666666,$+1,0,Z,$,0,Z+0.6666666666666666,$+1,0,Z,$+1,0];P.set(D,S*M*U),O.set(f,T*M*U);let W=[U,U,U,U,U,U];R.set(W,A*M*U)}let V=new nt;V.setAttribute("position",new Et(P,S)),V.setAttribute("uv",new Et(O,T)),V.setAttribute("faceIndex",new Et(R,A)),l.push(new St(V,null)),c>4&&c--}return{lodMeshes:l,sizeLods:a,sigmas:o}}(r)),this._blurMaterial=function(s,a,o){let l=new Float32Array(br),c=new w(0,1,0);return new Zt({name:"SphericalGaussianBlur",defines:{n:br,CUBEUV_TEXEL_WIDTH:1/a,CUBEUV_TEXEL_HEIGHT:1/o,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:l},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:c}},vertexShader:qs(),fragmentShader:`

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
		`,blending:ui,depthTest:!1,depthWrite:!1})}(r,e,t),this._ggxMaterial=function(s,a,o){return new Zt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/a,CUBEUV_TEXEL_HEIGHT:1/o,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}(r,e,t)}return n}_compileMaterial(e){let t=new St(new nt,e);this._renderer.compile(t,Tr)}_sceneToCubeUV(e,t,i,n,r){let s=new It(90,1,t,i),a=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,h=l.toneMapping;l.getClearColor(vh),l.toneMapping=ii,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(n),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new St(new Wt,new zi({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,u=d.material,p=!1,g=e.background;g?g.isColor&&(u.color.copy(g),e.background=null,p=!0):(u.color.copy(vh),p=!0);for(let m=0;m<6;m++){let v=m%3;v===0?(s.up.set(0,a[m],0),s.position.set(r.x,r.y,r.z),s.lookAt(r.x+o[m],r.y,r.z)):v===1?(s.up.set(0,0,a[m]),s.position.set(r.x,r.y,r.z),s.lookAt(r.x,r.y+o[m],r.z)):(s.up.set(0,a[m],0),s.position.set(r.x,r.y,r.z),s.lookAt(r.x,r.y,r.z+o[m]));let f=this._cubeSize;Yn(n,v*f,m>2?f:0,f,f),l.setRenderTarget(n),p&&l.render(d,s),l.render(e,s)}l.toneMapping=h,l.autoClear=c,e.background=g}_textureToCubeUV(e,t){let i=this._renderer,n=e.mapping===Gn||e.mapping===nn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yh());let r=n?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=r,r.uniforms.envMap.value=e;let a=this._cubeSize;Yn(t,0,0,3*a,2*a),i.setRenderTarget(t),i.render(s,Tr)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let n=this._renderer,r=this._pingPongRenderTarget,s=this._ggxMaterial,a=this._lodMeshes[i];a.material=s;let o=s.uniforms,l=i/(this._lodMeshes.length-1),c=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-c*c)*(0+1.25*l),{_lodMax:d}=this,u=this._sizeLods[i],p=3*u*(i>d-4?i-d+4:0),g=4*(this._cubeSize-u);o.envMap.value=e.texture,o.roughness.value=h,o.mipInt.value=d-t,Yn(r,p,g,3*u,2*u),n.setRenderTarget(r),n.render(a,Tr),o.envMap.value=r.texture,o.roughness.value=0,o.mipInt.value=d-i,Yn(e,p,g,3*u,2*u),n.setRenderTarget(e),n.render(a,Tr)}_blur(e,t,i,n,r){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,n,"latitudinal",r),this._halfBlur(s,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,s,a){let o=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&De("blur direction must be either latitudinal or longitudinal!");let c=this._lodMeshes[n];c.material=l;let h=l.uniforms,d=this._sizeLods[i]-1,u=isFinite(r)?Math.PI/(2*d):2*Math.PI/39,p=r/u,g=isFinite(r)?1+Math.floor(3*p):br;g>br&&Le(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to 20`);let m=[],v=0;for(let M=0;M<br;++M){let S=M/p,T=Math.exp(-S*S/2);m.push(T),M===0?v+=T:M<g&&(v+=2*T)}for(let M=0;M<m.length;M++)m[M]=m[M]/v;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=s==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:f}=this;h.dTheta.value=u,h.mipInt.value=f-i;let _=this._sizeLods[n];Yn(t,3*_*(n>f-4?n-f+4:0),4*(this._cubeSize-_),3*_,2*_),o.setRenderTarget(t),o.render(c,Tr)}}function xh(e,t,i){let n=new Yt(e,t,i);return n.texture.mapping=dr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Yn(e,t,i,n,r){e.viewport.set(t,i,n,r),e.scissor.set(t,i,n,r)}function yh(){return new Zt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qs(),fragmentShader:`

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
		`,blending:ui,depthTest:!1,depthWrite:!1})}function Mh(){return new Zt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function qs(){return`

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
	`}class Rr extends Yt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new As(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Wt(5,5,5),r=new Zt({name:"CubemapFromEquirect",uniforms:mn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Pt,blending:ui});r.uniforms.tEquirect.value=t;let s=new St(n,r),a=t.minFilter;return t.minFilter===rn&&(t.minFilter=Ot),new Sr(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){let r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,n);e.setRenderTarget(r)}}function ju(e){let t=new WeakMap,i=new WeakMap,n=null;function r(o,l){return l===os?o.mapping=Gn:l===ls&&(o.mapping=nn),o}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(o){let l=o.target;l.removeEventListener("dispose",a);let c=i.get(l);c!==void 0&&(i.delete(l),c.dispose())}return{get:function(o,l=!1){return o==null?null:l?function(c){if(c&&c.isTexture){let h=c.mapping,d=h===os||h===ls,u=h===Gn||h===nn;if(d||u){let p=i.get(c),g=p!==void 0?p.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==g)return n===null&&(n=new Cr(e)),p=d?n.fromEquirectangular(c,p):n.fromCubemap(c,p),p.texture.pmremVersion=c.pmremVersion,i.set(c,p),p.texture;if(p!==void 0)return p.texture;{let m=c.image;return d&&m&&m.height>0||u&&m&&function(v){let f=0,_=6;for(let M=0;M<_;M++)v[M]!==void 0&&f++;return f===_}(m)?(n===null&&(n=new Cr(e)),p=d?n.fromEquirectangular(c):n.fromCubemap(c),p.texture.pmremVersion=c.pmremVersion,i.set(c,p),c.addEventListener("dispose",a),p.texture):null}}}return c}(o):function(c){if(c&&c.isTexture){let h=c.mapping;if(h===os||h===ls){if(t.has(c))return r(t.get(c).texture,c.mapping);{let d=c.image;if(d&&d.height>0){let u=new Rr(d.height);return u.fromEquirectangularTexture(e,c),t.set(c,u),c.addEventListener("dispose",s),r(u.texture,c.mapping)}return null}}}return c}(o)},dispose:function(){t=new WeakMap,i=new WeakMap,n!==null&&(n.dispose(),n=null)}}}function qu(e){let t={};function i(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(n){return i(n)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(n){let r=i(n);return r===null&&Qi("WebGLRenderer: "+n+" extension not supported."),r}}}function Yu(e,t,i,n){let r={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&t.remove(c.index);for(let d in c.attributes)t.remove(c.attributes[d]);c.removeEventListener("dispose",a),delete r[c.id];let h=s.get(c);h&&(t.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,i.memory.geometries--}function o(l){let c=[],h=l.index,d=l.attributes.position,u=0;if(d===void 0)return;if(h!==null){let m=h.array;u=h.version;for(let v=0,f=m.length;v<f;v+=3){let _=m[v+0],M=m[v+1],S=m[v+2];c.push(_,M,M,S,S,_)}}else{let m=d.array;u=d.version;for(let v=0,f=m.length/3-1;v<f;v+=3){let _=v+0,M=v+1,S=v+2;c.push(_,M,M,S,S,_)}}let p=new(d.count>=65535?Ts:bs)(c,1);p.version=u;let g=s.get(l);g&&t.remove(g),s.set(l,p)}return{get:function(l,c){return r[c.id]===!0||(c.addEventListener("dispose",a),r[c.id]=!0,i.memory.geometries++),c},update:function(l){let c=l.attributes;for(let h in c)t.update(c[h],e.ARRAY_BUFFER)},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function Zu(e,t,i){let n,r,s;this.setMode=function(a){n=a},this.setIndex=function(a){r=a.type,s=a.bytesPerElement},this.render=function(a,o){e.drawElements(n,o,r,a*s),i.update(o,n,1)},this.renderInstances=function(a,o,l){l!==0&&(e.drawElementsInstanced(n,o,r,a*s,l),i.update(o,n,l))},this.renderMultiDraw=function(a,o,l){if(l===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,o,0,r,a,0,l);let c=0;for(let h=0;h<l;h++)c+=o[h];i.update(c,n,1)}}function Ju(e){let t={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:t,programs:null,autoReset:!0,reset:function(){t.calls=0,t.triangles=0,t.points=0,t.lines=0},update:function(i,n,r){switch(t.calls++,n){case e.TRIANGLES:t.triangles+=r*(i/3);break;case e.LINES:t.lines+=r*(i/2);break;case e.LINE_STRIP:t.lines+=r*(i-1);break;case e.LINE_LOOP:t.lines+=r*i;break;case e.POINTS:t.points+=r*i;break;default:De("WebGLInfo: Unknown draw mode:",n)}}}}function Ku(e,t,i){let n=new WeakMap,r=new et;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,d=n.get(a);if(d===void 0||d.count!==h){let O=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",O)};d!==void 0&&d.texture.dispose();let u=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],f=a.morphAttributes.color||[],_=0;u===!0&&(_=1),p===!0&&(_=2),g===!0&&(_=3);let M=a.attributes.position.count*_,S=1;M>t.maxTextureSize&&(S=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let T=new Float32Array(M*S*4*h),A=new Ms(T,M,S,h);A.type=wi,A.needsUpdate=!0;let P=4*_;for(let R=0;R<h;R++){let V=m[R],U=v[R],Z=f[R],$=M*S*4*R;for(let D=0;D<V.count;D++){let W=D*P;u===!0&&(r.fromBufferAttribute(V,D),T[$+W+0]=r.x,T[$+W+1]=r.y,T[$+W+2]=r.z,T[$+W+3]=0),p===!0&&(r.fromBufferAttribute(U,D),T[$+W+4]=r.x,T[$+W+5]=r.y,T[$+W+6]=r.z,T[$+W+7]=0),g===!0&&(r.fromBufferAttribute(Z,D),T[$+W+8]=r.x,T[$+W+9]=r.y,T[$+W+10]=r.z,T[$+W+11]=Z.itemSize===4?r.w:1)}}d={count:h,texture:A,size:new ne(M,S)},n.set(a,d),a.addEventListener("dispose",O)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(e,"morphTexture",s.morphTexture,i);else{let u=0;for(let g=0;g<l.length;g++)u+=l[g];let p=a.morphTargetsRelative?1:1-u;o.getUniforms().setValue(e,"morphTargetBaseInfluence",p),o.getUniforms().setValue(e,"morphTargetInfluences",l)}o.getUniforms().setValue(e,"morphTargetsTexture",d.texture,i),o.getUniforms().setValue(e,"morphTargetsTextureSize",d.size)}}}function $u(e,t,i,n,r){let s=new WeakMap;function a(o){let l=o.target;l.removeEventListener("dispose",a),n.releaseStatesOfObject(l),i.remove(l.instanceMatrix),l.instanceColor!==null&&i.remove(l.instanceColor)}return{update:function(o){let l=r.render.frame,c=o.geometry,h=t.get(o,c);if(s.get(h)!==l&&(t.update(h),s.set(h,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),s.get(o)!==l&&(i.update(o.instanceMatrix,e.ARRAY_BUFFER),o.instanceColor!==null&&i.update(o.instanceColor,e.ARRAY_BUFFER),s.set(o,l))),o.isSkinnedMesh){let d=o.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h},dispose:function(){s=new WeakMap}}}var Qu={[Ba]:"LINEAR_TONE_MAPPING",[za]:"REINHARD_TONE_MAPPING",[Va]:"CINEON_TONE_MAPPING",[ur]:"ACES_FILMIC_TONE_MAPPING",[Ha]:"AGX_TONE_MAPPING",[ka]:"NEUTRAL_TONE_MAPPING",[Ga]:"CUSTOM_TONE_MAPPING"};function ed(e,t,i,n,r,s){let a=new Yt(t,i,{type:e,depthBuffer:r,stencilBuffer:s,samples:n?4:0,depthTexture:r?new Vi(t,i):void 0}),o=new Yt(t,i,{type:ri,depthBuffer:!1,stencilBuffer:!1}),l=new nt;l.setAttribute("position",new Ue([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ue([0,2,0,0,2,0],2));let c=new jo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new St(l,c),d=new Mr(-1,1,1,-1,0,1),u,p=null,g=null,m=!1,v=null,f=[],_=!1;this.setSize=function(M,S){a.setSize(M,S),o.setSize(M,S);for(let T=0;T<f.length;T++){let A=f[T];A.setSize&&A.setSize(M,S)}},this.setEffects=function(M){f=M,_=f.length>0&&f[0].isRenderPass===!0;let{width:S,height:T}=a;for(let A=0;A<f.length;A++){let P=f[A];P.setSize&&P.setSize(S,T)}},this.begin=function(M,S){if(m)return!1;if(M.toneMapping===ii&&f.length===0)return!1;if(v=S,S!==null){let{width:T,height:A}=S;a.width===T&&a.height===A||this.setSize(T,A)}return _===!1&&M.setRenderTarget(a),u=M.toneMapping,M.toneMapping=ii,!0},this.hasRenderPass=function(){return _},this.end=function(M,S){M.toneMapping=u,m=!0;let T=a,A=o;for(let P=0;P<f.length;P++){let O=f[P];if(O.enabled!==!1&&(O.render(M,A,T,S),O.needsSwap!==!1)){let R=T;T=A,A=R}}if(p!==M.outputColorSpace||g!==M.toneMapping){p=M.outputColorSpace,g=M.toneMapping,c.defines={},qe.getTransfer(p)===tt&&(c.defines.SRGB_TRANSFER="");let P=Qu[g];P&&(c.defines[P]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,M.setRenderTarget(v),M.render(h,d),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}var Gh=new Tt,gl=new Vi(1,1),Hh=new Ms,kh=new Uo,Wh=new As,Sh=[],bh=[],Th=new Float32Array(16),Eh=new Float32Array(9),Ah=new Float32Array(4);function Zn(e,t,i){let n=e[0];if(n<=0||n>0)return e;let r=t*i,s=Sh[r];if(s===void 0&&(s=new Float32Array(r),Sh[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=i,e[a].toArray(s,o)}return s}function vt(e,t){if(e.length!==t.length)return!1;for(let i=0,n=e.length;i<n;i++)if(e[i]!==t[i])return!1;return!0}function xt(e,t){for(let i=0,n=t.length;i<n;i++)e[i]=t[i]}function Ys(e,t){let i=bh[t];i===void 0&&(i=new Int32Array(t),bh[t]=i);for(let n=0;n!==t;++n)i[n]=e.allocateTextureUnit();return i}function td(e,t){let i=this.cache;i[0]!==t&&(e.uniform1f(this.addr,t),i[0]=t)}function id(e,t){let i=this.cache;if(t.x!==void 0)i[0]===t.x&&i[1]===t.y||(e.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(vt(i,t))return;e.uniform2fv(this.addr,t),xt(i,t)}}function nd(e,t){let i=this.cache;if(t.x!==void 0)i[0]===t.x&&i[1]===t.y&&i[2]===t.z||(e.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)i[0]===t.r&&i[1]===t.g&&i[2]===t.b||(e.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(vt(i,t))return;e.uniform3fv(this.addr,t),xt(i,t)}}function rd(e,t){let i=this.cache;if(t.x!==void 0)i[0]===t.x&&i[1]===t.y&&i[2]===t.z&&i[3]===t.w||(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(vt(i,t))return;e.uniform4fv(this.addr,t),xt(i,t)}}function sd(e,t){let i=this.cache,n=t.elements;if(n===void 0){if(vt(i,t))return;e.uniformMatrix2fv(this.addr,!1,t),xt(i,t)}else{if(vt(i,n))return;Ah.set(n),e.uniformMatrix2fv(this.addr,!1,Ah),xt(i,n)}}function ad(e,t){let i=this.cache,n=t.elements;if(n===void 0){if(vt(i,t))return;e.uniformMatrix3fv(this.addr,!1,t),xt(i,t)}else{if(vt(i,n))return;Eh.set(n),e.uniformMatrix3fv(this.addr,!1,Eh),xt(i,n)}}function od(e,t){let i=this.cache,n=t.elements;if(n===void 0){if(vt(i,t))return;e.uniformMatrix4fv(this.addr,!1,t),xt(i,t)}else{if(vt(i,n))return;Th.set(n),e.uniformMatrix4fv(this.addr,!1,Th),xt(i,n)}}function ld(e,t){let i=this.cache;i[0]!==t&&(e.uniform1i(this.addr,t),i[0]=t)}function cd(e,t){let i=this.cache;if(t.x!==void 0)i[0]===t.x&&i[1]===t.y||(e.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(vt(i,t))return;e.uniform2iv(this.addr,t),xt(i,t)}}function hd(e,t){let i=this.cache;if(t.x!==void 0)i[0]===t.x&&i[1]===t.y&&i[2]===t.z||(e.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(vt(i,t))return;e.uniform3iv(this.addr,t),xt(i,t)}}function ud(e,t){let i=this.cache;if(t.x!==void 0)i[0]===t.x&&i[1]===t.y&&i[2]===t.z&&i[3]===t.w||(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(vt(i,t))return;e.uniform4iv(this.addr,t),xt(i,t)}}function dd(e,t){let i=this.cache;i[0]!==t&&(e.uniform1ui(this.addr,t),i[0]=t)}function pd(e,t){let i=this.cache;if(t.x!==void 0)i[0]===t.x&&i[1]===t.y||(e.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(vt(i,t))return;e.uniform2uiv(this.addr,t),xt(i,t)}}function md(e,t){let i=this.cache;if(t.x!==void 0)i[0]===t.x&&i[1]===t.y&&i[2]===t.z||(e.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(vt(i,t))return;e.uniform3uiv(this.addr,t),xt(i,t)}}function fd(e,t){let i=this.cache;if(t.x!==void 0)i[0]===t.x&&i[1]===t.y&&i[2]===t.z&&i[3]===t.w||(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(vt(i,t))return;e.uniform4uiv(this.addr,t),xt(i,t)}}function gd(e,t,i){let n=this.cache,r=i.allocateTextureUnit(),s;n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r),this.type===e.SAMPLER_2D_SHADOW?(gl.compareFunction=i.isReversedDepthBuffer()?ys:xs,s=gl):s=Gh,i.setTexture2D(t||s,r)}function _d(e,t,i){let n=this.cache,r=i.allocateTextureUnit();n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r),i.setTexture3D(t||kh,r)}function vd(e,t,i){let n=this.cache,r=i.allocateTextureUnit();n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r),i.setTextureCube(t||Wh,r)}function xd(e,t,i){let n=this.cache,r=i.allocateTextureUnit();n[0]!==r&&(e.uniform1i(this.addr,r),n[0]=r),i.setTexture2DArray(t||Hh,r)}function yd(e,t){e.uniform1fv(this.addr,t)}function Md(e,t){let i=Zn(t,this.size,2);e.uniform2fv(this.addr,i)}function Sd(e,t){let i=Zn(t,this.size,3);e.uniform3fv(this.addr,i)}function bd(e,t){let i=Zn(t,this.size,4);e.uniform4fv(this.addr,i)}function Td(e,t){let i=Zn(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,i)}function Ed(e,t){let i=Zn(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,i)}function Ad(e,t){let i=Zn(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,i)}function wd(e,t){e.uniform1iv(this.addr,t)}function Cd(e,t){e.uniform2iv(this.addr,t)}function Rd(e,t){e.uniform3iv(this.addr,t)}function Id(e,t){e.uniform4iv(this.addr,t)}function Pd(e,t){e.uniform1uiv(this.addr,t)}function Ld(e,t){e.uniform2uiv(this.addr,t)}function Dd(e,t){e.uniform3uiv(this.addr,t)}function Nd(e,t){e.uniform4uiv(this.addr,t)}function Ud(e,t,i){let n=this.cache,r=t.length,s=Ys(i,r),a;vt(n,s)||(e.uniform1iv(this.addr,s),xt(n,s)),a=this.type===e.SAMPLER_2D_SHADOW?gl:Gh;for(let o=0;o!==r;++o)i.setTexture2D(t[o]||a,s[o])}function Fd(e,t,i){let n=this.cache,r=t.length,s=Ys(i,r);vt(n,s)||(e.uniform1iv(this.addr,s),xt(n,s));for(let a=0;a!==r;++a)i.setTexture3D(t[a]||kh,s[a])}function Od(e,t,i){let n=this.cache,r=t.length,s=Ys(i,r);vt(n,s)||(e.uniform1iv(this.addr,s),xt(n,s));for(let a=0;a!==r;++a)i.setTextureCube(t[a]||Wh,s[a])}function Bd(e,t,i){let n=this.cache,r=t.length,s=Ys(i,r);vt(n,s)||(e.uniform1iv(this.addr,s),xt(n,s));for(let a=0;a!==r;++a)i.setTexture2DArray(t[a]||Hh,s[a])}class Xh{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=function(n){switch(n){case 5126:return td;case 35664:return id;case 35665:return nd;case 35666:return rd;case 35674:return sd;case 35675:return ad;case 35676:return od;case 5124:case 35670:return ld;case 35667:case 35671:return cd;case 35668:case 35672:return hd;case 35669:case 35673:return ud;case 5125:return dd;case 36294:return pd;case 36295:return md;case 36296:return fd;case 35678:case 36198:case 36298:case 36306:case 35682:return gd;case 35679:case 36299:case 36307:return _d;case 35680:case 36300:case 36308:case 36293:return vd;case 36289:case 36303:case 36311:case 36292:return xd}}(t.type)}}class jh{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=function(n){switch(n){case 5126:return yd;case 35664:return Md;case 35665:return Sd;case 35666:return bd;case 35674:return Td;case 35675:return Ed;case 35676:return Ad;case 5124:case 35670:return wd;case 35667:case 35671:return Cd;case 35668:case 35672:return Rd;case 35669:case 35673:return Id;case 5125:return Pd;case 36294:return Ld;case 36295:return Dd;case 36296:return Nd;case 35678:case 36198:case 36298:case 36306:case 35682:return Ud;case 35679:case 36299:case 36307:return Fd;case 35680:case 36300:case 36308:case 36293:return Od;case 36289:case 36303:case 36311:case 36292:return Bd}}(t.type)}}class qh{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let n=this.seq;for(let r=0,s=n.length;r!==s;++r){let a=n[r];a.setValue(e,t[a.id],i)}}}var ml=/(\w+)(\])?(\[|\.)?/g;function wh(e,t){e.seq.push(t),e.map[t.id]=t}function zd(e,t,i){let n=e.name,r=n.length;for(ml.lastIndex=0;;){let s=ml.exec(n),a=ml.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===r){wh(i,c===void 0?new Xh(o,e,t):new jh(o,e,t));break}{let h=i.map[o];h===void 0&&(h=new qh(o),wh(i,h)),i=h}}}class wr{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let a=e.getActiveUniform(t,s);zd(a,e.getUniformLocation(t,a.name),this)}let n=[],r=[];for(let s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(s):r.push(s);n.length>0&&(this.seq=n.concat(r))}setValue(e,t,i,n){let r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){let n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,s=t.length;r!==s;++r){let a=t[r],o=i[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,n)}}static seqWithValue(e,t){let i=[];for(let n=0,r=e.length;n!==r;++n){let s=e[n];s.id in t&&i.push(s)}return i}}function Ch(e,t,i){let n=e.createShader(t);return e.shaderSource(n,i),e.compileShader(n),n}var Vd=0,Rh=new Ge;function Ih(e,t,i){let n=e.getShaderParameter(t,e.COMPILE_STATUS),r=(e.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let s=/ERROR: 0:(\d+)/.exec(r);if(s){let a=parseInt(s[1]);return i.toUpperCase()+`

`+r+`

`+function(o,l){let c=o.split(`
`),h=[],d=Math.max(l-6,0),u=Math.min(l+6,c.length);for(let p=d;p<u;p++){let g=p+1;h.push(`${g===l?">":" "} ${g}: ${c[p]}`)}return h.join(`
`)}(e.getShaderSource(t),a)}return r}function Gd(e,t){let i=function(n){qe._getMatrix(Rh,qe.workingColorSpace,n);let r=`mat3( ${Rh.elements.map((s)=>s.toFixed(4))} )`;switch(qe.getTransfer(n)){case Ro:return[r,"LinearTransferOETF"];case tt:return[r,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",n),[r,"LinearTransferOETF"]}}(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}var Hd={[Ba]:"Linear",[za]:"Reinhard",[Va]:"Cineon",[ur]:"ACESFilmic",[Ha]:"AgX",[ka]:"Neutral",[Ga]:"Custom"};function kd(e,t){let i=Hd[t];return i===void 0?(Le("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}var js=new w;function Wd(){return qe.getLuminanceCoefficients(js),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${js.x.toFixed(4)}, ${js.y.toFixed(4)}, ${js.z.toFixed(4)} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function Er(e){return e!==""}function Ph(e,t){let i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Lh(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Xd=/^[ \t]*#include +<([\w\d./]+)>/gm;function _l(e){return e.replace(Xd,qd)}var jd=new Map;function qd(e,t){let i=We[t];if(i===void 0){let n=jd.get(t);if(n===void 0)throw Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");i=We[n],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n)}return _l(i)}var Yd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dh(e){return e.replace(Yd,Zd)}function Zd(e,t,i,n){let r="";for(let s=parseInt(t);s<parseInt(i);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Nh(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Jd={[tn]:"SHADOWMAP_TYPE_PCF",[Bn]:"SHADOWMAP_TYPE_VSM"},Kd={[Gn]:"ENVMAP_TYPE_CUBE",[nn]:"ENVMAP_TYPE_CUBE",[dr]:"ENVMAP_TYPE_CUBE_UV"},$d={[nn]:"ENVMAP_MODE_REFRACTION"},Qd={[Bc]:"ENVMAP_BLENDING_MULTIPLY",[zc]:"ENVMAP_BLENDING_MIX",[Vc]:"ENVMAP_BLENDING_ADD"};function ep(e,t,i,n){let r=e.getContext(),s=i.defines,a=i.vertexShader,o=i.fragmentShader,l=function(U){return Jd[U.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}(i),c=function(U){return U.envMap===!1?"ENVMAP_TYPE_CUBE":Kd[U.envMapMode]||"ENVMAP_TYPE_CUBE"}(i),h=function(U){return U.envMap===!1?"ENVMAP_MODE_REFLECTION":$d[U.envMapMode]||"ENVMAP_MODE_REFLECTION"}(i),d=function(U){return U.envMap===!1?"ENVMAP_BLENDING_NONE":Qd[U.combine]||"ENVMAP_BLENDING_NONE"}(i),u=function(U){let Z=U.envMapCubeUVHeight;if(Z===null)return null;let $=Math.log2(Z)-2,D=1/Z;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:D,maxMip:$}}(i),p=function(U){return[U.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",U.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}(i),g=function(U){let Z=[];for(let $ in U){let D=U[$];D!==!1&&Z.push("#define "+$+" "+D)}return Z.join(`
`)}(s),m=r.createProgram(),v,f,_=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(v=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g].filter(Er).join(`
`),v.length>0&&(v+=`
`),f=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g].filter(Er).join(`
`),f.length>0&&(f+=`
`)):(v=[Nh(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+h:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+l:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),f=[Nh(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,g,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+c:"",i.envMap?"#define "+h:"",i.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+l:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==ii?"#define TONE_MAPPING":"",i.toneMapping!==ii?We.tonemapping_pars_fragment:"",i.toneMapping!==ii?kd("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,Gd("linearToOutputTexel",i.outputColorSpace),Wd(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Er).join(`
`)),a=_l(a),a=Ph(a,i),a=Lh(a,i),o=_l(o),o=Ph(o,i),o=Lh(o,i),a=Dh(a),o=Dh(o),i.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,v=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,f=["#define varying in",i.glslVersion===Io?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Io?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let M=_+v+a,S=_+f+o,T=Ch(r,r.VERTEX_SHADER,M),A=Ch(r,r.FRAGMENT_SHADER,S);function P(U){if(e.debug.checkShaderErrors){let Z=r.getProgramInfoLog(m)||"",$=r.getShaderInfoLog(T)||"",D=r.getShaderInfoLog(A)||"",W=Z.trim(),j=$.trim(),z=D.trim(),ae=!0,le=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(ae=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,m,T,A);else{let Ee=Ih(r,T,"vertex"),ve=Ih(r,A,"fragment");De("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+W+`
`+Ee+`
`+ve)}else W!==""?Le("WebGLProgram: Program Info Log:",W):j!==""&&z!==""||(le=!1);le&&(U.diagnostics={runnable:ae,programLog:W,vertexShader:{log:j,prefix:v},fragmentShader:{log:z,prefix:f}})}r.deleteShader(T),r.deleteShader(A),O=new wr(r,m),R=function(Z,$){let D={},W=Z.getProgramParameter($,Z.ACTIVE_ATTRIBUTES);for(let j=0;j<W;j++){let z=Z.getActiveAttrib($,j),ae=z.name,le=1;z.type===Z.FLOAT_MAT2&&(le=2),z.type===Z.FLOAT_MAT3&&(le=3),z.type===Z.FLOAT_MAT4&&(le=4),D[ae]={type:z.type,location:Z.getAttribLocation($,ae),locationSize:le}}return D}(r,m)}let O,R;r.attachShader(m,T),r.attachShader(m,A),i.index0AttributeName!==void 0?r.bindAttribLocation(m,0,i.index0AttributeName):i.hasPositionAttribute===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m),this.getUniforms=function(){return O===void 0&&P(this),O},this.getAttributes=function(){return R===void 0&&P(this),R};let V=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=r.getProgramParameter(m,37297)),V},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=Vd++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=A,this}var tp=0;class Yh{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let n=this._getShaderCacheForMaterial(e);return n.has(t)===!1&&(n.add(t),t.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Zh(e),t.set(e,i)),i}}class Zh{constructor(e){this.id=tp++,this.code=e,this.usedTimes=0}}function ip(e,t,i,n,r,s){let a=new Ss,o=new Yh,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(m){return l.add(m),m===0?"uv":`uv${m}`}return{getParameters:function(m,v,f,_,M,S){let T=_.fog,A=M.geometry,P=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?_.environment:null,O=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,R=t.get(m.envMap||P,O),V=R&&R.mapping===dr?R.image.height:null,U=p[m.type];m.precision!==null&&(u=n.getMaxPrecision(m.precision),u!==m.precision&&Le("WebGLProgram.getParameters:",m.precision,"not supported, using",u,"instead."));let Z=A.morphAttributes.position||A.morphAttributes.normal||A.morphAttributes.color,$=Z!==void 0?Z.length:0,D,W,j,z,ae=0;if(A.morphAttributes.position!==void 0&&(ae=1),A.morphAttributes.normal!==void 0&&(ae=2),A.morphAttributes.color!==void 0&&(ae=3),U){let Nt=gi[U];D=Nt.vertexShader,W=Nt.fragmentShader}else{D=m.vertexShader,W=m.fragmentShader;let Nt=o.getVertexShaderStage(m),yt=o.getFragmentShaderStage(m);o.update(m,Nt,yt),j=Nt.id,z=yt.id}let le=e.getRenderTarget(),Ee=e.state.buffers.depth.getReversed(),ve=M.isInstancedMesh===!0,q=M.isBatchedMesh===!0,pe=!!m.map,Me=!!m.matcap,ce=!!R,Te=!!m.aoMap,ie=!!m.lightMap,be=!!m.bumpMap&&m.wireframe===!1,C=!!m.normalMap,x=!!m.displacementMap,I=!!m.emissiveMap,F=!!m.metalnessMap,y=!!m.roughnessMap,L=m.anisotropy>0,N=m.clearcoat>0,E=m.dispersion>0,H=m.iridescence>0,k=m.sheen>0,J=m.transmission>0,ue=L&&!!m.anisotropyMap,Ie=N&&!!m.clearcoatMap,oe=N&&!!m.clearcoatNormalMap,we=N&&!!m.clearcoatRoughnessMap,se=H&&!!m.iridescenceMap,Pe=H&&!!m.iridescenceThicknessMap,ee=k&&!!m.sheenColorMap,de=k&&!!m.sheenRoughnessMap,ke=!!m.specularMap,it=!!m.specularColorMap,X=!!m.specularIntensityMap,re=J&&!!m.transmissionMap,ge=J&&!!m.thicknessMap,Q=!!m.gradientMap,fe=!!m.alphaMap,he=m.alphaTest>0,Se=!!m.alphaHash,ye=!!m.extensions,Ce=ii;m.toneMapped&&(le!==null&&le.isXRRenderTarget!==!0||(Ce=e.toneMapping));let Ye={shaderID:U,shaderType:m.type,shaderName:m.name,vertexShader:D,fragmentShader:W,defines:m.defines,customVertexShaderID:j,customFragmentShaderID:z,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:u,batching:q,batchingColor:q&&M._colorsTexture!==null,instancing:ve,instancingColor:ve&&M.instanceColor!==null,instancingMorph:ve&&M.morphTexture!==null,outputColorSpace:le===null?e.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:qe.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:pe,matcap:Me,envMap:ce,envMapMode:ce&&R.mapping,envMapCubeUVHeight:V,aoMap:Te,lightMap:ie,bumpMap:be,normalMap:C,displacementMap:x,emissiveMap:I,normalMapObjectSpace:C&&m.normalMapType===Jc,normalMapTangentSpace:C&&m.normalMapType===wo,packedNormalMap:C&&m.normalMapType===wo&&(pt=m.normalMap.format,pt===on||pt===gs||pt===_s),metalnessMap:F,roughnessMap:y,anisotropy:L,anisotropyMap:ue,clearcoat:N,clearcoatMap:Ie,clearcoatNormalMap:oe,clearcoatRoughnessMap:we,dispersion:E,iridescence:H,iridescenceMap:se,iridescenceThicknessMap:Pe,sheen:k,sheenColorMap:ee,sheenRoughnessMap:de,specularMap:ke,specularColorMap:it,specularIntensityMap:X,transmission:J,transmissionMap:re,thicknessMap:ge,gradientMap:Q,opaque:m.transparent===!1&&m.blending===hr&&m.alphaToCoverage===!1,alphaMap:fe,alphaTest:he,alphaHash:Se,combine:m.combine,mapUv:pe&&g(m.map.channel),aoMapUv:Te&&g(m.aoMap.channel),lightMapUv:ie&&g(m.lightMap.channel),bumpMapUv:be&&g(m.bumpMap.channel),normalMapUv:C&&g(m.normalMap.channel),displacementMapUv:x&&g(m.displacementMap.channel),emissiveMapUv:I&&g(m.emissiveMap.channel),metalnessMapUv:F&&g(m.metalnessMap.channel),roughnessMapUv:y&&g(m.roughnessMap.channel),anisotropyMapUv:ue&&g(m.anisotropyMap.channel),clearcoatMapUv:Ie&&g(m.clearcoatMap.channel),clearcoatNormalMapUv:oe&&g(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&g(m.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&g(m.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&g(m.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&g(m.sheenColorMap.channel),sheenRoughnessMapUv:de&&g(m.sheenRoughnessMap.channel),specularMapUv:ke&&g(m.specularMap.channel),specularColorMapUv:it&&g(m.specularColorMap.channel),specularIntensityMapUv:X&&g(m.specularIntensityMap.channel),transmissionMapUv:re&&g(m.transmissionMap.channel),thicknessMapUv:ge&&g(m.thicknessMap.channel),alphaMapUv:fe&&g(m.alphaMap.channel),vertexTangents:!!A.attributes.tangent&&(C||L),vertexNormals:!!A.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!A.attributes.color&&A.attributes.color.itemSize===4,pointsUvs:M.isPoints===!0&&!!A.attributes.uv&&(pe||fe),fog:!!T,useFog:m.fog===!0,fogExp2:!!T&&T.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||A.attributes.normal===void 0&&C===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ee,skinning:M.isSkinnedMesh===!0,hasPositionAttribute:A.attributes.position!==void 0,morphTargets:A.morphAttributes.position!==void 0,morphNormals:A.morphAttributes.normal!==void 0,morphColors:A.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:ae,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:S.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:m.dithering,shadowMapEnabled:e.shadowMap.enabled&&f.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ce,decodeVideoTexture:pe&&m.map.isVideoTexture===!0&&qe.getTransfer(m.map.colorSpace)===tt,decodeVideoTextureEmissive:I&&m.emissiveMap.isVideoTexture===!0&&qe.getTransfer(m.emissiveMap.colorSpace)===tt,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===Ft,flipSided:m.side===Pt,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:ye&&m.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&m.extensions.multiDraw===!0||q)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};var pt;return Ye.vertexUv1s=l.has(1),Ye.vertexUv2s=l.has(2),Ye.vertexUv3s=l.has(3),l.clear(),Ye},getProgramCacheKey:function(m){let v=[];if(m.shaderID?v.push(m.shaderID):(v.push(m.customVertexShaderID),v.push(m.customFragmentShaderID)),m.defines!==void 0)for(let f in m.defines)v.push(f),v.push(m.defines[f]);return m.isRawShaderMaterial===!1&&(function(f,_){f.push(_.precision),f.push(_.outputColorSpace),f.push(_.envMapMode),f.push(_.envMapCubeUVHeight),f.push(_.mapUv),f.push(_.alphaMapUv),f.push(_.lightMapUv),f.push(_.aoMapUv),f.push(_.bumpMapUv),f.push(_.normalMapUv),f.push(_.displacementMapUv),f.push(_.emissiveMapUv),f.push(_.metalnessMapUv),f.push(_.roughnessMapUv),f.push(_.anisotropyMapUv),f.push(_.clearcoatMapUv),f.push(_.clearcoatNormalMapUv),f.push(_.clearcoatRoughnessMapUv),f.push(_.iridescenceMapUv),f.push(_.iridescenceThicknessMapUv),f.push(_.sheenColorMapUv),f.push(_.sheenRoughnessMapUv),f.push(_.specularMapUv),f.push(_.specularColorMapUv),f.push(_.specularIntensityMapUv),f.push(_.transmissionMapUv),f.push(_.thicknessMapUv),f.push(_.combine),f.push(_.fogExp2),f.push(_.sizeAttenuation),f.push(_.morphTargetsCount),f.push(_.morphAttributeCount),f.push(_.numDirLights),f.push(_.numPointLights),f.push(_.numSpotLights),f.push(_.numSpotLightMaps),f.push(_.numHemiLights),f.push(_.numRectAreaLights),f.push(_.numDirLightShadows),f.push(_.numPointLightShadows),f.push(_.numSpotLightShadows),f.push(_.numSpotLightShadowsWithMaps),f.push(_.numLightProbes),f.push(_.shadowMapType),f.push(_.toneMapping),f.push(_.numClippingPlanes),f.push(_.numClipIntersection),f.push(_.depthPacking)}(v,m),function(f,_){a.disableAll(),_.instancing&&a.enable(0),_.instancingColor&&a.enable(1),_.instancingMorph&&a.enable(2),_.matcap&&a.enable(3),_.envMap&&a.enable(4),_.normalMapObjectSpace&&a.enable(5),_.normalMapTangentSpace&&a.enable(6),_.clearcoat&&a.enable(7),_.iridescence&&a.enable(8),_.alphaTest&&a.enable(9),_.vertexColors&&a.enable(10),_.vertexAlphas&&a.enable(11),_.vertexUv1s&&a.enable(12),_.vertexUv2s&&a.enable(13),_.vertexUv3s&&a.enable(14),_.vertexTangents&&a.enable(15),_.anisotropy&&a.enable(16),_.alphaHash&&a.enable(17),_.batching&&a.enable(18),_.dispersion&&a.enable(19),_.batchingColor&&a.enable(20),_.gradientMap&&a.enable(21),_.packedNormalMap&&a.enable(22),_.vertexNormals&&a.enable(23),f.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reversedDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),_.numLightProbeGrids>0&&a.enable(22),_.hasPositionAttribute&&a.enable(23),f.push(a.mask)}(v,m),v.push(e.outputColorSpace)),v.push(m.customProgramCacheKey),v.join()},getUniforms:function(m){let v=p[m.type],f;if(v){let _=gi[v];f=ph.clone(_.uniforms)}else f=m.uniforms;return f},acquireProgram:function(m,v){let f=h.get(v);return f!==void 0?++f.usedTimes:(f=new ep(e,v,m,r),c.push(f),h.set(v,f)),f},releaseProgram:function(m){if(--m.usedTimes===0){let v=c.indexOf(m);c[v]=c[c.length-1],c.pop(),h.delete(m.cacheKey),m.destroy()}},releaseShaderCache:function(m){o.remove(m)},programs:c,dispose:function(){o.dispose()}}}function np(){let e=new WeakMap;return{has:function(t){return e.has(t)},get:function(t){let i=e.get(t);return i===void 0&&(i={},e.set(t,i)),i},remove:function(t){e.delete(t)},update:function(t,i,n){e.get(t)[i]=n},dispose:function(){e=new WeakMap}}}function rp(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Uh(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Fh(){let e=[],t=0,i=[],n=[],r=[];function s(o){let l=0;return o.isInstancedMesh&&(l+=2),o.isSkinnedMesh&&(l+=1),l}function a(o,l,c,h,d,u){let p=e[t];return p===void 0?(p={id:o.id,object:o,geometry:l,material:c,materialVariant:s(o),groupOrder:h,renderOrder:o.renderOrder,z:d,group:u},e[t]=p):(p.id=o.id,p.object=o,p.geometry=l,p.material=c,p.materialVariant=s(o),p.groupOrder=h,p.renderOrder=o.renderOrder,p.z=d,p.group=u),t++,p}return{opaque:i,transmissive:n,transparent:r,init:function(){t=0,i.length=0,n.length=0,r.length=0},push:function(o,l,c,h,d,u){let p=a(o,l,c,h,d,u);c.transmission>0?n.push(p):c.transparent===!0?r.push(p):i.push(p)},unshift:function(o,l,c,h,d,u){let p=a(o,l,c,h,d,u);c.transmission>0?n.unshift(p):c.transparent===!0?r.unshift(p):i.unshift(p)},finish:function(){for(let o=t,l=e.length;o<l;o++){let c=e[o];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(o,l,c){i.length>1&&i.sort(o||rp),n.length>1&&n.sort(l||Uh),r.length>1&&r.sort(l||Uh),c&&(i.reverse(),n.reverse(),r.reverse())}}}function sp(){let e=new WeakMap;return{get:function(t,i){let n=e.get(t),r;return n===void 0?(r=new Fh,e.set(t,[r])):i>=n.length?(r=new Fh,n.push(r)):r=n[i],r},dispose:function(){e=new WeakMap}}}function ap(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new w,color:new Fe};break;case"SpotLight":i={position:new w,direction:new w,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new w,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":i={direction:new w,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":i={color:new Fe,position:new w,halfWidth:new w,halfHeight:new w}}return e[t.id]=i,i}}}var op=0;function lp(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function cp(e){let t=new ap,i=function(){let o={};return{get:function(l){if(o[l.id]!==void 0)return o[l.id];let c;switch(l.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1000}}return o[l.id]=c,c}}}(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new w);let r=new w,s=new ze,a=new ze;return{setup:function(o){let l=0,c=0,h=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let d=0,u=0,p=0,g=0,m=0,v=0,f=0,_=0,M=0,S=0,T=0;o.sort(lp);for(let P=0,O=o.length;P<O;P++){let R=o[P],V=R.color,U=R.intensity,Z=R.distance,$=null;if(R.shadow&&R.shadow.map&&($=R.shadow.map.texture.format===on?R.shadow.map.texture:R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)l+=V.r*U,c+=V.g*U,h+=V.b*U;else if(R.isLightProbe){for(let D=0;D<9;D++)n.probe[D].addScaledVector(R.sh.coefficients[D],U);T++}else if(R.isDirectionalLight){let D=t.get(R);if(D.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let W=R.shadow,j=i.get(R);j.shadowIntensity=W.intensity,j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,n.directionalShadow[d]=j,n.directionalShadowMap[d]=$,n.directionalShadowMatrix[d]=R.shadow.matrix,v++}n.directional[d]=D,d++}else if(R.isSpotLight){let D=t.get(R);D.position.setFromMatrixPosition(R.matrixWorld),D.color.copy(V).multiplyScalar(U),D.distance=Z,D.coneCos=Math.cos(R.angle),D.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),D.decay=R.decay,n.spot[p]=D;let W=R.shadow;if(R.map&&(n.spotLightMap[M]=R.map,M++,W.updateMatrices(R),R.castShadow&&S++),n.spotLightMatrix[p]=W.matrix,R.castShadow){let j=i.get(R);j.shadowIntensity=W.intensity,j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,n.spotShadow[p]=j,n.spotShadowMap[p]=$,_++}p++}else if(R.isRectAreaLight){let D=t.get(R);D.color.copy(V).multiplyScalar(U),D.halfWidth.set(0.5*R.width,0,0),D.halfHeight.set(0,0.5*R.height,0),n.rectArea[g]=D,g++}else if(R.isPointLight){let D=t.get(R);if(D.color.copy(R.color).multiplyScalar(R.intensity),D.distance=R.distance,D.decay=R.decay,R.castShadow){let W=R.shadow,j=i.get(R);j.shadowIntensity=W.intensity,j.shadowBias=W.bias,j.shadowNormalBias=W.normalBias,j.shadowRadius=W.radius,j.shadowMapSize=W.mapSize,j.shadowCameraNear=W.camera.near,j.shadowCameraFar=W.camera.far,n.pointShadow[u]=j,n.pointShadowMap[u]=$,n.pointShadowMatrix[u]=R.shadow.matrix,f++}n.point[u]=D,u++}else if(R.isHemisphereLight){let D=t.get(R);D.skyColor.copy(R.color).multiplyScalar(U),D.groundColor.copy(R.groundColor).multiplyScalar(U),n.hemi[m]=D,m++}}g>0&&(e.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let A=n.hash;A.directionalLength===d&&A.pointLength===u&&A.spotLength===p&&A.rectAreaLength===g&&A.hemiLength===m&&A.numDirectionalShadows===v&&A.numPointShadows===f&&A.numSpotShadows===_&&A.numSpotMaps===M&&A.numLightProbes===T||(n.directional.length=d,n.spot.length=p,n.rectArea.length=g,n.point.length=u,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=f,n.pointShadowMap.length=f,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=f,n.spotLightMatrix.length=_+M-S,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=T,A.directionalLength=d,A.pointLength=u,A.spotLength=p,A.rectAreaLength=g,A.hemiLength=m,A.numDirectionalShadows=v,A.numPointShadows=f,A.numSpotShadows=_,A.numSpotMaps=M,A.numLightProbes=T,n.version=op++)},setupView:function(o,l){let c=0,h=0,d=0,u=0,p=0,g=l.matrixWorldInverse;for(let m=0,v=o.length;m<v;m++){let f=o[m];if(f.isDirectionalLight){let _=n.directional[c];_.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(g),c++}else if(f.isSpotLight){let _=n.spot[d];_.position.setFromMatrixPosition(f.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(g),d++}else if(f.isRectAreaLight){let _=n.rectArea[u];_.position.setFromMatrixPosition(f.matrixWorld),_.position.applyMatrix4(g),a.identity(),s.copy(f.matrixWorld),s.premultiply(g),a.extractRotation(s),_.halfWidth.set(0.5*f.width,0,0),_.halfHeight.set(0,0.5*f.height,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),u++}else if(f.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(f.matrixWorld),_.position.applyMatrix4(g),h++}else if(f.isHemisphereLight){let _=n.hemi[p];_.direction.setFromMatrixPosition(f.matrixWorld),_.direction.transformDirection(g),p++}}},state:n}}function Oh(e){let t=new cp(e),i=[],n=[],r=[],s={lightsArray:i,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:function(a){s.camera=a,i.length=0,n.length=0,r.length=0},state:s,setupLights:function(){t.setup(i)},setupLightsView:function(a){t.setupView(i,a)},pushLight:function(a){i.push(a)},pushShadow:function(a){n.push(a)},pushLightProbeGrid:function(a){r.push(a)}}}function hp(e){let t=new WeakMap;return{get:function(i,n=0){let r=t.get(i),s;return r===void 0?(s=new Oh(e),t.set(i,[s])):n>=r.length?(s=new Oh(e),r.push(s)):s=r[n],s},dispose:function(){t=new WeakMap}}}var up=[new w(1,0,0),new w(-1,0,0),new w(0,1,0),new w(0,-1,0),new w(0,0,1),new w(0,0,-1)],dp=[new w(0,-1,0),new w(0,-1,0),new w(0,0,1),new w(0,0,-1),new w(0,-1,0),new w(0,-1,0)],Bh=new ze,Ar=new w,fl=new w;function pp(e,t,i){let n=new Fi,r=new ne,s=new ne,a=new et,o=new qo,l=new Yo,c={},h=i.maxTextureSize,d={[zn]:Pt,[Pt]:zn,[Ft]:Ft},u=new Zt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`}),p=u.clone();p.defines.HORIZONTAL_PASS=1;let g=new nt;g.setAttribute("position",new Et(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let m=new St(g,u),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tn;let f=this.type;function _(A,P){let O=t.update(m);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Yt(r.x,r.y,{format:on,type:ri})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,e.setRenderTarget(A.mapPass),e.clear(),e.renderBufferDirect(P,null,O,u,m,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,e.setRenderTarget(A.map),e.clear(),e.renderBufferDirect(P,null,O,p,m,null)}function M(A,P,O,R){let V=null,U=O.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(U!==void 0)V=U;else if(V=O.isPointLight===!0?l:o,e.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let Z=V.uuid,$=P.uuid,D=c[Z];D===void 0&&(D={},c[Z]=D);let W=D[$];W===void 0&&(W=V.clone(),D[$]=W,P.addEventListener("dispose",T)),V=W}if(V.visible=P.visible,V.wireframe=P.wireframe,V.side=R===Bn?P.shadowSide!==null?P.shadowSide:P.side:P.shadowSide!==null?P.shadowSide:d[P.side],V.alphaMap=P.alphaMap,V.alphaTest=P.alphaToCoverage===!0?0.5:P.alphaTest,V.map=P.map,V.clipShadows=P.clipShadows,V.clippingPlanes=P.clippingPlanes,V.clipIntersection=P.clipIntersection,V.displacementMap=P.displacementMap,V.displacementScale=P.displacementScale,V.displacementBias=P.displacementBias,V.wireframeLinewidth=P.wireframeLinewidth,V.linewidth=P.linewidth,O.isPointLight===!0&&V.isMeshDistanceMaterial===!0)e.properties.get(V).light=O;return V}function S(A,P,O,R,V){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&V===Bn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,A.matrixWorld);let Z=t.update(A),$=A.material;if(Array.isArray($)){let D=Z.groups;for(let W=0,j=D.length;W<j;W++){let z=D[W],ae=$[z.materialIndex];if(ae&&ae.visible){let le=M(A,ae,R,V);A.onBeforeShadow(e,A,P,O,Z,le,z),e.renderBufferDirect(O,null,Z,le,A,z),A.onAfterShadow(e,A,P,O,Z,le,z)}}}else if($.visible){let D=M(A,$,R,V);A.onBeforeShadow(e,A,P,O,Z,D,null),e.renderBufferDirect(O,null,Z,D,A,null),A.onAfterShadow(e,A,P,O,Z,D,null)}}let U=A.children;for(let Z=0,$=U.length;Z<$;Z++)S(U[Z],P,O,R,V)}function T(A){A.target.removeEventListener("dispose",T);for(let P in c){let O=c[P],R=A.target.uuid;if(R in O)O[R].dispose(),delete O[R]}}this.render=function(A,P,O){if(v.enabled===!1)return;if(v.autoUpdate===!1&&v.needsUpdate===!1)return;if(A.length===0)return;this.type===hc&&(Le("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=tn);let R=e.getRenderTarget(),V=e.getActiveCubeFace(),U=e.getActiveMipmapLevel(),Z=e.state;Z.setBlending(ui),Z.buffers.depth.getReversed()===!0?Z.buffers.color.setClear(0,0,0,0):Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);let $=f!==this.type;$&&P.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach((W)=>W.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,W=A.length;D<W;D++){let j=A[D],z=j.shadow;if(z===void 0){Le("WebGLShadowMap:",j,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);let ae=z.getFrameExtents();r.multiply(ae),s.copy(z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/ae.x),r.x=s.x*ae.x,z.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/ae.y),r.y=s.y*ae.y,z.mapSize.y=s.y));let le=e.state.buffers.depth.getReversed();if(z.camera._reversedDepth=le,z.map===null||$===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Bn){if(j.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Yt(r.x,r.y,{format:on,type:ri,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),z.map.texture.name=j.name+".shadowMap",z.map.depthTexture=new Vi(r.x,r.y,wi),z.map.depthTexture.name=j.name+".shadowMapDepth",z.map.depthTexture.format=sn,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Oi,z.map.depthTexture.magFilter=Oi}else j.isPointLight?(z.map=new Rr(r.x),z.map.depthTexture=new Oo(r.x,Bi)):(z.map=new Yt(r.x,r.y),z.map.depthTexture=new Vi(r.x,r.y,Bi)),z.map.depthTexture.name=j.name+".shadowMap",z.map.depthTexture.format=sn,this.type===tn?(z.map.depthTexture.compareFunction=le?ys:xs,z.map.depthTexture.minFilter=Ot,z.map.depthTexture.magFilter=Ot):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Oi,z.map.depthTexture.magFilter=Oi);z.camera.updateProjectionMatrix()}let Ee=z.map.isWebGLCubeRenderTarget?6:1;for(let ve=0;ve<Ee;ve++){if(z.map.isWebGLCubeRenderTarget)e.setRenderTarget(z.map,ve),e.clear();else{ve===0&&(e.setRenderTarget(z.map),e.clear());let q=z.getViewport(ve);a.set(s.x*q.x,s.y*q.y,s.x*q.z,s.y*q.w),Z.viewport(a)}if(j.isPointLight){let{camera:q,matrix:pe}=z,Me=j.distance||q.far;Me!==q.far&&(q.far=Me,q.updateProjectionMatrix()),Ar.setFromMatrixPosition(j.matrixWorld),q.position.copy(Ar),fl.copy(q.position),fl.add(up[ve]),q.up.copy(dp[ve]),q.lookAt(fl),q.updateMatrixWorld(),pe.makeTranslation(-Ar.x,-Ar.y,-Ar.z),Bh.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Bh,q.coordinateSystem,q.reversedDepth)}else z.updateMatrices(j);n=z.getFrustum(),S(P,O,z.camera,j,this.type)}z.isPointLightShadow!==!0&&this.type===Bn&&_(z,O),z.needsUpdate=!1}f=this.type,v.needsUpdate=!1,e.setRenderTarget(R,V,U)}}function mp(e,t){let i=new function(){let y=!1,L=new et,N=null,E=new et(0,0,0,0);return{setMask:function(H){N===H||y||(e.colorMask(H,H,H,H),N=H)},setLocked:function(H){y=H},setClear:function(H,k,J,ue,Ie){Ie===!0&&(H*=ue,k*=ue,J*=ue),L.set(H,k,J,ue),E.equals(L)===!1&&(e.clearColor(H,k,J,ue),E.copy(L))},reset:function(){y=!1,N=null,E.set(-1,0,0,0)}}},n=new function(){let y=!1,L=!1,N=null,E=null,H=null;return{setReversed:function(k){if(L!==k){let J=t.get("EXT_clip_control");k?J.clipControlEXT(J.LOWER_LEFT_EXT,J.ZERO_TO_ONE_EXT):J.clipControlEXT(J.LOWER_LEFT_EXT,J.NEGATIVE_ONE_TO_ONE_EXT),L=k;let ue=H;H=null,this.setClear(ue)}},getReversed:function(){return L},setTest:function(k){k?ce(e.DEPTH_TEST):Te(e.DEPTH_TEST)},setMask:function(k){N===k||y||(e.depthMask(k),N=k)},setFunc:function(k){if(L&&(k=ah[k]),E!==k){switch(k){case Pc:e.depthFunc(e.NEVER);break;case Lc:e.depthFunc(e.ALWAYS);break;case Dc:e.depthFunc(e.LESS);break;case Oa:e.depthFunc(e.LEQUAL);break;case Nc:e.depthFunc(e.EQUAL);break;case Uc:e.depthFunc(e.GEQUAL);break;case Fc:e.depthFunc(e.GREATER);break;case Oc:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}E=k}},setLocked:function(k){y=k},setClear:function(k){H!==k&&(H=k,L&&(k=1-k),e.clearDepth(k))},reset:function(){y=!1,N=null,E=null,H=null,L=!1}}},r=new function(){let y=!1,L=null,N=null,E=null,H=null,k=null,J=null,ue=null,Ie=null;return{setTest:function(oe){y||(oe?ce(e.STENCIL_TEST):Te(e.STENCIL_TEST))},setMask:function(oe){L===oe||y||(e.stencilMask(oe),L=oe)},setFunc:function(oe,we,se){N===oe&&E===we&&H===se||(e.stencilFunc(oe,we,se),N=oe,E=we,H=se)},setOp:function(oe,we,se){k===oe&&J===we&&ue===se||(e.stencilOp(oe,we,se),k=oe,J=we,ue=se)},setLocked:function(oe){y=oe},setClear:function(oe){Ie!==oe&&(e.clearStencil(oe),Ie=oe)},reset:function(){y=!1,L=null,N=null,E=null,H=null,k=null,J=null,ue=null,Ie=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c={},h=new WeakMap,d=[],u=null,p=!1,g=null,m=null,v=null,f=null,_=null,M=null,S=null,T=new Fe(0,0,0),A=0,P=!1,O=null,R=null,V=null,U=null,Z=null,$=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),D=!1,W=0,j=e.getParameter(e.VERSION);j.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(j)[1]),D=W>=1):j.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),D=W>=2);let z=null,ae={},le=e.getParameter(e.SCISSOR_BOX),Ee=e.getParameter(e.VIEWPORT),ve=new et().fromArray(le),q=new et().fromArray(Ee);function pe(y,L,N,E){let H=new Uint8Array(4),k=e.createTexture();e.bindTexture(y,k),e.texParameteri(y,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(y,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let J=0;J<N;J++)y===e.TEXTURE_3D||y===e.TEXTURE_2D_ARRAY?e.texImage3D(L,0,e.RGBA,1,1,E,0,e.RGBA,e.UNSIGNED_BYTE,H):e.texImage2D(L+J,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,H);return k}let Me={};function ce(y){o[y]!==!0&&(e.enable(y),o[y]=!0)}function Te(y){o[y]!==!1&&(e.disable(y),o[y]=!1)}Me[e.TEXTURE_2D]=pe(e.TEXTURE_2D,e.TEXTURE_2D,1),Me[e.TEXTURE_CUBE_MAP]=pe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[e.TEXTURE_2D_ARRAY]=pe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Me[e.TEXTURE_3D]=pe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),i.setClear(0,0,0,1),n.setClear(1),r.setClear(0),ce(e.DEPTH_TEST),n.setFunc(Oa),x(!1),I(Da),ce(e.CULL_FACE),C(ui);let ie={[Vn]:e.FUNC_ADD,[dc]:e.FUNC_SUBTRACT,[pc]:e.FUNC_REVERSE_SUBTRACT};ie[mc]=e.MIN,ie[fc]=e.MAX;let be={[gc]:e.ZERO,[_c]:e.ONE,[vc]:e.SRC_COLOR,[yc]:e.SRC_ALPHA,[Ac]:e.SRC_ALPHA_SATURATE,[Tc]:e.DST_COLOR,[Sc]:e.DST_ALPHA,[xc]:e.ONE_MINUS_SRC_COLOR,[Mc]:e.ONE_MINUS_SRC_ALPHA,[Ec]:e.ONE_MINUS_DST_COLOR,[bc]:e.ONE_MINUS_DST_ALPHA,[wc]:e.CONSTANT_COLOR,[Cc]:e.ONE_MINUS_CONSTANT_COLOR,[Rc]:e.CONSTANT_ALPHA,[Ic]:e.ONE_MINUS_CONSTANT_ALPHA};function C(y,L,N,E,H,k,J,ue,Ie,oe){if(y!==ui){if(p===!1&&(ce(e.BLEND),p=!0),y===uc)H=H||L,k=k||N,J=J||E,L===m&&H===_||(e.blendEquationSeparate(ie[L],ie[H]),m=L,_=H),N===v&&E===f&&k===M&&J===S||(e.blendFuncSeparate(be[N],be[E],be[k],be[J]),v=N,f=E,M=k,S=J),ue.equals(T)!==!1&&Ie===A||(e.blendColor(ue.r,ue.g,ue.b,Ie),T.copy(ue),A=Ie),g=y,P=!1;else if(y!==g||oe!==P){if(m===Vn&&_===Vn||(e.blendEquation(e.FUNC_ADD),m=Vn,_=Vn),oe)switch(y){case hr:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Na:e.blendFunc(e.ONE,e.ONE);break;case Ua:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Fa:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:De("WebGLState: Invalid blending: ",y)}else switch(y){case hr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Na:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Ua:De("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Fa:De("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:De("WebGLState: Invalid blending: ",y)}v=null,f=null,M=null,S=null,T.set(0,0,0),A=0,g=y,P=oe}}else p===!0&&(Te(e.BLEND),p=!1)}function x(y){O!==y&&(y?e.frontFace(e.CW):e.frontFace(e.CCW),O=y)}function I(y){y!==lc?(ce(e.CULL_FACE),y!==R&&(y===Da?e.cullFace(e.BACK):y===cc?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Te(e.CULL_FACE),R=y}function F(y,L,N){y?(ce(e.POLYGON_OFFSET_FILL),U===L&&Z===N||(U=L,Z=N,n.getReversed()&&(L=-L),e.polygonOffset(L,N))):Te(e.POLYGON_OFFSET_FILL)}return{buffers:{color:i,depth:n,stencil:r},enable:ce,disable:Te,bindFramebuffer:function(y,L){return c[y]!==L&&(e.bindFramebuffer(y,L),c[y]=L,y===e.DRAW_FRAMEBUFFER&&(c[e.FRAMEBUFFER]=L),y===e.FRAMEBUFFER&&(c[e.DRAW_FRAMEBUFFER]=L),!0)},drawBuffers:function(y,L){let N=d,E=!1;if(y){N=h.get(L),N===void 0&&(N=[],h.set(L,N));let H=y.textures;if(N.length!==H.length||N[0]!==e.COLOR_ATTACHMENT0){for(let k=0,J=H.length;k<J;k++)N[k]=e.COLOR_ATTACHMENT0+k;N.length=H.length,E=!0}}else N[0]!==e.BACK&&(N[0]=e.BACK,E=!0);E&&e.drawBuffers(N)},useProgram:function(y){return u!==y&&(e.useProgram(y),u=y,!0)},setBlending:C,setMaterial:function(y,L){y.side===Ft?Te(e.CULL_FACE):ce(e.CULL_FACE);let N=y.side===Pt;L&&(N=!N),x(N),y.blending===hr&&y.transparent===!1?C(ui):C(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),n.setFunc(y.depthFunc),n.setTest(y.depthTest),n.setMask(y.depthWrite),i.setMask(y.colorWrite);let E=y.stencilWrite;r.setTest(E),E&&(r.setMask(y.stencilWriteMask),r.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),r.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),F(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?ce(e.SAMPLE_ALPHA_TO_COVERAGE):Te(e.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:x,setCullFace:I,setLineWidth:function(y){y!==V&&(D&&e.lineWidth(y),V=y)},setPolygonOffset:F,setScissorTest:function(y){y?ce(e.SCISSOR_TEST):Te(e.SCISSOR_TEST)},activeTexture:function(y){y===void 0&&(y=e.TEXTURE0+$-1),z!==y&&(e.activeTexture(y),z=y)},bindTexture:function(y,L,N){N===void 0&&(N=z===null?e.TEXTURE0+$-1:z);let E=ae[N];E===void 0&&(E={type:void 0,texture:void 0},ae[N]=E),E.type===y&&E.texture===L||(z!==N&&(e.activeTexture(N),z=N),e.bindTexture(y,L||Me[y]),E.type=y,E.texture=L)},unbindTexture:function(){let y=ae[z];y!==void 0&&y.type!==void 0&&(e.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)},compressedTexImage2D:function(){try{e.compressedTexImage2D(...arguments)}catch(y){De("WebGLState:",y)}},compressedTexImage3D:function(){try{e.compressedTexImage3D(...arguments)}catch(y){De("WebGLState:",y)}},texImage2D:function(){try{e.texImage2D(...arguments)}catch(y){De("WebGLState:",y)}},texImage3D:function(){try{e.texImage3D(...arguments)}catch(y){De("WebGLState:",y)}},pixelStorei:function(y,L){l[y]!==L&&(e.pixelStorei(y,L),l[y]=L)},getParameter:function(y){return l[y]!==void 0?l[y]:e.getParameter(y)},updateUBOMapping:function(y,L){let N=a.get(L);N===void 0&&(N=new WeakMap,a.set(L,N));let E=N.get(y);E===void 0&&(E=e.getUniformBlockIndex(L,y.name),N.set(y,E))},uniformBlockBinding:function(y,L){let N=a.get(L).get(y);s.get(L)!==N&&(e.uniformBlockBinding(L,N,y.__bindingPointIndex),s.set(L,N))},texStorage2D:function(){try{e.texStorage2D(...arguments)}catch(y){De("WebGLState:",y)}},texStorage3D:function(){try{e.texStorage3D(...arguments)}catch(y){De("WebGLState:",y)}},texSubImage2D:function(){try{e.texSubImage2D(...arguments)}catch(y){De("WebGLState:",y)}},texSubImage3D:function(){try{e.texSubImage3D(...arguments)}catch(y){De("WebGLState:",y)}},compressedTexSubImage2D:function(){try{e.compressedTexSubImage2D(...arguments)}catch(y){De("WebGLState:",y)}},compressedTexSubImage3D:function(){try{e.compressedTexSubImage3D(...arguments)}catch(y){De("WebGLState:",y)}},scissor:function(y){ve.equals(y)===!1&&(e.scissor(y.x,y.y,y.z,y.w),ve.copy(y))},viewport:function(y){q.equals(y)===!1&&(e.viewport(y.x,y.y,y.z,y.w),q.copy(y))},reset:function(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),n.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),o={},l={},z=null,ae={},c={},h=new WeakMap,d=[],u=null,p=!1,g=null,m=null,v=null,f=null,_=null,M=null,S=null,T=new Fe(0,0,0),A=0,P=!1,O=null,R=null,V=null,U=null,Z=null,ve.set(0,0,e.canvas.width,e.canvas.height),q.set(0,0,e.canvas.width,e.canvas.height),i.reset(),n.reset(),r.reset()}}}function fp(e,t,i,n,r,s,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new ne,h=new WeakMap,d=new Set,u,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(C){}function m(C,x){return g?new OffscreenCanvas(C,x):sr("canvas")}function v(C,x,I){let F=1,y=be(C);if((y.width>I||y.height>I)&&(F=I/Math.max(y.width,y.height)),F<1){if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let L=Math.floor(F*y.width),N=Math.floor(F*y.height);u===void 0&&(u=m(L,N));let E=x?m(L,N):u;return E.width=L,E.height=N,E.getContext("2d").drawImage(C,0,0,L,N),Le("WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+L+"x"+N+")."),E}return"data"in C&&Le("WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),C}return C}function f(C){return C.generateMipmaps}function _(C){e.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?e.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(C,x,I,F,y,L=!1){if(C!==null){if(e[C]!==void 0)return e[C];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let N;F&&(N=t.get("EXT_texture_norm16"),N||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let E=x;if(x===e.RED&&(I===e.FLOAT&&(E=e.R32F),I===e.HALF_FLOAT&&(E=e.R16F),I===e.UNSIGNED_BYTE&&(E=e.R8),I===e.UNSIGNED_SHORT&&N&&(E=N.R16_EXT),I===e.SHORT&&N&&(E=N.R16_SNORM_EXT)),x===e.RED_INTEGER&&(I===e.UNSIGNED_BYTE&&(E=e.R8UI),I===e.UNSIGNED_SHORT&&(E=e.R16UI),I===e.UNSIGNED_INT&&(E=e.R32UI),I===e.BYTE&&(E=e.R8I),I===e.SHORT&&(E=e.R16I),I===e.INT&&(E=e.R32I)),x===e.RG&&(I===e.FLOAT&&(E=e.RG32F),I===e.HALF_FLOAT&&(E=e.RG16F),I===e.UNSIGNED_BYTE&&(E=e.RG8),I===e.UNSIGNED_SHORT&&N&&(E=N.RG16_EXT),I===e.SHORT&&N&&(E=N.RG16_SNORM_EXT)),x===e.RG_INTEGER&&(I===e.UNSIGNED_BYTE&&(E=e.RG8UI),I===e.UNSIGNED_SHORT&&(E=e.RG16UI),I===e.UNSIGNED_INT&&(E=e.RG32UI),I===e.BYTE&&(E=e.RG8I),I===e.SHORT&&(E=e.RG16I),I===e.INT&&(E=e.RG32I)),x===e.RGB_INTEGER&&(I===e.UNSIGNED_BYTE&&(E=e.RGB8UI),I===e.UNSIGNED_SHORT&&(E=e.RGB16UI),I===e.UNSIGNED_INT&&(E=e.RGB32UI),I===e.BYTE&&(E=e.RGB8I),I===e.SHORT&&(E=e.RGB16I),I===e.INT&&(E=e.RGB32I)),x===e.RGBA_INTEGER&&(I===e.UNSIGNED_BYTE&&(E=e.RGBA8UI),I===e.UNSIGNED_SHORT&&(E=e.RGBA16UI),I===e.UNSIGNED_INT&&(E=e.RGBA32UI),I===e.BYTE&&(E=e.RGBA8I),I===e.SHORT&&(E=e.RGBA16I),I===e.INT&&(E=e.RGBA32I)),x===e.RGB&&(I===e.UNSIGNED_SHORT&&N&&(E=N.RGB16_EXT),I===e.SHORT&&N&&(E=N.RGB16_SNORM_EXT),I===e.UNSIGNED_INT_5_9_9_9_REV&&(E=e.RGB9_E5),I===e.UNSIGNED_INT_10F_11F_11F_REV&&(E=e.R11F_G11F_B10F)),x===e.RGBA){let H=L?Ro:qe.getTransfer(y);I===e.FLOAT&&(E=e.RGBA32F),I===e.HALF_FLOAT&&(E=e.RGBA16F),I===e.UNSIGNED_BYTE&&(E=H===tt?e.SRGB8_ALPHA8:e.RGBA8),I===e.UNSIGNED_SHORT&&N&&(E=N.RGBA16_EXT),I===e.SHORT&&N&&(E=N.RGBA16_SNORM_EXT),I===e.UNSIGNED_SHORT_4_4_4_4&&(E=e.RGBA4),I===e.UNSIGNED_SHORT_5_5_5_1&&(E=e.RGB5_A1)}return E!==e.R16F&&E!==e.R32F&&E!==e.RG16F&&E!==e.RG32F&&E!==e.RGBA16F&&E!==e.RGBA32F||t.get("EXT_color_buffer_float"),E}function T(C,x){let I;return C?x===null||x===Bi||x===Hn?I=e.DEPTH24_STENCIL8:x===wi?I=e.DEPTH32F_STENCIL8:x===mr&&(I=e.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Bi||x===Hn?I=e.DEPTH_COMPONENT24:x===wi?I=e.DEPTH_COMPONENT32F:x===mr&&(I=e.DEPTH_COMPONENT16),I}function A(C,x){return f(C)===!0||C.isFramebufferTexture&&C.minFilter!==Oi&&C.minFilter!==Ot?Math.log2(Math.max(x.width,x.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?x.mipmaps.length:1}function P(C){let x=C.target;x.removeEventListener("dispose",P),function(I){let F=n.get(I);if(F.__webglInit===void 0)return;let y=I.source,L=p.get(y);if(L){let N=L[F.__cacheKey];N.usedTimes--,N.usedTimes===0&&R(I),Object.keys(L).length===0&&p.delete(y)}n.remove(I)}(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&d.delete(x)}function O(C){let x=C.target;x.removeEventListener("dispose",O),function(I){let F=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let L=0;L<6;L++){if(Array.isArray(F.__webglFramebuffer[L]))for(let N=0;N<F.__webglFramebuffer[L].length;N++)e.deleteFramebuffer(F.__webglFramebuffer[L][N]);else e.deleteFramebuffer(F.__webglFramebuffer[L]);F.__webglDepthbuffer&&e.deleteRenderbuffer(F.__webglDepthbuffer[L])}else{if(Array.isArray(F.__webglFramebuffer))for(let L=0;L<F.__webglFramebuffer.length;L++)e.deleteFramebuffer(F.__webglFramebuffer[L]);else e.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&e.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&e.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let L=0;L<F.__webglColorRenderbuffer.length;L++)F.__webglColorRenderbuffer[L]&&e.deleteRenderbuffer(F.__webglColorRenderbuffer[L]);F.__webglDepthRenderbuffer&&e.deleteRenderbuffer(F.__webglDepthRenderbuffer)}let y=I.textures;for(let L=0,N=y.length;L<N;L++){let E=n.get(y[L]);E.__webglTexture&&(e.deleteTexture(E.__webglTexture),a.memory.textures--),n.remove(y[L])}n.remove(I)}(x)}function R(C){let x=n.get(C);e.deleteTexture(x.__webglTexture);let I=C.source;delete p.get(I)[x.__cacheKey],a.memory.textures--}let V=0;function U(C,x){let I=n.get(C);if(C.isVideoTexture&&function(F){let y=a.render.frame;h.get(F)!==y&&(h.set(F,y),F.update())}(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&I.__version!==C.version){let F=C.image;if(F===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else{if(F.complete!==!1)return void ae(I,C,x);Le("WebGLRenderer: Texture marked for update but image is incomplete")}}else C.isExternalTexture&&(I.__webglTexture=C.sourceTexture?C.sourceTexture:null);i.bindTexture(e.TEXTURE_2D,I.__webglTexture,e.TEXTURE0+x)}let Z={[cs]:e.REPEAT,[hs]:e.CLAMP_TO_EDGE,[Gc]:e.MIRRORED_REPEAT},$={[Oi]:e.NEAREST,[Hc]:e.NEAREST_MIPMAP_NEAREST,[pr]:e.NEAREST_MIPMAP_LINEAR,[Ot]:e.LINEAR,[us]:e.LINEAR_MIPMAP_NEAREST,[rn]:e.LINEAR_MIPMAP_LINEAR},D={[Kc]:e.NEVER,[ih]:e.ALWAYS,[$c]:e.LESS,[xs]:e.LEQUAL,[Qc]:e.EQUAL,[ys]:e.GEQUAL,[eh]:e.GREATER,[th]:e.NOTEQUAL};function W(C,x){if(x.type!==wi||t.has("OES_texture_float_linear")!==!1||x.magFilter!==Ot&&x.magFilter!==us&&x.magFilter!==pr&&x.magFilter!==rn&&x.minFilter!==Ot&&x.minFilter!==us&&x.minFilter!==pr&&x.minFilter!==rn||Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(C,e.TEXTURE_WRAP_S,Z[x.wrapS]),e.texParameteri(C,e.TEXTURE_WRAP_T,Z[x.wrapT]),C!==e.TEXTURE_3D&&C!==e.TEXTURE_2D_ARRAY||e.texParameteri(C,e.TEXTURE_WRAP_R,Z[x.wrapR]),e.texParameteri(C,e.TEXTURE_MAG_FILTER,$[x.magFilter]),e.texParameteri(C,e.TEXTURE_MIN_FILTER,$[x.minFilter]),x.compareFunction&&(e.texParameteri(C,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(C,e.TEXTURE_COMPARE_FUNC,D[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Oi)return;if(x.minFilter!==pr&&x.minFilter!==rn)return;if(x.type===wi&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let I=t.get("EXT_texture_filter_anisotropic");e.texParameterf(C,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function j(C,x){let I=!1;C.__webglInit===void 0&&(C.__webglInit=!0,x.addEventListener("dispose",P));let F=x.source,y=p.get(F);y===void 0&&(y={},p.set(F,y));let L=function(N){let E=[];return E.push(N.wrapS),E.push(N.wrapT),E.push(N.wrapR||0),E.push(N.magFilter),E.push(N.minFilter),E.push(N.anisotropy),E.push(N.internalFormat),E.push(N.format),E.push(N.type),E.push(N.generateMipmaps),E.push(N.premultiplyAlpha),E.push(N.flipY),E.push(N.unpackAlignment),E.push(N.colorSpace),E.join()}(x);if(L!==C.__cacheKey){y[L]===void 0&&(y[L]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,I=!0),y[L].usedTimes++;let N=y[C.__cacheKey];N!==void 0&&(y[C.__cacheKey].usedTimes--,N.usedTimes===0&&R(x)),C.__cacheKey=L,C.__webglTexture=y[L].texture}return I}function z(C,x,I){return Math.floor(Math.floor(C/I)/x)}function ae(C,x,I){let F=e.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(F=e.TEXTURE_2D_ARRAY),x.isData3DTexture&&(F=e.TEXTURE_3D);let y=j(C,x),L=x.source;i.bindTexture(F,C.__webglTexture,e.TEXTURE0+I);let N=n.get(L);if(L.version!==N.__version||y===!0){if(i.activeTexture(e.TEXTURE0+I),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let ee=qe.getPrimaries(qe.workingColorSpace),de=x.colorSpace===ln?null:qe.getPrimaries(x.colorSpace),ke=x.colorSpace===ln||ee===de?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke)}i.pixelStorei(e.UNPACK_ALIGNMENT,x.unpackAlignment);let E=v(x.image,!1,r.maxTextureSize);E=ie(x,E);let H=s.convert(x.format,x.colorSpace),k=s.convert(x.type),J,ue=S(x.internalFormat,H,k,x.normalized,x.colorSpace,x.isVideoTexture);W(F,x);let Ie=x.mipmaps,oe=x.isVideoTexture!==!0,we=N.__version===void 0||y===!0,se=L.dataReady,Pe=A(x,E);if(x.isDepthTexture)ue=T(x.format===an,x.type),we&&(oe?i.texStorage2D(e.TEXTURE_2D,1,ue,E.width,E.height):i.texImage2D(e.TEXTURE_2D,0,ue,E.width,E.height,0,H,k,null));else if(x.isDataTexture)if(Ie.length>0){oe&&we&&i.texStorage2D(e.TEXTURE_2D,Pe,ue,Ie[0].width,Ie[0].height);for(let ee=0,de=Ie.length;ee<de;ee++)J=Ie[ee],oe?se&&i.texSubImage2D(e.TEXTURE_2D,ee,0,0,J.width,J.height,H,k,J.data):i.texImage2D(e.TEXTURE_2D,ee,ue,J.width,J.height,0,H,k,J.data);x.generateMipmaps=!1}else oe?(we&&i.texStorage2D(e.TEXTURE_2D,Pe,ue,E.width,E.height),se&&function(ee,de,ke,it){let X=ee.updateRanges;if(X.length===0)i.texSubImage2D(e.TEXTURE_2D,0,0,0,de.width,de.height,ke,it,de.data);else{X.sort((he,Se)=>he.start-Se.start);let re=0;for(let he=1;he<X.length;he++){let Se=X[re],ye=X[he],Ce=Se.start+Se.count,Ye=z(ye.start,de.width,4),pt=z(Se.start,de.width,4);ye.start<=Ce+1&&Ye===pt&&z(ye.start+ye.count-1,de.width,4)===Ye?Se.count=Math.max(Se.count,ye.start+ye.count-Se.start):(++re,X[re]=ye)}X.length=re+1;let ge=i.getParameter(e.UNPACK_ROW_LENGTH),Q=i.getParameter(e.UNPACK_SKIP_PIXELS),fe=i.getParameter(e.UNPACK_SKIP_ROWS);i.pixelStorei(e.UNPACK_ROW_LENGTH,de.width);for(let he=0,Se=X.length;he<Se;he++){let ye=X[he],Ce=Math.floor(ye.start/4),Ye=Math.ceil(ye.count/4),pt=Ce%de.width,Nt=Math.floor(Ce/de.width),yt=Ye;i.pixelStorei(e.UNPACK_SKIP_PIXELS,pt),i.pixelStorei(e.UNPACK_SKIP_ROWS,Nt),i.texSubImage2D(e.TEXTURE_2D,0,pt,Nt,yt,1,ke,it,de.data)}ee.clearUpdateRanges(),i.pixelStorei(e.UNPACK_ROW_LENGTH,ge),i.pixelStorei(e.UNPACK_SKIP_PIXELS,Q),i.pixelStorei(e.UNPACK_SKIP_ROWS,fe)}}(x,E,H,k)):i.texImage2D(e.TEXTURE_2D,0,ue,E.width,E.height,0,H,k,E.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){oe&&we&&i.texStorage3D(e.TEXTURE_2D_ARRAY,Pe,ue,Ie[0].width,Ie[0].height,E.depth);for(let ee=0,de=Ie.length;ee<de;ee++)if(J=Ie[ee],x.format!==di)if(H!==null)if(oe){if(se)if(x.layerUpdates.size>0){let ke=cl(J.width,J.height,x.format,x.type);for(let it of x.layerUpdates){let X=J.data.subarray(it*ke/J.data.BYTES_PER_ELEMENT,(it+1)*ke/J.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ee,0,0,it,J.width,J.height,1,H,X)}x.clearLayerUpdates()}else i.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ee,0,0,0,J.width,J.height,E.depth,H,J.data)}else i.compressedTexImage3D(e.TEXTURE_2D_ARRAY,ee,ue,J.width,J.height,E.depth,0,J.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else oe?se&&i.texSubImage3D(e.TEXTURE_2D_ARRAY,ee,0,0,0,J.width,J.height,E.depth,H,k,J.data):i.texImage3D(e.TEXTURE_2D_ARRAY,ee,ue,J.width,J.height,E.depth,0,H,k,J.data)}else{oe&&we&&i.texStorage2D(e.TEXTURE_2D,Pe,ue,Ie[0].width,Ie[0].height);for(let ee=0,de=Ie.length;ee<de;ee++)J=Ie[ee],x.format!==di?H!==null?oe?se&&i.compressedTexSubImage2D(e.TEXTURE_2D,ee,0,0,J.width,J.height,H,J.data):i.compressedTexImage2D(e.TEXTURE_2D,ee,ue,J.width,J.height,0,J.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?se&&i.texSubImage2D(e.TEXTURE_2D,ee,0,0,J.width,J.height,H,k,J.data):i.texImage2D(e.TEXTURE_2D,ee,ue,J.width,J.height,0,H,k,J.data)}else if(x.isDataArrayTexture)if(oe){if(we&&i.texStorage3D(e.TEXTURE_2D_ARRAY,Pe,ue,E.width,E.height,E.depth),se)if(x.layerUpdates.size>0){let ee=cl(E.width,E.height,x.format,x.type);for(let de of x.layerUpdates){let ke=E.data.subarray(de*ee/E.data.BYTES_PER_ELEMENT,(de+1)*ee/E.data.BYTES_PER_ELEMENT);i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,de,E.width,E.height,1,H,k,ke)}x.clearLayerUpdates()}else i.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,E.width,E.height,E.depth,H,k,E.data)}else i.texImage3D(e.TEXTURE_2D_ARRAY,0,ue,E.width,E.height,E.depth,0,H,k,E.data);else if(x.isData3DTexture)oe?(we&&i.texStorage3D(e.TEXTURE_3D,Pe,ue,E.width,E.height,E.depth),se&&i.texSubImage3D(e.TEXTURE_3D,0,0,0,0,E.width,E.height,E.depth,H,k,E.data)):i.texImage3D(e.TEXTURE_3D,0,ue,E.width,E.height,E.depth,0,H,k,E.data);else if(x.isFramebufferTexture){if(we)if(oe)i.texStorage2D(e.TEXTURE_2D,Pe,ue,E.width,E.height);else{let{width:ee,height:de}=E;for(let ke=0;ke<Pe;ke++)i.texImage2D(e.TEXTURE_2D,ke,ue,ee,de,0,H,k,null),ee>>=1,de>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in e){let ee=e.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),E.parentNode!==ee)return ee.appendChild(E),d.add(x),ee.onpaint=(de)=>{let ke=de.changedElements;for(let it of d)ke.includes(it.image)&&(it.needsUpdate=!0)},void ee.requestPaint();if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,E);else{let{RGBA:ke,RGBA:it,UNSIGNED_BYTE:X}=e;e.texElementImage2D(e.TEXTURE_2D,0,ke,it,X,E)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(oe&&we){let ee=be(Ie[0]);i.texStorage2D(e.TEXTURE_2D,Pe,ue,ee.width,ee.height)}for(let ee=0,de=Ie.length;ee<de;ee++)J=Ie[ee],oe?se&&i.texSubImage2D(e.TEXTURE_2D,ee,0,0,H,k,J):i.texImage2D(e.TEXTURE_2D,ee,ue,H,k,J);x.generateMipmaps=!1}else if(oe){if(we){let ee=be(E);i.texStorage2D(e.TEXTURE_2D,Pe,ue,ee.width,ee.height)}se&&i.texSubImage2D(e.TEXTURE_2D,0,0,0,H,k,E)}else i.texImage2D(e.TEXTURE_2D,0,ue,H,k,E);f(x)&&_(F),N.__version=L.version,x.onUpdate&&x.onUpdate(x)}C.__version=x.version}function le(C,x,I,F,y,L){let N=s.convert(I.format,I.colorSpace),E=s.convert(I.type),H=S(I.internalFormat,N,E,I.normalized,I.colorSpace),k=n.get(x),J=n.get(I);if(J.__renderTarget=x,!k.__hasExternalTextures){let ue=Math.max(1,x.width>>L),Ie=Math.max(1,x.height>>L);y===e.TEXTURE_3D||y===e.TEXTURE_2D_ARRAY?i.texImage3D(y,L,H,ue,Ie,x.depth,0,N,E,null):i.texImage2D(y,L,H,ue,Ie,0,N,E,null)}i.bindFramebuffer(e.FRAMEBUFFER,C),Te(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,F,y,J.__webglTexture,0,ce(x)):(y===e.TEXTURE_2D||y>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&y<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,F,y,J.__webglTexture,L),i.bindFramebuffer(e.FRAMEBUFFER,null)}function Ee(C,x,I){if(e.bindRenderbuffer(e.RENDERBUFFER,C),x.depthBuffer){let F=x.depthTexture,y=F&&F.isDepthTexture?F.type:null,L=T(x.stencilBuffer,y),N=x.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Te(x)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ce(x),L,x.width,x.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,ce(x),L,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,L,x.width,x.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,N,e.RENDERBUFFER,C)}else{let F=x.textures;for(let y=0;y<F.length;y++){let L=F[y],N=s.convert(L.format,L.colorSpace),E=s.convert(L.type),H=S(L.internalFormat,N,E,L.normalized,L.colorSpace);Te(x)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ce(x),H,x.width,x.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,ce(x),H,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,H,x.width,x.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ve(C,x,I){let F=x.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(e.FRAMEBUFFER,C),!x.depthTexture||!x.depthTexture.isDepthTexture)throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let y=n.get(x.depthTexture);if(y.__renderTarget=x,y.__webglTexture&&x.depthTexture.image.width===x.width&&x.depthTexture.image.height===x.height||(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),F){if(y.__webglInit===void 0&&(y.__webglInit=!0,x.depthTexture.addEventListener("dispose",P)),y.__webglTexture===void 0){y.__webglTexture=e.createTexture(),i.bindTexture(e.TEXTURE_CUBE_MAP,y.__webglTexture),W(e.TEXTURE_CUBE_MAP,x.depthTexture);let k=s.convert(x.depthTexture.format),J=s.convert(x.depthTexture.type),ue;x.depthTexture.format===sn?ue=e.DEPTH_COMPONENT24:x.depthTexture.format===an&&(ue=e.DEPTH24_STENCIL8);for(let Ie=0;Ie<6;Ie++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,ue,x.width,x.height,0,k,J,null)}}else U(x.depthTexture,0);let L=y.__webglTexture,N=ce(x),E=F?e.TEXTURE_CUBE_MAP_POSITIVE_X+I:e.TEXTURE_2D,H=x.depthTexture.format===an?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(x.depthTexture.format===sn)Te(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,H,E,L,0,N):e.framebufferTexture2D(e.FRAMEBUFFER,H,E,L,0);else{if(x.depthTexture.format!==an)throw Error("THREE.WebGLTextures: Unknown depthTexture format.");Te(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,H,E,L,0,N):e.framebufferTexture2D(e.FRAMEBUFFER,H,E,L,0)}}function q(C){let x=n.get(C),I=C.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==C.depthTexture){let F=C.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),F){let y=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,F.removeEventListener("dispose",y)};F.addEventListener("dispose",y),x.__depthDisposeCallback=y}x.__boundDepthTexture=F}if(C.depthTexture&&!x.__autoAllocateDepthBuffer)if(I)for(let F=0;F<6;F++)ve(x.__webglFramebuffer[F],C,F);else{let F=C.texture.mipmaps;F&&F.length>0?ve(x.__webglFramebuffer[0],C,0):ve(x.__webglFramebuffer,C,0)}else if(I){x.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(i.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer[F]),x.__webglDepthbuffer[F]===void 0)x.__webglDepthbuffer[F]=e.createRenderbuffer(),Ee(x.__webglDepthbuffer[F],C,!1);else{let y=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,L=x.__webglDepthbuffer[F];e.bindRenderbuffer(e.RENDERBUFFER,L),e.framebufferRenderbuffer(e.FRAMEBUFFER,y,e.RENDERBUFFER,L)}}else{let F=C.texture.mipmaps;if(F&&F.length>0?i.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer[0]):i.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=e.createRenderbuffer(),Ee(x.__webglDepthbuffer,C,!1);else{let y=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,L=x.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,L),e.framebufferRenderbuffer(e.FRAMEBUFFER,y,e.RENDERBUFFER,L)}}i.bindFramebuffer(e.FRAMEBUFFER,null)}let pe=[],Me=[];function ce(C){return Math.min(r.maxSamples,C.samples)}function Te(C){let x=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ie(C,x){let{colorSpace:I,format:F,type:y}=C;return C.isCompressedTexture===!0||C.isVideoTexture===!0||I!==Co&&I!==ln&&(qe.getTransfer(I)===tt?F===di&&y===ni||Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):De("WebGLTextures: Unsupported texture color space:",I)),x}function be(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=function(){let C=V;return C>=r.maxTextures&&Le("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),V+=1,C},this.resetTextureUnits=function(){V=0},this.getTextureUnits=function(){return V},this.setTextureUnits=function(C){V=C},this.setTexture2D=U,this.setTexture2DArray=function(C,x){let I=n.get(C);C.isRenderTargetTexture===!1&&C.version>0&&I.__version!==C.version?ae(I,C,x):(C.isExternalTexture&&(I.__webglTexture=C.sourceTexture?C.sourceTexture:null),i.bindTexture(e.TEXTURE_2D_ARRAY,I.__webglTexture,e.TEXTURE0+x))},this.setTexture3D=function(C,x){let I=n.get(C);C.isRenderTargetTexture===!1&&C.version>0&&I.__version!==C.version?ae(I,C,x):i.bindTexture(e.TEXTURE_3D,I.__webglTexture,e.TEXTURE0+x)},this.setTextureCube=function(C,x){let I=n.get(C);C.isCubeDepthTexture!==!0&&C.version>0&&I.__version!==C.version?function(F,y,L){if(y.image.length!==6)return;let N=j(F,y),E=y.source;i.bindTexture(e.TEXTURE_CUBE_MAP,F.__webglTexture,e.TEXTURE0+L);let H=n.get(E);if(E.version!==H.__version||N===!0){i.activeTexture(e.TEXTURE0+L);let k=qe.getPrimaries(qe.workingColorSpace),J=y.colorSpace===ln?null:qe.getPrimaries(y.colorSpace),ue=y.colorSpace===ln||k===J?e.NONE:e.BROWSER_DEFAULT_WEBGL;i.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let Ie=y.isCompressedTexture||y.image[0].isCompressedTexture,oe=y.image[0]&&y.image[0].isDataTexture,we=[];for(let Q=0;Q<6;Q++)we[Q]=Ie||oe?oe?y.image[Q].image:y.image[Q]:v(y.image[Q],!0,r.maxCubemapSize),we[Q]=ie(y,we[Q]);let se=we[0],Pe=s.convert(y.format,y.colorSpace),ee=s.convert(y.type),de=S(y.internalFormat,Pe,ee,y.normalized,y.colorSpace),ke=y.isVideoTexture!==!0,it=H.__version===void 0||N===!0,X=E.dataReady,re,ge=A(y,se);if(W(e.TEXTURE_CUBE_MAP,y),Ie){ke&&it&&i.texStorage2D(e.TEXTURE_CUBE_MAP,ge,de,se.width,se.height);for(let Q=0;Q<6;Q++){re=we[Q].mipmaps;for(let fe=0;fe<re.length;fe++){let he=re[fe];y.format!==di?Pe!==null?ke?X&&i.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,fe,0,0,he.width,he.height,Pe,he.data):i.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,fe,de,he.width,he.height,0,he.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?X&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,fe,0,0,he.width,he.height,Pe,ee,he.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,fe,de,he.width,he.height,0,Pe,ee,he.data)}}}else{if(re=y.mipmaps,ke&&it){re.length>0&&ge++;let Q=be(we[0]);i.texStorage2D(e.TEXTURE_CUBE_MAP,ge,de,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(oe){ke?X&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,we[Q].width,we[Q].height,Pe,ee,we[Q].data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,de,we[Q].width,we[Q].height,0,Pe,ee,we[Q].data);for(let fe=0;fe<re.length;fe++){let he=re[fe].image[Q].image;ke?X&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,fe+1,0,0,he.width,he.height,Pe,ee,he.data):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,fe+1,de,he.width,he.height,0,Pe,ee,he.data)}}else{ke?X&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Pe,ee,we[Q]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,de,Pe,ee,we[Q]);for(let fe=0;fe<re.length;fe++){let he=re[fe];ke?X&&i.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,fe+1,0,0,Pe,ee,he.image[Q]):i.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Q,fe+1,de,Pe,ee,he.image[Q])}}}f(y)&&_(e.TEXTURE_CUBE_MAP),H.__version=E.version,y.onUpdate&&y.onUpdate(y)}F.__version=y.version}(I,C,x):i.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+x)},this.rebindTextures=function(C,x,I){let F=n.get(C);x!==void 0&&le(F.__webglFramebuffer,C,C.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),I!==void 0&&q(C)},this.setupRenderTarget=function(C){let x=C.texture,I=n.get(C),F=n.get(x);C.addEventListener("dispose",O);let y=C.textures,L=C.isWebGLCubeRenderTarget===!0,N=y.length>1;if(N||(F.__webglTexture===void 0&&(F.__webglTexture=e.createTexture()),F.__version=x.version,a.memory.textures++),L){I.__webglFramebuffer=[];for(let E=0;E<6;E++)if(x.mipmaps&&x.mipmaps.length>0){I.__webglFramebuffer[E]=[];for(let H=0;H<x.mipmaps.length;H++)I.__webglFramebuffer[E][H]=e.createFramebuffer()}else I.__webglFramebuffer[E]=e.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){I.__webglFramebuffer=[];for(let E=0;E<x.mipmaps.length;E++)I.__webglFramebuffer[E]=e.createFramebuffer()}else I.__webglFramebuffer=e.createFramebuffer();if(N)for(let E=0,H=y.length;E<H;E++){let k=n.get(y[E]);k.__webglTexture===void 0&&(k.__webglTexture=e.createTexture(),a.memory.textures++)}if(C.samples>0&&Te(C)===!1){I.__webglMultisampledFramebuffer=e.createFramebuffer(),I.__webglColorRenderbuffer=[],i.bindFramebuffer(e.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let E=0;E<y.length;E++){let H=y[E];I.__webglColorRenderbuffer[E]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,I.__webglColorRenderbuffer[E]);let k=s.convert(H.format,H.colorSpace),J=s.convert(H.type),ue=S(H.internalFormat,k,J,H.normalized,H.colorSpace,C.isXRRenderTarget===!0),Ie=ce(C);e.renderbufferStorageMultisample(e.RENDERBUFFER,Ie,ue,C.width,C.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+E,e.RENDERBUFFER,I.__webglColorRenderbuffer[E])}e.bindRenderbuffer(e.RENDERBUFFER,null),C.depthBuffer&&(I.__webglDepthRenderbuffer=e.createRenderbuffer(),Ee(I.__webglDepthRenderbuffer,C,!0)),i.bindFramebuffer(e.FRAMEBUFFER,null)}}if(L){i.bindTexture(e.TEXTURE_CUBE_MAP,F.__webglTexture),W(e.TEXTURE_CUBE_MAP,x);for(let E=0;E<6;E++)if(x.mipmaps&&x.mipmaps.length>0)for(let H=0;H<x.mipmaps.length;H++)le(I.__webglFramebuffer[E][H],C,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+E,H);else le(I.__webglFramebuffer[E],C,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+E,0);f(x)&&_(e.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(N){for(let E=0,H=y.length;E<H;E++){let k=y[E],J=n.get(k),ue=e.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ue=C.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(ue,J.__webglTexture),W(ue,k),le(I.__webglFramebuffer,C,k,e.COLOR_ATTACHMENT0+E,ue,0),f(k)&&_(ue)}i.unbindTexture()}else{let E=e.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(E=C.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),i.bindTexture(E,F.__webglTexture),W(E,x),x.mipmaps&&x.mipmaps.length>0)for(let H=0;H<x.mipmaps.length;H++)le(I.__webglFramebuffer[H],C,x,e.COLOR_ATTACHMENT0,E,H);else le(I.__webglFramebuffer,C,x,e.COLOR_ATTACHMENT0,E,0);f(x)&&_(E),i.unbindTexture()}C.depthBuffer&&q(C)},this.updateRenderTargetMipmap=function(C){let x=C.textures;for(let I=0,F=x.length;I<F;I++){let y=x[I];if(f(y)){let L=M(C),N=n.get(y).__webglTexture;i.bindTexture(L,N),_(L),i.unbindTexture()}}},this.updateMultisampleRenderTarget=function(C){if(C.samples>0){if(Te(C)===!1){let{textures:x,width:I,height:F}=C,y=e.COLOR_BUFFER_BIT,L=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,N=n.get(C),E=x.length>1;if(E)for(let k=0;k<x.length;k++)i.bindFramebuffer(e.FRAMEBUFFER,N.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+k,e.RENDERBUFFER,null),i.bindFramebuffer(e.FRAMEBUFFER,N.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+k,e.TEXTURE_2D,null,0);i.bindFramebuffer(e.READ_FRAMEBUFFER,N.__webglMultisampledFramebuffer);let H=C.texture.mipmaps;H&&H.length>0?i.bindFramebuffer(e.DRAW_FRAMEBUFFER,N.__webglFramebuffer[0]):i.bindFramebuffer(e.DRAW_FRAMEBUFFER,N.__webglFramebuffer);for(let k=0;k<x.length;k++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(y|=e.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(y|=e.STENCIL_BUFFER_BIT)),E){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,N.__webglColorRenderbuffer[k]);let J=n.get(x[k]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,J,0)}e.blitFramebuffer(0,0,I,F,0,0,I,F,y,e.NEAREST),l===!0&&(pe.length=0,Me.length=0,pe.push(e.COLOR_ATTACHMENT0+k),C.depthBuffer&&C.resolveDepthBuffer===!1&&(pe.push(L),Me.push(L),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Me)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,pe))}if(i.bindFramebuffer(e.READ_FRAMEBUFFER,null),i.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),E)for(let k=0;k<x.length;k++){i.bindFramebuffer(e.FRAMEBUFFER,N.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+k,e.RENDERBUFFER,N.__webglColorRenderbuffer[k]);let J=n.get(x[k]).__webglTexture;i.bindFramebuffer(e.FRAMEBUFFER,N.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+k,e.TEXTURE_2D,J,0)}i.bindFramebuffer(e.DRAW_FRAMEBUFFER,N.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let x=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[x])}}},this.setupDepthRenderbuffer=q,this.setupFrameBufferTexture=le,this.useMultisampledRTT=Te,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function gp(e,t){return{convert:function(i,n=ln){let r,s=qe.getTransfer(n);if(i===ni)return e.UNSIGNED_BYTE;if(i===Xa)return e.UNSIGNED_SHORT_4_4_4_4;if(i===ja)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Xc)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===jc)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===kc)return e.BYTE;if(i===Wc)return e.SHORT;if(i===mr)return e.UNSIGNED_SHORT;if(i===Wa)return e.INT;if(i===Bi)return e.UNSIGNED_INT;if(i===wi)return e.FLOAT;if(i===ri)return e.HALF_FLOAT;if(i===qc)return e.ALPHA;if(i===Yc)return e.RGB;if(i===di)return e.RGBA;if(i===sn)return e.DEPTH_COMPONENT;if(i===an)return e.DEPTH_STENCIL;if(i===Zc)return e.RED;if(i===qa)return e.RED_INTEGER;if(i===on)return e.RG;if(i===Ya)return e.RG_INTEGER;if(i===Za)return e.RGBA_INTEGER;if(i===ds||i===ps||i===ms||i===fs)if(s===tt){if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(i===ds)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ms)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=t.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(i===ds)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ps)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ms)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(i===Ja||i===Ka||i===$a||i===Qa){if(r=t.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(i===Ja)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ka)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$a)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Qa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(i===eo||i===to||i===io||i===no||i===ro||i===gs||i===so){if(r=t.get("WEBGL_compressed_texture_etc"),r===null)return null;if(i===eo||i===to)return s===tt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===io)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===no)return r.COMPRESSED_R11_EAC;if(i===ro)return r.COMPRESSED_SIGNED_R11_EAC;if(i===gs)return r.COMPRESSED_RG11_EAC;if(i===so)return r.COMPRESSED_SIGNED_RG11_EAC}if(i===ao||i===oo||i===lo||i===co||i===ho||i===uo||i===po||i===mo||i===fo||i===go||i===_o||i===vo||i===xo||i===yo){if(r=t.get("WEBGL_compressed_texture_astc"),r===null)return null;if(i===ao)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===oo)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===lo)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===co)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ho)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===uo)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===po)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mo)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===fo)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===go)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===_o)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===vo)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===xo)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===yo)return s===tt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(i===Mo||i===So||i===bo){if(r=t.get("EXT_texture_compression_bptc"),r===null)return null;if(i===Mo)return s===tt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===So)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(i===To||i===Eo||i===_s||i===Ao){if(r=t.get("EXT_texture_compression_rgtc"),r===null)return null;if(i===To)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Eo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_s)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ao)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return i===Hn?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}}}class Jh{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Cs(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Zt({vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new St(new jn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Kh extends Ci{constructor(e,t){super();let i=this,n=null,r=1,s=null,a="local-floor",o=1,l=null,c=null,h=null,d=null,u=null,p=null,g=typeof XRWebGLBinding<"u",m=new Jh,v={},f=t.getContextAttributes(),_=null,M=null,S=[],T=[],A=new ne,P=null,O=new It;O.viewport=new et;let R=new It;R.viewport=new et;let V=[O,R],U=new al,Z=null,$=null;function D(q){let pe=T.indexOf(q.inputSource);if(pe===-1)return;let Me=S[pe];Me!==void 0&&(Me.update(q.inputSource,q.frame,l||s),Me.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){n.removeEventListener("select",D),n.removeEventListener("selectstart",D),n.removeEventListener("selectend",D),n.removeEventListener("squeeze",D),n.removeEventListener("squeezestart",D),n.removeEventListener("squeezeend",D),n.removeEventListener("end",W),n.removeEventListener("inputsourceschange",j);for(let q=0;q<S.length;q++){let pe=T[q];pe!==null&&(T[q]=null,S[q].disconnect(pe))}Z=null,$=null,m.reset();for(let q in v)delete v[q];e.setRenderTarget(_),u=null,d=null,h=null,n=null,M=null,ve.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}function j(q){for(let pe=0;pe<q.removed.length;pe++){let Me=q.removed[pe],ce=T.indexOf(Me);ce>=0&&(T[ce]=null,S[ce].disconnect(Me))}for(let pe=0;pe<q.added.length;pe++){let Me=q.added[pe],ce=T.indexOf(Me);if(ce===-1){for(let ie=0;ie<S.length;ie++){if(ie>=T.length){T.push(Me),ce=ie;break}if(T[ie]===null){T[ie]=Me,ce=ie;break}}if(ce===-1)break}let Te=S[ce];Te&&Te.connect(Me)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let pe=S[q];return pe===void 0&&(pe=new gr,S[q]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(q){let pe=S[q];return pe===void 0&&(pe=new gr,S[q]=pe),pe.getGripSpace()},this.getHand=function(q){let pe=S[q];return pe===void 0&&(pe=new gr,S[q]=pe),pe.getHandSpace()},this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return h===null&&g&&(h=new XRWebGLBinding(n,t)),h},this.getFrame=function(){return p},this.getSession=function(){return n},this.setSession=async function(q){if(n=q,n!==null){if(_=e.getRenderTarget(),n.addEventListener("select",D),n.addEventListener("selectstart",D),n.addEventListener("selectend",D),n.addEventListener("squeeze",D),n.addEventListener("squeezestart",D),n.addEventListener("squeezeend",D),n.addEventListener("end",W),n.addEventListener("inputsourceschange",j),f.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(A),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Me=null,ce=null;f.depth&&(ce=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=f.stencil?an:sn,Me=f.stencil?Hn:Bi);let Te={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(Te),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Yt(d.textureWidth,d.textureHeight,{format:di,type:ni,depthTexture:new Vi(d.textureWidth,d.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let pe={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(n,t,pe),n.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),M=new Yt(u.framebufferWidth,u.framebufferHeight,{format:di,type:ni,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(o),l=null,s=await n.requestReferenceSpace(a),ve.setContext(n),ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};let z=new w,ae=new w;function le(q,pe){pe===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(pe.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(n===null)return;let{near:pe,far:Me}=q;m.texture!==null&&(m.depthNear>0&&(pe=m.depthNear),m.depthFar>0&&(Me=m.depthFar)),U.near=R.near=O.near=pe,U.far=R.far=O.far=Me,Z===U.near&&$===U.far||(n.updateRenderState({depthNear:U.near,depthFar:U.far}),Z=U.near,$=U.far),U.layers.mask=6|q.layers.mask,O.layers.mask=-5&U.layers.mask,R.layers.mask=-3&U.layers.mask;let ce=q.parent,Te=U.cameras;le(U,ce);for(let ie=0;ie<Te.length;ie++)le(Te[ie],ce);Te.length===2?function(ie,be,C){z.setFromMatrixPosition(be.matrixWorld),ae.setFromMatrixPosition(C.matrixWorld);let x=z.distanceTo(ae),I=be.projectionMatrix.elements,F=C.projectionMatrix.elements,y=I[14]/(I[10]-1),L=I[14]/(I[10]+1),N=(I[9]+1)/I[5],E=(I[9]-1)/I[5],H=(I[8]-1)/I[0],k=(F[8]+1)/F[0],J=y*H,ue=y*k,Ie=x/(-H+k),oe=Ie*-H;if(be.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(oe),ie.translateZ(Ie),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),I[10]===-1)ie.projectionMatrix.copy(be.projectionMatrix),ie.projectionMatrixInverse.copy(be.projectionMatrixInverse);else{let we=y+Ie,se=L+Ie,Pe=J-oe,ee=ue+(x-oe),de=N*L/se*we,ke=E*L/se*we;ie.projectionMatrix.makePerspective(Pe,ee,de,ke,we,se),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}(U,O,R):U.projectionMatrix.copy(O.projectionMatrix),function(ie,be,C){C===null?ie.matrix.copy(be.matrixWorld):(ie.matrix.copy(C.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(be.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(be.projectionMatrix),ie.projectionMatrixInverse.copy(be.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=2*ar*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}(q,U,ce)},this.getCamera=function(){return U},this.getFoveation=function(){if(d!==null||u!==null)return o},this.setFoveation=function(q){o=q,d!==null&&(d.fixedFoveation=q),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(q){return v[q]};let Ee=null,ve=new zh;ve.setAnimationLoop(function(q,pe){if(c=pe.getViewerPose(l||s),p=pe,c!==null){let Me=c.views;u!==null&&(e.setRenderTargetFramebuffer(M,u.framebuffer),e.setRenderTarget(M));let ce=!1;Me.length!==U.cameras.length&&(U.cameras.length=0,ce=!0);for(let ie=0;ie<Me.length;ie++){let be=Me[ie],C=null;if(u!==null)C=u.getViewport(be);else{let I=h.getViewSubImage(d,be);C=I.viewport,ie===0&&(e.setRenderTargetTextures(M,I.colorTexture,I.depthStencilTexture),e.setRenderTarget(M))}let x=V[ie];x===void 0&&(x=new It,x.layers.enable(ie),x.viewport=new et,V[ie]=x),x.matrix.fromArray(be.transform.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale),x.projectionMatrix.fromArray(be.projectionMatrix),x.projectionMatrixInverse.copy(x.projectionMatrix).invert(),x.viewport.set(C.x,C.y,C.width,C.height),ie===0&&(U.matrix.copy(x.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),ce===!0&&U.cameras.push(x)}let Te=n.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&g){h=i.getBinding();let ie=h.getDepthInformation(Me[0]);ie&&ie.isValid&&ie.texture&&m.init(ie,n.renderState)}if(Te&&Te.includes("camera-access")&&g){e.state.unbindTexture(),h=i.getBinding();for(let ie=0;ie<Me.length;ie++){let be=Me[ie].camera;if(be){let C=v[be];C||(C=new Cs,v[be]=C);let x=h.getCameraImage(be);C.sourceTexture=x}}}}for(let Me=0;Me<S.length;Me++){let ce=T[Me],Te=S[Me];ce!==null&&Te!==void 0&&Te.update(ce,pe,l||s)}Ee&&Ee(q,pe),pe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:pe}),p=null}),this.setAnimationLoop=function(q){Ee=q},this.dispose=function(){}}}var _p=new ze,$h=new Ge;function vp(e,t){function i(r,s){r.matrixAutoUpdate===!0&&r.updateMatrix(),s.value.copy(r.matrix)}function n(r,s){r.opacity.value=s.opacity,s.color&&r.diffuse.value.copy(s.color),s.emissive&&r.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(r.map.value=s.map,i(s.map,r.mapTransform)),s.alphaMap&&(r.alphaMap.value=s.alphaMap,i(s.alphaMap,r.alphaMapTransform)),s.bumpMap&&(r.bumpMap.value=s.bumpMap,i(s.bumpMap,r.bumpMapTransform),r.bumpScale.value=s.bumpScale,s.side===Pt&&(r.bumpScale.value*=-1)),s.normalMap&&(r.normalMap.value=s.normalMap,i(s.normalMap,r.normalMapTransform),r.normalScale.value.copy(s.normalScale),s.side===Pt&&r.normalScale.value.negate()),s.displacementMap&&(r.displacementMap.value=s.displacementMap,i(s.displacementMap,r.displacementMapTransform),r.displacementScale.value=s.displacementScale,r.displacementBias.value=s.displacementBias),s.emissiveMap&&(r.emissiveMap.value=s.emissiveMap,i(s.emissiveMap,r.emissiveMapTransform)),s.specularMap&&(r.specularMap.value=s.specularMap,i(s.specularMap,r.specularMapTransform)),s.alphaTest>0&&(r.alphaTest.value=s.alphaTest);let a=t.get(s),o=a.envMap,l=a.envMapRotation;o&&(r.envMap.value=o,r.envMapRotation.value.setFromMatrix4(_p.makeRotationFromEuler(l)).transpose(),o.isCubeTexture&&o.isRenderTargetTexture===!1&&r.envMapRotation.value.premultiply($h),r.reflectivity.value=s.reflectivity,r.ior.value=s.ior,r.refractionRatio.value=s.refractionRatio),s.lightMap&&(r.lightMap.value=s.lightMap,r.lightMapIntensity.value=s.lightMapIntensity,i(s.lightMap,r.lightMapTransform)),s.aoMap&&(r.aoMap.value=s.aoMap,r.aoMapIntensity.value=s.aoMapIntensity,i(s.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,s){s.color.getRGB(r.fogColor.value,Xo(e)),s.isFog?(r.fogNear.value=s.near,r.fogFar.value=s.far):s.isFogExp2&&(r.fogDensity.value=s.density)},refreshMaterialUniforms:function(r,s,a,o,l){s.isNodeMaterial?s.uniformsNeedUpdate=!1:s.isMeshBasicMaterial?n(r,s):s.isMeshLambertMaterial?(n(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshToonMaterial?(n(r,s),function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)}(r,s)):s.isMeshPhongMaterial?(n(r,s),function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,0.0001)}(r,s),s.envMap&&(r.envMapIntensity.value=s.envMapIntensity)):s.isMeshStandardMaterial?(n(r,s),function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,i(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,i(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)}(r,s),s.isMeshPhysicalMaterial&&function(c,h,d){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,i(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,i(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,i(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,i(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,i(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Pt&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,i(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,i(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=d.texture,c.transmissionSamplerSize.value.set(d.width,d.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,i(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,i(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,i(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,i(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,i(h.specularIntensityMap,c.specularIntensityMapTransform))}(r,s,l)):s.isMeshMatcapMaterial?(n(r,s),function(c,h){h.matcap&&(c.matcap.value=h.matcap)}(r,s)):s.isMeshDepthMaterial?n(r,s):s.isMeshDistanceMaterial?(n(r,s),function(c,h){let d=t.get(h).light;c.referencePosition.value.setFromMatrixPosition(d.matrixWorld),c.nearDistance.value=d.shadow.camera.near,c.farDistance.value=d.shadow.camera.far}(r,s)):s.isMeshNormalMaterial?n(r,s):s.isLineBasicMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,i(h.map,c.mapTransform))}(r,s),s.isLineDashedMaterial&&function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale}(r,s)):s.isPointsMaterial?function(c,h,d,u){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*d,c.scale.value=0.5*u,h.map&&(c.map.value=h.map,i(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,i(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)}(r,s,a,o):s.isSpriteMaterial?function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,i(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,i(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)}(r,s):s.isShadowMaterial?(r.color.value.copy(s.color),r.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function xp(e,t,i,n){let r={},s={},a=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(u,p,g,m){if(function(v,f,_,M){let S=v.value,T=f+"_"+_;if(M[T]===void 0)return typeof S=="number"||typeof S=="boolean"?M[T]=S:ArrayBuffer.isView(S)?M[T]=S.slice():M[T]=S.clone(),!0;{let A=M[T];if(typeof S=="number"||typeof S=="boolean"){if(A!==S)return M[T]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(A.equals(S)===!1)return A.copy(S),!0}}return!1}(u,p,g,m)===!0){let{__offset:v,value:f}=u;if(Array.isArray(f)){let _=0;for(let M=0;M<f.length;M++){let S=f[M],T=h(S);c(S,u.__data,_),typeof S=="number"||typeof S=="boolean"||S.isMatrix3||ArrayBuffer.isView(S)||(_+=T.storage/Float32Array.BYTES_PER_ELEMENT)}}else c(f,u.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,v,u.__data)}}function c(u,p,g){typeof u=="number"||typeof u=="boolean"?p[0]=u:u.isMatrix3?(p[0]=u.elements[0],p[1]=u.elements[1],p[2]=u.elements[2],p[3]=0,p[4]=u.elements[3],p[5]=u.elements[4],p[6]=u.elements[5],p[7]=0,p[8]=u.elements[6],p[9]=u.elements[7],p[10]=u.elements[8],p[11]=0):ArrayBuffer.isView(u)?p.set(new u.constructor(u.buffer,u.byteOffset,p.length)):u.toArray(p,g)}function h(u){let p={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(p.boundary=4,p.storage=4):u.isVector2?(p.boundary=8,p.storage=8):u.isVector3||u.isColor?(p.boundary=16,p.storage=12):u.isVector4?(p.boundary=16,p.storage=16):u.isMatrix3?(p.boundary=48,p.storage=48):u.isMatrix4?(p.boundary=64,p.storage=64):u.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(u)?(p.boundary=16,p.storage=u.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",u),p}function d(u){let p=u.target;p.removeEventListener("dispose",d);let g=a.indexOf(p.__bindingPointIndex);a.splice(g,1),e.deleteBuffer(r[p.id]),delete r[p.id],delete s[p.id]}return{bind:function(u,p){let g=p.program;n.uniformBlockBinding(u,g)},update:function(u,p){let g=r[u.id];g===void 0&&(function(f){let _=f.uniforms,M=0,S=16;for(let A=0,P=_.length;A<P;A++){let O=Array.isArray(_[A])?_[A]:[_[A]];for(let R=0,V=O.length;R<V;R++){let U=O[R],Z=Array.isArray(U.value)?U.value:[U.value];for(let $=0,D=Z.length;$<D;$++){let W=h(Z[$]),j=M%S,z=j%W.boundary,ae=j+z;M+=z,ae!==0&&S-ae<W.storage&&(M+=S-ae),U.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=M,M+=W.storage}}}let T=M%S;T>0&&(M+=S-T),f.__size=M,f.__cache={}}(u),g=function(f){let _=function(){for(let A=0;A<o;A++)if(a.indexOf(A)===-1)return a.push(A),A;return De("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}();f.__bindingPointIndex=_;let M=e.createBuffer(),S=f.__size,T=f.usage;return e.bindBuffer(e.UNIFORM_BUFFER,M),e.bufferData(e.UNIFORM_BUFFER,S,T),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,_,M),M}(u),r[u.id]=g,u.addEventListener("dispose",d));let m=p.program;n.updateUBOMapping(u,m);let v=t.render.frame;s[u.id]!==v&&(function(f){let _=r[f.id],M=f.uniforms,S=f.__cache;e.bindBuffer(e.UNIFORM_BUFFER,_);for(let T=0,A=M.length;T<A;T++){let P=M[T];if(Array.isArray(P))for(let O=0,R=P.length;O<R;O++)l(P[O],T,O,S);else l(P,T,0,S)}e.bindBuffer(e.UNIFORM_BUFFER,null)}(u),s[u.id]=v)},dispose:function(){for(let u in r)e.deleteBuffer(r[u]);a=[],r={},s={}}}}$h.set(-1,0,0,0,1,0,0,0,1);var yp=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),fi=null;class vl{constructor(e={}){let{canvas:t=nh(),context:i=null,depth:n=!0,stencil:r=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:u=ni}=e,p;if(this.isWebGLRenderer=!0,i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=s;let g=u,m=new Set([Za,Ya,qa]),v=new Set([ni,Bi,mr,Hn,Xa,ja]),f=new Uint32Array(4),_=new Int32Array(4),M=new w,S=null,T=null,A=[],P=[],O=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,V=!1,U=null,Z=null,$=null,D=null;this._outputColorSpace=vs;let W=0,j=0,z=null,ae=-1,le=null,Ee=new et,ve=new et,q=null,pe=new Fe(0),Me=0,ce=t.width,Te=t.height,ie=1,be=null,C=null,x=new et(0,0,ce,Te),I=new et(0,0,ce,Te),F=!1,y=new Fi,L=!1,N=!1,E=new ze,H=new w,k=new et,J={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ue=!1;function Ie(){return z===null?ie:1}let oe,we,se,Pe,ee,de,ke,it,X,re,ge,Q,fe,he,Se,ye,Ce,Ye,pt,Nt,yt,At,Wi,B=i;function _n(b,G){return t.getContext(b,G)}try{let b={alpha:!0,depth:n,stencil:r,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${oc}`),t.addEventListener("webglcontextlost",_i,!1),t.addEventListener("webglcontextrestored",vn,!1),t.addEventListener("webglcontextcreationerror",xl,!1),B===null){if(B=_n("webgl2",b),B===null)throw _n("webgl2")?Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(b){throw De("WebGLRenderer: "+b.message),b}function wt(){oe=new qu(B),oe.init(),yt=new gp(B,oe),we=new ku(B,oe,e,yt),se=new mp(B,oe),we.reversedDepthBuffer&&d&&se.buffers.depth.setReversed(!0),Z=B.createFramebuffer(),$=B.createFramebuffer(),D=B.createFramebuffer(),Pe=new Ju(B),ee=new np,de=new fp(B,oe,se,ee,we,yt,Pe),ke=new ju(R),it=new Bu(B),At=new Gu(B,it),X=new Yu(B,it,Pe,At),re=new $u(B,X,it,At,Pe),Ye=new Ku(B,we,de),Se=new Wu(ee),ge=new ip(R,ke,oe,we,At,Se),Q=new vp(R,ee),fe=new sp,he=new hp(oe),Ce=new Vu(R,ke,se,re,p,o),ye=new pp(R,re,we),Wi=new xp(B,Pe,we,se),pt=new Hu(B,oe,Pe),Nt=new Zu(B,oe,Pe),Pe.programs=ge.programs,R.capabilities=we,R.extensions=oe,R.properties=ee,R.renderLists=fe,R.shadowMap=ye,R.state=se,R.info=Pe}wt(),g!==ni&&(O=new ed(g,t.width,t.height,a,n,r));let st=new Kh(R,B);function _i(b){b.preventDefault(),Lo("WebGLRenderer: Context Lost."),V=!0}function vn(){Lo("WebGLRenderer: Context Restored."),V=!1;let b=Pe.autoReset,G=ye.enabled,Y=ye.autoUpdate,te=ye.needsUpdate,K=ye.type;wt(),Pe.autoReset=b,ye.enabled=G,ye.autoUpdate=Y,ye.needsUpdate=te,ye.type=K}function xl(b){De("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function yl(b){let G=b.target;G.removeEventListener("dispose",yl),function(Y){(function(te){let K=ee.get(te).programs;K!==void 0&&(K.forEach(function(me){ge.releaseProgram(me)}),te.isShaderMaterial&&ge.releaseShaderCache(te))})(Y),ee.remove(Y)}(G)}function Ml(b,G,Y){b.transparent===!0&&b.side===Ft&&b.forceSinglePass===!1?(b.side=Pt,b.needsUpdate=!0,Pr(b,G,Y),b.side=zn,b.needsUpdate=!0,Pr(b,G,Y),b.side=Ft):Pr(b,G,Y)}this.xr=st,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let b=oe.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=oe.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(b){b!==void 0&&(ie=b,this.setSize(ce,Te,!1))},this.getSize=function(b){return b.set(ce,Te)},this.setSize=function(b,G,Y=!0){st.isPresenting?Le("WebGLRenderer: Can't change size while VR device is presenting."):(ce=b,Te=G,t.width=Math.floor(b*ie),t.height=Math.floor(G*ie),Y===!0&&(t.style.width=b+"px",t.style.height=G+"px"),O!==null&&O.setSize(t.width,t.height),this.setViewport(0,0,b,G))},this.getDrawingBufferSize=function(b){return b.set(ce*ie,Te*ie).floor()},this.setDrawingBufferSize=function(b,G,Y){ce=b,Te=G,ie=Y,t.width=Math.floor(b*Y),t.height=Math.floor(G*Y),this.setViewport(0,0,b,G)},this.setEffects=function(b){if(g!==ni){if(b){for(let G=0;G<b.length;G++)if(b[G].isOutputPass===!0){Le("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}O.setEffects(b||[])}else De("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(b){return b.copy(Ee)},this.getViewport=function(b){return b.copy(x)},this.setViewport=function(b,G,Y,te){b.isVector4?x.set(b.x,b.y,b.z,b.w):x.set(b,G,Y,te),se.viewport(Ee.copy(x).multiplyScalar(ie).round())},this.getScissor=function(b){return b.copy(I)},this.setScissor=function(b,G,Y,te){b.isVector4?I.set(b.x,b.y,b.z,b.w):I.set(b,G,Y,te),se.scissor(ve.copy(I).multiplyScalar(ie).round())},this.getScissorTest=function(){return F},this.setScissorTest=function(b){se.setScissorTest(F=b)},this.setOpaqueSort=function(b){be=b},this.setTransparentSort=function(b){C=b},this.getClearColor=function(b){return b.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(b=!0,G=!0,Y=!0){let te=0;if(b){let K=!1;if(z!==null){let me=z.texture.format;K=m.has(me)}if(K){let me=z.texture.type,xe=v.has(me),Ae=Ce.getClearColor(),Re=Ce.getClearAlpha(),Oe=Ae.r,Ze=Ae.g,Je=Ae.b;xe?(f[0]=Oe,f[1]=Ze,f[2]=Je,f[3]=Re,B.clearBufferuiv(B.COLOR,0,f)):(_[0]=Oe,_[1]=Ze,_[2]=Je,_[3]=Re,B.clearBufferiv(B.COLOR,0,_))}else te|=B.COLOR_BUFFER_BIT}G&&(te|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(te|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),te!==0&&B.clear(te)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),U=b},this.dispose=function(){t.removeEventListener("webglcontextlost",_i,!1),t.removeEventListener("webglcontextrestored",vn,!1),t.removeEventListener("webglcontextcreationerror",xl,!1),Ce.dispose(),fe.dispose(),he.dispose(),ee.dispose(),ke.dispose(),re.dispose(),At.dispose(),Wi.dispose(),ge.dispose(),st.dispose(),st.removeEventListener("sessionstart",Sl),st.removeEventListener("sessionend",bl),Xi.stop()},this.renderBufferDirect=function(b,G,Y,te,K,me){G===null&&(G=J);let xe=K.isMesh&&K.matrixWorld.determinantAffine()<0,Ae=function(je,ot,bt,Be,He){ot.isScene!==!0&&(ot=J),de.resetTextureUnits();let Jt=ot.fog,Ks=Be.isMeshStandardMaterial||Be.isMeshLambertMaterial||Be.isMeshPhongMaterial?ot.environment:null,Lr=z===null?R.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:qe.workingColorSpace,Jn=Be.isMeshStandardMaterial||Be.isMeshLambertMaterial&&!Be.envMap||Be.isMeshPhongMaterial&&!Be.envMap,ai=ke.get(Be.envMap||Ks,Jn),xn=Be.vertexColors===!0&&!!bt.attributes.color&&bt.attributes.color.itemSize===4,vi=!!bt.attributes.tangent&&(!!Be.normalMap||Be.anisotropy>0),$s=!!bt.morphAttributes.position,yn=!!bt.morphAttributes.normal,eu=!!bt.morphAttributes.color,Rl=ii;Be.toneMapped&&(z!==null&&z.isXRRenderTarget!==!0||(Rl=R.toneMapping));let Il=bt.morphAttributes.position||bt.morphAttributes.normal||bt.morphAttributes.color,tu=Il!==void 0?Il.length:0,Ve=ee.get(Be),ji=T.state.lights;if(L===!0&&(N===!0||je!==le)){let ft=je===le&&Be.id===ae;Se.setState(Be,je,ft)}let Kt=!1;Be.version===Ve.__version?Ve.needsLights&&Ve.lightsStateVersion!==ji.state.version||Ve.outputColorSpace!==Lr||He.isBatchedMesh&&Ve.batching===!1?Kt=!0:He.isBatchedMesh||Ve.batching!==!0?He.isBatchedMesh&&Ve.batchingColor===!0&&He.colorTexture===null||He.isBatchedMesh&&Ve.batchingColor===!1&&He.colorTexture!==null||He.isInstancedMesh&&Ve.instancing===!1?Kt=!0:He.isInstancedMesh||Ve.instancing!==!0?He.isSkinnedMesh&&Ve.skinning===!1?Kt=!0:He.isSkinnedMesh||Ve.skinning!==!0?He.isInstancedMesh&&Ve.instancingColor===!0&&He.instanceColor===null||He.isInstancedMesh&&Ve.instancingColor===!1&&He.instanceColor!==null||He.isInstancedMesh&&Ve.instancingMorph===!0&&He.morphTexture===null||He.isInstancedMesh&&Ve.instancingMorph===!1&&He.morphTexture!==null||Ve.envMap!==ai||Be.fog===!0&&Ve.fog!==Jt?Kt=!0:Ve.numClippingPlanes===void 0||Ve.numClippingPlanes===Se.numPlanes&&Ve.numIntersection===Se.numIntersection?(Ve.vertexAlphas!==xn||Ve.vertexTangents!==vi||Ve.morphTargets!==$s||Ve.morphNormals!==yn||Ve.morphColors!==eu||Ve.toneMapping!==Rl||Ve.morphTargetsCount!==tu||!!Ve.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Kt=!0):Kt=!0:Kt=!0:Kt=!0:Kt=!0:(Kt=!0,Ve.__version=Be.version);let Ri=Ve.currentProgram;Kt===!0&&(Ri=Pr(Be,ot,He),U&&Be.isNodeMaterial&&U.onUpdateProgram(Be,Ri,Ve));let Pl=!1,Mn=!1,Qs=!1,lt=Ri.getUniforms(),Xt=Ve.uniforms;if(se.useProgram(Ri.program)&&(Pl=!0,Mn=!0,Qs=!0),Be.id!==ae&&(ae=Be.id,Mn=!0),Ve.needsLights){let ft=function(li,ta){if(li.length===0)return null;if(li.length===1)return li[0].texture!==null?li[0]:null;M.setFromMatrixPosition(ta.matrixWorld);for(let Sn=0,iu=li.length;Sn<iu;Sn++){let ia=li[Sn];if(ia.texture!==null&&ia.boundingBox.containsPoint(M))return ia}return null}(T.state.lightProbeGridArray,He);Ve.lightProbeGrid!==ft&&(Ve.lightProbeGrid=ft,Mn=!0)}if(Pl||le!==je){se.buffers.depth.getReversed()&&je.reversedDepth!==!0&&(je._reversedDepth=!0,je.updateProjectionMatrix()),lt.setValue(B,"projectionMatrix",je.projectionMatrix),lt.setValue(B,"viewMatrix",je.matrixWorldInverse);let ft=lt.map.cameraPosition;ft!==void 0&&ft.setValue(B,H.setFromMatrixPosition(je.matrixWorld)),we.logarithmicDepthBuffer&&lt.setValue(B,"logDepthBufFC",2/(Math.log(je.far+1)/Math.LN2)),(Be.isMeshPhongMaterial||Be.isMeshToonMaterial||Be.isMeshLambertMaterial||Be.isMeshBasicMaterial||Be.isMeshStandardMaterial||Be.isShaderMaterial)&&lt.setValue(B,"isOrthographic",je.isOrthographicCamera===!0),le!==je&&(le=je,Mn=!0,Qs=!0)}if(Ve.needsLights&&(ji.state.directionalShadowMap.length>0&&lt.setValue(B,"directionalShadowMap",ji.state.directionalShadowMap,de),ji.state.spotShadowMap.length>0&&lt.setValue(B,"spotShadowMap",ji.state.spotShadowMap,de),ji.state.pointShadowMap.length>0&&lt.setValue(B,"pointShadowMap",ji.state.pointShadowMap,de)),He.isSkinnedMesh){lt.setOptional(B,He,"bindMatrix"),lt.setOptional(B,He,"bindMatrixInverse");let ft=He.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),lt.setValue(B,"boneTexture",ft.boneTexture,de))}He.isBatchedMesh&&(lt.setOptional(B,He,"batchingTexture"),lt.setValue(B,"batchingTexture",He._matricesTexture,de),lt.setOptional(B,He,"batchingIdTexture"),lt.setValue(B,"batchingIdTexture",He._indirectTexture,de),lt.setOptional(B,He,"batchingColorTexture"),He._colorsTexture!==null&&lt.setValue(B,"batchingColorTexture",He._colorsTexture,de));let ea=bt.morphAttributes;if(ea.position===void 0&&ea.normal===void 0&&ea.color===void 0||Ye.update(He,bt,Ri),(Mn||Ve.receiveShadow!==He.receiveShadow)&&(Ve.receiveShadow=He.receiveShadow,lt.setValue(B,"receiveShadow",He.receiveShadow)),(Be.isMeshStandardMaterial||Be.isMeshLambertMaterial||Be.isMeshPhongMaterial)&&Be.envMap===null&&ot.environment!==null&&(Xt.envMapIntensity.value=ot.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=(fi===null&&(fi=new Fo(yp,16,16,on,ri),fi.name="DFG_LUT",fi.minFilter=Ot,fi.magFilter=Ot,fi.wrapS=hs,fi.wrapT=hs,fi.generateMipmaps=!1,fi.needsUpdate=!0),fi)),Mn){if(lt.setValue(B,"toneMappingExposure",R.toneMappingExposure),Ve.needsLights&&($t=Qs,(oi=Xt).ambientLightColor.needsUpdate=$t,oi.lightProbe.needsUpdate=$t,oi.directionalLights.needsUpdate=$t,oi.directionalLightShadows.needsUpdate=$t,oi.pointLights.needsUpdate=$t,oi.pointLightShadows.needsUpdate=$t,oi.spotLights.needsUpdate=$t,oi.spotLightShadows.needsUpdate=$t,oi.rectAreaLights.needsUpdate=$t,oi.hemisphereLights.needsUpdate=$t),Jt&&Be.fog===!0&&Q.refreshFogUniforms(Xt,Jt),Q.refreshMaterialUniforms(Xt,Be,ie,Te,T.state.transmissionRenderTarget[je.id]),Ve.needsLights&&Ve.lightProbeGrid){let ft=Ve.lightProbeGrid;Xt.probesSH.value=ft.texture,Xt.probesMin.value.copy(ft.boundingBox.min),Xt.probesMax.value.copy(ft.boundingBox.max),Xt.probesResolution.value.copy(ft.resolution)}wr.upload(B,wl(Ve),Xt,de)}var oi,$t;if(Be.isShaderMaterial&&Be.uniformsNeedUpdate===!0&&(wr.upload(B,wl(Ve),Xt,de),Be.uniformsNeedUpdate=!1),Be.isSpriteMaterial&&lt.setValue(B,"center",He.center),lt.setValue(B,"modelViewMatrix",He.modelViewMatrix),lt.setValue(B,"normalMatrix",He.normalMatrix),lt.setValue(B,"modelMatrix",He.matrixWorld),Be.uniformsGroups!==void 0){let ft=Be.uniformsGroups;for(let li=0,ta=ft.length;li<ta;li++){let Sn=ft[li];Wi.update(Sn,Ri),Wi.bind(Sn,Ri)}}return Ri}(b,G,Y,te,K);se.setMaterial(te,xe);let Re=Y.index,Oe=1;if(te.wireframe===!0){if(Re=X.getWireframeAttribute(Y),Re===void 0)return;Oe=2}let Ze=Y.drawRange,Je=Y.attributes.position,Ne=Ze.start*Oe,Ke=(Ze.start+Ze.count)*Oe;me!==null&&(Ne=Math.max(Ne,me.start*Oe),Ke=Math.min(Ke,(me.start+me.count)*Oe)),Re!==null?(Ne=Math.max(Ne,0),Ke=Math.min(Ke,Re.count)):Je!=null&&(Ne=Math.max(Ne,0),Ke=Math.min(Ke,Je.count));let _t=Ke-Ne;if(_t<0||_t===1/0)return;let mt;At.setup(K,te,Ae,Y,Re);let at=pt;if(Re!==null&&(mt=it.get(Re),at=Nt,at.setIndex(mt)),K.isMesh)te.wireframe===!0?(se.setLineWidth(te.wireframeLinewidth*Ie()),at.setMode(B.LINES)):at.setMode(B.TRIANGLES);else if(K.isLine){let je=te.linewidth;je===void 0&&(je=1),se.setLineWidth(je*Ie()),K.isLineSegments?at.setMode(B.LINES):K.isLineLoop?at.setMode(B.LINE_LOOP):at.setMode(B.LINE_STRIP)}else K.isPoints?at.setMode(B.POINTS):K.isSprite&&at.setMode(B.TRIANGLES);if(K.isBatchedMesh)if(oe.get("WEBGL_multi_draw"))at.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let{_multiDrawStarts:je,_multiDrawCounts:ot,_multiDrawCount:bt}=K,Be=Re?it.get(Re).bytesPerElement:1,He=ee.get(te).currentProgram.getUniforms();for(let Jt=0;Jt<bt;Jt++)He.setValue(B,"_gl_DrawID",Jt),at.render(je[Jt]/Be,ot[Jt])}else if(K.isInstancedMesh)at.renderInstances(Ne,_t,K.count);else if(Y.isInstancedBufferGeometry){let je=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,ot=Math.min(Y.instanceCount,je);at.renderInstances(Ne,_t,ot)}else at.render(Ne,_t)},this.compile=function(b,G,Y=null){Y===null&&(Y=b),T=he.get(Y),T.init(G),P.push(T),Y.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(T.pushLight(K),K.castShadow&&T.pushShadow(K))}),b!==Y&&b.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(T.pushLight(K),K.castShadow&&T.pushShadow(K))}),T.setupLights();let te=new Set;return b.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let me=K.material;if(me)if(Array.isArray(me))for(let xe=0;xe<me.length;xe++){let Ae=me[xe];Ml(Ae,Y,K),te.add(Ae)}else Ml(me,Y,K),te.add(me)}),T=P.pop(),te},this.compileAsync=function(b,G,Y=null){let te=this.compile(b,G,Y);return new Promise((K)=>{function me(){te.forEach(function(xe){ee.get(xe).currentProgram.isReady()&&te.delete(xe)}),te.size!==0?setTimeout(me,10):K(b)}oe.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Zs=null;function Sl(){Xi.stop()}function bl(){Xi.start()}let Xi=new zh;function Js(b,G,Y,te){if(b.visible===!1)return;if(b.layers.test(G.layers)){if(b.isGroup)Y=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(G);else if(b.isLightProbeGrid)T.pushLightProbeGrid(b);else if(b.isLight)T.pushLight(b),b.castShadow&&T.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||y.intersectsSprite(b)){te&&k.setFromMatrixPosition(b.matrixWorld).applyMatrix4(E);let me=re.update(b),xe=b.material;xe.visible&&S.push(b,me,xe,Y,k.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||y.intersectsObject(b))){let me=re.update(b),xe=b.material;if(te&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),k.copy(b.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),k.copy(me.boundingSphere.center)),k.applyMatrix4(b.matrixWorld).applyMatrix4(E)),Array.isArray(xe)){let Ae=me.groups;for(let Re=0,Oe=Ae.length;Re<Oe;Re++){let Ze=Ae[Re],Je=xe[Ze.materialIndex];Je&&Je.visible&&S.push(b,me,Je,Y,k.z,Ze)}}else xe.visible&&S.push(b,me,xe,Y,k.z,null)}}let K=b.children;for(let me=0,xe=K.length;me<xe;me++)Js(K[me],G,Y,te)}function Tl(b,G,Y,te){let{opaque:K,transmissive:me,transparent:xe}=b;T.setupLightsView(Y),L===!0&&Se.setGlobalState(R.clippingPlanes,Y),te&&se.viewport(Ee.copy(te)),K.length>0&&Ir(K,G,Y),me.length>0&&Ir(me,G,Y),xe.length>0&&Ir(xe,G,Y),se.buffers.depth.setTest(!0),se.buffers.depth.setMask(!0),se.buffers.color.setMask(!0),se.setPolygonOffset(!1)}function El(b,G,Y,te){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[te.id]===void 0){let Je=oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[te.id]=new Yt(1,1,{generateMipmaps:!0,type:Je?ri:ni,minFilter:rn,samples:Math.max(4,we.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}let K=T.state.transmissionRenderTarget[te.id],me=te.viewport||Ee;K.setSize(me.z*R.transmissionResolutionScale,me.w*R.transmissionResolutionScale);let xe=R.getRenderTarget(),Ae=R.getActiveCubeFace(),Re=R.getActiveMipmapLevel();R.setRenderTarget(K),R.getClearColor(pe),Me=R.getClearAlpha(),Me<1&&R.setClearColor(16777215,0.5),R.clear(),ue&&Ce.render(Y);let Oe=R.toneMapping;R.toneMapping=ii;let Ze=te.viewport;if(te.viewport!==void 0&&(te.viewport=void 0),T.setupLightsView(te),L===!0&&Se.setGlobalState(R.clippingPlanes,te),Ir(b,Y,te),de.updateMultisampleRenderTarget(K),de.updateRenderTargetMipmap(K),oe.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let Ne=0,Ke=G.length;Ne<Ke;Ne++){let _t=G[Ne],{object:mt,geometry:at,material:je,group:ot}=_t;if(je.side===Ft&&mt.layers.test(te.layers)){let bt=je.side;je.side=Pt,je.needsUpdate=!0,Al(mt,Y,te,at,je,ot),je.side=bt,je.needsUpdate=!0,Je=!0}}Je===!0&&(de.updateMultisampleRenderTarget(K),de.updateRenderTargetMipmap(K))}R.setRenderTarget(xe,Ae,Re),R.setClearColor(pe,Me),Ze!==void 0&&(te.viewport=Ze),R.toneMapping=Oe}function Ir(b,G,Y){let te=G.isScene===!0?G.overrideMaterial:null;for(let K=0,me=b.length;K<me;K++){let xe=b[K],{object:Ae,geometry:Re,group:Oe}=xe,Ze=xe.material;Ze.allowOverride===!0&&te!==null&&(Ze=te),Ae.layers.test(Y.layers)&&Al(Ae,G,Y,Re,Ze,Oe)}}function Al(b,G,Y,te,K,me){b.onBeforeRender(R,G,Y,te,K,me),b.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),K.onBeforeRender(R,G,Y,te,b,me),K.transparent===!0&&K.side===Ft&&K.forceSinglePass===!1?(K.side=Pt,K.needsUpdate=!0,R.renderBufferDirect(Y,G,te,K,b,me),K.side=zn,K.needsUpdate=!0,R.renderBufferDirect(Y,G,te,K,b,me),K.side=Ft):R.renderBufferDirect(Y,G,te,K,b,me),b.onAfterRender(R,G,Y,te,K,me)}function Pr(b,G,Y){G.isScene!==!0&&(G=J);let te=ee.get(b),K=T.state.lights,me=T.state.shadowsArray,xe=K.state.version,Ae=ge.getParameters(b,K.state,me,G,Y,T.state.lightProbeGridArray),Re=ge.getProgramCacheKey(Ae),Oe=te.programs;te.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?G.environment:null,te.fog=G.fog;let Ze=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;te.envMap=ke.get(b.envMap||te.environment,Ze),te.envMapRotation=te.environment!==null&&b.envMap===null?G.environmentRotation:b.envMapRotation,Oe===void 0&&(b.addEventListener("dispose",yl),Oe=new Map,te.programs=Oe);let Je=Oe.get(Re);if(Je!==void 0){if(te.currentProgram===Je&&te.lightsStateVersion===xe)return Cl(b,Ae),Je}else Ae.uniforms=ge.getUniforms(b),U!==null&&b.isNodeMaterial&&U.build(b,Y,Ae),b.onBeforeCompile(Ae,R),Je=ge.acquireProgram(Ae,Re),Oe.set(Re,Je),te.uniforms=Ae.uniforms;let Ne=te.uniforms;return(b.isShaderMaterial||b.isRawShaderMaterial)&&b.clipping!==!0||(Ne.clippingPlanes=Se.uniform),Cl(b,Ae),te.needsLights=function(Ke){return Ke.isMeshLambertMaterial||Ke.isMeshToonMaterial||Ke.isMeshPhongMaterial||Ke.isMeshStandardMaterial||Ke.isShadowMaterial||Ke.isShaderMaterial&&Ke.lights===!0}(b),te.lightsStateVersion=xe,te.needsLights&&(Ne.ambientLightColor.value=K.state.ambient,Ne.lightProbe.value=K.state.probe,Ne.directionalLights.value=K.state.directional,Ne.directionalLightShadows.value=K.state.directionalShadow,Ne.spotLights.value=K.state.spot,Ne.spotLightShadows.value=K.state.spotShadow,Ne.rectAreaLights.value=K.state.rectArea,Ne.ltc_1.value=K.state.rectAreaLTC1,Ne.ltc_2.value=K.state.rectAreaLTC2,Ne.pointLights.value=K.state.point,Ne.pointLightShadows.value=K.state.pointShadow,Ne.hemisphereLights.value=K.state.hemi,Ne.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ne.spotLightMatrix.value=K.state.spotLightMatrix,Ne.spotLightMap.value=K.state.spotLightMap,Ne.pointShadowMatrix.value=K.state.pointShadowMatrix),te.lightProbeGrid=T.state.lightProbeGridArray.length>0,te.currentProgram=Je,te.uniformsList=null,Je}function wl(b){if(b.uniformsList===null){let G=b.currentProgram.getUniforms();b.uniformsList=wr.seqWithValue(G.seq,b.uniforms)}return b.uniformsList}function Cl(b,G){let Y=ee.get(b);Y.outputColorSpace=G.outputColorSpace,Y.batching=G.batching,Y.batchingColor=G.batchingColor,Y.instancing=G.instancing,Y.instancingColor=G.instancingColor,Y.instancingMorph=G.instancingMorph,Y.skinning=G.skinning,Y.morphTargets=G.morphTargets,Y.morphNormals=G.morphNormals,Y.morphColors=G.morphColors,Y.morphTargetsCount=G.morphTargetsCount,Y.numClippingPlanes=G.numClippingPlanes,Y.numIntersection=G.numClipIntersection,Y.vertexAlphas=G.vertexAlphas,Y.vertexTangents=G.vertexTangents,Y.toneMapping=G.toneMapping}Xi.setAnimationLoop(function(b){Zs&&Zs(b)}),typeof self<"u"&&Xi.setContext(self),this.setAnimationLoop=function(b){Zs=b,st.setAnimationLoop(b),b===null?Xi.stop():Xi.start()},st.addEventListener("sessionstart",Sl),st.addEventListener("sessionend",bl),this.render=function(b,G){if(G!==void 0&&G.isCamera!==!0)return void De("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(V===!0)return;U!==null&&U.renderStart(b,G);let Y=st.enabled===!0&&st.isPresenting===!0,te=O!==null&&(z===null||Y)&&O.begin(R,z);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),st.enabled!==!0||st.isPresenting!==!0||O!==null&&O.isCompositing()!==!1||(st.cameraAutoUpdate===!0&&st.updateCamera(G),G=st.getCamera()),b.isScene===!0&&b.onBeforeRender(R,b,G,z),T=he.get(b,P.length),T.init(G),T.state.textureUnits=de.getTextureUnits(),P.push(T),E.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),y.setFromProjectionMatrix(E,Po,G.reversedDepth),N=this.localClippingEnabled,L=Se.init(this.clippingPlanes,N),S=fe.get(b,A.length),S.init(),A.push(S),st.enabled===!0&&st.isPresenting===!0){let me=R.xr.getDepthSensingMesh();me!==null&&Js(me,G,-1/0,R.sortObjects)}Js(b,G,0,R.sortObjects),S.finish(),R.sortObjects===!0&&S.sort(be,C,G.reversedDepth),ue=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,ue&&Ce.addToRenderList(S,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),L===!0&&Se.beginShadows();let K=T.state.shadowsArray;if(ye.render(K,b,G),L===!0&&Se.endShadows(),(te&&O.hasRenderPass())===!1){let{opaque:me,transmissive:xe}=S;if(T.setupLights(),G.isArrayCamera){let Ae=G.cameras;if(xe.length>0)for(let Re=0,Oe=Ae.length;Re<Oe;Re++)El(me,xe,b,Ae[Re]);ue&&Ce.render(b);for(let Re=0,Oe=Ae.length;Re<Oe;Re++){let Ze=Ae[Re];Tl(S,b,Ze,Ze.viewport)}}else xe.length>0&&El(me,xe,b,G),ue&&Ce.render(b),Tl(S,b,G)}z!==null&&j===0&&(de.updateMultisampleRenderTarget(z),de.updateRenderTargetMipmap(z)),te&&O.end(R),b.isScene===!0&&b.onAfterRender(R,b,G),At.resetDefaultState(),ae=-1,le=null,P.pop(),P.length>0?(T=P[P.length-1],de.setTextureUnits(T.state.textureUnits),L===!0&&Se.setGlobalState(R.clippingPlanes,T.state.camera)):T=null,A.pop(),S=A.length>0?A[A.length-1]:null,U!==null&&U.renderEnd()},this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(b,G,Y){let te=ee.get(b);te.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,te.__autoAllocateDepthBuffer===!1&&(te.__useRenderToTexture=!1),ee.get(b.texture).__webglTexture=G,ee.get(b.depthTexture).__webglTexture=te.__autoAllocateDepthBuffer?void 0:Y,te.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,G){let Y=ee.get(b);Y.__webglFramebuffer=G,Y.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(b,G=0,Y=0){z=b,W=G,j=Y;let te=null,K=!1,me=!1;if(b){let xe=ee.get(b);if(xe.__useDefaultFramebuffer!==void 0)return se.bindFramebuffer(B.FRAMEBUFFER,xe.__webglFramebuffer),Ee.copy(b.viewport),ve.copy(b.scissor),q=b.scissorTest,se.viewport(Ee),se.scissor(ve),se.setScissorTest(q),void(ae=-1);if(xe.__webglFramebuffer===void 0)de.setupRenderTarget(b);else if(xe.__hasExternalTextures)de.rebindTextures(b,ee.get(b.texture).__webglTexture,ee.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Oe=b.depthTexture;if(xe.__boundDepthTexture!==Oe){if(Oe!==null&&ee.has(Oe)&&(b.width!==Oe.image.width||b.height!==Oe.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");de.setupDepthRenderbuffer(b)}}let Ae=b.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(me=!0);let Re=ee.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(te=Array.isArray(Re[G])?Re[G][Y]:Re[G],K=!0):te=b.samples>0&&de.useMultisampledRTT(b)===!1?ee.get(b).__webglMultisampledFramebuffer:Array.isArray(Re)?Re[Y]:Re,Ee.copy(b.viewport),ve.copy(b.scissor),q=b.scissorTest}else Ee.copy(x).multiplyScalar(ie).floor(),ve.copy(I).multiplyScalar(ie).floor(),q=F;if(Y!==0&&(te=Z),se.bindFramebuffer(B.FRAMEBUFFER,te)&&se.drawBuffers(b,te),se.viewport(Ee),se.scissor(ve),se.setScissorTest(q),K){let xe=ee.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe.__webglTexture,Y)}else if(me){let xe=G;for(let Ae=0;Ae<b.textures.length;Ae++){let Re=ee.get(b.textures[Ae]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Ae,Re.__webglTexture,Y,xe)}}else if(b!==null&&Y!==0){let xe=ee.get(b.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,xe.__webglTexture,Y)}ae=-1},this.readRenderTargetPixels=function(b,G,Y,te,K,me,xe,Ae=0){if(!b||!b.isWebGLRenderTarget)return void De("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=ee.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xe!==void 0&&(Re=Re[xe]),Re){se.bindFramebuffer(B.FRAMEBUFFER,Re);try{let Oe=b.textures[Ae],Ze=Oe.format,Je=Oe.type;if(b.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ae),!we.textureFormatReadable(Ze))return void De("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!we.textureTypeReadable(Je))return void De("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");G>=0&&G<=b.width-te&&Y>=0&&Y<=b.height-K&&B.readPixels(G,Y,te,K,yt.convert(Ze),yt.convert(Je),me)}finally{let Oe=z!==null?ee.get(z).__webglFramebuffer:null;se.bindFramebuffer(B.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(b,G,Y,te,K,me,xe,Ae=0){if(!b||!b.isWebGLRenderTarget)throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=ee.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xe!==void 0&&(Re=Re[xe]),Re){if(G>=0&&G<=b.width-te&&Y>=0&&Y<=b.height-K){se.bindFramebuffer(B.FRAMEBUFFER,Re);let Oe=b.textures[Ae],Ze=Oe.format,Je=Oe.type;if(b.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ae),!we.textureFormatReadable(Ze))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!we.textureTypeReadable(Je))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ne=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Ne),B.bufferData(B.PIXEL_PACK_BUFFER,me.byteLength,B.STREAM_READ),B.readPixels(G,Y,te,K,yt.convert(Ze),yt.convert(Je),0);let Ke=z!==null?ee.get(z).__webglFramebuffer:null;se.bindFramebuffer(B.FRAMEBUFFER,Ke);let _t=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await sh(B,_t,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Ne),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,me),B.deleteBuffer(Ne),B.deleteSync(_t),me}throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,G=null,Y=0){let te=Math.pow(2,-Y),K=Math.floor(b.image.width*te),me=Math.floor(b.image.height*te),xe=G!==null?G.x:0,Ae=G!==null?G.y:0;de.setTexture2D(b,0),B.copyTexSubImage2D(B.TEXTURE_2D,Y,0,0,xe,Ae,K,me),se.unbindTexture()},this.copyTextureToTexture=function(b,G,Y=null,te=null,K=0,me=0){let xe,Ae,Re,Oe,Ze,Je,Ne,Ke,_t,mt=b.isCompressedTexture?b.mipmaps[me]:b.image;if(Y!==null)xe=Y.max.x-Y.min.x,Ae=Y.max.y-Y.min.y,Re=Y.isBox3?Y.max.z-Y.min.z:1,Oe=Y.min.x,Ze=Y.min.y,Je=Y.isBox3?Y.min.z:0;else{let ai=Math.pow(2,-K);xe=Math.floor(mt.width*ai),Ae=Math.floor(mt.height*ai),Re=b.isDataArrayTexture?mt.depth:b.isData3DTexture?Math.floor(mt.depth*ai):1,Oe=0,Ze=0,Je=0}te!==null?(Ne=te.x,Ke=te.y,_t=te.z):(Ne=0,Ke=0,_t=0);let at=yt.convert(G.format),je=yt.convert(G.type),ot;G.isData3DTexture?(de.setTexture3D(G,0),ot=B.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(de.setTexture2DArray(G,0),ot=B.TEXTURE_2D_ARRAY):(de.setTexture2D(G,0),ot=B.TEXTURE_2D),se.activeTexture(B.TEXTURE0),se.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,G.flipY),se.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),se.pixelStorei(B.UNPACK_ALIGNMENT,G.unpackAlignment);let bt=se.getParameter(B.UNPACK_ROW_LENGTH),Be=se.getParameter(B.UNPACK_IMAGE_HEIGHT),He=se.getParameter(B.UNPACK_SKIP_PIXELS),Jt=se.getParameter(B.UNPACK_SKIP_ROWS),Ks=se.getParameter(B.UNPACK_SKIP_IMAGES);se.pixelStorei(B.UNPACK_ROW_LENGTH,mt.width),se.pixelStorei(B.UNPACK_IMAGE_HEIGHT,mt.height),se.pixelStorei(B.UNPACK_SKIP_PIXELS,Oe),se.pixelStorei(B.UNPACK_SKIP_ROWS,Ze),se.pixelStorei(B.UNPACK_SKIP_IMAGES,Je);let Lr=b.isDataArrayTexture||b.isData3DTexture,Jn=G.isDataArrayTexture||G.isData3DTexture;if(b.isDepthTexture){let ai=ee.get(b),xn=ee.get(G),vi=ee.get(ai.__renderTarget),$s=ee.get(xn.__renderTarget);se.bindFramebuffer(B.READ_FRAMEBUFFER,vi.__webglFramebuffer),se.bindFramebuffer(B.DRAW_FRAMEBUFFER,$s.__webglFramebuffer);for(let yn=0;yn<Re;yn++)Lr&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ee.get(b).__webglTexture,K,Je+yn),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ee.get(G).__webglTexture,me,_t+yn)),B.blitFramebuffer(Oe,Ze,xe,Ae,Ne,Ke,xe,Ae,B.DEPTH_BUFFER_BIT,B.NEAREST);se.bindFramebuffer(B.READ_FRAMEBUFFER,null),se.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(K!==0||b.isRenderTargetTexture||ee.has(b)){let ai=ee.get(b),xn=ee.get(G);se.bindFramebuffer(B.READ_FRAMEBUFFER,$),se.bindFramebuffer(B.DRAW_FRAMEBUFFER,D);for(let vi=0;vi<Re;vi++)Lr?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ai.__webglTexture,K,Je+vi):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ai.__webglTexture,K),Jn?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,xn.__webglTexture,me,_t+vi):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,xn.__webglTexture,me),K!==0?B.blitFramebuffer(Oe,Ze,xe,Ae,Ne,Ke,xe,Ae,B.COLOR_BUFFER_BIT,B.NEAREST):Jn?B.copyTexSubImage3D(ot,me,Ne,Ke,_t+vi,Oe,Ze,xe,Ae):B.copyTexSubImage2D(ot,me,Ne,Ke,Oe,Ze,xe,Ae);se.bindFramebuffer(B.READ_FRAMEBUFFER,null),se.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Jn?b.isDataTexture||b.isData3DTexture?B.texSubImage3D(ot,me,Ne,Ke,_t,xe,Ae,Re,at,je,mt.data):G.isCompressedArrayTexture?B.compressedTexSubImage3D(ot,me,Ne,Ke,_t,xe,Ae,Re,at,mt.data):B.texSubImage3D(ot,me,Ne,Ke,_t,xe,Ae,Re,at,je,mt):b.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,me,Ne,Ke,xe,Ae,at,je,mt.data):b.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,me,Ne,Ke,mt.width,mt.height,at,mt.data):B.texSubImage2D(B.TEXTURE_2D,me,Ne,Ke,xe,Ae,at,je,mt);se.pixelStorei(B.UNPACK_ROW_LENGTH,bt),se.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Be),se.pixelStorei(B.UNPACK_SKIP_PIXELS,He),se.pixelStorei(B.UNPACK_SKIP_ROWS,Jt),se.pixelStorei(B.UNPACK_SKIP_IMAGES,Ks),me===0&&G.generateMipmaps&&B.generateMipmap(ot),se.unbindTexture()},this.initRenderTarget=function(b){ee.get(b).__webglFramebuffer===void 0&&de.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?de.setTextureCube(b,0):b.isData3DTexture?de.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?de.setTexture2DArray(b,0):de.setTexture2D(b,0),se.unbindTexture()},this.resetState=function(){W=0,j=0,z=null,se.reset(),At.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Po}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}var Sp=3.62,dt=Math.PI,Dt=(e)=>e*dt/180,$e=(e,t,i)=>new w(e,t,i);function*bp(){let e=11,t=()=>{return e=e*16807%2147483647,e/2147483647},i=(X,re,ge)=>X+(re-X)*ge,n=(X,re,ge)=>{let Q=Math.min(1,Math.max(0,(ge-X)/(re-X)));return Q*Q*(3-2*Q)};function r(X,re,ge,Q){let fe=document.createElement("canvas");fe.width=X,fe.height=re,ge(fe.getContext("2d"),X,re);let he=new ws(fe);if(he.wrapS=he.wrapT=cs,he.anisotropy=4,Q&&Q.srgb)he.colorSpace=vs;if(Q&&Q.repeat)he.repeat.set(Q.repeat[0],Q.repeat[1]);return he}let s=r(4,512,(X,re,ge)=>{for(let Q=0;Q<ge;Q++){let fe=118+t()*120|0;X.fillStyle=`rgb(${fe},${fe},${fe})`,X.fillRect(0,Q,re,1)}},{repeat:[1,2]}),a=[],o=r(4,512,(X,re,ge)=>{for(let Q=0;Q<ge;Q++){let fe=1-Q/ge,he=(t()-0.5)*16,Se=208+he,ye=212+he,Ce=219+he;if(t()<0.035)Se-=46,ye-=46,Ce-=44;let Ye=Math.max(n(0.07,0.01,fe),n(0.95,0.995,fe))*(0.75+t()*0.25);Se=i(Se,118,Ye),ye=i(ye,72,Ye),Ce=i(Ce,44,Ye),a.push(Ye),X.fillStyle=`rgb(${Se|0},${ye|0},${Ce|0})`,X.fillRect(0,Q,re,1)}},{srgb:!0}),l=r(4,512,(X,re,ge)=>{for(let Q=0;Q<ge;Q++){let fe=a[Q],he=i(0.2+t()*0.08,0.86,fe),Se=i(1,0.35,fe);X.fillStyle=`rgb(255,${he*255|0},${Se*255|0})`,X.fillRect(0,Q,re,1)}}),c=r(64,64,(X,re,ge)=>{let Q=X.createImageData(re,ge);for(let fe=0;fe<re*ge;fe++){let he=90+t()*120|0;Q.data[fe*4]=Q.data[fe*4+1]=Q.data[fe*4+2]=he,Q.data[fe*4+3]=255}X.putImageData(Q,0,0)},{repeat:[3,3]}),h=r(1024,32,(X,re,ge)=>{X.fillStyle="#8f9399",X.fillRect(0,0,re,ge),X.fillStyle="#7b5a41",X.fillRect(0,0,re,3),X.fillRect(0,ge-3,re,3);let Q=44,fe=re/Q;X.fillStyle="#060607";for(let he=0;he<Q;he++){let Se=he*fe+fe*0.22,ye=fe*0.56,Ce=ge*0.3,Ye=ge*0.4,pt=Ye/2;X.beginPath(),X.moveTo(Se+pt,Ce),X.arcTo(Se+ye,Ce,Se+ye,Ce+Ye,pt),X.arcTo(Se+ye,Ce+Ye,Se,Ce+Ye,pt),X.arcTo(Se,Ce+Ye,Se,Ce,pt),X.arcTo(Se,Ce,Se+ye,Ce,pt),X.fill()}},{srgb:!0});yield;let d={discFace:new fn({map:o,roughnessMap:l,metalnessMap:l,roughness:1,metalness:1,bumpMap:s,bumpScale:1.4,anisotropy:0.7,anisotropyRotation:dt/2}),discEdge:new zt({map:h,roughness:0.55,metalness:0.9}),steel:new zt({color:13225170,roughness:0.3,metalness:1}),chrome:new zt({color:15330287,roughness:0.1,metalness:1}),zinc:new zt({color:12172481,roughness:0.36,metalness:1}),cast:new zt({color:5659232,roughness:0.66,metalness:0.9,bumpMap:c,bumpScale:1.2}),rusty:new zt({color:4928807,roughness:0.86,metalness:0.5,bumpMap:c,bumpScale:1.6}),rustyIn:new zt({color:4928807,roughness:0.86,metalness:0.5,side:Ft}),alu:new zt({color:11449016,roughness:0.48,metalness:1,bumpMap:c,bumpScale:0.7}),paint:new fn({color:1777187,roughness:0.4,metalness:0.55,clearcoat:0.7,clearcoatRoughness:0.22}),shield:new zt({color:1777187,roughness:0.5,metalness:0.55,side:Ft}),spring:new fn({color:2237996,roughness:0.28,metalness:0.65,clearcoat:1,clearcoatRoughness:0.1}),rubber:new zt({color:1052689,roughness:0.8,metalness:0}),caliper:new fn({color:3159098,roughness:0.42,metalness:0.8,clearcoat:0.5,clearcoatRoughness:0.25,emissive:0})};function u(X,re,ge){let Q=new St(X,re);return ge.add(Q),Q}function p(X,re,ge,Q,fe,he,Se,ye){let Ce=u(new rt(X,X,re,ye||28),ge,Q);return Ce.rotation.x=dt/2,Ce.position.set(fe,he,Se),Ce}function g(X,re,ge,Q,fe,he,Se,ye){let Ce=u(new rt(X,X,re,ye||28),ge,Q);return Ce.rotation.z=dt/2,Ce.position.set(fe,he,Se),Ce}function m(X,re,ge){let Q=ge.clone().sub(re);return X.position.copy(re),X.quaternion.setFromUnitVectors($e(0,1,0),Q.normalize()),X}function v(X,re,ge,Q,fe,he){let Se=re.clone().sub(X),ye=Se.length(),Ce=he?new rt(ge,ge,ye,20):new hn(ge,ye,5,16),Ye=u(Ce,Q,fe);return Ye.position.copy(X).addScaledVector(Se,0.5),Ye.quaternion.setFromUnitVectors($e(0,1,0),Se.normalize()),Ye}function f(X,re,ge,Q){return u(new dn(X.map((fe)=>new ne(fe[0],fe[1])),Q||40),re,ge)}function _(X,re,ge,Q,fe,he){let Se=[],ye=fe*2;for(let Ce=0;Ce<=ye;Ce++){let Ye=Ce/ye;Se.push([i(X,re,Ye)+(Ce%2?he:0),ge+Ye*Q])}return Se}function M(X,re,ge,Q){let fe=new qn(X,re,ge,Q),he=fe.attributes.uv,Se=0;for(let ye=0;ye<=Q;ye++)for(let Ce=0;Ce<=ge;Ce++)he.setXY(Se++,Ce/ge*6,ye/Q);return he.needsUpdate=!0,fe}function S(X,re,ge,Q,fe){let he=new un,Se=(X+re)/2,ye=(re-X)/2;if(he.absarc(0,0,re,ge,Q,!1),fe)he.absarc(Math.cos(Q)*Se,Math.sin(Q)*Se,ye,Q,Q+dt,!1);if(he.absarc(0,0,X,Q,ge,!0),fe)he.absarc(Math.cos(ge)*Se,Math.sin(ge)*Se,ye,ge+dt,ge+dt*2,!1);return he.closePath(),he}function T(X,re,ge,Q){let fe=new ut;return fe.position.set(re,ge,Q),fe.userData.anchor=1,X.add(fe),fe}let A=new ht,P=new ht;A.add(P);let O=[],R=(X,re,ge,Q)=>{return O.push({o:X,rest:X.position.clone(),v:$e(re,ge,Q)}),X},V=new ht;P.add(V);let U=new ht;V.add(U);let Z=M(0.565,1,200,12);u(Z,d.discFace,U).position.z=0.085;let $=u(Z,d.discFace,U);$.position.z=-0.085,$.rotation.y=dt,u(new rt(1,1,0.17,120,1,!0),d.discEdge,U).rotation.x=dt/2,[0.074,-0.074].forEach((X)=>{u(new pn(0.989,0.0115,6,120),d.steel,U).position.z=X}),u(new rt(0.565,0.565,0.17,64,1,!0),d.rustyIn,U).rotation.x=dt/2,f([[0.565,0.085],[0.52,0.088],[0.5,0.11],[0.5,0.27],[0.49,0.295],[0.465,0.305],[0.2,0.305]],d.cast,U,72).rotation.x=dt/2;for(let X=0;X<5;X++){let re=X/5*dt*2+0.3;p(0.034,0.2,d.zinc,U,Math.cos(re)*0.31,Math.sin(re)*0.31,0.4,12),p(0.05,0.012,d.rusty,U,Math.cos(re)*0.31,Math.sin(re)*0.31,0.31,12)}p(0.2,0.07,d.rusty,U,0,0,0.33,32),p(0.108,0.075,d.zinc,U,0,0,0.395,6),p(0.06,0.05,d.steel,U,0,0,0.45,16),R(V,-0.1,0,0.8),yield;let D=new ht;P.add(D);let W=u(new Hi(S(0.69,1.1,Dt(134),Dt(186),!0),{depth:0.32,bevelEnabled:!0,bevelThickness:0.06,bevelSize:0.055,bevelSegments:6,curveSegments:28}),d.caliper,D);W.position.z=-0.16,yield,[146,174].forEach((X)=>{let re=Dt(X);p(0.118,0.05,d.caliper,D,Math.cos(re)*0.895,Math.sin(re)*0.895,0.235,28),u(new pn(0.118,0.018,8,28),d.caliper,D).position.set(Math.cos(re)*0.895,Math.sin(re)*0.895,0.258),p(0.062,0.02,d.paint,D,Math.cos(re)*0.895,Math.sin(re)*0.895,0.262,20)}),yield,u(new Hi(S(0.66,1.06,Dt(127),Dt(193),!0),{depth:0.1,bevelEnabled:!0,bevelThickness:0.02,bevelSize:0.02,bevelSegments:2,curveSegments:22}),d.cast,D).position.z=-0.36,[124,196].forEach((X)=>{let re=Dt(X);p(0.05,0.26,d.rubber,D,Math.cos(re)*0.9,Math.sin(re)*0.9,-0.2,12)}),u(new ki(new Xn([$e(-0.82,0.5,-0.3),$e(-0.78,0.8,-0.52),$e(-0.48,1.04,-0.66),$e(-0.16,1.13,-0.64)]),28,0.024,8,!1),d.rubber,D),R(D,-0.5,0.2,1),yield;let j=new ht;P.add(j),f([[0,-0.44],[0.25,-0.44],[0.31,-0.41],[0.335,-0.34],[0.335,-0.2],[0.3,-0.14],[0,-0.14]],d.cast,j,40).rotation.x=dt/2,u(new dn([new ne(0.36,-0.15),new ne(0.6,-0.17),new ne(0.93,-0.16),new ne(0.965,-0.13)],56,Dt(105),Dt(255)),d.shield,j).rotation.x=dt/2,v($e(0,0.22,-0.4),$e(0.01,0.6,-0.5),0.13,d.cast,j),v($e(0,-0.2,-0.4),$e(0,-0.56,-0.4),0.115,d.cast,j),v($e(0.1,-0.08,-0.4),$e(0.58,-0.2,-0.52),0.075,d.cast,j),yield;let z=0.86,ae=$e(0,0.48,-0.5),le=$e(0.03,1,-0.17).normalize(),Ee=new kt().setFromUnitVectors($e(0,1,0),le),ve=new ht;ve.position.copy(ae),ve.quaternion.copy(Ee),ve.scale.y=z,P.add(ve);let q=new ht;q.position.copy(ae),q.quaternion.copy(Ee),q.scale.y=z,A.add(q),u(new rt(0.19,0.19,0.34,28),d.cast,ve).position.y=0.12,[0.03,0.2].forEach((X)=>{g(0.034,0.52,d.zinc,ve,0,X,0.12,10),g(0.06,0.05,d.zinc,ve,0.27,X,0.12,6),g(0.06,0.05,d.zinc,ve,-0.27,X,0.12,6)}),u(new rt(0.125,0.125,1,28),d.paint,ve).position.y=0.5,f([[0.125,0.93],[0.2,0.95],[0.33,1],[0.36,1.02],[0.365,1.04],[0.33,1.045],[0.13,0.99]],d.paint,ve,48);let pe=u(new hn(0.05,0.16,4,10),d.paint,ve);pe.rotation.z=dt/2,pe.position.set(0.2,0.72,0);class Me extends Bt{constructor(X,re,ge){super();this.R=X,this.L=re,this.n=ge}getPoint(X,re){re=re||new w;let ge=X*this.n*dt*2,Q=X-Math.sin(X*dt*2)/(dt*2)*0.6;return re.set(Math.cos(ge)*this.R,Q*this.L,Math.sin(ge)*this.R)}}let ce=0.95,Te=new ht;Te.position.y=1.035,ve.add(Te),u(new ki(new Me(0.285,ce,5.4),300,0.044,10,!1),d.spring,Te),R(Te,0,0.3,0),u(new rt(0.045,0.045,1.25,16),d.chrome,q).position.y=1.48,f(_(0.085,0.1,1.5,0.46,6,0.022),d.rubber,q,28),f([[0.13,2.05],[0.33,1.995],[0.36,1.985],[0.368,2],[0.34,2.03],[0.2,2.1],[0.13,2.1]],d.paint,q,48),u(new rt(0.26,0.28,0.1,36),d.rubber,q).position.y=2.15,u(new rt(0.31,0.31,0.03,36),d.zinc,q).position.y=2.215;for(let X=0;X<3;X++){let re=X/3*dt*2+0.5;u(new rt(0.027,0.027,0.17,10),d.zinc,q).position.set(Math.cos(re)*0.22,2.31,Math.sin(re)*0.22)}u(new rt(0.075,0.075,0.06,6),d.zinc,q).position.y=2.26,u(new rt(0.03,0.03,0.1,10),d.chrome,q).position.y=2.33,R(q,le.x*0.66,le.y*0.66,le.z*0.66),yield;let ie=new ht;P.add(ie);let be=[[-0.13,0.26],[0.13,0.26],[0.2,0.5],[0.42,1],[0.8,1.45],[0.84,1.74],[0.56,1.8],[0.3,1.5],[0.02,1.3],[-0.28,1.52],[-0.46,1.9],[-0.74,1.92],[-0.8,1.64],[-0.46,1],[-0.2,0.5]],C=new un;C.moveTo(be[0][0],be[0][1]),C.splineThru(be.slice(1).map((X)=>new ne(X[0],X[1]))),C.closePath();let x=new Fn;x.absellipse(0,0.86,0.1,0.2,0,dt*2,!0),C.holes.push(x);let I=u(new Hi(C,{depth:0.07,bevelEnabled:!0,bevelThickness:0.028,bevelSize:0.03,bevelSegments:3,curveSegments:14}),d.alu,ie);I.rotation.x=-dt/2,I.position.y=-0.72,u(new si(0.105,20,14),d.zinc,ie).position.set(0,-0.6,-0.4),u(new rt(0.075,0.11,0.09,20),d.rubber,ie).position.set(0,-0.625,-0.4),[[0.7,-1.62],[-0.63,-1.78]].forEach((X)=>{g(0.155,0.22,d.alu,ie,X[0],-0.685,X[1],28),g(0.122,0.27,d.rubber,ie,X[0],-0.685,X[1],28),g(0.062,0.31,d.zinc,ie,X[0],-0.685,X[1],16),g(0.06,0.05,d.zinc,ie,X[0]+0.17,-0.685,X[1],6)}),R(ie,0.1,-0.6,0),yield;let F=$e(0.27,0.72*z,0).applyQuaternion(Ee).add(ae),y=$e(0.52,0,-1.14),L=new ht;L.position.copy(F),P.add(L);let N=y.clone().sub(F);v($e(0,0,0),N,0.03,d.zinc,L,!0),[$e(0,0,0),N].forEach((X,re)=>{u(new si(0.072,16,12),d.cast,L).position.copy(X);let ge=u(new rt(0.05,0.078,0.07,16),d.rubber,L);ge.rotation.z=dt/2,ge.position.copy(X).add($e(re?0.07:-0.07,0,0)),g(0.045,0.04,d.zinc,L,X.x+(re?0.13:-0.13),X.y,X.z,6)}),R(L,0.55,0.1,0.25);let E=new ht;P.add(E),u(new ki(new Xn([y.clone().add($e(0.14,0,0)),$e(0.72,-0.02,-1.26),$e(0.9,-0.03,-1.6),$e(0.98,-0.03,-2.1)]),36,0.055,12,!1),d.paint,E),u(new si(0.075,14,10),d.paint,E).position.copy(y).add($e(0.14,0,0)),R(E,0.7,-0.1,0.2);let H=new ht;P.add(H);let k=$e(0.6,-0.2,-0.52),J=$e(0.72,-0.14,-1.5),ue=$e(0.76,-0.12,-2);u(new si(0.09,16,12),d.cast,H).position.copy(k),u(new rt(0.06,0.09,0.08,16),d.rubber,H).position.copy(k).add($e(0,0.07,0)),v(k,J,0.036,d.zinc,H,!0);let Ie=v(k.clone().lerp(J,0.22),k.clone().lerp(J,0.34),0.056,d.zinc,H,!0);Ie.geometry=new rt(0.056,0.056,0.13,6),m(f(_(0.075,0.13,0,0.5,7,0.028),d.rubber,H,24),J,ue),R(H,0.5,-0.34,0.1),yield;let oe=new ht;P.add(oe);let we=$e(0,0,-0.42),se=$e(0,-0.1,-2.1),Pe=new ht;m(Pe,we,se),oe.add(Pe),f([[0,0],[0.26,0],[0.27,0.14],[0.22,0.2]],d.cast,Pe,32),f(_(0.2,0.1,0.2,0.36,5,0.035),d.rubber,Pe,32),u(new rt(0.065,0.065,0.8,16),d.paint,Pe).position.y=0.95,f(_(0.1,0.19,1.3,0.3,4,0.03),d.rubber,Pe,32),f([[0.19,1.6],[0.2,1.7],[0,1.7]],d.cast,Pe,32),R(oe,0.1,-0.12,-0.6),yield;let ee={link:T(L,N.x*0.5,N.y*0.5,N.z*0.5),bush:T(ie,0.7,-0.62,-1.62),shock:T(ve,0.14,0.55,0.02),spring:T(Te,0.1,0.5,0.27),pads:T(D,Math.cos(Dt(141))*0.9,Math.sin(Dt(141))*0.9,0.27),rim:T(V,Math.cos(Dt(62))*0.93,Math.sin(Dt(62))*0.93,0.09),discf:T(V,Math.cos(Dt(-38))*0.8,Math.sin(Dt(-38))*0.8,0.09),toe:T(H,(k.x+J.x)/2,(k.y+J.y)/2+0.02,(k.z+J.z)/2),tieend:T(H,k.x,k.y+0.06,k.z),rack:T(H,(J.x+ue.x)/2,(J.y+ue.y)/2,(J.z+ue.z)/2),hub:T(V,0,0,0.46),bearing:T(j,0,0,-0.3),ball:T(ie,0,-0.6,-0.4),boot:T(oe,0,-0.03,-0.85),mount:T(q,0,2.2,0)};function de(X,re){X.updateMatrixWorld(!0);let ge=new ze().copy(X.matrixWorld).invert(),Q=new Map,fe=[];(function he(Se){for(let ye of Se.children){if(re.has(ye))continue;if(ye.isMesh){let Ce=new ze().multiplyMatrices(ge,ye.matrixWorld),Ye=ye.geometry.clone().applyMatrix4(Ce);(Q.get(ye.material)||Q.set(ye.material,[]).get(ye.material)).push(Ye),fe.push(ye)}else if(!ye.userData.anchor)he(ye)}})(X),fe.forEach((he)=>{he.parent.remove(he),he.geometry.dispose()}),Q.forEach((he,Se)=>{let ye=0,Ce=0;he.forEach((wt)=>{ye+=wt.attributes.position.count,Ce+=wt.index?wt.index.count:wt.attributes.position.count});let Ye=new Float32Array(ye*3),pt=new Float32Array(ye*3),Nt=new Float32Array(ye*2),yt=new(ye>65535?Uint32Array:Uint16Array)(Ce),At=0,Wi=0;he.forEach((wt)=>{if(Ye.set(wt.attributes.position.array,At*3),pt.set(wt.attributes.normal.array,At*3),wt.attributes.uv)Nt.set(wt.attributes.uv.array,At*2);let st=wt.attributes.position.count;if(wt.index){let _i=wt.index.array;for(let vn=0;vn<_i.length;vn++)yt[Wi++]=_i[vn]+At}else for(let _i=0;_i<st;_i++)yt[Wi++]=At+_i;At+=st,wt.dispose()});let B=new nt;B.setAttribute("position",new Et(Ye,3)),B.setAttribute("normal",new Et(pt,3)),B.setAttribute("uv",new Et(Nt,2)),B.setIndex(new Et(yt,1));let _n=new St(B,Se);_n.castShadow=!0,_n.receiveShadow=!0,X.add(_n)})}let ke=[U,V,D,j,ve,Te,q,ie,L,E,H,oe],it=new Set(ke);for(let X of ke)de(X,it),yield;return{root:A,uns:P,strutS:q,spin:U,springG:Te,springL0:ce*z,linkG:L,discG:V,calG:D,axis:le,parts:O,anchors:ee,mats:d}}function*Qh(e,t){t=t||{};let i=new vl({canvas:e,antialias:!0,alpha:!0,powerPreference:"high-performance",preserveDrawingBuffer:!!t.capture});i.setClearColor(0,0),i.toneMapping=ur,i.toneMappingExposure=1.12,i.shadowMap.enabled=!0,i.shadowMap.type=tn;let n=new _r;yield;let r=new _r,s=(D,W,j,z,ae,le,Ee)=>{let ve=new St(D,new zi({color:new Fe(W,j,z),side:Ft}));return ve.position.set(ae,le,Ee),r.add(ve),ve};r.add(new St(new si(30,12,8),new zi({color:329482,side:Pt}))),s(new Wt(10,0.1,1),5,6.2,7.6,1,7,1.5),s(new si(1.25,12,8),24,15,7,-6.5,4.5,6),s(new Wt(0.3,8,3),2.2,3.6,6,9,1,-4),s(new Wt(16,0.1,16),0.15,0.12,0.1,0,-6,0),s(new Wt(2.6,1.5,0.1),2,2.2,2.6,4.5,2.5,9),s(new Wt(1.2,3.2,0.1),1,0.8,0.6,-8,-1,3).rotation.y=1.1;let a=new Rr(128,{type:ri}),o=new Sr(0.1,100,a);if(yield,i.compile(r,o.children[0]),o.updateMatrixWorld(),o.coordinateSystem!==i.coordinateSystem)o.coordinateSystem=i.coordinateSystem,o.updateCoordinateSystem();for(let D=0;D<6;D++)yield,i.setRenderTarget(a,D),i.render(r,o.children[D]);i.setRenderTarget(null),r.traverse((D)=>{if(D.isMesh)D.geometry.dispose(),D.material.dispose()}),yield;let l=new Cr(i);l.compileCubemapShader(),yield,n.environment=l.fromCubemap(a.texture).texture,l.dispose(),a.dispose(),yield;let c=new It(24,1,0.1,100),h=new ht;n.add(h);let d=yield*bp();d.root.position.set(-0.46,-0.76,0.55),h.add(d.root);let u=new ks(16765088,0,0,0.78,0.9,1.5);u.castShadow=!0,u.shadow.mapSize.set(t.shadow||1024,t.shadow||1024),u.shadow.bias=-0.0005,u.shadow.normalBias=0.03,u.shadow.camera.near=1,u.shadow.camera.far=18,n.add(u),n.add(u.target);let p=new Ws(10273535,1);p.position.set(5,2.5,-4),n.add(p);let g=new Hs(9347776,1709072,0.25);n.add(g);let m=1,v=1,f=new w,_=d.springL0,M=new Fe(3159098),S=new Fe(14247452),T=new Fe(16734738),A=new zi({colorWrite:!1});function P(D,W,j){m=D,v=W,i.setPixelRatio(j),i.setSize(D,W,!1),c.aspect=D/W}function O(D){let W=Sp/(D.fill||0.84),j=W/(2*Math.tan(Dt(c.fov)/2)),z=W;c.position.set(0,0,j),c.near=Math.max(0.5,j-9),c.far=j+14,c.updateProjectionMatrix(),h.position.set((D.ox||0)*z*c.aspect,-(D.oy||0)*z,0),h.rotation.set(D.pitch||0,D.yaw||0,D.roll||0,"YXZ");let ae=D.explode||0,le=d.parts;for(let Me=0;Me<le.length;Me++)le[Me].o.position.copy(le[Me].rest).addScaledVector(le[Me].v,ae);let Ee=D.jolt||0;if(d.uns.position.copy(d.axis).multiplyScalar(Ee),d.springG.scale.y=(_-Ee)/_,d.spin.rotation.z=D.spin||0,d.linkG.rotation.z=D.rattle||0,d.discG.rotation.x=D.wobble||0,d.discG.rotation.y=(D.wobble||0)*0.6,u.position.set(((D.lampX==null?0.1:D.lampX)-0.5)*z*c.aspect,-((D.lampY==null?0.12:D.lampY)-0.5)*z,3.6),u.target.position.set(h.position.x+(D.aimX||0),h.position.y+(D.aimY||0),0),u.intensity=(D.lampI==null?1:D.lampI)*70,u.angle=D.cone||0.78,D.lampC!=null)u.color.set(D.lampC);let ve=D.env==null?1:D.env;n.environmentIntensity=ve*0.95,p.intensity=ve*(D.rimI==null?1.1:D.rimI),g.intensity=ve*0.25;let q=D.heat||0,pe=d.mats.caliper;pe.color.copy(M).lerp(S,q),pe.emissive.copy(T).multiplyScalar(q*0.16),i.render(n,c)}function R(D,W){return f.setFromMatrixPosition(d.anchors[D].matrixWorld).project(c),W.x=f.x*0.5+0.5,W.y=-f.y*0.5+0.5,W.z=f.z,W}let V=new Map;function U(D){if(V.forEach((W,j)=>{j.material=W}),V.clear(),d.uns.visible=D!=="sprung",d.strutS.visible=!0,D==="uns")d.strutS.traverse((W)=>{if(W.isMesh)V.set(W,W.material),W.material=A})}function Z(){return i.compileAsync?i.compileAsync(n,c):Promise.resolve()}function $(){i.dispose()}return{renderer:i,resize:P,frame:O,project:R,layer:U,compile:Z,dispose:$,names:Object.keys(d.anchors)}}function T_(e,t){let i=Qh(e,t),n=i.next();while(!n.done)n=i.next();return n.value}async function E_(e,t,i){let n=Qh(e,t),r=n.next();while(!r.done){if(i)await i();r=n.next()}return r.value}export{E_ as createAsync,T_ as create,Sp as OBJ_H};
