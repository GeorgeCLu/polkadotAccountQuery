### Create a SubQuery project to find out how many new accounts have been created on the Polkadot network in a day.

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

#### Notes

The Starting block for indexing is 5000000, so only some events from May 10 2021 will be captured

It seems that some new accounts seem to be created in different blocks, but with the exact same AccountId.

For example the account “13fNutUiAy398Tw6o2f21LyAeQrPxT8panXsRoKuY5r7YxDU”
seems to be created in at least blocks [5000007](https://polkadot.subscan.io/block/5000007?tab=event), [5000217](https://polkadot.subscan.io/block/5000217?tab=event), [5000959](https://polkadot.subscan.io/block/5000959?tab=event), [5001226](
https://polkadot.subscan.io/block/5001226?tab=event) and other blocks as well.

Using 1 to many relationships would only work if there was one block or date to many accounts, so for this purpose I will only be counting the first instance of AccountId encountered going up from the 5000000 block, to make the queries using the 1 to many relationships work.

There are also seperate queries to show the number of accounts created for each block or date including ones with AccountId's that have already been created in another block/date.  



##### Queries using 1 to many relationships


##### Queries to show the number of accounts created including ones with AccountId's that have already been created in another block/date.

Query number of accounts created by blocks:
````graphql
{
  query{
     accountsByBlocks(orderBy:ID_ASC first: 3){
          nodes{
               id
               totalAccounts
               date
          }
     }
  }
}
````
````
{
  "data": {
    "query": {
      "accountsByBlocks": {
        "nodes": [
          {
            "id": "5000000",
            "totalAccounts": "3",
            "date": "May 10 2021"
          },
          {
            "id": "5000001",
            "totalAccounts": "2",
            "date": "May 10 2021"
          },
          {
            "id": "5000002",
            "totalAccounts": "2",
            "date": "May 10 2021"
          }
        ]
      }
    }
  }
}
````

Query accounts created by for a specific block - 5000172 in this query:
````graphql
query{
  accountsByBlocks(filter: {id: {equalTo: "5000172"}}){
    nodes{
      id
      totalAccounts
      date
    }
  }
}
````
````
{
  "data": {
    "accountsByBlocks": {
      "nodes": [
        {
          "id": "5000172",
          "totalAccounts": "5",
          "date": "May 10 2021"
        }
      ]
    }
  }
}
````

Query number of accounts created by dates:
````graphql
query{
  accountsByDates(orderBy:ID_ASC first: 5){
    nodes{
      id
      totalAccounts
    }
  }
}
````
````
{
  "data": {
    "accountsByDates": {
      "nodes": [
        {
          "id": "May 10 2021",
          "totalAccounts": "4472"
        },
        {
          "id": "May 11 2021",
          "totalAccounts": "5617"
        },
        {
          "id": "May 12 2021",
          "totalAccounts": "5663"
        },
        {
          "id": "May 13 2021",
          "totalAccounts": "6179"
        },
        {
          "id": "May 14 2021",
          "totalAccounts": "5992"
        }
      ]
    }
  }
}
````

Query accounts created by for a specific date - "May 11 2021" in this query:
````graphql
query{
  accountsByDates(filter: {id: {equalTo: "May 11 2021"}}){
    nodes{
      id
      totalAccounts
    }
  }
}
````
````
{
  "data": {
    "accountsByDates": {
      "nodes": [
        {
          "id": "May 11 2021",
          "totalAccounts": "5617"
        }
      ]
    }
  }
}
````
