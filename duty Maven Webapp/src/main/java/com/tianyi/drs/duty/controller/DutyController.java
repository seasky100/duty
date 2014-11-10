package com.tianyi.drs.duty.controller;
 
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONObject; 
import net.sf.json.util.JSONUtils;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.tianyi.drs.duty.model.Duty;
import com.tianyi.drs.duty.model.Org;
import com.tianyi.drs.duty.service.DutyService; 
import com.tianyi.drs.duty.service.DutyTaskService;
import com.tianyi.drs.duty.viewmodel.DutyItemVM; 
import com.tianyi.drs.duty.viewmodel.DutyVM;
import com.tianyi.drs.duty.viewmodel.ListResult;
import com.tianyi.drs.duty.viewmodel.ObjResult;
import com.tianyi.drs.duty.viewmodel.TaskTargetVM;

@Scope("prototype")
@Controller
@RequestMapping("/duty")
public class DutyController {
	@Resource(name = "dutyService")
	protected DutyService dutyService;
	
	@Resource(name = "dutyTaskService")
	protected DutyTaskService dutyTaskService;
	
	@RequestMapping(value = "load.do")
	public @ResponseBody String load(
			@RequestParam(value = "orgId", required = false) Integer orgId,
			@RequestParam(value = "ymd", required = false) Integer ymd,
			HttpServletRequest request
			){
		
		
		
		return null;
	}
	
	@RequestMapping(value = "loadDutyByOrgIdAndYMD.do")
	public @ResponseBody String loadDutyByOrgIdAndYMD(
			@RequestParam(value = "orgId", required = false) Integer orgId,
			@RequestParam(value = "ymd", required = false) Integer ymd,
			@RequestParam(value = "id", required = false) Integer id,
			HttpServletRequest request
			){
		DutyVM dvm=null;
		
		if(id==null){
			dvm=dutyService.loadVMByOrgIdAndYmd(orgId, ymd);
		}else{
			dvm=dutyService.loadById(id);
		}
		
		ObjResult<DutyVM> rs=new ObjResult<DutyVM>(true,null,dvm==null?0:dvm.getId(),dvm);
		
		String s=rs.toJson();
		
		return s;
	}
	
	@RequestMapping(value = "save.do")
	public @ResponseBody String save(
			@RequestParam(value = "duty", required = false) String dvm,
			HttpServletRequest request
			){
		
		JSONObject jobj=JSONObject.fromObject(dvm);

//		jobj.remove("beginTime");
//		jobj.remove("endTime2");
		
		JSONUtils.getMorpherRegistry().registerMorpher(  new DateMorpher(new String[] { "yyyy-MM-dd HH:mm" }));
		
		Map<String, Class<?>> classMap = new HashMap<String, Class<?>>();

		classMap.put("items", DutyItemVM.class);
		classMap.put("children", DutyItemVM.class);
		
		DutyVM d=(DutyVM)JSONObject.toBean(jobj, DutyVM.class,classMap);
		d.getItems().get(0).getChildren().get(0).getBeginTime();
		dutyService.save(d);
		
		ObjResult<DutyVM> rs=new ObjResult<DutyVM>(true,null,d.getId(),null);//暂时不
		
		return rs.toJson();
	}
	
	@RequestMapping(value = "loadTemplateByOrgId.do")
	public @ResponseBody String loadTemplateByOrgId(
			@RequestParam(value = "orgId", required = false) Integer orgId,
			HttpServletRequest request
			){
		
		List<Duty> dvms=dutyService.loadTemplatesWithOutItem(orgId);
		
		ListResult<Duty> rs=new ListResult<Duty>(dvms.size(),dvms,true);
		
		return rs.toJson();
	}
	@RequestMapping(value = "loadTaskTargetByOrg.do")
	public @ResponseBody String loadTaskTargetByOrg(
			@RequestParam(value = "orgId", required = false) Integer orgId,
			@RequestParam(value = "orgCode", required = false) String orgCode,
			@RequestParam(value = "taskType", required = false) Integer taskType,
			HttpServletRequest request
			){
		
		Org org=new Org();
		
		org.setId(orgId);
		org.setCode(orgCode);
		
		List<TaskTargetVM> ls=dutyTaskService.loadTaskTargetVMList(taskType, org);
		
		ListResult<TaskTargetVM> rs=new ListResult<TaskTargetVM>(ls.size(),ls,true);
		
		return rs.toJson();
	}
}
