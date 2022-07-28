/* global NexT, CONFIG */
HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this),this.parentNode.removeChild(this),e.appendChild(this)},
// https://caniuse.com/mdn-api_element_classlist_replace
"function"!=typeof DOMTokenList.prototype.replace&&(DOMTokenList.prototype.replace=function(e,t){this.remove(e),this.add(t)}),NexT.utils={
/**
   * Wrap images with fancybox.
   */
wrapImageWithFancyBox:function(){document.querySelectorAll(".post-body :not(a) > img, .post-body > img").forEach(e=>{const t=$(e),o=t.attr("data-src")||t.attr("src"),n=t.wrap(`<a class="fancybox fancybox.image" href="${o}" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>`).parent("a");t.is(".post-gallery img")?n.attr("data-fancybox","gallery").attr("rel","gallery"):t.is(".group-picture img")?n.attr("data-fancybox","group").attr("rel","group"):n.attr("data-fancybox","default").attr("rel","default");const a=t.attr("title")||t.attr("alt");a&&(n.append(`<p class="image-caption">${a}</p>`),
// Make sure img title tag will show correctly in fancybox
n.attr("title",a).attr("data-caption",a))}),$.fancybox.defaults.hash=!1,$(".fancybox").fancybox({loop:!0,helpers:{overlay:{locked:!1}}})},registerExtURL:function(){document.querySelectorAll("span.exturl").forEach(e=>{const t=document.createElement("a");
// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)).join("")),t.rel="noopener external nofollow noreferrer",t.target="_blank",t.className=e.className,t.title=e.title,t.innerHTML=e.innerHTML,e.parentNode.replaceChild(t,e)})},
/**
   * One-click copy code support.
   */
registerCopyCode:function(){let e=document.querySelectorAll("figure.highlight");0===e.length&&(e=document.querySelectorAll("pre")),e.forEach(e=>{if(e.querySelectorAll(".code .line span").forEach(e=>{e.classList.forEach(t=>{e.classList.replace(t,"hljs-"+t)})}),!CONFIG.copycode)return;e.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');const t=e.querySelector(".copy-btn");t.addEventListener("click",()=>{const o=(e.querySelector(".code")||e.querySelector("code")).innerText;if(navigator.clipboard)
// https://caniuse.com/mdn-api_clipboard_writetext
navigator.clipboard.writeText(o).then(()=>{t.querySelector("i").className="fa fa-check-circle fa-fw"},()=>{t.querySelector("i").className="fa fa-times-circle fa-fw"});else{const e=document.createElement("textarea");e.style.top=window.scrollY+"px",// Prevent page scrolling
e.style.position="absolute",e.style.opacity="0",e.readOnly=!0,e.value=o,document.body.append(e),e.select(),e.setSelectionRange(0,o.length),e.readOnly=!1;const n=document.execCommand("copy");t.querySelector("i").className=n?"fa fa-check-circle fa-fw":"fa fa-times-circle fa-fw",e.blur(),// For iOS
t.blur(),document.body.removeChild(e)}}),e.addEventListener("mouseleave",()=>{setTimeout(()=>{t.querySelector("i").className="fa fa-copy fa-fw"},300)})})},wrapTableWithBox:function(){document.querySelectorAll("table").forEach(e=>{const t=document.createElement("div");t.className="table-container",e.wrap(t)})},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach(e=>{if(["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(t=>e.src.includes(t))&&!e.parentNode.matches(".video-container")){const t=document.createElement("div");t.className="video-container",e.wrap(t);const o=Number(e.width),n=Number(e.height);o&&n&&(t.style.paddingTop=n/o*100+"%")}})},registerScrollPercent:function(){const e=document.querySelector(".back-to-top"),t=document.querySelector(".reading-progress-bar");
// For init back to top in sidebar if page was scrolled after page refresh.
window.addEventListener("scroll",()=>{if(e||t){const o=document.body.scrollHeight-window.innerHeight,n=o>0?Math.min(100*window.scrollY/o,100):0;e&&(e.classList.toggle("back-to-top-on",Math.round(n)>=5),e.querySelector("span").innerText=Math.round(n)+"%"),t&&t.style.setProperty("--progress",n.toFixed(2)+"%")}if(!Array.isArray(NexT.utils.sections))return;let o=NexT.utils.sections.findIndex(e=>e&&e.getBoundingClientRect().top>0);-1===o?o=NexT.utils.sections.length-1:o>0&&o--,this.activateNavByIndex(o)}),e&&e.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},
/**
   * Tabs tag listener (without twitter bootstrap).
   */
registerTabsTag:function(){
// Binding `nav-tabs` & `tab-content` by real time permalink changing.
document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(e=>{e.addEventListener("click",t=>{
// Prevent selected tab to select again.
if(t.preventDefault(),e.classList.contains("active"))return;
// Add & Remove active class on `nav-tabs` & `tab-content`.
[...e.parentNode.children].forEach(t=>{t.classList.toggle("active",t===e)});
// https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers
const o=document.getElementById(e.querySelector("a").getAttribute("href").replace("#",""));[...o.parentNode.children].forEach(e=>{e.classList.toggle("active",e===o)}),
// Trigger event
o.dispatchEvent(new Event("tabs:click",{bubbles:!0}))})}),window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){
// Get responsive height passed from iframe.
window.addEventListener("message",({data:e})=>{if("string"==typeof e&&e.includes("ciu_embed")){const t=e.split(":")[1],o=e.split(":")[2];document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(o,10)+5+"px"}},!1)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item a[href]").forEach(e=>{const t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html",""),o=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||o))})},registerLangSelect:function(){document.querySelectorAll(".lang-select").forEach(e=>{e.value=CONFIG.page.lang,e.addEventListener("change",()=>{const t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach(e=>{e.innerText=t.text}),
// Disable Pjax to force refresh translation of menu item
window.location.href=t.dataset.href})})},registerSidebarTOC:function(){this.sections=[...document.querySelectorAll(".post-toc li a.nav-link")].map(e=>{const t=document.getElementById(decodeURI(e.getAttribute("href")).replace("#",""));
// TOC item animation navigate.
return e.addEventListener("click",e=>{e.preventDefault();const o=t.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:o+10})}),t})},activateNavByIndex:function(e){const t=document.querySelectorAll(".post-toc li a.nav-link")[e];if(!t||t.classList.contains("active-current"))return;document.querySelectorAll(".post-toc .active").forEach(e=>{e.classList.remove("active","active-current")}),t.classList.add("active","active-current");let o=t.parentNode;for(;!o.matches(".post-toc");)o.matches("li")&&o.classList.add("active"),o=o.parentNode;
// Scrolling to center active TOC element if TOC content is taller then viewport.
const n=document.querySelector(".sidebar-panel-container");window.anime({targets:n,duration:200,easing:"linear",scrollTop:n.scrollTop-n.offsetHeight/2+t.getBoundingClientRect().top-n.getBoundingClientRect().top})},
/**
   * Init Sidebar & TOC inner dimensions on all pages and for all schemes.
   * Need for Sidebar/TOC inner scrolling if content taller then viewport.
   */
