pipeline {
    agent any
    
    stages {
        stage('Клонирование') {
            steps {
                // Просто клонируем ветку main
                bat 'git clone -b main https://github.com/VladTaranov095/logger.git . || cd .'
                bat 'git branch'
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
                        git push origin main
                    '''
                }
            }
        }
    }
}