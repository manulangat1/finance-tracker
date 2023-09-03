pipeline {
    agent any 

    stages { 
        stage("Init the application") {
            steps { 
                script {
                    echo "Hello there, ${BRANCH_NAME}"
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

        stage("Run image") { 
            steps{
                script{ 
                    // sh "docker run -p 3000:3000 finance-api"
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
                        sh "terraform apply --auto-approve "
                        // sh "terraform destroy --auto-approve --var secret_key=secret_key  --var access_key=access_key"
                    }
                }
            }
        }
    }
}