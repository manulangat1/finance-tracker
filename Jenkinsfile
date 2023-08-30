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
                    sh "docker-compose -f docker-compose.yaml  up"
                    sh " docker build -t finance-api ."
                }
            }
        }
    }
}