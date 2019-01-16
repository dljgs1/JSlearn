var actorBase =
{
	objs :[],
    createNew: function (x, y)
    {
		var axe = 32 // 真实虚拟坐标差值
        var obj =
        {
            x: x,
            y: y,
			face : 0,
			show:function(){console.log(this)}
			
        }
		// 用于初始化精灵类的窗口通用方法
		var sprit = spritBase.createNew("img/actor1.png")
		
		obj.go_ahead = function(dir,step)
		{	
			console.log(dir,step,step*axe)
			this.face = dir;
			switch(dir)
			{
				case 0: this.y += step*axe
				break
				case 1: this.x -= step*axe
				break
				case 2: this.x += step*axe
				break 
				case 3: this.y -= step*axe
				break
			}
			
			console.log(this)
		}
		
		var lx = x
		var ly = y // 行动中使用
		var dt = 0
		
		var gap = 16 //每一帧前进数
		sprit.flush_ovld = function ()
		{
			cxt = this.cxt
			img = this.img
			var x = obj.x
			var y = obj.y
			var f = obj.face
			var w = parseInt(img.width/4)
			var h = parseInt(img.height/4)
			if(lx != x)
			{
				dif = lx - x
				d = dif < 0 ? 1 : -1
				lx += d * gap
				dt = (dt + 1)% 4
			}
			if(ly != y)
			{
				dif = ly - y
				d = dif < 0 ? 1 : -1
				ly += d * gap
				dt = (dt + 1)% 4
			}
			
			ox = dt*w
			oy = f*h
			ow = w
			oh = h
			
			cxt.drawImage(img, ox, oy, ow, oh, lx, ly, ow, oh)
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

