"use strict";!function(e){var o=document.querySelector("#callback-popup").content.querySelector(".callback-popup__container"),t=!1;e("#call-request-button").on("click",function(){var n;if(!t){var s=o.cloneNode(!0);document.body.classList.add("body-no-scroll"),document.body.appendChild(s),s.querySelector("#popup-name").focus(),c(s.querySelector("[data-mask]"));var a=document.querySelector(".callback-popup__close-button");t=!0,window.addEventListener("click",function(e){e.composedPath().some(function(e){return"string"==typeof e.className&&(e.className.includes("callback-popup__container")||e.id.includes("call-request-button"))})||u(e)});var r=e(".callback-popup__container *").find(":focusable");n=e(":focusable");for(var l=0;l<n.length;l++){var d=n[l];e.contains(d,r)&&d!==s&&(d._prevTabindex=d.getAttribute("tabindex"),d.setAttribute("tabindex",-1),d.style.pointerEvents="none",d.style.outline="none")}}var i=function(e){(function(e){return"Escape"===e.key||"Esc"===e.key})(e)&&u(e)},u=function(e){for(e.preventDefault(),s.remove(),document.body.classList.remove("body-no-scroll"),l=0;l<n.length;l++)(d=n[l])._prevTabindex?(d.setAttribute("tabindex",d._prevTabindex),d._prevTabindex=null):d.removeAttribute("tabindex"),d.style.pointerEvents="auto",d.style.outline=null;document.removeEventListener("keydown",i),a.removeEventListener("click",u),t=!1};document.addEventListener("keydown",i),a.addEventListener("click",u)}),document.querySelector(".page-footer__menu-address-wrapper").classList.remove("no-js");var n=document.querySelector(".page-footer__menu-block");n.classList.add("page-footer__menu-block--closed");var s=document.querySelector(".page-footer__address-block");function c(e){var o=e.dataset.mask.split("");function t(e){return function(e){var t=e.length<3;return o.map(function(o){if(t){if("_"!==o&&")"!==o)return o}else if("_"!==o)return o;return 0===e.length?"":e.shift()}).join("")}(e.split("").filter(function(e){return/\d/.test(e)}))}function n(){var o=e.selectionStart,n=e.selectionEnd;e.value=t(e.value.replace(/7/,"")),e.selectionStart=o,e.selectionEnd=n}e.addEventListener("click",n),e.addEventListener("keyup",n)}s.classList.add("page-footer__address-block--closed"),document.querySelector(".page-footer__header--menu").addEventListener("click",function(){n.classList.contains("page-footer__menu-block--closed")?(n.classList.remove("page-footer__menu-block--closed"),n.classList.add("page-footer__menu-block--opened"),s.classList.contains("page-footer__address-block--opened")&&(s.classList.add("page-footer__address-block--closed"),s.classList.remove("page-footer__address-block--opened"))):(n.classList.add("page-footer__menu-block--closed"),n.classList.remove("page-footer__menu-block--opened"))}),document.querySelector(".page-footer__header--address").addEventListener("click",function(){s.classList.contains("page-footer__address-block--closed")?(s.classList.remove("page-footer__address-block--closed"),s.classList.add("page-footer__address-block--opened"),n.classList.contains("page-footer__menu-block--opened")&&(n.classList.add("page-footer__menu-block--closed"),n.classList.remove("page-footer__menu-block--opened"))):(s.classList.add("page-footer__address-block--closed"),s.classList.remove("page-footer__address-block--opened"))}),Array.prototype.forEach.call(document.querySelectorAll("[data-mask]"),c),document.querySelector(".page-header__promo-button").addEventListener("click",function(){window.location.href="#form"})}(jQuery);