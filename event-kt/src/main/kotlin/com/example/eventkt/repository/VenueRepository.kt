package com.example.eventkt.repository


import com.example.eventkt.model.Venue
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface VenueRepository : MongoRepository<Venue?, Long?> {
    fun existsVenueByNameEquals(Name: String?): Boolean
    fun existsVenueByAreaEquals(Area: String?): Boolean
    fun existsVenueByCityEquals(City: String?): Boolean
    fun findByCity(city: String?): List<Venue?>?
    fun findByArea(area: String?): List<Venue?>?
    fun findByName(name: String?): List<Venue?>?
}