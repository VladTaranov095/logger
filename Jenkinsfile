pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18' // Укажите имя инструмента из Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Проверяем наличие package.json
                    if (fileExists('package.json')) {
                        bat 'npm ci' // или npm install
                    } else {
                        echo 'No package.json found, skipping npm install'
                    }
                }
            }
        }
        
        stage('Lint') {
            steps {
                script {
                    // Проверяем наличие eslint
                    bat 'npx eslint --version || npm install eslint --save-dev'
                    
                    // Запускаем линтинг
                    bat 'npx eslint . --ext .js,.ts,.tsx --max-warnings=0'
                }
            }
        }
    }
    
    post {
        failure {
            echo 'Linting failed. Please check the console output.'
        }
        success {
            echo 'Linting passed successfully!'
        }
    }
    
}
