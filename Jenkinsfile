pipeline {
    agent any 

    stages { 
        stage("Init the application") {
            steps { 
                script {
                    echo "Hello there, ${BRANCH_NAME} ${BUILD_NUMBER}"
                    sh "docker version"
                }
            }
        }

        stage("Clean orphaned docker repos") { 
            steps{ 
                script{
                    sh "docker system prune -a -f "
                    sh "docker ps" 
                    
                }
            }
        }

        stage("Build the image") { 
            steps{ 
                script{ 
                    echo "building the application!" 
                    sh "pwd"
                    sh "ls"
                    // sh "docker-compose -f docker-compose.yaml  up"
                    sh " docker build -t finance-api ."
                }
            }
        }

        stage ("push to ecr") {
            steps { 
                script { 

                     withCredentials([aws(accessKeyVariable: "AWS_ACCESS_KEY_ID", credentialsId: "aws-creds", secretKeyVariable: "AWS_SECRET_ACCESS_KEY")]) { 
                        sh "aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/v7e4g1x6"
                        sh "docker tag finance-api  public.ecr.aws/v7e4g1x6/finance-api:${BUILD_NUMBER}"
                    sh "docker push  public.ecr.aws/v7e4g1x6/finance-api:${BUILD_NUMBER}"
                        }
                    
                }
            }
        }

        stage("Run image") { 
            steps{
                script{ 
                    sh "docker system prune -a -f "

                }
            }
        }

        stage ("Provinsion infra using terraform") {
            environment { 
                access_key = credentials('access_key')
            secret_key = credentials('secret_key')
            AWS_ACCESS_KEY_ID = credentials('access_key')
                AWS_SECRET_ACCESS_KEY = credentials('secret_key')
            }
            
            steps{
                
                script { 
                    dir("terraform") {  
                        sh "ls"
                        echo "access_key"
                        echo "secret_key"
                        sh "terraform init --var secret_key=secret_key  --var access_key=access_key"
                        // withCredentials([])
                        echo "$AWS_ACCESS_KEY_ID"
                        echo "$AWS_SECRET_ACCESS_KEY"
                        sh "aws --version"
                        withCredentials([aws(accessKeyVariable: "AWS_ACCESS_KEY_ID", credentialsId: "aws-creds", secretKeyVariable: "AWS_SECRET_ACCESS_KEY")]) { 
                            sh "terraform apply --auto-approve --var secret_key=secret_key  --var access_key=access_key"
                            EC2_PUBLIC_IP = sh (
                                script: 'terraform output ip', 
                                returnStdout: true
                            ).trim()
                        }
                    }
                }
            }
        }

            stage("Start the app in ECS cluster ") {
                steps { 
                    script{ 
                        sleep(time:120, unit:'SECONDS')
                        echo "Deploying docker image to the created ec2 instance"
                        def shellCmd = "bash server-commands.sh"
                        def ec2Instance = "ec2-user@$EC2_PUBLIC_IP"
                        sshagent(["ec2-server-key"]) {
                            sh "scp -o StrictHostKeyChecking=no server-commands.sh $ec2Instance:/home/ec2-user"
                            sh "scp -o StrictHostKeyChecking=no docker-compose.yaml ${ec2Instance}:/home/ec2-user"
                            sh "ls"
                            sh "ssh -o StrictHostKeyChecking=no $ec2Instance $shellcmd"
                        }
                    }
                } 

            }

                stage ("Sast analysis") {
            environment { 
                access_key = credentials('access_key')
            secret_key = credentials('secret_key')
            AWS_ACCESS_KEY_ID = credentials('access_key')
                AWS_SECRET_ACCESS_KEY = credentials('secret_key')
            }
            
            steps{
                
                script { 
                    dir("terraform") {  
                        sh "ls"
                        echo "access_key"
                        echo "secret_key"
                        sh "terraform init --var secret_key=secret_key  --var access_key=access_key"
                        // withCredentials([])
                        echo "$AWS_ACCESS_KEY_ID"
                        echo "$AWS_SECRET_ACCESS_KEY"
                        sh "aws --version"
                        withCredentials([aws(accessKeyVariable: "AWS_ACCESS_KEY_ID", credentialsId: "aws-creds", secretKeyVariable: "AWS_SECRET_ACCESS_KEY")]) { 
                            // sh "terraform apply --auto-approve"
                            // sh "aws ec2 describe-instances"
                            // echo "Hello"

                            sh "terraform destroy --auto-approve --var secret_key=secret_key  --var access_key=access_key"
                        }
                        
                        // sh "terraform destroy --auto-approve --var secret_key=secret_key  --var access_key=access_key"
                    }
                }
            }
        }
    }
}