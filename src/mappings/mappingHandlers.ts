import { SubstrateEvent } from "@subql/types";
import {Account, Block, Day, AccountsByBlock, AccountsByDate } from "../types";

// search for all accounts by block and date, but accounts with the same accountId will only be counted once.
export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: { data: [ accountId] }} = event;

    // see if account already stored
    const accountToTest = await Account.get(accountId.toString());

    if (!accountToTest){
      const record = new Account(accountId.toString());

      // query for date
      let dateEntity = await Day.get((new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', ''));
      if ( dateEntity === undefined){
        let dateToSave = new Day((new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', ''));
        dateToSave.totalAccounts = BigInt(0);
        await dateToSave.save();
      }
      dateEntity = await Day.get((new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', ''));
      dateEntity.totalAccounts =  dateEntity.totalAccounts + BigInt(1);
      await dateEntity.save();

      if (true) {//event.block.block.header.number.toNumber() < 5000050 ){
        logger.info(logger.info(" block " + event.block.block.header.number.toBigInt().toString() + " account " + accountId.toString() + ' dateEntity incremented ' + dateEntity.totalAccounts.toString() + ' ' + (new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', '')));
      }

       // query for blocks
      let entity = await Block.get(event.block.block.header.number.toBigInt().toString());
      if (entity === undefined){
        let blockNoToSave = new Block(event.block.block.header.number.toBigInt().toString());
        blockNoToSave.timestamp = event.block.timestamp;
        blockNoToSave.date = (new Date(event.block.timestamp.toDateString()));
        blockNoToSave.totalAccounts = BigInt(0);
        await blockNoToSave.save();
      }
      entity = await Block.get(event.block.block.header.number.toBigInt().toString());
      entity.totalAccounts = entity.totalAccounts + BigInt(1);
      await entity.save();

      record.address = accountId.toString();
      record.blockId = event.block.block.header.number.toBigInt().toString();
      record.dateId = (new Date(event.block.timestamp.toDateString())).toString().replace(' 00:00:00 GMT+0000 (GMT)', '');
      record.creationTimestamp = event.block.timestamp;
      record.creationDate = (new Date(event.block.timestamp.toDateString()));
      record.blockNumber = event.block.block.header.number.toBigInt();
      await record.save();
    }    
}

// search for all accounts by block including those with same accountId also created in another block
function createAccountsByBlock(blockNumber: string, date: Date): AccountsByBlock {
  const entity = new AccountsByBlock(blockNumber);
  entity.totalAccounts = BigInt(0);
  entity.date = date;
  return entity;
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

// search for all accounts by date including those with same accountId also created in another block
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
