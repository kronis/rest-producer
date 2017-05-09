node {
  def app

  stage('Clone') {
    checkout scm
    sh "./gradlew build"
  }

  stage('Push image') {
    app = docker.build('test')
  }

  stage('Docker push') {
    docker.withRegistry('https://tinetrm.azurecr.io', 'azure-container-registry') {
      app.push("${env.BUILD_NUMBER}")
      app.push("latest")
    }
  }
}
