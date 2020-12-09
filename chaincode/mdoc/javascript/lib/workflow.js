/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class WorkFlow extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize workflowsChain Ledger ===========');
        const workflows = [
            {
                workflowId: 'workflow1',
                workflowName: 'workflow1',
                organizationName: 'ORGONE',
                organizationId: '1',
                companyName: 'COMONE',
                companyId : '1',
                referenceTicket: '1',
                created: '',
                createdBy: 'waqas',
                comments:'xyz',
                titleApproverId: '1',
                approvalException: 'aman',
                approvalExpirey: 'aa',
                titleReviewer: 'aa',
                titleReviewerId: 'aa',
                reviewException: '',
                reviewExpirey: '',
                marDeletion: '',
            }
        ];

        for (let i = 0; i < workflows.length; i++) {
            //workflows[i].docType = 'doc';
            await ctx.stub.putState(workflows[i].workflowId, Buffer.from(JSON.stringify(workflows[i])));
            console.info('\nAdded <--> ', workflows[i], '\n');
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryAllWorkflows(ctx) {
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

    async queryWorkflow(ctx, workflowNumber) {
        const docAsBytes = await ctx.stub.getState(workflowNumber); // get the car from chaincode state
        if (!docAsBytes || docAsBytes.length === 0) {
            throw new Error(`${workflowNumber} does not exist`);
        }
        console.log(docAsBytes.toString());
        //return docAsBytes.toString();
        var out = docAsBytes.toString();
        //var newStr = out.replace(/,/g, '\r\n');
        return out;
    }

    async createWorkflow(ctx, workflowId, workflowName, organizationName,
        organizationId, companyName, companyId, referenceTicket, created,
        createdBy, comments, titleApproverId, approvalException, approvalExpirey, titleReviewer,
        titleReviewerId,reviewException,reviewExpirey,marDeletion) {
        console.info('============= START : Create Doc ===========');

        const workflow = [{
            workflowId: workflowId,
            workflowName: workflowName,
            organizationName: organizationName,
            organizationId: organizationId,
            companyName: companyName,
            companyId : companyId,
            referenceTicket: referenceTicket,
            created: created,
            createdBy: createdBy,
            comments:comments,
            titleApproverId: titleApproverId,
            approvalException: approvalException,
            approvalExpirey: approvalExpirey,
            titleReviewer: titleReviewer,
            titleReviewerId: titleReviewerId,
            reviewException: reviewException,
            reviewExpirey: reviewExpirey,
            marDeletion: marDeletion,

            }]

        await ctx.stub.putState(workflowId, Buffer.from(JSON.stringify(workflow[0])));
        console.info('============= END : Create WorkFlow ===========');
    }


    async getWorkflowHistory(ctx, key) {
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

module.exports = WorkFlow;
