pipeline {
    agent any
    
    stages {
        stage('Подготовка') {
            steps {
                bat 'echo Проверяю окружение...'
                bat 'node --version'
                bat 'npm --version'
            }
        }
        
        stage('Установка зависимостей') {
            steps {
                bat 'npm ci'  // Или npm install
            }
        }
        
        stage('Запуск ESLint') {
            steps {
                script {
                    echo "🔍 Проверяю код..."
                    // Если линтер возвращает ошибки, он "упадет" здесь
                    // и сборка остановится
                    bat 'npm run lint'
                    echo "Код соответствует стандартам!"
                }
            }
        }

        stage('Пуш кода') {
            when {
                expression { currentBuild.result == null }
            }
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'github-token',  // ← СОВПАДАЕТ С ID В JENKINS!
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_TOKEN'
                    )]) {
                        bat '''
                            git config user.email "jenkins@example.com"
                            git config user.name "Jenkins CI"
                            git remote set-url origin https://%GIT_USER%:%GIT_TOKEN%@github.com/VladTaranov095/logger.git
                            git push origin HEAD
                            echo ✅ Код запушен успешно!
                        '''
                    }
                }
            }
        
    }
    
    post {
        always {
            echo "Сборка завершена: ${currentBuild.result}"
        }
    }
}
}