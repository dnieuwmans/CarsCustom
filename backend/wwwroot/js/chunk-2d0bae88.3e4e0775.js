(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bae88"],{"38e2":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h5",[t._v("Overview")]),r("table",{staticClass:"table dashboard-table"},[t._m(0),r("tbody",t._l(t.orders,function(e){return r("tr",{key:e.id},[r("td",{domProps:{textContent:t._s("#"+e.id)}}),r("td",[r("div",{staticClass:"badge badge-primary",domProps:{textContent:t._s(e.status.value)}})]),r("td",[r("a",{attrs:{href:"mailto: "+e.orderUser.email}},[t._v(t._s(e.orderUser.fullName))])]),r("td",{domProps:{textContent:t._s(e.orderUser.address)}}),r("td",{domProps:{textContent:t._s(e.selectedCar.fullDescription)}}),r("td",[r("ul",{staticClass:"car-colors"},t._l(e.selectedCar.colors,function(e,a){return r("li",{key:e.id,staticClass:"car-colors__item",class:{"car-colors__item--active":a===t.selectedColor},attrs:{title:e.name}},[r("span",{style:{background:e.hex}})])}))]),r("td",{domProps:{textContent:t._s(e.totalPrice)}}),t._m(1,!0)])}))])])},s=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",[r("tr",[r("th",[t._v("Nr")]),r("th",[t._v("Status")]),r("th",[t._v("Customer")]),r("th",[t._v("Address")]),r("th",[t._v("Selected Car")]),r("th",[t._v("Color")]),r("th",[t._v("Total Price")]),r("th",[t._v(" ")])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("td",{staticClass:"actions"},[r("a",{attrs:{href:"#"}},[r("i",{staticClass:"far fa-ellipsis-h"})])])}],o=r("c665"),c=r("dc0a"),n=r("aa9a"),l=r("d328"),d=r("11d9"),i=r("9ab4"),u=r("60a3"),_=r("add3"),v=r("8279"),h=r("7031"),f=function(t){function e(){var t;return Object(o["a"])(this,e),t=Object(l["a"])(this,Object(d["a"])(e).apply(this,arguments)),t.orders=[],t}return Object(n["a"])(e,[{key:"mounted",value:function(){var t=this;_["a"].order.getOrders().then(function(e){t.orders=e.data.map(function(t){return t.car.colors=[t.selectedColor],t.selectedCar=new v["a"](t.car),t.selectedColor=0,t.orderUser=t.user,h["a"].fromJson(t)})})}}]),Object(c["a"])(e,t),e}(u["c"]);f=i["a"]([Object(u["a"])({})],f);var m=f,C=m,b=r("2877"),p=Object(b["a"])(C,a,s,!1,null,null,null);p.options.__file="OrdersOverview.vue";e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0bae88.3e4e0775.js.map