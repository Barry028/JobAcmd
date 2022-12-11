if("undefined"==typeof jQuery)throw new Error("jquery-confirm requires jQuery");var jconfirm,Jconfirm;!function(t){t.confirm=function(t){return jconfirm(t)},t.alert=function(t){return t.cancelButton=!1,jconfirm(t)},t.dialog=function(t){return t.cancelButton=!1,t.confirmButton=!1,t.confirmKeys=[13],jconfirm(t)},jconfirm=function(n){jconfirm.defaults&&t.extend(jconfirm.pluginDefaults,jconfirm.defaults);var n=t.extend({},jconfirm.pluginDefaults,n);return new Jconfirm(n)},Jconfirm=function(n){t.extend(this,n),this._init()},Jconfirm.prototype={_init:function(){var t=this;this._rand=Math.round(99999*Math.random()),this._buildHTML(),this._bindEvents(),setTimeout(function(){t.open()},0)},animations:["anim-scale","anim-top","anim-bottom","anim-left","anim-right","anim-zoom","anim-opacity","anim-none","anim-rotate","anim-rotatex","anim-rotatey","anim-scalex","anim-scaley"],_buildHTML:function(){this.animation="anim-"+this.animation.toLowerCase(),"none"===this.animation&&(this.animationSpeed=0),this.$el=t(this.template).appendTo(this.container).addClass(this.theme),this.$el.find(".jconfirm-box-container").addClass(this.columnClass),this.CSS={"-webkit-transition-duration":this.animationSpeed/1e3+"s","transition-duration":this.animationSpeed/1e3+"s","-webkjit-transition-timing-function":"cubic-bezier(0.27, 1.12, 0.32, "+this.animationBounce+")","transition-timing-function":"cubic-bezier(0.27, 1.12, 0.32, "+this.animationBounce+")"},this.$el.find(".jconfirm-bg").css(this.CSS),this.$b=this.$el.find(".jconfirm-box").css(this.CSS).addClass(this.animation),this.rtl&&this.$el.addClass("rtl"),this.setTitle(),this.contentDiv=this.$el.find("div.content"),this.$btnc=this.$el.find(".buttons"),this.confirmButton&&""!==this.confirmButton.trim()&&(this.$confirmButton=t('<button class="btn">'+this.confirmButton+"</button>").appendTo(this.$btnc).addClass(this.confirmButtonClass)),this.cancelButton&&""!==this.cancelButton.trim()&&(this.$cancelButton=t('<button class="btn">'+this.cancelButton+"</button>").appendTo(this.$btnc).addClass(this.cancelButtonClass)),this.confirmButton||this.cancelButton||this.$btnc.remove(),this.confirmButton||this.cancelButton||null!=this.closeIcon||(this.$closeButton=this.$b.find(".closeIcon").show()),!0===this.closeIcon&&(this.$closeButton=this.$b.find(".closeIcon").show()),this.setContent(),this.autoClose&&this._startCountDown()},setTitle:function(t){this.title=void 0!==t?t:this.title,this.title?this.$el.find("div.title").html('<i class="'+this.icon+'"></i> '+this.title):this.$el.find("div.title").remove()},setContent:function(n){var i=this;this.content=n||this.content;var o=!!n;if("boolean"==typeof this.content)this.content?console.error("Invalid option for property content: passed TRUE"):this.contentDiv.remove();else if("string"==typeof this.content)if("url:"===this.content.substr(0,4).toLowerCase()){this.contentDiv.html(""),this.$btnc.find("button").prop("disabled",!0);var e=this.content.substring(4,this.content.length);t.get(e).done(function(t){i.contentDiv.html(t)}).always(function(t,n,o){"function"==typeof i.contentLoaded&&i.contentLoaded(t,n,o),i.$btnc.find("button").prop("disabled",!1),i.setDialogCenter()})}else this.contentDiv.html(this.content);else if("function"==typeof this.content){this.contentDiv.html(""),this.$btnc.find("button").attr("disabled","disabled");var s=this.content(this);"object"!=typeof s?console.error("The content function must return jquery promise."):"function"!=typeof s.always?console.error("The object returned is not a jquery promise."):s.always(function(t,n){i.$btnc.find("button").removeAttr("disabled"),i.setDialogCenter()})}else console.error("Invalid option for property content, passed: "+typeof this.content);this.setDialogCenter(o)},_startCountDown:function(){var n=this.autoClose.split("|");if(/cancel/.test(n[0])&&"alert"===this.type)return!1;if(/confirm|cancel/.test(n[0])){this.$cd=t('<span class="countdown">').appendTo(this["$"+n[0]+"Button"]);var i=this;i.$cd.parent().click();var o=n[1]/1e3;this.interval=setInterval(function(){i.$cd.html(" ["+(o-=1)+"]"),0===o&&(i.$cd.parent().trigger("click"),clearInterval(i.interval))},1e3)}else console.error("Invalid option "+n[0]+", must be confirm/cancel")},_bindEvents:function(){var n=this,i=!1;this.$el.find(".jconfirm-scrollpane").click(function(t){i||(n.backgroundDismiss?(n.cancel(),n.close()):(n.$b.addClass("hilight"),setTimeout(function(){n.$b.removeClass("hilight")},400))),i=!1}),this.$el.find(".jconfirm-box").click(function(t){i=!0}),this.$confirmButton&&this.$confirmButton.click(function(t){t.preventDefault();var i=n.confirm(n.$b);n.onAction(),(void 0===i||i)&&n.close()}),this.$cancelButton&&this.$cancelButton.click(function(t){t.preventDefault();var i=n.cancel(n.$b);n.onAction(),(void 0===i||i)&&n.close()}),this.$closeButton&&this.$closeButton.click(function(t){t.preventDefault(),n.cancel(),n.onAction(),n.close()}),this.keyboardEnabled&&setTimeout(function(){t(window).on("keyup."+this._rand,function(t){n.reactOnKey(t)})},500),t(window).on("resize."+this._rand,function(){n.setDialogCenter(!0)})},reactOnKey:function(n){var i=t(".jconfirm");if(i.eq(i.length-1)[0]!==this.$el[0])return!1;var o=n.which;if(-1!==t.inArray(o,this.cancelKeys)){if(!this.backgroundDismiss)return this.$el.find(".jconfirm-bg").click(),!1;this.$cancelButton?this.$cancelButton.click():this.close()}-1!==t.inArray(o,this.confirmKeys)&&this.$confirmButton&&this.$confirmButton.click()},setDialogCenter:function(n){var i=t(window).height(),o=this.$b.outerHeight(),e=(i-o)/2;if(o>i-100)var s={"margin-top":50,"margin-bottom":50};else var s={"margin-top":e};n?this.$b.animate(s,{duration:this.animationSpeed,queue:!1}):this.$b.css(s)},close:function(){var n=this;if(this.isClosed())return!1;"function"==typeof this.onClose&&this.onClose(),t(window).unbind("resize."+this._rand),this.keyboardEnabled&&t(window).unbind("keyup."+this._rand),n.$el.find(".jconfirm-bg").removeClass("seen"),this.$b.addClass(this.animation),setTimeout(function(){n.$el.remove()},this.animationSpeed+10);try{jconfirm.record.closed+=1}catch(t){}try{jconfirm.record.currentlyOpen-=1}catch(t){}try{jconfirm.record.currentlyOpen<1&&t("body").removeClass("jconfirm-noscroll")}catch(t){}return!0},open:function(){var n=this;if(this.isClosed())return!1;n.$el.find(".jconfirm-bg").addClass("seen"),t("body").addClass("jconfirm-noscroll"),this.$b.removeClass(this.animations.join(" ")),t("body :focus").trigger("blur"),this.$b.find("input[autofocus]:visible:first").focus();try{jconfirm.record.opened+=1}catch(t){}try{jconfirm.record.currentlyOpen+=1}catch(t){}return"function"==typeof this.onOpen&&this.onOpen(),!0},isClosed:function(){return""===this.$el.css("display")}},jconfirm.pluginDefaults={template:'<div class="jconfirm"><div class="jconfirm-bg"></div><div class="jconfirm-scrollpane"><div class="container"><div class="row"><div class="jconfirm-box-container span6 offset3"><div class="jconfirm-box"><div class="closeIcon"><span class="glyphicon glyphicon-remove"></span></div><div class="title"></div><div class="content"></div><div class="buttons"></div><div class="jquery-clear"></div></div></div></div></div></div></div>',title:"Hello",content:"Are you sure to continue?",contentLoaded:function(){},icon:"",confirmButton:"Okay",cancelButton:"Cancel",confirmButtonClass:"btn-default",cancelButtonClass:"btn-default",theme:"white",animation:"scale",animationSpeed:400,animationBounce:1.5,keyboardEnabled:!1,rtl:!1,confirmKeys:[13,32],cancelKeys:[27],container:"body",confirm:function(){},cancel:function(){},backgroundDismiss:!0,autoClose:!1,closeIcon:null,columnClass:"col-md-6 col-md-offset-3",onOpen:function(){},onClose:function(){},onAction:function(){}},jconfirm.record={opened:0,closed:0,currentlyOpen:0}}(jQuery);
