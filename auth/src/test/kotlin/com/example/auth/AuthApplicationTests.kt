package com.example.auth

import com.example.auth.models.User
import com.example.auth.repository.UserRepository
import com.example.auth.service.UserService
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class AuthApplicationTests {
	@Autowired
	var userRepository: UserRepository? = null
	@Autowired
	var userService: UserService? = null

	@Test
	fun contextLoads() {
	}

/*	@Test
	fun signUp() {
		val user = User()
		user.id = 1
		user.name = "test1"
		user.email = "test1@gmail.com"
		user.password = "test1"
		`when`(userRepository!!.save(user)).thenReturn(user)
		Assertions.assertEquals(user, userService!!.save(user))
	}

	@Test
	fun login() {
		val user = User()
		user.email = "test@gmail.com"
		`when`(userRepository!!.findByEmail("test1@gmail.com")).thenReturn(user)
		Assertions.assertEquals(user, userService!!.findByEmail("test1@gmail.com"))
	}*/
}
