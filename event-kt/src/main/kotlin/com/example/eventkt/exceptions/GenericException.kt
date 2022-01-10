package com.example.eventkt.exceptions

import java.lang.Exception

class GenericException(override val message: String, val status: Int) : Exception(message)