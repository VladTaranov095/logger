pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Lint Check') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        // Используем зависимости проекта
                        bat 'npm install'
                        bat 'npm run lint || npx eslint . --ext .js,.ts'
                    } else {
                        // Создаем минимальный package.json
                        bat '''
                            npm init -y
                            npm install eslint@8.57.0 @typescript-eslint/parser @typescript-eslint/eslint-plugin --no-save
                            npx eslint . --ext .js,.ts
                        '''
                    }
                }
            }
        }
    }
}