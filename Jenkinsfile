node {
  def app

  stage('Clone') {
    checkout scm
  }

  stage('Build') {
    sh "./gradlew build"
  }

  stage('Maven publish') {
    sh "./gradlew publish"
  }

  stage('Build image') {
    app = docker.build("${env.JOB_NAME}")
  }

  stage('Push docker image') {
    docker.withRegistry('https://tinetrm.azurecr.io', 'azure-container-registry') {
      app.push("${env.BUILD_NUMBER}")
      app.push("latest")
    }
  }
}
