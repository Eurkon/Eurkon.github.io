class LocalSearch{constructor({path:e="",unescape:t=!1,top_n_per_article:n=1}){this.path=e,this.unescape=t,this.top_n_per_article=n,this.isfetched=!1,this.datas=null}getIndexByWord(e,t,n=!1){const s=[],o=new Set;return n||(t=t.toLowerCase()),e.forEach((e=>{if(this.unescape){const t=document.createElement("div");t.innerText=e,e=t.innerHTML}const r=e.length;if(0===r)return;let i=0,a=-1;for(n||(e=e.toLowerCase());(a=t.indexOf(e,i))>-1;)s.push({position:a,word:e}),o.add(e),i=a+r})),s.sort(((e,t)=>e.position!==t.position?e.position-t.position:t.word.length-e.word.length)),[s,o]}mergeIntoSlice(e,t,n){let s=n[0],{position:o,word:r}=s;const i=[],a=new Set;for(;o+r.length<=t&&0!==n.length;){a.add(r),i.push({position:o,length:r.length});const e=o+r.length;for(n.shift();0!==n.length&&(s=n[0],o=s.position,r=s.word,e>o);)n.shift()}return{hits:i,start:e,end:t,count:a.size}}highlightKeyword(e,t){let n="",s=t.start;for(const{position:o,length:r}of t.hits)n+=e.substring(s,o),s=o+r,n+=`<mark class="search-keyword">${e.substr(o,r)}</mark>`;return n+=e.substring(s,t.end),n}getResultItems(e){const t=[];return this.datas.forEach((({title:n,content:s,url:o,categories:r,tags:i})=>{const[a,c]=this.getIndexByWord(e,n),[l,h]=this.getIndexByWord(e,s),d=new Set([...c,...h]).size,u=a.length+l.length;if(0===u)return;const g=[];0!==a.length&&g.push(this.mergeIntoSlice(0,n.length,a));let p=[];for(;0!==l.length;){const e=l[0],{position:t}=e,n=Math.max(0,t-20),o=Math.min(s.length,t+100);p.push(this.mergeIntoSlice(n,o,l))}p.sort(((e,t)=>e.count!==t.count?t.count-e.count:e.hits.length!==t.hits.length?t.hits.length-e.hits.length:e.start-t.start));const m=parseInt(this.top_n_per_article,10);m>=0&&(p=p.slice(0,m));let f="";(o=new URL(o,location.origin)).searchParams.append("highlight",e.join(" ")),0!==g.length?f+=`<li class="local-search-hit-item"><a href="${o.href}"><span class="search-result-title">${this.highlightKeyword(n,g[0])}</span>`:f+=`<li class="local-search-hit-item"><a href="${o.href}"><span class="search-result-title">${n}</span>`,i.forEach((e=>{f+=`<a class="search-result-tag" href="${GLOBAL_CONFIG.root+"tags/"+e+"/"}">${(GLOBAL_CONFIG.emoji&&GLOBAL_CONFIG.emoji.tags&&GLOBAL_CONFIG.emoji.tags[e]||"")+e}</a>`})),p.forEach((e=>{f+=`<p class="search-result">${this.highlightKeyword(s,e)}...</p></a>`})),f+="</li>",t.push({item:f,id:t.length,hitCount:u,includedCount:d})})),t}fetchData(){const e=!this.path.endsWith("json");fetch(this.path).then((e=>e.text())).then((t=>{this.isfetched=!0,this.datas=e?[...(new DOMParser).parseFromString(t,"text/xml").querySelectorAll("entry")].map((e=>({categories:[...e.querySelectorAll("category")].map((e=>e.textContent.trim())),tags:[...e.querySelectorAll("tag")].map((e=>e.textContent.trim())),title:e.querySelector("title").textContent,content:e.querySelector("content").textContent,url:e.querySelector("url").textContent}))):JSON.parse(t),this.datas=this.datas.filter((e=>e.title)).map((e=>(e.title=e.title.trim(),e.content=e.content?e.content.trim().replace(/<[^>]+>/g,""):"",e.url=decodeURIComponent(e.url).replace(/\/{2,}/g,"/"),e))),window.dispatchEvent(new Event("search:loaded"))}))}highlightText(e,t,n){const s=e.nodeValue;let o=t.start;const r=[];for(const{position:e,length:i}of t.hits){const t=document.createTextNode(s.substring(o,e));o=e+i;const a=document.createElement("mark");a.className=n,a.appendChild(document.createTextNode(s.substr(e,i))),r.push(t,a)}e.nodeValue=s.substring(o,t.end),r.forEach((t=>{e.parentNode.insertBefore(t,e)}))}highlightSearchWords(e){const t=new URL(location.href).searchParams.get("highlight"),n=t?t.split(" "):[];if(!n.length||!e)return;const s=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null),o=[];for(;s.nextNode();)s.currentNode.parentNode.matches("button, select, textarea, .mermaid")||o.push(s.currentNode);o.forEach((e=>{const[t]=this.getIndexByWord(n,e.nodeValue);if(!t.length)return;const s=this.mergeIntoSlice(0,e.nodeValue.length,t);this.highlightText(e,s,"search-keyword")}))}}window.addEventListener("load",(()=>{const{path:e,top_n_per_article:t,unescape:n,languages:s}=GLOBAL_CONFIG.localSearch,o=new LocalSearch({path:e,top_n_per_article:t,unescape:n}),r=document.querySelector("#local-search-input input"),i=document.getElementById("local-search-stats-wrap"),a=document.getElementById("loading-status"),c=!e.endsWith("json"),l=()=>{if(!o.isfetched)return;let e=r.value.trim().toLowerCase();c&&(e=e.replace(/</g,"&lt;").replace(/>/g,"&gt;")),""!==e&&(a.innerHTML='<i class="fas fa-spinner fa-pulse"></i>');const t=e.split(/[-\s]+/),n=document.getElementById("local-search-results");let l=[];if(e.length>0&&(l=o.getResultItems(t)),1===t.length&&""===t[0])n.textContent="",i.textContent="";else if(0===l.length){n.textContent="";const t=document.createElement("div");t.className="search-result-stats",t.textContent=s.hits_empty.replace(/\$\{query}/,e),i.innerHTML=t.outerHTML}else{l.sort(((e,t)=>e.includedCount!==t.includedCount?t.includedCount-e.includedCount:e.hitCount!==t.hitCount?t.hitCount-e.hitCount:t.id-e.id));const e=s.hits_stats.replace(/\$\{hits}/,l.length);n.innerHTML=`<ol class="search-result-list">${l.map((e=>e.item)).join("")}</ol>`,i.innerHTML=`<hr><div class="search-result-stats">${e}</div>`,window.pjax&&window.pjax.refresh(n)}a.textContent=""};let h=!1;const d=document.getElementById("search-mask"),u=document.querySelector("#local-search .search-dialog"),g=()=>{window.innerWidth<768&&u.style.setProperty("--search-height",window.innerHeight+"px")},p=()=>{btf.overflowPaddingR.add(),btf.animateIn(d,"to_show 0.5s"),btf.animateIn(u,"titleScale 0.5s"),setTimeout((()=>{r.focus()}),300),h||(!o.isfetched&&o.fetchData(),r.addEventListener("input",l),h=!0),document.addEventListener("keydown",(function e(t){"Escape"===t.code&&(m(),document.removeEventListener("keydown",e))})),g(),window.addEventListener("resize",g)},m=()=>{btf.overflowPaddingR.remove(),btf.animateOut(u,"search_close .5s"),btf.animateOut(d,"to_hide 0.5s"),window.removeEventListener("resize",g)},f=()=>{btf.addEventListenerPjax(document.querySelector("#search-button > .search"),"click",p)};window.addEventListener("search:loaded",(()=>{const e=document.getElementById("loading-database");e.nextElementSibling.style.display="block",e.remove()})),f(),document.querySelector("#local-search .search-close-button").addEventListener("click",m),d.addEventListener("click",m),GLOBAL_CONFIG.localSearch.preload&&o.fetchData(),o.highlightSearchWords(document.getElementById("article-container")),window.addEventListener("pjax:complete",(()=>{!btf.isHidden(d)&&m(),o.highlightSearchWords(document.getElementById("article-container")),f()})),document.getElementById("menu-search").addEventListener("click",(function(){p(),setTimeout((()=>{let e=document.querySelector("#local-search-input input"),t=document.createEvent("HTMLEvents");t.initEvent("input",!1,!1),e.value=rightMenuContext.text,e.dispatchEvent(t)}),100)}))}));