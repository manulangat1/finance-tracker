
terraform {
  backend "s3" {
    bucket = "blog-cms-test"
    key    = "state/terraform.tfstate"

    region = "us-east-1"
  }

  required_providers {
    aws = {
      source = "hashicorp/aws"
      #   version = "~> 4.18.0"
    }
  }

}
provider "aws" {
  region = "us-west-1"


}



resource "aws_vpc" "my_vpc" {
  cidr_block = var.cidr_block
  tags = {
    "Name" : "my-vpc"
  }

}

module "rds_db" {

  source = "./modules/rds"

  secret_key = var.secret_key

  access_key = var.access_key

  vpc_id = aws_vpc.my_vpc.id

}


