/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
         const documents = [
            {
                fileName:'xyz',
                fileHash:'123456abcdef',
                fileOwner:'jahanzaib',
                fileType:'docx',
                fileId:'123456abcdef-xyz-jahanzaib',
                fid:'1234',
                fic:'fic',
                fis:'fis',
                filePath:'localhost',
                authorType:'authType',
                authorAlias:'authorAlias',
                parentHash:'098765-xyz',
                discardFile:false,
                fileStatus:'rejected',
                version:1
            }
         ];

        for (let i = 0; i < documents.length; i++) {
            await ctx.stub.putState('Document' + i, Buffer.from(JSON.stringify(documents[i])));
            console.info('Added <--> ', documents[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryDocument(ctx, documentNumber) {
        const documentAsBytes = await ctx.stub.getState(documentNumber); // get the car from chaincode state
        if (!documentAsBytes || documentAsBytes.length === 0) {
            throw new Error(`${documentNumber} does not exist`);
        }
        console.log(documentAsBytes.toString());
        return documentAsBytes.toString();
    }

    async createDocument(
        ctx,
        documentNumber,
        fileName,
        fileHash,
        fileOwner,
        fileType,
        fileId,
        fid,
        fic,
        fis,
        filePath,
        authorType,
        authorAlias,
        parentHash,
        fileStatus,
        discardFile,
        version
        ) {
        console.info('============= START : Create Document ===========');

        const document = {
            fileName,
            fileHash,
            fileOwner,
            fileType,
            fileId,
            fid,
            fic,
            fis,
            filePath,
            authorType,
            authorAlias,
            fileStatus,
            parentHash,
            discardFile,
            version
        };

        await ctx.stub.putState(documentNumber, Buffer.from(JSON.stringify(document)));
        console.info('============= END : Create Document ===========');
    }

    async queryAllDocuments(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeDocumentStatus(ctx, documentNumber, newStatus) {
        console.info('============= START : changeDocumentStatus ===========');

        const documentAsBytes = await ctx.stub.getState(documentNumber); // get the document from chaincode state
        if (!documentAsBytes || documentAsBytes.length === 0) {
            throw new Error(`${documentNumber} does not exist`);
        }
        const document = JSON.parse(documentAsBytes.toString());
        document.fileStatus = newStatus;

        await ctx.stub.putState(documentNumber, Buffer.from(JSON.stringify(document)));
        console.info('============= END : changeDocumentStatus ===========');
    }

}

module.exports = FabCar;
