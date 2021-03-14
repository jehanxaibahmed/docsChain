//Importing Modules
const fs = require('fs');
const path = require('path');
const http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

//Use Methods
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//Fabric Network
const { Gateway, Wallets } = require('fabric-network');

//LoadNetWork
loadNetwork = (channel) => {
    return new Promise( async (res, rej)=>{
        const ccpPath = path.resolve(__dirname, '..', '..', 'mdocs-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel);

        // Get the contract from the network.
        const contract = network.getContract(channel);

        res(contract);
    })
}

//Query All WorkFlows
app.get('/api/workflows', async function(req, res, next) {
    try {
        loadNetwork('mworkflow').then(async (contract)=>{
            const result = await contract.evaluateTransaction('queryAllWorkflows');
            res.send(result);
        })
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
});

//Query SingleWorkFlow
app.get('/api/queryworkflow/:workflowindex', async function (req, res) {
    try {

        loadNetwork('mworkflow').then(async (contract)=>{
        const result = await contract.evaluateTransaction('QueryWorkflow', req.params.workflowindex);
        console.log(`Transaction has been evaluated, result is: ${result}`);
        res.send(result);
        })
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
     //   process.exit(1);
    }
});

//Query History WorkFlow
app.get('/api/historyworkflow/:workflowindex', async function (req, res) {
    try {

        loadNetwork('mworkflow').then(async (contract)=>{
        const result = await contract.evaluateTransaction('GetHistoryWorkflow', req.params.workflowindex);
        console.log(`Transaction has been evaluated, result is: ${result}`);
        res.send(result);
        })
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
     //   process.exit(1);
    }
});

//Query CreateWorkflow
app.post('/api/createWorkflow', async function (req, res) {
    console.log(req);
    try {
        loadNetwork('mworkflow').then(async (contract)=>{
            await contract.submitTransaction('CreateWorkflow',
            req.body.workflowID,
            req.body.workflowName,
            req.body.workflowHash,
            req.body.orgName,
            req.body.companyName,
            req.body.workflowDescription,
            req.body.reviewStepCount,
            req.body.approveStepCount,
            req.body.createdDate,
            req.body.updatedDate,
            req.body.createdBy,
            req.body.updatedBy);
            console.log('Transaction has been submitted');
            res.status(200).send('Submited');
         })
        }
        catch(error)
        {
            res.status(400).json({response: 'Connection issues ' , error});
        }
});
//Query UpdateWorkflow
app.post('/api/updateWorkflow', async function (req, res) {
    try {
        loadNetwork('mworkflow').then(async (contract)=>{
            await contract.submitTransaction('UpdateWorkflow',
            req.body.workflowID,
            req.body.reviewStepCount,
            req.body.approveStepCount,
            req.body.updatedBy,
            req.body.updatedDate,
            req.body.workflowhash,
            req.body.workflowDescription
            );
            console.log('Transaction has been updated');
            res.status(200).send('Updated');
         })
        }
        catch(error)
        {
            res.status(400).json({response: 'Connection issues ' , error});
        }
});




//Query All Documents
app.get('/api/documents', async function(req, res, next) {
    try {
        loadNetwork('mdocs').then(async (contract)=>{
            const result = await contract.evaluateTransaction('QueryAllDocs');
            res.send(result);
        })
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
});

//Query SingleDocument
app.get('/api/query/:doc_index', async function (req, res) {
    try {

        loadNetwork('mdocs').then(async (contract)=>{
        const result = await contract.evaluateTransaction('queryDoc', req.params.doc_index);
        console.log(`Transaction has been evaluated, result is: ${result}`);
        res.send(result);
        })
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
     //   process.exit(1);
    }
});
//Query HistoryDocument
app.get('/api/queryhistory/:doc_index', async function (req, res) {
    try {
        loadNetwork('mdocs').then(async (contract)=>{
        const result = await contract.evaluateTransaction('GetHistoryDoc', req.params.doc_index);
        console.log(`Transaction has been evaluated`);
        res.send(result);
        })
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
     //   process.exit(1);
    }
});

//Query CreateDocument
app.post('/api/createDoc', async function (req, res) {
    try {
        loadNetwork('mdocs').then(async (contract)=>{
            await contract.submitTransaction('CreateDoc',
                req.body.docID,
	            req.body.workflowID,
		        req.body.docHash,
		        req.body.eventFor,
		        req.body.event,
		        req.body.initedBy,
                req.body.eventStatus,
		        req.body.eventInitDate,
		        req.body.eventComments,
           );
            console.log('Transaction has been submitted');
            res.status(200).send('Submited');
         })
        }
        catch(error)
        {
            res.status(400).json({response: 'Connection issues ' , error});
        }
});

//Query Update Event
app.post('/api/updateEvent', async function (req, res) {
    try {
        loadNetwork('mdocs').then(async (contract)=>{
            await contract.submitTransaction('UpdateDoc',
            req.body.docID,
            req.body.docHash,
            req.body.eventFor,
            req.body.event,
            req.body.eventStatus,
            req.body.eventInitDate,
            req.body.eventComments);
            console.log('Transaction has been updated');
            res.status(200).send('Updated');        })
        }
        catch(error)
        {
            res.status(400).json({response: req.body.sFileName + 'Does not exist'});
        }
});



//Starting Server...
const server = http.createServer(app);
const port = 8899;
server.listen(port);
console.debug('Server listening on port ' + port);
