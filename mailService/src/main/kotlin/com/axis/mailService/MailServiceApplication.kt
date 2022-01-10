package com.axis.mailService

import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.EnableEurekaClient
import org.springframework.cloud.openfeign.EnableFeignClients
import org.springframework.context.annotation.Configuration

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
@Configuration
@EnableAutoConfiguration
class MailServiceApplication

fun main(args: Array<String>) {
	runApplication<MailServiceApplication>(*args)
}
