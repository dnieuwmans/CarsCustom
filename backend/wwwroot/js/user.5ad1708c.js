(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user"],{"6d51":function(i,s,t){"use strict";t.r(s);var e=function(){var i=this,s=i.$createElement,t=i._self._c||s;return t("div",{staticClass:"register-user"},[t("main-nav"),t("div",{staticClass:"container"},[t("h2",[i._v("Register")]),null!=i.fieldsValidation?t("div",[t("user-form",{attrs:{"fields-validation":i.fieldsValidation,user:i.user}})],1):i._e(),t("div",{staticClass:"row"},[t("div",{staticClass:"col"},[t("button",{staticClass:"btn btn-primary",on:{click:function(s){i.register()}}},[i._v("Register")])])])])],1)},n=[],a=t("c665"),l=t("dc0a"),d=t("aa9a"),r=t("d328"),u=t("11d9"),h=(t("cadf"),t("551c"),t("097d"),t("9ab4")),f=t("60a3"),o=t("b8ca"),E=t("458f"),c=t("2ef0"),m=t("0e95"),R=t("add3"),S=t("aa74"),O=t("5764"),v=function(i){function s(){var i;return Object(a["a"])(this,s),i=Object(r["a"])(this,Object(u["a"])(s).apply(this,arguments)),i.fieldsEnum=O["a"],i.user=E["a"].init(),i.fieldsValidation=new m["a"]({}),i}return Object(d["a"])(s,[{key:"mounted",value:function(){this.fieldsValidation=new m["a"](Object(c["cloneDeep"])(this.user))}},{key:"register",value:function(){var i=this;this.recheckFields(this.user),this.fieldsValidation.hasErrors()||R["a"].auth.register(this.user).then(function(s){i.$router.push({name:"registration-complete"})}).catch(function(s){i.fieldsValidation.showErrors(s)})}},{key:"recheckFields",value:function(i){this.fieldsValidation.string(this.fieldsEnum.USERNAME,this.user[this.fieldsEnum.USERNAME],2,100),this.fieldsValidation.userName(this.fieldsEnum.USERNAME,this.user[this.fieldsEnum.USERNAME]),this.fieldsValidation.string(this.fieldsEnum.PASSWORD,this.user[this.fieldsEnum.PASSWORD],8,100),this.fieldsValidation.string(this.fieldsEnum.CONFIRMPASSWORD,this.user[this.fieldsEnum.CONFIRMPASSWORD],8,100),this.fieldsValidation.confirmPassword(this.fieldsEnum.CONFIRMPASSWORD,this.user[this.fieldsEnum.PASSWORD],this.user[this.fieldsEnum.CONFIRMPASSWORD]),this.fieldsValidation.string(this.fieldsEnum.FIRSTNAME,this.user[this.fieldsEnum.FIRSTNAME],2,100),this.fieldsValidation.string(this.fieldsEnum.LASTNAME,this.user[this.fieldsEnum.LASTNAME],2,100),this.fieldsValidation.string(this.fieldsEnum.ZIPCODE,this.user[this.fieldsEnum.ZIPCODE],6,6),this.fieldsValidation.string(this.fieldsEnum.STREETNUMBER,this.user[this.fieldsEnum.STREETNUMBER],1,6),this.fieldsValidation.phone(this.fieldsEnum.PHONE,this.user[this.fieldsEnum.PHONE]),this.fieldsValidation.email(this.fieldsEnum.EMAIL,this.user[this.fieldsEnum.EMAIL])}}]),Object(l["a"])(s,i),s}(f["c"]);v=h["a"]([Object(f["a"])({name:"RegisterUser",components:{MainNav:o["a"],UserForm:S["a"]}})],v);var A=v,N=A,M=t("2877"),V=Object(M["a"])(N,e,n,!1,null,null,null);V.options.__file="RegisterUser.vue";s["default"]=V.exports}}]);
//# sourceMappingURL=user.5ad1708c.js.map