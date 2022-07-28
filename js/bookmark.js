/* global CONFIG */
document.addEventListener("DOMContentLoaded",()=>{"use strict";var e,o,t=()=>{localStorage.setItem("bookmark"+location.pathname,window.scrollY)},n=()=>{var e=localStorage.getItem("bookmark"+location.pathname);e=parseInt(e,10),
// If the page opens with a specific hash, just jump out
isNaN(e)||""!==location.hash||
// Auto scroll to the position
window.anime({targets:document.scrollingElement,duration:200,easing:"linear",scrollTop:e})};e=CONFIG.bookmark.save,o=document.querySelector(".book-mark-link"),
// Scroll event
window.addEventListener("scroll",()=>o.classList.toggle("book-mark-link-fixed",0===window.scrollY)),
// Register beforeunload event when the trigger is auto
"auto"===e&&(
// Register beforeunload event
window.addEventListener("beforeunload",t),window.addEventListener("pjax:send",t)),
// Save the position by clicking the icon
o.addEventListener("click",()=>{t(),window.anime({targets:o,duration:200,easing:"linear",top:-30,complete:()=>{setTimeout(()=>{o.style.top=""},400)}})}),n(),window.addEventListener("pjax:success",n)});