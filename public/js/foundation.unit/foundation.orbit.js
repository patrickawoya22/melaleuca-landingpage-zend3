(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports;}
var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports;}
__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.i=function(value){return value;};__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{configurable:false,enumerable:true,get:getter});}};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module['default'];}:function getModuleExports(){return module;};__webpack_require__.d(getter,'a',getter);return getter;};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property);};__webpack_require__.p="";return __webpack_require__(__webpack_require__.s=89);})
({0:(function(module,exports){module.exports=jQuery;}),1:(function(module,exports){module.exports={Foundation:window.Foundation};}),10:(function(module,exports){module.exports={onImagesLoaded:window.Foundation.onImagesLoaded};}),12:(function(module,exports){module.exports={Touch:window.Foundation.Touch};}),2:(function(module,exports){module.exports={Plugin:window.Foundation.Plugin};}),23:(function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});var __WEBPACK_IMPORTED_MODULE_0__foundation_core__=__webpack_require__(1);var __WEBPACK_IMPORTED_MODULE_0__foundation_core___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__foundation_core__);var __WEBPACK_IMPORTED_MODULE_1__foundation_orbit__=__webpack_require__(53);__WEBPACK_IMPORTED_MODULE_0__foundation_core__["Foundation"].plugin(__WEBPACK_IMPORTED_MODULE_1__foundation_orbit__["a"],'Orbit');}),3:(function(module,exports){module.exports={rtl:window.Foundation.rtl,GetYoDigits:window.Foundation.GetYoDigits,transitionend:window.Foundation.transitionend};}),4:(function(module,exports){module.exports={Motion:window.Foundation.Motion,Move:window.Foundation.Move};}),5:(function(module,exports){module.exports={Keyboard:window.Foundation.Keyboard};}),53:(function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return Orbit;});var __WEBPACK_IMPORTED_MODULE_0_jquery__=__webpack_require__(0);var __WEBPACK_IMPORTED_MODULE_0_jquery___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__=__webpack_require__(5);var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__);var __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__=__webpack_require__(4);var __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__);var __WEBPACK_IMPORTED_MODULE_3__foundation_util_timer__=__webpack_require__(78);var __WEBPACK_IMPORTED_MODULE_3__foundation_util_timer___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__foundation_util_timer__);var __WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__=__webpack_require__(10);var __WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__);var __WEBPACK_IMPORTED_MODULE_5__foundation_util_core__=__webpack_require__(3);var __WEBPACK_IMPORTED_MODULE_5__foundation_util_core___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__foundation_util_core__);var __WEBPACK_IMPORTED_MODULE_6__foundation_plugin__=__webpack_require__(2);var __WEBPACK_IMPORTED_MODULE_6__foundation_plugin___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__foundation_plugin__);var __WEBPACK_IMPORTED_MODULE_7__foundation_util_touch__=__webpack_require__(12);var __WEBPACK_IMPORTED_MODULE_7__foundation_util_touch___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__foundation_util_touch__);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}
function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}
function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+ typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}
var Orbit=function(_Plugin){_inherits(Orbit,_Plugin);function Orbit(){_classCallCheck(this,Orbit);return _possibleConstructorReturn(this,(Orbit.__proto__||Object.getPrototypeOf(Orbit)).apply(this,arguments));}
_createClass(Orbit,[{key:'_setup',value:function _setup(element,options){this.$element=element;this.options=__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({},Orbit.defaults,this.$element.data(),options);this.className='Orbit';__WEBPACK_IMPORTED_MODULE_7__foundation_util_touch__["Touch"].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);this._init();__WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["Keyboard"].register('Orbit',{'ltr':{'ARROW_RIGHT':'next','ARROW_LEFT':'previous'},'rtl':{'ARROW_LEFT':'next','ARROW_RIGHT':'previous'}});}},{key:'_init',value:function _init(){this._reset();this.$wrapper=this.$element.find('.'+ this.options.containerClass);this.$slides=this.$element.find('.'+ this.options.slideClass);var $images=this.$element.find('img'),initActive=this.$slides.filter('.is-active'),id=this.$element[0].id||__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__foundation_util_core__["GetYoDigits"])(6,'orbit');this.$element.attr({'data-resize':id,'id':id});if(!initActive.length){this.$slides.eq(0).addClass('is-active');}
if(!this.options.useMUI){this.$slides.addClass('no-motionui');}
if($images.length){__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__["onImagesLoaded"])($images,this._prepareForOrbit.bind(this));}else{this._prepareForOrbit();}
if(this.options.bullets){this._loadBullets();}
this._events();if(this.options.autoPlay&&this.$slides.length>1){this.geoSync();}
if(this.options.accessible){this.$wrapper.attr('tabindex',0);}}},{key:'_loadBullets',value:function _loadBullets(){this.$bullets=this.$element.find('.'+ this.options.boxOfBullets).find('button');}},{key:'geoSync',value:function geoSync(){var _this=this;this.timer=new __WEBPACK_IMPORTED_MODULE_3__foundation_util_timer__["Timer"](this.$element,{duration:this.options.timerDelay,infinite:false},function(){_this.changeSlide(true);});this.timer.start();}},{key:'_prepareForOrbit',value:function _prepareForOrbit(){var _this=this;this._setWrapperHeight();}},{key:'_setWrapperHeight',value:function _setWrapperHeight(cb){var max=0,temp,counter=0,_this=this;this.$slides.each(function(){temp=this.getBoundingClientRect().height;__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('data-slide',counter);if(!/mui/g.test(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)[0].className)&&_this.$slides.filter('.is-active')[0]!==_this.$slides.eq(counter)[0]){__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).css({'position':'relative','display':'none'});}
max=temp>max?temp:max;counter++;});if(counter===this.$slides.length){this.$wrapper.css({'height':max});if(cb){cb(max);}}}},{key:'_setSlideHeight',value:function _setSlideHeight(height){this.$slides.each(function(){__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).css('max-height',height);});}},{key:'_events',value:function _events(){var _this=this;this.$element.off('.resizeme.zf.trigger').on({'resizeme.zf.trigger':this._prepareForOrbit.bind(this)});if(this.$slides.length>1){if(this.options.swipe){this.$slides.off('swipeleft.zf.orbit swiperight.zf.orbit').on('swipeleft.zf.orbit',function(e){e.preventDefault();_this.changeSlide(true);}).on('swiperight.zf.orbit',function(e){e.preventDefault();_this.changeSlide(false);});}
if(this.options.autoPlay){this.$slides.on('click.zf.orbit',function(){_this.$element.data('clickedOn',_this.$element.data('clickedOn')?false:true);_this.timer[_this.$element.data('clickedOn')?'pause':'start']();});if(this.options.pauseOnHover){this.$element.on('mouseenter.zf.orbit',function(){_this.timer.pause();}).on('mouseleave.zf.orbit',function(){if(!_this.$element.data('clickedOn')){_this.timer.start();}});}}
if(this.options.navButtons){var $controls=this.$element.find('.'+ this.options.nextClass+', .'+ this.options.prevClass);$controls.attr('tabindex',0).on('click.zf.orbit touchend.zf.orbit',function(e){e.preventDefault();_this.changeSlide(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).hasClass(_this.options.nextClass));});}
if(this.options.bullets){this.$bullets.on('click.zf.orbit touchend.zf.orbit',function(){if(/is-active/g.test(this.className)){return false;}
var idx=__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('slide'),ltr=idx>_this.$slides.filter('.is-active').data('slide'),$slide=_this.$slides.eq(idx);_this.changeSlide(ltr,$slide,idx);});}
if(this.options.accessible){this.$wrapper.add(this.$bullets).on('keydown.zf.orbit',function(e){__WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["Keyboard"].handleKey(e,'Orbit',{next:function(){_this.changeSlide(true);},previous:function(){_this.changeSlide(false);},handled:function(){if(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).is(_this.$bullets)){_this.$bullets.filter('.is-active').focus();}}});});}}}},{key:'_reset',value:function _reset(){if(typeof this.$slides=='undefined'){return;}
if(this.$slides.length>1){this.$element.off('.zf.orbit').find('*').off('.zf.orbit');if(this.options.autoPlay){this.timer.restart();}
this.$slides.each(function(el){__WEBPACK_IMPORTED_MODULE_0_jquery___default()(el).removeClass('is-active is-active is-in').removeAttr('aria-live').hide();});this.$slides.first().addClass('is-active').show();this.$element.trigger('slidechange.zf.orbit',[this.$slides.first()]);if(this.options.bullets){this._updateBullets(0);}}}},{key:'changeSlide',value:function changeSlide(isLTR,chosenSlide,idx){if(!this.$slides){return;}
var $curSlide=this.$slides.filter('.is-active').eq(0);if(/mui/g.test($curSlide[0].className)){return false;}
var $firstSlide=this.$slides.first(),$lastSlide=this.$slides.last(),dirIn=isLTR?'Right':'Left',dirOut=isLTR?'Left':'Right',_this=this,$newSlide;if(!chosenSlide){$newSlide=isLTR?this.options.infiniteWrap?$curSlide.next('.'+ this.options.slideClass).length?$curSlide.next('.'+ this.options.slideClass):$firstSlide:$curSlide.next('.'+ this.options.slideClass):this.options.infiniteWrap?$curSlide.prev('.'+ this.options.slideClass).length?$curSlide.prev('.'+ this.options.slideClass):$lastSlide:$curSlide.prev('.'+ this.options.slideClass);}else{$newSlide=chosenSlide;}
if($newSlide.length){this.$element.trigger('beforeslidechange.zf.orbit',[$curSlide,$newSlide]);if(this.options.bullets){idx=idx||this.$slides.index($newSlide);this._updateBullets(idx);}
if(this.options.useMUI&&!this.$element.is(':hidden')){__WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["Motion"].animateIn($newSlide.addClass('is-active').css({'position':'absolute','top':0}),this.options['animInFrom'+ dirIn],function(){$newSlide.css({'position':'relative','display':'block'}).attr('aria-live','polite');});__WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["Motion"].animateOut($curSlide.removeClass('is-active'),this.options['animOutTo'+ dirOut],function(){$curSlide.removeAttr('aria-live');if(_this.options.autoPlay&&!_this.timer.isPaused){_this.timer.restart();}});}else{$curSlide.removeClass('is-active is-in').removeAttr('aria-live').hide();$newSlide.addClass('is-active is-in').attr('aria-live','polite').show();if(this.options.autoPlay&&!this.timer.isPaused){this.timer.restart();}}
this.$element.trigger('slidechange.zf.orbit',[$newSlide]);}}},{key:'_updateBullets',value:function _updateBullets(idx){var $oldBullet=this.$element.find('.'+ this.options.boxOfBullets).find('.is-active').removeClass('is-active').blur(),span=$oldBullet.find('span:last').detach(),$newBullet=this.$bullets.eq(idx).addClass('is-active').append(span);}},{key:'_destroy',value:function _destroy(){this.$element.off('.zf.orbit').find('*').off('.zf.orbit').end().hide();}}]);return Orbit;}(__WEBPACK_IMPORTED_MODULE_6__foundation_plugin__["Plugin"]);Orbit.defaults={bullets:true,navButtons:true,animInFromRight:'slide-in-right',animOutToRight:'slide-out-right',animInFromLeft:'slide-in-left',animOutToLeft:'slide-out-left',autoPlay:true,timerDelay:5000,infiniteWrap:true,swipe:true,pauseOnHover:true,accessible:true,containerClass:'orbit-container',slideClass:'orbit-slide',boxOfBullets:'orbit-bullets',nextClass:'orbit-next',prevClass:'orbit-previous',useMUI:true};}),78:(function(module,exports){module.exports={Timer:window.Foundation.Timer};}),89:(function(module,exports,__webpack_require__){module.exports=__webpack_require__(23);})});