## Routes

### Error object
This will be the object returned on any errors

```
{
    message: "You messed up" 
}
```

- `auth/login`
 POST
 - Req:
    ```
        {
            email: foo@email.com,
            password: password
        }
    ```
 - Res:
    ```
        {
            id: int,
            fullName: string,
            email: string,
            password: string
        }
    ```