node {
  stage('Clone') {
    checkout scm
    sh "./gradlew build"
  }

  stage('Push image') {
    docker.withRegistry('https://tinetrm.azurecr.io', 'docker-hub-credentials') {
    app.push("${env.BUILD_NUMBER}")
    app.push("latest")
  }
}
