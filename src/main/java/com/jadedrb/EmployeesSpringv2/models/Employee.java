package com.jadedrb.EmployeesSpringv2.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="employees")
public class Employee {
	
	@Id
	@GeneratedValue
	@Column (name = "id")
	private Long id;
	
	@Column (name = "first_name")
	private String  firstName;
	
	
	@Column (name = "last_name")
	private String  lastName;
	
	@Column (name = "job_title")
	private String  jobTitle;
	
	@Column (name = "email")
	private String  email;
	
	@Column (name = "companyName")
	private String companyName;
	
	public Employee() {}
	
	public Employee(Long id,String firstName, String lastName, String email, String companyName) {
		
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.companyName = companyName;
	}
	
	public String getCompanyName() {
		return companyName;
	}
	
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	
	public String getJobTitle() {
		return jobTitle;
	}
	
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
}
