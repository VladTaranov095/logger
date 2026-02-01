pipeline {
    agent any
    
    stages {
        stage('Подготовка') {
            steps {
                bat '''
                    echo Убеждаюсь что на ветке main...
                    git checkout -B main
                    echo Готово!
                '''
            }
        }
        
        stage('Линт') {
            steps {
                bat 'npm run lint'
            }
        }
        
        stage('Пуш') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-token',
                    usernameVariable: 'USER',
                    passwordVariable: 'TOKEN'
                )]) {
                    bat '''
                        git config user.email "jenkins@ci.com"
                        git config user.name "Jenkins"
                        git remote set-url origin https://%USER%:%TOKEN%@github.com/VladTaranov095/logger.git
                        git push push_from_jenkins
                    '''
                }
            }
        }
    }
}