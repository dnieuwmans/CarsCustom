(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["explore-cars"],{"0a49":function(e,t,r){var a=r("9b43"),i=r("626a"),n=r("4bf8"),s=r("9def"),c=r("cd1c");e.exports=function(e,t){var r=1==e,o=2==e,l=3==e,u=4==e,d=6==e,f=5==e||d,p=t||c;return function(t,c,v){for(var m,h,C=n(t),_=i(C),g=a(c,v,3),b=s(_.length),y=0,O=r?p(t,b):o?p(t,0):void 0;b>y;y++)if((f||y in _)&&(m=_[y],h=g(m,y,C),e))if(r)O[y]=h;else if(h)switch(e){case 3:return!0;case 5:return m;case 6:return y;case 2:O.push(m)}else if(u)return!1;return d?-1:l||u?u:O}}},"0d09":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"explore-cars"},[r("main-nav"),r("div",{staticClass:"explore-cars-container"},[r("div",{staticClass:"explore-cars__sidebar"},[e._m(0),r("div",{staticClass:"sidebar__filter"},[e._m(1),r("div",{staticClass:"car-price-filer"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.priceFilter.min,expression:"priceFilter.min"}],staticClass:"form-control",attrs:{type:"text",placeholder:e.prices.min},domProps:{value:e.priceFilter.min},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.filterCars("priceRange",e.priceFilter)},input:function(t){t.target.composing||e.$set(e.priceFilter,"min",t.target.value)}}}),r("div",{staticClass:"divider"},[e._v("-")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.priceFilter.max,expression:"priceFilter.max"}],staticClass:"form-control",attrs:{type:"text",placeholder:e.prices.max},domProps:{value:e.priceFilter.max},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.filterCars("priceRange",e.priceFilter)},input:function(t){t.target.composing||e.$set(e.priceFilter,"max",t.target.value)}}}),r("button",{staticClass:"btn btn-primary",on:{click:function(t){e.filterCars("priceRange",e.priceFilter)}}},[r("i",{staticClass:"fal fa-chevron-double-right"})])]),r("small",[r("a",{attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.resetPriceRange()}}},[e._v("Reset Price")])])]),r("div",{staticClass:"sidebar__filter"},[e._m(2),r("ul",{staticClass:"car-colors"},e._l(e.availableColors,function(t,a){return r("li",{key:t.id,staticClass:"car-colors__item",class:{"car-colors__item--active":t.name===e.carFilter.color},attrs:{title:t.name},on:{click:function(r){e.filterCars("color",t.name)}}},[r("span",{style:{background:t.hex}})])})),r("small",[r("a",{attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.filterCars("color","")}}},[e._v("Reset Color")])])])]),r("div",{staticClass:"explore-cars__main"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col"},[r("h3",[e._v("\n                            Explore Cars\n                            "),""!==e.carFilter.color||""!==e.carFilter.priceRange.min||""!==e.carFilter.priceRange.max?r("small",[e._v("\n                                ("+e._s(e.filteredCars.length)+"/"+e._s(e.cars.length)+")\n                            ")]):e._e()]),e.showErrorMessage?r("div",{staticClass:"alert alert-danger mb-4"},[r("i",{staticClass:"far fa-times"}),e._v("\n                            Oops, you didn't select a car yet!\n                        ")]):e._e(),0===e.filteredCars.length?r("div",{staticClass:"alert alert-info"},[r("i",{staticClass:"fas fa-info"}),e._v("\n                            There are no cars to display, please adjust the filters.\n                        ")]):e._e()])]),e.filteredCars.length>0?r("div",{staticClass:"row"},e._l(e.filteredCars,function(t){return r("div",{key:t.id,staticClass:"col-lg-4 col-md-6 explore-cars-spacing"},[r("car-card",{attrs:{car:t},on:{"CarCard:Customize":e.customizeCar}})],1)})):e._e()])])]),r("transition",{attrs:{name:"modal"}},[e.continueOrderModal?r("main-modal",{on:{"modal:close":function(t){e.continueOrderModal=!1}}},[r("h5",{attrs:{slot:"header"},slot:"header"},[e._v("You are about to change the order")]),r("p",{attrs:{slot:"body"},slot:"body"},[e._v("\n                You are about to change the order, this action will overwrite the existing order.\n            ")]),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("div",{staticClass:"btn-group"},[r("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){e.continueOrderModalPositive()}}},[r("span",[e._v("Start a new order")]),r("i",{staticClass:"fal fa-redo"})]),r("button",{staticClass:"btn btn-secondary",attrs:{type:"button"},on:{click:function(t){e.continueOrderModalNegative()}}},[r("span",[e._v("Continue with order")]),r("i",{staticClass:"fal fa-arrow-right"})])])])]):e._e()],1)],1)},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"sidebar__title"},[r("h5",[e._v("Filter")]),r("p",[r("em",[e._v("You can filter the overview by defining the right price range and color.")])])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[r("strong",[e._v("Price:")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[r("strong",[e._v("Colors")])])}];r("7f7f"),r("7514");function n(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}function s(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function c(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function o(e){return n(e)||s(e)||c()}r("ac6a");var l=r("c665"),u=r("dc0a"),d=r("aa9a"),f=r("d328"),p=r("11d9"),v=r("9ab4"),m=r("60a3"),h=r("b8ca"),C=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"box car-card",on:{click:function(t){e.$emit("CarCard:Customize",e.car,e.selectedColor)}}},[r("div",{staticClass:"car-card__header"},[r("figure",[r("transition",{attrs:{name:"slide-fade",mode:"out-in"}},e._l(e.car.images,function(t,a){return a===e.selectedColor?r("img",{key:a,staticClass:"img-fluid",attrs:{src:"img/"+t,alt:""}}):e._e()}))],1)]),r("div",{staticClass:"car-card__body"},[r("div",{staticClass:"car-card__body-top"},[r("span",{staticClass:"car-price"},[e._v(e._s(e.car.formattedPrice))]),r("ul",{staticClass:"car-colors"},e._l(e.car.colors,function(t,a){return r("li",{key:t.id,staticClass:"car-colors__item",class:{"car-colors__item--active":a===e.selectedColor},attrs:{title:t.name},on:{click:function(t){t.stopPropagation(),e.selectColor(a)}}},[r("span",{style:{background:t.hex}})])}))]),r("div",{staticClass:"car-card__body-middle"},[r("span",{staticClass:"car-brand"},[e._v(e._s(e.car.brand)+" "+e._s(e.car.type))]),r("span",{staticClass:"car-description"},[e._v(e._s(e.car.description))])])])])},_=[],g=function(e){function t(){var e;return Object(l["a"])(this,t),e=Object(f["a"])(this,Object(p["a"])(t).apply(this,arguments)),e.selectedColor=0,e}return Object(d["a"])(t,[{key:"selectColor",value:function(e){this.selectedColor=e}},{key:"image",get:function(){return this.$props.car.images[this.selectedColor]}}]),Object(u["a"])(t,e),t}(m["c"]);g=v["a"]([Object(m["a"])({name:"CarCard",props:{car:{type:Object,required:!0}}})],g);var b=g,y=b,O=r("2877"),x=Object(O["a"])(y,C,_,!1,null,null,null);x.options.__file="CarCard.vue";var k=x.exports,F=r("2ef0"),j=r("8279"),w=r("7031"),M=r("add3"),R=r("e77d"),E=r("7386"),$=function(e){function t(){var e;return Object(l["a"])(this,t),e=Object(f["a"])(this,Object(p["a"])(t).apply(this,arguments)),e.cars=[],e.showErrorMessage=!1,e.continueOrderModal=!1,e.carsSpecifications=[],e.priceFilter={min:"",max:""},e.carFilter={priceRange:{min:"",max:""},color:""},e}return Object(d["a"])(t,[{key:"customizeCar",value:function(e,t){this.carsSpecifications=[e,t];var r=this.$store.getters["Order/getOrder"];null!=r?this.continueOrderModal=!0:(this.setOrder(),this.$router.push({name:"order"}))}},{key:"mounted",value:function(){var e=this;this.showErrorMessage=!!parseInt(this.$route.query.state)||!1,M["a"].car.findAll().then(function(t){e.cars=t.data.map(j["a"].fromJson)})}},{key:"continueOrderModalNegative",value:function(){this.continueOrderModal=!1,document.body.className="",this.$router.push({name:"order"})}},{key:"continueOrderModalPositive",value:function(){this.setOrder(),this.continueOrderModalNegative()}},{key:"setOrder",value:function(){var e=new w["a"]({id:0,selectedCar:this.carsSpecifications[0],selectedColor:this.carsSpecifications[1],activeStep:w["b"].COLOR,selectedAccessories:[]});this.$store.commit("Order/setOrder",e)}},{key:"filterCars",value:function(e,t){this.carFilter[e]=Object(F["cloneDeep"])(t)}},{key:"resetPriceRange",value:function(){this.filterCars("priceRange",{min:"",max:""}),this.priceFilter={min:"",max:""}}},{key:"availableColors",get:function(){var e=[];return this.cars.forEach(function(t){e.push.apply(e,o(t.colors))}),Object(F["uniqBy"])(e,"name")}},{key:"prices",get:function(){var e=this.cars.slice(0).map(function(e){return e.price});return{min:Math.min.apply(Math,o(e)),max:Math.max.apply(Math,o(e))}}},{key:"filteredCars",get:function(){var e=this,t=this.cars.slice(0);return""===this.carFilter.priceRange.min&&""===this.carFilter.priceRange.max||(t=t.filter(function(t){return""!==e.carFilter.priceRange.min&&""!==e.carFilter.priceRange.max?t.price<=e.carFilter.priceRange.max&&t.price>=e.carFilter.priceRange.min:""!==e.carFilter.priceRange.min?t.price>=e.carFilter.priceRange.min:""===e.carFilter.priceRange.max||t.price<=e.carFilter.priceRange.max})),""!==this.carFilter.color&&(t=t.filter(function(t){var r=t.colors.find(function(t){return t.name===e.carFilter.color});return null!=r})),t}}]),Object(u["a"])(t,e),t}(m["c"]);$=v["a"]([Object(m["a"])({name:"ExploreCars",components:{MainFooter:E["a"],MainModal:R["a"],CarCard:k,MainNav:h["a"]}})],$);var A=$,P=A,N=Object(O["a"])(P,a,i,!1,null,null,null);N.options.__file="ExploreCars.vue";t["default"]=N.exports},1169:function(e,t,r){var a=r("2d95");e.exports=Array.isArray||function(e){return"Array"==a(e)}},7514:function(e,t,r){"use strict";var a=r("5ca1"),i=r("0a49")(5),n="find",s=!0;n in[]&&Array(1)[n](function(){s=!1}),a(a.P+a.F*s,"Array",{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),r("9c6c")(n)},b8ca:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("nav",{staticClass:"main-nav"},[r("div",{staticClass:"container-fluid"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col logo logo--white logo--smaller"},[r("main-logo")],1),r("main-menu")],1)])])},i=[],n=r("c665"),s=r("dc0a"),c=r("d328"),o=r("11d9"),l=r("9ab4"),u=r("60a3"),d=r("b4f6"),f=r("add6"),p=function(e){function t(){return Object(n["a"])(this,t),Object(c["a"])(this,Object(o["a"])(t).apply(this,arguments))}return Object(s["a"])(t,e),t}(u["c"]);p=l["a"]([Object(u["a"])({name:"MainNav",components:{MainLogo:d["a"],MainMenu:f["a"]}})],p);var v=p,m=v,h=r("2877"),C=Object(h["a"])(m,a,i,!1,null,null,null);C.options.__file="MainNav.vue";t["a"]=C.exports},cd1c:function(e,t,r){var a=r("e853");e.exports=function(e,t){return new(a(e))(t)}},e853:function(e,t,r){var a=r("d3f4"),i=r("1169"),n=r("2b4c")("species");e.exports=function(e){var t;return i(e)&&(t=e.constructor,"function"!=typeof t||t!==Array&&!i(t.prototype)||(t=void 0),a(t)&&(t=t[n],null===t&&(t=void 0))),void 0===t?Array:t}}}]);
//# sourceMappingURL=explore-cars.1df5de49.js.map