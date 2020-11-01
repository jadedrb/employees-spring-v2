package com.jadedrb.EmployeesSpringv2.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="companies")
public class Company {
	
	@Id
	@GeneratedValue
	@Column (name = "id")
	private Long id;
	
	@Column (name = "company_name")
	private String  companyName;
	
	
	@Column (name = "password")
	private String  password;

	
	public Company() { }

	public Company(Long id, String companyName, String password) {
		super();
		this.id = id;
		this.companyName = companyName;
		this.password = password;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getCompanyName() {
		return companyName;
	}


	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}

	
	
	
}
