## Start Up

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install TypeORM globally if not already installed:

   ```bash
   npm install -g typeorm
   ```

3. Create the database:

   ```bash
   npm run migration:create-db
   ```

4. Run the migrations to set up the database schema:

   ```bash
   still working on migration portion can be skipped
   npm run migration:generate
   ```

5. Seed the database with initial data:
   ```bash
   npm run seed
   ``*
   ```

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

- `api/dashboard/expiringLeases`  
   GET
- Req:

  ```

  ```

- Res:
  ```
  [{
    id: int,
    apt_num: string,
    tenant_id: string,
    first_name: string,
    last_name: string,
    landlord_id: int,
    lease_start_date: date,
    lease_end_date: date,
    renewal_term: string,
    status: string,
    notes: string
  }]
  ```
