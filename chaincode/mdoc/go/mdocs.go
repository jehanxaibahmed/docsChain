/*
SPDX-License-Identifier: Apache-2.0
*/

package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing a workflow
type SmartContract struct {
	contractapi.Contract
}

// QueryHistory structure used for handling result of query
type QueryHistory struct {
	Record string
}

// DOC describes
type DOC struct {
	DocID         string `json:"docID"`
	WorkflowID    string `json:"workflowID"`
	DocHash       string `json:"docHash"`
	EventFor      string `json:"eventFor"`
	Event         string `json:"event"`
	InitedBy      string `json:"initedBy"`
	EventStatus   string `json:"eventStatus"`
	EventInitDate string `json:"eventInitDate"`
	EventComments string `json:"eventComments"`
}

// QueryResult structure used for handling result of query
type QueryResult struct {
	Key    string `json:"Key"`
	Record *DOC
}

// InitLedger adds a base set of docs to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	docs := []DOC{
		// DOC{
		// 	DocID:         "WORKFLOW1",
		// 	WorkflowID:    "WORKFLOW1",
		// 	DocHash:       "work4342342xzcdf",
		// 	EventFor:      "WORKFLOW1-worgfm5435345-435435",
		// 	Event:         "ORG1",
		// 	InitedBy:      "COM1",
		// 	EventStatus:   "TestWORKFLOW",
		// 	EventInitDate: "",
		// 	EventComments: "",
		// },
	}

	for i, doc := range docs {
		docAsBytes, _ := json.Marshal(doc)
		fmt.Println(i)
		err := ctx.GetStub().PutState(doc.DocID, docAsBytes)

		if err != nil {
			return fmt.Errorf("Failed to put to world state. %s", err.Error())
		}
	}

	return nil
}

//CreateDoc adds a new car to the world state with given details
func (s *SmartContract) CreateDoc(ctx contractapi.TransactionContextInterface,
	docID string, workflowID string, docHash string, eventFor string,
	event string, initedBy string, eventStatus string, eventInitDate string,
	eventComments string) error {
	doc := DOC{
		DocID:         docID,
		WorkflowID:    workflowID,
		DocHash:       docHash,
		EventFor:      eventFor,
		Event:         event,
		InitedBy:      initedBy,
		EventStatus:   eventStatus,
		EventInitDate: eventInitDate,
		EventComments: eventComments,
	}

	docAsBytes, _ := json.Marshal(doc)

	return ctx.GetStub().PutState(docID, docAsBytes)
}

// QueryDoc returns the doc stored in the world state with given id
func (s *SmartContract) QueryDoc(ctx contractapi.TransactionContextInterface, docID string) (*DOC, error) {
	docflowAsBytes, err := ctx.GetStub().GetState(docID)

	if err != nil {
		return nil, fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if docflowAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", docID)
	}

	doc := new(DOC)
	_ = json.Unmarshal(docflowAsBytes, doc)

	return doc, nil
}

//GetHistoryDoc returns the doc stored in the world state with given id
func (s *SmartContract) GetHistoryDoc(ctx contractapi.TransactionContextInterface, docID string) ([]QueryHistory, error) {
	history, err := ctx.GetStub().GetHistoryForKey(docID)

	if err != nil {
		return nil, fmt.Errorf("Failed to read History from world state. %s", err.Error())
	}

	if history == nil {
		return nil, fmt.Errorf("%s does not exist", docID)
	}

	results := []QueryHistory{}

	for history.HasNext() {
		modification, err := history.Next()
		if err != nil {
			fmt.Println(err.Error())
			return nil, fmt.Errorf("Failed to read History from world state. %s", err.Error())
		}
		queryResult := QueryHistory{Record: string(modification.Value)}
		results = append(results, queryResult)
		fmt.Println("Returning information about", string(modification.Value))
	}

	return results, nil
}

//QueryAllDocs returns all Docs found in world state
func (s *SmartContract) QueryAllDocs(ctx contractapi.TransactionContextInterface) ([]QueryResult, error) {
	startKey := ""
	endKey := ""

	resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)

	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	results := []QueryResult{}

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		doc := new(DOC)
		_ = json.Unmarshal(queryResponse.Value, doc)

		queryResult := QueryResult{Key: queryResponse.Key, Record: doc}
		results = append(results, queryResult)
	}

	return results, nil
}

// UpdateDoc in world state
func (s *SmartContract) UpdateDoc(ctx contractapi.TransactionContextInterface,
	docID string, docHash string, eventFor string,
	event string, eventStatus string, eventInitDate string,
	eventComments string) error {
	doc, err := s.QueryDoc(ctx, docID)

	if err != nil {
		return err
	}

	doc.DocHash = docHash
	doc.EventFor = eventFor
	doc.Event = event
	doc.EventStatus = eventStatus
	doc.EventInitDate = eventInitDate
	doc.EventComments = eventComments

	docAsBytes, _ := json.Marshal(doc)

	return ctx.GetStub().PutState(docID, docAsBytes)
}

func main() {

	chaincode, err := contractapi.NewChaincode(new(SmartContract))

	if err != nil {
		fmt.Printf("Error create mdocsWorkflow chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting mdocsWorkFlow chaincode: %s", err.Error())
	}
}
