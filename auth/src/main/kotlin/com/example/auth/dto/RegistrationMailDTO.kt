package com.example.auth.dto

class RegistrationMailDTO {

        var mailID : String? = null
        var subject : String? = null
        var message : String? = null


    constructor(mailID: String?, subject: String?, message: String?) {
        this.mailID = mailID
        this.subject = subject
        this.message = message
    }

    constructor(){}

}
