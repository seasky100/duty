var y;
var m;

$(function() {
	$("#dutyTemplateSelectwindow").window("close");
	var date = new Date();
	y = date.getFullYear();
	m = date.getMonth() + 1;
	$("#sp_years").text(y);
	$("#sp_month").text(m);
	changeDivHeight(); // 表格自动高度设置
	getDateData(y + "-" + m + "-" + 1);// 初始化默认月份数据
});
// 设置日历窗体的高度
function changeDivHeight() {
	var bodyHeight = document.body.clientHeight;
	var tableContentHeight = bodyHeight - 110;
	var tdHeight = parseInt(tableContentHeight / 6) - 3;
	var dateBoxMainDateTDBoxWidht = parseInt($("#dateTable").width() * 0.14 * 0.98);

	var trObj = $("table tbody tr");
	var tdObj = $("table tbody tr td");
	for ( var i = 0; i < tdObj.length; i++) {
		$(tdObj[i]).height(tdHeight);
		$(tdObj[i]).width(dateBoxMainDateTDBoxWidht);
	}

	var dateBoxMainDateTDBoxS = $(".dateBoxMainDateTDBox");
	// alert(dateBoxMainDateTDBoxS.length);
	for ( var i = 0; i < dateBoxMainDateTDBoxS.length; i++) {
		$(dateBoxMainDateTDBoxS[i]).width(dateBoxMainDateTDBoxWidht);
	}
}
// 点击日期上月下月事件
function getDateClick(action) {
	if (action == 'next') {
		m++;
		if (m > 12) {
			y++;
			m = 1;
		}

	} else {
		m--;
		if (m < 1) {
			m = 12;
			y--;
		}
	}
	var date = y + "-" + m + "-" + 1;
	$("#dateY").text(y);
	$("#dateM").text(m);

	getDateData(date);
}
// 根据日期，获取后台数据
function getDateData(date) {
	$.ajax({
		url : 'dutyCalendar/getCalender.do?date=' + date,
		type : "POST",
		dataType : "json",
		// async:false,
		success : function(req) {
			if (req) {
				setDateData(req);
			} else {
				alert("获取数据失败");
			}
		}
	});
}
// 初始化日期数据显示
function setDateData(result) {
	// 鏃ュ巻鏁版嵁缁勮鎴愭暟缁�
	var dateArray = new Array();
	// var json = eval("(" + result + ")");
	var json = result;
	for ( var i = 0; i < 6; i++) {// 鍒濆鍖�6琛�7鍒楃┖鏁版嵁浜岀淮鏁扮粍
		dateArray[i] = new Array();
		for ( var j = 0; j < 7; j++) {
			dateArray[i][j] = 0;
		}
	}
	var lineIndexOf = 0;// 鍒濆鍖栧綋鍓嶇粍瑁呰涓嬫爣
	for ( var i = 0; i < json.length; i++) {
		dateArray[lineIndexOf][parseInt(json[i]["week"])] = new Array();// 澹版槑lineIndexOf琛屼笅,week(浠ｈ〃鍛ㄥ嚑鐨勪笅鏍�)鍒椾笅鏄竴涓柊鏁扮粍
		var today = new Array();// 鍒涘缓涓�涓柊鏁扮粍锛屽苟瀹屾暣鏁版嵁閲嶇粍
		today['y'] = json[i]["y"];
		today['m'] = json[i]["m"];
		today['d'] = json[i]["d"];
		today['name'] = json[i]["name"];
		today['position'] = json[i]["position"];
		today['phone'] = json[i]["phone"];
		today['cornet'] = json[i]["cornet"];
		dateArray[lineIndexOf][parseInt(json[i]["week"])] = today;
		if (parseInt(json[i]["week"]) == 6) {// 鍒ゆ柇鏄惁璇ユ崲琛�,鑻ュ綋鍓嶄笅鏍囧埌鍒拌揪6鍗冲彲鎹㈣+1
			lineIndexOf++;

		}
	}
	creatHtml(dateArray);// 灏嗛噸缁勫悗鐨勬暟缁勪紶缁檋tml閲嶇粍鍔熻兘鍑芥暟锛屽苟鎻掑叆鍒癏TML涓�
	// p(dateArray);
}

