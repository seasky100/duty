package com.tianyi.drs.basedata.service;

import java.util.List;
import java.util.Map;

import com.tianyi.drs.basedata.model.IntercomGroup;
import com.tianyi.drs.basedata.model.Police;
import com.tianyi.drs.basedata.model.PoliceType;
import com.tianyi.drs.basedata.viewmodel.GpsBaseVM;
import com.tianyi.drs.basedata.viewmodel.PoliceVM;
import com.tianyi.util.PaginationData;

public interface PoliceService {

    int deleteByPrimaryKey(Integer id);

    int insert(Police record);

    int insertSelective(Police record);

    Police selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Police record);

    int updateByPrimaryKey(Police record);

    Police findBycode(String code);
    
    Police findByname(String name);
    
     List<Police> selectAll();
    
     int updatePolice(Police policeman);
  
	 Police login(Map<String, Object> params);

	int findCount(PoliceVM query);

	List<PoliceVM> findPageList(PoliceVM query, PaginationData page);

	int loadVMCount(Map<String, Object> map);

	List<PoliceVM> loadVMList(Map<String, Object> map);

	List<PoliceType> selectPoliceType();

	List<IntercomGroup> selectIntercomGroup();

	List<GpsBaseVM> selectGpsId(int orgId);

	List<PoliceVM> loadVMListWithGroup(Map<String, Object> map);

	Police findByidCard(String param);

	List<PoliceVM> loadVMListWithGroupList(Map<String, Object> map);
}
