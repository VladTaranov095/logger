pipeline {
    agent any
    
    stages {
        stage('Проверка окружения') {
            steps {
                bat 'echo Проверяю систему...'
                bat 'node --version'
                bat 'npm --version'
                bat 'git --version'
            }
        }
        
        stage('Установка зависимостей') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Запуск линтера') {
            steps {
                script {
                    echo " Запускаю ESLint..."
                    bat 'npm run lint'  // или ваша команда запуска линтера
                    echo " Линтер прошел успешно!"
                }
            }
        }
        
        stage('Пуш кода в Git') {
            when {
                // Выполняем только если предыдущие stages прошли успешно
                expression { currentBuild.result == null }
            }
            steps {
                script {
                    echo "📤 Отправляю код в репозиторий..."
                    
                    withCredentials([usernamePassword(
                        credentialsId: 'github-token',  // ← ВАШ ID!
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_TOKEN'
                    )]) {
                        bat '''
                            echo Настраиваю Git...
                            git config user.email "jenkins@example.com"
                            git config user.name "Jenkins CI"
                            
                            echo Обновляю URL репозитория с токеном...
                            git remote set-url origin https://%GIT_USER%:%GIT_TOKEN%@github.com/VladTaranov095/logger.git
                            
                            echo Отправляю изменения...
                            git push origin HEAD
                            
                            echo  Код успешно отправлен в GitHub!
                        '''
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo '🎉 УСПЕХ! Линтинг пройден, код отправлен в репозиторий.'
        }
        failure {
            echo ' ПРОВАЛ! Линтер нашел ошибки. Код не отправлен.'
        }
    }
}