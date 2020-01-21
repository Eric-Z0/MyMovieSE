package com.luv2code.springboot.MyMovieSESpring.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.luv2code.springboot.MyMovieSESpring.security.jwt.AuthEntryPointJwt;
import com.luv2code.springboot.MyMovieSESpring.security.jwt.AuthTokenFilter;
import com.luv2code.springboot.MyMovieSESpring.security.jwt.JwtUtils;
import com.luv2code.springboot.MyMovieSESpring.security.services.UserDetailsServiceImpl;

/*
 @EnableWebSecurity allows Spring to find and automatically apply the class to the global Web Security.
 */


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) // securedEnabled = true, jsr250Enabled = true
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	UserDetailsServiceImpl userDetailsService;

	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;
	
	
	//-------- An attempt to allow the unit test run---------
	@Bean
	public UserDetailsServiceImpl userDetailsService() {
	    return new UserDetailsServiceImpl();
	}
	//-------------------------------------------------------
	
	
	//-------- An attempt to allow the unit test run---------
	@Bean
	public AuthEntryPointJwt unauthorizedHandler() {
	    return new AuthEntryPointJwt();
	}
	//-------------------------------------------------------
	
	//-------- An attempt to allow the unit test run---------
	@Bean
	public JwtUtils jwtUtils() {
	    return new JwtUtils();
	}
	//-------------------------------------------------------
	

	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.authorizeRequests().antMatchers("/api/auth/**").permitAll()
			.antMatchers("/api/movie/**").permitAll()
			.antMatchers("/", "/**").permitAll()
			.anyRequest().authenticated();

		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}
}