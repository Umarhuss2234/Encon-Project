resource "aws_s3_bucket" "terraform_state" {
  bucket = var.state_bucket_name

  force_destroy = false

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Name    = "4-week Terraform Remote State"
    Purpose = "Terraform remote state storage"
  }
}


# Enable versioning so older versions of the state can be recovered
resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}


# Encrypt the Terraform state stored in S3
resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}


# Block all public access to the state bucket
resource "aws_s3_bucket_public_access_block" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}