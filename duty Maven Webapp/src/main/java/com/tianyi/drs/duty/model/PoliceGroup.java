package com.tianyi.drs.duty.model;

public class PoliceGroup {
    private Integer id;

    private Integer orgId;

    private String name;

    private Boolean isShare;

    private Boolean syncState;

    private Integer platformId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrgId() {
        return orgId;
    }

    public void setOrgId(Integer orgId) {
        this.orgId = orgId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getIsShare() {
        return isShare;
    }

    public void setIsShare(Boolean isShare) {
        this.isShare = isShare;
    }

    public Boolean getSyncState() {
        return syncState;
    }

    public void setSyncState(Boolean syncState) {
        this.syncState = syncState;
    }

    public Integer getPlatformId() {
        return platformId;
    }

    public void setPlatformId(Integer platformId) {
        this.platformId = platformId;
    }
}