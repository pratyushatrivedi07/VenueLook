package com.axis.mailService.dto

class AttachmentDTO
{
    var mailID : String? = null
    var subject : String? = null
    var message : String? = null
    var fileUrl : String? =null


    constructor(mailID: String?, subject: String?, message: String?,fileUrl: String?) {
        this.mailID = mailID
        this.subject = subject
        this.message = message
        this.fileUrl = fileUrl
    }

    constructor()
}