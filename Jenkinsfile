pipeline {
  agent any

  environment {
    NODE_VERSION = '18'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Check Node.js & npm') {
      steps {
        bat 'node -v'
        bat 'npm -v'
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
        // Стартирай сървъра във фонов режим
        bat 'start /b cmd /c "npm start > server.log 2>&1"'
        // Изчакай 5 секунди сървърът да се стартира
        bat 'timeout /t 5'
        // Стартирай тестовете
        bat 'npm test'
      }
    }
  }

  post {
    always {
      echo 'Показване на логовете и спиране на сървъра...'
      // Покажи логовете на сървъра (ако има)
      bat 'type server.log || exit 0'
      // Убий всички node процеси (ако има останали)
      bat 'taskkill /F /IM node.exe || exit 0'
    }
  }
}