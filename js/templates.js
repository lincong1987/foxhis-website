//应用图标
var appTemp = template(
	'<li class="appbtn shortcut app" type="app" id="app_<%=id%>" style="left:<%=left%>px;top:<%=top%>px" shortcut="<%=id%>">'+
		'<div><img src="<%=imgsrc%>" title="<%=title%>" alt="<%=title%>"></div>'+
		'<span><%=title%></span>'+
	'</li>'
);
//文件夹图标
var folderTemp = template(
	'<li class="appbtn shortcut folder" type="folder" id="folder_<%=id%>" style="left:<%=left%>px;top:<%=top%>px" shortcut="<%=id%>">'+
		'<div><img src="img/ui/folder_<%=imgsrc%>.png" title="<%=title%>" alt="<%=title%>"></div>'+
		'<span><%=title%></span>'+
	'</li>'
);
//小挂件图标
var widgetTemp = template(
	'<li class="appbtn shortcut widget" type="widget" id="widget_<%=id%>" style="left:<%=left%>px;top:<%=top%>px" shortcut="<%=id%>">'+
		'<div><img src="<%=imgsrc%>" title="<%=title%>" alt="<%=title%>"></div>'+
		'<span><%=title%></span>'+
	'</li>'
);
//添加应用
var addTemp = template(
	'<li class="appbtn add-app" style="left:<%=left%>px;top:<%=top%>px">'+
		'<i class="shortcut-addicon"></i>'+
		'<span>添加应用</span>'+
	'</li>'
);
//任务栏
var taskTemp = template(
	'<a window="<%=num%>" class="task-item task-item-current">'+
		'<div class="task-item-icon">'+
			'<img src="<%=imgsrc%>">'+
		'</div>'+
		'<div class="task-item-txt"><%=title%></div>'+
	'</a>'
);
//小挂件
var widgetWindowTemp = template(
	'<div class="widget" id="widget_<%=num%>_warp" style="z-index:1;width:<%=width%>px;height:<%=height%>px" widget="<%=num%>">'+
		'<div class="move"></div>'+
		'<a class="ha-close" href="javascript:;" title="关闭"></a>'+
		'<div class="frame">'+
			'<iframe src="<%=url%>" frameborder="0" allowtransparency="true"></iframe>'+
		'</div>'+
	'</div>'
);
//应用窗口
var windowTemp = template(
	'<div style="width:<%=width%>px;height:<%=height%>px;top:<%=top%>px;left:<%=left%>px;z-index:<%=zIndex%>" class="window-container window-current" window="<%=num%>" id="window_<%=num%>_warp">'+
		'<div style="height:100%" id="window_<%=num%>_inner">'+
			'<div class="title-bar">'+
				'<img class="icon" src="<%=imgsrc%>"><span class="title"><%=title%></span>'+
			'</div>'+
			'<div class="title-handle">'+
				'<a class="ha-hide" btn="hide" href="javascript:;" title="最小化"><b class="hide-b"></b></a>'+
				'<% if(titlebar){ %>'+
					'<a class="ha-max" btn="max" href="javascript:;" title="最大化"><b class="max-b"></b></a>'+
					'<a class="ha-revert" btn="revert" href="javascript:;" title="还原" style="display:none"><b class="revert-b"></b><b class="revert-t"></b></a>'+
				'<% } %>'+
				'<% if(titlebarFullscreen){ %>'+
					'<a class="ha-fullscreen" btn="fullscreen" href="javascript:;" title="全屏">+</a>'+
				'<% } %>'+
				'<a class="ha-close" btn="close" href="javascript:;" title="关闭">×</a>'+
			'</div>'+
			'<div class="window-frame">'+
				'<div class="window-mask"><div class="maskbg"></div><div>运行中,点击恢复显示 :)</div></div><div class="window-loading"></div>'+
				'<iframe frameborder="0" id="window_<%=num%>_frame" name="window_<%=num%>_frame" src="<%=url%>"></iframe>'+
			'</div>'+
			'<div class="set-bar"><div class="fr">'+
				'<% if(setbar){ %>'+
					'<!--<a class="btn star"><i class="icon icon177"></i><span class="btn-con">评分</span></a>'+
					'<a class="btn help" id="help_<%=num%>"><i class="icon icon105"></i><span class="btn-con">帮助</span></a>-->'+
				'<% } %>'+
				'<a class="btn refresh"><i class="icon icon158"></i><span class="btn-con">刷新</span></a>'+
			'</div></div>'+
		'</div>'+
		'<% if(resize){ %>'+
			'<div class="window-resize window-resize-t" resize="t"></div>'+
			'<div class="window-resize window-resize-r" resize="r"></div>'+
			'<div class="window-resize window-resize-b" resize="b"></div>'+
			'<div class="window-resize window-resize-l" resize="l"></div>'+
			'<div class="window-resize window-resize-rt" resize="rt"></div>'+
			'<div class="window-resize window-resize-rb" resize="rb"></div>'+
			'<div class="window-resize window-resize-lt" resize="lt"></div>'+
			'<div class="window-resize window-resize-lb" resize="lb"></div>'+
		'<% } %>'+
	'</div>'
);
//文件夹窗口
var folderWindowTemp = template(
	'<div style="width:<%=width%>px;height:<%=height%>px;top:<%=top%>px;left:<%=left%>px;z-index:<%=zIndex%>" class="folder-window window-container window-current" window="<%=num%>" id="window_<%=num%>_warp">'+
		'<div style="height:100%" id="window_<%=num%>_inner">'+
			'<div class="title-bar">'+
				'<img class="icon" src="<%=imgsrc%>"><span class="title"><%=title%></span>'+
			'</div>'+
			'<div class="title-handle">'+
				'<a class="ha-hide" btn="hide" href="javascript:;" title="最小化"><b class="hide-b"></b></a>'+
				'<% if(titlebar){ %>'+
					'<a class="ha-max" btn="max" href="javascript:;" title="最大化"><b class="max-b"></b></a>'+
					'<a class="ha-revert" btn="revert" href="javascript:;" title="还原" style="display:none"><b class="revert-b"></b><b class="revert-t"></b></a>'+
				'<% } %>'+
				'<a class="ha-close" btn="close" href="javascript:;" title="关闭">×</a>'+
			'</div>'+
			'<div class="window-frame">'+
				'<div class="window-mask"><div class="maskbg"></div><div>运行中,点击恢复显示 :)</div></div><div class="window-loading"></div>'+
				'<div id="window_<%=num%>_folder" class="folder_body"></div>'+
			'</div>'+
			'<div class="set-bar"></div>'+
		'</div>'+
		'<% if(resize){ %>'+
			'<div class="window-resize window-resize-t" resize="t"></div>'+
			'<div class="window-resize window-resize-r" resize="r"></div>'+
			'<div class="window-resize window-resize-b" resize="b"></div>'+
			'<div class="window-resize window-resize-l" resize="l"></div>'+
			'<div class="window-resize window-resize-rt" resize="rt"></div>'+
			'<div class="window-resize window-resize-rb" resize="rb"></div>'+
			'<div class="window-resize window-resize-lt" resize="lt"></div>'+
			'<div class="window-resize window-resize-lb" resize="lb"></div>'+
		'<% } %>'+
	'</div>'
);
//文件夹预览
var folderViewTemp = template(
	'<div class="quick_view_container" id="quick_view_container_<%=shortcut%>" shortcut="<%=shortcut%>" style="top:<%=top%>px;left:<%=left%>px">'+
		'<div class="perfect_nine_box">'+
			'<div class="perfect_nine_t">'+
				'<div class="perfect_nine_t_m"></div>'+
			'</div>'+
			'<span class="perfect_nine_t_l"></span>'+
			'<span class="perfect_nine_t_r"></span>'+
			'<div class="perfect_nine_middle">'+
				'<span class="perfect_nine_m_l">'+
					'<div class="perfect_nine_m_l_t" style="top:0px;height:<%=mlt%>px"></div>'+
					'<div class="perfect_nine_m_l_m" style="top:<%=mlt%>px;height:20px;display:<% if(mlm){ %>block<% }else{ %>none<% } %>"></div>'+
					'<div class="perfect_nine_m_l_b" style="top:<% if(mlm){ %><%=mlt+20%><% }else{ %><%=mlt%><% } %>px;height:<%=mlb%>px"></div>'+
				'</span>'+
				'<span class="perfect_nine_m_r">'+
					'<div class="perfect_nine_m_r_t" style="top:0px;height:<%=mrt%>px"></div>'+
					'<div class="perfect_nine_m_r_m" style="top:<%=mrt%>px;height:20px;display:<% if(mrm){ %>block<% }else{ %>none<% } %>"></div>'+
					'<div class="perfect_nine_m_r_b" style="top:<% if(mrm){ %><%=mrt+20%><% }else{ %><%=mrt%><% } %>px;height:<%=mrb%>px"></div>'+
				'</span>'+
				'<div class="perfect_nine_context">'+
					'<div class="quick_view_container_control">'+
						'<a href="javascript:;" class="quick_view_container_open">打开</a>'+
					'</div>'+
					'<div class="quick_view_container_list folder-window" id="quick_view_container_list_<%=shortcut%>" window="<%=shortcut%>">'+
						'<div class="quick_view_container_list_in"  id="quick_view_container_list_in_<%=shortcut%>" style="height:<%=height%>px">'+
							'<%=apps%>'+
						'</div>'+
						'<div class="scrollBar"></div>'+
						'<div class="scrollBar_bgc"></div>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="perfect_nine_b">'+
				'<div class="perfect_nine_b_m"></div>'+
			'</div>'+
			'<span class="perfect_nine_b_l"></span>'+
			'<span class="perfect_nine_b_r"></span>'+
		'</div>'+
	'</div>'
);