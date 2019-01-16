var user_interface = 
{
	key_pressed : {},
	key_map:{},
	is_pressed : false,
	detect_thread : null,
	//公有函数用变量名引用 私有函数用this
	key_down:function (e)
	{
		if (user_interface.key_pressed[e.keyCode]!=undefined && user_interface.key_pressed[e.keyCode]){return}
		
		user_interface.key_pressed[e.keyCode]=true;
		if(!user_interface.is_pressed)
		{
			//user_interface.imd_detect()
			user_interface.is_pressed = true
			user_interface.keep_detect()
		}
		console.log("down",e.keyCode)
	},
	key_up:function (e)
	{
		console.log("up",e.keyCode)
		
		user_interface.is_pressed = false
		
		user_interface.stop_detect()
		user_interface.key_pressed[e.keyCode]=false;
	},
	add_key_map: function (key,f)
	{
		if(this.key_map[key] == undefined)
		{
			this.key_map[key] = []
		}
		this.key_map[key].push(f)
	},
	imd_detect: function ()
	{
		for(k in user_interface.key_map)
		{
			if (!!user_interface.key_pressed[k])
			{	
				for (i in user_interface.key_map[k])
				{
					user_interface.key_map[k][i]()
				}
			}
		}
	},
	keep_detect : function()// 有bug 需要配合imd_detect
	{
		user_interface.imd_detect()//先执行一次
		this.detect_thread = setInterval(
		this.imd_detect,
		200)
	},
	stop_detect : function()
	{
		clearInterval(this.detect_thread)
	}
}
