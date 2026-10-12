pipeline {
    agent any
    tools {
        nodejs 'node22'
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'node --version'
                sh 'node -e "const [major, minor, patch] = process.versions.node.split(\'.\').map(Number); if (major < 22 || (major === 22 && (minor < 22 || (minor === 22 && patch < 2)))) { console.error(\'Node.js 22.22.2 or newer is required\'); process.exit(1); }"'
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
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
