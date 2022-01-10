package com.example.eventkt.dto

import java.util.*

class ErrorDto {
    var error: String? = null
    var date: Date? = null

    constructor() {}
    constructor(error: String?, date: Date?) {
        this.error = error
        this.date = date
    }
}