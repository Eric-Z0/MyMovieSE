package com.luv2code.springboot.MyMovieSESpring;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luv2code.springboot.MyMovieSESpring.controllers.AuthController;
import com.luv2code.springboot.MyMovieSESpring.models.ERole;
import com.luv2code.springboot.MyMovieSESpring.models.Role;
import com.luv2code.springboot.MyMovieSESpring.models.User;
import com.luv2code.springboot.MyMovieSESpring.payload.request.LoginRequest;
import com.luv2code.springboot.MyMovieSESpring.payload.request.SignupRequest;
import com.luv2code.springboot.MyMovieSESpring.repository.RoleRepository;
import com.luv2code.springboot.MyMovieSESpring.repository.UserRepository;
import com.luv2code.springboot.MyMovieSESpring.security.jwt.JwtUtils;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = AuthController.class)
public class AuthControllerTest {
	
	@Autowired
	MockMvc mockMvc;
	
	@MockBean
	UserRepository userRepository;
	
	@MockBean
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	JwtUtils jwtUtils;
	
	SignupRequest signupReq;
	LoginRequest loginReq;
	User userAlex;
	
	ObjectMapper mapper;
	String signinRequestUrl = "/api/auth/signin";
	String signupRequestUrl = "/api/auth/signup";
	
	@Before
	public void setup() 
	{
		mapper = new ObjectMapper();
		signupReq = new SignupRequest();
		signupReq.setUsername("Alex");
		signupReq.setEmail("Alex@gmail.com");
		signupReq.setPassword("123456");
		
		loginReq = new LoginRequest();
		loginReq.setUsername("Alex");
		loginReq.setPassword("123456");
		
		userAlex = new User();
		userAlex.setId(1L);
		userAlex.setUsername("Alex");
		userAlex.setEmail("Alex@gmail.com");
		userAlex.setPassword(encoder.encode("123456"));
	}
	
	@After
	public void tearDown() {}
	
	@Test
	public void testAuthenticateUser() 
	{
		
		// [Given]
		// Mockito is the most popular mocking framework in Java. It is used where a unit test does not connect to a database
		Role userRole = new Role(ERole.ROLE_USER);
		Mockito.when(roleRepository.findByName(ERole.ROLE_USER)).thenReturn(Optional.of(userRole));
		
		Set<Role> roles = new HashSet<>();
		roles.add(userRole);
		userAlex.setRoles(roles);	
		Mockito.when(userRepository.save(userAlex)).thenReturn(userAlex);
		
		String signupReqJsonStr = null;
		
		try {
			signupReqJsonStr = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(signupReq);
		} catch (JsonProcessingException e1) {
			e1.printStackTrace();
		}
		
		// [When]
		try {
			mockMvc.perform(MockMvcRequestBuilders.post(signupRequestUrl).contentType(MediaType.APPLICATION_JSON).content(signupReqJsonStr))
			.andDo(MockMvcResultHandlers.print())
			.andExpect(MockMvcResultMatchers.status().isOk())
			.andExpect(MockMvcResultMatchers.content().string("{\"message\":\"User registered successfully!\"}"));
		} catch (Exception e) {
			e.printStackTrace();
		}
			
		// [Then]
		//Mockito.verify(roleRepository).findByName(ERole.ROLE_USER);
		//Mockito.verify(userRepository).save(userAlex);
		
	}
	
	//@Test
	public void testRegisterUser() 
	{
		// Since the authentication process involves a set of Spring Security beans, it seems almost
		// impossible to write a test for this register case at this moment.
	}
	
	
}

