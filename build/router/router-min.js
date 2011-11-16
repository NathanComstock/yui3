YUI.add("router",function(a){var g=a.HistoryHash,e=a.Lang,c=a.QueryString,h=a.Array,f=a.config.win,j=f.location,i=[],d="ready";function b(){b.superclass.constructor.apply(this,arguments);}a.Router=a.extend(b,a.Base,{_regexPathParam:/([:*])([\w-]+)/g,_regexUrlQuery:/\?([^#]*).*$/,_regexUrlStrip:/^https?:\/\/[^\/]*/i,initializer:function(l){var k=this;k._html5=k.get("html5");k._routes=[];this._setRoutes(l&&l.routes?l.routes:this.get("routes"));if(k._html5){k._history=new a.HistoryHTML5({force:true});a.after("history:change",k._afterHistoryChange,k);}else{a.on("hashchange",k._afterHistoryChange,f,k);}k.publish(d,{defaultFn:k._defReadyFn,fireOnce:true,preventable:false});k.once("initializedChange",function(){a.once("load",function(){setTimeout(function(){k.fire(d,{dispatched:!!k._dispatched});},20);});});},destructor:function(){if(this._html5){a.detach("history:change",this._afterHistoryChange,this);}else{a.detach("hashchange",this._afterHistoryChange,f);}},dispatch:function(){this.once(d,function(){this._ready=true;if(this._html5&&this.upgrade()){return;}else{this._dispatch(this._getPath(),this._getURL());}});return this;},getPath:function(){return this._getPath();},hasRoute:function(k){return !!this.match(this.removeRoot(k)).length;},match:function(k){return h.filter(this._routes,function(l){return k.search(l.regex)>-1;});},removeRoot:function(l){var k=this.get("root");l=l.replace(this._regexUrlStrip,"");if(k&&l.indexOf(k)===0){l=l.substring(k.length);}return l.charAt(0)==="/"?l:"/"+l;},replace:function(k){return this._queue(k,true);},route:function(l,m){var k=[];this._routes.push({callback:m,keys:k,path:l,regex:this._getRegex(l,k)});return this;},save:function(k){return this._queue(k);},upgrade:function(){if(!this._html5){return false;}var k=this._getHashPath();if(k&&k.charAt(0)==="/"){this.once(d,function(){this.replace(k);});return true;}return false;},_decode:function(k){return decodeURIComponent(k.replace(/\+/g," "));},_dequeue:function(){var k=this,l;if(!YUI.Env.windowLoaded){a.once("load",function(){k._dequeue();});return this;}l=i.shift();return l?l():this;},_dispatch:function(p,m,q){var l=this,k=l.match(p),o,n;l._dispatching=l._dispatched=true;if(!k||!k.length){l._dispatching=false;return l;}o=l._getRequest(p,m,q);n=l._getResponse(o);o.next=function(s){var u,t,r;if(s){a.error(s);}else{if((r=k.shift())){t=r.regex.exec(p);u=typeof r.callback==="string"?l[r.callback]:r.callback;if(t.length===r.keys.length+1){o.params=h.hash(r.keys,t.slice(1));}else{o.params=t.concat();}u.call(l,o,n,o.next);}}};o.next();l._dispatching=false;return l._dequeue();},_getHashPath:function(){return g.getHash().replace(this._regexUrlQuery,"");},_getPath:function(){return(!this._html5&&this._getHashPath())||this.removeRoot(j.pathname);},_getQuery:function(){if(this._html5){return j.search.substring(1);}var l=g.getHash(),k=l.match(this._regexUrlQuery);return l&&k?k[1]:j.search.substring(1);},_getRegex:function(l,k){if(l instanceof RegExp){return l;}if(l==="*"){return/.*/;}l=l.replace(this._regexPathParam,function(n,m,o){k.push(o);return m==="*"?"(.*?)":"([^/]*)";});return new RegExp("^"+l+"$");},_getRequest:function(l,k,m){return{path:l,query:this._parseQuery(this._getQuery()),url:k,src:m};},_getResponse:function(l){var k=function(){return l.next.apply(this,arguments);};k.req=l;return k;},_getRoutes:function(){return this._routes.concat();},_getURL:function(){return j.toString();},_joinURL:function(l){var k=this.get("root");l=this.removeRoot(l);if(l.charAt(0)==="/"){l=l.substring(1);}return k&&k.charAt(k.length-1)==="/"?k+l:k+"/"+l;},_parseQuery:c&&c.parse?c.parse:function(n){var o=this._decode,q=n.split("&"),m=0,l=q.length,k={},p;for(;m<l;++m){p=q[m].split("=");if(p[0]){k[o(p[0])]=o(p[1]||"");}}return k;},_queue:function(){var l=arguments,k=this;i.push(function(){if(k._html5){if(a.UA.ios&&a.UA.ios<5){k._save.apply(k,l);}else{setTimeout(function(){k._save.apply(k,l);},1);}}else{k._dispatching=true;k._save.apply(k,l);}return k;});return !this._dispatching?this._dequeue():this;},_save:function(l,m){var k=typeof l==="string";this._ready=true;if(this._html5){this._history[m?"replace":"add"](null,{url:k?this._joinURL(l):l});}else{k&&(l=this.removeRoot(l));g[m?"replaceHash":"setHash"](l);}return this;},_setRoutes:function(k){this._routes=[];h.each(k,function(l){this.route(l.path,l.callback);},this);return this._routes.concat();},_afterHistoryChange:function(l){var k=this,m=l.src;if(k._ready||m!=="popstate"){k._dispatch(k._getPath(),k._getURL(),m);}},_defReadyFn:function(k){this._ready=true;}},{NAME:"router",ATTRS:{html5:{valueFn:function(){return a.Router.html5;},writeOnce:"initOnly"},root:{value:""},routes:{value:[],getter:"_getRoutes",setter:"_setRoutes"}},html5:a.HistoryBase.html5&&(!a.UA.android||a.UA.android>=3)});a.Controller=a.Router;},"@VERSION@",{optional:["querystring-parse"],requires:["array-extras","base-build","history"]});