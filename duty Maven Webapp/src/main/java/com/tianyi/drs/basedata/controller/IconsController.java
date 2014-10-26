package com.tianyi.drs.basedata.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
 
import com.tianyi.drs.basedata.model.Icons; 
import com.tianyi.drs.basedata.service.IconsService; 
import com.tianyi.drs.duty.viewmodel.ListResult;

@Scope("prototype")
@Controller
@RequestMapping("/icons")
public class IconsController {
	@Resource(name = "iconsService")
	protected IconsService iconsService;
	

	@RequestMapping(value = "getIconsList.do", produces = "application/json;charset=UTF-8")
	public @ResponseBody
	String getIconsList(
			@RequestParam(value = "icons_Query", required = false) String query,
			@RequestParam(value = "page", required = false) Integer page,
			@RequestParam(value = "rows", required = false) Integer rows,
			HttpServletRequest request) throws Exception {
		try {
			JSONObject joQuery = JSONObject.fromObject(query);
			int orgId = Integer.parseInt(joQuery.getString("orgId"));
			int isSubOrg = Integer.parseInt(joQuery.getString("isSubOrg"));
			String name = joQuery.getString("name");  

			String orgCode = joQuery.getString("orgCode");
			String orgPath = joQuery.getString("orgPath");
			int typeid = Integer.parseInt(joQuery.getString("typeid"));

			List<Icons> list = new ArrayList<Icons>();
			Map<String, Object> map = new HashMap<String, Object>();

			map.put("pageStart", (page - 1) * rows);
			map.put("pageSize", rows);
			map.put("orgId", orgId);
			map.put("isSubOrg", isSubOrg);
			map.put("orgCode", orgCode);
			map.put("orgPath", orgPath);
			map.put("name", name);  
			map.put("typeid", typeid);  

			int total = iconsService.loadVMCount(map);
			list = iconsService.loadVMList(map);

			ListResult<Icons> rs = new ListResult<Icons>(total, list);

			String result = JSONObject.fromObject(rs).toString();

			return result;
		} catch (Exception ex) {
			return "{\"total\":0,\"rows\":[]}";
		}
	}

	@RequestMapping(value = "saveIcons.do", produces = "application/json;charset=UTF-8")
	public @ResponseBody
	String saveIcons(Icons icons) throws Exception {
		try {
			icons.setPlatformId(1);
			icons.setSyncState(true);
			int result = 0;
			if (icons.getId() > 0) {
				int pid = icons.getId();
				icons.setId(pid);
				result = iconsService.updateByPrimaryKey(icons);
			} else {
				result = iconsService.insert(icons);
			}
			return "{\"success\":true,\"Message\":\"保存成功,result is " + result
					+ "\"}";
		} catch (Exception ex) {
			return "{\"success\":false,\"Message\":\"保存失败，原因："
					+ ex.getMessage() + "\"}";
		}
	}
	

	@RequestMapping(value = "deleteIcons.do", produces = "application/json;charset=UTF-8")
	public @ResponseBody
	String deleteIcons(int id) throws Exception {
		try {
			int result =0;
			if(id>0){
				result = iconsService.deleteByPrimaryKey(id);
			}
			return "{\"success\":true,\"Message\":\"删除成功,result is " + result + "\"}";
		} catch (Exception ex) {
			return "{\"success\":false,\"Message\":\"删除失败，原因：" + ex.getMessage() + "\"}";
		}
	}
}
