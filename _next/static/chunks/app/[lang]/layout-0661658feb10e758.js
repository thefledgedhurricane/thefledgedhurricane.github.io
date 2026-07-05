(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[160],{315:(e,t,a)=>{"use strict";a.d(t,{IB:()=>r,q:()=>s});let s="ar",r=["ar","fr","en","es"]},674:e=>{e.exports={style:{fontFamily:"'Inter', 'Inter Fallback'",fontStyle:"normal"},className:"__className_f367f3",variable:"__variable_f367f3"}},2768:e=>{e.exports={style:{fontFamily:"'Playfair Display', 'Playfair Display Fallback'",fontStyle:"normal"},className:"__className_d59ba8",variable:"__variable_d59ba8"}},3556:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,5022,23)),Promise.resolve().then(a.t.bind(a,674,23)),Promise.resolve().then(a.t.bind(a,2768,23)),Promise.resolve().then(a.t.bind(a,4684,23)),Promise.resolve().then(a.t.bind(a,6590,23)),Promise.resolve().then(a.bind(a,7544))},4419:(e,t,a)=>{"use strict";var s=a(7979);a.o(s,"useParams")&&a.d(t,{useParams:function(){return s.useParams}}),a.o(s,"usePathname")&&a.d(t,{usePathname:function(){return s.usePathname}})},4684:e=>{e.exports={style:{fontFamily:"'Cormorant Garamond', 'Cormorant Garamond Fallback'",fontStyle:"normal"},className:"__className_054274",variable:"__variable_054274"}},5818:(e,t,a)=>{"use strict";a.d(t,{A:()=>l});var s=a(9809);let r=(...e)=>e.filter((e,t,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===t).join(" ").trim();var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,s.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:i,className:l="",children:o,iconNode:c,...m},d)=>(0,s.createElement)("svg",{ref:d,...n,width:t,height:t,stroke:e,strokeWidth:i?24*Number(a)/Number(t):a,className:r("lucide",l),...m},[...c.map(([e,t])=>(0,s.createElement)(e,t)),...Array.isArray(o)?o:[o]])),l=(e,t)=>{let a=(0,s.forwardRef)(({className:a,...n},l)=>(0,s.createElement)(i,{ref:l,iconNode:t,className:r(`lucide-${e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,a),...n}));return a.displayName=`${e}`,a}},6590:e=>{e.exports={style:{fontFamily:"'Noto Sans Arabic', 'Noto Sans Arabic Fallback'",fontStyle:"normal"},className:"__className_2d2c7e",variable:"__variable_2d2c7e"}},7544:(e,t,a)=>{"use strict";a.d(t,{default:()=>y});var s=a(6421),r=a(9809),n=a(5022),i=a.n(n),l=a(4419),o=a(5818);let c=(0,o.A)("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]),m=(0,o.A)("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);var d=a(9063),h=a(7592),u=a(315);let b={ar:"ع",fr:"FR",en:"EN",es:"ES"},p={ar:"العربية",fr:"Fran\xe7ais",en:"English",es:"Espa\xf1ol"},x={ar:[{name:"نبذة عني",segment:"about"},{name:"البحث العلمي",segment:"publications"},{name:"التدريس",segment:"teaching"},{name:"المشاريع",segment:"projects"},{name:"المدونة",segment:"posts"}],fr:[{name:"\xc0 propos",segment:"about"},{name:"Recherche",segment:"publications"},{name:"Enseignement",segment:"teaching"},{name:"Projets",segment:"projects"},{name:"Blog",segment:"posts"}],en:[{name:"About",segment:"about"},{name:"Research",segment:"publications"},{name:"Teaching",segment:"teaching"},{name:"Projects",segment:"projects"},{name:"Blog",segment:"posts"}],es:[{name:"Sobre m\xed",segment:"about"},{name:"Investigaci\xf3n",segment:"publications"},{name:"Docencia",segment:"teaching"},{name:"Proyectos",segment:"projects"},{name:"Blog",segment:"posts"}]},g={ar:"تواصل",fr:"Contact",en:"Contact",es:"Contacto"};function y({lang:e}){let[t,a]=(0,r.useState)(!1),[n,o]=(0,r.useState)(!1),[f,v]=(0,r.useState)(!1),w=(0,l.usePathname)(),k=w===`/${e}`||w===`/${e}/`,N=(0,r.useCallback)(()=>{o(window.scrollY>32)},[]);(0,r.useEffect)(()=>(N(),window.addEventListener("scroll",N,{passive:!0}),()=>window.removeEventListener("scroll",N)),[N]),(0,r.useEffect)(()=>(document.body.style.overflow=t?"hidden":"",()=>{document.body.style.overflow=""}),[t]),(0,r.useEffect)(()=>{if(!f)return;let e=()=>v(!1);return document.addEventListener("click",e),()=>document.removeEventListener("click",e)},[f]);let j=!n&&k,_=x[e]??x.en;function $(t){return w.replace(`/${e}`,`/${t}`)||`/${t}`}function z(e){window.localStorage.setItem("preferred-locale",e)}return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("header",{className:`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          flex justify-center
          ${n?"pt-3 pb-0":k?"pt-5 pb-0":"pt-0 pb-0"}
        `,children:(0,s.jsxs)("nav",{className:`
            relative flex items-center justify-between
            transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${n?`w-[92%] max-w-5xl rounded-2xl px-5 py-2.5
                 bg-white/70 backdrop-blur-2xl
                 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]
                 border border-white/40 border-b-white/20`:k?"w-full max-w-[1400px] px-6 lg:px-14 py-5 bg-transparent":`w-full max-w-none px-6 lg:px-14 py-4
                   bg-white/95 backdrop-blur-md
                   border-b border-mckinsey-gray-200/60`}
          `,children:[(0,s.jsxs)(i(),{href:`/${e}`,className:"group relative flex items-center gap-2 transition-all duration-300",children:[(0,s.jsx)("span",{className:`
                inline-block h-2 w-2 rounded-full
                transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                group-hover:scale-125
                ${j?"bg-mckinsey-teal-500 shadow-[0_0_8px_rgba(0,160,176,0.5)]":"bg-gradient-to-br from-mckinsey-teal-500 to-mckinsey-teal-600 shadow-[0_0_6px_rgba(0,160,176,0.35)]"}
              `}),(0,s.jsxs)("span",{className:`
                text-[1.05rem] tracking-tight transition-colors duration-500
                ${j?"text-white":"text-mckinsey-navy-900"}
              `,children:[(0,s.jsx)("span",{className:"font-bold",children:"iAnnaki"}),(0,s.jsx)("span",{className:`
                  ml-1.5 font-light text-sm
                  ${j?"text-white/60":"bg-gradient-to-r from-mckinsey-teal-500 to-mckinsey-teal-600 bg-clip-text text-transparent"}
                `,children:"Edu & Research"})]})]}),(0,s.jsxs)("div",{className:"hidden lg:flex items-center gap-0.5",children:[_.map(t=>{let a=`/${e}/${t.segment}`,r=w===a||w.startsWith(a+"/");return(0,s.jsxs)(i(),{href:a,className:`
                    group relative px-4 py-2 text-[0.825rem] font-medium tracking-wide
                    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${j?r?"text-white":"text-white/70 hover:text-white":r?"text-mckinsey-navy-900":"text-mckinsey-gray-600 hover:text-mckinsey-navy-900"}
                  `,children:[(0,s.jsx)("span",{className:"relative z-10",children:t.name}),(0,s.jsx)("span",{className:`
                      absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full
                      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${r?j?"w-5 bg-white":"w-5 bg-gradient-to-r from-mckinsey-teal-500 to-mckinsey-teal-600":"w-0 group-hover:w-4 bg-mckinsey-teal-500/60"}
                    `})]},t.segment)}),(0,s.jsxs)("div",{className:"relative ml-2",onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)("button",{onClick:()=>v(!f),className:`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.75rem] font-semibold
                  transition-all duration-300 border
                  ${j?"text-white border-white/25 hover:bg-white/15 bg-white/10":"text-mckinsey-navy-700 border-mckinsey-gray-200 hover:bg-mckinsey-gray-50"}
                `,"aria-label":"Switch language",children:[(0,s.jsx)(c,{size:13}),b[e]]}),f&&(0,s.jsx)("div",{className:"absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[130px] z-50",children:u.IB.map(t=>(0,s.jsxs)(i(),{href:$(t),onClick:()=>{z(t),v(!1)},className:`
                        flex items-center justify-between px-4 py-2.5 text-sm transition-colors
                        ${t===e?"bg-mckinsey-teal-50 text-mckinsey-teal-700 font-semibold":"text-mckinsey-gray-700 hover:bg-mckinsey-gray-50"}
                      `,children:[p[t],t===e&&(0,s.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-mckinsey-teal-500"})]},t))})]}),(0,s.jsxs)(i(),{href:`/${e}/contact`,className:`
                group ml-2 relative inline-flex items-center gap-1.5
                px-5 py-2 text-[0.8rem] font-semibold tracking-wide rounded-full
                transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${j?`bg-white/15 text-white border border-white/25
                     hover:bg-white/25 hover:border-white/40
                     hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)]
                     backdrop-blur-md`:`bg-gradient-to-r from-mckinsey-teal-500 to-mckinsey-teal-600
                     text-white border border-mckinsey-teal-500/20
                     hover:shadow-[0_4px_20px_rgba(0,160,176,0.3)]
                     hover:scale-[1.03]
                     active:scale-[0.98]`}
              `,children:[g[e],(0,s.jsx)(m,{size:13,strokeWidth:2.5,className:"transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"})]})]}),(0,s.jsx)("button",{className:`
              lg:hidden relative z-[60] p-2 rounded-xl
              transition-all duration-300
              ${t||j?"text-white hover:bg-white/10":"text-mckinsey-navy-900 hover:bg-mckinsey-gray-100"}
            `,onClick:()=>a(!t),"aria-label":"Toggle menu","aria-expanded":t,children:(0,s.jsxs)("div",{className:"relative w-6 h-6",children:[(0,s.jsx)(d.A,{size:24,className:`
                  absolute inset-0
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${t?"opacity-0 rotate-90 scale-50":"opacity-100 rotate-0 scale-100"}
                `}),(0,s.jsx)(h.A,{size:24,className:`
                  absolute inset-0
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${t?"opacity-100 rotate-0 scale-100":"opacity-0 -rotate-90 scale-50"}
                `})]})})]})}),(0,s.jsxs)("div",{className:`
          fixed inset-0 z-[55] lg:hidden
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${t?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none"}
        `,children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-mckinsey-navy-950/90 backdrop-blur-2xl",onClick:()=>a(!1),"aria-hidden":"true"}),(0,s.jsxs)("div",{className:"relative flex flex-col justify-center items-start h-full px-8 sm:px-12",children:[(0,s.jsx)("nav",{className:"flex flex-col gap-1 w-full max-w-md",children:[..._.map(t=>({name:t.name,href:`/${e}/${t.segment}`})),{name:g[e],href:`/${e}/contact`}].map((e,r)=>{let n=w===e.href||w.startsWith(e.href+"/");return(0,s.jsxs)(i(),{href:e.href,onClick:()=>a(!1),className:`
                      group relative flex items-center justify-between
                      py-4 border-b border-white/[0.06]
                      transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${t?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}
                    `,style:{transitionDelay:t?`${100+60*r}ms`:"0ms"},children:[(0,s.jsxs)("span",{className:"flex items-center gap-4",children:[(0,s.jsx)("span",{className:`
                          h-1.5 w-1.5 rounded-full transition-all duration-300
                          ${n?"bg-mckinsey-teal-500 scale-100":"bg-white/20 scale-75 group-hover:bg-mckinsey-teal-500/60 group-hover:scale-100"}
                        `}),(0,s.jsx)("span",{className:`
                          text-3xl sm:text-4xl font-light tracking-tight
                          transition-all duration-500
                          ${n?"text-white":"text-white/50 group-hover:text-white"}
                        `,children:e.name})]}),(0,s.jsx)(m,{size:20,className:"text-mckinsey-teal-500 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"})]},e.href)})}),(0,s.jsx)("div",{className:`
              mt-10 flex gap-3
              transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${t?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}
            `,style:{transitionDelay:t?"480ms":"0ms"},children:u.IB.map(t=>(0,s.jsx)(i(),{href:$(t),onClick:()=>{z(t),a(!1)},className:`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${t===e?"bg-mckinsey-teal-500 text-white":"text-white/40 border border-white/15 hover:text-white hover:border-white/30"}
                `,children:b[t]},t))}),(0,s.jsx)("p",{className:`
              mt-6 text-xs text-white/20 tracking-widest uppercase font-light
              transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${t?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}
            `,style:{transitionDelay:t?"540ms":"0ms"},children:"Education & Research"})]})]})]})}},7592:(e,t,a)=>{"use strict";a.d(t,{A:()=>s});let s=(0,a(5818).A)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},9063:(e,t,a)=>{"use strict";a.d(t,{A:()=>s});let s=(0,a(5818).A)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]])}},e=>{e.O(0,[113,22,764,86,358],()=>e(e.s=3556)),_N_E=e.O()}]);