YUI.add("moodle-atto_poodll-button",function(e,t){var n="atto_poodll",r="poodllfilename",i="atto_poodll",s={INPUTSUBMIT:"atto_media_urlentrysubmit",INPUTCANCEL:"atto_media_urlentrycancel",NAMEBUTTON:"atto_poodll_templatebutton",HEADERTEXT:"atto_poodll_headertext",INSTRUCTIONSTEXT:"atto_poodll_instructionstext",TEMPLATEVARIABLE:"atto_poodll_templatevariable"},o='<form class="atto_form"><div id="{{elementid}}_{{innerform}}" class="mdl-align"><input id="{{elementid}}_{{poodllfilename}}" type="hidden" name="{{elementid}}_{{poodllfilename}}" /><button class="{{CSS.INPUTSUBMIT}}">{{get_string "insert" component}}</button></div></form>',u='<img src="{{url}}" alt="{{alt}}"/>',a='<div id="{{elementid}}_{{innerform}}" class="mdl-align"><h4 class="'+s.HEADERTEXT+'">{{headertext}} {{key}}</h4>'+'<div class="'+s.INSTRUCTIONSTEXT+'">{{instructions}}</div>'+"</div>",f='<div id="{{elementid}}_{{innerform}}" class="mdl-align"><h4 class="'+s.HEADERTEXT+'">{{headertext}}</h4>'+"</div>",l='<div id="{{elementid}}_{{innerform}}" class="atto_generico_buttons mdl-align"><button class="'+s.NAMEBUTTON+'_{{templateindex}}">{{name}}</button>'+"</div>",c='<div id="{{elementid}}_{{innerform}}" class="mdl-align">{{variable}}&nbsp;<input type="text" class="'+s.TEMPLATEVARIABLE+'_{{variableindex}} atto_generico_field" value="{{defaultvalue}}"></input>'+"</div>",h='<div id="{{elementid}}_{{innerform}}" class="mdl-align">{{variable}}</div>',p='<select class="'+s.TEMPLATEVARIABLE+'_{{variableindex}} atto_generico_field"></select>',d='<option value="{{option}}">{{option}}</option>',v='<form class="atto_form"><div id="{{elementid}}_{{innerform}}" class="mdl-align"><button class="'+s.INPUTSUBMIT+'">{{inserttext}}</button>'+"</div>"+"</form>";e.namespace("M.atto_poodll").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_currentSelection:null,_content:null,_currentrecorder:null,_itemid:null,_usercontextid:null,_usewhiteboard:null,initializer:function(e){this._usercontextid=e.usercontextid,this._usewhiteboard=e.usewhiteboard;var t=this.get("host"),n=t.get("filepickeroptions");if(!n.image||!n.image.itemid)return;this._itemid=n.image.itemid;if(e.disabled)return;var r=new Array("audiomp3","audiored5","video","whiteboard","snapshot","widgets");for(var i=0;i<r.length;i++)e.hasOwnProperty(r[i])&&this.addButton({icon:r[i],iconComponent:"atto_poodll",title:r[i]+"_desc",buttonName:r[i],callback:this._displayDialogue,callbackArgs:r[i]})},_displayDialogue:function(t,r){t.preventDefault(),this._currentrecorder=r;if(r=="widgets"){this._displayWidgetsDialogue(t,r);return}var i=400,s=260;switch(r){case"audiomp3":case"audiored5":i=400,s=260;break;case"video":case"snapshot":i=400,s=450;break;case"whiteboard":i=680,s=540}var o=this.getDialogue({headerContent:M.util.get_string("dialogtitle",n),width:i+"px",focusAfterHide:r});o.width!=i+"px"&&o.set("width",i+"px");var u="atto_poodll_dialog_iframe_"+(new Date).getTime(),a=e.Node.create('<iframe id="'+u+'"width="300px" height="150px"></iframe>');a.setStyles({border:"none",overflow:"hidden"}),a.setAttribute("src",this._getIframeURL(r,u)),a.setAttribute("scrolling","no");var f=this._getFormContent(),l=e.Node.create('<div class="atto_poodll_iframe_container"></div>');l.append(a).append(f),o.set("bodyContent",l),o.show(),this.markUpdated()},_getIframeURL:function(e,t){return M.cfg.wwwroot+"/lib/editor/atto/plugins/poodll/dialog/poodll.php?"+"itemid="+this._itemid+"&recorder="+e+"&usewhiteboard="+this._usewhiteboard+"&iframeid="+t+"&updatecontrol="+this._getFilenameControlName()},_getFormContent:function(){var t=e.Handlebars.compile(o),i=e.Node.create(t({elementid:this.get("host").get("elementid"),CSS:s,poodllfilename:r,component:n}));return this._form=i,this._form.one("."+s.INPUTSUBMIT).on("click",this._doInsert,this),i},_getFilenameControlName:function(){return this.get("host").get("elementid")+"_"+r},_doInsert:function(t){t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide();var n=document.getElementById(this._getFilenameControlName());if(!n.value)return;var n=n.value,r=M.cfg.wwwroot,i="",s=r+"/draftfile.php/"+this._usercontextid+"/user/draft/"+this._itemid+"/"+n;this._currentrecorder==="snapshot"||this._currentrecorder==="whiteboard"?(template=e.Handlebars.compile(u),i=template({url:s,alt:n})):i='<a href="'+s+'">'+n+"</a>",this.editor.focus(),this.get("host").insertContentAtFocusPoint(i),this.markUpdated()},updatefilename:function(e){var t=document.getElementById(this._getFilenameControlName());t===null&&(t=parent.document.getElementById(e[3])),t&&(t.value=e[2],this._form.one("."+s.INPUTSUBMIT).disabled=!1)},_displayWidgetsDialogue:function(t,r){t.preventDefault();var i=400,s=this.getDialogue({headerContent:M.util.get_string("dialogtitle",n),width:i+"px",focusAfterHide:r});s.width!==i+"px"&&s.set("width",i+"px");var o=e.Node.create("<div></div>"),u=e.Handlebars.compile(f),a=e.Node.create(u({headertext:M.util.get_string("chooseinsert",n)}));o.append(a);var l=this._getButtonsForNames(r);e.Array.each(l,function(e){o.append(e)},o),s.set("bodyContent",o),s.show(),this.markUpdated()},_showTemplateForm:function(t,r){t.preventDefault();var i=400,s=this.getDialogue({headerContent:M.util.get_string("dialogtitle",n),width:i+"px"});s.width!==i+"px"&&s.set("width",i+"px");var o=this._getTemplateFields(r),u=this.get("instructions")[r];u=decodeURIComponent(u);if(o&&o.length>0)var f=M.util.get_string("fieldsheader",n);else var f=M.util.get_string("nofieldsheader",n);var l=e.Handlebars.compile(a),c=e.Node.create(l({key:this.get("keys")[r],headertext:f,instructions:u})),h=c,p=e.Node.create("<div></div>");p.append(h),e.Array.each(o,function(e){p.append(e)},p);var d=this._getSubmitButtons(r);p.append(d),s.set("bodyContent",p),s.show(),this.markUpdated()},_getSubmitButtons:function(t){var r=e.Handlebars.compile(v),i=e.Node.create(r({elementid:this.get("host").get("elementid"),inserttext:M.util.get_string("insert",n)}));return i.one("."+s.INPUTSUBMIT).on("click",this._doWidgetsInsert,this,t),i},_getTemplateFields
:function(t){var n=[],r=this.get("keys")[t],i=this.get("variables")[t],s=this.get("defaults")[t],o=s;return e.Array.each(i,function(t,r){if(t in o&&o[t].indexOf("|")>-1){var i=e.Handlebars.compile(h),s=e.Node.create(i({elementid:this.get("host").get("elementid"),variable:t,defaultvalue:o[t],variableindex:r})),u=e.Handlebars.compile(p),a=e.Node.create(u({variable:t,defaultvalue:o[t],variableindex:r})),f=o[t].split("|"),l="",v=e.Handlebars.compile(d);e.Array.each(f,function(t,n){var r=e.Node.create(v({option:t}));a.appendChild(r)}),s.appendChild(a)}else var m=e.Handlebars.compile(c),s=e.Node.create(m({elementid:this.get("host").get("elementid"),variable:t,defaultvalue:o[t],variableindex:r}));n.push(s)},this),n},_getButtonsForNames:function(t){var n=[];return e.Array.each(this.get("names"),function(t,r){var i=e.Handlebars.compile(l),o=e.Node.create(i({elementid:this.get("host").get("elementid"),name:t,templateindex:r}));this._form=o,o.one("."+s.NAMEBUTTON+"_"+r).on("click",this._showTemplateForm,this,r),n.push(o)},this),n},_getDefArray:function(t){var n=[],r=t.match(/([^=,]*)=("[^"]*"|[^,"]*)/g);return e.Array.each(r,function(e){var t=e.split("=");t&&t.length>1&&(n[t[0]]=t[1].replace(/"/g,""))},this),n},_doWidgetsInsert:function(t,n){t.preventDefault(),this.getDialogue({focusAfterHide:null}).hide();var r="{POODLL:type=",i=this.get("keys")[n],o=this.get("variables")[n],u=this.get("defaults")[n],a=this.get("ends")[n],f=u;r+='"'+i+'"',e.Array.each(o,function(t,n){var i=e.one("."+s.TEMPLATEVARIABLE+"_"+n),o=i.get("value");o&&o!=f[t]&&(r+=","+t+'="'+o+'"')},this),r+="}",a&&(r+='<br/>{POODLL:type="'+i+'_end"}'),this.editor.focus(),this.get("host").insertContentAtFocusPoint(r),this.markUpdated()}},{ATTRS:{names:{value:null},keys:{value:null},variables:{value:null},defaults:{value:null},instructions:{value:null},customicon:{value:null},ends:{value:null}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});
