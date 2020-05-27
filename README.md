# Teledisko DAO

Welcome to the Teledisko DAO repository. Here you can find code and documentation that regulates the functioning of the DAO. Everything contained in the repository will be released under a free and open source license one day, to document our experience in migrating an existing organization to a DAO, and to guide and inspire others into taking our steps. In the meantime, keep in mind that the content **will be public** so don't put here anything you want to keep secret.

## Overview

Teledisko is a combination of **rules** and **tools**.

**Rules** govern the functioning of the organization. They are agreements between Teledisko shareholders, they usually have written form and regulate collaboration, shares allocation, decision making (voting), and so on.

**Tools** are applications, web platforms, and other software used to communicate, manage resources and assets, track time and activities, and so on.

Teledisko DAO is an attempt to formalize the rules into code so they are unambiguous, transparent, fair, and enforceable without relying on a third party. (For all details about vision, values, and rules, refer to [DAO Wuschwelt](./tips/1), by Benjamin Uphues.)

In order to formalize the rules,


## Components

Teledisko DAO combines:

- Odoo ERP system. Odoo keeps track of all contributors, projects, assets of the company. It allows also time-tracking.
- Ethereum blockchain. A set of smart contract in Ethereum allows the company to mint or burn new tokens, allows contributors to manage their tokens, and permits voting. Some of those features are already available through [Aragon][aragon], while some others need to be implemented.

## Features

The common interface to interact with some of the features of Odoo (specifically the *time tracking* feature) and the Ethereum blockchain is a **dApp** (decentralized application). The dApp is a web application that allows the Teledisko contributor to do actions like:

- Loading and saving projects and tasks from Odoo.
- Tracking time and update Odoo.
- Checking the balance of tokens in Ethereum.
- Create and vote on polls in Ethereum.

Note that the list of features is in continuous evolution.

## Development process

The development process strives to be as transparent as the DAO itself, and it is regulated by *improvement proposals*. Improvement (or enhancement) proposals are a methodology widely used in the tech industry to define protocols (see [IETF RFC][rfc]), develop programming languages (see [EEP][eep], [PEP][pep], [Rust RFC][rustrfc]), define blockchain protocols (see [EIP][eip], [BIP][bip]).

The process of writing down a proposal

They also function as the knowledge base of the project, and make **onboarding** of new contributors easier: everything that should be known is written down. There is less space to ambiguity

## Directory structure

- [dapp](dapp) source code for the Teledisko decentralized application.
- [TIPs](tips) a collection of *Teledisko Improvement Proposals*.


[aragon]: https://aragon.org/
[rfc]: https://www.ietf.org/standards/rfcs/
[eep]: https://www.erlang.org/erlang-enhancement-proposals/home<Paste>
[pep]: https://www.python.org/dev/peps/
[rustrfc]: https://rust-lang.github.io/rfcs/
[eip]: https://eips.ethereum.org/
[bip]: https://github.com/bitcoin/bips
