# 4-Week Terraform Remote State

This repository contains the Terraform used to create the remote state infrastructure for my Cold Chain backend project.

It creates an S3 bucket for storing the Terraform state file and a DynamoDB table for state locking. This allows the backend Terraform configuration to use remote state instead of relying on state stored locally on my laptop, making the infrastructure safer and easier to manage.