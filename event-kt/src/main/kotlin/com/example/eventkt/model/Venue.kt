package com.example.eventkt.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.Field
import java.io.Serializable
import java.util.*
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

@Document(collection = "event")
class Venue : Serializable {
    @Id
    var id: Long = 0
        get() = field
        set(value) { field = value }

    @Indexed(unique = true)
    var name: @NotBlank(message = "Venue Name cannot be blank") String? = null

    var description: @NotBlank(message = "Description cannot be blank") String? = null

    @Indexed(unique = true)
    var email: @NotBlank(message = "Email cannot be blank") @Email String? = null

    @NotNull
    var noOfGuests: Int? = null

    @Field(name = "Veg_Rate")
    @NotNull
    var veg: Int? = null

    @Field(name = "NonVeg_Rate")
    @NotNull
    var nonVeg: Int? = null

    @NotBlank(message = "Area cannot be Blank")
    var area: String? = null

    @NotBlank(message = "City cannot be Blank")
    var city: String? = null

    @Field(name = "websiteLink")
    @NotNull
    @NotBlank(message = "Website link cannot be Blank")
    var website: String? = null

    @NotBlank
    @Field(name = "phone")
    var number : String = ""



    constructor()


    constructor(
        id: Long, name: String?, description: String?,
        email: String?, noOfGuests: Int?, veg: Int?,
        nonVeg: Int?, area: String?, city: String?,
        website: String?
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.email = email
        this.noOfGuests = noOfGuests
        this.veg = veg
        this.nonVeg = nonVeg
        this.area = area
        this.city = city
        this.website = website
    }

    companion object {
        @Transient
        val SEQUENCE_NAME = "event_sequence"
    }
}