var LiveSearch={searchBoxes:"",activeRequests:[],callbacks:[],addCallback:function(a,b){if(this.callbacks[a]===undefined){this.callbacks[a]=[]}return this.callbacks[a].push(b)},invokeCallbacks:function(a,c){var b;if(this.callbacks[a]!==undefined){for(b in this.callbacks[a]){c=this.callbacks[a][b](c)}}}};LiveSearch.init=function(){LiveSearch.searchBoxes=jQuery("input").filter("[name='s']").not(".no-livesearch");LiveSearch.searchBoxes.keyup(LiveSearch.handleKeypress);LiveSearch.searchBoxes.focus(LiveSearch.hideResults);if(!LiveSearch.searchBoxes.outerHeight){alert(DavesWordPressLiveSearchConfig.outdatedJQuery)}LiveSearch.searchBoxes.parents("form").attr("autocomplete","off");LiveSearch.searchBoxes.each(function(){this.autocomplete="off"});jQuery("html").click(LiveSearch.hideResults);LiveSearch.searchBoxes.click(function(a){a.stopPropagation()});LiveSearch.compiledResultTemplate=_.template(DavesWordPressLiveSearchConfig.resultTemplate);jQuery(window).resize(function(){LiveSearch.positionResults(this)})};LiveSearch.positionResults=function(){var c;var d=jQuery("input:focus").first();var b=jQuery("#dwls_search_results");if(b&&d.size()>0){var a=d.offset();a.left+=parseInt(DavesWordPressLiveSearchConfig.xOffset,10);a.top+=parseInt(DavesWordPressLiveSearchConfig.yOffset,10);b.css("left",a.left);b.css("top",a.top);b.css("display","block");switch(DavesWordPressLiveSearchConfig.resultsDirection){case"up":c=a.top-b.height();break;case"down":c=a.top+LiveSearch.searchBoxes.outerHeight();break;default:c=a.top+LiveSearch.searchBoxes.outerHeight()}b.css("top",c+"px")}};LiveSearch.handleAJAXResults=function(b){var d="";LiveSearch.activeRequests.pop();if(b){resultsSearchTerm=b.searchTerms;if(resultsSearchTerm!=jQuery("input:focus").first().val()){if(LiveSearch.activeRequests.length===0){LiveSearch.removeIndicator()}return}var c=jQuery("#dwls_search_results").children("input[name=query]").val();if(c!==""&&resultsSearchTerm==c){if(LiveSearch.activeRequests.length===0){LiveSearch.removeIndicator()}return}if(b.results.length===0){LiveSearch.hideResults()}else{d=LiveSearch.compiledResultTemplate({searchResults:b.results,e:b,resultsSearchTerm:resultsSearchTerm});var a=jQuery("#dwls_search_results");if(a.size()>0){jQuery("#dwls_search_results").replaceWith(d)}else{jQuery("body").append(d)}LiveSearch.positionResults();jQuery("#dwls_search_results").bind("click.dwls",function(){window.location.href=jQuery(this).find("a.daves-wordpress-live-search_title").attr("href")})}if(LiveSearch.activeRequests.length===0){LiveSearch.removeIndicator()}}};LiveSearch.handleKeypress=function(b){var c=0;var a=LiveSearch.searchBoxes.val();setTimeout(function(){LiveSearch.runQuery(a)},c)};LiveSearch.runQuery=function(e){var h=jQuery("input:focus");var f=h.val();var b;var d;if(f===""||f.length<DavesWordPressLiveSearchConfig.minCharsToSearch){LiveSearch.hideResults();LiveSearch.removeIndicator()}else{LiveSearch.displayIndicator();while(LiveSearch.activeRequests.length>0){d=LiveSearch.activeRequests.pop();d.abort()}var c={};var a=h.parents("form").find("input:not(:submit),select,textarea");for(b in a){if(a.hasOwnProperty(b)&&b%1===0){var g=jQuery(a[b]);c[g.attr("name")]=g.val()}}c.action="dwls_search";d=jQuery.get(DavesWordPressLiveSearchConfig.ajaxURL,c,LiveSearch.handleAJAXResults,"json");d.fail=LiveSearch.ajaxFailHandler;LiveSearch.activeRequests.push(d)}};LiveSearch.ajaxFailHandler=function(a){console.log("Dave's WordPress Live Search: There was an error retrieving or parsing search results");console.log("The data returned was:");console.log(a)};LiveSearch.hideResults=function(){var a=jQuery("#dwls_search_results");if(a.size()>0){LiveSearch.invokeCallbacks("BeforeHideResults");switch(DavesWordPressLiveSearchConfig.resultsDirection){case"up":a.fadeOut("normal",function(){a.remove();LiveSearch.invokeCallbacks("AfterHideResults")});break;case"down":a.slideUp("normal",function(){a.remove();LiveSearch.invokeCallbacks("AfterHideResults")});break;default:a.slideUp("normal",function(){a.remove();LiveSearch.invokeCallbacks("AfterHideResults")})}}};LiveSearch.displayIndicator=function(){if(jQuery(".search_results_activity_indicator").size()===0){var e=jQuery("input:focus").first();var b=e.offset();jQuery("body").append('<span id="search_results_activity_indicator" class="search_results_activity_indicator" />');var a={outer:Math.ceil((e.height()*0.9)/2)};a.inner=Math.floor(a.outer*0.29);jQuery(".search_results_activity_indicator").css("position","absolute").css("z-index",9999);var c=(b.top+((e.outerHeight()-e.innerHeight())/2)+"px");jQuery(".search_results_activity_indicator").css("top",c);var d=(b.left+e.outerWidth()-((a.outer+a.inner)*2)-2)+"px";jQuery(".search_results_activity_indicator").css("left",d);Spinners.create(".search_results_activity_indicator",{radii:[a.inner,a.outer],color:"#888888",dashWidth:4,dashes:8,opacity:0.8,speed:0.7}).play()}};LiveSearch.removeIndicator=function(){jQuery(".search_results_activity_indicator").remove()};jQuery(function(){LiveSearch.init()});;document.createElement("canvas").getContext||(function(){var s=Math,j=s.round,F=s.sin,G=s.cos,V=s.abs,W=s.sqrt,k=10,v=k/2;function X(){return this.context_||(this.context_=new H(this))}var L=Array.prototype.slice;function Y(b,a){var c=L.call(arguments,2);return function(){return b.apply(a,c.concat(L.call(arguments)))}}var M={init:function(b){if(/MSIE/.test(navigator.userAgent)&&!window.opera){var a=b||document;a.createElement("canvas");a.attachEvent("onreadystatechange",Y(this.init_,this,a))}},init_:function(b){b.namespaces.g_vml_||b.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML");b.namespaces.g_o_||b.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");if(!b.styleSheets.ex_canvas_){var a=b.createStyleSheet();a.owningElement.id="ex_canvas_";a.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}var c=b.getElementsByTagName("canvas"),d=0;for(;d<c.length;d++)this.initElement(c[d])},initElement:function(b){if(!b.getContext){b.getContext=X;b.innerHTML="";b.attachEvent("onpropertychange",Z);b.attachEvent("onresize",$);var a=b.attributes;if(a.width&&a.width.specified)b.style.width=a.width.nodeValue+"px";else b.width=b.clientWidth;if(a.height&&a.height.specified)b.style.height=a.height.nodeValue+"px";else b.height=b.clientHeight}return b}};function Z(b){var a=b.srcElement;switch(b.propertyName){case"width":a.style.width=a.attributes.width.nodeValue+"px";a.getContext().clearRect();break;case"height":a.style.height=a.attributes.height.nodeValue+"px";a.getContext().clearRect();break}}function $(b){var a=b.srcElement;if(a.firstChild){a.firstChild.style.width=a.clientWidth+"px";a.firstChild.style.height=a.clientHeight+"px"}}M.init();var N=[],B=0;for(;B<16;B++){var C=0;for(;C<16;C++)N[B*16+C]=B.toString(16)+C.toString(16)}function I(){return[[1,0,0],[0,1,0],[0,0,1]]}function y(b,a){var c=I(),d=0;for(;d<3;d++){var f=0;for(;f<3;f++){var h=0,g=0;for(;g<3;g++)h+=b[d][g]*a[g][f];c[d][f]=h}}return c}function O(b,a){a.fillStyle=b.fillStyle;a.lineCap=b.lineCap;a.lineJoin=b.lineJoin;a.lineWidth=b.lineWidth;a.miterLimit=b.miterLimit;a.shadowBlur=b.shadowBlur;a.shadowColor=b.shadowColor;a.shadowOffsetX=b.shadowOffsetX;a.shadowOffsetY=b.shadowOffsetY;a.strokeStyle=b.strokeStyle;a.globalAlpha=b.globalAlpha;a.arcScaleX_=b.arcScaleX_;a.arcScaleY_=b.arcScaleY_;a.lineScale_=b.lineScale_}function P(b){var a,c=1;b=String(b);if(b.substring(0,3)=="rgb"){var d=b.indexOf("(",3),f=b.indexOf(")",d+
1),h=b.substring(d+1,f).split(",");a="#";var g=0;for(;g<3;g++)a+=N[Number(h[g])];if(h.length==4&&b.substr(3,1)=="a")c=h[3]}else a=b;return{color:a,alpha:c}}function aa(b){switch(b){case"butt":return"flat";case"round":return"round";case"square":default:return"square"}}function H(b){this.m_=I();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=k*1;this.globalAlpha=1;this.canvas=b;var a=b.ownerDocument.createElement("div");a.style.width=b.clientWidth+"px";a.style.height=b.clientHeight+"px";a.style.overflow="hidden";a.style.position="absolute";b.appendChild(a);this.element_=a;this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}var i=H.prototype;i.clearRect=function(){this.element_.innerHTML=""};i.beginPath=function(){this.currentPath_=[]};i.moveTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:"moveTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};i.lineTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:"lineTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};i.bezierCurveTo=function(b,a,c,d,f,h){var g=this.getCoords_(f,h),l=this.getCoords_(b,a),e=this.getCoords_(c,d);Q(this,l,e,g)};function Q(b,a,c,d){b.currentPath_.push({type:"bezierCurveTo",cp1x:a.x,cp1y:a.y,cp2x:c.x,cp2y:c.y,x:d.x,y:d.y});b.currentX_=d.x;b.currentY_=d.y}i.quadraticCurveTo=function(b,a,c,d){var f=this.getCoords_(b,a),h=this.getCoords_(c,d),g={x:this.currentX_+
0.6666666666666666*(f.x-this.currentX_),y:this.currentY_+0.6666666666666666*(f.y-this.currentY_)};Q(this,g,{x:g.x+(h.x-this.currentX_)/3,y:g.y+(h.y-this.currentY_)/3},h)};i.arc=function(b,a,c,d,f,h){c*=k;var g=h?"at":"wa",l=b+G(d)*c-v,e=a+F(d)*c-v,m=b+G(f)*c-v,r=a+F(f)*c-v;if(l==m&&!h)l+=0.125;var n=this.getCoords_(b,a),o=this.getCoords_(l,e),q=this.getCoords_(m,r);this.currentPath_.push({type:g,x:n.x,y:n.y,radius:c,xStart:o.x,yStart:o.y,xEnd:q.x,yEnd:q.y})};i.rect=function(b,a,c,d){this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath()};i.strokeRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.stroke();this.currentPath_=f};i.fillRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.fill();this.currentPath_=f};i.createLinearGradient=function(b,a,c,d){var f=new D("gradient");f.x0_=b;f.y0_=a;f.x1_=c;f.y1_=d;return f};i.createRadialGradient=function(b,a,c,d,f,h){var g=new D("gradientradial");g.x0_=b;g.y0_=a;g.r0_=c;g.x1_=d;g.y1_=f;g.r1_=h;return g};i.drawImage=function(b){var a,c,d,f,h,g,l,e,m=b.runtimeStyle.width,r=b.runtimeStyle.height;b.runtimeStyle.width="auto";b.runtimeStyle.height="auto";var n=b.width,o=b.height;b.runtimeStyle.width=m;b.runtimeStyle.height=r;if(arguments.length==3){a=arguments[1];c=arguments[2];h=g=0;l=d=n;e=f=o}else if(arguments.length==5){a=arguments[1];c=arguments[2];d=arguments[3];f=arguments[4];h=g=0;l=n;e=o}else if(arguments.length==9){h=arguments[1];g=arguments[2];l=arguments[3];e=arguments[4];a=arguments[5];c=arguments[6];d=arguments[7];f=arguments[8]}else throw Error("Invalid number of arguments");var q=this.getCoords_(a,c),t=[];t.push(" <g_vml_:group",' coordsize="',k*10,",",k*10,'"',' coordorigin="0,0"',' style="width:',10,"px;height:",10,"px;position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]){var E=[];E.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",j(q.x/k),",","Dy=",j(q.y/k),"");var p=q,z=this.getCoords_(a+d,c),w=this.getCoords_(a,c+f),x=this.getCoords_(a+d,c+f);p.x=s.max(p.x,z.x,w.x,x.x);p.y=s.max(p.y,z.y,w.y,x.y);t.push("padding:0 ",j(p.x/k),"px ",j(p.y/k),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",E.join(""),", sizingmethod='clip');")}else t.push("top:",j(q.y/k),"px;left:",j(q.x/k),"px;");t.push(' ">','<g_vml_:image src="',b.src,'"',' style="width:',k*d,"px;"," height:",k*f,'px;"',' cropleft="',h/n,'"',' croptop="',g/o,'"',' cropright="',(n-h-l)/n,'"',' cropbottom="',(o-g-e)/o,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",t.join(""))};i.stroke=function(b){var a=[],c=P(b?this.fillStyle:this.strokeStyle),d=c.color,f=c.alpha*this.globalAlpha;a.push("<g_vml_:shape",' filled="',!!b,'"',' style="position:absolute;width:',10,"px;height:",10,'px;"',' coordorigin="0 0" coordsize="',k*10," ",k*10,'"',' stroked="',!b,'"',' path="');var h={x:null,y:null},g={x:null,y:null},l=0;for(;l<this.currentPath_.length;l++){var e=this.currentPath_[l];switch(e.type){case"moveTo":a.push(" m ",j(e.x),",",j(e.y));break;case"lineTo":a.push(" l ",j(e.x),",",j(e.y));break;case"close":a.push(" x ");e=null;break;case"bezierCurveTo":a.push(" c ",j(e.cp1x),",",j(e.cp1y),",",j(e.cp2x),",",j(e.cp2y),",",j(e.x),",",j(e.y));break;case"at":case"wa":a.push(" ",e.type," ",j(e.x-this.arcScaleX_*e.radius),",",j(e.y-this.arcScaleY_*e.radius)," ",j(e.x+this.arcScaleX_*e.radius),",",j(e.y+this.arcScaleY_*e.radius)," ",j(e.xStart),",",j(e.yStart)," ",j(e.xEnd),",",j(e.yEnd));break}if(e){if(h.x==null||e.x<h.x)h.x=e.x;if(g.x==null||e.x>g.x)g.x=e.x;if(h.y==null||e.y<h.y)h.y=e.y;if(g.y==null||e.y>g.y)g.y=e.y}}a.push(' ">');if(b)if(typeof this.fillStyle=="object"){var m=this.fillStyle,r=0,n={x:0,y:0},o=0,q=1;if(m.type_=="gradient"){var t=m.x1_/this.arcScaleX_,E=m.y1_/this.arcScaleY_,p=this.getCoords_(m.x0_/this.arcScaleX_,m.y0_/this.arcScaleY_),z=this.getCoords_(t,E);r=Math.atan2(z.x-p.x,z.y-p.y)*180/Math.PI;if(r<0)r+=360;if(r<1.0E-6)r=0}else{var p=this.getCoords_(m.x0_,m.y0_),w=g.x-h.x,x=g.y-h.y;n={x:(p.x-h.x)/w,y:(p.y-h.y)/x};w/=this.arcScaleX_*k;x/=this.arcScaleY_*k;var R=s.max(w,x);o=2*m.r0_/R;q=2*m.r1_/R-o}var u=m.colors_;u.sort(function(ba,ca){return ba.offset-ca.offset});var J=u.length,da=u[0].color,ea=u[J-1].color,fa=u[0].alpha*this.globalAlpha,ga=u[J-1].alpha*this.globalAlpha,S=[],l=0;for(;l<J;l++){var T=u[l];S.push(T.offset*q+
o+" "+T.color)}a.push('<g_vml_:fill type="',m.type_,'"',' method="none" focus="100%"',' color="',da,'"',' color2="',ea,'"',' colors="',S.join(","),'"',' opacity="',ga,'"',' g_o_:opacity2="',fa,'"',' angle="',r,'"',' focusposition="',n.x,",",n.y,'" />')}else a.push('<g_vml_:fill color="',d,'" opacity="',f,'" />');else{var K=this.lineScale_*this.lineWidth;if(K<1)f*=K;a.push("<g_vml_:stroke",' opacity="',f,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',aa(this.lineCap),'"',' weight="',K,'px"',' color="',d,'" />')}a.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",a.join(""))};i.fill=function(){this.stroke(true)};i.closePath=function(){this.currentPath_.push({type:"close"})};i.getCoords_=function(b,a){var c=this.m_;return{x:k*(b*c[0][0]+a*c[1][0]+c[2][0])-v,y:k*(b*c[0][1]+a*c[1][1]+c[2][1])-v}};i.save=function(){var b={};O(this,b);this.aStack_.push(b);this.mStack_.push(this.m_);this.m_=y(I(),this.m_)};i.restore=function(){O(this.aStack_.pop(),this);this.m_=this.mStack_.pop()};function ha(b){var a=0;for(;a<3;a++){var c=0;for(;c<2;c++)if(!isFinite(b[a][c])||isNaN(b[a][c]))return false}return true}function A(b,a,c){if(!!ha(a)){b.m_=a;if(c)b.lineScale_=W(V(a[0][0]*a[1][1]-a[0][1]*a[1][0]))}}i.translate=function(b,a){A(this,y([[1,0,0],[0,1,0],[b,a,1]],this.m_),false)};i.rotate=function(b){var a=G(b),c=F(b);A(this,y([[a,c,0],[-c,a,0],[0,0,1]],this.m_),false)};i.scale=function(b,a){this.arcScaleX_*=b;this.arcScaleY_*=a;A(this,y([[b,0,0],[0,a,0],[0,0,1]],this.m_),true)};i.transform=function(b,a,c,d,f,h){A(this,y([[b,a,0],[c,d,0],[f,h,1]],this.m_),true)};i.setTransform=function(b,a,c,d,f,h){A(this,[[b,a,0],[c,d,0],[f,h,1]],true)};i.clip=function(){};i.arcTo=function(){};i.createPattern=function(){return new U};function D(b){this.type_=b;this.r1_=this.y1_=this.x1_=this.r0_=this.y0_=this.x0_=0;this.colors_=[]}D.prototype.addColorStop=function(b,a){a=P(a);this.colors_.push({offset:b,color:a.color,alpha:a.alpha})};function U(){}G_vmlCanvasManager=M;CanvasRenderingContext2D=H;CanvasGradient=D;CanvasPattern=U})();;(function(){function c(a,b){a&&(this.element=a,i.remove(a),i.removeDetached(),this.options=f.extend({radii:[5,10],color:"#000",dashWidth:1.8,dashes:12,opacity:1,padding:3,speed:.7,build:!0},b||{}),this._position=0,this._state="stopped",this.build(),i.add(this))}function b(a){this.element=a}function a(a){return a*Math.PI/180}var d={Version:"2.0_b1"},e=Array.prototype.slice,f={extend:function(a,b){for(var c in b)a[c]=b[c];return a},"break":{},_each:function(a,b){for(var c=0,d=a.length;c<d;c++)b(a[c])},each:function(a,b,c){var d=0;try{this._each(a,function(a){b.call(c,a,d++)})}catch(e){if(e!=f["break"])throw e}},bind:function(a,b){var c=e.call(arguments,2);return function(){return a.apply(b,c.concat(e.call(arguments)))}},scroll:function(a,b){if(!b)return a;var c=a.slice(0,b);return a.slice(b,a.length).concat(c)},any:function(a,b,c){var d=!1;f.each(a||[],function(a,e){if(d|=b.call(c,a,e))return f["break"]});return!!d},member:function(a,b){var c=!1;f.any(a||[],function(a){if(c=a===b)return!0});return c},select:function(a,b,c){var d=[];f.each(a||[],function(a,e){b.call(c,a,e)&&(d[d.length]=a)});return d},without:function(a){var b=e.call(arguments,1);return f.select(a,function(a){return!f.member(b,a)})}},g={drawRoundedRectangle:function(b,c){var d=f.extend({top:0,left:0,width:0,height:0,radius:0},c||{}),e=d.left,g=d.top,h=d.width,i=d.height,d=d.radius;b.beginPath(),b.moveTo(e+d,g),b.arc(e+h-d,g+d,d,a(-90),a(0),!1),b.arc(e+h-d,g+i-d,d,a(0),a(90),!1),b.arc(e+d,g+i-d,d,a(90),a(180),!1),b.arc(e+d,g+d,d,a(-180),a(-90),!1),b.closePath(),b.fill()}},h=function(){function a(a){var c=[];a.indexOf("#")==0&&(a=a.substring(1)),a=a.toLowerCase();if(a.replace(b,"")!="")return null;a.length==3?(c[0]=a.charAt(0)+a.charAt(0),c[1]=a.charAt(1)+a.charAt(1),c[2]=a.charAt(2)+a.charAt(2)):(c[0]=a.substring(0,2),c[1]=a.substring(2,4),c[2]=a.substring(4));for(a=0;a<c.length;a++)c[a]=parseInt(c[a],16);c.red=c[0],c.green=c[1],c.blue=c[2];return c}var b=RegExp("[0123456789abcdef]","g"),c=function(){function a(a,b,c){a=a.toString(c||10);return Array(b-a.length).join("0")+a}return function(b,c,d){return"#"+a(b,2,16)+a(c,2,16)+a(d,2,16)}}();return{hex2rgb:a,hex2fill:function(b,c){typeof c=="undefined"&&(c=1);var d=c,e=a(b);e[3]=d,e.opacity=d;return"rgba("+e.join()+")"},rgb2hex:c}}();f.extend(d,{enabled:!1,support:{canvas:function(){var a=document.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")}()},dom:function(){var a,b;a=b=function(){throw"Using Spinners with a CSS Selector requires a selector engine, include one of: Sizzle (jQuery 1.4+/Prototype 1.7+), NWMatcher or Slick (MooTools 1.3+)."},window.Sizzle?(a=Sizzle,b=Sizzle.matches):window.jQuery?(a=jQuery.find,b=function(a,b){return jQuery(a).is(b)}):window.NWMatcher&&NW.Dom?(a=NW.Dom.select,b=NW.Dom.match):window.Prototype&&Prototype.Selector?(a=Prototype.Selector.select,b=Prototype.Selector.match):window.Slick&&(a=function(a,b){return Slick.search(b||document,a)},b=Slick.match);return{select:a,match:b}}(),init:function(){if(!this.support.canvas&&!window.G_vmlCanvasManager)if(window.attachEvent&&navigator.userAgent.indexOf("Opera")===-1)alert("Spinners requires ExplorerCanvas (excanvas.js)");else return;window.G_vmlCanvasManager&&window.G_vmlCanvasManager.init_(document),this.enabled=!0},create:function(a,c){b.create(a,c);return this.get(a)},get:function(a){return new b(a)},play:function(a){this.get(a).play();return this},pause:function(a){this.get(a).pause();return this},toggle:function(a){this.get(a).toggle();return this},stop:function(a){this.get(a).stop();return this},remove:function(a){this.get(a).remove();return this},removeDetached:function(){i.removeDetached();return this},getDimensions:function(a){a=i.get(a)[0].getLayout().workspace.radius*2;return{width:a,height:a}}});var i={spinners:[],get:function(a){if(a){var b=[];f.each(this.spinners,function(c){c&&(a.nodeType==1?c.element==a:d.dom.match(c.element,a))&&b.push(c)});return b}},add:function(a){this.spinners.push(a)},remove:function(a){var b=[];f.each(this.spinners,function(c){(a.nodeType==1?c.element==a:d.dom.match(c.element,a))&&b.push(c.element)}),f.each(b,f.bind(function(a){this.removeByElement(a)},this))},removeByElement:function(a){if(a=this.get(a)[0])a.remove(),this.spinners=f.without(this.spinners,a)},removeDetached:function(){return function(){f.each(this.spinners,function(a){a&&!a.isAttached()&&this.remove(a.element)},this)}}()};f.extend(b,{create:function(a,b){if(a){var e=b||{},g=[];a.nodeType==1?g.push(new c(a,e)):f.each(d.dom.select(a)||[],function(a){g.push(new c(a,e))});return g}}}),f.extend(b.prototype,{items:function(){return i.get(this.element)},play:function(){f.each(this.items(),function(a){a.play()});return this},stop:function(){f.each(this.items(),function(a){a.stop()});return this},pause:function(){f.each(this.items(),function(a){a.pause()});return this},toggle:function(){f.each(this.items(),function(a){a.toggle()});return this},remove:function(){i.remove(this.element);return this}}),f.extend(c.prototype,function(){function b(){var a=this.options.speed*1e3/this.options.dashes;this.nextPosition(),this._playTimer=window.setTimeout(f.bind(b,this),a)}return{remove:function(){this.canvas&&(this.stop(),this.canvas.parentNode.removeChild(this.canvas),this.ctx=this.canvas=null)},build:function(){this.remove();var a=this.getLayout().workspace.radius,b=a*2;this.canvas=document.createElement("canvas"),this.canvas.style.zoom=1,this.canvas.height=b,this.canvas.width=b,document.body.appendChild(this.canvas),window.G_vmlCanvasManager&&G_vmlCanvasManager.initElement(this.canvas),this.ctx=this.canvas.getContext("2d"),this.ctx.globalAlpha=this.options.opacity,this.element.appendChild(this.canvas),this.ctx.translate(a,a),this.drawPosition(0);return this},getLayout:function(){if(this._layout)return this._layout;var a=this.options,b=a.dashes,c=a.radii,d=a.dashWidth,e=Math.min(c[0],c[1]),c=Math.max(c[0],c[1]),f=Math.ceil(Math.max(Math.max(d,c),Math.sqrt(c*c+d/2*(d/2))));f+=a.padding;for(var a=f,g=1/b,h=[],i=0;i<b;i++)h.push((i+1)*g);return this._layout=b={workspace:{radius:a,opacities:h},dash:{position:{top:f-c,left:f-d/2},dimensions:{width:d,height:c-e}}}},isAttached:function(){if(!this.element)return!1;var a;for(a=this.element;a&&a.parentNode;)a=a.parentNode;return!!a&&!!a.body},_nextPosition:b,nextPosition:function(){this._position==this.options.dashes-1&&(this._position=-1),this._position++,this.drawPosition(this._position)},drawPosition:function(b){var c=this.getLayout().workspace,d=c.radius*2,e=-1*c.radius,g=this.options.dashes;this.ctx.clearRect(e,e,d,d),d=a(360/g),b=f.scroll(c.opacities,b*-1);for(c=0;c<g;c++)this.drawDash(b[c],this.options.color),this.ctx.rotate(d)},drawDash:function(a,b){this.ctx.fillStyle=h.hex2fill(b,a);var c=this.getLayout(),d=c.workspace.radius,e=c.dash.position,c=c.dash.dimensions;g.drawRoundedRectangle(this.ctx,{top:e.top-d,left:e.left-d,width:c.width,height:c.height,radius:Math.min(c.height,c.width)/2})},play:function(){if(this._state!="playing"){this._state="playing";var a=this.options.speed*1e3/this.options.dashes;this._playTimer=window.setTimeout(f.bind(b,this),a);return this}},pause:function(){if(this._state!="paused")return this._pause(),this._state="paused",this},_pause:function(){this._playTimer&&(window.clearTimeout(this._playTimer),this._playTimer=null)},stop:function(){if(this._state!="stopped")return this._pause(),this._position=0,this.drawPosition(0),this._state="stopped",this},toggle:function(){this[this._state=="playing"?"pause":"play"]();return this}}}()),window.Spinners=d,d.init(),d.enabled||f.each("create get remove play stop pause toggle".split(" "),function(a){d[a]=function(){return this}})})();