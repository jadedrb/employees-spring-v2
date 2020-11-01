package com.jadedrb.EmployeesSpringv2.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="profiles")
public class Profile {
	
	@Id
	@GeneratedValue
	@Column (name = "id")
	private Long id;
	
	@Column (name = "picture")
	private String  picture;
	
	
	@Column (name = "description")
	private String  description;
	
	@Column (name = "employee")
	private String employee;

	
	public Profile() { }


	public Profile(Long id, String picture, String description, String employee) {
		super();
		this.id = id;
		this.picture = picture;
		this.description = description;
		this.employee = employee;
	}
	
	public String getEmployee() {
		return employee;
	}


	public void setEmployee(String employee) {
		this.employee = employee;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getPicture() {
		return picture;
	}


	public void setPicture(String picture) {
		this.picture = picture;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}

	
	
}
