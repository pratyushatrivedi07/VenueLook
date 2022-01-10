package com.example.eventkt.config

import com.example.eventkt.dto.ErrorDto
import com.example.eventkt.exceptions.VenueNotFoundException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import java.lang.Exception
import java.util.*

@ControllerAdvice
class GenericExceptionHandler : ResponseEntityExceptionHandler() {

    @ExceptionHandler(value = [VenueNotFoundException::class])
    fun eventNotFoundException(ex: VenueNotFoundException, request: WebRequest?): ResponseEntity<Any> {
        var errorDesc: String = ex.getLocalizedMessage()
        if (errorDesc == null) errorDesc = ex.toString()
        val errorDTO = ErrorDto(errorDesc, Date())
        return ResponseEntity<Any>(errorDTO, HttpHeaders(), HttpStatus.NOT_FOUND)
    }

    @ExceptionHandler(Exception::class)
    fun globalExcpetionHandler(ex: Exception, request: WebRequest?): ResponseEntity<*> {
        var errorDesc = ex.localizedMessage
        if (errorDesc == null) errorDesc = ex.toString()
        val errorDTO = ErrorDto(errorDesc, Date())
        return ResponseEntity<Any>(errorDTO, HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR)
    }
}