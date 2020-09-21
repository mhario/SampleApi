Mark Hario Sample Api
=====================


```sh
  npm install && npm run build && npm run start
```


## Endpoints

| __localhost:8080/api/agents__    
| Method | url      | Notes        
|:-------|:---------|:---
| GET    | /all     | Returns all agents
| POST   | /add     | All fields required
| GET    | /{id}    |              
| PUT    | /{id}    | All body fields added to record (no schema validation). Returns record.

|  __localhost:8080/api/customers__
| Method | url      | Notes
|:-------|:---------|:--
| GET    | /        | Query string defaults: ?page_size=10&offset=0
| GET    | /{id}    |
| POST   | /add     | Required fields: agent_id, isActive, name, email, registered
| DELETE | /{id}    | Actual delete (for now)
| PUT    | /{id}    | All body fields added to record (no schema validation). Returns record.  



## Assumptions
- Customers should have pagination and default limit of 10 records.
- Creating a new agent should (?) require all the fields.
- Creating a new customer may need empty fields, based on available information.

## Questions
- Who should be authorized to edit these records? Should there be restrictions on viewing customers?
- Record creation / required fields ?
- Should "Delete customer" actually be interpreted as "set to inactive?"
- What sort of filters would we like on our Customers (or agents) GET requests?


License
-------

MIT
