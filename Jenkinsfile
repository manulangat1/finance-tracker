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

        stage("Build the image") { 
            steps{ 
                script{ 
                    echo "building the application!" 
                    sh "docker-compose up"
                }
            }
        }
    }
}