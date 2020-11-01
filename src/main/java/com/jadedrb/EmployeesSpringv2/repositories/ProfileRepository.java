package com.jadedrb.EmployeesSpringv2.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jadedrb.EmployeesSpringv2.models.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

}
