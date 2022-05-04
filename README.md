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

The Starting block for indexing is 5000000, so only some events from May 10 2021 onwards will be captured.

It seems that some new accounts seem to be created in different blocks, but with the exact same AccountId.

For example the account “13fNutUiAy398Tw6o2f21LyAeQrPxT8panXsRoKuY5r7YxDU”
seems to be created in at least blocks [5000007](https://polkadot.subscan.io/block/5000007?tab=event), [5000217](https://polkadot.subscan.io/block/5000217?tab=event), [5000959](https://polkadot.subscan.io/block/5000959?tab=event), [5001226](
https://polkadot.subscan.io/block/5001226?tab=event) and other blocks as well.

Using 1 to many relationships would only work if there was one block or date to many accounts, so for the purpose of this project I will only be counting the first instance of AccountId encountered going up from the 5000000 block, so to make the queries using the 1 to many relationships work.

There are also seperate queries to show the number of accounts created for each block or date including ones with AccountId's that have already been created in another block/date, such as the “13fNutUiAy398Tw6o2f21LyAeQrPxT8panXsRoKuY5r7YxDU” account.



#### Queries using 1 to many relationships

Query number of accounts created by blocks
````graphql
query{
  blocks(orderBy:ID_ASC first: 3){
    nodes{
      id
      timestamp
      date
      totalAccounts
    }
  }
}
````

````
{
  "data": {
    "blocks": {
      "nodes": [
        {
          "id": "5000000",
          "timestamp": "2021-05-10T09:18:18",
          "date": "2021-05-10T00:00:00",
          "totalAccounts": "3"
        },
        {
          "id": "5000001",
          "timestamp": "2021-05-10T09:18:24",
          "date": "2021-05-10T00:00:00",
          "totalAccounts": "2"
        },
        {
          "id": "5000002",
          "timestamp": "2021-05-10T09:18:30.002",
          "date": "2021-05-10T00:00:00",
          "totalAccounts": "2"
        }
      ]
    }
  }
}
````


Query number of accounts created by blocks and showing each account::
````graphql
query{
  blocks(orderBy:ID_ASC first: 3){
    nodes{
      id
      timestamp
      date
      totalAccounts
      accounts{
          nodes{
            id
            address
            creationDate
            creationTimestamp
            blockNumber
          }
      }
    }
  }
}
````
````
{
  "data": {
    "blocks": {
      "nodes": [
        {
          "id": "5000000",
          "timestamp": "2021-05-10T09:18:18",
          "date": "2021-05-10T00:00:00",
          "totalAccounts": "3",
          "accounts": {
            "nodes": [
              {
                "id": "12eLQ8d4LaPp3H8V3c2s3PoNHRtQXD4JikeRJdwmqTSLjTDt",
                "address": "12eLQ8d4LaPp3H8V3c2s3PoNHRtQXD4JikeRJdwmqTSLjTDt",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:18:18",
                "blockNumber": "5000000"
              },
              {
                "id": "12GfEJuwsm8iWvtnAf4UXo2Ptai3DMvxDkMJVt41FtxBGiRQ",
                "address": "12GfEJuwsm8iWvtnAf4UXo2Ptai3DMvxDkMJVt41FtxBGiRQ",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:18:18",
                "blockNumber": "5000000"
              },
              {
                "id": "16DEj4L1FjHBcZzg9modwyfC8ZYSVo4SuTh3fSpgTy2qvUt9",
                "address": "16DEj4L1FjHBcZzg9modwyfC8ZYSVo4SuTh3fSpgTy2qvUt9",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:18:18",
                "blockNumber": "5000000"
              }
            ]
          }
        },
        {
          "id": "5000001",
          "timestamp": "2021-05-10T09:18:24",
          "date": "2021-05-10T00:00:00",
          "totalAccounts": "2",
          "accounts": {
            "nodes": [
              {
                "id": "12gK9YT7pTCEH5KuB96dT9vswZBkxF1qfZcZMghkB2jdvG4T",
                "address": "12gK9YT7pTCEH5KuB96dT9vswZBkxF1qfZcZMghkB2jdvG4T",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:18:24",
                "blockNumber": "5000001"
              },
              {
                "id": "1qWSZ4iXqZ7tXFti7AC6Hq59FpANfhXzrUuaptWvPciWnqh",
                "address": "1qWSZ4iXqZ7tXFti7AC6Hq59FpANfhXzrUuaptWvPciWnqh",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:18:24",
                "blockNumber": "5000001"
              }
            ]
          }
        },
        {
          "id": "5000002",
          "timestamp": "2021-05-10T09:18:30.002",
          "date": "2021-05-10T00:00:00",
          "totalAccounts": "2",
          "accounts": {
            "nodes": [
              {
                "id": "15HQeVD7jkdyTvF5y3ZpFk5X5wFQDsKokTwfuBKAWT9LThvT",
                "address": "15HQeVD7jkdyTvF5y3ZpFk5X5wFQDsKokTwfuBKAWT9LThvT",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:18:30.002",
                "blockNumber": "5000002"
              },
              {
                "id": "1GcRtTEvApRNeHyvShb9GPzwGBfx5Q6Y67PXfXAtpurL5QH",
                "address": "1GcRtTEvApRNeHyvShb9GPzwGBfx5Q6Y67PXfXAtpurL5QH",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:18:30.002",
                "blockNumber": "5000002"
              }
            ]
          }
        }
      ]
    }
  }
}
````

Query number of accounts created by for a specific block - 5000172 in this query:
````graphql
query{
  blocks(filter: {id: {equalTo: "5000172"}}){
    nodes{
      id
      timestamp
      date
      totalAccounts
      accounts{
          nodes{
            id
            address
            creationDate
            creationTimestamp
            blockNumber
          }
      }
    }
  }
}
````
````
{
  "data": {
    "blocks": {
      "nodes": [
        {
          "id": "5000172",
          "timestamp": "2021-05-10T09:35:30",
          "date": "2021-05-10T00:00:00",
          "totalAccounts": "5",
          "accounts": {
            "nodes": [
              {
                "id": "123mV6paCsue5ZFrXWg7r8jDMmuBzRoiR2MkzFSqLVrkaReX",
                "address": "123mV6paCsue5ZFrXWg7r8jDMmuBzRoiR2MkzFSqLVrkaReX",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:35:30",
                "blockNumber": "5000172"
              },
              {
                "id": "12EyZHdmGdqs1kDzCdAVGBAJpjVUXFjDtG36Hy1zmn4ufqNB",
                "address": "12EyZHdmGdqs1kDzCdAVGBAJpjVUXFjDtG36Hy1zmn4ufqNB",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:35:30",
                "blockNumber": "5000172"
              },
              {
                "id": "15MCBraDhUqeeM89VykxRe1dtq2911mehSkVwKkV8jPQAnX5",
                "address": "15MCBraDhUqeeM89VykxRe1dtq2911mehSkVwKkV8jPQAnX5",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:35:30",
                "blockNumber": "5000172"
              },
              {
                "id": "165D7q7LfpyiNTkUskQ3qhQwWrsbskSCPiAaBwDa7xNMFhs7",
                "address": "165D7q7LfpyiNTkUskQ3qhQwWrsbskSCPiAaBwDa7xNMFhs7",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:35:30",
                "blockNumber": "5000172"
              },
              {
                "id": "1xtgc57knzVogfSd5CTqP7VKHegyqeAfMUzdQsLNYv3fEWi",
                "address": "1xtgc57knzVogfSd5CTqP7VKHegyqeAfMUzdQsLNYv3fEWi",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T09:35:30",
                "blockNumber": "5000172"
              }
            ]
          }
        }
      ]
    }
  }
}
````

Query number of accounts created by dates:
````graphql
query{
  days(orderBy:ID_ASC first:5){
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
    "days": {
      "nodes": [
        {
          "id": "May 10 2021",
          "totalAccounts": "4107"
        },
        {
          "id": "May 11 2021",
          "totalAccounts": "5088"
        },
        {
          "id": "May 12 2021",
          "totalAccounts": "5128"
        },
        {
          "id": "May 13 2021",
          "totalAccounts": "5322"
        },
        {
          "id": "May 14 2021",
          "totalAccounts": "5170"
        }
      ]
    }
  }
}
````

Query number of accounts created by dates and showing each account:
````graphql
query{
  days(orderBy:ID_ASC first:5){
    nodes{
      id
      totalAccounts
      accountsByDateId{
          nodes{
            id
            address
            creationDate
            creationTimestamp
            blockNumber
          }
      }
    }
  }
}
````
````
{
  "data": {
    "days": {
      "nodes": [
        {
          "id": "May 10 2021",
          "totalAccounts": "4107",
          "accountsByDateId": {
            "nodes": [
              {
                "id": "1121p64tPmagHR5uUiaA5d5wY82nNinB5aPjpE2sWPQxWzdp",
                "address": "1121p64tPmagHR5uUiaA5d5wY82nNinB5aPjpE2sWPQxWzdp",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T22:57:24",
                "blockNumber": "5008144"
              },
              {
                "id": "1127zmrniQwFDvhgkKCe6scgSrhfVr9irXiLoWgL3nHEecWJ",
                "address": "1127zmrniQwFDvhgkKCe6scgSrhfVr9irXiLoWgL3nHEecWJ",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T12:58:36",
                "blockNumber": "5002164"
              },
              {
                "id": "112Ax5aYLEgrKQmZGVBHntfm7wFpKjRagMkM89WC4Y5krx1z",
                "address": "112Ax5aYLEgrKQmZGVBHntfm7wFpKjRagMkM89WC4Y5krx1z",
                "creationDate": "2021-05-10T00:00:00",
                "creationTimestamp": "2021-05-10T10:46:36",
                "blockNumber": "5000852"
              },
              etc., remaining values not shown for brevity.
````

Query number of accounts created by for a specific date - "May 11 2021" in this query:
````graphql
query{
  days(filter: {id: {equalTo: "May 11 2021"}}){
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
    "days": {
      "nodes": [
        {
          "id": "May 11 2021",
          "totalAccounts": "5088"
        }
      ]
    }
  }
}
````

Query number of accounts created by for a specific date - "May 11 2021" in this query and showing each account:
````graphql
query{
  days(filter: {id: {equalTo: "May 11 2021"}}){
    nodes{
      id
      totalAccounts
      accountsByDateId{
          nodes{
            id
            address
            creationDate
            creationTimestamp
            blockNumber
          }
      }
    }
  }
}
````
````
{
  "data": {
    "days": {
      "nodes": [
        {
          "id": "May 11 2021",
          "totalAccounts": "5088",
          "accountsByDateId": {
            "nodes": [
              {
                "id": "1127nHfah1ZmyGqrHB3YoBAm9viCz3pJZY2fFcuNAxgCebut",
                "address": "1127nHfah1ZmyGqrHB3YoBAm9viCz3pJZY2fFcuNAxgCebut",
                "creationDate": "2021-05-11T00:00:00",
                "creationTimestamp": "2021-05-11T17:23:12",
                "blockNumber": "5019155"
              },
              {
                "id": "1127yq39hJb7VWme5gogfJPMnL7QzLMjCUDeCkD5KEb7Ydg",
                "address": "1127yq39hJb7VWme5gogfJPMnL7QzLMjCUDeCkD5KEb7Ydg",
                "creationDate": "2021-05-11T00:00:00",
                "creationTimestamp": "2021-05-11T17:02:18",
                "blockNumber": "5018946"
              },
              {
                "id": "1129bfcZTmBV3v6oGYcA9CqoG7PPGf5QLS696CBZ4mAHGnaA",
                "address": "1129bfcZTmBV3v6oGYcA9CqoG7PPGf5QLS696CBZ4mAHGnaA",
                "creationDate": "2021-05-11T00:00:00",
                "creationTimestamp": "2021-05-11T04:19:24",
                "blockNumber": "5011364"
              },
              etc., remaining values not shown for brevity.
````

#### Queries to show the number of accounts created including ones with AccountId's that have already been created in another block/date.

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

Query number of accounts created by for a specific block - 5000172 in this query:
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

Query number of accounts created by for a specific date - "May 11 2021" in this query:
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
