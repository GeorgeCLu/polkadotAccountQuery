# Create a SubQuery project to find out how many new accounts have been created on the Polkadot network in a day.

This will require:

Record new account and the block information, and use 1 to many relationship

Use subquery dictionary to accelerate indexing

Publish the project using SubQuery CLl, and deploy the project to the SubQuery host service.

Write a graphql query find out how many accounts have been created in a specific block

Write a graphql query find out how many accounts have been created in a specific day


Github link: https://github.com/GeorgeCLu/polkadotAccountQuery

Link to your project on the hosted service: https://explorer.subquery.network/subquery/GeorgeCLu/queryaccounts

API link: https://api.subquery.network/sq/GeorgeCLu/queryaccounts

Queries for the above tasks.

## Notes

The Starting block for indexing is 5000000, so only some events from May 10 2021 will be captured

It seems that some new accounts seem to be created in different blocks, but with the exact same AccountId.

For example the account “13fNutUiAy398Tw6o2f21LyAeQrPxT8panXsRoKuY5r7YxDU”
seems to be created in at least blocks [5000007](https://polkadot.subscan.io/block/5000007?tab=event), [5000217](https://polkadot.subscan.io/block/5000217?tab=event), [5000959](https://polkadot.subscan.io/block/5000959?tab=event), [5001226](
https://polkadot.subscan.io/block/5001226?tab=event) and other blocks as well.

Using 1 to many relationships would only work if there was one block or date to many accounts, so for this purpose I will only be counting the first instance of AccountId encountered going up from the 5000000 block, to make the queries using the 1 to many relationships work.

There are also seperate queries to show the number of accounts created for each block or date including ones with AccountId's that have already created in another block/date.  



#### Environment

- [Typescript](https://www.typescriptlang.org/) are required to compile project and define types.  

- Both SubQuery CLI and generated Project have dependencies and require [Node](https://nodejs.org/en/).
     

#### Install the SubQuery CLI

Install SubQuery CLI globally on your terminal by using NPM:

```
npm install -g @subql/cli
```

Run help to see available commands and usage provide by CLI
```
subql help
```

## Initialize the starter package

Inside the directory in which you want to create the SubQuery project, simply replace `project-name` with your project name and run the command:
```
subql init --starter project-name
```
Then you should see a folder with your project name has been created inside the directory, you can use this as the start point of your project. And the files should be identical as in the [Directory Structure](https://doc.subquery.network/directory_structure.html).

Last, under the project directory, run following command to install all the dependency.
```
yarn install
```


## Configure your project

In the starter package, we have provided a simple example of project configuration. You will be mainly working on the following files:

- The Manifest in `project.yaml`
- The GraphQL Schema in `schema.graphql`
- The Mapping functions in `src/mappings/` directory

For more information on how to write the SubQuery, 
check out our doc section on [Define the SubQuery](https://doc.subquery.network/define_a_subquery.html) 

#### Code generation

In order to index your SubQuery project, it is mandatory to build your project first.
Run this command under the project directory.

````
yarn codegen
````

## Build the project

In order to deploy your SubQuery project to our hosted service, it is mandatory to pack your configuration before upload.
Run pack command from root directory of your project will automatically generate a `your-project-name.tgz` file.

```
yarn build
```

## Indexing and Query

#### Run required systems in docker


Under the project directory run following command:

```
docker-compose pull && docker-compose up
```
#### Query the project

Open your browser and head to `http://localhost:3000`.

Finally, you should see a GraphQL playground is showing in the explorer and the schemas that ready to query.

For the `subql-starter` project, you can try to query with the following code to get a taste of how it works.

````graphql
{
  query{
    starterEntities(first:10){
      nodes{
        field1,
        field2,
        field3
      }
    }
  }
}
````
