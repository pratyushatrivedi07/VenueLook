package com.example.auth.feignServices

import com.example.auth.dto.MessageDTO
import com.example.auth.dto.RegistrationMailDTO
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody

//@FeignClient(value = "mailService", url = "http://mail-env.eba-phn6heub.ap-south-1.elasticbeanstalk.com/mail") ----AWS EBS LINK for Mail Service
@FeignClient(value = "mailService", url ="http://localhost:8082/mail")
    interface MailFeignClient {
    @PostMapping("/sent")
    fun sendmail(@RequestBody messageDto: RegistrationMailDTO): ResponseEntity<MessageDTO>
}