function creatHtml(arr) {
	// 鏃ュ巻鏁版嵁HTML缁勮閮ㄥ垎
	var html = "";
	for ( var i = 0; i < 6; i++) {// 寰幆鏁扮粍锛岄噸缁刪tml
		var trHtml = "<tr >";
		for ( var j = 0; j < 7; j++) {

			var tdHtml = '';
			var isHaveData = arr[i][j]["d"] == null ? false : true;

			if (isHaveData == false) {

				tdHtml = '<td><div class="dateBoxMainDateTD"><div class="dateBoxMainDateTDLibOff"></div><div class="dateBoxMainDateTDBox"><ul><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li><li>&nbsp;</li></ul></div></div></td>';

				trHtml = trHtml + tdHtml;

				continue;
			}

			tdHtml = '<td ondbclick="onClickData("'
					+ y
					+ '-'
					+ m
					+ '-'
					+ arr[i][j]["d"]
					+ '")" onmouseover=getDateInfo("'
					+ y
					+ '-'
					+ m
					+ '-'
					+ arr[i][j]["d"]
					+ '")><div class="dateBoxMainDateTD"><div class="dateBoxMainDateTDLib">'
					+ arr[i][j]["d"]
					+ '</div><div class="dateBoxMainDateTDBox"><ul><li>值班领导'
					+ arr[i][j]["name"] + '</li><li>职务:'
					+ arr[i][j]["position"] + '</li><li>电话:'
					+ arr[i][j]["phone"] + '</li><li>公安短号'
					+ arr[i][j]["cornet"] + '</li></ul></div></div></td>';

			trHtml = trHtml + tdHtml;
		}
		html = html + trHtml + "</tr>";
	}
	$("#dateBody").empty();// 娓呯┖html
	$("#dateBody").append(html);// 鎻掑叆html
	changeDivHeight();// 鎻掑叆html琛ㄦ牸楂樺害涓嶆槸鑷姩閫傚簲鐨勶紝璋冪敤楂樺害璋冩暣鍑芥暟锛岃嚜閫傚簲楂樺害
}

// 点击具体日期，加载详细信息对话框
function getDateInfo(date) {
	$.ajax({
		url : 'dutyCalendar/getDutyInfoForDay.do?date=' + date, // 鍚庡彴澶勭悊绋嬪簭
		type : "POST",
		dataType : "json",
		// async:false,
		success : function(req) {
			if (req) {
				$('#dutyTemplateSelectwindow').attr("title", date + "警务报备情况");
				var html = "<ul onclick=\"onClickData('" + date
						+ "')\"><li>报备日期:" + date + "</li>"
						+"<li>值班领导:" + req.name + "</li><li>职务:"
						+ req.position + "</li><li>电话:" + req.phone
						+ "</li><li>公安短号:" + req.cornet + "</li></ul>";
				$("#dutyTemplateSelectwindow").empty();
				$("#dutyTemplateSelectwindow").append(html);
				$("#dutyTemplateSelectwindow").window("open"); 
			} else {
				alert("获取数据失败");
			}
		}
	});
}
var TimeFn=null;
function onClickData(date){
	$("#dutyTemplateSelectwindow").window("close"); 
	// 取消上次延时未执行的方法
    clearTimeout(TimeFn);
    //执行延时
    TimeFn = setTimeout(function(){
    	parent.onClickData(date);
    },100); 
};
function ondbClickData(date){// 取消上次延时未执行的方法 
	$("#dutyTemplateSelectwindow").window("close"); 
	parent.onClickData(date);
};