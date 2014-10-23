
/*
 * 警员组
 * 
 */
var m_policeGroup_Org = {};

var m_policeGroup_Query = {};

$(function() {

	var args = getUrlArgs();
	m_policeGroup_Org.id = args["orgId"];
	m_policeGroup_Org.code = args["orgCode"];
	m_policeGroup_Org.path = args["orgPath"];

	pack_policeGroup_Query();
	$('#dtPoliceGroup').datagrid({
		url : 'policeGroup/list.do',
		queryParams : {
			'policeGroup_Query' : JSON.stringify(m_policeGroup_Query)
		},
		pagination : true,
		singleSelect : true,
		idField : 'id',
		resizable : true,
		fitColumns : true,
		width : 'auto',
		columns : [ [ {
			title : 'Id',
			field : 'id',
			align : 'left',
			width : 10,
			hidden : true
		}, {
			title : '组名称',
			field : 'name',
			align : 'left',
			width : 150
		}, {
			title : '共享类型',
			field : 'shareTypeDesc',
			align : 'left',
			width : 200
		} ] ]
	});

	$('#dtGroupMember').datagrid({
		pagination : true,
		pageNumber : 1,
		pageSize : 10,
		columns : [ [ {
			title : 'Id',
			field : 'Id',
			align : 'left',
			width : 10,
			hidden : true
		}, {
			title : '组名称',
			field : 'name',
			align : 'left',
			width : 100
		}, {
			title : '共享类型',
			field : 'shareTypeDesc',
			align : 'left',
			width : 100
		}

		] ]
	});

	$('#treeOrg').tree(
			{
				url : "org/list.do?orgCode=" + m_policeGroup_Org.code
						+ "&orgPath=" + m_policeGroup_Org.path,
				checkbox : true,
				cascadeCheck : false,
				loadFilter : function(data) {
					return buildOrgTree(data);
				}
			});

	$('#divPG').resize(function() {
		$('#dtPoliceGroup').datagrid("resize");
	});
});

function pack_policeGroup_Query() {
	m_policeGroup_Query.orgId = m_policeGroup_Org.id;
	m_policeGroup_Query.orgCode = m_policeGroup_Org.code;
	m_policeGroup_Query.orgPath = m_policeGroup_Org.path;
}

function showPoliceGroupDlg() {
	art.dialog({
		id : "dlgPoliceGroup",
		title : '警员组',
		content : document.getElementById("dlgPoliceGroup"),
		lock : true,
		initFn : function() {
		}
	});
}

function addPoliceGroup() {

	$('#txtPoliceGroupId').val(0);
	$('#txtPoliceGroupName').val('');
	$('#radioShare1').attr('checked', true);
	$('#divOrg').css('visibility', 'hidden');
	cleanShareOrgs();

	showPoliceGroupDlg();

}

function editPoliceGroup() {
	var row = $("#dtPoliceGroup").datagrid("getSelected");
	if (row !== null) {
		var id = row.id;
		loadPoliceGroup(id, displayPoliceGroup);

		showPoliceGroupDlg();
	}
}

function savePoliceGroup() {
	var pg = {};
	pg.shareOrgIds = [];

	pg.orgId = m_policeGroup_Org.id;
	pg.id = $('#txtPoliceGroupId').val();
	pg.name = $('#txtPoliceGroupName').val();
	pg.shareType = $('input:radio[name="shareType"]:checked').val();

	if(pg.shareType==1){/*判断是否选择共享到下级*/
		var nodes = $('#treeOrg').tree('getChecked');
		var count = nodes.length;
	
		for ( var i = 0; i < count; i++) {
			var n = nodes[i];
			pg.shareOrgIds.push(n.id);
		}
	}

	$.ajax({
		url : "policeGroup/savePoliceGroup.do",
		type : "POST",
		dataType : "json",
		data : {
			'policeGroup' : JSON.stringify(pg)
		},
		async : false,
		success : function(req) {
			if (req.isSuccess) {
				$('#dtPoliceGroup').datagrid('reload');
				$.messager.alert('提示', '保存成功!');

			} else {
				$.messager.alert('提示', req.msg, "warning");
			}
			$('#evidenceDiv').unmask();
		},
	});

}
/**
 * 删除警员组
 */
function delPoliceGroup() {
	var row = $("#dtPoliceGroup").datagrid("getSelected");
	if (row !== null) {
		$.messager.confirm('操作提示', "确定删除[ " + row.name + " ]?",
				function(r) {
					if (r) {
						$.ajax({
									url : "policeGroup/deletePoliceGroup.do",
									type : "POST",
									dataType : "json",
									data : {
										"policeGroupId" :row.id
									},
									async : false,
									success : function(req) {
										if (req.isSuccess) {
											$.messager.alert('提示', '删除成功!');
											$('#dtPoliceGroup').datagrid('reload');
										} else {
											$.messager.alert('提示', req.Data,"warning");
										}
									}
								});
					}
				});
	}
}

function closePoliceGroupDlg() {
	art.dialog.list['dlgPoliceGroup'].close();
}

function cleanShareOrgs() {
	var nodes = $('#treeOrg').tree('getChecked');

	var count = nodes.length;

	for ( var i = 0; i < count; i++) {
		var n = nodes[i];
		$('#treeOrg').tree('uncheck', n.target);
	}
}

function changeShareType() {

	var val = $('input:radio[name="shareType"]:checked').val();

	if (val == 0) {
		$('#divOrg').css('visibility', 'hidden');
	} else {
		$('#divOrg').css('visibility', 'visible');

	}
}

function loadPoliceGroup(id, callback) {
	$.ajax({
		url : "policeGroup/loadPoliceGroup.do",
		type : "POST",
		dataType : "json",
		data : {
			'policeGroupId' : id
		},
		async : false,
		success : function(req) {
			callback(req);
		}
	});
}
/**
 * 显示警员组信息
 * 
 * @param pg
 */
function displayPoliceGroup(pg) {
	$('#txtPoliceGroupId').val(pg.id);
	$('#txtPoliceGroupName').val(pg.name);

	if (pg.shareType == 0) {
		$('#radioShare1').attr('checked', true);
		$('#divOrg').css('visibility', 'hidden');
	} else {
		$('#radioShare2').attr('checked', true);
		$('#divOrg').css('visibility', 'visible');
	}
	cleanShareOrgs();
	var count = pg.shareOrgs.length;
	for ( var i = 0; i < count; i++) {
		var pgo = pg.shareOrgs[i];
		var node = $('#treeOrg').tree('find', pgo.orgId);
		$('#treeOrg').tree('check', node.target);
	}
}
