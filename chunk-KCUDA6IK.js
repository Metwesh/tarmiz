import{a as f,m}from"./chunk-AWGUPIYV.js";import{$ as n,a as u,b as h,ea as c,k as l}from"./chunk-JYFIODHJ.js";var k=(()=>{class o{setCookie(e,i,t={}){let s=encodeURIComponent(e)+"="+encodeURIComponent(i);if(t.expires){if(typeof t.expires=="number"){let r=new Date;r.setTime(r.getTime()+t.expires*24*60*60*1e3),t.expires=r}s+=";expires="+t.expires.toUTCString()}t.path?s+=";path="+t.path:s+=";path=/",t.domain&&(s+=";domain="+t.domain),t.secure&&(s+=";secure"),t.sameSite?s+=";SameSite="+t.sameSite:s+=";SameSite=Lax",document.cookie=s}getCookie(e){let i=encodeURIComponent(e)+"=",t=document.cookie.split(";");for(let s=0;s<t.length;s++){let r=t[s];for(;r.charAt(0)===" ";)r=r.substring(1,r.length);if(r.indexOf(i)===0)return decodeURIComponent(r.substring(i.length,r.length))}return null}deleteCookie(e,i={}){let t=h(u({},i),{expires:new Date(0)});this.setCookie(e,"",t)}hasCookie(e){return this.getCookie(e)!==null}getAllCookies(){let e={},i=document.cookie.split(";");for(let t=0;t<i.length;t++){let s=i[t].trim();if(s){let r=s.split("=");if(r.length>=2){let S=decodeURIComponent(r[0]),v=decodeURIComponent(r.slice(1).join("="));e[S]=v}}}return e}static{this.\u0275fac=function(i){return new(i||o)}}static{this.\u0275prov=n({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var p=(()=>{class o{constructor(e){this.cookieService=e,this.TOKEN_NAME="ng-tarmiz-auth-token"}getToken(){return this.cookieService.getCookie(this.TOKEN_NAME)}setToken(e){this.cookieService.setCookie(this.TOKEN_NAME,e,{expires:1,secure:!0,sameSite:"Strict"})}clearToken(){this.cookieService.deleteCookie(this.TOKEN_NAME)}static{this.\u0275fac=function(i){return new(i||o)(c(k))}}static{this.\u0275prov=n({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var d=(()=>{class o{constructor(){this.user=null}setUser(e){this.user=e}getUser(){return this.user}clearUser(){this.user=null}static{this.\u0275fac=function(i){return new(i||o)}}static{this.\u0275prov=n({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var U=(()=>{class o{constructor(e,i,t,s){this.http=e,this.router=i,this.tokenService=t,this.userService=s,this.authSubject=new l(!1),this.isAuthenticated$=this.authSubject.asObservable(),this.checkAuthStatus()}login(e,i){return new Promise((t,s)=>{this.http.post("/account/login",{username:e,password:i}).subscribe({next:r=>{this.tokenService.setToken(r.token),this.authSubject.next(!0),this.validateToken(),t(!0)},error:r=>{console.error("Login error:",r),this.authSubject.next(!1),s(r)}})})}logout(){this.tokenService.clearToken(),this.userService.clearUser(),this.authSubject.next(!1),setTimeout(()=>this.router.navigate(["/login"]),0)}validateToken(){return new Promise(e=>{if(!this.tokenService.getToken())return e(!1);this.http.get("/account/info").subscribe({next:t=>{t?.info?.accountId?(this.userService.setUser(t.info),e(!0)):e(!1)},error:t=>{console.log("Token validation failed",t),e(!1)}})})}checkAuthStatus(){this.tokenService.getToken()&&this.validateToken().then(i=>{this.authSubject.next(i),i||(this.userService.clearUser(),this.logout())}).catch(()=>{this.authSubject.next(!1),this.userService.clearUser(),this.logout()})}static{this.\u0275fac=function(i){return new(i||o)(c(f),c(m),c(p),c(d))}}static{this.\u0275prov=n({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();export{k as a,d as b,p as c,U as d};
