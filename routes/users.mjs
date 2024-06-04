import oExpress from "express";
let router = oExpress.Router();

import users from "../constants/users.js";

//middleware för att reqest.body kan defineras
router.use(oExpress.json());

router.get("/", (_request, _response) =>
    {
    _response.send("/ (Root/base) for users shown...")
    })

router.get("/api/users", (_request, _response) =>
    {
    _response.send(users)
    })

//uppgift 3
router.get("/api/users/:id", (_request, _response) => 
    {
        let id = parseInt(_request.params.id)
    
        if(isNaN(id))
        {
            return _response.status(400).send("400: Bad Request. Invalid Id...")
        }
    
        let findUser = users.find( (_user) => 
        {
            return _user.id === id 
        })
    
        if(!findUser)
        {
            return _response.status(404).send("404: Page  not found...")
        }
    
        _response.status(200).send(findUser)
    })
    
    //uppgift 4
    router.get("/usersfilter/:firstName/:nickName", (_request, _response) =>
    {
        let firstName = _request.params.firstName
        let nickName = _request.params.nickName
    
        let findBasedOfParameters = users.filter( (_aUser) =>
        {
            //return _aUser.firstName === firstName && _aUser.nickName === nickName 
            return _aUser.firstName.includes(firstName) && _aUser.nickName.includes(nickName)   
        }) 
    
        _response.status(200).send(findBasedOfParameters)
    })
    
    //uppgift 5
    router.get("/usersfilter", (_request, _response) => 
    {
        //example /usersfilter?firstName=Mark
        //example /usersfilter?firstName=January&nickName=Jan
        let firstName = _request.query.firstName
        let nickName = _request.query.nickName 
    
        let findAllBasedOnQuery = users.filter( (_aUser) => 
        {
            //return _aUser.firstName === firstName 
            //return _aUser.firstName.includes(firstName) 
            //return _aUser.firstName === firstName && _aUser.nickName === nickName
            return _aUser.firstName.includes(firstName) && _aUser.nickName.includes(nickName)
        })
    
        _response.status(200).send(findAllBasedOnQuery)
    })
    
    router.post("/api/users", (_request, _response) =>
    {
        let newUserObject = _request.body 
        //let { body } = _request
    
        let addNewUser = { id: users[users.length-1].id + 1, ...newUserObject } 
        //let addNewUser = { id: users[users.length-1].id + 1, ...body } 
        
        users.push(addNewUser)
    
        _response.status(201).send(addNewUser)
    })
    
    router.put("/api/users/:id", (_request, _response) => 
    {
        let { body, params: {id} } = _request
        //let id = _request.params.id
        //let body = _request.body 
    
        let userId = parseInt(id)
        if(isNaN(id))
        {
            return _response.sendStatus(400) //400: Invalid. Bad Request 
        }
    
        let userIndex = users.findIndex( (_user) => 
        {
            return _user.id === userId
        })
    
        if(userIndex == -1)
        {
            //return _response.sendStatus(404) //404: Page not found
            return _response.status(404).send("404: Page not found") //404: Page not found
        }
    
        users[userIndex] = { id: userId, ...body }
    
        
        _response.status(200).send(users[userIndex])
    })
    
    router.patch("/api/users/:id", (_request, _response) => 
    {
        let { body, params: {id}} = _request
        //let id = _request.params.id
        //let body = _request.body 
    
        let userId = parseInt(id)
        if(isNaN(id))
        {
            return _response.status(400).send("400: Invalid. Bad Request...")
        }
    
        let userIndex = users.findIndex( (_user) => 
        {
            return _user.id === userId
        }) 
    
        if(userIndex == -1)
        {
            return _response.status(404).send("404: Page not found...  user id not found")
        }
    
        users[userIndex] = { ...users[userIndex], ...body }
    
        _response.status(200).send(users[userIndex])
    })
    
    router.delete("/api/users/:id", (_request, _response) =>
    {
        let { params: {id} } = _request
        //let id = _request.params.id 
    
        let userId = parseInt(id)
        if(isNaN(id))
        {
            return _response.status(400).send("400: Invalid: Bad Request... Please enter a number...")
        }
    
        let userIndex = users.findIndex( (_user) => 
        {
            return _user.id === userId 
        })
    
        if(userIndex == -1)
        {
            return _response.status(400).send("404: Page not found... user id not found")
        }
    
        users.splice(userIndex, 1)
    
        _response.sendStatus(204)
    })


export default router;