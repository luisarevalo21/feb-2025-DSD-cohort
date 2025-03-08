## Routes

### Error object
This will be the object returned on any errors

```
{
    "message": "You messed up" 
}
```

- `auth/login`
 POST
 - Req:
    ```
        {
            "email": "foo@email.com",
            "password": "password"
        }
    ```
 - Res:
    ```
        {
            "id": int,
            "firstName": string,
            "lastName": string,
            "email": string,
            "password": string
        }
    ```

- `auth/signup`
 POST
 - Req:
    ```
        {
            "firstName": "Foo",
            "lastName": "Bar",
            "email": "foo@bar.com",
            "password": "password",
        }
    ```
 - Res:
    ```
        {
            "user": {
                "id": int,
                "firstName": string,
                "lastName": string,
                "email": string,
                "password": string
            },
            "redirect": "/dashboard"   
        }
    ```