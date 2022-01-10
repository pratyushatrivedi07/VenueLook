package com.axis.mailService.service


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.FileSystemResource
import org.springframework.mail.MailException
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.mail.javamail.MimeMessagePreparator
import org.springframework.stereotype.Service
import java.io.File
import javax.mail.MessagingException
import javax.mail.internet.MimeMessage


@Service
class EmailSenderService {
    @Autowired
    private val mailSender: JavaMailSender? = null

    fun sendSimpleEmail(
        toEmail: String?,
        body: String?,
        subject: String?,
    ) {
        val message = SimpleMailMessage()
        message.setFrom("homaster4595@gmail.com")
        message.setTo(toEmail)
        message.setText(body!!)
        message.setSubject(subject!!)
        mailSender!!.send(message)
        println("Mail Send...")
    }

    @Throws(MessagingException::class)
    fun sendEmailWithAttachment(
        toEmail: String?,
        body: String?,
        subject: String?,
        attachment: String?,
    ) {
        val mimeMessage = mailSender!!.createMimeMessage()
        val mimeMessageHelper = MimeMessageHelper(mimeMessage, true)
        mimeMessageHelper.setFrom("spring.email.from@gmail.com")
        mimeMessageHelper.setTo(toEmail!!)
        mimeMessageHelper.setText(body!!)
        mimeMessageHelper.setSubject(subject!!)
        val fileSystem = FileSystemResource(File(attachment))
        mimeMessageHelper.addAttachment(
            fileSystem.filename,
            fileSystem
        )
        mailSender.send(mimeMessage)
        println("Mail Send...")
    }
}
