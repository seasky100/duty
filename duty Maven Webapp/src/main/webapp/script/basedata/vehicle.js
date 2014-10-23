var m_Vehicle_OrgId;
var m_Vehicle_OrgCode;
var m_Vehicle_OrgPath;
var m_Vehicle_Query = {};

$(function() {

	var args = getUrlArgs();
	m_Vehicle_OrgId = 2; // args["orgId"];
	m_Vehicle_OrgCode = '510106992500';// args["orgCode"];
	m_Vehicle_OrgPath = '/510106000000';// args["orgPath"];
	pack_Vehicle_Query();

	$("#orgtree").tree({
	// url: '/TreeData/GetFunTree'
	});

	$('#dtVehicle').datagrid({
		url : "vehicle/getVehicleList.do",
		queryParams : {
			'vehicle_Query' : JSON.stringify(m_Vehicle_Query)
		},
		pagination : true,
		fitColumns : true,
		pageNumber : 1,
		pageSize : 10,
		// title:"s",
		// singleSelect: true,
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			title : 'Id',
			field : 'Id',
			align : 'center',
			width : 10,
			hidden : true
		}, {
			title : '机构',
			field : 'orgName',
			align : 'center',
			width : 100
		}, {
			title : '车辆类型',
			field : 'typeName',
			align : 'center',
			width : 100
		}, {
			title : '车牌号码',
			field : 'number',
			align : 'center',
			width : 100
		}, {
			title : '车辆用途',
			field : 'purpose',
			align : 'center',
			width : 100
		}, {
			title : '车辆品牌',
			field : 'brand',
			align : 'center',
			width : 150
		}, {
			title : '座位数',
			field : 'siteQty',
			align : 'center',
			width : 150
		}, {
			title : 'GPS设备ID',
			field : 'gpsId',
			align : 'center',
			width : 80
		}, {
			title : 'GPS名称',
			field : 'gpsName',
			align : 'center',
			width : 80
		}, {
			title : '组呼号',
			field : 'intercomGroup',
			align : 'center',
			width : 200
		} ] ]
	});
	$("#btnSearchVehicle").bind("click", function() {
		$('#my-search-box').toggle();
	});
	InitData();
});

function btnSearchAction() {
	pack_Vehicle_Query();
	$('#dtVehicle').datagrid("reload", {
		'vehicle_Query' : JSON.stringify(m_Vehicle_Query)
	});
	$("#isSubOrg").val(0);
	$("#txtsearchnumber").val("");
};
function InitData() { 
	getVehicleType();
	getGroupNumber();
	getGpsID(m_Vehicle_OrgId); 
};

function getVehicleType(){
	getBaseData("vehicle/getVehicleType.do","车辆类型","txttype"); 
};
function getGroupNumber(){
	getBaseData( "vehicle/getintercomGroup.do","对讲机组呼号","txtgroupno");   
};
function getGpsID(orgId){
	getBaseData( "police/getGpsId.do?orgId="+orgId,"GPS_ID","txtgpsid");   
}
function btnAddVehicle() {
	clearForm();
	$('#myModal').modal('show');
};
function btnEditVehicle() {
	var hasRows = $('#dtVehicle').datagrid('getRows');
	if (hasRows.length == 0) {
		$.messager.alert('操作提示', "没有可操作数据", "warning");
		return;
	}
	var rows = $("#dtVehicle").datagrid("getChecked");
	if (!rows || rows.length == 0) {
		$.messager.alert('操作提示', "请选择操作项!", "warning");
		return;
	}
	if (rows.length > 1) {
		$.messager.alert('操作提示', "只能选择单个操作项!", "warning");
		return;
	}
	clearForm();
	$("#vehicleId").val(rows[0].id);
	$("#txtbrand").val(rows[0].brand);
	$("#txttype").val(rows[0].vehicleTypeId);
	$("#txtsiteqty").val(rows[0].siteQty);
	$("#txtnumber").val(rows[0].number);
	$("#txtpurpose").val(rows[0].purpose);
	$("#txtgroupno").val(rows[0].intercomGroup);
	$("#txtpersonalno").val(rows[0].intercomGroup);
	$("#txtgpsid").val(rows[0].gpsId);
	$("#txtgpsname").val(rows[0].gpsName);
	$('#myModal').modal('show');
};
function clearForm() {
	$("#vehicleId").val(0);
	$("#txtbrand").val("");
	$("#txttype").val(0);
	$("#txtsiteqty").val("");
	$("#txtnumber").val("");
	$("#txtpurpose").val("");
	$("#txtgroupno").val(0);
	$("#txtpersonalno").val("");
	$("#txtgpsid").val(0);
	$("#txtgpsname").val("");
}
function pack_Vehicle_Query() {
	m_Vehicle_Query.orgId = m_Vehicle_OrgId;
	m_Vehicle_Query.orgCode = m_Vehicle_OrgCode;
	m_Vehicle_Query.orgPath = m_Vehicle_OrgPath;
	m_Vehicle_Query.isSubOrg = $("#isSubOrg").val();
	m_Vehicle_Query.number = $("#txtsearchnumber").val();
};

