package com.jadedrb.EmployeesSpringv2.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jadedrb.EmployeesSpringv2.exceptions.ResourceNotFoundException;
import com.jadedrb.EmployeesSpringv2.models.Company;
import com.jadedrb.EmployeesSpringv2.repositories.CompanyRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class CompanyController {

	@Autowired
	private CompanyRepository companyRepository;
	
	
	
	// GET : RETRIEVE ALL Companys
	@GetMapping("/companys")
	public List<Company> getAllcompanys(Model model) {
		System.out.println("GET companys (all)");
		return this.companyRepository.findAll();
	}
	
	
	
	// POST : CREATE NEW Company
	@PostMapping("/companys")
	public Company createOrSaveExample(@Valid @RequestBody Company newCompany) {
		System.out.println("POST company");
		return this.companyRepository.save(newCompany);
	}
	
	
	
	// GET : RETRIEVE Company BY ID
	@GetMapping("/companys/{id}")
	public ResponseEntity<Company> getCompanyById(@PathVariable(value = "id") Long companyId) 
		throws ResourceNotFoundException {
		
			Company company = companyRepository.findById(companyId)
					.orElseThrow(() -> new ResourceNotFoundException("Company not found"));
			
			System.out.println("GET company " + companyId);
			return ResponseEntity.ok().body(company);
	}
	
	
	
	// PUT : UPDATE Company DETAILS
	@PutMapping("/companys/{id}")
	public ResponseEntity<Company> updateCompany(@PathVariable(value = "id") Long companyId, 
			@Valid @RequestBody Company companyDetails) throws ResourceNotFoundException {
		
		Company company = companyRepository.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company not found"));
		
		company.setCompanyName(companyDetails.getCompanyName());
		company.setPassword(companyDetails.getPassword());
		
		final Company updatedCompany = companyRepository.save(company);
		System.out.println("UPDATE company " + companyId);
		return ResponseEntity.ok(updatedCompany);
	}

	
	
	// DELETE : DELETE Company BY ID
	@DeleteMapping("/companys/{id}")
	public Map<String, Boolean> deleteCompany(@PathVariable(value = "id") Long companyId)
		throws ResourceNotFoundException {
		
		Company company = companyRepository.findById(companyId)
				.orElseThrow(() -> new ResourceNotFoundException("Company not found"));
		
		companyRepository.delete(company);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		System.out.println("DELETE company " + companyId);
		return response;
	}
	
}

