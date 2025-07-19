pipeline {
  agent {
    label 'linux'
  }

  environment {
    NODE_VERSION = '18'
  }

  stages {
    stage('Warm-up') {
      steps {
        echo 'Изчакване за освобождаване на executor...'
        sh 'sleep 10'
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Setup Node.js') {
      steps {
        // Ако имаш NodeJS plugin:
        // tool name трябва да съвпада с инсталирания NodeJS tool в Jenkins
        // withEnv(["PATH+NODE=${tool 'NodeJS 18'}/bin"]) { ... }
        sh '''
          curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
          sudo apt-get install -y nodejs
        '''
        sh 'node -v'
        sh 'npm -v'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Start server') {
      steps {
        echo 'Стартиране на сървъра във фонов режим...'
        sh 'nohup npm start > server.log 2>&1 & echo $! > .server_pid'
        // Изчакай порт 8080 да е отворен (до 15 секунди)
        sh '''
          for i in {1..15}; do
            nc -z localhost 8080 && break
            sleep 1
          done
        '''
      }
    }

    stage('Run tests') {
      steps {
        echo 'Изпълняване на тестовете...'
        sh 'npm test'
      }
    }
  }

  post {
    always {
      echo 'Спиране на сървъра...'
      sh '''
        if [ -f .server_pid ]; then
          kill $(cat .server_pid) || true
          rm .server_pid
        fi
      '''
      sh 'cat server.log || true'
    }
  }
}
