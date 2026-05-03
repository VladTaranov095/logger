pipeline {
    agent any
    
    environment {
        // Основные переменные
        BASE_URL = 'https://playwright.dev'
        CI = 'true'
        CI_JENKINS = 'true'
        NODE_ENV = 'test'
        
        // Playwright настройки
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '0'
        
        // GitHub PR Builder переменные
        GITHUB_REPO = 'docs-and-api-test-playwrithe'
    }
    
    tools {
        nodejs 'NodeJS-18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    // Логируем информацию о сборке
                    echo "🏗 Building branch: ${env.BRANCH_NAME}"
                    if (env.CHANGE_ID) {
                        echo "📦 Pull Request #${env.CHANGE_ID}: ${env.CHANGE_TITLE}"
                        echo "👤 Author: ${env.CHANGE_AUTHOR}"
                        echo "🔗 URL: ${env.CHANGE_URL}"
                    }
                }
            }
        }
        
        stage('Setup') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm ci --cache .npm --prefer-offline'
                
                echo '🌐 Installing Playwright browsers...'
                sh 'npx playwright install --with-deps chromium'
                
                // Кешируем node_modules
                stash includes: 'node_modules/**', name: 'node_modules'
            }
        }
        
        stage('Lint') {
            steps {
                echo '🔍 Running ESLint...'
                sh 'npm run lint'
            }
            post {
                failure {
                    echo '⚠️ Linter found errors!'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    def testCommand = ''
                    
                    // Выбираем стратегию тестирования
                    if (env.CHANGE_ID) {
                        // Pull Request - только smoke тесты
                        echo '🔥 Running SMOKE tests for PR...'
                        testCommand = 'npm run test:pr'
                    } 
                    else if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master') {
                        // Main branch - полный регресс
                        echo '🚀 Running FULL regression for main branch...'
                        testCommand = 'npm run test:ci'
                    }
                    else if (env.BRANCH_NAME == 'develop') {
                        // Develop - info логирование
                        echo '📝 Running tests with INFO logging...'
                        testCommand = 'npm run test:info'
                    }
                    else {
                        // Другие ветки - стандартный запуск
                        echo '🧪 Running standard tests...'
                        testCommand = 'npm test'
                    }
                    
                    // Запускаем тесты
                    sh testCommand
                }
            }
            post {
                always {
                    // Сохраняем результаты тестов
                    script {
                        if (fileExists('playwright-report')) {
                            echo '✅ Playwright report generated'
                        }
                        if (fileExists('test-results')) {
                            echo '✅ Test results saved'
                        }
                    }
                }
            }
        }
        
        stage('Publish Report') {
            steps {
                // HTML отчет Playwright
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report',
                    reportTitles: 'Playwright E2E Test Results',
                    allowMissing: true,
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
                
                // JUnit отчет для Jenkins (если добавили в конфиг)
                junit testResults: 'test-results/junit.xml', 
                      allowEmptyResults: true,
                      keepLongStdio: true
            }
        }
    }
    
    post {
        always {
            script {
                // Архивация артефактов
                archiveArtifacts artifacts: 'playwright-report/**/*, test-results/**/*, playwright.log', 
                               allowEmptyArchive: true
                
                // Очистка workspace (опционально)
                cleanWs disableDeferredWipeout: true, deleteDirs: true
            }
        }
        
        success {
            echo '🎉 All tests passed successfully!'
            
            if (env.CHANGE_ID) {
                githubNotify context: 'Playwright E2E Tests', 
                           description: 'All tests passed! ✅',
                           status: 'SUCCESS'
            }
        }
        
        unstable {
            echo '⚠️ Build is unstable (some tests flaky or linter warnings)'
            
            if (env.CHANGE_ID) {
                githubNotify context: 'Playwright E2E Tests', 
                           description: 'Build unstable - check logs ⚠️',
                           status: 'FAILURE'
            }
        }
        
        failure {
            echo '💥 Tests failed!'
            
            if (env.CHANGE_ID) {
                githubNotify context: 'Playwright E2E Tests', 
                           description: 'Some tests failed! ❌',
                           status: 'FAILURE'
            }
        }
        
        aborted {
            echo '🛑 Build was aborted'
            
            if (env.CHANGE_ID) {
                githubNotify context: 'Playwright E2E Tests', 
                           description: 'Build aborted 🛑',
                           status: 'FAILURE'
            }
        }
    }
    
    options {
        timeout(time: 30, unit: 'MINUTES')
        retry(2)
        timestamps()
        disableConcurrentBuilds(abortPrevious: true)
        buildDiscarder(logRotator(numToKeepStr: '10', daysToKeepStr: '30'))
    }
    
    parameters {
        choice(
            name: 'LOG_LEVEL',
            choices: ['info', 'debug', 'warn', 'error', 'trace', 'off'],
            description: 'Log level for tests'
        )
        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run browser in headless mode'
        )
        string(
            name: 'SPECIFIC_TEST',
            defaultValue: '',
            description: 'Run specific test file (e.g., test/api.spec.ts)'
        )
    }
}