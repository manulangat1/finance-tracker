output "name_db" {
  value = module.rds_db.db_instance
}
output "vpc_id" {

  value = aws_vpc.my_vpc.id

}

output "ip" {
  value = module.ec2.aws_ec2_ip
}
