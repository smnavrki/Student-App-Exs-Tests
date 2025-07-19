pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Test') {
      steps {
        echo 'Стартиране на сървъра и изпълнение на тестовете...'
        bat 'start /b cmd /c "npm start > server.log 2>&1"'
        // Изчакай 5 секунди със ping
        bat 'ping -n 6 127.0.0.1 > nul'
        bat 'npm test'
      }
    }
  }

  post {
    always {
      echo 'Показване на логовете и спиране на сървъра...'
      bat 'type server.log || exit 0'
      bat 'taskkill /F /IM node.exe || exit 0'
    }
  }
}