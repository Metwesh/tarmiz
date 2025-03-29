import{a as y,b as Z}from"./chunk-MA6EJVC6.js";import{a as R,b as z,c as m,d as H,e as Y,g as j,h as K,j as X,k as J,o as Q,q as W}from"./chunk-2SMDCKH4.js";import{$ as P,A as L,G as q,H as I,J as U,Z as D,_ as V,a as k,aa as w,da as G,ea as O,x as A,y as N,za as B}from"./chunk-AWGUPIYV.js";import{Cb as d,Eb as h,Ib as u,Mb as o,Nb as i,Ob as a,Vb as T,Xb as C,cb as r,hb as S,hc as s,ic as E,pa as b,pb as M,qa as F,vb as p}from"./chunk-JYFIODHJ.js";function $(t,c){t&1&&(o(0,"small"),s(1,"Name is required"),i())}function ee(t,c){if(t&1&&(o(0,"div",5),p(1,$,2,0,"small"),i()),t&2){let l,n=C();r(),u(!((l=n.assetForm.get("name"))==null||l.errors==null)&&l.errors.required?1:-1)}}function te(t,c){t&1&&(o(0,"small"),s(1,"Symbol is required"),i())}function le(t,c){if(t&1&&(o(0,"div",5),p(1,te,2,0,"small"),i()),t&2){let l,n=C();r(),u(!((l=n.assetForm.get("symbol"))==null||l.errors==null)&&l.errors.required?1:-1)}}function ne(t,c){t&1&&(o(0,"small"),s(1,"Supply is required"),i())}function ie(t,c){if(t&1&&(o(0,"div",5),p(1,ne,2,0,"small"),i()),t&2){let l,n=C(2);r(),u(!((l=n.assetForm.get("supply"))==null||l.errors==null)&&l.errors.required?1:-1)}}function oe(t,c){if(t&1&&(o(0,"c-col")(1,"div",2)(2,"label",25),s(3,"Supply"),i(),a(4,"input",26),p(5,ie,2,1,"div",5),i()()),t&2){let l,n,e=C();r(4),h("is-invalid",((l=e.assetForm.get("supply"))==null?null:l.invalid)&&((l=e.assetForm.get("supply"))==null?null:l.touched)),r(),u((n=e.assetForm.get("supply"))!=null&&n.invalid&&((n=e.assetForm.get("supply"))!=null&&n.dirty||(n=e.assetForm.get("supply"))!=null&&n.touched)?5:-1)}}function re(t,c){if(t&1&&(b(),a(0,"svg",28),F(),o(1,"span"),s(2),i()),t&2){let l=C(2);r(2),E(l.successMessage)}}function ae(t,c){if(t&1&&(b(),a(0,"svg",29),F(),o(1,"span"),s(2),i()),t&2){let l=C(2);r(2),E(l.errorMessage)}}function se(t,c){if(t&1&&(o(0,"c-alert",18)(1,"div",27),p(2,re,3,1)(3,ae,3,1),i()()),t&2){let l=C();d("color",l.successMessage?"success":"danger"),r(2),u(l.successMessage?2:3)}}function me(t,c){t&1&&(a(0,"c-spinner",30),s(1," Loading... "))}function ce(t,c){t&1&&s(0," Submit ")}var fe=(()=>{class t{constructor(l,n){this.fb=l,this.http=n,this.submitting=!1,this.successMessage="",this.errorMessage="",this.assetTypeUrl=y.ASSET_TYPE,this.pricingModelUrl=y.PRICING_MODEL,this.supplyTypesUrl=y.SUPPLY_TYPES,this.accountLevelUrl=y.ACCOUNT_LEVEL,this.tradingModelUrl=y.TRADING_MODEL,this.executionModelUrl=y.EXECUTION_MODEL,this.marketUrl=y.MARKET,this.assetForm=this.fb.group({name:["",[m.required,m.minLength(3)]],symbol:["",[m.required,m.minLength(3)]],assetType:["",[m.required]],exclusive:[!1,[m.required]],supplyType:["",[m.required]],supply:[""],pricingModel:["",[m.required]],tradingModel:["",[m.required]],executionModel:["",[m.required]],cid:[""],marketId:["",[m.required]],level:["",[m.required]],extra:[""]})}ngOnInit(){this.assetForm.get("supplyType")?.valueChanges.subscribe(l=>{let n=this.assetForm.get("supply");l==="1"?n?.setValidators([m.required]):n?.clearValidators(),n?.updateValueAndValidity()})}isInvalid(l){let n=this.assetForm.get(l);return n?n.invalid&&(n.dirty||n.touched):!1}onSubmit(){if(this.submitting=!0,this.assetForm.invalid){this.errorMessage="Please fill all required fields correctly.",this.submitting=!1;return}this.successMessage="",this.errorMessage="",this.http.post("/account/create/asset",this.assetForm.value).subscribe({next:()=>{this.successMessage="Asset created successfully!",this.assetForm.reset(),this.submitting=!1},error:l=>{this.errorMessage=l.error,this.submitting=!1}})}static{this.\u0275fac=function(n){return new(n||t)(S(Q),S(k))}}static{this.\u0275cmp=M({type:t,selectors:[["app-asset-create"]],decls:51,vars:25,consts:[["cForm","","autocomplete","off",1,"mb-4",3,"ngSubmit","formGroup"],[1,"row-cols-2"],[1,"mb-3"],["cLabel","","for","name"],["cFormControl","","id","name","type","text","placeholder","Enter asset name","formControlName","name"],[1,"text-danger","small","text-end"],["cLabel","","for","symbol"],["cFormControl","","id","symbol","type","text","placeholder","Enter symbol","formControlName","symbol"],["controlName","assetType","label","Asset Type","placeholder","Choose asset type",3,"key","control"],["controlName","supplyType","label","Supply Type","placeholder","Choose supply type",3,"key","control"],["controlName","pricingModel","label","Pricing Model","placeholder","Choose pricing model",3,"key","control"],["controlName","tradingModel","label","Trading Model","placeholder","Choose trading model",3,"key","control"],["controlName","executionModel","label","Execution Model","placeholder","Choose execution model",3,"key","control"],["controlName","marketId","label","Market","placeholder","Choose market","defaultValue","818",3,"key","control"],["controlName","level","label","Account Level","placeholder","Choose level",3,"key","control"],["xs","12"],["cLabel","","for","extra"],["cFormControl","","id","extra","formControlName","extra","placeholder","Enter extra info","rows","3"],[3,"color"],[1,"align-items-center"],["sizing","lg","switch",""],["cFormCheckInput","","type","checkbox","formControlName","exclusive"],["cFormCheckLabel",""],[1,"text-end"],["cButton","","color","primary","type","submit",3,"disabled"],["cLabel","","for","supply"],["cFormControl","","id","supply","type","number","placeholder","Enter supply","formControlName","supply"],[1,"d-flex","align-items-center","gap-2"],["cIcon","","name","cilCheckCircle","size","sm"],["cIcon","","name","cilBellExclamation","size","sm"],["size","sm"]],template:function(n,e){if(n&1&&(o(0,"form",0),T("ngSubmit",function(){return e.onSubmit()}),o(1,"c-card")(2,"c-card-header")(3,"strong"),s(4,"Create Asset"),i()(),o(5,"c-card-body")(6,"c-row",1)(7,"c-col")(8,"div",2)(9,"label",3),s(10,"Name"),i(),a(11,"input",4),p(12,ee,2,1,"div",5),i()(),o(13,"c-col")(14,"div",2)(15,"label",6),s(16,"Symbol"),i(),a(17,"input",7),p(18,le,2,1,"div",5),i()(),o(19,"c-col"),a(20,"app-async-select",8),i(),o(21,"c-col"),a(22,"app-async-select",9),i(),p(23,oe,6,3,"c-col"),o(24,"c-col"),a(25,"app-async-select",10),i(),o(26,"c-col"),a(27,"app-async-select",11),i(),o(28,"c-col"),a(29,"app-async-select",12),i(),o(30,"c-col"),a(31,"app-async-select",13),i(),o(32,"c-col"),a(33,"app-async-select",14),i()(),o(34,"c-row")(35,"c-col",15)(36,"div",2)(37,"label",16),s(38,"Extra"),i(),a(39,"textarea",17),i()()(),p(40,se,4,2,"c-alert",18),o(41,"c-row",19)(42,"c-col")(43,"c-form-check",20),a(44,"input",21),o(45,"label",22),s(46,"Exclusive"),i()()(),o(47,"c-col",23)(48,"button",24),p(49,me,2,0)(50,ce,1,0),i()()()()()()),n&2){let v,_,f,g,x;d("formGroup",e.assetForm),r(11),h("is-invalid",((v=e.assetForm.get("name"))==null?null:v.invalid)&&((v=e.assetForm.get("name"))==null?null:v.touched)),r(),u((_=e.assetForm.get("name"))!=null&&_.invalid&&((_=e.assetForm.get("name"))!=null&&_.dirty||(_=e.assetForm.get("name"))!=null&&_.touched)?12:-1),r(5),h("is-invalid",((f=e.assetForm.get("symbol"))==null?null:f.invalid)&&((f=e.assetForm.get("symbol"))==null?null:f.touched)),r(),u((g=e.assetForm.get("symbol"))!=null&&g.invalid&&((g=e.assetForm.get("symbol"))!=null&&g.dirty||(g=e.assetForm.get("symbol"))!=null&&g.touched)?18:-1),r(2),d("key",e.assetTypeUrl)("control",e.assetForm.controls.assetType),r(2),d("key",e.supplyTypesUrl)("control",e.assetForm.controls.supplyType),r(),u(((x=e.assetForm.get("supplyType"))==null?null:x.value)!=="2"?23:-1),r(2),d("key",e.pricingModelUrl)("control",e.assetForm.controls.pricingModel),r(2),d("key",e.tradingModelUrl)("control",e.assetForm.controls.tradingModel),r(2),d("key",e.executionModelUrl)("control",e.assetForm.controls.executionModel),r(2),d("key",e.marketUrl)("control",e.assetForm.controls.marketId),r(2),d("key",e.accountLevelUrl)("control",e.assetForm.controls.level),r(7),u(e.successMessage||e.errorMessage?40:-1),r(8),d("disabled",e.submitting||e.assetForm.invalid),r(),u(e.submitting?49:50)}},dependencies:[W,j,z,K,R,H,Y,X,J,G,O,I,q,U,N,V,w,P,D,Z,B,L,A],encapsulation:2})}}return t})();export{fe as AssetCreateComponent};
