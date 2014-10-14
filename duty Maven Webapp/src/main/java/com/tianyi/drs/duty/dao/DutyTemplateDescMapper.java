package com.tianyi.drs.duty.dao;

import com.tianyi.drs.duty.dao.core.MyBatisRepository;
import com.tianyi.drs.duty.model.DutyTemplateDesc;
@MyBatisRepository
public interface DutyTemplateDescMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DutyTemplateDesc record);

    int insertSelective(DutyTemplateDesc record);

    DutyTemplateDesc selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DutyTemplateDesc record);

    int updateByPrimaryKey(DutyTemplateDesc record);
}