pipeline {
    agent any
    
    stages {
        stage('Lint Check') {
            steps {
                script {
                    try {
                        bat 'npx eslint . --ext .js,.ts'
                        echo '✅ Lint passed!'
                    } catch (Exception e) {
                        echo '❌ Lint failed!'
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}