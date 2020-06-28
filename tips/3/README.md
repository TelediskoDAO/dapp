```
TIP: 3
Name: API access to Odoo models
Type: Standard
Status: raw
Editor: Alberto Granzotto @vrde
```

# API access to Odoo models

This document is governed by [TIP-0](../0).

## 1 Abstract

An important requirement for the successful implementation of the DAO is the integration with the Odoo API. Odoo stores crucial information about the activity of the DAO, such as: projects, tasks, and hours worked by its contributors, just to name few. By having easy access to the data stored in Odoo, Teledisko can build a variety of tools to streamline the participation to the DAO.

## 2 Motivation

Teledisko uses [Odoo ERP][odoo] for managing contribuors, projects, assets, do time tracking, and much more. Odoo offers a rich set of apps that can be customized to fulfill the needs of the company using it.

There are two main reasons why accessing Odoo data is important.

1. Teledisko is migrating to a DAO structure. This means that some of the data contained in Odoo must be available "in the blockchain". By being able to pull data from Odoo, a custom *Oracle* would be able to push updates to the smart contracts of the DAO.
2. Time tracking on Odoo is cumbersome. Contributors are currently doing time tracking on different apps ([Gleeo][gleeo], spreadsheets) and **then** update the timesheets in Odoo. This adds friction and makes time tracking more difficult that it should be. By being able to interact with Odoo models instead of the Odoo UI, we can redefine how time tracking works.

This TIP discusses what's the best approach to create, read, update, and delete records in Odoo from an external program.

## 3 Specification

Odoo exposes an external [RPC API][external-api] that can be used to extend the functionality of the system. The RPC API implement a JSON and an XML interface. Both interfaces are easily accessible from a variety of programming languages.

## 4 Rationale

Accessing the Odoo API is a common issue, and has been tackled by custom modules like [MUK REST][mukrest] and [Odoo REST API][restapi].

Those modules don't provide much more than the standard RPC API shipped within Odoo, except for the *authentication* endpoint that we are going to implement with [TIP-3](../3).

Moreover, installing a new API module requires more work to install it, and maintain it. By having more code we might incur into bugs, security issues, and unexpected behavior.

## 5 Implementation

This TIP contains two different implementations, one in Python, the other in JavaScript.

### Python implementation

[Python source](./python). By using XML RPC, the script is able to retrieve the list of tasks of the current user.

### JavaScript (Node) implementation

[JavaScript source](./node). By using JSON RPC, the script is able to retrieve all tasks of the current user, and sums up the total amount of time spent per task.

## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/)


[odoo]: https://www.odoo.com/
[external-api]: https://www.odoo.com/documentation/12.0/webservices/odoo.html
[webservices]: https://www.odoo.com/documentation/12.0/howtos/backend.html#webservices
[mukrest]: https://apps.odoo.com/apps/modules/13.0/muk_rest/
[restapi]: https://apps.odoo.com/apps/modules/13.0/restapi/
[gleeo]: https://gleeo.com/
