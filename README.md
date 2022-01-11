# VenueLook
Venue Look is an application, where users can find perfect venues and get quotes from their favorite venue providers. People usually visit physically to such places/venues to talk to the business owners and get quotes from them. This application tries to overcome this issue by giving a platform to the venue owners to list their venues for the users with a basic description of the venue thereby, allowing the user to make a perfect choice. In case of doubts or queries, the users can reach out to the venue owners by call or by sending them an inquiry mail through this platform.

### Technology Used
#### Backend
* Kotlin
* Spring Boot Framework
* JWT Authentication 

#### Frontend
* ReactJs

#### Database
* MongoDb

#### Cloud
* Amazon Web Services

### Flow Diagram

![image](https://user-images.githubusercontent.com/42665547/148779398-e0de22e6-cc0c-4cd3-b02f-c705dcb1d71d.png)

### Changes to be made before running the project

Add your MongoDb URL in  ```application.properties``` of ***event-kt*** and ***auth***
![image](https://user-images.githubusercontent.com/42665547/148779741-0f747d0b-2715-48eb-8bdc-f171b6ff4b20.png)

Add your Email Id and Password in ```application.properties``` of ***mailService***
![image](https://user-images.githubusercontent.com/42665547/148780801-b75b0fcb-5750-4d9f-b559-12c9c7e64361.png)

### Order of running the project
***__Backend__***
1. `eureka-server`
2. `mailService`
3. `auth`
4. `event-kt`

***__Frontend__***
1. vfront ---> `npm start`



