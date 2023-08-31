provider "aws" {

  secret_key = var.secret_key

  access_key = var.access_key

  region = "us-west-1"
}
data "aws_vpc" "default" {
  default = true
}

resource "aws_security_group" "my-sg" {

  vpc_id = data.aws_vpc.default.id
  name   = "new-gs"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    to_port     = 0
    from_port   = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

}

resource "aws_db_instance" "my_db" {
  #   region         = "us-west-1"
  identifier     = "test-db"
  instance_class = "db.t3.micro"
  #   name                   = "test-db-name"
  #   db_name           = "testdbname"
  allocated_storage      = 20
  engine                 = "postgres"
  engine_version         = "13.11"
  skip_final_snapshot    = true
  publicly_accessible    = true
  vpc_security_group_ids = [aws_security_group.my-sg.id]
  username               = "root"
  password               = "root1010!"

}
