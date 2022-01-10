package com.example.auth.repository

import com.example.auth.models.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepository : MongoRepository<User, Int> {
    fun findByEmail(email: String):User?
    fun getById(id: Int): User?
}