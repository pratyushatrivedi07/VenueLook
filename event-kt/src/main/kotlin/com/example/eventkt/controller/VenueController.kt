package com.example.eventkt.controller

import org.springframework.beans.factory.annotation.Autowired
import com.example.eventkt.repository.VenueRepository
import com.example.eventkt.service.VenueServiceImpl
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
import kotlin.Throws
import com.example.eventkt.exceptions.VenueNotFoundException
import com.example.eventkt.model.Venue
import io.jsonwebtoken.Jwts
import org.springframework.web.bind.annotation.*
import java.io.IOException
import java.util.*
import javax.validation.Valid
import javax.servlet.http.HttpServletRequest

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/venues")
class VenueController(
    @Autowired
    private val venueRepository: VenueRepository,
    @Autowired
    private val venueService: VenueServiceImpl
) {

    @get:GetMapping
    val allVenues: ResponseEntity<Any?>
        get() = ResponseEntity<Any?>(venueRepository.findAll(), HttpStatus.OK)

    @GetMapping("/byId")
    @Throws(VenueNotFoundException::class)
    fun getVenueById(request: HttpServletRequest): Optional<Venue?>? {
        val jwt = request.getHeader("jwt")
         var result:Optional<Venue?>?
        if (jwt != null) {
            result = venueService.getById(jwt)
            return result
        }
            return null
    }

    @PostMapping("/newVenue")
    @Throws(IOException::class)
    fun addVenue(@RequestBody event: Venue?, request: HttpServletRequest): ResponseEntity<*> {

        val jwt = request.getHeader("jwt")

        if (jwt != null) {
            if (event != null) {
                if (venueRepository.existsVenueByNameEquals(event.name) && venueRepository.existsVenueByAreaEquals(event.area)
                    && venueRepository.existsVenueByCityEquals(event.city)
                ) {
                    return ResponseEntity.badRequest().body("Venue Already Exists")
                }
                val savedVenue = venueService.saveEvent(event, jwt)
                return ResponseEntity(savedVenue, HttpStatus.CREATED)
            } else {
                return ResponseEntity.badRequest().body("Some Problem Occured")
            }
        } else {
            return ResponseEntity.badRequest().body("Please Login...!")
        }
    }

    @DeleteMapping("/del-venue")
    @Throws(VenueNotFoundException::class)
    fun deleteVenue(request: HttpServletRequest): Map<String, Boolean> {
        val jwt = request.getHeader("jwt")

        if(jwt !=null){

            val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body
            var id = body.issuer.toLong()
            val event = venueRepository.findById(id)
                .orElseThrow { VenueNotFoundException("Venue not found for this id: $id") }!!
            venueRepository.delete(event)
            val response: MutableMap<String, Boolean> = HashMap()
            response["deleted"] = java.lang.Boolean.TRUE
            return response
        }
        else{
            val response: MutableMap<String, Boolean> = HashMap()
            response["deleted"] = java.lang.Boolean.FALSE
            return response
        }
    }


    @PutMapping("/up-venue")
    @Throws(VenueNotFoundException::class, IOException::class)
    fun updateVenue(@RequestBody eventData: @Valid Venue?, request: HttpServletRequest): ResponseEntity<*> {
        val jwt = request.getHeader("jwt")
        var updatedEvent: Venue
        if (jwt != null)
        {
            val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body
            var id = body.issuer.toLong()
            val event = venueRepository.findById(id)
            .orElseThrow { VenueNotFoundException("Venue not found for this id: $id") }!!
            if (eventData != null) {
                event.name = eventData.name
                event.description = eventData.description
                event.email = eventData.email
                event.noOfGuests = eventData.noOfGuests
                event.veg = eventData.veg
                event.nonVeg = eventData.nonVeg
                event.area = eventData.area
                event.city = eventData.city
                event.website = eventData.website
                event.number = eventData.number
                updatedEvent = venueRepository.save(event)
            }
            else{
                return ResponseEntity.badRequest().body("Some Problem Occured")
            }
        }
        else{
            return ResponseEntity.badRequest().body("Please Login...!")
        }
        return ResponseEntity.ok(updatedEvent)
    }


/*    @DeleteMapping("/{id}")
    @Throws(VenueNotFoundException::class)
    fun deleteVenue(@PathVariable("id") id: Long): Map<String, Boolean> {

            val event = venueRepository.findById(id)
                .orElseThrow { VenueNotFoundException("Venue not found for this id: $id") }!!
            venueRepository.delete(event)
            val response: MutableMap<String, Boolean> = HashMap()
            response["deleted"] = java.lang.Boolean.TRUE
            return response
        }

    @PutMapping("/{id}")
    @Throws(VenueNotFoundException::class, IOException::class)
    fun updateVenue(@PathVariable("id") id: Long,
                    @RequestBody eventData: @Valid Venue?): ResponseEntity<Venue> {
        val event = venueRepository.findById(id)
            .orElseThrow { VenueNotFoundException("Venue not found for this id: $id") }!!
        if (eventData != null) {
            event.name = eventData.name
            event.description = eventData.description
            event.email = eventData.email
            event.noOfGuests = eventData.noOfGuests
            event.veg = eventData.veg
            event.nonVeg = eventData.nonVeg
            event.area = eventData.area
            event.city = eventData.city
            event.website = eventData.website
            event.number = eventData.number
        }

        val updatedEvent = venueRepository.save(event)
        return ResponseEntity.ok(updatedEvent)
    }*/


    @GetMapping("city/{city}")
    @Throws(VenueNotFoundException::class)
    fun byCity(@PathVariable("city") city: String?): ResponseEntity<List<Venue?>?> {
        val events = venueService.searchByCity(city)
        return if (!events!!.isEmpty()) {
            ResponseEntity.ok(events)
        } else ResponseEntity.notFound().build()
    }

    @GetMapping("area/{area}")
    @Throws(VenueNotFoundException::class)
    fun byArea(@PathVariable("area") area: String?): ResponseEntity<List<Venue?>?> {
        val eventsArea = venueService.searchByArea(area)
        return if (!eventsArea!!.isEmpty()) {
            ResponseEntity.ok(eventsArea)
        } else ResponseEntity.notFound().build()
    }

    @GetMapping("name/{name}")
    @Throws(VenueNotFoundException::class)
    fun byName(@PathVariable("name") name: String?): ResponseEntity<List<Venue?>?> {
        val eventsName = venueService.searchByName(name)
        return if (!eventsName!!.isEmpty()) {
            ResponseEntity.ok(eventsName)
        } else ResponseEntity.notFound()
            .build()
    }

}


