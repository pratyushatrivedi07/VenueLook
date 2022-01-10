package com.example.eventkt.service

import com.example.eventkt.feignServices.MailFeignClient
import com.example.eventkt.dto.EmailDto
import com.example.eventkt.model.Venue
import com.example.eventkt.repository.VenueRepository
import io.jsonwebtoken.Jwts
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestBody
import java.io.IOException
import java.util.*


@Service
class VenueServiceImpl {
    @Autowired
    private val sequenceGeneratorService: SequenceGeneratorService? = null

    @Autowired
    private val eventRepository: VenueRepository? = null

    @Autowired
    private lateinit var mailFeignClient: MailFeignClient



/*    @Throws(IOException::class)
    fun saveEvent(event: Venue) : Venue {
        event.id = sequenceGeneratorService!!.generateSequence(Venue.SEQUENCE_NAME)

        val email = EmailDto()
        email.mailID = event.email
        email.subject = "Venue Listed"
        email.message = "Hey ${event.name},\n\n" +
                        "Thank you for choosing VenueLook. \n" +
                        "Your venue is listed successfully.\n\n" +
                        "In case you face any issues, feel free to reply to this email.\n\n" +
                        "Thank you,\n" +
                        "Team VenueLook"
        sendmail(email)
        return eventRepository!!.save(event)

    }*/

    fun sendmail(@RequestBody eMail: EmailDto): String {
        ResponseEntity.ok(mailFeignClient.sendmail(eMail))
        return "Successfully listed the Venue"
    }


       @Throws(IOException::class)
       fun saveEvent(event: Venue, jwt: String): Venue {
           val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body
           event.id = body.issuer.toLong()
           /*event.id = sequenceGeneratorService!!.generateSequence(Venue.SEQUENCE_NAME)*/

           val email = EmailDto()
           email.mailID = event.email
           email.subject = "Venue Listed"
           email.message = "Hey ${event.name},\n\n" +
                   "Thank you for choosing VenueLook. \n" +
                   "Your venue is listed successfully.\n\n" +
                   "In case you face any issues, feel free to reply to this email.\n\n" +
                   "Thank you,\n" +
                   "Team VenueLook"
           sendmail(email)
        return eventRepository!!.save(event)
    }

    fun searchByCity(city: String?): List<Venue?>? {
        return eventRepository?.findByCity(city)
    }

    fun searchByArea(area: String?): List<Venue?>? {
        return eventRepository?.findByArea(area)
    }

    fun searchByName(name: String?): List<Venue?>? {
        return eventRepository?.findByName(name)
    }

    fun getById(jwt: String) : Optional<Venue?>? {
        val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body
        var id = body.issuer.toLong()
        return eventRepository?.findById(id)
    }

}