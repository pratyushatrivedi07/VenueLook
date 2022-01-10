package com.example.auth.controller

import com.example.auth.dto.*
import com.example.auth.feignServices.MailFeignClient
import com.example.auth.models.User
import com.example.auth.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Autowired
import javax.servlet.http.HttpServletRequest

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("api")
class AuthController(private val userService: UserService) {

    @Autowired
    private lateinit var mailFeignClient: MailFeignClient


    @PostMapping("/register")
    fun register(@RequestBody body: RegisterDTO): ResponseEntity<User> {
        val user = User()
        user.name = body.name
        user.email = body.email
        user.password = body.password

       // return ResponseEntity.ok(this.userService.save(user))
        val registerMail = RegistrationMailDTO()
        registerMail.mailID = body.email
        registerMail.subject = "Registration Successful!"
        registerMail.message = "Thank you for creating an account with us ${user.name}"
        sendmail(registerMail)

        return ResponseEntity.ok(userService.save(user))

    }

    fun sendmail(@RequestBody registerMail: RegistrationMailDTO): String {
        ResponseEntity.ok(mailFeignClient.sendmail(registerMail))
        return "Registration Successful"
    }


    @PostMapping("/login")
    fun login(@RequestBody body: LoginDTO, response: HttpServletResponse): ResponseEntity<Any> {
        val user = this.userService.findByEmail(body.email)
            ?: return ResponseEntity.badRequest().body(Message("User Not Found!!"))
        if(!user.comparePassword(body.password)){
            return ResponseEntity.badRequest().body(Message("Invalid Password!!"))
        }

        val issuer = user.id.toString()
        val jwt = Jwts.builder().setIssuer(issuer)
            .setExpiration(Date(System.currentTimeMillis() + 60*60*10000)) //10hr
            .signWith(SignatureAlgorithm.HS512, "secret").compact()

        val cookie = Cookie("jwt", jwt)
        cookie.isHttpOnly = true
        response.addCookie(cookie)
        response.addHeader("jwt", jwt)
        return ResponseEntity.ok(Message(jwt))
    }

    @GetMapping("/user")
    fun user(request: HttpServletRequest): ResponseEntity<Any> {
        var jwt = request.getHeader("jwt")

        try {
            if (jwt == null) {
                return ResponseEntity.status(401).body(Message("Unauthenticated"))
            }

            val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body

            return ResponseEntity.ok(this.userService.getById(body.issuer.toInt()))

        } catch (e: Exception) {
            return ResponseEntity.status(401).body(Message("Unauthenticated"))
        }
    }

    @PostMapping("/logout")
    fun logout(response: HttpServletResponse): ResponseEntity<Any> {
        val cookie = Cookie("jwt", "")
        cookie.maxAge = 0

        response.addCookie(cookie)

        return ResponseEntity.ok(Message("Logged Out"))

    }

}