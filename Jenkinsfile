pipeline{
    agent any
    stages{
        stage('Clone Git'){
            steps{
                git branch:'master',url: 'https://github.com/Karthik4703/SPE_final_major_project.git'
            }
        }
        stage('Building frontend'){
            steps{
                dir('frontend'){
                    sh "npm install"
                }
            }
        }
        stage('Building backend'){
            steps{
                dir('backend'){
                    sh "npm install"
                }
            }
        }
        stage('Build Frontend Image') {
            steps{
                dir('frontend'){
                    script{
                        frontend_image = docker.build "vamshi07/frontend:latest"
                    }
                }
            }
        }
         stage('Build Backend Image') {
             steps{
                dir('backend'){
                    script{
                        backend_image = docker.build "vamshi07/backend:latest"
                    }
                }
            }
        }
        stage('Stage 4: Push docker image to hub') {
            steps{
                script{
                    docker.withRegistry('', 'docker-cred'){
                        frontend_image.push()
                        backend_image.push()
                    }
                }
            }
        }
        stage('Stage 5: Clean docker images'){
            steps{
                script{
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }
        stage('Step 6: Ansible Deployment'){
            steps{
                ansiblePlaybook becomeUser: null,
                colorized: true,
                credentialsId: 'localhost',
                disableHostKeyChecking: true,
                installation: 'Ansible',
                inventory: 'inventory',
                playbook: 'deploy.yml',
                sudoUser: null
            }
        }
    }
}
