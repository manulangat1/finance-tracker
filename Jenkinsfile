pipeline {
    agent any 

    stages { 
        stage("Init the application") {
            steps { 
                script {
                    echo "Hello there, ${BRANCH_NAME}"
                }
            }
        }

        stage("Clean orphaned docker repos") { 
            steps{ 
                script{
                    echo "docker system prune -a -f "
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
                    sh "docker run -p 3000:3000 finance-api -d "
                    // sh "docker "
                }
            }
        }
    }
}