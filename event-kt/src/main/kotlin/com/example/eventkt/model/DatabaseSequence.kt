package com.example.eventkt.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "database_sequences")
class DatabaseSequence {
    @Id
    var id: String? = null
    var seq: Long = 0
}