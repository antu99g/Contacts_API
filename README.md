
# Contacts API

This is an RESTful api for contacts with all the CRUD (create, read, update, delete) operations. Filtration and pagination are also added on get request. The authentication is done using JsonWebToken (JWT).
## Run the project

To run this project, run the following command

```bash
  node index.js
```


## Tech Stack

`NodeJS` `Express` `MongoDB Atlas` `Mongoose`


## API Reference

#### API Prefix

```http
  https://contacts-api-6awm.onrender.com/
```


#### Routes

| Task | Method | URL | Request Body (fields) |
| :- | :- | :- | :- |
| Create a contact | `POST` | `/contact` | i) contact ii) username |
| Login | `POST` | `/contacts/login` | i) contact ii) username |
| Fetching contacts | `GET` | `/contacts` | |
| Updating a contact | `PUT` | `/contact/:id` |  i) contact ii) username (one or both fields can be edited) |
| Delete a contact | `DELETE` | `/contact/:id` | |

#### Pagination and Filtration
| Task | Params | Description |
| :- | :- | :- |
| Paginate results of `GET` request | ?page=1&limit=10 | Number of results can be mentioned with limit only and without the page field. Previous and next page directions will be sent in response if page field mentioned in params. |
| Filtering results of `GET` request | ?contact=123&username=xyz | Filteration can be done with one or both the fields. Filtered results can also be paginated. |

#### Note : Pagination and filtration both are optional, all contacts can be fetched directly without any params.