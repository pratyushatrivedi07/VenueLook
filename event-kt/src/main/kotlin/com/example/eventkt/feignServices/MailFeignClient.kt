package com.example.eventkt.feignServices

import com.example.eventkt.dto.EmailDto
import com.example.eventkt.dto.MessageDto
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody

//@FeignClient(value = "mailService", url = "http://mail-env.eba-phn6heub.ap-south-1.elasticbeanstalk.com/mail")  ----AWS EBS LINK for Mail Service
@FeignClient(value = "mailService", url ="http://localhost:8082/mail")
    interface MailFeignClient {
    @PostMapping("/sent")
    fun sendmail(@RequestBody messageDto: EmailDto): ResponseEntity<MessageDto>
}