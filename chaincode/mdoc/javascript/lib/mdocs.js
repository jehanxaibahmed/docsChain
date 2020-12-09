/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class DocsChain extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize DocsChain Ledger ===========');
        const docs = [
            {
                fileowner: 'amanullahmughal',
                filehash: '123123123123123123123123',
                filename: 'profile-aman',
                filetype: 'pdf',
                fileid : '123123123123123123123123-profile-aman.pdf',
                fid: '',
                fic: 'public',
                fis: 'published',
                filepath:'localhost',
                authortype: 'internal',
                authoralias: 'aman',
                parenthash: 'aa',
                discardfile: 'aa',
                version: 'aa',
                rHash: '',
                rRequestedForE: '',
                rBy: '',
                rTitle: '',
                rTimeStamp: '',
                rComments: '',
                aHash: '',
                aRequestedForE: '',
                aBy: '',
                aTitle: '',
                aTimeStamp: '',
                aComments: '',
                aStatus: '',
                rStatus : '',
            },
            {
                fileowner: 'amanullahmughal',
                filehash: '19191919119191919191919191919119',
                filename: 'ccie-aman',
                filetype: 'pdf',
                fileid : '19191919119191919191919191919119-cclie-aman.pdf',
                fid: '',
                fic: 'public',
                fis: 'published',
                filepath:'localhost',
                authortype: 'internal',
                authoralias: 'aman',
                parenthash: '',
                discardfile: '',
                version: '',
                rHash: '',
                rRequestedForE: '',
                rBy: '',
                rTitle: '',
                rTimeStamp: '',
                rComments: '',
                aHash: '',
                aRequestedForE: '',
                aBy: '',
                aTitle: '',
                aTimeStamp: '',
                aComments: '',
                aStatus: '',
                rStatus : '',

            },
            {
                fileowner: 'salman',
                filehash: '4141411414141414141414141414141',
                filename: 'profile-salman',
                filetype: 'pdf',
                fileid : '4141411414141414141414141414141-profile-salman.pdf',
                fid: '',
                fic: 'public',
                fis: 'published',
                filepath:'localhost',
                authortype: 'internal',
                authoralias: 'salman',
                parenthash: '',
                discardfile: '',
                version: '',
                rHash: '',
                rRequestedForE: '',
                rBy: '',
                rTitle: '',
                rTimeStamp: '',
                rComments: '',
                aHash: '',
                aRequestedForE: '',
                aBy: '',
                aTitle: '',
                aTimeStamp: '',
                aComments: '',
                aStatus: '',
                rStatus : '',

            },
            {
                fileowner: 'salman',
                filehash: '181818181818181181818181818181',
                filename: 'pmp-salman',
                filetype: 'pdf',
                fileid: '181818181818181181818181818181-pmp-salman.pdf',
                fid: '',
                fic: 'public',
                fis: 'published',
                filepath:'localhost',
                authortype: 'internal',
                authoralias: 'salman',
                parenthash: '',
                discardfile: '',
                version: '',
                rHash: '',
                rRequestedForE: '',
                rBy: '',
                rTitle: '',
                rTimeStamp: '',
                rComments: '',
                aHash: '',
                aRequestedForE: '',
                aBy: '',
                aTitle: '',
                aTimeStamp: '',
                aComments: '',
                aStatus: '',
                rStatus : '',

            },
            {
                fileowner: 'salman',
                filehash: '21212121212121212121212121212121',
                filename: 'experience-salman',
                filetype: 'pdf',
                fileid: '21212121212121212121212121212121-experience-salman.pdf',
                fid: '',
                fic: 'public',
                fis: 'published',
                filepath:'localhost',
                authortype: 'internal',
                authoralias: 'salman',
                parenthash: '',
                discardfile: '',
                version: '',
                rHash: '',
                rRequestedForE: '',
                rBy: '',
                rTitle: '',
                rTimeStamp: '',
                rComments: '',
                aHash: '',
                aRequestedForE: '',
                aBy: '',
                aTitle: '',
                aTimeStamp: '',
                aComments: '',
                aStatus: '',
                rStatus : '',

            },
            {
                fileowner: 'amanullahmughal',
                filehash: '13131313131331131313131313111',
                filename: 'experience-aman',
                filetype: 'pdf',
                fileid : '13131313131331131313131313111-experience-aman.pdf',
                fid: '',
                fic: 'public',
                fis: 'published',
                filepath:'localhost',
                authortype: 'internal',
                authoralias: 'aman',
                parenthash: '',
                discardfile: '',
                version: '',
                rHash: '',
                rRequestedForE: '',
                rBy: '',
                rTitle: '',
                rTimeStamp: '',
                rComments: '',
                aHash: '',
                aRequestedForE: '',
                aBy: '',
                aTitle: '',
                aTimeStamp: '',
                aComments: '',
                aStatus: '',
                rStatus : '',

            },
            {
                fileowner: 'amanullahmughal',
                filehash: '1616161616161666116161616166161611',
                filename: 'edu-aman',
                filetype: 'pdf',
                fileid: '1616161616161666116161616166161611-edu-aman.pdf',
                fid: '',
                fic: 'public',
                fis: 'published',
                filepath:'localhost',
                authortype: 'internal',
                authoralias: 'aman',
                parenthash: '',
                discardfile: '',
                version: '',
                rHash: '',
                rRequestedForE: '',
                rBy: '',
                rTitle: '',
                rTimeStamp: '',
                rComments: '',
                aHash: '',
                aRequestedForE: '',
                aBy: '',
                aTitle: '',
                aTimeStamp: '',
                aComments: '',
                aStatus: '',
                rStatus : '',

            },
            {
                fileowner: 'amanullahmughal',
                filehash: '171717171717171771717711771717171',
                filename: 'info-aman',
                filetype: 'pdf',
                fileid : '171717171717171771717711771717171-info-aman.pdf',
                fid: '',
                fic: 'public',
                fis: 'published',
                filepath:'localhost',
                authortype: 'internal',
                authoralias: 'aman',
                parenthash: '',
                discardfile: '',
                version: '',
                rHash: '',
                rRequestedForE: '',
                rBy: '',
                rTitle: '',
                rTimeStamp: '',
                rComments: '',
                aHash: '',
                aRequestedForE: '',
                aBy: '',
                aTitle: '',
                aTimeStamp: '',
                aComments: '',
                aStatus: '',
                rStatus : '',

            },
            {
                fileowner: 'salman',
                filehash: '11111111111111111111111111111110',
                filename: 'edu-summary',
                filetype: 'pdf',
                fileid : '11111111111111111111111111111110-edu-summary.pdf',
                fid: '',
                fic: 'public',
                fis: 'published',
                filepath:'localhost',
                authortype: 'internal',
                authoralias: 'salman',
                parenthash: '',
                discardfile: '',
                version: '',
                rHash: '',
                rRequestedForE: '',
                rBy: '',
                rTitle: '',
                rTimeStamp: '',
                rComments: '',
                aHash: '',
                aRequestedForE: '',
                aBy: '',
                aTitle: '',
                aTimeStamp: '',
                aComments: '',
                aStatus: '',
                rStatus : '',

            },
            {
                fileowner: 'salman',
                filehash: '888888888888888888881118888818888',
                filename: 'info-salman',
                filetype: 'pdf',
                fileid : '888888888888888888881118888818888-info-salman.pdf',
                fid: '',
                fic: 'public',
                fis: 'published',
                filepath:'localhost',
                authortype: 'internal',
                authoralias: 'salman',
                parenthash: '',
                discardfile: '',
                version: '',
                rHash: '',
                rRequestedForE: '',
                rBy: '',
                rTitle: '',
                rTimeStamp: '',
                rComments: '',
                aHash: '',
                aRequestedForE: '',
                aBy: '',
                aTitle: '',
                aTimeStamp: '',
                aComments: '',
                aStatus: '',
                rStatus : '',

            },
        ];

        for (let i = 0; i < docs.length; i++) {
            //docs[i].docType = 'doc';
            await ctx.stub.putState(docs[i].fileid, Buffer.from(JSON.stringify(docs[i])));
            console.info('\nAdded <--> ', docs[i], '\n');
        }
        console.info('============= END : Initialize Ledger ===========');
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

    async createDoc(
        ctx,
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

        await ctx.stub.putState(fileId, Buffer.from(JSON.stringify(document)));
        console.info('============= END : Create Document ===========');
    }

    async queryDoc(ctx, docNumber) {
        const docAsBytes = await ctx.stub.getState(docNumber); // get the car from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${docNumber} does not exist`);
        }
        //console.log(docAsBytes.toString());
        //return docAsBytes.toString();
        var out = JSON.parse(docAsBytes);
        //var newStr = out.replace(/,/g, '\r\n');
        return out;
    }

    async createDoc(ctx, fileowner, filehash, filename,
        filetype, fileid, fid, fic, fis,
        filepath, authortype, authoralias, parenthash, discardfile, version) {
        console.info('============= START : Create Doc ===========');

        const doc = [{
            fileowner,
            filehash,
            filename,
            filetype,
            fileid,
            fid,
            fic,
            fis,
            filepath,
            authortype,
            authoralias,
            parenthash,
            discardfile,
            version
            }]

            await ctx.stub.putState(fileid, Buffer.from(doc));
            console.info('============= END : Create Document ===========');
    }



    async changeDocOwner(ctx, filename, fileowner) {
        console.info('============= START : Reviewed ===========');

        const docAsBytes = await ctx.stub.getState(filename); // get the document from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${filename} does not exist`);
        }
        const doc = JSON.parse(docAsBytes.toString());
        doc.fileowner = fileowner;

        await ctx.stub.putState(filename, Buffer.from(JSON.stringify(doc)));
        console.info('============= END : changeReviewer ===========');
    }

    async changeDocReview(ctx, docName, rHash, rBy, rTitle, rTimeStamp, rComments, rStatus) {
        console.info('============= START : Reviewed ===========');

        const docAsBytes = await ctx.stub.getState(docName); // get the document from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${docName} does not exist`);
        }
        const doc = JSON.parse(docAsBytes.toString());
        doc.rBy = rBy;
        doc.rTitle = rTitle;
        doc.rHash = rHash;
        doc.rTimeStamp = rTimeStamp;
        doc.rComments = rComments;
        doc.rStatus = rStatus;
        await ctx.stub.putState(docName, Buffer.from(JSON.stringify(doc)));
        console.info('============= END : changeReviewer ===========');
    }

    async changeDocApproval(ctx, docName, aHash, aBy, aTitle, aTimeStamp, aComments,aStatus) {
        console.info('============= START : Approver ===========');

        const docAsBytes = await ctx.stub.getState(docName); // get the document from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${docName} does not exist`);
        }
        const doc = JSON.parse(docAsBytes.toString());
        doc.aBy = aBy;
        doc.aTitle = aTitle;
        doc.aHash = aHash;
        doc.aTimeStamp = aTimeStamp;
        doc.aComments = aComments;
        doc.aStatus = aStatus;
        await ctx.stub.putState(docName, Buffer.from(JSON.stringify(doc)));
        console.info('============= END : changeApprover ===========');
    }

    async CheckDocByName(ctx, docName) {
        console.info('============= START : Approver ===========');

        const docAsBytes = await ctx.stub.getState(docName); // get the document from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${docName} does not exist`);
        }
        else {
            throw new Error(`${docName} already exist`);
            console.info('============= END : Document NAME already exist ===========');
        }



    }

    async getDocHistory(ctx, key) {
        console.info('getting history for key: ' + key);
        let iterator = await ctx.stub.getHistoryForKey(key);
        let result = [];
        let res = await iterator.next();
        while (!res.done) {
          if (res.value) {
            console.info(`found state update with value: ${res.value.value.toString('utf8')}`);
            const obj = JSON.parse(res.value.value.toString('utf8'));
            result.push(obj);
          }
          res = await iterator.next();
        }
        await iterator.close();
        return result;
      }


}

module.exports = DocsChain;
