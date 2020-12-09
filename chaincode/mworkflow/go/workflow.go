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

// Workflow describes
type Workflow struct {
	WorkflowName        string `json:"workflowName"`
	WorkflowHash        string `json:"workflowHash"`
	WorkflowID          string `json:"workflowId"`
	OrgName             string `json:"orgName"`
	CompanyName         string `json:"companyName"`
	WorkflowDescription string `json:"workflowDescription"`
	ReviewStepsCount    int    `json:"reviewStepsCount"`
	ApproveStepsCount   int    `json:"approveStepsCount"`
	CreatedDate         string `json:"createdDate"`
	UpdatedDate         string `json:"updatedDate"`
	CreatedBy           string `json:"createdBy"`
	UpdatededBy         string `json:"updatedBy"`
}

// QueryResult structure used for handling result of query
type QueryResult struct {
	Key    string `json:"Key"`
	Record *Workflow
}

// QueryHistory structure used for handling result of query
type QueryHistory struct {
	Record string
}

// InitLedger adds a base set of workflow to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	workflows := []Workflow{
		// Workflow{
		// 	WorkflowName:        "WORKFLOW1",
		// 	WorkflowHash:        "work4342342xzcdf",
		// 	WorkflowID:          "WORKFLOW1-worgfm5435345-435435",
		// 	OrgName:             "ORG1",
		// 	CompanyName:         "COM1",
		// 	WorkflowDescription: "TestWORKFLOW",
		// 	ReviewStepsCount:    3,
		// 	ApproveStepsCount:   5,
		// 	CreatedDate:         "201393254324",
		// 	UpdatedDate:         "",
		// 	CreatedBy:           "",
		// 	UpdatededBy:         "",
		// },
	}

	for i, workflow := range workflows {
		workflowAsBytes, _ := json.Marshal(workflow)
		fmt.Println(i)
		err := ctx.GetStub().PutState(workflow.WorkflowID, workflowAsBytes)

		if err != nil {
			return fmt.Errorf("Failed to put to world state. %s", err.Error())
		}
	}

	return nil
}

//CreateWorkflow adds a new car to the world state with given details
func (s *SmartContract) CreateWorkflow(ctx contractapi.TransactionContextInterface, workflowID string, workflowName string, workflowHash string, orgName string, companyName string, workflowDescription string, reviewStepsCount int, approveStepsCount int, createdDate string, updatedDate string, createdBy string, updatedBy string) error {
	workflow := Workflow{
		WorkflowName:        workflowName,
		WorkflowHash:        workflowHash,
		WorkflowID:          workflowID,
		OrgName:             orgName,
		CompanyName:         companyName,
		WorkflowDescription: workflowDescription,
		ReviewStepsCount:    reviewStepsCount,
		ApproveStepsCount:   approveStepsCount,
		CreatedDate:         createdDate,
		UpdatedDate:         updatedDate,
		CreatedBy:           createdBy,
		UpdatededBy:         updatedBy,
	}

	workflowAsBytes, _ := json.Marshal(workflow)

	return ctx.GetStub().PutState(workflowID, workflowAsBytes)
}

// QueryWorkflow returns the workflow stored in the world state with given id
func (s *SmartContract) QueryWorkflow(ctx contractapi.TransactionContextInterface, workflowID string) (*Workflow, error) {
	workflowAsBytes, err := ctx.GetStub().GetState(workflowID)

	if err != nil {
		return nil, fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if workflowAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", workflowID)
	}

	workflow := new(Workflow)
	_ = json.Unmarshal(workflowAsBytes, workflow)

	return workflow, nil
}

//GetHistoryWorkflow returns the workflow stored in the world state with given id
func (s *SmartContract) GetHistoryWorkflow(ctx contractapi.TransactionContextInterface, workflowID string) ([]QueryHistory, error) {
	history, err := ctx.GetStub().GetHistoryForKey(workflowID)

	if err != nil {
		return nil, fmt.Errorf("Failed to read History from world state. %s", err.Error())
	}

	if history == nil {
		return nil, fmt.Errorf("%s does not exist", workflowID)
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

//QueryAllWorkflows returns all Workflows found in world state
func (s *SmartContract) QueryAllWorkflows(ctx contractapi.TransactionContextInterface) ([]QueryResult, error) {
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

		workflow := new(Workflow)
		_ = json.Unmarshal(queryResponse.Value, workflow)

		queryResult := QueryResult{Key: queryResponse.Key, Record: workflow}
		results = append(results, queryResult)
	}

	return results, nil
}

// UpdateWorkflow in world state
func (s *SmartContract) UpdateWorkflow(ctx contractapi.TransactionContextInterface,
	workflowID string, reviewStepsCount int, approveStepsCount int, updatedBy string,
	updatedDate string, workflowHash string, workflowDescription string) error {
	workflow, err := s.QueryWorkflow(ctx, workflowID)

	if err != nil {
		return err
	}

	workflow.ReviewStepsCount = reviewStepsCount
	workflow.ApproveStepsCount = approveStepsCount
	workflow.UpdatedDate = updatedDate
	workflow.UpdatededBy = updatedBy
	workflow.WorkflowHash = workflowHash
	workflow.WorkflowDescription = workflowDescription

	workflowAsBytes, _ := json.Marshal(workflow)

	return ctx.GetStub().PutState(workflowID, workflowAsBytes)
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
