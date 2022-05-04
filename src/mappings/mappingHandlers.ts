import { SubstrateEvent } from "@subql/types";
import {Account, BlockTest, AccountsByBlock, AccountsByDate, DateTest } from "../types";

function createAccountsByBlock(blockNumber: string, date: Date): AccountsByBlock {
  const entity = new AccountsByBlock(blockNumber);
  entity.totalAccounts = BigInt(0);
  entity.date = date;
  return entity;
}

function createAccountsByDate(date: string): AccountsByDate {
  const entity = new AccountsByDate(date);
  entity.totalAccounts = BigInt(0);
  return entity;
}

export async function handleAccountsByDate(event: SubstrateEvent): Promise<void> {
  const {event: { data: [ accountId] }} = event;
  const accountToTest = await Account.get(accountId.toString());
  if (true){// !accountToTest){ // if non duplicated accounts
    let entity = await AccountsByDate.get((new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', ''));
    if (entity === undefined){
        entity = createAccountsByDate((new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', ''));
    }
    entity.totalAccounts = entity.totalAccounts + BigInt(1);
    await entity.save();
    if (true) { // event.block.block.header.number.toNumber() < 5000050 ){
      // logger.info(event.block.block.header.number.toBigInt().toString() + " " + accountId.toString() );
      logger.info(logger.info(" block " + event.block.block.header.number.toBigInt().toString() + " account " + accountId.toString() + ' entity incremented ' + entity.totalAccounts.toString() +' ' + (new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', '')));
  
    }
  }
}

export async function handleAccountsByBlock(event: SubstrateEvent): Promise<void> {
  const {event: { data: [ accountId] }} = event;
  const accountToTest = await Account.get(accountId.toString());
  if (true){//!accountToTest){ // if non duplicated accounts
    let entity = await AccountsByBlock.get(event.block.block.header.number.toBigInt().toString());
    if (entity === undefined){
        entity = createAccountsByBlock(event.block.block.header.number.toBigInt().toString(), new Date(event.block.timestamp.toDateString()));
    }
    entity.totalAccounts = entity.totalAccounts + BigInt(1);
    await entity.save();
  }
}

// account address
export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: { data: [ accountId] }} = event;
    // if (event.block.block.header.number.toNumber() < 5000050 ){
      // logger.info(event.block.block.header.number.toBigInt().toString() + " " + accountId.toString() );
    // }
    
    //Retrieve the record by its ID
    // const record = new Address(accountId.toString());

    const accountToTest = await Account.get(accountId.toString());

    if (!accountToTest){
      const record = new Account(accountId.toString());

      // const blockTestNo = event.block.block.header.number.toBigInt();

          // query for dates from DB
  //       const dateCreated = await DateTest.get((new Date(event.block.timestamp).toString()));
          // if not in DB, instantiate a new Account object using the toAddress as a unique ID

          // record.creationTimestamp.setHours(0,0,0,0)
  //        if (!dateCreated) {
  //            await new DateTest((new Date(event.block.timestamp).toString())).save();
  //        }
      
          // query for blockss from DB
      let dateEntity = await DateTest.get((new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', ''));
      if ( dateEntity === undefined){
        let dateToSave = new DateTest((new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', ''));
        dateToSave.totalAccounts = BigInt(0);
        await dateToSave.save();
      }
      dateEntity = await DateTest.get((new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', ''));
      dateEntity.totalAccounts =  dateEntity.totalAccounts + BigInt(1);
      await dateEntity.save();

      if (true) {//event.block.block.header.number.toNumber() < 5000050 ){
        logger.info(logger.info(" block " + event.block.block.header.number.toBigInt().toString() + " account " + accountId.toString() + ' dateEntity incremented ' + dateEntity.totalAccounts.toString() + ' ' + (new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', '')));

    }
     

      let entity = await BlockTest.get(event.block.block.header.number.toBigInt().toString());
      if (entity === undefined){
        let blockNoToSave = new BlockTest(event.block.block.header.number.toBigInt().toString());
        blockNoToSave.timestamp = event.block.timestamp;
        blockNoToSave.date = (new Date(event.block.timestamp.toDateString()));
        blockNoToSave.totalAccounts = BigInt(0);
        await blockNoToSave.save();
      }
      entity = await BlockTest.get(event.block.block.header.number.toBigInt().toString());
      entity.totalAccounts = entity.totalAccounts + BigInt(1);
      await entity.save();

      let date = await DateTest.get((new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', ''));
      if (date === undefined){
        let dateToSave = new DateTest((new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', ''));
        dateToSave.totalAccounts = BigInt(0);
        await dateToSave.save();
      }
      date = await DateTest.get((new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', ''));
      date.totalAccounts = date.totalAccounts + BigInt(1);
      await date.save();

/*
      const blockNo = await BlockTest.get(event.block.block.header.number.toBigInt().toString());
          // if not in DB, instantiate a new Account object using the toAddress as a unique ID
      if (!blockNo) {
        let blockNoToSave = new BlockTest(event.block.block.header.number.toBigInt().toString());
        blockNoToSave.timestamp = event.block.timestamp;
        blockNoToSave.date = (new Date(event.block.timestamp.toDateString()));
        await blockNoToSave.save();
      }
*/
      record.address = accountId.toString();


      // record.creationBlock = event.block.block.header.number.toBigInt();


      record.toId = event.block.block.header.number.toBigInt().toString();
      //   record.toId = event.block.timestamp.toString();

      record.dateId = (new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', '');

      record.creationTimestamp = event.block.timestamp;
  
      record.creationDate = (new Date(event.block.timestamp.toDateString()));
      // one to many
      // record.creationDateId = event.block.timestamp.toDateString();
    
    

      record.blockNumber = event.block.block.header.number.toBigInt();
      // one to many
      // record.blockNumberId = event.block.block.header.number.toBigInt().toString();

      // record.blockNumberTestId = event.block.block.header.number.toBigInt().toString();

      // record.creationDate = new Date(record.creationTimestamp.setHours(0,0,0,0));
      await record.save();
    }    
}
