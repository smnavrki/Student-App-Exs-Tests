pipeline {
  agent { label 'windows' }

  environment {
    NODE_VERSION = '18'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Setup Node.js') {
      steps {
        // Ако имаш NodeJS plugin, използвай го:
        // tools { nodejs "NodeJS 18" }
        // Ако не, използвай следното:
        sh '''
          if ! command -v node > /dev/null; then
            curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
            sudo apt-get install -y nodejs
          fi
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

    stage('Test') {
      steps {
        echo 'Стартиране на сървъра и изпълнение на тестовете...'
        // Стартирай сървъра във фонов режим, изчакай го, пусни тестовете, спри сървъра
        sh '''
          nohup npm start > server.log 2>&1 & echo $! > .server_pid
          for i in {1..15}; do
            nc -z localhost 8080 && break
            sleep 1
          done
          npm test
        '''
      }
    }
  }

  post {
    always {
      echo 'Спиране на сървъра и показване на логовете...'
      sh '''
        if [ -f .server_pid ]; then
          kill $(cat .server_pid) || true
          rm .server_pid
        fi
        cat server.log || true
      '''
    }
  }
}