import{a as ge,b as Ae}from"./chunk-NOFYUX7R.js";import{b as he,c as b,d as be,e as O,f as $,g as ve,i as G,j as xe,n as H,o as q}from"./chunk-WEXEVBLY.js";import{$ as pe,C as se,D as re,E as le,F as me,G as D,H as F,J as k,K as de,X as ce,a as g,ba as ue,ca as P,da as L,k as T,ka as B,la as w,m as ie,ma as N,n as oe,na as V,oa as R,pa as _e,qa as fe,ra as Se,x as ae,y as A,ya as j,z as y,za as Ce}from"./chunk-CPMHKQVD.js";import{Cb as _,Gb as U,Ib as c,Jb as K,Kb as I,Lb as E,Mb as i,Nb as t,Ob as l,Sb as Z,Vb as S,Vc as ne,Xb as p,a as Y,cb as r,hb as C,hc as a,ic as h,jc as u,mc as M,na as J,nc as X,oa as Q,pa as W,pb as x,pc as ee,rc as te,vb as d,xa as v}from"./chunk-EMBINFOT.js";var Ie=e=>({"is-invalid":e});function ke(e,s){e&1&&(i(0,"div",10),a(1,"Bid price is required"),t())}function Pe(e,s){e&1&&(i(0,"div",10),a(1,"Ask price is required"),t())}function Le(e,s){e&1&&(l(0,"c-spinner",14),a(1," Loading... "))}function Be(e,s){e&1&&a(0," Discard Changes")}function we(e,s){e&1&&(l(0,"c-spinner",14),a(1," Loading... "))}function Ne(e,s){e&1&&a(0," Save Changes ")}var Te=(()=>{class e{constructor(n,m){this.formBuilder=n,this.http=m,this.close=new v,this.revalidate=new v,this.submitting=!1,this.priceSetForm=this.formBuilder.group({bid:[0,[b.required,b.min(0)]],ask:[0,[b.required,b.min(0)]]})}onSubmit(){if(this.priceSetForm.invalid)return;this.submitting=!0;let n=Y({assetId:this.formData?.assetId??0,marketId:this.formData?.marketId??0},this.priceSetForm.value);this.http.post("/assets/price/set",n).subscribe({next:()=>{this.submitting=!1,this.closeModal(),this.revalidateAssetInner()},error:()=>{this.submitting=!1}})}onReset(){this.submitting=!1,this.priceSetForm.reset(),this.closeModal()}onVisibleChange(n){this.priceSetForm.setValue({bid:this.formData?.bid??0,ask:this.formData?.ask??0}),!n&&this.onReset()}closeModal(){this.close.emit()}revalidateAssetInner(){this.revalidate.emit()}static{this.\u0275fac=function(m){return new(m||e)(C(H),C(g))}}static{this.\u0275cmp=x({type:e,selectors:[["app-price-set-modal"]],inputs:{visible:"visible",formData:"formData"},outputs:{close:"close",revalidate:"revalidate"},decls:39,vars:18,consts:[["alignment","center",3,"visibleChange","visible"],["cModalTitle",""],["cButtonClose","",3,"click"],[1,"mb-3"],[1,"fw-bold"],[1,"m-0"],["id","price-set-form",3,"ngSubmit","reset","formGroup"],["xs","12","md","6"],["cLabel","",1,"form-label"],["type","number","formControlName","bid","cFormControl","",1,"form-control"],[1,"text-danger"],["type","number","formControlName","ask","cFormControl","",1,"form-control"],["cButton","","form","price-set-form","type","reset","color","secondary",3,"disabled"],["cButton","","form","price-set-form","type","submit","color","primary",3,"disabled"],["size","sm"]],template:function(m,o){m&1&&(i(0,"c-modal",0),S("visibleChange",function(z){return o.onVisibleChange(z)}),i(1,"c-modal-header")(2,"h5",1),a(3,"Set Price"),t(),i(4,"button",2),S("click",function(){return o.onReset()}),t()(),i(5,"c-modal-body")(6,"c-card",3)(7,"c-card-header",4),a(8,"Market & Asset Details"),t(),i(9,"c-card-body")(10,"p")(11,"strong"),a(12,"Market ID:"),t(),a(13),t(),i(14,"p",5)(15,"strong"),a(16,"Asset ID:"),t(),a(17),t()()(),i(18,"form",6),S("ngSubmit",function(){return o.onSubmit()})("reset",function(){return o.onReset()}),i(19,"c-row")(20,"c-col",7)(21,"div",3)(22,"label",8),a(23,"Bid Price"),t(),l(24,"input",9),d(25,ke,2,0,"div",10),t()(),i(26,"c-col",7)(27,"div",3)(28,"label",8),a(29,"Ask Price"),t(),l(30,"input",11),d(31,Pe,2,0,"div",10),t()()()()(),i(32,"c-modal-footer")(33,"button",12),d(34,Le,2,0)(35,Be,1,0),t(),i(36,"button",13),d(37,we,2,0)(38,Ne,1,0),t()()()),m&2&&(_("visible",o.visible),r(13),u(" ",o.formData==null?null:o.formData.marketId,""),r(4),u(" ",o.formData==null?null:o.formData.assetId,""),r(),_("formGroup",o.priceSetForm),r(6),U(X(14,Ie,o.priceSetForm.controls.bid.invalid&&o.priceSetForm.controls.bid.touched)),r(),c(o.priceSetForm.controls.bid.invalid&&o.priceSetForm.controls.bid.touched?25:-1),r(5),U(X(16,Ie,o.priceSetForm.controls.ask.invalid&&o.priceSetForm.controls.ask.touched)),r(),c(o.priceSetForm.controls.ask.invalid&&o.priceSetForm.controls.ask.touched?31:-1),r(2),_("disabled",o.submitting),r(),c(o.submitting?34:35),r(2),_("disabled",o.submitting||o.priceSetForm.invalid),r(),c(o.submitting?37:38))},dependencies:[R,N,B,w,V,A,y,q,$,he,ve,be,O,G,xe,pe,ce,P,L,D,k,F,j],encapsulation:2})}}return e})();var Re=()=>["1"];function je(e,s){e&1&&(l(0,"c-spinner",8),a(1," Loading... "))}function Oe(e,s){e&1&&a(0," Discard Changes")}function $e(e,s){e&1&&(l(0,"c-spinner",8),a(1," Loading... "))}function Ge(e,s){e&1&&a(0," Save Changes ")}var ye=(()=>{class e{get assetStateDefaultValue(){return`${this.assetState}`}constructor(n,m,o){this.formBuilder=n,this.http=m,this.route=o,this.close=new v,this.revalidate=new v,this.submitting=!1,this.assetStateKey=ge.ASSET_STATE,this.assetStateForm=this.formBuilder.group({state:[0,[b.required,b.min(0)]]})}onSubmit(){let n=this.route.snapshot.paramMap.get("id");if(this.assetStateForm.invalid||!n)return;this.submitting=!0;let m={assetId:+n,state:+(this.assetStateForm.value.state??0)};this.http.post("/assets/update/state",m).subscribe({next:()=>{this.submitting=!1,this.closeModal(),this.revalidateAssetInner()},error:()=>{this.submitting=!1}})}onReset(){this.submitting=!1,this.assetStateForm.reset(),this.closeModal()}onVisibleChange(n){this.assetStateForm.setValue({state:this.assetState??0}),!n&&this.onReset()}closeModal(){this.close.emit()}revalidateAssetInner(){this.revalidate.emit()}static{this.\u0275fac=function(m){return new(m||e)(C(H),C(g),C(T))}}static{this.\u0275cmp=x({type:e,selectors:[["app-set-asset-state-modal"]],inputs:{visible:"visible",assetState:"assetState"},outputs:{close:"close",revalidate:"revalidate"},decls:16,vars:12,consts:[["alignment","center",3,"visibleChange","visible"],["cModalTitle",""],["cButtonClose","",3,"click"],["id","asset-state-form",3,"ngSubmit","reset","formGroup"],[1,"mb-3"],["controlName","state","label","Asset State","placeholder","Choose asset state",3,"key","control","defaultValue","excludeValues","enabled"],["cButton","","form","asset-state-form","type","reset","color","secondary",3,"disabled"],["cButton","","form","asset-state-form","type","submit","color","primary",3,"disabled"],["size","sm"]],template:function(m,o){m&1&&(i(0,"c-modal",0),S("visibleChange",function(z){return o.onVisibleChange(z)}),i(1,"c-modal-header")(2,"h5",1),a(3,"Set Asset State"),t(),i(4,"button",2),S("click",function(){return o.onReset()}),t()(),i(5,"c-modal-body")(6,"form",3),S("ngSubmit",function(){return o.onSubmit()})("reset",function(){return o.onReset()}),i(7,"div",4),l(8,"app-async-select",5),t()()(),i(9,"c-modal-footer")(10,"button",6),d(11,je,2,0)(12,Oe,1,0),t(),i(13,"button",7),d(14,$e,2,0)(15,Ge,1,0),t()()()),m&2&&(_("visible",o.visible),r(6),_("formGroup",o.assetStateForm),r(2),_("key",o.assetStateKey)("control",o.assetStateForm.controls.state)("defaultValue",o.assetStateDefaultValue)("excludeValues",M(11,Re))("enabled",o.visible),r(2),_("disabled",o.submitting),r(),c(o.submitting?11:12),r(2),_("disabled",o.submitting||o.assetStateForm.invalid),r(),c(o.submitting?14:15))},dependencies:[R,N,B,w,V,A,y,q,$,O,G,j,Ae],encapsulation:2})}}return e})();var De=()=>[0,1,2,3,4],He=(e,s)=>s.update,qe=(e,s)=>s.subscriber;function ze(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function Ue(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.assetId," ")}}function Ke(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function Xe(e,s){if(e&1&&a(0),e&2){let n=p();u(" ID: ",n.asset==null?null:n.asset.assetId," ")}}function Ye(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function Je(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.name," ")}}function Qe(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function We(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.symbol," ")}}function Ze(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function et(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.assetTypeName," ")}}function tt(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function nt(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.supplyTypeName," ")}}function it(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function ot(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.supply," ")}}function at(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function st(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.pricingModelName," ")}}function rt(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function lt(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.tradingModelName," ")}}function mt(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function dt(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.executionModelName," ")}}function ct(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function pt(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.levelName," ")}}function ut(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function _t(e,s){if(e&1&&(a(0),i(1,"c-badge",20),W(),l(2,"svg",21),t()),e&2){let n=p();u(" ",n.asset!=null&&n.asset.locked?"Locked":"Unlocked"," "),r(),_("color",n.asset!=null&&n.asset.locked?"danger":"success"),r(),_("name",n.asset!=null&&n.asset.locked?"cilX":"cilCheckAlt")}}function ft(e,s){e&1&&(i(0,"span",5),l(1,"span",22),t())}function St(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.contract," ")}}function Ct(e,s){e&1&&(i(0,"span",5),l(1,"span",19),t())}function ht(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",n.asset==null?null:n.asset.stateName," ")}}function bt(e,s){e&1&&(i(0,"span",5),l(1,"span",22),t())}function vt(e,s){if(e&1&&a(0),e&2){let n=p();u(" ",(n.asset==null?null:n.asset.extra)||"N/A"," ")}}function xt(e,s){e&1&&(i(0,"tr")(1,"td")(2,"p",23),l(3,"span",24),t()(),i(4,"td")(5,"p",23),l(6,"span",24),t()(),i(7,"td")(8,"p",23),l(9,"span",24),t()(),i(10,"td")(11,"p",23),l(12,"span",24),t()(),i(13,"td")(14,"p",23),l(15,"span",24),t()(),i(16,"td")(17,"p",23),l(18,"span",24),t()()())}function gt(e,s){e&1&&I(0,xt,19,0,"tr",null,K),e&2&&E(M(0,De))}function At(e,s){if(e&1){let n=Z();i(0,"tr")(1,"td"),a(2),t(),i(3,"td"),a(4),t(),i(5,"td"),a(6),t(),i(7,"td"),a(8),t(),i(9,"td"),a(10),ee(11,"date"),t(),i(12,"td")(13,"button",13),S("click",function(){let o=J(n).$implicit,f=p(2);return Q(f.togglePriceSetModal(o))}),a(14," Set Price "),t()()()}if(e&2){let n=s.$implicit;r(2),h(n.marketName),r(2),h(n.currencyCode),r(2),h(n.bid),r(2),h(n.ask),r(2),h(te(11,5,n.update,"short"))}}function It(e,s){if(e&1&&I(0,At,15,8,"tr",null,He),e&2){let n=p();E(n.asset==null?null:n.asset.prices)}}function Et(e,s){e&1&&(i(0,"tr")(1,"td")(2,"p",23),l(3,"span",24),t()(),i(4,"td")(5,"p",23),l(6,"span",24),t()(),i(7,"td")(8,"p",23),l(9,"span",24),t()()())}function Mt(e,s){e&1&&I(0,Et,10,0,"tr",null,K),e&2&&E(M(0,De))}function Tt(e,s){if(e&1&&(i(0,"tr")(1,"td"),a(2),t(),i(3,"td"),a(4),t(),i(5,"td"),a(6),t()()),e&2){let n=s.$implicit,m=s.$index;r(2),h(m+1),r(2),h(n.subscriber),r(2),h(n.balance)}}function yt(e,s){if(e&1&&I(0,Tt,7,3,"tr",null,qe),e&2){let n=p();E(n.subscribers)}}var Zt=(()=>{class e{constructor(n,m,o){this.http=n,this.router=m,this.route=o,this.asset=null,this.isAssetLoading=!0,this.subscribers=[],this.isSubscribersLoading=!0,this.isPriceSetModalOpen=!1,this.isAssetStateModalOpen=!1}ngOnInit(){this.fetchAssetDetails()}fetchAssetDetails(){this.isAssetLoading=!0,this.isSubscribersLoading=!0;let n=this.route.snapshot.paramMap.get("id");if(!n){this.isAssetLoading=!1,this.router.navigate(["/404"]);return}this.http.get(`/assets/info/${n}`).subscribe({next:m=>{this.asset=m,this.isAssetLoading=!1,this.http.get(`/assets/subscribers/${m.contract}`).subscribe({next:({subscribers:o})=>{this.subscribers=o,this.isSubscribersLoading=!1},error:o=>{console.error("There was an error!",o),this.isSubscribersLoading=!1}})},error:m=>{console.error("There was an error!",m),this.isAssetLoading=!1,this.router.navigate(["/404"])}})}togglePriceSetModal(n){let m=this.route.snapshot.paramMap.get("id");this.priceSetFormData={assetId:+m,marketId:n.marketId,ask:n.ask,bid:n.bid},this.openPriceSetModal()}openPriceSetModal(){this.isPriceSetModalOpen=!0}closePriceSetModal(){this.isPriceSetModalOpen=!1}toggleAssetStateModal(n){n&&(this.assetState=n,this.openAssetStateModal())}openAssetStateModal(){this.isAssetStateModalOpen=!0}closeAssetStateModal(){this.isAssetStateModalOpen=!1}refetchAssetDetails(){this.fetchAssetDetails()}static{this.\u0275fac=function(m){return new(m||e)(C(g),C(ie),C(T))}}static{this.\u0275cmp=x({type:e,selectors:[["app-asset-inner"]],decls:148,vars:27,consts:[[1,"justify-content-center"],["md","8"],["routerLink","/assets/list","color","primary",2,"cursor","pointer"],["active",""],[1,"d-flex","justify-content-between","align-items-center"],["cPlaceholderAnimation","glow"],["color","secondary"],["md","6"],[1,"text-success"],[1,"mt-4","justify-content-center"],["md","4"],[1,"h-100"],[1,"d-flex","align-items-center","justify-content-between"],["cButton","","color","primary","size","sm",3,"click"],[1,"d-flex","align-items-center",2,"height","3rem"],[2,"max-height","3rem","overflow","auto","margin","0"],["cTable","",3,"hover","responsive","striped"],[3,"close","revalidate","visible","formData"],[3,"close","revalidate","visible","assetState"],["cPlaceholder","",2,"width","5rem","border-radius","1rem"],["size","sm",3,"color"],["cIcon","",3,"name"],["cPlaceholder","",2,"width","20rem","border-radius","1rem"],["cPlaceholderAnimation","glow",2,"margin","0"],["cCol","12","cPlaceholder","",2,"border-radius","1rem","width","100%"]],template:function(m,o){m&1&&(i(0,"c-container")(1,"c-row",0)(2,"c-col",1)(3,"c-breadcrumb")(4,"c-breadcrumb-item",2),a(5," Assets "),t(),i(6,"c-breadcrumb-item",3),a(7," Asset Details "),t()()()(),i(8,"c-row",0)(9,"c-col",1)(10,"c-card")(11,"c-card-header",4)(12,"strong"),a(13," Asset "),d(14,ze,2,0,"span",5)(15,Ue,1,1),t(),i(16,"c-badge",6),d(17,Ke,2,0,"span",5)(18,Xe,1,1),t()(),i(19,"c-card-body")(20,"c-row")(21,"c-col",7)(22,"p")(23,"strong"),a(24,"Name: "),t(),d(25,Ye,2,0,"span",5)(26,Je,1,1),t(),i(27,"p")(28,"strong"),a(29,"Symbol: "),t(),d(30,Qe,2,0,"span",5)(31,We,1,1),t(),i(32,"p")(33,"strong"),a(34,"Asset Type: "),t(),d(35,Ze,2,0,"span",5)(36,et,1,1),t(),i(37,"p")(38,"strong"),a(39,"Supply Type: "),t(),d(40,tt,2,0,"span",5)(41,nt,1,1),t(),i(42,"p")(43,"strong"),a(44,"Supply: "),t(),d(45,it,2,0,"span",5)(46,ot,1,1),t()(),i(47,"c-col",7)(48,"p")(49,"strong"),a(50,"Pricing Model: "),t(),d(51,at,2,0,"span",5)(52,st,1,1),t(),i(53,"p")(54,"strong"),a(55,"Trading Model: "),t(),d(56,rt,2,0,"span",5)(57,lt,1,1),t(),i(58,"p")(59,"strong"),a(60,"Execution Model: "),t(),d(61,mt,2,0,"span",5)(62,dt,1,1),t(),i(63,"p")(64,"strong"),a(65,"Market Level: "),t(),d(66,ct,2,0,"span",5)(67,pt,1,1),t(),i(68,"p")(69,"strong"),a(70,"Asset lock state: "),t(),d(71,ut,2,0,"span",5)(72,_t,3,3),t()()(),i(73,"c-row")(74,"c-col")(75,"p")(76,"strong"),a(77,"Contract: "),t(),i(78,"code",8),d(79,ft,2,0,"span",5)(80,St,1,1),t()()()()()()()(),i(81,"c-row",9)(82,"c-col",10)(83,"c-card",11)(84,"c-card-header",12)(85,"strong"),a(86,"Asset State"),t(),i(87,"c-card-header-actions")(88,"button",13),S("click",function(){return o.toggleAssetStateModal(o.asset==null?null:o.asset.stateId)}),a(89," Set State "),t()()(),i(90,"c-card-body")(91,"p"),d(92,Ct,2,0,"span",5)(93,ht,1,1),t()()()(),i(94,"c-col",10)(95,"c-card",11)(96,"c-card-header",14)(97,"strong"),a(98,"Extra Info"),t()(),i(99,"c-card-body")(100,"p",15),d(101,bt,2,0,"span",5)(102,vt,1,1),t()()()()(),i(103,"c-row",9)(104,"c-col",1)(105,"c-card")(106,"c-card-header")(107,"strong"),a(108,"Prices"),t()(),i(109,"c-card-body")(110,"table",16)(111,"thead")(112,"tr")(113,"th"),a(114,"Market"),t(),i(115,"th"),a(116,"Currency Code"),t(),i(117,"th"),a(118,"Bid"),t(),i(119,"th"),a(120,"Ask"),t(),i(121,"th"),a(122,"Last Update Time"),t(),l(123,"th"),t()(),i(124,"tbody"),d(125,gt,2,1)(126,It,2,0),t()()()()()(),i(127,"c-row",9)(128,"c-col",1)(129,"c-card")(130,"c-card-header")(131,"strong"),a(132,"Subscribers"),t()(),i(133,"c-card-body")(134,"table",16)(135,"thead")(136,"tr")(137,"th"),a(138,"#"),t(),i(139,"th"),a(140,"Subscriber"),t(),i(141,"th"),a(142,"Balance"),t()()(),i(143,"tbody"),d(144,Mt,2,1)(145,yt,2,0),t()()()()()()(),i(146,"app-price-set-modal",17),S("close",function(){return o.closePriceSetModal()})("revalidate",function(){return o.refetchAssetDetails()}),t(),i(147,"app-set-asset-state-modal",18),S("close",function(){return o.closeAssetStateModal()})("revalidate",function(){return o.refetchAssetDetails()}),t()),m&2&&(r(14),c(o.isAssetLoading?14:15),r(3),c(o.isAssetLoading?17:18),r(8),c(o.isAssetLoading?25:26),r(5),c(o.isAssetLoading?30:31),r(5),c(o.isAssetLoading?35:36),r(5),c(o.isAssetLoading?40:41),r(5),c(o.isAssetLoading?45:46),r(6),c(o.isAssetLoading?51:52),r(5),c(o.isAssetLoading?56:57),r(5),c(o.isAssetLoading?61:62),r(5),c(o.isAssetLoading?66:67),r(5),c(o.isAssetLoading?71:72),r(8),c(o.isAssetLoading?79:80),r(13),c(o.isAssetLoading?92:93),r(9),c(o.isAssetLoading?101:102),r(9),_("hover",!0)("responsive",!0)("striped",!0),r(15),c(o.isAssetLoading?125:126),r(9),_("hover",!0)("responsive",!0)("striped",!0),r(10),c(o.isSubscribersLoading?144:145),r(2),_("visible",o.isPriceSetModalOpen)("formData",o.priceSetFormData),r(),_("visible",o.isAssetStateModalOpen)("assetState",o.assetState))},dependencies:[ue,L,P,D,k,F,de,ae,se,me,le,re,oe,Se,_e,fe,Ce,ne,A,Te,ye],encapsulation:2})}}return e})();export{Zt as AssetInnerComponent};
