document.addEventListener("DOMContentLoaded",(()=>{let t,e,n=!1;const o=n=>{const o=t=>Array.from(t).reduce(((t,e)=>t+e.offsetWidth),0);if(n){const n=o(document.querySelector("#blog-info > a").children),i=o(document.getElementById("menus").children);t=n+i,e=document.getElementById("nav")}const i=window.innerWidth<=768||t>e.offsetWidth-120;e.classList.toggle("hide-menu",i)},i=()=>{btf.overflowPaddingR.add(),btf.animateIn(document.getElementById("menu-mask"),"to_show 0.5s"),document.getElementById("sidebar-menus").classList.add("open"),n=!0},s=()=>{btf.overflowPaddingR.remove(),btf.animateOut(document.getElementById("menu-mask"),"to_hide 0.5s"),document.getElementById("sidebar-menus").classList.remove("open"),n=!1},a=()=>{const t=GLOBAL_CONFIG.highlight;if(!t)return;const{highlightCopy:e,highlightLang:n,highlightHeightLimit:o,highlightFullpage:i,highlightMacStyle:s,plugin:a}=t,c=GLOBAL_CONFIG_SITE.isHighlightShrink,l=e||n||void 0!==c||i||s,r="highlight.js"===a?document.querySelectorAll("figure.highlight"):document.querySelectorAll('pre[class*="language-"]');if(!l&&!o||!r.length)return;const d="prismjs"===a,u=!0===c?"closed":"",m=void 0!==c?'<i class="fas fa-angle-down expand"></i>':"",g=e?'<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>':"",f=i?'<i class="fa-solid fa-up-right-and-down-left-from-center fullpage-button"></i>':"",h=(t,e)=>{void 0!==GLOBAL_CONFIG.Snackbar?btf.snackbarShow(e):(t.textContent=e,t.style.opacity=1,setTimeout((()=>{t.style.opacity=0}),800))},p=(t,e)=>{const n=t.parentNode;n.classList.add("copy-true");const o=d?"pre code":"table .code pre",i=n.querySelector(o);i&&((async(t,e)=>{try{await navigator.clipboard.writeText(t),h(e,GLOBAL_CONFIG.copy.success)}catch(t){console.error("Failed to copy: ",t),h(e,GLOBAL_CONFIG.copy.noSupport)}})(i.innerText,e.previousElementSibling),n.classList.remove("copy-true"))},L=t=>{const e=t.target.classList,n=t.currentTarget;e.contains("expand")?n.classList.toggle("closed"):e.contains("copy-button")?p(n,t.target):e.contains("fullpage-button")&&((t,e)=>{const n=t.closest("figure.highlight").classList.toggle("code-fullpage");document.body.style.overflow=n?"hidden":"",e.classList.toggle("fa-down-left-and-up-right-to-center",n),e.classList.toggle("fa-up-right-and-down-left-from-center",!n)})(n,t.target)},b=t=>t.currentTarget.classList.toggle("expand-done"),y=(t,e)=>{const n=document.createDocumentFragment();if(l){const e=document.createElement("div");e.className=`highlight-tools ${u}`,e.innerHTML='<div class="macStyle"><div class="mac-close"></div><div class="mac-minimize"></div><div class="mac-maximize"></div></div>'+m+t+g+f,btf.addEventListenerPjax(e,"click",L),n.appendChild(e)}if(o&&(t=>{const e=new Map;(()=>{let n=t;for(;n!==document.body&&null!=n;)"none"===window.getComputedStyle(n).display&&e.set(n,n.getAttribute("style")||""),n=n.parentNode;const o="visibility: hidden !important; display: block !important;";e.forEach(((t,e)=>{e.setAttribute("style",t?t+";"+o:o)}))})();const n=t.offsetHeight;return e.forEach(((t,e)=>{""===t?e.removeAttribute("style"):e.setAttribute("style",t)})),n})(e)>o+30){const t=document.createElement("div");t.className="code-expand-btn",t.innerHTML='<i class="fas fa-angle-double-down"></i>',btf.addEventListenerPjax(t,"click",b),n.appendChild(t)}d?e.parentNode.insertBefore(n,e):e.insertBefore(n,e.firstChild)};r.forEach((t=>{let e="";d&&btf.wrap(t,"figure",{class:"highlight"}),n?(d?e=t.getAttribute("data-language")||"Code":(e=t.getAttribute("class").split(" ")[1],"plain"!==e&&void 0!==e||(e="Code")),y(`<div class="code-lang">${e}</div>`,t)):y("",t)}))},c=async t=>{const e=await fetch(t);return await e.json()},l=(t,e,n=!1,o)=>{const i=e.length,s=new InfiniteGrid.JustifiedInfiniteGrid(t,{gap:5,isConstantSize:!0,sizeRange:[150,600],useTransform:!0}),a=t=>t.replace(/"/g,"&quot;"),c=GLOBAL_CONFIG.infinitegrid.buttonText,l=(t,n)=>{s.append(((t,n)=>{const o=[],s=(t-1)*n;for(let t=0;t<n;++t){const n=s+t;if(n>=i)break;const c=e[n],l=c.alt?`alt="${a(c.alt)}"`:"",r=c.title?`title="${a(c.title)}"`:"";o.push(`<div class="item">\n            <img src="${c.url}" data-grid-maintained-target="true" ${l+r} />\n          </div>`)}return o})(t,n),t)},r=Math.ceil(i/10);let d=!1;const u=e=>{if(o){const e=t.parentNode;d&&(e.style.visibility="visible"),0===t.offsetHeight&&(e.style.visibility="hidden",d=!0)}const{updated:i,isResize:a,mounted:m}=e;if(i.length&&m.length&&!a){if(btf.loadLightbox(t.querySelectorAll("img:not(.medium-zoom-image)")),s.getGroups().length===r)return btf.setLoading.remove(t),void(!o&&s.off("renderComplete",u));n&&(btf.setLoading.remove(t),(t=>{const e=document.createElement("button");e.innerHTML=c+'<i class="fa-solid fa-arrow-down"></i>',e.addEventListener("click",(e=>{e.target.closest("button").remove(),btf.setLoading.add(t),l(s.getGroups().length+1,10)}),{once:!0}),t.insertAdjacentElement("afterend",e)})(t))}},m=btf.debounce((t=>{const e=(+t.groupKey||0)+1;l(e,10),e===r&&s.off("requestAppend",m)}),300);btf.setLoading.add(t),s.on("renderComplete",u),n?l(1,10):(s.on("requestAppend",m),s.renderItems()),btf.addGlobalFn("pjaxSendOnce",(()=>{s.destroy()}))},r=async(t,e=!1)=>{if(!t.length)return;const n=async()=>{for(const n of t){if(btf.isHidden(n)||n.classList.contains("loaded"))continue;const t="true"===n.getAttribute("data-button"),o=n.firstElementChild,i=o.textContent;o.textContent="",n.classList.add("loaded");try{const s="url"===n.getAttribute("data-type")?await c(i):JSON.parse(i);l(o,s,t,e)}catch(t){console.error("Gallery data parsing failed:",t)}}};"function"==typeof InfiniteGrid||await btf.getScript(`${GLOBAL_CONFIG.infinitegrid.js}`),n()},d=()=>{const t=document.getElementById("rightside"),e=window.innerHeight+56;let n=0;const o=document.getElementById("page-header"),i="undefined"!=typeof chatBtn,s=GLOBAL_CONFIG.percent.rightside,a=()=>document.body.scrollHeight<=e&&(t.classList.add("rightside-show"),!0);if(a())return;let c="";const l=btf.throttle((()=>{const e=window.scrollY||document.documentElement.scrollTop,l=(t=>{const e=t>n;return n=t,e})(e);e>56?(""===c&&(o.classList.add("nav-fixed"),t.classList.add("rightside-show")),l?"down"!==c&&(o.classList.remove("nav-visible"),i&&window.chatBtn.hide(),c="down"):"up"!==c&&(o.classList.add("nav-visible"),i&&window.chatBtn.show(),c="up")):(c="",0===e&&o.classList.remove("nav-fixed","nav-visible"),t.classList.remove("rightside-show")),s&&(t=>{const e=btf.getScrollPercent(t,document.body),n=document.getElementById("go-up");e<95?(n.classList.add("show-percent"),n.querySelector(".scroll-percent").textContent=e):n.classList.remove("show-percent")})(e),a()}),300);btf.addEventListenerPjax(window,"scroll",l,{passive:!0})},u=()=>{const t=GLOBAL_CONFIG_SITE.isToc,e=GLOBAL_CONFIG.isAnchor,n=document.getElementById("article-container");if(!n||!t&&!e)return;let o,i,s,a,c;if(t){const t=document.getElementById("card-toc");i=t.querySelector(".toc-content"),o=i.querySelectorAll(".toc-link"),a=t.querySelector(".toc-percentage"),c=i.classList.contains("is-expand");const e=e=>{const n=e.target.closest(".toc-link");n&&(e.preventDefault(),btf.scrollToDest(btf.getEleTop(document.getElementById(decodeURI(n.getAttribute("href")).replace("#",""))),300),window.innerWidth<900&&t.classList.remove("open"))};btf.addEventListenerPjax(i,"click",e),s=t=>{const e=i.clientHeight,n=t.offsetTop,o=t.clientHeight,s=i.scrollTop,a=n-s,c=(e-o)/2;a!==c&&(i.scrollTop=s+(a-c))},i.style.display="block"}const l=n.querySelectorAll("h1,h2,h3,h4,h5,h6");let r="";const d=btf.throttle((()=>{const d=window.scrollY||document.documentElement.scrollTop;t&&GLOBAL_CONFIG.percent.toc&&(a.textContent=btf.getScrollPercent(d,n)),(n=>{if(0===n)return!1;let a="",d="";for(let t=0;t<l.length;t++){const e=l[t];if(!(n>btf.getEleTop(e)-80))break;{const n=e.id;a=n?"#"+encodeURI(n):"",d=t}}if(r!==d&&(e&&btf.updateAnchor(a),r=d,t&&(i.querySelectorAll(".active").forEach((t=>t.classList.remove("active"))),a))){const t=o[d];if(t.classList.add("active"),setTimeout((()=>s(t)),0),!c){let e=t.parentNode;for(;!e.matches(".toc");)e.matches("li")&&e.classList.add("active"),e=e.parentNode}}})(d)}),100);btf.addEventListenerPjax(window,"scroll",d,{passive:!0})},m=t=>{const e=(window.globalFn||{}).themeChange||{};e&&Object.keys(e).forEach((n=>{const o=e[n];["disqus","disqusjs"].includes(n)?setTimeout((()=>o(t)),300):o(t)}))},g={readmode:()=>{const t=document.body,e=document.createElement("button"),n=()=>{t.classList.remove("read-mode"),e.remove(),e.removeEventListener("click",n),document.querySelector("#menu-readmode>span")&&(document.querySelector("#menu-readmode>span").innerHTML="阅读模式"),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow("已关闭阅读模式")};t.classList.add("read-mode"),e.type="button",e.className="fas fa-sign-out-alt exit-readmode",e.addEventListener("click",n),t.appendChild(e),document.querySelector("#menu-readmode>span")&&(document.querySelector("#menu-readmode>span").innerHTML="退出阅读"),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow("已开启阅读模式")},darkmode:()=>{const t="dark"===document.documentElement.getAttribute("data-theme")?"light":"dark";"dark"===t?(btf.activateDarkMode(),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)):(btf.activateLightMode(),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)),btf.saveToLocal.set("theme",t,2),m(t)},"rightside-config":t=>{const e=t.firstElementChild;e.classList.contains("show")&&(e.classList.add("status"),setTimeout((()=>{e.classList.remove("status")}),300)),e.classList.toggle("show")},"go-up":()=>{btf.scrollToDest(0,500)},"hide-aside-btn":()=>{const t=document.documentElement.classList,e=t.contains("hide-aside")?"show":"hide";btf.saveToLocal.set("aside-status",e,2),t.toggle("hide-aside"),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(t.contains("hide-aside")?"已显示侧边栏":"已隐藏侧边栏")},"mobile-toc-button":(t,e)=>{const n=document.getElementById("card-toc");n.style.transition="transform 0.3s ease-in-out";const o=n.clientHeight,i=e.getBoundingClientRect(),s=window.innerHeight-i.bottom-30;o>s&&(n.style.transformOrigin=`right ${o-s-i.height/2}px`),n.classList.toggle("open"),n.addEventListener("transitionend",(()=>{n.style.cssText=""}),{once:!0})},"chat-btn":()=>{window.chatBtnFn()},translateLink:()=>{window.translateFn.translatePage()}};document.getElementById("rightside").addEventListener("click",(t=>{const e=t.target.closest("[id]");e&&g[e.id]&&g[e.id](t.currentTarget,e)}));const f=()=>{const t=document.querySelectorAll("#article-container .tabs");if(!t.length)return;const e=(t,e)=>{t.forEach(((t,n)=>{t.classList.toggle("active",n===e)}))},n=t=>{const n=t.target.closest("button");if(!n||n.classList.contains("active"))return;const o=[...t.currentTarget.children],i=[...t.currentTarget.nextElementSibling.children],s=o.indexOf(n);e(o,s),t.currentTarget.classList.remove("no-default"),e(i,s),r(i[s].querySelectorAll(".gallery-container"),!0)};t.forEach((t=>{btf.addEventListenerPjax(t.firstElementChild,"click",n),btf.addEventListenerPjax(t.lastElementChild,"click",(t=>e=>{e.target.closest("button")&&btf.scrollToDest(btf.getEleTop(t),300)})(t))}))},h=t=>{t.forEach((t=>{t.textContent=btf.diffDate(t.getAttribute("datetime"),!0),t.style.display="inline"}))},p=()=>{a(),GLOBAL_CONFIG.isPhotoFigcaption&&document.querySelectorAll("#article-container img").forEach((t=>{const e=t.title||t.alt;if(!e)return;const n=document.createElement("div");n.className="img-alt text-center",n.textContent=e,t.insertAdjacentElement("afterend",n)})),r(document.querySelectorAll("#article-container .gallery-container")),btf.loadLightbox(document.querySelectorAll("#article-container img:not(.no-lightbox)")),u(),(()=>{const t=document.querySelectorAll("#article-container table");t.length&&t.forEach((t=>{t.closest(".highlight")||btf.wrap(t,"div",{class:"table-wrap"})}))})(),(()=>{const t=document.querySelectorAll("#article-container .hide-button");t.length&&t.forEach((t=>t.addEventListener("click",(t=>{const e=t.currentTarget;e.classList.add("open"),r(e.nextElementSibling.querySelectorAll(".gallery-container"))}),{once:!0})))})(),f()},L=()=>{o(!0),e.classList.add("show"),(()=>{const t=document.getElementById("recent-posts");if(!t||!t.classList.contains("masonry"))return;const e=()=>{const t=new InfiniteGrid.MasonryInfiniteGrid(".recent-post-items",{gap:{horizontal:10,vertical:20},useTransform:!0,useResizeObserver:!0});t.renderItems(),btf.addGlobalFn("pjaxCompleteOnce",(()=>{t.destroy()}),"removeJustifiedIndexPostUI")};"function"==typeof InfiniteGrid?e():btf.getScript(`${GLOBAL_CONFIG.infinitegrid.js}`).then(e)})(),GLOBAL_CONFIG_SITE.isPost?(void 0!==GLOBAL_CONFIG.noticeOutdate&&(()=>{const{limitDay:t,messagePrev:e,messageNext:n,position:o}=GLOBAL_CONFIG.noticeOutdate,i=btf.diffDate(GLOBAL_CONFIG_SITE.postUpdate);if(i>=t){const t=document.createElement("div");t.className="post-outdate-notice",t.textContent=`${e} ${i} ${n}`;const s=document.getElementById("article-container");"top"===o?s.insertBefore(t,s.firstChild):s.appendChild(t)}})(),GLOBAL_CONFIG.relativeDate.post&&h(document.querySelectorAll("#post-meta time"))):(GLOBAL_CONFIG.relativeDate.homepage&&h(document.querySelectorAll("#recent-posts time")),GLOBAL_CONFIG.runtime&&(()=>{const t=document.getElementById("runtimeshow");if(t){const e=t.getAttribute("data-publishDate");t.textContent=`${btf.diffDate(e)} ${GLOBAL_CONFIG.runtime}`}})(),(()=>{const t=document.getElementById("last-push-date");if(t){const e=t.getAttribute("data-lastPushDate");t.textContent=btf.diffDate(e,!0)}})(),(()=>{const t=document.querySelector("#aside-cat-list.expandBtn");if(!t)return;btf.addEventListenerPjax(t,"click",(t=>{const e=t.target;"I"===e.nodeName&&(t.preventDefault(),e.parentNode.classList.toggle("expand"))}),!0)})()),GLOBAL_CONFIG_SITE.isHome&&(()=>{const t=document.getElementById("scroll-down");t&&btf.addEventListenerPjax(t,"click",(()=>{btf.scrollToDest(document.getElementById("content-inner").offsetTop,300)}))})(),d(),p(),(()=>{const t=document.getElementById("switch-btn");if(!t)return;let e=!1;const n=document.getElementById("post-comment");btf.addEventListenerPjax(t,"click",(()=>{n.classList.toggle("move"),e||"function"!=typeof loadOtherComment||(e=!0,loadOtherComment())}))})(),(()=>{const t=document.getElementById("toggle-menu");t&&btf.addEventListenerPjax(t,"click",(()=>{i()}))})()};btf.addGlobalFn("pjaxComplete",L,"refreshFn"),L(),(()=>{window.addEventListener("resize",(()=>{o(!1),n&&btf.isHidden(document.getElementById("toggle-menu"))&&s()}));const t=document.getElementById("menu-mask");t&&t.addEventListener("click",(()=>{s()})),(()=>{const t=document.querySelector("#sidebar-menus .menus_items");t&&t.addEventListener("click",(t=>{const e=t.target.closest(".site-page.group");e&&e.classList.toggle("hide")}))})(),GLOBAL_CONFIG.islazyload&&(window.lazyLoadInstance=new LazyLoad({elements_selector:"img",threshold:0,data_src:"lazy-src"}),btf.addGlobalFn("pjaxComplete",(()=>{window.lazyLoadInstance.update()}),"lazyload")),void 0!==GLOBAL_CONFIG.copyright&&(()=>{const{limitCount:t,languages:e}=GLOBAL_CONFIG.copyright;document.body.addEventListener("copy",(n=>{n.preventDefault();const o=window.getSelection(0).toString();let i=o;return o.length>t&&(i=`${o}\n\n\n${e.author}\n${e.link}${window.location.href}\n${e.source}\n${e.info}`),n.clipboardData?n.clipboardData.setData("text",i):window.clipboardData.setData("text",i)}))})(),GLOBAL_CONFIG.autoDarkmode&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(t=>{void 0===btf.saveToLocal.get("theme")&&(t.matches?m("dark"):m("light"))}))})(),window.addEventListener("hexo-blog-decrypt",(t=>{p(),window.translateFn.translateInitialization(),Object.values(window.globalFn.encrypt).forEach((t=>{t()}))}))}));