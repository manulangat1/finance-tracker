

resource "aws_vpc" "ec-2-vpc" {

  #   name = "ec2-vpc"

  cidr_block = "10.0.0.0/16"

  tags = {
    "Name" : "ec2-vpc"
  }

}

resource "aws_subnet" "subnet-1" {

  vpc_id = aws_vpc.ec-2-vpc.id

  cidr_block        = "10.0.10.0/24"
  availability_zone = "us-west-1b"

}
resource "aws_internet_gateway" "my-gateway" {

  vpc_id = aws_vpc.ec-2-vpc.id

  tags = {
    "Name" = ""
  }

}

resource "aws_route_table" "my-route-table" {
  vpc_id = aws_vpc.ec-2-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my-gateway.id
  }
}

resource "aws_route_table_association" "my-rta" {

  route_table_id = aws_route_table.my-route-table.id
  subnet_id      = aws_subnet.subnet-1.id
}


resource "aws_security_group" "my-sg" {

  vpc_id = aws_vpc.ec-2-vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]

  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "my-key-pair" {

  key_name = "my-key"

  # public_key = file("~/.ssh/id_rsa.pub")

  public_key = file("~/root/.ssh/id_rsa.pub")


}


resource "aws_instance" "my-instance" {

  ami           = "ami-0bd4d695347c0ef88" # using a static ami , in the next article you shall learn how to do this programatically.
  instance_type = "t2.micro"

  subnet_id = aws_subnet.subnet-1.id

  vpc_security_group_ids = [aws_security_group.my-sg.id]

  # availability_zone = "us-east-1a"
  availability_zone = "us-west-1b"

  key_name = "new_key_pair"

  associate_public_ip_address = true

  tags = {
    "Name" : "Dev-ec2"
  }

}
