# m8-d2-basic-auth
Authorized Back End, Create a Web Service that uses Basic Authentication 

 All about Basic Auth. 
    Authorized Back End
    Create a Web Service that uses Basic Authentication
    Create in your database a "user" collection with username and password. PW MUST BE ENCRYPTED IN DB
    
    User's schema:
        - username
        - password
        - firstName
        - lastName
        - role ["user","admin"]
        
    Create a service test with the following endpoints:
    - Register (username, password): creates a new valid user
    - GET /users: returns list of users (admin only)
    - Single user's data can be visualized/edited/deleted by himself/herself only
    [Extra]
    Create the frontend as well
    
