node {
  stage('Clone') {
    checkout scm
    sh "./gradlew build"
  }

  stage('Push image') {
    docker.build('test')
  }
}
