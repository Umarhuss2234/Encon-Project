variable "aws_region" {
  description = "AWS region used for the remote state infrastructure"
  type        = string
  default     = "eu-north-1"
}

variable "state_bucket_name" {
  description = "Globally unique S3 bucket used to store Terraform state"
  type        = string
  default     = "4-week-umar-terraform-remote-state"
}

variable "lock_table_name" {
  description = "DynamoDB table used for Terraform state locking"
  type        = string
  default     = "4-week-umar-terraform-state-lock"
}