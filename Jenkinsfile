pipeline {
    agent any
    
    stages {
        stage('Запуск линтера') {
            steps {
                script {
                    echo "🚀 Запускаю линтер..."
                                        
                    sh 'npx eslint'
                    
                    echo "✅ Линтер прошел успешно!"
                }
            }
        }
        
        stage('Пуш кода') {
            steps {
                script {
                    echo "📤 Пушим код в репозиторий..."
                    
                    // Настройка git (если нужно)
                    sh 'git config --global user.email "jenkins@example.com"'
                    sh 'git config --global user.name "Jenkins CI"'
                    
                    // Пуш в текущую ветку
                    sh 'git push origin HEAD'
                    
                    echo "Код успешно запушен!"
                }
            }
        }
    }
    
    post {
        failure {
            echo 'Линтинг не прошел. Код не запушен!'
        }
    }
}