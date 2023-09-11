variable "access_key" {
  type = string

}

variable "secret_key" {
  type = string

}

variable "cidr_block" {
  type    = string
  default = "10.0.0.0/24"
}
