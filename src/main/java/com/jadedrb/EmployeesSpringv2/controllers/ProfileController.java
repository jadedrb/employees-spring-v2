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
import com.jadedrb.EmployeesSpringv2.models.Profile;
import com.jadedrb.EmployeesSpringv2.repositories.ProfileRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "/api")
public class ProfileController {

	@Autowired
	private ProfileRepository profileRepository;
	
	
	
	// GET : RETRIEVE ALL Profiles
	@GetMapping("/profiles")
	public List<Profile> getAllprofiles(Model model) {
		System.out.println("GET profiles (all)");
		return this.profileRepository.findAll();
	}
	
	
	
	// POST : CREATE NEW Profile
	@PostMapping("/profiles")
	public Profile createOrSaveExample(@Valid @RequestBody Profile newProfile) {
		System.out.println("POST profile");
		return this.profileRepository.save(newProfile);
	}
	
	
	
	// GET : RETRIEVE Profile BY ID
	@GetMapping("/profiles/{id}")
	public ResponseEntity<Profile> getProfileById(@PathVariable(value = "id") Long profileId) 
		throws ResourceNotFoundException {
		
			Profile profile = profileRepository.findById(profileId)
					.orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
			
			System.out.println("GET profile " + profileId);
			return ResponseEntity.ok().body(profile);
	}
	
	
	
	// PUT : UPDATE Profile DETAILS
	@PutMapping("/profiles/{id}")
	public ResponseEntity<Profile> updateProfile(@PathVariable(value = "id") Long profileId, 
			@Valid @RequestBody Profile profileDetails) throws ResourceNotFoundException {
		
		Profile profile = profileRepository.findById(profileId)
				.orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
		
		profile.setPicture(profileDetails.getPicture());
		profile.setDescription(profileDetails.getDescription());
		
		final Profile updatedProfile = profileRepository.save(profile);
		System.out.println("UPDATE profile " + profileId);
		return ResponseEntity.ok(updatedProfile);
	}

	
	
	// DELETE : DELETE Profile BY ID
	@DeleteMapping("/profiles/{id}")
	public Map<String, Boolean> deleteProfile(@PathVariable(value = "id") Long profileId)
		throws ResourceNotFoundException {
		
		Profile profile = profileRepository.findById(profileId)
				.orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
		
		profileRepository.delete(profile);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		System.out.println("DELETE profile " + profileId);
		return response;
	}
	
}