initSidebarDimension:function(){const e=document.querySelector(".sidebar-nav"),t=document.querySelector(".sidebar-inner .back-to-top"),o=e?e.offsetHeight:0,n=t?t.offsetHeight:0,a=CONFIG.sidebar.offset||12;let r=2*CONFIG.sidebar.padding+o+n;"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme||(r+=2*a);
// Initialize Sidebar & TOC Height.
const c=document.body.offsetHeight-r+"px";document.documentElement.style.setProperty("--sidebar-wrapper-height",c)},updateSidebarPosition:function(){if(NexT.utils.initSidebarDimension(),window.innerWidth<992||"Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)return;
// Expand sidebar on post detail page by default, when post has a toc.
const e=document.querySelector(".post-toc");let t=CONFIG.page.sidebar;"boolean"!=typeof t&&(
// There's no definition sidebar in the page front-matter.
t="always"===CONFIG.sidebar.display||"post"===CONFIG.sidebar.display&&e),t&&window.dispatchEvent(new Event("sidebar:show"))},getScript:function(e,t,o){if(o)t();else{const o=document.createElement("script");o.onload=()=>{setTimeout(t)},o.src=e,document.head.appendChild(o)}},loadComments:function(e,t){const o=document.querySelector(e);if(!CONFIG.comments.lazyload||!o)return void t();const n=new IntersectionObserver((e,o)=>{e[0].isIntersecting&&(t(),o.disconnect())});return n.observe(o),n}};;
/* global NexT, CONFIG */
NexT.motion={},NexT.motion.integrator={queue:[],init:function(){return this.queue=[],this},add:function(e){const t=e();return CONFIG.motion.async?this.queue.push(t):this.queue=this.queue.concat(t),this},bootstrap:function(){CONFIG.motion.async||(this.queue=[this.queue]),this.queue.forEach(e=>{const t=window.anime.timeline({duration:200,easing:"linear"});e.forEach(e=>{e.deltaT?t.add(e,e.deltaT):t.add(e)})})}},NexT.motion.middleWares={header:function(){const e=[];function t(t,o=!1){e.push({targets:t,opacity:1,top:0,deltaT:o?"-=200":"-=0"})}var o;return t(".header"),"Mist"===CONFIG.scheme&&(o=".logo-line",e.push({targets:o,scaleX:[0,1],duration:500,deltaT:"-=200"})),"Muse"===CONFIG.scheme&&t(".custom-logo-image"),t(".site-title"),t(".site-brand-container .toggle",!0),t(".site-subtitle"),("Pisces"===CONFIG.scheme||"Gemini"===CONFIG.scheme)&&t(".custom-logo-image"),document.querySelectorAll(".menu-item").forEach(t=>{e.push({targets:t,complete:()=>t.classList.add("animated","fadeInDown"),deltaT:"-=200"})}),e},subMenu:function(){const e=document.querySelectorAll(".sub-menu .menu-item");return e.length>0&&e.forEach(e=>{e.classList.add("animated")}),[]},postList:function(){const e=[],{post_block:t,post_header:o,post_body:n,coll_header:s}=CONFIG.motion.transition;function i(t,o){t&&document.querySelectorAll(o).forEach(o=>{e.push({targets:o,complete:()=>o.classList.add("animated",t),deltaT:"-=100"})})}return i(t,".post-block, .pagination, .comments"),i(s,".collection-header"),i(o,".post-header"),i(n,".post-body"),e},sidebar:function(){const e=document.querySelector(".sidebar"),t=CONFIG.motion.transition.sidebar;
// Only for Pisces | Gemini.
return!t||"Pisces"!==CONFIG.scheme&&"Gemini"!==CONFIG.scheme?[]:[{targets:e,complete:()=>e.classList.add("animated",t)}]},footer:function(){return[{targets:document.querySelector(".footer"),opacity:1}]}};;
/* global CONFIG */
document.addEventListener("DOMContentLoaded",()=>{const e="right"===CONFIG.sidebar.position,t={};function i(){const e=document.querySelector(".footer"),t=document.querySelector(".header").offsetHeight+document.querySelector(".main").offsetHeight+e.offsetHeight;e.classList.toggle("footer-fixed",t<=window.innerHeight)}({lines:document.querySelector(".sidebar-toggle"),init:function(){window.addEventListener("mousedown",this.mousedownHandler),window.addEventListener("mouseup",this.mouseupHandler.bind(this)),document.querySelector(".sidebar-dimmer").addEventListener("click",this.clickHandler.bind(this)),document.querySelector(".sidebar-toggle").addEventListener("click",this.clickHandler.bind(this)),window.addEventListener("sidebar:show",this.showSidebar),window.addEventListener("sidebar:hide",this.hideSidebar)},mousedownHandler:function(e){t.X=e.pageX,t.Y=e.pageY},mouseupHandler:function(e){const i=e.pageX-t.X,d=e.pageY-t.Y;
// Fancybox has z-index property, but medium-zoom does not, so the sidebar will overlay the zoomed image.
(Math.hypot(i,d)<20&&e.target.matches(".main")||e.target.matches("img.medium-zoom-image"))&&this.hideSidebar()},clickHandler:function(){document.body.classList.contains("sidebar-active")?this.hideSidebar():this.showSidebar()},showSidebar:function(){document.body.classList.add("sidebar-active");const t=e?"fadeInRight":"fadeInLeft";document.querySelectorAll(".sidebar .animated").forEach((e,i)=>{e.style.animationDelay=100*i+"ms",e.classList.remove(t),setTimeout(()=>{
// Trigger a DOM reflow
e.classList.add(t)})})},hideSidebar:function(){document.body.classList.remove("sidebar-active")}}).init(),i(),window.addEventListener("resize",i),window.addEventListener("scroll",i)});;
/* global NexT, CONFIG */
NexT.boot={},NexT.boot.registerEvents=function(){NexT.utils.registerScrollPercent(),NexT.utils.registerCanIUseTag(),
// Mobile top menu bar.
document.querySelector(".site-nav-toggle .toggle").addEventListener("click",e=>{e.currentTarget.classList.toggle("toggle-close");const t=document.querySelector(".site-nav");t&&(t.style.setProperty("--scroll-height",t.scrollHeight+"px"),document.body.classList.toggle("site-nav-on"))});document.querySelectorAll(".sidebar-nav li").forEach((e,t)=>{e.addEventListener("click",()=>{if(e.matches(".sidebar-toc-active .sidebar-nav-toc, .sidebar-overview-active .sidebar-nav-overview"))return;const i=document.querySelector(".sidebar-inner"),o=document.querySelector(".sidebar-panel-container"),r=["sidebar-toc-active","sidebar-overview-active"];window.anime({duration:200,targets:o,easing:"linear",opacity:0,translateY:[0,-20],complete:()=>{
// Prevent adding TOC to Overview if Overview was selected when close & open sidebar.
i.classList.replace(r[1-t],r[t]),window.anime({duration:200,targets:o,easing:"linear",opacity:[0,1],translateY:[-20,0]})}})})}),window.addEventListener("resize",NexT.utils.initSidebarDimension),window.addEventListener("hashchange",()=>{const e=location.hash;if(""!==e&&!e.match(/%\S{2}/)){const t=document.querySelector(`.tabs ul.nav-tabs li a[href="${e}"]`);t&&t.click()}})},NexT.boot.refresh=function(){
/**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'scripts/helpers/next-config.js' file.
   */
CONFIG.prism&&window.Prism.highlightAll(),CONFIG.fancybox&&NexT.utils.wrapImageWithFancyBox(),CONFIG.mediumzoom&&window.mediumZoom(".post-body :not(a) > img, .post-body > img",{background:"var(--content-bg-color)"}),CONFIG.lazyload&&window.lozad(".post-body img").observe(),CONFIG.pangu&&window.pangu.spacingPage(),CONFIG.exturl&&NexT.utils.registerExtURL(),NexT.utils.registerCopyCode(),NexT.utils.registerTabsTag(),NexT.utils.registerActiveMenuItem(),NexT.utils.registerLangSelect(),NexT.utils.registerSidebarTOC(),NexT.utils.wrapTableWithBox(),NexT.utils.registerVideoIframe()},NexT.boot.motion=function(){
// Define Motion Sequence & Bootstrap Motion.
CONFIG.motion.enable&&NexT.motion.integrator.add(NexT.motion.middleWares.header).add(NexT.motion.middleWares.postList).add(NexT.motion.middleWares.sidebar).add(NexT.motion.middleWares.footer).bootstrap(),NexT.utils.updateSidebarPosition()},document.addEventListener("DOMContentLoaded",()=>{NexT.boot.registerEvents(),NexT.boot.refresh(),NexT.boot.motion()});