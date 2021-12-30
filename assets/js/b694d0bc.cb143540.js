"use strict";(self.webpackChunkfound_docs=self.webpackChunkfound_docs||[]).push([[613],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),d=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=d(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},l=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),l=d(n),f=a,m=l["".concat(c,".").concat(f)]||l[f]||u[f]||o;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=l;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var d=2;d<o;d++)i[d]=n[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}l.displayName="MDXCreateElement"},2466:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return d},toc:function(){return p},default:function(){return l}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],s={sidebar_position:3},c="Redirects",d={unversionedId:"advanced/redirects",id:"advanced/redirects",title:"Redirects",description:"The Redirect route class sets up static redirect routes. You can also use it to create JSX ` elements for use with makeRouteConfig. This class takes from and to properties and an optional status property. from should be a path pattern as for normal routes above. to can be either a path pattern or a function. If it is a path pattern, the router will populate path parameters appropriately. If it is a function, it will receive the same routing state object as getComponent and getData, as described above. status is used to set the HTTP status code when redirecting from the server, and defaults to 302` if it is not specified.",source:"@site/docs/advanced/redirects.md",sourceDirName:"advanced",slug:"/advanced/redirects",permalink:"/advanced/redirects",editUrl:"https://github.com/4Catalyzer/found/edit/master/docs/advanced/redirects.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Error handling",permalink:"/advanced/error-handling"},next:{title:"Named child routes",permalink:"/advanced/names-child-routes"}},p=[],u={toc:p};function l(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"redirects"},"Redirects"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"Redirect")," route class sets up static redirect routes. You can also use it to create JSX ",(0,o.kt)("inlineCode",{parentName:"p"},"<Redirect>")," elements for use with ",(0,o.kt)("inlineCode",{parentName:"p"},"makeRouteConfig"),". This class takes ",(0,o.kt)("inlineCode",{parentName:"p"},"from")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"to")," properties and an optional ",(0,o.kt)("inlineCode",{parentName:"p"},"status")," property. ",(0,o.kt)("inlineCode",{parentName:"p"},"from")," should be a path pattern as for normal routes above. ",(0,o.kt)("inlineCode",{parentName:"p"},"to")," can be either a path pattern or a function. If it is a path pattern, the router will populate path parameters appropriately. If it is a function, it will receive the same routing state object as ",(0,o.kt)("inlineCode",{parentName:"p"},"getComponent")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"getData"),", as described above. ",(0,o.kt)("inlineCode",{parentName:"p"},"status")," is used to set the HTTP status code when redirecting from the server, and defaults to ",(0,o.kt)("inlineCode",{parentName:"p"},"302")," if it is not specified."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const redirect1 = new Redirect({\n  from: 'widget/:widgetId',\n  to: '/widgets/:widgetId',\n});\n\nconst redirect2 = new Redirect({\n  from: 'widget/:widgetId',\n  to: ({ params }) => `/widgets/${params.widgetId}`,\n  status: 301,\n});\n\nconst jsxRedirect1 = (\n  <Redirect from=\"widget/:widgetId\" to=\"/widgets/:widgetId\" />\n);\n\nconst jsxRedirect2 = (\n  <Redirect\n    from=\"widget/:widgetId\"\n    to={({ params }) => `/widgets/${params.widgetId}`}\n    status={301}\n  />\n);\n")),(0,o.kt)("p",null,"If you need more custom control over redirection, throw a ",(0,o.kt)("inlineCode",{parentName:"p"},"RedirectException")," in your route's ",(0,o.kt)("inlineCode",{parentName:"p"},"render")," method with a ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/4Catalyzer/farce#locations-and-location-descriptors"},"location descriptor")," and optional status code as above for the redirect destination."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const customRedirect = {\n  getData: fetchRedirectInfo,\n  render: ({ data }) => {\n    if (data) {\n      throw new RedirectException(data.redirectLocation);\n    }\n  },\n};\n\nconst permanentRedirect = {\n  render: () => {\n    throw new RedirectException('/widgets', 301);\n  },\n};\n")))}l.isMDXComponent=!0}}]);