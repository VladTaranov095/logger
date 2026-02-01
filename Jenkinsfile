pipeline {
    agent any
    
    stages {
        stage('Проверка окружения') {
            steps {
                bat 'echo Проверяю систему...'
                bat 'node --version'
                bat 'npm --version'
                bat 'git --version'
                bat 'git branch'  // Проверим текущую ветку
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
                    echo "🚀 Запускаю ESLint..."
                    bat 'npm run lint'
                    echo "✅ Линтер прошел успешно!"
                }
            }
        }
        
        stage('Пуш кода в Git') {
            when {
                expression { currentBuild.result == null }
            }
            steps {
                script {
                    echo "📤 Отправляю код в репозиторий..."
                    
                    withCredentials([usernamePassword(
                        credentialsId: 'github-token',
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_TOKEN'
                    )]) {
                        bat '''
                            echo Настраиваю Git...
                            git config user.email "jenkins@example.com"
                            git config user.name "Jenkins CI"
                            
                            echo Обновляю URL репозитория с токеном...
                            git remote set-url origin https://%GIT_USER%:%GIT_TOKEN%@github.com/VladTaranov095/logger.git
                            
                            echo Определяю текущую ветку...
                            for /f "tokens=*" %%i in ('git branch --show-current') do set BRANCH=%%i
                            echo Текущая ветка: %BRANCH%
                            
                            echo Отправляю изменения...
                            git push origin %BRANCH%
                            
                            if %errorlevel% equ 0 (
                                echo ✅ Код успешно отправлен в GitHub!
                            ) else (
                                echo ❌ Ошибка при пуше!
                                exit 1
                            )
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
            echo '❌ ПРОВАЛ! Линтер нашел ошибки или пуш не удался.'
        }
    }
}