<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/view/lib.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>勤务管理——跳转主页</title>
    
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->	<link rel="stylesheet" type="text/css" href="asset/css/images/dateStyle.css"/>
		<script src='<%=basePath%>script/duty/dutyframe.js' 	type='text/javascript'></script>
  </head>
  
  <body style="overflow:hidden">
<div id="cc" class="easyui-layout" style="width:100%;height:100%;" oncontextmenu=self.event.returnValue=false>
	<div data-options="region:'west',title:'组织机构导航树',split:true" class="dtytreeArea">
		<!-- 左边导航树 -->
		<div>
			<input id="txtOrgName" class="dtytreesearch" type="text"/>
			<a id="btnSearchOrg" href="javascript:void(0);" class="easyui-linkbutton"
                    iconcls="icon-tianyi-search" onclick="searchOrgAction()" ></a>
		</div>
    	<ul id="treeDutyFrmOrg"></ul>
    </div>
    
    <!-- 内容区域，采用iframe方式切入 -->
    <div data-options="region:'center'" style="overflow:hidden" >
    	<iframe id="ifmWorkSpace" name="ifmWorkSpace"  scrolling='yes'  frameborder='0'  style="width:100%;height:100%"></iframe>
    </div>        
    <div data-options="region:'east',split:false" class="dtyeastArea">
    	<!--右边导航目录 s-->
		<div class="MenuBox">
			<ul>
		    	<li style="cursor:default"  id="MenuBoxOn">
		        	<div id="MenuBoxOnBox"><div class="MenuBoxSmall"><img src="asset/css/images/baobeimodel.png" /><a style="cursor:default" href="javascript:void(0);">勤务管理　　</a></div></div>
		        	
		        </li>
		        <li onclick="onDutyPrepare()">
		        	<div id="divDutyPrepare" doc="menu"><div class="MenuBoxSmall"><img src="asset/css/images/little icon/qingwubaobei.png" /><a href="javascript:void(0);" onclick="onDutyPrepare()">勤务报备管理</a></div></div>
		        </li>
		        <li onclick="onDutyDataGroup('policegroup')">
		        	<div id="divDutyDataGroup" doc="menu"><div class="MenuBoxSmall"><img src="asset/css/images/little icon/organize.png" /><a href="javascript:void(0);" onclick="onDutyDataGroup('policegroup')">资源分组管理</a></div></div>
		        </li>
		        <li onclick="onDutyReport()">
		        	<div id="divDutyReport" doc="menu"><div class="MenuBoxSmall"><img src="asset/css/images/little icon/comprehensivequery.png" /><a href="javascript:void(0);" onclick="onDutyReport()">勤务综合查询</a></div></div>
		        </li>
		        <li onclick="onDutyType()">
		        	<div id="divDutyType" doc="menu"><div class="MenuBoxSmall"><img src="asset/css/images/little icon/basicdata.png" /><a href="javascript:void(0);" onclick="onDutyType()">报备类型管理</a></div></div>
		        </li>
		        
		    </ul>
		</div>
    
    
     
    </div>    
    
</div>    
    

		
  </body>
</html>
