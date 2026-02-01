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
        
        // Пока УБРАТЬ stage 'Пуш кода' - сначала наладим линтер
    }
    
    post {
        always {
            echo "Сборка завершена: ${currentBuild.result}"
        }
    }
}