var temp =
{
	atr : {},
	atr2 : [],
	f2:function(){alert("hahahahaha")},
	f : function()
	{
		alert("in")
		this.atr2.push(this.f2)
		this.atr2[0]()
	}
	
}