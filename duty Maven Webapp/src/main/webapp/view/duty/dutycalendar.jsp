<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="/view/lib.jsp"%>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<!--  
<link href='//cdn.datatables.net/plug-ins/a5734b29083/integration/jqueryui/dataTables.jqueryui.css' type='text/css' />
-->
<script src='<%=basePath%>script/duty/dutycalendar.js'
	type='text/javascript'></script>
<link href='<%=basePath%>asset/css/images/dateStyle.css' media='all'
	rel='stylesheet' type='text/css' />
	
	<link href='<%=basePath%>asset/css/images/dutycalendar.css' media='all'
	rel='stylesheet' type='text/css' /> 

<title>勤务报备</title> 
</head>
  <body>
    
	<!--日历 s-->
	<div class="dateBox">
		<!--日历主窗体 s-->
    	<div class="dateBoxMain">
    		<div class="dateBoxMainTItle">
        		<div class="dateBoxMainTItleTxt">报备月程表</div>
	            <div class="dateBoxMainTItleBox">
	            	<div class="dateBoxMainTItleBoxMain">
	                	<ul>
	                    	<li><img src="asset/css/images/dateLast.png" onclick="getDateClick('last')" /></li>
	                        <li><div class="dateBoxMainTItleBoxMainTxt"><div class="dateBoxMainTItleBoxMain_samp" id="dateY"><span id="sp_years"></span></div>&nbsp;年</div></li>
	                        <li><div class="dateBoxMainTItleBoxMainTxt2">&nbsp;<div class="dateBoxMainTItleBoxMain_samp" id="dateM"><span id="sp_month"></span></div>&nbsp;月</div></li>
	                        <li><img src="asset/css/images/dateNext.png" onclick="getDateClick('next')" /></li>
                    	</ul>
	                </div>
	            </div>
        	</div>
        	
        	<div class="dateBoxMainDate" style="overflow:auto">
	        	 <table id="dateTable" class="" width="100%" height="100%" >
	                <thead>
	                    <tr>
	                    <th> 日</th>
	                    <th> 一</th>
	                    <th> 二</th>
	                    <th> 三</th>
	                    <th> 四 </th>
	                    <th> 五</th>
	                    <th> 六</th>
	                    </tr>
	                </thead>
	                <tbody id="dateBody"> 
	                </tbody> 
	            </table> 
        	</div>
    	</div>
	</div>
	 
 	<div id="dutyDetailsForDaywindow" title="警务报备情况" class="easyui-window" data-options="iconCls:'icon-edit',modal:true" closed="true" 
	 	collapsible="false" minimizable="false" maximizable="false" resizable="false" shadow="false" 
			style="width:654px; height:450px; padding: 10px;">
			<div id="tgddutydetailsforday" >
			</div>
	</div>
  </body>
</html>
