/* 精灵类的形成*/

// 精灵基类： 用于界面内部显示图片元素 包括角色图、特效图等  | 不包含HTML元素
var spritBase =
{
    objs: [],
    createNew: function (src)
    {
        var img = new Image()
            img.src = src
            var cxt = document.getElementById("scene").getContext("2d")
            var isload = false
            var isvalid = false;
        var obj =
        {
            cxt: cxt,
            img: img, // 留给继承使用的接口
            show_off: function ()
            {
                isvalid = false
            },
            show_on: function ()
            {
                isvalid = true
            },
			
            flush: function ()
            {
                try
                {
                    if (isload && isvalid)
                    {
                        this.flush_ovld()
                    }
                }
                catch (err)
                {
                    alert(err)
                }
            },
            flush_ovld: function ()
            {
                cxt.drawImage(img, 0, 0, img.width, img.height)
            }
        }

		
        img.onload = function ()
        {
            isload = true
                obj.flush()
        }
		
		this.objs.push(obj)
        return obj
    },
    methods: [], //类方法 可以动态注册 注册后即可实现各种不同功能
    registerMethod: function (f)
    {
        this.methods.push(f)
    },
    // 窗口基类的配置 需要拿到唯一句柄 这里默认ID为scene
    init: function (h)
    {
        this.hwnd = h
            //...
    },
	
	keep_on: function()
	{
		setInterval( //这是最弱鸡的做法
			function ()
			{
				cxt = document.getElementById("scene").getContext("2d")
				cxt.clearRect(0,0,600,600)
				try{
				//alert(spritBase.objs.length)
				for(i in spritBase.objs)
				{
					obj = spritBase.objs[i]
					obj.flush()
				}	
				}catch(err){alert(err)}
			},
			100
		)
	}
}

//export {spritBase}
