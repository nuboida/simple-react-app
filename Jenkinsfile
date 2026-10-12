pipeline {
    agent any
    tools {
        nodejs 'node24.21.0'
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'node --version'
                sh 'node -e "const [major, minor, patch] = process.versions.node.split(\'.\').map(Number); if (major < 24 || (major === 24 && (minor < 21 || (minor === 21 && patch < 0)))) { console.error(\'Node.js 24.21.0 or newer is required\'); process.exit(1); }"'
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deliver') {
            steps {
                sh './jenkins/scripts/deliver.sh'
                archiveartifacts artifacts: 'dist/**', fingerprint: true
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