function btnDelVehicle() {
	var hasRows = $('#dtVehicle').datagrid('getRows');
	if (hasRows.length == 0) {
		$.messager.alert('操作提示', "没有可操作数据", "warning");
		return;
	}
	var rows = $("#dtVehicle").datagrid("getChecked");
	if (!rows || rows.length == 0) {
		$.messager.alert('操作提示', "请选择操作项!", "warning");
		return;
	}
	if (rows.length > 1) {
		$.messager.alert('操作提示', "只能选择单个操作项!", "warning");
		return;
	}
	var number = rows[0].number;
	var id = rows[0].id;
	$.messager.confirm("系统提示", "确认删除车牌号为    " + number + " 的数据信息吗？",
			function(r) {
				if (r) {
					deleteVehicle(id);
				}
			});
};
function deleteVehicle(id) {
	$.ajax({
		url : "vehicle/deleteVehicle.do",
		type : "POST",
		dataType : "json",
		async : false,
		data : {
			"id" : id
		},
		success : function(req) {
			$.messager.alert("消息提示", req.Message, "info");
			btnSearchAction();
		},
		failer : function(a, b) {
			$.messager.alert("消息提示", a, "info");
		},
		error : function(a) {
			$.messager.alert("消息提示", a, "error");
		}
	});
};
function saveVehicleAction() {
	var vehicle = {};

	vehicle.id = $("#vehicleId").val();

	if ($("#txttype").val() > 0) {
		vehicle.vehicleTypeId = $("#txttype").val();
	} else {
		$.messager.alert("错误提示", "请选择车辆类型", "error");
		return;
	}
	if ($("#txtbrand").val() == "") {
		$.messager.alert("错误提示", "请输入车辆品牌", "error");
		return;
	}
	vehicle.brand = $("#txtbrand").val();
	if ($("#txtsiteqty").val() == "") {
		$.messager.alert("错误提示", "请输入车辆座位数", "error");
		return;
	}
	vehicle.siteQty = $("#txtsiteqty").val();
	vehicle.orgId = m_Vehicle_OrgId;
	if ($("#txtnumber").val() == "") {
		$.messager.alert("错误提示", "请输入车牌号码", "error");
		return;
	}
	vehicle.number = $("#txtnumber").val();
	if ($("#txtpurpose").val() == "") {
		$.messager.alert("错误提示", "请输入车辆用途", "error");
		return;
	}
	vehicle.purpose = $("#txtpurpose").val();
	if ($("#txtgroupno").val() == "") {
		$.messager.alert("错误提示", "请输入组呼号", "error");
		return;
	}
	vehicle.intercomGroup = $("#txtgroupno").val();
	if ($("#txtgpsid").val() > 0) {
		vehicle.gpsId = $("#txtgpsid").val();
	} else {
		$.messager.alert("错误提示", "请选择GPS_ID", "error");
		return;
	}
	if ($("#txtgpsname").val() == "") {
		$.messager.alert("错误提示", "请输入GPS名称", "error");
		return;
	}
	vehicle.gpsName = $("#txtgpsname").val();
	$.ajax({
		url : "vehicle/saveVehicle.do",
		type : "POST",
		dataType : "json",
		async : false,
		data : vehicle,
		success : function(req) {
			$.messager.alert("消息提示", req.Message, "info");
			$('#myModal').modal('hide');
			btnSearchAction();
		},
		failer : function(a, b) {
			$.messager.alert("消息提示", a, "info");
		},
		error : function(a) {
			$.messager.alert("消息提示", a, "error");
		}
	});
};