package com.tianyi.drs.duty.dao;

import com.tianyi.drs.duty.model.VehicleType;
import com.tianyi.drs.duty.dao.core.MyBatisRepository;

@MyBatisRepository
public interface VehicleTypeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(VehicleType record);

    int insertSelective(VehicleType record);

    VehicleType selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(VehicleType record);

    int updateByPrimaryKey(VehicleType record);
}