/* 基本窗口的形成 尝试*/
//spritBase = require("sprit.js").spritBase;

//import {spritBase} from "./sprit.js"

var winid // 当前窗口id
var winobj

// 窗口基类： 用于界面内部的窗口（画布内） 可以附加其他基本元素（文字、图像、列表）| 不包含HTML元素
var winBase =
{
	objs :[],
    createNew: function (x, y, w, h)
    {
        var obj =
        {
            x: x,
            y: y,
            width: w,
            height: h
        }
		// 用于初始化精灵类的窗口通用方法
		var sprit = spritBase.createNew("img/windowskin.png")
		// 如果不同窗口
		sprit.flush_ovld = function ()
		{
			cxt = this.cxt
			img = this.img
			x = obj.x
			y = obj.y
			w = obj.width
			h = obj.height

			//cxt.drawImage(backimg,0,0,128,128,x,y,w*2,h*2)
			cxt.globalAlpha = 0.7
				//cxt.drawImage(img,129,0,63,63,0,300,500,128)
			ox = 129
			oy = 0
			ow = 63
			oh = 63
			//
			//alert("ok")
			//cxt.drawImage(img,172,20,10,20,x,y,10,h)
			//cxt.drawImage(img,129,0,20,10,x,y,w,10)

			// 解析windowskin 
			cxt.drawImage(img, 0, 0, 128, 128, x, y, w, h)

			cxt.drawImage(img, ox, oy + 10, 10, 10, x, y + 10, 10, h - 20)
			cxt.drawImage(img, ox + ow - 10, oy + 10, 10, 10, x + w - 10, y + 10, 10, h - 20)

			cxt.drawImage(img, ox + 10, oy, 10, 10, x + 10, y, w - 20, 10)
			cxt.drawImage(img, ox + 10, oy + ow - 10, 10, 10, x + 10, y + h - 10, w - 20, 10)

			cxt.drawImage(img, ox, oy, 10, 10, x, y, 10, 10)
			cxt.drawImage(img, ox + ow - 10, oy, 10, 10, x + w - 10, y, 10, 10)
			cxt.drawImage(img, ox, oy + oh - 10, 10, 10, x, y + h - 10, 10, 10)
			cxt.drawImage(img, ox + ow - 10, oy + oh - 10, 10, 10, x + w - 10, y + h - 10, 10, 10)
			
			cxt.globalAlpha = 1.0
		}
		
		obj.sprit = sprit
        for (m in winBase.methods)
        {
            f = winBase.methods[m];
            obj[f.name] = f;
        }
		this.objs.push(obj)
        return obj
    },


    methods: [], //窗口类方法 可以动态注册 注册后即可实现各种不同功能
    registerMethod: function (f)
    {
        this.methods.push(f)
    },
    // 窗口基类的配置 需要拿到唯一句柄 这里默认ID为scene
    init: function (h)
    {
        this.hwnd = h
            //...
    }
}



// export{winBase}