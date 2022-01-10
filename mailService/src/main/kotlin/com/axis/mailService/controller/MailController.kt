package com.axis.mailService.controller

import com.axis.mailService.dto.AttachmentDTO
import com.axis.mailService.dto.MessageDTO
import com.axis.mailService.service.EmailSenderService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/mail")
class MailController {
    @Autowired
    private lateinit var emailSenderService: EmailSenderService

    @PostMapping("/sent")
    fun sendMail(@RequestBody messageDto: MessageDTO): ResponseEntity<MessageDTO> {
        emailSenderService.sendSimpleEmail(messageDto.mailID, messageDto.message, messageDto.subject)
        return ResponseEntity.ok(messageDto)
    }

    @PostMapping("/sentFile")
    fun sendFiles(@RequestBody attachmentDTO: AttachmentDTO): ResponseEntity<AttachmentDTO>
    {
        emailSenderService.sendEmailWithAttachment(attachmentDTO.mailID, attachmentDTO.message, attachmentDTO.subject, attachmentDTO.fileUrl)
        return ResponseEntity.ok(attachmentDTO)
    }
}