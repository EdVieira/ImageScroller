/*
The MIT License (MIT)
Copyright (c) 2017 Eduardo Henrique Vieira dos Santos
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function ImageScroller(divPanelId, src)
{
    this.divPanel = divPanelId;
    this.interval = 6000;
    this.srcs = src;
	this.count = null;
    this.date = 0;
    this.op = 1;
    this.busy = false;
    this.btnsArea = "<div>";
    this.btnSelected = "<div style='float:left;background-color: darkgray;border-radius: 25px;width: 10px; height: 10px;margin:5px;'";
    this.btnSelectedEndTag = "</div>";
    this.btnDefault = "<div style='float:left;background-color: lightgray;border-radius: 25px;width: 10px; height: 10px;margin:5px;'";
    this.btnDefaultEndTag = "</div>";
    this.btnsAreaEndtag = "<div>";
    this.fadeInOut = function(element, n, src, imgScroller){
        var op = 1;  // initial opacity
        imgScroller.busy = true;
        clearInterval(timer);
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                imgScroller.startPanel();
                element.style.backgroundImage = "url('"+src[n]+"')";
                timer = setInterval(function () {
                    if (op >= 1){
                        clearInterval(timer);
                        imgScroller.busy = false;
                    }else{
                        element.style.opacity = op;
                        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                        op += op * 0.1;
                    }
                }, 10);
            }else{
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
            }
        }, 10);
    }
    this.autoScroll = function(){
    	var s = this;
        var timer = setInterval(function () {
        	if((Date.now() - s.date) > s.interval){
        		s.setImage(s.count+1);
        	}
        }, 1);

    }
    this.startPanel = function(){
        this.printPanel();
        this.setImage(0);
        this.autoScroll(this);
    }
	this.printPanel = function(){
    	document.getElementById(this.divPanel).style.backgroundImage = "url('"+this.srcs[this.count]+"')";
    	var str = this.btnsArea;
    	for(i in this.srcs){
    		if(i == this.count){
    		str = str + this.btnSelected +" onmouseover='"+this.divPanel+".setImage("+i+")'>" + this.btnSelectedEndTag;
    		}else{
    		str = str + this.btnDefault +" onmouseover='"+this.divPanel+".setImage("+i+")'>" + this.btnDefaultEndTag;
    		}
    	}
    	var str = str+ this.btnsAreaEndtag;
		document.getElementById(this.divPanel).innerHTML = str;
	};
	this.setImage = function(n){
		this.date = Date.now();
        if(n != this.count && !this.busy){   
            if(n < this.srcs.length && n >= 0){ 
                this.count = n;
            }else{
                this.count = 0;
            }
            this.fadeInOut(document.getElementById(this.divPanel), this.count, this.srcs, this);
        }
	};
};
