## 2 Tables:

  

## Users Table:

ID: *PK increments

Name: string (notNullable)

Email: (unique, notNullable)

UserName: unique, notNullable

  

## Notes Table:

ID: *PK

Owner: UserName as Foreign Key: 

DateCreated: Check On Formatting

Completed: Boolean 

Private: Boolean 